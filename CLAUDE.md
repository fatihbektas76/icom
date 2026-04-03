# CLAUDE.md – iCOM Group SEO/GEO Website

## Projektübersicht

Du baust eine programmatische SEO/GEO-optimierte Next.js-Website für die **iCOM Group (Intelligent Commerce Group S.a.r.l.)** – einen Payment-Beratungsdienstleister aus Luxemburg.

Die Seite folgt exakt der gleichen technischen Architektur wie `gekuendigt-abfindung.de`. Kopiere dieses Projekt als Basis und baue es vollständig auf iCOM um.

---

## Schritt 0: Git-Konfiguration (KRITISCH – immer zuerst)

```bash
cd ~/icom
git config user.email "fb@fb-re.de"
# NIEMALS --global verwenden
```

---

## Schritt 1: Projekt anlegen

```bash
# Basis von gekuendigt-abfindung kopieren
cp -r ~/gekuendigt-abfindung ~/icom
cd ~/icom

# Git neu initialisieren
rm -rf .git
git init
git config user.email "fb@fb-re.de"
git remote add origin https://github.com/fatihbektas76/icom.git

# Dependencies installieren
npm install
```

---

## Schritt 2: Projektidentität ersetzen

Ersetze alle Vorkommnisse der alten Domain/Marke durch iCOM:

| Suchen | Ersetzen durch |
|--------|---------------|
| `gekuendigt-abfindung.de` | `icom-group.net` |
| `APOS Legal` / `Arbeitsrecht` | `iCOM Group` / `Payment` |
| `G-WT7MNFB47D` | `G-PLACEHOLDER` ← wird später ersetzt |

---

## Schritt 3: Farben komplett ersetzen (WICHTIG)

Ersetze alle alten Farben in `tailwind.config.ts` und `globals.css`:

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        icom: {
          black:          '#0D0D0D',   // Haupt-Hintergrund
          card:           '#161616',   // Karten
          'card-dark':    '#111111',   // Dunklere Sections
          border:         '#1C1C1C',   // Trennlinien
          'border-light': '#2A2A2A',   // Sichtbarere Trennlinien
          accent:         '#F05252',   // Coral – PRIMÄRE AKZENTFARBE
          'accent-hover': '#D93F3F',   // Hover-State
          icon:           '#F05252',   // Icon-Boxen (coral, nicht blau!)
          gray:           '#C8C8C8',   // Sekundärtext
          muted:          '#888888',   // Dezenter Text
          dark:           '#555555',   // Sehr dezent
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 1.6s infinite',
        'count-up': 'countUp 1.2s ease-out',
      }
    }
  },
  plugins: [],
}
export default config
```

### app/globals.css

```css
:root {
  --bg-primary:      #0D0D0D;
  --bg-card:         #161616;
  --bg-card-dark:    #111111;
  --border:          #1C1C1C;
  --border-light:    #2A2A2A;
  --accent:          #F05252;
  --accent-hover:    #D93F3F;
  --text-primary:    #FFFFFF;
  --text-secondary:  #C8C8C8;
  --text-muted:      #888888;
  --text-dark:       #555555;
  --icon-bg:         #F05252;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, sans-serif;
}

/* Partikel-Canvas Hero */
canvas#particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Animierter Pulse-Dot */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

/* Flow-Pulse-Animation */
@keyframes flowPulse {
  0%   { left: -60%; }
  100% { left: 110%; }
}

/* Count-Up Animation */
@keyframes countUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## Schritt 4: Komponenten anlegen

### 4.1 Header (`components/layout/Header.tsx`)

```tsx
// Design-Referenz aus Screenshots:
// - Hintergrund: #0D0D0D
// - Logo: SVG mit 3 Wellenlinien in #F05252 + Text "i.COM"
// - Nav-Links: #888, hover: #fff, aktiv: #F05252
// - Sprachauswahl: Border #444, rounded
// - Kontakt-Button: border #fff rgba(30%), hover border #F05252
```

### 4.2 Footer (`components/layout/Footer.tsx`)

