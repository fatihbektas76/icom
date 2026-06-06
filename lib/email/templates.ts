import type { ContactPayload } from './contact-schema'

const CORAL = '#F05252'
const DARK_BG = '#0D0D0D'
const CARD_BG = '#161616'
const BORDER = '#1C1C1C'
const TEXT = '#FFFFFF'
const TEXT_MUTED = '#C8C8C8'

interface SavingsEstimate {
  monthly: number
  optimizedMonthly: number
  yearly: number
}

export function estimateSavings(volumeMonthly: number): SavingsEstimate {
  const monthly = volumeMonthly * 0.0185
  const optimizedMonthly = monthly * 0.72
  return {
    monthly: Math.round(monthly),
    optimizedMonthly: Math.round(optimizedMonthly),
    yearly: Math.round((monthly - optimizedMonthly) * 12),
  }
}

function row(label: string, value: string | number | undefined) {
  if (value === undefined || value === '' || value === null) return ''
  return `
    <tr>
      <td style="padding:8px 12px;color:${TEXT_MUTED};font-size:12px;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid ${BORDER};">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;color:${TEXT};font-size:14px;border-bottom:1px solid ${BORDER};">${escapeHtml(String(value))}</td>
    </tr>
  `
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Internal lead-notification email sent to iCOM. */
export function internalLeadEmail(payload: ContactPayload) {
  const savings = estimateSavings(payload.volume)
  const subject = `Neue Anfrage · ${payload.name}${payload.company ? ' · ' + payload.company : ''}`
  const html = `<!doctype html>
<html lang="de"><body style="margin:0;padding:0;background:${DARK_BG};font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${DARK_BG};padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:${CARD_BG};border:1px solid ${BORDER};border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid ${BORDER};">
          <div style="font-size:11px;letter-spacing:.3em;color:${CORAL};text-transform:uppercase;margin-bottom:6px;">iCOM Group · Neue Lead-Anfrage</div>
          <div style="font-size:22px;color:${TEXT};font-weight:700;">${escapeHtml(payload.name)}</div>
          ${payload.company ? `<div style="font-size:13px;color:${TEXT_MUTED};margin-top:4px;">${escapeHtml(payload.company)}</div>` : ''}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 16px 18px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row('E-Mail', payload.email)}
            ${row('Telefon', payload.phone)}
            ${row('Umsatz / Monat', payload.volume.toLocaleString('de-DE') + ' €')}
            ${row('Aktueller PSP', payload.psp)}
            ${row('Branche', payload.branch)}
          </table>
        </td>
      </tr>
      ${payload.message ? `
      <tr>
        <td style="padding:0 28px 24px;">
          <div style="font-size:11px;letter-spacing:.16em;color:${CORAL};text-transform:uppercase;margin-bottom:8px;">Nachricht</div>
          <div style="font-size:14px;color:${TEXT};line-height:1.6;background:${DARK_BG};border:1px solid ${BORDER};border-radius:8px;padding:14px 16px;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
        </td>
      </tr>` : ''}
      <tr>
        <td style="padding:0 28px 28px;">
          <div style="background:${DARK_BG};border:1px solid ${CORAL}33;border-radius:10px;padding:18px 20px;">
            <div style="font-size:11px;letter-spacing:.16em;color:${CORAL};text-transform:uppercase;margin-bottom:6px;">Geschätztes Einsparpotenzial</div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;">
              <span style="font-size:13px;color:${TEXT_MUTED};">pro Jahr</span>
              <span style="font-size:26px;color:${CORAL};font-weight:700;letter-spacing:-.02em;">${savings.yearly.toLocaleString('de-DE')} €</span>
            </div>
            <div style="font-size:11px;color:${TEXT_MUTED};margin-top:6px;">Aktuell ~${savings.monthly.toLocaleString('de-DE')} € / Monat · optimiert ~${savings.optimizedMonthly.toLocaleString('de-DE')} €</div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 28px;border-top:1px solid ${BORDER};font-size:11px;color:#666;">
          Antwort einfach hier per Reply — geht direkt an ${escapeHtml(payload.email)}.
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`

  const text = [
    `Neue Lead-Anfrage`,
    ``,
    `Name:     ${payload.name}`,
    `E-Mail:   ${payload.email}`,
    payload.phone   ? `Telefon:  ${payload.phone}`   : null,
    payload.company ? `Firma:    ${payload.company}` : null,
    `Umsatz:   ${payload.volume.toLocaleString('de-DE')} € / Monat`,
    payload.psp     ? `PSP:      ${payload.psp}`     : null,
    payload.branch  ? `Branche:  ${payload.branch}`  : null,
    ``,
    payload.message ? `Nachricht:\n${payload.message}` : null,
    ``,
    `Einsparpotenzial: ~${savings.yearly.toLocaleString('de-DE')} € / Jahr`,
  ].filter(Boolean).join('\n')

  return { subject, html, text }
}

/** Auto-reply confirmation to the prospect. */
export function autoReplyEmail(payload: ContactPayload) {
  const firstName = payload.name.split(' ')[0] || 'da'
  const subject = 'Wir haben Ihre Anfrage erhalten · iCOM Group'
  const html = `<!doctype html>
<html lang="de"><body style="margin:0;padding:0;background:${DARK_BG};font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${DARK_BG};padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:${CARD_BG};border:1px solid ${BORDER};border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:28px 28px 8px;">
          <div style="font-size:11px;letter-spacing:.3em;color:${CORAL};text-transform:uppercase;margin-bottom:14px;">iCOM Group</div>
          <h1 style="font-size:24px;color:${TEXT};font-weight:700;margin:0 0 14px;line-height:1.25;">Danke, ${escapeHtml(firstName)}.</h1>
          <p style="font-size:15px;color:${TEXT_MUTED};line-height:1.6;margin:0 0 16px;">
            Wir haben Ihre Anfrage erhalten. Innerhalb von <strong style="color:${TEXT};">48 Stunden</strong>
            melden wir uns mit einer ersten Einschätzung Ihres Einsparpotenzials.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 24px;">
          <div style="background:${DARK_BG};border:1px solid ${BORDER};border-radius:10px;padding:18px 20px;">
            <div style="font-size:11px;letter-spacing:.16em;color:${CORAL};text-transform:uppercase;margin-bottom:10px;">So geht's weiter</div>
            <ol style="margin:0;padding-left:18px;color:${TEXT_MUTED};font-size:13px;line-height:1.8;">
              <li>Wir prüfen Ihre aktuellen Konditionen.</li>
              <li>Sie erhalten von uns einen unverbindlichen Benchmark.</li>
              <li>Wenn es passt, optimieren wir gemeinsam — sonst sagen wir Ihnen ehrlich, dass Sie schon gut aufgestellt sind.</li>
            </ol>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 28px;">
          <p style="font-size:13px;color:${TEXT_MUTED};line-height:1.6;margin:0;">
            Falls Sie schon vorab Fragen haben:<br />
            <a href="tel:+4915152820216" style="color:${CORAL};text-decoration:none;">+49 (0) 1515 282 021 6</a>
            &nbsp;·&nbsp; Mo – Fr 9:00 – 18:00 Uhr
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 28px;background:${DARK_BG};border-top:1px solid ${BORDER};font-size:11px;color:#666;line-height:1.6;">
          Intelligent Commerce Group S.a.r.l. · 1 Place du Marché · L-6755 Grevenmacher · Luxemburg<br />
          Diese E-Mail wurde automatisch versendet als Bestätigung Ihrer Kontaktanfrage.
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`

  const text = [
    `Danke, ${firstName}.`,
    ``,
    `Wir haben Ihre Anfrage erhalten. Innerhalb von 48 Stunden melden wir uns mit einer ersten Einschätzung Ihres Einsparpotenzials.`,
    ``,
    `So geht's weiter:`,
    `1. Wir prüfen Ihre aktuellen Konditionen.`,
    `2. Sie erhalten einen unverbindlichen Benchmark.`,
    `3. Wenn es passt, optimieren wir gemeinsam.`,
    ``,
    `Vorab-Fragen? +49 (0) 1515 282 021 6 · Mo–Fr 9–18 Uhr`,
    ``,
    `iCOM Group · Intelligent Commerce Group S.a.r.l.`,
    `1 Place du Marché · L-6755 Grevenmacher · Luxemburg`,
  ].join('\n')

  return { subject, html, text }
}
