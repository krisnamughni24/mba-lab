/* Texts. Every key is [en, id, ja, zh]. Add keys here, then use them with data-i18n="key" in the markup or t('key', {n: 1}) in code. */
(() => {
  const L = ['en', 'id', 'ja', 'zh'];
  const K = {
    title: ['Bakery Orders', 'Pesanan Toko Roti', 'パン屋の発注', '面包店订货'],
    pick: ['Choose a scenario', 'Pilih skenario', 'シナリオを選ぼう', '选择情景'],
    pickSub: ['Order flour each day. Order too little and customers leave; too much and it spoils.', 'Pesan tepung setiap hari. Terlalu sedikit pelanggan pergi; terlalu banyak jadi basi.', '毎日小麦粉を発注。少なすぎると客が帰り、多すぎると傷む。', '每天订面粉。太少顾客流失，太多会变质。'],
    sc1: ['Quiet street', 'Jalan sepi', '静かな通り', '安静的街道'], sc1d: ['Steady demand, small swings.', 'Permintaan stabil, naik turun kecil.', '安定した需要、小さな変動。', '需求稳定，波动小。'],
    sc2: ['Market day', 'Hari pasar', '市の日', '赶集日'], sc2d: ['Demand jumps every other day.', 'Permintaan melonjak tiap dua hari.', '1日おきに需要が急増。', '每隔一天需求激增。'],
    howT: ['How to play', 'Cara bermain', '遊び方', '玩法'], how1: ['Each day, set how many bags of flour to order.', 'Setiap hari, tentukan berapa karung tepung yang dipesan.', '毎日、発注する小麦粉の袋数を決める。', '每天决定订多少袋面粉。'], how2: ['Sales = the smaller of your stock and the demand.', 'Penjualan = yang lebih kecil antara stok dan permintaan.', '販売数＝在庫と需要の少ない方。', '销量 = 库存与需求中较小者。'], how3: ['Five days. Earn as much profit as you can.', 'Lima hari. Kumpulkan laba sebanyak mungkin.', '5日間。できるだけ多く稼ごう。', '共五天。尽量多赚利润。'],
    day: ['Day {n}/5', 'Hari {n}/5', '{n}日目／5', '第 {n}/5 天'], cash: ['Profit {v}', 'Laba {v}', '利益 {v}', '利润 {v}'],
    info: ['How this works', 'Cara kerjanya', '仕組み', '玩法说明'], guideT: ['Reading the stage', 'Membaca panggung', 'ステージの見方', '如何看画面'], guide1: ['The blue bar is your stock for today.', 'Batang biru adalah stok Anda hari ini.', '青いバーが今日の在庫。', '蓝色柱是今天的库存。'], guide2: ['The amber line is how many customers came.', 'Garis kuning adalah jumlah pelanggan yang datang.', '黄色い線が来店客数。', '黄线是到店顾客数。'], gotIt: ['Got it', 'Mengerti', 'わかった', '知道了'], gtip: ['Tip: look at yesterday before you order.', 'Tips: lihat kemarin sebelum memesan.', 'ヒント：発注前に昨日を見よう。', '提示：订货前先看看昨天。'],
    order: ['Bags to order: {n}', 'Karung dipesan: {n}', '発注数：{n}', '订购袋数：{n}'], go: ['Order and open the shop', 'Pesan dan buka toko', '発注して開店', '订货并开店'],
    log: ['Day {d}: stock {s}, customers {c}, sold {x}', 'Hari {d}: stok {s}, pelanggan {c}, terjual {x}', '{d}日目：在庫 {s}、来客 {c}、販売 {x}', '第 {d} 天：库存 {s}，顾客 {c}，售出 {x}'],
    done: ['Week finished', 'Minggu selesai', '1週間終了', '一周结束'], total: ['Total profit: {v}', 'Total laba: {v}', '総利益：{v}', '总利润：{v}'], again: ['Play again', 'Main lagi', 'もう一度', '再玩一次'], other: ['Other scenario', 'Skenario lain', '別のシナリオ', '其他情景']
  };
  const strings = { en: {}, id: {}, ja: {}, zh: {} };
  Object.keys(K).forEach(k => L.forEach((l, i) => { strings[l][k] = K[k][i]; }));
  MBALAB.sims.define('my-simulation', { strings });
})();
