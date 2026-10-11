/* BUMN Explorer: page skeleton. app.js fills the chips, info card, quiz box and company list. */
MBALAB.sims.define('bumn-explorer', {
  template: `<div class="bm" id="bm">
  <header class="bm-top">
    <button class="bm-back" data-sim-back><span data-i18n="bm_backT">← Home</span></button>
    <h1 data-i18n="bm_gTitle">BUMN Explorer</h1>
    <div class="bm-modes" role="group"><button type="button" id="bmExp" class="on"><span data-i18n="bm_modeExp"></span></button><button type="button" id="bmQz"><span data-i18n="bm_modeQz"></span></button></div>
  </header>
  <div class="bm-scroll" id="bmScroll">
    <div class="bm-wrap">
      <div class="bm-bar"><span class="bm-prog" id="bmProg"></span><div class="bm-chips" id="bmChips"></div></div>
      <div class="bm-sw"><div class="bm-stage" id="bmStage">
        <div class="bm-nogl" id="bmNoGl" hidden data-i18n="bm_noGl"></div>
        <div class="bm-tools"><button type="button" class="bm-info" id="bmInfo" data-ia="title=bm_infoTip,aria-label=bm_infoTip"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button></div>
        <div class="bm-pad" id="bmPad" role="group" data-ia="aria-label=camGroup">
          <button id="bmIn" type="button" data-ia="aria-label=zoomIn,title=zoomIn">+</button>
          <button id="bmUp" type="button" data-ia="aria-label=rotUp,title=rotUp">↑</button>
          <button id="bmOut" type="button" data-ia="aria-label=zoomOut,title=zoomOut">−</button>
          <button id="bmLeft" type="button" data-ia="aria-label=rotLeft,title=rotLeft">←</button>
          <button id="bmDown" type="button" data-ia="aria-label=rotDown,title=rotDown">↓</button>
          <button id="bmRight" type="button" data-ia="aria-label=rotRight,title=rotRight">→</button>
          <button id="bmReset" class="wide" type="button" data-ia="aria-label=resetCamA,title=resetCamA"><span data-i18n="resetCamT">⟲ Reset</span></button>
        </div>
        <div class="bm-guide" id="bmGuide" hidden></div>
      </div>
      <aside class="bm-card" id="bmCard" hidden></aside></div>
      <div class="bm-box" id="bmBox"></div>
      <div class="bm-list" id="bmList"></div>
    </div>
  </div>
  <div class="bm-sr" id="bmSr" role="status" aria-live="polite"></div>
</div>`
});
