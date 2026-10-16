# Simulation blueprint (UI/UX backbone)

Goal: every simulation feels the same to use. What differs is the **animation and visuals that depend on the context** (a factory, a market, a courtroom), never the frame around them.

## What is shared (`shared/simkit.css`)
| Layer | Classes | Meaning |
|---|---|---|
| Shell | `sk-root`, `sk-top`, `sk-back`, `sk-tabs`, `sk-scroll`, `sk-wrap`, `sk-sub`, `sk-h` | Root, header with back button and Cases/Lab tabs, scroll area, page width, base buttons and focus ring |
| Game family | `sg-root`, `sg-menu`, `sg-hero`, `sg-rank`, `sg-xp`, `sg-levels`, `sg-lv`, `sg-st`, `sg-badges`, `sg-bd`, `sg-level`, `sg-hud`, `sg-steps`, `sg-stage`, `sg-say`, `sg-panel`, `sg-main`, `sg-kpis`, `sg-res`, `sg-fb`, `sg-cf` … | Menu with rank, XP and 3-star levels; badges; one-window level layout (stage left, panel right on desktop, stacked on phone); steps; result card; confetti |
| Lab | `sx-*` | Sandbox cards, sliders, verdict, learn box |
Accent: `--sk-g1` / `--sk-g2` (default green to cyan). A simulation may override them on its root.

## What stays in the simulation
Engine and numbers, scene or canvas drawing (`scene/`), charts, strings, thumbnail, and any widget that exists only there (e.g. the AI Governance control chips, the Van Westendorp chart, the 3D BUMN map, the SMART Calculator editor). Keep these in `ui/style.css` under the simulation's own root class and prefix. A class is moved into the kit only when two or more simulations need the identical rule.

## Visual size scale (stage 960 x 540 logical)
- Text in the scene: 13 px minimum, titles 17 to 20 px.
- Icons and badges: 34 to 40 px; particles 3 to 5 px radius; coins about 10 px; avatars 28 to 34 px.
- Nothing may overlap text; a scene element that carries a label needs 8 px clear space.
- Everything must still read at the 390 px phone width.

## Checklist for a new simulation
1. Copy `simulations/_template`, keep `sk-root` on the root and the shell markup.
2. Game style: reuse the `sg-*` menu, hud, steps, panel and result markup (see `ai-governance/ui/game.js`).
3. Put only specific rules in your own `style.css`; never copy shared rules.
4. Run `node tests/smoke.js`, your engine tests, and `node tests/shots.js` before and after changes (`python3 tests/shotdiff.py a b`).

## Migration status
- On `simkit.css` (game family): AI Governance, A/B Testing, Five Forces, Van Westendorp.
- Calculators use the SMART frame (`shared/studio.css`: connected stepper, required-to-continue checklist, guide pop-up, Bit assistant): SMART Calculator and Decision Tree Calculator. Name any calculation-type simulation "... Calculator".
- Still on their own base CSS (same look, duplicated rules): Bullwhip, BUMN Explorer, DISC Crisis Room, Koperasi Tycoon, Life 40, Negotiation & BATNA, Try Out MBA, SMART Calculator (uses `studio.css`). They can move over class by class; compare `node tests/shots.js` before and after.
- Tools: `tests/shots.js` + `tests/shotdiff.py` for visual regression.
