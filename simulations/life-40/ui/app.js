/* Life 40: UI wiring. Rules live in engine.js, events in events.js. */
MBALAB.sims.define('life-40', {
  mount(host) {
    const L = MBALAB.life, EV = MBALAB.lifeEvents, Sc = MBALAB.lifeScene, $ = s => host.querySelector(s), root = $('#lf');
    const KEY = 'mbalab-lf-best', BGS = ['rich', 'normal', 'poor'], LVS = ['easy', 'medium', 'hard'], ICON = { rich: '👑', normal: '🏠', poor: '🌱' };
    let best = {};
    try { const b = JSON.parse(localStorage.getItem(KEY) || '{}'); if (b && typeof b === 'object') best = b; } catch (e) {}
    const saveBest = () => { try { localStorage.setItem(KEY, JSON.stringify(best)); } catch (e) {} };
    const maxMap = (a, b) => { const o = Object.assign({}, a || {}); Object.keys(b || {}).forEach(k => { if (!(o[k] >= b[k])) o[k] = b[k]; }); return o; };
    const cloud = MBALAB.cloud('life-40', { read: () => best, write: o => { best = o; saveBest(); }, merge: maxMap, refresh: () => selectScreen() });
    const sfx = MBALAB.util.sfx;
    const esc = MBALAB.util.esc;
    const stars = n => '★'.repeat(n) + '☆'.repeat(3 - n);

    let bg = null, lv = null, seed = 1, G = null, phase = 'select', cards = [], cur = null, shown = null, row = null, log = [], res = null, wise = null;
    let ghostOn = false, infoKey = null, reactNow = null, prevAge = null, gPrev = {};
    const ensureWise = () => (wise = wise || L.wisePlay(bg, lv, seed));
    const clamp = MBALAB.util.clamp;

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
    const prevSvg = (b, l) => Sc.svg(L.create(b, l, 1), { aria: t('bg_' + b), mini: true });
    function setPrev(b, l) {
      const c = root.querySelector('.lf-life[data-bg="' + b + '"]'); if (!c) return; const pv = c.querySelector('.pv'); if (!pv || pv.dataset.lv === l) return;
      pv.dataset.lv = l; pv.innerHTML = prevSvg(b, l); c.querySelectorAll('.lf-pvt button').forEach(x => x.classList.toggle('on', x.dataset.pv === l));
    }
    function selectScreen() {
      $('#lfLives').innerHTML = BGS.map(b => {
        const B = L.BG[b], sav = B.assets.cash + B.assets.dep + B.assets.fund + B.assets.gold, d = B.debts.reduce((a, x) => a + x.bal, 0);
        return `<div class="lf-life" data-bg="${b}"><div class="lf-prev"><div class="pv" data-lv="medium">${prevSvg(b, 'medium')}</div><div class="lf-pvt" role="group">${LVS.map(l => `<button type="button" data-pv="${l}" class="${l === 'medium' ? 'on' : ''}">${esc(t('lv_' + l))}</button>`).join('')}</div></div><div class="lf-lh"><span class="lf-ic" aria-hidden="true">${ICON[b]}</span><div><b>${esc(t('bg_' + b))}</b><small>${esc(t('bgd_' + b))}</small></div></div>
          <p class="lf-st">${esc(t('bgStart', { sal: fmt(B.salary), sav: fmt(sav) }))}${d ? ' · ' + esc(t('bgDebt', { debt: fmt(d) })) : ''}</p>
          <div class="lf-lvs">${LVS.map(l => `<button type="button" class="lf-lv ${l}" data-bg="${b}" data-lv="${l}"><b>${esc(t('lv_' + l))}</b><span class="s" aria-label="${esc(t('stars', { n: best[b + '-' + l] || 0 }))}">${stars(best[b + '-' + l] || 0)}</span><small>${esc(t('lvd_' + l))}</small></button>`).join('')}</div></div>`;
      }).join('');
      $('#lfHow').innerHTML = `<h3>${t('howT')}</h3><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol>`;
    }

    function start(b, l) {
      bg = b; lv = l; seed = 1 + Math.floor(Math.random() * 1e6); G = L.create(b, l, seed); log = []; res = null; wise = null; cards = []; cur = null; row = null;
      ghostOn = false; infoKey = null; reactNow = null; prevAge = null; gPrev = {};
      $('#lfSelect').hidden = true; $('#lfPlay').hidden = false; $('#lfScroll').scrollTop = 0;
      phase = 'ready'; render();
    }

    /* ---------- year flow ---------- */
    function beginYear() {
      const out = L.begin(G); sfx('open'); reactNow = null;
      cards = out.later.map(l => ({ kind: 'later', l })).concat(G.queue.map(e => ({ kind: 'event', e })));
      phase = 'cards'; nextCard();
    }
    function nextCard() {
      cur = cards.shift(); shown = null; reactNow = cur && cur.kind === 'later' ? { id: cur.l.key, fx: cur.l.fx } : null;
      if (!cur) { row = L.finish(G); phase = 'summary'; $('#lfSr').textContent = t('srYear', { age: G.age }); }
      render();
    }
    function pickOption(i) {
      const e = cur.e; if (!L.can(G, e, i)) return;
      const age = G.age, r = L.choose(G, i); sfx('tick');
      log.push({ age, id: e.id, opt: e.opts[i].id });
      shown = r; reactNow = { id: e.id, fx: r.fx }; render();
    }
    function mergeFx(fx) { const m = {}; (fx || []).forEach(([k, v]) => { m[k] = (m[k] || 0) + v; }); return Object.keys(m).filter(k => Math.abs(m[k]) > 0.0001).map(k => [k, m[k]]); }
    function fxChips(fx) {
      return '<div class="lf-fx">' + mergeFx(fx).map(([k, v]) => {
        const good = (k === 'debt' || k === 'house' && false) ? v < 0 : v > 0;
        const txt = k === 'salary' ? (v > 0 ? '+' : '−') + Math.round(Math.abs(v) * 100) + '%' : k === 'joy' ? (v > 0 ? '+' : '−') + Math.abs(v).toFixed(1) : (v > 0 ? '+' : '') + fmt(v);
        return `<span class="fx ${good ? 'lf-up' : 'lf-dn'}">${esc(t('fx_' + k))} ${esc(txt)}</span>`;
      }).join('') + '</div>';
    }
    const I18NK = () => ({ ev_promo_r_win: 1, ev_promo_r_lose: 1, ev_offer_r_win: 1, ev_offer_r_lose: 1, ev_study_r_win: 1, ev_house_r_win: 1 });

    /* ---------- render ---------- */
    function hud() {
      const h = G.hist[G.hist.length - 1], j = G.joy.length ? G.joy[G.joy.length - 1] : null;
      $('#lfHud').innerHTML = `<span class="sc-chip lf-chip">${esc(t('bg_' + bg))} · ${esc(t('lv_' + lv))}</span><span class="sc-chip lf-chip age">${esc(t('ageLbl', { age: Math.min(G.age, L.END) }))} · ${esc(t('yearOf', { n: Math.min(G.y + 1, L.YEARS) }))}</span>
        <span class="sc-chip lf-chip">${esc(t('nwNom'))}: ${esc(fmt(h.nw))}</span><span class="sc-chip lf-chip">${esc(t('nwReal'))}: ${esc(fmt(h.real))}</span>${j === null ? '' : `<span class="sc-chip lf-chip">😊 ${j.toFixed(1)}/10</span>`}
        <button type="button" class="sc-chip lf-chip btn" id="lfToLives">${esc(t('btnChains'))}</button>`;
    }
    function side() {
      const a = [['cash', G.cash], ['dep', G.dep], ['fund', G.fund], ['gold', G.gold], ['house', G.house ? G.house.value : 0]], debt = L.debt(G);
      const rows = a.filter(r => r[1] > 0.05 || r[0] === 'cash').map(r => `<div class="r"><span>${esc(t('a_' + r[0]))}</span><b>${esc(fmt(r[1]))}</b></div>`).join('') +
        G.loans.map(l => `<div class="r debt"><span>${esc(t('a_debt'))}: ${esc(l.name === 'edu' ? '🎓' : l.name === 'KPR' ? '🏠' : l.name === 'car' ? '🚗' : l.name === 'pinjol' ? '⚠️' : '👪')} ${(l.rate * 100).toFixed(1)}%</span><b>−${esc(fmt(l.bal))}</b></div>`).join('');
      const locked = phase === 'cards' && cur && cur.kind === 'event' && !shown;
      $('#lfSide').innerHTML = gauges() + `<div class="lf-box"><h3>${esc(t('assetsT'))}</h3>${rows}</div>
        <div class="lf-box"><h3>${esc(t('planT'))}</h3>
          <div class="lf-seg" role="group" aria-label="${esc(t('pl_style'))}">${[0, 1, 2].map(i => `<button type="button" data-ls="${i}" class="${G.lifestyle === i ? 'on' : ''}">${esc(t('ls_' + i))}</button>`).join('')}</div>
          <label for="lfSave" class="lf-lb">${esc(t('pl_save', { n: Math.round(G.saveRate * 100) }))}</label><input type="range" id="lfSave" min="0" max="100" step="5" value="${Math.round(G.saveRate * 100)}">
          <label for="lfMix" class="lf-lb">${esc(t('pl_mix'))}</label><select id="lfMix">${Object.keys(L.MIX).map(k => `<option value="${k}"${G.mix === k ? ' selected' : ''}>${esc(t('mx_' + k))}</option>`).join('')}</select>
          <label class="lf-chk"><input type="checkbox" id="lfExtra"${G.extra ? ' checked' : ''}> ${esc(t('pl_extra'))}</label>
          <p class="sc-sub lf-sub sm">${esc(t('pl_note'))}</p></div>`;
      requestAnimationFrame(() => requestAnimationFrame(() => root.querySelectorAll('.lf-gg i[data-w]').forEach(n => { n.style.width = n.dataset.w + '%'; })));
    }
    const realRet = (r, i) => Math.round(((1 + r) / (1 + i) - 1) * 1000) / 10;
    const WX = { bull: '☀️', normal: '🌤️', bear: '☁️', crisis: '⛈️' };
    const meal = c => t('cur') + ' ' + (Math.round(15000 * c / 500) * 500).toLocaleString(t('numLoc'));
    const sgn = v => (v > 0 ? '+' : '') + v;
    const stageOf = a => a < 30 ? 0 : a < 40 ? 1 : a < 50 ? 2 : a < 58 ? 3 : 4;
    function scene() {
      const S = G, w = S.y > 0 ? S.W[S.y - 1] : null, j = S.joy.length ? S.joy[S.joy.length - 1] : null, age = Math.min(S.age, L.END);
      const face = j === null ? '🙂' : j >= 6.5 ? '😊' : j >= 4 ? '😐' : '😟';
      const pic = Sc.svg(S, { aria: t('sceneAria', { age }), debt: d => '💳 −' + fmt(d), lab: k => t('ih_' + k), ghost: ghostOn, react: reactNow, prevAge });
      prevAge = S.age;
      $('#lfScene').innerHTML = `<div class="lf-ovr"><div class="lf-sov"><b>${esc(t('ageLbl', { age }))}</b><span>${esc(t('st_' + stageOf(S.age)))}</span><div class="lf-world" title="${esc(t('lvt_' + lv))}"><span aria-hidden="true">${ICON[bg]}</span>${esc(t('dis_' + bg))} <i class="${lv}">${esc(t('lva_' + lv))}</i></div></div>
        <div class="lf-hcs"><button type="button" class="lf-hc" data-h="sky">${w ? WX[w.reg] + ' ' + esc(t('reg_' + w.reg)) : WX.normal + ' ' + esc(t('ih_sky'))}</button><button type="button" class="lf-hc" data-h="price">🍚 ${esc(meal(S.cpi))}</button><button type="button" class="lf-hc" data-h="me" aria-label="${esc(t('ih_me'))}">${face}</button></div></div>` +
        pic + '<div class="lf-info" id="lfInfo" aria-live="polite"></div>' + Sc.timeline(log, S, x => t('ev_' + x.id));
      showInfo();
    }
    const tgtMult = a => { const P = [[22, 0], [30, 1], [40, 3], [50, 6], [60, 8], [62, 9]]; for (let i = 1; i < P.length; i++) if (a <= P[i][0]) return P[i - 1][1] + (P[i][1] - P[i - 1][1]) * (a - P[i - 1][0]) / (P[i][0] - P[i - 1][0]); return 9; };
    function info(key) {
      const S = G, B = S.B, cpi = S.cpi, rows = [];
      const add = (txt, tip) => rows.push(`<li${tip ? ' class="tip"' : ''}>${tip ? '🪞 ' : ''}${esc(txt)}</li>`);
      if (key === 'home') {
        const hi = Sc.homeInfo(S); add(t('ht_' + hi.tier) + t(hi.own ? 'hm_owned' : 'hm_rented'));
        if (hi.own) { add(t('hm_val', { val: fmt(S.house.value), real: fmt(S.house.value / cpi) })); const ln = S.loans.find(l => l.name === S.house.loanName); add(ln ? t('hm_loan', { bal: fmt(ln.bal), rate: (ln.rate * 100).toFixed(1) }) : t('hm_free')); add(t('hm_tip_own'), 1); }
        else { add(t('hm_rent', { rent: fmt(B.rent * cpi * (S.spouse ? 1.3 : 1)) })); add(t('hm_tip_rent'), 1); }
      } else if (key === 'work') {
        if (S.retired) add(t('wk_ret')); else {
          add(t('jb_' + Math.min(3, S.job))); if (S.gap > 0.02) add(t('wk_off'));
          const st = B.salary * S.D.sal, ch = Math.round((S.salary / cpi / st - 1) * 100);
          add(t('wk_pay', { nom: fmt(S.salary), real: fmt(S.salary / cpi), start: fmt(st) })); add(t('wk_tip', { chg: sgn(ch) + '%' }), 1);
        }
      } else if (key === 'jar') {
        const liq = L.liquid(S), parts = ['cash', 'dep', 'fund', 'gold'].filter(k => S[k] > 0.05).map(k => t('a_' + k) + ' ' + fmt(S[k])).join(' · ');
        add(t('jr_liq', { liq: fmt(liq), parts: parts || '—' })); add(t('jr_real', { real: fmt(liq / cpi) })); add(t('jr_cpi', { x: cpi.toFixed(2), one: fmt(1), now: fmt(cpi) }));
        add(t('jr_plan', { n: Math.round(S.saveRate * 100), mix: t('mx_' + S.mix) })); add(t('jr_tip'), 1);
      } else if (key === 'sky') {
        const w = S.y > 0 ? S.W[S.y - 1] : null;
        if (!w) add(t('sk_none')); else { add(t('sk_last', { reg: t('reg_' + w.reg), fund: sgn(pct(w.fund)), gold: sgn(pct(w.gold)), dep: sgn(pct(w.dep)), infl: sgn(pct(w.infl)) })); add(t('sk_tip'), 1); }
      } else if (key === 'price') {
        add(t('pr_meal', { a: meal(1), b: meal(cpi) })); add(t('pr_x', { x: cpi.toFixed(2) }), 1);
      } else if (key === 'me') {
        const j = S.joy.length ? S.joy[S.joy.length - 1] : null;
        add(t('me_age', { age: Math.min(S.age, L.END), stage: t('st_' + stageOf(S.age)) })); add(t('me_style', { ls: t('ls_' + S.lifestyle) })); add(j === null ? t('me_nojoy') : t('me_joy', { n: j.toFixed(1) })); add(t('me_tip' + S.lifestyle), 1);
      } else if (key === 'family') {
        if (!S.spouse && !S.kids.length) add(t('fm_none')); else { if (S.spouse) add(t('fm_sp', { sal: fmt(S.spouseSal) })); if (S.kids.length) add(t('fm_kids', { n: S.kids.length, cost: fmt(L.kidCost(S)) })); add(t('fm_tip'), 1); }
      } else if (key === 'car') {
        add(t('cr_text', { cost: fmt(B.car * 0.09 * cpi) })); const ln = S.loans.find(l => l.name === 'car'); if (ln) add(t('cr_loan', { bal: fmt(ln.bal), rate: (ln.rate * 100).toFixed(1) })); add(t('cr_tip'), 1);
      } else if (key === 'ghost') {
        const W = ensureWise(), y = Math.min(S.y, W.s.hist.length - 1), wv = W.s.hist[y].real, mv = S.hist[Math.min(S.y, S.hist.length - 1)].real, d = mv - wv;
        add(t('gh_cmp', { w: fmt(wv), m: fmt(mv) })); add(d >= 0 ? t('gh_ahead', { d: fmt(d) }) : t('gh_behind', { d: fmt(-d) })); add(t('gh_tip'), 1);
      }
      return `<b>${esc(t('ih_' + key))}</b><ul>${rows.join('')}</ul>`;
    }
    function showInfo() {
      const el = $('#lfInfo'); if (!el || !G) return;
      root.querySelectorAll('.sel').forEach(n => n.classList.remove('sel'));
      if (infoKey === 'ghost' && !ghostOn) infoKey = null;
      const btn = phase === 'result' ? '' : `<div><button type="button" class="lf-ghbtn${ghostOn ? ' on' : ''}" id="lfGhost">${esc(t(ghostOn ? 'gh_hide' : 'gh_show'))}</button></div>`;
      el.innerHTML = (infoKey ? info(infoKey) : `<span class="hint">👆 ${esc(t('ih_hint'))}</span>`) + btn;
      if (infoKey) root.querySelectorAll('[data-h="' + infoKey + '"]').forEach(n => n.classList.add('sel'));
    }
    function gauges() {
      const S = G, cpi = S.cpi, liv = S.B.living * cpi * L.LIFE[S.lifestyle], mo = (S.cash + S.dep) / (liv / 12);
      const inc = Math.max(1, ((S.retired ? 0 : S.salary * (1 - S.gap)) + S.side) * 0.95 + (S.spouse ? S.spouseSal * 0.95 : 0));
      const dts = S.loans.reduce((a, l) => a + Math.min(l.pay, l.bal * (1 + l.rate)), 0) / inc, ref = S.retired ? (S.refInc || 1) : Math.max(1, S.salary / cpi);
      const mult = S.hist[S.hist.length - 1].real / ref, tg = tgtMult(Math.min(S.age, 62)), j = S.joy.length ? S.joy[S.joy.length - 1] : 5;
      const good = v => v >= 0.66 ? 'gd' : v >= 0.33 ? 'md' : 'bd2';
      const R = [['emg', clamp(mo / 6, 0, 1), t('g_emg_v', { n: Math.max(0, mo).toFixed(1) }), good(clamp(mo / 6, 0, 1))],
        ['grow', clamp(mult / Math.max(0.6, tg), 0, 1), t('g_grow_v', { x: mult.toFixed(1), y: Math.max(0.1, tg).toFixed(1) }), good(clamp(mult / Math.max(0.6, tg), 0, 1))],
        ['joy', clamp(j / 10, 0, 1), t('g_joy_v', { n: j.toFixed(1) }), good(clamp(j / 10, 0, 1))],
        ['debt', clamp(dts / 0.5, 0, 1), t('g_debt_v', { n: Math.round(dts * 100) }), dts < 0.2 ? 'gd' : dts < 0.35 ? 'md' : 'bd2']];
      const html = `<div class="lf-box"><h3>${esc(t('g_t'))}</h3><div class="lf-gg">${R.map(([k, v, txt, c]) => `<div class="gr2" title="${esc(t('g_' + k + '_d'))}"><span>${esc(t('g_' + k))}</span><b>${esc(txt)}</b><div class="tr ${c}"><i style="width:${Math.round((gPrev[k] != null ? gPrev[k] : 0) * 100)}%" data-w="${Math.round(v * 100)}"></i></div></div>`).join('')}</div></div>`;
      R.forEach(r => { gPrev[r[0]] = r[1]; });
      return html;
    }
    function bars(r) {
      const it = [['fx_fund', r.fund], ['fx_gold', r.gold], ['a_dep', r.dep], ['infLbl', -r.infl]];
      return '<div class="lf-rb">' + it.map(([k, v]) => { const w = Math.min(50, Math.abs(v) / 0.4 * 50).toFixed(0), neg = v < 0; return `<div class="rb"><span>${esc(t(k))}</span><div class="bar"><i class="${neg ? 'lf-dn' : 'lf-up'}" style="${neg ? 'right:50%' : 'left:50%'};width:${w}%"></i></div><b class="${neg ? 'lf-dn' : 'lf-up'}">${k === 'infLbl' ? '+' + pct(-v) : (v > 0 ? '+' : '') + pct(v)}%</b></div>`; }).join('') + '</div>';
    }
    function burst(fx) {
      const m = {}; (fx || []).forEach(([k, v]) => { m[k] = (m[k] || 0) + v; });
      const up = (m.cash > 0.5) || (m.salary > 0) || (m.joy > 0), dn = (m.cash < -0.5) || (m.salary < 0) || (m.joy < 0) || (m.debt > 0.5);
      const e = up && !dn ? '🪙' : dn && !up ? '💸' : '✨';
      return '<div class="lf-burst" aria-hidden="true">' + [0, 1, 2, 3, 4, 5].map(i => `<span style="left:${8 + i * 16}%;animation-delay:${i * 0.09}s">${e}</span>`).join('') + '</div>';
    }
    function stage() {
      let h = '';
      if (phase === 'ready') {
        h = `<div class="lf-card"><h3>${esc(t('ageLbl', { age: G.age }))}</h3><p class="sc-sub lf-sub">${esc(t('quiet'))}</p><button type="button" class="lf-main" id="lfBegin">${esc(t('btnBegin', { age: G.age }))}</button></div>`;
      } else if (phase === 'cards' && cur) {
        if (cur.kind === 'later') {
          h = `<div class="lf-card later">${Sc.banner(cur.l.key)}${burst(cur.l.fx)}<span class="lf-k">${esc(t('later'))}</span><h3>${esc(t('lt_' + cur.l.key))}</h3>${fxChips(cur.l.fx)}${cur.l.tag ? `<p class="lf-res ${cur.l.tag}">${esc(t('res_' + cur.l.tag))}</p>` : ''}<button type="button" class="lf-main" id="lfNext">${esc(t('btnNext'))}</button></div>`;
        } else {
          const e = cur.e, p = e.p(G);
          if (!shown) {
            h = `<div class="lf-card ev">${Sc.banner(e.id)}<span class="lf-k">${esc(t('evT'))}</span><h3>${esc(evT(e, '', p))}</h3><p>${esc(evT(e, 'd', p))}</p>${G.D.hint ? `<p class="lf-hint">💡 <b>${esc(t('hintLbl'))}:</b> ${esc(evT(e, 'h', p))}</p>` : ''}
              <div class="lf-opts">${e.opts.map((o, i) => { const ok = L.can(G, e, i); return `<button type="button" class="lf-opt" data-o="${i}"${ok ? '' : ' disabled'}>${esc(evT(e, o.id, p))}${ok ? '' : `<small>${esc(t('disabled'))}</small>`}</button>`; }).join('')}</div></div>`;
          } else {
            const tagk = shown.tag ? (('ev_' + e.id + '_r_' + shown.tag) in I18NK() ? 'ev_' + e.id + '_r_' + shown.tag : 'res_' + shown.tag) : null;
            h = `<div class="lf-card ev done">${Sc.banner(e.id)}${burst(shown.fx)}<span class="lf-k">${esc(t('evT'))}</span><h3>${esc(evT(e, '', p0(e)))}</h3><p class="lf-pick">▶ ${esc(shownLabel(e))}</p>${fxChips(shown.fx)}${tagk ? `<p class="lf-res ${shown.tag}">${esc(t(tagk))}</p>` : ''}<button type="button" class="lf-main" id="lfNext">${esc(t('btnNext'))}</button></div>`;
          }
        }
      } else if (phase === 'summary' && row) {
        h = `<div class="lf-card sum"><span class="lf-k">${esc(t('ysT'))} · ${esc(t('ageLbl', { age: row.age }))}</span><div class="lf-ban wx" aria-hidden="true"><span>${WX[row.reg]}</span></div><h3 class="reg ${row.reg}">${esc(t('reg_' + row.reg))}</h3>
          ${bars(row)}
          <p class="lf-mirror">🪞 ${esc(t('ysMirror', { dep: sgn(realRet(row.dep, row.infl)), fund: sgn(realRet(row.fund, row.infl)), gold: sgn(realRet(row.gold, row.infl)), loss: fmt(G.cash * row.infl / (1 + row.infl)) }))}</p>
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
      hud(); scene(); side(); stage();
      chartPlay();
    }
    function chartPlay() {
      const se = [{ d: G.hist.map(h => h.nw), c: 'c-n' }, { d: G.hist.map(h => h.real), c: 'c-r' }], lg = [{ c: 'c-n', t: t('lgNom') }, { c: 'c-r', t: t('lgReal') }];
      if (ghostOn) { se.push({ d: ensureWise().s.hist.slice(0, G.hist.length).map(h => h.real), c: 'c-w', dash: true }); lg.push({ c: 'c-w', t: t('lgWise'), dash: true }); }
      $('#lfChart').innerHTML = `<h3>${esc(t('chartT'))}</h3>${chart(se, t('chartT'))}${legend(lg)}`;
    }

    /* ---------- results ---------- */
    function results() {
      const firstTime = !res;
      res = res || L.result(G);
      if (!wise) wise = L.wisePlay(bg, lv, seed);
      const r = res, k = bg + '-' + lv; if ((best[k] || 0) < r.stars) { best[k] = r.stars; saveBest(); cloud.changed(); }
      if (firstTime) cloud.attempt({ at: Date.now(), score: Math.round(r.stars / 3 * 60 + Math.max(0, Math.min(100, r.joy)) * 0.4), variant: k, detail: { stars: r.stars, joy: r.joy, years: r.years } });
      hud(); scene(); side();
      const has = (id, o) => log.some(x => x.id === id && x.opt === o), I = [];
      if (G.flags.pinjol || log.some(x => x.id === 'bill' && x.opt === 'b')) I.push('rd_pinjol');
      if (has('crash', 'a')) I.push('rd_panic');
      if (has('scam', 'a')) I.push('rd_scam');
      if (has('dplk', 'c')) I.push('rd_dplk');
      if (has('car', 'a')) I.push('rd_car');
      if (G.cash > 3 * G.B.living * G.cpi && G.cash > 0.25 * L.liquid(G)) I.push('rd_cash');
      I.push(r.years >= 25 ? 'rd_good' : 'rd_low'); if (r.joy < 45) I.push('rd_joy');
      const wy = wise.res.years;
      $('#lfStage').innerHTML = `<div class="lf-card res"><div class="sc-rh lf-rh"><h2>${esc(t('rsT'))}</h2><span class="sc-stars lf-stars" aria-label="${esc(t('stars', { n: r.stars }))}">${stars(r.stars)}</span></div>
        <p class="lf-big">${esc(t('rsYears', { n: Math.round(r.years), age: Math.round(r.endAge) }))}</p>
        <div class="lf-kv"><div><span>${esc(t('rsWealth'))}</span><b>${esc(fmt(r.wReal))}</b></div><div><span>${esc(t('rsNeed'))}</span><b>${esc(fmt(r.expenses))}</b></div></div>
        <p>${esc(t('rsJoy', { n: r.joy }))}</p><p>${esc(t('rsWise', { n: Math.round(wy) }))}</p><p class="sc-sub lf-sub sm">${esc(t('rsBest', { n: best[k] }))}</p>
        <div class="lf-less"><h3>${esc(t('rsLessT'))}</h3><ul>${I.map(x => `<li>${esc(t(x))}</li>`).join('')}</ul></div>
        <details class="lf-log"><summary>${esc(t('rsLogOpen'))}</summary><ol>${log.map(x => { const e = EV.LIST.find(y => y.id === x.id); return `<li><b>${x.age}</b> · ${esc(t('ev_' + x.id, {}))} → ${esc(t('ev_' + x.id + '_' + x.opt, {}).replace(/\{[^}]+\}/g, '…'))}</li>`; }).join('')}</ol></details>
        <div class="sc-end lf-end"><button type="button" class="lf-main" id="lfAgain">${esc(t('rsAgain'))}</button><button type="button" id="lfToLives2">${esc(t('rsOther'))}</button></div></div>`;
      $('#lfChart').innerHTML = `<h3>${esc(t('rsPath'))}</h3>${chart([{ d: G.hist.map(h => h.nw), c: 'c-n' }, { d: G.hist.map(h => h.real), c: 'c-r' }, { d: wise.s.hist.map(h => h.real), c: 'c-w', dash: true }], t('rsPath'))}${legend([{ c: 'c-n', t: t('lgNom') }, { c: 'c-r', t: t('lgReal') }, { c: 'c-w', t: t('lgWise'), dash: true }])}`;
    }

    /* ---------- events ---------- */
    function toLives() { $('#lfPlay').hidden = true; $('#lfSelect').hidden = false; phase = 'select'; G = null; selectScreen(); $('#lfScroll').scrollTop = 0; }
    root.addEventListener('click', e => {
      const x = e.target;
      const lvb = x.closest('.lf-lv'); if (lvb) { sfx('open'); return start(lvb.dataset.bg, lvb.dataset.lv); }
      const pvb = x.closest('.lf-pvt button'); if (pvb) { const c = pvb.closest('.lf-life'); return setPrev(c.dataset.bg, pvb.dataset.pv); }
      if (x.closest('#lfGhost')) { ghostOn = !ghostOn; if (ghostOn) { ensureWise(); infoKey = 'ghost'; } reactNow = null; scene(); if (phase !== 'result') chartPlay(); return; }
      const hh = x.closest('[data-h]'); if (hh && G && !$('#lfPlay').hidden) { sfx('tick'); infoKey = infoKey === hh.dataset.h ? null : hh.dataset.h; return showInfo(); }
      if (x.closest('#lfToLives') || x.closest('#lfToLives2')) return toLives();
      if (x.closest('#lfBegin')) return beginYear();
      if (x.closest('#lfNext')) return nextCard();
      if (x.closest('#lfCont')) { if (G.over) { phase = 'result'; return render(); } phase = 'ready'; return render(); }
      if (x.closest('#lfAgain')) return start(bg, lv);
      const o = x.closest('.lf-opt'); if (o && !o.disabled) return pickOption(+o.dataset.o);
      const ls = x.closest('[data-ls]'); if (ls && G) { G.lifestyle = +ls.dataset.ls; reactNow = null; side(); return scene(); }
    });
    root.addEventListener('input', e => {
      if (!G) return;
      if (e.target.id === 'lfSave') { G.saveRate = +e.target.value / 100; const lb = $('label[for=lfSave]'); if (lb) lb.textContent = t('pl_save', { n: Math.round(G.saveRate * 100) }); }
      if (e.target.id === 'lfExtra') G.extra = e.target.checked;
    });
    root.addEventListener('change', e => { if (G && e.target.id === 'lfMix') G.mix = e.target.value; if (G && e.target.id === 'lfExtra') G.extra = e.target.checked; if (G && e.target.id === 'lfSave') { reactNow = null; scene(); } });
    root.addEventListener('mouseover', e => { const b = e.target.closest && e.target.closest('.lf-lv'); if (b) setPrev(b.dataset.bg, b.dataset.lv); });
    root.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.hot')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });

    this.refresh = () => { selectScreen(); if (G && !$('#lfPlay').hidden) render(); };
    selectScreen();
  },
  onShow() { },
  onLang() { if (this.refresh) this.refresh(); },
  onTheme() { }
});
