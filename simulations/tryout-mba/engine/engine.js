/* Try Out MBA: rules only, no DOM. Builds an exam from the question bank (data.js), grades it, and keeps simple study statistics.
   A question is identified by its index in MBALAB.tryoutData.q. An exam is { qs: [instances], ... }; answers live next to it in the app. */
(function () {
  const root = typeof MBALAB !== 'undefined' ? MBALAB : (globalThis.MBALAB = globalThis.MBALAB || {});
  const Q = () => root.tryoutData.q;

  const rng = seed => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const shuffle = (a, r) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const x = b[i]; b[i] = b[j]; b[j] = x; } return b; };
  const key = (mk, wk) => mk + '-' + wk;

  /* options that point at other options ("all of the above", "A and B") must keep their order */
  const REF = /(semua (jawaban )?(di atas|benar|salah)|tidak ada (jawaban )?(di atas|yang benar)|\b(opsi|jawaban|pilihan) [A-D]\b|\b[A-D] (dan|&|atau) [A-D]\b|salah semua|benar semua)/i;
  const fixedOrder = q => !!q[5] && q[5].some(o => REF.test(o));

  /* how many questions match a selection */
  function count(cells, levels, type) {
    const C = new Set(cells), L = new Set(levels); let n = 0;
    Q().forEach(q => { if (q[3] === type && L.has(q[2]) && C.has(key(q[0], q[1]))) n++; });
    return n;
  }

  function instance(i, r) {
    const q = Q()[i], base = { i, mk: q[0], wk: q[1], lvl: q[2], ty: q[3], text: q[4], exp: q[7], ref: q[8] };
    if (q[3] === 1) return Object.assign(base, { opts: null, key: -1 });
    const perm = fixedOrder(q) ? [0, 1, 2, 3] : shuffle([0, 1, 2, 3], r);
    return Object.assign(base, { opts: perm.map(j => q[5][j]), key: perm.indexOf(q[6]), perm });
  }

  /* o: { cells:['1-1',...], levels:[0,1,2], n, essay:boolean, preferNew:boolean, seen:Set|Array, only:Array|null, seed } */
  function build(o) {
    const r = rng(o.seed || 1), C = new Set(o.cells), L = new Set(o.levels), seen = new Set(o.seen || []), only = o.only ? new Set(o.only) : null;
    /* groups: { mk: [ [ids of one week], ... ] } so that every course and every week gets its share */
    const groups = type => {
      const g = {};
      Q().forEach((q, i) => { if (q[3] === type && L.has(q[2]) && C.has(key(q[0], q[1])) && (!only || only.has(i))) { const m = g[q[0]] = g[q[0]] || {}; (m[q[1]] = m[q[1]] || []).push(i); } });
      return Object.keys(g).map(m => Object.keys(g[m]).map(w => g[m][w]));
    };
    const weave = lists => { const out = []; for (let p = 0; ; p++) { let took = false; lists.forEach(l => { if (p < l.length) { out.push(l[p]); took = true; } }); if (!took) return out; } };
    const pick = (courses, k) => {
      const seqs = shuffle(courses.map(weeks => weave(shuffle(weeks, r).map(w => { const s = shuffle(w, r); return o.preferNew ? s.filter(i => !seen.has(i)).concat(s.filter(i => seen.has(i))) : s; }))), r);
      return weave(seqs).slice(0, k);
    };
    const mg = groups(0), eg = o.essay || o.essN != null ? groups(1) : [], essAvail = eg.reduce((a, c) => a + c.reduce((b, w) => b + w.length, 0), 0);
    const nEss = Math.min(essAvail, o.essN != null ? o.essN : o.essay ? Math.max(o.n >= 10 ? 1 : 0, Math.round(o.n * 0.1)) : 0);
    const mc = shuffle(pick(mg, o.n - nEss), r), es = shuffle(pick(eg, nEss), r);
    return { seed: o.seed || 1, qs: mc.concat(es).map(i => instance(i, r)) };
  }

  /* X: { qs, ans: [optionIndex|null | text], grade: [null | 0 | 0.5 | 1] (essays only) } */
  function score(X) {
    const S = { mcq: { c: 0, t: 0, a: 0 }, ess: { e: 0, g: 0, pts: 0 }, byMk: {}, byLv: [{ c: 0, t: 0 }, { c: 0, t: 0 }, { c: 0, t: 0 }], byCell: {}, wrong: [], c: 0, t: 0 };
    const add = (q, pts) => {
      S.c += pts; S.t++;
      const m = S.byMk[q.mk] = S.byMk[q.mk] || { c: 0, t: 0 }; m.c += pts; m.t++;
      S.byLv[q.lvl].c += pts; S.byLv[q.lvl].t++;
      const k = key(q.mk, q.wk), cl = S.byCell[k] = S.byCell[k] || { c: 0, t: 0 }; cl.c += pts; cl.t++;
    };
    X.qs.forEach((q, p) => {
      if (q.ty === 0) {
        const a = X.ans[p], ok = a === q.key; S.mcq.t++; if (a !== null && a !== undefined) S.mcq.a++; if (ok) S.mcq.c++; else S.wrong.push(p);
        add(q, ok ? 1 : 0);
      } else {
        S.ess.e++; const g = X.grade ? X.grade[p] : null;
        if (g !== null && g !== undefined) { S.ess.g++; S.ess.pts += g; add(q, g); }
      }
    });
    S.pct = S.t ? Math.round(S.c / S.t * 100) : null;
    return S;
  }

  /* weakest weeks of a result: [{cell, acc, c, t}] lowest accuracy first, only those under 80% */
  function weakCells(S, max) {
    return Object.keys(S.byCell).map(k => ({ cell: k, acc: S.byCell[k].c / S.byCell[k].t, c: S.byCell[k].c, t: S.byCell[k].t })).filter(x => x.acc < 0.8).sort((a, b) => a.acc - b.acc || b.t - a.t).slice(0, max || 3);
  }

  /* study statistics kept between sessions: stats = { cell:{'1-1':[correct,total]}, seen:[ids], wrong:[ids], hist:[...] } */
  const fresh = () => ({ cell: {}, seen: [], wrong: [], hist: [] });
  function record(stats, X, S, meta) {
    const seen = new Set(stats.seen), wrong = new Set(stats.wrong);
    X.qs.forEach((q, p) => {
      seen.add(q.i);
      if (q.ty === 0) { const ok = X.ans[p] === q.key; if (ok) wrong.delete(q.i); else wrong.add(q.i); }
      else { const g = X.grade ? X.grade[p] : null; if (g === 1) wrong.delete(q.i); else if (g !== null && g !== undefined) wrong.add(q.i); }
    });
    Object.keys(S.byCell).forEach(k => { const c = stats.cell[k] = stats.cell[k] || [0, 0]; c[0] += S.byCell[k].c; c[1] += S.byCell[k].t; });
    stats.seen = Array.from(seen); stats.wrong = Array.from(wrong);
    stats.hist.unshift(Object.assign({ at: Date.now(), p: S.pct, c: S.c, t: S.t }, meta || {}));
    stats.hist = stats.hist.slice(0, 20);
    return stats;
  }
  /* merge two stat sets (this device + the cloud copy): per cell keep the larger tally, union the seen / wrong ids, history by time */
  function merge(a, b) {
    const out = fresh();
    [a, b].forEach(s => {
      if (!s) return;
      Object.keys(s.cell || {}).forEach(k => { const c = s.cell[k], o = out.cell[k]; if (!o || c[1] > o[1]) out.cell[k] = [c[0], c[1]]; });
    });
    out.seen = Array.from(new Set([].concat((a && a.seen) || [], (b && b.seen) || [])));
    out.wrong = Array.from(new Set([].concat((a && a.wrong) || [], (b && b.wrong) || [])));
    const byAt = {}; [a, b].forEach(s => ((s && s.hist) || []).forEach(h => { byAt[h.at] = h; }));
    out.hist = Object.keys(byAt).map(k => byAt[k]).sort((x, y) => y.at - x.at).slice(0, 20);
    return out;
  }
  const mastery = (stats, k) => { const c = stats.cell[k]; return c && c[1] > 0 ? c[0] / c[1] : null; };

  root.tryout = { rng, shuffle, key, fixedOrder, count, build, score, weakCells, fresh, record, merge, mastery };
})();
