/* A/B Testing Lab: free sandbox. MBALAB.abLab(root) -> { show, relabel }. Set the real effect and the sample size, run many experiments and see how often a test says "significant":
   with a real lift that is power, with no lift it is the false alarm rate, and with daily peeking it grows. */
(function () {
  const NS = [200, 500, 1000, 2000, 5000, 10000, 20000, 50000], LOOKS = 14;
  function create(root) {
    const E = MBALAB.ab, T = (k, p) => t(k, p), $ = s => root.querySelector(s);
    let S = { p0: 10, lift: 10, ni: 3, peek: false }, res = null, seed = 1;
    const n = () => NS[S.ni], p1 = () => S.p0 / 100 * (1 + S.lift / 100);
    function bells() {
      const p0 = S.p0 / 100, p = p1(), N = n(), se = Math.sqrt(p0 * (1 - p0) / N + p * (1 - p) / N), eff = (p - p0) / se, zmin = -3.6, zmax = Math.max(6, eff + 3.6), X = z => 20 + (z - zmin) / (zmax - zmin) * 560, Y = (z, m) => 150 - E.pdf(z - m) / .3989 * 120;
      const path = (m, a, b) => { let d = ''; for (let z = a; z <= b + 1e-9; z += .08) d += (d ? 'L' : 'M') + X(z).toFixed(1) + ' ' + Y(z, m).toFixed(1); return d; };
      const area = (m, a, b) => path(m, a, b) + `L${X(b).toFixed(1)} 150L${X(a).toFixed(1)} 150Z`;
      const zc = E.Z, pw = E.power(p0, S.lift / 100, N);
      return { svg: `<svg viewBox="0 0 600 180" role="img" aria-label="${T('bH0')} / ${T('bH1')}"><path d="${area(0, zmin, zmax)}" class="b0"/><path d="${area(eff, zmin, zmax)}" class="b1"/><path d="${area(eff, zc, zmax)}" class="bp"/><path d="${area(0, zc, zmax)}" class="ba"/><path d="${area(0, zmin, -zc)}" class="ba"/><path d="${path(0, zmin, zmax)}" class="l0"/><path d="${path(eff, zmin, zmax)}" class="l1"/><line x1="${X(zc)}" x2="${X(zc)}" y1="14" y2="156" class="cr"/><text x="${X(zc) + 6}" y="26" class="tx">${T('bCrit')}</text><text x="${X(0)}" y="172" class="t0" text-anchor="middle">${T('bH0')}</text>${Math.abs(eff) > 2 ? `<text x="${X(eff)}" y="172" class="t1" text-anchor="middle">${T('bH1')}</text>` : ''}</svg>`, pw };
    }
    function run() {
      seed = (Date.now() ^ 0x5bd1e995) >>> 0; const r = E.rng(seed), p0 = S.p0 / 100, p = p1(), N = n(), out = [];
      for (let i = 0; i < 200; i++) {
        let nA = 0, cA = 0, nB = 0, cB = 0, hit = null;
        if (!S.peek) { nA = nB = N; cA = E.binom(N, p0, r); cB = E.binom(N, p, r); const s = E.stats(nA, cA, nB, cB); if (s.sig) hit = s.diff > 0 ? 1 : -1; }
        else { const step = Math.max(1, Math.round(N / LOOKS)); for (let k = 0; k < LOOKS; k++) { nA += step; nB += step; cA += E.binom(step, p0, r); cB += E.binom(step, p, r); if (k >= 1 && !hit) { const s = E.stats(nA, cA, nB, cB); if (s.sig) hit = s.diff > 0 ? 1 : -1; } } }
        out.push(hit || 0);
      }
      res = out; draw(true);
    }
    function build() {
      const b = bells();
      root.innerHTML = `<div class="sx-wrap"><p class="sx-sub">${T('labSub')}</p>
        <div class="sx-main"><section class="sx-card sx-ctl">
          <div class="sx-f"><label for="alP">${T('labBase')}<output id="alPo"></output></label><input type="range" id="alP" min="1" max="40" step="1" value="${S.p0}"></div>
          <div class="sx-f"><label for="alL">${T('labLift')}<output id="alLo"></output></label><input type="range" id="alL" min="-20" max="40" step="1" value="${S.lift}"></div>
          <div class="sx-f"><label for="alN">${T('labN')}<output id="alNo"></output></label><input type="range" id="alN" min="0" max="${NS.length - 1}" step="1" value="${S.ni}"></div>
          <label class="sx-chk"><input type="checkbox" id="alK" ${S.peek ? 'checked' : ''}><span>${T('labPeek')}</span></label>
          <div class="sx-btns"><button type="button" class="sx-go" data-run>${T('labRun')} ▶</button><button type="button" class="ghost" data-reset>${T('labReset')}</button></div></section>
          <section class="sx-card"><div class="sx-bell" id="alBell">${b.svg}</div><div class="sx-pw" id="alPw"></div></section></div>
        <section class="sx-card"><p class="sx-hint">${T('labDots')}</p><div class="sx-out" id="alOut" aria-live="polite"></div><div class="sx-dots" id="alDots"></div></section>
        <details class="sx-card sx-more" open><summary>${T('labLearn')}</summary><ul class="sx-learn"><li>${T('lk1')}</li><li>${T('lk2')}</li><li>${T('lk3')}</li><li>${T('lk4')}</li></ul></details></div>`;
      draw(false); upd();
    }
    function upd() {
      $('#alPo').textContent = S.p0 + '%'; $('#alLo').textContent = (S.lift >= 0 ? '+' : '') + S.lift + '%'; $('#alNo').textContent = n().toLocaleString();
      const b = bells(); $('#alBell').innerHTML = b.svg; const pw = Math.round(b.pw * 100), nd = S.lift > 0 ? E.nFor(S.p0 / 100, S.lift / 100) : 0;
      $('#alPw').innerHTML = S.lift > 0 ? `<b class="${pw >= 80 ? 'gn' : 'am'}">${T('plPow')} ${pw}%</b>${nd ? `<span>${T('labNeed', { n: nd.toLocaleString() })}</span>` : ''}` : '';
    }
    function draw(anim) {
      const D = $('#alDots'), O = $('#alOut'); if (!D) return;
      if (!res) { D.innerHTML = Array.from({ length: 200 }, () => '<i class="gy idle"></i>').join(''); O.innerHTML = ''; return; }
      D.innerHTML = res.map((v, i) => `<i class="${v > 0 ? 'gn' : v < 0 ? 'rd' : 'gy'} ${anim ? 'pop' : ''}" style="animation-delay:${Math.min(900, i * 5)}ms"></i>`).join('');
      const pos = res.filter(v => v > 0).length / 2, any = res.filter(v => v !== 0).length / 2;
      let line; if (S.peek && S.lift === 0) line = T('labRatePeek', { r: any.toFixed(0) }); else if (S.lift > 0) line = T('labRateReal', { r: pos.toFixed(0) }); else if (S.lift === 0) line = T('labRateNull', { r: any.toFixed(0) }); else line = T('labRateSig', { r: any.toFixed(0) });
      O.innerHTML = `<b>${line}</b>`;
    }
    root.addEventListener('input', e => { const id = e.target.id; if (id === 'alP') S.p0 = +e.target.value; else if (id === 'alL') S.lift = +e.target.value; else if (id === 'alN') S.ni = +e.target.value; else if (id === 'alK') S.peek = e.target.checked; else return; res = null; draw(false); upd(); });
    root.addEventListener('click', e => { if (e.target.closest('[data-run]')) { MBALAB.util.sfx('tick'); run(); } else if (e.target.closest('[data-reset]')) { S = { p0: 10, lift: 10, ni: 3, peek: false }; res = null; build(); } });
    return { show() { if (!$('.sx-wrap')) build(); }, relabel() { if ($('.sx-wrap')) { build(); if (res) draw(false); } } };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.abLab = create;
})();
