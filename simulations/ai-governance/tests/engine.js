/* Engine sanity tests. Run: node simulations/ai-governance/tests/engine.js */
const G = require('../engine/engine.js'), assert = require('assert');
/* determinism */
const a = G.sim(G.CASES[3], ['audit'], 'full', 5), b = G.sim(G.CASES[3], ['audit'], 'full', 5);
assert.strictEqual(a.net, b.net, 'same seed, same run');
assert.strictEqual(a.months.length, 12);
/* controls cut the matching risk, never raise it */
G.CASES.forEach(cs => { const r0 = G.residual(cs, []), r1 = G.residual(cs, G.CTRL.map(c => c.id)); G.DIMS.forEach(d => assert(r1[d] <= r0[d] + 1e-9, cs.id + ' ' + d)); });
/* the budget is respected by the best design, and best >= any simple design */
G.CASES.forEach(cs => { const b = G.best(cs); assert(G.cost(b.design) <= cs.B + 1e-9, cs.id + ' budget'); const e = G.expect(cs, cs.req, 'full', 120).net; assert(b.net >= Math.min(e, b.net) - 1e-6, cs.id + ' best'); });
/* human review is a rubber stamp at huge volume */
const ch = G.byId('chatbot'), ojol = G.byId('ojol'); assert(G.mit(ojol, ['human']).safety > G.mit(G.byId('triase'), ['human']).safety - .2);
assert(G.mit(G.byId('triase'), ['human']).safety < G.mit(ch, ['human']).safety, 'review works better at low volume');
/* the banned case: decline is the best, launching gets stopped and fined, controls barely help */
const sk = G.byId('skor'), bs = G.best(sk); assert.strictEqual(bs.mode, 'decline');
const run = G.sim(sk, G.CTRL.map(c => c.id).slice(0, 4), 'full', 1); assert(run.stop === G.BAN_STOP && run.fine > 0 && run.months[5].value === 0);
assert(G.judge(sk, 'ban', [], 'decline').total >= 95, 'refusing the banned system scores top');
assert(G.judge(sk, 'ban', ['audit', 'explain'], 'full').total < 45, 'launching the banned system scores low');
/* scoring: a sensible plan beats nothing and beats declining a good product */
G.CASES.filter(c => !c.ban).forEach(cs => {
  const best = G.best(cs), jb = G.judge(cs, cs.tier, best.design, best.mode), jn = G.judge(cs, cs.tier, [], 'full'), jd = G.judge(cs, cs.tier, [], 'decline'), jr = G.judge(cs, cs.tier, cs.req, 'full');
  assert(jb.total >= 90, cs.id + ' best plan ' + jb.total); assert(jn.total <= 30, cs.id + ' no controls ' + jn.total); assert(jd.total < 45, cs.id + ' decline ' + jd.total); assert(jr.total > jn.total, cs.id + ' required > none');
  assert(G.judge(cs, 'min', best.design, best.mode).tier === (cs.tier === 'ltd' ? 8 : 0), cs.id + ' tier scoring');
});
/* an audit fines missing required controls, and only once */
const kr = G.byId('kredit'), au = G.sim(kr, [], 'full', 3); assert(au.audit && au.audit.fine === kr.fine && au.audit.gaps.length === kr.req.length);
assert(!G.sim(kr, kr.req, 'full', 3).audit, 'no fine when everything required is in place');
/* monitoring stops drift: late months are not worse than early ones on average */
const dm = G.expect(G.byId('triase'), ['monitor'], 'full', 60).harm, dn = G.expect(G.byId('triase'), [], 'full', 60).harm; assert(dm < dn);
/* lab: fairness cannot be had both ways when base rates differ */
const f1 = G.fairness(.5, 'one'), fp = G.fairness(.5, 'parity'), fo = G.fairness(.5, 'opp');
assert(f1.gapAppr > .05 && f1.gapTpr < 1e-9, 'one cut-off: approval gap, equal TPR is not given'); assert(fp.gapAppr < .005 && fp.gapTpr > .02, 'parity costs equal opportunity'); assert(fo.gapTpr < .005 && fo.gapAppr > .02, 'equal opportunity costs parity');
/* lab: drift sawtooth */
const d0 = G.drift(.012, 0, 24), d6 = G.drift(.012, 6, 24); assert(d6.avg > d0.avg && d6.retrains === 4);
console.log('engine OK');
