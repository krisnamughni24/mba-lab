/* Porter's Five Forces: pure logic (no DOM, no MBALAB), testable in node.
   Force order everywhere: [rival, entry, supp, buyer, subs], each 0-100 (100 = most pressure on profit).
   Profit pool kept = 100 - 90 * sum(weight_i * force_i / 100): the share of the industry's potential profit that a firm keeps.
   A move changes forces with diminishing returns: the more intense a force is, the more room a move has to calm it. */
(function (root) {
  'use strict';
  const F = ['rival', 'entry', 'supp', 'buyer', 'subs'];
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  /* weights sum to 1: how much each force matters in this industry */
  const LEVELS = [
    { id: 'kopi',   icon: '☕', owner: 'Dinda',      w: [.30, .25, .10, .20, .15], f: [88, 90, 30, 60, 55] },
    { id: 'ojol',   icon: '🛵', owner: 'Raka',       w: [.25, .15, .20, .25, .15], f: [70, 60, 55, 75, 50] },
    { id: 'semen',  icon: '🏗️', owner: 'Pak Hendra', w: [.20, .15, .30, .25, .10], f: [55, 20, 60, 40, 25] },
    { id: 'lcc',    icon: '✈️', owner: 'Bu Maya',    w: [.25, .10, .30, .25, .10], f: [82, 45, 88, 82, 55] },
    { id: 'wallet', icon: '📱', owner: 'Kevin',      w: [.30, .15, .10, .30, .15], f: [85, 55, 25, 70, 45] }
  ];
  /* fx order: rival, entry, supp, buyer, subs. Negative = calms the force. cost is in profit-pool points. */
  const MOVES = [
    { id: 'loyalty',       fx: [0, 0, 0, -30, -10],    cost: 2 },
    { id: 'contract',      fx: [0, 0, -30, 0, 0],      cost: 1.5 },
    { id: 'brand',         fx: [-10, -25, 0, 0, 0],    cost: 3 },
    { id: 'differentiate', fx: [-25, 0, 0, 0, -15],    cost: 2.5 },
    { id: 'integrate',     fx: [0, -10, -35, 0, 0],    cost: 4 },
    { id: 'pricecut',      fx: [25, -15, 0, 0, 0],     cost: 1 },
    { id: 'acquire',       fx: [-30, 0, 0, 8, 0],      cost: 4.5 },
    { id: 'niche',         fx: [-20, 0, 0, -15, 5],    cost: 2 }
  ];
  const PICKS = 3;

  const kept = (f, w) => 100 - 90 * f.reduce((s, v, i) => s + w[i] * v / 100, 0);
  const takes = (f, w) => f.map((v, i) => 90 * w[i] * v / 100);          /* profit points each force takes */
  const apply = (f, mv) => f.map((v, i) => { const d = mv.fx[i]; if (!d) return v; return clamp(d < 0 ? v + d * (.35 + .65 * v / 100) : v + d * (1 - .5 * v / 100), 0, 100); });
  const byId = id => MOVES.find(m => m.id === id);
  /* run a plan: moves apply in the fixed catalogue order, so the result never depends on click order */
  function run(f0, w, ids) {
    const list = MOVES.filter(m => ids.indexOf(m.id) >= 0); let f = f0.slice(), cost = 0; const steps = [];
    list.forEach(m => { f = apply(f, m); cost += m.cost; steps.push({ id: m.id, f: f.slice(), kept: kept(f, w) }); });
    const k = kept(f, w); return { f, kept: k, cost, net: k - cost, steps };
  }
  function subsets(n, max) { const out = []; (function go(i, cur) { if (cur.length) out.push(cur.slice()); if (cur.length >= max) return; for (let j = i; j < n; j++) { cur.push(j); go(j + 1, cur); cur.pop(); } })(0, []); return out; }
  function best(lv) {
    let top = null; subsets(MOVES.length, PICKS).forEach(ix => { const ids = ix.map(i => MOVES[i].id), r = run(lv.f, lv.w, ids); if (!top || r.net > top.net) top = { ids, net: r.net, f: r.f, kept: r.kept }; });
    return top;
  }
  /* guess 1..5 maps to the middle of its band: 10, 30, 50, 70, 90 */
  const bandVal = g => g * 20 - 10;
  const bandOf = v => clamp(Math.floor(v / 20) + 1, 1, 5);
  function scoreRead(lv, guess) {
    const err = lv.f.map((v, i) => Math.abs(bandVal(guess[i]) - v)), avg = err.reduce((a, b) => a + b, 0) / 5;
    return { score: Math.round(clamp(100 - avg * 1.6, 0, 100)), err, exact: guess.filter((g, i) => g === bandOf(lv.f[i])).length };
  }
  function scoreStrat(lv, ids) {
    const base = kept(lv.f, lv.w), b = best(lv); if (!ids.length) return { score: 0, net: base, base, best: b, r: run(lv.f, lv.w, []) };
    const r = run(lv.f, lv.w, ids), span = b.net - base;
    const score = span <= .5 ? (r.net >= base - .01 ? 100 : 0) : Math.round(clamp((r.net - base) / span, 0, 1) * 100);
    return { score, net: r.net, base, best: b, r };
  }
  /* what each chosen move added or cost, measured against the same plan without it */
  function marginals(lv, ids) { const all = run(lv.f, lv.w, ids).net; return ids.map(id => ({ id, d: all - run(lv.f, lv.w, ids.filter(x => x !== id)).net })); }
  const verdict = k => k < 30 ? 0 : k < 50 ? 1 : k < 70 ? 2 : 3;
  const drain = (f, w) => { const t = takes(f, w); let m = 0; t.forEach((v, i) => { if (v > t[m]) m = i; }); return { i: m, pts: t[m] }; };
  const api = { F, LEVELS, MOVES, PICKS, clamp, kept, takes, apply, byId, run, best, bandVal, bandOf, scoreRead, scoreStrat, marginals, verdict, drain };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else { root.MBALAB = root.MBALAB || {}; root.MBALAB.ff = api; }
})(typeof window !== 'undefined' ? window : globalThis);
