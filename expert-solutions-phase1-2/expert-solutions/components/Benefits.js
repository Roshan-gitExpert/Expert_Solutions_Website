const DEFAULT_BENEFITS = [
  { title: 'Whole-of-market approach', desc: 'We check multiple UK suppliers rather than working from one fixed price list.' },
  { title: 'Saves you time', desc: 'One conversation instead of calling round several suppliers yourself.' },
  { title: 'Renewal reminders', desc: 'We help make sure you don’t drift onto an out-of-contract rate without noticing.' },
  { title: 'Multi-site support', desc: 'One site or several - we can look at your whole portfolio together.' },
  { title: 'Plain-English guidance', desc: 'Clear explanations of what’s actually in a contract, so you can decide with confidence.' },
  { title: 'No cost to enquire', desc: 'Getting a review doesn’t cost your business a penny.' },
  ];

export default function Benefits({
    title = 'The Financial Risk of Waiting Until Your Contract Expires',
    intro = 'If a contract isn’t reviewed before it ends, it typically rolls onto the supplier’s out-of-contract rate - and those rates can run considerably higher than anything negotiated on the open market. Businesses that leave this to chance often end up overpaying for months simply because no one got in touch in time. A quick comparison now costs nothing and could spare you that bill.',
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
