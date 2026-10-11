/* Negotiation & BATNA: UI wiring. Rules live in engine.js, drawing in scene.js. */
MBALAB.sims.define('negotiation-batna', {
  mount(host) {
    const N = MBALAB.nego, $ = s => host.querySelector(s), AV = ['👩‍💼', '🧔', '🕶️', '🎩'];
    const still = () => document.body.classList.contains('still');
    const sfx = n => { try { MBALAB.audio && MBALAB.audio.play(n); } catch (e) {} };
    const KEY = 'mbalab-nb-best';
    let best = [0, 0, 0, 0];
    try { const b = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(b)) best = [0, 1, 2, 3].map(i => +b[i] || 0); } catch (e) {}
    const saveBest = () => { try { localStorage.setItem(KEY, JSON.stringify(best)); } catch (e) {} };

    const cv = $('#nbCv'), scene = N.Scene(cv);
    scene.label(k => t(k));
    let gs = null, idx = 0, busy = false, timers = [], visible = false;
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

    const starsTxt = n => '★'.repeat(n) + '☆'.repeat(3 - n);
    const unit = n => t('unit', { n });

    /* ---------- level cards ---------- */
    function cards() {
      $('#nbCards').innerHTML = N.LEVELS.map((L, i) => `<button type="button" class="nb-card" data-i="${i}">
        <span class="nb-av" aria-hidden="true">${AV[i]}</span>
        <span class="nb-ct"><b>${t('lvN', { n: i + 1 })} · ${t('n' + i + 'name')}</b><i>${t('tag' + i)}</i><small>${t('scn' + i)}</small></span>
        <span class="nb-cs" aria-label="${t('stars', { n: best[i] })}">${starsTxt(best[i])}</span></button>`).join('');
      how();
    }
    function how() {
      $('#nbHow').innerHTML = `<h3>${t('howT')}</h3><p>${t('brGoal')}</p><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol><p class="nb-hn">💡 ${t('gdTip2')}</p>`;
    }
    $('#nbCards').addEventListener('click', e => { const b = e.target.closest('.nb-card'); if (b) { sfx('open'); openLevel(+b.dataset.i); } });

    /* ---------- speech ---------- */
    function say(who, text, fast) {
      const el = who === 'n' ? $('#nbBubN') : $('#nbBubY'), tok = (el._tok = (el._tok || 0) + 1);
      el.classList.add('on'); $('#nbSr').textContent = (who === 'n' ? t('n' + idx + 'name') + ': ' : t('youLbl') + ': ') + text;
      if (who === 'n') scene.set({ talkN: Math.min(2200, 300 + text.length * 45) }); else scene.set({ talkY: Math.min(1500, 300 + text.length * 40) });
      if (fast || still()) { el.textContent = text; return; }
      let i = 0; el.textContent = '';
      const tick = () => { if (tok !== el._tok) return; i += 2; el.textContent = text.slice(0, i); if (i < text.length) later(tick, 22); };
      tick();
    }
    const hideBubbles = () => { $('#nbBubN').classList.remove('on'); $('#nbBubY').classList.remove('on'); };

    /* ---------- hud ---------- */
    function hud() {
      if (!gs) return;
      const L = gs.L;
      $('#nbRound').textContent = t('round', { n: Math.min(gs.round, L.rounds), m: L.rounds });
      $('#nbBatna').textContent = t('batnaChip', { n: L.batna });
      $('#nbScn').textContent = t('n' + idx + 'name') + ' · ' + t('scn' + idx);
      const x = +$('#nbRange').value;
      $('#nbVal').textContent = x + 'k';
      $('#nbOffer').textContent = t('btnOffer', { n: x });
      $('#nbAccept').textContent = t('btnAccept', { n: gs.ask });
      $('#nbProbe').textContent = gs.probed ? t('btnProbeDone') : t('btnProbe');
      $('#nbProbe').disabled = gs.probed || busy || gs.over;
      const off = busy || gs.over || !$('#nbBrief').hidden;
      ['#nbOffer', '#nbAccept', '#nbWalk', '#nbMinus', '#nbPlus', '#nbRange'].forEach(s => { $(s).disabled = off; });
      if (off) $('#nbProbe').disabled = true;
    }
    function sync(extra) {
      scene.set(Object.assign({ ask: gs.ask, pat: gs.pat / gs.L.pat, maxPat: gs.L.pat, mood: gs.mood, hist: gs.hist, batna: gs.L.batna }, extra || {}));
      hud();
    }
    $('#nbRange').addEventListener('input', () => { hud(); scene.set({ you: +$('#nbRange').value }); });
    $('#nbMinus').addEventListener('click', () => { $('#nbRange').value = +$('#nbRange').value - 1; $('#nbRange').dispatchEvent(new Event('input')); sfx('click'); });
    $('#nbPlus').addEventListener('click', () => { $('#nbRange').value = +$('#nbRange').value + 1; $('#nbRange').dispatchEvent(new Event('input')); sfx('click'); });
    $('#nbRange').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); doOffer(); } });

    /* ---------- flow ---------- */
    function openLevel(i) {
      clearTimers(); hideBubbles();
      idx = i; gs = N.create(i); busy = false;
      $('#nbSelect').hidden = true; $('#nbPlay').hidden = false; $('#nbMissions').hidden = false; $('#nbRes').hidden = true; $('#nbCtl').hidden = false;
      const r = $('#nbRange'); r.max = gs.L.open; r.value = Math.round(gs.L.batna * .72);
      scene.setLevel(i);
      scene.set({ ask: gs.ask, you: +r.value, pat: 1, maxPat: gs.L.pat, mood: 'neutral', hist: [], batna: gs.L.batna, r: null, zone: null, ended: null, snap: true });
      $('#nbBrief').hidden = false;
      $('#nbBrief').innerHTML = `<div class="nb-bc"><h3>${t('brTitle')} · ${t('lvN', { n: i + 1 })}</h3><p><b>${t('n' + i + 'name')}</b> — ${t('scn' + i)}</p>
        <ul><li>${t('brGoal')}</li><li>${t('brBatna', { n: gs.L.batna })}</li><li>${t('brRounds', { n: gs.L.rounds })}</li></ul>
        <button type="button" class="nb-main" id="nbGo">${t('brStart')}</button></div>`;
      hud(); loop();
      $('#nbGo').addEventListener('click', () => { sfx('click'); $('#nbBrief').hidden = true; hud(); say('n', t('n' + idx + 'greet', { n: gs.ask })); $('#nbRange').focus({ preventScroll: true }); });
      $('#nbGo').focus({ preventScroll: true });
    }
    function npcLine(reply) {
      const i = idx;
      switch (reply) {
        case 'counter': return t('n' + i + (gs.round % 2 ? 'c1' : 'c2'), { n: gs.ask });
        case 'stall': return t('stall');
        case 'offended': return t('n' + i + 'off');
        case 'accept': return t('n' + i + 'acc');
        case 'walk': return t('n' + i + 'walk');
        case 'timeout': return t('n' + i + 'time');
        case 'probe': return t('probe', { n: gs.hint });
        default: return '';
      }
    }
    /* run a player action: say the player's line, then let the engine answer after a short beat */
    function act(youText, run, fx) {
      if (busy || !gs || gs.over) return;
      busy = true; hud(); $('#nbBubN').classList.remove('on'); say('y', youText);
      if (fx) scene.fx(fx);
      later(() => {
        const before = gs.pat;
        run();
        const o = gs.outcome, extra = {};
        if (gs.over) {
          extra.ended = o.type;
          if (o.type === 'npcwalk') extra.npcX = 220;
          if (o.type === 'walk') extra.youX = -220;
        }
        sync(extra);
        say('n', npcLine(gs.reply));
        if (gs.reply === 'offended') { scene.fx('offended'); sfx('err'); }
        else if (gs.reply === 'accept') { scene.fx('deal'); sfx('ok'); }
        else if (gs.reply === 'counter' || gs.reply === 'stall') { scene.fx('counter'); sfx('on'); }
        else if (gs.pat < before) scene.fx('bad');
        busy = false;
        if (gs.over) { later(finish, o.type === 'deal' ? 2200 : 1700); hud(); } else { hud(); }
      }, still() ? 80 : 650);
    }
    const doOffer = () => { const x = +$('#nbRange').value; act(t('youOffer', { n: x }), () => N.offer(gs, x), 'offer'); };
    $('#nbOffer').addEventListener('click', () => { sfx('click'); doOffer(); });
    $('#nbAccept').addEventListener('click', () => { sfx('click'); act(t('youAccept', { n: gs.ask }), () => N.accept(gs)); });
    $('#nbProbe').addEventListener('click', () => { sfx('click'); act(t('youProbe'), () => N.probe(gs)); });
    $('#nbWalk').addEventListener('click', () => { sfx('click'); act(t('youWalk'), () => N.walk(gs)); });

    /* ---------- result ---------- */
    function finish() {
      const res = N.result(gs), o = res.outcome, L = gs.L;
      if (res.stars > best[idx]) { best[idx] = res.stars; saveBest(); }
      scene.set({ r: L.r, zone: res.zone ? [res.zone.lo, res.zone.hi] : null });
      const head = { deal: 'rsDeal', walk: 'rsWalk', npcwalk: 'rsNpcWalk', timeout: 'rsTimeout' }[o.type];
      const rows = gs.hist.map(h => `<tr><td>${h.round}</td><td>${h.you}k</td><td>${h.ask}k</td></tr>`).join('');
      $('#nbCtl').hidden = true; hideBubbles();
      const el = $('#nbRes'); el.hidden = false;
      el.innerHTML = `<div class="nb-rc"><div class="nb-rh"><h2>${t(head)}</h2><span class="nb-stars" aria-label="${t('stars', { n: res.stars })}">${starsTxt(res.stars)}</span></div>
        ${o.price != null ? `<p class="nb-price">${t('rsPrice', { n: o.price })}</p>` : ''}
        <p class="nb-score"><span>${t('rsScore')}</span> <b>${res.score}</b></p>
        <div class="nb-reveal"><h3>${t('rsRevealT')}</h3><ul><li>${t('rsSellerMin', { n: L.r })}</li><li>${t('rsYourBatna', { n: L.batna })}</li>
          <li>${res.zone ? t('rsZopa', { lo: res.zone.lo, hi: res.zone.hi }) : t('rsNoZopa')}</li>
          ${res.share != null && o.price <= L.batna ? `<li>${t('rsShare', { n: Math.round(res.share * 100) })}</li>` : ''}</ul></div>
        <div class="nb-less"><h3>${t('rsLessons')}</h3><ul>${res.lessons.map(k => `<li>${t(k)}</li>`).join('')}</ul></div>
        ${rows ? `<details class="nb-hist"><summary>${t('rsHist')}</summary><table><thead><tr><th>${t('rsRound')}</th><th>${t('youLbl')}</th><th>${t('askLbl')}</th></tr></thead><tbody>${rows}</tbody></table></details>` : ''}
        <div class="nb-end"><button type="button" class="nb-main" data-a="again">${t('rsAgain')}</button>${idx < 3 ? `<button type="button" data-a="next">${t('rsNext')}</button>` : ''}<button type="button" data-a="levels">${t('rsLevels')}</button></div></div>`;
      $('#nbSr').textContent = t(head) + '. ' + t('rsScore') + ' ' + res.score;
      el.scrollIntoView && el.scrollIntoView({ block: 'nearest', behavior: still() ? 'auto' : 'smooth' });
    }
    $('#nbRes').addEventListener('click', e => {
      const b = e.target.closest('button[data-a]'); if (!b) return; sfx('click');
      if (b.dataset.a === 'again') openLevel(idx); else if (b.dataset.a === 'next') openLevel(idx + 1); else toSelect();
    });
    function toSelect() { clearTimers(); $('#nbMissions').hidden = true; hideBubbles(); gs = null; $('#nbPlay').hidden = true; $('#nbSelect').hidden = false; cards(); scene.stop(); }

    /* ---------- loop control ---------- */
    function loop() { if (visible && gs && !still() && !document.hidden) scene.start(); else if (scene.running) scene.stop(); else scene.draw(); }
    document.addEventListener('visibilitychange', loop);
    /* size the canvas backing store to the displayed size */
    function fit() { const w = cv.clientWidth || 960, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); scene.draw(); }
    if (window.ResizeObserver) new ResizeObserver(fit).observe($('#nbStage')); else window.addEventListener('resize', fit);

    /* ---------- info dialog (mission + how to play), always reachable ---------- */
    const guide = $('#nbGuide'); 
    function showGuide() {
      const cur = gs ? `<p class="gtip"><b>🎯 ${t('gdNow')}: ${t('n' + idx + 'name')}</b><br>${t('scn' + idx)}<br>${t('brBatna', { n: gs.L.batna })}<br>${t('brRounds', { n: gs.L.rounds })}</p>` : '';
      guide.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="nbGdT"><button type="button" class="gx" data-gclose aria-label="${t('close')}">✕</button>
        <h3 id="nbGdT">${t('howT')}</h3><p>${t('brGoal')}</p><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol>${cur}
        <p class="gtip"><b>💡 ${t('tipLbl')}:</b> ${t('gdTip')}</p><button type="button" class="nb-main" data-gclose>${t('gotIt')}</button></div>`;
      guide.hidden = false; sfx('open');
      const b = guide.querySelector('.nb-main'); b && b.focus({ preventScroll: true });
    }
    const closeGuide = () => { if (guide.hidden) return; guide.hidden = true; sfx('close'); };
    guide.addEventListener('click', e => { if (e.target === guide || e.target.closest('[data-gclose]')) closeGuide(); });
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && !guide.hidden) { closeGuide(); e.stopPropagation(); } });
    $('#nbInfo').addEventListener('click', () => { guide.hidden ? showGuide() : closeGuide(); });
    $('#nbMissions').addEventListener('click', () => { sfx('click'); toSelect(); });

    /* ---------- assistant Bit (always present, like in SMART Decision Studio) ---------- */
    function hints() {
      if (!gs) return { state: [], generic: ['nbt_s1', 'nbt_s2'] };
      if (!$('#nbBrief').hidden) return { state: ['nbt_brief'], generic: ['nbt_p1'] };
      if (gs.over) return { state: ['nbt_end'], generic: ['nbt_end'] };
      const st = [];
      if (!gs.hist.length) st.push('nbt_first');
      if (gs.pat / gs.L.pat <= .4) st.push('nbt_lowpat');
      if (idx === 3 && gs.round >= 3) st.push('nbt_nozopa');
      st.push(gs.ask > gs.L.batna ? 'nbt_over' : 'nbt_in');
      if (!gs.probed) st.push('nbt_probe');
      return { state: st, generic: ['nbt_p1', 'nbt_p2', 'nbt_p3'] };
    }
    if (window.SmartAssistant) SmartAssistant.create(host, { root: $('#nb'), hints, busy: () => !guide.hidden });

    cards();
    this._nb = { fit, loop, cards, hud, scene, setVisible(v) { visible = v; loop(); }, relabel() { cards(); if (gs) hud(); if (!guide.hidden) showGuide(); } };
  },
  onShow() { const m = this._nb; if (!m) return; m.scene.setTheme(MBALAB.theme && MBALAB.theme.isDay()); m.setVisible(true); m.fit(); },
  onHide() { const m = this._nb; if (m) m.setVisible(false); },
  onLang() { const m = this._nb; if (m) m.relabel(); },
  onTheme(day) { const m = this._nb; if (m) m.scene.setTheme(day); }
});
