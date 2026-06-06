'use client'
import { useState } from 'react'

const PSP_RATES: Record<string, number> = {
  stripe:  1.75,
  paypal:  1.84,
  mollie:  2.05,
  sumup:   1.69,
}

const MIN_VOLUME = 5000
const MAX_VOLUME = 20_000_000
const LOG_MIN = Math.log(MIN_VOLUME)
const LOG_MAX = Math.log(MAX_VOLUME)

function sliderToVolume(slider: number): number {
  const value = Math.exp(LOG_MIN + (slider / 100) * (LOG_MAX - LOG_MIN))
  if (value >= 1_000_000) return Math.round(value / 100_000) * 100_000
  if (value >= 100_000)   return Math.round(value / 10_000)  * 10_000
  if (value >= 10_000)    return Math.round(value / 1_000)   * 1_000
  return Math.round(value / 500) * 500
}

function volumeToSlider(volume: number): number {
  return ((Math.log(volume) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100
}

function formatVolume(volume: number): string {
  if (volume >= 1_000_000) {
    const mio = volume / 1_000_000
    return `${mio.toLocaleString('de-DE', { maximumFractionDigits: 1 })} Mio. €`
  }
  if (volume >= 10_000) {
    return `${Math.round(volume / 1000).toLocaleString('de-DE')}k €`
  }
  return `${volume.toLocaleString('de-DE')} €`
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
        <div className="flex items-baseline justify-between mb-2">
          <label className="block text-[11px] text-icom-dark uppercase tracking-wider">
            Monatlicher Kartenumsatz
          </label>
          <span className="text-icom-accent font-bold text-base tabular-nums">
            {formatVolume(volume)}
          </span>
        </div>
        <input
          type="range" min={0} max={100} step={0.1}
          value={volumeToSlider(volume)}
          onChange={e => setVolume(sliderToVolume(Number(e.target.value)))}
          className="w-full accent-icom-accent"
        />
        <div className="flex justify-between text-[10px] text-icom-dark mt-1.5">
          <span>5k</span>
          <span>50k</span>
          <span>500k</span>
          <span>5 Mio.</span>
          <span>20 Mio.</span>
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
