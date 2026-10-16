/* AI Governance: pure logic (no DOM, no MBALAB), testable in node.
   A case = one AI system a team wants to launch. The player (1) classifies its risk tier, (2) picks controls within a budget and a launch mode, (3) watches 12 months run.
   Risk has five dimensions (bias, privacy, safety, security, transparency). Each control cuts some of them but costs budget and slows the business (friction).
   Incidents are random (seeded) but the SCORE uses the average of many seeded runs, so skill is rewarded and luck is not.
   Money is in million rupiah (Rp mn). */
(function (root) {
  'use strict';
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const rng = seed => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

  const DIMS = ['bias', 'priv', 'safety', 'sec', 'trans'];
  const TIERS = ['min', 'ltd', 'high', 'ban'];
  const MONTHS = 12, AUDIT = 6, BAN_STOP = 3, K = 0.22;
  /* controls: cost (budget points), fr = friction (share of business value lost), m = share of each risk removed, stage = where it sits on the pipeline (0 data, 1 model, 2 decision, 3 people) */
  const CTRL = [
    { id: 'minimize', icon: '🗂️', stage: 0, cost: 1.5, fr: 0.04, m: { priv: 0.6, sec: 0.2 } },
    { id: 'audit',    icon: '⚖️', stage: 0, cost: 2,   fr: 0.03, m: { bias: 0.65 } },
    { id: 'policy',   icon: '📜', stage: 0, cost: 1,   fr: 0.01, m: { priv: 0.3, sec: 0.3, trans: 0.15 } },
    { id: 'redteam',  icon: '🛡️', stage: 1, cost: 2.5, fr: 0.05, m: { sec: 0.6, safety: 0.3 } },
    { id: 'monitor',  icon: '📡', stage: 1, cost: 2,   fr: 0.02, m: { safety: 0.15, bias: 0.15 }, drift: true },
    { id: 'human',    icon: '🧑‍⚖️', stage: 2, cost: 3,   fr: 0.18, m: { safety: 0.5, bias: 0.2, trans: 0.3 }, vol: true },
    { id: 'explain',  icon: '🔍', stage: 2, cost: 1.5, fr: 0.02, m: { trans: 0.6, bias: 0.1 } },
    { id: 'appeal',   icon: '📬', stage: 3, cost: 1.5, fr: 0.01, m: { trans: 0.2 }, soften: true }
  ];
  /* tier = true risk tier; R = inherent risk 0..1 per dimension; V = business value per month; H = cost of one average incident; B = control budget; vol = volume of decisions (high volume makes human review a rubber stamp);
     req = controls a regulator audit expects; drift = how fast the model degrades without monitoring; fac = [impact on people, autonomy, sensitive data, scale, reversible?] shown to the player as 0 low .. 2 high (reversible: 2 = easy to undo) */
  const CASES = [
    { id: 'chatbot', icon: '💬', tier: 'ltd',  R: { bias: .15, priv: .35, safety: .5, sec: .45, trans: .5 },  V: 120, H: 250, B: 6, vol: 1,  req: ['explain'],                           drift: .3, fine: 300,  fac: [0, 1, 1, 2, 2] },
    { id: 'iklan',   icon: '🎨', tier: 'ltd',  R: { bias: .3, priv: .15, safety: .45, sec: .25, trans: .85 }, V: 90,  H: 185, B: 6, vol: .4, req: ['explain', 'human'],                  drift: .2, fine: 250,  fac: [1, 1, 0, 2, 1] },
    { id: 'shadow',  icon: '🕵️', tier: 'ltd',  R: { bias: .05, priv: .85, safety: .2, sec: .8, trans: .3 },  V: 60,  H: 130, B: 6, vol: .3, req: ['policy', 'minimize'],                drift: 0,  fine: 200,  hw: { priv: 1.4 }, fac: [1, 0, 2, 1, 0], boost: { policy: 1.7 } },
    { id: 'kredit',  icon: '💳', tier: 'high', R: { bias: .85, priv: .6, safety: .4, sec: .4, trans: .8 },   V: 300, H: 600, B: 9, vol: .6, req: ['audit', 'explain', 'appeal', 'minimize'], drift: .6, fine: 1000, fac: [2, 2, 2, 2, 1] },
    { id: 'cv',      icon: '📄', tier: 'high', R: { bias: .9, priv: .5, safety: .3, sec: .25, trans: .7 },   V: 80,  H: 160, B: 8, vol: .6, req: ['audit', 'human', 'explain'],          drift: .4, fine: 300,  hw: { bias: 1.4 }, fac: [2, 1, 2, 1, 1] },
    { id: 'ojol',    icon: '🛵', tier: 'high', R: { bias: .5, priv: .3, safety: .45, sec: .25, trans: .85 }, V: 200, H: 450, B: 8, vol: .95, req: ['audit', 'explain', 'appeal'],        drift: .5, fine: 600, hw: { trans: 1.2 }, fac: [2, 2, 1, 2, 1] },
    { id: 'triase',  icon: '🏥', tier: 'high', R: { bias: .55, priv: .8, safety: .9, sec: .5, trans: .6 },   V: 320, H: 200, B: 10, vol: .4, req: ['human', 'monitor', 'minimize', 'audit'], drift: .7, fine: 500, hw: { safety: 3 }, fac: [2, 1, 2, 1, 0] },
    { id: 'skor',    icon: '🚫', tier: 'ban',  R: { bias: .95, priv: .95, safety: .6, sec: .5, trans: .95 }, V: 400, H: 820, B: 10, vol: .8, req: [],                                   drift: .5, fine: 1500, fac: [2, 2, 2, 2, 0], ban: true }
  ];
  const byId = id => CASES.find(c => c.id === id), ctl = id => CTRL.find(c => c.id === id);
  const cost = ids => ids.reduce((a, id) => a + ctl(id).cost, 0);
  const tierIdx = t => TIERS.indexOf(t);

  /* effective mitigation per control and dimension; human review loses power when the volume is huge (rubber stamping) */
  const eff = (cs, c, d) => { let v = c.m[d] || 0; if (!v) return 0; if (cs.boost && cs.boost[c.id]) v = Math.min(.85, v * cs.boost[c.id]); if (c.vol) v *= 1 - 0.65 * cs.vol * cs.vol; return v; };
  const mit = (cs, design) => { const o = {}; DIMS.forEach(d => { let m = 1; design.forEach(id => { m *= 1 - eff(cs, ctl(id), d); }); o[d] = cs.ban ? Math.max(m, .75) : m; }); return o; };
  const friction = (cs, design) => clamp(design.reduce((a, id) => a + ctl(id).fr * (ctl(id).vol ? .6 + .5 * cs.vol : 1), 0), 0, .6);
  const scaleAt = (mode, m) => mode === 'decline' ? 0 : mode === 'pilot' ? (m <= 3 ? .25 : 1) : 1;
  const driftAt = (cs, design, m) => design.includes('monitor') ? Math.min(.12, .01 * m) : Math.min(1.2, cs.drift * m / 6);
  const residual = (cs, design) => { const mm = mit(cs, design), o = {}; DIMS.forEach(d => { o[d] = clamp(cs.R[d] * mm[d], 0, 1); }); return o; };

  /* one simulated run of the 12 months */
  function sim(cs, design, mode, seed) {
    const r = rng(seed), mm = mit(cs, design), fr = friction(cs, design), soft = design.includes('appeal'), out = { months: [], value: 0, harm: 0, fine: 0, incidents: 0, audit: null, stop: 0 };
    let trust = 1;
    for (let m = 1; m <= MONTHS; m++) {
      const rec = { m, value: 0, harm: 0, inc: [], blocked: {}, trust: 0 };
      let sc = scaleAt(mode, m); const stopped = cs.ban && mode !== 'decline' && m > BAN_STOP; if (stopped) sc = 0;
      const dr = driftAt(cs, design, m), fix = mode === 'pilot' && m > 3 ? .9 : 1;
      DIMS.forEach(d => {
        const dm = (d === 'safety' || d === 'bias') ? 1 + dr : 1, p = clamp(K * cs.R[d] * mm[d] * dm * sc * fix, 0, .7), pu = clamp(K * cs.R[d] * dm * sc, 0, .9);
        rec.blocked[d] = Math.max(0, Math.min(4, Math.round((pu - p) / K * 5)));
        if (r() < p) { let s = .5 + r(); if (r() < .08) s *= 2.5; const c = cs.H * ((cs.hw && cs.hw[d]) || 1) * s * (soft ? .65 : 1); rec.inc.push({ dim: d, sev: s, cost: c }); rec.harm += c; trust -= .05 * s * (soft ? .6 : 1); out.incidents++; }
      });
      trust = clamp(trust + .02, .2, 1);
      if (m === AUDIT && mode !== 'decline') {
        const gaps = cs.req.filter(id => !design.includes(id)), f = cs.ban ? cs.fine : (cs.req.length ? cs.fine * gaps.length / cs.req.length : 0);
        if (cs.ban) { rec.stopNote = 1; } else if (f > 0) { rec.audit = { gaps, fine: f }; rec.harm += f; out.fine += f; out.audit = rec.audit; trust = clamp(trust - .12, .2, 1); }
      }
      if (cs.ban && mode !== 'decline' && m === BAN_STOP) { const f = cs.fine; rec.audit = { gaps: [], fine: f, ban: true }; rec.harm += f; out.fine += f; out.audit = rec.audit; out.stop = m; trust = .3; }
      rec.value = cs.V * sc * (1 - fr) * trust; rec.trust = trust; out.value += rec.value; out.harm += rec.harm; out.months.push(rec);
    }
    out.net = out.value - out.harm; return out;
  }
  /* average over fixed seeds (common random numbers: every design is judged on the same dice) */
  function expect(cs, design, mode, n) {
    n = n || 120; let v = 0, h = 0, inc = 0; for (let i = 0; i < n; i++) { const s = sim(cs, design, mode, 9000 + i * 17); v += s.value; h += s.harm; inc += s.incidents; }
    return { value: v / n, harm: h / n, net: (v - h) / n, inc: inc / n };
  }
  const subsets = (cs) => { const out = [], n = CTRL.length; for (let mask = 0; mask < (1 << n); mask++) { const d = CTRL.filter((_, i) => mask >> i & 1).map(c => c.id); if (cost(d) <= cs.B + 1e-9) out.push(d); } return out; };
  const cache = {};
  /* the best achievable: search all affordable control sets in both launch modes (and "do not launch" = 0) */
  function best(cs) {
    if (cache[cs.id]) return cache[cs.id];
    let top = []; subsets(cs).forEach(d => ['full', 'pilot'].forEach(mode => { const e = expect(cs, d, mode, 24); top.push({ d, mode, net: e.net }); }));
    top.sort((a, b) => b.net - a.net); top = top.slice(0, 6).map(x => Object.assign(x, { net: expect(cs, x.d, x.mode, 120).net })).sort((a, b) => b.net - a.net);
    const b = top[0], none = expect(cs, [], 'full', 120).net, res = b.net > 0 ? { design: b.d, mode: b.mode, net: b.net, none } : { design: [], mode: 'decline', net: 0, none };
    return cache[cs.id] = res;
  }
  /* which controls count as proportionate for this case: they cut a risk that matters (>= .4) or are required, and are not wasted by rubber stamping */
  const relevant = (cs, id) => { const c = ctl(id); if (cs.req.includes(id)) return true; if (c.vol && cs.vol >= .85) return false; if (c.drift) return cs.drift >= .4; return DIMS.some(d => (c.m[d] || 0) >= .15 && cs.R[d] >= .4) && !(id === 'appeal' && cs.R.trans < .6); };
  function judge(cs, tierPick, design, mode) {
    const b = best(cs), e = mode === 'decline' ? { net: 0, value: 0, harm: 0, inc: 0 } : expect(cs, design, mode, 120);
    const gap = Math.abs(tierIdx(tierPick) - tierIdx(cs.tier)), tier = gap === 0 ? 20 : gap === 1 ? 8 : 0;
    let cover, over = [], prop;
    if (mode === 'decline') { cover = cs.ban ? 20 : 0; prop = cs.ban ? 10 : 0; }
    else { cover = cs.req.length ? Math.round(20 * cs.req.filter(id => design.includes(id)).length / cs.req.length) : (cs.ban ? 0 : 20); over = design.filter(id => !relevant(cs, id)); prop = design.length ? clamp(10 - 3.5 * over.length, 0, 10) : 0; if (cs.ban) { cover = 0; prop = 0; } }
    const d = Math.round(cover + prop), base = b.none, span = b.net - base, outcome0 = span > 1 ? Math.round(50 * clamp((e.net - base) / span, 0, 1)) : (e.net >= b.net - 1 ? 50 : 0);
    const outcome = mode === 'decline' && !cs.ban ? Math.min(outcome0, 8) : outcome0;
    const alt = mode === 'decline' ? null : expect(cs, design, mode === 'pilot' ? 'full' : 'pilot', 120).net;
    return { tier, tierGap: gap, design: d, cover, prop, over, outcome, total: tier + d + outcome, net: e.net, expInc: e.inc, bestNet: b.net, bestMode: b.mode, bestDesign: b.design, missing: cs.req.filter(id => !design.includes(id)), altNet: alt, none: base };
  }
  const starsOf = s => s >= 85 ? 3 : s >= 70 ? 2 : s >= 45 ? 1 : 0;

  /* ---- Lab maths: fairness (two groups, one score) ---- */
  const erf = x => { const s = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
  const cdf = z => .5 * (1 + erf(z / Math.SQRT2));
  const FAIR = { mu1: .64, mu0: .40, sd: .14, share: { A: .6, B: .4 }, good: { A: .72, B: .5 } };       /* good = share who would repay */
  const rates = (g, t) => { const pg = FAIR.good[g], tpr = 1 - cdf((t - FAIR.mu1) / FAIR.sd), fpr = 1 - cdf((t - FAIR.mu0) / FAIR.sd), ap = pg * tpr + (1 - pg) * fpr, acc = pg * tpr + (1 - pg) * (1 - fpr); return { appr: ap, tpr, fpr, acc }; };
  const solve = (f, target) => { let lo = .05, hi = .95; for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (f(mid) > target) lo = mid; else hi = mid; } return (lo + hi) / 2; };
  /* thresholds per group for a mode: 'one' same cut-off, 'parity' same approval rate, 'opp' same true-positive rate */
  function fairness(t, mode) {
    const tA = t; let tB = t;
    if (mode === 'parity') tB = solve(x => rates('B', x).appr, rates('A', tA).appr); else if (mode === 'opp') tB = solve(x => rates('B', x).tpr, rates('A', tA).tpr);
    const a = rates('A', tA), b = rates('B', tB), acc = FAIR.share.A * a.acc + FAIR.share.B * b.acc;
    return { tA, tB, a, b, acc, gapAppr: Math.abs(a.appr - b.appr), gapTpr: Math.abs(a.tpr - b.tpr) };
  }
  /* ---- Lab maths: drift ---- */
  function drift(speed, every, months) {
    const acc = [], a0 = .94; let last = 0, retrains = 0;
    for (let m = 0; m <= months; m++) { if (every && m > 0 && m % every === 0) { last = m; retrains++; } acc.push(Math.max(.5, a0 - speed * (m - last))); }
    return { acc, retrains, avg: acc.reduce((a, b) => a + b, 0) / acc.length };
  }

  const api = { DIMS, TIERS, CTRL, CASES, MONTHS, AUDIT, BAN_STOP, byId, ctl, cost, mit, residual, friction, sim, expect, best, judge, starsOf, relevant, rng, clamp, fairness, rates, drift, FAIR, cdf };
  root.MBALAB = root.MBALAB || {}; root.MBALAB.gov = api; if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
