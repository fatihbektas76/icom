'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import SceneVisionConstellation from './journey/SceneVisionConstellation'

const PRINCIPLES = [
  {
    num: '01',
    title: 'Unabhängigkeit',
    desc: 'Wir sind an keinen PSP gebunden und empfehlen immer die Lösung, die zum Kunden passt – nicht die mit der höchsten Provision.',
  },
  {
    num: '02',
    title: 'Transparenz',
    desc: 'Jede Position auf jeder Abrechnung wird erklärt. Interchange, Scheme Fee, Acquirer-Marge – ohne Verschleierung.',
  },
  {
    num: '03',
    title: 'Fairness',
    desc: 'Faire Konditionen sollten kein Privileg für Großkonzerne sein. Auch ein KMU verdient eine professionelle Beratung.',
  },
  {
    num: '04',
    title: 'Langfristigkeit',
    desc: 'Wir denken in Jahren, nicht in Quartalen. Quartalsweise Kostenkontrolle gehört zum Service.',
  },
]

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function AnimatedVision() {
  return (
    <>
      <SceneVisionConstellation />
      <VisionStory />
      <VisionPrinciples />
      <VisionCTA />
    </>
  )
}

function VisionStory() {
  const columnVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.18, duration: 0.8, ease: EASE_OUT_EXPO },
    }),
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={columnVariants}
          className="relative"
        >
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
            style={{ transformOrigin: 'top' }}
            className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-icom-accent via-icom-accent/30 to-transparent"
          />
          <div className="text-[11px] uppercase tracking-[0.3em] text-icom-accent/80 mb-3 font-medium">
            Wer wir sind
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Ein unabhängiger Berater aus Luxemburg.
          </h2>
          <div className="space-y-4 text-icom-gray leading-relaxed">
            <p>
              Die Intelligent Commerce Group S.a.r.l. (iCOM Group) ist ein unabhängiger
              Payment-Beratungsdienstleister mit Sitz in Grevenmacher, Luxemburg. Wir
              beraten Unternehmen in Deutschland, Österreich und der Schweiz zu allen
              Aspekten der Zahlungsabwicklung.
            </p>
            <p>
              Unsere Unabhängigkeit ist unser größter Vorteil: Wir sind an keinen PSP
              gebunden und empfehlen immer die Lösung, die für unsere Kunden am besten
              passt – nicht die, die uns die höchste Provision zahlt.
            </p>
            <p>
              Mit Partnern wie <span className="text-white">Unzer</span>,{' '}
              <span className="text-white">vobapay</span> und{' '}
              <span className="text-white">secupay</span> haben wir Zugang zu exklusiven
              Konditionen, die wir direkt an unsere Kunden weitergeben.
            </p>
          </div>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={columnVariants}
          className="relative"
        >
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.4 }}
            style={{ transformOrigin: 'top' }}
            className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-icom-accent via-icom-accent/30 to-transparent"
          />
          <div className="text-[11px] uppercase tracking-[0.3em] text-icom-accent/80 mb-3 font-medium">
            Was uns antreibt
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Komplexität in Klarheit verwandeln.
          </h2>
          <div className="space-y-4 text-icom-gray leading-relaxed">
            <p>
              Die Payment-Branche ist komplex und oft intransparent. Viele Unternehmen
              zahlen zu viel, weil sie die Gebührenstrukturen nicht durchschauen oder
              weil sie seit Jahren denselben Vertrag nutzen.
            </p>
            <p>
              Unser Ziel: Jedes Unternehmen soll genau wissen, was es für Payment zahlt
              und warum. Transparenz schafft Vertrauen und ermöglicht fundierte
              Entscheidungen.
            </p>
            <p>
              Wir glauben daran, dass faire Konditionen kein Privileg für Großkonzerne
              sein sollten. Auch ein Bäcker mit 8.000 € Monatsumsatz verdient eine
              professionelle Payment-Beratung.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function VisionPrinciples() {
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
              Prinzipien
            </span>
            <span className="h-px w-12 bg-icom-accent/40" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Vier Sätze, an denen wir uns messen lassen.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PRINCIPLES.map(p => (
            <motion.div
              key={p.num}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.92 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.7, ease: EASE_OUT_EXPO },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="bg-icom-card border border-icom-border rounded-xl p-7 h-full hover:border-icom-accent/40 transition-colors"
            >
              <div className="text-icom-accent font-mono text-xs mb-4 tracking-wider">
                {p.num}
              </div>
              <div className="text-white font-semibold text-lg mb-3">{p.title}</div>
              <p className="text-sm text-icom-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function VisionCTA() {
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
            Lassen Sie uns sprechen.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.4 }}
            className="text-icom-gray max-w-xl mx-auto mb-8"
          >
            Kostenlose Erstanalyse – wir zeigen Ihnen Ihr Einsparpotenzial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.5 }}
          >
            <Link
              href="/kontakt"
              className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors"
            >
              Kontakt aufnehmen →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
