'use client'
import { useEffect, useRef } from 'react'
import { useScrollProgress, useReducedMotion } from '@/hooks/useScrollProgress'

const GLYPHS = '0123456789€$£¥¢¤§ABCDEF×+-'.split('')

interface Column {
  x: number
  y: number
  speed: number
  glyphs: string[]
  trail: number
}

export default function SceneVault() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progress = useScrollProgress(sectionRef)
  const reduced = useReducedMotion()

  // openness 0..1 — door is fully closed until 25 % scroll, fully open by 70 %
  const openness = Math.max(0, Math.min(1, (progress - 0.25) / 0.45))
  const dialAngle = (reduced ? 0 : progress * 1440) // 4 full spins

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let columns: Column[] = []
    let lastSize = { w: 0, h: 0 }

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      lastSize = { w, h }
      const cols = Math.floor(w / 18)
      columns = Array.from({ length: cols }, (_, i) => ({
        x: i * 18 + 9,
        y: Math.random() * -h,
        speed: 60 + Math.random() * 120,
        trail: 8 + Math.floor(Math.random() * 16),
        glyphs: Array.from({ length: 24 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
      }))
    }
    setup()
    window.addEventListener('resize', setup)

    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const { w, h } = lastSize
      // fade-trail
      ctx.fillStyle = 'rgba(13,13,13,0.18)'
      ctx.fillRect(0, 0, w, h)
      const visible = openness > 0
      if (visible) {
        ctx.font = '14px ui-monospace, SFMono-Regular, Menlo, monospace'
        ctx.textBaseline = 'top'
        for (const col of columns) {
          if (!reduced) col.y += col.speed * dt
          if (col.y > h + col.trail * 16) {
            col.y = -col.trail * 16
            col.speed = 60 + Math.random() * 140
          }
          for (let i = 0; i < col.trail; i++) {
            const gy = col.y - i * 16
            if (gy < -16 || gy > h) continue
            const g = col.glyphs[(Math.floor(now / 80) + i) % col.glyphs.length]
            const head = i === 0
            const alpha = head ? 1 : Math.max(0, 1 - i / col.trail) * 0.65
            ctx.fillStyle = head
              ? `rgba(255,200,200,${alpha * openness})`
              : `rgba(240,82,82,${alpha * openness})`
            ctx.fillText(g, col.x, gy)
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setup)
    }
  }, [reduced, openness])

  // door halves split sideways with scale + rotateY
  const leftDoorStyle = {
    transform: `translateX(${-openness * 55}%) rotateY(${-openness * 75}deg)`,
    opacity: 1 - openness * 0.15,
  }
  const rightDoorStyle = {
    transform: `translateX(${openness * 55}%) rotateY(${openness * 75}deg)`,
    opacity: 1 - openness * 0.15,
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-icom-black"
      style={{ height: '320vh' }}
      aria-label="Akt II: Der Tresor"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* code rain inside vault — revealed as door opens */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(240,82,82,0.08) 0%, rgba(13,13,13,0) 60%)',
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: openness }}
        />

        {/* act marker */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          <span className="w-8 h-px bg-icom-accent/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-icom-accent/70">
            Akt II · Der Tresor
          </span>
          <span className="w-8 h-px bg-icom-accent/40" />
        </div>

        {/* vault frame */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ perspective: '1400px' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative"
              style={{
                width: 'min(80vmin, 720px)',
                height: 'min(80vmin, 720px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* outer frame ring */}
              <div
                className="absolute inset-0 rounded-full border-[14px] border-[#1c1c1c]"
                style={{
                  boxShadow:
                    'inset 0 0 60px rgba(240,82,82,0.18), 0 0 60px rgba(240,82,82,0.08)',
                }}
              />
              <div
                className="absolute inset-[7%] rounded-full border-[3px] border-[#2a2a2a]"
                style={{ boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)' }}
              />

              {/* LEFT door half */}
              <div
                className="absolute top-[7%] bottom-[7%] left-[7%] w-[43%] origin-left transition-transform duration-300 ease-out"
                style={{
                  ...leftDoorStyle,
                  transformOrigin: 'left center',
                  background:
                    'linear-gradient(135deg, #1a1a1a 0%, #0e0e0e 40%, #1a1a1a 70%, #060606 100%)',
                  borderRadius: '50% 0 0 50% / 50% 0 0 50%',
                  borderRight: '2px solid #2a2a2a',
                  boxShadow:
                    'inset -20px 0 40px rgba(0,0,0,0.7), inset 0 0 40px rgba(240,82,82,0.05)',
                }}
              >
                {/* bolts */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = -80 + (i / 7) * 160
                  const rad = (angle * Math.PI) / 180
                  const r = 42
                  return (
                    <span
                      key={i}
                      className="absolute w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"
                      style={{
                        left: `${50 + Math.cos(rad) * r}%`,
                        top: `${50 + Math.sin(rad) * r}%`,
                        boxShadow:
                          '0 0 0 1px #0a0a0a, inset 0 0 4px rgba(240,82,82,0.4)',
                        transform: 'translate(-50%,-50%)',
                      }}
                    />
                  )
                })}
              </div>

              {/* RIGHT door half */}
              <div
                className="absolute top-[7%] bottom-[7%] right-[7%] w-[43%] origin-right transition-transform duration-300 ease-out"
                style={{
                  ...rightDoorStyle,
                  transformOrigin: 'right center',
                  background:
                    'linear-gradient(225deg, #1a1a1a 0%, #0e0e0e 40%, #1a1a1a 70%, #060606 100%)',
                  borderRadius: '0 50% 50% 0 / 0 50% 50% 0',
                  borderLeft: '2px solid #2a2a2a',
                  boxShadow:
                    'inset 20px 0 40px rgba(0,0,0,0.7), inset 0 0 40px rgba(240,82,82,0.05)',
                }}
              >
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = 100 + (i / 7) * 160
                  const rad = (angle * Math.PI) / 180
                  const r = 42
                  return (
                    <span
                      key={i}
                      className="absolute w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"
                      style={{
                        left: `${50 + Math.cos(rad) * r}%`,
                        top: `${50 + Math.sin(rad) * r}%`,
                        boxShadow:
                          '0 0 0 1px #0a0a0a, inset 0 0 4px rgba(240,82,82,0.4)',
                        transform: 'translate(-50%,-50%)',
                      }}
                    />
                  )
                })}
              </div>

              {/* central dial — hides as door opens */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-icom-accent/70 transition-opacity duration-500"
                style={{
                  width: '24%',
                  height: '24%',
                  opacity: 1 - openness,
                  boxShadow:
                    '0 0 30px rgba(240,82,82,0.45), inset 0 0 20px rgba(240,82,82,0.3)',
                  background:
                    'radial-gradient(circle at center, #1a0a0a 0%, #0a0505 70%)',
                }}
              >
                {/* tick marks */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 w-px h-2 bg-icom-accent/60"
                    style={{
                      transform: `translate(-50%,-50%) rotate(${i * 15}deg) translateY(-46%)`,
                    }}
                  />
                ))}
                {/* spinner needle */}
                <div
                  className="absolute left-1/2 top-1/2 origin-bottom"
                  style={{
                    width: 2,
                    height: '38%',
                    transform: `translate(-50%,-100%) rotate(${dialAngle}deg)`,
                    background:
                      'linear-gradient(to top, #F05252 0%, #ffb0b0 100%)',
                    boxShadow: '0 0 8px rgba(240,82,82,0.9)',
                    transition: reduced ? 'none' : 'transform 80ms linear',
                  }}
                />
                <div
                  className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-icom-accent"
                  style={{ boxShadow: '0 0 14px rgba(240,82,82,0.8)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* center reveal label — appears when door is mostly open */}
        <div
          className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none"
          style={{ opacity: Math.max(0, (openness - 0.7) / 0.3) }}
        >
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.4em] text-icom-accent/70 mb-3">
              Geöffnet
            </div>
            <div className="text-4xl md:text-6xl font-bold text-white mb-2">
              Volle Transparenz.
            </div>
            <div className="text-sm text-icom-gray">
              Interchange. Scheme Fee. Acquirer-Marge. Ohne Verschleierung.
            </div>
          </div>
        </div>

        {/* narrative caption — bottom */}
        <div className="absolute inset-x-0 bottom-[10vh] z-30 text-center px-6 pointer-events-none">
          <p
            className="text-sm md:text-base text-icom-gray max-w-xl mx-auto transition-opacity duration-500"
            style={{ opacity: openness < 0.7 ? 1 : 0 }}
          >
            Was Ihr PSP nicht zeigt, kostet Sie am meisten.
          </p>
        </div>
      </div>
    </section>
  )
}
