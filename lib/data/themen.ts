export interface Thema {
  slug: string
  name: string
  description: string
  content: string
  faq: Array<{ q: string; a: string }>
}

export const themen: Thema[] = [
  {
    slug: 'interchange-fees',
    name: 'Interchange Fees erklärt',
    description: 'Alles über Interchange-Gebühren: Wie sie berechnet werden, EU-Regulierung und wie Unternehmen sie optimieren.',
    content: `Interchange Fees sind die Gebühren, die bei jeder Kartentransaktion von der Acquirer-Bank an die Issuer-Bank (kartenausgebende Bank) gezahlt werden. Sie bilden den größten Kostenfaktor bei Kartenzahlungen.

Die EU hat Interchange Fees 2015 reguliert: maximal 0,2% für Debitkarten und 0,3% für Kreditkarten bei EU-Karten. Für Non-EU-Karten (z.B. US-amerikanische Kreditkarten) gelten diese Obergrenzen nicht – hier können die Gebühren 1,5–2% betragen.

Beim Interchange++-Modell werden die tatsächlichen Interchange-Kosten transparent an den Händler weitergegeben, zuzüglich einer festen PSP-Marge. Dies ist bei hohem Volumen deutlich günstiger als Flat-Rate-Modelle, bei denen der PSP einen pauschalen Prozentsatz erhebt.`,
    faq: [
      { q: 'Was sind Interchange Fees?', a: 'Interchange Fees sind Gebühren, die bei Kartentransaktionen von der Acquirer-Bank an die Issuer-Bank gezahlt werden. In der EU max. 0,2% (Debit) bzw. 0,3% (Kredit).' },
      { q: 'Wer bezahlt die Interchange Fee?', a: 'Der Händler trägt die Interchange Fee indirekt über die MDR (Merchant Discount Rate) seines PSP.' },
      { q: 'Was ist der Unterschied zwischen Interchange++ und Flat-Rate?', a: 'Interchange++: tatsächliche IC + Scheme Fee + feste PSP-Marge. Flat-Rate: pauschaler Prozentsatz unabhängig von der Kartenart.' },
      { q: 'Ab wann lohnt sich Interchange++?', a: 'Ab ca. 50.000–100.000€ Monatsumsatz ist Interchange++ in der Regel günstiger als Flat-Rate.' },
      { q: 'Warum sind Non-EU-Karten teurer?', a: 'Die EU-Interchange-Regulierung gilt nur für EU-Karten. Karten aus den USA, UK (post-Brexit) oder Asien haben höhere Interchange Fees.' },
      { q: 'Kann ich Interchange Fees verhandeln?', a: 'Interchange Fees selbst sind nicht verhandelbar. Aber die PSP-Marge und die Scheme-Fee-Weitergabe sind verhandelbar.' },
    ],
  },
  {
    slug: 'psd2-sca',
    name: 'PSD2 & Strong Customer Authentication',
    description: 'PSD2-Richtlinie und SCA: Was Händler wissen müssen über starke Kundenauthentifizierung und 3D Secure.',
    content: `Die Payment Services Directive 2 (PSD2) ist die europäische Zahlungsdienstrichtlinie, die seit 2019 gilt. Ein zentrales Element ist die Strong Customer Authentication (SCA) – die Pflicht zur starken Kundenauthentifizierung bei elektronischen Zahlungen.

SCA erfordert mindestens zwei von drei Faktoren: Wissen (PIN/Passwort), Besitz (Smartphone/Karte) und Inhärenz (Fingerabdruck/Gesichtserkennung). In der Praxis wird SCA über 3D Secure 2.0 umgesetzt.

Für Händler bedeutet das: Jede Online-Kartenzahlung muss grundsätzlich per 3D Secure authentifiziert werden. Ausnahmen gibt es für Beträge unter 30€, wiederkehrende Zahlungen und risikobasierte Ausnahmen (Transaction Risk Analysis).`,
    faq: [
      { q: 'Was ist PSD2?', a: 'Die Payment Services Directive 2 ist die EU-Richtlinie für Zahlungsdienste, die u.a. starke Kundenauthentifizierung (SCA) vorschreibt.' },
      { q: 'Was bedeutet SCA für meinen Online-Shop?', a: 'Jede Online-Kartenzahlung muss per 3D Secure 2.0 authentifiziert werden – mit wenigen regulierten Ausnahmen.' },
      { q: 'Senkt 3D Secure meine Conversion-Rate?', a: '3DS 2.0 hat deutlich weniger Friction als 3DS 1.0. Die meisten Authentifizierungen laufen im Hintergrund (frictionless flow).' },
      { q: 'Gibt es Ausnahmen von SCA?', a: 'Ja: Beträge unter 30€ (bis 100€ kumuliert), wiederkehrende Zahlungen, TRA-Ausnahmen und whitelisted Merchants.' },
      { q: 'Wie implementiere ich 3D Secure?', a: 'Ihr PSP (Stripe, Mollie, Adyen) übernimmt die 3DS-Implementierung automatisch. Keine eigene Entwicklung nötig.' },
      { q: 'Reduziert SCA Chargebacks?', a: 'Ja – bei 3DS-authentifizierten Zahlungen verschiebt sich die Haftung für Betrug zum Kartenausgeber (Liability Shift).' },
    ],
  },
  {
    slug: 'pci-dss',
    name: 'PCI DSS Compliance',
    description: 'PCI DSS erklärt: Anforderungen, SAQ-Typen und wie Payment Service Provider die Compliance vereinfachen.',
    content: `Der Payment Card Industry Data Security Standard (PCI DSS) ist ein Sicherheitsstandard für alle Unternehmen, die Kreditkartendaten verarbeiten, speichern oder übertragen. Compliance ist Pflicht für jeden Händler, der Kartenzahlung akzeptiert.

Es gibt vier PCI-DSS-Levels, abhängig vom jährlichen Transaktionsvolumen. Die meisten KMUs fallen unter Level 4 (unter 20.000 E-Commerce-Transaktionen/Jahr) und müssen einen Self-Assessment Questionnaire (SAQ) ausfüllen.

Die einfachste Lösung: Hosted Payment Pages oder Stripe Elements nutzen. Dabei berühren Kartendaten nie Ihren Server, und Sie qualifizieren sich für den einfachsten SAQ-A.`,
    faq: [
      { q: 'Was ist PCI DSS?', a: 'Ein Sicherheitsstandard für Unternehmen, die Kreditkartendaten verarbeiten. Compliance ist für alle Kartenzahlungs-Akzeptanten Pflicht.' },
      { q: 'Welcher SAQ-Typ gilt für meinen Shop?', a: 'SAQ-A für Hosted Payment Pages (Stripe, Mollie), SAQ-A-EP für eingebettete Formulare, SAQ-D für eigene Kartenverarbeitung.' },
      { q: 'Wie werde ich PCI-DSS-konform?', a: 'Am einfachsten: Hosted Payment Pages nutzen. Kartendaten berühren nie Ihren Server – Sie qualifizieren sich für SAQ-A.' },
      { q: 'Was passiert bei Nicht-Compliance?', a: 'Geldstrafen bis 100.000€/Monat, erhöhte Transaktionsgebühren oder Verlust der Kartenakzeptanz.' },
      { q: 'Wie oft muss PCI DSS erneuert werden?', a: 'Jährlich – der SAQ muss jedes Jahr neu ausgefüllt und beim Acquirer/PSP eingereicht werden.' },
      { q: 'Hilft mein PSP bei PCI DSS?', a: 'Ja – Stripe, Mollie und Adyen stellen PCI-DSS-Compliance-Bescheinigungen bereit und vereinfachen den SAQ.' },
    ],
  },
  {
    slug: 'chargeback-management',
    name: 'Chargeback Management',
    description: 'Chargebacks verstehen, vermeiden und managen: Strategien für Online-Händler zur Minimierung von Rückbuchungen.',
    content: `Chargebacks (Rückbuchungen) entstehen, wenn ein Karteninhaber eine Transaktion bei seiner Bank bestreitet. Für Händler bedeutet das: Umsatzverlust plus Chargeback-Gebühr (15–25€ pro Fall).

Die häufigsten Chargeback-Gründe sind: Betrug (Friendly Fraud und echter Betrug), Produkt nicht erhalten, Produkt entspricht nicht der Beschreibung und doppelte Belastung.

Prävention ist entscheidend: 3D Secure reduziert Betrugs-Chargebacks durch Liability Shift. Klare Produktbeschreibungen, tracking-fähiger Versand und proaktiver Kundenservice senken die Quote deutlich.`,
    faq: [
      { q: 'Was ist ein Chargeback?', a: 'Eine Rückbuchung, die der Karteninhaber bei seiner Bank initiiert. Der Händler verliert den Betrag plus 15–25€ Gebühr.' },
      { q: 'Wie hoch darf die Chargeback-Rate sein?', a: 'Visa und Mastercard erlauben max. 1% (Anzahl) bzw. 0,9% (Volumen). Darüber droht das Monitoring-Programm.' },
      { q: 'Wie verhindere ich Chargebacks?', a: '3D Secure aktivieren, klare Produktbeschreibungen, Tracking-Nummern bereitstellen und proaktiven Kundenservice anbieten.' },
      { q: 'Was ist Friendly Fraud?', a: 'Wenn der echte Karteninhaber die Zahlung bestreitet, obwohl er die Ware erhalten hat. Macht ca. 40% aller Chargebacks aus.' },
      { q: 'Kann ich einen Chargeback anfechten?', a: 'Ja – mit Beweisen (Liefernachweis, Kommunikation, 3DS-Ergebnis) über die Representment-Funktion Ihres PSP.' },
      { q: 'Wie hilft 3D Secure bei Chargebacks?', a: 'Bei 3DS-authentifizierten Zahlungen haftet die Issuer-Bank (Liability Shift), nicht der Händler.' },
    ],
  },
  {
    slug: 'omnichannel-payment',
    name: 'Omnichannel Payment',
    description: 'Einheitliche Zahlungsabwicklung über alle Kanäle: Online-Shop, stationärer Handel und Mobile – aus einer Hand.',
    content: `Omnichannel Payment bedeutet: ein einziger PSP für alle Vertriebskanäle – Online-Shop, POS-Terminal, Mobile App und paybyMail. Das vereinfacht die Buchhaltung, bietet einheitliches Reporting und ermöglicht kanalübergreifende Kundenerlebnisse.

Führende Omnichannel-PSPs sind Adyen (Enterprise), Unzer (Mittelstand) und Stripe (Terminal + Online). Die Integration aller Kanäle in ein Dashboard spart nicht nur Zeit, sondern verbessert auch die Datenqualität für Finanzcontrolling.

Für Händler mit stationärem und Online-Geschäft lohnt sich Omnichannel besonders: einheitliche Konditionen, zentrale Auszahlung und die Möglichkeit, Online-Bestellungen im Laden abzuholen (Click & Collect) nahtlos zu unterstützen.`,
    faq: [
      { q: 'Was ist Omnichannel Payment?', a: 'Einheitliche Zahlungsabwicklung über alle Vertriebskanäle (Online, POS, Mobile, paybyMail) mit einem einzigen PSP.' },
      { q: 'Welcher PSP kann Omnichannel?', a: 'Adyen (Enterprise), Unzer (Mittelstand) und Stripe (Online + Terminal) sind die führenden Omnichannel-PSPs.' },
      { q: 'Was sind die Vorteile von Omnichannel Payment?', a: 'Einheitliches Reporting, zentrale Auszahlung, vereinfachte Buchhaltung und bessere Kundendaten.' },
      { q: 'Ist Omnichannel teurer als separate PSPs?', a: 'Nein – durch gebündeltes Volumen sind die Konditionen oft günstiger als bei getrennten Anbietern.' },
      { q: 'Wie implementiere ich Omnichannel Payment?', a: 'Die iCOM Group begleitet die Migration aller Kanäle zu einem Omnichannel-PSP in 4–8 Wochen.' },
      { q: 'Unterstützt Omnichannel Click & Collect?', a: 'Ja – der Kunde zahlt online und erhält die Ware im Laden. Der PSP verbindet beide Transaktionen automatisch.' },
    ],
  },
]

export function getThemaBySlug(slug: string) {
  return themen.find(t => t.slug === slug)
}
