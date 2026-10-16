/* Try Out MBA: page skeleton. app.js draws the setup, the exam and the result. */
MBALAB.sims.define('tryout-mba', {
  template: `<div class="sk-root to" id="to">
  <header class="sk-top to-top">
    <button class="sk-back to-back" data-sim-back><span data-i18n="toBack">← Home</span></button>
    <h1 data-i18n="toTitle">Try Out MBA</h1>
  </header>
  <div class="sk-scroll to-scroll" id="toScroll">
    <section class="to-setup" id="toSetup"></section>
    <section class="to-exam" id="toExam" hidden></section>
    <section class="to-result" id="toResult" hidden></section>
  </div>
  <div class="to-modal" id="toModal" hidden></div>
  <div class="to-sr" id="toSr" role="status" aria-live="polite"></div>
</div>`
});
