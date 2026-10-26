'use client';

import { useEffect, useState } from 'react';

const FUEL_STYLES = {
      wind: { label: 'Wind', bar: 'bg-teal-400' },
      gas: { label: 'Gas', bar: 'bg-amber-400' },
      nuclear: { label: 'Nuclear', bar: 'bg-emerald-400' },
      solar: { label: 'Solar', bar: 'bg-yellow-300' },
      biomass: { label: 'Biomass', bar: 'bg-lime-400' },
      hydro: { label: 'Hydro', bar: 'bg-sky-400' },
      imports: { label: 'Imports', bar: 'bg-violet-400' },
      coal: { label: 'Coal', bar: 'bg-rose-400' },
      other: { label: 'Other', bar: 'bg-navy-400' },
};

const INDEX_STYLES = {
      'very low': 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
      low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
      moderate: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      high: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
      'very high': 'border-rose-500/30 bg-rose-500/10 text-rose-300',
};

function formatTime(iso) {
      if (!iso) return '';
      try {
              return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      } catch {
              return '';
      }
}

export default function MarketPriceTrend() {
      const [data, setData] = useState(null);
      const [error, setError] = useState(false);

  useEffect(() => {
          let cancelled = false;

                async function load() {
                          try {
                                      const res = await fetch('/api/grid-mix', { cache: 'no-store' });
                                      if (!res.ok) throw new Error('bad response');
                                      const json = await res.json();
                                      if (!cancelled) {
                                                    setData(json);
                                                    setError(false);
                                      }
                          } catch {
                                      if (!cancelled) setError(true);
                          }
                }

                load();
          const interval = setInterval(load, 5 * 60 * 1000);
          return () => {
                    cancelled = true;
                    clearInterval(interval);
          };
  }, []);

  const mix = (data?.generationmix || []).slice().sort((a, b) => b.perc - a.perc);
      const indexKey = (data?.intensity?.index || '').toLowerCase();

  return (
          <div className="panel bg-grid-overlay p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="label-eyebrow">Live Grid Data</span>
              <h3 className="mt-3 text-lg font-bold text-white">
                  Live UK Power Generation Mix &amp; Grid Demand
      </h3>
              <p className="mt-1 max-w-xl text-sm text-navy-300">
                  Real-time figures below track Great Britain&apos;s power sources and grid carbon
                intensity straight from the National Grid ESO system, to support corporate energy
                strategy.
                    </p>
                    </div>

    {data?.intensity && (
                  <div
                 className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${
                                   INDEX_STYLES[indexKey] || 'border-navy-400/30 bg-navy-400/10 text-navy-300'
                 }`}
              >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              {data.intensity.actual ?? data.intensity.forecast} gCO2/kWh &middot; {data.intensity.index}
    </div>
            )}
</div>

      <div className="mt-6 rounded-lg border border-white/5 p-5 sm:p-6">
{error && (
              <p className="text-sm text-navy-300">
                Live grid data is temporarily unavailable. Please check back shortly.
    </p>
        )}

{!error && !data && <p className="text-sm text-navy-300">Loading live grid data&hellip;</p>}

 {!error && data && mix.length > 0 && (
               <div className="space-y-4">
 {mix.map((item) => {
                   const style = FUEL_STYLES[item.fuel] || { label: item.fuel, bar: 'bg-navy-400' };
                   return (
                                       <div key={item.fuel}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-semibold text-white">{style.label}</span>
                              <span className="font-bold text-navy-300">{item.perc.toFixed(1)}%</span>
          </div>
                            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className={`h-full rounded-full ${style.bar}`}
                       style={{ width: `${Math.min(Math.max(item.perc, 0), 100)}%` }}
                    />
                        </div>
                        </div>
              );
})}
</div>
        )}
</div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-navy-400">
            <span>Source: National Grid ESO Carbon Intensity API</span>
{data?.to && <span>Settlement period to {formatTime(data.to)}</span>}
    </div>
    </div>
   );
}
