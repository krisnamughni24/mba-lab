/* Corporate Society: UI wiring. Rules live in engine/engine.js, stories in engine/content*.js, pictures in scene/scene.js.
   Flow: menu (role + level) > move (pick a place) > event (read, choose) > result (effects) > ... > ending (stars, decisions, concepts). */
MBALAB.sims.define('corporate-society', {
  mount(host) {
    const C = MBALAB.corp, D = MBALAB.corpContent, Sc = MBALAB.corpScene, $ = s => host.querySelector(s), esc = MBALAB.util.esc, sfx = MBALAB.util.sfx;
    const LI = () => Math.max(0, ['en', 'id', 'ja', 'zh'].indexOf(MBALAB.i18n.get())), X = a => a[LI()];
    const KEY = 'mbalab-corporate-society', RANKS = [0, 60, 160, 300], ROLES = ['finance', 'it'], LEVELS = ['junior', 'mid', 'senior'];
    const RICON = { finance: '💼', it: '💻' }, LICON = { junior: '🌱', mid: '🔧', senior: '🏛️' }, PICON = { desk: '🖥️', pantry: '☕', meeting: '📊', floor: '🏢', lobby: '🛗', after: '🌆' };
    const SICON = { perf: '📈', rep: '🌟', energy: '⚡', integ: '🧭', net: '🤝' };
    let me = { xp: 0, best: {} };
    try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); if (o && typeof o === 'object') me = { xp: +o.xp || 0, best: o.best && typeof o.best === 'object' ? o.best : {} }; } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(me)); } catch (e) {} };
    const maxMerge = (a, b) => { const best = Object.assign({}, (a && a.best) || {}); Object.keys((b && b.best) || {}).forEach(k => { if (!(best[k] >= b.best[k])) best[k] = b.best[k]; }); return { xp: Math.max((a && a.xp) || 0, (b && b.xp) || 0), best }; };
    const cloud = MBALAB.cloud('corporate-society', { read: () => me, write: o => { me = o; save(); }, merge: maxMerge, refresh: () => { if (phase === 'menu') menu(); } });
    const stars = n => '★'.repeat(n) + '☆'.repeat(3 - n);

    let sel = { role: 'finance', level: 'junior' }, s = null, ev = null, rec = null, pick = -1, phase = 'menu', burnSeen = 0, scored = null;
    const NAMES = D.names, nameOf = k => NAMES[k];
    /* {boss} etc. in a story text become the colleague's name */
    const sub = txt => String(txt).replace(/\{(\w+)\}/g, (m, k) => NAMES[k] || m);
    const lbl = k => t('rel_' + k + '_' + (s ? s.level : 'junior'));
    const say = txt => { const r = $('#csSr'); if (r) r.textContent = txt; };

    /* ---------- menu ---------- */
    function rankOf(xp) { return RANKS.reduce((r, x, i) => xp >= x ? i : r, 0); }
    function menu() {
      phase = 'menu'; $('#csPlay').hidden = true; $('#csSelect').hidden = false;
      const r = rankOf(me.xp), nx = RANKS[r + 1], pc = nx ? Math.round((me.xp - RANKS[r]) / (nx - RANKS[r]) * 100) : 100;
      const best = (ro, lv) => me.best[ro + '-' + lv] || 0;
      $('#csSelect').innerHTML = `<div class="sc-hero"><div><h2>${t('hero')}</h2><p>${t('heroSub')}</p></div>
        <div class="sc-rank"><span class="sc-rk">${t('rk' + r)}</span><b>${t('xpLbl', { n: me.xp })}</b><div class="sc-xp"><i style="width:${pc}%"></i></div><small>${nx ? t('xpNext', { n: nx }) : t('xpMax')}</small></div></div>
        <h3 class="sc-h3">${t('pickRole')}</h3>
        <div class="cs-pick">${ROLES.map(ro => `<button type="button" class="cs-card${sel.role === ro ? ' on' : ''}" data-a="role" data-v="${ro}" aria-pressed="${sel.role === ro}"><span class="ic" aria-hidden="true">${RICON[ro]}</span><b>${t('role_' + ro)}</b><small>${t('role_' + ro + '_d')}</small></button>`).join('')}</div>
        <h3 class="sc-h3">${t('pickLevel')}</h3>
        <div class="cs-pick three">${LEVELS.map(lv => `<button type="button" class="cs-card${sel.level === lv ? ' on' : ''}" data-a="level" data-v="${lv}" aria-pressed="${sel.level === lv}"><span class="ic" aria-hidden="true">${LICON[lv]}</span><b>${t('lvl_' + lv)}</b><small>${t('lvl_' + lv + '_d')}</small><em title="${esc(t('stars', { n: best(sel.role, lv) }))}">${t('best')} ${stars(best(sel.role, lv))}</em></button>`).join('')}</div>
        <div class="cs-go"><button type="button" class="sc-main go" data-a="start">${RICON[sel.role]} ${t('role_' + sel.role)} · ${LICON[sel.level]} ${t('lvl_' + sel.level)} — ${t('start')}</button></div>
        <div class="sc-how"><h3>${t('howT')}</h3><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol></div>
        <p class="sc-note">${t('csNote')}</p>`;
    }

    /* ---------- run ---------- */
    function start() { s = C.create(sel.role, sel.level, 1 + Math.floor(Math.random() * 1e6)); ev = null; rec = null; pick = -1; burnSeen = 0; scored = null; $('#csSelect').hidden = true; $('#csPlay').hidden = false; $('#csPlay').classList.remove('ended'); phase = 'move'; render(); sfx('open'); host.querySelector('#csScroll').scrollTop = 0; }
    const dayLbl = () => t('dayN', { n: C.day(s), m: C.DAYS }) + ' · ' + t('slot' + C.slot(s));
    function hud() {
      $('#csHud').innerHTML = `<button type="button" class="sc-back" data-a="menu">← ${t('toMenu')}</button><b class="sc-lt">${RICON[s.role]} ${t('role_' + s.role)} · ${LICON[s.level]} ${t('lvl_' + s.level)}</b>${phase === 'end' ? '' : `<span class="sc-chip">${esc(dayLbl())}</span>`}`;
    }
    function stats() {
      $('#csStats').innerHTML = C.STATS.map(k => { const v = Math.round(s.st[k]), low = v <= 20; return `<div class="cs-stat${low ? ' low' : ''}" title="${esc(t('s_' + k + '_d'))}"><span class="n"><i aria-hidden="true">${SICON[k]}</i>${t('s_' + k)}${low ? `<em>${t('danger')}</em>` : ''}</span><b>${v}</b><span class="bar"><i style="width:${v}%"></i></span></div>`; }).join('');
    }
    function side() {
      $('#csSide').innerHTML = `<h4>${t('standing')}</h4>` + C.PEOPLE.map(k => { const v = Math.round(s.rel[k]), low = v <= 20 && k === 'boss'; return `<div class="cs-rel ${v < 25 ? 'low' : v < 60 ? 'ok' : 'good'}${low ? ' crit' : ''}"><span class="av" aria-hidden="true">${Sc.AVATAR[k]}</span><span class="who"><b>${nameOf(k)}</b><small>${lbl(k)}</small></span><span class="bar"><i style="width:${v}%"></i></span><em>${v}</em></div>`; }).join('');
    }
    function stage() {
      const npc = ev && (phase === 'event' || phase === 'result') ? ev.npc : null, loc = s.loc || 'desk';
      $('#csStage').innerHTML = Sc.html(phase === 'move' || phase === 'day' ? 'desk' : loc, C.slot(s), npc, { role: s.role, rel: npc ? s.rel[npc] : 50, name: npc ? nameOf(npc) : '', label: npc ? lbl(npc) : '', place: phase === 'move' || phase === 'day' ? t('slot' + C.slot(s)) : t('loc_' + loc) });
    }
    const chip = (name, v) => v ? `<span class="cs-chip ${v > 0 ? 'pos' : 'neg'}">${esc(name)} ${v > 0 ? '+' : '−'}${Math.abs(v)}</span>` : '';
    function box() {
      const b = $('#csBox');
      if (phase === 'move') {
        say(t('whereTo'));
        b.innerHTML = `<h3>${t('whereTo')}</h3><p class="cs-sub">${t('whereToSub')}</p><div class="cs-locs">${C.locsNow(s).map(l => `<button type="button" class="cs-loc" data-a="loc" data-v="${l}"><span aria-hidden="true">${PICON[l]}</span><b>${t('loc_' + l)}</b></button>`).join('')}</div>`;
      } else if (phase === 'event') {
        say(X(ev.t));
        b.innerHTML = `<h3>${esc(sub(X(ev.t)))}</h3><p class="cs-say">${esc(sub(X(ev.d)))}</p><div class="cs-opts">${ev.opts.map((o, i) => `<button type="button" class="cs-opt" data-a="opt" data-i="${i}"><span class="k">${'ABC'[i]}</span><span>${esc(sub(X(o.t)))}</span>${o.g ? `<em>${t('risky')}</em>` : ''}</button>`).join('')}</div>`;
      } else if (phase === 'result') {
        const o = ev.opts[pick], txt = o.g ? (rec.branch === 'ok' ? o.ro : o.rb) : o.r;
        b.innerHTML = `<h3>${esc(sub(X(o.t)))}</h3>${o.g ? `<span class="cs-tag ${rec.branch}">${t(rec.branch === 'ok' ? 'gambleOk' : 'gambleBad')}</span>` : ''}<p class="cs-say">${esc(sub(X(txt)))}</p>
          <div class="cs-chips">${C.STATS.map(k => chip(t('s_' + k), Math.round(rec.fx[k] || 0))).join('')}${C.PEOPLE.map(k => chip(nameOf(k), Math.round(rec.rel[k] || 0))).join('')}</div>
          ${s.burn > burnSeen ? `<p class="cs-warn">${t('burnNote')}</p>` : ''}
          <div class="sc-foot"><button type="button" class="sc-main go" data-a="cont">${t('cont')}</button></div>`;
      } else if (phase === 'day') {
        say(t('newDay'));
        b.innerHTML = `<h3>${t('newDay')} · ${esc(t('dayN', { n: C.day(s), m: C.DAYS }))}</h3><p class="cs-say">${t('newDaySub')}</p><div class="sc-foot"><button type="button" class="sc-main go" data-a="cont">${t('cont')}</button></div>`;
      } else if (phase === 'end') endScreen(b);
    }
    function render() { hud(); stats(); side(); stage(); box(); }

    function endScreen(b) {
      const o = s.over, sc = scored, conc = [...new Set(s.log.map(x => (D.events.find(e => e.id === x.id) || {}).c).filter(Boolean))], bar = C.BAR[s.level];
      say(t('srEnd', { e: t('end_' + o) }));
      const barRows = Object.keys(bar).map(k => { const v = s.st[k] !== undefined ? s.st[k] : s.rel[k], ok = v >= bar[k]; return `<li class="${ok ? 'ok' : 'no'}"><span aria-hidden="true">${ok ? '✓' : '✗'}</span>${t('s_' + k)}: ${Math.round(v)} / ${bar[k]}</li>`; }).join('');
      const logRows = s.log.map(x => { const e = D.events.find(y => y.id === x.id), op = e.opts[x.opt]; return `<li><b>${esc(sub(X(e.t)))}</b><span>${esc(sub(X(op.t)))}${x.branch ? ` · <em class="${x.branch}">${t(x.branch === 'ok' ? 'gambleOk' : 'gambleBad')}</em>` : ''}</span></li>`; }).join('');
      b.innerHTML = `<div class="cs-end ${o.startsWith('fired') || o === 'burnout' ? 'lost' : 'won'}"><h2>${t('end_' + o)}</h2><p>${t('end_' + o + '_d')}</p>
        <div class="sc-big"><span class="sc-st" aria-label="${esc(t('stars', { n: sc.stars }))}">${[0, 1, 2].map(i => `<b class="${i < sc.stars ? 'on' : ''}" style="--i:${i}">★</b>`).join('')}</span><em class="sc-xpg">${t('xpGain', { n: sc.xp })}</em></div>
        <h3>${t('barT')}</h3><ul class="cs-bar">${barRows}</ul>
        <h3>${t('logT')}</h3><ol class="cs-log">${logRows}</ol>
        ${conc.length ? `<h3>${t('conceptsT')}</h3><div class="cs-conc">${conc.map(c => `<div><b>${esc(D.concepts[c][LI()])}</b><p>${esc(D.concepts[c][4 + LI()])}</p></div>`).join('')}</div>` : ''}
        <div class="sc-btns"><button type="button" class="sc-btn" data-a="again">${t('again')}</button><button type="button" class="sc-btn ghost" data-a="menu">${t('newRun')}</button></div></div>`;
    }
    function finish() {
      phase = 'end'; scored = C.score(s); const k = s.role + '-' + s.level;
      me.xp += scored.xp; if ((me.best[k] || 0) < scored.stars) me.best[k] = scored.stars; save();
      try { cloud.changed(); cloud.attempt({ at: Date.now(), score: Math.round(scored.stars / 3 * 60 + (s.st.perf + s.st.rep + s.st.integ) / 3 * 0.4), variant: k, detail: { stars: scored.stars, end: s.over } }); } catch (e) {}
      $('#csPlay').classList.add('ended'); sfx(scored.stars >= 2 ? 'win' : 'lose'); render(); host.querySelector('#csScroll').scrollTop = 0;
    }

    /* ---------- events ---------- */
    host.addEventListener('click', e => {
      const a = e.target.closest('[data-a]'); if (!a) return; const act = a.dataset.a, v = a.dataset.v; sfx('tick');
      if (act === 'role') { sel.role = v; menu(); } else if (act === 'level') { sel.level = v; menu(); } else if (act === 'start' || act === 'again') start(); else if (act === 'menu') menu();
      else if (act === 'loc' && phase === 'move') { ev = C.visit(s, v); rec = null; pick = -1; phase = 'event'; render(); }
      else if (act === 'opt' && phase === 'event') { pick = +a.dataset.i; burnSeen = s.burn; rec = C.choose(s, ev, pick); phase = 'result'; render(); sfx((rec.fx.integ || 0) < 0 ? 'lose' : 'tick'); }
      else if (act === 'cont' && (phase === 'result' || phase === 'day')) {
        if (phase === 'day') { phase = 'move'; render(); return; }
        const r = C.next(s); if (r === 'end') finish(); else if (r === 'day') { phase = 'day'; render(); } else { phase = 'move'; render(); }
      }
    });
    menu();
    this._cs = { relabel() { if (phase === 'menu') menu(); else render(); } };
  },
  onLang() { const m = this._cs; if (m) m.relabel(); }
});
