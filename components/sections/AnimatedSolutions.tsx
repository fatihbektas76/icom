'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import SceneSolutionsEngine from './journey/SceneSolutionsEngine'

interface Solution {
  title: string
  desc: string
  link: string
  features: string[]
  metric: { value: string; label: string }
  icon: 'card' | 'globe' | 'terminal' | 'mail' | 'spark' | 'book'
}

const SOLUTIONS: Solution[] = [
  {
    title: 'Payment Solutions',
    desc: 'Unabhängige PSP-Beratung, Vertragsverhandlung und Kostenoptimierung für alle Zahlungsarten.',
    link: '/tools/psp-vergleich',
    features: ['PSP-Vergleich & Auswahl', 'Vertragsverhandlung', 'Gebührenoptimierung', 'Laufende Kostenkontrolle'],
    metric: { value: '−28 %', label: 'Ø Gebührenreduktion' },
    icon: 'card',
  },
  {
    title: 'E-Commerce Payment',
    desc: 'Checkout-Optimierung, Payment-Integration und Conversion-Steigerung für Online-Shops.',
    link: '/ecommerce-payment/shopify',
    features: ['Shopify, WooCommerce, Magento', 'Checkout-Optimierung', 'Multi-PSP-Strategie', 'Lokale Zahlungsarten'],
    metric: { value: '+12 %', label: 'Checkout-Conversion' },
    icon: 'globe',
  },
  {
    title: 'POS-Lösungen',
    desc: 'Terminal-Beratung, Kassensysteme und stationäre Payment-Lösungen für den Handel.',
    link: '/pos-loesung/stationaer',
    features: ['Terminal-Vergleich', 'Kassensystem-Integration', 'Omnichannel-Setup', 'Filial-Lösungen'],
    metric: { value: '< 1,5 %', label: 'MDR-Zielkorridor' },
    icon: 'terminal',
  },
  {
    title: 'paybyMail',
    desc: 'Zahlungslinks per E-Mail und SMS – für Branchen ohne festen Checkout-Punkt.',
    link: '/paybymail/hotel',
    features: ['Keine Hardware nötig', 'PCI-DSS-konform', 'Sofortige Zahlung', 'Gebrandete Zahlungsseiten'],
    metric: { value: '−52 %', label: 'No-Show-Verluste' },
    icon: 'mail',
  },
  {
    title: 'Interchange-Optimierung',
    desc: 'Wechsel von Flat-Rate zu Interchange++ für signifikante Kostensenkungen bei hohem Volumen.',
    link: '/tools/interchange-rechner',
    features: ['IC++ vs. Flat-Rate Analyse', 'Scheme-Fee-Optimierung', 'Non-EU-Karten-Strategie', '20–40 % Einsparung'],
    metric: { value: '20–40 %', label: 'Einsparpotenzial' },
    icon: 'spark',
  },
  {
    title: 'Payment-Wissen',
    desc: 'Bildungsressourcen zu PSD2, PCI DSS, Chargebacks und allen Payment-Themen.',
    link: '/wissen/interchange-fees',
    features: ['Interchange Fees', 'PSD2 & SCA', 'PCI DSS', 'Chargeback Management'],
    metric: { value: '40+', label: 'Wissens-Artikel' },
    icon: 'book',
  },
]

const PROCESS = [
  { step: '01', title: 'Audit',       desc: 'Wir analysieren Ihre aktuellen Verträge und Abrechnungen.' },
  { step: '02', title: 'Benchmark',   desc: 'Vergleich gegen Marktstandards & passende Alternativen.' },
  { step: '03', title: 'Verhandlung', desc: 'Wir verhandeln direkt mit PSPs und Acquirern.' },
  { step: '04', title: 'Monitoring',  desc: 'Quartalsweise Kontrolle – ohne Mehraufwand für Sie.' },
]

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

