'use client'
import { useMemo, useState } from 'react'

type Step = 1 | 2 | 3
type Status = 'idle' | 'sending' | 'success' | 'error'

interface FormState {
  name: string
  email: string
  phone: string
  company: string
  volume: number          // monatlicher Kartenumsatz in €
  psp: string
  branch: string
  message: string
  /** Honeypot — must stay empty */
  website: string
}

const PSP_OPTIONS = ['Stripe', 'PayPal', 'Mollie', 'Adyen', 'Unzer', 'SumUp', 'Sonstige / weiß ich nicht']
const BRANCH_OPTIONS = ['Online-Shop', 'Hotel / Restaurant', 'Einzelhandel', 'Dienstleister', 'SaaS', 'Marketplace', 'Sonstiges']

const INITIAL: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  volume: 80000,
  psp: '',
  branch: '',
  message: '',
  website: '',
}

const STEPS: { id: Step; title: string; sub: string }[] = [
  { id: 1, title: 'Über Sie',     sub: 'Wer fragt an?' },
  { id: 2, title: 'Ihr Payment',  sub: 'Was bezahlen Sie heute?' },
  { id: 3, title: 'Ihre Anfrage', sub: 'Wie können wir helfen?' },
]

export default function ContactForm() {
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})

  // live yearly savings estimate (Ø 1.85% MDR, 28% Reduktion)
  const yearlySaving = useMemo(() => {
    const monthly = data.volume * 0.0185
    const optimized = monthly * 0.72
    return Math.round((monthly - optimized) * 12)
  }, [data.volume])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData(prev => ({ ...prev, [key]: value }))

  const markTouched = (key: keyof FormState) =>
    setTouched(t => ({ ...t, [key]: true }))

  const stepValid = useMemo(() => {
    if (step === 1) {
      return data.name.trim().length >= 2 && /.+@.+\..+/.test(data.email)
    }
    if (step === 2) return true
    return true
  }, [step, data])

  const next = () => {
    if (!stepValid) {
      if (step === 1) {
        markTouched('name')
        markTouched('email')
      }
      return
    }
    setStep(s => (s < 3 ? ((s + 1) as Step) : s))
  }
  const prev = () => setStep(s => (s > 1 ? ((s - 1) as Step) : s))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stepValid) return
    setStatus('sending')
    setErrorMessage(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null
        const code = body?.error
        const msg =
          code === 'RATE_LIMIT'
            ? 'Zu viele Anfragen von Ihrem Anschluss. Bitte versuchen Sie es später erneut oder rufen Sie uns an.'
            : code === 'VALIDATION'
              ? 'Bitte prüfen Sie Ihre Eingaben — etwas fehlt oder ist ungültig.'
              : 'Das Formular konnte nicht abgesendet werden. Bitte rufen Sie uns alternativ unter +49 (0) 1515 282 021 6 an.'
        setErrorMessage(msg)
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMessage(
        'Netzwerkfehler beim Senden. Bitte prüfen Sie Ihre Verbindung oder rufen Sie uns unter +49 (0) 1515 282 021 6 an.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <SuccessState saving={yearlySaving} name={data.name} />
  }

  const progress = ((step - 1) / 2) * 100

  return (
    <div className="relative bg-icom-card border border-icom-border rounded-2xl overflow-hidden">
      {/* atmospheric coral glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(240,82,82,0.10) 0%, rgba(13,13,13,0) 55%)',
        }}
      />

      {/* progress header */}
      <div className="relative px-8 pt-7 pb-5 border-b border-icom-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-icom-accent/80 mb-1 font-medium">
              Schritt {step} / 3
            </div>
            <div className="text-white font-semibold">{STEPS[step - 1].title}</div>
            <div className="text-xs text-icom-muted">{STEPS[step - 1].sub}</div>
          </div>
          <div className="flex gap-2">
            {STEPS.map(s => (
              <span
                key={s.id}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                style={{
                  background: s.id < step ? '#F05252' : s.id === step ? 'rgba(240,82,82,0.15)' : '#161616',
                  color: s.id < step ? '#fff' : s.id === step ? '#F05252' : '#555',
                  border: s.id === step ? '1px solid rgba(240,82,82,0.5)' : '1px solid #1c1c1c',
                  boxShadow: s.id === step ? '0 0 14px rgba(240,82,82,0.35)' : 'none',
                }}
              >
                {s.id < step ? '✓' : s.id}
              </span>
            ))}
          </div>
        </div>
        <div className="h-1 bg-icom-black rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-icom-accent to-[#ff8a8a] rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress + (status === 'sending' ? 0 : 0)}%`,
              boxShadow: '0 0 12px rgba(240,82,82,0.6)',
            }}
          />
        </div>
      </div>

      <form onSubmit={submit} className="relative px-8 py-7 space-y-5">
        {step === 1 && (
          <>
            <FloatingInput
              label="Name"
              required
              value={data.name}
              onChange={v => update('name', v)}
              onBlur={() => markTouched('name')}
              error={touched.name && data.name.trim().length < 2 ? 'Bitte vollständigen Namen angeben' : undefined}
            />
            <FloatingInput
              label="E-Mail"
              type="email"
              required
              value={data.email}
              onChange={v => update('email', v)}
              onBlur={() => markTouched('email')}
              error={touched.email && !/.+@.+\..+/.test(data.email) ? 'Bitte gültige E-Mail-Adresse' : undefined}
            />
            <FloatingInput
              label="Telefon (optional)"
              type="tel"
              value={data.phone}
              onChange={v => update('phone', v)}
            />
            <FloatingInput
              label="Unternehmen (optional)"
              value={data.company}
              onChange={v => update('company', v)}
            />
          </>
        )}

        {step === 2 && (
          <>
            {/* volume slider with live savings preview */}
            <div>
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">
                Monatlicher Kartenumsatz
              </label>
              <div className="flex items-center gap-4 mb-3">
                <input
                  type="range"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={data.volume}
                  onChange={e => update('volume', Number(e.target.value))}
                  className="flex-1 accent-icom-accent"
                />
                <span className="text-icom-accent font-bold text-sm min-w-[100px] text-right tabular-nums">
                  {data.volume.toLocaleString('de-DE')} €
                </span>
              </div>

              {/* live savings preview */}
              <div className="bg-icom-black border border-icom-border rounded-lg p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-icom-dark">
                    Geschätztes Einsparpotenzial / Jahr
                  </span>
                  <span className="text-2xl font-bold text-icom-accent tabular-nums" style={{ textShadow: '0 0 14px rgba(240,82,82,0.3)' }}>
                    {yearlySaving.toLocaleString('de-DE')} €
                  </span>
                </div>
                <div className="h-1 bg-icom-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-icom-accent rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(60, (yearlySaving / 50000) * 60)}%` }}
                  />
                </div>
                <p className="text-[10px] text-icom-muted mt-2">
                  * Bei Ø 1,85 % MDR und 28 % Reduktion. Tatsächliche Werte in der Analyse.
                </p>
              </div>
            </div>

            <FancySelect
              label="Aktueller PSP"
              value={data.psp}
              onChange={v => update('psp', v)}
              options={PSP_OPTIONS}
              placeholder="Bitte auswählen"
            />
            <FancySelect
              label="Branche"
              value={data.branch}
              onChange={v => update('branch', v)}
              options={BRANCH_OPTIONS}
              placeholder="Bitte auswählen"
            />
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">
                Ihre Nachricht
              </label>
              <textarea
                rows={6}
                value={data.message}
                onChange={e => update('message', e.target.value)}
                className="w-full bg-icom-black border border-icom-border focus:border-icom-accent rounded-md px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
                placeholder="Was möchten Sie wissen? Welche Schwerpunkte sind Ihnen wichtig?"
                style={{ boxShadow: 'inset 0 0 24px rgba(240,82,82,0.04)' }}
              />
            </div>

            {/* summary */}
            <div className="bg-icom-black border border-icom-border rounded-lg p-5 space-y-2 text-sm">
              <div className="text-[10px] uppercase tracking-wider text-icom-accent/80 mb-2 font-medium">
                Zusammenfassung
              </div>
              <SummaryRow label="Name" value={data.name} />
              <SummaryRow label="E-Mail" value={data.email} />
              {data.phone && <SummaryRow label="Telefon" value={data.phone} />}
              {data.company && <SummaryRow label="Unternehmen" value={data.company} />}
              <SummaryRow label="Umsatz / Monat" value={`${data.volume.toLocaleString('de-DE')} €`} />
              {data.psp && <SummaryRow label="PSP" value={data.psp} />}
              {data.branch && <SummaryRow label="Branche" value={data.branch} />}
              <div className="border-t border-icom-border pt-2 mt-2 flex justify-between">
                <span className="text-icom-muted text-xs">Geschätzte Ersparnis / Jahr</span>
                <span className="text-icom-accent font-bold tabular-nums">
                  {yearlySaving.toLocaleString('de-DE')} €
                </span>
              </div>
            </div>
          </>
        )}

        {/* honeypot — kept off-screen, hidden from assistive tech */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          <label>
            Website (bitte leer lassen)
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={data.website}
              onChange={e => update('website', e.target.value)}
            />
          </label>
        </div>

        {/* error banner */}
        {status === 'error' && errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-3 bg-[#2a0e0e] border border-[#cc4040] rounded-lg px-4 py-3 text-sm text-[#ffd0d0]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff8a8a" strokeWidth="2" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* nav buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={prev}
              className="text-icom-muted hover:text-white text-sm transition-colors flex items-center gap-2"
            >
              ← Zurück
            </button>
          ) : <span />}

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              disabled={!stepValid}
              className="bg-icom-accent hover:bg-icom-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg text-sm font-medium transition-all"
            >
              Weiter →
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === 'sending'}
              className="relative bg-icom-accent hover:bg-icom-accent-hover text-white px-7 py-3 rounded-lg text-sm font-medium transition-all disabled:opacity-80 disabled:cursor-wait min-w-[180px]"
              style={{ boxShadow: '0 8px 30px rgba(240,82,82,0.25)' }}
            >
              {status === 'sending' ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner /> Wird gesendet…
                </span>
              ) : (
                'Anfrage senden →'
              )}
            </button>
          )}
        </div>

        <p className="text-[11px] text-icom-dark text-center pt-1">
          Ihre Daten werden vertraulich behandelt. Keine Weitergabe an Dritte.
        </p>
      </form>
    </div>
  )
}

