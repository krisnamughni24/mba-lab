/* SMART Decision Studio: 2D virtual assistant "Bit".
   Walks along the bottom of the simulation and, after 3 seconds without any activity, stops and says a tip that fits
   the current part and the state of the model. Click Bit for a tip any time; "Hide" in the bubble puts Bit away.
   app.js calls SmartAssistant.create(host, { stage(), hints() }). */
(() => {
  const T = (en, id, ja, zh) => ({ en, id, ja, zh });
  const TIPS = {
    as_alts: T('Start by naming your alternatives in the first column: the options you are comparing.', 'Mulai dengan menamai alternatif di kolom pertama: pilihan yang kamu bandingkan.', 'まず左の列に代替案の名前を入力しましょう。比較する選択肢です。', '先在第一列为备选方案命名，也就是你要比较的选项。'),
    as_attrs: T('Now name the attributes (criteria) in the header row, for example price or quality.', 'Sekarang namai atribut (kriteria) di baris header, misalnya harga atau kualitas.', '次にヘッダー行に属性（評価基準）の名前を入力します。例：価格、品質。', '现在在表头行为属性（标准）命名，例如价格或质量。'),
    as_weights: T('Give every attribute a raw weight. A bigger number means it matters more. I normalize them for you.', 'Beri tiap atribut bobot mentah. Angka lebih besar berarti lebih penting. Aku yang menormalisasinya.', '各属性に生の重みを入力します。大きいほど重要で、正規化は私がします。', '为每个属性填写原始权重。数值越大越重要，归一化由我来做。'),
    as_ratings: T('Fill the remaining cells with a rating from 0 to 100. Higher is better.', 'Isi sel yang tersisa dengan nilai 0 sampai 100. Makin tinggi makin baik.', '残りのセルに0〜100の評価を入力します。高いほど良いです。', '请在其余单元格填写 0 到 100 的评分，越高越好。'),
    as_ready1: T('Everything is filled in. Press “Reveal the ranking” when you are ready.', 'Semua sudah terisi. Tekan “Tampilkan peringkat” kalau sudah siap.', 'すべて入力できました。準備ができたら「ランキングを表示」を押してください。', '全部填写完毕。准备好后点击“揭晓排名”。'),
    as_1a: T('Not sure where to start? Press Example to load a filled case.', 'Bingung mulai dari mana? Tekan Contoh untuk memuat kasus yang sudah terisi.', '迷ったら「例」を押して入力済みのケースを読み込みましょう。', '不知从何开始？点击“示例”载入已填好的案例。'),
    as_1b: T('Use a low rating when an alternative is weak on an attribute, and 100 when it is excellent.', 'Pakai nilai rendah jika alternatif lemah pada suatu atribut, dan 100 jika sangat baik.', '属性で弱い代替案は低く、優れていれば100を付けます。', '方案在某属性上较弱就打低分，非常出色就打 100。'),
    as_1c: T('Pressed ✕ by mistake? Use Undo in the notification.', 'Salah tekan ✕? Pakai Batalkan di notifikasi.', '✕ を誤って押しても、通知の「元に戻す」で戻せます。', '误点了 ✕？可在通知里点击“撤销”。'),
    as_2a: T('Tap an alternative (the 🔍 icon) to see how its score is built.', 'Ketuk sebuah alternatif (ikon 🔍) untuk melihat cara skornya dibentuk.', '代替案（🔍）をタップすると、スコアの内訳が見られます。', '点按某个方案（🔍 图标）可查看其得分构成。'),
    as_2b: T('The coloured segments show how much each attribute adds to the score.', 'Segmen berwarna menunjukkan seberapa besar tiap atribut menambah skor.', '色付きの区間は、各属性がスコアに加える大きさを示します。', '彩色分段显示各属性为得分贡献了多少。'),
    as_2c: T('Curious how stable the winner is? Press “Stress-test it”.', 'Penasaran seberapa kokoh pemenangnya? Tekan “Uji ketahanan”.', '勝者がどれだけ安定か気になりますか？「ストレステスト」を押しましょう。', '想知道获胜者有多稳？点击“压力测试”。'),
    as_3a: T('Click a line in the chart to see its data at that point.', 'Klik sebuah garis pada grafik untuk melihat datanya di titik itu.', 'グラフの線をクリックすると、その点のデータが見られます。', '点击图中的线条可查看该点的数据。'),
    as_3b: T('Drag the slider: does the leader change? That tells you how fragile the result is.', 'Geser slider: apakah pemimpinnya berganti? Itu menunjukkan seberapa rapuh hasilnya.', 'スライダーを動かして、首位が入れ替わるか見てみましょう。結果の脆さが分かります。', '拖动滑块，领先者会变吗？这能反映结果有多脆弱。'),
    as_3c: T('Dashed red lines mark the weights where the winner switches.', 'Garis putus-putus merah menandai bobot tempat pemenang berganti.', '赤い点線は勝者が入れ替わる重みを示します。', '红色虚线标出获胜者切换的权重。'),
    as_3d: T('Try another attribute in the dropdown. Some matter more than others.', 'Coba atribut lain di dropdown. Ada yang lebih berpengaruh dari yang lain.', 'ドロップダウンで別の属性も試しましょう。影響の大きさは属性ごとに違います。', '在下拉框中试试其他属性，有些影响更大。'),
    as_4a: T('You can download this analysis as PDF, HTML or Markdown below.', 'Kamu bisa mengunduh analisis ini sebagai PDF, HTML, atau Markdown di bawah.', '下から、この分析を PDF・HTML・Markdown でダウンロードできます。', '你可以在下方将此分析下载为 PDF、HTML 或 Markdown。'),
    as_4b: T('Want to change something? Press Back and this conclusion updates.', 'Ingin mengubah sesuatu? Tekan Kembali dan simpulan ini ikut berubah.', '変更したいときは「戻る」を押すと、結論も更新されます。', '想修改内容？点击“返回”，结论会随之更新。'),
    as_4c: T('The conclusion is only as good as your weights and ratings. Double-check them.', 'Simpulan hanya sebaik bobot dan nilai yang kamu isi. Periksa lagi ya.', '結論は入力した重みと評価の質次第です。もう一度確認しましょう。', '结论的可靠性取决于你填的权重和评分，请再核对一下。'),
    as_name: T('Bit', 'Bit', 'ビット', '比特'), as_hide: T('Hide assistant', 'Sembunyikan asisten', 'アシスタントを隠す', '隐藏助手'), as_show: T('Show assistant', 'Tampilkan asisten', 'アシスタントを表示', '显示助手'), as_close: T('Close', 'Tutup', '閉じる', '关闭')
  };
  const strings = { en: {}, id: {}, ja: {}, zh: {} };
  Object.keys(TIPS).forEach(k => ['en', 'id', 'ja', 'zh'].forEach(l => { strings[l][k] = TIPS[k][l]; }));
  MBALAB.sims.define('smart-decision-studio', { strings });

  const ART = `<svg class="bot-art" viewBox="0 0 64 80" aria-hidden="true">
    <defs><linearGradient id="botG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#c4b5fd"/></linearGradient></defs>
    <g class="legL"><rect x="21" y="56" width="8" height="18" rx="4" fill="#475b8f"/><rect x="18" y="71" width="14" height="6" rx="3" fill="#2f3f6b"/></g>
    <g class="legR"><rect x="35" y="56" width="8" height="18" rx="4" fill="#475b8f"/><rect x="32" y="71" width="14" height="6" rx="3" fill="#2f3f6b"/></g>
    <g class="armL"><rect x="6" y="40" width="7" height="16" rx="3.5" fill="#6d82b8"/></g>
    <g class="armR"><rect x="51" y="40" width="7" height="16" rx="3.5" fill="#6d82b8"/></g>
    <rect x="14" y="38" width="36" height="24" rx="9" fill="#8ea4d8"/><rect x="24" y="45" width="16" height="9" rx="4.5" fill="#fff" opacity=".35"/>
    <g class="head"><line x1="32" y1="4" x2="32" y2="12" stroke="#8ea4d8" stroke-width="3" stroke-linecap="round"/><circle class="ant" cx="32" cy="4" r="3.6" fill="#fbbf24"/>
    <rect x="10" y="12" width="44" height="30" rx="13" fill="url(#botG)"/><rect x="16" y="19" width="32" height="16" rx="8" fill="#0d1530"/>
    <g class="eyes"><ellipse cx="25" cy="27" rx="3.6" ry="4.4" fill="#7dd3fc"/><ellipse cx="39" cy="27" rx="3.6" ry="4.4" fill="#7dd3fc"/></g></g></svg>`;

  window.SmartAssistant = {
    create(host, ctx) {
      const root = host.querySelector('#sd'); if (!root || root.querySelector('.sd-bot')) return;
      const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      const bot = document.createElement('div');
      bot.className = 'sd-bot';
      bot.innerHTML = '<div class="bubble" role="status" aria-live="polite" hidden><button type="button" class="bx" data-bclose></button><div class="bn"></div><p class="bt"></p><button type="button" class="bh" data-bhide></button></div>' +
        '<button type="button" class="body" data-bbody><span class="flip">' + ART + '</span></button>';
      const back = document.createElement('button');
      back.type = 'button'; back.className = 'sd-bot-show'; back.hidden = true; back.innerHTML = '<span class="flip">' + ART + '</span>';
      root.appendChild(bot); root.appendChild(back);
      const $b = s => bot.querySelector(s), bubble = $b('.bubble'), body = $b('.body'), flip = $b('.flip');
      const W = () => root.clientWidth, BW = 64;
      let x = 24, lastAct = performance.now(), lastTipEnd = -1e9, hidden = false, speaking = false, key = null, hideT = 0, walkT = 0, recent = [];
      const label = () => { $b('.bn').textContent = t('as_name'); $b('.bh').textContent = t('as_hide'); $b('.bx').setAttribute('aria-label', t('as_close')); $b('.bx').textContent = '✕'; back.title = back.ariaLabel = t('as_show'); body.title = t('as_name'); };
      label();

      /* ---- walking ---- */
      const place = px => { x = px; bot.style.left = px + 'px'; };
      const stand = () => { bot.classList.remove('walk'); clearTimeout(walkT); };
      function walk() {
        clearTimeout(walkT);
        if (hidden || speaking || reduced() || !root.isConnected || root.offsetParent === null) { walkT = setTimeout(walk, 1500); return; }
        const to = 12 + Math.random() * Math.max(10, W() - BW - 24), dist = Math.abs(to - x), ms = Math.max(800, dist / 38 * 1000);
        flip.style.transform = to < x ? 'scaleX(-1)' : 'scaleX(1)';
        bot.classList.add('walk'); bot.style.transition = `left ${ms}ms linear`; place(to);
        walkT = setTimeout(() => { bot.classList.remove('walk'); bot.style.transition = ''; walkT = setTimeout(walk, 1200 + Math.random() * 3200); }, ms);
      }
      const freeze = () => { const r = bot.getBoundingClientRect(), rr = root.getBoundingClientRect(); bot.style.transition = 'none'; place(r.left - rr.left); stand(); };

      /* ---- tips ---- */
      function pickTip() {
        const h = ctx.hints(), pool = [...h.state, ...h.generic];
        const fresh = pool.filter(k => !recent.includes(k)), list = fresh.length ? fresh : pool;
        const k = list[0]; recent.push(k); if (recent.length > Math.min(3, pool.length - 1)) recent.shift();
        return k;
      }
      function say(k) {
        if (hidden) return;
        freeze(); speaking = true; key = k;
        $b('.bt').textContent = t(k); label(); bubble.hidden = false; bot.classList.add('talk');
        const bw = Math.min(290, W() - 24), cx = x + BW / 2;
        bubble.style.width = bw + 'px';
        { const bt = $b('.bt'); bt.style.minHeight = bt.offsetHeight + 'px'; if (window.MBALAB && MBALAB.fx) MBALAB.fx.type(bt, { cps: 60 }); }
        const left = Math.max(8, Math.min(cx - bw / 2, W() - bw - 8)) - x;
        bubble.style.left = left + 'px';
        bubble.style.setProperty('--tail', Math.max(14, Math.min(bw - 14, cx - (x + left) - 0)) + 'px');
        clearTimeout(hideT); hideT = setTimeout(() => stopSpeaking(true), 9000);
      }
      function stopSpeaking(auto) {
        if (!speaking) return;
        speaking = false; key = null; bubble.hidden = true; bot.classList.remove('talk'); lastTipEnd = performance.now();
        clearTimeout(hideT); clearTimeout(walkT); walkT = setTimeout(walk, 900);
      }
      const activity = () => { lastAct = performance.now(); if (speaking && performance.now() - lastSayAt > 1200) stopSpeaking(); };
      let lastSayAt = 0;
      const say2 = k => { lastSayAt = performance.now(); say(k); };

      ['pointerdown', 'keydown', 'input', 'wheel', 'touchstart'].forEach(ev => host.addEventListener(ev, e => { if (!bot.contains(e.target)) activity(); }, true));
      let pm = 0; host.addEventListener('pointermove', e => { const n = performance.now(); if (n - pm > 250 && !bot.contains(e.target)) { pm = n; activity(); } }, true);
      host.addEventListener('scroll', () => activity(), true);

      setInterval(() => {
        if (hidden || speaking || !root.isConnected || root.offsetParent === null) return;
        if (document.querySelector('#simload:not([hidden])') || (host.querySelector('#sdGuide') && !host.querySelector('#sdGuide').hidden)) { lastAct = performance.now(); return; }
        const n = performance.now();
        if (n - lastAct >= 3000 && n - lastTipEnd >= 8000) say2(pickTip());
      }, 400);

      bot.addEventListener('click', e => {
        if (e.target.closest('[data-bclose]')) { stopSpeaking(); return; }
        if (e.target.closest('[data-bhide]')) { stopSpeaking(); hidden = true; bot.hidden = true; back.hidden = false; return; }
        if (e.target.closest('[data-bbody]')) { if (speaking) stopSpeaking(); else say2(pickTip()); }
      });
      back.addEventListener('click', () => { hidden = false; bot.hidden = false; back.hidden = true; lastAct = performance.now(); say2(pickTip()); });
      MBALAB.on('lang', () => { label(); if (speaking && key) $b('.bt').textContent = t(key); });

      place(24); setTimeout(walk, 1500);
    }
  };
})();
