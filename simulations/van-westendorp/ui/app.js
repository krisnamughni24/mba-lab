/* Van Westendorp PSM: UI wiring. The maths lives in engine/engine.js. */
const vwLang = () => LANG;   /* the global language code, read lazily */
MBALAB.sims.define('van-westendorp', {
  mount(host) {
    const V = MBALAB.vw, $ = s => host.querySelector(s), sfx = MBALAB.util.sfx;
    const LOC = { en: 'en-US', id: 'id-ID', ja: 'ja-JP', zh: 'zh-CN' };
    const loc = () => LOC[vwLang()] || 'en-US';
    const SAMPLE = '9000 15000 25000 40000\n12000 18000 30000 45000\n8000 14000 22000 35000\n10000 20000 32000 50000\n11000 17000 28000 42000\n7000 13000 21000 33000\n15000 22000 35000 55000\n9500 16000 26000 38000\n12500 19000 29000 44000\n6000 12000 20000 30000\n10000 18000 27000 41000\n13000 21000 33000 48000';
    const CV = [['tc', 'cvTC', 'vw-tc'], ['c', 'cvC', 'vw-c'], ['e', 'cvE', 'vw-e'], ['te', 'cvTE', 'vw-te']];
    const PT = [['pmc', 'ptPMC'], ['opp', 'ptOPP'], ['ipp', 'ptIPP'], ['pme', 'ptPME']];
    let sid = 'kopi', opts = Object.assign({}, V.DEF), seed = 20261015, mine = [], ownRows = [], ownCost = 0, res = null, price = 0, off = {}, animate = true, hover = null, rows = [];

    const scn = () => sid === 'own' ? { id: 'own', cost: ownCost, max: 0, step: 0 } : V.SCEN.find(s => s.id === sid);
    const money = p => (sid === 'own' ? '' : 'Rp ') + Math.round(p).toLocaleString(loc());
    const compact = p => new Intl.NumberFormat(loc(), { notation: 'compact', maximumFractionDigits: 1 }).format(p);
    const pct = x => Math.round(x * 100) + '%';
    const lerpX = (p, a, b) => a + (b - a) * p;

    /* ---------- data ---------- */
    function build() {
      if (sid === 'own') { rows = ownRows.slice(); } else { const s = scn(); rows = V.generate(seed, s, opts); }
      const all = rows.concat(mine), s = scn();
      res = V.analyze(all, sid === 'own' ? undefined : { max: s.max, step: s.step });
      if (res.valid) { const g = res.grid; if (!price || price > g.max) price = Math.round((res.sane ? res.pts.ipp.x : g.max / 3) / g.step) * g.step; price = Math.min(price, g.max); }
    }

    /* ---------- scenario cards ---------- */
    function renderScen() {
      $('#vwScen').innerHTML = V.SCEN.concat([{ id: 'own', icon: '📋' }]).map(s => `<button type="button" role="radio" aria-checked="${s.id === sid}" class="vw-sc ${s.id === sid ? 'on' : ''}" data-sid="${s.id}"><span class="vw-ic" aria-hidden="true">${s.icon}</span><b>${t('sc_' + s.id)}</b><small>${s.id === 'own' ? '' : t('vwCost', { c: 'Rp ' + s.cost.toLocaleString(loc()) })}</small></button>`).join('');
    }

    /* ---------- controls ---------- */
    function renderCtl() {
      const sl = (k, min, max, step, val, out, hint) => `<div class="vw-f"><label for="vwc_${k}"><span>${t('ct' + k[0].toUpperCase() + k.slice(1))}</span><output id="vwo_${k}">${out}</output></label><input type="range" id="vwc_${k}" min="${min}" max="${max}" step="${step}" value="${val}" aria-describedby="vwh_${k}"><small id="vwh_${k}">${t(hint)}</small></div>`;
      $('#vwCtl').innerHTML = sid === 'own' ? '' : sl('n', 30, 1000, 10, opts.n, opts.n, 'ctNHint') + sl('spread', .15, .7, .05, opts.spread, pct(opts.spread), 'ctSpreadHint') + sl('brand', -.3, .4, .05, opts.brand, (opts.brand > 0 ? '+' : '') + pct(opts.brand), 'ctBrandHint') + sl('noise', 0, 1, .05, opts.noise, pct(opts.noise), 'ctNoiseHint') + `<button type="button" class="vw-btn" id="vwNew">${t('ctNew')}</button>`;
      $('.vw-side').classList.toggle('vw-hide', sid === 'own' && !ownRows.length && false);
    }

    /* ---------- chart ---------- */
    const W = 720, H = 360, L = 50, R = 16, T0 = 16, B = 42;
    function chart() {
      const el = $('#vwChart');
      if (!res || !res.valid) { el.innerHTML = `<div class="vw-empty">${sid === 'own' ? t('odHelp') : t('odErr')}</div>`; $('#vwLegend').innerHTML = ''; $('#vwRead').textContent = ''; return; }
      const g = res.grid, cv = res.cv, X = p => L + p / g.max * (W - L - R), Y = v => T0 + (1 - v) * (H - T0 - B);
      const path = a => a.map((v, i) => (i ? 'L' : 'M') + X(cv.xs[i]).toFixed(1) + ' ' + Y(v).toFixed(1)).join('');
      const ticks = []; const tn = 6; for (let i = 0; i <= tn; i++) ticks.push(g.max * i / tn);
      let s = `<svg viewBox="0 0 ${W} ${H}" class="vw-svg ${animate ? 'draw' : ''}" role="img" aria-label="${t('cvAria')}" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="vwClip"><rect class="vw-rev" x="${L}" y="0" width="${W - L - R}" height="${H}"/></clipPath></defs>`;
      for (let i = 0; i <= 4; i++) { const v = i / 4; s += `<line class="vw-gl" x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}"/><text class="vw-ax" x="${L - 8}" y="${Y(v) + 4}" text-anchor="end">${Math.round(v * 100)}%</text>`; }
      ticks.forEach(p => { s += `<line class="vw-gl v" x1="${X(p)}" x2="${X(p)}" y1="${T0}" y2="${H - B}"/><text class="vw-ax" x="${X(p)}" y="${H - B + 18}" text-anchor="middle">${compact(p)}</text>`; });
      s += `<text class="vw-axt" x="${(L + W - R) / 2}" y="${H - 4}" text-anchor="middle">${t('axX')}</text><text class="vw-axt" transform="translate(12 ${(T0 + H - B) / 2}) rotate(-90)" text-anchor="middle">${t('axY')}</text>`;
      if (res.sane) s += `<rect class="vw-band" x="${X(res.pts.pmc.x)}" y="${T0}" width="${X(res.pts.pme.x) - X(res.pts.pmc.x)}" height="${H - T0 - B}"/>`;
      s += `<g clip-path="url(#vwClip)">` + CV.map(c => off[c[0]] ? '' : `<path class="vw-curve ${c[2]}" d="${path(cv[c[0]])}"/>`).join('') + `</g>`;
      if (res.sane) {
        s += `<g class="vw-pts-g">`;
        const lab = { pmc: [-4, -12, 'end'], opp: [0, -14, 'middle'], ipp: [0, 24, 'middle'], pme: [6, -12, 'start'] };
        PT.forEach(([k, key]) => { const q = res.pts[k], x = X(q.x), y = Y(q.y), o = lab[k]; s += `<circle class="vw-pt" cx="${x}" cy="${y}" r="5.5"/><text class="vw-ptl" x="${x + o[0]}" y="${y + o[1]}" text-anchor="${o[2]}">${t(key)}</text>`; });
        s += `</g>`;
      }
      s += `<line class="vw-you" x1="${X(price)}" x2="${X(price)}" y1="${T0}" y2="${H - B}"/><path class="vw-youm" d="M${X(price) - 6} ${T0 - 2}h12l-6 9z"/>`;
      if (hover != null) s += `<line class="vw-hov" x1="${X(hover)}" x2="${X(hover)}" y1="${T0}" y2="${H - B}"/>`;
      s += `<rect class="vw-hit" x="${L}" y="${T0}" width="${W - L - R}" height="${H - T0 - B}" fill="transparent"/></svg>`;
      el.innerHTML = s;
      $('#vwLegend').innerHTML = CV.map(c => `<button type="button" class="vw-lg ${c[2]} ${off[c[0]] ? 'off' : ''}" data-cv="${c[0]}" aria-pressed="${!off[c[0]]}"><i></i>${t(c[1])}</button>`).join('');
      readout();
    }
    function readout() {
      const el = $('#vwRead'); if (!res || !res.valid) return;
      const p = hover != null ? hover : price, a = V.at(res, p);
      el.innerHTML = `<b>${t('hoverAt', { p: money(p) })}</b> · ${CV.map(c => `<span class="${c[2]}">${pct(a[c[0]])} ${t('m' + c[0].toUpperCase())}</span>`).join(' · ')}`;
    }

    /* ---------- range and four points ---------- */
    function points() {
      const r = $('#vwRange'), pts = $('#vwPts'); $('#vwDq').textContent = res && res.valid ? t('dq', { ok: res.n, n: res.n + res.bad, bad: res.bad }) : '';
      if (!res || !res.valid) { r.innerHTML = ''; pts.innerHTML = ''; return; }
      if (!res.sane) { r.innerHTML = `<div class="vw-warn">${t('rangeBad')}</div>`; pts.innerHTML = ''; return; }
      const q = res.pts; r.innerHTML = `<h2 class="vw-h">${t('rangeT')}</h2><div class="vw-rg"><b>${money(q.pmc.x)}</b><i></i><b>${money(q.pme.x)}</b></div>`;
      pts.innerHTML = PT.map(([k, key]) => `<div class="vw-p vw-p-${k}"><span class="vw-pk">${t(key)}</span><b>${money(q[k].x)}</b><em>${t(key + 'l')}</em><small>${t(key + 'm')}</small></div>`).join('');
    }

    /* ---------- price and mission ---------- */
    function priceBox() {
      const box = $('#vwPrice'); if (!res || !res.valid || !res.sane) { box.hidden = true; return; } box.hidden = false;
      const g = res.grid;
      box.innerHTML = `<h2 class="vw-h">${t('yourT')}</h2>
        <div class="vw-mission" id="vwMiss"></div>
        <div class="vw-pr"><label for="vwPrice_in">${t('yourP')}</label><output id="vwPout"></output></div>
        <div class="vw-meterw"><div class="vw-meter" id="vwMeter"></div><input type="range" id="vwPrice_in" min="0" max="${g.max}" step="${g.step}" value="${price}"></div>
        <p class="vw-zone" id="vwZone" aria-live="polite"></p>
        <div class="vw-ms" id="vwMs"></div>
        <p class="vw-cav">${t('caveat')}</p>`;
      const q = res.pts, lo = q.pmc.x / g.max * 100, a = Math.min(q.opp.x, q.ipp.x) / g.max * 100, b = Math.max(q.opp.x, q.ipp.x) / g.max * 100, hi = q.pme.x / g.max * 100;
      $('#vwMeter').style.background = `linear-gradient(90deg,var(--rd) 0 ${lo}%,var(--am) ${lo}% ${a}%,var(--gn) ${a}% ${b}%,var(--am) ${b}% ${hi}%,var(--rd) ${hi}% 100%)`;
      priceVals();
    }
    function priceVals() {
      if (!res || !res.sane) return; const s = scn(), a = V.at(res, price), z = V.zone(res, price), cost = s.cost || 0;
      $('#vwPout').textContent = money(price); $('#vwZone').textContent = t('zn' + z); $('#vwZone').className = 'vw-zone z' + z;
      const sc = z === 0 || z === 4 ? null : V.score(res, price, cost), best = V.bestInRange(res, cost), stars = sc == null ? 0 : sc >= 90 ? 3 : sc >= 70 ? 2 : sc >= 45 ? 1 : 0;
      $('#vwMs').innerHTML = CV.map(c => `<div class="vw-m ${c[2]}"><b>${pct(a[c[0]])}</b><small>${t('m' + c[0].toUpperCase())}</small><div class="vw-mb"><i style="width:${a[c[0]] * 100}%"></i></div></div>`).join('') +
        `<div class="vw-m"><b>${pct(a.buy)}</b><small>${t('mBuy')}</small><div class="vw-mb"><i style="width:${a.buy * 100}%"></i></div></div>` +
        `<div class="vw-m"><b>${Math.round(V.profit(res, price, cost)).toLocaleString(loc())}</b><small>${t('mProfit')}</small></div>`;
      $('#vwMiss').innerHTML = `<p>${t('missBrief', { c: money(cost) })}</p><div class="vw-sco"><span class="vw-stars" aria-hidden="true">${'★'.repeat(stars)}<u>${'★'.repeat(3 - stars)}</u></span><b>${sc == null ? t('missOut') : t('missScore', { s: sc })}</b>${best ? `<small>${t('missBest', { p: money(best.p) })}</small>` : ''}</div>`;
      if (sc != null && sc >= 90 && price !== lastWin) { lastWin = price; sfx('win'); }
      chart();
    }
    let lastWin = -1;

    /* ---------- survey, own data, learn ---------- */
    function renderSurvey() {
      const x = t('scx_' + sid), qs = [1, 2, 3, 4].map(i => `<div class="vw-f"><label for="vwq${i}">${t('q' + i, { x })}</label><input type="number" inputmode="numeric" min="1" id="vwq${i}" placeholder="${sid === 'own' ? '' : money(scn().med[i - 1])}"></div>`).join('');
      $('#vwSvBody').innerHTML = `<p class="vw-small">${t('svSub')}</p>${qs}<div class="vw-row"><button type="button" class="vw-btn" id="vwSvAdd">${t('svAdd')}</button><button type="button" class="vw-btn ghost" id="vwSvClr" ${mine.length ? '' : 'hidden'}>${t('svClear')}</button></div><p class="vw-msg" id="vwSvMsg" aria-live="polite"></p>`;
    }
    function renderOwn() {
      $('#vwOwnBody').innerHTML = `<p class="vw-small">${t('odHelp')}</p><textarea id="vwTa" rows="6" spellcheck="false" placeholder="9000 15000 25000 40000"></textarea><div class="vw-f"><label for="vwCostIn">${t('vwCost', { c: '' })}</label><input type="number" id="vwCostIn" min="0" value="${ownCost}"></div><div class="vw-row"><button type="button" class="vw-btn" id="vwOdRun">${t('odRun')}</button><button type="button" class="vw-btn ghost" id="vwOdSample">${t('odSample')}</button></div><p class="vw-msg" id="vwOdMsg" aria-live="polite"></p>`;
    }
    function renderLearn() { $('#vwLearnBody').innerHTML = `<ol class="vw-learn">${[1, 2, 3, 4, 5].map(i => `<li>${t('l' + i)}</li>`).join('')}</ol>`; }

    /* ---------- refresh ---------- */
    function refresh(withCtl) {
      build(); if (withCtl) { renderScen(); renderCtl(); renderSurvey(); }
      points(); priceBox(); if (!res || !res.sane || $('#vwPrice').hidden) chart(); animate = false;
    }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const sc = e.target.closest('[data-sid]'); if (sc) { sid = sc.dataset.sid; mine = []; price = 0; animate = true; sfx('tick'); if (sid === 'own') { $('#vwOwn').open = true; if (!ownRows.length) { $('#vwTa') && ($('#vwTa').value = ''); } } refresh(true); return; }
      const lg = e.target.closest('[data-cv]'); if (lg) { off[lg.dataset.cv] = !off[lg.dataset.cv]; chart(); return; }
      if (e.target.id === 'vwNew') { seed = (Math.random() * 1e9) | 0; animate = true; sfx('tick'); refresh(false); return; }
      if (e.target.id === 'vwSvAdd') {
        const v = [1, 2, 3, 4].map(i => +$('#vwq' + i).value), m = $('#vwSvMsg');
        if (V.clean([v]).ok.length !== 1) { m.textContent = t('svErr'); m.className = 'vw-msg bad'; sfx('lose'); return; }
        mine.push(v); m.textContent = t('svDone', { n: rows.length + mine.length }); m.className = 'vw-msg'; sfx('open'); [1, 2, 3, 4].forEach(i => { $('#vwq' + i).value = ''; });
        const keep = m.textContent; refresh(false); $('#vwSvClr').hidden = false; $('#vwSvMsg').textContent = keep; return;
      }
      if (e.target.id === 'vwSvClr') { mine = []; refresh(true); $('#vwSurvey').open = true; return; }
      if (e.target.id === 'vwOdSample') { $('#vwTa').value = SAMPLE; return; }
      if (e.target.id === 'vwOdRun') {
        const rws = V.parse($('#vwTa').value), m = $('#vwOdMsg'); ownCost = +$('#vwCostIn').value || 0;
        if (V.clean(rws).ok.length < 5) { m.textContent = t('odErr'); m.className = 'vw-msg bad'; sfx('lose'); return; }
        ownRows = rws; sid = 'own'; mine = []; price = 0; animate = true; m.textContent = ''; sfx('open'); const ta = $('#vwTa').value; refresh(true); $('#vwTa').value = ta; $('#vwOwn').open = true; $('#vwScroll').scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    host.addEventListener('input', e => {
      const id = e.target.id || '';
      if (id.startsWith('vwc_')) {
        const k = id.slice(4), x = +e.target.value; opts[k] = k === 'n' ? Math.round(x) : x;
        $('#vwo_' + k).textContent = k === 'n' ? x : k === 'brand' ? (x > 0 ? '+' : '') + pct(x) : pct(x); build(); points(); priceVals();
      } else if (id === 'vwPrice_in') { price = +e.target.value; hover = null; priceVals(); }
    });
    host.addEventListener('pointermove', e => {
      const hit = e.target.closest && e.target.closest('.vw-svg'); if (!hit || !res || !res.valid) return;
      const r = hit.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, g = res.grid;
      if (x < L || x > W - R) return; hover = Math.round((x - L) / (W - L - R) * g.max / g.step) * g.step;
      const ln = hit.querySelector('.vw-hov'); if (ln) { const px = L + hover / g.max * (W - L - R); ln.setAttribute('x1', px); ln.setAttribute('x2', px); } else { chart(); }
      readout();
    });
    host.addEventListener('pointerleave', () => { if (hover != null) { hover = null; chart(); } }, true);

    renderLearn(); renderOwn(); refresh(true);
    const game = MBALAB.vwGame(host); let tab = 'game', shown = false;
    const setTab = k => { tab = k; $('#vgGame').hidden = k !== 'game'; $('#vwLab').hidden = k !== 'lab'; host.querySelectorAll('[data-tab]').forEach(b => { const on = b.dataset.tab === k; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }); game.setVisible(shown && k === 'game'); if (k === 'game') setTimeout(() => game.fit(), 30); };
    host.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { setTab(b.dataset.tab); sfx('tick'); } });
    this._vw = { game, setTab, show(v) { shown = v; game.setVisible(v && tab === 'game'); if (v) game.setTheme(MBALAB.theme && MBALAB.theme.isDay()); }, relabel() { game.relabel(); renderLearn(); const ta = $("#vwTa") ? $("#vwTa").value : ""; renderOwn(); $("#vwTa").value = ta; refresh(true); } };
    this._vw.show(true);
  },
  onShow() { const m = this._vw; if (m) m.show(true); },
  onHide() { const m = this._vw; if (m) m.show(false); },
  onTheme(day) { const m = this._vw; if (m) m.game.setTheme(day); },
  onLang() { const m = this._vw; if (m) m.relabel(); }
});
