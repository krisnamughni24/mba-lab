/* BUMN Explorer: aligns the city with the Danantara Corporate & Sector Intelligence Guide (Oct 2026 edition).
   - moves every company to the guide's sectors (15 keys, see engine.js) and flags the 13 subsidiary landmarks (`sub` = parent id)
   - removes the five buildings that are not in the guide (Bulog, Antara, DAMRI, Perumnas, Perhutani)
   - adds the 22 companies and organisation entities the city did not have yet (clues from guide.js, positions below)
   Loaded after engine.js, facts.js, more.js and guide.js, before the scene files. */
(function () {
  const E = MBALAB.bumn, I = E.INFO || (E.INFO = {});
  const SEC = {
    danantara: 'org', pertamina: 'energy', pln: 'energy', pupuk: 'energy', adhi: 'infra',
    jasamarga: 'logistics', pelni: 'logistics', kai: 'logistics', inka: 'logistics', pelindo: 'logistics', pos: 'logistics', asdp: 'logistics',
    mandiri: 'banking', bri: 'banking', bni: 'banking', btn: 'banking', bsi: 'banking', pegadaian: 'banking', pnm: 'banking',
    len: 'manufacturing', pal: 'manufacturing', ptdi: 'manufacturing', pindad: 'manufacturing',
    idfood: 'food', shs: 'food', krakatau: 'minerals', mind: 'minerals', antam: 'minerals', bukitasam: 'minerals', timah: 'minerals',
    biofarma: 'health', kimiafarma: 'health', ptpn: 'plantations', telkom: 'telecom', telkomsel: 'telecom', pgn: 'energy',
    taspen: 'insurance', jasaraharja: 'insurance', garuda: 'tourism', injourney: 'tourism',
    sig: 'infra', waskita: 'infra', wika: 'infra', hutamakarya: 'infra', ptpp: 'infra'
  };
  const SUB = { pal: 'len', ptdi: 'len', pindad: 'len', antam: 'mind', bukitasam: 'mind', timah: 'mind', pegadaian: 'bri', pnm: 'bri', telkomsel: 'telkom', pgn: 'pertamina', jasaraharja: 'ifg', kimiafarma: 'biofarma', shs: 'idfood' };
  ['bulog', 'antara', 'damri', 'perumnas', 'perhutani'].forEach(id => {
    const i = E.LIST.findIndex(b => b.id === id); if (i >= 0) E.LIST.splice(i, 1); delete E.byId[id]; delete I[id];
  });
  E.LIST.forEach(b => { if (SEC[b.id]) b.sec = SEC[b.id]; if (SUB[b.id]) b.sub = SUB[b.id]; });
  E.byId.adhi.also = 'energy';

  /* id: [x, z, r, h, sector, icon] — new companies and organisation entities */
  const NEW = {
    dam: [-54, 0, 7, 36, 'org'], dim: [54, 0, 7, 36, 'org'], ddmf: [0, 36, 6.5, 22, 'org'],
    perminas: [163, 197, 11, 24, 'minerals'], 'agrinas-jaladri': [244, 155, 11, 14, 'food'], 'agrinas-pangan': [244, 197, 11, 22, 'food'], 'agrinas-palma': [202, 182, 11, 18, 'plantations'],
    ifg: [-68, 122, 10, 30, 'insurance'], indonesiare: [-176, 59, 10, 24, 'insurance'], asabri: [-191, 107, 10, 18, 'insurance'],
    idsurvey: [-167, 152, 10, 18, 'special'],
    primissima: [-191, 197, 10, 16, 'survey'], pfn: [-143, 194, 10, 16, 'survey'], 'persero-batam': [-236, -112, 11, 20, 'survey'], dkb: [-245, -61, 11, 20, 'survey'], dps: [-236, -16, 11, 20, 'survey'], iki: [-245, 32, 11, 20, 'survey'],
    inti: [-215, 149, 10, 30, 'survey'], danareksa: [-245, 185, 10, 30, 'survey'], amarta: [-35, 197, 10, 26, 'survey'], bbi: [244, 62, 11, 20, 'survey'], brantas: [142, 140, 11, 18, 'infra']
  };
  const strings = { en: {}, id: {}, ja: {}, zh: {} }, L = ['en', 'id', 'ja', 'zh'];
  Object.keys(NEW).forEach(id => {
    const p = NEW[id], d = E.NEWD[id];
    E.LIST.push({ id, n: d[0], sec: p[4], x: p[0], z: p[1], r: p[2], h: p[3], icon: d[2] }); E.byId[id] = E.LIST[E.LIST.length - 1];
    L.forEach((l, i) => { strings[l]['bm_d_' + id] = d[3][i]; });
  });
  E.LIST.forEach(b => { const g = (E.GUIDE || {})[b.id]; if (g && g.also) b.also = g.also; });
  MBALAB.sims.define('bumn-explorer', { strings });
})();
