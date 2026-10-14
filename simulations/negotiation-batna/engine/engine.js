/* Negotiation & BATNA: game rules. Pure logic, no DOM. Exposed as MBALAB.nego (and module.exports for node tests).
   Money is "Rp thousand per unit". The player is the buyer: BATNA = the highest price they would still pay (their best
   alternative). The sellers share one hidden reservation price r. Deal zone (ZOPA) = [r, BATNA] when r <= BATNA.
   A mission can have one or two sellers (each with their own patience and pace) and up to two teammates who each
   offer one special action a limited number of times (intel, rapport, pressure). */
(function (root) {
  /* seller personas: p index matches the text keys n<p>name, n<p>greet, ... ; proud sellers resent pressure tactics */
  const PERSONA = [
    { rate: .30, pat: 7 }, { rate: .20, pat: 7 }, { rate: .22, pat: 6 }, { rate: .12, pat: 8 },
    { rate: .30, pat: 5 }, { rate: .12, pat: 7, proud: true }, { rate: .18, pat: 6 }, { rate: .22, pat: 6 }
  ];
  const o = (p, rate, pat) => ({ p, rate: rate == null ? PERSONA[p].rate : rate, pat: pat == null ? PERSONA[p].pat : pat });
  const al = (id, uses) => ({ id, uses });
  /* goods: which product is drawn on the table (see scene.js). noise: how far a teammate's intel can be off. */
  const LEVELS = [
    { id: 0,  goods: 0, batna: 120, r: 92,  open: 138, gap: .04,  rounds: 8,  bluff: 0,  zopa: true,  opps: [o(0)], allies: [] },
    { id: 1,  goods: 1, batna: 125, r: 98,  open: 152, gap: .02,  rounds: 9,  bluff: 0,  zopa: true,  opps: [o(1)], allies: [] },
    { id: 2,  goods: 2, batna: 118, r: 104, open: 145, gap: .025, rounds: 8,  bluff: .5, zopa: true,  opps: [o(2)], allies: [] },
    { id: 3,  goods: 3, batna: 112, r: 124, open: 160, gap: .02,  rounds: 8,  bluff: 0,  zopa: false, opps: [o(3)], allies: [] },
    { id: 4,  goods: 4, batna: 130, r: 104, open: 158, gap: .025, rounds: 8,  bluff: 0,  zopa: true,  noise: 0, opps: [o(4)], allies: [al('intel', 1)] },
    { id: 5,  goods: 5, batna: 122, r: 100, open: 150, gap: .02,  rounds: 9,  bluff: 0,  zopa: true,  opps: [o(5, .16, 5)], allies: [al('rapport', 2)] },
    { id: 6,  goods: 6, batna: 126, r: 100, open: 156, gap: .025, rounds: 9,  bluff: 0,  zopa: true,  opps: [o(5, .10, 7), o(4, .32, 5)], allies: [] },
    { id: 7,  goods: 7, batna: 120, r: 96,  open: 150, gap: .025, rounds: 8,  bluff: .8, zopa: true,  noise: 3, opps: [o(7)], allies: [al('intel', 1), al('pressure', 1)] },
    { id: 8,  goods: 1, batna: 130, r: 106, open: 162, gap: .02,  rounds: 9,  bluff: 0,  zopa: true,  noise: 2, opps: [o(6, .14, 7), o(0, .30, 5)], allies: [al('intel', 1)] },
    { id: 9,  goods: 2, batna: 124, r: 100, open: 158, gap: .02,  rounds: 9,  bluff: .5, zopa: true,  noise: 3, opps: [o(1, .16, 7), o(2, .28, 5)], allies: [al('rapport', 2), al('pressure', 1)] },
    { id: 10, goods: 3, batna: 112, r: 126, open: 164, gap: .02,  rounds: 9,  bluff: 0,  zopa: false, noise: 5, opps: [o(3, .12, 8), o(5, .12, 7)], allies: [al('intel', 1), al('rapport', 1)] },
    { id: 11, goods: 4, batna: 128, r: 112, open: 168, gap: .015, rounds: 10, bluff: .6, zopa: true,  noise: 4, opps: [o(5, .12, 6), o(7, .22, 5)], allies: [al('intel', 1), al('pressure', 1)] }
  ];
  const MIN = 60, MAX = 170;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function create(idx, rng) {
    const L = LEVELS[idx], rnd = rng || Math.random;
    return {
      idx, L, round: 1, ask: L.open, last: null, hist: [], probed: false, hint: null, intel: null,
      opps: L.opps.map(q => ({ p: q.p, rate: q.rate, max: q.pat, pat: q.pat, mood: 'neutral' })), turn: 0, speaker: 0, walker: null,
      allies: L.allies.map(a => ({ id: a.id, uses: a.uses, max: a.uses })), usedAlly: 0, backfired: 0, allyRes: null,
      bluffing: L.bluff > 0 && rnd() < L.bluff, offended: 0, stalls: 0, over: false, outcome: null, mood: 'neutral', reply: 'greet'
    };
  }
  const finish = (s, type, price) => { s.over = true; s.outcome = { type, price: price == null ? null : price, round: s.round }; return s; };
  const lowest = s => s.opps.reduce((m, q, i) => (q.pat < s.opps[m].pat ? i : m), 0);
  const moods = (s, sp, m, others) => { s.opps.forEach((q, i) => { q.mood = i === sp ? m : (others || 'neutral'); }); s.mood = m; };
  const checkWalk = s => { const i = s.opps.findIndex(q => q.pat <= 0); if (i < 0) return false; s.opps[i].pat = 0; s.walker = i; s.speaker = i; s.reply = 'walk'; s.opps[i].mood = 'angry'; s.mood = 'angry'; finish(s, 'npcwalk'); return true; };

  /* The buyer proposes a price, addressed to one seller (who). Returns the (mutated) state; s.reply tells the UI which line the seller says. */
  function offer(s, x, who) {
    if (s.over) return s;
    x = Math.round(clamp(x, MIN, MAX));
    const L = s.L, n = s.opps.length, sp = n > 1 && who != null ? clamp(who, 0, n - 1) : s.turn % n, q = s.opps[sp];
    const prev = s.last, stall = prev != null && x < prev + 1;
    s.hist.push({ round: s.round, you: x, ask: s.ask, who: sp });
    s.last = x; s.speaker = sp; moods(s, sp, 'neutral');
    if (x >= s.ask) { moods(s, sp, 'happy', 'happy'); s.reply = 'accept'; return finish(s, 'deal', s.ask); }
    const slack = Math.max(1, Math.round(L.gap * s.ask));
    if (x >= L.r && x >= s.ask - slack) { moods(s, sp, 'happy', 'happy'); s.reply = 'accept'; return finish(s, 'deal', x); }
    const ignore = n > 1 ? .4 : 0;                          // the seller you did not address feels ignored
    s.opps.forEach((o2, i) => { if (i !== sp) o2.pat -= ignore; });
    if (x < L.r * .86) {                                   // insulting lowball
      s.offended++; q.pat -= 2; s.opps.forEach((o2, i) => { if (i !== sp) o2.pat -= 1; }); moods(s, sp, 'angry', 'thinking'); s.reply = 'offended';
      s.ask = Math.max(L.r + 1, s.ask - Math.round(q.rate * (s.ask - x) * .3));
    } else {
      const next = Math.max(L.r + 1, Math.round(s.ask - q.rate * (s.ask - x)));
      s.ask = Math.min(s.ask - 1, next) < L.r + 1 ? L.r + 1 : Math.min(s.ask - 1, next);
      if (stall) { s.stalls++; q.pat -= 1.5; moods(s, sp, 'angry', 'thinking'); } else { q.pat -= .5; moods(s, sp, 'thinking'); }
      s.reply = stall ? 'stall' : 'counter';
    }
    if (checkWalk(s)) return s;
    s.turn = (sp + 1) % n; s.round++;
    if (s.round > L.rounds) { s.reply = 'timeout'; return finish(s, 'timeout'); }
    return s;
  }
  /* The buyer accepts the current ask. */
  function accept(s) { if (s.over) return s; moods(s, s.turn % s.opps.length, 'happy', 'happy'); s.speaker = s.turn % s.opps.length; s.reply = 'accept'; s.hist.push({ round: s.round, you: s.ask, ask: s.ask, accepted: true }); return finish(s, 'deal', s.ask); }
  /* Ask about the seller's alternatives (once). A bluffing seller overstates them. */
  function probe(s) {
    if (s.over || s.probed) return s;
    const sp = s.turn % s.opps.length; s.probed = true; s.speaker = sp; s.opps[sp].pat -= .5;
    s.hint = Math.round(s.bluffing ? s.L.r * 1.12 : s.L.r * 1.0);
    s.reply = 'probe'; moods(s, sp, 'thinking');
    checkWalk(s); return s;
  }
  function walk(s) { if (s.over) return s; s.speaker = s.turn % s.opps.length; s.reply = 'youWalk'; moods(s, s.speaker, 'neutral'); return finish(s, 'walk'); }

  /* A teammate steps in. Free action (does not use a round) but limited uses. */
  function ally(s, i) {
    const a = s.allies[i]; if (s.over || !a || a.uses <= 0) return s;
    const L = s.L, sp = s.turn % s.opps.length; a.uses--; s.usedAlly++; s.speaker = sp; s.allyRes = { id: a.id, who: i };
    if (a.id === 'intel') {
      const noise = L.noise || 0, off = noise ? Math.round((Math.random() * 2 - 1) * noise) : 0;
      s.intel = L.r + off; s.allyRes.hint = s.intel; s.reply = 'ally'; moods(s, sp, 'neutral');
    } else if (a.id === 'rapport') {
      s.opps.forEach(q => { q.pat = Math.min(q.max, q.pat + 1.5); });
      s.ask = Math.max(L.r + 1, s.ask - Math.max(1, Math.round(.12 * (s.ask - L.r)))); s.reply = 'ally'; moods(s, sp, 'happy', 'happy');
    } else {                                              // pressure: hint at a competing offer
      const proud = s.opps.some(q => PERSONA[q.p].proud);
      const cut = Math.round((s.ask - (L.r + 1)) * (proud ? .12 : .38));
      s.ask = Math.max(L.r + 1, s.ask - cut);
      if (proud) { s.backfired++; s.opps.forEach(q => { if (PERSONA[q.p].proud) q.pat -= 1.5; }); s.allyRes.backfire = true; moods(s, sp, 'angry', 'thinking'); } else moods(s, sp, 'thinking', 'thinking');
      s.reply = 'ally';
    }
    checkWalk(s); return s;
  }

  /* Score, stars and lessons (keys are translated by the UI). */
  function result(s) {
    const L = s.L, oc = s.outcome, B = L.batna, r = L.r;
    const zone = L.zopa ? { lo: r, hi: B } : null;
    let score = 0, stars = 0, share = null;
    const lessons = [];
    if (oc.type === 'deal') {
      if (L.zopa) {
        share = clamp((B - oc.price) / (B - r), 0, 1);
        if (oc.price > B) { score = 0; stars = 0; lessons.push('lsOverBatna'); }
        else { score = Math.round(share * 100); stars = share >= .65 ? 3 : share >= .4 ? 2 : 1; if (share < .4) lessons.push('lsLeftMoney'); }
      } else { score = 0; stars = 0; lessons.push('lsNoZopaDeal'); }
    } else if (oc.type === 'walk') {
      if (L.zopa) { score = 0; lessons.push('lsWalkedZopa'); }
      else { score = Math.max(60, 100 - 6 * (oc.round - 1)); stars = score >= 85 ? 3 : score >= 70 ? 2 : 1; lessons.push('lsGoodWalk'); if (s.intel != null) lessons.push('lsIntelWalk'); }
    } else {                                              // timeout or seller walked
      if (L.zopa) { score = 0; lessons.push(oc.type === 'timeout' ? 'lsTimeout' : 'lsNpcWalk'); }
      else { score = 30; lessons.push('lsLateNoZopa'); }
    }
    if (s.backfired) lessons.push('lsBackfire');
    if (s.offended) lessons.push('lsLowball');
    if (s.stalls) lessons.push('lsStall');
    if (s.allies.length && !s.usedAlly) lessons.push('lsAllyUnused');
    if (s.opps.length > 1 && oc.type === 'npcwalk') lessons.push('lsIgnored');
    if (s.opps.length > 1 && oc.type === 'deal' && score > 0) lessons.push('lsTeam');
    if (L.bluff && s.bluffing && s.probed) lessons.push('lsBluff');
    if (L.zopa && oc.type === 'deal' && oc.price <= B && share >= .65) lessons.push('lsAnchor');
    const first = s.hist[0];
    if (first && L.zopa && first.you >= B) lessons.push('lsOpenHigh');
    if (!lessons.length) lessons.push('lsSteady');
    return { score, stars, share, zone, lessons: Array.from(new Set(lessons)).slice(0, 3), r, batna: B, outcome: oc };
  }

  const api = { LEVELS, PERSONA, MIN, MAX, create, offer, accept, probe, walk, ally, result, lowest };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.MBALAB = root.MBALAB || {}; root.MBALAB.nego = Object.assign(root.MBALAB.nego || {}, api); }
})(typeof window !== 'undefined' ? window : globalThis);
