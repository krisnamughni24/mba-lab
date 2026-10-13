/* Account feature: Google sign-in through Supabase, profile, cloud progress and history.
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
    $('acctLb').textContent = u && allowed === true ? u.name.split(' ')[0] : t('acctIn');
    av.innerHTML = u && allowed === true && u.avatar ? '<img alt="" referrerpolicy="no-referrer" src="' + esc(u.avatar) + '">' : '👤';
  }
  function paintDialog() {
    $('acctT').textContent = t('acctTitle');
    const u = me(), body = $('acctBody');
    if (!u) {
      body.innerHTML = '<p>' + esc(t('acctIntro')) + '</p>' + (msg ? '<p class="acct-st err">' + esc(msg) + '</p>' : '') +
        '<div class="acct-act"><button type="button" class="acct-go" data-acct="in" data-sfx="click">' + esc(t('acctGoogle')) + '</button></div><p class="acct-note">' + esc(t('acctPriv')) + '</p>';
      return;
    }
    const who = '<div class="acct-who">' + (u.avatar ? '<img alt="" referrerpolicy="no-referrer" src="' + esc(u.avatar) + '">' : '<div class="acct-ph">👤</div>') +
      '<div><small>' + esc(t('acctSignedAs')) + '</small><b>' + esc(u.name) + '</b><small>' + esc(u.email) + '</small></div></div>';
    if (allowed === null) { body.innerHTML = who + '<p class="acct-st">' + esc(t('acctCheck')) + '</p>'; return; }
    if (allowed === false) { body.innerHTML = who + '<p class="acct-st err">' + esc(t('acctDenied')) + '</p><div class="acct-act"><button type="button" data-acct="out">' + esc(t('acctOut')) + '</button></div>'; return; }
    const stTxt = sync === 'busy' ? t('acctSyncing') : sync === 'err' ? t('acctSyncErr') : t('acctSynced') + (syncedAt ? ' · ' + fmt(syncedAt) : '');
    const list = hist === null ? (histErr ? '<p class="acct-st err">' + esc(t('acctLoadErr')) + '</p>' : '<p class="acct-st">…</p>') :
      !hist.length ? '<p class="acct-note">' + esc(t('acctNoHist')) + '</p>' :
        '<ul class="acct-hist">' + hist.map(h => '<li><span>' + esc(simName(h.sim)) + ' · ' + esc(fmt(h.at)) + '</span><span>' + (h.score == null ? '' : Math.round(h.score) + '%') + (h.detail && h.detail.t ? ' (' + esc(h.detail.c) + '/' + esc(h.detail.t) + ')' : '') + '</span></li>').join('') + '</ul>';
    body.innerHTML = who + '<p class="acct-st ' + (sync === 'err' ? 'err' : 'ok') + '">' + esc(stTxt) + '</p>' +
      '<h4>' + esc(t('acctHist')) + '</h4>' + list + '<p class="acct-note">' + esc(t('acctPriv')) + '</p>' +
      '<div class="acct-act"><button type="button" data-acct="out">' + esc(t('acctOut')) + '</button><button type="button" class="acct-del" data-acct="del">' + esc(t('acctDel')) + '</button></div>';
  }
  const paint = () => { paintButton(); paintDialog(); };

  async function loadHist() {
    if (!ready()) return;
    hist = null; histErr = false; paintDialog();
    const r = await sb.from('attempts').select('sim,at,score,detail').order('at', { ascending: false }).limit(30);
    if (r.error) histErr = true; else hist = r.data || [];
    paintDialog();
  }

  /* ---------- session ---------- */
  async function setSession(s) {
    const prev = ready() ? me().id : null;
    session = s; allowed = null; hist = null; msg = '';
    if (!s) { paint(); if (prev) MBALAB.emit('auth', null); return; }
    paint();
    checking = true;
    try {
      const r = await sb.rpc('is_allowed');
      allowed = r.error ? false : r.data === true;
      if (r.error) console.error('[account] is_allowed failed (did you run supabase/schema.sql?)', r.error.message);
    } catch (e) { allowed = false; }
    checking = false;
    paint();
    if (allowed) { MBALAB.emit('auth', me()); if (dlg.classList.contains('on')) loadHist(); }
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
      const list = (Array.isArray(rows) ? rows : [rows]).filter(r => r && r.at).map(r => ({ user_id: session.user.id, sim, at: new Date(r.at).toISOString(), score: r.score == null ? null : r.score, detail: r.detail || {} }));
      if (!list.length) return;
      const r = await sb.from('attempts').upsert(list, { onConflict: 'user_id,sim,at', ignoreDuplicates: true });
      if (r.error) { sync = 'err'; paintDialog(); } else if (dlg.classList.contains('on')) loadHist();
    }
  };

  /* ---------- actions ---------- */
  MBALAB.actions['open-account'] = () => { MBALAB.overlay.open(dlg); paintDialog(); if (ready()) loadHist(); };
  dlg.addEventListener('click', async e => {
    const b = e.target.closest('[data-acct]'); if (!b || !sb) return;
    const act = b.dataset.acct;
    if (act === 'in') {
      msg = '';
      const r = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname, queryParams: { prompt: 'select_account' } } });
      if (r.error) { msg = t('acctSignErr'); paintDialog(); }
    } else if (act === 'out') {
      await sb.auth.signOut();
    } else if (act === 'del' && confirm(t('acctDelAsk'))) {
      const r = await sb.rpc('delete_my_account');
      if (r.error) { sync = 'err'; paintDialog(); return; }
      await sb.auth.signOut().catch(() => {});
    }
  });
  MBALAB.on('lang', paint);
  paint();

  /* ---------- start ---------- */
  MBALAB.load.scripts([LIB]).then(() => {
    sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, { auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    /* never await Supabase calls inside this callback (it would block the auth lock): hand over to a timer */
    sb.auth.onAuthStateChange((ev, s) => { setTimeout(() => setSession(s), 0); });
  }).catch(err => { console.error('[account] Supabase library did not load', err); button.style.display = 'none'; });
});
