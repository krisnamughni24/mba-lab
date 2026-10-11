/* DISC Crisis Room: scoring rules. Pure logic, no DOM. Exposed as MBALAB.disc (and module.exports for node tests).
   Each crisis has two decisions. Every option is secretly one of D, I, S, C (order in data: D, I, S, C).
   First move = 2 points, next step = 1 point, so 6 crises give 18 points in total. */
(function (root) {
  const STYLES = ['D', 'I', 'S', 'C'];
  const OPP = { D: 'S', S: 'D', I: 'C', C: 'I' };           // the style an action trades off against
  const W = [2, 1];
  const SCENES = 6;

  const create = seed => {
    let a = (seed || 1) >>> 0 || 1;
    const rnd = () => (a = (a * 1664525 + 1013904223) >>> 0) / 4294967296;
    /* every decision shows its four options in a shuffled order (fixed for the run) */
    const order = () => { const o = [0, 1, 2, 3]; for (let i = 3; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o; };
    const orders = []; for (let i = 0; i < SCENES; i++) orders.push([order(), order()]);
    return { scene: 0, step: 0, score: { D: 0, I: 0, S: 0, C: 0 }, meters: { D: 50, I: 50, S: 50, C: 50 }, log: [], orders, done: false };
  };
  /* pick(state, optionIndex 0..3 in D,I,S,C order). Returns the style picked. */
  function pick(s, idx) {
    if (s.done) return null;
    const st = STYLES[idx], w = W[s.step];
    s.score[st] += w;
    s.meters[st] = Math.min(100, s.meters[st] + 9 * w);
    s.meters[OPP[st]] = Math.max(10, s.meters[OPP[st]] - 4 * w);
    s.log.push({ scene: s.scene, step: s.step, style: st });
    if (s.step === 0) s.step = 1; else { s.step = 0; s.scene++; if (s.scene >= SCENES) s.done = true; }
    return st;
  }
  function result(s) {
    const total = STYLES.reduce((n, k) => n + s.score[k], 0) || 1;
    const pct = {}; STYLES.forEach(k => { pct[k] = Math.round(s.score[k] / total * 100); });
    const rank = STYLES.slice().sort((a, b) => s.score[b] - s.score[a] || STYLES.indexOf(a) - STYLES.indexOf(b));
    const primary = rank[0], second = rank[1];
    const blend = s.score[primary] - s.score[second] <= 2;   // a close second counts as a blend
    return { score: s.score, pct, primary, secondary: second, blend, code: blend ? primary + second : primary };
  }
  const api = { STYLES, OPP, SCENES, W, create, pick, result };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else { root.MBALAB = root.MBALAB || {}; root.MBALAB.disc = Object.assign(root.MBALAB.disc || {}, api); }
})(typeof window !== 'undefined' ? window : globalThis);
