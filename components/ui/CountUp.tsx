'use client'
import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  target: number
  suffix?: string
  /** ms */
  duration?: number
  /** start delay in ms after becoming visible */
  delay?: number
  /** 'auto' → display "4K" for thousands, 'plain' → "4.000" */
  format?: 'auto' | 'plain' | 'k'
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function formatValue(value: number, target: number, format: 'auto' | 'plain' | 'k') {
  const useK =
    format === 'k' ||
    (format === 'auto' && target >= 1000)

  if (useK) {
    const v = value / 1000
    // keep no decimal once we're near the target
    const decimals = value >= target * 0.99 ? 0 : v < 10 ? 1 : 0
    return `${v.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}K`
  }
  return value.toLocaleString('de-DE')
}

export default function CountUp({
  target,
  suffix = '+',
  duration = 1600,
  delay = 0,
  format = 'auto',
}: CountUpProps) {
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(false)
  const elRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  // observe when in viewport
  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // run animation once visible
  useEffect(() => {
    if (!visible || started.current) return
    started.current = true

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(target)
      return
    }

    let raf = 0
    let startTs = 0
    const tick = (ts: number) => {
      if (!startTs) startTs = ts + delay
      const t = Math.max(0, ts - startTs)
      const p = Math.min(1, t / duration)
      const eased = easeOutCubic(p)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, target, duration, delay])

  return (
    <span ref={elRef}>
      {formatValue(value, target, format)}
      {suffix}
    </span>
  )
}
