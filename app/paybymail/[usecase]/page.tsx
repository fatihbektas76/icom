import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { usecases, getUseCaseBySlug } from '@/lib/data/usecases'
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup'

export function generateStaticParams() {
  return usecases.map(u => ({ usecase: u.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ usecase: string }> }): Promise<Metadata> {
  const { usecase: slug } = await params
  const u = getUseCaseBySlug(slug)
  if (!u) return {}
  return {
    title: `${u.name} – Zahlungslink-Lösung | iCOM Group`,
    description: u.description,
    openGraph: { title: u.name, description: u.description },
  }
}

export default async function UseCasePage({ params }: { params: Promise<{ usecase: string }> }) {
  const { usecase: slug } = await params
  const u = getUseCaseBySlug(slug)
  if (!u) notFound()

  return (
    <>
      <FAQSchema faqs={u.faq} />
      <BreadcrumbSchema items={[
        { name: 'Start', url: 'https://icom-group.net' },
        { name: 'paybyMail', url: 'https://icom-group.net/paybymail' },
        { name: u.name, url: `https://icom-group.net/paybymail/${u.slug}` },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">{u.name}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-icom-accent" />
          <span className="text-xs text-icom-gray">paybyMail</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          <span className="text-icom-accent">{u.name}</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-8">{u.description}</p>
      </section>

      {/* Wie funktioniert es */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">So funktioniert paybyMail</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Betrag eingeben', desc: 'Im PSP-Dashboard den Zahlungsbetrag und eine Beschreibung eingeben.' },
              { step: '02', title: 'Link versenden', desc: 'Zahlungslink per E-Mail oder SMS an den Kunden senden.' },
              { step: '03', title: 'Kunde zahlt', desc: 'Kunde klickt den Link und zahlt sicher per Kreditkarte oder Lastschrift.' },
              { step: '04', title: 'Geld erhalten', desc: 'Auszahlung in 1–3 Werktagen auf Ihr Geschäftskonto.' },
            ].map((item, i) => (
              <div key={i} className="bg-icom-card border border-icom-border rounded-xl p-6">
                <div className="w-10 h-10 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-icom-accent font-bold text-sm">{item.step}</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">{u.name}: Vorteile und Einsatz</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              {u.description} paybyMail ermöglicht es, Zahlungen ohne physisches Terminal oder
              Online-Shop zu akzeptieren. Ein sicherer Zahlungslink wird per E-Mail oder SMS
              an den Kunden gesendet – die Zahlung erfolgt auf einer gehosteten Payment Page
              des PSP.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Die Vorteile von paybyMail sind vielfältig: Keine Hardware-Investition, PCI-DSS-konform
              ohne eigene Zertifizierung, flexible Einsatzmöglichkeiten und schnelle Zahlungseingänge.
              Die Gebühren entsprechen den normalen Kreditkartengebühren ohne Aufschlag.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Besonders für Branchen ohne festen Checkout-Punkt – wie Handwerk, Dienstleister,
              Hotels und Arztpraxen – ist paybyMail die ideale Zahlungslösung. Die iCOM Group
              implementiert paybyMail-Lösungen in wenigen Tagen.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Sicherheit und Compliance</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              paybyMail-Zahlungen sind vollständig PCI-DSS-konform. Die Kartendaten werden
              ausschließlich auf der gehosteten Payment Page des PSP eingegeben – Ihr Unternehmen
              hat zu keinem Zeitpunkt Kontakt mit sensiblen Zahlungsdaten.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Alle Zahlungen werden per 3D Secure (SCA) authentifiziert, was das Betrugsrisiko
              minimiert und den Liability Shift zum Kartenausgeber verschiebt. Das bedeutet:
              Bei authentifizierten Zahlungen haftet nicht der Händler für Betrug.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Die DSGVO-Konformität wird durch die Nutzung europäischer PSPs sichergestellt.
              Keine personenbezogenen Daten werden an Drittländer übertragen. Die
              Zahlungsseiten können mit Ihrem Branding versehen werden.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Häufige Fragen: {u.name}
          </h2>
          <div className="space-y-4">
            {u.faq.map((faq, i) => (
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
          <h2 className="text-2xl font-bold text-white mb-4">paybyMail jetzt einrichten</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            In wenigen Tagen einsatzbereit. Kostenlose Beratung und PSP-Auswahl durch die iCOM Group.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Jetzt starten →
          </Link>
        </div>
      </section>
    </>
  )
}
