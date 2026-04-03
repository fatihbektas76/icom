'use client'
import { useEffect, useState } from 'react'

const nodes = [
  { label: 'Karte', icon: '💳' },
  { label: 'PSP', icon: '🔄' },
  { label: 'Kartennetzwerk', icon: '🌐' },
  { label: 'Issuer-Bank', icon: '🏦' },
  { label: 'Genehmigung', icon: '✅' },
  { label: 'Händler', icon: '🏪' },
]

export default function PaymentFlow() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % nodes.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* Desktop Flow */}
      <div className="hidden md:flex items-center justify-between gap-2 relative">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-2">
            <div
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-500 min-w-[110px] ${
                i === activeIndex
                  ? 'bg-icom-accent border-icom-accent text-white'
                  : 'bg-icom-card border-icom-border text-icom-gray'
              }`}
            >
              <span className="text-xl">{node.icon}</span>
              <span className="text-xs font-medium text-center">{node.label}</span>
            </div>
            {i < nodes.length - 1 && (
              <div className="relative w-8 h-0.5 bg-icom-border overflow-hidden">
                <div
                  className="absolute top-0 h-full w-8 bg-icom-accent"
                  style={{
                    animation: 'flowPulse 2s infinite',
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Flow */}
      <div className="md:hidden flex flex-col gap-3">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-3">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 flex-1 ${
                i === activeIndex
                  ? 'bg-icom-accent border-icom-accent text-white'
                  : 'bg-icom-card border-icom-border text-icom-gray'
              }`}
            >
              <span className="text-xl">{node.icon}</span>
              <span className="text-sm font-medium">{node.label}</span>
            </div>
            <span className="text-icom-dark text-xs">{i + 1}/6</span>
          </div>
        ))}
      </div>

      {/* Badge */}
      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center gap-3 bg-icom-card border border-icom-border rounded-full px-5 py-2.5">
          <span className="w-2 h-2 rounded-full bg-icom-accent" style={{ animation: 'pulse-dot 1.6s infinite' }} />
          <span className="text-sm text-icom-gray">
            Ø 1,8 Sekunden · Auszahlung: 1–2 Werktage
          </span>
        </div>
      </div>
    </div>
  )
}
