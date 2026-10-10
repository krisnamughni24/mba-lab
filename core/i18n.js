/* i18n runtime.
   - UI chrome strings live next to their feature (strings.js) and are used through keys: t('key'), data-i18n, data-ia.
   - Content (about text, simulation names, ...) lives in data/*.js as {en,id,ja,zh} objects, used through tr(obj)
     and MBALAB.i18n.bind(el, () => tr(obj)) so it updates when the language changes.
   Languages are declared in data/languages.js. */
const I18N = {};
MBALAB.data.languages.forEach(l => { I18N[l.code] = {}; });
let LANG = 'en';
try { const saved = localStorage.getItem('mbalab-lang'); if (saved && I18N[saved]) LANG = saved; } catch (e) {}

const fill = (s, params) => {
  if (params) for (const k in params) s = s.split('{' + k + '}').join(params[k]);
  return s;
};
/* t('key', {param}) : UI string by key, falls back to English, then to the key itself */
const t = (key, params) => fill((I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key, params);
/* tr({en,id,ja,zh}) : pick the current language from a content object */
const tr = (obj, params) => fill(obj == null ? '' : typeof obj === 'string' ? obj : (obj[LANG] || obj.en || ''), params);

(() => {
  const bindings = [];
  MBALAB.i18n = {
    get: () => LANG,
    /* add({en:{key:'..'}, id:{...}, ja:{...}, zh:{...}}) */
    add(dict) { for (const code in dict) if (I18N[code]) Object.assign(I18N[code], dict[code]); },
    /* translate data-i18n (text, HTML allowed) and data-ia ("attr=key,attr=key") inside root */
    apply(root = document) {
      root.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
      root.querySelectorAll('[data-ia]').forEach(el => el.dataset.ia.split(',').forEach(pair => {
        const [attr, key] = pair.split('=');
        el.setAttribute(attr, t(key));
      }));
    },
    /* keep an element in sync with a content object: bind(el, () => tr(obj)) or bind(el, fn, 'attribute') */
    bind(el, getValue, attr) {
      const run = () => { const v = getValue(); if (attr) el.setAttribute(attr, v); else el.innerHTML = v; };
      bindings.push(run);
      run();
      return el;
    },
    set(code) {
      if (!I18N[code]) return;
      LANG = code;
      try { localStorage.setItem('mbalab-lang', code); } catch (e) {}
      document.documentElement.lang = code;
      MBALAB.i18n.apply();
      bindings.forEach(run => run());
      MBALAB.emit('lang', code);
    }
  };
})();
