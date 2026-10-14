/* Negotiation & BATNA: game rules. Pure logic, no DOM. Exposed as MBALAB.nego (and module.exports for node tests).
   Money is "Rp thousand per unit". The player is the buyer: BATNA = the highest price they would still pay (their best
   alternative). The seller has a hidden reservation price r. Deal zone (ZOPA) = [r, BATNA] when r <= BATNA. */
(function (root) {
  const LEVELS = [
    { id: 0, batna: 120, r: 92,  open: 138, rate: .30, gap: .04,  pat: 7, rounds: 8, bluff: 0,  zopa: true  },
    { id: 1, batna: 125, r: 98,  open: 152, rate: .20, gap: .02,  pat: 7, rounds: 9, bluff: 0,  zopa: true  },
    { id: 2, batna: 118, r: 104, open: 145, rate: .22, gap: .025, pat: 6, rounds: 8, bluff: .5, zopa: true  },
    { id: 3, batna: 112, r: 124, open: 160, rate: .12, gap: .02,  pat: 8, rounds: 8, bluff: 0,  zopa: false }
  ];
  const MIN = 60, MAX = 170;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function create(idx, rng) {
    const L = LEVELS[idx], rnd = rng || Math.random;
    return {
      idx, L, round: 1, ask: L.open, pat: L.pat, last: null, hist: [], probed: false, hint: null,
      bluffing: L.bluff > 0 && rnd() < L.bluff, offended: 0, stalls: 0, over: false, outcome: null, mood: 'neutral', reply: 'greet'
    };
  }
  const finish = (s, type, price) => { s.over = true; s.outcome = { type, price: price == null ? null : price, round: s.round }; return s; };

  /* The buyer proposes a price. Returns the (mutated) state; s.reply tells the UI which line the seller says. */
  function offer(s, x) {
    if (s.over) return s;
    x = Math.round(clamp(x, MIN, MAX));
    const L = s.L, prev = s.last, stall = prev != null && x < prev + 1;
    s.hist.push({ round: s.round, you: x, ask: s.ask });
    s.last = x; s.mood = 'neutral';
    if (x >= s.ask) { s.mood = 'happy'; s.reply = 'accept'; return finish(s, 'deal', s.ask); }
    const slack = Math.max(1, Math.round(L.gap * s.ask));
    if (x >= L.r && x >= s.ask - slack) { s.mood = 'happy'; s.reply = 'accept'; return finish(s, 'deal', x); }
    if (x < L.r * .86) {                                   // insulting lowball
      s.offended++; s.pat -= 2; s.mood = 'angry'; s.reply = 'offended';
      s.ask = Math.max(L.r + 1, s.ask - Math.round(L.rate * (s.ask - x) * .3));
    } else {
      const next = Math.max(L.r + 1, Math.round(s.ask - L.rate * (s.ask - x)));
      s.ask = Math.min(s.ask - 1, next) < L.r + 1 ? L.r + 1 : Math.min(s.ask - 1, next);
      if (stall) { s.stalls++; s.pat -= 1.5; s.mood = 'angry'; } else { s.pat -= .5; s.mood = 'thinking'; }
      s.reply = stall ? 'stall' : 'counter';
    }
    if (s.pat <= 0) { s.pat = 0; s.reply = 'walk'; s.mood = 'angry'; return finish(s, 'npcwalk'); }
    s.round++;
    if (s.round > L.rounds) { s.reply = 'timeout'; return finish(s, 'timeout'); }
    return s;
  }
  /* The buyer accepts the current ask. */
  function accept(s) { if (s.over) return s; s.mood = 'happy'; s.reply = 'accept'; s.hist.push({ round: s.round, you: s.ask, ask: s.ask, accepted: true }); return finish(s, 'deal', s.ask); }
  /* Ask about the seller's alternatives (once). A bluffing seller overstates them. */
  function probe(s) {
    if (s.over || s.probed) return s;
    s.probed = true; s.pat -= .5;
    s.hint = Math.round(s.bluffing ? s.L.r * 1.12 : s.L.r * 1.0);
    s.reply = 'probe'; s.mood = 'thinking';
    if (s.pat <= 0) { s.pat = 0; s.reply = 'walk'; return finish(s, 'npcwalk'); }
    return s;
  }
  function walk(s) { if (s.over) return s; s.reply = 'youWalk'; s.mood = 'neutral'; return finish(s, 'walk'); }

  /* Score, stars and lessons (keys are translated by the UI). */
  function result(s) {
    const L = s.L, o = s.outcome, B = L.batna, r = L.r;
    const zone = L.zopa ? { lo: r, hi: B } : null;
    let score = 0, stars = 0, share = null;
    const lessons = [];
    if (o.type === 'deal') {
      if (L.zopa) {
        share = clamp((B - o.price) / (B - r), 0, 1);
        if (o.price > B) { score = 0; stars = 0; lessons.push('lsOverBatna'); }
        else { score = Math.round(share * 100); stars = share >= .65 ? 3 : share >= .4 ? 2 : 1; if (share < .4) lessons.push('lsLeftMoney'); }
      } else { score = 0; stars = 0; lessons.push('lsNoZopaDeal'); }
    } else if (o.type === 'walk') {
      if (L.zopa) { score = 0; lessons.push('lsWalkedZopa'); }
      else { score = Math.max(60, 100 - 6 * (o.round - 1)); stars = score >= 85 ? 3 : score >= 70 ? 2 : 1; lessons.push('lsGoodWalk'); }
    } else {                                              // timeout or seller walked
      if (L.zopa) { score = 0; lessons.push(o.type === 'timeout' ? 'lsTimeout' : 'lsNpcWalk'); }
      else { score = 30; lessons.push('lsLateNoZopa'); }
    }
    if (s.offended) lessons.push('lsLowball');
    if (s.stalls) lessons.push('lsStall');
    if (L.bluff && s.bluffing && s.probed) lessons.push('lsBluff');
    if (L.zopa && o.type === 'deal' && o.price <= B && share >= .65) lessons.push('lsAnchor');
    const first = s.hist[0];
    if (first && L.zopa && first.you >= B) lessons.push('lsOpenHigh');
    return { score, stars, share, zone, lessons: Array.from(new Set(lessons)).slice(0, 3), r, batna: B, outcome: o };
  }

  const api = { LEVELS, MIN, MAX, create, offer, accept, probe, walk, result };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.MBALAB = root.MBALAB || {}; root.MBALAB.nego = Object.assign(root.MBALAB.nego || {}, api); }
})(typeof window !== 'undefined' ? window : globalThis);