```tsx
// 4 Spalten:
// 1. Logo + Adresse (Intelligent Commerce Group S.a.r.l., 1 Place du Marché, L-6755 Grevenmacher, +49 1515 282 021 6)
// 2. Navigation (Start, Lösungen, Vision, Blog, Kontakt)
// 3. Newsletter (Input + Absenden-Button in #F05252)
// 4. LinkedIn-Icon + Cookies/Impressum/Datenschutz
// Footer-BG: #0D0D0D, border-top: #1C1C1C
// Copyright: © 2025 i.COM
```

### 4.3 Hero-Partikel (`components/ui/ParticleCanvas.tsx`)

```tsx
'use client'
import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let w = canvas.parentElement!.offsetWidth
    let h = 460
    canvas.width = w
    canvas.height = h

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.strokeStyle = `rgba(240,82,82,${(1 - d / 130) * 0.18})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(240,82,82,${Math.random() * 0.3 + 0.25})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas id="particles" ref={canvasRef} />
}
```

### 4.4 CountUp (`components/ui/CountUp.tsx`)

```tsx
'use client'
import { useEffect, useState, useRef } from 'react'

export default function CountUp({ target, suffix = '+', duration = 1300 }: {
  target: number; suffix?: string; duration?: number
}) {
  const [value, setValue] = useState(0)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    ref.current = true
    const steps = 60
    const step = target / steps
    let cur = 0
    const timer = setInterval(() => {
      cur += step
      if (cur >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.round(cur))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target, duration])

  return <>{value.toLocaleString('de-DE')}{suffix}</>
}
```

### 4.5 PaymentRechner (`components/tools/PaymentRechner.tsx`)

```tsx
'use client'
import { useState } from 'react'

const PSP_RATES: Record<string, number> = {
  stripe:  1.75,
  paypal:  1.84,
  mollie:  2.05,
  sumup:   1.69,
}

