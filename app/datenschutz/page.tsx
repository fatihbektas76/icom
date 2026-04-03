import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | iCOM Group',
  description: 'Datenschutzerklärung der Intelligent Commerce Group S.a.r.l. – Informationen zum Umgang mit personenbezogenen Daten.',
}

export default function DatenschutzPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">Datenschutz</span>
        </nav>
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-white mb-8">Datenschutzerklärung</h1>

        <div className="space-y-8 text-sm text-icom-gray leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">1. Verantwortlicher</h2>
            <p>
              Intelligent Commerce Group S.a.r.l.<br />
              1 Place du Marché<br />
              L-6755 Grevenmacher, Luxemburg<br />
              E-Mail: info@icom-group.net<br />
              Telefon: +49 (0) 1515 282 021 6
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">2. Erhebung und Speicherung personenbezogener Daten</h2>
            <p className="mb-3">
              Beim Besuch unserer Website werden automatisch Informationen durch den Browser
              übermittelt und in Server-Log-Files gespeichert: Browsertyp und -version,
              verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners,
              Uhrzeit der Serveranfrage und IP-Adresse.
            </p>
            <p>
              Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung
              dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">3. Kontaktformular</h2>
            <p>
              Bei Nutzung des Kontaktformulars werden die eingegebenen Daten (Name, E-Mail,
              Unternehmen, Nachricht) zum Zweck der Bearbeitung der Anfrage bei uns gespeichert.
              Die Daten werden nicht an Dritte weitergegeben. Die Verarbeitung erfolgt auf
              Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">4. Google Analytics</h2>
            <p>
              Diese Website nutzt Google Analytics, einen Webanalysedienst der Google LLC.
              Google Analytics verwendet Cookies. Die durch den Cookie erzeugten Informationen
              über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google
              in den USA übertragen und dort gespeichert. Wir haben die IP-Anonymisierung
              aktiviert, sodass Ihre IP-Adresse innerhalb der EU gekürzt wird.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">5. Cookies</h2>
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem
              Endgerät gespeichert werden. Einige Cookies sind technisch notwendig (Session-Cookies),
              andere dienen der Analyse (Google Analytics). Sie können Ihren Browser so einstellen,
              dass keine Cookies gespeichert werden.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">6. Ihre Rechte</h2>
            <p className="mb-3">Sie haben folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">7. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc. gehostet. Die Server befinden sich in der EU
              (Frankfurt). Vercel verarbeitet Daten im Auftrag und ist vertraglich zur Einhaltung
              der DSGVO verpflichtet.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">8. Aktualität</h2>
            <p>
              Diese Datenschutzerklärung wurde zuletzt im April 2025 aktualisiert. Wir behalten
              uns vor, diese Erklärung anzupassen, damit sie stets den aktuellen rechtlichen
              Anforderungen entspricht.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
