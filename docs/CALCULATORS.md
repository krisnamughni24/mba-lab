# Building a calculator

A **calculator** helps a user compute something for their own case (a decision, a price, a tree) rather than score points in a game. Calculators share one guided frame so they feel identical: the **SMART Calculator** and the **Decision Tree Calculator** are the reference implementations. Read `simulations/decision-tree-ev` (smaller, newer) next to this page.

Name every calculation-type simulation "**… Calculator**" in all four languages.

## The frame

Four guided parts, a connected stepper on top, and a card per part:

| Part | Purpose |
|---|---|
| 1 Frame | Choose a ready case or start blank, state the question |
| 2 Build | Enter or edit the model (a **"Required to continue"** checklist gates the next part) |
| 3 Result | The computed answer and what drives it |
| 4 Stress-test | Sensitivity, conclusion text, **download the report** (PDF, HTML, Markdown) |

The same frame gives you: a guide pop-up per part (opens on first visit, "i" button reopens it), toasts, a validation gate, the Bit assistant, and the night/day theme.

## Files

```
simulations/<id>/
  sim.js            scripts: i18n/strings.js, ui/template.js, engine/engine.js,
                             ../../shared/assistant.js, ../../shared/report.js, ui/app.js
                    styles:  ../../shared/studio.css, ui/style.css
  engine/engine.js  pure maths, exposed as MBALAB.<ns> (no DOM). Tested by tests/engine.js
  i18n/strings.js   every text as [en, id, ja, zh]
  ui/template.js    root: <div class="sd <prefix>"> + sd-top, ol.sd-steps, div.sd-stage, div.sd-toasts
  ui/app.js         MBALAB.sims.define(id, { mount(host) {…}, onLang() {…} })
  ui/style.css      only your own widgets, prefixed (dt-… in the Decision Tree Calculator)
```

## Shared classes (`shared/studio.css`, all under the `.sd` root)

`sd-top` (header) · `sd-steps` (stepper: `li.st > button` with `.n .l small`) · `sd-stage` · `sd-card` · `sd-h` + `sd-info` (title row and guide button) · `sd-p1` (main card + side column) · `sd-quest` (checklist `ul li[data-c] .bx`, progress bar, `button.sd-cta`, lock hint) · `sd-foot` (Back / Next) · `sd-guide` (pop-up) · `sd-toasts` · `sd-dl` (download block) · `sd-tools`.
Colours come from tokens (`--g1 --g2 --panel --panel-b --fg --fg2 --field`), so night/day works for free.

## Download block

```html
<div class="sd-dl"><h4>⬇ Download your report</h4>
  <div class="row"><button data-dl="pdf">PDF</button><button data-dl="html">HTML</button><button data-dl="md">Markdown</button></div>
</div>
```
`shared/report.js` provides:

| Function | Result |
|---|---|
| `MBALAB.report.html(title, bodyHtml)` | a standalone HTML file (string) |
| `MBALAB.report.pdf(bodyHtml)` | `Uint8Array` of a PDF, built in the browser with no library |
| `MBALAB.report.save(name, data, mime)` | triggers the download, returns `true`/`false` |
| `MBALAB.report.css` | the A4 report stylesheet, class `.rp` |

Write `reportBody()` once as HTML using the report classes (`.blk` sections, `h1`, `h2`, `table`, `.note`, inline SVG with **explicit light colours**, because the report is white paper) and a separate `reportMD()` for Markdown. Show a "Preparing…" state on the button while the PDF renders, then a toast. Example: `download()` in `decision-tree-ev/ui/app.js`.

## Bit assistant

`SmartAssistant.create(host, { hints })` where `hints()` returns `{ state: [keys], generic: [keys] }`; keys resolve with `t()`. Put the tips in your strings (`<id>as_*`). `shared/assistant.js` supplies its own name and close/show strings.

## Validation gate (Part 2 → 3)

Compute a list of checks (`checks()`), render them in `sd-quest`, and enable the `sd-cta` button only when all pass. Show the specific problems (what to fix and where) next to the model, not only a disabled button. If the model is invalid, never show results.

## Checklist

1. Engine in `engine/`, with `tests/engine.js` covering a hand-computed example, edge cases and invalid input.
2. Strings in four languages, including the four guide texts per part and the report headings.
3. 4 parts, validation gate, copyable conclusion, report download.
4. Works at 390 px and desktop, night and day; no page errors in `node tests/smoke.js`.
5. Register the catalog entry ("… Calculator", `status: 'live'`) and a thumbnail.