export default function PaymentRechner() {
  const [volume, setVolume] = useState(80000)
  const [psp, setPsp] = useState('stripe')

  const rate = PSP_RATES[psp] / 100
  const current = volume * rate
  const optimized = current * 0.72
  const saving = (current - optimized) * 12
  const pct = Math.round(((current - optimized) / current) * 100)

  return (
    <div className="bg-icom-card border border-icom-border rounded-xl p-7">
      {/* Umsatz-Slider */}
      <div className="mb-5">
        <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">
          Monatlicher Kartenumsatz
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range" min={5000} max={500000} step={5000}
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="flex-1 accent-icom-accent"
          />
          <span className="text-icom-accent font-bold text-sm min-w-[90px] text-right">
            {volume.toLocaleString('de-DE')} €
          </span>
        </div>
      </div>

      {/* PSP Select */}
      <div className="mb-5">
        <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">
          Aktueller PSP
        </label>
        <select
          value={psp}
          onChange={e => setPsp(e.target.value)}
          className="w-full bg-icom-black border border-icom-border rounded-md px-3 py-2.5 text-icom-gray text-sm outline-none"
        >
          <option value="stripe">Stripe (1,50 % + 0,25 €)</option>
          <option value="paypal">PayPal (1,49 % + 0,35 €)</option>
          <option value="mollie">Mollie (1,80 % + 0,25 €)</option>
          <option value="sumup">SumUp (1,69 %)</option>
        </select>
      </div>

      {/* Ergebnis */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-icom-black border border-icom-border rounded-lg p-4">
          <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-1">Aktuell / Monat</div>
          <div className="text-xl font-bold text-icom-accent">
            {Math.round(current).toLocaleString('de-DE')} €
          </div>
        </div>
        <div className="bg-icom-black border border-icom-border rounded-lg p-4">
          <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-1">Optimiert / Monat</div>
          <div className="text-xl font-bold text-green-500">
            {Math.round(optimized).toLocaleString('de-DE')} €
          </div>
        </div>
      </div>

      {/* Savings Bar */}
      <div className="bg-icom-black border border-icom-border rounded-lg p-4">
        <div className="flex justify-between text-[11px] text-icom-dark mb-2">
          <span>Jährliches Einsparpotenzial</span>
          <span className="text-icom-accent font-bold">
            {Math.round(saving).toLocaleString('de-DE')} €
          </span>
        </div>
        <div className="h-1.5 bg-icom-border rounded-full overflow-hidden">
          <div
            className="h-full bg-icom-accent rounded-full transition-all duration-500"
            style={{ width: `${Math.min(pct, 45)}%` }}
          />
        </div>
        <div className="text-[10px] text-icom-dark mt-1.5">
          Ø {pct}% Reduktion in Ihrer Kategorie
        </div>
      </div>

      <button className="w-full mt-4 bg-icom-accent hover:bg-icom-accent-hover text-white rounded-lg py-3 text-sm font-medium transition-colors">
        Kostenlose Analyse anfordern →
      </button>
    </div>
  )
}
```

### 4.6 PSP-Balkendiagramm (`components/ui/PSPBars.tsx`)

```tsx
'use client'
import { useEffect, useState } from 'react'

const psps = [
  { name: 'Adyen',   rate: 0.45, color: 'border border-icom-accent bg-transparent' },
  { name: 'Stripe',  rate: 1.75, color: 'bg-icom-accent' },
  { name: 'SumUp',   rate: 1.69, color: 'bg-[#c03f3f]' },
  { name: 'PayPal',  rate: 1.84, color: 'bg-[#8a2a2a]' },
  { name: 'Mollie',  rate: 2.05, color: 'bg-[#6e2020]' },
]
const MAX = 2.5

export default function PSPBars() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col gap-3.5 mt-8">
      {psps.map(p => (
        <div key={p.name} className="flex items-center gap-4">
          <span className="text-sm font-medium text-white min-w-[70px]">{p.name}</span>
          <div className="flex-1 h-8 bg-icom-card border border-icom-border rounded-md overflow-hidden relative">
            <div
              className={`h-full rounded-md flex items-center pl-3 text-xs text-white font-medium transition-all duration-700 ${p.color}`}
              style={{ width: visible ? `${(p.rate / MAX) * 100}%` : '0%' }}
            >
              {p.rate.toFixed(2)}%
            </div>
          </div>
          <span className="text-xs text-icom-dark min-w-[48px] text-right">
            {p.rate.toFixed(2)} €
          </span>
        </div>
      ))}
      <p className="text-[11px] text-icom-dark mt-1 pl-[86px]">
        * Adyen Interchange++ inkl. Scheme Fee. Alle anderen: Flat-Rate EU-Karte, 100 € Transaktion.
      </p>
    </div>
  )
}
```

### 4.7 Zahlungsflow-Diagramm (`components/ui/PaymentFlow.tsx`)

```tsx
// 6 Nodes: Karte → PSP → Kartennetzwerk → Issuer-Bank → Genehmigung → Händler
// Nodes mit coral border, aktive Nodes mit coral BG
// Verbindungslinien mit animiertem Pulse (CSS animation: flowPulse)
// Darunter: Badge "Ø 1,8 Sekunden · Auszahlung: 1–2 Werktage"
```

---

## Schritt 5: Daten-Layer anlegen

### `lib/data/branchen.ts`

```typescript
export interface Branche {
  slug: string
  name: string
  avgMDR: number          // Ø MDR in %
  avgSaving: number       // Ø Einsparpotenzial in %
  avgMonthlyVolume: number
  topPSPs: string[]
  painPoints: string[]
  faq: Array<{ q: string; a: string }>
}

