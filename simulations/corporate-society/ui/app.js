/* Corporate Society: UI wiring. Rules live in engine/engine.js, stories in engine/content*.js, pictures in scene/scene.js.
   Flow: menu (role + level) > move (pick a place) > event (read, choose) > result (effects) > ... > ending (stars, decisions, concepts). */
MBALAB.sims.define('corporate-society', {
  mount(host) {
    const C = MBALAB.corp, D = MBALAB.corpContent, Sc = MBALAB.corpScene, $ = s => host.querySelector(s), esc = MBALAB.util.esc, sfx = MBALAB.util.sfx;
    const LI = () => Math.max(0, ['en', 'id', 'ja', 'zh'].indexOf(MBALAB.i18n.get())), X = a => a[LI()];
    const KEY = 'mbalab-corporate-society', RANKS = [0, 60, 160, 300], ROLES = C.ROLES, LEVELS = C.LADDER;
    const RICON = { finance: '💼', it: '💻', marketing: '📣', hr: '🫶', ops: '📦', sales: '🤝', legal: '⚖️' }, LICON = { junior: '🌱', mid: '🔧', senior: '🏛️', head: '👑' }, PICON = { desk: '🖥️', pantry: '☕', meeting: '📊', floor: '🏢', lobby: '🛗', after: '🌆' };
    const SICON = { perf: '📈', rep: '🌟', energy: '⚡', integ: '🧭', net: '🤝', skill: '🛠️' };
    let me = { xp: 0, best: {} };
    try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); if (o && typeof o === 'object') me = { xp: +o.xp || 0, best: o.best && typeof o.best === 'object' ? o.best : {} }; } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(me)); } catch (e) {} };
    const maxMerge = (a, b) => { const best = Object.assign({}, (a && a.best) || {}); Object.keys((b && b.best) || {}).forEach(k => { if (!(best[k] >= b.best[k])) best[k] = b.best[k]; }); return { xp: Math.max((a && a.xp) || 0, (b && b.xp) || 0), best }; };
    const cloud = MBALAB.cloud('corporate-society', { read: () => me, write: o => { me = o; save(); }, merge: maxMerge, refresh: () => { if (phase === 'menu') menu(); } });
    const stars = n => '★'.repeat(n) + '☆'.repeat(3 - n);

    let retireArm = false, sel = { role: 'finance', level: 'junior', trait: 'steady', goal: 'promo' }, s = null, ev = null, rec = null, pick = -1, phase = 'menu', burnSeen = 0, scored = null;
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
      const best = (ro, lv) => me.best[ro + '-' + lv] || 0, pv = C.create(sel.role, sel.level, 1, { trait: sel.trait, goal: sel.goal }), bar = C.barOf(pv);
      const TICON = { analyst: '🔬', charmer: '✨', steady: '🌿', maverick: '🔥' }, GICON = { promo: '🏆', network: '🕸️', integrity: '⚖️', balance: '🌗', mentor: '🌱' };
      const card = (a, v, on, ic, name, desc, extra) => `<button type="button" class="cs-card${on ? ' on' : ''}" data-a="${a}" data-v="${v}" aria-pressed="${on}"><span class="ic" aria-hidden="true">${ic}</span><b>${name}</b><span class="d">${desc}</span>${extra || ''}</button>`;
      const mini = k => { const v = Math.round(pv.st[k]), need = bar[k]; return `<div class="cs-mini"><span>${SICON[k]} ${t('s_' + k)}</span><i class="b"><i style="width:${v}%"></i>${need ? `<u style="left:${need}%" title="${need}"></u>` : ''}</i><b>${v}</b></div>`; };
      $('#csSelect').innerHTML = `<div class="cs-hero2">${Sc.skyline()}<div class="txt"><small>${t('companyTag')}</small><h2>${t('hero')}</h2><p>${t('heroSub')}</p></div>
        <div class="sc-rank"><span class="sc-rk">${t('rk' + r)}</span><b>${t('xpLbl', { n: me.xp })}</b><div class="sc-xp"><i style="width:${pc}%"></i></div><small>${nx ? t('xpNext', { n: nx }) : t('xpMax')}</small></div></div>
        <div class="cs-wiz"><div class="cs-steps">
        <h3 class="sc-h3">${t('pickRole')}</h3>
        <div class="cs-pick roles">${ROLES.map((ro, ri) => card('role', ro, sel.role === ro, `<span class="fig">${Sc.person(['senior', 'peer', 'junior', 'boss', 'other', 'director', 'me'][ri % 7], 'good')}<em>${RICON[ro]}</em></span>`, t('role_' + ro), t('role_' + ro + '_d'), `<small class="k">${t('role_' + ro + '_k')}</small>`)).join('')}</div>
        <h3 class="sc-h3">${t('pickLevel')}</h3>
        <div class="cs-pick four">${LEVELS.map(lv => card('level', lv, sel.level === lv, LICON[lv], t('lvl_' + lv), t('lvl_' + lv + '_d'), `<small class="k">${t('best')}: ${stars(best(sel.role, lv))}</small>`)).join('')}</div>
        <h3 class="sc-h3">${t('step3')}</h3>
        <div class="cs-pick four">${Object.keys(C.TRAITS).map(k => card('trait', k, sel.trait === k, TICON[k], t('tr_' + k), t('tr_' + k + '_d'), `<small class="k">${sub(t('tr_' + k + '_k'))}</small>`)).join('')}</div>
        <h3 class="sc-h3">${t('step4')}</h3>
        <div class="cs-pick four">${C.GOALS.map(k => card('goal', k, sel.goal === k, GICON[k], t('gl_' + k), sub(t('gl_' + k + '_d')))).join('')}</div>
        </div>
        <aside class="cs-brief"><h3>${t('briefT')}</h3>
          <p class="who"><span aria-hidden="true">${RICON[sel.role]}</span> <b>${t('role_' + sel.role)}</b> · ${LICON[sel.level]} ${t('lvl_' + sel.level)}</p>
          <p class="who"><span aria-hidden="true">${TICON[sel.trait]}</span> ${t('briefStyle')}: <b>${t('tr_' + sel.trait)}</b></p>
          <p class="who"><span aria-hidden="true">${GICON[sel.goal]}</span> ${t('briefGoal')}: <b>${t('gl_' + sel.goal)}</b></p>
          <h4>${t('briefStart')}</h4>${C.STATS.map(mini).join('')}
          <p class="cs-legend"><u></u> ${t('briefBar')}</p>
          <p class="cs-bestline">${t('briefBest')}: ${stars(best(sel.role, sel.level))}</p>
          <button type="button" class="sc-main go" data-a="start">${t('start')} →</button></aside></div>
        <div class="sc-how"><h3>${t('howT')}</h3><ol><li>${t('how1')}</li><li>${t('how2')}</li><li>${t('how3')}</li><li>${t('how4')}</li></ol></div>
        <p class="sc-note">${t('csNote')}</p>`;
    }

    /* ---------- run ---------- */
    function start() { s = C.create(sel.role, sel.level, 1 + Math.floor(Math.random() * 1e6), { trait: sel.trait, goal: sel.goal }); ev = null; rec = null; pick = -1; burnSeen = 0; scored = null; $('#csSelect').hidden = true; $('#csPlay').hidden = false; $('#csPlay').classList.remove('ended'); phase = 'prologue'; render(); sfx('open'); host.querySelector('#csScroll').scrollTop = 0; }
    const dayLbl = () => t('qtrN', { q: s.quarters + 1 }) + ' · ' + t('dayN', { n: C.day(s) }) + ' · ' + t('slot' + C.slot(s));
    function hud() {
      $('#csHud').innerHTML = `<button type="button" class="sc-back" data-a="menu">← ${t('toMenu')}</button><b class="sc-lt">${RICON[s.role]} ${t('role_' + s.role)} · ${LICON[s.level]} ${t('lvl_' + s.level)}</b>${phase === 'end' ? '' : `<span class="sc-chip">${esc(dayLbl())}</span>`}${goalChip()}`;
    }
    const GICON2 = { promo: '🏆', network: '🕸️', integrity: '⚖️', balance: '🌗', mentor: '🌱' };
    function goalChip() {
      const g = C.goal(s), pc = Math.round(g.p * 100);
      return `<span class="cs-goal${g.done ? ' done' : ''}" title="${esc(sub(t('gl_' + s.goal + '_d')))}"><i style="width:${pc}%"></i><span>${GICON2[s.goal]} ${t('gl_' + s.goal)} · ${g.done ? '✓' : pc + '%'}</span></span>`;
    }
    /* the week at a glance: eight chapter dots and the three moments of today */
    function agenda() {
      const d = C.day(s), dq = (d - 1) % C.DAYS + 1, CH = D.chapters || [], slotIc = ['🌅', '☀️', '🌆'], cur = CH[C.chapterIdx(d)];
      const dots = Array.from({ length: C.DAYS }, (_, i) => `<li class="${i + 1 < dq ? 'past' : i + 1 === dq ? 'now' : ''}"><b>${i + 1}</b></li>`).join('');
      const today = [0, 1, 2].map(i => { const turn = (d - 1) * C.SLOTS + i, lg = s.log.filter(x => x.turn === turn).pop(), ee = lg && D.events.find(y => y.id === lg.id), cur = i === C.slot(s) && phase !== 'end';
        return `<li class="${lg ? 'done' : cur ? 'now' : ''}"><span aria-hidden="true">${slotIc[i]}</span><b>${t('slot' + i)}</b><small>${ee ? esc(sub(X(ee.t))) : cur ? '…' : ''}</small></li>`; }).join('');
      $('#csAgenda').innerHTML = `${cur ? `<p class="chap"><span aria-hidden="true">${cur.e}</span> ${esc(X(cur.t))}</p>` : ''}<ol class="days" aria-label="${esc(t('agendaT'))}">${dots}</ol><ol class="slots">${today}</ol>`;
    }
    function stats() {
      $('#csStats').innerHTML = C.STATS.map(k => { const v = Math.round(s.st[k]), low = v <= 20; return `<div class="cs-stat${low ? ' low' : ''}" title="${esc(t('s_' + k + '_d'))}"><span class="n"><i aria-hidden="true">${SICON[k]}</i>${t('s_' + k)}${low ? `<em>${t('danger')}</em>` : ''}</span><b>${v}</b><span class="bar"><i style="width:${v}%"></i></span></div>`; }).join('');
    }
    function side() {
      $('#csSide').innerHTML = `<h4>${t('standing')}</h4>` + C.PEOPLE.map(k => { const v = Math.round(s.rel[k]), low = v <= 20 && k === 'boss'; return `<div class="cs-rel ${v < 25 ? 'low' : v < 60 ? 'ok' : 'good'}${low ? ' crit' : ''}"><span class="av" aria-hidden="true">${Sc.AVATAR[k]}</span><span class="who"><b>${nameOf(k)}</b><small>${lbl(k)}</small></span><span class="bar"><i style="width:${v}%"></i></span><em>${v}</em></div>`; }).join('');
    }
    function stage() {
      const npc = ev && (phase === 'event' || phase === 'result') ? ev.npc : null, loc = s.loc || 'desk';
      $('#csStage').innerHTML = Sc.html(phase === 'move' || phase === 'day' || phase === 'prologue' ? 'desk' : loc, C.slot(s), npc, { role: s.role, me: s.st.energy < 30 ? 'low' : s.st.energy >= 60 ? 'good' : 'ok', rel: npc ? s.rel[npc] : 50, name: npc ? nameOf(npc) : '', label: npc ? lbl(npc) : '', place: phase === 'move' || phase === 'day' ? t('slot' + C.slot(s)) : t('loc_' + loc) });
    }
    const chip = (name, v) => v ? `<span class="cs-chip ${v > 0 ? 'pos' : 'neg'}">${esc(name)} ${v > 0 ? '+' : '−'}${Math.abs(v)}</span>` : '';
    function box() {
      const b = $('#csBox');
      if (phase === 'move') {
        say(t('whereTo'));
        b.innerHTML = `<h3>${t('whereTo')}</h3><p class="cs-sub">${t('whereToSub')}</p><div class="cs-locs">${C.locsNow(s).map(l => `<button type="button" class="cs-loc" data-a="loc" data-v="${l}"><span aria-hidden="true">${PICON[l]}</span><b>${t('loc_' + l)}</b></button>`).join('')}</div><div class="cs-retire"><button type="button" class="sc-btn ghost${retireArm ? ' arm' : ''}" data-a="retire">${retireArm ? t('retireSure') : t('retire')}</button></div>`;
      } else if (phase === 'event') {
        say(X(ev.t));
        b.innerHTML = `${ev.free ? `<span class="cs-tag ok">${t('reviewTag')}</span>` : ''}<h3>${esc(sub(X(ev.t)))}</h3><p class="cs-say">${esc(sub(X(ev.d)))}</p><div class="cs-opts">${ev.opts.map((o, i) => `<button type="button" class="cs-opt" data-a="opt" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span>${esc(sub(X(o.t)))}</span>${o.g ? `<em>${t('risky')}</em>` : ''}</button>`).join('')}</div>`;
      } else if (phase === 'result') {
        const o = ev.opts[pick], txt = o.g ? (rec.branch === 'ok' ? o.ro : o.rb) : o.r;
        b.innerHTML = `<h3>${esc(sub(X(o.t)))}</h3>${o.g ? `<span class="cs-tag ${rec.branch}">${t(rec.branch === 'ok' ? 'gambleOk' : 'gambleBad')}</span>` : ''}<p class="cs-say">${esc(sub(X(txt)))}</p>
          <div class="cs-chips">${C.STATS.map(k => chip(t('s_' + k), Math.round(rec.fx[k] || 0))).join('')}${C.PEOPLE.map(k => chip(nameOf(k), Math.round(rec.rel[k] || 0))).join('')}</div>
          ${s.burn > burnSeen ? `<p class="cs-warn">${t('burnNote')}</p>` : ''}
          <div class="sc-foot"><button type="button" class="sc-main go" data-a="cont">${t('cont')}</button></div>`;
      } else if (phase === 'prologue') {
        const P = D.prologue, ch = C.chapter(s); say(t('prologueT'));
        b.innerHTML = `<div class="cs-chapter"><span class="e" aria-hidden="true">📖</span><div><small>${t('prologueT')}</small><h3>${esc(X(P.role[s.role]))}</h3><p class="cs-say">${esc(X(P.level[s.level]))}</p></div></div>${ch ? `<div class="cs-chapter sub"><span class="e" aria-hidden="true">${ch.e}</span><div><small>${esc(t('dayN', { n: 1 }))}</small><h3>${esc(X(ch.t))}</h3><p class="cs-say">${esc(X(ch.s))}</p></div></div>` : ''}<div class="sc-foot"><button type="button" class="sc-main go" data-a="cont">${t('beginDay')}</button></div>`;
      } else if (phase === 'day' || phase === 'quarter') {
        const dd = C.day(s), fresh = (dd - 1) % C.DAYS === 0 || C.chapterIdx(dd) !== C.chapterIdx(dd - 1), ch = fresh ? C.chapter(s) : null; say(t('newDay'));
        b.innerHTML = `${phase === 'quarter' ? qrCard() : ''}${recap()}${ch ? `<div class="cs-chapter"><span class="e" aria-hidden="true">${ch.e}</span><div><small>${esc(t('chapterT'))} · ${esc(t('dayN', { n: C.day(s) }))}</small><h3>${esc(X(ch.t))}</h3><p class="cs-say">${esc(X(ch.s))}</p></div></div>` : `<h3>${t('newDay')} · ${esc(t('dayN', { n: C.day(s) }))}</h3>`}<p class="cs-sub">${t('newDaySub')}</p><div class="sc-foot"><button type="button" class="sc-main go" data-a="cont">${t('cont')}</button></div>`;
      } else if (phase === 'end') endScreen(b);
    }
    function qrCard() {
      const r = s.qr; if (!r) return '';
      const cls = r.ok ? 'ok' : 'bad', head = r.ok ? (r.top ? t('qrTop') : t('qrPass')) : t('qrWarn'), sub = r.ok ? (r.top ? t('qrTopSub', { n: s.legacy || 0 }) : t('qrPassSub', { lvl: t('lvl_' + r.to) })) : t('qrWarnSub');
      return `<div class="cs-qr ${cls}"><span class="e" aria-hidden="true">${r.ok ? (r.top ? '🏅' : '🎉') : '⚠️'}</span><div><small>${t('qrT', { q: s.quarters })}</small><h3>${head}</h3><p class="cs-say">${esc(sub)}</p>${r.ok && !r.top ? `<p class="cs-trans"><b>${LICON[r.from]} ${t('lvl_' + r.from)}</b> → <b>${LICON[r.to]} ${t('lvl_' + r.to)}</b></p>` : ''}<small>${t('qrNext')}</small></div></div>`;
    }
    function recap() {
      const d = C.day(s) - 1, t0 = (d - 1) * C.SLOTS, a = s.hist.find(h => h.turn === t0), z = s.hist[s.hist.length - 1]; if (!a || d < 1) return '';
      const ch = C.STATS.map(k => chip(t('s_' + k), Math.round(z.st[k] - a.st[k]))).join('') + C.PEOPLE.map(k => chip(nameOf(k), Math.round(z.rel[k] - a.rel[k]))).join('');
      const picks = s.log.filter(x => x.turn >= t0 && x.turn < t0 + C.SLOTS).map(x => { const e = D.events.find(y => y.id === x.id); return `<li>${esc(sub(X(e.t)))} <small>→ ${esc(sub(X(e.opts[x.opt].t)))}</small></li>`; }).join('');
      return `<div class="cs-recap"><h3>${t('recapT', { n: d })}</h3><p class="cs-sub">${t('recapSub')}</p><div class="cs-chips">${ch}</div>${picks ? `<h4>${t('recapChoices')}</h4><ul>${picks}</ul>` : ''}</div>`;
    }
    function render() { hud(); stats(); agenda(); side(); stage(); box(); }


    /* values radar and the week history, both inline SVG */
    function radar() {
      const pr = C.profile(s), V = C.VALUES, n = V.length, R = 70, cx = 110, cy = 100, pt = (i, r) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
      const ring = k => V.map((_, i) => pt(i, R * k).map(x => x.toFixed(1)).join(',')).join(' ');
      const poly = V.map((v, i) => pt(i, R * (0.12 + 0.88 * pr[v])).map(x => x.toFixed(1)).join(',')).join(' ');
      const labels = V.map((v, i) => { const [x, y] = pt(i, R + 17); return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle">${D.values[v].e}</text>`; }).join('');
      const axes = V.map((_, i) => { const [x, y] = pt(i, R); return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join('');
      const top = V.reduce((a, v) => (pr[v] > pr[a] ? v : a), V[0]);
      return `<div class="cs-viz"><svg viewBox="0 0 220 200" role="img" aria-label="${esc(t('valuesT'))}" class="cs-radar"><g class="grid">${[0.33, 0.66, 1].map(k => `<polygon points="${ring(k)}"/>`).join('')}${axes}</g><polygon class="shape" points="${poly}"/>${labels}</svg>
        <div><p class="cs-top">${t('valTop', { v: esc(X(D.values[top].n)) })}</p><ul class="cs-vals">${V.map(v => `<li><span aria-hidden="true">${D.values[v].e}</span><b>${esc(X(D.values[v].n))}</b><i style="--w:${Math.round(pr[v] * 100)}%"></i><small>${esc(X(D.values[v].d))}</small></li>`).join('')}</ul></div></div>`;
    }
    function history() {
      const H = s.hist || [], W = 300, Ht = 120, n = Math.max(2, H.length), x = i => 8 + i * (W - 16) / (n - 1), y = v => Ht - 8 - v / 100 * (Ht - 16);
      const lines = ['perf', 'rep', 'integ', 'skill'].map((k, j) => `<polyline class="l${j}" pathLength="1" style="animation:cs-draw 1.2s ease-out ${j * 0.15}s forwards" points="${H.map((h, i) => x(i).toFixed(1) + ',' + y(h.st[k]).toFixed(1)).join(' ')}"/>`).join('');
      const leg = ['perf', 'rep', 'integ', 'skill'].map((k, j) => `<span class="l${j}">${SICON[k]} ${t('s_' + k)}</span>`).join('');
      return `<svg viewBox="0 0 ${W} ${Ht}" class="cs-hist" role="img" aria-label="${esc(t('histT'))}"><g class="grid"><line x1="8" x2="${W - 8}" y1="${y(50)}" y2="${y(50)}"/><line x1="8" x2="${W - 8}" y1="${y(20)}" y2="${y(20)}" class="danger"/></g>${lines}</svg><div class="cs-leg">${leg}</div>`;
    }

    function endScreen(b) {
      const o = s.over, sc = scored, conc = [...new Set(s.log.map(x => (D.events.find(e => e.id === x.id) || {}).c).filter(Boolean))], bar = C.barOf(s);
      say(t('srEnd', { e: t('end_' + o) }));
      const barRows = Object.keys(bar).map(k => { const v = s.st[k] !== undefined ? s.st[k] : s.rel[k], ok = v >= bar[k]; return `<li class="${ok ? 'ok' : 'no'}"><span aria-hidden="true">${ok ? '✓' : '✗'}</span>${t('s_' + k)}: ${Math.round(v)} / ${bar[k]}</li>`; }).join('');
      const logRows = s.log.map(x => { const e = D.events.find(y => y.id === x.id), op = e.opts[x.opt]; return `<li><b>${esc(sub(X(e.t)))}</b><span>${esc(sub(X(op.t)))}${x.branch ? ` · <em class="${x.branch}">${t(x.branch === 'ok' ? 'gambleOk' : 'gambleBad')}</em>` : ''}</span></li>`; }).join('');
      b.innerHTML = `<div class="cs-end ${o.startsWith('fired') || o === 'burnout' ? 'lost' : 'won'}"><h2>${t('end_' + o)}</h2><p>${t('end_' + o + '_d')}</p>
        <div class="sc-big"><span class="sc-st" aria-label="${esc(t('stars', { n: sc.stars }))}">${[0, 1, 2].map(i => `<b class="${i < sc.stars ? 'on' : ''}" style="--i:${i}">★</b>`).join('')}</span><em class="sc-xpg">${t('xpGain', { n: sc.xp })}</em></div>
        <p class="cs-goalres ${sc.goalDone ? 'ok' : ''}">${GICON2[s.goal]} <b>${t('gl_' + s.goal)}</b> — ${sc.goalDone ? t('goalDone') : t('goalMiss')}</p>
        <h3>${t('valuesT')}</h3>${radar()}
        <h3>${t('histT')}</h3>${history()}
        <p class="cs-career">${LICON[s.level]} <b>${t('lvl_' + s.level)}</b> · ${t('careerLine', { d: C.day(s), q: s.quarters, p: s.promos })}</p>
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
      if (act === 'role') { sel.role = v; menu(); } else if (act === 'level') { sel.level = v; menu(); } else if (act === 'trait') { sel.trait = v; menu(); } else if (act === 'goal') { sel.goal = v; menu(); } else if (act === 'start' || act === 'again') start(); else if (act === 'menu') menu();
      else if (act === 'retire' && phase === 'move') { if (!retireArm) { retireArm = true; render(); } else { retireArm = false; C.retire(s); finish(); } }
      else if (act === 'loc' && phase === 'move') { retireArm = false; ev = C.visit(s, v); rec = null; pick = -1; phase = 'event'; render(); }
      else if (act === 'opt' && phase === 'event') { pick = +a.dataset.i; burnSeen = s.burn; rec = C.choose(s, ev, pick); phase = 'result'; render(); if (rec.branch === 'bad') { const g = $('#csStage'); g.classList.remove('shake'); void g.offsetWidth; g.classList.add('shake'); } sfx((rec.fx.integ || 0) < 0 ? 'lose' : 'tick'); }
      else if (act === 'cont' && (phase === 'result' || phase === 'day' || phase === 'prologue' || phase === 'quarter')) {
        if ((phase === 'day' || phase === 'quarter') && (C.day(s) - 1) % C.DAYS === C.MID && s.flags.reviewed !== C.day(s)) { s.flags.reviewed = C.day(s); ev = C.review(s); rec = null; pick = -1; phase = 'event'; render(); return; }
        if (phase === 'day' || phase === 'prologue' || phase === 'quarter') { phase = 'move'; render(); return; }
        if (ev && ev.free) { phase = 'move'; render(); return; }
        const r = C.next(s); if (r === 'end') finish(); else if (r === 'day' || r === 'quarter') { phase = r; render(); try { $('#csBox').scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (e) {} } else { phase = 'move'; render(); }
      }
    });
    menu();
    this._cs = { relabel() { if (phase === 'menu') menu(); else render(); } };
  },
  onLang() { const m = this._cs; if (m) m.relabel(); }
});
