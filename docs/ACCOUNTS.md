# Accounts (Google sign-in, profile, history, cloud progress)

Backend: Supabase (Postgres + Auth). Frontend: `features/account/`. No build step.

## One-time setup
1. Supabase: create a project. Google Cloud: create an OAuth Client ID (Web). Redirect URI = `https://<ref>.supabase.co/auth/v1/callback`; JavaScript origin = the Vercel URL.
2. Supabase -> Authentication -> Providers -> Google: paste Client ID + Secret. URL Configuration: Site URL and Redirect URLs = the Vercel URL.
3. **Supabase -> SQL Editor: run `supabase/schema.sql`** (tables, row level security, delete-account function).
4. `data/config.js`: `supabaseUrl` and `supabaseKey` (publishable key). Both are public by design; the data is protected by row level security.

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
Try Out MBA is wired in `simulations/tryout-mba/app.js` (cloudSync / cloudPush); `MBALAB.tryout.merge` combines device and cloud stats.

## Notes
- Guests keep working; progress stays in localStorage. On first sign-in the device progress is merged into the account.
- Do not put the `service_role` key or the Google client secret anywhere in this repository.

## Sinkron simulasi & leaderboard

- Setiap simulasi memakai `MBALAB.cloud(simId, {read, write, merge, refresh})`. Progress lokal digabung dengan data akun (nilai terbesar / gabungan), lalu disimpan ke `user_state`. `cloud.changed()` dipanggil saat progress berubah; `cloud.attempt({at, score 0-100, variant, detail})` mencatat satu percobaan.
- Tersinkron: Try Out MBA, Bullwhip Effect, Life 40, BATNA, BUMN Explorer. DISC Crisis Room dan Smart Decision Studio tidak (tidak punya skor).
- Leaderboard: opt-in (nama tampilan di dialog Akun). Poin = jumlah skor terbaik (0-100) per level/skenario. Skor dilaporkan klien, jadi hanya "friendly competition" (ada batas skor, cek waktu, dan rate limit di `attempts_guard`).
- **Setelah update, jalankan ulang `supabase/schema.sql` di SQL Editor** (idempotent).
- Error Google `redirect_uri_mismatch`: tambahkan `https://<project>.supabase.co/auth/v1/callback` ke Authorized redirect URIs di Google Cloud.
