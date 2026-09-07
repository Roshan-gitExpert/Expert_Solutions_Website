const DEFAULT_ITEMS = [
  'Your business name and postcode',
  'A contact name, phone number and business email',
  'Whether you need electricity, gas, or both',
  'Your current supplier and contract end date, if known',
  'An approximate idea of your energy spend or usage',
];

export default function WhatWeNeed({ items = DEFAULT_ITEMS }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-teal-50 p-8">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
          What Information We Need
        </h2>
        <p className="mt-3 text-navy-600">
          To give you the most useful review, it helps if you can provide:
        </p>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal-500 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm font-medium text-navy-700 sm:text-base">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-navy-500">
          Don&apos;t have everything to hand? That&apos;s fine - fill in what
          you can and a specialist can help with the rest.
        </p>
      </div>
    </section>
  );
}
