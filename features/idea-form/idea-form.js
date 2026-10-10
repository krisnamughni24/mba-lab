/* Idea form feature: the "Share an idea" window, validation and submission.
   Texts, fields and submission types come from data/idea-form.js; delivery is configured in data/config.js.
   Success is only reported after the receiving service confirms it. */
MBALAB.feature('idea-form', () => {
  const F = MBALAB.data.ideaForm, bind = MBALAB.i18n.bind;

  const dialog = MBALAB.ui.html(
    '<div class="ov" id="ideaDlg" role="dialog" aria-modal="true" aria-labelledby="ideaT"><div class="mw dlgw">' +
    '<div class="row" style="justify-content:space-between;margin:0"><h3 id="ideaT"></h3>' +
    '<button type="button" data-close data-sfx="close" data-ia="aria-label=close">✕</button></div>' +
    '<p id="ideaIntro"></p><p class="note unav" id="ideaCfg" role="status"></p>' +
    '<form id="ideaForm" novalidate>' +
    '<input type="text" id="fBot" name="botcheck" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
    '<div class="fld"><label for="fName" id="lName"></label><input id="fName" name="name" type="text" autocomplete="name" aria-describedby="eName"><div class="err" id="eName"></div></div>' +
    '<div class="fld"><label for="fEmail" id="lEmail"></label><input id="fEmail" name="email" type="email" autocomplete="email" aria-describedby="eEmail"><div class="err" id="eEmail"></div></div>' +
    '<div class="fld"><label for="fType" id="lType"></label><select id="fType" name="type" aria-describedby="eType"></select><div class="err" id="eType"></div></div>' +
    '<div class="fld"><label for="fSubject" id="lSubject"></label><input id="fSubject" name="subject" type="text" aria-describedby="eSubject"><div class="err" id="eSubject"></div></div>' +
    '<div class="fld"><label for="fMessage" id="lMessage"></label><textarea id="fMessage" name="message" rows="5" aria-describedby="eMessage"></textarea><div class="err" id="eMessage"></div></div>' +
    '<h4 id="privH"></h4><p class="note" id="privText"></p>' +
    '<div class="row"><button id="fSubmit" class="sbm" type="submit"></button><span id="fStatus" role="status" aria-live="polite"></span></div>' +
    '</form></div></div>');
  MBALAB.ui.dialog(dialog);
  MBALAB.overlay.register(dialog);

  /* texts */
  bind($('ideaT'), () => tr(F.title));
  bind($('ideaIntro'), () => tr(F.intro));
  bind($('privH'), () => tr(F.privacyTitle));
  bind($('privText'), () => tr(F.privacy));
  bind($('fSubmit'), () => tr(F.submit));
  const FIELD = { name: ['lName', 'fName'], email: ['lEmail', 'fEmail'], type: ['lType', 'fType'], subject: ['lSubject', 'fSubject'], message: ['lMessage', 'fMessage'] };
  Object.keys(FIELD).forEach(k => {
    bind($(FIELD[k][0]), () => tr(F.fields[k].label));
    if (F.fields[k].required) $(FIELD[k][1]).setAttribute('required', '');
  });
  const select = $('fType');
  const placeholder = document.createElement('option');
  placeholder.value = ''; placeholder.selected = true; placeholder.disabled = true;
  select.appendChild(placeholder);
  bind(placeholder, () => tr(F.selectPlaceholder));
  F.types.forEach(type => {
    const o = document.createElement('option');
    o.value = type.value; select.appendChild(o);
    bind(o, () => tr(type.label));
  });

  /* validation (rules come from data/idea-form.js) */
  const FF = { name: $('fName'), email: $('fEmail'), type: $('fType'), subject: $('fSubject'), message: $('fMessage') };
  const FE = { name: 'eName', email: 'eEmail', type: 'eType', subject: 'eSubject', message: 'eMessage' };
  const MSG = { name: 'vName', email: 'vEmail0', type: 'vType', subject: 'vSubject', message: 'vMessage' };
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const rule = (k, value) => {
    const f = F.fields[k], v = (value || '').trim();
    if (!v) return f.required ? t(MSG[k]) : '';
    if (k === 'email' && !EMAIL.test(v)) return t('vEmail1');
    if (f.min && v.length < f.min) return t(MSG[k]);
    return '';
  };
  const check = k => {
    const msg = rule(k, FF[k].value);
    $(FE[k]).textContent = msg;
    FF[k].setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };
  const invalid = k => FF[k].getAttribute('aria-invalid') === 'true';
  Object.keys(FF).forEach(k => {
    FF[k].addEventListener('blur', () => { if (FF[k].value || invalid(k)) check(k); });
    FF[k].addEventListener('input', () => { if (invalid(k)) check(k); });
    FF[k].addEventListener('change', () => { if (invalid(k)) check(k); });
  });

  const setStatus = (msg, kind) => {
    const s = $('fStatus');
    s.textContent = msg; s.className = kind || '';
    if (MBALAB.audio) { if (kind === 'ok') MBALAB.audio.play('ok'); else if (kind === 'err') MBALAB.audio.play('err'); }
  };
  const configured = () => !!(window.MBALAB_CONFIG && MBALAB_CONFIG.formEndpoint);
  const refreshNotice = () => { $('ideaCfg').textContent = configured() ? '' : t('errUnavail'); };

  /* delivery: see data/config.js and docs/FORM-SETUP-GOOGLE-DRIVE.md */
  const deliver = async d => {
    const C = window.MBALAB_CONFIG || {};
    if (!C.formEndpoint) { const e = new Error(t('errUnavail')); e.unavail = true; throw e; }
    const subject = '[MBA Lab] ' + d.type + ': ' + d.subject;
    let init;
    if (C.formTransport === 'apps-script') {
      /* Google Apps Script web app: text/plain avoids a CORS preflight; the script answers {ok:true} */
      init = { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(Object.assign({}, C.formFields || {}, d)) };
    } else {
      /* generic JSON services (Web3Forms, Formspree, ...); formFields holds their static fields such as access_key */
      init = { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.assign({}, C.formFields || {}, { name: d.name || '(not provided)', from_name: d.name || 'MBA Lab visitor',
          email: d.email, type: d.type, subject, _subject: subject, message: d.message, page: d.page, sentAt: d.sentAt, lang: d.lang })) };
    }
    const res = await fetch(C.formEndpoint, init);
    let json = null;
    try { json = await res.json(); } catch (x) {}
    const confirmed = C.formTransport === 'apps-script' ? !!(json && json.ok === true) : (res.ok && !(json && (json.success === false || json.ok === false)));
    if (!res.ok || !confirmed) throw new Error((json && json.message) || t('errStatus', { s: res.status }));
  };

  let sending = false;
  $('ideaForm').addEventListener('submit', async e => {
    e.preventDefault();
    if (sending || $('fBot').value) return;                    // honeypot: bots fill the hidden field
    const bad = Object.keys(FF).filter(k => !check(k));
    if (bad.length) { FF[bad[0]].focus(); setStatus(t('fixFields'), 'err'); return; }
    sending = true;
    $('fSubmit').disabled = true;
    $('ideaForm').setAttribute('aria-busy', 'true');
    setStatus(t('submitting'), '');
    const data = { name: FF.name.value.trim(), email: FF.email.value.trim(), type: FF.type.value, subject: FF.subject.value.trim(),
      message: FF.message.value.trim(), page: location.href, sentAt: new Date().toISOString(), lang: MBALAB.i18n.get() };
    try {
      await deliver(data);
      setStatus(t('okEndpoint'), 'ok');
      $('ideaForm').reset();
      Object.keys(FF).forEach(k => { $(FE[k]).textContent = ''; FF[k].setAttribute('aria-invalid', 'false'); });
    } catch (err) {
      if (err && err.unavail) setStatus(err.message, 'err');
      else setStatus(t('errPre') + ((err && err.message) || t('unknownErr')) + t('errKept'), 'err');
    } finally {
      sending = false;
      $('fSubmit').disabled = false;
      $('ideaForm').removeAttribute('aria-busy');
    }
  });

  /* entry point */
  const button = MBALAB.ui.html(
    '<button id="btnIdea" type="button" aria-haspopup="dialog" data-action="open-idea" data-sfx="open" data-ia="aria-label=ideaAria,title=ideaAria">' +
    '<span aria-hidden="true">💡</span><span class="lb" data-i18n="ideaLbl">Submit an idea</span></button>');
  MBALAB.ui.fab(button, 20);
  MBALAB.actions['open-idea'] = () => { refreshNotice(); MBALAB.overlay.open(dialog); };

  MBALAB.on('lang', () => { refreshNotice(); Object.keys(FF).forEach(k => { if (invalid(k)) check(k); }); });
});