export const branchen: Branche[] = [
  {
    slug: 'hotel',
    name: 'Hotel',
    avgMDR: 2.1,
    avgSaving: 28,
    avgMonthlyVolume: 85000,
    topPSPs: ['unzer', 'adyen', 'stripe'],
    painPoints: [
      'Hohe Gebühren bei Non-EU-Kreditkarten internationaler Gäste',
      'No-Show-Verluste durch fehlende Vorautorisierung',
      'Backoffice-Aufwand bei manuellen E-Mail-Zahlungen',
    ],
    faq: [
      { q: 'Wie hoch sind die Payment-Kosten für Hotels?', a: 'Hotels zahlen im Schnitt 1,8–2,4 % MDR, abhängig vom internationalen Gästeanteil.' },
      { q: 'Wie reduziert ein Hotel No-Shows?', a: 'Durch korrekte Vorautorisierung (Pre-Auth) und paybyMail-Vorauszahlungslinks.' },
    ],
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    avgMDR: 1.75,
    avgSaving: 22,
    avgMonthlyVolume: 28000,
    topPSPs: ['sumup', 'zettle', 'unzer'],
    painPoints: ['Hohe POS-Terminalgebühren', 'Trinkgeld-Problematik', 'Kein Tipping-Workflow'],
    faq: [],
  },
  {
    slug: 'onlineshop',
    name: 'Online-Shop',
    avgMDR: 1.85,
    avgSaving: 26,
    avgMonthlyVolume: 120000,
    topPSPs: ['stripe', 'mollie', 'adyen'],
    painPoints: ['Hohe Non-EU-Kartengebühren', 'Fehlende lokale Zahlungsarten', 'Chargeback-Rate'],
    faq: [],
  },
  { slug: 'arzt', name: 'Arztpraxis', avgMDR: 1.6, avgSaving: 18, avgMonthlyVolume: 15000, topPSPs: ['paybymail', 'stripe'], painPoints: [], faq: [] },
  { slug: 'kfz-haendler', name: 'KFZ-Händler', avgMDR: 1.7, avgSaving: 20, avgMonthlyVolume: 45000, topPSPs: ['unzer', 'adyen'], painPoints: [], faq: [] },
  { slug: 'reisebuero', name: 'Reisebüro', avgMDR: 2.2, avgSaving: 30, avgMonthlyVolume: 95000, topPSPs: ['paybymail', 'unzer'], painPoints: [], faq: [] },
  { slug: 'fitnessstudio', name: 'Fitnessstudio', avgMDR: 1.5, avgSaving: 16, avgMonthlyVolume: 22000, topPSPs: ['stripe', 'mollie'], painPoints: [], faq: [] },
  { slug: 'apotheke', name: 'Apotheke', avgMDR: 1.4, avgSaving: 14, avgMonthlyVolume: 35000, topPSPs: ['sumup', 'unzer'], painPoints: [], faq: [] },
  { slug: 'einzelhandel', name: 'Einzelhandel', avgMDR: 1.65, avgSaving: 20, avgMonthlyVolume: 55000, topPSPs: ['sumup', 'zettle', 'unzer'], painPoints: [], faq: [] },
  { slug: 'saas', name: 'SaaS', avgMDR: 1.9, avgSaving: 24, avgMonthlyVolume: 75000, topPSPs: ['stripe', 'adyen'], painPoints: [], faq: [] },
  { slug: 'marketplace', name: 'Marketplace', avgMDR: 2.0, avgSaving: 25, avgMonthlyVolume: 200000, topPSPs: ['stripe', 'adyen'], painPoints: [], faq: [] },
  { slug: 'handwerk', name: 'Handwerk', avgMDR: 1.55, avgSaving: 17, avgMonthlyVolume: 18000, topPSPs: ['paybymail', 'sumup'], painPoints: [], faq: [] },
  { slug: 'immobilien', name: 'Immobilien', avgMDR: 1.8, avgSaving: 22, avgMonthlyVolume: 40000, topPSPs: ['paybymail', 'stripe'], painPoints: [], faq: [] },
  { slug: 'beauty-salon', name: 'Beauty-Salon', avgMDR: 1.7, avgSaving: 19, avgMonthlyVolume: 12000, topPSPs: ['sumup', 'zettle'], painPoints: [], faq: [] },
  { slug: 'zahnarzt', name: 'Zahnarzt', avgMDR: 1.6, avgSaving: 18, avgMonthlyVolume: 20000, topPSPs: ['paybymail', 'stripe'], painPoints: [], faq: [] },
  { slug: 'tankstelle', name: 'Tankstelle', avgMDR: 1.45, avgSaving: 15, avgMonthlyVolume: 80000, topPSPs: ['unzer', 'adyen'], painPoints: [], faq: [] },
  { slug: 'baeckerei', name: 'Bäckerei', avgMDR: 1.5, avgSaving: 15, avgMonthlyVolume: 8000, topPSPs: ['sumup', 'zettle'], painPoints: [], faq: [] },
  { slug: 'supermarkt', name: 'Supermarkt', avgMDR: 1.4, avgSaving: 14, avgMonthlyVolume: 150000, topPSPs: ['adyen', 'unzer'], painPoints: [], faq: [] },
  { slug: 'logistik', name: 'Logistik', avgMDR: 1.75, avgSaving: 20, avgMonthlyVolume: 60000, topPSPs: ['stripe', 'mollie'], painPoints: [], faq: [] },
  { slug: 'coworking', name: 'Coworking', avgMDR: 1.65, avgSaving: 18, avgMonthlyVolume: 16000, topPSPs: ['stripe', 'mollie'], painPoints: [], faq: [] },
]

