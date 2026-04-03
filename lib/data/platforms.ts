export interface Platform {
  slug: string
  name: string
  type: string
  topPSPs: string[]
  avgFee: number
  faq: Array<{ q: string; a: string }>
}

export const platforms: Platform[] = [
  {
    slug: 'shopify',
    name: 'Shopify',
    type: 'E-Commerce-Plattform',
    topPSPs: ['Shopify Payments (Stripe)', 'Mollie', 'PayPal'],
    avgFee: 1.8,
    faq: [
      { q: 'Welchen PSP sollte ich bei Shopify verwenden?', a: 'Shopify Payments (basiert auf Stripe) vermeidet die zusätzliche 2% Transaktionsgebühr und bietet die beste Integration.' },
      { q: 'Was kostet Kartenzahlung bei Shopify?', a: 'Shopify Payments: 1,5% + 0,25€ (Basic), 1,4% + 0,25€ (Shopify), 1,2% + 0,20€ (Advanced) für EU-Karten.' },
      { q: 'Kann ich bei Shopify Drittanbieter-PSPs nutzen?', a: 'Ja, aber Shopify erhebt zusätzlich 0,5–2% Transaktionsgebühren auf Drittanbieter-Zahlungen.' },
      { q: 'Wie optimiere ich Payment-Kosten bei Shopify?', a: 'Shopify Payments nutzen, höheren Plan für niedrigere Raten wählen, lokale Zahlungsarten aktivieren.' },
      { q: 'Unterstützt Shopify Interchange++?', a: 'Nein – Shopify Payments arbeitet mit Flat-Rate. Für IC++ müssten Sie einen Drittanbieter-PSP nutzen.' },
    ],
  },
  {
    slug: 'woocommerce',
    name: 'WooCommerce',
    type: 'WordPress-Plugin',
    topPSPs: ['Stripe', 'Mollie', 'PayPal'],
    avgFee: 1.7,
    faq: [
      { q: 'Welcher PSP eignet sich am besten für WooCommerce?', a: 'Stripe bietet das beste Plugin, Mollie überzeugt mit europäischen Zahlungsarten, PayPal hat die höchste Markenbekanntheit.' },
      { q: 'Was kostet Stripe für WooCommerce?', a: 'EU-Karten: 1,5% + 0,25€, Non-EU: 2,9% + 0,25€. Keine monatlichen Gebühren.' },
      { q: 'Kann ich mehrere PSPs in WooCommerce nutzen?', a: 'Ja – WooCommerce unterstützt beliebig viele Payment-Gateways parallel, z.B. Stripe + PayPal + Klarna.' },
      { q: 'Wie integriere ich Klarna in WooCommerce?', a: 'Über das offizielle Klarna-Plugin oder über Mollie/Stripe, die Klarna als Zahlungsart anbieten.' },
      { q: 'Ist WooCommerce PCI-DSS-konform?', a: 'Die PCI-Compliance wird durch den PSP sichergestellt – Stripe und Mollie sind Level 1 PCI-DSS-zertifiziert.' },
    ],
  },
  {
    slug: 'magento',
    name: 'Magento / Adobe Commerce',
    type: 'Enterprise E-Commerce',
    topPSPs: ['Adyen', 'Stripe', 'Unzer'],
    avgFee: 1.6,
    faq: [
      { q: 'Welcher PSP ist Standard für Magento?', a: 'Adyen ist offizieller Adobe-Partner und bietet die tiefste Integration. Für Mittelstand auch Unzer empfehlenswert.' },
      { q: 'Lohnt sich Interchange++ bei Magento-Shops?', a: 'Ab ca. 100.000€ Monatsumsatz lohnt sich Adyen Interchange++ – die Einsparung kann 20–40% betragen.' },
      { q: 'Wie wechsle ich den PSP bei Magento?', a: 'PSP-Wechsel bei Magento dauert 3–6 Wochen. Adyen und Unzer bieten Magento-Extensions für die Integration.' },
      { q: 'Unterstützt Magento Apple Pay?', a: 'Ja – über Adyen, Stripe oder Braintree lässt sich Apple Pay in Magento integrieren.' },
      { q: 'Was kostet Adyen für Magento-Shops?', a: 'Interchange++ Modell: IC + Scheme Fee + 0,11% + 0,12€. Kein Mindestumsatz, aber Enterprise-Setup.' },
    ],
  },
  {
    slug: 'prestashop',
    name: 'PrestaShop',
    type: 'Open-Source E-Commerce',
    topPSPs: ['Mollie', 'Stripe', 'PayPal'],
    avgFee: 1.8,
    faq: [
      { q: 'Welcher PSP eignet sich für PrestaShop?', a: 'Mollie bietet das beste PrestaShop-Modul mit lokalen Zahlungsarten. Stripe ist technisch am flexibelsten.' },
      { q: 'Was kostet Mollie für PrestaShop?', a: 'EU-Kreditkarte: 1,80% + 0,25€. iDEAL, Bancontact und andere lokale Methoden ab 0,29€ pro Transaktion.' },
      { q: 'Unterstützt PrestaShop Klarna?', a: 'Ja – über Mollie oder das offizielle Klarna-Modul. Ratenkauf und Pay Later verfügbar.' },
      { q: 'Wie integriere ich Stripe in PrestaShop?', a: 'Über das offizielle Stripe-Modul im PrestaShop Marketplace. Installation in unter 30 Minuten.' },
      { q: 'Ist PrestaShop PCI-DSS-konform?', a: 'Die PCI-Compliance wird durch den PSP gewährleistet. Hosted Payment Pages von Mollie/Stripe vereinfachen die Compliance.' },
    ],
  },
  {
    slug: 'shopware',
    name: 'Shopware',
    type: 'Deutsche E-Commerce-Plattform',
    topPSPs: ['Mollie', 'Unzer', 'Stripe'],
    avgFee: 1.7,
    faq: [
      { q: 'Welcher PSP ist am besten für Shopware?', a: 'Mollie und Unzer bieten die besten Shopware-Plugins. Stripe ist die technisch flexibelste Lösung.' },
      { q: 'Was kostet Unzer für Shopware-Shops?', a: 'Unzer bietet individuelle Konditionen – besonders attraktiv für Shopware-Shops ab 50.000€ Monatsumsatz.' },
      { q: 'Unterstützt Shopware PayPal Plus?', a: 'Ja – PayPal bietet ein offizielles Shopware-Plugin mit PayPal, Lastschrift, Kreditkarte und Rechnung.' },
      { q: 'Wie optimiere ich den Checkout bei Shopware?', a: 'Express-Checkout (Apple Pay, Google Pay), lokale Zahlungsarten und Ratenkauf erhöhen die Conversion deutlich.' },
      { q: 'Kann ich bei Shopware den PSP wechseln?', a: 'Ja – Shopware-PSP-Wechsel dauert 1–3 Wochen. Die iCOM Group begleitet die Migration komplett.' },
    ],
  },
]

export function getPlatformBySlug(slug: string) {
  return platforms.find(p => p.slug === slug)
}
