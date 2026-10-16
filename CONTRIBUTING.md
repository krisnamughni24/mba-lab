# Contributing to MBA Lab

Thanks for helping. The project is plain HTML, CSS and JavaScript with no build step, so anyone who can edit a file can contribute: a translation fix, a new case for an existing game, or a whole new simulation.

## How development works

```
fork → branch → change → test → pull request → review → merge to main → Vercel deploys
```

1. **Fork** `krisnamughni24/mba-lab` and clone your fork.
2. **Branch** from `main`: `git switch -c feat/my-simulation` (use `fix/…` for bugs, `docs/…` for docs).
3. **Run locally**: `python3 -m http.server 8099`, open http://localhost:8099/.
4. **Change** only what the task needs. Other simulations must keep working.
5. **Test**: `npm install && npx playwright install chromium`, then `npm test`.
6. **Open a pull request** against `main`. Fill in the template. CI runs the same tests.
7. A maintainer reviews. After the merge, `main` is deployed automatically.

Small fixes (typos, a translation, a number in a case) can go straight to a pull request. For a new simulation, open an issue first ("Simulation idea") so the name, category and approach are agreed before you build.

## Adding a simulation (short version)

1. `cp -r simulations/_template simulations/<your-id>` (lowercase, hyphens), then replace `my-simulation` with your id in every file.
2. Put the maths in `engine/engine.js`: pure functions, no DOM, no `MBALAB`. Write `tests/engine.js` for it (plain `node`, print `engine OK` on success, exit non-zero on failure). `npm run test:engines` picks it up automatically.
3. Write every visible text in `i18n/strings.js` as `[en, id, ja, zh]`. No hard-coded words in the UI.
4. Build the UI on the shared kit:
   - **Calculator** (you compute something for the user's own case): use the guided frame in `shared/studio.css`, see [docs/CALCULATORS.md](docs/CALCULATORS.md). Name it "… Calculator".
   - **Game or lab** (levels, scoring, scenarios): use `shared/simkit.css`, see [docs/SIM-BLUEPRINT.md](docs/SIM-BLUEPRINT.md).
5. List your files in `sim.js`, register the catalog entry in `data/simulations.js` (set `status: 'live'`), and optionally add a thumbnail in `features/catalog/thumbs.js`.
6. Full walkthrough: [docs/ADDING-A-SIMULATION.md](docs/ADDING-A-SIMULATION.md).

The fastest way to learn the pattern is to read a small existing simulation next to the template: `simulations/decision-tree-ev` (calculator) or `simulations/ab-testing` (game).

## Rules that keep the project coherent

- **Four languages**: `en`, `id`, `ja`, `zh` for every visible string. If you cannot write one, give an honest draft in English and say so in the pull request; do not leave keys missing.
- **Indonesian** addresses the visitor formally (Anda; the assistant says saya).
- **Copy** is sentence case; use `&` in names and labels, `and` in sentences. UPPERCASE comes from CSS, never from typing.
- **Look and feel**: reuse kit classes, put only truly specific rules in your own `ui/style.css`, scoped under your root class and prefix. Do not copy shared rules. Use theme tokens (`--cy`, `--panel`, …), never hard-coded colours, and never write `body.day …` rules (see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)).
- **Isolation**: a simulation never imports from another simulation's folder. Shared code goes to `shared/`.
- **DOM**: inside `mount(host)` use `host.querySelector`, not `document`, so closing and reopening works.
- **Layout**: must work at 390 px phone width and at desktop, in night and day.
- **No build tooling**: classic scripts, no bundler, no external runtime dependencies. Playwright is a dev-only test dependency.
- **Secrets**: never commit the `service_role` key, a database password or an OAuth client secret. The publishable Supabase key and the Web3Forms access key in `data/config.js` are public by design.

## Before you open the pull request

```bash
npm run test:engines          # fast
python3 -m http.server 8099 & # keep it running
npm run test:smoke            # all live simulations mount without errors
node tests/shots.js out/ http://localhost:8099/   # optional: screenshots to compare layouts
python3 tests/shotdiff.py before/ after/          # optional: visual diff of two screenshot folders
```

If you changed shared CSS (`shared/*.css`), run the screenshot comparison before and after and mention any intended visual change.

## Commit style
Short imperative subject, a body that says why. Example: `Decision Tree Calculator: add EVPI card`.

## Reporting problems
Use the issue templates (bug report, simulation idea). For security problems, do not open a public issue; contact the maintainer directly.
