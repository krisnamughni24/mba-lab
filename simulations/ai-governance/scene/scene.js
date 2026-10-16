/* AI Governance stage. MBALAB.govScene(canvas) -> { setMode, setCase, setLabels, setDesign, setRisk, setMonths, emit, setTheme, reset, start, stop, draw, running }
   Logical size 960x540. Top: the AI pipeline (data -> model -> decision -> people) with a slot for every control above its stage; decisions flow through as dots,
   incidents leak out of a stage as red drops, risks stopped by a control spark on its shield. Bottom: risk bars (assess/design) or the monthly value-vs-harm chart (run). */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2, CY = '#2bb6e8', GRN = '#34d399', RED = '#ff4d6d', AMB = '#ffb020', VI = '#a78bfa', MG = '#ff6ad5';
  const PAL = {
    day:   { bg0: '#e8f4ff', bg1: '#f7fbff', card: '#ffffff', line: 'rgba(30,60,120,.22)', ink: '#0b1b3f', dim: 'rgba(11,27,63,.58)', grid: 'rgba(30,60,120,.12)', bar: '#c9d6ee', node: '#f1f6ff' },
    night: { bg0: '#0a0f3a', bg1: '#161b55', card: '#1b2160', line: 'rgba(140,180,255,.28)', ink: '#ffffff', dim: 'rgba(255,255,255,.62)', grid: 'rgba(140,180,255,.14)', bar: '#38408a', node: '#232a74' }
  };
  const rr = (c, x, y, w, h, r) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
  const lerp = (a, b, k) => a + (b - a) * k, FONT = 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif', EMO = '"Apple Color Emoji","Segoe UI Emoji",sans-serif';
  const NX = [130, 370, 610, 850], NY = 214, NW = 164, NH = 112, BY = 120, BR = 19;          /* node centres, node size, badge row and radius */
  const CH = { x0: 74, x1: 925, y0: 384, y1: 506 };
  const DSTAGE = { priv: 0, bias: 1, sec: 1, safety: 2, trans: 3 }, DCOL = { bias: MG, priv: VI, safety: RED, sec: AMB, trans: CY };
  const NICON = ['🗄️', '🧠', '⚖️', '👥'];

  function create(cv) {
    const ctx = cv.getContext('2d'), E = MBALAB.gov;
    let raf = 0, last = 0, T = 0, running = false, day = false, mode = 'brief', cs = null, design = [], inh = null, res = null, months = [], showAudit = null;
    let L = { nodes: ['Data', 'Model', 'Decision', 'People'], value: 'Value', harm: 'Harm', risk: 'Risk', inh: 'before controls', res: 'after controls', dims: {}, audit: 'Audit', stop: 'Stopped', month: 'M' };
    const parts = [], queue = [], floats = [], sparks = [], drops = [];
    const ink = () => PAL[day ? 'day' : 'night'];
    const stageCtl = s => E.CTRL.filter(c => c.stage === s);
    const badgePos = (c) => { const arr = stageCtl(c.stage), i = arr.indexOf(c), n = arr.length, gap = 48; return { x: NX[c.stage] + (i - (n - 1) / 2) * gap, y: BY }; };
    const text = (c, s, x, y, size, col, al, w) => { c.font = (w || 700) + ' ' + size + 'px ' + FONT; c.fillStyle = col; c.textAlign = al || 'left'; c.textBaseline = 'alphabetic'; c.fillText(s, x, y); };

    function emit(rec, dur) {
      const n = rec.value > 0 ? 14 : 0; for (let i = 0; i < n; i++) queue.push({ t: T + Math.random() * dur * .8, kind: 'flow' });
      rec.inc.forEach(x => queue.push({ t: T + dur * (.15 + Math.random() * .6), kind: 'inc', dim: x.dim, cost: x.cost }));
      E.DIMS.forEach(d => { for (let i = 0; i < (rec.blocked[d] || 0); i++) queue.push({ t: T + Math.random() * dur * .8, kind: 'blk', dim: d }); });
      queue.push({ t: T + dur * .85, kind: 'tot', value: rec.value, harm: rec.harm });
    }
    function fire(q) {
      if (q.kind === 'flow') parts.push({ x: 34, y: NY + (Math.random() - .5) * 34, v: 150 + Math.random() * 40 });
      else if (q.kind === 'inc') { const s = DSTAGE[q.dim]; drops.push({ x: NX[s] + (Math.random() - .5) * 60, y: NY + NH / 2, vy: 0, dim: q.dim, t: 0 }); floats.push({ x: NX[s], y: NY + NH / 2 + 26, txt: '−' + Math.round(q.cost), col: RED, t: 0, ico: '⚠️' }); }
      else if (q.kind === 'blk') { const arr = E.CTRL.filter(c => design.includes(c.id) && c.stage === DSTAGE[q.dim] && c.m[q.dim]); if (arr.length) { const b = badgePos(arr[Math.floor(Math.random() * arr.length)]); sparks.push({ x: b.x, y: b.y, t: 0, col: DCOL[q.dim] }); } }
      else if (q.kind === 'tot') { if (q.value > 0) floats.push({ x: NX[3], y: NY - NH / 2 - 4, txt: '+' + Math.round(q.value), col: GRN, t: 0 }); }
    }
    function update(dt) {
      T += dt;
      for (let i = queue.length - 1; i >= 0; i--) if (queue[i].t <= T) { fire(queue[i]); queue.splice(i, 1); }
      for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.x += p.v * dt; if (p.x > NX[3] + NW / 2 - 10) parts.splice(i, 1); }
      for (let i = drops.length - 1; i >= 0; i--) { const d = drops[i]; d.t += dt; d.vy += 420 * dt; d.y += d.vy * dt; if (d.y > CH.y0 - 6) drops.splice(i, 1); }
      for (let i = floats.length - 1; i >= 0; i--) { floats[i].t += dt; if (floats[i].t > 1.2) floats.splice(i, 1); }
      for (let i = sparks.length - 1; i >= 0; i--) { sparks[i].t += dt * 2.4; if (sparks[i].t > 1) sparks.splice(i, 1); }
    }

    /* ---------- pipeline ---------- */
    function pipeline(c) {
      const P = ink(), live = mode === 'run' || mode === 'result';
      c.lineCap = 'round'; c.lineWidth = 5; c.strokeStyle = P.line; c.setLineDash([2, 10]); c.beginPath(); c.moveTo(30, NY); c.lineTo(W - 30, NY); c.stroke(); c.setLineDash([]);
      parts.forEach(p => { c.fillStyle = CY; c.beginPath(); c.arc(p.x, p.y, 4, 0, TAU); c.fill(); });
      drops.forEach(d => { c.fillStyle = DCOL[d.dim]; c.beginPath(); c.arc(d.x, d.y, 5, 0, TAU); c.fill(); });
      NX.forEach((x, i) => {
        c.save(); c.shadowColor = 'rgba(80,120,255,.35)'; c.shadowBlur = 12; c.fillStyle = P.node; rr(c, x - NW / 2, NY - NH / 2, NW, NH, 18); c.fill(); c.restore();
        c.lineWidth = 3; c.strokeStyle = P.line; rr(c, x - NW / 2, NY - NH / 2, NW, NH, 18); c.stroke();
        c.font = '46px ' + EMO; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = P.ink; c.fillText(NICON[i], x, NY - 12);
        text(c, L.nodes[i], x, NY + NH / 2 - 13, 18, P.ink, 'center', 800);
      });
      /* control slots */
      E.CTRL.forEach(k => {
        const b = badgePos(k), on = design.includes(k.id); c.save();
        if (on) { c.shadowColor = GRN; c.shadowBlur = 14; c.fillStyle = P.card; c.beginPath(); c.arc(b.x, b.y, BR, 0, TAU); c.fill(); c.shadowBlur = 0; c.lineWidth = 3; c.strokeStyle = GRN; c.stroke(); c.font = '22px ' + EMO; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = P.ink; c.fillText(k.icon, b.x, b.y + 1); c.beginPath(); c.moveTo(b.x, b.y + BR); c.lineTo(b.x, NY - NH / 2); c.lineWidth = 2; c.strokeStyle = GRN; c.globalAlpha = .6; c.stroke(); }
        else { c.lineWidth = 2; c.setLineDash([3, 4]); c.strokeStyle = P.line; c.beginPath(); c.arc(b.x, b.y, BR, 0, TAU); c.stroke(); c.setLineDash([]); c.globalAlpha = .38; c.font = '19px ' + EMO; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = P.ink; c.fillText(k.icon, b.x, b.y + 1); }
        c.restore();
      });
      sparks.forEach(s => { c.globalAlpha = 1 - s.t; c.lineWidth = 3; c.strokeStyle = s.col; c.beginPath(); c.arc(s.x, s.y, BR + s.t * 20, 0, TAU); c.stroke(); }); c.globalAlpha = 1;
      floats.forEach(f => { c.globalAlpha = Math.max(0, 1 - f.t / 1.2); text(c, f.txt, f.x, f.y + (f.col === GRN ? -f.t * 26 : f.t * 18), 20, f.col, 'center', 900); }); c.globalAlpha = 1;
      if (cs && cs.ban && months.length >= E.BAN_STOP && live) { c.save(); c.translate(W / 2, 62); c.rotate(-.04); c.fillStyle = RED; rr(c, -120, -20, 240, 40, 10); c.fill(); text(c, '⛔ ' + L.stop, 0, 7, 20, '#fff', 'center', 900); c.restore(); }
    }
    /* ---------- bottom: risk bars ---------- */
    function riskBars(c) {
      const P = ink(); if (!inh) return;
      text(c, L.risk, CH.x0, CH.y0 - 6, 15, P.dim, 'left', 700);
      c.fillStyle = P.dim; c.globalAlpha = .8; c.fillRect(CH.x1 - 258, CH.y0 - 15, 20, 5); c.globalAlpha = 1; text(c, L.inh, CH.x1 - 232, CH.y0 - 6, 13, P.dim, 'left', 600);
      E.DIMS.forEach((d, i) => {
        const y = CH.y0 + 6 + i * 25, x0 = 250, wMax = CH.x1 - 60 - x0, a = inh[d], b = res ? res[d] : a;
        const lab = L.dims[d] || d; c.font = '700 15px ' + FONT; const fs = c.measureText(lab).width > 168 ? 13 : 15; text(c, lab, CH.x0 + 4, y + 15, fs, P.ink, 'left', 700);
        c.fillStyle = P.bar; c.globalAlpha = .5; rr(c, x0, y, wMax, 19, 9); c.fill(); c.globalAlpha = 1;
        c.fillStyle = DCOL[d]; c.globalAlpha = .28; rr(c, x0, y, Math.max(8, wMax * a), 19, 9); c.fill(); c.globalAlpha = 1;
        const w = Math.max(8, wMax * b); c.fillStyle = b < .25 ? GRN : b < .5 ? AMB : RED; rr(c, x0, y, w, 19, 9); c.fill();
        text(c, Math.round(b * 100) + '%', x0 + wMax + 10, y + 15, 15, P.ink, 'left', 800);
      });
    }
    /* ---------- bottom: monthly chart ---------- */
    function monthChart(c) {
      const P = ink(), n = E.MONTHS, x0 = CH.x0 + 6, x1 = CH.x1, bw = (x1 - x0) / n, base = CH.y0 + 56;
      const mx = Math.max(cs ? cs.V : 100, ...months.map(m => m.value), 1), mh = Math.max(cs ? cs.V * .9 : 100, ...months.map(m => Math.min(m.harm, cs.V * 3)));
      text(c, '▲ ' + L.value, CH.x0, CH.y0 - 6, 15, GRN, 'left', 800); text(c, '▼ ' + L.harm, CH.x0 + 110, CH.y0 - 6, 15, RED, 'left', 800);
      c.strokeStyle = P.ink; c.globalAlpha = .35; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, base); c.lineTo(x1, base); c.stroke(); c.globalAlpha = 1;
      for (let i = 0; i < n; i++) {
        const x = x0 + i * bw, m = months[i]; text(c, L.month + (i + 1), x + bw / 2, CH.y1 + 12, 12, P.dim, 'center', 600);
        if (!m) { c.fillStyle = P.bar; c.globalAlpha = .4; c.fillRect(x + bw * .3, base - 3, bw * .4, 6); c.globalAlpha = 1; continue; }
        const vh = Math.min(50, m.value / mx * 50), hh = Math.min(62, m.harm / mh * 62);
        c.fillStyle = GRN; rr(c, x + bw * .16, base - vh, bw * .34, Math.max(2, vh), 4); c.fill(); c.fillStyle = RED; rr(c, x + bw * .5, base + 1, bw * .34, Math.max(m.harm > 0 ? 3 : 0, hh), 4); c.fill();
        if (m.audit) { c.font = '17px ' + EMO; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(m.audit.ban ? '⛔' : '🔎', x + bw / 2, CH.y0 + 6); }
      }
    }
    function draw() {
      const P = ink(), s = cv.width / W; ctx.setTransform(s, 0, 0, s, 0, 0);
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, P.bg0); g.addColorStop(1, P.bg1); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = P.card; ctx.globalAlpha = .55; rr(ctx, 14, CH.y0 - 30, W - 28, CH.y1 - CH.y0 + 52, 14); ctx.fill(); ctx.globalAlpha = 1;
      pipeline(ctx); if (mode === 'run' || mode === 'result') monthChart(ctx); else riskBars(ctx);
    }
    function loop(now) { if (!running) return; raf = requestAnimationFrame(loop); const dt = Math.min(.05, (now - last) / 1000 || 0); last = now; update(dt); draw(); }
    return {
      setMode(m) { mode = m; draw(); }, setCase(c) { cs = c; draw(); }, setLabels(l) { Object.assign(L, l); draw(); },
      setDesign(d) { design = d.slice(); draw(); }, setRisk(a, b) { inh = a; res = b; draw(); }, setMonths(m) { months = m; draw(); },
      emit, setTheme(d) { day = !!d; draw(); },
      reset() { parts.length = 0; queue.length = 0; floats.length = 0; sparks.length = 0; drops.length = 0; months = []; draw(); },
      start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }, stop() { running = false; cancelAnimationFrame(raf); }, draw, get running() { return running; }
    };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.govScene = create;
})();
