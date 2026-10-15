/* Price Detective: the mission mode. MBALAB.vwGame(host) builds the menu and the five steps (interview, curves, mark points, price, launch).
   The maths lives in engine/engine.js, the drawing in scene/scene.js and ui/chart.js. */
(function () {
  const vgLang = () => LANG, LOC = { en: 'en-US', id: 'id-ID', ja: 'ja-JP', zh: 'zh-CN' };
  const KEY = 'mbalab-vw-game', RANKS = [0, 120, 320, 600, 1000], BADGES = ['reader', 'thrifty', 'sweet', 'premium', 'ouch', 'allstar'], BI = { reader: '🔍', thrifty: '🪙', sweet: '🎯', premium: '👑', ouch: '💥', allstar: '🌟' };
  const MIN_N = 8, STEPS = 5;

  function create(host) {
    const V = MBALAB.vw, C = MBALAB.vwChart, $ = s => host.querySelector(s), sfx = MBALAB.util.sfx, T = (k, p) => t(k, p);
    const loc = () => LOC[vgLang()] || 'en-US', money = p => 'Rp ' + Math.round(p).toLocaleString(loc());
    const compact = p => new Intl.NumberFormat(loc(), { notation: 'compact', maximumFractionDigits: 1 }).format(p);
    let st = { xp: 0, stars: {}, badges: {}, tries: {} };
    try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
    const cloud = MBALAB.cloud('van-westendorp', { read: () => st.xp, write: n => { st.xp = Math.max(st.xp, +n || 0); save(); }, merge: (a, b) => Math.max(+a || 0, +b || 0), refresh: () => { if (!lv) menu(); } });
    const cv = $('#vgCv'), scene = MBALAB.vwScene(cv); let visible = false, lv = null, li = 0;
    /* run state */
    let m, grid, step, sample, asked, bad, res, band, marks, markXP, price, out, busy, timers = [], xpRun, newBadges, best;
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
    const rank = xp => { let r = 0; RANKS.forEach((x, i) => { if (xp >= x) r = i; }); return r; };
    const stars = sc => sc >= 85 ? 3 : sc >= 70 ? 2 : sc >= 45 ? 1 : 0;
    const unlocked = i => i === 0 || (st.stars[V.LEVELS[i - 1].id] || 0) >= 1;
    const starsHtml = n => `<span class="vg-st" aria-label="${n}/3">${[0, 1, 2].map(i => `<b class="${i < n ? 'on' : ''}" style="--i:${i}">★</b>`).join('')}</span>`;

    /* ---------- menu ---------- */
    function menu() {
      lv = null; clearTimers(); scene.clear(); scene.stop(); $('#vgLevel').hidden = true; $('#vgMenu').hidden = false;
      const r = rank(st.xp), nx = RANKS[r + 1], pct = nx ? Math.round((st.xp - RANKS[r]) / (nx - RANKS[r]) * 100) : 100;
      $('#vgMenu').innerHTML = `<div class="vg-hero"><div><h2>${T('gmHero')}</h2><p>${T('gmSub')}</p></div>
        <div class="vg-rank"><span class="vg-rk">${T('rk' + r)}</span><b>${T('xpLbl', { n: st.xp })}</b><div class="vg-xp"><i style="width:${pct}%"></i></div><small>${nx ? T('xpNext', { n: nx }) : T('xpMax')}</small></div></div>
        <div class="vg-levels">${V.LEVELS.map((l, i) => { const ok = unlocked(i), sc = V.SCEN.find(s => s.id === l.scen), n = st.stars[l.id] || 0;
          return `<button type="button" class="vg-lv ${ok ? '' : 'locked'} vg-l-${l.id}" data-lv="${i}" ${ok ? '' : 'disabled'}><span class="vg-lvi" aria-hidden="true">${sc.icon}</span><small>${T('lvN', { n: i + 1 })}</small><b>${T('sc_' + l.scen)}</b><em>${T('lv_' + l.id + '_tw')}</em>${ok ? starsHtml(n) + `<span class="vg-go">${T('lvGo')} ▶</span>` : `<span class="vg-lock">🔒 ${T('lvLock')}</span>`}</button>`; }).join('')}</div>
        <h3 class="vg-h3">${T('bdT')}</h3><div class="vg-badges">${BADGES.map(b => `<div class="vg-bd ${st.badges[b] ? 'on' : ''}" title="${T('bdd_' + b)}"><span>${BI[b]}</span><b>${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>`;
    }

    /* ---------- level ---------- */
    function open(i) {
      li = i; lv = V.LEVELS[i]; st.tries[lv.id] = (st.tries[lv.id] || 0); m = V.market(lv, st.tries[lv.id]); best = V.hindsight(m);
      grid = { max: m.sc.max, step: m.sc.step }; step = 1; sample = []; asked = 0; bad = 0; marks = []; markXP = 0; price = 0; out = null; busy = false; xpRun = 0; newBadges = [];
      band = null; clearTimers(); recompute();
      $('#vgMenu').hidden = true; $('#vgLevel').hidden = false; scene.clear(); scene.setProduct(lv.scen, lv.owner); scene.setTheme(MBALAB.theme && MBALAB.theme.isDay()); scene.setPrice(m.sc.med[2], '?'); fit(); loopCtl(); render(); sfx('open');
    }
    function recompute() {
      res = V.analyze(sample, grid); band = null;
      if (res.valid && res.sane && res.n >= 10) band = V.bootstrap(res.ok, grid, 20, 11 + res.n);
    }
    function blank() { const xs = []; for (let p = 0; p <= grid.max + 1e-9; p += grid.step) xs.push(p); const z = xs.map(() => 0); return { grid, sane: false, valid: false, cv: { xs, tc: z, c: z, e: z, te: z, nc: z, ne: z }, pts: {} }; }

    /* ---------- drawing ---------- */
    function chart(animate) {
      const r = res.valid ? res : blank(), c = $('#vgChart');
      c.innerHTML = C.svg(r, { price: step >= 4 && price ? price : null, helper: step >= 2 && step !== 6 && res.valid, points: step >= 2 && step !== 3, band: step <= 4 ? band : null, truth: step === 6 ? m.truth : null, marks: step === 3 ? marks : [], animate, fmt: money, compact, axX: T('axX'), axY: T('axY'), aria: T('cvAria') });
      $('#vgLegend').innerHTML = [['tc', 'cvTC', 'vw-tc'], ['c', 'cvC', 'vw-c'], ['e', 'cvE', 'vw-e'], ['te', 'cvTE', 'vw-te']].map(x => `<span class="vw-lg ${x[2]}"><i></i>${T(x[1])}</span>`).join('');
    }
    function say(txt) { const b = $('#vgSay'); b.innerHTML = `<b>${lv.owner}</b> ${txt}`; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
    function pills() { $('#vgSteps').innerHTML = [1, 2, 3, 4, 5].map(i => `<li class="${step === i || (step === 6 && i === 5) ? 'on' : step > i ? 'done' : ''}"><span>${step > i ? '✓' : i}</span>${T('st' + i)}</li>`).join(''); }
    function hud() {
      const r = rank(st.xp); $('#vgTop').innerHTML = `<button type="button" class="vg-back" data-a="menu">← ${T('toMenu')}</button><b class="vg-lt">${T('lvN', { n: li + 1 })} · ${T('sc_' + lv.scen)}</b><span class="vg-chip">${T('rk' + r)} · ${T('xpLbl', { n: st.xp + xpRun })}</span>`;
    }

    /* ---------- steps ---------- */
    function render() {
      hud(); pills(); chart(false); const P = $('#vgPanel'); scene.setPrice(step >= 4 && price ? price : m.sc.med[2], step >= 4 && price ? money(price) : '?');
      if (step === 1) {
        say(T('say1')); const cost = asked * m.ic, q = sample.length < 20 ? 'dqL' : sample.length < 60 ? 'dqF' : 'dqG', ready = res.valid && res.sane && res.n >= MIN_N;
        P.innerHTML = `<div class="vg-brief"><p>${T('lv_' + lv.id + '_b', { owner: lv.owner, c: money(m.cost), i: money(m.ic) })}</p><p class="vg-tw">${T('lv_' + lv.id + '_tw')}</p></div>
          <div class="vg-row"><button type="button" class="vg-btn" data-a="ask" data-n="1" ${busy ? 'disabled' : ''}>${T('ask1')}</button><button type="button" class="vg-btn" data-a="ask" data-n="10" ${busy ? 'disabled' : ''}>${T('ask10')}</button><button type="button" class="vg-btn" data-a="ask" data-n="25" ${busy ? 'disabled' : ''}>${T('ask25')}</button></div>
          <div class="vg-stat"><b>${T('intStat', { n: asked, c: money(cost) })}</b><span>${T(q)}</span></div>
          ${bad ? `<p class="vg-warn">${T('wasted', { n: bad })}</p>` : ''}
          ${ready ? `<button type="button" class="vg-main" data-a="s2" ${busy ? 'disabled' : ''}>${T('next1')}</button>` : `<p class="vg-note">${T('needMore', { n: MIN_N })}</p>`}`;
      } else if (step === 2) {
        say(T('say2')); P.innerHTML = `<button type="button" class="vg-main" data-a="s3">${T('next2')}</button>`;
      } else if (step === 3) {
        const k = ['pmc', 'opp', 'ipp', 'pme'], cur = marks.length, done = cur >= 4;
        say(done ? T('say3done') : T('mk' + k[cur][0].toUpperCase() + k[cur].slice(1)));
        P.innerHTML = `<div class="vg-marks">${k.map((x, i) => `<span class="vg-mk ${i < cur ? (marks[i].ok ? 'ok' : 'no') : i === cur ? 'cur' : ''}">${x.toUpperCase()}${i < cur ? (marks[i].xp ? ' +' + marks[i].xp : '') : ''}</span>`).join('')}</div><p class="vg-note" id="vgMsg" aria-live="polite">${marks.length ? marks[marks.length - 1].msg : ''}</p>
          <div class="vg-row">${done ? `<button type="button" class="vg-main" data-a="s4">${T('next3')}</button>` : `<button type="button" class="vg-btn ghost" data-a="s4">${T('skip3')}</button>`}</div>`;
      } else if (step === 4) {
        say(T('say4')); const q = res.pts, g = grid, snap = p => Math.round(p / g.step) * g.step, lo = Math.min(q.opp.x, q.ipp.x), hi = Math.max(q.opp.x, q.ipp.x);
        if (!price) price = snap((lo + hi) / 2);
        P.innerHTML = `<div class="vg-pr"><label for="vgPrice">${T('yourP')}</label><output id="vgPout"></output></div>
          <div class="vw-meterw"><div class="vw-meter" id="vgMeter"></div><input type="range" id="vgPrice" min="0" max="${g.max}" step="${g.step}" value="${price}"></div>
          <div class="vg-row"><button type="button" class="vg-btn" data-p="${snap((q.pmc.x + lo) / 2)}">${T('qp1')}</button><button type="button" class="vg-btn" data-p="${snap((lo + hi) / 2)}">${T('qp2')}</button><button type="button" class="vg-btn" data-p="${snap((hi + q.pme.x) / 2)}">${T('qp3')}</button></div>
          <p class="vw-zone" id="vgZone" aria-live="polite"></p><p class="vg-note" id="vgEst"></p>
          <button type="button" class="vg-main go" data-a="launch">${T('go')}</button>`;
        const a = q.pmc.x / g.max * 100, b = lo / g.max * 100, c2 = hi / g.max * 100, d = q.pme.x / g.max * 100;
        $('#vgMeter').style.background = `linear-gradient(90deg,var(--rd) 0 ${a}%,var(--am) ${a}% ${b}%,var(--gn) ${b}% ${c2}%,var(--am) ${c2}% ${d}%,var(--rd) ${d}% 100%)`; priceVals();
      } else if (step === 5) {
        say(T('say5')); P.innerHTML = `<div class="vg-live" id="vgLive"></div><div class="vg-row"><button type="button" class="vg-btn ghost" data-a="skip">${T('skip5')}</button></div>`; live();
      } else if (step === 6) resultView();
    }
    function priceVals() {
      const z = V.zone(res, price), a = V.at(res, price); $('#vgPout').textContent = money(price); $('#vgZone').textContent = T('zn' + z); $('#vgZone').className = 'vw-zone z' + z; $('#vgEst').textContent = T('est', { n: Math.round(a.buy * 100) + '%' });
      scene.setPrice(price, money(price)); chart(false);
    }
    let lv_ = { n: 0, s: 0, rev: 0, pro: 0 };
    function live() { const L = $('#vgLive'); if (!L) return; L.innerHTML = [['lnVis', lv_.n], ['lnSales', lv_.s], ['lnRev', money(lv_.rev)], ['lnProfit', money(lv_.pro)]].map(x => `<div><small>${T(x[0])}</small><b>${x[1]}</b></div>`).join(''); }

    /* ---------- actions ---------- */
    function addRow(row) { sample.push(row); const c = V.clean([row]).ok.length; if (!c) bad++; recompute(); }
    function ask(n) {
      if (busy || asked >= V.POP) return; busy = true; render();
      if (n === 1) {
        const row = m.pop[m.order[asked]], valid = V.clean([row]).ok.length === 1; asked++;
        const cols = ['var(--vi)', 'var(--gn)', 'var(--am)', 'var(--rd)'], keys = ['bbTC', 'bbC', 'bbE', 'bbTE'];
        const bubbles = row.map((p, i) => ({ text: T(keys[i], { p: money(p) }), col: ['#a78bfa', '#2fbf8a', '#e0a000', '#ff4d6d'][i] }));
        scene.ask({ bubbles, bad: !valid, badText: T('bbBad'), onAnswer: k => { sfx('tick'); if (k === 3) { addRow(row); chart(false); stat(); } } }, () => { if (!valid) { addRow(row); chart(false); } busy = false; render(); });
      } else {
        const list = Array(Math.min(n, V.POP - asked)).fill('ask');
        scene.launch(list, { gap: .13, speed: 1, onReact: () => { const row = m.pop[m.order[asked]]; asked++; addRow(row); chart(false); stat(); } }, () => { busy = false; render(); });
      }
    }
    function stat() { const s = $('.vg-stat b'); if (s) s.textContent = T('intStat', { n: asked, c: money(asked * m.ic) }); }
    function mark(x) {
      const k = ['pmc', 'opp', 'ipp', 'pme'][marks.length], tr = res.pts[k].x, err = Math.abs(x - tr) / grid.max, ok = err < .025, xp = ok ? 20 : err < .06 ? 10 : 0;
      marks.push({ k, x, ok, xp, msg: ok ? T('mkHit', { n: xp }) : xp ? T('mkNear', { n: xp }) : T('mkMiss') }); markXP += xp; xpRun = markXP; sfx(ok ? 'win' : xp ? 'tick' : 'lose'); render();
    }
    function startLaunch() {
      step = 5; out = V.launch(m, price); lv_ = { n: 0, s: 0, rev: 0, pro: 0 }; busy = true; render(); let k = 0;
      scene.launch(out.res, { gap: .035, speed: 1, onReact: (i, r) => { lv_.n++; if (V.buys(r)) { lv_.s++; lv_.rev += price; lv_.pro += price - m.cost; if (++k % 4 === 0) sfx('tick'); } live(); } }, () => { busy = false; later(finish, 500); });
    }
    function finish() {
      step = 6; const research = asked * m.ic, net = out.profit - research, score = Math.max(0, Math.min(100, Math.round(net / best.profit * 100))), n = stars(score), z = res.sane ? V.zone(res, price) : -1;
      m.truth = V.analyze(m.pop, grid); st.tries[lv.id]++;
      const gain = markXP + n * 40 + Math.round(score / 5); xpRun = gain; const had = Object.assign({}, st.badges);
      const set = b => { st.badges[b] = true; };
      if (marks.length === 4 && marks.every(x => x.ok)) set('reader'); if (n >= 2 && asked <= 40) set('thrifty'); if (n === 3 && z === 2) set('sweet'); if (n === 3 && z === 3) set('premium'); if (z === 4) set('ouch');
      st.stars[lv.id] = Math.max(st.stars[lv.id] || 0, n); if (V.LEVELS.every(l => (st.stars[l.id] || 0) === 3)) set('allstar');
      newBadges = BADGES.filter(b => st.badges[b] && !had[b]); st.xp += gain; save(); cloud.changed(); cloud.attempt({ at: Date.now(), score, variant: lv.id, detail: { stars: n, interviews: asked, price } });
      out.final = { research, net, score, n, z }; render(); sfx(n >= 2 ? 'win' : 'lose'); if (n === 3) confetti();
    }
    function resultView() {
      const f = out.final, P = $('#vgPanel'), fb = [];
      if (asked < 25) fb.push('fbSmall'); else if (f.research / best.profit > .25) fb.push('fbBig');
      if (f.z === 4) fb.push('fbOver'); else if (f.z === 0 || f.z === 1) fb.push('fbUnder'); else if (f.z === 2) fb.push('fbSweet'); else if (f.z === 3) fb.push('fbPrem');
      if (bad / Math.max(1, asked) > .12) fb.push('fbNoisy');
      say(T('rsT'));
      P.innerHTML = `<div class="vg-res"><div class="vg-big">${starsHtml(f.n)}<b>${T('rsScore', { s: f.score })}</b><em class="vg-xpg">${T('xpGain', { n: xpRun })}</em></div>
        <div class="vg-kpis"><div><small>${T('rsGross')}</small><b>${money(out.profit)}</b></div><div><small>${T('rsRes')}</small><b>−${money(f.research)}</b></div><div class="hi"><small>${T('rsNet')}</small><b>${money(f.net)}</b></div><div><small>${T('rsBest')}</small><b>${money(best.profit)}</b></div></div>
        <p>${T('rsHind', { p: money(best.p), y: money(price) })}</p><p class="vg-note">${T('rsTruth')}</p>
        <ul class="vg-fb">${fb.map(k => `<li>${T(k)}</li>`).join('')}</ul>
        ${newBadges.length ? `<div class="vg-new">${newBadges.map(b => `<div class="vg-bd on pop"><span>${BI[b]}</span><b>${T('bdNew')}: ${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>` : ''}
        <div class="vg-row"><button type="button" class="vg-btn" data-a="again">${T('again')}</button>${f.n >= 1 && li < V.LEVELS.length - 1 ? `<button type="button" class="vg-main inl" data-a="next">${T('nextLv')}</button>` : ''}<button type="button" class="vg-btn ghost" data-a="menu">${T('toMenu')}</button></div></div>`;
    }
    function confetti() { const box = $('#vgLevel'), cols = ['#ffd166', '#6ee7b7', '#4dd2ff', '#ff6ad5', '#a78bfa']; for (let i = 0; i < 36; i++) { const e = document.createElement('i'); e.className = 'vg-cf'; e.style.cssText = `left:${10 + Math.random() * 80}%;background:${cols[i % 5]};--dx:${(Math.random() - .5) * 200}px;--r:${Math.random() * 720}deg;animation-delay:${Math.random() * .4}s`; box.appendChild(e); setTimeout(() => e.remove(), 2600); } }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const l = e.target.closest('[data-lv]'); if (l && l.closest('#vgMenu')) { sfx('tick'); open(+l.dataset.lv); return; }
      if (!lv || !host.contains(e.target) || !e.target.closest('#vgLevel')) return;
      const b = e.target.closest('[data-a],[data-p]'); if (b && b.dataset.p) { price = +b.dataset.p; hover = null; $('#vgPrice').value = price; priceVals(); sfx('tick'); return; }
      if (b) { const a = b.dataset.a; sfx('tick');
        if (a === 'menu') menu(); else if (a === 'ask') ask(+b.dataset.n); else if (a === 's2') { step = 2; render(); chart(true); } else if (a === 's3') { step = 3; render(); } else if (a === 's4') { step = 4; render(); }
        else if (a === 'launch') startLaunch(); else if (a === 'skip') scene.skip(); else if (a === 'again') open(li); else if (a === 'next') open(li + 1); return; }
      if (step === 3 && marks.length < 4 && e.target.closest('.vw-svg')) { const x = C.x(e.target.closest('.vw-svg'), e.clientX, res); if (x != null) mark(x); }
    });
    host.addEventListener('input', e => { if (e.target.id === 'vgPrice') { price = +e.target.value; priceVals(); } });
    let hover = null;
    host.addEventListener('pointermove', e => { const s = e.target.closest && e.target.closest('#vgChart .vw-svg'); if (!s || step !== 3 || !res.valid) return; const x = C.x(s, e.clientX, res); if (x == null) return; let ln = s.querySelector('.vw-hov'); const px = 50 + x / grid.max * (C.W - 50 - 16); if (!ln) { ln = document.createElementNS('http://www.w3.org/2000/svg', 'line'); ln.setAttribute('class', 'vw-hov'); ln.setAttribute('y1', 16); ln.setAttribute('y2', C.H - 42); s.insertBefore(ln, s.querySelector('.vw-hit')); } ln.setAttribute('x1', px); ln.setAttribute('x2', px); });

    /* ---------- loop ---------- */
    function loopCtl() { if (visible && lv && !document.hidden) scene.start(); else { scene.stop(); scene.draw(); } }
    function fit() { const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); scene.draw(); }
    if (window.ResizeObserver) new ResizeObserver(() => fit()).observe(cv);
    document.addEventListener('visibilitychange', loopCtl);
    menu();
    return { menu, fit, setVisible(v) { visible = v; loopCtl(); if (v && !lv) menu(); }, setTheme(d) { scene.setTheme(d); }, relabel() { if (lv) render(); else menu(); }, get inLevel() { return !!lv; } };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.vwGame = create;
})();
