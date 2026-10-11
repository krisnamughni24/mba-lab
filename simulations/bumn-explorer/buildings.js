/* BUMN Explorer: one 3D builder per company. MBALAB.bumn.builders[id](t, b), where t is the toolbox from scene.js
   (std/bas materials, box/cyl/glass/beam helpers, glow/smoke/ring/ship/plane, anim) and coordinates are local to the company's site.
   Every material is registered through t, so a whole site fades together when another company is selected. */
(function () {
  window.MBALAB = window.MBALAB || {}; MBALAB.bumn = MBALAB.bumn || {};
  const B = MBALAB.bumn.builders = {};
  const PI = Math.PI;

  /* ---- shared little parts ---- */
  const dishes = (t, x, y, z, n, c) => { for (let i = 0; i < n; i++) { const d = t.add(new t.T.ConeGeometry(1.5, 1.1, 14, 1, true), t.std(c || 0xdde6ff, { side: t.T.DoubleSide }), x + Math.cos(i * 2.1) * 1.6, y + i * 2.2, z + Math.sin(i * 2.1) * 1.6); d.rotation.set(PI / 2, 0, i * 2.1 + 1); } };
  const gantry = (t, x, z, o) => {            /* portal crane with a moving trolley; boom runs along z */
    const w = o.w || 10, h = o.h || 14, c = o.c || t.col, boom = o.boom || 26, bz = o.dz || -1;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => t.box(.8, h, .8, x + q[0] * w / 2, 0, z + q[1] * 3.2, c));
    t.box(w + 1, 1, 8, x, h, z, c); t.box(1.2, 1, boom, x, h, z + bz * boom * .32, c);
    const tr = t.grp(x, h, z); const hook = t.bbox(1.4, .8, 1.4, 0, -4, 0, 0xffd166, tr); t.bbox(.1, 4, .1, 0, -4, 0, 0xffffff, tr); const ct = t.bbox(3, 1.3, 1.5, 0, -5.4, 0, pick(o.cc), tr);
    const a = bz * boom * .32, z0 = o.z0 == null ? bz * 4 : o.z0; const ph = Math.random() * 6; t.anim(tm => { tr.position.z = z + z0 + (Math.sin(tm * .45 + ph) * .5 + .5) * (o.run || 16) * bz; ct.position.y = -5.4 + Math.sin(tm * .9 + ph) * .8; });
    return tr;
  };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const chimney = (t, x, z, h, c, smk) => { t.cyl(.9, 1.4, h, x, 0, z, 0xaab6d8, 12); t.cyl(1, 1, .6, x, h - .3, z, c, 12); if (smk !== false) t.smoke(x, h + .4, z, 1); };
  const palm = (t, x, z) => { t.cyl(.25, .4, 5, x, 0, z, 0x8a6a3a, 6); };
  const loop = (t, mesh, r, sp, cy, cx, cz, y) => { t.anim(tm => { const a = tm * sp + (cx || 0); mesh.position.set((cx || 0) + Math.cos(a) * r, y, (cz || 0) + Math.sin(a) * r); mesh.rotation.y = -a - PI / 2; }); };
  const truck = (t, c, par) => { const g = t.grp(0, 0, 0, par); t.bbox(3.2, 1.3, 1.6, 0, .5, 0, c, g); t.bbox(1.2, 1.5, 1.6, 1.8, .5, 0, 0xeaf0ff, g); return g; };

  /* ============ DANANTARA: the gold hub at the centre ============ */
  B.danantara = (t, b) => {
    const H = b.h; t.cyl(17, 17.6, .5, 0, 0, 0, 0x5a4a22, 56); t.ring(16, .55, 0xffc857);
    [[13, H * .5, 0], [9, H * .3, H * .5], [5.4, H * .2, H * .8]].forEach(q => t.glass(q[0], q[1], q[0], 0, .5 + q[2], 0, 0xffc857));
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => { t.bbox(.9, H * .5, .9, q[0] * 6.9, .5, q[1] * 6.9, 0xffc857); t.cyl(.5, .8, 9, q[0] * 14, .5, q[1] * 14, 0xffc857, 8); t.glow('rgba(255,200,90,.9)', 5, q[0] * 14, 10.5, q[1] * 14, 3); });
    t.bbox(6.4, 1.2, 6.4, 0, H + .5, 0, 0xffc857); t.bbox(.3, 9, .3, 0, H + 1.7, 0, 0xffe9b0); t.blink(0, H + 11, 0, 'rgba(255,220,120,1)');
    t.glow('rgba(255,200,90,.95)', 36, 0, H + 4, 0, 2);
    const rg = t.ring(1, .7, 0xffc857, null, true); t.anim(tm => { const u = (tm % 2.6) / 2.6; rg.scale.setScalar(12 + u * 22); rg.material.opacity = (1 - u) * .9 * t.ent.a; });
  };

  /* ============ BANKS: four glass towers around the plaza ============ */
  const bankBase = (t, w) => t.box(w, 1.6, w, 0, 0, 0, 0x39467a);
  B.mandiri = (t, b) => { const H = b.h; bankBase(t, 14); t.glass(9.6, H * .66, 9.6, 0, 1.6, 0); t.glass(6.6, H * .3, 6.6, 0, 1.6 + H * .66, 0); t.bbox(6.9, .7, 6.9, 0, 1.6 + H * .96, 0, 0xffd166); t.bbox(.25, 6, .25, 0, H + 2, 0, 0xdde6ff); t.blink(0, H + 8.4, 0); };
  B.bri = (t, b) => { const H = b.h; bankBase(t, 16); t.glass(16, H * .3, 9.6, 0, 1.6, 0); t.glass(11, H * .62, 7.4, 0, 1.6 + H * .3, 0); t.bbox(11.4, .8, 7.8, 0, 1.6 + H * .92, 0, 0x5b8cff); dishes(t, 3, H + 1.5, 0, 2); t.blink(-4, H + 3, 0); t.blink(4, H + 3, 0); };
  B.bni = (t, b) => { const H = b.h; bankBase(t, 16); [-5, 5].forEach(x => { t.glass(6, H * .95, 6, x, 1.6, 0); t.bbox(6.3, .7, 6.3, x, 1.6 + H * .95, 0, 0xff9a3d); t.blink(x, H + 4, 0); }); t.glass(4.2, 2.6, 3.4, 0, 1.6 + H * .6, 0, 0xffd166); };
  B.btn = (t, b) => { const H = b.h; bankBase(t, 18); t.glass(14, H * .5, 9.4, 0, 1.6, 0); const r = t.add(new t.T.ConeGeometry(11.2, H * .48, 4), t.std(0xff9a3d, { flatShading: true }), 0, 1.6 + H * .5 + H * .24, 0); r.rotation.y = PI / 4; r.scale.z = .75; t.box(3, H * .3, 3, 5, 1.6 + H * .5, -1, 0xaab6d8); };

  /* ============ TELKOM: lattice mast, data centre and signal rings ============ */
  B.telkom = (t, b) => {
    const H = b.h; t.box(14, 1.2, 14, 0, 0, 0, 0x39467a); t.glass(7, 9, 7, -4, 1.2, 3, 0x2bd4ff);
    t.add(new t.T.ConeGeometry(3.4, H, 4, 1, true), t.bas(b.id === 'telkom' ? 0x2bd4ff : 0xffffff, { wireframe: true }), 0, 1.2 + H / 2, 0).rotation.y = PI / 4;
    t.cyl(.2, .2, H + 4, 0, 1.2, 0, 0xdde6ff, 6); dishes(t, 0, H * .45, 0, 3); const ty = H + 5.4; t.blink(0, ty, 0);
    for (let k = 0; k < 3; k++) { const r = t.ring(1, ty - 1, 0x2bd4ff, null, true); t.anim(tm => { const u = (tm * .5 + k / 3) % 1; r.scale.setScalar(2 + u * 15); r.material.opacity = (1 - u) * .9 * t.ent.a; }); }
  };

  /* ============ POS: grand colonial post palace with portico, clock tower, forecourt fountain and vans ============ */
  B.pos = (t, b) => {
    const T = t.T, stone = 0xe6dbc0, cream = 0xf3ead2, white = 0xfaf3e0, orange = 0xff7a1a, navy = 0x1d3f7a, copper = 0x3fb8a0, gold = 0xffd166, lit = 0xffe39a;
    const roof = (w, d, h, x, y, z, c, par) => { const r = t.add(new T.ConeGeometry(Math.max(w, d) * .7071, h, 4), t.std(c, { flatShading: true }), x, y + h / 2, z, par); r.rotation.y = PI / 4; r.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d)); return r; };
    /* forecourt, lawns and podium */
    t.box(46, .3, 40, 0, 0, 4, 0x4a5578);
    t.box(15, .4, 9, -14, .3, 12, 0x2f7d57); t.box(15, .4, 9, 14, .3, 12, 0x2f7d57);
    t.box(42, 1, 19, 0, .3, -1, stone); t.box(38, 1, 16, 0, 1.3, -1.5, 0xf0e6cb);
    for (let i = 0; i < 5; i++) t.box(12, 2 - i * .4 - .0, .9, 0, .3, 6.5 + i * .9 + .45, i % 2 ? 0xf0e6cb : stone);
    /* main hall */
    const hall = t.box(22, 10, 11, 0, 2.3, -3, cream); t.edges(hall, 0xffb066);
    t.box(22.8, .6, 11.8, 0, 12.3, -3, navy); t.bbox(22.9, .35, 11.9, 0, 12.1, -3, orange);
    for (let i = 0; i < 7; i++) { if (i === 3) continue; const x = -9 + i * 3; t.bbox(1.6, 5, .2, x, 4.4, 2.6, lit); t.bbox(2, .5, .3, x, 9.6, 2.62, stone); t.bbox(1.8, 2.2, .2, x, 7.8 + .2, 2.6, lit); }
    t.bbox(3.6, 5.4, .3, 0, 2.3, 2.62, 0x8a5a1a); t.bbox(2.6, 4.2, .3, 0, 2.5, 2.8, lit); t.bbox(4.4, .6, .4, 0, 7.8, 2.6, gold);
    /* portico: eight columns, entablature, orange frieze, pediment with emblem */
    for (let i = 0; i < 8; i++) { const x = -9.6 + i * (19.2 / 7); t.cyl(.62, .66, 9, x, 2.3, 4.6, white, 16); t.box(1.7, .5, 1.7, x, 2.3, 4.6, stone); t.box(1.7, .55, 1.7, x, 10.75, 4.6, stone); }
    t.box(22.6, 1.4, 5.4, 0, 11.3, 3.6, white); t.bbox(22.9, .55, 5.6, 0, 12.7, 3.6, orange); t.box(22.6, .5, 5.4, 0, 2.3 + 9, 3.6, stone);
    const ped = t.add(new T.CylinderGeometry(13.05, 13.05, 5.4, 3), t.std(0xf7efd9), 0, 13.25 + .5 * 13.05 * .26, 3.6); ped.rotation.x = -PI / 2; ped.scale.set(1, 1, .26);
    const em = t.add(new T.CylinderGeometry(1.9, 1.9, .3, 24), t.bas(orange), 0, 15.1, 6.45); em.rotation.x = PI / 2;
    const em2 = t.add(new T.CylinderGeometry(1.2, 1.2, .34, 24), t.bas(0xffffff), 0, 15.1, 6.5); em2.rotation.x = PI / 2;
    t.bbox(.4, 1.5, .1, 0, 14.4, 6.7, orange);
    /* wings with hip roofs */
    [-1, 1].forEach(s => {
      const w = t.box(10, 8, 9, s * 16, 2.3, -3.5, cream); t.edges(w, 0xffb066); t.bbox(10.4, .45, 9.4, s * 16, 10.1, -3.5, orange);
      roof(10.6, 9.6, 4.2, s * 16, 10.5, -3.5, navy);
      [-2.4, 2.4].forEach(dx => { t.bbox(1.4, 3.4, .2, s * 16 + dx, 4.4, 1.05, lit); t.bbox(1.4, 2.2, .2, s * 16 + dx, 7.4, 1.05, lit); });
    });
    /* clock tower with belfry and copper spire */
    const sh = t.box(7, 12, 7, 0, 12.6, -4.5, cream); t.edges(sh, 0xffb066); t.bbox(8, .7, 8, 0, 24.6, -4.5, orange);
    [[0, 3.7, 0], [0, -3.7, 0], [3.7, 0, 1], [-3.7, 0, 1]].forEach(f => {
      const x = f[0], z = -4.5 + f[1], side = f[2];
      const face = t.add(new T.CylinderGeometry(2.2, 2.2, .3, 28), t.bas(0xffffff), x, 20.5, z); if (side) face.rotation.z = PI / 2; else face.rotation.x = PI / 2;
      const out = f[1] > 0 || f[0] > 0 ? 1 : -1;
      const g = t.grp(x + (side ? out * .2 : 0), 20.5, z + (side ? 0 : out * .2));
      if (side) g.rotation.y = PI / 2 * out; else if (out < 0) g.rotation.y = PI;
      t.bbox(.2, 1.7, .12, 0, 0, .12, 0x1d3f7a, g); const mh = t.grp(0, 0, .2, g); t.bbox(.14, 1.9, .1, 0, 0, 0, 0xff3b3b, mh);
      t.anim(tm => { mh.rotation.z = -tm * .4; });
    });
    t.box(7.6, .5, 7.6, 0, 25.3, -4.5, stone);
    [[-2.5, -2.5], [2.5, -2.5], [-2.5, 2.5], [2.5, 2.5]].forEach(q => t.cyl(.4, .4, 3.4, q[0], 25.8, -4.5 + q[1], white, 12));
    t.sph(.9, 0, 27.4, -4.5, gold); t.box(8, .6, 8, 0, 29.2, -4.5, navy); t.bbox(8.2, .3, 8.2, 0, 29, -4.5, orange);
    roof(8, 8, 7.5, 0, 29.8, -4.5, copper); t.cyl(.12, .2, 3.2, 0, 37.3, -4.5, gold, 8); t.sph(.4, 0, 40.7, -4.5, gold); t.blink(0, 41.6, -4.5, 'rgba(255,170,60,1)');
    /* forecourt: fountain, lamps, flag, orange post boxes */
    t.cyl(3.6, 3.8, .8, 0, .3, 18, stone, 28); t.add(new T.CylinderGeometry(3.1, 3.1, .12, 28), t.bas(0x35b6ff), 0, 1.15, 18);
    t.cyl(.3, .55, 2.4, 0, 1.1, 18, white, 10); t.glow('rgba(120,210,255,.9)', 7, 0, 3.8, 18, 2.5);
    [[-14, 6], [-8, 6], [8, 6], [14, 6], [-18, 14], [18, 14], [-18, 20], [18, 20]].forEach(p => { t.cyl(.12, .16, 5, p[0], .3, p[1], 0x2b3350, 8); t.glow('rgba(255,225,150,.95)', 5, p[0], 5.7, p[1], 0); });
    t.cyl(.15, .2, 15, -9, .3, 14, 0xdde6ff, 8); t.bbox(3.4, .9, .1, -7.3, 14.2, 14, 0xe03a3a); t.bbox(3.4, .9, .1, -7.3, 13.3, 14, 0xffffff);
    [[-12, 15], [-15, 11], [12, 15], [15, 11], [-20, 7], [20, 7]].forEach(p => { t.cyl(.62, .62, 2, p[0], .35, p[1], orange, 12); t.sph(.62, p[0], 2.35, p[1], orange); t.bbox(.9, .14, .12, p[0], 1.5, p[1] + .6, 0x1d3f7a); });
    [[-11, 11], [-17, 12], [11, 11], [17, 12]].forEach(p => { t.sph(1.15, p[0], 1.1, p[1], 0x2f9e5f); });
    /* loading dock behind, parked vans and two delivery vans circling the fountain */
    t.box(24, 3.4, 4.5, 0, .3, -15.2, 0x4a5a99); [-8, 0, 8].forEach(x => t.bbox(4.2, 2.8, .2, x, .3, -12.9, 0x2b3350)); t.bbox(24.4, .4, 4.9, 0, 3.7, -15.2, orange);
    [-9, -1.5, 6].forEach((x, i) => { const v = truck(t, i === 1 ? navy : orange); v.position.set(x, .3, -19); v.rotation.y = PI / 2; });
    for (let i = 0; i < 3; i++) { const v = truck(t, i === 1 ? navy : orange); const ph = i * 2.09; t.anim(tm => { const a = tm * .5 + ph; v.position.set(Math.cos(a) * 6.6, .35, 18 + Math.sin(a) * 6.6); v.rotation.y = -a - PI / 2; }); }
    t.glow('rgba(255,150,40,.55)', 56, 0, 12, 6, 1.2);
  };

  /* ============ PERTAMINA: offshore refinery platform in the sea ============ */
  B.pertamina = (t, b) => {
    const T = t.T;
    [[-9, -9], [9, -9], [-9, 9], [9, 9]].forEach(q => { t.cyl(1.1, 1.7, 14, q[0], -1.5, q[1], 0x6b7a99, 10); });
    [[-9, 0, 9, 0], [0, -9, 0, 9]].forEach(q => { t.beam(q[0], 3, q[1], q[2], 3, q[3], .5, 0x8a94b8); t.beam(q[0], 8, q[1], q[2], 8, q[3], .5, 0x8a94b8); });
    t.beam(-9, 2, -9, 9, 9, -9, .4, 0x8a94b8); t.beam(9, 2, 9, -9, 9, 9, .4, 0x8a94b8);
    t.box(28, 1.6, 28, 0, 12, 0, 0x4a5a99); t.box(26, .3, 26, 0, 13.6, 0, 0x6b7a99);
    t.box(9, 6, 8, -7, 13.6, -6, 0xdfe6ff); t.bbox(9.4, .5, 8.4, -7, 19.6, -6, 0xffb020);
    [[-8, 7, 24], [-3, 8, 20], [2, 7, 17]].forEach(q => { t.cyl(1.5, 1.7, q[2], q[0], 13.6, q[1], 0xe8eefc, 14); t.cyl(1.55, 1.55, .6, q[0], 13.6 + q[2] * .5, q[1], 0xffb020, 14); t.cyl(1.5, 1.5, .5, q[0], 13.6 + q[2], q[1], 0xffb020, 14); t.blink(q[0], 13.6 + q[2] + 1.2, q[1]); });
    [[6, 6], [11, 1]].forEach(q => { t.cyl(3, 3, 6, q[0], 13.6, q[1], 0xf0f4ff, 18); t.cyl(3.05, 3.05, .5, q[0], 17.2, q[1], 0xffb020, 18); });
    t.beam(-6, 18, 7, 6, 15, 6, .4, 0xffb020); t.beam(-1, 18, 8, 6, 15, 6, .35, 0xffb020);
    t.add(new T.ConeGeometry(2.6, 18, 4, 1, true), t.bas(0xffb020, { wireframe: true }), 9, 13.6 + 9, -9).rotation.y = PI / 4;
    t.cyl(.35, .45, 18, -12, 13.6, -12, 0x8a94b8, 6); const fl = t.glow('rgba(255,170,60,1)', 6, -12, 33, -12); t.anim(tm => { fl.scale.setScalar(5 + Math.sin(tm * 14) * 1.3 + Math.random() * .7); });
    t.cyl(4, 4, .4, 10, 13.6, 10, 0x2a3350, 24); t.ring(3.4, 14.05, 0xffffff); const hel = t.grp(10, 14.2, 10); t.bbox(2.6, 1.1, 1.2, 0, 0, 0, 0xff4d6d, hel); const rot = t.bbox(7, .08, .35, 0, 1.3, 0, 0xdde6ff, hel); t.anim(tm => { rot.rotation.y = tm * 14; });
    const cr = t.grp(-12, 13.6, 8); t.bbox(.9, 9, .9, 0, 0, 0, 0xffc857, cr); const jib = t.grp(0, 9, 0, cr); t.bbox(12, .5, .5, 4, 0, 0, 0xffc857, jib); t.anim(tm => { jib.rotation.y = Math.sin(tm * .3) * 1.1; });
    t.glow('rgba(255,210,120,.9)', 12, 0, 16, 0, 3); t.glow('rgba(255,210,120,.9)', 8, -8, 16, 8, 2.4);
    const p = t.add(new T.CylinderGeometry(.6, .6, 66, 8), t.std(0xffb020), 0, .5, 41); p.rotation.x = PI / 2;
    for (let z = 14; z < 74; z += 10) t.box(.8, 1.8, .8, 0, -1, z, 0x6b7a99);
    const sh = t.ship({ L: 38, W: 7.6, hh: 3.2, hull: 0x7a2f3a, stripe: 0x1b2140, cabH: 6, cab: 0xffe9d8, funnel: 0xff4d6d }); t.anim(tm => { const a = tm * .12; sh.position.set(Math.cos(a) * 40, -.2 + Math.sin(tm * 1.2) * .15, Math.sin(a) * 40); sh.rotation.y = -a - PI / 2; });
  };

  /* ============ PLN: power plant, cooling towers, pylons and wind turbines ============ */
  B.pln = (t, b) => {
    const T = t.T, H = b.h;
    t.box(18, 14, 11, -3, 0, -7, 0x6b7a99); t.bbox(18.6, .8, 11.6, -3, 14, -7, 0xffb020); t.bbox(14, .5, .3, -3, 7, -12.6, 0xffc857); t.glow('rgba(255,190,80,.9)', 14, -3, 7, -13, 2.4);
    const prof = [[7.2, 0], [6.1, 4], [4.8, 10], [4.6, 14], [5.2, 18], [5.8, 20]].map(q => new T.Vector2(q[0], q[1]));
    [[10, 8], [-5, 11]].forEach(q => { const c = t.add(new T.LatheGeometry(prof, 22), t.std(0xdfe6ff, { side: T.DoubleSide }), q[0], 0, q[1]); t.smoke(q[0], 20, q[1], 1.5); });
    const seg = 10; for (let i = 0; i < 4; i++) t.cyl(1.1 + (3 - i) * .12, 1.4 + (3 - i) * .12, seg, 12, i * seg, -10, i % 2 ? 0xffffff : 0xff4d6d, 12); t.blink(12, 41, -10);
    for (let i = 0; i < 5; i++) { t.box(2.6, 2.2, 2.2, -14 + (i % 3) * 3.4, 0, 4 + Math.floor(i / 3) * 4, 0x8a94b8); t.glow('rgba(255,170,60,1)', 3, -14 + (i % 3) * 3.4, 3.2, 4 + Math.floor(i / 3) * 4, 3 + i); }
    const wp = [[-14, 3]], pts = []; for (let x = -34; x >= -100; x -= 26) wp.push([x, 0]);
    wp.forEach((p, i) => { t.add(new T.ConeGeometry(2.4, 17, 4, 1, true), t.bas(0xffc857, { wireframe: true }), p[0], 8.5, p[1]).rotation.y = PI / 4; t.bbox(.35, .35, 9, p[0], 16, p[1], 0xffc857); t.bbox(.35, .35, 6, p[0], 12.5, p[1], 0xffc857); if (i) { const q = wp[i - 1]; [[-4.4, 16], [4.4, 16], [-3, 12.5], [3, 12.5]].forEach(a => pts.push(q[0], a[1], q[1] + a[0], p[0], a[1], p[1] + a[0])); } });
    t.lines(pts, 0xcfd8ff, .75);
    [[14, -14], [8, -19], [19, -6]].forEach((q, i) => { t.cyl(.35, .6, 14, q[0], 0, q[1], 0xf4f7ff, 8); const hub = t.grp(q[0], 14, q[1] + .8); for (let k = 0; k < 3; k++) { const bl = t.bbox(.3, 6.4, .12, 0, 0, 0, 0xffffff, hub); bl.position.y = 0; bl.geometry.translate(0, 3.2, 0); bl.rotation.z = k * 2.094; } t.anim(tm => { hub.rotation.z = tm * (1.1 + i * .2); }); });
  };

  /* ============ PELINDO: container port with quay, ship and gantry cranes ============ */
  B.pelindo = (t, b) => {
    const T = t.T; t.box(52, 1.2, 48, 0, -1, -4, 0x39467a); [-16, 16].forEach(x => t.box(8, 1.2, 28, x, -1, -42, 0x39467a));
    const sh = t.ship({ L: 36, W: 8, hh: 3.6, hull: 0x2b4a7a, cont: true, cabH: 7 }); sh.rotation.y = PI / 2; sh.position.set(0, -.2, -46); t.anim(tm => { sh.position.y = -.25 + Math.sin(tm * 1.4) * .12; });
    const cc = [0xff6b6b, 0xffd166, 0x4dd2ff, 0x6ee7b7, 0xa78bfa, 0xff9a3d], items = [];
    for (let x = -20; x <= 20; x += 4.2) for (let z = -2; z <= 14; z += 5) { const n = 1 + Math.floor(Math.abs(Math.sin(x * 3.1 + z * 1.7)) * 3); for (let k = 0; k < n; k++) items.push({ x, y: .2 + .6 + k * 1.25, z, c: pick(cc) }); }
    t.inst(new T.BoxGeometry(3.6, 1.15, 1.9), t.bas(0xffffff), items);
    gantry(t, 0, -22, { w: 11, h: 15, c: 0x5b8cff, boom: 30, cc, z0: -2, run: 22 }); gantry(t, -24, -22, { w: 9, h: 13, c: 0x5b8cff, boom: 26, cc, z0: -2, run: 18 });
    t.glass(6.4, 24, 6.4, 20, .2, 12); t.bbox(.25, 5, .25, 20, 24.2, 12, 0xdde6ff); t.blink(20, 30, 12);
    [[-24, 16], [24, 16], [24, -18], [-24, -18]].forEach(q => { t.bbox(.35, 12, .35, q[0], .2, q[1], 0x8a94b8); t.glow('rgba(255,235,170,1)', 8, q[0], 12.4, q[1], 0); });
    for (let i = 0; i < 3; i++) { const tk = truck(t, pick(cc)); t.anim(tm => { tk.position.set(-22 + ((tm * 4 + i * 16) % 44), .1, -7 + i * 0); tk.rotation.y = 0; }); }
  };

  /* ============ PELNI: passenger ferry terminal and ship ============ */
  B.pelni = (t, b) => {
    t.box(40, 1.2, 36, 0, -1, 0, 0x39467a); t.glass(18, 8, 9, -6, .2, 2, 0x5b8cff); t.bbox(19, .8, 10, -6, 8.2, 2, 0xffffff); t.bbox(.3, 8, .3, -14, 8.6, 6, 0xdde6ff); t.blink(-14, 17, 6);
    const sh = t.ship({ L: 42, W: 9.4, hh: 4, hull: 0xf2f5ff, stripe: 0x1b4fd8, decks: 3, funnel: 0x1b4fd8, cab: 0xffffff, cabH: 4 }); sh.rotation.y = PI / 2; sh.position.set(30, -.2, 0); t.anim(tm => { sh.position.y = -.25 + Math.sin(tm * 1.2) * .13; sh.rotation.z = Math.sin(tm * 1.1) * .012; });
    t.bbox(14, .35, 2.2, 19, 3.2, 3, 0xffe9a8); for (let i = 0; i < 8; i++) t.glow('rgba(255,235,170,1)', 3, 5 + i * 1.6, 1.6, -8, 0);
    t.cyl(1.6, 2.4, 14, -17, .2, -12, 0xffffff, 10); t.cyl(2.2, 2.2, 2.4, -17, 14.2, -12, 0xff4d6d, 10); const bm = t.glow('rgba(255,240,170,1)', 14, -17, 18, -12, 0); t.anim(tm => { bm.visible = Math.sin(tm * 2.4) > -.2; });
  };

  /* ============ PT PAL: shipyard with dry dock, hull on the slip and a naval ship ============ */
  B.pal = (t, b) => {
    const T = t.T; t.box(46, 1.2, 42, 0, -1, -6, 0x39467a); t.box(15, .4, 38, -8, .2, -4, 0x0f1b3d);
    const hull = t.add(K_hull(t, 36, 10, 6, 8), t.std(0x8a94b8), -8, .6, -4); hull.rotation.y = PI / 2;
    t.box(7, 4, 10, -8, 6.6, 2, 0xb9c0d8); t.box(3, 3, 4, -8, 10.6, 3, 0xff7a45);
    const G = t.grp(0, 0, 0); [-16, 0].forEach(x => [-9, 9].forEach(z => t.box(.9, 24, .9, x, 0, -4 + z, 0xff7a45, G))); t.box(17, 1, 1.2, -8, 24, -13, 0xff7a45, G); t.box(17, 1, 1.2, -8, 24, 5, 0xff7a45, G); t.box(1, 1, 20, -16, 24, -4, 0xff7a45, G); t.box(1, 1, 20, 0, 24, -4, 0xff7a45, G);
    const tr = t.grp(-8, 24, -4, G); t.bbox(2.4, .8, 3, 0, -.4, 0, 0xffd166, tr); t.bbox(.1, 9, .1, 0, -9, 0, 0xffffff, tr); t.bbox(3, 1.2, 1.6, 0, -10, 0, 0xff4d6d, tr); t.anim(tm => { tr.position.x = -8 + Math.sin(tm * .5) * 6; });
    [[-8, 4, 9], [-8, 8, -9], [-14, 2, 3], [-3, 7, -2]].forEach((q, i) => t.glow('rgba(255,170,60,1)', 5, q[0], q[1], q[2], 9 + i * 2));
    const nv = t.ship({ L: 32, W: 6.4, hh: 3, hull: 0x6b7a8f, deck: 0x8a94b8, cab: 0x8a94b8, cabH: 5 }); nv.rotation.y = PI / 2; nv.position.set(15, -.2, -42); t.anim(tm => { nv.position.y = -.25 + Math.sin(tm * 1.3) * .1; });
    const gun = t.cyl(.6, .8, 1.2, 0, 0, 0, 0x4a5a6a, 8, nv); gun.position.set(9, 3.6, 0); const bar = t.bbox(3, .3, .3, 0, 0, 0, 0x4a5a6a, nv); bar.position.set(10.6, 4.4, 0);
    t.box(15, 8, 12, 14, 0, 9, 0x6b7a99); for (let i = 0; i < 3; i++) { const r = t.bbox(5.2, .5, 12.4, 11.6 + i * 5.2, 8.1, 9, 0xff7a45); r.rotation.z = .35; } t.cyl(1, 1.3, 14, 20, 0, 3, 0xaab6d8, 10); t.smoke(20, 14.4, 3, 1);
  };
  const K_hull = (t, L, W, hh, bow) => t.K.hullGeo(L, W, hh, bow);

  /* ============ KAI: station, platform, track-side train ============ */
  B.kai = (t, b) => {
    const T = t.T; t.box(24, .8, 5.4, 0, 0, 4.2, 0x6b7a99); t.box(18, 6.5, 7, 0, 0, 11.5, 0x3f55a8); t.bbox(18.6, .7, 7.6, 0, 6.5, 11.5, 0xaab6d8); t.bbox(2.4, 2.4, .2, 0, 4.2, 7.9, 0xffe9a8);
    const arch = t.add(new T.CylinderGeometry(5, 5, 22, 14, 1, true, 0, PI), t.std(0xaab6d8, { side: T.DoubleSide }), 0, .8, 4.2); arch.rotation.z = PI / 2;
    [-9, 0, 9].forEach(x => t.glow('rgba(255,235,170,1)', 5, x, 4, 4.2, 0));
    const tr = t.grp(0, .4, 0); for (let i = 0; i < 6; i++) { t.bbox(5.2, 2.5, 2.4, i * 5.5, .4, 0, i ? 0x5b8cff : 0xffd166, tr); t.bbox(4.6, .6, 2.5, i * 5.5, 1.4, 0, 0xffe9a8, tr); }
    t.anim(tm => { tr.position.x = -190 + (tm * 16) % 340; });
    const sg = t.glow('rgba(255,70,70,1)', 4, -14, 4, -2, 0); t.bbox(.3, 4, .3, -14, .2, -2, 0x8a94b8);
    const ms = []; for (let x = -120; x <= 120; x += 15) ms.push({ x, y: 3.6, z: -4, sx: .4, sy: 7.2, sz: .4 }); t.inst(new T.BoxGeometry(1, 1, 1), t.std(0x8a94b8), ms);
  };

  /* ============ GARUDA: hangar, parked jet and a take-off along the runway ============ */
  B.garuda = (t, b) => {
    const T = t.T; const hg = t.add(new T.CylinderGeometry(8, 8, 22, 18, 1, true), t.std(0x0aa5c2, { side: T.DoubleSide }), 0, 0, 6); hg.rotation.x = PI / 2;
    t.bbox(12, 6, .3, 0, 0, 17.1, 0xffe9a8); t.box(18, 1, 3, 0, 0, -6, 0x39467a); t.plane({ s: 1.5, tail: 0x0aa5c2 }, t.grp(0, 2.3, -10)).rotation.y = -PI / 2.4;
    const oc = t.grp(-37, 0, 0), rot = t.grp(0, 0, 0, oc); rot.rotation.y = -PI / 2; const pl = t.plane({ s: 1.7, tail: 0x0aa5c2 }, rot);
    t.anim(tm => { const u = (tm * .05) % 1, z = -95 + u * 215, up = Math.max(0, u - .55); oc.position.set(-37, .2 + up * up * 160, z); pl.rotation.z = Math.min(.45, up * 1.6); });
    t.glow('rgba(80,220,255,.9)', 10, 0, 7, 17, 2.6);
  };

  /* ============ INJOURNEY: terminal, control tower and a resort pavilion ============ */
  B.injourney = (t, b) => {
    const T = t.T; t.box(32, 1, 12, 0, 0, 0, 0x39467a); t.glass(30, 6.4, 9, 0, 1, 0); const roof = t.add(new T.CylinderGeometry(7, 7, 33, 16, 1, true, 0, PI), t.std(0xdde6ff, { side: T.DoubleSide }), 0, 7.4, 0); roof.rotation.z = PI / 2; roof.scale.set(.45, 1, .9);
    t.cyl(1.4, 2, 16, -15, 0, -7, 0xdde6ff, 10); t.glass(5, 3, 5, -15, 16, -7, 0x34d399); t.blink(-15, 21, -7, 'rgba(80,255,140,1)');
    [-8, 8].forEach((x, i) => { t.box(2.2, 2.2, 8, x, 2, -9, 0xaab6d8); const p = t.plane({ s: 1.2, tail: i ? 0xff6ad5 : 0x5b8cff }, t.grp(x, 1.6, -18)); p.rotation.y = PI / 2; p.position.set(0, 0, 0); });
    for (let i = 0; i < 3; i++) t.add(new T.ConeGeometry(6 - i * 1.3, 2.6, 4), t.std(i % 2 ? 0xff9a3d : 0xc8553a, { flatShading: true }), 15, 1.4 + i * 2.2, 7).rotation.y = PI / 4;
    t.box(1.2, 4, 1.2, 15, 0, 7, 0x8a6a3a); [[10, 12], [20, 11], [18, 3]].forEach(q => palm(t, q[0], q[1]));
  };

  /* ============ JASA MARGA: toll gate gantry over the elevated highway ============ */
  B.jasamarga = (t, b) => {
    const dy = 5.8; t.box(10, .5, 15, 0, dy - .1, 0, 0x4a5a99);
    for (let z = -5; z <= 5; z += 2.5) { t.box(2, 3.4, 1.4, 0, dy, z, 0xdde6ff); t.glow('rgba(80,255,140,1)', 3, 0, dy + 4.2, z + 1.25, 4); }
    t.box(1.6, 8, 1.6, 0, dy, -6.1, 0x5b8cff); t.box(1.6, 8, 1.6, 0, dy, 6.1, 0x5b8cff); const beam = t.box(8, 2, 16.2, 0, dy + 8, 0, 0xe879f9); t.edges(beam, 0xe879f9);
    t.glass(7, b.h, 7, -2, 0, 10); t.bbox(.25, 5, .25, -2, b.h, 10, 0xdde6ff); t.blink(-2, b.h + 5, 10);
  };

  /* ============ HUTAMA KARYA: cable-stayed bridge across the river ============ */
  B.hutamakarya = (t, b) => {
    const H = b.h, dy = 5.8, pts = []; t.box(8, 6.4, 22, 0, -1, 0, 0x6b7a99);
    [-9.5, 9.5].forEach(z => t.box(2.2, H, 2.2, 0, 0, z, 0xe879f9)); t.box(2.2, 2, 21, 0, H * .62, 0, 0xe879f9); t.box(2.2, 1.6, 21, 0, H - 1, 0, 0xe879f9); t.blink(0, H + 2, -9.5); t.blink(0, H + 2, 9.5);
    for (let i = 0; i < 7; i++) { const y = H - 3 - i * 1.6, x = 6 + i * 5.4; [-1, 1].forEach(s => [-1, 1].forEach(q => pts.push(0, y, q * 9.5, s * x, dy + .8, q * 6))); }
    t.lines(pts, 0xffd166, .95); t.box(52, .4, 13.4, 0, 4.4, 0, 0x4a5a99);
    for (let i = 0; i < 6; i++) t.glow('rgba(255,215,120,.9)', 5, 0, H - 5 - i * 4, i % 2 ? 9.5 : -9.5, 2 + i);
    const bt = t.grp(0, 0, 0); t.bbox(5, 1, 1.8, 0, 0, 0, 0xffd166, bt); t.anim(tm => { const z = -40 + ((tm * 4) % 80); bt.position.set(-4 + 0, .2, z); });
  };

  /* ============ WASKITA: construction site with tower cranes ============ */
  B.waskita = (t, b) => {
    const T = t.T; t.box(8, 24, 8, 0, 0, -2, 0x6b7a99);
    for (let y = 4; y < 26; y += 4) { t.box(11, .6, 11, 0, y, -2, 0xaab6d8); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => t.bbox(.5, 4, .5, q[0] * 5, y, q[1] * 5 - 2, 0xff9a3d)); }
    t.glass(8.4, 12, 8.4, 0, 0, -2, 0xe879f9);
    const crane = (x, z, h, ph) => {
      t.add(new T.BoxGeometry(1.6, h, 1.6), t.bas(0xffc857, { wireframe: true }), x, h / 2, z); const top = t.grp(x, h, z); t.bbox(.5, .5, 24, 0, 0, 7, 0xffc857, top); t.bbox(.5, .5, 8, 0, 0, -5, 0xffc857, top); t.bbox(2.4, 2, 2.4, 0, -1.2, -8, 0x6b7a99, top); t.bbox(2, 2, 2, 0, 0, 1, 0xff9a3d, top); t.blink(0, 2.5, 0);
      const hk = t.bbox(1, 1.2, 1, 0, -12, 14, 0xff4d6d, top); t.bbox(.08, 12, .08, 0, -12, 14, 0xffffff, top); t.anim(tm => { top.rotation.y = Math.sin(tm * .22 + ph) * 1.5; });
    };
    crane(10, 6, 34, 0); crane(-10, -8, 28, 2);
    const cs = []; for (let i = 0; i < 6; i++) cs.push({ x: -10 + i * 2.2, y: .9, z: 10, sx: 1.2, sy: 1.8, sz: 1.2 }); t.inst(new T.ConeGeometry(.5, 1, 8), t.std(0xff7a2a), cs);
    const items = []; for (let i = 0; i < 12; i++) items.push({ x: 10 + (i % 4) * 1.5, y: .5 + Math.floor(i / 4) * .6, z: -10, sx: 1.3, sy: .5, sz: 4 }); t.inst(new T.BoxGeometry(1, 1, 1), t.std(0x8a94b8), items);
    const ex = t.grp(-12, 0, 10); t.bbox(3, 1.2, 2.2, 0, .5, 0, 0xffd166, ex); const arm = t.grp(1, 2, 0, ex); t.bbox(4, .5, .5, 2, 0, 0, 0xffd166, arm); t.anim(tm => { arm.rotation.z = .5 + Math.sin(tm * 1.1) * .35; });
  };

  /* ============ SIG: cement plant with kiln, preheater tower and silos ============ */
  B.sig = (t, b) => {
    const T = t.T, H = b.h; t.box(5, H, 5, -8, 0, 0, 0xaab6d8); for (let i = 0; i < 3; i++) { const c = t.add(new T.ConeGeometry(2.2, 5, 10), t.std(0x8793b8), -8, H * (.3 + i * .22), 3.6); c.rotation.x = PI; }
    t.smoke(-8, H + .6, 0, 1.2); t.blink(-8, H + 2, 0);
    const kiln = t.add(new T.CylinderGeometry(1.9, 1.9, 24, 14), t.std(0xff7a45), 4, 5, 2); kiln.rotation.z = PI / 2 + .06; [-4, 4, 12].forEach(x => t.box(1.4, 4.4, 3, x, 0, 2, 0x6b7a99));
    t.glow('rgba(255,120,50,.9)', 9, 14, 5, 2, 5);
    [[0, -11], [6, -11], [12, -9]].forEach((q, i) => { t.cyl(2.6, 2.6, 20, q[0], 0, q[1], 0xe8eefc, 16); t.add(new T.ConeGeometry(2.7, 2.4, 16), t.std(0x8793b8), q[0], 21.2, q[1]); });
    t.add(new T.ConeGeometry(11, 13, 7), t.std(0x8a8f9c, { flatShading: true }), -12, 6.5, 13); t.beam(-10, 12, 10, -8, H * .55, 3, .8, 0xffd166);
    const tk = truck(t, 0xffd166); t.anim(tm => { tk.position.set(-18 + ((tm * 5) % 36), .1, 18); tk.rotation.y = 0; });
  };

  /* ============ KRAKATAU STEEL: blast furnace, stoves, chimneys and rolling mill ============ */
  B.krakatau = (t, b) => {
    const T = t.T, H = b.h; t.cyl(4.2, 5.2, H * .72, -6, 0, -2, 0x8a94b8, 16); t.add(new T.ConeGeometry(4.2, H * .26, 16), t.std(0x6b7a99), -6, H * .72 + H * .13, -2);
    [[2, -9], [5.4, -4], [4, 2]].forEach(q => { t.cyl(2, 2.2, H * .55, q[0], 0, q[1], 0xaab6d8, 12); t.beam(-6, H * .5, -2, q[0], H * .5, q[1], .6, 0xff7a45); });
    chimney(t, 10, -9, H * 1.1, 0xff7a45); chimney(t, 14, -4, H * .9, 0xff7a45);
    t.glow('rgba(255,120,50,1)', 14, -6, 3, -6, 4); t.glow('rgba(255,150,60,1)', 9, -6, H * .72, -2, 6);
    t.box(26, 6, 8, 0, 0, 9, 0x6b7a99); for (let i = 0; i < 4; i++) { const r = t.bbox(6.6, .5, 8.4, -9 + i * 6, 6.1, 9, 0x8793b8); r.rotation.z = .3; } t.bbox(22, .5, .3, 0, 3, 4.8, 0xff7a45); t.glow('rgba(255,120,50,.9)', 16, 0, 3, 5, 3);
    const it = []; for (let i = 0; i < 8; i++) it.push({ x: -13 + (i % 4) * 3.6, y: .4 + Math.floor(i / 4) * .8, z: -13, sx: 3.2, sy: .7, sz: 1.8 }); t.inst(new T.BoxGeometry(1, 1, 1), t.std(0x8a94b8), it);
    const ld = t.grp(0, 0, 0); t.bbox(3, 1.6, 1.8, 0, 1, 0, 0xff7a45, ld); t.anim(tm => { ld.position.set(-15 + (Math.sin(tm * .4) * .5 + .5) * 30, .3, -16); });
  };

  /* ============ MIND ID: terraced mine with haul trucks, smelter ============ */
  B.mind = (t, b) => {
    const T = t.T, lv = 7, tr = [];
    for (let i = 0; i < lv; i++) { const rb = 17 - i * 2, c = t.cyl(rb - 1.3, rb, 4.6, 0, i * 4.6, 0, i % 2 ? 0x6b4fb0 : 0x8a5cf0, 22); tr.push(rb); t.glow(i % 2 ? 'rgba(120,230,255,1)' : 'rgba(255,215,90,1)', 3, Math.cos(i * 2.4) * (rb - 3), i * 4.6 + 5, Math.sin(i * 2.4) * (rb - 3), 2 + i * .4); }
    [2, 4, 5].forEach((l, i) => { const trk = truck(t, 0xffd166); const rr = tr[l] - .9, y = (l + 1) * 4.6 + .2; t.anim(tm => { const a = tm * (.45 + i * .1) + i * 2, g = trk; g.position.set(Math.cos(a) * rr, y, Math.sin(a) * rr); g.rotation.y = -a - PI / 2; }); });
    const ex = t.grp(3, 4.6 * 3 + .2, 4); t.bbox(3, 1.2, 2.2, 0, .3, 0, 0xffd166, ex); const arm = t.grp(1, 1.6, 0, ex); t.bbox(4, .5, .5, 2, 0, 0, 0xffd166, arm); t.anim(tm => { arm.rotation.z = .6 + Math.sin(tm * 1.1) * .3; });
    t.box(12, 8, 8, -19, 0, 10, 0x5b3fb0); t.bbox(12.6, .6, 8.6, -19, 8, 10, 0xa78bfa); chimney(t, -14, 7, 22, 0xa78bfa); t.glow('rgba(255,150,70,.95)', 11, -19, 4, 5.4, 4);
    const ig = []; for (let i = 0; i < 10; i++) ig.push({ x: -22 + (i % 5) * 2.4, y: .5 + Math.floor(i / 5) * .8, z: 18, sx: 2.2, sy: .7, sz: 1.1 }); t.inst(new T.BoxGeometry(1, 1, 1), t.bas(0xdfe6ff), ig);
  };

  /* ============ ANTAM: gold and nickel mountain with an adit, conveyor and gold bars ============ */
  B.antam = (t, b) => {
    const T = t.T, H = b.h; t.add(new T.ConeGeometry(16, H, 7), t.std(0x4a3f7a, { flatShading: true, roughness: .9 }), -3, H / 2, 6);
    t.add(new T.ConeGeometry(8, H * .55, 6), t.std(0x5a4a90, { flatShading: true }), 10, H * .275, 10);
    for (let i = 0; i < 7; i++) t.glow('rgba(255,215,90,1)', 3.4, -3 + Math.cos(i * 1.2) * (10 - i), 4 + i * 3.6, 6 + Math.sin(i * 1.2) * (10 - i) - 3, 2 + i * .5);
    t.box(5, 4.6, 2, -3, 0, -6.4, 0x14122a); t.box(.8, 5, .8, -5.6, 0, -6.6, 0xffd36e); t.box(.8, 5, .8, -.4, 0, -6.6, 0xffd36e); t.bbox(6.6, .8, 1, -3, 4.6, -6.6, 0xffd36e);
    t.beam(-3, 2.4, -7, 8, 8, -12, .9, 0x8a94b8); t.box(10, 5, 7, 12, 0, -12, 0x6b7a99); chimney(t, 8, -8, 14, 0xa78bfa);
    const bars = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4 - r; c++) bars.push({ x: -11 + c * 2.2 + r * 1.1, y: .5 + r * .9, z: -14, sx: 2, sy: .8, sz: 1.1 }); t.inst(new T.BoxGeometry(1, 1, 1), t.bas(0xffd36e), bars); t.glow('rgba(255,215,90,.95)', 10, -9, 3, -14, 3);
    [[14, 2], [17, 8]].forEach(q => t.cyl(2.2, 2.2, 7, q[0], 0, q[1], 0xdfe6ff, 14));
    const tk = truck(t, 0xffd166); t.anim(tm => { tk.position.set(-14 + (tm * 4) % 28, .1, -19); tk.rotation.y = 0; });
  };

  /* ============ BUKIT ASAM: coal piles, stacker, conveyor and coal train ============ */
  B.bukitasam = (t, b) => {
    const T = t.T; [[-8, 4, 7], [0, 8, 6], [8, 3, 6.4], [-4, -4, 5]].forEach(q => t.add(new T.ConeGeometry(q[2], q[2] * .85, 12), t.std(0x1a1c2a, { roughness: .35, metalness: .4, emissive: 0x2a3a6a, emissiveIntensity: .25 }), q[0], q[2] * .42, q[1]));
    const sr = t.grp(-6, 0, 12); t.bbox(2.6, 2.2, 2.6, 0, .4, 0, 0xffd166, sr); const bm = t.grp(0, 4.4, 0, sr); t.bbox(.7, .7, 14, 0, 0, 6, 0xffd166, bm); t.anim(tm => { sr.rotation.y = Math.sin(tm * .35) * .8; });
    t.beam(-14, 1.5, 10, 12, 12, -2, 1, 0x8a94b8); const lg = []; for (let k = 0; k < 6; k++) lg.push({ x: -14 + k * 4.3, y: 1 + k * 1.3, z: 10 - k * 2, sx: .4, sy: 2 + k * 2.4, sz: .4 }); t.inst(new T.BoxGeometry(1, 1, 1), t.std(0x6b7a99), lg);
    t.cyl(3, 3, 14, 12, 0, -2, 0xdfe6ff, 14); t.add(new T.ConeGeometry(3.2, 3, 14), t.std(0x8793b8), 12, 15.5, -2);
    t.bbox(60, .3, 2.6, 0, .1, -12, 0x2a3156); const tr = t.grp(0, .3, -12); for (let i = 0; i < 7; i++) t.bbox(4.2, 1.8, 2.2, i * 4.6, .3, 0, i ? 0x1a1c2a : 0xffd166, tr); t.anim(tm => { tr.position.x = -50 + (tm * 5) % 90; });
    t.glow('rgba(255,200,80,.9)', 8, -12, 6, -4, 0);
  };

  /* ============ PUPUK INDONESIA: fertiliser plant with prill tower and ammonia spheres ============ */
  B.pupuk = (t, b) => {
    const T = t.T, H = b.h; t.cyl(2.8, 3.3, H, -7, 0, -5, 0xf4faf0, 16); t.cyl(3.4, 3.4, 1, -7, H - 3, -5, 0xa3e635, 16); t.cyl(3.4, 3.4, 1, -7, H * .55, -5, 0xa3e635, 16); t.box(7, 3, 7, -7, H, -5, 0xdfe6ff); t.smoke(-7, H + 3.4, -5, 1.1); t.blink(-7, H + 5, -5);
    [[6, -7], [11, -2], [6, 3]].forEach(q => { t.sph(3.4, q[0], 7.4, q[1], 0xe6f2e6); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(s => t.cyl(.25, .25, 4.4, q[0] + s[0] * 2, 0, q[1] + s[1] * 2, 0x8a94b8, 6)); });
    t.box(15, 8, 8, 3, 0, 12, 0x6b7a99); t.bbox(15.6, .6, 8.6, 3, 8, 12, 0xa3e635); t.beam(-7, H * .55, -5, 3, 8, 12, .7, 0xa3e635); t.beam(6, 10, -7, 6, 10, 3, .6, 0x8a94b8);
    t.cyl(.3, .4, 18, -13, 0, 4, 0x8a94b8, 6); const fl = t.glow('rgba(255,170,60,1)', 5, -13, 18.6, 4); t.anim(tm => { fl.scale.setScalar(4.5 + Math.sin(tm * 13) * 1.1 + Math.random() * .6); });
    const tk = truck(t, 0xa3e635); t.anim(tm => { tk.position.set(-18 + (tm * 4.5) % 36, .1, 18); tk.rotation.y = 0; });
  };

  /* ============ BULOG: rice warehouses, silos and sack stacks ============ */
  B.bulog = (t, b) => {
    const T = t.T; for (let i = 0; i < 3; i++) { t.box(8, 5, 18, -9 + i * 9, 0, 0, i % 2 ? 0xf3e7b0 : 0xe9d98a); const rf = t.add(new T.CylinderGeometry(4.8, 4.8, 18.4, 3), t.std(0xa3e635), -9 + i * 9, 6, 0); rf.rotation.x = -PI / 2; rf.scale.set(1, 1, .42); rf.position.y = 6; }
    [[-8, 14], [-3, 14], [2, 14], [7, 14]].forEach(q => { t.cyl(2.2, 2.2, 11, q[0], 0, q[1], 0xf4f7ff, 16); t.add(new T.ConeGeometry(2.3, 2, 16), t.std(0xa3e635), q[0], 12, q[1]); });
    const sk = []; for (let x = 0; x < 6; x++) for (let z = 0; z < 3; z++) for (let y = 0; y < 3; y++) sk.push({ x: 8 + x * 1.3, y: .4 + y * .65, z: -14 + z * .9, sx: 1.2, sy: .6, sz: .8 }); t.inst(new T.BoxGeometry(1, 1, 1), t.std(0xf3e7b0), sk);
    for (let i = 0; i < 2; i++) { const tk = truck(t, i ? 0xa3e635 : 0xffd166); t.anim(tm => { tk.position.set(-18 + ((tm * 4 + i * 18) % 36), .1, -12); tk.rotation.y = 0; }); }
  };

  /* ============ PTPN: palm plantation with a mill ============ */
  B.ptpn = (t, b) => {
    const T = t.T, tk = [], cr = []; for (let x = 0; x <= 16; x += 4) for (let z = -16; z <= 16; z += 4) { if (Math.hypot(x, z) > 19) continue; tk.push({ x, y: 3, z, sx: .4, sy: 6, sz: .4 }); cr.push({ x, y: 6.4, z, sx: 3.6, sy: 1.6, sz: 3.6, ry: x + z }); }
    t.inst(new T.CylinderGeometry(1, 1.2, 1, 6), t.std(0x8a6a3a), tk); t.inst(new T.ConeGeometry(1, 1, 6), t.std(0x2f8f4a), cr);
    t.box(10, 6, 8, -11, 0, 0, 0x6b7a99); t.bbox(10.6, .6, 8.6, -11, 6, 0, 0xffb020); chimney(t, -15, -3, 14, 0xffb020); [[-10, 8], [-5, 8]].forEach(q => t.cyl(2.3, 2.3, 6, q[0], 0, q[1], 0xffb020, 16)); t.beam(-6, 2, 0, -1, 3, 0, .8, 0x8a94b8);
    const v = truck(t, 0xffb020); t.anim(tm => { v.position.set(-8 + ((tm * 4) % 22), .1, 12); v.rotation.y = 0; });
  };

  /* ============ BIO FARMA: laboratory with dome, bioreactors and a glowing flask ============ */
  B.biofarma = (t, b) => {
    const T = t.T, H = b.h; t.box(14, 1, 10, 0, 0, 0, 0x39467a); t.glass(12, H * .55, 8, 0, 1, 0, 0xff5d7a); t.bbox(12.5, .6, 8.5, 0, 1 + H * .55, 0, 0xffffff);
    t.bbox(5, 1.5, .3, 0, 5, -4.2, 0x34d399); t.bbox(1.5, 5, .3, 0, 3.3, -4.2, 0x34d399); t.glow('rgba(80,255,170,.9)', 9, 0, 5.5, -5, 2.4);
    const dm = t.add(new T.SphereGeometry(4.4, 16, 10, 0, TAU(), 0, PI / 2), new T.MeshStandardMaterial({ color: 0x9be7ff, transparent: true, opacity: .45, side: T.DoubleSide }), 4, 1 + H * .55 + .6, 0); t.ent.mats.push({ m: dm.material, base: .45, keep: false, self: false });
    [-1, 1].forEach(s => { t.cyl(1.6, 1.6, 8, 8 * s + (s > 0 ? 3 : 0), 0, 6, 0xdfe6ff, 14); t.sph(1.6, 8 * s + (s > 0 ? 3 : 0), 8, 6, 0xdfe6ff); });
    const fl = t.grp(-3, 1 + H * .55 + .6, 0); t.add(new T.ConeGeometry(2.2, 3.4, 16), t.std(0xff5d7a, { transparent: true, opacity: .8 }), 0, 1.7, 0, fl); t.cyl(.6, .6, 2, 0, 3.4, 0, 0xdfe6ff, 10, fl); t.glow('rgba(255,100,140,1)', 9, 0, 2, 0, 3, fl);
    for (let i = 0; i < 4; i++) { const bs = t.sprite('rgba(255,180,200,1)', 1.6, 0, 3, 0, fl); t.anim(tm => { const u = (tm * .5 + i / 4) % 1; bs.position.set(Math.sin(u * 6 + i) * .5, 3.4 + u * 4, 0); bs.material.opacity = (1 - u) * t.ent.a; }); }
  };
  const TAU = () => Math.PI * 2;
})();
