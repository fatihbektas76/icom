'use client'
import { useEffect, useRef, useState } from 'react'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const PRIMARY_NAV: NavItem[] = [
  { label: 'Lösungen', href: '/loesungen' },
  { label: 'Vision',   href: '/vision'    },
  { label: 'Blog',     href: '/blog'      },
]

const MORE: NavGroup = {
  label: 'Mehr',
  items: [
    { label: 'Payment-Rechner',     href: '/tools/payment-kosten-rechner' },
    { label: 'PSP-Vergleich',       href: '/tools/psp-vergleich' },
    { label: 'POS-Rechner',         href: '/tools/pos-rechner' },
    { label: 'Interchange-Rechner', href: '/tools/interchange-rechner' },
    { label: 'paybyMail-Check',     href: '/tools/paybymail-check' },
    { label: 'Payment-Wissen',      href: '/wissen/interchange-fees' },
    { label: 'Branchen-Lösungen',   href: '/payment-kosten/hotel' },
  ],
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close desktop dropdown on outside click / escape
  useEffect(() => {
    if (!moreOpen) return
    const onClick = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [moreOpen])

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // lock body scroll while mobile menu is open + Esc to close
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const linkColor = scrolled ? 'rgba(255,255,255,0.85)' : '#888'
  const linkHover = '#fff'
  const burgerColor = scrolled ? '#fff' : '#F05252'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-4"
        style={{
          borderBottom: scrolled ? '1px solid rgba(180,30,30,0.4)' : '1px solid #1c1c1c',
          background: scrolled ? '#F05252' : 'rgba(13,13,13,0.95)',
          backdropFilter: 'blur(12px)',
          transition: 'background 0.35s ease, border-color 0.35s ease',
        }}
      >
        <Logo size="md" variant={scrolled ? 'onCoral' : 'onDark'} />

        {/* Desktop: Sprachauswahl */}
        <div
          className="hidden md:block cursor-pointer"
          style={{
            border: `1px solid ${scrolled ? 'rgba(255,255,255,0.4)' : '#2a2a2a'}`,
            borderRadius: 6,
            padding: '5px 13px',
            fontSize: 12,
            color: scrolled ? '#fff' : '#666',
            transition: 'all 0.35s ease',
          }}
        >
          Deutsch ▾
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center" style={{ gap: 26, fontSize: 13 }}>
          {PRIMARY_NAV.map(item => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                color: linkColor,
                textDecoration: 'none',
                transition: 'color 0.35s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = linkHover)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = linkColor)}
            >
              {item.label}
            </Link>
          ))}

          {/* Mehr — Dropdown */}
          <div ref={moreRef} style={{ position: 'relative' }}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen(v => !v)}
              onMouseEnter={() => setMoreOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: moreOpen ? linkHover : linkColor,
                fontSize: 13,
                transition: 'color 0.35s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {MORE.label}
              <span
                style={{
                  display: 'inline-block',
                  transition: 'transform 0.25s ease',
                  transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  fontSize: 10,
                }}
              >
                ▾
              </span>
            </button>

            <div
              role="menu"
              onMouseLeave={() => setMoreOpen(false)}
              style={{
                position: 'absolute',
                top: 'calc(100% + 14px)',
                right: 0,
                minWidth: 240,
                background: '#0d0d0d',
                border: '1px solid #1c1c1c',
                borderRadius: 10,
                padding: 8,
                boxShadow:
                  '0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(240,82,82,0.08)',
                opacity: moreOpen ? 1 : 0,
                transform: moreOpen ? 'translateY(0)' : 'translateY(-6px)',
                pointerEvents: moreOpen ? 'auto' : 'none',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              {MORE.items.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  style={{
                    display: 'block',
                    padding: '9px 12px',
                    borderRadius: 6,
                    fontSize: 13,
                    color: '#c8c8c8',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, color 0.2s ease',
                    borderTop: idx === 5 ? '1px solid #1c1c1c' : 'none',
                    marginTop: idx === 5 ? 4 : 0,
                    paddingTop: idx === 5 ? 13 : 9,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = '#161616'
                    el.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'transparent'
                    el.style.color = '#c8c8c8'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Desktop: Kontakt Button */}
        <Link
          href="/kontakt"
          className="hidden md:inline-block"
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

        {/* Mobile: Burger Button */}
        <button
          type="button"
          className="md:hidden relative flex items-center justify-center"
          aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          style={{
            width: 42,
            height: 42,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span className="sr-only">{mobileOpen ? 'Menü schließen' : 'Menü öffnen'}</span>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 11,
              right: 11,
              top: mobileOpen ? '50%' : '15px',
              height: 1.5,
              background: burgerColor,
              transform: mobileOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
              transition: 'top 200ms ease, transform 300ms ease, background 300ms ease',
              borderRadius: 1,
            }}
          />
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 11,
              right: 11,
              top: '50%',
              transform: 'translateY(-50%)',
              height: 1.5,
              background: burgerColor,
              opacity: mobileOpen ? 0 : 1,
              transition: 'opacity 200ms ease, background 300ms ease',
              borderRadius: 1,
            }}
          />
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 11,
              right: 11,
              bottom: mobileOpen ? '50%' : '15px',
              height: 1.5,
              background: burgerColor,
              transform: mobileOpen ? 'translateY(50%) rotate(-45deg)' : 'none',
              transition: 'bottom 200ms ease, transform 300ms ease, background 300ms ease',
              borderRadius: 1,
            }}
          />
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  )
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  pathname: string | null
}

