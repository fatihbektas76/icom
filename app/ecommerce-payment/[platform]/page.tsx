import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { platforms, getPlatformBySlug } from '@/lib/data/platforms'
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup'

export function generateStaticParams() {
  return platforms.map(p => ({ platform: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const { platform: slug } = await params
  const p = getPlatformBySlug(slug)
  if (!p) return {}
  return {
    title: `${p.name} Payment – PSP-Vergleich & Gebühren | iCOM Group`,
    description: `Payment-Lösungen für ${p.name}: Beste PSPs (${p.topPSPs.join(', ')}), Gebührenvergleich und Checkout-Optimierung.`,
    openGraph: { title: `${p.name} Payment-Integration`, description: `Die besten PSPs für ${p.name} im Vergleich.` },
  }
}

export default async function PlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform: slug } = await params
  const p = getPlatformBySlug(slug)
  if (!p) notFound()

  return (
    <>
      <FAQSchema faqs={p.faq} />
      <BreadcrumbSchema items={[
        { name: 'Start', url: 'https://icom-group.net' },
        { name: 'E-Commerce Payment', url: 'https://icom-group.net/ecommerce-payment' },
        { name: p.name, url: `https://icom-group.net/ecommerce-payment/${p.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">{p.name} Payment</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-icom-accent" />
          <span className="text-xs text-icom-gray">{p.type}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Payment-Lösungen für
          <span className="text-icom-accent"> {p.name}</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-8">
          Die besten Payment Service Provider für {p.name}: {p.topPSPs.join(', ')}.
          Durchschnittliche Gebühren: {p.avgFee}% pro EU-Kartentransaktion.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-xl mb-8">
          <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-icom-accent">{p.avgFee}%</div>
            <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Ø Gebühr</div>
          </div>
          <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{p.topPSPs.length}</div>
            <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Top PSPs</div>
          </div>
          <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">25%</div>
            <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Ø Einsparung</div>
          </div>
        </div>
      </section>

      {/* Top PSPs */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Empfohlene PSPs für {p.name}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {p.topPSPs.map((pspName, i) => (
              <div key={i} className="bg-icom-card border border-icom-border rounded-xl p-6">
                <div className="w-10 h-10 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-icom-accent font-bold text-sm">#{i + 1}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{pspName}</h3>
                <p className="text-sm text-icom-gray leading-relaxed">
                  {i === 0 ? `Unsere Top-Empfehlung für ${p.name}. Beste Integration und Funktionsumfang.` :
                   i === 1 ? `Starke Alternative mit gutem Preis-Leistungs-Verhältnis für ${p.name}.` :
                   `Dritte Option für spezifische Anforderungen und als Backup-PSP.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Payment-Integration bei {p.name}</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              {p.name} ist eine der beliebtesten {p.type}-Lösungen im deutschsprachigen Raum.
              Die Wahl des richtigen Payment Service Providers hat direkten Einfluss auf Ihre
              Conversion-Rate, Kundenzufriedenheit und Profitabilität.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Bei der PSP-Auswahl für {p.name} sollten Sie folgende Kriterien berücksichtigen:
              Gebührenstruktur, verfügbare Zahlungsarten, Qualität des {p.name}-Plugins,
              Support-Qualität und PCI-DSS-Compliance.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Die iCOM Group hat über 500 {p.name}-Shops bei der Payment-Optimierung begleitet.
              Wir kennen die spezifischen Herausforderungen und empfehlen die optimale Lösung
              basierend auf Ihrem Geschäftsmodell.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Checkout-Optimierung für {p.name}</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Die Checkout-Optimierung ist bei {p.name} ein entscheidender Hebel für mehr Umsatz.
              Studien zeigen: Bis zu 70% der Warenkörbe werden abgebrochen – oft wegen eines
              umständlichen Zahlungsprozesses.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Wichtige Optimierungsmaßnahmen für {p.name}: Express-Checkout (Apple Pay, Google Pay),
              lokale Zahlungsarten (Klarna, giropay, SEPA), One-Click-Payment für Bestandskunden
              und mobile-optimierte Zahlungsformulare.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Die durchschnittliche Gebührenquote bei {p.name} liegt bei {p.avgFee}% pro Transaktion.
              Durch Verhandlung und PSP-Optimierung lässt sich diese Rate um 15–30% senken –
              bei gleichbleibender oder besserer Conversion.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Häufige Fragen: Payment für {p.name}
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

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {p.name}-Payment optimieren
          </h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Kostenlose Analyse für Ihren {p.name}-Shop. PSP-Vergleich, Gebührenoptimierung und Checkout-Beratung.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors"
          >
            Jetzt Analyse anfordern →
          </Link>
        </div>
      </section>
    </>
  )
}
