import { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import StatsSection from '@/components/sections/StatsSection'
import AnimatedVision from '@/components/sections/AnimatedVision'

export const metadata: Metadata = {
  title: 'Vision – Über die iCOM Group | iCOM Group',
  description:
    'Die Vision der iCOM Group: Transparente, faire Payment-Lösungen für jedes Unternehmen. Über 10 Jahre Erfahrung, 4.000+ Kunden.',
}

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Unsere Vision."
        accent="Vision"
        description="Jedes Unternehmen verdient transparente, faire Payment-Konditionen. Wir machen die komplexe Welt der Zahlungsabwicklung verständlich und optimierbar."
        crumbs={[
          { label: 'Start', href: '/' },
          { label: 'Vision' },
        ]}
        primaryCta={{ label: 'Mit uns sprechen →', href: '/kontakt' }}
      />

      <StatsSection />

      <AnimatedVision />
    </>
  )
}
