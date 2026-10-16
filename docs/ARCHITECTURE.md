# Architecture

Plain HTML/CSS/JS, no build step. Scripts are classic (non-module) so the site also works when `index.html` is opened from disk.

```
index.html            shell: nav bar, stage, #landing, #app, script list
data/                 CONTENT & CONFIG – the files you edit most
  config.js             form delivery (Google Drive / Web3Forms)
  languages.js          available languages
  landing.js            hero texts
  about.js              About dialog texts, developer name, topics
  idea-form.js          Share-an-Idea texts, fields, submission types
  categories.js         catalog categories
  simulations.js        simulation catalog (one entry per simulation)
  features.js           which features load, and in which order
core/                 small engine: namespace/event bus, i18n, overlays, loader, simulation host, kinetic text effects, boot
features/<name>/      one folder per site feature (scripts, styles, strings)
  landing scene theme camera language audio catalog about idea-form
simulations/<id>/     one microsite per simulation, lazy-loaded: sim.js (file list) + i18n/ ui/ and optionally engine/ data/ scene/  tests/ (assertions) tools/ (balance and trace scripts, not run by CI)
                        (see ADDING-A-SIMULATION.md)
docs/                 documentation, index in docs/README.md
shared/               code shared by several simulations: simkit.css (game/lab UI kit), studio.css (calculator frame), assistant.js (Bit robot), cards.js (BATNA-style animated case cards for every scenario picker), report.js (PDF/HTML download)
tools/                translate.js (fills missing translations via API)
tests/                structure.js (repo integrity), engines.js (all engine tests), smoke.js (opens every live simulation), shots.js + shotdiff.py (visual regression)
css/                  core.css (layout, dialogs, loader) · nav.css (top bar) · cyber.css (THE THEME: colours, fonts, type scale)
apps-script/Code.gs   Google Apps Script that saves ideas to Drive
```

