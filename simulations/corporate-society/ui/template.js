/* Corporate Society: page skeleton (Scenario template). app.js draws the menu, the office scene, the choices and the ending. */
MBALAB.sims.define('corporate-society', {
  template: `<div class="sk-root cs" id="cs">
  <header class="sk-top cs-top">
    <button class="sk-back cs-back" data-sim-back><span data-i18n="csBack">← Home</span></button>
    <h1 data-i18n="csTitle">Corporate Society</h1>
  </header>
  <div class="sk-scroll cs-scroll" id="csScroll">
    <section class="sc-select cs-select" id="csSelect"></section>
    <section class="sc-play cs-play" id="csPlay" hidden>
      <div class="sc-hud cs-hud" id="csHud"></div>
      <div class="cs-stats" id="csStats"></div>
      <div class="cs-grid">
        <div class="sc-stage cs-stage" id="csStage"></div>
        <aside class="cs-side" id="csSide"></aside>
      </div>
      <div class="cs-box" id="csBox"></div>
    </section>
  </div>
  <div class="sc-sr cs-sr" id="csSr" role="status" aria-live="polite"></div>
</div>`
});
