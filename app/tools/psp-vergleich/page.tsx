'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pspAnbieter } from '@/lib/data/psp-anbieter'

export default function PSPVergleichPage() {
  const [selected, setSelected] = useState<string[]>(['stripe', 'mollie'])

  const togglePSP = (slug: string) => {
    setSelected(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : prev.length < 3
        ? [...prev, slug]
        : prev
    )
  }

  const selectedPSPs = selected.map(s => pspAnbieter.find(p => p.slug === s)).filter(Boolean)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">PSP-Vergleich</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          PSP-<span className="text-icom-accent">Vergleich</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-8">
          Vergleichen Sie bis zu 3 Payment Service Provider side-by-side.
          Gebühren, Features und Empfehlungen im direkten Vergleich.
        </p>

        {/* PSP Selector */}
        <div className="flex flex-wrap gap-3 mb-12">
          {pspAnbieter.map(psp => (
            <button
              key={psp.slug}
              onClick={() => togglePSP(psp.slug)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                selected.includes(psp.slug)
                  ? 'bg-icom-accent border-icom-accent text-white'
                  : 'bg-icom-card border-icom-border text-icom-gray hover:border-icom-accent'
              }`}
            >
              {psp.name}
            </button>
          ))}
          <span className="text-xs text-icom-dark self-center ml-2">Max. 3 auswählen</span>
        </div>

        {/* Vergleichstabelle */}
        {selectedPSPs.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-icom-border">
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">Kriterium</th>
                  {selectedPSPs.map(psp => psp && (
                    <th key={psp.slug} className="text-left py-3 px-4 text-white font-medium">{psp.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Preismodell', get: (p: typeof pspAnbieter[0]) => p.model },
                  { label: 'EU-Karte', get: (p: typeof pspAnbieter[0]) => p.euRate ? `${p.euRate}%${p.extraFee ? ` + ${p.extraFee}€` : ''}` : 'Individuell' },
                  { label: 'Non-EU-Karte', get: (p: typeof pspAnbieter[0]) => p.nonEURate ? `${p.nonEURate}%` : 'Individuell' },
                  { label: 'Monatl. Gebühr', get: (p: typeof pspAnbieter[0]) => p.monthly === 0 ? 'Keine' : `${p.monthly}€` },
                  { label: 'Ideal für', get: (p: typeof pspAnbieter[0]) => p.bestFor.join(', ') },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-icom-border/50">
                    <td className="py-3 px-4 text-icom-muted font-medium">{row.label}</td>
                    {selectedPSPs.map(psp => psp && (
                      <td key={psp.slug} className="py-3 px-4 text-icom-gray">{row.get(psp)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pros/Cons */}
        {selectedPSPs.length >= 2 && (
          <div className={`grid gap-8 mt-12 ${selectedPSPs.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {selectedPSPs.map(psp => psp && (
              <div key={psp.slug} className="bg-icom-card border border-icom-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">{psp.name}</h3>
                <div className="mb-4">
                  <h4 className="text-xs text-icom-dark uppercase tracking-wider mb-2">Vorteile</h4>
                  <ul className="space-y-1.5">
                    {psp.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-icom-gray">
                        <span className="text-green-500 mt-0.5">✓</span>{pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs text-icom-dark uppercase tracking-wider mb-2">Nachteile</h4>
                  <ul className="space-y-1.5">
                    {psp.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-icom-gray">
                        <span className="text-icom-accent mt-0.5">✗</span>{con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Individuellen Vergleich anfordern</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Wir vergleichen PSPs mit Ihren echten Transaktionsdaten – kostenlos und unverbindlich.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Jetzt Vergleich anfordern →
          </Link>
        </div>
      </section>
    </>
  )
}
