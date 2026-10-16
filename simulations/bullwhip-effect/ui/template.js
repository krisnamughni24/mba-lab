/* Bullwhip effect: page skeleton. app.js fills the chain cards, the dashboard and the results. */
MBALAB.sims.define('bullwhip-effect', {
  template: `<div class="sk-root bw" id="bw">
  <header class="sk-top bw-top">
    <button class="sk-back bw-back" data-sim-back><span data-i18n="bwBack">← Home</span></button>
    <h1 data-i18n="bwTitle">Bullwhip Effect</h1>
  </header>
  <div class="sk-scroll bw-scroll" id="bwScroll">
    <section class="sc-select bw-select" id="bwSelect">
      <h2 data-i18n="bwPick"></h2>
      <p class="sc-sub bw-sub" data-i18n="bwPickSub"></p>
      <div class="sc-cards bw-cards" id="bwCards"></div>
      <div class="sc-how bw-how" id="bwHow"></div>
      <p class="sc-note bw-note" data-i18n="bwNote"></p>
    </section>
    <section class="sc-play bw-play" id="bwPlay" hidden>
      <div class="sc-hud bw-hud" id="bwHud"></div>
      <div class="bw-chain" id="bwChain"></div>
      <div class="sc-stage bw-stage" id="bwStage" hidden>
        <canvas id="bwCv" width="960" height="540" role="img" data-ia="aria-label=sceneAria"></canvas>
        <p class="bw-tip" id="bwTip" hidden></p>
      </div>
      <div id="bwBody"></div>
    </section>
  </div>
  <div class="sc-sr bw-sr" id="bwSr" role="status" aria-live="polite"></div>
</div>`
});
