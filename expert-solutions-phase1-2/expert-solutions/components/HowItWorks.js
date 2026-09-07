const DEFAULT_STEPS = [
  {
    step: '1',
    title: 'Tell us about your business',
    desc: 'Complete our short online form or call us directly. It takes about two minutes.',
  },
  {
    step: '2',
    title: 'We review your options',
    desc: 'One of our energy specialists looks at your current contract, usage and renewal date.',
  },
  {
    step: '3',
    title: 'Speak to a specialist',
    desc: 'We call you to talk through your options in plain English - no pressure, no obligation.',
  },
];

export default function HowItWorks({ steps = DEFAULT_STEPS, title = 'How It Works' }) {
  return (
    <section className="bg-navy-50/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-navy-900 sm:text-3xl">{title}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="relative rounded-2xl bg-white p-6 shadow-card">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-lg font-black text-teal-300">
                {s.step}
              </span>
              <h3 className="mb-2 text-lg font-bold text-navy-900">{s.title}</h3>
              <p className="text-sm text-navy-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
