'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { LEAD_STATUSES, STATUS_LABELS, STATUS_COLORS } from '@/lib/leadStatuses';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}
function daysAgoIso(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState([]);
  const [attributionByLead, setAttributionByLead] = useState({});
  const [agents, setAgents] = useState([]);
  const [visitorCount, setVisitorCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [dateFrom, setDateFrom] = useState(daysAgoIso(30));
  const [dateTo, setDateTo] = useState(todayIso());
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [campaignFilter, setCampaignFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');

    const fromIso = `${dateFrom}T00:00:00.000Z`;
    const toIso = `${dateTo}T23:59:59.999Z`;

    let query = supabase
      .from('leads')
      .select('*')
      .gte('created_at', fromIso)
      .lte('created_at', toIso)
      .order('created_at', { ascending: false })
      .limit(500);

    if (statusFilter !== 'ALL') query = query.eq('status', statusFilter);

    const [leadsRes, agentsRes, visitorsRes] = await Promise.all([
      query,
      supabase.from('users').select('id, full_name, role'),
      supabase
        .from('visitors')
        .select('id', { count: 'exact', head: true })
        .gte('first_seen_at', fromIso)
        .lte('first_seen_at', toIso),
    ]);

    if (leadsRes.error) {
      setErrorMsg(leadsRes.error.message);
      setLoading(false);
      return;
    }

    const leadRows = leadsRes.data || [];
    setAgents(agentsRes.data || []);
    setVisitorCount(typeof visitorsRes.count === 'number' ? visitorsRes.count : null);

    const leadIds = leadRows.map((l) => l.id);
    let attrByLead = {};
    if (leadIds.length > 0) {
      const { data: attrRows } = await supabase
        .from('campaign_attribution')
        .select('*')
        .in('lead_id', leadIds);
      (attrRows || []).forEach((row) => {
        attrByLead[row.lead_id] = row;
      });
    }
    setAttributionByLead(attrByLead);
    setLeads(leadRows);
    setLoading(false);
  }, [dateFrom, dateTo, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  // Live updates: a brand-new lead appears on the dashboard the
  // moment someone submits the form, without needing to refresh.
  useEffect(() => {
    const channel = supabase
      .channel('admin-leads-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        () => load()
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [load]);

  const filteredLeads = useMemo(() => {
    if (!campaignFilter.trim()) return leads;
    const needle = campaignFilter.trim().toLowerCase();
    return leads.filter((lead) => {
      const attr = attributionByLead[lead.id];
      return (
        (attr?.utm_campaign || '').toLowerCase().includes(needle) ||
        (attr?.utm_term || '').toLowerCase().includes(needle) ||
        (attr?.utm_source || '').toLowerCase().includes(needle)
      );
    });
  }, [leads, attributionByLead, campaignFilter]);

  const metrics = useMemo(() => {
    const today = todayIso();
    const isToday = (l) => (l.created_at || '').slice(0, 10) === today;
    return {
      today: leads.filter(isToday).length,
      newLeads: filteredLeads.filter((l) => l.status === 'NEW').length,
      qualified: filteredLeads.filter((l) => l.status === 'QUALIFIED').length,
      callsRequested: filteredLeads.filter((l) => l.source_type === 'callback').length,
      quotes: filteredLeads.filter((l) => l.status === 'QUOTE_REQUESTED').length,
      won: filteredLeads.filter((l) => l.status === 'WON').length,
      lost: filteredLeads.filter((l) => l.status === 'LOST').length,
    };
  }, [leads, filteredLeads]);

  const conversionRate =
    visitorCount && visitorCount > 0
      ? ((filteredLeads.length / visitorCount) * 100).toFixed(1)
      : null;

  function agentName(id) {
    if (!id) return '-';
    const agent = agents.find((a) => a.id === id);
    return agent ? agent.full_name : 'Unknown';
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Leads Dashboard</h1>
          <p className="text-sm text-navy-500">
            Live view of every enquiry submitted through the website.
          </p>
        </div>
      </div>

      {errorMsg && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{errorMsg}</p>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        <MetricCard label="Today's Leads" value={metrics.today} />
        <MetricCard label="New" value={metrics.newLeads} />
        <MetricCard label="Qualified" value={metrics.qualified} />
        <MetricCard label="Calls Requested" value={metrics.callsRequested} />
        <MetricCard label="Chats" value="—" hint="Phase 3" />
        <MetricCard label="Quotes" value={metrics.quotes} />
        <MetricCard label="Won" value={metrics.won} />
        <MetricCard label="Lost" value={metrics.lost} />
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
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-navy-600">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input !w-auto"
            >
              <option value="ALL">All statuses</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-navy-600">
              Campaign / keyword / source
            </span>
            <input
              type="text"
              placeholder="e.g. business_electricity_ppc"
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="input !w-64"
            />
          </label>
          <div className="ml-auto text-sm text-navy-500">
            {conversionRate !== null ? (
              <span>
                Conversion rate: <strong className="text-navy-900">{conversionRate}%</strong>{' '}
                ({filteredLeads.length} leads / {visitorCount} visitors)
              </span>
            ) : (
              <span>Conversion rate: not enough visitor data yet</span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-navy-100 text-xs uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Business / Contact</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Campaign / Keyword</th>
              <th className="px-4 py-3">Landing Page</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Agent</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-navy-400">
                  Loading leads...
                </td>
              </tr>
            )}
            {!loading && filteredLeads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-navy-400">
                  No leads match these filters yet.
                </td>
              </tr>
            )}
            {!loading &&
              filteredLeads.map((lead) => {
                const attr = attributionByLead[lead.id];
                return (
                  <tr key={lead.id} className="border-b border-navy-50 last:border-0 hover:bg-navy-50/50">
                    <td className="whitespace-nowrap px-4 py-3 text-navy-500">
                      {new Date(lead.created_at).toLocaleString('en-GB')}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-navy-900 hover:underline">
                        {lead.business_name || lead.contact_name || 'Unnamed lead'}
                      </Link>
                      <div className="text-xs text-navy-400">{lead.contact_name} - {lead.phone}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-navy-600">{lead.source_type}</td>
                    <td className="px-4 py-3 text-navy-600">
                      {attr?.utm_campaign || attr?.utm_source || '-'}
                      {attr?.utm_term ? <div className="text-xs text-navy-400">{attr.utm_term}</div> : null}
                    </td>
                    <td className="px-4 py-3 text-navy-600">{attr?.landing_page || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_COLORS[lead.status]}`}>
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-600">{agentName(lead.assigned_agent)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-navy-900">{value}</p>
      {hint && <p className="text-[11px] text-navy-300">{hint}</p>}
    </div>
  );
}
