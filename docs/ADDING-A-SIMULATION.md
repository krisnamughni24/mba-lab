# Adding a simulation (microsite)

Every simulation is a self-contained folder under `simulations/<id>/`. It is loaded only when a visitor opens it, so adding one never slows down the landing page and never touches other simulations.

## Folder layout
```
simulations/<id>/
  sim.js          the list of files to load (scripts + styles), in order
  i18n/           strings.js: every visible text in en / id / ja / zh
  ui/             template.js (HTML), app.js (mount, events), style.css (scoped styles)
  engine/         pure logic, no DOM, no MBALAB (testable in node)      — optional
  data/           content tables: questions, company facts, events …     — optional
  scene/          3D / canvas rendering                                  — optional
shared/           code used by several simulations (Bit assistant, simkit.css UI backbone, studio.css base theme)
core/namespace.js MBALAB.util: esc, clamp, sfx
```
Use only the subfolders you need. A small simulation is just `sim.js` + `i18n/` + `ui/`.

## Steps
1. Copy `simulations/_template/` to `simulations/<your-id>/` (lowercase, hyphens).
2. In every file replace `'my-simulation'` with `<your-id>`:
   - `i18n/strings.js` – texts in every language (`en`, `id`, `ja`, `zh`).
   - `ui/template.js` – the HTML of the page. `data-i18n="key"` = translated text, `data-sim-back` = back button.
   - `ui/app.js` – logic inside `mount(host)`; optional `onShow`, `onLang(lang)`, `onTheme(isDay)`.
   - `ui/style.css` – styles, scoped under your own root class.
   - `sim.js` – add every new file you create (engine, data, scene) here, in load order.
3. Register it in `data/simulations.js` (metadata only; the file list lives in `sim.js`). Replace the existing `"status": "soon"` entry, or add a new one:
   ```js
   {
     id: 'my-simulation', status: 'live', icon: '📈', category: 'analytics',
     name:        { en: 'My Simulation', id: 'Simulasi Saya', ja: '…', zh: '…' },
     description: { en: '…', id: '…', ja: '…', zh: '…' }
   }
   ```
   `category` must be an id from `data/categories.js`. Optional `developer: 'Name (Team)'` credits someone other than the main developer; the name appears on the card, the loading screen and, with the simulations it built, in the Info window automatically. Add a thumbnail in `features/catalog/thumbs.js` (optional).
4. Run the smoke test (below). Open `index.html` – the catalog card becomes clickable.

## Look and feel: use the sim kit
Games and labs use the same UI backbone, `shared/simkit.css`; calculators use the guided frame in `docs/CALCULATORS.md`. Backbone: `shared/simkit.css` (add it first in `styles` in `sim.js`, as the template does). Put the class `sk-root` on your root element and use the shared classes: shell `sk-top` `sk-back` `sk-tabs` `sk-scroll` `sk-wrap`; game family `sg-*` (menu, hero, rank, levels, badges, steps, panel, results); lab primitives `sx-*`. Only what is truly specific (the scene, charts, unique widgets) goes in your own `ui/style.css`. See `docs/SIM-BLUEPRINT.md` for the contract and the visual size scale.

## Rules of thumb
- Paths in `sim.js` are relative to the simulation folder; `../../shared/x.js` reaches shared code. Do not import from another simulation's folder: move the common part to `shared/`.
- Use `host.querySelector(...)`/`host.addEventListener(...)` inside `mount`, not `document`, so closing and reopening works.
- Keep `engine/` files free of `MBALAB` and the DOM so they can be tested with plain `node`.
- Texts: never hard-code visible words; add keys to `i18n/strings.js` and use `t('key')`.
- Saving progress to the account: `MBALAB.cloud(id, {read, write, merge, refresh})`, see `docs/ACCOUNTS.md`.

## Translations
Write only the English: `key: ['English text']` in `i18n/strings.js`, then `ANTHROPIC_API_KEY=… npm run translate -- <your-id>` (or `DEEPL_API_KEY=…`; `--provider mock` for a dry test, `--dry` to preview). It fills `id`, `ja`, `zh`, keeps placeholders and tags, and never overwrites existing translations. Review `git diff`; `node tests/structure.js` fails until every key has four languages. Indonesian is formal (Anda).

## Tests
```
npm install && npx playwright install chromium   # once
npm run test:structure                           # catalog + file lists + translations + secrets
npm run test:engines                             # runs simulations/*/tests/engine.js (pure node, seconds)
python3 -m http.server 8099 &                    # in the repo root
npm run test:smoke                               # opens every live simulation; fails on a 404, script error or empty page
```
Put your engine test in `simulations/<id>/tests/engine.js`; it prints `engine OK` and exits non-zero on failure, and `tests/engines.js` finds it automatically. Run the smoke test after moving files or editing a `sim.js`. See `CONTRIBUTING.md` for the full pull-request workflow.
