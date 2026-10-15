/* Bullwhip effect: canvas renderer. Side view of a four-company chain on one road.
   Logical height 540; the logical width follows the canvas shape, so a wide window shows a wider town.
   MBALAB.bwScene(canvas) -> { setNames, set(view), step(info), setTheme(day), start(), stop(), draw(), running }
   The player only sees what the rules let them see: numbers appear for their own company and its two neighbours;
   every other truck and envelope is drawn without a figure. */
(function () {
  const H = 540, TAU = Math.PI * 2, GY = 392, LANE = 432;
  const rnd = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647);
  const PAL = {
    night: { sky: ['#070b24', '#14205a', '#33297f'], far: '#111849', near: '#0b1038', ground: '#0c1233', road: '#171d4d', curb: '#2a3375', lane: 'rgba(255,211,110,.7)', wall: '#2a3478', side: '#1c2459', roof: '#3b3290', lit: ['#ffd36e', '#7df3ff', '#ffb0ee'], dark: '#10153d', text: '#e8eeff', sub: '#9fb0ff', pill: 'rgba(10,14,46,.82)', ok: '#6dffb0', bad: '#ff5d7a', gold: '#ffd36e', crate: '#d79a4a', crate2: '#a8742f', tree: '#173d4e' },
    day: { sky: ['#4d9df0', '#9fd0fb', '#f3e8fb'], far: '#a7c3ee', near: '#8cadde', ground: '#b4cbe9', road: '#6d7893', curb: '#9aa6c0', lane: 'rgba(255,255,255,.85)', wall: '#f4efe6', side: '#cbc2b5', roof: '#cf5a3d', lit: ['#6aa6ea', '#9cc7f5', '#cfe3fb'], dark: '#7c9fcf', text: '#13244a', sub: '#43507a', pill: 'rgba(255,255,255,.86)', ok: '#0b8f56', bad: '#c8243f', gold: '#b86f00', crate: '#c98a3c', crate2: '#a06a26', tree: '#3d8f5a' }
  };
  /* accent per tier, same hues as the result charts: 0 retail cyan, 1 wholesale green, 2 distributor amber, 3 production magenta */
  const ACC = { night: ['#7df3ff', '#6dffb0', '#ffd36e', '#ff6bd5'], day: ['#0a8fb8', '#0e9a5c', '#c98300', '#c4128a'] };
  const KIND = ['shop', 'wholesale', 'warehouse', 'factory'];

  function Scene(cv) {
    const ctx = cv.getContext('2d');
    let pal = PAL.night, acc = ACC.night, day = false, raf = 0, last = 0, T = 0, running = false, WW = 960, sc = 1, shake = 0;
    const names = ['', '', '', ''], cfg = { src: '', goods: '📦' };
    const v = { role: 0, inv: 12, back: 0, pipes: [[4, 4], [4, 4], [4, 4], [4, 4]], inc: 4, order: 4, week: 0, live: false };
    const d = { inv: 12, back: 0 };
    let anim = null;                     /* { t, prev:[pipes], arrived, inc, order, shipped, served, demand } */
    const parts = [], walkers = [], emotes = [];
    const R = rnd(777);
    const stars = [], clouds = [], birds = [], sky = [], trees = [], lamps = [];
    for (let i = 0; i < 90; i++) stars.push([R(), R() * 230, R() * 1.5 + .3, R() * TAU]);
    for (let i = 0; i < 7; i++) clouds.push([R(), 40 + R() * 110, .7 + R() * .8, 6 + R() * 8]);
    for (let i = 0; i < 6; i++) birds.push([R(), 90 + R() * 90, 12 + R() * 10, R() * TAU]);
    for (let i = 0; i < 40; i++) sky.push({ x: R(), w: 30 + R() * 46, h: 70 + R() * 90, layer: i % 2, seed: R() });
    for (let i = 0; i < 26; i++) trees.push([R(), .7 + R() * .6]);
    for (let i = 0; i < 6; i++) walkers.push({ x: 0, k: i, idle: true, ph: R() * TAU, col: ['#ff8a4a', '#4ab7ff', '#ff6bd5', '#6dffb0', '#ffd36e', '#b98bff'][i % 6] });

    const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };
    const glow = (c, b, f) => { ctx.shadowColor = c; ctx.shadowBlur = b; f(); ctx.shadowBlur = 0; };
    const poly = (pts, fill) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
    const pill = (txt, x, y, o) => {
      o = o || {}; ctx.font = '800 ' + (o.size || 15) + 'px system-ui,sans-serif'; const w = ctx.measureText(txt).width + (o.pad == null ? 16 : o.pad), h = (o.size || 15) + 10;
      rr(x - w / 2, y - h / 2, w, h, h / 2); ctx.fillStyle = o.bg || pal.pill; ctx.fill(); if (o.stroke) { ctx.lineWidth = 2; ctx.strokeStyle = o.stroke; ctx.stroke(); }
      ctx.fillStyle = o.fg || pal.text; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y + 1); ctx.textBaseline = 'alphabetic';
    };
    const ease = t => t * t * (3 - 2 * t), clamp = (x, a, b) => Math.max(a, Math.min(b, x));

    /* ---------- layout ---------- */
    const cw = () => WW / 6, NX = k => cw() * (k + .5);            /* k: 0 source, 1..4 = tier 3..0, 5 customers */
    const tierX = t => NX(4 - t);
    const bwid = () => Math.min(cw() * .72, 200);
    const bhei = t => [132, 152, 176, 200][t] * (Math.min(1.15, Math.max(.8, bwid() / 126)));

    /* ---------- background ---------- */
    function background() {
      const g = ctx.createLinearGradient(0, 0, 0, GY); pal.sky.forEach((c, i) => g.addColorStop(i / 2, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, WW, H);
      if (!day) stars.forEach(s => { ctx.globalAlpha = .35 + .65 * Math.abs(Math.sin(T * .0012 + s[3])); ctx.fillStyle = '#fff'; ctx.fillRect(s[0] * WW, s[1], s[2], s[2]); ctx.globalAlpha = 1; });
      /* sun or moon */
      const sx = WW * (day ? .86 : .09), sy = 92;
      glow(day ? '#fff2b0' : '#ff9be8', 44, () => { ctx.fillStyle = day ? '#fff6c8' : '#ffd8f5'; ctx.beginPath(); ctx.arc(sx, sy, day ? 34 : 27, 0, TAU); ctx.fill(); });
      if (day) clouds.forEach(c => { const x = ((c[0] * WW + T * .006 * c[3]) % (WW + 260)) - 130; ctx.fillStyle = 'rgba(255,255,255,.85)'; [[0, 0, 30], [28, 6, 23], [-26, 8, 21], [8, -9, 21]].forEach(p => { ctx.beginPath(); ctx.arc(x + p[0] * c[2], c[1] + p[1], p[2] * c[2], 0, TAU); ctx.fill(); }); });
      else birds.forEach(b => { const x = ((b[0] * WW + T * .001 * b[2] * 10) % (WW + 80)) - 40, y = b[1] + Math.sin(T * .0007 + b[3]) * 6; ctx.fillStyle = '#cbd6ff'; ctx.globalAlpha = .7; ctx.beginPath(); ctx.ellipse(x, y, 7, 2.2, 0, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; ctx.fillStyle = '#ff5d7a'; ctx.fillRect(x - 8, y - 1, 2, 2); });
      if (day) birds.forEach(b => { const x = ((b[0] * WW + T * .001 * b[2] * 10) % (WW + 60)) - 30, y = b[1] + Math.sin(T * .002 + b[3]) * 7, f = Math.sin(T * .012 + b[3]) * 4; ctx.strokeStyle = '#26406a'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - 6, y + f); ctx.quadraticCurveTo(x - 2, y - 4, x, y); ctx.quadraticCurveTo(x + 2, y - 4, x + 6, y + f); ctx.stroke(); });
      /* skyline, two layers with lit windows */
      sky.forEach(b => {
        const x = b.x * (WW + 80) - 40, h = b.layer ? b.h * .8 : b.h * 1.15, y = GY - h + (b.layer ? 6 : 0);
        ctx.fillStyle = b.layer ? pal.near : pal.far; ctx.fillRect(x, y, b.w, h + 30);
        const rr2 = rnd(Math.floor(b.seed * 9999) + 3), cols = Math.floor(b.w / 12), rows = Math.floor(h / 16);
        for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) if (rr2() > .6) { ctx.globalAlpha = day ? .5 : .4 + .5 * Math.abs(Math.sin(T * .0018 + i * 3 + j)); ctx.fillStyle = pal.lit[Math.floor(rr2() * 3)]; ctx.fillRect(x + 5 + i * 12, y + 8 + j * 16, 5, 8); ctx.globalAlpha = 1; }
      });
      const hz = ctx.createLinearGradient(0, 250, 0, GY); hz.addColorStop(0, 'rgba(255,79,216,0)'); hz.addColorStop(1, day ? 'rgba(255,255,255,.35)' : 'rgba(255,79,216,.22)'); ctx.fillStyle = hz; ctx.fillRect(0, 250, WW, GY - 250);
      /* ground and road */
      ctx.fillStyle = pal.ground; ctx.fillRect(0, GY, WW, H - GY);
      trees.forEach(t => { const x = t[0] * WW, y = GY + 6, sz = 14 * t[1]; ctx.fillStyle = pal.tree; ctx.beginPath(); ctx.arc(x, y - sz, sz, 0, TAU); ctx.fill(); ctx.fillStyle = day ? '#6d5238' : '#2a1c3a'; ctx.fillRect(x - 2, y - sz, 4, sz + 2); });
      ctx.fillStyle = pal.curb; ctx.fillRect(0, LANE - 40, WW, 5); ctx.fillRect(0, LANE + 34, WW, 5);
      ctx.fillStyle = pal.road; ctx.fillRect(0, LANE - 35, WW, 69);
      ctx.fillStyle = pal.lane; const off = (T * .02) % 44; for (let x = -44 + off; x < WW; x += 44) ctx.fillRect(x, LANE - 1, 24, 3);
    }

    /* ---------- buildings ---------- */
    function windows(x, y, w, h, cols, rows, seed, lit) {
      const r2 = rnd(seed), gw = w / cols, gh = h / rows;
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const px = x + i * gw + gw * .2, py = y + j * gh + gh * .22, ww = gw * .6, hh = gh * .55, on = lit ? r2() > .28 : true;
        if (!day) { ctx.fillStyle = on ? pal.lit[Math.floor(r2() * 3)] : pal.dark; ctx.globalAlpha = on ? .55 + .4 * Math.abs(Math.sin(T * .0015 + i * 2 + j)) : 1; }
        else { const g = ctx.createLinearGradient(px, py, px + ww, py + hh); g.addColorStop(0, '#d6ebff'); g.addColorStop(1, '#6ea4e6'); ctx.fillStyle = g; }
        ctx.fillRect(px, py, ww, hh); ctx.globalAlpha = 1;
        if (day) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(px, py + hh - 2, ww, 2); }
      }
    }
    function building(t, x, mine) {
      const w = bwid(), h = bhei(t), kind = KIND[t], c = acc[t], dp = 16, x0 = x - w / 2, y0 = GY - h;
      /* ground shadow */
      ctx.fillStyle = 'rgba(0,0,0,' + (day ? .2 : .35) + ')'; poly([[x0, GY], [x0 + w + dp, GY], [x0 + w + dp + 26, GY + 14], [x0 + 12, GY + 14]], ctx.fillStyle);
      /* side and roof faces give depth */
      poly([[x0 + w, y0], [x0 + w + dp, y0 - 9], [x0 + w + dp, GY - 9], [x0 + w, GY]], pal.side);
      poly([[x0, y0], [x0 + dp, y0 - 9], [x0 + w + dp, y0 - 9], [x0 + w, y0]], day ? '#e3dccf' : '#3a449a');
      ctx.fillStyle = pal.wall; ctx.fillRect(x0, y0, w, h);
      if (day) { const g = ctx.createLinearGradient(x0, y0, x0 + w, GY); g.addColorStop(0, 'rgba(255,255,255,.4)'); g.addColorStop(1, 'rgba(60,70,100,.18)'); ctx.fillStyle = g; ctx.fillRect(x0, y0, w, h); }
      /* roof band in the tier colour */
      ctx.fillStyle = c; ctx.globalAlpha = day ? .95 : .85; ctx.fillRect(x0 - 3, y0 - 8, w + 6, 10); ctx.globalAlpha = 1;
      if (kind === 'factory') {
        for (let i = 0; i < 3; i++) { const sx = x0 + 6 + i * (w - 12) / 3; poly([[sx, y0 - 8], [sx + (w - 12) / 3, y0 - 8], [sx, y0 - 34]], pal.roof); }
        const cx = x0 + w * .82; ctx.fillStyle = day ? '#8a7f74' : '#3a2f6a'; ctx.fillRect(cx, y0 - 58, 16, 52); ctx.fillStyle = c; ctx.fillRect(cx - 2, y0 - 58, 20, 6);
        for (let i = 0; i < 5; i++) { const ph = (T * .0006 + i * .2) % 1, sy = y0 - 62 - ph * 60; ctx.globalAlpha = (1 - ph) * .5; ctx.fillStyle = day ? '#fff' : '#cbd2ff'; ctx.beginPath(); ctx.arc(cx + 8 + Math.sin(ph * 6 + i) * 8 + ph * 18, sy, 7 + ph * 12, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }
        windows(x0 + 8, y0 + 14, w - 16, h * .36, 5, 2, 31, true);
        /* conveyor belt */
        ctx.fillStyle = pal.dark; ctx.fillRect(x0 + 4, GY - 26, w - 8, 8); ctx.fillStyle = c; for (let i = 0; i < 9; i++) ctx.fillRect(x0 + 6 + ((i * 14 + T * .03) % (w - 12)), GY - 24, 6, 4);
      } else if (kind === 'warehouse') {
        windows(x0 + 8, y0 + 14, w - 16, h * .22, 5, 1, 41, true);
        for (let i = 0; i < 2; i++) { const dx = x0 + w * (.14 + i * .44), dw = w * .34; ctx.fillStyle = day ? '#b6bfcf' : '#14194a'; ctx.fillRect(dx, GY - h * .5, dw, h * .5); ctx.strokeStyle = c; ctx.lineWidth = 2; for (let k = 1; k < 6; k++) { const yy = GY - h * .5 + k * h * .5 / 6; ctx.beginPath(); ctx.moveTo(dx, yy); ctx.lineTo(dx + dw, yy); ctx.stroke(); } }
      } else if (kind === 'wholesale') {
        windows(x0 + 8, y0 + 14, w - 16, h * .3, 4, 2, 51, true);
        ctx.fillStyle = day ? '#b6bfcf' : '#14194a'; ctx.fillRect(x0 + w * .3, GY - h * .42, w * .4, h * .42); ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.strokeRect(x0 + w * .3, GY - h * .42, w * .4, h * .42);
      } else {
        windows(x0 + 8, y0 + 22, w - 16, h * .3, 3, 1, 61, true);
        const aw = ctx.createLinearGradient(0, 0, 0, 20); for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? c : (day ? '#fff' : '#2a2f7a'); ctx.fillRect(x0 - 4 + i * (w + 8) / 8, y0 + 8, (w + 8) / 8, 18); }
        ctx.fillStyle = day ? '#b6bfcf' : '#14194a'; ctx.fillRect(x0 + w * .34, GY - h * .46, w * .32, h * .46); ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.strokeRect(x0 + w * .34, GY - h * .46, w * .32, h * .46);
      }
      /* player highlight */
      if (mine) { const p = .5 + .5 * Math.sin(T * .004); glow(c, 14 + 10 * p, () => { ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.strokeRect(x0 - 5, y0 - 12, w + 10, h + 12); }); }
    }

    /* crates: your stock (one crate per unit, capped so it stays readable) */
    function crates(t, x, n) {
      const w = bwid(), per = Math.max(5, Math.floor((w - 10) / 17)), cap = per * 5, shown = Math.min(cap, Math.round(n)), k = n > cap ? n / cap : 1;
      for (let i = 0; i < shown; i++) {
        const col = i % per, row = Math.floor(i / per), cx = x - w / 2 + 6 + col * 17, cy = GY + 6 - (row + 1) * 15;
        ctx.fillStyle = pal.crate; ctx.fillRect(cx, cy, 16, 14); ctx.strokeStyle = pal.crate2; ctx.lineWidth = 1.5; ctx.strokeRect(cx + .75, cy + .75, 14.5, 12.5); ctx.beginPath(); ctx.moveTo(cx, cy + 7); ctx.lineTo(cx + 16, cy + 7); ctx.moveTo(cx + 8, cy); ctx.lineTo(cx + 8, cy + 14); ctx.stroke();
      }
      if (k > 1.01) pill('×' + k.toFixed(1), x + w / 2 - 10, GY - 62, { size: 13 });
    }
    /* backlog: red order slips hanging on a board beside the door */
    function backlog(t, x, n) {
      if (n < .5) return;
      const w = bwid(), cnt = Math.min(12, Math.round(n)), bx = x - w / 2 - 6, by = GY - 72, p = .5 + .5 * Math.sin(T * .008);
      ctx.fillStyle = day ? '#fff' : '#1a1030'; rr(bx - 12, by - 14, 24, 74, 6); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = pal.bad; ctx.stroke();
      for (let i = 0; i < cnt; i++) { ctx.fillStyle = i % 2 ? pal.bad : '#ff9a5d'; ctx.save(); ctx.translate(bx - 8 + (i % 2) * 8, by - 8 + Math.floor(i / 2) * 9); ctx.rotate(((i * 37) % 11 - 5) * .02); ctx.fillRect(0, 0, 8, 7); ctx.restore(); }
      glow(pal.bad, 8 + 8 * p, () => pill(String(Math.round(n)), bx, by - 28, { size: 14, bg: pal.bad, fg: '#fff', pad: 12 }));
    }

    /* ---------- trucks, envelopes, people ---------- */
    function truck(x, y, cargo, label, col, dir, alpha) {
      ctx.save(); ctx.globalAlpha = alpha == null ? 1 : alpha; ctx.translate(x, y); ctx.scale(dir * .85, .85);
      const bob = Math.sin(T * .02 + x * .05) * .7;
      ctx.translate(0, bob);
      ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.beginPath(); ctx.ellipse(0, 16, 30, 4.5, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = col; rr(-30, -16, 38, 26, 3); ctx.fill();                                   /* cargo box */
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(-28, -14, 34, 4);
      ctx.fillStyle = day ? '#f3f6ff' : '#dfe7ff'; rr(9, -8, 20, 18, 3); ctx.fill();                /* cab */
      ctx.fillStyle = day ? '#6aa6ea' : '#1a2a66'; ctx.fillRect(18, -5, 9, 7);
      ctx.fillStyle = '#ffe9a0'; ctx.fillRect(27, 3, 3, 3);
      ctx.fillStyle = '#10142e'; [-20, 0, 20].forEach(wx => { ctx.beginPath(); ctx.arc(wx, 11, 5, 0, TAU); ctx.fill(); ctx.fillStyle = '#9aa6d0'; ctx.beginPath(); ctx.arc(wx, 11, 1.8, 0, TAU); ctx.fill(); ctx.fillStyle = '#10142e'; });
      ctx.restore();
      if (label != null) pill(String(label), x, y - 30, { size: 14, bg: col, fg: '#10142e', pad: 12 });
    }
    function envelope(x, y, label, col) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(T * .01 + x) * .12);
      glow(col, 10, () => { ctx.fillStyle = '#fff'; rr(-13, -9, 26, 18, 3); ctx.fill(); });
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-12, -8); ctx.lineTo(0, 2); ctx.lineTo(12, -8); ctx.stroke(); ctx.restore();
      if (label != null) pill(String(label), x, y - 22, { size: 14, bg: col, fg: '#10142e', pad: 12 });
    }
    function person(x, y, col, sc2, face, bag) {
      ctx.save(); ctx.translate(x, y); ctx.scale(sc2, sc2);
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 2, 9, 3, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = col; rr(-6, -26, 12, 20, 5); ctx.fill();
      ctx.fillStyle = '#f0c6a0'; ctx.beginPath(); ctx.arc(0, -33, 7, 0, TAU); ctx.fill();
      ctx.fillStyle = '#2a1a12'; ctx.beginPath(); ctx.arc(0, -35, 7, Math.PI, TAU); ctx.fill();
      ctx.fillStyle = '#1b1b2a'; ctx.fillRect(-4, -6, 3, 8); ctx.fillRect(1, -6, 3, 8);
      if (bag) { ctx.fillStyle = pal.crate; ctx.fillRect(5, -18, 9, 9); }
      ctx.restore();
      if (face) { ctx.font = '16px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText(face, x, y - 48 * sc2); }
    }

    /* ---------- state helpers ---------- */
    const roadX = (seg, p) => {                    /* seg i = road that feeds tier i; seg 3 comes from the source node */
      const a = NX(3 - seg), b = NX(4 - seg);     /* from upstream node to downstream node */
      return a + (b - a) * p;
    };
    const known = seg => v.live && (seg === v.role || seg === v.role - 1);   /* roads whose figures you may read */

    function drawTraffic(A) {
      const t = A ? ease(clamp(A.t, 0, 1)) : 1;
      for (let seg = 0; seg < 4; seg++) {
        const col = acc[seg], pipes = v.pipes[seg], prev = A ? A.prev[seg] : pipes;
        const lab = (n, mine) => (v.live && seg === v.role && mine) ? n : null;
        /* in the new state the pipe is [b, new]; before it was [a, b] */
        if (A) {
          truck(roadX(seg, .66 + .34 * t), LANE - 12, 3, lab(prev[0], 1), col, 1, 1 - clamp((t - .88) / .12, 0, 1));    /* arrives */
          truck(roadX(seg, .33 + .33 * t), LANE - 12, 3, lab(prev[1], 1), col, 1, 1);
          truck(roadX(seg, .0 + .33 * t), LANE - 12, 3, seg === v.role - 1 && v.live ? A.shipped : null, col, 1, clamp(t * 3, 0, 1));
        } else {
          truck(roadX(seg, .66), LANE - 12, 3, lab(pipes[0], 1), col, 1, 1);
          truck(roadX(seg, .33), LANE - 12, 3, lab(pipes[1], 1), col, 1, 1);
        }
      }
    }
    function drawOrders(A) {
      if (!A) return;
      const t = clamp((A.t - .12) / .76, 0, 1), e = ease(t);
      for (let i = 0; i < 4; i++) {                       /* order from tier i to tier i+1 (i = 3 goes to the source) */
        const xa = tierX(i) , xb = i === 3 ? NX(0) : tierX(i + 1), x = xa + (xb - xa) * e, y = 150 - Math.sin(e * Math.PI) * 60 + (i % 2) * 0;
        const mineOut = v.live && i === v.role, mineIn = v.live && i === v.role - 1;
        const lbl = mineOut ? A.order : mineIn ? A.inc : null;
        envelope(x, y, lbl, acc[i]);
      }
    }
    function drawPeople(A, dt) {
      const x5 = NX(5), door = tierX(0) + bwid() * .15, retailOk = v.live && v.role === 0;
      walkers.forEach((w, i) => {
        let x = x5 + (i - 2.5) * 22, y = LANE + 46 - (i % 2) * 7, face = null, bag = false;
        w.x = x;
        if (A) {
          const go = A.go.indexOf(i);
          if (go >= 0) {
            const p = clamp((A.t - go * .05) / .5, 0, 1), q = clamp((A.t - .5 - go * .03) / .45, 0, 1);
            const tx = door + 8 + (go % 3) * 10;
            if (A.t < .5) { x = x + (tx - x) * ease(p); y = y - (y - (LANE + 38)) * ease(p) * .5; }
            else { x = tx + (x5 + (i - 2.5) * 22 - tx) * ease(q); bag = A.fed[go]; face = !A.fed[go] ? '😠' : (A.t > .85 ? '😊' : null); y = LANE + 42 - (i % 2) * 7; }
          }
        }
        const bob = Math.sin(T * .006 + w.ph) * 1.2;
        person(x, y + bob, w.col, 1, face, bag);
      });
      if (retailOk && v.inc != null) pill('👥 ' + v.inc, x5, GY - 40, { size: 15, stroke: acc[0] });
    }

    function drawLabels() {
      for (let k = 0; k < 6; k++) {
        const x = NX(k); let txt = '', t = null;
        if (k === 0) txt = cfg.src; else if (k === 5) txt = names.cust || ''; else { t = 4 - k; txt = names[t]; }
        const y = 503;
        ctx.font = '700 15px system-ui,sans-serif';
        const maxw = cw() - 10; let s = txt; while (s.length > 4 && ctx.measureText(s).width > maxw - 18) s = s.slice(0, -2);
        if (s !== txt) s = s.replace(/\s+$/, '') + '…';
        pill(s, x, y, { size: 15, stroke: t != null ? acc[t] : null, pad: 16 });
        if (t != null && v.live) pill(t === v.role ? (names.you || 'YOU') : '🤖', x, y + 22, { size: 13, bg: t === v.role ? acc[t] : pal.pill, fg: t === v.role ? '#10142e' : pal.sub, pad: 12 });
        if (t != null) { ctx.font = '700 14px system-ui,sans-serif'; ctx.fillStyle = pal.sub; ctx.textAlign = 'center'; ctx.fillText(names['tr' + t] || '', x, y - 21); }
      }
      ctx.font = '800 14px system-ui,sans-serif'; ctx.fillStyle = pal.sub; ctx.textAlign = 'left'; ctx.fillText('◀ ' + (names.hulu || ''), 12, 28); ctx.textAlign = 'right'; ctx.fillText((names.hilir || '') + ' ▶', WW - 12, 28);
    }

    /* ---------- player markers above the building ---------- */
    function ledger() {
      if (!v.live) return;
      const t = v.role, x = tierX(t), h = bhei(t), y = GY - h - 78;
      glow(acc[t], 10, () => pill('📦 ' + Math.round(d.inv) + (d.back >= .5 ? '   📋 ' + Math.round(d.back) : ''), x, y, { size: 16, stroke: acc[t], pad: 20 }));
      if (d.back >= .5) emote2(x, y - 34, '😠', 'a'); else if (d.inv > 26) emote2(x, y - 34, '😴', 'b');
    }
    function emote2(x, y, e, k) { ctx.font = '22px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText(e, x, y + Math.sin(T * .006 + (k === 'a' ? 0 : 2)) * 3); }

    /* ---------- particles ---------- */
    const burst = (x, y, n, cols, sp) => { for (let i = 0; i < n; i++) { const a = Math.random() * TAU, s = (.4 + Math.random()) * sp; parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - sp * .6, life: 700 + Math.random() * 600, max: 1300, r: 2 + Math.random() * 3, c: cols[i % cols.length] }); } };
    function drawParts(dt) {
      for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt * 1000; if (p.life <= 0) { parts.splice(i, 1); continue; } p.x += p.vx * dt * 60 * .06; p.y += p.vy * dt * 60 * .06; p.vy += .05 * dt * 60 * .06 * 10; ctx.globalAlpha = Math.max(0, p.life / p.max); ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill(); }
      ctx.globalAlpha = 1;
    }

    /* ---------- frame ---------- */
    function draw(dt) {
      dt = dt || 0;
      sc = cv.height / H; WW = Math.max(640, cv.width / sc);
      ctx.setTransform(sc, 0, 0, sc, 0, 0);
      if (WW > cv.width / sc + .5) ctx.setTransform(cv.width / WW, 0, 0, cv.width / WW, 0, 0);      /* very narrow windows: shrink instead of cropping */
      ctx.save();
      if (shake > 0) ctx.translate((Math.random() - .5) * shake, (Math.random() - .5) * shake);
      background();
      for (let t = 3; t >= 0; t--) building(t, tierX(t), v.live && t === v.role);
      /* source depot */
      sourceDepot();
      if (v.live) { crates(v.role, tierX(v.role), d.inv); backlog(v.role, tierX(v.role), d.back); }
      drawTraffic(anim);
      drawPeople(anim, dt);
      drawOrders(anim);
      ledger();
      drawLabels();
      drawParts(dt);
      ctx.restore();
    }
    function sourceDepot() {
      const x = NX(0), w = bwid() * .9, c = acc[3];
      ctx.fillStyle = 'rgba(0,0,0,' + (day ? .2 : .35) + ')'; ctx.beginPath(); ctx.ellipse(x, GY + 6, w * .7, 10, 0, 0, TAU); ctx.fill();
      for (let i = 0; i < 3; i++) { const sx = x - w / 2 + i * w / 2.6 + 12, sh = 90 + (i % 2) * 28; ctx.fillStyle = day ? '#e4e8f2' : '#262f78'; ctx.fillRect(sx, GY - sh, 26, sh); ctx.fillStyle = day ? '#c7cfe2' : '#1a2158'; ctx.fillRect(sx + 18, GY - sh, 8, sh); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(sx + 13, GY - sh, 13, 6, 0, 0, TAU); ctx.fill(); ctx.fillStyle = c; ctx.fillRect(sx, GY - sh * .5, 26, 4); }
      ctx.font = '26px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText(cfg.goods, x, GY - 126);
    }
    function step(ts) {
      if (!last) last = ts; let dt = Math.min(64, ts - last); last = ts; T += dt;
      const k = 1 - Math.exp(-dt / 220); d.inv += (v.inv - d.inv) * k; d.back += (v.back - d.back) * k;
      if (anim) { anim.t += dt / anim.dur; if (!anim.fired && anim.t > .8) { anim.fired = true; fireArrive(); } if (anim.t >= 1) { anim = null; } }
      if (shake > 0) shake = Math.max(0, shake - dt * .03);
      draw(dt / 1000);
      if (running) raf = requestAnimationFrame(step);
    }
    function fireArrive() {
      if (!v.live) return;
      const t = v.role, x = tierX(t);
      burst(x, GY - 20, 14, [acc[t], pal.gold], 3);
    }

    const api = {
      setNames(o) { Object.assign(names, o.names || {}); if (o.src != null) cfg.src = o.src; if (o.goods) cfg.goods = o.goods; if (!running) this.draw(); },
      /* view: { role, inv, back, pipes, inc, order, live, snap } */
      set(o) { Object.assign(v, o); if (o.snap) { d.inv = v.inv; d.back = v.back; anim = null; } if (!running) this.draw(); },
      /* animate one week: info { prev: pipes before, arrived, inc, order, shipped, demand, served } */
      step(info, still) {
        if (still) { anim = null; return; }
        const n = v.live && v.role === 0 ? Math.min(6, Math.max(1, Math.round(info.demand))) : 2 + (Math.random() * 3 | 0);
        const go = []; for (let i = 0; i < n; i++) go.push(i % 6); const fed = go.map((_, i) => i < Math.round(info.served == null ? n : (v.role === 0 ? Math.min(n, info.served / Math.max(1, info.demand) * n) : n)));
        anim = { t: 0, dur: 1500, prev: info.prev.map(p => p.slice()), arrived: info.arrived, inc: info.inc, order: info.order, shipped: info.shipped, go, fed, fired: false };
        if (!running) this.draw();
      },
      fx(name) { if (name === 'bad') shake = 8; },
      setTheme(dd) { day = !!dd; pal = dd ? PAL.day : PAL.night; acc = dd ? ACC.day : ACC.night; if (!running) this.draw(); },
      start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(step); },
      stop() { running = false; cancelAnimationFrame(raf); this.draw(); },
      draw() { draw(0); },
      get busy() { return !!anim; },
      get running() { return running; }
    };
    return api;
  }
  (typeof MBALAB !== 'undefined' ? MBALAB : (globalThis.MBALAB = globalThis.MBALAB || {})).bwScene = Scene;
})();
