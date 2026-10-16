/* SMART Calculator: page skeleton. The four parts are rendered by app.js. */
MBALAB.sims.define('smart-decision-studio', {
  template: `<div class="sd" id="sd">
  <header class="sd-top">
    <button class="sd-back" data-sim-back data-ia="title=backTitle"><span data-i18n="backT">← Home</span></button>
    <h1>SMART Calculator</h1>
  </header>
  <ol class="sd-steps" id="sdSteps"></ol>
  <div class="sd-stage" id="sdStage"></div>
  <div class="sd-toasts" id="sdToasts" role="status" aria-live="polite"></div>
</div>`
});
