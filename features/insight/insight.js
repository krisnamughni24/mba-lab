/* Insight feature: the "MBA insight" card for the simulation that is open (framework, how to use it at work, pitfalls, one applied question).
   Content comes from data/insights.js. Progress is a small passport saved in this browser and shown as a stamp on the catalog cards. */
MBALAB.feature('insight', () => {
  const I = MBALAB.data.insights || {}, KEY = 'mbalab-passport', esc = MBALAB.util.esc;
  let pass = {}; try { pass = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(pass)); } catch (e) {} };
  const rec = id => (pass[id] = pass[id] || { read: 0, chk: [], quiz: 0 });
  const liveIds = () => (MBALAB.data.simulations || []).filter(s => s.status === 'live' && I[s.id]).map(s => s.id);
  MBALAB.passport = { done: id => !!(pass[id] && pass[id].quiz === 1), count: () => liveIds().filter(id => pass[id] && pass[id].quiz === 1).length };

  const dlg = MBALAB.ui.html('<div class="ov" id="insightDlg" role="dialog" aria-modal="true" aria-labelledby="insT"><div class="mw dlgw wide"><div class="row" style="justify-content:space-between;margin:0"><h3 id="insT"></h3><button type="button" data-close data-sfx="close" data-ia="aria-label=insClose">✕</button></div><div id="insBody"></div></div></div>');
  MBALAB.ui.dialog(dlg); MBALAB.overlay.register(dlg);
  const btn = MBALAB.ui.html('<button id="btnInsight" type="button" aria-haspopup="dialog" data-action="open-insight" data-sfx="open" data-ia="aria-label=insAria,title=insAria"><span aria-hidden="true">🎓</span><span class="lb" data-i18n="insLbl">Insight</span></button>');
  MBALAB.ui.nav(btn, 5);
  let shown = null;

  const render = () => {
    const id = shown, d = I[id]; if (!d) return; const r = rec(id), sim = (MBALAB.data.simulations || []).find(s => s.id === id), q = d.quiz;
    $('insT').textContent = t('insT') + ' · ' + (sim ? tr(sim.name) : '');
    $('insBody').innerHTML =
      '<p class="ins-fw">' + esc(tr(d.fw)) + '</p>' +
      '<h4>' + t('insIdea') + '</h4><p>' + esc(tr(d.what)) + '</p>' +
      '<h4>' + t('insUse') + '</h4><p>' + esc(tr(d.use)) + '</p>' +
      '<h4>' + t('insDo') + '</h4><ul class="ins-do">' + d.do.map((x, i) => '<li><label><input type="checkbox" data-chk="' + i + '"' + (r.chk[i] ? ' checked' : '') + '><span>' + esc(tr(x)) + '</span></label></li>').join('') + '</ul>' +
      '<h4>' + t('insTrap') + '</h4><ul class="ins-trap">' + d.trap.map(x => '<li>' + esc(tr(x)) + '</li>').join('') + '</ul>' +
      '<div class="ins-quiz"><h4>' + t('insCheck') + '</h4><p class="ins-q">' + esc(tr(q.q)) + '</p><div class="ins-opts">' + q.a.map((x, i) => '<button type="button" data-ans="' + i + '">' + esc(tr(x)) + '</button>').join('') + '</div><p class="ins-fb" id="insFb" aria-live="polite"></p></div>' +
      '<p class="ins-pass">🎓 ' + t('insPass', { n: MBALAB.passport.count(), m: liveIds().length }) + '</p>';
    if (r.quiz === 1) feedback(q.ok, true);
  };
  const feedback = (i, silent) => {
    const q = I[shown].quiz, ok = i === q.ok, fb = $('insFb'), opts = [...$('insBody').querySelectorAll('[data-ans]')];
    opts.forEach((b, k) => { b.classList.toggle('ok', k === q.ok && (ok || silent)); b.classList.toggle('no', k === i && !ok); });
    fb.className = 'ins-fb ' + (ok ? 'ok' : 'no');
    fb.innerHTML = '<b>' + (ok ? t('insRight') : t('insWrong')) + '</b>' + (ok ? ' <span>' + t('insWhy') + ': ' + esc(tr(q.why)) + '</span>' : '');
  };
  dlg.addEventListener('change', e => { const c = e.target.closest('[data-chk]'); if (c) { rec(shown).chk[+c.dataset.chk] = c.checked ? 1 : 0; save(); } });
  dlg.addEventListener('click', e => {
    const b = e.target.closest('[data-ans]'); if (!b) return; const i = +b.dataset.ans, ok = i === I[shown].quiz.ok; feedback(i);
    if (ok && rec(shown).quiz !== 1) { rec(shown).quiz = 1; save(); MBALAB.emit('passport'); const p = dlg.querySelector('.ins-pass'); if (p) p.innerHTML = '🎓 ' + t('insPass', { n: MBALAB.passport.count(), m: liveIds().length }); }
    else if (!ok) { rec(shown).quiz = rec(shown).quiz || -1; }
  });

  MBALAB.actions['open-insight'] = () => { shown = MBALAB.sims.current(); if (!shown || !I[shown]) return; rec(shown).read = 1; save(); btn.classList.remove('new'); render(); MBALAB.overlay.open(dlg); };
  MBALAB.on('lang', () => { if (dlg.classList.contains('on')) render(); });
  /* the button only matters inside a simulation: pulse until its insight has been opened once */
  const sync = () => { const id = MBALAB.sims.current(); btn.hidden = !id || !I[id]; btn.classList.toggle('new', !!id && !(pass[id] && pass[id].read)); };
  new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['class'] }); sync(); btn.hidden = true;
});
