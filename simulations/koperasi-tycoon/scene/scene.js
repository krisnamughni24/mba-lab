/* Koperasi: animated village scene (canvas 2D). Logical size 960x540, scaled to the canvas backing store.
   MBALAB.coop.Scene(canvas) -> { set(view), fx(name), setTheme(day), start(), stop(), draw(), running } */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2;
  const PAL = {
    night: { sky: ['#0b0a2a', '#241659', '#5a2a86'], hill: '#1d1850', hill2: '#141040', road: '#2a2352', roadL: 'rgba(255,255,255,.18)', soil: '#3a2a22', water: 'rgba(90,170,255,.55)', shopW: '#f2d9a8', shopS: '#c9a870', roof: '#c0392b', awnA: '#ff5a4e', awnB: '#fff1dc', mart: '#e9f1ff', martS: '#9bb4e6', martR: '#2a6bff', glass: '#7df3ff', ink: '#fff', lamp: '#ffd36e', cloud: 'rgba(255,255,255,.10)', seed: ['#9fe08a', '#4fbf4a', '#f2c24a', '#b49a66'], base: ['#2d4f78', '#25552e', '#6a5424', '#4a3a2a'] },
    day: { sky: ['#4aa0f0', '#9fd0fb', '#f3e6fb'], hill: '#7fb0e6', hill2: '#5f98d8', road: '#b9c3e6', roadL: 'rgba(255,255,255,.7)', soil: '#a88a6a', water: 'rgba(40,120,230,.5)', shopW: '#fff1d0', shopS: '#e0b97a', roof: '#c0392b', awnA: '#e63a2e', awnB: '#fffaf0', mart: '#ffffff', martS: '#b8c9ee', martR: '#1a58e8', glass: '#6ec6f5', ink: '#081530', lamp: '#ffb200', cloud: 'rgba(255,255,255,.85)', seed: ['#3f9a3a', '#2f8a2a', '#c98a00', '#8a6a3a'], base: ['#7fb8e8', '#6bbf55', '#e8c860', '#c9aa78'] }
  };
  /* extra colours for the remote village and the fishing kampung */
  Object.assign(PAL.night, { mist: 'rgba(190,200,255,.10)', dirt: '#4a3a34', dirtL: '#6a5648', sand: '#6a5a52', sea: ['#14307a', '#0b1b52'], seaL: 'rgba(160,210,255,.35)', wood: '#4a3226', woodL: '#6a4a36', terr: ['#2f5a46', '#2f6a3a', '#7a6a2e', '#4f3f33'] });
  Object.assign(PAL.day, { mist: 'rgba(255,255,255,.38)', dirt: '#b8956a', dirtL: '#d6b88a', sand: '#ead7a8', sea: ['#3f93e6', '#2a6cc0'], seaL: 'rgba(255,255,255,.55)', wood: '#9a7448', woodL: '#c49a62', terr: ['#6aa05a', '#52a64a', '#c9a236', '#a8895a'] });
  const SEGC = { small: '#e8a13c', big: '#4cc27a', trader: '#5aa0ff', home: '#ff6bd5', youth: '#b58cff' };
  const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(777);

  function Scene(cv) {
    const ctx = cv.getContext('2d');
    let pal = PAL.night, day = false, raf = 0, last = 0, T = 0, running = false, shake = 0, flash = 0, flashC = '#ff5d7a';
    const v = { mode: 'village', road: 0, solar: 0, signal: 0, boat: 0, tpi: 0, cut: 0, season: 0, goods: 140, rice: 10, comp: 0, sat: { small: 56, big: 60, trader: 54, home: 62, youth: 50 }, digital: 0, storage: 0, flood: 0, rain: 0, cash: 150, over: false };
    const cur = { slide: 0, go: 1, comp: 0, flood: 0, goods: 140, rice: 10, paddy: 0 };
    const parts = [], walkers = [], clouds = [], stars = [];
    for (let i = 0; i < 60; i++) stars.push([rnd() * W, rnd() * 200, rnd() * 1.3 + .3, rnd() * TAU]);
    for (let i = 0; i < 5; i++) clouds.push({ x: rnd() * W, y: 40 + rnd() * 110, s: .7 + rnd() * .8, v: 6 + rnd() * 10 });
    const SEGS = ['small', 'big', 'trader', 'home', 'youth'];
    const spawn = () => {
      const k = SEGS[Math.floor(rnd() * 5)], dir = rnd() < .5 ? 1 : -1;
      walkers.push({ k, x: dir > 0 ? -20 : W + 20, y: 430 + rnd() * 40, v: (28 + rnd() * 26) * dir, ph: rnd() * TAU, to: 0, a: 1, st: 0 });
    };
    for (let i = 0; i < 7; i++) { spawn(); walkers[i].x = rnd() * W; }
    const lerp = (a, b, k) => a + (b - a) * k;
    const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const mix = (c1, c2, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const a = p(c1), b = p(c2); return 'rgb(' + a.map((x, i) => Math.round(lerp(x, b[i], k))).join(',') + ')'; };

    function set(o) { Object.assign(v, o); if (o.sat) v.sat = Object.assign({}, v.sat, o.sat); }
    function fx(name) {
      if (name === 'sale') for (let i = 0; i < 10; i++) parts.push({ x: 470 + rnd() * 30, y: 400, vx: (rnd() - .5) * 90, vy: -140 - rnd() * 80, g: 380, life: 1.1, k: 'coin' });
      else if (name === 'cheer') for (let i = 0; i < 14; i++) parts.push({ x: 300 + rnd() * 360, y: 420, vx: (rnd() - .5) * 40, vy: -60 - rnd() * 60, g: -10, life: 1.6, k: 'heart' });
      else if (name === 'warn') { shake = .5; flash = .6; flashC = '#ff5d7a'; for (let i = 0; i < 10; i++) parts.push({ x: 300 + rnd() * 360, y: 410, vx: (rnd() - .5) * 40, vy: -50 - rnd() * 40, g: -4, life: 1.4, k: 'cloud' }); }
      else if (name === 'ok') { flash = .45; flashC = '#6dffb0'; }
    }
    function setTheme(d) { day = !!d; pal = d ? PAL.day : PAL.night; draw(); }

    /* ---------- drawing helpers ---------- */
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
    function sky() {
      const g = ctx.createLinearGradient(0, 0, 0, 330); pal.sky.forEach((c, i) => g.addColorStop(i / 2, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (!day) { stars.forEach(s => { ctx.globalAlpha = .4 + .5 * Math.sin(T * 1.6 + s[3]); ctx.fillStyle = '#fff'; ctx.fillRect(s[0], s[1], s[2], s[2]); }); ctx.globalAlpha = 1; }
      const sx = 780 + Math.sin(T * .05) * 10, sy = 85;
      ctx.beginPath(); ctx.arc(sx, sy, day ? 34 : 26, 0, TAU); ctx.fillStyle = day ? '#ffd35a' : '#f5f2ff'; ctx.shadowColor = day ? '#ffcf4a' : '#c9b8ff'; ctx.shadowBlur = 40; ctx.fill(); ctx.shadowBlur = 0;
      if (!day) { ctx.beginPath(); ctx.arc(sx + 8, sy - 4, 22, 0, TAU); ctx.fillStyle = pal.sky[1]; ctx.fill(); }
      clouds.forEach(c => { c.x += c.v * dtv; if (c.x > W + 80) c.x = -80; ctx.fillStyle = pal.cloud; [[0, 0, 30], [26, -8, 24], [52, 0, 28], [24, 8, 24]].forEach(p => { ctx.beginPath(); ctx.ellipse(c.x + p[0] * c.s, c.y + p[1] * c.s, p[2] * c.s, p[2] * .62 * c.s, 0, 0, TAU); ctx.fill(); }); });
    }
    function hills() {
      ctx.fillStyle = pal.hill; ctx.beginPath(); ctx.moveTo(0, 300); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 255 + Math.sin(x * .011 + 1) * 26 + Math.sin(x * .031) * 8); ctx.lineTo(W, 330); ctx.lineTo(0, 330); ctx.fill();
      ctx.fillStyle = pal.hill2; ctx.beginPath(); ctx.moveTo(0, 330); for (let x = 0; x <= W; x += 40) ctx.lineTo(x, 292 + Math.sin(x * .017 + 3) * 18); ctx.lineTo(W, 340); ctx.lineTo(0, 340); ctx.fill();
    }
    function paddy() {
      const se = v.season, tgt = se; cur.paddy = lerp(cur.paddy, tgt, .05); const y0 = 322, h = 78;
      const bt = hex(pal.base[se]); cur.col = cur.col || bt.slice(); for (let i = 0; i < 3; i++) cur.col[i] = lerp(cur.col[i], bt[i], .04);
      ctx.fillStyle = 'rgb(' + cur.col.map(Math.round).join(',') + ')'; ctx.fillRect(0, y0, W, h);
      if (se === 0) { ctx.fillStyle = 'rgba(255,255,255,.18)'; for (let i = 0; i < 12; i++) { const gx = (i * 83 + T * 14) % W; ctx.fillRect(gx, y0 + 10 + (i % 4) * 18, 26, 2); } }
      const sc = pal.seed;
      for (let r = 0; r < 4; r++) {
        const y = y0 + 6 + r * 18;
        for (let x = (r % 2) * 9; x < W; x += 18) {
          const sway = Math.sin(T * 2 + x * .05 + r) * (se === 3 ? 1 : 3);
          let col = se === 0 ? sc[0] : se === 1 ? sc[1] : se === 2 ? sc[2] : sc[3], ht = se === 0 ? 7 : se === 1 ? 14 : se === 2 ? 18 : 6;
          if (cur.flood > .3) col = mix('#3f7a3a', '#7a6a4a', Math.min(1, cur.flood));
          ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(x, y + 12); ctx.quadraticCurveTo(x + sway * .5, y + 12 - ht * .6, x + sway, y + 12 - ht); ctx.stroke();
          if (se === 2) { ctx.fillStyle = sc[2]; ctx.fillRect(x + sway - 1, y + 10 - ht, 3, 4); }
        }
      }
      if (se === 0) { ctx.fillStyle = 'rgba(120,190,255,.28)'; ctx.fillRect(0, y0 + 6, W, 66); }
      if (cur.flood > .02) { ctx.fillStyle = pal.water; const wy = y0 + h - 12 - cur.flood * 66; ctx.beginPath(); ctx.moveTo(0, wy); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, wy + Math.sin(T * 3 + x * .04) * 2.5); ctx.lineTo(W, y0 + h); ctx.lineTo(0, y0 + h); ctx.fill(); }
    }
    function road() {
      ctx.fillStyle = pal.road; ctx.fillRect(0, 400, W, 90); ctx.fillStyle = pal.roadL; for (let x = -((T * 20) % 60); x < W; x += 60) ctx.fillRect(x, 445, 30, 3);
      ctx.fillStyle = day ? '#8ab86a' : '#1f4a3a'; ctx.fillRect(0, 490, W, 50);
    }
    function palm(x, y, sc) {
      ctx.strokeStyle = day ? '#7a5a34' : '#4a3a2a'; ctx.lineWidth = 6 * sc; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 6 * sc, y - 50 * sc, x + 2 * sc, y - 90 * sc); ctx.stroke();
      ctx.strokeStyle = day ? '#2f8a3a' : '#2a7a4a'; ctx.lineWidth = 4 * sc;
      for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .55 + Math.sin(T * 1.5 + i) * .05; ctx.beginPath(); ctx.moveTo(x + 2 * sc, y - 90 * sc); ctx.quadraticCurveTo(x + 2 * sc + Math.cos(a) * 28 * sc, y - 90 * sc + Math.sin(a) * 28 * sc - 8 * sc, x + 2 * sc + Math.cos(a) * 52 * sc, y - 90 * sc + Math.sin(a) * 40 * sc + 14 * sc); ctx.stroke(); }
      ctx.lineCap = 'butt';
    }
    function hut(x, y) { ctx.fillStyle = day ? '#c9a26a' : '#6a4a3a'; ctx.fillRect(x, y, 46, 30); ctx.fillStyle = day ? '#a8732e' : '#3a2a28'; ctx.beginPath(); ctx.moveTo(x - 6, y + 2); ctx.lineTo(x + 23, y - 20); ctx.lineTo(x + 52, y + 2); ctx.fill(); ctx.fillStyle = pal.lamp; ctx.globalAlpha = day ? .3 : .9; ctx.fillRect(x + 18, y + 10, 10, 10); ctx.globalAlpha = 1; }
    function shop() {
      const x = 330, y = 290, w = 230, h = 112;
      /* warehouse (when built) */
      if (v.storage) { ctx.fillStyle = pal.shopS; ctx.fillRect(x - 100, y + 40, 90, 72); ctx.fillStyle = pal.roof; ctx.beginPath(); ctx.moveTo(x - 108, y + 42); ctx.lineTo(x - 55, y + 10); ctx.lineTo(x - 2, y + 42); ctx.fill(); const n = Math.min(8, Math.round(cur.rice / 5)); for (let i = 0; i < n; i++) { ctx.fillStyle = '#f4e4b8'; rr(x - 94 + (i % 4) * 20, y + 98 - Math.floor(i / 4) * 16, 18, 14, 4); ctx.fill(); } }
      ctx.fillStyle = day ? '#d9b46e' : '#a98a54'; ctx.beginPath(); ctx.moveTo(x + w, y); ctx.lineTo(x + w + 24, y - 12); ctx.lineTo(x + w + 24, y + h - 12); ctx.lineTo(x + w, y + h); ctx.fill();
      ctx.fillStyle = day ? '#a8402e' : '#8a2e2a'; ctx.beginPath(); ctx.moveTo(x + w / 2, y - 40); ctx.lineTo(x + w + 14, y + 2); ctx.lineTo(x + w + 38, y - 10); ctx.lineTo(x + w / 2 + 24, y - 52); ctx.fill();
      win(x + w + 6, y + 30, 12, 34, true);
      ctx.fillStyle = pal.shopW; ctx.fillRect(x, y, w, h); ctx.fillStyle = pal.shopS; ctx.fillRect(x, y + h - 10, w, 10);
      ctx.fillStyle = pal.roof; ctx.beginPath(); ctx.moveTo(x - 14, y + 2); ctx.lineTo(x + w / 2, y - 40); ctx.lineTo(x + w + 14, y + 2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '700 15px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText('KOPERASI', x + w / 2, y - 8);
      for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? pal.awnB : pal.awnA; ctx.beginPath(); ctx.moveTo(x - 6 + i * 26, y + 16); ctx.lineTo(x - 6 + (i + 1) * 26, y + 16); ctx.lineTo(x - 6 + (i + 1) * 26, y + 30 + Math.sin(T * 2 + i) * 1.2); ctx.lineTo(x - 6 + i * 26, y + 30); ctx.fill(); }
      ctx.fillStyle = day ? '#9cc6e8' : 'rgba(40,30,20,.9)'; rr(x + 16, y + 38, 120, 62, 4); ctx.fill(); ctx.strokeStyle = day ? '#fff8e8' : '#3a2a20'; ctx.lineWidth = 3; ctx.stroke(); if (day) { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(x + 30, y + 99); ctx.lineTo(x + 62, y + 39); ctx.lineTo(x + 78, y + 39); ctx.lineTo(x + 46, y + 99); ctx.fill(); }
      const fill = Math.max(0, Math.min(1, cur.goods / 200));
      for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) { if ((c + r * 8) / 24 > fill) continue; ctx.fillStyle = ['#ff8a4e', '#7df3ff', '#ffd36e', '#6dffb0'][(c + r) % 4]; ctx.fillRect(x + 22 + c * 14, y + 44 + r * 19, 10, 14); }
      ctx.fillStyle = '#6a4a2a'; rr(x + 150, y + 44, 56, 66, 4); ctx.fill(); if (!v.digital) win(x + 164, y + 52, 28, 22, true);
      if (v.digital) { ctx.fillStyle = pal.glass; ctx.shadowColor = pal.glass; ctx.shadowBlur = 12 + 6 * Math.sin(T * 4); rr(x + 160, y + 54, 36, 22, 3); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = '#0a1a40'; ctx.font = '700 11px system-ui'; ctx.fillText('QR', x + 178, y + 70); }
      ctx.fillStyle = pal.lamp; ctx.shadowColor = pal.lamp; ctx.shadowBlur = day ? 0 : 16; ctx.beginPath(); ctx.arc(x + w / 2, y + 6, 4, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
    }
    /* window: lit and warm at night, reflective glass with a glare by day */
    function win(x, y, w, h, lit) {
      if (day) { const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, '#a8dcff'); g.addColorStop(1, '#4f9be0'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.moveTo(x + w * .15, y + h); ctx.lineTo(x + w * .5, y); ctx.lineTo(x + w * .72, y); ctx.lineTo(x + w * .37, y + h); ctx.fill(); }
      else { ctx.fillStyle = lit ? '#ffd98a' : '#243a6a'; ctx.shadowColor = '#ffd36e'; ctx.shadowBlur = lit ? 14 : 0; ctx.fillRect(x, y, w, h); ctx.shadowBlur = 0; }
      ctx.strokeStyle = day ? '#f4f8ff' : '#0b0720'; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h); ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2); ctx.stroke();
      ctx.fillStyle = day ? '#cfd8ea' : '#3a2f66'; ctx.fillRect(x - 2, y + h, w + 4, 3);
    }
    function mart() {
      const k = cur.comp; if (k < .02) return;
      const slide = (1 - Math.min(1, k)) * 260, big = cur.comp > 1.5 ? 1.18 : 1, x = 680 + slide, w = 190 * big, h = 102 * big, top = 402 - h, d = 30 * big;
      ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.5);
      /* side face and roof for depth */
      ctx.fillStyle = day ? '#aebfe6' : '#6a7fb8'; ctx.beginPath(); ctx.moveTo(x + w, top); ctx.lineTo(x + w + d, top - 16); ctx.lineTo(x + w + d, 386); ctx.lineTo(x + w, 402); ctx.fill();
      ctx.fillStyle = day ? '#8da4d8' : '#4a5c94'; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(x + w + 6, top + 20 + i * 36); ctx.lineTo(x + w + d - 6, top + 10 + i * 36 - 3); ctx.lineTo(x + w + d - 6, top + 28 + i * 36 - 3); ctx.lineTo(x + w + 6, top + 38 + i * 36); ctx.fill(); }
      ctx.fillStyle = day ? '#d9e3f7' : '#8fa0cc'; ctx.beginPath(); ctx.moveTo(x - 6, top - 12); ctx.lineTo(x + d - 6, top - 28); ctx.lineTo(x + w + d + 6, top - 28); ctx.lineTo(x + w + 6, top - 12); ctx.fill();
      ctx.fillStyle = day ? '#9fb2dc' : '#56689f'; ctx.fillRect(x + w * .62, top - 26, 26, 12); ctx.fillRect(x + w * .8, top - 24, 22, 10);
      /* front */
      ctx.fillStyle = pal.mart; ctx.fillRect(x, top, w, h); ctx.fillStyle = pal.martS; ctx.fillRect(x, 394, w, 8);
      ctx.fillStyle = pal.martR; ctx.fillRect(x - 6, top - 12, w + 12, 24);
      ctx.fillStyle = '#fff'; ctx.font = '700 14px system-ui'; ctx.textAlign = 'center'; ctx.fillText('NUSA MART', x + w / 2, top + 5);
      const n = 4, ww = (w - 30) / n - 8; for (let i = 0; i < n; i++) win(x + 15 + i * (ww + 8), top + 18, ww, 20, (i + Math.floor(T / 3)) % 3 !== 0);
      const gy = top + 46, gh = 394 - gy; win(x + 12, gy, w * .5, gh, true); win(x + 20 + w * .5, gy, w * .5 - 32, gh, true);
      ctx.fillStyle = day ? '#e9f2ff' : '#2a3a70'; ctx.fillRect(x + w * .5 + 6, gy, 8, gh);
      ctx.fillStyle = '#ff3b4a'; ctx.font = '800 11px system-ui'; ctx.fillText('PROMO', x + w - 32, top + 54);
      ctx.restore();
    }
    function bubble(x, y, s) { const hap = s >= 62, sad = s < 40; ctx.fillStyle = hap ? '#ff6bd5' : sad ? '#ff5d7a' : '#ffd36e'; ctx.beginPath(); if (hap) { ctx.moveTo(x, y + 3); ctx.bezierCurveTo(x - 7, y - 3, x - 3, y - 8, x, y - 4); ctx.bezierCurveTo(x + 3, y - 8, x + 7, y - 3, x, y + 3); } else ctx.arc(x, y - 2, 3.2, 0, TAU); ctx.fill(); if (sad) { ctx.fillStyle = '#fff'; ctx.fillRect(x - 1, y - 5, 2, 4); } }
    function person(w) {
      const bob = Math.sin(T * 8 + w.ph) * 1.6, x = w.x, y = w.y + bob, c = SEGC[w.k], dir = w.v > 0 ? 1 : -1;
      ctx.globalAlpha = w.a; ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(x, w.y + 14, 9, 3, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = '#2a1a12'; ctx.lineWidth = 3; const st = Math.sin(T * 8 + w.ph) * 4; ctx.beginPath(); ctx.moveTo(x - 2, y + 4); ctx.lineTo(x - 2 + st, y + 14); ctx.moveTo(x + 2, y + 4); ctx.lineTo(x + 2 - st, y + 14); ctx.stroke();
      ctx.fillStyle = c; rr(x - 7, y - 12, 14, 18, 5); ctx.fill();
      ctx.fillStyle = '#e8b48a'; ctx.beginPath(); ctx.arc(x, y - 17, 6, 0, TAU); ctx.fill();
      if (w.k === 'small' || w.k === 'big') { ctx.fillStyle = '#e8c860'; ctx.beginPath(); ctx.ellipse(x, y - 21, 10, 3, 0, 0, TAU); ctx.fill(); ctx.fillRect(x - 5, y - 26, 10, 5); }
      else { ctx.fillStyle = '#2a1a12'; ctx.beginPath(); ctx.arc(x, y - 19, 6, Math.PI, TAU); ctx.fill(); }
      if (w.k === 'home') { ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = 2; ctx.strokeRect(x + dir * 9 - 4, y - 2, 8, 8); }
      bubble(x, y - 33, v.sat[w.k]); ctx.globalAlpha = 1;
    }
    function people(dt) {
      const want = Math.round(5 + (v.sat.home - 40) / 8); while (walkers.length < Math.max(4, Math.min(11, want))) spawn();
      const shopX = 445, martX = 770;
      walkers.forEach((w, i) => {
        w.x += w.v * dt;
        if (!w.st && w.to === 0 && Math.abs(w.x - shopX) < 3) { w.st = 1; w.t0 = T; if (rnd() < .6) fx('sale'); }
        if (w.st === 1) { w.a = Math.max(0, w.a - dt * 1.6); if (w.a <= 0) { w.st = 2; } }
        if (w.st === 2) { w.x = (rnd() < .5 ? -20 : W + 20); w.v = Math.abs(w.v) * (w.x < 0 ? 1 : -1); w.a = 1; w.st = 0; w.to = 0; w.k = SEGS[Math.floor(rnd() * 5)]; }
        if (w.x > W + 30 || w.x < -30) { w.x = w.v > 0 ? -20 : W + 20; w.k = SEGS[Math.floor(rnd() * 5)]; w.st = 0; w.a = 1; }
        if (cur.comp > .5 && !w.st && Math.abs(w.x - martX) < 3 && rnd() < .3) { w.st = 1; }
      });
      for (let i = walkers.length - 1; i >= 0; i--) if (walkers.length > Math.max(4, Math.min(11, want)) + 2 && walkers[i].x < 0) walkers.splice(i, 1);
      walkers.slice().sort((a, b) => a.y - b.y).forEach(person);
    }
    function particles(dt) {
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; }
        p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; ctx.globalAlpha = Math.min(1, p.life);
        if (p.k === 'coin') { ctx.fillStyle = '#ffd36e'; ctx.beginPath(); ctx.ellipse(p.x, p.y, 5 * Math.abs(Math.cos(T * 9 + i)), 5, 0, 0, TAU); ctx.fill(); }
        else if (p.k === 'heart') bubble(p.x, p.y, 90);
        else { ctx.fillStyle = 'rgba(120,120,140,.6)'; ctx.beginPath(); ctx.arc(p.x, p.y, 6 + (1.4 - p.life) * 8, 0, TAU); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
    }
    function rain() {
      if (v.rain <= 0 && cur.flood < .05) return; ctx.strokeStyle = 'rgba(170,210,255,.55)'; ctx.lineWidth = 1.2; ctx.beginPath();
      for (let i = 0; i < 90; i++) { const x = (i * 97 + T * 220) % (W + 80) - 40, y = (i * 53 + T * 520) % 420; ctx.moveTo(x, y); ctx.lineTo(x - 5, y + 14); } ctx.stroke();
    }

    /* ================= remote highland village ================= */
    function mountains() {
      [{ y: 252, a: 74, f: .008, c: pal.hill, o: 3 }, { y: 296, a: 48, f: .014, c: pal.hill2, o: 7 }].forEach(L => {
        ctx.fillStyle = L.c; ctx.beginPath(); ctx.moveTo(0, 340);
        for (let x = 0; x <= W; x += 20) ctx.lineTo(x, L.y - Math.abs(Math.sin(x * L.f + L.o)) * L.a - Math.sin(x * .05 + L.o) * 6);
        ctx.lineTo(W, 340); ctx.fill();
      });
      ctx.fillStyle = pal.mist; for (let i = 0; i < 3; i++) { const x = ((T * (7 + i * 3) + i * 330) % (W + 400)) - 200; ctx.beginPath(); ctx.ellipse(x, 280 + i * 22, 230, 16 + i * 3, 0, 0, TAU); ctx.fill(); }
    }
    function terraces() {
      const se = v.season, y0 = 316; cur.col = cur.col || hex(pal.terr[se]).slice();
      const tgt = hex(pal.terr[se]); for (let i = 0; i < 3; i++) cur.col[i] = lerp(cur.col[i], tgt[i], .04);
      const base = 'rgb(' + cur.col.map(Math.round).join(',') + ')';
      for (let r = 0; r < 4; r++) {
        const y = y0 + r * 21, off = r % 2 ? 24 : 0;
        ctx.fillStyle = mix(rgb2hex(cur.col), '#000000', .12 * r); ctx.beginPath(); ctx.moveTo(0, y + 6);
        for (let x = 0; x <= W; x += 30) ctx.lineTo(x, y + Math.sin(x * .02 + r * 2) * 4); ctx.lineTo(W, y + 26); ctx.lineTo(0, y + 26); ctx.fill();
        ctx.strokeStyle = day ? 'rgba(80,50,20,.35)' : 'rgba(0,0,0,.4)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= W; x += 30) ctx.lineTo(x, y + 20 + Math.sin(x * .02 + r * 2 + .5) * 4); ctx.stroke();
        for (let x = off; x < W; x += 48) {                      /* coffee bushes */
          const sw = Math.sin(T * 1.6 + x * .03 + r) * 1.4;
          ctx.fillStyle = day ? '#2f7a3a' : '#1f5a36'; ctx.beginPath(); ctx.ellipse(x + sw, y + 10, 10, 7, 0, 0, TAU); ctx.fill();
          if (se === 2) { ctx.fillStyle = '#e8394a'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x - 5 + k * 5 + sw, y + 8 + (k % 2) * 3, 1.8, 0, TAU); ctx.fill(); } }
        }
      }
      if (se === 0) { ctx.fillStyle = 'rgba(120,170,230,.16)'; ctx.fillRect(0, y0, W, 84); }
    }
    const rgb2hex = c => '#' + c.map(x => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, '0')).join('');
    function pine(x, y, sc) {
      ctx.fillStyle = day ? '#6a4a2a' : '#3a2a22'; ctx.fillRect(x - 3 * sc, y - 14 * sc, 6 * sc, 16 * sc);
      for (let i = 0; i < 4; i++) { const w = (34 - i * 7) * sc, yy = y - (14 + i * 22) * sc; ctx.fillStyle = day ? (i % 2 ? '#2f7a4a' : '#3a8a54') : (i % 2 ? '#1b4a3a' : '#215a44'); ctx.beginPath(); ctx.moveTo(x - w, yy); ctx.lineTo(x + Math.sin(T * 1.3 + x) * 1.5 * sc, yy - 34 * sc); ctx.lineTo(x + w, yy); ctx.fill(); }
    }
    function mast() {
      if (!v.signal) return; const x = 860, y = 402, h = 170;
      ctx.strokeStyle = day ? '#6a7690' : '#8a96c0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x, y - h); ctx.lineTo(x + 14, y); ctx.stroke();
      ctx.lineWidth = 1.5; for (let i = 1; i < 7; i++) { const yy = y - i * h / 7, w = 14 * (1 - i / 7.4); ctx.beginPath(); ctx.moveTo(x - w, yy); ctx.lineTo(x + w, yy + h / 14); ctx.moveTo(x + w, yy); ctx.lineTo(x - w, yy + h / 14); ctx.stroke(); }
      const on = Math.sin(T * 4) > 0; ctx.fillStyle = on ? '#ff3b4a' : '#6a1a22'; ctx.shadowColor = '#ff3b4a'; ctx.shadowBlur = on ? 12 : 0; ctx.beginPath(); ctx.arc(x, y - h, 4, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = day ? 'rgba(40,90,200,.5)' : 'rgba(125,243,255,.55)'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { const k = ((T * .8 + i / 3) % 1); ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(x, y - h, 10 + k * 40, -2.4, -.7); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y - h, 10 + k * 40, Math.PI + .7, Math.PI + 2.4); ctx.stroke(); } ctx.globalAlpha = 1;
    }
    function dirtRoad() {
      ctx.fillStyle = v.road ? pal.road : pal.dirt; ctx.fillRect(0, 400, W, 90);
      if (v.road) { ctx.fillStyle = pal.roadL; for (let x = -((T * 20) % 60); x < W; x += 60) ctx.fillRect(x, 445, 30, 3); ctx.fillStyle = '#fff'; for (let x = 20; x < W; x += 120) ctx.fillRect(x, 402, 6, 12); }
      else { ctx.fillStyle = pal.dirtL; for (let i = 0; i < 40; i++) { const x = (i * 83) % W, y = 408 + (i * 37) % 78; ctx.beginPath(); ctx.ellipse(x, y, 12, 2.5, 0, 0, TAU); ctx.fill(); } }
      if (v.season === 0 || cur.flood > .2) { ctx.fillStyle = day ? 'rgba(90,150,220,.55)' : 'rgba(90,150,255,.4)'; for (let i = 0; i < 6; i++) { const x = (i * 163 + 40) % W, y = 418 + (i * 29) % 56; ctx.beginPath(); ctx.ellipse(x, y, 34, 5, 0, 0, TAU); ctx.fill(); } }
      ctx.fillStyle = day ? '#6a9a54' : '#1f4a3a'; ctx.fillRect(0, 490, W, 50);
    }
    function slide() {                                           /* landslide across the road */
      cur.slide = lerp(cur.slide, (v.cut || cur.flood > .3) && v.mode === 'remote' ? 1 : 0, .05); const k = cur.slide; if (k < .03) return;
      ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.4); const x = 745, y = 484, w = 170 * k;
      ctx.fillStyle = day ? '#8a6a48' : '#5a4636'; ctx.beginPath(); ctx.moveTo(x - w * .7, y); ctx.quadraticCurveTo(x - w * .3, y - 70 * k, x + w * .1, y - 56 * k); ctx.quadraticCurveTo(x + w * .5, y - 76 * k, x + w * .8, y); ctx.fill();
      ctx.fillStyle = day ? '#9c7c58' : '#6a5242'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(x - w * .5 + i * w * .14, y - 10 - (i % 3) * 16 * k, 10 * k + 3, 7 * k + 2, 0, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = day ? '#5a3a22' : '#3a2a1c'; ctx.lineWidth = 7 * k; ctx.beginPath(); ctx.moveTo(x - w * .4, y - 30 * k); ctx.lineTo(x + w * .45, y - 52 * k); ctx.stroke();
      [x - w * .78, x + w * .9].forEach(cx => { ctx.fillStyle = '#ff7a1a'; ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx - 7, y); ctx.lineTo(cx, y - 24); ctx.lineTo(cx + 7, y); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(cx - 4, y - 12, 8, 3); });
      ctx.restore();
    }
    function traderTruck() {
      const k = cur.comp; if (k < .02) return; const slideX = (1 - Math.min(1, k)) * 260, x = 700 + slideX, y = 452;
      ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.5);
      ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.beginPath(); ctx.ellipse(x + 70, y + 24, 80, 8, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = day ? '#d9663a' : '#a8482a'; rr(x, y - 38, 110, 52, 5); ctx.fill();
      ctx.fillStyle = day ? '#f0e2c0' : '#c9b68a'; for (let i = 0; i < 5; i++) { rr(x + 8 + i * 19, y - 56 + (i % 2) * 6, 17, 22, 6); ctx.fill(); }   /* sacks */
      ctx.fillStyle = day ? '#f4f6ff' : '#d6dcf4'; rr(x + 110, y - 28, 44, 42, 6); ctx.fill(); ctx.fillStyle = day ? '#6aa6ea' : '#1a2a66'; ctx.fillRect(x + 124, y - 22, 24, 16);
      ctx.fillStyle = '#10142e'; [20, 70, 130].forEach(wx => { ctx.beginPath(); ctx.arc(x + wx, y + 14, 12, 0, TAU); ctx.fill(); ctx.fillStyle = '#9aa6d0'; ctx.beginPath(); ctx.arc(x + wx, y + 14, 4, 0, TAU); ctx.fill(); ctx.fillStyle = '#10142e'; });
      ctx.fillStyle = '#fff'; ctx.font = '800 12px system-ui'; ctx.textAlign = 'center'; ctx.fillText('TUNAI', x + 55, y - 8);
      ctx.restore();
    }
    const moto = { x: -80, on: false, next: 4 };
    function motorbike(dt) {
      moto.next -= dt; if (!moto.on && moto.next <= 0) { moto.on = true; moto.x = -60; }
      if (!moto.on) return; const rainy = v.season === 0 && !v.road; moto.x += (rainy ? 55 : 95) * dt; const x = moto.x, y = 462 + Math.sin(T * 14) * .8;
      if (cur.slide > .5 && x > 650) { moto.x = 650; }
      if (x > W + 80) { moto.on = false; moto.next = 8 + rnd() * 8; return; }
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(x, y + 22, 26, 4, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = day ? '#c9a26a' : '#8a6a44'; ctx.fillRect(x - 30, y - 22, 22, 18); ctx.fillRect(x - 24, y - 36, 18, 14);
      ctx.fillStyle = '#10142e'; [-18, 18].forEach(wx => { ctx.beginPath(); ctx.arc(x + wx, y + 14, 9, 0, TAU); ctx.fill(); ctx.fillStyle = '#9aa6d0'; ctx.beginPath(); ctx.arc(x + wx, y + 14, 3, 0, TAU); ctx.fill(); ctx.fillStyle = '#10142e'; });
      ctx.fillStyle = '#d63fa8'; rr(x - 8, y - 6, 34, 12, 5); ctx.fill(); ctx.fillStyle = '#ffd36e'; ctx.fillRect(x + 22, y - 2, 4, 4);
      ctx.fillStyle = '#e8b48a'; ctx.beginPath(); ctx.arc(x + 6, y - 30, 6, 0, TAU); ctx.fill(); ctx.fillStyle = '#2a6bff'; rr(x - 2, y - 24, 14, 18, 5); ctx.fill();
      if (rnd() < .3) parts.push({ x: x - 34, y: y + 12, vx: -20, vy: -12, g: 4, life: .6, k: 'cloud' });
    }
    function solarPanel() {
      if (!v.solar) return; const x = 378, y = 262;
      ctx.save(); ctx.translate(x, y); ctx.rotate(-.18);
      ctx.fillStyle = day ? '#1d4a8a' : '#12306a'; ctx.fillRect(0, 0, 74, 34); ctx.strokeStyle = day ? '#c8d8f4' : '#7da0e0'; ctx.lineWidth = 1.2;
      for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(i * 18.5, 0); ctx.lineTo(i * 18.5, 34); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(0, 17); ctx.lineTo(74, 17); ctx.stroke();
      if (day) { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(26, 0); ctx.lineTo(12, 34); ctx.lineTo(0, 34); ctx.fill(); }
      ctx.restore();
    }

    /* ================= fishing kampung ================= */
    const BOATS = [[130, 330, '#e8503a'], [300, 346, '#2fa8d8'], [470, 322, '#f2b43a'], [640, 342, '#3ac27a'], [800, 328, '#c24ad8'], [220, 318, '#ff7a4a']];
    function sea() {
      const hz = 286, g = ctx.createLinearGradient(0, hz, 0, 400); g.addColorStop(0, pal.sea[0]); g.addColorStop(1, pal.sea[1]);
      ctx.fillStyle = g; ctx.fillRect(0, hz, W, 114);
      const calm = cur.go, amp = 2 + (1 - calm) * 7;
      ctx.strokeStyle = pal.seaL; ctx.lineWidth = 2;
      for (let r = 0; r < 7; r++) { const y = hz + 8 + r * 15; ctx.globalAlpha = .25 + r * .06; ctx.beginPath(); for (let x = 0; x <= W; x += 14) { const yy = y + Math.sin(x * .03 + T * (1.4 + (1 - calm) * 1.4) + r) * amp * (.4 + r * .15); x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); } ctx.stroke(); }
      ctx.globalAlpha = 1;
      const sx = 780; ctx.fillStyle = day ? 'rgba(255,240,180,.5)' : 'rgba(245,242,255,.4)'; for (let i = 0; i < 9; i++) { const w = 40 - i * 3 + Math.sin(T * 3 + i) * 5; ctx.fillRect(sx - w / 2, hz + 6 + i * 11, w, 2.5); }
      if (v.season === 0) { ctx.fillStyle = 'rgba(20,30,60,.28)'; ctx.fillRect(0, hz - 40, W, 154); }
    }
    function boat(x, y, col, sc, ang, lamp) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(sc, sc);
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 12, 46, 5, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = day ? '#8a6a3a' : '#6a4a2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-26, 2); ctx.lineTo(-30, 16); ctx.moveTo(26, 2); ctx.lineTo(30, 16); ctx.stroke();      /* outrigger poles */
      ctx.beginPath(); ctx.moveTo(-34, 14); ctx.lineTo(34, 14); ctx.stroke();
      ctx.fillStyle = day ? '#f4e4b8' : '#c9b88a'; ctx.beginPath(); ctx.ellipse(-34, 14, 9, 3, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(34, 14, 9, 3, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-44, -6); ctx.quadraticCurveTo(0, 22, 44, -6); ctx.quadraticCurveTo(0, 2, -44, -6); ctx.fill();
      ctx.fillStyle = day ? '#fff6e0' : '#d6c8a8'; ctx.beginPath(); ctx.moveTo(-40, -6); ctx.quadraticCurveTo(0, 5, 40, -6); ctx.lineTo(40, -8); ctx.quadraticCurveTo(0, 1, -40, -8); ctx.fill();
      ctx.fillStyle = day ? '#f0c6a0' : '#d6a880'; ctx.beginPath(); ctx.arc(-8, -16, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#e8c860'; ctx.beginPath(); ctx.ellipse(-8, -19, 9, 2.6, 0, 0, TAU); ctx.fill(); ctx.fillRect(-12, -24, 8, 5);
      ctx.fillStyle = col; rr(-13, -12, 10, 8, 3); ctx.fill();
      ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(14, -6); ctx.lineTo(14, -34); ctx.stroke(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(14, -34); ctx.lineTo(28 + Math.sin(T * 5) * 2, -30); ctx.lineTo(14, -26); ctx.fill();
      if (lamp && !day) { ctx.fillStyle = '#ffd98a'; ctx.shadowColor = '#ffd36e'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(14, -36, 3.5, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; }
      ctx.restore();
    }
    function boats() {
      cur.go = lerp(cur.go, v.season === 0 ? 0 : 1, .02);
      const n = Math.min(BOATS.length, 3 + v.boat * 1 + (v.tpi ? 1 : 0));
      for (let i = 0; i < n; i++) {
        const b = BOATS[i], go = cur.go, sea = v.season === 2 ? 1 : .7, bx = 80 + i * 150, beachX = 60 + i * 52, beachY = 396 + (i % 2) * 7;
        const sx = b[0] + Math.sin(T * .12 + i) * 24 * go, sy = b[1] + Math.sin(T * 1.2 + i) * 2.5 * (1 + (1 - go) * 1.5);
        const x = lerp(beachX, sx, go), y = lerp(beachY, sy, go), ang = (1 - go) * -.08 + Math.sin(T * 1.2 + i * 2) * .03 * go;
        boat(x, y, b[2], lerp(.8, .52 + (b[1] - 318) / 140, go) * (go < .98 ? 1 : 1) * sea / sea, ang, v.season === 2 || go < .9);
      }
    }
    function lighthouse() {
      const x = 902, y = 400; ctx.fillStyle = day ? '#a8987a' : '#4a3a4a'; ctx.beginPath(); ctx.moveTo(x - 36, y); ctx.lineTo(x - 18, y - 22); ctx.lineTo(x + 20, y - 22); ctx.lineTo(x + 38, y); ctx.fill();
      for (let i = 0; i < 5; i++) { const w0 = 14 - i * 1.5, w1 = 14 - (i + 1) * 1.5, y0 = y - 22 - i * 22; ctx.fillStyle = i % 2 ? (day ? '#d63a3a' : '#a82a3a') : (day ? '#fff' : '#d8d8f0'); ctx.beginPath(); ctx.moveTo(x - w0, y0); ctx.lineTo(x + w0, y0); ctx.lineTo(x + w1, y0 - 22); ctx.lineTo(x - w1, y0 - 22); ctx.fill(); }
      const ty = y - 22 - 5 * 22; ctx.fillStyle = day ? '#4a5a7a' : '#1a2248'; ctx.fillRect(x - 9, ty - 12, 18, 12); ctx.fillStyle = '#ffd36e'; ctx.shadowColor = '#ffd36e'; ctx.shadowBlur = day ? 0 : 18; ctx.fillRect(x - 6, ty - 10, 12, 8); ctx.shadowBlur = 0;
      ctx.fillStyle = day ? '#d63a3a' : '#a82a3a'; ctx.beginPath(); ctx.moveTo(x - 11, ty - 12); ctx.lineTo(x, ty - 24); ctx.lineTo(x + 11, ty - 12); ctx.fill();
      if (!day) { const a = T * .9; ctx.fillStyle = 'rgba(255,230,150,.18)'; ctx.beginPath(); ctx.moveTo(x, ty - 6); ctx.lineTo(x + Math.cos(a) * 300, ty - 6 + Math.sin(a) * 28 - 20); ctx.lineTo(x + Math.cos(a) * 300, ty - 6 + Math.sin(a) * 28 + 20); ctx.fill(); }
    }
    function gulls() {
      if (!day) return; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) { const x = ((T * (22 + i * 5) + i * 190) % (W + 80)) - 40, y = 120 + (i * 47) % 90 + Math.sin(T * 1.2 + i) * 10, f = Math.sin(T * 7 + i) * 5; ctx.beginPath(); ctx.moveTo(x - 9, y + f); ctx.quadraticCurveTo(x - 4, y - 5, x, y); ctx.quadraticCurveTo(x + 4, y - 5, x + 9, y + f); ctx.stroke(); }
    }
    function nets() {
      [[66, 372], [118, 376]].forEach(p => {
        ctx.strokeStyle = day ? '#7a5a34' : '#4a3a2a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(p[0], p[1] + 28); ctx.lineTo(p[0], p[1] - 22); ctx.moveTo(p[0] + 42, p[1] + 28); ctx.lineTo(p[0] + 42, p[1] - 22); ctx.stroke();
        ctx.strokeStyle = day ? 'rgba(60,70,90,.7)' : 'rgba(180,200,255,.5)'; ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) { const sw = Math.sin(T * 1.5 + i) * 1.2; ctx.beginPath(); ctx.moveTo(p[0], p[1] - 20 + i * 8); ctx.quadraticCurveTo(p[0] + 21, p[1] - 12 + i * 8 + sw, p[0] + 42, p[1] - 20 + i * 8); ctx.stroke(); }
        for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(p[0] + i * 8.4, p[1] - 22); ctx.lineTo(p[0] + i * 8.4, p[1] + 20); ctx.stroke(); }
      });
    }
    function boardwalk() {
      ctx.fillStyle = pal.sand; ctx.fillRect(0, 392, W, 10);
      ctx.fillStyle = pal.wood; ctx.fillRect(0, 400, W, 90); ctx.strokeStyle = pal.woodL; ctx.lineWidth = 2;
      for (let x = -((T * 20) % 60); x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 400); ctx.lineTo(x, 490); ctx.stroke(); }
      for (let y = 424; y < 490; y += 22) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.fillStyle = day ? '#8ab86a' : '#1f4a3a'; ctx.fillRect(0, 490, W, 50);
      const n = Math.min(10, Math.round(cur.rice / (v.storage ? 4 : 6)));                  /* fish crates on the pier */
      for (let i = 0; i < n; i++) { const cx = 598 + (i % 5) * 20, cy = 470 - Math.floor(i / 5) * 16; ctx.fillStyle = v.storage ? '#b6e4ff' : '#d79a4a'; ctx.fillRect(cx, cy, 18, 14); ctx.strokeStyle = day ? '#6a8aa8' : '#3a5a78'; ctx.lineWidth = 1.5; ctx.strokeRect(cx + .5, cy + .5, 17, 13); ctx.fillStyle = '#9fb4c8'; ctx.beginPath(); ctx.ellipse(cx + 9, cy + 6, 6, 2.5, 0, 0, TAU); ctx.fill(); }
    }
    function icePlant() {
      if (!v.storage || v.mode !== 'fishing') return; const x = 230, y = 322;
      ctx.fillStyle = day ? '#dff1ff' : '#4a6aa8'; ctx.fillRect(x, y + 20, 90, 82); ctx.fillStyle = day ? '#6ab4e8' : '#2a4a90'; ctx.beginPath(); ctx.moveTo(x - 8, y + 22); ctx.lineTo(x + 45, y - 10); ctx.lineTo(x + 98, y + 22); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '26px system-ui'; ctx.textAlign = 'center'; ctx.fillText('❄', x + 45, y + 62);
      ctx.fillStyle = day ? '#a8d4f0' : '#2a4a80'; ctx.fillRect(x + 62, y - 14, 14, 36);
      for (let i = 0; i < 4; i++) { const ph = (T * .5 + i * .25) % 1; ctx.globalAlpha = (1 - ph) * .5; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 69 + Math.sin(ph * 5 + i) * 6, y - 18 - ph * 40, 6 + ph * 8, 0, TAU); ctx.fill(); } ctx.globalAlpha = 1;
    }
    function auctionHall() {
      if (!v.tpi) return; const x = 604, y = 352;
      ctx.fillStyle = day ? '#e8d6a8' : '#7a6a58'; ctx.fillRect(x, y + 20, 8, 30); ctx.fillRect(x + 80, y + 20, 8, 30);
      ctx.fillStyle = day ? '#2a8ad8' : '#1f5aa8'; ctx.beginPath(); ctx.moveTo(x - 10, y + 22); ctx.lineTo(x + 44, y - 8); ctx.lineTo(x + 98, y + 22); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '800 11px system-ui'; ctx.textAlign = 'center'; ctx.fillText('TPI', x + 44, y + 14);
      ctx.fillStyle = '#ffd36e'; ctx.fillRect(x + 36, y + 34, 16, 4); ctx.fillRect(x + 43, y + 24, 2, 10);
    }
    function juragan() {
      const k = cur.comp; if (k < .02) return; const slideX = (1 - Math.min(1, k)) * 260, x = 690 + slideX, w = 190, h = 90, top = 402 - h;
      ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.5);
      ctx.fillStyle = day ? '#a8723e' : '#6a4a32'; ctx.beginPath(); ctx.moveTo(x + w, top); ctx.lineTo(x + w + 24, top - 12); ctx.lineTo(x + w + 24, 390); ctx.lineTo(x + w, 402); ctx.fill();
      ctx.fillStyle = day ? '#c9894e' : '#8a5e3a'; ctx.fillRect(x, top, w, h); ctx.strokeStyle = day ? '#9a6a3a' : '#5a3a28'; ctx.lineWidth = 2; for (let i = 1; i < 12; i++) { ctx.beginPath(); ctx.moveTo(x + i * w / 12, top); ctx.lineTo(x + i * w / 12, 402); ctx.stroke(); }
      ctx.fillStyle = day ? '#6a4a2a' : '#3a2a22'; ctx.beginPath(); ctx.moveTo(x - 8, top + 2); ctx.lineTo(x + w / 2, top - 26); ctx.lineTo(x + w + 28, top - 10); ctx.lineTo(x + w + 8, top + 2); ctx.fill();
      ctx.fillStyle = day ? '#3a2a22' : '#1a1218'; ctx.fillRect(x + 20, top + 30, 70, 60); ctx.fillRect(x + 110, top + 30, 56, 60);
      ctx.fillStyle = '#fff'; ctx.font = '800 14px system-ui'; ctx.textAlign = 'center'; ctx.fillText('JURAGAN', x + w / 2, top + 20);
      ctx.fillStyle = '#ffd36e'; ctx.font = '800 11px system-ui'; ctx.fillText('UANG MUKA', x + 138, top + 56);
      ctx.restore();
    }
    let bolt = 0;
    function stormFlash() {
      if (v.mode !== 'fishing' || v.season !== 0) return; bolt -= dtv; if (bolt < -5 && rnd() < .01) bolt = .25;
      if (bolt > 0) { ctx.globalAlpha = Math.min(.35, bolt * 1.6); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
    }
    let dtv = 0;
    function draw(dt) {
      dt = dt || 0; dtv = dt; const sx = cv.width / W; ctx.setTransform(sx, 0, 0, sx, 0, 0);
      cur.comp = lerp(cur.comp, v.comp, .04); cur.flood = lerp(cur.flood, v.flood, .04); cur.goods = lerp(cur.goods, v.goods, .08); cur.rice = lerp(cur.rice, v.rice, .08);
      if (shake > 0) { shake -= dt; ctx.translate((Math.random() - .5) * 6, (Math.random() - .5) * 4); }
      sky();
      if (v.mode === 'remote') { mountains(); terraces(); hut(150, 372); pine(52, 402, 1); pine(918, 402, 1.05); pine(250, 400, .8); dirtRoad(); mast(); slide(); traderTruck(); shop(); solarPanel(); motorbike(dt); people(dt); particles(dt); rain(); }
      else if (v.mode === 'fishing') { sea(); lighthouse(); boats(); gulls(); nets(); palm(40, 400, 1); palm(300, 402, .85); boardwalk(); auctionHall(); juragan(); shop(); icePlant(); people(dt); particles(dt); rain(); stormFlash(); }
      else { hills(); paddy(); hut(150, 372); palm(40, 400, 1); palm(910, 400, 1.1); road(); mart(); shop(); people(dt); particles(dt); rain(); }
      if (flash > 0) { ctx.globalAlpha = Math.min(.3, flash * .5); ctx.fillStyle = flashC; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; flash -= dt; }
      if (!day) { ctx.fillStyle = 'rgba(8,4,30,.0)'; }
    }
    function frame(now) { if (!running) return; const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; T += dt; draw(dt); raf = requestAnimationFrame(frame); }
    function start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    function stop() { running = false; cancelAnimationFrame(raf); draw(0); }
    return { set, fx, setTheme, start, stop, draw: () => draw(0), get running() { return running; } };
  }
  MBALAB.coop = MBALAB.coop || {}; MBALAB.coop.Scene = Scene;
})();
