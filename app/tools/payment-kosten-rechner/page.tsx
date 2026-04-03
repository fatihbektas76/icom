import { Metadata } from 'next'
import Link from 'next/link'
import PaymentRechner from '@/components/tools/PaymentRechner'
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Payment-Kosten-Rechner – Gebühren berechnen | iCOM Group',
  description: 'Berechnen Sie Ihre Payment-Kosten und Einsparpotenzial. Vergleichen Sie Stripe, PayPal, Mollie und SumUp.',
}

export default function PaymentKostenRechnerPage() {
  const faqs = [
    { q: 'Wie berechnen sich Payment-Kosten?', a: 'Payment-Kosten setzen sich aus Transaktionsgebühren (%-Satz + Fixbetrag), monatlichen Gebühren und ggf. Setup-Kosten zusammen.' },
    { q: 'Was ist eine gute MDR?', a: 'Eine gute MDR liegt bei 1,2–1,8% für EU-Karten. Bei hohem Volumen (ab 200k€/Monat) sind unter 1% möglich.' },
    { q: 'Wie viel kann ich sparen?', a: 'Durchschnittlich 20–30% durch PSP-Wechsel oder Tarifoptimierung. Bei 80.000€ Monatsumsatz sind das 2.000–4.000€ jährlich.' },
    { q: 'Ist der Rechner verbindlich?', a: 'Nein – der Rechner gibt eine Schätzung. Für eine verbindliche Analyse mit Ihren echten Daten kontaktieren Sie uns.' },
    { q: 'Welche Kosten sind nicht enthalten?', a: 'Setup-Gebühren, Chargeback-Gebühren, Währungsumrechnungskosten und eventuelle PCI-DSS-Kosten.' },
  ]

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Start', url: 'https://icom-group.net' },
        { name: 'Tools', url: 'https://icom-group.net/tools' },
        { name: 'Payment-Kosten-Rechner', url: 'https://icom-group.net/tools/payment-kosten-rechner' },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Payment-Kosten-Rechner</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Payment-Kosten-<span className="text-icom-accent">Rechner</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-12">
          Berechnen Sie Ihre aktuellen Payment-Kosten und sehen Sie, wie viel Sie mit
          optimierten Konditionen sparen können.
        </p>
        <div className="max-w-lg">
          <PaymentRechner />
        </div>
      </section>

      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Häufige Fragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-icom-card border border-icom-border rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                <p className="text-sm text-icom-gray leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
