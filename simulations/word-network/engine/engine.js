/* Word Network: association engine. Pure logic, no DOM. Exposed as MBALAB.wordnet (and module.exports for node tests).
   Data: raw = { w: [words], e: [[j, weight, j, weight, ...] per word] }; weight = strength x 1000 (how often people answered j for cue i).
   Direction matters in the data (cue -> response); for exploring we also use the reverse direction, and "u" is the undirected weight. */
(function () {
  const M = (typeof window !== 'undefined' ? (window.MBALAB = window.MBALAB || {}) : {}); const N = M.wordnet = M.wordnet || {};
  let W = [], idx = new Map(), out = [], adj = [];

  /* build lookup tables from the compact raw data */
  function load(raw) {
    W = raw.w; idx = new Map(); W.forEach((w, i) => { const k = norm(w); if (!idx.has(k)) idx.set(k, i); });
    out = raw.e.map(a => { const r = []; for (let k = 0; k < a.length; k += 2) r.push([a[k], a[k + 1]]); return r; });
    adj = W.map(() => new Map());
    out.forEach((list, i) => list.forEach(([j, w]) => { const m = adj[i], n = adj[j]; m.set(j, Math.max(m.get(j) || 0, w)); n.set(i, Math.max(n.get(i) || 0, w)); }));
    return W.length;
  }
  function norm(s) { return String(s || '').trim().toLowerCase().replace(/\s+/g, ' '); }
  const id = w => { const i = idx.get(norm(w)); return i === undefined ? -1 : i; };
  const word = i => W[i];
  const has = w => id(w) >= 0;
  const size = () => W.length;

  /* strongest associations of one word: [{w, s}] sorted by undirected weight; forward = what people said for this cue */
  function neighbors(w, k) {
    const i = id(w); if (i < 0) return [];
    const fwd = new Map(out[i]);
    return [...adj[i]].map(([j, s]) => ({ w: W[j], s, fwd: fwd.has(j) })).sort((a, b) => b.s - a.s).slice(0, k || 12);
  }
  const weight = (a, b) => { const i = id(a), j = id(b); return i < 0 || j < 0 ? 0 : (adj[i].get(j) || 0); };

  /* words connected to ALL given words (hubs): score = geometric mean of the weights, so one weak link keeps a word low.
     Two-step paths A-x-B are what the network view draws. Returns [{w, s, via: [weights per input]}] */
  function bridges(words, k) {
    const ids = [...new Set(words.map(id).filter(i => i >= 0))]; if (ids.length < 2) return [];
    const cand = new Map();
    ids.forEach(i => adj[i].forEach((s, j) => { if (!ids.includes(j)) cand.set(j, 1); }));
    const res = [];
    cand.forEach((_, j) => {
      const ws = ids.map(i => adj[i].get(j) || 0), hit = ws.filter(Boolean).length;
      if (hit < Math.min(2, ids.length)) return;
      const s = Math.pow(ws.reduce((p, x) => p * Math.max(x, 1), 1), 1 / ids.length) * (hit / ids.length);
      res.push({ w: W[j], s: Math.round(s * 10) / 10, via: ws, hit });
    });
    return res.sort((a, b) => b.hit - a.hit || b.s - a.s).slice(0, k || 10);
  }

  /* autocomplete: words starting with the typed text, best connected first */
  function prefix(p, k) {
    p = norm(p); if (!p) return [];
    const r = []; for (let i = 0; i < W.length; i++) if (W[i].toLowerCase().startsWith(p)) r.push(i);
    return r.sort((a, b) => adj[b].size - adj[a].size).slice(0, k || 6).map(i => W[i]);
  }

  /* direct link strength plus best 2-step bridge between two words */
  function pair(a, b) { return { direct: weight(a, b), bridges: bridges([a, b], 6) }; }

  /* ---------- quiz generators (rng = Math.random by default; pass a seeded one for tests) ---------- */
  const pick = (arr, rng) => arr[Math.floor(rng() * arr.length)];
  const shuffle = (arr, rng) => arr.map(x => [rng(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);

  /* "which word do people say first for X?" correct = strongest forward response; distractors = real words that are NOT in X's top 30 */
  function quizTop(cues, rng) {
    rng = rng || Math.random;
    const pool = cues.filter(c => has(c) && out[id(c)].length >= 5); if (!pool.length) return null;
    const cue = pick(pool, rng), i = id(cue), top = out[i].slice().sort((a, b) => b[1] - a[1]), ans = W[top[0][0]];
    const near = new Set(top.slice(0, 30).map(x => x[0])); near.add(i);
    const wrong = []; let guard = 0;
    while (wrong.length < 3 && guard++ < 400) { const j = Math.floor(rng() * W.length); if (!near.has(j) && W[j] !== ans && !wrong.includes(W[j]) && adj[j].size > 3) wrong.push(W[j]); }
    return { kind: 'top', cue, answer: ans, options: shuffle([ans].concat(wrong), rng), strength: top[0][1] };
  }
  /* "which word connects A and B?" correct = best bridge; distractors = words linked to only one of them or to neither */
  function quizBridge(pairs, rng) {
    rng = rng || Math.random;
    const ok = pairs.filter(p => has(p[0]) && has(p[1]) && bridges(p, 3).length >= 2); if (!ok.length) return null;
    const p = pick(ok, rng), br = bridges(p, 3), ans = br[0].w, bad = new Set(br.map(b => b.w));
    const wrong = []; let guard = 0;
    while (wrong.length < 3 && guard++ < 600) {
      const j = Math.floor(rng() * W.length), w = W[j];
      if (bad.has(w) || p.includes(w) || wrong.includes(w) || adj[j].size < 4) continue;
      if ((adj[j].get(id(p[0])) || 0) + (adj[j].get(id(p[1])) || 0) > 0) continue;
      wrong.push(w);
    }
    return { kind: 'bridge', pair: p, answer: ans, options: shuffle([ans].concat(wrong), rng), via: br[0].via };
  }

  Object.assign(N, { load, has, id, word, size, neighbors, weight, bridges, pair, prefix, quizTop, quizBridge, norm });
  if (typeof module !== 'undefined') module.exports = N;
})();
