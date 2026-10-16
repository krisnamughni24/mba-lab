/* Report helpers shared by the calculators (SMART Calculator, Decision Tree Calculator).
   MBALAB.report.css      the A4 report stylesheet (class .rp)
   MBALAB.report.html(title, bodyHtml)   a standalone HTML file
   MBALAB.report.pdf(bodyHtml)           Uint8Array of a PDF built in the browser (JPEG pages, no libraries)
   MBALAB.report.save(name, data, mime)  saves through claude downloads when available, else a normal download */
(() => {
  const REPORT_CSS = `.rp{width:794px;box-sizing:border-box;padding:0 44px;background:#fff;color:#0f172a;font:13px/1.5 system-ui,-apple-system,"Segoe UI","Noto Sans","Noto Sans CJK JP","Noto Sans CJK SC",sans-serif;position:relative}
.rp *{box-sizing:border-box}.rp .blk{padding-bottom:18px}.rp h1{font-size:24px;margin:0 0 4px;color:#1e3a8a}.rp h2{font-size:16px;margin:0 0 8px;color:#1e3a8a;border-bottom:2px solid #c7d2fe;padding-bottom:4px}
.rp .sub{color:#64748b;margin:0}.rp table{border-collapse:collapse;width:100%;font-size:12px}.rp th,.rp td{border:1px solid #cbd5e1;padding:5px 8px;text-align:right}.rp th:first-child,.rp td:first-child{text-align:left}
.rp th{background:#eef2ff}.rp tr.sec th{background:#f8fafc;text-align:left;color:#475569;font-weight:600}.rp p{margin:6px 0}.rp .win{background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:8px 12px;margin:8px 0}
.rp .l2 th:nth-child(2),.rp .l2 td:nth-child(2){text-align:left}.rp ul{margin:6px 0 6px 18px;padding:0}.rp li{margin:3px 0}.rp .note{color:#64748b;font-size:11px}.rp svg{width:100%;height:auto;display:block;font-family:inherit}.rp h3{font-size:13px;margin:8px 0 4px}`;
  /* Brand strip at the top of every report (inline SVG: it must work inside the PDF renderer and in a saved HTML file) */
  const BRAND = `<div class="blk brand"><svg viewBox="0 0 512 512" width="30" height="30" aria-hidden="true"><defs><linearGradient id="bgR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#101a4a"/><stop offset="1" stop-color="#1a0b3a"/></linearGradient><linearGradient id="nR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4dd2ff"/><stop offset="1" stop-color="#ff6ad5"/></linearGradient></defs><rect width="512" height="512" rx="116" fill="url(#bgR)"/><path d="M120 384 L120 168 L256 318 L392 168 L392 384" fill="none" stroke="url(#nR)" stroke-width="56" stroke-linecap="round" stroke-linejoin="round"/><circle cx="120" cy="168" r="34" fill="#fff"/><circle cx="392" cy="168" r="34" fill="#fff"/><circle cx="256" cy="318" r="25" fill="#fff"/></svg><b>MBA Lab</b><span>mba-lab.vercel.app</span></div>`;
  const BRAND_CSS = `.rp .brand{display:flex;align-items:center;gap:10px;padding:18px 0 14px;margin-bottom:6px;border-bottom:3px solid #a5b4fc}.rp .brand svg{width:30px;height:30px;flex:none}.rp .brand b{font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:#1e3a8a}.rp .brand span{margin-left:auto;color:#64748b;font-size:11px}`;
  async function pdf(bodyHtml) {
    const W = 794, PH = 1123, M = 44, SC = 2, box = document.createElement('div');
    box.style.cssText = `position:fixed;left:-10000px;top:0;width:${W}px;pointer-events:none`;
    box.innerHTML = `<style>${REPORT_CSS}${BRAND_CSS}</style><div class="rp">${BRAND}${bodyHtml}</div>`;
    document.body.appendChild(box);
    try {
      const rp = box.querySelector('.rp'); if (document.fonts && document.fonts.ready) await document.fonts.ready;
      const H = Math.ceil(rp.scrollHeight), blocks = [...rp.children].filter(c => c.classList.contains('blk')).map(b => ({ t: b.offsetTop, h: b.offsetHeight }));
      const avail = PH - 2 * M, pages = []; let cur = null;
      blocks.forEach(b => {
        if (b.h > avail) { if (cur) pages.push(cur), cur = null; for (let y = 0; y < b.h; y += avail) pages.push({ y0: b.t + y, y1: b.t + Math.min(b.h, y + avail) }); return; }
        if (!cur) cur = { y0: b.t, y1: b.t + b.h }; else if (b.t + b.h - cur.y0 <= avail) cur.y1 = b.t + b.h; else { pages.push(cur); cur = { y0: b.t, y1: b.t + b.h }; }
      });
      if (cur) pages.push(cur);
      const clone = box.cloneNode(true); clone.removeAttribute('style');
      const xml = new XMLSerializer().serializeToString(clone);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><foreignObject x="0" y="0" width="${W}" height="${H}">${xml}</foreignObject></svg>`;
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('render')); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
      const full = document.createElement('canvas'); full.width = W * SC; full.height = H * SC;
      const fx = full.getContext('2d'); fx.fillStyle = '#fff'; fx.fillRect(0, 0, full.width, full.height); fx.drawImage(img, 0, 0, W * SC, H * SC);
      const jpgs = pages.map(p => {
        const c = document.createElement('canvas'); c.width = W * SC; c.height = PH * SC;
        const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
        x.drawImage(full, 0, p.y0 * SC, W * SC, (p.y1 - p.y0) * SC, 0, M * SC, W * SC, (p.y1 - p.y0) * SC);
        const b64 = c.toDataURL('image/jpeg', 0.92).split(',')[1], bin = atob(b64), bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return { bytes, w: c.width, h: c.height };
      });
      return buildPdf(jpgs);
    } finally { box.remove(); }
  }
  function buildPdf(jpgs) {
    const enc = new TextEncoder(), parts = [], offs = []; let len = 0;
    const push = d => { const b = typeof d === 'string' ? enc.encode(d) : d; parts.push(b); len += b.length; };
    const obj = (n, fn) => { offs[n] = len; push(n + ' 0 obj\n'); fn(); push('\nendobj\n'); };
    push('%PDF-1.4\n');
    obj(1, () => push('<</Type/Catalog/Pages 2 0 R>>'));
    obj(2, () => push(`<</Type/Pages/Count ${jpgs.length}/Kids[${jpgs.map((_, i) => (3 + 3 * i) + ' 0 R').join(' ')}]>>`));
    jpgs.forEach((j, i) => {
      const p = 3 + 3 * i, c = p + 1, im = p + 2, st = 'q 595.28 0 0 841.89 0 0 cm /Im0 Do Q';
      obj(p, () => push(`<</Type/Page/Parent 2 0 R/MediaBox[0 0 595.28 841.89]/Resources<</XObject<</Im0 ${im} 0 R>>>>/Contents ${c} 0 R>>`));
      obj(c, () => push(`<</Length ${st.length}>>\nstream\n${st}\nendstream`));
      obj(im, () => { push(`<</Type/XObject/Subtype/Image/Width ${j.w}/Height ${j.h}/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ${j.bytes.length}>>\nstream\n`); push(j.bytes); push('\nendstream'); });
    });
    const n = 3 + 3 * jpgs.length, xr = len;
    push(`xref\n0 ${n}\n0000000000 65535 f \n` + Array.from({ length: n - 1 }, (_, i) => String(offs[i + 1]).padStart(10, '0') + ' 00000 n \n').join(''));
    push(`trailer\n<</Size ${n}/Root 1 0 R>>\nstartxref\n${xr}\n%%EOF`);
    const out = new Uint8Array(len); let o = 0; parts.forEach(b => { out.set(b, o); o += b.length; });
    return out;
  }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function html(title, bodyHtml) {
    return `<!doctype html><html lang="${MBALAB.i18n.get()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>body{margin:0;background:#f1f5f9}.rp{margin:0 auto;box-shadow:0 0 0 1px #e2e8f0}@media print{body{background:#fff}.rp{box-shadow:none;width:auto}}${REPORT_CSS}${BRAND_CSS}</style></head><body><div class="rp">${BRAND}${bodyHtml}</div></body></html>`;
  }
  async function save(name, data, mime) {
    try {
      const dl = window.claude && claude.use ? await claude.use('downloads') : null;
      if (dl) { await dl.save({ filename: name, data }); return true; }
    } catch (e) { if (e && e.code === 'declined') return false; }
    const blob = data instanceof Blob ? data : new Blob([data], { type: mime });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); return true;
  }
  MBALAB.report = { css: REPORT_CSS + BRAND_CSS, html, pdf, save };
})();
