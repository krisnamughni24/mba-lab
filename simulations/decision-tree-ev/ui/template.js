/* Decision Tree Studio: page skeleton. app.js draws the case chips, the tree, the editor, the results and the sensitivity chart. */
MBALAB.sims.define('decision-tree-ev', {
  template: `<div class="sk-root dt" id="dt">
  <header class="sk-top">
    <button class="sk-back" data-sim-back><span data-i18n="dtBack">← Home</span></button>
    <h1 data-i18n="dtTitle">Decision Tree Studio</h1>
  </header>
  <div class="sk-scroll" id="dtScroll">
    <div class="sk-wrap">
      <p class="sk-sub" data-i18n="dtSub"></p>
      <div class="dt-cases" id="dtCases" role="radiogroup" data-ia="aria-label=dtPick"></div>
      <section class="sx-card dt-story" id="dtStory"></section>
      <div class="dt-grid">
        <section class="sx-card dt-treebox">
          <div class="dt-legend" id="dtLegend"></div>
          <div class="dt-tree" id="dtTree"></div>
        </section>
        <aside class="sx-card dt-insp" id="dtInsp" aria-live="polite"></aside>
      </div>
      <section class="sx-card" id="dtRes"></section>
      <section class="sx-card" id="dtSens"></section>
      <section class="sx-card" id="dtConc"></section>
    </div>
  </div>
</div>`
});
