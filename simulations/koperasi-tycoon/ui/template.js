/* Koperasi: page skeleton. app.js fills the panel for each phase (story, plan, report, annual meeting, ending). */
MBALAB.sims.define('koperasi-tycoon', {
  template: `<div class="sk-root kp" id="kp">
  <header class="sk-top kp-top">
    <button class="sk-back kp-back" data-sim-back><span data-i18n="kpBack">← Home</span></button>
    <h1 data-i18n="kpTitle">Koperasi: Season by Season</h1>
  </header>
  <div class="sk-scroll kp-scroll" id="kpScroll">
    <section class="sc-select kp-start" id="kpStart">
      <h2 id="kpIntroT"></h2>
      <p class="sc-sub" id="kpIntro"></p>
      <div class="kp-pick" id="kpPick"></div>
      <div class="sc-how kp-how" id="kpHow"></div>
      <button type="button" class="kp-main" id="kpGo"></button>
      <p class="sc-note kp-best" id="kpBest"></p>
    </section>
    <section class="sc-play kp-play" id="kpPlay" hidden>
      <div class="sc-hud kp-hud">
        <span class="sc-chip kp-chip" id="kpWhen"></span>
        <span class="sc-chip kp-chip kp-c-cash" id="kpCash"></span>
        <span class="sc-chip kp-chip kp-c-trust" id="kpTrust"></span>
        <span class="sc-chip kp-chip kp-c-debt" id="kpDebt" hidden></span>
      </div>
      <div class="sc-stage kp-stage" id="kpStage">
        <canvas id="kpCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas>
        <button type="button" class="sc-info kp-info" id="kpInfo" data-ia="title=infoTip,aria-label=infoTip"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
        <div class="sc-guide kp-guide" id="kpGuide" hidden></div>
      </div>
      <div class="kp-sat" id="kpSat" aria-hidden="false"></div>
      <div class="kp-panel" id="kpPanel" aria-live="polite"></div>
    </section>
  </div>
</div>`
});
