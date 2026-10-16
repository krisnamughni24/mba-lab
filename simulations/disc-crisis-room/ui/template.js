/* DISC Crisis Room: page skeleton. app.js renders the crises, meters and result. */
MBALAB.sims.define('disc-crisis-room', {
  template: `<div class="sk-root dc" id="dc">
  <header class="sk-top dc-top">
    <button class="sk-back dc-back" data-sim-back><span data-i18n="dc_backT">← Home</span></button>
    <h1 data-i18n="dc_gTitle">DISC Crisis Room Test</h1>
  </header>
  <div class="sk-scroll dc-scroll" id="dcScroll">
  <section class="dc-start" id="dcStart">
    <div class="dc-hero"><h2 data-i18n="dc_startT"></h2><p data-i18n="dc_startSub"></p>
      <div class="dc-exp" id="dcExp"></div><div class="dc-styles" id="dcStyles" role="list"></div>
      <button type="button" class="dc-main" id="dcGo"><span data-i18n="dc_startBtn"></span></button><span class="dc-last" id="dcLast"></span></div>
    <div class="sc-how dc-how" id="dcHow"></div>
  </section>
  <section class="sc-play dc-play" id="dcPlay" hidden>
    <div class="sc-hud dc-hud"><span class="sc-chip dc-chip" id="dcCrisis"></span><span class="sc-chip dc-chip dc-chip-b" id="dcMove"></span></div>
    <div class="dc-meters" id="dcMeters"></div>
    <div class="sc-stage dc-stage" id="dcStage">
      <canvas id="dcCv" width="960" height="540" role="img" aria-label="DISC Crisis Room"></canvas>
      <div class="sc-tools dc-tools">
        <button type="button" class="dc-missions" id="dcRestart"><span data-i18n="dc_restart"></span></button>
        <button type="button" class="sc-info dc-info" id="dcInfo" data-ia="title=dc_infoTip,aria-label=dc_infoTip"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
      </div>
      <div class="sc-guide dc-guide" id="dcGuide" hidden></div>
    </div>
    <div class="dc-box" id="dcCard"></div>
  </section>
  <section class="dc-res" id="dcRes" hidden></section>
  </div>
  <div class="sc-sr dc-sr" id="dcSr" role="status" aria-live="polite"></div>
</div>`
});
