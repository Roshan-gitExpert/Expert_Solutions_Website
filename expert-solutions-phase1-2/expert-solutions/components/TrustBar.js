const ITEMS = [
  {
    title: 'Business energy specialists',
    desc: 'We deal exclusively with UK commercial energy - not domestic households.',
  },
  {
    title: 'No obligation',
    desc: 'A free review of your options. You decide what happens next.',
  },
  {
    title: 'Real specialists, not a script',
    desc: 'Your enquiry is handled by a named energy specialist who calls you directly.',
  },
  {
    title: 'Your data, protected',
    desc: 'Your details are only used to prepare your business energy review.',
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-navy-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex gap-3">
              <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-navy-900">{item.title}</p>
                <p className="text-sm text-navy-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-navy-400">
          [Space reserved for supplier / accreditation / trade body logos once
          supplied - none shown to avoid implying unverified affiliations.]
        </p>
      </div>
    </section>
  );
}
