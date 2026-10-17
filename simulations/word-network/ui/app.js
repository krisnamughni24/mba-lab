/* Word Network logic (Explorer template). Explore: add words and watch the association swarm; Predict: guess the strongest association
   or the word that bridges two words. All data work lives in engine/engine.js; this file only draws and handles input. */
MBALAB.sims.define('word-network', {
  mount(host) {
    const $ = s => host.querySelector(s), T = (k, p) => t(k, p), sfx = MBALAB.util.sfx, N = MBALAB.wordnet, ROUNDS = 6, MAX = 5;
    const STARTERS = ['brand', 'price', 'customer', 'quality', 'risk', 'money', 'team', 'market', 'trust', 'profit'];
    const PAIRS = [['brand', 'price'], ['risk', 'money'], ['team', 'leader'], ['luxury', 'cheap'], ['customer', 'service'], ['quality', 'price'], ['market', 'competition'], ['profit', 'greed']];
    const INC = ['#4dd2ff', '#ff6ad5', '#34d399', '#a78bfa', '#fb923c'], GOLD = '#fbbf24', NB = '#7c8db5';
    N.load(MBALAB.wordnet.raw);
    const LI = () => Math.max(0, ['en', 'id', 'ja', 'zh'].indexOf(MBALAB.i18n.get()));
    const DIMC = { pos: { val: '#34d399', mkt: '#4dd2ff', cap: '#a78bfa', ppl: '#fbbf24' }, neg: { cost: '#fb923c', risk: '#f87171', eff: '#c084fc', ppl: '#ff6ad5' } };
    const DIMK = { val: 'dVal', mkt: 'dMkt', cap: 'dCap', ppl: 'dPpl', cost: 'dCost', risk: 'dRisk', eff: 'dEff' };
    const isLens = () => mode === 'pos' || mode === 'neg';
    let lens = { concept: '', ctx: '', sel: -1 }, shown = [];
    let mode = 'explore', inputs = [], graph = { nodes: [], edges: [] }, pos = new Map(), q = null, seen = new Set(), frames = 0, raf = 0;
    const cv = $('#wnCv'), ctx = cv.getContext('2d'), SW = 160, SH = 90;
    const still = () => document.body.classList.contains('still') || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

    /* ---------- graph from the current words ---------- */
    function build() {
      if (isLens()) { buildLens(); return; }
      const nodes = new Map(), edges = [], add = (w, type, s) => { const n = nodes.get(w); if (!n) nodes.set(w, { w, type, s }); else { if (type === 'input') n.type = 'input'; else if (type === 'bridge' && n.type === 'nb') n.type = 'bridge'; n.s = Math.max(n.s, s); } };
      inputs.forEach(w => add(w, 'input', 100));
      if (inputs.length === 1) N.neighbors(inputs[0], 14).forEach(n => { add(n.w, 'nb', n.s); edges.push([inputs[0], n.w, n.s]); });
      else if (inputs.length > 1) {
        const br = N.bridges(inputs, 8);
        br.forEach(b => { add(b.w, b.hit >= 2 ? 'bridge' : 'nb', b.s); inputs.forEach((i, k) => { if (b.via[k]) edges.push([i, b.w, b.via[k]]); }); });
        inputs.forEach(i => N.neighbors(i, 4).forEach(n => { if (!nodes.has(n.w)) add(n.w, 'nb', n.s); if (!edges.some(e => e[0] === i && e[1] === n.w)) edges.push([i, n.w, n.s]); }));
        inputs.forEach((a, x) => inputs.slice(x + 1).forEach(b => { const s = N.weight(a, b); if (s) edges.push([a, b, s]); }));
      }
      graph = { nodes: [...nodes.values()], edges };
      graph.nodes.forEach((n, i) => { if (!pos.has(n.w)) pos.set(n.w, { x: SW / 2 + (Math.random() - .5) * 40, y: SH / 2 + (Math.random() - .5) * 24, vx: 0, vy: 0 }); n.p = pos.get(n.w); n.i = i; });
      [...pos.keys()].forEach(k => { if (!nodes.has(k)) pos.delete(k); });
    }
    const rad = n => n.type === 'concept' ? 4.2 : n.type === 'ctx' ? 3 : n.type === 'item' ? 1.9 + n.m * .5 + (n.hit ? .5 : 0) : n.type === 'input' ? 3.6 : Math.min(3.2, 1.5 + Math.sqrt(n.s) * .09);
    const col = n => n.c || (n.type === 'input' ? INC[inputs.indexOf(n.w) % INC.length] : n.type === 'bridge' ? GOLD : NB);

    /* ---------- lens graph: concept in the middle, curated items around it, context as a white ring ---------- */
    function buildLens() {
      const c = N.lensGet(lens.concept), nodes = [], edges = []; shown = [];
      if (c) {
        nodes.push({ w: '#c', label: c.name[LI()], type: 'concept', s: 100, c: '#4dd2ff' });
        shown = N.lensRank(c, mode, lens.ctx);
        const hasCtx = !!N.norm(lens.ctx);
        shown.forEach((r, k) => { const id = '#i' + r.i; nodes.push({ w: id, label: r.item.l[LI()], type: 'item', m: r.item.m, c: DIMC[mode][r.item.d], hit: r.hit, fade: hasCtx && !r.hit, s: r.item.m * 50, k: r.i }); edges.push(['#c', id, 8 + r.item.m * 4]); });
        if (hasCtx) { nodes.push({ w: '#x', label: N.norm(lens.ctx), type: 'ctx', s: 100, c: '#e5e7eb' }); shown.forEach(r => { if (r.hit) edges.push(['#x', '#i' + r.i, 30]); }); edges.push(['#x', '#c', 20]); }
      }
      graph = { nodes, edges };
      graph.nodes.forEach((n, i) => { if (!pos.has(n.w)) pos.set(n.w, { x: SW / 2 + (Math.random() - .5) * 40, y: SH / 2 + (Math.random() - .5) * 24, vx: 0, vy: 0 }); n.p = pos.get(n.w); n.i = i; });
      [...pos.keys()].forEach(k => { if (!nodes.some(n => n.w === k)) pos.delete(k); });
    }

    /* ---------- swarm physics ---------- */
    function step(heat) {
      const ns = graph.nodes;
      for (let a = 0; a < ns.length; a++) for (let b = a + 1; b < ns.length; b++) {
        const p = ns[a].p, r = ns[b].p; let dx = p.x - r.x, dy = (p.y - r.y) * 1.7, d2 = dx * dx + dy * dy + .5, f = 60 / d2, d = Math.sqrt(d2);
        dx /= d; dy /= d; p.vx += dx * f; p.vy += dy * f * .6; r.vx -= dx * f; r.vy -= dy * f * .6;
      }
      graph.edges.forEach(([a, b, s]) => {
        const p = pos.get(a), r = pos.get(b); if (!p || !r) return; const dx = r.x - p.x, dy = r.y - p.y, d = Math.hypot(dx, dy) || 1, want = 36 - Math.min(18, s * .12), f = (d - want) * .012;
        p.vx += dx / d * f; p.vy += dy / d * f; r.vx -= dx / d * f; r.vy -= dy / d * f;
      });
      ns.forEach(n => {
        const p = n.p; p.vx += (SW / 2 - p.x) * .004; p.vy += (SH / 2 - p.y) * .006;
        if (heat) { p.vx += (Math.random() - .5) * .05; p.vy += (Math.random() - .5) * .05; }
        p.vx *= .82; p.vy *= .82; p.x = Math.max(12, Math.min(SW - 12, p.x + p.vx)); p.y = Math.max(7, Math.min(SH - 7, p.y + p.vy));
      });
    }
    function settle() { for (let i = 0; i < 260; i++) step(false); }
    function loop() {
      raf = 0; if (!host.isConnected || !graph.nodes.length) return;
      step(true); draw(); if (++frames < 420) raf = requestAnimationFrame(loop);
    }
    function relayout() {
      cancelAnimationFrame(raf); raf = 0;
      if (still()) { settle(); draw(); return; }
      frames = 0; raf = requestAnimationFrame(loop);
    }

    /* ---------- canvas ---------- */
    function fit() { const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); draw(); }
    function draw() {
      const W = cv.width, H = cv.height, k = W / SW, cs = getComputedStyle(host.querySelector('#wn')), tx = cs.getPropertyValue('--txt').trim() || '#fff';
      ctx.clearRect(0, 0, W, H); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (!graph.nodes.length) { ctx.fillStyle = tx; ctx.globalAlpha = .55; ctx.font = `${Math.round(W / 38)}px system-ui,sans-serif`; ctx.fillText(T(isLens() ? 'mapEmptyLens' : 'mapEmpty'), W / 2, H / 2); ctx.globalAlpha = 1; return; }
      graph.edges.forEach(([a, b, s]) => {
        const p = pos.get(a), r = pos.get(b); if (!p || !r) return;
        ctx.strokeStyle = tx; ctx.globalAlpha = Math.min(.55, .12 + s / 300); ctx.lineWidth = (.4 + Math.min(3, s / 45)) * k / 3.2;
        ctx.beginPath(); ctx.moveTo(p.x * k, p.y * k); ctx.lineTo(r.x * k, r.y * k); ctx.stroke();
      }); ctx.globalAlpha = 1;
      graph.nodes.slice().sort((a, b) => rad(a) - rad(b)).forEach(n => {
        const x = n.p.x * k, y = n.p.y * k, r = rad(n) * k, c = col(n), txt = n.label || n.w; ctx.globalAlpha = n.fade ? .35 : 1;
        const g = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); g.addColorStop(0, c); g.addColorStop(1, c + '99');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
        if (n.type === 'ctx') { ctx.strokeStyle = '#fff'; ctx.lineWidth = k * .35; ctx.setLineDash([k, k * .6]); ctx.beginPath(); ctx.arc(x, y, r + k * .8, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
        if (n.hit) { ctx.strokeStyle = '#fff'; ctx.lineWidth = k * .3; ctx.beginPath(); ctx.arc(x, y, r + k * .5, 0, 7); ctx.stroke(); }
        if (isLens() && n.type === 'item' && n.k === lens.sel) { ctx.strokeStyle = tx; ctx.lineWidth = k * .45; ctx.beginPath(); ctx.arc(x, y, r + k * .9, 0, 7); ctx.stroke(); }
        const big = n.type === 'input' || n.type === 'concept' || n.type === 'ctx'; ctx.fillStyle = n.type === 'nb' || n.type === 'item' ? tx : '#fff'; ctx.font = `${big ? '800 ' : ''}${Math.round(big ? W / 40 : W / 54)}px system-ui,sans-serif`;
        if (n.type === 'nb' || n.type === 'item') { ctx.fillText(txt, x, y + r + W / 70); } else { ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 4; ctx.fillText(txt, x, y); ctx.shadowBlur = 0; }
        ctx.globalAlpha = 1;
      });
    }
    cv.addEventListener('click', e => {
      const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * SW, y = (e.clientY - r.top) / r.height * SH; let best = null, bd = 1e9;
      graph.nodes.forEach(n => { const d = Math.hypot(n.p.x - x, n.p.y - y); if (d < bd && d < rad(n) + 3.5) { bd = d; best = n; } });
      if (!best) return;
      if (isLens()) { if (best.type === 'item') { lens.sel = lens.sel === best.k ? -1 : best.k; sfx('tick'); card(); draw(); } return; }
      if (best.type !== 'input') addWord(best.w);
    });
    if (window.ResizeObserver) new ResizeObserver(fit).observe(cv);

    /* ---------- input, tags, suggestions ---------- */
    const input = $('#wnInput'), sug = $('#wnSug');
    function say(msg, vis) { $('#wnSr').textContent = msg; $('#wnMsg').textContent = vis ? msg : ''; }
    function addWord(raw) {
      const w = N.norm(raw); if (!w) return false;
      if (!N.has(w)) { showSug(w, T('unknown', { w })); return false; }
      const name = N.word(N.id(w));
      if (inputs.some(x => x.toLowerCase() === name.toLowerCase())) { say(T('dup', { w: name }), 1); return false; }
      if (inputs.length >= MAX) { say(T('max'), 1); return false; }
      inputs.push(name); seen.add(name.toLowerCase()); sfx('tick'); input.value = ''; sug.hidden = true; refresh(); say(name); return true;
    }
    function showSug(p, msg) {
      const l = N.prefix(p, 6); if (!l.length) { sug.hidden = true; if (msg) say(msg, 1); return; }
      sug.innerHTML = l.map(w => `<button type="button" class="ex-chip" data-s="${w}">${w}</button>`).join(''); sug.hidden = false; if (msg) say(msg, 1);
    }
    function tags() {
      $('#wnSel').innerHTML = inputs.length ? inputs.map((w, i) => `<span class="wn-tag" style="--c:${INC[i % INC.length]}"><i></i>${w}<button type="button" data-rm="${i}" aria-label="${T('remove')} ${w}">✕</button></span>`).join('') + `<button type="button" class="ex-chip" data-clear>${T('reset')}</button>` : `<span class="wn-empty">${T('selEmpty')}</span>`;
    }
    input.addEventListener('input', () => { if (input.value.trim().length >= 2) showSug(input.value); else sug.hidden = true; });
    $('#wnForm').addEventListener('submit', e => { e.preventDefault(); addWord(input.value); });
    sug.addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (b) addWord(b.dataset.s); });
    $('#wnSel').addEventListener('click', e => {
      const r = e.target.closest('[data-rm]'); if (r) { inputs.splice(+r.dataset.rm, 1); sfx('close'); refresh(); }
      else if (e.target.closest('[data-clear]')) { inputs = []; pos.clear(); sfx('close'); refresh(); }
    });

    /* ---------- bars, card, list ---------- */
    function bar() {
      $('#wnProg').textContent = T('prog', { n: seen.size });
      $('#wnChips').innerHTML = `<span class="wn-empty">${T('starters')}</span>` + STARTERS.map(s => `<button type="button" class="ex-chip" data-w="${s}">${s}</button>`).join('');
    }
    function rows(list, max) { return `<ul class="wn-rows">` + list.map(x => `<li class="wn-row"><button type="button" class="ex-chip" data-w="${x.w}">${x.w}</button><span class="wn-bar"><b style="width:${Math.max(4, Math.round(x.s / max * 100))}%"></b></span><em>${x.note || Math.round(x.s)}</em></li>`).join('') + `</ul>`; }
    function card() {
      const c = $('#wnCard');
      if (isLens()) { lensCard(c); return; }
      if (mode !== 'explore' || !inputs.length) { c.hidden = true; return; }
      c.hidden = false; let h = '';
      if (inputs.length === 1) { const l = N.neighbors(inputs[0], 12); h = `<h3>${T('cardOne', { w: inputs[0] })}</h3>` + rows(l, l[0] ? l[0].s : 1) + `<p class="wn-note">${T('clickHint')}</p>`; }
      else {
        const br = N.bridges(inputs, 10), full = br.filter(b => b.hit === inputs.length);
        h = `<h3>${T('cardMany', { ws: inputs.map(w => '“' + w + '”').join(' · ') })}</h3>`;
        if (inputs.length === 2) { const d = N.weight(inputs[0], inputs[1]); h += `<p class="wn-note">${d ? T('direct', { a: inputs[0], b: inputs[1], s: d }) : T('noDirect', { a: inputs[0], b: inputs[1] })}</p>`; }
        h += br.length ? rows(br.map(b => ({ w: b.w, s: b.s, note: T('links', { k: b.hit, n: inputs.length }) })), br[0].s) : '';
        if (!full.length) h += `<p class="wn-note">${T('noBridge')}</p>`; else if (br.some(b => b.hit < inputs.length)) h += `<p class="wn-note">${T('partial')}</p>`;
        h += `<p class="wn-note">${T('clickHint')}</p>`;
      }
      c.innerHTML = h;
    }
    function dimChip(side, d) { return `<span class="wn-dim" style="--c:${DIMC[side][d]}"><i></i>${T(DIMK[d])}</span>`; }
    function lensCard(c) {
      const cc = N.lensGet(lens.concept); if (!cc) { c.hidden = true; return; }
      c.hidden = false; const hasCtx = !!N.norm(lens.ctx), side = mode, ctxLbl = hasCtx ? T('lensInCtx', { k: N.norm(lens.ctx) }) : '';
      const dims = [...new Set(shown.map(r => r.item.d))];
      let h = `<h3>${T(side === 'pos' ? 'lensTitlePos' : 'lensTitleNeg', { c: cc.name[LI()], x: ctxLbl })}</h3><div class="wn-dims">${dims.map(d => dimChip(side, d)).join('')}</div><ul class="wn-items">`;
      shown.forEach(r => {
        const on = lens.sel === r.i;
        h += `<li class="wn-item${on ? ' on' : ''}${r.hit ? ' hit' : ''}" data-it="${r.i}" style="--c:${DIMC[side][r.item.d]}"><b>${r.item.l[LI()]}</b> ${dimChip(side, r.item.d)}${r.hit ? `<em class="wn-fit">✓ ${T('lensFits')}</em>` : ''}<p>${r.item.e[LI()]}</p></li>`;
      });
      h += `</ul>`;
      const tension = cc.x.map(k => N.lensGet(k)).filter(Boolean);
      if (tension.length) h += `<p class="wn-note">${T('lensTension')}: ` + tension.map(o => `<button type="button" class="ex-chip" data-lc="${o.k}">${o.name[LI()]}</button>`).join(' ') + `</p>`;
      if (hasCtx && !N.ctxTag(lens.ctx)) h += `<p class="wn-note">${T('lensWeak')}</p>`;
      if (N.has(cc.k)) h += `<p class="wn-note"><button type="button" class="ex-chip" data-direct="${cc.k}">${T('seeDirect', { w: cc.k })}</button></p>`;
      h += `<p class="wn-note">${T('lensClick')} ${T('lensAuthor')}</p>`;
      c.innerHTML = h;
    }
    $('#wnCard').addEventListener('click', e => {
      const it = e.target.closest('[data-it]'), lc = e.target.closest('[data-lc]'), d = e.target.closest('[data-direct]');
      if (it) { lens.sel = lens.sel === +it.dataset.it ? -1 : +it.dataset.it; card(); draw(); }
      else if (lc) { lens.concept = lc.dataset.lc; lens.sel = -1; sfx('tick'); lensBar(); refresh(); }
      else if (d) { loadWords([d.dataset.direct]); setMode('explore'); }
    });
    function lensBar() {
      const b = $('#wnLens'), cur = lens.concept;
      b.innerHTML = `<div class="wn-lrow"><span class="wn-empty">${T('lensConcept')}:</span>` + N.lensList().map(c => `<button type="button" class="ex-chip${cur === c.k ? ' on' : ''}" data-lc="${c.k}">${c.name[LI()]}</button>`).join('') + `</div>
        <div class="wn-lrow"><span class="wn-empty">${T('lensCtx')}:</span><button type="button" class="ex-chip${!lens.ctx ? ' on' : ''}" data-lx="">${T('lensNone')}</button>` + N.CTX_CHOICES.map(w => `<button type="button" class="ex-chip${N.norm(lens.ctx) === w ? ' on' : ''}" data-lx="${w}">${w}</button>`).join('') + `<input id="wnLx" type="text" maxlength="24" spellcheck="false" placeholder="${T('lensCtxPh')}" value="${N.CTX_CHOICES.includes(N.norm(lens.ctx)) ? '' : lens.ctx}"></div>
        ${cur ? '' : `<p class="wn-note">${T('lensPick')}</p>`}`;
    }
    $('#wnLens').addEventListener('click', e => {
      const lc = e.target.closest('[data-lc]'), lx = e.target.closest('[data-lx]');
      if (lc) { lens.concept = lc.dataset.lc; lens.sel = -1; sfx('tick'); lensBar(); refresh(); }
      else if (lx) { lens.ctx = lx.dataset.lx; lens.sel = -1; sfx('tick'); lensBar(); refresh(); }
    });
    $('#wnLens').addEventListener('change', e => {
      if (e.target.id !== 'wnLx') return; const v = N.norm(e.target.value);
      lens.ctx = v; lens.sel = -1; if (v && !N.has(v) && !N.ctxTag(v)) say(T('unknown', { w: v }), 1); else say('', 0); lensBar(); refresh();
    });
    function list() {
      $('#wnList').innerHTML = `<h3>${T('pairsT')}</h3><p class="ex-hint">${T('pairsAsk')}</p><div class="wn-pairs">` + PAIRS.map((p, i) => `<button type="button" class="ex-chip" data-pair="${i}">${p[0]} + ${p[1]}</button>`).join('') + '</div>';
    }
    $('#wnChips').addEventListener('click', e => { const b = e.target.closest('[data-w]'); if (b) addWord(b.dataset.w); });
    $("#wnCard").addEventListener("click", e => { const b = e.target.closest("[data-w]"); if (b && !isLens()) addWord(b.dataset.w); });
    $('#wnList').addEventListener('click', e => { const b = e.target.closest('[data-pair]'); if (b) { loadWords(PAIRS[+b.dataset.pair]); setMode('explore'); } });
    function loadWords(ws) { inputs = []; pos.clear(); ws.forEach(w => { if (N.has(w)) { inputs.push(N.word(N.id(w))); seen.add(w.toLowerCase()); } }); refresh(); }
    function refresh() { tags(); bar(); build(); card(); relayout(); }

    /* ---------- predict mode ---------- */
    function makeRound() {
      const out = []; let guard = 0;
      while (out.length < ROUNDS && guard++ < 50) {
        const r = out.length % 2 === 0 ? N.quizTop(STARTERS.concat(PAIRS.flat())) : N.quizBridge(PAIRS);
        if (r && !out.some(o => o.kind === r.kind && (o.cue || o.pair.join()) === (r.cue || r.pair.join()))) out.push(r);
      }
      return { qs: out, i: 0, score: 0, fb: null };
    }
    function quiz() {
      const b = $('#wnBox');
      if (mode !== 'quiz') { b.innerHTML = mode === 'explore' ? `<p class="ex-hint">💡 ${T('hint')}</p>` : ''; return; }
      if (!q) q = makeRound();
      const n = q.qs.length;
      if (q.i >= n) { b.innerHTML = `<div class="ex-rc"><h2>${T('rsTitle')}</h2><p class="ex-big"><b>${T('rsScore', { s: q.score, m: n })}</b></p><p>${q.score >= n * .6 ? T('rsRead') : T('rsLow')}</p><div class="ex-end"><button type="button" class="ex-main" data-act="again">${T('again')}</button><button type="button" data-act="explore">${T('backExp')}</button></div></div>`; return; }
      const r = q.qs[q.i], fb = q.fb, ask = r.kind === 'top' ? T('qTop', { w: r.cue }) : T('qBridge', { a: r.pair[0], b: r.pair[1] });
      b.innerHTML = `<div class="ex-qc"><div class="ex-hud"><span class="ex-pill">${T('qN', { n: q.i + 1, m: n })}</span><span class="ex-pill ex-pill-b">${T('qScore', { s: q.score })}</span></div>
        <h3>${ask}</h3><div class="ex-opts">${r.options.map((o, i) => `<button type="button" class="ex-opt${fb ? (o === r.answer ? ' ok' : o === fb.picked ? ' bad' : '') : ''}" data-o="${o}"${fb ? ' disabled' : ''}><i>${'ABCD'[i]}</i><span>${o}</span></button>`).join('')}</div>
        ${fb ? `<p class="ex-fb ${fb.ok ? 'ok' : 'bad'}">${fb.ok ? T('ok') : T('bad', { ans: r.answer })}</p><div class="ex-end"><button type="button" data-act="see">${T('seeIn')}</button><button type="button" class="ex-main" data-act="next">${q.i === n - 1 ? T('seeRes') : T('next')}</button></div>` : ''}</div>`;
    }
    function setMode(m) {
      const prev = mode; mode = m; q = null; sug.hidden = true; say('', 0);
      ['Exp:explore', 'Pos:pos', 'Neg:neg', 'Qz:quiz'].forEach(x => { const [id, k] = x.split(':'); $('#wn' + id).classList.toggle('on', m === k); });
      if (isLens() && !lens.concept) { const k = inputs.map(w => w.toLowerCase()).find(w => N.lensGet(w)); if (k) lens.concept = k; }
      $('#wnStage').closest('.ex-sw').style.display = m === 'quiz' ? 'none' : '';
      $('#wnForm').style.display = $('#wnSel').style.display = m === 'explore' ? '' : 'none';
      $('#wnLens').hidden = !isLens(); if (isLens()) lensBar();
      $('.ex-bar').style.display = $('#wnList').style.display = m === 'explore' ? '' : 'none';
      if (prev !== m) { pos.clear(); }
      build(); card(); quiz(); sfx('tick'); if (m !== 'quiz') { fit(); relayout(); }
    }
    $('#wnExp').addEventListener('click', () => setMode('explore')); $('#wnQz').addEventListener('click', () => setMode('quiz')); $('#wnPos').addEventListener('click', () => setMode('pos')); $('#wnNeg').addEventListener('click', () => setMode('neg'));
    $('#wnBox').addEventListener('click', e => {
      const o = e.target.closest('[data-o]'), a = e.target.closest('[data-act]');
      if (o && q && !q.fb) { const r = q.qs[q.i], ok = o.dataset.o === r.answer; q.fb = { ok, picked: o.dataset.o }; if (ok) q.score++; sfx(ok ? 'ok' : 'lose'); quiz(); }
      else if (a) {
        const k = a.dataset.act;
        if (k === 'next') { q.i++; q.fb = null; quiz(); } else if (k === 'again') { q = null; quiz(); }
        else if (k === 'see') { const r = q.qs[q.i]; const ws = r.kind === 'top' ? [r.cue] : r.pair; setMode('explore'); loadWords(ws); }
        else setMode('explore');
      }
    });

    /* ---------- info button + guide pop-up ---------- */
    const guide = $('#wnGuide');
    function showGuide() {
      guide.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="wnGdT"><button type="button" class="gx" data-gclose aria-label="${T('close')}">✕</button><h3 id="wnGdT">${T('guideT')}</h3><ul><li>${T('g1')}</li><li>${T('g2')}</li><li>${T('g3')}</li></ul><button type="button" class="ex-main" data-gclose>${T('gotIt')}</button></div>`;
      guide.hidden = false; sfx('open');
    }
    const closeGuide = () => { if (!guide.hidden) { guide.hidden = true; sfx('close'); } };
    guide.addEventListener('click', e => { if (e.target === guide || e.target.closest('[data-gclose]')) closeGuide(); });
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && !guide.hidden) { closeGuide(); e.stopPropagation(); } });
    $('#wnInfo').addEventListener('click', () => { guide.hidden ? showGuide() : closeGuide(); });

    tags(); bar(); list(); quiz(); build();
    this._wn = { fit, relabel() { tags(); bar(); list(); if (isLens()) { lensBar(); build(); } card(); quiz(); draw(); }, load: loadWords, state: () => ({ inputs, graph, mode }) };
    window.__wn = this._wn;
  },
  onShow() { const m = this._wn; if (m) { m.fit(); } },
  onLang() { const m = this._wn; if (m) m.relabel(); }
});
