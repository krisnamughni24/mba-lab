/* Koperasi: page skeleton. app.js fills the panel for each phase (story, plan, report, annual meeting, ending). */
MBALAB.sims.define('koperasi-tycoon', {
  template: `<div class="sk-root kp" id="kp">
  <header class="sk-top kp-top">
    <button class="sk-back kp-back" data-sim-back><span data-i18n="kpBack">← Home</span></button>
    <h1 data-i18n="kpTitle">Koperasi: Season by Season</h1>
  </header>
  <div class="sk-scroll kp-scroll" id="kpScroll">
    <section class="kp-start" id="kpStart">
      <div class="kp-card">
        <div class="kp-pick" id="kpPick"></div>
        <h2 id="kpIntroT"></h2>
        <p id="kpIntro"></p>
        <div class="kp-how" id="kpHow"></div>
        <button type="button" class="kp-main" id="kpGo"></button>
        <p class="kp-best" id="kpBest"></p>
      </div>
    </section>
    <section class="kp-play" id="kpPlay" hidden>
      <div class="kp-hud">
        <span class="kp-chip" id="kpWhen"></span>
        <span class="kp-chip kp-c-cash" id="kpCash"></span>
        <span class="kp-chip kp-c-trust" id="kpTrust"></span>
        <span class="kp-chip kp-c-debt" id="kpDebt" hidden></span>
      </div>
      <div class="kp-stage" id="kpStage">
        <canvas id="kpCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas>
        <button type="button" class="kp-info" id="kpInfo" data-ia="title=infoTip,aria-label=infoTip"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
        <div class="kp-guide" id="kpGuide" hidden></div>
      </div>
      <div class="kp-sat" id="kpSat" aria-hidden="false"></div>
      <div class="kp-panel" id="kpPanel" aria-live="polite"></div>
    </section>
  </div>
</div>`
});