function Icon({ name }: { name: Solution['icon'] }) {
  const stroke = '#F05252'
  const common = { fill: 'none', stroke, strokeWidth: 1.6, viewBox: '0 0 24 24' as const }
  switch (name) {
    case 'card':
      return (
        <svg width="22" height="22" {...common}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      )
    case 'globe':
      return (
        <svg width="22" height="22" {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      )
    case 'terminal':
      return (
        <svg width="22" height="22" {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 9l3 3-3 3M13 15h4" />
        </svg>
      )
    case 'mail':
      return (
        <svg width="22" height="22" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )
    case 'spark':
      return (
        <svg width="22" height="22" {...common}>
          <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M5 19l4-4" />
        </svg>
      )
    case 'book':
      return (
        <svg width="22" height="22" {...common}>
          <path d="M4 4h11a4 4 0 014 4v12H8a4 4 0 01-4-4z" />
          <path d="M4 16a4 4 0 014-4h11" />
        </svg>
      )
  }
}

export default function AnimatedSolutions() {
  return (
    <>
      <SceneSolutionsEngine />
      <SolutionGrid />
      <ProcessSection />
      <SolutionsCTA />
    </>
  )
}

function SolutionGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SOLUTIONS.map((sol, i) => (
          <motion.div
            key={sol.title}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7, ease: EASE_OUT_EXPO },
              },
            }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
          >
            <Link
              href={sol.link}
              className="group relative bg-icom-card border border-icom-border rounded-xl p-7 hover:border-icom-accent/50 transition-all duration-300 block h-full"
            >
              <span className="absolute top-5 right-5 text-[10px] text-icom-dark font-mono tracking-wider">
                {String(i + 1).padStart(2, '0')} / {String(SOLUTIONS.length).padStart(2, '0')}
              </span>

              <div className="w-11 h-11 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-icom-accent/15 transition-colors">
                <Icon name={sol.icon} />
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-icom-accent transition-colors">
                {sol.title}
              </h2>
              <p className="text-sm text-icom-gray leading-relaxed mb-5">{sol.desc}</p>

              <div className="inline-flex items-baseline gap-2 mb-5 bg-icom-black border border-icom-border rounded-lg px-3 py-1.5">
                <span className="text-icom-accent font-bold text-sm">{sol.metric.value}</span>
                <span className="text-[10px] text-icom-muted uppercase tracking-wider">
                  {sol.metric.label}
                </span>
              </div>

              <ul className="space-y-1.5">
                {sol.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-icom-muted">
                    <span className="text-icom-accent mt-0.5">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-xs text-icom-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Mehr erfahren →
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="bg-icom-card-dark border-y border-icom-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-icom-accent/40" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-icom-accent/80 font-medium">
              Vorgehen
            </span>
            <span className="h-px w-12 bg-icom-accent/40" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            In vier Schritten zur optimalen Payment-Strategie.
          </h2>
          <p className="text-icom-gray text-sm md:text-base max-w-xl mx-auto">
            Keine langen Projekte. Erste Resultate in 48 Stunden.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-4 gap-4"
        >
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                },
              }}
              className="relative bg-icom-card border border-icom-border rounded-xl p-6 h-full"
            >
              {i < PROCESS.length - 1 && (
                <motion.span
                  aria-hidden
                  className="hidden md:block absolute top-1/2 -right-2 h-px bg-icom-accent/40"
                  initial={{ width: '0rem' }}
                  whileInView={{ width: '1rem' }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE_OUT_EXPO }}
                />
              )}
              <div className="text-icom-accent font-bold text-xs mb-3 font-mono tracking-wider">
                {p.step}
              </div>
              <div className="text-white font-semibold mb-2">{p.title}</div>
              <p className="text-sm text-icom-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SolutionsCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
        className="relative bg-icom-card border border-icom-border rounded-2xl p-12 md:p-16 text-center overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[400, 300, 200].map((size, i) => (
            <motion.div
              key={size}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.2,
                delay: 0.2 + i * 0.15,
                ease: EASE_OUT_EXPO,
              }}
              className="absolute rounded-full border border-icom-accent/10"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Welche Lösung passt zu Ihnen?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.4 }}
            className="text-icom-gray max-w-xl mx-auto mb-8"
          >
            In der kostenlosen Erstanalyse finden wir die optimale Payment-Strategie für Ihr Unternehmen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/kontakt"
              className="bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors"
            >
              Jetzt Beratung anfragen →
            </Link>
            <Link
              href="/tools/payment-kosten-rechner"
              className="border border-white/30 hover:border-icom-accent text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors"
            >
              Erst selbst rechnen
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
