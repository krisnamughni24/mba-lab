/* Negotiation & BATNA: canvas renderer (2D isometric neon). Logical size 960x540, scaled by the CSS size.
   MBALAB.nego.Scene(canvas) -> { setLevel, set(view), fx(name), setTheme(day), start(), stop(), draw() } */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2;
  const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647);
  const PAL = {
    night: { sky: ['#0a0720', '#1b1050', '#43197a'], far: '#1a1245', near: '#0e0a2e', win: ['#ffd36e', '#7df3ff', '#ff6bd5'], floorA: '#150f3d', floorB: '#221663', grid: 'rgba(125,243,255,.5)', glow: '#7df3ff', pink: '#ff4fd8', gold: '#ffd36e', tableTop: '#2b1a78', tableSide: '#1a0f52', tableSide2: '#120a3a', ink: '#ffffff', ink2: 'rgba(255,255,255,.7)', panel: 'rgba(10,6,40,.78)', track: 'rgba(255,255,255,.14)', ok: '#6dffb0', bad: '#ff5d7a' },
    day:   { sky: ['#3f94ee', '#8ec7fa', '#e8dcfb'], far: '#8fb4ee', near: '#6e97dd', win: ['#ffffff', '#cfe6ff', '#ffe9f7'], floorA: '#bcd6ff', floorB: '#d6e6ff', grid: 'rgba(16,60,190,.5)', glow: '#0a5fe0', pink: '#c4128a', gold: '#d98300', tableTop: '#5a7fe0', tableSide: '#3f5fc0', tableSide2: '#2f4aa0', ink: '#081530', ink2: '#26406a', panel: 'rgba(235,244,255,.9)', track: 'rgba(16,60,190,.18)', ok: '#0a8f4e', bad: '#c4122e' }
  };
  /* one look per seller persona: [skin, hair, cloth, accent, kind] and the accessories they wear */
  const LOOKS = [
    ['#e8b48a', '#4a2a1c', '#d63fa8', '#ffd36e', 'bun'],
    ['#d49a72', '#9aa3b5', '#2a3350', '#ff5d7a', 'bald'],
    ['#f0c6a0', '#14121c', '#ff8a2a', '#7df3ff', 'bob'],
    ['#c98a62', '#2a1a12', '#2f9e6a', '#ffd36e', 'cap'],
    ['#d9a074', '#222', '#c9772a', '#ffe08a', 'peci'],
    ['#e8b48a', '#1c1424', '#5b2a8a', '#ff6bd5', 'bun'],
    ['#f2cfa8', '#15151c', '#33506a', '#7df3ff', 'bob'],
    ['#c98a62', '#101018', '#1f1f2e', '#ffd36e', 'slick']
  ];
  const DECO = [[], ['tie', 'glasses'], ['visor'], ['beard', 'stripe'], ['mustache'], ['glasses'], ['tie', 'glasses'], ['shades', 'chain']];
  const YOU = ['#e8b48a', '#1a1030', '#18b6d9', '#ff4fd8', 'spike'];
  /* teammates: intel = analyst, rapport = friendly contact, pressure = closer */
  const ALLY = { intel: { look: ['#f0c6a0', '#2a1a12', '#2f8fbf', '#7df3ff', 'bob'], deco: ['glasses', 'tablet'], emoji: '💡', col: '#7df3ff' }, rapport: { look: ['#d49a72', '#3a2418', '#2f9e6a', '#6dffb0', 'cap'], deco: [], emoji: '💞', col: '#ff6bd5' }, pressure: { look: ['#e8b48a', '#b02a3a', '#c43a52', '#ffd36e', 'bun'], deco: ['tie'], emoji: '⚡', col: '#ffd36e' } };

  function Scene(cv) {
    const ctx = cv.getContext('2d');
    let pal = PAL.night, day = false, raf = 0, last = 0, T = 0, running = false, shake = 0;
    let lvl = 0;
    const v = { ask: 138, you: 90, opps: [{ p: 0, pat: 1, max: 1, mood: 'neutral' }], allies: [], goodsK: 0, speaker: 0, addr: 0, turn: 0, mood: 'neutral', hist: [], batna: 120, r: null, zone: null, talkN: 0, talkY: 0, walker: 0, npcX: 0, youX: 0, ended: null };
    const cur = { ask: 138, you: 90, pat: [1, 1], npcX: 0, youX: 0, deal: 0 };
    const parts = [], coins = [], emotes = [], fxs = [], planes = [], birds = [];

    const stars = [], bldgs = [];
    const R = rnd(12345);
    for (let i = 0; i < 3; i++) planes.push({ x: R() * W, y: 40 + R() * 90, v: (i % 2 ? -1 : 1) * (14 + R() * 12), ph: R() * TAU });
    for (let i = 0; i < 7; i++) birds.push({ x: R() * W, y: 90 + R() * 80, v: 18 + R() * 14, ph: R() * TAU });
    const dust = []; for (let i = 0; i < 26; i++) dust.push({ x: 300 + R() * 360, y: 90 + R() * 260, s: .2 + R() * .6, ph: R() * TAU });
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
      planes.forEach(p => { const x = ((p.x + T * .001 * p.v) % (W + 120) + W + 120) % (W + 120) - 60, y = p.y + Math.sin(T * .0007 + p.ph) * 6; ctx.fillStyle = day ? '#fff' : '#cbd6ff'; ctx.beginPath(); ctx.ellipse(x, y, 9, 2.6, 0, 0, TAU); ctx.fill(); ctx.fillRect(x - 3, y - 1, 6, 5); if (!day) { ctx.globalAlpha = .5 + .5 * Math.sin(T * .01 + p.ph); ctx.fillStyle = '#ff4f6a'; ctx.fillRect(x - 10, y - 1, 2, 2); ctx.fillStyle = '#6dffb0'; ctx.fillRect(x + 8, y - 1, 2, 2); ctx.globalAlpha = 1; } else { ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.moveTo(x - 10, y); ctx.lineTo(x - 52, y + 1); ctx.stroke(); } });
      if (day) birds.forEach(b => { const x = (b.x + T * .001 * b.v) % (W + 40) - 20, y = b.y + Math.sin(T * .002 + b.ph) * 8, f = Math.sin(T * .012 + b.ph) * 4; ctx.strokeStyle = '#26406a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - 6, y + f); ctx.quadraticCurveTo(x - 2, y - 4, x, y); ctx.quadraticCurveTo(x + 2, y - 4, x + 6, y + f); ctx.stroke(); });
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


    /* ---- isometric goods on the table top (one set per mission) ---- */
    const Z0 = 40;
    const box = (gx, gy, w, d, z0, h, top, l, r, edge) => {
      poly([iso(gx, gy + d, z0), iso(gx + w, gy + d, z0), iso(gx + w, gy + d, z0 + h), iso(gx, gy + d, z0 + h)], l);
      poly([iso(gx + w, gy, z0), iso(gx + w, gy + d, z0), iso(gx + w, gy + d, z0 + h), iso(gx + w, gy, z0 + h)], r);
      poly([iso(gx, gy, z0 + h), iso(gx + w, gy, z0 + h), iso(gx + w, gy + d, z0 + h), iso(gx, gy + d, z0 + h)], top, edge, 1.5);
    };
    const cyl = (gx, gy, z0, rad, h, col, edge) => {
      const p = iso(gx, gy, z0), x = p[0], y = p[1], ry = rad / 2;
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - rad, y - h); ctx.lineTo(x - rad, y); ctx.ellipse(x, y, rad, ry, 0, Math.PI, 0, true); ctx.lineTo(x + rad, y - h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.beginPath(); ctx.moveTo(x + rad * .2, y - h); ctx.lineTo(x + rad * .2, y + ry * .98); ctx.lineTo(x + rad, y); ctx.lineTo(x + rad, y - h); ctx.closePath(); ctx.fill();
      ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y - h, rad, ry, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(x, y - h, rad * .35, ry * .35, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = edge; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, y - h, rad, ry, 0, 0, TAU); ctx.stroke();
    };
    function goods() {
      const k = v.goodsK, e = pal.glow;
      const c = iso(0, 0, Z0); glow(pal.pink, 24, () => { ctx.fillStyle = 'rgba(255,79,216,.18)'; ctx.beginPath(); ctx.ellipse(c[0], c[1] + 4, 120, 34, 0, 0, TAU); ctx.fill(); });
      if (k === 0) {                                          // batik fabric rolls
        const cols = ['#b5368f', '#1c9bc4', '#d98f1e', '#2f9e6a', '#7a3fd0'];
        [[-0.9, -0.1, 13, 30, 0], [-0.2, -0.95, 12, 26, 1], [0.15, 0.2, 14, 34, 2], [0.95, -0.5, 12, 28, 3], [-0.25, 0.85, 12, 24, 4]].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1])).forEach(o => cyl(o[0], o[1], Z0, o[2], o[3], cols[o[4]], e));
      } else if (k === 1) {                                   // steel brackets
        const T = '#9fb3d6', Lf = '#6f84ad', Rt = '#52648a';
        [[-1, -0.5], [-0.2, -0.5], [0.6, -0.5]].forEach(o => box(o[0], o[1], .7, .75, Z0, 18, T, Lf, Rt, e));
        [[-0.6, -0.5], [0.2, -0.5]].forEach(o => { box(o[0], o[1], .7, .75, Z0 + 18, 18, T, Lf, Rt, e); const q = iso(o[0] + .35, o[1] + .37, Z0 + 36); ctx.fillStyle = '#26324f'; ctx.beginPath(); ctx.ellipse(q[0], q[1], 5, 2.5, 0, 0, TAU); ctx.fill(); });
        const q2 = iso(-0.4, 0.5, Z0 + 12); box(-0.7, 0.3, .6, .6, Z0, 12, T, Lf, Rt, e);
      } else if (k === 2) {                                   // LED panels (screens glow and shift)
        [[-1, -0.1], [-0.25, -0.1], [0.5, -0.1]].forEach((o, i) => {
          box(o[0], o[1], .62, .12, Z0, 46, '#1a2350', '#0b1230', '#0b1230', e);
          const hue = (T * .05 + i * 70) % 360, g = ctx.createLinearGradient(0, 0, 0, 1);
          const a = iso(o[0] + .04, o[1] + .12, Z0 + 42), b = iso(o[0] + .58, o[1] + .12, Z0 + 4);
          const gr = ctx.createLinearGradient(a[0], a[1], b[0], b[1]); gr.addColorStop(0, 'hsl(' + hue + ',95%,62%)'); gr.addColorStop(1, 'hsl(' + (hue + 80) + ',95%,55%)');
          glow('hsl(' + hue + ',95%,60%)', 14, () => poly([iso(o[0] + .04, o[1] + .12, Z0 + 4), iso(o[0] + .58, o[1] + .12, Z0 + 4), iso(o[0] + .58, o[1] + .12, Z0 + 42), iso(o[0] + .04, o[1] + .12, Z0 + 42)], gr));
          void g;
        });
      } else if (k === 3) {                                   // premium packaging with gold ribbon
        const gold = '#ffd36e', T = '#5b3bb8', Lf = '#3d2788', Rt = '#2c1c66';
        const gift = (gx, gy, w, d, z0, h) => {
          box(gx, gy, w, d, z0, h, T, Lf, Rt, gold); const zt = z0 + h;
          poly([iso(gx + w * .4, gy + d, z0), iso(gx + w * .6, gy + d, z0), iso(gx + w * .6, gy + d, zt), iso(gx + w * .4, gy + d, zt)], gold);
          poly([iso(gx + w, gy + d * .4, z0), iso(gx + w, gy + d * .6, z0), iso(gx + w, gy + d * .6, zt), iso(gx + w, gy + d * .4, zt)], gold);
          poly([iso(gx, gy + d * .4, zt), iso(gx + w, gy + d * .4, zt), iso(gx + w, gy + d * .6, zt), iso(gx, gy + d * .6, zt)], gold);
          poly([iso(gx + w * .4, gy, zt), iso(gx + w * .6, gy, zt), iso(gx + w * .6, gy + d, zt), iso(gx + w * .4, gy + d, zt)], gold);
        };
        gift(-0.95, -0.5, .95, .95, Z0, 26); gift(0.2, -0.2, .75, .75, Z0, 20); gift(-0.8, -0.35, .62, .62, Z0 + 26, 16);
        const sp = iso(0.55, 0.15, Z0 + 20 + 16 + Math.sin(T * .004) * 3); glow(gold, 12, () => { ctx.fillStyle = gold; ctx.beginPath(); for (let i = 0; i < 8; i++) { const r = i % 2 ? 3 : 8, a = i * Math.PI / 4 - Math.PI / 2; ctx.lineTo(sp[0] + Math.cos(a) * r, sp[1] + Math.sin(a) * r); } ctx.closePath(); ctx.fill(); });
      } else if (k === 4) {                                   // coffee sacks with steam from a cup
        const burlap = ['#b88a56', '#a9794a', '#c79a64'];
        [[-0.95, -0.4, 0], [-0.25, -0.75, 1], [0.35, -0.3, 2], [-0.5, 0.35, 1], [0.55, 0.5, 0]].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1])).forEach(o => {
          cyl(o[0], o[1], Z0, 15, 26, burlap[o[2]], e); const p = iso(o[0], o[1], Z0 + 26); ctx.fillStyle = '#6a4a2a'; ctx.beginPath(); ctx.ellipse(p[0], p[1] - 3, 7, 4, 0, 0, TAU); ctx.fill();
          const q = iso(o[0], o[1], Z0 + 12); ctx.fillStyle = '#3a2412'; ctx.beginPath(); ctx.ellipse(q[0] - 2, q[1] + 6, 5, 8, .4, 0, TAU); ctx.fill(); ctx.strokeStyle = burlap[0]; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(q[0] - 2, q[1] - 1); ctx.lineTo(q[0] - 2, q[1] + 13); ctx.stroke();
        });
        const cp = iso(0.75, -0.9, Z0 + 4); ctx.fillStyle = '#f4f0ea'; rr(cp[0] - 8, cp[1] - 10, 16, 12, 3); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(cp[0] - 4 + i * 4, cp[1] - 12); ctx.quadraticCurveTo(cp[0] - 8 + i * 4 + Math.sin(T * .004 + i) * 4, cp[1] - 24, cp[0] - 4 + i * 4, cp[1] - 36 - Math.sin(T * .003 + i) * 3); ctx.stroke(); }
      } else if (k === 5) {                                   // solar panels catching the light
        [[-1.05, -0.8], [-0.2, -0.8], [0.65, -0.8], [-0.6, 0.15], [0.25, 0.15]].forEach((o, i) => {
          const w = .8, d = .72, A = iso(o[0], o[1], Z0 + 4), B = iso(o[0] + w, o[1], Z0 + 4), Cc = iso(o[0] + w, o[1] + d, Z0 + 26), Dd = iso(o[0], o[1] + d, Z0 + 26);
          poly([A, B, Cc, Dd], '#1c3a82', e, 1.4);
          ctx.strokeStyle = 'rgba(160,200,255,.55)'; ctx.lineWidth = 1;
          for (let g = 1; g < 4; g++) { const t0 = g / 4, a1 = [A[0] + (B[0] - A[0]) * t0, A[1] + (B[1] - A[1]) * t0], b1 = [Dd[0] + (Cc[0] - Dd[0]) * t0, Dd[1] + (Cc[1] - Dd[1]) * t0]; ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(b1[0], b1[1]); ctx.stroke(); const a2 = [A[0] + (Dd[0] - A[0]) * t0, A[1] + (Dd[1] - A[1]) * t0], b2 = [B[0] + (Cc[0] - B[0]) * t0, B[1] + (Cc[1] - B[1]) * t0]; ctx.beginPath(); ctx.moveTo(a2[0], a2[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke(); }
          const gl = (Math.sin(T * .0016 + i * 1.3) + 1) / 2; ctx.globalAlpha = .12 + gl * .4; ctx.fillStyle = '#fff2b0'; poly([A, [A[0] + (B[0] - A[0]) * .35, A[1] + (B[1] - A[1]) * .35], [Dd[0] + (Cc[0] - Dd[0]) * .35, Dd[1] + (Cc[1] - Dd[1]) * .35], Dd], '#fff2b0'); ctx.globalAlpha = 1;
        });
      } else if (k === 6) {                                   // stacked shipping containers
        const cols = [['#e0672a', '#b24c1b', '#8a3a14'], ['#2f7fd0', '#235f9c', '#1a4878'], ['#2f9e6a', '#237852', '#195a3e']];
        [[-1.05, -0.5, 0, 0], [-0.1, -0.5, 1, 0], [-0.6, -0.5, 2, 1], [0.55, -0.1, 0, 0]].forEach(o => {
          const c = cols[o[2]], z0 = Z0 + o[3] * 20; box(o[0], o[1], 1.3, .7, z0, 18, c[0], c[1], c[2], e);
          ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = 1; for (let g = 1; g < 8; g++) { const t0 = g / 8, p1 = iso(o[0] + 1.3 * t0, o[1] + .7, z0), p2 = iso(o[0] + 1.3 * t0, o[1] + .7, z0 + 18); ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke(); }
        });
      } else {                                                // server racks with blinking lights
        [[-1, -0.4], [-0.35, -0.4], [0.3, -0.4]].forEach((o, i) => {
          box(o[0], o[1], .55, .55, Z0, 52, '#1c2748', '#0d1430', '#0a1028', e);
          for (let r = 0; r < 7; r++) for (let c = 0; c < 3; c++) { const on = Math.sin(T * .006 + i * 2 + r * 1.7 + c * 3) > .1; const p = iso(o[0] + .08 + c * .12, o[1] + .55, Z0 + 6 + r * 6.5); ctx.fillStyle = on ? ['#6dffb0', '#7df3ff', '#ffd36e'][(r + c) % 3] : '#23305a'; ctx.fillRect(p[0] - 1, p[1] - 2, 5, 3); }
        });
      }
    }

    /* character: frontal chibi bust standing on an isometric pad */
    function pad(x, y, c, sc, name, glowK) { sc = sc || 1; const p = [[x, y - 17 * sc], [x + 54 * sc, y], [x, y + 17 * sc], [x - 54 * sc, y]]; glow(c, 18 + (glowK || 0) * 18, () => poly(p, 'rgba(0,0,0,.25)', c, 2 + (glowK || 0) * 2));
      if (name) { ctx.font = '700 ' + Math.round(12 * (sc > .9 ? 1 : .92)) + 'px system-ui,sans-serif'; ctx.textAlign = 'center'; const w = ctx.measureText(name).width + 16; ctx.fillStyle = pal.panel; rr(x - w / 2, y + 16 * sc, w, 18, 9); ctx.fill(); ctx.fillStyle = pal.ink; ctx.fillText(name, x, y + 29 * sc); } }
    /* character: frontal chibi bust with arms. o = {x,y,look,deco,mood,talk,isYou,alpha,sc,side,reach,pulse} */
    function person(o) {
      const [skin, hair, cloth, acc, kind] = o.look, deco = o.deco || [], isYou = o.isYou, mood = o.mood, talk = o.talk, side = o.side || 1;
      const bob = v.ended ? 0 : Math.sin(T * .003 + (o.ph || 0)) * 2, br = 1 + Math.sin(T * .004 + (o.ph || 0)) * .012;
      ctx.save(); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.translate(o.x, o.y + bob); ctx.scale(o.sc || 1, (o.sc || 1) * br);
      if (o.pulse > 0) { ctx.globalAlpha *= 1; glow(o.pcol || acc, 24, () => { ctx.strokeStyle = o.pcol || acc; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, -60, 52 + o.pulse * 14, 82 + o.pulse * 12, 0, 0, TAU); ctx.stroke(); }); }
      /* body */
      ctx.fillStyle = cloth; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.quadraticCurveTo(-38, -58, -16, -66); ctx.lineTo(16, -66); ctx.quadraticCurveTo(38, -58, 34, 0); ctx.closePath(); ctx.fill();
      glow(acc, 8, () => { ctx.strokeStyle = acc; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14, -66); ctx.lineTo(0, -48); ctx.lineTo(14, -66); ctx.stroke(); });
      if (deco.includes('tie')) { ctx.fillStyle = '#e8ecf6'; ctx.beginPath(); ctx.moveTo(-8, -66); ctx.lineTo(0, -48); ctx.lineTo(8, -66); ctx.fill(); ctx.fillStyle = '#ff5d7a'; ctx.fillRect(-2, -62, 4, 16); }
      if (deco.includes('stripe')) { ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-34, -40, 68, 4); }
      if (deco.includes('chain')) { ctx.strokeStyle = '#ffd36e'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.arc(0, -64, 14, .15 * Math.PI, .85 * Math.PI); ctx.stroke(); }
      /* arms and hands */
      const talking = talk > 0, rch = o.reach || 0;
      [-1, 1].forEach(sd => {
        const out = sd === side;
        let hx = sd * 40, hy = -8;
        if (rch > 0 && out) { hx = side * (40 + 52 * rch); hy = -20 - 6 * rch; }
        else if (talking && out) { hx = side * (46 + Math.sin(T * .012) * 8); hy = -52 + Math.cos(T * .015) * 9; }
        else if (o.pulse > 0 && out) { hx = side * 50; hy = -56 - o.pulse * 6; }
        ctx.strokeStyle = cloth; ctx.lineWidth = 11; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sd * 28, -56); ctx.quadraticCurveTo(sd * 44, -34, hx, hy); ctx.stroke();
        ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(hx, hy, 6.2, 0, TAU); ctx.fill();
        if (out && deco.includes('tablet')) { ctx.save(); ctx.translate(hx - side * 4, hy - 12); ctx.rotate(-side * .3); ctx.fillStyle = '#12204a'; rr(-11, -9, 22, 18, 3); ctx.fill(); glow('#7df3ff', 8, () => { ctx.strokeStyle = '#7df3ff'; ctx.lineWidth = 1.4; ctx.stroke(); }); ctx.fillStyle = '#7df3ff'; ctx.fillRect(-7, -4, 14, 2); ctx.fillRect(-7, 1, 9, 2); ctx.restore(); }
      });
      /* neck + head */
      ctx.fillStyle = skin; ctx.fillRect(-7, -76, 14, 14);
      const hy = -100;
      if (kind === 'bun') { ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy - 30, 12, 0, TAU); ctx.fill(); }
      if (kind === 'bob') { ctx.fillStyle = hair; rr(-31, hy - 26, 62, 62, 20); ctx.fill(); }
      ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(0, hy, 28, 0, TAU); ctx.fill();
      if (kind === 'bun') { ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy - 6, 29, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); }
      if (kind === 'bob') { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-29, hy - 4); ctx.quadraticCurveTo(0, hy - 46, 29, hy - 4); ctx.quadraticCurveTo(0, hy - 18, -29, hy - 4); ctx.fill(); }
      if (kind === 'bald') { ctx.fillStyle = hair; ctx.globalAlpha *= .9; ctx.fillRect(-29, hy - 6, 6, 14); ctx.fillRect(23, hy - 6, 6, 14); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; }
      if (kind === 'cap') { ctx.fillStyle = '#e9ecf5'; ctx.beginPath(); ctx.arc(0, hy - 8, 29, Math.PI, 0); ctx.fill(); ctx.fillRect(-32, hy - 10, 64, 6); ctx.fillStyle = acc; ctx.fillRect(-8, hy - 24, 16, 6); ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy + 10, 22, 0, Math.PI); ctx.fill(); }
      if (kind === 'peci') { ctx.fillStyle = '#1a1a22'; rr(-22, hy - 40, 44, 26, 5); ctx.fill(); ctx.fillStyle = acc; ctx.fillRect(-22, hy - 18, 44, 3); }
      if (kind === 'slick') { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-29, hy - 2); ctx.quadraticCurveTo(-26, hy - 38, 4, hy - 36); ctx.quadraticCurveTo(30, hy - 32, 29, hy - 2); ctx.quadraticCurveTo(18, hy - 22, -4, hy - 20); ctx.quadraticCurveTo(-20, hy - 18, -29, hy - 2); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-10, hy - 28); ctx.quadraticCurveTo(6, hy - 32, 18, hy - 24); ctx.stroke(); }
      if (kind === 'spike') { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-29, hy - 2); [[-22, -34], [-12, -20], [-4, -42], [6, -22], [16, -40], [22, -18], [29, -2]].forEach(p => ctx.lineTo(p[0], hy + p[1])); ctx.closePath(); ctx.fill(); glow(acc, 8, () => { ctx.strokeStyle = acc; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, hy - 4, 29, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }); }
      /* face */
      const blink = (Math.floor(T / 2600 + (o.ph || 0) / 3) % 3 === 0 && (T % 2600) < 120);
      const ey = hy + 2, eo = 11, look2 = isYou ? 1 : -1;
      ctx.fillStyle = '#14102a';
      if (blink) { ctx.fillRect(-eo - 4, ey, 8, 2); ctx.fillRect(eo - 4, ey, 8, 2); }
      else { ctx.beginPath(); ctx.ellipse(-eo + look2 * 1.5, ey, 3.4, 4.4, 0, 0, TAU); ctx.ellipse(eo + look2 * 1.5, ey, 3.4, 4.4, 0, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = '#14102a'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
      const inn = mood === 'angry' ? 4 : mood === 'thinking' ? -3 : mood === 'happy' ? -2 : 0, out2 = mood === 'angry' ? -2 : mood === 'thinking' ? 1 : 0;
      ctx.beginPath(); ctx.moveTo(-eo - 6, ey - 9 + out2); ctx.lineTo(-eo + 6, ey - 9 + inn); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(eo - 6, ey - 9 + inn); ctx.lineTo(eo + 6, ey - 9 + out2); ctx.stroke();
      if (deco.includes('glasses')) { ctx.strokeStyle = '#14102a'; ctx.lineWidth = 2; ctx.strokeRect(-eo - 8, ey - 7, 16, 14); ctx.strokeRect(eo - 8, ey - 7, 16, 14); ctx.beginPath(); ctx.moveTo(-eo + 8, ey); ctx.lineTo(eo - 8, ey); ctx.stroke(); }
      if (deco.includes('visor')) { ctx.fillStyle = 'rgba(125,243,255,.5)'; ctx.fillRect(-27, ey - 9, 54, 12); }
      if (deco.includes('shades')) { ctx.fillStyle = '#0a0a14'; rr(-26, ey - 8, 22, 13, 4); ctx.fill(); rr(4, ey - 8, 22, 13, 4); ctx.fill(); ctx.fillRect(-6, ey - 4, 12, 2.4); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-22, ey - 6, 6, 2); ctx.fillRect(8, ey - 6, 6, 2); }
      if (deco.includes('beard')) { ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy + 14, 14, 0.15, Math.PI - 0.15); ctx.fill(); }
      if (deco.includes('mustache')) { ctx.fillStyle = '#1a1a22'; ctx.beginPath(); ctx.ellipse(-6, hy + 10, 7, 3, -.2, 0, TAU); ctx.ellipse(6, hy + 10, 7, 3, .2, 0, TAU); ctx.fill(); }
      const my = hy + 16, open = talk > 0 ? (Math.abs(Math.sin(T * .02)) * 5 + 1) : 0;
      ctx.fillStyle = '#14102a'; ctx.strokeStyle = '#14102a';
      if (open) { ctx.beginPath(); ctx.ellipse(0, my, 6, open, 0, 0, TAU); ctx.fill(); }
      else if (mood === 'happy') { ctx.beginPath(); ctx.arc(0, my - 3, 8, .15 * Math.PI, .85 * Math.PI); ctx.stroke(); }
      else if (mood === 'angry') { ctx.beginPath(); ctx.arc(0, my + 6, 7, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
      else { ctx.beginPath(); ctx.moveTo(-5, my); ctx.lineTo(5, my + (mood === 'thinking' ? -2 : 0)); ctx.stroke(); }
      if (mood === 'angry') { ctx.fillStyle = 'rgba(255,60,90,.35)'; ctx.beginPath(); ctx.ellipse(-18, ey + 10, 6, 4, 0, 0, TAU); ctx.ellipse(18, ey + 10, 6, 4, 0, 0, TAU); ctx.fill(); }
      if (mood === 'happy') { ctx.fillStyle = 'rgba(255,120,160,.3)'; ctx.beginPath(); ctx.ellipse(-18, ey + 10, 6, 4, 0, 0, TAU); ctx.ellipse(18, ey + 10, 6, 4, 0, 0, TAU); ctx.fill(); }
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
      if (v.intel != null) { const ix = X(v.intel); glow('#7df3ff', 8, () => { ctx.fillStyle = '#7df3ff'; ctx.beginPath(); ctx.moveTo(ix, y - 10); ctx.lineTo(ix + 6, y - 4); ctx.lineTo(ix, y + 2); ctx.lineTo(ix - 6, y - 4); ctx.closePath(); ctx.fill(); }); ctx.font = '700 10px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#7df3ff'; ctx.fillText('💡 ' + v.intel + 'k', ix, y - 16); }
      /* ask + your offer markers */
      const ax = X(cur.ask); glow(pal.pink, 10, () => { ctx.fillStyle = pal.pink; ctx.beginPath(); ctx.moveTo(ax, y + 2); ctx.lineTo(ax - 8, y - 12); ctx.lineTo(ax + 8, y - 12); ctx.closePath(); ctx.fill(); });
      const yx = X(cur.you); glow(pal.glow, 10, () => { ctx.fillStyle = pal.glow; ctx.beginPath(); ctx.moveTo(yx, y - 2); ctx.lineTo(yx - 8, y + 12); ctx.lineTo(yx + 8, y + 12); ctx.closePath(); ctx.fill(); });
      if (v.r != null) { const rx = X(v.r); ctx.strokeStyle = pal.bad; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(rx, y - 14); ctx.lineTo(rx, y + 14); ctx.stroke(); ctx.fillStyle = pal.bad; ctx.font = '700 10px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText('min', rx, y - 17); }
      ctx.restore();
    }

    function patience(x, y, k, name) {
      const o = v.opps[k] || { max: 1 }, n = Math.max(1, Math.round(o.max)), f = cur.pat[k] * n, pv = cur.pat[k];
      ctx.save(); ctx.translate(x, y); ctx.font = '700 10.5px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = pal.ink2; ctx.fillText(L('patience'), 0, -8);
      const w = Math.min(12, 84 / n), gap = 3, tot = n * (w + gap) - gap;
      for (let i = 0; i < n; i++) { const fill = Math.max(0, Math.min(1, f - i)); const c = pv > .5 ? pal.ok : pv > .25 ? pal.gold : pal.bad; const px = -tot / 2 + i * (w + gap); ctx.fillStyle = pal.track; rr(px, 0, w, 7, 3); ctx.fill(); if (fill > 0) { glow(c, 6, () => { ctx.fillStyle = c; rr(px, 0, w * fill, 7, 3); ctx.fill(); }); } }
      ctx.restore();
    }
    function emote(x, y, txt) { emotes.push({ x, y, txt, life: 1500, max: 1500 }); }
    function spotlight() {
      const g = ctx.createLinearGradient(0, 40, 0, 360); g.addColorStop(0, day ? 'rgba(255,248,220,.0)' : 'rgba(180,220,255,.0)'); g.addColorStop(.35, day ? 'rgba(255,248,220,.10)' : 'rgba(160,210,255,.10)'); g.addColorStop(1, day ? 'rgba(255,248,220,.0)' : 'rgba(160,210,255,.02)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(430, 40); ctx.lineTo(530, 40); ctx.lineTo(700, 380); ctx.lineTo(260, 380); ctx.closePath(); ctx.fill();
      ctx.fillStyle = day ? 'rgba(255,255,255,.7)' : 'rgba(200,230,255,.65)'; dust.forEach(d => { const x = d.x + Math.sin(T * .0004 * d.s + d.ph) * 14, y = d.y + ((T * .006 * d.s) % 80); ctx.globalAlpha = .25 + .35 * Math.abs(Math.sin(T * .001 + d.ph)); ctx.fillRect(x, y > 340 ? y - 250 : y, 1.6, 1.6); }); ctx.globalAlpha = 1;
    }
    /* ally tactic effects: intel scan beam, rapport hearts, pressure lightning */
    function fxLayer(dt) {
      for (let i = fxs.length - 1; i >= 0; i--) {
        const f = fxs[i]; f.t += dt; if (f.t > f.dur) { fxs.splice(i, 1); continue; }
        const k = f.t / f.dur, a = [f.x0, f.y0], b = [f.x1, f.y1]; ctx.save(); ctx.globalAlpha = Math.sin(Math.min(1, k) * Math.PI);
        if (f.kind === 'intel') { glow(f.c, 12, () => { ctx.strokeStyle = f.c; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.lineDashOffset = -f.t * .05; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.arc(b[0], b[1], 14 + 6 * Math.sin(f.t * .02), 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(b[0] - 10, b[1]); ctx.lineTo(b[0] + 10, b[1]); ctx.moveTo(b[0], b[1] - 10); ctx.lineTo(b[0], b[1] + 10); ctx.stroke(); }); }
        else if (f.kind === 'rapport') { for (let h = 0; h < 5; h++) { const t2 = (k + h * .18) % 1, x = a[0] + (b[0] - a[0]) * t2, y = a[1] + (b[1] - a[1]) * t2 - Math.sin(t2 * Math.PI) * 50; ctx.globalAlpha = Math.sin(t2 * Math.PI); ctx.font = '18px system-ui'; ctx.textAlign = 'center'; ctx.fillText('💗', x, y); } }
        else { glow(f.c, 14, () => { ctx.strokeStyle = f.c; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(a[0], a[1]); for (let s2 = 1; s2 < 7; s2++) { const t2 = s2 / 7; ctx.lineTo(a[0] + (b[0] - a[0]) * t2 + (s2 % 2 ? 1 : -1) * 14 * Math.sin(f.t * .05 + s2), a[1] + (b[1] - a[1]) * t2 + (s2 % 2 ? -1 : 1) * 8); } ctx.lineTo(b[0], b[1]); ctx.stroke(); }); }
        ctx.restore();
      }
      for (let i = emotes.length - 1; i >= 0; i--) { const e = emotes[i]; e.life -= dt; if (e.life <= 0) { emotes.splice(i, 1); continue; } const k = 1 - e.life / e.max; ctx.globalAlpha = Math.min(1, e.life / 500); ctx.font = '26px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.fillText(e.txt, e.x + Math.sin(k * 9) * 4, e.y - k * 36); }
      ctx.globalAlpha = 1;
    }
    function particles(dt) {
      for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.x += p.vx * dt * .06; p.y += p.vy * dt * .06; p.vy += p.g * dt * .06; ctx.globalAlpha = Math.max(0, p.life / p.max); ctx.fillStyle = p.c; if (p.sq) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.life * .01); ctx.fillRect(-3, -2, 6, 4); ctx.restore(); } else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill(); } }
      ctx.globalAlpha = 1;
      for (let i = coins.length - 1; i >= 0; i--) { const c = coins[i]; c.t += dt / 520; if (c.t >= 1) { coins.splice(i, 1); continue; } const e = c.t * c.t * (3 - 2 * c.t), x = c.x0 + (c.x1 - c.x0) * e, y = c.y0 + (c.y1 - c.y0) * e - Math.sin(c.t * Math.PI) * 70; glow(c.c, 14, () => { ctx.fillStyle = c.c; ctx.beginPath(); ctx.ellipse(x, y, 13 * Math.abs(Math.cos(c.t * 9)) + 3, 13, 0, 0, TAU); ctx.fill(); }); ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.font = '800 12px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Rp', x, y + 4); }
    }
    let L = k => k;
    const burst = (x, y, n, cols, speed, sq, g) => { for (let i = 0; i < n; i++) { const a = Math.random() * TAU, s = (.4 + Math.random()) * speed; parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - speed * .6, g: g == null ? .05 : g, life: 700 + Math.random() * 700, max: 1400, r: 2 + Math.random() * 3, c: cols[i % cols.length], sq }); } };

    const YOUP = [350, 372], ALLYP = [[232, 358, .88], [124, 346, .8]];
    const oppPos = (n, k) => n === 1 ? [630, 372, 1] : k === 0 ? [598, 372, 1] : [744, 358, .9];
    function draw(dt) {
      dt = dt || 0;
      ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0);
      ctx.save();
      if (shake > 0) ctx.translate((Math.random() - .5) * shake, (Math.random() - .5) * shake);
      background(); spotlight(); floor(); table(); goods();
      const n = v.opps.length, items = [];
      /* pads first, then people sorted by depth */
      pad(YOUP[0] + cur.youX, YOUP[1] + 8, pal.glow, 1, L('youLbl'), 0);
      v.allies.forEach((a, i) => { const p = ALLYP[i]; pad(p[0], p[1] + 8, ALLY[a.id].col, p[2], L('alName_' + a.id), a.pulse); });
      v.opps.forEach((q, k) => { const p = oppPos(n, k), off = (v.ended === 'npcwalk' && k === v.walker) ? cur.npcX : 0; if (off > 110) return; pad(p[0] + off, p[1] + 8, pal.pink, p[2], L('n' + q.p + 'name'), (v.speaker === k && !v.ended) ? .5 : 0); });
      const youA = v.ended === 'walk' ? Math.max(0, 1 - Math.abs(cur.youX) / 160) : 1;
      items.push({ y: YOUP[1], f: () => person({ x: YOUP[0] + cur.youX, y: YOUP[1], look: YOU, deco: [], mood: v.ended === 'deal' ? 'happy' : 'neutral', talk: v.talkY, isYou: true, alpha: youA, side: 1, reach: cur.deal, ph: 0 }) });
      v.allies.forEach((a, i) => { const p = ALLYP[i], A = ALLY[a.id]; items.push({ y: p[1], f: () => person({ x: p[0] + (a.pulse > 0 ? 14 * a.pulse : 0), y: p[1], look: A.look, deco: A.deco, mood: v.ended === 'deal' ? 'happy' : a.pulse > 0 ? 'happy' : 'neutral', talk: a.pulse > .5 ? 1 : 0, isYou: true, sc: p[2], side: 1, pulse: a.pulse, pcol: A.col, ph: 1.3 + i }) }); });
      v.opps.forEach((q, k) => {
        const p = oppPos(n, k), walking = v.ended === 'npcwalk' && k === v.walker, off = walking ? cur.npcX : 0, al = walking ? Math.max(0, 1 - cur.npcX / 160) : 1;
        items.push({ y: p[1], f: () => person({ x: p[0] + off, y: p[1], look: LOOKS[q.p], deco: DECO[q.p], mood: q.mood, talk: (v.speaker === k ? v.talkN : 0), isYou: false, alpha: al, sc: p[2], side: -1, reach: (v.ended === 'deal' && k === v.speaker) ? cur.deal : 0, ph: 1.7 + k * 2.1 }) });
      });
      items.sort((a, b) => a.y - b.y).forEach(it => it.f());
      /* speaker marker (when two sellers) */
      if (n > 1 && !v.ended) { const k = v.addr == null ? v.turn : v.addr, p = oppPos(n, k); const bounce = Math.sin(T * .006) * 4; glow(pal.gold, 8, () => { ctx.fillStyle = pal.gold; ctx.beginPath(); ctx.moveTo(p[0], p[1] - 168 * p[2] + bounce); ctx.lineTo(p[0] - 8, p[1] - 180 * p[2] + bounce); ctx.lineTo(p[0] + 8, p[1] - 180 * p[2] + bounce); ctx.closePath(); ctx.fill(); }); }
      holo(); v.opps.forEach((q, k) => { const p = oppPos(n, k), off = (v.ended === 'npcwalk' && k === v.walker) ? cur.npcX : 0; patience(p[0] + off, p[1] - 150 * p[2], k); });
      track(); fxLayer(dt * 1000); particles(16);
      ctx.restore();
    }

    function step(now) {
      const dt = Math.min(50, now - (last || now)); last = now; T = now;
      const e = 1 - Math.exp(-dt / 110);
      cur.ask += (v.ask - cur.ask) * e; cur.you += (v.you - cur.you) * e;
      v.opps.forEach((q, k) => { cur.pat[k] += ((q.pat == null ? 1 : q.pat) - cur.pat[k]) * (1 - Math.exp(-dt / 200)); });
      cur.npcX += ((v.npcX || 0) - cur.npcX) * (1 - Math.exp(-dt / 260)); cur.youX += ((v.youX || 0) - cur.youX) * (1 - Math.exp(-dt / 260));
      cur.deal += ((v.ended === 'deal' ? 1 : 0) - cur.deal) * (1 - Math.exp(-dt / 400));
      if (shake > 0) shake = Math.max(0, shake - dt * .03);
      if (v.talkN > 0) v.talkN -= dt; if (v.talkY > 0) v.talkY -= dt;
      v.allies.forEach(a => { if (a.pulse > 0) a.pulse = Math.max(0, a.pulse - dt / 1400); });
      draw(dt / 1000);
      if (running) raf = requestAnimationFrame(step);
    }

    const api = {
      label(fn) { L = fn; },
      /* info = { goods, opps: [{p, max}], allies: [id] } */
      setLevel(i, info) {
        lvl = i; parts.length = 0; coins.length = 0; fxs.length = 0; emotes.length = 0;
        v.goodsK = info.goods; v.opps = info.opps.map(q => ({ p: q.p, pat: 1, max: q.max, mood: 'neutral' })); v.allies = info.allies.map(id => ({ id, pulse: 0 }));
        v.walker = 0; v.speaker = 0; v.addr = 0; v.turn = 0; cur.pat = [1, 1]; cur.deal = 0; v.npcX = cur.npcX = 0; v.youX = cur.youX = 0; v.ended = null;
      },
      set(o) { Object.assign(v, o); if (o.snap) { cur.ask = v.ask; cur.you = v.you; cur.pat = v.opps.map(q => q.pat == null ? 1 : q.pat); cur.npcX = v.npcX || 0; cur.youX = v.youX || 0; } if (!running) this.draw(); },
      setTheme(d) { day = !!d; pal = d ? PAL.day : PAL.night; if (!running) this.draw(); },
      fx(name, arg) {
        const n = v.opps.length, sp = oppPos(n, arg && arg.k != null ? arg.k : v.speaker);
        if (name === 'offer') coins.push({ x0: 340, y0: 300, x1: 480, y1: 190, t: 0, c: pal.glow });
        if (name === 'counter') coins.push({ x0: sp[0] - 10, y0: 300, x1: 480, y1: 190, t: 0, c: pal.pink });
        if (name === 'deal') { burst(480, 250, 90, [pal.gold, pal.pink, pal.glow, pal.ok], 7, true); burst(330, 300, 30, [pal.glow], 4); burst(sp[0], 300, 30, [pal.pink], 4); emote(480, 120, '🤝'); }
        if (name === 'offended') { shake = 14; burst(sp[0], 270, 28, [pal.bad, pal.gold], 5); emote(sp[0], sp[1] - 190 * sp[2], '💢'); }
        if (name === 'bad') shake = 8;
        if (name === 'think') emote(sp[0], sp[1] - 190 * sp[2], '💭');
        if (name === 'happy') emote(sp[0], sp[1] - 190 * sp[2], '😊');
        if (name === 'ally' && arg) {
          const a = v.allies[arg.i], A = a && ALLY[a.id]; if (!a) return;
          a.pulse = 1; const p = ALLYP[arg.i]; emote(p[0], p[1] - 170 * p[2], A.emoji);
          fxs.push({ kind: a.id, x0: p[0] + 40, y0: p[1] - 60 * p[2], x1: sp[0] - 20, y1: sp[1] - 70, t: 0, dur: 1300, c: A.col });
          if (a.id === 'pressure' && !arg.backfire) burst(sp[0], 290, 18, [A.col], 4);
          if (arg.backfire) { shake = 10; emote(sp[0], sp[1] - 190 * sp[2], '💢'); }
        }
        if (!running) this.draw();
      },
      start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(step); },
      stop() { running = false; cancelAnimationFrame(raf); this.draw(); },
      draw() { draw(0); },
      get running() { return running; }
    };
    return api;
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.nego = MBALAB.nego || {}; MBALAB.nego.Scene = Scene;
})();
