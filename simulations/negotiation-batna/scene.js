/* Negotiation & BATNA: canvas renderer (2D isometric neon). Logical size 960x540, scaled by the CSS size.
   MBALAB.nego.Scene(canvas) -> { setLevel, set(view), fx(name), setTheme(day), start(), stop(), draw() } */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2;
  const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647);
  const PAL = {
    night: { sky: ['#0a0720', '#1b1050', '#43197a'], far: '#1a1245', near: '#0e0a2e', win: ['#ffd36e', '#7df3ff', '#ff6bd5'], floorA: '#150f3d', floorB: '#221663', grid: 'rgba(125,243,255,.5)', glow: '#7df3ff', pink: '#ff4fd8', gold: '#ffd36e', tableTop: '#2b1a78', tableSide: '#1a0f52', tableSide2: '#120a3a', ink: '#ffffff', ink2: 'rgba(255,255,255,.7)', panel: 'rgba(10,6,40,.78)', track: 'rgba(255,255,255,.14)', ok: '#6dffb0', bad: '#ff5d7a' },
    day:   { sky: ['#3f94ee', '#8ec7fa', '#e8dcfb'], far: '#8fb4ee', near: '#6e97dd', win: ['#ffffff', '#cfe6ff', '#ffe9f7'], floorA: '#bcd6ff', floorB: '#d6e6ff', grid: 'rgba(16,60,190,.5)', glow: '#0a5fe0', pink: '#c4128a', gold: '#d98300', tableTop: '#5a7fe0', tableSide: '#3f5fc0', tableSide2: '#2f4aa0', ink: '#081530', ink2: '#26406a', panel: 'rgba(235,244,255,.9)', track: 'rgba(16,60,190,.18)', ok: '#0a8f4e', bad: '#c4122e' }
  };
  /* one look per character: [skin, hair, cloth, accent, kind] */
  const LOOKS = [
    ['#e8b48a', '#4a2a1c', '#d63fa8', '#ffd36e', 'bun'],
    ['#d49a72', '#9aa3b5', '#2a3350', '#ff5d7a', 'bald'],
    ['#f0c6a0', '#14121c', '#ff8a2a', '#7df3ff', 'bob'],
    ['#c98a62', '#2a1a12', '#2f9e6a', '#ffd36e', 'cap']
  ];
  const YOU = ['#e8b48a', '#1a1030', '#18b6d9', '#ff4fd8', 'spike'];

  function Scene(cv) {
    const ctx = cv.getContext('2d');
    let pal = PAL.night, day = false, raf = 0, last = 0, T = 0, running = false, shake = 0;
    let lvl = 0;
    const v = { ask: 138, you: 90, pat: 1, maxPat: 1, mood: 'neutral', hist: [], batna: 120, r: null, zone: null, talkN: 0, talkY: 0, npcX: 0, youX: 0, ended: null };
    const cur = { ask: 138, you: 90, pat: 1, npcX: 0, youX: 0 };
    const parts = [], coins = [];
    const stars = [], bldgs = [];
    const R = rnd(12345);
    for (let i = 0; i < 70; i++) stars.push([R() * W, R() * 230, R() * 1.4 + .3, R() * TAU]);
    for (let layer = 0; layer < 2; layer++) {
      let x = -40;
      while (x < W + 80) { const w = 40 + R() * 60, h = (layer ? 90 : 140) + R() * (layer ? 90 : 120); bldgs.push({ x, w, h, layer, seed: R() }); x += w + 4 + R() * 10; }
    }
    const clouds = [[80, 60, 1], [420, 36, .8], [760, 80, 1.2]];

    /* ---- isometric helpers: grid (gx,gy) to screen ---- */
    const CX = 480, CY = 318, TW = 76, TH = 38;
    const iso = (gx, gy, z) => [CX + (gx - gy) * TW / 2, CY + (gx + gy) * TH / 2 - (z || 0)];
    const poly = (pts, fill, stroke, lw) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.lineWidth = lw || 1.5; ctx.strokeStyle = stroke; ctx.stroke(); } };
    const glow = (c, b, f) => { ctx.shadowColor = c; ctx.shadowBlur = b; f(); ctx.shadowBlur = 0; };
    const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };

    function background() {
      const g = ctx.createLinearGradient(0, 0, 0, H); pal.sky.forEach((c, i) => g.addColorStop(i / 2, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (!day) stars.forEach(s => { ctx.globalAlpha = .4 + .6 * Math.abs(Math.sin(T * .0012 + s[3])); ctx.fillStyle = '#fff'; ctx.fillRect(s[0], s[1], s[2], s[2]); ctx.globalAlpha = 1; });
      else clouds.forEach(c => { const x = ((c[0] + T * .008 * c[2]) % (W + 240)) - 120; ctx.fillStyle = 'rgba(255,255,255,.82)'; [[0, 0, 34], [30, 6, 26], [-28, 8, 24], [8, -10, 24]].forEach(p => { ctx.beginPath(); ctx.arc(x + p[0] * c[2], c[1] + p[1], p[2] * c[2], 0, TAU); ctx.fill(); }); });
      const sunX = day ? 800 : 160, sunY = 110;
      glow(day ? '#fff2b0' : '#ff9be8', 40, () => { ctx.fillStyle = day ? '#fff6c8' : '#ffd1f4'; ctx.beginPath(); ctx.arc(sunX, sunY, day ? 34 : 26, 0, TAU); ctx.fill(); });
      bldgs.forEach(b => {
        const drift = (b.layer ? 1 : .4) * Math.sin(T * .0002) * 10, x = b.x + drift, y = 350 - b.h + (b.layer ? 20 : 0);
        ctx.fillStyle = b.layer ? pal.near : pal.far; ctx.fillRect(x, y, b.w, 400);
        const cols = Math.floor(b.w / 12), rows = Math.floor(b.h / 16), rr2 = rnd(Math.floor(b.seed * 9999) + 1);
        for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const on = rr2(), c = pal.win[Math.floor(rr2() * 3)]; if (on > .55) { ctx.globalAlpha = day ? .55 : (.5 + .5 * Math.sin(T * .002 + i * 3 + j)); ctx.fillStyle = c; ctx.fillRect(x + 5 + i * 12, y + 8 + j * 16, 5, 8); ctx.globalAlpha = 1; } }
      });
      const hz = ctx.createLinearGradient(0, 250, 0, 400); hz.addColorStop(0, 'rgba(255,79,216,0)'); hz.addColorStop(1, day ? 'rgba(255,255,255,.35)' : 'rgba(255,79,216,.28)'); ctx.fillStyle = hz; ctx.fillRect(0, 250, W, 150);
    }

    function floor() {
      const N = 8, o = -N / 2;
      poly([iso(o, o), iso(o + N, o), iso(o + N, o + N), iso(o, o + N)], pal.floorA);
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if ((i + j) % 2) poly([iso(o + i, o + j), iso(o + i + 1, o + j), iso(o + i + 1, o + j + 1), iso(o + i, o + j + 1)], pal.floorB);
      ctx.lineWidth = 1; ctx.strokeStyle = pal.grid; ctx.globalAlpha = .55;
      for (let i = 0; i <= N; i++) { let a = iso(o + i, o), b = iso(o + i, o + N); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); a = iso(o, o + i); b = iso(o + N, o + i); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
      ctx.globalAlpha = 1;
      glow(pal.glow, 16, () => poly([iso(o, o), iso(o + N, o), iso(o + N, o + N), iso(o, o + N)], null, pal.glow, 2.4));
      const rim = [iso(o, o + N), iso(o + N, o + N), iso(o + N, o + N, -26), iso(o, o + N, -26)]; poly(rim, pal.tableSide2);
      const rim2 = [iso(o + N, o), iso(o + N, o + N), iso(o + N, o + N, -26), iso(o + N, o, -26)]; poly(rim2, pal.tableSide);
    }

    function table() {
      const a = -1.6, b = 1.6, z = 40;
      poly([iso(a, b, 0), iso(b, b, 0), iso(b, b, z), iso(a, b, z)], pal.tableSide2);
      poly([iso(b, a, 0), iso(b, b, 0), iso(b, b, z), iso(b, a, z)], pal.tableSide);
      glow(pal.pink, 14, () => poly([iso(a, a, z), iso(b, a, z), iso(b, b, z), iso(a, b, z)], pal.tableTop, pal.pink, 2));
      ctx.strokeStyle = pal.glow; ctx.globalAlpha = .6; ctx.lineWidth = 1.4;
      [[iso(a, b, 0), iso(a, b, z)], [iso(b, b, 0), iso(b, b, z)], [iso(b, a, 0), iso(b, a, z)]].forEach(p => { ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]); ctx.lineTo(p[1][0], p[1][1]); ctx.stroke(); });
      ctx.globalAlpha = 1;
    }

    /* character: frontal chibi bust standing on an isometric pad */
    function pad(x, y, c) { const p = [[x, y - 17], [x + 54, y], [x, y + 17], [x - 54, y]]; glow(c, 18, () => poly(p, 'rgba(0,0,0,.25)', c, 2)); }
    function person(x, y, look, mood, talk, flip, lvlIdx, isYou, alpha) {
      const [skin, hair, cloth, acc, kind] = look, bob = v.ended ? 0 : Math.sin(T * .003 + (isYou ? 0 : 1.7)) * 2;
      ctx.save(); ctx.globalAlpha = alpha == null ? 1 : alpha; ctx.translate(x, y + bob);
      /* body */
      ctx.fillStyle = cloth; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.quadraticCurveTo(-38, -58, -16, -66); ctx.lineTo(16, -66); ctx.quadraticCurveTo(38, -58, 34, 0); ctx.closePath(); ctx.fill();
      glow(acc, 8, () => { ctx.strokeStyle = acc; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14, -66); ctx.lineTo(0, -48); ctx.lineTo(14, -66); ctx.stroke(); });
      if (!isYou && lvlIdx === 1) { ctx.fillStyle = '#e8ecf6'; ctx.beginPath(); ctx.moveTo(-8, -66); ctx.lineTo(0, -48); ctx.lineTo(8, -66); ctx.fill(); ctx.fillStyle = '#ff5d7a'; ctx.fillRect(-2, -62, 4, 16); }
      if (!isYou && lvlIdx === 3) { ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-34, -40, 68, 4); }
      /* neck + head */
      ctx.fillStyle = skin; ctx.fillRect(-7, -76, 14, 14);
      const hy = -100;
      if (kind === 'bun') { ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy - 30, 12, 0, TAU); ctx.fill(); }
      if (kind === 'bob') { ctx.fillStyle = hair; rr(-31, hy - 26, 62, 62, 20); ctx.fill(); }
      ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(0, hy, 28, 0, TAU); ctx.fill();
      if (kind === 'bun') { ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy - 6, 29, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); }
      if (kind === 'bob') { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-29, hy - 4); ctx.quadraticCurveTo(0, hy - 46, 29, hy - 4); ctx.quadraticCurveTo(0, hy - 18, -29, hy - 4); ctx.fill(); }
      if (kind === 'bald') { ctx.fillStyle = hair; ctx.globalAlpha *= .9; ctx.fillRect(-29, hy - 6, 6, 14); ctx.fillRect(23, hy - 6, 6, 14); ctx.globalAlpha = alpha == null ? 1 : alpha; }
      if (kind === 'cap') { ctx.fillStyle = '#e9ecf5'; ctx.beginPath(); ctx.arc(0, hy - 8, 29, Math.PI, 0); ctx.fill(); ctx.fillRect(-32, hy - 10, 64, 6); ctx.fillStyle = acc; ctx.fillRect(-8, hy - 24, 16, 6); ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy + 10, 22, 0, Math.PI); ctx.fill(); }
      if (kind === 'spike') { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-29, hy - 2); [[-22, -34], [-12, -20], [-4, -42], [6, -22], [16, -40], [22, -18], [29, -2]].forEach(p => ctx.lineTo(p[0], hy + p[1])); ctx.closePath(); ctx.fill(); glow(acc, 8, () => { ctx.strokeStyle = acc; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, hy - 4, 29, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }); }
      if (kind === 'bun' || kind === 'bob') { /* fringe done above */ }
      /* face */
      const blink = (Math.floor(T / 2600 + (isYou ? 0 : .5)) % 3 === 0 && (T % 2600) < 120);
      const ey = hy + 2, eo = 11, look2 = isYou ? 1 : -1;
      ctx.fillStyle = '#14102a';
      if (blink) { ctx.fillRect(-eo - 4, ey, 8, 2); ctx.fillRect(eo - 4, ey, 8, 2); }
      else { ctx.beginPath(); ctx.ellipse(-eo + look2 * 1.5, ey, 3.4, 4.4, 0, 0, TAU); ctx.ellipse(eo + look2 * 1.5, ey, 3.4, 4.4, 0, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = '#14102a'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
      const inn = mood === 'angry' ? 4 : mood === 'thinking' ? -3 : mood === 'happy' ? -2 : 0, out = mood === 'angry' ? -2 : mood === 'thinking' ? 1 : 0;
      ctx.beginPath(); ctx.moveTo(-eo - 6, ey - 9 + out); ctx.lineTo(-eo + 6, ey - 9 + inn); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(eo - 6, ey - 9 + inn); ctx.lineTo(eo + 6, ey - 9 + out); ctx.stroke();
      if (!isYou && lvlIdx === 1) { ctx.strokeStyle = '#14102a'; ctx.lineWidth = 2; ctx.strokeRect(-eo - 8, ey - 7, 16, 14); ctx.strokeRect(eo - 8, ey - 7, 16, 14); ctx.beginPath(); ctx.moveTo(-eo + 8, ey); ctx.lineTo(eo - 8, ey); ctx.stroke(); }
      if (!isYou && lvlIdx === 2) { ctx.fillStyle = 'rgba(125,243,255,.5)'; ctx.fillRect(-27, ey - 9, 54, 12); }
      if (!isYou && lvlIdx === 3) { ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy + 14, 14, 0.15, Math.PI - 0.15); ctx.fill(); }
      const my = hy + 16, open = talk > 0 ? (Math.abs(Math.sin(T * .02)) * 5 + 1) : 0;
      ctx.fillStyle = '#14102a'; ctx.strokeStyle = '#14102a';
      if (open) { ctx.beginPath(); ctx.ellipse(0, my, 6, open, 0, 0, TAU); ctx.fill(); }
      else if (mood === 'happy') { ctx.beginPath(); ctx.arc(0, my - 3, 8, .15 * Math.PI, .85 * Math.PI); ctx.stroke(); }
      else if (mood === 'angry') { ctx.beginPath(); ctx.arc(0, my + 6, 7, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
      else { ctx.beginPath(); ctx.moveTo(-5, my); ctx.lineTo(5, my + (mood === 'thinking' ? -2 : 0)); ctx.stroke(); }
      if (mood === 'angry') { ctx.fillStyle = 'rgba(255,60,90,.35)'; ctx.beginPath(); ctx.ellipse(-18, ey + 10, 6, 4, 0, 0, TAU); ctx.ellipse(18, ey + 10, 6, 4, 0, 0, TAU); ctx.fill(); }
      ctx.restore();
    }

    function holo() {
      const x = 480, y = 150, w = 330, h = 92;
      const bob = Math.sin(T * .002) * 3;
      ctx.save(); ctx.translate(x, y + bob);
      glow(pal.glow, 22, () => { rr(-w / 2, -h / 2, w, h, 14); ctx.fillStyle = pal.panel; ctx.fill(); ctx.strokeStyle = pal.glow; ctx.lineWidth = 2; ctx.stroke(); });
      ctx.beginPath(); ctx.moveTo(-18, h / 2); ctx.lineTo(18, h / 2); ctx.lineTo(0, h / 2 + 18); ctx.closePath(); ctx.fillStyle = pal.panel; ctx.fill();
      ctx.textAlign = 'center'; ctx.font = '600 13px system-ui,sans-serif';
      ctx.fillStyle = pal.pink; ctx.fillText(L('askLbl'), -w / 4, -22); ctx.fillStyle = pal.glow; ctx.fillText(L('youLbl'), w / 4, -22);
      ctx.font = '800 38px system-ui,sans-serif';
      glow(pal.pink, 10, () => { ctx.fillStyle = pal.ink; ctx.fillText(Math.round(cur.ask) + 'k', -w / 4, 22); });
      glow(pal.glow, 10, () => { ctx.fillStyle = pal.ink; ctx.fillText(Math.round(cur.you) + 'k', w / 4, 22); });
      ctx.strokeStyle = pal.track; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 30); ctx.stroke();
      ctx.restore();
    }

    function track() {
      const x0 = 70, x1 = 890, y = 506, lo = 60, hi = 170, X = p => x0 + (p - lo) / (hi - lo) * (x1 - x0);
      ctx.save();
      rr(x0 - 20, y - 24, x1 - x0 + 40, 44, 12); ctx.fillStyle = pal.panel; ctx.fill();
      ctx.fillStyle = pal.track; rr(x0, y - 3, x1 - x0, 6, 3); ctx.fill();
      if (v.zone) { ctx.fillStyle = pal.ok; ctx.globalAlpha = .55; rr(X(v.zone[0]), y - 5, X(v.zone[1]) - X(v.zone[0]), 10, 5); ctx.fill(); ctx.globalAlpha = 1; ctx.font = '700 11px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = pal.ok; ctx.fillText(L('tkZone'), (X(v.zone[0]) + X(v.zone[1])) / 2, y - 12); }
      v.hist.forEach(h => { ctx.fillStyle = pal.glow; ctx.globalAlpha = .55; ctx.beginPath(); ctx.arc(X(h.you), y, 4, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; });
      /* BATNA flag */
      const bx = X(v.batna); glow(pal.gold, 8, () => { ctx.strokeStyle = pal.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx, y + 14); ctx.lineTo(bx, y - 16); ctx.stroke(); ctx.fillStyle = pal.gold; ctx.beginPath(); ctx.moveTo(bx, y - 16); ctx.lineTo(bx + 24, y - 11); ctx.lineTo(bx, y - 6); ctx.fill(); });
      ctx.font = '700 10px system-ui,sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = pal.ink; ctx.fillText(L('tkBatna'), bx + 4, y + 16);
      /* ask + your offer markers */
      const ax = X(cur.ask); glow(pal.pink, 10, () => { ctx.fillStyle = pal.pink; ctx.beginPath(); ctx.moveTo(ax, y + 2); ctx.lineTo(ax - 8, y - 12); ctx.lineTo(ax + 8, y - 12); ctx.closePath(); ctx.fill(); });
      const yx = X(cur.you); glow(pal.glow, 10, () => { ctx.fillStyle = pal.glow; ctx.beginPath(); ctx.moveTo(yx, y - 2); ctx.lineTo(yx - 8, y + 12); ctx.lineTo(yx + 8, y + 12); ctx.closePath(); ctx.fill(); });
      if (v.r != null) { const rx = X(v.r); ctx.strokeStyle = pal.bad; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(rx, y - 14); ctx.lineTo(rx, y + 14); ctx.stroke(); ctx.fillStyle = pal.bad; ctx.font = '700 10px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText('min', rx, y - 17); }
      ctx.restore();
    }

    function patience(x, y) {
      const n = Math.max(1, Math.round(v.maxPat)), f = cur.pat * n;
      ctx.save(); ctx.translate(x, y); ctx.font = '700 11px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = pal.ink2; ctx.fillText(L('patience'), 0, -8);
      const w = Math.min(14, 100 / n), gap = 3, tot = n * (w + gap) - gap;
      for (let i = 0; i < n; i++) { const fill = Math.max(0, Math.min(1, f - i)); const c = cur.pat > .5 ? pal.ok : cur.pat > .25 ? pal.gold : pal.bad; const px = -tot / 2 + i * (w + gap); ctx.fillStyle = pal.track; rr(px, 0, w, 8, 3); ctx.fill(); if (fill > 0) { glow(c, 6, () => { ctx.fillStyle = c; rr(px, 0, w * fill, 8, 3); ctx.fill(); }); } }
      ctx.restore();
    }

    function particles(dt) {
      for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.x += p.vx * dt * .06; p.y += p.vy * dt * .06; p.vy += p.g * dt * .06; ctx.globalAlpha = Math.max(0, p.life / p.max); ctx.fillStyle = p.c; if (p.sq) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.life * .01); ctx.fillRect(-3, -2, 6, 4); ctx.restore(); } else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill(); } }
      ctx.globalAlpha = 1;
      for (let i = coins.length - 1; i >= 0; i--) { const c = coins[i]; c.t += dt / 520; if (c.t >= 1) { coins.splice(i, 1); continue; } const e = c.t * c.t * (3 - 2 * c.t), x = c.x0 + (c.x1 - c.x0) * e, y = c.y0 + (c.y1 - c.y0) * e - Math.sin(c.t * Math.PI) * 70; glow(c.c, 14, () => { ctx.fillStyle = c.c; ctx.beginPath(); ctx.ellipse(x, y, 13 * Math.abs(Math.cos(c.t * 9)) + 3, 13, 0, 0, TAU); ctx.fill(); }); ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.font = '800 12px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Rp', x, y + 4); }
    }
    let L = k => k;
    const burst = (x, y, n, cols, speed, sq, g) => { for (let i = 0; i < n; i++) { const a = Math.random() * TAU, s = (.4 + Math.random()) * speed; parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - speed * .6, g: g == null ? .05 : g, life: 700 + Math.random() * 700, max: 1400, r: 2 + Math.random() * 3, c: cols[i % cols.length], sq }); } };

    function draw() {
      const k = (v.ended === 'npcwalk' || v.ended === 'timeout' || v.ended === 'walk') ? 1 : 0;
      ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0);
      ctx.save();
      if (shake > 0) ctx.translate((Math.random() - .5) * shake, (Math.random() - .5) * shake);
      background(); floor(); table();
      const npc = LOOKS[lvl % 4], youP = [330, 372], npcP = [630, 372];
      pad(youP[0], youP[1] + 8, pal.glow); pad(npcP[0] + cur.npcX, npcP[1] + 8, pal.pink);
      const na = v.ended === 'npcwalk' ? Math.max(0, 1 - cur.npcX / 160) : 1, ya = v.ended === 'walk' ? Math.max(0, 1 - Math.abs(cur.youX) / 160) : 1;
      person(youP[0] + cur.youX, youP[1], YOU, v.ended === 'deal' ? 'happy' : v.ended && v.ended !== 'walk' ? 'neutral' : 'neutral', v.talkY, false, lvl, true, ya);
      person(npcP[0] + cur.npcX, npcP[1], npc, v.mood, v.talkN, true, lvl, false, na);
      holo(); patience(npcP[0] + cur.npcX, 218); track(); particles(16);
      ctx.restore();
      void k;
    }

    function step(now) {
      const dt = Math.min(50, now - (last || now)); last = now; T = now;
      const e = 1 - Math.exp(-dt / 110);
      cur.ask += (v.ask - cur.ask) * e; cur.you += (v.you - cur.you) * e;
      cur.pat += (v.pat - cur.pat) * (1 - Math.exp(-dt / 200));
      cur.npcX += ((v.npcX || 0) - cur.npcX) * (1 - Math.exp(-dt / 260)); cur.youX += ((v.youX || 0) - cur.youX) * (1 - Math.exp(-dt / 260));
      if (shake > 0) shake = Math.max(0, shake - dt * .03);
      if (v.talkN > 0) v.talkN -= dt; if (v.talkY > 0) v.talkY -= dt;
      draw();
      if (running) raf = requestAnimationFrame(step);
    }

    const api = {
      label(fn) { L = fn; },
      setLevel(i) { lvl = i; parts.length = 0; coins.length = 0; v.npcX = cur.npcX = 0; v.youX = cur.youX = 0; v.ended = null; },
      set(o) { Object.assign(v, o); if (o.snap) { cur.ask = v.ask; cur.you = v.you; cur.pat = v.pat; cur.npcX = v.npcX || 0; cur.youX = v.youX || 0; } if (!running) this.draw(); },
      setTheme(d) { day = !!d; pal = d ? PAL.day : PAL.night; if (!running) this.draw(); },
      fx(name) {
        if (name === 'offer') coins.push({ x0: 340, y0: 300, x1: 480, y1: 190, t: 0, c: pal.glow });
        if (name === 'counter') coins.push({ x0: 620, y0: 300, x1: 480, y1: 190, t: 0, c: pal.pink });
        if (name === 'deal') { burst(480, 250, 90, [pal.gold, pal.pink, pal.glow, pal.ok], 7, true); burst(330, 300, 30, [pal.glow], 4); burst(630, 300, 30, [pal.pink], 4); }
        if (name === 'offended') { shake = 14; burst(630, 270, 28, [pal.bad, pal.gold], 5); }
        if (name === 'bad') shake = 8;
        if (!running) this.draw();
      },
      start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(step); },
      stop() { running = false; cancelAnimationFrame(raf); this.draw(); },
      draw() { draw(); },
      get running() { return running; }
    };
    return api;
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.nego = MBALAB.nego || {}; MBALAB.nego.Scene = Scene;
})();
