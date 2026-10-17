/* Word Network: curated concepts, batch 2 (strategy and structure). Same format as data/lens.js. Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('centralization', 'Centralization|Sentralisasi|集中化|集权', ['decentralization'], [
      I('cap', 'pub,biz', 'control', 3, 'Tight control|Kendali ketat|統制しやすい|控制严密', 'Decisions and standards are the same everywhere.|Keputusan dan standar sama di mana-mana.|意思決定と基準がどこでも同じになる。|决策和标准处处一致。'),
      I('val', 'mfg,retail', 'save', 3, 'Lower overhead|Biaya overhead lebih rendah|間接費の削減|管理成本更低', 'One team and one system replace many copies.|Satu tim dan satu sistem menggantikan banyak salinan.|1つのチームとシステムが、複数の重複を置き換える。|一个团队、一套系统取代多份重复。'),
      I('cap', 'fin,health', 'rules', 2, 'Consistent rules|Aturan konsisten|ルールの一貫性|规则一致', 'Compliance and reporting are easier to manage.|Kepatuhan dan pelaporan lebih mudah dikelola.|コンプライアンスと報告を管理しやすい。|合规与汇报更易管理。'),
      I('mkt', 'retail,biz', 'brand', 2, 'Uniform brand|Merek seragam|ブランドの統一|品牌统一', 'Customers get the same experience in every place.|Pelanggan mendapat pengalaman yang sama di setiap tempat.|どの場所でも同じ体験を顧客に届けられる。|客户在各地获得相同体验。')
    ], [
      I('eff', 'pub,biz', 'slow', 3, 'Slow decisions|Keputusan lambat|意思決定が遅い|决策缓慢', 'Every issue must travel up to headquarters.|Setiap masalah harus naik ke kantor pusat.|あらゆる案件が本社まで上がる必要がある。|每件事都得上报总部。'),
      I('risk', 'retail,food,pub', 'wrong', 3, 'Misses local reality|Tidak peka kondisi lokal|現地の実情を見落とす|忽视本地实情', 'Headquarters may not see what the front line sees.|Kantor pusat mungkin tidak melihat apa yang dilihat lapangan.|本社は現場が見ているものを把握できないことがある。|总部可能看不到一线所见。'),
      I('ppl', 'biz,pub', 'power', 2, 'Low initiative|Inisiatif rendah|主体性の低下|主动性低', 'Local managers wait for orders instead of acting.|Manajer lokal menunggu perintah, bukan bertindak.|現場の管理者が、動かずに指示を待つようになる。|当地管理者等待指令而不主动行动。'),
      I('risk', 'fin,biz', 'danger', 2, 'Single point of failure|Satu titik kegagalan|単一障害点|单点故障', 'Mistakes at the centre spread to every unit.|Kesalahan di pusat menyebar ke semua unit.|中枢のミスが全部門に広がる。|中央的错误会扩散到所有单位。')
    ]),
    C('decentralization', 'Decentralization|Desentralisasi|分権化|分权', ['centralization'], [
      I('cap', 'retail,food,pub', 'fast', 3, 'Quick local decisions|Keputusan lokal cepat|現場の迅速な判断|本地决策迅速', 'People close to the customer act without waiting.|Orang yang dekat dengan pelanggan bertindak tanpa menunggu.|顧客に近い人が、待たずに動ける。|贴近客户的人无需等待就能行动。'),
      I('mkt', 'retail,food', 'customer', 3, 'Fits local needs|Sesuai kebutuhan lokal|地域のニーズに合う|贴合本地需求', 'Offers and service adapt to each place.|Penawaran dan layanan menyesuaikan tiap tempat.|提供内容とサービスを地域ごとに調整できる。|产品与服务可因地制宜。'),
      I('ppl', 'biz,pub', 'proud', 2, 'Ownership and motivation|Rasa memiliki dan motivasi|当事者意識とやる気|主人翁意识与动力', 'Managers who own results care more.|Manajer yang memegang hasil lebih peduli.|成果を任される管理者ほど、責任感が強くなる。|对结果负责的管理者更用心。'),
      I('cap', 'biz,edu', 'learn', 2, 'Grows leaders|Menumbuhkan pemimpin|リーダーが育つ|培养领导者', 'Units become training grounds for future executives.|Unit menjadi tempat latihan calon eksekutif.|各部門が、将来の幹部を育てる場になる。|各单位成为未来管理者的训练场。')
    ], [
      I('risk', 'fin,mfg,biz', 'control', 3, 'Loss of control|Kehilangan kendali|統制の弱まり|失去控制', 'Units may drift away from the overall strategy.|Unit bisa menyimpang dari strategi keseluruhan.|各部門が全体戦略から離れていく恐れがある。|各单位可能偏离整体战略。'),
      I('cost', 'mfg,retail', 'waste', 3, 'Duplicated effort|Pekerjaan ganda|重複作業|重复劳动', 'Each unit builds its own systems and teams.|Setiap unit membangun sistem dan tim sendiri.|部門ごとにシステムと人員を持つことになる。|每个单位各建一套系统和团队。'),
      I('risk', 'retail,biz', 'brand', 2, 'Inconsistent brand|Merek tidak konsisten|ブランドのばらつき|品牌不一致', 'Customers see different standards in different places.|Pelanggan melihat standar berbeda di tempat berbeda.|場所によって基準が違い、顧客が戸惑う。|客户在不同地方看到不同标准。'),
      I('ppl', 'pub,biz', 'conflict', 2, 'Turf wars|Perebutan wilayah|縄張り争い|地盘之争', 'Units compete with each other rather than cooperate.|Unit bersaing satu sama lain, bukan bekerja sama.|部門同士が協力せず、競い合ってしまう。|各单位互相竞争而非合作。')
    ]),
    C('vertical integration', 'Vertical integration|Integrasi vertikal|垂直統合|垂直整合', ['outsourcing'], [
      I('cap', 'mfg,food', 'control', 3, 'Control of supply|Kendali pasokan|供給の掌握|掌控供应', 'You are not at the mercy of suppliers or distributors.|Anda tidak bergantung pada pemasok atau distributor.|仕入先や販売業者に左右されずに済む。|不受供应商或分销商摆布。'),
      I('val', 'mfg,food,retail', 'profit', 3, 'Captures more margin|Menangkap margin lebih besar|利益を取り込める|获取更多利润', 'You keep the profit made at each step.|Anda menyimpan laba dari setiap tahap.|各段階の利益を自社に残せる。|每个环节的利润都归自己。'),
      I('mkt', 'food,health', 'quality', 2, 'Quality from end to end|Kualitas dari hulu ke hilir|一貫した品質|全程质量把控', 'You can check standards at every step.|Anda bisa memeriksa standar di setiap langkah.|全工程で基準を確認できる。|每一步都能检查标准。'),
      I('cap', 'mfg,biz', 'secret', 2, 'Protects know-how|Melindungi pengetahuan|ノウハウの保護|保护技术秘密', 'Key knowledge stays inside the company.|Pengetahuan kunci tetap di dalam perusahaan.|重要なノウハウが社内にとどまる。|关键知识留在公司内部。')
    ], [
      I('cost', 'mfg,fin', 'expensive', 3, 'Heavy investment|Investasi besar|大きな投資|投资沉重', 'Owning factories, fleets and shops ties up capital.|Memiliki pabrik, armada, dan toko mengikat modal.|工場・車両・店舗を持つと、資本が固定される。|拥有工厂、车队和店铺会占用大量资金。'),
      I('risk', 'mfg,retail', 'depend', 3, 'Less flexible|Kurang fleksibel|柔軟性の低下|灵活性下降', 'Hard to switch when a step becomes outdated.|Sulit berganti saat satu tahap menjadi usang.|ある工程が時代遅れになっても、切り替えにくい。|某一环节过时时难以转换。'),
      I('eff', 'biz,mfg', 'complex', 2, 'Complex management|Manajemen rumit|管理の複雑化|管理复杂', 'Running many different businesses needs many skills.|Menjalankan banyak bisnis berbeda butuh banyak keahlian.|多様な事業を回すには、幅広い能力が要る。|同时经营多种业务需要多种能力。'),
      I('risk', 'mfg,food', 'fail', 2, 'Weak link drags all|Satu mata rantai lemah menyeret semua|弱い工程が全体を引っ張る|弱环拖累整体', 'A failing step hurts every other step you own.|Satu tahap yang gagal merugikan semua tahap lain yang Anda miliki.|うまくいかない工程が、他の工程にも悪影響を及ぼす。|一个环节失败会拖累你拥有的其他环节。')
    ]),
    C('horizontal integration', 'Horizontal integration|Integrasi horizontal|水平統合|横向整合', ['competition'], [
      I('mkt', 'retail,biz', 'market', 3, 'Bigger market share|Pangsa pasar lebih besar|市場シェアの拡大|市场份额更大', 'Joining similar businesses removes or absorbs rivals.|Menggabungkan bisnis sejenis menyingkirkan atau menyerap pesaing.|同業を統合すれば、競合を取り込める。|合并同类业务可消除或吸收对手。'),
      I('val', 'mfg,retail', 'save', 3, 'Shared costs|Biaya bersama|コストの共有|成本共享', 'Purchasing, systems and staff can be combined.|Pembelian, sistem, dan staf dapat digabung.|購買・システム・人員を統合できる。|采购、系统和人员可以合并。'),
      I('cap', 'biz,fin', 'power', 2, 'Stronger bargaining|Tawar-menawar lebih kuat|交渉力の強化|议价更强', 'Larger orders win better terms from suppliers.|Pesanan lebih besar memperoleh syarat lebih baik dari pemasok.|大口の発注で、仕入先から良い条件を引き出せる。|更大订单能向供应商争取更好条件。'),
      I('val', 'retail,biz', 'choice', 2, 'Wider range|Pilihan lebih lengkap|品ぞろえの拡大|品类更丰富', 'Combined product lines serve more customers.|Lini produk gabungan melayani lebih banyak pelanggan.|商品ラインを統合し、より多くの顧客に応えられる。|合并产品线可服务更多客户。')
    ], [
      I('risk', 'pub,fin', 'law', 3, 'Antitrust scrutiny|Pengawasan antimonopoli|独占禁止法の審査|反垄断审查', 'Authorities may block deals that reduce competition.|Otoritas dapat memblokir kesepakatan yang mengurangi persaingan.|当局が、競争を弱める統合を阻止することがある。|监管机构可能阻止削弱竞争的交易。'),
      I('ppl', 'biz,pub', 'conflict', 3, 'Culture clash|Benturan budaya|文化の衝突|文化冲突', 'Two ways of working must become one.|Dua cara kerja harus menjadi satu.|2つの仕事の流儀を1つにしなければならない。|两种做事方式必须合而为一。'),
      I('cost', 'fin,biz', 'expensive', 2, 'Costly purchase|Harga akuisisi mahal|買収コストが高い|收购代价高', 'Buying a rival often means paying a premium.|Membeli pesaing sering berarti membayar harga premium.|競合の買収には、しばしば上乗せ価格が必要になる。|收购对手往往要付溢价。'),
      I('risk', 'retail,biz', 'lose', 2, 'Customer overlap|Pelanggan yang tumpang tindih|顧客の重複|客户重叠', 'Both brands may lose buyers who disliked the merger.|Kedua merek bisa kehilangan pembeli yang tidak suka penggabungan.|統合を嫌った顧客を、両ブランドが失うことがある。|两个品牌都可能流失不喜欢合并的买家。')
    ]),
    C('first-mover advantage', 'First-mover advantage|Keunggulan pelopor|先行者優位|先发优势', ['fast follower'], [
      I('mkt', 'retail,biz', 'first', 3, 'Early customers|Pelanggan awal|初期顧客の獲得|早期客户', 'You set habits before anyone else is there.|Anda membentuk kebiasaan sebelum ada pesaing.|他社がいないうちに、顧客の習慣を作れる。|在对手出现前培养客户习惯。'),
      I('cap', 'biz,mfg', 'learn', 3, 'Learning head start|Belajar lebih dulu|学習の先行|学习领先', 'You learn what works while others are still watching.|Anda belajar apa yang berhasil saat yang lain masih menonton.|他社が様子見している間に、何が効くかを学べる。|别人观望时你已知道什么有效。'),
      I('mkt', 'biz,retail', 'name', 2, 'Brand recognition|Dikenal sebagai yang pertama|ブランド認知|品牌认知', 'The first name in a category often stays the default.|Nama pertama dalam kategori sering tetap jadi pilihan utama.|カテゴリの先駆者は、そのまま定番になりやすい。|品类中的第一个名字往往成为默认选择。'),
      I('cap', 'mfg,fin', 'power', 2, 'Locks in partners|Mengunci mitra|パートナーの囲い込み|锁定伙伴', 'You can sign the best suppliers, sites and talent first.|Anda bisa menggaet pemasok, lokasi, dan talenta terbaik lebih dulu.|最良の仕入先・立地・人材を先に押さえられる。|可抢先签下最好的供应商、地点和人才。')
    ], [
      I('cost', 'biz,health,mfg', 'expensive', 3, 'Pays for education|Membayar biaya mengedukasi pasar|市場教育のコスト|承担教育市场的成本', 'You spend to teach buyers a new idea.|Anda mengeluarkan uang untuk mengenalkan ide baru.|買い手に新しい考え方を教えるための費用がかかる。|你要花钱教会买家接受新事物。'),
      I('risk', 'biz,fin', 'fail', 3, 'Higher failure risk|Risiko gagal lebih tinggi|失敗リスクが高い|失败风险更高', 'Technology and demand are still uncertain.|Teknologi dan permintaan masih tidak pasti.|技術も需要も、まだ不確実。|技术和需求都还不确定。'),
      I('risk', 'retail,mfg', 'copy', 2, 'Followers copy and improve|Pengikut meniru dan menyempurnakan|後発に真似され改良される|后来者模仿并改进', 'Rivals learn from your mistakes at no cost.|Pesaing belajar dari kesalahan Anda tanpa biaya.|競合は、あなたの失敗から無料で学べる。|对手免费从你的错误中学习。'),
      I('eff', 'biz,pub', 'time', 2, 'Rushed launches|Peluncuran terburu-buru|拙速な市場投入|仓促上市', 'Being first can mean releasing before the product is ready.|Menjadi yang pertama bisa berarti merilis sebelum produk siap.|先行を急ぐと、製品が未完成のまま出すことになる。|抢先可能意味着产品没准备好就发布。')
    ]),
    C('fast follower', 'Fast follower|Pengikut cepat|ファストフォロワー|快速跟随者', ['first-mover advantage'], [
      I('val', 'biz,mfg', 'save', 3, 'Lower risk and cost|Risiko dan biaya lebih rendah|低リスク・低コスト|风险与成本更低', 'You skip the expensive experiments.|Anda melewati percobaan yang mahal.|高くつく実験を省ける。|省去昂贵的试验。'),
      I('cap', 'biz,retail', 'learn', 3, 'Learn from pioneers|Belajar dari pelopor|先駆者から学べる|向先行者学习', 'You see which ideas customers actually accept.|Anda melihat ide mana yang benar-benar diterima pelanggan.|どの案を顧客が実際に受け入れるかを見られる。|能看到客户真正接受哪些想法。'),
      I('mkt', 'retail,mfg', 'improve', 2, 'Better product|Produk lebih baik|より良い製品|产品更好', 'You fix the first version flaws before launching.|Anda memperbaiki kekurangan versi pertama sebelum meluncur.|初代の欠点を直してから投入できる。|上市前就修正首版的缺陷。'),
      I('mkt', 'biz,food', 'market', 2, 'Proven demand|Permintaan terbukti|実証された需要|需求已被验证', 'The market already exists, so selling is easier.|Pasar sudah ada, sehingga menjual lebih mudah.|市場がすでにあるため、売りやすい。|市场已存在，销售更容易。')
    ], [
      I('risk', 'biz,retail', 'lose', 3, 'Pioneer owns the market|Pelopor menguasai pasar|先行者に市場を握られる|先行者占据市场', 'Early customers and partners may be taken already.|Pelanggan dan mitra awal mungkin sudah diambil.|初期の顧客やパートナーは、すでに押さえられているかもしれない。|早期客户和伙伴可能已被占走。'),
      I('mkt', 'retail,biz', 'name', 2, 'Looks like a copycat|Terlihat seperti peniru|模倣者に見える|像个模仿者', 'Buyers may see you as second best.|Pembeli mungkin menganggap Anda nomor dua.|買い手に、2番手と見られる恐れがある。|买家可能视你为二流。'),
      I('risk', 'mfg,biz', 'law', 2, 'Patent barriers|Hambatan paten|特許の壁|专利障碍', 'Pioneers may protect key ideas legally.|Pelopor mungkin melindungi ide kunci secara hukum.|先行者が重要なアイデアを特許で守っていることがある。|先行者可能用法律保护核心想法。'),
      I('cap', 'biz,pub', 'slow', 2, 'Always reacting|Selalu bereaksi|常に後追い|总是被动', 'You wait for others to lead, so the team may lose initiative.|Anda menunggu orang lain memimpin, sehingga tim bisa kehilangan inisiatif.|他社の動きを待つうちに、チームの主導権が失われることがある。|总等别人带头，团队可能失去主动性。')
    ]),
    C('niche focus', 'Niche focus|Fokus ceruk|ニッチ集中|聚焦细分市场', ['mass market'], [
      I('mkt', 'retail,food,health', 'loyal', 3, 'Loyal customers|Pelanggan setia|熱心な顧客|忠诚客户', 'Specialists earn trust from a small group.|Spesialis mendapat kepercayaan dari kelompok kecil.|専門家は、特定の層から強い信頼を得る。|专业者在小众中赢得信任。'),
      I('val', 'retail,food', 'premium', 3, 'Premium prices|Harga premium|高価格を維持できる|可卖高价', 'Few rivals and strong need allow higher prices.|Sedikit pesaing dan kebutuhan kuat memungkinkan harga lebih tinggi.|競合が少なく需要が強いので、高めの価格をつけられる。|竞争少、需求强，可定更高价格。'),
      I('cap', 'biz,mfg', 'skill', 2, 'Deep expertise|Keahlian mendalam|深い専門性|专长深厚', 'Focus builds skills that are hard to copy.|Fokus membangun keterampilan yang sulit ditiru.|集中することで、真似しにくい技能が育つ。|专注积累难以复制的技能。'),
      I('val', 'biz,food', 'cost', 2, 'Efficient marketing|Pemasaran efisien|効率的なマーケティング|营销高效', 'You know exactly where to find buyers.|Anda tahu persis di mana menemukan pembeli.|買い手がどこにいるかを正確に把握できる。|你确切知道去哪里找买家。')
    ], [
      I('risk', 'retail,biz', 'limit', 3, 'Small market ceiling|Batas pasar kecil|市場規模の限界|市场天花板低', 'Growth is capped by the size of the niche.|Pertumbuhan dibatasi ukuran ceruk.|成長が、ニッチの大きさで頭打ちになる。|增长受限于细分市场的规模。'),
      I('risk', 'biz,fin', 'depend', 3, 'Vulnerable to change|Rentan terhadap perubahan|変化に弱い|易受变化冲击', 'If the niche shrinks, the business shrinks with it.|Jika ceruk mengecil, bisnis ikut mengecil.|ニッチが縮めば、事業も一緒に縮む。|细分市场缩小，业务随之缩小。'),
      I('risk', 'retail,mfg', 'copy', 2, 'Big rivals can enter|Pesaing besar bisa masuk|大手が参入しうる|大企业可能进入', 'A larger firm may notice and take your customers.|Perusahaan lebih besar mungkin menyadari dan merebut pelanggan Anda.|大手が気づいて、顧客を奪いに来ることがある。|大公司可能注意到并抢走你的客户。'),
      I('cost', 'retail,mfg', 'cost', 2, 'Small volumes|Volume kecil|少量生産になる|量小成本高', 'Low volume keeps unit costs high.|Volume rendah membuat biaya per unit tetap tinggi.|数量が少なく、単価が下がりにくい。|量少使单位成本居高不下。')
    ]),
    C('mass market', 'Mass market|Pasar massal|マスマーケット|大众市场', ['niche focus'], [
      I('val', 'mfg,retail,food', 'profit', 3, 'High volume|Volume tinggi|大量販売|销量大', 'Many small sales add up to large revenue.|Banyak penjualan kecil menjadi pendapatan besar.|少額の販売でも、積み上げれば大きな収益になる。|许多小额销售汇成可观收入。'),
      I('val', 'mfg,food', 'save', 3, 'Scale savings|Penghematan skala|規模のメリット|规模节约', 'Large production lowers the cost of each item.|Produksi besar menurunkan biaya tiap barang.|大量生産で、1個あたりのコストが下がる。|大批量生产降低每件成本。'),
      I('mkt', 'retail,food', 'reach', 2, 'Wide reach|Jangkauan luas|幅広い到達|覆盖广泛', 'Your product is known and available everywhere.|Produk Anda dikenal dan tersedia di mana-mana.|製品が広く知られ、どこでも手に入る。|产品随处可见、广为人知。'),
      I('cap', 'biz,pub', 'safe', 2, 'Diversified customers|Pelanggan beragam|顧客の分散|客户分散', 'Losing a few buyers hardly matters.|Kehilangan sedikit pembeli hampir tidak berpengaruh.|数人の顧客を失っても、影響は小さい。|流失几个买家影响很小。')
    ], [
      I('cost', 'retail,food', 'cheap', 3, 'Price competition|Persaingan harga|価格競争|价格竞争', 'Products look alike, so price becomes the battle.|Produk tampak mirip, sehingga harga menjadi arena pertarungan.|製品が似ているため、価格での勝負になる。|产品相似，只能拼价格。'),
      I('risk', 'retail,biz', 'name', 2, 'Weak loyalty|Loyalitas lemah|ロイヤルティが弱い|忠诚度低', 'Buyers switch easily for a small saving.|Pembeli mudah pindah demi penghematan kecil.|少し安ければ、買い手はすぐ乗り換える。|买家为一点便宜就会换。'),
      I('cost', 'retail,mfg', 'advertising', 2, 'Heavy marketing spend|Biaya pemasaran besar|多額のマーケ費|营销开支大', 'Reaching everyone takes constant advertising.|Menjangkau semua orang butuh iklan terus-menerus.|全員に届けるには、広告を打ち続ける必要がある。|触达所有人需要持续投放广告。'),
      I('risk', 'mfg,biz', 'plan', 2, 'Slow to adapt|Lambat beradaptasi|変化への対応が遅い|适应缓慢', 'Big standard products are hard to change quickly.|Produk standar yang besar sulit diubah cepat.|大規模な標準品は、素早く変えにくい。|大规模标准化产品难以快速调整。')
    ]),
    C('cost leadership', 'Cost leadership|Kepemimpinan biaya|コストリーダーシップ|成本领先', ['differentiation'], [
      I('val', 'retail,mfg', 'profit', 3, 'Profit at low prices|Untung di harga rendah|低価格でも利益が出る|低价仍盈利', 'Low costs let you earn even when rivals cannot.|Biaya rendah memungkinkan Anda untung saat pesaing tidak bisa.|低コストなら、競合が赤字の価格でも利益を出せる。|成本低，对手亏钱时你仍能盈利。'),
      I('mkt', 'retail,food', 'cheap', 3, 'Attracts price-sensitive buyers|Menarik pembeli peka harga|価格重視の客を引きつける|吸引价格敏感客户', 'Many customers choose the cheapest reliable option.|Banyak pelanggan memilih opsi termurah yang andal.|多くの顧客が、信頼できる最安の選択肢を選ぶ。|许多客户选择最便宜的可靠选项。'),
      I('cap', 'mfg,retail', 'power', 2, 'Barrier to rivals|Penghalang bagi pesaing|競合への参入障壁|对手的壁垒', 'Newcomers struggle to match your costs.|Pendatang baru sulit menyamai biaya Anda.|新規参入者は、あなたのコストに追いつきにくい。|新进入者难以匹敌你的成本。'),
      I('val', 'mfg,biz', 'save', 2, 'Cushion in a downturn|Bantalan saat krisis|不況への耐性|经济下行时有缓冲', 'Lean operations survive hard times better.|Operasi ramping bertahan lebih baik di masa sulit.|無駄のない運営は、苦しい時期に強い。|精简运营更能扛过困难时期。')
    ], [
      I('risk', 'retail,mfg', 'war', 3, 'Price wars|Perang harga|価格競争の泥沼|价格战', 'A bigger rival can always cut deeper.|Pesaing yang lebih besar selalu bisa memotong lebih dalam.|大手は、さらに深く値下げできる。|更大的对手总能降得更深。'),
      I('risk', 'retail,food', 'quality', 3, 'Quality corners cut|Kualitas dikorbankan|品質を削る誘惑|偷工减料的诱惑', 'Cutting cost can quietly cut quality too.|Memangkas biaya bisa diam-diam memangkas kualitas.|コスト削減が、知らぬ間に品質も削る。|压成本可能悄悄压低质量。'),
      I('ppl', 'mfg,retail', 'poor', 2, 'Pressure on staff and suppliers|Tekanan pada staf dan pemasok|従業員・取引先への圧力|对员工与供应商施压', 'Low pay and tight terms may hurt loyalty.|Gaji rendah dan syarat ketat bisa merusak loyalitas.|低賃金や厳しい条件は、忠誠心を損なう。|低薪与苛刻条件会损害忠诚。'),
      I('risk', 'mfg,biz', 'change', 2, 'Hard to change course|Sulit berbelok arah|方向転換しにくい|难以转向', 'Efficient systems are built for one way of working.|Sistem efisien dibangun untuk satu cara kerja.|効率的な仕組みは、1つのやり方に最適化されている。|高效系统只适合一种运作方式。')
    ]),
    C('differentiation', 'Differentiation|Diferensiasi|差別化|差异化', ['cost leadership'], [
      I('val', 'retail,mfg', 'premium', 3, 'Higher prices|Harga lebih tinggi|高価格が可能|可定更高价', 'Unique value lets you charge more.|Nilai unik memungkinkan Anda memasang harga lebih tinggi.|独自の価値があるので、高く売れる。|独特价值让你能卖得更贵。'),
      I('mkt', 'retail,food', 'loyal', 3, 'Customer loyalty|Loyalitas pelanggan|顧客ロイヤルティ|客户忠诚', 'People who value the difference keep coming back.|Orang yang menghargai perbedaan itu terus kembali.|違いを評価する人は、繰り返し買ってくれる。|认同差异的人会反复购买。'),
      I('cap', 'biz,mfg', 'idea', 2, 'Escapes price wars|Terhindar dari perang harga|価格競争を避けられる|避开价格战', 'Buyers compare features, not just cost.|Pembeli membandingkan fitur, bukan sekadar harga.|買い手は、価格だけでなく特徴を比べる。|买家比较的是特色，而非只看价格。'),
      I('ppl', 'biz,edu', 'proud', 2, 'Pride and identity|Kebanggaan dan identitas|誇りとアイデンティティ|自豪与认同感', 'Staff like working on something distinctive.|Staf senang mengerjakan sesuatu yang khas.|社員は、独自性のある仕事に誇りを持てる。|员工乐于做与众不同的事。')
    ], [
      I('cost', 'retail,mfg', 'expensive', 3, 'Costly to create and keep|Mahal dibuat dan dipertahankan|維持にコストがかかる|创造与维持成本高', 'Design, research and marketing cost extra.|Desain, riset, dan pemasaran memakan biaya tambahan.|設計・研究・マーケに追加の費用がかかる。|设计、研究和营销都要额外花钱。'),
      I('risk', 'retail,biz', 'copy', 3, 'Easily imitated|Mudah ditiru|真似されやすい|易被模仿', 'A difference that is visible can be copied.|Perbedaan yang terlihat bisa ditiru.|見える違いは、真似されうる。|看得见的差异就能被模仿。'),
      I('risk', 'retail,food', 'price', 2, 'Customers may not value it|Pelanggan mungkin tidak menghargai|顧客が価値を感じないことも|客户未必买账', 'What you think is special may not matter to buyers.|Hal yang Anda anggap istimewa mungkin tidak penting bagi pembeli.|自分が特別だと思う点が、買い手には響かないことがある。|你认为特别的东西，买家未必在意。'),
      I('eff', 'biz,mfg', 'effort', 2, 'Constant renewal|Perlu pembaruan terus-menerus|常に刷新が必要|需不断更新', 'Yesterday difference becomes today standard.|Perbedaan kemarin menjadi standar hari ini.|昨日の違いは、今日の標準になる。|昨天的差异会变成今天的标配。')
    ]),
    C('platform business', 'Platform business|Bisnis platform|プラットフォーム事業|平台业务', ['ecosystem'], [
      I('mkt', 'retail,biz', 'reach', 3, 'Network growth|Pertumbuhan jaringan|ネットワークの成長|网络增长', 'Each new user makes the platform more useful for others.|Setiap pengguna baru membuat platform lebih berguna bagi yang lain.|利用者が増えるほど、他の人にとっても便利になる。|每个新用户都让平台对其他人更有用。'),
      I('val', 'biz,fin', 'profit', 3, 'Scales cheaply|Berkembang dengan murah|低コストで拡大|扩张成本低', 'You connect others instead of owning every product.|Anda menghubungkan pihak lain, bukan memiliki setiap produk.|すべての製品を持たず、他者をつなぐだけで拡大できる。|你只需连接他人，不必拥有每件产品。'),
      I('cap', 'biz,pub', 'data', 2, 'Rich data|Data yang kaya|豊富なデータ|数据丰富', 'Every interaction teaches you about demand.|Setiap interaksi mengajarkan Anda tentang permintaan.|やり取りのたびに、需要について学べる。|每次互动都让你更了解需求。'),
      I('mkt', 'retail,food', 'choice', 2, 'Wide choice|Pilihan luas|豊富な選択肢|选择丰富', 'Users find many options in one place.|Pengguna menemukan banyak opsi di satu tempat.|利用者は、1か所で多くの選択肢に出会える。|用户在一处就能找到众多选项。')
    ], [
      I('risk', 'biz,retail', 'depend', 3, 'Chicken-and-egg start|Awal sulit: ayam atau telur|立ち上げの難しさ|冷启动难题', 'Buyers want sellers and sellers want buyers.|Pembeli ingin penjual dan penjual ingin pembeli.|買い手は売り手を、売り手は買い手を求める。|买家要卖家，卖家要买家。'),
      I('cost', 'retail,biz', 'expensive', 3, 'Costly subsidies|Subsidi yang mahal|補助金の負担|补贴成本高', 'Discounts and incentives drain cash early on.|Diskon dan insentif menguras kas di awal.|値引きや特典が、初期に資金を消耗させる。|折扣与激励在早期消耗现金。'),
      I('risk', 'retail,pub', 'cheat', 2, 'Trust and abuse|Kepercayaan dan penyalahgunaan|信頼と悪用|信任与滥用', 'Fraud and fake reviews can ruin the platform.|Penipuan dan ulasan palsu bisa merusak platform.|詐欺や偽レビューが、プラットフォームを壊しうる。|欺诈与虚假评论可毁掉平台。'),
      I('risk', 'biz,fin', 'lose', 2, 'Participants can leave|Peserta bisa pergi|参加者が離れる|参与者可能离开', 'Users can switch to or join another platform.|Pengguna bisa pindah atau bergabung ke platform lain.|利用者は、別のプラットフォームへ移ったり併用したりできる。|用户可能转去或同时使用别的平台。')
    ]),
    C('ecosystem', 'Business ecosystem|Ekosistem bisnis|ビジネスエコシステム|商业生态系统', ['platform business'], [
      I('cap', 'biz,mfg', 'share', 3, 'Shared strengths|Kekuatan bersama|強みの共有|优势共享', 'Partners fill gaps that you cannot fill alone.|Mitra mengisi celah yang tidak bisa Anda isi sendiri.|単独では埋められない部分を、パートナーが補う。|伙伴填补你独自无法填补的空白。'),
      I('mkt', 'retail,biz', 'customer', 3, 'Customer lock-in|Pelanggan terikat|顧客の囲い込み|客户黏性', 'Customers who use many linked services stay longer.|Pelanggan yang memakai banyak layanan terkait bertahan lebih lama.|関連サービスを多く使う顧客は、長く留まる。|使用多项关联服务的客户留存更久。'),
      I('cap', 'biz,pub', 'idea', 2, 'Faster innovation|Inovasi lebih cepat|イノベーションの加速|创新更快', 'Many players try ideas around the same core.|Banyak pihak mencoba ide di sekitar inti yang sama.|多くの参加者が、同じ中核の周りで新しい試みをする。|众多参与者围绕同一核心尝试新想法。'),
      I('val', 'fin,biz', 'safe', 2, 'Resilience|Ketahanan|強靭性|韧性', 'If one player fails, others can step in.|Jika satu pihak gagal, yang lain bisa menggantikan.|1社が脱落しても、他社が代わりに入れる。|一方失败，其他方可以顶上。')
    ], [
      I('risk', 'biz,mfg', 'depend', 3, 'Dependence on others|Ketergantungan pada pihak lain|他者への依存|依赖他人', 'Your success depends on partners you do not control.|Keberhasilan Anda bergantung pada mitra yang tidak Anda kendalikan.|成否が、自社でコントロールできないパートナーに左右される。|你的成功取决于无法掌控的伙伴。'),
      I('eff', 'biz,pub', 'control', 2, 'Hard to coordinate|Sulit dikoordinasi|調整が難しい|协调困难', 'Many players with different goals must pull together.|Banyak pihak dengan tujuan berbeda harus bergerak bersama.|目的の異なる多くの参加者を、まとめる必要がある。|目标各异的众多参与者必须协同行动。'),
      I('risk', 'biz,retail', 'power', 2, 'Power imbalance|Ketimpangan kekuatan|力関係の偏り|力量失衡', 'The biggest player can set unfair rules.|Pemain terbesar bisa menetapkan aturan yang tidak adil.|最大の参加者が、不公平なルールを決められる。|最大的参与者可能制定不公平的规则。'),
      I('cost', 'biz,fin', 'share', 2, 'Shared profit|Laba harus dibagi|利益の分配|利润要分享', 'Value created together must be divided.|Nilai yang diciptakan bersama harus dibagi.|共同で生んだ価値は、分け合う必要がある。|共同创造的价值必须分配。')
    ]),
    C('open innovation', 'Open innovation|Inovasi terbuka|オープンイノベーション|开放式创新', ['innovation'], [
      I('cap', 'biz,edu', 'idea', 3, 'More ideas|Lebih banyak ide|多くのアイデア|更多点子', 'Outside experts, customers and start-ups add fresh thinking.|Pakar luar, pelanggan, dan startup menambah pemikiran segar.|外部の専門家・顧客・スタートアップが、新しい発想をもたらす。|外部专家、客户和初创企业带来新思路。'),
      I('val', 'mfg,biz', 'save', 2, 'Lower R&D cost|Biaya riset lebih rendah|研究開発費の節約|研发成本更低', 'You use ideas others have already developed.|Anda memakai ide yang sudah dikembangkan pihak lain.|他者がすでに開発した成果を活用できる。|可以利用别人已开发的成果。'),
      I('mkt', 'biz,retail', 'fast', 2, 'Faster to market|Lebih cepat ke pasar|市場投入が速い|上市更快', 'Partners shorten the path from idea to product.|Mitra mempersingkat jalan dari ide ke produk.|パートナーが、アイデアから製品化までの道のりを短縮する。|伙伴缩短了从想法到产品的路程。'),
      I('ppl', 'edu,biz', 'learn', 2, 'Community goodwill|Niat baik komunitas|コミュニティの好意|社区好感', 'People who help shape a product tend to support it.|Orang yang ikut membentuk produk cenderung mendukungnya.|製品づくりに関わった人は、その製品を応援する。|参与塑造产品的人倾向于支持它。')
    ], [
      I('risk', 'mfg,biz', 'secret', 3, 'Leaks secrets|Rahasia bocor|機密漏えい|泄露机密', 'Sharing ideas outside can reveal your edge.|Berbagi ide ke luar bisa membuka keunggulan Anda.|外部とアイデアを共有すると、強みが漏れる恐れがある。|对外分享想法可能暴露你的优势。'),
      I('eff', 'biz,pub', 'control', 2, 'Less control|Kendali berkurang|コントロールが弱まる|控制力下降', 'You cannot steer what outsiders create.|Anda tidak bisa mengarahkan apa yang dibuat orang luar.|外部の人が作るものを、思いどおりには動かせない。|你无法左右外部人员的产出。'),
      I('risk', 'biz,mfg', 'share', 2, 'Unclear ownership|Kepemilikan tidak jelas|権利が曖昧|归属不清', 'Who owns a jointly created idea can become a dispute.|Siapa pemilik ide yang dibuat bersama bisa jadi sengketa.|共同で生んだアイデアの帰属が、争いの種になる。|共同创造的想法归谁所有可能引发纠纷。'),
      I('eff', 'biz,edu', 'time', 2, 'Filtering effort|Beban menyaring|選別の手間|筛选负担', 'Most outside ideas will not fit and need review.|Kebanyakan ide luar tidak cocok dan perlu ditinjau.|外部のアイデアの大半は合わず、見極めに手間がかかる。|大多数外部想法不合适，却要花时间评估。')
    ]),
    C('joint venture', 'Joint venture|Usaha patungan|ジョイントベンチャー|合资企业', ['partnership'], [
      I('cap', 'biz,mfg', 'skill', 3, 'Combined strengths|Kekuatan gabungan|強みの結合|优势结合', 'Each partner brings what the other lacks.|Setiap mitra membawa apa yang tidak dimiliki yang lain.|互いに、相手にない強みを持ち寄る。|各方带来对方所缺的东西。'),
      I('val', 'fin,biz', 'share', 3, 'Shared cost and risk|Biaya dan risiko terbagi|コストとリスクの分担|成本与风险分担', 'Big or uncertain projects become manageable.|Proyek besar atau tidak pasti menjadi terkelola.|大きな、あるいは不確実な事業も、現実的になる。|庞大或不确定的项目变得可控。'),
      I('mkt', 'pub,retail', 'reach', 2, 'Local market access|Akses pasar lokal|現地市場へのアクセス|进入本地市场', 'A local partner knows rules, customers and networks.|Mitra lokal memahami aturan, pelanggan, dan jaringan.|現地のパートナーは、ルール・顧客・人脈を知っている。|本地伙伴熟悉规则、客户和人脉。'),
      I('cap', 'mfg,biz', 'learn', 2, 'Learning|Pembelajaran|学び|学习', 'You pick up methods from your partner.|Anda mengambil metode dari mitra.|パートナーの手法を学べる。|你能从伙伴那里学到方法。')
    ], [
      I('risk', 'biz,pub', 'conflict', 3, 'Conflicting goals|Tujuan bertabrakan|目的の対立|目标冲突', 'Owners may want different things from the same company.|Pemilik mungkin menginginkan hal berbeda dari perusahaan yang sama.|出資者が、同じ会社に異なるものを求めることがある。|股东对同一家公司的期望可能不同。'),
      I('eff', 'biz,mfg', 'slow', 2, 'Slower decisions|Keputusan lebih lambat|意思決定が遅い|决策较慢', 'Both parents must agree before the venture moves.|Kedua induk harus setuju sebelum usaha bergerak.|両親会社が合意しないと、事業が動かない。|双方股东都同意后才能行动。'),
      I('risk', 'mfg,biz', 'secret', 2, 'Know-how leaks|Pengetahuan bocor|ノウハウの流出|技术外泄', 'A partner may learn too much and compete later.|Mitra bisa mempelajari terlalu banyak dan kelak bersaing.|パートナーが学びすぎて、後に競合になることがある。|伙伴可能学得太多，日后成为对手。'),
      I('risk', 'biz,fin', 'fail', 2, 'Hard to exit|Sulit keluar|撤退しにくい|难以退出', 'Ending a venture is slow, costly and tense.|Mengakhiri usaha patungan lambat, mahal, dan tegang.|解消には、時間・費用・緊張が伴う。|终止合资既慢又贵，还易生矛盾。')
    ]),
    C('merger', 'Merger|Merger|合併|合并', ['acquisition'], [
      I('val', 'fin,biz', 'save', 3, 'Cost synergies|Sinergi biaya|コストシナジー|成本协同', 'Duplicate offices, systems and staff can be combined.|Kantor, sistem, dan staf ganda dapat digabung.|重複する拠点・システム・人員を統合できる。|重复的办公室、系统和人员可合并。'),
      I('mkt', 'retail,biz', 'market', 3, 'Bigger reach|Jangkauan lebih besar|市場の拡大|覆盖更大', 'The combined firm serves more customers and regions.|Perusahaan gabungan melayani lebih banyak pelanggan dan wilayah.|統合後の会社は、より多くの顧客と地域に対応できる。|合并后公司服务更多客户和地区。'),
      I('cap', 'biz,mfg', 'skill', 2, 'Complementary skills|Keahlian saling melengkapi|能力の補完|能力互补', 'One side may have what the other needs.|Satu pihak mungkin memiliki yang dibutuhkan pihak lain.|一方が持つものを、他方が必要としていることがある。|一方拥有另一方所需的东西。'),
      I('val', 'fin,biz', 'power', 2, 'Stronger position|Posisi lebih kuat|立場の強化|地位更强', 'Size improves bargaining and funding terms.|Ukuran memperbaiki posisi tawar dan syarat pendanaan.|規模が大きくなり、交渉や資金調達に有利になる。|规模提升议价与融资条件。')
    ], [
      I('ppl', 'biz,pub', 'conflict', 3, 'Culture clash|Benturan budaya|文化の衝突|文化冲突', 'People from two companies resist the new way.|Orang dari dua perusahaan menolak cara baru.|2社の社員が、新しいやり方に抵抗する。|两家公司的人抗拒新方式。'),
      I('ppl', 'biz,pub', 'job', 3, 'Job cuts|Pengurangan karyawan|人員削減|裁员', 'Savings usually mean fewer roles, lowering morale.|Penghematan biasanya berarti lebih sedikit posisi, menurunkan moral.|コスト削減は人員減につながり、士気が下がる。|节约通常意味着裁员，士气下降。'),
      I('cost', 'fin,biz', 'expensive', 2, 'Integration cost|Biaya integrasi|統合コスト|整合成本', 'Merging systems and brands costs more than planned.|Menggabungkan sistem dan merek memakan biaya lebih dari rencana.|システムやブランドの統合に、想定以上の費用がかかる。|整合系统与品牌的花费超出预期。'),
      I('risk', 'fin,biz', 'fail', 2, 'Many mergers disappoint|Banyak merger mengecewakan|期待外れも多い|不少合并不及预期', 'Promised gains often fail to appear.|Keuntungan yang dijanjikan sering tidak muncul.|約束された成果が、実際には出ないことも多い。|承诺的收益常常没有兑现。')
    ]),
    C('acquisition', 'Acquisition|Akuisisi|買収|收购', ['merger'], [
      I('mkt', 'retail,biz', 'market', 3, 'Instant market access|Akses pasar instan|市場への即時参入|立即进入市场', 'You buy customers, products and brands already built.|Anda membeli pelanggan, produk, dan merek yang sudah ada.|すでにある顧客・製品・ブランドをそのまま手に入れる。|直接买下现成的客户、产品和品牌。'),
      I('cap', 'biz,mfg', 'skill', 3, 'Buys talent and technology|Membeli talenta dan teknologi|人材と技術を獲得|获得人才与技术', 'Skills that would take years can be bought.|Keahlian yang butuh bertahun-tahun bisa dibeli.|何年もかかる技能を、買って手に入れられる。|需数年积累的能力可以直接买到。'),
      I('val', 'fin,biz', 'save', 2, 'Cost and revenue synergies|Sinergi biaya dan pendapatan|コスト・収益シナジー|成本与收入协同', 'Combined operations can cost less and sell more.|Operasi gabungan bisa lebih murah dan menjual lebih banyak.|統合により、コストを抑えつつ売上を伸ばせる。|合并运营可降低成本、增加销售。'),
      I('cap', 'biz,pub', 'control', 2, 'Full control|Kendali penuh|完全な支配権|完全控制', 'Unlike a partnership, you decide.|Berbeda dengan kemitraan, Anda yang memutuskan.|提携と違い、自社で決められる。|与合作不同，由你说了算。')
    ], [
      I('cost', 'fin,biz', 'expensive', 3, 'Overpaying|Membayar terlalu mahal|払いすぎのリスク|付价过高', 'Bidding wars and hidden problems raise the real price.|Perang penawaran dan masalah tersembunyi menaikkan harga sebenarnya.|入札競争や隠れた問題で、実質の価格が上がる。|竞价与隐藏问题推高真实价格。'),
      I('ppl', 'biz,edu', 'lose', 3, 'Key people leave|Orang kunci pergi|主要人材の流出|关键人才离职', 'The talent you wanted may walk out the door.|Talenta yang Anda inginkan mungkin keluar.|欲しかった人材が、辞めてしまうことがある。|你想要的人才可能离开。'),
      I('risk', 'fin,biz', 'debt', 2, 'Debt burden|Beban utang|債務負担|债务负担', 'Deals are often funded by borrowing.|Kesepakatan sering dibiayai dengan pinjaman.|買収は、借入で資金調達されることが多い。|交易常靠借款融资。'),
      I('eff', 'biz,mfg', 'complex', 2, 'Hard integration|Integrasi sulit|統合の難しさ|整合困难', 'Different systems, rules and habits must be aligned.|Sistem, aturan, dan kebiasaan yang berbeda harus diselaraskan.|異なるシステム・規則・習慣をそろえる必要がある。|不同的系统、规则和习惯需要对齐。')
    ]),
    C('spin-off', 'Spin-off|Pemisahan usaha|スピンオフ|分拆', ['merger'], [
      I('cap', 'biz,mfg', 'focus', 3, 'Sharper focus|Fokus lebih tajam|焦点の明確化|更聚焦', 'Each company can concentrate on what it does best.|Setiap perusahaan bisa berkonsentrasi pada keahliannya.|各社が、得意分野に集中できる。|各公司可专注于自己最擅长的事。'),
      I('val', 'fin,biz', 'value', 3, 'Unlocks value|Membuka nilai tersembunyi|価値の顕在化|释放价值', 'A hidden business may be valued higher on its own.|Bisnis yang tersembunyi bisa bernilai lebih tinggi bila berdiri sendiri.|埋もれていた事業が、独立すると高く評価されることがある。|被掩盖的业务独立后估值可能更高。'),
      I('ppl', 'biz,edu', 'proud', 2, 'Motivated management|Manajemen lebih termotivasi|経営陣の意欲向上|管理层更有动力', 'Leaders of the new firm own the results.|Pemimpin perusahaan baru memegang hasilnya.|新会社の経営者が、成果に責任を持つ。|新公司的领导者对成果负责。'),
      I('val', 'fin,biz', 'invest', 2, 'Attracts the right investors|Menarik investor yang tepat|適切な投資家を呼ぶ|吸引合适投资者', 'Investors can choose the business they like.|Investor bisa memilih bisnis yang mereka sukai.|投資家が、好みの事業を選んで投資できる。|投资者可选择自己看好的业务。')
    ], [
      I('cost', 'fin,biz', 'cost', 3, 'Lost synergies|Sinergi hilang|シナジーの喪失|协同效应消失', 'Shared systems, buying power and brands are split up.|Sistem bersama, daya beli, dan merek terbelah.|共有していたシステム・購買力・ブランドが分かれる。|共享的系统、采购力和品牌被拆开。'),
      I('cost', 'biz,mfg', 'expensive', 2, 'Setup costs|Biaya pembentukan|立ち上げコスト|设立成本', 'The new company needs its own board, systems and staff.|Perusahaan baru butuh dewan, sistem, dan staf sendiri.|新会社に、独自の取締役会・システム・人員が必要になる。|新公司需要自己的董事会、系统和员工。'),
      I('risk', 'fin,biz', 'danger', 2, 'Weaker on its own|Lebih lemah sendirian|単独では弱い|独立后更脆弱', 'The spun-off unit may lose the parent support.|Unit yang dipisah bisa kehilangan dukungan induk.|切り離された事業は、親会社の支えを失うことがある。|被分拆单位可能失去母公司的支撑。'),
      I('ppl', 'biz,pub', 'fear', 2, 'Uncertainty for staff|Ketidakpastian bagi staf|社員の不安|员工不安', 'People worry about jobs and future direction.|Orang khawatir soal pekerjaan dan arah ke depan.|社員は、雇用と今後の方向性を心配する。|员工担心工作和未来方向。')
    ]),
    C('franchising', 'Franchising|Waralaba|フランチャイズ|特许经营', ['licensing'], [
      I('mkt', 'retail,food', 'reach', 3, 'Fast expansion|Ekspansi cepat|急速な拡大|快速扩张', 'Franchisees fund new outlets, so you spread faster.|Pewaralaba mendanai gerai baru, sehingga Anda menyebar lebih cepat.|加盟店が出店資金を負担するので、早く広がれる。|加盟商出资开店，扩张更快。'),
      I('val', 'retail,food', 'save', 3, 'Less capital needed|Butuh modal lebih sedikit|必要資金が少ない|所需资金更少', 'Others invest in the sites and staff.|Pihak lain menginvestasikan lokasi dan staf.|店舗や人員への投資は、他者が負う。|店面与人员由别人投资。'),
      I('ppl', 'retail,food', 'proud', 2, 'Motivated owners|Pemilik yang termotivasi|オーナーの意欲|店主积极性高', 'People work harder for a business they own.|Orang bekerja lebih keras untuk bisnis milik sendiri.|自分の店のためなら、人は懸命に働く。|人们为自己拥有的生意更卖力。'),
      I('cap', 'retail,food', 'learn', 2, 'Proven formula|Formula teruji|実証済みの仕組み|成熟模式', 'Franchisees get a tested system, not a blank page.|Pewaralaba mendapat sistem teruji, bukan halaman kosong.|加盟者は、白紙ではなく実績ある仕組みを得られる。|加盟者得到经过验证的体系，而非从零开始。')
    ], [
      I('risk', 'retail,food', 'quality', 3, 'Inconsistent quality|Kualitas tidak konsisten|品質のばらつき|质量参差', 'One bad outlet can damage the whole brand.|Satu gerai buruk bisa merusak seluruh merek.|1店舗の不祥事が、ブランド全体を傷つける。|一家差店就能损害整个品牌。'),
      I('risk', 'retail,food', 'control', 2, 'Limited control|Kendali terbatas|管理の限界|控制有限', 'Franchisees may bend the rules.|Pewaralaba bisa melanggar aturan.|加盟店が、ルールを曲げることがある。|加盟商可能违反规定。'),
      I('cost', 'retail,food', 'share', 2, 'Shared revenue|Pendapatan dibagi|収益の分配|收入分成', 'Fees and royalties reduce your share of sales.|Biaya dan royalti mengurangi bagian penjualan Anda.|手数料やロイヤルティで、自社の取り分が減る。|费用与特许权使用费减少你的销售份额。'),
      I('ppl', 'retail,food', 'conflict', 2, 'Disputes|Perselisihan|トラブル|纠纷', 'Franchisor and franchisees may clash over fees and rules.|Pemilik waralaba dan pewaralaba bisa berselisih soal biaya dan aturan.|本部と加盟店が、手数料やルールで対立することがある。|总部与加盟商可能因费用和规则起争执。')
    ]),
    C('licensing', 'Licensing|Lisensi|ライセンシング|授权许可', ['franchising'], [
      I('val', 'mfg,biz', 'money', 3, 'Income without production|Pendapatan tanpa produksi|生産せずに収入|无需生产也有收入', 'Others make and sell, you collect fees.|Pihak lain membuat dan menjual, Anda menerima biaya.|他社が作って売り、自社は使用料を受け取る。|别人生产销售，你收取费用。'),
      I('mkt', 'mfg,retail', 'reach', 3, 'Reach new markets|Menjangkau pasar baru|新市場への到達|触达新市场', 'Licensees open doors in places you cannot reach.|Pemegang lisensi membuka pintu di tempat yang tak terjangkau Anda.|ライセンシーが、自社では届かない地域を開拓してくれる。|被许可方帮你打开够不到的市场。'),
      I('val', 'biz,fin', 'save', 2, 'Low investment|Investasi rendah|低投資|投入低', 'No factories or shops to build.|Tidak perlu membangun pabrik atau toko.|工場や店舗を新設する必要がない。|无需建厂或开店。'),
      I('cap', 'mfg,biz', 'name', 2, 'Extends the brand|Memperluas merek|ブランドの拡張|扩展品牌', 'Your name appears in more places.|Nama Anda muncul di lebih banyak tempat.|ブランドが、より多くの場所で見られるようになる。|你的名字出现在更多地方。')
    ], [
      I('risk', 'mfg,retail', 'quality', 3, 'Brand risk|Risiko merek|ブランド毀損のリスク|品牌风险', 'A licensee poor product hurts your reputation.|Produk buruk pemegang lisensi merusak reputasi Anda.|ライセンシーの粗悪な製品が、あなたの評判を傷つける。|被许可方的劣质产品会损害你的声誉。'),
      I('risk', 'mfg,biz', 'secret', 2, 'Creates a rival|Menciptakan pesaing|競合を育てる恐れ|可能培养对手', 'The licensee may learn enough to compete.|Pemegang lisensi bisa belajar cukup banyak untuk bersaing.|ライセンシーが力をつけ、競合になるかもしれない。|被许可方可能学到足够多而成为对手。'),
      I('cost', 'mfg,biz', 'share', 2, 'Limited profit share|Bagian laba terbatas|取り分が限られる|分成有限', 'Royalties are a small slice of total sales.|Royalti hanya sebagian kecil dari total penjualan.|ロイヤルティは、総売上のごく一部にすぎない。|特许权使用费只占总销售的一小部分。'),
      I('eff', 'biz,pub', 'control', 2, 'Monitoring effort|Beban pengawasan|監督の手間|监督负担', 'You must check that terms are followed.|Anda harus memeriksa bahwa syarat dipatuhi.|契約条件が守られているか、確認し続ける必要がある。|你得持续检查条款是否被遵守。')
    ]),
    C('bootstrapping', 'Bootstrapping|Bootstrapping (modal sendiri)|ブートストラップ|自力创业', ['venture capital'], [
      I('cap', 'biz,fam', 'keep', 3, 'Full ownership|Kepemilikan penuh|完全な所有権|完全所有权', 'You keep control and every decision.|Anda mempertahankan kendali dan setiap keputusan.|経営権とすべての意思決定を握り続けられる。|你保有控制权与全部决策权。'),
      I('val', 'retail,food,fam', 'save', 3, 'Discipline with money|Disiplin soal uang|資金への規律|资金纪律', 'Limited cash forces careful spending.|Kas terbatas memaksa pengeluaran yang cermat.|資金が限られるので、支出に慎重になる。|现金有限，迫使你精打细算。'),
      I('mkt', 'retail,food', 'customer', 2, 'Customer-first growth|Tumbuh dari pelanggan|顧客起点の成長|以客户为先增长', 'Revenue from real buyers guides what you build.|Pendapatan dari pembeli nyata mengarahkan apa yang Anda buat.|実際の買い手からの収入が、作るものを導く。|真实买家的收入引导你做什么。'),
      I('ppl', 'fam,biz', 'proud', 2, 'Independence|Kemandirian|独立性|独立自主', 'No investors to answer to.|Tidak ada investor yang harus dipertanggungjawabi.|投資家への説明責任がない。|无需向投资人交代。')
    ], [
      I('eff', 'retail,food,biz', 'slow', 3, 'Slow growth|Pertumbuhan lambat|成長が遅い|增长缓慢', 'You can only grow as fast as cash allows.|Anda hanya bisa tumbuh secepat kas mengizinkan.|資金が許す範囲でしか成長できない。|增长速度受限于现金。'),
      I('risk', 'fam,biz', 'lose', 3, 'Personal risk|Risiko pribadi|個人的なリスク|个人风险', 'Your own savings are on the line.|Tabungan Anda sendiri dipertaruhkan.|自分の貯蓄が賭けられる。|你自己的积蓄面临风险。'),
      I('ppl', 'fam,biz', 'stress', 2, 'Overwork|Kerja berlebihan|働きすぎ|过度劳累', 'You do many jobs yourself.|Anda mengerjakan banyak peran sendiri.|多くの役割を、自分でこなすことになる。|许多岗位都得自己干。'),
      I('risk', 'biz,mfg', 'time', 2, 'Missed windows|Peluang terlewat|機会を逃す|错失窗口', 'Competitors with funding can move faster.|Pesaing yang punya dana bisa bergerak lebih cepat.|資金のある競合は、より速く動ける。|有资金的对手行动更快。')
    ]),
    C('economies of scope', 'Economies of scope|Skala cakupan|範囲の経済|范围经济', ['diversification'], [
      I('val', 'mfg,retail,food', 'save', 3, 'Shared resources|Sumber daya bersama|資源の共有|资源共享', 'One kitchen, truck or team serves several products.|Satu dapur, truk, atau tim melayani beberapa produk.|1つの厨房・トラック・チームで、複数の製品を扱える。|一个厨房、卡车或团队服务多种产品。'),
      I('mkt', 'retail,food', 'customer', 3, 'Cross-selling|Penjualan silang|クロスセル|交叉销售', 'Customers who buy one item are offered others.|Pelanggan yang membeli satu barang ditawari barang lain.|1つ買った顧客に、他の商品も提案できる。|买了一件商品的客户可被推荐其他商品。'),
      I('cap', 'biz,mfg', 'learn', 2, 'Reuse know-how|Memakai ulang pengetahuan|ノウハウの再利用|复用经验', 'Skills built for one line help the next.|Keterampilan untuk satu lini membantu lini berikutnya.|ある事業で培った技能が、次の事業に役立つ。|为一条产品线积累的技能能帮助下一条。'),
      I('val', 'fin,biz', 'safe', 2, 'Spreads demand|Menyebar permintaan|需要の平準化|分散需求', 'Peaks in one product cover dips in another.|Puncak satu produk menutup penurunan produk lain.|ある商品の繁忙が、別の商品の閑散を補う。|一种产品的旺季弥补另一种的淡季。')
    ], [
      I('eff', 'biz,mfg', 'complex', 3, 'More complexity|Lebih rumit|複雑さの増大|复杂度上升', 'More products mean more schedules and exceptions.|Lebih banyak produk berarti lebih banyak jadwal dan pengecualian.|商品が増えるほど、段取りと例外が増える。|产品越多，排程和例外越多。'),
      I('risk', 'retail,food', 'quality', 2, 'Quality dilution|Kualitas terdilusi|品質の低下|质量被稀释', 'Doing many things can mean doing none of them well.|Mengerjakan banyak hal bisa berarti tak satu pun dikerjakan dengan baik.|多くを手がけると、どれも中途半端になりかねない。|什么都做可能样样不精。'),
      I('cost', 'mfg,retail', 'cost', 2, 'Hidden costs|Biaya tersembunyi|見えないコスト|隐性成本', 'Shared resources may be harder to manage than expected.|Sumber daya bersama bisa lebih sulit dikelola dari perkiraan.|共有資源の管理は、想像より手間がかかる。|共享资源的管理可能比预期更难。'),
      I('risk', 'biz,fin', 'fail', 2, 'Spread too thin|Terlalu tersebar|手を広げすぎる|摊得太薄', 'Attention and money are divided across lines.|Perhatian dan uang terbagi di banyak lini.|注意と資金が、複数の事業に分散する。|注意力与资金被分摊到多条产品线。')
    ]),
    C('core competency', 'Core competency|Kompetensi inti|コアコンピタンス|核心竞争力', ['diversification'], [
      I('mkt', 'biz,mfg', 'name', 3, 'Hard-to-copy advantage|Keunggulan sulit ditiru|真似しにくい強み|难以复制的优势', 'A skill built over years sets you apart.|Keahlian yang dibangun bertahun-tahun membedakan Anda.|長年培った技能が、あなたを際立たせる。|多年积累的技能让你与众不同。'),
      I('cap', 'biz,edu', 'focus', 3, 'Clear priorities|Prioritas jelas|優先順位の明確化|优先级清晰', 'You know what to invest in and what to drop.|Anda tahu apa yang harus diinvestasikan dan apa yang dilepas.|何に投資し、何をやめるべきかが分かる。|知道该投资什么、放弃什么。'),
      I('val', 'mfg,biz', 'profit', 2, 'Superior results|Hasil lebih unggul|優れた成果|成果更优', 'Doing what you do best earns better returns.|Mengerjakan keahlian terbaik menghasilkan imbal hasil lebih baik.|得意なことに集中すれば、より良い成果が出る。|专注最擅长的事回报更高。'),
      I('ppl', 'biz,edu', 'proud', 2, 'Attracts talent|Menarik talenta|人材の吸引|吸引人才', 'Experts want to work where their craft matters.|Para ahli ingin bekerja di tempat keahlian mereka dihargai.|専門家は、自分の技能が重んじられる職場を選ぶ。|专家愿意去重视其专长的地方工作。')
    ], [
      I('risk', 'biz,mfg', 'old', 3, 'Becomes a trap|Menjadi jebakan|強みが足かせに|优势变成陷阱', 'Yesterday strength can blind you to change.|Kekuatan kemarin bisa membutakan Anda terhadap perubahan.|昨日の強みが、変化への目を曇らせる。|昨日的优势会让你对变化视而不见。'),
      I('risk', 'biz,retail', 'limit', 2, 'Narrow thinking|Pemikiran sempit|視野の狭さ|思维狭窄', 'New opportunities outside your skill get ignored.|Peluang baru di luar keahlian Anda diabaikan.|自分の技能の外にある新しい機会が、見過ごされる。|技能之外的新机会被忽视。'),
      I('eff', 'biz,pub', 'change', 2, 'Hard to renew|Sulit diperbarui|刷新が難しい|难以更新', 'Changing a core skill takes years.|Mengubah keahlian inti butuh bertahun-tahun.|中核の技能を変えるには、何年もかかる。|转变核心能力要花数年。'),
      I('risk', 'fin,biz', 'depend', 2, 'Concentrated risk|Risiko terkonsentrasi|リスクの集中|风险集中', 'If that skill loses value, everything is at stake.|Jika keahlian itu kehilangan nilai, semuanya terancam.|その技能の価値が下がれば、すべてが危うくなる。|该能力一旦贬值，一切都受威胁。')
    ]),
    C('strategic planning', 'Strategic planning|Perencanaan strategis|戦略計画|战略规划', ['scenario planning'], [
      I('cap', 'biz,pub', 'direction', 3, 'Shared direction|Arah bersama|共通の方向性|共同方向', 'Everyone knows the goal and the main choices.|Semua orang tahu tujuan dan pilihan utama.|全員が、目標と主要な選択を理解する。|大家都清楚目标和主要选择。'),
      I('val', 'fin,biz', 'save', 2, 'Efficient use of resources|Sumber daya terpakai efisien|資源の有効活用|资源使用高效', 'Money and time go to the priorities.|Uang dan waktu dialokasikan ke prioritas.|資金と時間が、優先事項に振り向けられる。|资金和时间投向优先事项。'),
      I('ppl', 'biz,pub', 'team', 2, 'Aligned teams|Tim selaras|チームの一体化|团队协同', 'Departments pull in the same direction.|Departemen bergerak ke arah yang sama.|各部門が、同じ方向へ動ける。|各部门朝同一方向努力。'),
      I('cap', 'fin,pub', 'plan', 2, 'Basis for tracking|Dasar pemantauan|進捗確認の基準|跟踪的依据', 'A plan lets you check what worked and what did not.|Rencana memungkinkan Anda memeriksa apa yang berhasil dan tidak.|計画があれば、何がうまくいったかを検証できる。|有计划才能检验什么有效、什么无效。')
    ], [
      I('eff', 'biz,pub', 'time', 3, 'Time consuming|Memakan waktu|時間がかかる|耗费时间', 'Long planning cycles can delay action.|Siklus perencanaan panjang bisa menunda tindakan.|長い計画作りが、行動を遅らせることがある。|冗长的规划周期可能延误行动。'),
      I('risk', 'biz,mfg', 'change', 3, 'Outdated quickly|Cepat usang|すぐ時代遅れに|很快过时', 'Markets move faster than yearly plans.|Pasar bergerak lebih cepat dari rencana tahunan.|市場は、年次計画より速く動く。|市场变化比年度计划更快。'),
      I('ppl', 'pub,biz', 'rules', 2, 'Rigidity|Kekakuan|硬直化|僵化', 'People stick to the plan when facts have changed.|Orang berpegang pada rencana ketika fakta sudah berubah.|状況が変わっても、計画に固執してしまう。|事实变了人们仍死守计划。'),
      I('cost', 'biz,fin', 'cost', 2, 'False certainty|Rasa pasti yang semu|偽りの確実性|虚假确定感', 'Detailed numbers can hide guesswork.|Angka yang rinci bisa menyembunyikan tebakan.|細かい数字が、推測を覆い隠すことがある。|精细的数字可能掩盖猜测。')
    ]),
    C('scenario planning', 'Scenario planning|Perencanaan skenario|シナリオプランニング|情景规划', ['strategic planning'], [
      I('cap', 'biz,pub', 'plan', 3, 'Ready for surprises|Siap menghadapi kejutan|不測の事態への備え|应对意外有备而来', 'You rehearse several futures before they happen.|Anda berlatih beberapa masa depan sebelum terjadi.|起こりうる複数の未来を、事前にシミュレーションできる。|在事发之前演练多种未来。'),
      I('cap', 'biz,fin', 'learn', 2, 'Broader thinking|Pemikiran lebih luas|視野の拡大|视野更宽', 'Teams question assumptions they took for granted.|Tim mempertanyakan asumsi yang dianggap pasti.|チームが、当然視していた前提を問い直す。|团队会质疑原本想当然的假设。'),
      I('val', 'fin,pub', 'safe', 2, 'Lower shock losses|Kerugian akibat kejutan lebih kecil|ショック時の損失軽減|降低冲击损失', 'You already know your first moves when trouble hits.|Anda sudah tahu langkah pertama saat masalah datang.|問題が起きたとき、最初の一手がすでに分かっている。|出事时你已知道第一步怎么走。'),
      I('ppl', 'biz,pub', 'team', 2, 'Shared language|Bahasa bersama|共通言語|共同语言', 'Teams talk about risks with the same stories.|Tim membahas risiko dengan cerita yang sama.|チームが、同じストーリーでリスクを語れる。|团队用同样的故事讨论风险。')
    ], [
      I('eff', 'biz,pub', 'effort', 3, 'Heavy effort|Upaya besar|多大な手間|工作量大', 'Building several detailed futures takes real work.|Menyusun beberapa masa depan terperinci butuh kerja nyata.|複数の未来を詳しく描くのは、大仕事。|构建多个详细未来要花不少功夫。'),
      I('risk', 'biz,fin', 'wrong', 2, 'Wrong scenarios|Skenario meleset|シナリオが外れる|情景判断错误', 'The real future may be none of those imagined.|Masa depan nyata mungkin bukan salah satu yang dibayangkan.|実際の未来は、想定したどれとも違うかもしれない。|真实的未来可能与设想的都不同。'),
      I('risk', 'pub,biz', 'slow', 2, 'Analysis paralysis|Terlalu lama menganalisis|分析疲れ|分析瘫痪', 'Too many options can stop decisions.|Terlalu banyak opsi bisa menghentikan keputusan.|選択肢が多すぎて、決断できなくなる。|选项太多可能让决策停滞。'),
      I('cost', 'biz,fin', 'cost', 2, 'Hard to prove value|Sulit dibuktikan manfaatnya|効果を示しにくい|价值难以证明', 'A crisis that never came makes the work look wasted.|Krisis yang tidak datang membuat kerja tampak sia-sia.|起きなかった危機への備えは、無駄に見えてしまう。|没发生的危机让这项工作显得白费。')
    ]),
    C('pivot', 'Pivot|Pivot (banting setir)|ピボット|战略转向', ['strategic planning'], [
      I('val', 'biz,fin', 'save', 3, 'Stops wasted effort|Menghentikan usaha sia-sia|無駄な努力をやめる|止损', 'You change course before more money is lost.|Anda berbelok sebelum lebih banyak uang hilang.|資金をさらに失う前に、方向を変えられる。|在损失扩大前及时转向。'),
      I('cap', 'biz,edu', 'learn', 3, 'Uses what you learned|Memakai apa yang dipelajari|学びの活用|利用已学到的东西', 'Evidence from customers points to a better path.|Bukti dari pelanggan menunjukkan jalan yang lebih baik.|顧客から得た証拠が、より良い道を示してくれる。|客户反馈指向更好的路径。'),
      I('mkt', 'biz,retail', 'customer', 2, 'Better fit with demand|Lebih cocok dengan permintaan|需要との適合|更贴合需求', 'You aim at a problem people really pay to solve.|Anda membidik masalah yang benar-benar dibayar orang untuk diselesaikan.|人々が実際にお金を払って解決したい課題を狙える。|瞄准人们真正愿意付费解决的问题。'),
      I('ppl', 'biz,edu', 'idea', 2, 'Fresh energy|Energi baru|新たな活力|焕发新活力', 'A clear new direction can re-energise the team.|Arah baru yang jelas bisa menyegarkan tim.|新しい方向性がはっきりすれば、チームが活気づく。|明确的新方向可重新激发团队。')
    ], [
      I('cost', 'biz,fin', 'waste', 3, 'Sunk work lost|Pekerjaan sebelumnya terbuang|それまでの投資が無駄に|前期投入沉没', 'Time and money spent on the old path may not carry over.|Waktu dan uang di jalur lama mungkin tidak terbawa.|旧路線に使った時間とお金が、引き継げないことがある。|旧路线上花的时间与金钱可能无法延续。'),
      I('ppl', 'biz,edu', 'stress', 3, 'Confused team|Tim bingung|チームの混乱|团队困惑', 'People wonder what the company really stands for.|Orang bertanya-tanya apa sebenarnya yang diperjuangkan perusahaan.|社員が、会社が何を目指しているのか分からなくなる。|员工不知公司究竟代表什么。'),
      I('risk', 'retail,biz', 'trust', 2, 'Loses customers|Kehilangan pelanggan|既存顧客の離反|流失客户', 'Existing buyers may not follow the new direction.|Pembeli lama mungkin tidak ikut arah baru.|既存の顧客が、新しい方向についてこないことがある。|老客户可能不跟随新方向。'),
      I('risk', 'biz,fin', 'fail', 2, 'May be a bad guess|Bisa jadi tebakan keliru|判断を誤ることも|可能判断失误', 'The new direction could fail too.|Arah baru juga bisa gagal.|新しい方向も、失敗するかもしれない。|新方向同样可能失败。')
    ])
  );
})();
