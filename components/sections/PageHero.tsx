import Link from 'next/link'
import ParticleCanvas from '@/components/ui/ParticleCanvas'

interface Crumb {
  label: string
  href?: string
}

interface PageHeroProps {
  eyebrow: string
  title: string
  /** Word inside title that should be coral-accented. Optional. */
  accent?: string
  description: string
  crumbs: Crumb[]
  /** Optional CTAs */
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

function renderTitle(title: string, accent?: string) {
  if (!accent || !title.includes(accent)) {
    return title
  }
  const [before, after] = title.split(accent)
  return (
    <>
      {before}
      <span className="text-icom-accent">{accent}</span>
      {after}
    </>
  )
}

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  crumbs,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-icom-border">
      <ParticleCanvas />
      {/* radial fade so particles don't compete with text */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 40%, rgba(13,13,13,0) 0%, rgba(13,13,13,0.75) 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-20 md:pb-24">
        {/* breadcrumb */}
        <nav className="text-xs text-icom-dark mb-8 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link
                  href={c.href}
                  className="hover:text-icom-accent transition-colors uppercase tracking-wider"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-icom-gray uppercase tracking-wider">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-icom-dark">/</span>}
            </span>
          ))}
        </nav>

        {/* eyebrow */}
        <div className="inline-flex items-center gap-2 bg-icom-card/70 backdrop-blur border border-icom-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-icom-accent animate-pulse-slow" />
          <span className="text-xs text-icom-gray uppercase tracking-wider">{eyebrow}</span>
        </div>

        {/* headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-6 max-w-4xl">
          {renderTitle(title, accent)}
        </h1>

        {/* description */}
        <p className="text-lg text-icom-gray max-w-2xl mb-8 leading-relaxed">
          {description}
        </p>

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="bg-icom-accent hover:bg-icom-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="border border-white/30 hover:border-icom-accent text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
