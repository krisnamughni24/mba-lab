/* BUMN Explorer: UI wiring. Data and quiz in engine.js, 3D city in scene.js (Three.js), texts in strings.js. */
MBALAB.sims.define('bumn-explorer', {
  mount(host) {
    const E = MBALAB.bumn, Q = E.quiz, $ = s => host.querySelector(s), T = (k, p) => t('bm_' + k, p);
    const still = () => document.body.classList.contains('still');
    const sfx = n => { try { MBALAB.audio && MBALAB.audio.play(n); } catch (e) {} };
    const KEY = 'mbalab-bumn', M = E.LIST.length;
    const stage = $('#bmStage'), name = id => E.byId[id].n;
    let gl = null;
    let mode = 'explore', sel = null, filter = null, q = null, fb = null, visible = false;
    let visited = new Set();
    try { visited = new Set(JSON.parse(localStorage.getItem(KEY) || '[]').filter(id => E.byId[id])); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...visited])); } catch (e) {} };
    const col = id => E.COLORS[E.byId[id].sec];
    const secName = id => t('bm_sec_' + E.byId[id].sec);
    const clue = id => t('bm_d_' + id).split(name(id)).join('___');

    /* ---------- chips + list + progress ---------- */
    function chips() {
      $('#bmChips').innerHTML = `<button type="button" class="bm-chip${filter ? '' : ' on'}" data-f="">${T('all')}</button>` +
        E.SECTORS.map(s => `<button type="button" class="bm-chip${filter === s ? ' on' : ''}" data-f="${s}" style="--c:${E.COLORS[s]}"><i></i>${t('bm_sec_' + s)}</button>`).join('');
    }
    function list() {
      const L = $('#bmList');
      if (mode !== 'explore' && gl) { L.innerHTML = ''; return; }
      L.innerHTML = `<h3>${T('listT')}</h3><div class="bm-lg">` + E.LIST.filter(b => !filter || b.sec === filter).map(b =>
        `<button type="button" class="bm-li${sel === b.id ? ' on' : ''}" data-id="${b.id}" style="--c:${E.COLORS[b.sec]}"><span>${b.icon}</span><b>${b.n}</b>${mode === 'explore' && visited.has(b.id) ? '<em aria-label="' + T('visited') + '">✓</em>' : ''}</button>`).join('') + '</div>';
    }
    function prog() {
      $('#bmProg').textContent = mode === 'explore' ? T('prog', { n: visited.size, m: M }) : '';
      $('#bmChips').hidden = mode !== 'explore';
    }

    /* ---------- info card (explore) ---------- */
    function card() {
      const c = $('#bmCard');
      if (mode !== 'explore' || !sel) { c.hidden = true; return; }
      const b = E.byId[sel];
      c.innerHTML = `<button type="button" class="bm-x" data-x aria-label="${T('close')}">✕</button>
        <div class="bm-sec" style="--c:${col(sel)}"><i></i>${secName(sel)}</div>
        <h3><span>${b.icon}</span> ${b.n}</h3><p>${t('bm_d_' + sel)}</p>
        <div class="bm-vis">✓ ${T('visited')}</div><div class="bm-foot">${T('foot')}</div>`;
      c.hidden = false;
      $('#bmSr').textContent = b.n + '. ' + t('bm_d_' + sel);
    }
    function select(id) {
      sel = id;
      if (id) { if (!visited.has(id)) { visited.add(id); save(); } sfx('click'); }
      gl && (gl.set({ visited }), gl.focus(id)); card(); list(); prog();
    }
    function deselect() { sel = null; gl && gl.focus(null); sync(); }

    /* ---------- quiz ---------- */
    function renderBox() {
      const b = $('#bmBox');
      if (mode === 'explore') { b.innerHTML = `<p class="bm-hint">💡 ${T('hint')}</p>` + (gl ? `<p class="bm-hint bm-h2">🖱️ ${T('hint3d')}</p>` : ''); return; }
      if (!q) { b.innerHTML = ''; return; }
      if (q.done) {
        const m = Q.ROUNDS, s = q.score, tier = s >= 7 ? 0 : s >= 4 ? 1 : 2;
        b.innerHTML = `<div class="bm-rc"><h2>${T('rsTitle')}</h2><p class="bm-big"><b>${T('rsScore', { s, m })}</b></p><p>${T('rs' + tier)}</p>` +
          (q.missed.length ? `<h4>${T('rsMiss')}</h4><ul class="bm-miss">${q.missed.map(id => `<li style="--c:${col(id)}"><span>${E.byId[id].icon}</span><b>${name(id)}</b> <small>${secName(id)}</small></li>`).join('')}</ul>` : '') +
          `<div class="bm-end"><button type="button" class="bm-main" data-act="again">${T('again')}</button><button type="button" data-act="explore">${T('backExp')}</button></div></div>`;
        return;
      }
      const id = Q.target(q), last = q.i === Q.ROUNDS - 1;
      b.innerHTML = `<div class="bm-qc"><div class="bm-hud"><span class="bm-pill">${T('qN', { n: q.i + 1, m: Q.ROUNDS })}</span><span class="bm-pill bm-pill-b">${T('qScore', { s: q.score })}</span></div>
        <h3>${T('qTitle')}</h3><p class="bm-clue">${clue(id)}</p>` +
        (fb ? `<p class="bm-fb ${fb.ok ? 'ok' : 'bad'}">${fb.ok ? T('ok', { name: name(id) }) : T('bad', { name: name(fb.picked), ans: name(id) })}</p><div class="bm-end"><button type="button" class="bm-main" data-act="next">${last ? T('seeRes') : T('next')}</button></div>` : `<p class="bm-hint">${T('qHint')}</p>`) + '</div>';
      $('#bmSr').textContent = T('qN', { n: q.i + 1, m: Q.ROUNDS }) + '. ' + clue(id);
    }
    function startQuiz() {
      q = Q.create(Math.floor(Math.random() * 1e9) + 1); fb = null; sel = null; filter = null;
      if (gl) { gl.reveal(null); gl.focus(null); gl.set({ filter: null }); } sync();
    }
    function pickQuiz(id) {
      if (!q || q.done || q.answered) return;
      const r = Q.answer(q, id); if (!r) return;
      fb = r; sfx(r.ok ? 'ok' : 'click');
      if (gl) { gl.reveal(Q.target(q)); gl.focus(Q.target(q)); } renderBox();
    }
    function nextQuiz() {
      Q.next(q); fb = null; if (gl) { gl.reveal(null); gl.focus(null); } renderBox(); if (q.done) sfx('ok');
      $('#bmScroll').scrollTop = 0;
    }

    /* ---------- mode switching ---------- */
    function sync() {
      $('#bmExp').classList.toggle('on', mode === 'explore'); $('#bmQz').classList.toggle('on', mode === 'quiz');
      $('#bmExp').setAttribute('aria-pressed', mode === 'explore'); $('#bmQz').setAttribute('aria-pressed', mode === 'quiz');
      chips(); list(); prog(); card(); renderBox();
      if (gl) { gl.set({ filter, visited: mode === 'explore' ? visited : new Set() }); if (mode === 'explore' && sel) gl.focus(sel); else if (!(q && fb)) gl.focus(null); }
    }
    function setMode(m) {
      if (m === mode) return; mode = m; sfx('click');
      if (m === 'quiz') startQuiz(); else { q = null; fb = null; if (gl) gl.reveal(null); sync(); }
    }
    $('#bmExp').addEventListener('click', () => setMode('explore'));
    $('#bmQz').addEventListener('click', () => { if (mode === 'quiz') { sfx('click'); startQuiz(); } else setMode('quiz'); });

    /* ---------- events ---------- */
    $('#bmChips').addEventListener('click', e => {
      const b = e.target.closest('.bm-chip'); if (!b) return; filter = b.dataset.f || null; sfx('click');
      if (sel && filter && E.byId[sel].sec !== filter) sel = null;
      sync();
    });
    $('#bmList').addEventListener('click', e => { const b = e.target.closest('.bm-li'); if (!b) return; if (mode === 'quiz') pickQuiz(b.dataset.id); else select(b.dataset.id); });
    $('#bmCard').addEventListener('click', e => { if (e.target.closest('[data-x]')) deselect(); });
    $('#bmBox').addEventListener('click', e => {
      const a = e.target.closest('[data-act]'); if (!a) return;
      if (a.dataset.act === 'next') nextQuiz(); else if (a.dataset.act === 'again') { sfx('click'); startQuiz(); } else if (a.dataset.act === 'explore') { setMode('explore'); }
    });
    /* camera pad: press and hold to repeat (same as the landing page) */
    const hold = (id, fn) => {
      const b = $(id); let tm = null; const stop = () => { clearInterval(tm); tm = null; };
      b.addEventListener('pointerdown', () => { fn(); clearInterval(tm); tm = setInterval(fn, 110); });
      ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach(ev => b.addEventListener(ev, stop));
      b.addEventListener('click', e => { if (e.detail === 0) fn(); });
    };
    const cm = fn => () => { gl && fn(gl.cam); };
    hold('#bmIn', cm(c => c.zoom(.9))); hold('#bmOut', cm(c => c.zoom(1.12)));
    hold('#bmUp', cm(c => c.tilt(.05))); hold('#bmDown', cm(c => c.tilt(-.05)));
    hold('#bmLeft', cm(c => c.rot(.06))); hold('#bmRight', cm(c => c.rot(-.06)));
    $('#bmReset').addEventListener('click', () => { if (!gl) return; sel = null; gl.cam.reset(); sync(); });

    /* ---------- info dialog (inside the stage) ---------- */
    const guide = $('#bmGuide');
    function showGuide() {
      guide.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="bmGdT"><button type="button" class="gx" data-gclose aria-label="${T('close')}">✕</button>
        <h3 id="bmGdT">${T('howT')}</h3><ol><li>${T('how1')}</li><li>${T('how2')}</li><li>${T('how3')}</li></ol>
        <p class="gtip"><b>💡 ${T('tipLbl')}:</b> ${T('gdTip')}</p><button type="button" class="bm-main" data-gclose>${T('gotIt')}</button></div>`;
      guide.hidden = false; sfx('open'); const b = guide.querySelector('.bm-main'); b && b.focus({ preventScroll: true });
    }
    const closeGuide = () => { if (guide.hidden) return; guide.hidden = true; sfx('close'); };
    guide.addEventListener('click', e => { if (e.target === guide || e.target.closest('[data-gclose]')) closeGuide(); });
    host.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (!guide.hidden) { closeGuide(); e.stopPropagation(); } else if (sel) { deselect(); e.stopPropagation(); }
    });
    $('#bmInfo').addEventListener('click', () => { guide.hidden ? showGuide() : closeGuide(); });

    /* ---------- assistant Bit ---------- */
    function hints() {
      if (mode === 'quiz') return q && q.done ? { state: ['bm_nbt_end'], generic: ['bm_nbt_end'] } : { state: [], generic: ['bm_nbt_q1', 'bm_nbt_q2'] };
      return { state: visited.size ? [] : ['bm_nbt_e1'], generic: ['bm_nbt_e2', 'bm_nbt_e3', 'bm_nbt_e1'] };
    }
    if (window.SmartAssistant) SmartAssistant.create(host, { root: $('#bm'), hints, busy: () => !guide.hidden });

    /* ---------- loop + sizing ---------- */
    function loop() { if (!gl) return; if (visible && !still() && !document.hidden) gl.start(); else gl.stop(); }
    document.addEventListener('visibilitychange', loop);
    function fit() { gl && gl.resize(); }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(stage); else window.addEventListener('resize', fit);

    /* ---------- 3D scene (falls back to the company list when Three.js / WebGL is missing) ---------- */
    gl = E.Scene(stage, {
      onPick: id => { if (mode === 'explore') { if (id) select(id); else if (sel) deselect(); } else if (id) pickQuiz(id); },
      onHover: id => { if (mode === 'explore') gl.hoverRing(id); },
      canHover: () => mode === 'explore'
    });
    if (!gl) { $('#bmNoGl').hidden = false; $('#bmPad').hidden = true; }

    sync();
    this._bm = { fit, loop, setVisible(v) { visible = v; loop(); }, relabel() { sync(); if (!guide.hidden) showGuide(); }, theme(d) { gl && gl.setTheme(d); } };
  },
  onShow() { const m = this._bm; if (!m) return; m.theme(MBALAB.theme && MBALAB.theme.isDay()); m.setVisible(true); m.fit(); },
  onHide() { const m = this._bm; if (m) m.setVisible(false); },
  onLang() { const m = this._bm; if (m) m.relabel(); },
  onTheme(day) { const m = this._bm; if (m) m.theme(day); }
});
