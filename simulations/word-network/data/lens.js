/* Word Network: curated "lens" data. For each business concept: benefits (pos) and trade-offs (neg), written by hand, in 4 languages.
   Item = [dimension, context tags, SWOW anchor word, importance 1-3, "en|id|ja|zh" label, "en|id|ja|zh" explanation].
   Dimensions - pos: val (value), mkt (market), cap (capability), ppl (people); neg: cost, risk, eff (effort/time), ppl (people).
   Context tags: fin, health, edu, food, pub, mfg, retail, biz, fam ('*' = relevant everywhere). The anchor word links an item to
   the SWOW network so a free-typed context word can be scored. These are the author's judgements for teaching, not measured data. */
(function () {
  window.MBALAB = window.MBALAB || {}; MBALAB.wordnet = MBALAB.wordnet || {};
  const I = (d, tg, a, m, l, e) => ({ d, tg: tg === '*' ? [] : tg.split(','), a, m, l: l.split('|'), e: e.split('|') });
  const C = (k, name, x, pos, neg, cat) => ({ k, name: name.split('|'), x, pos, neg, cat: cat || '' });
  MBALAB.wordnet.lensKit = { I, C };   /* later files (lens-2.js ...) add concepts with these helpers */
  MBALAB.wordnet.lens = [
    C('growth', 'Growth|Pertumbuhan|成長|增长', ['quality', 'loan'], [
      I('mkt', 'retail,biz', 'market', 3, 'Market share|Pangsa pasar|市場シェア|市场份额', 'Bigger reach wins more customers than rivals.|Jangkauan lebih besar memenangkan lebih banyak pelanggan daripada pesaing.|到達範囲が広がり、競合より多くの顧客を獲得できる。|覆盖更广，能比对手赢得更多客户。'),
      I('val', 'mfg,biz', 'profit', 3, 'Economies of scale|Skala ekonomi|規模の経済|规模经济', 'Unit costs fall as volume rises, lifting margins.|Biaya per unit turun saat volume naik, margin membaik.|量が増えると単位コストが下がり、利益率が上がる。|规模扩大使单位成本下降，利润率提高。'),
      I('ppl', 'biz,pub', 'job', 2, 'Jobs and careers|Lapangan kerja dan karier|雇用とキャリア|就业与职业发展', 'A growing organisation can hire and promote people.|Organisasi yang tumbuh bisa merekrut dan mempromosikan orang.|成長する組織は採用と昇進の機会を生む。|成长的组织能招聘并晋升员工。'),
      I('cap', 'mfg,fin', 'power', 2, 'Bargaining power|Daya tawar|交渉力|议价能力', 'Size gives better terms with suppliers and lenders.|Ukuran besar memberi syarat lebih baik dari pemasok dan pemberi pinjaman.|規模が大きいほど仕入先や貸し手に有利な条件を引き出せる。|规模大，更能向供应商和贷款方争取好条件。'),
      I('val', 'fin,biz', 'invest', 2, 'Investor appeal|Daya tarik investor|投資家への魅力|投资者吸引力', 'A growth story attracts capital for the next stage.|Cerita pertumbuhan menarik modal untuk tahap berikutnya.|成長ストーリーは次の段階の資金を呼び込む。|增长故事能为下一阶段吸引资金。')
    ], [
      I('risk', 'fin,biz,retail', 'debt', 3, 'Cash strain|Tekanan arus kas|資金繰りの圧迫|现金流压力', 'Stock, staff and equipment must be paid for before the new revenue arrives.|Stok, staf, dan peralatan harus dibayar sebelum pendapatan baru datang.|新しい売上が入る前に、在庫・人員・設備の支払いが必要になる。|新收入到账之前，库存、人员和设备就要先付款。'),
      I('risk', 'food,retail,health', 'quality', 3, 'Quality slips|Kualitas menurun|品質の低下|质量下滑', 'Standards are hard to hold when volume jumps.|Standar sulit dijaga saat volume melonjak.|量が急増すると、基準を保つのが難しくなる。|业务量激增时，标准很难守住。'),
      I('ppl', 'biz,edu,health', 'team', 2, 'Culture dilution|Budaya melemah|文化の希薄化|文化被稀释', 'New hires outnumber old hands and shared habits fade.|Karyawan baru melebihi yang lama dan kebiasaan bersama memudar.|新入社員が古参を上回り、共有の習慣が薄れる。|新员工多过老员工，共同习惯逐渐消失。'),
      I('eff', 'biz,pub', 'control', 2, 'Complexity|Kompleksitas|複雑さ|复杂性', 'More layers, systems and meetings slow every decision.|Lebih banyak lapisan, sistem, dan rapat memperlambat setiap keputusan.|階層・システム・会議が増え、意思決定が遅くなる。|层级、系统和会议增多，每个决策都变慢。'),
      I('cost', 'mfg,biz', 'cost', 2, 'Rising overheads|Biaya tetap membengkak|固定費の増加|固定成本上升', 'Offices, systems and managers add costs that are hard to cut later.|Kantor, sistem, dan manajer menambah biaya yang sulit dipangkas kemudian.|事務所・システム・管理職の費用は、後から削るのが難しい。|办公室、系统和管理者带来的成本日后难以削减。')
    ]),
    C('speed', 'Speed|Kecepatan|スピード|速度', ['quality', 'price'], [
      I('mkt', 'retail,biz', 'first', 3, 'First-mover edge|Keunggulan pelopor|先行者利益|先发优势', 'Arriving first lets you set expectations and win early customers.|Datang lebih dulu memungkinkan Anda membentuk harapan dan merebut pelanggan awal.|先に市場に出れば、期待値を作り初期顧客を獲得できる。|率先进入市场，可以塑造预期并赢得早期客户。'),
      I('cap', 'biz,pub', 'learn', 3, 'Faster learning|Belajar lebih cepat|学習の高速化|学习更快', 'Short cycles show what works before money is wasted.|Siklus pendek menunjukkan apa yang berhasil sebelum uang terbuang.|サイクルが短いと、お金を無駄にする前に何が効くか分かる。|周期短，能在浪费资金前看清什么有效。'),
      I('val', 'retail,food', 'time', 2, 'Cash comes sooner|Kas masuk lebih cepat|現金化が早い|资金回笼更快', 'Quicker delivery means quicker payment and less stock tied up.|Pengiriman lebih cepat berarti pembayaran lebih cepat dan stok tertahan lebih sedikit.|納品が早いほど入金も早く、在庫の滞留も減る。|交付更快意味着回款更快、积压库存更少。'),
      I('mkt', 'health,pub', 'service', 2, 'Customer delight|Kepuasan pelanggan|顧客満足|客户满意', 'People value waiting less, from queues to deliveries.|Orang menghargai waktu tunggu yang singkat, dari antrean sampai pengiriman.|行列から配送まで、待ち時間の短さは評価される。|从排队到送货，人们都看重等待更短。'),
      I('cap', 'mfg', 'change', 2, 'Agility|Kelincahan|機動力|敏捷性', 'A fast organisation can react to change before others notice.|Organisasi yang cepat bisa merespons perubahan sebelum yang lain menyadarinya.|速い組織は、他社が気づく前に変化へ対応できる。|行动快的组织能在别人察觉前应对变化。')
    ], [
      I('risk', 'food,health,mfg', 'mistake', 3, 'More mistakes|Lebih banyak kesalahan|ミスの増加|错误增多', 'Less time to check means more defects and rework.|Waktu memeriksa lebih sedikit berarti lebih banyak cacat dan pengerjaan ulang.|確認の時間が減り、不良や手戻りが増える。|检查时间少，缺陷和返工就多。'),
      I('cost', 'retail,mfg', 'expensive', 3, 'Premium cost|Biaya premium|割増コスト|溢价成本', 'Rush shipping, overtime and extra staff all cost more.|Pengiriman kilat, lembur, dan staf tambahan semuanya lebih mahal.|特急配送・残業・追加人員はすべてコストが高い。|加急运输、加班和增派人手都更贵。'),
      I('ppl', 'biz,health,edu', 'stress', 3, 'Burnout|Kelelahan kerja|燃え尽き|职业倦怠', 'Constant urgency wears people out and raises turnover.|Desakan terus-menerus melelahkan orang dan menaikkan pergantian karyawan.|常に急かされると人は疲弊し、離職が増える。|长期赶工使人疲惫，离职率上升。'),
      I('risk', 'fin,pub', 'danger', 2, 'Skipped safeguards|Pengaman terlewat|安全対策の省略|跳过保障措施', 'Reviews, tests and approvals get cut when time is short.|Peninjauan, uji coba, dan persetujuan dipangkas saat waktu mepet.|時間がないと、レビュー・テスト・承認が削られる。|时间紧时，评审、测试和审批会被砍掉。'),
      I('eff', 'biz', 'plan', 2, 'Short-term focus|Fokus jangka pendek|短期志向|短视倾向', 'Chasing speed can crowd out planning for the long run.|Mengejar kecepatan bisa menyingkirkan perencanaan jangka panjang.|スピード重視は長期の計画を押しのけることがある。|追求速度可能挤掉长期规划。')
    ]),
    C('quality', 'Quality|Kualitas|品質|质量', ['price', 'speed'], [
      I('mkt', 'retail,food', 'trust', 3, 'Customer trust|Kepercayaan pelanggan|顧客の信頼|客户信任', 'Reliable products earn repeat customers and word of mouth.|Produk andal menghasilkan pelanggan berulang dan rekomendasi dari mulut ke mulut.|信頼できる製品はリピーターと口コミを生む。|可靠的产品带来回头客和口碑。'),
      I('val', 'retail,mfg', 'premium', 3, 'Price premium|Harga premium|プレミアム価格|溢价空间', 'Buyers pay more for something they believe will last.|Pembeli membayar lebih untuk sesuatu yang mereka yakini awet.|長持ちすると信じられるものには、より高い価格を払ってもらえる。|买家愿意为他们相信耐用的东西多付钱。'),
      I('val', 'mfg,health', 'waste', 2, 'Less waste|Lebih sedikit pemborosan|ムダの削減|浪费更少', 'Fewer defects mean fewer returns, repairs and scrap.|Cacat lebih sedikit berarti lebih sedikit retur, perbaikan, dan limbah.|不良が減れば、返品・修理・廃棄も減る。|缺陷少，退货、维修和废料也少。'),
      I('mkt', 'biz,fin', 'name', 2, 'Reputation|Reputasi|評判|声誉', 'A good name takes years to build and protects you in a crisis.|Nama baik butuh bertahun-tahun dibangun dan melindungi Anda saat krisis.|良い評判は築くのに年月がかかり、危機の際に身を守ってくれる。|好名声要多年积累，危机时能保护你。'),
      I('ppl', 'mfg,edu,health', 'proud', 2, 'Pride at work|Kebanggaan kerja|仕事への誇り|工作自豪感', 'People who make good things stay and care more.|Orang yang membuat hal bagus bertahan lebih lama dan lebih peduli.|良いものを作る人は定着し、仕事への意欲も高い。|做出好东西的人更愿意留下，也更用心。')
    ], [
      I('cost', 'mfg,food', 'expensive', 3, 'Higher unit cost|Biaya per unit lebih tinggi|単価の上昇|单位成本更高', 'Better materials, checks and skilled labour cost more.|Bahan lebih baik, pemeriksaan, dan tenaga terampil lebih mahal.|良い素材・検査・熟練労働は、その分コストがかかる。|更好的材料、检验和熟练工人都要花更多钱。'),
      I('eff', 'mfg,health', 'slow', 3, 'Slower output|Produksi lebih lambat|生産の遅れ|产出更慢', 'Inspection and rework take time.|Inspeksi dan pengerjaan ulang memakan waktu.|検査や手直しには時間がかかる。|检验和返工需要时间。'),
      I('risk', 'retail,biz', 'price', 2, 'Priced out|Tersisih karena harga|価格で敬遠される|价格劝退', 'Some customers cannot or will not pay for extra quality.|Sebagian pelanggan tidak mampu atau tidak mau membayar kualitas ekstra.|追加の品質にお金を払えない、または払いたくない顧客もいる。|有些客户付不起或不愿为额外的质量买单。'),
      I('risk', 'biz,edu', 'perfect', 2, 'Over-engineering|Terlalu dipoles|作り込みすぎ|过度打磨', 'Polishing past what customers notice wastes money.|Memoles melebihi yang disadari pelanggan membuang uang.|顧客が気づかない水準まで磨くのは無駄になる。|打磨到顾客察觉不到的程度，是浪费。'),
      I('ppl', 'mfg,health', 'pressure', 2, 'Pressure on staff|Tekanan pada staf|現場への圧力|员工压力', 'Strict standards can make people fear blame.|Standar ketat bisa membuat orang takut disalahkan.|厳しい基準は、責められる恐れを生むことがある。|严格标准可能让人害怕被责备。')
    ]),
    C('price', 'Price|Harga|価格|价格', ['quality', 'brand'], [
      I('val', 'retail,biz', 'profit', 3, 'Margin|Margin|利幅|利润率', 'A higher price lifts profit on every sale.|Harga lebih tinggi menaikkan laba pada setiap penjualan.|価格を上げると、1件ごとの利益が増える。|提高价格，每笔销售的利润都增加。'),
      I('mkt', 'retail,food', 'cheap', 3, 'Attracts buyers|Menarik pembeli|買い手を引きつける|吸引买家', 'A low price brings in price-sensitive customers fast.|Harga rendah cepat menarik pelanggan yang peka harga.|低価格は価格に敏感な顧客を素早く呼び込む。|低价能迅速吸引价格敏感的客户。'),
      I('mkt', 'biz,fin', 'value', 2, 'Signals value|Menandakan nilai|価値のシグナル|传达价值', 'Price tells people what to expect about quality.|Harga memberi tahu orang apa yang diharapkan tentang kualitas.|価格は、品質への期待を人々に伝える。|价格告诉人们该对质量抱有什么期待。'),
      I('cap', 'biz,mfg', 'money', 2, 'Funds improvement|Mendanai perbaikan|改善の原資|为改进提供资金', 'Revenue pays for better products and staff.|Pendapatan membayar produk dan staf yang lebih baik.|収入が、より良い製品と人材の資金になる。|收入可支付更好的产品和人才。'),
      I('cap', 'retail,fin', 'control', 2, 'Easy lever to test|Mudah diuji|試しやすい手段|易于测试', 'Price is one of the quickest levers to adjust and measure.|Harga adalah salah satu tuas tercepat untuk disesuaikan dan diukur.|価格は、調整と測定が最も素早くできる手段の一つ。|价格是最快调整和衡量的杠杆之一。')
    ], [
      I('risk', 'retail,food', 'lose', 3, 'Lost customers|Pelanggan hilang|顧客離れ|客户流失', 'Raise it too far and buyers switch to a rival.|Naikkan terlalu tinggi dan pembeli pindah ke pesaing.|上げすぎると、買い手は競合に流れる。|涨得太高，买家就会转向对手。'),
      I('cost', 'retail,mfg', 'poor', 3, 'Thin margins|Margin tipis|薄利|利润微薄', 'A low price leaves little to cover costs and surprises.|Harga rendah menyisakan sedikit untuk menutup biaya dan kejutan.|低価格では、コストや想定外の出費を賄う余裕が少ない。|低价几乎无法覆盖成本和意外开支。'),
      I('risk', 'retail,biz', 'war', 2, 'Price wars|Perang harga|価格競争|价格战', 'Rivals can copy a price cut in a day, and everyone loses margin.|Pesaing bisa meniru potongan harga dalam sehari, dan semua kehilangan margin.|値下げは1日で真似され、全社の利幅が減る。|对手一天就能跟进降价，大家的利润都被压缩。'),
      I('risk', 'food,fin', 'cheap', 2, 'Cheap image|Citra murahan|安物のイメージ|廉价形象', 'Low prices can make a product look low in quality.|Harga rendah bisa membuat produk terlihat berkualitas rendah.|低価格は、品質が低いという印象を与えかねない。|低价可能让产品显得质量低。'),
      I('ppl', 'pub,health,edu', 'fair', 2, 'Fairness backlash|Reaksi soal keadilan|不公平への反発|公平性反弹', 'Customers react badly when prices seem unfair or hidden.|Pelanggan bereaksi buruk ketika harga terasa tidak adil atau tersembunyi.|価格が不公平・不透明に見えると、顧客は強く反発する。|价格显得不公平或不透明时，客户反应强烈。')
    ]),
    C('innovation', 'Innovation|Inovasi|イノベーション|创新', ['speed', 'loan'], [
      I('mkt', 'biz,retail', 'new', 3, 'Stand out|Tampil beda|差別化|脱颖而出', 'Something new gives customers a reason to choose you.|Sesuatu yang baru memberi pelanggan alasan memilih Anda.|新しさは、顧客があなたを選ぶ理由になる。|新东西让客户有理由选择你。'),
      I('val', 'mfg,biz', 'profit', 3, 'New revenue|Pendapatan baru|新たな収益|新收入来源', 'New products and methods open income that rivals lack.|Produk dan cara baru membuka pendapatan yang tidak dimiliki pesaing.|新しい製品や手法は、競合にない収益を生む。|新产品和新方法开辟对手没有的收入。'),
      I('cap', 'health,edu,mfg', 'learn', 2, 'Capability|Kapabilitas|組織能力|能力积累', 'Each experiment builds skills that are hard to copy.|Setiap percobaan membangun keterampilan yang sulit ditiru.|実験を重ねるほど、真似しにくい力が育つ。|每次试验都积累难以复制的能力。'),
      I('ppl', 'biz,edu', 'idea', 2, 'Attracts talent|Menarik talenta|人材を引きつける|吸引人才', 'Curious people want to work where ideas are tried.|Orang yang ingin tahu ingin bekerja di tempat ide dicoba.|好奇心のある人は、アイデアを試せる職場で働きたがる。|好奇的人愿意在能尝试想法的地方工作。'),
      I('val', 'pub,health', 'save', 2, 'Efficiency gains|Efisiensi lebih baik|効率の向上|效率提升', 'Better methods can cut cost and time.|Cara yang lebih baik dapat memangkas biaya dan waktu.|より良い手法は、コストと時間を減らせる。|更好的方法能降低成本和时间。')
    ], [
      I('cost', 'biz,mfg,health', 'expensive', 3, 'R&D spending|Biaya riset|研究開発費|研发开支', 'Research and trials cost money before any return.|Riset dan uji coba memakan biaya sebelum ada imbal hasil.|研究や試験には、リターンの前に資金がかかる。|研发和试验要先花钱，回报在后。'),
      I('risk', 'biz,fin', 'fail', 3, 'Most ideas fail|Kebanyakan ide gagal|多くは失敗する|多数想法会失败', 'Many experiments will not pay off, and some will be public.|Banyak percobaan tidak akan membuahkan hasil, dan sebagian terlihat publik.|多くの実験は実を結ばず、公になる失敗もある。|很多试验不会成功，有些还会公开失败。'),
      I('eff', 'pub,health,edu', 'slow', 2, 'Takes time|Butuh waktu|時間がかかる|耗时长', 'Results can take years, longer than budgets and patience allow.|Hasil bisa memakan bertahun-tahun, lebih lama dari anggaran dan kesabaran.|成果が出るまで数年かかり、予算や忍耐が持たないことがある。|见效可能要数年，超出预算与耐心。'),
      I('ppl', 'pub,biz', 'fear', 2, 'Resistance to change|Penolakan terhadap perubahan|変化への抵抗|对变化的抵触', 'People like routines, and change feels like a threat.|Orang menyukai rutinitas, dan perubahan terasa sebagai ancaman.|人は慣れた手順を好み、変化を脅威と感じる。|人们喜欢惯例，变化让人觉得受威胁。'),
      I('risk', 'retail,fin', 'copy', 2, 'Easily copied|Mudah ditiru|真似されやすい|容易被模仿', 'Rivals can follow after you have paid for the learning.|Pesaing bisa mengikuti setelah Anda membayar biaya belajarnya.|学習のコストを払った後で、競合に追随される。|你付出学习成本后，对手可以直接跟进。')
    ]),
    C('brand', 'Brand|Merek|ブランド|品牌', ['price', 'innovation'], [
      I('mkt', 'retail,food', 'trust', 3, 'Trust shortcut|Jalan pintas kepercayaan|信頼の近道|信任捷径', 'Buyers choose a known name when they cannot judge the product.|Pembeli memilih nama yang dikenal saat tidak bisa menilai produknya.|商品を見極められないとき、買い手は知っている名前を選ぶ。|买家无法判断产品时，会选择熟悉的名字。'),
      I('val', 'retail,mfg', 'premium', 3, 'Price premium|Harga premium|プレミアム価格|品牌溢价', 'Strong brands can charge more for the same product.|Merek kuat bisa menetapkan harga lebih tinggi untuk produk yang sama.|強いブランドは、同じ製品でも高い価格をつけられる。|强势品牌同样的产品可以卖得更贵。'),
      I('mkt', 'retail,biz', 'loyal', 2, 'Loyalty|Loyalitas|ロイヤルティ|忠诚度', 'Customers return even when rivals discount.|Pelanggan kembali walau pesaing memberi diskon.|競合が値引きしても、顧客は戻ってくる。|即使对手打折，客户也会回来。'),
      I('cap', 'biz,fin', 'extend', 2, 'Easier launches|Peluncuran lebih mudah|新商品を出しやすい|新品更易推出', 'A trusted name helps new products start faster.|Nama tepercaya membantu produk baru lebih cepat dikenal.|信頼される名前は、新商品の立ち上がりを助ける。|可信的名字帮助新产品更快起步。'),
      I('ppl', 'biz,edu,pub', 'proud', 2, 'Hiring pull|Daya tarik rekrutmen|採用への好影響|招聘吸引力', 'People are proud to work for a respected name.|Orang bangga bekerja di nama yang dihormati.|尊敬されるブランドで働くことは、誇りになる。|人们以在受尊敬的品牌工作为荣。')
    ], [
      I('cost', 'retail,food', 'advertising', 3, 'Costly to build|Mahal dibangun|構築コストが高い|建设成本高', 'Advertising, design and consistency take years of spending.|Iklan, desain, dan konsistensi butuh pengeluaran bertahun-tahun.|広告・デザイン・一貫性の維持には、長年の投資が必要。|广告、设计和保持一致需要多年投入。'),
      I('risk', 'food,fin,health', 'scandal', 3, 'One scandal hurts all|Satu skandal merugikan semua|不祥事が全体に及ぶ|一次丑闻殃及全部', 'A single failure can damage trust built over decades.|Satu kegagalan bisa merusak kepercayaan yang dibangun puluhan tahun.|1つの失敗が、数十年かけた信頼を傷つけうる。|一次失误就可能毁掉数十年积累的信任。'),
      I('risk', 'retail,mfg', 'name', 2, 'Hard to change|Sulit diubah|変えにくい|难以转变', 'A strong image can trap you when the market moves.|Citra kuat bisa menjebak Anda saat pasar berubah.|強いイメージは、市場が変わったときに足かせになる。|强烈的形象会在市场变化时成为束缚。'),
      I('eff', 'biz,pub', 'control', 2, 'Consistency effort|Upaya menjaga konsistensi|一貫性の維持負担|保持一致的负担', 'Every outlet and employee must deliver the same promise.|Setiap gerai dan karyawan harus menepati janji yang sama.|すべての店舗と社員が同じ約束を守る必要がある。|每个门店和员工都要兑现同样的承诺。'),
      I('ppl', 'retail,fam', 'copy', 2, 'Fakes and copycats|Pemalsuan dan peniru|偽物と模倣|仿冒与山寨', 'Famous names attract imitators who borrow the reputation.|Nama terkenal menarik peniru yang menumpang reputasi.|有名なブランドは、評判にただ乗りする模倣者を呼ぶ。|名牌会吸引借用声誉的模仿者。')
    ]),
    C('automation', 'Automation|Otomatisasi|自動化|自动化', ['technology', 'leadership'], [
      I('val', 'mfg,fin', 'save', 3, 'Lower unit cost|Biaya per unit lebih rendah|単位コストの低下|单位成本降低', 'Machines and software do repeated work more cheaply at scale.|Mesin dan perangkat lunak mengerjakan tugas berulang lebih murah dalam skala besar.|機械やソフトは、繰り返し作業を大量でも安く処理できる。|机器和软件处理重复工作，规模越大越便宜。'),
      I('cap', 'mfg,health', 'perfect', 3, 'Consistency|Konsistensi|品質の安定|稳定一致', 'Fewer human slips, the same result every time.|Lebih sedikit kekeliruan manusia, hasil sama setiap kali.|人為ミスが減り、毎回同じ結果が出る。|人为失误更少，每次结果一致。'),
      I('mkt', 'retail,fin', 'time', 2, 'Always on|Beroperasi terus|常時稼働|全天候运转', 'Service runs day and night without overtime.|Layanan berjalan siang malam tanpa lembur.|残業なしで、昼夜を問わずサービスが動く。|服务昼夜运行，无需加班。'),
      I('ppl', 'mfg,health,biz', 'boring', 2, 'Frees people|Membebaskan orang|人を解放する|解放员工', 'Staff can move from dull tasks to judgement and care.|Staf bisa beralih dari tugas membosankan ke penilaian dan kepedulian.|単調な作業から、判断や気配りが必要な仕事に移れる。|员工可从枯燥工作转向判断与关怀。'),
      I('val', 'fin,biz', 'data', 2, 'Data for decisions|Data untuk keputusan|意思決定のデータ|决策数据', 'Automated steps leave records you can measure and improve.|Langkah otomatis meninggalkan catatan yang bisa diukur dan diperbaiki.|自動化された工程は、測定・改善できる記録を残す。|自动化环节留下可衡量、可改进的记录。')
    ], [
      I('cost', 'mfg,fin', 'expensive', 3, 'Upfront investment|Investasi awal|初期投資|前期投入', 'Equipment, software and integration cost a lot before savings begin.|Peralatan, perangkat lunak, dan integrasi mahal sebelum penghematan terasa.|設備・ソフト・連携に、節約が始まる前に大きな費用がかかる。|设备、软件和集成在见到节省前要花大钱。'),
      I('ppl', 'mfg,retail,pub', 'job', 3, 'Job losses|Hilangnya pekerjaan|雇用の喪失|岗位流失', 'Roles disappear, with fear, protest and lost know-how.|Peran hilang, disertai ketakutan, protes, dan hilangnya pengetahuan.|仕事が消え、不安・反発・ノウハウの喪失が起きる。|岗位消失，伴随恐惧、抗议和经验流失。'),
      I('risk', 'fin,health,mfg', 'fail', 2, 'Single point of failure|Satu titik kegagalan|単一障害点|单点故障', 'When the system breaks, everything stops at once.|Saat sistem rusak, semuanya berhenti sekaligus.|システムが止まると、すべてが一度に止まる。|系统一坏，全部同时停摆。'),
      I('risk', 'health,pub,retail', 'cold', 2, 'Loses the human touch|Kehilangan sentuhan manusia|人間味の喪失|失去人情味', 'Customers get stuck when a machine cannot handle their case.|Pelanggan terjebak saat mesin tidak bisa menangani kasus mereka.|機械が対応できないとき、顧客は行き詰まる。|机器处理不了时，客户会被卡住。'),
      I('eff', 'biz,mfg', 'change', 2, 'Hard to change later|Sulit diubah kemudian|後から変えにくい|日后难以调整', 'Automated processes lock in how work is done.|Proses otomatis mengunci cara kerja yang dipakai.|自動化された工程は、仕事のやり方を固定してしまう。|自动化流程会把做事方式固化。')
    ]),
    C('outsourcing', 'Outsourcing|Alih daya|アウトソーシング|外包', ['quality', 'leadership'], [
      I('val', 'mfg,retail,biz', 'save', 3, 'Lower cost|Biaya lebih rendah|コスト削減|成本更低', 'A specialist can often do the task cheaper than you can.|Spesialis sering bisa mengerjakan tugas lebih murah daripada Anda.|専門業者の方が、自社より安く仕事をこなせることが多い。|专业机构往往比自己做更便宜。'),
      I('cap', 'biz,fin,health', 'skill', 3, 'Expert skills|Keahlian ahli|専門スキル|专业技能', 'Access to know-how you would take years to build.|Akses ke keahlian yang butuh bertahun-tahun untuk Anda bangun.|自社で育てるなら何年もかかるノウハウを使える。|获得自己需要多年才能建立的专业能力。'),
      I('cap', 'biz,mfg', 'focus', 2, 'Focus on the core|Fokus pada inti bisnis|本業への集中|聚焦核心业务', 'Management time goes to what makes you different.|Waktu manajemen dipakai untuk hal yang membuat Anda berbeda.|経営の時間を、自社の強みに集中できる。|管理层时间集中在能让你与众不同的事上。'),
      I('mkt', 'retail,food', 'flexible', 2, 'Flexible capacity|Kapasitas fleksibel|柔軟な処理能力|产能灵活', 'Scale up for peak season and down afterwards.|Naikkan kapasitas saat musim ramai dan turunkan sesudahnya.|繁忙期は増やし、その後は減らせる。|旺季扩大，旺季后收缩。'),
      I('val', 'fin,biz', 'risk', 2, 'Shares risk|Berbagi risiko|リスクの分担|分担风险', 'Part of the investment and uncertainty sits with the partner.|Sebagian investasi dan ketidakpastian ditanggung mitra.|投資と不確実性の一部を、パートナーが負う。|部分投资和不确定性由合作方承担。')
    ], [
      I('risk', 'food,health,mfg', 'quality', 3, 'Less control of quality|Kendali kualitas berkurang|品質管理が弱まる|质量难以掌控', 'You carry the blame for work you do not directly supervise.|Anda menanggung kesalahan atas pekerjaan yang tidak diawasi langsung.|直接監督していない仕事の責任を、自社が負うことになる。|对不亲自监督的工作，你仍要担责。'),
      I('risk', 'mfg,retail', 'depend', 3, 'Dependence|Ketergantungan|依存|依赖对方', 'Switching later is hard, and the supplier gains bargaining power.|Berpindah kemudian sulit, dan pemasok menguat dalam tawar-menawar.|後から切り替えにくく、委託先の交渉力が強まる。|日后难以更换，供应商议价能力增强。'),
      I('risk', 'fin,health,pub', 'secret', 3, 'Data and secrets leak|Data dan rahasia bocor|情報漏えい|数据与机密泄露', 'Sharing information widens the circle that can lose or misuse it.|Berbagi informasi memperluas lingkaran yang bisa kehilangan atau menyalahgunakannya.|情報を共有するほど、紛失・悪用のリスクが広がる。|共享信息会扩大可能丢失或滥用它的范围。'),
      I('ppl', 'biz,pub,mfg', 'job', 2, 'Morale and loyalty|Moral dan loyalitas|士気と忠誠心|士气与忠诚', 'Staff fear for their jobs and know-how walks out the door.|Staf cemas soal pekerjaan dan pengetahuan ikut keluar.|社員は雇用を心配し、ノウハウも外へ出ていく。|员工担心饭碗，经验也随之流失。'),
      I('eff', 'biz,retail', 'communication', 2, 'Coordination effort|Beban koordinasi|調整の手間|协调负担', 'Contracts, meetings and time zones add hidden work.|Kontrak, rapat, dan perbedaan zona waktu menambah pekerjaan tersembunyi.|契約・会議・時差が、見えない手間を増やす。|合同、会议和时差带来隐性工作。')
    ]),
    C('leadership', 'Leadership|Kepemimpinan|リーダーシップ|领导力', ['speed', 'partnership'], [
      I('cap', 'biz,pub,health', 'direction', 3, 'Clear direction|Arah yang jelas|明確な方向性|方向明确', 'People know where they are heading and why.|Orang tahu ke mana mereka menuju dan mengapa.|どこへ向かい、なぜそうするのかが皆に伝わる。|大家知道要去哪里以及为什么。'),
      I('cap', 'pub,fin,health', 'decide', 3, 'Fast decisions|Keputusan cepat|迅速な意思決定|决策迅速', 'Someone owns the call, so the team does not stall.|Ada yang memegang keputusan, sehingga tim tidak macet.|判断を担う人がいるので、チームが止まらない。|有人拍板，团队不会停滞。'),
      I('ppl', 'edu,health,biz', 'team', 3, 'Aligned team|Tim yang selaras|チームの一体感|团队一致', 'Shared goals reduce friction between people.|Tujuan bersama mengurangi gesekan antar orang.|共通の目標が、人同士の摩擦を減らす。|共同目标减少人与人的摩擦。'),
      I('ppl', 'biz,edu', 'learn', 2, 'Develops people|Mengembangkan orang|人を育てる|培养人才', 'Good leaders grow the next leaders.|Pemimpin yang baik menumbuhkan pemimpin berikutnya.|良いリーダーは、次のリーダーを育てる。|好领导会培养下一批领导。'),
      I('mkt', 'pub,fin,biz', 'trust', 2, 'Trust outside|Kepercayaan dari luar|外部からの信頼|外部信任', 'Investors, partners and customers back a leader they believe in.|Investor, mitra, dan pelanggan mendukung pemimpin yang mereka percaya.|投資家・パートナー・顧客は、信頼できるリーダーを支持する。|投资人、伙伴和客户会支持他们信任的领导。')
    ], [
      I('risk', 'pub,biz,fam', 'power', 3, 'Over-reliance on one person|Terlalu bergantung pada satu orang|1人への過度な依存|过度依赖一人', 'If the leader leaves or errs, the whole organisation shakes.|Jika pemimpin pergi atau salah, seluruh organisasi goyah.|リーダーが去る、または誤ると、組織全体が揺らぐ。|领导离开或犯错，整个组织都会动摇。'),
      I('ppl', 'biz,edu,health', 'ego', 3, 'Silenced voices|Suara yang dibungkam|声が届かない|声音被压制', 'Strong leaders can make others stop speaking up.|Pemimpin yang kuat bisa membuat orang lain berhenti bicara.|強いリーダーの下では、他の人が意見を言わなくなることがある。|强势领导可能让其他人不再发声。'),
      I('eff', 'pub,biz', 'responsible', 2, 'Heavy workload|Beban kerja berat|重い負担|工作负担重', 'Leaders carry decisions, meetings and blame.|Pemimpin menanggung keputusan, rapat, dan kritik.|リーダーは、決断・会議・責任を背負う。|领导要承担决策、会议和责任。'),
      I('risk', 'fin,pub', 'wrong', 2, 'Blind spots|Titik buta|盲点|盲点', 'Leaders can lose touch with what happens at the front line.|Pemimpin bisa kehilangan kontak dengan kenyataan di lapangan.|リーダーは、現場の実情から離れてしまうことがある。|领导可能与一线实际脱节。'),
      I('ppl', 'biz,fam,pub', 'fight', 2, 'Politics and rivalry|Politik dan persaingan internal|社内政治と対立|内部政治与竞争', 'Competing for the top role can split teams.|Persaingan untuk posisi puncak bisa memecah tim.|トップの座をめぐる争いが、チームを分断することがある。|争夺高位可能分裂团队。')
    ]),
    C('expansion', 'Expansion|Ekspansi|拡大・進出|扩张', ['quality', 'diversification'], [
      I('mkt', 'retail,food,biz', 'market', 3, 'New customers|Pelanggan baru|新規顧客|新客户', 'New places or segments bring buyers you could not reach.|Lokasi atau segmen baru membawa pembeli yang sebelumnya tak terjangkau.|新しい地域やセグメントで、これまで届かなかった買い手に会える。|新地区或新客群带来原本触及不到的买家。'),
      I('val', 'mfg,biz', 'profit', 3, 'Spread fixed costs|Menyebar biaya tetap|固定費の分散|摊薄固定成本', 'The same brand and systems serve more sales.|Merek dan sistem yang sama melayani lebih banyak penjualan.|同じブランドとシステムで、より多くの売上を支える。|同样的品牌和系统支撑更多销售。'),
      I('val', 'fin,biz', 'safe', 2, 'Less dependence|Ketergantungan berkurang|依存度の低下|降低依赖', 'Several markets cushion a slump in one.|Beberapa pasar meredam kemerosotan di satu pasar.|複数の市場があれば、1つの市場の不調を和らげられる。|多个市场可缓冲单一市场的低迷。'),
      I('cap', 'biz,mfg', 'learn', 2, 'Learning from new places|Belajar dari tempat baru|新しい土地から学ぶ|从新市场学习', 'Local ideas can flow back and improve the core.|Ide lokal bisa mengalir kembali dan memperbaiki bisnis inti.|現地のアイデアが本業に還流し、改善につながる。|当地的想法可以反哺核心业务。'),
      I('mkt', 'retail,pub', 'name', 2, 'Visibility|Visibilitas|知名度の向上|知名度提升', 'More outlets and regions raise awareness.|Lebih banyak gerai dan wilayah meningkatkan kesadaran merek.|店舗や地域が増えるほど、認知が広がる。|门店和地区增多，知名度随之提高。')
    ], [
      I('risk', 'fin,retail,food', 'debt', 3, 'Capital at risk|Modal berisiko|資本リスク|资金风险', 'New sites and markets are paid for before they prove themselves.|Lokasi dan pasar baru dibayar sebelum terbukti berhasil.|新しい拠点や市場は、成果が出る前に投資が必要。|新网点和新市场在证明自己前就要投入资金。'),
      I('risk', 'retail,food,pub', 'strange', 3, 'Unfamiliar rules and tastes|Aturan dan selera asing|不慣れなルールと嗜好|陌生的规则与口味', 'Law, language and customer habits differ.|Hukum, bahasa, dan kebiasaan pelanggan berbeda.|法律・言語・顧客の習慣が違う。|法律、语言和客户习惯都不同。'),
      I('eff', 'biz,mfg', 'stretch', 2, 'Stretched management|Manajemen kewalahan|経営資源の分散|管理力被拉伸', 'Leaders spread thin across many places.|Pemimpin terbagi tipis di banyak tempat.|経営陣の目が、多くの場所に分散する。|管理者精力分散在多个地方。'),
      I('cost', 'retail,mfg', 'cost', 2, 'Setup costs|Biaya pembukaan|立ち上げ費用|启动成本', 'Sites, permits, hiring and logistics add up.|Lokasi, izin, rekrutmen, dan logistik menumpuk.|拠点・許認可・採用・物流の費用が積み上がる。|场地、许可、招聘和物流费用不断叠加。'),
      I('risk', 'retail,food,health', 'quality', 2, 'Core suffers|Bisnis inti terganggu|本業が手薄に|主业受影响', 'Attention leaves the existing business, and standards slip.|Perhatian meninggalkan bisnis yang ada, dan standar turun.|既存事業への注意が薄れ、基準が下がる。|注意力离开现有业务，标准下滑。')
    ]),
    C('technology', 'Technology|Teknologi|テクノロジー|技术', ['automation', 'price'], [
      I('val', 'mfg,fin,biz', 'save', 3, 'Productivity|Produktivitas|生産性|生产率', 'Tools let the same people do more.|Alat memungkinkan orang yang sama berbuat lebih banyak.|道具のおかげで、同じ人数でより多くをこなせる。|工具让同样的人做更多事。'),
      I('mkt', 'retail,fin,edu', 'reach', 3, 'Wider reach|Jangkauan lebih luas|到達範囲の拡大|触达更广', 'Online channels reach customers anywhere.|Kanal daring menjangkau pelanggan di mana saja.|オンラインなら、どこにいる顧客にも届く。|线上渠道可触达任何地方的客户。'),
      I('cap', 'health,pub,fin', 'data', 3, 'Better information|Informasi lebih baik|情報の質向上|信息更好', 'Data shows what is really happening.|Data menunjukkan apa yang sebenarnya terjadi.|データが、実際に何が起きているかを示してくれる。|数据显示真实情况。'),
      I('mkt', 'retail,food,health', 'easy', 2, 'Convenience|Kemudahan|利便性|便利', 'Customers get faster, simpler service.|Pelanggan mendapat layanan lebih cepat dan sederhana.|顧客は、より速く簡単なサービスを受けられる。|客户获得更快、更简单的服务。'),
      I('cap', 'edu,biz', 'new', 2, 'New business models|Model bisnis baru|新しいビジネスモデル|新商业模式', 'Technology makes offers possible that did not exist before.|Teknologi memungkinkan penawaran yang sebelumnya tidak ada.|技術によって、以前はなかった提供の形が可能になる。|技术使过去不存在的服务成为可能。')
    ], [
      I('cost', 'pub,health,mfg', 'expensive', 3, 'Cost and upkeep|Biaya dan perawatan|費用と保守|成本与维护', 'Licences, hardware and updates never stop.|Lisensi, perangkat keras, dan pembaruan tidak pernah berhenti.|ライセンス・機器・更新の費用は終わりがない。|许可证、硬件和更新永无止境。'),
      I('risk', 'fin,health,pub', 'danger', 3, 'Security and privacy|Keamanan dan privasi|セキュリティとプライバシー|安全与隐私', 'More systems mean more ways to be attacked or to leak data.|Lebih banyak sistem berarti lebih banyak celah diserang atau data bocor.|システムが増えるほど、攻撃や情報漏えいの入口も増える。|系统越多，被攻击或泄露数据的入口越多。'),
      I('ppl', 'pub,edu,health', 'difficult', 2, 'Skills gap|Kesenjangan keterampilan|スキルギャップ|技能差距', 'Staff need training, and some get left behind.|Staf perlu pelatihan, dan sebagian tertinggal.|社員に研修が必要で、取り残される人も出る。|员工需要培训，有些人会掉队。'),
      I('risk', 'mfg,retail', 'old', 2, 'Quickly outdated|Cepat usang|すぐ陳腐化|很快过时', 'Today’s investment may be obsolete in a few years.|Investasi hari ini bisa usang dalam beberapa tahun.|今日の投資が、数年で時代遅れになるかもしれない。|今天的投资几年后可能就过时。'),
      I('eff', 'biz,pub', 'complex', 2, 'Integration headaches|Sulitnya integrasi|連携の難しさ|集成难题', 'New tools must fit old systems and habits.|Alat baru harus cocok dengan sistem dan kebiasaan lama.|新しい道具は、古いシステムや習慣と噛み合う必要がある。|新工具必须与旧系统和习惯相容。')
    ]),
    C('diversification', 'Diversification|Diversifikasi|多角化|多元化', ['expansion', 'quality'], [
      I('val', 'fin,biz,food', 'safe', 3, 'Spreads risk|Menyebar risiko|リスク分散|分散风险', 'When one business slumps, others carry you.|Saat satu bisnis lesu, yang lain menopang Anda.|1つの事業が不振でも、他の事業が支えてくれる。|一项业务低迷时，其他业务撑住你。'),
      I('val', 'mfg,food,biz', 'waste', 2, 'Uses spare capacity|Memanfaatkan kapasitas menganggur|余力の活用|利用闲置产能', 'Idle machines, skills or by-products find a second use.|Mesin, keterampilan, atau produk sampingan yang menganggur menemukan fungsi kedua.|遊休設備・人材・副産物に、第二の使い道が生まれる。|闲置机器、技能或副产品获得第二用途。'),
      I('mkt', 'retail,food', 'customer', 2, 'More from each customer|Lebih banyak dari tiap pelanggan|顧客1人あたりの収益増|每位客户创造更多价值', 'Related products let you sell more to the same buyers.|Produk terkait memungkinkan Anda menjual lebih banyak ke pembeli yang sama.|関連商品で、同じ顧客にもっと売れる。|相关产品让你向同一批买家卖更多。'),
      I('cap', 'biz,pub', 'learn', 2, 'New skills|Keterampilan baru|新しいスキル|新技能', 'Each field teaches ideas that can help the others.|Setiap bidang mengajarkan ide yang bisa membantu bidang lain.|各分野で得た発想が、他の分野にも役立つ。|每个领域学到的想法可以帮助其他领域。'),
      I('ppl', 'biz,fam,pub', 'career', 2, 'Career paths|Jenjang karier|キャリアの選択肢|职业路径', 'More areas mean more roles to move into.|Lebih banyak bidang berarti lebih banyak peran untuk dituju.|分野が増えるほど、異動先のポジションも増える。|领域越多，可转岗的位置越多。')
    ], [
      I('eff', 'biz,mfg,retail', 'focus', 3, 'Loses focus|Kehilangan fokus|焦点がぼやける|失去焦点', 'Attention and money are split across too many things.|Perhatian dan uang terbagi ke terlalu banyak hal.|注意と資金が、多くのことに分散する。|注意力和资金被摊到太多事情上。'),
      I('risk', 'biz,retail,food', 'fail', 3, 'Unfamiliar fields|Bidang yang tidak dikenal|不慣れな分野|陌生领域', 'Skills in one field may not carry over to another.|Keterampilan di satu bidang belum tentu berlaku di bidang lain.|ある分野の強みが、別の分野で通用するとは限らない。|一个领域的能力不一定适用于另一个领域。'),
      I('cost', 'mfg,fin', 'cost', 2, 'Duplicated overheads|Biaya ganda|間接費の重複|重复的管理成本', 'Each business needs its own systems and managers.|Setiap bisnis butuh sistem dan manajer sendiri.|事業ごとに、システムと管理者が必要になる。|每项业务都需要自己的系统和管理者。'),
      I('risk', 'retail,fin', 'brand', 2, 'Blurred identity|Identitas kabur|イメージの曖昧化|形象模糊', 'Customers may no longer know what you stand for.|Pelanggan bisa tak lagi tahu apa yang Anda wakili.|顧客が、何の会社なのか分からなくなることがある。|客户可能不再清楚你代表什么。'),
      I('ppl', 'biz,pub', 'conflict', 2, 'Internal competition|Persaingan internal|社内での奪い合い|内部争夺资源', 'Units fight over budgets and talent.|Unit bersaing memperebutkan anggaran dan talenta.|事業部が、予算や人材を奪い合う。|各单元争抢预算和人才。')
    ]),
    C('loan', 'Loan|Pinjaman|借入|贷款', ['growth', 'expansion'], [
      I('val', 'fin,biz,fam', 'money', 3, 'Funds now|Dana sekarang|今すぐ資金を得られる|立即获得资金', 'You can act on a chance without waiting to save up.|Anda bisa memanfaatkan peluang tanpa menunggu menabung.|貯めるのを待たずに、チャンスに動ける。|无需等攒够钱就能抓住机会。'),
      I('val', 'biz,mfg,food', 'invest', 3, 'Fuels growth|Mendorong pertumbuhan|成長の原動力|推动增长', 'Borrowed money can earn more than it costs when invested well.|Uang pinjaman bisa menghasilkan lebih dari biayanya bila diinvestasikan dengan baik.|うまく投資すれば、借りたお金は金利以上の利益を生める。|投资得当，借来的钱赚得比成本更多。'),
      I('cap', 'fin,biz', 'keep', 2, 'Keeps ownership|Mempertahankan kepemilikan|所有権を保てる|保留所有权', 'Unlike selling shares, you do not give up part of the business.|Berbeda dengan menjual saham, Anda tidak melepas sebagian bisnis.|株式を売るのと違い、事業の持ち分を手放さずに済む。|与出售股份不同，不必让出一部分公司。'),
      I('val', 'fin,biz', 'tax', 2, 'Tax advantage|Keuntungan pajak|税務上の利点|税务优势', 'Interest can often be deducted from taxable income.|Bunga sering kali dapat dikurangkan dari penghasilan kena pajak.|利息は、課税所得から差し引けることが多い。|利息通常可从应税收入中扣除。'),
      I('cap', 'fin,fam', 'build', 2, 'Builds credit|Membangun rekam kredit|信用の構築|建立信用', 'Repaying on time makes the next loan easier and cheaper.|Membayar tepat waktu membuat pinjaman berikutnya lebih mudah dan murah.|期日どおりに返せば、次の借入が楽で安くなる。|按时还款会让下次贷款更容易、更便宜。')
    ], [
      I('risk', 'fin,biz,fam', 'debt', 3, 'Must repay anyway|Tetap harus dibayar|返済義務|无论如何都要还', 'Payments are due even when sales are weak.|Cicilan tetap jatuh tempo walau penjualan lesu.|売上が悪くても、返済期日は来る。|即使销售不佳，还款日也照样到来。'),
      I('cost', 'fin,biz,fam', 'interest', 3, 'Interest cost|Biaya bunga|利息負担|利息成本', 'You repay more than you borrowed.|Anda membayar lebih banyak daripada yang dipinjam.|借りた額より多くを返すことになる。|还的比借的多。'),
      I('risk', 'fin,fam,food', 'lose', 3, 'Collateral at stake|Jaminan dipertaruhkan|担保を失うリスク|抵押物有风险', 'If you cannot pay, the pledged asset can be taken.|Jika tidak sanggup membayar, aset yang dijaminkan bisa disita.|返せなければ、担保にした資産を失うことがある。|还不上钱时，抵押资产可能被收走。'),
      I('risk', 'biz,fin', 'limit', 2, 'Limits freedom|Membatasi kebebasan|自由度の制約|限制自由', 'Lenders can set rules on spending and further borrowing.|Pemberi pinjaman dapat menetapkan aturan soal pengeluaran dan pinjaman lanjutan.|貸し手が、支出や追加借入にルールを課すことがある。|贷款方可对支出和再借款设定规则。'),
      I('ppl', 'fam,biz', 'stress', 2, 'Stress|Tekanan batin|ストレス|心理压力', 'Debt weighs on owners, families and decisions.|Utang membebani pemilik, keluarga, dan keputusan.|借金は、経営者・家族・判断に重くのしかかる。|债务压在经营者、家人和决策上。')
    ]),
    C('partnership', 'Partnership|Kemitraan|提携|合作伙伴关系', ['leadership', 'competition'], [
      I('cap', 'biz,mfg,health', 'skill', 3, 'Complementary strengths|Kekuatan yang saling melengkapi|強みの補完|优势互补', 'Each side brings what the other lacks.|Masing-masing membawa apa yang tidak dimiliki pihak lain.|お互いが、相手にない強みを持ち寄る。|各方带来对方所缺的东西。'),
      I('val', 'fin,biz', 'share', 3, 'Shared cost and risk|Biaya dan risiko terbagi|コストとリスクの分担|分担成本与风险', 'Big projects become affordable when costs are split.|Proyek besar menjadi terjangkau saat biaya dibagi.|費用を分け合えば、大きな事業も現実的になる。|成本分摊后，大项目变得可负担。'),
      I('mkt', 'retail,food,pub', 'reach', 2, 'New markets|Pasar baru|新市場|新市场', 'A partner opens doors to customers and places you cannot reach alone.|Mitra membuka pintu ke pelanggan dan tempat yang tak terjangkau sendiri.|パートナーのおかげで、単独では届かない顧客や地域に入れる。|伙伴帮你打开单靠自己进不去的客户和地区。'),
      I('cap', 'biz,edu', 'learn', 2, 'Learning|Pembelajaran|学び合い|相互学习', 'You pick up methods and ideas from the other side.|Anda mengambil metode dan ide dari pihak lain.|相手側の手法やアイデアを吸収できる。|你能从对方学到方法和想法。'),
      I('mkt', 'pub,fin', 'trust', 2, 'Borrowed credibility|Kredibilitas pinjaman|信用の補強|借力增信', 'A respected partner lends credibility to a newcomer.|Mitra yang dihormati memberi kredibilitas kepada pendatang baru.|信頼あるパートナーが、新参者の信用を高めてくれる。|受尊敬的伙伴能为新进入者增加信誉。')
    ], [
      I('risk', 'biz,fin,pub', 'conflict', 3, 'Conflicting goals|Tujuan yang bertabrakan|目的の食い違い|目标冲突', 'Partners want different things when the going gets tough.|Mitra menginginkan hal berbeda saat keadaan sulit.|状況が厳しくなると、パートナーの望みは食い違う。|形势艰难时，伙伴想要的东西会不同。'),
      I('risk', 'mfg,retail', 'secret', 3, 'Knowledge leaks|Pengetahuan bocor|ノウハウの流出|知识外流', 'A partner may learn your secrets and become a rival.|Mitra bisa mempelajari rahasia Anda dan menjadi pesaing.|パートナーが技術を学び、競合になる恐れがある。|伙伴可能学走你的秘密并成为对手。'),
      I('eff', 'biz,pub', 'slow', 2, 'Slower decisions|Keputusan lebih lambat|意思決定の遅れ|决策变慢', 'Two organisations must agree before anything moves.|Dua organisasi harus sepakat sebelum apa pun bergerak.|2つの組織が合意するまで、何も動かない。|两个组织必须先达成一致才能行动。'),
      I('cost', 'fin,biz', 'share', 2, 'Shared profits|Laba harus dibagi|利益の分配|利润要分享', 'Success is divided, so each side keeps less.|Keberhasilan dibagi, sehingga tiap pihak memperoleh lebih sedikit.|成功の果実は分け合うので、取り分は減る。|成功要分享，各方所得变少。'),
      I('ppl', 'biz,fam,pub', 'betray', 2, 'Trust can break|Kepercayaan bisa rusak|信頼が壊れうる|信任可能破裂', 'A broken promise can end both the deal and the relationship.|Janji yang diingkari bisa mengakhiri kesepakatan sekaligus hubungan.|約束が破られれば、取引も関係も終わりうる。|一次违约就可能终结合作和关系。')
    ]),
    C('competition', 'Competition|Persaingan|競争|竞争', ['price', 'partnership'], [
      I('mkt', 'retail,food,fin', 'choice', 3, 'Better deals for customers|Penawaran lebih baik bagi pelanggan|顧客にとっての好条件|客户获得更好条件', 'Rivals push prices down and quality up for buyers.|Pesaing menekan harga dan menaikkan kualitas bagi pembeli.|競合の存在が、価格を下げ品質を上げ、買い手に利益をもたらす。|对手压低价格、提高质量，让买家受益。'),
      I('cap', 'biz,mfg,health', 'improve', 3, 'Forces improvement|Mendorong perbaikan|改善への圧力|倒逼改进', 'You cannot stand still when someone is catching up.|Anda tidak bisa diam saat ada yang mengejar.|追いかけてくる相手がいれば、立ち止まっていられない。|有人追赶时，你无法原地不动。'),
      I('mkt', 'retail,biz', 'market', 2, 'Grows the market|Memperbesar pasar|市場の拡大|做大市场', 'Rivals advertising the category can bring in new buyers for all.|Pesaing yang mengiklankan kategori bisa membawa pembeli baru untuk semua.|競合がカテゴリを広めることで、全体の買い手が増える。|对手推广整个品类，可能给大家带来新买家。'),
      I('cap', 'biz,edu,pub', 'learn', 2, 'Benchmarks|Tolok ukur|ベンチマーク|参照标杆', 'Rivals show what is possible and where you lag.|Pesaing menunjukkan apa yang mungkin dan di mana Anda tertinggal.|競合は、何が可能か、自社がどこで遅れているかを示す。|对手显示了可能达到的水平和你的差距。'),
      I('ppl', 'biz,edu,health', 'win', 2, 'Motivates people|Memotivasi orang|人を奮い立たせる|激励员工', 'A clear rival can unite a team around a goal.|Pesaing yang jelas bisa menyatukan tim di sekitar satu tujuan.|はっきりした好敵手は、チームを目標のもとにまとめる。|明确的对手能让团队围绕目标凝聚。')
    ], [
      I('cost', 'retail,food', 'cheap', 3, 'Margin pressure|Tekanan margin|利幅の圧迫|利润率承压', 'Rivals force discounts that eat into profit.|Pesaing memaksa diskon yang menggerus laba.|競合に値引きを迫られ、利益が削られる。|对手逼迫打折，侵蚀利润。'),
      I('risk', 'retail,biz,fin', 'lose', 3, 'Losing customers|Kehilangan pelanggan|顧客の流出|客户流失', 'Buyers can leave with one click or one bad day.|Pembeli bisa pergi dengan satu klik atau satu hari buruk.|買い手は、ワンクリックや嫌な思い一つで離れていく。|买家只需一次点击或一次糟糕体验就会离开。'),
      I('cost', 'retail,mfg', 'advertising', 2, 'Marketing arms race|Perlombaan pemasaran|マーケ費用の消耗戦|营销军备竞赛', 'Everyone spends more just to stay visible.|Semua mengeluarkan lebih banyak hanya untuk tetap terlihat.|目立ち続けるために、全員が費用を増やし続ける。|每个人都得花更多钱才能保持曝光。'),
      I('ppl', 'biz,health,edu', 'stress', 2, 'Stress and poaching|Tekanan dan pembajakan staf|ストレスと引き抜き|压力与挖人', 'Staff are tempted away, and constant pressure wears teams down.|Staf tergoda pindah, dan tekanan terus-menerus melelahkan tim.|社員は引き抜かれ、絶え間ない圧力でチームは疲れる。|员工被挖角，持续压力消磨团队。'),
      I('risk', 'fin,pub,biz', 'cheat', 2, 'Unfair tactics|Cara-cara tidak adil|不公正な手段|不正当手段', 'Some rivals copy, undercut or spread rumours.|Sebagian pesaing meniru, menjatuhkan harga, atau menyebar rumor.|真似・不当な安売り・風評を使う競合もいる。|有些对手会抄袭、恶意压价或散布谣言。')
    ])
  ];
})();
