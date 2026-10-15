/* Koperasi: UI wiring. Rules live in engine/engine.js, stories in data/events.js, drawing in scene/scene.js. */
const gtr = (k, p) => t(k, p);   /* global translator; mount() shadows t with a mode-aware one */
MBALAB.sims.define('koperasi-tycoon', {
  mount(host) {
    const E = MBALAB.coop, $ = s => host.querySelector(s), sfx = MBALAB.util.sfx;
    const still = () => document.body.classList.contains('still');
    const KEY = 'mbalab-kp-best', MODES = ['village', 'remote', 'fishing'], PRE = { remote: 're_', fishing: 'fi_' };
    let mode = 'village'; const bests = { village: 0, remote: 0, fishing: 0 };
    const kfor = m => (m === 'village' ? KEY : KEY + '-' + m);
    MODES.forEach(m => { try { bests[m] = +localStorage.getItem(kfor(m)) || 0; } catch (e) {} });
    const top = () => Math.max(bests.village, bests.remote, bests.fishing);
    const saveBest = () => MODES.forEach(m => { try { localStorage.setItem(kfor(m), String(bests[m])); } catch (e) {} });
    const cloud = MBALAB.cloud('koperasi-tycoon', { read: () => top(), write: n => { bests.village = Math.max(bests.village, +n || 0); saveBest(); }, merge: (a, b) => Math.max(+a || 0, +b || 0), refresh: () => bestLine() });
    /* mode-aware text: a key such as re_kpIntro overrides kpIntro in the highland village */
    const gt = gtr;
    const t = (k, p) => { const pre = PRE[mode]; if (pre) { const r = gt(pre + k, p); if (r !== pre + k) return r; } return gt(k, p); };

    const cv = $('#kpCv'), scene = E.Scene(cv), panel = $('#kpPanel');
    let gs = null, plan = null, visible = false, view = null, ratRes = null, reported = false;
    const tx = k => { const s = t(k); return s === k ? '' : s; };
    const M = n => t('kpMoney', { n: Math.round(n) });
    const sgn = n => (n >= 0 ? '+' : '−') + Math.abs(Math.round(n));
    const cls = n => (n >= 0 ? 'kp-pos' : 'kp-neg');
    const acts = () => E.MODES[mode].cfg.acts || ['none', 'marketing', 'visit', 'collect', 'training', 'social', 'storage', 'digital'];

    function bestLine() { const b = bests[mode]; $('#kpBest').textContent = b ? t('kpBest', { n: b }) : ''; }
    function picker() {
      $('#kpPick').innerHTML = `<h3>${t('modePick')}</h3><p>${t('modeSub')}</p><div class="kp-modes" role="radiogroup">${MODES.map(m => `<button type="button" role="radio" aria-checked="${m === mode}" class="kp-mode kp-m-${m} ${m === mode ? 'on' : ''}" data-mode="${m}"><span class="kp-mi" aria-hidden="true"></span><b>${gt('mode_' + m + '_t')}</b><em>${gt('mode_' + m + '_lv')}</em><small>${gt('mode_' + m + '_d')}</small>${bests[m] ? `<i>★ ${bests[m]}</i>` : ''}</button>`).join('')}</div>`;
      $('#kpIntroT').textContent = t('kpIntroT'); $('#kpIntro').textContent = t('kpIntro'); $('#kpGo').textContent = gt('modeStart'); how(); bestLine();
    }
    function how() { $('#kpHow').innerHTML = `<h3>${t('howT')}</h3><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol>`; }

    /* ---------- hud, bars, scene ---------- */
    function hud() {
      if (!gs) return;
      const s = gs;
      $('#kpWhen').textContent = t('kpYear', { n: Math.min(8, E.year(s) + 1) }) + ' · ' + t('sn' + E.season(s));
      $('#kpCash').textContent = t('kpCash', { n: Math.round(s.cash) });
      $('#kpTrust').textContent = t('kpTrust', { n: Math.round(E.trust(s)) });
      const d = $('#kpDebt'); d.hidden = s.debt < 1; d.textContent = t('kpDebt', { n: Math.round(s.debt) });
      $('#kpSat').innerHTML = E.SEGS.map(k => { const x = s.sat[k]; return `<div class="kp-seg"><b>${t('seg_' + k)}</b><div class="kp-bar" role="img" aria-label="${t('seg_' + k)} ${Math.round(x)}"><i style="width:${x}%;background:${x >= 62 ? 'var(--gn)' : x >= 42 ? 'var(--am)' : 'var(--rd)'}"></i></div></div>`; }).join('');
      const fl = s.shocks.defMul[1] > 0 && s.shocks.defMul[0] >= 1.5 ? .85 : 0;
      scene.set({ mode: s.mode, season: E.season(s), goods: s.goods, rice: s.rice, comp: s.comp, sat: s.sat, digital: s.inv.digital, storage: s.inv.storage, road: s.inv.road, solar: s.inv.solar, signal: s.inv.digital, boat: s.inv.boat || 0, tpi: s.inv.tpi, cut: s.report && s.report.cut ? 1 : 0, flood: fl, rain: fl, cash: s.cash });
    }

    /* ---------- phases ---------- */
    function render() {
      if (!gs) return; hud();
      const ph = gs.phase;
      if (view) return view();
      if (ph === 'event') return renderEvent();
      if (ph === 'plan') return renderPlan();
      if (ph === 'report') return renderReport();
      if (ph === 'rat') return renderRat();
      return renderEnd();
    }
    const put = html => { panel.style.animation = 'none'; panel.offsetHeight; panel.style.animation = ''; panel.innerHTML = html; };
    const goOn = fn => { view = null; if (fn) fn(); render(); };

    function renderEvent() {
      const ev = E.eventOf(gs), id = ev.id;
      put(`<span class="kp-tag">${t('kpEvent')}</span><h2>${t('ev_' + id + '_t')}</h2><p>${t('ev_' + id + '_b')}</p>
        <div class="kp-choices">${ev.choices.map(c => `<button type="button" class="kp-choice" data-c="${c.id}">${t('ev_' + id + '_' + c.id)}</button>`).join('')}</div>`);
    }
    function afterChoice(ev, c) {
      const base = 'ev_' + ev.id + '_' + c.id, res = gs.lastChoice && gs.lastChoice.res;
      const a = tx(base + 'r'), b = res ? tx(base + res) : '';
      view = () => { hud(); put(`<span class="kp-tag">${t('kpOutcome')}</span><h2>${t('ev_' + ev.id + '_t')}</h2>${a ? `<p>${a}</p>` : ''}${b ? `<p class="kp-result">${b}</p>` : ''}<button type="button" class="kp-main" data-a="cont">${t('kpContinue')}</button>`); };
      hud(); view();
    }

    /* ---------- plan ---------- */
    function renderPlan() {
      if (!plan) plan = E.defaults();
      const s = gs, d = plan, u = k => E.unlocked(s, k);
      const slider = (id, lbl, min, max, step, val, out) => `<div class="kp-f"><label for="kp_${id}">${lbl}<output id="kpo_${id}">${out}</output></label><input type="range" id="kp_${id}" min="${min}" max="${max}" step="${step}" value="${val}"></div>`;
      const seg = (id, lbl, names, val) => `<div class="kp-f"><span class="lb">${lbl}</span><div class="kp-seg3" data-seg="${id}">${names.map((n, i) => `<button type="button" data-v="${i}" class="${i === val ? 'on' : ''}">${t(n)}</button>`).join('')}</div></div>`;
      put(`<h2>${t('planT')}</h2>
        <div class="kp-grid">
          ${slider('markup', t('plMarkup'), 5, 30, 1, Math.round(d.markup * 100), Math.round(d.markup * 100) + '%')}
          ${slider('restock', t('plRestock'), 0, 320, 5, d.restock, d.restock)}
          ${slider('riceBuy', t('plRiceBuy'), 0, E.cfg(gs).maxBuy || 50, 1, d.riceBuy, d.riceBuy)}
          ${slider('ricePay', t('plRicePay'), 85, 120, 1, Math.round(d.ricePay * 100), '×' + d.ricePay.toFixed(2))}
          ${seg('rate', t('plRate'), ['low', 'std', 'high'], d.rate)}
          ${seg('screen', t('plScreen'), ['loose', 'normal', 'strict'], d.screen)}
        </div>
        <div class="kp-f"><span class="lb">${t('plAction')}</span><div class="kp-acts">${acts().map(k => `<button type="button" class="kp-act ${d.action === k ? 'on' : ''}" data-act="${k}" ${u(k) ? '' : 'disabled'}>${t('act_' + k)}<small>${k === 'none' ? '—' : M(E.INVEST[k])}</small></button>`).join('')}</div></div>
        <div><span class="lb" style="font-weight:700;font-size:12.5px">${t('pvT')}</span><div class="kp-prev" id="kpPrev"></div></div>
        <button type="button" class="kp-main" data-a="run">${t('kpRun')}</button>`);
      preview();
    }
    function preview() {
      const r = E.preview(gs, plan), el = $('#kpPrev'); if (!el) return;
      el.innerHTML = `<div class="kp-kpi"><small>${t('pvProfit')}</small><b class="${cls(r.profit)}">${sgn(r.profit)}</b></div><div class="kp-kpi"><small>${t('pvCash')}</small><b class="${r.cashEnd < 20 ? 'kp-neg' : ''}">${Math.round(r.cashEnd)}</b></div><div class="kp-kpi"><small>${t('pvStock')}</small><b>${Math.round(gs.goods + r.goodsBought - r.sold)}</b></div>`;
    }
    panel.addEventListener('input', e => {
      const el = e.target; if (!plan || !el.id || !el.id.startsWith('kp_')) return; const k = el.id.slice(3), x = +el.value, o = $('#kpo_' + k);
      if (k === 'markup') { plan.markup = x / 100; o.textContent = x + '%'; } else if (k === 'restock') { plan.restock = x; o.textContent = x; } else if (k === 'riceBuy') { plan.riceBuy = x; o.textContent = x; } else if (k === 'ricePay') { plan.ricePay = x / 100; o.textContent = '×' + (x / 100).toFixed(2); }
      preview();
    });

    /* ---------- report ---------- */
    function renderReport() {
      const R = gs.report; if (!R) return;
      const rows = [['rpRevGoods', R.revGoods - R.cogs], ['rpRevRice', R.revRice - R.cogsRice], ['rpInterest', R.interest], ['rpDefaults', -R.defaults], ['rpOverhead', -R.overhead], ['rpInvest', -R.invest * (['storage', 'digital'].includes(R.action) ? .3 : 1)]];
      const pts = gs.hist.map(h => h.eq), mn = Math.min.apply(null, pts), mx = Math.max.apply(null, pts), sp = pts.length > 1 ? pts.map((p, i) => `${(i / (pts.length - 1) * 300).toFixed(1)},${(56 - (p - mn) / ((mx - mn) || 1) * 50).toFixed(1)}`).join(' ') : '';
      put(`<h2>${t('rpT')}</h2><div class="kp-rows">${rows.map(r => `<div><span>${t(r[0])}</span><b class="${cls(r[1])}">${sgn(r[1])}</b></div>`).join('')}<div class="tot"><span>${t('rpProfit')}</span><b class="${cls(R.profit)}">${sgn(R.profit)}</b></div></div>
        ${R.lost > R.demand * .1 ? `<p class="kp-note">${t('rpLost', { n: Math.round(R.lost) })}</p>` : ''}${R.cut ? `<p class="kp-note">${t('rpRoad')}</p>` : ''}${R.spoil > 3 ? `<p class="kp-note">${t('rpSpoil', { n: Math.round(R.spoil) })}</p>` : ''}${R.borrowed ? `<p class="kp-note">${t('rpBorrow', { n: Math.round(R.borrowed) })}</p>` : ''}
        ${sp ? `<svg class="kp-spark" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><polyline points="${sp}" fill="none" stroke="var(--cy)" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg>` : ''}
        <button type="button" class="kp-main" data-a="next">${gs.over ? t('kpContinue') : t('kpContinue')}</button>`);
    }

    /* ---------- annual meeting ---------- */
    let alloc = { members: 40, reserve: 40 };
    function renderRat() {
      const info = E.ratInfo(gs), P = Math.max(0, info.profit), so = 100 - alloc.members - alloc.reserve;
      put(`<span class="kp-tag">${t('ratT')}</span><p>${t('ratSub', { n: info.year, p: Math.round(info.profit) })}</p>
        ${P <= 0 ? `<p class="kp-result">${t('ratLoss')}</p>` : `<div class="kp-grid">
          <div class="kp-f"><label for="kp_m">${t('ratMembers')}<output id="kpo_m">${alloc.members}%</output></label><input type="range" id="kp_m" min="0" max="80" step="5" value="${alloc.members}"></div>
          <div class="kp-f"><label for="kp_r">${t('ratReserve')}<output id="kpo_r">${alloc.reserve}%</output></label><input type="range" id="kp_r" min="0" max="${100 - alloc.members}" step="5" value="${Math.min(alloc.reserve, 100 - alloc.members)}"></div></div>
          <p class="kp-note" id="kpSplit">${t('ratSplit', { a: alloc.members, b: alloc.reserve, c: so })}</p>`}
        <button type="button" class="kp-main" data-a="rat">${t('ratGo')}</button>`);
    }
    panel.addEventListener('input', e => {
      if (e.target.id !== 'kp_m' && e.target.id !== 'kp_r') return;
      alloc.members = +$('#kp_m').value; const r = $('#kp_r'); r.max = 100 - alloc.members; alloc.reserve = Math.min(+r.value, 100 - alloc.members); r.value = alloc.reserve;
      $('#kpo_m').textContent = alloc.members + '%'; $('#kpo_r').textContent = alloc.reserve + '%'; $('#kpSplit').textContent = t('ratSplit', { a: alloc.members, b: alloc.reserve, c: 100 - alloc.members - alloc.reserve });
    });
    function showRatResult(r) {
      const lbl = r.out === 'pass' ? t('ratPass') : r.out === 'warn' ? t('ratWarn') : t('ratOut'), pc = Math.round(r.support * 100), need = r.out === 'pass' ? 0 : 0;
      view = () => { hud(); put(`<span class="kp-tag">${t('ratT')}</span><h2 class="${r.out === 'pass' ? 'kp-pos' : 'kp-neg'}">${lbl}</h2><div class="kp-vote"><i id="kpVi" style="width:0;background:${r.out === 'pass' ? 'var(--gn)' : r.out === 'warn' ? 'var(--am)' : 'var(--rd)'}"></i><u style="left:50%"></u></div><p>${t('ratSupport', { n: pc })}</p><button type="button" class="kp-main" data-a="cont">${t('kpContinue')}</button>`); setTimeout(() => { const i = $('#kpVi'); if (i) i.style.width = Math.min(100, pc) + '%'; }, 30); };
      scene.fx(r.out === 'pass' ? 'cheer' : 'warn'); sfx(r.out === 'pass' ? 'win' : 'lose'); view();
    }

    /* ---------- ending ---------- */
    function renderEnd() {
      const r = E.result(gs), P = r.parts;
      if (!reported) { reported = true; if (r.score > bests[mode]) { bests[mode] = r.score; saveBest(); cloud.changed(); } cloud.attempt({ at: Date.now(), score: r.score, variant: mode === 'village' ? 'main' : mode, detail: { ending: r.ending, years: Math.ceil(r.turns / 4) } }); bestLine(); scene.fx(r.score >= 58 ? 'cheer' : 'warn'); }
      put(`<div class="kp-end" style="display:flex;flex-direction:column;gap:10px"><span class="kp-tag">${t('endT')}</span><h2>${t('end_' + r.ending)}</h2><div class="kp-score">${t('endScore', { n: r.score })}</div><p>${t('endb_' + r.ending)}</p>
        <div class="kp-parts">${[['pfin', P.fin], ['ptrust', P.trust], ['pindep', P.indep], ['psoc', P.social], ['peth', P.ethics]].map(([k, x]) => `<div class="kp-seg"><b>${t(k)} · ${x}</b><div class="kp-bar"><i style="width:${x}%;background:${x >= 62 ? 'var(--gn)' : x >= 42 ? 'var(--am)' : 'var(--rd)'}"></i></div></div>`).join('')}</div>
        <h3>${t('endLessons')}</h3><ul class="kp-lessons">${r.lessons.map(l => `<li>${t(l)}</li>`).join('')}</ul>
        <button type="button" class="kp-main" data-a="again">${t('kpAgain')}</button></div>`);
    }

    /* ---------- actions ---------- */
    function newGame() {
      gs = E.create((Math.random() * 1e9) | 0, mode); cv.setAttribute('aria-label', t('stageAria')); plan = null; view = null; ratRes = null; reported = false; alloc = { members: 40, reserve: 40 };
      $('#kpStart').hidden = true; $('#kpPlay').hidden = false; scene.setTheme(MBALAB.theme && MBALAB.theme.isDay()); fit(); loop(); render();
      const sc = $('#kpScroll'); if (sc) sc.scrollTop = 0;
    }
    $('#kpGo').addEventListener('click', () => { sfx('open'); newGame(); });
    $('#kpPick').addEventListener('click', e => { const b = e.target.closest('[data-mode]'); if (!b || b.dataset.mode === mode) return; mode = b.dataset.mode; sfx('tick'); picker(); });
    panel.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b || !gs) return;
      if (b.dataset.c) { sfx('click'); const ev = E.eventOf(gs), c = ev.choices.find(x => x.id === b.dataset.c); E.choose(gs, c.id); afterChoice(ev, c); return; }
      if (b.dataset.act) { plan.action = b.dataset.act; sfx('click'); panel.querySelectorAll('.kp-act').forEach(x => x.classList.toggle('on', x === b)); preview(); return; }
      const sg = b.closest('[data-seg]'); if (sg) { plan[sg.dataset.seg] = +b.dataset.v; sg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); sfx('click'); preview(); return; }
      const a = b.dataset.a; if (!a) return; sfx('click');
      if (a === 'run') { const R = E.step(gs, plan, {}); plan = null; scene.fx('sale'); if (R.profit < 0) scene.fx('warn'); else if (R.trust > 62) scene.fx('cheer'); hud(); if (gs.over) { E.next(gs); } render(); }
      else if (a === 'next') { view = null; E.next(gs); render(); }
      else if (a === 'rat') { const r = E.ratDecide(gs, { members: alloc.members, reserve: alloc.reserve }); alloc = { members: 40, reserve: 40 }; showRatResult(r); }
      else if (a === 'cont') { goOn(); }
      else if (a === 'again') { newGame(); }
    });

    /* ---------- loop, size ---------- */
    function loop() { if (visible && gs && !still() && !document.hidden) scene.start(); else if (scene.running) scene.stop(); else scene.draw(); }
    document.addEventListener('visibilitychange', loop);
    function fit() { const w = cv.clientWidth || 960, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); scene.draw(); }
    if (window.ResizeObserver) new ResizeObserver(fit).observe($('#kpStage')); else window.addEventListener('resize', fit);
    new MutationObserver(loop).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    /* ---------- info dialog ---------- */
    const guide = $('#kpGuide');
    function showGuide() { guide.innerHTML = `<div class="gd" role="dialog" aria-modal="true"><button type="button" class="gx" data-gclose aria-label="${t('close')}">✕</button><h3>${t('howT')}</h3><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol><button type="button" class="kp-main" data-gclose>${t('gotIt')}</button></div>`; guide.hidden = false; sfx('open'); }
    const closeGuide = () => { if (guide.hidden) return; guide.hidden = true; sfx('close'); };
    guide.addEventListener('click', e => { if (e.target === guide || e.target.closest('[data-gclose]')) closeGuide(); });
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && !guide.hidden) { closeGuide(); e.stopPropagation(); } });
    $('#kpInfo').addEventListener('click', () => { guide.hidden ? showGuide() : closeGuide(); });

    /* ---------- assistant Bit ---------- */
    function hints() {
      if (!gs) return { state: [], generic: ['kpt_s1'] };
      if (gs.over || gs.phase === 'end') return { state: ['kpt_end'], generic: ['kpt_end'] };
      const st = [];
      if (gs.phase === 'rat') st.push('kpt_rat'); else if (gs.phase === 'event') st.push('kpt_event'); else if (gs.phase === 'plan') { if (gs.goods < 40) st.push('kpt_stock'); st.push('kpt_plan'); }
      if (gs.debt > 20) st.push('kpt_debt'); if (E.trust(gs) < 52) st.push('kpt_trust');
      return { state: st, generic: ['kpt_event', 'kpt_plan'] };
    }
    if (window.SmartAssistant) SmartAssistant.create(host, { root: $('#kp'), hints, busy: () => !guide.hidden });

    picker();
    this._kp = { fit, loop, scene, setVisible(v) { visible = v; loop(); }, relabel() { picker(); if (gs) { hud(); if (!view) render(); else view(); } if (!guide.hidden) showGuide(); } };
  },
  onShow() { const m = this._kp; if (!m) return; m.scene.setTheme(MBALAB.theme && MBALAB.theme.isDay()); m.setVisible(true); m.fit(); },
  onHide() { const m = this._kp; if (m) m.setVisible(false); },
  onLang() { const m = this._kp; if (m) m.relabel(); },
  onTheme(day) { const m = this._kp; if (m) m.scene.setTheme(day); }
});
