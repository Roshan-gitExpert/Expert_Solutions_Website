// Dashboard-style "market trend" panel. This is an illustrative
// placeholder, not a live data feed - no real wholesale price figures
// exist yet. Renders as a styled chart container so the layout/visual
// language is locked in; swap `POINTS` for a real series (or wire up
// an API) once actual market data is available. Never present this
// as real pricing without replacing the data source.
const POINTS = [62, 58, 65, 70, 66, 74, 71, 78, 73, 80, 76, 84];
const WIDTH = 560;
const HEIGHT = 180;
const PADDING = 16;

function toPath(points) {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const stepX = (WIDTH - PADDING * 2) / (points.length - 1);

  return points
      .map((p, i) => {
              const x = PADDING + i * stepX;
              const y = HEIGHT - PADDING - ((p - min) / range) * (HEIGHT - PADDING * 2);
              return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
}

export default function MarketPriceTrend() {
    const linePath = toPath(POINTS);
    const areaPath = `${linePath} L${WIDTH - PADDING},${HEIGHT - PADDING} L${PADDING},${HEIGHT - PADDING} Z`;

  return (
        <div className="panel bg-grid-overlay p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="label-eyebrow">Market Intelligence</span>
            <h3 className="mt-3 text-lg font-bold text-white">
                Commercial Energy Price Trend
    </h3>
            <p className="mt-1 text-sm text-navy-300">
                Illustrative market movement. Your review uses live supplier
              rates, not this chart.
                </p>
                </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          Updated this quarter
                </div>
                </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-white/5">
                        <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Illustrative commercial energy price trend chart"
        >
                      <defs>
                        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0fb8a6" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#0fb8a6" stopOpacity="0" />
            </linearGradient>
            </defs>
{[0.25, 0.5, 0.75].map((f) => (
              <line
                                     key={f}
               x1={PADDING}
               x2={WIDTH - PADDING}
              y1={HEIGHT * f}
              y2={HEIGHT * f}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
                          ))}
          <path d={areaPath} fill="url(#trendFill)" />
                          <path d={linePath} fill="none" stroke="#22cdb8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </div>

      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">
                            Electricity
                </dt>
          <dd className="mt-1 text-sm font-bold text-white">Market-wide view</dd>
                </div>
        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">
                            Gas
                </dt>
          <dd className="mt-1 text-sm font-bold text-white">Market-wide view</dd>
                </div>
        <div>
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">
                            Green energy
                </dt>
          <dd className="mt-1 text-sm font-bold text-white">On request</dd>
                </div>
                </dl>
                </div>
  );
}
