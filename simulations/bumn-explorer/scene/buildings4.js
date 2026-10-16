/* BUMN Explorer: detail pass. These builders replace the simpler first versions in buildings.js / buildings2.js / buildings3.js
   (this file loads last, so the later definition wins). Each one tries to show what the company is known for: its tower and logo colours,
   its fleet, plant or product, with small animated parts. Same toolbox t as in scene.js; local coordinates, site centre (0,0).
   Heights follow b.h; keep everything inside the lot radius b.r. */
(function () {
  window.MBALAB = window.MBALAB || {}; MBALAB.bumn = MBALAB.bumn || {};
  const B = MBALAB.bumn.builders, PI = Math.PI;

  /* ---- small shared helpers ---- */
  const cone = (t, r, h, x, y, z, c, seg, par) => t.add(new t.T.ConeGeometry(r, h, seg || 12), t.std(c, { flatShading: true }), x, y + h / 2, z, par);
  const roofV = (t, w, d, h, x, y, z, c) => { const r = cone(t, Math.max(w, d) * .7071, h, x, y, z, c, 4); r.rotation.y = PI / 4; r.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d)); return r; };
  const gable = (t, w, d, h, x, y, z, c) => { const r = t.add(new t.T.CylinderGeometry(d / 2, d / 2, w, 3), t.std(c), x, y + d * .25, z); r.rotation.set(0, 0, PI / 2); r.scale.set(1, 1, h / (d * .5)); return r; };
  const slab = (t, w, d, x, z, c) => t.box(w, .5, d, x, 0, z, c == null ? 0x2a3358 : c);
  const mover = (t, m, x0, x1, z, sp, ph, y) => t.anim(tm => { const u = (((tm * sp + (ph || 0)) % 1) + 1) % 1; m.position.set(x0 + (x1 - x0) * u, y == null ? m.position.y : y, z); });
  const car = (t, c, par) => { const g = t.grp(0, 0, 0, par); t.bbox(3, 1.1, 1.5, 0, .35, 0, c, g); t.bbox(1.3, .9, 1.4, .4, 1.3, 0, 0xeaf0ff, g); return g; };
  const bus = (t, c, par) => { const g = t.grp(0, 0, 0, par); t.bbox(5, 1.8, 1.7, 0, .4, 0, c, g); t.bbox(4.6, .5, 1.72, 0, 1.5, 0, 0x2b3f86, g); t.bbox(5.05, .25, 1.75, 0, 2.3, 0, 0xffffff, g); return g; };
  const lattice = (t, h, w, x, z, c, par) => { const g = t.grp(x, 0, z, par); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => t.beam(q[0] * w, 0, q[1] * w, q[0] * w * .25, h, q[1] * w * .25, .35, c, g)); for (let k = 1; k < 6; k++) { const y = h * k / 6, s = w * (1 - k / 6 * .75); t.beam(-s, y, -s, s, y, -s, .2, c, g); t.beam(-s, y, s, s, y, s, .2, c, g); t.beam(-s, y, -s, -s, y, s, .2, c, g); t.beam(s, y, -s, s, y, s, .2, c, g); t.beam(-s, y, -s, s, y + h / 6, -s, .15, c, g); } return g; };
  const dishAt = (t, x, y, z, ry, c, par) => { const d = t.add(new t.T.ConeGeometry(1.5, 1, 14, 1, true), t.std(c || 0xe8eefc, { side: t.T.DoubleSide }), x, y, z, par); d.rotation.set(0, ry || 0, -PI / 2); return d; };
  const sack = (t, x, y, z, c) => t.box(1.4, .8, .9, x, y, z, c || 0xe9dcc0);

  /* ============ BANKS ============ */
  /* Bank Mandiri: navy tower with gold bands, vertical fins, a lobby podium with a wordmark and ATM kiosks */
  B.mandiri = (t, b) => {
    const H = b.h, navy = 0x1f4e9c, gold = 0xfcb017;
    t.box(15, 1.2, 15, 0, 0, 0, 0x2b3a6b);
    t.glass(14, 4, 8, 0, 1.2, 3, 0x4da3ff); t.bbox(14.8, .5, 9, 0, 5.2, 3, gold); t.label('mandiri', 9, 1.8, 0, 3.4, 7.1, '#fcb017', '#12306a');
    t.glass(8.6, H * .7, 8.6, 0, 1.2, -2, 0x3b82f6);
    for (let i = 0; i < 5; i++) t.bbox(.5, H * .7, .5, -4.3 + i * 2.15, 1.2, 2.4, navy);
    t.bbox(9.2, .45, 9.2, 0, 1.2 + H * .35, -2, gold); t.bbox(9.2, .45, 9.2, 0, 1.2 + H * .68, -2, gold);
    t.glass(6, H * .22, 6, 0, 1.2 + H * .7, -2, 0x60a5fa); t.bbox(6.6, .6, 6.6, 0, 1.2 + H * .92, -2, gold);
    t.bbox(.3, 6, .3, 0, H + 1, -2, 0xdde6ff); t.blink(0, H + 7.4, -2);
    [-5.5, 5.5].forEach(x => { t.box(1.6, 2.4, 1.6, x, 1.2, 7, navy); t.glow('rgba(120,200,255,.9)', 3.2, x, 3.6, 7.9); });
    const ring = t.ring(1, 1.4, 0xfcb017, null, true); t.anim(tm => { const u = (tm % 3) / 3; ring.scale.setScalar(8 + u * 9); ring.material.opacity = (1 - u) * .7 * t.ent.a; });
  };
  /* BRI: blue tower with orange crown, village-bank kiosk row (unit desa) and the BRIsat satellite circling above */
  B.bri = (t, b) => {
    const H = b.h, blue = 0x2a5fc9, orange = 0xff7a1a;
    t.box(16, 1.2, 16, 0, 0, 0, 0x2b3a6b);
    t.glass(8, H * .85, 8, -2.5, 1.2, -2, 0x3b82f6); t.glass(6, H * .5, 6, 3.5, 1.2, -3, 0x60a5fa);
    [.25, .5, .75].forEach(k => t.bbox(8.4, .35, 8.4, -2.5, 1.2 + H * .85 * k, -2, orange));
    t.bbox(9, .8, 9, -2.5, 1.2 + H * .85, -2, orange); t.label('BRI', 6, 2, -2.5, 1.2 + H * .85 + 2, 2.1, '#fff', '#1d4ed8');
    for (let i = 0; i < 4; i++) { const x = -6 + i * 3.6; t.box(2.6, 1.8, 2.2, x, 1.2, 6, [0xffd166, 0xffffff][i % 2]); roofV(t, 3, 2.6, 1.3, x, 3, 6, orange); }
    dishAt(t, 4, H * .52 + 3, -3, 0, 0xe8eefc); t.bbox(.2, 3, .2, 4, H * .5, -3, 0xdde6ff);
    const sat = t.grp(0, 0, 0); t.bbox(1.2, 1.2, 1.2, 0, 0, 0, 0xffd166, sat); t.bbox(3.4, .12, 1, -2.4, 0, 0, 0x2bd4ff, sat); t.bbox(3.4, .12, 1, 2.4, 0, 0, 0x2bd4ff, sat);
    t.anim(tm => { const a = tm * .6; sat.position.set(Math.cos(a) * 9, H + 10 + Math.sin(a * 1.3) * 1.5, Math.sin(a) * 9); sat.rotation.y = -a; });
  };
  /* BNI: the slim "Wisma 46" tower with a spire, a stepped crown and a lit 46 sign */
  B.bni = (t, b) => {
    const H = b.h, teal = 0x14b8a6, orange = 0xff7a1a;
    t.box(15, 1.2, 15, 0, 0, 0, 0x2b3a6b); t.glass(14, 3.5, 7, 0, 1.2, 4, 0x2dd4bf); t.bbox(14.6, .5, 7.6, 0, 4.7, 4, orange);
    t.glass(7, H * .62, 7, 0, 1.2, -1.5, 0x14b8a6); t.glass(5.2, H * .22, 5.2, 0, 1.2 + H * .62, -1.5, 0x2dd4bf); t.glass(3.6, H * .1, 3.6, 0, 1.2 + H * .84, -1.5, 0x5eead4);
    [.62, .84, .94].forEach((k, i) => t.bbox(7.4 - i * 1.8, .45, 7.4 - i * 1.8, 0, 1.2 + H * k, -1.5, orange));
    t.cyl(.15, .35, 9, 0, H + .5, -1.5, 0xdde6ff, 6); t.blink(0, H + 10, -1.5);
    t.label('46', 4, 2.2, 0, 1.2 + H * .5, 2.1, '#ff7a1a', '#0c3b3a'); t.label('BNI', 7, 1.6, 0, 3.2, 7.8, '#fff', '#0f766e');
    [-6, 6].forEach(x => { t.cyl(.5, .5, 3.4, x, 1.2, 6, 0xffd166, 8); t.glow('rgba(255,210,120,.9)', 3.5, x, 5, 6, 2); });
  };
  /* BTN: housing bank: a tower beside a row of subsidised houses with gable roofs and a giant key */
  B.btn = (t, b) => {
    const H = b.h, orange = 0xff9a3d;
    t.box(17, 1, 17, 0, 0, 0, 0x2b3a6b); t.glass(8, H * .85, 8, -4, 1, -3, 0x4da3ff); t.bbox(8.6, .7, 8.6, -4, 1 + H * .85, -3, orange); t.label('BTN', 6, 1.8, -4, 1 + H * .62, 1.05, '#fff', '#0b4f8a');
    roofV(t, 9, 9, 3.2, -4, 1 + H * .85 + .7, -3, 0xffb066);
    [0, 1, 2, 3].forEach(i => { const x = -6.6 + i * 4.4; t.box(3.4, 2.4, 3, x, 1, 5, [0xfff1c9, 0xcfe8ff, 0xffd9c2, 0xd8f5d0][i]); roofV(t, 4.2, 3.8, 1.6, x, 3.4, 5, [0xd9482b, 0x39467a][i % 2]); t.box(.7, 1.3, .1, x, 1, 6.55, 0x6b4a2a); });
    const key = t.grp(6, 7, -4); t.cyl(1.1, 1.1, .5, 0, 0, 0, 0xffd166, 18, key).rotation.x = PI / 2; t.bbox(.5, .5, 4.4, 0, 0, -3, 0xffd166, key); t.bbox(1.6, .5, .5, 0, 0, -4.8, 0xffd166, key); t.anim(tm => { key.rotation.y = tm * .8; });
  };
  /* Danareksa: investment house: glass tower, a ticker band that scrolls, candlestick bars and a bull */
  B.danareksa = (t, b) => {
    const H = b.h;
    t.box(17, .8, 17, 0, 0, 0, 0x2a3358); t.glass(8, H, 8, -3, .8, -2, 0x38bdf8); t.bbox(8.6, .6, 8.6, -3, .8 + H, -2, 0xe2e8f0);
    for (let i = 0; i < 6; i++) t.bbox(.35, H * .8, .35, -6.6 + i * 1.4, .8, 2.3, 0xe2e8f0);
    [[5, 6, 0x34d399], [7, 9, 0xff6b6b], [9, 5, 0x34d399], [11, 11, 0x34d399]].forEach((c, i) => { const x = 3 + i * 2.2; t.bbox(1.2, c[1], 1.2, x, .8, 5, c[2]); t.bbox(.15, c[1] + 3, .15, x, .8 - 1, 5, c[2]); });
    const tick = t.label('DNRK ▲ 1.2%  BBRI ▲ 0.8%  TLKM ▼ 0.3%  ', 12, 1.4, -3, H * .55, 2.35, '#34d399', '#06201a'); t.anim(tm => { tick.material.map.offset.x = (tm * .05) % 1; tick.material.map.wrapS = 1000; });
    const bull = t.grp(6.5, .8, -6); t.box(3, 1.6, 1.4, 0, .8, 0, 0xffc857, bull); t.box(1.1, 1.1, 1.1, 1.8, 1.5, 0, 0xffc857, bull); cone(t, .22, 1, 2.2, 2.5, .3, 0xfff1b0, 6, bull); cone(t, .22, 1, 2.2, 2.5, -.3, 0xfff1b0, 6, bull);
    t.glow('rgba(255,200,90,.9)', 9, 6.5, 3, -6, 2);
  };

  /* ============ TELECOM ============ */
  /* Telkom: glass HQ, lattice tower with dish farm, satellite in orbit and fibre lines glowing to the data centre */
  B.telkom = (t, b) => {
    const H = b.h, cy = 0x2bd4ff;
    t.box(16, 1, 16, 0, 0, 0, 0x2b3a6b); t.glass(6, H * .5, 6, 4, 1, 3, 0x38bdf8); t.bbox(6.5, .5, 6.5, 4, 1 + H * .5, 3, cy); t.label('Telkom', 6.2, 1.6, 4, 1 + H * .2, 6.05, '#fff', '#be123c');
    lattice(t, H, 3.4, -3, -3, 0xdde6ff); dishAt(t, -3, H * .6, -3 + 3.4, 0, 0xffffff); dishAt(t, -3, H * .42, -3 - 3.4, PI, 0xffffff); dishAt(t, -3 + 3.4, H * .5, -3, PI / 2, 0xffffff);
    t.blink(-3, H + 1.4, -3); t.cyl(.15, .15, 3, -3, H, -3, 0xdde6ff, 6);
    t.box(5, 3, 4, -5.5, 1, 5.5, 0x39467a); for (let i = 0; i < 5; i++) t.bbox(.4, 2, .1, -7.2 + i * .8, 1.5, 7.52, i % 2 ? cy : 0xff5a8a);
    t.lines([-3, 1.2, -3, -3, 1.2, 5, -3, 1.2, 5, 4, 1.2, 5, 4, 1.2, 5, 4, 1.2, 3], 0x2bd4ff, .9);
    const sat = t.grp(0, 0, 0); t.bbox(1.2, 1.2, 1.2, 0, 0, 0, 0xffd166, sat); t.bbox(3.6, .12, 1, -2.5, 0, 0, cy, sat); t.bbox(3.6, .12, 1, 2.5, 0, 0, cy, sat); t.anim(tm => { const a = tm * .45; sat.position.set(Math.cos(a) * 12, H + 12 + Math.sin(a) * 2, Math.sin(a) * 6); sat.rotation.y = -a; });
    for (let k = 0; k < 3; k++) { const r = t.ring(1, H + 1.4, cy, null, true); r.position.set(-3, H + 1.4, -3); t.anim(tm => { const u = (tm * .5 + k / 3) % 1; r.scale.setScalar(2 + u * 14); r.material.opacity = (1 - u) * .8 * t.ent.a; }); }
  };
  /* INTI: telecom works: factory hall with a sawtooth roof, lattice mast with dishes, cable reels and a test rack */
  B.inti = (t, b) => {
    slab(t, 20, 18, 0, 0, 0x2a3358);
    t.box(11, 5, 8, -3, .5, 3, 0x9aa7c7); [0, 1, 2, 3].forEach(i => roofV(t, 2.8, 8.4, 1.8, -6.6 + i * 2.6, 5.5, 3, 0x8a94b8));
    for (let i = 0; i < 3; i++) t.bbox(.4, 2, .1, -7 + i * 4, 1, 7.02, 0x2bd4ff);
    lattice(t, b.h * .9, 2.6, 6, -4, 0xdde6ff); dishAt(t, 6, b.h * .62, -1.4, 0, 0xffffff); dishAt(t, 6, b.h * .78, -6.6, PI, 0xffffff); t.blink(6, b.h * .9 + 1, -4); t.glow('rgba(43,212,255,.9)', 5, 6, b.h * .9, -4, 3);
    [-7, -4.6].forEach(x => { const r = t.cyl(1.5, 1.5, .8, x, .5, -4.5, 0xe9a23b, 16); r.rotation.x = PI / 2; r.position.y = 1.9; t.anim(tm => { r.rotation.y = tm * .6; }); });
    t.box(2, 3.4, 1.2, 1, .5, -6, 0x39467a); [0, 1, 2, 3].forEach(i => t.bbox(1.6, .2, .1, 1, 1 + i * .75, -5.38, [0x34d399, 0xff5a8a, 0x2bd4ff, 0xffd166][i]));
  };

  /* ============ AVIATION ============ */
  /* Garuda Indonesia: terminal with a curved roof, control tower, runway with moving aircraft and a parked plane in blue livery */
  B.garuda = (t, b) => {
    const blue = 0x0d6ebc;
    slab(t, 36, 34, 0, 0, 0x23293f); t.box(34, .12, 5, 0, .5, -9, 0x1a2033);
    for (let i = 0; i < 9; i++) t.bbox(2, .05, .3, -15 + i * 3.8, .62, -9, 0xffffff);
    t.box(20, 4, 7, -2, .5, 8, 0xe8eefc); gable(t, 21, 8, 1.8, -2, 4.5, 8, blue);
    t.glass(20, 3, .4, -2, .5, 11.6, 0x6bd0ff); t.label('Garuda Indonesia', 10, 1.4, -2, 6.8, 11.9, '#fff', '#0d6ebc');
    t.cyl(.7, 1.1, 14, 12, .5, 7, 0xe8eefc, 10); t.glass(3.2, 2.2, 3.2, 12, 14.5, 7, 0x6bd0ff); t.bbox(3.8, .35, 3.8, 12, 16.7, 7, blue); t.blink(12, 18.2, 7);
    t.box(9, 4.6, 7, 9, .5, -13, 0x8a94b8); roofV(t, 9.4, 7.4, 1.6, 9, 5.1, -13, 0x6b7a99);
    const pk = t.plane({ s: 1.5, body: 0xf4f7ff, wing: 0xdde6ff, tail: blue }); pk.position.set(-10, 2.1, 3.2); pk.rotation.y = PI / 2; t.g.add(pk);
    const fly = t.plane({ s: 1.5, body: 0xf4f7ff, wing: 0xdde6ff, tail: blue }); t.g.add(fly);
    t.anim(tm => { const u = (tm * .18) % 1; fly.position.set(-17 + 34 * u, .9 + Math.max(0, u - .55) * 22, -9); fly.rotation.z = Math.max(0, u - .55) * .35; });
    const taxi = t.plane({ s: 1.2, body: 0xf4f7ff, wing: 0xdde6ff, tail: 0x1fb5a8 }); taxi.position.y = 1; t.g.add(taxi); t.anim(tm => { const u = (tm * .08) % 1; taxi.position.set(16 - 32 * u, 1, -13.5); taxi.rotation.y = PI; });
    for (let i = 0; i < 3; i++) { t.cyl(.3, .3, 2, -9 + i * 4.5, .5, 5, 0xffd166, 6); }
  };
  /* ASDP: ferries: a ferry shuttling between two piers, ramp, terminal and a lighthouse */
  B.asdp = (t, b) => {
    t.box(10, .5, b.r * 2, 0, -.3, 0, 0x1f3a6a); slab(t, 7, 12, -9, 0, 0x4a5578); slab(t, 7, 12, 9, 0, 0x4a5578);
    t.box(5, 3, 7, -10, .5, 4, 0xe8eefc); roofV(t, 5.6, 7.6, 1.2, -10, 3.5, 4, 0x1fb5a8); t.label('ASDP', 4.4, 1.1, -10, 2.2, 7.55, '#fff', '#0b5ea8');
    t.cyl(.8, 1.2, 7, 10, .5, -4, 0xffffff, 10); t.cyl(1, 1, .9, 10, 7.5, -4, 0xff5a36, 10); t.glow('rgba(255,230,140,.95)', 7, 10, 8.2, -4, 3);
    const f = t.ship({ L: 20, W: 7, hh: 2.2, hull: 0xe8eefc, stripe: 0x1fb5a8, decks: 2, funnel: 0xff9a3d }); t.g.add(f); f.position.y = .1;
    t.anim(tm => { const u = (Math.sin(tm * .35) + 1) / 2, p = -7 + 14 * u; f.position.set(p, .2, 0); f.rotation.y = Math.cos(tm * .35) > 0 ? PI / 2 : -PI / 2; });
    [-4, 4].forEach((z, i) => { const c = car(t, [0xff6b6b, 0x4dd2ff][i]); c.position.set(9, .5, z - 1); t.g.add(c); c.rotation.y = PI / 2; });
    [[-1, 1], [1, 1]].forEach(q => t.cyl(.35, .35, 2.2, q[0] * 5.4, .1, q[1] * 3.2 - 5, 0xffd166, 6));
  };
  /* InJourney: tourism & airports: a resort pavilion with a terminal wing and a hot-air balloon above */
  B.injourney = (t, b) => {
    slab(t, 34, 34, 0, 0, 0x1f3a4a); t.box(16, 3, 8, -6, .5, 6, 0xfff1d6); roofV(t, 17, 9, 3.2, -6, 3.5, 6, 0xff9a3d); [-12, -8, -4, 0].forEach(x => t.bbox(.5, 3, .5, x, .5, 10.3, 0xffffff));
    t.label('InJourney', 9, 1.4, -6, 6.4, 8, '#fff', '#0f766e');
    t.box(.6, 20, .6, 10, 0, -8, 0xe8eefc); t.box(10, 3, 5, 6, .5, -8, 0xfaf3e0); t.glass(11, 5, 1, 6, 3.5, -5.2, 0x2dd4bf);
    const pool = t.box(8, .25, 5, -8, .5, -8, 0x2dd4bf); t.glow('rgba(45,212,191,.7)', 12, -8, 1.5, -8, 2);
    [0, 1, 2].forEach(i => { t.cyl(.25, .4, 5 - i, -13 + i * 2.2, .5, -3, 0x8a6a3a, 6); [0, 1, 2, 3].forEach(k => cone(t, .3, 2.6, -13 + i * 2.2 + Math.cos(k * 1.6) * 1.1, 4 - i, -3 + Math.sin(k * 1.6) * 1.1, 0x1f7a4a, 5)); });
    const bal = t.grp(0, 0, 0), env = t.sph(3.2, 0, 0, 0, 0xff6b6b, bal); env.scale.y = 1.2; t.cyl(.5, 1.2, 2, 0, -4.6, 0, 0xffd166, 6, bal); t.bbox(1.6, 1, 1.6, 0, -6.6, 0, 0x8a6a3a, bal);
    t.anim(tm => { bal.position.set(8 + Math.sin(tm * .3) * 3, 21 + Math.sin(tm * .8) * 1, 8 + Math.cos(tm * .3) * 3); });
    const pl = t.plane({ s: 1.1, body: 0xfff1d6, tail: 0xff9a3d }); t.g.add(pl); t.anim(tm => { const a = tm * .3; pl.position.set(Math.cos(a) * 14, 18, Math.sin(a) * 14); pl.rotation.y = -a; });
  };

  /* ============ MINING, WATER, FOREST, PLANTATION, FOOD ============ */
  /* MIND ID: mining holding: a stepped open pit with haul trucks, a conveyor to a smelter with stacks, ore piles and a shovel */
  B.mind = (t, b) => {
    const col = [0x6b5a8a, 0x7d6aa3, 0x9079bd, 0xa78bfa];
    for (let i = 0; i < 4; i++) t.cyl(16 - i * 3.4, 17 - i * 3.4, .9, -4, i * .9, 3, col[i], 28);
    t.cyl(5, 5, .3, -4, 3.6, 3, 0x1a1530, 28);
    const run = new t.T.Group(); t.g.add(run);
    [0, 1].forEach(k => { const tr = truck4(t, 0xffb020); t.g.add(tr); t.anim(tm => { const a = tm * .5 + k * PI, r = 7 + (Math.sin(tm * .25 + k) + 1) * 2.4; tr.position.set(-4 + Math.cos(a) * r, 3.2 - (r - 7) * .35 + .2, 3 + Math.sin(a) * r); tr.rotation.y = -a - PI / 2; }); });
    t.box(1.4, 1.2, 14, 13, .6, -2, 0x394a74); t.lines([13, 1.4, 5, 13, 4, -9], 0xffd166, .9);
    const belt = t.box(1.2, .3, 16, 9, 1.4, -4, 0x2a3358); belt.rotation.x = .22;
    [0, 1, 2, 3, 4].forEach(i => { const o = t.sph(.5, 9, 2.1, 2 - i * 2.8, 0xb7a6ff); t.anim(tm => { const u = (tm * .3 + i / 5) % 1; o.position.set(9, 1.7 + (1 - u) * 3.2 * .22 * 0 + u * 2.6, 3 - u * 15); }); });
    t.box(9, 6, 7, 13, 0, -11, 0x394a74); [0, 1, 2].forEach(i => { t.cyl(.9, 1.3, 14 + i * 2, 11 + i * 2.6, 6, -11, 0x39467a, 10); t.smoke(11 + i * 2.6, 21 + i * 2, -11, 1.4); });
    t.glow('rgba(255,140,60,.9)', 6, 13, 4, -7.4, 3);
    [[-18, -10], [-14, -14], [-10, -16]].forEach((p, i) => cone(t, 3.4, 4 + i, p[0], 0, p[1], [0xb7a6ff, 0x8b7cff, 0xa78bfa][i], 10));
    const sh = t.grp(-4, 3.6, 3); t.box(2.4, 1.4, 3.4, 0, 0, 0, 0xffc857, sh); const arm = t.box(.5, .5, 5, 0, 1.4, 2.4, 0xff9a3d, sh); arm.rotation.x = -.6; t.anim(tm => { sh.rotation.y = Math.sin(tm * .5) * 1.1; });
    t.label('MIND ID', 8, 1.6, 12, 8.6, -7.4, '#fff', '#5b21b6');
  };
  const truck4 = (t, c) => { const g = t.grp(0, 0, 0); t.bbox(3.4, 1.6, 2, 0, .8, 0, c, g); t.bbox(1.4, 1.5, 1.9, 2, .7, 0, 0xeaf0ff, g); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => t.bbox(.9, .9, .3, q[0] * 1.1, 0, q[1] * 1, 0x1a1a24, g)); return g; };
  /* PTPN: plantations: terraced tea/palm rows, a processing mill with chimney, drying racks and a harvest truck */
  B.ptpn = (t, b) => {
    const T = t.T, rows = [];
    for (let r = 0; r < 5; r++) for (let i = 0; i < 9; i++) rows.push({ x: -12 + i * 2.6, y: .9 + r * .15, z: -12 + r * 3.6, sy: 1, sx: 1, sz: 1 });
    t.inst(new T.SphereGeometry(1.1, 8, 6), t.std(0x3f9b4a), rows); for (let r = 0; r < 5; r++) t.box(25, .5 + r * .15, 1, 0, 0, -12 + r * 3.6, 0x6b4a2a);
    const pal = []; for (let i = 0; i < 7; i++) pal.push({ x: -13 + i * 3.4, y: 3.6, z: 7 + (i % 2) * 2.2 }); t.inst(new T.CylinderGeometry(.22, .35, 7, 6), t.std(0x8a6a3a), pal);
    pal.forEach((p, i) => { for (let k = 0; k < 6; k++) { const l = t.add(new T.BoxGeometry(.3, .12, 3), t.std(0x2f8f46), p.x + Math.cos(k * 1.05) * 1.3, 7.2, p.z + Math.sin(k * 1.05) * 1.3); l.rotation.y = -k * 1.05; l.rotation.x = .5; } });
    t.box(10, 5, 7, 9, 0, 3, 0xd9c9a3); gable(t, 10.4, 7.4, 2.6, 9, 5, 3, 0xb4572c); t.cyl(.8, 1.2, 12, 14, 0, 6, 0x9a7a5a, 10); t.smoke(14, 12.4, 6, 1.2); t.label('PTPN', 5, 1.4, 9, 3.2, 6.55, '#fff', '#2e7d32');
    for (let i = 0; i < 3; i++) t.box(4, .3, 1.6, 4 + i * 4.4, 1.4, 11, 0xc9a96b);
    const tk = truck4(t, 0x4caf50); t.g.add(tk); t.anim(tm => { const u = (tm * .1) % 1; tk.position.set(-15 + 30 * u, .1, 14.5); });
  };
  /* Brantas: river works: a weir wall with sluice gates, animated spillway water, a hydro powerhouse and pylons */
  B.brantas = (t, b) => {
    t.box(34, .4, 26, 0, 0, 0, 0x1d5a82); t.box(24, 5, 2.6, 0, .4, -2, 0xb7c0d6);
    for (let i = 0; i < 5; i++) { t.box(3.4, 4, .8, -9 + i * 4.5, .6, -.5, 0x6b7a99); t.bbox(.4, 6.5, .4, -9 + i * 4.5, .4, -.5, 0x394a74); t.bbox(.4, .4, .4, -9 + i * 4.5, 6.8, -.5, 0xffd166); }
    for (let i = 0; i < 5; i++) { const w = t.box(3.2, .12, 7, -9 + i * 4.5, .45, 3.4, 0x4dd2ff); t.anim(tm => { w.material.emissiveIntensity = .5 + .5 * Math.sin(tm * 3 + i); }); }
    t.box(10, .3, 6, 0, .4, -9, 0x2d7fb0); t.box(10, 5, 6, 12, .4, 6, 0xe8eefc); gable(t, 10.4, 6.4, 2.4, 12, 5.4, 6, 0x2d7fb0); t.label('Brantas', 6, 1.2, 12, 3.4, 9.1, '#fff', '#0b5ea8');
    [[-14, 8], [-16, -4], [16, -8]].forEach((p, i) => { lattice(t, 12, 1.6, p[0], p[1], 0xb7c0d6); });
    t.lines([-14, 11, 8, -16, 11, -4, -16, 11, -4, 16, 11, -8], 0xdde6ff, .6);
    t.glow('rgba(80,200,255,.8)', 12, 0, 2, 3, 2.4); t.glow('rgba(255,230,140,.9)', 5, 12, 6, 6, 3);
    for (let k = 0; k < 6; k++) { const d = t.sph(.3, 0, 0, 0, 0x9be4ff); t.anim(tm => { const u = (tm * .4 + k / 6) % 1; d.position.set(-9 + (k % 5) * 4.5, 3.2 - u * 2.6, -.2 + u * 6); }); }
  };
  /* ID Survey (IDSurvey): inspection group: lab block with a rotating survey radar, theodolite tripods, a sampling crane and a stamp seal */
  B.idsurvey = (t, b) => {
    slab(t, 20, 18, 0, 0, 0x2a3358); t.glass(10, 7, 7, -3, .5, 2, 0x94a3b8); t.bbox(10.6, .5, 7.6, -3, 7.5, 2, 0xe2e8f0); t.label('IDSurvey', 8, 1.4, -3, 4.5, 5.6, '#fff', '#334155');
    t.cyl(.2, .2, 4, 3, 8, 2, 0xdde6ff, 6); const rd = t.grp(3, 12.2, 2); t.box(6, .3, .6, 0, 0, 0, 0xe8eefc, rd); t.box(.6, 1, .6, 0, -.6, 0, 0x94a3b8, rd); t.anim(tm => { rd.rotation.y = tm * 1.2; });
    [[6, 6], [8, 3], [8, -2]].forEach(p => { [[-1, 0], [1, 0], [0, 1]].forEach(l => t.beam(p[0] + l[0] * .9, 0, p[1] + l[1] * .9, p[0], 3, p[1], .12, 0xb7c0d6)); t.bbox(.9, .9, .9, p[0], 3, p[1], 0xffc857); });
    const cr = t.grp(-8, 0, -6); t.box(.7, 9, .7, 0, 0, 0, 0x94a3b8, cr); t.box(.5, .5, 8, 0, 9, 3.6, 0x94a3b8, cr); const hk = t.bbox(1, .8, 1, 0, 7.4, 6.5, 0xffd166, cr); t.anim(tm => { hk.position.y = 7 + Math.sin(tm) * 1.2; });
    t.sph(1.4, 7, 1.4, -7, 0xff9a3d); t.cyl(1.2, 1.2, 2.2, 3, .5, -8, 0xcbd5e1, 12); t.glow('rgba(148,163,184,.8)', 8, 3, 3, -8, 2);
  };
  /* Amarta Karya: contractor: a half-built concrete frame, a luffing tower crane, scaffolding and a mixer truck */
  B.amarta = (t, b) => {
    slab(t, 22, 20, 0, 0, 0x2a3358);
    for (let f = 0; f < 4; f++) { t.box(10, .5, 8, -3, .5 + f * 3.4, -2, 0xb7c0d6); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(q => t.bbox(.6, 3.4, .6, -3 + q[0] * 4.6, .5 + f * 3.4, -2 + q[1] * 3.6, 0xcbd5e1)); }
    t.bbox(.2, 14, .2, -8.2, .5, -5.9, 0xffd166); t.bbox(.2, 14, .2, -8.2, .5, 1.9, 0xffd166); for (let k = 0; k < 7; k++) t.bbox(.15, .15, 7.8, -8.2, 1.2 + k * 2, -2, 0xffd166);
    const cr = t.grp(7, 0, -2); t.box(1.2, 24, 1.2, 0, 0, 0, 0xff9a3d, cr); for (let k = 0; k < 6; k++) t.bbox(1.3, .2, 1.3, 0, 2 + k * 4, 0, 0xffffff, cr);
    const jib = t.grp(0, 24, 0, cr); t.box(18, .8, .8, -4, 0, 0, 0xff9a3d, jib); t.box(5, 1.2, 1.2, 8, -.2, 0, 0x6b7a99, jib); t.box(.3, 4, .3, 0, .8, 0, 0xff9a3d, jib); const hk = t.bbox(1.4, .6, 1.4, -10, -5, 0, 0xffd166, jib); t.bbox(.08, 5, .08, -10, -4.5, 0, 0xffffff, jib);
    t.anim(tm => { jib.rotation.y = Math.sin(tm * .25) * 1.2; hk.position.y = -5 + Math.sin(tm * .8); }); t.blink(7, 26, -2);
    const mx = t.grp(0, 0, 0); t.bbox(4, 1.5, 2, 0, .6, 0, 0xe8eefc, mx); const dr = t.add(new t.T.CylinderGeometry(1.1, .7, 2.6, 12), t.std(0xff9a3d), -.4, 2.1, 0, mx); dr.rotation.z = PI / 2.6; t.anim(tm => { dr.rotation.x = tm; }); t.g.add(mx); mover(t, mx, -9, 9, 8.5, .1, 0, 0);
    t.label('Amarta Karya', 8, 1.4, 0, 6.7, 6, '#fff', '#c2410c');
  };

  /* ============ FINANCE & INSURANCE ============ */
  /* Pegadaian: pawnshop: a green-gold branch with a vault door, a pyramid of gold bars, scales and a glowing coin ring */
  B.pegadaian = (t, b) => {
    t.box(18, .8, 18, 0, 0, 0, 0x2b3a6b); t.box(12, 6, 8, -1, .8, -2, 0xe9f7dc); roofV(t, 13, 9, 2.4, -1, 6.8, -2, 0x2f9e5a); [-5, -2.5, 0, 2.5].forEach(x => t.bbox(.7, 5.6, .7, x, .8, 2.3, 0xffffff));
    t.label('Pegadaian', 8, 1.5, -1, 7, 2.15, '#fff', '#15803d');
    for (let r = 0; r < 4; r++) for (let i = 0; i < 4 - r; i++) { t.bbox(2, .7, 1.1, 5.4 + i * 2.1 + r * 1.05, .8 + r * .75, 6, 0xffc857); }
    t.glow('rgba(255,210,90,.95)', 10, 8.5, 3, 6, 2);
    const v = t.cyl(2.4, 2.4, .8, -6, 1, -8, 0x94a3b8, 24); v.rotation.x = PI / 2; v.position.y = 3.2; t.cyl(.5, .5, 1, -6, 3.2, -7.5, 0xffc857, 10).rotation.x = PI / 2;
    const sc = t.grp(5, 6, -8); t.bbox(.3, 5, .3, 0, 0, 0, 0xffc857, sc); const beam = t.grp(0, 5, 0, sc); t.bbox(6, .25, .25, 0, 0, 0, 0xffc857, beam); [-3, 3].forEach(x => t.cyl(1.2, 1.2, .15, x, -1.6, 0, 0xffd166, 14, beam)); t.anim(tm => { beam.rotation.z = Math.sin(tm * 1.4) * .12; });
    const ring = t.ring(1, 1.1, 0xffc857, null, true); t.anim(tm => { const u = (tm % 3) / 3; ring.scale.setScalar(6 + u * 9); ring.material.opacity = (1 - u) * .8 * t.ent.a; });
  };
  /* PNM: micro-finance (Mekaar): a market of stalls with striped awnings, a small bank counter and a loan group gathering */
  B.pnm = (t, b) => {
    slab(t, 17, 17, 0, 0, 0x4a5578); const cs = [0xff6ad5, 0xffd166, 0x6ee7b7, 0x4dd2ff, 0xff9a3d, 0xc084fc];
    for (let i = 0; i < 6; i++) { const x = -6 + (i % 3) * 5.6, z = -5 + Math.floor(i / 3) * 6; t.box(3.6, 1.2, 2, x, .5, z, 0x8a6a3a); roofV(t, 4.6, 3.4, 1.5, x, 3.4, z, cs[i]); [-1.9, 1.9].forEach(dx => t.bbox(.18, 2.2, .18, x + dx, .5, z + 1.2, 0xe8eefc)); for (let k = 0; k < 3; k++) t.sph(.35, x - 1 + k, 1.9, z, cs[(i + k + 2) % 6]); }
    t.box(5, 3.6, 3.4, 6, .5, 6.2, 0xe9d5ff); roofV(t, 5.6, 4, 1.4, 6, 4.1, 6.2, 0x9d4edd); t.label('PNM', 4, 1.2, 6, 2.7, 7.95, '#fff', '#7c3aed');
    for (let i = 0; i < 6; i++) { const m = t.grp(-4 + i * 1.3, 0, 6.5); t.cyl(.45, .5, 1.6, 0, .5, 0, cs[i], 8, m); t.sph(.4, 0, 2.5, 0, 0xf1c8a0, m); t.anim(tm => { m.position.y = Math.max(0, Math.sin(tm * 3 + i * 1.7)) * .25; }); }
    t.glow('rgba(255,170,230,.8)', 14, 0, 4, 0, 2);
  };
  /* IFG: insurance holding: a tower under a giant umbrella that opens and closes, shielding small houses */
  B.ifg = (t, b) => {
    const H = b.h; t.box(18, .8, 18, 0, 0, 0, 0x2b3a6b); t.glass(6, H * .8, 6, 0, .8, 0, 0xc084fc); t.bbox(6.6, .5, 6.6, 0, .8 + H * .8, 0, 0xe9d5ff);
    const um = t.grp(0, H * .8 + 3, 0); t.cyl(.15, .15, 6, 0, -.5, 0, 0xe9d5ff, 6, um);
    const dome = t.add(new t.T.SphereGeometry(7.2, 20, 8, 0, PI * 2, 0, PI * .5), t.std(0xa855f7, { side: t.T.DoubleSide, transparent: true, opacity: .75 }), 0, 5.5, 0, um);
    for (let k = 0; k < 8; k++) { const a = k * PI / 4; t.beam(Math.cos(a) * 7.2, 5.5, Math.sin(a) * 7.2, 0, 11.7, 0, .12, 0xe9d5ff, um); }
    t.anim(tm => { const s = 1 + Math.sin(tm * .9) * .07; um.scale.set(s, 1 + Math.sin(tm * .9) * .04, s); });
    [[-6, 6], [6, 6], [-6, -6], [6, -6]].forEach((p, i) => { t.box(2.6, 1.8, 2.4, p[0], .8, p[1], [0xfff1c9, 0xcfe8ff, 0xffd9c2, 0xd8f5d0][i]); roofV(t, 3.4, 3.2, 1.3, p[0], 2.6, p[1], 0xc084fc); });
    t.label('IFG', 4, 1.2, 0, 2.5, 3.1, '#fff', '#7e22ce'); t.blink(0, H * .8 + 13, 0, 'rgba(200,140,255,1)'); t.glow('rgba(190,130,255,.8)', 16, 0, H * .8 + 6, 0, 2);
  };
  /* Indonesia Re: reinsurance: a spinning globe with orbit rings on a curved shield pedestal */
  B.indonesiare = (t, b) => {
    t.cyl(8.6, 9.2, 1, 0, 0, 0, 0x2b3a6b, 32); t.cyl(6, 7, 1.6, 0, 1, 0, 0x39467a, 32); t.label('Indonesia Re', 9, 1.4, 0, 1.9, 6.1, '#fff', '#6d28d9');
    const gl = t.grp(0, 12, 0); const earth = t.sph(5, 0, 0, 0, 0x3b82f6, gl); t.add(new t.T.SphereGeometry(5.06, 14, 10), t.bas(0x9be4ff, { wireframe: true, transparent: true, opacity: .55 }), 0, 0, 0, gl);
    [[-2, 1, 3, 1.6], [1.5, 2.2, -3.4, 1.2], [3, -1.8, 2.5, 1.4]].forEach(l => t.sph(l[3], l[0], l[1], l[2], 0x34d399, gl).scale.set(1, .35, 1));
    t.anim(tm => { gl.rotation.y = tm * .35; }); [0, 1].forEach(k => { const r = t.ring(1, 12, 0xc084fc, null, true); r.rotation.set(PI / 2 + (k ? .5 : -.5), k ? .6 : 0, 0); r.scale.setScalar(7.6 + k * 1.4); });
    t.cyl(.25, .25, 6, 0, 3, 0, 0xdde6ff, 8); const sh = t.add(new t.T.CylinderGeometry(2.6, 2.6, .5, 3), t.std(0xc084fc), 0, 4.2, 6.5); sh.rotation.x = PI / 2; sh.scale.set(1, 1, 1.1);
    t.glow('rgba(160,200,255,.9)', 16, 0, 12, 0, 2);
  };
  /* Taspen/others keep their versions; the shipyards below share one builder with their own ship type */

  /* ============ INDUSTRY ============ */
  const yard2 = (t, o) => {
    slab(t, 28, 24, 0, 0, 0x23293f); t.box(21, .3, 11, -1, .4, -2, 0x0f2a4a);
    const hull = t.ship({ L: o.L, W: o.W, hh: o.hh, hull: o.hull, stripe: o.stripe, cont: o.cont, decks: o.decks, funnel: o.funnel, cab: o.cab }); hull.position.set(-1, .9, -2); t.g.add(hull);
    [-1, 1].forEach(s => { t.box(.9, 12, .9, -12, 0, -2 + s * 6.4, o.crane); t.box(.9, 12, .9, 10, 0, -2 + s * 6.4, o.crane); });
    t.box(24, 1, 1.2, -1, 12, -8.4, o.crane); t.box(24, 1, 1.2, -1, 12, 4.4, o.crane); const tr = t.grp(0, 12, -2); t.box(1.4, .8, 13, 0, 0, 0, o.crane, tr); const hk = t.bbox(1.3, 1, 1.3, 0, -3, 0, 0xffd166, tr); t.bbox(.08, 3, .08, 0, -3, 0, 0xffffff, tr);
    t.anim(tm => { tr.position.x = -1 + Math.sin(tm * .4) * 9; hk.position.y = -3 - Math.sin(tm * .9) * 1.4; });
    t.box(8, 4, 5, 10, .5, 8, 0xcfd6e6); gable(t, 8.4, 5.4, 2, 10, 4.5, 8, 0x8a94b8); t.label(o.name, 7, 1.3, 10, 2.5, 10.55, '#fff', o.sign);
    [0, 1, 2].forEach(i => { const sp = t.glow('rgba(255,200,90,1)', 3.2, -6 + i * 4, 3.2 + (i % 2) * 2, -2 + 6, 0); t.anim(tm => { sp.visible = Math.sin(tm * 17 + i * 3) > .2; }); });
    cone(t, 1, 3, -9, .5, 9, 0xff6b6b, 8); cone(t, 1, 3, -7.4, .5, 9.6, 0xffd166, 8); t.blink(-12, 12.8, -8.4);
  };
  B.dkb = (t, b) => yard2(t, { name: 'DKB Jakarta', sign: '#9a2f3a', crane: 0xc2414d, L: 20, W: 6.4, hh: 2.4, hull: 0x7a2330, stripe: 0xe8eefc, cab: 0xe8eefc, funnel: 0xffd166 });
  B.dps = (t, b) => yard2(t, { name: 'DPS Surabaya', sign: '#1d4ed8', crane: 0x3b82f6, L: 22, W: 7, hh: 2.6, hull: 0x23406e, stripe: 0xff6b6b, cont: true, cab: 0xe8eefc });
  B.iki = (t, b) => yard2(t, { name: 'IKI Makassar', sign: '#0f766e', crane: 0x2dd4bf, L: 20, W: 6.6, hh: 2.4, hull: 0xf4f7ff, stripe: 0x14b8a6, decks: 2, cab: 0xe8eefc });
  /* BBI: heavy machinery: a foundry shed with an overhead crane, a forging press, a gear wheel and glowing molten metal */
  B.bbi = (t, b) => {
    slab(t, 24, 20, 0, 0, 0x2a3358); t.box(18, 8, 10, -2, .5, -3, 0x8a94b8); gable(t, 18.4, 10.4, 3, -2, 8.5, -3, 0x6b7a99); for (let i = 0; i < 4; i++) t.bbox(2.8, 4, .1, -9 + i * 4.8, .5, 2.02, 0xffb066);
    t.box(18, .5, .5, -2, 6, -3, 0xffd166); const tr = t.bbox(1.2, .8, 1, 0, 6, -3, 0xff9a3d); t.anim(tm => { tr.position.x = -2 + Math.sin(tm * .5) * 7; });
    t.cyl(1, 1.4, 14, 8, .5, -6, 0x8a6a4a, 10); t.smoke(8, 14.8, -6, 1.5); t.glow('rgba(255,120,40,.95)', 8, 8, 14.4, -6, 4); t.glow('rgba(255,140,60,.9)', 9, -2, 3, 2.6, 5);
    const gear = t.grp(0, 5, 8.5); const gc = t.cyl(3, 3, .8, 0, 0, 0, 0xb7c0d6, 18, gear); gc.rotation.x = PI / 2; for (let k = 0; k < 10; k++) { const a = k * PI / 5; t.bbox(1, 1.2, .8, Math.cos(a) * 3.3, Math.sin(a) * 3.3, 0, 0xb7c0d6, gear).rotation.z = a; } t.anim(tm => { gear.rotation.z = tm * .5; });
    t.box(3, 6, 3, -9, .5, 8, 0x394a74); const ram = t.box(2, 3, 2, -9, 3, 8, 0xff5a36); t.anim(tm => { ram.position.y = 5.2 + Math.max(0, Math.sin(tm * 3)) * -1.8; });
    t.label('BBI', 4, 1.3, -2, 8.8, 2.1, '#fff', '#b45309');
  };
  /* Primissima: textile: sawtooth-roof mill, giant thread spools, colourful cloth rolls and a moving fabric ribbon */
  B.primissima = (t, b) => {
    slab(t, 22, 18, 0, 0, 0x2a3358); t.box(18, 4.4, 8, -1, .5, -3, 0xe9d5ff); for (let i = 0; i < 4; i++) { const r = cone(t, 2.4, 2.6, -8 + i * 4.6, 4.9, -3, 0xc084fc, 3); r.rotation.y = PI / 2; r.scale.set(1.6, 1, 1.6); }
    t.label('Primissima', 8, 1.4, -1, 3, 1.05, '#fff', '#7e22ce'); t.cyl(.8, 1, 9, 8, .5, -8, 0x9a7a9a, 8); t.smoke(8, 9.8, -8, 1);
    const cs = [0xff6ad5, 0xffd166, 0x4dd2ff, 0x6ee7b7]; cs.forEach((c, i) => { const sp = t.grp(-7 + i * 3, 0, 6); t.cyl(.15, .15, 4.4, 0, .5, 0, 0xdde6ff, 6, sp); t.cyl(1.3, 1.3, 1.6, 0, 1, 0, c, 16, sp); t.cyl(1.4, 1.4, .2, 0, .9, 0, 0xffffff, 16, sp); t.cyl(1.4, 1.4, .2, 0, 2.6, 0, 0xffffff, 16, sp); t.anim(tm => { sp.rotation.y = tm * (.8 + i * .2); }); });
    const rb = t.box(.2, 3.2, 14, 9, 2, 0, 0xff6ad5); t.anim(tm => { rb.material.emissiveIntensity = .3 + .3 * Math.sin(tm * 2); });
    for (let i = 0; i < 5; i++) { const r = t.cyl(.9, .9, 3.4, 8 - i * 0, .5 + (i % 2) * 0, 5 + i * 0, cs[i % 4], 12); r.rotation.z = PI / 2; r.position.set(6 + (i % 3) * 2, .9 + Math.floor(i / 3) * 1.8, 6.6 + Math.floor(i / 3) * 0); }
  };

  /* ============ ORGANISATION ENTITIES ============ */
  /* Danantara Investment Management: twin towers with a skybridge, rising bars and a glowing globe of capital */
  B.dim = (t, b) => {
    const H = b.h; t.box(14, .6, 12, 0, 0, 0, 0x2a3358); [-4, 4].forEach((x, i) => { t.glass(4.4, H * (i ? .86 : 1), 4.4, x, .6, 0, 0xffc857); t.bbox(5, .6, 5, x, .6 + H * (i ? .86 : 1), 0, 0xfff1b0); });
    t.bbox(4, 1.6, 2.4, 0, H * .55, 0, 0xffc857); t.bbox(4.2, .3, 2.6, 0, H * .55 + 1.6, 0, 0xfff1b0);
    [[-5.5, 4], [-3, 7], [-.5, 5], [2, 9], [4.5, 6.5]].forEach((c, i) => { const bar = t.bbox(1.2, c[1], 1.2, c[0], .6, 5, [0x34d399, 0xffc857][i % 2]); t.anim(tm => { bar.scale.y = .85 + .15 * Math.sin(tm * 1.5 + i); }); });
    const orb = t.sph(1.6, 0, H + 5, 0, 0xffe9b0); t.glow('rgba(255,220,120,.95)', 12, 0, H + 5, 0, 2); t.anim(tm => { orb.position.y = H + 5 + Math.sin(tm * 1.3) * .8; }); t.label('DIM', 4, 1.2, 0, 3, 6.1, '#3b2a00', '#ffc857');
  };
  /* Danantara Development & Management Fund: vault drum, rising crane and a ring of coins */
  B.ddmf = (t, b) => {
    t.box(13, .6, 13, 0, 0, 0, 0x2a3358); const d = t.cyl(4.6, 4.6, 3, 0, .6, 0, 0xffc857, 28); t.cyl(4.9, 4.9, .5, 0, 3.6, 0, 0xfff1b0, 28); t.cyl(3.3, 3.3, 8, 0, 4, 0, 0xe9b64a, 24);
    const door = t.cyl(2, 2, .5, 0, 1, 4.6, 0x94a3b8, 24); door.rotation.x = PI / 2; door.position.y = 2.1; t.cyl(.45, .45, .7, 0, 1, 4.6, 0xffc857, 10).rotation.x = PI / 2;
    const cr = t.grp(5.5, 0, -3); t.box(.7, 14, .7, 0, 0, 0, 0xffc857, cr); const jb = t.grp(0, 14, 0, cr); t.box(9, .6, .6, -3, 0, 0, 0xffc857, jb); const hk = t.bbox(1, 1, 1, -6, -4, 0, 0xffd166, jb); t.anim(tm => { jb.rotation.y = Math.sin(tm * .3) * .8; hk.position.y = -4 + Math.sin(tm) * 1; });
    [0, 1, 2, 3, 4].forEach(i => { const c = t.cyl(.9, .9, .25, 0, 0, 0, 0xffd166, 16); t.anim(tm => { const a = tm * .8 + i * 1.256; c.position.set(Math.cos(a) * 7, 11 + Math.sin(tm * 2 + i) * .5, Math.sin(a) * 7); c.rotation.x = tm + i; }); });
    t.label('DDMF', 4, 1.2, 0, 8.4, 3.4, '#3b2a00', '#ffc857'); t.glow('rgba(255,200,90,.9)', 14, 0, 6, 0, 2);
  };
  /* Danantara Asset Management: operational holding: gears around a central tower */
  B.dam = (t, b) => {
    const H = b.h; t.box(13, .6, 13, 0, 0, 0, 0x2a3358); t.glass(4.6, H, 4.6, 0, .6, 0, 0xffc857); t.bbox(5.4, .6, 5.4, 0, .6 + H, 0, 0xfff1b0); t.bbox(.3, 6, .3, 0, H + 1.2, 0, 0xdde6ff); t.blink(0, H + 7.6, 0);
    [[-6, 5, 1.3, .5], [6, -5, 1.1, -.7], [5.6, 5, .8, 1], [-5.5, -5.5, .9, -.9]].forEach((g, i) => { const gr = t.grp(g[0], 2.6 + i * .8, g[1]); const c = t.cyl(2.2 * g[2], 2.2 * g[2], .7, 0, 0, 0, 0xffc857, 16, gr); c.rotation.x = PI / 2; for (let k = 0; k < 10; k++) { const a = k * PI / 5; t.bbox(.7, .9, .7, Math.cos(a) * 2.5 * g[2], Math.sin(a) * 2.5 * g[2], 0, 0xffc857, gr).rotation.z = a; } t.anim(tm => { gr.rotation.z = tm * g[3]; }); });
    t.label('DAM', 4, 1.2, 0, 3, 2.4, '#3b2a00', '#ffc857'); t.glow('rgba(255,200,90,.9)', 14, 0, H * .5, 0, 2);
  };
})();
