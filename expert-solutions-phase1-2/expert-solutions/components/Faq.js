'use client';

import { useState } from 'react';

const DEFAULT_FAQS = [
  {
        q: 'Is this service really free for my business?',
        a: 'Yes - there’s no charge for requesting a review, whether you use the form or call us directly.',
  },
  {
        q: 'Do you supply energy directly?',
        a: 'No. We work as an intermediary/broker, helping you compare and arrange commercial energy contracts. We don’t generate or supply energy ourselves.',
  },
  {
        q: 'Will I have to switch supplier?',
              a: 'No. You’re under no obligation to switch, or to do anything at all, after speaking with us. We’ll compare business electricity rates on your behalf so the review simply helps you make an informed choice.',
  },
  {
        q: 'What information will I need?',
              a: 'It helps to have your postcode, your current supplier (if you know it) and your renewal date - these are the details we use to compare business energy prices accurately, but we can still help even if a few are missing.',
  },
  {
        q: 'How long does switching take?',
              a: 'It depends on your current contract and notice period. Once a specialist understands your situation and has helped you find the cheapest business electricity supplier for your usage, they’ll give you a realistic timescale.',
  },
  {
        q: 'Do you work with businesses with multiple sites?',
        a: 'Yes - we can review energy for a single site or across a multi-site UK business.',
  },
  {
        q: 'What happens after I submit the form?',
        a: 'Someone on our team reviews your details, and a specialist then gets in touch to talk through your options and answer any questions.',
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
