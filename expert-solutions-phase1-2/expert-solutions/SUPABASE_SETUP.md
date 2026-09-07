# Phase 2 Setup: Connecting Supabase

This walks through everything needed to turn on the database, lead
storage, and admin dashboard. It assumes no prior Supabase experience.
It should take about 15-20 minutes.

## 1. Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free tier is
   enough for this).
2. Click **New project**. Choose any name (e.g. "expert-solutions"), set a
   database password (save it somewhere safe - a password manager is
   ideal), and pick a region close to the UK (e.g. "West EU (London)" if
   available).
3. Wait a minute or two while Supabase sets up your project.

## 2. Run the database schema

1. In your new project, click **SQL Editor** in the left-hand menu.
2. Click **New query**.
3. Open the file `supabase/schema.sql` from this project, copy its entire
   contents, and paste it into the SQL editor.
4. Click **Run**. You should see a success message. This creates all 8
   tables (`users`, `visitors`, `visitor_events`, `leads`,
   `lead_status_history`, `campaign_attribution`, `chat_sessions`,
   `chat_messages`) and locks them down with Row Level Security so only
   logged-in staff can read lead data.

## 3. Get your API keys

1. Click the **Settings** (gear icon) in the left menu, then **API**.
2. You'll see three values you need:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (click "Reveal") → this is
     `SUPABASE_SERVICE_ROLE_KEY` - keep this one secret, never share it or
     put it in any public place.

## 4. Add these to Netlify

1. Go to your site in the [Netlify dashboard](https://app.netlify.com).
2. Go to **Site configuration > Environment variables**.
3. Add all three:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Go to **Deploys > Trigger deploy > Deploy site** to rebuild the site
   with these values active.

(If you're testing locally first, add the same three lines to a
`.env.local` file in this project instead - see `.env.example`.)

## 5. Create login accounts for Roshan and Shamsher

1. Back in Supabase, click **Authentication** in the left menu, then
   **Users**, then **Add user > Invite user** (or "Create new user" if you'd
   rather set a password directly rather than emailing an invite).
2. Enter Roshan's email address and send the invite. Repeat for Shamsher's
   email address.
3. Each person will get an email (or, if you set a password directly,
   you can just tell them the password) to sign in.
4. For each person, click on their name in the Users list and copy their
   **User UID** (a long string like `a1b2c3d4-...`).
5. Go back to **SQL Editor > New query** and run this for each person
   (replace the placeholders):

   ```sql
   insert into public.users (id, full_name, role)
   values ('paste-their-user-uid-here', 'Roshan', 'admin');
   ```

   Do this once for Roshan and once for Shamsher (role can be `'admin'`
   or `'agent'` for either - Phase 2 treats both the same; the
   distinction is there for future use).

## 6. Sign in

1. Go to `https://<your-site>.netlify.app/admin/login` (or
   `http://localhost:3000/admin/login` if running locally).
2. Sign in with the email + password for Roshan or Shamsher.
3. You should land on the dashboard. Submit a test enquiry through the
   website's lead form in another tab - it should appear on the
   dashboard within a second or two, without needing to refresh.

## Troubleshooting

- **"Admin dashboard not set up yet" message** - one or more of the three
  Supabase environment variables is missing in Netlify. Double-check
  step 4 and redeploy.
- **Signed in, but the dashboard is empty and no error shows** - this is
  expected until someone submits the form at least once.
- **"Could not sign in"** - double check the email/password, and that the
  person accepted their invite email (or that you created them with a
  password directly).
- **Leads aren't appearing after a form submission** - open your
  browser's developer console on the live site while submitting the
  form; any error will be logged there and will help narrow down
  whether it's a missing environment variable or a typo in a key.
