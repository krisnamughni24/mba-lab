/* Van Westendorp Price Sensitivity Meter: pure logic (no DOM, no MBALAB), testable in node.
   Four questions per respondent: too cheap < cheap (bargain) < expensive < too expensive.
   Curves (share of respondents at each price):
     tooCheap(p)  = share whose "too cheap" price  >= p    (falls)
     cheap(p)     = share whose "cheap" price      >= p    (falls)
     expensive(p) = share whose "expensive" price  <= p    (rises)
     tooExp(p)    = share whose "too expensive"    <= p    (rises)
   Points:  PMC = tooCheap x notCheap(=1-cheap)   OPP = tooCheap x tooExp
            IPP = cheap x expensive               PME = tooExp x notExpensive(=1-expensive)   */
(function (root) {
  'use strict';
  const SCEN = [
    { id: 'kopi',   icon: '☕', med: [9000, 17000, 28000, 40000],       cost: 11000,  max: 70000,   step: 500 },
    { id: 'sepatu', icon: '👟', med: [150000, 330000, 560000, 800000],  cost: 210000, max: 1400000, step: 10000 },
    { id: 'app',    icon: '📱', med: [15000, 39000, 79000, 129000],     cost: 12000,  max: 230000,  step: 1000 },
    { id: 'batik',  icon: '👘', med: [120000, 260000, 480000, 750000],  cost: 170000, max: 1300000, step: 10000 }
  ];
  const DEF = { n: 200, spread: .35, brand: 0, noise: .15 };

  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function gauss(r) { let u = 0, v = 0; while (!u) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

  /* synthetic panel: every respondent has a personal price level (lognormal, "spread") and answers each question with some jitter ("noise") */
  function generate(seed, scen, o) {
    o = Object.assign({}, DEF, o || {}); const r = rng(seed || 1), rows = [];
    const eps = .05 + o.noise * .30;
    for (let i = 0; i < o.n; i++) {
      const lvl = Math.exp(o.spread * gauss(r)) * (1 + o.brand);
      rows.push(scen.med.map(m => Math.max(1, Math.round(m * lvl * Math.exp(eps * gauss(r)) / (scen.step || 1)) * (scen.step || 1))));
    }
    return rows;
  }
  /* keep only logically ordered answers: too cheap <= cheap <= expensive <= too expensive */
  function clean(rows) {
    const ok = rows.filter(a => a.length === 4 && a.every(x => isFinite(x) && x > 0) && a[0] <= a[1] && a[1] <= a[2] && a[2] <= a[3] && a[0] < a[3]);
    return { ok, bad: rows.length - ok.length };
  }
  function parse(text) {
    const rows = []; String(text || '').split(/\r?\n/).forEach(line => {
      const nums = line.replace(/\./g, '').split(/[\s,;\t]+/).filter(Boolean).map(Number);   /* "25.000" -> 25000 */
      if (nums.length >= 4 && nums.slice(0, 4).every(x => isFinite(x))) rows.push(nums.slice(0, 4));
    });
    return rows;
  }
  function niceStep(max) { const raw = max / 140, p = Math.pow(10, Math.floor(Math.log10(raw))); return [1, 2, 2.5, 5, 10].map(x => x * p).find(x => x >= raw) || p * 10; }
  function gridFor(rows) { const mx = Math.max.apply(null, rows.map(a => a[3])) * 1.15, step = niceStep(mx); return { max: Math.ceil(mx / step) * step, step }; }

  function curves(ok, grid) {
    const n = ok.length, xs = [], tc = [], c = [], e = [], te = [];
    const col = k => ok.map(a => a[k]).sort((a, b) => a - b);
    const A = col(0), B = col(1), C = col(2), D = col(3);
    const geq = (arr, p) => { let lo = 0, hi = arr.length; while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] < p) lo = m + 1; else hi = m; } return arr.length - lo; };   /* count >= p */
    const leq = (arr, p) => { let lo = 0, hi = arr.length; while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] <= p) lo = m + 1; else hi = m; } return lo; };                 /* count <= p */
    for (let p = 0; p <= grid.max + 1e-9; p += grid.step) {
      xs.push(p); tc.push(geq(A, p) / n); c.push(geq(B, p) / n); e.push(leq(C, p) / n); te.push(leq(D, p) / n);
    }
    return { xs, tc, c, e, te, nc: c.map(x => 1 - x), ne: e.map(x => 1 - x) };
  }
  /* first crossing of two curves, linear interpolation between grid points */
  function cross(xs, f, g) {
    for (let i = 1; i < xs.length; i++) {
      const d0 = f[i - 1] - g[i - 1], d1 = f[i] - g[i];
      if (d0 === 0 && i > 1) return { x: xs[i - 1], y: f[i - 1] };
      if (d0 * d1 < 0 || d1 === 0) { const k = d0 === d1 ? 0 : d0 / (d0 - d1), y = f[i - 1] + (f[i] - f[i - 1]) * k; return { x: xs[i - 1] + (xs[i] - xs[i - 1]) * k, y }; }
    }
    return null;
  }
  function analyze(rows, grid) {
    const cl = clean(rows); if (cl.ok.length < 5) return { n: cl.ok.length, bad: cl.bad, ok: cl.ok, valid: false };
    grid = grid || gridFor(cl.ok); const cv = curves(cl.ok, grid);
    const pts = { pmc: cross(cv.xs, cv.tc, cv.nc), pme: cross(cv.xs, cv.te, cv.ne), opp: cross(cv.xs, cv.tc, cv.te), ipp: cross(cv.xs, cv.c, cv.e) };
    const sane = !!(pts.pmc && pts.pme && pts.opp && pts.ipp && pts.pmc.x <= pts.pme.x);
    return { n: cl.ok.length, bad: cl.bad, ok: cl.ok, valid: true, sane, grid, cv, pts };
  }
  /* shares at an arbitrary price (interpolated on the grid) */
  function at(res, p) {
    const cv = res.cv, xs = cv.xs, st = res.grid.step; let i = Math.max(0, Math.min(xs.length - 2, Math.floor(p / st))); const k = Math.max(0, Math.min(1, (p - xs[i]) / st));
    const f = a => a[i] + (a[i + 1] - a[i]) * k, tc = f(cv.tc), te = f(cv.te);
    const e = f(cv.e), clean = Math.max(0, 1 - e - tc), hes = Math.max(0, e - te);   /* happy / hesitant buyers */
    return { tc, c: f(cv.c), e, te, buy: clean + .4 * tc + .5 * hes };
  }
  /* teaching proxy for demand: comfortable buyers count fully, those who find it expensive half, those who find it too cheap 40% (quality doubt), too expensive nobody. Profit index = margin x that share */
  const profit = (res, p, cost) => (p - cost) * at(res, p).buy;
  function bestInRange(res, cost) {
    if (!res.sane) return null; let best = null;
    for (let p = Math.ceil(res.pts.pmc.x / res.grid.step) * res.grid.step; p <= res.pts.pme.x; p += res.grid.step) { const v = profit(res, p, cost); if (!best || v > best.v) best = { p, v }; }
    return best;
  }
  /* which zone a price sits in: 0 below PMC, 1 PMC-OPP, 2 OPP-IPP, 3 IPP-PME, 4 above PME */
  function zone(res, p) {
    const q = res.pts; if (!res.sane) return -1; const lo = Math.min(q.opp.x, q.ipp.x), hi = Math.max(q.opp.x, q.ipp.x);
    return p < q.pmc.x ? 0 : p > q.pme.x ? 4 : p < lo ? 1 : p <= hi ? 2 : 3;
  }
  function score(res, p, cost) {
    const b = bestInRange(res, cost); if (!b || b.v <= 0) return 0; const v = profit(res, p, cost);
    return Math.max(0, Math.min(100, Math.round(v / b.v * 100)));
  }

  /* ---------- mission game: hidden market, interviews, launch week ---------- */
  const LEVELS = [
    { id: 'kopi',   scen: 'kopi',   owner: 'Bu Sari',   ic: 1,  spread: .30, noise: .10, brand: 0,   seed: 101 },
    { id: 'sepatu', scen: 'sepatu', owner: 'Mas Dimas', ic: .5, spread: .40, noise: .15, brand: -.1, seed: 202 },
    { id: 'app',    scen: 'app',    owner: 'Kak Nadia', ic: 2,  spread: .40, noise: .45, brand: 0,   seed: 303 },
    { id: 'batik',  scen: 'batik',  owner: 'Bu Wulan',  ic: .5, spread: .50, noise: .20, brand: .2,  seed: 404 }
  ];
  const POP = 300;
  /* the whole market (everyone's four answers, even the inconsistent ones), the interview order and one random number per shopper */
  function market(lv, attempt) {
    const sc = SCEN.find(x => x.id === lv.scen), seed = lv.seed + (attempt || 0) * 7919, r = rng(seed + 5);
    const pop = generate(seed, sc, { n: POP, spread: lv.spread, noise: lv.noise, brand: lv.brand });
    const order = pop.map((_, i) => i); for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const x = order[i]; order[i] = order[j]; order[j] = x; }
    return { sc, pop, order, u: pop.map(() => r()), cost: sc.cost, ic: Math.round(sc.cost * lv.ic / 100) * 100 || 100 };
  }
  /* how one shopper reacts at a price: 'buy', 'hes' (finds it expensive, buys half the time), 'doubt' (too cheap, quality doubt) or 'no' */
  function reaction(row, p, u) {
    const a = row.slice().sort((x, y) => x - y);
    if (p > a[3]) return 'no';
    if (p > a[2]) return u < .5 ? 'hes' : 'no';
    if (p < a[0]) return u < .4 ? 'doubt' : 'no';
    return 'buy';
  }
  const buys = r => r === 'buy' || r === 'hes' || r === 'doubt';
  function launch(m, p) {
    const res = m.pop.map((row, i) => reaction(row, p, m.u[i])); let n = 0; res.forEach(r => { if (buys(r)) n++; });
    return { res, sales: n, revenue: n * p, profit: n * (p - m.cost) };
  }
  function hindsight(m) {
    let best = { p: m.sc.step, profit: -Infinity }; for (let p = m.sc.step; p <= m.sc.max; p += m.sc.step) { const pr = launch(m, p).profit; if (pr > best.profit) best = { p, profit: pr }; } return best;
  }
  /* bootstrap spread of the range edges: 10th-90th percentile over resamples */
  function bootstrap(ok, grid, B, seed) {
    const r = rng(seed || 3), out = { pmc: [], pme: [], opp: [], ipp: [] };
    for (let b = 0; b < (B || 30); b++) {
      const smp = []; for (let i = 0; i < ok.length; i++) smp.push(ok[Math.floor(r() * ok.length)]);
      const cv = curves(smp, grid);
      [['pmc', cv.tc, cv.nc], ['pme', cv.te, cv.ne], ['opp', cv.tc, cv.te], ['ipp', cv.c, cv.e]].forEach(a => { const q = cross(cv.xs, a[1], a[2]); if (q) out[a[0]].push(q.x); });
    }
    const pc = (a, q) => { a.sort((x, y) => x - y); return a.length ? a[Math.min(a.length - 1, Math.floor(q * a.length))] : null; };
    const o = {}; Object.keys(out).forEach(k => { o[k] = out[k].length >= 5 ? [pc(out[k], .1), pc(out[k], .9)] : null; }); return o;
  }
  const api = { LEVELS, POP, market, reaction, buys, launch, hindsight, bootstrap, SCEN, DEF, rng, generate, clean, parse, gridFor, curves, cross, analyze, at, profit, bestInRange, zone, score };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root.MBALAB) root.MBALAB.vw = api;
})(typeof window !== 'undefined' ? window : globalThis);
