/* BUMN Explorer: data (buildings, sectors) and quiz logic. No DOM. Texts live in strings.js.
   MBALAB.bumn = { SECTORS, COLORS, LIST, byId, quiz: { create(level, seed), cur(q), answer(q, optIndex) } } */
(function () {
  const SECTORS = ['org', 'energy', 'logistics', 'banking', 'manufacturing', 'food', 'minerals', 'health', 'plantations', 'telecom', 'insurance', 'tourism', 'special', 'survey', 'infra'];
  const COLORS = { org: '#ffc857', energy: '#ff9f1c', logistics: '#5b8cff', banking: '#34d399', manufacturing: '#ff5a36', food: '#d4e157', minerals: '#8b7cff', health: '#ff4d6d', plantations: '#4caf50', telecom: '#38bdf8', insurance: '#c084fc', tourism: '#2dd4bf', special: '#94a3b8', survey: '#e2e8f0', infra: '#e879f9' };
  /* x, z = world position (units ~ metres in the 3D city), r = footprint radius, h = height scale used for camera framing */
  const LIST = [
    { id: 'danantara', n: 'Danantara', sec: 'invest', x: 0, z: 0, r: 17, h: 64, icon: '🏛️' },
    { id: 'mandiri', n: 'Bank Mandiri', sec: 'banking', x: -36, z: 18, r: 8, h: 40, icon: '🏦' },
    { id: 'bri', n: 'BRI', sec: 'banking', x: 36, z: 18, r: 8, h: 34, icon: '🏪' },
    { id: 'bni', n: 'BNI', sec: 'banking', x: -36, z: -18, r: 8, h: 36, icon: '💼' },
    { id: 'btn', n: 'BTN', sec: 'banking', x: 36, z: -18, r: 8, h: 30, icon: '🏠' },
    { id: 'telkom', n: 'Telkom Indonesia', sec: 'telecom', x: 0, z: 54, r: 8, h: 46, icon: '📡' },
    { id: 'pos', n: 'Pos Indonesia', sec: 'transport', x: 0, z: -54, r: 20, h: 38, icon: '📮' },
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
  /* Fact quiz: three levels, 8 four-option questions each. Questions are plain data (kind + company ids / values);
     app.js turns them into text in the current language, so switching language mid-quiz works. */
  const ALIAS = { pertamina: ['Permina', 'Pertamin', 'ペルミナ', 'ペルタミン', 'プルタミナ'], garuda: ['ガルーダ'], bri: ['BRIsat', 'BRImo', 'BRILink'], telkom: ['Telkomsel'], pelindo: ['Pelindo'],
    mandiri: ["Livin'", 'Kopra'], pos: ['Pospay', 'Giropos', 'PosIND', 'AgriPost'], bni: ['Xpora'], idfood: ['Rajawali Nusantara Indonesia', 'Rajawali', 'Warung Pangan'], bsi: ['Bank Syariah Indonesia'], btn: ['Bank Syariah Nasional', 'Bank Tabungan Negara'],
    pelni: ['Pelayaran Nasional'], 'agrinas-jaladri': ['Virama Karya', 'Virama'], 'agrinas-pangan': ['Yodya Karya', 'Yodya'], 'persero-batam': ['Batam'], kai: ['Kereta Api'], len: ['Len Industri'], danantara: ['BPI', 'Danantara'], dam: ['Danantara Asset Management', 'Danantara Aset Management'] };
  const GENERIC = /^(bank|indonesia|persero|karya|plaza)$/i;
  const tokens = id => { const b = byId[id], w = b.n.split(/[\s()]+/).filter(x => x.length >= 3 && !GENERIC.test(x)); return [b.n].concat(w, ALIAS[id] || []).sort((p, q) => q.length - p.length); };
  const esc = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rx = w => new RegExp(/^[\w .'-]+$/.test(w) ? '\\b' + esc(w) + '\\b' : esc(w), 'gi');
  const mask = (text, id) => tokens(id).reduce((s, w) => s.replace(rx(w), '___'), text);
  const mentions = (text, id) => tokens(id).some(w => rx(w).test(text));
  const info = id => (MBALAB.bumn.INFO || {})[id];
  const guide = id => (MBALAB.bumn.GUIDE || {})[id];
  /* fact-check pool: questions about the Danantara structure itself (answer = one of the four organisation entities) */
  const ORGQ = ['dam', 'dim', 'ddmf', 'danantara'];
  const SPEC = {
    easy: [['clue', 3], ['sector', 2], ['hq', 1], ['member', 1], ['parent', 1]],
    medium: [['fact', 2], ['figure', 2], ['subs', 1], ['clue2', 1], ['orgq', 1], ['parent', 1]],
    hard: [['note', 2], ['fact3', 1], ['year', 2], ['oldest', 1], ['subs', 1], ['figure', 1]]
  };
  const quiz = {
    ROUNDS: 8, LEVELS: ['easy', 'medium', 'hard'],
    create(level, seed) {
      level = SPEC[level] ? level : 'easy';
      const r = rng(seed || 1), shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
      const ids = LIST.map(b => b.id), used = new Set(), qs = [];
      const sameSec = (id, ex) => shuf(ids.filter(x => x !== id && byId[x].sec === byId[id].sec && !(ex || []).includes(x)));
      const others = (id, ex) => shuf(ids.filter(x => x !== id && !(ex || []).includes(x)));
      const opts = (id, near, text) => {
        const ban = ids.filter(x => x !== id && text && mentions(text, x)), pool = (near ? sameSec(id, ban).concat(others(id, ban)) : others(id, ban)).filter((x, i, a) => a.indexOf(x) === i);
        return shuf([id].concat(pool.slice(0, 3)));
      };
      const take = (n, ok) => shuf(ids.filter(id => !used.has(id) && (!ok || ok(id)))).slice(0, n);
      const done = (arr, id) => { arr.forEach(x => used.add(x)); };
      const yearOk = id => { const I = info(id); return I && I.f[0][0].indexOf(String(I.since)) >= 0; };
      const factOk = (id, fi) => { const I = info(id); if (!I) return false; const tx = mask(I.f[fi][0], id); return tx.length > 24; };
      const nonJkt = id => { const I = info(id); return I && I.hq !== 'Jakarta'; };
      SPEC[level].forEach(([kind, n]) => {
        if (kind === 'clue' || kind === 'clue2') take(n).forEach(id => { used.add(id); qs.push({ k: 'clue', id, o: opts(id, kind === 'clue2') }); });
        else if (kind === 'sector') take(n).forEach(id => { used.add(id); const sec = byId[id].sec; qs.push({ k: 'sector', id, o: shuf([sec].concat(shuf(SECTORS.filter(x => x !== sec)).slice(0, 3))), v: sec }); });
        else if (kind === 'hq') take(n, nonJkt).forEach(id => { used.add(id); const hq = info(id).hq, all = [...new Set(ids.map(x => info(x) && info(x).hq).filter(Boolean))].filter(x => x !== hq); qs.push({ k: 'hq', id, o: shuf([hq].concat(shuf(all).slice(0, 3))), v: hq }); });
        else if (kind === 'member') take(n).forEach(id => { used.add(id); const sec = byId[id].sec, pool = shuf(ids.filter(x => byId[x].sec !== sec)).slice(0, 3); qs.push({ k: 'member', id, sec, o: shuf([id].concat(pool)) }); });
        else if (kind === 'fact' || kind === 'fact3') {
          const fis = kind === 'fact' ? [0, 1] : [2];
          take(n, id => fis.some(fi => factOk(id, fi))).forEach(id => { used.add(id); const fi = shuf(fis.filter(f => factOk(id, f)))[0]; qs.push({ k: 'fact', id, fi, o: opts(id, true, info(id).f[fi].join(' ')) }); });
        }
        else if (kind === 'parent') take(n, id => byId[id].sub && byId[byId[id].sub]).forEach(id => { used.add(id); const par = byId[id].sub, bad = ids.filter(x => x === id || x === par); qs.push({ k: 'parent', id, v: par, o: shuf([par].concat(shuf(ids.filter(x => !bad.includes(x) && !byId[x].sub && x !== 'danantara')).slice(0, 3))) }); });
        else if (kind === 'figure') take(n, id => guide(id) && guide(id).fig && guide(id).val).forEach(id => { used.add(id); qs.push({ k: 'figure', id, o: opts(id, true, guide(id).fig.join(' ')) }); });
        else if (kind === 'note') take(n, id => guide(id) && guide(id).note).forEach(id => { used.add(id); qs.push({ k: 'note', id, o: opts(id, true, guide(id).note.join(' ')) }); });
        else if (kind === 'subs') take(n, id => guide(id) && guide(id).subs && guide(id).subs.n != null).forEach(id => { used.add(id); const v = guide(id).subs.n, pool = [...new Set([v - 3, v - 2, v - 1, v + 1, v + 2, v + 3, v + 5].filter(x => x >= 0))]; qs.push({ k: 'subs', id, v, o: shuf([v].concat(shuf(pool).slice(0, 3))) }); });
        else if (kind === 'orgq') { const id = shuf(ORGQ)[0]; used.add(id); qs.push({ k: 'orgq', id, q: id, o: shuf(ORGQ) }); }
        else if (kind === 'year') take(n, yearOk).forEach(id => { used.add(id); const y = info(id).since, pool = [...new Set(ids.map(x => info(x) && Number(info(x).since)).filter(v => v && v !== Number(y)))]; qs.push({ k: 'year', id, v: y, o: shuf([Number(y)].concat(shuf(pool).slice(0, 3))) }); });
        else if (kind === 'oldest') {
          const el = shuf(ids.filter(yearOk)), seen = new Set(), pick = [];
          el.forEach(id => { const y = Number(info(id).since); if (pick.length < 4 && !seen.has(y)) { seen.add(y); pick.push(id); } });
          const win = pick.slice().sort((p, q) => Number(info(p).since) - Number(info(q).since))[0]; qs.push({ k: 'oldest', id: win, o: shuf(pick) });
        }
      });
      /* top up with plain clue questions if a kind found too few eligible companies */
      take(Math.max(0, quiz.ROUNDS - qs.length)).forEach(id => { used.add(id); qs.push({ k: 'clue', id, o: opts(id, true) }); });
      const fin = shuf(qs).slice(0, quiz.ROUNDS).map(x => { x.ci = x.o.indexOf(x.k === 'sector' || x.k === 'hq' || x.k === 'parent' ? x.v : x.k === 'year' || x.k === 'subs' ? Number(x.v) : x.id); return x; });
      return { level, qs: fin, i: 0, score: 0, missed: [], done: false, answered: false, picked: -1 };
    },
    cur: q => q.qs[q.i],
    target: q => q.qs[q.i].id,
    answer(q, idx) {
      if (q.done || q.answered) return null;
      const c = q.qs[q.i], ok = idx === c.ci; q.answered = true; q.picked = idx;
      if (ok) q.score++; else q.missed.push(c.id);
      return { ok, ci: c.ci, picked: idx };
    },
    next(q) { if (!q.answered) return; q.answered = false; q.picked = -1; q.i++; if (q.i >= q.qs.length) q.done = true; },
    mask
  };
  window.MBALAB = window.MBALAB || {};
  MBALAB.bumn = { SECTORS, COLORS, LIST, byId, quiz };
})();
