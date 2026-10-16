/* node simulations/decision-tree-ev/tests/engine.js */
const E = require('../engine/engine.js'); let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log('FAIL', m); } }; const near = (a, b, m) => ok(Math.abs(a - b) < 1e-6, m + ' (' + a + ' vs ' + b + ')');
const P = Object.fromEntries(E.PRESETS.map(p => [p.id, p.build()]));
let S = E.solve(P.machine); near(S.edge[P.machine.kids[0].id], 500, 'buy EV'); near(S.edge[P.machine.kids[1].id], 850, 'lease EV'); ok(S.best[P.machine.id] === 1, 'lease wins');
const sn = E.sens(P.machine, P.machine.kids[0].n.kids[0].id, 100); ok(sn.cross.length === 1 && Math.abs(sn.cross[0].x - 0.71875) < 0.02, 'machine crossover near 72%');
S = E.solve(P.lawsuit); near(S.ev[P.lawsuit.id], -400, 'settle is best in EV'); ok(E.profile(P.lawsuit, S).pLoss === 1, 'settling always loses money');
const R = E.solveRA(P.lawsuit, 300); ok(R.best[P.lawsuit.id] === 0, 'risk-averse also settles'); const RN = E.solveRA(P.lawsuit, 1e9); ok(RN.best[P.lawsuit.id] === 0, 'huge tolerance ~ EV');
S = E.solve(P.research); near(S.edge[P.research.kids[0].id], 130, 'launch blind EV'); near(S.edge[P.research.kids[1].id], 160, 'study EV'); ok(S.best[P.research.id] === 1, 'study wins');
const ev = E.evpi(P.research, S); ok(ev > 0 && ev < 1000, 'evpi positive ' + ev);
S = E.solve(P.cafe); const pl = E.plan(P.cafe, S); ok(pl.length >= 1, 'plan exists');
E.PRESETS.forEach(p => { const t = p.build(); ok(E.validate(t).length === 0 || p.id === 'blank', p.id + ' valid'); const s = E.solve(t); const pr = E.profile(t, s); near(pr.mean, s.ev[t.id], p.id + ' profile mean = EV'); near(E.sum(pr.outs.map(o => o.p)), 1, p.id + ' probs sum 1'); ok(E.evpi(t, s) >= -1e-9, p.id + ' evpi >=0'); });
const t = E.PRESETS[0].build(); const ed = E.probEdges(t)[0].edge; const c = E.withP(t, ed.id, 0.9); near(E.pOf(E.find(c, E.probEdges(t)[0].parent.id).node)[0], 0.9, 'withP sets p');
console.log(bad ? bad + ' FAILED' : 'engine OK'); process.exit(bad ? 1 : 0);
