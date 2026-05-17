'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Do you offer car photography in Westchester?',
    a: 'Yes. Roan Merluccio offers automotive photography across Westchester County, including Bronxville, New Rochelle, White Plains, Yonkers, and nearby areas.',
  },
  {
    q: 'Do you work with dealerships and automotive brands?',
    a: 'Yes. I provide vehicle listing photos, dealership media, social media content, and automotive video for dealerships, brands, and local automotive businesses.',
  },
  {
    q: 'Do you offer rolling shots?',
    a: 'Yes. Rolling shots and automotive action content are available depending on the vehicle, location, and shoot details.',
  },
  {
    q: 'Do you cover motorsport and Formula SAE?',
    a: 'Yes. I create motorsport-style photo and video content for teams, events, builds, sponsors, and Formula SAE projects.',
  },
  {
    q: 'Do you travel for shoots?',
    a: 'Yes. I serve Westchester County, NYC, Connecticut, Rochester, and nearby areas.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="px-6 py-16 border-t border-surface-2" aria-label="Frequently asked questions">
      <p className="text-xs tracking-widest uppercase text-accent mb-2">FAQ</p>
      <h2 className="font-display text-4xl uppercase text-white mb-8">Common Questions</h2>
      <dl className="max-w-3xl space-y-1">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-surface-2 bg-surface">
            <dt>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-medium tracking-wide text-white hover:text-accent transition-colors"
                aria-expanded={open === i}
              >
                {faq.q}
                <span className="ml-4 text-accent font-display text-xl">{open === i ? '−' : '+'}</span>
              </button>
            </dt>
            {open === i && (
              <dd className="px-5 pb-4 text-sm text-muted leading-relaxed">
                {faq.a}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  )
}
