/* Life 40: page skeleton. app.js draws the lives, the year board and the results. */
MBALAB.sims.define('life-40', {
  template: `<div class="lf" id="lf">
  <header class="lf-top">
    <button class="lf-back" data-sim-back><span data-i18n="lfBack">← Home</span></button>
    <h1 data-i18n="lfTitle">Life 40</h1>
  </header>
  <div class="lf-scroll" id="lfScroll">
    <section class="lf-select" id="lfSelect">
      <h2 data-i18n="lfPick"></h2>
      <p class="lf-sub" data-i18n="lfPickSub"></p>
      <div class="lf-lives" id="lfLives"></div>
      <div class="lf-how" id="lfHow"></div>
      <p class="lf-note" data-i18n="lfNote"></p>
    </section>
    <section class="lf-play" id="lfPlay" hidden>
      <div class="lf-hud" id="lfHud"></div>
      <div class="lf-scene" id="lfScene"></div>
      <div class="lf-grid">
        <div class="lf-stage" id="lfStage"></div>
        <aside class="lf-side" id="lfSide"></aside>
      </div>
      <div class="lf-chart" id="lfChart"></div>
    </section>
  </div>
  <div class="lf-sr" id="lfSr" role="status" aria-live="polite"></div>
</div>`
});
