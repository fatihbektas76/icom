'use client'
import { useEffect, useRef } from 'react'
import { useScrollProgress, useReducedMotion } from '@/hooks/useScrollProgress'

/**
 * Solutions scene: a three-act radial cinematic.
 *
 *   Akt I  (0.00 – 0.32)  Eingang     — gray fee chips orbit chaotically on
 *                                       the outer edge, faint particles drift,
 *                                       random connecting lines.
 *   Akt II (0.36 – 0.62)  Maschine    — chips collapse into a coral hexagon at
 *                                       the center, particles spiral inward
 *                                       along log-spirals, central core ignites.
 *   Akt III(0.66 – 1.00)  Ausgabe     — six solution nodes light up on the
 *                                       hexagon vertices; coral beams connect
 *                                       them to the core; rotating outer ring.
 */

interface SolutionNode {
  num: string
  name: string
  metric: string
}

interface FeeChip {
  text: string
  /** chaos position 0..1 */
  cx: number
  cy: number
  rot: number
}

interface Particle {
  /** chaos angle & radius from center (radius 0..1 of minDim) */
  startA: number
  startR: number
  /** spiral progress phase offset */
  phase: number
  /** target node index 0..5 (used to pull toward a node in stage 3) */
  target: number
  size: number
}

const PARTICLE_COUNT = 180

const NODES: SolutionNode[] = [
  { num: '01', name: 'Payment Solutions',    metric: '−28 %' },
  { num: '02', name: 'E-Commerce',           metric: '+12 %' },
  { num: '03', name: 'POS-Lösungen',         metric: '<1,5 %' },
  { num: '04', name: 'paybyMail',            metric: '−52 %' },
  { num: '05', name: 'Interchange++',        metric: '20–40 %' },
  { num: '06', name: 'Payment-Wissen',       metric: '40+' },
]

