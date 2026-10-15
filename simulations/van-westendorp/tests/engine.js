/* node simulations/van-westendorp/tests/engine.js : sanity checks for the Van Westendorp engine */
const V = require('../engine/engine.js'); let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log('FAIL', m); } };
V.SCEN.forEach(s => {
  const r = V.analyze(V.generate(7, s)); const q = r.pts;
  ok(r.valid && r.sane, s.id + ' sane'); ok(q.pmc.x < q.pme.x, s.id + ' range order');
  ok(q.pmc.x < q.opp.x + 1 && q.opp.x < q.pme.x + 1 && q.pmc.x < q.ipp.x && q.ipp.x < q.pme.x + 1, s.id + ' points inside range');
  ok(Math.abs(q.opp.y - 0) < 1 && q.opp.y < .5, s.id + ' OPP rejection share low (' + q.opp.y.toFixed(2) + ')');
  ok(q.ipp.x >= s.med[1] * .6 && q.ipp.x <= s.med[2] * 1.4, s.id + ' IPP near medians ' + Math.round(q.ipp.x));
  const b = V.bestInRange(r, s.cost); ok(b && b.p >= q.pmc.x - r.grid.step && b.p <= q.pme.x, s.id + ' best in range');
  ok(V.score(r, b.p, s.cost) === 100, s.id + ' best scores 100'); ok(V.score(r, s.max * .9, s.cost) < 100, s.id + ' far price scores less');
  ok(V.zone(r, q.pmc.x - r.grid.step * 3) === 0 && V.zone(r, q.pme.x + r.grid.step * 3) === 4, s.id + ' zones');
  console.log(s.id, 'PMC', Math.round(q.pmc.x), 'OPP', Math.round(q.opp.x), 'IPP', Math.round(q.ipp.x), 'PME', Math.round(q.pme.x), 'best', b.p, 'n', r.n, 'bad', r.bad);
});
const hi = V.analyze(V.generate(7, V.SCEN[0], { noise: 1 })); ok(hi.bad > 0, 'noise removes illogical rows (' + hi.bad + ')');
const br = V.analyze(V.generate(7, V.SCEN[0], { brand: .3 })), b0 = V.analyze(V.generate(7, V.SCEN[0])); ok(br.pts.ipp.x > b0.pts.ipp.x, 'brand shifts prices up');
ok(V.parse('1.000; 2.000; 3.000; 4.000\n5,6,7,8\nfoo').length === 2, 'parse'); ok(!V.analyze([[1, 2, 3, 4]]).valid, 'too few rows');
console.log(bad ? bad + ' FAILED' : 'OK');
process.exit(bad ? 1 : 0);
