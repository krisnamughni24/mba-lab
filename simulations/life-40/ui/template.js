/* Life 40: page skeleton. app.js draws the lives, the year board and the results. */
MBALAB.sims.define('life-40', {
  template: `<div class="sk-root lf" id="lf">
  <header class="sk-top lf-top">
    <button class="sk-back lf-back" data-sim-back><span data-i18n="lfBack">← Home</span></button>
    <h1 data-i18n="lfTitle">Life 40</h1>
  </header>
  <div class="sk-scroll lf-scroll" id="lfScroll">
    <section class="sc-select lf-select" id="lfSelect">
      <h2 data-i18n="lfPick"></h2>
      <p class="sc-sub lf-sub" data-i18n="lfPickSub"></p>
      <div class="lf-lives" id="lfLives"></div>
      <div class="sc-how lf-how" id="lfHow"></div>
      <p class="sc-note lf-note" data-i18n="lfNote"></p>
    </section>
    <section class="sc-play lf-play" id="lfPlay" hidden>
      <div class="sc-hud lf-hud" id="lfHud"></div>
      <div class="lf-scene" id="lfScene"></div>
      <div class="lf-grid">
        <div class="sc-stage lf-stage" id="lfStage"></div>
        <aside class="lf-side" id="lfSide"></aside>
      </div>
      <div class="lf-chart" id="lfChart"></div>
    </section>
  </div>
  <div class="sc-sr lf-sr" id="lfSr" role="status" aria-live="polite"></div>
</div>`
});
