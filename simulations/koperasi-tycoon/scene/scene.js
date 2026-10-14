/* Koperasi: animated village scene (canvas 2D). Logical size 960x540, scaled to the canvas backing store.
   MBALAB.coop.Scene(canvas) -> { set(view), fx(name), setTheme(day), start(), stop(), draw(), running } */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2;
  const PAL = {
    night: { sky: ['#0b0a2a', '#241659', '#5a2a86'], hill: '#1d1850', hill2: '#141040', road: '#2a2352', roadL: 'rgba(255,255,255,.18)', soil: '#3a2a22', water: 'rgba(90,170,255,.55)', shopW: '#f2d9a8', shopS: '#c9a870', roof: '#c0392b', awnA: '#ff5a4e', awnB: '#fff1dc', mart: '#e9f1ff', martS: '#9bb4e6', martR: '#2a6bff', glass: '#7df3ff', ink: '#fff', lamp: '#ffd36e', cloud: 'rgba(255,255,255,.10)', seed: ['#9fe08a', '#4fbf4a', '#f2c24a', '#b49a66'], base: ['#2d4f78', '#25552e', '#6a5424', '#4a3a2a'] },
    day: { sky: ['#4aa0f0', '#9fd0fb', '#f3e6fb'], hill: '#7fb0e6', hill2: '#5f98d8', road: '#b9c3e6', roadL: 'rgba(255,255,255,.7)', soil: '#a88a6a', water: 'rgba(40,120,230,.5)', shopW: '#fff1d0', shopS: '#e0b97a', roof: '#c0392b', awnA: '#e63a2e', awnB: '#fffaf0', mart: '#ffffff', martS: '#b8c9ee', martR: '#1a58e8', glass: '#6ec6f5', ink: '#081530', lamp: '#ffb200', cloud: 'rgba(255,255,255,.85)', seed: ['#3f9a3a', '#2f8a2a', '#c98a00', '#8a6a3a'], base: ['#7fb8e8', '#6bbf55', '#e8c860', '#c9aa78'] }
  };
  const SEGC = { small: '#e8a13c', big: '#4cc27a', trader: '#5aa0ff', home: '#ff6bd5', youth: '#b58cff' };
  const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(777);

  function Scene(cv) {
    const ctx = cv.getContext('2d');
    let pal = PAL.night, day = false, raf = 0, last = 0, T = 0, running = false, shake = 0, flash = 0, flashC = '#ff5d7a';
    const v = { season: 0, goods: 140, rice: 10, comp: 0, sat: { small: 56, big: 60, trader: 54, home: 62, youth: 50 }, digital: 0, storage: 0, flood: 0, rain: 0, cash: 150, over: false };
    const cur = { comp: 0, flood: 0, goods: 140, rice: 10, paddy: 0 };
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
      ctx.fillStyle = pal.shopW; ctx.fillRect(x, y, w, h); ctx.fillStyle = pal.shopS; ctx.fillRect(x, y + h - 10, w, 10);
      ctx.fillStyle = pal.roof; ctx.beginPath(); ctx.moveTo(x - 14, y + 2); ctx.lineTo(x + w / 2, y - 40); ctx.lineTo(x + w + 14, y + 2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '700 15px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText('KOPERASI', x + w / 2, y - 8);
      for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? pal.awnB : pal.awnA; ctx.beginPath(); ctx.moveTo(x - 6 + i * 26, y + 16); ctx.lineTo(x - 6 + (i + 1) * 26, y + 16); ctx.lineTo(x - 6 + (i + 1) * 26, y + 30 + Math.sin(T * 2 + i) * 1.2); ctx.lineTo(x - 6 + i * 26, y + 30); ctx.fill(); }
      ctx.fillStyle = 'rgba(40,30,20,.9)'; rr(x + 16, y + 38, 120, 62, 4); ctx.fill();
      const fill = Math.max(0, Math.min(1, cur.goods / 200));
      for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) { if ((c + r * 8) / 24 > fill) continue; ctx.fillStyle = ['#ff8a4e', '#7df3ff', '#ffd36e', '#6dffb0'][(c + r) % 4]; ctx.fillRect(x + 22 + c * 14, y + 44 + r * 19, 10, 14); }
      ctx.fillStyle = '#6a4a2a'; rr(x + 150, y + 44, 56, 66, 4); ctx.fill();
      if (v.digital) { ctx.fillStyle = pal.glass; ctx.shadowColor = pal.glass; ctx.shadowBlur = 12 + 6 * Math.sin(T * 4); rr(x + 160, y + 54, 36, 22, 3); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = '#0a1a40'; ctx.font = '700 11px system-ui'; ctx.fillText('QR', x + 178, y + 70); }
      ctx.fillStyle = pal.lamp; ctx.shadowColor = pal.lamp; ctx.shadowBlur = day ? 0 : 16; ctx.beginPath(); ctx.arc(x + w / 2, y + 6, 4, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
    }
    function mart() {
      const k = cur.comp; if (k < .02) return;
      const slide = (1 - Math.min(1, k)) * 260, big = cur.comp > 1.5 ? 1.18 : 1, x = 680 + slide, y = 300, w = 190 * big, h = 102 * big;
      ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.5);
      ctx.fillStyle = pal.mart; ctx.fillRect(x, y + 102 - h, w, h); ctx.fillStyle = pal.martS; ctx.fillRect(x, y + 94, w, 8);
      ctx.fillStyle = pal.martR; ctx.fillRect(x - 6, y + 102 - h - 12, w + 12, 24);
      ctx.fillStyle = '#fff'; ctx.font = '700 14px system-ui'; ctx.textAlign = 'center'; ctx.fillText('NUSA MART', x + w / 2, y + 102 - h + 5);
      ctx.fillStyle = pal.glass; ctx.shadowColor = pal.glass; ctx.shadowBlur = day ? 0 : 14; ctx.fillRect(x + 12, y + 102 - h + 26, w - 24, 44); ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 5; i++) ctx.fillRect(x + 16 + i * (w - 32) / 5, y + 102 - h + 30, 3, 36);
      ctx.fillStyle = '#ff3b4a'; ctx.font = '800 11px system-ui'; ctx.fillText('PROMO', x + w - 30, y + 102 - h + 20);
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
    let dtv = 0;
    function draw(dt) {
      dt = dt || 0; dtv = dt; const sx = cv.width / W; ctx.setTransform(sx, 0, 0, sx, 0, 0);
      cur.comp = lerp(cur.comp, v.comp, .04); cur.flood = lerp(cur.flood, v.flood, .04); cur.goods = lerp(cur.goods, v.goods, .08); cur.rice = lerp(cur.rice, v.rice, .08);
      if (shake > 0) { shake -= dt; ctx.translate((Math.random() - .5) * 6, (Math.random() - .5) * 4); }
      sky(); hills(); paddy(); hut(150, 372); palm(40, 400, 1); palm(910, 400, 1.1); road(); mart(); shop(); people(dt); particles(dt); rain();
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
