/* Try Out MBA: page skeleton. app.js draws the setup, the exam and the result. */
MBALAB.sims.define('tryout-mba', {
  template: `<div class="sk-root xm" id="to">
  <header class="sk-top xm-top">
    <button class="sk-back xm-back" data-sim-back><span data-i18n="toBack">← Home</span></button>
    <h1 data-i18n="toTitle">Try Out MBA</h1>
  </header>
  <div class="sk-scroll xm-scroll" id="toScroll">
    <section class="xm-setup" id="toSetup"></section>
    <section class="xm-exam" id="toExam" hidden></section>
    <section class="xm-result" id="toResult" hidden></section>
  </div>
  <div class="xm-modal" id="toModal" hidden></div>
  <div class="xm-sr" id="toSr" role="status" aria-live="polite"></div>
</div>`
});
