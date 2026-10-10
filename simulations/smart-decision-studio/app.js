/* SMART Decision Studio: a three-part game.
   Part 1 build the model (alternatives, weighted attributes, ratings) -> Part 2 predict and reveal the ranking
   -> Part 3 stress-test the winner (sensitivity). XP, levels and badges reward each step.
   Deterministic math:  V_j = sum_i w_i v_ij ;  V_j(x) = (sum_{i!=k} W_i v_ij + x v_kj) / (S + x) ;
   crossover x* = (A_b - A_a) / (v_ka - v_kb). */
(() => {
  let api = null;
  MBALAB.sims.define('smart-decision-studio', {
    mount(host) {
      const q = id => host.querySelector('#' + id);
      const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      const f = (x, d = 2) => Number(x).toFixed(d);
      const sv = v => Number.isFinite(v) ? v : '';
      const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      const MAXN = 8;

      /* ---------- model ---------- */
      const EX = () => ({
        alts: ['Citarum', 'Parahyangan', 'Digi Nusa', 'Kencana', 'Mitra Usaha'],
        attrs: [{ n: 'Branch Proximity', w: 10 }, { n: 'Relationship Manager', w: 30 }, { n: 'Automatic Credit Limit', w: 100 }, { n: 'Cash Management', w: 50 }],
        m: [[0, 100, 40, 0], [100, 100, 80, 0], [70, 0, 100, 100], [30, 0, 0, 100], [90, 100, 20, 0]]
      });
      const BLANK = () => ({ alts: ['', ''], attrs: [{ n: '', w: NaN }, { n: '', w: NaN }], m: [[NaN, NaN], [NaN, NaN]] });
      let S = BLANK();
      const clone = o => JSON.parse(JSON.stringify(o, (k, v) => (typeof v === 'number' && !isFinite(v)) ? '__nan' : v), (k, v) => v === '__nan' ? NaN : v);

      const NIGHTC = ['#7dd3fc', '#6ee7b7', '#fbbf24', '#c4b5fd', '#fda4af', '#e5e7eb', '#fde68a', '#67e8f9'];
      const DAYC = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#475569', '#a16207', '#0e7490'];
      const COL = NIGHTC.slice();
      const setTheme = day => { COL.splice(0, 8, ...(day ? DAYC : NIGHTC)); };

      const aName = j => S.alts[j].trim() || t('altN', { n: j + 1 });
      const kName = i => S.attrs[i].n.trim() || t('attrN', { n: i + 1 });
      const totalW = () => S.attrs.reduce((a, b) => a + (+b.w || 0), 0);

      function checks() {
        const named = a => a.length >= 2 && a.every(x => x.trim());
        return {
          ck1: named(S.alts),
          ck2: named(S.attrs.map(a => a.n)),
          ck3: S.attrs.every(a => Number.isFinite(a.w) && a.w >= 0) && totalW() > 0,
          ck4: S.m.every(r => r.every(v => Number.isFinite(v) && v >= 0 && v <= 100))
        };
      }
      const complete = () => Object.values(checks()).every(Boolean);
      function valid() {
        const W = S.attrs.map(a => a.w);
        if (S.alts.length < 2) return t('vAlts');
        if (W.some(w => !isFinite(w) || w < 0)) return t('vWeights');
        if (!(W.reduce((a, b) => a + b, 0) > 0)) return t('vZero');
        for (const r of S.m) for (const v of r) if (!isFinite(v) || v < 0 || v > 100) return t('vRatings');
        return '';
      }
      function scores() {
        const T = totalW();
        return S.alts.map((n, j) => ({ j, n: aName(j), V: S.attrs.reduce((s, a, i) => s + a.w / T * S.m[j][i], 0) }));
      }
      const ranked = () => scores().sort((a, b) => b.V - a.V);

      /* ---------- game state ---------- */
      const G = { xp: 0, stage: 0, pred: null, revealed: false, done: {}, badges: {}, flipped: false, k: null, drilled: null };
      const BADGES = [['builder', '🛠️'], ['oracle', '🔮'], ['detective', '🔍'], ['flipper', '🌀'], ['explorer', '🧭']];
      const STEP = 40; // XP per level, max level 5
      const level = () => Math.min(5, Math.floor(G.xp / STEP) + 1);

      function renderHud(pulse) {
        const lv = level();
        q('sdLvl').textContent = t('lvl', { n: lv }) + ' · ' + t('lv' + lv);
        q('sdXp').style.width = (lv >= 5 ? 100 : (G.xp % STEP) / STEP * 100) + '%';
        q('sdXpT').textContent = t('xpT', { n: G.xp });
        q('sdBadges').innerHTML = BADGES.map(([id, ic]) =>
          `<span class="bdg${G.badges[id] ? ' on' : ''}" title="${esc(t('b_' + id) + ': ' + t('bd_' + id))}">${ic}</span>`).join('');
        if (pulse) { const el = q('sdXp').parentNode; el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse'); }
      }
      function gain(n) {
        const before = level();
        G.xp += n;
        toast(t('xpGain', { n }), 'xp');
        renderHud(true);
        if (level() > before) { toast(t('lvUp', { l: t('lv' + level()) }), 'lv'); confetti(60); }
      }
      const award = (key, xp) => { if (!G.done[key]) { G.done[key] = 1; gain(xp); } };
      function badge(id) {
        if (G.badges[id]) return;
        G.badges[id] = 1;
        renderHud(true);
        toast(t('badgeUnl', { b: t('b_' + id) }), 'badge');
        confetti(40);
      }
      function toast(msg, kind, undo) {
        const el = document.createElement('div');
        el.className = 'sd-toast ' + (kind || '');
        el.innerHTML = '<span>' + esc(msg) + '</span>' + (undo ? `<button type="button" data-undo>${esc(t('undo'))}</button>` : '');
        if (undo) el.querySelector('button').onclick = () => { undo(); el.remove(); };
        q('sdToasts').appendChild(el);
        while (q('sdToasts').children.length > 4) q('sdToasts').firstChild.remove();
        setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 350); }, undo ? 5500 : 2600);
      }

      /* ---------- effects ---------- */
      let parts = [], raf = 0;
      function confetti(n = 80) {
        if (reduced()) return;
        const c = q('sdFx'), r = host.getBoundingClientRect();
        c.width = r.width; c.height = r.height;
        const cols = COL.concat(['#ffffff']);
        for (let i = 0; i < n; i++) parts.push({ x: r.width / 2 + (Math.random() - .5) * 160, y: r.height * .35, vx: (Math.random() - .5) * 11, vy: -Math.random() * 11 - 3, s: 4 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[i % cols.length], l: 1 });
        if (!raf) raf = requestAnimationFrame(tick);
      }
      function tick() {
        const c = q('sdFx'), x = c.getContext('2d');
        x.clearRect(0, 0, c.width, c.height);
        parts = parts.filter(p => p.l > 0 && p.y < c.height + 20);
        parts.forEach(p => { p.vy += .32; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr; p.l -= .004; x.save(); x.globalAlpha = Math.min(1, p.l * 2); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
        raf = parts.length ? requestAnimationFrame(tick) : 0;
        if (!parts.length) x.clearRect(0, 0, c.width, c.height);
      }
      function countUp(el, to, ms = 900) {
        if (reduced()) { el.textContent = f(to); return; }
        const t0 = performance.now();
        const step = now => { const p = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - p, 3); el.textContent = f(to * e); if (p < 1 && el.isConnected) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
      function shake(el) { if (!el) return; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }

      /* ---------- stepper ---------- */
      const unlocked = n => n === 0 || (n === 1 && complete()) || (n === 2 && complete() && G.revealed);
      function renderSteps() {
        q('sdSteps').innerHTML = [0, 1, 2].map(n => {
          const st = G.stage === n ? 'active' : (G.stage > n || (n === 0 && complete() && G.stage > 0) ? 'done' : (unlocked(n) ? 'open' : 'locked'));
          const done = (n === 0 && complete()) || (n === 1 && G.revealed) || (n === 2 && G.flipped);
          return `<li class="st ${st}${done ? ' ok' : ''}"><button type="button" data-go="${n}" ${unlocked(n) ? '' : 'aria-disabled="true"'} ${G.stage === n ? 'aria-current="step"' : ''}>
            <span class="n">${done && G.stage !== n ? '✓' : n + 1}</span><span class="l"><small>${esc(t('partN', { n: n + 1 }))}</small>${esc(t('stp' + (n + 1)))}</span></button></li>`;
        }).join('');
      }

      /* ---------- stage router ---------- */
      function go(n, anim = true) {
        if (n === 1 && !complete()) { toast(t('lockHint'), 'warn'); shake(q('next1')); return; }
        if (n === 2 && !G.revealed) { toast(t('revealFirst'), 'warn'); return; }
        const dir = n >= G.stage ? 1 : -1;
        G.stage = n;
        renderSteps();
        renderStage(anim ? dir : 0);
        const st = q('sdStage'); st.scrollTop = 0;
      }
      function renderStage(dir) {
        const st = q('sdStage');
        st.innerHTML = [stage1, stage2, stage3, stageDone][G.stage]();
        st.firstElementChild.classList.remove('in-l', 'in-r');
        if (dir && !reduced()) st.firstElementChild.classList.add(dir > 0 ? 'in-r' : 'in-l');
        [bind1, bind2, bind3, bindDone][G.stage]();
      }

      /* ---------- Part 1: build ---------- */
      function stage1() {
        return `<div class="sd-p1">
  <section class="sd-card">
    <div class="sd-h"><h2>${esc(t('m1h'))}</h2><p>${esc(t('m1n'))}</p></div>
    <div class="sd-tools">
      <button type="button" data-act="addA">${esc(t('addA'))}</button>
      <button type="button" data-act="addK">${esc(t('addK'))}</button>
      <span class="grow"></span>
      <button type="button" class="ex${Object.keys(G.badges).length || G.done.ck1 ? '' : ' hot'}" data-act="example" title="${esc(t('exampleTip'))}">📋 ${esc(t('example'))}</button>
      <button type="button" data-act="reset" title="${esc(t('resetTip'))}">↺ ${esc(t('reset'))}</button>
    </div>
    <div class="sc"><table id="mx"></table></div>
    <p class="warn" id="msg"></p>
    <p class="note" id="demoNote" hidden>${t('s1n')}</p>
  </section>
  <aside class="sd-card sd-quest">
    <h3>🎯 ${esc(t('quest'))}</h3>
    <ul id="ck">${['ck1', 'ck2', 'ck3', 'ck4'].map(k => `<li data-c="${k}"><span class="bx">✓</span><span>${esc(t(k))}</span></li>`).join('')}</ul>
    <div class="sd-prog"><i id="ckBar"></i></div>
    <button type="button" class="sd-cta" id="next1" data-act="go2">${esc(t('next1'))}</button>
    <p class="note" id="lockHint">${esc(t('lockHint'))}</p>
  </aside>
</div>`;
      }
      function renderMx() {
        let h = '<tr><th>' + esc(t('thAlt')) + '</th>' + S.attrs.map((a, i) =>
          `<th><span class="dot" style="background:${COL[i % 8]}"></span><input class="nm" value="${esc(a.n)}" data-an="${i}" placeholder="${esc(t('phAttr'))}" aria-label="${esc(t('phAttr'))} ${i + 1}"><button type="button" class="x" data-dk="${i}" title="${esc(t('delAttr'))}" aria-label="${esc(t('delAttr'))}">✕</button></th>`).join('') + '<th></th></tr>';
        h += `<tr><td><b>${esc(t('rawW'))}</b></td>` + S.attrs.map((a, i) => `<td><input type="number" min="0" value="${sv(a.w)}" data-w="${i}" aria-label="${esc(t('rawW'))} ${i + 1}"></td>`).join('') + '<td></td></tr>';
        h += `<tr class="nrm"><td>${esc(t('normW'))}</td>` + S.attrs.map((a, i) => `<td data-nw="${i}"></td>`).join('') + '<td></td></tr>';
        S.alts.forEach((n, j) => {
          h += `<tr><td><input class="nm" value="${esc(n)}" data-n="${j}" placeholder="${esc(t('phAlt'))}" aria-label="${esc(t('phAlt'))} ${j + 1}"></td>` +
            S.m[j].map((v, i) => `<td><input type="number" min="0" max="100" value="${sv(v)}" data-v="${j},${i}" aria-label="${esc(aName(j))} / ${esc(kName(i))}"></td>`).join('') +
            `<td><button type="button" class="x" data-d="${j}" title="${esc(t('delAlt'))}" aria-label="${esc(t('delAlt'))}">✕</button></td></tr>`;
        });
        q('mx').innerHTML = h;
        updateNorm();
      }
      function updateNorm() {
        const T = totalW();
        host.querySelectorAll('[data-nw]').forEach(td => { const a = S.attrs[+td.dataset.nw]; td.textContent = T > 0 && Number.isFinite(a.w) ? f(100 * a.w / T) + '%' : '–'; });
        const m = q('msg'); if (m) m.textContent = '';
      }
      function updateChecklist() {
        if (G.stage !== 0) return;
        const c = checks();
        let n = 0;
        Object.keys(c).forEach(k => {
          const li = host.querySelector(`#ck [data-c="${k}"]`); if (!li) return;
          if (c[k]) n++;
          const was = li.classList.contains('ok');
          li.classList.toggle('ok', c[k]);
          if (c[k] && !was) { li.classList.remove('pop'); void li.offsetWidth; li.classList.add('pop'); }
          if (c[k]) award(k, 10);
        });
        q('ckBar').style.width = n * 25 + '%';
        const ok = n === 4;
        const b = q('next1'); b.classList.toggle('ready', ok); b.setAttribute('aria-disabled', ok ? 'false' : 'true');
        q('lockHint').style.visibility = ok ? 'hidden' : 'visible';
        if (ok && !G.badges.builder) { badge('builder'); toast(t('ckDone'), 'lv'); }
        renderSteps();
      }
      function bind1() { renderMx(); updateChecklist(); }
      function afterStruct(focusSel) {
        renderMx(); updateChecklist();
        if (focusSel) { const el = host.querySelector(focusSel); if (el) el.focus(); }
      }
      function snapshotToast(msg, snap) {
        toast(msg, '', () => { S = snap; q('demoNote').hidden = true; afterStruct(); });
      }
      const ACT = {
        addA() { if (S.alts.length >= MAXN) { toast(t('maxItems'), 'warn'); return; } S.alts.push(''); S.m.push(S.attrs.map(() => NaN)); afterStruct(`[data-n="${S.alts.length - 1}"]`); },
        addK() { if (S.attrs.length >= MAXN) { toast(t('maxItems'), 'warn'); return; } S.attrs.push({ n: '', w: NaN }); S.m.forEach(r => r.push(NaN)); afterStruct(`[data-an="${S.attrs.length - 1}"]`); },
        example() { const snap = clone(S); S = EX(); q('demoNote').hidden = false; afterStruct(); snapshotToast(t('exLoaded'), snap); badge('explorer'); },
        reset() { const snap = clone(S); S.alts = S.alts.map(() => ''); S.attrs = S.attrs.map(() => ({ n: '', w: NaN })); S.m = S.m.map(r => r.map(() => NaN)); G.drilled = null; q('demoNote').hidden = true; afterStruct(); snapshotToast(t('cleared'), snap); },
        go2() { go(1); }
      };
      function delAlt(j) {
        if (S.alts.length <= 2) { toast(t('minAlts'), 'warn'); shake(host.querySelector(`[data-d="${j}"]`)); return; }
        const snap = clone(S), nm = aName(j);
        S.alts.splice(j, 1); S.m.splice(j, 1); afterStruct(); snapshotToast(t('removed', { n: nm }), snap);
      }
      function delAttr(i) {
        if (S.attrs.length <= 2) { toast(t('minAttrs'), 'warn'); shake(host.querySelector(`[data-dk="${i}"]`)); return; }
        const snap = clone(S), nm = kName(i);
        S.attrs.splice(i, 1); S.m.forEach(r => r.splice(i, 1)); afterStruct(); snapshotToast(t('removed', { n: nm }), snap);
      }

      /* ---------- Part 2: predict and reveal ---------- */
      function stage2() {
        if (!G.revealed) {
          return `<div class="sd-p2"><section class="sd-card sd-predict">
  <div class="sd-h"><h2>${esc(t('m2h'))}</h2><p>${esc(t('predQ'))}</p></div>
  <div class="sd-pick">${S.alts.map((n, j) => `<button type="button" class="pk${G.pred === j ? ' sel' : ''}" data-pk="${j}" style="--c:${COL[j % 8]}"><span class="dot"></span>${esc(aName(j))}</button>`).join('')}</div>
  <div class="sd-foot"><button type="button" data-act="back1">${esc(t('back'))}</button><span class="grow"></span><button type="button" class="sd-cta${G.pred != null ? ' ready' : ''}" id="rev" data-act="reveal" ${G.pred == null ? 'aria-disabled="true"' : ''}>🎲 ${esc(t('revealBtn'))}</button></div>
</section></div>`;
        }
        const r = ranked(), top = r[0].V, TW = totalW();
        const medal = ['🥇', '🥈', '🥉'];
        return `<div class="sd-p2"><section class="sd-card sd-rank">
  <div class="sd-h"><h2>${esc(t('m2h'))}</h2><p>${esc(t('rkHint'))}</p></div>
  <div class="sd-win" id="win"><span class="tro">🏆</span><div><small>${esc(t('winnerLbl'))}</small><b>${esc(r[0].n)}</b></div><strong data-to="${r[0].V}">0.00</strong></div>
  <div class="lgd">${S.attrs.map((a, i) => `<span><i style="background:${COL[i % 8]}"></i>${esc(kName(i))}</span>`).join('')}</div>
  <div class="rks" id="rks">${r.map((x, k) => {
    const tie = k > 0 && Math.abs(x.V - top) < 1e-9 || (k === 0 && r[1] && Math.abs(r[1].V - top) < 1e-9);
    return `<button type="button" class="rk${k === 0 ? ' top' : ''}${G.drilled === x.j ? ' sel' : ''}" data-r="${x.j}" style="--d:${k * 90}ms">
      <span class="med">${tie ? '=1' : (medal[k] || k + 1)}</span><span class="nm">${esc(x.n)}</span>
      <span class="bw"><span class="bs">${S.attrs.map((a, i) => `<i data-w="${(a.w / TW * S.m[x.j][i])}" style="background:${COL[i % 8]}"></i>`).join('')}</span></span>
      <b class="val" data-to="${x.V}">0.00</b><span class="vs">${f(x.V - top)}</span></button>`;
  }).join('')}</div>
  <div class="sd-drill" id="drill" aria-live="polite"></div>
  <details class="sd-more"><summary>${esc(t('moreInfo'))}</summary><p class="note">${t('s2n')}</p></details>
  <div class="sd-foot"><button type="button" data-act="back1">${esc(t('back'))}</button><span class="grow"></span><button type="button" class="sd-cta ready" data-act="go3">${esc(t('next2'))}</button></div>
</section></div>`;
      }
      function drill(j) {
        const T = totalW(), V = scores()[j].V;
        G.drilled = j;
        host.querySelectorAll('.rk').forEach(b => b.classList.toggle('sel', +b.dataset.r === j));
        q('drill').innerHTML = `<h4>${esc(t('breakdown', { a: aName(j) }))}</h4>` + S.attrs.map((a, i) => {
          const c = a.w / T * S.m[j][i];
          return `<div class="dr"><span class="dn"><i style="background:${COL[i % 8]}"></i>${esc(kName(i))}</span><span class="db"><i style="width:${Math.min(100, c)}%;background:${COL[i % 8]}"></i></span><code>${f(a.w / T, 4)} × ${S.m[j][i]} = ${f(c)}</code></div>`;
        }).join('') + `<div class="dr tot"><span class="dn">${esc(t('total'))}</span><span></span><code>${f(V)}</code></div>`;
      }
      function animateRank() {
        host.querySelectorAll('.bs i').forEach(i => { i.style.width = '0'; });
        requestAnimationFrame(() => requestAnimationFrame(() => {
          host.querySelectorAll('.bs i').forEach(i => { i.style.width = Math.min(100, +i.dataset.w) + '%'; });
        }));
        host.querySelectorAll('[data-to]').forEach(el => countUp(el, +el.dataset.to));
      }
      function bind2() {
        if (G.revealed) { animateRank(); if (G.drilled != null && G.drilled < S.alts.length) drill(G.drilled); }
      }
      function reveal() {
        if (G.pred == null) { toast(t('revealFirst'), 'warn'); shake(q('rev')); return; }
        const w = ranked()[0], right = w.j === G.pred;
        G.revealed = true;
        renderSteps();
        renderStage(0);
        q('sdStage').firstElementChild.classList.add('flipin');
        award('reveal', 20);
        if (!G.done.pred) { G.done.pred = 1; const xp = right ? 30 : 10; gain(xp); toast(right ? t('predRight', { xp }) : t('predWrong', { w: w.n, xp }), right ? 'badge' : 'warn'); if (right) badge('oracle'); }
        confetti(right ? 120 : 70);
      }

      /* ---------- Part 3: stress-test ---------- */
      function model(k) {
        const Wt = S.attrs.map(a => a.w), n = S.alts.length;
        const Sx = Wt.reduce((a, b, i) => i == k ? a : a + b, 0);
        const A = S.m.map(r => r.reduce((s, v, i) => i == k ? s : s + Wt[i] * v, 0)), vk = S.m.map(r => r[k]);
        const V = (j, x) => (Sx + x > 0) ? (A[j] + x * vk[j]) / (Sx + x) : NaN;
        const win = x => { let b = 0; for (let j = 1; j < n; j++) if (V(j, x) > V(b, x) + 1e-9) b = j; return b; };
        return { Wt, n, Sx, A, vk, V, win, bx: Wt[k] };
      }
      function flips(k, xm) { const m = model(k), b = m.win(m.bx); for (let s = 0; s <= 200; s++) if (m.win(xm * s / 200) !== b) return true; return false; }
      function stage3() {
        if (valid()) return '<div class="sd-p3"><section class="sd-card"><p class="warn">' + esc(valid()) + '</p><div class="sd-foot"><button type="button" data-act="back1">' + esc(t('back')) + '</button></div></section></div>';
        if (G.k == null || G.k >= S.attrs.length) { const ks = S.attrs.map((a, i) => i); G.k = ks.find(i => flips(i, 200)); if (G.k == null) G.k = 0; }
        const base = model(G.k).bx;
        return `<div class="sd-p3"><section class="sd-card">
  <div class="sd-h"><h2>${esc(t('m3h'))}</h2><p class="goal">${t('flipGoal', { a: esc(kName(G.k)) })}</p></div>
  <div class="sd-ctrl">
    <label><span>${esc(t('lAttr'))}</span><select id="ks">${S.attrs.map((a, i) => `<option value="${i}"${i === G.k ? ' selected' : ''}>${esc(kName(i))}</option>`).join('')}</select></label>
    <label><span>${esc(t('lMaxX'))}</span><input type="number" id="xm" value="200" min="1"></label>
    <label><span>${esc(t('lAxis'))}</span><select id="ax"><option value="raw">${esc(t('axRaw'))}</option><option value="norm">${esc(t('axNorm'))}</option></select></label>
  </div>
  <div class="sd-slw"><input type="range" id="sl" min="0" max="200" step="1" value="${Math.min(200, Math.round(base))}" aria-label="${esc(t('lMaxX'))}"></div>
  <div class="ldr" id="ldr" aria-live="polite"></div>
  <div class="chw"><svg id="ch" viewBox="0 0 700 330" role="img"></svg></div>
  <details class="sd-more"><summary>${esc(t('moreInfo'))}</summary><p class="note">${t('s3n')}</p><div class="sc"><table id="cx"></table></div><p id="sum" class="note"></p></details>
  <div class="sd-foot"><button type="button" data-act="back2">${esc(t('back'))}</button><span class="grow"></span><button type="button" class="sd-cta ready" data-act="finish">${esc(t('finish'))}</button></div>
</section></div>`;
      }
      let lastLeader = -1;
      function sens(user) {
        if (valid() || !q('ch')) return;
        const k = G.k, xm = Math.max(1, +q('xm').value || 200), M = model(k), { Wt, n, Sx, A, vk, V, win } = M;
        const norm = q('ax').value === 'norm';
        const xp = x => norm ? (Sx + x > 0 ? 100 * x / (Sx + x) : 0) : x;
        const X0 = xp(0), X1 = xp(xm), px = x => 50 + 620 * (xp(x) - X0) / ((X1 - X0) || 1), py = v => 300 - 270 * v / 100;
        let g = `<line x1=50 y1=300 x2=670 y2=300 stroke="var(--mut)"/><line x1=50 y1=30 x2=50 y2=300 stroke="var(--mut)"/>`;
        for (let v = 0; v <= 100; v += 25) g += `<text x=44 y=${py(v) + 4} text-anchor=end font-size=11 fill="var(--mut)">${v}</text><line x1=50 x2=670 y1=${py(v)} y2=${py(v)} stroke="var(--line)"/>`;
        for (let s = 0; s <= 4; s++) { const x = xm * s / 4, lbl = norm ? f(xp(x), 1) + '%' : f(x, 0); g += `<text x=${px(x)} y=318 text-anchor=middle font-size=11 fill="var(--mut)">${lbl}</text>`; }
        g += `<text x=360 y=332 text-anchor=middle font-size=11 fill="var(--mut)">${esc(norm ? t('axisNorm', { a: kName(k) }) : t('axisRaw', { a: kName(k) }))}</text>`;
        const cs = [];
        for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) { const d = vk[a] - vk[b]; if (Math.abs(d) < 1e-12) continue; const x = (A[b] - A[a]) / d; if (x >= 0 && x <= xm) cs.push({ a, b, x }); }
        cs.forEach(c => { const eps = Math.max(1e-6, xm * 1e-6), w1 = win(Math.max(0, c.x - eps)), w2 = win(c.x + eps); c.sw = w1 != w2; c.w1 = w1; c.w2 = w2; });
        cs.filter(c => c.sw).forEach(c => g += `<line x1=${px(c.x)} x2=${px(c.x)} y1=30 y2=300 stroke="var(--red)" stroke-dasharray="5 4"/>`);
        cs.filter(c => !c.sw).forEach(c => g += `<line x1=${px(c.x)} x2=${px(c.x)} y1=200 y2=300 stroke="var(--mut)" stroke-dasharray="2 4" opacity=.5 />`);
        for (let j = 0; j < n; j++) {
          let d = ''; for (let s = 0; s <= 160; s++) { const x = xm * s / 160; d += (s ? 'L' : 'M') + px(x) + ',' + py(V(j, x)); }
          g += `<path d="${d}" fill="none" stroke="${COL[j % 8]}" stroke-width=2.6 />`;
          g += `<text x=${Math.min(px(xm) - 2, 668)} y=${py(V(j, xm)) - 4} text-anchor=end font-size=10.5 fill="${COL[j % 8]}">${esc(aName(j))}</text>`;
        }
        const bx = M.bx;
        if (bx <= xm) g += `<line x1=${px(bx)} x2=${px(bx)} y1=30 y2=300 stroke="var(--teal)" stroke-width=2 /><text x=${px(bx) + 4} y=42 font-size=11 fill="var(--teal)">${esc(t('base'))}</text>`;
        const cx = +q('sl').value;
        g += `<line x1=${px(cx)} x2=${px(cx)} y1=30 y2=300 stroke="var(--org)" stroke-width=2 />`;
        q('ch').innerHTML = g;
        /* leader card + flip challenge */
        const o = [...Array(n).keys()].sort((a, b) => V(b, cx) - V(a, cx)), lead = o[0], baseLead = win(bx), can = flips(k, xm);
        const isFlip = lead !== baseLead;
        const ld = q('ldr');
        ld.className = 'ldr' + (isFlip ? ' flip' : '');
        ld.innerHTML = `<div class="who"><small>${esc(t('leader'))}</small><b style="color:${COL[lead % 8]}">${esc(aName(lead))}</b><span>${f(V(lead, cx))}</span></div>
          <div class="msg"><span class="x">x = ${cx} (${f(100 * cx / (Sx + cx), 2)}%)</span><span class="st">${isFlip ? '🌀 ' + esc(t('flipped')) : esc(can ? t('flipHint') : t('noFlip'))}</span></div>`;
        if (lead !== lastLeader) { ld.firstElementChild.classList.remove('pop'); void ld.offsetWidth; ld.firstElementChild.classList.add('pop'); lastLeader = lead; }
        if (user) { award('slide', 15); if (isFlip && !G.flipped) { G.flipped = true; award('flip', 40); badge('flipper'); confetti(130); renderSteps(); } }
        const rows = cs.sort((a, b) => a.x - b.x);
        q('cx').innerHTML = '<tr><th>' + esc(t('thAlts')) + '</th><th>' + esc(t('rawX')) + '</th><th>' + esc(t('normalized')) + '</th><th>' + esc(t('score')) + '</th><th>' + esc(t('typeH')) + '</th></tr>' +
          (rows.length ? rows.map(c => `<tr><td>${esc(aName(c.a))} × ${esc(aName(c.b))}</td><td>${f(c.x)}</td><td>${f(100 * c.x / (Sx + c.x), 2)}%</td><td>${f(V(c.a, c.x))}</td><td>${c.sw ? esc(t('winSwitch')) : esc(t('rankCross'))}</td></tr>`).join('') : `<tr><td colspan=5>${esc(t('noCross'))}</td></tr>`);
        const sw = rows.filter(c => c.sw), w0 = win(0);
        q('sum').textContent = sw.length ? t('sumSw', { n: sw.length, m: xm, b: bx, w: aName(win(bx)), d: f(Math.min(...sw.map(c => Math.abs(c.x - bx)))) }) : t('sumStay', { w: aName(w0) });
      }
      function bind3() {
        if (!q('ch')) return;
        lastLeader = -1;
        sens(false);
      }
      function stageDone() {
        const lv = level();
        return `<div class="sd-pdone"><section class="sd-card sd-done">
  <div class="big">🏆</div><h2>${esc(t('doneH'))}</h2><p>${esc(t('doneT'))}</p>
  <div class="sd-hud2"><b>${esc(t('lvl', { n: lv }) + ' · ' + t('lv' + lv))}</b><span>${esc(t('doneXp', { n: G.xp }))}</span></div>
  <div class="sd-badges big">${BADGES.map(([id, ic]) => `<span class="bdg${G.badges[id] ? ' on' : ''}" title="${esc(t('bd_' + id))}">${ic}<small>${esc(t('b_' + id))}</small></span>`).join('')}</div>
  <div class="sd-foot c"><button type="button" data-act="back1">${esc(t('editModel'))}</button><button type="button" class="sd-cta ready" data-act="replay">${esc(t('replay'))}</button></div>
</section></div>`;
      }
      function bindDone() { confetti(150); }
      function replay() {
        S = BLANK(); G.xp = 0; G.stage = 0; G.pred = null; G.revealed = false; G.done = {}; G.badges = {}; G.flipped = false; G.k = null; G.drilled = null;
        renderHud(); go(0);
      }

      /* ---------- events ---------- */
      host.addEventListener('input', e => {
        const el = e.target, d = el.dataset;
        if (el.id === 'sl') { sens(true); return; }
        if (el.id === 'xm') { q('sl').max = Math.max(1, +el.value || 200); sens(true); return; }
        if (el.id === 'ax') { sens(true); return; }
        if (d.w !== undefined) S.attrs[d.w].w = parseFloat(el.value);
        else if (d.v !== undefined) { const [j, i] = d.v.split(','); S.m[j][i] = parseFloat(el.value); }
        else if (d.n !== undefined) S.alts[d.n] = el.value;
        else if (d.an !== undefined) S.attrs[d.an].n = el.value;
        else return;
        updateNorm(); updateChecklist();
      });
      host.addEventListener('change', e => {
        if (e.target.id === 'ks') { G.k = +e.target.value; const b = model(G.k).bx; q('sl').max = Math.max(1, +q('xm').value || 200); q('sl').value = Math.min(+q('sl').max, Math.round(b)); q('sdStage').querySelector('.goal').innerHTML = t('flipGoal', { a: esc(kName(G.k)) }); lastLeader = -1; sens(false); }
      });
      host.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b || !host.contains(b)) return;
        const d = b.dataset;
        if (d.act) {
          const a = d.act;
          if (a === 'back1') go(0); else if (a === 'back2') go(1); else if (a === 'go3') go(2);
          else if (a === 'reveal') reveal();
          else if (a === 'finish') { award('fin', 0); G.stage = 3; renderSteps(); renderStage(1); }
          else if (a === 'replay') replay();
          else if (ACT[a]) ACT[a]();
          return;
        }
        if (d.go !== undefined) { if (unlocked(+d.go)) go(+d.go); else { toast(t(+d.go === 1 ? 'lockHint' : 'revealFirst'), 'warn'); shake(b); } return; }
        if (d.dk !== undefined) { delAttr(+d.dk); return; }
        if (d.d !== undefined) { delAlt(+d.d); return; }
        if (d.pk !== undefined) { G.pred = +d.pk; host.querySelectorAll('.pk').forEach(x => x.classList.toggle('sel', x === b)); const r = q('rev'); r.classList.add('ready'); r.removeAttribute('aria-disabled'); return; }
        if (d.r !== undefined) { drill(+d.r); if (!G.done.drill) { award('drill', 15); badge('detective'); } return; }
      });

      api = {
        setTheme,
        redraw() { renderHud(); renderSteps(); renderStage(0); }
      };
      setTheme(MBALAB.theme && MBALAB.theme.isDay());
      renderHud(); renderSteps(); renderStage(0);
    },
    onShow() { api.setTheme(MBALAB.theme.isDay()); api.redraw(); },
    onLang() { api && api.redraw(); },
    onTheme(day) { api.setTheme(day); api.redraw(); }
  });
})();
