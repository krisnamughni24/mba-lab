/* Five Forces arena. MBALAB.ffScene(canvas) -> { set, ghost, setW, setTheme, fx, start, stop, draw, values, running }
   Logical size 960x540. The firm sits in the middle; the five forces press on it. Gate width, squeeze plates, orbiting rivals and
   leaking coins all follow the live force values (0-100), which glide towards the target so every change is visible. */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2, CX = 480, CY = 270;
  const COL = ['#ff4d6d', '#ffb020', '#a78bfa', '#2bb6e8', '#ff6ad5'], ICON = ['⚔️', '🚪', '🚚', '🛍️', '🔄'];
  const NODE = [null, { x: 480, y: 62 }, { x: 110, y: 270 }, { x: 850, y: 270 }, { x: 480, y: 484 }];   /* rival has no disc: it is the orbit */
  const PAL = {
    day:   { sky: ['#cfeaff', '#f4fbff'], floor: 'rgba(40,70,130,.10)', line: 'rgba(40,70,130,.18)', wall: '#8b6b4a', wallL: '#b48a5e', body: '#fff6e0', roof: '#e0533d', sign: '#16224a', node: '#ffffff', ink: '#0b1b3f', ghost: '#0b1b3f' },
    night: { sky: ['#0a0f3a', '#1d2160'], floor: 'rgba(120,170,255,.08)', line: 'rgba(120,170,255,.16)', wall: '#5b4868', wallL: '#85679a', body: '#2b2f66', roof: '#ff6a5a', sign: '#04071c', node: '#141a4a', ink: '#ffffff', ghost: '#ffffff' }
  };
  const rr = (c, x, y, w, h, r) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
  const lerp = (a, b, k) => a + (b - a) * k;

  function create(cv) {
    const ctx = cv.getContext('2d'), E = MBALAB.ff;
    let tickCb = null, raf = 0, last = 0, T = 0, day = false, running = false, w = [.2, .2, .2, .2, .2];
    const tgt = [50, 50, 50, 50, 50], disp = [50, 50, 50, 50, 50]; let ghostV = null, keptD = 50, costT = 0, costD = 0;
    const coins = [], ents = [], crates = [], shops = [], leavers = [], pops = [], rings = [];
    const acc = [0, 0, 0, 0, 0];

    const rx = f => 255 - f * .6, ry = f => 156 - f * .24;
    const unit = (k, f) => { const a = T * (.25 + f / 160) + k * TAU / 8, R = rx(f), Ry = ry(f); return { x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * Ry, a }; };
    const target = i => i === 0 ? unit(Math.floor(Math.random() * 8), disp[0]) : NODE[i];
    const fxEmoji = (i, e, n) => { const p = i === 0 ? { x: CX, y: CY + 120 } : NODE[i]; for (let k = 0; k < (n || 7); k++) pops.push({ x: p.x + (Math.random() - .5) * 50, y: p.y + (Math.random() - .5) * 30, vx: (Math.random() - .5) * 60, vy: -40 - Math.random() * 60, t: 0, e }); rings.push({ i, t: 0 }); };

    function update(dt) {
      T += dt;
      for (let i = 0; i < 5; i++) disp[i] = lerp(disp[i], tgt[i], Math.min(1, dt * 3.2));
      costD = lerp(costD, costT, Math.min(1, dt * 3.2)); keptD = E.kept(disp, w) - costD;
      /* leaking coins: each force takes a share of the pool */
      const tk = E.takes(disp, w);
      for (let i = 0; i < 5; i++) { acc[i] += dt * Math.min(5, tk[i] * .32); while (acc[i] >= 1) { acc[i]--; if (coins.length < 160) coins.push({ i, t: 0, sp: .5 + Math.random() * .35, x0: CX + (Math.random() - .5) * 60, y0: CY + 10, tg: target(i), arc: (Math.random() - .5) * 90 }); } }
      for (let k = coins.length - 1; k >= 0; k--) { const c = coins[k]; c.t += dt * c.sp; if (c.t >= 1) coins.splice(k, 1); }
      /* entrants walk down to the gate; only those lined up with the gap get in */
      if (Math.random() < dt * (.6 + disp[1] / 22)) ents.push({ x: CX + (Math.random() - .5) * 280, y: 30, st: 0, a: 1 });
      const gap = 14 + disp[1] * 1.3;
      for (let k = ents.length - 1; k >= 0; k--) { const e = ents[k];
        if (e.st === 0) { e.y += 52 * dt; if (e.y >= 120) { if (Math.abs(e.x - CX) < gap / 2) e.st = 1; else { e.st = 2; rings.push({ x: e.x, y: 112, t: 0, s: 1 }); } } }
        else if (e.st === 1) { e.y += 52 * dt; e.x = lerp(e.x, CX, dt * 1.2); if (e.y > 190) e.a -= dt * 1.6; }
        else { e.y -= 70 * dt; e.a -= dt * 1.2; }
        if (e.a <= 0 || e.y < 0) ents.splice(k, 1); }
      /* supplier crates and buyers walk to the firm, subs lure customers away */
      if (Math.random() < dt * (1 + disp[2] / 30)) crates.push({ x: 150, s: 'L' });
      if (Math.random() < dt * (1 + disp[3] / 30)) crates.push({ x: 810, s: 'R' });
      for (let k = crates.length - 1; k >= 0; k--) { const c = crates[k]; c.x += (c.s === 'L' ? 1 : -1) * 70 * dt; if (c.x > 390 && c.s === 'L' || c.x < 570 && c.s === 'R') crates.splice(k, 1); }
      if (Math.random() < dt * (.3 + disp[4] / 24)) leavers.push({ t: 0 });
      for (let k = leavers.length - 1; k >= 0; k--) { leavers[k].t += dt * .45; if (leavers[k].t >= 1) leavers.splice(k, 1); }
      for (let k = pops.length - 1; k >= 0; k--) { const p = pops[k]; p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.t > 1.2) pops.splice(k, 1); }
      for (let k = rings.length - 1; k >= 0; k--) { rings[k].t += dt * 1.6; if (rings[k].t >= 1) rings.splice(k, 1); }
    }

    const P = () => PAL[day ? 'day' : 'night'];
    function node(i) {
      const c = ctx, p = P(), n = NODE[i], f = disp[i], col = COL[i];
      c.save(); c.translate(n.x, n.y);
      const g = c.createRadialGradient(0, 0, 10, 0, 0, 70 + f * .4); g.addColorStop(0, col + (f > 50 ? '66' : '33')); g.addColorStop(1, col + '00'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, 70 + f * .4, 0, TAU); c.fill();
      c.fillStyle = p.node; c.strokeStyle = col; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 36, 0, TAU); c.fill(); c.stroke();
      c.lineWidth = 7; c.lineCap = 'round'; c.strokeStyle = col; c.beginPath(); c.arc(0, 0, 45, -Math.PI / 2, -Math.PI / 2 + TAU * f / 100); c.stroke();
      if (ghostV) { c.setLineDash([3, 6]); c.lineWidth = 3; c.strokeStyle = p.ghost; c.beginPath(); c.arc(0, 0, 54, -Math.PI / 2, -Math.PI / 2 + TAU * ghostV[i] / 100); c.stroke(); c.setLineDash([]); }
      c.font = '34px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(ICON[i], 0, 3 + Math.sin(T * 2 + i) * 2);
      c.restore();
    }
    function arrow(i) {
      const c = ctx, n = NODE[i], f = disp[i], dx = CX - n.x, dy = CY - n.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d, a = { x: n.x + ux * 80, y: n.y + uy * 80 }, b = { x: CX - ux * 92, y: CY - uy * 92 };
      c.save(); c.strokeStyle = COL[i]; c.globalAlpha = .25 + f / 170; c.lineWidth = 3 + f * .12; c.setLineDash([14, 12]); c.lineDashOffset = -T * (20 + f * .7); c.lineCap = 'round';
      c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); c.setLineDash([]);
      c.fillStyle = COL[i]; c.beginPath(); c.moveTo(b.x, b.y); c.lineTo(b.x - ux * 16 - uy * (8 + f * .06), b.y - uy * 16 + ux * (8 + f * .06)); c.lineTo(b.x - ux * 16 + uy * (8 + f * .06), b.y - uy * 16 - ux * (8 + f * .06)); c.closePath(); c.fill(); c.restore();
    }
    function vice(x, i, dir) {    /* two plates close in on the supply lane: the harder the force, the tighter the gap */
      const c = ctx, h = 62 - disp[i] * .48, k = Math.sin(T * 5 + i) * 1.2 * disp[i] / 100;
      c.save(); c.fillStyle = COL[i]; c.globalAlpha = .9;
      rr(c, x - 7, CY - 120, 14, 120 - h + k, 5); c.fill(); rr(c, x - 7, CY + h - k, 14, 120 - h + k, 5); c.fill(); c.restore();
    }
    function firm() {
      const c = ctx, p = P(), k = keptD, col = k < 30 ? '#ff4d6d' : k < 50 ? '#ff9a3c' : k < 70 ? '#ffd166' : '#4de3a8';
      c.save(); c.translate(CX, CY);
      c.lineWidth = 10; c.lineCap = 'round'; c.strokeStyle = day ? 'rgba(20,50,110,.15)' : 'rgba(255,255,255,.12)'; c.beginPath(); c.arc(0, 0, 100, 0, TAU); c.stroke();
      c.strokeStyle = col; c.shadowColor = col; c.shadowBlur = 14; c.beginPath(); c.arc(0, 0, 100, -Math.PI / 2, -Math.PI / 2 + TAU * Math.max(.01, k / 100)); c.stroke(); c.shadowBlur = 0;
      c.fillStyle = p.body; rr(c, -66, -40, 132, 100, 9); c.fill();
      c.fillStyle = p.roof; for (let s = 0; s < 8; s++) { const y0 = -22 + Math.sin(T * 2 + s) * 1.5; c.beginPath(); c.moveTo(-72 + s * 18, -58); c.lineTo(-54 + s * 18, -58); c.lineTo(-54 + s * 18, y0); c.arc(-63 + s * 18, y0, 9, 0, Math.PI); c.closePath(); c.globalAlpha = s % 2 ? .75 : 1; c.fill(); } c.globalAlpha = 1;
      c.fillStyle = p.sign; rr(c, -54, -12, 108, 66, 7); c.fill(); c.restore();
    }
    function wall() {
      const c = ctx, p = P(), gap = 14 + disp[1] * 1.3, th = 8 + (100 - disp[1]) * .22, L = 300, R = 660, y = 120;
      c.save(); c.fillStyle = p.wall;
      const seg = (a, b) => { if (b <= a) return; rr(c, a, y - th / 2, b - a, th, 3); c.fill(); c.fillStyle = p.wallL; for (let x = a + 8; x < b - 6; x += 22) c.fillRect(x, y - th / 2 + 2, 14, Math.max(2, th - 6)); c.fillStyle = p.wall; };
      seg(L, CX - gap / 2); seg(CX + gap / 2, R); c.restore();
    }
    function draw() {
      const c = ctx, p = P(), sc = cv.width / W; c.setTransform(sc, 0, 0, sc, 0, 0);
      const bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, p.sky[0]); bg.addColorStop(1, p.sky[1]); c.fillStyle = bg; c.fillRect(0, 0, W, H);
      const sp = c.createRadialGradient(CX, CY, 20, CX, CY, 420); sp.addColorStop(0, p.floor); sp.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = sp; c.fillRect(0, 0, W, H);
      c.strokeStyle = p.line; c.lineWidth = 1; for (let x = 0; x <= W; x += 48) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for (let y = 0; y <= H; y += 48) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
      /* rival orbit */
      const f0 = disp[0]; c.save(); c.strokeStyle = COL[0]; c.globalAlpha = .18 + f0 / 220; c.lineWidth = 2 + f0 / 14; c.setLineDash([2, 10]); c.lineCap = 'round'; c.beginPath(); c.ellipse(CX, CY, rx(f0), ry(f0), 0, 0, TAU); c.stroke(); c.restore();
      if (ghostV) { c.save(); c.setLineDash([5, 8]); c.strokeStyle = p.ghost; c.globalAlpha = .6; c.lineWidth = 2; c.beginPath(); c.ellipse(CX, CY, rx(ghostV[0]), ry(ghostV[0]), 0, 0, TAU); c.stroke(); c.restore(); }
      for (let i = 1; i < 5; i++) arrow(i);
      wall(); vice(340, 2); vice(620, 3);
      /* supplier crates and buyer shoppers */
      c.font = '20px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      crates.forEach(k => { c.font = (16 + (k.s === 'L' ? disp[2] : disp[3]) * .12) + 'px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif'; c.fillText(k.s === 'L' ? '📦' : (disp[3] > 55 ? '🏷️' : '🙂'), k.x, CY + Math.sin(k.x * .05) * 5); });
      /* entrants */
      ents.forEach(e => { c.globalAlpha = Math.max(0, e.a); c.fillStyle = COL[1]; c.beginPath(); c.arc(e.x, e.y - 8, 6, 0, TAU); c.fill(); c.fillRect(e.x - 5, e.y - 2, 10, 14); c.globalAlpha = 1; });
      /* customers leaving for a substitute */
      leavers.forEach(l => { const t = l.t, x = lerp(CX, NODE[4].x, t) + Math.sin(t * 6) * 18, y = lerp(CY + 70, NODE[4].y - 40, t); c.globalAlpha = 1 - t * .6; c.fillStyle = COL[4]; c.beginPath(); c.arc(x, y - 7, 5.5, 0, TAU); c.fill(); c.fillRect(x - 4.5, y - 2, 9, 12); c.globalAlpha = 1; });
      firm();
      /* rival units */
      const n = Math.round(f0 / 100 * 8);
      for (let k = 0; k < 8; k++) { const u = unit(k, f0), on = k < n; if (!on) continue; c.save(); c.translate(u.x, u.y); const s = 1 + Math.sin(T * 6 + k) * .06 * f0 / 100;
        c.scale(s, s); c.fillStyle = p.body; rr(c, -18, -12, 36, 28, 5); c.fill(); c.fillStyle = COL[0]; c.fillRect(-20, -18, 40, 8); c.fillStyle = p.sign; c.fillRect(-6, 0, 12, 16); c.restore();
        if (f0 > 55 && Math.sin(T * 4 + k * 2) > .85) { c.strokeStyle = COL[0]; c.lineWidth = 3; c.beginPath(); c.moveTo(u.x, u.y); c.lineTo(lerp(u.x, CX, .4) + 6, lerp(u.y, CY, .4) - 6); c.lineTo(lerp(u.x, CX, .5) - 6, lerp(u.y, CY, .5) + 4); c.lineTo(lerp(u.x, CX, .6), lerp(u.y, CY, .6)); c.stroke(); } }
      for (let i = 1; i < 5; i++) node(i);
      /* coins leaking out of the pool */
      coins.forEach(k => { const t = k.t, e = t * t * (3 - 2 * t), x = lerp(k.x0, k.tg.x, e), y = lerp(k.y0, k.tg.y, e) + Math.sin(t * Math.PI) * k.arc * .25; c.globalAlpha = Math.min(1, (1 - t) * 3);
        c.fillStyle = '#ffd166'; c.strokeStyle = COL[k.i]; c.lineWidth = 2.5; c.beginPath(); c.arc(x, y, 7, 0, TAU); c.fill(); c.stroke(); c.globalAlpha = 1; });
      c.font = '26px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif';
      pops.forEach(q => { c.globalAlpha = Math.max(0, 1 - q.t / 1.2); c.fillText(q.e, q.x, q.y); c.globalAlpha = 1; });
      rings.forEach(r => { c.save(); c.globalAlpha = 1 - r.t; c.strokeStyle = r.i != null ? COL[r.i] : COL[1]; c.lineWidth = 4; const pos = r.i != null ? (r.i === 0 ? { x: CX, y: CY } : NODE[r.i]) : r; c.beginPath(); c.arc(pos.x, pos.y, (r.i === 0 ? 110 : 40) + r.t * (r.i != null ? 70 : 30), 0, TAU); c.stroke(); c.restore(); });
    }
    function loop(now) { if (!running) return; raf = requestAnimationFrame(loop); const dt = Math.min(.05, (now - last) / 1000 || 0); last = now; update(dt); draw(); if (tickCb) tickCb(disp, keptD); }
    return {
      set(f, snap) { f.forEach((v, i) => { tgt[i] = v; if (snap) disp[i] = v; }); if (snap) { costD = costT; keptD = E.kept(disp, w) - costD; } },
      setCost(c, snap) { costT = c; if (snap) { costD = c; keptD = E.kept(disp, w) - costD; } },
      ghost(g) { ghostV = g; }, onTick(fn) { tickCb = fn; }, setW(x) { w = x.slice(); }, setTheme(d) { day = !!d; draw(); },
      fx(i, e, n) { fxEmoji(i, e, n); },
      values: () => disp.slice(), kept: () => keptD,
      start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); },
      stop() { running = false; cancelAnimationFrame(raf); }, draw, get running() { return running; }
    };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.ffScene = create; MBALAB.ffScene.NODE = NODE; MBALAB.ffScene.POS = [{ x: 480, y: 398 }, { x: 640, y: 62 }, { x: 110, y: 345 }, { x: 850, y: 345 }, { x: 640, y: 484 }];
})();
