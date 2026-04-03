import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { pspKombinationen, getVergleichBySlug } from '@/lib/data/psp-kombinationen'
import { pspAnbieter, getPSPBySlug } from '@/lib/data/psp-anbieter'
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup'

export function generateStaticParams() {
  return pspKombinationen.map(v => ({ vergleich: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ vergleich: string }> }): Promise<Metadata> {
  const { vergleich: slug } = await params
  const v = getVergleichBySlug(slug)
  if (!v) return {}
  return {
    title: `${v.title} – PSP-Vergleich 2025 | iCOM Group`,
    description: v.description,
    openGraph: { title: v.title, description: v.description },
  }
}

export default async function VergleichPage({ params }: { params: Promise<{ vergleich: string }> }) {
  const { vergleich: slug } = await params
  const v = getVergleichBySlug(slug)
  if (!v) notFound()

  const psp1 = getPSPBySlug(v.psp1)
  const psp2 = getPSPBySlug(v.psp2)

  const faqs = [
    { q: `Was ist günstiger: ${v.title.split(' vs. ').join(' oder ')}?`, a: `Das hängt vom Transaktionsvolumen ab. Bei niedrigem Volumen sind Flat-Rate-Modelle oft einfacher, bei hohem Volumen lohnt sich Interchange++. Die iCOM Group berechnet Ihr individuelles Einsparpotenzial.` },
    { q: `Kann ich beide PSPs parallel nutzen?`, a: `Ja – viele Shops nutzen mehrere PSPs parallel, z.B. einen für Kartenzahlungen und einen für alternative Zahlungsarten. Das erhöht die Flexibilität und Conversion.` },
    { q: `Wie wechsle ich den PSP?`, a: `Ein PSP-Wechsel dauert 2–6 Wochen. Die iCOM Group begleitet den gesamten Prozess: Vertragsverhandlung, technische Migration und Testphase.` },
    { q: `Welcher PSP hat den besseren Support?`, a: `${psp1?.name || v.psp1} und ${psp2?.name || v.psp2} bieten unterschiedliche Support-Modelle. Enterprise-PSPs wie Adyen bieten dedizierte Account Manager, Self-Service-PSPs wie Stripe setzen auf Dokumentation.` },
    { q: `Ab welchem Umsatz lohnt sich ein Wechsel?`, a: `Ab ca. 10.000€ monatlichem Kartenumsatz lohnt sich ein PSP-Vergleich. Ab 50.000€ kann ein Wechsel zu Interchange++ mehrere tausend Euro jährlich sparen.` },
  ]

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Start', url: 'https://icom-group.net' },
        { name: 'PSP-Vergleich', url: 'https://icom-group.net/psp-vergleich' },
        { name: v.title, url: `https://icom-group.net/psp-vergleich/${v.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <Link href="/tools/psp-vergleich" className="hover:text-white transition-colors">PSP-Vergleich</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">{v.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-icom-accent" />
          <span className="text-xs text-icom-gray">PSP-Vergleich 2025</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          {v.title.split(' vs. ')[0]}
          <span className="text-icom-accent"> vs. </span>
          {v.title.split(' vs. ')[1]}
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-8">{v.description}</p>
      </section>

      {/* Vergleichstabelle */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Gebühren & Features im Vergleich</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-icom-border">
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">Kriterium</th>
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">{psp1?.name || v.psp1}</th>
                  <th className="text-left py-3 px-4 text-icom-dark font-medium">{psp2?.name || v.psp2}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Preismodell', v1: psp1?.model || '–', v2: psp2?.model || '–' },
                  { label: 'EU-Karte', v1: psp1?.euRate ? `${psp1.euRate}%${psp1.extraFee ? ` + ${psp1.extraFee}€` : ''}` : 'Individuell', v2: psp2?.euRate ? `${psp2.euRate}%${psp2.extraFee ? ` + ${psp2.extraFee}€` : ''}` : 'Individuell' },
                  { label: 'Non-EU-Karte', v1: psp1?.nonEURate ? `${psp1.nonEURate}%` : 'Individuell', v2: psp2?.nonEURate ? `${psp2.nonEURate}%` : 'Individuell' },
                  { label: 'Monatliche Gebühr', v1: psp1?.monthly === 0 ? 'Keine' : `${psp1?.monthly}€`, v2: psp2?.monthly === 0 ? 'Keine' : `${psp2?.monthly}€` },
                  { label: 'Ideal für', v1: psp1?.bestFor.join(', ') || '–', v2: psp2?.bestFor.join(', ') || '–' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-icom-border/50">
                    <td className="py-3 px-4 text-icom-muted font-medium">{row.label}</td>
                    <td className="py-3 px-4 text-icom-gray">{row.v1}</td>
                    <td className="py-3 px-4 text-icom-gray">{row.v2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Vorteile Side-by-Side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {[psp1, psp2].map((psp, idx) => psp && (
            <div key={idx} className="bg-icom-card border border-icom-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">{psp.name} – Vorteile</h3>
              <ul className="space-y-2">
                {psp.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-icom-gray">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
              <h4 className="text-sm font-semibold text-icom-muted mt-4 mb-2">Nachteile</h4>
              <ul className="space-y-2">
                {psp.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-icom-gray">
                    <span className="text-icom-accent mt-0.5">✗</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose-sm">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">{v.title}: Welcher PSP passt besser?</h2>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                Die Wahl zwischen {psp1?.name || v.psp1} und {psp2?.name || v.psp2} hängt von mehreren Faktoren ab:
                Transaktionsvolumen, Geschäftsmodell, technische Anforderungen und internationale Ausrichtung.
                Beide PSPs haben ihre Stärken – die Frage ist, welche für Ihr Unternehmen relevanter sind.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                {psp1?.name || v.psp1} punktet besonders mit {psp1?.pros[0]?.toLowerCase() || 'flexiblen Lösungen'}.
                {psp2?.name || v.psp2} überzeugt dagegen durch {psp2?.pros[0]?.toLowerCase() || 'starke Konditionen'}.
                Für viele Unternehmen ist die richtige Wahl nicht schwarz-weiß – oft macht eine Kombination
                beider Anbieter Sinn.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed">
                Die iCOM Group hat beide PSPs in hunderten Projekten implementiert und kennt die
                Praxisunterschiede genau. In unserer kostenlosen Erstanalyse berechnen wir,
                welcher Anbieter bei Ihrem spezifischen Transaktionsmix günstiger ist.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Kosten-Vergleich in der Praxis</h2>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                Bei einem typischen Online-Shop mit 80.000€ monatlichem Kartenumsatz und 70% EU-Karten
                können die Unterschiede zwischen den PSPs schnell 200–500€ pro Monat ausmachen –
                das sind 2.400–6.000€ jährlich.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">
                Neben den reinen Transaktionsgebühren spielen auch Zusatzkosten eine Rolle:
                Chargeback-Gebühren, Auszahlungsgebühren, Währungsumrechnungskosten und
                eventuelle monatliche Fixkosten. Ein ganzheitlicher Vergleich berücksichtigt
                alle diese Faktoren.
              </p>
              <p className="text-sm text-icom-gray leading-relaxed">
                Tipp: Fordern Sie bei beiden Anbietern ein individuelles Angebot an und lassen
                Sie es von der iCOM Group vergleichen. Oft sind verhandelte Konditionen deutlich
                günstiger als die Listenpreise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Häufige Fragen: {v.title}
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
            Individuellen PSP-Vergleich anfordern
          </h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Welcher PSP spart Ihnen am meisten? Kostenlose Analyse mit Ihren echten Transaktionsdaten.
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors"
          >
            Jetzt Vergleich anfordern →
          </Link>
        </div>
      </section>
    </>
  )
}
