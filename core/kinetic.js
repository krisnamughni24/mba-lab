/* Kinetic typography: text "decode" (scramble) reveals, typewriter, hover glitch.
   Everything is automatic: it watches the page and animates headlines when they appear (new language, new screen,
   dialog opened, scrolled into view). To animate something yourself: MBALAB.fx.scramble(el), MBALAB.fx.type(el).
   To tune it, edit the selector lists and timings below. Disabled by "Pause" and by prefers-reduced-motion. */
(() => {
  const POOL = '!<>-_\\/[]{}=+*^?#%&01';
  /* animate when they APPEAR (added to the page) */
  const ON_ADD = '.hero h1,.hero .tag,.mw h3,.sd-card .sd-h h2,.sd-win b,.sd-top h1,.sl-name,.sd-guide h3';
  /* animate when SCROLLED INTO VIEW */
  const ON_VIEW = '.how h3,.step b,.feat div b';
  /* animate on HOVER (short glitch) */
  const ON_HOVER = '.cta,.brand,.sim.live b,.chip,.sd-steps .st button .l';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const off = () => reduced.matches || document.body.classList.contains('nomo');
  const timers = new WeakMap();

  const textNodes = el => { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), a = []; let n; while ((n = w.nextNode())) if (n.nodeValue.trim()) a.push(n); return a; };
  const cancel = el => { const t = timers.get(el); if (t) { cancelAnimationFrame(t.raf); t.restore(); timers.delete(el); } };

  /* decode: characters resolve left to right out of random glyphs */
  function scramble(el, o = {}) {
    if (!el || off()) return;
    cancel(el);
    const dur = o.dur || Math.min(1100, 380 + (el.textContent.length * 22)), delay = o.delay || 0;
    const nodes = textNodes(el).map(n => ({ n, t: n.nodeValue }));
    const total = nodes.reduce((s, x) => s + x.t.length, 0); if (!total) return;
    let idx = 0;
    nodes.forEach(x => { x.at = [...x.t].map(() => (idx++ / total) * dur * 0.72 + Math.random() * dur * 0.28); });
    const restore = () => nodes.forEach(x => { if (x.n.nodeValue !== x.t) x.n.nodeValue = x.t; });
    const st = { raf: 0, restore }, t0 = performance.now() + delay; let last = 0;
    timers.set(el, st);
    const frame = now => {
      if (now - last > 40) {
        last = now;
        const e = now - t0; let done = true;
        nodes.forEach(x => {
          let out = '';
          [...x.t].forEach((ch, i) => {
            if (/\s/.test(ch) || e >= x.at[i]) out += ch;
            else { done = false; out += POOL[(Math.random() * POOL.length) | 0]; }
          });
          if (x.n.nodeValue !== out) x.n.nodeValue = out;
        });
        if (done) { restore(); timers.delete(el); return; }
      }
      st.raf = requestAnimationFrame(frame);
    };
    st.raf = requestAnimationFrame(frame);
  }

  /* typewriter with a blinking block caret */
  function type(el, o = {}) {
    if (!el) return;
    cancel(el);
    const full = el.textContent, cps = o.cps || 55;
    if (off() || !full) return;
    const t0 = performance.now(), st = { raf: 0, restore: () => { el.textContent = full; el.classList.remove('fx-typing'); } };
    timers.set(el, st); el.classList.add('fx-typing');
    const frame = now => {
      const n = Math.min(full.length, Math.floor((now - t0) / 1000 * cps));
      el.textContent = full.slice(0, n);
      if (n >= full.length) { st.restore(); timers.delete(el); return; }
      st.raf = requestAnimationFrame(frame);
    };
    el.textContent = ''; st.raf = requestAnimationFrame(frame);
  }

  /* hover glitch: keeps the control's width so nothing jumps */
  function hover(el) {
    if (off() || timers.has(el)) return;
    const w = el.getBoundingClientRect().width; const prev = el.style.minWidth;
    el.style.minWidth = w + 'px';
    scramble(el, { dur: 420 });
    setTimeout(() => { el.style.minWidth = prev; }, 520);
  }

  const seen = new WeakSet();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { io.unobserve(e.target); scramble(e.target, { dur: 650 }); }
  }), { threshold: 0.6 }) : null;

  function handle(root) {
    if (root.nodeType !== 1) return;
    const hit = (sel, fn) => { if (root.matches && root.matches(sel)) fn(root); root.querySelectorAll && root.querySelectorAll(sel).forEach(fn); };
    hit(ON_ADD, el => { if (seen.has(el)) return; seen.add(el); scramble(el, { delay: 40 }); });
    if (io) hit(ON_VIEW, el => { if (seen.has(el)) return; seen.add(el); io.observe(el); });
  }

  function start() {
    new MutationObserver(ms => ms.forEach(m => {
      m.addedNodes.forEach(handle);
      /* dialogs and catalog are shown by toggling a class, not by adding nodes */
      if (m.type === 'attributes' && m.target.classList && m.target.classList.contains('on') && /(^| )(ov|mw)( |$)|^modal$/.test(m.target.className + ' ' + m.target.id)) {
        m.target.querySelectorAll('.mw h3').forEach(el => scramble(el));
      }
    })).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    document.addEventListener('mouseover', e => {
      const el = e.target.closest && e.target.closest(ON_HOVER);
      if (el && !el.contains(e.relatedTarget)) hover(el);
    });
    handle(document.body);
  }

  window.MBALAB = window.MBALAB || {};
  MBALAB.fx = { scramble, type, cancel };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
