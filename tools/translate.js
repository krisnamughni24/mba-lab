#!/usr/bin/env node
/* Fills the missing translations of a simulation, so you only write the English text.

   In simulations/<id>/i18n/strings.js write a key with ONE element:      hello: ['Hello {name}'],
   then run:                                                              node tools/translate.js <id>
   and it becomes                                                         hello: ['Hello {name}', 'Halo {name}', 'こんにちは {name}', '你好 {name}'],

   Usage:  node tools/translate.js <sim-id | --all> [--provider anthropic|deepl|mock] [--dry]
   Keys:   ANTHROPIC_API_KEY (default provider; optional TRANSLATE_MODEL) or DEEPL_API_KEY (free keys end in ":fx").
           Keys are read from the environment only. Never put them in a file in this repository.
   Works on the format `key: [en, id, ja, zh]` (all current simulations; the template's per-language objects must be filled by hand). Existing translations are never overwritten.
   Machine translation is a draft: read the diff (git diff) before you commit. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..'), LANGS = ['en', 'id', 'ja', 'zh'];
const NAMES = { id: 'Indonesian', ja: 'Japanese', zh: 'Simplified Chinese' }, DEEPL = { id: 'ID', ja: 'JA', zh: 'ZH-HANS' };
const args = process.argv.slice(2), flag = n => args.includes(n), opt = n => { const i = args.indexOf(n); return i < 0 ? null : args[i + 1]; };
const provider = opt('--provider') || (process.env.ANTHROPIC_API_KEY ? 'anthropic' : process.env.DEEPL_API_KEY ? 'deepl' : null);
const target = args.find(a => !a.startsWith('--') && a !== opt('--provider'));
if (!target || !provider) { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace('#!/usr/bin/env node\n', '')); process.exit(target ? 1 : 0); }

const STYLE = `You translate interface texts of an MBA education website from English.
Rules: keep placeholders such as {v} {n} {name} exactly as they are; keep HTML tags such as <b> and <br>; keep emoji, numbers, units and symbols (→ ✓ ★ Rp).
Keep product and brand names unchanged (MBA Lab, SMART, Bit, BATNA, EVPI, A/B). Use sentence case. Be concise: these are button labels, titles and short sentences.
Indonesian: formal register, address the reader as "Anda", the assistant says "saya". Japanese: polite です/ます form. Chinese: Simplified, neutral business tone.`;

async function anthropic(items, lang) {
  const body = { model: process.env.TRANSLATE_MODEL || 'claude-sonnet-5-5', max_tokens: 8000, system: STYLE,
    messages: [{ role: 'user', content: `Translate every value of this JSON object into ${NAMES[lang]}. Reply with ONLY the JSON object, same keys.\n` + JSON.stringify(items) }] };
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error('Anthropic API ' + r.status + ' ' + (await r.text()).slice(0, 200));
  const txt = (await r.json()).content.map(c => c.text || '').join(''), m = txt.match(/\{[\s\S]*\}/);
  return JSON.parse(m[0]);
}
async function deepl(items, lang) {
  const key = process.env.DEEPL_API_KEY, host = key.endsWith(':fx') ? 'api-free.deepl.com' : 'api.deepl.com', ks = Object.keys(items);
  const r = await fetch('https://' + host + '/v2/translate', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'DeepL-Auth-Key ' + key },
    body: JSON.stringify({ text: ks.map(k => items[k]), source_lang: 'EN', target_lang: DEEPL[lang], tag_handling: 'xml', ignore_tags: ['x'], formality: lang === 'id' ? 'prefer_more' : undefined }) });
  if (!r.ok) throw new Error('DeepL API ' + r.status + ' ' + (await r.text()).slice(0, 200));
  const o = {}; (await r.json()).translations.forEach((t, i) => { o[ks[i]] = t.text; }); return o;
}
async function mock(items, lang) { const o = {}; for (const k in items) o[k] = `[${lang}] ${items[k]}`; return o; }
const PROVIDERS = { anthropic, deepl, mock };
if (!PROVIDERS[provider]) { console.error('unknown provider ' + provider); process.exit(1); }
if (provider === 'anthropic' && !process.env.ANTHROPIC_API_KEY) { console.error('ANTHROPIC_API_KEY is not set'); process.exit(1); }
if (provider === 'deepl' && !process.env.DEEPL_API_KEY) { console.error('DEEPL_API_KEY is not set'); process.exit(1); }

const marks = s => (String(s).match(/\{[^}]+\}|<\/?[a-z]+>/gi) || []).sort().join('|');
const q = s => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";

/* find the source range of the array literal that belongs to `key` (string-literal aware bracket scan) */
function arrayRange(src, key) {
  const re = new RegExp('(^|[\\s,{(])[\'"]?' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\'"]?\\s*:\\s*\\[', 'g'); let m, hit = null;
  while ((m = re.exec(src))) { if (hit) return null; hit = m; }               /* ambiguous key: skip */
  if (!hit) return null;
  const start = hit.index + hit[0].length - 1; let depth = 0, i = start;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === "'" || c === '"' || c === '`') { for (i++; i < src.length && src[i] !== c; i++) if (src[i] === '\\') i++; }
    else if (c === '[') depth++; else if (c === ']' && --depth === 0) break;
  }
  return [start, i + 1];
}

