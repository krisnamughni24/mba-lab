/* Starter test: opens each template starter (templates/<id>/) as a temporary catalog entry, plays through its main path and fails on
   page errors or a missing step. Run it after changing a kit stylesheet (shared/simkit.css, scenario.css, explorer.css, exam.css, studio.css)
   or a starter, so the copy-and-edit starting points never rot.
   Usage: python3 -m http.server 8099 (repo root), then  node tests/starters.js [http://localhost:8099/] */
const { chromium } = require(process.env.PW || 'playwright');
const FLOWS = {
  'scenario-levels': async p => { await p.click('[data-lv="0"]'); await p.click('[data-a="sell"]'); await p.waitForSelector('.sc-res .sc-kpis'); },
  scenario: async p => { await p.click('[data-sc="0"]'); await p.click('#snInfo'); await p.waitForSelector('#snGuide:not([hidden])'); await p.click('#snGuide [data-gclose].sn-main'); for (let i = 0; i < 5; i++) await p.click('#snGo'); await p.waitForSelector('#snRes:not([hidden]) .sc-rh'); },
  explorer: async p => { await p.click('.ex-li'); await p.waitForSelector('#epCard:not([hidden])'); await p.click('#epInfo'); await p.waitForSelector('#epGuide:not([hidden])'); await p.click('#epGuide [data-gclose].ex-main'); await p.click('#epQz'); await p.click('.ex-opt'); await p.waitForSelector('.ex-fb'); },
  /* the guide pop-up opens by itself on each new part: close it whenever it is open */
  calculator: async p => { const g = async () => { await p.waitForTimeout(400); await p.evaluate(() => { const d = document.getElementById('sdGuide'); if (d && !d.hidden) d.querySelectorAll('[data-gclose]').forEach(x => x.click()); }); await p.waitForTimeout(300); };
    await g(); await p.click('[data-case="cafe"]'); await g(); await p.click('#next1'); await g(); await p.click('#next1'); await g(); await p.waitForSelector('.bc-big'); await p.click('.sd-foot .sd-cta'); await g(); await p.waitForSelector('.sd-dl'); },
  exam: async p => { await p.click('#xqStart'); await p.click('.xm-opt'); await p.click('#xqSubmit'); await p.click('#xqFin'); await p.waitForSelector('.xm-ring'); }
};
(async () => {
  const base = process.argv[2] || 'http://localhost:8099/', bad = [];
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  for (const id of Object.keys(FLOWS)) {
    const pg = await b.newPage({ viewport: { width: 1100, height: 800 } });
    pg.on('pageerror', e => bad.push(`${id}: pageerror ${e.message}`));
    pg.on('response', r => { if (r.status() >= 400 && !/supabase|jsdelivr|google|fonts|gstatic|cdnjs|unpkg/.test(r.url())) bad.push(`${id}: ${r.status()} ${r.url()}`); });
    try {
      await pg.goto(base + 'index.html'); await pg.waitForTimeout(800);
      await pg.evaluate(i => { const n = { en: 'Starter', id: 'Starter', ja: 'Starter', zh: 'Starter' }; MBALAB.data.simulations.push({ id: 'my-simulation', status: 'live', template: i === 'scenario-levels' ? 'scenario' : i, icon: '🧪', category: 'analytics', path: 'templates/' + i + '/', name: n, description: n }); MBALAB.sims.open('my-simulation'); }, id);
      await pg.waitForFunction(() => MBALAB.sims.isOpen(), null, { timeout: 15000 }); await pg.waitForSelector('#app button');
      await FLOWS[id](pg);
      console.log('ok   ' + id);
    } catch (e) { bad.push(`${id}: ${e.message.split('\n')[0]}`); if (process.env.SHOT) await pg.screenshot({ path: process.env.SHOT + id + '.png' }); }
    await pg.close();
  }
  console.log(bad.length ? 'FAIL\n' + [...new Set(bad)].join('\n') : 'OK: ' + Object.keys(FLOWS).length + ' starters');
  await b.close(); process.exit(bad.length ? 1 : 0);
})();
