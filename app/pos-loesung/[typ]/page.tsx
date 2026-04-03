import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posTypen, getPOSTypBySlug } from '@/lib/data/pos-typen'
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup'

export function generateStaticParams() {
  return posTypen.map(p => ({ typ: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ typ: string }> }): Promise<Metadata> {
  const { typ: slug } = await params
  const p = getPOSTypBySlug(slug)
  if (!p) return {}
  return {
    title: `${p.name} – POS-Lösung & Kosten | iCOM Group`,
    description: `${p.name}: ${p.description} Kosten: ${p.avgCost}. Vergleich und Beratung.`,
    openGraph: { title: `${p.name} – POS-Lösung`, description: p.description },
  }
}

export default async function POSTypPage({ params }: { params: Promise<{ typ: string }> }) {
  const { typ: slug } = await params
  const p = getPOSTypBySlug(slug)
  if (!p) notFound()

  return (
    <>
      <FAQSchema faqs={p.faq} />
      <BreadcrumbSchema items={[
        { name: 'Start', url: 'https://icom-group.net' },
        { name: 'POS-Lösungen', url: 'https://icom-group.net/pos-loesung' },
        { name: p.name, url: `https://icom-group.net/pos-loesung/${p.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">{p.name}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-icom-accent" />
          <span className="text-xs text-icom-gray">POS-Lösung</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          <span className="text-icom-accent">{p.name}</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-8">{p.description}</p>
        <div className="inline-flex items-center gap-3 bg-icom-card border border-icom-border rounded-lg px-5 py-3">
          <span className="text-sm text-icom-muted">Ø Kosten:</span>
          <span className="text-lg font-bold text-icom-accent">{p.avgCost}</span>
        </div>
      </section>

      {/* Features */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Vorteile: {p.name}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Kontaktloses Bezahlen', desc: 'NFC-Zahlung mit Karte, Apple Pay und Google Pay in unter 3 Sekunden.' },
              { title: 'Alle Kartenarten', desc: 'Visa, Mastercard, girocard, American Express und alle gängigen Wallets.' },
              { title: 'Einfache Integration', desc: 'Schnelle Einrichtung, intuitive Bedienung und zuverlässiger Betrieb.' },
            ].map((item, i) => (
              <div key={i} className="bg-icom-card border border-icom-border rounded-xl p-6">
                <div className="w-10 h-10 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-icom-accent font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-icom-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{p.name}: Überblick und Kosten</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              {p.description} Die Kosten liegen durchschnittlich bei {p.avgCost}, abhängig vom
              Anbieter und Funktionsumfang. Moderne POS-Lösungen bieten neben der reinen
              Zahlungsabwicklung auch Warenwirtschaft, Kundenmanagement und Analytics.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Bei der Wahl eines {p.name}s spielen mehrere Faktoren eine Rolle: Transaktionsgebühren,
              Hardware-Kosten, Softwarelizenzen, Funktionsumfang und Integration mit bestehenden
              Systemen. Die iCOM Group vergleicht alle relevanten Anbieter und findet die
              wirtschaftlichste Lösung.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Besonders wichtig: Die Transaktionsgebühren machen langfristig einen größeren
              Kostenblock aus als die Hardware. Ein günstiges Terminal mit hohen Transaktionsgebühren
              kann über 3 Jahre deutlich teurer sein als ein teureres Gerät mit niedrigeren Gebühren.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Die richtige POS-Strategie</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Die POS-Landschaft hat sich fundamental gewandelt. Klassische EC-Terminals werden
              zunehmend durch smarte, vernetzte Lösungen ersetzt. Cloud-basierte Kassensysteme,
              mobile Reader und Self-Checkout-Lösungen bieten mehr Flexibilität und bessere
              Datenintegration.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Für Unternehmen mit mehreren Standorten empfiehlt sich eine zentrale POS-Lösung
              mit einheitlichem Reporting. Omnichannel-PSPs wie Adyen und Unzer verbinden
              POS-Terminals nahtlos mit dem Online-Shop.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Die iCOM Group berät Sie herstellerunabhängig bei der Auswahl und Implementierung
              der optimalen POS-Lösung. Von der Anforderungsanalyse über die Anbieterauswahl
              bis zur Inbetriebnahme begleiten wir den gesamten Prozess.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Häufige Fragen: {p.name}
          </h2>
          <div className="space-y-4">
            {p.faq.map((faq, i) => (
              <div key={i} className="bg-icom-card border border-icom-border rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                <p className="text-sm text-icom-gray leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">POS-Beratung anfragen</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Kostenlose Beratung zu {p.name}. Anbietervergleich, Kostenoptimierung und Implementierung.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Jetzt beraten lassen →
          </Link>
        </div>
      </section>
    </>
  )
}
