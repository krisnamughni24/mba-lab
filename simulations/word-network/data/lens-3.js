/* Word Network: curated concepts, batch 3 (finance and pricing). Same format as data/lens.js. Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('venture capital', 'Venture capital|Modal ventura|ベンチャーキャピタル|风险投资', ['bootstrapping'], [
      I('val', 'biz,fin', 'money', 3, 'Large funding|Dana besar|大きな資金|大额资金', 'You can hire and build faster than your revenue allows.|Anda bisa merekrut dan membangun lebih cepat dari pendapatan.|売上以上のペースで、採用や開発を進められる。|可比收入允许的速度更快地招人和建设。'),
      I('cap', 'biz,fin', 'skill', 2, 'Expert guidance|Bimbingan ahli|専門的な助言|专业指导', 'Investors bring experience, contacts and credibility.|Investor membawa pengalaman, kontak, dan kredibilitas.|投資家が、経験・人脈・信用をもたらす。|投资人带来经验、人脉和信誉。'),
      I('mkt', 'biz,retail', 'market', 2, 'Speed to market|Cepat ke pasar|市場獲得のスピード|抢占市场速度', 'Funding lets you win the market before rivals.|Pendanaan memungkinkan Anda merebut pasar sebelum pesaing.|資金により、競合より先に市場を取れる。|资金让你先于对手占领市场。'),
      I('cap', 'biz,fin', 'trust', 2, 'Signals quality|Menjadi sinyal kualitas|信用のシグナル|传递质量信号', 'A respected investor helps win customers and talent.|Investor ternama membantu menarik pelanggan dan talenta.|有名な投資家の存在が、顧客や人材を引きつける。|知名投资人有助于吸引客户和人才。')
    ], [
      I('risk', 'biz,fin', 'lose', 3, 'Loss of ownership|Kehilangan kepemilikan|持ち分の希薄化|股权被稀释', 'Founders give up shares and some control.|Pendiri melepas saham dan sebagian kendali.|創業者は、持ち株と経営権の一部を手放す。|创始人让出股份和部分控制权。'),
      I('ppl', 'biz,fin', 'pressure', 3, 'Pressure to grow fast|Tekanan tumbuh cepat|急成長への圧力|高速增长压力', 'Investors expect big returns in a few years.|Investor mengharapkan imbal hasil besar dalam beberapa tahun.|投資家は、数年で大きなリターンを求める。|投资人期待几年内获得巨额回报。'),
      I('risk', 'biz,fin', 'fail', 2, 'All or nothing|Menang atau habis|ハイリスク・ハイリターン|孤注一掷', 'Moderate success may not satisfy the investors.|Keberhasilan sedang mungkin tidak memuaskan investor.|そこそこの成功では、投資家は満足しない。|中等成功可能无法让投资人满意。'),
      I('eff', 'biz,fin', 'time', 2, 'Fundraising distraction|Mengalihkan waktu untuk galang dana|資金調達に時間を取られる|筹资分散精力', 'Pitching takes months away from the business.|Presentasi ke investor menyita berbulan-bulan dari bisnis.|資金調達活動に、何か月も時間を奪われる。|路演占用数月本该用于经营的时间。')
    ]),
    C('equity financing', 'Equity financing|Pendanaan ekuitas|株式による資金調達|股权融资', ['loan'], [
      I('val', 'fin,biz', 'safe', 3, 'No repayment burden|Tanpa beban cicilan|返済義務なし|无需还款', 'Cash is not due back, even in a bad year.|Dana tidak harus dikembalikan, bahkan di tahun buruk.|不調な年でも、返済は求められない。|即使业绩不佳也无须归还。'),
      I('cap', 'fin,biz', 'share', 2, 'Shared risk|Risiko dibagi|リスクの分担|风险共担', 'Investors share losses as well as gains.|Investor menanggung kerugian sekaligus keuntungan.|投資家は、利益だけでなく損失も分かち合う。|投资者既分享收益也分担亏损。'),
      I('cap', 'biz,fin', 'skill', 2, 'Expertise and network|Keahlian dan jaringan|専門性と人脈|专长与人脉', 'Owners may bring skills and contacts.|Pemilik baru bisa membawa keahlian dan kontak.|新しい株主が、技能や人脈をもたらすことがある。|新股东可能带来技能和人脉。'),
      I('val', 'fin,biz', 'credit', 2, 'Stronger balance sheet|Neraca lebih kuat|財務体質の強化|资产负债表更稳健', 'More equity makes later borrowing easier.|Ekuitas lebih besar mempermudah pinjaman di kemudian hari.|自己資本が増えると、のちの借入がしやすくなる。|股本增加使日后借款更容易。')
    ], [
      I('risk', 'fin,biz', 'lose', 3, 'Dilution|Dilusi kepemilikan|持ち分の希薄化|股权稀释', 'Each new owner shrinks the share of existing owners.|Setiap pemilik baru memperkecil bagian pemilik lama.|新しい株主が増えるたび、既存株主の持分は小さくなる。|每增加新股东，老股东的份额就缩小。'),
      I('cost', 'fin,biz', 'expensive', 2, 'Costly in the long run|Mahal dalam jangka panjang|長期的には高コスト|长期成本高', 'Giving away a share of future profit can cost more than interest.|Melepas bagian laba masa depan bisa lebih mahal dari bunga.|将来利益の一部を渡すことは、利息より高くつくことがある。|让出未来利润的一部分，可能比利息更贵。'),
      I('eff', 'biz,pub', 'control', 2, 'Shared decisions|Keputusan dibagi|意思決定の共有|决策需共同参与', 'New owners expect a say in the direction.|Pemilik baru mengharapkan suara dalam arah perusahaan.|新しい株主が、方針に口を出すようになる。|新股东希望对方向有发言权。'),
      I('eff', 'fin,biz', 'time', 2, 'Slow and complex|Lambat dan rumit|時間と手間がかかる|缓慢复杂', 'Valuation, legal work and negotiations take months.|Penilaian, urusan hukum, dan negosiasi memakan waktu berbulan-bulan.|評価・法務・交渉に、数か月かかる。|估值、法务与谈判耗时数月。')
    ]),
    C('ipo', 'Initial public offering (IPO)|Penawaran umum perdana (IPO)|新規株式公開（IPO）|首次公开募股（IPO）', ['equity financing'], [
      I('val', 'fin,biz', 'money', 3, 'Large capital raise|Dana besar|大規模な資金調達|大额融资', 'Selling shares to the public can raise a lot of money.|Menjual saham ke publik dapat mengumpulkan dana besar.|株式を公開すれば、大きな資金を調達できる。|向公众发行股票可筹集大量资金。'),
      I('mkt', 'biz,pub', 'name', 2, 'Visibility and trust|Visibilitas dan kepercayaan|知名度と信用|知名度与信任', 'Listing brings scrutiny and credibility with partners.|Pencatatan membawa sorotan dan kredibilitas di mata mitra.|上場により、注目度と取引先からの信用が高まる。|上市带来关注度和合作方的信任。'),
      I('ppl', 'biz,fin', 'job', 2, 'Liquidity for owners|Likuiditas bagi pemilik|創業者の資金化|股东变现', 'Founders and staff can sell some shares.|Pendiri dan staf dapat menjual sebagian saham.|創業者や社員が、持ち株の一部を現金化できる。|创始人和员工可以出售部分股份。'),
      I('cap', 'fin,biz', 'invest', 2, 'Currency for deals|Alat untuk akuisisi|M&Aの通貨|并购的支付手段', 'Listed shares can pay for acquisitions.|Saham tercatat dapat dipakai membayar akuisisi.|上場株を使って、買収の対価を支払える。|上市股票可用于支付收购。')
    ], [
      I('cost', 'fin,biz', 'expensive', 3, 'High cost of listing|Biaya pencatatan tinggi|上場コストが高い|上市成本高', 'Bankers, lawyers and audits are expensive, and so are ongoing duties.|Bankir, pengacara, dan audit mahal, begitu juga kewajiban berkelanjutan.|証券会社・弁護士・監査に費用がかかり、上場後も負担が続く。|投行、律师与审计费用高，后续义务也持续。'),
      I('risk', 'fin,biz', 'secret', 3, 'Less privacy|Kurang privasi|情報開示の負担|隐私减少', 'Results and plans must be disclosed to everyone.|Hasil dan rencana harus diungkapkan kepada semua orang.|業績や計画を、誰にでも開示する必要がある。|业绩与计划必须向所有人披露。'),
      I('ppl', 'biz,fin', 'pressure', 2, 'Short-term pressure|Tekanan jangka pendek|短期的な業績圧力|短期业绩压力', 'Quarterly results drive decisions.|Hasil kuartalan mendorong keputusan.|四半期の業績が、意思決定を左右する。|季度业绩左右决策。'),
      I('risk', 'fin,biz', 'lose', 2, 'Loss of control|Kehilangan kendali|経営権の希薄化|控制权削弱', 'New shareholders and rules limit what owners can do.|Pemegang saham baru dan aturan membatasi pemilik.|新しい株主や規則が、創業者の自由を制限する。|新股东与规则限制了原股东的自由。')
    ]),
    C('crowdfunding', 'Crowdfunding|Urun dana|クラウドファンディング|众筹', ['bootstrapping'], [
      I('mkt', 'retail,food,edu', 'customer', 3, 'Tests demand|Menguji permintaan|需要の検証|检验需求', 'People paying in advance prove that they want it.|Orang yang membayar di muka membuktikan bahwa mereka menginginkannya.|前払いしてくれる人がいることが、需要の証明になる。|预付款的人证明确有需求。'),
      I('val', 'retail,food,biz', 'money', 3, 'Funding without banks|Dana tanpa bank|銀行に頼らない資金|无需银行的资金', 'Many small backers replace one large lender.|Banyak pendukung kecil menggantikan satu pemberi pinjaman besar.|小口の支援者が、大口の貸し手の代わりになる。|众多小额支持者取代一家大贷款方。'),
      I('mkt', 'retail,biz', 'name', 2, 'Free publicity|Publisitas gratis|無料の宣伝効果|免费宣传', 'The campaign itself spreads the word.|Kampanye itu sendiri menyebarkan kabar.|キャンペーンそのものが、口コミを広げる。|活动本身就是传播。'),
      I('ppl', 'edu,fam,biz', 'team', 2, 'Community of fans|Komunitas penggemar|ファンコミュニティ|粉丝社区', 'Backers feel part of the project.|Pendukung merasa menjadi bagian dari proyek.|支援者が、プロジェクトの一員だと感じる。|支持者感觉自己是项目的一部分。')
    ], [
      I('risk', 'biz,retail', 'fail', 3, 'All-or-nothing goals|Target menang-atau-gagal|目標未達なら不成立|达不到目标即告失败', 'Missing the target can mean getting no money.|Gagal mencapai target bisa berarti tidak mendapat dana.|目標額に届かないと、資金を受け取れないことがある。|未达目标可能一分钱也拿不到。'),
      I('eff', 'retail,biz', 'effort', 3, 'Heavy campaign work|Kampanye menyita tenaga|キャンペーンの手間|运营负担重', 'Updates, videos and rewards take serious effort.|Pembaruan, video, dan hadiah butuh tenaga besar.|更新・動画・リターンの準備に、大きな手間がかかる。|更新、视频和回报都要花大量精力。'),
      I('risk', 'retail,mfg', 'cheat', 2, 'Delivery and trust risk|Risiko pengiriman dan kepercayaan|納品と信頼のリスク|交付与信任风险', 'Late or missing rewards anger backers.|Hadiah yang terlambat atau tak datang membuat pendukung marah.|リターンの遅れや未達は、支援者の怒りを買う。|回报延迟或缺失会激怒支持者。'),
      I('risk', 'biz,mfg', 'copy', 2, 'Idea exposed|Ide terbuka|アイデアの露出|创意被公开', 'A public pitch lets rivals copy you.|Presentasi publik memungkinkan pesaing meniru Anda.|公開することで、競合に真似される恐れがある。|公开宣传让对手有机会模仿。')
    ]),
    C('leasing', 'Leasing|Sewa guna usaha|リース|租赁', ['loan'], [
      I('val', 'mfg,biz,fin', 'save', 3, 'Low upfront cost|Biaya awal rendah|初期費用が低い|前期成本低', 'You use equipment without paying the full price.|Anda memakai peralatan tanpa membayar harga penuh.|満額を払わずに、設備を使える。|无需付全款即可使用设备。'),
      I('cap', 'mfg,biz', 'new', 2, 'Stay up to date|Tetap mutakhir|最新設備を使える|保持设备更新', 'You can swap to newer equipment at the end.|Anda bisa berganti ke peralatan lebih baru di akhir masa sewa.|契約終了時に、新しい設備へ切り替えられる。|租期结束可换新设备。'),
      I('val', 'fin,biz', 'safe', 2, 'Predictable payments|Pembayaran terprediksi|支払いが予測しやすい|付款可预测', 'Fixed instalments make budgeting easier.|Cicilan tetap mempermudah penganggaran.|定額の支払いで、予算が立てやすい。|固定租金便于预算。'),
      I('cap', 'mfg,biz', 'flexible', 2, 'Flexibility|Fleksibilitas|柔軟性|灵活性', 'You are not stuck with equipment you no longer need.|Anda tidak terjebak dengan peralatan yang tak lagi dibutuhkan.|不要になった設備を抱え込まずに済む。|不会被不再需要的设备绑住。')
    ], [
      I('cost', 'fin,biz', 'expensive', 3, 'Costlier over time|Lebih mahal dalam jangka panjang|長期的には割高|长期更贵', 'Total payments often exceed the purchase price.|Total pembayaran sering melebihi harga beli.|支払総額が、購入価格を上回ることが多い。|总付款常超过购买价。'),
      I('risk', 'fin,biz', 'lose', 2, 'You never own it|Tidak pernah memiliki|資産が自社のものにならない|不拥有所有权', 'At the end you have no asset to show.|Di akhir Anda tidak memiliki aset.|終わっても、自社の資産は残らない。|到期后你没有资产。'),
      I('risk', 'fin,biz', 'rules', 2, 'Binding contract|Kontrak mengikat|契約の拘束|合同约束', 'Cancelling early can bring heavy penalties.|Berhenti lebih awal bisa menimbulkan denda besar.|途中解約には、重い違約金がかかることがある。|提前终止可能面临高额违约金。'),
      I('eff', 'mfg,biz', 'limit', 2, 'Usage limits|Batas pemakaian|使用制限|使用限制', 'Mileage, hours and modifications may be restricted.|Jarak tempuh, jam pakai, dan modifikasi mungkin dibatasi.|走行距離・使用時間・改造が制限されることがある。|里程、时长与改装可能受限。')
    ]),
    C('dividend', 'Dividend|Dividen|配当|股息分红', ['share buyback'], [
      I('mkt', 'fin,biz', 'trust', 3, 'Attracts steady investors|Menarik investor jangka panjang|安定した投資家を引きつける|吸引长期投资者', 'Regular payouts please investors who want income.|Pembayaran rutin menyenangkan investor yang mencari pendapatan.|定期的な配当は、収入を求める投資家に好まれる。|定期分红受追求收益的投资者欢迎。'),
      I('val', 'fin,biz', 'reward', 3, 'Rewards owners|Menghargai pemilik|株主への還元|回报股东', 'Shareholders see real cash, not just promises.|Pemegang saham menerima uang nyata, bukan sekadar janji.|株主は、約束ではなく現金を受け取れる。|股东拿到的是真金白银而非承诺。'),
      I('cap', 'fin,biz', 'safe', 2, 'Signals confidence|Menandakan keyakinan|自信のシグナル|传递信心', 'Paying out shows the business is healthy.|Membayar dividen menunjukkan bisnis sehat.|配当は、事業が健全であるサインになる。|分红表明业务健康。'),
      I('cap', 'fin,biz', 'control', 2, 'Cash discipline|Disiplin kas|資金規律|资金纪律', 'Returning cash limits wasteful projects.|Mengembalikan kas membatasi proyek yang boros.|現金を還元することで、無駄な投資を抑えられる。|返还现金可约束浪费型项目。')
    ], [
      I('cost', 'fin,biz', 'lose', 3, 'Less cash to reinvest|Kas berkurang untuk investasi|再投資の原資が減る|可再投资的现金减少', 'Money paid out cannot fund growth.|Uang yang dibayarkan tidak bisa mendanai pertumbuhan.|配当に回した分は、成長に使えない。|分出去的钱无法用于增长。'),
      I('risk', 'fin,biz', 'rules', 2, 'Hard to cut|Sulit dikurangi|減配しにくい|难以削减', 'Reducing dividends upsets investors and hurts the share price.|Memangkas dividen mengecewakan investor dan menekan harga saham.|減配は投資家を失望させ、株価を下げる。|削减分红会令投资者失望并压低股价。'),
      I('risk', 'fin,biz', 'danger', 2, 'Weakens in a downturn|Melemahkan saat krisis|不況時に負担|衰退时削弱抗风险', 'Paying out in good times leaves less buffer.|Membayar di masa baik menyisakan bantalan lebih sedikit.|好況時に配当に回すと、不況への備えが薄くなる。|景气时分红会减少缓冲。'),
      I('cost', 'fin,biz', 'tax', 2, 'Tax cost|Beban pajak|税負担|税负', 'Dividends may be taxed at the owner level.|Dividen mungkin dikenai pajak di tingkat pemilik.|配当には、株主レベルで課税されることがある。|分红可能在股东层面被征税。')
    ]),
    C('share buyback', 'Share buyback|Pembelian kembali saham|自社株買い|股票回购', ['dividend'], [
      I('val', 'fin,biz', 'profit', 3, 'Higher earnings per share|Laba per saham naik|1株当たり利益の向上|每股收益提高', 'Fewer shares share the same profit.|Lebih sedikit saham membagi laba yang sama.|株数が減るので、同じ利益を少ない株で分けられる。|股份减少，同样利润由更少股份分摊。'),
      I('cap', 'fin,biz', 'flexible', 2, 'Flexible return of cash|Pengembalian kas fleksibel|柔軟な株主還元|返还现金更灵活', 'Unlike dividends, buybacks can be paused without alarm.|Berbeda dengan dividen, pembelian kembali bisa dihentikan tanpa kepanikan.|配当と違い、自社株買いは止めても大きな動揺を生まない。|与分红不同，回购可以暂停而不引发恐慌。'),
      I('mkt', 'fin,biz', 'trust', 2, 'Signals undervaluation|Sinyal saham undervalued|割安のシグナル|传递低估信号', 'Management shows belief that shares are cheap.|Manajemen menunjukkan keyakinan saham itu murah.|経営陣が、株価は割安だと考えていることを示せる。|管理层表明认为股价偏低。'),
      I('val', 'fin,biz', 'tax', 2, 'Tax efficiency|Efisiensi pajak|税務効率|税务效率', 'Gains may be taxed more lightly than dividends.|Keuntungan mungkin dikenai pajak lebih ringan daripada dividen.|配当より税負担が軽くなる場合がある。|收益税负可能比分红轻。')
    ], [
      I('cost', 'fin,biz', 'expensive', 3, 'May overpay|Bisa membayar terlalu mahal|高値づかみの恐れ|可能买贵', 'Buying at a high price destroys value.|Membeli di harga tinggi menghancurkan nilai.|高い株価で買うと、価値を損なう。|高价回购会毁掉价值。'),
      I('risk', 'fin,biz', 'lose', 3, 'Less investment|Investasi berkurang|投資が減る|投资减少', 'Cash used for buybacks is not used for the business.|Kas untuk pembelian kembali tidak dipakai untuk bisnis.|買い戻しに使った現金は、事業には使えない。|用于回购的现金不能用于业务。'),
      I('risk', 'fin,pub', 'cheat', 2, 'Short-term manipulation|Manipulasi jangka pendek|短期的な数字作り|短期操纵嫌疑', 'It can inflate figures that determine bonuses.|Bisa menggelembungkan angka yang menentukan bonus.|賞与に影響する数値を、見かけ上押し上げられる。|可能人为抬高决定奖金的指标。'),
      I('risk', 'fin,biz', 'debt', 2, 'Debt-funded risk|Risiko jika dibiayai utang|借入で賄うリスク|举债回购风险', 'Borrowing to buy back shares weakens the balance sheet.|Berutang untuk membeli kembali saham melemahkan neraca.|借入で自社株買いをすると、財務が弱まる。|借钱回购会削弱资产负债表。')
    ]),
    C('leverage', 'Financial leverage|Leverage keuangan|財務レバレッジ|财务杠杆', ['loan'], [
      I('val', 'fin,biz', 'profit', 3, 'Amplified returns|Imbal hasil berlipat|リターンの拡大|放大收益', 'Borrowed money can multiply profit on your own funds.|Uang pinjaman dapat melipatgandakan laba atas dana sendiri.|借入によって、自己資金に対する利益を拡大できる。|借来的钱可放大自有资金的收益。'),
      I('cap', 'fin,biz', 'invest', 2, 'Bigger projects|Proyek lebih besar|大きな投資が可能|可做更大项目', 'You can invest more than you could save.|Anda bisa berinvestasi lebih banyak dari yang bisa ditabung.|貯められる以上の額を、投資に回せる。|可投资的金额超过你的积蓄。'),
      I('val', 'fin,biz', 'tax', 2, 'Tax shield|Perisai pajak|節税効果|税盾', 'Interest can reduce taxable profit.|Bunga dapat mengurangi laba kena pajak.|利息は、課税所得を減らす。|利息可减少应税利润。'),
      I('cap', 'fin,biz', 'keep', 2, 'Ownership kept|Kepemilikan terjaga|所有権を維持|保留股权', 'You grow without selling shares.|Anda tumbuh tanpa menjual saham.|株式を売らずに成長できる。|无需出售股份即可增长。')
    ], [
      I('risk', 'fin,biz', 'lose', 3, 'Amplified losses|Kerugian berlipat|損失の拡大|放大亏损', 'The same borrowing multiplies losses too.|Pinjaman yang sama juga melipatgandakan kerugian.|同じ借入が、損失も拡大させる。|同样的借款也会放大损失。'),
      I('risk', 'fin,biz', 'debt', 3, 'Fixed payments in bad times|Cicilan tetap di masa sulit|不況でも固定の返済|困难时仍需固定还款', 'Interest must be paid even when sales drop.|Bunga harus dibayar bahkan saat penjualan turun.|売上が落ちても、利息は払わなければならない。|即使销售下滑也得付息。'),
      I('risk', 'fin,biz', 'rules', 2, 'Lender conditions|Syarat pemberi pinjaman|貸し手の条件|贷款方条件', 'Covenants can restrict spending and dividends.|Perjanjian dapat membatasi pengeluaran dan dividen.|財務制限条項が、支出や配当を縛ることがある。|契约条款可限制开支与分红。'),
      I('risk', 'fin,biz', 'danger', 2, 'Bankruptcy risk|Risiko kebangkrutan|倒産リスク|破产风险', 'Too much debt can end the company.|Utang terlalu besar bisa mengakhiri perusahaan.|借入が多すぎると、会社が立ち行かなくなる。|债务过多可能终结公司。')
    ]),
    C('hedging', 'Hedging|Lindung nilai|ヘッジ|对冲', ['insurance'], [
      I('val', 'fin,biz', 'safe', 3, 'Protects against swings|Melindungi dari fluktuasi|価格変動への備え|防范波动', 'Prices, rates or currencies are locked in advance.|Harga, suku bunga, atau kurs dikunci di muka.|価格・金利・為替を、事前に固定できる。|价格、利率或汇率提前锁定。'),
      I('cap', 'fin,biz', 'plan', 3, 'Predictable budgets|Anggaran terprediksi|予算の見通しが立つ|预算可预测', 'You know your costs or revenues in advance.|Anda tahu biaya atau pendapatan di muka.|コストや収入を、事前に見通せる。|你提前知道成本或收入。'),
      I('val', 'fin,biz', 'trust', 2, 'Reassures lenders|Menenangkan pemberi pinjaman|貸し手への安心材料|让贷方放心', 'Lower volatility supports better financing terms.|Volatilitas lebih rendah mendukung syarat pendanaan lebih baik.|変動が小さいほど、有利な条件で資金を調達しやすい。|波动更小有助于获得更好融资条件。'),
      I('cap', 'fin,biz', 'focus', 2, 'Focus on the core|Fokus pada bisnis inti|本業への集中|聚焦主业', 'Managers spend less time worrying about markets.|Manajer menghabiskan lebih sedikit waktu mencemaskan pasar.|経営陣が、市況の心配に使う時間を減らせる。|管理者少花时间担心市场。')
    ], [
      I('cost', 'fin,biz', 'expensive', 3, 'Costs money|Memakan biaya|コストがかかる|需要成本', 'Hedging has a fee, whether or not you need it.|Lindung nilai ada biayanya, dibutuhkan atau tidak.|ヘッジには、必要かどうかにかかわらず費用がかかる。|无论是否用得上，对冲都要花钱。'),
      I('risk', 'fin,biz', 'lose', 3, 'Gives up gains|Melepas keuntungan|有利な変動も逃す|放弃潜在收益', 'If prices move your way, you do not benefit.|Jika harga bergerak menguntungkan, Anda tidak ikut menikmati.|相場が有利に動いても、その利益は受け取れない。|价格朝有利方向变动时你无法受益。'),
      I('eff', 'fin,biz', 'complex', 2, 'Complex instruments|Instrumen rumit|商品が複雑|工具复杂', 'Contracts are hard to understand and manage.|Kontrak sulit dipahami dan dikelola.|契約が難しく、管理も大変。|合约难以理解和管理。'),
      I('risk', 'fin,biz', 'mistake', 2, 'Wrong hedge adds risk|Lindung nilai salah menambah risiko|誤ったヘッジはリスクを増やす|对冲不当反增风险', 'A poorly matched hedge can create new losses.|Lindung nilai yang tidak sesuai dapat menimbulkan kerugian baru.|合わないヘッジは、新たな損失を生むことがある。|不匹配的对冲可能带来新的损失。')
    ]),
    C('budgeting', 'Budgeting|Penganggaran|予算管理|预算管理', ['strategic planning'], [
      I('val', 'fin,biz,fam', 'control', 3, 'Spending control|Kendali pengeluaran|支出の管理|支出控制', 'You see where money goes before it is spent.|Anda melihat ke mana uang pergi sebelum dibelanjakan.|お金の行き先を、使う前に把握できる。|花钱之前就知道钱去哪。'),
      I('cap', 'biz,pub', 'plan', 3, 'Clear priorities|Prioritas jelas|優先順位の明確化|优先级明确', 'Limited money forces choices.|Uang terbatas memaksa pilihan.|限られた資金が、取捨選択を促す。|资金有限迫使取舍。'),
      I('ppl', 'biz,pub', 'team', 2, 'Accountability|Akuntabilitas|説明責任|问责', 'Managers answer for their numbers.|Manajer bertanggung jawab atas angkanya.|管理者が、自分の数字に責任を持つ。|管理者要为自己的数字负责。'),
      I('cap', 'fin,fam', 'safe', 2, 'Early warning|Peringatan dini|早期警戒|早期预警', 'Gaps between plan and reality show up quickly.|Selisih antara rencana dan kenyataan cepat terlihat.|計画と実績のずれに、早く気づける。|计划与现实的偏差很快显现。')
    ], [
      I('eff', 'biz,pub', 'time', 3, 'Time-consuming|Memakan waktu|時間がかかる|耗时', 'Annual budgets take weeks of meetings.|Anggaran tahunan memakan berminggu-minggu rapat.|年度予算には、何週間もの会議が必要。|年度预算需要数周会议。'),
      I('risk', 'biz,mfg', 'rules', 2, 'Rigid and wasteful|Kaku dan boros|硬直的で無駄が出る|僵化浪费', 'Use it or lose it habits encourage pointless spending.|Kebiasaan habiskan atau hilang mendorong belanja tak perlu.|使い切らないと減額される慣行が、無駄遣いを招く。|不花就作废的习惯会诱发无谓开支。'),
      I('ppl', 'biz,pub', 'cheat', 2, 'Gaming the numbers|Mengakali angka|数字の操作|玩弄数字', 'Managers pad budgets or hide good news.|Manajer menggelembungkan anggaran atau menyembunyikan kabar baik.|管理者が、予算を水増ししたり、好業績を隠したりする。|管理者可能虚报预算或隐藏好消息。'),
      I('risk', 'biz,retail', 'change', 2, 'Slow to adapt|Lambat beradaptasi|変化への対応が遅い|应变迟缓', 'Plans made months ago may not fit today.|Rencana yang dibuat berbulan lalu mungkin tidak cocok hari ini.|数か月前の計画は、今の状況に合わないことがある。|几个月前的计划未必适合今天。')
    ]),
    C('cost cutting', 'Cost cutting|Pemangkasan biaya|コスト削減|削减成本', ['quality'], [
      I('val', 'fin,biz,mfg', 'save', 3, 'Higher margins|Margin lebih tinggi|利益率の改善|利润率提高', 'Lower costs lift profit without raising prices.|Biaya lebih rendah menaikkan laba tanpa menaikkan harga.|価格を上げずに、利益を増やせる。|不涨价也能提升利润。'),
      I('cap', 'biz,pub', 'waste', 2, 'Removes waste|Menghapus pemborosan|ムダの排除|消除浪费', 'You find activities that add no value.|Anda menemukan kegiatan yang tidak menambah nilai.|価値を生まない活動が見つかる。|找出不创造价值的活动。'),
      I('val', 'fin,biz', 'safe', 2, 'Survival in a crisis|Bertahan di masa krisis|危機を乗り切れる|危机中求生', 'Lower spending buys time when sales fall.|Pengeluaran lebih rendah memberi waktu saat penjualan turun.|支出を抑えれば、売上減少の間も持ちこたえられる。|支出减少，在销售下滑时赢得时间。'),
      I('cap', 'biz,mfg', 'focus', 2, 'Sharper focus|Fokus lebih tajam|選択と集中|更聚焦', 'Limited money forces you to protect the core.|Dana terbatas memaksa Anda melindungi bisnis inti.|資金が限られるので、中核事業を守ることになる。|资金有限促使你保护核心业务。')
    ], [
      I('risk', 'retail,food,health', 'quality', 3, 'Quality and service suffer|Kualitas dan layanan menurun|品質とサービスの低下|质量与服务下降', 'Customers notice when corners are cut.|Pelanggan menyadari ketika ada yang dipangkas.|手を抜けば、顧客は気づく。|偷工减料客户会察觉。'),
      I('ppl', 'biz,pub', 'fear', 3, 'Fear and morale|Ketakutan dan moral|不安と士気低下|恐惧与士气', 'Layoffs and freezes make good people leave.|PHK dan pembekuan membuat orang baik pergi.|人員削減や採用凍結で、優秀な人が去る。|裁员与冻结让优秀人才离开。'),
      I('risk', 'biz,mfg', 'old', 2, 'Cuts the future|Memotong masa depan|将来への投資を削る|削掉未来', 'Research, training and marketing are cut first.|Riset, pelatihan, dan pemasaran dipangkas lebih dulu.|研究・研修・マーケが、真っ先に削られる。|研发、培训和营销最先被砍。'),
      I('cost', 'fin,biz', 'cost', 2, 'Savings may not last|Penghematan mungkin tidak bertahan|節約が続かない|节省难以持续', 'Costs often creep back after a few months.|Biaya sering kembali naik setelah beberapa bulan.|コストは、数か月後にまた膨らむことが多い。|成本常在几个月后反弹。')
    ]),
    C('cash reserves', 'Cash reserves|Cadangan kas|現金準備|现金储备', ['leverage'], [
      I('val', 'fin,biz,fam', 'safe', 3, 'Survives shocks|Bertahan saat guncangan|ショックに耐える|抗冲击', 'You can pay bills when income dries up.|Anda bisa membayar tagihan saat pemasukan terhenti.|収入が途絶えても、支払いを続けられる。|收入中断时仍能付账。'),
      I('cap', 'biz,fin', 'choice', 2, 'Freedom to act|Kebebasan bertindak|行動の自由|行动自由', 'You can seize a bargain or opportunity quickly.|Anda bisa cepat menangkap peluang murah.|掘り出し物や好機に、すぐ動ける。|可迅速抓住便宜机会。'),
      I('val', 'fin,biz', 'trust', 2, 'Trust from partners|Kepercayaan mitra|取引先の信頼|伙伴信任', 'Suppliers and lenders see a safer customer.|Pemasok dan pemberi pinjaman melihat pelanggan yang lebih aman.|仕入先や貸し手が、安心して取引できる。|供应商和贷方视你为更安全的客户。'),
      I('ppl', 'biz,fam', 'stress', 2, 'Less stress|Lebih tenang|ストレスの軽減|压力更小', 'Owners sleep better with a buffer.|Pemilik tidur lebih nyenyak dengan bantalan kas.|余裕があれば、経営者は安心して眠れる。|有缓冲，老板睡得更踏实。')
    ], [
      I('cost', 'fin,biz', 'waste', 3, 'Idle money|Uang menganggur|眠ったお金|资金闲置', 'Cash held back earns little and could be invested.|Kas yang ditahan menghasilkan sedikit dan bisa diinvestasikan.|寝かせた現金は、ほとんど利益を生まない。|搁置的现金收益很低，本可用于投资。'),
      I('risk', 'fin,biz', 'lose', 2, 'Inflation erodes it|Dimakan inflasi|インフレで目減り|被通胀侵蚀', 'Money held for years loses purchasing power.|Uang yang disimpan bertahun-tahun kehilangan daya beli.|何年も持ち続けると、購買力が落ちる。|长期持有的现金会损失购买力。'),
      I('ppl', 'biz,pub', 'greed', 2, 'Pressure to spend or pay out|Tekanan membelanjakan atau membagikan|使うか配当せよという圧力|被要求花掉或分掉', 'Owners and staff ask why the cash sits idle.|Pemilik dan staf bertanya mengapa kas dibiarkan menganggur.|株主や社員が、なぜ現金を使わないのかと問う。|股东与员工会问为何现金闲着。'),
      I('risk', 'biz,retail', 'slow', 2, 'May dull urgency|Bisa menumpulkan urgensi|危機感が薄れる|可能削弱紧迫感', 'A big cushion can excuse slow decisions.|Bantalan besar bisa menjadi alasan untuk lambat memutuskan.|余裕が大きいと、決断が遅れる言い訳になる。|大额缓冲可能成为拖延决策的借口。')
    ]),
    C('credit sales', 'Credit sales|Penjualan kredit|掛け売り|赊销', ['cash reserves'], [
      I('mkt', 'retail,mfg', 'customer', 3, 'More buyers|Lebih banyak pembeli|買い手が増える|买家更多', 'Customers buy now and pay later.|Pelanggan membeli sekarang dan membayar nanti.|顧客は、今買って後で払える。|客户现在买、以后付。'),
      I('mkt', 'retail,biz', 'loyal', 2, 'Stronger relationships|Hubungan lebih kuat|関係の強化|关系更牢固', 'Trust shown to customers is often returned.|Kepercayaan yang diberikan kepada pelanggan sering dibalas.|顧客を信用すれば、信頼が返ってくることが多い。|给客户信任常会换来回报。'),
      I('val', 'retail,mfg', 'profit', 2, 'Larger orders|Pesanan lebih besar|大口注文|订单更大', 'Buyers order more when they need not pay immediately.|Pembeli memesan lebih banyak saat tidak harus langsung membayar.|すぐに払わなくてよいと、買い手は多く注文する。|无需立即付款时买家下单更多。'),
      I('cap', 'mfg,retail', 'edge', 2, 'Competitive edge|Keunggulan bersaing|競争上の優位|竞争优势', 'Rivals who demand cash lose the deal.|Pesaing yang meminta tunai kehilangan kesepakatan.|現金払いを求める競合は、取引を逃す。|要求现金的对手会丢单。')
    ], [
      I('risk', 'retail,mfg', 'lose', 3, 'Bad debts|Piutang macet|貸倒れ|坏账', 'Some customers never pay.|Sebagian pelanggan tidak pernah membayar.|支払ってくれない顧客もいる。|有些客户永远不付款。'),
      I('cost', 'retail,mfg,fin', 'money', 3, 'Cash tied up|Kas tertahan|資金が滞留|现金被占用', 'You pay suppliers and wages before you are paid.|Anda membayar pemasok dan gaji sebelum dibayar.|入金前に、仕入先や給与を払う必要がある。|你要先付供应商货款和工资才收到钱。'),
      I('eff', 'biz,mfg', 'effort', 2, 'Collection effort|Beban penagihan|回収の手間|催收负担', 'Chasing payments takes time and strains relations.|Menagih pembayaran memakan waktu dan menegangkan hubungan.|代金の督促には手間がかかり、関係も緊張する。|催款耗时并使关系紧张。'),
      I('cost', 'fin,biz', 'interest', 2, 'Financing cost|Biaya pendanaan|資金調達コスト|融资成本', 'You may borrow to cover the wait for payment.|Anda mungkin berutang untuk menutup masa tunggu pembayaran.|入金を待つ間、借入で資金をつなぐことになる。|你可能要借钱来填补等待回款的空档。')
    ]),
    C('factoring', 'Factoring|Anjak piutang|ファクタリング|保理', ['credit sales'], [
      I('val', 'fin,biz', 'money', 3, 'Cash right away|Kas segera|すぐに現金化|立即变现', 'Unpaid invoices become money now.|Faktur yang belum dibayar menjadi uang sekarang.|未回収の請求書が、すぐ現金になる。|未付发票马上变成现金。'),
      I('cap', 'fin,biz', 'safe', 2, 'Less collection risk|Risiko penagihan lebih kecil|回収リスクの軽減|催收风险降低', 'The factor may take the risk of non-payment.|Perusahaan anjak piutang mungkin menanggung risiko gagal bayar.|ファクターが、不払いリスクを引き受けることがある。|保理商可能承担坏账风险。'),
      I('cap', 'biz,pub', 'time', 2, 'Saves admin time|Menghemat waktu administrasi|事務負担の軽減|节省行政时间', 'Someone else chases customers.|Pihak lain yang menagih pelanggan.|督促業務を、他者が代行してくれる。|由别人去催客户。'),
      I('val', 'fin,biz', 'flexible', 2, 'Easier than a loan|Lebih mudah daripada pinjaman|融資より手軽|比贷款更容易', 'Approval depends on your customers, not just you.|Persetujuan bergantung pada pelanggan Anda, bukan hanya Anda.|審査は、自社だけでなく取引先の信用に基づく。|审批取决于你的客户，而不只是你。')
    ], [
      I('cost', 'fin,biz', 'expensive', 3, 'Fees and discount|Biaya dan potongan|手数料と割引|费用与折价', 'You receive less than the full invoice.|Anda menerima kurang dari nilai faktur penuh.|請求額の全額は受け取れない。|你拿不到发票全额。'),
      I('risk', 'retail,biz', 'trust', 2, 'Customer relationships|Hubungan pelanggan|顧客との関係|客户关系', 'Customers may dislike dealing with a third party.|Pelanggan mungkin tidak suka berurusan dengan pihak ketiga.|顧客が、第三者とのやり取りを嫌がることがある。|客户可能不喜欢与第三方打交道。'),
      I('risk', 'fin,biz', 'weak', 2, 'Seen as a weak sign|Dianggap tanda lemah|資金繰りの悪化を疑われる|被视为财务吃紧信号', 'Others may think you are short of cash.|Orang lain mungkin mengira Anda kekurangan kas.|資金繰りが苦しいと、周囲に思われることがある。|别人可能认为你缺现金。'),
      I('cost', 'fin,biz', 'lose', 2, 'Only for some invoices|Hanya untuk sebagian faktur|対象の請求書が限られる|仅适用于部分发票', 'Weak customers make invoices unfinanceable.|Pelanggan lemah membuat faktur tidak dapat didanai.|信用力の低い取引先の請求書は、買い取ってもらえない。|客户信用差的发票无法融资。')
    ]),
    C('insurance', 'Insurance|Asuransi|保険|保险', ['hedging'], [
      I('val', 'fin,biz,fam', 'safe', 3, 'Protects against big losses|Melindungi dari kerugian besar|大きな損失への備え|防范重大损失', 'One accident does not ruin you.|Satu kecelakaan tidak menghancurkan Anda.|1つの事故で、破綻せずに済む。|一次事故不会让你破产。'),
      I('ppl', 'fam,biz,health', 'fear', 2, 'Peace of mind|Ketenangan pikiran|安心感|安心', 'You can take reasonable risks with less worry.|Anda bisa mengambil risiko wajar dengan lebih sedikit kekhawatiran.|不安が減り、妥当なリスクを取りやすくなる。|担忧减少，可以放心承担合理风险。'),
      I('cap', 'fin,biz', 'trust', 2, 'Required by partners|Dipersyaratkan mitra|取引先の要件を満たす|满足合作方要求', 'Lenders and clients often demand cover.|Pemberi pinjaman dan klien sering mewajibkan perlindungan.|貸し手や顧客が、加入を条件にすることが多い。|贷方和客户常要求投保。'),
      I('val', 'health,fam', 'help', 2, 'Quick recovery|Pemulihan cepat|早い立ち直り|恢复更快', 'Payouts help you repair, replace and restart.|Pembayaran klaim membantu memperbaiki, mengganti, dan memulai lagi.|保険金が、修理・買い替え・再開を助ける。|理赔帮助修复、替换和重启。')
    ], [
      I('cost', 'fin,biz,fam', 'expensive', 3, 'Premiums|Premi|保険料|保费', 'You pay every year, even if nothing happens.|Anda membayar setiap tahun, walau tidak terjadi apa-apa.|何も起きなくても、毎年保険料を払う。|即使没事也要年年交保费。'),
      I('risk', 'fin,biz,fam', 'rules', 2, 'Exclusions and fine print|Pengecualian dan syarat kecil|免責と細かい条件|除外条款与细则', 'Claims can be refused for reasons you missed.|Klaim bisa ditolak karena alasan yang Anda lewatkan.|見落とした条件で、請求が認められないことがある。|因你忽略的条款，理赔可能被拒。'),
      I('eff', 'biz,fam', 'effort', 2, 'Claims hassle|Repot mengajukan klaim|請求手続きの手間|理赔麻烦', 'Paperwork and delays follow a loss.|Dokumen dan penundaan menyusul setelah kerugian.|損失の後に、書類手続きと待ち時間が続く。|出险后手续繁琐且拖延。'),
      I('risk', 'biz,mfg', 'careless', 2, 'Moral hazard|Bahaya moral|モラルハザード|道德风险', 'Feeling covered can make people careless.|Merasa terlindungi bisa membuat orang ceroboh.|保険があると、注意が緩むことがある。|有保障可能使人疏忽大意。')
    ]),
    C('stock options', 'Stock options|Opsi saham|ストックオプション|股票期权', ['bonus'], [
      I('ppl', 'biz,fin', 'team', 3, 'Aligns staff with owners|Menyelaraskan staf dengan pemilik|社員と株主の利害一致|员工与股东利益一致', 'Employees gain when the company does.|Karyawan untung saat perusahaan untung.|会社が成長すると、社員も利益を得る。|公司获益，员工也获益。'),
      I('ppl', 'biz,fin', 'job', 3, 'Attracts and keeps talent|Menarik dan mempertahankan talenta|人材の獲得・定着|吸引并留住人才', 'Cash-poor firms can still offer a big prize.|Perusahaan yang kurang kas tetap bisa menawarkan hadiah besar.|現金に乏しい会社でも、大きな報酬を提示できる。|现金紧张的公司也能提供大额回报。'),
      I('val', 'fin,biz', 'save', 2, 'Saves cash|Menghemat kas|現金の節約|节省现金', 'Pay is partly deferred and tied to performance.|Sebagian pembayaran ditunda dan terkait kinerja.|報酬の一部が後払いになり、業績に連動する。|部分报酬延后并与业绩挂钩。'),
      I('cap', 'biz,fin', 'long', 2, 'Long-term thinking|Berpikir jangka panjang|長期志向|长期思维', 'Vesting rewards staying and building value.|Masa vesting menghargai yang bertahan dan membangun nilai.|権利確定期間が、長く残って価値を築く人に報いる。|行权期奖励留下并创造价值的人。')
    ], [
      I('risk', 'fin,biz', 'lose', 3, 'May be worth nothing|Bisa tidak bernilai|価値がゼロになることも|可能一文不值', 'If the share price falls, options are useless.|Jika harga saham turun, opsi tidak berguna.|株価が下がれば、オプションは無価値になる。|股价下跌，期权就没用。'),
      I('risk', 'fin,biz', 'cheat', 2, 'Encourages short-term moves|Mendorong langkah jangka pendek|短期的な行動を誘発|诱发短期行为', 'People may push the share price up at any cost.|Orang bisa mendorong harga saham naik dengan segala cara.|株価を上げるために、手段を選ばなくなる恐れがある。|人们可能不择手段推高股价。'),
      I('cost', 'fin,biz', 'share', 2, 'Dilutes owners|Mengencerkan pemilik|既存株主の希薄化|稀释股东', 'Issued shares reduce existing holders stake.|Saham yang diterbitkan mengurangi bagian pemegang lama.|新株の発行が、既存株主の持ち分を減らす。|增发股票降低既有股东占比。'),
      I('ppl', 'biz,pub', 'fair', 2, 'Unequal rewards|Ganjaran tidak setara|報酬の不公平感|回报不均', 'Staff without options may feel left out.|Staf tanpa opsi bisa merasa terabaikan.|オプションのない社員が、取り残されたと感じる。|没有期权的员工可能觉得被忽视。')
    ]),
    C('subsidy', 'Subsidy|Subsidi|補助金|补贴', ['tax planning'], [
      I('val', 'pub,food,fam', 'cheap', 3, 'Lower prices|Harga lebih murah|価格の低下|价格更低', 'Buyers pay less for essentials.|Pembeli membayar lebih sedikit untuk kebutuhan pokok.|生活必需品を、買い手が安く手に入れられる。|买家以更低价格获得必需品。'),
      I('cap', 'pub,mfg', 'new', 2, 'Supports new industries|Mendukung industri baru|新産業の育成|扶持新兴产业', 'Early support helps risky sectors take off.|Dukungan awal membantu sektor berisiko lepas landas.|初期の支援が、リスクの高い産業の立ち上がりを助ける。|早期扶持帮助高风险行业起步。'),
      I('ppl', 'pub,food,fam', 'poor', 2, 'Protects the vulnerable|Melindungi yang rentan|弱い立場の人を守る|保护弱势群体', 'Households and small producers get help.|Rumah tangga dan produsen kecil mendapat bantuan.|家計や小規模生産者が、支援を受けられる。|家庭与小生产者获得帮助。'),
      I('val', 'pub,mfg', 'job', 2, 'Protects jobs|Melindungi lapangan kerja|雇用の維持|保住就业', 'Firms stay afloat through tough periods.|Perusahaan bertahan melewati masa sulit.|企業が、厳しい時期を乗り切れる。|企业得以度过艰难时期。')
    ], [
      I('cost', 'pub,fin', 'expensive', 3, 'Costly for the state|Mahal bagi negara|財政負担が大きい|国家财政负担重', 'Taxpayers pay, and it can crowd out other spending.|Pembayar pajak yang menanggung, dan bisa menggeser belanja lain.|納税者が負担し、他の支出を圧迫しうる。|由纳税人买单，并可能挤占其他支出。'),
      I('risk', 'mfg,retail', 'depend', 3, 'Creates dependence|Menciptakan ketergantungan|依存を生む|造成依赖', 'Firms and buyers struggle once support ends.|Perusahaan dan pembeli kesulitan setelah dukungan berakhir.|支援が終わると、企業も買い手も困る。|补贴一停，企业和买家都难受。'),
      I('risk', 'pub,fin', 'waste', 2, 'Misdirected benefits|Manfaat salah sasaran|恩恵の的外れ|受益错位', 'Help may reach people who do not need it.|Bantuan bisa jatuh ke orang yang tidak membutuhkannya.|支援が、必要のない人に届いてしまうことがある。|援助可能落到不需要的人手里。'),
      I('risk', 'pub,mfg', 'cheat', 2, 'Distorts competition|Mendistorsi persaingan|競争をゆがめる|扭曲竞争', 'Subsidised firms can undercut efficient rivals.|Perusahaan bersubsidi bisa menjatuhkan harga pesaing yang efisien.|補助を受けた企業が、効率的な競合を価格で圧倒する。|获补贴企业可压价挤垮高效对手。')
    ]),
    C('tax planning', 'Tax planning|Perencanaan pajak|税務計画|税务筹划', ['insurance'], [
      I('val', 'fin,biz,fam', 'save', 3, 'Lower tax bill|Pajak lebih rendah|納税額の削減|降低税负', 'Using legal reliefs keeps more money in the business.|Memanfaatkan keringanan yang sah menyisakan lebih banyak uang di bisnis.|合法的な控除を使えば、手元に残るお金が増える。|合理利用减免可留存更多资金。'),
      I('cap', 'fin,biz', 'plan', 2, 'Better timing|Waktu lebih tepat|時期の最適化|时机更优', 'Investments and sales can be timed to ease the burden.|Investasi dan penjualan dapat diatur waktunya untuk meringankan beban.|投資や売却の時期を調整して、負担を和らげられる。|可通过安排投资与出售时机减轻负担。'),
      I('val', 'fin,biz', 'safe', 2, 'Avoids surprises|Menghindari kejutan|予想外の請求を避ける|避免意外', 'You know what is due and when.|Anda tahu apa yang jatuh tempo dan kapan.|何をいつ払うのかが、事前に分かる。|清楚什么时候该交什么。'),
      I('cap', 'fin,pub', 'rules', 2, 'Compliance with confidence|Patuh dengan percaya diri|安心してルールを守れる|合规更有把握', 'Clear records reduce disputes with the authorities.|Catatan yang jelas mengurangi sengketa dengan otoritas.|記録が明確なら、当局との争いが減る。|清晰记录减少与税务机关的争议。')
    ], [
      I('risk', 'fin,pub', 'law', 3, 'Crossing the line|Melewati batas|一線を越える危険|越过红线', 'Aggressive schemes can become illegal evasion.|Skema agresif bisa berubah menjadi penggelapan ilegal.|行き過ぎた節税は、違法な脱税になりうる。|激进方案可能沦为违法逃税。'),
      I('cost', 'fin,biz', 'expensive', 2, 'Advisers cost money|Penasihat butuh biaya|専門家の費用|顾问费用', 'Complex planning needs paid expertise.|Perencanaan rumit membutuhkan keahlian berbayar.|複雑な計画には、有料の専門家が必要。|复杂筹划需要付费专业人士。'),
      I('risk', 'pub,fin', 'change', 2, 'Rules change|Aturan berubah|制度が変わる|规则变化', 'A plan that works today may fail tomorrow.|Rencana yang berhasil hari ini bisa gagal besok.|今日有効な方法が、明日は使えなくなる。|今天有效的方案明天可能失效。'),
      I('risk', 'biz,pub', 'trust', 2, 'Reputation risk|Risiko reputasi|評判リスク|声誉风险', 'Being seen as dodging tax can harm your name.|Dianggap menghindari pajak bisa merusak nama Anda.|節税が「逃れ」と見られると、評判を損なう。|被视为避税会损害名誉。')
    ]),
    C('bonus', 'Bonus pay|Bonus|ボーナス|奖金', ['stock options'], [
      I('ppl', 'biz,retail', 'win', 3, 'Motivates performance|Memotivasi kinerja|成果へのやる気|激励业绩', 'Extra pay rewards extra effort.|Bayaran tambahan menghargai usaha tambahan.|追加の報酬が、追加の努力に報いる。|额外报酬回报额外努力。'),
      I('val', 'fin,biz', 'save', 2, 'Flexible cost|Biaya fleksibel|変動費化|成本弹性', 'Pay falls automatically in a bad year.|Pembayaran turun otomatis di tahun buruk.|不調な年は、支払いが自然に減る。|业绩差的年份奖金自动减少。'),
      I('ppl', 'biz,pub', 'fair', 2, 'Perceived fairness|Terasa adil|公平感|公平感', 'Results are visibly linked to rewards.|Hasil terlihat terkait dengan ganjaran.|成果と報酬のつながりが、はっきり見える。|成果与奖励的联系清晰可见。'),
      I('cap', 'biz,fin', 'direction', 2, 'Directs attention|Mengarahkan perhatian|注意を向けさせる|引导注意力', 'People focus on what the bonus measures.|Orang berfokus pada apa yang diukur bonus.|人は、ボーナスが測るものに集中する。|人们会专注于奖金所衡量的指标。')
    ], [
      I('risk', 'biz,fin', 'cheat', 3, 'Gaming the target|Mengakali target|目標の不正操作|钻空子达标', 'People hit the number, not the real goal.|Orang mengejar angka, bukan tujuan sebenarnya.|人は、本当の目的でなく、数字だけを達成しようとする。|人们追求数字而非真实目标。'),
      I('ppl', 'biz,edu', 'conflict', 2, 'Rivalry|Persaingan antar rekan|同僚間の競争|同事间内耗', 'Individual rewards weaken teamwork.|Ganjaran individu melemahkan kerja tim.|個人への報酬が、チームワークを弱める。|个人奖励削弱团队合作。'),
      I('ppl', 'biz,pub', 'stress', 2, 'Pressure and unfairness|Tekanan dan rasa tidak adil|圧力と不公平感|压力与不公', 'Luck and politics can decide who is paid.|Keberuntungan dan politik bisa menentukan siapa dibayar.|運や社内政治が、誰に払われるかを左右しうる。|运气和办公室政治可能决定谁拿奖金。'),
      I('risk', 'biz,mfg', 'short', 2, 'Short-term focus|Fokus jangka pendek|短期志向|短视', 'Annual bonuses push out long-term projects.|Bonus tahunan menyingkirkan proyek jangka panjang.|年次ボーナスが、長期プロジェクトを押しのける。|年度奖金挤掉长期项目。')
    ]),
    C('price skimming', 'Price skimming|Skimming harga|上澄み吸収価格|撇脂定价', ['penetration pricing'], [
      I('val', 'retail,mfg', 'profit', 3, 'High early profit|Laba awal tinggi|初期の高収益|早期高利润', 'Early adopters pay a lot, quickly recovering costs.|Pengguna awal membayar mahal, biaya cepat kembali.|初期の購入者が高く払い、コストを早く回収できる。|早期用户付高价，成本回收快。'),
      I('mkt', 'retail,mfg', 'premium', 2, 'Premium image|Citra premium|高級なイメージ|高端形象', 'A high price signals quality and status.|Harga tinggi menandakan kualitas dan status.|高価格は、品質とステータスの印になる。|高价传达品质与地位。'),
      I('cap', 'mfg,biz', 'control', 2, 'Controls demand|Mengendalikan permintaan|需要の調整|控制需求', 'Limited early demand matches limited early supply.|Permintaan awal terbatas sesuai pasokan awal yang terbatas.|初期の需要を抑え、限られた供給に合わせられる。|限制早期需求，匹配有限的早期供应。'),
      I('val', 'retail,mfg', 'choice', 2, 'Room to cut later|Ruang untuk menurunkan harga|後から値下げできる|日后有降价空间', 'Lowering price later feels like a bonus to buyers.|Menurunkan harga kemudian terasa seperti bonus bagi pembeli.|後の値下げは、買い手に得に感じられる。|日后降价让买家觉得占便宜。')
    ], [
      I('risk', 'retail,mfg', 'lose', 3, 'Small market|Pasar kecil|市場が小さい|市场规模小', 'Few can afford the early price.|Hanya sedikit yang mampu membayar harga awal.|初期の価格を払える人は少ない。|能负担早期价格的人很少。'),
      I('risk', 'mfg,retail', 'copy', 3, 'Attracts rivals|Menarik pesaing|競合を呼び込む|吸引对手', 'High margins invite cheaper copies.|Margin tinggi mengundang tiruan yang lebih murah.|高い利益率は、安価な模倣品を呼び込む。|高利润吸引更便宜的仿制品。'),
      I('ppl', 'retail,biz', 'anger', 2, 'Early buyers feel cheated|Pembeli awal merasa dirugikan|早期購入者の不満|早期买家觉得吃亏', 'Later price cuts annoy those who paid more.|Penurunan harga kemudian menjengkelkan mereka yang membayar lebih.|後の値下げが、高く買った人を怒らせる。|之后降价会惹恼先前高价购买者。'),
      I('eff', 'mfg,biz', 'slow', 2, 'Slow volume growth|Volume tumbuh lambat|販売量の伸びが遅い|销量增长慢', 'It takes longer to build scale.|Butuh waktu lebih lama untuk membangun skala.|規模を作るのに、時間がかかる。|形成规模需要更长时间。')
    ]),
    C('penetration pricing', 'Penetration pricing|Harga penetrasi|ペネトレーション価格|渗透定价', ['price skimming'], [
      I('mkt', 'retail,food', 'market', 3, 'Fast market share|Pangsa pasar cepat|素早いシェア獲得|快速占有市场', 'A low price wins many buyers quickly.|Harga rendah merebut banyak pembeli dengan cepat.|低価格で、短期間に多くの買い手を獲得できる。|低价快速赢得大量买家。'),
      I('val', 'mfg,retail', 'save', 2, 'Scale savings|Penghematan skala|規模の経済|规模节约', 'High volume brings unit costs down.|Volume tinggi menurunkan biaya per unit.|販売量が増えると、単価コストが下がる。|大销量降低单位成本。'),
      I('cap', 'retail,biz', 'power', 2, 'Blocks newcomers|Menghalangi pendatang baru|新規参入を阻む|阻挡新进入者', 'Low prices make entry unattractive for rivals.|Harga rendah membuat masuk pasar tidak menarik bagi pesaing.|低価格は、競合にとって参入の魅力を下げる。|低价使对手觉得进入无利可图。'),
      I('mkt', 'retail,food', 'habit', 2, 'Builds habits|Membangun kebiasaan|習慣の形成|养成习惯', 'People who try it may keep buying it.|Orang yang mencoba mungkin terus membeli.|試した人が、そのまま買い続けることがある。|试用者可能持续购买。')
    ], [
      I('cost', 'retail,mfg', 'poor', 3, 'Early losses|Kerugian awal|初期の赤字|早期亏损', 'Low prices may not cover costs at first.|Harga rendah mungkin tidak menutup biaya di awal.|最初は、低価格でコストを賄えないことがある。|低价起初可能不够覆盖成本。'),
      I('risk', 'retail,food', 'cheap', 3, 'Cheap image|Citra murahan|安物のイメージ|廉价形象', 'Raising prices later is hard once buyers expect cheap.|Menaikkan harga kemudian sulit setelah pembeli terbiasa murah.|安さに慣れた買い手に、後から値上げするのは難しい。|买家习惯低价后很难再涨价。'),
      I('risk', 'retail,mfg', 'war', 2, 'Triggers a price war|Memicu perang harga|価格戦争を招く|引发价格战', 'Rivals may match or undercut you.|Pesaing mungkin menyamai atau menjatuhkan harga Anda.|競合が、同じか、さらに低い価格で対抗してくる。|对手可能跟进或更低价。'),
      I('risk', 'retail,biz', 'lose', 2, 'Disloyal buyers|Pembeli tidak setia|価格だけの顧客|买家不忠诚', 'Customers attracted by price leave when it rises.|Pelanggan yang tertarik harga pergi saat harga naik.|価格で集めた顧客は、値上げで去っていく。|因价格而来的客户在涨价时离开。')
    ]),
    C('discounting', 'Discounting|Pemberian diskon|値引き|折扣促销', ['price skimming'], [
      I('mkt', 'retail,food', 'customer', 3, 'Attracts buyers|Menarik pembeli|買い手を引きつける|吸引买家', 'A sale brings new and returning customers.|Obral membawa pelanggan baru dan lama.|セールは、新規客と既存客を呼び込む。|促销带来新老客户。'),
      I('val', 'retail,food', 'waste', 3, 'Clears stock|Menghabiskan stok|在庫の一掃|清理库存', 'Old or perishable goods turn into cash.|Barang lama atau mudah rusak berubah menjadi uang.|古い商品や傷みやすい商品を、現金に変えられる。|旧货或易腐商品变成现金。'),
      I('mkt', 'retail,mfg', 'market', 2, 'Grows volume|Menaikkan volume|販売量の増加|提高销量', 'More units sold can lower unit costs.|Lebih banyak unit terjual dapat menurunkan biaya per unit.|販売数量が増えて、単価コストが下がる。|销量提升可降低单位成本。'),
      I('cap', 'retail,biz', 'try', 2, 'Encourages trial|Mendorong mencoba|試用を促す|促使尝试', 'People try products they might not have bought.|Orang mencoba produk yang mungkin tidak akan dibelinya.|普段買わない商品を、試してもらえる。|人们会试买原本不会买的产品。')
    ], [
      I('cost', 'retail,food', 'poor', 3, 'Lower margin|Margin lebih rendah|利益率の低下|利润率下降', 'Every sale earns less.|Setiap penjualan menghasilkan lebih sedikit.|1件ごとの利益が減る。|每笔销售赚得更少。'),
      I('risk', 'retail,biz', 'habit', 3, 'Trains buyers to wait|Melatih pembeli menunggu|待つ習慣がつく|让买家等打折', 'Customers only buy when there is a deal.|Pelanggan hanya membeli saat ada promo.|顧客が、セールのときしか買わなくなる。|客户只在打折时才买。'),
      I('risk', 'retail,mfg', 'cheap', 2, 'Cheapens the brand|Merendahkan merek|ブランド価値の低下|拉低品牌形象', 'Frequent sales suggest low value.|Obral yang sering memberi kesan nilai rendah.|頻繁なセールは、価値が低いという印象を与える。|频繁促销让人觉得价值低。'),
      I('ppl', 'retail,biz', 'anger', 2, 'Unhappy full-price buyers|Pembeli harga penuh kecewa|定価購入者の不満|全价买家不满', 'Those who paid earlier feel cheated.|Mereka yang membeli lebih dulu merasa dirugikan.|先に定価で買った人が、損をしたと感じる。|先前全价购买者觉得吃亏。')
    ]),
    C('dynamic pricing', 'Dynamic pricing|Harga dinamis|ダイナミックプライシング|动态定价', ['discounting'], [
      I('val', 'retail,biz,mfg', 'profit', 3, 'Captures demand|Menangkap permintaan|需要を取り込める|捕捉需求', 'Prices rise when demand is high and fall when it is low.|Harga naik saat permintaan tinggi dan turun saat rendah.|需要が高いときは上げ、低いときは下げられる。|需求高时涨价，需求低时降价。'),
      I('cap', 'biz,retail', 'data', 2, 'Learns from data|Belajar dari data|データから学べる|从数据中学习', 'Each price change shows how buyers react.|Setiap perubahan harga menunjukkan reaksi pembeli.|価格を変えるたびに、買い手の反応が分かる。|每次调价都显示买家的反应。'),
      I('val', 'retail,food', 'waste', 2, 'Less unsold stock|Stok tak terjual berkurang|売れ残りの減少|减少滞销', 'Slow periods are filled by lower prices.|Periode sepi diisi dengan harga lebih rendah.|閑散期を、値下げで埋められる。|淡季可通过低价填补。'),
      I('mkt', 'retail,pub', 'choice', 2, 'Cheaper options for flexible buyers|Pilihan lebih murah bagi pembeli fleksibel|柔軟な客には安く|灵活买家可享更低价', 'People who can wait or shift get better deals.|Orang yang bisa menunggu atau menggeser jadwal mendapat harga lebih baik.|待てる人や時期をずらせる人は、安く買える。|能等待或错峰的人拿到更好价格。')
    ], [
      I('ppl', 'retail,pub', 'fair', 3, 'Feels unfair|Terasa tidak adil|不公平に感じる|令人觉得不公', 'Customers resent paying more at the same moment as others.|Pelanggan kesal membayar lebih mahal pada saat yang sama dengan orang lain.|同じ時に他の人より高く払うことに、顧客は反発する。|客户讨厌同一时间比别人付更多。'),
      I('risk', 'retail,biz', 'trust', 2, 'Erodes trust|Mengikis kepercayaan|信頼の低下|损害信任', 'Constant changes make buyers suspicious.|Perubahan terus-menerus membuat pembeli curiga.|価格が頻繁に変わると、買い手が疑心暗鬼になる。|频繁变价让买家起疑。'),
      I('eff', 'biz,mfg', 'complex', 2, 'Complex systems|Sistem rumit|システムが複雑|系统复杂', 'You need data, models and constant tuning.|Anda butuh data, model, dan penyetelan terus-menerus.|データ・モデル・継続的な調整が必要になる。|需要数据、模型与持续调优。'),
      I('risk', 'pub,fin', 'law', 2, 'Regulation and backlash|Regulasi dan reaksi publik|規制と炎上リスク|监管与舆论反弹', 'Surge pricing in a crisis can anger the public and officials.|Harga melonjak saat krisis bisa memancing amarah publik dan pejabat.|緊急時の価格急騰は、世論や当局の怒りを買う。|危机中价格飙升会激怒公众与官员。')
    ]),
    C('bundling', 'Bundling|Penjualan paket|バンドル販売|捆绑销售', ['discounting'], [
      I('val', 'retail,food,biz', 'profit', 3, 'Higher basket value|Nilai belanja lebih besar|客単価の向上|客单价提高', 'Buyers take extra items they would not have bought alone.|Pembeli mengambil barang tambahan yang tidak dibeli sendiri.|単品では買わない商品も、一緒に買ってもらえる。|买家会顺带买本来不会单买的东西。'),
      I('mkt', 'retail,biz', 'choice', 2, 'Perceived value|Nilai yang terasa|お得感|感觉更划算', 'A package feels like a better deal.|Paket terasa seperti penawaran lebih baik.|セットは、単品より得に感じられる。|套餐让人觉得更划算。'),
      I('val', 'retail,food', 'waste', 2, 'Moves slow items|Menggerakkan barang lambat|在庫の動きを良くする|带动滞销品', 'Weak products sell alongside strong ones.|Produk lemah terjual bersama produk kuat.|売れ行きの悪い商品が、人気商品と一緒に売れる。|滞销品随热销品一起卖出。'),
      I('cap', 'biz,retail', 'easy', 2, 'Simpler choices|Pilihan lebih sederhana|選びやすさ|选择更简单', 'Customers decide once instead of many times.|Pelanggan memutuskan sekali, bukan berkali-kali.|何度も選ぶ代わりに、1回で決められる。|客户一次决定，不必多次选择。')
    ], [
      I('cost', 'retail,food', 'poor', 3, 'Margin cut|Margin terpotong|利益率の低下|利润被压缩', 'The package discount reduces profit on each item.|Diskon paket mengurangi laba tiap barang.|セット割引で、1点あたりの利益が減る。|套餐折扣降低每件商品的利润。'),
      I('risk', 'retail,biz', 'lose', 2, 'Buyers refuse unwanted items|Pembeli menolak barang yang tidak diinginkan|不要な商品への反発|买家拒绝不想要的搭配', 'People who want only one part may walk away.|Orang yang hanya menginginkan satu bagian bisa pergi.|一部だけ欲しい人は、買わずに去ることがある。|只想要其中一件的人可能走开。'),
      I('risk', 'pub,biz', 'law', 2, 'Competition rules|Aturan persaingan|競争法上の制約|竞争法限制', 'Forced bundling can break competition law.|Paket yang memaksa bisa melanggar hukum persaingan.|抱き合わせ販売の強制は、競争法に触れうる。|强制捆绑可能违反竞争法。'),
      I('eff', 'biz,mfg', 'complex', 2, 'Stock and pricing complexity|Kerumitan stok dan harga|在庫・価格管理の複雑化|库存与定价更复杂', 'Each package needs its own planning and tracking.|Setiap paket butuh perencanaan dan pelacakan sendiri.|セットごとに、計画と管理が必要になる。|每个套餐都需单独规划与跟踪。')
    ]),
    C('freemium', 'Freemium|Freemium|フリーミアム|免费增值', ['subscription'], [
      I('mkt', 'biz,edu', 'reach', 3, 'Huge user base|Basis pengguna besar|膨大な利用者|庞大用户群', 'Free access lets almost anyone try it.|Akses gratis memungkinkan hampir siapa saja mencoba.|無料なら、ほとんど誰でも試せる。|免费让几乎任何人都能试用。'),
      I('mkt', 'biz,retail', 'trust', 2, 'Low barrier to trust|Hambatan kepercayaan rendah|信頼のハードルが低い|信任门槛低', 'People see value before paying.|Orang melihat nilai sebelum membayar.|払う前に、価値を確かめられる。|付费前先看到价值。'),
      I('val', 'biz,retail', 'money', 2, 'Upgrades bring revenue|Peningkatan membawa pendapatan|アップグレード収益|升级带来收入', 'A share of free users become paying customers.|Sebagian pengguna gratis menjadi pelanggan berbayar.|無料ユーザーの一部が、有料顧客に変わる。|一部免费用户转为付费客户。'),
      I('mkt', 'biz,edu', 'word', 2, 'Word of mouth|Promosi dari mulut ke mulut|口コミ|口碑传播', 'Free users recommend the product to others.|Pengguna gratis merekomendasikan produk ke orang lain.|無料ユーザーが、他の人に製品を勧めてくれる。|免费用户向他人推荐产品。')
    ], [
      I('cost', 'biz,edu', 'expensive', 3, 'Free users cost money|Pengguna gratis butuh biaya|無料ユーザーのコスト|免费用户有成本', 'Servers and support serve people who never pay.|Server dan dukungan melayani orang yang tidak pernah membayar.|サーバーやサポートが、払わない人のために使われる。|服务器与客服在为不付费的人花钱。'),
      I('risk', 'biz,retail', 'lose', 3, 'Low conversion|Konversi rendah|有料化率が低い|转化率低', 'Most users stay on the free plan.|Kebanyakan pengguna tetap di paket gratis.|大半の利用者が、無料のままで終わる。|大多数用户停留在免费版。'),
      I('risk', 'biz,retail', 'value', 2, 'Devalues the product|Merendahkan nilai produk|価値が下がって見える|拉低产品价值感', 'People expect everything to be free.|Orang mengharapkan semuanya gratis.|何でも無料のはずだと、期待されてしまう。|人们开始期待一切免费。'),
      I('eff', 'biz,mfg', 'decide', 2, 'Hard to balance|Sulit menyeimbangkan|バランスが難しい|平衡困难', 'Too much free kills sales, too little kills growth.|Terlalu banyak gratis mematikan penjualan, terlalu sedikit mematikan pertumbuhan.|無料にしすぎれば売上が、絞りすぎれば成長が止まる。|免费太多伤收入，太少伤增长。')
    ]),
    C('subscription', 'Subscription model|Model berlangganan|サブスクリプション|订阅模式', ['freemium'], [
      I('val', 'biz,retail,edu', 'money', 3, 'Predictable revenue|Pendapatan terprediksi|安定した収益|收入可预测', 'Regular payments make planning easier.|Pembayaran rutin mempermudah perencanaan.|定期的な支払いで、計画を立てやすい。|定期付款便于规划。'),
      I('mkt', 'retail,biz', 'loyal', 3, 'Long customer relationships|Hubungan pelanggan jangka panjang|長い顧客関係|客户关系长期', 'Customers stay for months or years.|Pelanggan bertahan berbulan-bulan atau bertahun-tahun.|顧客が、何か月も何年も続けて利用する。|客户持续数月甚至数年。'),
      I('cap', 'biz,edu', 'data', 2, 'Learn from usage|Belajar dari pemakaian|利用状況から学べる|从使用中学习', 'Ongoing use shows what customers value.|Pemakaian berkelanjutan menunjukkan apa yang dihargai pelanggan.|継続利用から、顧客が重視する点が見える。|持续使用显示客户看重什么。'),
      I('mkt', 'retail,food', 'easy', 2, 'Convenience|Kemudahan|手軽さ|便利', 'Customers do not reorder each time.|Pelanggan tidak perlu memesan ulang setiap kali.|顧客が、毎回注文し直さなくて済む。|客户无需每次重新下单。')
    ], [
      I('risk', 'biz,retail', 'lose', 3, 'Churn|Pelanggan berhenti|解約|流失', 'Cancelling is one click, so retention is constant work.|Berhenti hanya satu klik, sehingga mempertahankan pelanggan adalah kerja terus-menerus.|解約は1クリックなので、継続してもらう努力が常に要る。|取消只需一键，留住客户要持续努力。'),
      I('cost', 'biz,retail', 'time', 2, 'Slow payback|Balik modal lambat|回収が遅い|回本慢', 'Acquisition costs come first, revenue arrives later.|Biaya akuisisi datang lebih dulu, pendapatan menyusul.|獲得コストが先に出て、収益は後から入る。|获客成本先发生，收入后到。'),
      I('ppl', 'retail,fam', 'anger', 2, 'Subscription fatigue|Jenuh berlangganan|サブスク疲れ|订阅疲劳', 'Customers dislike many small recurring fees.|Pelanggan tidak suka banyak biaya kecil yang berulang.|多くの小さな定期課金に、顧客はうんざりする。|客户讨厌众多小额定期扣费。'),
      I('eff', 'biz,pub', 'effort', 2, 'Must keep delivering|Harus terus memberi nilai|価値を提供し続ける必要|必须持续提供价值', 'Customers pay for ongoing value, not a one-off.|Pelanggan membayar untuk nilai berkelanjutan, bukan sekali saja.|顧客は、1回きりでなく継続的な価値に対して払う。|客户为持续价值付费，而非一次性。')
    ])
  );
})();
