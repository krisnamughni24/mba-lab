/* Texts. Every key is [en, id, ja, zh]. Add keys here, then use them with data-i18n="key" in the markup or t('key', {n: 1}) in code. */
(() => {
  const L = ['en', 'id', 'ja', 'zh'];
  const K = {
    title: ['Lemonade Pricing', 'Harga Limun', 'レモネードの価格', '柠檬水定价'],
    hero: ['Find the price that earns the most', 'Temukan harga yang paling menguntungkan', '最も儲かる価格を見つけよう', '找到利润最高的价格'],
    heroSub: ['Three stands, three markets. Set a price, then see how close you got to the best one.', 'Tiga lapak, tiga pasar. Tentukan harga, lalu lihat seberapa dekat Anda dengan harga terbaik.', '3つの屋台、3つの市場。価格を決めて、最適価格にどれだけ近いかを見よう。', '三个摊位，三个市场。定一个价格，看看离最优价格有多近。'],
    rk0: ['Street seller', 'Pedagang kaki lima', '路上の売り子', '街头小贩'], rk1: ['Shop owner', 'Pemilik toko', '店主', '店主'], rk2: ['Pricing pro', 'Ahli harga', '価格のプロ', '定价高手'],
    xpLbl: ['{n} XP', '{n} XP', '{n} XP', '{n} XP'], xpNext: ['Next rank at {n} XP', 'Peringkat berikutnya di {n} XP', '次のランクは {n} XP', '下一级需 {n} XP'], xpMax: ['Top rank reached', 'Peringkat tertinggi', '最高ランク', '已达最高等级'],
    lvN: ['Level {n}', 'Level {n}', 'レベル {n}', '第 {n} 关'], lvLock: ['Earn 1 star in the previous level', 'Raih 1 bintang di level sebelumnya', '前のレベルで★1つ獲得', '上一关获得 1 颗星'],
    lv1: ['Beach stand', 'Lapak pantai', 'ビーチの屋台', '海滩摊位'], lv2: ['School gate', 'Depan sekolah', '校門前', '校门口'], lv3: ['City festival', 'Festival kota', '街のお祭り', '城市节'],
    lv1d: ['Hot day, many tourists.', 'Hari panas, banyak turis.', '暑い日、観光客が多い。', '天气炎热，游客很多。'], lv2d: ['Small budgets, many students.', 'Uang saku kecil, banyak murid.', 'お小遣いは少なめ、生徒が多い。', '预算有限，学生很多。'], lv3d: ['Huge crowd, high costs.', 'Ramai sekali, biaya tinggi.', '大混雑、コストも高い。', '人潮汹涌，成本也高。'],
    bdT: ['Badges', 'Lencana', 'バッジ', '徽章'], bd_first: ['First sale', 'Penjualan pertama', '初めての販売', '首次成交'], bdd_first: ['Finish any level', 'Selesaikan level apa pun', 'どれかのレベルをクリア', '完成任意一关'], bd_star: ['Sweet spot', 'Titik manis', 'スイートスポット', '最佳点'], bdd_star: ['Earn 3 stars once', 'Raih 3 bintang sekali', '★3つを1回獲得', '获得一次三星'],
    toMenu: ['Menu', 'Menu', 'メニュー', '菜单'], st1: ['Set price', 'Tentukan harga', '価格を決める', '定价'], st2: ['Result', 'Hasil', '結果', '结果'],
    say1: ['Drag the slider. Too low and you sell a lot for little; too high and nobody buys.', 'Geser slider. Terlalu murah untung tipis; terlalu mahal tidak ada yang beli.', 'スライダーを動かそう。安すぎると薄利、高すぎると売れない。', '拖动滑块。太低利润薄，太高没人买。'],
    say2: ['Here is how you did against the best price.', 'Begini hasil Anda dibanding harga terbaik.', '最適価格との比較結果です。', '这是你与最优价格的对比。'],
    priceL: ['Your price', 'Harga Anda', 'あなたの価格', '你的价格'], price: ['Your price: {p}', 'Harga Anda: {p}', 'あなたの価格：{p}', '你的价格：{p}'], sell: ['Sell at this price', 'Jual dengan harga ini', 'この価格で売る', '以此价格出售'],
    profit: ['Profit', 'Laba', '利益', '利润'], best: ['Best possible', 'Terbaik yang mungkin', '最高の利益', '最佳利润'], score: ['Score {s}%', 'Skor {s}%', 'スコア {s}%', '得分 {s}%'],
    again: ['Try again', 'Coba lagi', 'もう一度', '再试一次'], next: ['Next level →', 'Level berikutnya →', '次のレベル →', '下一关 →']
  };
  const strings = { en: {}, id: {}, ja: {}, zh: {} };
  Object.keys(K).forEach(k => L.forEach((l, i) => { strings[l][k] = K[k][i]; }));
  MBALAB.sims.define('my-simulation', { strings });
})();
