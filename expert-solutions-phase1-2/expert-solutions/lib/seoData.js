// ============================================================
// SEO CONTENT ARCHITECTURE - single source of truth
// ------------------------------------------------------------
// Every trigger, sector and location page is registered here so
// that: (a) the hub pages (/sectors, /locations) can list them,
// (b) the sitemap can include them automatically, and (c) the
// RelatedLinks component can cross-link between them without
// hard-coding URLs in a dozen different files.
//
// Factual claims here (DNO operators) are sourced from public
// Energy Networks Association / Ofgem-published DNO region data
// and are kept separate from anything unverified (no made-up
// stats, no invented local case studies).
// ============================================================

export const TRIGGER_PAGES = [
  {
    slug: 'business-energy-new-premises',
    label: 'New Premises',
    shortLabel: 'New Premises Energy',
  },
  {
    slug: 'business-energy-change-of-tenancy',
    label: 'Change of Tenancy',
    shortLabel: 'Change of Tenancy',
  },
  {
    slug: 'business-energy-new-business',
    label: 'New Business',
    shortLabel: 'New Business Energy',
  },
  {
    slug: 'business-energy-relocation',
    label: 'Relocation',
    shortLabel: 'Business Relocation',
  },
  {
    slug: 'business-energy-new-branch',
    label: 'New Branch / Expansion',
    shortLabel: 'New Branch Energy',
  },
];

export const SECTORS = [
  {
    slug: 'restaurants',
    label: 'Restaurants & Cafes',
    summary: 'High gas usage from kitchens, extraction and refrigeration.',
  },
  {
    slug: 'hotels',
    label: 'Hotels & Hospitality',
    summary: '24/7 heating, hot water and lighting across multiple rooms.',
  },
  {
    slug: 'retail',
    label: 'Retail',
    summary: 'Extended trading hours, refrigeration and shopfront lighting.',
  },
  {
    slug: 'offices',
    label: 'Offices',
    summary: 'Daytime HVAC, lighting and IT load across standard hours.',
  },
  {
    slug: 'care-homes',
    label: 'Care Homes',
    summary: 'Continuous heating and hot water with strict comfort requirements.',
  },
  {
    slug: 'manufacturing',
    label: 'Manufacturing & Warehousing',
    summary: 'Higher-consumption three-phase power and extended shift patterns.',
  },
];

// DNO (Distribution Network Operator) data - the company that owns
// and maintains the local electricity wires in each region. This is
// genuinely useful, factual, location-specific information for a
// business arranging a new connection, reporting a fault, or simply
// checking who to contact - not filler text with a city name swapped in.
// Source: Energy Networks Association DNO region list.
export const LOCATIONS = [
  {
    slug: 'london',
    label: 'London',
    region: 'Greater London',
    dnoOperator: 'UK Power Networks',
    dnoRegion: 'London',
    dnoCode: 'C',
  },
  {
    slug: 'manchester',
    label: 'Manchester',
    region: 'North West England',
    dnoOperator: 'Electricity North West',
    dnoRegion: 'North West England',
    dnoCode: 'G',
  },
  {
    slug: 'birmingham',
    label: 'Birmingham',
    region: 'West Midlands',
    dnoOperator: 'National Grid Electricity Distribution',
    dnoRegion: 'West Midlands',
    dnoCode: 'E',
  },
  {
    slug: 'leeds',
    label: 'Leeds',
    region: 'Yorkshire',
    dnoOperator: 'Northern Powergrid',
    dnoRegion: 'Yorkshire',
    dnoCode: 'M',
  },
  {
    slug: 'glasgow',
    label: 'Glasgow',
    region: 'Central Scotland',
    dnoOperator: 'SP Energy Networks',
    dnoRegion: 'Southern Scotland',
    dnoCode: 'N',
  },
  {
    slug: 'bristol',
    label: 'Bristol',
    region: 'South West England',
    dnoOperator: 'National Grid Electricity Distribution',
    dnoRegion: 'South West England',
    dnoCode: 'L',
  },
];

// Core, pre-existing service/comparison pages - used by RelatedLinks
// to point trigger/sector/location pages back into the main site.
export const CORE_PAGES = [
  { slug: 'business-energy', label: 'Business Energy' },
  { slug: 'business-electricity', label: 'Business Electricity' },
  { slug: 'business-gas', label: 'Business Gas' },
  { slug: 'commercial-energy', label: 'Commercial Energy' },
  { slug: 'business-energy-comparison', label: 'Business Energy Comparison' },
  { slug: 'business-energy-renewal', label: 'Business Energy Renewal' },
  { slug: 'business-energy-broker', label: 'Business Energy Broker' },
];
