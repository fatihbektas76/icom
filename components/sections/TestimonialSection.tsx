const testimonials = [
  {
    initials: 'WR',
    company: 'Weltbekanntes Reiseunternehmen',
    role: 'Hospitality / DACH-Region',
    text: 'Mit paybyMail von iCOM konnten wir unsere No-Show-Quote um mehr als die Hälfte senken. Der Zahlungsprozess läuft jetzt vollautomatisch – ohne einen einzigen manuellen Eingriff im Backoffice.',
    metric: '−52% No-Shows',
  },
  {
    initials: 'EC',
    company: 'E-Commerce-Unternehmen',
    role: 'Online-Retail / 2 Mio. € Umsatz p.a.',
    text: 'Dank iCOM haben wir unsere Paymentkosten um 20% gesenkt. Wir haben jetzt einen direkten Ansprechpartner – kein Warten in Hotlines, keine automatisierten Antworten. Einfach professionell.',
    metric: '−20% Payment-Kosten',
  },
  {
    initials: 'SA',
    company: 'SaaS-Anbieter',
    role: 'Software / Subscription-Modell',
    text: 'Seit wir mit iCOM arbeiten, laufen unsere Kartenzahlungen stabiler und deutlich günstiger. Wir haben endlich volle Transparenz über unsere Gebühren – und wissen genau, was wir wofür zahlen.',
    metric: '−31% MDR',
  },
]

export default function TestimonialSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Was unsere Kunden sagen</h2>
        <p className="text-icom-gray max-w-2xl mx-auto">
          Echte Ergebnisse, echte Unternehmen – anonymisiert aus Vertraulichkeitsgründen.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-[#0f0f0f] border border-[#1c1c1c] rounded-xl p-7 relative transition-colors duration-300 hover:border-[#2a2a2a]"
          >
            {/* Quote icon */}
            <svg
              className="absolute top-5 right-5"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="rgba(240,82,82,0.3)"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>

            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="text-[#F05252] text-[13px]">★</span>
              ))}
            </div>

            {/* Quote text */}
            <p className="text-sm text-[#C8C8C8] leading-relaxed mb-5">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Divider */}
            <div className="border-t border-[#1c1c1c] pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-[#1c1c1c] flex items-center justify-center">
                  <span className="text-[#F05252] text-xs font-semibold">{t.initials}</span>
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{t.company}</div>
                  <div className="text-[11px] text-[#555]">{t.role}</div>
                </div>
              </div>

              {/* Metric Badge */}
              <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-md px-2.5 py-1">
                <span className="text-[#F05252] text-[11px] font-semibold">{t.metric}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
