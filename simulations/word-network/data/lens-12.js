/* Word Network: curated concepts, batch 12 (household, education, health). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('renting a home', 'Renting a home|Menyewa rumah|賃貸で住む|租房', ['buying a home'], [
      I('val', 'fam', 'cheap', 3, 'Low upfront cost|Biaya awal rendah|初期費用が低い|前期成本低', 'No big down payment is needed.|Tidak perlu uang muka besar.|大きな頭金が要らない。|无需大额首付。'),
      I('cap', 'fam', 'flexible', 3, 'Flexibility to move|Fleksibel untuk pindah|引っ越しの自由|搬家灵活', 'Change city or job without selling.|Ganti kota atau kerja tanpa menjual.|売却せずに、転居・転職できる。|换城市或工作无需卖房。'),
      I('eff', 'fam', 'easy', 2, 'No repair burden|Tanpa beban perbaikan|修繕の負担がない|无需承担维修', 'The landlord fixes major problems.|Pemilik memperbaiki masalah besar.|大きな修繕は、大家が行う。|大问题由房东修。'),
      I('val', 'fam', 'safe', 2, 'Less risk|Risiko lebih kecil|価格変動リスクが小さい|风险较小', 'Not exposed to falling house prices.|Tidak terpapar penurunan harga rumah.|住宅価格の下落に左右されない。|不受房价下跌影响。')
    ], [
      I('cost', 'fam', 'money', 3, 'No asset built|Tidak membangun aset|資産が残らない|无资产积累', 'Years of rent leave nothing to own.|Bertahun-tahun sewa tidak menyisakan kepemilikan.|何年払っても、自分のものにならない。|多年租金不留资产。'),
      I('risk', 'fam', 'lose', 2, 'Rent can rise|Sewa bisa naik|家賃が上がる|租金可能上涨', 'Costs are out of your control.|Biaya di luar kendali Anda.|費用を自分で決められない。|成本不受你控制。'),
      I('risk', 'fam', 'leave', 2, 'Insecurity of tenure|Ketidakpastian masa tinggal|住み続けられない不安|居住不稳定', 'The owner may end the lease.|Pemilik bisa mengakhiri sewa.|契約を更新されないことがある。|房东可能终止租约。'),
      I('ppl', 'fam', 'limit', 2, 'Limits on changes|Batas untuk mengubah|改装の制限|改造受限', 'You cannot renovate freely.|Anda tidak bisa merenovasi bebas.|自由に改装できない。|不能随意装修。')
    ]),
    C('buying a home', 'Buying a home|Membeli rumah|持ち家を買う|买房', ['renting a home'], [
      I('val', 'fam,fin', 'invest', 3, 'Builds wealth|Membangun kekayaan|資産形成|积累财富', 'Mortgage payments build ownership.|Cicilan KPR membangun kepemilikan.|ローン返済が、資産になる。|房贷还款形成产权。'),
      I('ppl', 'fam', 'safe', 3, 'Stability|Stabilitas|住まいの安定|稳定', 'Nobody can make you leave.|Tidak ada yang bisa menyuruh Anda pergi.|誰にも追い出されない。|没人能让你搬走。'),
      I('cap', 'fam', 'free', 2, 'Freedom to customise|Bebas menyesuaikan|自由な改装|可自由改造', 'Paint, extend or rebuild as you like.|Cat, perluas, atau bangun ulang sesuai keinginan.|好きなように、改装できる。|可按喜好装修。'),
      I('val', 'fam,fin', 'long', 2, 'Protection from rising rents|Perlindungan dari sewa naik|家賃上昇からの保護|免受租金上涨影响', 'Housing costs become predictable.|Biaya hunian menjadi terprediksi.|住居費が、読みやすくなる。|住房成本可预测。')
    ], [
      I('cost', 'fam,fin', 'expensive', 3, 'Large upfront cost|Biaya awal besar|大きな初期費用|前期成本大', 'Deposit, fees and taxes.|Uang muka, biaya, dan pajak.|頭金・諸費用・税金。|首付、手续费与税。'),
      I('risk', 'fam,fin', 'debt', 3, 'Long debt|Utang panjang|長期の借金|长期负债', 'Decades of repayments.|Cicilan puluhan tahun.|何十年も返済が続く。|数十年还款。'),
      I('risk', 'fam,fin', 'lose', 2, 'Price risk|Risiko harga|価格下落リスク|价格风险', 'Property can lose value.|Properti bisa turun nilainya.|不動産の価値が下がることがある。|房产可能贬值。'),
      I('cap', 'fam', 'stuck', 2, 'Hard to move|Sulit pindah|動きにくい|难以搬迁', 'Selling is slow and costly.|Menjual lambat dan mahal.|売却には、時間も費用もかかる。|出售慢且费钱。')
    ]),
    C('credit card', 'Using a credit card|Memakai kartu kredit|クレジットカードの利用|使用信用卡', ['cash payments'], [
      I('cap', 'fam,fin,retail', 'easy', 3, 'Convenience|Kemudahan|利便性|便利', 'Pay anywhere, online or abroad.|Bayar di mana saja, online atau di luar negeri.|どこでも、ネットでも海外でも払える。|随处可付，线上或海外。'),
      I('val', 'fam,fin', 'reward', 2, 'Rewards and points|Hadiah dan poin|ポイントや特典|奖励与积分', 'Cashback and miles on spending.|Cashback dan mil atas belanja.|利用でポイントやマイルが貯まる。|消费获返现与里程。'),
      I('cap', 'fam,fin', 'safe', 2, 'Fraud protection|Perlindungan penipuan|不正利用の補償|欺诈保护', 'Disputed charges can be reversed.|Tagihan yang disengketakan bisa dibatalkan.|不正請求は、取り消せる。|争议扣款可撤销。'),
      I('val', 'fam,fin', 'time', 2, 'Interest-free period|Masa bebas bunga|無利息期間|免息期', 'Pay later without cost if cleared on time.|Bayar nanti tanpa biaya jika dilunasi tepat waktu.|期日までに払えば、利息がかからない。|按时还清则无息。')
    ], [
      I('risk', 'fam,fin', 'debt', 3, 'Debt trap|Jerat utang|借金の落とし穴|债务陷阱', 'High interest piles up quickly.|Bunga tinggi menumpuk cepat.|高い金利が、すぐに膨らむ。|高息迅速累积。'),
      I('ppl', 'fam,retail', 'greed', 3, 'Overspending|Belanja berlebihan|使いすぎ|过度消费', 'Spending feels painless.|Belanja terasa tidak menyakitkan.|痛みを感じにくく、使いすぎる。|花钱不心疼。'),
      I('cost', 'fam,fin', 'expensive', 2, 'Fees|Biaya-biaya|各種手数料|各种费用', 'Annual and late fees.|Biaya tahunan dan keterlambatan.|年会費や延滞手数料がかかる。|年费与滞纳金。'),
      I('risk', 'fam,fin', 'secret', 2, 'Data theft|Pencurian data|情報の盗難|数据被盗', 'Card numbers can be stolen.|Nomor kartu bisa dicuri.|カード番号が盗まれることがある。|卡号可能被盗。')
    ]),
    C('buy now pay later', 'Buying on instalments|Membeli dengan cicilan|分割払いで買う|分期购买', ['saving up'], [
      I('cap', 'fam,retail', 'now', 3, 'Get it now|Dapat sekarang|今すぐ手に入る|立即拥有', 'Use the product while paying.|Memakai produk sambil membayar.|払いながら、すぐ使える。|边付款边使用。'),
      I('cap', 'fam,retail', 'plan', 2, 'Spreads the cost|Menyebar biaya|負担の分散|分摊费用', 'Small payments fit monthly budgets.|Cicilan kecil sesuai anggaran bulanan.|少額の支払いで、月々の予算に収まる。|小额付款适合月度预算。'),
      I('mkt', 'retail', 'sell', 2, 'Boosts sales for sellers|Mendorong penjualan penjual|売り手の売上増|提升卖家销量', 'More buyers can afford big items.|Lebih banyak pembeli mampu membeli barang besar.|高額商品も、買える人が増える。|更多人买得起大件。'),
      I('val', 'fam,retail', 'cheap', 2, 'Sometimes interest-free|Kadang tanpa bunga|無利息のことも|有时免息', 'Promotions offer zero-percent plans.|Promosi menawarkan cicilan 0%.|ゼロ金利の分割もある。|促销提供0%分期。')
    ], [
      I('risk', 'fam,retail', 'debt', 3, 'Hidden debt|Utang tersembunyi|見えにくい借金|隐形负债', 'Several small plans add up.|Beberapa cicilan kecil menumpuk.|小さな分割が、積み重なる。|多笔小额分期累积。'),
      I('cost', 'fam,retail', 'interest', 3, 'Interest and fees|Bunga dan biaya|利息と手数料|利息与费用', 'The total price is higher.|Harga total lebih tinggi.|総額が、高くなる。|总价更高。'),
      I('ppl', 'fam', 'greed', 2, 'Buying beyond means|Membeli di luar kemampuan|身の丈を超えた買い物|超出能力消费', 'Easy credit encourages overspending.|Kredit mudah mendorong belanja berlebih.|手軽な分割が、浪費を招く。|容易信贷助长超支。'),
      I('risk', 'fam,fin', 'law', 2, 'Late penalties and credit score|Denda terlambat dan skor kredit|延滞のペナルティと信用情報|逾期罚款与征信', 'Missed payments harm future borrowing.|Pembayaran terlewat merusak peluang pinjaman.|延滞は、将来の借入に響く。|逾期影响日后借贷。')
    ]),
    C('saving up', 'Saving up first|Menabung dulu|貯めてから買う|先存钱再买', ['buy now pay later'], [
      I('val', 'fam', 'safe', 3, 'No debt|Tanpa utang|借金なし|无负债', 'You pay once, interest-free.|Anda membayar sekali, tanpa bunga.|1回で払い、利息もない。|一次付清，无利息。'),
      I('ppl', 'fam', 'proud', 2, 'Discipline|Disiplin|自制心が育つ|培养自律', 'Waiting builds self-control.|Menunggu melatih pengendalian diri.|待つことで、自制心が育つ。|等待培养自控力。'),
      I('val', 'fam', 'cheap', 2, 'Lower total cost|Total biaya lebih rendah|総額が安い|总成本更低', 'No interest or fees.|Tanpa bunga atau biaya.|利息も手数料もない。|无利息与费用。'),
      I('cap', 'fam', 'choice', 2, 'Time to compare|Waktu untuk membandingkan|比較する時間|有时间比较', 'Better choices come with patience.|Pilihan lebih baik datang dengan kesabaran.|待つ間に、より良い選択ができる。|耐心带来更好选择。')
    ], [
      I('eff', 'fam', 'slow', 3, 'Long wait|Menunggu lama|待ち時間が長い|等待漫长', 'Needs go unmet meanwhile.|Kebutuhan tidak terpenuhi selama itu.|その間、必要が満たされない。|期间需求得不到满足。'),
      I('risk', 'fam', 'lose', 2, 'Prices may rise|Harga bisa naik|価格が上がる|价格可能上涨', 'Waiting can cost more later.|Menunggu bisa lebih mahal nanti.|待つうちに、値上がりすることがある。|等待可能更贵。'),
      I('mkt', 'fam,retail', 'miss', 2, 'Missed opportunities|Peluang terlewat|機会を逃す|错失机会', 'Offers or chances disappear.|Penawaran atau peluang hilang.|チャンスが、なくなる。|机会消失。'),
      I('ppl', 'fam', 'stress', 2, 'Hard when income is low|Sulit saat penghasilan rendah|低収入だと難しい|低收入难做到', 'Saving needs spare money.|Menabung butuh uang lebih.|貯めるには、余裕が要る。|存钱需要余钱。')
    ]),
    C('second hand', 'Buying second-hand|Membeli barang bekas|中古品を買う|购买二手', ['new products'], [
      I('val', 'fam,retail', 'cheap', 3, 'Much cheaper|Jauh lebih murah|ずっと安い|便宜得多', 'Big savings versus new.|Hemat besar dibanding baru.|新品より、大きく安い。|比新品省很多。'),
      I('val', 'fam,retail', 'waste', 2, 'Less waste|Lebih sedikit limbah|ごみの削減|减少浪费', 'Products get a second life.|Produk mendapat kehidupan kedua.|製品が、再び使われる。|产品获得第二次生命。'),
      I('cap', 'fam,retail', 'find', 2, 'Unique finds|Temuan unik|掘り出し物|独特淘货', 'Rare or discontinued items.|Barang langka atau tidak diproduksi lagi.|珍しい品や廃番品に出会える。|稀有或停产物品。'),
      I('val', 'fam', 'save', 2, 'Slow depreciation|Penyusutan lambat|値落ちが小さい|贬值慢', 'The big drop in value already happened.|Penurunan nilai terbesar sudah terjadi.|大きな値下がりは、すでに起きている。|大幅贬值已发生。')
    ], [
      I('risk', 'fam,retail', 'quality', 3, 'Hidden defects|Cacat tersembunyi|見えない不具合|隐藏缺陷', 'You cannot be sure of the condition.|Anda tidak bisa memastikan kondisinya.|状態が、確かめにくい。|无法确定状况。'),
      I('cost', 'fam,retail', 'time', 2, 'No warranty|Tanpa garansi|保証がない|无保修', 'Repairs are your problem.|Perbaikan jadi tanggung jawab Anda.|修理は、自己責任。|维修自己负责。'),
      I('eff', 'fam,retail', 'hard', 2, 'Search effort|Usaha mencari|探す手間|搜寻费力', 'Finding the right item takes time.|Menemukan barang yang tepat butuh waktu.|ちょうど良い品を探すのに、時間がかかる。|找到合适物品费时。'),
      I('mkt', 'retail,mfg', 'old', 2, 'Older technology|Teknologi lebih lama|古い技術|技术较旧', 'Missing newer features.|Tidak punya fitur terbaru.|新しい機能がない。|缺乏新功能。')
    ]),
    C('new products', 'Buying new|Membeli baru|新品を買う|购买新品', ['second hand'], [
      I('val', 'fam,retail', 'safe', 3, 'Known condition and warranty|Kondisi diketahui dan bergaransi|状態が明確で保証付き|状况明确且有保修', 'Defects are covered.|Cacat ditanggung.|不具合は、保証される。|缺陷有保障。'),
      I('cap', 'fam,retail', 'new', 2, 'Latest features|Fitur terbaru|最新機能|最新功能', 'Modern technology and design.|Teknologi dan desain modern.|最新の技術とデザイン。|现代技术与设计。'),
      I('eff', 'fam,retail', 'easy', 2, 'Easy to buy|Mudah dibeli|買いやすい|易购买', 'Many shops, many choices.|Banyak toko, banyak pilihan.|店も選択肢も多い。|店多选择多。'),
      I('ppl', 'fam', 'proud', 2, 'Satisfaction|Kepuasan|満足感|满足感', 'Nobody used it before you.|Tidak ada yang memakainya sebelum Anda.|誰も使っていない喜び。|无人先用的满足。')
    ], [
      I('cost', 'fam,retail', 'expensive', 3, 'Higher price|Harga lebih tinggi|価格が高い|价格更高', 'You pay for newness.|Anda membayar untuk kebaruan.|新しさに対して払う。|为“新”付费。'),
      I('cost', 'fam,retail', 'lose', 3, 'Fast depreciation|Penyusutan cepat|値落ちが早い|贬值快', 'Value drops the moment you buy.|Nilai turun begitu Anda membeli.|買った瞬間から、価値が下がる。|购买即贬值。'),
      I('risk', 'retail,mfg', 'waste', 2, 'Resource use|Pemakaian sumber daya|資源の消費|资源消耗', 'Production uses materials and energy.|Produksi memakai bahan dan energi.|製造に、資源とエネルギーを使う。|生产消耗材料与能源。'),
      I('ppl', 'fam,retail', 'greed', 2, 'Status spending|Belanja demi gengsi|見栄の消費|攀比消费', 'Buying new for show.|Membeli baru demi pamer.|見せるために買ってしまう。|为炫耀买新。')
    ]),
    C('cooking at home', 'Cooking at home|Memasak di rumah|自炊|在家做饭', ['eating out'], [
      I('val', 'fam,food', 'cheap', 3, 'Cheaper|Lebih murah|安い|更便宜', 'Ingredients cost less than restaurant prices.|Bahan lebih murah daripada harga restoran.|外食より、材料費は安い。|食材比餐馆便宜。'),
      I('ppl', 'fam,health', 'healthy', 3, 'Healthier|Lebih sehat|健康的|更健康', 'You control oil, salt and portions.|Anda mengatur minyak, garam, dan porsi.|油・塩・量を、自分で調整できる。|油盐份量自己掌控。'),
      I('ppl', 'fam', 'family', 2, 'Family time|Waktu bersama keluarga|家族の時間|家庭时光', 'Cooking and eating together.|Memasak dan makan bersama.|一緒に作り、一緒に食べる。|一起做饭吃饭。'),
      I('cap', 'fam,food', 'skill', 2, 'Builds skills|Membangun keterampilan|料理の腕が上がる|提升厨艺', 'You learn recipes and habits.|Anda belajar resep dan kebiasaan.|レシピや習慣が身につく。|学会食谱与习惯。')
    ], [
      I('eff', 'fam,food', 'time', 3, 'Takes time|Memakan waktu|時間がかかる|耗时', 'Shopping, cooking and cleaning.|Berbelanja, memasak, dan membersihkan.|買い物・調理・片付けが必要。|采购、烹饪与清洁。'),
      I('ppl', 'fam', 'tired', 2, 'Tiring after work|Melelahkan setelah bekerja|仕事の後は疲れる|下班后疲惫', 'Hard to find energy daily.|Sulit menemukan tenaga setiap hari.|毎日やる気力が出ない。|每天都难有精力。'),
      I('cost', 'fam,food', 'waste', 2, 'Food waste|Limbah makanan|食品ロス|食物浪费', 'Leftovers and spoiled ingredients.|Sisa makanan dan bahan rusak.|食べ残しや傷んだ食材が出る。|剩饭与食材变质。'),
      I('eff', 'fam', 'limit', 2, 'Limited variety|Variasi terbatas|メニューが限られる|花样有限', 'Repeating the same dishes.|Mengulang menu yang sama.|同じ料理の繰り返し。|重复同样菜肴。')
    ]),
    C('eating out', 'Eating out|Makan di luar|外食|外出就餐', ['cooking at home'], [
      I('eff', 'fam,food', 'easy', 3, 'Convenient|Praktis|手軽|方便', 'No cooking or cleaning.|Tanpa memasak atau membersihkan.|調理も片付けも不要。|无需做饭收拾。'),
      I('ppl', 'fam,food', 'friend', 2, 'Social occasion|Momen sosial|交流の場|社交场合', 'Meet friends and relax.|Bertemu teman dan bersantai.|友人と会い、くつろげる。|与朋友相聚放松。'),
      I('cap', 'fam,food', 'choice', 2, 'Variety|Variasi|選択の多様さ|选择丰富', 'Try new dishes and cuisines.|Mencoba hidangan dan masakan baru.|新しい料理を試せる。|尝试新菜肴。'),
      I('val', 'food,retail', 'help', 2, 'Supports local businesses|Mendukung usaha lokal|地域の店を支える|支持本地商家', 'Money stays in the community.|Uang tetap di komunitas.|お金が地域に回る。|钱留在社区。')
    ], [
      I('cost', 'fam,food', 'expensive', 3, 'Costly|Mahal|費用が高い|昂贵', 'Daily restaurant meals strain budgets.|Makan di restoran tiap hari membebani anggaran.|毎日の外食は、家計を圧迫する。|天天下馆子压垮预算。'),
      I('ppl', 'fam,health', 'healthy', 2, 'Less healthy|Kurang sehat|健康面の不安|不够健康', 'Salt, sugar and oil are hidden.|Garam, gula, dan minyak tersembunyi.|塩分・糖分・油が多い。|盐糖油隐蔽较多。'),
      I('eff', 'food,fam', 'wait', 2, 'Queues and waiting|Antrean dan menunggu|行列と待ち時間|排队等待', 'Busy places take time.|Tempat ramai butuh waktu.|混雑して、時間がかかる。|热门地方耗时。'),
      I('risk', 'food,health', 'danger', 2, 'Hygiene uncertainty|Ketidakpastian kebersihan|衛生面の不安|卫生不确定', 'You cannot see the kitchen.|Anda tidak bisa melihat dapur.|厨房は見えない。|看不到后厨。')
    ]),
    C('private car', 'Private car|Mobil pribadi|自家用車|私家车', ['public transport'], [
      I('cap', 'fam,retail', 'free', 3, 'Freedom and convenience|Kebebasan dan kenyamanan|自由と利便性|自由便利', 'Go anywhere, anytime.|Pergi ke mana saja, kapan saja.|いつでもどこへでも行ける。|随时随地出行。'),
      I('ppl', 'fam', 'comfort', 2, 'Comfort and privacy|Kenyamanan dan privasi|快適さとプライバシー|舒适与隐私', 'Carry family and goods easily.|Mudah membawa keluarga dan barang.|家族や荷物を楽に運べる。|轻松载家人与物品。'),
      I('eff', 'fam,retail', 'fast', 2, 'Door-to-door|Dari pintu ke pintu|ドアtoドア|门到门', 'No transfers or waiting.|Tanpa pindah-pindah atau menunggu.|乗り換えも待ち時間もない。|无需换乘等待。'),
      I('mkt', 'rural,farm,retail', 'reach', 2, 'Reaches places without transit|Menjangkau tempat tanpa angkutan umum|公共交通のない場所にも行ける|到达无公交之处', 'Essential in rural areas.|Penting di daerah pedesaan.|地方では、必需。|乡村地区必不可少。')
    ], [
      I('cost', 'fam', 'expensive', 3, 'High total cost|Biaya total tinggi|総コストが高い|总成本高', 'Fuel, parking, tax and repairs.|BBM, parkir, pajak, dan perbaikan.|燃料・駐車・税・修理。|油费、停车、税与维修。'),
      I('risk', 'pub,fam', 'noise', 2, 'Traffic jams|Kemacetan|渋滞|交通拥堵', 'Time is wasted in congestion.|Waktu terbuang dalam kemacetan.|渋滞で時間を失う。|拥堵浪费时间。'),
      I('risk', 'pub,farm', 'waste', 2, 'Pollution|Polusi|大気汚染|污染', 'Emissions harm health and climate.|Emisi merugikan kesehatan dan iklim.|排出ガスが、健康と気候を害する。|排放危害健康与气候。'),
      I('risk', 'fam', 'danger', 2, 'Accident risk|Risiko kecelakaan|事故のリスク|事故风险', 'Driving is dangerous.|Berkendara itu berbahaya.|運転には、危険が伴う。|驾驶有危险。')
    ]),
    C('public transport', 'Public transport|Transportasi umum|公共交通|公共交通', ['private car'], [
      I('val', 'fam,pub', 'cheap', 3, 'Low cost|Biaya rendah|低コスト|成本低', 'Far cheaper than owning a car.|Jauh lebih murah daripada memiliki mobil.|車を持つより、はるかに安い。|比养车便宜得多。'),
      I('val', 'pub,fam', 'stay', 2, 'Less pollution and traffic|Polusi dan kemacetan berkurang|汚染・渋滞の軽減|减少污染与拥堵', 'Shared rides use less space and fuel.|Perjalanan bersama memakai lebih sedikit ruang dan BBM.|乗り合いは、道路も燃料も節約する。|共乘节省空间与燃料。'),
      I('ppl', 'fam,edu', 'free', 2, 'Time to read or rest|Waktu untuk membaca atau istirahat|読書や休息の時間|可阅读或休息', 'No driving stress.|Tanpa stres menyetir.|運転の疲れがない。|无驾驶压力。'),
      I('ppl', 'pub,fam', 'fair', 2, 'Access for everyone|Akses untuk semua|誰もが使える|人人可用', 'Includes people who cannot drive.|Mencakup mereka yang tidak bisa menyetir.|運転できない人も移動できる。|不会开车者也能出行。')
    ], [
      I('eff', 'fam,pub', 'slow', 3, 'Slow and fixed routes|Lambat dan rute tetap|遅く、路線が固定|慢且路线固定', 'Transfers and waiting add time.|Pindah dan menunggu menambah waktu.|乗り換えや待ち時間がかかる。|换乘等待耗时。'),
      I('ppl', 'fam,pub', 'tired', 2, 'Crowded and uncomfortable|Padat dan tidak nyaman|混雑して不快|拥挤不适', 'Peak hours are packed.|Jam sibuk penuh sesak.|ラッシュ時は、すし詰め。|高峰拥挤。'),
      I('risk', 'pub,fam', 'late', 2, 'Unreliable schedules|Jadwal tidak andal|時刻表が当てにならない|班次不可靠', 'Delays and cancellations.|Penundaan dan pembatalan.|遅延や運休が起きる。|延误与停运。'),
      I('mkt', 'rural,pub', 'limit', 2, 'Poor coverage|Cakupan buruk|カバー範囲が狭い|覆盖差', 'Many places have no service.|Banyak tempat tanpa layanan.|サービスのない地域も多い。|许多地方无服务。')
    ]),
    C('telemedicine', 'Telemedicine|Telemedisin|遠隔医療|远程医疗', ['in-person care'], [
      I('cap', 'health,rural', 'easy', 3, 'Access from anywhere|Akses dari mana saja|どこからでも受診|随处就诊', 'No travel to a clinic.|Tanpa perjalanan ke klinik.|通院の必要がない。|无需前往诊所。'),
      I('val', 'health,fam', 'save', 2, 'Saves time and money|Hemat waktu dan uang|時間と費用の節約|省时省钱', 'No queues or transport costs.|Tanpa antrean atau ongkos.|待ち時間も交通費もない。|无排队与交通费。'),
      I('mkt', 'health', 'reach', 2, 'Reaches remote patients|Menjangkau pasien terpencil|遠隔地の患者に届く|触达偏远患者', 'Specialists serve distant villages.|Spesialis melayani desa jauh.|専門医が、遠い村にも届く。|专科医生服务远村。'),
      I('cap', 'health', 'safe', 2, 'Lower infection risk|Risiko penularan lebih rendah|感染リスクの低減|感染风险低', 'Sick people stay home.|Orang sakit tetap di rumah.|患者が自宅にいられる。|病人留在家中。')
    ], [
      I('risk', 'health', 'danger', 3, 'Missed diagnoses|Diagnosis terlewat|見落としの恐れ|漏诊风险', 'The doctor cannot examine you physically.|Dokter tidak dapat memeriksa fisik.|直接触れる診察ができない。|医生无法亲自检查。'),
      I('ppl', 'health,rural', 'skill', 2, 'Digital divide|Kesenjangan digital|デジタル格差|数字鸿沟', 'Poor connections or skills exclude people.|Koneksi atau keterampilan buruk mengecualikan orang.|通信環境や不慣れで、取り残される人がいる。|网络或技能不足排除部分人。'),
      I('risk', 'health,fin', 'secret', 2, 'Privacy and data security|Privasi dan keamanan data|プライバシーとデータ保護|隐私与数据安全', 'Medical data travels online.|Data medis berpindah lewat internet.|医療情報が、ネットを通る。|医疗数据在网上传输。'),
      I('ppl', 'health,fam', 'distance', 2, 'Less personal care|Perawatan kurang personal|人間味の薄さ|关怀较少', 'Trust is harder through a screen.|Kepercayaan lebih sulit lewat layar.|画面越しでは、信頼を築きにくい。|隔屏难建立信任。')
    ]),
    C('in-person care', 'In-person medical care|Perawatan medis tatap muka|対面診療|面诊', ['telemedicine'], [
      I('cap', 'health', 'know', 3, 'Full examination|Pemeriksaan lengkap|十分な診察|全面检查', 'Doctors touch, test and observe.|Dokter menyentuh, menguji, dan mengamati.|触診・検査・観察ができる。|可触诊、检测与观察。'),
      I('ppl', 'health,fam', 'trust', 2, 'Personal connection|Hubungan personal|人と人とのつながり|亲身联系', 'Patients feel cared for.|Pasien merasa diperhatikan.|患者が、大切にされていると感じる。|患者觉得被关照。'),
      I('cap', 'health', 'fast', 2, 'Immediate treatment|Penanganan segera|その場での治療|即时治疗', 'Tests and procedures on site.|Tes dan tindakan di tempat.|検査や処置を、その場で行える。|现场检测与治疗。'),
      I('val', 'health', 'safe', 2, 'Fewer misunderstandings|Lebih sedikit salah paham|誤解が少ない|误解较少', 'Body language helps communication.|Bahasa tubuh membantu komunikasi.|表情やしぐさも伝わる。|肢体语言辅助沟通。')
    ], [
      I('eff', 'health,rural', 'time', 3, 'Travel and waiting|Perjalanan dan menunggu|移動と待ち時間|路途与等待', 'Hours lost for a short visit.|Berjam-jam hilang untuk kunjungan singkat.|短い診察に、何時間もかかる。|短暂就诊耗数小时。'),
      I('cost', 'health,fam', 'expensive', 2, 'Higher cost|Biaya lebih tinggi|費用が高い|费用更高', 'Transport and time off work.|Transportasi dan izin kerja.|交通費や仕事を休む損失。|交通与误工。'),
      I('mkt', 'health,rural', 'limit', 2, 'Limited access|Akses terbatas|アクセスが限られる|可及性有限', 'Few doctors outside cities.|Sedikit dokter di luar kota.|都市部以外は、医師が少ない。|城外医生少。'),
      I('risk', 'health', 'danger', 2, 'Infection exposure|Paparan infeksi|感染の機会|感染暴露', 'Waiting rooms spread illness.|Ruang tunggu menyebarkan penyakit.|待合室で、病気がうつる。|候诊室易传播疾病。')
    ]),
    C('preventive healthcare', 'Preventive healthcare|Layanan kesehatan preventif|予防医療|预防保健', ['curative healthcare'], [
      I('val', 'health,pub,fam', 'save', 3, 'Cheaper than cure|Lebih murah daripada mengobati|治療より安い|比治疗便宜', 'Early action avoids costly treatment.|Tindakan dini menghindari pengobatan mahal.|早めの対策が、高額な治療を避ける。|早期行动避免昂贵治疗。'),
      I('ppl', 'health,fam', 'healthy', 3, 'Healthier, longer lives|Hidup lebih sehat dan panjang|健康で長生き|更健康长寿', 'Problems are caught early.|Masalah ditangkap sejak dini.|問題を、早く見つけられる。|问题早发现。'),
      I('eff', 'health,biz', 'steady', 2, 'Fewer sick days|Hari sakit lebih sedikit|病欠の減少|病假减少', 'Workplaces stay productive.|Tempat kerja tetap produktif.|職場の生産性が保たれる。|职场保持高效。'),
      I('val', 'pub,health', 'plan', 2, 'Lower burden on hospitals|Beban rumah sakit lebih ringan|病院の負担軽減|减轻医院负担', 'Fewer emergencies.|Lebih sedikit kasus darurat.|救急が減る。|急诊减少。')
    ], [
      I('cost', 'health,pub', 'expensive', 3, 'Upfront cost|Biaya di muka|先行コスト|前期成本', 'Screenings and programmes cost money now.|Skrining dan program butuh dana sekarang.|検診やプログラムに、今お金がかかる。|筛查与项目现在就要花钱。'),
      I('mkt', 'health,pub', 'ignore', 2, 'Hard to see the benefit|Manfaat sulit terlihat|効果が見えにくい|益处难见', 'Success means nothing happens.|Keberhasilan berarti tidak terjadi apa-apa.|成功すると、何も起きない。|成功意味着什么都没发生。'),
      I('ppl', 'health,fam', 'lazy', 2, 'People skip check-ups|Orang melewatkan pemeriksaan|受診しない人が多い|人们不做体检', 'Healthy people see no urgency.|Orang sehat tidak merasa mendesak.|健康な人は、必要性を感じない。|健康者不觉紧迫。'),
      I('risk', 'health', 'mistake', 2, 'False alarms|Alarm palsu|過剰検査・誤警報|误报', 'Screening can cause needless worry.|Skrining dapat menimbulkan kecemasan yang tak perlu.|検査が、不要な不安を招くことがある。|筛查可能引发不必要焦虑。')
    ]),
    C('curative healthcare', 'Treating illness when it appears|Mengobati saat sakit muncul|発症後の治療|病后治疗', ['preventive healthcare'], [
      I('val', 'health,pub', 'save', 2, 'No spending on healthy people|Tanpa biaya untuk orang sehat|健康な人にコストがかからない|不为健康者花钱', 'Resources go to those in need.|Sumber daya diberikan kepada yang membutuhkan.|資源が、必要な人に使われる。|资源给予需要者。'),
      I('cap', 'health', 'skill', 3, 'Focused on urgent needs|Berfokus pada kebutuhan mendesak|緊急の必要に集中|聚焦紧急需求', 'Doctors treat real symptoms.|Dokter menangani gejala nyata.|実際の症状に対応する。|医生处理真实症状。'),
      I('mkt', 'health,fin', 'money', 2, 'Revenue for providers|Pendapatan bagi penyedia|医療機関の収入|医疗机构收入', 'Treatment is a paid service.|Pengobatan adalah layanan berbayar.|治療は、収益源になる。|治疗是付费服务。'),
      I('ppl', 'health,fam', 'help', 2, 'Visible results|Hasil terlihat|成果が見える|成效可见', 'Patients see recovery.|Pasien melihat kesembuhan.|回復が、目に見える。|患者看到康复。')
    ], [
      I('cost', 'health,pub', 'expensive', 3, 'Expensive late-stage care|Perawatan stadium lanjut mahal|重症化後の治療は高額|晚期治疗昂贵', 'Advanced illness costs far more.|Penyakit lanjut jauh lebih mahal.|重症化すると、費用が大きく増える。|重症费用高得多。'),
      I('ppl', 'health,fam', 'sad', 3, 'Suffering and lost life|Penderitaan dan hilangnya hidup|苦痛と命の損失|痛苦与生命损失', 'Some conditions could have been avoided.|Sebagian kondisi bisa dihindari.|防げたはずの病気もある。|有些病本可避免。'),
      I('eff', 'health,biz', 'stop', 2, 'Lost productivity|Produktivitas hilang|生産性の損失|生产力损失', 'Sick days and disability.|Hari sakit dan disabilitas.|病欠や障害による損失。|病假与残疾。'),
      I('risk', 'health,pub', 'late', 2, 'Overloaded hospitals|Rumah sakit kewalahan|病院の逼迫|医院不堪重负', 'Crises overwhelm capacity.|Krisis membanjiri kapasitas.|危機が、受け入れ能力を超える。|危机压垮容量。')
    ]),
    C('generic drugs', 'Generic medicines|Obat generik|ジェネリック医薬品|仿制药', ['patents'], [
      I('val', 'health,fam,pub', 'cheap', 3, 'Much cheaper|Jauh lebih murah|ずっと安い|便宜得多', 'Same active ingredient, lower price.|Zat aktif sama, harga lebih rendah.|同じ有効成分で、価格は低い。|相同活性成分，价格更低。'),
      I('cap', 'health,pub', 'reach', 2, 'Wider access|Akses lebih luas|入手しやすい|可及性更高', 'More patients can afford treatment.|Lebih banyak pasien mampu berobat.|より多くの患者が、治療を受けられる。|更多患者负担得起。'),
      I('val', 'pub,health', 'save', 2, 'Saves public money|Menghemat dana publik|公的負担の軽減|节约公共资金', 'Health budgets stretch further.|Anggaran kesehatan lebih panjang.|医療予算が、より長く持つ。|医保预算更耐用。'),
      I('cap', 'health,fam', 'compete', 2, 'Price competition|Persaingan harga|価格競争|价格竞争', 'Brand makers lower their prices.|Produsen merek menurunkan harga.|先発メーカーも、価格を下げる。|品牌厂商降价。')
    ], [
      I('ppl', 'health,fam', 'trust', 3, 'Public doubts|Keraguan masyarakat|不信感|公众疑虑', 'Some patients think cheaper means weaker.|Sebagian pasien mengira murah berarti lemah.|安い=効かない、と思う人もいる。|有人认为便宜=效果差。'),
      I('risk', 'health,mfg', 'quality', 2, 'Quality variation|Variasi mutu|品質のばらつき|质量参差', 'Not all makers meet the same standard.|Tidak semua produsen memenuhi standar yang sama.|メーカーごとに、品質に差がある。|并非所有厂商同样达标。'),
      I('mkt', 'mfg,health', 'lose', 2, 'Less research funding|Dana riset berkurang|研究開発資金の減少|研发资金减少', 'Lower prices mean less money for new drugs.|Harga lebih rendah berarti lebih sedikit dana obat baru.|価格が下がると、新薬開発の資金が減る。|低价意味新药研发资金减少。'),
      I('eff', 'health', 'confuse', 2, 'Confusing names|Nama membingungkan|名前が紛らわしい|名称混乱', 'Different labels cause errors.|Label berbeda menimbulkan kesalahan.|名称が違い、取り違えやすい。|标签不同易出错。')
    ]),
    C('electronic health records', 'Electronic health records|Rekam medis elektronik|電子カルテ|电子病历', ['paper records'], [
      I('cap', 'health', 'share', 3, 'Shared patient history|Riwayat pasien yang dibagi|患者情報の共有|共享病史', 'Any doctor sees allergies and past care.|Dokter mana pun melihat alergi dan riwayat perawatan.|どの医師も、アレルギーや既往歴を確認できる。|任何医生可查看过敏与病史。'),
      I('val', 'health', 'safe', 2, 'Fewer errors|Lebih sedikit kesalahan|ミスの減少|减少错误', 'Legible, checked prescriptions.|Resep terbaca dan terperiksa.|読みやすく、チェックされた処方。|处方清晰并核查。'),
      I('eff', 'health', 'fast', 2, 'Faster service|Layanan lebih cepat|処理が速い|服务更快', 'No hunting for paper files.|Tanpa mencari berkas kertas.|紙のカルテを探さなくていい。|无需翻找纸质档案。'),
      I('cap', 'health,pub', 'data', 2, 'Data for research|Data untuk riset|研究用データ|研究数据', 'Patterns help public health.|Pola membantu kesehatan masyarakat.|傾向が、公衆衛生に役立つ。|规律助力公共卫生。')
    ], [
      I('cost', 'health', 'expensive', 3, 'Costly to set up|Mahal dipasang|導入コストが高い|部署昂贵', 'Software, hardware and training.|Perangkat lunak, keras, dan pelatihan.|ソフト・機器・研修の費用。|软硬件与培训费用。'),
      I('risk', 'health,fin', 'secret', 3, 'Privacy breaches|Pelanggaran privasi|プライバシー侵害|隐私泄露', 'Hacked records expose sensitive data.|Rekam yang diretas membuka data sensitif.|ハッキングで、機微情報が流出する。|被黑记录暴露敏感数据。'),
      I('ppl', 'health', 'tired', 2, 'Burden on doctors|Beban bagi dokter|医師の入力負担|医生负担重', 'Data entry takes time from patients.|Pengisian data mengurangi waktu untuk pasien.|入力作業が、診察時間を奪う。|录入占用诊疗时间。'),
      I('risk', 'health', 'stop', 2, 'System outages|Gangguan sistem|システム障害|系统故障', 'No system, no records.|Tanpa sistem, tanpa catatan.|システムが止まると、記録が見られない。|系统宕机则无记录。')
    ]),
    C('paper records', 'Paper records|Catatan kertas|紙の記録|纸质记录', ['electronic health records'], [
      I('val', 'health,pub,fam', 'cheap', 2, 'Low cost|Biaya rendah|低コスト|成本低', 'No software or hardware needed.|Tanpa perangkat lunak atau keras.|ソフトも機器も要らない。|无需软硬件。'),
      I('cap', 'pub,health', 'safe', 2, 'Immune to hacking|Kebal terhadap peretasan|ハッキングされない|不怕黑客', 'No remote data theft.|Tidak ada pencurian data jarak jauh.|遠隔からデータを盗まれない。|无远程窃取。'),
      I('eff', 'rural,pub', 'easy', 3, 'Works without power or signal|Berfungsi tanpa listrik atau sinyal|電源や通信なしで使える|无电无网也能用', 'Reliable in remote places.|Andal di tempat terpencil.|僻地でも確実に使える。|偏远地区也可靠。'),
      I('ppl', 'health,pub', 'know', 2, 'Familiar to staff|Dikenal staf|職員に馴染みがある|员工熟悉', 'No retraining.|Tanpa pelatihan ulang.|再研修が要らない。|无需再培训。')
    ], [
      I('risk', 'health,pub', 'lose', 3, 'Lost or damaged|Hilang atau rusak|紛失・破損|丢失或损毁', 'Fire, water and mislaying.|Kebakaran, air, dan salah taruh.|火災・水濡れ・紛失。|火灾、水浸与错放。'),
      I('eff', 'health,pub', 'slow', 3, 'Slow to find and share|Lambat dicari dan dibagi|探すのも共有も遅い|查找共享慢', 'Records cannot travel quickly.|Catatan tidak bisa berpindah cepat.|記録を素早く送れない。|记录无法快速传送。'),
      I('risk', 'health', 'mistake', 2, 'Illegible handwriting|Tulisan tangan tak terbaca|読めない手書き|字迹难辨', 'Mistakes in prescriptions.|Kesalahan dalam resep.|処方ミスの原因になる。|引发处方错误。'),
      I('cost', 'pub,health', 'space', 2, 'Storage space|Ruang penyimpanan|保管スペース|存储空间', 'Archives fill rooms.|Arsip memenuhi ruangan.|書庫が部屋を占領する。|档案占满房间。')
    ]),
    C('student loans', 'Student loans|Pinjaman mahasiswa|奨学金（貸与型）|助学贷款', ['scholarship'], [
      I('cap', 'edu,fam', 'reach', 3, 'Access to education|Akses ke pendidikan|教育へのアクセス|获得教育机会', 'Study without paying everything upfront.|Kuliah tanpa membayar semuanya di muka.|一括で払わずに学べる。|无需一次付清即可求学。'),
      I('val', 'edu,fam', 'invest', 2, 'Investment in future income|Investasi untuk penghasilan masa depan|将来の収入への投資|对未来收入的投资', 'Degrees often raise lifetime pay.|Gelar sering menaikkan penghasilan seumur hidup.|学位は、生涯賃金を高めることが多い。|学位常提升终身收入。'),
      I('ppl', 'edu,fam', 'free', 2, 'Independence|Kemandirian|経済的自立|独立', 'Less reliance on family money.|Kurang bergantung pada uang keluarga.|家族の資金に頼らずに済む。|减少对家庭资金依赖。'),
      I('val', 'edu,fin', 'plan', 2, 'Income-linked repayment|Pembayaran terkait penghasilan|所得連動型返済|收入挂钩还款', 'Some plans adjust to pay.|Sebagian skema menyesuaikan dengan gaji.|収入に合わせて返す制度もある。|部分方案随收入调整。')
    ], [
      I('risk', 'edu,fam', 'debt', 3, 'Years of debt|Utang bertahun-tahun|長期の借金|多年负债', 'Repayment starts before stable income.|Cicilan dimulai sebelum penghasilan stabil.|収入が安定する前から返済が始まる。|收入稳定前就要还款。'),
      I('cost', 'edu,fam', 'interest', 2, 'Interest|Bunga|利息|利息', 'Total repaid exceeds the amount borrowed.|Total pembayaran melebihi pinjaman.|返す総額が、借りた額を超える。|还款总额超过本金。'),
      I('ppl', 'edu,fam', 'stress', 2, 'Delayed life choices|Pilihan hidup tertunda|人生設計の遅れ|人生选择被推迟', 'Home, family and risks wait.|Rumah, keluarga, dan risiko tertunda.|住宅・家族・挑戦が遅れる。|购房、成家与冒险被推迟。'),
      I('risk', 'edu,fam', 'fail', 2, 'Debt without a degree|Utang tanpa ijazah|学位なしの借金|负债无学位', 'Dropping out leaves the loan.|Putus kuliah menyisakan pinjaman.|中退しても、借金は残る。|辍学后贷款仍在。')
    ]),
    C('scholarship', 'Scholarship|Beasiswa|給付型奨学金|奖学金', ['student loans'], [
      I('val', 'edu,fam', 'free', 3, 'No repayment|Tanpa pengembalian|返済不要|无需偿还', 'Education without debt.|Pendidikan tanpa utang.|借金なしで学べる。|无债求学。'),
      I('mkt', 'edu', 'name', 2, 'Prestige|Prestise|名誉|声望', 'Recognition on your record.|Pengakuan pada rekam jejak Anda.|経歴に、評価が付く。|履历上的认可。'),
      I('ppl', 'edu,fam', 'proud', 2, 'Motivation|Motivasi|意欲の向上|激励', 'Merit is rewarded.|Prestasi dihargai.|努力が報われる。|成绩获奖励。'),
      I('cap', 'edu', 'network', 2, 'Network and opportunities|Jaringan dan peluang|人脈と機会|人脉与机会', 'Donors and alumni connect you.|Donor dan alumni menghubungkan Anda.|支援者や卒業生とつながれる。|结识资助者与校友。')
    ], [
      I('eff', 'edu', 'compete', 3, 'Fierce competition|Persaingan ketat|競争が激しい|竞争激烈', 'Few awards, many applicants.|Sedikit beasiswa, banyak pelamar.|枠は少なく、応募者は多い。|名额少申请多。'),
      I('eff', 'edu', 'rules', 2, 'Strings attached|Ada syarat|条件付き|附带条件', 'Grades, service or work commitments.|Nilai, pengabdian, atau ikatan kerja.|成績・奉仕・勤務義務が付く。|成绩、服务或工作义务。'),
      I('risk', 'edu', 'lose', 2, 'Can be withdrawn|Bisa dicabut|取り消されることがある|可能被取消', 'Slipping grades can end funding.|Nilai turun bisa menghentikan dana.|成績が落ちると、打ち切られる。|成绩下滑可能停止资助。'),
      I('ppl', 'edu', 'stress', 2, 'Pressure to perform|Tekanan untuk berprestasi|成果へのプレッシャー|业绩压力', 'Constant fear of losing it.|Takut terus-menerus kehilangannya.|失う不安が、常につきまとう。|常担心失去。')
    ]),
    C('standardized testing', 'Standardised testing|Ujian terstandar|標準テスト|标准化考试', ['classroom learning'], [
      I('cap', 'edu,pub', 'fair', 3, 'Comparable results|Hasil yang dapat dibandingkan|比較可能な結果|结果可比', 'Same test, same scale.|Ujian sama, skala sama.|同じテスト、同じ基準。|同一考试同一标尺。'),
      I('eff', 'edu,pub', 'fast', 2, 'Efficient to run|Efisien dijalankan|効率的に実施できる|实施高效', 'Thousands tested at once.|Ribuan peserta diuji sekaligus.|数千人を一度に測れる。|数千人同时考试。'),
      I('val', 'edu,pub', 'find', 2, 'Spots weak schools|Menemukan sekolah yang lemah|弱い学校を発見|发现薄弱学校', 'Data directs help to where it is needed.|Data mengarahkan bantuan ke tempat yang membutuhkan.|データが、支援の必要な場所を示す。|数据指引援助方向。'),
      I('mkt', 'edu,biz', 'proof', 2, 'Objective entry criteria|Kriteria masuk objektif|客観的な選抜基準|客观录取标准', 'Reduces favouritism.|Mengurangi pilih kasih.|えこひいきを減らす。|减少偏袒。')
    ], [
      I('risk', 'edu', 'narrow', 3, 'Teaching to the test|Mengajar demi ujian|テスト対策に偏る|应试教学', 'Creativity and deep learning suffer.|Kreativitas dan pembelajaran mendalam menurun.|創造性や深い学びが損なわれる。|创造力与深度学习受损。'),
      I('ppl', 'edu', 'stress', 3, 'Stress and anxiety|Stres dan kecemasan|ストレスと不安|压力与焦虑', 'Single exams carry huge weight.|Satu ujian memiliki bobot besar.|1回の試験が重すぎる。|一场考试分量过重。'),
      I('ppl', 'edu,pub', 'unfair', 2, 'Inequality|Ketimpangan|格差|不平等', 'Wealthier students buy coaching.|Siswa kaya membeli bimbingan.|裕福な生徒は、塾で有利になる。|富裕学生靠补习占优。'),
      I('risk', 'edu', 'blind', 2, 'Misses real abilities|Melewatkan kemampuan nyata|本当の能力を測れない|无法衡量真实能力', 'Teamwork and character are unmeasured.|Kerja sama dan karakter tidak terukur.|協調性や人柄は、測れない。|团队合作与品格无法衡量。')
    ]),
    C('internship', 'Internships|Magang|インターンシップ|实习', ['classroom learning'], [
      I('cap', 'edu,biz', 'skill', 3, 'Real work experience|Pengalaman kerja nyata|実務経験|真实工作经验', 'Practice what you learned.|Mempraktikkan yang dipelajari.|学んだことを、実践できる。|实践所学。'),
      I('mkt', 'edu,biz', 'network', 2, 'Contacts and references|Kontak dan referensi|人脈と推薦|人脉与推荐', 'Employers get to know you.|Pemberi kerja mengenal Anda.|企業に、自分を知ってもらえる。|雇主了解你。'),
      I('cap', 'biz,edu', 'find', 2, 'Try before committing|Mencoba sebelum berkomitmen|適性を確かめられる|先试后定', 'Learn if the field suits you.|Ketahui apakah bidang itu cocok.|その分野が合うか、確かめられる。|了解是否适合该领域。'),
      I('val', 'biz,edu', 'job', 2, 'Path to a job offer|Jalan menuju tawaran kerja|内定への道|通向录用', 'Many hires come from interns.|Banyak karyawan berasal dari magang.|インターンから採用になることが多い。|很多人由实习转正。')
    ], [
      I('ppl', 'edu,fam', 'poor', 3, 'Unpaid or low pay|Tidak dibayar atau gaji rendah|無給・低賃金|无薪或低薪', 'Only those who can afford it can join.|Hanya yang mampu yang dapat ikut.|余裕のある人しか参加できない。|只有负担得起者才能参加。'),
      I('risk', 'biz,pub', 'cheat', 2, 'Exploitation|Eksploitasi|搾取|剥削', 'Cheap labour with little learning.|Tenaga murah dengan sedikit pembelajaran.|安い労働力として、使われる。|廉价劳动少有学习。'),
      I('eff', 'edu,biz', 'noise', 2, 'Boring tasks|Tugas membosankan|単純作業|枯燥任务', 'Coffee runs and copying.|Mengambil kopi dan memfotokopi.|お茶くみやコピー取り。|端茶复印。'),
      I('eff', 'edu', 'time', 2, 'Competes with study|Bersaing dengan kuliah|学業との両立|与学业冲突', 'Time and energy are limited.|Waktu dan tenaga terbatas.|時間と体力に限りがある。|时间精力有限。')
    ]),
    C('vocational education', 'Vocational education|Pendidikan vokasi|職業教育|职业教育', ['classroom learning'], [
      I('cap', 'edu,mfg,biz', 'skill', 3, 'Job-ready skills|Keterampilan siap kerja|即戦力のスキル|就业技能', 'Training matches industry needs.|Pelatihan sesuai kebutuhan industri.|産業界の需要に合った訓練。|培训对接产业需求。'),
      I('ppl', 'edu,mfg', 'job', 3, 'Quick entry to work|Cepat masuk dunia kerja|早く働ける|快速就业', 'Employed sooner, earning sooner.|Lebih cepat bekerja dan menghasilkan.|早く就職し、早く稼ぐ。|早就业早赚钱。'),
      I('val', 'edu,fam', 'cheap', 2, 'Lower cost than university|Biaya lebih rendah daripada universitas|大学より安い|比大学便宜', 'Shorter and cheaper study.|Studi lebih singkat dan murah.|学ぶ期間も費用も、少ない。|学时短且费用低。'),
      I('cap', 'mfg,biz', 'new', 2, 'Strong industry links|Hubungan industri kuat|産業界とのつながり|行业联系紧密', 'Employers help shape courses.|Pemberi kerja ikut membentuk kurikulum.|企業が、カリキュラムに関わる。|雇主参与课程设计。')
    ], [
      I('ppl', 'edu,pub', 'stuck', 3, 'Social stigma|Stigma sosial|社会的な偏見|社会偏见', 'Seen as second best.|Dianggap pilihan kedua.|二流と見られがち。|被视为次选。'),
      I('risk', 'edu,mfg', 'old', 2, 'Narrow skills may expire|Keterampilan sempit bisa usang|狭い技能が陳腐化|窄技能可能过时', 'Technology can change the trade.|Teknologi dapat mengubah bidang itu.|技術の進歩で、仕事が変わる。|技术可能改变行业。'),
      I('cap', 'edu', 'limit', 2, 'Limited further study|Studi lanjut terbatas|進学の道が狭い|深造受限', 'Harder to move to university later.|Lebih sulit pindah ke universitas kemudian.|後から大学に進みにくい。|日后升大学较难。'),
      I('cost', 'edu,mfg', 'expensive', 2, 'Equipment costs|Biaya peralatan|設備費|设备成本', 'Workshops and machines are expensive.|Bengkel dan mesin mahal.|実習設備に、費用がかかる。|实训场地与设备昂贵。')
    ])
  );
})();
