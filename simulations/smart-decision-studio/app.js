/* SMART Decision Studio: four guided parts.
   1 Build the model (table of alternatives x weighted attributes) -> 2 Ranking -> 3 Stress-test (sensitivity chart)
   -> 4 Conclusion written from the user's own model, with PDF / HTML / Markdown download.
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
      const G = { guide: null, seen: {}, focus: null, stage: 0, drilled: null, k: null, example: false, busy: false };

      /* ---------- small UI helpers ---------- */
      function toast(msg, kind, undo) {
        const el = document.createElement('div');
        el.className = 'sd-toast ' + (kind || '');
        el.innerHTML = '<span>' + esc(msg) + '</span>' + (undo ? `<button type="button">${esc(t('undo'))}</button>` : '');
        if (undo) el.querySelector('button').onclick = () => { undo(); el.remove(); };
        q('sdToasts').appendChild(el);
        while (q('sdToasts').children.length > 3) q('sdToasts').firstChild.remove();
        setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 350); }, undo ? 5500 : 2800);
      }
      function countUp(el, to, ms = 800) {
        if (reduced()) { el.textContent = f(to); return; }
        const t0 = performance.now();
        const step = now => { const p = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - p, 3); el.textContent = f(to * e); if (p < 1 && el.isConnected) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      }
      function shake(el) { if (!el) return; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }

      /* ---------- stepper ---------- */
      const unlocked = n => n === 0 || complete();
      function renderSteps() {
        q('sdSteps').innerHTML = [0, 1, 2, 3].map(n => {
          const st = G.stage === n ? 'active' : (unlocked(n) ? (n < G.stage ? 'done' : 'open') : 'locked');
          return `<li class="st ${st}"><button type="button" data-go="${n}" ${unlocked(n) ? '' : 'aria-disabled="true"'} ${G.stage === n ? 'aria-current="step"' : ''}>
            <span class="n">${n < G.stage && unlocked(n) ? '✓' : n + 1}</span><span class="l"><small>${esc(t('partN', { n: n + 1 }))}</small>${esc(t('stp' + (n + 1)))}</span></button></li>`;
        }).join('');
      }
      function go(n, anim = true) {
        if (n > 0 && !complete()) { toast(t('lockHint'), 'warn'); shake(q('next1')); return; }
        G.focus = null;
        const dir = n >= G.stage ? 1 : -1;
        G.stage = n; renderSteps(); renderStage(anim ? dir : 0);
        q('sdStage').scrollTop = 0;
      }
      function renderStage(dir) {
        const st = q('sdStage');
        st.innerHTML = [stage1, stage2, stage3, stage4][G.stage]();
        if (dir && !reduced()) st.firstElementChild.classList.add(dir > 0 ? 'in-r' : 'in-l');
        [bind1, bind2, bind3, bind4][G.stage]();
        const h = st.querySelector('.sd-h');
        if (h && G.stage < 4) h.insertAdjacentHTML('beforeend', `<button type="button" class="sd-info" data-info="${G.stage}" title="${esc(t('infoTip'))}" aria-label="${esc(t('infoTip'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7.6" r="1.3" fill="currentColor"/><path d="M12 11v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>`);
        if (!G.seen[G.stage] && !valid1only()) { G.seen[G.stage] = 1; showGuide(G.stage); }
        else if (G.guide != null) showGuide(G.guide);
      }
      const valid1only = () => G.stage > 1 && !complete();   // never pop a guide for a part that shows an error
      /* guide pop-up: auto-opens once per part, ⓘ reopens it */
      function showGuide(n) {
        G.guide = n;
        let el = q('sdGuide');
        if (!el) { el = document.createElement('div'); el.id = 'sdGuide'; el.className = 'sd-guide'; q('sd').appendChild(el); }
        const k = 'g' + (n + 1);
        const pts = [1, 2, 3].map(i => t(k + '_' + i)).map(x => `<li>${x}</li>`).join('');
        el.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="gdT"><button type="button" class="gx" data-gclose aria-label="${esc(t('close'))}">✕</button>
          <div class="gk">${esc(t('partN', { n: n + 1 }))} / 4</div><h3 id="gdT">${esc(t(k + '_t'))}</h3><ul>${pts}</ul>
          <p class="gtip"><b>💡 ${esc(t('tipLbl'))}:</b> ${t(k + '_tip')}</p><button type="button" class="sd-cta ready" data-gclose>${esc(t('gotIt'))}</button></div>`;
        el.hidden = false;
        const b = el.querySelector('.sd-cta'); if (b) b.focus({ preventScroll: true });
      }
      function closeGuide() { const el = q('sdGuide'); if (el) el.hidden = true; G.guide = null; }

      /* ---------- Part 1: build (spreadsheet-style table) ---------- */
      function stage1() {
        return `<div class="sd-p1">
  <section class="sd-card">
    <div class="sd-h"><h2>${esc(t('m1h'))}</h2><p>${esc(t('m1n'))}</p></div>
    <div class="sd-tools">
      <button type="button" data-act="addA">${esc(t('addA'))}</button>
      <button type="button" data-act="addK">${esc(t('addK'))}</button>
      <span class="grow"></span>
      <button type="button" class="ex${G.example ? '' : ' hot'}" data-act="example" title="${esc(t('exampleTip'))}">📋 ${esc(t('example'))}</button>
      <button type="button" data-act="reset" title="${esc(t('resetTip'))}">↺ ${esc(t('reset'))}</button>
    </div>
    <div class="sc"><table class="grid" id="mx"></table></div>
    <p class="warn" id="msg"></p>
    <p class="note" id="demoNote" ${G.example ? '' : 'hidden'}>${t('s1n')}</p>
  </section>
  <aside class="sd-card sd-quest">
    <h3>${esc(t('quest'))}</h3>
    <ul id="ck">${['ck1', 'ck2', 'ck3', 'ck4'].map(k => `<li data-c="${k}"><span class="bx">✓</span><span>${esc(t(k))}</span></li>`).join('')}</ul>
    <div class="sd-prog"><i id="ckBar"></i></div>
    <button type="button" class="sd-cta" id="next1" data-act="go2">${esc(t('next1'))}</button>
    <p class="note" id="lockHint">${esc(t('lockHint'))}</p>
  </aside>
</div>`;
      }
      function renderMx() {
        const N = S.attrs.length;
        let h = `<thead><tr><th class="corner" rowspan="2">${esc(t('tblCorner'))}</th><th class="grp" colspan="${N}">${esc(t('attrsGrp'))}</th><th class="act" rowspan="2"></th></tr><tr>` +
          S.attrs.map((a, i) => `<th class="ah"><span class="cell"><span class="dot" style="background:${COL[i % 8]}"></span><input class="nm" value="${esc(a.n)}" data-an="${i}" placeholder="${esc(t('phAttrIns', { n: i + 1 }))}" aria-label="${esc(t('phAttr'))} ${i + 1}"><button type="button" class="x" data-dk="${i}" title="${esc(t('delAttr'))}" aria-label="${esc(t('delAttr'))}">✕</button></span></th>`).join('') + '</tr></thead><tbody>';
        h += `<tr class="wr"><th scope="row">${esc(t('rawW'))}</th>` + S.attrs.map((a, i) => `<td><input type="number" min="0" value="${sv(a.w)}" placeholder="${esc(t('phNum'))}" data-w="${i}" aria-label="${esc(t('rawW'))} ${i + 1}"></td>`).join('') + '<td class="act"></td></tr>';
        h += `<tr class="nr"><th scope="row">${esc(t('normW'))}</th>` + S.attrs.map((a, i) => `<td data-nw="${i}"></td>`).join('') + '<td class="act"></td></tr>';
        h += `<tr class="gr"><th colspan="${N + 2}">${esc(t('rateGrp'))}</th></tr>`;
        S.alts.forEach((n, j) => {
          h += `<tr><th scope="row" class="an"><input class="nm" value="${esc(n)}" data-n="${j}" placeholder="${esc(t('phAltIns', { n: j + 1 }))}" aria-label="${esc(t('phAlt'))} ${j + 1}"></th>` +
            S.m[j].map((v, i) => `<td><input type="number" min="0" max="100" value="${sv(v)}" placeholder="${esc(t('phNum'))}" data-v="${j},${i}" aria-label="${esc(aName(j))} / ${esc(kName(i))}"></td>`).join('') +
            `<td class="act"><button type="button" class="x" data-d="${j}" title="${esc(t('delAlt'))}" aria-label="${esc(t('delAlt'))}">✕</button></td></tr>`;
        });
        q('mx').innerHTML = h + '</tbody>';
        updateNorm();
      }
      function updateNorm() {
        const T = totalW();
        host.querySelectorAll('[data-nw]').forEach(td => { const a = S.attrs[+td.dataset.nw]; td.textContent = T > 0 && Number.isFinite(a.w) ? f(a.w / T, 3) : '–'; });
        const m = q('msg'); if (m) m.textContent = '';
      }
      function updateChecklist() {
        if (G.stage !== 0) return;
        const c = checks(); let n = 0;
        Object.keys(c).forEach(k => {
          const li = host.querySelector(`#ck [data-c="${k}"]`); if (!li) return;
          if (c[k]) n++;
          const was = li.classList.contains('ok');
          li.classList.toggle('ok', c[k]);
          if (c[k] && !was) { li.classList.remove('pop'); void li.offsetWidth; li.classList.add('pop'); }
        });
        q('ckBar').style.width = n * 25 + '%';
        const b = q('next1'); b.classList.toggle('ready', n === 4); b.setAttribute('aria-disabled', n === 4 ? 'false' : 'true');
        q('lockHint').style.visibility = n === 4 ? 'hidden' : 'visible';
        renderSteps();
      }
      function bind1() { renderMx(); updateChecklist(); }
      function afterStruct(focusSel) { renderMx(); updateChecklist(); if (focusSel) { const el = host.querySelector(focusSel); if (el) el.focus(); } }
      const snapshotToast = (msg, snap) => toast(msg, '', () => { S = snap; afterStruct(); });
      const ACT = {
        addA() { if (S.alts.length >= MAXN) { toast(t('maxItems'), 'warn'); return; } S.alts.push(''); S.m.push(S.attrs.map(() => NaN)); afterStruct(`[data-n="${S.alts.length - 1}"]`); },
        addK() { if (S.attrs.length >= MAXN) { toast(t('maxItems'), 'warn'); return; } S.attrs.push({ n: '', w: NaN }); S.m.forEach(r => r.push(NaN)); afterStruct(`[data-an="${S.attrs.length - 1}"]`); },
        example() { const snap = clone(S); S = EX(); G.example = true; q('demoNote').hidden = false; host.querySelector('.ex').classList.remove('hot'); afterStruct(); snapshotToast(t('exLoaded'), snap); },
        reset() { const snap = clone(S); S.alts = S.alts.map(() => ''); S.attrs = S.attrs.map(() => ({ n: '', w: NaN })); S.m = S.m.map(r => r.map(() => NaN)); G.drilled = null; G.example = false; q('demoNote').hidden = true; afterStruct(); snapshotToast(t('cleared'), snap); },
        go2() { go(1); }
      };
      function delAlt(j) {
        if (S.alts.length <= 2) { toast(t('minAlts'), 'warn'); shake(host.querySelector(`[data-d="${j}"]`)); return; }
        const snap = clone(S), nm = aName(j); S.alts.splice(j, 1); S.m.splice(j, 1); afterStruct(); snapshotToast(t('removed', { n: nm }), snap);
      }
      function delAttr(i) {
        if (S.attrs.length <= 2) { toast(t('minAttrs'), 'warn'); shake(host.querySelector(`[data-dk="${i}"]`)); return; }
        const snap = clone(S), nm = kName(i); S.attrs.splice(i, 1); S.m.forEach(r => r.splice(i, 1)); afterStruct(); snapshotToast(t('removed', { n: nm }), snap);
      }

      /* ---------- Part 2: ranking ---------- */
      function stage2() {
        const r = ranked(), top = r[0].V, TW = totalW(), medal = ['🥇', '🥈', '🥉'];
        return `<div class="sd-p2"><section class="sd-card sd-rank">
  <div class="sd-h"><h2>${esc(t('m2h'))}</h2><p>${esc(t('rkHint'))}</p></div>
  <div class="sd-win"><span class="tro">🏆</span><div><small>${esc(t('winnerLbl'))}</small><b>${esc(r[0].n)}</b></div><strong data-to="${r[0].V}">0.00</strong></div>
  <div class="lgd">${S.attrs.map((a, i) => `<span><i style="background:${COL[i % 8]}"></i>${esc(kName(i))}</span>`).join('')}</div>
  <div class="rks">${r.map((x, k) => {
    const tie = (k === 0 && r[1] && Math.abs(r[1].V - top) < 1e-9) || (k > 0 && Math.abs(x.V - top) < 1e-9);
    return `<button type="button" class="rk${k === 0 ? ' top' : ''}${G.drilled === x.j ? ' sel' : ''}" data-r="${x.j}" style="--d:${k * 80}ms">
      <span class="med">${tie ? '=1' : (medal[k] || k + 1)}</span><span class="nm">${esc(x.n)}<svg class="srch" viewBox="0 0 24 24" aria-hidden="true"><title>${esc(t('srchTip'))}</title><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></span>
      <span class="bw"><span class="bs">${S.attrs.map((a, i) => `<i data-w="${a.w / TW * S.m[x.j][i]}" style="background:${COL[i % 8]}"></i>`).join('')}</span></span>
      <b class="val" data-to="${x.V}">0.00</b><span class="vs">${f(x.V - top)}</span></button>`;
  }).join('')}</div>
  <p class="brk-hint">${esc(t('brkHint'))}</p><div class="sd-drill" id="drill" aria-live="polite"></div>
  <details class="sd-more"><summary>${esc(t('moreInfo'))}</summary><p class="note">${t('s2n')}</p></details>
  <div class="sd-foot"><button type="button" data-act="back1">${esc(t('back'))}</button><span class="grow"></span><button type="button" class="sd-cta ready" data-act="go3">${esc(t('next2'))}</button></div>
</section></div>`;
      }
      function drill(j) {
        const T = totalW(); G.drilled = j;
        host.querySelectorAll('.rk').forEach(b => b.classList.toggle('sel', +b.dataset.r === j));
        q('drill').innerHTML = `<h4>${esc(t('breakdown', { a: aName(j) }))}</h4>` + S.attrs.map((a, i) => {
          const c = a.w / T * S.m[j][i];
          return `<div class="dr"><span class="dnm"><i style="background:${COL[i % 8]}"></i>${esc(kName(i))}</span><span class="db"><i style="width:${Math.min(100, c)}%;background:${COL[i % 8]}"></i></span><code>${f(a.w / T, 4)} × ${S.m[j][i]} = ${f(c)}</code></div>`;
        }).join('') ;
      }
      function bind2() {
        host.querySelectorAll('.bs i').forEach(i => { i.style.width = '0'; });
        requestAnimationFrame(() => requestAnimationFrame(() => host.querySelectorAll('.bs i').forEach(i => { i.style.width = Math.min(100, +i.dataset.w) + '%'; })));
        host.querySelectorAll('[data-to]').forEach(el => countUp(el, +el.dataset.to));
        if (G.drilled == null || G.drilled >= S.alts.length) G.drilled = ranked()[0].j;
        drill(G.drilled);
      }

      /* ---------- Part 3: sensitivity ---------- */
      function model(k) {
        const Wt = S.attrs.map(a => a.w), n = S.alts.length;
        const Sx = Wt.reduce((a, b, i) => i == k ? a : a + b, 0);
        const A = S.m.map(r => r.reduce((s, v, i) => i == k ? s : s + Wt[i] * v, 0)), vk = S.m.map(r => r[k]);
        const V = (j, x) => (Sx + x > 0) ? (A[j] + x * vk[j]) / (Sx + x) : NaN;
        const win = x => { let b = 0; for (let j = 1; j < n; j++) if (V(j, x) > V(b, x) + 1e-9) b = j; return b; };
        return { Wt, n, Sx, A, vk, V, win, bx: Wt[k] };
      }
      function crossovers(M, xm) {
        const cs = [];
        for (let a = 0; a < M.n; a++) for (let b = a + 1; b < M.n; b++) { const d = M.vk[a] - M.vk[b]; if (Math.abs(d) < 1e-12) continue; const x = (M.A[b] - M.A[a]) / d; if (x >= 0 && x <= xm) cs.push({ a, b, x }); }
        cs.forEach(c => { const eps = Math.max(1e-6, xm * 1e-6); c.lo = M.win(Math.max(0, c.x - eps)); c.hi = M.win(c.x + eps); c.sw = c.lo != c.hi; });
        return cs.sort((a, b) => a.x - b.x);
      }
      const pct = (M, x) => (M.Sx + x > 0 ? x / (M.Sx + x) : 0); // normalized weight, 0..1
      const flips = (k, xm) => { const m = model(k), b = m.win(m.bx); for (let s = 0; s <= 200; s++) if (m.win(xm * s / 200) !== b) return true; return false; };

      /* chart: mode "screen" uses theme variables, "report" uses fixed print colours */
      function chartSVG(k, xm, norm, cx, mode, focus) {
        const M = model(k), { n, Sx, A, vk, V } = M, rep = mode === 'report';
        const C = rep ? { mut: '#64748b', line: '#e2e8f0', red: '#dc2626', teal: '#0d9488', org: '#ea580c', txt: '#0f172a' } : { mut: 'var(--mut)', line: 'var(--line)', red: 'var(--red)', teal: 'var(--teal)', org: 'var(--org)', txt: 'var(--ink)' };
        const pal = rep ? DAYC : COL;
        const xp = x => norm ? pct(M, x) : x;
        const X0 = xp(0), X1 = xp(xm), px = x => 56 + 614 * (xp(x) - X0) / ((X1 - X0) || 1), py = v => 300 - 270 * v / 100;
        let g = `<line x1=56 y1=300 x2=670 y2=300 stroke="${C.mut}"/><line x1=56 y1=30 x2=56 y2=300 stroke="${C.mut}"/>`;
        for (let v = 0; v <= 100; v += 25) g += `<text x=48 y=${py(v) + 4} text-anchor=end font-size=11 fill="${C.mut}">${v}</text><line x1=56 x2=670 y1=${py(v)} y2=${py(v)} stroke="${C.line}"/>`;
        for (let s = 0; s <= 4; s++) { const x = xm * s / 4; g += `<text x=${px(x)} y=318 text-anchor=middle font-size=11 fill="${C.mut}">${norm ? f(xp(x), 2) : f(x, 0)}</text>`; }
        g += `<text x=363 y=343 text-anchor=middle font-size=12 fill="${C.mut}">${esc(norm ? t('axisNorm', { a: kName(k) }) : t('axisRaw', { a: kName(k) }))}</text>`;
        g += `<text transform="rotate(-90 14 165)" x=14 y=165 text-anchor=middle font-size=12 fill="${C.mut}">${esc(t('yAxis'))}</text>`;
        const cs = crossovers(M, xm);
        cs.filter(c => c.sw).forEach(c => g += `<line x1=${px(c.x)} x2=${px(c.x)} y1=30 y2=300 stroke="${C.red}" stroke-dasharray="5 4"/>`);
        cs.filter(c => !c.sw).forEach(c => g += `<line x1=${px(c.x)} x2=${px(c.x)} y1=200 y2=300 stroke="${C.mut}" stroke-dasharray="2 4" opacity=.5 />`);
        for (let j = 0; j < n; j++) {
          let d = ''; for (let s = 0; s <= 160; s++) { const x = xm * s / 160; d += (s ? 'L' : 'M') + px(x) + ',' + py(V(j, x)); }
          const dim = focus && focus.j !== j, on = focus && focus.j === j;
          g += `<path d="${d}" fill="none" stroke="${pal[j % 8]}" stroke-width=${on ? 4.6 : 2.6} opacity=${dim ? .22 : 1} /><text x=${Math.min(px(xm) - 2, 668)} y=${py(V(j, xm)) - 4} text-anchor=end font-size=10.5 fill="${pal[j % 8]}" opacity=${dim ? .3 : 1}>${esc(aName(j))}</text>`;
          if (!rep) g += `<path class="hit" data-j="${j}" d="${d}" fill="none" stroke="transparent" stroke-width="16" style="pointer-events:stroke;cursor:pointer"><title>${esc(aName(j))}</title></path>`;
        }
        if (focus && !rep) { const fx = Math.min(xm, focus.x); g += `<circle cx=${px(fx)} cy=${py(V(focus.j, fx))} r=6.5 fill="${pal[focus.j % 8]}" stroke="#fff" stroke-width=2 style="pointer-events:none" />`; }
        if (M.bx <= xm) g += `<line x1=${px(M.bx)} x2=${px(M.bx)} y1=30 y2=300 stroke="${C.teal}" stroke-width=2 /><text x=${px(M.bx) + 4} y=42 font-size=11 fill="${C.teal}">${esc(t('base'))}</text>`;
        if (cx != null) g += `<line x1=${px(cx)} x2=${px(cx)} y1=30 y2=300 stroke="${C.org}" stroke-width=2 />`;
        return g;
      }
      function stage3() {
        if (valid()) return '<div class="sd-p3"><section class="sd-card"><p class="warn">' + esc(valid()) + '</p><div class="sd-foot"><button type="button" data-act="back1">' + esc(t('back')) + '</button></div></section></div>';
        if (G.k == null || G.k >= S.attrs.length) { const i = S.attrs.findIndex((a, i) => flips(i, 200)); G.k = i < 0 ? 0 : i; }
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
  <h3 class="chT" id="chT"></h3>
  <p class="note chhint">${esc(t('pvHint'))}</p>
  <div class="chw"><svg id="ch" viewBox="0 0 700 352" role="img"></svg><div class="pv" id="pv" hidden></div></div>
  <details class="sd-more"><summary>${esc(t('moreInfo'))}</summary><p class="note">${t('s3n')}</p><div class="sc"><table id="cx"></table></div><p id="sum" class="note"></p></details>
  <div class="sd-foot"><button type="button" data-act="back2">${esc(t('back'))}</button><span class="grow"></span><button type="button" class="sd-cta ready" data-act="go4">${esc(t('next3'))}</button></div>
</section></div>`;
      }
      /* click a line in the chart: highlight it and show its data in a pop-up */
      function focusLine(j, e) {
        const k = G.k, xm = Math.max(1, +q('xm').value || 200), M = model(k), norm = q('ax').value === 'norm', svg = q('ch');
        const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        const p = pt.matrixTransform(svg.getScreenCTM().inverse()), u = Math.min(1, Math.max(0, (p.x - 56) / 614));
        let x = xm * u;
        if (norm) { const pv = pct(M, xm) * u; x = pv >= 1 ? xm : (M.Sx > 0 ? pv * M.Sx / (1 - pv) : 0); }
        const r = svg.parentNode.getBoundingClientRect();
        G.focus = { j, x: Math.round(x * 10) / 10, left: e.clientX - r.left + 14, top: e.clientY - r.top + 10 };
        sens();
      }
      function closeFocus() { if (G.focus) { G.focus = null; sens(); } }
      function renderPop() {
        const el = q('pv'); if (!el) return;
        if (!G.focus) { el.hidden = true; return; }
        const { j, x } = G.focus, k = G.k, M = model(k), n = M.n, norm = q('ax').value === 'norm';
        const order = [...Array(n).keys()].sort((a, b) => M.V(b, x) - M.V(a, x));
        const row = (l, v) => `<div class="pr"><span>${l}</span><b>${v}</b></div>`;
        el.innerHTML = `<div class="ph"><i style="background:${COL[j % 8]}"></i><b>${esc(aName(j))}</b><button type="button" class="pvx" aria-label="${esc(t('close'))}">✕</button></div>` +
          row(esc(t('pvX', { a: kName(k) })), `${f(x, 1)} (w = ${f(pct(M, x), 3)})`) +
          row(esc(t('pvScore')), f(M.V(j, x))) + row(esc(t('pvBase')), f(M.V(j, M.bx))) +
          row(esc(t('pvRank')), `${order.indexOf(j) + 1} / ${n}`) + row(esc(t('pvRating', { a: kName(k) })), M.vk[j]) +
          row(esc(t('pvLeader')), esc(aName(order[0])));
        el.hidden = false;
        const W = el.parentNode.clientWidth, w = el.offsetWidth;
        el.style.left = Math.max(6, Math.min(G.focus.left, W - w - 6)) + 'px';
        el.style.top = Math.max(6, G.focus.top) + 'px';
      }
      let lastLeader = -1;
      function sens() {
        if (valid() || !q('ch')) return;
        const k = G.k, xm = Math.max(1, +q('xm').value || 200), M = model(k), { n, Sx, V, win } = M, norm = q('ax').value === 'norm', cx = +q('sl').value;
        q('chT').textContent = t('chartTitle', { a: kName(k) });
        q('ch').innerHTML = chartSVG(k, xm, norm, cx, 'screen', G.focus);
        renderPop();
        const o = [...Array(n).keys()].sort((a, b) => V(b, cx) - V(a, cx)), lead = o[0], baseLead = win(M.bx), can = flips(k, xm), isFlip = lead !== baseLead;
        const ld = q('ldr');
        ld.className = 'ldr' + (isFlip ? ' flip' : '');
        ld.innerHTML = `<div class="who"><small>${esc(t('leader'))}</small><b style="color:${COL[lead % 8]}">${esc(aName(lead))}</b><span>${f(V(lead, cx))}</span></div>
          <div class="msg"><span class="x">x = ${cx} (w = ${f(pct(M, cx), 3)})</span><span class="st">${isFlip ? '🌀 ' + esc(t('flipped')) : esc(can ? t('flipHint') : t('noFlip'))}</span></div>`;
        if (lead !== lastLeader) { ld.firstElementChild.classList.remove('pop'); void ld.offsetWidth; ld.firstElementChild.classList.add('pop'); lastLeader = lead; }
        const rows = crossovers(M, xm);
        q('cx').innerHTML = '<tr><th>' + esc(t('thAlts')) + '</th><th>' + esc(t('rawX')) + '</th><th>' + esc(t('normalized')) + '</th><th>' + esc(t('score')) + '</th><th>' + esc(t('typeH')) + '</th></tr>' +
          (rows.length ? rows.map(c => `<tr><td>${esc(aName(c.a))} × ${esc(aName(c.b))}</td><td>${f(c.x)}</td><td>${f(pct(M, c.x), 3)}</td><td>${f(V(c.a, c.x))}</td><td>${c.sw ? esc(t('winSwitch')) : esc(t('rankCross'))}</td></tr>`).join('') : `<tr><td colspan=5>${esc(t('noCross'))}</td></tr>`);
        const sw = rows.filter(c => c.sw);
        q('sum').textContent = sw.length ? t('sumSw', { n: sw.length, m: xm, b: M.bx, w: aName(win(M.bx)), d: f(Math.min(...sw.map(c => Math.abs(c.x - M.bx)))) }) : t('sumStay', { w: aName(win(0)) });
      }
      function bind3() { if (!q('ch')) return; lastLeader = -1; sens(); }

      /* ---------- Part 4: conclusion built from the user's model ---------- */
      function analyze() {
        const r = ranked(), T = totalW(), w = r[0], w2 = r[1], tie = Math.abs(w.V - w2.V) < 1e-9;
        const contrib = S.attrs.map((a, i) => ({ i, c: a.w / T * S.m[w.j][i] })).sort((a, b) => b.c - a.c);
        const attrs = S.attrs.map((a, k) => {
          const M = model(k), xm = Math.max(200, Math.round(5 * M.bx)), baseW = M.win(M.bx), pb = pct(M, M.bx);
          const sw = crossovers(M, xm).filter(c => c.sw && Math.abs(c.x - M.bx) > 1e-9);
          let best = null;
          sw.forEach(c => { if (!best || Math.abs(c.x - M.bx) < Math.abs(best.x - M.bx)) best = c; });
          let info = { k, pb, pctBase: pb, sw: null };
          if (best) { const to = best.x > M.bx ? best.hi : best.lo; info.sw = { x: best.x, p: pct(M, best.x), to, diff: Math.abs(pct(M, best.x) - pb) }; }
          return info;
        });
        const flipping = attrs.filter(a => a.sw), most = flipping.slice().sort((a, b) => a.sw.diff - b.sw.diff)[0] || null;
        const lvl = !most ? 'None' : most.sw.diff < 0.05 ? 'High' : most.sw.diff < 0.15 ? 'Mid' : 'Low';
        return { r, w, w2, tie, contrib, attrs, flipping, most, lvl };
      }
      /* conclusion as bullet points: [{ t: html, sub: [html...] }] */
      function conclusionItems(A) {
        const L = [];
        if (A.tie) L.push({ t: t('p_tie', { w: esc(A.w.n), w2: esc(A.w2.n), s: f(A.w.V) }) });
        else { L.push({ t: t('p_win', { w: esc(A.w.n), s: f(A.w.V) }) }); L.push({ t: t('p_gap', { w2: esc(A.w2.n), s2: f(A.w2.V), d: f(A.w.V - A.w2.V) }) }); }
        L.push({ t: t('p_why', { a1: esc(kName(A.contrib[0].i)), c1: f(A.contrib[0].c), a2: esc(kName(A.contrib[1].i)), c2: f(A.contrib[1].c) }) });
        if (A.most) L.push({ t: t('p_n', { n: A.flipping.length, t: S.attrs.length }), sub: [t('p_most', { a: esc(kName(A.most.k)), b: f(A.most.pb, 3), p: f(A.most.sw.p, 3) }), t('p_takes', { w: esc(aName(A.most.sw.to)) }), t('p_lvl', { l: t('sens' + A.lvl) })] });
        else L.push({ t: t('p_none') });
        return L;
      }
      const itemsHTML = L => '<ul class="pts">' + L.map(i => `<li>${i.t}${i.sub ? '<ul>' + i.sub.map(x => `<li>${x}</li>`).join('') + '</ul>' : ''}</li>`).join('') + '</ul>';
      const itemsMD = L => L.flatMap(i => ['- ' + mdb(i.t), ...(i.sub || []).map(x => '  - ' + mdb(x))]);
      function sensRows(A) {
        return A.attrs.map(a => ({ name: kName(a.k), base: f(a.pb, 3), sw: a.sw ? f(a.sw.p, 3) : '–', to: a.sw ? aName(a.sw.to) : t('noSwitch') }));
      }
      function stage4() {
        if (valid()) return stage3();
        const A = analyze(), SR = sensRows(A);
        return `<div class="sd-p4"><section class="sd-card sd-concl">
  <div class="sd-h"><h2>${esc(t('m4h'))}</h2></div>
  <div class="sd-win"><span class="tro">🏆</span><div><small>${esc(t('winnerLbl'))}</small><b>${esc(A.w.n)}</b></div><strong>${f(A.w.V)}</strong></div>
  <div class="cl">${itemsHTML(conclusionItems(A))}<p class="note">${esc(t('c_note'))}</p></div>
  <div class="cols">
    <div><h4>${esc(t('r2'))}</h4><div class="sc"><table class="mini l2"><tr><th>${esc(t('rank'))}</th><th>${esc(t('thAlt'))}</th><th>${esc(t('score'))}</th></tr>${A.r.map((x, k) => `<tr><td>${k + 1}</td><td>${esc(x.n)}</td><td>${f(x.V)}</td></tr>`).join('')}</table></div></div>
    <div><h4>${esc(t('r3'))}</h4><div class="sc"><table class="mini"><tr><th>${esc(t('thAttr'))}</th><th>${esc(t('thBase'))}</th><th>${esc(t('thSwitch'))}</th><th>${esc(t('thTakes'))}</th></tr>${SR.map(s => `<tr><td>${esc(s.name)}</td><td>${s.base}</td><td>${s.sw}</td><td>${esc(s.to)}</td></tr>`).join('')}</table></div></div>
  </div>
  <div class="sd-dl"><h4>⬇ ${esc(t('dl'))}</h4><div class="row">
    <button type="button" data-dl="pdf">PDF</button><button type="button" data-dl="html">HTML</button><button type="button" data-dl="md">Markdown</button></div></div>
  <div class="sd-foot"><button type="button" data-act="back3">${esc(t('back'))}</button><span class="grow"></span><button type="button" data-act="newmodel">${esc(t('newModel'))}</button></div>
</section></div>`;
      }
      function bind4() {}

      /* ---------- report (HTML / Markdown / PDF) ---------- */
      const plain = s => String(s).replace(/<b>(.*?)<\/b>/g, '$1').replace(/<[^>]+>/g, '');
      const mdb = s => String(s).replace(/<b>(.*?)<\/b>/g, '**$1**').replace(/<[^>]+>/g, '');
      const mdc = s => String(s).replace(/\|/g, '\\|');
      const dateStr = () => new Date().toLocaleDateString(MBALAB.i18n.get(), { year: 'numeric', month: 'long', day: 'numeric' });
      const REPORT_CSS = `.rp{width:794px;box-sizing:border-box;padding:0 44px;background:#fff;color:#0f172a;font:13px/1.5 system-ui,-apple-system,"Segoe UI","Noto Sans","Noto Sans CJK JP","Noto Sans CJK SC",sans-serif;position:relative}
.rp *{box-sizing:border-box}.rp .blk{padding-bottom:18px}.rp h1{font-size:24px;margin:0 0 4px;color:#1e3a8a}.rp h2{font-size:16px;margin:0 0 8px;color:#1e3a8a;border-bottom:2px solid #c7d2fe;padding-bottom:4px}
.rp .sub{color:#64748b;margin:0}.rp table{border-collapse:collapse;width:100%;font-size:12px}.rp th,.rp td{border:1px solid #cbd5e1;padding:5px 8px;text-align:right}.rp th:first-child,.rp td:first-child{text-align:left}
.rp th{background:#eef2ff}.rp tr.sec th{background:#f8fafc;text-align:left;color:#475569;font-weight:600}.rp p{margin:6px 0}.rp .win{background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:8px 12px;margin:8px 0}
.rp .l2 th:nth-child(2),.rp .l2 td:nth-child(2){text-align:left}.rp ul{margin:6px 0 6px 18px;padding:0}.rp li{margin:3px 0}.rp .note{color:#64748b;font-size:11px}.rp svg{width:100%;height:auto;display:block;font-family:inherit}.rp h3{font-size:13px;margin:8px 0 4px}`;
      function reportBody() {
        const A = analyze(), SR = sensRows(A), T = totalW(), k = Math.min(G.k == null ? 0 : G.k, S.attrs.length - 1);
        const model1 = `<table><tr><th>${esc(t('tblCorner'))}</th>${S.attrs.map((a, i) => `<th>${esc(kName(i))}</th>`).join('')}</tr>
<tr><td><b>${esc(t('rawW'))}</b></td>${S.attrs.map(a => `<td>${a.w}</td>`).join('')}</tr>
<tr><td>${esc(t('normW'))}</td>${S.attrs.map(a => `<td>${f(a.w / T, 3)}</td>`).join('')}</tr>
<tr class="sec"><th colspan="${S.attrs.length + 1}">${esc(t('rateGrp'))}</th></tr>
${S.alts.map((n, j) => `<tr><td>${esc(aName(j))}</td>${S.m[j].map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</table>`;
        const rank2 = `<table class="l2"><tr><th>${esc(t('rank'))}</th><th>${esc(t('thAlt'))}</th><th>${esc(t('score'))}</th><th>${esc(t('vsLeader'))}</th></tr>${A.r.map((x, i) => `<tr><td>${i + 1}</td><td>${esc(x.n)}</td><td>${f(x.V)}</td><td>${f(x.V - A.r[0].V)}</td></tr>`).join('')}</table>`;
        const sens3 = `<table><tr><th>${esc(t('thAttr'))}</th><th>${esc(t('thBase'))}</th><th>${esc(t('thSwitch'))}</th><th>${esc(t('thTakes'))}</th></tr>${SR.map(s => `<tr><td>${esc(s.name)}</td><td>${s.base}</td><td>${s.sw}</td><td>${esc(s.to)}</td></tr>`).join('')}</table>`;
        const svg = `<h3>${esc(t('chartTitle', { a: kName(k) }))}</h3><svg viewBox="0 0 700 352" xmlns="http://www.w3.org/2000/svg">${chartSVG(k, 200, false, null, 'report')}</svg>`;
        return `<div class="blk"><h1>${esc(t('rTitle'))}</h1><p class="sub">SMART Decision Studio · MBA Lab · ${esc(t('rGen', { d: dateStr() }))}</p></div>
<div class="blk"><h2>${esc(t('r1'))}</h2>${model1}</div>
<div class="blk"><h2>${esc(t('r2'))}</h2>${rank2}</div>
<div class="blk"><h2>${esc(t('r3'))}</h2>${svg}</div>
<div class="blk">${sens3}</div>
<div class="blk"><h2>${esc(t('r4'))}</h2><div class="win">🏆 <b>${esc(A.w.n)}</b> · ${f(A.w.V)}</div>${itemsHTML(conclusionItems(A))}<p class="note">${esc(t('c_note'))}</p></div>`;
      }
      function reportHTML() {
        return `<!doctype html><html lang="${MBALAB.i18n.get()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(t('rTitle'))}</title><style>body{margin:0;background:#f1f5f9}.rp{margin:0 auto;box-shadow:0 0 0 1px #e2e8f0}@media print{body{background:#fff}.rp{box-shadow:none;width:auto}}${REPORT_CSS}</style></head><body><div class="rp">${reportBody()}</div></body></html>`;
      }
      function reportMD() {
        const A = analyze(), SR = sensRows(A), T = totalW(), L = [];
        L.push(`# ${t('rTitle')}`, '', `*SMART Decision Studio · MBA Lab · ${t('rGen', { d: dateStr() })}*`, '', `## ${t('r1')}`, '');
        L.push('| ' + [t('tblCorner'), ...S.attrs.map((a, i) => kName(i))].map(mdc).join(' | ') + ' |', '|' + Array(S.attrs.length + 1).fill('---').join('|') + '|');
        L.push('| ' + [`**${t('rawW')}**`, ...S.attrs.map(a => a.w)].join(' | ') + ' |', '| ' + [t('normW'), ...S.attrs.map(a => f(a.w / T, 3))].join(' | ') + ' |');
        S.alts.forEach((n, j) => L.push('| ' + [mdc(aName(j)), ...S.m[j]].join(' | ') + ' |'));
        L.push('', `${t('rateGrp')}.`, '', `## ${t('r2')}`, '', `| ${t('rank')} | ${t('thAlt')} | ${t('score')} | ${t('vsLeader')} |`, '|---|---|---|---|');
        A.r.forEach((x, i) => L.push(`| ${i + 1} | ${mdc(x.n)} | ${f(x.V)} | ${f(x.V - A.r[0].V)} |`));
        L.push('', `## ${t('r3')}`, '', `| ${t('thAttr')} | ${t('thBase')} | ${t('thSwitch')} | ${t('thTakes')} |`, '|---|---|---|---|');
        SR.forEach(s => L.push(`| ${mdc(s.name)} | ${s.base} | ${s.sw} | ${mdc(s.to)} |`));
        L.push('', `## ${t('r4')}`, '', ...itemsMD(conclusionItems(A)), '', `*${t('c_note')}*`);
        return L.join('\n');
      }
      async function reportPDF() {
        const W = 794, PH = 1123, M = 44, SC = 2, box = document.createElement('div');
        box.style.cssText = `position:fixed;left:-10000px;top:0;width:${W}px;pointer-events:none`;
        box.innerHTML = `<style>${REPORT_CSS}</style><div class="rp">${reportBody()}</div>`;
        document.body.appendChild(box);
        try {
          const rp = box.querySelector('.rp'); if (document.fonts && document.fonts.ready) await document.fonts.ready;
          const H = Math.ceil(rp.scrollHeight), blocks = [...rp.children].filter(c => c.classList.contains('blk')).map(b => ({ t: b.offsetTop, h: b.offsetHeight }));
          const avail = PH - 2 * M, pages = []; let cur = null;
          blocks.forEach(b => {
            if (b.h > avail) { if (cur) pages.push(cur), cur = null; for (let y = 0; y < b.h; y += avail) pages.push({ y0: b.t + y, y1: b.t + Math.min(b.h, y + avail) }); return; }
            if (!cur) cur = { y0: b.t, y1: b.t + b.h }; else if (b.t + b.h - cur.y0 <= avail) cur.y1 = b.t + b.h; else { pages.push(cur); cur = { y0: b.t, y1: b.t + b.h }; }
          });
          if (cur) pages.push(cur);
          const clone = box.cloneNode(true); clone.removeAttribute('style');
          const xml = new XMLSerializer().serializeToString(clone);
          const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><foreignObject x="0" y="0" width="${W}" height="${H}">${xml}</foreignObject></svg>`;
          const img = new Image();
          await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('render')); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
          const full = document.createElement('canvas'); full.width = W * SC; full.height = H * SC;
          const fx = full.getContext('2d'); fx.fillStyle = '#fff'; fx.fillRect(0, 0, full.width, full.height); fx.drawImage(img, 0, 0, W * SC, H * SC);
          const jpgs = pages.map(p => {
            const c = document.createElement('canvas'); c.width = W * SC; c.height = PH * SC;
            const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
            x.drawImage(full, 0, p.y0 * SC, W * SC, (p.y1 - p.y0) * SC, 0, M * SC, W * SC, (p.y1 - p.y0) * SC);
            const b64 = c.toDataURL('image/jpeg', 0.92).split(',')[1], bin = atob(b64), bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return { bytes, w: c.width, h: c.height };
          });
          return buildPdf(jpgs);
        } finally { box.remove(); }
      }
      function buildPdf(jpgs) {
        const enc = new TextEncoder(), parts = [], offs = []; let len = 0;
        const push = d => { const b = typeof d === 'string' ? enc.encode(d) : d; parts.push(b); len += b.length; };
        const obj = (n, fn) => { offs[n] = len; push(n + ' 0 obj\n'); fn(); push('\nendobj\n'); };
        push('%PDF-1.4\n');
        obj(1, () => push('<</Type/Catalog/Pages 2 0 R>>'));
        obj(2, () => push(`<</Type/Pages/Count ${jpgs.length}/Kids[${jpgs.map((_, i) => (3 + 3 * i) + ' 0 R').join(' ')}]>>`));
        jpgs.forEach((j, i) => {
          const p = 3 + 3 * i, c = p + 1, im = p + 2, st = 'q 595.28 0 0 841.89 0 0 cm /Im0 Do Q';
          obj(p, () => push(`<</Type/Page/Parent 2 0 R/MediaBox[0 0 595.28 841.89]/Resources<</XObject<</Im0 ${im} 0 R>>>>/Contents ${c} 0 R>>`));
          obj(c, () => push(`<</Length ${st.length}>>\nstream\n${st}\nendstream`));
          obj(im, () => { push(`<</Type/XObject/Subtype/Image/Width ${j.w}/Height ${j.h}/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ${j.bytes.length}>>\nstream\n`); push(j.bytes); push('\nendstream'); });
        });
        const n = 3 + 3 * jpgs.length, xr = len;
        push(`xref\n0 ${n}\n0000000000 65535 f \n` + Array.from({ length: n - 1 }, (_, i) => String(offs[i + 1]).padStart(10, '0') + ' 00000 n \n').join(''));
        push(`trailer\n<</Size ${n}/Root 1 0 R>>\nstartxref\n${xr}\n%%EOF`);
        const out = new Uint8Array(len); let o = 0; parts.forEach(b => { out.set(b, o); o += b.length; });
        return out;
      }
      async function saveFile(name, data, mime) {
        try {
          const dl = window.claude && claude.use ? await claude.use('downloads') : null;
          if (dl) { await dl.save({ filename: name, data }); toast(t('dlSaved'), 'xp'); return; }
        } catch (e) { if (e && e.code === 'declined') return; }
        const blob = data instanceof Blob ? data : new Blob([data], { type: mime });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); toast(t('dlSaved'), 'xp');
      }
      async function download(kind, btn) {
        if (G.busy || valid()) return;
        G.busy = true; const label = btn.textContent; btn.textContent = t('dlBusy'); btn.disabled = true;
        const base = t('fileName');
        try {
          if (kind === 'html') await saveFile(base + '.html', reportHTML(), 'text/html');
          else if (kind === 'md') await saveFile(base + '.md', reportMD(), 'text/markdown');
          else await saveFile(base + '.pdf', new Blob([await reportPDF()], { type: 'application/pdf' }), 'application/pdf');
        } catch (e) { console.warn('download failed', e); toast(t('dlFail'), 'warn'); }
        G.busy = false; btn.textContent = label; btn.disabled = false;
      }

      /* ---------- events ---------- */
      host.addEventListener('input', e => {
        const el = e.target, d = el.dataset;
        if (el.id === 'sl' || el.id === 'ax') { sens(); return; }
        if (el.id === 'xm') { q('sl').max = Math.max(1, +el.value || 200); sens(); return; }
        if (d.w !== undefined) S.attrs[d.w].w = parseFloat(el.value);
        else if (d.v !== undefined) { const [j, i] = d.v.split(','); S.m[j][i] = parseFloat(el.value); }
        else if (d.n !== undefined) S.alts[d.n] = el.value;
        else if (d.an !== undefined) S.attrs[d.an].n = el.value;
        else return;
        updateNorm(); updateChecklist();
      });
      host.addEventListener('change', e => {
        if (e.target.id === 'ks') { G.k = +e.target.value; G.focus = null; q('sl').max = Math.max(1, +q('xm').value || 200); q('sl').value = Math.min(+q('sl').max, Math.round(model(G.k).bx)); host.querySelector('.goal').innerHTML = t('flipGoal', { a: esc(kName(G.k)) }); lastLeader = -1; sens(); }
      });
      host.addEventListener('keydown', e => { if (e.key === 'Escape' && G.guide != null) { closeGuide(); e.stopPropagation(); } });
      host.addEventListener('click', e => {
        if (e.target.classList && e.target.classList.contains('sd-guide')) { closeGuide(); return; }
        const hit = e.target.closest('path.hit');
        if (hit) { focusLine(+hit.dataset.j, e); return; }
        if (e.target.closest('.pvx') || (e.target.closest('#ch') && !hit)) { closeFocus(); return; }
        const b = e.target.closest('button'); if (!b || !host.contains(b)) return;
        const d = b.dataset;
        if (d.gclose !== undefined) { closeGuide(); return; }
        if (d.info !== undefined) { showGuide(+d.info); return; }
        if (d.act) {
          const a = d.act;
          if (a === 'back1') go(0); else if (a === 'back2') go(1); else if (a === 'back3') go(2);
          else if (a === 'go3') go(2); else if (a === 'go4') go(3);
          else if (a === 'newmodel') { S = BLANK(); G.example = false; G.k = null; G.drilled = null; go(0); }
          else if (ACT[a]) ACT[a]();
          return;
        }
        if (d.dl) { download(d.dl, b); return; }
        if (d.go !== undefined) { if (unlocked(+d.go)) go(+d.go); else { toast(t('lockHint'), 'warn'); shake(b); } return; }
        if (d.dk !== undefined) { delAttr(+d.dk); return; }
        if (d.d !== undefined) { delAlt(+d.d); return; }
        if (d.r !== undefined) { drill(+d.r); }
      });

      /* tips for the assistant: state-based first, then general ones for the current part */
      function hints() {
        const c = checks(), st = [];
        if (G.stage === 0) {
          st.push(!c.ck1 ? 'as_alts' : !c.ck2 ? 'as_attrs' : !c.ck3 ? 'as_weights' : !c.ck4 ? 'as_ratings' : 'as_ready1');
          return { state: st, generic: ['as_1a', 'as_1b', 'as_1c'] };
        }
        return { state: [], generic: [['as_2a', 'as_2b', 'as_2c'], ['as_3a', 'as_3b', 'as_3c', 'as_3d'], ['as_4a', 'as_4b', 'as_4c']][G.stage - 1] || [] };
      }
      if (window.SmartAssistant) SmartAssistant.create(host, { hints });
      api = { setTheme, redraw() { renderSteps(); renderStage(0); } };
      setTheme(MBALAB.theme && MBALAB.theme.isDay());
      renderSteps(); renderStage(0);
    },
    onShow() { api.setTheme(MBALAB.theme.isDay()); api.redraw(); },
    onLang() { api && api.redraw(); },
    onTheme(day) { api.setTheme(day); api.redraw(); }
  });
})();
