/* Markup. Use data-i18n="key" for texts. data-sim-back on any element returns to the catalog. */
MBALAB.sims.define('my-simulation', {
  template: `<header><button data-sim-back data-i18n="simBack">← Home</button><h1 data-i18n="title">My Simulation</h1></header>
<main><section><p data-i18n="hello"></p>
<label>A <input id="msA" type="number" value="2"></label> <label>B <input id="msB" type="number" value="3"></label>
<button id="msGo" data-i18n="calc"></button> <output id="msOut"></output></section></main>`
});
