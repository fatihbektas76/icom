export interface POSTyp {
  slug: string
  name: string
  description: string
  avgCost: string
  faq: Array<{ q: string; a: string }>
}

export const posTypen: POSTyp[] = [
  {
    slug: 'stationaer',
    name: 'Stationäres Terminal',
    description: 'Fest installierte Kartenterminals für Ladengeschäfte, Restaurants und stationären Handel.',
    avgCost: '19,90–39,90 €/Monat',
    faq: [
      { q: 'Was kostet ein stationäres Kartenterminal?', a: 'Mietgeräte ab 19,90€/Monat, Kaufgeräte ab 299€ einmalig. SumUp ab 39€ ohne Monatsgebühr.' },
      { q: 'Welche Anschlüsse braucht ein stationäres Terminal?', a: 'WLAN, LAN oder SIM-Karte. Die meisten modernen Terminals unterstützen alle drei Optionen.' },
      { q: 'Wie schnell ist ein stationäres Terminal?', a: 'Kontaktlose Zahlungen (NFC) in unter 3 Sekunden, Chip-Zahlungen in 5–8 Sekunden.' },
      { q: 'Welche Karten werden akzeptiert?', a: 'Visa, Mastercard, girocard, American Express, Apple Pay, Google Pay – je nach Terminal und PSP.' },
      { q: 'Brauche ich einen separaten Drucker?', a: 'Die meisten Terminals haben integrierte Bondrucker. Alternativ digitale Belege per E-Mail oder SMS.' },
    ],
  },
  {
    slug: 'mobil',
    name: 'Mobiles Terminal',
    description: 'Tragbare Kartenterminals für Lieferservice, Außendienst und mobile Geschäfte.',
    avgCost: '39–79 € einmalig',
    faq: [
      { q: 'Was kostet ein mobiles Kartenterminal?', a: 'SumUp Air: 39€, Zettle Reader: 29€, myPOS Go: 39€. Keine monatlichen Fixkosten bei diesen Anbietern.' },
      { q: 'Wie lange hält der Akku eines mobilen Terminals?', a: 'SumUp Air: ca. 500 Transaktionen, Zettle Reader: ca. 8 Stunden Dauerbetrieb.' },
      { q: 'Brauche ich ein Smartphone für mobile Terminals?', a: 'SumUp Air und Zettle Reader benötigen ein Smartphone via Bluetooth. myPOS Go funktioniert standalone.' },
      { q: 'Funktioniert ein mobiles Terminal ohne Internet?', a: 'Einige Terminals unterstützen Offline-Modus mit späterer Synchronisation, andere brauchen stets Verbindung.' },
      { q: 'Welches mobile Terminal ist das beste?', a: 'SumUp Air für Einsteiger, myPOS Go für Standalone-Nutzung, Zettle für das Apple-Ökosystem.' },
    ],
  },
  {
    slug: 'kasse',
    name: 'Kassensystem mit Payment',
    description: 'Integrierte Kassensysteme mit Warenwirtschaft, Kartenzahlung und Buchhaltungsanbindung.',
    avgCost: '49–149 €/Monat',
    faq: [
      { q: 'Was kostet ein Kassensystem mit Kartenzahlung?', a: 'Cloud-Kassen ab 49€/Monat inkl. Terminal, Premium-Systeme ab 99€/Monat mit Warenwirtschaft.' },
      { q: 'Welches Kassensystem eignet sich für Gastro?', a: 'Lightspeed, orderbird und SumUp POS sind speziell für Gastronomie optimiert.' },
      { q: 'Kann ich mein bestehendes Kassensystem mit Kartenzahlung nachrüsten?', a: 'Ja – über ZVT/OPI-Schnittstellen lassen sich die meisten Kassen mit externen Terminals verbinden.' },
      { q: 'Brauche ich eine TSE für mein Kassensystem?', a: 'Ja – seit 2020 ist eine Technische Sicherheitseinrichtung (TSE) für alle elektronischen Kassen Pflicht.' },
      { q: 'Welche Vorteile hat ein integriertes Kassensystem?', a: 'Automatische Umsatzerfassung, Warenwirtschaft, Mitarbeiter-Management und Buchhaltungsexport aus einem System.' },
    ],
  },
  {
    slug: 'selbstbedienung',
    name: 'Self-Checkout / Kiosk',
    description: 'Unbemannte Bezahlterminals für Selbstbedienung, Kioske und Automaten.',
    avgCost: '199–499 €/Monat',
    faq: [
      { q: 'Was kostet ein Self-Checkout-Terminal?', a: 'Hardware ab 2.000€, dazu monatliche Softwarelizenz ab 99€ und Payment-Gebühren.' },
      { q: 'Für welche Branchen eignet sich Self-Checkout?', a: 'Supermärkte, Kantinen, Hotels (Check-in/out), Parkplätze, Wäschereien und Automaten.' },
      { q: 'Welcher PSP unterstützt Self-Checkout?', a: 'Adyen, Worldline und Unzer bieten spezielle Unattended-Terminal-Lösungen.' },
      { q: 'Wie sicher ist Self-Checkout?', a: 'PCI-DSS-konforme Terminals mit Verschlüsselung. Kontaktloses Bezahlen minimiert Manipulationsrisiken.' },
      { q: 'Kann ich Self-Checkout mit meiner Kasse verbinden?', a: 'Ja – über APIs und Standard-Schnittstellen lässt sich Self-Checkout in bestehende Systeme integrieren.' },
    ],
  },
]

export function getPOSTypBySlug(slug: string) {
  return posTypen.find(p => p.slug === slug)
}
