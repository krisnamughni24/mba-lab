/* BUMN Explorer: canvas scene, an isometric neon city of state-owned companies. Logical size 960x540.
   MBALAB.bumn.Scene(canvas) -> { set(view), hit(x, y), flash(id, ok), setTheme(day), start(), stop(), draw(), running }
   view = { hover, sel, filter, visited:Set, target } */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2, TW = 72, TH = 36, CX = 480, CY = 116, N = 10;
  const PAL = {
    night: { sky: ['#07061c', '#150f45', '#3a1766'], tileA: '#160f46', tileB: '#1d1562', grid: 'rgba(125,243,255,.3)', edge: '#7df3ff', ink: '#ffffff', pill: 'rgba(10,6,40,.88)', win: '#ffe38a', winA: .85, ok: '#6dffb0', bad: '#ff5d7a' },
    day: { sky: ['#5aa6f2', '#a9d4fb', '#f1e6fb'], tileA: '#b6cffa', tileB: '#cddffe', grid: 'rgba(16,60,190,.3)', edge: '#0a5fe0', ink: '#081530', pill: 'rgba(255,255,255,.92)', win: '#ffffff', winA: .45, ok: '#0a8f4e', bad: '#c4122e' }
  };
  const shade = (hex, f) => {
    let r, g, b; if (hex[0] === 'r') { [r, g, b] = hex.match(/\d+/g).map(Number); } else { const n = parseInt(hex.slice(1), 16); r = n >> 16; g = (n >> 8) & 255; b = n & 255; }
    if (f < 1) { r *= f; g *= f; b *= f; } else { r += (255 - r) * (f - 1); g += (255 - g) * (f - 1); b += (255 - b) * (f - 1); }
    return 'rgb(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ')';
  };

  function Scene(cv) {
    const E = MBALAB.bumn, ctx = cv.getContext('2d');
    let pal = PAL.night, day = false, raf = 0, last = 0, T = 0, running = false;
    const v = { hover: null, sel: null, filter: null, visited: new Set(), target: null };
    let fl = null;                                              // { id, ok, t0 } answer flash
    const R = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(4242);
    const stars = []; for (let i = 0; i < 70; i++) stars.push([R() * W, R() * 150, R() * 1.3 + .3, R() * TAU]);
    const iso = (gx, gy, z) => [CX + (gx - gy) * TW / 2, CY + (gx + gy) * TH / 2 - (z || 0)];
    const poly = (p, f, s, lw) => { ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); if (f) { ctx.fillStyle = f; ctx.fill(); } if (s) { ctx.lineWidth = lw || 1.5; ctx.strokeStyle = s; ctx.stroke(); } };
    const glow = (c, b, f) => { ctx.shadowColor = c; ctx.shadowBlur = b; f(); ctx.shadowBlur = 0; };

    /* hit boxes (static geometry) */
    const layout = E.LIST.map(b => {
      const s = b.s || 1, c = iso(b.gx + s / 2, b.gy + s / 2, 0), hw = TW * (s === 1 ? .42 : .8);
      return { b, c, x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - b.h - 26, y1: c[1] + TH * .4 * s, depth: b.gx + b.gy + s };
    }).sort((a, z) => a.depth - z.depth);

    function sky() {
      const g = ctx.createLinearGradient(0, 0, 0, H); pal.sky.forEach((c, i) => g.addColorStop(i / 2, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (!day) stars.forEach(s => { ctx.globalAlpha = .35 + .65 * Math.abs(Math.sin(T * .0012 + s[3])); ctx.fillStyle = '#fff'; ctx.fillRect(s[0], s[1], s[2], s[2]); ctx.globalAlpha = 1; });
      glow(day ? '#fff2b0' : '#ff9be8', 36, () => { ctx.fillStyle = day ? '#fff6c8' : '#ffd1f4'; ctx.beginPath(); ctx.arc(day ? 850 : 120, 70, day ? 30 : 22, 0, TAU); ctx.fill(); });
      /* a small plane crossing the sky */
      const px = ((T * .05) % (W + 160)) - 80, py = 46 + Math.sin(px * .01) * 6;
      ctx.fillStyle = day ? '#fff' : '#e8f0ff'; ctx.beginPath(); ctx.moveTo(px + 14, py); ctx.lineTo(px - 10, py - 4); ctx.lineTo(px - 6, py); ctx.lineTo(px - 10, py + 4); ctx.closePath(); ctx.fill();
    }
    function floor() {
      const o = 0, c = [iso(o, o), iso(o + N, o), iso(o + N, o + N), iso(o, o + N)];
      poly(c, pal.tileA);
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) if ((i + j) % 2) poly([iso(i, j), iso(i + 1, j), iso(i + 1, j + 1), iso(i, j + 1)], pal.tileB);
      glow(pal.edge, 14, () => poly(c, null, pal.edge, 2.2));
      poly([iso(0, N), iso(N, N), iso(N, N, -22), iso(0, N, -22)], day ? '#7fa2e6' : '#1a0f52');
      poly([iso(N, 0), iso(N, N), iso(N, N, -22), iso(N, 0, -22)], day ? '#6a8ed8' : '#120a3a');
    }
    function windows(A, B, h, f) {
      ctx.fillStyle = pal.win; ctx.globalAlpha = pal.winA * f;
      for (let r = 10; r < h - 6; r += 12) for (let k = 1; k <= 3; k++) { const u = k / 4, x = A[0] + (B[0] - A[0]) * u, y = A[1] + (B[1] - A[1]) * u - r; if (((r * 7 + k * 13) % 5) < 3) ctx.fillRect(x - 2, y - 5, 4, 5); }
      ctx.globalAlpha = 1;
    }
    /* box with 3 visible faces; z0 lifts it */
    function box(gx, gy, w, d, h, col, z0, win) {
      z0 = z0 || 0;
      const A = iso(gx, gy, z0), B = iso(gx + w, gy, z0), C = iso(gx + w, gy + d, z0), D = iso(gx, gy + d, z0), up = q => [q[0], q[1] - h];
      poly([D, C, up(C), up(D)], shade(col, .8));
      poly([C, B, up(B), up(C)], shade(col, .6));
      poly([up(A), up(B), up(C), up(D)], shade(col, 1.2));
      if (win) { windows(D, C, h, 1); windows(C, B, h, .8); }
    }
    function cyl(cx, cy, r, h, col) {
      ctx.fillStyle = shade(col, .7); ctx.beginPath(); ctx.ellipse(cx, cy, r, r * .5, 0, 0, TAU); ctx.fill();
      ctx.fillRect(cx - r, cy - h, r * 2, h);
      ctx.fillStyle = shade(col, 1.22); ctx.beginPath(); ctx.ellipse(cx, cy - h, r, r * .5, 0, 0, TAU); ctx.fill();
    }
    const blink = (x, y, c) => { if (Math.sin(T * .006 + x) > 0) glow(c, 12, () => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 3, 0, TAU); ctx.fill(); }); };
    const smoke = (x, y, k) => { for (let i = 0; i < 4; i++) { const p = ((T * .0004 + i / 4 + k) % 1); ctx.globalAlpha = (1 - p) * .5; ctx.fillStyle = day ? '#fff' : '#cfd6ff'; ctx.beginPath(); ctx.arc(x + p * 10, y - p * 30, 3 + p * 6, 0, TAU); ctx.fill(); } ctx.globalAlpha = 1; };

    function shape(b, col) {
      const s = b.s || 1, h = b.h, gx = b.gx, gy = b.gy, c = iso(gx + .5, gy + .5, 0);
      switch (b.shape) {
        case 'tower': box(gx + .14, gy + .14, .72, .72, h, col, 0, true); break;
        case 'low': box(gx + .06, gy + .16, .88, .68, h, col, 0, true); box(gx + .06, gy + .16, .88, .12, 4, shade(col, 1.25), h); break;
        case 'tank': {
          const a = iso(gx + .3, gy + .5, 0), z = iso(gx + .72, gy + .5, 0), r = TW * .17;
          cyl(a[0], a[1], r, h, col); cyl(z[0], z[1], r, h * .78, col);
          if (b.id === 'pertamina') { const fx = a[0], fy = a[1] - h - 4, k = 5 + Math.sin(T * .02) * 2; glow('#ff9a2e', 14, () => { ctx.fillStyle = '#ffb347'; ctx.beginPath(); ctx.moveTo(fx - 4, fy + 2); ctx.quadraticCurveTo(fx - 3, fy - k, fx, fy - k * 2); ctx.quadraticCurveTo(fx + 3, fy - k, fx + 4, fy + 2); ctx.closePath(); ctx.fill(); }); }
          break;
        }
        case 'chimney': {
          box(gx + .08, gy + .2, .84, .62, h * .5, col, 0, true);
          [[.3, .42, h], [.62, .48, h * .85]].forEach((q, i) => { const p = iso(gx + q[0], gy + q[1], h * .5); cyl(p[0], p[1], 5, q[2] - h * .5, shade(col, 1.05)); smoke(p[0], p[1] - (q[2] - h * .5), i * .4); });
          break;
        }
        case 'mast': {
          box(gx + .22, gy + .22, .56, .56, h * .22, col, 0, true);
          const bx = c[0], by = c[1] - h * .22, ty = c[1] - h;
          ctx.strokeStyle = shade(col, 1.25); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 14, by); ctx.lineTo(bx, ty); ctx.lineTo(bx + 14, by); ctx.stroke();
          ctx.lineWidth = 1; for (let k = 1; k < 5; k++) { const u = k / 5, y = by + (ty - by) * u, hw = 14 * (1 - u); ctx.beginPath(); ctx.moveTo(bx - hw, y); ctx.lineTo(bx + hw, y); ctx.lineTo(bx - hw * .5, by + (ty - by) * (u + .2)); ctx.stroke(); }
          blink(bx, ty - 2, '#ff4d6d');
          if (b.id === 'telkom') { ctx.strokeStyle = col; ctx.lineWidth = 1.5; for (let k = 0; k < 3; k++) { const p = ((T * .0006 + k / 3) % 1); ctx.globalAlpha = 1 - p; ctx.beginPath(); ctx.arc(bx, ty, 6 + p * 26, -2.2, -.9); ctx.stroke(); } ctx.globalAlpha = 1; }
          else { glow(col, 14, () => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(bx - 18, by - h * .35); ctx.lineTo(bx + 18, by - h * .35); ctx.stroke(); }); }
          break;
        }
        case 'crane': {
          box(gx + .06, gy + .1, .88, .8, h * .3, shade(col, .9), 0, false);
          const cols = ['#ff6b6b', '#ffd166', '#4dd2ff', '#6ee7b7']; for (let i = 0; i < 4; i++) box(gx + .12 + (i % 2) * .4, gy + .18 + (i >> 1) * .36, .34, .3, 7, cols[i], h * .3);
          const bx = c[0] + 18, by = c[1] - h * .3, ty = c[1] - h, sw = Math.sin(T * .0015) * 10;
          ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, ty); ctx.lineTo(bx - 40 + sw, ty); ctx.stroke();
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx - 34 + sw, ty); ctx.lineTo(bx - 34 + sw, ty + 20); ctx.stroke(); ctx.fillStyle = '#ffd166'; ctx.fillRect(bx - 40 + sw, ty + 20, 12, 6);
          break;
        }
        case 'pyramid': {
          const A = iso(gx + .06, gy + .06, 0), B = iso(gx + .94, gy + .06, 0), C = iso(gx + .94, gy + .94, 0), D = iso(gx + .06, gy + .94, 0), P = iso(gx + .5, gy + .5, h);
          poly([D, C, P], shade(col, .85)); poly([C, B, P], shade(col, .6)); poly([A, B, P], shade(col, 1.1));
          glow('#ffd166', 8, () => { ctx.fillStyle = '#ffd166'; [[.35, .7, 8], [.6, .78, 6], [.7, .55, 10]].forEach(q => { const p = iso(gx + q[0], gy + q[1], q[2]); ctx.fillRect(p[0] - 2, p[1] - 2, 4, 4); }); });
          break;
        }
        case 'arch': {
          poly([iso(gx, gy + .4, 0), iso(gx + 1, gy + .4, 0), iso(gx + 1, gy + .62, 0), iso(gx, gy + .62, 0)], day ? '#6b7280' : '#0b0826');
          const cx = ((T * .0005) % 1); box(gx + cx * .8, gy + .46, .16, .1, 5, '#ff6b6b', 0);
          box(gx + .06, gy + .36, .1, .1, h, col, 0); box(gx + .84, gy + .36, .1, .1, h, col, 0);
          box(gx + .06, gy + .36, .88, .1, 9, shade(col, 1.1), h - 9);
          break;
        }
        case 'hub': {
          const k = h; poly([iso(gx - .1, gy - .1, 0), iso(gx + 2.1, gy - .1, 0), iso(gx + 2.1, gy + 2.1, 0), iso(gx - .1, gy + 2.1, 0)], shade(col, .55));
          box(gx + .3, gy + .3, 1.4, 1.4, k * .5, col, 0, true);
          box(gx + .55, gy + .55, .9, .9, k * .3, shade(col, 1.05), k * .5, true);
          box(gx + .72, gy + .72, .56, .56, k * .16, shade(col, 1.2), k * .8, false);
          const t = iso(gx + 1, gy + 1, k + 26); ctx.strokeStyle = '#fff4c8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(t[0], t[1] + 24); ctx.lineTo(t[0], t[1]); ctx.stroke();
          blink(t[0], t[1], '#ffd166');
          break;
        }
      }
    }

    function building(L) {
      const b = L.b, col = E.COLORS[b.sec], dim = v.filter && v.filter !== b.sec && !(v.target && v.target === b.id);
      const act = v.sel === b.id || v.hover === b.id || (fl && fl.id === b.id);
      ctx.globalAlpha = dim ? .22 : 1;
      const s = b.s || 1, fp = [iso(b.gx, b.gy, 0), iso(b.gx + s, b.gy, 0), iso(b.gx + s, b.gy + s, 0), iso(b.gx, b.gy + s, 0)];
      poly(fp, shade(col, day ? 1.3 : .35));
      if (act) { const a = .55 + .45 * Math.sin(T * .008); ctx.globalAlpha = dim ? .5 : 1; glow(col, 18 * a + 6, () => poly(fp, null, col, 3)); ctx.globalAlpha = dim ? .22 : 1; }
      shape(b, col);
      /* icon floats above */
      const ix = L.c[0], iy = L.c[1] - b.h - 16 - Math.sin(T * .003 + b.gx * 2) * 3 - (act ? 4 : 0);
      ctx.font = (act ? 26 : 22) + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = pal.ink;
      ctx.fillText(b.icon, ix, iy);
      if (v.visited.has(b.id)) { ctx.fillStyle = pal.ok; ctx.beginPath(); ctx.arc(ix + 13, iy - 11, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = day ? '#fff' : '#06041a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ix + 10.8, iy - 11); ctx.lineTo(ix + 12.5, iy - 9.2); ctx.lineTo(ix + 15.5, iy - 13); ctx.stroke(); }
      if (v.target === b.id && v.pulseTarget) { ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ix, iy, 16 + Math.sin(T * .01) * 3, 0, TAU); ctx.stroke(); }
      ctx.globalAlpha = 1;
    }
    function labels() {
      const ids = [v.hover, v.sel].filter((x, i, a) => x && a.indexOf(x) === i);
      if (fl && !ids.includes(fl.id)) ids.push(fl.id);
      ids.forEach(id => {
        const L = layout.find(q => q.b.id === id); if (!L) return;
        const name = v.hideNames && !(fl && fl.id === id) ? '?' : L.b.n;
        ctx.font = '700 13px system-ui,sans-serif'; const w = ctx.measureText(name).width + 18, x = L.c[0], y = L.c[1] + TH * .75 * (L.b.s || 1) + 10;
        const bad = fl && fl.id === id && !fl.ok, ok = fl && fl.id === id && fl.ok;
        ctx.fillStyle = pal.pill; ctx.strokeStyle = ok ? pal.ok : bad ? pal.bad : E.COLORS[L.b.sec]; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - w / 2, y - 12, w, 24, 12) : ctx.rect(x - w / 2, y - 12, w, 24); ctx.fill(); ctx.stroke();
        ctx.fillStyle = pal.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(name, x, y + 1);
      });
    }
    function draw() {
      ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0);
      sky(); floor(); layout.forEach(building); labels();
      if (fl) { const p = (T - fl.t0) / 1400; if (p > 1) fl = null; }
    }
    function step(now) {
      if (!running) return;
      const dt = last ? Math.min(60, now - last) : 16; last = now; T += dt;
      draw(); raf = requestAnimationFrame(step);
    }
    return {
      get running() { return running; },
      set(o) { Object.assign(v, o); if (!running) draw(); },
      pos(id) { const L = layout.find(q => q.b.id === id); return L ? L.c : null; },
      hit(x, y) { let best = null; layout.forEach(L => { if (x >= L.x0 && x <= L.x1 && y >= L.y0 && y <= L.y1) best = L; }); return best ? best.b.id : null; },
      flash(id, ok) { fl = id ? { id, ok, t0: T } : null; if (!running) draw(); },
      setTheme(d) { day = !!d; pal = d ? PAL.day : PAL.night; if (!running) draw(); },
      start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(step); },
      stop() { running = false; cancelAnimationFrame(raf); draw(); },
      draw
    };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.bumn = MBALAB.bumn || {}; MBALAB.bumn.Scene = Scene;
})();
