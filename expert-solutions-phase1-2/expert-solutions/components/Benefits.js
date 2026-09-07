const DEFAULT_BENEFITS = [
  { title: 'Whole-of-market approach', desc: 'We look across multiple UK suppliers rather than a single price list.' },
  { title: 'Saves you time', desc: 'One conversation instead of chasing multiple suppliers yourself.' },
  { title: 'Renewal reminders', desc: 'We help make sure your business doesn’t roll onto an out-of-contract rate.' },
  { title: 'Multi-site support', desc: 'Whether you have one site or several, we can look at your full portfolio.' },
  { title: 'Plain-English guidance', desc: 'Clear explanations of contract terms, so you can make an informed decision.' },
  { title: 'No cost to enquire', desc: 'Getting a review of your options does not cost your business anything.' },
];

export default function Benefits({
  title = 'Why Review Your Business Energy?',
  intro = 'Business energy contracts can roll over onto significantly higher out-of-contract rates if they are not reviewed ahead of renewal. A quick comparison could help your business make a more informed decision.',
  benefits = DEFAULT_BENEFITS,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{title}</h2>
        <p className="mt-4 text-navy-500">{intro}</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border border-navy-100 p-6 transition hover:border-teal-300 hover:shadow-card">
            <h3 className="mb-2 text-base font-bold text-navy-900">{b.title}</h3>
            <p className="text-sm text-navy-500">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
