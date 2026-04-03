export interface PSPVergleich {
  slug: string
  psp1: string
  psp2: string
  title: string
  description: string
}

export const pspKombinationen: PSPVergleich[] = [
  { slug: 'stripe-vs-paypal', psp1: 'stripe', psp2: 'paypal', title: 'Stripe vs. PayPal', description: 'Detaillierter Vergleich: Stripe und PayPal im Gebühren-, Feature- und Integrations-Check.' },
  { slug: 'stripe-vs-mollie', psp1: 'stripe', psp2: 'mollie', title: 'Stripe vs. Mollie', description: 'Stripe oder Mollie? Gebühren, Zahlungsarten und Integration im direkten Vergleich.' },
  { slug: 'stripe-vs-adyen', psp1: 'stripe', psp2: 'adyen', title: 'Stripe vs. Adyen', description: 'Flat-Rate vs. Interchange++: Wann Stripe, wann Adyen die bessere Wahl ist.' },
  { slug: 'mollie-vs-paypal', psp1: 'mollie', psp2: 'paypal', title: 'Mollie vs. PayPal', description: 'Europäischer Fokus vs. globale Reichweite: Mollie und PayPal im Vergleich.' },
  { slug: 'adyen-vs-unzer', psp1: 'adyen', psp2: 'unzer', title: 'Adyen vs. Unzer', description: 'Enterprise vs. Mittelstand: Adyen und Unzer für den deutschen Markt im Vergleich.' },
  { slug: 'sumup-vs-zettle', psp1: 'sumup', psp2: 'sumup', title: 'SumUp vs. Zettle', description: 'Mobile Kartenterminals im Vergleich: SumUp und Zettle für kleine Unternehmen.' },
  { slug: 'stripe-vs-unzer', psp1: 'stripe', psp2: 'unzer', title: 'Stripe vs. Unzer', description: 'Tech-First vs. DACH-Spezialist: Stripe und Unzer im umfassenden Vergleich.' },
  { slug: 'adyen-vs-stripe', psp1: 'adyen', psp2: 'stripe', title: 'Adyen vs. Stripe', description: 'Interchange++ gegen Flat-Rate: Welcher PSP passt besser zu Ihrem Geschäftsmodell?' },
  { slug: 'mollie-vs-unzer', psp1: 'mollie', psp2: 'unzer', title: 'Mollie vs. Unzer', description: 'Zwei europäische PSPs im Vergleich: Features, Gebühren und Support.' },
  { slug: 'paypal-vs-klarna', psp1: 'paypal', psp2: 'paypal', title: 'PayPal vs. Klarna', description: 'Checkout-Optimierung: PayPal und Klarna als Zahlungsoptionen im Vergleich.' },
]

export function getVergleichBySlug(slug: string) {
  return pspKombinationen.find(v => v.slug === slug)
}
