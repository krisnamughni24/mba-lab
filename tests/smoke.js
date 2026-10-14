/* Smoke test: opens every live simulation and fails on page errors, failed requests or an empty mount.
   Usage:  python3 -m http.server 8099   (in the repo root)
           node tests/smoke.js [http://localhost:8099/]     (needs: npm i playwright; set CHROME=/path/to/chromium to reuse an installed browser)
   Run it after moving files or editing a simulation's file list (sim.js). */
const { chromium } = require(process.env.PW || 'playwright');
(async () => {
  const base = process.argv[2] || 'http://localhost:8099/';
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const pg = await b.newPage({ viewport: { width: 1100, height: 800 } });
  const bad = [];
  pg.on('pageerror', e => bad.push('pageerror: ' + e.message));
  pg.on('requestfailed', r => { if (!/supabase|jsdelivr|google|fonts|gstatic|cdnjs|unpkg/.test(r.url())) bad.push('requestfailed: ' + r.url()); });
  pg.on('response', r => { if (r.status() >= 400 && !/supabase|jsdelivr|google|fonts|gstatic|cdnjs|unpkg/.test(r.url())) bad.push(r.status() + ' ' + r.url()); });
  await pg.goto(base + 'index.html'); await pg.waitForTimeout(1500);
  const ids = await pg.evaluate(() => MBALAB.data.simulations.filter(s => s.status === 'live').map(s => s.id));
  const out = [];
  for (const id of ids) {
    await pg.evaluate(i => MBALAB.sims.open(i), id); await pg.waitForTimeout(2200);
    const info = await pg.evaluate(() => ({ open: MBALAB.sims.isOpen(), len: document.getElementById('app').innerHTML.length, btn: document.querySelectorAll('#app button').length }));
    if (!info.open || info.len < 500) bad.push(id + ' did not mount (open=' + info.open + ', html=' + info.len + ')');
    out.push(id + ' buttons=' + info.btn + ' html=' + info.len);
    await pg.evaluate(() => MBALAB.sims.close()); await pg.waitForTimeout(300);
  }
  console.log(out.join('\n')); console.log(bad.length ? 'FAIL\n' + [...new Set(bad)].join('\n') : 'OK: ' + ids.length + ' simulations, no errors');
  await b.close(); process.exit(bad.length ? 1 : 0);
})();