export function getBrancheBySlug(slug: string) {
  return branchen.find(b => b.slug === slug)
}
```

### `lib/data/psp-anbieter.ts`

```typescript
export interface PSP {
  slug: string
  name: string
  model: 'flat-rate' | 'interchange++'  | 'individuell'
  euRate?: number
  extraFee?: number
  nonEURate?: number
  monthly: number
  pros: string[]
  cons: string[]
  bestFor: string[]
}

export const pspAnbieter: PSP[] = [
  {
    slug: 'stripe',
    name: 'Stripe',
    model: 'flat-rate',
    euRate: 1.5,
    extraFee: 0.25,
    nonEURate: 2.9,
    monthly: 0,
    pros: ['Beste API der Branche', 'Exzellente Dokumentation', 'Stripe Billing für Abos', 'Stripe Connect für Marktplätze'],
    cons: ['Kein deutschsprachiger Support', 'Non-EU-Gebühren relativ hoch', 'Kein eigenes Wallet'],
    bestFor: ['SaaS', 'Startups', 'Marktplätze', 'Tech-Teams'],
  },
  {
    slug: 'paypal',
    name: 'PayPal',
    model: 'flat-rate',
    euRate: 1.49,
    extraFee: 0.35,
    nonEURate: 3.49,
    monthly: 0,
    pros: ['Höchste Conversion in Deutschland', 'Käuferschutz bindet Kunden', 'Einfache Integration'],
    cons: ['Konto-Einfrierungen möglich', 'Non-EU-Gebühren sehr hoch', 'Wenig Flexibilität'],
    bestFor: ['B2C-Shops', 'Kleine Händler', 'Shops mit DE-Kundenstamm'],
  },
  {
    slug: 'mollie',
    name: 'Mollie',
    model: 'flat-rate',
    euRate: 1.8,
    extraFee: 0.25,
    nonEURate: 2.9,
    monthly: 0,
    pros: ['Europäischer Fokus', 'Guter Support', 'Viele lokale Zahlungsarten'],
    cons: ['Etwas teurer als Stripe', 'Weniger Features für komplexe Architekturen'],
    bestFor: ['Mittelgroße Shops', 'Europäisches Geschäft', 'Shops mit Lokalisierungsbedarf'],
  },
  {
    slug: 'adyen',
    name: 'Adyen',
    model: 'interchange++',
    euRate: 0.11,
    extraFee: 0.12,
    monthly: 0,
    pros: ['Günstigstes Modell bei hohem Volumen', 'Enterprise-Qualität', 'POS + Online aus einer Hand'],
    cons: ['Mindestvolumen empfohlen', 'Komplexere Integration', 'Kein Self-Service'],
    bestFor: ['Großunternehmen', 'Omnichannel', 'Ab 200.000 € Monatsumsatz'],
  },
  {
    slug: 'unzer',
    name: 'Unzer',
    model: 'individuell',
    monthly: 0,
    pros: ['Direkt auf DACH-Markt ausgerichtet', 'Persönlicher Account Manager', 'Individuelle Konditionen', 'Starke PMS-Integrationen'],
    cons: ['Keine transparenten Listenpreise', 'Nicht für Kleinstunternehmen'],
    bestFor: ['Mittelstand', 'Hotels', 'Branchen mit komplexen Anforderungen'],
  },
  {
    slug: 'sumup',
    name: 'SumUp',
    model: 'flat-rate',
    euRate: 1.69,
    extraFee: 0,
    monthly: 0,
    pros: ['Keine monatlichen Gebühren', 'Einfachste Lösung', 'Günstige Hardware'],
    cons: ['Nur POS-fokussiert', 'Wenig Funktionsumfang online', 'Kein Interchange++'],
    bestFor: ['Stationärer Handel', 'Kleinunternehmer', 'Einstiegslösung'],
  },
]
```

### `lib/data/staedte.ts`

```typescript
export const staedte = [
  { slug: 'muenchen',    name: 'München',    state: 'Bayern',              population: 1512491 },
  { slug: 'berlin',      name: 'Berlin',     state: 'Berlin',              population: 3677472 },
  { slug: 'hamburg',     name: 'Hamburg',    state: 'Hamburg',             population: 1853935 },
  { slug: 'frankfurt',   name: 'Frankfurt',  state: 'Hessen',              population: 773068  },
  { slug: 'koeln',       name: 'Köln',       state: 'NRW',                 population: 1084394 },
  { slug: 'stuttgart',   name: 'Stuttgart',  state: 'Baden-Württemberg',   population: 626275  },
  { slug: 'heidelberg',  name: 'Heidelberg', state: 'Baden-Württemberg',   population: 160601  },
  { slug: 'mannheim',    name: 'Mannheim',   state: 'Baden-Württemberg',   population: 309370  },
  { slug: 'duesseldorf', name: 'Düsseldorf', state: 'NRW',                 population: 619294  },
  { slug: 'dortmund',    name: 'Dortmund',   state: 'NRW',                 population: 586600  },
  { slug: 'essen',       name: 'Essen',      state: 'NRW',                 population: 582415  },
  { slug: 'leipzig',     name: 'Leipzig',    state: 'Sachsen',             population: 620523  },
  { slug: 'dresden',     name: 'Dresden',    state: 'Sachsen',             population: 556780  },
  { slug: 'nuernberg',   name: 'Nürnberg',   state: 'Bayern',              population: 515543  },
  { slug: 'hannover',    name: 'Hannover',   state: 'Niedersachsen',       population: 538068  },
  { slug: 'bremen',      name: 'Bremen',     state: 'Bremen',              population: 566573  },
  { slug: 'bochum',      name: 'Bochum',     state: 'NRW',                 population: 364920  },
  { slug: 'wuppertal',   name: 'Wuppertal',  state: 'NRW',                 population: 354382  },
  { slug: 'bielefeld',   name: 'Bielefeld',  state: 'NRW',                 population: 341755  },
  { slug: 'bonn',        name: 'Bonn',       state: 'NRW',                 population: 329673  },
]
```

---

## Schritt 6: App Router – Seitenstruktur

### `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://icom-group.net'),
  title: { default: 'iCOM Group – Payment-Beratung', template: '%s | iCOM Group' },
  description: 'Unabhängige Payment-Beratung: PSP-Vergleich, Kostenoptimierung und digitale Zahlungslösungen für Unternehmen in Deutschland.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://icom-group.net',
    siteName: 'iCOM Group',
  },
}

