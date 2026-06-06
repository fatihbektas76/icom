'use client'
import { useRef } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import SceneGlobalPulse from './journey/SceneGlobalPulse'
import SceneVault from './journey/SceneVault'
import SceneCostCollapse from './journey/SceneCostCollapse'

/**
 * Three-act cinematic scrollytelling:
 *   I.   Der globale Puls   — rotating wireframe globe with payment arcs
 *   II.  Der Tresor         — vault door opens, revealing transaction code rain
 *   III. Der Einsturz       — gray cost towers collapse, savings number assembles
 *
 * A coral progress spine on the left tracks the user through all 3 acts.
 */
export default function CinematicJourney() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(wrapRef)
  const act = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2

  return (
    <div ref={wrapRef} className="relative">
      {/* progress spine */}
      <div
        aria-hidden
        className="hidden md:flex pointer-events-none fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3"
      >
        {['I', 'II', 'III'].map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <span
              className="text-[10px] font-bold transition-colors duration-300"
              style={{ color: i === act ? '#F05252' : '#333' }}
            >
              {label}
            </span>
            {i < 2 && (
              <span
                className="block w-px h-12 transition-colors duration-500"
                style={{
                  background: i < act ? '#F05252' : '#222',
                  boxShadow: i < act ? '0 0 8px rgba(240,82,82,0.6)' : 'none',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <SceneGlobalPulse />
      <SceneVault />
      <SceneCostCollapse />
    </div>
  )
}
