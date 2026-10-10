# MBA Lab · Mini Simulations

Interactive mini MBA simulations in a single static page, set over an animated 3D Jakarta-style city (Three.js).

- **SMART Decision Studio**: multi-criteria decision analysis with an editable matrix, weights, aggregate scores, drill-down and sensitivity analysis.
- Night / Day mode, camera controls, 8-bit music and sound effects (Web Audio, no audio files).
- Languages: English, Bahasa Indonesia, 日本語, 中文.

## Run locally

Open `index.html` in a browser (Three.js loads from a CDN, so an internet connection is needed for the 3D scene).

## Configuration

The idea form sends submissions only when `formEndpoint` is set in `window.MBALAB_CONFIG` at the top of `index.html`; otherwise it shows that submissions are temporarily unavailable.

Developed by KrisnaDev.
