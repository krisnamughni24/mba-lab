/* DISC Crisis Room: canvas scene (2D isometric neon office). Logical size 960x540.
   MBALAB.disc.Scene(canvas) -> { set(view), react(style), burst(kind), setTheme(day), start(), stop(), draw() } */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2;
  const PAL = {
    night: { sky: ['#0a0720', '#1b1050', '#43197a'], far: '#1a1245', near: '#0e0a2e', win: ['#ffd36e', '#7df3ff', '#ff6bd5'], floorA: '#150f3d', floorB: '#221663', grid: 'rgba(125,243,255,.5)', glow: '#7df3ff', pink: '#ff4fd8', gold: '#ffd36e', top: '#2b1a78', side: '#1a0f52', ink: '#fff', ok: '#6dffb0', bad: '#ff5d7a' },
    day: { sky: ['#3f94ee', '#8ec7fa', '#e8dcfb'], far: '#8fb4ee', near: '#6e97dd', win: ['#fff', '#cfe6ff', '#ffe9f7'], floorA: '#bcd6ff', floorB: '#d6e6ff', grid: 'rgba(16,60,190,.5)', glow: '#0a5fe0', pink: '#c4128a', gold: '#d98300', top: '#5a7fe0', side: '#3f5fc0', ink: '#081530', ok: '#0a8f4e', bad: '#c4122e' }
  };
  /* teammates (index = D, I, S, C): skin, hair, cloth, accent, hair kind */
  const TEAM = [['#d49a72', '#2a1a12', '#d23a4a', '#ff5d7a', 'spike'], ['#f0c6a0', '#7a3fd0', '#f08a1e', '#ffd36e', 'bun'], ['#e8b48a', '#4a2a1c', '#2f9e6a', '#6dffb0', 'bob'], ['#c98a62', '#14121c', '#3b6fe0', '#7df3ff', 'cap']];
  const YOU = ['#e8b48a', '#1a1030', '#18b6d9', '#ff4fd8', 'spike'];
  const POS = [[300, 322], [660, 322], [388, 250], [572, 250]];     // D left, I right, S back-left, C back-right (screen)

  function Scene(cv) {
    const ctx = cv.getContext('2d');
    let pal = PAL.night, day = false, raf = 0, last = 0, T = 0, running = false, shake = 0;
    const v = { icon: '🔥', alarm: 1, resolved: false, lbl: '' };
    const mood = [0, 0, 0, 0], moodT = [0, 0, 0, 0], moodK = ['neutral', 'neutral', 'neutral', 'neutral'];
    const parts = [];
    const R = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(777);
    const stars = [], bl = [];
    for (let i = 0; i < 60; i++) stars.push([R() * W, R() * 230, R() * 1.3 + .3, R() * TAU]);
    for (let l = 0; l < 2; l++) { let x = -40; while (x < W + 80) { const w = 40 + R() * 60, h = (l ? 90 : 140) + R() * (l ? 90 : 120); bl.push({ x, w, h, l, seed: R() }); x += w + 4 + R() * 10; } }
    const CX = 480, CY = 318, TW = 76, TH = 38;
    const iso = (gx, gy, z) => [CX + (gx - gy) * TW / 2, CY + (gx + gy) * TH / 2 - (z || 0)];
    const poly = (p, f, s, lw) => { ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); if (f) { ctx.fillStyle = f; ctx.fill(); } if (s) { ctx.lineWidth = lw || 1.5; ctx.strokeStyle = s; ctx.stroke(); } };
    const glow = (c, b, f) => { ctx.shadowColor = c; ctx.shadowBlur = b; f(); ctx.shadowBlur = 0; };

    function background() {
      const g = ctx.createLinearGradient(0, 0, 0, H); pal.sky.forEach((c, i) => g.addColorStop(i / 2, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (!day) stars.forEach(s => { ctx.globalAlpha = .4 + .6 * Math.abs(Math.sin(T * .0012 + s[3])); ctx.fillStyle = '#fff'; ctx.fillRect(s[0], s[1], s[2], s[2]); ctx.globalAlpha = 1; });
      glow(day ? '#fff2b0' : '#ff9be8', 40, () => { ctx.fillStyle = day ? '#fff6c8' : '#ffd1f4'; ctx.beginPath(); ctx.arc(day ? 800 : 160, 110, day ? 34 : 26, 0, TAU); ctx.fill(); });
      bl.forEach(b => {
        const x = b.x + (b.l ? 1 : .4) * Math.sin(T * .0002) * 10, y = 350 - b.h + (b.l ? 20 : 0);
        ctx.fillStyle = b.l ? pal.near : pal.far; ctx.fillRect(x, y, b.w, 400);
        const cols = Math.floor(b.w / 12), rows = Math.floor(b.h / 16);
        let sd = Math.floor(b.seed * 9999) + 1; const rr = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { const on = rr(), c = pal.win[Math.floor(rr() * 3)]; if (on > .55) { ctx.globalAlpha = day ? .55 : (.5 + .5 * Math.sin(T * .002 + i * 3 + j)); ctx.fillStyle = c; ctx.fillRect(x + 5 + i * 12, y + 8 + j * 16, 5, 8); ctx.globalAlpha = 1; } }
      });
    }
    function floor() {
      const N = 8, o = -N / 2, c = [iso(o, o), iso(o + N, o), iso(o + N, o + N), iso(o, o + N)];
      poly(c, pal.floorA);
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if ((i + j) % 2) poly([iso(o + i, o + j), iso(o + i + 1, o + j), iso(o + i + 1, o + j + 1), iso(o + i, o + j + 1)], pal.floorB);
      ctx.lineWidth = 1; ctx.strokeStyle = pal.grid; ctx.globalAlpha = .5;
      for (let i = 0; i <= N; i++) { let a = iso(o + i, o), b = iso(o + i, o + N); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); a = iso(o, o + i); b = iso(o + N, o + i); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
      ctx.globalAlpha = 1; glow(pal.glow, 16, () => poly(c, null, pal.glow, 2.4));
      poly([iso(o, o + N), iso(o + N, o + N), iso(o + N, o + N, -26), iso(o, o + N, -26)], pal.side);
      poly([iso(o + N, o), iso(o + N, o + N), iso(o + N, o + N, -26), iso(o + N, o, -26)], '#120a3a');
    }
    /* round conference table (iso ellipse with thickness) */
    function table() {
      const c = iso(0, 0, 0), rx = 185, ry = 66, z = 36;
      ctx.fillStyle = pal.side; ctx.beginPath(); ctx.ellipse(c[0], c[1] - z + 18, rx, ry, 0, 0, Math.PI); ctx.lineTo(c[0] - rx, c[1] - z); ctx.fill();
      ctx.fillStyle = pal.side; ctx.fillRect(c[0] - rx, c[1] - z, rx * 2, 18);
      ctx.beginPath(); ctx.ellipse(c[0], c[1] - z + 18, rx, ry, 0, 0, Math.PI); ctx.fill();
      glow(pal.pink, 14, () => { ctx.fillStyle = pal.top; ctx.beginPath(); ctx.ellipse(c[0], c[1] - z, rx, ry, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = pal.pink; ctx.lineWidth = 2; ctx.stroke(); });
      ctx.strokeStyle = pal.glow; ctx.globalAlpha = .4; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(c[0], c[1] - z, rx * .55, ry * .55, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    }
    /* hologram alarm above the table: pulses red while the crisis is open, green once handled */
    function holo() {
      const c = [480, 215], pulse = .5 + .5 * Math.sin(T * .006), col = v.resolved ? pal.ok : pal.bad, a = v.resolved ? 0 : v.alarm;
      glow(col, 24 + pulse * 16 * a, () => {
        ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.fillStyle = day ? 'rgba(235,244,255,.9)' : 'rgba(10,6,40,.8)';
        ctx.beginPath(); ctx.ellipse(c[0], c[1], 58, 58 * .52, 0, 0, TAU); ctx.fill(); ctx.stroke();
      });
      if (a) { ctx.globalAlpha = (1 - pulse) * .6; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(c[0], c[1], 58 + pulse * 26, (58 + pulse * 26) * .52, 0, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
      ctx.font = '40px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(v.resolved ? '✅' : v.icon, c[0], c[1] - 40 - Math.sin(T * .003) * 4);
      ctx.textBaseline = 'alphabetic';
    }
    function person(x, y, look, m, scale, isYou, bounce) {
      const [skin, hair, cloth, acc, kind] = look, bob = Math.sin(T * .003 + x) * 2 - bounce;
      ctx.save(); ctx.translate(x, y + bob); ctx.scale(scale, scale);
      ctx.fillStyle = cloth; ctx.beginPath(); ctx.moveTo(-34, 0); ctx.quadraticCurveTo(-38, -58, -16, -66); ctx.lineTo(16, -66); ctx.quadraticCurveTo(38, -58, 34, 0); ctx.closePath(); ctx.fill();
      glow(acc, 8, () => { ctx.strokeStyle = acc; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14, -66); ctx.lineTo(0, -48); ctx.lineTo(14, -66); ctx.stroke(); });
      ctx.fillStyle = skin; ctx.fillRect(-7, -76, 14, 14);
      const hy = -100;
      if (kind === 'bun') { ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy - 30, 12, 0, TAU); ctx.fill(); }
      if (kind === 'bob') { ctx.fillStyle = hair; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-31, hy - 26, 62, 62, 20) : ctx.rect(-31, hy - 26, 62, 62); ctx.fill(); }
      ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(0, hy, 28, 0, TAU); ctx.fill();
      if (kind === 'bun') { ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, hy - 6, 29, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); }
      if (kind === 'bob') { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-29, hy - 4); ctx.quadraticCurveTo(0, hy - 46, 29, hy - 4); ctx.quadraticCurveTo(0, hy - 18, -29, hy - 4); ctx.fill(); }
      if (kind === 'cap') { ctx.fillStyle = '#e9ecf5'; ctx.beginPath(); ctx.arc(0, hy - 8, 29, Math.PI, 0); ctx.fill(); ctx.fillRect(-32, hy - 10, 64, 6); ctx.fillStyle = acc; ctx.fillRect(-8, hy - 24, 16, 6); }
      if (kind === 'spike') { ctx.fillStyle = hair; ctx.beginPath(); ctx.moveTo(-29, hy - 2); [[-22, -34], [-12, -20], [-4, -42], [6, -22], [16, -40], [22, -18], [29, -2]].forEach(p => ctx.lineTo(p[0], hy + p[1])); ctx.closePath(); ctx.fill(); }
      const ey = hy + 2, eo = 11, blink = (Math.floor(T / 2600 + x / 300) % 3 === 0 && (T % 2600) < 120);
      ctx.fillStyle = '#14102a';
      if (blink) { ctx.fillRect(-eo - 4, ey, 8, 2); ctx.fillRect(eo - 4, ey, 8, 2); } else { ctx.beginPath(); ctx.ellipse(-eo, ey, 3.4, 4.4, 0, 0, TAU); ctx.ellipse(eo, ey, 3.4, 4.4, 0, 0, TAU); ctx.fill(); }
      ctx.strokeStyle = '#14102a'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
      const inn = m === 'worried' ? -4 : m === 'happy' ? -2 : 0, out = m === 'worried' ? 2 : 0;
      ctx.beginPath(); ctx.moveTo(-eo - 6, ey - 9 + out); ctx.lineTo(-eo + 6, ey - 9 + inn); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(eo - 6, ey - 9 + inn); ctx.lineTo(eo + 6, ey - 9 + out); ctx.stroke();
      const my = hy + 16;
      if (m === 'happy') { ctx.beginPath(); ctx.arc(0, my - 3, 8, .15 * Math.PI, .85 * Math.PI); ctx.stroke(); }
      else if (m === 'worried') { ctx.beginPath(); ctx.arc(0, my + 5, 6, 1.15 * Math.PI, 1.85 * Math.PI); ctx.stroke(); }
      else if (v.alarm > .5 && !v.resolved && !isYou) { ctx.beginPath(); ctx.ellipse(0, my, 4, 3, 0, 0, TAU); ctx.stroke(); }
      else { ctx.beginPath(); ctx.moveTo(-5, my); ctx.lineTo(5, my); ctx.stroke(); }
      if (m === 'worried') { ctx.fillStyle = 'rgba(125,200,255,.8)'; ctx.beginPath(); ctx.ellipse(30, hy - 14, 3, 5, 0, 0, TAU); ctx.fill(); }
      ctx.restore();
    }
    function particles(dt) {
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; }
        p.x += p.vx * dt * .06; p.y += p.vy * dt * .06; p.vy += (p.g || 0) * dt * .06; ctx.globalAlpha = Math.max(0, p.life / p.max);
        if (p.txt) { ctx.fillStyle = p.c; ctx.font = '800 ' + p.sz + 'px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.txt, p.x, p.y); }
        else { ctx.fillStyle = p.c; ctx.fillRect(p.x - 3, p.y - 2, 6, 4); }
      }
      ctx.globalAlpha = 1;
    }
    function draw(dt) {
      ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0); ctx.save();
      if (shake > 0) ctx.translate((Math.random() - .5) * shake, (Math.random() - .5) * shake);
      background(); floor();
      [2, 3].forEach(i => person(POS[i][0], POS[i][1], TEAM[i], moodK[i], .86, false, mood[i] > 0 ? Math.abs(Math.sin(T * .012)) * 8 : 0));
      table();
      [0, 1].forEach(i => person(POS[i][0], POS[i][1] + 40, TEAM[i], moodK[i], 1, false, mood[i] > 0 ? Math.abs(Math.sin(T * .012)) * 10 : 0));
      person(480, 470, YOU, v.resolved ? 'happy' : 'neutral', 1.05, true, 0);
      holo(); particles(dt || 16); ctx.restore();
    }
    function step(now) {
      const dt = Math.min(50, now - (last || now)); last = now; T = now;
      for (let i = 0; i < 4; i++) if (mood[i] > 0) { mood[i] -= dt; if (mood[i] <= 0) moodK[i] = 'neutral'; }
      if (shake > 0) shake = Math.max(0, shake - dt * .03);
      draw(dt); if (running) raf = requestAnimationFrame(step);
    }
    const OPPI = { 0: 2, 2: 0, 1: 3, 3: 1 };
    return {
      set(o) { Object.assign(v, o); if (!running) this.draw(); },
      /* a teammate who shares the chosen style cheers; the opposite style looks worried */
      react(i) {
        for (let k = 0; k < 4; k++) { mood[k] = 0; moodK[k] = 'neutral'; }
        mood[i] = 1500; moodK[i] = 'happy'; mood[OPPI[i]] = 1500; moodK[OPPI[i]] = 'worried';
        const p = i < 2 ? [POS[i][0], POS[i][1] - 70] : [POS[i][0], POS[i][1] - 90];
        parts.push({ x: p[0], y: p[1], vx: 0, vy: -.9, g: 0, life: 1200, max: 1200, txt: '+', c: pal.ok, sz: 28 });
        if (!running) this.draw();
      },
      burst(kind) {
        if (kind === 'resolved') for (let i = 0; i < 70; i++) { const a = Math.random() * TAU, s = (.4 + Math.random()) * 6; parts.push({ x: 480, y: 215, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3, g: .06, life: 900 + Math.random() * 700, max: 1500, c: [pal.gold, pal.pink, pal.glow, pal.ok][i % 4] }); }
        if (kind === 'alarm') shake = 10;
        if (!running) this.draw();
      },
      setTheme(d) { day = !!d; pal = d ? PAL.day : PAL.night; if (!running) this.draw(); },
      start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(step); },
      stop() { running = false; cancelAnimationFrame(raf); this.draw(); },
      draw() { draw(16); },
      get running() { return running; }
    };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.disc = MBALAB.disc || {}; MBALAB.disc.Scene = Scene;
})();
