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
core/                 small engine: namespace/event bus, i18n, overlays, loader, simulation host, boot
features/<name>/      one folder per site feature (scripts, styles, strings)
  landing scene theme camera language audio catalog about idea-form
simulations/<id>/     one microsite per simulation, lazy-loaded (see ADDING-A-SIMULATION.md)
css/                  core.css + nav.css (base layers)
apps-script/Code.gs   Google Apps Script that saves ideas to Drive
```

## Where do I edit…?
| I want to change | File |
|---|---|
| About text, developer name | `data/about.js` |
| Share-an-Idea form wording / types | `data/idea-form.js` |
| Where ideas go | `data/config.js`, `apps-script/Code.gs` |
| Landing headline | `data/landing.js` |
| Add / rename a simulation | `data/simulations.js` |
| Music or sounds | `features/audio/audio.js` |
| 3D city | `features/scene/scene.js` |
| Remove a feature | delete its line in `data/features.js` |

## Extension points
- `MBALAB.feature(id, init)` registers a feature; `core/main.js` runs it after its files load.
- `MBALAB.ui.nav/fab/floating/dialog(el, order)` place UI in shared slots.
- `data-action="name"` on a button runs `MBALAB.actions[name]`.
- `MBALAB.on('lang' | 'theme' | 'ready', fn)` events.
- `MBALAB.sims.define(id, parts)` builds a simulation microsite.
- Texts: `t('key')` / `data-i18n` for interface strings, `tr({en,id,ja,zh})` for content.
