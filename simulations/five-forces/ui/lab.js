/* Five Forces Lab: free explorer. MBALAB.ffLab(root) -> { show, relabel }. Sliders set the forces and their weights, the radar and the profit split follow, and moves can be tried on top. */
(function () {
  const FK = ['rival', 'entry', 'supp', 'buyer', 'subs'], COL = ['var(--rd)', 'var(--am)', 'var(--vi)', 'var(--cy)', 'var(--mg)'], MEM = { loyalty: '❤️', contract: '🤝', brand: '🛡️', differentiate: '✨', integrate: '🏭', pricecut: '💥', acquire: '💼', niche: '🎯' };
  function create(root) {
    const E = MBALAB.ff, T = (k, p) => t(k, p), $ = s => root.querySelector(s);
    let pid = 'wallet', f = E.LEVELS[4].f.slice(), w = E.LEVELS[4].w.slice(), mv = [], cur = f.slice(), raf = 0;
    const R = 120, CXr = 170, CYr = 160, pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [CXr + Math.cos(a) * R * v / 100, CYr + Math.sin(a) * R * v / 100]; };
    const poly = a => a.map((v, i) => pt(i, v).join(',')).join(' ');

    function build() {
      root.innerHTML = `<div class="fl-wrap"><p class="fl-sub">${T('labSub')}</p>
        <h2 class="fl-h">${T('labPreset')}</h2><div class="fl-pre" role="radiogroup">${E.LEVELS.map(l => `<button type="button" role="radio" aria-checked="${pid === l.id}" class="${pid === l.id ? 'on' : ''}" data-pre="${l.id}"><span aria-hidden="true">${l.icon}</span> ${T('ind_' + l.id + '_n')}</button>`).join('')}<button type="button" role="radio" aria-checked="${pid === 'custom'}" class="${pid === 'custom' ? 'on' : ''}" data-pre="custom">✏️ ${T('labCustom')}</button></div>
        <div class="fl-main"><section class="fl-card fl-radar"><svg viewBox="-40 0 420 330" role="img" aria-label="${T('stageAria')}">${[.25, .5, .75, 1].map(k => `<polygon class="rg" points="${poly([100 * k, 100 * k, 100 * k, 100 * k, 100 * k])}"/>`).join('')}${FK.map((k, i) => { const p = pt(i, 100), q = pt(i, 118); return `<line class="ra" x1="${CXr}" y1="${CYr}" x2="${p[0]}" y2="${p[1]}"/><text class="rl" x="${pt(i, 132)[0]}" y="${pt(i, 132)[1] + 5}" text-anchor="middle" style="fill:${COL[i]}">${T('fs_' + k)}</text>`; }).join('')}<polygon class="rbase" id="flBase" points=""/><polygon class="rnow" id="flNow" points=""/>${FK.map((k, i) => `<circle class="rd" id="flDot${i}" r="6" style="fill:${COL[i]}"/>`).join('')}</svg></section>
        <section class="fl-card fl-ctl">${FK.map((k, i) => `<div class="fl-f"><label for="flf${i}"><span style="color:${COL[i]}">●</span> ${T('fr_' + k)}<output id="flo${i}"></output></label><input type="range" id="flf${i}" min="0" max="100" step="1" value="${f[i]}" data-f="${i}"></div>`).join('')}</section></div>
        <section class="fl-card"><h2 class="fl-h">${T('labSplit')}</h2><div class="fl-split" id="flSplit"></div><div class="fl-leg" id="flLeg"></div><div class="fl-verdict" id="flVd" aria-live="polite"></div></section>
        <section class="fl-card"><h2 class="fl-h">${T('labMoves')}</h2><div class="fl-mvs">${E.MOVES.map(m => `<button type="button" aria-pressed="${mv.indexOf(m.id) >= 0}" class="${mv.indexOf(m.id) >= 0 ? 'on' : ''}" data-mv="${m.id}" title="${T('mvd_' + m.id)}"><span aria-hidden="true">${MEM[m.id]}</span> ${T('mv_' + m.id)}</button>`).join('')}<button type="button" class="ghost" data-mvreset>${T('labReset')}</button></div><p class="fl-note" id="flMvNote"></p></section>
        <details class="fl-card fl-more"><summary>${T('labWeights')}</summary><div class="fl-w">${FK.map((k, i) => `<div class="fl-f"><label for="flw${i}"><span style="color:${COL[i]}">●</span> ${T('fs_' + k)}<output id="flwo${i}"></output></label><input type="range" id="flw${i}" min="0" max="100" step="1" value="${Math.round(w[i] * 100)}" data-w="${i}"></div>`).join('')}</div></details>
        <details class="fl-card fl-more"><summary>${T('labLearn')}</summary><div class="fl-learn">${FK.map((k, i) => `<div><b style="color:${COL[i]}">${T('fr_' + k)}</b><p>${T('frq_' + k)}</p></div>`).join('')}</div></details></div>`;
      update(true);
    }
    const norm = () => { const s = w.reduce((a, b) => a + b, 0) || 1; return w.map(x => x / s); };
    function update(jump) {
      const ww = norm(), r = E.run(f, ww, mv), shown = r.f, tk = E.takes(shown, ww), net = r.net;
      FK.forEach((k, i) => { const o = $('#flo' + i); if (o) o.textContent = T('lvl' + E.bandOf(f[i])) + ' · ' + Math.round(f[i]); const wo = $('#flwo' + i); if (wo) wo.textContent = Math.round(ww[i] * 100) + '%'; });
      $('#flBase').setAttribute('points', poly(f));
      to(shown, jump);
      const keep = Math.max(0, net);
      $('#flSplit').innerHTML = tk.map((v, i) => `<i class="s${i}" style="width:${v}%;background:${COL[i]}" title="${T('fr_' + FK[i])}: ${v.toFixed(1)}">${v > 9 ? Math.round(v) : ''}</i>`).join('') + (r.cost ? `<i class="sc" style="width:${r.cost}%" title="${T('mvCost')}">${r.cost > 5 ? Math.round(r.cost) : ''}</i>` : '') + `<i class="sk" style="width:${keep}%"><b>${Math.round(keep)}</b></i>`;
      $('#flLeg').innerHTML = FK.map((k, i) => `<span><i style="background:${COL[i]}"></i>${T('fs_' + k)} ${tk[i].toFixed(0)}</span>`).join('') + (r.cost ? `<span><i class="sc"></i>${T('mvCost')} ${r.cost}</span>` : '') + `<span><i class="sk"></i>${T('labKept')} ${Math.round(keep)}</span>`;
      const v = E.verdict(net); $('#flVd').className = 'fl-verdict v' + v; $('#flVd').innerHTML = `<b>${T('vd' + v)}</b> ${T('vdx' + v)}`;
      $('#flMvNote').textContent = mv.length ? T('rsPool', { a: Math.round(E.kept(f, ww)), b: Math.round(net) }) : '';
    }
    function to(target, jump) {
      cancelAnimationFrame(raf); const from = cur.slice(), t0 = performance.now(), D = jump || document.body.classList.contains('still') ? 0 : 320;
      const step = now => { const k = D ? Math.min(1, (now - t0) / D) : 1, e = k * (2 - k); cur = from.map((a, i) => a + (target[i] - a) * e); const el = $('#flNow'); if (!el) return; el.setAttribute('points', poly(cur)); cur.forEach((v, i) => { const p = pt(i, v), d = $('#flDot' + i); if (d) { d.setAttribute('cx', p[0]); d.setAttribute('cy', p[1]); } }); if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }
    root.addEventListener('input', e => {
      const a = e.target.dataset; if (a.f != null) { f[+a.f] = +e.target.value; pid = 'custom'; root.querySelectorAll('[data-pre]').forEach(b => { const on = b.dataset.pre === 'custom'; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); }); update(); }
      else if (a.w != null) { w[+a.w] = +e.target.value; pid = 'custom'; update(); }
    });
    root.addEventListener('click', e => {
      const p = e.target.closest('[data-pre]'); if (p) { pid = p.dataset.pre; const l = E.LEVELS.find(x => x.id === pid); if (l) { f = l.f.slice(); w = l.w.slice(); } MBALAB.util.sfx('tick'); const sc = root.parentNode.scrollTop; build(); root.parentNode.scrollTop = sc; return; }
      const m = e.target.closest('[data-mv]'); if (m) { const i = mv.indexOf(m.dataset.mv); if (i >= 0) mv.splice(i, 1); else mv.push(m.dataset.mv); m.classList.toggle('on', i < 0); m.setAttribute('aria-pressed', i < 0); MBALAB.util.sfx('tick'); update(); return; }
      if (e.target.closest('[data-mvreset]')) { mv = []; root.querySelectorAll('[data-mv]').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-pressed', false); }); update(); }
    });
    build();
    return { show() { update(true); }, relabel() { build(); } };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.ffLab = create;
})();
