/* Logic. mount(host) runs once, after the template is in the page; host is the #app element. */
MBALAB.sims.define('my-simulation', {
  mount(host) {
    const $ = s => host.querySelector(s);
    // t('key', {param: value}) returns the text in the current language (global helper)
    $('#msGo').addEventListener('click', () => {
      $('#msOut').textContent = t('result', { v: (+$('#msA').value) + (+$('#msB').value) });
    });
  },
  onShow() {},          // every time the simulation is opened
  onLang(lang) {},      // language changed while open (static texts update automatically)
  onTheme(day) {}       // true = day mode
});
