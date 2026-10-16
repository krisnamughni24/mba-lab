/* AI Governance: page skeleton. game.js fills the case menu and the four steps; lab.js fills the Lab tab. */
MBALAB.sims.define('ai-governance', {
  template: `<div class="sk-root gv" id="gv">
  <header class="sk-top">
    <button class="sk-back" data-sim-back><span data-i18n="gvBack">← Home</span></button>
    <h1 data-i18n="gvTitle">AI Governance Lab</h1>
    <div class="sk-tabs" role="tablist"><button type="button" role="tab" class="on" aria-selected="true" data-tab="game" data-i18n="tabGame"></button><button type="button" role="tab" aria-selected="false" data-tab="lab" data-i18n="tabLab"></button></div>
  </header>
  <div class="sk-scroll" id="gvScroll">
    <div class="sg-root" id="gxGame">
      <div class="sg-menu" id="gxMenu"></div>
      <div class="sg-level" id="gxLevel" hidden>
        <div class="sg-hud" id="gxHud"></div>
        <ol class="sg-steps" id="gxSteps"></ol>
        <div class="sg-cols">
          <div class="sg-left">
            <div class="sg-stage" id="gxStage"><canvas id="gxCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas></div>
            <div class="sg-say" id="gxSay" aria-live="polite"></div>
          </div>
          <div class="sg-panel" id="gxPanel"></div>
        </div>
      </div>
    </div>
    <div class="sx" id="gvLab" hidden></div>
  </div>
</div>`
});
