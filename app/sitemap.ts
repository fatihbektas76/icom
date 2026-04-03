import { MetadataRoute } from 'next'
import { branchen } from '@/lib/data/branchen'
import { staedte } from '@/lib/data/staedte'
import { pspKombinationen } from '@/lib/data/psp-kombinationen'
import { platforms } from '@/lib/data/platforms'
import { posTypen } from '@/lib/data/pos-typen'
import { usecases } from '@/lib/data/usecases'
import { themen } from '@/lib/data/themen'

const BASE = 'https://icom-group.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '', '/loesungen', '/vision', '/blog', '/kontakt',
    '/tools/payment-kosten-rechner', '/tools/psp-vergleich', '/tools/pos-rechner',
    '/tools/interchange-rechner', '/tools/wechsel-roi', '/tools/paybymail-check',
    '/impressum', '/datenschutz',
  ].map(r => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: r === '' ? 1 : 0.8,
  }))

  const branchenRoutes = branchen.map(b => ({
    url: `${BASE}/payment-kosten/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const stadtRoutes = staedte.map(s => ({
    url: `${BASE}/payment-beratung/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const vergleichRoutes = pspKombinationen.map(v => ({
    url: `${BASE}/psp-vergleich/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const platformRoutes = platforms.map(p => ({
    url: `${BASE}/ecommerce-payment/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const posRoutes = posTypen.map(p => ({
    url: `${BASE}/pos-loesung/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const usecaseRoutes = usecases.map(u => ({
    url: `${BASE}/paybymail/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const themenRoutes = themen.map(t => ({
    url: `${BASE}/wissen/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...branchenRoutes,
    ...stadtRoutes,
    ...vergleichRoutes,
    ...platformRoutes,
    ...posRoutes,
    ...usecaseRoutes,
    ...themenRoutes,
  ]
}
