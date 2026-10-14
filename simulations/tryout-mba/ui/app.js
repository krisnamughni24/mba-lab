/* Try Out MBA: UI wiring. Rules live in engine.js, the questions in data.js. */
MBALAB.sims.define('tryout-mba', {
  mount(host) {
    const E = MBALAB.tryout, D = MBALAB.tryoutData, $ = s => host.querySelector(s), root = $('#to'), self = this;
    const KEY = 'mbalab-to-v1', CK = 'mbalab-to-cfg';
    const esc = MBALAB.util.esc;
    const sfx = MBALAB.util.sfx;
    const clone = o => JSON.parse(JSON.stringify(o));
    const LET = ['A', 'B', 'C', 'D'], MKS = D.mk.map(m => m.n), WKS = [1, 2, 3, 4, 5, 6], CELLS = [].concat(...MKS.map(m => WKS.map(w => m + '-' + w)));
    const mkOf = n => D.mk.find(m => m.n === n);
    const r1 = v => Math.round(v * 10) / 10;
    /* question language follows the interface language; id is the source text, en/ja/zh come from lang-*.js (falls back to the source) */
    const LG = () => { const l = MBALAB.i18n.get(), T = MBALAB.tryoutLang && MBALAB.tryoutLang[l]; return T || null; };
    const loc = q => { const T = LG(), r = T && T.q && T.q[q.i]; if (!r) return { text: q.text, opts: q.opts, exp: q.exp }; return { text: r[0], opts: q.ty === 0 && q.perm ? q.perm.map(j => r[1][j]) : q.opts, exp: r[2] }; };
    const tp = k => { const T = LG(); return (T && T.topics[k]) || D.topics[k]; };
    const mname = m => { const T = LG(); return (T && T.mk && T.mk[m - 1]) || mkOf(m).name; };

    /* ---------- storage ---------- */
    const load = k => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v && typeof v === 'object' ? v : null; } catch (e) { return null; } };
    const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
    let stats = load(KEY); if (!stats || !stats.cell || !Array.isArray(stats.seen) || !Array.isArray(stats.wrong) || !Array.isArray(stats.hist)) stats = E.fresh();
    const saved = load(CK) || {};
    const cfg = { cells: new Set((saved.cells || CELLS).filter(c => CELLS.indexOf(c) >= 0)), levels: new Set(saved.levels && saved.levels.length ? saved.levels : [0, 1, 2]), n: saved.n || 30, mode: saved.mode === 'practice' ? 'practice' : 'exam', sec: saved.sec || 60, essay: !!saved.essay, preferNew: saved.preferNew !== false };
    const saveCfg = () => store(CK, { cells: Array.from(cfg.cells), levels: Array.from(cfg.levels), n: cfg.n, mode: cfg.mode, sec: cfg.sec, essay: cfg.essay, preferNew: cfg.preferNew });

    let phase = 'setup', X = null, S = null, meta = null, base = null, filter = 'all', timer = null, paused = false, last = 0, autoSubmitted = false;
    const cellN = {}; D.q.forEach(q => { const k = q[0] + '-' + q[1]; cellN[k] = (cellN[k] || 0) + 1; });
    const fmtT = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
    const pctOf = v => Math.round(v * 100);

    /* ---------- setup ---------- */
    const mClass = k => { const m = E.mastery(stats, k); return m === null ? 'm0' : m < 0.5 ? 'm1' : m < 0.75 ? 'm2' : 'm3'; };
    const poolN = () => E.count(Array.from(cfg.cells), Array.from(cfg.levels), 0);
    const essN = () => cfg.essay ? E.count(Array.from(cfg.cells), Array.from(cfg.levels), 1) : 0;
    const dateS = at => new Date(at).toLocaleDateString(t('toLoc'), { day: 'numeric', month: 'short' });
    const modeL = m => t(m === 'exam' ? 'toModeExam' : 'toModePrac');

    function setup() {
      const avail = poolN(), ess = essN(), n = Math.min(cfg.n, avail + ess), mins = Math.round(n * cfg.sec / 60);
      const head = `<div class="to-wk"><span></span>${WKS.map(w => `<b>${esc(t('toWk', { n: w }))}</b>`).join('')}</div>`;
      const rows = MKS.map(m => {
        const all = WKS.every(w => cfg.cells.has(m + '-' + w));
        return `<div class="to-wk"><button type="button" class="to-mk${all ? ' on' : ''}" data-mk="${m}" title="${esc(mname(m))}">${esc(mkOf(m).s)}</button>${WKS.map(w => {
          const k = m + '-' + w, mv = E.mastery(stats, k);
          return `<button type="button" class="to-cell ${mClass(k)}${cfg.cells.has(k) ? ' on' : ''}" data-cell="${k}" aria-pressed="${cfg.cells.has(k)}" aria-label="${esc(mkOf(m).s + ' ' + t('toWk', { n: w }))}">${mv === null ? '·' : pctOf(mv) + '%'}</button>`;
        }).join('')}</div>`;
      }).join('');
      const chips = [10, 20, 30, 50, 100].map(c => `<button type="button" class="to-chip${cfg.n === c ? ' on' : ''}" data-n="${c}">${c}</button>`).join('');
      const lvs = [0, 1, 2].map(l => `<button type="button" class="to-chip lv${l}${cfg.levels.has(l) ? ' on' : ''}" data-lv="${l}" aria-pressed="${cfg.levels.has(l)}">${esc(t('toLv' + l))}</button>`).join('');
      const modes = ['exam', 'practice'].map(m => `<button type="button" class="to-mode${cfg.mode === m ? ' on' : ''}" data-mode="${m}" aria-pressed="${cfg.mode === m}"><b>${esc(modeL(m))}</b><small>${esc(t(m === 'exam' ? 'toModeExamD' : 'toModePracD'))}</small></button>`).join('');
      const pace = cfg.mode === 'exam' ? `<div class="to-row"><label for="toPace">${esc(t('toPace'))}</label><select id="toPace">${[45, 60, 90, 120].map(s => `<option value="${s}"${cfg.sec === s ? ' selected' : ''}>${esc(t('toSec', { n: s }))}</option>`).join('')}</select><span class="to-dim">${esc(t('toTotal', { m: mins }))}</span></div>` : '';
      const wrong = stats.wrong.length ? `<div class="to-box to-retry"><div><h3>${esc(t('toRetryT'))}</h3><p class="to-dim">${esc(t('toRetryD', { n: stats.wrong.length }))}</p></div><button type="button" id="toRetry">${esc(t('toRetryGo'))}</button></div>` : '';
      const hist = stats.hist.length ? `<ul class="to-hist">${stats.hist.slice(0, 6).map(h => `<li><span>${esc(t('toHistRow', { date: dateS(h.at), mode: modeL(h.mode), n: h.t }))}</span><b class="${h.p >= 75 ? 'g' : h.p >= 50 ? 'a' : 'r'}">${h.p === null ? '-' : h.p + '%'}</b></li>`).join('')}</ul><button type="button" class="to-link" id="toClear">${esc(t('toClear'))}</button>` : `<p class="to-dim">${esc(t('toNoHist'))}</p>`;
      $('#toSetup').innerHTML = `<h2>${esc(t('toSetupT'))}</h2><p class="to-sub">${esc(t('toSetupSub'))}</p>
        <div class="to-box"><div class="to-bh"><h3>${esc(t('toGridT'))}</h3><span class="to-bt"><button type="button" id="toAll">${esc(t('toAll'))}</button><button type="button" id="toNone">${esc(t('toNone'))}</button></span></div>
          <div class="to-grid" role="group" aria-label="${esc(t('toGridT'))}">${head}${rows}</div>
          <p class="to-cap" id="toCap" aria-live="polite">${esc(t('toCap0'))}</p>
          <div class="to-lg"><span><i class="m0"></i>${esc(t('toLg0'))}</span><span><i class="m1"></i>${esc(t('toLg1'))}</span><span><i class="m2"></i>${esc(t('toLg2'))}</span><span><i class="m3"></i>${esc(t('toLg3'))}</span></div>
          <details class="to-names"><summary>${esc(t('toCourses'))}</summary><ul>${D.mk.map(m => `<li><b>${esc(m.s)}</b> ${esc(mname(m.n))}</li>`).join('')}</ul></details></div>
        <div class="to-box"><div class="to-row"><label>${esc(t('toLevels'))}</label><span class="to-chips">${lvs}</span></div>
          <div class="to-row"><label>${esc(t('toCount'))}</label><span class="to-chips">${chips}</span></div>
          <p class="to-dim">${esc(t('toAvail', { n: avail + ess }))}</p>
          <div class="to-modes" role="group" aria-label="${esc(t('toMode'))}">${modes}</div>${pace}
          <label class="to-chk"><input type="checkbox" id="toEssay"${cfg.essay ? ' checked' : ''}><span>${esc(t('toEssay'))}<small>${esc(t('toEssayD'))}</small></span></label>
          <label class="to-chk"><input type="checkbox" id="toNew"${cfg.preferNew ? ' checked' : ''}><span>${esc(t('toNew'))}</span></label>
          <button type="button" class="to-main" id="toStart"${n < 1 || !cfg.cells.size ? ' disabled' : ''}>${esc(t('toStart'))} · ${n}</button>
          ${!cfg.cells.size || !cfg.levels.size ? `<p class="to-warn">${esc(t('toNeedSel'))}</p>` : ''}</div>
        ${wrong}<div class="to-box"><h3>${esc(t('toHistT'))}</h3>${hist}</div><p class="to-note">${esc(t('toNote'))}</p>`;
    }
    function keepFocus(sel) { const el = sel && $(sel); if (el) el.focus(); }
    function resetup(sel) { saveCfg(); setup(); keepFocus(sel); }
    function caption(k) {
      const el = $('#toCap'); if (!el || !k) return; const [m, w] = k.split('-').map(Number), mv = E.mastery(stats, k);
      el.textContent = t('toCap', { mk: mkOf(m).s, wk: w, topic: tp(k), n: cellN[k] || 0, acc: mv === null ? t('toNoAcc') : t('toAcc', { p: pctOf(mv) }) });
    }

    /* ---------- starting ---------- */
    function startExam(o) {
      const B = E.build({ cells: o.cells, levels: o.levels, n: o.n, essay: o.essay, essN: o.essN, preferNew: o.preferNew, seen: stats.seen, only: o.only || null, seed: 1 + Math.floor(Math.random() * 1e9) });
      if (!B.qs.length) return;
      const exam = o.mode === 'exam', total = exam ? B.qs.length * o.sec : 0;
      X = { qs: B.qs, ans: B.qs.map(() => null), flag: B.qs.map(() => false), grade: B.qs.map(() => null), lock: B.qs.map(() => false), shown: B.qs.map(() => false), i: 0, mode: o.mode, total, left: total };
      meta = { mode: o.mode }; base = clone(stats); S = null; filter = 'all'; autoSubmitted = false;
      phase = 'exam'; show('toExam'); renderExam(); $('#toScroll').scrollTop = 0; sfx('open');
      stopTimer(); if (exam) { last = Date.now(); paused = false; timer = setInterval(tick, 500); }
    }
    const fromCfg = () => ({ mode: cfg.mode, cells: Array.from(cfg.cells), levels: Array.from(cfg.levels), n: cfg.n, essay: cfg.essay, preferNew: cfg.preferNew, sec: cfg.sec });
    function show(id) { ['toSetup', 'toExam', 'toResult'].forEach(s => { $('#' + s).hidden = s !== id; }); }
    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function tick() {
      if (paused || phase !== 'exam') return;
      const now = Date.now(); X.left -= (now - last) / 1000; last = now;
      const el = $('#toTime'); if (el) { el.textContent = fmtT(X.left); el.parentNode.classList.toggle('low', X.left <= X.total * 0.1 || X.left <= 60); }
      if (X.left <= 0) { autoSubmitted = true; finish(); }
    }

    /* ---------- exam screen ---------- */
    function qState(p) { const q = X.qs[p]; if (q.ty === 1) return X.ans[p] && X.ans[p].trim() ? 'ans' : 'blank'; const a = X.ans[p]; if (a === null) return 'blank'; return X.mode === 'practice' ? (a === q.key ? 'ok' : 'no') : 'ans'; }
    function renderExam() {
      const q = X.qs[X.i], p = X.i, n = X.qs.length, exam = X.mode === 'exam', st = qState(p);
      const practiceDone = !exam && X.lock[p];
      const opts = q.ty === 0 ? `<div class="to-opts" role="radiogroup" aria-label="${esc(t('toQ', { i: p + 1, n }))}">${loc(q).opts.map((o, i) => {
        let c = 'to-opt'; if (X.ans[p] === i) c += ' sel'; if (practiceDone) { if (i === q.key) c += ' ok'; else if (X.ans[p] === i) c += ' no'; }
        return `<button type="button" class="${c}" role="radio" aria-checked="${X.ans[p] === i}" data-o="${i}"${practiceDone ? ' disabled' : ''}><span class="to-l">${LET[i]}</span><span>${esc(o)}</span></button>`;
      }).join('')}</div>` : `<textarea class="to-ta" id="toTa" rows="6" placeholder="${esc(t('toEssPh'))}"${practiceDone ? ' readonly' : ''}>${esc(X.ans[p] || '')}</textarea>`;
      let fb = '';
      if (!exam && q.ty === 0 && practiceDone) fb = `<div class="to-fb ${X.ans[p] === q.key ? 'ok' : 'no'}"><b>${esc(X.ans[p] === q.key ? t('toRight') : t('toWrong', { k: LET[q.key] }))}</b><p><u>${esc(t('toExp'))}</u> ${esc(loc(q).exp)}</p><small>${esc(t('toRef'))}: ${esc(q.ref)}</small></div>`;
      if (!exam && q.ty === 1) {
        if (!X.shown[p]) fb = `<button type="button" class="to-main" id="toShow">${esc(t('toShowModel'))}</button>`;
        else fb = `<div class="to-fb"><b>${esc(t('toModel'))}</b><p>${esc(loc(q).exp)}</p><small>${esc(t('toRef'))}: ${esc(q.ref)}</small>${selfGrade(p)}</div>`;
      }
      const nav = X.qs.map((qq, i) => `<button type="button" class="to-nb ${qState(i)}${X.flag[i] ? ' fl' : ''}${i === p ? ' cur' : ''}" data-go="${i}" aria-label="${esc(t('toNavQ', { i: i + 1, s: qState(i) }))}">${i + 1}</button>`).join('');
      const ans = X.qs.filter((_, i) => qState(i) !== 'blank').length;
      $('#toExam').innerHTML = `<div class="to-hud"><span class="to-chip">${esc(modeL(X.mode))}</span><span class="to-chip">${esc(t('toQ', { i: p + 1, n }))}</span>${exam ? `<span class="to-chip tm${X.left <= X.total * 0.1 || X.left <= 60 ? ' low' : ''}">⏱ <b id="toTime">${fmtT(X.left)}</b></span>` : ''}<button type="button" class="to-chip fin" id="toFin">${esc(t('toFinish'))}</button></div>
        <div class="to-two"><div class="to-card">
          <div class="to-meta"><span class="to-tag mk">${esc(mkOf(q.mk).s)}</span><span class="to-tag">${esc(t('toWk', { n: q.wk }))} · ${esc(tp(q.mk + '-' + q.wk))}</span><span class="to-tag lv${q.lvl}">${esc(t('toLv' + q.lvl))}</span>${q.ty === 1 ? `<span class="to-tag es">${esc(t('toEssTag'))}</span>` : ''}</div>
          <h2 class="to-q">${esc(loc(q).text)}</h2>${opts}${fb}
          <div class="to-act"><button type="button" id="toPrev"${p === 0 ? ' disabled' : ''}>${esc(t('toPrev'))}</button><button type="button" id="toFlag" class="${X.flag[p] ? 'on' : ''}" aria-pressed="${X.flag[p]}">${esc(t(X.flag[p] ? 'toFlagged' : 'toFlag'))}</button>${p < n - 1 ? `<button type="button" id="toNextQ" class="to-primary">${esc(t('toNext'))}</button>` : `<button type="button" id="toFin2" class="to-primary">${esc(t('toFinish'))}</button>`}</div>
          <p class="to-hint">${esc(t('toNote2'))}</p></div>
        <aside class="to-side"><div class="to-box"><h3>${esc(t('toNav'))} · ${ans}/${n}</h3><div class="to-navg">${nav}</div>
          <div class="to-lg"><span><i class="ans"></i>${esc(t('toNavAns'))}</span><span><i class="fl"></i>${esc(t('toNavFlag'))}</span><span><i class="blank"></i>${esc(t('toNavBlank'))}</span></div></div></aside></div>`;
      $('#toSr').textContent = t('toSr', { i: p + 1, n });
    }
    function selfGrade(p) {
      const g = X.grade[p];
      return `<div class="to-self"><span>${esc(t('toSelf'))}</span>${[[1, 'toS2'], [0.5, 'toS1'], [0, 'toS0']].map(([v, k]) => `<button type="button" class="to-g${g === v ? ' on' : ''}" data-g="${v}" data-p="${p}">${esc(t(k))}</button>`).join('')}</div>`;
    }
    function go(i) { X.i = Math.max(0, Math.min(X.qs.length - 1, i)); renderExam(); $('#toScroll').scrollTop = 0; }
    function choose(i) {
      const p = X.i, q = X.qs[p]; if (q.ty !== 0 || X.lock[p]) return;
      X.ans[p] = i; if (X.mode === 'practice') { X.lock[p] = true; sfx(i === q.key ? 'win' : 'lose'); } else sfx('tick');
      renderExam();
    }

    /* ---------- finishing ---------- */
    function confirmFinish() {
      const n = X.qs.length, a = X.qs.filter((_, i) => qState(i) !== 'blank').length, f = X.flag.filter(Boolean).length;
      $('#toModal').innerHTML = `<div class="to-dlg" role="dialog" aria-modal="true" aria-labelledby="toDt"><h3 id="toDt">${esc(t('toConfT'))}</h3><p>${esc(t('toConfB', { a, n, u: n - a, f }))}</p><div class="to-act"><button type="button" id="toKeep">${esc(t('toKeep'))}</button><button type="button" class="to-primary" id="toSubmit">${esc(t('toSubmit'))}</button></div></div>`;
      $('#toModal').hidden = false; keepFocus('#toKeep');
    }
    /* cloud sync (only when signed in; guests are unaffected). Local storage stays the source on this device. */
    const SIM = 'tryout-mba', cloud = () => MBALAB.account && MBALAB.account.user();
    const cloudPush = () => { if (cloud()) MBALAB.account.push(SIM, stats); };
    const cloudAttempts = list => { if (cloud()) MBALAB.account.attempt(SIM, list.map(h => ({ at: h.at, score: h.p, variant: '', ranked: h.t >= 20, detail: h }))); };
    async function cloudSync() {
      if (!cloud()) return;
      try {
        const remote = await MBALAB.account.pull(SIM);
        stats = E.merge(stats, remote && remote.cell ? remote : null); store(KEY, stats);
        cloudPush(); cloudAttempts(stats.hist);
        if (phase === 'setup') setup();
      } catch (e) { }
    }
    MBALAB.on('auth', u => { if (u) cloudSync(); });
    function commit() { stats = E.record(clone(base), X, S, meta); store(KEY, stats); cloudPush(); cloudAttempts(stats.hist.slice(0, 1)); }
    function finish() {
      stopTimer(); $('#toModal').hidden = true; S = E.score(X); commit(); phase = 'result'; show('toResult'); renderResult(); $('#toScroll').scrollTop = 0; sfx('win');
    }

    /* ---------- result ---------- */
    const bar = (label, c, tt) => { const p = tt ? c / tt : 0; return `<div class="to-b"><span>${esc(label)}</span><div class="to-bar"><i class="${p >= 0.75 ? 'g' : p >= 0.5 ? 'a' : 'r'}" style="width:${Math.round(p * 100)}%"></i></div><b>${r1(c)}/${tt}</b></div>`; };
    function reviewItem(p) {
      const q = X.qs[p], st = q.ty === 1 ? 'ess' : X.ans[p] === null ? 'blank' : X.ans[p] === q.key ? 'ok' : 'no';
      let body;
      if (q.ty === 0) body = `<ul class="to-ro">${loc(q).opts.map((o, i) => `<li class="${i === q.key ? 'ok' : X.ans[p] === i ? 'no' : ''}"><span class="to-l">${LET[i]}</span><span>${esc(o)}</span>${i === q.key ? `<em>${esc(t('toCorr'))}</em>` : X.ans[p] === i ? `<em>${esc(t('toYour'))}</em>` : ''}</li>`).join('')}</ul>${X.ans[p] === null ? `<p class="to-dim">${esc(t('toNoAns'))}</p>` : ''}`;
      else body = `<div class="to-fb"><b>${esc(t('toYour'))}</b><p>${X.ans[p] && X.ans[p].trim() ? esc(X.ans[p]) : `<span class="to-dim">${esc(t('toNoAns'))}</span>`}</p><b>${esc(t('toModel'))}</b><p>${esc(loc(q).exp)}</p>${selfGrade(p)}</div>`;
      return `<article class="to-rv ${st}${X.flag[p] ? ' fl' : ''}"><header><b>${p + 1}</b><span class="to-tag mk">${esc(mkOf(q.mk).s)}</span><span class="to-tag">${esc(t('toWk', { n: q.wk }))}</span><span class="to-tag lv${q.lvl}">${esc(t('toLv' + q.lvl))}</span>${q.ty === 1 ? `<span class="to-tag es">${esc(t('toEssTag'))}</span>` : ''}${X.flag[p] ? '<span class="to-tag">⚑</span>' : ''}</header>
        <p class="to-rq">${esc(loc(q).text)}</p>${body}${q.ty === 0 ? `<div class="to-fb"><p><u>${esc(t('toExp'))}</u> ${esc(loc(q).exp)}</p><small>${esc(t('toRef'))}: ${esc(q.ref)}</small></div>` : `<small class="to-dim">${esc(t('toRef'))}: ${esc(q.ref)}</small>`}</article>`;
    }
    function renderResult() {
      S = E.score(X);
      const idx = X.qs.map((_, p) => p), isW = p => X.qs[p].ty === 0 && X.ans[p] !== null && X.ans[p] !== X.qs[p].key, isB = p => X.qs[p].ty === 0 && X.ans[p] === null;
      const F = { all: idx, wrong: idx.filter(isW), flag: idx.filter(p => X.flag[p]), blank: idx.filter(isB), ess: idx.filter(p => X.qs[p].ty === 1) };
      const pct = S.pct === null ? 0 : S.pct, grade = pct >= 85 ? 3 : pct >= 70 ? 2 : pct >= 55 ? 1 : 0;
      const weak = E.weakCells(S, 3), used = X.total - Math.max(0, X.left);
      const missed = S.wrong.length + X.qs.filter((q, p) => q.ty === 1 && X.grade[p] !== 1).length;
      const ess = S.ess.e ? `<p>${esc(S.ess.g ? t('toEssSc', { g: S.ess.g, e: S.ess.e, p: Math.round(S.ess.pts / S.ess.g * 100) }) : '')}${S.ess.g < S.ess.e ? ` <span class="to-dim">${esc(t('toEssTodo'))}</span>` : ''}</p>` : '';
      const chips = [['all', 'toFAll'], ['wrong', 'toFWrong'], ['blank', 'toFBlank'], ['flag', 'toFFlag'], ['ess', 'toFEss']].filter(([k]) => k === 'all' || F[k].length).map(([k, l]) => `<button type="button" class="to-chip${filter === k ? ' on' : ''}" data-f="${k}">${esc(t(l))} · ${F[k].length}</button>`).join('');
      const list = F[filter] || F.all;
      $('#toResult').innerHTML = `${autoSubmitted ? `<p class="to-warn">${esc(t('toTimeUp'))}</p>` : ''}<div class="to-box to-hero"><div class="to-ring ${pct >= 75 ? 'g' : pct >= 50 ? 'a' : 'r'}" style="--p:${pct}"><b>${S.pct === null ? '-' : pct + '%'}</b></div>
          <div><h2>${esc(t('toResT'))}</h2><p class="to-gr">${esc(t('toG' + grade))}</p><p>${esc(t('toRaw', { c: S.mcq.c, t: S.mcq.t, a: S.mcq.a }))}</p>${ess}${X.mode === 'exam' ? `<p class="to-dim">${esc(t('toTimeUsed', { m: Math.floor(used / 60), s: String(Math.round(used % 60)).padStart(2, '0') }))}</p>` : ''}</div></div>
        <div class="to-two eq"><div class="to-box"><h3>${esc(t('toByCourse'))}</h3>${MKS.filter(m => S.byMk[m]).map(m => bar(mkOf(m).s, S.byMk[m].c, S.byMk[m].t)).join('')}<h3 class="to-h2">${esc(t('toByLevel'))}</h3>${[0, 1, 2].filter(l => S.byLv[l].t).map(l => bar(t('toLv' + l), S.byLv[l].c, S.byLv[l].t)).join('')}</div>
          <div class="to-box"><h3>${esc(t('toWeak'))}</h3>${weak.length ? `<ul class="to-weak">${weak.map(w => { const [m, k] = w.cell.split('-').map(Number); return `<li><b>${esc(mkOf(m).s)} · ${esc(t('toWk', { n: k }))}</b><span>${esc(tp(w.cell))}</span><em class="${w.acc < 0.5 ? 'r' : 'a'}">${Math.round(w.acc * 100)}%</em></li>`; }).join('')}</ul>` : `<p class="to-dim">${esc(t('toNoWeak'))}</p>`}
            <div class="to-end">${missed ? `<button type="button" class="to-main" id="toRetryNow">${esc(t('toRetryWrong'))} · ${missed}</button>` : ''}<button type="button" id="toAgain">${esc(t('toAgain'))}</button><button type="button" id="toBackSet">${esc(t('toNewSet'))}</button></div></div></div>
        <div class="to-box"><h3>${esc(t('toReview'))}</h3><div class="to-chips">${chips}</div><div class="to-rvs">${list.length ? list.map(reviewItem).join('') : `<p class="to-dim">${esc(t('toEmpty'))}</p>`}</div></div>`;
    }
    function keepScroll(fn) { const s = $('#toScroll'), y = s.scrollTop; fn(); s.scrollTop = y; }

    /* ---------- events ---------- */
    function toSetup() { stopTimer(); phase = 'setup'; X = null; show('toSetup'); setup(); $('#toScroll').scrollTop = 0; }
    root.addEventListener('click', e => {
      const x = e.target, b = x.closest('button'); if (!b) return;
      if (phase === 'setup') {
        if (b.dataset.cell) { const k = b.dataset.cell; cfg.cells.has(k) ? cfg.cells.delete(k) : cfg.cells.add(k); return resetup('[data-cell="' + k + '"]'); }
        if (b.dataset.mk) { const m = +b.dataset.mk, all = WKS.every(w => cfg.cells.has(m + '-' + w)); WKS.forEach(w => all ? cfg.cells.delete(m + '-' + w) : cfg.cells.add(m + '-' + w)); return resetup('[data-mk="' + m + '"]'); }
        if (b.id === 'toAll') { CELLS.forEach(c => cfg.cells.add(c)); return resetup('#toAll'); }
        if (b.id === 'toNone') { cfg.cells.clear(); return resetup('#toNone'); }
        if (b.dataset.lv !== undefined) { const l = +b.dataset.lv; cfg.levels.has(l) ? cfg.levels.delete(l) : cfg.levels.add(l); return resetup('[data-lv="' + l + '"]'); }
        if (b.dataset.n) { cfg.n = +b.dataset.n; return resetup('[data-n="' + cfg.n + '"]'); }
        if (b.dataset.mode) { cfg.mode = b.dataset.mode; return resetup('[data-mode="' + cfg.mode + '"]'); }
        if (b.id === 'toStart') return startExam(fromCfg());
        if (b.id === 'toRetry') return startExam({ mode: 'practice', cells: CELLS, levels: [0, 1, 2], n: Math.min(stats.wrong.length, 50), essN: 50, only: stats.wrong, preferNew: false, sec: 60 });
        if (b.id === 'toClear') { if (confirm(t('toClearAsk'))) { stats = E.fresh(); store(KEY, stats); cloudPush(); setup(); } return; }
      } else if (phase === 'exam') {
        if (b.dataset.o !== undefined) return choose(+b.dataset.o);
        if (b.dataset.go !== undefined) return go(+b.dataset.go);
        if (b.id === 'toPrev') return go(X.i - 1);
        if (b.id === 'toNextQ') return go(X.i + 1);
        if (b.id === 'toFlag') { X.flag[X.i] = !X.flag[X.i]; return renderExam(); }
        if (b.id === 'toShow') { X.shown[X.i] = true; return renderExam(); }
        if (b.dataset.g !== undefined) { X.grade[+b.dataset.p] = +b.dataset.g; return renderExam(); }
        if (b.id === 'toFin' || b.id === 'toFin2') return confirmFinish();
        if (b.id === 'toKeep') { $('#toModal').hidden = true; return; }
        if (b.id === 'toSubmit') return finish();
      } else if (phase === 'result') {
        if (b.dataset.f) { filter = b.dataset.f; return keepScroll(renderResult); }
        if (b.dataset.g !== undefined) { X.grade[+b.dataset.p] = +b.dataset.g; S = E.score(X); commit(); return keepScroll(renderResult); }
        if (b.id === 'toAgain') return startExam(fromCfg());
        if (b.id === 'toBackSet') return toSetup();
        if (b.id === 'toRetryNow') {
          const only = X.qs.map((q, p) => (q.ty === 0 ? X.ans[p] !== q.key : X.grade[p] !== 1) ? q.i : -1).filter(i => i >= 0);
          return startExam({ mode: 'practice', cells: CELLS, levels: [0, 1, 2], n: only.length, essN: only.length, only, preferNew: false, sec: 60 });
        }
      }
    });
    root.addEventListener('input', e => { if (e.target.id === 'toTa' && X) X.ans[X.i] = e.target.value; });
    root.addEventListener('change', e => {
      const id = e.target.id;
      if (id === 'toEssay') { cfg.essay = e.target.checked; resetup('#toEssay'); }
      if (id === 'toNew') { cfg.preferNew = e.target.checked; saveCfg(); }
      if (id === 'toPace') { cfg.sec = +e.target.value; resetup('#toPace'); }
    });
    const cap = e => { const c = e.target.closest && e.target.closest('.to-cell'); if (c) caption(c.dataset.cell); };
    root.addEventListener('mouseover', cap); root.addEventListener('focusin', cap);
    root.addEventListener('click', e => { const c = e.target.closest && e.target.closest('.to-cell'); if (c) caption(c.dataset.cell); });
    const onKey = e => {
      if (phase !== 'exam' || !X || root.offsetParent === null || !$('#toModal').hidden) return;
      const tg = e.target, typing = tg && (tg.tagName === 'TEXTAREA' || tg.tagName === 'INPUT' || tg.tagName === 'SELECT'); if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toLowerCase(), q = X.qs[X.i];
      if (['a', 'b', 'c', 'd'].indexOf(k) >= 0 && q.ty === 0) { e.preventDefault(); choose(k.charCodeAt(0) - 97); }
      else if (['1', '2', '3', '4'].indexOf(k) >= 0 && q.ty === 0) { e.preventDefault(); choose(+k - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(X.i + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(X.i - 1); }
      else if (k === 'f') { X.flag[X.i] = !X.flag[X.i]; renderExam(); }
    };
    document.addEventListener('keydown', onKey);

    /* the clock stops while you are away from this page */
    self.pause = () => { if (timer && !paused) { tick(); paused = true; } };
    self.resume = () => { if (paused) { last = Date.now(); paused = false; } };
    self.refresh = () => { if (phase === 'setup') setup(); else if (phase === 'exam') renderExam(); else if (phase === 'result') keepScroll(renderResult); };
    show('toSetup'); setup(); cloudSync();
  },
  onShow() { if (this.resume) this.resume(); },
  onHide() { if (this.pause) this.pause(); },
  onLang() { if (this.refresh) this.refresh(); },
  onTheme() { }
});
