# MBA Lab · Mini Simulations

Interactive mini MBA simulations in a static web page, set over an animated 3D Jakarta-style city (Three.js).

- **SMART Decision Studio**: multi-criteria decision analysis with an editable matrix, weights, aggregate scores, drill-down and sensitivity analysis.
- Night / Day mode, pause, camera controls.
- 8-bit music and sound effects (Web Audio, no audio files).
- Languages: English, Bahasa Indonesia, 日本語, 中文.

No build step, no backend. Open `index.html` in a browser (Three.js loads from a CDN, so the 3D scene needs an internet connection), or serve the folder with any static server, e.g. `python3 -m http.server`.

## Project structure

```
index.html            page markup; loads the CSS and scripts below, in order
css/
  base.css            theme, glassmorphism layers, landing page, SMART Decision Studio
  components.css      navbar, dialogs, catalog, day theme
  controls.css        floating buttons, camera pad, language popover, About grid, audio buttons
js/
  config.js           site configuration (MBALAB_CONFIG)
  i18n/               en.js id.js ja.js zh.js (UI strings) + i18n.js (t() and current language)
  smart.js            SMART Decision Studio engine and UI
  catalog.js          simulation catalog (add new simulations here)
  overlays.js         modal windows, open/close, switch to the SMART view
  landing-fx.js       landing page effects
  city3d.js           animated 3D city: scene, traffic, aircraft, day/night, camera, render loop
  controls.js         day/night switch, pause, camera controls
  dialogs.js          About and Share an Idea dialogs
  form.js             idea form validation and submission
  language.js         language switching and popover
  audio.js            chiptune music and sound effects
  main.js             entry point
```

Scripts are classic (non-module) scripts that share one global scope, so the load order in `index.html` matters.

## Configuration

`js/config.js` holds `MBALAB_CONFIG`. The idea form sends submissions only when `formEndpoint` is set (a URL that accepts a JSON `POST`); otherwise it shows that submissions are temporarily unavailable.

## Adding a translation key

Add the key to all four files in `js/i18n/`, then use `data-i18n="key"` (text) or `data-ia="attr=key"` (attributes) in the HTML, or `t('key')` in JavaScript.

Developed by KrisnaDev.
