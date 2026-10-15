/* Van Westendorp PSM: page skeleton. app.js fills the product cards, the chart, the four points and the pricing mission. */
MBALAB.sims.define('van-westendorp', {
  template: `<div class="vw" id="vw">
  <header class="vw-top">
    <button class="vw-back" data-sim-back><span data-i18n="vwBack">← Home</span></button>
    <h1 data-i18n="vwTitle">Price Sensitivity Meter</h1>
    <div class="vw-tabs" role="tablist"><button type="button" role="tab" class="on" aria-selected="true" data-tab="game" data-i18n="tabGame"></button><button type="button" role="tab" aria-selected="false" data-tab="lab" data-i18n="tabLab"></button></div>
  </header>
  <div class="vw-scroll" id="vwScroll">
    <div class="vg" id="vgGame">
      <div class="vg-menu" id="vgMenu"></div>
      <div class="vg-level" id="vgLevel" hidden>
        <div class="vg-top" id="vgTop"></div>
        <ol class="vg-steps" id="vgSteps"></ol>
        <div class="vg-row2">
          <div class="vg-stage"><canvas id="vgCv" width="960" height="540" role="img" data-ia="aria-label=vgStageAria"></canvas><div class="vg-say" id="vgSay" aria-live="polite"></div></div>
          <div class="vg-chartcard"><div id="vgChart"></div><div class="vw-legend" id="vgLegend"></div></div>
        </div>
        <div class="vg-panel" id="vgPanel"></div>
      </div>
    </div>
    <div class="vw-wrap" id="vwLab" hidden>
      <p class="vw-sub" data-i18n="vwSub"></p>
      <h2 class="vw-h" data-i18n="vwScen"></h2>
      <div class="vw-scen" id="vwScen" role="radiogroup"></div>
      <div class="vw-main">
        <section class="vw-card vw-chartcard">
          <div class="vw-legend" id="vwLegend"></div>
          <div class="vw-chart" id="vwChart"></div>
          <div class="vw-read" id="vwRead" aria-live="polite"></div>
        </section>
        <aside class="vw-card vw-side">
          <div id="vwCtl"></div>
          <p class="vw-dq" id="vwDq"></p>
        </aside>
      </div>
      <section class="vw-range" id="vwRange"></section>
      <div class="vw-pts" id="vwPts"></div>
      <section class="vw-card vw-price" id="vwPrice"></section>
      <details class="vw-card vw-more" id="vwSurvey"><summary data-i18n="svT"></summary><div id="vwSvBody"></div></details>
      <details class="vw-card vw-more" id="vwOwn"><summary data-i18n="odT"></summary><div id="vwOwnBody"></div></details>
      <details class="vw-card vw-more" id="vwLearn"><summary data-i18n="learnT"></summary><div id="vwLearnBody"></div></details>
    </div>
  </div>
</div>`
});
