import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog – Payment-News & Insights | iCOM Group',
  description: 'Aktuelle Payment-Insights, PSP-Vergleiche, Branchen-Analysen und Tipps zur Kostenoptimierung.',
}

const posts = [
  {
    title: 'Interchange++ vs. Flat-Rate: Welches Modell spart mehr?',
    excerpt: 'Ab welchem Umsatz sich der Wechsel zu Interchange++ lohnt und wie Sie die Einsparung berechnen.',
    date: '2025-03-15',
    category: 'Kostenoptimierung',
    link: '/wissen/interchange-fees',
  },
  {
    title: 'PSD2 & SCA: Was Händler 2025 wissen müssen',
    excerpt: 'Die wichtigsten Änderungen bei der starken Kundenauthentifizierung und wie Sie Ihre Conversion halten.',
    date: '2025-03-01',
    category: 'Regulierung',
    link: '/wissen/psd2-sca',
  },
  {
    title: 'PCI DSS 4.0: Neue Anforderungen ab 2025',
    excerpt: 'Der neue PCI-DSS-Standard bringt strengere Anforderungen. Was sich für Händler ändert.',
    date: '2025-02-15',
    category: 'Compliance',
    link: '/wissen/pci-dss',
  },
  {
    title: 'Chargeback-Rate senken: 5 bewährte Strategien',
    excerpt: 'Wie Sie Rückbuchungen vermeiden und Ihre Chargeback-Rate unter 1% halten.',
    date: '2025-02-01',
    category: 'Praxis-Tipps',
    link: '/wissen/chargeback-management',
  },
  {
    title: 'Omnichannel Payment: Online und stationär aus einer Hand',
    excerpt: 'Warum ein einziger PSP für alle Kanäle Zeit, Geld und Nerven spart.',
    date: '2025-01-15',
    category: 'Strategie',
    link: '/wissen/omnichannel-payment',
  },
  {
    title: 'paybyMail: Die unterschätzte Zahlungslösung',
    excerpt: 'Für Hotels, Handwerker und Dienstleister: Zahlungslinks als Alternative zu Terminal und Online-Shop.',
    date: '2025-01-01',
    category: 'Lösungen',
    link: '/paybymail/hotel',
  },
]

export default function BlogPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Blog</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Payment-<span className="text-icom-accent">Blog</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-16">
          Aktuelle Insights, Branchen-Analysen und Praxis-Tipps rund um Payment-Optimierung.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link key={i} href={post.link} className="group bg-icom-card border border-icom-border rounded-xl p-6 hover:border-icom-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] text-icom-accent uppercase tracking-wider bg-icom-accent/10 px-2 py-1 rounded">{post.category}</span>
                <span className="text-[10px] text-icom-dark">{new Date(post.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-icom-accent transition-colors leading-snug">{post.title}</h2>
              <p className="text-sm text-icom-gray leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
