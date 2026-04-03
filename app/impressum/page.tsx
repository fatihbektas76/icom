import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum | iCOM Group',
  description: 'Impressum der Intelligent Commerce Group S.a.r.l. – Angaben gemäß gesetzlicher Vorschriften.',
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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-white mb-8">Impressum</h1>

        <div className="space-y-8 text-sm text-icom-gray leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Angaben gemäß § 5 TMG / Art. 6 Loi du 2 août 2002</h2>
            <p>
              Intelligent Commerce Group S.a.r.l.<br />
              1 Place du Marché<br />
              L-6755 Grevenmacher<br />
              Luxemburg
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Kontakt</h2>
            <p>
              Telefon: +49 (0) 1515 282 021 6<br />
              E-Mail: info@icom-group.net<br />
              Website: https://icom-group.net
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Handelsregister</h2>
            <p>
              Registre de Commerce et des Sociétés, Luxembourg<br />
              Rechtsform: Société à responsabilité limitée (S.a.r.l.)
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Verantwortlich für den Inhalt</h2>
            <p>
              Intelligent Commerce Group S.a.r.l.<br />
              1 Place du Marché<br />
              L-6755 Grevenmacher, Luxemburg
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet,
              an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte
              fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen. Die Verpflichtung zur Entfernung oder Sperrung der
              Nutzung von Informationen nach den allgemeinen Gesetzen bleibt hiervon unberührt.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
