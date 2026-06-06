'use client'
import { useEffect, useRef } from 'react'
import { useScrollProgress, useReducedMotion } from '@/hooks/useScrollProgress'

interface City {
  name: string
  lat: number
  lon: number
}

const CITIES: City[] = [
  { name: 'Frankfurt', lat: 50.11, lon: 8.68 },
  { name: 'London', lat: 51.51, lon: -0.13 },
  { name: 'New York', lat: 40.71, lon: -74.0 },
  { name: 'São Paulo', lat: -23.55, lon: -46.63 },
  { name: 'Dubai', lat: 25.27, lon: 55.3 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
  { name: 'Tokio', lat: 35.68, lon: 139.69 },
  { name: 'Sydney', lat: -33.87, lon: 151.21 },
  { name: 'Luxemburg', lat: 49.61, lon: 6.13 },
  { name: 'Zürich', lat: 47.37, lon: 8.54 },
  { name: 'Hongkong', lat: 22.32, lon: 114.17 },
  { name: 'Mumbai', lat: 19.08, lon: 72.88 },
]

interface Arc {
  from: number
  to: number
  start: number
  duration: number
}

const TAU = Math.PI * 2

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  }
}

function rotateY(p: { x: number; y: number; z: number }, a: number) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c }
}

function rotateX(p: { x: number; y: number; z: number }, a: number) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c }
}

