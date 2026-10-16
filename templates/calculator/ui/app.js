/* Calculator template logic: four guided parts (Frame, Build, Result, Stress-test), a required-to-continue checklist,
   a guide pop-up per part, toasts, the Bit assistant and a report download (PDF / HTML / Markdown). Swap the model, keep the frame. */
MBALAB.sims.define('my-simulation', {
  mount(host) {
    const $ = s => host.querySelector(s), E = MBALAB.be, sfx = MBALAB.util.sfx, T = (k, p) => t(k, p);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const money = v => 'Rp ' + Math.round(v * 1000).toLocaleString(MBALAB.i18n.get());
    let step = 0, caseId = '', M = { fixed: 0, price: 0, variable: 0 }, seen = {}, guideOpen = null;

    /* ---------- checklist per part: every item must be true to continue ---------- */
    const checks = () => { const p = E.validate(M); return [{ ck1: !!caseId }, { ck2: !p.includes('fixed'), ck3: !p.some(x => x === 'margin' || x === 'price' || x === 'variable') }]; };
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
    const head = (n, sub) => `<div class="sd-h"><h2>${esc(T('partN', { n: n + 1 }))} · ${esc(T('gh' + (n + 1)))}</h2><p>${esc(sub)}</p><button type="button" class="sd-info" data-info="${n}" title="${esc(T('infoTip'))}" aria-label="${esc(T('infoTip'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg></button></div>`;
    const quest = (keys, cta, goTo) => `<aside class="sd-card sd-quest"><h3>${esc(T('quest'))}</h3><ul id="ck">${keys.map(k => `<li data-c="${k}"><span class="bx">✓</span><span>${esc(T(k))}</span></li>`).join('')}</ul><div class="sd-prog"><i id="ckBar"></i></div><button type="button" class="sd-cta" id="next1" data-go="${goTo}">${esc(T(cta))}</button><p class="note" id="lockHint">${esc(T('lockHint'))}</p></aside>`;
    const foot = (n, last) => `<div class="sd-foot"><button type="button" data-go="${n - 1}">${esc(T('back'))}</button><span class="grow"></span>${last ? `<button type="button" data-reset>↺ ${esc(T('newCase'))}</button>` : `<button type="button" class="sd-cta ready" data-go="${n + 1}">${esc(T('next' + (n + 1)))}</button>`}</div>`;

    /* ---------- the four parts ---------- */
    function renderStage() {
      const st = $('#sdStage'), n = step; let h;
      if (n === 0) h = `<div class="sd-p1"><section class="sd-card">${head(0, T('sub1'))}<div class="bc-cases" role="radiogroup">${E.CASES.map(c => `<button type="button" role="radio" aria-checked="${c.id === caseId}" class="bc-case ${c.id === caseId ? 'on' : ''}" data-case="${c.id}"><b>${esc(T('case_' + c.id))}</b></button>`).join('')}</div></section>${quest(['ck1'], 'next1', 1)}</div>`;
      else if (n === 1) h = `<div class="sd-p1"><section class="sd-card">${head(1, T('g2a'))}<div class="bc-form">${['fixed', 'price', 'variable'].map(k => `<label>${esc(T(k))}<input type="number" min="0" step="any" data-k="${k}" value="${M[k]}"></label>`).join('')}</div><div id="bcIssues"></div></section>${quest(['ck2', 'ck3'], 'next2', 2)}</div>`;
      else if (n === 2) { const r = E.solve(M); h = `<section class="sd-card">${head(2, T('g3a'))}<p class="bc-big">${esc(T('resUnits', { n: r.units }))}</p><p>${esc(T('resUnit', { v: money(r.unit), m: r.marginPct.toFixed(0) }))}</p><p>${esc(T('resRev', { v: money(r.revenue) }))}</p>${foot(2)}</section>`; }
      else h = `<section class="sd-card">${head(3, T('g4a'))}${sensTable()}<h3>${esc(T('conc'))}</h3><p>${esc(conclusion())}</p><div class="sd-dl"><h4>⬇ ${esc(T('dl'))}</h4><div class="row"><button type="button" data-dl="pdf">PDF</button><button type="button" data-dl="html">HTML</button><button type="button" data-dl="md">Markdown</button></div></div>${foot(3, true)}</section>`;
      st.innerHTML = h; renderIssues(); updQuest();
      if (!seen[n]) { seen[n] = 1; showGuide(n); } else if (guideOpen != null) showGuide(guideOpen);
    }
    function sensTable() { return `<table class="bc-table"><tr><th>${esc(T('thPrice'))}</th><th>${esc(T('thUnits'))}</th></tr>${E.sens(M, [-.2, -.1, 0, .1, .2]).map(r => `<tr><td>${money(r.price)}</td><td>${r.units == null ? esc(T('none')) : r.units}</td></tr>`).join('')}</table>`; }
    function conclusion() { const r = E.solve(M), lo = E.sens(M, [-.1])[0]; return T('concT', { n: r.units, m: lo.units == null ? T('none') : lo.units }); }
    function renderIssues() { const b = $('#bcIssues'); if (b) b.innerHTML = E.validate(M).map(p => `<p class="bc-issue">⚠ ${esc(T('pf_' + p))}</p>`).join(''); }
    function updQuest() {
      if (!$('#ck')) { renderSteps(); return; }
      const c = checks()[step], ks = Object.keys(c); let k = 0;
      ks.forEach(key => { const li = $(`#ck [data-c="${key}"]`); if (!li) return; if (c[key]) k++; li.classList.toggle('ok', c[key]); });
      $('#ckBar').style.width = k / ks.length * 100 + '%'; const b = $('#next1'); b.classList.toggle('ready', k === ks.length); b.setAttribute('aria-disabled', k === ks.length ? 'false' : 'true');
      $('#lockHint').style.visibility = k === ks.length ? 'hidden' : 'visible'; renderSteps();
    }
    function go(n) {
      if (n < 0 || n > 3) return; if (!unlocked(n)) { toast(T('lockHint'), 'warn'); return; }
      step = n; guideOpen = null; renderSteps(); renderStage(); $('#sdStage').scrollTop = 0; sfx('tick');
    }

    /* ---------- report: write the body once as HTML (white paper colours), plus a Markdown version ---------- */
    const reportBody = () => `<div class="blk"><h1>${esc(T('rTitle'))}</h1><p>${esc(T('resUnits', { n: E.solve(M).units }))}</p></div><div class="blk"><h2>${esc(T('thUnits'))}</h2>${sensTable()}</div><div class="blk"><h2>${esc(T('conc'))}</h2><p>${esc(conclusion())}</p></div>`;
    const reportMD = () => ['# ' + T('rTitle'), '', '*' + T('title') + ' · MBA Lab*', '', '| ' + T('thPrice') + ' | ' + T('thUnits') + ' |', '|---|---|', ...E.sens(M, [-.2, -.1, 0, .1, .2]).map(r => `| ${money(r.price)} | ${r.units == null ? T('none') : r.units} |`), '', '## ' + T('conc'), '', conclusion()].join('\n');
    let busy = false;
    async function download(kind, btn) {
      if (busy || !MBALAB.report) return; busy = true; const label = btn.textContent; btn.textContent = T('busy'); btn.disabled = true; const base = T('file');
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
      const c = e.target.closest('[data-case]'); if (c) { caseId = c.dataset.case; const k = E.CASES.find(x => x.id === caseId); M = { fixed: k.fixed, price: k.price, variable: k.variable }; sfx('tick'); renderStage(); return; }
      const g = e.target.closest('[data-go]'); if (g) { go(+g.dataset.go); return; }
      if (e.target.closest('[data-reset]')) { step = 0; caseId = ''; M = { fixed: 0, price: 0, variable: 0 }; seen = {}; renderSteps(); renderStage(); return; }
      const d = e.target.closest('[data-dl]'); if (d) download(d.dataset.dl, d);
    });
    host.addEventListener('input', e => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; M[k] = e.target.value === '' ? NaN : +e.target.value; renderIssues(); updQuest(); });
    host.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#sdGuide') && !$('#sdGuide').hidden) { closeGuide(); e.stopPropagation(); } });
    if (window.SmartAssistant) SmartAssistant.create(host, { root: $('#sd'), hints: () => ({ state: [], generic: ['as1', 'as2'] }), busy: () => !!($('#sdGuide') && !$('#sdGuide').hidden) });
    renderSteps(); renderStage();
    this._bc = { relabel() { renderSteps(); renderStage(); } };
  },
  onLang() { const m = this._bc; if (m) m.relabel(); }
});
