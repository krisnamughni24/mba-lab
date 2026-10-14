/* BUMN Explorer: 3D world (Three.js r128, same engine and look as the landing page city).
   MBALAB.bumn.Scene(host, cb) -> scene | null (null when Three.js or WebGL is unavailable)
   cb = { onPick(id|null), onHover(id|null), canHover() }
   scene = { set({filter, visited}), focus(id|null), reveal(id|null), cam:{rot,tilt,zoom,reset}, setTheme(day), start(), stop(), resize(), pos(id) }
   The terrain lives in world.js, one builder per company in buildings.js; this file holds the shared kit, camera, picking and fading. */
(function () {
  const TAU = Math.PI * 2;
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  function Scene(host, cb) {
    const T = window.THREE, E = MBALAB.bumn;
    if (!T) return null;
    let R; try { R = new T.WebGLRenderer({ antialias: true }); } catch (e) { return null; }
    R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    const cv = R.domElement; cv.className = 'bm-gl'; host.insertBefore(cv, host.firstChild);
    const sc = new T.Scene(), cam = new T.PerspectiveCamera(46, 16 / 9, 2, 2600), D = new T.Object3D();
    sc.fog = new T.FogExp2(0x0a0f2c, .0012); sc.background = new T.Color(0x0a0f2c);
    const amb = new T.AmbientLight(0x8899cc, .85), dl = new T.DirectionalLight(0xbbd4ff, .9); dl.position.set(120, 200, -80); sc.add(amb, dl);
    const R0 = rng(20251), pick = a => a[Math.floor(R0() * a.length)], rnd = (a, b) => a + R0() * (b - a), cl = (v, a, b) => Math.max(a, Math.min(b, v));
    const C = h => new T.Color(h), MB = (c, o) => new T.MeshBasicMaterial(Object.assign({ color: c }, o || {}));
    let day = false;
    const anims = [], THM = [], GL = [], dec = [];

    /* ---------- shared kit ---------- */
    const gtex = c0 => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, c0); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c); };
    const glowTex = {}; const gt = c => glowTex[c] || (glowTex[c] = gtex(c));
    const winBase = [0, 1, 2, 3].map(() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); x.fillStyle = '#000'; x.fillRect(0, 0, 64, 64); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (R0() < .62) { x.fillStyle = pick(['#ffd98a', '#9be7ff', '#ffb3e6', '#ffffff']); x.fillRect(i * 16 + 4, j * 16 + 4, 8, 9); } const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; return t; });
    const glassMat = (hex, rx, ry, nightMul, op) => {
      const t0 = pick(winBase).clone(); t0.needsUpdate = true; t0.repeat.set(Math.max(1, rx), Math.max(1, ry));
      const m = new T.MeshStandardMaterial({ color: 0x2b3f86, transparent: true, opacity: op == null ? .8 : op, metalness: .5, roughness: .25, emissive: 0xffffff, emissiveMap: t0, emissiveIntensity: .85 });
      const col = C(hex); GL.push({ m, n: col.clone().multiplyScalar(nightMul || .42).lerp(C(0x1b2a6b), .35), d: col.clone().lerp(C(0xffffff), .45) }); return m;
    };
    const edgeMat = (hex, op) => new T.LineBasicMaterial({ color: hex, transparent: true, opacity: op == null ? .65 : op });
    const theme = (m, n, d) => { THM.push({ m, n: C(n), d: C(d) }); m.color.copy(day ? THM[THM.length - 1].d : THM[THM.length - 1].n); return m; };
    const mbt = (n, d, o) => theme(MB(n, o), n, d);
    const flat = (w, h, m, x, y, z) => { const o = new T.Mesh(new T.PlaneGeometry(w, h), m); o.rotation.x = -Math.PI / 2; o.position.set(x, y, z); sc.add(o); return o; };
    const ribbon = (pts, w, m, y) => {
      const pos = [], idx = []; m.side = T.DoubleSide;
      pts.forEach((p, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]; let dx = b[0] - a[0], dz = b[1] - a[1]; const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l; const nx = -dz * w / 2, nz = dx * w / 2; pos.push(p[0] + nx, y, p[1] + nz, p[0] - nx, y, p[1] - nz); if (i) { const k = (i - 1) * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); } });
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); const o = new T.Mesh(g, m); sc.add(o); return o;
    };
    const inst = (geo, mat, items, par) => {
      const m = new T.InstancedMesh(geo, mat, items.length);
      items.forEach((o, i) => { D.position.set(o.x, o.y || 0, o.z); D.rotation.set(o.rx || 0, o.ry || 0, o.rz || 0); D.scale.set(o.sx == null ? 1 : o.sx, o.sy == null ? 1 : o.sy, o.sz == null ? 1 : o.sz); D.updateMatrix(); m.setMatrixAt(i, D.matrix); if (o.c != null) m.setColorAt(i, C(o.c)); });
      m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; m.frustumCulled = false; (par || sc).add(m); return m;
    };
    const glowSprite = (c, size, x, y, z, par) => { const sp = new T.Sprite(new T.SpriteMaterial({ map: gt(c), blending: T.AdditiveBlending, depthWrite: false, transparent: true, fog: false })); sp.scale.set(size, size, 1); sp.position.set(x, y, z); (par || sc).add(sp); return sp; };
    const emojiTex = (emoji, visited) => {
      const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
      x.font = '84px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(emoji, 64, 70);
      if (visited) { x.fillStyle = '#34d399'; x.beginPath(); x.arc(104, 24, 18, 0, TAU); x.fill(); x.strokeStyle = '#06041a'; x.lineWidth = 5; x.lineCap = 'round'; x.beginPath(); x.moveTo(95, 24); x.lineTo(102, 31); x.lineTo(114, 17); x.stroke(); }
      return new T.CanvasTexture(c);
    };
    /* a ship hull from a top-view outline (bow towards +x) */
    const hullGeo = (L, W, hh, bow) => { const s = new T.Shape(); s.moveTo(-L / 2, -W / 2); s.lineTo(L / 2 - bow, -W / 2); s.lineTo(L / 2, 0); s.lineTo(L / 2 - bow, W / 2); s.lineTo(-L / 2, W / 2); s.closePath(); const g = new T.ExtrudeGeometry(s, { depth: hh, bevelEnabled: false }); g.rotateX(-Math.PI / 2); return g; };
    const K = { T, sc, E, D, R0, pick, rnd, cl, C, MB, TAU, anims, dec, gt, gtex, glassMat, edgeMat, theme, mbt, flat, ribbon, inst, glowSprite, hullGeo, GL, isDay: () => day };

    /* ---------- building registry + fading ---------- */
    const B = {}, hits = [];
    const reg = (ent, m, f) => { if (!ent.mats.some(o => o.m === m)) ent.mats.push({ m, base: m.opacity == null ? 1 : m.opacity, keep: !!f, self: f === 's' }); return m; };
    const fade = (o, a) => { if (o.keep) { if (!o.self) o.m.opacity = o.base * a; return; } const tr = a < .999 || o.base < 1; if (o.m.transparent !== tr) { o.m.transparent = tr; o.m.needsUpdate = true; } o.m.opacity = o.base * a; };

    /* per-company toolbox: every material goes through reg() so the company fades as one */
    const tools = ent => {
      const mc = {}, g = ent.g, col = E.COLORS[ent.b.sec], t = { g, ent, b: ent.b, col, K, T, X: ent.X, Z: ent.Z, anims };
      t.std = (c, o) => { const k = 's' + c + (o ? JSON.stringify(o) : ''); return mc[k] || (mc[k] = reg(ent, new T.MeshStandardMaterial(Object.assign({ color: c, roughness: .65, metalness: .2, emissive: c, emissiveIntensity: .16 }, o || {})))); };
      t.bas = (c, o) => { const k = 'b' + c + (o ? JSON.stringify(o) : ''); return mc[k] || (mc[k] = reg(ent, MB(c, o), o && o.transparent ? 'k' : 0)); };
      t.add = (geo, m, x, y, z, par) => { const o = new T.Mesh(geo, m); o.position.set(x || 0, y || 0, z || 0); (par || g).add(o); return o; };
      t.box = (w, h, d, x, y, z, c, par) => t.add(new T.BoxGeometry(w, h, d), t.std(c == null ? 0x39467a : c), x, (y || 0) + h / 2, z, par);
      t.bbox = (w, h, d, x, y, z, c, par) => t.add(new T.BoxGeometry(w, h, d), t.bas(c), x, (y || 0) + h / 2, z, par);
      t.cyl = (rt, rb, h, x, y, z, c, seg, par) => t.add(new T.CylinderGeometry(rt, rb, h, seg || 14), t.std(c), x, (y || 0) + h / 2, z, par);
      t.sph = (r, x, y, z, c, par) => t.add(new T.SphereGeometry(r, 14, 10), t.std(c), x, y, z, par);
      t.edges = (mesh, hex) => { const e = new T.LineSegments(new T.EdgesGeometry(mesh.geometry, 30), reg(ent, edgeMat(hex || col))); mesh.add(e); return e; };
      t.glass = (w, h, d, x, y, z, hex, par) => { const m = t.add(new T.BoxGeometry(w, h, d), reg(ent, glassMat(hex || col, Math.max(1, Math.round(w / 3)), Math.max(1, Math.round(h / 3)))), x, (y || 0) + h / 2, z, par); t.edges(m, hex); return m; };
      t.grp = (x, y, z, par) => { const o = new T.Group(); o.position.set(x || 0, y || 0, z || 0); (par || g).add(o); return o; };
      t.inst = (geo, m, items, par) => inst(geo, m, items, par || g);
      t.anim = f => anims.push(f);
      t.glow = (c, size, x, y, z, pulse, par) => {
        const sp = glowSprite(c, size, x, y, z, par || g); reg(ent, sp.material, pulse ? 's' : 'k'); const ph = Math.random() * 6;
        if (pulse) anims.push(tm => { sp.material.opacity = (.55 + .4 * Math.sin(tm * pulse + ph)) * ent.a; }); return sp;
      };
      t.sprite = (c, size, x, y, z, par) => { const sp = glowSprite(c, size, x, y, z, par || g); reg(ent, sp.material, 's'); return sp; };
      t.blink = (x, y, z, c) => { const sp = t.glow(c || 'rgba(255,60,80,1)', 4, x, y, z); anims.push(tm => { sp.visible = Math.sin(tm * 5 + ent.X) > 0; }); return sp; };
      t.smoke = (x, y, z, sz, par) => { const mp = gt('rgba(235,235,245,.9)'), arr = []; for (let i = 0; i < 5; i++) { const sp = new T.Sprite(new T.SpriteMaterial({ map: mp, transparent: true, depthWrite: false, opacity: 0 })); (par || g).add(sp); arr.push(sp); reg(ent, sp.material, 's'); } const s = sz || 1; anims.push(tm => arr.forEach((sp, i) => { const u = ((tm * .22 + i / 5) % 1); sp.position.set(x + u * 4 * s, y + u * 14 * s, z); sp.scale.setScalar((2 + u * 6) * s); sp.material.opacity = (1 - u) * .42 * ent.a; })); };
      t.ring = (r0, y, c, par, self) => { const m = new T.Mesh(new T.RingGeometry(r0 * .94, r0, 40), reg(ent, MB(c, { transparent: true, opacity: .8, side: T.DoubleSide }), self ? 's' : 'k')); m.rotation.x = -Math.PI / 2; m.position.y = y; (par || g).add(m); return m; };
      t.beam = (x1, y1, z1, x2, y2, z2, w, c, par) => { const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1, L = Math.hypot(dx, dy, dz) || 1, m = new T.Mesh(new T.BoxGeometry(w, w, L), t.std(c)); m.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2); m.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), new T.Vector3(dx / L, dy / L, dz / L)); (par || g).add(m); return m; };
      t.lines = (pts, hex, op) => { const ge = new T.BufferGeometry(); ge.setAttribute('position', new T.Float32BufferAttribute(pts, 3)); const l = new T.LineSegments(ge, reg(ent, edgeMat(hex, op == null ? .85 : op))); g.add(l); return l; };
      t.ship = (o, par) => { const s = ship(t, o); (par || g).add(s); return s; };
      t.plane = (o, par) => { const s = plane(t, o); (par || g).add(s); return s; };
      return t;
    };

    /* ships and aircraft share one model each (materials supplied by the owner's toolbox) */
    function ship(t, o) {
      const L = o.L || 30, W = o.W || 7, hh = o.hh || 3, G = new T.Group();
      t.add(hullGeo(L, W, hh, W * .9), t.std(o.hull || 0x2b3350), 0, 0, 0, G);
      if (o.stripe) t.add(hullGeo(L * .98, W * 1.02, .5, W * .9), t.std(o.stripe), 0, hh * .55, 0, G);
      t.box(L * .8, .3, W * .8, -L * .04, hh, 0, o.deck || 0x4a5578, G);
      if (o.cont) { const its = [], cc = [0xff6b6b, 0xffd166, 0x4dd2ff, 0x6ee7b7, 0xa78bfa, 0xff9a3d]; const n = Math.floor(L * .72 / 3.2); for (let i = 0; i < n; i++) for (let j = 0; j < 3; j++) { const hgt = 1 + (i + j) % 3 > 1 ? 2 : 1; for (let k = 0; k < hgt; k++) its.push({ x: -L * .38 + i * 3.2 + L * .02, y: hh + .3 + k * 1.2, z: (j - 1) * 2.2, c: cc[(i * 3 + j + k) % 6] }); } t.inst(new T.BoxGeometry(3, 1.1, 2), new T.MeshBasicMaterial({ color: 0xffffff }), its, G); reg(t.ent, G.children[G.children.length - 1].material); }
      const cab = o.cabin == null ? .38 : o.cabin; t.box(L * .13, o.cabH || 5, W * .8, -L * .36, hh, 0, o.cab || 0xe8eefc, G);
      t.add(new T.BoxGeometry(L * .13 + .05, .7, W * .8 + .05), t.bas(0xffe9a8), -L * .36, hh + (o.cabH || 5) * .6, 0, G);
      if (o.funnel) t.cyl(1.2, 1.5, 4, -L * .22, hh, 0, o.funnel, 10, G);
      if (o.decks) for (let i = 0; i < o.decks; i++) { t.box(L * (.7 - i * .1), 1.6, W * .78, -L * .02 - i * L * .02, hh + .3 + i * 1.8, 0, 0xf4f7ff, G); t.add(new T.BoxGeometry(L * (.7 - i * .1) + .1, .55, W * .78 + .1), t.bas(0xffe9a8), -L * .02 - i * L * .02, hh + 1 + i * 1.8, 0, G); }
      const red = glowSprite('rgba(255,70,70,1)', 3, L * .46, hh + 1, -W * .3, G), grn = glowSprite('rgba(70,255,140,1)', 3, L * .46, hh + 1, W * .3, G); reg(t.ent, red.material, 'k'); reg(t.ent, grn.material, 'k');
      return G;
    }
    function plane(t, o) {
      const s = o.s || 1, G = new T.Group(), w = t.std(o.body || 0xeef3ff);
      const fu = t.add(new T.CylinderGeometry(.8, .6, 9, 10), w, 0, 0, 0, G); fu.rotation.z = Math.PI / 2;
      const nose = t.add(new T.ConeGeometry(.8, 2, 10), w, 4.9, 0, 0, G); nose.rotation.z = -Math.PI / 2;
      t.add(new T.BoxGeometry(2.2, .18, 10), t.std(o.wing || 0xdde6ff), .4, -.2, 0, G);
      t.add(new T.BoxGeometry(1.1, 1.8, .15), t.std(o.tail || 0x1fb5a8), -4, 1.3, 0, G).rotation.z = -.35;
      t.add(new T.BoxGeometry(.9, .14, 3.6), w, -4, .3, 0, G);
      [-2.4, 2.4].forEach(z => { const en = t.add(new T.CylinderGeometry(.3, .3, 1.4, 8), t.std(0x8a94b8), .6, -.65, z, G); en.rotation.z = Math.PI / 2; });
      G.scale.setScalar(s); return G;
    }
    K.tools = tools;

    /* ---------- the world, then the companies ---------- */
    E.world(K);
    const lotRing = (ent, b) => { const col = E.COLORS[b.sec], m = new T.Mesh(new T.RingGeometry(b.r * .965, b.r, 56), reg(ent, MB(col, { transparent: true, opacity: .55, side: T.DoubleSide, depthWrite: false }), 'k')); m.rotation.x = -Math.PI / 2; m.position.y = .5; ent.g.add(m); };
    E.LIST.forEach(b => {
      const ent = { b, g: new T.Group(), mats: [], a: 1, aT: 1, X: b.x, Z: b.z, H: b.h, vis: false }; ent.g.position.set(b.x, 0, b.z); sc.add(ent.g); B[b.id] = ent;
      const t = tools(ent); lotRing(ent, b);
      const f = E.builders[b.id]; if (f) f(t, b);
      const big = b.id === 'danantara', TOP = { pelindo: 24, pelni: 17, pal: 28, kai: 11, garuda: 15, injourney: 22, bulog: 17, ptpn: 15, jasamarga: 22, biofarma: 19, bukitasam: 20, antam: 40, pertamina: 32, pos: 44 }, top = TOP[b.id] != null ? TOP[b.id] : b.h + (big ? 14 : 9);
      const sp = new T.Sprite(new T.SpriteMaterial({ map: emojiTex(b.icon, false), transparent: true, depthWrite: false, fog: false })); const sz = 8 + b.r * .22; sp.scale.set(sz, sz, 1); sp.position.set(0, top, 0); ent.g.add(sp); reg(ent, sp.material, 'k'); ent.icon = sp; ent.top = top;
      anims.push(tm => { sp.position.y = top + Math.sin(tm * 2 + b.x * .1) * .9; });
      const hb = new T.Mesh(new T.BoxGeometry(b.r * 2, top + 4, b.r * 2), new T.MeshBasicMaterial({ visible: false })); hb.position.y = (top + 4) / 2; hb.userData.id = b.id; ent.g.add(hb); hits.push(hb);
    });

    /* ---------- selection rings ---------- */
    const mkRing = c => { const m = new T.Mesh(new T.RingGeometry(.9, 1, 56), new T.MeshBasicMaterial({ color: c, transparent: true, side: T.DoubleSide, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.y = .8; m.visible = false; sc.add(m); return m; };
    const ringSel = mkRing(0xffffff), ringHov = mkRing(0xffffff), ringRev = mkRing(0x34d399);
    const placeRing = (r, id, k) => { if (!id) { r.visible = false; return; } const e = B[id]; r.position.x = e.X; r.position.z = e.Z; r.scale.setScalar(e.b.r * (k || 1)); r.material.color.set(E.COLORS[e.b.sec]); r.visible = true; };

    /* ---------- camera ---------- */
    const OV = { az: -1.15, el: .52, dist: 360, tx: 0, ty: 8, tz: 10 }, view = Object.assign({}, OV), goal = Object.assign({}, OV);
    let focusId = null, saved = null, idle = 0;
    const camApi = {
      rot(d) { goal.az += d; idle = 0; }, tilt(d) { goal.el = cl(goal.el + d, .08, 1.4); idle = 0; },
      zoom(k) { goal.dist = cl(goal.dist * k, focusId ? 35 : 90, focusId ? 260 : 900); idle = 0; },
      reset() { api.focus(null); Object.assign(goal, OV); idle = 0; }
    };

    /* ---------- state: filter, visited, fade ---------- */
    const st = { filter: null, visited: new Set() };
    let lastVis = '';
    const refreshIcons = () => { const key = [...st.visited].sort().join(','); if (key === lastVis) return; lastVis = key; E.LIST.forEach(b => { const e = B[b.id], v = st.visited.has(b.id); if (v !== e.vis) { e.vis = v; e.icon.material.map.dispose(); e.icon.material.map = emojiTex(b.icon, v); e.icon.material.needsUpdate = true; } }); };
    let da = 1;
    const applyFade = dt => {
      const k = 1 - Math.exp(-dt * 6);
      E.LIST.forEach(b => { const e = B[b.id]; e.aT = focusId ? (focusId === b.id ? 1 : .14) : st.filter ? (st.filter === b.sec ? 1 : .2) : 1; e.a += (e.aT - e.a) * k; if (Math.abs(e.aT - e.a) < .004) e.a = e.aT; e.mats.forEach(o => fade(o, e.a)); });
      const dT = focusId ? .25 : st.filter ? .35 : 1; da += (dT - da) * k; if (Math.abs(dT - da) < .004) da = dT; dec.forEach(o => fade(o, da));
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

    /* ---------- input: map-style gestures ----------
       mouse : drag = pan, right-drag (or Ctrl/Shift + drag) = rotate and tilt, wheel = zoom to cursor, double-click = zoom in
       touch : one finger = pan, two fingers = pinch zoom + twist rotate + vertical drag tilt, tap = pick
       keys  : arrows pan, Shift + arrows rotate/tilt, + / - zoom
       While a company is focused, a single drag orbits it instead of panning. */
    const rc = new T.Raycaster(), nd = new T.Vector2(), gp = new T.Plane(new T.Vector3(0, 1, 0), 0), gv = new T.Vector3();
    const ndc = (cx, cy) => { const r = cv.getBoundingClientRect(); nd.set((cx - r.left) / r.width * 2 - 1, -((cy - r.top) / r.height) * 2 + 1); return r; };
    const pickAt = (cx, cy) => { ndc(cx, cy); rc.setFromCamera(nd, cam); const h = rc.intersectObjects(hits, false); return h.length ? h[0].object.userData.id : null; };
    const groundAt = (cx, cy) => { ndc(cx, cy); rc.setFromCamera(nd, cam); return rc.ray.intersectPlane(gp, gv) ? gv : null; };
    const LIM = { x: 330, z: 300 };
    const clampT = () => { goal.tx = cl(goal.tx, -LIM.x, LIM.x); goal.tz = cl(goal.tz, -LIM.z, LIM.z); };
    const panBy = (dx, dy) => {
      const h = cv.clientHeight || 1, u = .85 * goal.dist * fitK / h, s = Math.sin(goal.az), c = Math.cos(goal.az), fz = u / Math.max(.35, Math.sin(goal.el));
      goal.tx += -s * dx * u + (-c) * dy * fz; goal.tz += c * dx * u + (-s) * dy * fz; clampT(); idle = 0;
    };
    const zoomAt = (k, cx, cy) => {
      const d0 = goal.dist; camApi.zoom(k); const real = goal.dist / d0;
      if (!focusId && cx != null && real !== 1) { const p = groundAt(cx, cy); if (p) { goal.tx += (p.x - goal.tx) * (1 - real); goal.tz += (p.z - goal.tz) * (1 - real); clampT(); } }
    };
    const ptr = new Map(); let moved = 0, gest = null, dragging = false;
    const two = () => { const a = [...ptr.values()]; return { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2, d: Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y) || 1, a: Math.atan2(a[1].y - a[0].y, a[1].x - a[0].x) }; };
    cv.addEventListener('contextmenu', e => e.preventDefault());
    cv.addEventListener('pointerdown', e => {
      ptr.set(e.pointerId, { x: e.clientX, y: e.clientY, t: e.pointerType, b: e.button, mod: e.ctrlKey || e.shiftKey || e.button === 2 });
      try { cv.setPointerCapture(e.pointerId); } catch (x) {}
      if (ptr.size === 1) moved = 0; else { moved = 99; gest = two(); } dragging = true; cv.focus && cv.focus({ preventScroll: true });
    });
    cv.addEventListener('pointermove', e => {
      const p = ptr.get(e.pointerId);
      if (!p) { if (e.pointerType === 'mouse') { const id = pickAt(e.clientX, e.clientY); cv.style.cursor = id ? 'pointer' : 'grab'; if (id !== hover) { hover = id; cb.onHover && cb.onHover(id); } } return; }
      const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; moved += Math.abs(dx) + Math.abs(dy); idle = 0;
      if (ptr.size >= 2) {
        const g = two(); if (gest) { zoomAt(gest.d / g.d, g.x, g.y); let da = g.a - gest.a; if (da > Math.PI) da -= TAU; if (da < -Math.PI) da += TAU; goal.az -= da; goal.el = cl(goal.el - (g.y - gest.y) * .005, .08, 1.4); } gest = g; return;
      }
      if (moved < 4) return; cv.style.cursor = 'grabbing';
      if (focusId || p.mod) { goal.az -= dx * .006; goal.el = cl(goal.el + dy * .005, .08, 1.4); } else panBy(dx, dy);
    });
    const up = e => {
      const p = ptr.get(e.pointerId); if (!p) return; ptr.delete(e.pointerId); gest = null; if (ptr.size === 1) { moved = 99; } dragging = ptr.size > 0; cv.style.cursor = 'grab';
      if (e.type === 'pointerup' && moved < 6 && p.b !== 2 && !p.mod) cb.onPick && cb.onPick(pickAt(e.clientX, e.clientY));
    };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && hover) { hover = null; cb.onHover && cb.onHover(null); } });
    cv.addEventListener('wheel', e => { e.preventDefault(); const k = Math.exp(Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 120) * (e.ctrlKey ? .012 : .0016)); zoomAt(k, e.clientX, e.clientY); }, { passive: false });
    cv.addEventListener('dblclick', e => { if (!pickAt(e.clientX, e.clientY)) zoomAt(.55, e.clientX, e.clientY); });
    cv.tabIndex = 0; cv.style.outline = 'none';
    cv.addEventListener('keydown', e => {
      const st = 40 * goal.dist / 360; let h = true;
      if (e.key === '+' || e.key === '=') zoomAt(.85); else if (e.key === '-' || e.key === '_') zoomAt(1.18);
      else if (e.shiftKey && e.key === 'ArrowLeft') camApi.rot(.12); else if (e.shiftKey && e.key === 'ArrowRight') camApi.rot(-.12); else if (e.shiftKey && e.key === 'ArrowUp') camApi.tilt(.08); else if (e.shiftKey && e.key === 'ArrowDown') camApi.tilt(-.08);
      else if (e.key === 'ArrowLeft') panBy(st / (.85 * goal.dist * fitK / (cv.clientHeight || 1)) * -1, 0); else if (e.key === 'ArrowRight') panBy(st / (.85 * goal.dist * fitK / (cv.clientHeight || 1)), 0);
      else if (e.key === 'ArrowUp') panBy(0, st / (.85 * goal.dist * fitK / (cv.clientHeight || 1))); else if (e.key === 'ArrowDown') panBy(0, -st / (.85 * goal.dist * fitK / (cv.clientHeight || 1)));
      else h = false; if (h) e.preventDefault();
    });
    cv.style.cursor = 'grab'; cv.style.touchAction = 'none';

    /* ---------- theme ---------- */
    const setMode = d => {
      day = !!d; const bg = day ? 0xbfe0ff : 0x0a0f2c; sc.background.setHex(bg); sc.fog.color.setHex(bg); sc.fog.density = day ? .001 : .0012;
      amb.color.setHex(day ? 0xffffff : 0x8899cc); amb.intensity = day ? 1.05 : .85; dl.color.setHex(day ? 0xfff1d0 : 0xbbd4ff); dl.intensity = day ? 1.15 : .9;
      THM.forEach(o => o.m.color.copy(day ? o.d : o.n)); GL.forEach(g => { g.m.color.copy(day ? g.d : g.n); g.m.emissiveIntensity = day ? 0 : .85; });
      if (K.stars) K.stars.visible = !day; if (K.onMode) K.onMode(day);
    };

    /* ---------- loop ---------- */
    const vo = { x: 0, y: 0, on: false }; let fitK = 1;
    let T0 = 0, last = 0, raf = 0, running = false, W = 0, Hh = 0;
    function frame(dt) {
      T0 += dt; anims.forEach(f => f(T0, dt)); applyFade(dt);
      idle += dt;
      if (focusId) goal.az += dt * .22; else if (idle > 4) goal.az += dt * .03;
      const k = 1 - Math.exp(-dt * (dragging ? 14 : 3.4));
      ['az', 'el', 'dist', 'tx', 'ty', 'tz'].forEach(n => { view[n] += (goal[n] - view[n]) * k; });
      cam.position.set(view.tx + view.dist * fitK * Math.cos(view.el) * Math.cos(view.az), Math.max(4, view.ty + view.dist * fitK * Math.sin(view.el)), view.tz + view.dist * fitK * Math.cos(view.el) * Math.sin(view.az)); cam.lookAt(view.tx, view.ty, view.tz);
      const sd = W >= 760, wx = focusId && sd ? -W * .13 : 0, wy = focusId ? (sd ? Hh * .04 : Hh * .17) : 0; vo.x += (wx - vo.x) * k; vo.y += (wy - vo.y) * k;
      if (Math.abs(vo.x) > .4 || Math.abs(vo.y) > .4) { cam.setViewOffset(W, Hh, vo.x, vo.y, W, Hh); vo.on = true; } else if (vo.on) { cam.clearViewOffset(); vo.on = false; }
      const pu = .6 + .4 * Math.sin(T0 * 6); if (ringSel.visible) ringSel.material.opacity = pu; if (ringRev.visible) ringRev.material.opacity = pu; ringHov.material.opacity = .7;
      R.render(sc, cam); place();
    }
    function step(now) { if (!running) return; const dt = last ? Math.min(.05, (now - last) / 1000) : .016; last = now; frame(dt); raf = requestAnimationFrame(step); }
    function resize() { const w = host.clientWidth || 960, h = host.clientHeight || 540; if (w === W && h === Hh) return; W = w; Hh = h; R.setSize(w, h, false); cam.aspect = w / h; fitK = cam.aspect < 1.4 ? Math.min(2.1, 1.4 / cam.aspect) : 1; cam.updateProjectionMatrix(); if (!running) frame(0); }

    const api = {
      get running() { return running; }, cam: camApi,
      set(o) { Object.assign(st, o); if (o.visited) refreshIcons(); if (o.filter !== undefined || o.visited) placeRing(ringHov, null); if (!running) frame(.016); },
      focus(id) {
        if (id === focusId) return;
        if (id) { if (!focusId) saved = { az: goal.az, el: goal.el, dist: goal.dist, tx: goal.tx, ty: goal.ty, tz: goal.tz }; focusId = id; const e = B[id]; goal.tx = e.X; goal.tz = e.Z; goal.ty = e.H * .35 + 2; goal.el = .5; goal.dist = Math.max(70, e.H * 1.5 + e.b.r * 2.4 + 30); placeRing(ringSel, id, 1.08); }
        else { focusId = null; ringSel.visible = false; Object.assign(goal, saved || { tx: OV.tx, ty: OV.ty, tz: OV.tz }); saved = null; }
        if (!running) frame(.016);
      },
      reveal(id) { placeRing(ringRev, id, 1.15); if (!running) frame(.016); },
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
