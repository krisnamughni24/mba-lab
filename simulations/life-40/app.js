/* Life 40: UI wiring. Rules live in engine.js, events in events.js. */
MBALAB.sims.define('life-40', {
  mount(host) {
    const L = MBALAB.life, EV = MBALAB.lifeEvents, $ = s => host.querySelector(s), root = $('#lf');
    const KEY = 'mbalab-lf-best', BGS = ['rich', 'normal', 'poor'], LVS = ['easy', 'medium', 'hard'], ICON = { rich: '👑', normal: '🏠', poor: '🌱' };
    let best = {};
    try { const b = JSON.parse(localStorage.getItem(KEY) || '{}'); if (b && typeof b === 'object') best = b; } catch (e) {}
    const saveBest = () => { try { localStorage.setItem(KEY, JSON.stringify(best)); } catch (e) {} };
    const sfx = n => { try { MBALAB.audio && MBALAB.audio.play(n); } catch (e) {} };
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const stars = n => '★'.repeat(n) + '☆'.repeat(3 - n);

    let bg = null, lv = null, seed = 1, G = null, phase = 'select', cards = [], cur = null, shown = null, row = null, log = [], res = null, wise = null;

    /* ---------- formatting ---------- */
    const fmt = v => { const a = Math.abs(v), sg = v < 0 ? '−' : ''; return sg + t('cur') + ' ' + (a >= 1000 ? (a / 1000).toFixed(a >= 10000 ? 0 : 2) + ' ' + t('unitB') : (a < 10 ? a.toFixed(1) : Math.round(a)) + ' ' + t('unitM')); };
    const fmtS = v => Math.abs(v) >= 1000 ? Math.round(v / 100) / 10 + t('unitB') : Math.round(v);
    const pct = v => (Math.round(v * 1000) / 10);
    function params(p) { const o = {}; Object.keys(p || {}).forEach(k => { o[k.replace(/^\$/, '')] = k[0] === '$' ? fmt(p[k]) : p[k]; }); return o; }
    const evT = (e, k, p) => t('ev_' + e.id + (k ? '_' + k : ''), params(p));

    /* ---------- chart ---------- */
    function chart(series, aria) {
      const W = 640, H = 230, Lm = 56, R = 10, T = 10, Bm = 24, n = L.YEARS + 1;
      let hi = 10, lo = 0; series.forEach(s => s.d.forEach(v => { if (v > hi) hi = v; if (v < lo) lo = v; }));
      const nice = v => { const p = Math.pow(10, Math.floor(Math.log10(v))); return Math.ceil(v / p * 2) / 2 * p; };
      hi = nice(hi); if (lo < 0) lo = -nice(-lo);
      const X = i => Lm + i * (W - Lm - R) / (n - 1), Y = v => T + (hi - v) * (H - T - Bm) / (hi - lo);
      let s = `<svg viewBox="0 0 ${W} ${H}" class="lf-svg" role="img" aria-label="${esc(aria)}">`;
      (lo < 0 ? [lo, 0, hi] : [0, hi / 2, hi]).forEach(v => { s += `<line class="gl" x1="${Lm}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}"/><text class="gt" x="${Lm - 6}" y="${Y(v) + 4}" text-anchor="end">${fmtS(v)}</text>`; });
      for (let i = 0; i < n; i += 10) s += `<text class="gt" x="${X(i)}" y="${H - 6}" text-anchor="middle">${L.START + i}</text>`;
      series.forEach(se => { s += `<polyline class="ln ${se.c}${se.dash ? ' dash' : ''}" points="${se.d.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ')}"/>`; });
      return s + '</svg>';
    }
    const legend = a => '<div class="lf-lg">' + a.map(i => `<span><i class="sw ${i.c}${i.dash ? ' dash' : ''}"></i>${esc(i.t)}</span>`).join('') + '</div>';

    /* ---------- select ---------- */
    function selectScreen() {
      $('#lfLives').innerHTML = BGS.map(b => {
        const B = L.BG[b], sav = B.assets.cash + B.assets.dep + B.assets.fund + B.assets.gold, d = B.debts.reduce((a, x) => a + x.bal, 0);
        return `<div class="lf-life" data-bg="${b}"><div class="lf-lh"><span class="lf-ic" aria-hidden="true">${ICON[b]}</span><div><b>${esc(t('bg_' + b))}</b><small>${esc(t('bgd_' + b))}</small></div></div>
          <p class="lf-st">${esc(t('bgStart', { sal: fmt(B.salary), sav: fmt(sav) }))}${d ? ' · ' + esc(t('bgDebt', { debt: fmt(d) })) : ''}</p>
          <div class="lf-lvs">${LVS.map(l => `<button type="button" class="lf-lv ${l}" data-bg="${b}" data-lv="${l}"><b>${esc(t('lv_' + l))}</b><span class="s" aria-label="${esc(t('stars', { n: best[b + '-' + l] || 0 }))}">${stars(best[b + '-' + l] || 0)}</span><small>${esc(t('lvd_' + l))}</small></button>`).join('')}</div></div>`;
      }).join('');
      $('#lfHow').innerHTML = `<h3>${t('howT')}</h3><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol>`;
    }

    function start(b, l) {
      bg = b; lv = l; seed = 1 + Math.floor(Math.random() * 1e6); G = L.create(b, l, seed); log = []; res = null; wise = null; cards = []; cur = null; row = null;
      $('#lfSelect').hidden = true; $('#lfPlay').hidden = false; $('#lfScroll').scrollTop = 0;
      phase = 'ready'; render();
    }

    /* ---------- year flow ---------- */
    function beginYear() {
      const out = L.begin(G); sfx('open');
      cards = out.later.map(l => ({ kind: 'later', l })).concat(G.queue.map(e => ({ kind: 'event', e })));
      phase = 'cards'; nextCard();
    }
    function nextCard() {
      cur = cards.shift(); shown = null;
      if (!cur) { row = L.finish(G); phase = 'summary'; $('#lfSr').textContent = t('srYear', { age: G.age }); }
      render();
    }
    function pickOption(i) {
      const e = cur.e; if (!L.can(G, e, i)) return;
      const age = G.age, r = L.choose(G, i); sfx('tick');
      log.push({ age, id: e.id, opt: e.opts[i].id });
      shown = r; render();
    }
    function mergeFx(fx) { const m = {}; (fx || []).forEach(([k, v]) => { m[k] = (m[k] || 0) + v; }); return Object.keys(m).filter(k => Math.abs(m[k]) > 0.0001).map(k => [k, m[k]]); }
    function fxChips(fx) {
      return '<div class="lf-fx">' + mergeFx(fx).map(([k, v]) => {
        const good = (k === 'debt' || k === 'house' && false) ? v < 0 : v > 0;
        const txt = k === 'salary' ? (v > 0 ? '+' : '−') + Math.round(Math.abs(v) * 100) + '%' : k === 'joy' ? (v > 0 ? '+' : '−') + Math.abs(v).toFixed(1) : (v > 0 ? '+' : '') + fmt(v);
        return `<span class="fx ${good ? 'up' : 'dn'}">${esc(t('fx_' + k))} ${esc(txt)}</span>`;
      }).join('') + '</div>';
    }
    const I18NK = () => ({ ev_promo_r_win: 1, ev_promo_r_lose: 1, ev_offer_r_win: 1, ev_offer_r_lose: 1, ev_study_r_win: 1, ev_house_r_win: 1 });

    /* ---------- render ---------- */
    function hud() {
      const h = G.hist[G.hist.length - 1], j = G.joy.length ? G.joy[G.joy.length - 1] : null;
      $('#lfHud').innerHTML = `<span class="lf-chip">${esc(t('bg_' + bg))} · ${esc(t('lv_' + lv))}</span><span class="lf-chip age">${esc(t('ageLbl', { age: Math.min(G.age, L.END) }))} · ${esc(t('yearOf', { n: Math.min(G.y + 1, L.YEARS) }))}</span>
        <span class="lf-chip">${esc(t('nwNom'))}: ${esc(fmt(h.nw))}</span><span class="lf-chip">${esc(t('nwReal'))}: ${esc(fmt(h.real))}</span>${j === null ? '' : `<span class="lf-chip">😊 ${j.toFixed(1)}/10</span>`}
        <button type="button" class="lf-chip btn" id="lfToLives">${esc(t('btnChains'))}</button>`;
    }
    function side() {
      const a = [['cash', G.cash], ['dep', G.dep], ['fund', G.fund], ['gold', G.gold], ['house', G.house ? G.house.value : 0]], debt = L.debt(G);
      const rows = a.filter(r => r[1] > 0.05 || r[0] === 'cash').map(r => `<div class="r"><span>${esc(t('a_' + r[0]))}</span><b>${esc(fmt(r[1]))}</b></div>`).join('') +
        G.loans.map(l => `<div class="r debt"><span>${esc(t('a_debt'))}: ${esc(l.name === 'edu' ? '🎓' : l.name === 'KPR' ? '🏠' : l.name === 'car' ? '🚗' : l.name === 'pinjol' ? '⚠️' : '👪')} ${(l.rate * 100).toFixed(1)}%</span><b>−${esc(fmt(l.bal))}</b></div>`).join('');
      const locked = phase === 'cards' && cur && cur.kind === 'event' && !shown;
      $('#lfSide').innerHTML = `<div class="lf-box"><h3>${esc(t('assetsT'))}</h3>${rows}</div>
        <div class="lf-box"><h3>${esc(t('planT'))}</h3>
          <div class="lf-seg" role="group" aria-label="${esc(t('pl_style'))}">${[0, 1, 2].map(i => `<button type="button" data-ls="${i}" class="${G.lifestyle === i ? 'on' : ''}">${esc(t('ls_' + i))}</button>`).join('')}</div>
          <label for="lfSave" class="lf-lb">${esc(t('pl_save', { n: Math.round(G.saveRate * 100) }))}</label><input type="range" id="lfSave" min="0" max="100" step="5" value="${Math.round(G.saveRate * 100)}">
          <label for="lfMix" class="lf-lb">${esc(t('pl_mix'))}</label><select id="lfMix">${Object.keys(L.MIX).map(k => `<option value="${k}"${G.mix === k ? ' selected' : ''}>${esc(t('mx_' + k))}</option>`).join('')}</select>
          <label class="lf-chk"><input type="checkbox" id="lfExtra"${G.extra ? ' checked' : ''}> ${esc(t('pl_extra'))}</label>
          <p class="lf-sub sm">${esc(t('pl_note'))}</p></div>`;
    }
    function stage() {
      let h = '';
      if (phase === 'ready') {
        h = `<div class="lf-card"><h3>${esc(t('ageLbl', { age: G.age }))}</h3><p class="lf-sub">${esc(t('quiet'))}</p><button type="button" class="lf-main" id="lfBegin">${esc(t('btnBegin', { age: G.age }))}</button></div>`;
      } else if (phase === 'cards' && cur) {
        if (cur.kind === 'later') {
          h = `<div class="lf-card later"><span class="lf-k">${esc(t('later'))}</span><h3>${esc(t('lt_' + cur.l.key))}</h3>${fxChips(cur.l.fx)}${cur.l.tag ? `<p class="lf-res ${cur.l.tag}">${esc(t('res_' + cur.l.tag))}</p>` : ''}<button type="button" class="lf-main" id="lfNext">${esc(t('btnNext'))}</button></div>`;
        } else {
          const e = cur.e, p = e.p(G);
          if (!shown) {
            h = `<div class="lf-card ev"><span class="lf-k">${esc(t('evT'))}</span><h3>${esc(evT(e, '', p))}</h3><p>${esc(evT(e, 'd', p))}</p>${G.D.hint ? `<p class="lf-hint">💡 <b>${esc(t('hintLbl'))}:</b> ${esc(evT(e, 'h', p))}</p>` : ''}
              <div class="lf-opts">${e.opts.map((o, i) => { const ok = L.can(G, e, i); return `<button type="button" class="lf-opt" data-o="${i}"${ok ? '' : ' disabled'}>${esc(evT(e, o.id, p))}${ok ? '' : `<small>${esc(t('disabled'))}</small>`}</button>`; }).join('')}</div></div>`;
          } else {
            const tagk = shown.tag ? (('ev_' + e.id + '_r_' + shown.tag) in I18NK() ? 'ev_' + e.id + '_r_' + shown.tag : 'res_' + shown.tag) : null;
            h = `<div class="lf-card ev done"><span class="lf-k">${esc(t('evT'))}</span><h3>${esc(evT(e, '', p0(e)))}</h3><p class="lf-pick">▶ ${esc(shownLabel(e))}</p>${fxChips(shown.fx)}${tagk ? `<p class="lf-res ${shown.tag}">${esc(t(tagk))}</p>` : ''}<button type="button" class="lf-main" id="lfNext">${esc(t('btnNext'))}</button></div>`;
          }
        }
      } else if (phase === 'summary' && row) {
        h = `<div class="lf-card sum"><span class="lf-k">${esc(t('ysT'))} · ${esc(t('ageLbl', { age: row.age }))}</span><h3 class="reg ${row.reg}">${esc(t('reg_' + row.reg))}</h3>
          <p>${esc(t('ysMarket', { f: pct(row.fund), g: pct(row.gold), d: pct(row.dep), i: pct(row.infl) }))}</p>
          <p>${esc(t('ysFlow', { inc: fmt(row.income), sp: fmt(row.spend), fr: fmt(row.free) }))}</p>
          ${row.short ? `<p class="lf-bad">${esc(t('ysShort', { n: fmt(row.short) }))}</p>` : `<p>${esc(t('ysSaved', { sv: fmt(row.saved || 0), lk: fmt(row.leak || 0) }))}</p>`}
          <p class="lf-strong">${esc(t('ysReal', { a: fmt(row.nwAfter), b: fmt(row.nwBefore) }))}</p>
          <button type="button" class="lf-main" id="lfCont">${esc(G.over ? t('btnEnd') : t('btnNext'))}</button></div>`;
      }
      $('#lfStage').innerHTML = h;
    }
    const p0 = e => e.p(G);
    function shownLabel(e) { const i = log.length ? e.opts.findIndex(o => o.id === log[log.length - 1].opt) : 0; return evT(e, e.opts[i].id, p0(e)); }

    function render() {
      if (phase === 'result') return results();
      hud(); side(); stage();
      $('#lfChart').innerHTML = `<h3>${esc(t('chartT'))}</h3>${chart([{ d: G.hist.map(h => h.nw), c: 'c-n' }, { d: G.hist.map(h => h.real), c: 'c-r' }], t('chartT'))}${legend([{ c: 'c-n', t: t('lgNom') }, { c: 'c-r', t: t('lgReal') }])}`;
    }

    /* ---------- results ---------- */
    function results() {
      res = res || L.result(G);
      if (!wise) wise = L.wisePlay(bg, lv, seed);
      const r = res, k = bg + '-' + lv; if ((best[k] || 0) < r.stars) { best[k] = r.stars; saveBest(); }
      hud(); side();
      const has = (id, o) => log.some(x => x.id === id && x.opt === o), I = [];
      if (G.flags.pinjol || log.some(x => x.id === 'bill' && x.opt === 'b')) I.push('rd_pinjol');
      if (has('crash', 'a')) I.push('rd_panic');
      if (has('scam', 'a')) I.push('rd_scam');
      if (has('dplk', 'c')) I.push('rd_dplk');
      if (has('car', 'a')) I.push('rd_car');
      if (G.cash > 3 * G.B.living * G.cpi && G.cash > 0.25 * L.liquid(G)) I.push('rd_cash');
      I.push(r.years >= 25 ? 'rd_good' : 'rd_low'); if (r.joy < 45) I.push('rd_joy');
      const wy = wise.res.years;
      $('#lfStage').innerHTML = `<div class="lf-card res"><div class="lf-rh"><h2>${esc(t('rsT'))}</h2><span class="lf-stars" aria-label="${esc(t('stars', { n: r.stars }))}">${stars(r.stars)}</span></div>
        <p class="lf-big">${esc(t('rsYears', { n: Math.round(r.years), age: Math.round(r.endAge) }))}</p>
        <div class="lf-kv"><div><span>${esc(t('rsWealth'))}</span><b>${esc(fmt(r.wReal))}</b></div><div><span>${esc(t('rsNeed'))}</span><b>${esc(fmt(r.expenses))}</b></div></div>
        <p>${esc(t('rsJoy', { n: r.joy }))}</p><p>${esc(t('rsWise', { n: Math.round(wy) }))}</p><p class="lf-sub sm">${esc(t('rsBest', { n: best[k] }))}</p>
        <div class="lf-less"><h3>${esc(t('rsLessT'))}</h3><ul>${I.map(x => `<li>${esc(t(x))}</li>`).join('')}</ul></div>
        <details class="lf-log"><summary>${esc(t('rsLogOpen'))}</summary><ol>${log.map(x => { const e = EV.LIST.find(y => y.id === x.id); return `<li><b>${x.age}</b> · ${esc(t('ev_' + x.id, {}))} → ${esc(t('ev_' + x.id + '_' + x.opt, {}).replace(/\{[^}]+\}/g, '…'))}</li>`; }).join('')}</ol></details>
        <div class="lf-end"><button type="button" class="lf-main" id="lfAgain">${esc(t('rsAgain'))}</button><button type="button" id="lfToLives2">${esc(t('rsOther'))}</button></div></div>`;
      $('#lfChart').innerHTML = `<h3>${esc(t('rsPath'))}</h3>${chart([{ d: G.hist.map(h => h.nw), c: 'c-n' }, { d: G.hist.map(h => h.real), c: 'c-r' }, { d: wise.s.hist.map(h => h.real), c: 'c-w', dash: true }], t('rsPath'))}${legend([{ c: 'c-n', t: t('lgNom') }, { c: 'c-r', t: t('lgReal') }, { c: 'c-w', t: t('lgWise'), dash: true }])}`;
    }

    /* ---------- events ---------- */
    function toLives() { $('#lfPlay').hidden = true; $('#lfSelect').hidden = false; phase = 'select'; G = null; selectScreen(); $('#lfScroll').scrollTop = 0; }
    root.addEventListener('click', e => {
      const x = e.target;
      const lvb = x.closest('.lf-lv'); if (lvb) { sfx('open'); return start(lvb.dataset.bg, lvb.dataset.lv); }
      if (x.closest('#lfToLives') || x.closest('#lfToLives2')) return toLives();
      if (x.closest('#lfBegin')) return beginYear();
      if (x.closest('#lfNext')) return nextCard();
      if (x.closest('#lfCont')) { if (G.over) { phase = 'result'; return render(); } phase = 'ready'; return render(); }
      if (x.closest('#lfAgain')) return start(bg, lv);
      const o = x.closest('.lf-opt'); if (o && !o.disabled) return pickOption(+o.dataset.o);
      const ls = x.closest('[data-ls]'); if (ls && G) { G.lifestyle = +ls.dataset.ls; return side(); }
    });
    root.addEventListener('input', e => {
      if (!G) return;
      if (e.target.id === 'lfSave') { G.saveRate = +e.target.value / 100; const lb = $('label[for=lfSave]'); if (lb) lb.textContent = t('pl_save', { n: Math.round(G.saveRate * 100) }); }
      if (e.target.id === 'lfExtra') G.extra = e.target.checked;
    });
    root.addEventListener('change', e => { if (G && e.target.id === 'lfMix') G.mix = e.target.value; if (G && e.target.id === 'lfExtra') G.extra = e.target.checked; });

    this.refresh = () => { selectScreen(); if (G && !$('#lfPlay').hidden) render(); };
    selectScreen();
  },
  onShow() { },
  onLang() { if (this.refresh) this.refresh(); },
  onTheme() { }
});
