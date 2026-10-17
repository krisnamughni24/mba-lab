/* Word Network: curated concepts, batch 15 (macro conditions, internal control and trade). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('inflation', 'Rising inflation|Inflasi yang meningkat|インフレ|通货膨胀', ['deflation'], [
      I('val', 'fin,biz', 'profit', 2, 'Nominal revenue grows|Pendapatan nominal naik|名目売上の増加|名义收入增长', 'Higher prices lift sales figures.|Harga naik mengangkat angka penjualan.|価格上昇で売上が増える。|涨价抬高销售额。'),
      I('val', 'fin', 'debt', 3, 'Debt shrinks in real terms|Utang mengecil secara riil|債務の実質負担が軽くなる|债务实际减轻', 'Borrowers repay with cheaper money.|Peminjam membayar dengan uang lebih murah.|借り手は、価値の下がったお金で返せる。|借款人用贬值的钱还。'),
      I('mkt', 'biz,retail', 'customer', 2, 'Buy now rather than later|Beli sekarang, bukan nanti|今のうちに買う|现在买而非以后', 'Expected price rises pull demand forward.|Kenaikan harga yang diperkirakan menarik permintaan maju.|値上がり予想で、需要が前倒しになる。|预期涨价提前需求。'),
      I('cap', 'fin', 'asset', 2, 'Real assets hold value|Aset riil menjaga nilai|実物資産は価値を保つ|实物资产保值', 'Property and goods keep pace.|Properti dan barang mengikuti kenaikan.|不動産や商品は、物価に追随する。|房产商品跟涨。')
    ], [
      I('cost', 'fam,biz,food', 'expensive', 3, 'Costs rise|Biaya naik|コスト上昇|成本上涨', 'Inputs and wages get dearer.|Bahan baku dan upah makin mahal.|原材料も賃金も上がる。|原料与工资变贵。'),
      I('ppl', 'fam', 'poor', 3, 'Falling purchasing power|Daya beli turun|購買力の低下|购买力下降', 'The same money buys less.|Uang yang sama membeli lebih sedikit.|同じお金で買える量が減る。|同样的钱买得更少。'),
      I('risk', 'fin', 'save', 2, 'Savings lose value|Tabungan kehilangan nilai|貯蓄の目減り|储蓄贬值', 'Cash sitting idle shrinks.|Uang tunai yang menganggur menyusut.|眠らせた現金は、目減りする。|闲置现金缩水。'),
      I('risk', 'biz', 'fear', 2, 'Pricing uncertainty|Ketidakpastian harga|価格設定の不確実性|定价不确定', 'Hard to plan or quote long-term.|Sulit merencanakan atau menawar jangka panjang.|長期の見積りや計画が難しい。|难做长期报价。')
    ]),
    C('deflation', 'Falling prices (deflation)|Harga turun (deflasi)|デフレ|物价下跌（通缩）', ['inflation'], [
      I('ppl', 'fam', 'cheap', 3, 'Goods get cheaper|Barang makin murah|物が安くなる|商品变便宜', 'Consumers gain purchasing power.|Konsumen mendapat daya beli.|消費者の購買力が上がる。|消费者购买力上升。'),
      I('val', 'fin', 'save', 2, 'Cash gains value|Uang tunai bernilai lebih|現金の価値が上がる|现金升值', 'Savers benefit.|Penabung diuntungkan.|貯蓄する人に有利。|储蓄者受益。'),
      I('cost', 'biz', 'cheap', 2, 'Lower input costs|Biaya input lebih rendah|仕入コストの低下|投入成本下降', 'Materials cost less.|Bahan baku lebih murah.|原材料が安くなる。|原料更便宜。'),
      I('val', 'fam', 'safe', 2, 'Stable cost of living|Biaya hidup stabil|生活費が安定|生活成本稳定', 'Budgets stretch further.|Anggaran lebih lentur.|家計にゆとりが出る。|预算更宽裕。')
    ], [
      I('risk', 'biz,fin', 'debt', 3, 'Debt gets heavier|Utang makin berat|債務負担の増加|债务变重', 'Repaying with dearer money.|Membayar dengan uang yang lebih mahal.|価値の上がったお金で返すことになる。|用升值货币偿还。'),
      I('mkt', 'retail,biz', 'wait', 3, 'Buyers wait|Pembeli menunda|買い控え|买家观望', 'Why buy today if cheaper tomorrow?|Mengapa membeli hari ini jika besok lebih murah?|明日安くなるなら、今日買わない。|明天更便宜何必今买?'),
      I('cost', 'biz', 'profit', 2, 'Margins squeezed|Margin terhimpit|利益率の圧迫|利润被挤压', 'Selling prices fall faster than costs.|Harga jual turun lebih cepat dari biaya.|売価が、コストより早く下がる。|售价降得比成本快。'),
      I('ppl', 'biz', 'job', 2, 'Wage cuts and layoffs|Pemotongan gaji dan PHK|賃下げ・解雇|降薪裁员', 'Firms shed costs by cutting people.|Perusahaan memangkas biaya lewat orang.|人件費を削って対応する。|企业通过裁人降本。')
    ]),
    C('high interest rates', 'Rising interest rates|Suku bunga naik|金利上昇|利率上升', ['cheap credit'], [
      I('val', 'fin,fam', 'interest', 3, 'Better returns on savings|Imbal hasil tabungan lebih baik|預金の利回り向上|储蓄回报提高', 'Deposits and bonds pay more.|Deposito dan obligasi membayar lebih.|預金や債券の利回りが上がる。|存款债券收益更高。'),
      I('cap', 'fin', 'discipline', 2, 'Weeds out weak projects|Menyaring proyek lemah|弱い案件を淘汰|淘汰弱项目', 'Only strong returns clear the bar.|Hanya imbal hasil kuat yang lolos.|高い収益だけが基準を超える。|只有高回报项目通过。'),
      I('val', 'pub,fin', 'safe', 2, 'Cools overheating|Mendinginkan pemanasan ekonomi|過熱を冷ます|抑制过热', 'Slows inflation and bubbles.|Memperlambat inflasi dan gelembung.|インフレやバブルを抑える。|抑制通胀与泡沫。'),
      I('mkt', 'fin', 'currency', 2, 'Stronger currency|Mata uang lebih kuat|通貨高要因|货币走强', 'Attracts foreign capital.|Menarik modal asing.|海外資金を引き寄せる。|吸引外资。')
    ], [
      I('cost', 'biz,fin,fam', 'expensive', 3, 'Loans cost more|Pinjaman lebih mahal|借入コストの上昇|贷款更贵', 'Mortgages and working capital bite.|KPR dan modal kerja terasa berat.|住宅ローンや運転資金が重くなる。|房贷与流动资金更重。'),
      I('mkt', 'retail,mfg', 'slow', 3, 'Weaker demand|Permintaan melemah|需要の減速|需求走弱', 'Financed purchases fall.|Pembelian dengan cicilan turun.|ローンでの購入が減る。|分期购买下降。'),
      I('risk', 'biz', 'debt', 2, 'Default risk|Risiko gagal bayar|債務不履行リスク|违约风险', 'Heavily indebted firms struggle.|Perusahaan berutang besar kesulitan.|借入の多い企業が苦しくなる。|高负债企业吃紧。'),
      I('ppl', 'biz,pub', 'job', 2, 'Hiring slows|Perekrutan melambat|採用の鈍化|招聘放缓', 'Expansion is postponed.|Ekspansi ditunda.|拡大が先送りされる。|扩张延后。')
    ]),
    C('cheap credit', 'Cheap, easy credit|Kredit murah dan mudah|低金利・緩い融資|廉价易得信贷', ['high interest rates'], [
      I('val', 'biz,fam', 'cheap', 3, 'Affordable borrowing|Pinjaman terjangkau|借入しやすい|借贷划算', 'Growth and homes become reachable.|Pertumbuhan dan rumah menjadi terjangkau.|成長や住宅購入が現実的になる。|增长与购房可及。'),
      I('mkt', 'retail,mfg', 'customer', 2, 'Stronger demand|Permintaan lebih kuat|需要の拡大|需求增强', 'Buying on credit rises.|Pembelian kredit meningkat.|ローン購入が増える。|信贷购买上升。'),
      I('cap', 'biz', 'new', 2, 'Funds investment|Mendanai investasi|投資資金|资助投资', 'New factories and ventures start.|Pabrik dan usaha baru dimulai.|新工場や新事業が始まる。|新厂与新业务启动。'),
      I('val', 'biz', 'fast', 2, 'Faster expansion|Ekspansi lebih cepat|拡大が早い|扩张更快', 'Capital is rarely the bottleneck.|Modal jarang jadi hambatan.|資金が制約になりにくい。|资金很少是瓶颈。')
    ], [
      I('risk', 'fin,fam', 'debt', 3, 'Over-borrowing|Pinjaman berlebihan|借り過ぎ|过度借贷', 'Households and firms stretch too far.|Rumah tangga dan perusahaan terlalu melar.|家計も企業も、無理をする。|家庭与企业过度扩张。'),
      I('risk', 'fin', 'danger', 3, 'Asset bubbles|Gelembung aset|資産バブル|资产泡沫', 'Prices detach from value.|Harga lepas dari nilai.|価格が実力から乖離する。|价格脱离价值。'),
      I('risk', 'fin', 'mistake', 2, 'Weak lending standards|Standar kredit longgar|審査の甘さ|信贷标准松懈', 'Bad loans pile up.|Kredit macet menumpuk.|不良債権が積み上がる。|坏账堆积。'),
      I('cost', 'fam', 'save', 2, 'Savers earn little|Penabung mendapat sedikit|預金者の不利|储蓄者收益低', 'Deposits barely grow.|Deposito nyaris tak tumbuh.|預金はほとんど増えない。|存款几乎不涨。')
    ]),
    C('weak currency', 'Weak domestic currency|Mata uang lemah|通貨安|本币贬值', ['strong currency'], [
      I('mkt', 'mfg,food', 'market', 3, 'Exports more competitive|Ekspor lebih kompetitif|輸出競争力の向上|出口更具竞争力', 'Goods look cheap abroad.|Barang tampak murah di luar negeri.|海外で割安になる。|海外显得便宜。'),
      I('val', 'biz', 'profit', 2, 'Foreign earnings worth more|Pendapatan luar negeri lebih bernilai|海外収益の円換算増|海外收入折算更多', 'Converted revenue rises.|Pendapatan terkonversi naik.|換算すると収益が増える。|折算后收入增加。'),
      I('mkt', 'pub,biz', 'tourism', 2, 'Tourism boost|Dorongan pariwisata|観光客の増加|旅游提振', 'Visitors find the country cheap.|Wisatawan merasa negara ini murah.|訪問者にとって割安。|游客觉得便宜。'),
      I('cap', 'mfg', 'local', 2, 'Local goods favoured|Produk lokal diuntungkan|国産品に有利|国货受益', 'Imports are pricier.|Impor lebih mahal.|輸入品が割高になる。|进口更贵。')
    ], [
      I('cost', 'mfg,retail,food', 'expensive', 3, 'Imports cost more|Impor lebih mahal|輸入コスト上昇|进口更贵', 'Raw materials and fuel jump.|Bahan baku dan BBM melonjak.|原材料や燃料が上がる。|原料与燃油上涨。'),
      I('risk', 'fin,biz', 'debt', 3, 'Foreign debt heavier|Utang luar negeri makin berat|外貨建て債務の増加|外债变重', 'Repaying dollars costs more rupiah.|Membayar dolar memakan lebih banyak rupiah.|ドル返済に、より多くの自国通貨が要る。|还美元需更多本币。'),
      I('ppl', 'fam', 'poor', 2, 'Imported inflation|Inflasi impor|輸入インフレ|输入型通胀', 'Prices rise for ordinary people.|Harga naik bagi masyarakat.|庶民の物価が上がる。|普通人物价上涨。'),
      I('risk', 'fin', 'fear', 2, 'Capital flight|Pelarian modal|資本流出|资本外逃', 'Investors lose confidence.|Investor kehilangan kepercayaan.|投資家の信頼が低下する。|投资者失去信心。')
    ]),
    C('strong currency', 'Strong domestic currency|Mata uang kuat|通貨高|本币升值', ['weak currency'], [
      I('cost', 'mfg,retail,food', 'cheap', 3, 'Cheaper imports|Impor lebih murah|輸入品が安い|进口更便宜', 'Materials and goods cost less.|Bahan dan barang lebih murah.|原材料や商品が安く済む。|原料商品更便宜。'),
      I('ppl', 'fam', 'money', 2, 'More purchasing power abroad|Daya beli luar negeri lebih besar|海外での購買力|海外购买力强', 'Travel and study cost less.|Wisata dan studi lebih murah.|旅行や留学が割安。|旅游留学更省。'),
      I('val', 'fin', 'debt', 2, 'Foreign debt lighter|Utang luar negeri lebih ringan|外貨債務の軽減|外债减轻', 'Repayment needs less local money.|Pelunasan butuh lebih sedikit uang lokal.|返済に必要な自国通貨が減る。|偿还需要更少本币。'),
      I('mkt', 'fin', 'trust', 2, 'Investor confidence|Kepercayaan investor|投資家の信認|投资者信心', 'Signals economic strength.|Menandakan kekuatan ekonomi.|経済の強さを示す。|表明经济强劲。')
    ], [
      I('mkt', 'mfg,food', 'lose', 3, 'Exports uncompetitive|Ekspor kurang kompetitif|輸出競争力の低下|出口失竞争力', 'Goods look expensive abroad.|Barang tampak mahal di luar negeri.|海外で割高になる。|海外显得贵。'),
      I('val', 'biz', 'lose', 2, 'Foreign earnings shrink|Pendapatan luar negeri menyusut|海外収益の目減り|海外收入缩水', 'Converted revenue falls.|Pendapatan terkonversi turun.|換算すると収益が減る。|折算后收入下降。'),
      I('mkt', 'pub,biz', 'tourism', 2, 'Tourism suffers|Pariwisata terpukul|観光への打撃|旅游受损', 'Visitors find it dear.|Wisatawan merasa mahal.|訪問者には割高。|游客觉得贵。'),
      I('risk', 'mfg', 'job', 2, 'Local industry threatened|Industri lokal terancam|国内産業への圧迫|本土产业受威胁', 'Cheap imports flood in.|Impor murah membanjir.|安い輸入品が流れ込む。|廉价进口涌入。')
    ]),
    C('recession', 'Economic recession|Resesi ekonomi|景気後退|经济衰退', ['boom'], [
      I('cap', 'biz', 'cheap', 2, 'Cheaper assets and talent|Aset dan talenta lebih murah|資産や人材が安く買える|资产人才更便宜', 'Bargains for the prepared.|Peluang bagi yang siap.|備えた人には好機。|有准备者捡便宜。'),
      I('cap', 'biz', 'discipline', 2, 'Forces efficiency|Memaksa efisiensi|効率化を迫る|倒逼效率', 'Weak firms are cut away.|Perusahaan lemah tersingkir.|弱い企業が淘汰される。|弱企业出局。'),
      I('mkt', 'biz', 'new', 2, 'Room for challengers|Ruang bagi penantang|新興企業の余地|挑战者有空间', 'Leaders are distracted.|Pemimpin sedang terganggu.|大手が守りに回る。|龙头分心。'),
      I('val', 'fam', 'save', 2, 'Lower prices|Harga lebih rendah|価格の下落|价格下降', 'Sellers compete harder.|Penjual bersaing lebih keras.|売り手が競って値下げする。|卖家竞争降价。')
    ], [
      I('ppl', 'biz,fam', 'job', 3, 'Job losses|Hilangnya pekerjaan|失業の増加|失业增加', 'Layoffs spread.|PHK menyebar.|解雇が広がる。|裁员蔓延。'),
      I('mkt', 'retail,biz', 'lose', 3, 'Falling demand|Permintaan turun|需要の減少|需求下降', 'Customers cut spending.|Pelanggan memangkas pengeluaran.|顧客が支出を絞る。|客户削减开支。'),
      I('risk', 'biz,fin', 'fail', 3, 'Business failures|Kebangkrutan usaha|倒産|企业倒闭', 'Weak firms collapse.|Perusahaan lemah runtuh.|弱い企業が倒れる。|弱企业崩溃。'),
      I('ppl', 'fam', 'fear', 2, 'Anxiety|Kecemasan|不安|焦虑', 'People hoard and delay plans.|Orang menimbun dan menunda rencana.|貯め込み、計画を延期する。|人们囤钱推迟计划。')
    ]),
    C('boom', 'Economic boom|Ledakan ekonomi|好景気|经济繁荣', ['recession'], [
      I('mkt', 'retail,biz', 'customer', 3, 'Strong demand|Permintaan kuat|旺盛な需要|需求旺盛', 'Customers spend freely.|Pelanggan berbelanja bebas.|客が気前よく使う。|客户大方消费。'),
      I('ppl', 'biz,fam', 'job', 3, 'Plentiful jobs|Banyak lapangan kerja|雇用の拡大|就业充足', 'Workers have choices.|Pekerja punya banyak pilihan.|働き手に選択肢がある。|劳动者有选择。'),
      I('val', 'biz,fin', 'profit', 2, 'High profits|Laba tinggi|高い利益|利润高', 'Money flows easily.|Uang mengalir mudah.|お金が回りやすい。|资金易流动。'),
      I('cap', 'biz', 'new', 2, 'Easy to raise funds|Mudah menghimpun dana|資金調達が容易|融资容易', 'Investors are eager.|Investor antusias.|投資家が前向き。|投资者积极。')
    ], [
      I('cost', 'biz', 'expensive', 3, 'Rising costs|Biaya melonjak|コスト高|成本飙升', 'Wages, rents and materials climb.|Gaji, sewa, dan bahan naik.|賃金・家賃・材料が上がる。|工资租金材料上涨。'),
      I('risk', 'fin', 'danger', 3, 'Overheating and bubbles|Pemanasan dan gelembung|過熱とバブル|过热与泡沫', 'Busts follow booms.|Keruntuhan menyusul ledakan.|好況の後に、反動が来る。|繁荣后有萧条。'),
      I('risk', 'biz', 'mistake', 2, 'Overexpansion|Ekspansi berlebihan|過剰拡大|过度扩张', 'Firms build too much.|Perusahaan membangun terlalu banyak.|作り過ぎてしまう。|建设过多。'),
      I('cap', 'biz', 'lazy', 2, 'Complacency|Kepuasan diri|慢心|自满', 'Discipline loosens.|Disiplin mengendur.|規律が緩む。|纪律松懈。')
    ]),
    C('supplier credit', 'Supplier credit terms|Kredit dari pemasok|仕入先信用（掛け仕入）|供应商赊账', ['early payment discount'], [
      I('val', 'biz,retail', 'money', 3, 'Free working capital|Modal kerja gratis|運転資金を確保|免费运营资金', 'Sell goods before paying for them.|Menjual barang sebelum membayarnya.|代金を払う前に売れる。|先卖货后付款。'),
      I('cap', 'biz,retail', 'trust', 2, 'Builds supplier relationship|Membangun hubungan pemasok|取引関係の強化|巩固供应商关系', 'Trust grows with use.|Kepercayaan tumbuh dengan pemakaian.|取引を重ねて、信頼が深まる。|信任随使用增长。'),
      I('eff', 'biz,retail', 'fast', 2, 'Faster stocking|Penyetokan lebih cepat|素早い仕入れ|进货更快', 'Order without waiting for cash.|Memesan tanpa menunggu kas.|現金を待たずに発注できる。|无需等现金即可下单。'),
      I('val', 'biz', 'save', 2, 'Cash stays free|Kas tetap longgar|手元資金を温存|现金保持宽松', 'Money works elsewhere.|Uang bekerja di tempat lain.|資金を他に回せる。|资金可另作他用。')
    ], [
      I('risk', 'biz', 'debt', 3, 'Debt trap|Jebakan utang|債務の罠|债务陷阱', 'Payables pile up.|Utang dagang menumpuk.|買掛金が積み上がる。|应付账款累积。'),
      I('cost', 'biz', 'expensive', 2, 'Higher prices|Harga lebih tinggi|価格が割高|价格更高', 'Credit is built into the price.|Kredit dimasukkan ke dalam harga.|信用の分が、価格に上乗せされる。|信用已计入价格。'),
      I('risk', 'biz', 'power', 2, 'Dependence on one supplier|Ketergantungan pada satu pemasok|特定仕入先への依存|依赖单一供应商', 'They can cut you off.|Mereka bisa memutus pasokan.|取引を止められかねない。|可能被断供。'),
      I('risk', 'biz', 'fail', 2, 'Cutoff if late|Dihentikan jika telat|遅れると取引停止|逾期被断货', 'Late payment ends the deal.|Keterlambatan menghentikan kesepakatan.|支払いが遅れると、取引が止まる。|迟付款则停供。')
    ]),
    C('early payment discount', 'Early payment discount|Diskon pembayaran dini|早期支払割引|提前付款折扣', ['supplier credit'], [
      I('val', 'biz,retail', 'save', 3, 'Cheaper purchases|Pembelian lebih murah|仕入れが安くなる|采购更便宜', 'A 2% discount for fast payment.|Diskon 2% untuk pembayaran cepat.|早く払えば2%引き。|快付款折2%。'),
      I('cap', 'biz', 'trust', 2, 'Good supplier relations|Hubungan pemasok baik|仕入先との良好な関係|供应商关系好', 'Reliable payers get favours.|Pembayar andal mendapat kemudahan.|支払いの良い客は、優遇される。|守信者获优待。'),
      I('val', 'fin', 'interest', 2, 'High implied return|Imbal hasil tersirat tinggi|実質利回りが高い|隐含收益高', 'Often beats bank interest.|Sering melebihi bunga bank.|銀行金利を上回ることも多い。|常超过银行利息。'),
      I('eff', 'biz', 'clear', 2, 'Simple, fast settlement|Penyelesaian cepat dan sederhana|決済が早く簡単|结算简单快速', 'Fewer open invoices.|Lebih sedikit faktur terbuka.|未払請求書が減る。|未结发票更少。')
    ], [
      I('cost', 'biz', 'money', 3, 'Needs cash up front|Butuh kas di muka|先に現金が必要|需要预先现金', 'Ties up working capital.|Mengikat modal kerja.|運転資金を先に使う。|占用营运资金。'),
      I('risk', 'biz', 'lose', 2, 'Cash shortfall|Kekurangan kas|資金ショート|现金短缺', 'Other bills may go unpaid.|Tagihan lain mungkin tak terbayar.|他の支払いが滞るかもしれない。|其他账单可能付不起。'),
      I('cost', 'biz', 'poor', 2, 'Lower margin for the seller|Margin penjual lebih rendah|売り手の利益減|卖方利润降低', 'Discounts erode profit.|Diskon menggerus laba.|割引が利益を削る。|折扣侵蚀利润。'),
      I('risk', 'biz', 'cheat', 2, 'Customers misuse it|Pelanggan menyalahgunakan|客に悪用される|被客户滥用', 'They take the discount but pay late.|Mereka ambil diskon tetapi bayar telat.|割引だけ取って、支払いは遅れる。|拿折扣却迟付。')
    ]),
    C('modular design', 'Modular product design|Desain produk modular|モジュール設計|模块化设计', ['standardization'], [
      I('val', 'mfg,biz', 'copy', 3, 'Reuse of parts|Pemakaian ulang komponen|部品の共通化|部件复用', 'One module serves many products.|Satu modul melayani banyak produk.|1つのモジュールを多くの製品に使える。|一个模块服务多产品。'),
      I('eff', 'mfg', 'fast', 2, 'Quick customisation|Kustomisasi cepat|素早いカスタマイズ|定制快', 'Combine modules to create variety.|Gabungkan modul untuk membuat variasi.|組み合わせで、バリエーションを作る。|组合模块创造多样。'),
      I('cap', 'mfg', 'help', 2, 'Easy repair and upgrade|Mudah diperbaiki dan ditingkatkan|修理・更新が容易|易维修升级', 'Swap one part, not the whole.|Ganti satu bagian, bukan seluruhnya.|全体ではなく、一部だけ交換。|换一部分而非全部。'),
      I('cap', 'mfg,biz', 'team', 2, 'Parallel development|Pengembangan paralel|並行開発|并行开发', 'Teams work on modules separately.|Tim mengerjakan modul secara terpisah.|チームが別々に開発できる。|团队分模块开发。')
    ], [
      I('cost', 'mfg', 'expensive', 2, 'Higher design effort|Upaya desain lebih besar|設計の手間|设计投入大', 'Interfaces must be planned carefully.|Antarmuka harus direncanakan cermat.|インターフェースを慎重に設計する。|接口需谨慎规划。'),
      I('risk', 'mfg', 'weak', 2, 'Weaker integration|Integrasi lebih lemah|統合度の低下|整合性较弱', 'Joints add bulk and weak points.|Sambungan menambah ukuran dan titik lemah.|接合部が、大きさや弱点を生む。|接口增加体积与弱点。'),
      I('mkt', 'mfg', 'copy', 3, 'Easier for rivals to copy|Lebih mudah ditiru pesaing|競合に真似されやすい|易被对手模仿', 'Standard parts lower barriers.|Komponen standar menurunkan hambatan.|標準部品が、参入障壁を下げる。|标准件降低壁垒。'),
      I('mkt', 'mfg,retail', 'common', 2, 'Products feel alike|Produk terasa mirip|製品が似てくる|产品趋同', 'Differentiation shrinks.|Diferensiasi menyempit.|差別化が難しくなる。|差异缩小。')
    ]),
    C('transfer pricing', 'Internal transfer pricing|Harga transfer internal|移転価格|内部转让定价', ['profit centres'], [
      I('cap', 'biz,mfg', 'fair', 3, 'Measures each unit fairly|Mengukur tiap unit secara adil|各部門を公平に評価|公平衡量各单位', 'Internal sales are priced like market deals.|Penjualan internal dihargai seperti pasar.|社内取引にも市場価格を使える。|内部交易按市价。'),
      I('eff', 'biz', 'decision', 2, 'Better internal decisions|Keputusan internal lebih baik|社内の判断が良くなる|内部决策更优', 'Units see true costs.|Unit melihat biaya sebenarnya.|各部門が、実際のコストを見る。|各单位看清真实成本。'),
      I('val', 'biz', 'tax', 2, 'Tax planning|Perencanaan pajak|税務計画|税务规划', 'Profits shift to low-tax places.|Laba dialihkan ke tempat berpajak rendah.|利益を税率の低い国へ移せる。|利润转至低税地。'),
      I('ppl', 'biz', 'proud', 2, 'Unit responsibility|Tanggung jawab unit|部門の責任感|单位责任感', 'Managers own their results.|Manajer memiliki hasilnya.|管理者が、自分の成果に責任を持つ。|经理对结果负责。')
    ], [
      I('ppl', 'biz', 'conflict', 3, 'Internal disputes|Perselisihan internal|社内の対立|内部争议', 'Units argue about the price.|Unit berdebat soal harga.|価格をめぐって、部門が争う。|各单位争价格。'),
      I('risk', 'pub,biz', 'law', 3, 'Tax authority scrutiny|Pengawasan otoritas pajak|税務当局の調査|税务机关审查', 'Aggressive pricing triggers audits.|Penetapan agresif memicu pemeriksaan.|過度な設定は、税務調査を招く。|激进定价引发稽查。'),
      I('eff', 'biz', 'complex', 2, 'Complex to administer|Rumit dikelola|運用が複雑|管理复杂', 'Rules, documents and reviews.|Aturan, dokumen, dan tinjauan.|ルール・書類・見直しが必要。|规则文件与审查多。'),
      I('risk', 'biz', 'bias', 2, 'Distorted behaviour|Perilaku terdistorsi|行動のゆがみ|行为扭曲', 'Units chase local profit over group profit.|Unit mengejar laba lokal, bukan laba grup.|全社より部門の利益を優先する。|追求局部而非集团利润。')
    ]),
    C('profit centres', 'Profit centre structure|Struktur pusat laba|プロフィットセンター制|利润中心制', ['cost centres'], [
      I('ppl', 'biz', 'proud', 3, 'Clear accountability|Akuntabilitas jelas|責任の明確化|责任清晰', 'Each unit owns revenue and cost.|Tiap unit memiliki pendapatan dan biaya.|各部門が収益とコストを持つ。|各单位对收支负责。'),
      I('eff', 'biz', 'fast', 2, 'Faster local decisions|Keputusan lokal lebih cepat|現場判断が早い|本地决策更快', 'Managers act without waiting.|Manajer bertindak tanpa menunggu.|待たずに動ける。|经理无需等待。'),
      I('cap', 'biz', 'skill', 2, 'Trains future leaders|Melatih calon pemimpin|経営人材の育成|培养未来领导', 'Managers run mini-businesses.|Manajer menjalankan bisnis mini.|小さな事業を経営する経験。|经理经营迷你业务。'),
      I('val', 'biz', 'profit', 2, 'Focus on results|Fokus pada hasil|成果への集中|聚焦结果', 'Profit is the clear scorecard.|Laba menjadi papan skor yang jelas.|利益が、明確な成績表。|利润是清晰成绩单。')
    ], [
      I('ppl', 'biz', 'conflict', 3, 'Silo mentality|Mentalitas silo|縦割り意識|各自为政', 'Units compete rather than cooperate.|Unit bersaing, bukan bekerja sama.|協力より競争が先に立つ。|各单位竞争而非合作。'),
      I('risk', 'biz', 'short', 2, 'Short-termism|Pandangan jangka pendek|短期志向|短视', 'Cuts to boost this year hurt next.|Pemangkasan demi tahun ini merugikan tahun depan.|今年のために、来年を犠牲にする。|为今年削减伤及明年。'),
      I('cost', 'biz', 'expensive', 2, 'Duplicated overheads|Overhead ganda|間接費の重複|重复间接费', 'Each unit has its own support.|Tiap unit punya pendukung sendiri.|各部門が、それぞれ管理部門を持つ。|每单位各设支持职能。'),
      I('eff', 'biz', 'hard', 2, 'Hard to allocate shared costs|Sulit mengalokasikan biaya bersama|共通費の配賦が難しい|共享成本难分摊', 'Fairness disputes arise.|Muncul sengketa keadilan.|不公平感が生じる。|引发公平争议。')
    ]),
    C('cost centres', 'Cost centre model|Model pusat biaya|コストセンター制|成本中心制', ['profit centres'], [
      I('val', 'biz', 'save', 3, 'Cost discipline|Disiplin biaya|コスト管理の徹底|成本纪律', 'Budgets are watched closely.|Anggaran diawasi ketat.|予算を厳しく見る。|预算严控。'),
      I('eff', 'biz', 'clear', 2, 'Simple structure|Struktur sederhana|シンプルな構造|结构简单', 'Support functions serve the whole firm.|Fungsi pendukung melayani seluruh perusahaan.|支援部門が全社に貢献する。|支持职能服务全公司。'),
      I('ppl', 'biz', 'team', 2, 'Cooperation|Kerja sama|協力関係|合作', 'No internal revenue to fight over.|Tidak ada pendapatan internal untuk diperebutkan.|取り合う社内収益がない。|无内部收入可争。'),
      I('eff', 'biz', 'steady', 2, 'Stable planning|Perencanaan stabil|安定した計画|规划稳定', 'Budgets are set annually.|Anggaran ditetapkan tahunan.|予算は年単位で決まる。|年度预算稳定。')
    ], [
      I('ppl', 'biz', 'lazy', 3, 'Little ownership of results|Rasa memiliki hasil rendah|成果への当事者意識が弱い|对结果缺乏担当', 'Nobody earns revenue.|Tidak ada yang menghasilkan pendapatan.|誰も収益を生まない。|无人创造收入。'),
      I('risk', 'biz', 'waste', 2, 'Budget padding|Penggelembungan anggaran|予算の水増し|预算注水', 'Spend it or lose it.|Habiskan atau hilang.|使い切らないと、翌年減らされる。|不花完就被削。'),
      I('mkt', 'biz', 'customer', 2, 'Weak customer focus|Fokus pelanggan lemah|顧客志向が弱い|客户导向弱', 'Cost matters more than value.|Biaya lebih penting daripada nilai.|価値よりコストが優先される。|成本重于价值。'),
      I('cap', 'biz', 'new', 2, 'Hard to justify investment|Sulit membenarkan investasi|投資の正当化が難しい|难以证明投资', 'Benefits are not measured.|Manfaat tidak terukur.|便益が測れない。|效益难衡量。')
    ]),
    C('product recall', 'Product recall|Penarikan produk|製品リコール|产品召回', ['quality control'], [
      I('mkt', 'mfg,food,health', 'trust', 3, 'Shows responsibility|Menunjukkan tanggung jawab|責任ある姿勢|体现责任', 'Customers respect honest action.|Pelanggan menghargai tindakan jujur.|誠実な対応は、評価される。|诚实行动受尊重。'),
      I('val', 'mfg,food,health', 'safe', 3, 'Protects people|Melindungi orang|人を守る|保护人们', 'Harm is stopped early.|Bahaya dihentikan lebih awal.|被害を早く止められる。|及早制止伤害。'),
      I('risk', 'mfg,food', 'law', 2, 'Reduces legal exposure|Mengurangi risiko hukum|法的リスクの軽減|降低法律风险', 'Quick action limits liability.|Tindakan cepat membatasi tanggung jawab.|早い対応が、責任を限定する。|迅速行动限制责任。'),
      I('cap', 'mfg,food', 'learn', 2, 'Forces fixing the root cause|Memaksa memperbaiki akar masalah|根本原因の是正|促使根治', 'Failures teach.|Kegagalan mengajar.|失敗から学ぶ。|失败带来教训。')
    ], [
      I('cost', 'mfg,food', 'expensive', 3, 'Huge cost|Biaya besar|莫大なコスト|成本巨大', 'Logistics, refunds and disposal.|Logistik, pengembalian dana, dan pembuangan.|回収・返金・廃棄の費用。|物流退款与处理费。'),
      I('mkt', 'mfg,food', 'name', 3, 'Brand damage|Kerusakan merek|ブランドの毀損|品牌受损', 'The name becomes linked to failure.|Nama dikaitkan dengan kegagalan.|名前が失敗と結びつく。|名字与失败关联。'),
      I('mkt', 'mfg,food', 'lose', 2, 'Lost sales|Kehilangan penjualan|売上の減少|销售损失', 'Customers switch away.|Pelanggan beralih.|客が離れる。|客户转投他处。'),
      I('eff', 'mfg,food', 'stress', 2, 'Crisis management burden|Beban manajemen krisis|危機対応の負担|危机管理负担', 'Teams are consumed for months.|Tim terkuras berbulan-bulan.|チームが何か月も消耗する。|团队耗数月。')
    ]),
    C('wholesale', 'Wholesale distribution|Distribusi grosir|卸売|批发分销', ['direct to consumer'], [
      I('eff', 'mfg,food', 'fast', 3, 'Large orders, quick sales|Pesanan besar, penjualan cepat|大口注文・早い販売|大单快销', 'A few buyers move big volumes.|Beberapa pembeli memindahkan volume besar.|少数の買い手が大量に動かす。|少数买家大量进货。'),
      I('val', 'mfg,food', 'save', 2, 'Lower selling cost|Biaya penjualan lebih rendah|販売コストが低い|销售成本低', 'No retail operation to run.|Tak perlu mengelola ritel.|小売運営が不要。|无需运营零售。'),
      I('mkt', 'mfg,food', 'reach', 2, 'Instant reach|Jangkauan instan|すぐに広がる販路|即时覆盖', 'Distributors have networks.|Distributor punya jaringan.|卸が販売網を持っている。|分销商有网络。'),
      I('cap', 'mfg,food', 'steady', 2, 'Predictable cash flow|Arus kas terprediksi|キャッシュフローが安定|现金流可预测', 'Regular repeat orders.|Pesanan ulang rutin.|定期的な再注文。|定期复购。')
    ], [
      I('cost', 'mfg,food', 'poor', 3, 'Thin margins|Margin tipis|薄い利益率|利润微薄', 'Wholesale prices are low.|Harga grosir rendah.|卸値は低い。|批发价低。'),
      I('mkt', 'mfg,food', 'distance', 3, 'Distance from customers|Jarak dengan pelanggan|顧客との距離|远离客户', 'You do not learn what they want.|Anda tidak tahu apa yang mereka inginkan.|顧客の本音が分からない。|不了解客户想要什么。'),
      I('risk', 'mfg,food', 'power', 2, 'Dependence on big buyers|Ketergantungan pada pembeli besar|大口取引先への依存|依赖大买家', 'They can dictate terms.|Mereka bisa menentukan syarat.|相手に条件を握られる。|对方可主导条件。'),
      I('risk', 'mfg,food', 'name', 2, 'Weak brand control|Kendali merek lemah|ブランド管理が弱い|品牌控制弱', 'Others decide how you are sold.|Pihak lain menentukan cara menjualmu.|売り方を他者に決められる。|他人决定怎么卖。')
    ])
  );
})();
