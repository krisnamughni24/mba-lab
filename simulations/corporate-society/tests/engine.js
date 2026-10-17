/* Corporate Society: engine and content checks (pure node). Prints "engine OK" when everything holds. */
const fs = require('fs'), path = require('path'), assert = require('assert');
global.MBALAB = {}; const dir = path.join(__dirname, '..', 'engine');
['content', 'content-roles', 'content-levels', 'content-more1', 'content-more2', 'content-more3', 'content-values', 'content-review', 'content-roles2', 'content-roles3', 'engine'].forEach(f => require(path.join(dir, f + '.js')));
const C = MBALAB.corpContent, E = MBALAB.corp, ids = C.events.map(e => e.id), NAMES = Object.keys(C.names);
assert.strictEqual(new Set(ids).size, ids.length, 'event ids are unique');
const four = (a, n, w) => assert(Array.isArray(a) && a.length === (n || 4) && a.every(x => x.trim()), w + ' needs ' + (n || 4) + ' non-empty parts');
const FX = new Set(E.STATS), PEOPLE = new Set(E.PEOPLE);
const ph = s => (s.match(/\{(\w+)\}/g) || []).map(x => x.slice(1, -1));
const txt = [];
C.events.forEach(e => {
  four(e.t, 4, e.id + ' title'); four(e.d, 4, e.id + ' story'); assert(C.concepts[e.c], e.id + ' concept ' + e.c + ' exists'); assert(!e.npc || PEOPLE.has(e.npc), e.id + ' npc');
  assert(e.opts.length >= 2 && e.opts.length <= 4, e.id + ' has 2 to 4 options');
  (e.loc || []).forEach(l => assert(E.LOCS.includes(l) || l === '__none', e.id + ' loc ' + l));
  txt.push(e.t, e.d);
  e.opts.forEach((o, i) => {
    four(o.t, 4, e.id + ' option label'); txt.push(o.t);
    if (o.g) { four(o.ro, 4, e.id + ' ok result'); four(o.rb, 4, e.id + ' bad result'); txt.push(o.ro, o.rb); ['ok', 'bad'].forEach(b => { assert(o.g[b], e.id + ' branch ' + b); Object.keys(o.g[b].fx || {}).forEach(k => assert(FX.has(k), e.id + ' fx ' + k)); Object.keys(o.g[b].rel || {}).forEach(k => assert(PEOPLE.has(k), e.id + ' rel ' + k)); }); }
    else { four(o.r, 4, e.id + ' result'); txt.push(o.r); }
    Object.keys(o.fx || {}).forEach(k => assert(FX.has(k), e.id + ' fx ' + k)); Object.keys(o.rel || {}).forEach(k => assert(PEOPLE.has(k), e.id + ' rel ' + k));
    (o.later || []).forEach(l => assert(ids.includes(l.id), e.id + ' later ' + l.id));
  });
});
txt.forEach(t4 => t4.forEach(s => ph(s).forEach(p => assert(NAMES.includes(p), 'unknown placeholder {' + p + '} in "' + s.slice(0, 40) + '"'))));
Object.keys(C.concepts).forEach(k => four(C.concepts[k], 8, 'concept ' + k));
assert(C.events.length >= 60, 'at least 60 events');
assert(C.events.filter(e => e.opts.length === 4).length >= 45, 'most events offer four alternatives');
C.events.forEach(e => { assert(e.th, e.id + ' has a theme'); e.opts.forEach(o => assert(o.v && o.v.every(v => E.VALUES.includes(v)), e.id + ' option value tag')); });
assert.strictEqual(C.chapters.length, E.DAYS, 'one chapter per day'); C.chapters.forEach(c => { four(c.t, 4, 'chapter title'); four(c.s, 4, 'chapter story'); assert(c.e && c.th.length); });
E.VALUES.forEach(v => { four(C.values[v].n, 4, 'value name'); four(C.values[v].d, 4, 'value text'); });
E.ROLES.forEach(r => four(C.prologue.role[r], 4, 'role prologue')); E.LADDER.forEach(l => four(C.prologue.level[l], 4, 'level prologue'));
/* every place always has something to offer, for every role and level */
E.ROLES.forEach(role => E.LADDER.forEach(level => {
  const s = E.create(role, level, 1);
  E.LOCS.forEach(l => assert(C.events.filter(e => E.fits(e, s, l)).length >= 1, `${role}/${level}: nothing at ${l}`));
  assert(C.events.filter(e => E.fits(e, s, 'desk') || E.fits(e, s, 'meeting') || E.fits(e, s, 'pantry')).length >= 8, role + '/' + level + ' has a rich pool');
}));
/* determinism and clamping */
const run = (role, level, seed, pol) => { const s = E.create(role, level, seed); let guard = 0;
  while (!s.over && s.turn < E.DAYS * E.SLOTS && guard++ < 100) { const locs = E.locsNow(s), l = locs[Math.floor(s.rnd() * locs.length)], e = E.visit(s, l), i = pol === 'first' ? 0 : pol === 'last' ? e.opts.length - 1 : Math.floor(s.rnd() * e.opts.length); E.choose(s, e, i); E.STATS.forEach(k => assert(s.st[k] >= 0 && s.st[k] <= 100, 'stat range')); if (!s.over) E.next(s); }
  if (!s.over) E.retire(s); return s; };
