import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kontakt – Payment-Beratung anfragen | iCOM Group',
  description: 'Kontaktieren Sie die iCOM Group für eine kostenlose Payment-Analyse. Telefon, E-Mail oder Kontaktformular.',
}

export default function KontaktPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Kontakt</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          Kostenlose <span className="text-icom-accent">Beratung</span> anfragen
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-12">
          Innerhalb von 48 Stunden erhalten Sie eine erste Einschätzung Ihres
          Einsparpotenzials. Unverbindlich und kostenlos.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-icom-card border border-icom-border rounded-xl p-8">
            <form className="space-y-5">
              <div>
                <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Name *</label>
                <input type="text" required className="w-full bg-icom-black border border-icom-border rounded-md px-4 py-3 text-white text-sm outline-none focus:border-icom-accent transition-colors" placeholder="Ihr Name" />
              </div>
              <div>
                <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">E-Mail *</label>
                <input type="email" required className="w-full bg-icom-black border border-icom-border rounded-md px-4 py-3 text-white text-sm outline-none focus:border-icom-accent transition-colors" placeholder="ihre@email.de" />
              </div>
              <div>
                <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Unternehmen</label>
                <input type="text" className="w-full bg-icom-black border border-icom-border rounded-md px-4 py-3 text-white text-sm outline-none focus:border-icom-accent transition-colors" placeholder="Firmenname" />
              </div>
              <div>
                <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Monatl. Kartenumsatz (ca.)</label>
                <select className="w-full bg-icom-black border border-icom-border rounded-md px-4 py-3 text-icom-gray text-sm outline-none focus:border-icom-accent transition-colors">
                  <option>Unter 10.000 €</option>
                  <option>10.000 – 50.000 €</option>
                  <option>50.000 – 200.000 €</option>
                  <option>200.000 – 500.000 €</option>
                  <option>Über 500.000 €</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-icom-dark uppercase tracking-wider mb-2">Nachricht</label>
                <textarea rows={4} className="w-full bg-icom-black border border-icom-border rounded-md px-4 py-3 text-white text-sm outline-none focus:border-icom-accent transition-colors resize-none" placeholder="Wie können wir Ihnen helfen?" />
              </div>
              <button type="submit" className="w-full bg-icom-accent hover:bg-icom-accent-hover text-white rounded-lg py-3.5 text-sm font-medium transition-colors">
                Anfrage senden →
              </button>
              <p className="text-[11px] text-icom-dark text-center">
                Ihre Daten werden vertraulich behandelt. Keine Weitergabe an Dritte.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-icom-card border border-icom-border rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Telefon</h3>
              <a href="tel:+4915152820216" className="text-icom-accent hover:text-icom-accent-hover transition-colors">
                +49 (0) 1515 282 021 6
              </a>
              <p className="text-xs text-icom-dark mt-1">Mo–Fr, 9:00–18:00 Uhr</p>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Adresse</h3>
              <p className="text-sm text-icom-gray">
                Intelligent Commerce Group S.a.r.l.<br />
                1 Place du Marché<br />
                L-6755 Grevenmacher<br />
                Luxemburg
              </p>
            </div>
            <div className="bg-icom-card border border-icom-border rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Unser Prozess</h3>
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Kostenlose Erstanalyse (48h)' },
                  { step: '2', text: 'PSP-Vergleich mit Ihren Daten' },
                  { step: '3', text: 'Konkrete Empfehlung & Einsparrechnung' },
                  { step: '4', text: 'Implementierung & Migration' },
                ].map(item => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-icom-accent/10 border border-icom-accent/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-icom-accent text-xs font-bold">{item.step}</span>
                    </div>
                    <span className="text-sm text-icom-gray">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
