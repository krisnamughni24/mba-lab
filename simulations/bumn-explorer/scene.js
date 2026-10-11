/* BUMN Explorer: 3D city (Three.js r128, same engine and look as the landing page city).
   MBALAB.bumn.Scene(host, cb) -> scene | null (null when Three.js or WebGL is unavailable)
   cb = { onPick(id|null), onHover(id|null), canHover() }
   scene = { set({filter, visited}), focus(id|null), reveal(id|null), cam:{rot,tilt,zoom,reset}, setTheme(day), start(), stop(), resize(), pos(id) } */
(function () {
  const P = 18, CELLS = 10, TAU = Math.PI * 2;
  const wx = (g, s) => (g + (s || 1) / 2 - CELLS / 2) * P;            // lot centre in world units
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  function Scene(host, cb) {
    const T = window.THREE, E = MBALAB.bumn;
    if (!T) return null;
    let R; try { R = new T.WebGLRenderer({ antialias: true }); } catch (e) { return null; }
    R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    const cv = R.domElement; cv.className = 'bm-gl'; host.insertBefore(cv, host.firstChild);
    const sc = new T.Scene(), cam = new T.PerspectiveCamera(46, 16 / 9, 1, 1600), D = new T.Object3D();
    sc.fog = new T.FogExp2(0x0a0f2c, .0032); sc.background = new T.Color(0x0a0f2c);
    const amb = new T.AmbientLight(0x8899cc, .85), dl = new T.DirectionalLight(0xbbd4ff, .9); dl.position.set(120, 160, -80); sc.add(amb, dl);
    const R0 = rng(20251), pick = a => a[Math.floor(R0() * a.length)], rnd = (a, b) => a + R0() * (b - a);
    const C = h => new T.Color(h), MB = (c, o) => new T.MeshBasicMaterial(Object.assign({ color: c }, o || {}));
    let day = false;

    /* ---------- shared helpers ---------- */
    const gtex = c0 => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, c0); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c); };
    const winBase = [0, 1, 2, 3].map(() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, 64, 64); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (R0() < .62) { x.fillStyle = pick(['#ffd98a', '#9be7ff', '#ffb3e6', '#ffffff']); x.fillRect(i * 16 + 4, j * 16 + 4, 8, 9); } const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; return t; });
    const GL = [], LOT = [];                                   // theme-aware materials
    const glassMat = (hex, rx, ry, nightMul) => {
      const t0 = pick(winBase).clone(); t0.needsUpdate = true; t0.repeat.set(Math.max(1, rx), Math.max(1, ry));
      const m = new T.MeshStandardMaterial({ color: 0x2b3f86, transparent: true, opacity: .8, metalness: .5, roughness: .25, emissive: 0xffffff, emissiveMap: t0, emissiveIntensity: .85 });
      const col = C(hex); GL.push({ m, n: col.clone().multiplyScalar(nightMul || .42).lerp(C(0x1b2a6b), .35), d: col.clone().lerp(C(0xffffff), .45) }); return m;
    };
    const edgeMat = (hex, op) => new T.LineBasicMaterial({ color: hex, transparent: true, opacity: op == null ? .65 : op });
    const emojiTex = (emoji, visited) => {
      const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
      x.font = '84px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(emoji, 64, 70);
      if (visited) { x.fillStyle = '#34d399'; x.beginPath(); x.arc(104, 24, 18, 0, TAU); x.fill(); x.strokeStyle = '#06041a'; x.lineWidth = 5; x.lineCap = 'round'; x.beginPath(); x.moveTo(95, 24); x.lineTo(102, 31); x.lineTo(114, 17); x.stroke(); }
      return new T.CanvasTexture(c);
    };

    /* ---------- ground, roads, lots ---------- */
    const mGround = MB(0x0a1228), mRoad = MB(0x121a3d), mLane = MB(0x3b82f6, { transparent: true, opacity: .55 });
    const flat = (w, h, m, x, y, z) => { const o = new T.Mesh(new T.PlaneGeometry(w, h), m); o.rotation.x = -Math.PI / 2; o.position.set(x, y, z); sc.add(o); return o; };
    flat(1800, 1800, mGround, 0, 0, 0);
    const SPAN = CELLS * P + 2 * P;
    for (let k = 0; k <= CELLS; k++) { const p = (k - CELLS / 2) * P; flat(5, SPAN, mRoad, p, .03, 0); flat(SPAN, 5, mRoad, 0, .03, p); flat(.14, SPAN, mLane, p, .05, 0); flat(SPAN, .14, mLane, 0, .05, p); }
    const lotCol = { n: C(0x161f4a), d: C(0xaab6cc) };
    const mLot = MB(0x161f4a); LOT.push({ m: mLot, n: lotCol.n, d: lotCol.d });
    const mGroundC = { n: C(0x0a1228), d: C(0x7d9a62) }, mRoadC = { n: C(0x121a3d), d: C(0x50555f) }, mLaneC = { n: C(0x3b82f6), d: C(0xffffff) };
    const lot = (cx, cz, s, hex) => { const w = (s || 1) * P - 5; flat(w, w, mLot, cx, .06, cz); if (hex) { const g = new T.PlaneGeometry(w, w), l = new T.LineSegments(new T.EdgesGeometry(g), edgeMat(hex, .9)); l.rotation.x = -Math.PI / 2; l.position.set(cx, .09, cz); sc.add(l); } };

    /* ---------- building registry + fading ---------- */
    const B = {}, anims = [], hits = [];
    const entry = id => B[id];
    const reg = (ent, m, f) => { if (!ent.mats.some(o => o.m === m)) ent.mats.push({ m, base: m.opacity == null ? 1 : m.opacity, keep: !!f, self: f === 's' }); return m; };
    const fade = (o, a) => { if (o.keep) { if (!o.self) o.m.opacity = o.base * a; return; } const tr = a < .999 || o.base < 1; if (o.m.transparent !== tr) { o.m.transparent = tr; o.m.needsUpdate = true; } o.m.opacity = o.base * a; };

    function build(b) {
      const s = b.s || 1, X = wx(b.gx, s), Z = wx(b.gy, s), H = b.h * .5, col = E.COLORS[b.sec], ent = { b, g: new T.Group(), mats: [], a: 1, aT: 1, X, Z, H, vis: false };
      ent.g.position.set(X, 0, Z); sc.add(ent.g); B[b.id] = ent;
      lot(X, Z, s, col);
      const own = m => reg(ent, m), add = (geo, m, x, y, z) => { const o = new T.Mesh(geo, own(m)); o.position.set(x, y, z); ent.g.add(o); return o; };
      const std = (c, o) => new T.MeshStandardMaterial(Object.assign({ color: c, roughness: .6, metalness: .2 }, o || {}));
      const edges = (mesh, hex) => { const e = new T.LineSegments(new T.EdgesGeometry(mesh.geometry, 30), own(edgeMat(hex || col))); mesh.add(e); };
      const glass = (w, h, d, y, rx, ry) => { const m = add(new T.BoxGeometry(w, h, d), glassMat(col, rx || Math.round(w / 3), ry || Math.round(h / 3)), 0, y + h / 2, 0); edges(m); return m; };
      const stone = (w, h, d, y, c, x, z) => add(new T.BoxGeometry(w, h, d), std(c || 0x39467a), x || 0, y + h / 2, z || 0);
      const blink = (x, y, z, c) => { const sp = new T.Sprite(new T.SpriteMaterial({ map: gtex(c || 'rgba(255,60,80,1)'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, fog: false })); sp.scale.set(4, 4, 1); sp.position.set(x, y, z); ent.g.add(sp); reg(ent, sp.material, 'k'); anims.push((t, dt) => { sp.visible = Math.sin(t * 5 + X) > 0; }); };
      const smoke = (x, y, z) => { const mp = gtex('rgba(235,235,245,.9)'), arr = []; for (let i = 0; i < 5; i++) { const sp = new T.Sprite(new T.SpriteMaterial({ map: mp, transparent: true, depthWrite: false, opacity: 0 })); ent.g.add(sp); arr.push(sp); } anims.push(t => arr.forEach((sp, i) => { const u = ((t * .25 + i / 5) % 1); sp.position.set(x + u * 3, y + u * 12, z); sp.scale.setScalar(2 + u * 5); sp.material.opacity = (1 - u) * .45 * ent.a; })); };
      switch (b.shape) {
        case 'tower': {
          stone(s * 11, 1.4, 11, 0, 0x39467a); glass(8.6, H * .68, 8.6, 1.4); glass(6, H * .32, 6, 1.4 + H * .68);
          add(new T.CylinderGeometry(.12, .25, 5, 6), MB(0xdde6ff), 0, H + 4, 0); blink(0, H + 6.6, 0);
          break;
        }
        case 'hub': {
          stone(24, .8, 24, 0, 0x6b5a2a); const m = [[13, H * .52, 0], [9, H * .3, H * .52], [5.4, H * .18, H * .82]];
          m.forEach(q => glass(q[0], q[1], q[0], .8 + q[2], Math.round(q[0] / 3), Math.round(q[1] / 3)));
          [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => add(new T.BoxGeometry(.9, H * .52, .9), MB(0xffc857), q[0] * 6.5, .8 + H * .26, q[1] * 6.5));
          add(new T.BoxGeometry(6.4, 1.2, 6.4), MB(0xffc857), 0, H + .8, 0); add(new T.CylinderGeometry(.1, .3, 9, 6), MB(0xffe9b0), 0, H + 5.6, 0);
          const gs = new T.Sprite(new T.SpriteMaterial({ map: gtex('rgba(255,200,90,.95)'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, fog: false })); gs.scale.set(30, 30, 1); gs.position.set(0, H + 4, 0); ent.g.add(gs); reg(ent, gs.material, 'k'); ent.glow = gs;
          const ring = new T.Mesh(new T.RingGeometry(.8, 1, 48), reg(ent, MB(0xffc857, { transparent: true, side: T.DoubleSide }), 's')); ring.rotation.x = -Math.PI / 2; ring.position.y = .2; ent.g.add(ring);
          anims.push(t => { const u = (t % 2.4) / 2.4; ring.scale.setScalar(10 + u * 18); ring.material.opacity = (1 - u) * ent.a; });
          break;
        }
        case 'low': {
          if (b.id === 'garuda') {
            stone(9, H * .7, 6, 0, 0x4a5a99, -1.5, 3.5); stone(9.4, .8, 6.4, H * .7, 0xff4d6d, -1.5, 3.5);
            const rw = new T.Mesh(new T.PlaneGeometry(3.4, 13), own(MB(0x1d2547))); rw.rotation.x = -Math.PI / 2; rw.position.set(4, .12, 0); ent.g.add(rw);
            const pl = new T.Group(); pl.add(new T.Mesh(new T.BoxGeometry(.9, .9, 4.6), own(MB(0xeaf0ff)))); pl.add(new T.Mesh(new T.BoxGeometry(5.6, .15, 1.4), own(MB(0xdde6ff)))); const f = new T.Mesh(new T.BoxGeometry(.15, 1.2, 1), own(MB(0xff6ad5))); f.position.set(0, .8, -2); pl.add(f); ent.g.add(pl);
            anims.push(t => { const u = (t * .12) % 1, z = -6.5 + u * 13; pl.position.set(4, .6 + Math.max(0, u - .55) * 18, z); pl.rotation.x = -Math.max(0, u - .55) * .5; });
          } else if (b.id === 'kai') {
            stone(8, H * .7, 5, 0, 0x3f55a8, -2, -3.5); stone(8.4, .7, 5.4, H * .7, 0xaab6d8, -2, -3.5);
            const rl = new T.Mesh(new T.PlaneGeometry(13, 2), own(MB(0x4b5563))); rl.rotation.x = -Math.PI / 2; rl.position.set(0, .12, 3.4); ent.g.add(rl);
            const tr = new T.Group(); for (let i = 0; i < 3; i++) { const c = new T.Mesh(new T.BoxGeometry(3.4, 1.3, 1.5), own(MB(i ? 0x5b8cff : 0xffd166))); c.position.x = i * 3.6; tr.add(c); } ent.g.add(tr); anims.push(t => { tr.position.set(-6 + (Math.sin(t * .4) * .5 + .5) * 5, .9, 3.4); });
          } else { /* pos, bulog */
            const wh = b.id === 'bulog'; stone(wh ? 11 : 9, H * (wh ? .6 : .75), wh ? 8 : 7, 0, wh ? 0x7a8fcf : 0x4a5a99, 0, 0);
            if (wh) for (let i = 0; i < 3; i++) { const pr = add(new T.CylinderGeometry(1.9, 1.9, 8, 3), std(0xa3e635), -3.5 + i * 3.5, H * .6 + .9, 0); pr.rotation.x = Math.PI / 2; pr.rotation.z = Math.PI / 2; pr.rotation.y = 0; }
            else { stone(9.4, .9, 7.4, H * .75, 0xff6b3d, 0, 0); const van = new T.Mesh(new T.BoxGeometry(2, 1.2, 1.1), own(MB(0xff6b3d))); ent.g.add(van); anims.push(t => { const a = t * .5; van.position.set(Math.cos(a) * 6.2, .8, Math.sin(a) * 6.2); van.rotation.y = -a; }); }
          }
          break;
        }
        case 'tank': {
          const n = b.id === 'pertamina' ? 3 : 2;
          for (let i = 0; i < n; i++) { const r = 2.7, h = H * (1 - i * .15), x = -4 + i * 4.2, z = (i % 2) * 3 - 1.5, c = add(new T.CylinderGeometry(r, r, h, 20), std(b.id === 'pertamina' ? 0xf0f4ff : 0x8bc34a), x, h / 2, z); const ring = add(new T.TorusGeometry(r, .12, 6, 20), MB(col), x, h * .6, z); ring.rotation.x = Math.PI / 2; add(new T.CylinderGeometry(r * .9, r, .8, 20), std(col), x, h + .4, z); }
          if (b.id === 'pertamina') { add(new T.CylinderGeometry(.18, .25, H * 1.6, 6), std(0x8a94b8), 5.5, H * .8, -3.5); const fl = new T.Sprite(new T.SpriteMaterial({ map: gtex('rgba(255,170,60,1)'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, fog: false })); fl.position.set(5.5, H * 1.65, -3.5); ent.g.add(fl); reg(ent, fl.material, 'k'); anims.push(t => { fl.scale.setScalar(4 + Math.sin(t * 14) * 1.2 + Math.random() * .6); }); }
          else { stone(5, H * .5, 3, 0, 0x6b7280, 4.5, -4); }
          break;
        }
        case 'mast': {
          stone(9, 1.2, 9, 0, 0x39467a); stone(4.5, 3, 4.5, 1.2, 0x4a5a99);
          const co = add(new T.ConeGeometry(3.4, H, 4, 1, true), new T.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: .9 }), 0, H / 2 + 1.2, 0); co.rotation.y = Math.PI / 4;
          add(new T.CylinderGeometry(.2, .2, H + 4, 6), std(0xdde6ff), 0, H / 2 + 2, 0);
          if (b.id === 'pln') { [.55, .78].forEach(u => add(new T.BoxGeometry(8 * (1 - u * .6), .35, .35), MB(col), 0, H * u + 1.2, 0)); }
          const ty = H + 4.4; blink(0, ty, 0);
          if (b.id === 'telkom') for (let k = 0; k < 3; k++) { const r = new T.Mesh(new T.RingGeometry(.9, 1, 32), reg(ent, MB(col, { transparent: true, side: T.DoubleSide }), 's')); r.rotation.x = -Math.PI / 2; r.position.y = ty - 1; ent.g.add(r); anims.push(t => { const u = ((t * .5 + k / 3) % 1); r.scale.setScalar(2 + u * 14); r.material.opacity = (1 - u) * .9 * ent.a; }); }
          else { const gs = new T.Sprite(new T.SpriteMaterial({ map: gtex('rgba(255,180,40,.9)'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, fog: false })); gs.scale.set(14, 14, 1); gs.position.set(0, ty - 1, 0); ent.g.add(gs); reg(ent, gs.material, 's'); anims.push(t => { gs.material.opacity = (.55 + .35 * Math.sin(t * 7)) * ent.a; }); }
          break;
        }
        case 'crane': {
          stone(12, .5, 12, 0, 0x2a3566);
          const cc = [0xff6b6b, 0xffd166, 0x4dd2ff, 0x6ee7b7, 0xa78bfa];
          for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) for (let k = 0; k <= (i + j) % 2; k++) add(new T.BoxGeometry(3.2, 1.5, 1.7), MB(cc[(i * 2 + j + k) % 5]), -4 + i * 3.6, .5 + .75 + k * 1.5, -3.5 + j * 2);
          [-5.6, 5.6].forEach(x => { add(new T.BoxGeometry(.6, H, .6), std(col), x, H / 2, 3); add(new T.BoxGeometry(.6, H, .6), std(col), x, H / 2, 6.6); });
          add(new T.BoxGeometry(12.4, .8, .8), std(col), 0, H, 3); add(new T.BoxGeometry(12.4, .8, .8), std(col), 0, H, 6.6); add(new T.BoxGeometry(.8, .8, 4.4), std(col), 0, H, 4.8);
          const tr = new T.Group(); tr.add(new T.Mesh(new T.BoxGeometry(1.4, .6, 1.4), own(MB(0xffd166)))); const ct = new T.Mesh(new T.BoxGeometry(3, 1.4, 1.6), own(MB(0xff4d6d))); ct.position.y = -H * .55; tr.add(ct); const cab = new T.Mesh(new T.CylinderGeometry(.05, .05, H * .5, 4), own(MB(0xffffff))); cab.position.y = -H * .27; tr.add(cab); ent.g.add(tr);
          anims.push(t => { tr.position.set(Math.sin(t * .7) * 4.5, H - .4, 4.8); });
          break;
        }
        case 'chimney': {
          stone(11, H * .5, 8, 0, b.id === 'krakatau' ? 0x6b7a99 : 0x8793b8, 0, 0); stone(11.4, .8, 8.4, H * .5, col);
          [[-2.6, -1.6, H], [1.4, 1.4, H * .82]].forEach((q, i) => { add(new T.CylinderGeometry(.9, 1.3, q[2], 12), std(0xaab6d8), q[0], q[2] / 2, q[1]); add(new T.CylinderGeometry(.95, .95, .5, 12), MB(col), q[0], q[2], q[1]); smoke(q[0], q[2] + .5, q[1]); });
          if (b.id === 'krakatau') { const gs = new T.Sprite(new T.SpriteMaterial({ map: gtex('rgba(255,120,50,.9)'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, fog: false })); gs.scale.set(10, 10, 1); gs.position.set(3.5, H * .3, 4.4); ent.g.add(gs); reg(ent, gs.material, 's'); anims.push(t => { gs.material.opacity = (.6 + .3 * Math.sin(t * 9)) * ent.a; }); }
          break;
        }
        case 'pyramid': {
          const m = add(new T.ConeGeometry(8, H * 1.15, 4), std(0x8a5cf0, { flatShading: true, roughness: .5 }), 0, H * .575, 0); m.rotation.y = Math.PI / 4;
          const m2 = add(new T.ConeGeometry(4.6, H * .75, 4), std(0x5b3fb0, { flatShading: true }), 6, H * .375, 5); m2.rotation.y = Math.PI / 4;
          for (let i = 0; i < 6; i++) { const a = i * 1.05, sp = new T.Sprite(new T.SpriteMaterial({ map: gtex('rgba(255,215,90,1)'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, fog: false })); sp.scale.set(3, 3, 1); sp.position.set(Math.cos(a) * 5.2, 1 + (i % 3) * 3, Math.sin(a) * 5.2); ent.g.add(sp); reg(ent, sp.material, 's'); anims.push(t => { sp.material.opacity = (.5 + .5 * Math.sin(t * 3 + i * 2)) * ent.a; }); }
          break;
        }
        case 'arch': {
          const rd = new T.Mesh(new T.PlaneGeometry(P * .95, 5), own(MB(0x121a3d))); rd.rotation.x = -Math.PI / 2; rd.position.y = .13; ent.g.add(rd);
          [-3.4, 3.4].forEach(z => add(new T.BoxGeometry(1, H, 1), std(col), 0, H / 2, z)); const bm = add(new T.BoxGeometry(2, 2.2, 8.4), std(col), 0, H, 0); edges(bm);
          const cr = [0xff4d6d, 0x4dd2ff, 0xffd166]; cr.forEach((c, i) => { const car = new T.Mesh(new T.BoxGeometry(2.2, .8, 1.1), own(MB(c))); ent.g.add(car); anims.push(t => { const u = ((t * .14 + i / 3) % 1); car.position.set(-P * .45 + u * P * .9, .6, i % 2 ? -1.2 : 1.2); }); });
          break;
        }
      }
      /* floating emoji icon */
      const sp = new T.Sprite(new T.SpriteMaterial({ map: emojiTex(b.icon, false), transparent: true, depthWrite: false, fog: false })); const top = (b.shape === 'hub' ? H + 14 : b.shape === 'mast' ? H + 12 : H + 7); sp.scale.set(8, 8, 1); sp.position.set(0, top, 0); ent.g.add(sp); reg(ent, sp.material, 'k'); ent.icon = sp; ent.top = top;
      anims.push(t => { sp.position.y = top + Math.sin(t * 2 + X * .1) * .8; });
      /* invisible hit box */
      const hb = new T.Mesh(new T.BoxGeometry(s * 13, top + 4, s * 13), new T.MeshBasicMaterial({ visible: false })); hb.position.y = (top + 4) / 2; hb.userData.id = b.id; ent.g.add(hb); hits.push(hb);
    }
    E.LIST.forEach(build);

    /* ---------- filler city (translucent glass towers like the landing page) ---------- */
    const used = new Set(); E.LIST.forEach(b => { const s = b.s || 1; for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) used.add((b.gx + i) + ',' + (b.gy + j)); });
    const fillers = [];
    for (let i = -2; i < CELLS + 2; i++) for (let j = -2; j < CELLS + 2; j++) {
      if (used.has(i + ',' + j)) continue; const inner = i >= 0 && j >= 0 && i < CELLS && j < CELLS, X = wx(i), Z = wx(j);
      for (let a = -1; a <= 1; a += 2) for (let c = -1; c <= 1; c += 2) {
        if (R0() < (inner ? .42 : .6)) continue; const w = rnd(3.4, 4.4), d = rnd(3.4, 4.4), dist = Math.hypot(i - 4.5, j - 4.5), h = rnd(3, 8) + Math.max(0, 6 - dist) * rnd(.4, 1.2);
        const m = new T.Mesh(new T.BoxGeometry(w, h, d), glassMat(0x4a63c8, Math.round(w / 3), Math.round(h / 3), .5)); m.position.set(X + a * 3.4, h / 2, Z + c * 3.4); sc.add(m);
        const e = new T.LineSegments(new T.EdgesGeometry(m.geometry, 30), edgeMat(pick([0x4dd2ff, 0xff6ad5, 0xa78bfa]), .35)); m.add(e); fillers.push(m);
      }
    }
    const dec = []; fillers.forEach(m => { dec.push({ m: m.material, base: m.material.opacity }, { m: m.children[0].material, base: m.children[0].material.opacity }); });

    /* ---------- traffic ---------- */
    const cars = [], NC = 70, cbody = new T.InstancedMesh(new T.BoxGeometry(1.8, .6, .9), MB(0xffffff), NC); cbody.frustumCulled = false; sc.add(cbody);
    for (let i = 0; i < NC; i++) { const ax = i % 2, k = Math.floor(R0() * (CELLS + 1)), dir = R0() < .5 ? 1 : -1; cars.push({ ax, off: (k - CELLS / 2) * P + dir * 1.2, dir, p: rnd(-SPAN / 2, SPAN / 2), v: rnd(6, 11) }); cbody.setColorAt(i, C(pick([0xff4d6d, 0x4dd2ff, 0xffd166, 0xa78bfa, 0x6ee7b7, 0xffffff]))); }
    cbody.instanceColor.needsUpdate = true;
    const stepCars = dt => { cars.forEach((o, i) => { o.p += o.dir * o.v * dt; if (o.p > SPAN / 2) o.p = -SPAN / 2; if (o.p < -SPAN / 2) o.p = SPAN / 2; D.position.set(o.ax ? o.off : o.p, .45, o.ax ? o.p : o.off); D.rotation.set(0, o.ax ? (o.dir > 0 ? -Math.PI / 2 : Math.PI / 2) : (o.dir > 0 ? 0 : Math.PI), 0); D.updateMatrix(); cbody.setMatrixAt(i, D.matrix); }); cbody.instanceMatrix.needsUpdate = true; };
    stepCars(0);

    /* ---------- sky ---------- */
    const stp = []; for (let i = 0; i < 300; i++) { const a = R0() * TAU, e = rnd(.12, 1.1); stp.push(Math.cos(a) * Math.cos(e) * 1100, Math.sin(e) * 1100, Math.sin(a) * Math.cos(e) * 1100); }
    const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.Float32BufferAttribute(stp, 3)); const stars = new T.Points(sg, new T.PointsMaterial({ color: 0xffffff, size: 2, fog: false, transparent: true, opacity: .8, sizeAttenuation: false })); stars.frustumCulled = false; sc.add(stars);

    /* ---------- selection rings ---------- */
    const mkRing = c => { const m = new T.Mesh(new T.RingGeometry(.86, 1, 48), new T.MeshBasicMaterial({ color: c, transparent: true, side: T.DoubleSide, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.y = .25; m.visible = false; sc.add(m); return m; };
    const ringSel = mkRing(0xffffff), ringHov = mkRing(0xffffff), ringRev = mkRing(0x34d399);
    const placeRing = (r, id, k) => { if (!id) { r.visible = false; return; } const e = B[id], s = (e.b.s || 1) * P * .5 * (k || 1); r.position.x = e.X; r.position.z = e.Z; r.scale.setScalar(s); r.material.color.set(E.COLORS[e.b.sec]); r.visible = true; };

    /* ---------- camera ---------- */
    const OV = { az: .8, el: .6, dist: 225 }, view = { az: OV.az, el: OV.el, dist: OV.dist, tx: 0, ty: 6, tz: 0 }, goal = Object.assign({}, view);
    let focusId = null, saved = null, idle = 0, spin = 0;
    const cl = (v, a, b) => Math.max(a, Math.min(b, v));
    const camApi = {
      rot(d) { goal.az += d; idle = 0; }, tilt(d) { goal.el = cl(goal.el + d, .1, 1.35); idle = 0; },
      zoom(k) { goal.dist = cl(goal.dist * k, focusId ? 30 : 70, focusId ? 150 : 340); idle = 0; },
      reset() { api.focus(null); Object.assign(goal, OV, { tx: 0, ty: 6, tz: 0 }); idle = 0; }
    };

    /* ---------- state: filter, visited, fade ---------- */
    const st = { filter: null, visited: new Set() };
    let lastVis = '';
    const refreshIcons = () => { const key = [...st.visited].sort().join(','); if (key === lastVis) return; lastVis = key; E.LIST.forEach(b => { const e = B[b.id], v = st.visited.has(b.id); if (v !== e.vis) { e.vis = v; e.icon.material.map.dispose(); e.icon.material.map = emojiTex(b.icon, v); e.icon.material.needsUpdate = true; } }); };
    const applyFade = dt => {
      const k = 1 - Math.exp(-dt * 6);
      E.LIST.forEach(b => { const e = B[b.id]; e.aT = focusId ? (focusId === b.id ? 1 : .14) : st.filter ? (st.filter === b.sec ? 1 : .2) : 1; e.a += (e.aT - e.a) * k; if (Math.abs(e.aT - e.a) < .004) e.a = e.aT; e.mats.forEach(o => fade(o, e.a)); });
      const dT = focusId ? .22 : st.filter ? .3 : 1; dec.da = (dec.da == null ? 1 : dec.da); dec.da += (dT - dec.da) * k; dec.forEach(o => fade(o, dec.da));
    };

    /* ---------- label (hover / selected name) ---------- */
    const tag = document.createElement('div'); tag.className = 'bm-tag'; tag.hidden = true; host.appendChild(tag);
    let hover = null, tagId = null; const pv = new T.Vector3();
    const place = () => {
      const id = focusId || hover; if (!id || (!focusId && cb.canHover && !cb.canHover())) { tag.hidden = true; return; }
      const e = B[id]; pv.set(e.X, 0, e.Z).project(cam); if (pv.z > 1) { tag.hidden = true; return; }
      if (tagId !== id) { tagId = id; tag.textContent = e.b.n; tag.style.setProperty('--c', E.COLORS[e.b.sec]); }
      tag.hidden = false; const r = host.getBoundingClientRect(); tag.style.transform = 'translate(' + ((pv.x * .5 + .5) * r.width) + 'px,' + ((-pv.y * .5 + .5) * r.height + 14) + 'px) translate(-50%,0)';
    };

    /* ---------- input: drag to orbit, wheel to zoom, click to pick ---------- */
    const rc = new T.Raycaster(), nd = new T.Vector2();
    const pickAt = (cx, cy) => { const r = cv.getBoundingClientRect(); nd.set((cx - r.left) / r.width * 2 - 1, -((cy - r.top) / r.height) * 2 + 1); rc.setFromCamera(nd, cam); const h = rc.intersectObjects(hits, false); return h.length ? h[0].object.userData.id : null; };
    let down = null, moved = 0;
    cv.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY }; moved = 0; try { cv.setPointerCapture(e.pointerId); } catch (x) {} });
    cv.addEventListener('pointermove', e => {
      if (down) { const dx = e.clientX - down.x, dy = e.clientY - down.y; moved += Math.abs(dx) + Math.abs(dy); down.x = e.clientX; down.y = e.clientY; goal.az -= dx * .006; goal.el = cl(goal.el + dy * .005, .1, 1.35); idle = 0; cv.style.cursor = 'grabbing'; return; }
      const id = pickAt(e.clientX, e.clientY); cv.style.cursor = id ? 'pointer' : 'grab'; if (id !== hover) { hover = id; cb.onHover && cb.onHover(id); }
    });
    cv.addEventListener('pointerup', e => { const was = down; down = null; cv.style.cursor = 'grab'; if (was && moved < 6) cb.onPick && cb.onPick(pickAt(e.clientX, e.clientY)); });
    cv.addEventListener('pointerleave', () => { if (hover) { hover = null; cb.onHover && cb.onHover(null); } });
    cv.addEventListener('wheel', e => { e.preventDefault(); camApi.zoom(e.deltaY > 0 ? 1.08 : .93); }, { passive: false });
    cv.style.cursor = 'grab'; cv.style.touchAction = 'none';

    /* ---------- theme ---------- */
    const setMode = d => {
      day = !!d; const bg = day ? 0xbfe0ff : 0x0a0f2c; sc.background.setHex(bg); sc.fog.color.setHex(bg); sc.fog.density = day ? .0026 : .0032;
      amb.color.setHex(day ? 0xffffff : 0x8899cc); amb.intensity = day ? 1.05 : .85; dl.color.setHex(day ? 0xfff1d0 : 0xbbd4ff); dl.intensity = day ? 1.15 : .9;
      mGround.color.copy(day ? mGroundC.d : mGroundC.n); mRoad.color.copy(day ? mRoadC.d : mRoadC.n); mLane.color.copy(day ? mLaneC.d : mLaneC.n); mLane.opacity = day ? .85 : .55; LOT.forEach(o => o.m.color.copy(day ? o.d : o.n));
      GL.forEach(g => { g.m.color.copy(day ? g.d : g.n); g.m.emissiveIntensity = day ? 0 : .85; }); stars.visible = !day;
    };

    /* ---------- loop ---------- */
    let T0 = 0, last = 0, raf = 0, running = false, W = 0, Hh = 0;
    function frame(dt) {
      T0 += dt; anims.forEach(f => f(T0, dt)); stepCars(dt); applyFade(dt);
      idle += dt;
      if (focusId) goal.az += dt * .22; else if (idle > 4) goal.az += dt * .035;
      const k = 1 - Math.exp(-dt * 3.4);
      view.az += (goal.az - view.az) * k; view.el += (goal.el - view.el) * k; view.dist += (goal.dist - view.dist) * k; view.tx += (goal.tx - view.tx) * k; view.ty += (goal.ty - view.ty) * k; view.tz += (goal.tz - view.tz) * k;
      cam.position.set(view.tx + view.dist * Math.cos(view.el) * Math.cos(view.az), Math.max(3, view.ty + view.dist * Math.sin(view.el)), view.tz + view.dist * Math.cos(view.el) * Math.sin(view.az)); cam.lookAt(view.tx, view.ty, view.tz);
      const pu = .6 + .4 * Math.sin(T0 * 6); if (ringSel.visible) { ringSel.material.opacity = pu; } if (ringRev.visible) ringRev.material.opacity = pu; ringHov.material.opacity = .7;
      R.render(sc, cam); place();
    }
    function step(now) { if (!running) return; const dt = last ? Math.min(.05, (now - last) / 1000) : .016; last = now; frame(dt); raf = requestAnimationFrame(step); }
    function resize() { const w = host.clientWidth || 960, h = host.clientHeight || 540; if (w === W && h === Hh) return; W = w; Hh = h; R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); if (!running) frame(0); }

    const api = {
      get running() { return running; }, cam: camApi,
      set(o) { Object.assign(st, o); if (o.visited) refreshIcons(); if (o.filter !== undefined || o.visited) { placeRing(ringHov, null); } if (!running) frame(.016); },
      focus(id) {
        if (id === focusId) return;
        if (id) { if (!focusId) saved = { az: goal.az, el: goal.el, dist: goal.dist }; focusId = id; const e = B[id]; goal.tx = e.X; goal.tz = e.Z; goal.ty = e.H * .5 + 2; goal.el = .5; goal.dist = Math.max(52, e.H * 1.7 + 40); placeRing(ringSel, id, 1.15); }
        else { focusId = null; ringSel.visible = false; Object.assign(goal, saved || OV, { tx: 0, ty: 6, tz: 0 }); saved = null; }
        if (!running) frame(.016);
      },
      reveal(id) { placeRing(ringRev, id, 1.25); if (!running) frame(.016); },
      hoverRing(id) { placeRing(ringHov, id && id !== focusId ? id : null, 1); },
      setTheme: setMode, resize, pos(id) { const e = B[id]; return e ? [e.X, e.Z] : null; },
      start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(step); },
      stop() { running = false; cancelAnimationFrame(raf); }
    };
    setMode(false); resize(); frame(.016);
    return api;
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.bumn = MBALAB.bumn || {}; MBALAB.bumn.Scene = Scene;
})();
