# Accounts (Google sign-in, profile, history, cloud progress)

Backend: Supabase (Postgres + Auth). Frontend: `features/account/`. No build step.

## One-time setup
1. Supabase: create a project. Google Cloud: create an OAuth Client ID (Web). Redirect URI = `https://<ref>.supabase.co/auth/v1/callback`; JavaScript origin = the Vercel URL.
2. Supabase -> Authentication -> Providers -> Google: paste Client ID + Secret. URL Configuration: Site URL and Redirect URLs = the Vercel URL.
3. **Supabase -> SQL Editor: run `supabase/schema.sql`** (tables, row level security, delete-account function).
4. `data/config.js`: `supabaseUrl` and `supabaseKey` (publishable key). Both are public by design; the data is protected by row level security.

## Google sign-in screen shows "<project>.supabase.co"
With the plain redirect flow Google names the domain it redirects to (`<ref>.supabase.co`) because that domain cannot carry verified branding. Two ways to fix it:
1. **Free, recommended:** set `googleClientId` in `data/config.js` to the same OAuth Web Client ID that is in Supabase (it is public, not the secret). Google's own button then signs in on your site, the chooser says "continue to mba-lab.vercel.app", and the ID token goes to Supabase (`signInWithIdToken`, with a nonce). Requirements: the Vercel URL is in the Client ID's *Authorized JavaScript origins*, and in Supabase → Authentication → Providers → Google the option "Skip nonce checks" stays **off**. If the Google script cannot load, the old redirect button is shown instead.
2. **Branding on the Google consent screen:** in Google Cloud → Google Auth Platform → Branding set the app name to "MBA Lab" and upload `assets/logo/google-consent-120.png`. Without brand verification Google may still show a plain domain on the account chooser, which is why option 1 matters.
3. **Paid:** a Supabase custom domain (for example `auth.yourdomain.com`), then the chooser shows that domain. Showing an app name and logo on the consent screen additionally needs Google's brand verification, which requires a domain you own (a `vercel.app` subdomain does not qualify).

## Who may sign in
Default: any Google account (`access_mode = 'public'`). To restrict to a class, see the commented block at the bottom of `schema.sql` (allowed emails / domains). It is enforced in the database, not in the browser.

## How simulations use it
```js
MBALAB.account.user()                 // {id,name,email,avatar} or null (guest)
await MBALAB.account.pull(simId)      // saved JSON for this simulation, or null
MBALAB.account.push(simId, data)      // debounced upsert of the JSON document
MBALAB.account.attempt(simId, {at, score, detail})   // history row (idempotent per user+sim+at)
MBALAB.on('auth', user => ...)        // fired after sign-in (user) / sign-out (null)
```
Try Out MBA is wired in `simulations/tryout-mba/ui/app.js` (cloudSync / cloudPush); `MBALAB.tryout.merge` combines device and cloud stats.

## Notes
- Guests keep working; progress stays in localStorage. On first sign-in the device progress is merged into the account.
- Do not put the `service_role` key or the Google client secret anywhere in this repository.

## Simulation sync and leaderboard

- Each simulation uses `MBALAB.cloud(simId, {read, write, merge, refresh})`. Local progress is merged with the account data (highest score / union) and saved to `user_state`. Call `cloud.changed()` when progress changes; `cloud.attempt({at, score 0-100, variant, detail})` records one attempt.
- Synced: Try Out MBA, Bullwhip Effect, Life 40, BATNA, BUMN Explorer. DISC Crisis Room and the calculators (SMART, Decision Tree) are not synced because they have no score.
- Leaderboard: opt-in (display name in the Account dialog). Points = sum of best scores (0-100) per level or scenario. Scores are reported by the client, so it is only a friendly competition (score caps, time checks and a rate limit in `attempts_guard`).
- **After every schema update, re-run `supabase/schema.sql` in the SQL Editor** (it is idempotent).
- Google error `redirect_uri_mismatch`: add `https://<project>.supabase.co/auth/v1/callback` to the Authorized redirect URIs in Google Cloud.
