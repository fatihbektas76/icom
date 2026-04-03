import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { staedte, getStadtBySlug } from '@/lib/data/staedte'
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup'
import PaymentRechner from '@/components/tools/PaymentRechner'

export function generateStaticParams() {
  return staedte.map(s => ({ stadt: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ stadt: string }> }): Promise<Metadata> {
  const { stadt: slug } = await params
  const s = getStadtBySlug(slug)
  if (!s) return {}
  return {
    title: `Payment-Beratung ${s.name} – PSP-Optimierung | iCOM Group`,
    description: `Payment-Beratung in ${s.name} (${s.state}): PSP-Vergleich, Gebührenoptimierung und digitale Zahlungslösungen für Unternehmen in ${s.name}.`,
    openGraph: {
      title: `Payment-Beratung ${s.name}`,
      description: `Unabhängige Payment-Beratung für Unternehmen in ${s.name}. Kostenlose Erstanalyse.`,
    },
  }
}

export default async function StadtPage({ params }: { params: Promise<{ stadt: string }> }) {
  const { stadt: slug } = await params
  const s = getStadtBySlug(slug)
  if (!s) notFound()

  const unternehmenCount = Math.round(s.population / 15)
  const potentialSaving = Math.round(unternehmenCount * 0.02 * 1200)

  const faqs = [
    { q: `Gibt es Payment-Beratung vor Ort in ${s.name}?`, a: `Ja – die iCOM Group berät Unternehmen in ${s.name} und Umgebung. Erstgespräche finden vor Ort oder per Video statt.` },
    { q: `Wie hoch sind die Payment-Kosten für Unternehmen in ${s.name}?`, a: `Unternehmen in ${s.name} zahlen durchschnittlich 1,5–2,2% MDR. Durch Optimierung sind 15–30% Einsparung möglich.` },
    { q: `Welche Branchen in ${s.name} profitieren am meisten?`, a: `Besonders Hotels, Gastronomie, Einzelhandel und E-Commerce-Unternehmen in ${s.name} haben hohes Einsparpotenzial.` },
    { q: `Wie schnell kann ich in ${s.name} die Payment-Kosten senken?`, a: `Nach der kostenlosen Erstanalyse (48h) kann ein PSP-Wechsel in 2–6 Wochen umgesetzt werden.` },
    { q: `Betreut iCOM Group auch kleine Unternehmen in ${s.name}?`, a: `Ja – unsere Beratung ist für Unternehmen jeder Größe geeignet, ab ca. 5.000€ monatlichem Kartenumsatz.` },
    { q: `Was kostet die Payment-Beratung in ${s.name}?`, a: `Die Erstanalyse ist kostenlos. Unsere Beratung refinanziert sich durch die erzielten Einsparungen.` },
  ]

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Start', url: 'https://icom-group.net' },
        { name: 'Payment-Beratung', url: 'https://icom-group.net/payment-beratung' },
        { name: s.name, url: `https://icom-group.net/payment-beratung/${s.slug}` },
      ]} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Payment-Beratung {s.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-icom-accent" />
              <span className="text-xs text-icom-gray">{s.state}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Payment-Beratung in
              <span className="text-icom-accent"> {s.name}</span>
            </h1>
            <p className="text-lg text-icom-gray mb-8">
              Unabhängige Payment-Beratung für Unternehmen in {s.name} und {s.state}.
              PSP-Vergleich, Gebührenoptimierung und digitale Zahlungslösungen –
              persönlich vor Ort oder per Video.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-icom-accent">{(s.population / 1000).toFixed(0)}k</div>
                <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Einwohner</div>
              </div>
              <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{(unternehmenCount / 1000).toFixed(0)}k</div>
                <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Unternehmen</div>
              </div>
              <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-500">25%</div>
                <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Ø Einsparung</div>
              </div>
            </div>

            <Link
              href="/kontakt"
              className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Kostenlose Beratung in {s.name} →
            </Link>
          </div>
          <PaymentRechner />
        </div>
      </section>

      {/* Leistungen für Stadt */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Unsere Payment-Leistungen in {s.name}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'PSP-Auswahl & Vergleich', desc: `Wir vergleichen alle relevanten Payment Service Provider für Unternehmen in ${s.name} – von Stripe über Adyen bis Unzer.` },
              { title: 'Gebührenoptimierung', desc: `Analyse Ihrer aktuellen Payment-Kosten und Umsetzung konkreter Einsparmaßnahmen. Durchschnittlich 25% weniger Gebühren.` },
              { title: 'POS & E-Commerce', desc: `Komplettlösung für stationären Handel und Online-Shops in ${s.name}. Terminal-Beratung, Checkout-Optimierung und Omnichannel.` },
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
            <h2 className="text-2xl font-bold text-white mb-4">
              Payment-Landschaft in {s.name}
            </h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              {s.name} mit seinen rund {s.population.toLocaleString('de-DE')} Einwohnern ist ein bedeutender Wirtschaftsstandort
              in {s.state}. Geschätzt {unternehmenCount.toLocaleString('de-DE')} Unternehmen sind hier aktiv – vom Einzelhändler
              über Gastronomie bis hin zu E-Commerce und SaaS-Unternehmen.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Die Payment-Kosten variieren je nach Branche und Geschäftsmodell zwischen 1,2% und 2,5% des Kartenumsatzes.
              Besonders in einer wettbewerbsintensiven Stadt wie {s.name} sind optimierte Payment-Kosten ein echter
              Wettbewerbsvorteil. Viele Unternehmen zahlen unnötig hohe Gebühren, weil sie ihren PSP-Vertrag
              nie überprüft haben.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Die iCOM Group berät Unternehmen in {s.name} seit über 10 Jahren zu Payment-Optimierung.
              Unsere unabhängige Beratung umfasst PSP-Vergleich, Vertragsverhandlung und laufende Kostenüberwachung.
              Die Erstanalyse ist kostenlos – wir zeigen Ihnen innerhalb von 48 Stunden, wie viel Sie sparen können.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Branchen-Schwerpunkte in {s.name}
            </h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Jede Branche hat spezifische Payment-Anforderungen. In {s.name} beraten wir besonders häufig:
            </p>
            <div className="space-y-3">
              {[
                { branche: 'Einzelhandel & Gastronomie', desc: 'POS-Terminal-Optimierung, girocard-Konditionen und Trinkgeld-Workflow' },
                { branche: 'Hotels & Tourismus', desc: 'Pre-Auth, paybyMail und internationale Kartenakzeptanz' },
                { branche: 'E-Commerce & SaaS', desc: 'Checkout-Optimierung, Abo-Verwaltung und Multi-Currency' },
                { branche: 'Dienstleister & Freiberufler', desc: 'Mobile Kartenzahlung, paybyMail und digitale Rechnungsstellung' },
              ].map((item, i) => (
                <div key={i} className="bg-icom-card border border-icom-border rounded-lg p-4">
                  <div className="text-white font-medium text-sm">{item.branche}</div>
                  <div className="text-icom-muted text-xs mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gebührenvergleich Tabelle */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            PSP-Gebühren für Unternehmen in {s.name}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-icom-border">
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">PSP</th>
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">EU-Karte</th>
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">Non-EU</th>
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">Modell</th>
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">Ideal für</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Stripe', eu: '1,50% + 0,25€', nonEu: '2,90% + 0,25€', model: 'Flat-Rate', ideal: 'Online-Shops, SaaS' },
                  { name: 'Adyen', eu: '0,11% + 0,12€*', nonEu: 'IC + 0,12€', model: 'Interchange++', ideal: 'Ab 200k€/Monat' },
                  { name: 'Mollie', eu: '1,80% + 0,25€', nonEu: '2,90% + 0,25€', model: 'Flat-Rate', ideal: 'EU-E-Commerce' },
                  { name: 'SumUp', eu: '1,69%', nonEu: '1,69%', model: 'Flat-Rate', ideal: 'Stationärer Handel' },
                  { name: 'PayPal', eu: '1,49% + 0,35€', nonEu: '3,49% + 0,35€', model: 'Flat-Rate', ideal: 'B2C Online' },
                  { name: 'Unzer', eu: 'Individuell', nonEu: 'Individuell', model: 'Verhandelbar', ideal: 'Mittelstand, Hotels' },
                ].map(psp => (
                  <tr key={psp.name} className="border-b border-icom-border/50">
                    <td className="py-3 px-4 text-white font-medium">{psp.name}</td>
                    <td className="py-3 px-4 text-icom-gray">{psp.eu}</td>
                    <td className="py-3 px-4 text-icom-gray">{psp.nonEu}</td>
                    <td className="py-3 px-4 text-icom-gray">{psp.model}</td>
                    <td className="py-3 px-4 text-icom-muted text-xs">{psp.ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-icom-dark mt-3">* Adyen: zusätzlich Interchange Fee + Scheme Fee. Stand 2025.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Häufige Fragen zur Payment-Beratung in {s.name}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-icom-card border border-icom-border rounded-xl p-6">
              <h3 className="text-white font-medium mb-2">{faq.q}</h3>
              <p className="text-sm text-icom-gray leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Payment-Beratung in {s.name} starten
          </h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Kostenlose Erstanalyse für Unternehmen in {s.name}. Persönlich vor Ort oder per Video.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors"
          >
            Jetzt Beratung anfragen →
          </Link>
        </div>
      </section>
    </>
  )
}
