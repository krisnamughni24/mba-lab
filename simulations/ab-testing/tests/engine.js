/* node simulations/ab-testing/tests/engine.js : sanity checks for the A/B testing engine */
const E = require('../engine/engine.js'); let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log('FAIL', m); } };
ok(Math.abs(E.cdf(1.96) - 0.975) < 0.001, 'normal cdf');
ok(Math.abs(E.nFor(0.1, 0.2) - 3834) < 150, 'sample size formula near textbook value');
ok(E.power(0.1, 0.2, E.nFor(0.1, 0.2)) > 0.78 && E.power(0.1, 0.2, E.nFor(0.1, 0.2)) < 0.83, 'power at planned n is about 80%');
ok(E.power(0.1, 0.2, 400) < E.power(0.1, 0.2, 4000), 'more data, more power');
E.CASES.forEach(cs => {
  ok(cs.ideas.length === 3, cs.id + ' has 3 ideas');
  ok(E.daysFor(cs, cs.minLift) <= cs.maxDays, cs.id + ' minimum lift is detectable in a sensible time (' + E.daysFor(cs, cs.minLift) + ' d)');
  cs.ideas.forEach(idea => {
    /* determinism */
    const a = E.newRun(cs, idea, 7), b = E.newRun(cs, idea, 7); for (let i = 0; i < 5; i++) { E.stepDay(a); E.stepDay(b); } ok(a.cA === b.cA && a.nB === b.nB, cs.id + ' same seed same data');
  });
  /* false positives with no effect stay near 5% when run to the end */
  const null0 = { id: 'x', lift: 0 }, days = Math.min(cs.maxDays, 14); let fp = 0, N = 120;
  for (let s = 0; s < N; s++) { const r = E.newRun(Object.assign({}, cs, { srm: 0 }), null0, 1000 + s); for (let d = 0; d < days; d++) E.stepDay(r); if (r.hist[days - 1].sig) fp++; }
  ok(fp / N < 0.14, cs.id + ' false positive rate at the end ~5% (got ' + (fp / N).toFixed(2) + ')');
});
/* peeking inflates false positives */
{ const cs = E.byId('kopi'); let peek = 0, N = 150; for (let s = 0; s < N; s++) { const r = E.newRun(cs, { id: 'x', lift: 0 }, 5000 + s); for (let d = 0; d < 14; d++) E.stepDay(r); if (r.cross.length) peek++; } ok(peek / N > 0.12, 'peeking every day raises false alarms (got ' + (peek / N).toFixed(2) + ')'); }
/* SRM case is flagged, normal case is not */
{ const r = E.newRun(E.byId('kta'), E.byId('kta').ideas[0], 3); for (let d = 0; d < 7; d++) E.stepDay(r); ok(r.hist[6].srm, 'SRM flagged on the broken split'); const k = E.newRun(E.byId('kopi'), E.byId('kopi').ideas[0], 3); for (let d = 0; d < 7; d++) E.stepDay(k); ok(!k.hist[6].srm, 'no SRM on a healthy split'); }
/* novelty makes an early stop look great, the end is closer to truth */
{ const cs = E.byId('ojol'), idea = cs.ideas[0]; let e = 0, l = 0, N = 40; for (let s = 0; s < N; s++) { const r = E.newRun(cs, idea, 900 + s); for (let d = 0; d < 21; d++) E.stepDay(r); e += r.hist[1].lift; l += r.hist[20].lift; } ok(e / N > l / N + 0.08, 'novelty: day-2 lift above day-21 lift'); }
/* weekend-only idea is invisible in a 5-day test */
{ const cs = E.byId('wisata'), idea = cs.ideas[0]; ok(E.trueLift(cs, idea) > 0.03, 'weekend idea has a real weekly effect'); let s5 = 0; for (let s = 0; s < 30; s++) { const r = E.newRun(cs, idea, 300 + s); for (let d = 0; d < 5; d++) E.stepDay(r); s5 += r.hist[4].lift; } ok(Math.abs(s5 / 30) < 0.05, 'a Monday-Friday test cannot see a weekend-only effect'); }
/* judging */
{ const cs = E.byId('kopi'), idea = cs.ideas[0], run = E.newRun(cs, idea, 1); for (let d = 0; d < 14; d++) E.stepDay(run); const need = E.daysFor(cs, cs.minLift);
  const good = E.judge(cs, idea, { days: Math.max(14, need), mde: cs.minLift }, run, 'ship'); ok(good.dec === 50, 'shipping a real winner scores the decision'); ok(E.judge(cs, idea, { days: 14, mde: 0.05 }, run, 'keep').dec === 20, 'keeping a real winner loses most points');
  ok(E.judge(cs, cs.ideas[1], { days: 14, mde: 0.05 }, run, 'keep').dec === 50, 'keeping A on a null idea is right'); ok(E.judge(cs, cs.ideas[2], { days: 14, mde: 0.05 }, run, 'ship').dec === 0, 'shipping a harmful idea scores 0');
  const kta = E.byId('kta'); ok(E.judge(kta, kta.ideas[0], { days: 14, mde: 0.06 }, run, 'invalid').dec === 50, 'SRM case: invalid is right');
  const tiny = E.byId('dompet'); ok(E.judge(tiny, tiny.ideas[0], { days: 14, mde: 0.05 }, run, 'keep').dec === 50 && E.judge(tiny, tiny.ideas[0], { days: 14, mde: 0.05 }, run, 'ship').dec === 20, 'tiny lift: keeping is right, shipping is partial'); }
console.log(bad ? bad + ' failures' : 'engine OK'); process.exit(bad ? 1 : 0);
