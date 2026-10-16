/* Texts. Every key is [en, id, ja, zh]. Add keys here, then use them with data-i18n="key" in the markup or t('key', {n: 1}) in code. */
(() => {
  const L = ['en', 'id', 'ja', 'zh'];
  const K = {
    title: ['Business Functions Explorer', 'Penjelajah Fungsi Bisnis', 'ビジネス機能エクスプローラー', '商业职能探索器'],
    modeExp: ['Explore', 'Jelajah', '探索', '探索'], modeQz: ['Quiz', 'Kuis', 'クイズ', '测验'],
    prog: ['Seen {n}/{m}', 'Dilihat {n}/{m}', '閲覧 {n}/{m}', '已看 {n}/{m}'], all: ['All areas', 'Semua bidang', 'すべての分野', '全部领域'],
    fin: ['Finance', 'Keuangan', '財務', '财务'], mkt: ['Marketing', 'Pemasaran', 'マーケティング', '市场营销'], ops: ['Operations', 'Operasional', 'オペレーション', '运营'],
    hint: ['Click a dot on the map or a name in the list to read about it.', 'Klik titik di peta atau nama di daftar untuk membacanya.', '地図の点か一覧の名前をクリックして読もう。', '点击地图上的点或列表中的名称阅读。'],
    listT: ['All topics', 'Semua topik', 'すべてのトピック', '全部主题'], visited: ['Visited', 'Sudah dilihat', '閲覧済み', '已浏览'], close: ['Close', 'Tutup', '閉じる', '关闭'],
    info: ['How this works', 'Cara kerjanya', '使い方', '使用说明'], guideT: ['How to explore', 'Cara menjelajah', '探索の仕方', '如何探索'], g1: ['Colours show the area. Use the chips to filter.', 'Warna menunjukkan bidang. Pakai chip untuk menyaring.', '色は分野を表す。チップで絞り込み。', '颜色代表领域，用标签筛选。'], g2: ['Switch to Quiz to test what you saw.', 'Beralih ke Kuis untuk menguji yang Anda lihat.', 'クイズに切り替えて確認しよう。', '切换到测验检验所学。'], gotIt: ['Got it', 'Mengerti', 'わかった', '知道了'],
    qN: ['Question {n}/{m}', 'Pertanyaan {n}/{m}', '問題 {n}/{m}', '第 {n}/{m} 题'], qScore: ['Score {s}', 'Skor {s}', 'スコア {s}', '得分 {s}'], qAsk: ['Which area does this belong to?', 'Termasuk bidang apa ini?', 'これはどの分野？', '这属于哪个领域？'],
    ok: ['Correct!', 'Benar!', '正解！', '正确！'], bad: ['Not quite. It is {ans}.', 'Belum tepat. Jawabannya {ans}.', '惜しい。正解は {ans}。', '不太对，答案是 {ans}。'], next: ['Next', 'Berikutnya', '次へ', '下一题'], seeRes: ['See result', 'Lihat hasil', '結果を見る', '查看结果'],
    rsTitle: ['Quiz finished', 'Kuis selesai', 'クイズ終了', '测验结束'], rsScore: ['{s} of {m} correct', '{s} dari {m} benar', '{m}問中 {s}問正解', '{m} 题答对 {s} 题'], again: ['Play again', 'Main lagi', 'もう一度', '再来一次'], backExp: ['Back to exploring', 'Kembali menjelajah', '探索に戻る', '返回探索'],
    t_budget: ['Budgeting', 'Penganggaran', '予算編成', '预算编制'], d_budget: ['Plan how much money each team may spend.', 'Merencanakan berapa dana tiap tim boleh dipakai.', '各チームが使える金額を計画する。', '规划各团队可使用的资金。'],
    t_cash: ['Cash flow', 'Arus kas', 'キャッシュフロー', '现金流'], d_cash: ['Track money in and out so bills are always paid.', 'Memantau uang masuk dan keluar agar tagihan selalu terbayar.', '入出金を追い、支払いを滞らせない。', '跟踪资金进出，确保账单按时支付。'],
    t_audit: ['Audit', 'Audit', '監査', '审计'], d_audit: ['Check that numbers are honest and rules are followed.', 'Memeriksa angka jujur dan aturan dipatuhi.', '数字の正しさとルール遵守を確認する。', '检查数字是否真实、规则是否遵守。'],
    t_brand: ['Branding', 'Branding', 'ブランディング', '品牌建设'], d_brand: ['Decide how customers recognise and remember you.', 'Menentukan bagaimana pelanggan mengenali dan mengingat Anda.', '顧客にどう認識・記憶されるかを決める。', '决定顾客如何识别并记住你。'],
    t_pricing: ['Pricing', 'Penetapan harga', '価格設定', '定价'], d_pricing: ['Set the price that balances demand and profit.', 'Menetapkan harga yang menyeimbangkan permintaan dan laba.', '需要と利益のバランスが取れる価格を決める。', '制定平衡需求与利润的价格。'],
    t_ads: ['Advertising', 'Periklanan', '広告', '广告'], d_ads: ['Reach new customers with paid messages.', 'Menjangkau pelanggan baru lewat pesan berbayar.', '有料メッセージで新規顧客に届ける。', '用付费信息触达新客户。'],
    t_stock: ['Inventory', 'Persediaan', '在庫管理', '库存管理'], d_stock: ['Keep enough goods without piling up waste.', 'Menyimpan barang secukupnya tanpa menumpuk sisa.', '無駄を出さず必要な在庫を保つ。', '备足货物又不堆积浪费。'],
    t_ship: ['Logistics', 'Logistik', '物流', '物流'], d_ship: ['Move goods from supplier to customer on time.', 'Mengirim barang dari pemasok ke pelanggan tepat waktu.', '仕入先から顧客へ期日通りに届ける。', '按时把货从供应商送到客户。'],
    t_quality: ['Quality control', 'Kendali mutu', '品質管理', '质量控制'], d_quality: ['Catch defects before customers do.', 'Menangkap cacat sebelum pelanggan menemukannya.', '顧客より先に不良を見つける。', '赶在顾客之前发现缺陷。']
  };
  const strings = { en: {}, id: {}, ja: {}, zh: {} };
  Object.keys(K).forEach(k => L.forEach((l, i) => { strings[l][k] = K[k][i]; }));
  MBALAB.sims.define('my-simulation', { strings });
})();
