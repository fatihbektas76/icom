import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { branchen, getBrancheBySlug } from '@/lib/data/branchen'
import { pspAnbieter } from '@/lib/data/psp-anbieter'
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup'
import PaymentRechner from '@/components/tools/PaymentRechner'

export function generateStaticParams() {
  return branchen.map(b => ({ branche: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ branche: string }> }): Promise<Metadata> {
  const { branche: slug } = await params
  const b = getBrancheBySlug(slug)
  if (!b) return {}
  return {
    title: `Payment-Kosten ${b.name} – Gebühren senken | iCOM Group`,
    description: `Payment-Kosten für ${b.name}: Ø ${b.avgMDR}% MDR, bis zu ${b.avgSaving}% Einsparpotenzial. PSP-Vergleich und Optimierung für ${b.name}.`,
    openGraph: {
      title: `Payment-Kosten ${b.name} optimieren`,
      description: `${b.name}: Ø ${b.avgMDR}% MDR. Bis zu ${b.avgSaving}% Einsparung möglich.`,
    },
  }
}

export default async function BranchePage({ params }: { params: Promise<{ branche: string }> }) {
  const { branche: slug } = await params
  const b = getBrancheBySlug(slug)
  if (!b) notFound()

  const topPSPs = b.topPSPs.map(s => pspAnbieter.find(p => p.slug === s)).filter(Boolean)
  const annualSaving = Math.round(b.avgMonthlyVolume * (b.avgMDR / 100) * (b.avgSaving / 100) * 12)

  const faqs = b.faq.length > 0 ? b.faq : [
    { q: `Wie hoch sind die Payment-Kosten für ${b.name}?`, a: `${b.name}-Betriebe zahlen durchschnittlich ${b.avgMDR}% MDR (Merchant Discount Rate). Bei einem Monatsumsatz von ${b.avgMonthlyVolume.toLocaleString('de-DE')}€ sind das ${Math.round(b.avgMonthlyVolume * b.avgMDR / 100).toLocaleString('de-DE')}€ pro Monat.` },
    { q: `Welcher PSP eignet sich am besten für ${b.name}?`, a: `Für ${b.name} empfehlen wir ${b.topPSPs.slice(0, 2).join(' oder ')} – abhängig von Ihrem Transaktionsvolumen und Ihren Anforderungen.` },
    { q: `Wie viel kann ein ${b.name} bei Payment-Gebühren sparen?`, a: `Durchschnittlich ${b.avgSaving}% Einsparung sind möglich. Bei ${b.avgMonthlyVolume.toLocaleString('de-DE')}€ Monatsumsatz sind das ca. ${annualSaving.toLocaleString('de-DE')}€ pro Jahr.` },
    { q: `Lohnt sich ein PSP-Wechsel für ${b.name}?`, a: `Ab ca. 5.000€ monatlichem Kartenumsatz lohnt sich eine Überprüfung. Die kostenlose Erstanalyse zeigt das konkrete Einsparpotenzial.` },
    { q: `Wie lange dauert ein PSP-Wechsel für ${b.name}?`, a: `Ein PSP-Wechsel dauert in der Regel 2–6 Wochen. Die iCOM Group begleitet den gesamten Migrationsprozess.` },
    { q: `Brauche ich spezielle Payment-Lösungen für ${b.name}?`, a: `Ja – jede Branche hat spezifische Anforderungen. Wir kennen die besonderen Bedürfnisse von ${b.name}-Betrieben und empfehlen passende Lösungen.` },
  ]

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Start', url: 'https://icom-group.net' },
        { name: 'Payment-Kosten', url: 'https://icom-group.net/payment-kosten' },
        { name: b.name, url: `https://icom-group.net/payment-kosten/${b.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <Link href="/" className="hover:text-white transition-colors">Payment-Kosten</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">{b.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-icom-accent" />
              <span className="text-xs text-icom-gray">Branchenanalyse</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Payment-Kosten für
              <span className="text-icom-accent"> {b.name}</span>
            </h1>
            <p className="text-lg text-icom-gray mb-8">
              {b.name}-Betriebe zahlen durchschnittlich {b.avgMDR}% MDR. Mit der richtigen
              PSP-Strategie sind bis zu {b.avgSaving}% Einsparung möglich – das sind
              ca. {annualSaving.toLocaleString('de-DE')}€ pro Jahr.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-icom-accent">{b.avgMDR}%</div>
                <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Ø MDR</div>
              </div>
              <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{b.avgSaving}%</div>
                <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Einsparpotenzial</div>
              </div>
              <div className="bg-icom-card border border-icom-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{(b.avgMonthlyVolume / 1000).toFixed(0)}k€</div>
                <div className="text-[10px] text-icom-dark uppercase tracking-wider mt-1">Ø Monatsumsatz</div>
              </div>
            </div>

            <Link
              href="/kontakt"
              className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Kostenlose Analyse für {b.name} →
            </Link>
          </div>
          <PaymentRechner />
        </div>
      </section>

      {/* Pain Points */}
      {b.painPoints.length > 0 && (
        <section className="bg-icom-card-dark border-y border-icom-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Typische Payment-Herausforderungen im Bereich {b.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {b.painPoints.map((point, i) => (
                <div key={i} className="bg-icom-card border border-icom-border rounded-xl p-6">
                  <div className="w-10 h-10 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-icom-accent font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-sm text-icom-gray leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PSP Vergleich Tabelle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">
          Empfohlene PSPs für {b.name}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-icom-border">
                <th className="text-left py-3 px-4 text-icom-dark font-medium">PSP</th>
                <th className="text-left py-3 px-4 text-icom-dark font-medium">Modell</th>
                <th className="text-left py-3 px-4 text-icom-dark font-medium">EU-Rate</th>
                <th className="text-left py-3 px-4 text-icom-dark font-medium">Monatlich</th>
                <th className="text-left py-3 px-4 text-icom-dark font-medium">Vorteile</th>
              </tr>
            </thead>
            <tbody>
              {topPSPs.map(psp => psp && (
                <tr key={psp.slug} className="border-b border-icom-border/50">
                  <td className="py-3 px-4 text-white font-medium">{psp.name}</td>
                  <td className="py-3 px-4 text-icom-gray capitalize">{psp.model}</td>
                  <td className="py-3 px-4 text-icom-gray">
                    {psp.euRate ? `${psp.euRate}%${psp.extraFee ? ` + ${psp.extraFee}€` : ''}` : 'Individuell'}
                  </td>
                  <td className="py-3 px-4 text-icom-gray">{psp.monthly === 0 ? 'Keine' : `${psp.monthly}€`}</td>
                  <td className="py-3 px-4 text-icom-muted text-xs">{psp.pros[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Payment-Optimierung für {b.name}
              </h2>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                Die Payment-Landschaft für {b.name}-Betriebe hat sich in den letzten Jahren stark verändert.
                Neue Anbieter, regulatorische Änderungen durch PSD2 und der Trend zu kontaktlosem Bezahlen
                haben die Anforderungen grundlegend gewandelt. Viele {b.name}-Betriebe sitzen noch auf
                Altverträgen mit überhöhten Gebühren.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                Die durchschnittliche Merchant Discount Rate (MDR) im Bereich {b.name} liegt bei {b.avgMDR}%.
                Bei einem typischen Monatsumsatz von {b.avgMonthlyVolume.toLocaleString('de-DE')}€ entspricht
                das monatlichen Payment-Kosten von {Math.round(b.avgMonthlyVolume * b.avgMDR / 100).toLocaleString('de-DE')}€.
                Durch eine gezielte Optimierung – PSP-Wechsel, Tarifanpassung oder Modellwechsel zu
                Interchange++ – lassen sich diese Kosten um durchschnittlich {b.avgSaving}% senken.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed">
                Die iCOM Group berät {b.name}-Betriebe seit über 10 Jahren zu Payment-Strategien.
                Unsere unabhängige Analyse vergleicht alle relevanten PSPs und identifiziert das
                optimale Setup für Ihre spezifischen Anforderungen. Die Erstanalyse ist kostenlos
                und zeigt innerhalb von 48 Stunden Ihr konkretes Einsparpotenzial.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Die richtige PSP-Strategie für {b.name}
              </h2>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                Nicht jeder PSP passt zu jedem {b.name}-Betrieb. Die Wahl hängt von Faktoren wie
                Transaktionsvolumen, internationalem Kundenanteil, benötigten Zahlungsarten und
                Integrationsanforderungen ab.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                Für {b.name}-Betriebe mit weniger als 50.000€ monatlichem Kartenumsatz empfehlen
                sich Flat-Rate-Modelle wie {b.topPSPs[0] || 'Stripe'}. Ab 100.000€ Monatsumsatz
                wird ein Wechsel zu Interchange++ (z.B. über Adyen oder Unzer) zunehmend attraktiv.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                Besonders wichtig für {b.name}: Die Kosten für Non-EU-Karten können das Dreifache
                der EU-Kartengebühren betragen. Wenn Ihr Kundenanteil aus Nicht-EU-Ländern
                signifikant ist, kann die richtige PSP-Wahl mehrere tausend Euro jährlich sparen.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed">
                Neben den reinen Transaktionskosten spielen auch Setup-Gebühren, monatliche
                Fixkosten, Chargebackgebühren und der Auszahlungszyklus eine Rolle. Die iCOM Group
                berücksichtigt alle Kostenfaktoren in der Analyse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Häufige Fragen zu Payment-Kosten für {b.name}
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
            Payment-Kosten für {b.name} optimieren
          </h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Kostenlose Erstanalyse – wir zeigen Ihnen, wie Sie bis zu {b.avgSaving}% Ihrer Payment-Kosten sparen.
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
