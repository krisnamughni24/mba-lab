/* Price Detective: animated street stall. MBALAB.vwScene(canvas) -> { setProduct, setTheme, setOwner, setPrice, ask, crowd, launch, skip, start, stop, draw, running, busy }
   Logical size 960x540, scaled to the canvas. Customers are small drawn people; speech bubbles carry the interview answers, icons show how each shopper reacts in the launch week. */
(function () {
  const W = 960, H = 540, TAU = Math.PI * 2, GY = 410;   /* GY: street line */
  const CLO = ['#ff6ad5', '#4dd2ff', '#ffd166', '#6ee7b7', '#a78bfa', '#ff7a45', '#58c46a', '#e8394a'];
  const PAL = {
    day:   { sky: ['#8fd3ff', '#e9f7ff'], far: '#b9c9e6', near: '#9fb4d8', win: 'rgba(255,255,255,.55)', street: '#c8ccd8', walk: '#e2d4b8', grass: '#79c06a', stall: '#fff3d6', counter: '#b98550', counterL: '#d9a96e', ink: '#1a2342', board: '#fffbe8' },
    night: { sky: ['#0a0f3a', '#2a2a6a'], far: '#1b2152', near: '#141a44', win: '#ffd98a', street: '#2a2f55', walk: '#3a3a5c', grass: '#173a45', stall: '#3a3258', counter: '#6a4630', counterL: '#8a6040', ink: '#f0faff', board: '#1c2150' }
  };
  const AWN = { kopi: ['#8a5a3a', '#fff3d6'], sepatu: ['#2f6fdb', '#ffffff'], app: ['#7a3fe0', '#f1e8ff'], batik: ['#c2542d', '#ffe7c2'] };
  const rr = (c, x, y, w, h, r) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
  const lerp = (a, b, k) => a + (b - a) * k;

  function create(cv) {
    const ctx = cv.getContext('2d'); let raf = 0, last = 0, T = 0, day = true, product = 'kopi', owner = 'Bu Sari', price = 0, priceTxt = '', shown = 0, running = false;
    let R = Math.random; const rnd = () => R();
    const folks = [], parts = []; let nextAmbient = 1, flash = 0;
    let job = null;       /* interview or launch in progress */
    let sc = 1, ox = 0;

    function person(x, dir, col) { return { x, y: GY + 18 + rnd() * 40, dir, col: col || CLO[Math.floor(rnd() * CLO.length)], hat: rnd() < .35, sp: 55 + rnd() * 40, ph: rnd() * 6, st: 'walk', bub: null, tx: null, t: 0, ic: null, icT: 0 }; }
    function ambient(dt) {
      nextAmbient -= dt; if (nextAmbient <= 0 && folks.filter(f => f.amb).length < 5) { const d = rnd() < .5 ? 1 : -1, f = person(d > 0 ? -40 : W + 40, d); f.amb = 1; f.y = GY + 52 + rnd() * 28; f.sp = 35 + rnd() * 25; folks.push(f); nextAmbient = 2 + rnd() * 3; }
    }
    function drawPerson(f, s) {
      const c = ctx, x = f.x, y = f.y, sw = Math.sin(f.ph) * (f.st === 'walk' ? 4 : 0), k = s || 1;
      c.save(); c.translate(x, y); c.scale(k, k);
      c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(0, 22, 13, 4, 0, 0, TAU); c.fill();
      c.strokeStyle = day ? '#3a3050' : '#c9c4ee'; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(-3, 10); c.lineTo(-3 - sw, 22); c.moveTo(3, 10); c.lineTo(3 + sw, 22); c.stroke();
      c.fillStyle = f.col; rr(c, -8, -12, 16, 24, 6); c.fill();
      c.fillStyle = '#f0c6a0'; c.beginPath(); c.arc(0, -20, 8, 0, TAU); c.fill();
      c.fillStyle = '#2a2038'; c.beginPath(); c.arc(0, -23, 8, Math.PI, TAU); c.fill();
      if (f.hat) { c.fillStyle = '#e8c860'; c.beginPath(); c.ellipse(0, -27, 12, 3.5, 0, 0, TAU); c.fill(); c.fillRect(-6, -34, 12, 8); }
      c.fillStyle = '#10142e'; c.fillRect(f.dir > 0 ? 2 : -5, -21, 3, 3);
      c.restore();
    }
    function bubble(x, y, text, col, a) {
      const c = ctx; c.save(); c.globalAlpha = a; c.font = '800 14px system-ui,sans-serif'; const w = Math.max(70, c.measureText(text).width + 22), h = 30, bx = Math.max(6, Math.min(W - w - 6, x - w / 2)), by = y - h - 10;
      c.fillStyle = day ? '#fff' : '#12163f'; c.strokeStyle = col; c.lineWidth = 2.5; rr(c, bx, by, w, h, 12); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(x - 6, by + h - 1); c.lineTo(x, by + h + 9); c.lineTo(x + 6, by + h - 1); c.fillStyle = day ? '#fff' : '#12163f'; c.fill();
      c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, bx + w / 2, by + h / 2 + 1); c.restore();
    }
    function icon(f) {
      if (!f.ic) return; const a = Math.max(0, 1 - f.icT / 1.3), y = f.y - 50 - f.icT * 16, c = ctx; c.save(); c.globalAlpha = a; c.textAlign = 'center'; c.textBaseline = 'middle';
      if (f.ic === 'ask') { c.fillStyle = day ? '#fff' : '#12163f'; c.strokeStyle = '#4dd2ff'; c.lineWidth = 2; c.beginPath(); c.arc(f.x, y, 11, 0, TAU); c.fill(); c.stroke(); c.fillStyle = '#4dd2ff'; c.font = '800 13px system-ui'; c.fillText('…', f.x, y - 2); }
      else if (f.ic === 'buy' || f.ic === 'doubt' || f.ic === 'hes') {
        c.fillStyle = f.ic === 'buy' ? '#ffd166' : '#ffb36b'; c.strokeStyle = '#9a6a10'; c.lineWidth = 2; c.beginPath(); c.arc(f.x, y, 10, 0, TAU); c.fill(); c.stroke(); c.fillStyle = '#7a5008'; c.font = '800 11px system-ui'; c.fillText(f.ic === 'buy' ? 'Rp' : f.ic === 'hes' ? 'Rp?' : 'Rp?', f.x, y + 1);
      } else { c.strokeStyle = '#ff4d6d'; c.lineWidth = 4; c.beginPath(); c.moveTo(f.x - 7, y - 7); c.lineTo(f.x + 7, y + 7); c.moveTo(f.x + 7, y - 7); c.lineTo(f.x - 7, y + 7); c.stroke(); }
      c.restore();
    }

    /* ---------- backdrop ---------- */
    function back() {
      const p = day ? PAL.day : PAL.night, c = ctx, g = c.createLinearGradient(0, 0, 0, GY); g.addColorStop(0, p.sky[0]); g.addColorStop(1, p.sky[1]); c.fillStyle = g; c.fillRect(-ox / sc - 40, 0, W + 2 * (ox / sc) + 80, GY);
      const x0 = -ox / sc - 40, x1 = W + ox / sc + 40;
      if (!day) { c.fillStyle = '#fff'; for (let i = 0; i < 50; i++) { const x = (i * 197) % 1200 - 120, y = (i * 61) % 240, tw = .4 + .6 * Math.abs(Math.sin(T + i)); c.globalAlpha = tw * .7; c.fillRect(x, y, 2, 2); } c.globalAlpha = 1; c.fillStyle = '#fff6c8'; c.beginPath(); c.arc(820, 90, 28, 0, TAU); c.fill(); c.fillStyle = p.sky[0]; c.beginPath(); c.arc(832, 84, 25, 0, TAU); c.fill(); }
      else { c.fillStyle = '#fff'; c.globalAlpha = .75; [[120, 90, 1], [520, 60, .8], [800, 110, 1.1]].forEach((q, i) => { const x = ((q[0] + T * (6 + i * 2)) % (W + 300)) - 150; c.beginPath(); c.ellipse(x, q[1], 60 * q[2], 16 * q[2], 0, 0, TAU); c.ellipse(x + 34 * q[2], q[1] + 6, 40 * q[2], 14 * q[2], 0, 0, TAU); c.fill(); }); c.globalAlpha = 1; }
      [[p.far, 0, 250, 0], [p.near, 40, 300, 1]].forEach(L => {
        c.fillStyle = L[0]; for (let x = x0 - 80; x < x1; x += 90) { const h = 90 + ((Math.abs(x * 7 + L[3] * 41) % 7) * 18), w = 70 + (Math.abs(x) % 3) * 12; c.fillRect(x + L[1] % 40, GY - h - 30 * L[3], w, h + 30 * L[3]);
          c.fillStyle = p.win; for (let wy = GY - h - 20 * L[3]; wy < GY - 24; wy += 22) for (let wx = x + 8 + L[1] % 40; wx < x + w - 10 + L[1] % 40; wx += 18) { if (!day && ((wx * 3 + wy) | 0) % 5 === 0) continue; c.fillRect(wx, wy, 8, 10); } c.fillStyle = L[0]; }
      });
      c.fillStyle = p.walk; c.fillRect(x0, GY - 6, x1 - x0, 60); c.fillStyle = p.street; c.fillRect(x0, GY + 54, x1 - x0, H - GY);
      c.fillStyle = day ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.18)'; for (let x = x0 - ((T * 30) % 80); x < x1; x += 80) c.fillRect(x, GY + 110, 40, 5);
    }

    /* ---------- products on the counter ---------- */
    function productArt(x, y) {
      const c = ctx;
      if (product === 'kopi') { for (let i = 0; i < 4; i++) { const bx = x - 78 + i * 40; c.fillStyle = '#6a4228'; rr(c, bx, y - 44, 20, 44, 6); c.fill(); c.fillStyle = '#f4e4c8'; c.fillRect(bx + 2, y - 28, 16, 14); c.fillStyle = '#3a2a1c'; c.fillRect(bx + 5, y - 52, 10, 9); c.fillStyle = '#c28a52'; c.fillRect(bx + 2, y - 40, 16, 5); } }
      else if (product === 'sepatu') { for (let i = 0; i < 2; i++) { const bx = x - 70 + i * 86, col = i ? '#ffd166' : '#ff6ad5'; c.fillStyle = '#fff'; rr(c, bx, y - 12, 66, 12, 5); c.fill(); c.fillStyle = col; c.beginPath(); c.moveTo(bx + 2, y - 12); c.lineTo(bx + 4, y - 36); c.quadraticCurveTo(bx + 30, y - 40, bx + 42, y - 24); c.quadraticCurveTo(bx + 58, y - 22, bx + 64, y - 12); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(bx + 16 + k * 7, y - 34 + k * 3); c.lineTo(bx + 22 + k * 7, y - 28 + k * 3); c.stroke(); } } }
      else if (product === 'app') { [[x - 70, 0], [x + 10, 1]].forEach(q => { c.fillStyle = '#10142e'; rr(c, q[0], y - 64, 46, 64, 7); c.fill(); const g = c.createLinearGradient(q[0], y - 60, q[0] + 46, y); g.addColorStop(0, '#7a3fe0'); g.addColorStop(1, '#4dd2ff'); c.fillStyle = g; rr(c, q[0] + 4, y - 58, 38, 52, 4); c.fill(); c.fillStyle = '#fff'; c.fillRect(q[0] + 10, y - 44, 26, 4); c.fillRect(q[0] + 10, y - 34, 18, 4); c.beginPath(); c.arc(q[0] + 23, y - 18, 7 + (q[1] ? Math.sin(T * 3) * 1.5 : 0), 0, TAU); c.fill(); }); }
      else { for (let i = 0; i < 2; i++) { const bx = x - 66 + i * 84, col = i ? '#c2542d' : '#2f6f8f'; c.strokeStyle = '#6a4630'; c.lineWidth = 3; c.beginPath(); c.moveTo(bx + 26, y - 64); c.lineTo(bx + 26, y - 56); c.stroke(); c.fillStyle = col; c.beginPath(); c.moveTo(bx + 4, y - 52); c.lineTo(bx + 26, y - 58); c.lineTo(bx + 48, y - 52); c.lineTo(bx + 58, y - 36); c.lineTo(bx + 46, y - 30); c.lineTo(bx + 44, y); c.lineTo(bx + 8, y); c.lineTo(bx + 6, y - 30); c.lineTo(bx - 6, y - 36); c.fill(); c.fillStyle = 'rgba(255,225,160,.8)'; for (let k = 0; k < 8; k++) { c.beginPath(); c.arc(bx + 12 + (k % 4) * 9, y - 44 + Math.floor(k / 4) * 18, 2.4, 0, TAU); c.fill(); } } }
    }
    function stall() {
      const p = day ? PAL.day : PAL.night, c = ctx, X = 520, Y = GY - 6, aw = AWN[product] || AWN.kopi;
      c.fillStyle = p.stall; c.fillRect(X - 150, Y - 190, 300, 190);
      c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(X - 150, Y - 190, 300, 14);
      for (let i = 0; i < 10; i++) { c.fillStyle = i % 2 ? aw[1] : aw[0]; c.beginPath(); c.moveTo(X - 165 + i * 33, Y - 214); c.lineTo(X - 165 + (i + 1) * 33, Y - 214); c.lineTo(X - 160 + (i + 1) * 33, Y - 170 + (i % 2) * 3); c.lineTo(X - 160 + i * 33, Y - 170 + (i % 2) * 3); c.fill(); }
      c.fillStyle = '#6a4630'; c.fillRect(X - 160, Y - 170, 8, 170); c.fillRect(X + 152, Y - 170, 8, 170);
      c.fillStyle = p.counter; rr(c, X - 165, Y - 62, 330, 62, 6); c.fill(); c.fillStyle = p.counterL; c.fillRect(X - 165, Y - 62, 330, 10);
      productArt(X, Y - 62);
      /* owner */
      const o = { x: X + 98, y: Y - 64, dir: -1, col: '#e8394a', hat: false, ph: 0, st: 'idle' }; drawPerson(o, 1.15);
      /* price board */
      const bx = X - 56, by = Y - 160; c.strokeStyle = '#6a4630'; c.lineWidth = 2; c.beginPath(); c.moveTo(bx + 20, by); c.lineTo(bx + 20, by - 12); c.moveTo(bx + 92, by); c.lineTo(bx + 92, by - 12); c.stroke();
      c.fillStyle = p.board; c.strokeStyle = '#6a4630'; c.lineWidth = 3; rr(c, bx, by, 112, 44, 8); c.fill(); c.stroke();
      c.fillStyle = day ? '#1a2342' : '#ffd166'; c.font = '800 17px system-ui,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(priceTxt, bx + 56, by + 23);
      c.fillStyle = day ? '#6a7690' : '#9fb4d8'; c.font = '700 10px system-ui'; c.fillText(owner.toUpperCase(), X - 8, Y - 175 + 52);
      if (!day) { const g = c.createRadialGradient(X, Y - 130, 10, X, Y - 130, 230); g.addColorStop(0, 'rgba(255,220,140,.28)'); g.addColorStop(1, 'rgba(255,220,140,0)'); c.fillStyle = g; c.fillRect(X - 240, Y - 360, 480, 420); }
    }

    /* ---------- jobs ---------- */
    const BX = 400;   /* where customers stand at the counter */
    function stepJob(dt) {
      if (!job) return;
      if (job.kind === 'ask') {
        const f = job.f, sp = job.speed || 1;
        if (f.st === 'walk') { f.x += f.dir * 170 * sp * dt; f.ph += dt * 14; if ((BX - f.x) * f.dir <= 0) { f.st = 'talk'; f.t = 0; f.k = 0; f.dir = 1; } }
        else if (f.st === 'talk') {
          f.t += dt * sp; const per = job.bad ? 1.4 : 1.15; const k = Math.floor(f.t / per);
          if (job.bad) { f.bub = { text: job.badText, col: '#ffb36b' }; if (f.t > 2.2) { f.st = 'leave'; f.dir = -1; f.bub = null; } }
          else if (k < 4) { f.bub = job.bubbles[k]; if (f.k !== k) { f.k = k; job.onAnswer && job.onAnswer(k); } } else { f.st = 'leave'; f.dir = -1; f.bub = null; }
        } else if (f.st === 'leave') { f.x += f.dir * 170 * sp * dt; f.ph += dt * 14; if (f.x < -50) { const d = job.done; job = null; d && d(); } }
      } else if (job.kind === 'launch') {
        job.t += dt * job.speed;
        while (job.i < job.list.length && job.t >= job.i * job.gap) { const r = job.list[job.i], f = person(rnd() < .5 ? -30 : W + 30, 1); f.dir = f.x < 0 ? 1 : -1; f.st = 'go'; f.tx = BX + (rnd() * 60 - 30); f.ty = GY + 14 + rnd() * 52; f.res = r; f.idx = job.i; f.sp = 200 + rnd() * 60; folks.push(f); job.i++; }
        if (job.i >= job.list.length && !folks.some(f => f.res)) { const d = job.done; job = null; d && d(); }
      }
    }
    function stepFolk(f, dt) {
      f.ph += dt * 11; f.icT += f.ic ? dt : 0; if (f.icT > 1.3) { f.ic = null; f.icT = 0; }
      if (f.amb) { f.x += f.dir * f.sp * dt; if (f.x < -60 || f.x > W + 60) f.dead = 1; return; }
      if (f.res) {
        const sp = (job ? job.speed : 3) * 1.0;
        if (f.st === 'go') { const dx = f.tx - f.x, dy = f.ty - f.y; const d = Math.hypot(dx, dy) || 1, v = f.sp * sp * dt; if (d < v) { f.x = f.tx; f.y = f.ty; f.st = 'react'; f.t = 0; } else { f.x += dx / d * v; f.y += dy / d * v; f.dir = dx >= 0 ? 1 : -1; } }
        else if (f.st === 'react') { if (f.t === 0) { f.ic = f.res; f.icT = 0; if (job && job.onReact) job.onReact(f.idx, f.res); if (f.res === 'buy' || f.res === 'doubt' || f.res === 'hes') { flash = .12; } } f.t += dt * sp; if (f.t > .32) { f.st = 'away'; f.dir = f.x < BX ? -1 : 1; if (f.res === 'no') f.dir = f.x < BX ? -1 : 1; } }
        else if (f.st === 'away') { f.x += f.dir * f.sp * sp * dt; if (f.x < -60 || f.x > W + 60) f.dead = 1; }
        return;
      }
      if (f.st === 'walk' && !f.amb && !(job && job.f === f)) f.x += f.dir * f.sp * dt;
    }

    /* ---------- frame ---------- */
    function frame(dt) {
      T += dt; shown = lerp(shown, price, Math.min(1, dt * 6)); ambient(dt); stepJob(dt);
      for (let i = folks.length - 1; i >= 0; i--) { stepFolk(folks[i], dt); if (folks[i].dead) folks.splice(i, 1); }
      for (let i = parts.length - 1; i >= 0; i--) { const q = parts[i]; q.t += dt; q.y -= 30 * dt; if (q.t > 1) parts.splice(i, 1); }
      draw();
    }
    function draw() {
      const c = ctx, w = cv.width, h = cv.height; sc = h / H; ox = (w - W * sc) / 2; c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, w, h); c.setTransform(sc, 0, 0, sc, ox, 0);
      back(); stall();
      folks.slice().sort((a, b) => a.y - b.y).forEach(f => { drawPerson(f); }); 
      folks.forEach(f => { if (f.bub) bubble(f.x, f.y - 44, f.bub.text, f.bub.col, 1); icon(f); });
      if (flash > 0) { flash -= .016; ctx.fillStyle = 'rgba(255,230,150,' + Math.min(.12, flash) + ')'; ctx.fillRect(-ox / sc, 0, w / sc, H); }
    }
    function loop(ts) { if (!running) return; const dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts; if (!document.body.classList.contains('still')) frame(dt); else draw(); raf = requestAnimationFrame(loop); }

    const api = {
      get running() { return running; }, get busy() { return !!job; },
      setProduct(id, name) { product = id; if (name) owner = name; draw(); },
      setTheme(d) { day = !!d; draw(); },
      setPrice(p, txt) { price = p; priceTxt = txt; if (!shown) shown = p; if (!running) { shown = p; draw(); } },
      setSeed(fn) { R = fn || Math.random; },
      /* one interview: a shopper walks up, gives four answers in speech bubbles, walks off */
      ask(o, done) {
        if (job) return false; const f = person(-40, 1); f.st = 'walk'; folks.push(f);
        job = { kind: 'ask', f, bubbles: o.bubbles, bad: !!o.bad, badText: o.badText, onAnswer: o.onAnswer, done, speed: o.speed || 1 }; return true;
      },
      /* many shoppers: list of 'buy' | 'hes' | 'doubt' | 'no', one visit each */
      launch(list, o, done) { if (job) job = null; job = { kind: 'launch', list, i: 0, t: 0, gap: o.gap || .09, speed: o.speed || 1, onReact: o.onReact, done }; },
      skip() { if (job && job.kind === 'launch') job.speed = 12; if (job && job.kind === 'ask') job.speed = 6; },
      clear() { job = null; folks.length = 0; },
      start() { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); },
      stop() { running = false; cancelAnimationFrame(raf); },
      draw
    };
    draw(); return api;
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.vwScene = create;
})();
