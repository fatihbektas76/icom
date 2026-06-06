'use client'
import { useEffect, useRef } from 'react'
import { useScrollProgress, useReducedMotion } from '@/hooks/useScrollProgress'

/**
 * Vision scene: a three-act constellation cinematic.
 *
 *   Akt I  (0.00 – 0.32)  Chaos       — 220 white particles drift in noise,
 *                                       crossed by gray connecting lines and
 *                                       floating gray fee labels.
 *   Akt II (0.35 – 0.62)  Ordnung     — particles get magnetized into 4
 *                                       clusters around the 4 principle stars.
 *                                       Coral attractor arcs ignite.
 *   Akt III(0.68 – 1.00)  Konstellation — 4 stars become large pulsing nodes
 *                                       with names; a constellation polygon
 *                                       connects them; a central core glows.
 */

interface Particle {
  /** start (chaos) position 0..1 */
  sx: number
  sy: number
  /** orbit cluster 0..3 */
  cluster: number
  /** orbit radius offset within cluster (px-ish) */
  orbitR: number
  /** orbit angle (rad) */
  orbitA: number
  /** drift phase */
  phase: number
  size: number
}

interface FeeLabel {
  text: string
  /** position 0..1 */
  x: number
  y: number
  rot: number
}

interface PrincipleStar {
  name: string
  num: string
  /** position relative to canvas, 0..1 */
  x: number
  y: number
}

const FEE_LABELS: FeeLabel[] = [
  { text: 'Interchange 0,30%',  x: 0.12, y: 0.18, rot: -8 },
  { text: 'Scheme Fee 0,15%',   x: 0.78, y: 0.12, rot: 11 },
  { text: 'Acquirer-Marge',     x: 0.30, y: 0.34, rot: -3 },
  { text: 'Cross-Border 1,2%',  x: 0.62, y: 0.40, rot: 6 },
  { text: 'DCC-Aufschlag',      x: 0.10, y: 0.55, rot: -14 },
  { text: 'Auth-Fee 0,05€',     x: 0.74, y: 0.60, rot: 8 },
  { text: 'Refund-Fee',         x: 0.18, y: 0.78, rot: -5 },
  { text: 'Settlement 0,02%',   x: 0.60, y: 0.82, rot: 9 },
  { text: 'Chargeback 15€',     x: 0.40, y: 0.70, rot: -10 },
  { text: 'Monthly 19€',        x: 0.82, y: 0.74, rot: 4 },
  { text: '+0,12% FX',          x: 0.48, y: 0.20, rot: 5 },
  { text: 'PCI-Fee',            x: 0.05, y: 0.32, rot: -7 },
]

const STARS: PrincipleStar[] = [
  { name: 'Unabhängigkeit',  num: '01', x: 0.30, y: 0.30 },
  { name: 'Transparenz',     num: '02', x: 0.70, y: 0.30 },
  { name: 'Fairness',        num: '03', x: 0.30, y: 0.70 },
  { name: 'Langfristigkeit', num: '04', x: 0.70, y: 0.70 },
]

const PARTICLE_COUNT = 220

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smooth(t: number) {
  return t * t * (3 - 2 * t)
}

function range01(value: number, a: number, b: number) {
  return Math.max(0, Math.min(1, (value - a) / (b - a)))
}

