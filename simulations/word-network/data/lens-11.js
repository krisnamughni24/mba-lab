/* Word Network: curated concepts, batch 11 (growth and corporate strategy). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('organic growth', 'Organic growth|Pertumbuhan organik|オーガニック成長（自力成長）|内生增长', ['merger'], [
      I('val', 'biz,retail,food', 'safe', 3, 'Lower risk|Risiko lebih rendah|低リスク|风险较低', 'Steady, step-by-step expansion.|Ekspansi stabil, selangkah demi selangkah.|着実に、一歩ずつ拡大する。|稳步逐级扩张。'),
      I('cap', 'biz,retail', 'keep', 2, 'Keeps culture and control|Menjaga budaya dan kendali|文化と経営権を維持|保持文化与控制', 'Growth fits how you work.|Pertumbuhan sesuai cara kerja Anda.|成長が、自社のやり方に沿う。|增长契合工作方式。'),
      I('val', 'biz,retail', 'cheap', 2, 'Cheaper than buying|Lebih murah daripada membeli|買収より安い|比收购便宜', 'Reinvest profits instead of paying premiums.|Menginvestasikan kembali laba, bukan membayar premi.|プレミアムを払わず、利益を再投資する。|将利润再投资而非付溢价。'),
      I('cap', 'biz,retail', 'learn', 2, 'Learn as you grow|Belajar sambil tumbuh|成長しながら学べる|边成长边学习', 'Systems and people develop together.|Sistem dan orang berkembang bersama.|仕組みと人が、一緒に育つ。|体系与人员同步成长。')
    ], [
      I('eff', 'biz,retail', 'slow', 3, 'Slow|Lambat|時間がかかる|缓慢', 'Rivals may reach scale first.|Pesaing mungkin mencapai skala lebih dulu.|競合が、先に規模を得るかもしれない。|对手可能先成规模。'),
      I('mkt', 'biz,retail', 'limit', 2, 'Limited by own capacity|Terbatas oleh kapasitas sendiri|自社能力に制約される|受限于自身能力', 'Cannot jump into new markets quickly.|Tidak bisa cepat memasuki pasar baru.|新市場に素早く入れない。|无法快速进入新市场。'),
      I('cap', 'biz,mfg', 'old', 2, 'Less access to new skills|Kurang akses keahlian baru|新しい技能が入りにくい|难获新技能', 'Same people, same ideas.|Orang sama, ide sama.|同じ人、同じ発想になりがち。|同样的人同样的想法。'),
      I('risk', 'biz,retail', 'stuck', 2, 'Missed windows|Peluang terlewat|機会を逃す|错失窗口', 'Markets open and close quickly.|Pasar terbuka dan tertutup dengan cepat.|市場の窓は、すぐ閉じる。|市场窗口稍纵即逝。')
    ]),
    C('company-owned outlets', 'Company-owned outlets|Gerai milik sendiri|直営店|直营店', ['franchising'], [
      I('cap', 'food,retail', 'control', 3, 'Full control over quality|Kendali penuh atas mutu|品質を完全に管理|完全掌控质量', 'Every outlet follows your standards.|Setiap gerai mengikuti standar Anda.|全店舗が、自社基準に従う。|每家店遵循你的标准。'),
      I('val', 'food,retail', 'profit', 2, 'Keep all the profit|Mendapat seluruh laba|利益をすべて得る|独享全部利润', 'No royalties shared.|Tanpa berbagi royalti.|ロイヤルティを分け合わない。|无需分权利金。'),
      I('mkt', 'food,retail', 'name', 2, 'Consistent brand|Merek konsisten|一貫したブランド|品牌一致', 'Customers get the same experience.|Pelanggan mendapat pengalaman yang sama.|どの店でも、同じ体験を提供できる。|客户体验一致。'),
      I('cap', 'food,retail', 'learn', 2, 'Faster learning and change|Belajar dan berubah lebih cepat|学習と変更が早い|学习与调整更快', 'Roll out improvements quickly.|Menerapkan perbaikan dengan cepat.|改善を、素早く展開できる。|改进快速推广。')
    ], [
      I('cost', 'food,retail', 'expensive', 3, 'Heavy capital needs|Kebutuhan modal berat|多額の資本が必要|资本需求大', 'You fund every new outlet.|Anda mendanai setiap gerai baru.|新店を、すべて自前で賄う。|每家新店都自筹。'),
      I('eff', 'food,retail', 'slow', 2, 'Slower expansion|Ekspansi lebih lambat|拡大が遅い|扩张较慢', 'Growth limited by cash and managers.|Pertumbuhan dibatasi kas dan manajer.|資金と店長の数で、成長が制約される。|增长受现金与店长限制。'),
      I('risk', 'food,retail', 'lose', 2, 'All risk on you|Semua risiko pada Anda|リスクをすべて負う|风险全担', 'Closures and losses are yours.|Penutupan dan kerugian ditanggung Anda.|閉店も損失も、自社負担。|关店与亏损自负。'),
      I('ppl', 'food,retail', 'job', 2, 'Management burden|Beban manajemen|管理負担|管理负担', 'Hiring and supervising many managers.|Merekrut dan mengawasi banyak manajer.|多数の店長を採用・管理する必要がある。|招聘与管理众多店长。')
    ]),
    C('going alone', 'Going it alone|Berjalan sendiri|単独で進める|独自经营', ['joint venture'], [
      I('cap', 'biz,mfg', 'control', 3, 'Full control|Kendali penuh|完全な経営権|完全掌控', 'You decide everything.|Anda memutuskan segalanya.|すべて自分で決められる。|一切自己决定。'),
      I('val', 'biz,mfg', 'profit', 2, 'Keep all the rewards|Mendapat seluruh hasil|成果を独占|独享成果', 'No sharing of profit.|Tanpa berbagi laba.|利益を分けなくてよい。|无需分利润。'),
      I('cap', 'biz,mfg', 'secret', 2, 'Protects know-how|Melindungi know-how|ノウハウを守れる|保护诀窍', 'No partner to learn your secrets.|Tidak ada mitra yang mempelajari rahasia Anda.|相手にノウハウを知られない。|没有伙伴学走秘密。'),
      I('eff', 'biz', 'fast', 2, 'Quick decisions|Keputusan cepat|意思決定が速い|决策快', 'No partner approvals.|Tanpa persetujuan mitra.|相手の承認が要らない。|无需伙伴批准。')
    ], [
      I('risk', 'biz,mfg', 'lose', 3, 'All the risk|Semua risiko|リスクをすべて負う|风险全担', 'Failures cost you everything.|Kegagalan merugikan Anda sepenuhnya.|失敗の損失を、すべて負う。|失败由你全部承担。'),
      I('cost', 'biz,mfg', 'money', 3, 'Heavy investment|Investasi berat|多額の投資|投入巨大', 'Funding comes from you alone.|Dana berasal dari Anda sendiri.|資金を、自社だけで賄う。|资金全靠自己。'),
      I('mkt', 'mfg,retail', 'weak', 2, 'Weak local knowledge|Pengetahuan lokal lemah|現地知識の不足|本地知识不足', 'New markets are hard to read.|Pasar baru sulit dibaca.|新しい市場を読みにくい。|新市场难以把握。'),
      I('eff', 'biz,mfg', 'slow', 2, 'Slower progress|Kemajuan lebih lambat|進みが遅い|进展较慢', 'Capabilities must be built from scratch.|Kemampuan harus dibangun dari awal.|能力を、ゼロから作る必要がある。|能力须从零建立。')
    ]),
    C('niche market', 'Niche market strategy|Strategi pasar niche|ニッチ戦略|细分市场策略', ['mass market'], [
      I('mkt', 'retail,food,edu', 'loyal', 3, 'Loyal customers|Pelanggan setia|熱心な顧客|忠实客户', 'Specialists win devoted buyers.|Spesialis memenangkan pembeli setia.|専門性が、熱心な顧客を生む。|专门化赢得忠实买家。'),
      I('val', 'retail,food', 'premium', 2, 'Premium prices|Harga premium|高価格を設定できる|可定高价', 'Fewer rivals, more pricing power.|Pesaing sedikit, daya harga lebih besar.|競合が少なく、価格を保ちやすい。|对手少，定价权强。'),
      I('mkt', 'retail,food', 'edge', 2, 'Less competition|Persaingan lebih sedikit|競争が少ない|竞争少', 'Big firms ignore small markets.|Perusahaan besar mengabaikan pasar kecil.|大手は、小さな市場を相手にしない。|大公司忽略小市场。'),
      I('cap', 'biz,retail', 'know', 2, 'Deep customer knowledge|Pengetahuan pelanggan mendalam|顧客の深い理解|深入了解客户', 'You know exactly what they want.|Anda tahu persis apa yang mereka mau.|何を求めているか、よく分かる。|清楚他们要什么。')
    ], [
      I('mkt', 'retail,food', 'limit', 3, 'Small market size|Ukuran pasar kecil|市場が小さい|市场规模小', 'Growth is capped.|Pertumbuhan terbatas.|成長に限界がある。|增长受限。'),
      I('risk', 'retail,food', 'depend', 2, 'Vulnerable to change|Rentan terhadap perubahan|変化に脆い|易受变化影响', 'A shift in taste can end the niche.|Pergeseran selera dapat mengakhiri niche.|嗜好が変われば、ニッチも消える。|口味变化可终结细分市场。'),
      I('risk', 'retail,mfg', 'copy', 2, 'Big firms may enter|Perusahaan besar bisa masuk|大手が参入する恐れ|大公司可能进入', 'Success attracts giants.|Keberhasilan menarik raksasa.|成功すると、巨人が入ってくる。|成功会引来巨头。'),
      I('val', 'retail,food', 'expensive', 2, 'High cost per customer|Biaya per pelanggan tinggi|顧客あたりのコストが高い|单客成本高', 'No economies of scale.|Tanpa skala ekonomi.|規模のメリットが小さい。|缺乏规模经济。')
    ]),
    C('first mover', 'First-mover advantage|Keuntungan pelopor|先行者利益|先发优势', ['fast follower'], [
      I('mkt', 'biz,retail,mfg', 'name', 3, 'Brand recognition|Pengenalan merek|ブランド認知|品牌认知', 'Known as the original.|Dikenal sebagai yang pertama.|元祖として知られる。|被视为开创者。'),
      I('mkt', 'biz,retail', 'loyal', 2, 'Customer lock-in|Pelanggan terikat|顧客の囲い込み|客户锁定', 'Switching costs protect you.|Biaya berpindah melindungi Anda.|乗り換えコストが、守ってくれる。|转换成本保护你。'),
      I('cap', 'biz,mfg', 'edge', 2, 'Scarce resources first|Sumber daya langka lebih dulu|希少資源の先取り|先占稀缺资源', 'Secure the best sites and suppliers.|Mengamankan lokasi dan pemasok terbaik.|良い立地や仕入先を押さえる。|抢占最佳地点与供应商。'),
      I('val', 'biz,retail', 'profit', 2, 'Early profits|Laba awal|先行利益|早期利润', 'Little competition at first.|Sedikit persaingan di awal.|最初は競争が少ない。|初期竞争少。')
    ], [
      I('cost', 'biz,mfg', 'expensive', 3, 'Pioneer costs|Biaya perintis|開拓コスト|开拓成本', 'You pay to educate the market.|Anda membayar untuk mengedukasi pasar.|市場を育てる費用を負担する。|你为教育市场买单。'),
      I('risk', 'biz,retail', 'fail', 3, 'Mistakes others learn from|Kesalahan yang dipelajari orang lain|他社に失敗から学ばれる|错误被别人借鉴', 'Followers avoid your errors.|Pengikut menghindari kesalahan Anda.|後発は、先行者の失敗を避けられる。|跟随者避开你的错误。'),
      I('risk', 'mfg,retail', 'change', 2, 'Technology leaps past you|Teknologi melampaui Anda|技術に追い越される|技术超越你', 'Later entrants use better methods.|Pendatang belakangan memakai metode lebih baik.|後発が、より良い技術を使う。|后来者用更好方法。'),
      I('risk', 'biz,retail', 'weak', 2, 'Uncertain demand|Permintaan tidak pasti|需要が不透明|需求不确定', 'Nobody knows if the market exists.|Tak ada yang tahu apakah pasar itu ada.|市場があるかどうかも分からない。|无人知晓市场是否存在。')
    ]),
    C('staying the course', 'Staying the course|Konsisten pada arah|方針を貫く|坚持既定方向', ['pivot'], [
      I('cap', 'biz,retail', 'focus', 3, 'Focus and depth|Fokus dan kedalaman|集中と深み|专注与深度', 'Deep expertise takes consistency.|Keahlian mendalam butuh konsistensi.|専門性は、継続から生まれる。|深度专长需坚持。'),
      I('ppl', 'biz', 'trust', 2, 'Clarity for staff|Kejelasan bagi staf|社員にとっての明確さ|员工清晰', 'People know what to expect.|Orang tahu apa yang diharapkan.|社員が、先行きを見通せる。|员工知道预期。'),
      I('mkt', 'biz,retail', 'name', 2, 'Consistent brand|Merek konsisten|一貫したブランド|品牌一致', 'Customers know what you stand for.|Pelanggan tahu apa yang Anda perjuangkan.|何を大切にする会社か、伝わる。|客户知道你代表什么。'),
      I('val', 'biz', 'long', 2, 'Rewards patience|Menghargai kesabaran|忍耐が報われる|回报耐心', 'Compounding works over years.|Efek majemuk bekerja selama bertahun-tahun.|複利は、年月をかけて効く。|复利需多年起效。')
    ], [
      I('risk', 'biz,retail', 'stuck', 3, 'Clinging to failure|Berpegang pada kegagalan|失敗に固執|死守失败', 'Stubbornness burns cash.|Kekeraskepalaan menghabiskan kas.|頑固さが、資金を燃やす。|固执烧钱。'),
      I('risk', 'biz,retail', 'blind', 2, 'Ignores changing markets|Mengabaikan perubahan pasar|市場の変化を無視|无视市场变化', 'The world moves on.|Dunia terus bergerak.|世界は先に進む。|世界在前进。'),
      I('mkt', 'biz,retail', 'lose', 2, 'Loses to adaptive rivals|Kalah dari pesaing adaptif|柔軟な競合に負ける|输给灵活对手', 'Others adjust faster.|Pihak lain menyesuaikan lebih cepat.|他社のほうが、素早く適応する。|他人调整更快。'),
      I('ppl', 'biz', 'tired', 2, 'Fatigue|Kelelahan|疲弊|疲劳', 'Years of no progress drain teams.|Bertahun-tahun tanpa kemajuan menguras tim.|何年も成果が出ず、チームが疲れる。|多年无进展使团队疲惫。')
    ]),
    C('exit strategy', 'Selling the business|Menjual bisnis|事業売却|出售企业', ['family business'], [
      I('val', 'biz,fin', 'money', 3, 'Cash reward|Imbalan tunai|現金化|套现', 'Years of work turn into money.|Kerja bertahun-tahun berubah menjadi uang.|長年の努力が、お金に変わる。|多年努力变现。'),
      I('ppl', 'biz,fam', 'free', 2, 'Freedom|Kebebasan|自由になれる|自由', 'Founders can move on.|Pendiri bisa melanjutkan hidup.|創業者が、次に進める。|创始人可转向新事物。'),
      I('cap', 'biz,fin', 'safe', 2, 'Reduces personal risk|Mengurangi risiko pribadi|個人リスクの低減|降低个人风险', 'Wealth is no longer tied to one firm.|Kekayaan tidak lagi terikat pada satu perusahaan.|資産が、1社に縛られなくなる。|财富不再绑定一家公司。'),
      I('cap', 'biz,mfg', 'new', 2, 'New owner may grow it|Pemilik baru bisa mengembangkannya|新しい所有者が成長させる|新主人可能做大', 'More resources and ideas.|Lebih banyak sumber daya dan ide.|より多くの資源とアイデアが投入される。|更多资源与创意。')
    ], [
      I('ppl', 'biz,fam', 'sad', 3, 'Emotional loss|Kehilangan emosional|感情的な喪失|情感失落', 'It was your life\'s work.|Itu adalah karya hidup Anda.|人生をかけた仕事を手放す。|那是你一生的事业。'),
      I('ppl', 'biz', 'job', 2, 'Staff uncertainty|Ketidakpastian staf|従業員の不安|员工不安', 'New owners may cut jobs.|Pemilik baru mungkin memangkas pekerjaan.|新しい所有者が、人員を削減するかもしれない。|新主人可能裁员。'),
      I('cost', 'biz,fin', 'tax', 2, 'Taxes and fees|Pajak dan biaya|税金と手数料|税费与手续费', 'Advisers and tax reduce proceeds.|Penasihat dan pajak mengurangi hasil.|アドバイザー費用と税で、手取りが減る。|顾问费与税款减少所得。'),
      I('risk', 'biz,fin', 'lose', 2, 'Undervaluation|Penilaian terlalu rendah|安く売る恐れ|估值偏低', 'Selling at the wrong time costs millions.|Menjual di waktu yang salah merugikan jutaan.|時期を誤ると、大きく損をする。|时机不对损失巨大。')
    ]),
    C('market segmentation', 'Market segmentation|Segmentasi pasar|市場細分化|市场细分', ['mass market'], [
      I('mkt', 'retail,food,edu', 'customer', 3, 'Tailored offers|Penawaran disesuaikan|ニーズに合った提案|定制化提供', 'Different groups get what suits them.|Kelompok berbeda mendapat yang cocok.|グループごとに、合った提案ができる。|不同群体获得合适方案。'),
      I('val', 'retail,biz', 'profit', 2, 'Efficient marketing|Pemasaran efisien|効率的なマーケティング|营销高效', 'Spend where response is highest.|Belanja di tempat respons tertinggi.|反応の良いところに投じる。|把钱花在回应最高处。'),
      I('mkt', 'retail,biz', 'find', 2, 'Finds underserved groups|Menemukan kelompok yang kurang terlayani|未開拓層の発見|发现被忽视群体', 'Spot gaps rivals ignore.|Melihat celah yang diabaikan pesaing.|競合が見ていない隙間を見つける。|发现对手忽视的空白。'),
      I('cap', 'biz,retail', 'know', 2, 'Clearer positioning|Posisi lebih jelas|ポジショニングが明確|定位更清晰', 'You know who you serve.|Anda tahu siapa yang dilayani.|誰のための商品か、明確になる。|清楚服务对象。')
    ], [
      I('cost', 'retail,mfg', 'expensive', 3, 'Higher costs|Biaya lebih tinggi|コストが増える|成本上升', 'More products and campaigns.|Lebih banyak produk dan kampanye.|商品も施策も、増える。|产品与活动增多。'),
      I('risk', 'retail,biz', 'wrong', 2, 'Wrong segments|Segmen yang salah|セグメントの誤り|细分错误', 'Bad assumptions about groups.|Asumsi salah tentang kelompok.|グループの想定が、外れる。|对群体假设有误。'),
      I('risk', 'retail,pub', 'stereotype', 2, 'Stereotyping|Stereotip|ステレオタイプ|刻板印象', 'People do not fit boxes neatly.|Orang tidak muat rapi dalam kotak.|人は、型にきれいに収まらない。|人无法整齐归类。'),
      I('eff', 'biz,retail', 'complex', 2, 'Complex operations|Operasional rumit|運営が複雑|运营复杂', 'Many offers to manage.|Banyak penawaran untuk dikelola.|管理する提案が、多くなる。|需管理多种产品。')
    ])
  );
})();
