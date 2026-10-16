/* Five Forces mission mode. MBALAB.ffGame(host) builds the menu and the three steps (read the forces, plan the strategy, see the result).
   The maths lives in engine/engine.js, the drawing in scene/scene.js. */
(function () {
  const KEY = 'mbalab-ff-game', RANKS = [0, 120, 320, 600, 1000], BADGES = ['sharp', 'tactician', 'trap', 'fortress', 'pivot', 'allstar'];
  const BI = { sharp: '👁️', tactician: '🧠', trap: '💥', fortress: '🏰', pivot: '🔀', allstar: '🌟' };
  const EM = ['⚔️', '🚪', '🚚', '🛍️', '🔄'], FK = ['rival', 'entry', 'supp', 'buyer', 'subs'];
  const MEM = { loyalty: '❤️', contract: '🤝', brand: '🛡️', differentiate: '✨', integrate: '🏭', pricecut: '💥', acquire: '💼', niche: '🎯' };

  function create(host) {
    const E = MBALAB.ff, $ = s => host.querySelector(s), sfx = MBALAB.util.sfx, T = (k, p) => t(k, p);
    let st = { xp: 0, stars: {}, badges: {} };
    try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
    const cloud = MBALAB.cloud('five-forces', { read: () => st.xp, write: n => { st.xp = Math.max(st.xp, +n || 0); save(); }, merge: (a, b) => Math.max(+a || 0, +b || 0), refresh: () => { if (!lv) menu(); } });
    const cv = $('#fgCv'), scene = MBALAB.ffScene(cv), POS = MBALAB.ffScene.POS; let visible = false, lv = null, li = 0;
    let step = 1, rev = false, guess, sel, out, busy, timers = [], newBadges = [], xpRun = 0, chip = [], day = false;
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
    const rank = xp => { let r = 0; RANKS.forEach((x, i) => { if (xp >= x) r = i; }); return r; };
    const stars = sc => sc >= 85 ? 3 : sc >= 70 ? 2 : sc >= 45 ? 1 : 0;
    const unlocked = i => i === 0 || (st.stars[E.LEVELS[i - 1].id] || 0) >= 1;
    const starsHtml = n => `<span class="sc-st" aria-label="${n}/3">${[0, 1, 2].map(i => `<b class="${i < n ? 'on' : ''}" style="--i:${i}">★</b>`).join('')}</span>`;
    const lvlWord = v => T('lvl' + E.bandOf(v));
    const snap = () => !scene.running;

    /* ---------- menu ---------- */
    function menu() {
      lv = null; clearTimers(); scene.stop(); $('#fgLevel').hidden = true; $('#fgMenu').hidden = false;
      const r = rank(st.xp), nx = RANKS[r + 1], pct = nx ? Math.round((st.xp - RANKS[r]) / (nx - RANKS[r]) * 100) : 100;
      $('#fgMenu').innerHTML = `<div class="sc-hero"><div><h2>${T('gmHero')}</h2><p>${T('gmSub')}</p></div>
        <div class="sc-rank"><span class="sc-rk">${T('rk' + r)}</span><b>${T('xpLbl', { n: st.xp })}</b><div class="sc-xp"><i style="width:${pct}%"></i></div><small>${nx ? T('xpNext', { n: nx }) : T('xpMax')}</small></div></div>
        <div class="fg-levels">${E.LEVELS.map((l, i) => { const ok = unlocked(i), n = st.stars[l.id] || 0, k = E.kept(l.f, l.w);
          return `<button type="button" class="fg-lv ${ok ? '' : 'locked'}" data-lv="${i}" ${ok ? '' : 'disabled'} ${ok ? '' : `title="${T('lvLock')}"`}><span class="fg-lvi" aria-hidden="true">${l.icon}</span><small>${T('lvN', { n: i + 1 })}</small><b>${T('ind_' + l.id + '_n')}</b><em>${T('ind_' + l.id + '_d')}</em>${ok ? starsHtml(n) + `<span class="sc-go">${n ? '↻' : '▶'}</span>` : '<span class="sc-lock" aria-hidden="true">🔒</span>'}</button>`; }).join('')}</div>
        <h3 class="sc-h3">${T('bdT')}</h3><div class="sc-badges">${BADGES.map(b => `<div class="sc-bd ${st.badges[b] ? 'on' : ''}" title="${T('bdd_' + b)}"><span>${BI[b]}</span><b>${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>`;
    }

    /* ---------- level ---------- */
    function open(i) {
      li = i; lv = E.LEVELS[i]; step = 1; rev = false; guess = [0, 0, 0, 0, 0]; sel = []; out = null; busy = false; xpRun = 0; newBadges = []; clearTimers();
      scene.setW(lv.w); scene.setCost(0, true); scene.ghost(null); scene.set([50, 50, 50, 50, 50], true); scene.setTheme(day);
      $('#fgMenu').hidden = true; $('#fgLevel').hidden = false; labels(); fit(); loopCtl(); render(); sfx('open');
    }
    function labels() {
      $('#fgLabels').innerHTML = FK.map((k, i) => `<div class="sc-tag c${i}" style="left:${POS[i].x / 9.6}%;top:${POS[i].y / 5.4}%"><span class="n"><i aria-hidden="true">${EM[i]}</i>${T('fs_' + k)}</span><b class="v" id="fgv${i}"></b><span class="bar"><i id="fgb${i}"></i></span></div>`).join('');
      chip = FK.map((k, i) => ({ v: $('#fgv' + i), b: $('#fgb' + i) }));
    }
    function paint(d, k) {
      const known = step > 1 || rev || true;
      d.forEach((v, i) => { const un = step === 1 && !rev && !guess[i]; chip[i].v.textContent = un ? '?' : lvlWord(v); chip[i].b.style.width = (un ? 0 : v) + '%'; });
      const kp = $('#fgKept'); if (kp) { const c = k < 30 ? 'k0' : k < 50 ? 'k1' : k < 70 ? 'k2' : 'k3'; kp.className = 'sc-kept ' + c; kp.innerHTML = `<b>${Math.round(k)}</b><small>${T('poolLbl')}</small>`; }
    }
    scene.onTick(paint);
    const refresh = () => paint(scene.values(), scene.kept());
    const setF = (f, hard) => { scene.set(f, hard || snap()); refresh(); };
    function say(txt) { const b = $('#fgSay'); b.innerHTML = `<b>${lv.owner}</b> ${txt}`; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); fitStage(); }
    function pills() { $('#fgSteps').innerHTML = [1, 2, 3].map(i => `<li class="${step === i ? 'on' : step > i ? 'done' : ''}"><span>${step > i ? '✓' : i}</span>${T('st' + i)}</li>`).join(''); }
    function hud() { const r = rank(st.xp); $('#fgHud').innerHTML = `<button type="button" class="sc-back" data-a="menu">← ${T('toMenu')}</button><b class="sc-lt">${T('lvN', { n: li + 1 })} · ${lv.icon} ${T('ind_' + lv.id + '_n')}</b><span class="sc-chip">${T('rk' + r)} · ${T('xpLbl', { n: st.xp + xpRun })}</span>`; }

    /* ---------- steps ---------- */
    function render() {
      hud(); pills(); const P = $('#fgPanel'); P.scrollTop = 0;
      if (step === 1 && !rev) {
        say(T('sayRead'));
        P.innerHTML = `<div class="sc-brief"><b>${lv.icon} ${T('ind_' + lv.id + '_n')}</b><p>${T('ind_' + lv.id + '_d')}</p><p class="sc-hint">${T('rateHint')}</p></div>` + FK.map((k, i) => rowHtml(i)).join('') + `<div class="sc-foot" id="fgFoot"></div>`; foot();
      } else if (step === 1) {
        say(T('sayReveal')); const rd = E.scoreRead(lv, guess);
        P.innerHTML = `<div class="sc-brief"><b>${T('revT')}</b><p>${T('rdScore', { s: rd.score })} · ${T('rdExact', { n: rd.exact })}</p></div>` +
          `<div class="sc-rev">${FK.map((k, i) => { const g = guess[i], tb = E.bandOf(lv.f[i]), d = Math.abs(g - tb), c = d === 0 ? 'ok' : d === 1 ? 'near' : 'no'; return `<div class="sc-rv ${c}"><i class="dot c${i}"></i><b>${T('fr_' + k)}</b><span>${T('yourCall')}: <em>${T('lvl' + g)}</em></span><span>${T('truthIs')}: <em>${T('lvl' + tb)}</em></span><strong>${T(d === 0 ? 'spot' : d === 1 ? 'close' : 'miss')}</strong></div>`; }).join('')}</div>
          <p class="sc-tw">💡 ${T('ind_' + lv.id + '_tw')}</p><div class="sc-foot"><button type="button" class="sc-main" data-a="plan">${T('toPlan')} →</button></div>`;
      } else if (step === 2) {
        say(busy ? T('sayRun') : T('sayPlan'));
        P.innerHTML = `<div class="sc-cmp" id="fgCmp"></div><p class="sc-hint" id="fgPick"></p><div class="sc-moves">${E.MOVES.map(m => moveHtml(m)).join('')}</div><div class="sc-foot"><button type="button" class="sc-main go" id="fgRun" data-a="run"></button><button type="button" class="fg-btn ghost" data-a="skip" id="fgSkip" hidden>${T('skip')}</button></div>`; plan();
      } else resultView();
    }
    function rowHtml(i) {
      const k = FK[i], g = guess[i];
      return `<div class="sc-r c${i}" data-f="${i}"><div class="sc-rowh"><i class="dot c${i}"></i><b>${T('fr_' + k)}</b><span class="sc-rw" id="fgw${i}">${g ? T('lvl' + g) : ''}</span></div><p class="sc-q">${T('frq_' + k)}</p><p class="sc-clue">💬 ${T('ind_' + lv.id + '_c' + i)}</p>
        <div class="sc-rate" role="radiogroup" aria-label="${T('fr_' + k)}">${[1, 2, 3, 4, 5].map(v => `<button type="button" role="radio" aria-checked="${g === v}" class="${g === v ? 'on' : ''}" data-rate="${i}" data-v="${v}" title="${T('lvl' + v)}">${v}</button>`).join('')}</div></div>`;
    }
    function foot() {
      const n = guess.filter(Boolean).length, F = $('#fgFoot'); if (!F) return;
      F.innerHTML = `<span class="sc-cnt">${T('ratedN', { n })}</span><button type="button" class="sc-main" data-a="check" ${n < 5 ? 'disabled' : ''}>${T('check')}</button>`;
    }
    function rate(i, v) {
      guess[i] = v; setF(guess.map((g, j) => g ? E.bandVal(g) : 50)); scene.fx(i, EM[i], 5); sfx('tick');
      const row = $(`.sc-r[data-f="${i}"]`); row.querySelectorAll('[data-rate]').forEach(b => { const on = +b.dataset.v === v; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
      $('#fgw' + i).textContent = T('lvl' + v); foot();
    }
    function check() {
      rev = true; const rd = E.scoreRead(lv, guess); scene.ghost(guess.map(E.bandVal)); setF(lv.f); sfx(rd.score >= 70 ? 'win' : 'tick'); render();
    }
    function moveHtml(m) {
      return `<button type="button" class="sc-mv" data-mv="${m.id}" aria-pressed="false"><span class="sc-mvi" aria-hidden="true">${MEM[m.id]}</span><b>${T('mv_' + m.id)}</b><small>${T('mvd_' + m.id)}</small><span class="fg-fx">${m.fx.map((d, i) => d ? `<em class="${d < 0 ? 'fdn' : 'fup'} c${i}">${d < 0 ? '▼' : '▲'} ${T('fs_' + FK[i])}</em>` : '').join('')}</span><span class="sc-cost">${T('mvCost')} ${m.cost}</span></button>`;
    }
    function plan() {
      const r = E.run(lv.f, lv.w, sel), base = E.kept(lv.f, lv.w);
      if (!busy) { scene.setCost(r.cost, snap()); setF(r.f); }
      $('#fgCmp').innerHTML = `<div class="sc-cb"><small>${T('baseLbl')}</small><b>${Math.round(base)}</b></div><div class="sc-ca">→</div><div class="sc-cb hi ${r.net >= base ? 'gain' : 'loss'}"><small>${T('afterLbl')}</small><b>${Math.round(r.net)}</b></div><div class="sc-cc">${sel.length ? T('costLbl', { n: r.cost }) : ''}</div>`;
      $('#fgPick').textContent = T('pickHint', { n: E.PICKS, c: sel.length });
      host.querySelectorAll('.sc-mv').forEach(b => { const on = sel.indexOf(b.dataset.mv) >= 0; b.setAttribute('aria-pressed', on); b.classList.toggle('on', on); b.disabled = busy || (!on && sel.length >= E.PICKS); });
      const run = $('#fgRun'); run.disabled = busy || !sel.length; run.textContent = sel.length ? T('run') : T('runNone');
    }
    function toggle(id) {
      if (busy) return; const k = sel.indexOf(id); if (k >= 0) sel.splice(k, 1); else if (sel.length < E.PICKS) { sel.push(id); const m = E.byId(id); m.fx.forEach((d, i) => { if (d) scene.fx(i, MEM[id], 4); }); } else return;
      sfx('tick'); plan();
    }
    function execute() {
      if (busy || !sel.length) return; busy = true; const r = E.run(lv.f, lv.w, sel); out = r; render(); $('#fgSkip').hidden = false; host.querySelectorAll('.sc-mv').forEach(b => { b.disabled = true; });
      r.steps.forEach((s, j) => later(() => { const m = E.byId(s.id); say(`${MEM[s.id]} ${T('mv_' + s.id)}`); scene.setCost(r.steps.slice(0, j + 1).reduce((a, x) => a + E.byId(x.id).cost, 0), snap()); scene.set(s.f, snap()); m.fx.forEach((d, i) => { if (d) scene.fx(i, MEM[s.id], 8); }); sfx(m.fx.some(d => d > 15) ? 'lose' : 'win'); refresh(); }, 600 + j * 1300));
      later(finish, 600 + r.steps.length * 1300 + 700);
    }
    function finish() {
      clearTimers(); busy = false; const rd = E.scoreRead(lv, guess), ss = E.scoreStrat(lv, sel), total = Math.round(.4 * rd.score + .6 * ss.score), n = stars(total);
      scene.setCost(ss.r.cost, true); setF(ss.r.f, true); const mg = E.marginals(lv, sel), base = ss.base, net = ss.net;
      const gain = Math.round(rd.score / 5) + rd.exact * 4 + Math.round(ss.score / 4) + n * 40, had = Object.assign({}, st.badges), set = b => { st.badges[b] = true; };
      if (rd.exact === 5) set('sharp'); if (ss.score === 100) set('tactician'); if (mg.some(x => x.id === 'pricecut' && x.d < -.2)) set('trap'); if (net >= 60 && base < 50) set('fortress'); if (net - base >= 15) set('pivot');
      st.stars[lv.id] = Math.max(st.stars[lv.id] || 0, n); if (E.LEVELS.every(l => (st.stars[l.id] || 0) === 3)) set('allstar');
      newBadges = BADGES.filter(b => st.badges[b] && !had[b]); st.xp += gain; xpRun = gain; save(); cloud.changed(); cloud.attempt({ at: Date.now(), score: total, variant: lv.id, detail: { stars: n, read: rd.score, strat: ss.score, plan: sel.join('+') } });
      out = { rd, ss, total, n, mg, gain }; step = 3; render(); sfx(n >= 2 ? 'win' : 'lose'); if (n === 3) confetti();
    }
    function resultView() {
      const { rd, ss, total, n, mg } = out, P = $('#fgPanel'), fb = [], dr = E.drain(lv.f, lv.w), vd = E.verdict(ss.net), worst = rd.err.indexOf(Math.max.apply(null, rd.err));
      say(T('vdx' + vd));
      fb.push(T('fbDrain', { f: T('fr_' + FK[dr.i]), n: Math.round(dr.pts) }));
      mg.filter(x => x.d < -.2).forEach(x => fb.push(T('fbTrap', { m: T('mv_' + x.id) })));
      const top = mg.slice().sort((a, b) => b.d - a.d)[0]; if (top && top.d > .2) fb.push(T('fbGood', { m: T('mv_' + top.id), n: top.d.toFixed(1) }));
      if (rd.err[worst] > 25) fb.push(T('fbRead', { f: T('fr_' + FK[worst]) })); if (sel.length === 1) fb.push(T('fbFew'));
      P.innerHTML = `<div class="sc-res"><div class="sc-big">${starsHtml(n)}<b>${T('rsScore', { s: total })}</b><em class="sc-xpg">${T('xpGain', { n: out.gain })}</em></div>
        <div class="fg-kpis"><div><small>${T('rsRead')}</small><b>${rd.score}</b></div><div><small>${T('rsStrat')}</small><b>${ss.score}</b></div><div class="hi"><small>${T('poolLbl')}</small><b>${Math.round(ss.base)} → ${Math.round(ss.net)}</b></div></div>
        <p class="sc-vd v${vd}"><b>${T('vd' + vd)}</b> ${T('vdx' + vd)}</p>
        <p class="sc-memo">${T('rsBest', { m: ss.best.ids.map(id => T('mv_' + id)).join(' + '), n: Math.round(ss.best.net) })}</p>
        <ul class="sc-fb">${fb.map(x => `<li>${x}</li>`).join('')}</ul>
        <p class="sc-tw">💡 ${T('ind_' + lv.id + '_tw')}</p>
        ${newBadges.length ? `<div class="sc-new">${newBadges.map(b => `<div class="sc-bd on pop"><span>${BI[b]}</span><b>${T('bdNew')}: ${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>` : ''}
        <div class="sc-foot"><button type="button" class="fg-btn" data-a="again">${T('again')}</button>${n >= 1 && li < E.LEVELS.length - 1 ? `<button type="button" class="sc-main inl" data-a="next">${T('nextLv')}</button>` : ''}<button type="button" class="fg-btn ghost" data-a="menu">${T('toMenu')}</button></div></div>`;
    }
    function confetti() { const box = $('#fgLevel'), cols = ['#ffd166', '#6ee7b7', '#4dd2ff', '#ff6ad5', '#a78bfa']; for (let i = 0; i < 36; i++) { const e = document.createElement('i'); e.className = 'sc-cf'; e.style.cssText = `left:${10 + Math.random() * 80}%;background:${cols[i % 5]};--dx:${(Math.random() - .5) * 200}px;--r:${Math.random() * 720}deg;animation-delay:${Math.random() * .3}s`; box.appendChild(e); setTimeout(() => e.remove(), 2200); } }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const l = e.target.closest('[data-lv]'); if (l && l.closest('#fgMenu')) { sfx('tick'); open(+l.dataset.lv); return; }
      if (!lv || !e.target.closest('#fgLevel')) return;
      const r = e.target.closest('[data-rate]'); if (r) { if (step === 1 && !rev) rate(+r.dataset.rate, +r.dataset.v); return; }
      const m = e.target.closest('[data-mv]'); if (m) { if (step === 2) toggle(m.dataset.mv); return; }
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a; if (a !== 'run' && a !== 'check') sfx('tick');
      if (a === 'menu') menu(); else if (a === 'check') check(); else if (a === 'plan') { step = 2; rev = false; scene.ghost(null); scene.setCost(0, true); setF(lv.f); render(); }
      else if (a === 'run') execute(); else if (a === 'skip') { clearTimers(); if (out && out.steps) setF(out.f, true); finish(); } else if (a === 'again') open(li); else if (a === 'next') open(li + 1);
    });

    /* ---------- loop ---------- */
    function loopCtl() { if (visible && lv && !document.hidden) scene.start(); else { scene.stop(); scene.draw(); } }
    function fitStage() {
      const L = $('#fgLevel'); if (!L || L.hidden) return; const col = $('.sc-left'), say = $('#fgSay'), st = $('#fgStage'), colW = col.clientWidth;
      const mobile = window.matchMedia('(max-width:900px)').matches, availH = mobile ? Math.min(L.clientHeight * .4, colW * 9 / 16) : col.clientHeight - say.offsetHeight - 12;
      const w = Math.max(220, Math.min(colW, availH * 16 / 9)); st.style.width = Math.floor(w) + 'px';
    }
    function fit() { fitStage(); const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); scene.draw(); }
    if (window.ResizeObserver) { new ResizeObserver(() => fit()).observe(cv); new ResizeObserver(() => fitStage()).observe($('#fgLevel')); }
    window.addEventListener('resize', fitStage);
    document.addEventListener('visibilitychange', loopCtl);
    menu();
    return { menu, fit, setVisible(v) { visible = v; loopCtl(); if (v && !lv) menu(); }, setTheme(d) { day = !!d; scene.setTheme(d); }, relabel() { if (lv) { labels(); render(); refresh(); } else menu(); }, get inLevel() { return !!lv; } };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.ffGame = create;
})();
