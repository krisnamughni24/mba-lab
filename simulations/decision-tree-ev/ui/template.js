/* Decision Tree Calculator: page skeleton. app.js draws the four guided steps (frame, build, roll back, stress-test). */
MBALAB.sims.define('decision-tree-ev', {
  template: `<div class="sk-root dt" id="dt">
  <header class="sk-top">
    <button class="sk-back" data-sim-back><span data-i18n="dtBack">← Home</span></button>
    <h1 data-i18n="dtTitle">Decision Tree Calculator</h1>
  </header>
  <ol class="sg-steps dt-steps" id="dtSteps"></ol>
  <div class="sk-scroll" id="dtScroll"><div class="sk-wrap" id="dtStage"></div></div>
</div>`
});
