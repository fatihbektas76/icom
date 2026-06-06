#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# iCOM Group — Interactive mail-backend setup
#
# Asks for your Brevo API key (and a few defaults you can accept), validates
# the key against the Brevo API, writes .env.local, and optionally sends a
# test email to confirm everything works end-to-end.
#
# Usage:  bash scripts/setup-mail.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── colors ──────────────────────────────────────────────────────────────────
if [[ -t 1 ]]; then
  C_RESET=$'\033[0m'
  C_DIM=$'\033[2m'
  C_BOLD=$'\033[1m'
  C_CORAL=$'\033[38;5;203m'
  C_GREEN=$'\033[38;5;42m'
  C_RED=$'\033[38;5;203m'
  C_YELLOW=$'\033[38;5;221m'
  C_BLUE=$'\033[38;5;75m'
else
  C_RESET= C_DIM= C_BOLD= C_CORAL= C_GREEN= C_RED= C_YELLOW= C_BLUE=
fi

heading() { printf '\n%s\n%s\n\n' "${C_CORAL}${C_BOLD}$1${C_RESET}" "${C_DIM}$(printf '─%.0s' $(seq 1 ${#1}))${C_RESET}"; }
info()    { printf '%s  %s\n' "${C_BLUE}ⓘ${C_RESET}" "$1"; }
ok()      { printf '%s  %s\n' "${C_GREEN}✓${C_RESET}" "$1"; }
warn()    { printf '%s  %s\n' "${C_YELLOW}⚠${C_RESET}" "$1"; }
fail()    { printf '%s  %s\n' "${C_RED}✗${C_RESET}" "$1" >&2; }
ask()     { printf '%s  %s' "${C_CORAL}›${C_RESET}" "$1"; }

# ── locate repo root ────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${REPO_ROOT}/.env.local"
ENV_EXAMPLE="${REPO_ROOT}/.env.example"

cd "${REPO_ROOT}"

# ── intro ───────────────────────────────────────────────────────────────────
clear 2>/dev/null || true
cat <<EOF

${C_CORAL}${C_BOLD}╭───────────────────────────────────────────╮
│   iCOM Group — Mail-Backend Setup         │
│   ${C_RESET}${C_DIM}Brevo API · Auto-Reply · DSGVO-konform${C_CORAL}${C_BOLD}    │
╰───────────────────────────────────────────╯${C_RESET}

Dieses Skript schreibt ${C_BOLD}.env.local${C_RESET} und schickt eine optionale Test-E-Mail.
Du brauchst nur einen Brevo-API-Key. Alles andere ist vorbelegt.

${C_DIM}Brevo-Account anlegen: https://app.brevo.com/account/register
API-Key holen:        Dashboard → SMTP & API → API Keys → Generate${C_RESET}

EOF

# ── pre-check: dependencies ─────────────────────────────────────────────────
need_cmd() { command -v "$1" >/dev/null 2>&1 || { fail "Benötigt: ${C_BOLD}$1${C_RESET} — bitte installieren."; exit 1; }; }
need_cmd curl

# ── pre-check: existing .env.local ──────────────────────────────────────────
existing_value() {
  local key="$1"
  [[ -f "${ENV_FILE}" ]] || return 0
  grep -E "^${key}=" "${ENV_FILE}" | head -1 | sed -E "s/^${key}=//" | sed -E 's/^"//; s/"$//'
}

if [[ -f "${ENV_FILE}" ]]; then
  warn ".env.local existiert bereits."
  ask "Werte als Default anbieten und überschreiben? [J/n] "
  read -r REPLY
  case "${REPLY:-J}" in
    [nN]*) info "Abbruch durch Nutzer."; exit 0 ;;
  esac
fi

# ── prompts ─────────────────────────────────────────────────────────────────
prompt_with_default() {
  # $1 label, $2 default, $3 var-name, $4 (optional) secret=1
  local label="$1" def="$2" var="$3" secret="${4:-0}"
  local input
  if [[ "${secret}" == "1" ]]; then
    ask "${label}: "
    stty -echo 2>/dev/null || true
    read -r input
    stty echo 2>/dev/null || true
    printf '\n'
  else
    if [[ -n "${def}" ]]; then
      ask "${label} ${C_DIM}[${def}]${C_RESET}: "
    else
      ask "${label}: "
    fi
    read -r input
    [[ -z "${input}" ]] && input="${def}"
  fi
  printf -v "${var}" '%s' "${input}"
}

heading "1) Brevo API-Key"
echo "Beginnt mit ${C_BOLD}xkeysib-${C_RESET}. Eingabe wird verborgen."
EXISTING_KEY="$(existing_value BREVO_API_KEY || true)"
if [[ -n "${EXISTING_KEY}" ]]; then
  info "Bestehender Key vorhanden (endet auf ${C_BOLD}…${EXISTING_KEY: -6}${C_RESET})."
  ask "Bestehenden Key behalten? [J/n] "
  read -r REPLY
  if [[ "${REPLY:-J}" =~ ^[nN] ]]; then
    prompt_with_default "Neuer Brevo API-Key" "" BREVO_API_KEY 1
  else
    BREVO_API_KEY="${EXISTING_KEY}"
  fi