export default function SceneVisionConstellation() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progress = useScrollProgress(sectionRef)
  const reduced = useReducedMotion()

  // we'll mirror progress into a ref to read it from inside rAF without
  // forcing a re-subscription each render
  const progressRef = useRef(progress)
  progressRef.current = progress

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let time = 0
    const particles: Particle[] = []

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { clientWidth: w, clientHeight: h } = canvas
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seedParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          sx: Math.random(),
          sy: Math.random(),
          cluster: i % 4,
          orbitR: 30 + Math.random() * 90,
          orbitA: Math.random() * Math.PI * 2,
          phase: Math.random() * 10,
          size: 0.6 + Math.random() * 1.6,
        })
      }
    }

    sizeCanvas()
    seedParticles()
    window.addEventListener('resize', sizeCanvas)

    const render = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const p = progressRef.current
      const minDim = Math.min(w, h)

      // background
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, w, h)

      time += reduced ? 0 : 0.012

      // phase mixing curves
      const tChaos    = 1 - smooth(range01(p, 0.05, 0.45))     // 1 at start, 0 at order
      const tOrder    = smooth(range01(p, 0.30, 0.60))         // 0→1 mid
      const tStars    = smooth(range01(p, 0.55, 0.85))         // 0→1 toward end
      const tConst    = smooth(range01(p, 0.65, 0.95))         // constellation polygon
      const tCore     = smooth(range01(p, 0.70, 1.00))         // central core glow

      // background grid that fades in during ordering
      ctx.save()
      ctx.globalAlpha = tOrder * 0.10
      ctx.strokeStyle = '#F05252'
      ctx.lineWidth = 1
      const gridStep = 60
      for (let x = 0; x < w; x += gridStep) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridStep) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      ctx.restore()

      // chaos lines between particles
      if (tChaos > 0.05) {
        ctx.strokeStyle = `rgba(140,140,140,${tChaos * 0.18})`
        ctx.lineWidth = 0.6
        const sample = 4 // skip rate
        for (let i = 0; i < particles.length; i += sample) {
          const a = particles[i]
          const ax = a.sx * w + Math.sin(time + a.phase) * 6
          const ay = a.sy * h + Math.cos(time * 0.8 + a.phase) * 6
          for (let j = i + sample; j < particles.length; j += sample) {
            const b = particles[j]
            const bx = b.sx * w + Math.sin(time + b.phase) * 6
            const by = b.sy * h + Math.cos(time * 0.8 + b.phase) * 6
            const dx = ax - bx
            const dy = ay - by
            const d2 = dx * dx + dy * dy
            if (d2 < 12000) {
              ctx.beginPath()
              ctx.moveTo(ax, ay)
              ctx.lineTo(bx, by)
              ctx.stroke()
            }
          }
        }
      }

      // particles
      for (const part of particles) {
        const star = STARS[part.cluster]

        // chaotic position with drift
        const cx = part.sx * w + Math.sin(time + part.phase) * 8
        const cy = part.sy * h + Math.cos(time * 0.8 + part.phase) * 8

        // ordered orbital position around a star
        const ang = part.orbitA + time * 0.5
        const r = part.orbitR * (1 - tStars * 0.55) // contract toward star
        const ox = star.x * w + Math.cos(ang) * r
        const oy = star.y * h + Math.sin(ang) * r

        const px = lerp(cx, ox, smooth(range01(p, 0.05, 0.55)))
        const py = lerp(cy, oy, smooth(range01(p, 0.05, 0.55)))

        // colour: gray → coral as we order
        const coral = smooth(range01(p, 0.25, 0.7))
        const r0 = lerp(190, 240, coral)
        const g0 = lerp(190, 82,  coral)
        const b0 = lerp(190, 82,  coral)
        const a0 = 0.35 + coral * 0.55

        ctx.fillStyle = `rgba(${r0|0},${g0|0},${b0|0},${a0})`
        ctx.beginPath()
        ctx.arc(px, py, part.size * (1 + coral * 0.4), 0, Math.PI * 2)
        ctx.fill()
      }

      // constellation polygon connecting the 4 stars
      if (tConst > 0.02) {
        const pts = STARS.map(s => ({ x: s.x * w, y: s.y * h }))
        ctx.save()
        ctx.strokeStyle = `rgba(240,82,82,${tConst * 0.8})`
        ctx.lineWidth = 1.2
        ctx.shadowColor = 'rgba(240,82,82,0.6)'
        ctx.shadowBlur = 12 * tConst
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        ctx.lineTo(pts[1].x, pts[1].y)
        ctx.lineTo(pts[3].x, pts[3].y)
        ctx.lineTo(pts[2].x, pts[2].y)
        ctx.closePath()
        ctx.stroke()

        // cross diagonals
        ctx.strokeStyle = `rgba(240,82,82,${tConst * 0.4})`
        ctx.shadowBlur = 6 * tConst
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y); ctx.lineTo(pts[3].x, pts[3].y)
        ctx.moveTo(pts[1].x, pts[1].y); ctx.lineTo(pts[2].x, pts[2].y)
        ctx.stroke()
        ctx.restore()
      }

      // stars
      if (tStars > 0.02) {
        const pulse = 0.85 + Math.sin(time * 1.4) * 0.15
        for (const s of STARS) {
          const x = s.x * w
          const y = s.y * h
          const coreR = 3 + tStars * 9

          // outer glow
          const grad = ctx.createRadialGradient(x, y, 0, x, y, coreR * 8)
          grad.addColorStop(0, `rgba(240,82,82,${tStars * 0.55 * pulse})`)
          grad.addColorStop(1, 'rgba(240,82,82,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(x, y, coreR * 8, 0, Math.PI * 2)
          ctx.fill()

          // core
          ctx.fillStyle = '#F05252'
          ctx.beginPath()
          ctx.arc(x, y, coreR, 0, Math.PI * 2)
          ctx.fill()

          // highlight
          ctx.fillStyle = `rgba(255,210,210,${tStars})`
          ctx.beginPath()
          ctx.arc(x - coreR * 0.35, y - coreR * 0.35, coreR * 0.35, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // central core
      if (tCore > 0.05) {
        const cx = w / 2
        const cy = h / 2
        const pulse = 0.7 + Math.sin(time * 2) * 0.3
        const coreR = (12 + minDim * 0.02) * tCore

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 10)
        grad.addColorStop(0, `rgba(240,82,82,${tCore * 0.85 * pulse})`)
        grad.addColorStop(0.4, `rgba(240,82,82,${tCore * 0.25})`)
        grad.addColorStop(1, 'rgba(240,82,82,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, coreR * 10, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255,140,140,${tCore})`
        ctx.beginPath()
        ctx.arc(cx, cy, coreR * 0.4, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', sizeCanvas)
    }
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className="relative bg-icom-black"
      style={{ height: '340vh' }}
      aria-label="Vision · Konstellation der Klarheit"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Floating fee labels during chaos */}
        {FEE_LABELS.map((label, i) => (
          <FloatingFee key={i} label={label} progress={progress} index={i} />
        ))}

        {/* Star labels during constellation */}
        {STARS.map((s, i) => (
          <StarLabel key={s.name} star={s} progress={progress} delay={i * 0.04} />
        ))}

        {/* Atmospheric vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(13,13,13,0) 25%, rgba(13,13,13,0.85) 95%)',
          }}
        />

        {/* Top act marker */}
        <ActProgressBar progress={progress} />

        {/* Three-act narration overlays */}
        <ActOverlay
          progress={progress}
          range={[0.02, 0.32]}
          eyebrow="Akt I · Heute"
          title="Tausende Gebühren. Nichts zusammenhängend."
          body="Auf jeder Payment-Abrechnung wirken Dutzende Positionen zufällig. Beträge ohne Kontext, Aufschläge ohne Erklärung."
        />
        <ActOverlay
          progress={progress}
          range={[0.38, 0.60]}
          eyebrow="Akt II · Analyse"
          title="Wir ordnen das Chaos."
          body="Jede Gebühr bekommt einen Platz. Jede Marge wird sichtbar. Wo zufällige Zahlen scheinen, finden wir Struktur."
        />
        <ActOverlay
          progress={progress}
          range={[0.68, 1.0]}
          eyebrow="Akt III · Morgen"
          title="Vier Sterne. Eine Konstellation."
          body="Aus dem Rauschen bleiben vier feste Punkte. Sie sind unser Versprechen an jeden Kunden."
        />

        {/* Scroll hint */}
        <ScrollHint progress={progress} />
      </div>
    </section>
  )
}

function FloatingFee({
  label,
  progress,
  index,
}: {
  label: FeeLabel
  progress: number
  index: number
}) {
  // visible during chaos act, then fly outward + fade
  const fadeIn = range01(progress, 0, 0.06)
  const fadeOut = range01(progress, 0.32, 0.5)
  const opacity = fadeIn * (1 - fadeOut)
  // outward fly
  const ang = (index / FEE_LABELS.length) * Math.PI * 2
  const dist = fadeOut * 200
  const dx = Math.cos(ang) * dist
  const dy = Math.sin(ang) * dist

  return (
    <div
      className="absolute font-mono text-[11px] sm:text-xs whitespace-nowrap pointer-events-none px-2 py-1 rounded-md border border-icom-border bg-icom-card/70 backdrop-blur-sm text-icom-muted"
      style={{
        left: `${label.x * 100}%`,
        top: `${label.y * 100}%`,
        transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${label.rot * (1 - fadeIn)}deg)`,
        opacity,
        transition: 'opacity 200ms ease-out',
      }}
    >
      {label.text}
    </div>
  )
}

function StarLabel({
  star,
  progress,
  delay,
}: {
  star: PrincipleStar
  progress: number
  delay: number
}) {
  const t = smooth(range01(progress, 0.7 + delay, 0.9 + delay))
  const isLeft = star.x < 0.5
  const isTop  = star.y < 0.5

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${star.x * 100}%`,
        top: `${star.y * 100}%`,
        opacity: t,
        transform: `translate(-50%, -50%) translateY(${(1 - t) * 12}px)`,
        transition: 'opacity 200ms ease-out',
      }}
    >
      <div
        className="absolute whitespace-nowrap"
        style={{
          [isLeft ? 'right' : 'left']: '24px',
          top: isTop ? '-2px' : '0px',
          textAlign: isLeft ? 'right' : 'left',
        }}
      >
        <div className="text-icom-accent font-mono text-[10px] tracking-wider mb-1">
          {star.num}
        </div>
        <div className="text-white font-semibold text-base sm:text-lg leading-tight">
          {star.name}
        </div>
      </div>
    </div>
  )
}

function ActProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 px-4">
      <div className="flex items-center gap-3 mb-3">
        {['I', 'II', 'III'].map((label, i) => {
          const ranges: [number, number][] = [[0, 0.33], [0.33, 0.66], [0.66, 1]]
          const [a, b] = ranges[i]
          const active = progress >= a && progress <= b
          const done = progress > b
          return (
            <div key={label} className="flex items-center gap-3">
              <span
                className="text-[10px] font-mono tracking-wider transition-colors"
                style={{
                  color: active ? '#F05252' : done ? 'rgba(240,82,82,0.5)' : '#444',
                  textShadow: active ? '0 0 8px rgba(240,82,82,0.8)' : 'none',
                }}
              >
                {label}
              </span>
              {i < 2 && (
                <span
                  className="w-8 h-px transition-colors"
                  style={{
                    background: progress > ranges[i][1] ? '#F05252' : '#222',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="w-64 h-px bg-icom-border relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-icom-accent transition-[width] duration-150"
          style={{
            width: `${progress * 100}%`,
            boxShadow: '0 0 8px rgba(240,82,82,0.6)',
          }}
        />
      </div>
    </div>
  )
}

function ActOverlay({
  progress,
  range,
  eyebrow,
  title,
  body,
}: {
  progress: number
  range: [number, number]
  eyebrow: string
  title: string
  body: string
}) {
  const [a, b] = range
  const fadeIn = range01(progress, a, a + 0.04)
  const fadeOut = range01(progress, b - 0.04, b)
  const opacity = fadeIn * (1 - fadeOut)

  return (
    <div
      className="absolute inset-x-0 bottom-[12vh] z-10 text-center px-6 pointer-events-none"
      style={{
        opacity,
        transform: `translateY(${(1 - fadeIn) * 16 + fadeOut * 16}px)`,
        transition: 'opacity 200ms ease-out, transform 300ms ease-out',
      }}
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-icom-accent/80 mb-3 font-medium">
        {eyebrow}
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl mx-auto leading-tight">
        {title}
      </h2>
      <p className="text-icom-gray text-sm md:text-base max-w-xl mx-auto leading-relaxed">
        {body}
      </p>
    </div>
  )
}

function ScrollHint({ progress }: { progress: number }) {
  const opacity = 1 - range01(progress, 0, 0.06)
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
      style={{ opacity }}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-icom-dark">Scrollen</span>
      <span className="w-px h-6 bg-icom-accent/50 animate-pulse" />
    </div>
  )
}
