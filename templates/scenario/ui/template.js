/* Scenario template markup. Keep these class names: they come from shared/simkit.css (sk-*) and shared/scenario.css (sc-*).
   Two sections: sc-select (title, sub, cards, how-to) and sc-play (hud chips, stage with info button + guide, controls, results). */
MBALAB.sims.define('my-simulation', {
  template: `<div class="sk-root sn" id="sn">
  <header class="sk-top">
    <button class="sk-back" data-sim-back><span data-i18n="simBack">← Home</span></button>
    <h1 data-i18n="title">Bakery Orders</h1>
  </header>
  <div class="sk-scroll" id="snScroll">
    <section class="sc-select" id="snSelect">
      <h2 data-i18n="pick"></h2>
      <p class="sc-sub" data-i18n="pickSub"></p>
      <div class="sc-cards" id="snCards"></div>
      <div class="sc-how" id="snHow"></div>
    </section>
    <section class="sc-play" id="snPlay" hidden>
      <div class="sc-hud"><span class="sc-chip" id="snDay"></span><span class="sc-chip sn-cash" id="snCash"></span></div>
      <div class="sc-stage" id="snStage">
        <canvas id="snCv" width="960" height="540" role="img" aria-label="Stock and customers"></canvas>
        <button type="button" class="sc-info" id="snInfo" data-ia="title=info,aria-label=info"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
        <div class="sc-guide" id="snGuide" hidden></div>
      </div>
      <div class="sn-ctl" id="snCtl">
        <div class="sc-row"><button type="button" id="snMinus" aria-label="-1">−</button><input type="range" id="snRange" min="0" max="40" step="1" value="20"><button type="button" id="snPlus" aria-label="+1">+</button><output id="snVal" class="sn-val"></output></div>
        <button type="button" class="sn-main" id="snGo" data-i18n="go"></button>
      </div>
      <p class="sc-note" id="snLog" aria-live="polite"></p>
      <div class="sn-res" id="snRes" hidden></div>
    </section>
  </div>
  <div class="sc-sr" id="snSr" role="status" aria-live="polite"></div>
</div>`
});
