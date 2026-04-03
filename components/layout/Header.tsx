'use client'
import { useEffect, useState } from 'react'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px',
        borderBottom: scrolled ? '1px solid rgba(180,30,30,0.4)' : '1px solid #1c1c1c',
        background: scrolled ? '#F05252' : 'rgba(13,13,13,0.95)',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}
    >
      {/* Logo – Text wird bei scroll schwarz */}
      <div style={{ filter: scrolled ? 'brightness(0) invert(1)' : 'none', transition: 'filter 0.35s ease' }}>
        <Logo size="md" />
      </div>

      {/* Sprachauswahl */}
      <div style={{
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.4)' : '#2a2a2a'}`,
        borderRadius: 6,
        padding: '5px 13px',
        fontSize: 12,
        color: scrolled ? '#fff' : '#666',
        transition: 'all 0.35s ease',
        cursor: 'pointer',
      }}>
        Deutsch ▾
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', gap: 26, fontSize: 13 }}>
        {['Lösungen', 'Vision', 'Blog', 'Mehr'].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            style={{
              color: scrolled ? 'rgba(255,255,255,0.85)' : '#666',
              textDecoration: 'none',
              transition: 'color 0.35s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.color = scrolled ? '#fff' : '#fff'
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.color = scrolled ? 'rgba(255,255,255,0.85)' : '#666'
            }}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Kontakt Button */}
      <Link
        href="/kontakt"
        style={{
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}`,
          background: scrolled ? 'rgba(255,255,255,0.15)' : 'transparent',
          borderRadius: 6,
          padding: '7px 20px',
          fontSize: 13,
          color: '#fff',
          textDecoration: 'none',
          transition: 'all 0.35s ease',
          backdropFilter: scrolled ? 'blur(4px)' : 'none',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = scrolled ? 'rgba(255,255,255,0.25)' : 'rgba(240,82,82,0.15)'
          el.style.borderColor = '#fff'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = scrolled ? 'rgba(255,255,255,0.15)' : 'transparent'
          el.style.borderColor = scrolled ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'
        }}
      >
        Kontakt
      </Link>
    </header>
  )
}
