/* Decision Tree Calculator: page skeleton. same frame as the SMART Calculator (shared/studio.css). app.js draws the four parts. */
MBALAB.sims.define('decision-tree-ev', {
  template: `<div class="sd dt" id="sd">
  <header class="sd-top">
    <button class="sd-back" data-sim-back data-ia="title=dtBack"><span data-i18n="dtBack">← Home</span></button>
    <h1 data-i18n="dtTitle">Decision Tree Calculator</h1>
  </header>
  <ol class="sd-steps" id="sdSteps"></ol>
  <div class="sd-stage" id="sdStage"></div>
  <div class="sd-toasts" id="sdToasts" role="status" aria-live="polite"></div>
</div>`
});
