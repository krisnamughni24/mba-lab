/* BUMN Explorer: builders for the companies added from the Danantara guide (organisation entities, shipyards, insurers, survey and services group...).
   Same toolbox as buildings.js: MBALAB.bumn.builders[id](t, b). Local coordinates: the site centre is (0,0). */
(function () {
  window.MBALAB = window.MBALAB || {}; MBALAB.bumn = MBALAB.bumn || {};
  const B = MBALAB.bumn.builders, PI = Math.PI;
  const tree = (t, x, z, h, c) => { t.cyl(.3, .45, h * .45, x, 0, z, 0x6a4a2a, 6); t.add(new t.T.ConeGeometry(h * .32, h * .75, 7), t.std(c || 0x1f7a4a, { flatShading: true }), x, h * .45 + h * .37, z); };
  const spin = (t, g, sp, ax) => t.anim(tm => { g.rotation[ax || 'y'] = tm * sp; });
  const pad = (t, w, d, c) => t.box(w, .6, d, 0, 0, 0, c == null ? 0x2a3358 : c);
  const crane = (t, x, z, h, c, par) => { const g = t.grp(x, 0, z, par); t.box(.8, h, .8, -2, 0, 0, c, g); t.box(.8, h, .8, 2, 0, 0, c, g); t.box(10, .8, .8, 3, h, 0, c, g); t.box(.6, .6, 6, 0, h + .8, 0, 0x6b7a99, g); t.blink(-2, h + 1.5, 0); return g; };
  const shed = (t, w, h, d, x, z, c) => { t.box(w, h, d, x, 0, z, c); t.add(new t.T.CylinderGeometry(d / 2, d / 2, w, 3), t.std(0x8a94b8), x, h + 1.1, z).rotation.set(0, 0, PI / 2); };
  const tower = (t, w, h, x, z, hex) => { t.glass(w, h, w, x, 0, z, hex); t.box(w + .8, .8, w + .8, x, h, z, 0xdde6ff); };

  /* ---------- the Danantara organisation ---------- */
  B.dam = (t, b) => {      /* operational holding: gears around a glass tower */
    pad(t, 15, 15); tower(t, 7, 28, 0, 0, 0xffc857); t.glass(11, 5, 11, 0, .6, 0, 0xffc857);
    const g1 = t.grp(0, 31, 0); t.add(new t.T.TorusGeometry(3.4, .55, 8, 24), t.std(0xffc857), 0, 0, 0, g1); t.cyl(.5, .5, 1.2, 0, -.6, 0, 0xffc857, 8, g1); t.add(new t.T.BoxGeometry(7.6, .5, .5), t.std(0xffc857), 0, 0, 0, g1); t.add(new t.T.BoxGeometry(.5, .5, 7.6), t.std(0xffc857), 0, 0, 0, g1); g1.rotation.x = PI / 2; spin(t, g1, .9, 'z');
    t.ring(7, .7, 0xffc857); t.glow('rgba(255,200,87,.9)', 14, 0, 33, 0, 2);
  };
  B.dim = (t, b) => {      /* investment platform: twin towers joined by a bridge, rising bars */
    pad(t, 15, 15); tower(t, 4.4, 30, -3.6, 0, 0xffc857); tower(t, 4.4, 24, 3.6, 0, 0xffc857); t.glass(8, 1.4, 2.4, 0, 18, 0, 0xffe29a);
    const bars = [0, 1, 2, 3].map(i => t.box(.9, 2 + i * 2, .9, -5.4 + i * 1.8, 0, 6.2, 0x34d399)); bars.forEach((m, i) => t.anim(tm => { m.scale.y = .75 + .25 * Math.sin(tm * 1.6 + i); }));
    t.blink(-3.6, 34.5, 0, 'rgba(255,200,87,1)'); t.blink(3.6, 28.5, 0, 'rgba(255,200,87,1)'); t.ring(7, .7, 0xffc857);
  };
  B.ddmf = (t, b) => {     /* development fund: a vault drum with a rising crane */
    pad(t, 14, 14); t.cyl(5.2, 5.6, 7, 0, .6, 0, 0xb8c0d8, 24); t.cyl(5.6, 5.6, .8, 0, 7.4, 0, 0xffc857, 24); t.cyl(3.4, 3.4, 5, 0, 8.2, 0, 0xdde6ff, 20);
    t.add(new t.T.SphereGeometry(3.4, 18, 10, 0, PI * 2, 0, PI / 2), t.std(0xffc857), 0, 13.2, 0);
    const c = crane(t, 7.4, -2, 14, 0xffc857); spin(t, c, 0, 'y'); t.ring(6.5, .7, 0xffc857); t.glow('rgba(255,200,87,.85)', 10, 0, 17, 0, 2);
  };

  /* ---------- minerals, food, plantations ---------- */
  B.perminas = (t, b) => { /* critical-mineral lab: domes and glowing crystals */
    pad(t, 22, 20, 0x2a3050); shed(t, 12, 5, 8, -3, 4, 0x6a5acd); t.cyl(3.4, 3.4, 4, 6, 0, -4, 0xdde6ff, 18); t.add(new t.T.SphereGeometry(3.4, 16, 8, 0, PI * 2, 0, PI / 2), t.glass ? t.std(0x8b7cff) : null, 6, 4, -4);
    [[-6, -5, 8], [-3, -6, 11], [0, -4.4, 6], [-8.5, -2, 5]].forEach((p, i) => { const k = t.add(new t.T.ConeGeometry(1.2, p[2], 5), t.bas(i % 2 ? 0xc084fc : 0x8b7cff), p[0], p[2] / 2, p[1]); t.anim(tm => { k.rotation.y = tm * .5 + i; }); });
    t.glow('rgba(190,150,255,.9)', 12, -4, 7, -5, 2); t.blink(6, 9, -4, 'rgba(190,150,255,1)');
  };
  B['agrinas-jaladri'] = (t, b) => { /* fish ponds with aerators and a cold store */
    pad(t, 22, 22, 0x1a2a40); [[-5, -5], [5, -5], [-5, 5], [5, 5]].forEach((p, i) => { t.box(8, .5, 8, p[0], .6, p[1], 0x2a78c8); const w = t.grp(p[0], 1.6, p[1]); t.box(2.4, .3, .4, 0, 0, 0, 0xeaf0ff, w); spin(t, w, 3 + i, 'y'); });
    shed(t, 9, 5, 5, 0, 0, 0xcfd8ff); t.cyl(.7, .7, 8, -8.5, 0, 8, 0xdde6ff, 10); t.glow('rgba(80,200,255,.85)', 9, 0, 9, 0, 2);
  };
  B['agrinas-pangan'] = (t, b) => { /* granary silos, warehouse and conveyor */
    pad(t, 22, 22, 0x3a3a24); [[-6, -5], [-2, -5], [2, -5], [6, -5]].forEach((p, i) => { t.cyl(1.7, 1.7, 11 + (i % 2) * 2, p[0], .6, p[1], 0xe8e6c8, 14); t.add(new t.T.ConeGeometry(1.8, 1.4, 14), t.std(0xb08a3a), p[0], 12.4 + (i % 2) * 2, p[1]); });
    shed(t, 16, 5, 7, 0, 5, 0xd4e157); t.beam(-6, 8, -3, -6, 5, 2, .5, 0x8a94b8);
    t.box(2, 1, 1.4, 9, 0, 9, 0xff9a3d); t.blink(6, 14.6, -5, 'rgba(212,225,87,1)');
  };
  B['agrinas-palma'] = (t, b) => { /* oil-palm grove with a mill chimney */
    pad(t, 24, 24, 0x1f3a22);
    for (let i = 0; i < 9; i++) { const x = -8 + (i % 3) * 8, z = -8 + Math.floor(i / 3) * 6 - (i === 4 ? 0 : 0); if (Math.abs(x) < 3 && Math.abs(z) < 3) continue; t.cyl(.3, .4, 6 + (i % 3), x, 0, z + 3, 0x6a4a2a, 6); for (let k = 0; k < 6; k++) { const f = t.add(new t.T.BoxGeometry(.3, .15, 3.2), t.std(0x2f9a4a), x, 6.8 + (i % 3), z + 3); f.rotation.y = k * 1.047; f.position.x += Math.cos(k * 1.047) * 1.5; f.position.z += Math.sin(-k * 1.047) * 1.5; f.rotation.z = .25; } }
    shed(t, 9, 5, 6, 6, -4, 0xb8c9a0); t.cyl(.9, 1.1, 14, 9.5, 0, -4, 0x8a8f9a, 10); t.smoke(9.5, 14.5, -4, 6); t.cyl(1.6, 1.6, 4, 5, 0, 5, 0xcfd8ff, 12);
  };

  /* ---------- finance and insurance ---------- */
  B.ifg = (t, b) => {      /* insurance tower with an umbrella */
    pad(t, 20, 20); tower(t, 8, 24, -2, 0, 0xc084fc); t.glass(6, 12, 6, 6, 0, 5, 0xc084fc);
    const u = t.grp(-2, 27, 0); t.add(new t.T.ConeGeometry(7, 3.4, 18), t.std(0xc084fc), 0, 1.7, 0, u); t.cyl(.25, .25, 4, 0, -2.4, 0, 0xdde6ff, 6, u); t.anim(tm => { u.rotation.y = tm * .35; });
    t.ring(9, .7, 0xc084fc); t.glow('rgba(192,132,252,.85)', 12, -2, 31, 0, 2);
  };
  B.indonesiare = (t, b) => { /* reinsurer: globe on a curved shield base */
    pad(t, 20, 20); t.glass(14, 8, 8, 0, .6, 0, 0xc084fc); t.cyl(5, 6, 1.2, 0, 8.6, 0, 0xdde6ff, 4).rotation.y = PI / 4;
    const gl = t.grp(0, 14, 0); t.add(new t.T.SphereGeometry(4, 20, 14), t.std(0x3a5a9a, { wireframe: false }), 0, 0, 0, gl); t.add(new t.T.TorusGeometry(5.4, .22, 6, 32), t.bas(0xc084fc), 0, 0, 0, gl).rotation.x = PI / 2.6; spin(t, gl, .6, 'y');
    t.ring(8, .7, 0xc084fc);
  };
  B.asabri = (t, b) => {   /* barracks-style hall with columns and a flag */
    pad(t, 22, 18, 0x2b3550); t.box(16, 6, 8, 0, .6, -1, 0xcdd5b8); t.box(17, 1, 9, 0, 6.6, -1, 0x8b9a6a);
    for (let i = 0; i < 6; i++) t.cyl(.45, .5, 6, -6.2 + i * 2.5, .6, 3.8, 0xeef0e0, 10); t.box(14, .8, 2, 0, 6.6, 4, 0xeef0e0);
    t.cyl(.2, .2, 14, 9, 0, 6, 0xdde6ff, 6); const f = t.box(3.4, 2, .1, 10.8, 11, 6, 0xdc2626); t.box(3.4, 1, .1, 10.8, 10, 6, 0xffffff); t.anim(tm => { f.scale.x = 1 + .08 * Math.sin(tm * 3); });
    t.ring(9, .7, 0xc084fc);
  };
  B.danareksa = (t, b) => { /* investment house: glass tower with a ticker band and a chart */
    pad(t, 20, 20); tower(t, 7, 30, 0, 0, 0xe2e8f0); const band = t.box(7.4, .9, 7.4, 0, 20, 0, 0x34d399); t.anim(tm => { band.position.y = 20.5 + Math.sin(tm * 2) * 0; band.material.emissiveIntensity = .3 + .4 * Math.abs(Math.sin(tm * 3)); });
    t.lines([-8, 1, 8, -5, 5, 8, -2, 9, 8, 1, 14, 8, 6, 12, 8, 9, 20, 8], 0x34d399); t.glow('rgba(52,211,153,.9)', 12, 0, 34, 0, 2);
  };

  /* ---------- survey, inspection and diversified services ---------- */
  B.idsurvey = (t, b) => { /* inspection lab with a rotating survey dish and tripod */
    pad(t, 20, 20); t.box(12, 6, 8, -2, .6, 0, 0xe2e8f0); t.glass(12.4, 1.6, 8.4, -2, 4.4, 0, 0x94a3b8);
    const d = t.grp(5, 7, 4); t.add(new t.T.SphereGeometry(2.6, 14, 8, 0, PI * 2, 0, PI / 2), t.std(0xdde6ff), 0, 0, 0, d).rotation.x = PI * .85; t.cyl(.25, .25, 3, 5, .6, 4, 0x8a94b8, 6); d.position.y = 4.2; spin(t, d, .8, 'y');
    for (let i = 0; i < 3; i++) t.beam(-7 + Math.cos(i * 2.09) * 1.4, 0, -6 + Math.sin(i * 2.09) * 1.4, -7, 3.2, -6, .18, 0xffd166); t.box(.8, .8, .8, -7, 3.2, -6, 0xff9a3d);
    t.glow('rgba(148,163,184,.8)', 10, 0, 10, 0, 2);
  };
  B.primissima = (t, b) => { /* textile mill with a sawtooth roof and spools */
    pad(t, 22, 20, 0x2b2f4a); t.box(18, 5, 10, 0, .6, 0, 0xe2e8f0);
    for (let i = 0; i < 4; i++) { const p = t.add(new t.T.CylinderGeometry(2.5, 2.5, 10, 3), t.std(0xcfd8ff), -6.75 + i * 4.5, 6.4, 0); p.rotation.set(PI / 2, 0, PI / 6); }
    for (let i = 0; i < 3; i++) { const s = t.cyl(1.1, 1.1, 1.6, 7 + i * 0, 0, -8 + i * 0, [0xff6b6b, 0x4dd2ff, 0xffd166][i], 12); s.position.x = 6.5 - i * 3; s.position.z = 8; }
    t.cyl(.8, .9, 11, -9, 0, -6, 0x8a8f9a, 10); t.smoke(-9, 11.5, -6, 5);
  };
  B.pfn = (t, b) => {      /* film studio: sound stage, clapperboard sign, sweeping spotlights */
    pad(t, 22, 20, 0x23263f); t.box(14, 7, 10, -1, .6, 0, 0x3a3f66); t.box(14.4, 1, 10.4, -1, 7.6, 0, 0xf4f7ff);
    const cb = t.grp(8, 6, 6); t.box(3.6, 2.4, .3, 0, 0, 0, 0x111827, cb); const arm = t.box(3.6, .6, .35, 0, 2.4, 0, 0xf4f7ff, cb); arm.geometry.translate(1.8, 0, 0); arm.position.x = -1.8; t.anim(tm => { arm.rotation.z = Math.max(0, Math.sin(tm * 2)) * .5; });
    [[-8, 6], [-4, 6]].forEach((p, i) => { const l = t.grp(p[0], 0, p[1]); t.cyl(.2, .2, 5, 0, 0, 0, 0x8a94b8, 6, l); const h = t.grp(0, 5, 0, l); t.box(1, .8, 1.6, 0, 0, 0, 0xffd166, h); t.beam(0, 5.4, 0, 0, 22, -3, .5, 0xfff1c2, l); t.anim(tm => { l.rotation.y = Math.sin(tm * .8 + i * 2) * .6; }); });
  };
  const yard = (t, c) => {  /* shipyard: dry dock, hull on the slip, gantry crane */
    pad(t, 26, 22, 0x1f2a40); t.box(20, .5, 8, 0, .6, 0, 0x0b2a4a); t.box(.8, 2.4, 8.6, -10, .6, 0, 0x8a94b8); t.box(.8, 2.4, 8.6, 10, .6, 0, 0x8a94b8);
    const s = t.ship({ L: 17, W: 5.2, hh: 2.4, hull: c, cabH: 3 }); s.position.set(-1, 1.4, 0); t.anim(tm => { s.position.y = 1.4 + Math.sin(tm * .8) * .08; });
    crane(t, 0, -7, 15, 0xe2e8f0); crane(t, 0, 7, 12, 0xe2e8f0); shed(t, 8, 4, 5, 8, 11, 0x8a94b8); t.glow('rgba(255,160,60,.9)', 6, -8, 3, -7, 1);
  };
  B.dkb = (t, b) => yard(t, 0x9a2f3a); B.dps = (t, b) => yard(t, 0x2b4a7a); B.iki = (t, b) => yard(t, 0x2f6a5a);
  B['persero-batam'] = (t, b) => { /* industrial estate: factories, a container gantry and stacked boxes */
    pad(t, 26, 24, 0x23293f); shed(t, 10, 5, 7, -5, -5, 0x9aa7c7); shed(t, 10, 5, 7, 6, -5, 0xc9d1e6); t.box(2, 8, 2, -10, .6, 6, 0xe2e8f0);
    [0, 1, 2, 3].forEach(i => t.box(3.6, 1.6, 1.6, -2 + i * 3.8, i % 2 * 1.6 + .6, 7, [0xff6b6b, 0x4dd2ff, 0xffd166, 0x6ee7b7][i])); crane(t, 4, 11, 11, 0xff9a3d); t.blink(-10, 9.4, 6);
  };
  B.inti = (t, b) => {     /* telecom works: lattice tower, dishes, factory hall */
    pad(t, 20, 20); shed(t, 12, 5, 8, 2, 4, 0xe2e8f0);
    [[-3, -4], [3, -4], [3, 2], [-3, 2]].forEach(p => t.beam(p[0] * 1.6, 0, p[1] - 5, p[0] * .3, 26, p[1] * .1 - 5 + 1, .35, 0x9aa7c7));
    for (let h = 5; h < 24; h += 6) t.beam(-3.6, h, -9, 3.6, h, -9, .22, 0x6b7a99);
    const d = t.grp(0, 17, -4); t.add(new t.T.SphereGeometry(1.8, 12, 8, 0, PI * 2, 0, PI / 2), t.std(0xdde6ff), 0, 0, 0, d).rotation.x = -PI / 2.2; spin(t, d, .7, 'y'); t.blink(0, 28, -4.5, 'rgba(56,189,248,1)'); t.glow('rgba(56,189,248,.8)', 10, 0, 29, -4.5, 2);
  };
  B.amarta = (t, b) => {   /* contractor: building frame with a tower crane */
    pad(t, 20, 20); for (let f = 0; f < 3; f++) { t.box(8.4, .5, 8.4, -3, .6 + f * 4, 0, 0xcdd5e6); [[-6.6, -3.6], [.6, -3.6], [-6.6, 3.6], [.6, 3.6]].forEach(p => t.box(.6, 4, .6, p[0], .6 + f * 4, p[1], 0x8a94b8)); }
    const c = t.grp(6, 0, -2); t.box(.9, 22, .9, 0, 0, 0, 0xffc857, c); const arm = t.grp(0, 22, 0, c); t.box(14, .7, .7, -3, 0, 0, 0xffc857, arm); t.box(3, 1, 1, 6, -.2, 0, 0x6b7a99, arm); t.beam(-7, 0, 0, -7, -5, 0, .12, 0x111827, arm); t.anim(tm => { arm.rotation.y = Math.sin(tm * .35) * 1.1; });
    t.blink(6, 23.6, -2);
  };
  B.bbi = (t, b) => {      /* heavy-machinery plant: big shed, gear wheel, chimney */
    pad(t, 26, 22, 0x2a2f42); shed(t, 14, 6, 9, -3, -3, 0xb7c0d8); const g = t.grp(8, 4.4, 5); t.add(new t.T.CylinderGeometry(3.4, 3.4, 1.2, 14), t.std(0xff9a3d), 0, 0, 0, g).rotation.x = PI / 2;
    for (let i = 0; i < 10; i++) { const k = t.add(new t.T.BoxGeometry(1, 1, 1.2), t.std(0xff9a3d), Math.cos(i * .628) * 3.7, Math.sin(i * .628) * 3.7, 0, g); k.rotation.z = i * .628; } spin(t, g, .8, 'z');
    t.cyl(.9, 1.2, 14, -10, 0, 6, 0x6b7a99, 10); t.smoke(-10, 14.5, 6, 6); crane(t, 4, -9, 11, 0xff9a3d);
  };
  B.brantas = (t, b) => {  /* water works: weir wall, sluice gates and a spillway */
    pad(t, 24, 22, 0x1a2f45); t.box(22, 6, 3, 0, .6, 0, 0xb8c0d8); [-7, -2.4, 2.4, 7].forEach((x, i) => { t.box(3, 4, .6, x, 2.6, 1.8, 0x4a5a7a); const w = t.box(2.4, 5, 1.2, x, .6, -2.2, 0x2a78c8); t.anim(tm => { w.scale.y = .8 + .2 * Math.sin(tm * 2 + i); }); });
    t.box(22, .5, 8, 0, .6, -8, 0x2a78c8); t.box(22, .5, 6, 0, .6, 8, 0x1c4f9a); t.glow('rgba(80,180,255,.85)', 10, 0, 9, 0, 2); tree(t, -10, 9, 6); tree(t, 10, 9, 6);
  };
})();
