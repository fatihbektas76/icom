'use client'

import { useState } from 'react'
import Link from 'next/link'

const terminals = [
  { name: 'SumUp Air', purchase: 39, monthly: 0, rate: 1.69, fixFee: 0 },
  { name: 'Zettle Reader', purchase: 29, monthly: 0, rate: 1.75, fixFee: 0 },
  { name: 'myPOS Go', purchase: 39, monthly: 0, rate: 1.20, fixFee: 0.04 },
  { name: 'Verifone (Miete)', purchase: 0, monthly: 29.90, rate: 0.89, fixFee: 0.08 },
  { name: 'Ingenico (Miete)', purchase: 0, monthly: 34.90, rate: 0.79, fixFee: 0.07 },
]

export default function POSRechnerPage() {
  const [transactions, setTransactions] = useState(500)
  const [avgAmount, setAvgAmount] = useState(25)
  const [months, setMonths] = useState(36)

  const volume = transactions * avgAmount

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">POS-Rechner</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          POS-Kosten-<span className="text-icom-accent">Rechner</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-12">
          Vergleichen Sie die Gesamtkosten verschiedener Kartenterminals über Ihren gewünschten Zeitraum.
        </p>

        {/* Inputs */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-icom-card border border-icom-border rounded-xl p-5">
            <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Transaktionen / Monat</label>
            <input type="range" min={50} max={3000} step={50} value={transactions} onChange={e => setTransactions(Number(e.target.value))} className="w-full accent-icom-accent" />
            <div className="text-icom-accent font-bold text-right mt-1">{transactions}</div>
          </div>
          <div className="bg-icom-card border border-icom-border rounded-xl p-5">
            <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Ø Betrag pro Transaktion</label>
            <input type="range" min={5} max={200} step={5} value={avgAmount} onChange={e => setAvgAmount(Number(e.target.value))} className="w-full accent-icom-accent" />
            <div className="text-icom-accent font-bold text-right mt-1">{avgAmount} €</div>
          </div>
          <div className="bg-icom-card border border-icom-border rounded-xl p-5">
            <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Laufzeit (Monate)</label>
            <select value={months} onChange={e => setMonths(Number(e.target.value))} className="w-full bg-icom-black border border-icom-border rounded-md px-3 py-2.5 text-icom-gray text-sm outline-none">
              <option value={12}>12 Monate</option>
              <option value={24}>24 Monate</option>
              <option value={36}>36 Monate</option>
            </select>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-icom-border">
                <th className="text-left py-3 px-4 text-icom-dark font-medium">Terminal</th>
                <th className="text-left py-3 px-4 text-icom-dark font-medium">Anschaffung</th>
                <th className="text-left py-3 px-4 text-icom-dark font-medium">Monatl. Gebühr</th>
                <th className="text-left py-3 px-4 text-icom-dark font-medium">Trans.-Kosten/Monat</th>
                <th className="text-left py-3 px-4 text-icom-dark font-medium">Gesamt ({months} Mon.)</th>
              </tr>
            </thead>
            <tbody>
              {terminals.map(t => {
                const txCost = (volume * t.rate / 100) + (transactions * t.fixFee)
                const total = t.purchase + (t.monthly * months) + (txCost * months)
                return (
                  <tr key={t.name} className="border-b border-icom-border/50">
                    <td className="py-3 px-4 text-white font-medium">{t.name}</td>
                    <td className="py-3 px-4 text-icom-gray">{t.purchase > 0 ? `${t.purchase}€` : '–'}</td>
                    <td className="py-3 px-4 text-icom-gray">{t.monthly > 0 ? `${t.monthly.toFixed(2)}€` : '–'}</td>
                    <td className="py-3 px-4 text-icom-gray">{Math.round(txCost).toLocaleString('de-DE')}€</td>
                    <td className="py-3 px-4 text-icom-accent font-bold">{Math.round(total).toLocaleString('de-DE')}€</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-icom-dark mt-3">
          Monatlicher Kartenumsatz: {volume.toLocaleString('de-DE')}€ · Alle Angaben ohne Gewähr.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">POS-Beratung anfragen</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Individuelle Terminal-Empfehlung basierend auf Ihren Anforderungen. Kostenlos und unverbindlich.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Jetzt beraten lassen →
          </Link>
        </div>
      </section>
    </>
  )
}
