/* Explorer template markup. Keep these class names: they come from shared/explorer.css (ex-*). Anatomy:
   header with the mode switch > bar (progress + filter chips) > stage (canvas, info button, guide) with a detail card > box (quiz) > list. */
MBALAB.sims.define('my-simulation', {
  template: `<div class="sk-root ex" id="ep">
  <header class="sk-top ex-top">
    <button class="sk-back ex-back" data-sim-back><span data-i18n="simBack">← Home</span></button>
    <h1 data-i18n="title">Business Functions Explorer</h1>
    <div class="ex-modes" role="group"><button type="button" id="epExp" class="on"><span data-i18n="modeExp"></span></button><button type="button" id="epQz"><span data-i18n="modeQz"></span></button></div>
  </header>
  <div class="sk-scroll ex-scroll" id="epScroll">
    <div class="ex-wrap">
      <div class="ex-bar"><span class="ex-prog" id="epProg"></span><div class="ex-chips" id="epChips"></div></div>
      <div class="ex-sw"><div class="ex-stage" id="epStage">
        <canvas id="epCv" width="960" height="540" role="img" aria-label="Map of topics"></canvas>
        <div class="ex-tools"><button type="button" class="ex-info" id="epInfo" data-ia="title=info,aria-label=info"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button></div>
        <div class="ex-guide" id="epGuide" hidden></div>
      </div>
      <aside class="ex-card" id="epCard" hidden></aside></div>
      <div class="ex-box" id="epBox"></div>
      <div class="ex-list" id="epList"></div>
    </div>
  </div>
  <div class="ex-sr" id="epSr" role="status" aria-live="polite"></div>
</div>`
});
