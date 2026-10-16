/* Scenario template logic. Pattern: pick a scenario card -> play day by day (hud chips + stage + controls) -> result.
   Replace the model (SCEN, demand) with your own; keep the sections, the info button and the guide pop-up. */
MBALAB.sims.define('my-simulation', {
  mount(host) {
    const $ = s => host.querySelector(s), T = (k, p) => t(k, p), sfx = MBALAB.util.sfx, DAYS = 5, PRICE = 3, COST = 1;
    const SCEN = [{ icon: '🏘️', demand: d => [18, 20, 17, 21, 19][d] }, { icon: '🛒', demand: d => [10, 34, 12, 36, 14][d] }];
    let sc = 0, day = 0, profit = 0, last = null, busy = false;
    const $r = $('#snRange'), money = v => 'Rp ' + Math.round(v * 1000).toLocaleString();

    /* ---------- select ---------- */
    function select() {
      $('#snPlay').hidden = true; $('#snSelect').hidden = false;
      $('#snCards').innerHTML = SCEN.map((s, i) => `<button type="button" class="sn-card" data-sc="${i}"><span aria-hidden="true" style="font-size:28px">${s.icon}</span><b>${T('sc' + (i + 1))}</b><small>${T('sc' + (i + 1) + 'd')}</small></button>`).join('');
      $('#snHow').innerHTML = `<h3>${T('howT')}</h3><ol><li>${T('how1')}</li><li>${T('how2')}</li><li>${T('how3')}</li></ol>`;
    }
    /* ---------- play ---------- */
    function start(i) { sc = i; day = 0; profit = 0; last = null; busy = false; $('#snSelect').hidden = true; $('#snPlay').hidden = false; $('#snRes').hidden = true; $('#snCtl').hidden = false; $('#snLog').textContent = ''; fit(); hud(); val(); sfx('open'); }
    function hud() { $('#snDay').textContent = T('day', { n: Math.min(day + 1, DAYS) }); $('#snCash').textContent = T('cash', { v: money(profit) }); }
    const val = () => { $('#snVal').textContent = T('order', { n: $r.value }); draw(); };
    function go() {
      if (busy || day >= DAYS) return; const stock = +$r.value, cust = SCEN[sc].demand(day), sold = Math.min(stock, cust);
      last = { stock, cust }; profit += sold * PRICE - stock * COST; $('#snLog').textContent = T('log', { d: day + 1, s: stock, c: cust, x: sold }); day++; hud(); draw(); sfx('tick');
      if (day >= DAYS) { busy = true; setTimeout(finish, 600); }
    }
    function finish() {
      $('#snCtl').hidden = true; $('#snRes').hidden = false; sfx('ok');
      $('#snRes').innerHTML = `<div class="sc-rh"><h2>${T('done')}</h2><span class="sc-stars">${profit > 60 ? '★★★' : profit > 30 ? '★★☆' : '★☆☆'}</span></div><p>${T('total', { v: money(profit) })}</p>
        <div class="sc-end"><button type="button" class="sn-main" data-a="again">${T('again')}</button><button type="button" data-a="other">${T('other')}</button></div>`;
      $('#snSr').textContent = T('done') + '. ' + T('total', { v: money(profit) });
    }
    /* ---------- stage ---------- */
    const cv = $('#snCv'), ctx = cv.getContext('2d');
    function fit() { const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); draw(); }
    function draw() {
      const W = cv.width, H = cv.height, cs = getComputedStyle(host.querySelector('#sn')), col = n => cs.getPropertyValue(n).trim() || '#888';
      ctx.clearRect(0, 0, W, H); const bw = W / 14, base = H - 30, k = (H - 80) / 40;
      for (let i = 0; i < DAYS; i++) {
        const x = 60 + i * (bw * 2.4), isNow = i === day, stock = i === day ? +$r.value : (i < day ? last && i === day - 1 ? last.stock : 0 : 0);
        ctx.fillStyle = isNow ? col('--cy') : 'rgba(128,150,200,.35)'; ctx.fillRect(x, base - stock * k, bw, stock * k);
        if (i < day) { const c = SCEN[sc].demand(i); ctx.fillStyle = col('--am'); ctx.fillRect(x + bw + 6, base - c * k, 6, c * k); }
        ctx.fillStyle = col('--txt'); ctx.font = `${Math.round(W / 55)}px system-ui,sans-serif`; ctx.fillText(String(i + 1), x + bw / 2, H - 8);
      }
    }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(cv);
    /* ---------- info button + guide pop-up (opened by the "i" button, closed by Esc, the cross or the button) ---------- */
    const guide = $('#snGuide');
    function showGuide() {
      guide.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="snGdT"><button type="button" class="gx" data-gclose aria-label="${T('close')}">✕</button><h3 id="snGdT">${T('guideT')}</h3><ul><li>${T('guide1')}</li><li>${T('guide2')}</li></ul><p class="gtip">💡 ${T('gtip')}</p><button type="button" class="sn-main" data-gclose style="width:100%">${T('gotIt')}</button></div>`;
      guide.hidden = false; sfx('open');
    }
    const closeGuide = () => { if (!guide.hidden) { guide.hidden = true; sfx('close'); } };
    guide.addEventListener('click', e => { if (e.target === guide || e.target.closest('[data-gclose]')) closeGuide(); });
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && !guide.hidden) { closeGuide(); e.stopPropagation(); } });
    $('#snInfo').addEventListener('click', () => { guide.hidden ? showGuide() : closeGuide(); });
    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const c = e.target.closest('[data-sc]'); if (c) { sfx('tick'); start(+c.dataset.sc); return; }
      const a = e.target.closest('[data-a]'); if (a) { sfx('tick'); if (a.dataset.a === 'again') start(sc); else select(); }
    });
    $('#snGo').addEventListener('click', go);
    $('#snMinus').addEventListener('click', () => { $r.value = +$r.value - 1; val(); });
    $('#snPlus').addEventListener('click', () => { $r.value = +$r.value + 1; val(); });
    $r.addEventListener('input', val);
    select();
    this._sn = { fit, relabel() { if ($('#snPlay').hidden) select(); else { hud(); val(); } } };
  },
  onShow() { const m = this._sn; if (m) m.fit(); },
  onLang() { const m = this._sn; if (m) m.relabel(); }
});
