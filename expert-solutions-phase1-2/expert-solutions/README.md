# Expert Solutions - Business Energy Website (Phases 1 + 2)

A Next.js website for a UK **business/commercial energy** lead-generation
campaign, built for Google Ads (PPC) traffic, with a Supabase-backed lead
database and internal admin dashboard.

- **Phase 1** (done): public website, lead form, click-to-call, PPC tracking.
- **Phase 2** (done): Supabase database, lead storage, admin dashboard,
  PPC attribution reporting.
- **Phase 3** (not started, needs your approval): live webchat, agent
  availability/routing, chat history.
- **Phase 4** (not started): visitor behaviour tracking, engagement
  scoring, proactive chat triggers.

## What's included so far

**Public website**
- Homepage designed as a Google Ads landing page, plus 7 dedicated
  keyword landing pages with unique content each: `/business-energy`,
  `/business-electricity`, `/business-gas`, `/commercial-energy`,
  `/business-energy-comparison`, `/business-energy-renewal`,
  `/business-energy-broker`
- `/contact-us`, `/thank-you`, and placeholder legal pages (privacy,
  cookies, terms, complaints)
- 3-step lead capture form with a progress indicator and spam honeypot
- "Call Us Now" click-to-call button + "Request a Callback" option, and a
  sticky mobile call/quote bar
- Google Click ID (gclid) + UTM parameter capture, attached to every form
  submission and tracked event
- SEO basics: titles/descriptions, canonical URLs, sitemap.xml,
  robots.txt, Organization + FAQPage schema

**Database & admin dashboard (Phase 2)**
- Full Supabase schema (`supabase/schema.sql`): `users`, `visitors`,
  `visitor_events`, `leads`, `lead_status_history`, `campaign_attribution`,
  `chat_sessions`, `chat_messages` - all protected with Row Level Security
  so only logged-in staff can read lead/visitor data
- Every form and callback submission is now saved to Supabase via secure,
  server-side API routes (`app/api/leads`, `app/api/callback`,
  `app/api/events`) - the browser never talks to Supabase directly for
  writes, and the secret service-role key never leaves the server
- `/admin/login` - sign-in for internal staff (Supabase Auth)
- `/admin` - live dashboard: today's leads, new, qualified, calls
  requested, quotes, won, lost, a filterable leads table (by date range,
  status, campaign/keyword), and a conversion-rate estimate (leads ÷
  visitors in the selected range). New leads appear automatically via
  Supabase Realtime, no refresh needed
- `/admin/leads/[id]` - full lead detail: every field submitted, PPC
  attribution, status history, a status-change dropdown, and an
  assign-to-agent dropdown (Roshan / Shamsher, or anyone else you add)

**Not built yet, as agreed:** live webchat and the proactive
engagement-scoring behaviour - that's Phases 3 and 4. The `chat_sessions`
and `chat_messages` tables already exist in the database (see
`supabase/schema.sql`) so Phase 3 is just building the widget and agent
UI on top of what's already there.

## Before you do anything else: what to configure

Almost everything you'll want to change lives in **one place**:
`lib/config.js`, which reads from environment variables. You do not need
to edit any page or component to change these:

| What | Environment variable |
|---|---|
| Phone number shown to visitors | `NEXT_PUBLIC_PHONE_DISPLAY` |
| Phone number actually dialled (tel: link) | `NEXT_PUBLIC_PHONE_TEL` |
| Company name | `NEXT_PUBLIC_COMPANY_NAME` |
| Legal company name | `NEXT_PUBLIC_COMPANY_LEGAL_NAME` |
| Companies House number | `NEXT_PUBLIC_COMPANY_NUMBER` |
| Registered address | `NEXT_PUBLIC_COMPANY_ADDRESS` |
| Contact email | `NEXT_PUBLIC_COMPANY_EMAIL` |
| Live website address | `NEXT_PUBLIC_SITE_URL` |
| Google Ads conversion ID (optional) | `NEXT_PUBLIC_GOOGLE_ADS_ID` |

See `.env.example` for the full list, including the three Supabase
variables Phase 2 adds. **Nothing is hard-coded in the page files** - you
can update the phone number or company details from the Netlify dashboard
with no code changes.

No pricing figures, savings claims, certifications, or reviews have been
invented anywhere on the site - anywhere you see `[placeholder]` text,
that's a deliberate gap waiting for real, verified information.

## Setting up Supabase (Phase 2) - do this first

Follow **`SUPABASE_SETUP.md`** in this project for a full step-by-step
walkthrough (create a free Supabase project, run the database schema,
copy your API keys into Netlify, and create login accounts for Roshan
and Shamsher). It takes about 15-20 minutes and doesn't require any
coding experience.

