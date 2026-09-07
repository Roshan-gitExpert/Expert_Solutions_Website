'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { LEAD_STATUSES, STATUS_LABELS, STATUS_COLORS } from '@/lib/leadStatuses';

export default function LeadDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [lead, setLead] = useState(null);
  const [attribution, setAttribution] = useState(null);
  const [history, setHistory] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState(false);
  const [note, setNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function load() {
    setLoading(true);
    const [leadRes, attrRes, historyRes, agentsRes] = await Promise.all([
      supabase.from('leads').select('*').eq('id', id).single(),
      supabase.from('campaign_attribution').select('*').eq('lead_id', id).maybeSingle(),
      supabase
        .from('lead_status_history')
        .select('*')
        .eq('lead_id', id)
        .order('created_at', { ascending: false }),
      supabase.from('users').select('id, full_name, role'),
    ]);

    if (leadRes.error) {
      setErrorMsg(leadRes.error.message);
      setLoading(false);
      return;
    }

    setLead(leadRes.data);
    setAttribution(attrRes.data || null);
    setHistory(historyRes.data || []);
    setAgents(agentsRes.data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function updateStatus(newStatus) {
    if (!lead || newStatus === lead.status) return;
    setSavingStatus(true);
    setErrorMsg('');

    const { data: userData } = await supabase.auth.getUser();
    const changedBy = userData?.user?.id || null;

    const { error: updateError } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', lead.id);

    if (updateError) {
      setErrorMsg(updateError.message);
      setSavingStatus(false);
      return;
    }

    await supabase.from('lead_status_history').insert({
      lead_id: lead.id,
      old_status: lead.status,
      new_status: newStatus,
      changed_by: changedBy,
      note: note || null,
    });

    setNote('');
    setSavingStatus(false);
    load();
  }

  async function updateAgent(agentId) {
    if (!lead) return;
    await supabase.from('leads').update({ assigned_agent: agentId || null }).eq('id', lead.id);
    load();
  }

  if (loading) {
    return <p className="text-navy-400">Loading lead...</p>;
  }

  if (errorMsg && !lead) {
    return <p className="text-red-600">{errorMsg}</p>;
  }

  if (!lead) {
    return <p className="text-navy-400">Lead not found.</p>;
  }

  return (
    <div>
      <button
        onClick={() => router.push('/admin')}
        className="mb-4 text-sm font-semibold text-navy-500 hover:text-navy-800"
      >
        &larr; Back to dashboard
      </button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">
            {lead.business_name || lead.contact_name}
          </h1>
          <p className="text-sm text-navy-500">
            Submitted {new Date(lead.created_at).toLocaleString('en-GB')} via{' '}
            <span className="capitalize">{lead.source_type}</span>
            {lead.landing_page_variant ? ` (${lead.landing_page_variant})` : ''}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-sm font-bold ${STATUS_COLORS[lead.status]}`}>
          {STATUS_LABELS[lead.status]}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Contact & Business Details">
            <DetailGrid
              items={[
                ['Business name', lead.business_name],
                ['Postcode', lead.postcode],
                ['Contact name', lead.contact_name],
                ['Phone', lead.phone],
                ['Email', lead.email],
                ['Business type', lead.business_type],
              ]}
            />
          </Card>

          <Card title="Energy Details">
            <DetailGrid
              items={[
                ['Energy type', lead.energy_type],
                ['Approx. spend', lead.spend_range],
                ['Current supplier', lead.current_supplier],
                ['Contract end date', lead.contract_end_date],
                ['Number of sites', lead.number_of_sites],
                ['Annual consumption', lead.annual_consumption],
                ['Best time to contact', lead.best_time_to_contact],
              ]}
            />
          </Card>

          <Card title="PPC Attribution">
            {attribution ? (
              <DetailGrid
                items={[
                  ['Google Click ID (gclid)', attribution.gclid],
                  ['UTM source', attribution.utm_source],
                  ['UTM medium', attribution.utm_medium],
                  ['UTM campaign', attribution.utm_campaign],
                  ['UTM term / keyword', attribution.utm_term],
                  ['UTM content', attribution.utm_content],
                  ['Landing page', attribution.landing_page],
                  ['First page visited', attribution.first_page_visited],
                  ['Conversion page', attribution.conversion_page],
                ]}
              />
            ) : (
              <p className="text-sm text-navy-400">No attribution data captured for this lead.</p>
            )}
          </Card>

          <Card title="Pages Visited, Engagement Score & Chat History">
            <p className="text-sm text-navy-400">
              Coming in Phase 3 / Phase 4 - visitor page-by-page journey,
              engagement scoring, and live chat transcripts will appear here
              once those phases are built.
            </p>
          </Card>

          <Card title="Status History">
            {history.length === 0 ? (
              <p className="text-sm text-navy-400">No status changes yet.</p>
            ) : (
              <ul className="space-y-3">
                {history.map((h) => (
                  <li key={h.id} className="border-b border-navy-50 pb-3 text-sm last:border-0">
                    <span className="font-semibold text-navy-800">
                      {h.old_status ? `${STATUS_LABELS[h.old_status]} -> ` : ''}
                      {STATUS_LABELS[h.new_status] || h.new_status}
                    </span>
                    <span className="ml-2 text-navy-400">
                      {new Date(h.created_at).toLocaleString('en-GB')}
                    </span>
                    {h.note && <p className="mt-1 text-navy-500">{h.note}</p>}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Update Status">
            <select
              value={lead.status}
              disabled={savingStatus}
              onChange={(e) => updateStatus(e.target.value)}
              className="input mb-3"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note about this update..."
              className="input mb-3 min-h-[80px]"
            />
            {errorMsg && <p className="mb-3 text-sm text-red-600">{errorMsg}</p>}
            <p className="text-xs text-navy-400">
              Changing the status above saves immediately and is recorded in
              the status history.
            </p>
          </Card>

          <Card title="Assigned Agent">
            <select
              value={lead.assigned_agent || ''}
              onChange={(e) => updateAgent(e.target.value)}
              className="input"
            >
              <option value="">Unassigned</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.full_name}
                </option>
              ))}
            </select>
          </Card>

          <Card title="Quick Actions">
            <div className="space-y-2">
              <a
                href={`tel:${lead.phone}`}
                className="block rounded-lg bg-navy-800 px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-navy-700"
              >
                Call {lead.phone}
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="block rounded-lg border border-navy-200 px-4 py-2.5 text-center text-sm font-bold text-navy-700 hover:bg-navy-50"
              >
                Email {lead.email}
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-navy-400">{title}</h2>
      {children}
    </div>
  );
}

function DetailGrid({ items }) {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt className="text-xs font-semibold text-navy-400">{label}</dt>
          <dd className="text-sm text-navy-800">{value || '-'}</dd>
        </div>
      ))}
    </dl>
  );
}
