'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/loesungen', label: 'Lösungen' },
  { href: '/vision', label: 'Vision' },
  { href: '/blog', label: 'Blog' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-icom-black/95 backdrop-blur-sm border-b border-icom-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-icom-muted hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <select className="bg-transparent border border-icom-border-light rounded-md px-2 py-1 text-xs text-icom-muted outline-none">
              <option value="de">DE</option>
              <option value="en">EN</option>
            </select>
            <Link
              href="/kontakt"
              className="border border-white/30 hover:border-icom-accent text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-icom-border mt-2 pt-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-icom-muted hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="inline-block mt-3 border border-white/30 text-white text-sm px-4 py-2 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Kontakt
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
