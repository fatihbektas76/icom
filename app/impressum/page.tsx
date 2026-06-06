import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum | iCOM Group',
  description: 'Impressum der Intelligent Commerce Group S.a.r.l. – Angaben gemäß gesetzlicher Vorschriften.',
}

const IconLocation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const IconRegister = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </svg>
)

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

interface InfoCardProps {
  icon: React.ReactNode
  label: string
  title: string
  children: React.ReactNode
}

function InfoCard({ icon, label, title, children }: InfoCardProps) {
  return (
    <div className="bg-icom-card border border-icom-border rounded-xl p-7 hover:border-icom-border-light transition-colors">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-icom-accent/10 text-icom-accent flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[11px] uppercase tracking-[0.18em] text-icom-dark">{label}</span>
      </div>
      <h2 className="text-base font-semibold text-white mb-3">{title}</h2>
      <div className="text-sm text-icom-gray leading-relaxed">{children}</div>
    </div>
  )
}

export default function ImpressumPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Impressum</span>
        </nav>
      </div>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-icom-border bg-icom-card-dark mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-icom-accent" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-icom-gray">Rechtliche Angaben</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Impressum</h1>
        <p className="text-icom-gray max-w-2xl leading-relaxed">
          Angaben gemäß § 5 TMG sowie Art. 6 Loi du 2 août 2002 relative à la protection
          des personnes à l’égard du traitement des données à caractère personnel.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid sm:grid-cols-2 gap-4">
          <InfoCard icon={<IconLocation />} label="Anbieter" title="Intelligent Commerce Group S.a.r.l.">
            <p>
              1 Place du Marché<br />
              L-6755 Grevenmacher<br />
              Luxemburg
            </p>
          </InfoCard>

          <InfoCard icon={<IconPhone />} label="Kontakt" title="Direkter Draht">
            <p>
              Telefon: <a href="tel:+4915152820216" className="text-white hover:text-icom-accent transition-colors">+49 (0) 1515 282 021 6</a><br />
              E-Mail: <a href="mailto:info@icom-group.net" className="text-white hover:text-icom-accent transition-colors">info@icom-group.net</a><br />
              Web: <a href="https://icom-group.net" className="text-white hover:text-icom-accent transition-colors">icom-group.net</a>
            </p>
          </InfoCard>

          <InfoCard icon={<IconRegister />} label="Register" title="Handelsregister">
            <p>
              Registre de Commerce et des Sociétés, Luxembourg<br />
              Rechtsform: Société à responsabilité limitée (S.a.r.l.)
            </p>
          </InfoCard>

          <InfoCard icon={<IconUser />} label="Verantwortlich" title="Inhalt nach § 18 Abs. 2 MStV">
            <p>
              Intelligent Commerce Group S.a.r.l.<br />
              1 Place du Marché<br />
              L-6755 Grevenmacher, Luxemburg
            </p>
          </InfoCard>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-icom-card-dark border border-icom-border rounded-xl p-8 sm:p-10">
          <h2 className="text-lg font-semibold text-white mb-6">Haftungshinweise</h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm text-icom-gray leading-relaxed">
            <div>
              <h3 className="text-white font-medium mb-2">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet,
                übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Die
                Verpflichtung zur Entfernung oder Sperrung der Nutzung von Informationen
                nach den allgemeinen Gesetzen bleibt hiervon unberührt.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
                wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets
                der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Eine
                permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
              </p>
            </div>

            <div className="md:col-span-2 pt-2">
              <h3 className="text-white font-medium mb-2">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und
                jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                der schriftlichen Zustimmung der Intelligent Commerce Group S.a.r.l.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-icom-dark text-center mt-8">
          Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
        </p>
      </section>
    </>
  )
}
