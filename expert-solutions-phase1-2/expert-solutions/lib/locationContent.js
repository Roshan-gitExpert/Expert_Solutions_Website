// ============================================================
// LOCATION CONTENT
// ------------------------------------------------------------
// Genuine, location-specific business-energy context for each entry
// in LOCATIONS (lib/seoData.js). We are a UK-wide broker with no
// physical office in these cities, so this deliberately does NOT
// claim a local presence, invent client stories, or state
// unverifiable statistics - it describes the real, well-documented
// economic/industrial character of each city and how that typically
// shapes business electricity and gas usage, the same way
// sectorContent.js describes real sector usage patterns rather than
// generic text with a name swapped in.
// ============================================================

export const LOCATION_CONTENT = {
  london: {
    economy:
      'London has the largest and most diverse business economy in the UK, dominated by financial and professional services, media, hospitality, retail and a very high density of small and medium-sized offices. Much of that demand is concentrated in standard daytime office hours, with hospitality and retail adding evening and weekend load on top.',
    usagePoints: [
      { title: 'Dense office stock', desc: 'A high concentration of office-based SMEs means daytime HVAC, lighting and IT load is the dominant usage pattern for many London businesses.' },
      { title: 'Mixed-use buildings', desc: 'Many London premises share a building with other tenants, which can make meter identification and MPAN lookup during a move or renewal more fiddly than a standalone site.' },
      { title: 'Hospitality & retail overlap', desc: 'Central London’s dense hospitality and retail sector adds evening and weekend demand on top of the daytime office pattern seen across most boroughs.' },
      { title: 'High competition among suppliers', desc: 'The sheer number of business sites in London means suppliers compete hard for contracts here, which can work in your favour at renewal if you compare options.' },
    ],
  },
  manchester: {
    economy:
      'Manchester’s business economy blends a long industrial and manufacturing heritage with a fast-growing media, digital and tech sector centred around areas like MediaCityUK and the wider city centre. That mix means energy profiles vary widely across the city, from legacy industrial units to modern office space.',
    usagePoints: [
      { title: 'Media & digital office space', desc: 'Newer office and studio space in and around the city centre typically follows a standard daytime IT, lighting and HVAC usage pattern.' },
      { title: 'Legacy industrial units', desc: 'Older manufacturing and light-industrial premises in and around Greater Manchester often still run on three-phase supplies installed decades ago.' },
      { title: 'City-centre redevelopment', desc: 'Businesses moving into newly redeveloped commercial space should check whether the site has an active supply or needs reconnecting before move-in.' },
      { title: 'Regional distribution hub', desc: 'Manchester’s position as a logistics and distribution hub for the North West means some premises have higher-than-typical warehouse and handling loads.' },
    ],
  },
  birmingham: {
    economy:
      'Birmingham is the UK’s second-largest city and retains a strong manufacturing and automotive heritage, alongside a large logistics and distribution presence driven by its central location. Manufacturing, engineering and warehousing sites here commonly carry heavier three-phase electricity demand than a typical office-based business.',
    usagePoints: [
      { title: 'Automotive & engineering legacy', desc: 'The West Midlands’ manufacturing and automotive heritage means a meaningful share of local businesses run higher-consumption industrial equipment.' },
      { title: 'Central logistics hub', desc: 'Birmingham’s location at the heart of the UK motorway network makes it a natural base for distribution and warehousing, which typically carries its own lighting and handling-equipment load.' },
      { title: 'Mixed city-centre offices', desc: 'The city centre itself has a growing office and professional-services base alongside its industrial legacy, with the more typical daytime usage pattern that implies.' },
      { title: 'Three-phase connections common', desc: 'Larger industrial and manufacturing units in and around Birmingham are more likely than average to already be on, or need, a three-phase supply.' },
    ],
  },
  leeds: {
    economy:
      'Leeds is one of the UK’s largest financial and legal services centres outside London, built on a strong historic base in textile manufacturing. Today’s business mix leans heavily towards office-based professional services, with a smaller but still present manufacturing and distribution sector.',
    usagePoints: [
      { title: 'Financial & legal services base', desc: 'A large share of Leeds city-centre businesses are office-based professional services, with daytime HVAC, lighting and IT as the main electricity driver.' },
      { title: 'Textile manufacturing legacy', desc: 'Older industrial and mill buildings converted for modern use can have unusual electrical infrastructure worth checking during a move or renewal.' },
      { title: 'Growing city-centre development', desc: 'Newer commercial developments in the city centre tend to have straightforward, modern supply set-ups compared with converted older buildings.' },
      { title: 'Regional headquarters presence', desc: 'A number of national firms base regional or northern headquarters in Leeds, often across multi-floor office space with shared building services.' },
    ],
  },
  glasgow: {
    economy:
      'Glasgow is Scotland’s largest city, with an economy that has shifted from its historic shipbuilding and heavy engineering base towards financial services, renewable energy activity and a sizeable hospitality and retail sector. That transition means a wide range of premises types and usage profiles across the city.',
    usagePoints: [
      { title: 'Post-industrial site conversions', desc: 'Former industrial and shipyard-era buildings converted to modern commercial use can have legacy electrical infrastructure worth reviewing.' },
      { title: 'Financial & business services', desc: 'Glasgow’s financial and business services sector has grown significantly, with the standard daytime office usage pattern that comes with it.' },
      { title: 'Renewables sector activity', desc: 'Scotland’s renewable energy sector has a notable presence in and around Glasgow, bringing a mix of office and technical-site energy needs.' },
      { title: 'City-centre hospitality & retail', desc: 'A dense hospitality and retail core adds evening and weekend demand, similar in pattern to other major UK city centres.' },
    ],
  },
  bristol: {
    economy:
      'Bristol has a strong aerospace and advanced engineering presence (the wider Bristol area is a major UK centre for aircraft component manufacturing), alongside a fast-growing tech, creative and digital media sector. This gives the local business mix an unusually wide spread between high-consumption industrial sites and modern office space.',
    usagePoints: [
      { title: 'Aerospace & advanced engineering', desc: 'Businesses in and around Bristol’s aerospace and engineering supply chain often run specialist, higher-consumption equipment on three-phase supplies.' },
      { title: 'Tech & creative sector growth', desc: 'A growing tech and creative media sector in the city centre brings the more typical daytime office electricity and IT load.' },
      { title: 'Port & distribution activity', desc: 'Bristol’s port and surrounding distribution sites add their own warehousing and handling-equipment demand to the regional mix.' },
      { title: 'University & research presence', desc: 'A significant university and research-sector presence in the city includes laboratory and specialist-equipment sites with distinct usage patterns from standard offices.' },
    ],
  },
};
