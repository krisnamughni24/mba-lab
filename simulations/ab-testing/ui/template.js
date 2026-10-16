/* A/B Testing: page skeleton. game.js fills the case menu and the experiment; lab.js fills the Lab tab. */
MBALAB.sims.define('ab-testing', {
  template: `<div class="sk-root ab" id="ab">
  <header class="sk-top">
    <button class="sk-back" data-sim-back><span data-i18n="abBack">← Home</span></button>
    <h1 data-i18n="abTitle">A/B Testing Lab</h1>
    <div class="sk-tabs" role="tablist"><button type="button" role="tab" class="on" aria-selected="true" data-tab="game" data-i18n="tabGame"></button><button type="button" role="tab" aria-selected="false" data-tab="lab" data-i18n="tabLab"></button></div>
  </header>
  <div class="sk-scroll" id="abScroll">
    <div class="sg-root" id="agGame">
      <div class="sg-menu" id="agMenu"></div>
      <div class="sg-level" id="agLevel" hidden>
        <div class="sg-hud" id="agHud"></div>
        <ol class="sg-steps" id="agSteps"></ol>
        <div class="sg-cols">
          <div class="sg-left">
            <div class="sg-stage" id="agStage"><canvas id="agCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas></div>
            <div class="sg-say" id="agSay" aria-live="polite"></div>
          </div>
          <div class="sg-panel" id="agPanel"></div>
        </div>
      </div>
    </div>
    <div class="sx" id="abLab" hidden></div>
  </div>
</div>`
});
