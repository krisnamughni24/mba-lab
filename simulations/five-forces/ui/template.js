/* Five Forces: page skeleton. game.js fills the mission menu and the level; lab.js fills the Lab tab. */
MBALAB.sims.define('five-forces', {
  template: `<div class="sk-root ff" id="ff">
  <header class="sk-top">
    <button class="sk-back" data-sim-back><span data-i18n="ffBack">← Home</span></button>
    <h1 data-i18n="ffTitle">Porter's Five Forces</h1>
    <div class="sk-tabs" role="tablist"><button type="button" role="tab" class="on" aria-selected="true" data-tab="game" data-i18n="tabGame"></button><button type="button" role="tab" aria-selected="false" data-tab="lab" data-i18n="tabLab"></button></div>
  </header>
  <div class="sk-scroll" id="ffScroll">
    <div class="sc-root" id="fgGame">
      <div class="sc-select" id="fgMenu"></div>
      <div class="sc-play" id="fgLevel" hidden>
        <div class="sc-hud" id="fgHud"></div>
        <ol class="sc-steps" id="fgSteps"></ol>
        <div class="sc-cols">
          <div class="sc-left">
            <div class="sc-stage" id="fgStage"><canvas id="fgCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas><div class="sc-labels" id="fgLabels"></div><div class="sc-kept" id="fgKept"></div></div>
            <div class="sc-say" id="fgSay" aria-live="polite"></div>
          </div>
          <div class="sc-panel" id="fgPanel"></div>
        </div>
      </div>
    </div>
    <div class="sx" id="ffLab" hidden></div>
  </div>
</div>`
});
