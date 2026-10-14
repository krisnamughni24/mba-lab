/* Koperasi: Musim ke Musim (Village Co-op Tycoon): game rules. Pure logic, no DOM. Exposed as MBALAB.coop (and module.exports for node tests).
   Money is "Rp million". One turn = one season (4 per year, 32 turns = 8 years). Rice is counted in tons, other goods in baskets (1 basket = Rp 1 million at wholesale).
   Story events live in data/events.js (MBALAB.coop.EVENTS). */
(function (root) {
  const TURNS = 32;
  const SEGS = ['small', 'big', 'trader', 'home', 'youth'];
  const SEGW = { small: .30, big: .10, trader: .15, home: .30, youth: .15 };      // share of the 600 members
  const VOTEW = { small: .27, big: .23, trader: .15, home: .25, youth: .10 };     // influence at the annual meeting (RAT)
  const RICE_PRICE = [13, 12, 9, 12.5], RICE_SUPPLY = [16, 26, 80, 24], GOODS_SEAS = [1, .95, 1.1, .95], LOAN_SEAS = [1.5, 1.1, .5, .8], RICE_DEM = [1, 1, .95, 1.05];
  const RATE = [.025, .035, .05], APPROVE = [1, .8, .55], DEFMUL = [1.8, 1, .5];
  const INVEST = { none: 0, marketing: 18, visit: 6, collect: 12, training: 25, social: 20, storage: 55, digital: 40 };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const EV = () => (root.MBALAB && root.MBALAB.coop && root.MBALAB.coop.EVENTS) || [];
  const rnd = s => { s.seed = (s.seed + 0x6D2B79F5) | 0; let t = Math.imul(s.seed ^ s.seed >>> 15, 1 | s.seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const clone = o => JSON.parse(JSON.stringify(o));

  const defaults = () => ({ markup: .15, restock: 175, riceBuy: 24, ricePay: 1, rate: 1, screen: 1, action: 'none' });
  const season = s => s.t % 4, year = s => Math.floor(s.t / 4);
  const infl = s => Math.pow(1.025, year(s));
  const riceMarket = s => RICE_PRICE[season(s)] * infl(s) * (s.shocks.ricePrice[1] > 0 ? s.shocks.ricePrice[0] : 1);
  const goodsCost = s => infl(s);
  const trust = s => SEGS.reduce((a, k) => a + SEGW[k] * s.sat[k], 0);
  const equity = s => s.cash + s.goods * goodsCost(s) + s.rice * s.riceCost + s.loans - s.debt;
  const unlocked = (s, k) => !((k === 'storage' && s.inv.storage) || (k === 'digital' && s.inv.digital >= 1));

  function create(seed) {
    const s = {
      seed: seed || 20260101, t: 0, cash: 150, debt: 0, goods: 140, rice: 10, riceCost: 12, loans: 260, legacy: 45, reserve: 30, social: 0, ethics: 50, comp: 0, ovh: 0,
      sat: { small: 56, big: 60, trader: 54, home: 62, youth: 50 }, mod: { small: 0, big: 0, trader: 0, home: 0, youth: 0 },
      inv: { digital: 0, storage: 0, training: 0 }, flags: {}, shocks: { harvest: 1, defMul: [1, 0], demand: [1, 0], ricePrice: [1, 0] },
      yearProfit: 0, hist: [], seen: [], stats: { spoiled: 0, lostSales: 0, stockouts: 0, writeoff: 0, riceBought: 0, dividends: 0, interest: 0 },
      rat: { warn: 0, passed: 0, log: [] }, phase: 'event', pending: null, last: null, report: null, over: false, ending: null, acquiredPrice: 0
    };
    s.eq0 = equity(s);
    startTurn(s);
    return s;
  }

  /* ---------- effects (from story events) ---------- */
  function applyEff(s, e) {
    if (!e) return;
    if (typeof e === 'function') e = e(s);
    if (!e) return;
    if (e.gamble) { const win = rnd(s) < e.gamble.p; s.last = win ? 'w' : 'l'; applyEff(s, win ? e.gamble.win : e.gamble.lose); }
    const num = k => (e[k] || 0);
    s.cash += num('cash'); s.goods = Math.max(0, s.goods + num('goods')); s.rice = Math.max(0, s.rice + num('rice')); s.loans = Math.max(0, s.loans + num('loans'));
    s.debt = Math.max(0, s.debt + num('debt')); s.ethics = clamp(s.ethics + num('ethics'), 0, 100); s.social += num('social'); s.legacy = Math.max(0, s.legacy + num('legacy'));
    s.comp = clamp(s.comp + num('comp'), 0, 3); s.ovh += num('ovh'); s.reserve += num('reserve');
    if (e.sat) SEGS.forEach(k => { if (e.sat[k]) { s.mod[k] += e.sat[k]; s.sat[k] = clamp(s.sat[k] + e.sat[k] * .5, 5, 98); } });
    if (e.satAll) SEGS.forEach(k => { s.mod[k] += e.satAll; s.sat[k] = clamp(s.sat[k] + e.satAll * .5, 5, 98); });
    if (e.harvest) s.shocks.harvest *= e.harvest;
    ['defMul', 'demand', 'ricePrice'].forEach(k => { if (e[k]) s.shocks[k] = [e[k][0], e[k][1]]; });
    if (e.flag) (Array.isArray(e.flag) ? e.flag : [e.flag]).forEach(f => { s.flags[f] = 1; });
    if (e.unflag) (Array.isArray(e.unflag) ? e.unflag : [e.unflag]).forEach(f => { delete s.flags[f]; });
    if (e.inv) Object.keys(e.inv).forEach(k => { s.inv[k] = (s.inv[k] || 0) + e.inv[k]; });
    if (e.end) { s.ending = e.end; if (e.end === 'acquired') s.over = true; }
  }

  /* ---------- turn start: pick the story event for this season ---------- */
  function startTurn(s) {
    s.pending = null; s.last = null;
    const all = EV(), scripted = all.find(x => x.turn === s.t);
    let ev = scripted || null;
    if (!ev && rnd(s) < .5) {
      const pool = all.filter(x => x.turn == null && !s.seen.includes(x.id) && (!x.when || x.when(s)));
      const sum = pool.reduce((a, x) => a + (x.w || 1), 0);
      if (pool.length) { let r = rnd(s) * sum; for (const x of pool) { r -= (x.w || 1); if (r <= 0) { ev = x; break; } } ev = ev || pool[0]; }
    }
    if (ev) { s.seen.push(ev.id); s.pending = ev.id; if (ev.pre) applyEff(s, ev.pre); s.phase = 'event'; } else s.phase = 'plan';
    return ev;
  }
  const eventOf = s => EV().find(x => x.id === s.pending) || null;
  function choose(s, choiceId) {
    const ev = eventOf(s); if (!ev) { s.phase = 'plan'; return s; }
    const c = ev.choices.find(x => x.id === choiceId) || ev.choices[0];
    s.last = null; applyEff(s, c.eff);
    s.lastChoice = { ev: ev.id, c: c.id, res: s.last || (c.rk ? c.rk(s) : '') };
    s.pending = null; s.phase = s.over ? 'end' : 'plan';
    if (s.over) finish(s);
    return s;
  }

  /* ---------- the season ---------- */
  function step(s, d, opt) {
    opt = opt || {}; const noise = opt.noise == null ? .08 : opt.noise;
    const q = k => (opt.noise === 0 ? 0 : (rnd(s) - .5) * 2 * noise);
    const se = season(s), inf = infl(s), cost = goodsCost(s), rm = riceMarket(s);
    d = Object.assign(defaults(), d || {});
    const R = { t: s.t, season: se, year: year(s), riceMkt: rm, cost, markup: d.markup };
    const trustHome = s.sat.home, L = (s.sat.home * .5 + s.sat.youth * .25 + s.sat.small * .25) / 100;
    const cash0 = s.cash;

    /* investment */
    const invCost = (INVEST[d.action] || 0) * (d.action === 'none' ? 0 : 1) * (s.flags.devfund ? .85 : 1);
    if (d.action && d.action !== 'none' && unlocked(s, d.action)) {
      s.cash -= invCost; R.invest = invCost; R.action = d.action;
      if (d.action === 'digital') s.inv.digital = 1; else if (d.action === 'storage') s.inv.storage = 1; else if (d.action === 'training') s.inv.training = Math.min(3, s.inv.training + 1);
      else if (d.action === 'social') { s.social += 20; s.mod.home += 5; s.mod.small += 3; s.mod.youth += 2; s.ethics = clamp(s.ethics + 1, 0, 100); }
      else if (d.action === 'visit') SEGS.forEach(k => { s.mod[k] += 3; s.sat[k] = clamp(s.sat[k] + 1.5, 5, 98); });
    } else { R.invest = 0; R.action = 'none'; }

    /* buying: rice from members, other goods from the wholesaler */
    const supply = Math.max(0, RICE_SUPPLY[se] * (se === 2 ? s.shocks.harvest : 1) * (.65 + s.sat.small / 160 + (d.ricePay - 1) * 2.2) * (1 + q()));
    const bought = Math.min(d.riceBuy, supply), pay = bought * rm * d.ricePay;
    s.riceCost = s.rice + bought > 0 ? (s.rice * s.riceCost + pay) / (s.rice + bought) : s.riceCost;
    s.rice += bought; s.cash -= pay; R.riceSupply = supply; R.riceBought = bought; R.ricePaid = pay; s.stats.riceBought += bought;
    const gBuy = d.restock * cost; s.goods += d.restock; s.cash -= gBuy; R.goodsBought = d.restock; R.goodsPaid = gBuy;
    if (se === 2) s.shocks.harvest = 1;

    /* retail demand */
    const dig = s.inv.digital, comp = s.comp;
    const priceEff = clamp(1 - 2.2 * (d.markup - .15), .25, 1.5);
    const compEff = Math.max(.35, 1 - .10 * comp - comp * Math.max(0, d.markup - (.16 - .03 * comp)) * 2.5);
    const mk = d.action === 'marketing' ? 1.07 : 1, dm = s.shocks.demand[1] > 0 ? s.shocks.demand[0] : 1, pm = s.flags.partner ? 1.08 : 1;
    const demand = 200 * GOODS_SEAS[se] * (.55 + .7 * L) * priceEff * compEff * mk * (1 + .06 * dig + .03 * s.inv.training) * dm * pm * (1 + q());
    const sold = Math.min(demand, s.goods), lost = Math.max(0, demand - s.goods);
    s.goods -= sold; s.goods *= .985;
    R.demand = demand; R.sold = sold; R.lost = lost; R.revGoods = sold * cost * (1 + d.markup); R.cogs = sold * cost;
    s.cash += R.revGoods; s.stats.lostSales += lost; if (lost > demand * .1) s.stats.stockouts++;

    /* rice sales and spoilage */
    const rDem = 28 * RICE_DEM[se] * (.6 + .6 * L) * (1 - .05 * comp) * dm * (1 + q());
    const rSold = Math.min(rDem, s.rice), rPrice = rm * (1 + d.markup * .6);
    s.rice -= rSold; R.riceSold = rSold; R.revRice = rSold * rPrice; R.cogsRice = rSold * s.riceCost; s.cash += R.revRice;
    const spoil = s.rice * (s.inv.storage ? .04 : .12); s.rice -= spoil; R.spoil = spoil; s.stats.spoiled += spoil * s.riceCost;

    /* savings & loans */
    const q2 = RATE[d.rate], dr = .012 * DEFMUL[d.screen] * (s.shocks.defMul[1] > 0 ? s.shocks.defMul[0] : 1) * (1 + .15 * d.rate) * (d.action === 'collect' ? .65 : 1) * (dig ? .9 : 1) * (1 + q());
    const legacyDef = s.legacy * .035;
    const want = 90 * LOAN_SEAS[se] * (1.25 - .25 * d.rate) * inf * (.75 + L * .35), disburse = Math.max(0, Math.min(want * APPROVE[d.screen], Math.max(0, s.cash - 30)));
    const repay = s.loans * .33, dfl = Math.min(s.loans, s.loans * dr + legacyDef), interest = (s.loans - dfl) * q2;
    s.legacy = Math.max(0, s.legacy - legacyDef);
    s.loans = Math.max(0, s.loans - repay - dfl + disburse); s.cash += repay + interest - disburse;
    R.disburse = disburse; R.repay = repay; R.interest = interest; R.defaults = dfl; s.stats.writeoff += dfl; s.stats.interest += interest;

    /* overhead and debt */
    const ovh = (29 + 3 * s.inv.training + s.ovh + (s.inv.digital ? 3 : 0) + (s.inv.storage ? 4 : 0)) * inf + s.loans * (dig ? .006 : .01) + s.debt * .035;
    s.cash -= ovh; R.overhead = ovh;
    R.profit = (R.revGoods - R.cogs) + (R.revRice - R.cogsRice) + interest - dfl - ovh - R.invest * (['storage', 'digital'].includes(R.action) ? .3 : 1);
    s.yearProfit += R.profit;
    if (s.cash < 0) { s.debt += -s.cash; R.borrowed = -s.cash; s.cash = 0; } else R.borrowed = 0;
    R.cashEnd = s.cash; R.cashDelta = s.cash - cash0;

    /* member satisfaction */
    const boughtShare = supply > 0 ? bought / supply : 0, lostR = demand > 0 ? lost / demand : 0, f = s.flags, mkd = d.markup - .15, pf = d.ricePay - 1;
    const T = {
      small: 52 + pf * 170 + [8, 0, -12][d.rate] + [6, 0, -9][d.screen] + (s.inv.storage ? 3 : 0) + (f.darmo ? 6 : 0) - (f.dimas ? 4 : 0),
      big: 54 + pf * 230 + boughtShare * 10 + [3, 0, -4][d.rate] + (f.darmo ? 4 : 0),
      trader: 50 + [10, 0, -14][d.rate] + [8, 0, -12][d.screen] + (dig ? 5 : 0) - mkd * 60,
      home: 66 - mkd * 220 - lostR * 60 + s.inv.training * 2 + Math.min(8, s.social / 12) - (f.pricewar ? 0 : 0),
      youth: 46 + (dig ? 20 : 0) - mkd * 120 + s.inv.training * 1.5 + (f.dimas ? 8 : 0) - (f.darmo ? 6 : 0) + Math.min(5, s.social / 20)
    };
    const before = clone(s.sat);
    SEGS.forEach(k => { s.sat[k] = clamp(s.sat[k] + (clamp(T[k] + s.mod[k], 5, 98) - s.sat[k]) * .3, 5, 98); s.mod[k] *= .75; });
    R.satDelta = {}; SEGS.forEach(k => { R.satDelta[k] = s.sat[k] - before[k]; }); R.trust = trust(s);
    ['defMul', 'demand', 'ricePrice'].forEach(k => { if (s.shocks[k][1] > 0) s.shocks[k][1]--; });
    s.hist.push({ t: s.t, cash: s.cash, trust: R.trust, profit: R.profit, loans: s.loans, eq: equity(s) });
    s.report = R; s.phase = 'report';
    if (s.debt > 220 || equity(s) < s.eq0 * .35) { s.ending = 'bankrupt'; s.over = true; finish(s); }
    return R;
  }
  const preview = (s, d) => { const c = clone(s); c.seed = s.seed; const keep = c.pending; const r = step(c, d, { noise: 0 }); c.pending = keep; return r; };

  /* ---------- after the season report ---------- */
  function next(s) {
    if (s.over) { s.phase = 'end'; return s; }
    if (s.t % 4 === 3) { s.phase = 'rat'; return s; }
    return advance(s);
  }
  function advance(s) {
    s.t++;
    if (s.t >= TURNS) { s.over = true; s.ending = s.ending || 'time'; finish(s); return s; }
    startTurn(s); return s;
  }

  /* ---------- annual meeting (RAT) ---------- */
  const ratInfo = s => ({ year: year(s) + 1, profit: s.yearProfit, reserve: s.reserve, trust: trust(s), warn: s.rat.warn });
  function ratDecide(s, alloc) {
    const profit = s.yearProfit, m = clamp(alloc.members, 0, 80), r = clamp(alloc.reserve, 0, 100 - m), so = 100 - m - r, P = Math.max(0, profit);
    const pay = P * m / 100, res = P * r / 100, soc = P * so / 100;
    s.cash -= pay + soc; s.reserve += res; s.social += soc; s.stats.dividends += pay;
    if (P > 0) { SEGS.forEach(k => { s.sat[k] = clamp(s.sat[k] + 2 + m * .1 + (k === 'home' ? so * .06 : 0), 5, 98); }); } else SEGS.forEach(k => { s.sat[k] = clamp(s.sat[k] - 4, 5, 98); });
    if (res > 0) s.ethics = clamp(s.ethics + 1, 0, 100);
    if (s.cash < 0) { s.debt += -s.cash; s.cash = 0; }
    const f = s.flags;
    let support = SEGS.reduce((a, k) => a + VOTEW[k] * s.sat[k], 0) / 100 + (f.darmo ? .01 : 0) - (s.debt > 80 ? .04 : 0) + (s.reserve > 60 ? .02 : 0);
    const need = year(s) === 0 ? .45 : .5, warnAt = need - .08;
    const out = support >= need ? 'pass' : support >= warnAt ? 'warn' : 'out';
    if (out === 'warn') { s.rat.warn++; SEGS.forEach(k => { s.sat[k] = clamp(s.sat[k] - 3, 5, 98); }); } else if (out === 'pass') s.rat.passed++;
    s.rat.log.push({ year: year(s) + 1, profit, pay, res, soc, support, out, m, r, so });
    s.yearProfit = 0;
    const lastRes = { year: year(s) + 1, profit, pay, res, soc, support, out };
    if (out === 'out' || (out === 'warn' && s.rat.warn >= 2)) { s.ending = 'dismissed'; s.over = true; finish(s); return lastRes; }
    advance(s); return lastRes;
  }

  /* ---------- end of the campaign: score, ending and lessons ---------- */
  function finish(s) {
    if (s.final) return s.final;
    const eq = equity(s) + (s.ending === 'acquired' ? 80 : 0), g = eq / s.eq0;
    let fin = clamp(40 + (g - 1) * 110 - s.debt * .15 - (s.stats.writeoff / 12), 0, 100);
    const tr = trust(s), indep = s.ending === 'acquired' ? 15 : s.flags.partner ? 60 : s.flags.indep ? 100 : 85;
    const soc = clamp(s.social * 1.1 + s.sat.home * .3, 0, 100), eth = s.ethics;
    let score = fin * .30 + tr * .30 + indep * .15 + soc * .10 + eth * .15;
    let end = s.ending || 'time';
    if (end === 'dismissed') score = Math.min(score * .7, 42); else if (end === 'bankrupt') score = Math.min(score * .5, 25);
    if (end === 'time') end = score >= 78 && indep >= 85 ? 'flagship' : (s.flags.partner && tr >= 66 && fin >= 55) ? 'federation' : (s.ethics < 30 ? 'scandal' : score >= 58 ? 'steady' : 'survived');
    const ls = [], st = s.stats;
    if (s.debt > 80 || end === 'bankrupt') ls.push('lsDebt');
    if (st.writeoff > 70) ls.push('lsNpl');
    if (st.spoiled > 45) ls.push('lsSpoil');
    if (st.stockouts >= 4) ls.push('lsStockout');
    if (tr < 55) ls.push('lsTrust');
    if (s.comp >= 2 && s.sat.home < 55) ls.push('lsComp');
    if (s.ethics < 40) ls.push('lsEthics');
    if (!s.inv.digital && !s.inv.storage && s.inv.training === 0) ls.push('lsInvest');
    if (st.dividends < 10 && end !== 'dismissed') ls.push('lsDividend');
    if (!ls.length) ls.push('lsBalance');
    s.final = { score: Math.round(score), ending: end, parts: { fin: Math.round(fin), trust: Math.round(tr), indep, social: Math.round(soc), ethics: Math.round(eth) }, equity: eq, g, lessons: ls.slice(0, 3), turns: s.t + (s.phase === 'end' ? 0 : 1), stats: clone(st) };
    s.phase = 'end'; s.over = true; return s.final;
  }
  const result = s => s.final || finish(s);

  const api = { TURNS, SEGS, SEGW, VOTEW, INVEST, RICE_PRICE, RICE_SUPPLY, defaults, create, startTurn, eventOf, choose, step, preview, next, ratInfo, ratDecide, result, season, year, trust, equity, riceMarket, unlocked, clone };
  root.MBALAB = root.MBALAB || {}; root.MBALAB.coop = Object.assign(root.MBALAB.coop || {}, api);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
