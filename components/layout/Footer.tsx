import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-icom-black border-t border-icom-border mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
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

          {/* Col 3: Social + Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Folge uns</h4>
            <a
              href="https://www.linkedin.com/company/intelligent-commerce-group-s-a-r-l/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#1c1c1c] flex items-center justify-center transition-all duration-200 hover:border-[#555] mb-6"
              aria-label="iCOM Group auf LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#555">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
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
        <div className="border-t border-icom-border mt-4 pt-8 text-center text-sm text-icom-dark">
          © 2025 i.COM – Intelligent Commerce Group S.a.r.l. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}
