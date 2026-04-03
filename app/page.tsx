import ParticleCanvas from '@/components/ui/ParticleCanvas'
import CountUp from '@/components/ui/CountUp'
import PaymentFlow from '@/components/ui/PaymentFlow'
import PaymentRechner from '@/components/tools/PaymentRechner'
import PSPBars from '@/components/ui/PSPBars'
import { OrganizationSchema } from '@/components/seo/SchemaMarkup'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <ParticleCanvas />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 bg-icom-card border border-icom-border rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-icom-accent animate-pulse-slow" />
            <span className="text-xs text-icom-gray">Payment-Beratung seit 2014</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            Payment-Kosten senken.<br />
            <span className="text-icom-accent">Intelligent.</span>
          </h1>
          <p className="text-lg text-icom-gray max-w-2xl mb-8">
            Unabhängige Beratung für PSP-Auswahl, Gebührenoptimierung und digitale Zahlungslösungen.
            Wir analysieren, vergleichen und verhandeln – damit Sie weniger zahlen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/kontakt"
              className="bg-icom-accent hover:bg-icom-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Kostenlose Analyse anfordern →
            </Link>
            <Link
              href="/tools/payment-kosten-rechner"
              className="border border-white/30 hover:border-icom-accent text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Payment-Rechner starten
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-icom-border bg-icom-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-icom-accent">
                <CountUp target={10} suffix="+" />
              </div>
              <div className="text-sm text-icom-muted mt-1">Jahre Erfahrung</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-icom-accent">
                <CountUp target={4000} suffix="+" />
              </div>
              <div className="text-sm text-icom-muted mt-1">Kunden beraten</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-icom-accent">
                <CountUp target={500} suffix="+" />
              </div>
              <div className="text-sm text-icom-muted mt-1">Projekte umgesetzt</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Unsere Lösungen</h2>
          <p className="text-icom-gray max-w-2xl mx-auto">
            Von der PSP-Auswahl bis zur Implementierung – wir begleiten Sie durch den gesamten Payment-Prozess.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Payment Solutions',
              desc: 'PSP-Auswahl, Vertragsverhandlung und Gebührenoptimierung für stationären und Online-Handel.',
              icon: (
                <svg width="24" height="24" fill="none" stroke="#F05252" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              ),
            },
            {
              title: 'Online Payments',
              desc: 'E-Commerce-Integration, Checkout-Optimierung und internationale Zahlungsarten für Ihren Online-Shop.',
              icon: (
                <svg width="24" height="24" fill="none" stroke="#F05252" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              ),
            },
            {
              title: 'Kosten optimieren',
              desc: 'Interchange++-Analyse, PSP-Benchmarking und laufende Kostenüberwachung für maximale Einsparungen.',
              icon: (
                <svg width="24" height="24" fill="none" stroke="#F05252" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              ),
            },
          ].map(service => (
            <div
              key={service.title}
              className="bg-icom-card border border-icom-border rounded-xl p-6 hover:border-icom-border-light transition-colors"
            >
              <div className="w-12 h-12 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-icom-gray leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zahlungsflow-Diagramm */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Eine Kartenzahlung in 1,8 Sekunden
            </h2>
            <p className="text-icom-gray max-w-2xl mx-auto">
              So fließt Geld vom Karteninhaber zu Ihrem Konto – und wo wir Kosten sparen.
            </p>
          </div>
          <PaymentFlow />
        </div>
      </section>

      {/* Payment-Rechner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Payment-Kosten berechnen
            </h2>
            <p className="text-icom-gray mb-8">
              Finden Sie in 30 Sekunden heraus, wie viel Sie jährlich an Payment-Gebühren sparen können.
            </p>
            <div className="space-y-6">
              {[
                { step: '01', label: 'Umsatz eingeben', desc: 'Monatlichen Kartenumsatz einstellen' },
                { step: '02', label: 'PSP auswählen', desc: 'Aktuellen Payment-Anbieter wählen' },
                { step: '03', label: 'Ergebnis sehen', desc: 'Sofort Einsparpotenzial erfahren' },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center text-icom-accent text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-sm text-icom-muted">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PaymentRechner />
        </div>
      </section>

      {/* PSP-Vergleich */}
      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                PSP-Gebühren im Vergleich
              </h2>
              <p className="text-icom-gray max-w-xl">
                Effektive Kosten pro 100 € EU-Kartenzahlung bei den wichtigsten Anbietern.
              </p>
            </div>
            <Link
              href="/tools/psp-vergleich"
              className="mt-4 md:mt-0 text-icom-accent hover:text-icom-accent-hover text-sm font-medium transition-colors"
            >
              Detailvergleich öffnen →
            </Link>
          </div>
          <PSPBars />
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Messbare Ergebnisse</h2>
          <p className="text-icom-gray max-w-2xl mx-auto">
            Unsere Kunden sparen durchschnittlich 25 % ihrer Payment-Kosten ein.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { metric: '−52%', label: 'No-Show-Rate', company: 'Boutique-Hotel, München', quote: 'Durch paybyMail und Pre-Auth konnten wir No-Shows halbieren.' },
            { metric: '−34%', label: 'Payment-Kosten', company: 'Online-Shop, Berlin', quote: 'Der Wechsel zu Interchange++ hat sich vom ersten Monat an gerechnet.' },
            { metric: '+28%', label: 'Conversion-Rate', company: 'SaaS-Startup, Hamburg', quote: 'Lokale Zahlungsarten und optimierter Checkout haben den Unterschied gemacht.' },
          ].map(item => (
            <div
              key={item.label}
              className="bg-icom-card border border-icom-border rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-icom-accent mb-1">{item.metric}</div>
              <div className="text-sm text-icom-muted mb-4">{item.label}</div>
              <p className="text-sm text-icom-gray leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</p>
              <div className="text-xs text-icom-dark">{item.company}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Partner-Logos */}
      <section className="border-y border-icom-border bg-icom-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <p className="text-sm text-icom-dark uppercase tracking-wider">Unsere Partner</p>
          </div>
          <div className="flex justify-center items-center gap-12 md:gap-20 flex-wrap">
            {['Unzer', 'vobapay', 'secupay'].map(partner => (
              <div key={partner} className="text-xl font-bold text-icom-muted/50">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-icom-card border border-icom-border rounded-2xl p-12 md:p-16 text-center overflow-hidden">
          {/* Konzentrische Ringe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full border border-icom-accent/5" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-icom-accent/10" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-icom-accent/15" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bereit, Payment-Kosten zu senken?
            </h2>
            <p className="text-icom-gray max-w-xl mx-auto mb-8">
              Kostenlose Erstanalyse in 48 Stunden. Kein Risiko, keine versteckten Kosten.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/kontakt"
                className="bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors"
              >
                Jetzt Analyse anfordern →
              </Link>
              <Link
                href="/tools/payment-kosten-rechner"
                className="border border-white/30 hover:border-icom-accent text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors"
              >
                Erst selbst rechnen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
