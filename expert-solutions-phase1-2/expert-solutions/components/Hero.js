import ClickToCallGroup from './ClickToCallGroup';
import LeadForm from './LeadForm';

// Reusable PPC hero used on the homepage and every keyword landing
// page. `formVariant` lets each page tag its form submissions so you
// can see which landing page drove which lead once Supabase is wired
// up in Phase 2.
export default function Hero({
  eyebrow = 'UK Business & Commercial Energy',
  title,
  subtitle,
  formVariant,
  showForm = true,
}) {
  return (
    <section id="get-quote" className="relative overflow-hidden bg-navy-900">
      <BackgroundGraphic />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="inline-block rounded-full bg-teal-500/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-300">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-navy-200">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#lead-form"
              className="rounded-lg bg-amber-500 px-6 py-4 text-center text-base font-bold text-navy-950 shadow-card transition hover:bg-amber-400"
            >
              GET MY FREE ENERGY REVIEW
            </a>
          </div>
          <ClickToCallGroup location="hero" className="mt-4" />

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-navy-800 pt-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">Who we help</dt>
              <dd className="mt-1 text-sm font-bold text-white">UK businesses only</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">Energy types</dt>
              <dd className="mt-1 text-sm font-bold text-white">Electricity &amp; Gas</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-navy-400">Response time</dt>
              <dd className="mt-1 text-sm font-bold text-white">Fast callback</dd>
            </div>
          </dl>
        </div>

        {showForm && (
          <div id="lead-form" className="scroll-mt-24">
            <LeadForm variant={formVariant} />
          </div>
        )}
      </div>
    </section>
  );
}

function BackgroundGraphic() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0fb8a6" />
          <stop offset="100%" stopColor="#144379" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#heroGrad)" opacity="0.08" />
      {/* Simple UK city / industrial skyline silhouette */}
      <g fill="#0f3560" opacity="0.6">
        <rect x="40" y="480" width="60" height="180" />
        <rect x="110" y="420" width="40" height="240" />
        <rect x="160" y="500" width="80" height="160" />
        <rect x="250" y="380" width="50" height="280" />
        <rect x="980" y="440" width="70" height="220" />
        <rect x="1060" y="500" width="50" height="160" />
        <rect x="1120" y="400" width="60" height="260" />
      </g>
      {/* Energy bolt accent */}
      <polygon points="620,120 560,300 610,300 580,460 700,240 640,240 670,120" fill="#f5a524" opacity="0.5" />
    </svg>
  );
}
