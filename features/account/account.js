/* Account feature: Google and email/password sign-in through Supabase, profile, cloud progress and history.
   Hidden unless data/config.js has supabaseUrl + supabaseKey. Guests keep working with device-only storage.
   Public API (used by simulations): MBALAB.account.user() / pull(sim) / push(sim, data) / attempt(sim, rowOrRows).
   Event: MBALAB.on('auth', user|null). Database: supabase/schema.sql (row level security, one user sees only their rows). */
MBALAB.feature('account', () => {
  const C = window.MBALAB_CONFIG || {};
  if (!C.supabaseUrl || !C.supabaseKey) return;
  const LIB = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let sb = null, session = null, allowed = null, checking = false, sync = 'idle', hist = null, histErr = false, msg = '', syncedAt = 0;
  const timers = {}, pending = {};

  const me = () => {
    const u = session && session.user; if (!u) return null;
    const m = u.user_metadata || {};
    return { id: u.id, email: u.email || '', name: m.full_name || m.name || (u.email || '').split('@')[0], avatar: m.avatar_url || m.picture || '' };
  };
  const ready = () => !!(sb && session && allowed === true);

  /* ---------- UI ---------- */
  const button = MBALAB.ui.html(
    '<button id="acct" class="pill" type="button" aria-haspopup="dialog" data-action="open-account" data-sfx="open" data-ia="aria-label=acctAria,title=acctAria">' +
    '<span class="acct-av" id="acctAv" aria-hidden="true">👤</span><span class="lb" id="acctLb"></span></button>');
  MBALAB.ui.nav(button, 45);
  const dlg = MBALAB.ui.html(
    '<div class="ov" id="acctDlg" role="dialog" aria-modal="true" aria-labelledby="acctT"><div class="mw dlgw acct-dlg">' +
    '<div class="row" style="justify-content:space-between;margin:0"><h3 id="acctT"></h3><button type="button" data-close data-sfx="close" data-ia="aria-label=close">✕</button></div>' +
    '<div id="acctBody"></div></div></div>');
  MBALAB.ui.dialog(dlg); MBALAB.overlay.register(dlg);

  const fmt = at => { try { return new Date(at).toLocaleString(MBALAB.i18n.get(), { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } };
  const simName = id => { const s = (MBALAB.data.simulations || []).find(x => x.id === id); return s ? tr(s.name) : id; };

  function paintButton() {
    const u = me(), av = $('acctAv');
    $('acctLb').textContent = u && allowed === true ? t('acctProf') : t('acctIn');
    av.innerHTML = u && allowed === true && u.avatar ? '<img alt="" referrerpolicy="no-referrer" src="' + esc(u.avatar) + '">' : '👤';
  }
  const initial = u => esc((u.name || u.email || '?').trim().charAt(0).toUpperCase());
  const avatar = (u, cls) => u.avatar ? '<img class="' + cls + '" alt="" referrerpolicy="no-referrer" src="' + esc(u.avatar) + '">' : '<span class="' + cls + ' ph" aria-hidden="true">' + initial(u) + '</span>';
  function paintDialog() {
    $('acctT').textContent = t('acctTitle');
    const u = me(), body = $('acctBody');
    if (u && recovering) {
      body.innerHTML = '<form class="acct-form" data-acct-form="newpw" novalidate><p>' + esc(t('acctNewPass')) + '</p>' + (msg ? '<p class="acct-st ' + (msgOk ? 'ok' : 'err') + '">' + esc(msg) + '</p>' : '') +
        '<input type="password" name="p" autocomplete="new-password" minlength="8" placeholder="' + esc(t('acctPass')) + '" aria-label="' + esc(t('acctPass')) + '">' +
        '<button type="submit" class="acct-go"' + (busy ? ' disabled' : '') + '>' + esc(t('acctSetPass')) + '</button></form>';
      return;
    }
    if (!u) {
      const up = amode === 'up', rs = amode === 'reset';
      const perks = '<ul class="acct-perks"><li><span>☁️</span>' + esc(t('acctPerk1')) + '</li><li><span>🏆</span>' + esc(t('acctPerk2')) + '</li><li><span>🎓</span>' + esc(t('acctPerk3')) + '</li></ul>';
      const seg = rs ? '' : '<div class="acct-seg" role="tablist">' + [['in', 'acctSignIn'], ['up', 'acctSignUp']].map(a => '<button type="button" role="tab" aria-selected="' + ((a[0] === 'up') === up) + '" data-acct="mode" data-m="' + a[0] + '">' + esc(t(a[1])) + '</button>').join('') + '</div>';
      body.innerHTML = '<p class="acct-lead">' + esc(t('acctIntro')) + '</p>' + perks +
        '<button type="button" class="acct-google" data-acct="in" data-sfx="click"><svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.9-6.2A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.2z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.2C6.5 42.6 14.6 48 24 48z"/></svg><span>' + esc(t('acctGoogle')) + '</span></button>' +
        '<div class="acct-or"><span>' + esc(t('acctOrMail')) + '</span></div>' + seg +
        (msg ? '<p class="acct-st ' + (msgOk ? 'ok' : 'err') + '" role="status">' + esc(msg) + '</p>' : '') +
        '<form class="acct-form" data-acct-form="' + amode + '" novalidate>' +
        '<input type="email" name="e" autocomplete="email" inputmode="email" placeholder="' + esc(t('acctEmail')) + '" aria-label="' + esc(t('acctEmail')) + '">' +
        (rs ? '' : '<div class="acct-pw"><input type="password" name="p" autocomplete="' + (up ? 'new-password' : 'current-password') + '" placeholder="' + esc(t('acctPass')) + '" aria-label="' + esc(t('acctPass')) + '"><button type="button" data-acct="pw" aria-label="' + esc(t('acctShowPw')) + '" title="' + esc(t('acctShowPw')) + '">👁</button></div>') +
        '<button type="submit" class="acct-go"' + (busy ? ' disabled' : '') + '>' + esc(t(rs ? 'acctSendReset' : up ? 'acctSignUp' : 'acctSignIn')) + '</button></form>' +
        '<div class="acct-links">' + (rs ? '<button type="button" data-acct="mode" data-m="in">' + esc(t('acctBack')) + '</button>' : up ? '' : '<button type="button" data-acct="mode" data-m="reset">' + esc(t('acctForgot')) + '</button>') + '</div>' +
        '<p class="acct-note">' + esc(t('acctPriv')) + '</p>';
      return;
    }
    if (allowed === null) { body.innerHTML = '<div class="acct-hero">' + avatar(u, 'acct-bigav') + '<div class="acct-id"><b>' + esc(u.name) + '</b><small>' + esc(u.email) + '</small></div></div><p class="acct-st">' + esc(t('acctCheck')) + '</p>'; return; }
    if (allowed === false) { body.innerHTML = '<div class="acct-hero">' + avatar(u, 'acct-bigav') + '<div class="acct-id"><b>' + esc(u.name) + '</b><small>' + esc(u.email) + '</small></div></div><p class="acct-st err">' + esc(t(setupErr ? 'acctSetup' : 'acctDenied')) + '</p><div class="acct-act"><button type="button" data-acct="out">' + esc(t('acctOut')) + '</button></div>'; return; }
    const stTxt = sync === 'busy' ? t('acctSyncing') : sync === 'err' ? t('acctSyncErr') : t('acctSynced') + (syncedAt ? ' · ' + fmt(syncedAt) : '');
    const shown = (prof && prof.display_name) || u.name;
    const H = hist || [], sims = new Set(H.map(h => h.sim)).size, best = H.reduce((m, h) => h.score == null ? m : Math.max(m, h.score), 0);
    const pass = MBALAB.passport ? MBALAB.passport.count() : 0;
    const stat = (v, k) => '<div class="acct-stat"><b>' + esc(v) + '</b><span>' + esc(t(k)) + '</span></div>';
    const hero = '<div class="acct-hero">' + avatar(u, 'acct-bigav') + '<div class="acct-id"><b>' + esc(shown) + '</b><small>' + esc(u.email) + '</small>' +
      '<span class="acct-sync ' + sync + '" role="status"><i></i>' + esc(stTxt) + '</span></div></div>';
    const TABS = [['me', 'acctTabMe', '🏠'], ['hist', 'acctHist', '🕘'], ['board', 'acctTabBoard', '🏆'], ['set', 'acctTabSet', '⚙️']];
    const tabs = '<div class="acct-tabs" role="tablist">' + TABS.map(k => '<button type="button" role="tab" aria-selected="' + (tab === k[0]) + '" data-acct="tab" data-tab="' + k[0] + '"><span aria-hidden="true">' + k[2] + '</span> ' + esc(t(k[1])) + '</button>').join('') + '</div>';
    const histList = hist === null ? (histErr ? '<p class="acct-st err">' + esc(t('acctLoadErr')) + '</p>' : '<p class="acct-st">…</p>') :
      !hist.length ? '<div class="acct-empty"><span>🎮</span><p>' + esc(t('acctNoHist')) + '</p></div>' :
        '<ul class="acct-hist">' + hist.map(h => '<li><span><b>' + esc(simName(h.sim)) + '</b>' + (h.variant ? ' · ' + esc(h.variant) : '') + '<small>' + esc(fmt(h.at)) + '</small></span><span class="sc">' + (h.score == null ? '' : Math.round(h.score) + '%') + '</span></li>').join('') + '</ul>';
    let main = '';
    if (tab === 'board') {
      const bs = (MBALAB.data.simulations || []).filter(x => x.status === 'live' && x.id !== 'smart-decision-studio' && x.id !== 'disc-crisis-room');
      const sel = '<label class="acct-sel">' + esc(t('acctBoardFor')) + ' <select data-acct="bsim"><option value="">' + esc(t('acctAllSims')) + '</option>' +
        bs.map(x => '<option value="' + esc(x.id) + '"' + (boardSim === x.id ? ' selected' : '') + '>' + esc(simName(x.id)) + '</option>').join('') + '</select></label>';
      const medal = r => r == 1 ? '🥇' : r == 2 ? '🥈' : r == 3 ? '🥉' : esc(r);
      const rows = board === null ? (boardErr ? '<p class="acct-st err">' + esc(t('acctLoadErr')) + '</p>' : '<p class="acct-st">…</p>') :
        !board.length ? '<div class="acct-empty"><span>🏆</span><p>' + esc(t('acctNoBoard')) + '</p></div>' :
          '<ol class="acct-board">' + board.map(r => '<li class="' + (r.is_me ? 'me' : '') + '"><span class="rk">' + medal(r.rank) + '</span><span class="nm">' + esc(r.name) + '</span><span class="pt">' + esc(r.points) + ' <small>' + esc(t('acctPts')) + '</small></span></li>').join('') + '</ol>';
      main = sel + rows + '<p class="acct-note">' + esc(t('acctBoardHow')) + '</p>' + (prof && !prof.show_on_board ? '<p class="acct-note acct-warn">' + esc(t('acctNotShown')) + '</p>' : '');
    } else if (tab === 'hist') {
      main = histList;
    } else if (tab === 'set') {
      main = (prof ? '<div class="acct-card"><h4>' + esc(t('acctBoardSet')) + '</h4><label class="acct-chk"><input type="checkbox" data-acct="show"' + (prof.show_on_board ? ' checked' : '') + '> ' + esc(t('acctShow')) + '</label>' +
        '<div class="acct-row"><input type="text" maxlength="24" data-acct="dname" placeholder="' + esc(t('acctDname')) + '" value="' + esc(prof.display_name || '') + '" aria-label="' + esc(t('acctDname')) + '"><button type="button" data-acct="savep">' + esc(t('acctSave')) + '</button></div></div>' : '') +
        '<div class="acct-card"><p class="acct-note" style="margin:0">' + esc(t('acctPriv')) + '</p></div>' +
        '<div class="acct-act"><button type="button" class="acct-outbtn" data-acct="out" data-sfx="click">' + esc(t('acctOut')) + '</button></div>' +
        '<details class="acct-danger"><summary>' + esc(t('acctDanger')) + '</summary><p class="acct-note">' + esc(t('acctDangerTxt')) + '</p><button type="button" class="acct-del" data-acct="del">' + esc(t('acctDel')) + '</button></details>';
    } else {
      main = '<div class="acct-stats">' + stat(H.length, 'acctStatPlays') + stat(sims, 'acctStatSims') + stat(best ? Math.round(best) + '%' : '–', 'acctStatBest') + stat(pass, 'acctStatPass') + '</div>' +
        '<h4>' + esc(t('acctRecent')) + '</h4>' + (hist && hist.length ? '<ul class="acct-hist">' + hist.slice(0, 4).map(h => '<li><span><b>' + esc(simName(h.sim)) + '</b>' + (h.variant ? ' · ' + esc(h.variant) : '') + '<small>' + esc(fmt(h.at)) + '</small></span><span class="sc">' + (h.score == null ? '' : Math.round(h.score) + '%') + '</span></li>').join('') + '</ul>' : histList);
    }
    body.innerHTML = hero + tabs + '<div class="acct-pane" role="tabpanel">' + main + '</div>';
  }
  const paint = () => { paintButton(); paintDialog(); };

  async function loadHist() {
    if (!ready()) return;
    hist = null; histErr = false; paintDialog();
    const r = await sb.from('attempts').select('sim,variant,at,score').order('at', { ascending: false }).limit(30);
    if (r.error) histErr = true; else hist = r.data || [];
    paintDialog();
  }

  /* ---------- session ---------- */
  async function setSession(s) {
    const prev = ready() ? me().id : null;
    session = s; allowed = null; setupErr = false; hist = null; msg = '';
    if (!s) { paint(); if (prev) MBALAB.emit('auth', null); return; }
    paint();
    checking = true;
    try {
      const r = await sb.rpc('is_allowed');
      allowed = r.error ? false : r.data === true; setupErr = !!r.error;
      if (r.error) console.error('[account] is_allowed failed (did you run supabase/schema.sql?)', r.error.message);
    } catch (e) { allowed = false; }
    checking = false;
    paint();
    if (allowed) { MBALAB.emit('auth', me()); loadProf(); if (dlg.classList.contains('on')) { loadHist(); if (tab === 'board') loadBoard(); } }
  }

  /* ---------- cloud data (used by simulations) ---------- */
  const api = MBALAB.account = {
    user: () => (ready() ? me() : null),
    async pull(sim) {
      if (!ready()) return null;
      const r = await sb.from('user_state').select('data').eq('sim', sim).maybeSingle();
      if (r.error) { sync = 'err'; paintDialog(); return null; }
      return r.data ? r.data.data : null;
    },
    push(sim, data) {   /* debounced: the latest value per simulation wins */
      if (!ready()) return;
      pending[sim] = data; sync = 'busy'; paintDialog();
      clearTimeout(timers[sim]);
      timers[sim] = setTimeout(async () => {
        const d = pending[sim]; delete pending[sim];
        const r = await sb.from('user_state').upsert({ user_id: session.user.id, sim, data: d, updated_at: new Date().toISOString() }, { onConflict: 'user_id,sim' });
        if (r.error) sync = 'err'; else { sync = 'ok'; syncedAt = Date.now(); }
        paintDialog();
      }, 700);
    },
    async attempt(sim, rows) {   /* idempotent: the same (user, sim, time) is stored once */
      if (!ready()) return;
      const list = (Array.isArray(rows) ? rows : [rows]).filter(r => r && r.at).map(r => ({ user_id: session.user.id, sim, at: new Date(r.at).toISOString(), score: r.score == null ? null : Math.max(0, Math.min(100, Math.round(r.score * 10) / 10)), variant: r.variant == null ? '' : String(r.variant), ranked: r.ranked !== false, detail: r.detail || {} }));
      if (!list.length) return;
      const r = await sb.from('attempts').upsert(list, { onConflict: 'user_id,sim,at', ignoreDuplicates: true });
      if (r.error) { sync = 'err'; paintDialog(); } else if (dlg.classList.contains('on')) loadHist();
    }
  };

  /* MBALAB.cloud(sim, {read, write, merge, refresh}): keeps one simulation's progress in sync with the account.
     read() -> JSON of what is saved on this device; write(json) stores the merged result locally; merge(local, remote) -> json. */
  MBALAB.cloud = (sim, o) => {
    const run = async () => {
      if (!ready()) return;
      try {
        const remote = await api.pull(sim), merged = o.merge(o.read(), remote);
        o.write(merged); api.push(sim, merged); o.refresh && o.refresh();
      } catch (e) { console.error('[account] sync failed for ' + sim, e); }
    };
    MBALAB.on('auth', u => { if (u) run(); });
    run();
    return { changed() { if (ready()) api.push(sim, o.read()); }, attempt(row) { api.attempt(sim, row); } };
  };

  /* ---------- leaderboard + board profile ---------- */
  let amode = 'in', msgOk = false, busy = false, recovering = false, setupErr = false, tab = 'me', board = null, boardErr = false, boardSim = '', prof = null;
  async function loadBoard() {
    if (!ready()) return;
    board = null; boardErr = false; paintDialog();
    const r = await sb.rpc('leaderboard', { p_sim: boardSim || null, p_limit: 20 });
    if (r.error) boardErr = true; else board = r.data || [];
    paintDialog();
  }
  async function loadProf() {
    if (!ready()) return;
    const r = await sb.from('profiles').select('display_name,show_on_board,name').eq('id', session.user.id).maybeSingle();
    prof = r.data || { display_name: '', show_on_board: false }; paintDialog();
  }

  /* ---------- actions ---------- */
  MBALAB.actions['open-account'] = () => { MBALAB.overlay.open(dlg); paintDialog(); if (ready()) { loadHist(); loadProf(); if (tab === 'board') loadBoard(); } };
  dlg.addEventListener('click', async e => {
    const b = e.target.closest('[data-acct]'); if (!b || !sb) return;
    const act = b.dataset.acct;
    if (act === 'in') {
      msg = '';
      const r = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname, queryParams: { prompt: 'select_account' } } });
      if (r.error) { msg = t('acctSignErr'); paintDialog(); }
    } else if (act === 'pw') { const i = b.parentNode.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; return;
    } else if (act === 'mode') { amode = b.dataset.m; msg = ''; paintDialog();
    } else if (act === 'tab') { tab = b.dataset.tab; paintDialog(); if (tab === 'board') loadBoard(); if (tab === 'hist' && hist === null) loadHist();
    } else if (act === 'savep' && ready()) {
      const name = dlg.querySelector('[data-acct=dname]').value.trim().slice(0, 24), show = dlg.querySelector('[data-acct=show]').checked;
      const r = await sb.from('profiles').update({ display_name: name, show_on_board: show }).eq('id', session.user.id);
      if (!r.error) { prof = { display_name: name, show_on_board: show }; sync = 'ok'; syncedAt = Date.now(); b.textContent = '✓ ' + t('acctSaved'); setTimeout(paintDialog, 1200); return; } else sync = 'err';
      paintDialog();
    } else if (act === 'out') {
      await sb.auth.signOut();
    } else if (act === 'del' && confirm(t('acctDelAsk'))) {
      const r = await sb.rpc('delete_my_account');
      if (r.error) { sync = 'err'; paintDialog(); return; }
      await sb.auth.signOut().catch(() => {});
    }
  });
  dlg.addEventListener('submit', async e => {
    const f = e.target.closest('[data-acct-form]'); if (!f || !sb) return;
    e.preventDefault(); if (busy) return;
    const kind = f.dataset.acctForm, em = f.elements.e ? f.elements.e.value.trim() : '', pw = f.elements.p ? f.elements.p.value : '';
    msg = ''; msgOk = false;
    const bad = k => { msg = t(k); paintDialog(); };
    if (kind !== 'newpw' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return bad('acctBadEmail');
    if ((kind === 'up' || kind === 'newpw') && pw.length < 8) return bad('acctPassShort');
    if (kind === 'in' && !pw) return bad('acctBadLogin');
    busy = true; paintDialog();
    try {
      const back = location.origin + location.pathname;
      if (kind === 'in') {
        const r = await sb.auth.signInWithPassword({ email: em, password: pw });
        if (r.error) msg = /confirm/i.test(r.error.message) ? t('acctNeedConfirm') : t('acctBadLogin');
      } else if (kind === 'up') {
        const r = await sb.auth.signUp({ email: em, password: pw, options: { emailRedirectTo: back } });
        if (r.error) msg = r.error.message || t('acctSignErr');
        else if (!r.data.session) { msg = t('acctCheckMail'); msgOk = true; amode = 'in'; }
      } else if (kind === 'reset') {
        const r = await sb.auth.resetPasswordForEmail(em, { redirectTo: back });
        if (r.error) msg = t('acctSignErr'); else { msg = t('acctResetSent'); msgOk = true; amode = 'in'; }
      } else if (kind === 'newpw') {
        const r = await sb.auth.updateUser({ password: pw });
        if (r.error) msg = r.error.message || t('acctSignErr'); else { recovering = false; msg = ''; }
      }
    } catch (err) { msg = t('acctSignErr'); }
    busy = false; paint();
  });
  dlg.addEventListener('change', e => { const el = e.target.closest('[data-acct=bsim]'); if (el) { boardSim = el.value; loadBoard(); } });
  MBALAB.on('lang', paint);
  paint();

  /* ---------- start ---------- */
  MBALAB.load.scripts([LIB]).then(() => {
    sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, { auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    /* never await Supabase calls inside this callback (it would block the auth lock): hand over to a timer */
    sb.auth.onAuthStateChange((ev, s) => { if (ev === 'PASSWORD_RECOVERY') { recovering = true; setTimeout(() => MBALAB.actions['open-account'](), 0); } if (ev === 'SIGNED_OUT') recovering = false; setTimeout(() => setSession(s), 0); });
  }).catch(err => { console.error('[account] Supabase library did not load', err); button.style.display = 'none'; });
});
