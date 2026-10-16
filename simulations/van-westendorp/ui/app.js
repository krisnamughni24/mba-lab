/* Van Westendorp Calculator: UI wiring on the shared calculator frame (shared/studio.css, sd-*). The maths lives in engine/engine.js.
   Four guided parts: 1 Frame (product), 2 Build (panel or own answers), 3 Result (curves + key prices), 4 Stress-test (your price + report). */
MBALAB.sims.define('van-westendorp', {
  mount(host) {
    const V = MBALAB.vw, $ = s => host.querySelector(s), sfx = MBALAB.util.sfx, T = (k, p) => t(k, p);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const LOC = { en: 'en-US', id: 'id-ID', ja: 'ja-JP', zh: 'zh-CN' };
    const loc = () => LOC[MBALAB.i18n.get()] || 'en-US';
    const SAMPLE = '9000 15000 25000 40000\n12000 18000 30000 45000\n8000 14000 22000 35000\n10000 20000 32000 50000\n11000 17000 28000 42000\n7000 13000 21000 33000\n15000 22000 35000 55000\n9500 16000 26000 38000\n12500 19000 29000 44000\n6000 12000 20000 30000\n10000 18000 27000 41000\n13000 21000 33000 48000';
    const CV = [['tc', 'cvTC', 'vw-tc'], ['c', 'cvC', 'vw-c'], ['e', 'cvE', 'vw-e'], ['te', 'cvTE', 'vw-te']];
    const PT = [['pmc', 'ptPMC'], ['opp', 'ptOPP'], ['ipp', 'ptIPP'], ['pme', 'ptPME']];
    let step = 0, sid = '', opts = Object.assign({}, V.DEF), seed = 20261015, ownText = '', cost = 0, res = null, price = 0, off = {}, animate = true, hover = null, seen = {}, guideOpen = null;

    const scn = () => V.SCEN.find(s => s.id === sid);
    const money = p => (sid === 'own' ? '' : 'Rp ') + Math.round(p).toLocaleString(loc());
    const compact = p => new Intl.NumberFormat(loc(), { notation: 'compact', maximumFractionDigits: 1 }).format(p);
    const pct = x => Math.round(x * 100) + '%';

    /* ---------- data ---------- */
    function build() {
      if (!sid) { res = null; return; }
      if (sid === 'own') res = V.analyze(V.parse(ownText));
      else { const s = scn(); res = V.analyze(V.generate(seed, s, opts), { max: s.max, step: s.step }); }
      if (res.valid) { const g = res.grid; if (!price || price > g.max) price = Math.round((res.sane ? res.pts.ipp.x : g.max / 3) / g.step) * g.step; price = Math.min(price, g.max); }
    }
    const ownCount = () => { const r = V.parse(ownText); return { n: r.length, ok: V.clean(r).ok.length }; };

    /* ---------- checklist per part: every item must be true to continue ---------- */
    const costOk = () => isFinite(cost) && cost >= 0;
    const checks = () => [{ ck1: !!sid }, { ck2: !!(res && res.valid && res.n >= 5), ck3: costOk() }];
    const done = n => !checks()[n] || Object.values(checks()[n]).every(Boolean);
    const unlocked = n => n === 0 || (n === 1 ? done(0) : done(0) && done(1));

    /* ---------- frame: stepper, toasts, guide, head, quest ---------- */
    function toast(msg, kind) { const el = document.createElement('div'); el.className = 'sd-toast ' + (kind || ''); el.innerHTML = '<span>' + esc(msg) + '</span>'; const b = $('#sdToasts'); if (!b) return; b.appendChild(el); while (b.children.length > 3) b.firstChild.remove(); setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 350); }, 2800); }
    function renderSteps() {
      $('#sdSteps').innerHTML = [0, 1, 2, 3].map(n => { const st = step === n ? 'active' : (unlocked(n) ? (n < step ? 'done' : 'open') : 'locked');
        return `<li class="st ${st}"><button type="button" data-go="${n}" ${unlocked(n) ? '' : 'aria-disabled="true"'} ${step === n ? 'aria-current="step"' : ''}><span class="n">${n < step && unlocked(n) ? '✓' : n + 1}</span><span class="l"><small>${esc(T('partN', { n: n + 1 }))}</small>${esc(T('stp' + (n + 1)))}</span></button></li>`; }).join('');
    }
    function showGuide(n) {
      guideOpen = n; let el = $('#sdGuide'); if (!el) { el = document.createElement('div'); el.id = 'sdGuide'; el.className = 'sd-guide'; $('#sd').appendChild(el); }
      el.innerHTML = `<div class="gd" role="dialog" aria-modal="true" aria-labelledby="gdT"><button type="button" class="gx" data-gclose aria-label="${esc(T('close'))}">✕</button><div class="gk">${esc(T('partN', { n: n + 1 }))} / 4</div><h3 id="gdT">${esc(T('gh' + (n + 1)))}</h3><ul><li>${esc(T('g' + (n + 1) + 'a'))}</li><li>${esc(T('g' + (n + 1) + 'b'))}</li></ul><button type="button" class="sd-cta ready" data-gclose>${esc(T('gotIt'))}</button></div>`;
      el.hidden = false;
    }
    const closeGuide = () => { const el = $('#sdGuide'); if (el) el.hidden = true; guideOpen = null; };
    const head = n => `<div class="sd-h"><h2>${esc(T('partN', { n: n + 1 }))} · ${esc(T('gh' + (n + 1)))}</h2><p>${esc(T('sub' + (n + 1)))}</p><button type="button" class="sd-info" data-info="${n}" title="${esc(T('infoTip'))}" aria-label="${esc(T('infoTip'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg></button></div>`;
    const quest = (keys, cta, goTo) => `<aside class="sd-card sd-quest"><h3>${esc(T('quest'))}</h3><ul id="ck">${keys.map(k => `<li data-c="${k}"><span class="bx">✓</span><span>${esc(T(k))}</span></li>`).join('')}</ul><div class="sd-prog"><i id="ckBar"></i></div><button type="button" class="sd-cta" id="next1" data-go="${goTo}">${esc(T(cta))}</button><p class="note" id="lockHint">${esc(T('lockHint'))}</p></aside>`;
    const foot = (n, last) => `<div class="sd-foot"><button type="button" data-go="${n - 1}">${esc(T('back'))}</button><span class="grow"></span>${last ? `<button type="button" data-reset>↺ ${esc(T('newCase'))}</button>` : `<button type="button" class="sd-cta ready" data-go="${n + 1}">${esc(T('next' + (n + 1)))}</button>`}</div>`;

    /* ---------- parts ---------- */
    function renderStage() {
      const st = $('#sdStage'), n = step; let h;
      if (n === 0) h = `<div class="sd-p1"><section class="sd-card">${head(0)}<div class="vw-grid" role="radiogroup">${V.SCEN.concat([{ id: 'own', icon: '📋' }]).map(s => `<button type="button" role="radio" aria-checked="${s.id === sid}" class="vw-sc ${s.id === sid ? 'on' : ''}" data-sid="${s.id}"><span class="vw-ic" aria-hidden="true">${s.icon}</span><b>${esc(T('sc_' + s.id))}</b><small>${s.id === 'own' ? '' : esc(T('vwCost', { c: 'Rp ' + s.cost.toLocaleString(loc()) }))}</small></button>`).join('')}</div></section>${quest(['ck1'], 'next1', 1)}</div>`;
      else if (n === 1) h = `<div class="sd-p1"><section class="sd-card">${head(1)}${buildForm()}<p class="vw-dq" id="vwDq"></p></section>${quest(['ck2', 'ck3'], 'next2', 2)}</div>`;
      else if (n === 2) h = `<section class="sd-card">${head(2)}${chartBlock()}${rangeBlock()}${foot(2)}</section>`;
      else h = `<section class="sd-card">${head(3)}${chartBlock()}${priceBlock()}${sensBlock()}<h3>${esc(T('conc'))}</h3><p id="vwConc">${esc(conclusion())}</p><p class="vw-cav">${esc(T('caveat'))}</p><div class="sd-dl"><h4>⬇ ${esc(T('dl'))}</h4><div class="row"><button type="button" data-dl="pdf">PDF</button><button type="button" data-dl="html">HTML</button><button type="button" data-dl="md">Markdown</button></div></div>${foot(3, true)}</section>`;
      st.innerHTML = h; if (n === 2 || n === 3) chart(); if (n === 3) priceVals(); if (n === 1) dq(); updQuest();
      if (!seen[n]) { seen[n] = 1; showGuide(n); } else if (guideOpen != null) showGuide(guideOpen);
    }
    function buildForm() {
      const costF = `<div class="vw-f"><label for="vwCostIn"><span>${esc(T('costIn'))}</span></label><input type="number" inputmode="numeric" min="0" id="vwCostIn" value="${isFinite(cost) ? cost : ''}"></div>`;
      if (sid === 'own') return `<p class="vw-small">${esc(T('odHelp'))}</p><textarea id="vwTa" rows="8" spellcheck="false" placeholder="9000 15000 25000 40000">${esc(ownText)}</textarea><div class="vw-row"><button type="button" class="vw-btn ghost" id="vwOdSample">${esc(T('odSample'))}</button></div><p class="vw-msg" id="vwOwnMsg" aria-live="polite"></p>${costF}`;
      const sl = (k, min, max, st, val, out, hint) => `<div class="vw-f"><label for="vwc_${k}"><span>${esc(T('ct' + k[0].toUpperCase() + k.slice(1)))}</span><output id="vwo_${k}">${out}</output></label><input type="range" id="vwc_${k}" min="${min}" max="${max}" step="${st}" value="${val}" aria-describedby="vwh_${k}"><small id="vwh_${k}">${esc(T(hint))}</small></div>`;
      return sl('n', 30, 1000, 10, opts.n, opts.n, 'ctNHint') + sl('spread', .15, .7, .05, opts.spread, pct(opts.spread), 'ctSpreadHint') + sl('brand', -.3, .4, .05, opts.brand, (opts.brand > 0 ? '+' : '') + pct(opts.brand), 'ctBrandHint') + sl('noise', 0, 1, .05, opts.noise, pct(opts.noise), 'ctNoiseHint') + costF + `<div class="vw-row"><button type="button" class="vw-btn ghost" id="vwNew">${esc(T('ctNew'))}</button></div>`;
    }
    function dq() { const e = $('#vwDq'); if (!e) return; if (sid === 'own') { const c = ownCount(); e.textContent = T('ownCount', c); } else e.textContent = res && res.valid ? T('dq', { ok: res.n, n: res.n + res.bad, bad: res.bad }) : ''; }
    const chartBlock = () => `<div class="vw-legend" id="vwLegend"></div><div class="vw-chart" id="vwChart"></div><div class="vw-read" id="vwRead" aria-live="polite"></div>`;
    function rangeBlock() {
      if (!res || !res.valid) return ''; if (!res.sane) return `<div class="vw-warn">${esc(T('rangeBad'))}</div>`;
      const q = res.pts;
      return `<h3 class="vw-h">${esc(T('rangeT'))}</h3><div class="vw-rg"><b>${money(q.pmc.x)}</b><i></i><b>${money(q.pme.x)}</b></div><div class="vw-pts">${PT.map(([k, key]) => `<div class="vw-p"><span class="vw-pk">${esc(T(key))}</span><b>${money(q[k].x)}</b><em>${esc(T(key + 'l'))}</em><small>${esc(T(key + 'm'))}</small></div>`).join('')}</div>`;
    }
    function priceBlock() {
      if (!res || !res.valid || !res.sane) return `<div class="vw-warn">${esc(T('rangeBad'))}</div>`;
      const g = res.grid, q = res.pts, lo = q.pmc.x / g.max * 100, a = Math.min(q.opp.x, q.ipp.x) / g.max * 100, b = Math.max(q.opp.x, q.ipp.x) / g.max * 100, hi = q.pme.x / g.max * 100;
      return `<h3 class="vw-h">${esc(T('yourT'))}</h3><div class="vw-pr"><label for="vwPrice_in">${esc(T('yourP'))}</label><output id="vwPout"></output></div>
        <div class="vw-meterw"><div class="vw-meter" style="background:linear-gradient(90deg,var(--rd) 0 ${lo}%,var(--am) ${lo}% ${a}%,var(--gn) ${a}% ${b}%,var(--am) ${b}% ${hi}%,var(--rd) ${hi}% 100%)"></div><input type="range" id="vwPrice_in" min="0" max="${g.max}" step="${g.step}" value="${price}"></div>
        <p class="vw-zone" id="vwZone" aria-live="polite"></p><div class="vw-ms" id="vwMs"></div>`;
    }
    function priceVals() {
      if (!res || !res.sane || !$('#vwPout')) return; const a = V.at(res, price), z = V.zone(res, price), best = V.bestInRange(res, cost);
      $('#vwPout').textContent = money(price); $('#vwZone').textContent = T('zn' + z) + (best ? ' · ' + T('missBest', { p: money(best.p) }) : ''); $('#vwZone').className = 'vw-zone z' + z;
      $('#vwMs').innerHTML = CV.map(c => `<div class="vw-m ${c[2]}"><b>${pct(a[c[0]])}</b><small>${esc(T('m' + c[0].toUpperCase()))}</small><div class="vw-mb"><i style="width:${a[c[0]] * 100}%"></i></div></div>`).join('') +
        `<div class="vw-m"><b>${pct(a.buy)}</b><small>${esc(T('mBuy'))}</small><div class="vw-mb"><i style="width:${a.buy * 100}%"></i></div></div><div class="vw-m"><b>${Math.round(V.profit(res, price, cost)).toLocaleString(loc())}</b><small>${esc(T('mProfit'))}</small></div>`;
      const c = $('#vwConc'); if (c) c.textContent = conclusion(); chart();
    }
    function sensRows() { const q = res.pts; return PT.map(([k, key]) => ({ name: T(key), p: q[k].x, buy: V.at(res, q[k].x).buy, prof: q[k].x - cost })); }
    function sensBlock() {
      if (!res || !res.sane) return '';
      return `<h3 class="vw-h">${esc(T('sensT'))}</h3><table class="vw-sens"><tr><th>${esc(T('thPoint'))}</th><th>${esc(T('thPrice'))}</th><th>${esc(T('thBuy'))}</th><th>${esc(T('thProfit'))}</th></tr>${sensRows().map(r => `<tr><td>${esc(r.name)}</td><td>${money(r.p)}</td><td>${pct(r.buy)}</td><td>${money(r.prof)}</td></tr>`).join('')}</table>`;
    }
    function conclusion() {
      if (!res || !res.sane) return T('rangeBad'); const q = res.pts, a = V.at(res, price);
      return T('concT', { lo: money(q.pmc.x), hi: money(q.pme.x), opp: money(q.opp.x), ipp: money(q.ipp.x), p: money(price), buy: pct(a.buy), zone: T('zn' + V.zone(res, price)) });
    }

    /* ---------- chart ---------- */
    const W = 720, H = 360, L = 50, R = 16, T0 = 16, B = 42;
    function chart() {
      const el = $('#vwChart'); if (!el) return;
      if (!res || !res.valid) { el.innerHTML = `<div class="vw-empty">${esc(T('odHelp'))}</div>`; $('#vwLegend').innerHTML = ''; $('#vwRead').textContent = ''; return; }
      const g = res.grid, cv = res.cv, X = p => L + p / g.max * (W - L - R), Y = v => T0 + (1 - v) * (H - T0 - B);
      const path = a => a.map((v, i) => (i ? 'L' : 'M') + X(cv.xs[i]).toFixed(1) + ' ' + Y(v).toFixed(1)).join('');
      let s = `<svg viewBox="0 0 ${W} ${H}" class="vw-svg ${animate ? 'draw' : ''}" role="img" aria-label="${esc(T('cvAria'))}" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="vwClip"><rect class="vw-rev" x="${L}" y="0" width="${W - L - R}" height="${H}"/></clipPath></defs>`;
      for (let i = 0; i <= 4; i++) { const v = i / 4; s += `<line class="vw-gl" x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}"/><text class="vw-ax" x="${L - 8}" y="${Y(v) + 4}" text-anchor="end">${Math.round(v * 100)}%</text>`; }
      for (let i = 0; i <= 6; i++) { const p = g.max * i / 6; s += `<line class="vw-gl v" x1="${X(p)}" x2="${X(p)}" y1="${T0}" y2="${H - B}"/><text class="vw-ax" x="${X(p)}" y="${H - B + 18}" text-anchor="middle">${compact(p)}</text>`; }
      s += `<text class="vw-axt" x="${(L + W - R) / 2}" y="${H - 4}" text-anchor="middle">${esc(T('axX'))}</text><text class="vw-axt" transform="translate(12 ${(T0 + H - B) / 2}) rotate(-90)" text-anchor="middle">${esc(T('axY'))}</text>`;
      if (res.sane) s += `<rect class="vw-band" x="${X(res.pts.pmc.x)}" y="${T0}" width="${X(res.pts.pme.x) - X(res.pts.pmc.x)}" height="${H - T0 - B}"/>`;
      s += `<g clip-path="url(#vwClip)">` + CV.map(c => off[c[0]] ? '' : `<path class="vw-curve ${c[2]}" d="${path(cv[c[0]])}"/>`).join('') + `</g>`;
      if (res.sane) {
        s += `<g class="vw-pts-g">`; const lab = { pmc: [-4, -12, 'end'], opp: [0, -14, 'middle'], ipp: [0, 24, 'middle'], pme: [6, -12, 'start'] };
        PT.forEach(([k, key]) => { const q = res.pts[k], x = X(q.x), y = Y(q.y), o = lab[k]; s += `<circle class="vw-pt" cx="${x}" cy="${y}" r="5.5"/><text class="vw-ptl" x="${x + o[0]}" y="${y + o[1]}" text-anchor="${o[2]}">${esc(T(key))}</text>`; });
        s += `</g>`;
      }
      if (step === 3) s += `<line class="vw-you" x1="${X(price)}" x2="${X(price)}" y1="${T0}" y2="${H - B}"/><path class="vw-youm" d="M${X(price) - 6} ${T0 - 2}h12l-6 9z"/>`;
      if (hover != null) s += `<line class="vw-hov" x1="${X(hover)}" x2="${X(hover)}" y1="${T0}" y2="${H - B}"/>`;
      s += `<rect class="sk-hit" x="${L}" y="${T0}" width="${W - L - R}" height="${H - T0 - B}" fill="transparent"/></svg>`;
      el.innerHTML = s; animate = false;
      $('#vwLegend').innerHTML = CV.map(c => `<button type="button" class="vw-lg ${c[2]} ${off[c[0]] ? 'off' : ''}" data-cv="${c[0]}" aria-pressed="${!off[c[0]]}"><i></i>${esc(T(c[1]))}</button>`).join('');
      readout();
    }
    function readout() {
      const el = $('#vwRead'); if (!el || !res || !res.valid) return; const p = hover != null ? hover : price, a = V.at(res, p);
      el.innerHTML = `<b>${esc(T('hoverAt', { p: money(p) }))}</b> · ${CV.map(c => `<span class="${c[2]}">${pct(a[c[0]])} ${esc(T('m' + c[0].toUpperCase()))}</span>`).join(' · ')}`;
    }

    /* ---------- checklist + navigation ---------- */
    function updQuest() {
      if (!$('#ck')) { renderSteps(); return; }
      const c = checks()[step], ks = Object.keys(c); let k = 0;
      ks.forEach(key => { const li = $(`#ck [data-c="${key}"]`); if (!li) return; if (c[key]) k++; li.classList.toggle('ok', c[key]); });
      $('#ckBar').style.width = k / ks.length * 100 + '%'; const b = $('#next1'); b.classList.toggle('ready', k === ks.length); b.setAttribute('aria-disabled', k === ks.length ? 'false' : 'true');
      $('#lockHint').style.visibility = k === ks.length ? 'hidden' : 'visible'; renderSteps();
    }
    function go(n) {
      if (n < 0 || n > 3) return; if (!unlocked(n)) { toast(T('lockHint'), 'warn'); return; }
      step = n; guideOpen = null; hover = null; animate = n >= 2; renderSteps(); renderStage(); $('#sdStage').scrollTop = 0; sfx('tick');
    }

    /* ---------- report ---------- */
    function reportChart() {
      const g = res.grid, cv = res.cv, w = 640, h = 300, l = 46, r = 12, tp = 12, b = 36, X = p => l + p / g.max * (w - l - r), Y = v => tp + (1 - v) * (h - tp - b);
      const COL = { tc: '#7c3aed', c: '#059669', e: '#d97706', te: '#dc2626' }, path = a => a.map((v, i) => (i ? 'L' : 'M') + X(cv.xs[i]).toFixed(1) + ' ' + Y(v).toFixed(1)).join('');
      let s = `<svg viewBox="0 0 ${w} ${h}" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif" font-size="11"><rect width="${w}" height="${h}" fill="#fff"/>`;
      for (let i = 0; i <= 4; i++) s += `<line x1="${l}" x2="${w - r}" y1="${Y(i / 4)}" y2="${Y(i / 4)}" stroke="#ddd"/><text x="${l - 6}" y="${Y(i / 4) + 4}" text-anchor="end" fill="#555">${i * 25}%</text>`;
      for (let i = 0; i <= 6; i++) { const p = g.max * i / 6; s += `<text x="${X(p)}" y="${h - b + 16}" text-anchor="middle" fill="#555">${compact(p)}</text>`; }
      if (res.sane) s += `<rect x="${X(res.pts.pmc.x)}" y="${tp}" width="${X(res.pts.pme.x) - X(res.pts.pmc.x)}" height="${h - tp - b}" fill="#34d399" fill-opacity=".15"/>`;
      CV.forEach(c => { s += `<path d="${path(cv[c[0]])}" fill="none" stroke="${COL[c[0]]}" stroke-width="2.2"${c[0] === 'tc' || c[0] === 'te' ? ' stroke-dasharray="6 4"' : ''}/>`; });
      if (res.sane) PT.forEach(([k, key]) => { const q = res.pts[k]; s += `<circle cx="${X(q.x)}" cy="${Y(q.y)}" r="4.5" fill="#111"/><text x="${X(q.x)}" y="${Y(q.y) - 9}" text-anchor="middle" font-weight="700" fill="#111">${T(key)}</text>`; });
      s += `<line x1="${X(price)}" x2="${X(price)}" y1="${tp}" y2="${h - b}" stroke="#111" stroke-dasharray="3 4"/></svg>`;
      return s;
    }
    const sName = () => sid === 'own' ? T('sc_own') : T('sc_' + sid);
    const reportBody = () => `<div class="blk"><h1>${esc(T('rTitle'))}</h1><p>${esc(sName())} · ${esc(T('dq', { ok: res.n, n: res.n + res.bad, bad: res.bad }))}</p></div><div class="blk">${reportChart()}</div><div class="blk"><h2>${esc(T('sensT'))}</h2><table><tr><th>${esc(T('thPoint'))}</th><th>${esc(T('thPrice'))}</th><th>${esc(T('thBuy'))}</th><th>${esc(T('thProfit'))}</th></tr>${sensRows().map(r => `<tr><td>${esc(r.name)}</td><td>${money(r.p)}</td><td>${pct(r.buy)}</td><td>${money(r.prof)}</td></tr>`).join('')}</table></div><div class="blk"><h2>${esc(T('conc'))}</h2><p>${esc(conclusion())}</p><p class="note">${esc(T('caveat'))}</p></div>`;
    const reportMD = () => ['# ' + T('rTitle'), '', '*' + sName() + ' · ' + T('vwTitle') + ' · MBA Lab*', '', '| ' + [T('thPoint'), T('thPrice'), T('thBuy'), T('thProfit')].join(' | ') + ' |', '|---|---|---|---|', ...sensRows().map(r => `| ${r.name} | ${money(r.p)} | ${pct(r.buy)} | ${money(r.prof)} |`), '', '## ' + T('conc'), '', conclusion(), '', '> ' + T('caveat')].join('\n');
    let busy = false;
    async function download(kind, btn) {
      if (busy || !MBALAB.report || !res || !res.sane) return; busy = true; const label = btn.textContent; btn.textContent = T('busy'); btn.disabled = true; const base = T('file');
      try {
        let ok; if (kind === 'html') ok = await MBALAB.report.save(base + '.html', MBALAB.report.html(T('rTitle'), reportBody()), 'text/html');
        else if (kind === 'md') ok = await MBALAB.report.save(base + '.md', reportMD(), 'text/markdown');
        else ok = await MBALAB.report.save(base + '.pdf', new Blob([await MBALAB.report.pdf(reportBody())], { type: 'application/pdf' }), 'application/pdf');
        if (ok) toast(T('saved'), 'xp');
      } catch (e) { console.warn('download failed', e); toast(T('fail'), 'warn'); }
      busy = false; btn.textContent = label; btn.disabled = false;
    }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      if (e.target.closest('[data-gclose]') || e.target.id === 'sdGuide') { closeGuide(); return; }
      const i = e.target.closest('[data-info]'); if (i) { showGuide(+i.dataset.info); return; }
      const c = e.target.closest('[data-sid]'); if (c) { sid = c.dataset.sid; price = 0; cost = sid === 'own' ? 0 : scn().cost; if (sid === 'own' && !ownText) ownText = ''; off = {}; sfx('tick'); build(); renderStage(); return; }
      const lg = e.target.closest('[data-cv]'); if (lg) { off[lg.dataset.cv] = !off[lg.dataset.cv]; chart(); return; }
      if (e.target.id === 'vwNew') { seed = (Math.random() * 1e9) | 0; price = 0; sfx('tick'); build(); updQuest(); dq(); return; }
      if (e.target.id === 'vwOdSample') { ownText = SAMPLE; price = 0; build(); renderStage(); return; }
      const g = e.target.closest('[data-go]'); if (g) { go(+g.dataset.go); return; }
      if (e.target.closest('[data-reset]')) { step = 0; sid = ''; cost = 0; price = 0; ownText = ''; off = {}; seen = {}; res = null; renderSteps(); renderStage(); return; }
      const d = e.target.closest('[data-dl]'); if (d) download(d.dataset.dl, d);
    });
    host.addEventListener('input', e => {
      const id = e.target.id || '';
      if (id.startsWith('vwc_')) {
        const k = id.slice(4), x = +e.target.value; opts[k] = k === 'n' ? Math.round(x) : x;
        $('#vwo_' + k).textContent = k === 'n' ? x : k === 'brand' ? (x > 0 ? '+' : '') + pct(x) : pct(x); build(); dq(); updQuest();
      } else if (id === 'vwCostIn') { cost = e.target.value === '' ? NaN : +e.target.value; updQuest(); }
      else if (id === 'vwTa') { ownText = e.target.value; price = 0; build(); dq(); updQuest(); }
      else if (id === 'vwPrice_in') { price = +e.target.value; hover = null; priceVals(); }
    });
    host.addEventListener('pointermove', e => {
      const hit = e.target.closest && e.target.closest('.vw-svg'); if (!hit || !res || !res.valid) return;
      const r = hit.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, g = res.grid;
      if (x < L || x > W - R) return; hover = Math.round((x - L) / (W - L - R) * g.max / g.step) * g.step;
      const ln = hit.querySelector('.vw-hov'); if (ln) { const px = L + hover / g.max * (W - L - R); ln.setAttribute('x1', px); ln.setAttribute('x2', px); } else chart();
      readout();
    });
    host.addEventListener('pointerleave', () => { if (hover != null) { hover = null; chart(); } }, true);
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#sdGuide') && !$('#sdGuide').hidden) { closeGuide(); e.stopPropagation(); } });
    if (window.SmartAssistant) SmartAssistant.create(host, { root: $('#sd'), hints: () => ({ state: step === 0 && !sid ? ['as1'] : [], generic: ['as2', 'as3'] }), busy: () => !!($('#sdGuide') && !$('#sdGuide').hidden) });
    renderSteps(); renderStage();
    this._vw = { relabel() { const ta = $('#vwTa') ? $('#vwTa').value : null; renderSteps(); renderStage(); if (ta != null && $('#vwTa')) $('#vwTa').value = ta; } };
  },
  onLang() { const m = this._vw; if (m) m.relabel(); }
});
