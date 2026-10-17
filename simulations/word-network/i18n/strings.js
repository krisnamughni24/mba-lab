/* Word Network texts. Every key is [en, id, ja, zh]. Words typed or shown in the network are English (the data set is English). */
(() => {
  const L = ['en', 'id', 'ja', 'zh'];
  const K = {
    title: ['Word Network', 'Jaringan Kata', 'ワード・ネットワーク', '词语网络'],
    modeExp: ['Explore', 'Jelajah', '探索', '探索'], modeQz: ['Predict', 'Tebak', '予測', '预测'],
    ph: ['Type an English word, e.g. brand', 'Ketik satu kata Inggris, mis. brand', '英単語を入力（例: brand）', '输入一个英文单词，如 brand'],
    add: ['Add', 'Tambah', '追加', '添加'], remove: ['Remove', 'Hapus', '削除', '移除'],
    prog: ['Words in the network: {n}', 'Kata di jaringan: {n}', 'ネットワーク内の語: {n}', '网络中的词: {n}'],
    starters: ['Start with:', 'Mulai dari:', 'はじめに:', '从这里开始：'],
    selEmpty: ['Add one word, then a second, a third... and watch how they connect.', 'Tambahkan satu kata, lalu kedua, ketiga... dan lihat bagaimana mereka terhubung.', 'まず1語、次に2語目、3語目と追加して、つながりを見よう。', '先加一个词，再加第二个、第三个……看它们如何连接。'],
    mapEmpty: ['Add a word to start', 'Tambahkan kata untuk mulai', '語を追加して開始', '添加一个词开始'],
    unknown: ['"{w}" is not in the data set. Try one of the suggestions.', '"{w}" tidak ada di dataset. Coba salah satu saran.', '"{w}" はデータにありません。候補から選んでください。', '数据中没有 “{w}”，请试试建议词。'],
    dup: ['"{w}" is already in the network.', '"{w}" sudah ada di jaringan.', '"{w}" はすでに追加済みです。', '“{w}” 已在网络中。'],
    max: ['Up to 5 words at a time. Remove one first.', 'Maksimal 5 kata sekaligus. Hapus satu dulu.', '同時に5語までです。1語削除してください。', '最多同时 5 个词，请先移除一个。'],
    cardOne: ['People most often think of these when they hear "{w}"', 'Orang paling sering teringat ini saat mendengar "{w}"', '"{w}" と聞いて最も多く連想される語', '听到 “{w}” 时人们最常想到'],
    cardMany: ['Words that connect {ws}', 'Kata yang menghubungkan {ws}', '{ws} をつなぐ語', '连接 {ws} 的词'],
    strength: ['strength', 'kekuatan', '強さ', '强度'], links: ['{k} of {n}', '{k} dari {n}', '{n}語中{k}語', '{n} 个中的 {k} 个'],
    direct: ['Direct link between "{a}" and "{b}": {s}', 'Hubungan langsung "{a}" dan "{b}": {s}', '"{a}" と "{b}" の直接の結びつき: {s}', '“{a}” 与 “{b}” 的直接联系：{s}'],
    noDirect: ['No direct link between "{a}" and "{b}".', 'Tidak ada hubungan langsung "{a}" dan "{b}".', '"{a}" と "{b}" の直接の結びつきはありません。', '“{a}” 与 “{b}” 没有直接联系。'],
    noBridge: ['No word connects all of these. They live in separate neighbourhoods: that gap is the insight.', 'Tidak ada kata yang menghubungkan semuanya. Mereka berada di lingkungan berbeda: celah itulah temuannya.', 'すべてをつなぐ語はありません。別々の領域にある、その隔たりが発見です。', '没有同时连接它们的词。它们属于不同的领域：这个空隙就是发现。'],
    partial: ['Words linked to only some of the inputs are shown too.', 'Kata yang hanya terhubung ke sebagian input juga ditampilkan.', '一部の入力にだけつながる語も表示しています。', '也显示仅与部分输入相连的词。'],
    clickHint: ['Click any bubble in the map to add it as a new word.', 'Klik gelembung di peta untuk menambahkannya sebagai kata baru.', 'マップの語をクリックすると新しい語として追加されます。', '点击图中的词泡即可把它加入。'],
    pairsT: ['Class prompts: pairs to try', 'Bahan diskusi kelas: pasangan untuk dicoba', '授業用: 試してみる組み合わせ', '课堂提示：可尝试的词对'],
    pairsAsk: ['Before you add the second word, guess: what will connect them?', 'Sebelum menambah kata kedua, tebak dulu: apa yang menghubungkan keduanya?', '2語目を追加する前に予想しよう。何がつなぐだろう？', '加入第二个词之前先猜：什么会连接它们？'],
    reset: ['Clear', 'Kosongkan', 'クリア', '清空'],
    guideT: ['How to read the network', 'Cara membaca jaringan', 'ネットワークの読み方', '如何阅读词语网络'],
    g1: ['Big coloured bubbles are your words. Small bubbles are what people answered when asked for the first word that comes to mind.', 'Gelembung besar berwarna adalah kata Anda. Gelembung kecil adalah jawaban orang ketika diminta menyebut kata pertama yang terlintas.', '大きな色付きの円があなたの語。小さな円は「最初に思い浮かぶ語」への回答です。', '大的彩色气泡是你的词，小气泡是人们被问到“第一个想到的词”时的回答。'],
    g2: ['Gold bubbles link two or more of your words. Thicker lines mean a stronger association.', 'Gelembung emas menghubungkan dua kata Anda atau lebih. Garis lebih tebal berarti asosiasi lebih kuat.', '金色の円は2語以上をつなぐ語。線が太いほど連想が強い。', '金色气泡连接两个或更多的词，线越粗联系越强。'],
    g3: ['An association is what people say, not what is true. Use it to see how customers frame a topic, then test it with real data.', 'Asosiasi adalah apa yang dikatakan orang, bukan kebenaran. Gunakan untuk melihat bagaimana pelanggan membingkai suatu topik, lalu uji dengan data nyata.', '連想は人々の答えであり、事実ではありません。顧客の捉え方を知る手がかりにし、実データで検証しましょう。', '联想是人们说出的内容，并非事实。用它了解顾客如何看待某个主题，再用真实数据检验。'],
    gotIt: ['Got it', 'Mengerti', 'わかった', '知道了'], info: ['How this works', 'Cara kerjanya', '使い方', '使用说明'], close: ['Close', 'Tutup', '閉じる', '关闭'],
    hint: ['Add words above, or tap a prompt below. Switch to Predict to test your intuition.', 'Tambahkan kata di atas atau ketuk bahan diskusi di bawah. Pindah ke Tebak untuk menguji intuisi Anda.', '上で語を追加するか、下のお題を選ぼう。「予測」で直感を試せます。', '在上方添加词语，或点下方的提示。切换到“预测”测试你的直觉。'],
    qN: ['Question {n}/{m}', 'Pertanyaan {n}/{m}', '問題 {n}/{m}', '第 {n}/{m} 题'], qScore: ['Score {s}', 'Skor {s}', 'スコア {s}', '得分 {s}'],
    qTop: ['Which word do people say most often when they hear "{w}"?', 'Kata apa yang paling sering disebut orang saat mendengar "{w}"?', '"{w}" と聞いて最も多く答えられる語は？', '听到 “{w}” 时，人们最常说出哪个词？'],
    qBridge: ['Which word is most strongly linked to both "{a}" and "{b}"?', 'Kata apa yang paling kuat terhubung dengan "{a}" dan "{b}" sekaligus?', '"{a}" と "{b}" の両方に最も強くつながる語は？', '哪个词同时与 “{a}” 和 “{b}” 联系最强？'],
    ok: ['Correct!', 'Benar!', '正解！', '正确！'], bad: ['Not quite. The answer is "{ans}".', 'Belum tepat. Jawabannya "{ans}".', '惜しい。正解は "{ans}"。', '不太对，答案是 “{ans}”。'],
    seeIn: ['See it in the network', 'Lihat di jaringan', 'ネットワークで見る', '在网络中查看'], next: ['Next', 'Lanjut', '次へ', '下一题'], seeRes: ['See result', 'Lihat hasil', '結果を見る', '查看结果'],
    rsTitle: ['Round finished', 'Ronde selesai', 'ラウンド終了', '本轮结束'], rsScore: ['{s} of {m} correct', '{s} dari {m} benar', '{m}問中 {s}問正解', '{m} 题答对 {s} 题'],
    rsRead: ['Your intuition matches how people associate words.', 'Intuisi Anda sejalan dengan cara orang mengasosiasikan kata.', 'あなたの直感は人々の連想とよく一致しています。', '你的直觉与人们的联想相当一致。'],
    rsLow: ['Surprises are the useful part: where your guess differs from the crowd, customers may see things differently from you.', 'Kejutan adalah bagian yang berguna: saat tebakan Anda berbeda dari kebanyakan orang, pelanggan mungkin melihatnya berbeda dari Anda.', '意外な結果こそ収穫です。予想と大衆の差は、顧客の見方の違いかもしれません。', '意外才是收获：你的猜测与大众不同之处，也许正是顾客与你看法不同之处。'],
    again: ['Play again', 'Main lagi', 'もう一度', '再玩一次'], backExp: ['Back to explore', 'Kembali menjelajah', '探索に戻る', '返回探索'],
    credit: ['Data: Small World of Words English association norms (SWOW-EN, 2018), De Deyne, Navarro, Perfors, Brysbaert & Storms, Behavior Research Methods. Licence CC BY-NC-ND 3.0, for non-commercial research and teaching. smallworldofwords.org', 'Data: norma asosiasi kata bahasa Inggris Small World of Words (SWOW-EN, 2018), De Deyne, Navarro, Perfors, Brysbaert & Storms, Behavior Research Methods. Lisensi CC BY-NC-ND 3.0, untuk riset dan pengajaran nonkomersial. smallworldofwords.org', 'データ: Small World of Words 英語連想規範（SWOW-EN, 2018）De Deyne, Navarro, Perfors, Brysbaert & Storms, Behavior Research Methods。CC BY-NC-ND 3.0、非営利の研究・教育用。smallworldofwords.org', '数据：Small World of Words 英语联想常模（SWOW-EN，2018），De Deyne、Navarro、Perfors、Brysbaert 与 Storms，Behavior Research Methods。CC BY-NC-ND 3.0，仅限非商业研究与教学。smallworldofwords.org']
  };
  const strings = { en: {}, id: {}, ja: {}, zh: {} };
  Object.keys(K).forEach(k => L.forEach((l, i) => { strings[l][k] = K[k][i]; }));
  MBALAB.sims.define('word-network', { strings });
})();
