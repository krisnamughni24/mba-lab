/* Scenario template markup (levels variant). Keep these class names: they come from shared/simkit.css (sk-* shell, sg-* game family).
   Menu (hero, rank, levels, badges) is drawn into #gmMenu; one level (hud, steps, stage, say, panel) into #gmLevel.
   Optional Lab tab: add a .sk-tabs block in the header and a <div class="sx" id="gmLab" hidden> after .sc-root (see simulations/ab-testing). */
MBALAB.sims.define('my-simulation', {
  template: `<div class="sk-root gm" id="gm">
  <header class="sk-top">
    <button class="sk-back" data-sim-back><span data-i18n="simBack">← Home</span></button>
    <h1 data-i18n="title">Lemonade Pricing</h1>
  </header>
  <div class="sk-scroll" id="gmScroll">
    <div class="sc-root" id="gmGame">
      <div class="sc-select" id="gmMenu"></div>
      <div class="sc-play" id="gmLevel" hidden>
        <div class="sc-hud" id="gmHud"></div>
        <ol class="sc-steps" id="gmSteps"></ol>
        <div class="sc-cols">
          <div class="sc-left">
            <div class="sc-stage" id="gmStage"><canvas id="gmCv" width="960" height="540" role="img" aria-label="Demand curve"></canvas></div>
            <div class="sc-say" id="gmSay" aria-live="polite"></div>
          </div>
          <div class="sc-panel" id="gmPanel"></div>
        </div>
      </div>
    </div>
  </div>
</div>`
});
