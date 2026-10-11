/* BUMN Explorer: data (buildings, sectors) and quiz logic. No DOM. Texts live in strings.js.
   MBALAB.bumn = { SECTORS, COLORS, LIST, byId, quiz: { create(seed), answer(q, id) } } */
(function () {
  const SECTORS = ['energy', 'telecom', 'banking', 'transport', 'infra', 'industry', 'resources', 'food', 'health', 'invest'];
  const COLORS = { energy: '#ffb020', telecom: '#2bd4ff', banking: '#34d399', transport: '#5b8cff', infra: '#e879f9', industry: '#ff7a45', resources: '#a78bfa', food: '#a3e635', health: '#ff5d7a', invest: '#ffd36e' };
  /* x, z = world position (units ~ metres in the 3D city), r = footprint radius, h = height scale used for camera framing */
  const LIST = [
    { id: 'danantara', n: 'Danantara', sec: 'invest', x: 0, z: 0, r: 17, h: 64, icon: '🏛️' },
    { id: 'mandiri', n: 'Bank Mandiri', sec: 'banking', x: -36, z: 18, r: 8, h: 40, icon: '🏦' },
    { id: 'bri', n: 'BRI', sec: 'banking', x: 36, z: 18, r: 8, h: 34, icon: '🏪' },
    { id: 'bni', n: 'BNI', sec: 'banking', x: -36, z: -18, r: 8, h: 36, icon: '💼' },
    { id: 'btn', n: 'BTN', sec: 'banking', x: 36, z: -18, r: 8, h: 30, icon: '🏠' },
    { id: 'telkom', n: 'Telkom Indonesia', sec: 'telecom', x: 0, z: 54, r: 8, h: 46, icon: '📡' },
    { id: 'pos', n: 'Pos Indonesia', sec: 'transport', x: 0, z: -54, r: 9, h: 14, icon: '📮' },
    { id: 'pertamina', n: 'Pertamina', sec: 'energy', x: -30, z: -215, r: 20, h: 26, icon: '⛽' },
    { id: 'pln', n: 'PLN', sec: 'energy', x: 165, z: -40, r: 22, h: 40, icon: '⚡' },
    { id: 'pelindo', n: 'Pelindo', sec: 'transport', x: 60, z: -122, r: 24, h: 30, icon: '⚓' },
    { id: 'pelni', n: 'Pelni', sec: 'transport', x: 112, z: -152, r: 18, h: 16, icon: '🚢' },
    { id: 'pal', n: 'PT PAL', sec: 'industry', x: -70, z: -125, r: 22, h: 26, icon: '🛠️' },
    { id: 'kai', n: 'KAI', sec: 'transport', x: -60, z: -80, r: 14, h: 12, icon: '🚆' },
    { id: 'garuda', n: 'Garuda Indonesia', sec: 'transport', x: -168, z: -40, r: 18, h: 16, icon: '✈️' },
    { id: 'injourney', n: 'InJourney', sec: 'transport', x: -140, z: 14, r: 18, h: 16, icon: '🛬' },
    { id: 'jasamarga', n: 'Jasa Marga', sec: 'infra', x: -40, z: 84, r: 14, h: 18, icon: '🛣️' },
    { id: 'hutamakarya', n: 'Hutama Karya', sec: 'infra', x: 100, z: 84, r: 30, h: 36, icon: '🌉' },
    { id: 'waskita', n: 'Waskita Karya', sec: 'infra', x: -120, z: 125, r: 14, h: 30, icon: '🏗️' },
    { id: 'sig', n: 'Semen Indonesia (SIG)', sec: 'industry', x: 205, z: 28, r: 18, h: 30, icon: '🧱' },
    { id: 'krakatau', n: 'Krakatau Steel', sec: 'industry', x: 168, z: -104, r: 18, h: 36, icon: '🔩' },
    { id: 'mind', n: 'MIND ID', sec: 'resources', x: 0, z: 152, r: 24, h: 38, icon: '⛏️' },
    { id: 'antam', n: 'Antam', sec: 'resources', x: -85, z: 175, r: 22, h: 34, icon: '🥇' },
    { id: 'bukitasam', n: 'Bukit Asam', sec: 'resources', x: 88, z: 168, r: 22, h: 24, icon: '⚫' },
    { id: 'pupuk', n: 'Pupuk Indonesia', sec: 'food', x: 150, z: 40, r: 18, h: 34, icon: '🌱' },
    { id: 'bulog', n: 'Bulog', sec: 'food', x: 130, z: 135, r: 16, h: 14, icon: '🌾' },
    { id: 'ptpn', n: 'PTPN', sec: 'food', x: 200, z: 130, r: 20, h: 18, icon: '🌴' },
    { id: 'biofarma', n: 'Bio Farma', sec: 'health', x: -98, z: -34, r: 12, h: 22, icon: '💉' }
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
