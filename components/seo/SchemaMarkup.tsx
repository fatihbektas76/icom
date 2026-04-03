export function OrganizationSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FinancialService',
      name: 'iCOM Group – Payment Beratung',
      description: 'Unabhängige Payment-Beratung: PSP-Vergleich, Kostenoptimierung, E-Commerce & POS',
      url: 'https://icom-group.net',
      telephone: '+4915152820216',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1 Place du Marché',
        addressLocality: 'Grevenmacher',
        postalCode: 'L-6755',
        addressCountry: 'LU',
      },
      areaServed: { '@type': 'Country', name: 'Germany' },
      knowsAbout: ['Payment Processing', 'E-Commerce Payments', 'POS Systems', 'Payment Service Provider', 'Interchange Fees', 'paybyMail'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
      },
    })}} />
  )
}

export function FAQSchema({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })}} />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    })}} />
  )
}
