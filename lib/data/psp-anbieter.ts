export interface PSP {
  slug: string
  name: string
  model: 'flat-rate' | 'interchange++' | 'individuell'
  euRate?: number
  extraFee?: number
  nonEURate?: number
  monthly: number
  pros: string[]
  cons: string[]
  bestFor: string[]
}

export const pspAnbieter: PSP[] = [
  {
    slug: 'stripe',
    name: 'Stripe',
    model: 'flat-rate',
    euRate: 1.5,
    extraFee: 0.25,
    nonEURate: 2.9,
    monthly: 0,
    pros: ['Beste API der Branche', 'Exzellente Dokumentation', 'Stripe Billing für Abos', 'Stripe Connect für Marktplätze'],
    cons: ['Kein deutschsprachiger Support', 'Non-EU-Gebühren relativ hoch', 'Kein eigenes Wallet'],
    bestFor: ['SaaS', 'Startups', 'Marktplätze', 'Tech-Teams'],
  },
  {
    slug: 'paypal',
    name: 'PayPal',
    model: 'flat-rate',
    euRate: 1.49,
    extraFee: 0.35,
    nonEURate: 3.49,
    monthly: 0,
    pros: ['Höchste Conversion in Deutschland', 'Käuferschutz bindet Kunden', 'Einfache Integration'],
    cons: ['Konto-Einfrierungen möglich', 'Non-EU-Gebühren sehr hoch', 'Wenig Flexibilität'],
    bestFor: ['B2C-Shops', 'Kleine Händler', 'Shops mit DE-Kundenstamm'],
  },
  {
    slug: 'mollie',
    name: 'Mollie',
    model: 'flat-rate',
    euRate: 1.8,
    extraFee: 0.25,
    nonEURate: 2.9,
    monthly: 0,
    pros: ['Europäischer Fokus', 'Guter Support', 'Viele lokale Zahlungsarten'],
    cons: ['Etwas teurer als Stripe', 'Weniger Features für komplexe Architekturen'],
    bestFor: ['Mittelgroße Shops', 'Europäisches Geschäft', 'Shops mit Lokalisierungsbedarf'],
  },
  {
    slug: 'adyen',
    name: 'Adyen',
    model: 'interchange++',
    euRate: 0.11,
    extraFee: 0.12,
    monthly: 0,
    pros: ['Günstigstes Modell bei hohem Volumen', 'Enterprise-Qualität', 'POS + Online aus einer Hand'],
    cons: ['Mindestvolumen empfohlen', 'Komplexere Integration', 'Kein Self-Service'],
    bestFor: ['Großunternehmen', 'Omnichannel', 'Ab 200.000 € Monatsumsatz'],
  },
  {
    slug: 'unzer',
    name: 'Unzer',
    model: 'individuell',
    monthly: 0,
    pros: ['Direkt auf DACH-Markt ausgerichtet', 'Persönlicher Account Manager', 'Individuelle Konditionen', 'Starke PMS-Integrationen'],
    cons: ['Keine transparenten Listenpreise', 'Nicht für Kleinstunternehmen'],
    bestFor: ['Mittelstand', 'Hotels', 'Branchen mit komplexen Anforderungen'],
  },
  {
    slug: 'sumup',
    name: 'SumUp',
    model: 'flat-rate',
    euRate: 1.69,
    extraFee: 0,
    monthly: 0,
    pros: ['Keine monatlichen Gebühren', 'Einfachste Lösung', 'Günstige Hardware'],
    cons: ['Nur POS-fokussiert', 'Wenig Funktionsumfang online', 'Kein Interchange++'],
    bestFor: ['Stationärer Handel', 'Kleinunternehmer', 'Einstiegslösung'],
  },
]

export function getPSPBySlug(slug: string) {
  return pspAnbieter.find(p => p.slug === slug)
}
