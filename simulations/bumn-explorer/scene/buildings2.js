/* BUMN Explorer: builders for the second wave of companies (ids 28-50). Same toolbox as buildings.js: MBALAB.bumn.builders[id](t, b).
   Local coordinates: the site centre is (0,0); sites on the coast have the sea towards -z. */
(function () {
  window.MBALAB = window.MBALAB || {}; MBALAB.bumn = MBALAB.bumn || {};
  const B = MBALAB.bumn.builders, PI = Math.PI;
  const roof = (t, w, d, h, x, y, z, c, par) => { const r = t.add(new t.T.ConeGeometry(Math.max(w, d) * .7071, h, 4), t.std(c, { flatShading: true }), x, y + h / 2, z, par); r.rotation.y = PI / 4; r.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d)); return r; };
  const tree = (t, x, z, h, c) => { t.cyl(.3, .45, h * .45, x, 0, z, 0x6a4a2a, 6); t.add(new t.T.ConeGeometry(h * .32, h * .75, 7), t.std(c || 0x1f7a4a, { flatShading: true }), x, h * .45 + h * .37, z); };
  const truck = (t, c, par) => { const g = t.grp(0, 0, 0, par); t.bbox(3.2, 1.3, 1.6, 0, .5, 0, c, g); t.bbox(1.2, 1.5, 1.6, 1.8, .5, 0, 0xeaf0ff, g); return g; };
  const bus = (t, x, z, c, ry, par) => { const g = t.grp(x, 0, z, par); g.rotation.y = ry || 0; t.bbox(8, 2.4, 2.8, 0, .4, 0, c, g); t.bbox(8.05, .9, 2.85, 0, 1.5, 0, 0x1b2340, g); t.bbox(8.1, .2, 2.9, 0, 1.2, 0, 0xffd166, g); return g; };
  const lamp = (t, x, z, h) => { t.cyl(.12, .16, h || 5, x, 0, z, 0x2b3350, 8); t.glow('rgba(255,225,150,.95)', 5, x, (h || 5) + .6, z, 0); };
  const spin = (t, g, sp, ax) => t.anim(tm => { g.rotation[ax || 'y'] = tm * sp; });
  const lap = (t, m, r, sp, ph, cx, cz, y) => t.anim(tm => { const a = tm * sp + ph; m.position.set(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r); m.rotation.y = -a - PI / 2; });

  /* ---------- finance ---------- */
  B.bsi = (t, b) => {
    t.box(22, 2.4, 16, 0, 0, 0, 0xe9dfc8); t.glass(8, 34, 8, 4, 2.4, -2, 0x34d399); t.bbox(8.4, .8, 8.4, 4, 36.4, -2, 0xffd166); t.bbox(.3, 6, .3, 4, 37.2, -2, 0xdde6ff); t.blink(4, 43.4, -2);
    t.box(9, 6, 8, -6.5, 2.4, 3, 0xffffff); t.add(new t.T.SphereGeometry(4.4, 18, 10, 0, PI * 2, 0, PI / 2), t.std(0x2fae6b), -6.5, 8.4, 3);
    t.cyl(.3, .3, 3, -6.5, 12.6, 3, 0xffd166, 6); t.sph(.55, -6.5, 15.9, 3, 0xffd166);
    [[-11.4, -1.6], [-1.6, -1.6], [-11.4, 7.6], [-1.6, 7.6]].forEach(p => { t.cyl(.55, .6, 11, p[0], 2.4, p[1], 0xf4f7ff, 10); t.cyl(.2, .55, 1.2, p[0], 13.4, p[1], 0x2fae6b, 10); t.sph(.4, p[0], 14.9, p[1], 0xffd166); });
    t.glow('rgba(52,211,153,.7)', 30, 4, 20, -2, 1.3);
  };
  B.pegadaian = (t, b) => {
    t.box(18, 1, 11, 0, 0, 0, 0x6b5a2a); t.box(16, 7, 9, 0, 1, 0, 0xf0e2b8); t.bbox(17, .8, 10, 0, 8, 0, 0x2fae6b); t.bbox(15, .5, 9, 0, 8.8, 0, 0xffd166);
    for (let i = 0; i < 6; i++) t.cyl(.5, .5, 7, -6.6 + i * 2.65, 1, 5.2, 0xfaf3e0, 10);
    [[-2.2, 0], [0, 0], [2.2, 0], [-1.1, 1], [1.1, 1], [0, 2]].forEach(p => t.bbox(2, .9, 1.1, p[0], 1 + p[1] * .95, 9.5, 0xffd166)); t.glow('rgba(255,210,90,.9)', 14, 0, 3, 9.5, 2);
    const sg = t.add(new t.T.CylinderGeometry(2.2, 2.2, .4, 6), t.bas(0x2fae6b), 0, 12, 0); sg.rotation.x = PI / 2; spin(t, sg, 0, 'y');
    const v = truck(t, 0xdde6ff); v.position.set(-9, .1, 9); t.anim(tm => { v.position.x = -9 + (Math.sin(tm * .3) * .5 + .5) * 18; });
    lamp(t, -8, 12); lamp(t, 8, 12);
  };
  B.pnm = (t, b) => {
    t.box(11, 6, 7, 0, 0, -5, 0xcfeee8); t.bbox(11.6, .7, 7.6, 0, 6, -5, 0x14b8a6); roof(t, 11.6, 7.6, 3, 0, 6.7, -5, 0x0f766e);
    [-1, 1].forEach(s => { for (let i = 0; i < 4; i++) { const x = -7.5 + i * 5, z = 3 + (s + 1) * 2.4; const cc = [0xff6b6b, 0xffd166, 0x4dd2ff, 0xa78bfa, 0x34d399][(i + (s > 0 ? 2 : 0)) % 5]; t.box(3.4, 1.2, 2.2, x, 0, z, 0xe8c9a0); t.bbox(4.2, .3, 3, x, 2.6, z - .2, cc); [[-1.6], [1.6]].forEach(q => t.cyl(.1, .1, 2.6, x + q[0], 0, z + 1, 0x8a6a42, 5)); } });
    t.cyl(.5, .8, 5, 0, 0, 12, 0x6a4a2a, 7); t.sph(4, 0, 8, 12, 0x2f9a4a); t.glow('rgba(255,200,120,.9)', 18, 0, 9, 12, 1.6);
    for (let i = 0; i < 6; i++) t.glow('rgba(255,170,90,.95)', 3, -8 + i * 3.2, 3.2, 2.6, 0);
  };
  B.jasaraharja = (t, b) => {
    t.box(18, 1.4, 14, 0, 0, 0, 0x39467a); t.glass(9, 24, 9, 0, 1.4, -1, 0x5b8cff); t.bbox(9.4, .6, 9.4, 0, 25.4, -1, 0xff4d6d);
    t.cyl(.25, .25, 8, 0, 26, -1, 0xdde6ff, 6); t.add(new t.T.SphereGeometry(6, 20, 10, 0, PI * 2, 0, PI / 2), t.std(0xff4d6d, { side: t.T.DoubleSide }), 0, 31, -1); t.cyl(.2, .2, 2, 0, 31.5, -1, 0xdde6ff, 6); t.blink(0, 38.5, -1);
    t.box(5, 2.4, 3, 7, 1.4, 5, 0xffffff); t.bbox(.9, 2.6, 3.1, 7, 1.4, 5, 0xff4d6d);
    const am = t.grp(0, .2, 0); t.bbox(4.2, 1.8, 2, 0, .4, 0, 0xffffff, am); t.bbox(4.3, .5, 2.1, 0, 1.2, 0, 0xff4d6d, am); const sl = t.glow('rgba(255,70,90,1)', 4, 0, 2.6, 0, 0, am); lap(t, am, 11, .6, 0, 0, 0, .3); t.anim(tm => { sl.visible = Math.sin(tm * 9) > 0; });
  };
  B.taspen = (t, b) => {
    t.box(22, 1, 15, 0, 0, 0, 0xe6dbc0); t.box(18, 8, 9, 0, 1, -2, 0xf3ead2); t.bbox(19, .7, 10, 0, 9, -2, 0x3a5a9a);
    for (let i = 0; i < 6; i++) t.cyl(.55, .6, 8, -6 + i * 2.4, 1, 3.4, 0xfaf3e0, 14); t.box(15, 1, 3.4, 0, 9, 3.2, 0xfaf3e0);
    const pd = t.add(new t.T.CylinderGeometry(8, 8, 3.4, 3), t.std(0xf7efd9), 0, 11, 3.2); pd.rotation.x = -PI / 2; pd.scale.set(1, 1, .3);
    t.cyl(2.6, 2.6, 6, 0, 9.7, -4, 0xf3ead2, 18); t.add(new t.T.SphereGeometry(2.7, 16, 8, 0, PI * 2, 0, PI / 2), t.std(0x3a5a9a), 0, 15.7, -4);
    [[-7, 9], [7, 9]].forEach(p => { t.cyl(2.2, 2.4, .6, p[0], 0, p[1], 0xe6dbc0, 18); t.add(new t.T.CylinderGeometry(1.8, 1.8, .1, 18), t.bas(0x35b6ff), p[0], .7, p[1]); t.glow('rgba(120,210,255,.9)', 5, p[0], 2.5, p[1], 2); });
    [[-10, 8], [10, 8], [-10, -6], [10, -6]].forEach(p => tree(t, p[0], p[1], 6)); [[-3, 10], [3, 10]].forEach(p => t.bbox(2, .5, .7, p[0], .5, p[1], 0x8a5a2a));
  };

  /* ---------- telecom and media ---------- */
  B.antara = (t, b) => {
    t.box(16, 1.2, 12, 0, 0, 0, 0x39467a); t.glass(8, 22, 7, -2, 1.2, 0, 0x2bd4ff); t.glass(5, 12, 5, 5.5, 1.2, 2, 0xa78bfa);
    t.cyl(.2, .3, 16, -2, 23.2, 0, 0xdde6ff, 6); t.blink(-2, 39.6, 0); const dg = t.grp(5.5, 13.4, 2); t.add(new t.T.SphereGeometry(2, 14, 8, 0, PI * 2, 0, PI / 2), t.std(0xdde6ff, { side: t.T.DoubleSide }), 0, 0, 0, dg).rotation.x = -.9; spin(t, dg, .5);
    for (let i = 0; i < 3; i++) { const r = t.ring(1, 20, 0x2bd4ff, null, true); t.anim(tm => { const u = (tm * .45 + i / 3) % 1; r.scale.setScalar(3 + u * 13); r.material.opacity = (1 - u) * .85 * t.ent.a; }); }
    const tk = [0xff4d6d, 0xffd166, 0x34d399, 0x2bd4ff].map((c, i) => t.bbox(2.4, .5, .15, -4 + i * 2.8, 15, 3.6, c)); t.anim(tm => { tk.forEach((m, i) => { m.visible = Math.sin(tm * 3 - i) > -.4; }); });
    const van = truck(t, 0xffffff); t.bbox(.2, 1.6, .2, 0, 2.1, 0, 0xdde6ff, van); const vd = t.add(new t.T.SphereGeometry(.8, 10, 6, 0, PI * 2, 0, PI / 2), t.std(0xdde6ff), 0, 3, 0, van); lap(t, van, 9, .6, 0, 0, 5, .2);
  };
  B.telkomsel = (t, b) => {
    t.box(13, 1.2, 13, 0, 0, 0, 0x39467a); [[-5, -4], [5, 4]].forEach(p => t.box(3.2, 2.4, 2.4, p[0], 1.2, p[1], 0xdde6ff));
    t.add(new t.T.ConeGeometry(3.6, 36, 4, 1, true), t.bas(0xff3b3b, { wireframe: true }), 0, 19.2, 0).rotation.y = PI / 4; t.cyl(.2, .2, 40, 0, 1.2, 0, 0xff3b3b, 6);
    for (let i = 0; i < 3; i++) { const a = i * 2.09; t.bbox(.5, 4, 1.2, Math.cos(a) * 1.6, 33, Math.sin(a) * 1.6, 0xffffff); t.bbox(.2, .2, 1, Math.cos(a) * 1.6, 38, Math.sin(a) * 1.6, 0xff3b3b); }
    t.blink(0, 42, 0); for (let k = 0; k < 4; k++) { const r = t.ring(1, 34, 0xff3b3b, null, true); t.anim(tm => { const u = (tm * .5 + k / 4) % 1; r.scale.setScalar(2 + u * 16); r.material.opacity = (1 - u) * .9 * t.ent.a; }); }
    [[-9, 6], [9, 6]].forEach(p => { t.cyl(.2, .3, 12, p[0], 0, p[1], 0xdde6ff, 6); t.bbox(1.8, .6, .6, p[0], 12, p[1], 0xff3b3b); t.glow('rgba(255,80,80,.9)', 6, p[0], 13, p[1], 2.4); });
  };

  /* ---------- energy ---------- */
  B.pgn = (t, b) => {
    t.box(22, .6, 18, 0, 0, 0, 0x2a3350);
    [[-6, -3], [0, -3], [6, -3]].forEach((p, i) => { [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]].forEach(q => t.cyl(.25, .25, 3.4, p[0] + q[0], .6, p[1] + q[1], 0x8a94b8, 6)); t.sph(4, p[0], 7.6, p[1], 0xeef3ff); t.cyl(4.05, 4.05, .3, p[0], 7.4, p[1], 0xff7a1a, 18); });
    t.beam(-10, 2.4, 6, 10, 2.4, 6, .5, 0xffb020); t.beam(-10, 3.6, 7.4, 10, 3.6, 7.4, .5, 0xff7a1a); [-8, -3, 3, 8].forEach(x => t.cyl(.2, .2, 3.6, x, .6, 6.7, 0x8a94b8, 6));
    t.cyl(.45, .6, 22, 9, .6, -6, 0x8a94b8, 8); const fl = t.glow('rgba(255,140,40,1)', 7, 9, 23.4, -6); t.anim(tm => { fl.scale.setScalar(5.6 + Math.sin(tm * 13) * 1.4 + Math.random() * .7); });
    t.bbox(9, .4, 5, -2, 5.6, 11, 0xff7a1a); [[-5.5, 9.4], [1.5, 9.4], [-5.5, 12.6], [1.5, 12.6]].forEach(p => t.cyl(.2, .2, 5.4, p[0], 0, p[1], 0xdde6ff, 6)); [-4, 0].forEach(x => { t.box(.8, 1.6, .8, x, 0, 11, 0xff7a1a); t.bbox(.6, .5, .2, x, 1.1, 11.5, 0xffffff); });
    t.beam(-10, 1.4, 6, -30, .3, 6, .6, 0x8a94b8); t.glow('rgba(255,150,60,.6)', 36, 0, 8, 0, 1.4);
  };

  /* ---------- transport ---------- */
  B.asdp = (t, b) => {
    t.box(18, 1, 10, 0, 0, 6, 0x39467a); t.box(14, 6, 6, -2, 1, 7, 0xeaf0ff); t.bbox(14.6, .6, 6.6, -2, 7, 7, 0x2f6bff); roof(t, 14.6, 6.6, 2.4, -2, 7.6, 7, 0x1f3b6b); t.bbox(3, 1.2, .2, -2, 4.6, 4, 0xffd166);
    t.box(8, .8, 44, 5, .4, -22, 0x6b7a99); [-38, -30, -22, -14, -6].forEach(z => [1.5, 8.5].forEach(x => t.cyl(.4, .4, 3, x, -1.6, z, 0x4a5578, 6)));
    const fr = t.ship({ L: 30, W: 9.5, hh: 3, hull: 0x1f3b6b, stripe: 0xff9a3d, decks: 2, cabH: 4, funnel: 0xff9a3d }); fr.rotation.y = PI / 2; fr.position.set(-4.4, -.3, -36); t.g.add(fr);
    t.anim(tm => { fr.position.z = -36 + Math.sin(tm * .25) * 2.4; fr.position.y = -.3 + Math.sin(tm * 1.2) * .12; fr.rotation.z = Math.sin(tm * 1) * .02; });
    [[5, -4, 0xff6b6b], [5, -9, 0x4dd2ff], [5, -14, 0xffd166]].forEach(c => { const v = truck(t, c[2]); v.position.set(c[0], .9, c[1]); v.rotation.y = PI / 2; });
    lamp(t, 1.4, 3, 6); lamp(t, 8.6, -24, 6); lamp(t, 8.6, -38, 6);
  };
  B.damri = (t, b) => {
    t.box(22, .4, 22, 0, 0, 0, 0x2a3350); t.box(20, 6, 8, 0, .4, -7, 0xdde6ff); for (let i = 0; i < 3; i++) { t.add(new t.T.BoxGeometry(6.6, .4, 8.2), t.std(0x2f6bff), -6.7 + i * 6.7, 6.9, -7).rotation.z = .22; t.bbox(.3, 2.2, 8, -9.9 + i * 6.7, 6.4, -7, 0x2f6bff); }
    [0, 1, 2, 3].forEach(i => bus(t, -7.5 + i * 5, 0, i % 2 ? 0xffd166 : 0x2f6bff, PI / 2)); [0, 1, 2].forEach(i => bus(t, -5 + i * 5, 6, i % 2 ? 0x2f6bff : 0xffd166, PI / 2));
    const rb = bus(t, 0, 0, 0x34d399, 0); lap(t, rb, 9, .45, 0, 0, 3, .4); lamp(t, -10, 10); lamp(t, 10, 10);
    t.box(5, .3, 2.4, 9, 2.6, 8, 0xffffff); [[7, 6.9], [11, 6.9], [7, 9.1], [11, 9.1]].forEach(p => t.cyl(.12, .12, 2.6, p[0], 0, p[1], 0x8a94b8, 5)); t.bbox(.4, 1.6, .4, 8, 2.9, 6.7, 0x2f6bff);
  };

  /* ---------- infrastructure ---------- */
  B.wika = (t, b) => {
    t.box(26, .4, 22, 0, 0, 0, 0x4a5578);
    for (let f = 0; f < 4; f++) { t.bbox(10, .5, 8, -5, 1 + f * 4.4, -3, f < 3 ? 0xdde6ff : 0xffb020); [[-9.6, -6.6], [-.4, -6.6], [-9.6, .6], [-.4, .6]].forEach(p => t.bbox(.5, 4, .5, p[0], 1.4 + f * 4.4, p[1], 0xcfd8ff)); }
    t.glass(9.4, 11, 7.4, -5, 1.5, -3, 0x4dd2ff);
    const tw = t.grp(8, 0, 4); t.cyl(.7, .9, 38, 0, 0, 0, 0xffb020, 6, tw); for (let k = 0; k < 6; k++) t.bbox(2.2, .25, .25, 0, 4 + k * 6, 0, 0xffd166, tw);
    const jb = t.grp(0, 38, 0, tw); t.bbox(32, .8, .8, -8, 0, 0, 0xffb020, jb); t.bbox(8, .8, .8, 12, 0, 0, 0xffb020, jb); t.bbox(3, 2, 2, 14, -2, 0, 0x6b7a99, jb); t.bbox(2, 3.5, 2, 0, 0, 0, 0xffd166, jb);
    const hook = t.bbox(.9, .8, .9, -8, -10, 0, 0xff4d6d, jb); t.bbox(.1, 10, .1, -8, -10, 0, 0xffffff, jb); t.blink(0, 42, 0); t.anim(tm => { jb.rotation.y = Math.sin(tm * .25) * .9; hook.position.y = -11 + Math.sin(tm * .8) * 2; });
    [[-10, 7], [-6, 7]].forEach(p => { t.cyl(1.6, 1.8, 7, p[0], 0, p[1], 0xdde6ff, 12); t.cyl(.4, 1.6, 1.6, p[0], 7, p[1], 0xdde6ff, 12); });
    const mx = truck(t, 0xffb020); t.cyl(.8, .8, 1.8, 0, 1.5, 0, 0xdde6ff, 8, mx); lap(t, mx, 8, .5, 0, 0, 8, .1);
  };
  B.adhi = (t, b) => {
    t.box(26, .3, 14, 0, 0, 0, 0x2a3350); t.bbox(44, 1.1, 5.2, 0, 9.4, 0, 0x8a94b8); t.bbox(44, .3, .3, 0, 10.6, 2.5, 0xff9a3d); t.bbox(44, .3, .3, 0, 10.6, -2.5, 0xff9a3d);
    [-15, -5, 5, 15].forEach(x => { t.box(1.8, 9.4, 2.6, x, 0, 0, 0xcfd6e6); t.bbox(3.4, .8, 3.4, x, 8.8, 0, 0xcfd6e6); });
    t.box(12, .5, 7, 10, 10, 0, 0xdde6ff); t.bbox(12.6, .4, 7.6, 10, 14.4, 0, 0xff9a3d); [[4.6, 3], [4.6, -3], [15.4, 3], [15.4, -3]].forEach(p => t.bbox(.4, 4.4, .4, p[0], 10.2, p[1], 0xdde6ff));
    const tr = t.grp(0, 10.5, 0); [0, 1, 2].forEach(i => { t.bbox(5.6, 2.6, 3.4, i * 6, 0, 0, 0xf4f7ff, tr); t.bbox(5.7, .7, 3.5, i * 6, .9, 0, 0xff7a1a, tr); t.bbox(5.7, .7, 3.5, i * 6, 1.8, 0, 0x1b2340, tr); });
    t.anim(tm => { const u = (Math.sin(tm * .35) * .5 + .5); tr.position.x = -22 + u * 16; }); t.glow('rgba(255,150,60,.5)', 22, 10, 11, 0, 1.4);
    t.box(5, 3, 4, -10, 0, 8, 0xe6dbc0); lamp(t, 8, 8); lamp(t, -4, 8);
  };
  B.ptpp = (t, b) => {
    t.box(30, .4, 28, 0, 0, 0, 0x4a5578); t.bbox(24, 11, 3.6, 0, .4, 0, 0xcfd6e6); t.bbox(24.6, .8, 4.2, 0, 11.4, 0, 0xe6ebf5);
    for (let i = 0; i < 4; i++) t.bbox(2.2, 4.2, 3.8, -8.4 + i * 5.6, 5.6, 0, 0x2a3350);
    t.bbox(24, 8.6, 14, 0, .4, -9.2, 0x2a78c8); const wt = t.add(new t.T.PlaneGeometry(24, 8.6), t.bas(0x7fd0ff, { transparent: true, opacity: .45 }), 0, 4.8, -2.1);
    for (let i = 0; i < 4; i++) { const w = t.bbox(1.6, 4.2, .25, -8.4 + i * 5.6, .8, 2.2, 0xdff4ff); t.anim(tm => { w.visible = Math.sin(tm * 6 + i * 1.7) > -.3; }); }
    t.bbox(24, .5, 10, 0, .4, 7.4, 0x2a78c8); t.box(8, 5, 5, 10, .4, 9, 0xdde6ff); t.bbox(8.6, .5, 5.6, 10, 5.4, 9, 0xff9a3d);
    const cr = t.grp(-10, 11.2, 0); t.bbox(.6, 8, .6, 0, 0, 0, 0xffb020, cr); const jb = t.grp(0, 8, 0, cr); t.bbox(10, .4, .4, 3, 0, 0, 0xffb020, jb); t.anim(tm => { jb.rotation.y = Math.sin(tm * .3) * 1.2; });
    lamp(t, -13, 10, 6); lamp(t, 13, -12, 6);
  };
  B.perumnas = (t, b) => {
    t.box(28, .3, 26, 0, 0, 0, 0x2f7d57); const cs = [0xffd9a8, 0xf4b6a0, 0xcfd8ff, 0xffe9a8, 0xb8e6c8, 0xe8c9ff], rs = [0xc0583a, 0x3a5a9a, 0xb04a3a, 0x7a8a9a];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = -9 + c * 6, z = -4 + r * 6.2 + 2; t.box(4, 2.8, 3.6, x, .3, z, cs[(r * 4 + c) % 6]); roof(t, 4.8, 4.4, 2.2, x, 3.1, z, rs[(r + c) % 4]); t.bbox(.9, 1.2, .1, x, .5, z + 1.85, 0xffe39a); }
    [[-8, -10], [0, -10]].forEach(p => { t.box(7, 13, 5.4, p[0], .3, p[1], 0xdde6ff); for (let k = 0; k < 4; k++) t.bbox(6.2, .5, .1, p[0], 3 + k * 3, p[1] + 2.8, 0xffe39a); t.bbox(7.4, .5, 5.8, p[0], 13.3, p[1], 0xff9a3d); });
    t.cyl(.15, .15, 2.4, 8, .3, -10, 0xdde6ff, 6); t.bbox(3.6, .2, .2, 8, 2.6, -10, 0xdde6ff); [[7, -10], [9, -10]].forEach(p => t.bbox(.1, 2.2, .1, p[0], .3, p[1], 0xdde6ff));
    [[-12, 6], [12, 6], [12, -4], [-12, -4]].forEach(p => tree(t, p[0], p[1], 5)); t.bbox(.4, 3, .4, -2, .3, 13, 0xff9a3d); t.bbox(.4, 3, .4, 2, .3, 13, 0xff9a3d); t.bbox(4.4, .8, .4, 0, 3.4, 13, 0x14b8a6); lamp(t, -4, 12); lamp(t, 4, 12);
  };

  /* ---------- heavy industry ---------- */
  B.pindad = (t, b) => {
    t.box(26, .4, 24, 0, 0, 0, 0x2f3a2a); t.box(16, 5, 9, -3, .4, -6, 0x4a5a3c); t.bbox(16.6, .5, 9.6, -3, 5.4, -6, 0x2f3a2a); t.cyl(.9, 1.2, 12, 7, .4, -8, 0x8a94b8, 10); t.smoke(7, 12.8, -8, 1);
    const av = t.grp(0, 0, 0); [[-2.4, 1.5], [0, 1.5], [2.4, 1.5], [-2.4, -1.5], [0, -1.5], [2.4, -1.5]].forEach(p => { const w = t.add(new t.T.CylinderGeometry(.85, .85, .6, 12), t.std(0x1b2340), p[0], .9, p[1], av); w.rotation.x = PI / 2; });
    t.bbox(6.8, 2, 3.2, 0, .9, 0, 0x5b6b3c, av); t.bbox(4.2, 1.4, 2.6, -.4, 2.8, 0, 0x4a5a3c, av); const tu = t.grp(0, 4.2, 0, av); t.bbox(2, .9, 2, 0, 0, 0, 0x5b6b3c, tu); t.bbox(3, .3, .3, 1.8, .4, 0, 0x2f3a2a, tu); spin(t, tu, .4);
    lap(t, av, 8, .35, 0, 0, 3, .1);
    [[-12, 8], [12, 8], [-12, -11], [12, -11]].forEach(p => { t.box(2, 6, 2, p[0], .4, p[1], 0x4a5a3c); t.bbox(2.8, 1.8, 2.8, p[0], 6.4, p[1], 0x2f3a2a); t.glow('rgba(255,220,120,.9)', 4, p[0], 7.2, p[1], 0); });
    for (let i = 0; i < 6; i++) t.bbox(2.4, 1.1, 1.2, -9 + i * 3.4, .4, 10.5, 0xb09a6a); t.cyl(.15, .2, 10, -10, .4, -1, 0xdde6ff, 6); t.bbox(3, 1.6, .1, -8.5, 8.4, -1, 0xe03a3a); t.bbox(3, 1.6, .1, -8.5, 6.8, -1, 0xffffff);
  };
  B.ptdi = (t, b) => {
    t.box(34, .3, 22, 0, 0, 0, 0x2a3350); t.box(18, 6, 10, -8, .3, -6, 0xdde6ff); roof(t, 19, 11, 3.4, -8, 6.3, -6, 0x8a94b8); t.bbox(8, 4.2, .2, -8, .3, -.9, 0x2a3350);
    t.bbox(19, .5, 11, -8, 6, -6, 0xff9a3d);
    t.bbox(36, .1, 6, 0, .3, 8, 0x161c33); for (let i = 0; i < 9; i++) t.bbox(2.2, .06, .3, -15 + i * 4, .42, 8, 0xffffff);
    t.cyl(.9, 1.2, 12, 13, .3, -6, 0xdde6ff, 10); t.glass(3.6, 2.4, 3.6, 13, 12.3, -6, 0x4dd2ff); t.blink(13, 15.4, -6);
    const pl = t.plane({ s: 1.5, body: 0xeef3ff }); pl.position.set(-14, 1.8, 8); t.g.add(pl); t.anim(tm => { const u = (tm * .12) % 1; pl.position.x = -16 + u * 36; pl.position.y = 1.8 + Math.max(0, u - .55) * 40; pl.rotation.z = Math.max(0, u - .55) * .5; });
    const pk = t.plane({ s: 1.2, body: 0xdde6ff }); pk.position.set(-8, 1.6, -2); pk.rotation.y = PI / 2; t.g.add(pk);
    t.cyl(.15, .2, 8, -14, .3, 3, 0xdde6ff, 6); t.bbox(2.6, 1.2, .1, -12.8, 6.4, 3, 0xe03a3a); t.bbox(2.6, 1.2, .1, -12.8, 5.2, 3, 0xffffff);
  };
  B.inka = (t, b) => {
    t.box(26, .3, 24, 0, 0, 0, 0x2a3350); t.box(24, 6, 8, 0, .3, -8, 0xcfd8ff); roof(t, 25, 9, 3.6, 0, 6.3, -8, 0x8a94b8); t.bbox(25, .5, 9, 0, 6, -8, 0xff7a1a);
    [-3, 3].forEach(z => t.bbox(34, .3, .35, 0, .5, z, 0x9aa4c4)); for (let x = -16; x <= 16; x += 2.4) t.bbox(.5, .15, 7, x, .3, 0, 0x5e5848);
    const tr = t.grp(0, .6, 0); [0, 1, 2, 3].forEach(i => { t.bbox(7, 2.6, 3, i * 7.4, 0, 0, i === 0 ? 0xff7a1a : 0xf4f7ff, tr); t.bbox(7.1, .5, 3.1, i * 7.4, .8, 0, 0xe03a3a, tr); t.bbox(7.1, .8, 3.1, i * 7.4, 1.6, 0, 0x1b2340, tr); }); t.anim(tm => { tr.position.x = -22 + (Math.sin(tm * .28) * .5 + .5) * 14; });
    const gc = t.grp(0, 0, 6); [-9, 9].forEach(x => t.bbox(.8, 11, .8, x, 0, 0, 0xffb020, gc)); t.bbox(19, .9, 1, 0, 11, 0, 0xffb020, gc); const tl = t.bbox(2, 1.6, 1.4, 0, 8.6, 0, 0xff4d6d, gc); t.anim(tm => { tl.position.x = Math.sin(tm * .5) * 7; });
    lamp(t, -12, 10); lamp(t, 12, 10);
  };
  B.len = (t, b) => {
    t.box(24, .3, 22, 0, 0, 0, 0x2a3350); t.box(16, 5, 9, -3, .3, -5, 0xdde6ff); t.bbox(16.6, .4, 9.6, -3, 5.3, -5, 0x2bd4ff);
    for (let i = 0; i < 6; i++) { const p = t.bbox(2.4, .2, 3.2, -8.5 + (i % 3) * 2.8, 5.9 + (i > 2 ? .4 : 0), -5 + (i > 2 ? 2 : -2), 0x1b3a6e); p.rotation.x = -.35; }
    t.cyl(.4, .5, 14, 7, .3, -4, 0xdde6ff, 8); const rd = t.grp(7, 14.5, -4); t.bbox(8, .4, .5, 0, 0, 0, 0x2bd4ff, rd); t.bbox(.6, 1.6, .6, 0, -.8, 0, 0xdde6ff, rd); spin(t, rd, 1.2); t.sph(1, 7, 14.5, -4, 0xff4d6d);
    [-8, -3].forEach((x, i) => { t.cyl(.2, .25, 8, x, .3, 6, 0x8a94b8, 6); const sg = t.glow(i ? 'rgba(80,255,140,1)' : 'rgba(255,70,70,1)', 3.4, x, 8.8, 6, 0); t.anim(tm => { sg.visible = Math.sin(tm * 2 + i * 3) > 0; }); t.bbox(1, 1.6, .5, x, 7.6, 6, 0x1b2340); });
    t.beam(-11, 9.6, 6, 0, 9.6, 6, .5, 0x8a94b8); [[-9, -8], [-3, -8]].forEach((p, i) => { const d = t.grp(p[0], 6, p[1] - 5); t.add(new t.T.SphereGeometry(1.4, 12, 6, 0, PI * 2, 0, PI / 2), t.std(0xdde6ff, { side: t.T.DoubleSide }), 0, 0, 0, d).rotation.x = -1; spin(t, d, .3 + i * .1); });
    t.glow('rgba(43,212,255,.5)', 28, -3, 6, -5, 1.6);
  };

  /* ---------- mining and forestry ---------- */
  B.timah = (t, b) => {
    t.box(26, .4, 22, 0, 0, 2, 0x4a5578); t.box(12, 7, 8, -4, .4, 4, 0xaab6d8); t.bbox(12.6, .5, 8.6, -4, 7.4, 4, 0x6b7a99); [-7, -2].forEach(x => { t.cyl(.8, 1.1, 14, x, 7.4, 1, 0x8a94b8, 10); t.smoke(x, 21.8, 1, 1); });
    for (let i = 0; i < 3; i++) t.add(new t.T.ConeGeometry(3 + i, 3 + i, 8), t.std(0xc7cfdc, { flatShading: true }), 8 + i * 0, 1.6 + i * .2, -1 + i * 4.4 - 2);
    [[7, 9], [9.4, 9], [8.2, 9.8]].forEach(p => t.bbox(2, .7, 1, p[0], .4 + (p[1] > 9.5 ? .8 : 0), p[1], 0xdfe6f2));
    const dr = t.grp(0, -.3, -42); t.add(new t.T.BoxGeometry(24, 2.4, 9), t.std(0x7a2f3a), 0, 1.2, 0, dr); t.bbox(8, 5, 6, -6, 2.4, 0, 0xeaf0ff, dr); t.bbox(8.4, .5, 6.4, -6, 7.4, 0, 0xffb020, dr);
    t.bbox(.9, 12, .9, 7, 2.4, 0, 0xffb020, dr); t.beam(7, 14, 0, 7, 3, -14, .7, 0xffb020, dr); t.beam(7, 14, 0, 7, 3, 14, .35, 0x8a94b8, dr);
    for (let i = 0; i < 5; i++) { const bk = t.bbox(1.4, .8, 1.6, 7, 0, 0, 0x8a94b8, dr); t.anim(tm => { const u = (tm * .4 + i / 5) % 1; bk.position.set(7, 14 - u * 11, -u * 14); }); }
    t.blink(7, 15.5, 0); t.glow('rgba(255,200,90,.8)', 8, -6, 9, 0, 0, dr); t.anim(tm => { dr.position.y = -.3 + Math.sin(tm * 1.1) * .15; dr.rotation.z = Math.sin(tm * .9) * .015; });
    lamp(t, 10, 12, 6);
  };
  B.perhutani = (t, b) => {
    for (let i = 0; i < 16; i++) { const a = i * 2.4, r = 5 + (i % 5) * 2.4; tree(t, Math.cos(a) * r - 3, Math.sin(a) * r - 4, 9 + (i % 3) * 3, i % 2 ? 0x1f7a4a : 0x2f9a4a); }
    const w = t.grp(10, 0, 5); [[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]].forEach(p => t.beam(p[0] * 1.5, 0, p[1] * 1.5, p[0], 11, p[1], .5, 0x8a5a2a, w)); t.bbox(5, 3, 5, 0, 11, 0, 0xb07a3a, w); roof(t, 6.4, 6.4, 2.6, 0, 14, 0, 0x7a2f2a, w); t.beam(-1.4, 4, -1.4, 1.4, 8, -1.4, .3, 0x8a5a2a, w); t.glow('rgba(255,210,120,.9)', 6, 0, 12.4, 0, 1.5, w);
    t.box(11, 4.4, 7, -9, .1, 9, 0xc79a5a); t.bbox(12, .5, 8, -9, 4.5, 9, 0x6b4a2a); roof(t, 12, 8, 2.4, -9, 5, 9, 0x7a4a2a);
    for (let l = 0; l < 3; l++) for (let i = 0; i < 4 - l; i++) { const m = t.cyl(.9, .9, 7, 0, 0, 0, 0xb08a52, 10); m.rotation.z = PI / 2; m.position.set(7 + l * .8 + 0, .9 + l * 1.6, 13 - i * 2 - l); }
    const jp = truck(t, 0x2f9a4a); lap(t, jp, 9, .4, 1, 0, 3, .1);
  };

  /* ---------- food and agriculture ---------- */
  B.idfood = (t, b) => {
    t.box(28, .3, 26, 0, 0, 0, 0x2f7d57); t.box(14, 8, 9, -6, .3, -6, 0xe8d8b0); t.bbox(14.6, .6, 9.6, -6, 8.3, -6, 0xc0583a); roof(t, 14.6, 9.6, 2.4, -6, 8.9, -6, 0x8a4a3a);
    [[-3, -11], [3, -11]].forEach((p, i) => { t.cyl(.9, 1.3, 20, p[0] + 4, .3, p[1] + 3, 0xb08a7a, 10); t.cyl(1.05, 1.05, .6, p[0] + 4, 20.3, p[1] + 3, 0xffd166, 10); t.smoke(p[0] + 4, 21, p[1] + 3, 1); });
    for (let r = 0; r < 5; r++) for (let i = 0; i < 6; i++) t.bbox(.5, 2.4 + (i % 3) * .3, 1.4, 1 + i * 1.6, .3, 4 + r * 2.4, 0x58b04a);
    [[10, -7], [10, -2], [10, 3]].forEach(p => { t.cyl(2, 2, 7, p[0], .3, p[1], 0xeaf0ff, 14); t.add(new t.T.ConeGeometry(2.2, 1.6, 14), t.std(0xff9a3d), p[0], 8.1, p[1]); });
    const ct = truck(t, 0x4a5a99); for (let k = 0; k < 4; k++) t.bbox(.9, 1.4, 1.4, -1.5 + k * .9, 1.4, 0, 0x58b04a, ct); lap(t, ct, 10, .35, 0, 0, 3, .1);
    t.glow('rgba(255,220,150,.45)', 30, -6, 8, -6, 1.2);
  };
  B.shs = (t, b) => {
    t.box(26, .3, 24, 0, 0, 0, 0x2f7d57);
    [[-8, -5], [0, -5], [8, -5]].forEach((p, i) => { t.glass(6.4, 4, 9, p[0], .3, p[1], 0x9be8b0); roof(t, 7, 9.6, 3, p[0], 4.3, p[1], 0xb8f0c8); for (let k = 0; k < 3; k++) t.bbox(.6, .7, 7, p[0] - 2 + k * 2, .3, p[1], 0x34a853); });
    t.bbox(12, .25, 9, -6, .3, 8, 0xe2c25a); for (let i = 0; i < 8; i++) t.add(new t.T.SphereGeometry(1.5 + (i % 3) * .3, 8, 5, 0, PI * 2, 0, PI / 2), t.std(0xf0cf64), -10 + (i % 4) * 3.2, .5, 6 + Math.floor(i / 4) * 3.6);
    [[9, 8], [12, 8]].forEach(p => { t.cyl(1.5, 1.5, 9, p[0], .3, p[1], 0xeaf0ff, 12); t.add(new t.T.ConeGeometry(1.7, 1.6, 12), t.std(0x34a853), p[0], 10.1, p[1]); });
    for (let i = 0; i < 4; i++) t.bbox(7, .3, 1.6, 8, .3, -12 + i * 0, 0x86c24a); const tc = truck(t, 0x34a853); lap(t, tc, 7, .4, 0, -4, 10, .1); t.sph(1.2, 12, 14, -10, 0xfff3b0); t.glow('rgba(255,235,150,.9)', 22, 12, 14, -10, 1.2);
  };

  /* ---------- health ---------- */
  B.kimiafarma = (t, b) => {
    t.box(22, .4, 20, 0, 0, 0, 0x2a3350); t.box(14, 9, 9, -3, .4, -4, 0xf4f8ff); t.bbox(14.6, .6, 9.6, -3, 9.4, -4, 0x2fae6b);
    t.bbox(1.8, 6, .3, -3, 2.2, .7, 0x2fae6b); t.bbox(6, 1.8, .3, -3, 4.3, .7, 0x2fae6b); t.glow('rgba(52,211,153,.9)', 12, -3, 5.2, 1.2, 1.8);
    t.glass(6, 6, 6, 8, .4, -4, 0x6ee7b7); t.box(5, 3, 4, 7, .4, 7, 0xffffff); t.bbox(5.6, .5, 4.6, 7, 3.4, 7, 0x2fae6b); t.bbox(3.4, .9, .15, 7, 2, 9.1, 0x2fae6b);
    const cp = t.grp(-8, 4, 8); const c1 = t.cyl(1.4, 1.4, 4, 0, 0, 0, 0xff4d6d, 14, cp), c2 = t.cyl(1.4, 1.4, 4, 0, -4, 0, 0xffffff, 14, cp); c1.position.y = 2; c2.position.y = -2; t.sph(1.4, 0, 4, 0, 0xff4d6d, cp); t.sph(1.4, 0, -4, 0, 0xffffff, cp); cp.rotation.z = .6; t.anim(tm => { cp.rotation.y = tm * .6; });
    t.cyl(.3, .4, 4, -8, 0, 8, 0x8a94b8, 8); const vn = truck(t, 0xffffff); t.bbox(.5, .5, 1.62, 0, .9, 0, 0x2fae6b, vn); lap(t, vn, 8.6, .5, 0, 0, 4, .35); lamp(t, -10, 9); lamp(t, 10, 9);
  };
})();