// ---------- subcomponents ----------

function FloatingInput({
  label, value, onChange, onBlur, type = 'text', required, error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  type?: string
  required?: boolean
  error?: string
}) {
  const [focused, setFocused] = useState(false)
  const float = focused || value.length > 0
  return (
    <div>
      <div className="relative">
        <label
          className="absolute pointer-events-none transition-all duration-200"
          style={{
            left: 14,
            top: float ? 6 : 18,
            fontSize: float ? 10 : 14,
            color: focused ? '#F05252' : float ? '#888' : '#555',
            letterSpacing: float ? '0.05em' : '0',
            textTransform: float ? 'uppercase' : 'none',
            fontWeight: float ? 500 : 400,
          }}
        >
          {label}{required && <span className="text-icom-accent ml-0.5">*</span>}
        </label>
        <input
          type={type}
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.() }}
          className="w-full bg-icom-black rounded-md px-3.5 pt-6 pb-2.5 text-white text-sm outline-none transition-all"
          style={{
            border: error ? '1px solid #cc4040' : focused ? '1px solid #F05252' : '1px solid #1c1c1c',
            boxShadow: focused ? '0 0 0 3px rgba(240,82,82,0.08), inset 0 0 18px rgba(240,82,82,0.04)' : 'none',
          }}
        />
      </div>
      {error && (
        <p className="text-[11px] text-[#ff8a8a] mt-1.5 ml-1">{error}</p>
      )}
    </div>
  )
}

