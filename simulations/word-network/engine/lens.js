/* Word Network: lens engine. Pure logic, no DOM. Reads the curated data (data/lens.js) and scores each item against an optional context
   word. Exposed as MBALAB.wordnet.lens_* helpers (and module.exports for node tests). Needs engine/engine.js loaded first.
   Relevance 0..1: a known context word maps to a sector tag (bank -> fin); the item matches when it carries that tag. Any other word is
   scored through the SWOW network between the context and the item's anchor word (a weak proxy, so the result is capped). */
(function () {
  const M = (typeof window !== 'undefined' ? (window.MBALAB = window.MBALAB || {}) : {}); const N = M.wordnet = M.wordnet || {};
  const TAGS = {
    fin: 'bank money credit loan finance investor insurance stock', health: 'hospital doctor clinic nurse health patient medicine', edu: 'school university teacher student college class education',
    food: 'farm farmer restaurant kitchen food cafe chef harvest', pub: 'government state ministry city police public council', mfg: 'factory industry plant machine production workshop',
    retail: 'shop store market retail mall supermarket customer', biz: 'company business firm office corporation enterprise', fam: 'family home village household parent'
  };
  const CTXMAP = {}; Object.keys(TAGS).forEach(t => TAGS[t].split(' ').forEach(w => { CTXMAP[w] = t; }));
  const CHOICES = ['company', 'bank', 'hospital', 'school', 'farm', 'government', 'restaurant', 'factory', 'shop', 'family'];

  const list = () => N.lens || [];
  const get = k => list().find(c => c.k === String(k || '').trim().toLowerCase()) || null;
  const keys = () => list().map(c => c.k);
  const tagOf = w => CTXMAP[N.norm(w)] || '';

  /* similarity of two words through SWOW: direct link or best two-step path, scaled 0..1 (strength 150 = 1) */
  function link(a, b) {
    if (!N.has(a) || !N.has(b)) return 0;
    const d = N.weight(a, b); if (d) return Math.min(1, d / 150);
    const br = N.bridges([a, b], 1); return br.length ? Math.min(1, br[0].s / 150) : 0;
  }
  /* relevance of one item to a context word: 1 = tagged for this sector, 0.5 = neutral (no context), low otherwise */
  function relevance(item, ctx) {
    ctx = N.norm(ctx); if (!ctx) return 0.5;
    const tag = tagOf(ctx);
    if (tag) { if (item.tg.includes(tag)) return 1; if (!item.tg.length) return 0.55; return Math.max(0.15, link(ctx, item.a) * 0.6); }
    const s = link(ctx, item.a); return item.tg.length ? Math.min(0.9, 0.2 + s) : Math.min(0.9, 0.45 + s);
  }
  /* items of one side ('pos' or 'neg') ranked for a context: score mixes the importance (1-3) with the relevance */
  function rank(concept, side, ctx) {
    const c = typeof concept === 'string' ? get(concept) : concept; if (!c) return [];
    return c[side].map((it, i) => { const r = relevance(it, ctx); return { item: it, i, rel: r, score: Math.round((it.m / 3 * 0.55 + r * 0.45) * 100) / 100, hit: !!N.norm(ctx) && r >= 0.9 }; })
      .sort((a, b) => b.score - a.score || a.i - b.i);
  }
  Object.assign(N, { lensList: list, lensGet: get, lensKeys: keys, lensRank: rank, lensRel: relevance, ctxTag: tagOf, CTX_CHOICES: CHOICES });
  if (typeof module !== 'undefined') module.exports = N;
})();
