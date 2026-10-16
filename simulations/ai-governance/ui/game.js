/* AI Governance case mode. MBALAB.govGame(host) builds the case menu and the four steps (assess the risk tier, design controls and launch mode, run twelve months, review).
   The maths lives in engine/engine.js, the drawing in scene/scene.js. */
(function () {
  const KEY = 'mbalab-gov-game', RANKS = [0, 120, 320, 600, 1000], BADGES = ['classifier', 'balanced', 'refuser', 'piloter', 'clean', 'allstar'];
  const BI = { classifier: '🏷️', balanced: '⚖️', refuser: '✋', piloter: '🧪', clean: '✨', allstar: '🌟' };
  const DELAY = { 1: 1500, 4: 600, 16: 170 }, DCLS = { bias: 4, priv: 2, safety: 0, sec: 1, trans: 3 };

  function create(host) {
    const E = MBALAB.gov, $ = s => host.querySelector(s), sfx = MBALAB.util.sfx, T = (k, p) => t(k, p);
    let st = { xp: 0, stars: {}, badges: {} };
    try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
    const cloud = MBALAB.cloud('ai-governance', { read: () => st.xp, write: n => { st.xp = Math.max(st.xp, +n || 0); save(); }, merge: (a, b) => Math.max(+a || 0, +b || 0), refresh: () => { if (!cs) menu(); } });
    const cv = $('#gxCv'), scene = MBALAB.govScene(cv);
    let visible = false, cs = null, li = 0, step = 1, tierPick = null, design = [], mode = 'full', run = null, shown = [], timer = 0, playing = false, speed = 4, out = null, evs = [], newBadges = [], xpRun = 0, day = false, done = false;
    const rank = xp => { let r = 0; RANKS.forEach((x, i) => { if (xp >= x) r = i; }); return r; };
    const unlocked = i => i === 0 || (st.stars[E.CASES[i - 1].id] || 0) >= 1;
    const starsHtml = n => `<span class="sg-st" aria-label="${n}/3">${[0, 1, 2].map(i => `<b class="${i < n ? 'on' : ''}" style="--i:${i}">★</b>`).join('')}</span>`;
    const rp = v => { const a = Math.abs(v); return (v < 0 ? '−' : '') + 'Rp ' + (a >= 1000 ? T('rpB', { n: (a / 1000).toFixed(1) }) : T('rpM', { n: Math.round(a) })); };
    const clear = () => { clearTimeout(timer); timer = 0; playing = false; };
    const cn = k => T('c_' + cs.id + '_' + k), names = ids => ids.map(id => T('k_' + id)).join(', ');
    const labels = () => scene.setLabels({ nodes: [T('nDat'), T('nMod'), T('nDec'), T('nPpl')], value: T('lValue'), harm: T('lHarm'), risk: T('lRisk'), inh: T('lInh'), stop: T('lStop'), month: T('lMonth'), dims: { bias: T('dbias'), priv: T('dpriv'), safety: T('dsafety'), sec: T('dsec'), trans: T('dtrans') } });
    labels();

    /* ---------- menu ---------- */
    function menu() {
      cs = null; clear(); scene.stop(); $('#gxLevel').hidden = true; $('#gxMenu').hidden = false;
      const r = rank(st.xp), nx = RANKS[r + 1], pc = nx ? Math.round((st.xp - RANKS[r]) / (nx - RANKS[r]) * 100) : 100;
      $('#gxMenu').innerHTML = `<div class="sg-hero"><div><h2>${T('gmHero')}</h2><p>${T('gmSub')}</p></div>
        <div class="sg-rank"><span class="sg-rk">${T('rk' + r)}</span><b>${T('xpLbl', { n: st.xp })}</b><div class="sg-xp"><i style="width:${pc}%"></i></div><small>${nx ? T('xpNext', { n: nx }) : T('xpMax')}</small></div></div>
        <div class="sg-levels">${E.CASES.map((c, i) => { const ok = unlocked(i), n = st.stars[c.id] || 0;
          return `<button type="button" class="sg-lv ${ok ? '' : 'locked'}" data-lv="${i}" ${ok ? '' : 'disabled'} ${ok ? '' : `title="${T('lvLock')}"`}><span class="sg-lvi" aria-hidden="true">${c.icon}</span><small>${T('lvN', { n: i + 1 })}</small><b>${T('c_' + c.id + '_n')}</b><em>${T('c_' + c.id + '_d')}</em>${ok ? starsHtml(n) + `<span class="sg-go">${n ? '↻' : '▶'}</span>` : '<span class="sg-lock" aria-hidden="true">🔒</span>'}</button>`; }).join('')}</div>
        <h3 class="sg-h3">${T('bdT')}</h3><div class="sg-badges">${BADGES.map(b => `<div class="sg-bd ${st.badges[b] ? 'on' : ''}" title="${T('bdd_' + b)}"><span>${BI[b]}</span><b>${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>`;
    }

    /* ---------- case ---------- */
    function open(i) {
      li = i; cs = E.CASES[i]; step = 1; tierPick = null; design = []; mode = 'full'; out = null; done = false; xpRun = 0; newBadges = []; evs = []; shown = []; clear(); run = null;
      scene.reset(); scene.setMode('brief'); scene.setCase(cs); scene.setDesign([]); scene.setRisk(cs.R, null); scene.setTheme(day); labels();
      $('#gxMenu').hidden = true; $('#gxLevel').hidden = false; fit(); loopCtl(); render(); sfx('open');
    }
    function say(txt) { const b = $('#gxSay'); b.innerHTML = `<b>🧑‍⚖️</b> ${txt}`; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); fitStage(); }
    function pills() { $('#gxSteps').innerHTML = [1, 2, 3, 4].map(i => `<li class="${step === i ? 'on' : step > i ? 'done' : ''}"><span>${step > i ? '✓' : i}</span>${T('st' + i)}</li>`).join(''); }
    function hud() { const r = rank(st.xp); $('#gxHud').innerHTML = `<button type="button" class="sg-back" data-a="menu">← ${T('toMenu')}</button><b class="sg-lt">${T('lvN', { n: li + 1 })} · ${cs.icon} ${cn('n')}</b><span class="sg-chipx">${T('rk' + r)} · ${T('xpLbl', { n: st.xp + xpRun })}</span>`; }
    function render() {
      hud(); pills(); const P = $('#gxPanel'); P.scrollTop = 0;
      if (step === 1) assess(P); else if (step === 2) designView(P); else if (step === 3) runView(P); else resultView(P);
    }

    /* step 1: assess the tier */
    function assess(P) {
      say(T('sayAssess')); scene.setMode('brief'); scene.setDesign([]); scene.setRisk(cs.R, null);
      const rl = (v, i) => i === 4 ? 2 - v : v, locked = tierPick != null, gap = locked ? Math.abs(E.TIERS.indexOf(tierPick) - E.TIERS.indexOf(cs.tier)) : 0;
      P.innerHTML = `<div class="sg-brief"><b>${cs.icon} ${cn('n')}</b><p>${cn('s')}</p></div>
        <h3 class="sg-h3">${T('asSig')}</h3><div class="gx-sig">${cs.fac.map((v, i) => `<div class="gx-sg r${rl(v, i)}"><small>${T('fac' + i)}</small><b>${i === 4 ? T('rv' + v) : T('lv' + v)}</b></div>`).join('')}</div>
        <h3 class="sg-h3">${T('asQ')}</h3><div class="gx-tiers" role="radiogroup">${E.TIERS.map(x => `<button type="button" role="radio" aria-checked="${tierPick === x}" class="gx-tier t-${x} ${tierPick === x ? 'on' : ''} ${locked && x === cs.tier ? 'right' : ''} ${locked && tierPick === x && x !== cs.tier ? 'wrong' : ''}" data-tier="${x}" ${locked ? 'disabled' : ''}><b>${T('tier_' + x)}</b><small>${T('tierd_' + x)}</small></button>`).join('')}</div>
        ${locked ? `<p class="gx-m ${gap === 0 ? 'ok' : gap === 1 ? 'warn' : 'bad'}">${gap === 0 ? '✅' : gap === 1 ? '🟡' : '❌'} ${T(gap === 0 ? 'asRight' : gap === 1 ? 'asNear' : 'asWrong', { t: T('tier_' + cs.tier) })} ${cn('w')}</p>` : `<p class="sg-hint">🔒 ${T('asLock')}</p>`}
        <div class="sg-foot"><button type="button" class="sg-main" data-a="todesign" ${locked ? '' : 'disabled'}>${locked ? T('asGo') + ' →' : T('asPickFirst')}</button></div>`;
      if (locked) requestAnimationFrame(() => { const m = P.querySelector('.gx-m'); if (m) m.scrollIntoView({ block: 'nearest' }); });
    }

    /* step 2: design the controls */
    const spent = () => E.cost(design), left = () => cs.B - spent();
    function designView(P) {
      say(T('sayDesign')); scene.setMode('plan'); scene.setCase(cs);
      P.innerHTML = `<div class="sg-brief"><b>${cs.icon} ${cn('n')}</b><p class="gx-ob">📋 ${T('ob_' + cs.tier)}</p></div>
        <div class="gx-bud"><div class="gx-bt"><b id="gxBudT"></b><span id="gxFric"></span></div><div class="gx-bk"><i id="gxBudF"></i></div></div>
        <h3 class="sg-h3">${T('dsMode')}</h3><div class="gx-moves m3" id="gxModes" role="radiogroup">${['full', 'pilot', 'decline'].map(m => `<button type="button" role="radio" class="sg-mv" data-mode="${m}"><b>${T('mode_' + m)}</b><small>${T('moded_' + m)}</small></button>`).join('')}</div>
        <h3 class="sg-h3">${T('dsCtl')}</h3><div class="gx-ctls" id="gxCtls"></div>
        <div class="sg-msgs" id="gxMsgs"></div>
        <div class="sg-foot"><button type="button" class="sg-btn ghost" data-a="toassess">← ${T('dsBack')}</button><button type="button" class="sg-main go" data-a="start" id="gxGo"></button></div>`;
      designUpdate();
    }
    function designUpdate() {
      const l = left(), fr = Math.round(E.friction(cs, design) * 100);
      $('#gxBudT').textContent = T('dsBudget', { a: spent().toFixed(1).replace('.0', ''), b: cs.B }); $('#gxFric').textContent = mode === 'decline' ? '' : T('dsFric', { n: fr }); $('#gxBudF').style.width = Math.min(100, spent() / cs.B * 100) + '%';
      $('#gxCtls').innerHTML = E.CTRL.map(k => { const on = design.includes(k.id), dis = !on && k.cost > l + 1e-9;
        return `<button type="button" class="gx-ct ${on ? 'on' : ''} ${dis ? 'dis' : ''}" data-ctl="${k.id}" aria-pressed="${on}" ${dis ? `title="${T('dsNoBudget')}"` : ''}><span class="gx-cti" aria-hidden="true">${k.icon}</span><span class="gx-ctt"><b>${T('k_' + k.id)}</b><small>${T('kd_' + k.id)}</small><span class="sg-fx">${E.DIMS.filter(d => k.m[d]).map(d => `<em class="c${DCLS[d]}">${T('d' + d)}</em>`).join('')}</span></span><span class="gx-cost">${k.cost}</span></button>`; }).join('');
      host.querySelectorAll('[data-mode]').forEach(b => { const on = b.dataset.mode === mode; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
      $('#gxMsgs').innerHTML = mode === 'decline' ? '' : design.length ? '' : `<p class="gx-m warn">⚠️ ${T('dsNone')}</p>`;
      $('#gxGo').textContent = mode === 'decline' ? T('mode_decline') + ' ✓' : T('dsGo') + ' ▶';
      scene.setDesign(design); scene.setRisk(cs.R, mode === 'decline' ? null : E.residual(cs, design));
    }

    /* step 3: run */
    function start() {
      if (mode === 'decline') { finish(); return; }
      step = 3; run = E.sim(cs, design, mode, (Date.now() ^ (li * 7919)) >>> 0); evs = []; shown = []; done = false; scene.reset(); scene.setMode('run'); scene.setCase(cs); scene.setDesign(design);
      playing = true; render(); sfx('open'); timer = setTimeout(tick, 500);
    }
    const dur = () => DELAY[speed] / 1000;
    function tick() { if (!playing || !run) return; advance(); if (shown.length >= E.MONTHS) { endRun(); return; } timer = setTimeout(tick, DELAY[speed]); }
    function addEv(txt, kind) { evs.unshift({ txt, kind }); evs = evs.slice(0, 3); }
    function advance() {
      const rec = run.months[shown.length]; shown.push(rec); scene.setMonths(shown); scene.emit(rec, dur());
      rec.inc.forEach(x => addEv(T('evInc', { m: rec.m, t: T('inc_' + x.dim), c: Math.round(x.cost) }), 'bad'));
      if (rec.audit && rec.audit.ban) { addEv(T('evBan', { f: rp(rec.audit.fine) }), 'bad'); sfx('lose'); } else if (rec.audit) { addEv(T('evAudit', { l: names(rec.audit.gaps), f: rp(rec.audit.fine) }), 'bad'); sfx('lose'); }
      else if (rec.m === E.AUDIT && cs.req.length && !cs.ban) addEv(T('evAuditOk'), 'ok');
      if (!rec.inc.length && !rec.audit && rec.value > 0) addEv(T('evQuiet', { m: rec.m }), 'info');
      if (rec.inc.length) sfx('tick'); paintRun();
    }
    function runView(P) {
      say(playing ? T('sayRun') : done ? T('sayDone') : T('sayRun'));
      P.innerHTML = `<div class="sg-run"><div class="sg-rt"><b id="gxDay"></b><span class="sg-prog"><i id="gxProg"></i></span></div>
        <div class="sg-k4"><div class="gx-k"><small>${T('rnValue')}</small><b id="gxV" class="gn">—</b></div><div class="gx-k"><small>${T('rnHarm')}</small><b id="gxH" class="rd">—</b></div><div class="gx-k"><small>${T('rnTrust')}</small><b id="gxTr">—</b><span class="gx-tk"><i id="gxTrB"></i></span></div></div>
        <div class="sg-ev" id="gxEv" aria-live="polite"></div><div id="gxCtl"></div></div>`;
      paintRun(); ctl();
    }
    function paintRun() {
      if (step !== 3 || !$('#gxDay')) return; const m = shown.length, v = shown.reduce((a, x) => a + x.value, 0), h = shown.reduce((a, x) => a + x.harm, 0), last = shown[m - 1];
      $('#gxDay').textContent = T('rnMonth', { m }); $('#gxProg').style.width = Math.round(m / E.MONTHS * 100) + '%'; $('#gxV').textContent = rp(v); $('#gxH').textContent = rp(h);
      const tr = last ? Math.round(last.trust * 100) : 100; $('#gxTr').textContent = tr + '%'; $('#gxTrB').style.width = tr + '%'; $('#gxTrB').className = tr >= 70 ? 'g' : tr >= 45 ? 'a' : 'r';
      $('#gxEv').innerHTML = evs.map(e => `<p class="gx-e ${e.kind}">${e.txt}</p>`).join('');
    }
    function ctl() {
      const C = $('#gxCtl'); if (!C) return;
      if (done) C.innerHTML = `<button type="button" class="sg-main go" data-a="review">${T('rnReview')} →</button>`;
      else C.innerHTML = `<div class="sg-ctl"><button type="button" class="sg-btn" data-a="pp">${playing ? '⏸ ' + T('rnPause') : '▶ ' + T('rnPlay')}</button><span class="sg-spd" role="group" aria-label="${T('rnSpeed')}">${[1, 4, 16].map(v => `<button type="button" class="${speed === v ? 'on' : ''}" data-spd="${v}">${v}×</button>`).join('')}</span></div><button type="button" class="sg-btn ghost" data-a="skip">⏭ ${T('rnSkip')}</button>`;
    }
    function endRun() { clear(); done = true; addEv(T('evEnd'), 'info'); paintRun(); say(T('sayDone')); sfx('win'); ctl(); }
    function skip() { clear(); while (shown.length < E.MONTHS) { const rec = run.months[shown.length]; shown.push(rec); } scene.setMonths(shown); endRun(); }

    /* step 4: review */
    function finish() {
      const j = E.judge(cs, tierPick, design, mode), n = E.starsOf(j.total), had = Object.assign({}, st.badges), set = b => { st.badges[b] = true; };
      if (cs.tier === 'high' && tierPick === 'high') set('classifier'); if (n === 3 && !j.over.length && design.length && mode !== 'decline') set('balanced'); if (cs.ban && mode === 'decline') set('refuser');
      if (mode === 'pilot' && n >= 2 && cs.tier === 'high') set('piloter'); if (run && mode !== 'decline' && run.incidents === 0 && !cs.ban) set('clean');
      st.stars[cs.id] = Math.max(st.stars[cs.id] || 0, n); if (E.CASES.every(c => (st.stars[c.id] || 0) === 3)) set('allstar');
      const gain = Math.round(j.total / 3) + n * 30; newBadges = BADGES.filter(b => st.badges[b] && !had[b]); st.xp += gain; xpRun = gain; save(); cloud.changed();
      cloud.attempt({ at: Date.now(), score: j.total, variant: cs.id, detail: { stars: n, tier: tierPick, controls: design.join('+'), mode, incidents: run ? run.incidents : 0 } });
      out = { j, n, gain }; step = 4; clear(); scene.setMode(run ? 'result' : 'brief'); if (!run) { scene.setRisk(cs.R, null); } render(); sfx(n >= 2 ? 'win' : 'lose'); if (n === 3) confetti();
    }
    function resultView(P) {
      const { j, n, gain } = out, fb = [], tierTxt = j.tierGap === 0 ? 'asRight' : j.tierGap === 1 ? 'asNear' : 'asWrong';
      say(j.total >= 70 ? T('sayWell') : T('sayLearn'));
      if (mode === 'decline') fb.push(T(cs.ban ? 'fbDeclineOk' : 'fbDeclineBad'));
      else {
        if (cs.ban) fb.push(T('fbBanLaunch')); else if (j.missing.length) fb.push(T('fbMissing', { l: names(j.missing) })); else if (cs.req.length) fb.push(T('fbReqOk'));
        if (j.over.length) fb.push(T('fbOver', { l: names(j.over) })); if (design.includes('human') && cs.vol >= .85) fb.push(T('fbHumanVol'));
        if (!cs.ban && j.altNet != null && j.altNet - j.net > 40) fb.push(T(mode === 'full' ? 'fbPilotBetter' : 'fbFullBetter'));
        if (!cs.ban && j.total < 85) fb.push(T('fbBest', { l: names(j.bestDesign) || '—', m: T('mode_' + j.bestMode) }));
        if (run) fb.push(T('fbLuck', { a: run.incidents, b: j.expInc.toFixed(1) }));
      }
      P.innerHTML = `<div class="sg-res"><div class="sg-big">${starsHtml(n)}<b>${T('rsScore', { s: j.total })}</b><em class="sg-xpg">${T('xpGain', { n: gain })}</em></div>
        <div class="sg-kpis"><div><small>${T('rsTier')}</small><b>${j.tier}/20</b></div><div><small>${T('rsDesign')}</small><b>${j.design}/30</b></div><div><small>${T('rsOut')}</small><b>${j.outcome}/50</b></div></div>
        <p class="sg-note">${j.tierGap === 0 ? '✅' : j.tierGap === 1 ? '🟡' : '❌'} ${T(tierTxt, { t: T('tier_' + cs.tier) })}</p>
        ${run ? `<p class="sg-note">${T('rsNet', { v: rp(j.net), a: rp(run.value), b: rp(run.harm) })}</p>` : ''}
        <ul class="sg-fb">${fb.filter(Boolean).map(x => `<li>${x}</li>`).join('')}</ul><p class="sg-tw">💡 ${cn('t')}</p>
        ${newBadges.length ? `<div class="sg-new">${newBadges.map(b => `<div class="sg-bd on pop"><span>${BI[b]}</span><b>${T('bdNew')}: ${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>` : ''}
        <div class="sg-foot"><button type="button" class="sg-btn" data-a="again">${T('again')}</button>${n >= 1 && li < E.CASES.length - 1 ? `<button type="button" class="sg-main inl" data-a="next">${T('nextLv')}</button>` : ''}<button type="button" class="sg-btn ghost" data-a="menu">${T('toMenu')}</button></div></div>`;
    }
    function confetti() { const box = $('#gxLevel'), cols = ['#ffd166', '#6ee7b7', '#4dd2ff', '#ff6ad5', '#a78bfa']; for (let i = 0; i < 36; i++) { const e = document.createElement('i'); e.className = 'sg-cf'; e.style.cssText = `left:${10 + Math.random() * 80}%;background:${cols[i % 5]};--dx:${(Math.random() - .5) * 200}px;--r:${Math.random() * 720}deg;animation-delay:${Math.random() * .3}s`; box.appendChild(e); setTimeout(() => e.remove(), 2200); } }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const l = e.target.closest('[data-lv]'); if (l && l.closest('#gxMenu')) { sfx('tick'); open(+l.dataset.lv); return; }
      if (!cs || !e.target.closest('#gxLevel')) return;
      const ti = e.target.closest('[data-tier]'); if (ti) { if (step === 1 && tierPick == null) { tierPick = ti.dataset.tier; sfx(tierPick === cs.tier ? 'win' : 'lose'); render(); } return; }
      const ct = e.target.closest('[data-ctl]'); if (ct) { if (step !== 2) return; const id = ct.dataset.ctl, i = design.indexOf(id); if (i >= 0) design.splice(i, 1); else if (E.ctl(id).cost <= left() + 1e-9) design.push(id); else { sfx('lose'); return; } sfx('tick'); designUpdate(); return; }
      const md = e.target.closest('[data-mode]'); if (md) { mode = md.dataset.mode; sfx('tick'); designUpdate(); return; }
      const sp = e.target.closest('[data-spd]'); if (sp) { speed = +sp.dataset.spd; sfx('tick'); ctl(); return; }
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a; sfx(a === 'start' ? 'open' : 'tick');
      if (a === 'menu') menu(); else if (a === 'todesign') { step = 2; render(); } else if (a === 'toassess') { step = 1; scene.setMode('brief'); render(); } else if (a === 'start') start();
      else if (a === 'pp') { playing = !playing; if (playing) timer = setTimeout(tick, 120); else clearTimeout(timer); ctl(); }
      else if (a === 'skip') skip(); else if (a === 'review') finish(); else if (a === 'again') open(li); else if (a === 'next') open(li + 1);
    });

    /* ---------- loop ---------- */
    function loopCtl() { if (visible && cs && !document.hidden) scene.start(); else { scene.stop(); scene.draw(); } }
    function fitStage() {
      const L = $('#gxLevel'); if (!L || L.hidden) return; const col = $('.sg-left'), sy = $('#gxSay'), sg = $('#gxStage'), colW = col.clientWidth;
      const mobile = window.matchMedia('(max-width:900px)').matches, availH = mobile ? Math.min(L.clientHeight * .5, colW * 9 / 16) : col.clientHeight - sy.offsetHeight - 12;
      const w = Math.max(220, Math.min(colW, availH * 16 / 9)); sg.style.width = Math.floor(w) + 'px';
    }
    function fit() { fitStage(); const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); scene.draw(); }
    if (window.ResizeObserver) { new ResizeObserver(() => fit()).observe(cv); new ResizeObserver(() => fitStage()).observe($('#gxLevel')); }
    window.addEventListener('resize', fitStage);
    document.addEventListener('visibilitychange', () => { loopCtl(); if (document.hidden && playing) { playing = false; clearTimeout(timer); if (step === 3) ctl(); } });
    menu();
    return { menu, fit, setVisible(v) { visible = v; loopCtl(); if (v && !cs) menu(); if (!v && playing) { playing = false; clearTimeout(timer); if (step === 3) ctl(); } }, setTheme(d) { day = !!d; scene.setTheme(d); }, relabel() { labels(); if (cs) { render(); if (step === 2) designUpdate(); if (step === 3) paintRun(); } else menu(); }, get inLevel() { return !!cs; } };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.govGame = create;
})();
