/* BUMN Explorer: data (buildings, sectors) and quiz logic. No DOM. Texts live in strings.js.
   MBALAB.bumn = { SECTORS, COLORS, LIST, byId, quiz: { create(seed), answer(q, id) } } */
(function () {
  const SECTORS = ['energy', 'telecom', 'banking', 'transport', 'industry', 'resources', 'food', 'invest'];
  const COLORS = { energy: '#ffb020', telecom: '#2bd4ff', banking: '#34d399', transport: '#5b8cff', industry: '#ff7a45', resources: '#b57bff', food: '#a3e635', invest: '#ffd36e' };
  /* gx, gy = grid cell (0..9); s = footprint in cells; h = height in px; shape picks the drawing */
  const LIST = [
    { id: 'danantara', n: 'Danantara', sec: 'invest', gx: 4, gy: 4, s: 2, h: 128, shape: 'hub', icon: '🏛️' },
    { id: 'pertamina', n: 'Pertamina', sec: 'energy', gx: 1, gy: 1, h: 36, shape: 'tank', icon: '⛽' },
    { id: 'pln', n: 'PLN', sec: 'energy', gx: 8, gy: 1, h: 78, shape: 'mast', icon: '⚡' },
    { id: 'telkom', n: 'Telkom Indonesia', sec: 'telecom', gx: 4, gy: 1, h: 88, shape: 'mast', icon: '📡' },
    { id: 'mandiri', n: 'Bank Mandiri', sec: 'banking', gx: 3, gy: 3, h: 80, shape: 'tower', icon: '🏦' },
    { id: 'bri', n: 'BRI', sec: 'banking', gx: 6, gy: 3, h: 66, shape: 'tower', icon: '🏪' },
    { id: 'bni', n: 'BNI', sec: 'banking', gx: 3, gy: 6, h: 72, shape: 'tower', icon: '💼' },
    { id: 'btn', n: 'BTN', sec: 'banking', gx: 6, gy: 6, h: 58, shape: 'tower', icon: '🏠' },
    { id: 'garuda', n: 'Garuda Indonesia', sec: 'transport', gx: 8, gy: 4, h: 28, shape: 'low', icon: '✈️' },
    { id: 'kai', n: 'KAI', sec: 'transport', gx: 1, gy: 4, h: 28, shape: 'low', icon: '🚆' },
    { id: 'pelindo', n: 'Pelindo', sec: 'transport', gx: 8, gy: 8, h: 54, shape: 'crane', icon: '⚓' },
    { id: 'pos', n: 'Pos Indonesia', sec: 'transport', gx: 1, gy: 6, h: 30, shape: 'low', icon: '📮' },
    { id: 'jasamarga', n: 'Jasa Marga', sec: 'transport', gx: 4, gy: 8, h: 42, shape: 'arch', icon: '🛣️' },
    { id: 'sig', n: 'Semen Indonesia (SIG)', sec: 'industry', gx: 0, gy: 8, h: 50, shape: 'chimney', icon: '🧱' },
    { id: 'krakatau', n: 'Krakatau Steel', sec: 'industry', gx: 6, gy: 8, h: 56, shape: 'chimney', icon: '🔩' },
    { id: 'mind', n: 'MIND ID', sec: 'resources', gx: 9, gy: 6, h: 62, shape: 'pyramid', icon: '⛏️' },
    { id: 'pupuk', n: 'Pupuk Indonesia', sec: 'food', gx: 6, gy: 0, h: 42, shape: 'tank', icon: '🌱' },
    { id: 'bulog', n: 'Bulog', sec: 'food', gx: 2, gy: 9, h: 28, shape: 'low', icon: '🌾' }
  ];
  const byId = {}; LIST.forEach(b => { byId[b.id] = b; });

  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const quiz = {
    ROUNDS: 8,
    create(seed) {
      const r = rng(seed || 1), ids = LIST.map(b => b.id);
      for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
      return { order: ids.slice(0, quiz.ROUNDS), i: 0, score: 0, missed: [], done: false, answered: false };
    },
    target: q => q.order[q.i],
    /* returns { ok, answer } ; one answer per question */
    answer(q, id) {
      if (q.done || q.answered) return null;
      const ans = q.order[q.i], ok = id === ans;
      q.answered = true;
      if (ok) q.score++; else q.missed.push(ans);
      return { ok, answer: ans, picked: id };
    },
    next(q) { if (!q.answered) return; q.answered = false; q.i++; if (q.i >= q.order.length) q.done = true; }
  };
  window.MBALAB = window.MBALAB || {};
  MBALAB.bumn = { SECTORS, COLORS, LIST, byId, quiz };
})();
