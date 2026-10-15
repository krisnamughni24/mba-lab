/* Van Westendorp PSM: page skeleton. app.js fills the product cards, the chart, the four points and the pricing mission. */
MBALAB.sims.define('van-westendorp', {
  template: `<div class="vw" id="vw">
  <header class="vw-top">
    <button class="vw-back" data-sim-back><span data-i18n="vwBack">← Home</span></button>
    <h1 data-i18n="vwTitle">Price Sensitivity Meter</h1>
  </header>
  <div class="vw-scroll" id="vwScroll">
    <div class="vw-wrap">
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
