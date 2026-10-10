/* Script / stylesheet loader. Scripts are injected with async=false so they execute in the order given,
   while still downloading in parallel. Each URL is only loaded once. */
(() => {
  const done = {};
  const once = (url, make) => done[url] || (done[url] = new Promise((resolve, reject) => {
    const el = make();
    el.onload = () => resolve(url);
    el.onerror = () => { delete done[url]; reject(new Error('Failed to load ' + url)); };
    document.head.appendChild(el);
  }));
  const script = src => once(src, () => { const s = document.createElement('script'); s.src = src; s.async = false; return s; });
  const style = href => once(href, () => { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; return l; });

  MBALAB.load = {
    scripts: list => Promise.all(list.map(script)),
    styles: list => Promise.all(list.map(style))
  };
})();