Until this is done, the website still works exactly as before (leads
just won't be saved anywhere), and `/admin` will show a friendly
"not set up yet" message instead of an error.

## Running it on your own computer (optional)

You do not have to do this step - you can go straight to "Deploying to
Netlify" below and Netlify will build it for you. But if you want to
preview it locally first:

1. Install [Node.js](https://nodejs.org) version 20 or later.
2. Open a terminal in this folder and run:
   ```
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.
4. Copy `.env.example` to `.env.local` and fill in your values (phone
   number, Supabase keys once you have them, etc.).

## Deploying to Netlify

### Option A (recommended): Deploy from GitHub

This is the best option because every future update (Phase 3, 4, etc.)
becomes a simple "push and it redeploys automatically".

1. Create a free account at [github.com](https://github.com) if you don't
   have one, and create a new **private** repository (e.g.
   `expert-solutions-website`).
2. Upload this entire project folder to that repository. The easiest way,
   with no command line: on the new repository's page, click
   **"uploading an existing file"** and drag in all the files/folders (make
   sure hidden files like `.env.example` and `netlify.toml` come with it).
3. Create a free account at [netlify.com](https://netlify.com).
4. Click **"Add new site" > "Import an existing project"** and connect
   your GitHub account, then choose the repository you just created.
5. Netlify will automatically detect this is a Next.js site (thanks to
   `netlify.toml`) - you shouldn't need to change the build settings it
   suggests. Click **Deploy**.
6. Go to **Site configuration > Environment variables** and add every
   variable from `.env.example` (phone number, company details, and once
   you've followed `SUPABASE_SETUP.md`, the three Supabase keys). Then go
   to **Deploys > Trigger deploy > Deploy site** to rebuild with those
   values.
7. Netlify gives you a free `*.netlify.app` web address immediately. You
   can add your own domain later under **Domain management**.

### Option B: Deploy directly with the Netlify CLI (no GitHub needed)

1. Install [Node.js](https://nodejs.org) version 20 or later.
2. Open a terminal in this project folder and run:
   ```
   npm install -g netlify-cli
   npm install
   netlify login
   netlify init
   ```
   Follow the prompts (choose "Create & configure a new site").
3. Add your environment variables when prompted, or afterwards in the
   Netlify dashboard under **Site configuration > Environment variables**.
4. Deploy with:
   ```
   netlify deploy --prod
   ```

Either option produces the same result. Option A is easier to keep
updating over time; Option B gets you live fastest without needing GitHub.

## Setting up Google Ads tracking

1. Once your Google Ads account and conversion actions are set up, add the
   Google Ads ID (starts `AW-`) as `NEXT_PUBLIC_GOOGLE_ADS_ID` in Netlify's
   environment variables and redeploy.
2. Every important action already fires a tracking event: form started,
   form completed, phone clicked, callback requested (see
   `lib/tracking.js` `EVENTS`). These are pushed to `window.dataLayer`,
   logged to the browser console, AND now saved to Supabase's
   `visitor_events` table - ready to connect to Google Tag Manager or
   Google Ads conversion tracking without changing any page.
3. Make sure your Google Ads campaigns are built around Search keywords
   matching the seven landing pages (e.g. point a "business electricity"
   ad group at `/business-electricity`, and so on) for the best Quality
   Score and message match.

## Project structure

```
app/
  layout.js               TRUE root layout (html/body + sitewide SEO/schema)
  (marketing)/            Public website - wrapped in its own header/footer
    layout.js               Header, Footer, sticky call bar, tracking
    page.js                 Homepage
    business-electricity/   ...one folder per public page
    contact-us/, thank-you/, privacy-policy/, etc.
  admin/                  Internal dashboard (own layout, no public chrome)
    login/page.js           Sign-in
    page.js                 Dashboard (metrics + leads table)
    leads/[id]/page.js      Single lead detail + status/agent updates
  api/                    Server-only routes (Netlify Functions)
    leads/route.js          Saves a completed lead form to Supabase
    callback/route.js       Saves a "request a callback" to Supabase
    events/route.js         Saves tracked visitor events to Supabase
  sitemap.js / robots.js  Auto-generated sitemap.xml / robots.txt
components/             Reusable building blocks (Hero, LeadForm, FAQ, etc.)
lib/
  config.js               Central place for phone number, pricing, company info
  tracking.js              UTM/GCLID capture + event tracking helpers
  supabaseClient.js        Browser-safe Supabase client (anon key) - admin only
  supabaseAdmin.js         SERVER-ONLY Supabase client (service-role key)
  leadStatuses.js          Shared lead status list/labels/colours
supabase/schema.sql     Run this once in Supabase's SQL Editor
SUPABASE_SETUP.md       Step-by-step Phase 2 setup guide
.env.example            Every configurable value, with explanations
netlify.toml             Tells Netlify how to build/deploy this project
```

## Ready for your review

Please run through `SUPABASE_SETUP.md`, try logging into `/admin` with
Roshan's and Shamsher's accounts, and submit a test enquiry to confirm it
appears on the dashboard. Let me know about any wording/layout changes,
and confirm you're happy to move on to **Phase 3** (live webchat, agent
availability and routing, chat history).
