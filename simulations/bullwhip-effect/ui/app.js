/* Bullwhip effect: UI wiring. Rules live in engine.js. */
MBALAB.sims.define('bullwhip-effect', {
  mount(host) {
    const B = MBALAB.bw, $ = s => host.querySelector(s);
    const ICON = ['🏪', '🏢', '🚚', '🏭'];            /* by tier: 0 retail ... 3 production */
    const KEY = 'mbalab-bw-best';
    let best = {};
    try { const b = JSON.parse(localStorage.getItem(KEY) || '{}'); if (b && typeof b === 'object') best = b; } catch (e) {}
    const saveBest = () => { try { localStorage.setItem(KEY, JSON.stringify(best)); } catch (e) {} };
    const maxMap = (a, b) => { const o = Object.assign({}, a || {}); Object.keys(b || {}).forEach(k => { if (!(o[k] >= b[k])) o[k] = b[k]; }); return o; };
    const cloud = MBALAB.cloud('bullwhip-effect', { read: () => best, write: o => { best = o; saveBest(); }, merge: maxMap, refresh: () => cards() });
    const sfx = MBALAB.util.sfx;
    const cv = $('#bwCv'), stage = $('#bwStage'), tipEl = $('#bwTip'), scroll = $('#bwScroll');
    const scene = MBALAB.bwScene(cv);
    let visible = false;
    const still = () => document.body.classList.contains('still');
    const live = () => !!(g && !g.over && role !== null);
    function loop() { if (visible && live() && !still() && !document.hidden) scene.start(); else if (scene.running) scene.stop(); else scene.draw(); }
    document.addEventListener('visibilitychange', loop);
    if (window.MutationObserver) new MutationObserver(loop).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    function fit() { const w = cv.clientWidth || 960, h = cv.clientHeight || Math.round(w * 10 / 16), dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); scene.draw(); }
    if (window.ResizeObserver) new ResizeObserver(fit).observe(stage); else window.addEventListener('resize', fit);
    function names() {
      if (!sc) return;
      const n = { cust: t('customers'), you: t('you'), hulu: t('hulu'), hilir: t('hilir') };
      for (let i = 0; i < 4; i++) { n[i] = name(sc, i); n['tr' + i] = t('tr' + i); }
      scene.setNames({ names: n, src: t('srcLbl'), goods: sc.icon });
    }
    /* the stage and the no-scroll layout only exist while a game is running */
    function mode() {
      const on = live();
      stage.hidden = !on; scroll.classList.toggle('live', on); $('#bwChain').hidden = on;
      if (!on) { tipEl.hidden = true; scene.set({ live: false }); }
      else { names(); fit(); }
      loop();
    }

    let sc = null, g = null, role = null, order = 4, showBench = false, res = null;
    const stars = n => '★'.repeat(n) + '☆'.repeat(3 - n);
    const esc = MBALAB.util.esc;
    const name = (s, tier) => t('n_' + s.chain[3 - tier]);

    /* ---------- chart helper ---------- */
    function chart(series, o) {
      const W = 640, H = o.h || 230, L = 34, R = 10, T = 10, Bm = 24, n = o.n;
      let lo = 0, hi = 0;
      series.forEach(s => s.d.forEach(v => { if (v > hi) hi = v; if (v < lo) lo = v; }));
      hi = Math.max(10, Math.ceil(hi / 10) * 10); lo = lo < 0 ? Math.floor(lo / 10) * 10 : 0;
      const X = i => L + (n <= 1 ? 0 : i * (W - L - R) / (n - 1)), Y = v => T + (hi - v) * (H - T - Bm) / (hi - lo);
      let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="bw-svg" role="img" aria-label="' + esc(o.aria) + '">';
      const ticks = lo < 0 ? [lo, 0, hi] : [0, hi / 2, hi];
      ticks.forEach(v => { s += '<line class="gl" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="gt" x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v + '</text>'; });
      for (let i = 0; i < n; i += 4) s += '<text class="gt" x="' + X(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + (i + 1) + '</text>';
      series.forEach(se => { s += '<polyline class="ln ' + se.c + (se.dash ? ' dash' : '') + '" points="' + se.d.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ') + '"/>'; });
      return s + '</svg>';
    }
    const legend = items => '<div class="bw-lg">' + items.map(i => '<span><i class="sw ' + i.c + (i.dash ? ' dash' : '') + '"></i>' + esc(i.t) + '</span>').join('') + '</div>';

    /* ---------- select screen ---------- */
    function cards() {
      $('#bwCards').innerHTML = B.SCEN.map((s, i) => MBALAB.cards.card({ kind: 'whip', icon: s.icon, n: s.chain.length, i, badge: String(i + 1), who: [s.icon], title: t('sc_' + s.id), tag: t('dm_' + s.id), desc: t('sd_' + s.id), diff: Math.ceil((i + 1) / B.SCEN.length * 5), foot: `<span class="bw-cs" aria-label="${esc(t('stars', { n: best[s.id] || 0 }))}">${stars(best[s.id] || 0)}</span>`, attrs: `data-i="${i}"` })).join('');
      $('#bwHow').innerHTML = `<h3>${t('howT')}</h3><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol>`;
    }
    $('#bwCards').addEventListener('click', e => { const b = e.target.closest('.sc-card2'); if (b) { sfx('open'); openScen(+b.dataset.i); } });

    /* ---------- chain strip ---------- */
    function chainHtml(pick) {
      let h = '';
      for (let k = 0; k < 4; k++) {
        const tier = 3 - k, mine = role === tier;
        h += `<div class="bw-node${mine ? ' me' : ''}" data-tier="${tier}"><span class="ic" aria-hidden="true">${ICON[tier]}</span><b>${esc(name(sc, tier))}</b><small>${esc(t('tr' + tier))}</small>${role === null ? '' : `<span class="bd">${mine ? esc(t('you')) : '🤖 ' + esc(t('ai'))}</span>`}</div><span class="bw-ar" aria-hidden="true"></span>`;
      }
      h += `<div class="bw-node cust"><span class="ic" aria-hidden="true">👥</span><b>${esc(t('customers'))}</b></div>`;
      return `<div class="bw-lane" role="img" aria-label="${esc(t('chainAria'))}"><small class="bw-ln l">${esc(t('hulu'))}</small>${h}<small class="bw-ln r">${esc(t('hilir'))}</small></div>`;
    }

    function openScen(i) {
      sc = B.SCEN[i]; g = null; role = null; res = null; showBench = false;
      $('#bwSelect').hidden = true; $('#bwPlay').hidden = false; $('#bwScroll').scrollTop = 0;
      pickRole();
    }
    function pickRole() {
      g = null; role = null; res = null;
      $('#bwHud').innerHTML = `<span class="sc-chip bw-chip">${esc(t('sc_' + sc.id))}</span><button type="button" class="sc-chip bw-chip btn" id="bwToChains">${esc(t('btnChange'))}</button>`;
      $('#bwChain').innerHTML = chainHtml();
      $('#bwBody').innerHTML = `<div class="bw-roles"><h2>${esc(t('roleT'))}</h2><p class="sc-sub bw-sub">${esc(t('roleSub'))}</p><div class="bw-rg">` +
        [0, 1, 2, 3].map(r => `<button type="button" class="bw-role" data-r="${r}"><span class="ic" aria-hidden="true">${ICON[r]}</span><span><b>${esc(name(sc, r))}</b><i>${esc(t('tr' + r))}</i><small>${esc(t('rl' + r))}</small></span></button>`).join('') + '</div></div>';
      mode();
    }

    /* ---------- play ---------- */
    function startGame(r) {
      role = r; g = B.create(sc.id, r); res = null;
      order = Math.round(B.view(g).incoming); mode(); render(true);
    }
    function tipText(v) {
      if (g.week === 0) return t('tip0');
      if (v.back > 0) return t('tipBack', { n: v.back });
      const avg = Math.max(1, v.incoming), w = (v.pipe / avg);
      if (v.pipe > 3.4 * avg && v.pipe > 14) return t('tipOver', { n: v.pipe, w: w.toFixed(1) });
      const prev = g.hist.length > 2 ? g.hist[g.hist.length - 2].incoming[role] : v.incoming;
      if (v.incoming > prev + 1) return t('tipUp');
      if (v.inv > 26) return t('tipFull');
      return t('tipSteady');
    }
    function hud() {
      $('#bwHud').innerHTML = `<span class="sc-chip bw-chip">${esc(t('sc_' + sc.id))}</span><span class="sc-chip bw-chip wk">${esc(t('weekLbl', { n: Math.min(g.week + 1, g.weeks), m: g.weeks }))}</span>
        <span class="sc-chip bw-chip">${esc(t('costYou', { n: Math.round(g.cost[role]) }))}</span><span class="sc-chip bw-chip">${esc(t('costTeam', { n: Math.round(B.sum(g.cost)) }))}</span>
        <button type="button" class="sc-chip bw-chip btn" id="bwToChains">${esc(t('btnChange'))}</button>`;
    }
    function miniChart() {
      const h = g.hist, n = g.weeks;
      const inc = h.slice(1).map(x => x.incoming[role]), out = h.slice(1).map(x => x.orders[role]);
      const pos = h.slice(1).map(x => x.inv[role] - x.back[role]);
      if (!inc.length) return '<div class="bw-mini empty"></div>';
      return `<div class="bw-mini"><h3>${esc(t('chartMine'))}</h3>${chart([{ d: inc, c: 'c-in' }, { d: out, c: 'c-out' }, { d: pos, c: 'c-pos', dash: true }], { n, h: 150, aria: t('chartMine') })}
        ${legend([{ c: 'c-in', t: t(role === 0 ? 'inCust' : 'inLbl') }, { c: 'c-out', t: t('lgOut') }, { c: 'c-pos', t: t('lgPos'), dash: true }])}</div>`;
    }
    function sync(snap) {
      const v = B.view(g);
      scene.set({ live: true, role, inv: v.inv, back: v.back, pipes: g.ship.map(p => p.slice()), inc: v.incoming, order, week: g.week, snap: !!snap });
    }
    function render(snap) {
      if (g.over) return results();
      const v = B.view(g);
      hud(); sync(snap);
      tipEl.textContent = '💡 ' + tipText(v); tipEl.hidden = false;
      $('#bwChain').innerHTML = chainHtml();
      $('#bwBody').innerHTML = `<div class="bw-board">
        <div class="bw-stats">
          <div class="st"><span>${esc(t('stockLbl'))}</span><b>${v.inv}</b></div>
          <div class="st${v.back ? ' warn' : ''}"><span>${esc(t('backLbl'))}</span><b>${v.back}</b></div>
          <div class="st"><span>${esc(t('arrNow'))}</span><b>+${v.arriving}</b></div>
          <div class="st"><span>${esc(t('arrNext'))}</span><b>+${v.later}</b></div>
          <div class="st"><span>${esc(t('onOrder'))}</span><b>${v.pipe}</b></div>
          <div class="st in"><span>${esc(t(role === 0 ? 'inCust' : 'inLbl'))}</span><b>${v.incoming}</b></div>
        </div>
        <div class="bw-order">
          <label for="bwRange">${esc(t('orderLbl'))}</label>
          <div class="sc-row bw-row"><button type="button" id="bwMinus" aria-label="-1">−</button><input type="range" id="bwRange" min="0" max="40" step="1" value="${order}"><button type="button" id="bwPlus" aria-label="+1">+</button><output id="bwVal" class="bw-val">${order}</output></div>
          <small class="bw-pos">${esc(t('posLbl'))}: <b>${v.position}</b> <span>(${esc(t('posHint'))})</span></small>
          <button type="button" id="bwGo" class="bw-main">${esc(t('btnOrder', { n: order }))}</button>
        </div>
      </div>${miniChart()}`;
    }
    function setOrder(x) {
      order = Math.max(0, Math.min(40, Math.round(x)));
      const r = $('#bwRange'); if (r) r.value = order;
      const o = $('#bwVal'); if (o) o.textContent = order;
      const b = $('#bwGo'); if (b) b.textContent = t('btnOrder', { n: order });
    }
    function go() {
      if (!g || g.over) return;
      const pv = B.view(g), prev = g.ship.map(p => p.slice()), sentOrder = order;
      B.step(g, order); sfx('tick');
      const last = g.hist[g.hist.length - 1];
      scene.step({ prev, arrived: prev[role][0], inc: pv.incoming, order: sentOrder, shipped: last.shipped[role], demand: pv.demand, served: last.shipped[role] }, still());
      $('#bwSr').textContent = t('srWeek', { n: g.week, s: g.inv[role], b: g.back[role] });
      if (!g.over) order = Math.round(B.view(g).incoming);
      render();
      if (!g.over) { const first = $('#bwGo'); if (first) first.focus({ preventScroll: true }); }
    }

    /* ---------- results ---------- */
    function results() {
      const firstTime = !res;
      res = res || B.results(g);
      const r = res, v = role;
      if (!best[sc.id] || r.stars > best[sc.id]) { best[sc.id] = r.stars; saveBest(); cloud.changed(); }
      if (firstTime) cloud.attempt({ at: Date.now(), score: Math.min(100, Math.round(r.bench / Math.max(1, r.total) * 100)), variant: sc.id, detail: { stars: r.stars, role: v } });
      hud(); mode();
      $('#bwChain').innerHTML = chainHtml();
      const extra = Math.round((r.total / r.bench - 1) * 100);
      const COL = ['c-t0', 'c-t1', 'c-t2', 'c-t3'];
      const cust = Math.max.apply(null, r.demand);
      const backWeeks = g.hist.slice(1).filter(x => x.back[v] > 0).length, stockWeeks = g.hist.slice(1).filter(x => x.inv[v] > 24).length;
      const read = [];
      read.push(r.ratio[v] > 2 ? t('rdBig', { n: r.ratio[v].toFixed(1) }) : t('rdCalm', { n: r.ratio[v].toFixed(1) }));
      if (backWeeks >= 3) read.push(t('rdBack', { n: backWeeks }));
      if (stockWeeks >= 3) read.push(t('rdStock', { n: stockWeeks }));
      if (r.peak[3] > cust * 2.2) read.push(t('rdUp', { n: r.peak[3], m: cust }));
      const series = [{ d: r.demand, c: 'c-d', dash: false }].concat([0, 1, 2, 3].map(i => ({ d: r.orders[i], c: COL[i] })));
      if (showBench) [0, 1, 2, 3].forEach(i => series.push({ d: r.benchOrders[i], c: COL[i], dash: true }));
      const mx = Math.max.apply(null, r.ratio.concat([1]));
      $('#bwBody').innerHTML = `<div class="bw-rc">
        <div class="sc-rh bw-rh"><h2>${esc(t('rsT'))}</h2><span class="sc-stars bw-stars" aria-label="${esc(t('stars', { n: r.stars }))}">${stars(r.stars)}</span></div>
        <p class="bw-score">${esc(t('rsTeam'))}<b>${Math.round(r.total)}</b></p>
        <p class="sc-sub bw-sub">${esc(t('rsBench', { n: Math.round(r.bench) }))}<br>${esc(extra > 8 ? t('rsExtra', { n: extra }) : t('rsNoExtra'))}</p>
        <p class="sc-sub bw-sub"><small>${esc(t('rsBest', { n: best[sc.id] }))}</small></p>
        <div class="bw-blk"><h3>${esc(t('rsChart'))}</h3><p class="sc-sub bw-sub"><small>${esc(t('rsChartSub'))}</small></p>
          ${chart(series, { n: r.demand.length, h: 250, aria: t('rsChart') })}
          ${legend([{ c: 'c-d', t: t('lgDemand') }].concat([0, 1, 2, 3].map(i => ({ c: COL[i], t: name(sc, i) + (i === v ? ' (' + t('you') + ')' : '') }))))}
          <button type="button" class="bw-tog" id="bwBench" aria-pressed="${showBench}">${esc(t('rsChartBench'))}</button></div>
        <div class="bw-two">
          <div class="bw-blk"><h3>${esc(t('rsRatioT'))}</h3>${[3, 2, 1, 0].map(i => `<div class="bw-bar ${COL[i]}${i === v ? ' me' : ''}"><span>${esc(name(sc, i))}</span><div><i style="width:${Math.max(3, r.ratio[i] / mx * 100).toFixed(0)}%"></i></div><b>${r.ratio[i].toFixed(1)}×</b></div>`).join('')}<p class="sc-sub bw-sub"><small>${esc(t('rsRatioNote'))}</small></p></div>
          <div class="bw-blk"><h3>${esc(t('rsCostT'))}</h3>${(() => { const m = Math.max.apply(null, r.tier); return [3, 2, 1, 0].map(i => `<div class="bw-bar ${COL[i]}${i === v ? ' me' : ''}"><span>${esc(name(sc, i))}</span><div><i style="width:${Math.max(3, r.tier[i] / m * 100).toFixed(0)}%"></i></div><b>${Math.round(r.tier[i])}</b></div>`).join(''); })()}</div>
        </div>
        <div class="bw-blk"><h3>${esc(t('rsRead'))}</h3><ul>${read.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="bw-blk"><h3>${esc(t('lsT'))}</h3><ul>${[1, 2, 3, 4].map(k => `<li>${esc(t('ls' + k))}</li>`).join('')}</ul><p class="sc-sub bw-sub">${esc(t('lsBumn'))}</p></div>
        <div class="sc-end bw-end"><button type="button" class="bw-main" id="bwAgain">${esc(t('rsAgain'))}</button><button type="button" id="bwRoles">${esc(t('rsRoles'))}</button><button type="button" id="bwAll">${esc(t('rsChains'))}</button></div>
      </div>`;
    }

    /* ---------- events ---------- */
    const root = $('#bw');
    root.addEventListener('click', e => {
      const x = e.target;
      const rb = x.closest('.bw-role'); if (rb) { sfx('open'); startGame(+rb.dataset.r); return; }
      if (x.closest('#bwToChains') || x.closest('#bwAll')) { $('#bwPlay').hidden = true; $('#bwSelect').hidden = false; g = null; role = null; cards(); mode(); $('#bwScroll').scrollTop = 0; return; }
      if (x.closest('#bwMinus')) return setOrder(order - 1);
      if (x.closest('#bwPlus')) return setOrder(order + 1);
      if (x.closest('#bwGo')) return go();
      if (x.closest('#bwAgain')) return startGame(role);
      if (x.closest('#bwRoles')) { $('#bwScroll').scrollTop = 0; return pickRole(); }
      if (x.closest('#bwBench')) { showBench = !showBench; results(); const b = $('#bwBench'); if (b) b.focus({ preventScroll: true }); }
    });
    root.addEventListener('input', e => { if (e.target.id === 'bwRange') setOrder(+e.target.value); });

    function refresh() {
      cards();
      if (!sc || $('#bwPlay').hidden) return;
      if (!g) pickRole(); else if (g.over) results(); else { names(); render(); }
    }
    this.refresh = refresh;
    this._bw = { scene, fit, loop, setVisible(x) { visible = x; loop(); } };
    cards();
  },
  onShow() { const m = this._bw; if (!m) return; m.scene.setTheme(MBALAB.theme && MBALAB.theme.isDay()); m.setVisible(true); m.fit(); },
  onHide() { const m = this._bw; if (m) m.setVisible(false); },
  onLang() { if (this.refresh) this.refresh(); },
  onTheme(day) { const m = this._bw; if (m) m.scene.setTheme(day); }
});
