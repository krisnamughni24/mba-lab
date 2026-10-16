/* A/B Testing stage. MBALAB.abScene(canvas) -> { setMode, setCase, setLabels, setPlan, setPreview, setHist, setCounts, emit, reveal, pulse, setTheme, start, stop, draw, running }
   Logical size 960x540. Top: the arena (visitors drop through a splitter into page A and page B, converting visitors turn gold) or, while planning,
   the two bell curves of the test (alpha, power). Bottom: the lift chart, a 95% interval that narrows as data arrives. */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2, CA = '#2bb6e8', CB = '#ff6ad5', GOLD = '#ffb020', GRN = '#34d399', RED = '#ff4d6d';
  const PAL = {
    day:   { bg0: '#e8f4ff', bg1: '#f7fbff', card: '#ffffff', line: 'rgba(30,60,120,.22)', ink: '#0b1b3f', dim: 'rgba(11,27,63,.55)', grid: 'rgba(30,60,120,.10)', wk: 'rgba(255,176,32,.12)', bar: '#c9d6ee' },
    night: { bg0: '#0a0f3a', bg1: '#161b55', card: '#1b2160', line: 'rgba(140,180,255,.25)', ink: '#ffffff', dim: 'rgba(255,255,255,.6)', grid: 'rgba(140,180,255,.12)', wk: 'rgba(255,176,32,.10)', bar: '#38408a' }
  };
  const rr = (c, x, y, w, h, r) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
  const lerp = (a, b, k) => a + (b - a) * k, FONT = 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif', EMO = '"Apple Color Emoji","Segoe UI Emoji",sans-serif';
  const PG = { A: { x: 70, y: 150, w: 330, h: 170 }, B: { x: 560, y: 150, w: 330, h: 170 } };      /* the two pages */
  const SRC = { x: 480, y: 34 }, FORK = { x: 480, y: 118 }, CH = { x0: 74, x1: 925, y0: 372, y1: 520 };

  function create(cv) {
    const ctx = cv.getContext('2d'), E = MBALAB.ab;
    let raf = 0, last = 0, T = 0, running = false, day = false, mode = 'brief', cs = null, idea = null, planDays = 14, mde = .1, truth = null, win = null;
    let L = { a: 'A', b: 'B', conv: 'conv.', chart: '', mde: 'MDE', truth: 'truth', days: 'days', h0: '', h1: '', alpha: 'α', pow: 'power', beta: 'β', crit: '', visitors: '' };
    let hist = [], prev = null, pw = .8, seNow = .01, effZ = 2.8;
    const cnt = { A: { n: 0, c: 0, d: 0 }, B: { n: 0, c: 0, d: 0 } };
    const parts = [], queue = [], floats = [], pulses = []; let curDay = 0, yr = .35, glow = 0;

    const pos = (g, k) => { const p = PG[g]; return { x: p.x + p.w * (.2 + .6 * k), y: p.y - 3 }; };
    function emit(rec, dur) {
      const M = Math.max(8, Math.min(64, Math.round(Math.sqrt(rec.nA + rec.nB) * 1.2))), fa = rec.nA / (rec.nA + rec.nB || 1), pa = rec.cA / Math.max(1, rec.nA), pb = rec.cB / Math.max(1, rec.nB);
      for (let i = 0; i < M; i++) { const g = Math.random() < fa ? 'A' : 'B'; queue.push({ t: T + Math.random() * dur * .85, g, conv: Math.random() < (g === 'A' ? pa : pb) }); }
    }
    function spawn(q) { parts.push({ g: q.g, conv: q.conv, t: 0, x: SRC.x, y: SRC.y, k: Math.random(), s: .8 + Math.random() * .5 }); }
    function updateParts(dt) {
      for (let i = queue.length - 1; i >= 0; i--) if (queue[i].t <= T) { spawn(queue[i]); queue.splice(i, 1); }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.t += dt * (.7 * p.s);
        const tg = pos(p.g, p.k), side = p.g === 'A' ? -1 : 1;
        if (p.t < .35) { const k = p.t / .35; p.x = lerp(SRC.x, FORK.x, k); p.y = lerp(SRC.y, FORK.y, k); }
        else if (p.t < 1) { const k = (p.t - .35) / .65, e = k * k * (3 - 2 * k); p.x = lerp(FORK.x, tg.x, e) + Math.sin(k * Math.PI) * side * 20; p.y = lerp(FORK.y, tg.y, e); }
        else if (!p.done) { p.done = true; if (p.conv) { floats.push({ x: PG[p.g].x + 20 + (p.g === 'B' ? 66 : 48), y: PG[p.g].y + 104, g: p.g, t: 0 }); pulses.push({ g: p.g, t: 0 }); } }
        if (p.t > 1.45) parts.splice(i, 1);
      }
      for (let i = floats.length - 1; i >= 0; i--) { floats[i].t += dt; if (floats[i].t > 1.1) floats.splice(i, 1); }
      for (let i = pulses.length - 1; i >= 0; i--) { pulses[i].t += dt * 3; if (pulses[i].t > 1) pulses.splice(i, 1); }
    }
    const ink = () => PAL[day ? 'day' : 'night'];

    /* ---------- pieces ---------- */
    function text(c, s, x, y, size, col, al, w) { c.font = (w || 700) + ' ' + size + 'px ' + FONT; c.fillStyle = col; c.textAlign = al || 'left'; c.textBaseline = 'alphabetic'; c.fillText(s, x, y); }
    function page(c, g) {
      const p = PG[g], P = ink(), col = g === 'A' ? CA : CB, d = cnt[g], rate = d.n ? d.c / d.n : 0;
      const bump = pulses.filter(q => q.g === g).reduce((m, q) => Math.max(m, 1 - q.t), 0);
      c.save(); c.shadowColor = col; c.shadowBlur = 10 + bump * 18 + (win === g ? 26 : 0); c.fillStyle = P.card; rr(c, p.x, p.y, p.w, p.h, 16); c.fill(); c.restore();
      c.lineWidth = win === g ? 5 : 3; c.strokeStyle = col; rr(c, p.x, p.y, p.w, p.h, 16); c.stroke();
      c.fillStyle = col; c.globalAlpha = .9; rr(c, p.x, p.y, p.w, 30, 16); c.fill(); c.fillRect(p.x, p.y + 16, p.w, 14); c.globalAlpha = 1;
      [0, 1, 2].forEach(i => { c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(p.x + 18 + i * 14, p.y + 15, 4, 0, TAU); c.fill(); });
      text(c, g === 'A' ? L.a : L.b, p.x + p.w - 14, p.y + 22, 17, '#06122a', 'right', 900);
      c.fillStyle = P.bar; rr(c, p.x + 20, p.y + 44, p.w * .42, 11, 5); c.fill(); rr(c, p.x + 20, p.y + 62, p.w * .3, 9, 4); c.fill();
      c.fillStyle = col; c.globalAlpha = .22; rr(c, p.x + p.w * .58, p.y + 42, p.w * .36, 42, 10); c.fill(); c.globalAlpha = 1;
      const bw = 96 + (g === 'B' ? 18 : 0), bx = p.x + 20, by = p.y + 90 - 0, sc = 1 + bump * .08;
      c.save(); c.translate(bx + bw / 2, by + 16); c.scale(sc, sc); c.fillStyle = g === 'A' ? '#6b7fb0' : CB; rr(c, -bw / 2, -16, bw, 32, 10); c.fill();
      c.font = '20px ' + EMO; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillStyle = '#fff'; c.fillText(g === 'A' ? '🛒' : (idea ? idea.emoji || '✨' : '✨'), 0, 6); c.restore();
      const cy = p.y + p.h - 44;
      text(c, (rate * 100).toFixed(rate < .1 ? 2 : 1) + '%', p.x + 20, cy + 22, 32, P.ink, 'left', 900);
      text(c, d.c.toLocaleString() + ' / ' + d.n.toLocaleString(), p.x + p.w - 16, cy + 6, 15, P.dim, 'right', 600);
      text(c, L.conv, p.x + p.w - 16, cy + 24, 14, P.dim, 'right', 600);
    }
    function arena(c) {
      const P = ink();
      c.save(); c.shadowColor = '#7c5cff'; c.shadowBlur = 14; c.fillStyle = P.card; c.beginPath(); c.arc(SRC.x, SRC.y, 26, 0, TAU); c.fill(); c.restore();
      c.font = '28px ' + EMO; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = P.ink; c.fillText('👥', SRC.x, SRC.y + 1);
      c.lineWidth = 4; c.lineCap = 'round'; c.strokeStyle = P.line; c.setLineDash([2, 9]);
      [['A', -1], ['B', 1]].forEach(([g, s]) => { const t = pos(g, .5); c.beginPath(); c.moveTo(FORK.x, FORK.y); c.quadraticCurveTo(FORK.x + s * 80, FORK.y + 10, t.x, t.y); c.stroke(); });
      c.beginPath(); c.moveTo(SRC.x, SRC.y + 26); c.lineTo(FORK.x, FORK.y); c.stroke(); c.setLineDash([]);
      c.fillStyle = '#7c5cff'; c.beginPath(); c.arc(FORK.x, FORK.y, 12, 0, TAU); c.fill(); text(c, '50/50', FORK.x, FORK.y - 22, 13, P.dim, 'center', 700);
      page(c, 'A'); page(c, 'B');
      parts.forEach(p => { const a = p.t < 1 ? 1 : Math.max(0, 1 - (p.t - 1) / .45), col = p.t >= 1 && p.conv ? GOLD : (p.g === 'A' ? CA : CB); c.globalAlpha = a * (p.t >= 1 && !p.conv ? .5 : 1); c.fillStyle = p.t >= 1 && !p.conv ? '#9aa6c8' : col; c.beginPath(); c.arc(p.x, p.y, p.t >= 1 && p.conv ? 3.5 + (p.t - 1) * 5 : 3, 0, TAU); c.fill(); });
      c.globalAlpha = 1;
      floats.forEach(f => { const y = f.y - f.t * 30; c.globalAlpha = Math.max(0, 1 - f.t / 1.1); c.font = '16px ' + EMO; c.textAlign = 'center'; c.fillStyle = GOLD; c.fillText('🪙', f.x, y); }); c.globalAlpha = 1;
    }
    /* the two bell curves: H0 (no difference) and H1 (B really is better by the planned lift) */
    function bells(c) {
      const P = ink(), x0 = 60, x1 = 900, yb = 292, hh = 190, zmin = -3.6, zmax = Math.max(6, effZ + 3.6), X = z => x0 + (z - zmin) / (zmax - zmin) * (x1 - x0), Y = (z, m) => yb - E.pdf(z - m) / .3989 * hh, zc = E.Z;
      const area = (m, a, b, col, al) => { c.beginPath(); c.moveTo(X(a), yb); for (let z = a; z <= b + 1e-9; z += .05) c.lineTo(X(z), Y(z, m)); c.lineTo(X(b), yb); c.closePath(); c.fillStyle = col; c.globalAlpha = al; c.fill(); c.globalAlpha = 1; };
      c.strokeStyle = P.line; c.lineWidth = 2; c.beginPath(); c.moveTo(x0 - 10, yb); c.lineTo(x1 + 10, yb); c.stroke();
      area(0, zmin, zmax, CA, .16); area(effZ, zmin, zmax, CB, .16); area(effZ, zc, zmax, GRN, .55); area(effZ, zmin, zc, GOLD, .28); area(0, zc, zmax, RED, .7); area(0, zmin, -zc, RED, .7);
      [[0, CA], [effZ, CB]].forEach(([m, col]) => { c.beginPath(); for (let z = zmin; z <= zmax; z += .05) { const px = X(z), py = Y(z, m); z === zmin ? c.moveTo(px, py) : c.lineTo(px, py); } c.strokeStyle = col; c.lineWidth = 3.5; c.stroke(); });
      c.setLineDash([6, 6]); c.strokeStyle = P.ink; c.lineWidth = 2; c.beginPath(); c.moveTo(X(zc), yb + 6); c.lineTo(X(zc), 36); c.stroke(); c.setLineDash([]);
      text(c, L.crit, X(zc) + 8, 50, 15, P.ink, 'left', 700); text(c, L.h0, X(0), yb + 26, 17, CA, 'center', 800); text(c, L.h1, X(effZ), yb + 26, 17, CB, 'center', 800);
      text(c, L.alpha, X(zc + .6), yb - 16, 15, RED, 'left', 800); text(c, L.beta, X(zc - 1.1), yb - 26, 15, GOLD, 'right', 800);
      const g = Math.round(pw * 100); c.save(); c.shadowColor = pw >= .8 ? GRN : GOLD; c.shadowBlur = 16; text(c, g + '%', x1 - 6, 98, 64, pw >= .8 ? GRN : GOLD, 'right', 900); c.restore(); text(c, L.pow, x1 - 6, 124, 17, P.dim, 'right', 700);
    }
    /* the lift chart */
    function chart(c) {
      const P = ink(), { x0, x1, y0, y1 } = CH, nd = Math.max(1, planDays), X = d => x0 + d / nd * (x1 - x0);
      let need = Math.max(.3, mde * 1.4, truth == null ? 0 : Math.abs(truth) * 1.4); hist.forEach(h => { need = Math.max(need, Math.min(.9, Math.abs(h.lift) * 1.1), Math.min(.9, Math.abs(h.hi) * .5), Math.min(.9, Math.abs(h.lo) * .5)); }); yr = lerp(yr, Math.min(.9, need), .08);
      const Y = v => lerp((y0 + y1) / 2, y0, Math.max(-1.2, Math.min(1.2, v / yr)));
      c.fillStyle = 'rgba(0,0,0,.0)'; text(c, L.chart, x0, y0 - 12, 15, P.dim, 'left', 700);
      for (let d = 0; d < nd; d++) if (E.isWeekend(d)) { c.fillStyle = P.wk; c.fillRect(X(d), y0, X(d + 1) - X(d), y1 - y0); }
      c.strokeStyle = P.grid; c.lineWidth = 1; [-.5, .5].forEach(k => { c.beginPath(); c.moveTo(x0, Y(k * yr)); c.lineTo(x1, Y(k * yr)); c.stroke(); text(c, (k * yr * 100).toFixed(0) + '%', x0 - 8, Y(k * yr) + 5, 13, P.dim, 'right', 600); });
      c.strokeStyle = P.ink; c.globalAlpha = .6; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, Y(0)); c.lineTo(x1, Y(0)); c.stroke(); c.globalAlpha = 1; text(c, '0%', x0 - 8, Y(0) + 5, 13, P.ink, 'right', 800);
      c.setLineDash([7, 6]); c.strokeStyle = CA; c.lineWidth = 2.2; c.beginPath(); c.moveTo(x0, Y(mde)); c.lineTo(x1, Y(mde)); c.stroke(); c.setLineDash([]); text(c, L.mde + ' +' + Math.round(mde * 100) + '%', x1 - 4, Y(mde) - 6, 14, CA, 'right', 800);
      for (let d = 0; d <= nd; d += 7) { c.strokeStyle = P.grid; c.beginPath(); c.moveTo(X(d), y0); c.lineTo(X(d), y1); c.stroke(); text(c, d + '', X(d), y1 + 16, 12, P.dim, 'center', 600); }
      text(c, L.days, x0 - 12, y1 + 16, 12, P.dim, 'right', 700);
      const ps = mode === 'plan' && prev ? prev : hist;
      if (ps.length) {
        const last = ps[ps.length - 1], col = last.lo > 0 ? GRN : last.hi < 0 ? RED : '#8aa2ff';
        c.save(); c.beginPath(); c.rect(x0, y0 - 4, x1 - x0, y1 - y0 + 8); c.clip();
        c.beginPath(); ps.forEach((h, i) => { const px = X(h.day || i + 1); i ? c.lineTo(px, Y(h.hi)) : c.moveTo(px, Y(h.hi)); }); for (let i = ps.length - 1; i >= 0; i--) c.lineTo(X(ps[i].day || i + 1), Y(ps[i].lo)); c.closePath();
        c.fillStyle = col; c.globalAlpha = mode === 'plan' ? .2 : .26; c.fill(); c.globalAlpha = 1;
        c.beginPath(); ps.forEach((h, i) => { const px = X(h.day || i + 1); i ? c.lineTo(px, Y(h.lift)) : c.moveTo(px, Y(h.lift)); }); c.strokeStyle = col; c.lineWidth = 3.4; if (mode === 'plan') c.setLineDash([8, 6]); c.stroke(); c.setLineDash([]);
        if (mode !== 'plan') { const px = X(ps.length); c.fillStyle = col; c.beginPath(); c.arc(px, Y(last.lift), 6 + Math.sin(T * 6) * 1.2, 0, TAU); c.fill(); }
        c.restore();
        if (mode !== 'plan') ps.forEach((h, i) => { if (h.sig && (i === 0 || !ps[i - 1].sig)) { c.fillStyle = RED; c.beginPath(); c.arc(X(i + 1), y0 + 8, 5.5, 0, TAU); c.fill(); } });
      }
      if (truth != null) { c.setLineDash([3, 7]); c.strokeStyle = GOLD; c.lineWidth = 3.4; c.beginPath(); c.moveTo(x0, Y(truth)); c.lineTo(x1, Y(truth)); c.stroke(); c.setLineDash([]); text(c, L.truth + ' ' + (truth >= 0 ? '+' : '') + (truth * 100).toFixed(1) + '%', x0 + 8, Y(truth) - 7, 15, GOLD, 'left', 900); }
      if (mode !== 'plan') { c.strokeStyle = P.ink; c.globalAlpha = .35; c.setLineDash([4, 6]); c.beginPath(); c.moveTo(X(nd), y0); c.lineTo(X(nd), y1); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
    }
    function draw() {
      const P = ink(), s = cv.width / W; ctx.setTransform(s, 0, 0, s, 0, 0);
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, P.bg0); g.addColorStop(1, P.bg1); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = P.card; ctx.globalAlpha = .55; rr(ctx, 14, CH.y0 - 30, W - 28, CH.y1 - CH.y0 + 52, 14); ctx.fill(); ctx.globalAlpha = 1;
      if (mode === 'plan') bells(ctx); else arena(ctx);
      chart(ctx);
    }
    function update(dt) { T += dt; updateParts(dt); ['A', 'B'].forEach(g => { cnt[g].d = lerp(cnt[g].d, cnt[g].c, Math.min(1, dt * 9)); }); }
    function loop(now) { if (!running) return; raf = requestAnimationFrame(loop); const dt = Math.min(.05, (now - last) / 1000 || 0); last = now; update(dt); draw(); }
    return {
      setMode(m) { mode = m; if (m !== 'result') win = null; if (m === 'brief' || m === 'plan') { hist = []; truth = null; } draw(); },
      setCase(c, i) { cs = c; idea = i; draw(); }, setLabels(l) { Object.assign(L, l); draw(); },
      setPlan(p) { planDays = p.days; mde = p.mde; pw = p.power; effZ = p.effZ; prev = p.preview || null; draw(); },
      setHist(h, d) { hist = h; if (d != null) planDays = d; curDay = h.length; draw(); },
      setCounts(a, b) { cnt.A.n = a.n; cnt.A.c = a.c; cnt.B.n = b.n; cnt.B.c = b.c; draw(); },
      emit, reveal(t, w) { truth = t; win = w || null; draw(); }, pulse() { glow = 1; },
      setTheme(d) { day = !!d; draw(); }, reset() { parts.length = 0; queue.length = 0; floats.length = 0; hist = []; truth = null; win = null; cnt.A = { n: 0, c: 0, d: 0 }; cnt.B = { n: 0, c: 0, d: 0 }; draw(); },
      start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }, stop() { running = false; cancelAnimationFrame(raf); }, draw, get running() { return running; }
    };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.abScene = create;
})();