function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className="md:hidden fixed inset-0 z-40"
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 300ms ease',
        }}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Hauptmenü"
        className="md:hidden fixed top-0 right-0 bottom-0 z-40 flex flex-col"
        style={{
          width: 'min(86vw, 360px)',
          background: '#0d0d0d',
          borderLeft: '1px solid #1c1c1c',
          paddingTop: 72,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '-20px 0 40px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Primary nav */}
          <nav className="flex flex-col gap-1" aria-label="Hauptnavigation">
            {PRIMARY_NAV.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg transition-colors"
                  style={{
                    color: active ? '#F05252' : '#fff',
                    fontSize: 17,
                    fontWeight: 500,
                    background: active ? 'rgba(240,82,82,0.08)' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: '#444', fontSize: 14 }}>→</span>
                </Link>
              )
            })}
          </nav>

          {/* Section divider */}
          <div className="mt-8 mb-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-icom-border" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-icom-dark font-medium">
              {MORE.label}
            </span>
            <span className="h-px flex-1 bg-icom-border" />
          </div>

          {/* More nav */}
          <nav className="flex flex-col" aria-label="Weitere Seiten">
            {MORE.items.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-lg transition-colors"
                  style={{
                    color: active ? '#F05252' : '#c8c8c8',
                    fontSize: 14,
                    background: active ? 'rgba(240,82,82,0.08)' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer with CTA */}
        <div
          className="px-6 py-5"
          style={{ borderTop: '1px solid #1c1c1c', background: '#0a0a0a' }}
        >
          <Link
            href="/kontakt"
            onClick={onClose}
            className="block text-center w-full bg-icom-accent hover:bg-icom-accent-hover text-white rounded-lg py-3 font-medium transition-colors"
            style={{ textDecoration: 'none', fontSize: 14 }}
          >
            Kontakt aufnehmen →
          </Link>
          <div className="mt-4 text-center">
            <div className="text-[10px] uppercase tracking-[0.18em] text-icom-dark mb-1">
              Direkt anrufen
            </div>
            <a
              href="tel:+4915152820216"
              className="text-sm text-white hover:text-icom-accent transition-colors"
              style={{ textDecoration: 'none' }}
            >
              +49 (0) 1515 282 021 6
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
