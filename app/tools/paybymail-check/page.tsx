'use client'

import { useState } from 'react'
import Link from 'next/link'

const questions = [
  { q: 'Akzeptieren Sie bereits Kartenzahlungen?', yes: 20, no: 10 },
  { q: 'Versenden Sie Rechnungen per E-Mail?', yes: 20, no: 5 },
  { q: 'Haben Sie Kunden, die nicht vor Ort bezahlen?', yes: 25, no: 5 },
  { q: 'Haben Sie Probleme mit verspäteten Zahlungen?', yes: 20, no: 5 },
  { q: 'Wünschen Sie sich eine Zahlungslösung ohne Hardware?', yes: 15, no: 5 },
]

export default function PayByMailCheckPage() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(questions.length).fill(null))
  const [showResult, setShowResult] = useState(false)

  const answered = answers.filter(a => a !== null).length
  const score = answers.reduce((sum, a, i) => sum + (a === null ? 0 : a ? questions[i].yes : questions[i].no), 0)

  const handleAnswer = (index: number, value: boolean) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
    if (newAnswers.every(a => a !== null)) {
      setShowResult(true)
    }
  }

  const reset = () => {
    setAnswers(new Array(questions.length).fill(null))
    setShowResult(false)
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-icom-dark">
          <Link href="/" className="hover:text-white transition-colors">Start</Link>
          <span className="mx-2">›</span>
          <span className="text-icom-gray">paybyMail-Check</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
          paybyMail-<span className="text-icom-accent">Check</span>
        </h1>
        <p className="text-lg text-icom-gray max-w-3xl mb-12">
          In 5 Fragen herausfinden, ob paybyMail die richtige Zahlungslösung für Ihr Unternehmen ist.
        </p>

        {!showResult ? (
          <div className="max-w-2xl space-y-6">
            {questions.map((question, i) => (
              <div key={i} className="bg-icom-card border border-icom-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-icom-accent/10 border border-icom-accent/20 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-icom-accent font-bold text-xs">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium mb-4">{question.q}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAnswer(i, true)}
                        className={`px-6 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          answers[i] === true
                            ? 'bg-icom-accent border-icom-accent text-white'
                            : 'bg-icom-black border-icom-border text-icom-gray hover:border-icom-accent'
                        }`}
                      >
                        Ja
                      </button>
                      <button
                        onClick={() => handleAnswer(i, false)}
                        className={`px-6 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          answers[i] === false
                            ? 'bg-icom-accent border-icom-accent text-white'
                            : 'bg-icom-black border-icom-border text-icom-gray hover:border-icom-accent'
                        }`}
                      >
                        Nein
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-sm text-icom-dark">{answered}/5 beantwortet</div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <div className="bg-icom-card border border-icom-border rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-icom-accent mb-4">{score}%</div>
              <h2 className="text-xl font-bold text-white mb-2">
                {score >= 80 ? 'paybyMail ist ideal für Sie!' :
                 score >= 50 ? 'paybyMail könnte sich lohnen.' :
                 'paybyMail ist möglicherweise nicht optimal.'}
              </h2>
              <p className="text-sm text-icom-gray mb-6">
                {score >= 80
                  ? 'Ihr Geschäftsmodell profitiert stark von Zahlungslinks. Kontaktieren Sie uns für eine kostenlose Einrichtung.'
                  : score >= 50
                  ? 'Es gibt einige Einsatzmöglichkeiten für paybyMail in Ihrem Geschäft. Lassen Sie uns die Details besprechen.'
                  : 'Andere Zahlungslösungen könnten besser passen. Wir beraten Sie gerne zu Alternativen.'}
              </p>

              {/* Score bar */}
              <div className="h-2 bg-icom-border rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-icom-accent rounded-full transition-all duration-700"
                  style={{ width: `${score}%` }}
                />
              </div>

              <div className="flex gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="inline-block bg-icom-accent hover:bg-icom-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  Kostenlose Beratung →
                </Link>
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-lg text-sm font-medium border border-icom-border text-icom-gray hover:border-icom-accent transition-colors"
                >
                  Nochmal starten
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-icom-card-dark border-y border-icom-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-4">Was ist paybyMail?</h2>
          <p className="text-sm text-icom-gray leading-relaxed mb-4">
            paybyMail ermöglicht es Unternehmen, sichere Zahlungslinks per E-Mail oder SMS an Kunden zu senden.
            Der Kunde klickt den Link und zahlt bequem per Kreditkarte, Lastschrift oder anderen Zahlungsarten –
            ohne dass das Unternehmen ein physisches Terminal oder einen Online-Shop benötigt.
          </p>
          <p className="text-sm text-icom-gray leading-relaxed">
            Die Lösung ist PCI-DSS-konform, DSGVO-konform und in wenigen Tagen einsatzbereit.
            Gebühren entsprechen den normalen Kreditkartengebühren ohne Aufschlag. Besonders geeignet
            für Hotels, Handwerker, Arztpraxen, Dienstleister und alle Branchen ohne festen Checkout-Punkt.
          </p>
        </div>
      </section>
    </>
  )
}
