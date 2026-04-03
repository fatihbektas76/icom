'use client'
import { useEffect, useState } from 'react'

function KarteIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={active ? 'text-white' : 'text-icom-muted'}>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 9h20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 13h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function PSPIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={active ? 'text-white' : 'text-icom-muted'}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function GlobusIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={active ? 'text-white' : 'text-icom-muted'}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M3.5 8h17M3.5 16h17" stroke="currentColor" strokeWidth="1" opacity=".5"/>
    </svg>
  )
}

function BankIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={active ? 'text-white' : 'text-icom-muted'}>
      <path d="M3 21h18M3 10h18M12 3L3 10h18L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 10v11M10 10v11M14 10v11M18 10v11" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function CheckIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={active ? 'text-white' : 'text-icom-muted'}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function HausIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={active ? 'text-white' : 'text-icom-muted'}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

const nodes = [
  { label: 'Karte', Icon: KarteIcon },
  { label: 'PSP', Icon: PSPIcon },
  { label: 'Kartennetzwerk', Icon: GlobusIcon },
  { label: 'Issuer-Bank', Icon: BankIcon },
  { label: 'Genehmigung', Icon: CheckIcon },
  { label: 'Händler', Icon: HausIcon },
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
              <node.Icon active={i === activeIndex} />
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
              <node.Icon active={i === activeIndex} />
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
