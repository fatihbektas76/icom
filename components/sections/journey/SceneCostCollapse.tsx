'use client'
import { useRef } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface Tower {
  label: string
  before: number   // % height of canvas
  after: number    // % height
  cost: number     // €/Monat
}

const TOWERS: Tower[] = [
  { label: 'Interchange',  before: 92, after: 28, cost: 2840 },
  { label: 'Scheme Fee',   before: 74, after: 18, cost: 1620 },
  { label: 'Acquirer',     before: 86, after: 22, cost: 2310 },
  { label: 'PSP-Marge',    before: 68, after: 14, cost: 1480 },
  { label: 'Chargebacks',  before: 52, after: 12, cost:  920 },
  { label: 'FX-Aufschlag', before: 78, after: 20, cost: 1850 },
]

const TARGET = '−127.000 €'

export default function SceneCostCollapse() {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(sectionRef)

  // phase 1 (0..0.45): towers stand tall, intro headline
  // phase 2 (0.45..0.8): collapse — bars scaleY down, coral bars rise
  // phase 3 (0.8..1):    big number assembles glyph by glyph
  const collapse = Math.max(0, Math.min(1, (progress - 0.45) / 0.35))
  const numberReveal = Math.max(0, Math.min(1, (progress - 0.8) / 0.2))
  const camera = 1 + collapse * 0.08

  return (
    <section
      ref={sectionRef}
      className="relative bg-icom-black"
      style={{ height: '320vh' }}
      aria-label="Akt III: Der Einsturz"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* atmosphere — dust/grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(240,82,82,0.15) 0%, rgba(13,13,13,0) 55%)',
          }}
        />
        {/* ground line */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: '18vh',
            height: 1,
            background:
              'linear-gradient(to right, transparent 0%, rgba(240,82,82,0.4) 50%, transparent 100%)',
            boxShadow: '0 0 16px rgba(240,82,82,0.3)',
          }}
        />

        {/* act marker */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          <span className="w-8 h-px bg-icom-accent/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-icom-accent/70">
            Akt III · Der Einsturz
          </span>
          <span className="w-8 h-px bg-icom-accent/40" />
        </div>

        {/* intro headline — fades out as collapse begins */}
        <div
          className="absolute inset-x-0 top-[18vh] z-10 text-center px-6 transition-all duration-500"
          style={{
            opacity: collapse < 0.15 ? 1 : Math.max(0, 1 - collapse * 2.5),
            transform: `translateY(${collapse * -20}px)`,
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Diese Türme sind Ihre Gebühren.
          </h2>
          <p className="text-icom-gray text-sm md:text-base">
            Sechs Posten. Jeden Monat. Bei nur 250.000 € Kartenumsatz.
          </p>
        </div>

        {/* towers stage */}
        <div
          className="absolute inset-x-0 z-10 flex items-end justify-center gap-3 md:gap-6 px-4"
          style={{
            bottom: '18vh',
            height: '60vh',
            transform: `scale(${camera})`,
            transformOrigin: '50% 100%',
            transition: 'transform 200ms ease-out',
          }}
        >
          {TOWERS.map((t, i) => {
            const grayH = t.before * (1 - collapse) + t.after * collapse
            const coralH = t.after * collapse
            const wobble = collapse > 0 && collapse < 0.6
              ? Math.sin(progress * 80 + i) * collapse * 1.4
              : 0
            return (
              <div
                key={t.label}
                className="relative flex flex-col items-center"
                style={{ width: 'clamp(36px, 8vw, 92px)', height: '100%' }}
              >
                {/* gray tower (collapsing) */}
                <div
                  className="absolute bottom-0 left-0 right-0 origin-bottom"
                  style={{
                    height: `${grayH}%`,
                    transform: `translateX(${wobble}px) rotate(${wobble * 0.4}deg)`,
                    background:
                      'linear-gradient(to top, #2a2a2a 0%, #1a1a1a 50%, #2e2e2e 100%)',
                    borderTop: '2px solid #3a3a3a',
                    borderLeft: '1px solid #222',
                    borderRight: '1px solid #0c0c0c',
                    boxShadow:
                      'inset 0 0 12px rgba(0,0,0,0.6), 0 -4px 20px rgba(0,0,0,0.5)',
                    opacity: 1 - collapse * 0.25,
                    transition: 'opacity 300ms ease-out, height 200ms ease-out',
                  }}
                >
                  {/* horizontal "floors" texture */}
                  {Array.from({ length: 8 }).map((_, k) => (
                    <span
                      key={k}
                      className="absolute left-0 right-0 h-px bg-black/40"
                      style={{ top: `${(k + 1) * 11}%` }}
                    />
                  ))}
                  {/* glowing window pattern */}
                  <div className="absolute inset-1 grid grid-cols-2 gap-1 opacity-30">
                    {Array.from({ length: 10 }).map((_, k) => (
                      <span
                        key={k}
                        className="block bg-icom-accent/60"
                        style={{ height: 4, opacity: (k % 3) === 0 ? 0.8 : 0.2 }}
                      />
                    ))}
                  </div>
                </div>

                {/* coral iCOM bar — rising behind */}
                <div
                  className="absolute bottom-0 left-1/4 right-1/4 origin-bottom rounded-t-sm"
                  style={{
                    height: `${coralH}%`,
                    background:
                      'linear-gradient(to top, #F05252 0%, #ff8a8a 100%)',
                    boxShadow:
                      '0 0 20px rgba(240,82,82,0.6), inset 0 0 8px rgba(255,255,255,0.2)',
                    opacity: collapse,
                    transition: 'height 200ms ease-out',
                  }}
                />

                {/* label */}
                <div
                  className="absolute -bottom-7 left-0 right-0 text-center"
                  style={{
                    opacity: collapse > 0.4 ? 1 : 0.35,
                    transition: 'opacity 400ms ease-out',
                  }}
                >
                  <div className="text-[10px] text-icom-gray uppercase tracking-wider truncate">
                    {t.label}
                  </div>
                  <div
                    className="text-[10px] font-bold mt-0.5"
                    style={{ color: collapse > 0.4 ? '#F05252' : '#555' }}
                  >
                    {collapse > 0.4
                      ? `−${Math.round(t.cost * 0.78).toLocaleString('de-DE')} €`
                      : `${t.cost.toLocaleString('de-DE')} €`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* assembled big number — fills foreground */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
          style={{
            opacity: numberReveal,
            transition: 'opacity 300ms ease-out',
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.4em] text-icom-accent mb-4"
            style={{
              opacity: numberReveal,
              transform: `translateY(${(1 - numberReveal) * 20}px)`,
            }}
          >
            Was am Ende übrig bleibt
          </div>
          <div className="flex">
            {TARGET.split('').map((ch, i) => {
              const delay = i / TARGET.length
              const local = Math.max(0, Math.min(1, (numberReveal - delay * 0.4) / 0.6))
              return (
                <span
                  key={i}
                  className="text-[12vw] md:text-[10vw] font-bold leading-none"
                  style={{
                    color: '#F05252',
                    textShadow: `0 0 ${30 * local}px rgba(240,82,82,${0.8 * local})`,
                    opacity: local,
                    transform: `translateY(${(1 - local) * 40}px) scale(${0.85 + local * 0.15})`,
                    transition: 'transform 200ms ease-out, opacity 200ms ease-out',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {ch === ' ' ? ' ' : ch}
                </span>
              )
            })}
          </div>
          <div
            className="text-sm md:text-base text-icom-gray mt-6 text-center px-6 max-w-xl"
            style={{
              opacity: numberReveal,
              transform: `translateY(${(1 - numberReveal) * 30}px)`,
            }}
          >
            jährliches Einsparpotenzial — wenn jede dieser Säulen
            <span className="text-white"> hinterfragt</span> wird.
          </div>
        </div>

        {/* outro caption */}
        <div
          className="absolute inset-x-0 bottom-6 z-10 text-center px-6"
          style={{ opacity: numberReveal }}
        >
          <a
            href="/kontakt"
            className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors pointer-events-auto"
          >
            Ihre Kosten analysieren →
          </a>
        </div>
      </div>
    </section>
  )
}
