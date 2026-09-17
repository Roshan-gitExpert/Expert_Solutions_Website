// ============================================================
// SYNTHETIC-MEDIA CAMPAIGN CONFIG
// ------------------------------------------------------------
// One entry per campaign = one route at /campaign/<slug>. Adding a
// new campaign later is just adding a new object below - no other
// code changes needed (app/(marketing)/campaign/[slug]/page.js reads
// entirely from this file).
//
// `script` follows the required structure for every synthetic-media
// video (hook -> problem -> why care -> benefit -> CTA). `aiVideoId`
// is null until a real video has been produced and uploaded - the
// landing page shows a "video in production" placeholder until then,
// so a campaign page always works even before its video exists.
//
// No savings figures, percentages or customer results are invented
// anywhere below - see NEXT_PUBLIC_AVERAGE_SAVING_CLAIM in
// lib/config.js if a verified figure is ever supplied.
// ============================================================

export const CAMPAIGNS = {
  'energy-renewal': {
    slug: 'energy-renewal',
    campaignName: 'Energy Renewal',
    trigger: 'Energy Contract Renewal',
    eyebrow: 'Contract Renewal Alert',
    headline: 'Before You Renew Your Business Energy Contract... Check This First',
    subtitle:
      'Businesses that renew without checking their options often end up paying more than they need to. See what else is available before you sign anything.',
    hookVariants: [
      'Before you renew your business energy contract... check what you’re actually paying.',
      'Still paying the same energy rates? You may be leaving money on the table.',
      'If your business energy contract is coming up for renewal... don’t renew blindly.',
    ],
    script: {
      hook: 'Before you renew your business energy contract... check this first.',
      problem: 'Most businesses renew automatically, without ever checking if there’s a better deal available.',
      care: 'That single decision can be the difference between a fair rate and an inflated one, for the next 1-3 years.',
      benefit: 'A free, no-obligation review shows you exactly where your business stands before you commit.',
      cta: 'Click below and see what you could save.',
    },
    whyItMatters:
      'A business energy contract that rolls over or renews without review can lock a business into rates that no longer reflect the market. Checking ahead of your renewal date costs nothing and commits you to nothing.',
    faqIntro: {
      q: 'My contract isn’t due for renewal yet - can you still help?',
      a: 'Yes. It’s worth checking your options ahead of time so you’re not rushed into a decision close to your renewal date.',
    },
  },

  'change-of-tenancy': {
    slug: 'change-of-tenancy',
    campaignName: 'Change of Tenancy',
    trigger: 'Change of Tenancy',
    eyebrow: 'New to This Premises?',
    headline: 'Just Taken Over a New Business Premises? Check Your Energy Contract First',
    subtitle:
      'When you take over a premises, you can inherit the previous occupier’s energy rate by default. It’s worth checking whether that’s actually a good deal for your business.',
    hookVariants: [
      'Just taken over a new business premises? Your energy contract could be costing you more than you realise.',
      'New tenancy? Don’t assume the energy contract you’ve inherited is the best one for your business.',
      'Moving into new premises? Check your energy options before you get comfortable.',
    ],
    script: {
      hook: 'Just taken over new premises? Check your energy contract before it’s too late.',
      problem: 'A change of tenancy often means inheriting whatever energy deal was already in place.',
      care: 'That deal was negotiated for someone else’s business, not yours.',
      benefit: 'A quick, free review tells you exactly where you stand on your new premises.',
      cta: 'Click below and check your options now.',
    },
    whyItMatters:
      'On a change of tenancy, energy suppliers commonly place the new occupier on a deemed rate - typically one of the more expensive options available. Reviewing this early avoids paying it for longer than necessary.',
    faqIntro: {
      q: 'I’ve only just moved in - is it too early to check?',
      a: 'No - this is exactly the right time. Checking early avoids sitting on a deemed rate for months by default.',
    },
  },

  'new-premises': {
    slug: 'new-premises',
    campaignName: 'New Premises',
    trigger: 'New Premises',
    eyebrow: 'Opening a New Site?',
    headline: 'New Business Premises? Don’t Sign an Energy Contract Before Checking This',
    subtitle:
      'Setting up a new site means setting up energy from scratch. See your options before you commit to a supplier.',
    hookVariants: [
      'New premises? Don’t sign an energy contract before checking your options.',
      'Opening a new site? Get your energy sorted properly from day one.',
      'Setting up new business premises? Check this before your supplier locks you in.',
    ],
    script: {
      hook: 'New premises? Check your energy options before you sign anything.',
      problem: 'New sites are often set up in a rush, with energy as an afterthought.',
      care: 'The contract you sign now is the one you’re stuck with for years.',
      benefit: 'A free review helps you start your new site on the right rate.',
      cta: 'Click below and get your business energy quote.',
    },
    whyItMatters:
      'A new premises is a clean-slate opportunity to set up energy properly, rather than accepting the first offer that comes with the site.',
    faqIntro: {
      q: 'We haven’t opened yet - can you still help?',
      a: 'Yes. It’s best to check your options before you open, so energy is sorted from day one.',
    },
  },

  'new-business': {
    slug: 'new-business',
    campaignName: 'New Business',
    trigger: 'New Business',
    eyebrow: 'Recently Opened?',
    headline: 'Recently Opened Your Business? Check Your Energy Options Before You Settle In',
    subtitle:
      'New businesses have a lot to set up at once. Energy is one thing that’s worth getting right from the start.',
    hookVariants: [
      'Just opened your business? Don’t leave your energy contract to chance.',
      'New business owners - when did you last check what you’re paying for energy?',
      'Recently opened? Check your energy options while you still can.',
    ],
    script: {
      hook: 'Just opened your business? Check your energy contract before it’s locked in.',
      problem: 'With so much to set up, energy is often the last thing a new business owner checks properly.',
      care: 'Whatever gets agreed now can run for years without being reviewed again.',
      benefit: 'A free, no-obligation review shows you what’s actually available.',
      cta: 'Click below and see what you could save.',
    },
    whyItMatters:
      'New businesses rarely have time to shop around for energy in the early weeks - which is exactly when it’s most valuable to check.',
    faqIntro: {
      q: 'We’re a brand new company - is this still relevant to us?',
      a: 'Yes - new businesses benefit most from checking early, before a long-term contract is in place.',
    },
  },

  relocation: {
    slug: 'relocation',
    campaignName: 'Relocation',
    trigger: 'Relocation',
    eyebrow: 'Moving Premises?',
    headline: 'Moving Your Business? Check Your Energy Options Before You Sign Anything',
    subtitle:
      'A relocation is a natural point to review energy costs for your new site, rather than carrying over what you had before.',
    hookVariants: [
      'Moving your business? Check your energy options before you sign anything.',
      'Relocating? Don’t let your new premises come with someone else’s energy deal.',
      'Business moving premises? This is the moment to check your energy costs.',
    ],
    script: {
      hook: 'Moving your business? Check your energy options before you sign anything.',
      problem: 'A relocation involves dozens of moving parts - energy is easy to overlook.',
      care: 'The rate at your new premises may not be the best one available to you.',
      benefit: 'A free review makes sure your move doesn’t cost you more than it should.',
      cta: 'Click below and check your options now.',
    },
    whyItMatters:
      'Relocating is a natural checkpoint to review energy costs, since a new premises means a fresh decision rather than an automatic renewal.',
    faqIntro: {
      q: 'We haven’t finished moving yet - is it too early?',
      a: 'No - the earlier you check, the more options are usually available before anything is locked in.',
    },
  },

  'new-branch': {
    slug: 'new-branch',
    campaignName: 'New Branch',
    trigger: 'New Branch',
    eyebrow: 'Opening Another Location?',
    headline: 'Opening a New Branch? Check Your Energy Options Across All Your Sites',
    subtitle:
      'Adding a new location is a good time to review energy across your whole business, not just the new site.',
    hookVariants: [
      'Opening a new branch? Check your energy options before you add another contract to the pile.',
      'Growing to a new location? See what you could save across all your sites.',
      'Another branch opening soon? Get your energy sorted before you’re juggling multiple contracts.',
    ],
    script: {
      hook: 'Opening a new branch? Check your energy options before you commit.',
      problem: 'Multi-site businesses often end up with a different energy deal at every location.',
      care: 'That patchwork of contracts can be harder to manage and more expensive overall.',
      benefit: 'A free review looks at your new branch, and your existing sites, together.',
      cta: 'Click below and see what you could save.',
    },
    whyItMatters:
      'Businesses expanding to multiple sites benefit from reviewing energy across the whole portfolio, rather than treating each new branch as a one-off decision.',
    faqIntro: {
      q: 'We already have energy contracts at our other sites - can you look at all of them?',
      a: 'Yes - we can review your new branch alongside your existing sites’ contracts and renewal dates.',
    },
  },

  expansion: {
    slug: 'expansion',
    campaignName: 'Expansion',
    trigger: 'Expansion',
    eyebrow: 'Growing Business?',
    headline: 'Growing Your Business? Make Sure Your Energy Costs Are Growing Sensibly Too',
    subtitle:
      'As usage grows, so does the value of checking you’re on the right rate. See your options as your business expands.',
    hookVariants: [
      'Business growing? Your energy costs should be reviewed just as often.',
      'Expanding your business? Don’t let energy costs expand faster than they need to.',
      'Scaling up? Check your business energy options before usage grows further.',
    ],
    script: {
      hook: 'Growing your business? Check your energy costs are growing sensibly too.',
      problem: 'As usage increases, an outdated energy contract costs more with every month that passes.',
      care: 'Growth is exactly when it’s worth double-checking you’re on the right deal.',
      benefit: 'A free review shows you where you stand as your business scales.',
      cta: 'Click below and see what you could save.',
    },
    whyItMatters:
      'A growing business consumes more energy over time - making it more valuable, not less, to check the underlying rate is competitive.',
    faqIntro: {
      q: 'Our usage keeps changing as we grow - can you still review us?',
      a: 'Yes - we can factor in your current usage and expected growth as part of the review.',
    },
  },

  'commercial-occupancy': {
    slug: 'commercial-occupancy',
    campaignName: 'Commercial Occupancy',
    trigger: 'Commercial Occupancy',
    eyebrow: 'New Commercial Occupancy?',
    headline: 'Newly Occupying a Commercial Property? Check Your Energy Contract First',
    subtitle:
      'Taking on a commercial property brings a lot of decisions at once. Energy shouldn’t be the one you don’t check.',
    hookVariants: [
      'Newly occupying a commercial property? Check your energy options before you settle in.',
      'New to this commercial space? Don’t assume the energy deal in place is the right one.',
      'Taking on a commercial property? This is the moment to check your energy contract.',
    ],
    script: {
      hook: 'Newly occupying a commercial property? Check your energy contract first.',
      problem: 'New occupancy often comes with whatever energy arrangement the property already has.',
      care: 'That arrangement was set up for someone else’s circumstances, not yours.',
      benefit: 'A free review confirms whether it’s right for your business too.',
      cta: 'Click below and check your options now.',
    },
    whyItMatters:
      'Commercial occupancy is a natural decision point - the energy contract attached to a property is rarely the most competitive option by default.',
    faqIntro: {
      q: 'We don’t know what energy contract is currently in place - can you help find out?',
      a: 'Yes - part of our free review includes helping you understand what’s currently in place before deciding anything.',
    },
  },

  restaurants: {
    slug: 'restaurants',
    campaignName: 'Restaurants',
    trigger: 'Potential High Energy Usage',
    eyebrow: 'For Restaurants & Food Businesses',
    headline: 'Running a Restaurant or Food Business? Check What You’re Really Paying for Energy',
    subtitle:
      'Kitchens run on energy all day. It’s worth knowing whether your restaurant, café or takeaway is on a competitive rate.',
    hookVariants: [
      'Running a restaurant or takeaway? Check what you’re paying for energy.',
      'Kitchen equipment running all day? Make sure your energy rate keeps up.',
      'Restaurant owners - when did you last check your energy contract?',
    ],
    script: {
      hook: 'Running a restaurant or food business? Check what you’re really paying for energy.',
      problem: 'Kitchens are some of the highest energy-consuming spaces in any business.',
      care: 'A small difference in rate is magnified by how much energy a working kitchen uses.',
      benefit: 'A free review shows you exactly where your business stands.',
      cta: 'Click below and see what you could save.',
    },
    whyItMatters:
      'Restaurants, cafés and takeaways typically run energy-intensive equipment for most of the day, making the underlying rate more consequential than for a typical office.',
    faqIntro: {
      q: 'We’re a small independent restaurant - is this worth it for us?',
      a: 'Yes - the review is free regardless of size, and kitchens are exactly the kind of business where checking your rate tends to matter most.',
    },
  },

  retail: {
    slug: 'retail',
    campaignName: 'Retail',
    trigger: 'Potential High Energy Usage',
    eyebrow: 'For Retail Businesses',
    headline: 'Running a Shop or Retail Business? Check Your Energy Options',
    subtitle:
      'Lighting, refrigeration and heating all add up. See whether your retail business is on a competitive energy rate.',
    hookVariants: [
      'Retail business owners - check what you’re paying for energy before you renew.',
      'Running a shop? Your energy contract is worth a second look.',
      'Still on the same energy rate since you opened? Time to check your options.',
    ],
    script: {
      hook: 'Running a shop or retail business? Check your energy options.',
      problem: 'Retail units often run lighting, heating and refrigeration for long hours every day.',
      care: 'That adds up - and an uncompetitive rate adds up faster.',
      benefit: 'A free review shows you what’s actually available for your business.',
      cta: 'Click below and get your business energy quote.',
    },
    whyItMatters:
      'Retail premises typically run extended-hours lighting and, in many cases, refrigeration - making the energy rate a meaningful line item worth checking.',
    faqIntro: {
      q: 'We have just one shop - is it worth checking for a single site?',
      a: 'Yes - the review is free whether you have one site or several.',
    },
  },

  warehouses: {
    slug: 'warehouses',
    campaignName: 'Warehouses',
    trigger: 'Potential High Energy Usage',
    eyebrow: 'For Warehouses & Logistics',
    headline: 'Running a Warehouse or Logistics Site? Check Your Energy Costs',
    subtitle:
      'Large sites mean large energy usage. See whether your warehouse or logistics business is on a competitive rate.',
    hookVariants: [
      'Warehouse or logistics business? Check what you’re paying for energy.',
      'Large site, large energy bill - make sure the rate is right.',
      'Running a warehouse? See what you could save before you renew.',
    ],
    script: {
      hook: 'Running a warehouse or logistics site? Check your energy costs.',
      problem: 'Large commercial sites consume energy at a scale where even a small rate difference matters.',
      care: 'Warehousing and logistics operations rarely have time to shop around for energy themselves.',
      benefit: 'A free review does the checking for you, at no cost.',
      cta: 'Click below and see what you could save.',
    },
    whyItMatters:
      'Warehouses and logistics sites are typically large-footprint, energy-intensive operations, where checking the underlying rate is especially worthwhile.',
    faqIntro: {
      q: 'We operate multiple warehouses - can you review them together?',
      a: 'Yes - we support multi-site businesses and can look at your full portfolio.',
    },
  },
};

export function getCampaign(slug) {
  return CAMPAIGNS[slug] || null;
}

export function getAllCampaignSlugs() {
  return Object.keys(CAMPAIGNS);
}