const GA_ID = 'G-PLACEHOLDER' // ← Ersetzen durch echte ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### `app/page.tsx` (Homepage)

Baue die Homepage mit folgenden Sections in dieser Reihenfolge:

1. **Hero** – Partikel-Canvas + Badge + H1 + Subtext + 2 CTAs
2. **Stats-Bar** – CountUp: 10+ Jahre / 4K+ Kunden / 500+ Projekte
3. **Services** – 3 Cards: Payment Solutions / Online Payments / Kosten optimieren
4. **Zahlungsflow-Diagramm** – „Eine Kartenzahlung in 1,8 Sekunden"
5. **Payment-Rechner** – mit Schritt-Visualisierung links
6. **PSP-Vergleich** – Balkendiagramm + Link zu /tools/psp-vergleich
7. **Testimonials** – 3 Spalten mit Metriken (−52% No-Shows etc.)
8. **Partner-Logos** – Unzer / vobapay / secupay
9. **CTA-Banner** – Konzentrische Ringe + Buttons
10. **Footer**

### Dynamische Routen

```
app/payment-kosten/[branche]/page.tsx     → generateStaticParams aus branchen.ts
app/psp-vergleich/[vergleich]/page.tsx    → generateStaticParams aus psp-kombinationen
app/ecommerce-payment/[platform]/page.tsx → generateStaticParams aus platforms[]
app/pos-loesung/[typ]/page.tsx            → generateStaticParams aus pos-typen[]
app/paybymail/[usecase]/page.tsx          → generateStaticParams aus usecases[]
app/wissen/[thema]/page.tsx               → generateStaticParams aus themen[]
app/payment-beratung/[stadt]/page.tsx     → generateStaticParams aus staedte.ts
```