assert.deepStrictEqual(run('finance', 'mid', 5).st, run('finance', 'mid', 5).st, 'same seed, same run');
assert.strictEqual(E.DAYS * E.SLOTS, 24);
/* the job can be lost, and the bar can be met */
let ends = {}, N = 0;
E.ROLES.forEach(role => ['junior', 'mid', 'senior'].forEach(level => { for (let k = 0; k < 120; k++) { const s = run(role, level, k + 1); assert(s.over, 'every run ends'); ends[s.over] = (ends[s.over] || 0) + 1; N++; const sc = E.score(s); assert(sc.stars >= 0 && sc.stars <= 3 && sc.xp > 0, 'score'); } }));
const share = k => (ends[k] || 0) / N;
assert(share('promoted') > 0 && share('steady') + share('promoted') + share('whistle') > 0.3, 'random play should sometimes win: ' + JSON.stringify(ends));
/* balance: careful play usually wins, careless play loses the job, random play lands in between */
const val = (o, s) => { const f = Object.assign({}, o.fx || {}); if (o.g) { const p = typeof o.g.p === 'function' ? o.g.p(s) : o.g.p; ['ok', 'bad'].forEach((b, i) => { const w = i ? 1 - p : p; Object.keys(o.g[b].fx || {}).forEach(k => { f[k] = (f[k] || 0) + w * o.g[b].fx[k]; }); }); }
  const W = { skill: 0.6, perf: 1, rep: 1, integ: 1.2, net: 0.6, energy: 0.4 }; let v = 0; Object.keys(f).forEach(k => { v += W[k] * f[k]; }); Object.keys(o.rel || {}).forEach(k => { v += 0.5 * o.rel[k]; }); return v; };