const FEE_CHIPS: FeeChip[] = [
  { text: 'Stripe 1,50 %',     cx: 0.08, cy: 0.18, rot: -7 },
  { text: 'Adyen IC++',        cx: 0.86, cy: 0.14, rot: 9  },
  { text: 'Mollie EU 1,80 %',  cx: 0.05, cy: 0.42, rot: -4 },
  { text: 'PayPal 1,49 %',     cx: 0.88, cy: 0.40, rot: 6  },
  { text: 'No-Show 28 %',      cx: 0.12, cy: 0.66, rot: -12 },
  { text: 'Chargeback 15 €',   cx: 0.82, cy: 0.62, rot: 7 },
  { text: 'PCI-DSS',           cx: 0.18, cy: 0.86, rot: -5 },
  { text: 'PSD2 · SCA',        cx: 0.74, cy: 0.86, rot: 11 },
  { text: 'Cross-Border 1,2%', cx: 0.40, cy: 0.10, rot: 4 },
  { text: 'DCC 3,5 %',         cx: 0.58, cy: 0.92, rot: -8 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function smooth(t: number) {
  return t * t * (3 - 2 * t)
}
function range01(v: number, a: number, b: number) {
  return Math.max(0, Math.min(1, (v - a) / (b - a)))
}

/** Returns canvas-space position for a hex node (i=0 at top, clockwise). */
function nodePosition(i: number, cx: number, cy: number, radius: number) {
  const ang = (i / 6) * Math.PI * 2 - Math.PI / 2
  return { x: cx + Math.cos(ang) * radius, y: cy + Math.sin(ang) * radius, ang }
}

export default function SceneSolutionsEngine() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progress = useScrollProgress(sectionRef)
  const reduced = useReducedMotion()

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
          startA: Math.random() * Math.PI * 2,
          startR: 0.45 + Math.random() * 0.25, // outer ring of canvas
          phase: Math.random() * 6,
          target: i % 6,
          size: 0.7 + Math.random() * 1.8,
        })
      }
    }

    sizeCanvas()
    seedParticles()
    window.addEventListener('resize', sizeCanvas)

    const render = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const cx = w / 2
      const cy = h / 2
      const minDim = Math.min(w, h)
      const hexRadius = minDim * 0.32
      const p = progressRef.current

      // background
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, w, h)

      time += reduced ? 0 : 0.012

      // phase curves
      const tChaos    = 1 - smooth(range01(p, 0.05, 0.45))  // 1→0
      const tConverge = smooth(range01(p, 0.30, 0.62))      // 0→1
      const tCore     = smooth(range01(p, 0.45, 0.78))      // 0→1
      const tNodes    = smooth(range01(p, 0.62, 0.90))      // 0→1
      const tBeams    = smooth(range01(p, 0.70, 0.95))      // 0→1
      const tRing     = smooth(range01(p, 0.55, 0.95))      // 0→1

      // chaotic background — drifting noise lines
      if (tChaos > 0.05) {
        ctx.strokeStyle = `rgba(140,140,140,${tChaos * 0.12})`
        ctx.lineWidth = 0.6
        const lines = 24
        for (let i = 0; i < lines; i++) {
          const a = (i / lines) * Math.PI * 2 + time * 0.1
          const r = (0.3 + (i % 4) * 0.12) * minDim
          ctx.beginPath()
          for (let k = 0; k < 60; k++) {
            const t = k / 60
            const aa = a + t * Math.PI * 0.6
            const rr = r + Math.sin(time * 0.5 + i + t * 4) * 16
            const x = cx + Math.cos(aa) * rr
            const y = cy + Math.sin(aa) * rr
            if (k === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
      }

      // outer rotating ring (Act II-III)
      if (tRing > 0.02) {
        const ringR = minDim * 0.42
        const rot = time * 0.15
        ctx.save()
        ctx.strokeStyle = `rgba(240,82,82,${tRing * 0.35})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2)
        ctx.stroke()
        // tick marks rotating
        for (let i = 0; i < 24; i++) {
          const a = (i / 24) * Math.PI * 2 + rot
          const x1 = cx + Math.cos(a) * ringR
          const y1 = cy + Math.sin(a) * ringR
          const x2 = cx + Math.cos(a) * (ringR - (i % 3 === 0 ? 14 : 6))
          const y2 = cy + Math.sin(a) * (ringR - (i % 3 === 0 ? 14 : 6))
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = `rgba(240,82,82,${tRing * (i % 3 === 0 ? 0.7 : 0.35)})`
          ctx.stroke()
        }
        ctx.restore()
      }

      // particles spiral inward (Act II) then attach to node target (Act III)
      for (const part of particles) {
        // chaos position: orbit on outer ring with wobble
        const chaosA = part.startA + time * 0.15 + Math.sin(time * 0.4 + part.phase) * 0.15
        const chaosR = part.startR + Math.sin(time * 0.5 + part.phase) * 0.04
        const chaosX = cx + Math.cos(chaosA) * chaosR * minDim
        const chaosY = cy + Math.sin(chaosA) * chaosR * minDim

        // converge to center along log-spiral
        const convergeA = chaosA + Math.PI * 1.4 * smooth(tConverge)
        const convergeR = lerp(chaosR, 0.04, smooth(tConverge))
        const convX = cx + Math.cos(convergeA) * convergeR * minDim
        const convY = cy + Math.sin(convergeA) * convergeR * minDim

        // mix chaos → converge
        const px = lerp(chaosX, convX, smooth(range01(p, 0.05, 0.55)))
        const py = lerp(chaosY, convY, smooth(range01(p, 0.05, 0.55)))

        // node attach (Act III): pull toward target node
        const node = nodePosition(part.target, cx, cy, hexRadius)
        const orbA = time * 0.6 + part.phase
        const orbR = 16 + (part.phase * 4)
        const nodeX = node.x + Math.cos(orbA) * orbR
        const nodeY = node.y + Math.sin(orbA) * orbR

        const fx = lerp(px, nodeX, smooth(range01(p, 0.62, 0.88)))
        const fy = lerp(py, nodeY, smooth(range01(p, 0.62, 0.88)))

        // color: gray → coral
        const coral = smooth(range01(p, 0.30, 0.7))
        const r0 = lerp(180, 240, coral)
        const g0 = lerp(180, 82, coral)
        const b0 = lerp(180, 82, coral)
        const a0 = 0.35 + coral * 0.55

        ctx.fillStyle = `rgba(${r0 | 0},${g0 | 0},${b0 | 0},${a0})`
        ctx.beginPath()
        ctx.arc(fx, fy, part.size * (1 + coral * 0.3), 0, Math.PI * 2)
        ctx.fill()
      }

      // central core
      if (tCore > 0.02) {
        const pulse = 0.7 + Math.sin(time * 1.8) * 0.3
        const baseR = minDim * 0.04 * tCore
        // outer halo
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 12)
        grad.addColorStop(0, `rgba(240,82,82,${tCore * 0.85 * pulse})`)
        grad.addColorStop(0.3, `rgba(240,82,82,${tCore * 0.35})`)
        grad.addColorStop(1, 'rgba(240,82,82,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, baseR * 12, 0, Math.PI * 2)
        ctx.fill()
        // core
        ctx.fillStyle = '#F05252'
        ctx.beginPath()
        ctx.arc(cx, cy, baseR, 0, Math.PI * 2)
        ctx.fill()
        // hex inscribed
        ctx.strokeStyle = `rgba(255,210,210,${tCore})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2
          const x = cx + Math.cos(a) * baseR * 0.7
          const y = cy + Math.sin(a) * baseR * 0.7
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
      }

      // beams from core to nodes
      if (tBeams > 0.02) {
        for (let i = 0; i < 6; i++) {
          const n = nodePosition(i, cx, cy, hexRadius)
          const alpha = tBeams * (0.6 + Math.sin(time * 2 + i) * 0.15)
          ctx.save()
          ctx.shadowColor = 'rgba(240,82,82,0.5)'
          ctx.shadowBlur = 10 * tBeams
          ctx.strokeStyle = `rgba(240,82,82,${alpha})`
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(cx, cy)
          ctx.lineTo(n.x, n.y)
          ctx.stroke()
          ctx.restore()
        }
        // hex polygon connecting nodes
        ctx.save()
        ctx.strokeStyle = `rgba(240,82,82,${tBeams * 0.4})`
        ctx.lineWidth = 1
        ctx.shadowColor = 'rgba(240,82,82,0.4)'
        ctx.shadowBlur = 6 * tBeams
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const n = nodePosition(i, cx, cy, hexRadius)
          if (i === 0) ctx.moveTo(n.x, n.y)
          else ctx.lineTo(n.x, n.y)
        }
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      }

      // solution nodes (Act III)
      if (tNodes > 0.02) {
        const pulse = 0.85 + Math.sin(time * 1.4) * 0.15
        for (let i = 0; i < 6; i++) {
          // staggered activation
          const local = smooth(range01(p, 0.65 + i * 0.012, 0.85 + i * 0.012))
          if (local < 0.02) continue
          const n = nodePosition(i, cx, cy, hexRadius)
          const coreR = 4 + local * 8

          // glow
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, coreR * 7)
          grad.addColorStop(0, `rgba(240,82,82,${local * 0.55 * pulse})`)
          grad.addColorStop(1, 'rgba(240,82,82,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(n.x, n.y, coreR * 7, 0, Math.PI * 2)
          ctx.fill()

          // ring
          ctx.strokeStyle = `rgba(240,82,82,${local})`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(n.x, n.y, coreR * 1.8, 0, Math.PI * 2)
          ctx.stroke()

          // core dot
          ctx.fillStyle = '#F05252'
          ctx.beginPath()
          ctx.arc(n.x, n.y, coreR, 0, Math.PI * 2)
          ctx.fill()
          // highlight
          ctx.fillStyle = `rgba(255,210,210,${local})`
          ctx.beginPath()
          ctx.arc(n.x - coreR * 0.3, n.y - coreR * 0.3, coreR * 0.3, 0, Math.PI * 2)
          ctx.fill()
        }
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
      aria-label="Lösungen · Die Maschine"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Floating fee chips during Act I */}
        {FEE_CHIPS.map((chip, i) => (
          <FloatingChip key={i} chip={chip} progress={progress} index={i} />
        ))}

        {/* Node labels during Act III */}
        {NODES.map((node, i) => (
          <NodeLabel key={node.num} node={node} index={i} progress={progress} />
        ))}

        {/* Vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(13,13,13,0) 25%, rgba(13,13,13,0.85) 95%)',
          }}
        />

        {/* Act progress */}
        <ActProgressBar progress={progress} />

        {/* Three-act narration */}
        <ActOverlay
          progress={progress}
          range={[0.02, 0.32]}
          eyebrow="Akt I · Eingang"
          title="Hunderte Variablen prägen Ihre Payment-Kosten."
          body="Branche, Volumen, Kartenmix, internationale Anteile, Risikoprofil. Jeder Hebel hat einen Preis – und versteckt sich oft in einer Fußnote."
        />
        <ActOverlay
          progress={progress}
          range={[0.38, 0.60]}
          eyebrow="Akt II · Maschine"
          title="Wir verdichten alles auf das Wesentliche."
          body="Aus Hunderten Datenpunkten extrahieren wir die Stellschrauben, an denen tatsächlich Geld liegt. Klare Hypothesen statt vager Berater-Floskeln."
        />
        <ActOverlay
          progress={progress}
          range={[0.66, 1.0]}
          eyebrow="Akt III · Ausgabe"
          title="Sechs Bausteine. Eine Strategie."
          body="Aus der Analyse formt sich das Lösungspaket – maßgeschneidert auf Ihren Use-Case. Jeder Baustein ist messbar und einzeln aktivierbar."
        />

        {/* Scroll hint */}
        <ScrollHint progress={progress} />
      </div>
    </section>
  )
}

