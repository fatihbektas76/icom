import Link from 'next/link'

type LogoVariant = 'onDark' | 'onCoral'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  variant?: LogoVariant
}

const sizes = {
  sm: { w: 22, h: 15, fs: 14, gap: 8 },
  md: { w: 30, h: 20, fs: 17, gap: 10 },
  lg: { w: 46, h: 31, fs: 26, gap: 14 },
}

const palette = {
  onDark: {
    waveHi: '#ff8080',  waveMid1: '#F05252', waveLo1: '#8a2020',
    waveMid2: '#E84848', waveLo2: '#7a1c1c',
    waveMid3: '#D04040', waveLo3: '#5a1414',
    embossed: true,
  },
  onCoral: {
    // monochrome white waves with subtle inner shadow for depth on coral bg
    waveHi: '#ffffff',  waveMid1: '#ffffff', waveLo1: 'rgba(122,28,28,0.45)',
    waveMid2: '#ffffff', waveLo2: 'rgba(122,28,28,0.35)',
    waveMid3: '#ffffff', waveLo3: 'rgba(122,28,28,0.25)',
    embossed: false,
  },
} as const

export default function Logo({ size = 'md', showText = true, variant = 'onDark' }: LogoProps) {
  const s = sizes[size]
  const p = palette[variant]
  const isCoral = variant === 'onCoral'

  return (
    <Link
      href="/"
      className="flex items-center font-bold text-white select-none"
      style={{ gap: s.gap }}
      aria-label="iCOM Group – Startseite"
    >
      <svg width={s.w} height={s.h} viewBox="0 0 48 33" fill="none" aria-hidden>
        {/* Wave 1 */}
        <path d="M2 6 Q12 1 24 6 Q36 11 46 6 L46 7 Q36 12 24 7 Q12 2 2 7 Z"
          fill={p.waveHi} opacity={isCoral ? 0.55 : 0.35} />
        <path d="M2 6 Q12 1 24 6 Q36 11 46 6 L46 11 Q36 16 24 11 Q12 6 2 11 Z"
          fill={p.waveMid1} />
        <path d="M2 10 Q12 5 24 10 Q36 15 46 10 L46 11 Q36 16 24 11 Q12 6 2 11 Z"
          fill={p.waveLo1} />
        {/* Wave 2 */}
        <path d="M2 16 Q12 11 24 16 Q36 21 46 16 L46 17 Q36 22 24 17 Q12 12 2 17 Z"
          fill={p.waveHi} opacity={isCoral ? 0.45 : 0.25} />
        <path d="M2 16 Q12 11 24 16 Q36 21 46 16 L46 21 Q36 26 24 21 Q12 16 2 21 Z"
          fill={p.waveMid2} />
        <path d="M2 20 Q12 15 24 20 Q36 25 46 20 L46 21 Q36 26 24 21 Q12 16 2 21 Z"
          fill={p.waveLo2} />
        {/* Wave 3 */}
        <path d="M2 26 Q12 21 24 26 Q36 31 46 26 L46 27 Q36 32 24 27 Q12 22 2 27 Z"
          fill={p.waveHi} opacity={isCoral ? 0.35 : 0.18} />
        <path d="M2 26 Q12 21 24 26 Q36 31 46 26 L46 31 Q36 36 24 31 Q12 26 2 31 Z"
          fill={p.waveMid3} />
        <path d="M2 30 Q12 25 24 30 Q36 35 46 30 L46 31 Q36 36 24 31 Q12 26 2 31 Z"
          fill={p.waveLo3} />
      </svg>

      {showText && (
        p.embossed ? (
          <span style={{ position: 'relative', display: 'inline-block', fontSize: s.fs, lineHeight: 1 }}>
            <span style={{ position: 'absolute', top: 3, left: 3, color: '#120404', fontWeight: 700, whiteSpace: 'nowrap' }} aria-hidden>i.COM</span>
            <span style={{ position: 'absolute', top: 2, left: 2, color: '#3a1010', fontWeight: 700, whiteSpace: 'nowrap' }} aria-hidden>i.COM</span>
            <span style={{ position: 'absolute', top: 1, left: 1, color: '#7a1c1c', fontWeight: 700, whiteSpace: 'nowrap' }} aria-hidden>i.COM</span>
            <span style={{ position: 'relative', color: '#ffffff', fontWeight: 700, whiteSpace: 'nowrap' }}>i.COM</span>
          </span>
        ) : (
          <span
            style={{
              fontSize: s.fs,
              lineHeight: 1,
              color: '#ffffff',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
              textShadow: '0 1px 0 rgba(122,28,28,0.35)',
            }}
          >
            i.COM
          </span>
        )
      )}
    </Link>
  )
}
