/* Markup. Use data-i18n="key" for texts. data-sim-back on any element returns to the catalog.
   The shell (sk-root, sk-top, sk-back, sk-scroll, sk-wrap) comes from shared/simkit.css: do not restyle it, add only what is specific to your simulation. */
MBALAB.sims.define('my-simulation', {
  template: `<div class="sk-root ms">
  <header class="sk-top"><button class="sk-back" data-sim-back><span data-i18n="simBack">← Home</span></button><h1 data-i18n="title">My Simulation</h1></header>
  <div class="sk-scroll"><div class="sk-wrap"><p class="sk-sub" data-i18n="hello"></p>
  <label>A <input id="msA" type="number" value="2"></label> <label>B <input id="msB" type="number" value="3"></label>
  <button id="msGo" data-i18n="calc"></button> <output id="msOut"></output></div></div>
</div>`
});
