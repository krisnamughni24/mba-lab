/* Word Network: curated concepts, batch 13 (food, farming, energy, tourism and the public sector). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('organic farming', 'Organic farming|Pertanian organik|有機農業|有机农业', ['conventional farming'], [
      I('mkt', 'farm,food,retail', 'premium', 3, 'Premium prices|Harga premium|高価格で売れる|溢价', 'Health-conscious buyers pay more.|Pembeli sadar kesehatan membayar lebih.|健康志向の客は、高く払う。|注重健康的买家愿多付。'),
      I('val', 'farm,pub', 'stay', 3, 'Healthier soil and water|Tanah dan air lebih sehat|土壌と水に優しい|土壤水质更健康', 'No synthetic chemicals.|Tanpa bahan kimia sintetis.|化学合成農薬を使わない。|不用合成化学品。'),
      I('mkt', 'farm,food', 'good', 2, 'Good image|Citra baik|良いイメージ|形象良好', 'Seen as natural and responsible.|Dipandang alami dan bertanggung jawab.|自然で責任ある印象。|被视为自然负责。'),
      I('val', 'farm', 'save', 2, 'Lower input costs|Biaya input lebih rendah|資材費が低い|投入成本低', 'No expensive fertilisers or pesticides.|Tanpa pupuk atau pestisida mahal.|高価な肥料や農薬が要らない。|无需昂贵化肥农药。')
    ], [
      I('val', 'farm', 'poor', 3, 'Lower yields|Hasil panen lebih rendah|収量が少ない|产量较低', 'Less output per hectare.|Hasil per hektare lebih sedikit.|面積あたりの収穫が少ない。|每公顷产量少。'),
      I('eff', 'farm', 'hard', 2, 'More labour|Lebih banyak tenaga kerja|手間がかかる|劳动更多', 'Weeds and pests need manual control.|Gulma dan hama dikendalikan manual.|雑草や害虫を、手で防ぐ必要がある。|杂草害虫需人工防治。'),
      I('eff', 'farm,pub', 'rules', 2, 'Costly certification|Sertifikasi mahal|認証費用|认证成本', 'Audits and paperwork for the label.|Audit dan dokumen untuk label.|認証に、審査と書類が要る。|认证需审核与文书。'),
      I('risk', 'farm', 'danger', 2, 'Crop loss risk|Risiko gagal panen|不作のリスク|歉收风险', 'Pests can wipe out harvests.|Hama bisa menghabiskan panen.|害虫で、収穫が全滅することがある。|虫害可毁收成。')
    ]),
    C('conventional farming', 'Conventional farming|Pertanian konvensional|慣行農業|常规农业', ['organic farming'], [
      I('val', 'farm,food', 'profit', 3, 'High yields|Hasil panen tinggi|高収量|高产', 'Fertiliser and pesticides boost output.|Pupuk dan pestisida meningkatkan hasil.|肥料や農薬で、収量が上がる。|化肥农药提高产量。'),
      I('mkt', 'food,retail', 'cheap', 2, 'Affordable food|Pangan terjangkau|手頃な食料|食品价格可负担', 'Lower prices feed more people.|Harga lebih rendah memberi makan lebih banyak orang.|低価格で、多くの人に行き渡る。|低价惠及更多人。'),
      I('eff', 'farm', 'fast', 2, 'Reliable production|Produksi andal|安定した生産|生产稳定', 'Predictable harvests.|Panen dapat diprediksi.|収穫が見通しやすい。|收成可预测。'),
      I('cap', 'farm', 'know', 2, 'Well-known methods|Metode yang dikenal luas|確立した手法|方法成熟', 'Advice and inputs are widely available.|Saran dan input mudah didapat.|助言も資材も手に入りやすい。|建议与投入品易得。')
    ], [
      I('risk', 'farm,pub', 'waste', 3, 'Environmental damage|Kerusakan lingkungan|環境負荷|环境损害', 'Runoff and soil exhaustion.|Limpasan dan kelelahan tanah.|流出や土壌の疲弊。|径流与土壤退化。'),
      I('risk', 'farm,health', 'danger', 2, 'Chemical residues|Residu kimia|化学物質の残留|化学残留', 'Worries about food safety.|Kekhawatiran tentang keamanan pangan.|食の安全への懸念。|食品安全担忧。'),
      I('cost', 'farm', 'expensive', 2, 'Input dependence|Ketergantungan input|資材への依存|依赖投入品', 'Farmers pay for seeds, fertiliser and sprays.|Petani membayar benih, pupuk, dan semprotan.|種・肥料・農薬を買い続ける必要がある。|农民需购买种子化肥农药。'),
      I('risk', 'farm', 'danger', 2, 'Pest resistance|Resistensi hama|害虫の抵抗性|害虫抗药性', 'Pests adapt and need stronger chemicals.|Hama beradaptasi dan butuh bahan kimia lebih kuat.|害虫が耐性を持ち、より強い薬が要る。|害虫产生抗性需更强药剂。')
    ]),
    C('gmo crops', 'Genetically modified crops|Tanaman rekayasa genetika|遺伝子組み換え作物|转基因作物', ['organic farming'], [
      I('val', 'farm,food', 'profit', 3, 'Higher yields|Hasil lebih tinggi|収量の向上|产量提高', 'Crops resist pests and drought.|Tanaman tahan hama dan kekeringan.|害虫や干ばつに強い。|抗虫抗旱。'),
      I('cap', 'farm,pub', 'safe', 2, 'Food security|Ketahanan pangan|食料安全保障|粮食安全', 'More food from the same land.|Lebih banyak pangan dari lahan yang sama.|同じ土地で、より多く収穫できる。|同样土地产更多粮。'),
      I('val', 'farm', 'save', 2, 'Fewer sprays|Semprotan lebih sedikit|農薬の削減|减少喷药', 'Built-in protection.|Perlindungan bawaan.|耐性が、品種に備わっている。|内置保护。'),
      I('ppl', 'health,farm', 'healthy', 2, 'Nutrition benefits|Manfaat gizi|栄養面の利点|营养益处', 'Crops can be enriched with vitamins.|Tanaman dapat diperkaya vitamin.|ビタミン強化もできる。|可强化维生素。')
    ], [
      I('ppl', 'food,pub', 'fear', 3, 'Public distrust|Ketidakpercayaan publik|消費者の不信|公众不信任', 'Many consumers avoid GM food.|Banyak konsumen menghindari pangan GM.|遺伝子組み換えを避ける人は多い。|许多消费者回避转基因。'),
      I('risk', 'farm,pub', 'depend', 3, 'Seed company dependence|Ketergantungan perusahaan benih|種子会社への依存|依赖种子公司', 'Farmers buy new seeds every season.|Petani membeli benih baru setiap musim.|毎年、種を買う必要がある。|每季购买新种子。'),
      I('risk', 'farm,pub', 'danger', 2, 'Ecological uncertainty|Ketidakpastian ekologis|生態系への不確実性|生态不确定', 'Gene flow to wild relatives.|Perpindahan gen ke kerabat liar.|野生種への遺伝子拡散が懸念される。|基因向野生近缘种扩散。'),
      I('mkt', 'food,farm', 'law', 2, 'Trade restrictions|Pembatasan perdagangan|貿易上の制限|贸易限制', 'Some markets ban GM imports.|Sebagian pasar melarang impor GM.|輸入を禁じる市場がある。|部分市场禁止转基因进口。')
    ]),
    C('contract farming', 'Contract farming|Pertanian kontrak|契約栽培|订单农业', ['independent farming'], [
      I('val', 'farm,food', 'safe', 3, 'Guaranteed buyer and price|Pembeli dan harga terjamin|買い手と価格の保証|买家与价格有保障', 'Income is more predictable.|Pendapatan lebih terprediksi.|収入が、見通しやすい。|收入更可预测。'),
      I('cap', 'farm,food', 'skill', 2, 'Technical support|Dukungan teknis|技術支援|技术支持', 'Buyers supply seed and advice.|Pembeli menyediakan benih dan saran.|買い手が、種や技術を提供する。|买方提供种子与指导。'),
      I('val', 'farm', 'money', 2, 'Access to credit|Akses kredit|資金へのアクセス|获得信贷', 'Contracts help secure loans.|Kontrak membantu mendapatkan pinjaman.|契約が、融資を受けやすくする。|合同便于获得贷款。'),
      I('mkt', 'food,retail', 'steady', 2, 'Consistent supply for buyers|Pasokan konsisten bagi pembeli|買い手に安定供給|买方供应稳定', 'Quality and volume are planned.|Mutu dan volume direncanakan.|品質と量が計画できる。|质量与数量可规划。')
    ], [
      I('risk', 'farm', 'weak', 3, 'Unequal power|Kekuasaan tidak seimbang|力関係の不均衡|权力不对等', 'Buyers dictate terms and prices.|Pembeli mendikte syarat dan harga.|買い手が、条件や価格を決める。|买方主导条款与价格。'),
      I('risk', 'farm', 'depend', 2, 'Dependence on one buyer|Bergantung pada satu pembeli|1社への依存|依赖单一买家', 'Losing the contract is a disaster.|Kehilangan kontrak adalah bencana.|契約を失うと、致命的。|失去合同就是灾难。'),
      I('cost', 'farm', 'money', 2, 'Debt for inputs|Utang untuk input|資材費の借金|投入品债务', 'Costs are deducted from payment.|Biaya dipotong dari pembayaran.|費用が、代金から差し引かれる。|成本从货款中扣除。'),
      I('risk', 'farm', 'cheat', 2, 'Rejection of produce|Penolakan hasil panen|買い取り拒否|拒收农产品', 'Strict quality rules can leave harvests unsold.|Aturan mutu ketat bisa membuat panen tak terjual.|厳しい規格で、収穫が売れ残ることがある。|严格标准可能让收成卖不出。')
    ]),
    C('independent farming', 'Independent farming|Bertani mandiri|独立栽培|自主种植', ['contract farming'], [
      I('cap', 'farm', 'free', 3, 'Freedom of choice|Kebebasan memilih|自由な選択|自主选择', 'Choose crops, timing and buyers.|Pilih tanaman, waktu, dan pembeli.|作物・時期・売り先を選べる。|自选作物、时间与买家。'),
      I('val', 'farm', 'profit', 2, 'Upside when prices rise|Untung saat harga naik|価格上昇の恩恵|涨价时受益', 'You keep the gains.|Anda menikmati keuntungannya.|値上がりの利益を、自分で得る。|涨价收益归你。'),
      I('cap', 'farm', 'flexible', 2, 'Adapt to the market|Menyesuaikan dengan pasar|市場に合わせられる|适应市场', 'Switch crops quickly.|Beralih tanaman dengan cepat.|作物を、すぐ切り替えられる。|可快速换作物。'),
      I('ppl', 'farm,fam', 'proud', 2, 'Independence|Kemandirian|自立|独立自主', 'No boss.|Tanpa atasan.|誰にも縛られない。|无人管束。')
    ], [
      I('risk', 'farm', 'lose', 3, 'Price risk|Risiko harga|価格変動リスク|价格风险', 'Prices can crash at harvest.|Harga bisa anjlok saat panen.|収穫期に、価格が暴落しうる。|收获时价格可能暴跌。'),
      I('mkt', 'farm', 'weak', 2, 'Weak bargaining power|Posisi tawar lemah|交渉力が弱い|议价能力弱', 'Middlemen set the price.|Tengkulak menentukan harga.|仲買人が、価格を決める。|中间商定价。'),
      I('cost', 'farm', 'money', 2, 'Hard to get credit and inputs|Sulit mendapat kredit dan input|資金・資材の確保が困難|难获信贷与投入品', 'Small farmers are overlooked.|Petani kecil terabaikan.|小規模農家は、後回しにされる。|小农被忽视。'),
      I('eff', 'farm', 'skill', 2, 'Know-how gaps|Kesenjangan pengetahuan|知識の不足|技术缺口', 'No expert advice at hand.|Tanpa saran ahli di dekat Anda.|専門家の助言が受けにくい。|缺乏专家指导。')
    ]),
    C('traditional market', 'Traditional market|Pasar tradisional|伝統市場|传统市场', ['supermarket'], [
      I('val', 'retail,food,fam', 'cheap', 3, 'Fresh and cheap|Segar dan murah|新鮮で安い|新鲜便宜', 'Direct from producers, bargaining possible.|Langsung dari produsen, bisa menawar.|生産者から直接で、値切れる。|直接来自生产者，可讨价还价。'),
      I('ppl', 'fam,retail', 'friend', 3, 'Community and relationships|Komunitas dan hubungan|地域のつながり|社区与关系', 'Sellers know their regulars.|Penjual mengenal pelanggan tetap.|売り手が、常連を知っている。|摊主认得熟客。'),
      I('ppl', 'retail,fam', 'job', 2, 'Livelihoods for small traders|Penghidupan bagi pedagang kecil|小規模商人の生計|小商贩生计', 'Thousands depend on them.|Ribuan orang bergantung padanya.|数千人の生活を支える。|数千人赖以为生。'),
      I('mkt', 'food,fam', 'find', 2, 'Local and seasonal produce|Hasil lokal dan musiman|地元・旬の産物|本地时令产品', 'Variety you cannot find elsewhere.|Ragam yang tak ada di tempat lain.|他では見られない品揃え。|别处没有的品种。')
    ], [
      I('ppl', 'retail,fam', 'dirty', 3, 'Hygiene and comfort|Kebersihan dan kenyamanan|衛生と快適さ|卫生与舒适', 'Hot, crowded and sometimes dirty.|Panas, padat, dan kadang kotor.|暑く、混雑し、不衛生なことも。|闷热拥挤，有时脏乱。'),
      I('eff', 'retail,fam', 'time', 2, 'Inconvenient hours|Jam tidak praktis|不便な営業時間|营业时间不便', 'Best produce sells out early.|Barang terbaik habis lebih awal.|良い品は、早く売り切れる。|好货早早售罄。'),
      I('risk', 'retail,food', 'cheat', 2, 'Inconsistent prices and weights|Harga dan timbangan tidak konsisten|価格・計量のばらつき|价格与秤量不一', 'Cheating happens.|Kecurangan terjadi.|不正が起きることもある。|可能存在欺诈。'),
      I('mkt', 'retail', 'weak', 2, 'Losing to modern retail|Kalah dari ritel modern|近代的小売に押される|输给现代零售', 'Customers shift to supermarkets and apps.|Pelanggan beralih ke supermarket dan aplikasi.|客が、スーパーやアプリに流れる。|客户转向超市与应用。')
    ]),
    C('supermarket', 'Supermarket|Supermarket|スーパーマーケット|超市', ['traditional market'], [
      I('ppl', 'retail,fam', 'comfort', 3, 'Clean, comfortable and convenient|Bersih, nyaman, dan praktis|清潔・快適・便利|干净舒适方便', 'Air-conditioned, one stop.|Berpendingin, satu tempat.|空調完備のワンストップ。|空调、一站购齐。'),
      I('val', 'retail,food', 'steady', 2, 'Fixed prices and standards|Harga tetap dan standar|定価と品質基準|定价与标准固定', 'No bargaining, labelled quality.|Tanpa menawar, mutu berlabel.|値切り不要で、品質表示がある。|无需议价，标示质量。'),
      I('eff', 'retail,fam', 'easy', 2, 'Long opening hours|Jam buka panjang|長い営業時間|营业时间长', 'Shop when it suits you.|Belanja kapan saja yang cocok.|都合の良い時間に買える。|随时购物。'),
      I('mkt', 'retail,food', 'choice', 2, 'Wide product range|Pilihan produk luas|豊富な品揃え|品类丰富', 'Local and imported goods.|Barang lokal dan impor.|国産も輸入品も揃う。|本地与进口商品齐全。')
    ], [
      I('mkt', 'retail,fam', 'expensive', 3, 'Higher prices|Harga lebih tinggi|価格が高め|价格较高', 'Rent and overheads are passed on.|Sewa dan biaya operasional diteruskan.|家賃や経費が、価格に乗る。|房租与管理费转嫁。'),
      I('ppl', 'retail,fam', 'distance', 2, 'Impersonal|Kurang personal|人間味が薄い|缺乏人情味', 'Staff and shoppers are strangers.|Staf dan pembeli saling asing.|店員も客も、他人同士。|员工与顾客彼此陌生。'),
      I('risk', 'retail,farm', 'power', 2, 'Squeezes suppliers|Menekan pemasok|仕入先への圧力|压榨供应商', 'Chains demand low prices and delays.|Jaringan ritel menuntut harga rendah dan tempo pembayaran panjang.|大手が、低価格と支払い猶予を求める。|连锁要求低价与账期。'),
      I('risk', 'retail,pub', 'cheat', 2, 'Hurts small traders|Merugikan pedagang kecil|小規模商人への打撃|冲击小商贩', 'Local shops close.|Toko lokal tutup.|地元の店が、閉店に追い込まれる。|本地小店关门。')
    ]),
    C('street vending', 'Street vending|Pedagang kaki lima|屋台・路上販売|街头摊贩', ['physical store'], [
      I('val', 'food,retail,fam', 'cheap', 3, 'Low startup cost|Modal awal rendah|開業コストが低い|创业成本低', 'A cart or mat is enough.|Gerobak atau lapak sudah cukup.|屋台やござがあれば始められる。|一辆推车即可开张。'),
      I('mkt', 'food,retail', 'reach', 2, 'Where customers walk|Di tempat pelanggan lewat|人通りのある場所で|在客流处', 'Go to the crowd.|Pergi ke tempat keramaian.|人の集まる場所に出向ける。|去人流所在。'),
      I('mkt', 'food,fam', 'cheap', 2, 'Affordable for customers|Terjangkau bagi pelanggan|客にも手頃|顾客负担得起', 'Low prices for workers and students.|Harga rendah bagi pekerja dan pelajar.|働く人や学生にも安い。|工人学生买得起。'),
      I('cap', 'food,retail', 'flexible', 2, 'Flexible hours and location|Jam dan lokasi fleksibel|時間と場所が自由|时间地点灵活', 'Move to where demand is.|Pindah ke tempat permintaan.|需要のある場所に動ける。|随需求移动。')
    ], [
      I('risk', 'food,pub', 'law', 3, 'Evictions and fines|Penggusuran dan denda|立ち退きと罰金|驱赶与罚款', 'Authorities may clear the street.|Petugas dapat menertibkan jalan.|当局に、排除されることがある。|当局可能清场。'),
      I('risk', 'food,retail', 'danger', 2, 'Weather and income swings|Cuaca dan fluktuasi pendapatan|天候と収入の波|天气与收入波动', 'Rain means no sales.|Hujan berarti tidak ada penjualan.|雨が降ると、売れない。|下雨就没生意。'),
      I('ppl', 'food,fam', 'tired', 2, 'Long, hard hours|Jam kerja panjang dan berat|長時間の重労働|长时辛苦工作', 'Early starts, late finishes.|Mulai pagi, selesai malam.|早朝から夜遅くまで働く。|早出晚归。'),
      I('risk', 'food,health', 'dirty', 2, 'Hygiene concerns|Kekhawatiran kebersihan|衛生上の懸念|卫生担忧', 'Limited washing and storage.|Terbatasnya air bersih dan penyimpanan.|洗浄や保管の設備が乏しい。|清洗与存储设施有限。')
    ]),
    C('fast food chain', 'Fast-food chain|Jaringan makanan cepat saji|ファストフードチェーン|快餐连锁', ['local restaurant'], [
      I('eff', 'food,retail', 'fast', 3, 'Speed and consistency|Cepat dan konsisten|速さと均一性|快速且一致', 'Same taste everywhere, in minutes.|Rasa sama di mana-mana, dalam hitungan menit.|どこでも同じ味が、すぐ出てくる。|各地同味，几分钟上桌。'),
      I('val', 'food,fam', 'cheap', 2, 'Affordable|Terjangkau|手頃な価格|价格实惠', 'Value meals for families.|Paket hemat untuk keluarga.|家族向けのお得なセット。|家庭实惠套餐。'),
      I('cap', 'food,retail', 'scale', 2, 'Scale and systems|Skala dan sistem|規模と仕組み|规模与体系', 'Proven processes copy easily.|Proses teruji mudah ditiru.|実績ある仕組みを、横展開できる。|成熟流程易复制。'),
      I('mkt', 'food,retail', 'name', 2, 'Strong brand|Merek kuat|強いブランド|强势品牌', 'Trusted and recognised.|Dipercaya dan dikenal.|信頼され、よく知られている。|受信任且知名。')
    ], [
      I('ppl', 'food,health', 'healthy', 3, 'Health concerns|Kekhawatiran kesehatan|健康への懸念|健康担忧', 'High salt, sugar and fat.|Garam, gula, dan lemak tinggi.|塩分・糖分・脂質が多い。|高盐高糖高脂。'),
      I('risk', 'food,farm', 'waste', 2, 'Packaging waste|Limbah kemasan|包装ごみ|包装垃圾', 'Single-use boxes and cups.|Kotak dan gelas sekali pakai.|使い捨て容器が大量に出る。|一次性盒杯多。'),
      I('ppl', 'food,fam', 'poor', 2, 'Low wages|Gaji rendah|低賃金|低工资', 'Staff are often poorly paid.|Staf sering dibayar rendah.|従業員の賃金が低いことが多い。|员工薪资常偏低。'),
      I('mkt', 'food,retail', 'dilute', 2, 'Homogenises local food|Menyeragamkan makanan lokal|地元の食文化の画一化|使本地饮食同质化', 'Local dishes lose ground.|Hidangan lokal kehilangan tempat.|地元の料理が押される。|本地菜肴失势。')
    ]),
    C('local restaurant', 'Local independent restaurant|Restoran lokal mandiri|地元の個人店|本地独立餐厅', ['fast food chain'], [
      I('mkt', 'food', 'story', 3, 'Unique character|Karakter unik|独自の個性|独特个性', 'Distinct recipes and atmosphere.|Resep dan suasana yang khas.|独自のレシピと雰囲気。|独特食谱与氛围。'),
      I('ppl', 'food,fam', 'friend', 2, 'Personal service|Layanan personal|丁寧な接客|个性化服务', 'The owner greets guests by name.|Pemilik menyapa tamu dengan nama.|オーナーが、名前で迎えてくれる。|老板能叫出客人名字。'),
      I('cap', 'food,farm', 'local', 2, 'Local ingredients|Bahan lokal|地元の食材|本地食材', 'Supports nearby farmers.|Mendukung petani sekitar.|近隣の農家を支える。|支持周边农户。'),
      I('cap', 'food', 'flexible', 2, 'Menu freedom|Kebebasan menu|メニューの自由|菜单自由', 'Change dishes with the season.|Ganti menu sesuai musim.|季節で、料理を変えられる。|随季节换菜。')
    ], [
      I('risk', 'food', 'fail', 3, 'High failure rate|Tingkat kegagalan tinggi|廃業率が高い|失败率高', 'Thin margins and heavy competition.|Margin tipis dan persaingan berat.|利益が薄く、競争も激しい。|利润薄竞争大。'),
      I('mkt', 'food', 'weak', 2, 'Little marketing power|Daya pemasaran kecil|宣伝力が弱い|营销能力弱', 'Hard to be found.|Sulit ditemukan.|知ってもらいにくい。|难被发现。'),
      I('ppl', 'food', 'tired', 2, 'Owner exhaustion|Pemilik kelelahan|オーナーの疲弊|老板疲惫', 'Long hours and no days off.|Jam panjang dan tanpa libur.|長時間労働で、休みがない。|工时长且无休。'),
      I('eff', 'food', 'steady', 2, 'Inconsistent quality|Mutu tidak konsisten|品質にムラ|质量不稳定', 'Depends on one chef.|Bergantung pada satu koki.|1人の料理人次第。|取决于一位厨师。')
    ]),
    C('plant based food', 'Plant-based food|Makanan nabati|植物性食品|植物性食品', ['meat products'], [
      I('ppl', 'food,health,fam', 'healthy', 3, 'Health benefits|Manfaat kesehatan|健康面の利点|健康益处', 'Less saturated fat and more fibre.|Lebih sedikit lemak jenuh dan lebih banyak serat.|飽和脂肪酸が少なく、食物繊維が多い。|少饱和脂肪多纤维。'),
      I('val', 'farm,pub', 'stay', 3, 'Lower environmental impact|Dampak lingkungan lebih rendah|環境負荷が低い|环境影响低', 'Less land, water and emissions.|Lebih sedikit lahan, air, dan emisi.|土地・水・排出が少ない。|土地、水与排放更少。'),
      I('mkt', 'food,retail', 'new', 2, 'Growing market|Pasar berkembang|成長市場|增长市场', 'Younger consumers are interested.|Konsumen muda tertarik.|若い世代が関心を持つ。|年轻人感兴趣。'),
      I('ppl', 'food,pub', 'good', 2, 'Animal welfare|Kesejahteraan hewan|動物福祉|动物福利', 'Fewer animals raised for food.|Lebih sedikit hewan dibudidayakan untuk pangan.|食用に育てる動物が減る。|减少养殖动物。')
    ], [
      I('mkt', 'food,fam', 'expensive', 3, 'Often pricey|Sering mahal|割高なことが多い|常偏贵', 'Premium products cost more.|Produk premium lebih mahal.|高級品は、価格が高い。|高端产品更贵。'),
      I('ppl', 'food', 'taste', 2, 'Taste and texture|Rasa dan tekstur|味と食感|口味与口感', 'Many people prefer meat.|Banyak orang lebih suka daging.|肉のほうが好きな人も多い。|很多人更爱肉。'),
      I('risk', 'food,health', 'factory', 2, 'Highly processed|Sangat terolah|加工度が高い|高度加工', 'Some products are not healthy.|Sebagian produk tidak sehat.|健康的とは言えない製品もある。|有些产品并不健康。'),
      I('risk', 'farm,food', 'job', 2, 'Hurts livestock farmers|Merugikan peternak|畜産農家への打撃|冲击畜牧户', 'Traditional livelihoods are threatened.|Mata pencaharian tradisional terancam.|従来の生業が脅かされる。|传统生计受威胁。')
    ]),
    C('meat products', 'Meat and dairy production|Produksi daging dan susu|肉・乳製品の生産|肉奶生产', ['plant based food'], [
      I('ppl', 'farm,food,fam', 'job', 3, 'Livelihoods|Mata pencaharian|生計|生计', 'Millions of farmers depend on livestock.|Jutaan petani bergantung pada ternak.|数百万の農家が、畜産に頼る。|数百万农户依赖畜牧。'),
      I('ppl', 'health,fam,food', 'strong', 2, 'Protein and nutrition|Protein dan gizi|タンパク質と栄養|蛋白质与营养', 'Dense nutrients, especially for children.|Gizi padat, terutama untuk anak.|栄養が豊富で、特に子どもに良い。|营养密集，对儿童尤佳。'),
      I('mkt', 'food,retail', 'market', 2, 'Large established market|Pasar besar dan mapan|巨大で確立した市場|庞大成熟市场', 'Demand is strong.|Permintaan kuat.|需要が大きい。|需求旺盛。'),
      I('val', 'farm,pub', 'long', 2, 'Cultural importance|Kepentingan budaya|文化的な重要性|文化重要性', 'Tied to traditions and festivals.|Terkait tradisi dan perayaan.|伝統や祭りと結びついている。|与传统节庆相连。')
    ], [
      I('risk', 'farm,pub', 'waste', 3, 'Environmental footprint|Jejak lingkungan|環境への負荷|环境足迹', 'Land, water and methane emissions.|Lahan, air, dan emisi metana.|土地・水・メタン排出。|土地、水与甲烷排放。'),
      I('ppl', 'food,health', 'healthy', 2, 'Health risks if excessive|Risiko kesehatan jika berlebihan|過剰摂取の健康リスク|过量有健康风险', 'Linked to heart disease.|Terkait penyakit jantung.|心臓病との関連が指摘される。|与心脏病相关。'),
      I('ppl', 'farm,food', 'sad', 2, 'Animal welfare|Kesejahteraan hewan|動物福祉|动物福利', 'Intensive farming raises ethical concerns.|Peternakan intensif menimbulkan masalah etika.|集約的な飼育は、倫理的な問題を生む。|集约养殖引发伦理问题。'),
      I('risk', 'farm,health', 'danger', 2, 'Disease outbreaks|Wabah penyakit|疫病の発生|疫病爆发', 'Livestock diseases spread fast.|Penyakit ternak menyebar cepat.|家畜の病気は、急速に広がる。|畜病传播迅速。')
    ]),
    C('cloud kitchen', 'Cloud kitchen|Dapur awan (cloud kitchen)|クラウドキッチン|云厨房', ['local restaurant'], [
      I('val', 'food', 'cheap', 3, 'Low overheads|Biaya tetap rendah|固定費が低い|固定成本低', 'No prime location or dining room.|Tanpa lokasi mahal atau ruang makan.|一等地も客席も要らない。|无需黄金地段与堂食。'),
      I('mkt', 'food', 'reach', 2, 'Many brands from one kitchen|Banyak merek dari satu dapur|1つの厨房で複数ブランド|一厨房多品牌', 'Test concepts quickly.|Menguji konsep dengan cepat.|コンセプトを素早く試せる。|快速测试概念。'),
      I('cap', 'food', 'data', 2, 'Data-driven menu|Menu berbasis data|データに基づくメニュー|数据驱动菜单', 'Orders show what sells.|Pesanan menunjukkan apa yang laku.|注文データで、売れ筋が分かる。|订单显示畅销品。'),
      I('eff', 'food', 'easy', 2, 'Easy to scale|Mudah diperluas|拡大しやすい|易扩张', 'Add kitchens near demand.|Tambah dapur di dekat permintaan.|需要の近くに、厨房を増やせる。|在需求附近加开。')
    ], [
      I('risk', 'food', 'depend', 3, 'Platform dependence|Ketergantungan platform|プラットフォーム依存|依赖平台', 'Delivery apps control customers and fees.|Aplikasi pengantaran mengendalikan pelanggan dan biaya.|配達アプリが、顧客と手数料を握る。|外卖平台掌控客户与费率。'),
      I('mkt', 'food', 'name', 2, 'Weak brand and loyalty|Merek dan loyalitas lemah|ブランドと愛着が弱い|品牌与忠诚弱', 'Customers see only an app listing.|Pelanggan hanya melihat daftar di aplikasi.|客から見ると、アプリ上の一覧にすぎない。|客户只见应用列表。'),
      I('cost', 'food', 'expensive', 2, 'High commissions|Komisi tinggi|高い手数料|佣金高', 'Platforms take a large cut.|Platform mengambil potongan besar.|プラットフォームが、大きな取り分を取る。|平台抽成高。'),
      I('ppl', 'food,health', 'trust', 2, 'Hygiene doubts|Keraguan kebersihan|衛生への不信|卫生疑虑', 'Customers cannot see the kitchen.|Pelanggan tidak bisa melihat dapur.|厨房が見えず、不安を持たれる。|客户看不到厨房。')
    ]),
    C('mass tourism', 'Mass tourism|Pariwisata massal|マスツーリズム|大众旅游', ['ecotourism'], [
      I('val', 'retail,food,pub', 'money', 3, 'Big revenue|Pendapatan besar|大きな収入|收入巨大', 'Hotels, shops and transport all earn.|Hotel, toko, dan transportasi sama-sama untung.|ホテルも店も交通も、潤う。|酒店商店交通皆获利。'),
      I('ppl', 'retail,food,fam', 'job', 3, 'Many jobs|Banyak lapangan kerja|多くの雇用|大量就业', 'Work for guides, drivers and cooks.|Pekerjaan untuk pemandu, sopir, dan juru masak.|ガイド・運転手・料理人の仕事が生まれる。|导游、司机与厨师有工作。'),
      I('mkt', 'pub,retail', 'name', 2, 'Raises the destination\'s profile|Mengangkat profil destinasi|知名度の向上|提升目的地知名度', 'More visitors, more publicity.|Lebih banyak pengunjung, lebih banyak publisitas.|訪問者が増え、評判も広がる。|游客多则宣传多。'),
      I('cap', 'pub,retail', 'build', 2, 'Funds infrastructure|Membiayai infrastruktur|インフラ整備の資金|资助基础设施', 'Airports and roads improve.|Bandara dan jalan membaik.|空港や道路が整う。|机场与道路改善。')
    ], [
      I('risk', 'pub,farm', 'waste', 3, 'Environmental damage|Kerusakan lingkungan|環境破壊|环境破坏', 'Waste, crowding and wear on nature.|Sampah, keramaian, dan kerusakan alam.|ごみや混雑が、自然を傷める。|垃圾拥挤损害自然。'),
      I('ppl', 'pub,fam', 'conflict', 2, 'Overcrowding and resentment|Kepadatan dan kekesalan|オーバーツーリズムへの反感|拥挤与居民不满', 'Locals feel pushed out.|Warga merasa terdesak.|地元住民が、押し出される。|居民觉得被挤走。'),
      I('mkt', 'pub,retail', 'cheap', 2, 'Low-value, seasonal income|Pendapatan rendah dan musiman|低単価で季節変動|低价值且季节性', 'Packages squeeze local earnings.|Paket wisata menekan pendapatan lokal.|パック旅行が、現地の収入を圧迫する。|旅行套餐压缩本地收入。'),
      I('risk', 'pub,retail', 'depend', 2, 'Vulnerable to shocks|Rentan terhadap guncangan|ショックに弱い|易受冲击', 'Pandemics and disasters empty hotels.|Pandemi dan bencana mengosongkan hotel.|疫病や災害で、客足が途絶える。|疫情与灾害使酒店空置。')
    ]),
    C('ecotourism', 'Ecotourism|Ekowisata|エコツーリズム|生态旅游', ['mass tourism'], [
      I('val', 'pub,farm', 'stay', 3, 'Protects nature|Melindungi alam|自然の保護|保护自然', 'Income motivates conservation.|Pendapatan memotivasi pelestarian.|収入が、保全の動機になる。|收入激励保护。'),
      I('ppl', 'pub,fam,farm', 'help', 3, 'Benefits local communities|Menguntungkan komunitas lokal|地域に利益|惠及本地社区', 'Guides, homestays and crafts.|Pemandu, homestay, dan kerajinan.|ガイド・民宿・工芸品。|导游、民宿与手工艺。'),
      I('mkt', 'retail,pub', 'premium', 2, 'Higher spending visitors|Pengunjung berbelanja lebih besar|滞在単価が高い|游客消费更高', 'Fewer but higher-value tourists.|Lebih sedikit tetapi lebih bernilai.|数は少なくても、単価が高い。|游客少但价值高。'),
      I('cap', 'edu,pub', 'teach', 2, 'Education|Edukasi|学びの機会|教育意义', 'Visitors learn about ecology and culture.|Pengunjung belajar ekologi dan budaya.|訪問者が、自然や文化を学ぶ。|游客学习生态与文化。')
    ], [
      I('mkt', 'pub,retail', 'limit', 3, 'Limited scale and income|Skala dan pendapatan terbatas|規模・収入が限られる|规模与收入有限', 'Caps on visitors limit earnings.|Batas pengunjung membatasi pendapatan.|入場制限で、収入も限られる。|游客上限限制收入。'),
      I('cost', 'pub,retail', 'expensive', 2, 'High cost per visitor|Biaya per pengunjung tinggi|1人あたりのコスト高|单客成本高', 'Small groups and guides cost more.|Kelompok kecil dan pemandu lebih mahal.|少人数とガイドで、費用がかさむ。|小团与导游成本高。'),
      I('risk', 'pub,retail', 'lie', 2, 'Greenwashing|Greenwashing|グリーンウォッシュ|漂绿', 'Some "eco" labels are marketing only.|Sebagian label "eko" hanya pemasaran.|名ばかりのエコもある。|部分“生态”只是营销。'),
      I('risk', 'pub,farm', 'danger', 2, 'Still disturbs nature|Tetap mengganggu alam|それでも自然を乱す|仍干扰自然', 'Even small groups leave traces.|Kelompok kecil pun meninggalkan jejak.|少人数でも、足跡は残る。|小团也会留下痕迹。')
    ]),
    C('mining', 'Mining and extraction|Pertambangan|鉱業・資源採掘|采矿业', ['renewable energy'], [
      I('val', 'pub,mfg,fin', 'money', 3, 'Export earnings and revenue|Pendapatan ekspor dan negara|輸出収入と税収|出口与财政收入', 'Minerals bring foreign currency and taxes.|Mineral mendatangkan devisa dan pajak.|鉱物が、外貨と税収をもたらす。|矿产带来外汇与税收。'),
      I('ppl', 'pub,mfg,fam', 'job', 3, 'Jobs and infrastructure|Lapangan kerja dan infrastruktur|雇用とインフラ|就业与基础设施', 'Remote regions gain roads and work.|Daerah terpencil mendapat jalan dan pekerjaan.|僻地に、道路と仕事が生まれる。|偏远地区得路得工作。'),
      I('cap', 'mfg,pub', 'build', 2, 'Raw materials for industry|Bahan baku industri|産業の原料|工业原料', 'Feeds factories and technology.|Memasok pabrik dan teknologi.|工場や技術を支える。|供应工厂与技术。'),
      I('val', 'pub,mfg', 'power', 2, 'Strategic resource|Sumber daya strategis|戦略資源|战略资源', 'Bargaining power in trade.|Daya tawar dalam perdagangan.|貿易交渉の武器になる。|贸易中的筹码。')
    ], [
      I('risk', 'pub,farm', 'waste', 3, 'Environmental destruction|Kerusakan lingkungan|環境破壊|环境破坏', 'Forests, rivers and soil are damaged.|Hutan, sungai, dan tanah rusak.|森林・河川・土壌が傷つく。|森林河流土壤受损。'),
      I('risk', 'pub,fam', 'danger', 2, 'Safety and health risks|Risiko keselamatan dan kesehatan|安全・健康リスク|安全与健康风险', 'Accidents and pollution.|Kecelakaan dan polusi.|事故や汚染。|事故与污染。'),
      I('risk', 'pub,mfg', 'depend', 2, 'Resource curse|Kutukan sumber daya|資源の呪い|资源诅咒', 'Over-dependence on one commodity.|Terlalu bergantung pada satu komoditas.|1つの資源に依存しすぎる。|过度依赖单一商品。'),
      I('ppl', 'pub,fam', 'conflict', 2, 'Land and community conflict|Konflik lahan dan komunitas|土地・地域をめぐる対立|土地与社区冲突', 'Locals lose land and livelihoods.|Warga kehilangan lahan dan penghidupan.|地元住民が、土地と生業を失う。|居民失去土地与生计。')
    ]),
    C('renewable energy', 'Renewable energy|Energi terbarukan|再生可能エネルギー|可再生能源', ['mining'], [
      I('val', 'pub,mfg,farm', 'stay', 3, 'Clean and sustainable|Bersih dan berkelanjutan|クリーンで持続可能|清洁可持续', 'Low emissions, no fuel to run out.|Emisi rendah, tidak ada bahan bakar yang habis.|排出が少なく、燃料も尽きない。|低排放，燃料不枯竭。'),
      I('val', 'pub,mfg', 'cheap', 2, 'Falling costs|Biaya menurun|コストの低下|成本下降', 'Solar and wind keep getting cheaper.|Surya dan angin terus lebih murah.|太陽光や風力は、年々安くなる。|太阳能风能越来越便宜。'),
      I('cap', 'pub,mfg', 'safe', 2, 'Energy independence|Kemandirian energi|エネルギー自給|能源独立', 'Less reliance on imported fuel.|Kurang bergantung pada bahan bakar impor.|輸入燃料への依存が減る。|减少对进口燃料的依赖。'),
      I('ppl', 'farm,pub', 'job', 2, 'New jobs|Pekerjaan baru|新しい雇用|新就业', 'Installation and maintenance.|Pemasangan dan perawatan.|設置・保守の仕事が生まれる。|安装与维护岗位。')
    ], [
      I('risk', 'pub,mfg', 'stop', 3, 'Intermittent supply|Pasokan tidak stabil|発電が不安定|供应间歇', 'No sun or wind, no power.|Tanpa matahari atau angin, tanpa listrik.|日が陰り風が止むと、発電できない。|无日无风则无电。'),
      I('cost', 'pub,mfg', 'expensive', 3, 'High upfront cost|Biaya awal tinggi|初期投資が大きい|前期投入大', 'Panels, turbines and grids.|Panel, turbin, dan jaringan.|パネル・風車・送電網。|面板、风机与电网。'),
      I('eff', 'pub,mfg', 'hard', 2, 'Grid and storage challenges|Tantangan jaringan dan penyimpanan|系統・蓄電の課題|电网与储能挑战', 'Batteries are costly.|Baterai mahal.|蓄電池は高価。|电池昂贵。'),
      I('risk', 'pub,farm', 'waste', 2, 'Land use and materials|Pemakaian lahan dan bahan|土地利用と資材|占地与材料', 'Big installations need space and minerals.|Instalasi besar butuh lahan dan mineral.|大規模設備には、土地と鉱物が要る。|大型设施需要土地与矿物。')
    ]),
    C('electric vehicles', 'Electric vehicles|Kendaraan listrik|電気自動車|电动车', ['private car'], [
      I('val', 'fam,pub', 'save', 3, 'Cheaper to run|Lebih murah dioperasikan|ランニングコストが安い|使用成本低', 'Electricity costs less than fuel.|Listrik lebih murah daripada BBM.|電気は、燃料より安い。|电比油便宜。'),
      I('val', 'pub,fam', 'stay', 3, 'Lower emissions|Emisi lebih rendah|排出が少ない|排放更少', 'No tailpipe pollution.|Tanpa polusi knalpot.|排気ガスが出ない。|无尾气污染。'),
      I('ppl', 'fam', 'comfort', 2, 'Quiet and smooth|Senyap dan halus|静かでなめらか|安静平顺', 'Pleasant to drive.|Menyenangkan dikendarai.|運転が快適。|驾驶愉悦。'),
      I('val', 'pub,mfg', 'help', 2, 'Incentives|Insentif|補助・優遇|激励政策', 'Tax breaks and subsidies.|Keringanan pajak dan subsidi.|税優遇や補助金。|税收减免与补贴。')
    ], [
      I('cost', 'fam,retail', 'expensive', 3, 'High purchase price|Harga beli tinggi|購入価格が高い|购买价高', 'Batteries are costly.|Baterai mahal.|電池が高額。|电池贵。'),
      I('eff', 'fam,pub', 'wait', 3, 'Charging time and stations|Waktu dan stasiun pengisian|充電時間と設備|充电时间与设施', 'Few chargers outside cities.|Sedikit pengisi daya di luar kota.|都市部以外は、充電設備が少ない。|城外充电桩少。'),
      I('risk', 'fam', 'limit', 2, 'Range anxiety|Kekhawatiran jarak tempuh|航続距離の不安|里程焦虑', 'Fear of running out far from a charger.|Takut kehabisan daya jauh dari pengisi.|充電できない場所で止まる不安。|担心远离充电桩没电。'),
      I('risk', 'pub,mfg', 'waste', 2, 'Battery production and disposal|Produksi dan pembuangan baterai|電池の製造と廃棄|电池生产与处置', 'Mining and recycling issues.|Masalah penambangan dan daur ulang.|採掘とリサイクルの課題。|开采与回收问题。')
    ]),
    C('privatization', 'Privatisation|Privatisasi|民営化|私有化', ['nationalization'], [
      I('eff', 'pub,biz', 'efficient', 3, 'Efficiency|Efisiensi|効率化|效率提升', 'Profit motive cuts waste.|Motif laba mengurangi pemborosan.|利益追求が、ムダを減らす。|逐利动机减少浪费。'),
      I('val', 'pub,fin', 'money', 2, 'Raises government funds|Menambah dana pemerintah|政府の資金調達|增加政府资金', 'Sales bring cash and cut losses.|Penjualan mendatangkan kas dan mengurangi kerugian.|売却益が入り、赤字も減る。|出售获现金并减少亏损。'),
      I('cap', 'biz,pub', 'new', 2, 'Investment and innovation|Investasi dan inovasi|投資と革新|投资与创新', 'Private capital funds upgrades.|Modal swasta membiayai peningkatan.|民間資本が、設備更新を支える。|私人资本支持升级。'),
      I('mkt', 'retail,pub', 'customer', 2, 'Better service|Layanan lebih baik|サービス向上|服务更好', 'Competition rewards customer focus.|Persaingan menghargai fokus pelanggan.|競争が、顧客志向を促す。|竞争奖励客户导向。')
    ], [
      I('ppl', 'pub,fam', 'poor', 3, 'Higher prices for the poor|Harga lebih tinggi bagi yang miskin|低所得層の負担増|穷人负担加重', 'Essential services become costly.|Layanan penting menjadi mahal.|必要なサービスが、高くなる。|基本服务变贵。'),
      I('ppl', 'pub,biz', 'job', 2, 'Job losses|Hilangnya pekerjaan|雇用の喪失|失业', 'New owners cut staff.|Pemilik baru memangkas staf.|新しい経営者が、人員を削減する。|新主人裁员。'),
      I('risk', 'pub,fin', 'cheat', 2, 'Sold too cheaply|Dijual terlalu murah|安売りの危険|贱卖风险', 'Public assets go to insiders.|Aset publik jatuh ke orang dalam.|公共資産が、関係者に渡る。|公共资产落入内部人之手。'),
      I('risk', 'pub,biz', 'power', 2, 'Private monopolies|Monopoli swasta|民間独占|私人垄断', 'Without competition, quality falls.|Tanpa persaingan, mutu menurun.|競争がなければ、質が下がる。|无竞争则质量下降。')
    ]),
    C('nationalization', 'State ownership|Kepemilikan negara|国有化・国営|国有化', ['privatization'], [
      I('cap', 'pub,biz', 'control', 3, 'Public control of strategic assets|Kendali publik atas aset strategis|戦略資産の公的管理|公共掌控战略资产', 'Energy, water and transport serve the nation.|Energi, air, dan transportasi melayani bangsa.|エネルギー・水・交通を、国のために使う。|能源、水与交通服务国家。'),
      I('ppl', 'pub,fam', 'fair', 2, 'Affordable essentials|Kebutuhan pokok terjangkau|必需サービスを手頃に|基本服务可负担', 'Prices set for public benefit.|Harga ditetapkan untuk kepentingan publik.|価格を、公益のために決められる。|定价服务公共利益。'),
      I('ppl', 'pub,biz', 'safe', 2, 'Job security|Keamanan kerja|雇用の安定|就业稳定', 'Stable employment.|Pekerjaan stabil.|安定した雇用。|工作稳定。'),
      I('val', 'pub', 'long', 2, 'Long-term projects|Proyek jangka panjang|長期プロジェクト|长期项目', 'Not driven by quarterly profit.|Tidak digerakkan laba kuartalan.|四半期の利益に左右されない。|不受季度利润驱动。')
    ], [
      I('eff', 'pub,biz', 'lazy', 3, 'Inefficiency|Inefisiensi|非効率|低效', 'No competition or profit pressure.|Tanpa persaingan atau tekanan laba.|競争も利益圧力もない。|缺乏竞争与盈利压力。'),
      I('cost', 'pub,fin', 'expensive', 2, 'Burden on taxpayers|Beban bagi pembayar pajak|納税者の負担|纳税人负担', 'Losses are covered by public money.|Kerugian ditutup uang publik.|赤字を、税金で補う。|亏损由公款填补。'),
      I('risk', 'pub,biz', 'power', 2, 'Political interference|Campur tangan politik|政治介入|政治干预', 'Appointments follow politics, not skill.|Penunjukan mengikuti politik, bukan keahlian.|人事が、能力でなく政治で決まる。|任命看政治而非能力。'),
      I('risk', 'pub,biz', 'cheat', 2, 'Corruption risk|Risiko korupsi|汚職のリスク|腐败风险', 'Weak oversight invites abuse.|Pengawasan lemah mengundang penyalahgunaan.|監督が弱いと、不正が起きる。|监督薄弱易滋生腐败。')
    ]),
    C('public private partnership', 'Public-private partnership|Kemitraan pemerintah dan swasta|官民連携（PPP）|公私合作（PPP）', ['privatization'], [
      I('cap', 'pub,biz,mfg', 'share', 3, 'Shared risk and funding|Risiko dan dana dibagi|リスクと資金の分担|共担风险与资金', 'Big projects become possible.|Proyek besar menjadi mungkin.|大規模事業が可能になる。|大型项目成为可能。'),
      I('eff', 'pub,biz', 'skill', 2, 'Private skills and speed|Keahlian dan kecepatan swasta|民間の技術と速さ|私营技能与速度', 'Build and run efficiently.|Membangun dan mengelola dengan efisien.|効率よく建設・運営できる。|高效建设与运营。'),
      I('val', 'pub', 'money', 2, 'Less upfront public spending|Belanja publik awal lebih kecil|公的な初期負担が小さい|减少政府前期支出', 'Private partners fund construction.|Mitra swasta membiayai konstruksi.|民間が、建設費を負担する。|私人伙伴出资建设。'),
      I('mkt', 'pub,retail', 'reach', 2, 'Public benefit|Manfaat publik|公共の利益|公共利益', 'Roads, hospitals and schools.|Jalan, rumah sakit, dan sekolah.|道路・病院・学校が整う。|道路医院学校。')
    ], [
      I('cost', 'pub,fin', 'expensive', 3, 'Long-term cost to the public|Biaya jangka panjang bagi publik|長期的な公的負担|公众长期成本', 'Fees and payments run for decades.|Biaya dan pembayaran berjalan puluhan tahun.|使用料や支払いが、何十年も続く。|费用与付款持续数十年。'),
      I('risk', 'pub,biz', 'conflict', 2, 'Conflicting goals|Tujuan bertentangan|目的の食い違い|目标冲突', 'Profit versus public service.|Laba versus pelayanan publik.|利益と公共サービスが衝突する。|盈利与公共服务冲突。'),
      I('eff', 'pub,biz', 'complex', 2, 'Complex contracts|Kontrak rumit|契約が複雑|合同复杂', 'Hard to write and monitor.|Sulit disusun dan dipantau.|作るのも監視するのも難しい。|难以起草与监督。'),
      I('risk', 'pub,fin', 'cheat', 2, 'Corruption risk|Risiko korupsi|汚職のリスク|腐败风险', 'Big contracts attract favouritism.|Kontrak besar menarik pilih kasih.|大型契約は、癒着を呼びやすい。|大合同易滋生偏袒。')
    ]),
    C('toll roads', 'Toll roads|Jalan tol|有料道路|收费公路', ['public transport'], [
      I('eff', 'pub,retail,mfg', 'fast', 3, 'Faster travel and logistics|Perjalanan dan logistik lebih cepat|移動・物流の高速化|出行物流更快', 'Cuts days from delivery times.|Memangkas hari dari waktu pengiriman.|配送の日数を短縮する。|缩短运输天数。'),
      I('val', 'pub', 'money', 2, 'Users fund the road|Pengguna membiayai jalan|利用者が費用を負担|用户付费修路', 'Less burden on taxpayers.|Beban pembayar pajak lebih ringan.|税負担が軽くなる。|减轻纳税人负担。'),
      I('mkt', 'retail,pub', 'market', 2, 'Regional growth|Pertumbuhan wilayah|地域の成長|区域增长', 'Connects markets and industry.|Menghubungkan pasar dan industri.|市場と産業をつなぐ。|连接市场与产业。'),
      I('ppl', 'fam,pub', 'safe', 2, 'Safer, smoother roads|Jalan lebih aman dan mulus|安全で快適な道路|道路更安全平顺', 'Better maintained than free roads.|Lebih terawat daripada jalan biasa.|無料道路より、整備が行き届く。|比免费道路养护更好。')
    ], [
      I('cost', 'fam,retail', 'expensive', 3, 'Costly for users|Mahal bagi pengguna|利用者の負担|用户负担重', 'Fees add up for daily commuters and trucks.|Tarif menumpuk bagi pelaju harian dan truk.|通勤者やトラックには、料金がかさむ。|通勤者与卡车费用累积。'),
      I('ppl', 'pub,fam', 'unfair', 2, 'Excludes the poor|Mengecualikan yang miskin|低所得者が使いにくい|排除穷人', 'Only those who can pay benefit.|Hanya yang mampu membayar yang diuntungkan.|払える人だけが恩恵を受ける。|只有付得起者受益。'),
      I('risk', 'pub,farm', 'lose', 2, 'Land acquisition conflicts|Konflik pembebasan lahan|用地取得をめぐる対立|征地冲突', 'Farmers and villagers displaced.|Petani dan warga tergusur.|農家や住民が、立ち退かされる。|农民村民被迫迁。'),
      I('risk', 'pub,fin', 'fail', 2, 'Traffic forecasts too optimistic|Prediksi lalu lintas terlalu optimistis|交通量予測の甘さ|车流预测过于乐观', 'Revenues may fall short of promises.|Pendapatan bisa meleset dari janji.|収入が、見込みを下回ることがある。|收入可能不及预期。')
    ]),
    C('smart city', 'Smart city technology|Teknologi kota pintar|スマートシティ|智慧城市', ['privacy'], [
      I('eff', 'pub,fam', 'fast', 3, 'Better services and traffic|Layanan dan lalu lintas lebih baik|サービスと交通の改善|服务与交通改善', 'Sensors manage lights, waste and transit.|Sensor mengatur lampu, sampah, dan angkutan.|センサーが、信号・ごみ・交通を最適化する。|传感器管理信号灯、垃圾与交通。'),
      I('val', 'pub', 'save', 2, 'Saves resources|Menghemat sumber daya|資源の節約|节约资源', 'Energy and water use drops.|Pemakaian energi dan air turun.|エネルギーと水の使用量が減る。|能源与水耗下降。'),
      I('cap', 'pub,fam', 'safe', 2, 'Safety and emergency response|Keselamatan dan tanggap darurat|安全と緊急対応|安全与应急', 'Faster response to incidents.|Respons insiden lebih cepat.|事故への対応が早まる。|事件响应更快。'),
      I('cap', 'pub,biz', 'data', 2, 'Evidence-based planning|Perencanaan berbasis bukti|データに基づく計画|循证规划', 'Data shows what citizens need.|Data menunjukkan apa yang dibutuhkan warga.|データで、住民の必要が分かる。|数据显示市民需求。')
    ], [
      I('risk', 'pub,fam', 'secret', 3, 'Surveillance and privacy|Pengawasan dan privasi|監視とプライバシー|监控与隐私', 'Cameras and tracking watch everyone.|Kamera dan pelacakan mengawasi semua orang.|カメラと追跡が、全員を見張る。|摄像头与追踪监视所有人。'),
      I('cost', 'pub,fin', 'expensive', 3, 'Very costly|Sangat mahal|非常に高額|非常昂贵', 'Infrastructure and maintenance.|Infrastruktur dan perawatan.|設備と保守に、多額の費用。|基础设施与维护昂贵。'),
      I('ppl', 'pub,fam', 'skill', 2, 'Digital exclusion|Eksklusi digital|デジタル弱者の排除|数字排斥', 'Some residents are left behind.|Sebagian warga tertinggal.|取り残される住民が出る。|部分居民被落下。'),
      I('risk', 'pub,fin', 'danger', 2, 'Cyber attacks|Serangan siber|サイバー攻撃|网络攻击', 'Connected city systems are targets.|Sistem kota yang terhubung menjadi sasaran.|つながった都市システムは、攻撃の標的。|联网城市系统易受攻击。')
    ]),
    C('universal basic income', 'Universal basic income|Pendapatan dasar universal|ベーシックインカム|全民基本收入', ['minimum wage'], [
      I('ppl', 'pub,fam', 'safe', 3, 'Security for everyone|Keamanan bagi semua|誰にも安心|人人有保障', 'A floor under every household.|Batas bawah bagi setiap rumah tangga.|すべての家庭に、最低限の保障。|每户有底线保障。'),
      I('ppl', 'pub,fam', 'free', 2, 'Freedom to choose work|Bebas memilih pekerjaan|働き方を選べる|可自由选择工作', 'People can study, care or start a business.|Orang dapat belajar, merawat, atau memulai usaha.|学ぶ・介護する・起業する自由が増す。|可求学、照护或创业。'),
      I('eff', 'pub', 'easy', 2, 'Simple to administer|Mudah dikelola|運営が簡単|管理简单', 'No complex means tests.|Tanpa uji kelayakan rumit.|複雑な審査が要らない。|无需复杂资格审查。'),
      I('mkt', 'retail,pub', 'market', 2, 'Boosts local spending|Mendorong belanja lokal|地域消費の拡大|刺激本地消费', 'Money circulates in communities.|Uang berputar di komunitas.|お金が地域で回る。|资金在社区流转。')
    ], [
      I('cost', 'pub,fin', 'expensive', 3, 'Enormous cost|Biaya sangat besar|膨大な財政負担|成本巨大', 'Paying everyone requires huge taxes.|Membayar semua orang butuh pajak besar.|全員に払うには、巨額の税が必要。|普惠发放需巨额税收。'),
      I('ppl', 'pub,biz', 'lazy', 2, 'May reduce work effort|Bisa mengurangi usaha kerja|就労意欲の低下|可能降低工作意愿', 'Some may work less.|Sebagian mungkin bekerja lebih sedikit.|働かなくなる人が出るかもしれない。|可能有人减少工作。'),
      I('risk', 'pub,retail', 'expensive', 2, 'Inflation risk|Risiko inflasi|インフレのリスク|通胀风险', 'More money chasing the same goods.|Lebih banyak uang mengejar barang yang sama.|同じ物に、より多くのお金が向かう。|更多钱追逐同样商品。'),
      I('risk', 'pub,fin', 'unfair', 2, 'Wasted on those who do not need it|Terbuang untuk yang tidak membutuhkan|不要な人にも支給|浪费在不需要者身上', 'Targeted aid may help the poor more.|Bantuan tepat sasaran mungkin lebih membantu yang miskin.|対象を絞った支援のほうが、貧困層に効くこともある。|定向援助可能更帮穷人。')
    ]),
    C('tax increase', 'Raising taxes|Menaikkan pajak|増税|加税', ['tax planning'], [
      I('val', 'pub,fin', 'money', 3, 'More public revenue|Pendapatan negara naik|税収の増加|增加财政收入', 'Funds schools, health and roads.|Membiayai sekolah, kesehatan, dan jalan.|学校・医療・道路の財源になる。|资助学校、医疗与道路。'),
      I('ppl', 'pub,fam', 'fair', 2, 'Reduces inequality|Mengurangi ketimpangan|格差の是正|缩小不平等', 'Progressive taxes redistribute.|Pajak progresif meredistribusi.|累進課税が、再分配をする。|累进税实现再分配。'),
      I('val', 'pub,fin', 'safe', 2, 'Lower deficit|Defisit lebih kecil|財政赤字の縮小|赤字缩小', 'Less borrowing by the state.|Lebih sedikit pinjaman negara.|国の借金が減る。|国家借款减少。'),
      I('cap', 'pub,health', 'help', 2, 'Discourages harmful goods|Mengurangi barang berbahaya|有害品の抑制|抑制有害商品', 'Tobacco and sugar taxes.|Pajak rokok dan gula.|たばこや砂糖への課税。|烟草糖税。')
    ], [
      I('cost', 'fam,biz', 'poor', 3, 'Less money for households and firms|Uang berkurang bagi rumah tangga dan usaha|家計・企業の手取り減|家庭企业可支配资金减少', 'Spending and investment fall.|Belanja dan investasi menurun.|消費と投資が減る。|消费与投资下降。'),
      I('risk', 'biz,pub', 'leave', 2, 'Capital flight|Pelarian modal|資本の流出|资本外逃', 'Firms and rich individuals move away.|Perusahaan dan orang kaya pindah.|企業や富裕層が、国外に出る。|企业与富人迁出。'),
      I('risk', 'retail,pub', 'cheat', 2, 'Evasion|Penghindaran pajak|脱税|逃税', 'Higher rates tempt cheating.|Tarif tinggi menggoda kecurangan.|税率が高いと、不正が増える。|高税率诱发逃税。'),
      I('ppl', 'pub,fam', 'anger', 2, 'Public anger|Kemarahan publik|国民の反発|民众不满', 'Voters punish tax rises.|Pemilih menghukum kenaikan pajak.|増税は、有権者の反発を招く。|选民惩罚加税。')
    ]),
    C('import substitution', 'Import substitution|Substitusi impor|輸入代替|进口替代', ['free trade'], [
      I('ppl', 'mfg,pub', 'job', 3, 'Builds local industry|Membangun industri lokal|国内産業の育成|培育本土产业', 'Local factories replace imports.|Pabrik lokal menggantikan impor.|国内工場が、輸入品に代わる。|本地工厂替代进口。'),
      I('val', 'pub,fin', 'save', 2, 'Saves foreign exchange|Menghemat devisa|外貨の節約|节约外汇', 'Fewer imports to pay for.|Lebih sedikit impor yang dibayar.|輸入代金が減る。|少付进口款。'),
      I('cap', 'pub,mfg', 'safe', 2, 'Less exposure to global shocks|Kurang terpapar guncangan global|世界的なショックへの耐性|减少全球冲击影响', 'Supplies are closer to home.|Pasokan lebih dekat.|供給が、身近にある。|供应更近。'),
      I('cap', 'mfg,pub', 'skill', 2, 'Skills and technology|Keterampilan dan teknologi|技能と技術の蓄積|技能与技术积累', 'Local workers learn to make more.|Pekerja lokal belajar membuat lebih banyak.|国内の労働者が、製造技術を学ぶ。|本地工人学会制造。')
    ], [
      I('mkt', 'retail,mfg', 'expensive', 3, 'Higher prices and weaker quality|Harga lebih tinggi dan mutu lebih rendah|価格高・品質低下|价高质弱', 'Sheltered firms need not improve.|Perusahaan terlindungi tak perlu berbenah.|守られた企業は、改善しない。|受保护企业无须改进。'),
      I('eff', 'mfg,pub', 'lazy', 2, 'Inefficient industries|Industri tidak efisien|非効率な産業|低效产业', 'Weak firms survive on protection.|Perusahaan lemah bertahan dengan perlindungan.|弱い企業が、保護で生き延びる。|弱企业靠保护存活。'),
      I('risk', 'pub,mfg', 'war', 2, 'Retaliation|Pembalasan|報復措置|报复', 'Trade partners restrict your exports.|Mitra dagang membatasi ekspor Anda.|相手国が、こちらの輸出を制限する。|贸易伙伴限制你的出口。'),
      I('risk', 'pub,mfg', 'depend', 2, 'Still needs imported parts|Tetap butuh komponen impor|部品の輸入は残る|仍需进口零件', 'Local assembly may rely on foreign inputs.|Perakitan lokal bisa bergantung pada bahan asing.|国内組立でも、部品は輸入に頼る。|本地组装仍依赖外国零件。')
    ]),
    C('export orientation', 'Export-led growth|Pertumbuhan berorientasi ekspor|輸出主導の成長|出口导向增长', ['import substitution'], [
      I('mkt', 'mfg,farm,pub', 'market', 3, 'Huge global market|Pasar global besar|巨大な世界市場|庞大全球市场', 'Sell far beyond the home economy.|Menjual jauh melampaui ekonomi domestik.|国内経済を超えて売れる。|销售远超国内规模。'),
      I('val', 'pub,fin', 'money', 2, 'Foreign currency earnings|Pendapatan devisa|外貨獲得|赚取外汇', 'Pays for imports and debt.|Membayar impor dan utang.|輸入代金や債務の返済に使える。|支付进口与债务。'),
      I('eff', 'mfg,biz', 'efficient', 2, 'Forces efficiency|Memaksa efisiensi|効率化を促す|倒逼效率', 'World competition raises standards.|Persaingan dunia meningkatkan standar.|世界との競争が、水準を高める。|全球竞争提高标准。'),
      I('ppl', 'mfg,pub', 'job', 2, 'Jobs in factories|Pekerjaan di pabrik|工場での雇用|工厂就业', 'Export industries employ many.|Industri ekspor mempekerjakan banyak orang.|輸出産業が、多くを雇う。|出口产业雇用众多。')
    ], [
      I('risk', 'pub,mfg', 'depend', 3, 'Dependence on foreign demand|Ketergantungan permintaan asing|海外需要への依存|依赖外需', 'Recessions abroad hurt at home.|Resesi di luar negeri memukul dalam negeri.|海外の不況が、国内を直撃する。|海外衰退冲击国内。'),
      I('risk', 'pub,mfg', 'war', 2, 'Trade wars and tariffs|Perang dagang dan tarif|貿易戦争と関税|贸易战与关税', 'Policy shifts shut doors.|Perubahan kebijakan menutup pintu.|政策変更で、市場が閉ざされる。|政策变动关上大门。'),
      I('ppl', 'mfg,pub', 'poor', 2, 'Low wages to stay competitive|Upah rendah demi daya saing|競争力のための低賃金|为竞争保持低薪', 'Workers bear the cost.|Pekerja menanggung biayanya.|労働者が、そのコストを負う。|工人承担成本。'),
      I('risk', 'pub,fin', 'lose', 2, 'Currency swings|Fluktuasi kurs|為替変動|汇率波动', 'Exchange rates can erase margins.|Kurs dapat menghapus margin.|為替が、利益を吹き飛ばす。|汇率可抹去利润。')
    ])
  );
})();
