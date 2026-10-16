/* Runs every pure-logic engine test: simulations/<id>/tests/engine.js and templates/<id>/tests/engine.js (plain node, no browser, no server).
   Usage: node tests/engines.js        Exit code 1 if any test fails. */
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const root = path.join(__dirname, '..', 'simulations'), troot = path.join(__dirname, '..', 'templates');
let fail = 0, n = 0;
const suites = fs.readdirSync(root).sort().map(id => [id, path.join(root, id, 'tests', 'engine.js')]).concat(fs.readdirSync(troot).sort().map(id => ['templates/' + id, path.join(troot, id, 'tests', 'engine.js')]));
for (const [id, f] of suites) {
  if (!fs.existsSync(f)) continue;
  n++;
  const r = spawnSync(process.execPath, [f], { encoding: 'utf8' });
  const ok = r.status === 0;
  console.log((ok ? 'ok   ' : 'FAIL ') + id + (ok ? '' : '\n' + (r.stdout || '') + (r.stderr || '')));
  if (!ok) fail++;
}
console.log(fail ? fail + ' of ' + n + ' engine suites failed' : 'OK: ' + n + ' engine suites');
process.exit(fail ? 1 : 0);
