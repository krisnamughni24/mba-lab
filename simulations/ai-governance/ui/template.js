/* AI Governance: page skeleton. game.js fills the case menu and the four steps; lab.js fills the Lab tab. */
MBALAB.sims.define('ai-governance', {
  template: `<div class="gv" id="gv">
  <header class="gv-top">
    <button class="gv-back" data-sim-back><span data-i18n="gvBack">← Home</span></button>
    <h1 data-i18n="gvTitle">AI Governance Lab</h1>
    <div class="gv-tabs" role="tablist"><button type="button" role="tab" class="on" aria-selected="true" data-tab="game" data-i18n="tabGame"></button><button type="button" role="tab" aria-selected="false" data-tab="lab" data-i18n="tabLab"></button></div>
  </header>
  <div class="gv-scroll" id="gvScroll">
    <div class="gx" id="gxGame">
      <div class="gx-menu" id="gxMenu"></div>
      <div class="gx-level" id="gxLevel" hidden>
        <div class="gx-hud" id="gxHud"></div>
        <ol class="gx-steps" id="gxSteps"></ol>
        <div class="gx-cols">
          <div class="gx-left">
            <div class="gx-stage" id="gxStage"><canvas id="gxCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas></div>
            <div class="gx-say" id="gxSay" aria-live="polite"></div>
          </div>
          <div class="gx-panel" id="gxPanel"></div>
        </div>
      </div>
    </div>
    <div class="gl" id="gvLab" hidden></div>
  </div>
</div>`
});
