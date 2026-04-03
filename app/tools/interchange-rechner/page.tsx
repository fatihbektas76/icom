'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function InterchangeRechnerPage() {
  const [volume, setVolume] = useState(100000)
  const [euShare, setEuShare] = useState(80)
  const [cardType, setCardType] = useState<'debit' | 'credit'>('credit')

  const euVolume = volume * (euShare / 100)
  const nonEuVolume = volume - euVolume

  const euIC = cardType === 'debit' ? 0.2 : 0.3
  const nonEuIC = cardType === 'debit' ? 1.15 : 1.50
  const schemeFee = 0.05

  const icCost = (euVolume * euIC / 100) + (nonEuVolume * nonEuIC / 100)
  const schemeFeeCost = volume * schemeFee / 100
  const pspMargin = volume * 0.11 / 100 + (volume / 50) * 0.12 // assuming avg 50€ tx
  const totalICPP = icCost + schemeFeeCost + pspMargin
  const flatRate = volume * 1.75 / 100
  const saving = flatRate - totalICPP
  const savingPct = Math.round((saving / flatRate) * 100)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Interchange-Rechner</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Interchange-<span className="text-icom-accent">Rechner</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-12">
          Berechnen Sie, ob Interchange++ günstiger ist als Flat-Rate. Verstehen Sie die
          Kostenstruktur von Kartenzahlungen.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-6">
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Monatlicher Kartenumsatz</label>
              <input type="range" min={10000} max={1000000} step={10000} value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full accent-icom-accent" />
              <div className="text-icom-accent font-bold text-right mt-1">{volume.toLocaleString('de-DE')} €</div>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">EU-Kartenanteil</label>
              <input type="range" min={0} max={100} step={5} value={euShare} onChange={e => setEuShare(Number(e.target.value))} className="w-full accent-icom-accent" />
              <div className="text-icom-accent font-bold text-right mt-1">{euShare}% EU / {100 - euShare}% Non-EU</div>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Kartentyp (Mehrheit)</label>
              <div className="flex gap-3">
                <button onClick={() => setCardType('debit')} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${cardType === 'debit' ? 'bg-icom-accent border-icom-accent text-white' : 'bg-icom-black border-icom-border text-icom-gray'}`}>
                  Debitkarte
                </button>
                <button onClick={() => setCardType('credit')} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${cardType === 'credit' ? 'bg-icom-accent border-icom-accent text-white' : 'bg-icom-black border-icom-border text-icom-gray'}`}>
                  Kreditkarte
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Kostenaufschlüsselung</h2>

            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-3">Interchange++</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-icom-gray">Interchange Fee (EU)</span><span className="text-white">{Math.round(euVolume * euIC / 100).toLocaleString('de-DE')} €</span></div>
                <div className="flex justify-between"><span className="text-icom-gray">Interchange Fee (Non-EU)</span><span className="text-white">{Math.round(nonEuVolume * nonEuIC / 100).toLocaleString('de-DE')} €</span></div>
                <div className="flex justify-between"><span className="text-icom-gray">Scheme Fee (0,05%)</span><span className="text-white">{Math.round(schemeFeeCost).toLocaleString('de-DE')} €</span></div>
                <div className="flex justify-between"><span className="text-icom-gray">PSP-Marge (0,11% + 0,12€)</span><span className="text-white">{Math.round(pspMargin).toLocaleString('de-DE')} €</span></div>
                <div className="flex justify-between border-t border-icom-border pt-2 font-bold"><span className="text-white">Gesamt IC++</span><span className="text-green-500">{Math.round(totalICPP).toLocaleString('de-DE')} €</span></div>
              </div>
            </div>

            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-3">Flat-Rate (1,75%)</div>
              <div className="flex justify-between text-sm font-bold"><span className="text-white">Gesamt Flat-Rate</span><span className="text-icom-accent">{Math.round(flatRate).toLocaleString('de-DE')} €</span></div>
            </div>

            <div className="bg-icom-card border border-icom-accent/30 rounded-xl p-5">
              <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-2">Einsparung mit IC++</div>
              <div className="text-2xl font-bold text-green-500">
                {saving > 0 ? `${Math.round(saving).toLocaleString('de-DE')} € / Monat` : 'Flat-Rate ist günstiger'}
              </div>
              {saving > 0 && (
                <div className="text-sm text-icom-gray mt-1">
                  {savingPct}% weniger · {Math.round(saving * 12).toLocaleString('de-DE')} € / Jahr
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Persönliche Interchange-Analyse</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Mit Ihren echten Transaktionsdaten berechnen wir das exakte Einsparpotenzial.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Jetzt Analyse anfordern →
          </Link>
        </div>
      </section>
    </>
  )
}
