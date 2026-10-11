/* Negotiation & BATNA: page skeleton. app.js fills the level cards and drives the stage. */
MBALAB.sims.define('negotiation-batna', {
  template: `<div class="nb" id="nb">
  <header class="nb-top">
    <button class="nb-back" data-sim-back><span data-i18n="nbBack">← Home</span></button>
    <h1 data-i18n="nbTitle">Negotiation &amp; BATNA</h1>
  </header>
  <section class="nb-select" id="nbSelect">
    <h2 data-i18n="nbPick">Choose a negotiation</h2>
    <p class="nb-sub" data-i18n="nbPickSub"></p>
    <div class="nb-cards" id="nbCards"></div>
    <div class="nb-how"><h3 data-i18n="howT"></h3><ol><li data-i18n="how1"></li><li data-i18n="how2"></li><li data-i18n="how3"></li><li data-i18n="how4"></li></ol></div>
  </section>
  <section class="nb-play" id="nbPlay" hidden>
    <div class="nb-hud">
      <span class="nb-chip" id="nbRound"></span>
      <span class="nb-chip nb-chip-b" id="nbBatna"></span>
      <span class="nb-chip nb-scn" id="nbScn"></span>
    </div>
    <div class="nb-stage" id="nbStage">
      <canvas id="nbCv" width="960" height="540" role="img" data-ia="aria-label=stageAria"></canvas>
      <div class="nb-bub nb-bub-n" id="nbBubN" aria-hidden="true"></div>
      <div class="nb-bub nb-bub-y" id="nbBubY" aria-hidden="true"></div>
      <div class="nb-brief" id="nbBrief" hidden></div>
    </div>
    <div class="nb-ctl" id="nbCtl">
      <div class="nb-offer">
        <label for="nbRange" data-i18n="sliderLbl"></label>
        <div class="nb-row">
          <button type="button" id="nbMinus" aria-label="-1">−</button>
          <input type="range" id="nbRange" min="60" max="170" step="1" value="90">
          <button type="button" id="nbPlus" aria-label="+1">+</button>
          <output id="nbVal" class="nb-val"></output>
        </div>
        <small class="nb-kb" data-i18n="kbHint"></small>
      </div>
      <div class="nb-acts">
        <button type="button" id="nbOffer" class="nb-main"></button>
        <button type="button" id="nbAccept"></button>
        <button type="button" id="nbProbe"></button>
        <button type="button" id="nbWalk" class="nb-danger" data-i18n="btnWalk"></button>
      </div>
    </div>
    <div class="nb-res" id="nbRes" hidden></div>
  </section>
  <div class="nb-sr" id="nbSr" role="status" aria-live="polite"></div>
</div>`
});
