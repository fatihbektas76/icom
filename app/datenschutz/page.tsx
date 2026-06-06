import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | iCOM Group',
  description: 'Datenschutzerklärung der Intelligent Commerce Group S.a.r.l. – Informationen zum Umgang mit personenbezogenen Daten gemäß DSGVO.',
}

interface Section {
  id: string
  number: string
  title: string
}

const sections: Section[] = [
  { id: 'verantwortlicher',  number: '01', title: 'Verantwortlicher' },
  { id: 'grundsaetze',       number: '02', title: 'Grundsätze der Verarbeitung' },
  { id: 'log-files',         number: '03', title: 'Server-Log-Dateien' },
  { id: 'kontakt',           number: '04', title: 'Kontaktformular & E-Mail' },
  { id: 'cookies',           number: '05', title: 'Cookies' },
  { id: 'analytics',         number: '06', title: 'Google Analytics' },
  { id: 'hosting',           number: '07', title: 'Hosting & Auftragsverarbeitung' },
  { id: 'speicherdauer',     number: '08', title: 'Speicherdauer' },
  { id: 'rechte',            number: '09', title: 'Ihre Rechte als betroffene Person' },
  { id: 'beschwerde',        number: '10', title: 'Beschwerderecht bei der Aufsichtsbehörde' },
  { id: 'aktualitaet',       number: '11', title: 'Aktualität dieser Erklärung' },
]

interface RechtCardProps {
  artikel: string
  title: string
  desc: string
}

function RechtCard({ artikel, title, desc }: RechtCardProps) {
  return (
    <div className="bg-icom-black border border-icom-border rounded-lg p-4 hover:border-icom-accent/40 transition-colors">
      <div className="text-[10px] uppercase tracking-wider text-icom-accent font-medium mb-1.5">{artikel}</div>
      <div className="text-sm text-white font-medium mb-1">{title}</div>
      <div className="text-xs text-icom-muted leading-relaxed">{desc}</div>
    </div>
  )
}

interface SectionBlockProps {
  id: string
  number: string
  title: string
  children: React.ReactNode
}

