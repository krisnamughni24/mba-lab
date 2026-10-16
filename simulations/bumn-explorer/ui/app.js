/* BUMN Explorer: UI wiring. Data and quiz in engine.js, 3D city in scene.js (Three.js), texts in strings.js. */
MBALAB.sims.define('bumn-explorer', {
  mount(host) {
    const E = MBALAB.bumn, Q = E.quiz, $ = s => host.querySelector(s), T = (k, p) => t('bm_' + k, p);
    const still = () => document.body.classList.contains('still');
    const sfx = MBALAB.util.sfx;
    const KEY = 'mbalab-bumn', M = E.LIST.length;
    const stage = $('#bmStage'), name = id => E.byId[id].n;
    let gl = null;
    let mode = 'explore', sel = null, filter = null, q = null, fb = null, visible = false;
    let visited = new Set();
    try { visited = new Set(JSON.parse(localStorage.getItem(KEY) || '[]').filter(id => E.byId[id])); } catch (e) {}
    let cloud = { changed() {}, attempt() {} };
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...visited])); } catch (e) {} cloud.changed(); };
    const col = id => E.COLORS[E.byId[id].sec];
    const secName = id => t('bm_sec_' + E.byId[id].sec);
    const inSec = (b, x) => b.sec === x || b.also === x;
    const clue = id => t('bm_d_' + id).split(name(id)).join('___');

    /* ---------- chips + list + progress ---------- */
    function chips() {
      const f = host.contains(document.activeElement) && document.activeElement.closest('#bmChips') ? document.activeElement.id : '';
      const opt = b => `<option value="${b.id}"${sel === b.id ? ' selected' : ''}>${b.icon} ${b.n}${visited.has(b.id) ? ' ✓' : ''}</option>`;
      const cats = `<option value="">${T('allCat')}</option>` + E.SECTORS.map(x => `<option value="${x}"${filter === x ? ' selected' : ''}>${t('bm_sec_' + x)} (${E.LIST.filter(b => inSec(b, x)).length})</option>`).join('');
      const cos = filter ? E.LIST.filter(b => inSec(b, filter)).map(opt).join('')
        : E.SECTORS.map(x => `<optgroup label="${t('bm_sec_' + x)}">${E.LIST.filter(b => b.sec === x).map(opt).join('')}</optgroup>`).join('');
      $('#bmChips').innerHTML = `<label class="ex-dd" style="--c:${filter ? E.COLORS[filter] : 'var(--cy)'}"><select id="bmCat" aria-label="${T('catLbl')}">${cats}</select></label>` +
        `<label class="ex-dd"><select id="bmCo" aria-label="${T('coLbl')}"><option value=""${sel ? '' : ' selected'}>${T('coLbl')} (${filter ? E.LIST.filter(b => inSec(b, filter)).length : M})</option>${cos}</select></label>`;
      if (f) { const el = $('#' + f); el && el.focus({ preventScroll: true }); }
    }
    function list() {
      const L = $('#bmList');
      if (mode !== 'explore' || gl) { L.innerHTML = ''; return; }
      L.innerHTML = `<h3>${T('listT')}</h3><div class="ex-lg">` + E.LIST.filter(b => !filter || inSec(b, filter)).map(b =>
        `<button type="button" class="ex-li${sel === b.id ? ' on' : ''}" data-id="${b.id}" style="--c:${E.COLORS[b.sec]}"><span>${b.icon}</span><b>${b.n}</b>${visited.has(b.id) ? '<em aria-label="' + T('visited') + '">✓</em>' : ''}</button>`).join('') + '</div>';
    }
    function prog() {
      $('#bmProg').textContent = mode === 'explore' ? T('prog', { n: visited.size, m: M }) : '';
      $('#bmChips').hidden = mode !== 'explore';
    }

    /* ---------- info card (explore) ---------- */
    function card() {
      const c = $('#bmCard');
      if (mode !== 'explore' || !sel) { c.hidden = true; return; }
      const b = E.byId[sel], I = E.INFO && E.INFO[sel], G = (E.GUIDE || {})[sel] || {}, L = li();
      const pick = a => a && (a[L] || a[0]);
      const meta = (I ? `<span>🗓 ${T('since', { y: I.since })}</span><span>📍 ${I.hq}</span>` : '') + (G.tick ? `<span>📈 ${G.tick}</span>` : '');
      const secs = `<div class="ex-sec" style="--c:${col(sel)}"><i></i>${secName(sel)}</div>` + (b.also ? `<div class="ex-sec" style="--c:${E.COLORS[b.also]}"><i></i>${T('alsoLbl')} ${t('bm_sec_' + b.also)}</div>` : '');
      const row = (ico, lab, txt) => txt ? `<li><span>${ico}</span><div><b>${lab}</b> ${txt}</div></li>` : '';
      const rows = (I ? row('📜', '', pick(I.f[0])) : '') + (G.fig ? row('📊', T('figT') + ':', pick(G.fig)) : I ? row('📊', '', pick(I.f[1])) : '') +
        (G.val ? row('💡', T('valT') + ':', pick(G.val)) : I ? row('💡', '', pick(I.f[2])) : '') + (G.note ? row('🔎', T('noteT') + ':', pick(G.note)) : '');
      const facts = rows ? `<h4>${T('factT')}</h4><ul class="ex-facts">${rows}</ul>` : '';
      const chip = id => `<button type="button" class="ex-sub" data-go="${id}" style="--c:${col(id)}"><span>${E.byId[id].icon}</span>${name(id)}</button>`;
      let sb = '';
      if (G.subs) {
        const S = G.subs, st = { rec: 'subRec', par: 'subPar', nv: 'subNv' }[S.st] || 'subRec';
        sb += `<div class="ex-subs"><h4>${T('subsT')}</h4><p><b>${S.n == null ? '—' : S.n === 0 ? T('subsNone') : T('subsN', { n: S.n })}</b> <em class="ex-st ${S.st}">${T(st)}</em>${S.at ? ' <small>' + T('subAt', { d: S.at }) + '</small>' : ''}</p>`;
        const kids = E.LIST.filter(x => x.sub === sel); if (kids.length) sb += `<p class="ex-sl">${T('subLand')}:</p><div class="ex-chs">${kids.map(x => chip(x.id)).join('')}</div>`;
        sb += '</div>';
      }
      if (b.sub && E.byId[b.sub]) sb += `<div class="ex-subs"><h4>${T('subOf')}</h4><div class="ex-chs">${chip(b.sub)}</div></div>`;
      c.innerHTML = `<button type="button" class="ex-x" data-x aria-label="${T('close')}">✕</button>${secs}
        <h3><span>${b.icon}</span> ${b.n}</h3>${G.legal ? `<p class="ex-legal">${G.legal}</p>` : ''}${meta ? `<div class="ex-meta">${meta}</div>` : ''}<p>${t('bm_d_' + sel)}</p>${facts}${sb}
        <div class="ex-vis">✓ ${T('visited')}</div>`;
      c.hidden = false;
      $('#bmSr').textContent = b.n + '. ' + t('bm_d_' + sel);
    }
    function select(id) {
      sel = id;
      if (id) { if (!visited.has(id)) { visited.add(id); save(); } sfx('click'); }
      gl && (gl.set({ visited }), gl.focus(id)); chips(); card(); list(); prog();
    }
    function deselect() { sel = null; gl && gl.focus(null); sync(); }

    /* ---------- quiz: fact questions in three levels ---------- */
    const LVN = { easy: 'lvlEasy', medium: 'lvlMed', hard: 'lvlHard' }, LVD = { easy: 'lvlEasyD', medium: 'lvlMedD', hard: 'lvlHardD' }, LVC = { easy: 'var(--gn)', medium: 'var(--am)', hard: 'var(--rd)' };
    const li = () => Math.max(0, ['en', 'id', 'ja', 'zh'].indexOf(MBALAB.i18n.get()));
    const info = id => E.INFO && E.INFO[id];
    const bestAll = () => { try { return JSON.parse(localStorage.getItem(KEY + '-best') || '{}'); } catch (e) { return {}; } };
    const saveBest = (lv, sc) => { try { const b = bestAll(); if (!(b[lv] >= sc)) { b[lv] = sc; localStorage.setItem(KEY + '-best', JSON.stringify(b)); } } catch (e) {} cloud.changed(); };
    const maxMap = (a, b) => { const o = Object.assign({}, a || {}); Object.keys(b || {}).forEach(k => { if (!(o[k] >= b[k])) o[k] = b[k]; }); return o; };
    cloud = MBALAB.cloud('bumn-explorer', {
      read: () => ({ visited: [...visited], best: bestAll() }),
      write: o => { visited = new Set(((o && o.visited) || []).filter(id => E.byId[id])); try { localStorage.setItem(KEY, JSON.stringify([...visited])); localStorage.setItem(KEY + '-best', JSON.stringify((o && o.best) || {})); } catch (e) {} },
      merge: (a, b) => ({ visited: Array.from(new Set([].concat((a && a.visited) || [], (b && b.visited) || []))), best: maxMap(a && a.best, b && b.best) }),
      refresh: () => { if (typeof sync === 'function') sync(); }
    });
    function qText(c) {
      const nm = () => name(c.id);
      switch (c.k) {
        case 'sector': return { title: T('qSector', { name: nm() }), body: '', lab: c.o.map(x => t('bm_sec_' + x)) };
        case 'hq': return { title: T('qHq', { name: nm() }), body: '', lab: c.o.map(String) };
        case 'member': return { title: T('qMember', { sec: t('bm_sec_' + c.sec) }), body: '', lab: c.o.map(name) };
        case 'fact': return { title: T('qFact'), body: '“' + Q.mask(info(c.id).f[c.fi][li()], c.id) + '”', lab: c.o.map(name) };
        case 'year': return { title: T('qYear', { name: nm() }), body: '', lab: c.o.map(String) };
        case 'figure': return { title: T('qFig'), body: '“' + Q.mask(E.GUIDE[c.id].fig[li()], c.id) + '”', lab: c.o.map(name) };
        case 'note': return { title: T('qNote'), body: '“' + Q.mask(E.GUIDE[c.id].note[li()], c.id) + '”', lab: c.o.map(name) };
        case 'subs': return { title: T('qSubs', { name: nm() }), body: '', lab: c.o.map(String) };
        case 'parent': return { title: T('qParent', { name: nm() }), body: '', lab: c.o.map(name) };
        case 'orgq': return { title: T('qOrg_' + c.q), body: '', lab: c.o.map(name) };
        case 'oldest': return { title: T('qOldest'), body: '', lab: c.o.map(name) };
        default: return { title: T('qTitle'), body: clue(c.id), lab: c.o.map(name) };
      }
    }
    function renderBox() {
      const b = $('#bmBox');
      if (mode === 'explore') { b.innerHTML = `<p class="ex-hint">💡 ${T('hint')}</p>` + (gl ? `<p class="ex-hint ex-h2">🖱️ ${T('hint3d')}</p>` : ''); return; }
      if (!q) {
        const bs = bestAll();
        b.innerHTML = `<div class="ex-qc ex-lv"><h3>${T('lvlT')}</h3><div class="ex-lvs">` + Q.LEVELS.map(l => `<button type="button" class="ex-lvb" data-lv="${l}" style="--c:${LVC[l]}"><b>${T(LVN[l])}</b><span>${T(LVD[l])}</span>${bs[l] != null ? `<em>${T('best', { s: bs[l], m: Q.ROUNDS })}</em>` : ''}</button>`).join('') + '</div></div>';
        return;
      }
      if (q.done) {
        const m = Q.ROUNDS, s = q.score, tier = s >= 7 ? 0 : s >= 4 ? 1 : 2;
        b.innerHTML = `<div class="ex-rc"><div class="ex-hud"><span class="ex-pill" style="border-color:${LVC[q.level]};color:${LVC[q.level]}">${T(LVN[q.level])}</span></div><h2>${T('rsTitle')}</h2><p class="ex-big"><b>${T('rsScore', { s, m })}</b></p><p>${T('rs' + tier)}</p>` +
          (q.missed.length ? `<h4>${T('rsMiss')}</h4><ul class="ex-miss">${q.missed.map(id => `<li style="--c:${col(id)}"><span>${E.byId[id].icon}</span><b>${name(id)}</b> <small>${secName(id)}</small></li>`).join('')}</ul>` : '') +
          `<div class="ex-end"><button type="button" class="ex-main" data-act="again">${T('again')}</button><button type="button" data-act="lvl">${T('change')}</button><button type="button" data-act="explore">${T('backExp')}</button></div></div>`;
        return;
      }
      const c = Q.cur(q), x = qText(c), last = q.i === Q.ROUNDS - 1, I = info(c.id);
      const G = (E.GUIDE || {})[c.id], why = (c.k === 'figure' || c.k === 'note') && G && G.val ? G.val[li()] : c.k === 'subs' && G && G.note ? G.note[li()] : c.k === 'orgq' && G && G.val ? G.val[li()] : I ? I.f[c.k === 'fact' ? (c.fi + 1) % 3 : 2][li()] : (G && G.val ? G.val[li()] : '');
      b.innerHTML = `<div class="ex-qc"><div class="ex-hud"><span class="ex-pill">${T('qN', { n: q.i + 1, m: Q.ROUNDS })}</span><span class="ex-pill" style="border-color:${LVC[q.level]};color:${LVC[q.level]}">${T(LVN[q.level])}</span><span class="ex-pill ex-pill-b">${T('qScore', { s: q.score })}</span></div>
        <h3>${x.title}</h3>${x.body ? `<p class="ex-clue">${x.body}</p>` : ''}<div class="ex-opts">` +
        x.lab.map((l, i) => `<button type="button" class="ex-opt${fb ? (i === c.ci ? ' ok' : i === fb.picked ? ' bad' : '') : ''}" data-o="${i}"${fb ? ' disabled' : ''}><i>${'ABCD'[i]}</i><span>${l}</span></button>`).join('') + '</div>' +
        (fb ? `<p class="ex-fb ${fb.ok ? 'ok' : 'bad'}">${fb.ok ? T('ok') + ' <b>' + x.lab[c.ci] + '</b>' : T('bad', { ans: x.lab[c.ci] })}</p>${why ? `<p class="ex-why">💡 <b>${T('why')}</b> ${why}</p>` : ''}<div class="ex-end"><button type="button" class="ex-main" data-act="next">${last ? T('seeRes') : T('next')}</button></div>` : `<p class="ex-hint">${T('qHint')}</p>`) + '</div>';
      $('#bmSr').textContent = T('qN', { n: q.i + 1, m: Q.ROUNDS }) + '. ' + x.title + ' ' + x.body;
    }
    function showLevels() {
      q = null; fb = null; sel = null; filter = null;
      if (gl) { gl.reveal(null); gl.focus(null); gl.set({ filter: null }); } sync();
    }
    function beginQuiz(level) {
      q = Q.create(level, Math.floor(Math.random() * 1e9) + 1); fb = null; sfx('click');
      if (gl) { gl.reveal(null); gl.focus(null); } renderBox(); sync();
    }
    function pickQuiz(i) {
      if (!q || q.done || q.answered) return;
      const r = Q.answer(q, i); if (!r) return;
      fb = r; sfx(r.ok ? 'ok' : 'click');
      if (gl) { gl.reveal(Q.target(q)); gl.focus(Q.target(q)); } renderBox();
    }
    function nextQuiz() {
      Q.next(q); fb = null; if (gl) { gl.reveal(null); gl.focus(null); } if (q.done) { saveBest(q.level, q.score); cloud.attempt({ at: Date.now(), score: q.score / Q.ROUNDS * 100, variant: q.level, detail: { c: q.score, t: Q.ROUNDS } }); sfx('ok'); } renderBox();
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
      if (m === 'quiz') showLevels(); else { q = null; fb = null; if (gl) gl.reveal(null); sync(); }
    }
    $('#bmExp').addEventListener('click', () => setMode('explore'));
    $('#bmQz').addEventListener('click', () => { if (mode === 'quiz') { sfx('click'); showLevels(); } else setMode('quiz'); });

    /* ---------- events ---------- */
    $('#bmChips').addEventListener('change', e => {
      const el = e.target; sfx('click');
      if (el.id === 'bmCat') { filter = el.value || null; if (sel && filter && !inSec(E.byId[sel], filter)) sel = null; sync(); }
      else if (el.id === 'bmCo') { if (el.value) select(el.value); else deselect(); }
    });
    $('#bmList').addEventListener('click', e => { const b = e.target.closest('.ex-li'); if (b) select(b.dataset.id); });
    $('#bmCard').addEventListener('click', e => { if (e.target.closest('[data-x]')) { deselect(); return; } const g = e.target.closest('[data-go]'); if (g && E.byId[g.dataset.go]) { if (filter && !inSec(E.byId[g.dataset.go], filter)) filter = null; select(g.dataset.go); } });
    $('#bmBox').addEventListener('click', e => {
      const lv = e.target.closest('[data-lv]'); if (lv) { beginQuiz(lv.dataset.lv); return; }
      const o = e.target.closest('[data-o]'); if (o) { pickQuiz(+o.dataset.o); return; }
      const a = e.target.closest('[data-act]'); if (!a) return;
      if (a.dataset.act === 'next') nextQuiz(); else if (a.dataset.act === 'again') beginQuiz(q.level); else if (a.dataset.act === 'lvl') { sfx('click'); showLevels(); } else if (a.dataset.act === 'explore') { setMode('explore'); }
    });
    $('#bmReset').addEventListener('click', () => { if (!gl) return; sel = null; gl.cam.reset(); sync(); });

    /* ---------- info dialog (inside the stage) ---------- */
    const guide = $('#bmGuide');
    function showGuide() {
      guide.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="bmGdT"><button type="button" class="gx" data-gclose aria-label="${T('close')}">✕</button>
        <h3 id="bmGdT">${T('howT')}</h3><ol><li>${T('howNav')}</li><li>${T('how1')}</li><li>${T('how2')}</li><li>${T('how3')}</li></ol>
        <p class="gtip"><b>💡 ${T('tipLbl')}:</b> ${T('gdTip')}</p><button type="button" class="ex-main" data-gclose>${T('gotIt')}</button></div>`;
      guide.hidden = false; sfx('open'); const b = guide.querySelector('.ex-main'); b && b.focus({ preventScroll: true });
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
    /* ---------- start window: the 3D map, or the Danantara guide website ---------- */
    const GUIDE_URL = 'https://danantara-intelligence.boldpeach9.chatgpt.site/', choose = $('#bmChoose'), scrollEl = $('#bmScroll'), modesEl = $('.ex-modes');
    let entry = true;
    $('#bmGShot').innerHTML = `<i>Danantara</i><h5>${T('gsTitle')}</h5><div class="st"><u>${T('gsStat')}</u><u>${T('gsPl')}</u><u>${T('gsCo')}</u></div><div class="bars">${E.SECTORS.slice(1, 6).map((x, i) => `<s style="--c:${E.COLORS[x]};width:${88 - i * 13}%"></s>`).join('')}</div>`;
    function showChoose() { entry = true; choose.hidden = false; scrollEl.classList.add('ex-hold'); modesEl.classList.add('ex-hold'); closeGuide(); loop(); const b = choose.querySelector('[data-pick]'); b && b.focus({ preventScroll: true }); }
    function enterMap() { entry = false; choose.hidden = true; scrollEl.classList.remove('ex-hold'); modesEl.classList.remove('ex-hold'); sfx('click'); loop(); fit(); setTimeout(fit, 60); }
    choose.addEventListener('click', e => { const b = e.target.closest('[data-pick]'); if (!b) return; if (b.dataset.pick === 'map') enterMap(); else { sfx('open'); window.location.href = GUIDE_URL; } });
    function loop() { if (!gl) return; if (visible && !entry && !still() && !document.hidden) gl.start(); else gl.stop(); }
    document.addEventListener('visibilitychange', loop);
    function fit() { gl && gl.resize(); }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(stage); else window.addEventListener('resize', fit);

    /* ---------- 3D scene (falls back to the company list when Three.js / WebGL is missing) ---------- */
    gl = E.Scene(stage, {
      onPick: id => { if (mode === 'explore') { if (id) select(id); else if (sel) deselect(); } },
      onHover: id => { if (mode === 'explore') gl.hoverRing(id); },
      canHover: () => mode === 'explore'
    });
    if (!gl) { $('#bmNoGl').hidden = false; $('#bmReset').hidden = true; } else $('#bm').classList.add('full');

    sync();
    this._bm = { full: !!gl, fit, loop, chooser: showChoose, setVisible(v) { visible = v; loop(); }, relabel() { sync(); if (!guide.hidden) showGuide(); }, theme(d) { gl && gl.setTheme(d); } };
  },
  onShow() { const m = this._bm; if (!m) return; if (m.full) { document.body.classList.add('mapfull'); window.cityHold && window.cityHold(true); } m.theme(MBALAB.theme && MBALAB.theme.isDay()); m.chooser(); m.setVisible(true); m.fit(); },
  onHide() { const m = this._bm; if (m) m.setVisible(false); document.body.classList.remove('mapfull'); window.cityHold && window.cityHold(false); },
  onLang() { const m = this._bm; if (m) m.relabel(); },
  onTheme(day) { const m = this._bm; if (m) m.theme(day); }
});
