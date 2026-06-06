/**
 * Thin Brevo transactional-email client (no SDK).
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 */

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email'

export interface BrevoAddress {
  email: string
  name?: string
}

export interface BrevoSendInput {
  to: BrevoAddress[]
  sender: BrevoAddress
  replyTo?: BrevoAddress
  subject: string
  htmlContent: string
  textContent?: string
  tags?: string[]
}

export interface BrevoSendResult {
  ok: boolean
  messageId?: string
  status?: number
  error?: string
}

export async function sendBrevoEmail(input: BrevoSendInput): Promise<BrevoSendResult> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return { ok: false, error: 'BREVO_API_KEY not configured' }
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(input),
      // Brevo can take 1–2s; cap so route handler doesn't hang forever.
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return { ok: false, status: res.status, error: text || res.statusText }
    }
    const data = (await res.json().catch(() => ({}))) as { messageId?: string }
    return { ok: true, messageId: data.messageId, status: res.status }
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown error' }
  }
}
