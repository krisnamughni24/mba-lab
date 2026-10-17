/* Corporate Society: rules only, no DOM. One run = 8 working days x 3 slots (morning, noon, evening). Each slot the player goes to a place,
   meets one event (drawn from the pool that fits the place, role, level and the state of the run), picks an option and lives with the effects.
   Five stats (0..100) and the standing with six colleagues decide the ending: lose the job when a critical one hits zero, or reach the level's promotion bar. */
(function () {
  const root = typeof MBALAB !== 'undefined' ? MBALAB : (globalThis.MBALAB = globalThis.MBALAB || {});
  const DAYS = 8, SLOTS = 3, STATS = ['perf', 'rep', 'energy', 'integ', 'net', 'skill'], VALUES = ['integrity', 'ambition', 'loyalty', 'fairness', 'balance', 'learning'], PEOPLE = ['boss', 'senior', 'peer', 'junior', 'other', 'director'];
  const LOCS = ['desk', 'pantry', 'meeting', 'floor', 'lobby', 'after'];
  /* what a day without effort costs, by level: the higher you are, the faster expectations rise */
  const DECAY = { junior: { perf: 3, rep: 2, net: 2, skill: 2 }, mid: { perf: 4, rep: 3, net: 2, skill: 3 }, senior: { perf: 4, rep: 3, net: 3, skill: 4 } };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rng = seed => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };

  /* starting stats by level, small shift by role */
  const START = {
    junior: { perf: 50, rep: 40, energy: 85, integ: 70, net: 30, skill: 35 },
    mid: { perf: 60, rep: 55, energy: 75, integ: 65, net: 40, skill: 55 },
    senior: { perf: 65, rep: 65, energy: 65, integ: 60, net: 55, skill: 70 }
  };
  const ROLE_SHIFT = { finance: { integ: 8, net: -3, skill: 3 }, it: { perf: 6, rep: -4, skill: 6 } };
  /* what it takes to be promoted at the end of day 8 */
  const BAR = { junior: { perf: 56, rep: 44, skill: 36 }, mid: { perf: 56, rep: 46, net: 32, skill: 42 }, senior: { perf: 56, rep: 50, integ: 52, net: 38, skill: 46 } };
  const C = () => root.corpContent;

  function create(role, level, seed) {
    const s = { role, level, seed, rnd: rng(seed * 7919 + 17), turn: 0, loc: null, st: {}, rel: { boss: 50, senior: 50, peer: 50, junior: 55, other: 45, director: 35 }, flags: {}, done: {}, later: [], log: [], burn: 0, over: null, vals: {}, hist: [] };
    STATS.forEach(k => { s.st[k] = clamp((START[level][k] || 0) + ((ROLE_SHIFT[role] || {})[k] || 0), 0, 100); });
    snap(s); return s;
  }
  /* a snapshot of the measures for the end-of-run chart */
  function snap(s) { s.hist.push({ turn: s.turn, st: Object.assign({}, s.st), rel: Object.assign({}, s.rel) }); }
  const day = s => Math.floor(s.turn / SLOTS) + 1, slot = s => s.turn % SLOTS;
  const locsNow = s => LOCS.filter(l => l !== 'after' || slot(s) === SLOTS - 1);

  /* does event e fit this run right now? */
  /* the story chapter of the current day: it makes some themes of events more likely */
  const chapter = s => (C().chapters || [])[day(s) - 1] || null;
  const fits = (e, s, loc) => (!e.loc || e.loc.includes(loc)) && (!e.role || e.role.includes(s.role)) && (!e.level || e.level.includes(s.level)) && !(e.id in s.done) && (!e.cond || e.cond(s)) && !e.later_only;
  function pick(s, loc) {
    const ev = C().events, due = s.later.find(x => x.at <= s.turn);
    if (due) { s.later = s.later.filter(x => x !== due); const e = ev.find(x => x.id === due.id); if (e && !(e.id in s.done)) return e; }
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
    if (o.g) { const p = typeof o.g.p === 'function' ? o.g.p(s) : o.g.p; rec.branch = s.rnd() < p ? 'ok' : 'bad'; apply(s, o.g[rec.branch], rec); }
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
      const D = DECAY[s.level]; s.st.energy = clamp(s.st.energy + 22, 0, 100); s.st.perf = clamp(s.st.perf - D.perf, 0, 100); s.st.rep = clamp(s.st.rep - D.rep, 0, 100); s.st.net = clamp(s.st.net - D.net, 0, 100); s.st.skill = clamp(s.st.skill - D.skill, 0, 100);
      if (s.st.perf < 50) s.rel.boss = clamp(s.rel.boss - 2, 0, 100);
      check(s); snap(s); if (s.over) return 'end';
      if (s.turn >= DAYS * SLOTS) { s.over = ending(s); return 'end'; } return 'day';
    }
    check(s); if (s.over) return 'end';
    return 'slot';
  }
  const meets = (s, bar) => Object.keys(bar).every(k => (s.st[k] !== undefined ? s.st[k] : s.rel[k]) >= bar[k]);
  function ending(s) {
    if (s.flags.reported && s.st.integ >= 55) return 'whistle';
    if (meets(s, BAR[s.level])) return s.st.integ < 45 ? 'politician' : 'promoted';
    if (s.rel.junior >= 85 && s.st.skill >= 66) return 'mentor';
    return 'steady';
  }
  /* normalised value profile 0..1 (the most chosen value = 1) */
  function profile(s) { const mx = Math.max(1, ...VALUES.map(v => s.vals[v] || 0)); const o = {}; VALUES.forEach(v => { o[v] = (s.vals[v] || 0) / mx; }); return o; }
  /* 0..3 stars and xp for a finished run */
  function score(s) {
    const avg = (s.st.perf + s.st.rep + s.st.integ) / 3, o = s.over;
    const n = o === 'promoted' || o === 'whistle' ? 3 : o === 'politician' || o === 'mentor' ? 2 : o === 'steady' ? (avg >= 55 ? 2 : 1) : 0;
    return { stars: n, xp: Math.round(10 + n * 20 + avg / 5) };
  }
  root.corp = { DAYS, SLOTS, STATS, VALUES, PEOPLE, LOCS, BAR, START, create, day, slot, chapter, locsNow, visit, choose, next, ending, score, profile, check, fits };
  if (typeof module !== 'undefined') module.exports = root.corp;
})();
