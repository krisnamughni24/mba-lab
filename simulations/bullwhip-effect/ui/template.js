/* Bullwhip effect: page skeleton. app.js fills the chain cards, the dashboard and the results. */
MBALAB.sims.define('bullwhip-effect', {
  template: `<div class="bw" id="bw">
  <header class="bw-top">
    <button class="bw-back" data-sim-back><span data-i18n="bwBack">← Home</span></button>
    <h1 data-i18n="bwTitle">Bullwhip Effect</h1>
  </header>
  <div class="bw-scroll" id="bwScroll">
    <section class="bw-select" id="bwSelect">
      <h2 data-i18n="bwPick"></h2>
      <p class="bw-sub" data-i18n="bwPickSub"></p>
      <div class="bw-cards" id="bwCards"></div>
      <div class="bw-how" id="bwHow"></div>
      <p class="bw-note" data-i18n="bwNote"></p>
    </section>
    <section class="bw-play" id="bwPlay" hidden>
      <div class="bw-hud" id="bwHud"></div>
      <div class="bw-chain" id="bwChain"></div>
      <div class="bw-stage" id="bwStage" hidden>
        <canvas id="bwCv" width="960" height="540" role="img" data-ia="aria-label=sceneAria"></canvas>
        <p class="bw-tip" id="bwTip" hidden></p>
      </div>
      <div id="bwBody"></div>
    </section>
  </div>
  <div class="bw-sr" id="bwSr" role="status" aria-live="polite"></div>
</div>`
});
