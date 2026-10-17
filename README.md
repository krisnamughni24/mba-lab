<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo/logo-horizontal-dark.png">
    <img src="assets/logo/logo-horizontal-light.png" alt="MBA Lab · Mini simulations for business decisions" width="520">
  </picture>
</p>

# MBA Lab · Mini Simulations

Interactive business simulations over an animated 3D Jakarta (day and night), in **English, Bahasa Indonesia, 日本語 and 中文**. A static site: no build step, no framework. Open `index.html` or host the folder anywhere.

**Live site:** https://mba-lab.vercel.app/

## Simulations (13 live)

| Type | Simulation | Topic |
|---|---|---|
| Calculator | **SMART Calculator** | Multi-criteria decision analysis, 4 guided parts, PDF/HTML/Markdown report |
| Calculator | **Van Westendorp Calculator** | Price sensitivity meter: four curves, acceptable price range, price test, report download |
| Calculator | **Decision Tree Calculator** | Expected value, roll-back, EVPI, risk attitude, sensitivity, report download |
| Game | **AI Governance Lab** | Responsible AI decisions in levels |
| Game | **A/B Testing Lab** | Experiment design and statistics |
| Game | **Porter's Five Forces** | Industry analysis cases |
| Game | **Bullwhip Effect** | Supply chain demand amplification |
| Game | **Koperasi Tycoon** | Running a cooperative |
| Game | **BATNA: Patience** | Negotiation |
| Game | **DISC Crisis Room Test** | Leadership style under pressure |
| Explorer | **BUMN Explorer** | 54 Danantara-linked state firms (plus subsidiary landmarks) in a 3D city, with a fact-check quiz. Developer: 077 - M. Zildjian Laxamana |
| Explorer | **Word Network** | Add one word, then two or more, and watch how people's word associations connect them (SWOW-EN data, see `docs/DATA-SOURCES.md`), with Benefits and Trade-offs modes (303 curated concepts, pick several concepts and several contexts) and a predict-the-association quiz. |
| Test | **Try Out MBA** | Practice questions |
| Life | **Life 40** | Long-term planning |
| Game | **Corporate Society** | An endless career at a fictional company in seven roles (Finance, IT, Marketing, HR, Operations, Sales, Legal), junior to department head, with a review every eight days: choose where to go, who to trust and what to do (69 story events with four alternatives each, eight story chapters, a values profile, four working styles, five personal goals, a mid-week review, daily recaps, colleague standing, endings, concepts met). Content is the author's teaching judgement. |

The full roadmap (about 120 more) is listed as "coming soon" in `data/simulations.js`. Calculation-type simulations are always named "… Calculator".

## Run it locally
```bash
git clone https://github.com/krisnamughni24/mba-lab.git
cd mba-lab
python3 -m http.server 8099      # or: npm start
# open http://localhost:8099/
```
Opening `index.html` directly also works; a local server is only needed for the tests.

## Test
```bash
npm install                      # once: installs Playwright (headless Chromium)
npx playwright install chromium  # once
npm run test:structure           # catalog, file lists, translations, secrets (instant)
npm run test:engines             # pure-logic tests, no browser, seconds
npm run test:smoke               # opens all live simulations (needs the server above), about 2 minutes
```
CI (`.github/workflows/ci.yml`) runs both on every push and pull request.

## Project map
```
index.html          shell: nav bar, stage, landing, app slot
data/               content and config: catalog, categories, texts, form settings
core/               small engine: namespace + events, i18n, loader, simulation host
features/           site features, one folder each (landing, scene, theme, audio, account, …)
simulations/<id>/   one microsite per simulation, loaded on demand
shared/             code shared by simulations: simkit.css, studio.css, assistant.js, cards.js (animated case cards for scenario pickers), report.js
css/                theme (cyber.css), layout, nav
tools/              translate.js: fills missing id/ja/zh texts from your English via API
tests/              structure.js, engines.js, smoke.js, shots.js + shotdiff.py (visual regression)
supabase/           database schema for accounts and leaderboard
apps-script/        Google Apps Script that saves submitted ideas to Drive
docs/               documentation (start at docs/README.md)
```

## Build your own simulation
1. Pick one of the four UI templates (scenario, explorer, calculator, exam; see [docs/UI-TEMPLATES.md](docs/UI-TEMPLATES.md)) and copy its starter `templates/<type>/` to `simulations/<your-id>/`.
2. Write the engine, strings (4 languages) and UI.
3. Add one entry to `data/simulations.js`.
4. Run the tests and open a pull request.

Details: [CONTRIBUTING.md](CONTRIBUTING.md) · [docs/ADDING-A-SIMULATION.md](docs/ADDING-A-SIMULATION.md) · [docs/CALCULATORS.md](docs/CALCULATORS.md)

## Documentation
[docs/README.md](docs/README.md) is the index: brand identity, architecture, the UI kit, calculators, accounts (Supabase + Google sign-in), and the idea form.

## Deploy
Any static host works. Production runs on **Vercel** (import the repo, framework preset "Other", no build command, output directory `/`). **GitHub Pages** also works: Settings → Pages → branch `main`, folder `/ (root)`. All paths are relative, so sub-paths and custom domains are fine; `.nojekyll` keeps Pages from processing files.

## Security
The Supabase URL and publishable key in `data/config.js` are public by design; data is protected by row level security. **Never commit** the `service_role` key, the database password or the Google OAuth client secret.

## License
[MIT](LICENSE) © 2026 Krisna Mughni. Contributions are accepted under the same license.
