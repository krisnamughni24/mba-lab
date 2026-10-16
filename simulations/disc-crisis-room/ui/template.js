/* DISC Crisis Room: page skeleton (template "Game"). app.js fills the level menu and each level's panel. */
MBALAB.sims.define('disc-crisis-room', {
  template: `<div class="sk-root dc" id="dc">
  <header class="sk-top dc-top">
    <button class="sk-back dc-back" data-sim-back><span data-i18n="dc_backT">← Home</span></button>
    <h1 data-i18n="dc_gTitle">DISC Crisis Room Test</h1>
  </header>
  <div class="sk-scroll dc-scroll" id="dcScroll">
    <div class="sg-root" id="dcGame">
      <div class="sg-menu" id="dcMenu"></div>
      <div class="sg-level" id="dcLevel" hidden>
        <div class="sg-hud" id="dcHud"></div>
        <ol class="sg-steps" id="dcSteps"></ol>
        <div class="sg-cols">
          <div class="sg-left">
            <div class="sg-stage" id="dcStage"><canvas id="dcCv" width="960" height="540" role="img" aria-label="DISC Crisis Room"></canvas></div>
            <div class="sg-say" id="dcSay" aria-live="polite"></div>
          </div>
          <div class="sg-panel" id="dcPanel"></div>
        </div>
      </div>
    </div>
  </div>
</div>`
});
