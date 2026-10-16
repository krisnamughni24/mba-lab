/* Van Westendorp Calculator: page skeleton. The frame (stepper, stage, guide, toasts, checklist, download block) comes from shared/studio.css (sd-*). Root class: sd. */
MBALAB.sims.define('van-westendorp', {
  template: `<div class="sd vw" id="sd">
  <header class="sd-top">
    <button class="sd-back" data-sim-back data-ia="title=back"><span data-i18n="vwBack">← Home</span></button>
    <h1 data-i18n="vwTitle">Van Westendorp Calculator</h1>
  </header>
  <ol class="sd-steps" id="sdSteps"></ol>
  <div class="sd-stage" id="sdStage"></div>
  <div class="sd-toasts" id="sdToasts" role="status" aria-live="polite"></div>
</div>`
});
