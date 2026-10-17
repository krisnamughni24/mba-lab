/* Corporate Society: rules only, no DOM. One run = 8 working days x 3 slots (morning, noon, evening). Each slot the player goes to a place,
   meets one event (drawn from the pool that fits the place, role, level and the state of the run), picks an option and lives with the effects.
   Five stats (0..100) and the standing with six colleagues decide the ending: lose the job when a critical one hits zero, or reach the level's promotion bar. */
(function () {
  const root = typeof MBALAB !== 'undefined' ? MBALAB : (globalThis.MBALAB = globalThis.MBALAB || {});
  const DAYS = 20, CHAPTERS = 8, SLOTS = 3, STATS = ['perf', 'rep', 'energy', 'integ', 'net', 'skill'], VALUES = ['integrity', 'ambition', 'loyalty', 'fairness', 'balance', 'learning'], PEOPLE = ['boss', 'senior', 'peer', 'junior', 'other', 'director'];
  const LOCS = ['desk', 'pantry', 'meeting', 'floor', 'lobby', 'after'];
  /* what a day without effort costs, by level: the higher you are, the faster expectations rise */
  const DECAY = { junior: { perf: 3, rep: 2, net: 1.5, skill: 1 }, mid: { perf: 4, rep: 3, net: 1.5, skill: 1.2 }, senior: { perf: 5, rep: 3, net: 1.8, skill: 1.2 }, head: { perf: 6, rep: 4, net: 2, skill: 1.4 } };
  /* the career is endless: every DAYS working days (one month) there is a review that can promote you, warn you or end the career. LADDER is the path up. */
  const LADDER = ['junior', 'mid', 'senior', 'head'], COOL = 60, ROLES = ['finance', 'it', 'marketing', 'hr', 'ops', 'sales', 'legal'];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rng = seed => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };

  /* starting stats by level, small shift by role */
  const START = {
    junior: { perf: 50, rep: 40, energy: 85, integ: 70, net: 30, skill: 35 },
    mid: { perf: 60, rep: 55, energy: 75, integ: 65, net: 40, skill: 55 },
    senior: { perf: 65, rep: 65, energy: 65, integ: 60, net: 55, skill: 70 },
    head: { perf: 68, rep: 68, energy: 60, integ: 58, net: 60, skill: 72 }
  };
  const ROLE_SHIFT = { finance: { integ: 8, net: -3, skill: 3 }, it: { perf: 6, rep: -4, skill: 6 }, marketing: { rep: 2, net: 5, integ: -4, skill: 1, perf: 7 }, hr: { net: 6, perf: 10, skill: 1 }, ops: { perf: 12, energy: -3, net: -2, skill: 3 }, sales: { perf: 4, net: 8, integ: -6, energy: -3 }, legal: { integ: 2, skill: 4, net: -4, perf: 11 } };
  /* what it takes to be promoted at the end of day 8 */
  const BAR = { junior: { perf: 56, rep: 44, skill: 36 }, mid: { perf: 56, rep: 46, net: 32, skill: 42 }, senior: { perf: 56, rep: 50, integ: 52, net: 38, skill: 46 }, head: { perf: 60, rep: 56, integ: 55, net: 44, skill: 52 } };
  /* roles whose work is judged less on raw output: the performance bar is a little lower */
  const ROLE_BAR = { hr: { perf: -7 }, ops: { perf: -6, rep: -4 }, sales: { rep: -6 } };
  const barOf = s => { const b = Object.assign({}, BAR[s.level]), d = ROLE_BAR[s.role] || {}; Object.keys(d).forEach(k => { if (b[k]) b[k] += d[k]; }); return b; };
  const C = () => root.corpContent;
  /* working styles: each shifts the start, some change gambles or nightly recovery. Roughly balanced against each other. */
  const TRAITS = {
    analyst: { st: { skill: 8, perf: 2, net: -6 }, gp: 0.05, regen: 0, rel: {} },
    charmer: { st: { net: 10, rep: 5, integ: -5 }, gp: 0, regen: 0, rel: { peer: 6 } },
    steady: { st: { energy: 10, integ: 3 }, gp: 0, regen: 5, rel: {} },
    maverick: { st: { perf: 5, skill: 2 }, gp: 0.12, regen: 0, rel: { boss: -6 } }
  };
  /* personal goals: progress is 0..1, done when every part is met. Checked live and at the end. */
  const avgRel = (s, ks) => ks.reduce((a, k) => a + s.rel[k], 0) / ks.length;
  const GOALS = {
    promo: s => { const b = barOf(s), ks = Object.keys(b), p = ks.reduce((a, k) => a + Math.min(1, (s.st[k] !== undefined ? s.st[k] : s.rel[k]) / b[k]), 0) / ks.length; return { p: s.promos > 0 ? 1 : p, done: s.promos > 0 || meets(s, b) }; },
    network: s => { const a = s.st.net / 65, r = avgRel(s, ['boss', 'senior', 'peer', 'other']) / 65; return { p: Math.min(1, (Math.min(1, a) + Math.min(1, r)) / 2), done: s.st.net >= 65 && avgRel(s, ['boss', 'senior', 'peer', 'other']) >= 65 }; },
    integrity: s => { const mn = Math.min(...s.hist.map(h => h.st.integ)); return { p: Math.min(1, s.st.integ / 75 * (mn >= 50 ? 1 : 0.8)), done: s.st.integ >= 75 && mn >= 50 }; },
    balance: s => { const mn = Math.min(...s.hist.map(h => h.st.energy)); return { p: Math.min(1, (mn >= 25 ? 0.5 : mn / 50) + Math.min(0.5, s.st.perf / 110)), done: mn >= 25 && s.st.perf >= 55 }; },
    mentor: s => { const a = s.rel.junior / 80, b = s.st.skill / 55; return { p: Math.min(1, (Math.min(1, a) + Math.min(1, b)) / 2), done: s.rel.junior >= 80 && s.st.skill >= 55 }; }
  };

  function create(role, level, seed, opt) {
    opt = opt || {}; const trait = TRAITS[opt.trait] ? opt.trait : 'steady', goal = GOALS[opt.goal] ? opt.goal : 'promo';
    const s = { trait, goal, role, level, seed, rnd: rng(seed * 7919 + 17), turn: 0, loc: null, st: {}, rel: { boss: 50, senior: 50, peer: 50, junior: 55, other: 45, director: 35 }, flags: {}, done: {}, later: [], log: [], burn: 0, over: null, vals: {}, hist: [], promos: 0, warn: 0, quarters: 0, qr: null };
    STATS.forEach(k => { s.st[k] = clamp((START[level][k] || 0) + ((ROLE_SHIFT[role] || {})[k] || 0), 0, 100); });
    const T = TRAITS[trait]; STATS.forEach(k => { s.st[k] = clamp(s.st[k] + (T.st[k] || 0), 0, 100); }); PEOPLE.forEach(k => { s.rel[k] = clamp(s.rel[k] + (T.rel[k] || 0), 0, 100); });
    snap(s); return s;
  }
  /* a snapshot of the measures for the end-of-run chart */
  function snap(s) { s.hist.push({ turn: s.turn, st: Object.assign({}, s.st), rel: Object.assign({}, s.rel) }); }
  const day = s => Math.floor(s.turn / SLOTS) + 1, slot = s => s.turn % SLOTS;
  const locsNow = s => LOCS.filter(l => l !== 'after' || slot(s) === SLOTS - 1);

  /* does event e fit this run right now? */
  /* the story chapter of the current day: it makes some themes of events more likely */
  const chapterIdx = d => Math.floor(((d - 1) % DAYS) * CHAPTERS / DAYS), chapter = s => (C().chapters || [])[chapterIdx(day(s))] || null;
  const fresh = (e, s) => !(e.id in s.done) || s.turn - s.done[e.id] >= COOL;
  const fits = (e, s, loc) => (!e.loc || e.loc.includes(loc)) && (!e.role || e.role.includes(s.role)) && (!e.level || e.level.includes(s.level) || (s.level === 'head' && e.level.includes('senior'))) && fresh(e, s) && (!e.cond || e.cond(s)) && !e.later_only;
  function pick(s, loc) {
    const ev = C().events, due = s.later.find(x => x.at <= s.turn);
    if (due) { s.later = s.later.filter(x => x !== due); const e = ev.find(x => x.id === due.id); if (e && fresh(e, s)) return e; }
    const pool = ev.filter(e => fits(e, s, loc)); if (!pool.length) return ev.find(e => e.id === 'quiet');
    const chp = chapter(s), wt = pool.map(e => Math.max(0, (typeof e.w === 'function' ? e.w(s) : (e.w || 1)) * (e.th && chp && chp.th.includes(e.th) ? 2.4 : 1))), tot = wt.reduce((a, b) => a + b, 0); if (!tot) return ev.find(e => e.id === 'quiet');
    let x = s.rnd() * tot; for (let i = 0; i < pool.length; i++) { x -= wt[i]; if (x <= 0) return pool[i]; } return pool[pool.length - 1];
  }
  function visit(s, loc) { s.loc = loc; const e = pick(s, loc); return e; }

  function apply(s, o, rec) {
    Object.keys(o.fx || {}).forEach(k => { const b = s.st[k]; s.st[k] = clamp(b + o.fx[k], 0, 100); rec.fx[k] = (rec.fx[k] || 0) + (s.st[k] - b); });
    Object.keys(o.rel || {}).forEach(k => { const b = s.rel[k]; s.rel[k] = clamp(b + o.rel[k], 0, 100); rec.rel[k] = (rec.rel[k] || 0) + (s.rel[k] - b); });
    (o.flags || []).forEach(f => { s.flags[f] = true; });
    (o.later || []).forEach(l => s.later.push({ id: l.id, at: s.turn + 1 + (l.in || 1) }));
  }
  /* pick option i of event e. Returns { fx, rel, branch: 'ok' | 'bad' | '' } and sets s.over when the job is lost */
  function choose(s, e, i) {
    const o = e.opts[i], rec = { fx: {}, rel: {}, branch: '' };
    apply(s, o, rec);
    if (o.g) { const p = clamp((typeof o.g.p === 'function' ? o.g.p(s) : o.g.p) + TRAITS[s.trait].gp, 0.05, 0.95); rec.branch = s.rnd() < p ? 'ok' : 'bad'; apply(s, o.g[rec.branch], rec); }
    (o.v || []).forEach(v => { s.vals[v] = (s.vals[v] || 0) + 1; });
    s.done[e.id] = s.turn; s.log.push({ id: e.id, opt: i, turn: s.turn, branch: rec.branch, fx: rec.fx });
    check(s); snap(s); return rec;
  }
  /* lose the job when a critical measure hits zero; burn out when energy is gone */
  function check(s) {
    if (s.over) return;
    if (s.st.perf <= 0) s.over = 'fired_perf'; else if (s.st.integ <= 0) s.over = 'fired_integ'; else if (s.st.rep <= 0) s.over = 'fired_rep'; else if (s.rel.boss <= 0) s.over = 'fired_boss';
    else if (s.st.energy <= 0) { s.burn++; s.st.energy = 30; s.st.perf = clamp(s.st.perf - 10, 0, 100); s.st.rep = clamp(s.st.rep - 5, 0, 100); s.flags.burned = true; if (s.burn >= 2) s.over = 'burnout'; else if (s.st.perf <= 0) s.over = 'fired_perf'; }
  }
  /* close a slot: next slot or next day (rest restores energy). Returns 'slot' | 'day' | 'end' */
  function next(s) {
    if (s.over) return 'end'; s.turn++;
    if (s.st.energy < 30) s.st.perf = clamp(s.st.perf - 2, 0, 100); /* tired people make mistakes */
    if (s.turn % SLOTS === 0) {
      /* the night restores energy, but a day without effort costs ground: backlog, forgotten faces, a cooling boss */
      const D = DECAY[s.level]; s.st.energy = clamp(s.st.energy + 22 + TRAITS[s.trait].regen, 0, 100); s.st.perf = clamp(s.st.perf - D.perf, 0, 100); s.st.rep = clamp(s.st.rep - D.rep, 0, 100); s.st.net = clamp(s.st.net - D.net, 0, 100); s.st.skill = clamp(s.st.skill - D.skill, 0, 100);
      if (s.st.perf < 50) s.rel.boss = clamp(s.rel.boss - 2, 0, 100);
      check(s); snap(s); if (s.over) return 'end';
      if ((s.turn / SLOTS) % DAYS === 0) { s.quarters++; s.qr = reviewQuarter(s); snap(s); if (s.over) return 'end'; return 'quarter'; } return 'day';
    }
    check(s); if (s.over) return 'end';
    return 'slot';
  }
  /* the quarterly review: meet the bar and move up (the top level stays and earns a legacy); miss it and get a warning, two in a row end the career */
  function reviewQuarter(s) {
    const from = s.level, ok = meets(s, barOf(s)), top = LADDER.indexOf(s.level) === LADDER.length - 1, r = { ok, from, to: from, warn: s.warn, top };
    if (ok) { s.warn = 0; r.warn = 0; if (top) { s.legacy = (s.legacy || 0) + 1; } else { s.level = LADDER[LADDER.indexOf(from) + 1]; r.to = s.level; s.promos++; STATS.forEach(k => { s.st[k] = clamp(s.st[k] + (k === 'energy' ? 15 : 4), 0, 100); }); s.rel.boss = clamp(s.rel.boss + 8, 0, 100); } }
    else { s.warn++; r.warn = s.warn; s.rel.boss = clamp(s.rel.boss - 4, 0, 100); if (s.warn >= 2) s.over = 'fired_review'; }
    return r;
  }
  function retire(s) { if (!s.over) s.over = ending(s); return s.over; }
  const meets = (s, bar) => Object.keys(bar).every(k => (s.st[k] !== undefined ? s.st[k] : s.rel[k]) >= bar[k]);
  function ending(s) {
    if (s.flags.reported && s.st.integ >= 55) return 'whistle';
    if (s.promos > 0) return s.st.integ < 45 ? 'politician' : s.level === 'head' ? 'legend' : 'promoted';
    if (s.rel.junior >= 85 && s.st.skill >= 66) return 'mentor';
    return 'steady';
  }
  const goal = s => GOALS[s.goal](s);
  /* the mid-week review (day 4): a free event from the boss, chosen by how the run is going */
  function review(s) { const a = (s.st.perf + s.st.rep) / 2, id = a >= 58 ? 'r_great' : a >= 42 ? 'r_ok' : 'r_poor'; s.loc = 'meeting'; return C().events.find(e => e.id === id); }
  /* normalised value profile 0..1 (the most chosen value = 1) */
  function profile(s) { const mx = Math.max(1, ...VALUES.map(v => s.vals[v] || 0)); const o = {}; VALUES.forEach(v => { o[v] = (s.vals[v] || 0) / mx; }); return o; }
  /* 0..3 stars and xp for a finished run */
  function score(s) {
    const avg = (s.st.perf + s.st.rep + s.st.integ) / 3, o = s.over;
    const n = o === 'promoted' || o === 'whistle' || o === 'legend' ? 3 : o === 'politician' || o === 'mentor' ? 2 : o === 'steady' ? (avg >= 55 ? 2 : 1) : 0;
    const g = goal(s), won = g.done && !String(o).startsWith('fired') && o !== 'burnout';
    return { stars: n, xp: Math.round(10 + n * 20 + avg / 5) + (won ? 25 : 0) + s.promos * 15 + Math.floor(day(s) / 4), goalDone: won };
  }
  root.corp = { chapterIdx, MID: Math.floor(DAYS / 2), barOf, LADDER, ROLES, retire, TRAITS, GOALS: Object.keys(GOALS), goal, review, DAYS, SLOTS, STATS, VALUES, PEOPLE, LOCS, BAR, START, create, day, slot, chapter, locsNow, visit, choose, next, ending, score, profile, check, fits };
  if (typeof module !== 'undefined') module.exports = root.corp;
})();