Jede dynamische Seite braucht:
- Mindest-Content: 800 Wörter
- 1 Datentabelle (z.B. Gebührenvergleich)
- 5–8 FAQ mit FAQPage-Schema
- BreadcrumbList-Schema
- generateMetadata() mit slug-spezifischem title/description

---

## Schritt 7: Schema Markup

### `components/seo/SchemaMarkup.tsx`

```tsx
export function OrganizationSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'iCOM Group – Payment Beratung',
      description: 'Unabhängige Payment-Beratung: PSP-Vergleich, Kostenoptimierung, E-Commerce & POS',
      url: 'https://icom-group.net',
      telephone: '+4915152820216',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1 Place du Marché',
        addressLocality: 'Grevenmacher',
        postalCode: 'L-6755',
        addressCountry: 'LU',
      },
      areaServed: { '@type': 'Country', name: 'Germany' },
      knowsAbout: ['Payment Processing', 'E-Commerce Payments', 'POS Systems', 'Payment Service Provider', 'Interchange Fees', 'paybyMail'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
      },
    })}} />
  )
}

export function FAQSchema({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })}} />
  )
}
```

---

## Schritt 8: Sitemap

### `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { branchen } from '@/lib/data/branchen'
import { staedte } from '@/lib/data/staedte'

const BASE = 'https://icom-group.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/lösungen', '/vision', '/blog', '/kontakt',
    '/tools/payment-kosten-rechner', '/tools/psp-vergleich', '/tools/pos-rechner',
    '/tools/interchange-rechner', '/tools/wechsel-roi', '/tools/paybymail-check',
  ].map(r => ({ url: `${BASE}${r}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: r === '' ? 1 : 0.8 }))

  const branchenRoutes = branchen.map(b => ({
    url: `${BASE}/payment-kosten/${b.slug}`,
    lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7,
  }))

  const stadtRoutes = staedte.map(s => ({
    url: `${BASE}/payment-beratung/${s.slug}`,
    lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6,
  }))

  return [...staticRoutes, ...branchenRoutes, ...stadtRoutes]
}
```

---

## Schritt 9: Tools-Seiten

Implementiere alle 6 Tools als Client Components:

| Route | Tool |
|---|---|
| `/tools/payment-kosten-rechner` | `PaymentRechner` (bereits oben) |
| `/tools/psp-vergleich` | Side-by-Side bis 3 PSPs |
| `/tools/pos-rechner` | Terminal + Transaktionskosten |
| `/tools/interchange-rechner` | Bildungs-Tool |
| `/tools/wechsel-roi` | Break-even-Rechner |
| `/tools/paybymail-check` | 5-Fragen-Quiz → Eignung % |

---

## Schritt 10: Deployment

```bash
# Vor dem ersten Push
git add .
git commit -m "feat: iCOM SEO initial setup"
git push origin main

# Vercel
# → vercel.com → New Project → GitHub → fatihbektas76/icom
# → Framework: Next.js (auto-detected)
# → Build Command: npm run build
# → Root Directory: ./

# DNS (icom-group.net)
# CNAME www → <projekt>.vercel-dns.com
# A     @   → 216.198.79.1
```

---

## Unternehmens-Referenz (für alle Seiteninhalte)

```
Name:      Intelligent Commerce Group S.a.r.l.
Marke:     i.COM / iCOM Group
Domain:    icom-group.net
Tel:       +49 (0) 1515 282 021 6
Adresse:   1 Place du Marché, L-6755 Grevenmacher (Luxemburg)
Partner:   Unzer, vobapay, secupay
Stats:     10+ Jahre · 4.000+ Kunden · 500+ Projekte
Produkte:  Payment Solutions, E-Commerce, POS, paybyMail
GA-ID:     G-PLACEHOLDER  ← durch echte ID ersetzen
```

---

## Design-Referenz (NICHT abweichen)

```
BG:           #0D0D0D
Karten:       #161616
Border:       #1C1C1C
Akzent:       #F05252  ← einzige Akzentfarbe, überall
Icon-Boxen:   #F05252  (coral, NICHT blau)
Text:         #FFFFFF / #C8C8C8 / #888888
Font:         Inter
Hero-Effekt:  Partikel-Netzwerk animiert (canvas, coral)
CTAs:         immer #F05252 background, weiße Schrift
```

---

*CLAUDE.md – iCOM SEO Projekt | Erstellt April 2025*
