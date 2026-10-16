/* Runs every pure-logic engine test: simulations/<id>/tests/engine.js (plain node, no browser, no server).
   Usage: node tests/engines.js        Exit code 1 if any test fails. */
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const root = path.join(__dirname, '..', 'simulations');
let fail = 0, n = 0;
for (const id of fs.readdirSync(root).sort()) {
  const f = path.join(root, id, 'tests', 'engine.js');
  if (!fs.existsSync(f)) continue;
  n++;
  const r = spawnSync(process.execPath, [f], { encoding: 'utf8' });
  const ok = r.status === 0;
  console.log((ok ? 'ok   ' : 'FAIL ') + id + (ok ? '' : '\n' + (r.stdout || '') + (r.stderr || '')));
  if (!ok) fail++;
}
console.log(fail ? fail + ' of ' + n + ' engine suites failed' : 'OK: ' + n + ' engine suites');
process.exit(fail ? 1 : 0);
