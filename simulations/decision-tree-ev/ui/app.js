/* Decision Tree Calculator: case chips, tree drawing, editor, roll-back results, sensitivity chart, conclusion.
   All maths is in engine/engine.js (MBALAB.dt). Labels coming from presets are {en,id,ja,zh}; labels typed by the player are plain strings. */
MBALAB.sims.define('decision-tree-ev', {
  mount(host) {
    const E = MBALAB.dt, $ = s => host.querySelector(s), esc = MBALAB.util.esc, sfx = MBALAB.util.sfx;
    const RAV = [Infinity, 1500, 500], COLS = ['var(--cy)', 'var(--am)', 'var(--gn)', 'var(--mg)', 'var(--vi)', 'var(--rd)'];
    let cur = 'cafe', T = null, S = null, sel = null, ra = 0, hunch = null, sensEdge = null, sensX = null, step = 0, guideOpen = null; const seen = {};
    const nm = x => { const s = x && typeof x === 'object' ? tr(x) : (x == null ? '' : String(x)); return s.trim() || '—'; };
    const loc = () => ({ en: 'en-US', id: 'id-ID', ja: 'ja-JP', zh: 'zh-CN' }[LANG] || 'en-US');
    const fmt = x => Math.round(x).toLocaleString(loc());
    const sm = x => (x < -0.5 ? '−' : '') + fmt(Math.abs(x));
    const fs = x => (x < -0.5 ? '−' : x > 0.5 ? '+' : '') + fmt(Math.abs(x));
    const cut = (s, n) => s.length > n ? s.slice(0, n - 1) + '…' : s;
    const P = () => E.PRESETS.find(p => p.id === cur);
    const newB = () => ({ en: 'New branch', id: 'Cabang baru', ja: '新しい枝', zh: '新分支' });

    function load(id) {
      cur = id; ra = 0; T = P().build(); sel = null; hunch = null; sensEdge = null; sensX = null;
      const pe = E.probEdges(T); if (pe.length) sensEdge = pe[0].edge.id;
      renderAll();
    }
    function solve() { S = E.solveRA(T, RAV[ra]); }

    /* ---------- chips and story ---------- */
    function renderCases() {
      if (!$('#dtCases')) return;
      $('#dtCases').innerHTML = E.PRESETS.map(p => `<button type="button" role="radio" aria-checked="${p.id === cur}" class="dt-case ${p.id === cur ? 'on' : ''}" data-case="${p.id}"><span aria-hidden="true">${p.icon}</span>${esc(tr(p.name))}</button>`).join('');
    }
    function renderStory() {
      if (!$('#dtStory')) return;
      const p = P(); let h = `<p>${esc(tr(p.story))}</p>`;
      if (T.k === 'd' && T.kids.length > 1) {
        h += `<div class="dt-hunch"><b>${esc(t('dtHunchQ'))}</b>` + T.kids.map((e, i) => `<button type="button" class="dt-chip ${hunch === i ? 'on' : ''}" data-hunch="${i}">${esc(nm(e.l))}</button>`).join('') + '</div>';
        if (hunch != null && T.kids[hunch]) {
          const best = S.best[T.id], a = T.kids[hunch], b = T.kids[best], x = S.edge[a.id], y = S.edge[b.id];
          h += `<div class="dt-note ${hunch === best ? 'v3' : 'v1'}">${esc(hunch === best ? t('dtHit', { a: nm(a.l), v: sm(y) }) : t('dtMiss', { a: nm(a.l), x: sm(x), b: nm(b.l), y: sm(y), d: fmt(y - x) }))}</div>`;
        }
      }
      $('#dtStory').innerHTML = h;
    }

    /* ---------- tree drawing ---------- */
    function layout(t0) {
      let leaf = 0, depth = 0; const pos = {};
      (function go(n, d) {
        depth = Math.max(depth, d);
        if (!n.kids.length) { pos[n.id] = { x: d, y: leaf++ }; return; }
        n.kids.forEach(e => go(e.n, d + 1));
        pos[n.id] = { x: d, y: (pos[n.kids[0].n.id].y + pos[n.kids[n.kids.length - 1].n.id].y) / 2 };
      })(t0, 0);
      return { pos, leaves: leaf, depth };
    }
    function renderTree() {
      if (!$('#dtTree')) return;
      const { pos, leaves, depth } = layout(T), X0 = 40, CW = 214, RH = 70, Y0 = 46;
      const px = n => X0 + pos[n.id].x * CW, py = n => Y0 + pos[n.id].y * RH;
      const W = X0 + depth * CW + 180, H = Y0 + leaves * RH - 14, dim = new Set();
      (function mark(n, d) { if (d) dim.add(n.id); n.kids.forEach((e, i) => mark(e.n, d || (n.k === 'd' && S.best[n.id] !== i))); })(T, false);
      const K = Math.max(0.72, Math.min(1, ($('#dtTree').clientWidth || W) / W));
      let ed = '', nd = '';
      E.walk(T, n => {
        const x1 = px(n) + (n.k === 'd' ? 14 : 16), y1 = py(n);
        n.kids.forEach((e, i) => {
          const c = e.n, x2 = px(c) - 14, y2 = py(c), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          const best = n.k === 'd' && S.best[n.id] === i && !dim.has(n.id), isDim = dim.has(c.id);
          const sub = [n.k === 'c' ? Math.round(E.pOf(n)[i] * 1000) / 10 + '%' : '', +e.v ? fs(+e.v) : ''].filter(Boolean).join(' · ');
          ed += `<g class="dt-g ${isDim ? 'dim' : ''}"><path class="dt-ed ${best ? 'best' : ''}" d="M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}"/>` +
            `<text class="dt-el" data-nid="${c.id}" x="${x2 - 8}" y="${y2 - 8}" text-anchor="end">${esc(cut(nm(e.l), 22))}</text>` +
            (sub ? `<text class="dt-es ${+e.v < 0 && n.k !== 'c' ? 'dt-neg' : ''}" x="${x2 - 8}" y="${y2 + 15}" text-anchor="end">${esc(sub)}</text>` : '') +
            (n.k === 'd' && S.best[n.id] !== i ? `<text class="dt-cut" x="${x2 - 8}" y="${y2 + 32}" text-anchor="end">✂</text>` : '') + '</g>';
        });
      });
      E.walk(T, n => {
        const x = px(n), y = py(n), isSel = sel === n.id, cl = `dt-nd ${n.k} ${isSel ? 'sel' : ''}`;
        const shape = n.k === 'd' ? `<rect class="${cl}" data-nid="${n.id}" x="${x - 14}" y="${y - 14}" width="28" height="28" rx="5"/>`
          : n.k === 'c' ? `<circle class="${cl}" data-nid="${n.id}" cx="${x}" cy="${y}" r="16"/>`
          : `<polygon class="${cl}" data-nid="${n.id}" points="${x - 13},${y - 14} ${x + 15},${y} ${x - 13},${y + 14}"/>`;
        let lab = '';
        if (n.k === 'e') lab = `<text class="dt-pay ${+n.pay < 0 ? 'neg' : ''}" x="${x + 22}" y="${y + 5}">${esc(fs(+n.pay || 0))}</text>`;
        else lab = `<text class="dt-ev" x="${x}" y="${y - 24}" text-anchor="middle">${esc(fmt(S.ev[n.id]))}</text><text class="dt-es" x="${x}" y="${y + 33}" text-anchor="middle">${esc(cut(nm(n.n), 18))}</text>`;
        nd += `<g class="dt-g ${dim.has(n.id) ? 'dim' : ''}">${shape}${lab}</g>`;
      });
      $('#dtTree').innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="width:${Math.round(W * K)}px;height:${Math.round(H * K)}px" role="img" aria-label="${esc(nm(P().name))}">${ed}${nd}</svg>`;
    }
    function renderLegend() {
      if (!$('#dtLegend')) return;
      const sh = { d: '<svg viewBox="0 0 18 18"><rect x="2" y="2" width="14" height="14" rx="3" class="dt-nd d"/></svg>', c: '<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="7" class="dt-nd c"/></svg>', e: '<svg viewBox="0 0 18 18"><polygon points="3,2 16,9 3,16" class="dt-nd e"/></svg>' };
      $('#dtLegend').innerHTML = `<span>${sh.d}${esc(t('dtLegD'))}</span><span>${sh.c}${esc(t('dtLegC'))}</span><span>${sh.e}${esc(t('dtLegE'))}</span><span>${esc(t('dtLegB'))}</span>`;
    }

    /* ---------- editor ---------- */
    function renderInsp() {
      const box = $('#dtInsp'); if (!box) return; const f = sel && E.find(T, sel);
      if (!f) { box.innerHTML = `<h3>${esc(t('dtInspH'))}</h3><p class="note">${esc(t('dtInspNone'))}</p><button type="button" data-reset>${esc(t('dtReset'))}</button>`; return; }
      const n = f.node, par = f.parent, e = f.edge; let h = `<h3>${esc(t('dtInspH'))}</h3>`;
      if (par) {
        h += `<div class="dt-sec"><b>${esc(t('dtBranch'))}</b><label>${esc(t('dtBL'))}<input data-f="el" value="${esc(nm(e.l) === '—' ? '' : nm(e.l))}"></label>` +
          `<label>${esc(t('dtBV'))}<input data-f="ev" type="number" step="10" value="${+e.v || 0}"></label>`;
        if (par.k === 'c') h += `<label>${esc(t('dtBP'))}<input data-f="ep" type="number" min="0" max="100" step="1" value="${Math.round((+e.p || 0) * 1000) / 10}"></label><button type="button" data-bal="${par.id}">${esc(t('dtBal'))}</button>`;
        h += '</div>';
      }
      h += `<div class="dt-sec"><b>${esc(t('dtNode'))}</b>`;
      if (n.k !== 'e') h += `<label>${esc(t('dtName'))}<input data-f="nn" value="${esc(nm(n.n) === '—' ? '' : nm(n.n))}"></label>`;
      h += `<div class="dt-type" role="group" aria-label="${esc(t('dtType'))}">` + ['d', 'c', 'e'].map(k => `<button type="button" data-type="${k}" class="${n.k === k ? 'on' : ''}">${esc(t('dt' + k.toUpperCase()))}</button>`).join('') + '</div>';
      if (n.k === 'e') h += `<label>${esc(t('dtPay'))}<input data-f="np" type="number" step="10" value="${+n.pay || 0}"></label>`;
      else h += `<button type="button" data-add>${esc(t('dtAdd'))}</button>`;
      if (par) h += `<button type="button" data-del>${esc(t('dtDel'))}</button>`;
      h += '</div>'; box.innerHTML = h;
    }
    function setType(n, k) {
      if (n.k === k) return;
      if (k === 'e') { n.kids = []; n.pay = n.pay || 0; }
      else if (!n.kids.length) { n.kids = [E.edge(newB(), E.end('', 0), { p: 0.5 }), E.edge(newB(), E.end('', 0), { p: 0.5 })]; }
      if (k === 'c' && n.kids.some(e => !isFinite(+e.p))) n.kids.forEach(e => { e.p = 1 / n.kids.length; });
      n.k = k;
    }
    host.addEventListener('input', ev => {
      const el = ev.target.closest('[data-f]'); if (!el || !sel) return; const f = E.find(T, sel); if (!f) return;
      const k = el.dataset.f, v = el.value, num = isFinite(parseFloat(v)) ? parseFloat(v) : 0;
      if (k === 'el') f.edge.l = v; else if (k === 'ev') f.edge.v = num; else if (k === 'ep') f.edge.p = Math.max(0, Math.min(100, num)) / 100;
      else if (k === 'nn') f.node.n = v; else if (k === 'np') f.node.pay = num;
      refresh(); renderSensDefer();
    });
    let sensT = 0; const renderSensDefer = () => { clearTimeout(sensT); sensT = setTimeout(() => { if (host.isConnected) { renderSens(); } }, 150); };

    /* ---------- results ---------- */
    function renderRes() {
      if (!$('#dtRes')) return;
      const issues = E.validate(T), pr = E.profile(T, S), plan = E.plan(T, S), neutral = !isFinite(RAV[ra]);
      const ev = neutral ? E.evpi(T, S) : null;
      let h = `<h2 class="dt-h">${esc(t('dtRes'))}</h2>`;
      if (issues.length) h += '<ul class="dt-issues">' + issues.slice(0, 4).map(i => { const f = E.find(T, i.id), n = nm(f.node.n); return `<li>${esc(i.code === 'psum' ? t('dtIssP', { n, s: Math.round(i.s * 1000) / 10 }) : i.code === 'one' ? t('dtIssO', { n }) : t('dtIssE', { n }))}</li>`; }).join('') + '</ul>';
      if (T.k === 'd' && T.kids.length) {
        const vals = T.kids.map(e => S.edge[e.id]), mx = Math.max(1, ...vals.map(Math.abs)), best = S.best[T.id];
        h += `<h3 class="dt-h" style="font-size:15.5px">${esc(t(neutral ? 'dtOpt' : 'dtOptCE'))}</h3><div class="dt-bars">` + T.kids.map((e, i) => {
          const v = vals[i], w = Math.abs(v) / mx * 50, left = v >= 0 ? 50 : 50 - w;
          return `<div class="dt-bar ${i === best ? 'best' : ''} ${v < 0 ? 'neg' : ''}"><span>${esc(nm(e.l))}${i === best ? ' ★' : ''}</span><div class="tr"><i class="z" style="left:50%"></i><i class="f" style="left:${left}%;width:${w}%"></i></div><b>${esc(fs(v))}</b></div>`;
        }).join('') + '</div>';
      }
      h += `<div class="dt-kpis"><div><small>${esc(t('dtVal'))}</small><b>${esc(t('dtMoney', { v: sm(S.ev[T.id]) }))}</b></div><div><small>${esc(t('dtWorst'))}</small><b class="${pr.min < 0 ? 'dt-neg' : ''}">${esc(fs(pr.min))}</b></div><div><small>${esc(t('dtBestC'))}</small><b>${esc(fs(pr.max))}</b></div><div><small>${esc(t('dtLoss'))}</small><b>${Math.round(pr.pLoss * 100)}%</b></div>` +
        (ev != null ? `<div title="${esc(t('dtEvpiH'))}"><small>${esc(t('dtEvpi'))}</small><b>${esc(t('dtMoney', { v: fmt(ev) }))}</b></div>` : '') + '</div>';
      if (plan.length) h += `<div class="dt-note v3"><b>${esc(t('dtBestPlan'))}</b><br>` + plan.slice(0, 5).map(p => esc(t('dtAt', { d: nm(p.name), c: nm(p.choice) }))).join('<br>') + '</div>';
      h += `<div class="dt-ra"><b>${esc(t('dtRA'))}:</b>` + [0, 1, 2].map(i => `<button type="button" data-ra="${i}" class="${ra === i ? 'on' : ''}">${esc(t('dtRA' + i))}</button>`).join('') + `</div><p class="note">${esc(t('dtRAh'))}</p>`;
      $('#dtRes').innerHTML = h;
    }

    /* ---------- sensitivity ---------- */
    function renderSens() {
      const box = $('#dtSens'); if (!box) return; const pes = E.probEdges(T); let h = `<h2 class="dt-h">${esc(t('dtSens'))}</h2>`;
      if (!pes.length) { box.innerHTML = h + `<p class="note">${esc(t('dtSensNoC'))}</p>`; return; }
      if (!(T.k === 'd' && T.kids.length > 1)) { box.innerHTML = h + `<p class="note">${esc(t('dtSensNoD'))}</p>`; return; }
      if (!pes.some(x => x.edge.id === sensEdge)) sensEdge = pes[0].edge.id;
      const pe = pes.find(x => x.edge.id === sensEdge); if (sensX == null) sensX = Math.round(E.pOf(pe.parent)[pe.parent.kids.indexOf(pe.edge)] * 100);
      h += `<label class="dt-f"><span>${esc(t('dtSensPick'))}</span><select data-sens>` + pes.map(x => `<option value="${x.edge.id}" ${x.edge.id === sensEdge ? 'selected' : ''}>${esc(nm(x.parent.n))} → ${esc(nm(x.edge.l))}</option>`).join('') + '</select></label>' +
        `<div class="dt-f"><label><span id="dtSx1"></span><output id="dtSx2"></output></label><input type="range" min="0" max="100" step="1" value="${sensX}" data-sx></div><div id="dtSensDyn"></div>`;
      box.innerHTML = h; sensDyn();
    }
    function sensDyn() {
      const pes = E.probEdges(T), pe = pes.find(x => x.edge.id === sensEdge); if (!pe || !$('#dtSensDyn')) return;
      const base = Math.round(E.pOf(pe.parent)[pe.parent.kids.indexOf(pe.edge)] * 100);
      const sn = E.sens(T, sensEdge, 50, RAV[ra]), W = 640, H = 250, L = 56, R = 16, Tp = 14, B = 34;
      const all = sn.series.flat().concat([0]), lo = Math.min(...all), hi = Math.max(...all), span = hi - lo || 1;
      const X = x => L + x * (W - L - R), Y = v => Tp + (1 - (v - lo) / span) * (H - Tp - B);
      let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t('dtSens'))}">` + [0, 0.25, 0.5, 0.75, 1].map(x => `<line class="ax" x1="${X(x)}" x2="${X(x)}" y1="${Tp}" y2="${H - B}"/><text x="${X(x)}" y="${H - 14}" text-anchor="middle">${Math.round(x * 100)}%</text>`).join('') +
        [lo, (lo + hi) / 2, hi].map(v => `<line class="ax" x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${L - 6}" y="${Y(v) + 4}" text-anchor="end">${fmt(v)}</text>`).join('') +
        (lo < 0 && hi > 0 ? `<line x1="${L}" x2="${W - R}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--txt2)" stroke-dasharray="4 4"/>` : '');
      sn.series.forEach((s2, j) => { svg += `<polyline class="ln" style="stroke:${COLS[j % 6]}" points="${s2.map((v, i) => X(sn.xs[i]) + ',' + Y(v)).join(' ')}"/>`; });
      svg += `<line x1="${X(base / 100)}" x2="${X(base / 100)}" y1="${Tp}" y2="${H - B}" stroke="var(--mg)" stroke-dasharray="3 4" stroke-width="1.6"/><text x="${X(base / 100)}" y="${Tp + 10}" text-anchor="middle" style="fill:var(--mg)">${esc(t('dtNow'))}</text>`;
      svg += `<line x1="${X(sensX / 100)}" x2="${X(sensX / 100)}" y1="${Tp}" y2="${H - B}" stroke="var(--txt)" stroke-width="1.4"/>`;
      sn.cross.forEach(c => { const k = Math.round(c.x * 50), yv = (sn.series[c.to][k] + sn.series[c.from][k]) / 2; svg += `<circle cx="${X(c.x)}" cy="${Y(yv)}" r="5" fill="var(--rd)" stroke="var(--panel)" stroke-width="2"/>`; });
      svg += '</svg>';
      const sx = E.withP(T, sensEdge, sensX / 100), SS = E.solveRA(sx, RAV[ra]);
      $('#dtSx1').textContent = t('dtSensX', { p: sensX }); $('#dtSx2').textContent = nm(T.kids[SS.best[sx.id]].l) + ' ★';
      $('#dtSensDyn').innerHTML = `<div class="dt-chart">${svg}</div><div class="dt-leg">` + T.kids.map((e, j) => `<span><i style="background:${COLS[j % 6]}"></i>${esc(nm(e.l))}: ${esc(fs(SS.edge[sx.kids[j].id]))}</span>`).join('') + '</div>' +
        (sn.cross.length ? sn.cross.slice(0, 2).map(c => `<div class="dt-note v1">${esc(t('dtSensCross', { p: Math.round(c.x * 100), a: nm(T.kids[c.from].l), b: nm(T.kids[c.to].l) }))}</div>`).join('') : `<div class="dt-note v3">${esc(t('dtSensNone', { a: nm(T.kids[S.best[T.id]].l) }))}</div>`);
    }
    function summary() {
      const pr = E.profile(T, S), plan = E.plan(T, S), ev = !isFinite(RAV[ra]) ? E.evpi(T, S) : null, c = plan[0];
      const parts = [];
      if (c) parts.push(t('dtConc1', { c: nm(c.choice), v: sm(S.ev[T.id]) })); else parts.push(t('dtVal') + ': ' + fmt(S.ev[T.id]));
      if (plan.length > 1) parts.push(plan.slice(1, 4).map(p => t('dtAt', { d: nm(p.name), c: nm(p.choice) }) + (LANG === 'ja' || LANG === 'zh' ? '。' : '.')).join(' '));
      parts.push(t('dtConc2', { l: Math.round(pr.pLoss * 100), w: fs(pr.min), b: fs(pr.max) }));
      if (ev != null && ev > 0.5) parts.push(t('dtConc3', { e: fmt(ev) }));
      parts.push(t('dtConc4')); return parts;
    }
    function renderConc() {
      if (!$('#dtConc')) return; $('#dtConc').innerHTML = `<h2 class="dt-h">${esc(t('dtConc'))}</h2><div class="dt-conc">${summary().map(p => `<p>${esc(p)}</p>`).join('')}</div><button type="button" data-copy>${esc(t('dtCopy'))}</button>`; }

    /* ---------- SMART-style frame: stepper, required-to-continue checklist, guide pop-up, toasts, assistant ---------- */
    const checks = () => {
      const is = E.validate(T);
      return [
        { ck1: true, ck2: !(T.k === 'd' && T.kids.length > 1) || hunch != null },
        { ck3: T.k === 'd' && T.kids.length >= 2, ck4: !is.some(i => i.code === 'one' || i.code === 'empty'), ck5: !is.some(i => i.code === 'psum') }
      ];
    };
    const done = n => Object.values(checks()[n]).every(Boolean);
    const ready = () => done(0) && done(1);
    const unlocked = n => n === 0 || (n === 1 ? done(0) : ready());
    function toast(msg, kind) {
      const el = document.createElement('div'); el.className = 'sd-toast ' + (kind || ''); el.innerHTML = '<span>' + esc(msg) + '</span>';
      const box = $('#sdToasts'); if (!box) return; box.appendChild(el); while (box.children.length > 3) box.firstChild.remove();
      setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 350); }, 2800);
    }
    function shake(el) { if (!el) return; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
    function renderSteps() {
      $('#sdSteps').innerHTML = [0, 1, 2, 3].map(n => {
        const st = step === n ? 'active' : (unlocked(n) ? (n < step ? 'done' : 'open') : 'locked');
        return `<li class="st ${st}"><button type="button" data-go="${n}" ${unlocked(n) ? '' : 'aria-disabled="true"'} ${step === n ? 'aria-current="step"' : ''}><span class="n">${n < step && unlocked(n) ? '✓' : n + 1}</span><span class="l"><small>${esc(t('partN', { n: n + 1 }))}</small>${esc(t('dtStp' + (n + 1)))}</span></button></li>`;
      }).join('');
    }
    function showGuide(n) {
      guideOpen = n; let el = $('#sdGuide');
      if (!el) { el = document.createElement('div'); el.id = 'sdGuide'; el.className = 'sd-guide'; $('#sd').appendChild(el); }
      const k = 'dtG' + (n + 1);
      el.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="gdT"><button type="button" class="gx" data-gclose aria-label="${esc(t('close'))}">✕</button><div class="gk">${esc(t('partN', { n: n + 1 }))} / 4</div><h3 id="gdT">${esc(t(k + 't'))}</h3><ul><li>${esc(t(k + 'a'))}</li><li>${esc(t(k + 'b'))}</li></ul><p class="gtip"><b>💡 ${esc(t('tipLbl'))}:</b> ${esc(t(k + 'c'))}</p><button type="button" class="sd-cta ready" data-gclose>${esc(t('gotIt'))}</button></div>`;
      el.hidden = false; const b = el.querySelector('.sd-cta'); if (b) b.focus({ preventScroll: true });
    }
    function closeGuide() { const el = $('#sdGuide'); if (el) el.hidden = true; guideOpen = null; }
    const head = (n, sub) => `<div class="sd-h"><h2>${esc(t('partN', { n: n + 1 }))} · ${esc(t('dtGh' + (n + 1)))}</h2><p>${esc(sub)}</p><button type="button" class="sd-info" data-info="${n}" title="${esc(t('infoTip'))}" aria-label="${esc(t('infoTip'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg></button></div>`;
    const quest = (n, keys, cta, goTo) => `<aside class="sd-card sd-quest"><h3>${esc(t('quest'))}</h3><ul id="ck">${keys.map(k => `<li data-c="${k}"><span class="bx">✓</span><span>${esc(t('dtQ_' + k))}</span></li>`).join('')}</ul><div class="sd-prog"><i id="ckBar"></i></div><button type="button" class="sd-cta" id="next1" data-go="${goTo}">${esc(t(cta))}</button><p class="note" id="lockHint">${esc(t('lockHint'))}</p></aside>`;
    const foot = (n, last) => `<div class="sd-foot"><button type="button" data-go="${n - 1}">${esc(t('back'))}</button><span class="grow"></span>${last ? `<button type="button" data-reset>↺ ${esc(t('dtNew'))}</button>` : `<button type="button" class="sd-cta ready" data-go="${n + 1}">${esc(t(n === 2 ? 'dtNext3' : 'dtNext'))}</button>`}</div>`;
    function renderStage(dir) {
      const st = $('#sdStage'), n = step; let h;
      if (n === 0) h = `<div class="sd-p1"><section class="sd-card">${head(0, t('dtSub'))}<div class="dt-cases" id="dtCases" role="radiogroup" aria-label="${esc(t('dtPick'))}"></div><div class="dt-story" id="dtStory"></div></section>${quest(0, ['ck1', 'ck2'], 'dtNext1', 1)}</div>`;
      else if (n === 1) h = `<div class="dt-p2"><section class="sd-card">${head(1, t('dtG2a'))}<div class="dt-legend" id="dtLegend"></div><div class="dt-grid"><div class="dt-tree" id="dtTree"></div><aside class="dt-insp" id="dtInsp" aria-live="polite"></aside></div><div id="dtIssues"></div></section>${quest(1, ['ck3', 'ck4', 'ck5'], 'dtNext2', 2)}</div>`;
      else if (n === 2) h = `<section class="sd-card">${head(2, t('dtG3a'))}<div class="dt-legend" id="dtLegend"></div><div class="dt-tree" id="dtTree"></div><div class="dt-sec" id="dtRes"></div>${foot(2)}</section>`;
      else h = `<section class="sd-card">${head(3, t('dtG4a'))}<div class="dt-sec" id="dtSens"></div><div class="dt-sec dt-conc" id="dtConc"></div><div class="sd-dl"><h4>⬇ ${esc(t('dtDl'))}</h4><div class="row"><button type="button" data-dl="pdf">PDF</button><button type="button" data-dl="html">HTML</button><button type="button" data-dl="md">Markdown</button></div></div>${foot(3, true)}</section>`;
      st.innerHTML = h; if (dir && !document.body.classList.contains('still')) st.firstElementChild.classList.add(dir > 0 ? 'in-r' : 'in-l');
      renderCases(); renderStory(); renderLegend(); renderTree(); renderInsp(); renderIssues(); renderRes(); renderSens(); renderConc(); updQuest();
      if (!seen[n]) { seen[n] = 1; showGuide(n); } else if (guideOpen != null) showGuide(guideOpen);
    }
    function renderIssues() {
      const box = $('#dtIssues'); if (!box) return; const is = E.validate(T);
      box.innerHTML = is.length ? '<ul class="dt-issues">' + is.slice(0, 4).map(i => { const n = nm(E.find(T, i.id).node.n); return `<li>${esc(i.code === 'psum' ? t('dtIssP', { n, s: Math.round(i.s * 1000) / 10 }) : i.code === 'one' ? t('dtIssO', { n }) : t('dtIssE', { n }))}</li>`; }).join('') + '</ul>' : `<p class="note">✓ ${esc(t('dtIssOk'))}</p>`;
    }
    function updQuest() {
      if (!$('#ck')) { renderSteps(); return; }
      const c = checks()[step], ks = Object.keys(c); let k = 0;
      ks.forEach(key => { const li = $(`#ck [data-c="${key}"]`); if (!li) return; if (c[key]) k++; const was = li.classList.contains('ok'); li.classList.toggle('ok', c[key]); if (c[key] && !was) { li.classList.remove('pop'); void li.offsetWidth; li.classList.add('pop'); } });
      $('#ckBar').style.width = k / ks.length * 100 + '%';
      const b = $('#next1'); b.classList.toggle('ready', k === ks.length); b.setAttribute('aria-disabled', k === ks.length ? 'false' : 'true');
      $('#lockHint').style.visibility = k === ks.length ? 'hidden' : 'visible'; renderSteps();
    }
    function go(n) {
      if (n < 0 || n > 3) return;
      if (!unlocked(n)) { toast(t('lockHint'), 'warn'); shake($('#next1')); return; }
      const dir = n >= step ? 1 : -1; step = n; guideOpen = null; renderSteps(); renderStage(dir); const sc = $('#sdStage'); if (sc) sc.scrollTop = 0; sfx('tick');
    }
    /* ---------- report (HTML / Markdown / PDF), same as the SMART Calculator ---------- */
    const dateStr = () => new Date().toLocaleDateString(MBALAB.i18n.get(), { year: 'numeric', month: 'long', day: 'numeric' });
    const RC = ['#2563eb', '#d97706', '#059669', '#7c3aed', '#0e7490', '#dc2626'];
    function treeSVGReport() {
      const { pos, leaves, depth } = layout(T), X0 = 40, CW = 214, RH = 70, Y0 = 46, px = n => X0 + pos[n.id].x * CW, py = n => Y0 + pos[n.id].y * RH;
      const W = X0 + depth * CW + 180, H = Y0 + leaves * RH - 14, dim = new Set();
      (function mark(n, d) { if (d) dim.add(n.id); n.kids.forEach((e, i) => mark(e.n, d || (n.k === 'd' && S.best[n.id] !== i))); })(T, false);
      let ed = '', nd = '';
      E.walk(T, n => {
        const x1 = px(n) + (n.k === 'd' ? 14 : 16), y1 = py(n);
        n.kids.forEach((e, i) => {
          const c = e.n, x2 = px(c) - 14, y2 = py(c), mx = (x1 + x2) / 2, best = n.k === 'd' && S.best[n.id] === i && !dim.has(n.id), op = dim.has(c.id) ? 0.35 : 1;
          const sub = [n.k === 'c' ? Math.round(E.pOf(n)[i] * 1000) / 10 + '%' : '', +e.v ? fs(+e.v) : ''].filter(Boolean).join(' · ');
          ed += `<g opacity="${op}"><path d="M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}" fill="none" stroke="${best ? '#059669' : '#94a3b8'}" stroke-width="${best ? 3.2 : 1.8}"/><text x="${x2 - 8}" y="${y2 - 8}" text-anchor="end" font-size="13" font-weight="700" fill="#0f172a">${esc(cut(nm(e.l), 22))}</text>${sub ? `<text x="${x2 - 8}" y="${y2 + 15}" text-anchor="end" font-size="12" fill="#64748b">${esc(sub)}</text>` : ''}${n.k === 'd' && S.best[n.id] !== i ? `<text x="${x2 - 8}" y="${y2 + 32}" text-anchor="end" font-size="13" font-weight="900" fill="#dc2626">✂</text>` : ''}</g>`;
        });
      });
      E.walk(T, n => {
        const x = px(n), y = py(n), col = n.k === 'd' ? '#2563eb' : n.k === 'c' ? '#d97706' : '#059669', st = `fill="#fff" stroke="${col}" stroke-width="2.5"`;
        const shape = n.k === 'd' ? `<rect x="${x - 14}" y="${y - 14}" width="28" height="28" rx="5" ${st}/>` : n.k === 'c' ? `<circle cx="${x}" cy="${y}" r="16" ${st}/>` : `<polygon points="${x - 13},${y - 14} ${x + 15},${y} ${x - 13},${y + 14}" ${st}/>`;
        const lab = n.k === 'e' ? `<text x="${x + 22}" y="${y + 5}" font-size="13" font-weight="800" fill="${+n.pay < 0 ? '#dc2626' : '#0f172a'}">${esc(fs(+n.pay || 0))}</text>` : `<text x="${x}" y="${y - 24}" text-anchor="middle" font-size="13" font-weight="800" fill="#059669">${esc(fmt(S.ev[n.id]))}</text><text x="${x}" y="${y + 33}" text-anchor="middle" font-size="12" fill="#64748b">${esc(cut(nm(n.n), 18))}</text>`;
        nd += `<g opacity="${dim.has(n.id) ? 0.35 : 1}">${shape}${lab}</g>`;
      });
      return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="font-family:inherit">${ed}${nd}</svg>`;
    }
    function sensSVGReport() {
      const pes = E.probEdges(T); if (!(T.k === 'd' && T.kids.length > 1) || !pes.length) return null;
      const pe = pes.find(x => x.edge.id === sensEdge) || pes[0], sn = E.sens(T, pe.edge.id, 50, RAV[ra]), W = 700, H = 260, L = 60, R = 16, Tp = 14, B = 34, base = E.pOf(pe.parent)[pe.parent.kids.indexOf(pe.edge)];
      const all = sn.series.flat().concat([0]), lo = Math.min(...all), hi = Math.max(...all), span = hi - lo || 1, X = x => L + x * (W - L - R), Y = v => Tp + (1 - (v - lo) / span) * (H - Tp - B);
      let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="font-family:inherit">` + [0, 0.25, 0.5, 0.75, 1].map(x => `<line x1="${X(x)}" x2="${X(x)}" y1="${Tp}" y2="${H - B}" stroke="#e2e8f0"/><text x="${X(x)}" y="${H - 14}" text-anchor="middle" font-size="12" fill="#64748b">${Math.round(x * 100)}%</text>`).join('') + [lo, (lo + hi) / 2, hi].map(v => `<line x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}" stroke="#e2e8f0"/><text x="${L - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="12" fill="#64748b">${fmt(v)}</text>`).join('');
      sn.series.forEach((s2, j) => { svg += `<polyline fill="none" stroke="${RC[j % 6]}" stroke-width="2.6" points="${s2.map((v, i) => X(sn.xs[i]) + ',' + Y(v)).join(' ')}"/>`; });
      svg += `<line x1="${X(base)}" x2="${X(base)}" y1="${Tp}" y2="${H - B}" stroke="#a21caf" stroke-dasharray="3 4"/>`;
      sn.cross.forEach(c => { const k = Math.round(c.x * 50); svg += `<circle cx="${X(c.x)}" cy="${Y((sn.series[c.to][k] + sn.series[c.from][k]) / 2)}" r="5" fill="#dc2626"/>`; });
      const leg = T.kids.map((e, j) => `<span style="color:${RC[j % 6]}">■</span> ${esc(nm(e.l))}`).join(' &nbsp; ');
      const cr = sn.cross.length ? sn.cross.slice(0, 2).map(c => esc(t('dtSensCross', { p: Math.round(c.x * 100), a: nm(T.kids[c.from].l), b: nm(T.kids[c.to].l) }))).join(' ') : esc(t('dtSensNone', { a: nm(T.kids[S.best[T.id]].l) }));
      return `<h3>${esc(nm(pe.parent.n))} → ${esc(nm(pe.edge.l))}</h3>${svg}</svg><p class="note">${leg}</p><p>${cr}</p>`.replace('</svg></svg>', '</svg>');
    }
    function reportBody() {
      const pr = E.profile(T, S), plan = E.plan(T, S), ev = !isFinite(RAV[ra]) ? E.evpi(T, S) : null, rows = [[t('dtVal'), t('dtMoney', { v: sm(S.ev[T.id]) })], [t('dtWorst'), fs(pr.min)], [t('dtBestC'), fs(pr.max)], [t('dtLoss'), Math.round(pr.pLoss * 100) + '%']];
      if (ev != null) rows.push([t('dtEvpi'), t('dtMoney', { v: fmt(ev) })]);
      const opts = T.k === 'd' ? `<table><tr><th>${esc(t('dtThOpt'))}</th><th>${esc(t(isFinite(RAV[ra]) ? 'dtOptCE' : 'dtOpt'))}</th></tr>${T.kids.map((e, i) => `<tr><td>${esc(nm(e.l))}${i === S.best[T.id] ? ' ★' : ''}</td><td>${esc(fs(S.edge[e.id]))}</td></tr>`).join('')}</table>` : '';
      const outs = `<table class="l2"><tr><th>${esc(t('dtThPath'))}</th><th>${esc(t('dtThProb'))}</th><th>${esc(t('dtThVal'))}</th></tr>${pr.outs.map(o => `<tr><td>${esc(o.path.map(nm).join(' → '))}</td><td>${Math.round(o.p * 1000) / 10}%</td><td>${esc(fs(o.val))}</td></tr>`).join('')}</table>`;
      const sv = sensSVGReport();
      return `<div class="blk"><h1>${esc(t('dtRTitle'))}</h1><p class="sub">${esc(nm(P().name))}</p><p class="sub">Decision Tree Calculator · MBA Lab · ${esc(t('dtGen', { d: dateStr() }))}</p></div>
<div class="blk"><h2>${esc(t('dtR1'))}</h2>${treeSVGReport()}</div>
<div class="blk"><h2>${esc(t('dtR2'))}</h2>${opts}<table>${rows.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</table>${plan.length ? '<ul>' + plan.slice(0, 6).map(p => `<li>${esc(t('dtAt', { d: nm(p.name), c: nm(p.choice) }))}</li>`).join('') + '</ul>' : ''}</div>
<div class="blk"><h2>${esc(t('dtR3'))}</h2>${outs}</div>
${sv ? `<div class="blk"><h2>${esc(t('dtR4'))}</h2>${sv}</div>` : ''}
<div class="blk"><h2>${esc(t('dtConc'))}</h2>${summary().map(p => `<p>${esc(p)}</p>`).join('')}</div>`;
    }
    function reportMD() {
      const pr = E.profile(T, S), L = [`# ${t('dtRTitle')}`, '', `*${nm(P().name)} · Decision Tree Calculator · MBA Lab · ${t('dtGen', { d: dateStr() })}*`, ''];
      if (T.k === 'd') { L.push(`## ${t('dtR2')}`, '', `| ${t('dtThOpt')} | ${t(isFinite(RAV[ra]) ? 'dtOptCE' : 'dtOpt')} |`, '|---|---|'); T.kids.forEach((e, i) => L.push(`| ${nm(e.l).replace(/\|/g, '\\|')}${i === S.best[T.id] ? ' ★' : ''} | ${fs(S.edge[e.id])} |`)); L.push(''); }
      L.push(`## ${t('dtR3')}`, '', `| ${t('dtThPath')} | ${t('dtThProb')} | ${t('dtThVal')} |`, '|---|---|---|');
      pr.outs.forEach(o => L.push(`| ${o.path.map(nm).join(' → ').replace(/\|/g, '\\|')} | ${Math.round(o.p * 1000) / 10}% | ${fs(o.val)} |`));
      L.push('', `## ${t('dtConc')}`, '', ...summary().map(p => p + '\n')); return L.join('\n');
    }
    let busy = false;
    async function download(kind, btn) {
      if (busy || !MBALAB.report) return; busy = true; const label = btn.textContent; btn.textContent = t('dtBusy'); btn.disabled = true; const base = t('dtFile');
      try {
        let ok;
        if (kind === 'html') ok = await MBALAB.report.save(base + '.html', MBALAB.report.html(t('dtRTitle'), reportBody()), 'text/html');
        else if (kind === 'md') ok = await MBALAB.report.save(base + '.md', reportMD(), 'text/markdown');
        else ok = await MBALAB.report.save(base + '.pdf', new Blob([await MBALAB.report.pdf(reportBody())], { type: 'application/pdf' }), 'application/pdf');
        if (ok) toast(t('dtSaved'), 'xp');
      } catch (e) { console.warn('download failed', e); toast(t('dtFail'), 'warn'); }
      busy = false; btn.textContent = label; btn.disabled = false;
    }

    function refresh() { solve(); renderTree(); renderRes(); renderConc(); renderStory(); renderIssues(); updQuest(); }
    function renderAll() { solve(); renderSteps(); renderStage(0); }
    function hints() {
      if (step === 0) return { state: [hunch == null && T.k === 'd' ? 'dtas_hunch' : 'dtas_ok0'], generic: ['dtas_0a', 'dtas_0b'] };
      if (step === 1) return { state: [ready() ? 'dtas_ok1' : 'dtas_fix'], generic: ['dtas_1a', 'dtas_1b'] };
      return { state: [], generic: step === 2 ? ['dtas_2a', 'dtas_2b'] : ['dtas_3a', 'dtas_3b'] };
    }

    host.addEventListener('click', ev => {
      const tg = ev.target, q = s => tg.closest(s);
      let b;
      if ((b = q('[data-dl]'))) { download(b.dataset.dl, b); return; }
      if (q('[data-gclose]')) { closeGuide(); return; }
      if ((b = q('[data-info]'))) { showGuide(+b.dataset.info); return; }
      if ((b = q('[data-go]'))) { go(+b.dataset.go); return; }
      if ((b = q('[data-case]'))) { load(b.dataset.case); sfx('tick'); return; }
      if ((b = q('[data-hunch]'))) { hunch = +b.dataset.hunch; renderStory(); updQuest(); sfx('tick'); return; }
      if (step === 1 && (b = q('[data-nid]'))) { sel = b.dataset.nid; renderTree(); renderInsp(); sfx('tick'); return; }
      if ((b = q('[data-ra]'))) { ra = +b.dataset.ra; sensX = null; refresh(); renderSens(); sfx('tick'); return; }
      if (q('[data-reset]')) { load(cur); return; }
      if (q('[data-copy]')) { const txt = '# ' + nm(P().name) + '\n\n' + summary().join('\n\n'); const done = () => { const c = $('[data-copy]'); if (c) { c.textContent = t('dtCopied'); setTimeout(() => { const c2 = $('[data-copy]'); if (c2) c2.textContent = t('dtCopy'); }, 1500); } }; try { navigator.clipboard.writeText(txt).then(done, done); } catch (e) { done(); } return; }
      const f = sel && E.find(T, sel); if (!f) return;
      if ((b = q('[data-type]'))) { setType(f.node, b.dataset.type); refresh(); renderInsp(); renderSens(); sfx('tick'); return; }
      if (q('[data-add]')) { const n = f.node, used = E.sum(n.kids.map(e => +e.p || 0)); n.kids.push(E.edge(newB(), E.end('', 0), n.k === 'c' ? { p: Math.max(0, 1 - used) } : {})); refresh(); renderInsp(); renderSens(); sfx('tick'); return; }
      if (q('[data-del]') && f.parent) { f.parent.kids = f.parent.kids.filter(e => e.n !== f.node); sel = f.parent.id; if (f.parent.kids.length === 0) f.parent.k = 'e'; refresh(); renderInsp(); renderSens(); sfx('tick'); return; }
      if ((b = q('[data-bal]'))) { const par = E.find(T, b.dataset.bal).node, ps = E.pOf(par); par.kids.forEach((e, i) => { e.p = ps[i]; }); refresh(); renderInsp(); renderSens(); }
    });
    host.addEventListener('change', ev => { const s = ev.target.closest('[data-sens]'); if (s) { sensEdge = s.value; sensX = null; renderSens(); } });
    host.addEventListener('input', ev => { const r = ev.target.closest('[data-sx]'); if (r) { sensX = +r.value; sensDyn(); } });
    if (window.SmartAssistant) SmartAssistant.create(host, { hints });
    this._dt = { relabel: renderAll, redraw() { renderSteps(); renderStage(0); } }; load('cafe');
  },
  onLang() { const m = this._dt; if (m) m.relabel(); }
});