else
  prompt_with_default "Brevo API-Key" "" BREVO_API_KEY 1
fi

if [[ -z "${BREVO_API_KEY}" ]]; then
  fail "Kein API-Key angegeben. Abbruch."
  exit 1
fi
if [[ ! "${BREVO_API_KEY}" =~ ^xkeysib- ]]; then
  warn "Der Key beginnt nicht mit 'xkeysib-'. Tippfehler?"
  ask "Trotzdem fortfahren? [j/N] "
  read -r REPLY
  case "${REPLY:-N}" in
    [jJ]*) ;;
    *) fail "Abbruch."; exit 1 ;;
  esac
fi

heading "2) Absender-E-Mail (verifizierter Sender)"
echo "Diese Adresse muss in Brevo verifiziert sein (Single Sender oder Domain-Auth)."
SENDER_DEFAULT="$(existing_value BREVO_SENDER_EMAIL || true)"
SENDER_DEFAULT="${SENDER_DEFAULT:-fb@fb-re.de}"
prompt_with_default "Sender-E-Mail" "${SENDER_DEFAULT}" BREVO_SENDER_EMAIL

heading "3) Sender-Name"
NAME_DEFAULT="$(existing_value BREVO_SENDER_NAME || true)"
NAME_DEFAULT="${NAME_DEFAULT:-iCOM Group}"
prompt_with_default "Sender-Name" "${NAME_DEFAULT}" BREVO_SENDER_NAME

heading "4) Empfänger für Lead-Anfragen"
RECIPIENT_DEFAULT="$(existing_value CONTACT_RECIPIENT_EMAIL || true)"
RECIPIENT_DEFAULT="${RECIPIENT_DEFAULT:-fb@fb-re.de}"
prompt_with_default "Empfänger-E-Mail" "${RECIPIENT_DEFAULT}" CONTACT_RECIPIENT_EMAIL

# ── validate key against Brevo ──────────────────────────────────────────────
heading "5) API-Key gegen Brevo prüfen"
info "Frage Account-Info von Brevo ab…"

ACCOUNT_RESPONSE="$(curl -s -w '\n__HTTP__:%{http_code}' \
  -H "api-key: ${BREVO_API_KEY}" \
  -H "accept: application/json" \
  https://api.brevo.com/v3/account)"

HTTP_CODE="$(printf '%s\n' "${ACCOUNT_RESPONSE}" | sed -n 's/^__HTTP__://p')"
BODY="$(printf '%s\n' "${ACCOUNT_RESPONSE}" | sed '/^__HTTP__:/d')"

case "${HTTP_CODE}" in
  200)
    EMAIL_PLAN="$(printf '%s' "${BODY}" | grep -oE '"email":"[^"]+"' | head -1 | sed -E 's/.*"email":"([^"]+)".*/\1/')"
    COMPANY_NAME="$(printf '%s' "${BODY}" | grep -oE '"companyName":"[^"]+"' | head -1 | sed -E 's/.*"companyName":"([^"]+)".*/\1/')"
    ok "API-Key gültig."
    [[ -n "${EMAIL_PLAN}"   ]] && info "Brevo-Account: ${C_BOLD}${EMAIL_PLAN}${C_RESET}"
    [[ -n "${COMPANY_NAME}" ]] && info "Company:       ${C_BOLD}${COMPANY_NAME}${C_RESET}"
    ;;
  401)
    fail "Brevo lehnt den Key ab (401 Unauthorized). Bitte API-Key prüfen."
    exit 1
    ;;
  '')
    fail "Keine Antwort von Brevo. Netzwerk-Problem?"
    exit 1
    ;;
  *)
    fail "Unerwartete Antwort von Brevo (HTTP ${HTTP_CODE})."
    printf '%s\n' "${BODY}" | head -3
    exit 1
    ;;
esac

# ── write .env.local ────────────────────────────────────────────────────────
heading "6) .env.local schreiben"

# preserve any other lines that exist (e.g. NEXT_PUBLIC_GA_ID)
declare -A PRESERVE=()
if [[ -f "${ENV_FILE}" ]]; then
  while IFS= read -r line; do
    case "${line}" in
      BREVO_API_KEY=*|BREVO_SENDER_EMAIL=*|BREVO_SENDER_NAME=*|CONTACT_RECIPIENT_EMAIL=*|'#'*|'') continue ;;
    esac
    key="${line%%=*}"
    PRESERVE["${key}"]="${line}"
  done < "${ENV_FILE}"
fi

