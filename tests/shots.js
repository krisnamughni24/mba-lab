/* Visual regression helper. Opens every live simulation (and optionally its Lab tab / first case) and saves screenshots.
   Usage:  node tests/shots.js <outDir> [http://localhost:8099/]
   Compare two folders with:  python3 tests/shotdiff.py <dirA> <dirB> */
const { chromium } = require(process.env.PW || 'playwright'); const fs = require('fs');
(async () => {
  const out = process.argv[2] || 'shots', base = process.argv[3] || 'http://localhost:8099/'; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ args: ['--use-gl=swiftshader'] }); const errs = [];
  for (const [w, h, tag] of [[1440, 810, 'd'], [390, 800, 'm']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); p.setDefaultTimeout(6000); p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(() => { try { localStorage.setItem('mbalab-lang', 'en'); } catch (e) {} });
    await p.goto(base + 'index.html'); await p.waitForTimeout(1200);
    const ids = await p.evaluate(() => MBALAB.data.simulations.filter(s => s.status === 'live').map(s => s.id));
    for (const id of ids) {
      await p.evaluate(i => MBALAB.sims.open(i), id); await p.waitForTimeout(900);
      await p.addStyleTag({ content: '*{animation:none!important;transition:none!important;caret-color:transparent!important}.bit,#bit,.assistant,[class*=assistant],[class*=bit-]{visibility:hidden!important}canvas{visibility:hidden!important}' });
      await p.waitForTimeout(200); await p.screenshot({ path: `${out}/${id}-${tag}-menu.png` });
      const lv = await p.$('[data-lv="0"]'); if (lv) { try { await lv.click({ force: true }); await p.waitForTimeout(700); await p.screenshot({ path: `${out}/${id}-${tag}-case.png` }); } catch (e) {} await p.evaluate(() => MBALAB.sims.close()); await p.waitForTimeout(250); await p.evaluate(i => MBALAB.sims.open(i), id); await p.waitForTimeout(900); await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}canvas{visibility:hidden!important}' }); }
      const tab = await p.$('[data-tab="lab"]'); if (tab) { await tab.click(); await p.waitForTimeout(500); await p.screenshot({ path: `${out}/${id}-${tag}-lab.png` }); await (await p.$('[data-tab="game"]')).click(); await p.waitForTimeout(200); }
      await p.evaluate(() => MBALAB.sims.close()); await p.waitForTimeout(250);
    }
    await p.close();
  }
  console.log(errs.length ? 'ERRORS ' + [...new Set(errs)].join(' | ') : 'shots ok'); await b.close();
})();
