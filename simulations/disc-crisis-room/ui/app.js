/* DISC Crisis Room: UI wiring (template "Game"). Scoring lives in engine.js, drawing in scene.js, texts in strings.js.
   Three levels of two crises each. Every level gives a short read; the three reads together make the full profile. */
MBALAB.sims.define('disc-crisis-room', {
  mount(host) {
    const E = MBALAB.disc, $ = s => host.querySelector(s), T = (k, p) => t('dc_' + k, p), S = E.STYLES;
    const still = () => document.body.classList.contains('still');
    const sfx = MBALAB.util.sfx;
    const KEY = 'mbalab-dc-game', RANKS = [0, 60, 160, 300], XP_FIRST = 60, XP_REPLAY = 15, XP_FULL = 80;
    const LEVELS = [{ icon: '🔥', scenes: [0, 1] }, { icon: '🤝', scenes: [2, 3] }, { icon: '🚨', scenes: [4, 5] }];
    const BADGES = ['D', 'I', 'S', 'C', 'mix', 'full'], BI = { D: '🦁', I: '🎉', S: '🤲', C: '🔬', mix: '⚖️', full: '🌟' };
    const METER = { D: 'mR', I: 'mM', S: 'mH', C: 'mQ' };
    const cv = $('#dcCv'), scene = E.Scene(cv);
    let st = { xp: 0, done: {}, badges: {}, full: false };
    try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
    let gs = null, li = 0, step = 1, busy = false, visible = false, timers = [], read = null, xpRun = 0, newBadges = [], day = false;
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const sn = k => t('st' + k + 'n'), word = k => sn(k).split(' ')[0];
    const rank = xp => { let r = 0; RANKS.forEach((x, i) => { if (xp >= x) r = i; }); return r; };
    const unlocked = i => i === 0 || !!st.done[i - 1];
    const allDone = () => LEVELS.every((l, i) => st.done[i]);
    const total = () => { const sc = { D: 0, I: 0, S: 0, C: 0 }; LEVELS.forEach((l, i) => { const d = st.done[i]; d && S.forEach(k => { sc[k] += d.score[k] || 0; }); }); return E.result({ score: sc }); };

    /* ---------- menu ---------- */
    function menu() {
      clear(); gs = null; read = null; scene.stop();
      $('#dcLevel').hidden = true; $('#dcMenu').hidden = false;
      const r = rank(st.xp), nx = RANKS[r + 1], pc = nx ? Math.round((st.xp - RANKS[r]) / (nx - RANKS[r]) * 100) : 100;
      const pf = allDone() ? total() : null;
      $('#dcMenu').innerHTML = `<div class="sc-hero"><div><h2>${T('startT')}</h2><p>${T('startSub')}</p></div>
        <div class="sc-rank"><span class="sc-rk">${T('rk' + r)}</span><b>${T('xpLbl', { n: st.xp })}</b><div class="sc-xp"><i style="width:${pc}%"></i></div><small>${nx ? T('xpNext', { n: nx }) : T('xpMax')}</small></div></div>
        <div class="sc-cards2 dc-levels">${LEVELS.map((L, i) => { const ok = unlocked(i), d = st.done[i];
          return MBALAB.cards.card({ kind: 'disc', icon: L.icon, i, badge: T('lvN', { n: i + 1 }), title: T('lv' + (i + 1) + 'n'), desc: T('lv' + (i + 1) + 'd'), diff: Math.ceil((i + 1) / LEVELS.length * 5), foot: ok ? (d ? T('lvRead', { code: d.code }) + ' ↻' : '▶') : '', locked: !ok, lockTip: T('lvLock'), attrs: `data-lv="${i}"` }); }).join('')}</div>
        <div class="dc-pf">${pf ? `<h3 class="sc-h3">${T('pfT')}: <span class="dc-badge">${pf.code}</span></h3><button type="button" class="sc-btn" data-a="profile">${T('seeProfile')}</button>` : `<p class="sc-memo">${T('pfHint')}</p>`}</div>
        <h3 class="sc-h3">${T('bdT')}</h3><div class="sc-badges">${BADGES.map(b => `<div class="sc-bd ${st.badges[b] ? 'on' : ''}" title="${T(b.length === 1 ? 'bddStyle' : 'bdd_' + b)}"><span>${BI[b]}</span><b>${b.length === 1 ? word(b) : T('bd_' + b)}</b><small>${T(b.length === 1 ? 'bddStyle' : 'bdd_' + b)}</small></div>`).join('')}</div>`;
    }

    /* ---------- level ---------- */
    function open(i) {
      clear(); li = i; step = 1; read = null; xpRun = 0; newBadges = []; busy = false;
      gs = E.create(Math.floor(Math.random() * 1e9) + 1);
      $('#dcMenu').hidden = true; $('#dcLevel').hidden = false;
      scene.set({ resolved: false }); scene.setTheme(day); fit(); loop(); question(); sfx('open');
      $('#dcScroll').scrollTop = 0;
    }
    function say(txt) { const b = $('#dcSay'); b.innerHTML = `<b>🧑‍💼</b> ${txt}`; b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); fitStage(); }
    function pills() { $('#dcSteps').innerHTML = [1, 2, 3].map(i => `<li class="${step === i ? 'on' : step > i ? 'done' : ''}"><span>${step > i ? '✓' : i}</span>${i < 3 ? T('stCrisis', { n: i }) : T('stRead')}</li>`).join(''); }
    function hud() { const r = rank(st.xp); $('#dcHud').innerHTML = `<button type="button" class="sc-back" data-a="menu">← ${T('toMenu')}</button><b class="sc-lt">${T('lvN', { n: li + 1 })} · ${LEVELS[li].icon} ${T('lv' + (li + 1) + 'n')}</b><span class="sc-chip">${T('rk' + r)} · ${T('xpLbl', { n: st.xp + xpRun })}</span>`; }
    const meters = () => `<div class="dc-meters">${S.map(k => `<div class="dc-meter">${T(METER[k])}<i><b data-m="${k}" style="width:${gs.meters[k]}%"></b></i></div>`).join('')}</div>`;
    const setMeters = () => S.forEach(k => { const b = $('#dcPanel [data-m="' + k + '"]'); b && (b.style.width = gs.meters[k] + '%'); });

    function question() {
      const n = gs.scene, i = LEVELS[li].scenes[n], mv = gs.step, ord = gs.orders[n][mv], pre = 's' + i + (mv ? 'b' : 'a');
      step = n + 1; hud(); pills(); say(T(n ? 'say2' : 'say1'));
      scene.set({ icon: E.ICONS[i], resolved: false, alarm: mv ? .5 : 1 });
      $('#dcPanel').innerHTML = `${meters()}<div class="sc-brief"><b>${E.ICONS[i]} ${t('s' + i + 't')}</b><p class="dc-sit">${t('s' + i + 's')}</p><p class="dc-q">${T(mv ? 'nextStep' : 'firstMove')}</p></div>
        <div class="dc-opts">${ord.map((idx, pos) => `<button type="button" class="dc-opt" data-i="${idx}"><kbd>${pos + 1}</kbd><span>${t(pre + idx)}</span></button>`).join('')}</div>`;
      busy = false;
    }
    function choose(idx) {
      if (busy || !gs || read) return; busy = true; sfx('click');
      const sc0 = gs.scene;
      E.pick(gs, idx); scene.react(idx); setMeters(); sfx('on');
      $('#dcPanel').querySelectorAll('.dc-opt').forEach(b => { b.disabled = true; if (+b.dataset.i === idx) b.classList.add('pick'); });
      if (gs.scene === sc0) { later(question, still() ? 100 : 950); return; }        // second move of the same crisis
      scene.set({ resolved: true }); scene.burst('resolved'); sfx('ok');
      later(() => { if (gs.scene >= 2) finishLevel(); else question(); }, still() ? 200 : 1500);
    }

    /* ---------- level read ---------- */
    function finishLevel() {
      const r = E.result(gs), first = !st.done[li], wasFull = allDone();
      st.done[li] = { code: r.primary, score: Object.assign({}, gs.score) };
      xpRun = first ? XP_FIRST : XP_REPLAY;
      const ear = k => { if (!st.badges[k]) { st.badges[k] = 1; newBadges.push(k); } };
      ear(r.primary); if (r.blend) ear('mix');
      if (allDone()) { if (!wasFull) { xpRun += XP_FULL; } ear('full'); }
      st.xp += xpRun; save(); read = r; step = 3;
      scene.stop(); hud(); pills(); say(T('sayEnd')); renderRead(); sfx('ok'); confetti();
    }
    function bars(pct) { return `<div class="dc-bars">${S.map(k => `<div class="dc-bar"><span>${word(k)}</span><i><b style="width:${pct[k]}%"></b></i><span>${pct[k]}%</span></div>`).join('')}</div>`; }
    function renderRead() {
      const r = read, P = r.primary, last = li >= LEVELS.length - 1;
      $('#dcPanel').innerHTML = `<div class="sc-res"><div class="sc-big"><span class="dc-badge">${P}</span><b>${sn(P)}</b><em class="sc-xpg">${T('xpGain', { n: xpRun })}</em></div>
        <h3 class="sc-h3">${T('rsLevel')}</h3><p class="sc-memo">${t('st' + P + 'tag')}</p>${bars(r.pct)}
        <p class="sc-memo">${T('lvNote')}</p>
        ${newBadges.length ? `<div class="sc-new">${newBadges.map(b => `<div class="sc-bd on pop"><span>${BI[b]}</span><b>${b.length === 1 ? word(b) : T('bd_' + b)}</b><small>${T(b.length === 1 ? 'bddStyle' : 'bdd_' + b)}</small></div>`).join('')}</div>` : ''}
        <div class="sc-foot"><button type="button" class="sc-btn" data-a="again">${T('again')}</button>${!last ? `<button type="button" class="sc-main inl" data-a="next">${T('nextLv')}</button>` : allDone() ? `<button type="button" class="sc-main inl" data-a="profile">${T('seeProfile')}</button>` : ''}<button type="button" class="sc-btn ghost" data-a="menu">${T('toLevels')}</button></div></div>`;
      $('#dcSr') && ($('#dcSr').textContent = T('rsLevel') + ': ' + P);
    }

    /* ---------- full profile (all three levels) ---------- */
    function radar(canvas, r) {
      const d = Math.min(2, window.devicePixelRatio || 1), size = 340; canvas.width = size * d; canvas.height = size * d;
      const g = canvas.getContext('2d'), cs = getComputedStyle(host.querySelector('#dc')), col = n => cs.getPropertyValue(n).trim() || '#888';
      g.setTransform(d, 0, 0, d, 0, 0); g.clearRect(0, 0, size, size);
      const c = size / 2, R = size / 2 - 46, ang = [-Math.PI / 2, 0, Math.PI / 2, Math.PI], rgb = col('--tint-rgb') || '255,255,255';
      for (let k = 1; k <= 4; k++) { g.beginPath(); ang.forEach((a, i) => { const x = c + Math.cos(a) * R * k / 4, y = c + Math.sin(a) * R * k / 4; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); g.strokeStyle = 'rgba(' + rgb + ',' + (k === 4 ? .45 : .2) + ')'; g.lineWidth = 1; g.stroke(); }
      ang.forEach(a => { g.beginPath(); g.moveTo(c, c); g.lineTo(c + Math.cos(a) * R, c + Math.sin(a) * R); g.strokeStyle = 'rgba(' + rgb + ',.25)'; g.stroke(); });
      const maxv = Math.max(40, ...S.map(k => r.pct[k]));
      g.beginPath(); S.forEach((k, i) => { const v = r.pct[k] / maxv; const x = c + Math.cos(ang[i]) * R * v, y = c + Math.sin(ang[i]) * R * v; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath();
      g.fillStyle = 'rgba(77,210,255,.28)'; g.fill(); g.strokeStyle = col('--cy'); g.lineWidth = 2.5; g.stroke();
      g.font = '800 15px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = col('--txt');
      S.forEach((k, i) => { g.fillText(k, c + Math.cos(ang[i]) * (R + 22), c + Math.sin(ang[i]) * (R + 22)); const v = r.pct[k] / maxv; g.beginPath(); g.fillStyle = col('--mg'); g.arc(c + Math.cos(ang[i]) * R * v, c + Math.sin(ang[i]) * R * v, 4, 0, Math.PI * 2); g.fill(); g.fillStyle = col('--txt'); });
    }
    let profile = false;
    function showProfile() {
      if (!allDone()) return;
      profile = true; clear(); scene.stop();
      $('#dcMenu').hidden = true; $('#dcLevel').hidden = false; step = 3; read = read || {};
      hud(); $('#dcSteps').innerHTML = ''; fit(); renderProfile();
    }
    function renderProfile() {
      const r = total(), P = r.primary, Sx = r.secondary;
      const others = S.filter(k => k !== P).map(k => `<li><b>${sn(k)}:</b> ${t('st' + k + 'wrk')}</li>`).join('');
      say(T('rsPrimary') + ': ' + (r.blend ? T('rsBlend', { a: sn(P), b: sn(Sx) }) : sn(P)));
      $('#dcPanel').innerHTML = `<div class="sc-res"><h3 class="sc-h3">${T('rsTitle')}</h3>
        <div class="dc-rtop"><canvas id="dcRadar" aria-label="DISC radar"></canvas><div>
          <p><span class="dc-badge">${r.code}</span> <b>${r.blend ? T('rsBlend', { a: sn(P), b: sn(Sx) }) : sn(P)}</b></p>
          <p class="sc-memo">${t('st' + P + 'tag')}${r.blend ? '<br>' + t('st' + Sx + 'tag') : ''}</p>${bars(r.pct)}</div></div>
        <div class="dc-grid"><div><h4>${T('rsStr')}</h4><p>${t('st' + P + 'str')}</p></div><div><h4>${T('rsPrs')}</h4><p>${t('st' + P + 'prs')}</p></div>
          <div><h4>${T('rsBld')}</h4><p>${t('st' + P + 'bld')}</p></div><div><h4>${T('rsWrk')}</h4><p>${t('st' + P + 'wrk')}</p></div></div>
        <div class="dc-oth"><h4>${T('rsOthers')}</h4><ul>${others}</ul></div>
        <p class="sc-memo">${T('rsNote')}</p>
        <div class="sc-foot"><button type="button" class="sc-btn" data-a="menu">${T('toLevels')}</button></div></div>`;
      radar($('#dcRadar'), r);
    }

    function confetti() { const box = $('#dcLevel'), cols = ['#ffd166', '#6ee7b7', '#4dd2ff', '#ff6ad5', '#a78bfa']; if (still()) return; for (let i = 0; i < 36; i++) { const e = document.createElement('i'); e.className = 'sc-cf'; e.style.cssText = `left:${10 + Math.random() * 80}%;background:${cols[i % 5]};--dx:${Math.round((Math.random() - .5) * 240)}px;--r:${Math.round(Math.random() * 720)}deg;animation-delay:${(Math.random() * .3).toFixed(2)}s`; box.appendChild(e); setTimeout(() => e.remove(), 2800); } }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const l = e.target.closest('[data-lv]'); if (l && l.closest('#dcMenu')) { sfx('tick'); profile = false; open(+l.dataset.lv); return; }
      const o = e.target.closest('.dc-opt'); if (o && !o.disabled) { choose(+o.dataset.i); return; }
      const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a; sfx('tick');
      if (a === 'menu') { profile = false; menu(); } else if (a === 'again') open(li); else if (a === 'next') open(li + 1); else if (a === 'profile') showProfile();
    });
    document.addEventListener('keydown', e => {
      if (!visible || !gs || read || busy || profile || $('#dcLevel').hidden || e.ctrlKey || e.metaKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ''))) return;
      if (/^[1-4]$/.test(e.key)) { const b = $('#dcPanel').querySelectorAll('.dc-opt')[+e.key - 1]; b && !b.disabled && choose(+b.dataset.i); }
    });

    /* ---------- assistant Bit ---------- */
    function hints() {
      if (!gs || $('#dcLevel').hidden) return { state: [], generic: ['dc_nbt_s1', 'dc_nbt_s2'] };
      if (read || profile) return { state: ['dc_nbt_end'], generic: ['dc_nbt_end'] };
      return { state: [], generic: ['dc_nbt_p1', 'dc_nbt_p2', 'dc_nbt_p3'] };
    }
    if (window.SmartAssistant) SmartAssistant.create(host, { root: $('#dc'), hints, busy: () => false });

    /* ---------- loop + sizing ---------- */
    function loop() { if (visible && gs && !read && !profile && !still() && !document.hidden) scene.start(); else if (scene.running) scene.stop(); else scene.draw(); }
    document.addEventListener('visibilitychange', loop);
    function fitStage() {
      const L = $('#dcLevel'); if (!L || L.hidden) return; const col = $('.sc-left'), sy = $('#dcSay'), sg = $('#dcStage'), colW = col.clientWidth;
      const mobile = window.matchMedia('(max-width:900px)').matches, availH = mobile ? Math.min(L.clientHeight * .5, colW * 9 / 16) : col.clientHeight - sy.offsetHeight - 12;
      const w = Math.max(220, Math.min(colW, availH * 16 / 9)); sg.style.width = Math.floor(w) + 'px';
    }
    function fit() { fitStage(); const w = cv.clientWidth || 640, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); scene.draw(); }
    if (window.ResizeObserver) { new ResizeObserver(() => fit()).observe(cv); new ResizeObserver(() => fitStage()).observe($('#dcLevel')); }
    window.addEventListener('resize', fitStage);

    menu();
    this._dc = { fit, loop, setVisible(v) { visible = v; loop(); }, theme(d) { day = !!d; scene.setTheme(d); if (profile) renderProfile(); },
      relabel() { if ($('#dcLevel').hidden) menu(); else if (profile) { hud(); renderProfile(); } else if (read) { hud(); pills(); renderRead(); say(T('sayEnd')); } else if (gs) question(); } };
  },
  onShow() { const m = this._dc; if (!m) return; m.theme(MBALAB.theme && MBALAB.theme.isDay()); m.setVisible(true); m.fit(); },
  onHide() { const m = this._dc; if (m) m.setVisible(false); },
  onLang() { const m = this._dc; if (m) m.relabel(); },
  onTheme(day) { const m = this._dc; if (m) m.theme(day); }
});