function SectionBlock({ id, number, title, children }: SectionBlockProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-icom-accent text-sm font-mono tracking-wider">{number}</span>
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{title}</h2>
      </div>
      <div className="pl-0 sm:pl-10 text-sm text-icom-gray leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}

function LegalBasisBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-icom-card border border-icom-border-light text-icom-gray text-[11px] font-mono px-2 py-0.5 rounded">
      {children}
    </span>
  )
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

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-icom-border bg-icom-card-dark mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-icom-accent animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-icom-gray">DSGVO-konform</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Datenschutzerklärung</h1>
        <p className="text-icom-gray max-w-2xl leading-relaxed">
          Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst und behandeln diese
          vertraulich entsprechend der EU-Datenschutz-Grundverordnung (DSGVO) sowie dem
          luxemburgischen und deutschen Datenschutzrecht.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10">

          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-icom-card-dark border border-icom-border rounded-xl p-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-icom-dark mb-4">Inhalt</div>
              <ul className="space-y-2.5">
                {sections.map(s => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-start gap-3 text-xs text-icom-gray hover:text-white transition-colors group"
                    >
                      <span className="text-icom-accent/60 group-hover:text-icom-accent font-mono">{s.number}</span>
                      <span className="leading-snug">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-14 min-w-0">

            <SectionBlock id="verantwortlicher" number="01" title="Verantwortlicher">
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne von Art. 4 Nr. 7 DSGVO ist:</p>
              <div className="bg-icom-card border border-icom-border rounded-lg p-5 not-italic text-icom-gray">
                <div className="text-white font-medium mb-2">Intelligent Commerce Group S.a.r.l.</div>
                1 Place du Marché<br />
                L-6755 Grevenmacher, Luxemburg<br />
                <br />
                Telefon: <a href="tel:+4915152820216" className="text-white hover:text-icom-accent transition-colors">+49 (0) 1515 282 021 6</a><br />
                E-Mail: <a href="mailto:info@icom-group.net" className="text-white hover:text-icom-accent transition-colors">info@icom-group.net</a>
              </div>
            </SectionBlock>

            <SectionBlock id="grundsaetze" number="02" title="Grundsätze der Verarbeitung">
              <p>
                Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder
                identifizierbare natürliche Person beziehen. Wir verarbeiten Ihre Daten ausschließlich
                auf Basis einer Rechtsgrundlage nach Art. 6 Abs. 1 DSGVO – typischerweise:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <LegalBasisBadge>Art. 6 Abs. 1 lit. a — Einwilligung</LegalBasisBadge>
                <LegalBasisBadge>Art. 6 Abs. 1 lit. b — Vertrag</LegalBasisBadge>
                <LegalBasisBadge>Art. 6 Abs. 1 lit. f — berechtigtes Interesse</LegalBasisBadge>
              </div>
              <p>
                Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich
                ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben.
              </p>
            </SectionBlock>

            <SectionBlock id="log-files" number="03" title="Server-Log-Dateien">
              <p>
                Beim Aufruf unserer Website werden durch den Browser automatisch Informationen an
                den Server unseres Hosting-Anbieters übermittelt und temporär gespeichert:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-1 text-icom-gray">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Anonymisierte IP-Adresse (gekürzt um das letzte Oktett)</li>
                <li>Uhrzeit der Serveranfrage</li>
              </ul>
              <p>
                Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.
                Rechtsgrundlage ist <LegalBasisBadge>Art. 6 Abs. 1 lit. f DSGVO</LegalBasisBadge> –
                unser berechtigtes Interesse an einer sicheren und stabilen Bereitstellung der Website.
              </p>
            </SectionBlock>

            <SectionBlock id="kontakt" number="04" title="Kontaktformular & E-Mail-Kontakt">
              <p>
                Wenn Sie uns über das Kontaktformular oder per E-Mail Anfragen zukommen lassen,
                werden Ihre Angaben (Name, E-Mail-Adresse, Unternehmen, Telefonnummer, Nachricht)
                zur Bearbeitung der Anfrage und für mögliche Anschlussfragen bei uns gespeichert.
              </p>
              <p>
                Rechtsgrundlage ist <LegalBasisBadge>Art. 6 Abs. 1 lit. b DSGVO</LegalBasisBadge> –
                soweit Ihre Anfrage auf den Abschluss eines Vertrags abzielt – sowie hilfsweise
                <LegalBasisBadge>Art. 6 Abs. 1 lit. f DSGVO</LegalBasisBadge> in den übrigen Fällen.
                Die Daten werden gelöscht, sobald sie für die Zweckerreichung nicht mehr erforderlich
                sind und keine gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
            </SectionBlock>

            <SectionBlock id="cookies" number="05" title="Cookies">
              <p>
                Cookies sind kleine Textdateien, die in Ihrem Browser gespeichert werden. Wir
                unterscheiden zwischen:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-icom-card border border-icom-border rounded-lg p-4">
                  <div className="text-xs uppercase tracking-wider text-icom-accent mb-1.5">Technisch notwendig</div>
                  <div className="text-sm text-white font-medium mb-1">Session-Cookies</div>
                  <div className="text-xs text-icom-muted leading-relaxed">
                    Erforderlich für die Funktionsfähigkeit der Website. Werden nach
                    Beendigung der Sitzung automatisch gelöscht.
                  </div>
                </div>
                <div className="bg-icom-card border border-icom-border rounded-lg p-4">
                  <div className="text-xs uppercase tracking-wider text-icom-dark mb-1.5">Optional</div>
                  <div className="text-sm text-white font-medium mb-1">Analyse-Cookies</div>
                  <div className="text-xs text-icom-muted leading-relaxed">
                    Werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt. Sie können
                    diese jederzeit über die Cookie-Einstellungen widerrufen.
                  </div>
                </div>
              </div>
              <p>
                Sie können Ihren Browser so einstellen, dass keine Cookies gespeichert werden
                oder Sie vor dem Setzen informiert werden. Die volle Funktionsfähigkeit dieser
                Website ist in diesem Fall ggf. eingeschränkt.
              </p>
            </SectionBlock>

            <SectionBlock id="analytics" number="06" title="Google Analytics">
              <p>
                Diese Website nutzt Google Analytics, einen Webanalysedienst der Google Ireland
                Limited (Gordon House, Barrow Street, Dublin 4, Irland). Google Analytics verwendet
                Cookies, um eine Analyse Ihrer Nutzung der Website zu ermöglichen.
              </p>
              <p>
                Wir haben die IP-Anonymisierung aktiviert (<code className="text-[12px] bg-icom-card px-1.5 py-0.5 rounded text-icom-gray">anonymizeIp</code>),
                wodurch Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen
                Union vor der Übermittlung in die USA gekürzt wird. Eine Zusammenführung mit anderen
                Google-Daten findet nicht statt.
              </p>
              <p>
                Rechtsgrundlage ist <LegalBasisBadge>Art. 6 Abs. 1 lit. a DSGVO</LegalBasisBadge>
                (Einwilligung). Sie können die Einwilligung jederzeit mit Wirkung für die Zukunft
                widerrufen, indem Sie das Browser-Add-on{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer"
                   className="text-icom-accent hover:underline">
                  tools.google.com/dlpage/gaoptout
                </a> installieren.
              </p>
            </SectionBlock>

            <SectionBlock id="hosting" number="07" title="Hosting & Auftragsverarbeitung">
              <p>
                Diese Website wird bei <strong className="text-white font-medium">Vercel Inc.</strong>{' '}
                (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet, mit Datenverarbeitung primär
                in der Region Frankfurt (EU). Vercel ist nach dem EU-US Data Privacy Framework
                zertifiziert.
              </p>
              <p>
                Mit Vercel besteht ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO). Für Transfers
                in Drittländer sind Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO
                vereinbart.
              </p>
              <p>
                Rechtsgrundlage: <LegalBasisBadge>Art. 6 Abs. 1 lit. f DSGVO</LegalBasisBadge>
                {' '}– berechtigtes Interesse an einer performanten und sicheren Bereitstellung.
              </p>
            </SectionBlock>

            <SectionBlock id="speicherdauer" number="08" title="Speicherdauer">
              <p>
                Wir speichern personenbezogene Daten nur so lange, wie dies zur Erfüllung der jeweiligen
                Zwecke erforderlich ist. Server-Log-Dateien werden nach 14 Tagen automatisch gelöscht.
                Anfragen über das Kontaktformular werden bis zur abschließenden Bearbeitung sowie
                etwaige Folge-Kommunikation aufbewahrt – längstens jedoch im Rahmen handelsrechtlicher
                Aufbewahrungspflichten (i. d. R. 6–10 Jahre).
              </p>
            </SectionBlock>

            <SectionBlock id="rechte" number="09" title="Ihre Rechte als betroffene Person">
              <p>Nach der DSGVO stehen Ihnen folgende Rechte zu:</p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <RechtCard artikel="Art. 15 DSGVO" title="Auskunft"
                  desc="Bestätigung, ob und welche Daten wir über Sie verarbeiten." />
                <RechtCard artikel="Art. 16 DSGVO" title="Berichtigung"
                  desc="Korrektur unrichtiger oder Vervollständigung unvollständiger Daten." />
                <RechtCard artikel="Art. 17 DSGVO" title="Löschung"
                  desc="„Recht auf Vergessenwerden“ – Löschung Ihrer Daten." />
                <RechtCard artikel="Art. 18 DSGVO" title="Einschränkung"
                  desc="Sperrung der Verarbeitung in bestimmten Fällen." />
                <RechtCard artikel="Art. 20 DSGVO" title="Datenübertragbarkeit"
                  desc="Erhalt Ihrer Daten in einem strukturierten, gängigen Format." />
                <RechtCard artikel="Art. 21 DSGVO" title="Widerspruch"
                  desc="Widerspruch gegen die Verarbeitung auf Basis berechtigter Interessen." />
              </div>
              <p className="pt-2">
                Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an{' '}
                <a href="mailto:info@icom-group.net" className="text-icom-accent hover:underline">
                  info@icom-group.net
                </a>.
              </p>
            </SectionBlock>

            <SectionBlock id="beschwerde" number="10" title="Beschwerderecht bei der Aufsichtsbehörde">
              <p>
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
                Ihrer personenbezogenen Daten zu beschweren (Art. 77 DSGVO).
              </p>
              <div className="bg-icom-card border border-icom-border rounded-lg p-5 not-italic text-icom-gray">
                <div className="text-[10px] uppercase tracking-[0.18em] text-icom-dark mb-2">Zuständige Aufsichtsbehörde</div>
                <div className="text-white font-medium mb-2">Commission nationale pour la protection des données (CNPD)</div>
                15, Boulevard du Jazz<br />
                L-4370 Belvaux, Luxemburg<br />
                <br />
                Web: <a href="https://cnpd.public.lu" target="_blank" rel="noopener noreferrer"
                  className="text-white hover:text-icom-accent transition-colors">cnpd.public.lu</a>
              </div>
            </SectionBlock>

            <SectionBlock id="aktualitaet" number="11" title="Aktualität dieser Erklärung">
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
                aktuellen rechtlichen Anforderungen entspricht oder Änderungen unserer Leistungen
                widerspiegelt. Die jeweils aktuelle Fassung kann jederzeit auf dieser Website abgerufen
                werden.
              </p>
              <p className="text-icom-dark text-xs pt-2">
                Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
              </p>
            </SectionBlock>

          </div>
        </div>
      </section>
    </>
  )
}
