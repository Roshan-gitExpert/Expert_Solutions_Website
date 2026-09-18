// ============================================================
// SECTOR CONTENT
// ------------------------------------------------------------
// Genuine, sector-specific energy-usage context for each entry in
// SECTORS (lib/seoData.js). This is written to be factually useful
// on its own merits (how each type of business actually uses
// electricity/gas) rather than generic text with the sector name
// swapped in - each object below describes real, distinct
// consumption patterns.
// ============================================================

export const SECTOR_CONTENT = {
  restaurants: {
    intro:
      'Restaurants, cafes and takeaways typically combine high gas usage (cooking equipment, ovens, hobs) with significant electricity demand from extraction, refrigeration and air conditioning. Usage is often concentrated around service hours, with equipment like walk-in fridges and freezers drawing power continuously in the background.',
    usagePoints: [
      { title: 'Kitchen equipment', desc: 'Ovens, hobs, fryers and grills are usually the main driver of gas (or electric) usage in a commercial kitchen.' },
      { title: 'Extraction & ventilation', desc: 'Kitchen extraction systems often run throughout service and can be a significant, continuous electrical load.' },
      { title: 'Refrigeration', desc: 'Walk-in fridges, freezers and display units draw power around the clock, not just during opening hours.' },
      { title: 'Peak service demand', desc: 'Electricity and gas demand often spikes sharply during lunch and dinner service compared with quieter periods.' },
    ],
    faqs: [
      { q: 'Do restaurants usually need a half-hourly meter?', a: 'This depends on the site’s peak demand - larger kitchens with heavy equipment loads are more likely to be on, or eligible for, a half-hourly (HH) meter than a small cafe. A specialist can help you check what applies to your premises.' },
      { q: 'Can you help with both gas and electricity for a kitchen?', a: 'Yes - most restaurant and cafe premises need both, and we can talk through your options for each.' },
      { q: 'Does opening a second kitchen/site count as a new contract?', a: 'Generally yes - each additional site is normally its own contract, though some multi-site restaurant groups prefer to align renewal dates. See our page on business energy for a new branch.' },
    ],
  },
  hotels: {
    intro:
      'Hotels and other hospitality premises tend to have a high, relatively constant baseline energy load - heating, hot water and lighting are often needed around the clock across many rooms and communal areas, on top of variable demand from restaurants, bars, spas or conference facilities on-site.',
    usagePoints: [
      { title: '24/7 heating & hot water', desc: 'Guest comfort expectations mean heating and hot water systems are typically run continuously, not just during business hours.' },
      { title: 'Occupancy-driven variation', desc: 'Usage can vary significantly between low and high occupancy periods, and seasonally across the year.' },
      { title: 'Multiple facilities under one roof', desc: 'Restaurants, bars, laundry, spas and conference rooms often sit on the same site, each adding to overall demand.' },
      { title: 'Multi-meter sites', desc: 'Larger hotels sometimes have more than one meter across a single site, which can affect how a contract is structured.' },
    ],
    faqs: [
      { q: 'Do hotel chains need one contract per site or one overall?', a: 'Both approaches exist - some multi-site hospitality businesses use a shared framework across properties, others contract each site separately. A specialist can talk through which suits your business.' },
      { q: 'How does seasonal occupancy affect a hotel’s contract?', a: 'Your usage estimate should reflect realistic seasonal occupancy swings, not just a flat average - this is something worth discussing when setting up or renewing a contract.' },
      { q: 'Can you help with a hotel that has just changed ownership?', a: 'Yes - this is usually treated as a change of tenancy. See our change of tenancy page for more detail.' },
    ],
  },
  retail: {
    intro:
      'Retail premises usage is shaped heavily by trading hours, shopfront and window lighting, and - for food retail in particular - refrigeration. Larger stores with extended or late-night trading hours, or multiple units in a chain, often have different considerations than a small independent shop.',
    usagePoints: [
      { title: 'Extended trading hours', desc: 'Shops open evenings, weekends or late-night hours typically have a longer active-usage window than a standard 9-to-5 business.' },
      { title: 'Shopfront & window lighting', desc: 'Display and window lighting can run well beyond opening hours for visibility and security.' },
      { title: 'Refrigeration (food retail)', desc: 'Chilled and frozen display units in convenience stores, supermarkets and similar outlets run continuously.' },
      { title: 'Seasonal peaks', desc: 'Many retailers see higher electricity demand during key seasonal trading periods such as the run-up to Christmas.' },
    ],
    faqs: [
      { q: 'Do you work with multi-store retail chains?', a: 'Yes - we work with both single-shop retailers and multi-site chains, including businesses adding new stores. See our new branch page for expansion-specific guidance.' },
      { q: 'What if I’m taking over a shop unit from a previous retailer?', a: 'This is generally treated as a change of tenancy - see our change of tenancy page for what to check.' },
      { q: 'Can refrigeration-heavy stores get a tailored review?', a: 'Yes - tell us about your equipment and opening hours and a specialist can talk through what matters most for your site.' },
    ],
  },
  offices: {
    intro:
      'Office premises typically have a usage pattern concentrated on weekdays during business hours, driven mainly by heating/cooling (HVAC), lighting and IT equipment such as servers and workstations. Increasingly flexible or hybrid working patterns can also affect how consistent day-to-day usage is.',
    usagePoints: [
      { title: 'Daytime HVAC & lighting', desc: 'Heating, cooling and lighting typically account for a large share of office electricity use during working hours.' },
      { title: 'IT & server load', desc: 'Workstations, networking equipment and any on-site servers add a steady electrical load throughout the working day.' },
      { title: 'Weekday-heavy usage', desc: 'Usage is often noticeably lower on weekends and outside core hours compared with a retail or hospitality site.' },
      { title: 'Hybrid working impact', desc: 'Flexible or hybrid working patterns can change day-to-day occupancy and, in turn, day-to-day energy usage.' },
    ],
    faqs: [
      { q: 'Does a smaller office still need its own commercial contract?', a: 'Yes - any business premises, regardless of size, typically needs its own business (non-domestic) energy contract rather than a residential one.' },
      { q: 'Can serviced or shared offices arrange their own energy?', a: 'This depends on your lease - some serviced offices have energy included in the rent, while others (particularly larger or self-contained units) arrange their own contract. A specialist can help you check.' },
      { q: 'What if our office usage has changed due to hybrid working?', a: 'It’s worth reviewing your contract if your occupancy pattern has changed significantly since it was agreed - a specialist can talk through your options.' },
    ],
  },
  'care-homes': {
    intro:
      'Care homes generally require continuous heating and hot water to maintain a comfortable, safe temperature for residents around the clock, alongside laundry, kitchen and communal-area usage. This typically results in a higher, steadier baseline load than a similarly sized office or retail unit.',
    usagePoints: [
      { title: 'Continuous heating', desc: 'Resident comfort and wellbeing generally require consistent, all-day heating rather than usage confined to business hours.' },
      { title: 'Hot water demand', desc: 'Bathing, laundry and kitchen needs across a care home typically mean substantial, ongoing hot water usage.' },
      { title: 'On-site laundry & kitchen', desc: 'Many care homes run their own laundry and catering facilities, both of which add meaningfully to overall usage.' },
      { title: 'Higher baseline load', desc: 'The combination of round-the-clock heating and care needs generally gives care homes a higher baseline (minimum) load than comparable commercial buildings.' },
    ],
    faqs: [
      { q: 'Do care homes have different energy needs to other commercial buildings?', a: 'Generally yes - the requirement for continuous heating and hot water to support resident welfare typically creates a steadier, higher baseline usage pattern than many other business types.' },
      { q: 'Can you help a care group with several homes under one contract approach?', a: 'Yes - we work with both single-site and multi-site care operators. See our new branch page if you are opening an additional home.' },
      { q: 'What if we are taking over management of an existing care home?', a: 'This is usually treated as a change of tenancy - see our change of tenancy page for what evidence typically helps.' },
    ],
  },
  manufacturing: {
    intro:
      'Manufacturing and warehousing sites often have higher-consumption electricity needs driven by machinery, motors and material handling equipment, frequently on a three-phase supply. Usage can vary considerably with shift patterns, and large warehouse spaces add their own lighting and heating demands.',
    usagePoints: [
      { title: 'Three-phase power', desc: 'Larger machinery and industrial equipment commonly require a three-phase electricity supply rather than a standard single-phase connection.' },
      { title: 'Shift pattern usage', desc: 'Sites running multiple shifts, including overnight, typically have a very different usage profile to a standard 9-to-5 operation.' },
      { title: 'Machinery & motor loads', desc: 'Production line equipment, compressors and motors can create significant, sometimes variable, demand.' },
      { title: 'Warehouse lighting & heating', desc: 'Large open floorspace in warehousing adds substantial lighting and (where heated) space-heating demand.' },
    ],
    faqs: [
      { q: 'Do manufacturing sites usually need a half-hourly meter?', a: 'Many higher-consumption industrial and manufacturing sites are on, or eligible for, a half-hourly (HH) meter - a specialist can help you check what applies to your site.' },
      { q: 'Can you help with three-phase electricity contracts?', a: 'Yes - tell us about your site’s connection and equipment and a specialist can talk through your options.' },
      { q: 'What if our shift patterns have changed recently?', a: 'It is worth reviewing your contract and estimated usage if your operating hours or shift patterns have changed materially since it was agreed.' },
    ],
  },
};
