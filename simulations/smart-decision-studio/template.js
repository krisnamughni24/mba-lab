/* SMART Decision Studio: markup */
MBALAB.sims.define('smart-decision-studio', {
  template: `<header><button id="back" data-sim-back data-ia="title=backTitle"><span data-i18n="backT">← Home</span></button><h1>SMART Decision Studio <span class="tag">MVP</span></h1><p data-i18n="appSub">Deterministic engine · editable model · live ranking · sensitivity analysis</p></header>
<main>
<section><h2 data-i18n="s1h">1 · Performance matrix & weights</h2>
<p class="note" data-i18n="s1n">Demo: BUMDes Bumi Lestari. Ratings (0–100) are <b>reconstructed demonstration ratings based on relative case information</b>, not verified facts. Raw weights are normalized automatically.</p>
<div class="sc"><table id="mx"></table></div>
<div class="row"><button id="addA" data-i18n="addA">+ Alternative</button><button id="addK" data-i18n="addK">+ Attribute</button><button id="reset" data-i18n="resetT">Reset</button><span id="msg" class="warn"></span></div></section>
<section><h2 data-i18n="s2h">2 · Aggregate SMART values</h2><p class="note" data-i18n="s2n">V<sub>j</sub> = Σ w<sub>i</sub>·v<sub>ij</sub>, with w<sub>i</sub> = W<sub>i</sub>/ΣW. Ties use a tolerance of 1e-9. Select a row for the term-by-term breakdown.</p>
<div class="sc"><table id="res"></table></div><pre id="drill"></pre></section>
<section><h2 data-i18n="s3h">3 · Sensitivity analysis</h2>
<p class="note" data-i18n="s3n">V<sub>j</sub>(x) = (Σ<sub>i≠k</sub> W<sub>i</sub>v<sub>ij</sub> + x·v<sub>kj</sub>) / (S + x). Crossover x* = (A<sub>b</sub> − A<sub>a</sub>)/(v<sub>ka</sub> − v<sub>kb</sub>), computed from the current model.</p>
<div class="s3"><div class="l"><div class="row"><label><span data-i18n="lAttr">Attribute</span> <select id="ks"></select></label><label><span data-i18n="lMaxX">Max x</span> <input type="number" id="xm" value="200" min="1"></label>
<label><span data-i18n="lAxis">Axis</span> <select id="ax"><option value="raw" data-i18n="axRaw">Raw weight x</option><option value="norm" data-i18n="axNorm">Normalized weight</option></select></label></div>
<div class="row"><input type="range" id="sl" min="0" max="200" step="1" value="30" style="flex:1;min-width:200px"><span id="slv"></span></div>
<div class="chw"><svg id="ch" viewBox="0 0 700 330"></svg></div></div><div class="r"><div class="sc"><table id="cx"></table></div><p id="sum" class="note"></p></div></div></section>
</main>`
});
