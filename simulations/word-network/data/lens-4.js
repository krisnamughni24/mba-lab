/* Word Network: curated concepts, batch 4 (marketing and sales). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('influencer marketing', 'Influencer marketing|Pemasaran influencer|インフルエンサーマーケティング|网红营销', ['advertising'], [
      I('mkt', 'retail,food,biz', 'trust', 3, 'Borrowed trust|Kepercayaan pinjaman|借りた信頼|借来的信任', 'Followers trust the creator more than an ad.|Pengikut lebih percaya kreator daripada iklan.|フォロワーは広告より発信者を信じる。|粉丝更信任创作者而非广告。'),
      I('mkt', 'retail,food', 'young', 2, 'Reaches niche audiences|Menjangkau audiens khusus|特定層に届く|触达细分受众', 'Creators have focused, engaged communities.|Kreator punya komunitas yang fokus dan aktif.|発信者は、熱心な特定のコミュニティを持つ。|创作者拥有聚焦且活跃的社群。'),
      I('val', 'retail,food', 'cheap', 2, 'Flexible budgets|Anggaran fleksibel|予算を調整しやすい|预算灵活', 'Small creators cost far less than TV.|Kreator kecil jauh lebih murah dari TV.|小規模な発信者なら、テレビよりずっと安い。|小创作者比电视便宜得多。'),
      I('mkt', 'retail,biz', 'story', 2, 'Authentic content|Konten autentik|自然なコンテンツ|内容真实自然', 'Reviews in a real voice feel genuine.|Ulasan dengan suara asli terasa tulus.|等身大の口調のレビューは、本物らしく見える。|真实口吻的评测显得可信。')
    ], [
      I('risk', 'retail,food', 'trust', 3, 'Fake followers and ads|Pengikut palsu dan iklan|フォロワー水増し|虚假粉丝', 'Numbers can be bought and results overstated.|Angka bisa dibeli dan hasil dibesar-besarkan.|数字は買え、成果は盛られがち。|数据可以买，效果被夸大。'),
      I('risk', 'retail,food', 'scandal', 3, 'Reputation risk|Risiko reputasi|評判リスク|声誉风险', 'A creator scandal splashes onto your brand.|Skandal kreator ikut mencoreng merek Anda.|発信者の炎上が、ブランドに飛び火する。|创作者丑闻会牵连品牌。'),
      I('eff', 'retail,biz', 'hard', 2, 'Hard to measure|Sulit diukur|効果測定が難しい|难以衡量', 'Likes do not always become sales.|Like tidak selalu menjadi penjualan.|いいねが、売上につながるとは限らない。|点赞未必转化为销售。'),
      I('cost', 'retail,food', 'expensive', 2, 'Big names are costly|Nama besar mahal|大物は高額|大牌价格高', 'Top creators charge high fees.|Kreator papan atas memasang tarif tinggi.|人気の発信者は、報酬が高い。|顶级创作者收费昂贵。')
    ]),
    C('advertising', 'Advertising|Periklanan|広告|广告', ['word of mouth'], [
      I('mkt', 'retail,food,biz', 'reach', 3, 'Wide reach|Jangkauan luas|広いリーチ|覆盖面广', 'One message reaches many people quickly.|Satu pesan menjangkau banyak orang dengan cepat.|1つのメッセージが、多くの人に素早く届く。|一条信息快速触达很多人。'),
      I('mkt', 'retail,food', 'name', 3, 'Builds awareness|Membangun kesadaran|認知の向上|提高知名度', 'People learn your name before they need you.|Orang mengenal nama Anda sebelum membutuhkan.|必要になる前から、名前を知ってもらえる。|人们在需要前就认识你。'),
      I('cap', 'biz,retail', 'control', 2, 'You control the message|Anda mengendalikan pesan|メッセージを管理できる|可控制信息', 'Wording, timing and place are your choice.|Kata-kata, waktu, dan tempat Anda yang pilih.|文言・時期・場所を、自分で決められる。|措辞、时间、地点由你决定。'),
      I('val', 'retail,mfg', 'profit', 2, 'Sales boost|Dorongan penjualan|売上の押し上げ|提升销量', 'Good campaigns lift sales for a while.|Kampanye bagus mengangkat penjualan untuk sementara.|良い広告は、一定期間の売上を押し上げる。|好活动在一段时间内提振销量。')
    ], [
      I('cost', 'retail,food,biz', 'expensive', 3, 'High cost|Biaya tinggi|費用が高い|成本高', 'Media and production eat the budget.|Media dan produksi menghabiskan anggaran.|媒体費と制作費が、予算を圧迫する。|媒体和制作费吞噬预算。'),
      I('mkt', 'retail,food', 'ignore', 3, 'Ignored or skipped|Diabaikan atau dilewati|無視・スキップされる|被忽略或跳过', 'People tune out ads or block them.|Orang mengabaikan atau memblokir iklan.|広告は、無視されたりブロックされたりする。|人们无视或屏蔽广告。'),
      I('eff', 'retail,biz', 'hard', 2, 'Hard to prove returns|Sulit membuktikan hasil|効果の証明が難しい|回报难证明', 'Half of ad money is wasted, but which half?|Separuh uang iklan terbuang, tetapi yang mana?|広告費の半分は無駄だが、どの半分か分からない。|一半广告费浪费了，但不知是哪一半。'),
      I('risk', 'retail,food', 'trust', 2, 'Low credibility|Kredibilitas rendah|信頼性が低い|可信度低', 'Buyers know ads are paid to praise.|Pembeli tahu iklan dibayar untuk memuji.|買い手は、広告が褒めるためのものだと知っている。|买家知道广告是花钱来夸的。')
    ]),
    C('word of mouth', 'Word of mouth|Dari mulut ke mulut|口コミ|口碑', ['advertising'], [
      I('mkt', 'retail,food,health', 'trust', 3, 'High credibility|Kredibilitas tinggi|信頼性が高い|可信度高', 'Friends are believed more than companies.|Teman lebih dipercaya daripada perusahaan.|友人の言葉は、企業の言葉より信じられる。|朋友比公司更可信。'),
      I('val', 'retail,food', 'free', 3, 'Free promotion|Promosi gratis|無料の宣伝|免费推广', 'Happy customers market for you.|Pelanggan puas mempromosikan Anda.|満足した顧客が、代わりに宣伝してくれる。|满意的客户替你宣传。'),
      I('mkt', 'retail,food', 'loyal', 2, 'Better-fit customers|Pelanggan lebih cocok|相性の良い顧客|客户更匹配', 'Referred buyers tend to stay longer.|Pembeli rujukan cenderung bertahan lebih lama.|紹介された顧客は、長く続きやすい。|被推荐的买家往往留存更久。'),
      I('cap', 'retail,food,health', 'name', 2, 'Strong reputation|Reputasi kuat|評判が高まる|声誉稳固', 'A good name opens doors by itself.|Nama baik membuka pintu dengan sendirinya.|良い評判が、自然と道を開く。|好名声自己会开门。')
    ], [
      I('eff', 'retail,food', 'slow', 3, 'Slow and uncontrollable|Lambat dan sulit dikendalikan|遅くて制御できない|缓慢且不可控', 'You cannot speed it up or steer it.|Anda tidak bisa mempercepat atau mengarahkannya.|速めることも、方向づけることもできない。|你无法加速或引导它。'),
      I('risk', 'retail,food,health', 'bad', 3, 'Bad news travels faster|Kabar buruk menyebar lebih cepat|悪い噂ほど速い|坏消息传得更快', 'One angry customer can outweigh ten happy ones.|Satu pelanggan marah bisa mengalahkan sepuluh yang puas.|怒った1人が、満足した10人を上回ることがある。|一个愤怒的客户可能抵消十个满意的。'),
      I('eff', 'retail,biz', 'hard', 2, 'Hard to measure|Sulit diukur|測りにくい|难以衡量', 'You cannot see who told whom.|Anda tidak bisa melihat siapa memberi tahu siapa.|誰が誰に伝えたかが見えない。|看不到谁告诉了谁。'),
      I('risk', 'retail,mfg', 'depend', 2, 'Depends on quality|Bergantung pada kualitas|品質次第|取决于质量', 'It only works if the product is truly good.|Hanya berhasil jika produknya benar-benar bagus.|製品が本当に良くなければ、機能しない。|只有产品确实好才奏效。')
    ]),
    C('seo', 'Search engine optimisation (SEO)|Optimasi mesin pencari (SEO)|SEO（検索エンジン最適化）|搜索引擎优化（SEO）', ['advertising'], [
      I('mkt', 'retail,biz,edu', 'find', 3, 'Found by people already looking|Ditemukan orang yang sudah mencari|探している人に見つかる|被主动搜索者找到', 'Visitors come with clear intent.|Pengunjung datang dengan niat jelas.|訪問者は、明確な目的を持って来る。|访客带着明确意图而来。'),
      I('val', 'retail,biz', 'free', 2, 'No per-click fee|Tanpa biaya per klik|クリック課金なし|无需按点击付费', 'Traffic keeps coming without paying each visit.|Lalu lintas terus datang tanpa membayar tiap kunjungan.|訪問ごとに払わなくても、アクセスが続く。|无需为每次访问付费，流量持续而来。'),
      I('mkt', 'biz,retail', 'trust', 2, 'Credibility|Kredibilitas|信頼性|可信度', 'Top organic results are trusted more than ads.|Hasil organik teratas lebih dipercaya daripada iklan.|検索上位は、広告より信頼されやすい。|自然搜索靠前结果比广告更可信。'),
      I('cap', 'biz,retail', 'long', 2, 'Long-term asset|Aset jangka panjang|長期的な資産|长期资产', 'Good pages keep working for years.|Halaman bagus terus bekerja bertahun-tahun.|良いページは、何年も働き続ける。|好页面可持续数年发挥作用。')
    ], [
      I('eff', 'biz,retail', 'slow', 3, 'Slow results|Hasil lambat|成果が出るまで遅い|见效慢', 'It can take months before rankings move.|Bisa butuh berbulan-bulan sebelum peringkat bergerak.|順位が動くまで、数か月かかることがある。|排名可能数月才变动。'),
      I('risk', 'biz,retail', 'change', 3, 'Search rules change|Aturan mesin pencari berubah|検索ルールの変更|搜索规则变化', 'An algorithm update can erase your ranking.|Pembaruan algoritma dapat menghapus peringkat Anda.|アルゴリズム更新で、順位が一気に消えることがある。|算法更新可能抹掉你的排名。'),
      I('mkt', 'retail,biz', 'compete', 2, 'Crowded competition|Persaingan padat|競争が激しい|竞争拥挤', 'Everyone wants the same top spots.|Semua orang mengincar posisi teratas yang sama.|誰もが同じ上位枠を狙っている。|人人都想要同样的榜首位置。'),
      I('eff', 'biz,mfg', 'skill', 2, 'Needs expertise|Butuh keahlian|専門知識が必要|需要专业技能', 'Technical and content skills are both needed.|Keahlian teknis dan konten sama-sama dibutuhkan.|技術とコンテンツの両方の知識が要る。|技术与内容技能缺一不可。')
    ]),
    C('content marketing', 'Content marketing|Pemasaran konten|コンテンツマーケティング|内容营销', ['advertising'], [
      I('mkt', 'biz,edu,retail', 'trust', 3, 'Builds authority|Membangun otoritas|専門性の確立|建立权威', 'Useful content shows you know your field.|Konten bermanfaat menunjukkan Anda menguasai bidangnya.|役立つ情報が、その道の専門家だと示す。|有用内容表明你精通领域。'),
      I('mkt', 'biz,retail', 'loyal', 2, 'Lasting relationships|Hubungan yang bertahan|長期的な関係|长期关系', 'Audiences return for more.|Audiens kembali untuk lebih banyak.|読者が、続きを求めて戻ってくる。|受众会回来看更多。'),
      I('val', 'biz,retail', 'long', 2, 'Compounds over time|Menumpuk seiring waktu|積み上がる効果|长期复利', 'Old articles and videos keep attracting visitors.|Artikel dan video lama terus menarik pengunjung.|過去の記事や動画が、ずっと集客してくれる。|旧文章与视频持续引流。'),
      I('cap', 'edu,biz', 'teach', 2, 'Educates buyers|Mengedukasi pembeli|顧客を教育する|教育买家', 'Informed buyers decide faster and complain less.|Pembeli yang paham memutuskan lebih cepat dan jarang mengeluh.|理解した顧客は、決断が早く不満も少ない。|懂行的买家决策更快、抱怨更少。')
    ], [
      I('eff', 'biz,retail', 'time', 3, 'Takes lots of time|Memakan banyak waktu|時間がかかる|耗时多', 'Regular quality output is hard to sustain.|Menjaga keluaran berkualitas secara rutin itu sulit.|質の高い発信を続けるのは大変。|持续产出高质量内容很难。'),
      I('eff', 'biz,retail', 'slow', 2, 'Slow payoff|Hasil lambat|効果が出るまで遅い|回报慢', 'Sales rarely follow the first posts.|Penjualan jarang mengikuti unggahan pertama.|最初の投稿で、売上が出ることはまれ。|首批内容很少带来销售。'),
      I('risk', 'biz,retail', 'noise', 2, 'Drowned in noise|Tenggelam dalam keramaian|情報の洪水に埋もれる|淹没在信息洪流中', 'Everyone publishes, few get read.|Semua orang menerbitkan, sedikit yang dibaca.|誰もが発信し、読まれるのはわずか。|人人发布，少有人看。'),
      I('cost', 'biz,retail', 'expensive', 2, 'Hidden costs|Biaya tersembunyi|見えにくいコスト|隐性成本', 'Writers, designers and tools add up.|Penulis, desainer, dan alat menambah biaya.|ライター・デザイナー・ツールの費用がかさむ。|写手、设计师与工具的费用累积。')
    ]),
    C('brand extension', 'Brand extension|Perluasan merek|ブランド拡張|品牌延伸', ['diversification'], [
      I('mkt', 'retail,food,mfg', 'name', 3, 'Instant recognition|Langsung dikenal|すぐ認知される|立即被认知', 'A known name lowers the cost of launching.|Nama yang dikenal menurunkan biaya peluncuran.|知られた名前が、発売コストを下げる。|知名品牌降低上市成本。'),
      I('mkt', 'retail,food', 'trust', 2, 'Borrowed trust|Kepercayaan terbawa|信頼の転用|信任迁移', 'Customers try new items from a brand they trust.|Pelanggan mencoba produk baru dari merek yang mereka percaya.|信頼するブランドの新商品なら、試してもらいやすい。|客户愿意尝试信任品牌的新品。'),
      I('val', 'retail,mfg', 'save', 2, 'Cheaper launches|Peluncuran lebih murah|低コストで発売|发布更省钱', 'Less advertising is needed than for a new brand.|Iklan yang dibutuhkan lebih sedikit daripada merek baru.|新ブランドより、広告費が少なくて済む。|比新品牌需要更少广告。'),
      I('val', 'retail,mfg', 'spread', 2, 'Spreads risk|Menyebar risiko|リスクの分散|分散风险', 'More product lines reduce dependence on one.|Lebih banyak lini produk mengurangi ketergantungan pada satu.|商品ラインが増え、1つへの依存が減る。|产品线增多，减少对单一产品的依赖。')
    ], [
      I('risk', 'retail,food,mfg', 'dilute', 3, 'Dilutes the brand|Mengaburkan merek|ブランドの希薄化|稀释品牌', 'A stretch too far confuses buyers.|Perluasan yang terlalu jauh membingungkan pembeli.|広げすぎると、買い手が混乱する。|延伸过远会让买家困惑。'),
      I('risk', 'retail,food', 'fail', 3, 'Failure harms the parent|Kegagalan merugikan induk|失敗が本体を傷つける|失败伤及母品牌', 'A bad new product tarnishes the main brand.|Produk baru yang buruk mencoreng merek utama.|失敗した新商品が、本体のブランドを汚す。|新品失败会污染主品牌。'),
      I('mkt', 'retail,mfg', 'cannibal', 2, 'Cannibalises sales|Memakan penjualan sendiri|自社製品の共食い|自相蚕食', 'New items steal sales from old ones.|Produk baru merebut penjualan produk lama.|新商品が、既存商品の売上を奪う。|新品抢走旧品销量。'),
      I('eff', 'retail,mfg', 'focus', 2, 'Loss of focus|Fokus hilang|焦点がぼやける|失去聚焦', 'Attention spreads thin across too many lines.|Perhatian terpecah ke terlalu banyak lini.|多くの商品に、注意が分散する。|注意力被过多产品线分散。')
    ]),
    C('rebranding', 'Rebranding|Rebranding|リブランディング|品牌重塑', ['brand extension'], [
      I('mkt', 'retail,food,biz', 'new', 3, 'Fresh image|Citra segar|新しいイメージ|焕然一新', 'A new look can reach new audiences.|Tampilan baru dapat menjangkau audiens baru.|新しい見た目で、新しい層に届く。|新形象可触达新受众。'),
      I('cap', 'biz,retail', 'leave', 2, 'Escapes a bad past|Lepas dari masa lalu buruk|悪評からの脱却|摆脱不良过往', 'A scandal or outdated image can be left behind.|Skandal atau citra usang bisa ditinggalkan.|不祥事や古いイメージを、置き去りにできる。|可摆脱丑闻或过时形象。'),
      I('cap', 'biz,retail', 'direction', 2, 'Aligns with strategy|Selaras dengan strategi|戦略との整合|与战略一致', 'The name and look match where the company is going.|Nama dan tampilan sesuai arah perusahaan.|名前や見た目が、会社の進む方向に合う。|名称与形象契合公司方向。'),
      I('ppl', 'biz,pub', 'team', 2, 'Renewed energy|Semangat baru|社内の活性化|重燃士气', 'Staff feel a fresh start.|Staf merasakan awal yang baru.|社員が、新たな出発を感じられる。|员工感到焕然一新。')
    ], [
      I('cost', 'retail,biz', 'expensive', 3, 'High cost|Biaya tinggi|費用が高い|成本高', 'Signs, packaging, systems and campaigns all change.|Papan nama, kemasan, sistem, dan kampanye semuanya berubah.|看板・包装・システム・広告のすべてが変わる。|招牌、包装、系统和宣传都要改。'),
      I('risk', 'retail,food', 'lose', 3, 'Loses recognition|Kehilangan pengenalan|認知を失う|丧失辨识度', 'Loyal customers may not recognise you.|Pelanggan setia mungkin tidak mengenali Anda.|常連客が、気づかなくなるかもしれない。|老客户可能认不出你。'),
      I('ppl', 'retail,food', 'anger', 2, 'Backlash|Reaksi negatif|反発を招く|引发反弹', 'People often dislike change for its own sake.|Orang sering tidak suka perubahan itu sendiri.|変化そのものを嫌う人も多い。|很多人本能排斥变化。'),
      I('risk', 'biz,retail', 'fail', 2, 'Cosmetic only|Hanya kosmetik|見た目だけの変更|只是表面功夫', 'A new logo does not fix a weak product.|Logo baru tidak memperbaiki produk yang lemah.|ロゴを変えても、弱い商品は直らない。|新 Logo 不能修复差产品。')
    ]),
    C('private label', 'Private label|Merek sendiri (private label)|プライベートブランド|自有品牌', ['brand extension'], [
      I('val', 'retail,food', 'profit', 3, 'Higher margins|Margin lebih tinggi|利益率が高い|利润率更高', 'No brand owner takes a share of the price.|Tidak ada pemilik merek yang mengambil bagian harga.|ブランド企業に取り分を渡さなくて済む。|无需与品牌方分成。'),
      I('mkt', 'retail,food', 'loyal', 2, 'Customer loyalty|Loyalitas pelanggan|顧客の囲い込み|客户忠诚', 'Shoppers can only buy that product in your store.|Pembeli hanya bisa membeli produk itu di toko Anda.|その商品は、自店でしか買えない。|买家只能在你店里买到。'),
      I('cap', 'retail,mfg', 'control', 2, 'Control over product|Kendali atas produk|商品の管理|掌控产品', 'You set the specs, packaging and price.|Anda menentukan spesifikasi, kemasan, dan harga.|仕様・包装・価格を、自分で決められる。|规格、包装与价格由你定。'),
      I('mkt', 'retail,food', 'cheap', 2, 'Value image|Citra hemat|お得なイメージ|性价比形象', 'Buyers see good quality for less.|Pembeli melihat kualitas bagus dengan harga lebih murah.|買い手に、安くて良いという印象を与える。|买家觉得物美价廉。')
    ], [
      I('risk', 'retail,food,mfg', 'lose', 3, 'Quality is your problem|Kualitas jadi tanggung jawab Anda|品質の責任を負う|质量责任在你', 'If it fails, customers blame your store.|Jika gagal, pelanggan menyalahkan toko Anda.|問題があれば、顧客は店を責める。|出问题客户会怪你的店。'),
      I('cost', 'retail,mfg', 'money', 2, 'Upfront investment|Investasi awal|先行投資|前期投入', 'Design, minimum orders and stock tie up cash.|Desain, pesanan minimum, dan stok menahan kas.|設計・最低発注・在庫で資金が固定される。|设计、最小订量和库存占用现金。'),
      I('mkt', 'retail,food', 'cheap', 2, 'Cheap image|Citra murahan|安っぽく見える|显得廉价', 'Some shoppers still prefer famous brands.|Sebagian pembeli tetap memilih merek terkenal.|有名ブランドを好む客も多い。|部分顾客仍偏爱知名品牌。'),
      I('risk', 'retail,mfg', 'depend', 2, 'Supplier dependence|Ketergantungan pemasok|製造先への依存|依赖供应商', 'One maker supplying you can hold you hostage.|Satu pembuat yang memasok Anda dapat menyandera Anda.|1社の製造元に頼ると、立場が弱くなる。|依赖单一代工厂会受制于人。')
    ]),
    C('ecommerce', 'E-commerce|E-commerce|eコマース|电子商务', ['physical store'], [
      I('mkt', 'retail,food,biz', 'reach', 3, 'Reaches far away|Menjangkau jauh|遠くの顧客に届く|触达远方客户', 'Customers can buy from any city.|Pelanggan bisa membeli dari kota mana pun.|どの街の顧客でも買える。|任何城市的客户都能下单。'),
      I('val', 'retail,food', 'time', 2, 'Always open|Selalu buka|24時間営業|全天营业', 'Orders arrive at night and on holidays.|Pesanan datang malam hari dan hari libur.|夜間や休日にも注文が入る。|夜晚与假日也有订单。'),
      I('cap', 'retail,biz', 'data', 2, 'Rich customer data|Data pelanggan kaya|豊富な顧客データ|丰富客户数据', 'Every click shows what people want.|Setiap klik menunjukkan apa yang diinginkan orang.|あらゆるクリックが、顧客の関心を示す。|每次点击都显示人们的需求。'),
      I('val', 'retail,biz', 'save', 2, 'Lower fixed costs|Biaya tetap lebih rendah|固定費が低い|固定成本更低', 'No expensive shop rent or many staff.|Tanpa sewa toko mahal atau banyak staf.|高い店舗家賃や多くの店員が要らない。|无需高昂店租和大量店员。')
    ], [
      I('mkt', 'retail,food', 'compete', 3, 'Fierce competition|Persaingan ketat|競争が激しい|竞争激烈', 'Rivals are one click away.|Pesaing hanya berjarak satu klik.|競合は、クリック1つの距離にいる。|对手只隔一次点击。'),
      I('cost', 'retail,food', 'expensive', 2, 'Shipping and returns|Pengiriman dan retur|配送と返品のコスト|运费与退货', 'Delivery costs and returns eat margins.|Biaya kirim dan retur menggerus margin.|配送と返品が、利益を圧迫する。|配送与退货侵蚀利润。'),
      I('risk', 'retail,mfg', 'trust', 2, 'Trust and fraud|Kepercayaan dan penipuan|信頼と詐欺|信任与欺诈', 'Buyers cannot touch the product, and scams exist.|Pembeli tidak bisa menyentuh produk, dan penipuan ada.|実物に触れられず、詐欺も存在する。|买家无法接触实物，且存在欺诈。'),
      I('cost', 'retail,biz', 'money', 2, 'Paying for traffic|Membayar untuk lalu lintas|集客コスト|引流成本', 'Ads and platform fees are ongoing costs.|Iklan dan biaya platform adalah biaya berkelanjutan.|広告費やプラットフォーム手数料が、継続的にかかる。|广告与平台费用持续发生。')
    ]),
    C('physical store', 'Physical store|Toko fisik|実店舗|实体店', ['ecommerce'], [
      I('mkt', 'retail,food', 'touch', 3, 'Touch and try|Menyentuh dan mencoba|触って試せる|可触摸试用', 'Customers see, feel and test before buying.|Pelanggan melihat, merasakan, dan mencoba sebelum membeli.|買う前に、見て触って試せる。|客户购买前可看、摸、试。'),
      I('mkt', 'retail,food', 'trust', 2, 'Builds trust|Membangun kepercayaan|信頼を築ける|建立信任', 'A real place and real people reassure buyers.|Tempat dan orang nyata menenangkan pembeli.|実在する場所と人が、買い手を安心させる。|真实的场所与人让买家放心。'),
      I('val', 'retail,food', 'now', 2, 'Instant purchase|Pembelian instan|その場で購入|即买即得', 'Customers leave with the goods immediately.|Pelanggan pulang membawa barang langsung.|買ったその場で、持ち帰れる。|客户当场带走商品。'),
      I('ppl', 'retail,food,health', 'friend', 2, 'Personal service|Layanan personal|対面のサービス|个性化服务', 'Staff can advise and build relationships.|Staf dapat memberi saran dan membangun hubungan.|店員が助言でき、関係も築ける。|店员可提供建议并建立关系。')
    ], [
      I('cost', 'retail,food', 'expensive', 3, 'High fixed costs|Biaya tetap tinggi|固定費が高い|固定成本高', 'Rent, staff and utilities continue even on slow days.|Sewa, staf, dan listrik tetap jalan walau sepi.|客が少ない日も、家賃・人件費・光熱費がかかる。|淡日也要付租金、人工与水电。'),
      I('mkt', 'retail,food', 'limit', 3, 'Limited reach|Jangkauan terbatas|商圏が限られる|覆盖有限', 'You only serve people who can come.|Anda hanya melayani orang yang bisa datang.|来られる人にしか、売れない。|只能服务到得了店的人。'),
      I('risk', 'retail,food', 'lose', 2, 'Location risk|Risiko lokasi|立地リスク|选址风险', 'A wrong spot or a road change can hurt badly.|Lokasi salah atau perubahan jalan bisa sangat merugikan.|立地を誤ると、大きな痛手になる。|选址错误或道路变动影响巨大。'),
      I('eff', 'retail,food', 'time', 2, 'Opening hours limit sales|Jam buka membatasi penjualan|営業時間の制約|营业时间限制销售', 'No staff, no sales.|Tanpa staf, tidak ada penjualan.|店員がいなければ、売れない。|没人值守就没销售。')
    ]),
    C('omnichannel', 'Omnichannel|Omnichannel|オムニチャネル|全渠道', ['ecommerce'], [
      I('mkt', 'retail,food', 'customer', 3, 'Seamless experience|Pengalaman mulus|シームレスな体験|无缝体验', 'Customers switch between app, web and store freely.|Pelanggan berpindah antara aplikasi, web, dan toko dengan bebas.|アプリ・Web・店舗を自由に行き来できる。|客户可在应用、网站与门店间自由切换。'),
      I('val', 'retail,food', 'profit', 2, 'Higher spending|Belanja lebih besar|購買額の増加|消费更高', 'Customers using many channels often buy more.|Pelanggan yang memakai banyak kanal sering membeli lebih banyak.|複数チャネルの利用者は、購入額が大きくなりやすい。|多渠道用户常购买更多。'),
      I('cap', 'retail,biz', 'data', 2, 'One view of the customer|Satu pandangan pelanggan|顧客の一元把握|统一客户视图', 'Data from every channel combine.|Data dari setiap kanal digabungkan.|全チャネルのデータを統合できる。|各渠道数据得以整合。'),
      I('mkt', 'retail,food', 'loyal', 2, 'Stronger loyalty|Loyalitas lebih kuat|ロイヤルティの向上|忠诚度更强', 'Convenience keeps customers with you.|Kemudahan membuat pelanggan tetap bersama Anda.|利便性が、顧客をつなぎ止める。|便利让客户留下。')
    ], [
      I('cost', 'retail,biz', 'expensive', 3, 'Big investment|Investasi besar|大きな投資|投入巨大', 'Systems, stock and staff must connect across channels.|Sistem, stok, dan staf harus terhubung di semua kanal.|システム・在庫・人員を、チャネル間でつなぐ必要がある。|系统、库存与人员需跨渠道打通。'),
      I('eff', 'retail,biz', 'complex', 3, 'Complex operations|Operasional rumit|運営が複雑|运营复杂', 'Inventory and prices must match everywhere.|Stok dan harga harus sama di mana-mana.|在庫と価格を、あらゆる場所で一致させる必要がある。|库存与价格必须处处一致。'),
      I('risk', 'retail,biz', 'mistake', 2, 'Inconsistency annoys|Ketidakkonsistenan menjengkelkan|不一致が不満に|不一致惹恼客户', 'Out-of-sync stock or prices frustrate customers.|Stok atau harga yang tidak sinkron membuat frustrasi.|在庫や価格のずれが、顧客を苛立たせる。|库存或价格不同步令客户沮丧。'),
      I('risk', 'retail,biz', 'hard', 2, 'Hard to do well|Sulit dilakukan dengan baik|うまく運用するのが難しい|难以做好', 'Many firms attempt it and few get it right.|Banyak perusahaan mencoba dan sedikit yang berhasil.|多くの企業が挑戦するが、成功は少ない。|很多公司尝试，少有做好。')
    ]),
    C('personalization', 'Personalisation|Personalisasi|パーソナライズ|个性化', ['privacy'], [
      I('mkt', 'retail,food,edu', 'customer', 3, 'More relevant offers|Penawaran lebih relevan|関連性の高い提案|更相关的推荐', 'Customers see what suits them.|Pelanggan melihat apa yang cocok bagi mereka.|顧客に合ったものを提案できる。|客户看到适合自己的内容。'),
      I('val', 'retail,food', 'profit', 2, 'Higher conversion|Konversi lebih tinggi|購入率の向上|转化率提高', 'Tailored messages are clicked and bought more.|Pesan yang disesuaikan lebih sering diklik dan dibeli.|最適化したメッセージは、よりクリックされ買われる。|定制信息点击与购买更多。'),
      I('mkt', 'retail,edu', 'loyal', 2, 'Feels cared for|Terasa diperhatikan|大切にされる感覚|被重视的感觉', 'People stay with brands that know them.|Orang bertahan dengan merek yang mengenal mereka.|自分を知っているブランドに、人は長く留まる。|人们会留在了解自己的品牌。'),
      I('cap', 'retail,biz', 'learn', 2, 'Learning loop|Siklus belajar|学習のループ|学习闭环', 'Every interaction improves the next one.|Setiap interaksi memperbaiki yang berikutnya.|やり取りのたびに、次の提案が良くなる。|每次互动都改进下一次。')
    ], [
      I('risk', 'retail,biz,health', 'secret', 3, 'Privacy worries|Kekhawatiran privasi|プライバシーの懸念|隐私担忧', 'People feel watched when it goes too far.|Orang merasa diawasi jika terlalu jauh.|行き過ぎると、監視されている気分になる。|做过头让人觉得被监视。'),
      I('risk', 'biz,pub', 'law', 2, 'Data protection rules|Aturan perlindungan data|データ保護規制|数据保护法规', 'Laws limit what data you can collect and use.|Hukum membatasi data apa yang boleh dikumpulkan dan dipakai.|法律が、集められるデータと使い方を制限する。|法律限制可收集和使用的数据。'),
      I('cost', 'biz,retail', 'expensive', 2, 'Costly systems|Sistem mahal|システムが高額|系统昂贵', 'Data, tools and specialists are expensive.|Data, alat, dan spesialis itu mahal.|データ・ツール・専門人材に費用がかかる。|数据、工具与专家都昂贵。'),
      I('risk', 'retail,edu', 'narrow', 2, 'Filter bubble|Gelembung filter|フィルターバブル|信息茧房', 'Customers see only what they already like.|Pelanggan hanya melihat apa yang sudah disukai.|顧客が、すでに好きなものしか見なくなる。|客户只看到已喜欢的内容。')
    ]),
    C('privacy', 'Privacy protection|Perlindungan privasi|プライバシー保護|隐私保护', ['personalization'], [
      I('mkt', 'biz,health,fin', 'trust', 3, 'Customer trust|Kepercayaan pelanggan|顧客の信頼|客户信任', 'People share more with firms that protect them.|Orang berbagi lebih banyak dengan perusahaan yang melindungi mereka.|守ってくれる企業に、人はより多く情報を預ける。|人们愿向保护自己的公司提供更多信息。'),
      I('val', 'biz,health,fin', 'safe', 3, 'Fewer breaches|Pelanggaran data lebih sedikit|漏えいの減少|减少泄露', 'Less stored data means less to lose.|Data yang disimpan lebih sedikit berarti lebih sedikit yang bisa hilang.|保存するデータが少ないほど、失うものも少ない。|存的数据少，可丢的也少。'),
      I('cap', 'biz,pub', 'law', 2, 'Legal compliance|Kepatuhan hukum|法令順守|合法合规', 'You avoid fines and lawsuits.|Anda menghindari denda dan gugatan.|罰金や訴訟を避けられる。|避免罚款与诉讼。'),
      I('mkt', 'biz,health', 'name', 2, 'Strong reputation|Reputasi kuat|評判の向上|声誉良好', 'Responsible handling becomes a selling point.|Penanganan yang bertanggung jawab menjadi nilai jual.|責任ある取り扱いが、売りになる。|负责任的处理成为卖点。')
    ], [
      I('cost', 'biz,health,fin', 'expensive', 3, 'Compliance cost|Biaya kepatuhan|対応コスト|合规成本', 'Security, audits and training take money.|Keamanan, audit, dan pelatihan butuh dana.|セキュリティ・監査・研修に費用がかかる。|安全、审计与培训需要经费。'),
      I('eff', 'biz,retail', 'limit', 3, 'Less data to use|Data yang bisa dipakai berkurang|使えるデータが減る|可用数据变少', 'Targeting and analysis become harder.|Penargetan dan analisis menjadi lebih sulit.|ターゲティングや分析が難しくなる。|定向与分析更困难。'),
      I('eff', 'biz,health', 'slow', 2, 'Slows work|Memperlambat pekerjaan|業務が遅くなる|拖慢工作', 'Permissions and checks add steps.|Izin dan pemeriksaan menambah langkah.|許可や確認の手順が増える。|授权与检查增加步骤。'),
      I('ppl', 'biz,health', 'hard', 2, 'Hard to get right|Sulit dijalankan dengan benar|正しく運用しにくい|难以做对', 'People make mistakes despite the rules.|Orang tetap berbuat salah meski ada aturan.|ルールがあっても、人はミスをする。|有规则人也会出错。')
    ]),
    C('referral program', 'Referral program|Program referral|紹介プログラム|推荐计划', ['word of mouth'], [
      I('val', 'retail,biz,food', 'cheap', 3, 'Low acquisition cost|Biaya akuisisi rendah|低い獲得コスト|获客成本低', 'You pay only when a new customer arrives.|Anda hanya membayar saat pelanggan baru datang.|新規顧客が来たときだけ費用を払う。|只在新客到来时付费。'),
      I('mkt', 'retail,biz', 'trust', 3, 'Trusted introductions|Perkenalan yang dipercaya|信頼できる紹介|可信引荐', 'A friend recommendation converts well.|Rekomendasi teman mudah berubah menjadi pembelian.|友人の紹介は、購入につながりやすい。|朋友推荐转化率高。'),
      I('mkt', 'retail,biz', 'loyal', 2, 'Better retention|Retensi lebih baik|定着率の向上|留存更好', 'Referred customers stay longer.|Pelanggan rujukan bertahan lebih lama.|紹介された顧客は、長く続く。|被推荐客户留存更久。'),
      I('ppl', 'retail,fam', 'friend', 2, 'Rewards both sides|Menguntungkan kedua pihak|双方に特典|双方受益', 'Giver and receiver both gain.|Pemberi dan penerima sama-sama untung.|紹介する人も、される人も得をする。|推荐者与被推荐者都获益。')
    ], [
      I('risk', 'retail,biz', 'cheat', 3, 'Abuse and fraud|Penyalahgunaan dan penipuan|不正利用|滥用与欺诈', 'Fake accounts farm the rewards.|Akun palsu mengeruk hadiah.|偽アカウントが、特典を荒らす。|虚假账户刷奖励。'),
      I('mkt', 'retail,biz', 'cheap', 2, 'Deal hunters|Pemburu promo|特典目当ての客|薅羊毛客户', 'Some people join only for the reward.|Sebagian orang bergabung hanya demi hadiah.|特典だけが目当ての客も来る。|有人只为奖励而来。'),
      I('ppl', 'retail,fam', 'awkward', 2, 'Social awkwardness|Canggung secara sosial|紹介しづらい気まずさ|社交尴尬', 'Some people dislike pushing friends to buy.|Sebagian orang tidak suka mendesak teman untuk membeli.|友人に勧めるのを、ためらう人もいる。|有人不愿向朋友推销。'),
      I('cost', 'retail,biz', 'money', 2, 'Rewards add up|Hadiah menumpuk|特典コストの累積|奖励累积成本', 'Generous incentives can outweigh the sale.|Insentif besar bisa melebihi nilai penjualan.|特典が大きいと、売上を上回ることがある。|慷慨激励可能超过销售额。')
    ]),
    C('loyalty program', 'Loyalty program|Program loyalitas|ポイント・会員制度|会员积分计划', ['discounting'], [
      I('mkt', 'retail,food', 'loyal', 3, 'Repeat purchases|Pembelian berulang|リピート購入|重复购买', 'Points give a reason to come back.|Poin memberi alasan untuk kembali.|ポイントが、再来店の理由になる。|积分给人回头的理由。'),
      I('cap', 'retail,biz', 'data', 3, 'Customer data|Data pelanggan|顧客データ|客户数据', 'You see who buys what and when.|Anda melihat siapa membeli apa dan kapan.|誰がいつ何を買うかが分かる。|可看到谁在何时买了什么。'),
      I('val', 'retail,food', 'profit', 2, 'Bigger baskets|Belanja lebih besar|購入額の増加|客单价提高', 'Members spend more to reach rewards.|Anggota berbelanja lebih banyak demi hadiah.|会員は、特典のためにより多く買う。|会员为拿奖励而多消费。'),
      I('mkt', 'retail,food', 'edge', 2, 'Switching barrier|Hambatan berpindah|乗り換えにくさ|转换壁垒', 'Customers hesitate to leave accumulated points.|Pelanggan enggan meninggalkan poin yang terkumpul.|貯めたポイントを手放したくなくて、離れにくい。|客户不舍放弃已累积积分。')
    ], [
      I('cost', 'retail,food', 'expensive', 3, 'Costs of rewards|Biaya hadiah|特典のコスト|奖励成本', 'Points are a liability on the books.|Poin adalah kewajiban dalam pembukuan.|ポイントは、帳簿上の負債になる。|积分是账面上的负债。'),
      I('mkt', 'retail,food', 'lose', 2, 'Bought loyalty only|Loyalitas yang dibeli|お金で買った忠誠心|买来的忠诚', 'Customers stay for points, not for you.|Pelanggan bertahan demi poin, bukan demi Anda.|顧客はポイントのために留まり、あなたのためではない。|客户为积分而留，不是为你。'),
      I('eff', 'retail,biz', 'complex', 2, 'Admin and IT burden|Beban administrasi dan TI|運営・システムの負担|行政与IT负担', 'Tracking, redeeming and fraud checks are work.|Pelacakan, penukaran, dan pemeriksaan penipuan itu repot.|管理・交換・不正チェックに手間がかかる。|跟踪、兑换与防欺诈都是工作量。'),
      I('mkt', 'retail,food', 'copy', 2, 'Easily copied|Mudah ditiru|真似されやすい|易被模仿', 'Rivals launch similar schemes within weeks.|Pesaing meluncurkan skema serupa dalam hitungan minggu.|競合が数週間で似た制度を始める。|对手几周内就推出类似计划。')
    ]),
    C('sponsorship', 'Sponsorship|Sponsor|スポンサーシップ|赞助', ['advertising'], [
      I('mkt', 'retail,food,biz', 'name', 3, 'Brand exposure|Eksposur merek|ブランド露出|品牌曝光', 'Logos appear before engaged audiences.|Logo tampil di depan audiens yang antusias.|熱心な観客の前に、ロゴが映る。|Logo 出现在热情的观众面前。'),
      I('mkt', 'retail,biz', 'good', 2, 'Positive association|Asosiasi positif|好印象の連想|正面联想', 'The joy of an event rubs off on your brand.|Kegembiraan acara menular ke merek Anda.|イベントの楽しさが、ブランドの印象に重なる。|活动的欢乐会感染品牌。'),
      I('cap', 'pub,edu,biz', 'help', 2, 'Community goodwill|Niat baik komunitas|地域からの好感|社区好感', 'Supporting local causes earns respect.|Mendukung kegiatan lokal mendatangkan rasa hormat.|地域活動の支援は、尊敬を集める。|支持本地事业赢得尊重。'),
      I('ppl', 'biz,pub', 'team', 2, 'Staff pride|Kebanggaan staf|社員の誇り|员工自豪', 'Employees like working for a visible supporter.|Karyawan senang bekerja untuk pendukung yang terlihat.|目立つ支援企業で働くことに、社員は誇りを持つ。|员工以为知名赞助方工作为荣。')
    ], [
      I('cost', 'retail,biz', 'expensive', 3, 'High fees|Biaya tinggi|費用が高い|费用高', 'Rights fees and activation cost a lot.|Biaya hak dan aktivasi sangat besar.|権利料と関連施策に多額の費用がかかる。|赞助费与配套活动花费大。'),
      I('eff', 'retail,biz', 'hard', 3, 'Hard to measure|Sulit diukur|効果測定が難しい|难以衡量', 'Awareness is easier to see than sales.|Kesadaran lebih mudah dilihat daripada penjualan.|認知は見えても、売上への効果は見えにくい。|知名度易见，销售影响难测。'),
      I('risk', 'retail,biz', 'scandal', 2, 'Association risk|Risiko asosiasi|不祥事に巻き込まれる|关联风险', 'A scandal by the sponsored party hurts you too.|Skandal pihak yang disponsori ikut merugikan Anda.|支援先の不祥事が、自社の評判も傷つける。|被赞助方的丑闻也会连累你。'),
      I('risk', 'retail,biz', 'ignore', 2, 'Crowded and ignored|Padat dan terabaikan|埋もれてしまう|拥挤被忽略', 'Many logos compete for attention.|Banyak logo bersaing merebut perhatian.|多くのロゴが、注目を奪い合う。|众多 Logo 争夺注意力。')
    ]),
    C('endorsement', 'Celebrity endorsement|Dukungan selebriti|有名人の起用|名人代言', ['influencer marketing'], [
      I('mkt', 'retail,food', 'name', 3, 'Instant attention|Perhatian instan|すぐ注目される|立即获得关注', 'A famous face stops people scrolling.|Wajah terkenal membuat orang berhenti menggulir.|有名人の顔は、スクロールを止める。|名人面孔让人停下浏览。'),
      I('mkt', 'retail,food', 'trust', 2, 'Transfer of status|Pemindahan status|ステータスの移転|地位转移', 'Buyers want to be like the star.|Pembeli ingin seperti bintang itu.|買い手が、その人のようになりたいと思う。|买家想成为那位明星。'),
      I('mkt', 'retail,biz', 'new', 2, 'Launch boost|Dorongan peluncuran|発売時の後押し|上市助推', 'A star can make a launch a news story.|Bintang dapat menjadikan peluncuran sebuah berita.|有名人がいれば、発売がニュースになる。|明星能让发布成为新闻。'),
      I('cap', 'retail,food', 'story', 2, 'Memorable campaigns|Kampanye mudah diingat|記憶に残る広告|难忘的广告', 'Stories with a known person stick.|Cerita dengan tokoh terkenal mudah melekat.|有名人が出る物語は、記憶に残る。|名人参与的故事容易被记住。')
    ], [
      I('cost', 'retail,food', 'expensive', 3, 'Very expensive|Sangat mahal|非常に高額|非常昂贵', 'Fees can exceed the product budget.|Honorarium bisa melebihi anggaran produk.|出演料が、商品予算を上回ることもある。|费用可能超过产品预算。'),
      I('risk', 'retail,food', 'scandal', 3, 'Scandal risk|Risiko skandal|スキャンダルのリスク|丑闻风险', 'One incident can sink the campaign.|Satu insiden bisa menenggelamkan kampanye.|1つの不祥事で、キャンペーンが台無しになる。|一次事件就能毁掉活动。'),
      I('mkt', 'retail,food', 'ignore', 2, 'People remember the star, not the product|Orang ingat bintangnya, bukan produknya|商品でなく本人が記憶に残る|只记住明星不记产品', 'The brand gets lost behind the face.|Merek tenggelam di balik wajah itu.|ブランドが、顔の陰に隠れてしまう。|品牌被明星光环掩盖。'),
      I('risk', 'retail,food', 'depend', 2, 'Dependence on one person|Bergantung pada satu orang|1人への依存|依赖一个人', 'If the star leaves, the image goes too.|Jika bintang pergi, citra ikut hilang.|本人が離れると、イメージも失われる。|明星离开，形象随之消失。')
    ]),
    C('storytelling', 'Storytelling|Bercerita (storytelling)|ストーリーテリング|讲故事', ['advertising'], [
      I('mkt', 'retail,food,edu', 'story', 3, 'Memorable|Mudah diingat|記憶に残る|令人难忘', 'People remember stories better than facts.|Orang lebih mengingat cerita daripada fakta.|人は、事実より物語をよく覚える。|人们记故事胜过记事实。'),
      I('mkt', 'retail,food', 'feel', 3, 'Emotional connection|Ikatan emosional|感情的なつながり|情感连接', 'Feelings drive many purchases.|Perasaan mendorong banyak pembelian.|感情が、多くの購買を動かす。|情感驱动许多购买。'),
      I('cap', 'biz,edu,pub', 'teach', 2, 'Makes ideas clear|Memperjelas gagasan|考えが伝わりやすい|让想法更清晰', 'Complex points become easy to follow.|Hal rumit menjadi mudah diikuti.|複雑な内容も、分かりやすくなる。|复杂观点变得易懂。'),
      I('ppl', 'biz,pub', 'team', 2, 'Unites people|Menyatukan orang|人をまとめる|凝聚人心', 'A shared story gives a team a purpose.|Cerita bersama memberi tim tujuan.|共有する物語が、チームに目的を与える。|共同故事赋予团队目标。')
    ], [
      I('risk', 'retail,food,biz', 'lie', 3, 'Seen as fake|Dianggap palsu|作り話に見える|被视为造假', 'Exaggerated stories destroy trust when exposed.|Cerita yang dilebih-lebihkan menghancurkan kepercayaan saat terbongkar.|盛った話は、露見すると信頼を失う。|夸大故事一旦被揭穿就失信。'),
      I('eff', 'biz,retail', 'hard', 2, 'Hard to do well|Sulit dilakukan dengan baik|うまく語るのが難しい|难以讲好', 'Good stories need skill and honesty.|Cerita bagus butuh keterampilan dan kejujuran.|良い物語には、技術と誠実さが要る。|好故事需要技巧与诚实。'),
      I('mkt', 'retail,mfg', 'fact', 2, 'Style over substance|Gaya mengalahkan isi|中身より見せ方|重形式轻实质', 'A great story cannot rescue a weak product.|Cerita hebat tidak bisa menyelamatkan produk yang lemah.|どんなに良い話でも、弱い商品は救えない。|再好的故事也救不了差产品。'),
      I('eff', 'biz,retail', 'hard', 2, 'Hard to measure|Sulit diukur|効果が測りにくい|效果难量化', 'Emotional impact does not fit a spreadsheet.|Dampak emosional tidak muat dalam lembar kerja.|感情への影響は、表計算に収まらない。|情感影响放不进表格。')
    ]),
    C('scarcity marketing', 'Scarcity marketing|Pemasaran kelangkaan|希少性マーケティング|稀缺营销', ['discounting'], [
      I('mkt', 'retail,food', 'rush', 3, 'Urgency to buy|Mendorong segera membeli|今すぐ買う動機|促成立即购买', 'Limited stock makes people act now.|Stok terbatas membuat orang bertindak sekarang.|数に限りがあると、人は今すぐ動く。|限量使人立刻行动。'),
      I('mkt', 'retail,mfg', 'premium', 2, 'Exclusive image|Citra eksklusif|特別感|专属形象', 'Rare items feel more valuable.|Barang langka terasa lebih berharga.|希少な商品は、価値が高く感じられる。|稀有物品显得更有价值。'),
      I('val', 'retail,mfg', 'profit', 2, 'Higher prices|Harga lebih tinggi|高価格を維持|价格更高', 'Scarcity supports premium pricing.|Kelangkaan mendukung harga premium.|希少性が、高価格を支える。|稀缺支撑溢价。'),
      I('mkt', 'retail,food', 'word', 2, 'Buzz and queues|Gaungan dan antrean|話題と行列|话题与排队', 'Sold-out items get talked about.|Barang yang ludes jadi bahan pembicaraan.|売り切れ商品は、話題になる。|售罄商品成为谈资。')
    ], [
      I('ppl', 'retail,food', 'anger', 3, 'Frustrated customers|Pelanggan kecewa|顧客の不満|客户沮丧', 'People who miss out feel annoyed.|Orang yang tidak kebagian merasa kesal.|買えなかった人は、不満を抱く。|买不到的人心生不满。'),
      I('risk', 'retail,food', 'lie', 3, 'Seen as manipulation|Dianggap manipulasi|操作と見なされる|被视为操纵', 'Fake scarcity destroys trust.|Kelangkaan palsu menghancurkan kepercayaan.|偽の希少性は、信頼を壊す。|虚假稀缺毁掉信任。'),
      I('val', 'retail,mfg', 'lose', 2, 'Lost sales|Penjualan hilang|販売機会の損失|销售流失', 'Unmet demand goes to competitors.|Permintaan yang tak terlayani beralih ke pesaing.|満たせなかった需要は、競合に流れる。|未满足的需求流向对手。'),
      I('risk', 'retail,mfg', 'short', 2, 'Short-lived effect|Efek sesaat|効果が一時的|效果短暂', 'Customers get used to the tactic.|Pelanggan terbiasa dengan taktik itu.|客は、その手法に慣れてしまう。|客户会习惯这种手法。')
    ]),
    C('cold calling', 'Cold calling|Panggilan dingin|テレアポ（飛び込み営業）|陌生电话营销', ['advertising'], [
      I('mkt', 'biz,mfg', 'customer', 3, 'Direct contact|Kontak langsung|直接接触|直接接触', 'You reach decision makers personally.|Anda menjangkau pengambil keputusan secara langsung.|意思決定者に、直接アプローチできる。|可直接联系决策者。'),
      I('cap', 'biz,mfg', 'learn', 2, 'Instant feedback|Umpan balik langsung|すぐに反応が分かる|即时反馈', 'You hear objections and needs straight away.|Anda langsung mendengar keberatan dan kebutuhan.|反論やニーズを、その場で聞ける。|当场听到异议与需求。'),
      I('val', 'biz,mfg', 'cheap', 2, 'Low entry cost|Biaya awal rendah|始めやすい|入门成本低', 'A phone and a list are enough to start.|Telepon dan daftar sudah cukup untuk memulai.|電話とリストがあれば始められる。|一部电话和名单就能开始。'),
      I('ppl', 'biz,retail', 'skill', 2, 'Builds sales skill|Melatih kemampuan jual|営業力が鍛えられる|锻炼销售能力', 'Staff learn resilience and persuasion.|Staf belajar ketahanan dan persuasi.|粘り強さと説得力が身につく。|员工学会韧性与说服。')
    ], [
      I('ppl', 'biz,retail', 'anger', 3, 'Annoys people|Mengganggu orang|相手に嫌がられる|惹人厌烦', 'Many see unsolicited calls as intrusive.|Banyak orang menganggap telepon tak diundang itu mengganggu.|突然の電話を、迷惑と感じる人は多い。|很多人觉得骚扰电话讨厌。'),
      I('mkt', 'biz,retail', 'lose', 3, 'Low success rate|Tingkat keberhasilan rendah|成功率が低い|成功率低', 'Most calls end in refusal.|Kebanyakan panggilan berakhir dengan penolakan.|ほとんどの電話は、断られて終わる。|多数电话以拒绝收场。'),
      I('ppl', 'biz,retail', 'stress', 2, 'Burns out staff|Membuat staf lelah|担当者が疲弊|员工身心俱疲', 'Constant rejection is draining.|Penolakan terus-menerus menguras tenaga.|断られ続けると、心が消耗する。|不断被拒令人精疲力竭。'),
      I('risk', 'biz,pub', 'law', 2, 'Legal limits|Batasan hukum|法的な制約|法律限制', 'Do-not-call and consent rules apply.|Aturan larangan menelepon dan persetujuan berlaku.|通話拒否や同意に関する規制がある。|存在拒接来电与同意规定。')
    ]),
    C('upselling', 'Upselling|Upselling|アップセル|向上销售', ['bundling'], [
      I('val', 'retail,food,biz', 'profit', 3, 'Higher revenue per customer|Pendapatan per pelanggan naik|客単価の向上|单客收入提升', 'Customers buy a better version.|Pelanggan membeli versi yang lebih baik.|顧客が、上位版を買ってくれる。|客户购买更高级版本。'),
      I('val', 'retail,food', 'cheap', 2, 'Cheaper than finding new buyers|Lebih murah daripada mencari pembeli baru|新規獲得より低コスト|比开发新客户便宜', 'Existing customers are easier to sell to.|Pelanggan lama lebih mudah dijual.|既存客のほうが、売りやすい。|老客户更容易成交。'),
      I('mkt', 'retail,biz', 'customer', 2, 'Better solutions|Solusi lebih baik|より良い解決策|更好的方案', 'A premium option may suit them better.|Pilihan premium mungkin lebih cocok bagi mereka.|上位の選択肢のほうが、合う場合もある。|高级选项可能更适合他们。'),
      I('mkt', 'retail,food', 'habit', 2, 'Raises expectations|Menaikkan ekspektasi|期待値が上がる|提高期望', 'Customers get used to higher quality.|Pelanggan terbiasa dengan kualitas lebih tinggi.|顧客が、より高い品質に慣れていく。|客户习惯更高质量。')
    ], [
      I('ppl', 'retail,food', 'anger', 3, 'Feels pushy|Terasa memaksa|押し売りに見える|显得强迫', 'Customers resent being pressed to spend more.|Pelanggan kesal didesak berbelanja lebih.|もっと買えと迫られて、不快になる。|被逼多花钱令客户反感。'),
      I('risk', 'retail,biz', 'trust', 3, 'Loss of trust|Kehilangan kepercayaan|信頼の喪失|失去信任', 'Pushing unsuitable upgrades harms the relationship.|Memaksakan peningkatan yang tidak cocok merusak hubungan.|合わない上位商品を勧めると、関係が損なわれる。|强推不合适的升级损害关系。'),
      I('mkt', 'retail,food', 'lose', 2, 'Lost sale|Penjualan hilang|販売を逃す|丢单', 'A high price can scare off the basic sale.|Harga tinggi bisa menakuti penjualan dasar.|高い提案で、基本の購入まで逃すことがある。|高价可能吓跑基础订单。'),
      I('eff', 'retail,biz', 'skill', 2, 'Needs good training|Butuh pelatihan baik|適切な研修が必要|需要良好培训', 'Staff must read customer needs.|Staf harus membaca kebutuhan pelanggan.|店員が、顧客のニーズを読み取る必要がある。|员工必须读懂客户需求。')
    ]),
    C('market research', 'Market research|Riset pasar|市場調査|市场调研', ['intuition'], [
      I('cap', 'biz,retail,food', 'know', 3, 'Understands customers|Memahami pelanggan|顧客理解|了解客户', 'You learn what people want and will pay.|Anda tahu apa yang diinginkan dan dibayar orang.|顧客の求めるものと、払う金額が分かる。|了解人们想要什么及愿付多少。'),
      I('val', 'biz,retail', 'safe', 3, 'Reduces risk|Mengurangi risiko|リスクの低減|降低风险', 'Bad launches are caught before they cost money.|Peluncuran buruk terdeteksi sebelum merugi.|失敗しそうな発売を、費用がかかる前に防げる。|在亏钱前识别糟糕的上市。'),
      I('mkt', 'retail,biz', 'find', 2, 'Spots opportunities|Menemukan peluang|機会の発見|发现机会', 'Unmet needs and gaps become visible.|Kebutuhan yang belum terpenuhi dan celah menjadi terlihat.|満たされていないニーズや空白が見える。|未满足的需求与空白显现。'),
      I('cap', 'biz,pub', 'proof', 2, 'Evidence for decisions|Bukti untuk keputusan|意思決定の根拠|决策有据', 'Data helps persuade investors and bosses.|Data membantu meyakinkan investor dan atasan.|データが、投資家や上司を説得する材料になる。|数据有助说服投资人和上司。')
    ], [
      I('cost', 'biz,retail', 'expensive', 3, 'Costs time and money|Butuh waktu dan uang|時間と費用がかかる|耗时耗钱', 'Good surveys and studies are not cheap.|Survei dan studi yang baik tidak murah.|質の高い調査は、安くない。|好的调查并不便宜。'),
      I('risk', 'biz,retail', 'lie', 3, 'People say one thing, do another|Orang berkata satu, berbuat lain|言うことと行動が違う|言行不一', 'Stated intentions often fail to predict buying.|Niat yang dinyatakan sering gagal memprediksi pembelian.|回答した意向が、実際の購買を予測しないことが多い。|表达的意愿常无法预测购买。'),
      I('risk', 'biz,retail', 'mistake', 2, 'Bad design misleads|Rancangan buruk menyesatkan|設計が悪いと誤る|设计差会误导', 'Small or biased samples give false comfort.|Sampel kecil atau bias memberi rasa aman palsu.|少数・偏った標本は、誤った安心を与える。|样本小或有偏会带来虚假安心。'),
      I('eff', 'biz,mfg', 'slow', 2, 'Slows decisions|Memperlambat keputusan|意思決定が遅れる|拖慢决策', 'Waiting for data lets rivals move first.|Menunggu data membuat pesaing bergerak lebih dulu.|データを待つ間に、競合に先を越される。|等数据时对手抢先行动。')
    ]),
    C('intuition', 'Intuition-based decisions|Keputusan berdasarkan intuisi|直感による意思決定|凭直觉决策', ['market research'], [
      I('eff', 'biz,pub,fam', 'quick', 3, 'Fast|Cepat|素早い|快速', 'No waiting for reports or studies.|Tidak menunggu laporan atau studi.|報告書や調査を待たなくていい。|不必等报告或研究。'),
      I('cap', 'biz,food,retail', 'skill', 2, 'Uses experience|Memanfaatkan pengalaman|経験を活かせる|运用经验', 'Experts compress years of learning into hunches.|Ahli memadatkan pengalaman bertahun-tahun menjadi firasat.|熟練者の勘は、長年の経験の結晶である。|专家的直觉凝结多年经验。'),
      I('val', 'biz,retail', 'new', 2, 'Bold, original moves|Langkah berani dan orisinal|大胆で独創的|大胆且原创', 'Data cannot tell you what has never existed.|Data tidak bisa memberitahu apa yang belum pernah ada.|前例のないものは、データでは分からない。|数据无法预知从未存在之物。'),
      I('cap', 'biz,fam', 'cheap', 2, 'Low cost|Biaya rendah|低コスト|成本低', 'No analysts or tools required.|Tidak perlu analis atau alat.|分析担当やツールが要らない。|无需分析师或工具。')
    ], [
      I('risk', 'biz,fin,health', 'bias', 3, 'Bias and overconfidence|Bias dan terlalu percaya diri|偏見と過信|偏见与过度自信', 'Gut feelings repeat our blind spots.|Firasat mengulangi titik buta kita.|直感は、自分の盲点をそのまま繰り返す。|直觉会重复我们的盲点。'),
      I('risk', 'biz,pub', 'proof', 2, 'Hard to defend|Sulit dipertahankan|説明が難しい|难以辩护', 'Others cannot check how you decided.|Orang lain tidak bisa memeriksa cara Anda memutuskan.|どう決めたか、他人が検証できない。|别人无法核实你如何决定。'),
      I('risk', 'biz,mfg', 'fail', 2, 'Expensive mistakes|Kesalahan mahal|高くつく失敗|代价高昂的失误', 'Wrong hunches on big bets are costly.|Firasat salah pada taruhan besar itu mahal.|大きな賭けでの勘違いは、高くつく。|重大押注上直觉出错代价高。'),
      I('ppl', 'biz,pub', 'conflict', 2, 'Hard to align a team|Sulit menyelaraskan tim|チームの合意が難しい|团队难以对齐', 'Teammates have different hunches.|Anggota tim punya firasat berbeda.|メンバーごとに、直感は違う。|队友各有不同直觉。')
    ])
  );
})();
