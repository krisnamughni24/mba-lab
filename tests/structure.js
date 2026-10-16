/* Repo integrity check (plain node, no browser). Fails on the mistakes that otherwise only show up in production:
   - a live simulation without sim.js, or a file listed in sim.js that does not exist
   - catalog entries with a duplicate id, a missing language, or an unknown category
   - a simulation that loads files from another simulation's folder
   - a string table with a missing language (2-3 entries instead of en/id/ja/zh)
   - secrets that must never be committed
   Usage: node tests/structure.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..'), LANGS = ['en', 'id', 'ja', 'zh'];
const bad = [], warn = [];
const rd = f => fs.readFileSync(path.join(root, f), 'utf8');
const run = f => { const M = { data: {}, sims: { files(id, o) { (M._files = M._files || {})[id] = o; }, define() {} } }; vm.runInNewContext(rd(f), { MBALAB: M, window: {} }); return M; };

/* catalog */
const M = { data: {} }; vm.runInNewContext(rd('data/simulations.js'), { MBALAB: M, window: {} });
const cats = (() => { const C = { data: {} }; vm.runInNewContext(rd('data/categories.js'), { MBALAB: C, window: {} }); return C.data.categories || []; })();
const catIds = new Set(cats.map(c => c.id)), sims = M.data.simulations, seen = new Set();
for (const s of sims) {
  if (seen.has(s.id)) bad.push('catalog: duplicate id ' + s.id); seen.add(s.id);
  for (const k of ['name', 'description']) for (const l of LANGS) if (!s[k] || !String(s[k][l] || '').trim()) bad.push(`catalog: ${s.id}.${k}.${l} missing`);
  if (catIds.size && !catIds.has(s.category)) bad.push(`catalog: ${s.id} has unknown category "${s.category}"`);
  if (!['live', 'soon'].includes(s.status)) bad.push(`catalog: ${s.id} has status "${s.status}"`);
}

/* live simulations */
const live = sims.filter(s => s.status === 'live').map(s => s.id);
for (const id of live) {
  const dir = `simulations/${id}`, sj = dir + '/sim.js';
  if (!fs.existsSync(path.join(root, sj))) { bad.push(`${id}: missing sim.js`); continue; }
  let files; try { files = run(sj)._files[id]; } catch (e) { bad.push(`${id}: sim.js does not run (${e.message})`); continue; }
  if (!files) { bad.push(`${id}: sim.js does not call MBALAB.sims.files('${id}', …)`); continue; }
  for (const f of [...(files.scripts || []), ...(files.styles || [])]) {
    const p = path.normalize(path.join(dir, f));
    if (!fs.existsSync(path.join(root, p))) bad.push(`${id}: ${f} is listed in sim.js but does not exist`);
    if (p.startsWith('simulations' + path.sep) && !p.startsWith(dir + path.sep)) bad.push(`${id}: loads ${f} from another simulation (move shared code to shared/)`);
  }
  if (!fs.existsSync(path.join(root, dir, 'i18n/strings.js'))) warn.push(`${id}: no i18n/strings.js`);
}
const orphan = fs.readdirSync(path.join(root, 'simulations')).filter(d => d !== '_template' && !seen.has(d) && fs.statSync(path.join(root, 'simulations', d)).isDirectory());
orphan.forEach(d => bad.push(`simulations/${d} has no catalog entry`));

/* string tables: every key of a simulation's strings must hold [en, id, ja, zh], all non-empty */
for (const id of live) {
  const f = `simulations/${id}/i18n/strings.js`; if (!fs.existsSync(path.join(root, f))) continue;
  let got = null; const Mb = { data: {}, util: {}, on() {}, i18n: { add() {} }, sims: { files() {}, define(i, part) { if (part && part.strings) got = part.strings; } } };
  try { vm.runInNewContext(rd(f), { MBALAB: Mb, window: {} }); } catch (e) { warn.push(`${id}: strings.js not checked (${e.message.split('\n')[0]})`); continue; }
  if (!got) { warn.push(`${id}: strings.js registers no strings`); continue; }
  let n = 0;
  if (Object.keys(got).every(k => LANGS.includes(k))) {   /* format B: { en:{key:text}, id:{…}, … } */
    const all = new Set(); LANGS.forEach(l => Object.keys(got[l] || {}).forEach(k => all.add(k)));
    for (const k of all) { n++; for (const l of LANGS) { const v = (got[l] || {})[k]; if (v == null || (typeof v === 'string' && !v.trim())) bad.push(`${id}.${k}: ${l} is missing`); } }
    if (!n) warn.push(`${id}: empty string table`); continue;
  }
  for (const [k, v] of Object.entries(got)) {
    n++;
    if (Array.isArray(v)) { if (v.length !== 4) bad.push(`${id}.${k}: ${v.length} translations instead of 4`); else v.forEach((x, i) => { if (typeof x !== 'string' || !x.trim()) bad.push(`${id}.${k}: ${LANGS[i]} is empty`); }); }
    else if (v && typeof v === 'object') LANGS.forEach(l => { if (!String(v[l] || '').trim()) bad.push(`${id}.${k}: ${l} is missing`); });
  }
  if (!n) warn.push(`${id}: empty string table`);
}

/* secrets */
const SECRET = [/service_role/i, /client_secret\s*[:=]\s*['"][^'"]{8,}/i, /GOCSPX-[\w-]{10,}/, /sbp_[a-f0-9]{30,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/];
const tracked = require('child_process').execSync('git ls-files', { cwd: root, encoding: 'utf8' }).split('\n').filter(f => f && /\.(js|css|html|json|md|yml|gs)$/.test(f) && f !== 'tests/structure.js' && f !== 'CONTRIBUTING.md' && f !== 'README.md' && !f.startsWith('docs/') && !f.startsWith('.github/') && !/\.sql$/.test(f));
for (const f of tracked) { const t = rd(f); for (const re of SECRET) if (re.test(t)) bad.push(`secret-like text in ${f} (${re})`); }

warn.forEach(w => console.log('warn  ' + w));
if (bad.some(b => /(is missing|is empty|translations instead)/.test(b))) console.log('hint  fill missing translations with: node tools/translate.js <sim-id>  (needs ANTHROPIC_API_KEY or DEEPL_API_KEY)');
if (bad.length) { console.log([...new Set(bad)].map(b => 'FAIL  ' + b).join('\n')); console.log(bad.length + ' problem(s)'); process.exit(1); }
console.log(`OK: ${sims.length} catalog entries, ${live.length} live simulations, structure and translations consistent`);
