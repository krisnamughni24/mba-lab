# Adding a simulation (microsite)

Every simulation is a small self-contained folder under `simulations/<id>/`. It is loaded only when a visitor opens it, so adding one never slows down the landing page and never touches other simulations.

## Steps
1. Copy `simulations/_template/` to `simulations/<your-id>/` (lowercase, hyphens).
2. In the four files replace `'my-simulation'` with `<your-id>`:
   - `strings.js` – texts in every language (`en`, `id`, `ja`, `zh`).
   - `template.js` – the HTML of the page. `data-i18n="key"` = translated text, `data-sim-back` = back button.
   - `app.js` – logic inside `mount(host)`; optional `onShow`, `onLang(lang)`, `onTheme(isDay)`.
   - `style.css` – styles, scoped under `#app`.
3. Register it in `data/simulations.js`. Replace the existing `"status": "soon"` entry, or add a new one:
   ```js
   {
     id: 'my-simulation', status: 'live', icon: '📈', category: 'analytics',
     name:        { en: 'My Simulation', id: 'Simulasi Saya', ja: '…', zh: '…' },
     description: { en: '…', id: '…', ja: '…', zh: '…' },
     path: 'simulations/my-simulation/',
     scripts: ['strings.js', 'template.js', 'app.js'],
     styles: ['style.css']
   }
   ```
   `category` must be an id from `data/categories.js`.
4. Open `index.html` – the catalog card becomes clickable.

## Rules of thumb
- A simulation may bring any extra files (data, images, libraries): list extra scripts/styles in the entry; paths are relative to `path`.
- Use `host.querySelector(...)`/`host.addEventListener(...)` inside `mount`, not `document`, so closing and reopening works.
- Everything global is under `MBALAB`. Simulations should not depend on each other.
- Texts: never hard-code visible words; add keys to `strings.js` and use `t('key')`.
