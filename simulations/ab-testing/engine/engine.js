/* A/B Testing: pure logic (no DOM, no MBALAB), testable in node.
   A case = a product with a baseline conversion rate p0 and daily traffic. The player tests one idea (variant B) against the current page (A).
   Each idea has a hidden true relative lift. Traps: novelty (early inflated lift), tiny effects, weekday/weekend patterns, a broken traffic split (SRM), small traffic.
   Days are simulated one at a time with a seeded random generator, so a run is reproducible. */
(function (root) {
  'use strict';
  const Z = 1.959964, ZB = 0.841621;                                   /* two-sided 5% and 80% power */
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const erf = x => { const s = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
  const cdf = z => 0.5 * (1 + erf(z / Math.SQRT2)), pdf = z => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
  const rng = seed => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const gauss = r => Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
  const binom = (n, p, r) => { if (n <= 0) return 0; if (n <= 100) { let c = 0; for (let i = 0; i < n; i++) if (r() < p) c++; return c; } return clamp(Math.round(n * p + Math.sqrt(n * p * (1 - p)) * gauss(r)), 0, n); };

  /* p0 baseline conversion, traffic = visitors per day (both groups), value = rupiah per conversion, minLift = smallest relative lift worth shipping,
     wkT = traffic multiplier [weekday, weekend], srm = real share sent to B when the split is broken (else 0.5), maxDays = longest allowed test.
     idea.lift = true long-run relative lift; nov = {boost, tau} early inflation that fades; wk = [weekday, weekend] multiplier on the lift. Day 0 is a Monday. */
  const CASES = [
    { id: 'kopi',   icon: '☕', p0: 0.08,  traffic: 4000,  value: 38000,  minLift: 0.08, wkT: [1, 1],       srm: 0,    maxDays: 28, ideas: [{ id: 'ship', lift: 0.15 }, { id: 'color', lift: 0 }, { id: 'timer', lift: -0.08 }] },
    { id: 'kursus', icon: '🎓', p0: 0.045, traffic: 1200,  value: 450000, minLift: 0.15, wkT: [1, 1],       srm: 0,    maxDays: 42, ideas: [{ id: 'video', lift: 0.25 }, { id: 'anchor', lift: 0.08 }, { id: 'scarcity', lift: -0.1 }] },
    { id: 'ojol',   icon: '🛵', p0: 0.22,  traffic: 6000,  value: 15000,  minLift: 0.04, wkT: [1, 1],       srm: 0,    maxDays: 28, ideas: [{ id: 'gamify', lift: 0, nov: { boost: 0.4, tau: 3 } }, { id: 'skip', lift: 0.09 }, { id: 'promo', lift: 0.05 }] },
    { id: 'dompet', icon: '💳', p0: 0.11,  traffic: 30000, value: 2500,   minLift: 0.05, wkT: [1, 1],       srm: 0,    maxDays: 21, ideas: [{ id: 'badge', lift: 0.02 }, { id: 'fields', lift: 0.08 }, { id: 'banner', lift: -0.03 }] },
    { id: 'wisata', icon: '🏞️', p0: 0.05,  traffic: 3000,  value: 70000,  minLift: 0.10, wkT: [0.6, 1.8],   srm: 0,    maxDays: 42, ideas: [{ id: 'flash', lift: 0.15, wk: [0, 2] }, { id: 'pickup', lift: 0.10 }, { id: 'reviews', lift: 0.06 }] },
    { id: 'kta',    icon: '🏦', p0: 0.045, traffic: 8000,  value: 180000, minLift: 0.08, wkT: [1, 1],       srm: 0.44, maxDays: 28, ideas: [{ id: 'fewer', lift: 0.12 }, { id: 'rate', lift: 0.06 }, { id: 'chat', lift: 0 }] },
    { id: 'jamu',   icon: '🌿', p0: 0.06,  traffic: 220,   value: 120000, minLift: 0.25, wkT: [1, 1],       srm: 0,    maxDays: 60, ideas: [{ id: 'bundle', lift: 0.35 }, { id: 'discount', lift: 0.12 }, { id: 'story', lift: 0 }] },
    { id: 'cupang', icon: '🐟', p0: 0.09,  traffic: 90,    value: 85000,  minLift: 0.35, wkT: [1, 1],       srm: 0,    maxDays: 60, ideas: [{ id: 'video', lift: 0.45 }, { id: 'filter', lift: 0.15 }, { id: 'sniper', lift: -0.1 }] }
  ];

  const byId = id => CASES.find(c => c.id === id);
  const isWeekend = d => d % 7 >= 5;
  const dayMul = (cs, d) => cs.wkT[isWeekend(d) ? 1 : 0];
  const liftOn = (idea, d) => { const w = idea.wk ? idea.wk[isWeekend(d) ? 1 : 0] : 1, n = idea.nov ? idea.nov.boost * Math.exp(-d / idea.nov.tau) : 0; return idea.lift * w + n; };
  /* the long-run truth: traffic-weighted average over one full week, without the novelty boost */
  const trueLift = (cs, idea) => { let a = 0, b = 0; for (let d = 0; d < 7; d++) { const w = dayMul(cs, d); a += w * idea.lift * (idea.wk ? idea.wk[isWeekend(d) ? 1 : 0] : 1); b += w; } return a / b; };

  /* statistics for the running totals */
  const stats = (nA, cA, nB, cB) => {
    const pA = nA ? cA / nA : 0, pB = nB ? cB / nB : 0, diff = pB - pA, n = nA + nB, pool = n ? (cA + cB) / n : 0;
    const sp = Math.sqrt(pool * (1 - pool) * (1 / Math.max(1, nA) + 1 / Math.max(1, nB))), z = sp ? diff / sp : 0, p = 2 * (1 - cdf(Math.abs(z)));
    const su = Math.sqrt(pA * (1 - pA) / Math.max(1, nA) + pB * (1 - pB) / Math.max(1, nB)), d = pA || 1e-9;
    const chi = n ? (Math.pow(nA - n / 2, 2) + Math.pow(nB - n / 2, 2)) / (n / 2) : 0, srmP = n ? 2 * (1 - cdf(Math.sqrt(chi))) : 1;
    return { nA, cA, nB, cB, pA, pB, diff, lift: diff / d, lo: (diff - Z * su) / d, hi: (diff + Z * su) / d, z, p, sig: p < 0.05, srmP, srm: srmP < 0.001, shareB: n ? nB / n : 0.5 };
  };
  const newRun = (cs, idea, seed) => ({ cs, idea, r: rng(seed), day: 0, nA: 0, cA: 0, nB: 0, cB: 0, hist: [], cross: [] });
  /* simulate the next day; returns the day record */
  const stepDay = run => {
    const cs = run.cs, d = run.day, r = run.r, total = Math.max(2, Math.round(cs.traffic * dayMul(cs, d) * (1 + 0.06 * gauss(r))));
    const nB = binom(total, cs.srm || 0.5, r), nA = total - nB, pB = clamp(cs.p0 * (1 + liftOn(run.idea, d)), 0.001, 0.95);
    const cA = binom(nA, cs.p0, r), cB = binom(nB, pB, r);
    run.nA += nA; run.cA += cA; run.nB += nB; run.cB += cB; run.day++;
    const s = stats(run.nA, run.cA, run.nB, run.cB); run.hist.push(s);
    if (s.sig && run.day >= 2) run.cross.push(run.day);
    return { day: d, nA, cA, nB, cB, stat: s, weekend: isWeekend(d) };
  };
  /* planning maths */
  const power = (p0, mde, nPer) => { const p1 = p0 * (1 + mde), se = Math.sqrt(p0 * (1 - p0) / nPer + p1 * (1 - p1) / nPer); return se ? cdf(Math.abs(p1 - p0) / se - Z) : 0; };
  const nFor = (p0, mde, pw) => { const p1 = p0 * (1 + mde), pb = (p0 + p1) / 2, zb = pw === undefined ? ZB : ZB; return Math.ceil(Math.pow(Z * Math.sqrt(2 * pb * (1 - pb)) + zb * Math.sqrt(p0 * (1 - p0) + p1 * (1 - p1)), 2) / Math.pow(p1 - p0, 2)); };
  const daysFor = (cs, mde) => Math.ceil(nFor(cs.p0, mde) * 2 / cs.traffic);
  const nPer = (cs, days) => Math.round(cs.traffic * days / 2);
  /* the player's verdict: 'ship' | 'keep' | 'invalid' */
  const judge = (cs, idea, plan, run, decision) => {
    const truth = trueLift(cs, idea), worth = truth >= cs.minLift, good = cs.srm ? 'invalid' : worth ? 'ship' : 'keep';
    let dec;
    if (decision === good) dec = 50; else if (cs.srm) dec = decision === 'keep' ? 25 : 0;
    else if (decision === 'keep') dec = truth > 0 ? 20 : 50; else if (decision === 'ship') dec = truth > 0 ? 20 : 0; else dec = 10;
    const pw = power(cs.p0, plan.mde, nPer(cs, plan.days)), design = Math.round(30 * Math.min(1, pw / 0.8) * (plan.mde <= cs.minLift * 1.25 ? 1 : 0.7));
    const early = run.day < plan.days, falseAlarm = run.cross.length > 0 && !(run.hist[run.day - 1] && run.hist[run.day - 1].sig);
    const disc = early ? (dec >= 50 ? 8 : 0) : 20;
    const total = dec + design + disc, impact = cs.traffic * 365 * cs.p0 * truth * cs.value;
    return { truth, worth, good, dec, design, disc, total, power: pw, early, falseAlarm, impact, need: daysFor(cs, Math.max(0.02, Math.min(plan.mde, cs.minLift))) };
  };
  const starsOf = s => s >= 85 ? 3 : s >= 70 ? 2 : s >= 45 ? 1 : 0;
  const api = { Z, ZB, CASES, byId, clamp, cdf, pdf, rng, gauss, binom, isWeekend, dayMul, liftOn, trueLift, stats, newRun, stepDay, power, nFor, daysFor, nPer, judge, starsOf };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else { root.MBALAB = root.MBALAB || {}; root.MBALAB.ab = api; }
})(typeof window !== 'undefined' ? window : globalThis);
