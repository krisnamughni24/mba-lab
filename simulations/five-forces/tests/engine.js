/* node simulations/five-forces/tests/engine.js : sanity checks for the Five Forces engine */
const E = require('../engine/engine.js'); let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log('FAIL', m); } };
E.LEVELS.forEach(lv => {
  ok(Math.abs(lv.w.reduce((a, b) => a + b, 0) - 1) < 1e-9, lv.id + ' weights sum to 1');
  const base = E.kept(lv.f, lv.w), b = E.best(lv), perfect = lv.f.map(E.bandOf);
  ok(E.scoreRead(lv, perfect).score >= 80 && E.scoreRead(lv, perfect).exact === 5, lv.id + ' perfect reading');
  ok(E.scoreRead(lv, [3, 3, 3, 3, 3]).score < E.scoreRead(lv, perfect).score, lv.id + ' lazy reading scores less');
  ok(b.net > base, lv.id + ' a best plan beats doing nothing');
  ok(E.scoreStrat(lv, b.ids).score === 100, lv.id + ' best plan scores 100');
  ok(E.scoreStrat(lv, []).score === 0, lv.id + ' empty plan scores 0');
  const pc = E.scoreStrat(lv, ['pricecut']); ok(pc.score < 100, lv.id + ' price war is not the best');
  ok(E.run(lv.f, lv.w, ['brand', 'niche']).kept === E.run(lv.f, lv.w, ['niche', 'brand']).kept, lv.id + ' order does not matter');
  console.log(lv.id.padEnd(7), 'kept', base.toFixed(1), 'verdict', E.verdict(base), 'best', b.ids.join('+'), 'net', b.net.toFixed(1), 'pricecut', pc.score);
});
const kopi = E.LEVELS[0]; ok(E.marginals(kopi, ['pricecut']).length === 1, 'marginals');
ok(E.verdict(E.kept(kopi.f, kopi.w)) <= 1, 'kopi is a tough industry'); ok(E.verdict(E.kept(E.LEVELS[2].f, E.LEVELS[2].w)) >= 2, 'cement is attractive');
ok(E.apply([0, 0, 0, 0, 0], E.byId('brand')).every(v => v === 0), 'a calm force stays at 0');
console.log(bad ? bad + ' FAILED' : 'engine OK'); process.exit(bad ? 1 : 0);
