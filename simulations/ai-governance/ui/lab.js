/* AI Governance Lab: two free sandboxes. MBALAB.govLab(root) -> { show, relabel }.
   Fairness: one scoring model, two groups, three ideas of "fair" that cannot all hold at once. Drift: a model slowly loses accuracy as the world changes, and retraining restores it. */
(function () {
  function create(root) {
    const E = MBALAB.gov, T = (k, p) => t(k, p), $ = s => root.querySelector(s);
    let tab = 'fair', F = { t: 50, mode: 'one' }, D = { speed: 8, every: 6 };
    const inv = p => { let lo = -5, hi = 5; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (E.cdf(m) < p) lo = m; else hi = m; } return (lo + hi) / 2; };
    const pc = x => Math.round(x * 100) + '%';
    function fairSvg() {
      const f = E.fairness(F.t / 100, F.mode), G = E.FAIR, X = v => 24 + v * 552, rows = [], out = [];
      [['A', 60, f.tA, 46], ['B', 40, f.tB, 168]].forEach(([g, n, th, y0]) => {
        const ng = Math.round(n * G.good[g]), nb = n - ng, pts = [];
        for (let i = 0; i < ng; i++) pts.push({ s: G.mu1 + G.sd * inv((i + .5) / ng), good: 1 }); for (let i = 0; i < nb; i++) pts.push({ s: G.mu0 + G.sd * inv((i + .5) / nb), good: 0 });
        pts.sort((a, b) => a.s - b.s); pts.forEach((p, i) => { const x = X(Math.min(.98, Math.max(.02, p.s))), y = y0 + 12 + (i % 5) * 11; out.push(`<circle cx="${x.toFixed(1)}" cy="${y}" r="4.6" class="${p.good ? 'gd' : 'bd'} ${p.s >= th ? 'ap' : 'na'}"/>`); });
        out.push(`<text x="8" y="${y0 - 6}" class="gt">${T('lfGroup', { g })}</text><line x1="${X(th)}" x2="${X(th)}" y1="${y0}" y2="${y0 + 78}" class="gline"/>`);
      });
      return { f, svg: `<svg viewBox="0 0 600 260" role="img" aria-label="${T('lfT')}">${out.join('')}</svg>` };
    }
    function fairUpd() {
      const s = fairSvg(), f = s.f; $('#glSvg').innerHTML = s.svg; $('#glCut').textContent = (F.t / 100).toFixed(2);
      const row = (k, a, b, gap) => `<div class="gl-mr"><span>${T(k)}</span><b>${pc(a)}</b><b>${pc(b)}</b><em class="${gap > .04 ? 'bad' : 'ok'}">${gap > .04 ? '≠' : '='}</em></div>`;
      $('#glMet').innerHTML = `<div class="gl-mr head"><span></span><b>A</b><b>B</b><em></em></div>${row('lfAppr', f.a.appr, f.b.appr, f.gapAppr)}${row('lfTpr', f.a.tpr, f.b.tpr, f.gapTpr)}<p class="gl-note">${T('lfAcc')}: <b>${pc(f.acc)}</b></p>`;
      $('#glVer').innerHTML = T('lfV_' + F.mode); root.querySelectorAll('[data-fm]').forEach(b => b.classList.toggle('on', b.dataset.fm === F.mode));
    }
    function driftUpd() {
      const sp = D.speed / 1000, d = E.drift(sp, D.every, 24), X = m => 40 + m / 24 * 530, Y = a => 190 - (a - .5) / .5 * 170;
      let path = ''; d.acc.forEach((a, m) => { path += (m ? 'L' : 'M') + X(m).toFixed(1) + ' ' + Y(a).toFixed(1); });
      const marks = []; for (let m = 1; m <= 24; m++) if (D.every && m % D.every === 0) marks.push(`<circle cx="${X(m)}" cy="${Y(d.acc[m])}" r="5" class="gre"/>`);
      $('#glSvg').innerHTML = `<svg viewBox="0 0 600 220" role="img" aria-label="${T('ldAxis')}"><line x1="40" x2="570" y1="${Y(.9)}" y2="${Y(.9)}" class="gref"/><text x="6" y="${Y(.9) + 4}" class="gtx">90%</text><text x="6" y="${Y(.5) + 4}" class="gtx">50%</text><path d="${path}" class="gcurve"/>${marks.join('')}<text x="300" y="214" text-anchor="middle" class="gtx">${T('ldAxis')}</text></svg>`;
      $('#glSp').textContent = (D.speed / 10).toFixed(1) + '% / ' + T('lMonth'); root.querySelectorAll('[data-ev]').forEach(b => b.classList.toggle('on', +b.dataset.ev === D.every));
      $('#glMet').innerHTML = `<div class="gl-mr two"><span>${T('ldAvg')}</span><b class="${d.avg >= .88 ? 'gn' : d.avg >= .78 ? 'am' : 'rd'}">${pc(d.avg)}</b></div><div class="gl-mr two"><span>${T('ldRe')}</span><b>${d.retrains}</b></div>`;
    }
    function build() {
      root.innerHTML = `<div class="sx-wrap"><p class="sx-sub">${T('labSub')}</p>
        <div class="gl-pre" role="tablist"><button type="button" data-lt="fair" class="${tab === 'fair' ? 'on' : ''}">⚖️ ${T('lbFair')}</button><button type="button" data-lt="drift" class="${tab === 'drift' ? 'on' : ''}">📉 ${T('lbDrift')}</button></div>
        ${tab === 'fair' ? `<section class="sx-card"><h3 class="sx-h">${T('lfT')}</h3><p class="sx-hint">${T('lfSub')}</p>
          <div class="gl-main"><div><div class="sx-f"><label for="glT">${T('lfCut')}<output id="glCut"></output></label><input type="range" id="glT" min="30" max="75" step="1" value="${F.t}"></div>
          <div class="gl-pre vert">${['one', 'parity', 'opp'].map(m => `<button type="button" data-fm="${m}">${T('lfM_' + m)}</button>`).join('')}</div></div>
          <div class="gl-vis" id="glSvg"></div></div><div class="gl-met" id="glMet"></div><p class="gl-ver" id="glVer"></p></section>
          <section class="sx-card"><ul class="sx-learn"><li>${T('lfL1')}</li><li>${T('lfL2')}</li><li>${T('lfL3')}</li></ul></section>`
        : `<section class="sx-card"><h3 class="sx-h">${T('ldT')}</h3><p class="sx-hint">${T('ldSub')}</p>
          <div class="gl-main"><div><div class="sx-f"><label for="glS">${T('ldSpeed')}<output id="glSp"></output></label><input type="range" id="glS" min="4" max="25" step="1" value="${D.speed}"></div>
          <div class="sx-f"><label>${T('ldEvery')}</label></div><div class="gl-pre">${[0, 3, 6, 12].map(v => `<button type="button" data-ev="${v}">${v ? T('ldMonths', { n: v }) : T('ldNever')}</button>`).join('')}</div></div>
          <div class="gl-vis" id="glSvg"></div></div><div class="gl-met" id="glMet"></div></section>
          <section class="sx-card"><ul class="sx-learn"><li>${T('ldL1')}</li><li>${T('ldL2')}</li></ul></section>`}</div>`;
      tab === 'fair' ? fairUpd() : driftUpd();
    }
    root.addEventListener('input', e => { if (e.target.id === 'glT') { F.t = +e.target.value; fairUpd(); } else if (e.target.id === 'glS') { D.speed = +e.target.value; driftUpd(); } });
    root.addEventListener('click', e => {
      const lt = e.target.closest('[data-lt]'); if (lt) { tab = lt.dataset.lt; MBALAB.util.sfx('tick'); build(); return; }
      const fm = e.target.closest('[data-fm]'); if (fm) { F.mode = fm.dataset.fm; MBALAB.util.sfx('tick'); fairUpd(); return; }
      const ev = e.target.closest('[data-ev]'); if (ev) { D.every = +ev.dataset.ev; MBALAB.util.sfx('tick'); driftUpd(); }
    });
    return { show() { if (!$('.sx-wrap')) build(); }, relabel() { if ($('.sx-wrap')) build(); } };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.govLab = create;
})();
