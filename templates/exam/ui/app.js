/* Exam template logic. Pattern: setup (mode) -> exam (one question at a time, navigator, flag, timer) -> confirm modal -> result (score, per-topic bars, review).
   Replace QUESTIONS (topic index + index of the correct option) and the strings with your own. */
MBALAB.sims.define('my-simulation', {
  mount(host) {
    const $ = s => host.querySelector(s), T = (k, p) => t(k, p), sfx = MBALAB.util.sfx;
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const QUESTIONS = [{ topic: 1, ans: 0 }, { topic: 1, ans: 0 }, { topic: 1, ans: 0 }, { topic: 2, ans: 0 }, { topic: 2, ans: 0 }, { topic: 1, ans: 0 }];
    const N = QUESTIONS.length;
    /* options are shuffled once per run, so the right answer is not always A */
    let X = null, timer = 0, mode = 'practice';
    const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

    /* ---------- setup ---------- */
    function setup() {
      clearInterval(timer); X = null; $('#xqSetup').hidden = false; $('#xqExam').hidden = true; $('#xqResult').hidden = true;
      $('#xqSetup').innerHTML = `<h2>${T('setupT')}</h2><p class="xm-sub">${T('setupSub')}</p>
        <div class="xm-box"><h3>${T('mode')}</h3><div class="xm-modes">${['practice', 'exam'].map(m => `<button type="button" class="xm-mode ${mode === m ? 'on' : ''}" data-mode="${m}"><b>${T(m)}</b><small>${T(m + 'D')}</small></button>`).join('')}</div></div>
        <button type="button" class="xm-main" id="xqStart">${T('start')} · ${N}</button>`;
    }
    function start() {
      const order = QUESTIONS.map((q, i) => ({ i, o: [0, 1, 2, 3].sort(() => Math.random() - .5) }));
      X = { order, p: 0, pick: {}, flag: {}, t0: Date.now(), sec: 0, mode };
      $('#xqSetup').hidden = true; $('#xqResult').hidden = true; $('#xqExam').hidden = false;
      clearInterval(timer); timer = setInterval(() => { X.sec = Math.round((Date.now() - X.t0) / 1000); const c = $('#xqTime'); if (c) c.textContent = T('time', { t: fmt(X.sec) }); }, 1000);
      question(); sfx('open');
    }

    /* ---------- exam: hud, question card, navigator ---------- */
    function question() {
      const o = X.order[X.p], q = QUESTIONS[o.i], pick = X.pick[X.p], show = X.mode === 'practice' && pick != null;
      $('#xqExam').innerHTML = `<div class="xm-hud"><span class="xm-chip">${T('qN', { n: X.p + 1, m: N })}</span><span class="xm-chip tm" id="xqTime">${T('time', { t: fmt(X.sec) })}</span><button type="button" class="xm-main" id="xqSubmit">${T('submit')}</button></div>
        <div class="xm-two"><div class="xm-card"><div class="xm-meta"><span class="xm-tag mk">${T('topic' + q.topic)}</span></div><div class="xm-q">${T('q' + o.i)}</div>
          <div class="xm-opts">${o.o.map((k, pos) => `<button type="button" class="xm-opt ${pick === pos ? 'sel' : ''} ${show ? (k === q.ans ? 'ok' : pick === pos ? 'no' : '') : ''}" data-pos="${pos}" ${show ? 'disabled' : ''}><span class="xm-l">${'ABCD'[pos]}</span><span>${T('q' + o.i + 'abcd'[k])}</span></button>`).join('')}</div>
          ${show ? `<div class="xm-fb ${o.o[pick] === q.ans ? 'ok' : 'no'}"><b>${o.o[pick] === q.ans ? T('right') : T('wrong')}</b><p>${T('q' + o.i + 'e')}</p></div>` : ''}
          <div class="xm-act"><button type="button" id="xqPrev" ${X.p === 0 ? 'disabled' : ''}>${T('prev')}</button><button type="button" id="xqFlag" class="${X.flag[X.p] ? 'on' : ''}">${T('flag')}</button><button type="button" id="xqNextQ" ${X.p === N - 1 ? 'disabled' : ''}>${T('nextQ')}</button></div></div>
        <aside class="xm-side xm-box"><h3>${T('nav')}</h3><div class="xm-navg">${X.order.map((_, i) => `<button type="button" class="xm-nb ${X.pick[i] != null ? 'ans' : ''} ${X.flag[i] ? 'fl' : ''} ${i === X.p ? 'cur' : ''}" data-nav="${i}">${i + 1}</button>`).join('')}</div></aside></div>`;
      $('#xqSr').textContent = T('qN', { n: X.p + 1, m: N });
    }
    function confirm() {
      const a = Object.keys(X.pick).length;
      $('#xqModal').hidden = false; $('#xqModal').innerHTML = `<div class="xm-dlg" role="dialog" aria-modal="true" aria-labelledby="xqDt"><h3 id="xqDt">${T('confT')}</h3><p>${T('confB', { a, n: N, u: N - a })}</p><div class="xm-act"><button type="button" id="xqKeep">${T('keep')}</button><button type="button" class="xm-main" id="xqFin">${T('submit')}</button></div></div>`;
    }

    /* ---------- result ---------- */
    function finish() {
      clearInterval(timer); $('#xqModal').hidden = true; $('#xqExam').hidden = true; $('#xqResult').hidden = false;
      const right = X.order.map((o, i) => X.pick[i] != null && o.o[X.pick[i]] === QUESTIONS[o.i].ans), c = right.filter(Boolean).length, pct = Math.round(c / N * 100), grade = pct >= 80 ? 2 : pct >= 50 ? 1 : 0, cls = ['r', 'a', 'g'][grade];
      const topics = [1, 2].map(tp => { const idx = X.order.map((o, i) => QUESTIONS[o.i].topic === tp ? i : -1).filter(i => i >= 0), k = idx.filter(i => right[i]).length, p = idx.length ? Math.round(k / idx.length * 100) : 0; return { tp, p }; });
      $('#xqResult').innerHTML = `<div class="xm-box xm-hero"><div class="xm-ring ${cls}" style="--p:${pct}"><b>${pct}%</b></div><div><h2>${T('resT')}</h2><p class="xm-gr">${T('g' + grade)}</p><p>${T('raw', { c, t: N })}</p></div></div>
        <div class="xm-box"><h3>${T('byTopic')}</h3>${topics.map(x => `<div class="xm-b"><span>${T('topic' + x.tp)}</span><div class="xm-bar"><i class="${x.p >= 80 ? 'g' : x.p >= 50 ? 'a' : ''}" style="width:${x.p}%"></i></div><b>${x.p}%</b></div>`).join('')}</div>
        <div class="xm-box"><h3>${T('review')}</h3><div class="xm-rvs">${X.order.map((o, i) => `<article class="xm-rv ${X.pick[i] == null ? 'blank' : right[i] ? 'ok' : 'no'}"><header><span class="xm-tag mk">${T('topic' + QUESTIONS[o.i].topic)}</span></header><p class="xm-rq">${i + 1}. ${T('q' + o.i)}</p><p>${T('yourAns')}: ${X.pick[i] == null ? T('blank') : T('q' + o.i + 'abcd'[o.o[X.pick[i]]])}</p><p class="xm-hint">${T('q' + o.i + 'e')}</p></article>`).join('')}</div></div>
        <div class="xm-end"><button type="button" class="xm-main" id="xqAgain">${T('again')}</button></div>`;
      sfx(grade ? 'win' : 'lose'); $('#xqScroll').scrollTop = 0;
    }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const m = e.target.closest('[data-mode]'); if (m) { mode = m.dataset.mode; setup(); return; }
      const id = e.target.id;
      if (id === 'xqStart') start(); else if (id === 'xqAgain') setup(); else if (id === 'xqSubmit') confirm(); else if (id === 'xqKeep') $('#xqModal').hidden = true; else if (id === 'xqFin') finish();
      else if (id === 'xqPrev') { X.p--; question(); } else if (id === 'xqNextQ') { X.p++; question(); } else if (id === 'xqFlag') { X.flag[X.p] = !X.flag[X.p]; question(); }
      const n = e.target.closest('[data-nav]'); if (n) { X.p = +n.dataset.nav; question(); }
      const o = e.target.closest('[data-pos]'); if (o && X && !(X.mode === 'practice' && X.pick[X.p] != null)) { X.pick[X.p] = +o.dataset.pos; sfx('tick'); question(); }
    });
    setup();
    this._xq = { relabel() { if (!X) setup(); else if (!$('#xqResult').hidden) finish(); else question(); } };
  },
  onHide() { /* the timer keeps the elapsed time from the start timestamp, so nothing to pause */ },
  onLang() { const m = this._xq; if (m) m.relabel(); }
});
