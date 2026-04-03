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
