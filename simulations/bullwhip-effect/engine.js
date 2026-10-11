/* Bullwhip effect (Beer Game): rules only, no DOM.
   Four tiers, 0 = retail end ... 3 = production end. Orders travel upstream with a 1-week information delay,
   goods travel downstream with a 2-week shipping delay (the production end ships what it orders after 2 weeks). */
(function () {
  const root = typeof MBALAB !== 'undefined' ? MBALAB : (globalThis.MBALAB = globalThis.MBALAB || {});
  const WEEKS = 20, HOLD = 0.5, BACK = 1, SHIP = 2, START_INV = 12, BASE = 4;

  /* Each scenario: a chain of state-owned companies, hulu (upstream) to hilir (downstream), and a demand pattern. */
  const SCEN = [
    { id: 'rice', icon: '🌾', chain: ['bulog', 'divre', 'idfood', 'rpk'], demand: [4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8] },
    { id: 'lpg', icon: '🔥', chain: ['kilang', 'patra', 'agen', 'pangkalan'], demand: [4, 4, 4, 4, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
    { id: 'pharma', icon: '💊', chain: ['biofarma', 'kftd', 'apotek', 'klinik'], demand: [4, 4, 4, 5, 9, 11, 10, 8, 6, 5, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4] }
  ];
  /* index 0..3 below = position from the customer: 0 retail, 1 wholesale, 2 distributor, 3 production */

  const sum = a => a.reduce((s, x) => s + x, 0);
  const mean = a => sum(a) / (a.length || 1);
  const variance = a => { const m = mean(a); return mean(a.map(x => (x - m) * (x - m))); };

  function create(scenId, role, opts) {
    const sc = SCEN.find(s => s.id === scenId) || SCEN[0];
    const g = {
      sc, role, week: 0, weeks: WEEKS, demand: sc.demand.slice(0, WEEKS),
      inv: [START_INV, START_INV, START_INV, START_INV], back: [0, 0, 0, 0],
      ship: [0, 1, 2, 3].map(() => [BASE, BASE]), orderIn: [BASE, BASE, BASE, BASE],
      fc: [BASE, BASE, BASE, BASE], sl: [2 * BASE, 2 * BASE, 2 * BASE, 2 * BASE], cost: [0, 0, 0, 0], hist: [], over: false,
      mode: (opts && opts.mode) || 'local'      /* 'local' = each AI tier sees only its own incoming orders; 'shared' = all see customer demand */
    };
    g.hist.push(snapshot(g, null, null));
    return g;
  }

  function snapshot(g, orders, out) {
    return { inv: g.inv.slice(), back: g.back.slice(), orders: orders ? orders.slice() : [BASE, BASE, BASE, BASE], incoming: (g.view || g.orderIn).slice(), shipped: out ? out.slice() : [BASE, BASE, BASE, BASE], pipe: g.ship.map(s => s.slice()), cost: g.cost.slice(), fc: g.fc.slice() };
  }

  /* supply line = everything ordered and not yet received (in transit + still waiting at the supplier) */
  const pipe = (g, i) => g.sl[i];
  /* the player sees exactly this for their own tier */
  function view(g) {
    const i = g.role;
    return { inv: g.inv[i], back: g.back[i], arriving: g.ship[i][0], later: g.ship[i][1], incoming: i === 0 ? g.demand[g.week] : g.orderIn[i], pipe: pipe(g, i), position: g.inv[i] - g.back[i] + pipe(g, i), week: g.week, demand: g.demand[g.week] };
  }

  /* A reasonable but human-like rule: smooth what you see, try to rebuild a cover of stock, correct half the gap. */
  function aiOrder(g, i, seen) {
    g.fc[i] = 0.6 * g.fc[i] + 0.4 * seen;
    const target = 3 * g.fc[i] + 8;
    const ip = g.inv[i] - g.back[i] + pipe(g, i);
    return Math.max(0, Math.round(g.fc[i] + 0.5 * (target - ip)));
  }

  /* Advance one week. playerOrder = units the player's tier orders from upstream. Returns the new state. */
  function step(g, playerOrder) {
    if (g.over) return g;
    const w = g.week, out = [0, 0, 0, 0], inc = [0, 0, 0, 0], orders = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) { const a = g.ship[i].shift(); g.inv[i] += a; g.sl[i] -= a; }
    for (let i = 0; i < 4; i++) inc[i] = i === 0 ? g.demand[w] : g.orderIn[i];
    g.view = inc.slice();
    for (let i = 0; i < 4; i++) {
      const need = g.back[i] + inc[i];
      out[i] = Math.min(g.inv[i], need);
      g.inv[i] -= out[i]; g.back[i] = need - out[i];
    }
    for (let i = 1; i < 4; i++) g.ship[i - 1].push(out[i]);
    /* production end: the order becomes goods after the shipping delay; placed below, so reserve the slot */
    for (let i = 0; i < 4; i++) {
      if (i === g.role) orders[i] = Math.max(0, Math.round(+playerOrder || 0));
      else orders[i] = aiOrder(g, i, g.mode === 'shared' ? g.demand[w] : inc[i]);
    }
    g.ship[3].push(orders[3]);
    for (let i = 0; i < 4; i++) g.sl[i] += orders[i];
    for (let i = 0; i < 3; i++) g.orderIn[i + 1] = orders[i];
    for (let i = 0; i < 4; i++) g.cost[i] += HOLD * g.inv[i] + BACK * g.back[i];
    g.week++;
    if (g.week >= g.weeks) g.over = true;
    g.hist.push(snapshot(g, orders, out));
    return g;
  }

  /* Run a complete game with all four tiers on AI (used for benchmarks). */
  function auto(scenId, mode) {
    const g = create(scenId, -1, { mode });
    while (!g.over) step(g, 0);
    return g;
  }

  /* Replay the recorded demand but with the AI in every seat. */
  function results(g) {
    const h = g.hist.slice(1), total = sum(g.cost);
    const orders = [0, 1, 2, 3].map(i => h.map(x => x.orders[i]));
    const dem = g.demand.slice(0, h.length);
    const vd = variance(dem) || 1;
    const ratio = orders.map(o => variance(o) / vd);
    const bench = auto(g.sc.id, 'shared'), local = auto(g.sc.id, 'local');
    const bc = sum(bench.cost), lc = sum(local.cost);
    const peak = orders.map(o => Math.max.apply(null, o));
    return { total, tier: g.cost.slice(), orders, demand: dem, ratio, peak, bench: bc, benchOrders: [0, 1, 2, 3].map(i => bench.hist.slice(1).map(x => x.orders[i])), benchRatio: [0, 1, 2, 3].map(i => variance(bench.hist.slice(1).map(x => x.orders[i])) / vd), ai: lc, stars: stars(total, bc) };
  }

  /* Stars compare your team cost with the same chain when every tier can see real customer demand. */
  function stars(total, bench) {
    if (total <= bench * 1.2) return 3;
    if (total <= bench * 1.6) return 2;
    if (total <= bench * 2.4) return 1;
    return 0;
  }

  root.bw = { WEEKS, HOLD, BACK, SCEN, create, step, view, results, auto, variance, mean, sum, aiOrder };
})();