{
  echo "# Auto-generated by scripts/setup-mail.sh — $(date +%Y-%m-%d' '%H:%M)"
  echo "# Do NOT commit this file. Real secrets live here."
  echo
  echo "# ── Brevo (transactional email) ──"
  echo "BREVO_API_KEY=${BREVO_API_KEY}"
  echo "BREVO_SENDER_EMAIL=${BREVO_SENDER_EMAIL}"
  echo "BREVO_SENDER_NAME=\"${BREVO_SENDER_NAME}\""
  echo
  echo "# ── Where contact-form submissions are delivered ──"
  echo "CONTACT_RECIPIENT_EMAIL=${CONTACT_RECIPIENT_EMAIL}"
  if [[ ${#PRESERVE[@]} -gt 0 ]]; then
    echo
    echo "# ── Preserved from prior .env.local ──"
    for k in "${!PRESERVE[@]}"; do
      echo "${PRESERVE[${k}]}"
    done
  fi
} > "${ENV_FILE}"
chmod 600 "${ENV_FILE}" 2>/dev/null || true

ok "${ENV_FILE} geschrieben (chmod 600)."

# ── optional test email ─────────────────────────────────────────────────────
heading "7) Test-E-Mail senden?"
echo "Schickt eine echte Test-Nachricht an ${C_BOLD}${CONTACT_RECIPIENT_EMAIL}${C_RESET}."
ask "Jetzt senden? [J/n] "
read -r REPLY
if [[ ! "${REPLY:-J}" =~ ^[nN] ]]; then
  info "Sende Test-Mail über Brevo…"

  TEST_PAYLOAD=$(cat <<JSON
{
  "sender": { "email": "${BREVO_SENDER_EMAIL}", "name": "${BREVO_SENDER_NAME}" },
  "to":     [{ "email": "${CONTACT_RECIPIENT_EMAIL}" }],
  "subject": "iCOM Group · Setup-Test erfolgreich",
  "htmlContent": "<!doctype html><html><body style='font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;background:#0D0D0D;color:#fff;padding:32px;'><div style='max-width:520px;margin:0 auto;background:#161616;border:1px solid #1C1C1C;border-radius:14px;padding:32px;'><div style='font-size:11px;letter-spacing:.3em;color:#F05252;text-transform:uppercase;margin-bottom:14px;'>iCOM Group · Setup</div><h1 style='font-size:24px;color:#fff;margin:0 0 12px;'>Mail-Backend läuft.</h1><p style='color:#C8C8C8;line-height:1.6;'>Wenn diese Nachricht angekommen ist, ist Brevo korrekt konfiguriert und das Kontaktformular auf <strong style='color:#fff;'>icom-group.net</strong> wird Leads zuverlässig zustellen.</p><div style='margin-top:24px;padding-top:18px;border-top:1px solid #1C1C1C;color:#888;font-size:12px;'>Gesendet via setup-mail.sh · $(date +%Y-%m-%d' '%H:%M)</div></div></body></html>",
  "tags": ["setup-test"]
}
JSON
)

  TEST_RESPONSE="$(curl -s -w '\n__HTTP__:%{http_code}' \
    -X POST https://api.brevo.com/v3/smtp/email \
    -H "api-key: ${BREVO_API_KEY}" \
    -H "content-type: application/json" \
    -H "accept: application/json" \
    -d "${TEST_PAYLOAD}")"

  TEST_CODE="$(printf '%s\n' "${TEST_RESPONSE}" | sed -n 's/^__HTTP__://p')"
  TEST_BODY="$(printf '%s\n' "${TEST_RESPONSE}" | sed '/^__HTTP__:/d')"

  case "${TEST_CODE}" in
    200|201)
      ok "Test-Mail erfolgreich an ${C_BOLD}${CONTACT_RECIPIENT_EMAIL}${C_RESET} versendet."
      info "Posteingang in 10–60 Sek. prüfen (ggf. Spam-Ordner)."
      ;;
    400)
      fail "Brevo lehnt den Versand ab (HTTP 400)."
      printf '%s\n' "${TEST_BODY}" | head -3
      warn "Häufigste Ursache: Sender-E-Mail ${C_BOLD}${BREVO_SENDER_EMAIL}${C_RESET} ist nicht verifiziert."
      info "Fix: https://app.brevo.com  →  Senders & IP  →  Senders  →  Add a sender"
      ;;
    401)
      fail "Versand wegen 401 abgelehnt — API-Key plötzlich ungültig?"
      ;;
    *)
      fail "Unerwarteter HTTP ${TEST_CODE} beim Versand."
      printf '%s\n' "${TEST_BODY}" | head -3
      ;;
  esac
else
  info "Test-Mail übersprungen."
fi

# ── dev server hint ─────────────────────────────────────────────────────────
heading "Fertig."

if pgrep -f "next dev" >/dev/null 2>&1; then
  warn "Dev-Server läuft schon — Next.js liest .env.local nur beim Start."
  info "Neustart: ${C_BOLD}pkill -f 'next dev' && PORT=3055 npm run dev${C_RESET}"
else
  info "Dev-Server starten: ${C_BOLD}npm run dev${C_RESET}"
fi

cat <<EOF

${C_DIM}Nächste Schritte:${C_RESET}
  • Auf Vercel dieselben Variablen in Project Settings → Environment Variables eintragen
  • DKIM/SPF für Domain ${C_BOLD}icom-group.net${C_RESET} in Brevo authentifizieren (Senders & IP → Domains)
  • Sobald Domain authentifiziert: ${C_BOLD}BREVO_SENDER_EMAIL${C_RESET} auf ${C_BOLD}kontakt@icom-group.net${C_RESET} umstellen und Skript erneut ausführen

EOF
