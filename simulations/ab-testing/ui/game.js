/* A/B Testing case mode. MBALAB.abGame(host) builds the case menu and the four steps (pick an idea, plan the test, run it, see the result).
   The maths lives in engine/engine.js, the drawing in scene/scene.js. */
(function () {
  const KEY = 'mbalab-ab-game', RANKS = [0, 120, 320, 600, 1000], BADGES = ['planner', 'patient', 'sceptic', 'detective', 'shipper', 'allstar'];
  const BI = { planner: '🎯', patient: '🧘', sceptic: '🧐', detective: '🕵️', shipper: '🚀', allstar: '🌟' };
  const IDEM = { kopi: ['🚚', '🎨', '⏰'], kursus: ['🎬', '🏷️', '🔥'], ojol: ['🏅', '⏭️', '🎟️'], dompet: ['🛡️', '✂️', '📢'], wisata: ['⚡', '🚐', '⭐'], kta: ['📄', '💹', '💬'], jamu: ['📦', '🔖', '👨‍🌾'], cupang: ['🎥', '🎛️', '⏱️'] };
  const DELAY = { 1: 1100, 4: 320, 16: 90 };

  function create(host) {
    const E = MBALAB.ab, $ = s => host.querySelector(s), sfx = MBALAB.util.sfx, T = (k, p) => t(k, p);
    let st = { xp: 0, stars: {}, badges: {} };
    try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
    const cloud = MBALAB.cloud('ab-testing', { read: () => st.xp, write: n => { st.xp = Math.max(st.xp, +n || 0); save(); }, merge: (a, b) => Math.max(+a || 0, +b || 0), refresh: () => { if (!cs) menu(); } });
    const cv = $('#agCv'), scene = MBALAB.abScene(cv);
    let visible = false, cs = null, li = 0, step = 1, ideaI = -1, plan = { days: 7, mde: .08 }, run = null, timer = 0, playing = false, speed = 4, out = null, evs = [], flags = {}, newBadges = [], xpRun = 0, day = false, decided = false;
    const rank = xp => { let r = 0; RANKS.forEach((x, i) => { if (xp >= x) r = i; }); return r; };
    const unlocked = i => i === 0 || (st.stars[E.CASES[i - 1].id] || 0) >= 1;
    const starsHtml = n => `<span class="sc-st" aria-label="${n}/3">${[0, 1, 2].map(i => `<b class="${i < n ? 'on' : ''}" style="--i:${i}">★</b>`).join('')}</span>`;
    const pct = (x, d) => (x * 100).toFixed(d == null ? 1 : d) + '%', spct = (x, d) => (x >= 0 ? '+' : '−') + pct(Math.abs(x), d);
    const rp = v => { const a = Math.abs(v); return (v < 0 ? '−' : '') + 'Rp ' + (a >= 1e9 ? T('rpB', { n: (a / 1e9).toFixed(1) }) : a >= 1e6 ? T('rpM', { n: Math.round(a / 1e6) }) : T('rpK', { n: Math.round(a / 1e3) })); };
    const idea = () => cs.ideas[ideaI], ideaOf = i => Object.assign({}, cs.ideas[i], { emoji: IDEM[cs.id][i] });
    const clear = () => { clearTimeout(timer); timer = 0; playing = false; };
    const cn = k => T('c_' + cs.id + '_' + k);
    const labels = () => scene.setLabels({ a: T('pgA'), b: T('pgB'), conv: T('lConv'), chart: T('chChart'), mde: T('chMde'), truth: T('chTruth'), days: T('chDays'), h0: T('bH0'), h1: T('bH1'), alpha: T('bAlpha'), beta: T('bBeta'), pow: T('bPow'), crit: T('bCrit') });
    labels();

    /* ---------- menu ---------- */
    function menu() {
      cs = null; clear(); scene.stop(); $('#agLevel').hidden = true; $('#agMenu').hidden = false;
      const r = rank(st.xp), nx = RANKS[r + 1], pc = nx ? Math.round((st.xp - RANKS[r]) / (nx - RANKS[r]) * 100) : 100;
      $('#agMenu').innerHTML = `<div class="sc-hero"><div><h2>${T('gmHero')}</h2><p>${T('gmSub')}</p></div>
        <div class="sc-rank"><span class="sc-rk">${T('rk' + r)}</span><b>${T('xpLbl', { n: st.xp })}</b><div class="sc-xp"><i style="width:${pc}%"></i></div><small>${nx ? T('xpNext', { n: nx }) : T('xpMax')}</small></div></div>
        <div class="sc-cards2">${E.CASES.map((c, i) => { const ok = unlocked(i), n = st.stars[c.id] || 0;
          return MBALAB.cards.card({ kind: 'ab', icon: c.icon, lift: Math.max(...c.ideas.map(x => x.lift)), i, badge: T('lvN', { n: i + 1 }), title: T('c_' + c.id + '_n'), desc: T('c_' + c.id + '_d'), diff: Math.ceil((i + 1) / E.CASES.length * 5), foot: ok ? starsHtml(n) : '', locked: !ok, lockTip: T('lvLock'), attrs: `data-lv="${i}"` }); }).join('')}</div>
        <h3 class="sc-h3">${T('bdT')}</h3><div class="sc-badges">${BADGES.map(b => `<div class="sc-bd ${st.badges[b] ? 'on' : ''}" title="${T('bdd_' + b)}"><span>${BI[b]}</span><b>${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>`;
    }

    /* ---------- case ---------- */
    function open(i) {
      li = i; cs = E.CASES[i]; step = 1; ideaI = -1; out = null; decided = false; xpRun = 0; newBadges = []; evs = []; flags = {}; clear(); run = null;
      plan = { days: Math.min(cs.maxDays, 7), mde: Math.round(cs.minLift * 100) / 100 };
      scene.reset(); scene.setMode('brief'); scene.setCase(cs, null); scene.setTheme(day); labels();
      $('#agMenu').hidden = true; $('#agLevel').hidden = false; fit(); loopCtl(); render(); sfx('open');
    }
    function say(txt) { const b = $('#agSay'); b.innerHTML = `<b>🧑‍🔬</b> ${txt}`; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); fitStage(); }
    function pills() { $('#agSteps').innerHTML = [1, 2, 3, 4].map(i => `<li class="${step === i ? 'on' : step > i ? 'done' : ''}"><span>${step > i ? '✓' : i}</span>${T('st' + i)}</li>`).join(''); }
    function hud() { const r = rank(st.xp); $('#agHud').innerHTML = `<button type="button" class="sc-back" data-a="menu">← ${T('toMenu')}</button><b class="sc-lt">${T('lvN', { n: li + 1 })} · ${cs.icon} ${cn('n')}</b><span class="sc-chip">${T('rk' + r)} · ${T('xpLbl', { n: st.xp + xpRun })}</span>`; }
    function render() {
      hud(); pills(); const P = $('#agPanel'); P.scrollTop = 0;
      if (step === 1) brief(P); else if (step === 2) planView(P); else if (step === 3) runView(P); else resultView(P);
    }

    /* step 1: brief and idea */
    function brief(P) {
      say(T('sayBrief'));
      P.innerHTML = `<div class="sc-brief"><b>${cs.icon} ${cn('n')}</b><p>${cn('d')}</p>
        <div class="sc-facts"><span>📊 ${T('brBase', { p: (cs.p0 * 100).toFixed(cs.p0 < .1 ? 1 : 0) })}</span><span>👥 ${T('brTraffic', { n: cs.traffic.toLocaleString() })}</span><span>💰 ${T('brValue', { v: rp(cs.value) })}</span><span>🎯 ${T('brMin', { n: Math.round(cs.minLift * 100) })}</span></div>
        <p class="sc-hint"><b>${T('brMetric')}:</b> ${cn('m')}</p></div>
        <h3 class="sc-h3">${T('brPick')}</h3><div class="sc-ideas" role="radiogroup">${cs.ideas.map((x, i) => `<button type="button" role="radio" aria-checked="${ideaI === i}" class="sc-idea ${ideaI === i ? 'on' : ''}" data-idea="${i}"><span class="sc-ie" aria-hidden="true">${IDEM[cs.id][i]}</span><span class="sc-it"><b>${cn('i' + i)}</b><small>${cn('i' + i + 'w')}</small></span></button>`).join('')}</div>
        <p class="sc-hint">${T('brHint')}</p><div class="sc-foot"><button type="button" class="sc-main" data-a="toplan" ${ideaI < 0 ? 'disabled' : ''}>${T('brGo')} →</button></div>`;
    }
    function pick(i) { ideaI = i; scene.setCase(cs, ideaOf(i)); sfx('tick'); render(); }

    /* step 2: plan */
    const calc = () => { const n = E.nPer(cs, plan.days), p0 = cs.p0, p1 = p0 * (1 + plan.mde), se = Math.sqrt(p0 * (1 - p0) / n + p1 * (1 - p1) / n); return { n, power: E.power(p0, plan.mde, n), effZ: (p1 - p0) / se, need: E.daysFor(cs, plan.mde) }; };
    function previewHist() { const p0 = cs.p0, p1 = p0 * (1 + plan.mde), a = []; for (let d = 1; d <= plan.days; d++) { const n = E.nPer(cs, d), hw = E.Z * Math.sqrt(p0 * (1 - p0) / n + p1 * (1 - p1) / n) / p0; a.push({ lift: plan.mde, lo: plan.mde - hw, hi: plan.mde + hw }); } return a; }
    function planView(P) {
      say(T('sayPlan')); scene.setMode('plan'); scene.setCase(cs, ideaOf(ideaI));
      P.innerHTML = `<div class="sc-brief"><b>${IDEM[cs.id][ideaI]} ${cn('i' + ideaI)}</b><p>${cn('d')}</p></div>
        <div class="sc-sl"><label for="agDays"><span>${T('plDays')}</span><output id="agDaysO"></output></label><input type="range" id="agDays" min="3" max="${cs.maxDays}" step="1" value="${plan.days}"></div>
        <div class="sc-sl"><label for="agMde"><span>${T('plMde')}</span><output id="agMdeO"></output></label><input type="range" id="agMde" min="2" max="50" step="1" value="${Math.round(plan.mde * 100)}"></div>
        <div class="sc-kpis"><div><small>${T('plN')}</small><b id="agN"></b></div><div class="hi" id="agPwBox"><small>${T('plPow')}</small><b id="agPw"></b></div><div><small>${T('brMin', { n: Math.round(cs.minLift * 100) })}</small><b>≈ ${E.daysFor(cs, cs.minLift)} ${T('chDays')}</b></div></div>
        <div class="sc-msgs" id="agMsgs"></div><p class="sc-hint">🔒 ${T('plLock')}</p><div class="sc-foot"><button type="button" class="sc-btn ghost" data-a="tobrief">← ${T('st1')}</button><button type="button" class="sc-main go" data-a="start">${T('plGo')} ▶</button></div>`;
      planUpdate();
    }
    function planUpdate() {
      const c = calc(); $('#agDaysO').textContent = T('plD', { n: plan.days }); $('#agMdeO').textContent = '+' + Math.round(plan.mde * 100) + '%'; $('#agN').textContent = c.n.toLocaleString(); $('#agPw').textContent = Math.round(c.power * 100) + '%';
      $('#agPwBox').className = c.power >= .8 ? 'hi gain' : 'hi loss'; const m = [];
      m.push(c.power >= .8 ? `<p class="ag-m ok">✅ ${T('plOk')}</p>` : `<p class="ag-m warn">⚠️ ${T('plLow')}</p><p class="ag-m">${T('plNeed', { d: c.need, m: Math.round(plan.mde * 100) })}</p>`);
      if (plan.mde > cs.minLift * 1.25) m.push(`<p class="ag-m warn">🎯 ${T('plBig', { m: Math.round(plan.mde * 100), n: Math.round(cs.minLift * 100) })}</p>`);
      if (plan.days % 7) m.push(`<p class="ag-m">📅 ${T('plWeek')}</p>`);
      $('#agMsgs').innerHTML = m.join(''); scene.setPlan({ days: plan.days, mde: plan.mde, power: c.power, effZ: c.effZ, preview: previewHist() });
    }

    /* step 3: run */
    function start() {
      step = 3; run = E.newRun(cs, idea(), (Date.now() ^ (li * 7919)) >>> 0); evs = []; flags = {}; decided = false; scene.reset(); scene.setMode('run'); scene.setCase(cs, ideaOf(ideaI)); scene.setPlan({ days: plan.days, mde: plan.mde, power: 0, effZ: 0, preview: null });
      scene.setHist([], plan.days); playing = true; render(); sfx('open'); timer = setTimeout(tick, 500);
    }
    function tick() {
      if (!playing || !run) return; advance(); if (run.day >= plan.days) { finishRun(false); return; } timer = setTimeout(tick, DELAY[speed]);
    }
    function addEv(txt, kind) { evs.unshift({ txt, kind }); evs = evs.slice(0, 3); }
    function advance() {
      const rec = E.stepDay(run), s = rec.stat, d = run.day;
      scene.setCounts({ n: run.nA, c: run.cA }, { n: run.nB, c: run.cB }); scene.setHist(run.hist, plan.days); scene.emit(rec, DELAY[speed] / 1000);
      if (s.sig && d >= 2 && !flags.sig) { flags.sig = d; addEv(T('evSig', { d }), 'warn'); sfx('lose'); }
      else if (flags.sig && !s.sig && !flags.gone) { flags.gone = d; addEv(T('evGone'), 'info'); sfx('tick'); }
      if (s.srm && !flags.srm && d >= 2) { flags.srm = d; addEv(T('evSrm', { d, a: Math.round((1 - s.shareB) * 100), b: Math.round(s.shareB * 100) }), 'bad'); sfx('lose'); }
      if (d % 7 === 0 && d < plan.days && !flags['w' + d]) { flags['w' + d] = 1; addEv(T('evWeek'), 'info'); }
      paintRun();
    }
    function runView(P) {
      say(playing ? T('sayRun') : T('sayDec'));
      P.innerHTML = `<div class="sc-run"><div class="sc-rt"><b id="agDay"></b><span class="sc-prog"><i id="agProg"></i></span></div>
        <div class="sc-k4"><div class="ag-k"><small>${T('rnLift')}</small><b id="agLift">—</b><em id="agCI"></em></div><div class="ag-k"><small>${T('rnP')}</small><b id="agP">—</b></div><div class="ag-k" id="agSplitK"><small>${T('rnSplit')}</small><b id="agSplit">50% / 50%</b><em id="agSplitS"></em></div></div>
        <div class="sc-ev" id="agEv" aria-live="polite"></div><div id="agCtl"></div></div>`;
      paintRun(); ctl();
    }
    function paintRun() {
      if (step !== 3 || !$('#agDay')) return; const s = run.hist[run.hist.length - 1];
      $('#agDay').textContent = T('rnDay', { d: run.day, n: plan.days }); $('#agProg').style.width = Math.round(run.day / plan.days * 100) + '%';
      if (s) { $('#agLift').textContent = spct(s.lift); $('#agLift').className = s.lo > 0 ? 'gn' : s.hi < 0 ? 'rd' : ''; $('#agCI').textContent = '[' + spct(s.lo, 0) + ' … ' + spct(s.hi, 0) + ']'; $('#agP').textContent = s.p < .001 ? '<0.001' : s.p.toFixed(3); $('#agP').className = s.sig ? 'gn' : '';
        $('#agSplit').textContent = Math.round((1 - s.shareB) * 100) + '% / ' + Math.round(s.shareB * 100) + '%'; $('#agSplitK').className = 'ag-k' + (s.srm ? ' bad' : ''); $('#agSplitS').textContent = s.srm ? '⚠️ ' + T('rnSplitBad') : '✓ ' + T('rnSplitOk'); }
      $('#agEv').innerHTML = evs.map(e => `<p class="ag-e ${e.kind}">${e.txt}</p>`).join('');
    }
    function ctl() {
      const C = $('#agCtl'); if (!C) return;
      if (!decided && (playing || run.day < plan.days) && !run.finished) {
        C.innerHTML = `<div class="sc-ctl"><button type="button" class="sc-btn" data-a="pp">${playing ? '⏸ ' + T('rnPause') : '▶ ' + T('rnPlay')}</button><span class="sc-spd" role="group" aria-label="${T('rnSpeed')}">${[1, 4, 16].map(v => `<button type="button" class="${speed === v ? 'on' : ''}" data-spd="${v}">${v}×</button>`).join('')}</span></div>
          <button type="button" class="sc-btn warnb" data-a="stop">🛑 ${T('rnStop')}</button><p class="sc-hint">${T('rnStopWarn')}</p>`;
      } else decideView(C);
    }
    function finishRun(early) {
      clear(); while (run.day < 2) advance(); run.finished = true; run.early = early; if (!early) { addEv(T('evEnd'), 'info'); } paintRun(); say(T('sayDec')); sfx('win'); ctl();
    }
    function decideView(C) {
      const s = run.hist[run.hist.length - 1] || E.stats(0, 0, 0, 0);
      C.innerHTML = `<p class="sc-sum">${T('rsObs')}: <b>${spct(s.lift)}</b> [${spct(s.lo)} … ${spct(s.hi)}] · p ${s.p < .001 ? '<0.001' : s.p.toFixed(3)}</p><h3 class="sc-h3">${T('dT')}</h3>
        <div class="sc-dec"><button type="button" class="sc-d ship" data-dec="ship"><span>🚀</span><b>${T('dShip')}</b><small>${T('dShipS')}</small></button><button type="button" class="sc-d keep" data-dec="keep"><span>🛑</span><b>${T('dKeep')}</b><small>${T('dKeepS')}</small></button><button type="button" class="sc-d inv" data-dec="invalid"><span>🧪</span><b>${T('dInvalid')}</b><small>${T('dInvS')}</small></button></div>`;
    }

    /* step 4: result */
    function decide(d) {
      if (decided) return; decided = true; const j = E.judge(cs, idea(), plan, run, d), n = E.starsOf(j.total), had = Object.assign({}, st.badges), set = b => { st.badges[b] = true; };
      if (j.power >= .8 && !j.early) set('planner'); if (j.falseAlarm && !j.early) set('patient'); if (j.good === 'keep' && d === 'keep') set('sceptic'); if (cs.srm && d === 'invalid') set('detective'); if (d === 'ship' && j.dec === 50) set('shipper');
      st.stars[cs.id] = Math.max(st.stars[cs.id] || 0, n); if (E.CASES.every(c => (st.stars[c.id] || 0) === 3)) set('allstar');
      const gain = Math.round(j.total / 3) + n * 30; newBadges = BADGES.filter(b => st.badges[b] && !had[b]); st.xp += gain; xpRun = gain; save(); cloud.changed();
      cloud.attempt({ at: Date.now(), score: j.total, variant: cs.id, detail: { stars: n, idea: idea().id, days: plan.days, mde: plan.mde, decision: d, power: Math.round(j.power * 100), early: j.early } });
      out = { j, n, d, gain }; step = 4; scene.reveal(j.truth, j.truth > 0 ? 'B' : 'A'); render(); sfx(n >= 2 ? 'win' : 'lose'); if (n === 3) confetti();
    }
    function resultView(P) {
      const { j, n, d, gain } = out, s = run.hist[run.hist.length - 1], fb = [];
      say(j.total >= 70 ? T('fbDecOk') : T('rsBest', { c: T(j.good === 'ship' ? 'dShip' : j.good === 'keep' ? 'dKeep' : 'dInvalid') }));
      if (cs.srm && d !== 'invalid') fb.push(T('fbSrmSkip')); else if (d === j.good) fb.push(T('fbDecOk'));
      else if (d === 'ship' && j.truth <= 0) fb.push(T('fbShipBad')); else if (d === 'ship') fb.push(T('fbShipTiny', { n: Math.round(cs.minLift * 100) })); else if (d === 'keep') fb.push(T('fbKeepMiss')); else fb.push(T('fbInvBad'));
      if (d === 'keep' && j.good === 'keep') fb.push(T('fbKeepOk'));
      if (j.early) fb.push(T('fbEarly')); else if (j.falseAlarm) fb.push(T('fbFalse', { d: run.cross[0] }));
      if (j.power < .8) fb.push(T('fbPow', { p: Math.round(j.power * 100), d: plan.days, n: j.need })); if (plan.mde > cs.minLift * 1.25) fb.push(T('fbBig', { n: Math.round(cs.minLift * 100) }));
      const imp = d === 'ship' ? j.impact : 0, miss = d === 'keep' ? Math.max(0, j.impact) : 0;
      P.innerHTML = `<div class="sc-res"><div class="sc-big">${starsHtml(n)}<b>${T('rsScore', { s: j.total })}</b><em class="sc-xpg">${T('xpGain', { n: gain })}</em></div>
        <div class="sc-kpis"><div><small>${T('rsDec')}</small><b>${j.dec}/50</b></div><div><small>${T('rsDesign')}</small><b>${j.design}/30</b></div><div><small>${T('rsDisc')}</small><b>${j.disc}/20</b></div></div>
        <div class="sc-ver"><div><small>${T('rsObs')}</small><b>${spct(s.lift)} <em>[${spct(s.lo, 0)} … ${spct(s.hi, 0)}]</em></b></div><div class="hi"><small>${T('rsTruth')}</small><b class="${j.truth >= cs.minLift ? 'gn' : j.truth > 0 ? '' : 'rd'}">${spct(j.truth)}</b></div></div>
        <p class="sc-memo">${T('rsImpact', { v: rp(d === 'ship' ? imp : miss || j.impact) })}</p>
        <ul class="sc-fb">${fb.map(x => `<li>${x}</li>`).join('')}</ul><p class="sc-tw">💡 ${cn('tw')}</p>
        ${newBadges.length ? `<div class="sc-new">${newBadges.map(b => `<div class="sc-bd on pop"><span>${BI[b]}</span><b>${T('bdNew')}: ${T('bd_' + b)}</b><small>${T('bdd_' + b)}</small></div>`).join('')}</div>` : ''}
        <div class="sc-foot"><button type="button" class="sc-btn" data-a="again">${T('again')}</button>${n >= 1 && li < E.CASES.length - 1 ? `<button type="button" class="sc-main inl" data-a="next">${T('nextLv')}</button>` : ''}<button type="button" class="sc-btn ghost" data-a="menu">${T('toMenu')}</button></div></div>`;
    }
    function confetti() { const box = $('#agLevel'), cols = ['#ffd166', '#6ee7b7', '#4dd2ff', '#ff6ad5', '#a78bfa']; for (let i = 0; i < 36; i++) { const e = document.createElement('i'); e.className = 'sc-cf'; e.style.cssText = `left:${10 + Math.random() * 80}%;background:${cols[i % 5]};--dx:${(Math.random() - .5) * 200}px;--r:${Math.random() * 720}deg;animation-delay:${Math.random() * .3}s`; box.appendChild(e); setTimeout(() => e.remove(), 2200); } }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const l = e.target.closest('[data-lv]'); if (l && l.closest('#agMenu')) { sfx('tick'); open(+l.dataset.lv); return; }
      if (!cs || !e.target.closest('#agLevel')) return;
      const id = e.target.closest('[data-idea]'); if (id) { if (step === 1) pick(+id.dataset.idea); return; }
      const sp = e.target.closest('[data-spd]'); if (sp) { speed = +sp.dataset.spd; sfx('tick'); ctl(); return; }
      const dc = e.target.closest('[data-dec]'); if (dc) { decide(dc.dataset.dec); return; }
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a; sfx(a === 'start' ? 'open' : 'tick');
      if (a === 'menu') menu(); else if (a === 'toplan') { step = 2; render(); } else if (a === 'tobrief') { step = 1; scene.setMode('brief'); scene.setCase(cs, ideaOf(ideaI)); render(); } else if (a === 'start') start();
      else if (a === 'pp') { playing = !playing; if (playing) { timer = setTimeout(tick, 120); } else clearTimeout(timer); ctl(); say(playing ? T('sayRun') : T('sayDec')); }
      else if (a === 'stop') finishRun(true); else if (a === 'again') open(li); else if (a === 'next') open(li + 1);
    });
    host.addEventListener('input', e => { if (e.target.id === 'agDays') { plan.days = +e.target.value; planUpdate(); } else if (e.target.id === 'agMde') { plan.mde = +e.target.value / 100; planUpdate(); } });

    /* ---------- loop ---------- */
    function loopCtl() { if (visible && cs && !document.hidden) scene.start(); else { scene.stop(); scene.draw(); } }
    function fitStage() {
      const L = $('#agLevel'); if (!L || L.hidden) return; const col = $('.sc-left'), sy = $('#agSay'), sg = $('#agStage'), colW = col.clientWidth;
      const mobile = window.matchMedia('(max-width:900px)').matches, availH = mobile ? Math.min(L.clientHeight * .5, colW * 9 / 16) : col.clientHeight - sy.offsetHeight - 12;
      const w = Math.max(220, Math.min(colW, availH * 16 / 9)); sg.style.width = Math.floor(w) + 'px';
    }
    function fit() { fitStage(); const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); scene.draw(); }
    if (window.ResizeObserver) { new ResizeObserver(() => fit()).observe(cv); new ResizeObserver(() => fitStage()).observe($('#agLevel')); }
    window.addEventListener('resize', fitStage);
    document.addEventListener('visibilitychange', () => { loopCtl(); if (document.hidden && playing) { playing = false; clearTimeout(timer); if (step === 3) ctl(); } });
    menu();
    return { menu, fit, setVisible(v) { visible = v; loopCtl(); if (v && !cs) menu(); if (!v && playing) { playing = false; clearTimeout(timer); if (step === 3) ctl(); } }, setTheme(d) { day = !!d; scene.setTheme(d); }, relabel() { labels(); if (cs) { render(); if (step === 2) planUpdate(); if (step === 3) paintRun(); } else menu(); }, get inLevel() { return !!cs; } };
  }
  window.MBALAB = window.MBALAB || {}; MBALAB.abGame = create;
})();
