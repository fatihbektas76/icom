import { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import ContactForm from '@/components/forms/ContactForm'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Kontakt – Payment-Beratung anfragen | iCOM Group',
  description:
    'Kontaktieren Sie die iCOM Group für eine kostenlose Payment-Analyse. Telefon, E-Mail oder Kontaktformular.',
}

const TRUST = [
  { label: '48 h',           caption: 'Erstanalyse' },
  { label: '100 % kostenlos', caption: 'unverbindlich' },
  { label: '4.000+',         caption: 'Kunden in DACH & EU' },
  { label: 'Ø −28 %',        caption: 'Gebührenreduktion' },
]

const PROCESS = [
  { step: '01', title: 'Erstanalyse',  desc: 'Wir prüfen Ihre Verträge und Abrechnungen.', time: '48 h' },
  { step: '02', title: 'Benchmark',    desc: 'PSP-Vergleich mit Ihren echten Daten.',       time: '3–5 Tage' },
  { step: '03', title: 'Empfehlung',   desc: 'Konkrete Strategie + Einsparrechnung.',       time: '1 Woche' },
  { step: '04', title: 'Umsetzung',    desc: 'Wir begleiten Migration & Verhandlung.',      time: 'laufend' },
]

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Kostenlose Beratung anfragen."
        accent="Beratung"
        description="Innerhalb von 48 Stunden erhalten Sie eine erste Einschätzung Ihres Einsparpotenzials – unverbindlich und kostenlos."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Kontakt' },
        ]}
      />

      {/* Trust strip */}
      <section className="bg-icom-card-dark border-b border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST.map(t => (
              <div key={t.label} className="text-center">
                <div className="text-icom-accent font-bold text-lg md:text-xl tabular-nums">{t.label}</div>
                <div className="text-[10px] text-icom-muted uppercase tracking-wider mt-1">
                  {t.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Form column */}
          <RevealOnScroll>
            <ContactForm />
          </RevealOnScroll>

          {/* Info column */}
          <div className="space-y-5">
            <RevealOnScroll delay={120}>
              <InfoCard
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F05252" strokeWidth="1.7">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.79a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.29-1.29a2 2 0 012.11-.45c.89.35 1.83.59 2.79.72A2 2 0 0122 16.92z" />
                  </svg>
                }
                title="Telefon"
              >
                <a
                  href="tel:+4915152820216"
                  className="text-icom-accent hover:text-icom-accent-hover transition-colors font-medium tabular-nums"
                >
                  +49 (0) 1515 282 021 6
                </a>
                <p className="text-xs text-icom-muted mt-2">Mo – Fr · 9:00 – 18:00 Uhr</p>
              </InfoCard>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <InfoCard
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F05252" strokeWidth="1.7">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                title="Adresse"
              >
                <p className="text-sm text-icom-gray leading-relaxed">
                  Intelligent Commerce Group S.a.r.l.<br />
                  1 Place du Marché<br />
                  L-6755 Grevenmacher<br />
                  Luxemburg
                </p>
              </InfoCard>
            </RevealOnScroll>

            <RevealOnScroll delay={280}>
              <div className="relative bg-icom-card border border-icom-border rounded-xl p-6 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at top left, rgba(240,82,82,0.08) 0%, rgba(13,13,13,0) 60%)',
                  }}
                />
                <div className="relative">
                  <h3 className="text-white font-semibold mb-1">So geht's weiter</h3>
                  <p className="text-xs text-icom-muted mb-5">Vom ersten Kontakt zur Optimierung.</p>
                  <div className="space-y-4">
                    {PROCESS.map((p, i) => (
                      <div key={p.step} className="flex items-start gap-3 group">
                        <div className="flex flex-col items-center shrink-0">
                          <div
                            className="w-8 h-8 bg-icom-accent/10 border border-icom-accent/30 rounded-full flex items-center justify-center"
                            style={{ boxShadow: '0 0 12px rgba(240,82,82,0.15)' }}
                          >
                            <span className="text-icom-accent text-[11px] font-bold">{p.step}</span>
                          </div>
                          {i < PROCESS.length - 1 && (
                            <span className="w-px h-6 bg-icom-border mt-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white text-sm font-medium">{p.title}</span>
                            <span className="text-[10px] text-icom-accent/80 font-mono uppercase tracking-wider">
                              {p.time}
                            </span>
                          </div>
                          <p className="text-xs text-icom-muted leading-relaxed mt-0.5">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={360}>
              <div className="bg-icom-black border border-icom-border rounded-xl p-5 flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F05252" strokeWidth="1.7" className="shrink-0">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <p className="text-xs text-icom-gray leading-relaxed">
                  Ihre Daten bleiben in <span className="text-white">Luxemburg</span>.
                  DSGVO-konform. Keine Weitergabe.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  )
}

function InfoCard({
  icon, title, children,
}: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="group bg-icom-card border border-icom-border rounded-xl p-6 hover:border-icom-accent/40 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center group-hover:bg-icom-accent/15 transition-colors">
          {icon}
        </div>
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  )
}
