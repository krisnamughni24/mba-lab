/* Koperasi: story events for the FISHING KAMPUNG mode (mode: 'fishing'). Same data format as data/events.js.
   Setting: Koperasi Mina Bahari. Chairman Haji Latif (tradition), young skipper Udin (new ideas), treasurer Bu Nur,
   Juragan Karim (the tengkulak who lends against the catch). Flags 'darmo' / 'dimas' are the tradition / modern sides, shared with the classic mode.
   'bonded' marks that the co-op let fishermen stay tied to the tengkulak (read by the ending lessons). */
(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  root.MBALAB = root.MBALAB || {}; const C = (MBALAB.coop = MBALAB.coop || {});
  const A = (e, i, j, z) => [e, i, j, z];
  const season = s => s.t % 4;
  const M = 'fishing';
  const X = [
    { id: 'fs_books', mode: M, turn: 0,
      t: A('The ledger from the harbour', 'Buku besar dari pelabuhan', '港の帳簿', '港口的账本'),
      b: A('Your first morning on the pier. The previous manager left, and the ledgers hold about Rp 40 million of boat and engine loans nobody has repaid. Treasurer Bu Nur watches how you react.',
        'Pagi pertama Anda di dermaga. Manajer lama pergi, dan buku besar memuat sekitar Rp 40 juta pinjaman perahu dan mesin yang belum dibayar. Bendahara Bu Nur mengamati reaksi Anda.',
        '桟橋での最初の朝。前任者は去り、帳簿には船とエンジンの未返済の貸付が約4,000万ルピアあります。会計係のヌールさんがあなたの対応を見守ります。',
        '你在码头的第一个早晨。前任经理走了，账本上有约4000万盾无人偿还的船只和发动机贷款。出纳努尔女士在观察你的反应。'),
      choices: [
        { id: 'a', l: A('Open the books to the members and write off the bad loans', 'Buka buku kepada anggota dan hapus buku pinjaman macet', '帳簿を組合員に公開し、不良貸付を償却する', '向社员公开账本并核销坏账'),
          r: A('The fishermen are surprised, then respectful. Bu Nur nods for the first time.', 'Para nelayan terkejut, lalu hormat. Bu Nur mengangguk untuk pertama kalinya.', '漁師たちは驚き、やがて敬意を示します。ヌールさんが初めてうなずきます。', '渔民先是吃惊，随后表示敬意。努尔女士第一次点了点头。'),
          eff: { cash: -10, legacy: -40, loans: -25, ethics: 12, satAll: 3, flag: 'audited' } },
        { id: 'b', l: A('Reschedule quietly and hope', 'Jadwal ulang diam-diam dan berharap', 'こっそり繰り延べて様子を見る', '悄悄展期并期待好转'),
          r: A('The numbers look cleaner on paper. The risk is still in the drawer.', 'Angka tampak lebih rapi di atas kertas. Risikonya masih tersimpan di laci.', '帳簿上はきれいになりますが、リスクは引き出しの中です。', '账面上整洁了些，风险仍留在抽屉里。'),
          eff: { legacy: -20, ethics: -6, flag: 'hidden' } },
        { id: 'c', l: A('Fish first, books later', 'Ikan dulu, buku belakangan', 'まず魚、帳簿は後回し', '先管鱼获，账本以后再说'),
          r: A('You focus on the catch. The old loans keep quietly slipping.', 'Anda fokus pada tangkapan. Pinjaman lama terus diam-diam menunggak.', '漁獲に集中します。古い貸付は静かに焦げ付き続けます。', '你专注于渔获，旧贷款仍在悄悄拖欠。'),
          eff: { ethics: -2, flag: 'later' } }] },

    { id: 'fs_juragan', mode: M, turn: 1, pre: { comp: 1 },
      t: A("Juragan Karim's advance", 'Panjar Juragan Karim', 'カリム親方の前貸し', '卡里姆老板的预付款'),
      b: A('Juragan Karim lends cash to fishermen for fuel and nets, on the condition that they sell the whole catch to him at his price. Poor fishermen say yes because he pays today.',
        'Juragan Karim meminjamkan uang tunai kepada nelayan untuk solar dan jaring, dengan syarat seluruh tangkapan dijual kepadanya dengan harganya. Nelayan miskin setuju karena ia membayar hari ini juga.',
        'カリム親方は燃料や網の資金を漁師に貸し付け、代わりに漁獲を全部自分の言い値で買い取ります。貧しい漁師は、その日のうちに現金が入るので承諾します。',
        '卡里姆老板借钱给渔民买柴油和渔网，条件是整船渔获都按他的价格卖给他。穷渔民因为他当天就付钱而答应了。'),
      choices: [
        { id: 'a', l: A('Offer a fair advance of your own', 'Tawarkan panjar sendiri yang adil', '協同組合の公正な前貸しを出す', '推出合作社自己的公平预付'),
          r: A('Some fishermen come back to the co-op. Your cash feels the strain.', 'Sebagian nelayan kembali ke koperasi. Kas Anda terasa terhimpit.', '一部の漁師が協同組合に戻ります。資金繰りは苦しくなります。', '一部分渔民回到了合作社，你的现金吃紧了。'),
          eff: { cash: -20, loans: 20, comp: -1, sat: { small: 5 }, ethics: 2 } },
        { id: 'b', l: A('Say nothing, he is also part of the harbour', 'Diam saja, ia juga bagian dari pelabuhan', '何も言わない。彼も港の一員だ', '不吭声，他也是港口的一分子'),
          r: A('Peace on the pier, and more of the catch goes his way.', 'Dermaga tenang, dan lebih banyak tangkapan jatuh ke tangannya.', '桟橋は平穏ですが、漁獲はますます彼のもとへ流れます。', '码头风平浪静，更多渔获流向了他。'),
          eff: { sat: { small: -4, trader: 2 }, flag: 'bonded' } },
        { id: 'c', l: A('Report the one-sided terms to the fisheries office (50% chance)', 'Laporkan syarat sepihak ke dinas perikanan (peluang 50%)', '一方的な条件を水産事務所に通報する（成功率50%）', '向渔业部门举报不公平条款（50%概率）'),
          rw: A('The office warns him. His terms soften, at least for now.', 'Dinas menegurnya. Syaratnya melunak, setidaknya untuk sementara.', '事務所が警告し、条件は少なくとも当面は緩みます。', '渔业部门警告了他，条件至少暂时缓和了。'),
          rl: A('Nothing happens, and he knows who complained.', 'Tidak terjadi apa-apa, dan ia tahu siapa yang mengadu.', '何も起きず、誰が通報したか彼には分かっています。', '什么也没发生，而且他知道是谁告的状。'),
          eff: { gamble: { p: .5, win: { comp: -1, sat: { small: 5 }, ethics: 2 }, lose: { sat: { small: -3 }, ethics: 1 } } } }] },

    { id: 'fs_storm', mode: M, turn: 4, pre: { defMul: [1.6, 2] },
      t: A('The west monsoon closes the sea', 'Musim barat menutup laut', '西風の季節で海が閉ざされる', '西季风封住了大海'),
      b: A('Waves three metres high. The boats stay on the sand for weeks, there is no catch and no income, and families ask the co-op for help to buy rice.',
        'Gelombang setinggi tiga meter. Perahu tertambat di pasir berminggu-minggu, tidak ada tangkapan dan penghasilan, dan keluarga meminta bantuan koperasi untuk membeli beras.',
        '3メートルの高波。船は何週間も浜に上がったまま、漁も収入もなく、家族は米を買うために協同組合に助けを求めます。',
        '三米高的巨浪。渔船在沙滩上搁了几个星期，没有渔获也没有收入，家家户户请求合作社帮忙买米。'),
      choices: [
        { id: 'a', l: A('Open the community fund for rice and school fees', 'Buka dana sosial untuk beras dan uang sekolah', '地域基金を開いて米と学費を支援する', '动用社会基金资助米粮和学费'),
          r: A('Hard weeks, but nobody goes hungry. The kampung remembers.', 'Minggu-minggu berat, tetapi tak seorang pun kelaparan. Kampung mengingatnya.', '厳しい数週間ですが、飢える人はいません。村は忘れません。', '日子艰难，但没人挨饿，渔村会记住这件事。'),
          eff: { cash: -15, sat: { small: 6, home: 5 }, social: 10, ethics: 2 } },
        { id: 'b', l: A('Give small loans against the next catch', 'Beri pinjaman kecil dengan jaminan tangkapan berikutnya', '次の漁獲を見込んで少額を貸す', '以下一网渔获为担保发放小额贷款'),
          r: A('It keeps families afloat. It also keeps them indebted.', 'Ini menjaga keluarga tetap bertahan. Juga membuat mereka berutang.', '家族は何とか持ちこたえますが、借金も増えます。', '这让家庭撑了下去，同时也让他们负了债。'),
          eff: { loans: 25, cash: -25, sat: { small: 3 } } },
        { id: 'c', l: A('Keep the doors open, but no help', 'Tetap buka, tanpa bantuan', '店は開けるが、支援はしない', '照常营业，但不提供帮助'),
          r: A('You protect the cash. Families look to Juragan Karim instead.', 'Anda menjaga kas. Keluarga beralih ke Juragan Karim.', '現金は守れますが、家族はカリム親方を頼ります。', '你保住了现金，家庭转而求助卡里姆老板。'),
          eff: { sat: { small: -6, home: -3 }, comp: 1 } }] },

    { id: 'fs_ice', mode: M, turn: 7,
      t: A("Udin's ice plant", 'Pabrik es Udin', 'ウディンの製氷所', '乌丁的制冰厂'),
      b: A('Young skipper Udin proposes an ice plant and a cold room at the pier. Fish in ice keep their price for days, but it costs money, and Haji Latif remembers when fish were simply salted.',
        'Nakhoda muda Udin mengusulkan pabrik es dan ruang pendingin di dermaga. Ikan yang diberi es mempertahankan harganya berhari-hari, tetapi butuh biaya, dan Haji Latif ingat zaman ikan cukup diasinkan.',
        '若手船長のウディンが、桟橋に製氷所と冷蔵室を作ることを提案します。氷漬けの魚は何日も値を保ちますが、費用がかかり、ラティフ師は魚を塩漬けにしていた時代を覚えています。',
        '年轻船长乌丁提议在码头建制冰厂和冷库。冰鲜的鱼几天都能保持价格，但要花钱，而哈吉·拉蒂夫还记得鱼只要腌就行的年代。'),
      choices: [
        { id: 'a', l: A('Build it now', 'Bangun sekarang', '今すぐ建設する', '立即建设'),
          r: A('Ice blocks slide down the chute for the first time. Buyers from town start calling.', 'Balok es meluncur di talang untuk pertama kalinya. Pembeli dari kota mulai menelepon.', '初めて氷のブロックがシュートを滑ります。町の買い手から電話が入り始めます。', '冰块第一次顺着滑槽滑下来，城里的买家开始打电话来。'),
          eff: { cash: -40, inv: { storage: 1 }, sat: { trader: 4, youth: 5 }, flag: 'dimas', unflag: 'darmo' } },
        { id: 'b', l: A('Start with a shared cold box', 'Mulai dengan kotak pendingin bersama', 'まず共用のクーラーボックスから始める', '先从共用保温箱开始'),
          r: A('A small step. It saves a few boxes of fish and proves the idea.', 'Langkah kecil. Menyelamatkan beberapa boks ikan dan membuktikan gagasannya.', '小さな一歩です。数箱の魚が助かり、アイデアの有効性も示せます。', '这是小小一步，保住了几箱鱼，也证明了这个想法。'),
          eff: { cash: -10, sat: { trader: 2, youth: 2 } } },
        { id: 'c', l: A('Not yet, salt has worked for generations', 'Belum, garam sudah dipakai turun-temurun', 'まだ早い。塩は何世代も役立ってきた', '暂时不要，盐用了好几代人了'),
          r: A('Haji Latif is pleased. Udin looks at the sea.', 'Haji Latif senang. Udin menatap laut.', 'ラティフ師は満足し、ウディンは海を見つめます。', '哈吉·拉蒂夫很满意，乌丁望向大海。'),
          eff: { sat: { youth: -5, trader: -2 }, flag: 'darmo' } }] },

    { id: 'fs_clash', mode: M, turn: 13,
      t: A('Two visions for the co-op', 'Dua visi untuk koperasi', '協同組合の二つのビジョン', '合作社的两种愿景'),
      b: A('Before the meeting, Haji Latif wants the old ways and steady loans to boat owners, while Udin wants new gear, better fish prices and young crews. Both ask for your public support.',
        'Menjelang rapat, Haji Latif ingin cara lama dan pinjaman stabil untuk pemilik perahu, sementara Udin ingin peralatan baru, harga ikan lebih baik, dan awak muda. Keduanya meminta dukungan terbuka Anda.',
        '総会を前に、ラティフ師は昔ながらのやり方と船主への安定した貸付を、ウディンは新しい漁具と魚の適正価格、若い乗組員を望みます。二人とも公の支持を求めています。',
        '大会之前，哈吉·拉蒂夫想要老办法和对船主的稳定贷款，乌丁则要新渔具、更好的鱼价和年轻船员。两人都要求你公开表态。'),
      choices: [
        { id: 'a', l: A('Back Haji Latif', 'Dukung Haji Latif', 'ラティフ師を支持する', '支持哈吉·拉蒂夫'),
          r: A('The boat owners cheer. The young crews go quiet.', 'Para pemilik perahu bersorak. Awak muda terdiam.', '船主は歓声を上げ、若い乗組員は黙り込みます。', '船主们欢呼，年轻船员沉默了。'),
          eff: { sat: { small: 5, big: 4, youth: -6 }, flag: 'darmo', unflag: 'dimas' } },
        { id: 'b', l: A('Back Udin', 'Dukung Udin', 'ウディンを支持する', '支持乌丁'),
          r: A('The young crews are energised. The old guard frowns.', 'Awak muda bersemangat. Golongan senior cemberut.', '若い乗組員は活気づき、年長者は眉をひそめます。', '年轻船员精神一振，老一辈皱起了眉头。'),
          eff: { sat: { youth: 8, small: -4 }, flag: 'dimas', unflag: 'darmo' } },
        { id: 'c', l: A('Form a joint committee', 'Bentuk panitia bersama', '合同委員会をつくる', '成立联合委员会'),
          r: A('Slow, but both sides feel heard.', 'Lambat, tetapi kedua pihak merasa didengar.', '遅いけれど、双方が話を聞いてもらえたと感じます。', '虽然慢，但双方都觉得被倾听了。'),
          eff: { cash: -8, satAll: 1, ethics: 2 } }] },

    { id: 'fs_redtide', mode: M, turn: 17, pre: { harvest: .4, defMul: [2, 3] },
      t: A('Red tide and a dead season', 'Pasang merah dan musim yang mati', '赤潮と不漁の季節', '赤潮与死寂的渔季'),
      b: A('A red tide poisons the bay and a storm tears nets from the fleet. Catches collapse this season, and many members will struggle to repay their loans.',
        'Pasang merah meracuni teluk dan badai merobek jaring armada. Tangkapan anjlok musim ini, dan banyak anggota akan kesulitan membayar pinjaman.',
        '赤潮が湾を汚染し、嵐が船団の網を引き裂きました。今期の漁獲は激減し、多くの組合員が返済に苦しみそうです。',
        '赤潮毒害了海湾，风暴又撕毁了船队的渔网。这个季度渔获骤减，许多社员将难以还款。'),
      choices: [
        { id: 'a', l: A('Reschedule loans and give relief', 'Jadwal ulang pinjaman dan beri bantuan', '貸付を繰り延べ、救済を行う', '贷款展期并提供救济'),
          r: A('Members will remember who stood by them.', 'Anggota akan ingat siapa yang mendampingi mereka.', '組合員は誰が寄り添ったかを忘れません。', '社员会记得是谁与他们站在一起。'),
          eff: { cash: -15, defMul: [1.2, 3], sat: { small: 8, big: 3 }, ethics: 3 } },
        { id: 'b', l: A('Collect as scheduled', 'Tagih sesuai jadwal', '予定どおり回収する', '按期催收'),
          r: A('The cash is safe. The goodwill is not.', 'Kas aman. Niat baik tidak.', '現金は守れますが、信頼は守れません。', '现金保住了，人心没有。'),
          eff: { sat: { small: -10, trader: -3 } } },
        { id: 'c', l: A('Apply for fisheries disaster aid (50% chance)', 'Ajukan bantuan bencana perikanan (peluang 50%)', '漁業災害支援を申請する（成功率50%）', '申请渔业灾害援助（50%概率）'),
          rw: A('The aid arrives: fuel vouchers and rice. It is not much, but it helps.', 'Bantuan tiba: voucher solar dan beras. Tidak banyak, tetapi membantu.', '燃料券と米の支援が届きます。多くはありませんが助けになります。', '援助到了：柴油券和大米，不多，但有帮助。'),
          rl: A('The paperwork stalls at the office.', 'Berkasnya macet di kantor.', '書類は事務所で止まってしまいます。', '申请材料卡在了办公室。'),
          eff: { gamble: { p: .5, win: { cash: 45, sat: { small: 4 } }, lose: { cash: -5, sat: { small: -2 } } } } }] },

    { id: 'fs_tpi', mode: M, turn: 21,
      t: A('Who runs the fish auction?', 'Siapa yang mengelola lelang ikan?', '魚の競りは誰が運営する？', '谁来运营鱼市拍卖？'),
      b: A('The district builds a new fish auction hall on the pier and asks who should run it. Juragan Karim also wants the job. Whoever runs it controls how the catch is weighed and priced.',
        'Pemerintah daerah membangun tempat pelelangan ikan baru di dermaga dan bertanya siapa yang akan mengelolanya. Juragan Karim juga menginginkannya. Siapa yang mengelola akan menentukan cara ikan ditimbang dan dihargai.',
        '郡が桟橋に新しい魚市場を建て、誰が運営するかを尋ねます。カリム親方も名乗りを上げています。運営者が、魚の計量と値付けを握ることになります。',
        '县里在码头建了新的鱼市拍卖厅，问谁来运营。卡里姆老板也想接手。谁运营，谁就掌握渔获的称重和定价。'),
      choices: [
        { id: 'a', l: A('Run it as a co-op with open weighing', 'Kelola sebagai koperasi dengan penimbangan terbuka', '協同組合が運営し、計量を公開する', '合作社运营并公开称重'),
          r: A('The scale faces the crowd. Prices become public, and more fishermen sell through you.', 'Timbangan menghadap kerumunan. Harga menjadi terbuka, dan makin banyak nelayan menjual lewat Anda.', '秤は皆の方を向き、価格は公開され、より多くの漁師があなたを通して売ります。', '秤面朝人群，价格公开，更多渔民通过你来卖鱼。'),
          eff: { cash: -25, inv: { tpi: 1 }, sat: { trader: 3, small: 5, big: -3 }, ethics: 3 } },
        { id: 'b', l: A('Lease it to a private operator', 'Sewakan kepada operator swasta', '民間事業者に貸し出す', '租给私人经营者'),
          r: A('Rent arrives on time. The fishermen start asking who gets the margin.', 'Uang sewa datang tepat waktu. Para nelayan mulai bertanya siapa yang mendapat selisihnya.', '賃料は期日どおり入りますが、漁師は差額を誰が得ているのかと聞き始めます。', '租金按时到账，渔民开始问差价进了谁的口袋。'),
          eff: { cash: 15, sat: { small: -5 }, ethics: -3 } },
        { id: 'c', l: A('Stay out of it', 'Tidak ikut campur', '関わらない', '不参与'),
          r: A('Juragan Karim gets it, and the co-op keeps its distance.', 'Juragan Karim mendapatkannya, dan koperasi menjaga jarak.', 'カリム親方が運営することになり、協同組合は距離を置きます。', '卡里姆老板拿下了，合作社保持距离。'),
          eff: { sat: { small: -3, trader: -2 }, comp: 1 } }] },

    { id: 'fs_export', mode: M, turn: 24,
      t: A('An exporter wants the best catch', 'Eksportir menginginkan tangkapan terbaik', '輸出業者が最上の漁獲を求める', '出口商想要最好的渔获'),
      b: A('An export company offers a steady price for top-grade, iced fish, but only if the quality is reliable every single week. It would be a big step up, and a big risk.',
        'Sebuah perusahaan ekspor menawarkan harga stabil untuk ikan kelas atas yang diberi es, tetapi hanya jika kualitasnya andal setiap minggu. Ini lompatan besar, sekaligus risiko besar.',
        '輸出会社が、氷漬けの最上級の魚に安定した価格を提示します。ただし毎週安定した品質が条件です。大きな飛躍であり、大きなリスクでもあります。',
        '一家出口公司对冰鲜的上等鱼提供稳定价格，但前提是每周品质都可靠。这是一次飞跃，也是一场冒险。'),
      choices: [
        { id: 'a', l: A('Sign the supply deal (55% chance it works)', 'Tanda tangani kontrak pasok (peluang 55% berhasil)', '供給契約に署名する（成功率55%）', '签订供货合同（55%概率成功）'),
          rw: A('Quality holds. The fishermen are paid more, and the exporter orders again.', 'Mutu terjaga. Nelayan dibayar lebih tinggi, dan eksportir memesan lagi.', '品質が保たれ、漁師の収入は増え、輸出業者は再び注文します。', '品质稳住了，渔民收入更高，出口商再次下单。'),
          rl: A('A shipment is rejected, and the loss lands on you.', 'Satu pengiriman ditolak, dan kerugiannya jatuh pada Anda.', '一回の出荷が不合格となり、損失はあなたが負います。', '一批货被拒收，损失落到了你头上。'),
          eff: { gamble: { p: .55, win: { cash: 20, sat: { small: 6, big: 6 }, flag: 'supplydeal' }, lose: { cash: -15, sat: { small: -3 } } } } },
        { id: 'b', l: A('Build a local quality mark first', 'Bangun merek mutu lokal dulu', 'まず地元の品質ブランドを育てる', '先建立本地品质标识'),
          r: A('Slow, but the kampung gets a name for clean fish.', 'Lambat, tetapi kampung ini mulai dikenal dengan ikan yang bersih.', '時間はかかりますが、村は鮮度の良い魚で名を上げます。', '虽然慢，但渔村开始以干净的鱼出名。'),
          eff: { cash: -20, sat: { home: 4, youth: 3, small: 3 }, demand: [1.06, 4] } },
        { id: 'c', l: A('Do nothing', 'Tidak berbuat apa-apa', '何もしない', '什么也不做'),
          r: A('The exporter goes to the next harbour.', 'Eksportir pergi ke pelabuhan berikutnya.', '輸出業者は別の港へ向かいます。', '出口商去了下一个港口。'),
          eff: { sat: { small: -3, big: -2 } } }] },

    { id: 'fs_audit', mode: M, turn: 26,
      t: A('The fisheries and co-op audit', 'Pemeriksaan dinas perikanan dan koperasi', '水産・協同組合の監査', '渔业与合作社审计'),
      b: A('Inspectors from the cooperatives office come to the pier for the annual health check. They want the loan files and the fish-weighing records.',
        'Pemeriksa dari dinas koperasi datang ke dermaga untuk penilaian tahunan. Mereka meminta berkas pinjaman dan catatan timbangan ikan.',
        '協同組合局の検査官が年次検査のため桟橋に来ます。貸付ファイルと魚の計量記録の提出を求められます。',
        '合作社主管部门的检查人员来码头做年度评估，要查看贷款档案和鱼获称重记录。'),
      choices: [
        { id: 'a', l: A('Cooperate fully', 'Bekerja sama penuh', '全面的に協力する', '全力配合'), rk: s => (s.legacy <= 5 || s.flags.audited) ? 'p' : 'f', r: A('', '', '', ''),
          rp: A('The files are clean. The inspectors leave impressed.', 'Berkasnya bersih. Para pemeriksa pergi dengan kesan baik.', '書類は問題なし。検査官は好印象で帰ります。', '档案很干净，检查人员满意地离开。'),
          rf: A('They find the old bad loans. A formal warning follows.', 'Mereka menemukan pinjaman macet lama. Teguran resmi menyusul.', '古い不良貸付が見つかり、正式な警告を受けます。', '他们发现了旧坏账，随后收到正式警告。'),
          eff: s => (s.legacy <= 5 || s.flags.audited) ? { ethics: 5, satAll: 2 } : { ethics: -12, satAll: -4, cash: -15 } },
        { id: 'b', l: A('Say the boats are out and the files are at sea', 'Bilang perahu sedang melaut dan berkas ikut di laut', '船が出ていてファイルは海の上だと言う', '推说船出海了，档案也在海上'),
          rk: () => 'f', r: A('', '', '', ''), rp: A('', '', '', ''),
          rf: A('They wait on the pier and note the delay in the report.', 'Mereka menunggu di dermaga dan mencatat penundaan itu dalam laporan.', '検査官は桟橋で待ち、遅延を報告書に記します。', '他们在码头等着，并把拖延写进了报告。'),
          eff: { ethics: -8, satAll: -2 } },
        { id: 'c', l: A('Ask the harbour master to smooth things over', 'Minta syahbandar melunakkan keadaan', '港長に口利きを頼む', '请港务长出面疏通'),
          rk: s => s.flags.headfavor ? 'p' : 'f', r: A('', '', '', ''),
          rp: A('The harbour master makes a call. It passes, but not cleanly.', 'Syahbandar menelepon. Lolos, tetapi tidak bersih.', '港長が電話をかけ、通りますが、きれいな結果ではありません。', '港务长打了个电话，勉强过关，但并不干净。'),
          rf: A('He will not help you. The report is harsh.', 'Ia tidak mau membantu. Laporannya keras.', '港長は助けてくれず、報告書は厳しい内容です。', '他不肯帮忙，报告措辞严厉。'),
          eff: s => s.flags.headfavor ? { ethics: -6 } : { ethics: -10, cash: -10 } }] },

    { id: 'fs_final', mode: M, turn: 29,
      t: A('The final offer', 'Tawaran terakhir', '最後の提案', '最后的提议'),
      b: A('Samudra Ekspor, a seafood group, makes a formal offer: buy the co-op for Rp 80 million above book value, partner with it as a supplier while it keeps its name, or leave you alone.',
        'Samudra Ekspor, sebuah grup makanan laut, mengajukan tawaran resmi: membeli koperasi dengan harga Rp 80 juta di atas nilai buku, bermitra sebagai pemasok dengan nama koperasi tetap, atau membiarkan Anda mandiri.',
        'シーフード企業グループのサムドラ・エクスポールが正式に提案します。帳簿価額に8,000万ルピアを上乗せして買収するか、名前を残したまま供給業者として提携するか、このまま放っておくか。',
        '海产集团 Samudra Ekspor 提出正式方案：以高于账面价值8000万盾收购合作社；或作为供应商合作并保留名称；或者不再打扰你。'),
      choices: [
        { id: 'a', l: A('Accept the acquisition', 'Terima akuisisi', '買収を受け入れる', '接受收购'),
          r: A('The co-op becomes a branch. The members get paid, and a chapter closes.', 'Koperasi menjadi cabang. Anggota dibayar, dan sebuah bab berakhir.', '協同組合は支店になります。組合員には支払いがあり、一つの章が終わります。', '合作社变成分店，社员拿到补偿，一个篇章就此结束。'),
          eff: { end: 'acquired' } },
        { id: 'b', l: A('Partner as a supplier, keep the name', 'Bermitra sebagai pemasok, nama tetap', '名前を残して供給業者として提携', '作为供应商合作，保留名称'),
          r: A('Orders arrive steadily. Some members wonder who is really in charge.', 'Pesanan datang stabil. Sebagian anggota bertanya siapa sebenarnya yang berkuasa.', '注文は安定して届きます。一部の組合員は、本当は誰が主導権を握っているのかと考えます。', '订单稳定流入，一些社员开始怀疑到底谁说了算。'),
          eff: { cash: 35, comp: -1, flag: 'partner', sat: { small: 4 } } },
        { id: 'c', l: A('Refuse and stay independent', 'Tolak dan tetap mandiri', '断って独立を守る', '拒绝并保持独立'),
          rk: s => C.trust(s) >= 60 ? 'p' : 'f', r: A('', '', '', ''),
          rp: A('The fishermen rally around you. Pride is a currency too.', 'Para nelayan merapat di belakang Anda. Kebanggaan juga mata uang.', '漁師たちはあなたの周りに結集します。誇りもまた通貨です。', '渔民团结在你身边，自豪感也是一种资本。'),
          rf: A('Some members wonder if you refused a rescue.', 'Sebagian anggota bertanya apakah Anda menolak penyelamatan.', '救いの手を断ったのではと疑う組合員もいます。', '一些社员怀疑你拒绝了一次救援。'),
          eff: s => C.trust(s) >= 60 ? { satAll: 5, flag: 'indep' } : { satAll: -3, flag: 'indep' } }] },

    /* ---------- random events ---------- */
    { id: 'fs_fuel', mode: M, w: 1,
      t: A('The fuel subsidy is cut', 'Subsidi solar dipotong', '燃料補助が削減される', '柴油补贴被削减'),
      b: A('Diesel for the boats gets more expensive. Every trip out costs more, and the fishermen look at the co-op.',
        'Solar untuk perahu makin mahal. Setiap kali melaut biayanya naik, dan para nelayan menoleh ke koperasi.',
        '漁船の軽油が高くなります。出漁のたびにコストが上がり、漁師たちは協同組合を見つめます。',
        '渔船的柴油变贵了，每次出海成本都在上升，渔民们把目光投向合作社。'),
      choices: [
        { id: 'a', l: A('Open a co-op fuel pump at a lower margin', 'Buka pompa solar koperasi dengan margin lebih tipis', '協同組合の給油所を低マージンで開く', '开设合作社加油点，微利经营'), r: A('Fuel at a fair price. Fishermen are grateful, the margin is thin.', 'Solar dengan harga adil. Nelayan berterima kasih, marginnya tipis.', '適正価格の燃料に漁師は感謝しますが、利幅は薄いです。', '柴油价格公道，渔民很感激，利润却很薄。'), eff: { cash: -15, ovh: 1, sat: { small: 5, big: 3 }, ethics: 1 } },
        { id: 'b', l: A('Lobby for a bigger fuel quota (50% chance)', 'Lobi kuota solar lebih besar (peluang 50%)', '燃料の割当拡大を陳情する（成功率50%）', '游说争取更大的柴油配额（50%概率）'), rw: A('The quota grows, and the fishermen cheer.', 'Kuota naik, dan nelayan bersorak.', '割当が増え、漁師たちは歓声を上げます。', '配额增加了，渔民们欢呼起来。'), rl: A('No answer from the office.', 'Tidak ada jawaban dari kantor.', '事務所からは返事がありません。', '办公室没有任何回音。'), eff: { gamble: { p: .5, win: { cash: 25, sat: { small: 5 } }, lose: { cash: -3 } } } },
        { id: 'c', l: A('Pass the cost on to members', 'Teruskan biaya ke anggota', '費用を組合員に転嫁する', '把成本转嫁给社员'), r: A('The books are fine. The pier is not happy.', 'Pembukuan aman. Dermaga tidak senang.', '帳簿は無事ですが、桟橋の空気は悪くなります。', '账面没事，码头上怨声不断。'), eff: { sat: { small: -6, big: -2 } } }] },
    { id: 'fs_shoal', mode: M, w: 1, when: s => season(s) <= 1,
      t: A('A big shoal is coming early', 'Gerombolan ikan datang lebih awal', '大きな魚群が早く来る', '大鱼群提前到来'),
      b: A('Fishermen on the pier say the shoals are running early this year. The coming catch may be a big one.', 'Para nelayan di dermaga bilang gerombolan ikan datang lebih awal tahun ini. Tangkapan mendatang bisa besar.', '桟橋の漁師たちは、今年は魚群が早いと言います。次の漁獲は豊漁になりそうです。', '码头上的渔民说今年鱼群来得早，接下来的渔获可能很丰盛。'),
      choices: [
        { id: 'a', l: A('Pre-contract the catch and buy extra ice', 'Kontrak awal tangkapan dan beli es tambahan', '漁獲を前もって契約し、氷を余分に買う', '提前签收购合同并多买冰'), r: A('Fishermen appreciate the certainty.', 'Nelayan menghargai kepastian.', '漁師は確実性を歓迎します。', '渔民欣赏这份确定性。'), eff: { cash: -10, harvest: 1.3, sat: { small: 4 } } },
        { id: 'b', l: A('Wait and see', 'Lihat saja dulu', '様子を見る', '先观望'), r: A('The sea provides anyway.', 'Laut tetap memberi.', '海は変わらず恵みをくれます。', '大海总归会给予。'), eff: { harvest: 1.15 } }] },
    { id: 'fs_sink', mode: M, w: 1, when: s => s.loans > 100,
      t: A('A boat goes down with its loan', 'Perahu tenggelam bersama pinjamannya', '船が借金ごと沈む', '渔船连同贷款一起沉没'),
      b: A('A fisherman survives, but his boat sinks. He owes Rp 12 million and has nothing to fish with.', 'Seorang nelayan selamat, tetapi perahunya tenggelam. Ia berutang Rp 12 juta dan tidak punya apa pun untuk melaut.', '漁師は助かりましたが、船は沈みました。1,200万ルピアの借金が残り、漁に出る道具もありません。', '一位渔民获救了，船却沉了。他欠着1200万盾，也没有了出海的工具。'),
      choices: [
        { id: 'a', l: A('Write it off and help him find a crew', 'Hapus buku dan bantu ia mencari awak', '償却し、乗組員の口を探してやる', '核销，并帮他找船员的活'), r: A('The kampung remembers this for years.', 'Kampung mengingatnya bertahun-tahun.', '村は何年もこの対応を覚えています。', '渔村会记住这件事很多年。'), eff: { loans: -12, sat: { home: 4, small: 3 }, ethics: 4 } },
        { id: 'b', l: A('Collect from his family', 'Tagih ke keluarganya', '家族から回収する', '向他家人追讨'), r: A('You recover half. The cost is goodwill.', 'Setengahnya kembali. Harganya adalah simpati.', '半分は回収できますが、信頼を失います。', '追回一半，代价是人心。'), eff: { cash: 6, loans: -12, sat: { home: -6, small: -6 }, ethics: -4 } },
        { id: 'c', l: A('Restructure over several seasons', 'Restrukturisasi selama beberapa musim', '数シーズンかけて返済条件を変更する', '分几个季度重组还款'), r: A('A gentle compromise.', 'Kompromi yang lembut.', '穏やかな折衷案です。', '温和的折中办法。'), eff: { loans: -6, cash: 3, sat: { small: 1 } } }] },
    { id: 'fs_alms', mode: M, w: 1,
      t: A('The sea alms festival', 'Pesta sedekah laut', '海の感謝祭', '海上祭典'),
      b: A('The kampung holds its yearly sea alms festival and asks the co-op to sponsor the boat parade and the feast.', 'Kampung mengadakan pesta sedekah laut tahunan dan meminta koperasi menyponsori pawai perahu dan jamuannya.', '村が毎年の海の感謝祭を開き、協同組合に船のパレードと宴の協賛を求めます。', '渔村举办一年一度的海上祭典，请合作社赞助船队巡游和宴席。'),
      choices: [
        { id: 'a', l: A('Sponsor it generously', 'Sponsori dengan murah hati', '惜しみなく協賛する', '慷慨赞助'), r: A('The parade is the best in years, and the co-op is on every banner.', 'Pawai terbaik dalam beberapa tahun, dan koperasi ada di setiap spanduk.', '数年ぶりの盛り上がりで、協同組合の名前がすべての旗に載ります。', '这是多年来最盛大的巡游，每面旗上都有合作社的名字。'), eff: { cash: -15, sat: { home: 5, youth: 4 }, social: 5, flag: 'headfavor' } },
        { id: 'b', l: A('Sponsor the feast only', 'Sponsori jamuannya saja', '宴だけ協賛する', '只赞助宴席'), r: A('A modest gesture, warmly received.', 'Gestur sederhana, diterima dengan hangat.', 'ささやかですが、温かく受け入れられます。', '心意不大，却受到温暖的欢迎。'), eff: { cash: -6, sat: { home: 2 } } },
        { id: 'c', l: A('Decline politely', 'Tolak dengan sopan', '丁重に断る', '礼貌地拒绝'), r: A('Nobody argues, but nobody forgets.', 'Tak ada yang berdebat, tetapi tak ada yang lupa.', '誰も反論しませんが、誰も忘れません。', '没人争辩，但也没人忘记。'), eff: { sat: { home: -3, youth: -2 } } }] },
    { id: 'fs_engine', mode: M, w: 1, when: s => s.t >= 6,
      t: A('A free engine programme', 'Program mesin bantuan', '無償エンジン支援プログラム', '发动机补助项目'),
      b: A('The government offers outboard engines to small fishermen through co-ops, with paperwork and a registration of each boat.', 'Pemerintah menawarkan mesin tempel untuk nelayan kecil melalui koperasi, dengan administrasi dan pendataan tiap perahu.', '政府が協同組合を通じて小規模漁師に船外機を提供します。書類手続きと各船の登録が必要です。', '政府通过合作社向小渔民提供舷外机，需要办理手续并登记每条船。'),
      choices: [
        { id: 'a', l: A('Join the programme', 'Ikut program', 'プログラムに参加する', '参加项目'), r: A('Small fishermen are grateful. The paperwork is not.', 'Nelayan kecil berterima kasih. Administrasinya tidak.', '小規模漁師は感謝します。書類仕事はそうでもありません。', '小渔民很感激，手续却很烦。'), eff: { cash: -10, sat: { small: 8, big: 2 }, ethics: 1 } },
        { id: 'b', l: A('Skip it', 'Lewati', '見送る', '跳过'), r: A('Fishermen look elsewhere.', 'Nelayan mencari ke tempat lain.', '漁師は他を頼ります。', '渔民另寻出路。'), eff: { sat: { small: -3 } } }] }
  ];
  C.EVENTS = (C.EVENTS || []).concat(X);

  /* texts -> i18n keys (same scheme as data/events.js) */
  const strings = { en: {}, id: {}, ja: {}, zh: {} }, L = ['en', 'id', 'ja', 'zh'];
  const put = (k, a) => { if (a && a[0]) L.forEach((l, i) => { strings[l][k] = a[i]; }); };
  X.forEach(e => {
    put('ev_' + e.id + '_t', e.t); put('ev_' + e.id + '_b', e.b);
    e.choices.forEach(c => { const p = 'ev_' + e.id + '_' + c.id; put(p, c.l); put(p + 'r', c.r); put(p + 'w', c.rw); put(p + 'l', c.rl); put(p + 'p', c.rp); put(p + 'f', c.rf); });
  });
  if (root.MBALAB.sims && root.MBALAB.sims.define) root.MBALAB.sims.define('koperasi-tycoon', { strings });
})();
