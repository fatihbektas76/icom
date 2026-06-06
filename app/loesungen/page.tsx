import { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import AnimatedSolutions from '@/components/sections/AnimatedSolutions'

export const metadata: Metadata = {
  title: 'Lösungen – Payment Solutions & Beratung | iCOM Group',
  description:
    'Payment Solutions, E-Commerce Payment, POS-Lösungen, paybyMail und Kostenoptimierung – alle Leistungen der iCOM Group.',
}

export default function LoesungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Lösungen"
        title="Unsere Lösungen."
        accent="Lösungen"
        description="Von der PSP-Auswahl über Checkout-Optimierung bis zur laufenden Kostenüberwachung – die iCOM Group bietet unabhängige Payment-Beratung aus einer Hand."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Lösungen' },
        ]}
        primaryCta={{ label: 'Kostenlose Analyse anfordern →', href: '/kontakt' }}
        secondaryCta={{ label: 'Payment-Rechner starten', href: '/tools/payment-kosten-rechner' }}
      />

      <AnimatedSolutions />
    </>
  )
}
