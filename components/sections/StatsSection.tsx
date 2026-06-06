'use client'
import { useEffect, useRef, useState } from 'react'
import CountUp from '@/components/ui/CountUp'

interface Stat {
  target: number
  suffix: string
  format: 'plain' | 'k'
  label: string
  caption: string
  delay: number
}

const STATS: Stat[] = [
  { target: 10,   suffix: '+',  format: 'plain', label: 'Jahre Erfahrung',  caption: 'seit 2014 im Payment-Markt', delay: 0   },
  { target: 4000, suffix: '+',  format: 'k',     label: 'Kunden',           caption: 'aus DACH & EU',              delay: 150 },
  { target: 500,  suffix: '+',  format: 'plain', label: 'Projekte',         caption: 'erfolgreich umgesetzt',      delay: 300 },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="border-y border-icom-border bg-icom-card-dark relative overflow-hidden"
      aria-label="iCOM in Zahlen"
    >
      {/* atmospheric coral glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(240,82,82,0.06) 0%, rgba(13,13,13,0) 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* headline */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-icom-accent/40" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-icom-accent/80 font-medium">
              iCOM in Zahlen
            </span>
            <span className="h-px w-12 bg-icom-accent/40" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Eine Dekade Payment-Expertise.
          </h2>
          <p className="text-icom-gray text-sm md:text-base mt-3 max-w-xl mx-auto">
            Was wir in zehn Jahren gelernt haben — jetzt für Sie verfügbar.
          </p>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="relative bg-icom-card border border-icom-border rounded-xl p-8 text-center overflow-hidden transition-all duration-700 ease-out hover:border-icom-accent/40"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* corner accent dot */}
              <span
                className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-icom-accent"
                style={{
                  opacity: visible ? 1 : 0,
                  boxShadow: '0 0 12px rgba(240,82,82,0.8)',
                  transition: `opacity 600ms ease ${i * 120 + 400}ms`,
                }}
              />

              {/* big number */}
              <div
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-icom-accent tabular-nums tracking-tight"
                style={{
                  textShadow: '0 0 30px rgba(240,82,82,0.25)',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-0.03em',
                }}
              >
                <CountUp
                  target={s.target}
                  suffix={s.suffix}
                  duration={1800}
                  delay={s.delay}
                  format={s.format}
                />
              </div>

              {/* coral underline that draws in */}
              <div className="flex justify-center mt-4 mb-3">
                <span
                  className="block h-[2px] bg-icom-accent transition-all duration-1000 ease-out"
                  style={{
                    width: visible ? '48px' : '0px',
                    transitionDelay: `${i * 120 + 800}ms`,
                    boxShadow: '0 0 8px rgba(240,82,82,0.6)',
                  }}
                />
              </div>

              {/* label */}
              <div className="text-lg font-semibold text-white">{s.label}</div>
              <div className="text-xs text-icom-muted mt-1.5 uppercase tracking-wider">
                {s.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
