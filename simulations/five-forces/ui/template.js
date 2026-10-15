/* Five Forces: page skeleton. game.js fills the mission menu and the level; lab.js fills the Lab tab. */
MBALAB.sims.define('five-forces', {
  template: `<div class="ff" id="ff">
  <header class="ff-top">
    <button class="ff-back" data-sim-back><span data-i18n="ffBack">← Home</span></button>
    <h1 data-i18n="ffTitle">Porter's Five Forces</h1>
    <div class="ff-tabs" role="tablist"><button type="button" role="tab" class="on" aria-selected="true" data-tab="game" data-i18n="tabGame"></button><button type="button" role="tab" aria-selected="false" data-tab="lab" data-i18n="tabLab"></button></div>
  </header>
  <div class="ff-scroll" id="ffScroll">
    <div class="fg" id="fgGame">
      <div class="fg-menu" id="fgMenu"></div>
      <div class="fg-level" id="fgLevel" hidden>
        <div class="fg-hud" id="fgHud"></div>
        <ol class="fg-steps" id="fgSteps"></ol>
        <div class="fg-cols">
          <div class="fg-left">
            <div class="fg-stage" id="fgStage"><canvas id="fgCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas><div class="fg-labels" id="fgLabels"></div><div class="fg-kept" id="fgKept"></div></div>
            <div class="fg-say" id="fgSay" aria-live="polite"></div>
          </div>
          <div class="fg-panel" id="fgPanel"></div>
        </div>
      </div>
    </div>
    <div class="fl" id="ffLab" hidden></div>
  </div>
</div>`
});
