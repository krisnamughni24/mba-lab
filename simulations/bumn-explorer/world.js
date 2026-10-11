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

    /* ---------- forest, houses, rice paddies ---------- */
    const trees = []; let tries = 0; while (trees.length < 380 && tries++ < 4000) { const x = rnd(-340, 340), z = rnd(-126, 205); if (!free(x, z, 3)) continue; const h = rnd(4.5, 8.5); trees.push({ x, y: h / 2, z, sx: rnd(1.5, 2.6), sy: h, sz: rnd(1.5, 2.6) }); }
    const treeM = dc(std(0x0e3b3a, 0x3e7c3b, { flatShading: true })); inst(new T.ConeGeometry(1, 1, 6), treeM, trees);
    const hs2 = []; tries = 0; while (hs2.length < 150 && tries++ < 5000) { const a = R0() * TAU, r = rnd(84, 135), x = Math.cos(a) * r * 1.25, z = Math.sin(a) * r; if (!free(x, z, 1) || z < -100) continue; const s = rnd(3, 5.5); hs2.push({ x, y: s * .4, z, sx: s, sy: s * .8, sz: s * rnd(.9, 1.4), ry: R0() * 1.5, c: pick([0xffd9a8, 0xf4b6a0, 0xcfd8ff, 0xffe9a8, 0xb8e6c8]) }); }
    inst(new T.BoxGeometry(1, 1, 1), dc(std(0x8892b8, 0xb0a090, { roughness: .8 })), hs2);
    const rm = [std(0x0f3b2a, 0x86c24a), std(0x14472f, 0xa7d35f), std(0x0c2f2a, 0x6fae45)].map(dc), rice = [[], [], []];
    const patch = (x0, x1, z0, z1) => { for (let x = x0; x < x1; x += 17) for (let z = z0; z < z1; z += 17) if (free(x, z, 4)) rice[Math.floor(R0() * 3)].push({ x, y: .16, z, sx: 14.5, sz: 14.5 }); };
    patch(228, 292, 58, 122); patch(122, 280, 160, 214); patch(-340, -150, 150, 214); patch(-130, -20, 190, 214);
    const pg = new T.PlaneGeometry(1, 1); pg.rotateX(-Math.PI / 2); rice.forEach((a, i) => { if (a.length) inst(pg, rm[i], a); });

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