## Where do I edit…?
| I want to change | File |
|---|---|
| About text, developer name | `data/about.js` |
| Share-an-Idea form wording / types | `data/idea-form.js` |
| Where ideas go | `data/config.js`, `apps-script/Code.gs` |
| Landing headline | `data/landing.js` |
| Add / rename a simulation | `data/simulations.js` (catalog entry) and `simulations/<id>/sim.js` (its files) |
| Small helpers shared by simulations (esc, clamp, sound) | `core/namespace.js` → `MBALAB.util` |
| Colours, fonts, night/day look | `css/cyber.css` (variables at the top; `body.day` block = day palette) |
| Text animation (decode, glitch every 2 s) | `core/kinetic.js` (selector lists + timings at the top) |
| Music, sounds, typing + loading sounds, volume mix | `features/audio/audio.js` (`MUSIC_LEVEL`, `SFX_LEVEL`) |
| Tips from the robot (Bit) | `shared/assistant.js` (texts in each simulation's strings) |
| Report download (PDF, HTML) used by calculators | `shared/report.js` |
| Decision Tree Calculator: maths (roll-back, EVPI, risk attitude, sensitivity), cases | `simulations/decision-tree-ev/engine/engine.js` (testable in node) |
| Decision Tree Calculator: UI, report | `simulations/decision-tree-ev/ui/app.js` |
| Negotiation & BATNA: levels, NPC rules, scoring | `simulations/negotiation-batna/engine/engine.js` (`LEVELS`; pure logic, testable in node) |
| Negotiation & BATNA: isometric neon scene | `simulations/negotiation-batna/scene/scene.js` (canvas; palette `PAL.night` / `PAL.day`) |
| Negotiation & BATNA: dialogue and lessons | `simulations/negotiation-batna/i18n/strings.js` |
| DISC Crisis Room: crises, options and style texts (4 languages) | `simulations/disc-crisis-room/i18n/strings.js` |
| DISC Crisis Room: scoring rules | `simulations/disc-crisis-room/engine/engine.js` (testable in node) |
| BUMN Explorer: companies, world positions (x/z/radius), sectors, quiz logic | `simulations/bumn-explorer/engine/engine.js` (testable in node) |
| BUMN Explorer: company descriptions and UI texts (4 languages) | `simulations/bumn-explorer/i18n/strings.js` |
| BUMN Explorer: 3D engine (shared kit, camera orbit/zoom, fade, picking, theme) | `simulations/bumn-explorer/scene/scene.js` |
| BUMN Explorer: per-company facts (founding year, HQ, history, scale, insight; 4 languages) | `simulations/bumn-explorer/data/facts.js` |
| Catalog thumbnails (one inline SVG per simulation, keyed by id) | `features/catalog/thumbs.js` |
| BUMN Explorer: second wave of 23 companies (positions, clues, profiles in 4 languages) | `simulations/bumn-explorer/data/more.js` |
| BUMN Explorer: 3D builders for the second wave | `simulations/bumn-explorer/scene/buildings2.js` |
| BUMN Explorer: Danantara guide facts (legal names, key figures, why it matters, fact-check notes, subsidiary counts; 4 languages) | `simulations/bumn-explorer/data/guide.js` |
| BUMN Explorer: guide alignment (15 sectors, parent/subsidiary flags, removed and added companies with positions) | `simulations/bumn-explorer/data/danantara.js` |
| BUMN Explorer: 3D builders for the guide additions (DAM, DIM, DDMF, shipyards, insurers, survey group, ...) | `simulations/bumn-explorer/scene/buildings3.js` |
| BUMN Explorer: detail pass (richer, animated versions of ~25 buildings: banks, Telkom, Garuda, shipyards, mining, insurers, ...; loads last and overrides earlier builders) | `simulations/bumn-explorer/scene/buildings4.js` |
| BUMN Explorer: terrain and infrastructure (sea, mountains, city, highway, rail, river, runway, forest) | `simulations/bumn-explorer/scene/world.js` |
| BUMN Explorer: one 3D builder per company (port, offshore platform, power plant, mine, ...) | `simulations/bumn-explorer/scene/buildings.js` |
| 3D city | `features/scene/scene.js` |
| Remove a feature | delete its line in `data/features.js` |

## Extension points
- `MBALAB.feature(id, init)` registers a feature; `core/main.js` runs it after its files load.
- `MBALAB.ui.nav/fab/floating/dialog(el, order)` place UI in shared slots.
- `data-action="name"` on a button runs `MBALAB.actions[name]`.
- `MBALAB.on('lang' | 'theme' | 'ready', fn)` events.
- `MBALAB.sims.define(id, parts)` builds a simulation microsite.
- Texts: `t('key')` / `data-i18n` for interface strings, `tr({en,id,ja,zh})` for content.

## Theme rules (night / day)
- Night and day differ **only by colour**. Text, layout and sizes are the same; never put copy in a `body.day` rule.
- Colours are CSS variables defined in `css/cyber.css`: `:root` = night, `body.day` = day. Components use the variables (`--cy --mg --am --gn --panel --edge --txt …`), not hard-coded colours.
- Variable aliases (`--ink`, `--line`, `--teal` …) are re-declared inside `body.day`, otherwise they would keep their night value.
- **The only place that may say `body.day` is the token block at the top of `css/cyber.css`** (plus `.kn`, the position of the night/day switch knob, and `body.day .sd{…}` token overrides in the SMART stylesheet). Every component rule is written once, against tokens such as `--btn-hover-bg`, `--inp-bg`, `--nav-bg`, `--mw-ring`, `--t-*` (SMART). To change how day looks, change a token value; to add a themed colour, add the token to both `:root` and `body.day`. The legacy stylesheets (`core.css`, `nav.css`, `features/*/*.css` except `audio.css`) are wrapped in `@layer base{…}`, so the unlayered theme in `css/cyber.css` always wins, whatever order the browser or host loads the stylesheets in. If a legacy rule must beat the theme (e.g. a state style), put it in `cyber.css` or leave that file unlayered. Never write `body.day .something{…}`: it has higher specificity than the night rule and makes day drift from night.
- `css/cyber.css` is loaded last by `core/main.js`, so it wins over feature styles. A simulation's own `style.css` may re-skin itself under its root class (see `.sd` in SMART).
- Motion is switched off only by the **Pause** button (`body.still`), never by the OS setting.

## Copy and casing rules
- **Write copy in sentence case**: only the first word and proper nouns/acronyms are capitalised ("Submit an idea", "Operations & supply chain", "NPV & capital budgeting"). Product names keep their form: MBA Lab, SMART Decision Studio, BUMDes Bumi Lestari.
- **UPPERCASE is a style, not a spelling.** `css/cyber.css` uppercases tags/badges, field labels, table headers, eyebrow labels (`h4`) and window titles. Never type copy in capitals for that effect. Buttons are never uppercased: they show the text exactly as written in the strings files, in night and day.
- Use `&` in names and labels (categories, simulation names, topics), `and` in running sentences.
- Category names live **only** in `data/categories.js`; the About window lists the same names automatically.
- Indonesian addresses the visitor formally (**Anda**, the assistant says **saya**), everywhere.
- Values sent to the owner by the idea form (`"value"` in `data/idea-form.js`) stay in English Title Case on purpose.
