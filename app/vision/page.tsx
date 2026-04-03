import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vision – Über die iCOM Group | iCOM Group',
  description: 'Die Vision der iCOM Group: Transparente, faire Payment-Lösungen für jedes Unternehmen. Über 10 Jahre Erfahrung, 4.000+ Kunden.',
}

export default function VisionPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Vision</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-icom-accent" />
          <span className="text-xs text-icom-gray">Über uns</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Unsere <span className="text-icom-accent">Vision</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-16">
          Jedes Unternehmen verdient transparente, faire Payment-Konditionen.
          Wir machen die komplexe Welt der Zahlungsabwicklung verständlich und optimierbar.
        </p>
      </section>

      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '10+', label: 'Jahre Erfahrung', desc: 'Seit über einem Jahrzehnt beraten wir Unternehmen zu Payment-Optimierung.' },
              { stat: '4.000+', label: 'Kunden', desc: 'Vom Einzelunternehmer bis zum Enterprise – wir kennen jede Anforderung.' },
              { stat: '500+', label: 'Projekte', desc: 'PSP-Migrationen, Checkout-Optimierungen und Kostenanalysen.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-icom-accent mb-2">{item.stat}</div>
                <div className="text-white font-semibold mb-2">{item.label}</div>
                <p className="text-sm text-icom-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Wer wir sind</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Die Intelligent Commerce Group S.a.r.l. (iCOM Group) ist ein unabhängiger
              Payment-Beratungsdienstleister mit Sitz in Grevenmacher, Luxemburg. Wir
              beraten Unternehmen in Deutschland, Österreich und der Schweiz zu allen
              Aspekten der Zahlungsabwicklung.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Unsere Unabhängigkeit ist unser größter Vorteil: Wir sind an keinen PSP
              gebunden und empfehlen immer die Lösung, die für unsere Kunden am besten
              passt – nicht die, die uns die höchste Provision zahlt.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Mit Partnern wie Unzer, vobapay und secupay haben wir Zugang zu exklusiven
              Konditionen, die wir direkt an unsere Kunden weitergeben.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Was uns antreibt</h2>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Die Payment-Branche ist komplex und oft intransparent. Viele Unternehmen
              zahlen zu viel, weil sie die Gebührenstrukturen nicht durchschauen oder
              weil sie seit Jahren denselben Vertrag nutzen.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed mb-4">
              Unser Ziel: Jedes Unternehmen soll genau wissen, was es für Payment zahlt
              und warum. Transparenz schafft Vertrauen und ermöglicht fundierte
              Entscheidungen.
            </p>
            <p className="text-sm text-icom-gray leading-relaxed">
              Wir glauben daran, dass faire Konditionen kein Privileg für Großkonzerne
              sein sollten. Auch ein Bäcker mit 8.000€ Monatsumsatz verdient eine
              professionelle Payment-Beratung.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-icom-card border border-icom-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Lassen Sie uns sprechen</h2>
          <p className="text-icom-gray mb-6 max-w-lg mx-auto">
            Kostenlose Erstanalyse – wir zeigen Ihnen Ihr Einsparpotenzial.
          </p>
          <Link href="/kontakt" className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors">
            Kontakt aufnehmen →
          </Link>
        </div>
      </section>
    </>
  )
}
