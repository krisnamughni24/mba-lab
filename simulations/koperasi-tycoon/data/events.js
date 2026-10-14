/* Koperasi: story events. Scripted beats (turn = season index 0..31) carry the plot; the rest are random events with a condition.
   Effects are plain data (see applyEff in engine/engine.js). Texts are [en, id, ja, zh] and are registered as i18n keys:
   ev_<id>_t (title), ev_<id>_b (body), ev_<id>_<choice> (button), ev_<id>_<choice>r (result), plus ..w / ..l for gambles and ..p / ..f for conditional results. */
(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  root.MBALAB = root.MBALAB || {}; const C = (MBALAB.coop = MBALAB.coop || {});
  const A = (e, i, j, z) => [e, i, j, z];
  const season = s => s.t % 4;
  const X = [
    { id: 'books', turn: 0, act: 1,
      t: A('The inherited books', 'Buku warisan', '引き継いだ帳簿', '遗留的账本'),
      b: A('Your first week. The former manager left suddenly, and the ledgers hold about Rp 45 million of loans nobody has repaid in years. Treasurer Bu Ratna watches how you react.',
        'Minggu pertama Anda. Manajer lama mundur mendadak, dan buku besar memuat pinjaman sekitar Rp 45 juta yang bertahun-tahun tidak dibayar. Bendahara Bu Ratna mengamati reaksi Anda.',
        '着任1週目。前任者は突然辞め、帳簿には何年も返済されていない約4,500万ルピア相当の貸付が残っています。会計係のラトナさんがあなたの対応を見守っています。',
        '上任第一周。前任经理突然离职，账本上有约4500万盾多年未还的贷款。出纳拉特娜女士正观察你的反应。'),
      choices: [
        { id: 'a', l: A('Open the books to the members and write the bad loans off', 'Buka buku kepada anggota dan hapus buku pinjaman macet', '帳簿を組合員に公開し、不良貸付を償却する', '向社员公开账本并核销坏账'),
          r: A('Members are shocked, then impressed. Bu Ratna nods for the first time.', 'Anggota terkejut, lalu terkesan. Bu Ratna mengangguk untuk pertama kalinya.', '組合員は驚き、そして感心します。ラトナさんが初めてうなずきました。', '社员先是震惊，随后佩服。拉特娜女士第一次点头。'),
          eff: { cash: -12, legacy: -45, loans: -30, ethics: 12, satAll: 3, flag: 'audited' } },
        { id: 'b', l: A('Reschedule quietly and hope', 'Jadwal ulang diam-diam dan berharap', 'こっそり返済を繰り延べて様子を見る', '悄悄展期并期待好转'),
          r: A('The numbers look cleaner on paper. The risk is still in the drawer.', 'Angka tampak lebih rapi di atas kertas. Risikonya masih tersimpan di laci.', '帳簿上は見栄えが良くなりましたが、リスクは引き出しの中に残っています。', '账面更好看了，风险却还锁在抽屉里。'),
          eff: { legacy: -25, ethics: -6, flag: 'hidden' } },
        { id: 'c', l: A('Sales first, books later', 'Penjualan dulu, buku belakangan', 'まず売上、帳簿は後回し', '先抓销售，账本以后再说'),
          r: A('You focus on the shop. The old loans keep quietly slipping.', 'Anda fokus pada toko. Pinjaman lama terus diam-diam menunggak.', '店に集中します。古い貸付は静かに焦げ付き続けます。', '你专注于店面，旧贷款仍在悄悄逾期。'),
          eff: { ethics: -2, flag: 'later' } }] },
    { id: 'darmo_friend', turn: 2, act: 1,
      t: A('A favor for Pak Darmo', 'Permintaan Pak Darmo', 'ダルモ氏の頼みごと', '达尔莫先生的请求'),
      b: A('Chairman Pak Darmo asks you to lend Rp 25 million to his relatives with no collateral. "They are family. They will pay."',
        'Ketua Pak Darmo meminta Anda meminjamkan Rp 25 juta kepada kerabatnya tanpa jaminan. "Mereka keluarga. Pasti dibayar."',
        'ダルモ理事長が、親戚に担保なしで2,500万ルピアを貸してほしいと頼んできました。「身内だ、必ず返す」。',
        '理事长达尔莫先生要你无抵押借给他亲戚2500万盾。“都是自家人，一定会还。”'),
      choices: [
        { id: 'a', l: A('Approve', 'Setujui', '承認する', '批准'), r: A('Pak Darmo is pleased, and so is his circle.', 'Pak Darmo senang, begitu juga lingkarannya.', 'ダルモ氏とその周囲は満足です。', '达尔莫先生很高兴，他的圈子也是。'), eff: { loans: 25, cash: -25, legacy: 10, ethics: -5, sat: { small: 4 }, flag: 'darmo' } },
        { id: 'b', l: A('Apply the normal rules', 'Terapkan aturan biasa', '通常の審査基準を適用する', '按常规规则办理'), r: A('He is displeased but says nothing. Bu Ratna notes your fairness.', 'Ia tidak senang tetapi diam. Bu Ratna mencatat sikap adil Anda.', '不満そうですが何も言いません。ラトナさんはあなたの公平さを心に留めます。', '他不悦但没说什么。拉特娜女士记下了你的公正。'), eff: { ethics: 4, sat: { small: -3 } } },
        { id: 'c', l: A('A smaller loan with guarantors', 'Pinjaman lebih kecil dengan penjamin', '保証人付きで金額を抑える', '减少金额并要求担保人'), r: A('A fair middle path. Everyone saves face.', 'Jalan tengah yang adil. Semua tetap terhormat.', '公平な折衷案。誰の顔も立ちます。', '公平的折中方案，各方都保住了面子。'), eff: { loans: 10, cash: -10, ethics: 2, sat: { small: 1 } } }] },
    { id: 'nusamart_open', turn: 5, act: 2, pre: { comp: 1 },
      t: A('Nusa Mart opens in town', 'Nusa Mart buka di kecamatan', 'ヌサ・マートが町に開店', 'Nusa Mart 在镇上开业'),
      b: A('A bright minimarket chain opens across the market road, with promos and air conditioning. Customers are curious and members look to you.',
        'Jaringan minimarket yang terang benderang buka di seberang jalan pasar, lengkap dengan promo dan AC. Pelanggan penasaran dan anggota menunggu sikap Anda.',
        '市場通りの向かいに、販促とエアコン完備の明るいミニマート・チェーンが開店。お客さんは興味津々で、組合員はあなたの出方を待っています。',
        '市场路对面开了一家明亮的连锁便利店，有促销也有空调。顾客很好奇，社员都在看你如何应对。'),
      choices: [
        { id: 'a', l: A('Launch a "local first" campaign', 'Luncurkan kampanye "utamakan lokal"', '「地元第一」キャンペーンを始める', '发起“本地优先”活动'), r: A('Banners go up: member prices, local produce, and a stamp card.', 'Spanduk terpasang: harga anggota, produk lokal, dan kartu stempel.', '横断幕が並びます。組合員価格、地元産品、スタンプカード。', '横幅挂起：社员价、本地农产品和集章卡。'), eff: { cash: -25, sat: { home: 6, youth: 3 }, demand: [1.05, 4] } },
        { id: 'b', l: A('Cut staple prices', 'Turunkan harga sembako', '生活必需品を値下げする', '下调基本品价格'), r: A('Queues return, but the margin thins.', 'Antrean kembali, tetapi margin menipis.', '行列は戻りますが、利幅が薄くなります。', '队伍回来了，但利润变薄。'), eff: { cash: -10, demand: [1.12, 3], flag: 'pricewar' } },
        { id: 'c', l: A('Ignore them', 'Abaikan saja', '気にしない', '置之不理'), r: A('Some regulars start crossing the road.', 'Beberapa pelanggan tetap mulai menyeberang jalan.', '常連客の一部が道を渡り始めます。', '一些老顾客开始走到马路对面。'), eff: { sat: { home: -3 }, demand: [.95, 4] } }] },
    { id: 'dimas_digital', turn: 9, act: 2,
      t: A("Dimas's digital idea", 'Gagasan digital Dimas', 'ディマスのデジタル案', '迪马斯的数字化提议'),
      b: A('Young member Dimas proposes QR payments and online ordering for the shop. It costs money, and Pak Darmo is skeptical.',
        'Anggota muda Dimas mengusulkan pembayaran QR dan pemesanan daring untuk toko. Butuh biaya, dan Pak Darmo ragu.',
        '若手組合員のディマスが、QR決済とオンライン注文の導入を提案。費用がかかり、ダルモ氏は懐疑的です。',
        '年轻社员迪马斯提议为商店引入二维码支付和线上订购。这要花钱，达尔莫先生也持怀疑态度。'),
      choices: [
        { id: 'a', l: A('Adopt it now', 'Terapkan sekarang', '今すぐ導入する', '立即采用'), r: A('The screen at the counter lights up. Younger members take notice.', 'Layar di kasir menyala. Anggota muda mulai memperhatikan.', 'レジの画面が灯ります。若い組合員が注目します。', '收银台的屏幕亮了，年轻社员开始关注。'), eff: { cash: -40, inv: { digital: 1 }, sat: { youth: 8 }, flag: 'dimas' } },
        { id: 'b', l: A('Pilot with a few members', 'Uji coba dengan beberapa anggota', '数人の組合員で試験導入', '先让少数社员试用'), r: A('A small pilot. It works, but few people know about it.', 'Uji coba kecil. Berjalan, tetapi sedikit yang tahu.', '小さな試験導入。うまくいきますが、知る人は少ないです。', '小范围试点，运行正常，但知道的人不多。'), eff: { cash: -15, inv: { digital: .5 }, sat: { youth: 4 } } },
        { id: 'c', l: A('Not now', 'Belum saatnya', '今は見送る', '暂时不做'), r: A('Dimas shrugs. Pak Darmo nods.', 'Dimas mengangkat bahu. Pak Darmo mengangguk.', 'ディマスは肩をすくめ、ダルモ氏はうなずきます。', '迪马斯耸耸肩，达尔莫先生点头。'), eff: { sat: { youth: -8 }, flag: 'darmo' } }] },
    { id: 'rat_clash', turn: 13, act: 3,
      t: A('Two visions for the co-op', 'Dua visi untuk koperasi', '協同組合の二つのビジョン', '合作社的两种愿景'),
      b: A('Before the meeting, Pak Darmo wants steady tradition and Dimas wants modernization. Both ask for your public support.',
        'Menjelang rapat, Pak Darmo ingin tradisi yang mantap dan Dimas ingin modernisasi. Keduanya meminta dukungan terbuka Anda.',
        '総会を前に、ダルモ氏は堅実な伝統を、ディマスは近代化を望んでいます。二人とも、あなたの公の支持を求めています。',
        '会议前，达尔莫先生想要稳健的传统，迪马斯想要现代化。两人都希望你公开支持。'),
      choices: [
        { id: 'a', l: A('Back Pak Darmo', 'Dukung Pak Darmo', 'ダルモ氏を支持する', '支持达尔莫先生'), r: A('The farmers cheer. The young members go quiet.', 'Para petani bersorak. Anggota muda terdiam.', '農家は歓声を上げ、若い組合員は黙り込みます。', '农民们欢呼，年轻社员沉默了。'), eff: { sat: { small: 5, big: 4, youth: -6 }, flag: 'darmo', unflag: 'dimas' } },
        { id: 'b', l: A('Back Dimas', 'Dukung Dimas', 'ディマスを支持する', '支持迪马斯'), r: A('The youth are energized. The old guard frowns.', 'Anak muda bersemangat. Golongan senior cemberut.', '若者は活気づき、古参は眉をひそめます。', '年轻人干劲十足，老一辈皱起了眉。'), eff: { sat: { youth: 8, small: -4 }, flag: 'dimas', unflag: 'darmo' } },
        { id: 'c', l: A('Form a joint committee', 'Bentuk panitia bersama', '合同委員会をつくる', '成立联合委员会'), r: A('Slow, but both sides feel heard.', 'Lambat, tetapi kedua pihak merasa didengar.', '時間はかかりますが、双方が話を聞いてもらえたと感じます。', '虽然慢，但双方都觉得被倾听。'), eff: { cash: -8, satAll: 1, ethics: 2 } }] },
    { id: 'flood', turn: 17, act: 4, pre: { harvest: .5, defMul: [2, 3] },
      t: A('Flood before the harvest', 'Banjir sebelum panen', '収穫前の洪水', '收获前的洪水'),
      b: A('Heavy rain floods the paddies. This harvest will be poor and many members will struggle to repay their loans.',
        'Hujan deras membanjiri sawah. Panen kali ini buruk dan banyak anggota akan kesulitan membayar pinjaman.',
        '豪雨で田んぼが冠水しました。今期の収穫は不作で、多くの組合員が返済に苦しみそうです。',
        '暴雨淹没了稻田。这季收成会很差，许多社员将难以还款。'),
      choices: [
        { id: 'a', l: A('Reschedule loans and give relief', 'Jadwal ulang pinjaman dan beri bantuan', '貸付を繰り延べ、救済を行う', '贷款展期并提供救济'), r: A('Members will remember who stood by them.', 'Anggota akan ingat siapa yang mendampingi mereka.', '組合員は、誰が寄り添ってくれたかを覚えているでしょう。', '社员会记住是谁陪他们渡过难关。'), eff: { cash: -15, defMul: [1.2, 3], sat: { small: 8, big: 3 }, ethics: 3 } },
        { id: 'b', l: A('Collect as scheduled', 'Tagih sesuai jadwal', '予定どおり回収する', '按期催收'), r: A('The cash is safe, the goodwill is not.', 'Kas aman, niat baik tidak.', '現金は守れても、信頼は守れません。', '现金保住了，好感却没了。'), eff: { sat: { small: -10, trader: -3 } } },
        { id: 'c', l: A('Apply for government aid (50% chance)', 'Ajukan bantuan pemerintah (peluang 50%)', '政府の支援を申請する（成功率50%）', '申请政府援助（50%概率）'),
          r: A('You file the papers and wait.', 'Anda mengajukan berkas dan menunggu.', '書類を出して待ちます。', '你提交材料后等待结果。'), rw: A('The aid arrives.', 'Bantuan cair.', '支援が届きました。', '援助到账了。'), rl: A('The paperwork is rejected.', 'Berkas ditolak.', '申請は却下されました。', '申请被驳回了。'),
          eff: { gamble: { p: .5, win: { cash: 45, sat: { small: 4 } }, lose: { cash: -5, sat: { small: -2 } } } } }] },
    { id: 'village_head', turn: 21, act: 4,
      t: A("The village head's request", 'Permintaan kepala desa', '村長の頼み', '村长的请求'),
      b: A('The village head asks the co-op to sponsor the annual village festival. It would win goodwill, and he hints that goodwill goes both ways.',
        'Kepala desa meminta koperasi mensponsori pesta desa tahunan. Itu akan menambah simpati, dan ia memberi isyarat bahwa simpati berlaku dua arah.',
        '村長が、毎年恒例の村祭りへの協賛を協同組合に求めてきました。好感は得られますが、「持ちつ持たれつ」とほのめかします。',
        '村长请合作社赞助一年一度的村庆。这能赢得好感，他还暗示好感是双向的。'),
      choices: [
        { id: 'a', l: A('Sponsor Rp 15 million', 'Sponsori Rp 15 juta', '1,500万ルピアを協賛する', '赞助1500万盾'), r: A('The festival is a hit, and the village head owes you one.', 'Pesta berhasil, dan kepala desa berutang budi.', '祭りは大成功。村長はあなたに借りができました。', '村庆很成功，村长欠了你一个人情。'), eff: { cash: -15, sat: { home: 3 }, flag: 'headfavor' } },
        { id: 'b', l: A('Decline politely', 'Tolak dengan sopan', '丁重に断る', '礼貌地拒绝'), r: A('He smiles thinly. Nothing more is said.', 'Ia tersenyum tipis. Tidak ada kelanjutan.', '村長は薄く笑い、それ以上は何も言いません。', '他淡淡一笑，没再多说。'), eff: { sat: { home: -1 } } },
        { id: 'c', l: A('Only if the village funds a market stall', 'Hanya jika desa mendanai lapak pasar', '村が市場の屋台を出してくれるなら', '除非村里出资建一个市场摊位'), r: A('You propose a trade.', 'Anda mengajukan pertukaran.', '取引を持ちかけます。', '你提出了交换条件。'), rw: A('He agrees. A fair deal for both.', 'Ia setuju. Kesepakatan adil bagi keduanya.', '村長は同意。双方に公平な取引です。', '他同意了，对双方都公平。'), rl: A('He refuses and takes offense.', 'Ia menolak dan tersinggung.', '村長は断り、気分を害しました。', '他拒绝了，还觉得被冒犯。'),
          eff: { gamble: { p: .5, win: { cash: -5, sat: { home: 4 }, flag: 'headfavor' }, lose: { sat: { home: -2 } } } } }] },
    { id: 'nusamart_expand', turn: 24, act: 4, pre: { comp: 1 },
      t: A('Nusa Mart expands', 'Nusa Mart berekspansi', 'ヌサ・マートが拡大', 'Nusa Mart 扩张'),
      b: A('Nusa Mart doubles its shelf space and offers local farmers a purchasing contract. Members are tempted.',
        'Nusa Mart menggandakan ruang rak dan menawarkan kontrak pembelian kepada petani lokal. Anggota tergoda.',
        'ヌサ・マートは売り場を倍増し、地元農家に買取契約を提案。組合員の心が揺れます。',
        'Nusa Mart 把货架空间扩大一倍，并向当地农民提出收购合同。社员动心了。'),
      choices: [
        { id: 'a', l: A("Negotiate a supply deal for members' produce", 'Negosiasikan kontrak pasok hasil panen anggota', '組合員の農産物の供給契約を交渉する', '为社员的农产品谈供货合同'), r: A('You sit down with their buyer.', 'Anda duduk bersama pembeli mereka.', '先方のバイヤーと席に着きます。', '你与对方的采购员坐下来谈。'), rw: A('They agree: a steady outlet for members.', 'Mereka setuju: saluran penjualan tetap bagi anggota.', '合意：組合員に安定した販路ができました。', '谈成了：社员有了稳定的销路。'), rl: A('They want a price no farmer would accept.', 'Harga yang mereka minta tak akan diterima petani mana pun.', '農家の誰も受け入れない価格を提示されました。', '对方的价格没有农民能接受。'),
          eff: { gamble: { p: .55, win: { cash: 20, sat: { small: 6, big: 6 }, flag: 'supplydeal' }, lose: { sat: { small: -2 } } } } },
        { id: 'b', l: A('Strengthen the loyalty program', 'Perkuat program loyalitas', 'ロイヤルティ制度を強化する', '加强会员忠诚计划'), r: A('Stamp cards, member days, and a home delivery for elders.', 'Kartu stempel, hari anggota, dan antar ke rumah untuk lansia.', 'スタンプカード、組合員デー、高齢者への宅配。', '集章卡、会员日，以及为老人送货上门。'), eff: { cash: -20, sat: { home: 6, youth: 4, small: 3 }, demand: [1.06, 4] } },
        { id: 'c', l: A('Do nothing', 'Tidak berbuat apa-apa', '何もしない', '什么也不做'), r: A('Some members start selling to them directly.', 'Sebagian anggota mulai menjual langsung kepada mereka.', '一部の組合員が直接彼らに売り始めます。', '一些社员开始直接卖给他们。'), eff: { sat: { home: -3, small: -2 } } }] },
    { id: 'audit', turn: 26, act: 4,
      t: A('The district audit', 'Pemeriksaan dinas', '郡の監査', '县级审计'),
      b: A('Inspectors from the cooperatives office arrive for the annual health check. They want the loan files.',
        'Pemeriksa dari dinas koperasi datang untuk penilaian kesehatan tahunan. Mereka meminta berkas pinjaman.',
        '協同組合局の検査官が年次の健全性検査に来ました。貸付ファイルの提出を求められます。',
        '合作社主管部门的检查人员来做年度健康评估，要查看贷款档案。'),
      choices: [
        { id: 'a', l: A('Cooperate fully', 'Bekerja sama penuh', '全面的に協力する', '全力配合'), p: 1, rk: s => (s.legacy <= 5 || s.flags.audited) ? 'p' : 'f',
          r: A('', '', '', ''), rp: A('The files are clean. The inspectors leave impressed.', 'Berkasnya bersih. Para pemeriksa pergi dengan kesan baik.', '書類は問題なし。検査官は好印象で帰ります。', '档案很干净，检查人员满意地离开。'), rf: A('They find the old bad loans. A formal warning follows.', 'Mereka menemukan pinjaman macet lama. Teguran resmi menyusul.', '古い不良貸付が見つかり、正式な警告を受けます。', '他们发现了旧坏账，随后收到正式警告。'),
          eff: s => (s.legacy <= 5 || s.flags.audited) ? { ethics: 5, satAll: 2 } : { ethics: -12, satAll: -4, cash: -15 } },
        { id: 'b', l: A('Delay the inspectors', 'Tunda para pemeriksa', '検査官を待たせる', '拖延检查人员'), rk: () => 'f', r: A('', '', '', ''), rp: A('', '', '', ''), rf: A('They notice the delay and note it in the report.', 'Mereka mencatat penundaan itu dalam laporan.', '先方は遅延に気づき、報告書に記します。', '他们注意到拖延，并写进了报告。'), eff: { ethics: -8, satAll: -2 } },
        { id: 'c', l: A('Ask the village head to smooth things over', 'Minta kepala desa melunakkan keadaan', '村長に口利きを頼む', '请村长出面疏通'), rk: s => s.flags.headfavor ? 'p' : 'f', r: A('', '', '', ''), rp: A('The village head makes a call. It passes, but not cleanly.', 'Kepala desa menelepon. Lolos, tetapi tidak bersih.', '村長が電話をかけ、通りますが、きれいな結果ではありません。', '村长打了个电话，勉强过关，但并不干净。'), rf: A('He will not help you. The report is harsh.', 'Ia tidak mau membantu. Laporannya keras.', '村長は助けてくれず、報告書は厳しい内容です。', '他不肯帮忙，报告措辞严厉。'),
          eff: s => s.flags.headfavor ? { ethics: -6 } : { ethics: -10, cash: -10 } }] },
    { id: 'final_offer', turn: 29, act: 5,
      t: A('The final offer', 'Tawaran terakhir', '最後の提案', '最后的提议'),
      b: A("Nusa Mart's regional director makes a formal offer: buy the co-op for Rp 80 million above book value, partner as a supplier while the co-op keeps its name, or leave you alone.",
        'Direktur regional Nusa Mart mengajukan tawaran resmi: membeli koperasi dengan harga Rp 80 juta di atas nilai buku, bermitra sebagai pemasok dengan nama koperasi tetap, atau membiarkan Anda mandiri.',
        'ヌサ・マートの地域担当役員が正式に提案します。帳簿価額に8,000万ルピアを上乗せして買収するか、名前を残したまま供給業者として提携するか、このまま放っておくか。',
        'Nusa Mart 区域总监提出正式方案：以高于账面价值8000万盾收购合作社；或作为供应商合作并保留合作社名称；或者不再打扰你。'),
      choices: [
        { id: 'a', l: A('Accept the acquisition', 'Terima akuisisi', '買収を受け入れる', '接受收购'), r: A('The co-op becomes a branch. The members get paid, and a chapter closes.', 'Koperasi menjadi cabang. Anggota dibayar, dan sebuah bab berakhir.', '協同組合は支店になります。組合員には支払いがあり、一つの章が終わります。', '合作社变成分店，社员拿到补偿，一个篇章就此结束。'), eff: { end: 'acquired' } },
        { id: 'b', l: A('Partner as a supplier, keep the name', 'Bermitra sebagai pemasok, nama tetap', '名前を残して供給業者として提携', '作为供应商合作，保留名称'), r: A('Orders arrive steadily. Some members wonder who is really in charge.', 'Pesanan datang stabil. Sebagian anggota bertanya siapa sebenarnya yang berkuasa.', '注文は安定して届きます。一部の組合員は、本当は誰が主導権を握っているのかと考えます。', '订单稳定流入，一些社员开始怀疑到底谁说了算。'), eff: { cash: 35, comp: -1, flag: 'partner', sat: { small: 4 } } },
        { id: 'c', l: A('Refuse and stay independent', 'Tolak dan tetap mandiri', '断って独立を守る', '拒绝并保持独立'), rk: s => C.trust(s) >= 60 ? 'p' : 'f', r: A('', '', '', ''), rp: A('The members rally around you. Pride is a currency too.', 'Anggota merapat di belakang Anda. Kebanggaan juga mata uang.', '組合員はあなたの周りに結集します。誇りもまた通貨です。', '社员团结在你身边，自豪感也是一种资本。'), rf: A('Some members wonder if you refused a rescue.', 'Sebagian anggota bertanya apakah Anda menolak penyelamatan.', '救いの手を断ったのではと疑う組合員もいます。', '一些社员怀疑你拒绝了一次救援。'),
          eff: s => C.trust(s) >= 60 ? { satAll: 5, flag: 'indep' } : { satAll: -3, flag: 'indep' } }] },

    /* ---------- random events ---------- */
    { id: 'rice_spike', w: 1, when: s => season(s) !== 2, pre: { ricePrice: [1.25, 2] },
      t: A('Rice prices jump', 'Harga beras melonjak', '米価の高騰', '大米价格飙升'), b: A('The market price of rice rises 25% for two seasons. Households grumble.', 'Harga beras di pasar naik 25% selama dua musim. Rumah tangga mengeluh.', '米の市場価格が2シーズン、25%上がります。家庭からは不満の声。', '大米市价在两个季度内上涨25%，家庭主妇怨声载道。'),
      choices: [
        { id: 'a', l: A('Absorb part of the rise', 'Tanggung sebagian kenaikan', '値上がり分を一部負担する', '承担部分涨幅'), r: A('Households appreciate it. Your margin does not.', 'Rumah tangga menghargainya. Margin Anda tidak.', '家庭は感謝しますが、利幅は減ります。', '家庭很感激，你的利润却缩水了。'), eff: { cash: -12, sat: { home: 3 } } },
        { id: 'b', l: A('Pass it on fully', 'Teruskan sepenuhnya', '全額を価格に転嫁する', '全部转嫁给顾客'), r: A('The shelf price follows the market.', 'Harga rak mengikuti pasar.', '店頭価格は市場に連動します。', '货架价格跟着市场走。'), eff: { sat: { home: -5, trader: -2 } } },
        { id: 'c', l: A('Stockpile now (50% chance)', 'Timbun stok sekarang (peluang 50%)', '今のうちに買いだめする（成功率50%）', '现在囤货（50%概率）'), r: A('You bet on prices rising further.', 'Anda bertaruh harga akan naik lagi.', 'さらなる値上がりに賭けます。', '你押注价格还会上涨。'), rw: A('Prices keep climbing. Your stock gains value.', 'Harga terus naik. Stok Anda bernilai lebih.', '価格は上がり続け、在庫の価値が増えます。', '价格继续上涨，库存升值。'), rl: A('Prices fall back. You overpaid.', 'Harga turun lagi. Anda membayar terlalu mahal.', '価格は戻り、高値づかみでした。', '价格回落，你买贵了。'), eff: { gamble: { p: .5, win: { cash: 25 }, lose: { cash: -15 } } } }] },
    { id: 'theft', w: 1,
      t: A('Stock goes missing', 'Stok hilang', '在庫が消える', '库存失窃'), b: A('A count of the warehouse shows baskets of goods are missing.', 'Hitungan gudang menunjukkan sejumlah barang hilang.', '倉庫の棚卸しで、商品が何箱か足りないことがわかりました。', '盘点仓库发现有货物不见了。'),
      choices: [
        { id: 'a', l: A('Install CCTV', 'Pasang CCTV', '防犯カメラを設置する', '安装监控摄像头'), r: A('It costs money, but it will not happen again.', 'Butuh biaya, tetapi tidak akan terulang.', '費用はかかりますが、再発は防げます。', '花了钱，但不会再发生。'), eff: { cash: -12, goods: -10 } },
        { id: 'b', l: A('Report to the police', 'Lapor ke polisi', '警察に届け出る', '报警'), r: A('Correct, and slow.', 'Benar, tetapi lambat.', '正しい手順ですが、時間がかかります。', '做法正确，但很慢。'), eff: { goods: -25, ethics: 2 } },
        { id: 'c', l: A('Quietly dismiss the clerk', 'Pecat staf diam-diam', '店員をこっそり解雇する', '悄悄辞退店员'), r: A('Problem solved on the surface. Questions remain.', 'Masalah selesai di permukaan. Pertanyaan tetap ada.', '表向きは解決しましたが、疑問は残ります。', '表面上解决了，疑问仍在。'), eff: { goods: -25, ethics: -3 } }] },
    { id: 'funeral_loan', w: 1, when: s => s.loans > 100,
      t: A('A member passes away', 'Seorang anggota wafat', '組合員の訃報', '一位社员去世'), b: A('A member has passed away, leaving Rp 12 million of loans. The family is grieving.', 'Seorang anggota wafat dan meninggalkan pinjaman Rp 12 juta. Keluarga sedang berduka.', '組合員が亡くなり、1,200万ルピアの貸付が残りました。遺族は悲しみの中です。', '一位社员去世，留下1200万盾贷款。家人正在悲痛之中。'),
      choices: [
        { id: 'a', l: A('Write it off', 'Hapus buku', '償却する', '核销'), r: A('The village remembers this for years.', 'Desa mengingatnya bertahun-tahun.', '村は何年もこの対応を覚えています。', '村里会记很多年。'), eff: { loans: -12, sat: { home: 4, small: 3 }, ethics: 4 } },
        { id: 'b', l: A('Collect from the family', 'Tagih ke keluarga', '遺族から回収する', '向家属追讨'), r: A('You recover half. The cost is goodwill.', 'Setengahnya kembali. Harganya adalah simpati.', '半分は回収できましたが、信頼を失います。', '收回一半，代价是好感。'), eff: { cash: 6, loans: -12, sat: { home: -6, small: -6 }, ethics: -4 } },
        { id: 'c', l: A('Restructure partially', 'Restrukturisasi sebagian', '一部を条件変更する', '部分重组'), r: A('A gentle compromise.', 'Kompromi yang lembut.', '穏やかな折衷案です。', '一个温和的折中。'), eff: { loans: -6, cash: 3, sat: { small: 1 } } }] },
    { id: 'bulk_deal', w: .8,
      t: A('A bulk discount', 'Diskon grosir', '大口割引', '批量折扣'), b: A('The wholesaler offers 10% off a bulk order of 60 baskets of goods.', 'Grosir menawarkan diskon 10% untuk pembelian 60 paket barang.', '卸売業者が、60箱の大口注文に10%割引を提案しています。', '批发商为60篮货物的大宗订单提供9折。'),
      choices: [
        { id: 'a', l: A('Take the deal', 'Ambil tawaran', '提案に乗る', '接受'), r: A('The warehouse fills up.', 'Gudang terisi.', '倉庫が満杯になります。', '仓库被填满。'), eff: { cash: -54, goods: 60 } },
        { id: 'b', l: A('Decline', 'Tolak', '見送る', '拒绝'), r: A('Cash stays in the till.', 'Kas tetap di laci.', '現金は手元に残ります。', '现金留在抽屉里。'), eff: {} }] },
    { id: 'viral', w: 1, when: s => s.t >= 4,
      t: A('A post goes viral', 'Unggahan viral', '投稿が拡散', '帖子走红'), b: A("A customer's post about high prices and slow service spreads across social media.", 'Unggahan pelanggan tentang harga tinggi dan layanan lambat menyebar di media sosial.', 'お客さんの「高い、遅い」という投稿がSNSで拡散しました。', '一位顾客抱怨价格高、服务慢的帖子在社交媒体上传开了。'),
      choices: [
        { id: 'a', l: A('Public apology and a promo', 'Minta maaf terbuka dan beri promo', '公開で謝罪して販促を行う', '公开道歉并推出优惠'), r: A('The apology lands well.', 'Permintaan maaf diterima baik.', '謝罪は好意的に受け止められます。', '道歉获得好评。'), eff: { cash: -10, sat: { home: 5, youth: 4 } } },
        { id: 'b', l: A('Ignore it', 'Abaikan', '無視する', '置之不理'), r: A('Silence reads as arrogance.', 'Diam dianggap angkuh.', '沈黙は傲慢と受け取られます。', '沉默被视为傲慢。'), eff: { sat: { youth: -5, home: -3 } } },
        { id: 'c', l: A('Meet the customer in person', 'Temui pelanggan itu langsung', 'そのお客さんに直接会う', '亲自会见这位顾客'), r: A('One honest conversation changes the story.', 'Satu percakapan jujur mengubah ceritanya.', '誠実な対話が流れを変えます。', '一次坦诚的交谈改变了局面。'), eff: { ethics: 2, sat: { home: 3 } } }] },
    { id: 'bank_offer', w: .8, when: s => s.cash < 90 && s.debt < 1,
      t: A('A credit line', 'Fasilitas kredit', '融資枠の提案', '银行授信'), b: A('A bank offers a Rp 60 million credit line at a fair rate.', 'Sebuah bank menawarkan fasilitas kredit Rp 60 juta dengan bunga wajar.', '銀行が、妥当な金利で6,000万ルピアの融資枠を提案しています。', '一家银行以合理利率提供6000万盾授信额度。'),
      choices: [
        { id: 'a', l: A('Take it', 'Ambil', '利用する', '使用'), r: A('Cash is comfortable. Interest will bite.', 'Kas lega. Bunga akan terasa.', '資金に余裕ができますが、利息が重くのしかかります。', '资金宽裕了，但利息会很吃力。'), eff: { cash: 60, debt: 60 } },
        { id: 'b', l: A('Decline', 'Tolak', '断る', '拒绝'), r: A('You keep your independence.', 'Anda tetap mandiri.', '独立性を保ちます。', '你保持了独立。'), eff: {} }] },
    { id: 'govt_program', w: 1, when: s => s.t >= 6,
      t: A('A government program', 'Program pemerintah', '政府プログラム', '政府项目'), b: A('The district offers subsidized fertilizer through co-ops. Paperwork is required.', 'Pemerintah kabupaten menawarkan pupuk bersubsidi melalui koperasi. Perlu administrasi.', '郡が協同組合を通じて肥料の補助を行います。書類手続きが必要です。', '县里通过合作社发放补贴化肥，需要办理手续。'),
      choices: [
        { id: 'a', l: A('Join the program', 'Ikut program', 'プログラムに参加する', '参加项目'), r: A('Farmers are grateful. The paperwork is not.', 'Petani berterima kasih. Administrasinya tidak.', '農家は感謝します。書類仕事はそうでもありません。', '农民很感激，手续却很烦。'), eff: { cash: -10, sat: { small: 8, big: 4 }, ethics: 1 } },
        { id: 'b', l: A('Skip it', 'Lewati', '見送る', '跳过'), r: A('Farmers look elsewhere.', 'Petani mencari ke tempat lain.', '農家は他を頼ります。', '农民另寻出路。'), eff: { sat: { small: -3 } } }] },
    { id: 'bumper', w: 1, when: s => season(s) <= 1,
      t: A('A bumper harvest ahead', 'Panen raya di depan', '豊作の見通し', '丰收在望'), b: A('The weather looks perfect. The coming harvest may be a big one.', 'Cuaca tampak sempurna. Panen mendatang bisa besar.', '天候は申し分なく、次の収穫は豊作になりそうです。', '天气看起来很完美，接下来的收成可能很大。'),
      choices: [
        { id: 'a', l: A("Pre-contract the farmers' harvest", 'Kontrak awal hasil panen petani', '農家の収穫を前もって契約する', '提前与农民签收购合同'), r: A('Farmers appreciate the certainty.', 'Petani menghargai kepastian.', '農家は確実性を歓迎します。', '农民欣赏这份确定性。'), eff: { cash: -10, harvest: 1.3, sat: { small: 4 } } },
        { id: 'b', l: A('Wait and see', 'Lihat saja dulu', '様子を見る', '先观望'), r: A('Good weather helps anyway.', 'Cuaca baik tetap membantu.', '天候の恩恵は受けられます。', '好天气总归有帮助。'), eff: { harvest: 1.2 } }] },
    { id: 'staff', w: 1, when: s => s.comp >= 1,
      t: A('Mbak Sari gets an offer', 'Mbak Sari mendapat tawaran', 'サリさんに引き抜き', '莎莉被挖角'), b: A('Your best clerk, Mbak Sari, has a job offer from Nusa Mart.', 'Staf terbaik Anda, Mbak Sari, mendapat tawaran kerja dari Nusa Mart.', '一番の店員サリさんに、ヌサ・マートから転職の誘いが来ました。', '你最好的店员莎莉收到了 Nusa Mart 的聘请。'),
      choices: [
        { id: 'a', l: A('Raise her pay', 'Naikkan gajinya', '給与を上げる', '给她加薪'), r: A('She stays, and the service stays warm.', 'Ia bertahan, dan layanan tetap hangat.', '彼女は残り、サービスの温かさも保たれます。', '她留下了，服务依然温暖。'), eff: { ovh: 3, sat: { home: 2 } } },
        { id: 'b', l: A('Let her go', 'Biarkan pergi', '送り出す', '放她走'), r: A('Regulars notice the empty counter.', 'Pelanggan tetap melihat kasir kosong.', '常連は空いたレジに気づきます。', '老顾客注意到空着的柜台。'), eff: { sat: { home: -2 } } }] }
  ];
  C.EVENTS = X;

  /* texts -> i18n keys */
  const strings = { en: {}, id: {}, ja: {}, zh: {} }, L = ['en', 'id', 'ja', 'zh'];
  const put = (k, a) => { if (a && a[0]) L.forEach((l, i) => { strings[l][k] = a[i]; }); };
  X.forEach(e => {
    put('ev_' + e.id + '_t', e.t); put('ev_' + e.id + '_b', e.b);
    e.choices.forEach(c => {
      const p = 'ev_' + e.id + '_' + c.id; put(p, c.l); put(p + 'r', c.r); put(p + 'w', c.rw); put(p + 'l', c.rl); put(p + 'p', c.rp); put(p + 'f', c.rf);
    });
  });
  if (root.MBALAB.sims && root.MBALAB.sims.define) root.MBALAB.sims.define('koperasi-tycoon', { strings });
  C.EVENT_STRINGS = strings;
})();
