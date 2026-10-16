/* A/B Testing: page skeleton. game.js fills the case menu and the experiment; lab.js fills the Lab tab. */
MBALAB.sims.define('ab-testing', {
  template: `<div class="ab" id="ab">
  <header class="ab-top">
    <button class="ab-back" data-sim-back><span data-i18n="abBack">← Home</span></button>
    <h1 data-i18n="abTitle">A/B Testing Lab</h1>
    <div class="ab-tabs" role="tablist"><button type="button" role="tab" class="on" aria-selected="true" data-tab="game" data-i18n="tabGame"></button><button type="button" role="tab" aria-selected="false" data-tab="lab" data-i18n="tabLab"></button></div>
  </header>
  <div class="ab-scroll" id="abScroll">
    <div class="ag" id="agGame">
      <div class="ag-menu" id="agMenu"></div>
      <div class="ag-level" id="agLevel" hidden>
        <div class="ag-hud" id="agHud"></div>
        <ol class="ag-steps" id="agSteps"></ol>
        <div class="ag-cols">
          <div class="ag-left">
            <div class="ag-stage" id="agStage"><canvas id="agCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas></div>
            <div class="ag-say" id="agSay" aria-live="polite"></div>
          </div>
          <div class="ag-panel" id="agPanel"></div>
        </div>
      </div>
    </div>
    <div class="al" id="abLab" hidden></div>
  </div>
</div>`
});
