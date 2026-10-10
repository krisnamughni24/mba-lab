/* SMART Decision Studio: page skeleton. The three parts are rendered by app.js. */
MBALAB.sims.define('smart-decision-studio', {
  template: `<div class="sd" id="sd">
  <header class="sd-top">
    <button class="sd-back" data-sim-back data-ia="title=backTitle"><span data-i18n="backT">← Home</span></button>
    <h1>SMART Decision Studio</h1>
    <div class="sd-hud"><div class="sd-lvl"><b id="sdLvl"></b><div class="sd-xpbar"><i id="sdXp"></i></div><span id="sdXpT"></span></div><div class="sd-badges" id="sdBadges"></div></div>
  </header>
  <ol class="sd-steps" id="sdSteps"></ol>
  <div class="sd-stage" id="sdStage"></div>
  <div class="sd-toasts" id="sdToasts" role="status" aria-live="polite"></div>
  <canvas class="sd-fx" id="sdFx" aria-hidden="true"></canvas>
</div>`
});
