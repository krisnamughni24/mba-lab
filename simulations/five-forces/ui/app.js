/* Five Forces: tabs and lifecycle. The mission game is in game.js, the Lab in lab.js, the maths in engine/engine.js. */
MBALAB.sims.define('five-forces', {
  mount(host) {
    const $ = s => host.querySelector(s), sfx = MBALAB.util.sfx;
    const game = MBALAB.ffGame(host), lab = MBALAB.ffLab($('#ffLab'));
    let tab = 'game', shown = false;
    const setTab = k => { tab = k; $('#fgGame').hidden = k !== 'game'; $('#ffLab').hidden = k !== 'lab'; host.querySelectorAll('[data-tab]').forEach(b => { const on = b.dataset.tab === k; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }); game.setVisible(shown && k === 'game'); if (k === 'lab') lab.show(); };
    host.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { setTab(b.dataset.tab); sfx('tick'); } });
    this._ff = { game, lab, show(v) { shown = v; game.setVisible(v && tab === 'game'); if (v) game.setTheme(MBALAB.theme && MBALAB.theme.isDay()); } };
    this._ff.show(true);
  },
  onShow() { const m = this._ff; if (m) m.show(true); },
  onHide() { const m = this._ff; if (m) m.show(false); },
  onTheme(day) { const m = this._ff; if (m) m.game.setTheme(day); },
  onLang() { const m = this._ff; if (m) { m.game.relabel(); m.lab.relabel(); } }
});
