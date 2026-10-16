/* Exam template markup. Keep these class names: they come from shared/exam.css (xm-*). Three sections (setup, exam, result) and a confirm modal. */
MBALAB.sims.define('my-simulation', {
  template: `<div class="sk-root xm" id="xq">
  <header class="sk-top xm-top">
    <button class="sk-back xm-back" data-sim-back><span data-i18n="simBack">← Home</span></button>
    <h1 data-i18n="title">Quick Quiz</h1>
  </header>
  <div class="sk-scroll xm-scroll" id="xqScroll">
    <section class="xm-setup" id="xqSetup"></section>
    <section class="xm-exam" id="xqExam" hidden></section>
    <section class="xm-result" id="xqResult" hidden></section>
  </div>
  <div class="xm-modal" id="xqModal" hidden></div>
  <div class="xm-sr" id="xqSr" role="status" aria-live="polite"></div>
</div>`
});
