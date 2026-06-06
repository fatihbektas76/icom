import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/email/contact-schema'
import { sendBrevoEmail } from '@/lib/email/brevo'
import { internalLeadEmail, autoReplyEmail } from '@/lib/email/templates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Naive per-IP rate limit. Resets every process restart — fine for small
 * traffic. Upgrade to Vercel KV / Upstash when you outgrow it.
 */
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_PER_WINDOW = 5
const hits = new Map<string, { count: number; reset: number }>()

function rateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS })
    return { ok: true, remaining: MAX_PER_WINDOW - 1 }
  }
  entry.count += 1
  if (entry.count > MAX_PER_WINDOW) return { ok: false, remaining: 0 }
  return { ok: true, remaining: MAX_PER_WINDOW - entry.count }
}

function getIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'anon'
}

export async function POST(req: NextRequest) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'VALIDATION', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const data = parsed.data

  // Honeypot — bots fill hidden fields
  if (data.website && data.website.length > 0) {
    // pretend success to silence bots
    return NextResponse.json({ ok: true, ignored: true }, { status: 200 })
  }

  const ip = getIp(req)
  const rl = rateLimit(ip)
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'RATE_LIMIT' },
      { status: 429, headers: { 'retry-after': '3600' } },
    )
  }

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL
  const senderEmail = process.env.BREVO_SENDER_EMAIL
  const senderName = process.env.BREVO_SENDER_NAME || 'iCOM Group'

  if (!recipient || !senderEmail) {
    // Mail backend not configured yet — log so dev sees the lead.
    console.warn('[contact] BREVO_SENDER_EMAIL / CONTACT_RECIPIENT_EMAIL not set — falling back to log-only mode')
    console.log('[contact] lead', JSON.stringify(data, null, 2))
    return NextResponse.json({ ok: true, mock: true }, { status: 200 })
  }

  const internal = internalLeadEmail(data)
  const autoReply = autoReplyEmail(data)

  const sender = { email: senderEmail, name: senderName }

  // Send internal notification first — if this fails, return error.
  const internalResult = await sendBrevoEmail({
    to: [{ email: recipient }],
    sender,
    replyTo: { email: data.email, name: data.name },
    subject: internal.subject,
    htmlContent: internal.html,
    textContent: internal.text,
    tags: ['contact-form', 'lead-internal'],
  })

  if (!internalResult.ok) {
    console.error('[contact] Brevo internal-send failed', internalResult)
    return NextResponse.json(
      { ok: false, error: 'MAIL_SEND_FAILED' },
      { status: 502 },
    )
  }

  // Auto-reply — best-effort. Failures here don't block the user.
  const autoReplyResult = await sendBrevoEmail({
    to: [{ email: data.email, name: data.name }],
    sender,
    replyTo: { email: recipient },
    subject: autoReply.subject,
    htmlContent: autoReply.html,
    textContent: autoReply.text,
    tags: ['contact-form', 'auto-reply'],
  })

  if (!autoReplyResult.ok) {
    console.warn('[contact] auto-reply send failed (ignored)', autoReplyResult)
  }

  return NextResponse.json(
    { ok: true, messageId: internalResult.messageId, autoReply: autoReplyResult.ok },
    { status: 200 },
  )
}
