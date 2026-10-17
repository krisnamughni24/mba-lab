/* Word Network: curated concepts, batch 9 (Indonesia and local business contexts). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('cooperative', 'Cooperative (koperasi)|Koperasi|協同組合（コペラシ）|合作社（Koperasi）', ['corporation'], [
      I('ppl', 'farm,food,retail', 'share', 3, 'Members share the benefits|Anggota berbagi manfaat|組合員が利益を分かち合う|成员共享收益', 'Profits return to members, not outside owners.|Laba kembali ke anggota, bukan pemilik luar.|利益が、外部の株主でなく組合員に戻る。|利润归成员而非外部股东。'),
      I('cap', 'farm,food', 'power', 2, 'Collective bargaining power|Daya tawar bersama|集団での交渉力|集体议价能力', 'Small producers buy and sell together.|Produsen kecil membeli dan menjual bersama.|小規模な生産者が、共同で売買できる。|小生产者联合买卖。'),
      I('ppl', 'farm,fam,pub', 'fair', 2, 'Democratic control|Kendali demokratis|民主的な運営|民主管理', 'One member, one vote.|Satu anggota, satu suara.|1人1票。|一人一票。'),
      I('ppl', 'farm,fam', 'friend', 2, 'Community trust|Kepercayaan komunitas|地域の信頼|社区信任', 'Neighbours know and help each other.|Tetangga saling kenal dan saling membantu.|隣人同士が、互いを知り助け合う。|邻里相识互助。')
    ], [
      I('eff', 'farm,retail,biz', 'slow', 3, 'Slow decisions|Keputusan lambat|意思決定が遅い|决策慢', 'Members must discuss and agree.|Anggota harus berdiskusi dan sepakat.|組合員の合意が必要になる。|成员须讨论达成一致。'),
      I('risk', 'farm,fin', 'mistake', 3, 'Weak management|Manajemen lemah|経営力の弱さ|管理薄弱', 'Volunteers may lack business skills.|Pengurus sukarela mungkin kurang keterampilan bisnis.|運営者に、経営の知識が足りないことがある。|志愿管理者可能缺乏商业技能。'),
      I('cost', 'farm,fin', 'money', 2, 'Limited capital|Modal terbatas|資本が限られる|资本有限', 'Members\' savings are small.|Simpanan anggota kecil.|組合員の出資は少額。|成员出资少。'),
      I('risk', 'fin,pub', 'cheat', 2, 'Misuse of funds|Penyalahgunaan dana|資金の不正利用|资金滥用', 'Weak oversight invites fraud.|Pengawasan lemah mengundang kecurangan.|監督が弱いと、不正が起きる。|监督不力易生欺诈。')
    ]),
    C('corporation', 'Limited company (PT)|Perseroan Terbatas (PT)|株式会社（PT）|有限公司（PT）', ['cooperative'], [
      I('val', 'biz,fin', 'safe', 3, 'Limited liability|Tanggung jawab terbatas|有限責任|有限责任', 'Owners risk only what they invested.|Pemilik hanya menanggung risiko sebesar modalnya.|出資者は、出資額までしか責任を負わない。|股东仅以出资为限担责。'),
      I('mkt', 'biz,fin', 'trust', 2, 'Credibility|Kredibilitas|信用力|信誉', 'Partners and banks prefer formal companies.|Mitra dan bank lebih memilih perusahaan resmi.|取引先や銀行は、法人を好む。|伙伴与银行偏好正规公司。'),
      I('cap', 'fin,biz', 'invest', 2, 'Raises capital easily|Mudah menghimpun modal|資金調達しやすい|易于融资', 'Shares can be sold to investors.|Saham dapat dijual kepada investor.|株式を投資家に販売できる。|可向投资者发行股份。'),
      I('cap', 'biz', 'long', 2, 'Lasts beyond its owners|Bertahan melampaui pemiliknya|所有者を超えて存続|超越所有者存续', 'The company continues if owners change.|Perusahaan berlanjut walau pemilik berganti.|所有者が替わっても、会社は続く。|股东变更公司仍存续。')
    ], [
      I('cost', 'biz', 'expensive', 3, 'Setup and running costs|Biaya pendirian dan operasional|設立・運営コスト|设立与运营成本', 'Notaries, taxes and annual reports.|Notaris, pajak, dan laporan tahunan.|公証人・税金・年次報告の費用。|公证、税费与年报。'),
      I('eff', 'biz,pub', 'rules', 3, 'Heavy paperwork|Dokumen berat|書類負担が大きい|文书负担重', 'Meetings, minutes and filings are required.|Rapat, notulen, dan pelaporan wajib dilakukan.|会議・議事録・届出が必要。|须开会、记录与申报。'),
      I('risk', 'biz,fin', 'tax', 2, 'Double taxation|Pajak berganda|二重課税|双重征税', 'Profit and dividends can both be taxed.|Laba dan dividen bisa sama-sama dikenai pajak.|利益にも配当にも課税されうる。|利润与分红可能都被征税。'),
      I('ppl', 'biz', 'conflict', 2, 'Owner disputes|Sengketa antar pemilik|株主間の争い|股东纠纷', 'Shareholders can disagree about direction.|Pemegang saham bisa berbeda pendapat tentang arah.|株主同士が、方針で対立しうる。|股东在方向上可能意见相左。')
    ]),
    C('msme', 'Micro, small and medium enterprises (UMKM)|Usaha mikro, kecil, dan menengah (UMKM)|零細・中小企業（UMKM）|微小中型企业（UMKM）', ['large corporation'], [
      I('eff', 'retail,food,farm', 'flexible', 3, 'Flexible and fast|Fleksibel dan cepat|柔軟で素早い|灵活敏捷', 'Owners adapt quickly to customers.|Pemilik cepat menyesuaikan diri dengan pelanggan.|オーナーが、顧客に素早く合わせられる。|老板快速适应客户。'),
      I('ppl', 'fam,retail,food', 'job', 3, 'Creates jobs locally|Menciptakan lapangan kerja lokal|地域の雇用を生む|创造本地就业', 'Most workers are employed by small firms.|Sebagian besar pekerja bekerja di usaha kecil.|多くの労働者が、小さな会社で働く。|多数工人受雇于小企业。'),
      I('mkt', 'retail,food', 'customer', 2, 'Personal customer relationships|Hubungan pelanggan yang personal|顧客との近い関係|客户关系亲近', 'The owner knows regulars by name.|Pemilik mengenal pelanggan tetap dengan nama.|常連の名前を、オーナーが知っている。|老板认得熟客名字。'),
      I('val', 'fam,retail', 'low', 2, 'Low startup cost|Modal awal rendah|開業コストが低い|创业成本低', 'Anyone with an idea can begin.|Siapa pun dengan ide dapat memulai.|アイデアがあれば誰でも始められる。|有想法即可起步。')
    ], [
      I('cost', 'retail,food,farm', 'poor', 3, 'Hard to get funding|Sulit mendapat pendanaan|資金調達が難しい|融资难', 'Banks see them as risky.|Bank menganggapnya berisiko.|銀行は、リスクが高いと見る。|银行视其高风险。'),
      I('risk', 'retail,food', 'fail', 3, 'High failure rate|Tingkat kegagalan tinggi|廃業率が高い|失败率高', 'Many close within a few years.|Banyak yang tutup dalam beberapa tahun.|数年で閉業する例が多い。|很多几年内关门。'),
      I('eff', 'retail,food', 'skill', 2, 'Weak management and records|Manajemen dan pencatatan lemah|経営・記帳の弱さ|管理与记账薄弱', 'Owners do everything themselves.|Pemilik mengerjakan segalanya sendiri.|オーナーがすべて自分でこなす。|老板事事亲力亲为。'),
      I('mkt', 'retail,mfg', 'weak', 2, 'Weak against large rivals|Lemah melawan pesaing besar|大手に対して弱い|对大企业弱势', 'Big chains win on price and reach.|Rantai besar menang dalam harga dan jangkauan.|大手チェーンは、価格と規模で勝る。|大连锁在价格与规模上占优。')
    ]),
    C('large corporation', 'Large corporation|Perusahaan besar|大企業|大型企业', ['msme'], [
      I('val', 'mfg,retail,fin', 'cheap', 3, 'Economies of scale|Skala ekonomi|規模の経済|规模经济', 'Big volumes lower unit costs.|Volume besar menurunkan biaya per unit.|大量取引で単価が下がる。|大批量降低单位成本。'),
      I('val', 'fin,mfg,biz', 'money', 2, 'Deep pockets|Modal besar|豊富な資金力|资金雄厚', 'Can invest and survive downturns.|Dapat berinvestasi dan bertahan dari kemerosotan.|投資も、不況の耐久もできる。|可投资并熬过低谷。'),
      I('cap', 'biz,mfg', 'power', 2, 'Market power|Kekuatan pasar|市場での影響力|市场影响力', 'Can negotiate hard with suppliers.|Dapat menawar keras dengan pemasok.|仕入先と強気に交渉できる。|可强力议价。'),
      I('ppl', 'biz,mfg', 'skill', 2, 'Career and training|Karier dan pelatihan|キャリアと研修|职业与培训', 'Staff gain structured development.|Staf mendapat pengembangan terstruktur.|社員が、体系的に育成される。|员工获得系统发展。')
    ], [
      I('eff', 'biz,pub', 'slow', 3, 'Slow and bureaucratic|Lambat dan birokratis|遅く官僚的|缓慢官僚', 'Many layers, little speed.|Banyak lapisan, sedikit kecepatan.|階層が多く、動きが遅い。|层级多，速度慢。'),
      I('ppl', 'biz', 'distance', 2, 'Impersonal|Kurang personal|人間味が薄い|缺乏人情味', 'Staff and customers feel like numbers.|Staf dan pelanggan merasa hanya angka.|社員も顧客も、数字として扱われがち。|员工与客户像数字。'),
      I('risk', 'pub,biz', 'power', 2, 'Abuse of market power|Penyalahgunaan kekuatan pasar|市場支配力の乱用|滥用市场地位', 'Can squeeze small suppliers and rivals.|Dapat menekan pemasok dan pesaing kecil.|小さな取引先や競合を圧迫しうる。|可能挤压小供应商与对手。'),
      I('risk', 'biz,fin', 'stuck', 2, 'Hard to change|Sulit berubah|変化しにくい|难以转型', 'Large ships turn slowly.|Kapal besar berbelok lambat.|大きな船は、舵が切りにくい。|大船掉头慢。')
    ]),
    C('bumdes', 'Village-owned enterprise (BUMDes)|Badan Usaha Milik Desa (BUMDes)|村営企業（BUMDes）|村办企业（BUMDes）', ['msme'], [
      I('ppl', 'pub,farm,fam', 'help', 3, 'Benefits stay in the village|Manfaat tetap di desa|利益が村に残る|收益留在村里', 'Profit funds local needs.|Laba membiayai kebutuhan lokal.|利益が、地域のために使われる。|利润用于本地需求。'),
      I('ppl', 'farm,pub', 'job', 2, 'Local jobs|Pekerjaan lokal|地元の雇用|本地就业', 'Villagers need not migrate for work.|Warga tidak perlu merantau untuk bekerja.|村人が、出稼ぎに行かなくて済む。|村民无需外出务工。'),
      I('mkt', 'farm,food,pub', 'local', 2, 'Uses local resources|Memanfaatkan sumber daya lokal|地域資源の活用|利用本地资源', 'Products and tourism built on village strengths.|Produk dan wisata dibangun atas kekuatan desa.|村の強みを生かした産品や観光。|依托村庄优势的产品与旅游。'),
      I('cap', 'pub,farm', 'team', 2, 'Community ownership|Kepemilikan komunitas|地域の主体性|社区所有', 'Residents feel it is theirs.|Warga merasa itu milik mereka.|住民が、自分たちのものだと感じる。|居民觉得属于自己。')
    ], [
      I('risk', 'pub,farm', 'skill', 3, 'Limited business skills|Keterampilan bisnis terbatas|経営能力の不足|商业技能有限', 'Managers lack training and experience.|Pengelola kurang pelatihan dan pengalaman.|運営者の経験や研修が不足している。|管理者缺乏培训与经验。'),
      I('risk', 'pub', 'cheat', 2, 'Politics and misuse|Politik dan penyalahgunaan|政治介入と不正|政治干预与滥用', 'Village elites may capture benefits.|Elite desa bisa menguasai manfaatnya.|村の有力者が、利益を独占しうる。|村中权贵可能独占利益。'),
      I('cost', 'pub,farm', 'money', 2, 'Small capital|Modal kecil|資本が小さい|资本小', 'Hard to scale beyond the village.|Sulit berkembang di luar desa.|村の外に広げにくい。|难以走出村庄。'),
      I('mkt', 'farm,food', 'limit', 2, 'Limited market access|Akses pasar terbatas|販路が限られる|市场渠道有限', 'Roads and networks are weak.|Jalan dan jaringan lemah.|道路や流通網が弱い。|道路与网络薄弱。')
    ]),
    C('halal certification', 'Halal certification|Sertifikasi halal|ハラール認証|清真认证', ['iso certification'], [
      I('mkt', 'food,retail,health', 'trust', 3, 'Trust of Muslim consumers|Kepercayaan konsumen Muslim|ムスリム消費者の信頼|穆斯林消费者信任', 'Buyers can rely on the label.|Pembeli dapat mengandalkan labelnya.|ラベルを信頼して買える。|买家可信赖标识。'),
      I('mkt', 'food,mfg', 'market', 2, 'Larger domestic and export market|Pasar dalam dan luar negeri lebih luas|国内外の市場拡大|国内外市场更大', 'Opens doors to halal-conscious markets.|Membuka pintu ke pasar yang peduli halal.|ハラールを重視する市場に参入できる。|打开重视清真的市场。'),
      I('cap', 'food,mfg', 'clean', 2, 'Hygiene and traceability|Kebersihan dan keterlacakan|衛生とトレーサビリティ|卫生与可追溯', 'Process discipline improves quality.|Disiplin proses meningkatkan mutu.|工程管理が、品質を高める。|流程纪律提升质量。'),
      I('cap', 'food,pub', 'law', 2, 'Legal compliance|Kepatuhan hukum|法令順守|合法合规', 'Required for many products.|Diwajibkan untuk banyak produk.|多くの製品で義務付けられている。|许多产品强制要求。')
    ], [
      I('cost', 'food,retail', 'expensive', 3, 'Cost for small firms|Biaya bagi usaha kecil|小規模事業者の負担|小企业负担', 'Fees, audits and upgrades add up.|Biaya, audit, dan perbaikan menumpuk.|費用・審査・改修がかさむ。|费用、审核与改造累积。'),
      I('eff', 'food,mfg', 'rules', 2, 'Paperwork and process changes|Dokumen dan perubahan proses|書類と工程の変更|文书与流程调整', 'Documentation and supplier checks.|Dokumentasi dan pemeriksaan pemasok.|文書化と仕入先の確認が必要。|文档与供应商核查。'),
      I('eff', 'food', 'slow', 2, 'Waiting time|Waktu tunggu|待ち時間|等待时间', 'Approval can take weeks or months.|Persetujuan bisa memakan minggu hingga bulan.|認証まで、数週間から数か月かかる。|审批需数周至数月。'),
      I('risk', 'food,mfg', 'lose', 2, 'Supply chain limits|Keterbatasan rantai pasok|サプライチェーンの制約|供应链限制', 'All inputs must also be halal.|Semua bahan baku juga harus halal.|原材料もすべてハラールが必要。|所有原料也须清真。')
    ]),
    C('informal economy', 'Informal business|Usaha informal|インフォーマルな事業|非正规经营', ['formal registration'], [
      I('val', 'retail,food,fam', 'free', 3, 'Low barriers and costs|Hambatan dan biaya rendah|参入障壁・コストが低い|门槛与成本低', 'No licences, taxes or paperwork.|Tanpa izin, pajak, atau dokumen.|許可も税も書類も不要。|无需执照、税或文书。'),
      I('eff', 'retail,food', 'flexible', 2, 'Flexibility|Fleksibilitas|柔軟性|灵活', 'Change products and places quickly.|Mengganti produk dan lokasi dengan cepat.|商品も場所も、すぐ変えられる。|产品与地点说变就变。'),
      I('ppl', 'fam,retail,food', 'job', 2, 'Livelihood for many|Sumber penghidupan banyak orang|多くの人の生計|众多人的生计', 'Work for people shut out of formal jobs.|Pekerjaan bagi mereka yang tak terjangkau kerja formal.|正規雇用に就けない人の仕事になる。|为无法进入正规就业者提供工作。'),
      I('val', 'retail,food', 'cash', 2, 'Quick cash|Uang tunai cepat|すぐ現金収入|快速现金', 'Earn daily income.|Mendapat penghasilan harian.|日銭が入る。|每日赚取收入。')
    ], [
      I('risk', 'retail,food,fam', 'lose', 3, 'No legal protection|Tanpa perlindungan hukum|法的保護がない|无法律保护', 'Contracts, disputes and eviction are risky.|Kontrak, sengketa, dan penggusuran berisiko.|契約・紛争・立ち退きで不利。|合同、纠纷与驱逐有风险。'),
      I('cost', 'retail,food', 'poor', 3, 'Hard to grow or borrow|Sulit tumbuh atau meminjam|成長・借入が難しい|难增长或借贷', 'Banks require formal records.|Bank membutuhkan catatan formal.|銀行は、正式な記録を求める。|银行要求正规记录。'),
      I('ppl', 'retail,food', 'poor', 2, 'No benefits or insurance|Tanpa tunjangan atau asuransi|社会保障がない|无福利或保险', 'Illness or accidents can ruin families.|Sakit atau kecelakaan bisa menghancurkan keluarga.|病気や事故で、家計が破綻しうる。|疾病或事故可毁掉家庭。'),
      I('risk', 'pub,retail', 'law', 2, 'Raids and fines|Razia dan denda|取り締まりと罰金|取缔与罚款', 'Authorities may close or fine stalls.|Petugas dapat menutup atau mendenda lapak.|当局が、営業停止や罰金を科すことがある。|当局可能封摊罚款。')
    ]),
    C('formal registration', 'Formal business registration|Pendaftaran usaha resmi|正式な事業登録|正式注册', ['informal economy'], [
      I('val', 'fin,biz,retail', 'invest', 3, 'Access to loans and programmes|Akses pinjaman dan program|融資・支援策へのアクセス|可获贷款与扶持', 'Banks and government schemes need papers.|Bank dan program pemerintah memerlukan dokumen.|銀行や公的支援は、書類を求める。|银行与政府项目要求文件。'),
      I('mkt', 'retail,food,biz', 'trust', 2, 'Credibility with customers|Kredibilitas di mata pelanggan|顧客からの信用|客户信誉', 'Big buyers only deal with registered firms.|Pembeli besar hanya bertransaksi dengan usaha terdaftar.|大口顧客は、登録事業者としか取引しない。|大买家只与注册企业交易。'),
      I('val', 'retail,biz', 'safe', 2, 'Legal protection|Perlindungan hukum|法的保護|法律保护', 'Contracts and brands can be enforced.|Kontrak dan merek dapat ditegakkan.|契約やブランドを守れる。|合同与品牌可受保护。'),
      I('cap', 'retail,food', 'grow', 2, 'Room to grow|Ruang untuk berkembang|成長の余地|成长空间', 'Hire staff, rent premises and export.|Merekrut staf, menyewa tempat, dan mengekspor.|雇用・賃貸・輸出ができる。|可雇人、租场地、出口。')
    ], [
      I('cost', 'retail,food', 'expensive', 3, 'Costs and taxes|Biaya dan pajak|費用と税|成本与税', 'Fees, accounting and tax payments.|Biaya, akuntansi, dan pembayaran pajak.|手数料・会計・納税が発生する。|规费、会计与纳税。'),
      I('eff', 'retail,food', 'rules', 3, 'Paperwork and rules|Dokumen dan aturan|書類と規則|文书与规则', 'Reporting and licences take time.|Pelaporan dan izin memakan waktu.|報告や許認可に、時間がかかる。|申报与许可耗时。'),
      I('risk', 'retail,food', 'pressure', 2, 'Inspections and obligations|Pemeriksaan dan kewajiban|検査と義務|检查与义务', 'Standards and audits apply.|Standar dan audit berlaku.|基準や監査の対象になる。|适用标准与审核。'),
      I('risk', 'retail,food', 'lose', 2, 'Loss of cash advantage|Hilangnya keuntungan tunai|現金取引の利点を失う|失去现金优势', 'Records reduce room to avoid tax.|Pencatatan mengurangi ruang untuk menghindari pajak.|記録が残ることで、節税の余地が減る。|记录减少避税空间。')
    ]),
    C('microfinance', 'Microfinance|Keuangan mikro|マイクロファイナンス|小额信贷', ['bank loan'], [
      I('ppl', 'fam,retail,farm', 'help', 3, 'Credit for the unbanked|Kredit bagi yang tak terjangkau bank|銀行を使えない人への融資|为无银行服务者提供信贷', 'Small loans without collateral.|Pinjaman kecil tanpa agunan.|担保なしの少額融資。|无抵押小额贷款。'),
      I('ppl', 'fam,retail', 'job', 2, 'Starts small businesses|Memulai usaha kecil|小さな事業の創出|助力小生意起步', 'A little capital changes a household.|Sedikit modal mengubah satu rumah tangga.|わずかな資金が、家計を変える。|少量资本改变一个家庭。'),
      I('ppl', 'fam,farm', 'team', 2, 'Group trust|Kepercayaan kelompok|グループの信頼|小组信任', 'Peer groups encourage repayment.|Kelompok sebaya mendorong pembayaran.|仲間の存在が、返済を後押しする。|同伴小组促进还款。'),
      I('cap', 'fam,retail', 'learn', 2, 'Financial habits|Kebiasaan keuangan|金融リテラシー|理财习惯', 'Borrowers learn to save and plan.|Peminjam belajar menabung dan merencanakan.|借り手が、貯蓄と計画を学ぶ。|借款人学会储蓄与规划。')
    ], [
      I('cost', 'fam,retail,farm', 'interest', 3, 'High interest|Bunga tinggi|高い金利|利率高', 'Small loans cost more to manage.|Pinjaman kecil lebih mahal dikelola.|小口融資は、管理コストが高い。|小额贷款管理成本高。'),
      I('risk', 'fam,retail', 'debt', 3, 'Debt traps|Jerat utang|多重債務|债务陷阱', 'Borrowers take new loans to repay old ones.|Peminjam mengambil pinjaman baru untuk membayar lama.|返済のために、また借りてしまう。|借新还旧。'),
      I('ppl', 'fam,retail', 'pressure', 2, 'Social pressure|Tekanan sosial|周囲からの圧力|社会压力', 'Groups shame those who cannot repay.|Kelompok mempermalukan yang tak mampu membayar.|返せない人が、仲間から責められる。|无法还款者受群体羞辱。'),
      I('mkt', 'fam,retail', 'limit', 2, 'Small amounts only|Hanya jumlah kecil|少額に限られる|金额有限', 'Not enough to scale a business.|Tidak cukup untuk membesarkan usaha.|事業拡大には足りない。|不足以扩大业务。')
    ]),
    C('bank loan', 'Bank loan|Pinjaman bank|銀行融資|银行贷款', ['microfinance'], [
      I('val', 'biz,retail,fam', 'money', 3, 'Large, lower-cost funding|Dana besar dengan biaya lebih rendah|大口で低コストの資金|大额且较低成本资金', 'Lower interest than informal lenders.|Bunga lebih rendah daripada rentenir.|ヤミ金融より、金利が低い。|利率低于非正规放贷。'),
      I('cap', 'biz,retail', 'keep', 2, 'Keep ownership|Mempertahankan kepemilikan|所有権を維持|保留所有权', 'Lender takes no share of the business.|Pemberi pinjaman tidak mengambil bagian usaha.|貸し手は、事業の持ち分を取らない。|贷方不分走股权。'),
      I('val', 'biz,fin', 'plan', 2, 'Predictable instalments|Cicilan terprediksi|返済額が一定|分期可预测', 'Repayments are planned.|Pembayaran direncanakan.|返済計画が立てやすい。|还款可规划。'),
      I('cap', 'biz,retail', 'build', 2, 'Builds credit history|Membangun riwayat kredit|信用履歴の構築|建立信用记录', 'Good repayment opens bigger loans.|Pembayaran lancar membuka pinjaman lebih besar.|返済実績が、次の融資につながる。|良好还款带来更大贷款。')
    ], [
      I('risk', 'biz,retail,fam', 'debt', 3, 'Debt burden|Beban utang|債務の負担|债务负担', 'Instalments are due even in slow months.|Cicilan jatuh tempo walau penjualan sepi.|売上が悪い月も、返済は来る。|淡季也得还款。'),
      I('risk', 'biz,retail', 'lose', 2, 'Collateral at risk|Agunan terancam|担保を失う恐れ|抵押品风险', 'Land or equipment may be seized.|Tanah atau peralatan bisa disita.|土地や設備を差し押さえられる恐れ。|土地或设备可能被没收。'),
      I('eff', 'retail,farm', 'rules', 2, 'Paperwork and approval time|Dokumen dan waktu persetujuan|書類と審査期間|文书与审批时间', 'Banks demand records and plans.|Bank menuntut catatan dan rencana.|銀行は、記録と計画を求める。|银行要求记录与计划。'),
      I('mkt', 'retail,farm', 'limit', 2, 'Hard for small firms|Sulit bagi usaha kecil|小規模事業者には難しい|小企业难获批', 'Many applicants are rejected.|Banyak pemohon ditolak.|申込みが断られる例が多い。|许多申请被拒。')
    ]),
    C('digital payments', 'QRIS and e-wallets|QRIS dan dompet digital|QRIS・電子マネー|QRIS与电子钱包', ['cash payments'], [
      I('mkt', 'retail,food', 'easy', 3, 'Convenient for customers|Praktis bagi pelanggan|顧客にとって便利|客户方便', 'Pay by scanning a code.|Bayar dengan memindai kode.|コードを読み取るだけで払える。|扫码即付。'),
      I('val', 'retail,food', 'safe', 2, 'Less cash handling|Mengurangi uang tunai|現金管理の手間減|减少现金处理', 'Fewer theft and counting errors.|Lebih sedikit pencurian dan kesalahan hitung.|盗難や数え間違いが減る。|减少盗窃与算错。'),
      I('cap', 'retail,fin', 'data', 2, 'Sales records|Catatan penjualan|売上記録が残る|销售记录', 'Transactions are logged automatically.|Transaksi tercatat otomatis.|取引が自動で記録される。|交易自动记录。'),
      I('cap', 'retail,food', 'invest', 2, 'Path to credit|Jalan menuju kredit|融資への足がかり|通向信贷', 'Digital records help prove income.|Catatan digital membantu membuktikan penghasilan.|デジタル記録が、収入の証明になる。|数字记录证明收入。')
    ], [
      I('cost', 'retail,food', 'expensive', 3, 'Fees and delays|Biaya dan keterlambatan|手数料と入金遅れ|手续费与延迟', 'Merchants pay a cut and wait for settlement.|Pedagang membayar potongan dan menunggu pencairan.|加盟店は手数料を払い、入金を待つ。|商家付抽成并等结算。'),
      I('risk', 'retail,fam', 'cheat', 2, 'Fraud and scams|Penipuan|詐欺|欺诈', 'Fake apps and phishing target users.|Aplikasi palsu dan phishing menyasar pengguna.|偽アプリやフィッシングが狙う。|假应用与钓鱼针对用户。'),
      I('risk', 'retail,food', 'stop', 2, 'Needs signal and power|Butuh sinyal dan listrik|通信・電源が必要|需要信号与电力', 'No connection, no sale.|Tanpa koneksi, tidak ada penjualan.|通信が切れると、売れない。|无网络则无法交易。'),
      I('ppl', 'fam,retail', 'skill', 2, 'Excludes the less digital|Mengecualikan yang kurang digital|デジタルに不慣れな人が取り残される|排除不熟悉数字者', 'Older or rural customers struggle.|Pelanggan lansia atau pedesaan kesulitan.|高齢者や農村部の客が、使いにくい。|老年或乡村客户不便。')
    ]),
    C('cash payments', 'Cash payments|Pembayaran tunai|現金払い|现金支付', ['digital payments'], [
      I('val', 'retail,food,fam', 'easy', 3, 'Simple and universal|Sederhana dan universal|簡単でどこでも使える|简单通用', 'Everyone accepts cash.|Semua orang menerima tunai.|誰でも受け取れる。|人人接受现金。'),
      I('val', 'retail,food', 'cheap', 2, 'No transaction fees|Tanpa biaya transaksi|手数料がかからない|无手续费', 'Merchants keep every rupiah.|Pedagang menerima setiap rupiah.|売上が、そのまま手元に残る。|商家全额入账。'),
      I('cap', 'retail,food', 'now', 2, 'Instant settlement|Penyelesaian instan|即時決済|即时结算', 'Money in hand immediately.|Uang langsung di tangan.|その場で現金が手に入る。|钱立即到手。'),
      I('ppl', 'fam,retail', 'secret', 2, 'Private|Privat|匿名性が高い|私密', 'No trail of what you bought.|Tidak ada jejak apa yang dibeli.|何を買ったか、記録が残らない。|不留购买痕迹。')
    ], [
      I('risk', 'retail,food', 'theft', 3, 'Theft and robbery|Pencurian dan perampokan|盗難・強盗|盗窃与抢劫', 'Cash can be stolen or lost.|Uang tunai bisa dicuri atau hilang.|現金は、盗まれたり失くしたりする。|现金可能被盗或丢失。'),
      I('eff', 'retail,food', 'time', 2, 'Counting and banking time|Waktu menghitung dan menyetor|数える・入金する手間|清点与存款耗时', 'Daily reconciliation and trips to the bank.|Rekonsiliasi harian dan perjalanan ke bank.|毎日の集計と銀行通い。|每日对账与跑银行。'),
      I('risk', 'retail,food', 'mistake', 2, 'Change and counterfeit errors|Kesalahan kembalian dan uang palsu|釣り銭ミス・偽札|找零错误与假币', 'Mistakes happen at the counter.|Kesalahan terjadi di kasir.|レジでミスが起きる。|柜台易出错。'),
      I('cap', 'retail,fin', 'data', 2, 'No records|Tanpa catatan|記録が残らない|无记录', 'Hard to prove income to lenders.|Sulit membuktikan pendapatan kepada pemberi pinjaman.|貸し手に収入を証明しにくい。|难向贷方证明收入。')
    ]),
    C('ride hailing', 'Ride-hailing platforms|Platform ojek dan taksi daring|配車プラットフォーム|网约车平台', ['gig workers'], [
      I('mkt', 'retail,pub,fam', 'easy', 3, 'Convenience|Kemudahan|利便性|便利', 'Book a ride in seconds.|Pesan perjalanan dalam hitungan detik.|数秒で配車できる。|数秒叫车。'),
      I('ppl', 'fam,retail', 'job', 3, 'Income opportunities|Peluang penghasilan|収入の機会|收入机会', 'Anyone with a vehicle can earn.|Siapa pun dengan kendaraan dapat mencari uang.|車両があれば、誰でも稼げる。|有车即可赚钱。'),
      I('mkt', 'retail,pub', 'cheap', 2, 'Transparent pricing|Harga transparan|料金の透明性|价格透明', 'Fare shown before the trip.|Tarif terlihat sebelum perjalanan.|乗る前に料金が分かる。|行前即知价格。'),
      I('cap', 'retail,biz', 'new', 2, 'Spreads to delivery and services|Meluas ke pengiriman dan layanan|配送などへの展開|扩展至配送与服务', 'One app, many services.|Satu aplikasi, banyak layanan.|1つのアプリで、多様なサービス。|一个应用多种服务。')
    ], [
      I('ppl', 'fam,retail', 'poor', 3, 'Low and unstable driver income|Penghasilan pengemudi rendah dan tidak stabil|ドライバーの収入が低く不安定|司机收入低且不稳', 'Commissions and fuel eat earnings.|Komisi dan bahan bakar menggerus penghasilan.|手数料や燃料費が収入を削る。|抽成与油费吞噬收入。'),
      I('ppl', 'fam,retail', 'weak', 2, 'Little protection|Perlindungan minim|保護が乏しい|保障少', 'No insurance or job security.|Tanpa asuransi atau jaminan kerja.|保険も雇用保障もない。|无保险与工作保障。'),
      I('risk', 'pub,retail', 'conflict', 2, 'Conflicts with traditional operators|Konflik dengan operator tradisional|従来事業者との対立|与传统运营者冲突', 'Old taxi drivers lose business.|Sopir taksi lama kehilangan penghasilan.|従来のタクシー運転手が、仕事を失う。|传统司机失去生意。'),
      I('risk', 'pub,biz', 'power', 2, 'Platform dominance|Dominasi platform|プラットフォームの支配力|平台垄断', 'Companies set rules and fees alone.|Perusahaan menetapkan aturan dan biaya sendiri.|運営会社が、一方的にルールと手数料を決める。|平台单方面定规则与费率。')
    ]),
    C('arisan', 'Rotating savings group (arisan)|Arisan|無尽・頼母子講（アリサン）|轮流储蓄会（Arisan）', ['bank loan'], [
      I('ppl', 'fam,retail', 'friend', 3, 'Social bonds|Ikatan sosial|社会的な絆|社交纽带', 'Friends meet regularly and support each other.|Teman bertemu rutin dan saling mendukung.|仲間が定期的に集まり、支え合う。|朋友定期聚会互助。'),
      I('val', 'fam,retail', 'save', 3, 'Forced saving|Tabungan paksa|強制的な貯蓄|强制储蓄', 'The group commitment keeps people paying in.|Komitmen kelompok menjaga orang tetap menyetor.|グループの約束が、積立を続けさせる。|群体承诺促使持续缴款。'),
      I('val', 'fam,retail', 'money', 2, 'Lump sum without interest|Dana sekaligus tanpa bunga|無利子でまとまった資金|无息获得整笔资金', 'Winners get a large amount at once.|Pemenang menerima jumlah besar sekaligus.|当たった人は、まとまった額を受け取る。|中签者一次得大笔资金。'),
      I('cap', 'fam,retail', 'easy', 2, 'No paperwork|Tanpa dokumen|書類不要|无需文件', 'Based on trust, not forms.|Berdasarkan kepercayaan, bukan formulir.|書類でなく信頼に基づく。|靠信任而非表格。')
    ], [
      I('risk', 'fam,retail', 'cheat', 3, 'Default and fraud|Gagal bayar dan penipuan|不払い・詐欺|违约与欺诈', 'Someone may stop paying after receiving.|Seseorang bisa berhenti membayar setelah menerima.|受け取った後に、払わなくなる人が出る。|有人领款后不再缴款。'),
      I('ppl', 'fam,retail', 'pressure', 2, 'Social pressure to join|Tekanan sosial untuk ikut|参加への同調圧力|被迫参加的社交压力', 'Hard to refuse friends and relatives.|Sulit menolak teman dan kerabat.|友人や親戚の誘いを、断りにくい。|难拒绝亲友邀请。'),
      I('risk', 'fam,retail', 'lose', 2, 'Waiting turn disadvantage|Kerugian bagi yang menunggu giliran|順番が遅い人の不利|等得晚者吃亏', 'Late winners effectively lend to early ones.|Pemenang akhir pada dasarnya meminjamkan ke pemenang awal.|順番の遅い人は、実質的に早い人へ貸すことになる。|后中者等于借钱给先中者。'),
      I('cap', 'fam,retail', 'proof', 2, 'No legal protection|Tanpa perlindungan hukum|法的保護がない|无法律保障', 'Disputes are hard to enforce.|Sengketa sulit ditegakkan.|もめても、強制力がない。|纠纷难以执行。')
    ]),
    C('mutual cooperation', 'Gotong royong|Gotong royong|相互扶助（ゴトン・ロヨン）|互助合作（Gotong royong）', ['individualism'], [
      I('ppl', 'fam,pub,farm', 'help', 3, 'Shared burdens|Beban bersama|負担の分かち合い|共担负担', 'Big tasks become light.|Tugas besar menjadi ringan.|大きな仕事も、軽くなる。|大事变轻。'),
      I('ppl', 'fam,pub', 'friend', 2, 'Strong community|Komunitas kuat|強い地域のつながり|社区紧密', 'People know and care about neighbours.|Orang mengenal dan peduli pada tetangga.|隣人を知り、気にかける。|人们了解关心邻居。'),
      I('val', 'fam,pub,farm', 'save', 2, 'Saves money|Hemat biaya|費用の節約|节省开支', 'Volunteer labour replaces paid work.|Tenaga sukarela menggantikan upah.|ボランティア労働が、費用を減らす。|志愿劳动替代雇工。'),
      I('cap', 'pub,biz', 'trust', 2, 'Trust and harmony|Kepercayaan dan keharmonisan|信頼と調和|信任与和谐', 'Cooperation reduces conflict.|Kerja sama mengurangi konflik.|協力が、争いを減らす。|合作减少冲突。')
    ], [
      I('risk', 'biz,pub', 'lazy', 3, 'Free riders|Pembonceng gratis|ただ乗り|搭便车', 'Some enjoy the benefits without helping.|Sebagian menikmati manfaat tanpa membantu.|手伝わずに恩恵だけ受ける人がいる。|有人只享受不出力。'),
      I('eff', 'biz,mfg', 'slow', 2, 'Slow, informal organisation|Organisasi lambat dan informal|組織が遅く非公式|组织缓慢松散', 'Consensus takes time.|Konsensus butuh waktu.|合意形成に時間がかかる。|共识耗时。'),
      I('ppl', 'fam,pub', 'pressure', 2, 'Pressure to conform|Tekanan untuk menyesuaikan diri|同調圧力|从众压力', 'Individual choices are limited.|Pilihan individu terbatas.|個人の選択が制限される。|个人选择受限。'),
      I('mkt', 'biz,mfg', 'limit', 2, 'Hard to scale|Sulit diperbesar|規模拡大が難しい|难以扩大', 'Works best in small groups.|Bekerja terbaik di kelompok kecil.|小さな集団で最もよく機能する。|小群体最有效。')
    ]),
    C('individualism', 'Individual incentive-driven work|Kerja berbasis insentif individu|個人インセンティブ型の働き方|个人激励驱动工作', ['mutual cooperation'], [
      I('ppl', 'biz,retail', 'win', 3, 'Rewards effort directly|Menghargai usaha secara langsung|努力が直接報われる|直接奖励努力', 'People see what they earn by working hard.|Orang melihat hasil dari kerja keras.|頑張った分が、はっきり返ってくる。|努力多少看得见。'),
      I('eff', 'biz,mfg', 'fast', 2, 'Quick decisions|Keputusan cepat|素早い意思決定|决策快', 'No need to wait for the group.|Tak perlu menunggu kelompok.|集団を待たなくていい。|无需等待集体。'),
      I('cap', 'biz,edu', 'new', 2, 'Encourages initiative|Mendorong inisiatif|主体性を促す|鼓励主动', 'Individuals take risks and try ideas.|Individu berani mengambil risiko dan mencoba gagasan.|個人が、リスクを取り試す。|个人敢于尝试。'),
      I('cap', 'biz,pub', 'clear', 2, 'Clear accountability|Akuntabilitas jelas|責任が明確|责任清晰', 'Everyone owns their results.|Setiap orang memiliki hasilnya.|各自が、成果に責任を持つ。|人人对结果负责。')
    ], [
      I('ppl', 'biz,edu', 'conflict', 3, 'Rivalry and mistrust|Persaingan dan ketidakpercayaan|競争と不信|竞争与不信任', 'Colleagues hoard help and credit.|Rekan menahan bantuan dan pujian.|同僚が、助け合いも手柄も出し惜しむ。|同事吝于帮助与功劳。'),
      I('ppl', 'fam,biz', 'alone', 2, 'Isolation|Keterasingan|孤立|孤立', 'Less community support.|Dukungan komunitas berkurang.|地域の支えが減る。|社区支持减少。'),
      I('risk', 'biz,mfg', 'short', 2, 'Short-term, selfish behaviour|Perilaku jangka pendek dan egois|短期的・利己的な行動|短视自私行为', 'People chase their own metrics.|Orang mengejar target pribadinya.|各自が、自分の指標だけを追う。|人们只追自己的指标。'),
      I('ppl', 'pub,fam', 'poor', 2, 'Inequality|Ketimpangan|格差|不平等', 'Strong performers gain, others fall behind.|Yang kuat untung, yang lain tertinggal.|強い人が得をし、他は取り残される。|强者受益弱者掉队。')
    ]),
    C('local content', 'Local content requirements|Kewajiban kandungan lokal (TKDN)|国産化要件（TKDN）|本地含量要求（TKDN）', ['free trade'], [
      I('ppl', 'mfg,pub,farm', 'job', 3, 'Domestic jobs and industry|Lapangan kerja dan industri dalam negeri|国内の雇用と産業|国内就业与产业', 'Local suppliers gain orders.|Pemasok lokal mendapat pesanan.|国内の仕入先に注文が回る。|本地供应商获得订单。'),
      I('cap', 'mfg,pub', 'skill', 2, 'Technology transfer|Transfer teknologi|技術移転|技术转移', 'Foreign firms train local partners.|Perusahaan asing melatih mitra lokal.|外資が、現地企業を育てる。|外企培训本地伙伴。'),
      I('val', 'pub,fin', 'save', 2, 'Saves foreign exchange|Menghemat devisa|外貨の節約|节省外汇', 'Fewer imports.|Impor berkurang.|輸入が減る。|减少进口。'),
      I('cap', 'pub,mfg', 'safe', 2, 'Supply security|Keamanan pasokan|供給の安全保障|供应安全', 'Less exposure to global shocks.|Lebih sedikit terdampak guncangan global.|世界的なショックに強くなる。|减少全球冲击影响。')
    ], [
      I('cost', 'mfg,retail', 'expensive', 3, 'Higher costs and prices|Biaya dan harga lebih tinggi|コストと価格の上昇|成本与价格上涨', 'Local inputs may cost more.|Bahan lokal mungkin lebih mahal.|国産部材が、割高なことがある。|本地投入可能更贵。'),
      I('mkt', 'mfg,pub', 'quality', 2, 'Lower quality or choice|Kualitas atau pilihan lebih rendah|品質・選択肢の低下|质量或选择下降', 'Local suppliers may not meet standards.|Pemasok lokal mungkin belum memenuhi standar.|現地調達先が、基準を満たさないことも。|本地供应商未必达标。'),
      I('risk', 'mfg,biz', 'depend', 2, 'Deters foreign investors|Menghalangi investor asing|外国投資家が敬遠|吓退外国投资者', 'Complex rules raise the cost of entry.|Aturan rumit menaikkan biaya masuk.|複雑な規則が、参入コストを押し上げる。|复杂规则抬高进入成本。'),
      I('risk', 'pub,mfg', 'cheat', 2, 'Paper compliance|Kepatuhan di atas kertas|書類上の順守|纸面合规', 'Firms game the percentages.|Perusahaan mengakali persentasenya.|企業が、数字を操作する。|企业钻比例空子。')
    ]),
    C('minimum wage', 'Minimum wage|Upah minimum|最低賃金|最低工资', ['labour intensive'], [
      I('ppl', 'fam,retail,mfg', 'money', 3, 'Higher income for low earners|Penghasilan lebih tinggi bagi pekerja berupah rendah|低所得者の収入増|低薪者收入提高', 'A wage floor lifts pay.|Batas bawah upah mengangkat pendapatan.|賃金の下限が、収入を押し上げる。|工资底线提升收入。'),
      I('mkt', 'retail,food', 'market', 2, 'More consumer spending|Belanja konsumen meningkat|消費の拡大|消费增加', 'Workers spend more locally.|Pekerja berbelanja lebih banyak secara lokal.|労働者が、地元でより多く使う。|工人在本地多消费。'),
      I('ppl', 'mfg,retail', 'fair', 2, 'Fairness|Keadilan|公正さ|公平', 'Prevents exploitation.|Mencegah eksploitasi.|搾取を防ぐ。|防止剥削。'),
      I('ppl', 'retail,mfg', 'stay', 2, 'Lower turnover|Pergantian lebih rendah|離職の減少|降低离职', 'Better pay keeps staff.|Gaji lebih baik mempertahankan staf.|待遇が良いと、人が辞めにくい。|薪资高留人。')
    ], [
      I('cost', 'mfg,retail,food', 'expensive', 3, 'Higher labour cost|Biaya tenaga kerja lebih tinggi|人件費の上昇|人工成本上升', 'Small firms struggle to pay.|Usaha kecil kesulitan membayar.|小規模事業者は、払うのが苦しい。|小企业难以承担。'),
      I('ppl', 'mfg,retail', 'job', 3, 'Fewer jobs or hours|Lebih sedikit pekerjaan atau jam|雇用・労働時間の減少|岗位或工时减少', 'Firms may cut staff or automate.|Perusahaan mungkin memangkas staf atau otomatisasi.|企業が、人員削減や自動化に動くことがある。|企业可能裁员或自动化。'),
      I('risk', 'retail,mfg', 'cheat', 2, 'Informal workaround|Akal-akalan informal|抜け道が生まれる|非正规规避', 'Some move to unregistered work.|Sebagian pindah ke pekerjaan tak terdaftar.|無登録の仕事に流れる人が出る。|部分转向未登记工作。'),
      I('mkt', 'retail,food', 'expensive', 2, 'Higher prices|Harga lebih tinggi|価格への転嫁|售价上涨', 'Costs are passed to customers.|Biaya diteruskan ke pelanggan.|コストが、顧客に転嫁される。|成本转嫁给客户。')
    ]),
    C('cash on delivery', 'Cash on delivery (COD)|Bayar di tempat (COD)|代金引換（COD）|货到付款（COD）', ['digital payments'], [
      I('mkt', 'retail,fam', 'trust', 3, 'Builds buyer confidence|Membangun kepercayaan pembeli|買い手の安心|增强买家信心', 'Customers pay only after seeing the goods.|Pelanggan membayar setelah melihat barang.|商品を見てから払える。|见货后付款。'),
      I('mkt', 'retail,fam', 'customer', 2, 'Reaches people without bank accounts|Menjangkau yang tidak punya rekening|口座のない人にも届く|触达无银行账户者', 'Opens e-commerce to more buyers.|Membuka e-commerce bagi lebih banyak pembeli.|より多くの人に、ECを開放する。|让更多人用上电商。'),
      I('mkt', 'retail', 'sell', 2, 'Higher conversion|Konversi lebih tinggi|購入率の向上|转化率提高', 'Hesitant buyers go ahead.|Pembeli ragu jadi membeli.|迷っていた人が、買ってくれる。|犹豫者下单。'),
      I('cap', 'retail,fam', 'easy', 2, 'Simple|Sederhana|手軽|简单', 'No online payment needed.|Tanpa pembayaran online.|オンライン決済が要らない。|无需在线支付。')
    ], [
      I('risk', 'retail', 'lose', 3, 'Refused deliveries|Pengiriman ditolak|受け取り拒否|拒收', 'Buyers are absent or change their mind.|Pembeli tidak ada atau berubah pikiran.|不在や気が変わって、受け取られない。|买家不在或改主意。'),
      I('cost', 'retail', 'expensive', 3, 'Return shipping cost|Biaya pengiriman kembali|返送コスト|退货运费', 'The seller pays twice for failed orders.|Penjual membayar dua kali untuk pesanan gagal.|失敗した注文で、往復の送料がかかる。|失败订单卖家付双倍运费。'),
      I('risk', 'retail,fam', 'cheat', 2, 'Cash handling risk|Risiko penanganan uang tunai|現金取扱いのリスク|现金处理风险', 'Couriers may lose or misuse cash.|Kurir bisa kehilangan atau menyalahgunakan uang.|配達員による紛失や不正がありうる。|快递员可能丢失或挪用现金。'),
      I('eff', 'retail', 'slow', 2, 'Delayed payment|Pembayaran tertunda|入金が遅い|回款延迟', 'Cash returns days after delivery.|Uang kembali beberapa hari setelah pengiriman.|代金が戻るのは、配送から数日後。|款项在送达数日后到账。')
    ]),
    C('live selling', 'Live-stream selling|Jualan lewat siaran langsung|ライブコマース|直播带货', ['advertising'], [
      I('mkt', 'retail,food', 'rush', 3, 'Urgency and impulse buying|Urgensi dan pembelian impulsif|緊急感と衝動買い|紧迫感与冲动购买', 'Limited-time offers on screen.|Penawaran terbatas waktu di layar.|時間限定の特典が、画面に出る。|屏幕限时优惠。'),
      I('mkt', 'retail,food', 'trust', 2, 'Real-time demonstration|Demonstrasi langsung|リアルタイムの実演|实时演示', 'Viewers see the product used.|Penonton melihat produk digunakan.|使うところを、その場で見られる。|观众看到产品使用。'),
      I('mkt', 'retail,food', 'friend', 2, 'Interaction with the seller|Interaksi dengan penjual|売り手との交流|与卖家互动', 'Questions are answered live.|Pertanyaan dijawab langsung.|質問に、その場で答えてもらえる。|提问当场解答。'),
      I('val', 'retail', 'cheap', 2, 'Low cost to start|Biaya mulai rendah|始めるコストが低い|起步成本低', 'A phone and a ring light are enough.|Ponsel dan lampu sudah cukup.|スマホと照明があれば足りる。|一部手机和补光灯即可。')
    ], [
      I('eff', 'retail,food', 'tired', 3, 'Exhausting for sellers|Melelahkan bagi penjual|売り手が疲弊|卖家疲惫', 'Hours of on-camera energy.|Berjam-jam berenergi di depan kamera.|何時間も、カメラの前で元気でいる必要。|数小时镜头前保持精力。'),
      I('risk', 'retail', 'lie', 2, 'Exaggeration and returns|Berlebihan dan banyak retur|誇張と返品の多さ|夸大与高退货', 'Impulse buys are often regretted.|Pembelian impulsif sering disesali.|衝動買いは、後悔されやすい。|冲动购买常后悔。'),
      I('risk', 'retail', 'depend', 2, 'Platform and algorithm dependence|Ketergantungan platform dan algoritma|プラットフォームへの依存|依赖平台与算法', 'A rule change can cut your reach.|Perubahan aturan bisa memangkas jangkauan Anda.|ルール変更で、リーチが激減しうる。|规则变化可能削减触达。'),
      I('cost', 'retail', 'expensive', 2, 'Fees and discounts|Biaya dan diskon|手数料と値引き|佣金与折扣', 'Commissions and deep discounts squeeze profit.|Komisi dan diskon besar menekan laba.|手数料と大幅値引きが、利益を圧迫する。|佣金与大折扣压缩利润。')
    ])
  );
})();
