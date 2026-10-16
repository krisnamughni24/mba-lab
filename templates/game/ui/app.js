/* Game template logic: three levels, ranks, stars, badges, saved in localStorage.
   Pattern: menu() draws the hero + levels + badges; open(i) shows a level; render() draws the step; finish() scores and saves.
   Replace the model (MARKETS, profitAt) with your own, keep the structure. */
MBALAB.sims.define('my-simulation', {
  mount(host) {
    const $ = s => host.querySelector(s), T = (k, p) => t(k, p), sfx = MBALAB.util.sfx;
    const KEY = 'mbalab-my-simulation', RANKS = [0, 60, 160];
    /* demand = a - b * price, cost per cup c: the best price is (a / b + c) / 2 */
    const MARKETS = [{ icon: '🏖️', a: 120, b: 8, c: 4 }, { icon: '🎒', a: 90, b: 9, c: 3 }, { icon: '🎪', a: 200, b: 12, c: 7 }];
    const profitAt = (m, p) => Math.max(0, m.a - m.b * p) * (p - m.c);
    const bestPrice = m => (m.a / m.b + m.c) / 2, rp = n => 'Rp ' + Math.round(n * 1000).toLocaleString();
    let st = { xp: 0, stars: {}, badges: {} };
    try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
    let li = 0, step = 1, price = 8, out = null, xpRun = 0;
    const rank = xp => RANKS.reduce((r, x, i) => xp >= x ? i : r, 0);
    const unlocked = i => i === 0 || (st.stars[i - 1] || 0) >= 1;
    const starsHtml = n => `<span class="sg-st" aria-label="${n}/3">${[0, 1, 2].map(i => `<b class="${i < n ? 'on' : ''}" style="--i:${i}">★</b>`).join('')}</span>`;
    const BADGES = ['first', 'star'], BI = { first: '🍋', star: '🌟' };

    /* ---------- menu: hero + rank, levels, badges ---------- */
    function menu() {
      $('#gmLevel').hidden = true; $('#gmMenu').hidden = false;
      const r = rank(st.xp), nx = RANKS[r + 1], pc = nx ? Math.round((st.xp - RANKS[r]) / (nx - RANKS[r]) * 100) : 100;
      $('#gmMenu').innerHTML = `<div class="sg-hero"><div><h2>${T('hero')}</h2><p>${T('heroSub')}</p></div>
        <div class="sg-rank"><span class="sg-rk">${T('rk' + r)}</span><b>${T('xpLbl', { n: st.xp })}</b><div class="sg-xp"><i style="width:${pc}%"></i></div><small>${nx ? T('xpNext', { n: nx }) : T('xpMax')}</small></div></div>
        <div class="sg-levels">${MARKETS.map((m, i) => { const ok = unlocked(i), n = st.stars[i] || 0;
          return `<button type="button" class="sg-lv ${ok ? '' : 'locked'}" data-lv="${i}" ${ok ? '' : 'disabled'}><span class="sg-lvi" aria-hidden="true">${m.icon}</span><small>${T('lvN', { n: i + 1 })}</small><b>${T('lv' + (i + 1))}</b><em>${T('lv' + (i + 1) + 'd')}</em>${ok ? starsHtml(n) + `<span class="sg-go">${n ? '↻' : '▶'}</span>` : `<span class="sg-lock">🔒 ${T('lvLock')}</span>`}</button>`; }).join('')}</div>
        <h3 class="sg-h3">${T('bdT')}</h3><div class="sg-badges">${BADGES.map(b => `<div class="sg-bd ${st.badges[b] ? 'on' : ''}"><span>${BI[b]}</span><b>${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>`;
    }

    /* ---------- level: hud, steps, stage, say, panel ---------- */
    function open(i) { li = i; step = 1; out = null; xpRun = 0; price = Math.round(bestPrice(MARKETS[i]) * .6); $('#gmMenu').hidden = true; $('#gmLevel').hidden = false; fit(); render(); sfx('open'); }
    function say(txt) { const b = $('#gmSay'); b.innerHTML = `<b>🧑‍🍳</b> ${txt}`; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
    function render() {
      const r = rank(st.xp);
      $('#gmHud').innerHTML = `<button type="button" class="sg-back" data-a="menu">← ${T('toMenu')}</button><b class="sg-lt">${T('lvN', { n: li + 1 })} · ${MARKETS[li].icon} ${T('lv' + (li + 1))}</b><span class="sg-chipx">${T('rk' + r)} · ${T('xpLbl', { n: st.xp + xpRun })}</span>`;
      $('#gmSteps').innerHTML = [1, 2].map(i => `<li class="${step === i ? 'on' : step > i ? 'done' : ''}"><span>${step > i ? '✓' : i}</span>${T('st' + i)}</li>`).join('');
      const P = $('#gmPanel'), m = MARKETS[li];
      if (step === 1) {
        say(T('say1'));
        P.innerHTML = `<div class="gm-price"><label for="gmP">${T('lv' + (li + 1))}</label><output id="gmOut">${T('price', { p: rp(price) })}</output></div>
          <div class="sg-sl"><input type="range" id="gmP" min="${m.c}" max="${Math.floor(m.a / m.b)}" step="0.5" value="${price}"></div>
          <div class="sg-foot"><button type="button" class="sg-main go" data-a="sell">${T('sell')}</button></div>`;
      } else {
        say(T('say2'));
        P.innerHTML = `<div class="sg-res"><div class="sg-big">${starsHtml(out.n)}<b>${T('score', { s: out.score })}</b><em class="sg-xpg">${T('xpLbl', { n: xpRun })}</em></div>
          <div class="sg-kpis"><div><small>${T('profit')}</small><b>${rp(out.profit)}</b></div><div class="hi"><small>${T('best')}</small><b>${rp(out.best)}</b></div><div><small>${T('priceL')}</small><b>${rp(price)}</b></div></div>
          <div class="sg-foot"><button type="button" class="sg-btn" data-a="again">${T('again')}</button>${out.n >= 1 && li < MARKETS.length - 1 ? `<button type="button" class="sg-main inl" data-a="next">${T('next')}</button>` : ''}<button type="button" class="sg-btn ghost" data-a="menu">${T('toMenu')}</button></div></div>`;
      }
      draw();
    }
    function finish() {
      const m = MARKETS[li], profit = profitAt(m, price), best = profitAt(m, bestPrice(m)), score = Math.round(profit / best * 100), n = score >= 95 ? 3 : score >= 80 ? 2 : score >= 50 ? 1 : 0;
      out = { profit, best, score, n }; xpRun = 20 + n * 20; st.xp += xpRun; st.stars[li] = Math.max(st.stars[li] || 0, n); st.badges.first = 1; if (n === 3) st.badges.star = 1; save();
      step = 2; render(); sfx(n >= 2 ? 'win' : 'lose');
    }

    /* ---------- stage: draw the demand curve and the chosen price on the canvas ---------- */
    const cv = $('#gmCv'), ctx = cv.getContext('2d');
    function fit() { const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); draw(); }
    function draw() {
      const W = cv.width, H = cv.height, m = MARKETS[li], cs = getComputedStyle(host.querySelector('#gm')), col = n => cs.getPropertyValue(n).trim() || '#888';
      ctx.clearRect(0, 0, W, H); const pmax = m.a / m.b, X = p => 40 + p / pmax * (W - 80), Y = q => H - 40 - q / m.a * (H - 80);
      ctx.strokeStyle = col('--cy'); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(0), Y(m.a)); ctx.lineTo(X(pmax), Y(0)); ctx.stroke();
      ctx.fillStyle = col('--txt'); ctx.font = `${Math.round(W / 48)}px system-ui,sans-serif`; ctx.fillText(m.icon + ' ' + T('lv' + (li + 1)), 44, 36);
      const q = Math.max(0, m.a - m.b * price); ctx.strokeStyle = col('--am'); ctx.setLineDash([6, 6]); ctx.beginPath(); ctx.moveTo(X(price), Y(0)); ctx.lineTo(X(price), Y(q)); ctx.lineTo(X(0), Y(q)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = col('--am'); ctx.beginPath(); ctx.arc(X(price), Y(q), 8, 0, 7); ctx.fill();
    }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(cv);

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const l = e.target.closest('[data-lv]'); if (l && l.closest('#gmMenu')) { sfx('tick'); open(+l.dataset.lv); return; }
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a; sfx('tick');
      if (a === 'menu') menu(); else if (a === 'sell') finish(); else if (a === 'again') open(li); else if (a === 'next') open(li + 1);
    });
    host.addEventListener('input', e => { if (e.target.id === 'gmP') { price = +e.target.value; $('#gmOut').textContent = T('price', { p: rp(price) }); draw(); } });
    menu();
    this._gm = { fit, relabel() { if ($('#gmLevel').hidden) menu(); else render(); } };
  },
  onShow() { const m = this._gm; if (m) m.fit(); },
  onLang() { const m = this._gm; if (m) m.relabel(); }
});
