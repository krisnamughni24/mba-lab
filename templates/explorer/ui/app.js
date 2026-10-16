/* Explorer template logic. Pattern: items live in DATA; explore mode shows a map + detail card + list, quiz mode asks questions about them.
   Replace DATA and the strings with your own content; keep the modes, filter chips, card and quiz box. */
MBALAB.sims.define('my-simulation', {
  mount(host) {
    const $ = s => host.querySelector(s), T = (k, p) => t(k, p), sfx = MBALAB.util.sfx, ROUNDS = 5;
    const COL = { fin: '#34d399', mkt: '#ff6ad5', ops: '#4dd2ff' }, SECS = ['fin', 'mkt', 'ops'];
    const DATA = [['budget', 'fin', '💰'], ['cash', 'fin', '💵'], ['audit', 'fin', '🧾'], ['brand', 'mkt', '🏷️'], ['pricing', 'mkt', '💲'], ['ads', 'mkt', '📣'], ['stock', 'ops', '📦'], ['ship', 'ops', '🚚'], ['quality', 'ops', '✅']]
      .map(([id, sec, icon], i) => ({ id, sec, icon, x: .14 + (i % 3) * .3 + (i % 2) * .06, y: .2 + Math.floor(i / 3) * .28 }));
    const byId = Object.fromEntries(DATA.map(d => [d.id, d]));
    let mode = 'explore', filter = '', sel = '', visited = new Set(), q = null;
    const cv = $('#epCv'), ctx = cv.getContext('2d'), name = id => T('t_' + id), secName = id => T(byId[id].sec);

    /* ---------- chips, list, card ---------- */
    function bar() {
      $('#epProg').textContent = T('prog', { n: visited.size, m: DATA.length });
      $('#epChips').innerHTML = [''].concat(SECS).map(s => `<button type="button" class="ex-chip ${filter === s ? 'on' : ''}" data-f="${s}" style="--c:${s ? COL[s] : 'var(--cy)'}"><i></i>${s ? T(s) : T('all')}</button>`).join('');
    }
    function list() {
      $('#epList').innerHTML = `<h3>${T('listT')}</h3><div class="ex-lg">` + DATA.filter(d => !filter || d.sec === filter).map(d => `<button type="button" class="ex-li ${sel === d.id ? 'on' : ''}" data-id="${d.id}" style="--c:${COL[d.sec]}"><span>${d.icon}</span><b>${name(d.id)}</b>${visited.has(d.id) ? '<em aria-label="' + T('visited') + '">✓</em>' : ''}</button>`).join('') + '</div>';
    }
    function card() {
      const c = $('#epCard'); if (!sel || mode !== 'explore') { c.hidden = true; return; }
      c.hidden = false; c.innerHTML = `<button type="button" class="ex-x" data-x aria-label="${T('close')}">✕</button><div class="ex-sec" style="--c:${COL[byId[sel].sec]}"><i></i>${secName(sel)}</div><h3>${byId[sel].icon} ${name(sel)}</h3><p>${T('d_' + sel)}</p>${visited.has(sel) ? `<div class="ex-vis">✓ ${T('visited')}</div>` : ''}`;
    }
    function select(id) { sel = id; if (id) { visited.add(id); sfx('tick'); $('#epSr').textContent = name(id); } bar(); list(); card(); draw(); }

    /* ---------- stage: dots on the canvas, click to select ---------- */
    function fit() { const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); draw(); }
    function draw() {
      const W = cv.width, H = cv.height, cs = getComputedStyle(host.querySelector('#ep')); ctx.clearRect(0, 0, W, H);
      ctx.font = `${Math.round(W / 55)}px system-ui,sans-serif`; ctx.textAlign = 'center';
      DATA.forEach(d => {
        const on = !filter || d.sec === filter, x = d.x * W, y = d.y * H, r = (d.id === sel ? 1.5 : 1) * W / 55;
        ctx.globalAlpha = on ? 1 : .25; ctx.fillStyle = COL[d.sec]; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
        ctx.fillStyle = cs.getPropertyValue('--txt').trim() || '#fff'; ctx.fillText(name(d.id), x, y + r + W / 40);
      }); ctx.globalAlpha = 1;
    }
    cv.addEventListener('click', e => {
      const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      const hit = DATA.filter(d => !filter || d.sec === filter).find(d => Math.hypot((d.x - x) * 16, (d.y - y) * 9) < .6); if (hit) select(hit.id);
    });
    if (window.ResizeObserver) new ResizeObserver(fit).observe(cv);

    /* ---------- quiz mode ---------- */
    function quiz() {
      const b = $('#epBox');
      if (mode !== 'quiz') { b.innerHTML = `<p class="ex-hint">💡 ${T('hint')}</p>`; return; }
      if (!q) { const ids = DATA.map(d => d.id).sort(() => Math.random() - .5).slice(0, ROUNDS); q = { ids, i: 0, score: 0, fb: null }; }
      if (q.i >= ROUNDS) { b.innerHTML = `<div class="ex-rc"><h2>${T('rsTitle')}</h2><p class="ex-big"><b>${T('rsScore', { s: q.score, m: ROUNDS })}</b></p><div class="ex-end"><button type="button" class="ex-main" data-act="again">${T('again')}</button><button type="button" data-act="explore">${T('backExp')}</button></div></div>`; return; }
      const id = q.ids[q.i], fb = q.fb;
      b.innerHTML = `<div class="ex-qc"><div class="ex-hud"><span class="ex-pill">${T('qN', { n: q.i + 1, m: ROUNDS })}</span><span class="ex-pill ex-pill-b">${T('qScore', { s: q.score })}</span></div>
        <h3>${byId[id].icon} ${name(id)}</h3><p class="ex-clue">${T('d_' + id)}</p><p>${T('qAsk')}</p><div class="ex-opts">${SECS.map((s, i) => `<button type="button" class="ex-opt${fb ? (s === byId[id].sec ? ' ok' : s === fb.picked ? ' bad' : '') : ''}" data-o="${s}"${fb ? ' disabled' : ''}><i>${'ABC'[i]}</i><span>${T(s)}</span></button>`).join('')}</div>
        ${fb ? `<p class="ex-fb ${fb.ok ? 'ok' : 'bad'}">${fb.ok ? T('ok') : T('bad', { ans: secName(id) })}</p><div class="ex-end"><button type="button" class="ex-main" data-act="next">${q.i === ROUNDS - 1 ? T('seeRes') : T('next')}</button></div>` : ''}</div>`;
    }
    function setMode(m) { mode = m; q = null; $('#epExp').classList.toggle('on', m === 'explore'); $('#epQz').classList.toggle('on', m === 'quiz'); card(); quiz(); sfx('tick'); }

    /* ---------- info button + guide pop-up ---------- */
    const guide = $('#epGuide');
    function showGuide() {
      guide.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="epGdT"><button type="button" class="gx" data-gclose aria-label="${T('close')}">✕</button><h3 id="epGdT">${T('guideT')}</h3><ul><li>${T('g1')}</li><li>${T('g2')}</li></ul><button type="button" class="ex-main" data-gclose>${T('gotIt')}</button></div>`;
      guide.hidden = false; sfx('open');
    }
    const closeGuide = () => { if (!guide.hidden) { guide.hidden = true; sfx('close'); } };
    guide.addEventListener('click', e => { if (e.target === guide || e.target.closest('[data-gclose]')) closeGuide(); });
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && !guide.hidden) { closeGuide(); e.stopPropagation(); } });
    $('#epInfo').addEventListener('click', () => { guide.hidden ? showGuide() : closeGuide(); });

    /* ---------- events ---------- */
    $('#epExp').addEventListener('click', () => setMode('explore')); $('#epQz').addEventListener('click', () => setMode('quiz'));
    $('#epChips').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (b) { filter = b.dataset.f; if (sel && filter && byId[sel].sec !== filter) sel = ''; bar(); list(); card(); draw(); } });
    $('#epList').addEventListener('click', e => { const b = e.target.closest('.ex-li'); if (b) select(b.dataset.id); });
    $('#epCard').addEventListener('click', e => { if (e.target.closest('[data-x]')) select(''); });
    $('#epBox').addEventListener('click', e => {
      const o = e.target.closest('[data-o]'), a = e.target.closest('[data-act]');
      if (o && q && !q.fb) { const ok = o.dataset.o === byId[q.ids[q.i]].sec; q.fb = { ok, picked: o.dataset.o }; if (ok) q.score++; sfx(ok ? 'ok' : 'lose'); quiz(); }
      else if (a) { const k = a.dataset.act; if (k === 'next') { q.i++; q.fb = null; quiz(); } else if (k === 'again') { q = null; quiz(); } else setMode('explore'); }
    });
    bar(); list(); quiz();
    this._ep = { fit, relabel() { bar(); list(); card(); quiz(); draw(); } };
  },
  onShow() { const m = this._ep; if (m) m.fit(); },
  onLang() { const m = this._ep; if (m) m.relabel(); }
});
