/* Word Network markup (Explorer template). Class names ex-* come from shared/explorer.css; wn-* are local (ui/style.css). */
MBALAB.sims.define('word-network', {
  template: `<div class="sk-root ex wn" id="wn">
  <header class="sk-top ex-top">
    <button class="sk-back ex-back" data-sim-back><span data-i18n="simBack">← Home</span></button>
    <h1 data-i18n="title">Word Network</h1>
    <div class="ex-modes" role="group"><button type="button" id="wnExp" class="on"><span data-i18n="modeExp"></span></button><button type="button" id="wnQz"><span data-i18n="modeQz"></span></button></div>
  </header>
  <div class="sk-scroll ex-scroll" id="wnScroll">
    <div class="ex-wrap">
      <div class="ex-bar"><span class="ex-prog" id="wnProg"></span><div class="ex-chips" id="wnChips"></div></div>
      <form class="wn-in" id="wnForm" autocomplete="off"><input id="wnInput" type="text" maxlength="30" spellcheck="false" data-ia="placeholder=ph,aria-label=ph"><button type="submit" class="ex-main" data-i18n="add">Add</button><div class="wn-sug" id="wnSug" hidden></div></form>
      <p class="wn-msg" id="wnMsg"></p>
      <div class="wn-sel" id="wnSel"></div>
      <div class="ex-sw"><div class="ex-stage" id="wnStage">
        <canvas id="wnCv" width="960" height="540" role="img" aria-label="Word network"></canvas>
        <div class="ex-tools"><span></span><button type="button" class="ex-info" id="wnInfo" data-ia="title=info,aria-label=info"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button></div>
        <div class="ex-guide" id="wnGuide" hidden></div>
      </div>
      <aside class="ex-card" id="wnCard" hidden></aside></div>
      <div class="ex-box" id="wnBox"></div>
      <div class="ex-list" id="wnList"></div>
      <p class="wn-credit" data-i18n="credit"></p>
    </div>
  </div>
  <div class="ex-sr" id="wnSr" role="status" aria-live="polite"></div>
</div>`
});