export default function SceneGlobalPulse() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progress = useScrollProgress(sectionRef)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let time = 0
    const arcs: Arc[] = []

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { clientWidth: w, clientHeight: h } = canvas
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    sizeCanvas()
    const onResize = () => sizeCanvas()
    window.addEventListener('resize', onResize)

    const spawnArc = () => {
      const from = Math.floor(Math.random() * CITIES.length)
      let to = Math.floor(Math.random() * CITIES.length)
      while (to === from) to = Math.floor(Math.random() * CITIES.length)
      arcs.push({ from, to, start: time, duration: 1.4 + Math.random() * 1.2 })
    }

    const render = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // progress-driven camera & globe
      const p = progress
      const cx = w / 2
      const cy = h / 2
      const baseR = Math.min(w, h) * 0.34
      const scaleZoom = 1 + p * 0.35
      const r = baseR * scaleZoom
      const rotY = (reduced ? 0 : time * 0.18) + p * 0.6
      const rotX = -0.35 + p * 0.15

      // soft glow halo
      const halo = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r * 1.9)
      halo.addColorStop(0, 'rgba(240,82,82,0.15)')
      halo.addColorStop(1, 'rgba(240,82,82,0)')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.9, 0, TAU)
      ctx.fill()

      // wireframe sphere — latitudes
      ctx.lineWidth = 0.6
      for (let i = -75; i <= 75; i += 15) {
        ctx.beginPath()
        let first = true
        for (let lon = -180; lon <= 180; lon += 6) {
          let v = latLonToVec3(i, lon, r)
          v = rotateY(v, rotY)
          v = rotateX(v, rotX)
          const visible = v.z > -r * 0.05
          const x = cx + v.x
          const y = cy + v.y
          if (visible) {
            if (first) {
              ctx.moveTo(x, y)
              first = false
            } else ctx.lineTo(x, y)
          } else {
            first = true
          }
        }
        const alpha = 0.06 + Math.abs(i) / 1500
        ctx.strokeStyle = `rgba(240,82,82,${alpha + 0.04})`
        ctx.stroke()
      }
      // longitudes
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath()
        let first = true
        for (let lat = -90; lat <= 90; lat += 4) {
          let v = latLonToVec3(lat, lon, r)
          v = rotateY(v, rotY)
          v = rotateX(v, rotX)
          const visible = v.z > -r * 0.05
          const x = cx + v.x
          const y = cy + v.y
          if (visible) {
            if (first) {
              ctx.moveTo(x, y)
              first = false
            } else ctx.lineTo(x, y)
          } else {
            first = true
          }
        }
        ctx.strokeStyle = 'rgba(240,82,82,0.07)'
        ctx.stroke()
      }

      // city points
      const projected = CITIES.map(c => {
        let v = latLonToVec3(c.lat, c.lon, r)
        v = rotateY(v, rotY)
        v = rotateX(v, rotX)
        return v
      })
      projected.forEach(v => {
        const front = v.z > 0
        const x = cx + v.x
        const y = cy + v.y
        ctx.fillStyle = front ? 'rgba(240,82,82,0.95)' : 'rgba(240,82,82,0.25)'
        ctx.beginPath()
        ctx.arc(x, y, front ? 2.2 : 1.4, 0, TAU)
        ctx.fill()
        if (front) {
          ctx.fillStyle = 'rgba(240,82,82,0.18)'
          ctx.beginPath()
          ctx.arc(x, y, 7 + Math.sin(time * 4 + v.x) * 1.5, 0, TAU)
          ctx.fill()
        }
      })

      // arcs
      if (!reduced && Math.random() < 0.06 && arcs.length < 18) spawnArc()
      ctx.lineWidth = 1.4
      for (let i = arcs.length - 1; i >= 0; i--) {
        const a = arcs[i]
        const t = (time - a.start) / a.duration
        if (t > 1) {
          arcs.splice(i, 1)
          continue
        }
        const A = projected[a.from]
        const B = projected[a.to]
        if (A.z < -r * 0.4 && B.z < -r * 0.4) continue
        const segs = 36
        const lift = r * 0.45
        ctx.beginPath()
        for (let s = 0; s <= segs * t; s++) {
          const u = s / segs
          const ix = A.x * (1 - u) + B.x * u
          const iy = A.y * (1 - u) + B.y * u
          const iz = A.z * (1 - u) + B.z * u
          const arcLift = Math.sin(u * Math.PI) * lift
          const norm = Math.hypot(ix, iy, iz) || 1
          const px = cx + ix + (ix / norm) * arcLift
          const py = cy + iy + (iy / norm) * arcLift
          if (s === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        const fade = t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4
        ctx.strokeStyle = `rgba(240,82,82,${0.85 * fade})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(240,82,82,0.8)'
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      time += dt
      render()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [progress, reduced])

  // headline morph stages
  const stage = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2
  const headlines = [
    'Jede Sekunde.',
    'Fließt Geld.',
    'Um die ganze Welt.',
  ]
  const subs = [
    '11.000 Transaktionen pro Sekunde.',
    '180 Währungen. 50 Kartennetzwerke. 1 Standard.',
    'Wir verstehen jeden Knoten dieses Systems.',
  ]

  return (
    <section
      ref={sectionRef}
      className="relative bg-icom-black"
      style={{ height: '320vh' }}
      aria-label="Akt I: Der globale Zahlungspuls"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
        {/* vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(13,13,13,0.75) 80%, #0D0D0D 100%)',
          }}
        />

        {/* act marker */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          <span className="w-8 h-px bg-icom-accent/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-icom-accent/70">
            Akt I · Der globale Puls
          </span>
          <span className="w-8 h-px bg-icom-accent/40" />
        </div>

        {/* morphing headline */}
        <div className="absolute inset-x-0 bottom-[14vh] z-10 px-6 text-center">
          <div className="h-[6.5rem] md:h-[8rem] relative flex items-center justify-center">
            {headlines.map((h, i) => (
              <h2
                key={h}
                className="absolute text-4xl md:text-6xl font-bold text-white transition-all duration-700 ease-out"
                style={{
                  opacity: i === stage ? 1 : 0,
                  transform: `translateY(${i === stage ? 0 : i < stage ? -24 : 24}px)`,
                  filter: i === stage ? 'blur(0)' : 'blur(8px)',
                }}
              >
                {h}
              </h2>
            ))}
          </div>
          <div className="h-6 relative">
            {subs.map((s, i) => (
              <p
                key={s}
                className="absolute inset-x-0 text-sm md:text-base text-icom-gray transition-all duration-700"
                style={{
                  opacity: i === stage ? 0.85 : 0,
                  transform: `translateY(${i === stage ? 0 : 12}px)`,
                }}
              >
                {s}
              </p>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase tracking-[0.25em] text-icom-dark transition-opacity"
          style={{ opacity: progress > 0.05 ? 0 : 0.7 }}
        >
          ↓ Weiterscrollen
        </div>
      </div>
    </section>
  )
}