async function doSim(id) {
  const f = path.join(root, 'simulations', id, 'i18n', 'strings.js');
  if (!fs.existsSync(f)) { console.log(id + ': no i18n/strings.js'); return 0; }
  let src = fs.readFileSync(f, 'utf8'), got = null;
  vm.runInNewContext(src, { MBALAB: { data: {}, util: {}, on() {}, i18n: { add() {} }, sims: { files() {}, define(i, p) { if (p && p.strings) got = p.strings; } } }, window: {} });
  if (!got || !Object.keys(got).every(k => LANGS.includes(k))) { console.log(id + ': strings are not in the per-language form, nothing to do'); return 0; }
  const keys0 = new Set(); LANGS.forEach(l => Object.keys(got[l] || {}).forEach(k => keys0.add(k)));
  const todo = [...keys0].map(k => [k, LANGS.map(l => (got[l] || {})[k])]).filter(([, v]) => typeof v[0] === 'string' && v[0].trim() && v.some(x => typeof x !== 'string' || !x.trim()));
  if (!todo.length) { console.log(id + ': nothing to translate'); return 0; }
  console.log(id + ': ' + todo.length + ' key(s) to translate (' + provider + ')');
  const out = {};
  for (const lang of LANGS.slice(1)) {
    const need = Object.fromEntries(todo.filter(([, v]) => !String(v[LANGS.indexOf(lang)] || '').trim()).map(([k, v]) => [k, v[0]]));
    const keys = Object.keys(need); out[lang] = {};
    for (let i = 0; i < keys.length; i += 40) {                                  /* batches of 40 keys */
      const batch = Object.fromEntries(keys.slice(i, i + 40).map(k => [k, need[k]]));
      const res = await PROVIDERS[provider](batch, lang);
      for (const k of Object.keys(batch)) {
        if (typeof res[k] !== 'string' || !res[k].trim()) { console.warn('  skip ' + k + ' (' + lang + '): empty answer'); continue; }
        if (provider !== 'mock' && marks(res[k]) !== marks(batch[k])) { console.warn('  skip ' + k + ' (' + lang + '): placeholders or tags changed'); continue; }
        out[lang][k] = res[k].trim();
      }
    }
  }
  let changed = 0;
  for (const [k, v] of todo) {
    const r = arrayRange(src, k); if (!r) { console.warn('  cannot locate ' + k + ' in the source, left as is'); continue; }
    const cur = LANGS.map((l, i) => i === 0 ? null : (String(v[i] || '').trim() ? v[i] : out[l][k]));
    if (cur.slice(1).some(x => !x)) { console.warn('  ' + k + ' stays incomplete'); continue; }
    const enRaw = src.slice(r[0] + 1, r[1] - 1).trim().replace(/,\s*$/, '').match(/^(?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`[^`]*`)/)[0];
    src = src.slice(0, r[0]) + '[' + [enRaw, ...cur.slice(1).map(q)].join(', ') + ']' + src.slice(r[1]); changed++;
  }
  if (!flag('--dry') && changed) fs.writeFileSync(f, src);
  console.log('  ' + (flag('--dry') ? 'would update ' : 'updated ') + changed + ' key(s)'); return changed;
}

(async () => {
  const ids = target === '--all' ? fs.readdirSync(path.join(root, 'simulations')).filter(d => d !== '_template' && fs.existsSync(path.join(root, 'simulations', d, 'i18n', 'strings.js'))) : [target];
  let n = 0; for (const id of ids) n += await doSim(id);
  console.log(n ? 'Done. Review with: git diff' : 'Nothing changed.');
})().catch(e => { console.error(e.message); process.exit(1); });
