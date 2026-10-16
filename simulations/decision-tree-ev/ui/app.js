/* Decision Tree Studio: case chips, tree drawing, editor, roll-back results, sensitivity chart, conclusion.
   All maths is in engine/engine.js (MBALAB.dt). Labels coming from presets are {en,id,ja,zh}; labels typed by the player are plain strings. */
MBALAB.sims.define('decision-tree-ev', {
  mount(host) {
    const E = MBALAB.dt, $ = s => host.querySelector(s), esc = MBALAB.util.esc, sfx = MBALAB.util.sfx;
    const RAV = [Infinity, 1500, 500], COLS = ['var(--cy)', 'var(--am)', 'var(--gn)', 'var(--mg)', 'var(--vi)', 'var(--rd)'];
    let cur = 'cafe', T = null, S = null, sel = null, ra = 0, hunch = null, sensEdge = null, sensX = null;
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
      $('#dtCases').innerHTML = E.PRESETS.map(p => `<button type="button" role="radio" aria-checked="${p.id === cur}" class="dt-case ${p.id === cur ? 'on' : ''}" data-case="${p.id}"><span aria-hidden="true">${p.icon}</span>${esc(tr(p.name))}</button>`).join('');
    }
    function renderStory() {
      const p = P(); let h = `<p>${esc(tr(p.story))}</p>`;
      if (T.k === 'd' && T.kids.length > 1) {
        h += `<div class="dt-hunch"><b>${esc(t('dtHunchQ'))}</b>` + T.kids.map((e, i) => `<button type="button" class="dt-chip ${hunch === i ? 'on' : ''}" data-hunch="${i}">${esc(nm(e.l))}</button>`).join('') + '</div>';
        if (hunch != null && T.kids[hunch]) {
          const best = S.best[T.id], a = T.kids[hunch], b = T.kids[best], x = S.edge[a.id], y = S.edge[b.id];
          h += `<div class="sx-verdict ${hunch === best ? 'v3' : 'v1'}">${esc(hunch === best ? t('dtHit', { a: nm(a.l), v: sm(y) }) : t('dtMiss', { a: nm(a.l), x: sm(x), b: nm(b.l), y: sm(y), d: fmt(y - x) }))}</div>`;
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
      const sh = { d: '<svg viewBox="0 0 18 18"><rect x="2" y="2" width="14" height="14" rx="3" class="dt-nd d"/></svg>', c: '<svg viewBox="0 0 18 18"><circle cx="9" cy="9" r="7" class="dt-nd c"/></svg>', e: '<svg viewBox="0 0 18 18"><polygon points="3,2 16,9 3,16" class="dt-nd e"/></svg>' };
      $('#dtLegend').innerHTML = `<span>${sh.d}${esc(t('dtLegD'))}</span><span>${sh.c}${esc(t('dtLegC'))}</span><span>${sh.e}${esc(t('dtLegE'))}</span><span>${esc(t('dtLegB'))}</span>`;
    }

    /* ---------- editor ---------- */
    function renderInsp() {
      const box = $('#dtInsp'), f = sel && E.find(T, sel);
      if (!f) { box.innerHTML = `<h3>${esc(t('dtInspH'))}</h3><p class="sk-sub">${esc(t('dtInspNone'))}</p><button type="button" data-reset>${esc(t('dtReset'))}</button>`; return; }
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
      const issues = E.validate(T), pr = E.profile(T, S), plan = E.plan(T, S), neutral = !isFinite(RAV[ra]);
      const ev = neutral ? E.evpi(T, S) : null;
      let h = `<h2 class="sk-h">${esc(t('dtRes'))}</h2>`;
      if (issues.length) h += '<ul class="dt-issues">' + issues.slice(0, 4).map(i => { const f = E.find(T, i.id), n = nm(f.node.n); return `<li>${esc(i.code === 'psum' ? t('dtIssP', { n, s: Math.round(i.s * 1000) / 10 }) : i.code === 'one' ? t('dtIssO', { n }) : t('dtIssE', { n }))}</li>`; }).join('') + '</ul>';
      if (T.k === 'd' && T.kids.length) {
        const vals = T.kids.map(e => S.edge[e.id]), mx = Math.max(1, ...vals.map(Math.abs)), best = S.best[T.id];
        h += `<h3 class="sk-h" style="font-size:15.5px">${esc(t(neutral ? 'dtOpt' : 'dtOptCE'))}</h3><div class="dt-bars">` + T.kids.map((e, i) => {
          const v = vals[i], w = Math.abs(v) / mx * 50, left = v >= 0 ? 50 : 50 - w;
          return `<div class="dt-bar ${i === best ? 'best' : ''} ${v < 0 ? 'neg' : ''}"><span>${esc(nm(e.l))}${i === best ? ' ★' : ''}</span><div class="tr"><i class="z" style="left:50%"></i><i class="f" style="left:${left}%;width:${w}%"></i></div><b>${esc(fs(v))}</b></div>`;
        }).join('') + '</div>';
      }
      h += `<div class="dt-kpis"><div><small>${esc(t('dtVal'))}</small><b>${esc(t('dtMoney', { v: sm(S.ev[T.id]) }))}</b></div><div><small>${esc(t('dtWorst'))}</small><b class="${pr.min < 0 ? 'dt-neg' : ''}">${esc(fs(pr.min))}</b></div><div><small>${esc(t('dtBestC'))}</small><b>${esc(fs(pr.max))}</b></div><div><small>${esc(t('dtLoss'))}</small><b>${Math.round(pr.pLoss * 100)}%</b></div>` +
        (ev != null ? `<div title="${esc(t('dtEvpiH'))}"><small>${esc(t('dtEvpi'))}</small><b>${esc(t('dtMoney', { v: fmt(ev) }))}</b></div>` : '') + '</div>';
      if (plan.length) h += `<div class="sx-verdict v3"><b>${esc(t('dtBestPlan'))}</b><br>` + plan.slice(0, 5).map(p => esc(t('dtAt', { d: nm(p.name), c: nm(p.choice) }))).join('<br>') + '</div>';
      h += `<div class="dt-ra"><b>${esc(t('dtRA'))}:</b>` + [0, 1, 2].map(i => `<button type="button" data-ra="${i}" class="${ra === i ? 'on' : ''}">${esc(t('dtRA' + i))}</button>`).join('') + `</div><p class="sk-sub">${esc(t('dtRAh'))}</p>`;
      $('#dtRes').innerHTML = h;
    }

    /* ---------- sensitivity ---------- */
    function renderSens() {
      const box = $('#dtSens'), pes = E.probEdges(T); let h = `<h2 class="sk-h">${esc(t('dtSens'))}</h2>`;
      if (!pes.length) { box.innerHTML = h + `<p class="sk-sub">${esc(t('dtSensNoC'))}</p>`; return; }
      if (!(T.k === 'd' && T.kids.length > 1)) { box.innerHTML = h + `<p class="sk-sub">${esc(t('dtSensNoD'))}</p>`; return; }
      if (!pes.some(x => x.edge.id === sensEdge)) sensEdge = pes[0].edge.id;
      const pe = pes.find(x => x.edge.id === sensEdge); if (sensX == null) sensX = Math.round(E.pOf(pe.parent)[pe.parent.kids.indexOf(pe.edge)] * 100);
      h += `<label class="sx-f"><span>${esc(t('dtSensPick'))}</span><select data-sens>` + pes.map(x => `<option value="${x.edge.id}" ${x.edge.id === sensEdge ? 'selected' : ''}>${esc(nm(x.parent.n))} → ${esc(nm(x.edge.l))}</option>`).join('') + '</select></label>' +
        `<div class="sx-f"><label><span id="dtSx1"></span><output id="dtSx2"></output></label><input type="range" min="0" max="100" step="1" value="${sensX}" data-sx></div><div id="dtSensDyn"></div>`;
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
        (sn.cross.length ? sn.cross.slice(0, 2).map(c => `<div class="sx-verdict v1">${esc(t('dtSensCross', { p: Math.round(c.x * 100), a: nm(T.kids[c.from].l), b: nm(T.kids[c.to].l) }))}</div>`).join('') : `<div class="sx-verdict v3">${esc(t('dtSensNone', { a: nm(T.kids[S.best[T.id]].l) }))}</div>`);
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
    function renderConc() { $('#dtConc').innerHTML = `<h2 class="sk-h">${esc(t('dtConc'))}</h2><div class="dt-conc">${summary().map(p => `<p>${esc(p)}</p>`).join('')}</div><button type="button" data-copy>${esc(t('dtCopy'))}</button>`; }

    function refresh() { solve(); renderTree(); renderRes(); renderConc(); renderStory(); }
    function renderAll() { solve(); renderCases(); renderLegend(); renderStory(); renderTree(); renderInsp(); renderRes(); renderSens(); renderConc(); }

    host.addEventListener('click', ev => {
      const tg = ev.target, q = s => tg.closest(s);
      let b;
      if ((b = q('[data-case]'))) { load(b.dataset.case); sfx('tick'); return; }
      if ((b = q('[data-hunch]'))) { hunch = +b.dataset.hunch; renderStory(); sfx('tick'); return; }
      if ((b = q('[data-nid]'))) { sel = b.dataset.nid; renderTree(); renderInsp(); sfx('tick'); return; }
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
    this._dt = { relabel: renderAll }; load('cafe');
  },
  onLang() { const m = this._dt; if (m) m.relabel(); }
});
