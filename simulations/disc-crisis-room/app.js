/* DISC Crisis Room: UI wiring. Scoring lives in engine.js, drawing in scene.js, texts in strings.js. */
MBALAB.sims.define('disc-crisis-room', {
  mount(host) {
    const E = MBALAB.disc, $ = s => host.querySelector(s), T = (k, p) => t('dc_' + k, p), S = E.STYLES;
    const still = () => document.body.classList.contains('still');
    const sfx = n => { try { MBALAB.audio && MBALAB.audio.play(n); } catch (e) {} };
    const KEY = 'mbalab-dc-last';
    const cv = $('#dcCv'), scene = E.Scene(cv);
    const METER = { D: 'mR', I: 'mM', S: 'mH', C: 'mQ' };
    let gs = null, busy = false, visible = false, timers = [], res = null;
    const later = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id; };
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const sn = k => t('st' + k + 'n');

    /* ---------- start screen ---------- */
    function how() {
      $('#dcHow').innerHTML = `<h3>${T('howT')}</h3><ol><li>${T('how1')}</li><li>${T('how2')}</li><li>${T('how3')}</li><li>${T('how4')}</li></ol><p class="dc-hn">💡 ${T('gdTip2')}</p>`;
      let last = ''; try { last = localStorage.getItem(KEY) || ''; } catch (e) {}
      $('#dcLast').textContent = last ? T('last', { code: last }) : '';
    }
    $('#dcHow').className = 'dc-how';
    $('#dcGo').addEventListener('click', () => { sfx('open'); begin(); });

    /* ---------- meters ---------- */
    function meters() {
      $('#dcMeters').innerHTML = S.map(k => `<div class="dc-meter">${T(METER[k])}<i><b data-m="${k}" style="width:${gs ? gs.meters[k] : 50}%"></b></i></div>`).join('');
    }
    const setMeters = () => S.forEach(k => { const b = $('#dcMeters [data-m="' + k + '"]'); b && (b.style.width = gs.meters[k] + '%'); });

    /* ---------- a decision ---------- */
    function question() {
      const i = gs.scene, step = gs.step, ord = gs.orders[i][step], pre = 's' + i + (step ? 'b' : 'a');
      scene.set({ icon: E.ICONS[i], resolved: false, alarm: step ? .5 : 1 });
      $('#dcCrisis').textContent = T('crisisN', { n: i + 1, m: E.SCENES });
      $('#dcMove').textContent = T('moveN', { n: step + 1 });
      $('#dcCard').innerHTML = `<h3>${E.ICONS[i]} ${t('s' + i + 't')}</h3><p class="dc-sit">${t('s' + i + 's')}</p><p class="dc-q">${T(step ? 'nextStep' : 'firstMove')}</p>
        <div class="dc-opts">${ord.map((idx, pos) => `<button type="button" class="dc-opt" data-i="${idx}"><kbd>${pos + 1}</kbd><span>${t(pre + idx)}</span></button>`).join('')}</div>`;
      $('#dcSr').textContent = t('s' + i + 't') + '. ' + t('s' + i + 's');
      busy = false;
    }
    function choose(idx) {
      if (busy || !gs || gs.done) return; busy = true;
      sfx('click');
      const st = E.pick(gs, idx);
      scene.react(idx); setMeters(); sfx('on');
      $('#dcCard').querySelectorAll('.dc-opt').forEach(b => { b.disabled = true; if (+b.dataset.i === idx) b.style.outline = '2px solid var(--cy)'; });
      const crisisOver = gs.step === 0;                       // the pick that just ended a crisis moved step back to 0
      if (!crisisOver) { later(question, still() ? 100 : 950); return; }
      scene.set({ resolved: true }); scene.burst('resolved'); sfx('ok');
      later(() => { if (gs.done) finish(); else question(); }, still() ? 200 : 1700);
    }
    $('#dcCard').addEventListener('click', e => { const b = e.target.closest('.dc-opt'); if (b && !b.disabled) choose(+b.dataset.i); });
    host.addEventListener('keydown', e => {
      if (!gs || gs.done || busy || !guide.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^[1-4]$/.test(e.key) && $('#dcPlay') && !$('#dcPlay').hidden) { const b = $('#dcCard').querySelectorAll('.dc-opt')[+e.key - 1]; b && !b.disabled && choose(+b.dataset.i); }
    });

    function begin() {
      clear(); gs = E.create(Math.floor(Math.random() * 1e9) + 1); res = null; busy = false;
      $('#dcStart').hidden = true; $('#dcRes').hidden = true; $('#dcPlay').hidden = false;
      scene.set({ resolved: false }); meters(); question(); loop();
      $('#dcScroll').scrollTop = 0;
    }
    function toStart() { clear(); gs = null; res = null; $('#dcPlay').hidden = true; $('#dcRes').hidden = true; $('#dcStart').hidden = false; how(); scene.stop(); }
    $('#dcRestart').addEventListener('click', () => { sfx('click'); toStart(); });

    /* ---------- result ---------- */
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
    function finish() {
      res = E.result(gs);
      try { localStorage.setItem(KEY, res.code); } catch (e) {}
      renderRes(); sfx('ok'); scene.stop();
    }
    function renderRes() {
      if (!res) return;
      const r = res, P = r.primary, Sx = r.secondary;
      $('#dcPlay').hidden = true; $('#dcRes').hidden = false;
      const others = S.filter(k => k !== P).map(k => `<li><b>${sn(k)}:</b> ${t('st' + k + 'wrk')}</li>`).join('');
      $('#dcRes').innerHTML = `<div class="dc-box"><h3>${T('rsTitle')}</h3>
        <div class="dc-rtop"><canvas id="dcRadar" aria-label="DISC radar"></canvas><div>
          <p><span class="dc-badge">${r.code}</span><b>${r.blend ? T('rsBlend', { a: sn(P), b: sn(Sx) }) : sn(P)}</b></p>
          <p class="dc-sit">${t('st' + P + 'tag')}${r.blend ? '<br>' + t('st' + Sx + 'tag') : ''}</p>
          <div class="dc-bars">${S.map(k => `<div class="dc-bar"><span>${sn(k).split(' ')[0]}</span><i><b style="width:${r.pct[k]}%"></b></i><span>${r.pct[k]}%</span></div>`).join('')}</div></div></div>
        <div class="dc-grid"><div><h4>${T('rsStr')}</h4><p>${t('st' + P + 'str')}</p></div><div><h4>${T('rsPrs')}</h4><p>${t('st' + P + 'prs')}</p></div>
          <div><h4>${T('rsBld')}</h4><p>${t('st' + P + 'bld')}</p></div><div><h4>${T('rsWrk')}</h4><p>${t('st' + P + 'wrk')}</p></div></div>
        <div class="dc-oth"><h4>${T('rsOthers')}</h4><ul>${others}</ul></div>
        <p class="dc-note">${T('rsNote')}</p>
        <div class="dc-end"><button type="button" class="dc-main" id="dcAgain">${T('rsAgain')}</button></div></div>`;
      radar($('#dcRadar'), r);
      $('#dcAgain').addEventListener('click', () => { sfx('click'); begin(); });
      $('#dcSr').textContent = T('rsTitle') + ': ' + r.code;
      $('#dcScroll').scrollTop = 0;
    }

    /* ---------- info dialog (inside the game window) ---------- */
    const guide = $('#dcGuide');
    function showGuide() {
      guide.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="dcGdT"><button type="button" class="gx" data-gclose aria-label="${T('close')}">✕</button>
        <h3 id="dcGdT">${T('howT')}</h3><ol><li>${T('how1')}</li><li>${T('how2')}</li><li>${T('how3')}</li><li>${T('how4')}</li></ol>
        <p class="gtip"><b>💡 ${T('tipLbl')}:</b> ${T('gdTip')}</p><button type="button" class="dc-main" data-gclose>${T('gotIt')}</button></div>`;
      guide.hidden = false; sfx('open'); const b = guide.querySelector('.dc-main'); b && b.focus({ preventScroll: true });
    }
    const closeGuide = () => { if (guide.hidden) return; guide.hidden = true; sfx('close'); };
    guide.addEventListener('click', e => { if (e.target === guide || e.target.closest('[data-gclose]')) closeGuide(); });
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && !guide.hidden) { closeGuide(); e.stopPropagation(); } });
    $('#dcInfo').addEventListener('click', () => { guide.hidden ? showGuide() : closeGuide(); });

    /* ---------- assistant Bit ---------- */
    function hints() {
      if (!gs) return { state: [], generic: ['dc_nbt_s1', 'dc_nbt_s2'] };
      if (res) return { state: ['dc_nbt_end'], generic: ['dc_nbt_end'] };
      return { state: [], generic: ['dc_nbt_p1', 'dc_nbt_p2', 'dc_nbt_p3'] };
    }
    if (window.SmartAssistant) SmartAssistant.create(host, { root: $('#dc'), hints, busy: () => !guide.hidden });

    /* ---------- loop + sizing ---------- */
    function loop() { if (visible && gs && !res && !still() && !document.hidden) scene.start(); else if (scene.running) scene.stop(); else scene.draw(); }
    document.addEventListener('visibilitychange', loop);
    function fit() { const w = cv.clientWidth || 960, d = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * d); cv.height = Math.round(w * 9 / 16 * d); scene.draw(); }
    if (window.ResizeObserver) new ResizeObserver(fit).observe($('#dcStage')); else window.addEventListener('resize', fit);

    how(); meters();
    this._dc = { fit, loop, setVisible(v) { visible = v; loop(); }, relabel() { how(); if (gs && !res) { meters(); setMeters(); question(); } if (res) renderRes(); if (!guide.hidden) showGuide(); }, theme(d) { scene.setTheme(d); if (res) radar($('#dcRadar'), res); } };
  },
  onShow() { const m = this._dc; if (!m) return; m.theme(MBALAB.theme && MBALAB.theme.isDay()); m.setVisible(true); m.fit(); },
  onHide() { const m = this._dc; if (m) m.setVisible(false); },
  onLang() { const m = this._dc; if (m) m.relabel(); },
  onTheme(day) { const m = this._dc; if (m) m.theme(day); }
});
