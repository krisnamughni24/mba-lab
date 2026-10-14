/* BUMN Explorer: terrain and infrastructure (sea, shore, mountains, city grid, roads, river, highway, rail, runway, farmland, forest, traffic).
   MBALAB.bumn.world(K) is called once by scene.js with the shared kit. World coordinates: +x east, +z north (towards the mountains), -z the sea. */
(function () {
  window.MBALAB = window.MBALAB || {}; MBALAB.bumn = MBALAB.bumn || {};
  MBALAB.bumn.world = function (K) {
    const { T, sc, E, R0, rnd, pick, C, MB, TAU, anims, dec, inst, ribbon, flat, mbt, theme, glassMat, edgeMat } = K;
    const dc = m => { dec.push({ m, base: m.opacity == null ? 1 : m.opacity }); return m; };
    const std = (n, d, o) => theme(new T.MeshStandardMaterial(Object.assign({ color: n, roughness: .85, metalness: .05 }, o || {})), n, d);
    const strips = (segs, w, m, y) => {
      const pos = [], idx = []; m.side = T.DoubleSide;
      segs.forEach(s => { let dx = s[2] - s[0], dz = s[3] - s[1]; const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l; const nx = -dz * w / 2, nz = dx * w / 2, k = pos.length / 3; pos.push(s[0] + nx, y, s[1] + nz, s[0] - nx, y, s[1] - nz, s[2] + nx, y, s[3] + nz, s[2] - nx, y, s[3] - nz); idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); });
      const g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setIndex(idx); const o = new T.Mesh(g, m); sc.add(o); return o;
    };
    const line = pts => pts.slice(1).map((p, i) => [pts[i][0], pts[i][1], p[0], p[1]]);

    /* ---------- land, sea, shore ---------- */
    flat(3400, 1160, mbt(0x0b1a2c, 0x7d9a62), 0, 0, 440);
    const sc2 = document.createElement('canvas'); sc2.width = sc2.height = 128; const sx = sc2.getContext('2d'); sx.fillStyle = '#2a78c8'; sx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 46; i++) { sx.strokeStyle = 'rgba(160,215,255,' + (.25 + R0() * .4) + ')'; sx.lineWidth = 1.2; const x = R0() * 128, y = R0() * 128, l = 6 + R0() * 14; sx.beginPath(); sx.moveTo(x, y); sx.quadraticCurveTo(x + l / 2, y - 2, x + l, y); sx.stroke(); }
    const seaTex = new T.CanvasTexture(sc2); seaTex.wrapS = seaTex.wrapT = T.RepeatWrapping; seaTex.repeat.set(220, 160);
    const seaM = theme(new T.MeshBasicMaterial({ map: seaTex, color: 0x34507a }), 0x34507a, 0xffffff);
    flat(3400, 2400, seaM, 0, -.6, -1340);
    anims.push(tm => { seaTex.offset.set(tm * .0012, tm * .0007); });
    flat(3400, 12, mbt(0x2a3350, 0xe8d8a8), 0, .08, -134);
    const sk = []; for (let i = 0; i < 1500; i++) { const a = R0() * TAU, e = rnd(.1, 1.2); sk.push(Math.cos(a) * Math.cos(e) * 2200, Math.sin(e) * 2200, Math.sin(a) * Math.cos(e) * 2200); }
    const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.Float32BufferAttribute(sk, 3)); const stars = new T.Points(sg, new T.PointsMaterial({ color: 0xffffff, size: 2, fog: false, transparent: true, opacity: .8, sizeAttenuation: false })); stars.frustumCulled = false; sc.add(stars); K.stars = stars;

    /* ---------- exclusion helper for scattered things ---------- */
    const RIV = [[112, 270], [108, 200], [105, 150], [100, 84], [96, 20], [92, -50], [89, -100], [89, -150]];
    const rivX = z => { for (let i = 0; i < RIV.length - 1; i++) { const a = RIV[i], b = RIV[i + 1]; if (z <= a[1] && z >= b[1]) return a[0] + (b[0] - a[0]) * (a[1] - z) / (a[1] - b[1]); } return z > 270 ? 112 : 89; };
    const circ = E.LIST.map(b => [b.x, b.z, b.r]);
    const free = (x, z, pad) => {
      pad = pad || 0; if (z < -126 || z > 205) return false; if (Math.abs(x) < 84 && Math.abs(z) < 84) return false;
      if (Math.abs(z - 84) < 12 + pad || Math.abs(z + 80) < 8 + pad) return false; if (x > -224 - pad && x < -186 + pad && z > -146 && z < 94) return false;
      if (Math.abs(x - rivX(z)) < 10 + pad) return false; if (Math.abs(x) < 7 && (z > 70 && z < 135 || z < -70 && z > -112)) return false;
      return !circ.some(c => Math.hypot(x - c[0], z - c[1]) < c[2] + 6 + pad);
    };

    /* ---------- mountains (north) with a volcano ---------- */
    const mtM = std(0x1a2447, 0x6d8f5a, { flatShading: true, emissive: 0x0a1030, emissiveIntensity: .45 });
    const mts = []; for (let i = 0; i < 34; i++) { const r = rnd(38, 84), h = rnd(46, 118); mts.push({ x: rnd(-380, 380), y: h / 2 - 1, z: rnd(222, 360), sx: r, sy: h, sz: r, ry: R0() * 3 }); }
    inst(new T.ConeGeometry(1, 1, 7, 1), mtM, mts);
    const vol = new T.Mesh(new T.CylinderGeometry(14, 62, 128, 10), mtM); vol.position.set(255, 63, 290); sc.add(vol);
    const crater = new T.Mesh(new T.CylinderGeometry(13, 13, 1, 12), new T.MeshBasicMaterial({ color: 0xff7a2a })); crater.position.set(255, 127, 290); sc.add(crater);
    const vg = K.glowSprite('rgba(255,130,50,.95)', 60, 255, 135, 290); anims.push(tm => { vg.material.opacity = .55 + .25 * Math.sin(tm * 2); });
    [[260, -430, 44, 20], [-310, -390, 32, 13], [330, -300, 26, 10]].forEach(q => { const m = new T.Mesh(new T.ConeGeometry(q[2], q[3], 7), mtM); m.position.set(q[0], q[3] / 2 - 1, q[1]); sc.add(m); });

    /* ---------- the city: ground pad, grid roads, glass towers ---------- */
    flat(150, 150, mbt(0x101a3a, 0x9aa3b0), 0, .06, 0);
    const mRoad = mbt(0x121a3d, 0x50555f), mLane = mbt(0x3b82f6, 0xffffff, { transparent: true, opacity: .55 });
    const gs = [-63, -45, -27, 27, 45, 63], hs = [], ln = [];
    gs.forEach(p => { hs.push([p, -72, p, 72], [-72, p, 72, p]); ln.push([p, -72, p, 72], [-72, p, 72, p]); });
    [-9, 9].forEach(p => { hs.push([p, 27, p, 72], [p, -72, p, -27], [27, p, 72, p], [-72, p, -27, p]); ln.push([p, 27, p, 72], [p, -72, p, -27], [27, p, 72, p], [-72, p, -27, p]); });
    strips(hs, 5, mRoad, .12); strips(ln, .14, mLane, .24);
    const edges = [0x4dd2ff, 0xff6ad5, 0xa78bfa].map(c => dc(edgeMat(c, .35)));
    const banned = new Set(['-36,-18', '36,-18', '-36,18', '36,18', '0,54', '0,-54']);
    for (let cx = -54; cx <= 54; cx += 18) for (let cz = -54; cz <= 54; cz += 18) {
      if (Math.abs(cx) < 27 && Math.abs(cz) < 27) continue; if (banned.has(cx + ',' + cz)) continue; if (R0() < .1) continue;
      const n = 1 + Math.floor(R0() * 2.4), d = Math.hypot(cx, cz);
      for (let k = 0; k < n; k++) {
        const w = rnd(4, 6.4), dd = rnd(4, 6.4), h = rnd(8, 17) + Math.max(0, 70 - d) * .17, ox = n === 1 ? 0 : (k % 2 ? 4.4 : -4.4), oz = n < 3 ? 0 : (k > 1 ? 4.4 : -4.4);
        const m = new T.Mesh(new T.BoxGeometry(w, h, dd), dc(glassMat(0x4a63c8, Math.round(w / 3), Math.round(h / 3), .5))); m.position.set(cx + ox + rnd(-1, 1), h / 2, cz + oz + rnd(-1, 1)); sc.add(m);
        if (h > 15) m.add(new T.LineSegments(new T.EdgesGeometry(m.geometry, 30), edges[k % 3]));
      }
    }
    /* city traffic */
    const NC = 56, cars = [], cb = inst(new T.BoxGeometry(1.8, .6, .9), new T.MeshBasicMaterial({ color: 0xffffff }), Array.from({ length: NC }, () => ({ x: 0, z: 0, c: pick([0xff4d6d, 0x4dd2ff, 0xffd166, 0xa78bfa, 0x6ee7b7, 0xffffff]) })));
    for (let i = 0; i < NC; i++) { const dir = R0() < .5 ? 1 : -1; cars.push({ ax: i % 2, off: pick(gs) + dir * 1.2, dir, p: rnd(-70, 70), v: rnd(6, 11) }); }
    const stepCars = dt => { const D = K.D; cars.forEach((o, i) => { o.p += o.dir * o.v * dt; if (o.p > 72) o.p = -72; if (o.p < -72) o.p = 72; D.scale.set(1, 1, 1); D.position.set(o.ax ? o.off : o.p, .5, o.ax ? o.p : o.off); D.rotation.set(0, o.ax ? (o.dir > 0 ? -Math.PI / 2 : Math.PI / 2) : (o.dir > 0 ? 0 : Math.PI), 0); D.updateMatrix(); cb.setMatrixAt(i, D.matrix); }); cb.instanceMatrix.needsUpdate = true; };
    stepCars(0); anims.push((tm, dt) => stepCars(dt));

    /* ---------- outer roads ---------- */
    const mRoad2 = mbt(0x141c40, 0x555a64);
    strips([].concat(line([[0, 72], [0, 130]]), line([[0, -72], [0, -100], [60, -100], [60, -112]]), line([[72, 0], [190, 0], [190, 20]]), line([[140, 0], [140, -30]]), line([[-72, 0], [-125, 0], [-125, -40], [-150, -40]]), line([[-98, 0], [-98, -24]]), line([[-125, 0], [-125, 20]])), 5, mRoad2, .11);

    /* ---------- river (flows from the mountains to the sea) ---------- */
    ribbon(RIV, 8, mbt(0x1c4f9a, 0x4aa3e0), .1);

    /* ---------- elevated toll highway along z = 84 ---------- */
    const hz = 84, deckM = std(0x2a3566, 0x8a8f9a, { roughness: .6 });
    const deck = new T.Mesh(new T.BoxGeometry(620, 1.1, 12), deckM); deck.position.set(0, 5.2, hz); sc.add(deck);
    [-6, 6].forEach(z => { const r = new T.Mesh(new T.BoxGeometry(620, .7, .4), std(0x4a5a99, 0xb9c0cc)); r.position.set(0, 6.1, hz + z); sc.add(r); });
    const dash = []; for (let x = -300; x < 300; x += 9) dash.push({ x, y: 5.8, z: hz, sx: 4, sy: .05, sz: .25 });
    inst(new T.BoxGeometry(1, 1, 1), mbt(0xffe9a8, 0xffffff), dash);
    const pil = []; for (let x = -300; x <= 300; x += 30) if (Math.abs(x - 100) > 36 && Math.abs(x + 40) > 12) pil.push({ x, y: 2.3, z: hz, sx: 2.2, sy: 4.6, sz: 2.8 });
    inst(new T.BoxGeometry(1, 1, 1), std(0x39467a, 0x9aa0ac), pil);
    const poles = [], lamps = []; for (let x = -290; x <= 290; x += 36) { poles.push({ x, y: 8.4, z: hz + 6, sx: .3, sy: 5, sz: .3 }); lamps.push({ x, y: 11, z: hz + 5.2, sx: 1.6, sy: .3, sz: .6 }); }
    inst(new T.BoxGeometry(1, 1, 1), std(0x8a94b8, 0x666b76), poles); inst(new T.BoxGeometry(1, 1, 1), MB(0xfff1c2), lamps);
    const HC = 30, hcars = [], hb = inst(new T.BoxGeometry(2.4, .9, 1.2), new T.MeshBasicMaterial({ color: 0xffffff }), Array.from({ length: HC }, () => ({ x: 0, z: 0, c: pick([0xff4d6d, 0x4dd2ff, 0xffd166, 0xa78bfa, 0x6ee7b7, 0xffffff]) })));
    for (let i = 0; i < HC; i++) hcars.push({ dir: i % 2 ? 1 : -1, p: rnd(-300, 300), v: rnd(14, 24), l: i % 3 - 1 });
    const stepH = dt => { const D = K.D; hcars.forEach((o, i) => { o.p += o.dir * o.v * dt; if (o.p > 310) o.p = -310; if (o.p < -310) o.p = 310; D.scale.set(1, 1, 1); D.position.set(o.p, 6.2, hz + o.dir * (1.8 + Math.abs(o.l) * 1.4)); D.rotation.set(0, o.dir > 0 ? 0 : Math.PI, 0); D.updateMatrix(); hb.setMatrixAt(i, D.matrix); }); hb.instanceMatrix.needsUpdate = true; };
    stepH(0); anims.push((tm, dt) => stepH(dt));

    /* ---------- railway along z = -80 ---------- */
    const rz = -80; strips([[-320, rz, 320, rz]], 6, mbt(0x1b2145, 0x8d8d86), .13);
    strips([[-320, rz - 1, 320, rz - 1], [-320, rz + 1, 320, rz + 1]], .35, mbt(0x9aa4c4, 0x444850), .3);
    const sl = []; for (let x = -318; x <= 318; x += 4) sl.push({ x, y: .2, z: rz, sx: .6, sy: .2, sz: 3.4 });
    inst(new T.BoxGeometry(1, 1, 1), mbt(0x2a3156, 0x5e5848), sl);

    /* ---------- airport runway (west) ---------- */
    const rx = -205; strips([[rx, -140, rx, 85]], 16, mbt(0x161c33, 0x3a3f4c), .13);
    const rd = []; for (let z = -132; z < 84; z += 14) rd.push({ x: rx, y: .3, z, sx: .5, sy: .05, sz: 7 });
    inst(new T.BoxGeometry(1, 1, 1), mbt(0xffffff, 0xffffff), rd);
    const rl = []; for (let z = -140; z <= 85; z += 9) { rl.push({ x: rx - 8.8, y: .5, z, sx: .5, sy: .5, sz: .5 }, { x: rx + 8.8, y: .5, z, sx: .5, sy: .5, sz: .5 }); }
    const rlm = new T.MeshBasicMaterial({ color: 0x66ccff }); inst(new T.BoxGeometry(1, 1, 1), rlm, rl); anims.push(tm => { rlm.color.setHex(Math.sin(tm * 3) > -.2 ? 0x66ccff : 0x2a5a80); });
    strips([].concat(line([[rx + 8, -40], [-150, -40]]), line([[rx + 8, 14], [-125, 14]])), 7, mbt(0x161c33, 0x3a3f4c), .13);

    /* ---------- living landscape: villages, towns, plantations, fields, quarries, yards, airport city, fishing coast ---------- */
    const occ = [];
    const put = (x, z, r, pad, hill) => {
      if (!free(x, hill ? Math.min(z, 204) : z, pad == null ? 1 : pad)) return false;
      for (let i = 0; i < occ.length; i++) { const o = occ[i]; if (Math.hypot(x - o[0], z - o[1]) < r + o[2]) return false; }
      occ.push([x, z, r]); return true;
    };
    const L = n => Array.from({ length: n }, () => []);
    const [hw, hr, ap, apr, wh, whr, cont, lots] = L(8), [tk, gcr, pk, pcr, rocks, piles, solar, boats, domes, minas] = L(10), fieldL = L(4), riceL = L(3);
    const HW = [0xffd9a8, 0xf4b6a0, 0xcfd8ff, 0xffe9a8, 0xb8e6c8, 0xffffff, 0xe8c9ff], RF = [0xc0583a, 0xb04a3a, 0x3a5a9a, 0x7a8a9a, 0xc9733a, 0x8a4a3a];
    const APC = [0xcfd8ff, 0xe8c9ff, 0xffd9a8, 0xb8e6c8, 0xf4f7ff, 0xa8c4ff], GRN = [0x2f7d3a, 0x3f9a46, 0x58b04a, 0x2a6e3a];
    const house = (x, z, s, ry) => {
      const w = rnd(3.2, 5) * s, d = rnd(3, 4.4) * s, h = rnd(2.2, 3.2) * s, rh = rnd(1.4, 2.2) * s;
      hw.push({ x, y: h / 2, z, sx: w, sy: h, sz: d, ry, c: pick(HW) }); hr.push({ x, y: h + rh / 2, z, sx: w * 1.18, sy: rh, sz: d * 1.18, ry, c: pick(RF) });
    };
    const garden = (x, z) => { if (!put(x, z, 1.6, 0)) return; const h = rnd(3.5, 5.5); tk.push({ x, y: h * .3, z, sx: .45, sy: h * .6, sz: .45 }); const r = rnd(1.5, 2.5); gcr.push({ x, y: h * .75, z, sx: r, sy: r * .85, sz: r, c: pick(GRN) }); };
    const palm = (x, z, h) => { tk.push({ x, y: h / 2, z, sx: .3, sy: h, sz: .3 }); pcr.push({ x, y: h, z, sx: 3.4, sy: .8, sz: 3.4, ry: R0() * 3 }); };
    const mosque = (x, z) => { hw.push({ x, y: 2.2, z, sx: 7, sy: 4.4, sz: 7, ry: 0, c: 0xffffff }); domes.push({ x, y: 4.4, z, sx: 2.8, sy: 2.8, sz: 2.8 }); minas.push({ x: x + 4.6, y: 4.5, z: z + 4.6, sx: .8, sy: 9, sz: .8 }); };
    const village = (cx, cz, rad, n, mq, hill) => {
      let k = 0, tr = 0;
      if (mq) while (tr++ < 60) { const x = cx + rnd(-rad, rad) * .4, z = cz + rnd(-rad, rad) * .4; if (put(x, z, 7, 1, hill)) { mosque(x, z); break; } }
      tr = 0; while (k < n && tr++ < n * 50) {
        const a = R0() * TAU, r = rad * Math.sqrt(R0()), x = cx + Math.cos(a) * r * 1.25, z = cz + Math.sin(a) * r;
        if (!put(x, z, 4.4, 1, hill)) continue; house(x, z, 1, Math.round(R0() * 4) * 1.5708 + rnd(-.12, .12)); k++;
        if (R0() < .55) garden(x + rnd(-5, 5), z + rnd(-5, 5));
      }
    };
    const town = (cx, cz, nx, nz, dx, dz, hmax) => {
      for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) {
        const x = cx + (i - (nx - 1) / 2) * dx, z = cz + (j - (nz - 1) / 2) * dz; if (R0() < .12 || !put(x, z, dx * .56, 2)) continue;
        const w = rnd(.6, .82) * dx, d = rnd(.6, .82) * dz, h = rnd(7, hmax) * (R0() < .3 ? .55 : 1);
        ap.push({ x, y: h / 2, z, sx: w, sy: h, sz: d, c: pick(APC) }); apr.push({ x, y: h + .3, z, sx: w * 1.05, sy: .6, sz: d * 1.05, c: 0xaab2d0 });
      }
    };
    const scatter = (x0, x1, z0, z1, n, fn) => { let k = 0, tr = 0; while (k < n && tr++ < n * 40) if (fn(rnd(x0, x1), rnd(z0, z1))) k++; };

    /* towns and villages: dense where people live, one mosque in many of them */
    [[-112, 72, 4, 3, 13, 12, 26], [124, 8, 3, 3, 13, 12, 22], [-60, 112, 4, 2, 13, 13, 24], [44, 116, 3, 2, 13, 12, 20], [250, 8, 3, 3, 13, 13, 22], [-272, 36, 3, 3, 13, 13, 20], [-60, -108, 4, 1, 13, 12, 16]].forEach(a => town.apply(null, a));
    [[-125, -102, 26, 34, 1], [128, -78, 24, 30, 0], [-132, 40, 24, 30, 1], [178, 98, 22, 28, 0], [-62, 150, 26, 28, 1], [48, 150, 22, 26, 0], [-232, 98, 30, 40, 1], [-262, 166, 28, 34, 0], [262, 92, 28, 38, 1], [296, 160, 24, 30, 0],
      [-196, -104, 26, 30, 0], [235, -66, 22, 26, 1], [-30, -112, 14, 14, 0], [40, 196, 18, 20, 0, 1], [-40, 198, 16, 18, 1, 1], [-175, 190, 20, 22, 0, 1], [180, 192, 20, 22, 1, 1]].forEach(a => village.apply(null, a));

    /* cities have corners: airport city (hotels, cargo sheds, car parks), Bio Farma campus, port yard, steel park */
    scatter(-200, -112, -78, 46, 30, (x, z) => { if (!put(x, z, 7.5, 2)) return false; if (R0() < .4) { const h = rnd(12, 22); ap.push({ x, y: h / 2, z, sx: rnd(8, 11), sy: h, sz: rnd(8, 10), c: pick([0xa8c4ff, 0xcfd8ff, 0xf4f7ff]) }); apr.push({ x, y: h + .3, z, sx: 11.4, sy: .6, sz: 10.4, c: 0xaab2d0 }); } else if (R0() < .6) wh.push({ x, y: 2.6, z, sx: rnd(10, 15), sy: 5.2, sz: rnd(8, 11), ry: 0, c: 0xb7c0d8 }); else lots.push({ x, y: .14, z, sx: 12, sz: 12 }); return true; });
    scatter(-140, -58, -80, -2, 9, (x, z) => { if (Math.hypot(x + 98, z + 34) < 22 || !put(x, z, 7, 2)) return false; wh.push({ x, y: 3.6, z, sx: rnd(8, 12), sy: rnd(6, 9), sz: rnd(7, 10), ry: 0, c: 0xf4f8ff }); return true; });
    scatter(10, 118, -118, -92, 150, (x, z) => { if (!put(x, z, 4.4, 0)) return false; if (R0() < .1) { wh.push({ x, y: 3, z, sx: rnd(11, 16), sy: 6, sz: 9, ry: 0, c: pick([0xc9d1e6, 0xe0a070, 0x9aa7c7]) }); return true; } const st = 1 + Math.floor(R0() * 3), c = pick([0xff6b6b, 0xffd166, 0x4dd2ff, 0x6ee7b7, 0xa78bfa, 0xff9a3d]); for (let k = 0; k < st; k++) cont.push({ x, y: 1.3 + k * 2.5, z, sx: 6.4, sy: 2.4, sz: 2.5, c }); return true; });
    scatter(104, 250, -122, -62, 26, (x, z) => { if (!put(x, z, 9, 2)) return false; wh.push({ x, y: 4, z, sx: rnd(12, 20), sy: rnd(6, 10), sz: rnd(9, 12), ry: 0, c: pick([0x9aa7c7, 0xc9d1e6, 0xb7c0d8, 0xe0a070]) }); return true; });

    /* quarry, solar farm, mine spoil heaps and worker camps */
    scatter(222, 330, -6, 70, 34, (x, z) => { if (!put(x, z, 6, 2)) return false; const r = rnd(5, 13); rocks.push({ x, y: r * .3, z, sx: r, sy: r * rnd(.5, .9), sz: r, ry: R0() * 3, c: pick([0xd8d4c8, 0xc2bdb0, 0xe6e2d6]) }); return true; });
    for (let x = 206; x < 272; x += 7) for (let z = -88; z < -22; z += 6.4) if (put(x, z, 3.2, 1)) solar.push({ x, y: 1.1, z, sx: 5, sy: .25, sz: 3, rx: -.5 });
    [[0, 152], [-85, 175], [88, 168]].forEach(m => scatter(m[0] - 80, m[0] + 80, m[1] - 60, m[1] + 50, 14, (x, z) => { if (Math.hypot(x - m[0], z - m[1]) < 36 || !put(x, z, 8, 1)) return false; if (R0() < .72) { const r = rnd(6, 14); piles.push({ x, y: r * .3, z, sx: r, sy: r * rnd(.5, .8), sz: r, ry: R0() * 3, c: pick([0xb08a62, 0x9a7a58, 0xc29a70]) }); } else for (let k = 0; k < 3; k++) cont.push({ x: x + (k - 1) * 3, y: 1.3, z, sx: 2.5, sy: 2.4, sz: 6.4, c: pick([0xeaf0ff, 0x6fa8ff, 0xffd166]) }); return true; }));

    /* fields: rice, crops, oil-palm plantation, coconut palms */
    const patch = (x0, x1, z0, z1, lst, step) => { for (let x = x0; x < x1; x += step || 17) for (let z = z0; z < z1; z += step || 17) if (put(x, z, 8.3, 3)) lst[Math.floor(R0() * lst.length)].push({ x, y: .16, z, sx: 14.5, sz: 14.5 }); };
    for (let x = 190; x < 335; x += 7.2) for (let z = 98; z < 160; z += 7.2) { const xx = x + (Math.floor(z / 7.2) % 2) * 3.6; if (put(xx, z, 2.4, 2)) palm(xx, z, rnd(7, 10)); }
    patch(112, 205, 98, 166, riceL); patch(228, 330, 8, 140, riceL); patch(118, 232, -2, 82, fieldL);
    patch(228, 292, 58, 122, riceL); patch(122, 280, 160, 214, riceL); patch(-340, -150, 150, 214, riceL); patch(-130, -20, 190, 214, riceL); patch(-335, -190, 20, 140, riceL); patch(-330, -240, -110, 10, riceL);
    for (let x = -330; x < 330; x += 14) if (R0() < .85) { const z = rnd(-124, -116); if (put(x, z, 2.6, 0)) { palm(x, z, rnd(6, 9)); } }
    for (let x = -300; x < 300; x += 24) { const z = rnd(-124, -118); if (R0() < .6 && put(x, z, 4.4, 0)) house(x, z, .85, rnd(-.2, .2)); }
    for (let i = 0; i < 30; i++) boats.push({ x: rnd(-300, 300), y: .1, z: rnd(-175, -145), sx: 5.5, sy: 1.1, sz: 1.9, ry: rnd(-.4, .4), c: pick([0xffd166, 0xff6b6b, 0x4dd2ff, 0xeaf0ff]) });

    /* trees: lowland forest filling the gaps, plus foothill forest under the mountains */
    const trees = []; let tr = 0; while (trees.length < 420 && tr++ < 6000) { const x = rnd(-340, 340), z = rnd(-126, 205); if (!put(x, z, 2, 1)) continue; const h = rnd(4.5, 8.5); trees.push({ x, y: h / 2, z, sx: rnd(1.5, 2.6), sy: h, sz: rnd(1.5, 2.6) }); }
    tr = 0; let nh = 0; while (nh < 320 && tr++ < 5000) { const x = rnd(-340, 340), z = rnd(205, 258); if (!put(x, z, 2, 1, 1)) continue; const h = rnd(5, 10); trees.push({ x, y: h / 2, z, sx: rnd(1.8, 3), sy: h, sz: rnd(1.8, 3) }); nh++; }

    const bx = new T.BoxGeometry(1, 1, 1), pyr = new T.ConeGeometry(.7071, 1, 4); pyr.rotateY(Math.PI / 4);
    const sp = new T.SphereGeometry(1, 7, 5), cy = new T.CylinderGeometry(1, 1, 1, 6), cn = new T.ConeGeometry(1, 1, 7), pl = new T.PlaneGeometry(1, 1); pl.rotateX(-Math.PI / 2);
    const M = (g, m, a) => { if (a.length) inst(g, dc(m), a); };
    M(new T.ConeGeometry(1, 1, 6), std(0x0e3b3a, 0x3e7c3b, { flatShading: true }), trees);
    M(bx, std(0x8892b8, 0xffffff, { roughness: .8 }), hw); M(pyr, std(0x8a5a5a, 0xffffff, { flatShading: true }), hr);
    M(bx, std(0x7b86b8, 0xffffff), ap); M(bx, std(0x4a5578, 0xaab2d0), apr); M(bx, std(0x59648c, 0xffffff), wh);
    M(bx, std(0x8a94b8, 0xffffff), cont); M(pl, std(0x232a44, 0x7a7f8c), lots);
    M(cy, std(0x4a3a2a, 0x8a6a42), tk); M(sp, std(0x1d5a3a, 0xffffff), gcr); M(sp, std(0x0e4a3a, 0x2f9a4a, { flatShading: true }), pcr);
    M(cn, std(0x4a5266, 0xffffff, { flatShading: true }), rocks); M(cn, std(0x3a2e28, 0xffffff, { flatShading: true }), piles);
    M(bx, std(0x1b3a6e, 0x3a6ec0, { roughness: .35, metalness: .5 }), solar); M(bx, std(0x59648c, 0xffffff), boats);
    M(sp, std(0x2fae6b, 0x2fae6b), domes); M(cy, std(0xdde6ff, 0xffffff), minas);
    const rm = [std(0x0f3b2a, 0x86c24a), std(0x14472f, 0xa7d35f), std(0x0c2f2a, 0x6fae45)], cm = [std(0x4a5a1a, 0xd9c25a), std(0x3a4a22, 0xb5d35a), std(0x4a3a22, 0xb88a5a), std(0x2a5a3a, 0x5fb04a)];
    riceL.forEach((a, i) => M(pl, rm[i], a)); fieldL.forEach((a, i) => M(pl, cm[i], a));

    /* ---------- lighthouse and ships at sea ---------- */
    const lh = new T.Group(); lh.position.set(-150, 0, -132); sc.add(lh);
    const lhM = std(0xdde6ff, 0xffffff); const lt = new T.Mesh(new T.CylinderGeometry(1.6, 2.6, 22, 10), lhM); lt.position.y = 11; lh.add(lt);
    const lr = new T.Mesh(new T.CylinderGeometry(2.1, 2.1, 3, 10), std(0xff4d6d, 0xff4d6d)); lr.position.y = 13; lh.add(lr);
    const lb = K.glowSprite('rgba(255,240,170,1)', 16, 0, 24, 0, lh); anims.push(tm => { lb.material.opacity = Math.max(0, Math.sin(tm * 2.4)) ; });
    const ent = { b: { sec: 'transport' }, g: new T.Group(), mats: [], a: 1, X: 0, Z: 0 }; sc.add(ent.g); const wt = K.tools(ent);
    const sail = (o, path) => { const s = wt.ship(o), ph = R0() * 6; anims.push(tm => { const u = ((tm * path.v / path.len + path.o) % 1 + 1) % 1, x = path.x0 + (path.x1 - path.x0) * u; s.position.set(x, -.2 + Math.sin(tm * 1.3 + ph) * .15, path.z); s.rotation.y = path.x1 > path.x0 ? 0 : Math.PI; s.rotation.z = Math.sin(tm * 1.1 + ph) * .02; }); };
    sail({ L: 46, W: 8, hh: 4, hull: 0x7a2f3a, cont: true, cabH: 7 }, { x0: -420, x1: 420, z: -290, v: 7, len: 840, o: .1 });
    sail({ L: 52, W: 9, hh: 3.4, hull: 0x2b4a7a, funnel: 0xff7a45, deck: 0x6b7a99, cabH: 6 }, { x0: 420, x1: -420, z: -340, v: 6, len: 840, o: .55 });
    sail({ L: 40, W: 7, hh: 3.4, hull: 0x1f3b6b, cont: true }, { x0: -420, x1: 420, z: -390, v: 5, len: 840, o: .8 });
    sail({ L: 12, W: 3.4, hh: 1.4, hull: 0xe8eefc, cab: 0xff6ad5, cabH: 2.4 }, { x0: -230, x1: -90, z: -185, v: 3, len: 280, o: .2 });
    sail({ L: 12, W: 3.4, hh: 1.4, hull: 0xffd166, cab: 0xeaf0ff, cabH: 2.4 }, { x0: 190, x1: 330, z: -205, v: 2.4, len: 280, o: .6 });

    K.onMode = () => { };
  };
})();