const pol = (role, level, seed, mode, opt) => { const s = E.create(role, level, seed, opt); let g = 0; while (!s.over && s.turn < E.DAYS * E.SLOTS && g++ < 100) { const L = E.locsNow(s), e = E.visit(s, L[Math.floor(s.rnd() * L.length)]), vs = e.opts.map(o => val(o, s)); E.choose(s, e, vs.indexOf(mode === 'smart' ? Math.max(...vs) : Math.min(...vs))); if (!s.over) E.next(s); } const was = s.promos; if (!s.over) E.retire(s); return { o: s.over, promos: was }; };
const tally = (mode, opt) => { let win = 0, lost = 0, n = 0; E.ROLES.forEach(r => ['junior', 'mid', 'senior'].forEach(l => { for (let k = 1; k <= 60; k++) { const x = pol(r, l, k, mode, opt); n++; if (x.promos > 0) win++; if (x.o.startsWith('fired')) lost++; } })); return { win: win / n, lost: lost / n }; };
const smart = tally('smart'), bad = tally('bad');
assert(smart.win > 0.5 && smart.lost < 0.05, 'careful play should usually be promoted: ' + JSON.stringify(smart));
assert(bad.lost > 0.25 && bad.win < 0.05, 'careless play should often lose the job: ' + JSON.stringify(bad));
assert(share('promoted') < 0.3, 'random play should not usually be promoted');
/* every working style stays viable, every goal can be tracked, and the review picks a variant */
Object.keys(E.TRAITS).forEach(tr => { const t = tally('smart', { trait: tr }); assert(t.win > 0.3 && t.lost < 0.1, 'trait ' + tr + ' stays viable: ' + JSON.stringify(t)); });
E.GOALS.forEach(g => { const s0 = E.create('it', 'mid', 4, { goal: g }); const r = E.goal(s0); assert(r.p >= 0 && r.p <= 1 && typeof r.done === 'boolean', 'goal ' + g); });
{ const s1 = E.create('finance', 'mid', 2); assert.strictEqual(E.review(s1).id, 'r_ok'); s1.st.perf = 90; s1.st.rep = 90; assert.strictEqual(E.review(s1).id, 'r_great'); s1.st.perf = 10; s1.st.rep = 10; assert.strictEqual(E.review(s1).id, 'r_poor'); assert(!C.events.some(e => e.free && E.fits(e, s1, 'meeting')), 'free events never appear at random'); }
/* a performance-minded policy for the long run (energy and integrity count less once they are high) */
const vl = (o, s) => { const f = Object.assign({}, o.fx || {}); if (o.g) { const p = typeof o.g.p === 'function' ? o.g.p(s) : o.g.p; ['ok', 'bad'].forEach((b, i) => { const w = i ? 1 - p : p; Object.keys(o.g[b].fx || {}).forEach(k => { f[k] = (f[k] || 0) + w * o.g[b].fx[k]; }); }); }
  const W = { skill: 1.1, perf: 1.8, rep: 1, integ: s.st.integ > 75 ? 0.1 : 0.6, net: 0.6, energy: s.st.energy > 60 ? 0.05 : 0.5 }; let v = 0; Object.keys(f).forEach(k => { v += W[k] * f[k]; }); Object.keys(o.rel || {}).forEach(k => { v += 0.4 * o.rel[k]; }); return v; };
/* the career is endless: careful play climbs the ladder over many quarters and the stories never run dry */
{ let reached = 0, rep = 0; E.ROLES.forEach(r => { const s3 = E.create(r, 'junior', 21); let g = 0, seen = {}; while (!s3.over && s3.quarters < 12 && g++ < 2000) { const L = E.locsNow(s3), e = E.visit(s3, L[Math.floor(s3.rnd() * L.length)]), vs = e.opts.map(o => vl(o, s3)); if (seen[e.id]) rep++; seen[e.id] = 1; E.choose(s3, e, vs.indexOf(Math.max(...vs))); if (!s3.over) { const n = E.next(s3); if (n === 'quarter') assert(s3.qr && typeof s3.qr.ok === 'boolean', 'quarter result'); } } if (s3.level === 'head' || s3.quarters >= 10) reached++; });
  assert(reached >= 4, 'careful play lasts many quarters in most roles: ' + reached); assert(rep > 20, 'events come back after their cool-down'); }
{ const s4 = E.create('legal', 'senior', 3); s4.promos = 0; s4.warn = 1; Object.keys(E.barOf(s4)).forEach(k => { if (s4.st[k] !== undefined) s4.st[k] = 5; }); s4.turn = E.DAYS * E.SLOTS - 1; assert.strictEqual(E.next(s4), 'end'); assert.strictEqual(s4.over, 'fired_review', 'two missed reviews end the career'); }
/* forced follow-ups fire when due */
const s = E.create('finance', 'junior', 3); s.later.push({ id: 'f_audit_bad', at: s.turn });
assert.strictEqual(E.visit(s, 'desk').id, 'f_audit_bad', 'a due follow-up comes first');
/* zero stats end the run */
const z = E.create('it', 'senior', 9); z.st.integ = 3; const ev = { id: 'x', opts: [{ fx: { integ: -10 }, rel: {} }] }; E.choose(z, ev, 0); assert.strictEqual(z.over, 'fired_integ');
const b = E.create('it', 'mid', 9); b.st.energy = 5; E.choose(b, { id: 'y', opts: [{ fx: { energy: -9 }, rel: {} }] }, 0); assert(b.flags.burned && b.st.energy === 30 && !b.over, 'first burnout is a forced rest');
console.log('endings over ' + N + ' random runs: ' + JSON.stringify(ends));
console.log('corporate-society ' + C.events.length + ' events: ok');
console.log('engine OK');
