import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lösungen – Payment Solutions & Beratung | iCOM Group',
  description: 'Payment Solutions, E-Commerce Payment, POS-Lösungen, paybyMail und Kostenoptimierung – alle Leistungen der iCOM Group.',
}

export default function LoesungenPage() {
  const solutions = [
    {
      title: 'Payment Solutions',
      desc: 'Unabhängige PSP-Beratung, Vertragsverhandlung und Kostenoptimierung für alle Zahlungsarten.',
      link: '/tools/psp-vergleich',
      features: ['PSP-Vergleich & Auswahl', 'Vertragsverhandlung', 'Gebührenoptimierung', 'Laufende Kostenkontrolle'],
    },
    {
      title: 'E-Commerce Payment',
      desc: 'Checkout-Optimierung, Payment-Integration und Conversion-Steigerung für Online-Shops.',
      link: '/ecommerce-payment/shopify',
      features: ['Shopify, WooCommerce, Magento', 'Checkout-Optimierung', 'Multi-PSP-Strategie', 'Lokale Zahlungsarten'],
    },
    {
      title: 'POS-Lösungen',
      desc: 'Terminal-Beratung, Kassensysteme und stationäre Payment-Lösungen für den Handel.',
      link: '/pos-loesung/stationaer',
      features: ['Terminal-Vergleich', 'Kassensystem-Integration', 'Omnichannel-Setup', 'Filial-Lösungen'],
    },
    {
      title: 'paybyMail',
      desc: 'Zahlungslinks per E-Mail und SMS – für Branchen ohne festen Checkout-Punkt.',
      link: '/paybymail/hotel',
      features: ['Keine Hardware nötig', 'PCI-DSS-konform', 'Sofortige Zahlung', 'Gebrandete Zahlungsseiten'],
    },
    {
      title: 'Interchange-Optimierung',
      desc: 'Wechsel von Flat-Rate zu Interchange++ für signifikante Kostensenkungen bei hohem Volumen.',
      link: '/tools/interchange-rechner',
      features: ['IC++ vs. Flat-Rate Analyse', 'Scheme-Fee-Optimierung', 'Non-EU-Karten-Strategie', '20–40% Einsparung'],
    },
    {
      title: 'Payment-Wissen',
      desc: 'Bildungsressourcen zu PSD2, PCI DSS, Chargebacks und allen Payment-Themen.',
      link: '/wissen/interchange-fees',
      features: ['Interchange Fees', 'PSD2 & SCA', 'PCI DSS', 'Chargeback Management'],
    },
  ]

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Lösungen</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Unsere <span className="text-icom-accent">Lösungen</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-16">
          Von der PSP-Auswahl über Checkout-Optimierung bis zur laufenden Kostenüberwachung –
          die iCOM Group bietet unabhängige Payment-Beratung aus einer Hand.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <Link key={i} href={sol.link} className="group bg-icom-card border border-icom-border rounded-xl p-6 hover:border-icom-accent/50 transition-colors">
              <div className="w-10 h-10 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-icom-accent font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-icom-accent transition-colors">{sol.title}</h2>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">{sol.desc}</p>
              <ul className="space-y-1.5">
                {sol.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-icom-muted">
                    <span className="text-icom-accent">—</span>{f}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Welche Lösung passt zu Ihnen?</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            In der kostenlosen Erstanalyse finden wir die optimale Payment-Strategie für Ihr Unternehmen.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Jetzt Beratung anfragen →
          </Link>
        </div>
      </section>
    </>
  )
}
