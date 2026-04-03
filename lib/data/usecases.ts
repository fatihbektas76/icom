export interface UseCase {
  slug: string
  name: string
  description: string
  faq: Array<{ q: string; a: string }>
}

export const usecases: UseCase[] = [
  {
    slug: 'hotel',
    name: 'paybyMail für Hotels',
    description: 'Hotels nutzen paybyMail für Anzahlungen, No-Show-Gebühren, Minibar-Nachbelastungen und Buchungsbestätigungen per E-Mail.',
    faq: [
      { q: 'Wie funktioniert paybyMail für Hotels?', a: 'Das Hotel sendet einen sicheren Zahlungslink per E-Mail. Der Gast zahlt bequem per Kreditkarte – ideal für Anzahlungen und No-Show-Gebühren.' },
      { q: 'Ist paybyMail PCI-DSS-konform?', a: 'Ja – der Zahlungslink führt auf eine gehostete Payment Page des PSP. Das Hotel hat keinen Kontakt mit Kartendaten.' },
      { q: 'Wie reduziert paybyMail No-Shows?', a: 'Durch verbindliche Vorauszahlung per Zahlungslink sinkt die No-Show-Rate um 40–60%.' },
      { q: 'Was kostet paybyMail für Hotels?', a: 'Die Gebühren entsprechen den normalen Kreditkartengebühren (1,5–2,2%) ohne zusätzliche Kosten.' },
      { q: 'Kann paybyMail mit PMS-Systemen integriert werden?', a: 'Ja – führende PSPs wie Unzer und Adyen bieten Integrationen für Opera, Protel und weitere PMS.' },
    ],
  },
  {
    slug: 'handwerk',
    name: 'paybyMail für Handwerker',
    description: 'Handwerker nutzen paybyMail für Sofortzahlung nach Auftragsabschluss, Anzahlungen und Abschlagszahlungen per SMS oder E-Mail.',
    faq: [
      { q: 'Wie nutzen Handwerker paybyMail?', a: 'Nach Auftragsabschluss wird ein Zahlungslink per SMS/E-Mail an den Kunden gesendet. Zahlung erfolgt sofort per Karte.' },
      { q: 'Brauche ich als Handwerker ein Kartenterminal?', a: 'Nein – paybyMail funktioniert komplett ohne Hardware. Der Kunde zahlt über seinen Browser.' },
      { q: 'Wie schnell erhalte ich das Geld?', a: 'Auszahlung in 1–3 Werktagen auf Ihr Geschäftskonto.' },
      { q: 'Kann ich paybyMail für Anzahlungen nutzen?', a: 'Ja – senden Sie vor Auftragsbeginn einen Zahlungslink über den gewünschten Anzahlungsbetrag.' },
      { q: 'Was kostet paybyMail für Handwerker?', a: 'Ab 1,5% pro Transaktion ohne monatliche Fixkosten. Die Ersparnis durch schnellere Zahlungseingänge überwiegt.' },
    ],
  },
  {
    slug: 'arztpraxis',
    name: 'paybyMail für Arztpraxen',
    description: 'Arztpraxen nutzen paybyMail für IGeL-Leistungen, Eigenanteile, Laborkosten und Nachzahlungen ohne Terminal am Empfang.',
    faq: [
      { q: 'Wie funktioniert paybyMail in Arztpraxen?', a: 'Die Praxis sendet nach der Behandlung einen Zahlungslink per E-Mail. Patienten zahlen bequem von zuhause.' },
      { q: 'Für welche Leistungen eignet sich paybyMail?', a: 'IGeL-Leistungen, Eigenanteile, Laborkosten, Reisemedizin und alle privat abgerechneten Leistungen.' },
      { q: 'Ist paybyMail DSGVO-konform?', a: 'Ja – die Zahlungsabwicklung erfolgt über PCI-DSS-konforme PSPs. Keine Patientendaten werden auf Payment-Seiten übertragen.' },
      { q: 'Wie erstelle ich einen Zahlungslink?', a: 'Über das Dashboard des PSP: Betrag eingeben, Beschreibung hinzufügen, Link per E-Mail senden – in 30 Sekunden.' },
      { q: 'Reduziert paybyMail offene Posten?', a: 'Ja – durchschnittlich 60% schnellere Zahlungseingänge und 40% weniger Mahnungen.' },
    ],
  },
  {
    slug: 'dienstleister',
    name: 'paybyMail für Dienstleister',
    description: 'Berater, Agenturen und Freiberufler nutzen paybyMail für schnelle Rechnungsbegleichung per Zahlungslink.',
    faq: [
      { q: 'Wie hilft paybyMail Dienstleistern?', a: 'Statt auf Überweisung zu warten, senden Sie einen Zahlungslink. Kunden zahlen sofort per Karte.' },
      { q: 'Kann ich paybyMail mit meiner Buchhaltung verbinden?', a: 'Ja – PSPs wie Stripe bieten Zapier-Integrationen, Webhooks und direkte Anbindungen an Buchhaltungssoftware.' },
      { q: 'Was kostet paybyMail für Freelancer?', a: 'Ab 1,5% pro Transaktion. Keine Grundgebühr, keine Einrichtungskosten bei den meisten Anbietern.' },
      { q: 'Kann ich wiederkehrende Zahlungen per paybyMail einrichten?', a: 'Ja – viele PSPs bieten Abo-Links, die automatisch monatlich belasten (mit SEPA-Mandat oder Kartenautorisation).' },
      { q: 'Wie professionell wirkt paybyMail beim Kunden?', a: 'Sehr professionell – gebrandete Zahlungsseiten mit Ihrem Logo und individueller Beschreibung.' },
    ],
  },
]

export function getUseCaseBySlug(slug: string) {
  return usecases.find(u => u.slug === slug)
}
