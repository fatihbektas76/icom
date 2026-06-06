'use client'
import { useEffect, useState, type RefObject } from 'react'

/**
 * Returns scroll progress 0..1 of a tall section while its top is between
 * viewport top (1) and the bottom-of-section reaching viewport top (0 → 1).
 * Drives sticky scrollytelling scenes.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let raf = 0
    const compute = () => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      if (total <= 0) {
        setProgress(0)
        return
      }
      const scrolled = -rect.top
      const next = Math.max(0, Math.min(1, scrolled / total))
      setProgress(next)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        compute()
        raf = 0
      })
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref])

  return progress
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
