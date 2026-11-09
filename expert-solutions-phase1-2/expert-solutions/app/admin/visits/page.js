'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}
function daysAgoIso(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

// Visit-level view, extending the existing admin dashboard rather
// than introducing a separate tool: one row per visitor, with their
// consent choice, approximate location/device, attribution, and -
// where one exists - the lead they went on to submit.
export default function VisitsPage() {
  const [visitors, setVisitors] = useState([]);
  const [leadByVisitor, setLeadByVisitor] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [dateFrom, setDateFrom] = useState(daysAgoIso(7));
  const [dateTo, setDateTo] = useState(todayIso());

  const load = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    const fromIso = `${dateFrom}T00:00:00.000Z`;
    const toIso = `${dateTo}T23:59:59.999Z`;

    const { data: visitorRows, error: visitorError } = await supabase
      .from('visitors')
      .select('*')
      .gte('first_seen_at', fromIso)
      .lte('first_seen_at', toIso)
      .order('first_seen_at', { ascending: false })
      .limit(200);

    if (visitorError) {
      setErrorMsg(visitorError.message);
      setLoading(false);
      return;
    }

    const rows = visitorRows || [];
    const visitorIds = rows.map((v) => v.id);
    let byVisitor = {};
    if (visitorIds.length > 0) {
      // is_test is a new column - fall back to selecting without it
      // until supabase/add_consent_geo_device_test_fields.sql has run.
      let leadsRes = await supabase
        .from('leads')
        .select('id, visitor_id, business_name, contact_name, is_test')
        .in('visitor_id', visitorIds);
      if (leadsRes.error && /is_test/i.test(leadsRes.error.message || '')) {
        leadsRes = await supabase
          .from('leads')
          .select('id, visitor_id, business_name, contact_name')
          .in('visitor_id', visitorIds);
      }
      (leadsRes.data || []).forEach((l) => {
        byVisitor[l.visitor_id] = l;
      });
    }

    setLeadByVisitor(byVisitor);
    setVisitors(rows);
    setLoading(false);
  }, [dateFrom, dateTo]);

  useEffect(() => {
    load();
  }, [load]);

  const summary = useMemo(() => {
    const withAds = visitors.filter((v) => v.first_gclid).length;
    const converted = visitors.filter((v) => leadByVisitor[v.id]).length;
    const analyticsConsented = visitors.filter((v) => v.analytics_consent).length;
    return { total: visitors.length, withAds, converted, analyticsConsented };
  }, [visitors, leadByVisitor]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Visits</h1>
          <p className="text-sm text-navy-500">
            Every tracked visitor (browser) in the selected period, their
            attribution, approximate location/device, and whether they went
            on to submit an enquiry.
          </p>
        </div>
      </div>

      {errorMsg && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{errorMsg}</p>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Visitors" value={summary.total} />
        <MetricCard label="From a Google Ad" value={summary.withAds} />
        <MetricCard label="Became a lead" value={summary.converted} />
        <MetricCard label="Allowed analytics" value={summary.analyticsConsented} />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-card">
        <div className="flex flex-wrap items-end gap-4">
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-navy-600">From</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input !w-auto"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-navy-600">To</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input !w-auto"
            />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="border-b border-navy-100 text-xs uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-4 py-3">First Seen</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">IP Address</th>
              <th className="px-4 py-3">Device</th>
              <th className="px-4 py-3">Pages</th>
              <th className="px-4 py-3">Campaign / gclid</th>
              <th className="px-4 py-3">Consent</th>
              <th className="px-4 py-3">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-navy-400">
                  Loading visits...
                </td>
              </tr>
            )}
            {!loading && visitors.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-navy-400">
                  No visits recorded in this period.
                </td>
              </tr>
            )}
            {!loading &&
              visitors.map((v) => {
                const lead = leadByVisitor[v.id];
                const location = [v.geo_city, v.geo_region, v.geo_country].filter(Boolean).join(', ');
                const pageCount = Array.isArray(v.pages_viewed) ? v.pages_viewed.length : 0;
                return (
                  <tr key={v.id} className="border-b border-navy-50 last:border-0 hover:bg-navy-50/50">
                    <td className="whitespace-nowrap px-4 py-3 text-navy-500">
                      {new Date(v.first_seen_at).toLocaleString('en-GB')}
                    </td>
                    <td className="px-4 py-3 text-navy-600">{location || 'Unknown'}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-navy-600">{v.ip_address || '-'}</td>
                    <td className="px-4 py-3 capitalize text-navy-600">
                      {v.device_type || '-'}
                      {v.browser ? <div className="text-xs text-navy-400">{v.browser} / {v.os}</div> : null}
                    </td>
                    <td className="px-4 py-3 text-navy-600">{pageCount}</td>
                    <td className="px-4 py-3 text-navy-600">
                      {v.last_utm_campaign || v.first_utm_campaign || '-'}
                      {v.last_gclid || v.first_gclid ? (
                        <div className="text-xs text-navy-400">has gclid</div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-navy-600">
                      {v.analytics_consent == null ? (
                        <span className="text-navy-300">Not recorded</span>
                      ) : (
                        <>
                          {v.analytics_consent ? 'Analytics ✓' : 'Analytics ✗'}
                          {' / '}
                          {v.ads_consent ? 'Ads ✓' : 'Ads ✗'}
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {lead ? (
                        <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-teal-700 hover:underline">
                          {lead.is_test ? 'TEST lead' : 'Became a lead'}
                        </Link>
                      ) : (
                        <span className="text-navy-300">No enquiry</span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-navy-900">{value}</p>
    </div>
  );
}
