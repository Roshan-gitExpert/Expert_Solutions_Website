'use client';

import { useState } from 'react';

const DEFAULT_FAQS = [
  {
    q: 'Is this service really free for my business?',
    a: 'Yes. There is no cost to your business for requesting a review of your energy options through our form or over the phone.',
  },
  {
    q: 'Do you supply energy directly?',
    a: 'No. We act as an intermediary/broker and help compare and arrange business energy contracts on your behalf. We do not generate or supply energy ourselves.',
  },
  {
    q: 'Will I have to switch supplier?',
    a: 'No. You are under no obligation to switch or take any action after speaking with us. The review is designed to help you make an informed decision.',
  },
  {
    q: 'What information will I need?',
    a: 'It helps to have your postcode, current supplier name (if known) and your contract renewal date, but we can still help if you are not sure of every detail.',
  },
  {
    q: 'How long does switching take?',
    a: 'This varies depending on your current contract type and notice period. A specialist will explain the likely timescale for your specific business once they understand your current contract.',
  },
  {
    q: 'Do you work with businesses with multiple sites?',
    a: 'Yes. We can review energy across single or multi-site UK businesses.',
  },
  {
    q: 'What happens after I submit the form?',
    a: 'A member of our team will review your details and a specialist will contact you, usually by phone, to discuss your options and answer any questions.',
  },
];

export default function Faq({ faqs = DEFAULT_FAQS, title = 'Frequently Asked Questions' }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="bg-navy-50/60">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-navy-900 sm:text-3xl">{title}</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-xl border border-navy-100 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-navy-900 sm:text-base">{item.q}</span>
                  <span className="flex-none text-xl font-bold text-teal-500">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-navy-500">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
