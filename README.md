# MBA Lab · Mini Simulations

Interactive business simulations over an animated 3D Jakarta (day/night), in English, Bahasa Indonesia, 日本語 and 中文. Static site: open `index.html` or host it on GitHub Pages.

- Structure and "where do I edit": [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Add a simulation (folder layout, `sim.js`, smoke test): [docs/ADDING-A-SIMULATION.md](docs/ADDING-A-SIMULATION.md)
- Save submitted ideas to Google Drive: [docs/FORM-SETUP-GOOGLE-DRIVE.md](docs/FORM-SETUP-GOOGLE-DRIVE.md)

Live simulation: **SMART Calculator** (multi-criteria decision analysis). Others are listed as coming soon in `data/simulations.js`.

## Deploy on GitHub Pages
1. Repo **Settings → Pages**.
2. **Source:** Deploy from a branch · **Branch:** `main` · **Folder:** `/ (root)` · Save.
3. After about a minute the site is live at `https://<user>.github.io/mba-lab/`. Every push to `main` redeploys it.

All paths in the site are relative, so it works under the `/mba-lab/` sub-path and on a custom domain. `.nojekyll` tells Pages to serve the files as they are.
