/* Life 40 (Time Value of Money life simulator): rules only, no DOM. Money is in Rp million (nominal, that year).
   One round = one year, age 22 to 62. The market (regimes, inflation, returns) is fixed by the seed, so a "wise" run
   can be replayed on exactly the same economy for comparison. */
(function () {
  const root = typeof MBALAB !== 'undefined' ? MBALAB : (globalThis.MBALAB = globalThis.MBALAB || {});
  const START = 22, END = 62, YEARS = END - START;

  const rng = seed => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const pick = (r, o) => { let x = r(), k; for (k in o) { x -= o[k]; if (x <= 0) return k; } return k; };
  const lerp = (a, b, x) => a + (b - a) * x;
  const pmt = (P, r, n) => r ? P * r / (1 - Math.pow(1 + r, -n)) : P / n;

  /* three starting situations */
  const BG = {
    rich: { salary: 150, living: 60, rent: 48, size: 2.2, house: 1400, car: 450, sup: 0, assets: { cash: 120, dep: 250, fund: 120, gold: 60 }, debts: [] },
    normal: { salary: 84, living: 33, rent: 18, size: 1, house: 550, car: 220, sup: 0, assets: { cash: 15, dep: 10, fund: 0, gold: 0 }, debts: [] },
    poor: { salary: 54, living: 20, rent: 9, size: 0.8, house: 300, car: 22, sup: 6, assets: { cash: 2, dep: 0, fund: 0, gold: 0 }, debts: [{ name: 'edu', bal: 30, rate: 0.10, yrs: 5 }] }
  };
  /* three difficulty levels */
  const LV = {
    easy: { infl: 0.03, sd: 0.008, crisis: 0.04, spike: 0.02, shock: 0.6, ev: 1.5, merit: 0.02, link: 0.9, sal: 1.08, mort: 0.085, hint: true, cash: { rich: 0, normal: 10, poor: 8 } },
    medium: { infl: 0.04, sd: 0.012, crisis: 0.07, spike: 0.05, shock: 1, ev: 2, merit: 0.013, link: 0.7, sal: 1, mort: 0.095, hint: true, cash: { rich: 0, normal: 0, poor: 0 } },
    hard: { infl: 0.055, sd: 0.02, crisis: 0.15, spike: 0.12, shock: 1.7, ev: 2.6, merit: 0.008, link: 0.55, sal: 0.94, mort: 0.11, hint: false, cash: { rich: 0, normal: 0, poor: 0 }, poorDebt: 40 }
  };
  const MIX = { safe: { dep: 0.8, fund: 0.1, gold: 0.1 }, balanced: { dep: 0.35, fund: 0.5, gold: 0.15 }, growth: { dep: 0.1, fund: 0.8, gold: 0.1 }, gold: { dep: 0.2, fund: 0.2, gold: 0.6 } };
  const LIFE = [0.8, 1, 1.4], JOY = [2, 4, 6.5];

  /* the economy for all 40 years */
  function world(seed, d) {
    const r = rng(seed * 7919 + 13), W = [], f = d.crisis / 0.07;
    let reg = 'normal';
    for (let y = 0; y < YEARS; y++) {
      const base = { bull: { bull: 0.35, normal: 0.45, bear: 0.15, crisis: 0.05 }, normal: { bull: 0.25, normal: 0.5, bear: 0.15, crisis: 0.10 }, bear: { bull: 0.3, normal: 0.45, bear: 0.2, crisis: 0.05 }, crisis: { bull: 0.5, normal: 0.3, bear: 0.2, crisis: 0 } }[reg];
      const P = Object.assign({}, base); if (P.crisis) { P.crisis *= f; P.normal = Math.max(0, P.normal - (P.crisis - base.crisis)); }
      reg = pick(r, P);
      const spike = r() < d.spike && y > 1, infl = spike ? d.infl + 0.05 + 0.04 * r() : Math.max(0.01, d.infl + (r() - 0.5) * 2 * d.sd * 1.5), x = r(), x2 = r();
      const R = { bull: [0.14, 0.30, 0.02, 0.08, 0.03], normal: [0.04, 0.13, 0.03, 0.10, 0.015], bear: [-0.10, 0.02, 0.04, 0.12, 0], crisis: [-0.38, -0.18, 0.08, 0.25, -0.02] }[reg];
      W.push({ reg, infl, spike, fund: lerp(R[0], R[1], x), gold: lerp(R[2], R[3], x2) + (spike ? 0.04 : 0), house: infl + R[4], dep: Math.max(0.03, infl * 0.7 + 0.025) });
    }
    return W;
  }

  function create(bg, level, seed) {
    const B = BG[bg], D = LV[level], s = {
      bg, level, seed, B, D, W: world(seed, D), rnd: rng(seed * 31 + 7), age: START, y: 0, cpi: 1, hpi: 1,
      salary: B.salary * D.sal, job: 0, yrsJob: 0, edu: 0, gap: 0, side: 0, sideLeft: 0, retired: false,
      cash: B.assets.cash + D.cash[bg], dep: B.assets.dep, fund: B.assets.fund, gold: B.assets.gold,
      house: null, car: false, ins: 1, dplk: 0, eduFund: false, spouse: false, spouseSal: 0, kids: [], kidTier: 'public',
      loans: B.debts.map(x => ({ name: x.name, bal: bg === 'poor' && D.poorDebt ? D.poorDebt : x.bal, rate: x.rate, yrs: x.yrs, pay: pmt(bg === 'poor' && D.poorDebt ? D.poorDebt : x.bal, x.rate, x.yrs) })),
      sup: B.sup, supUntil: 50, lifestyle: 1, saveRate: 0.2, mix: 'safe', extra: false,
      later: [], flags: {}, done: {}, joy: [], joyEv: 0, hist: [], last: null, queue: [], newsLast: null
    };
    s.hist.push(snap(s));
    return s;
  }

  const liquid = s => s.cash + s.dep + s.fund + s.gold;
  const debt = s => s.loans.reduce((a, l) => a + l.bal, 0);
  const worth = s => liquid(s) + (s.house ? s.house.value : 0) - debt(s);
  const snap = s => ({ age: s.age, nw: worth(s), real: worth(s) / s.cpi, liquid: liquid(s), debt: debt(s), house: s.house ? s.house.value : 0, cpi: s.cpi });
  const sz = s => s.cpi * s.B.size;

  /* ---------- effect helpers given to events ---------- */
  function addLoan(s, name, amt, rate, yrs, fx, opt) {
    const l = Object.assign({ name, bal: amt, rate, yrs, pay: pmt(amt, rate, yrs) }, opt || {});
    s.loans.push(l); if (fx) fx.push(['debt', amt]); return l;
  }
  function pay(s, amt, fx) {
    let need = amt; const take = k => { const t = Math.min(s[k], need); s[k] -= t; need -= t; };
    take('cash'); take('dep'); take('gold'); take('fund');
    fx.push(['cash', -amt]);
    if (need > 0.01) {
      /* lenders stop at some point: beyond the cap you simply go without (forced austerity) */
      const used = s.loans.filter(l => l.name === 'pinjol').reduce((a, l) => a + l.bal, 0), cap = Math.max(0, 2 * Math.max(s.salary, 10) * 0.95 - used), take2 = Math.min(need, cap);
      if (take2 > 0.01) { addLoan(s, 'pinjol', take2, 0.36, 2, fx); s.flags.pinjol = (s.flags.pinjol || 0) + 1; }
      if (need - take2 > 0.01) { s.flags.broke = (s.flags.broke || 0) + 1; s.joyEv -= 2; fx.push(['joy', -2]); }
    }
  }
  function toAsset(s, amt, k, fx) { const t = Math.min(amt, s.cash); s.cash -= t; s[k] += t; if (fx) fx.push([k, t]); return t; }
  function X(s, ev) {
    const fx = [], x = {
      fx, m: s.D.shock, size: sz(s), res: null, note: null,
      r: () => s.rnd(), chance: p => s.rnd() < p,
      get: v => { s.cash += v; fx.push(['cash', v]); },
      pay: v => pay(s, v, fx),
      put: (v, k) => toAsset(s, v, k, fx),
      loan: (name, amt, rate, yrs, opt) => addLoan(s, name, amt, rate, yrs, fx, opt),
      sal: p => { s.salary *= 1 + p; fx.push(['salary', p]); },
      joy: n => { s.joyEv += n; fx.push(['joy', n]); },
      later: (yrs, fn, arg) => s.later.push({ at: s.y + yrs, fn, arg }),
      set: (k, v) => { s[k] = v; },
      tag: t => { x.res = t; }
    };
    return x;
  }

  /* ---------- the year ---------- */
  function begin(s) {
    const ev = root.lifeEvents;
    const out = { news: null, queue: [], later: [] };
    /* scheduled consequences first */
    const due = s.later.filter(l => l.at <= s.y); s.later = s.later.filter(l => l.at > s.y);
    due.forEach(l => { const x = X(s); ev.LATER[l.fn](s, x, l.arg); out.later.push({ key: l.fn, fx: x.fx, tag: x.res }); });
    const last = s.y > 0 ? s.W[s.y - 1] : null; s.last = last;
    /* events for the year */
    const forced = [], pool = [];
    ev.LIST.forEach(e => { const w = e.w(s, last); if (w > 0) { if (e.forced) forced.push(e); else pool.push({ e, w }); } });
    let n = Math.floor(s.D.ev) + (s.rnd() < s.D.ev % 1 ? 1 : 0); n = Math.max(1, Math.min(3, n));
    const q = forced.slice(0, 2);
    for (let i = 0; i < n && pool.length; i++) {
      const tot = pool.reduce((a, p) => a + p.w, 0); let x = s.rnd() * tot, k = 0;
      for (; k < pool.length - 1; k++) { x -= pool[k].w; if (x <= 0) break; }
      q.push(pool[k].e); pool.splice(k, 1);
    }
    s.queue = q.slice(0, 4); s.queue.forEach(e => { if (e.pre) e.pre(s); }); out.queue = s.queue;
    return out;
  }
  function can(s, e, i) { const o = e.opts[i]; return o.can ? o.can(s) : true; }
  function choose(s, i) {
    const e = s.queue.shift(), o = e.opts[i], x = X(s, e);
    o.run(s, x);
    s.done[e.id] = s.y;
    return { id: e.id, opt: i, fx: x.fx, tag: x.res };
  }
  function wiseIndex(s, e) { for (let i = 0; i < e.opts.length; i++) { const o = e.opts[i]; if (!can(s, e, i)) continue; if (typeof o.wise === 'function' ? o.wise(s) : o.wise) return i; } for (let i = e.opts.length - 1; i >= 0; i--) if (can(s, e, i)) return i; return 0; }

  function kidCost(s) {
    let c = 0; s.kids.forEach(b => { const a = s.age - b; c += a < 0 ? 0 : a < 6 ? 0.2 : a < 18 ? 0.3 : a < 22 ? (s.kidTier === 'private' ? 0.9 : 0.45) : 0; });
    return c * s.B.living * s.cpi;
  }

  function finish(s) {
    const w = s.W[s.y], d = s.D, row = { age: s.age, reg: w.reg, infl: w.infl, fund: w.fund, gold: w.gold, dep: w.dep, house: w.house, items: [] };
    const nw0 = worth(s), cpi0 = s.cpi;
    /* 1 returns on what you held */
    const g = { dep: s.dep * w.dep, fund: s.fund * w.fund, gold: s.gold * w.gold, cash: s.cash * 0.005, house: s.house ? s.house.value * w.house : 0 };
    s.dep += g.dep; s.fund += g.fund; s.gold += g.gold; s.cash += g.cash; if (s.house) s.house.value += g.house; s.hpi *= 1 + w.house;
    row.gain = g.dep + g.fund + g.gold + g.cash + g.house;
    /* 2 cash flow */
    const sal = s.retired ? 0 : s.salary * (1 - s.gap), income = (sal + s.side) * 0.95 + (s.spouse ? s.spouseSal * 0.95 : 0);
    const lm = LIFE[s.lifestyle], living = s.B.living * s.cpi * lm * (1 + (s.spouse ? 0.5 : 0)) + kidCost(s);
    const housing = s.house ? 0.008 * s.house.value : s.B.rent * s.cpi * (s.spouse ? 1.3 : 1);
    const car = s.car ? s.B.car * 0.09 * s.cpi : 0, supp = s.age <= s.supUntil ? s.sup * s.cpi : 0;
    const ins = (s.ins === 2 ? 0.025 : 0.004) * s.salary, dplk = s.retired ? 0 : s.dplk * s.salary;
    const edf = s.eduFund && s.kids.length ? 0.03 * s.salary : 0;
    let paid = 0;
    s.loans.forEach(l => {
      if (l.float) { l.rate = l.base + Math.max(0, w.infl - d.infl) * 1.2; l.pay = pmt(l.bal, l.rate, Math.max(1, l.yrs)); }
      const due = Math.min(l.pay, l.bal * (1 + l.rate)); l.bal = l.bal * (1 + l.rate) - due; paid += due; l.yrs--;
    });
    s.loans = s.loans.filter(l => l.bal > 0.05);
    if (s.house && s.house.loanName && !s.loans.some(l => l.name === s.house.loanName)) s.house.loanName = null;
    const spend = living + housing + car + supp + ins + paid + dplk + edf;
    let free = income - spend;
    row.income = income; row.spend = spend; row.free = free; row.paid = paid;
    if (!s.retired) s.refInc = income / s.cpi;
    if (dplk) { s.fund += dplk * 2; }
    if (edf) s.dep += edf;
    if (free >= 0) {
      let sv = free * s.saveRate;
      if (s.extra && sv > 0) { const l = s.loans.filter(l => l.rate > 0.10).sort((a, b) => b.rate - a.rate)[0]; if (l) { const t = Math.min(sv, l.bal); l.bal -= t; sv -= t; s.loans = s.loans.filter(x => x.bal > 0.05); row.prepaid = t; } }
      const m = MIX[s.mix]; s.dep += sv * m.dep; s.fund += sv * m.fund; s.gold += sv * m.gold;
      const u = free * (1 - s.saveRate), leak = [0.5, 0.65, 0.85][s.lifestyle];
      s.cash += u * (1 - leak); row.saved = free * s.saveRate; row.leak = u * leak; s.joyEv += Math.min(4, u * leak / Math.max(1, income) * 10);
    } else { const fx = []; pay(s, -free, fx); row.short = -free; if (fx.length > 1) row.pinjol = true; }
    /* 3 joy */
    let j = JOY[s.lifestyle] + (s.spouse ? 0.8 : 0) + s.kids.length * 0.7 + (s.retired ? 1 : 0) + s.joyEv * 0.5;
    if (income > 0 && paid / income > 0.35) j -= 2;
    if (liquid(s) < 0.25 * living) j -= 1.5;
    j = Math.max(0, Math.min(10, j)); s.joy.push(j); s.joyEv = 0;
    /* 4 next year */
    s.cpi *= 1 + w.infl;
    if (!s.retired) { s.salary *= 1 + w.infl * d.link + d.merit; }
    s.spouseSal *= 1 + w.infl * d.link + d.merit * 0.7;
    if (s.side) { s.sideLeft--; s.side *= 1 + w.infl; if (s.sideLeft <= 0) s.side = 0; }
    s.gap = 0; s.age++; s.y++; s.yrsJob++;
    row.nwBefore = nw0 / cpi0; row.nwAfter = worth(s) / s.cpi; row.nominal = worth(s);
    s.hist.push(snap(s));
    if (s.y >= YEARS) s.over = true;
    return row;
  }

  /* ---------- final result ---------- */
  function result(s) {
    const lm = LIFE[1], houseEq = s.house ? s.house.value - s.loans.filter(l => l.name === s.house.loanName).reduce((a, l) => a + l.bal, 0) : 0;
    const other = s.loans.filter(l => !s.house || l.name !== s.house.loanName).reduce((a, l) => a + l.bal, 0);
    const wealth = liquid(s) + 0.7 * houseEq - other, wReal = wealth / s.cpi;
    const E = Math.max(0.7 * (s.refInc || 1), 1);
    const r = 0.025; let N = 0;
    if (wReal > 0) { const k = wReal * r / E; N = k >= 1 ? 40 : Math.min(40, -Math.log(1 - k) / Math.log(1 + r)); }
    const stars = N >= 25 ? 3 : N >= 15 ? 2 : N >= 7 ? 1 : 0;
    const joy = s.joy.reduce((a, b) => a + b, 0) / (s.joy.length || 1) * 10;
    return { wealth, wReal, expenses: E, years: N, endAge: END + N, stars, joy: Math.round(joy), nwReal: worth(s) / s.cpi };
  }

  /* ---------- a sensible player on the same economy ---------- */
  function wisePlay(bg, level, seed) {
    const s = create(bg, level, seed), ev = root.lifeEvents;
    s.saveRate = 0.7; s.mix = 'balanced'; s.extra = true;
    while (!s.over) {
      begin(s);
      while (s.queue.length) { const e = s.queue[0]; choose(s, wiseIndex(s, e)); }
      /* keep a cash cushion; beyond it everything is saved */
      const cushion = s.B.living * s.cpi * 0.6;
      s.saveRate = s.cash < cushion ? 0.35 : 0.85;
      finish(s);
    }
    return { s, res: result(s) };
  }

  root.life = { START, END, YEARS, BG, LV, MIX, LIFE, create, begin, choose, can, wiseIndex, finish, result, wisePlay, liquid, debt, worth, sz, pmt, rng, kidCost };
})();
