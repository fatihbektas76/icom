'use client'
import { useEffect, useState, useRef } from 'react'

export default function CountUp({ target, suffix = '+', duration = 1300 }: {
  target: number; suffix?: string; duration?: number
}) {
  const [value, setValue] = useState(0)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    ref.current = true
    const steps = 60
    const step = target / steps
    let cur = 0
    const timer = setInterval(() => {
      cur += step
      if (cur >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.round(cur))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target, duration])

  return <>{value.toLocaleString('de-DE')}{suffix}</>
}
