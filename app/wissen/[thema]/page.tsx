import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { themen, getThemaBySlug } from '@/lib/data/themen'
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup'

export function generateStaticParams() {
  return themen.map(t => ({ thema: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ thema: string }> }): Promise<Metadata> {
  const { thema: slug } = await params
  const t = getThemaBySlug(slug)
  if (!t) return {}
  return {
    title: `${t.name} – Payment-Wissen | iCOM Group`,
    description: t.description,
    openGraph: { title: t.name, description: t.description },
  }
}

export default async function ThemaPage({ params }: { params: Promise<{ thema: string }> }) {
  const { thema: slug } = await params
  const t = getThemaBySlug(slug)
  if (!t) notFound()

  const paragraphs = t.content.split('\n\n')

  return (
    <>
      <FAQSchema faqs={t.faq} />
      <BreadcrumbSchema items={[
        { name: 'Start', url: 'https://icom-group.net' },
        { name: 'Wissen', url: 'https://icom-group.net/wissen' },
        { name: t.name, url: `https://icom-group.net/wissen/${t.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <Link href="/" className="hover:text-white transition-colors">Wissen</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">{t.name}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-icom-accent" />
          <span className="text-xs text-icom-gray">Payment-Wissen</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          <span className="text-icom-accent">{t.name}</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl">{t.description}</p>
      </section>

      {/* Content */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-sm text-icom-gray leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Zusätzlicher SEO-Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Warum ist das wichtig?</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Das Verständnis von {t.name} ist für jeden Händler und Unternehmer essenziell,
              der Kartenzahlungen akzeptiert. Fehlendes Wissen führt oft zu überhöhten
              Gebühren, Compliance-Risiken oder verpassten Optimierungsmöglichkeiten.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Die Payment-Branche entwickelt sich rasant: Neue Regulierungen, technische
              Standards und Marktveränderungen erfordern kontinuierliche Weiterbildung.
              Die iCOM Group hält Sie auf dem Laufenden und setzt Optimierungen direkt um.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Unser Wissensbereich bietet praxisnahe Erklärungen zu allen relevanten
              Payment-Themen – von Interchange Fees über PCI DSS bis hin zu Chargeback
              Management. Verständlich aufbereitet für Entscheider, nicht nur für Techniker.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">iCOM Group – Ihr Payment-Experte</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Mit über 10 Jahren Erfahrung in der Payment-Beratung kennen wir die
              Herausforderungen und Fallstricke im Detail. Über 4.000 Kunden vertrauen
              auf unsere unabhängige Expertise.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Unsere Beratung geht über theoretisches Wissen hinaus: Wir setzen
              Optimierungsmaßnahmen konkret um, verhandeln Konditionen mit PSPs
              und begleiten technische Migrationen.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Die Erstanalyse ist kostenlos. Innerhalb von 48 Stunden erhalten Sie
              eine konkrete Einschätzung Ihres Einsparpotenzials – basierend auf
              Ihren echten Transaktionsdaten.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Häufige Fragen: {t.name}
          </h2>
          <div className="space-y-4">
            {t.faq.map((faq, i) => (
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
          <h2 className="text-2xl font-bold text-white mb-4">Fragen zu {t.name}?</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Unsere Payment-Experten beraten Sie kostenlos und unverbindlich.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Jetzt Experten fragen →
          </Link>
        </div>
      </section>
    </>
  )
}
