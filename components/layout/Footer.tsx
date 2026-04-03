'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-icom-black border-t border-icom-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + Adresse */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14C10 10 15 18 20 14C25 10 30 18 35 14" stroke="#F05252" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M5 20C10 16 15 24 20 20C25 16 30 24 35 20" stroke="#F05252" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M5 26C10 22 15 30 20 26C25 22 30 30 35 26" stroke="#F05252" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-lg font-bold text-white">
                i<span className="text-icom-accent">.</span>COM
              </span>
            </div>
            <div className="text-sm text-icom-muted space-y-1">
              <p>Intelligent Commerce Group S.a.r.l.</p>
              <p>1 Place du Marché</p>
              <p>L-6755 Grevenmacher</p>
              <p className="mt-3">
                <a href="tel:+4915152820216" className="hover:text-white transition-colors">
                  +49 1515 282 021 6
                </a>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Start' },
                { href: '/loesungen', label: 'Lösungen' },
                { href: '/vision', label: 'Vision' },
                { href: '/blog', label: 'Blog' },
                { href: '/kontakt', label: 'Kontakt' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-icom-muted hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-icom-muted mb-3">
              Payment-Insights direkt ins Postfach.
            </p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="E-Mail-Adresse"
                className="flex-1 bg-icom-card border border-icom-border rounded-md px-3 py-2 text-sm text-white placeholder:text-icom-dark outline-none focus:border-icom-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-icom-accent hover:bg-icom-accent-hover text-white text-sm px-4 py-2 rounded-md transition-colors"
              >
                Absenden
              </button>
            </form>
          </div>

          {/* Col 4: Social + Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Folge uns</h4>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-icom-muted hover:text-white transition-colors mb-6"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <div className="flex flex-col gap-2">
              <Link href="/impressum" className="text-sm text-icom-muted hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-sm text-icom-muted hover:text-white transition-colors">
                Datenschutz
              </Link>
              <Link href="/cookies" className="text-sm text-icom-muted hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-icom-border mt-12 pt-8 text-center text-sm text-icom-dark">
          © 2025 i.COM – Intelligent Commerce Group S.a.r.l. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}