function FloatingChip({
  chip,
  progress,
  index,
}: {
  chip: FeeChip
  progress: number
  index: number
}) {
  const fadeIn = range01(progress, 0, 0.06)
  const fadeOut = range01(progress, 0.30, 0.5)
  const opacity = fadeIn * (1 - fadeOut)
  // implosive movement toward center
  const dx = (0.5 - chip.cx) * 100 * fadeOut
  const dy = (0.5 - chip.cy) * 100 * fadeOut

  return (
    <div
      className="absolute font-mono text-[11px] sm:text-xs whitespace-nowrap pointer-events-none px-2 py-1 rounded-md border border-icom-border bg-icom-card/70 backdrop-blur-sm text-icom-muted"
      style={{
        left: `${chip.cx * 100}%`,
        top: `${chip.cy * 100}%`,
        transform: `translate(calc(-50% + ${dx}%), calc(-50% + ${dy}%)) rotate(${chip.rot * (1 - fadeIn)}deg) scale(${1 - fadeOut * 0.3})`,
        opacity,
        transition: 'opacity 200ms ease-out',
      }}
    >
      {chip.text}
    </div>
  )
}

function NodeLabel({
  node,
  index,
  progress,
}: {
  node: SolutionNode
  index: number
  progress: number
}) {
  const local = smooth(range01(progress, 0.7 + index * 0.012, 0.9 + index * 0.012))
  // Position: same hex pattern as canvas (top=12 o'clock, clockwise)
  // We use translate from center (50%, 50%) by an offset matching the canvas hex radius (~32% minDim)
  const ang = (index / 6) * Math.PI * 2 - Math.PI / 2
  // Use percentage of viewport — keep slightly outside the canvas hex radius
  const radiusPct = 30 // % of min dim — labels sit just at the node
  const tx = Math.cos(ang) * radiusPct
  const ty = Math.sin(ang) * radiusPct

  // text alignment relative to center
  const isTop = ty < -8
  const isBottom = ty > 8
  const isLeft = tx < -2
  // when on left side, anchor text to the right of node; right side -> left
  const labelOffset = 28
  const offsetX = isLeft ? -labelOffset : tx === 0 ? 0 : labelOffset

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${tx}vmin), calc(-50% + ${ty}vmin)) translateY(${(1 - local) * 12}px)`,
        opacity: local,
        transition: 'opacity 200ms ease-out',
      }}
    >
      <div
        className="absolute whitespace-nowrap"
        style={{
          left: `${offsetX}px`,
          top: isTop ? '-8px' : isBottom ? '12px' : '-12px',
          textAlign: isLeft ? 'right' : 'left',
          transform: isLeft ? 'translateX(-100%)' : 'none',
        }}
      >
        <div className="text-icom-accent font-mono text-[10px] tracking-wider mb-1">
          {node.num}
        </div>
        <div className="text-white font-semibold text-sm sm:text-base leading-tight">
          {node.name}
        </div>
        <div className="text-icom-accent text-xs font-bold mt-0.5">
          {node.metric}
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
                  style={{ background: progress > ranges[i][1] ? '#F05252' : '#222' }}
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