function FancySelect({
  label, value, onChange, options, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div>
      <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-icom-black border border-icom-border focus:border-icom-accent rounded-md px-3.5 py-3 pr-10 text-sm outline-none transition-colors appearance-none cursor-pointer"
          style={{
            color: value ? '#fff' : '#666',
          }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-icom-accent pointer-events-none text-xs">▾</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-icom-muted text-xs">{label}</span>
      <span className="text-white text-xs text-right">{value}</span>
    </div>
  )
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="animate-spin" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function SuccessState({ saving, name }: { saving: number; name: string }) {
  return (
    <div
      className="relative bg-icom-card border border-icom-border rounded-2xl overflow-hidden p-10 md:p-12 text-center"
      role="status"
      aria-live="polite"
    >
      {/* coral burst */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(240,82,82,0.18) 0%, rgba(13,13,13,0) 60%)',
        }}
      />
      <div className="relative">
        <div className="inline-flex w-20 h-20 rounded-full bg-icom-accent/15 border border-icom-accent items-center justify-center mb-6"
          style={{ boxShadow: '0 0 30px rgba(240,82,82,0.35)' }}>
          <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
            <path
              d="M9 18 l6 6 l12 -12"
              fill="none"
              stroke="#F05252"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 36,
                strokeDashoffset: 36,
                animation: 'icomCheck 700ms ease-out 100ms forwards',
              }}
            />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Danke{name ? `, ${name.split(' ')[0]}` : ''}.
        </h3>
        <p className="text-icom-gray max-w-md mx-auto mb-6">
          Wir haben Ihre Anfrage erhalten und melden uns innerhalb von <span className="text-white">48 Stunden</span> mit einer ersten Einschätzung Ihres Einsparpotenzials.
        </p>
        <div className="inline-block bg-icom-black border border-icom-border rounded-lg px-5 py-3">
          <div className="text-[10px] uppercase tracking-wider text-icom-dark mb-1">
            Vorab-Schätzung
          </div>
          <div className="text-icom-accent font-bold text-xl tabular-nums">
            bis zu {saving.toLocaleString('de-DE')} € / Jahr
          </div>
        </div>
      </div>

      {/* keyframes injected globally — see globals.css */}
    </div>
  )
}
