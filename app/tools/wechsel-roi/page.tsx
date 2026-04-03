'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WechselROIPage() {
  const [volume, setVolume] = useState(80000)
  const [currentRate, setCurrentRate] = useState(1.85)
  const [newRate, setNewRate] = useState(1.35)
  const [setupCost, setSetupCost] = useState(500)
  const [downtime, setDowntime] = useState(0)

  const monthlySaving = volume * (currentRate - newRate) / 100
  const annualSaving = monthlySaving * 12
  const downtimeCost = downtime * volume * 0.03
  const totalFirstYearSaving = annualSaving - setupCost - downtimeCost
  const breakEvenMonths = monthlySaving > 0 ? Math.ceil((setupCost + downtimeCost) / monthlySaving) : 0
  const threeYearSaving = annualSaving * 3 - setupCost - downtimeCost

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Wechsel-ROI-Rechner</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Wechsel-ROI-<span className="text-icom-accent">Rechner</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-12">
          Berechnen Sie, ob sich ein PSP-Wechsel lohnt. Break-even-Analyse inklusive
          Setup-Kosten und Übergangszeit.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-5">
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Monatlicher Kartenumsatz</label>
              <input type="range" min={5000} max={500000} step={5000} value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full accent-icom-accent" />
              <div className="text-icom-accent font-bold text-right mt-1">{volume.toLocaleString('de-DE')} €</div>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Aktuelle Rate (%)</label>
              <input type="range" min={0.5} max={3.5} step={0.05} value={currentRate} onChange={e => setCurrentRate(Number(e.target.value))} className="w-full accent-icom-accent" />
              <div className="text-icom-accent font-bold text-right mt-1">{currentRate.toFixed(2)}%</div>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Neue Rate nach Optimierung (%)</label>
              <input type="range" min={0.3} max={3.0} step={0.05} value={newRate} onChange={e => setNewRate(Number(e.target.value))} className="w-full accent-icom-accent" />
              <div className="text-green-500 font-bold text-right mt-1">{newRate.toFixed(2)}%</div>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Setup-/Migrationskosten (einmalig)</label>
              <input type="range" min={0} max={5000} step={100} value={setupCost} onChange={e => setSetupCost(Number(e.target.value))} className="w-full accent-icom-accent" />
              <div className="text-icom-accent font-bold text-right mt-1">{setupCost.toLocaleString('de-DE')} €</div>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Geschätzte Downtime (Tage)</label>
              <input type="range" min={0} max={14} step={1} value={downtime} onChange={e => setDowntime(Number(e.target.value))} className="w-full accent-icom-accent" />
              <div className="text-icom-accent font-bold text-right mt-1">{downtime} Tage</div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">ROI-Analyse</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-icom-card border border-icom-border rounded-xl p-5">
                <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-1">Monatl. Einsparung</div>
                <div className="text-xl font-bold text-green-500">{Math.round(monthlySaving).toLocaleString('de-DE')} €</div>
              </div>
              <div className="bg-icom-card border border-icom-border rounded-xl p-5">
                <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-1">Break-even</div>
                <div className="text-xl font-bold text-icom-accent">{breakEvenMonths > 0 ? `${breakEvenMonths} Monate` : '–'}</div>
              </div>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-5">
              <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-1">Einsparung 1. Jahr (nach Kosten)</div>
              <div className={`text-2xl font-bold ${totalFirstYearSaving > 0 ? 'text-green-500' : 'text-icom-accent'}`}>
                {Math.round(totalFirstYearSaving).toLocaleString('de-DE')} €
              </div>
            </div>
            <div className="bg-icom-card border border-icom-accent/30 rounded-xl p-5">
              <div className="text-[10px] text-icom-dark uppercase tracking-wider mb-1">Einsparung über 3 Jahre</div>
              <div className="text-3xl font-bold text-green-500">
                {Math.round(threeYearSaving).toLocaleString('de-DE')} €
              </div>
              <div className="text-sm text-icom-gray mt-1">
                ROI: {setupCost > 0 ? `${Math.round((threeYearSaving / setupCost) * 100)}%` : '∞'}
              </div>
            </div>
            <p className="text-[11px] text-icom-dark">
              * Berechnung basiert auf konstanten Umsätzen. Tatsächliche Einsparungen können variieren.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Individuelle ROI-Analyse</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Wir berechnen den exakten ROI mit Ihren echten Daten. Kostenlos und unverbindlich.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Jetzt ROI berechnen lassen →
          </Link>
        </div>
      </section>
    </>
  )
}
