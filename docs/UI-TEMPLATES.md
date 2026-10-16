# UI templates

Every live simulation follows one of four official UI/UX templates. The contract is data in
[`data/ui-templates.js`](../data/ui-templates.js) and is enforced by `node tests/structure.js`; a working starter for each
template lives in `templates/<type>/` (copy it to `simulations/<your-id>/`).

| Template | Use it for | Kit stylesheet | Root class | Members |
|---|---|---|---|---|
| **Scenario** | Pick a scenario or level, play it round by round on a stage, guide pop-up. Optional parts: rank/XP hero, steps, side panel, badges (wrapped in `sc-root`) | `shared/simkit.css`, `shared/scenario.css` | `sk-root` + `sc-select` / `sc-play` | A/B Testing Lab, AI Governance Lab, DISC Crisis Room, Porter's Five Forces, Van Westendorp Calculator, BATNA, Bullwhip Effect, Koperasi Tycoon, Life 40 |
| **Explorer** | Browse a dataset in 3D/cards, then a quiz | `shared/simkit.css`, `shared/explorer.css` | `ex` | BUMN Explorer |
| **Calculator** | Step-by-step input, a result card, a downloadable report | `shared/simkit.css`, `shared/studio.css` | `sd` | Decision Tree Calculator, SMART Calculator, Van Westendorp Calculator |
| **Exam** | Timed multiple-choice practice with review | `shared/simkit.css`, `shared/exam.css` | `xm` | Try Out MBA |

## How to use

1. Choose the template that fits the learning goal.
2. `cp -r templates/<type> simulations/<your-id>` and replace the placeholder id everywhere.
3. Add an entry to `data/simulations.js` with `"template": "<type>"`.
4. Keep the required classes in `ui/template.js` (listed per template in `data/ui-templates.js`). Add your own prefixed classes *beside* the kit classes, never instead of them.
5. Run `npm test`.

## Catalog filters

The "Choose a simulation" window filters by **type** (the four templates), **topic** (category) and **status** (live / coming soon).
For coming-soon entries `template` is the *planned* type.

## Checklist

- [ ] kit stylesheets are listed in `sim.js` in order
- [ ] required classes present in `ui/template.js`
- [ ] strings in four languages (`[en, id, ja, zh]`)
- [ ] `tests/structure.js`, `tests/engines.js`, `tests/starters.js`, `tests/smoke.js` pass

Starters: `templates/scenario` (plain scenario cards) and `templates/scenario-levels` (levels, rank/XP, steps, side panel, badges), `templates/explorer`, `templates/calculator`, `templates/exam`.
