const FEATURES = [
  {
        key: 'electricity',
        accent: 'teal',
        label: 'Electricity',
        title: 'Business Electricity',
        desc: 'Whole-of-market comparison on your commercial electricity contract, sized to your actual usage.',
  },
  {
        key: 'gas',
        accent: 'amber',
        label: 'Gas',
        title: 'Business Gas',
        desc: 'Compare commercial gas rates across UK suppliers, with renewal timing flagged so you avoid out-of-contract rates.',
  },
  {
        key: 'green',
        accent: 'emerald',
        label: 'Green Intermediary',
        title: 'Green Energy Options',
        desc: 'Renewable-backed tariff options reviewed alongside standard contracts, where available for your business.',
  },
  ];

const ACCENT_CLASSES = {
    teal: {
          badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
          icon: 'text-teal-300',
    },
    amber: {
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          icon: 'text-amber-300',
    },
    emerald: {
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          icon: 'text-emerald-300',
    },
};

export default function FeatureGrid() {
    return (
          <section className="bg-navy-950 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <span className="label-eyebrow">What We Compare</span>
            <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                  One Review, Every Option On The Table
      </h2>
            <p className="mt-3 text-navy-300">
                  Electricity, gas, or both - compared across the whole market, not
              a fixed supplier panel.
                </p>
                </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {FEATURES.map((f) => {
                            const accent = ACCENT_CLASSES[f.accent];
                            return (
                                            <div key={f.key} className="panel p-6 transition hover:border-white/20">
                                <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${accent.badge}`}
                >
{f.label}
</span>
                <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-navy-300">{f.desc}</p>
                <div className="mt-5 h-px w-full bg-white/10" />
                  <a
                  href="#lead-form"
                  className={`mt-5 inline-flex items-center gap-1 text-sm font-bold ${accent.icon} hover:underline`}
                >
                  Compare {f.label.toLowerCase()}
                  <span aria-hidden="true">&rarr;</span>
                    </a>
                    </div>
            );
})}
</div>
  </div>
  </section>
  );
}
