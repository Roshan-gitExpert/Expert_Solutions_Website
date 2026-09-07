// Single source of truth for lead status values, shared between the
// database check constraint (supabase/schema.sql), the API routes,
// and every admin dashboard page.
export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'QUOTE_REQUESTED',
  'PROPOSAL',
  'WON',
  'LOST',
  'FOLLOW_UP',
];

export const STATUS_LABELS = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  QUOTE_REQUESTED: 'Quote Requested',
  PROPOSAL: 'Proposal',
  WON: 'Won',
  LOST: 'Lost',
  FOLLOW_UP: 'Follow-Up',
};

export const STATUS_COLORS = {
  NEW: 'bg-navy-100 text-navy-700',
  CONTACTED: 'bg-blue-100 text-blue-700',
  QUALIFIED: 'bg-teal-100 text-teal-700',
  QUOTE_REQUESTED: 'bg-amber-100 text-amber-800',
  PROPOSAL: 'bg-purple-100 text-purple-700',
  WON: 'bg-green-100 text-green-700',
  LOST: 'bg-red-100 text-red-700',
  FOLLOW_UP: 'bg-orange-100 text-orange-700',
};
