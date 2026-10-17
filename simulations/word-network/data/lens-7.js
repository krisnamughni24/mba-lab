/* Word Network: curated concepts, batch 7 (technology and data). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('artificial intelligence', 'Artificial intelligence|Kecerdasan buatan (AI)|人工知能（AI）|人工智能', ['human judgement'], [
      I('eff', 'biz,retail,health', 'fast', 3, 'Speed at scale|Cepat dalam skala besar|大規模でも高速|大规模快速', 'Handles huge volumes in seconds.|Menangani volume besar dalam hitungan detik.|膨大な量を、数秒で処理する。|数秒处理海量数据。'),
      I('val', 'biz,retail', 'save', 2, 'Lower costs|Biaya lebih rendah|コスト削減|降低成本', 'Routine work is automated.|Pekerjaan rutin diotomatisasi.|定型業務を自動化できる。|例行工作自动化。'),
      I('cap', 'health,fin,biz', 'find', 2, 'Finds patterns|Menemukan pola|パターンの発見|发现规律', 'Spots trends people miss.|Melihat tren yang terlewat oleh manusia.|人が見逃す傾向を捉える。|发现人类忽略的趋势。'),
      I('mkt', 'retail,edu', 'customer', 2, 'Personal service at scale|Layanan personal skala besar|大規模な個別対応|规模化个性服务', 'Every customer gets tailored help.|Setiap pelanggan mendapat bantuan yang disesuaikan.|顧客ごとに、最適な支援ができる。|每位客户获得定制帮助。')
    ], [
      I('risk', 'health,fin,pub', 'mistake', 3, 'Confident errors|Kesalahan yang meyakinkan|自信ありげな誤り|自信满满的错误', 'Wrong answers can look right.|Jawaban salah bisa tampak benar.|間違いが、正しそうに見える。|错误答案看似正确。'),
      I('ppl', 'biz,retail,pub', 'job', 3, 'Job disruption|Gangguan pekerjaan|雇用への影響|岗位冲击', 'Some roles shrink or disappear.|Sebagian peran menyusut atau hilang.|なくなる、縮小する仕事が出る。|部分岗位萎缩或消失。'),
      I('risk', 'pub,fin,health', 'bias', 2, 'Bias and fairness|Bias dan keadilan|偏りと公平性|偏见与公平', 'Learns unfairness from its data.|Mempelajari ketidakadilan dari datanya.|データの偏りを、そのまま学ぶ。|从数据中学到偏见。'),
      I('risk', 'biz,health', 'secret', 2, 'Data privacy|Privasi data|データプライバシー|数据隐私', 'Sensitive information may leak.|Informasi sensitif bisa bocor.|機密情報が、漏れる恐れがある。|敏感信息可能泄露。')
    ]),
    C('human judgement', 'Human judgement|Penilaian manusia|人間の判断|人工判断', ['artificial intelligence'], [
      I('cap', 'health,pub,fam', 'ethics', 3, 'Ethics and empathy|Etika dan empati|倫理と共感|伦理与共情', 'People weigh values and feelings.|Manusia menimbang nilai dan perasaan.|人は、価値観や感情を考慮できる。|人会权衡价值与感受。'),
      I('cap', 'biz,health', 'context', 2, 'Understands context|Memahami konteks|文脈の理解|理解语境', 'Handles unusual situations.|Menangani situasi tak biasa.|異例の状況にも対応できる。|能处理非常规情形。'),
      I('ppl', 'retail,health', 'trust', 2, 'Trusted by people|Dipercaya orang|人から信頼される|被人信任', 'Customers want to speak to a person.|Pelanggan ingin berbicara dengan manusia.|顧客は、人と話したがる。|客户想与真人交谈。'),
      I('cap', 'biz,pub', 'new', 2, 'Creativity|Kreativitas|創造性|创造力', 'New ideas come from lived experience.|Gagasan baru datang dari pengalaman hidup.|新しい発想は、経験から生まれる。|新想法来自生活经验。')
    ], [
      I('eff', 'biz,retail', 'slow', 3, 'Slow and costly|Lambat dan mahal|遅くて高コスト|慢且昂贵', 'People cannot process large volumes.|Manusia tidak bisa memproses volume besar.|大量処理は、人には難しい。|人无法处理海量。'),
      I('risk', 'biz,fin,health', 'bias', 3, 'Bias and inconsistency|Bias dan inkonsistensi|偏りとばらつき|偏见与不一致', 'Mood and prejudice change decisions.|Suasana hati dan prasangka mengubah keputusan.|気分や偏見で、判断が変わる。|情绪与偏见改变决策。'),
      I('ppl', 'biz,health', 'tired', 2, 'Fatigue|Kelelahan|疲労|疲劳', 'Tired people decide worse.|Orang lelah memutuskan lebih buruk.|疲れると、判断が鈍る。|疲惫者决策更差。'),
      I('eff', 'biz,pub', 'hard', 2, 'Hard to scale|Sulit diskalakan|拡張が難しい|难以扩展', 'Expertise takes years to train.|Keahlian butuh bertahun-tahun untuk dilatih.|専門性の育成には、何年もかかる。|专业需多年培养。')
    ]),
    C('big data', 'Big data analytics|Analitik big data|ビッグデータ分析|大数据分析', ['intuition'], [
      I('cap', 'biz,retail,health', 'know', 3, 'Deep insight|Wawasan mendalam|深い洞察|深度洞察', 'Reveals what customers really do.|Mengungkap apa yang sebenarnya dilakukan pelanggan.|顧客の実際の行動が見える。|揭示客户真实行为。'),
      I('val', 'retail,mfg', 'profit', 2, 'Better targeting|Penargetan lebih baik|的確なターゲティング|定向更精准', 'Marketing money goes further.|Dana pemasaran lebih efektif.|広告費が、より効果的になる。|营销预算更有效。'),
      I('val', 'mfg,pub', 'save', 2, 'Efficiency|Efisiensi|効率化|提高效率', 'Waste and delays are found early.|Pemborosan dan keterlambatan terdeteksi dini.|ムダや遅れを、早く見つけられる。|早发现浪费与延迟。'),
      I('cap', 'biz,fin', 'predict', 2, 'Prediction|Prediksi|予測|预测', 'Forecasts improve with more data.|Perkiraan membaik dengan lebih banyak data.|データが増えるほど、予測は精度を増す。|数据越多预测越准。')
    ], [
      I('cost', 'biz,retail', 'expensive', 3, 'High infrastructure cost|Biaya infrastruktur tinggi|基盤コストが高い|基础设施昂贵', 'Storage, tools and specialists are costly.|Penyimpanan, alat, dan spesialis mahal.|保管・ツール・専門家に費用がかかる。|存储、工具与专家贵。'),
      I('risk', 'biz,health,fin', 'secret', 3, 'Privacy and security|Privasi dan keamanan|プライバシーと安全|隐私与安全', 'Big stores of data attract attackers.|Gudang data besar menarik penyerang.|大量のデータは、攻撃者を引き寄せる。|海量数据吸引攻击者。'),
      I('risk', 'biz,retail', 'mistake', 2, 'False patterns|Pola palsu|誤ったパターン|虚假规律', 'Correlation is mistaken for cause.|Korelasi disalahartikan sebagai sebab.|相関を因果と取り違える。|把相关当因果。'),
      I('eff', 'biz,pub', 'noise', 2, 'Information overload|Kelebihan informasi|情報過多|信息过载', 'Too much data hides what matters.|Terlalu banyak data menyembunyikan yang penting.|データが多すぎて、重要点が埋もれる。|数据太多掩盖重点。')
    ]),
    C('cloud computing', 'Cloud computing|Komputasi awan|クラウドコンピューティング|云计算', ['on-premise servers'], [
      I('val', 'biz,retail,edu', 'cheap', 3, 'Low upfront cost|Biaya awal rendah|初期費用が低い|前期成本低', 'Pay as you use instead of buying servers.|Bayar sesuai pemakaian, bukan membeli server.|サーバーを買わず、使った分だけ払う。|按使用付费而非买服务器。'),
      I('cap', 'biz,retail', 'flexible', 3, 'Scales on demand|Skala sesuai permintaan|需要に応じて拡張|按需扩展', 'Add or drop capacity in minutes.|Tambah atau kurangi kapasitas dalam hitungan menit.|数分で、容量を増減できる。|数分钟增减容量。'),
      I('eff', 'biz,edu', 'easy', 2, 'Less maintenance|Perawatan lebih ringan|保守の手間が少ない|维护更少', 'The provider runs the hardware.|Penyedia mengelola perangkat keras.|ハードウェアは、事業者が運用する。|硬件由提供商运营。'),
      I('cap', 'biz,edu', 'reach', 2, 'Access anywhere|Akses dari mana saja|どこからでも利用可能|随处访问', 'Teams work from any location.|Tim bekerja dari lokasi mana pun.|チームがどこからでも作業できる。|团队可随处工作。')
    ], [
      I('cost', 'biz,retail', 'expensive', 3, 'Costs rise with use|Biaya naik seiring pemakaian|使うほど費用が増える|越用越贵', 'Bills can surprise at scale.|Tagihan bisa mengejutkan pada skala besar.|規模が大きくなると、請求額に驚く。|规模大时账单惊人。'),
      I('risk', 'biz,health,fin', 'depend', 3, 'Provider dependence|Ketergantungan pada penyedia|事業者への依存|依赖服务商', 'Outages and lock-in are out of your hands.|Gangguan dan keterikatan di luar kendali Anda.|障害や囲い込みは、自社では制御できない。|故障与锁定超出你控制。'),
      I('risk', 'health,fin,pub', 'secret', 2, 'Data control and law|Kendali data dan hukum|データの管理と法規制|数据控制与法规', 'Where data sits can matter legally.|Lokasi data bisa berdampak hukum.|データの置き場所が、法的に問題になりうる。|数据所在地可能涉及法律。'),
      I('eff', 'biz,pub', 'slow', 2, 'Needs internet|Butuh internet|インターネット接続が必須|需要网络', 'No connection, no work.|Tanpa koneksi, tidak ada pekerjaan.|接続が切れると、作業できない。|断网就无法工作。')
    ]),
    C('on-premise servers', 'On-premise servers|Server sendiri (on-premise)|オンプレミス|本地服务器', ['cloud computing'], [
      I('cap', 'fin,health,pub', 'control', 3, 'Full control|Kendali penuh|完全な管理|完全掌控', 'You decide how data is stored and used.|Anda menentukan cara data disimpan dan dipakai.|データの保管や利用を自分で決められる。|数据存放与使用由你决定。'),
      I('val', 'fin,health,pub', 'safe', 2, 'Data stays in-house|Data tetap di dalam|データを社内に保持|数据留在内部', 'Easier to meet strict rules.|Lebih mudah memenuhi aturan ketat.|厳しい規制に対応しやすい。|更易满足严格规定。'),
      I('val', 'biz,mfg', 'long', 2, 'Cheaper at steady scale|Lebih murah pada skala stabil|安定規模なら割安|稳定规模下更便宜', 'Fixed workloads cost less than rental.|Beban kerja tetap lebih murah daripada sewa.|一定の負荷なら、借りるより安い。|固定负载比租用便宜。'),
      I('eff', 'mfg,pub', 'steady', 2, 'Predictable performance|Kinerja terprediksi|性能の安定|性能可预期', 'No shared neighbours.|Tanpa pengguna bersama.|他の利用者の影響を受けない。|无邻居干扰。')
    ], [
      I('cost', 'biz,pub', 'expensive', 3, 'Large upfront investment|Investasi awal besar|初期投資が大きい|前期投入大', 'Servers, space and power must be bought.|Server, ruang, dan listrik harus dibeli.|サーバー・設置場所・電源を用意する必要がある。|需购买服务器、机房与电力。'),
      I('eff', 'biz,pub', 'hard', 3, 'Maintenance burden|Beban perawatan|運用負担|维护负担', 'Your staff must patch, repair and upgrade.|Staf Anda harus menambal, memperbaiki, dan meningkatkan.|更新・修理・増強を自社で行う必要がある。|须自行打补丁、修理与升级。'),
      I('risk', 'biz,mfg', 'stuck', 2, 'Hard to scale|Sulit diperbesar|拡張しにくい|难以扩容', 'Peaks need extra hardware bought in advance.|Puncak beban butuh perangkat tambahan yang dibeli lebih dulu.|ピークのために、前もって増設が要る。|高峰需提前加购设备。'),
      I('risk', 'biz,health', 'danger', 2, 'Single points of failure|Titik kegagalan tunggal|単一障害点|单点故障', 'Fire or theft can wipe out everything.|Kebakaran atau pencurian bisa menghabiskan semuanya.|火災や盗難で、すべてを失う恐れがある。|火灾或盗窃可能全毁。')
    ]),
    C('cybersecurity', 'Cybersecurity investment|Investasi keamanan siber|サイバーセキュリティ投資|网络安全投入', ['cost cutting'], [
      I('val', 'fin,health,biz', 'safe', 3, 'Protects data and money|Melindungi data dan uang|データと資産を守る|保护数据与资金', 'Attacks are blocked or contained.|Serangan diblokir atau dibatasi.|攻撃を防ぎ、被害を抑える。|拦截或遏制攻击。'),
      I('mkt', 'fin,retail,health', 'trust', 3, 'Customer trust|Kepercayaan pelanggan|顧客の信頼|客户信任', 'People share data with safe firms.|Orang berbagi data dengan perusahaan yang aman.|安全な企業にこそ、データを預ける。|人们愿将数据交给安全的公司。'),
      I('cap', 'biz,pub', 'law', 2, 'Meets regulations|Memenuhi regulasi|規制への対応|满足监管', 'Avoids fines and audits.|Menghindari denda dan audit.|罰金や監査指摘を避けられる。|避免罚款与审计问题。'),
      I('val', 'biz,mfg', 'stay', 2, 'Business continuity|Kelangsungan bisnis|事業継続|业务连续', 'Operations survive incidents.|Operasi bertahan saat insiden.|事故があっても、事業を続けられる。|事故中业务得以延续。')
    ], [
      I('cost', 'biz,retail', 'expensive', 3, 'High and ongoing cost|Biaya tinggi dan berkelanjutan|継続的な高コスト|持续高成本', 'Tools, staff and audits never end.|Alat, staf, dan audit tidak ada habisnya.|ツール・人員・監査に、終わりはない。|工具、人员与审计没有尽头。'),
      I('eff', 'biz,health', 'slow', 2, 'Slows people down|Memperlambat orang|業務の妨げになる|拖慢工作', 'Passwords and checks add friction.|Kata sandi dan pemeriksaan menambah hambatan.|認証や確認の手間が増える。|密码与检查增加摩擦。'),
      I('risk', 'biz,fin', 'fail', 2, 'No guarantee|Tanpa jaminan|絶対の保証はない|无法保证', 'Determined attackers can still get in.|Penyerang gigih tetap bisa masuk.|執拗な攻撃者は、それでも侵入しうる。|执着的攻击者仍可能得手。'),
      I('ppl', 'biz,edu', 'careless', 2, 'People remain the weak link|Manusia tetap mata rantai lemah|人が弱点であり続ける|人仍是薄弱环节', 'Phishing tricks careless staff.|Phishing menipu staf yang ceroboh.|フィッシングは、不注意な社員を狙う。|钓鱼邮件欺骗粗心员工。')
    ]),
    C('open source', 'Open-source software|Perangkat lunak sumber terbuka|オープンソース|开源软件', ['proprietary software'], [
      I('val', 'biz,edu,pub', 'free', 3, 'Free to use|Gratis dipakai|無料で使える|免费使用', 'No licence fee.|Tanpa biaya lisensi.|ライセンス料がかからない。|无授权费。'),
      I('cap', 'biz,edu', 'control', 2, 'Freedom to modify|Bebas memodifikasi|自由に改変できる|可自由修改', 'You can adapt the code to your needs.|Anda dapat menyesuaikan kode dengan kebutuhan.|コードを、自社向けに変更できる。|可按需改写代码。'),
      I('cap', 'biz,pub', 'trust', 2, 'Transparent|Transparan|透明性|透明', 'Anyone can inspect the code.|Siapa pun dapat memeriksa kode.|誰でもコードを検証できる。|任何人可检查代码。'),
      I('cap', 'biz,edu', 'team', 2, 'Community support|Dukungan komunitas|コミュニティの支援|社区支持', 'Many developers improve it.|Banyak pengembang memperbaikinya.|多くの開発者が、改良に参加する。|众多开发者共同改进。')
    ], [
      I('eff', 'biz,pub', 'hard', 3, 'No guaranteed support|Tanpa dukungan terjamin|サポートの保証がない|无保障支持', 'You rely on volunteers or pay specialists.|Anda mengandalkan relawan atau membayar spesialis.|ボランティア頼み、または専門家に費用を払う。|依赖志愿者或付费专家。'),
      I('risk', 'biz,pub', 'danger', 2, 'Security gaps|Celah keamanan|セキュリティの穴|安全漏洞', 'Neglected projects can hide flaws.|Proyek terbengkalai bisa menyembunyikan cacat.|放置されたプロジェクトには、欠陥が潜みうる。|被荒废项目可能藏缺陷。'),
      I('risk', 'biz,pub', 'law', 2, 'Licence obligations|Kewajiban lisensi|ライセンス上の義務|授权义务', 'Some licences force you to share changes.|Sebagian lisensi mewajibkan Anda membagikan perubahan.|ライセンスによっては、改変の公開が義務になる。|部分许可证要求公开修改。'),
      I('risk', 'biz', 'stop', 2, 'Project may stop|Proyek bisa berhenti|開発が止まる恐れ|项目可能停更', 'Maintainers can lose interest.|Pengelola bisa kehilangan minat.|開発者が、関心を失うことがある。|维护者可能失去兴趣。')
    ]),
    C('proprietary software', 'Proprietary software|Perangkat lunak berpemilik|商用ソフトウェア|商业专有软件', ['open source'], [
      I('eff', 'biz,health,fin', 'help', 3, 'Vendor support|Dukungan vendor|ベンダーサポート|厂商支持', 'Someone is accountable when it breaks.|Ada pihak yang bertanggung jawab saat rusak.|不具合のとき、責任を負う相手がいる。|出问题有人负责。'),
      I('cap', 'biz', 'easy', 2, 'Polished and integrated|Rapi dan terintegrasi|完成度と統合性|成熟且集成', 'Works out of the box.|Langsung berfungsi.|導入してすぐ使える。|开箱即用。'),
      I('val', 'biz,fin', 'safe', 2, 'Accountability and warranties|Akuntabilitas dan garansi|責任の所在と保証|问责与保修', 'Contracts spell out obligations.|Kontrak menjelaskan kewajiban.|契約で義務が明記される。|合同明确义务。'),
      I('cap', 'biz,pub', 'steady', 2, 'Regular updates|Pembaruan rutin|定期的なアップデート|定期更新', 'A roadmap and fixes are planned.|Peta jalan dan perbaikan direncanakan.|計画的な改善と修正が行われる。|有路线图与修复计划。')
    ], [
      I('cost', 'biz,pub', 'expensive', 3, 'Licence fees|Biaya lisensi|ライセンス料|授权费用', 'Costs scale with users and years.|Biaya naik seiring pengguna dan tahun.|利用者数や年数に応じて費用が増える。|费用随用户与年限增加。'),
      I('risk', 'biz,mfg', 'lock', 3, 'Vendor lock-in|Keterikatan vendor|ベンダーロックイン|厂商锁定', 'Switching is expensive and hard.|Berpindah mahal dan sulit.|乗り換えは、高くて大変。|转换昂贵且困难。'),
      I('cap', 'biz', 'limit', 2, 'Limited customisation|Kustomisasi terbatas|カスタマイズに制限|定制受限', 'You get what the vendor allows.|Anda mendapat apa yang diizinkan vendor.|ベンダーが許す範囲しか変えられない。|只能用厂商允许的功能。'),
      I('risk', 'biz,pub', 'depend', 2, 'Vendor can change terms|Vendor bisa mengubah syarat|条件を変更される恐れ|厂商可更改条款', 'Prices and features are not in your control.|Harga dan fitur di luar kendali Anda.|価格や機能を、自社では決められない。|价格与功能不受你控制。')
    ]),
    C('digital transformation', 'Digital transformation|Transformasi digital|デジタル変革（DX）|数字化转型', ['legacy systems'], [
      I('eff', 'biz,pub,retail', 'fast', 3, 'Faster, simpler processes|Proses lebih cepat dan sederhana|プロセスの高速化|流程更快更简', 'Paper and manual steps disappear.|Kertas dan langkah manual hilang.|紙や手作業が減る。|纸质与手工步骤消失。'),
      I('mkt', 'retail,biz', 'customer', 2, 'Better customer experience|Pengalaman pelanggan lebih baik|顧客体験の向上|客户体验更好', 'Customers serve themselves anytime.|Pelanggan melayani diri sendiri kapan saja.|顧客がいつでも自分で手続きできる。|客户随时自助。'),
      I('cap', 'biz,pub', 'data', 2, 'Data for decisions|Data untuk keputusan|意思決定のためのデータ|决策数据', 'Everything becomes measurable.|Segalanya menjadi terukur.|あらゆるものが測定できる。|一切皆可度量。'),
      I('cap', 'biz,retail', 'new', 2, 'New business models|Model bisnis baru|新しいビジネスモデル|新商业模式', 'Digital channels open new revenue.|Kanal digital membuka pendapatan baru.|デジタルが新しい収益源を開く。|数字渠道带来新收入。')
    ], [
      I('cost', 'biz,pub', 'expensive', 3, 'Heavy investment|Investasi besar|多額の投資|投资巨大', 'Systems, training and consultants add up.|Sistem, pelatihan, dan konsultan menambah biaya.|システム・研修・コンサルがかさむ。|系统、培训与顾问费累积。'),
      I('ppl', 'biz,pub', 'fear', 3, 'Staff resistance|Penolakan staf|社員の抵抗|员工抵触', 'People fear change and job loss.|Orang takut perubahan dan kehilangan pekerjaan.|変化や失職への不安が、抵抗を生む。|人们怕变化与失业。'),
      I('risk', 'biz,pub', 'fail', 2, 'High failure rate|Tingkat kegagalan tinggi|失敗率が高い|失败率高', 'Many projects miss their goals.|Banyak proyek gagal mencapai tujuan.|多くのプロジェクトが、目標に届かない。|很多项目达不到目标。'),
      I('risk', 'biz,fin', 'danger', 2, 'New security risks|Risiko keamanan baru|新たなセキュリティリスク|新的安全风险', 'More systems means more targets.|Lebih banyak sistem berarti lebih banyak sasaran.|システムが増えるほど、狙われやすい。|系统越多目标越多。')
    ]),
    C('legacy systems', 'Keeping legacy systems|Mempertahankan sistem lama|レガシーシステムの維持|保留旧系统', ['digital transformation'], [
      I('val', 'biz,pub,fin', 'safe', 3, 'Proven and stable|Teruji dan stabil|実績があり安定|久经考验且稳定', 'It works and staff know it.|Sistem berfungsi dan staf mengenalnya.|動いており、社員も使い慣れている。|能用且员工熟悉。'),
      I('val', 'biz,pub', 'save', 2, 'No migration cost|Tanpa biaya migrasi|移行コスト不要|无迁移成本', 'Money stays for other priorities.|Dana tersedia untuk prioritas lain.|資金を、他の優先事項に回せる。|资金留给其他优先事项。'),
      I('eff', 'biz,pub', 'steady', 2, 'No disruption|Tanpa gangguan|混乱がない|无中断', 'Operations carry on as usual.|Operasi berjalan seperti biasa.|業務が、いつも通り続く。|运营照常。'),
      I('ppl', 'biz,pub', 'comfort', 2, 'Staff comfort|Kenyamanan staf|社員の安心|员工舒适', 'No retraining or new habits.|Tanpa pelatihan ulang atau kebiasaan baru.|再教育も、新しい習慣も不要。|无需再培训或新习惯。')
    ], [
      I('risk', 'fin,biz,pub', 'danger', 3, 'Security and failure risk|Risiko keamanan dan kegagalan|セキュリティ・故障リスク|安全与故障风险', 'Old code is unsupported and fragile.|Kode lama tidak didukung dan rapuh.|古いコードは、サポート切れで脆い。|旧代码无支持且脆弱。'),
      I('cost', 'biz,pub', 'expensive', 2, 'Rising maintenance costs|Biaya perawatan naik|保守費が増える|维护成本上升', 'Few experts remain, so they charge more.|Ahli yang tersisa sedikit, sehingga tarifnya naik.|詳しい人が減り、費用が上がる。|专家日少，收费上涨。'),
      I('eff', 'biz,retail', 'stuck', 2, 'Hard to integrate|Sulit diintegrasikan|連携しにくい|难以集成', 'New tools do not connect to old ones.|Alat baru tidak terhubung dengan yang lama.|新しいツールと、つなげにくい。|新工具难与旧系统对接。'),
      I('mkt', 'retail,biz', 'slow', 2, 'Slower innovation|Inovasi lebih lambat|革新が遅れる|创新放缓', 'Rivals move faster with modern systems.|Pesaing bergerak lebih cepat dengan sistem modern.|最新システムの競合に、遅れをとる。|对手用新系统更快。')
    ]),
    C('agile', 'Agile development|Pengembangan agile|アジャイル開発|敏捷开发', ['waterfall'], [
      I('cap', 'biz,edu', 'flexible', 3, 'Adapts to change|Beradaptasi dengan perubahan|変化に柔軟|适应变化', 'Plans change as you learn.|Rencana berubah seiring Anda belajar.|学びながら、計画を変えられる。|边学边调整计划。'),
      I('mkt', 'biz,retail', 'customer', 2, 'Early customer feedback|Umpan balik pelanggan lebih awal|早期の顧客フィードバック|早期客户反馈', 'Customers see working versions often.|Pelanggan sering melihat versi yang berjalan.|動くものを、頻繁に見てもらえる。|客户常看到可用版本。'),
      I('eff', 'biz,edu', 'fast', 2, 'Quick delivery|Pengiriman cepat|素早い提供|交付快', 'Value ships in small steps.|Nilai dikirim dalam langkah kecil.|価値を、小刻みに届けられる。|分小步交付价值。'),
      I('ppl', 'biz,edu', 'team', 2, 'Empowered teams|Tim berdaya|自律的なチーム|团队被赋能', 'Teams own how they work.|Tim memiliki cara kerjanya.|チームが、進め方を決める。|团队自主决定做法。')
    ], [
      I('risk', 'biz,pub', 'confuse', 3, 'Scope creep|Cakupan melebar|スコープの拡大|范围蔓延', 'Without limits, the project never ends.|Tanpa batas, proyek tidak pernah selesai.|歯止めがないと、終わらない。|无边界项目永无止境。'),
      I('eff', 'biz,pub', 'hard', 2, 'Hard to predict cost and date|Sulit memprediksi biaya dan tanggal|費用・納期の見通しが難しい|成本与日期难预测', 'Fixed contracts fit poorly.|Kontrak tetap kurang cocok.|固定契約と相性が悪い。|与固定合同不太匹配。'),
      I('eff', 'biz', 'noise', 2, 'Meeting overload|Terlalu banyak rapat|会議が多い|会议过多', 'Daily stand-ups and reviews take time.|Rapat harian dan tinjauan memakan waktu.|朝会やレビューに、時間を取られる。|每日站会与评审耗时。'),
      I('risk', 'pub,fin,health', 'rules', 2, 'Weak documentation|Dokumentasi lemah|文書化が不足|文档薄弱', 'Regulated work needs proof and records.|Pekerjaan teregulasi butuh bukti dan catatan.|規制の厳しい業務では、記録が必要。|受监管工作需要记录。')
    ]),
    C('waterfall', 'Waterfall planning|Perencanaan waterfall|ウォーターフォール型|瀑布式规划', ['agile'], [
      I('eff', 'pub,mfg,biz', 'plan', 3, 'Clear plan and budget|Rencana dan anggaran jelas|計画と予算が明確|计划预算清晰', 'Everyone knows scope, cost and date.|Semua tahu cakupan, biaya, dan tanggal.|範囲・費用・納期が、はっきりしている。|范围、成本与日期明确。'),
      I('val', 'pub,fin,health', 'proof', 2, 'Thorough documentation|Dokumentasi menyeluruh|十分な文書化|文档完备', 'Every decision is recorded.|Setiap keputusan dicatat.|決定事項が、すべて記録される。|每个决定都有记录。'),
      I('cap', 'mfg,pub', 'safe', 2, 'Suits safety-critical work|Cocok untuk pekerjaan kritis keselamatan|安全重視の案件に向く|适合安全关键项目', 'Design is checked before building.|Desain diperiksa sebelum dibangun.|作る前に、設計を検証する。|建造前先验证设计。'),
      I('eff', 'biz,pub', 'easy', 2, 'Simple to manage|Mudah dikelola|管理しやすい|易于管理', 'Stages follow in order.|Tahapan berurutan.|工程が、順番に進む。|阶段依次进行。')
    ], [
      I('risk', 'biz,pub', 'late', 3, 'Late discovery of problems|Masalah ditemukan terlambat|問題が後で発覚|问题发现太晚', 'Mistakes show up at the end.|Kesalahan baru terlihat di akhir.|ミスが、最後に判明する。|错误到最后才暴露。'),
      I('mkt', 'biz,retail', 'customer', 2, 'Customers see results late|Pelanggan melihat hasil terlambat|顧客が成果を見るのが遅い|客户见到成果晚', 'Needs may have changed by then.|Kebutuhan mungkin sudah berubah.|その頃には、ニーズが変わっているかもしれない。|届时需求可能已变。'),
      I('eff', 'biz,pub', 'stuck', 2, 'Rigid to change|Kaku terhadap perubahan|変更に弱い|难以变更', 'Altering scope is costly.|Mengubah cakupan itu mahal.|範囲の変更は、高くつく。|改变范围代价高。'),
      I('ppl', 'biz', 'distance', 2, 'Silos|Silo antar tim|部門の縦割り|部门孤岛', 'Teams hand work over a wall.|Tim melempar pekerjaan lewat tembok.|チーム間が、壁越しに作業を渡す。|团队隔墙交接工作。')
    ]),
    C('mvp', 'Minimum viable product|Produk minimum yang layak (MVP)|MVP（実用最小限の製品）|最小可行产品（MVP）', ['perfectionism'], [
      I('val', 'biz,retail,edu', 'save', 3, 'Low cost to test|Biaya uji rendah|検証コストが低い|测试成本低', 'You learn before spending heavily.|Anda belajar sebelum mengeluarkan banyak uang.|大きく投資する前に、学べる。|大投入前先学习。'),
      I('eff', 'biz,retail', 'fast', 3, 'Fast to market|Cepat ke pasar|市場投入が早い|上市快', 'Customers react to something real.|Pelanggan menanggapi sesuatu yang nyata.|実物に対する反応が得られる。|客户对真实产品做出反应。'),
      I('cap', 'biz,edu', 'learn', 2, 'Learns what customers want|Belajar apa yang diinginkan pelanggan|顧客ニーズの学習|了解客户所需', 'Real use beats guesses.|Pemakaian nyata mengalahkan tebakan.|実際の利用は、推測に勝る。|真实使用胜过猜测。'),
      I('val', 'biz,retail', 'safe', 2, 'Limits losses|Membatasi kerugian|損失を限定|限制损失', 'A failed idea costs little.|Ide yang gagal tidak mahal.|失敗しても、損失は小さい。|失败成本低。')
    ], [
      I('mkt', 'retail,biz', 'name', 3, 'Poor first impression|Kesan pertama buruk|第一印象が悪い|第一印象差', 'Rough products can disappoint early users.|Produk kasar bisa mengecewakan pengguna awal.|粗い製品は、初期ユーザーを失望させる。|粗糙产品令早期用户失望。'),
      I('risk', 'mfg,health', 'danger', 2, 'Unsuitable for safety|Tidak cocok untuk keselamatan|安全が重要な分野に不向き|不适合安全领域', 'Some products cannot be half-finished.|Sebagian produk tidak boleh setengah jadi.|中途半端では出せない製品もある。|有些产品不能半成品上市。'),
      I('mkt', 'retail,biz', 'copy', 2, 'Rivals copy it|Pesaing meniru|競合に真似される|对手抄袭', 'Early versions reveal your idea.|Versi awal membuka ide Anda.|初期版が、アイデアをさらす。|早期版暴露你的创意。'),
      I('risk', 'biz', 'wrong', 2, 'Misleading feedback|Umpan balik menyesatkan|誤解を招く反応|反馈误导', 'A weak MVP may kill a good idea.|MVP lemah bisa mematikan ide bagus.|出来の悪い試作が、良い案を潰すことがある。|差 MVP 可能扼杀好点子。')
    ]),
    C('perfectionism', 'Perfectionism|Perfeksionisme|完璧主義|完美主义', ['mvp'], [
      I('val', 'health,mfg,edu', 'quality', 3, 'High quality|Kualitas tinggi|高い品質|高质量', 'Fewer errors reach the customer.|Lebih sedikit kesalahan sampai ke pelanggan.|顧客に届くミスが少ない。|客户遇到的错误更少。'),
      I('mkt', 'retail,food', 'name', 2, 'Strong reputation|Reputasi kuat|評判の向上|声誉良好', 'Known for excellence.|Dikenal karena keunggulan.|卓越さで知られる。|以卓越闻名。'),
      I('ppl', 'health,mfg', 'proud', 2, 'Pride in work|Bangga pada pekerjaan|仕事への誇り|工作自豪感', 'Craftsmanship motivates people.|Keahlian memotivasi orang.|職人気質が、やる気を生む。|匠心激励人。'),
      I('cap', 'health,pub', 'safe', 2, 'Reliability|Keandalan|信頼性|可靠', 'Critical tasks are done carefully.|Tugas penting dikerjakan dengan cermat.|重要な作業を、慎重にこなす。|关键任务细致完成。')
    ], [
      I('eff', 'biz,edu', 'slow', 3, 'Slow progress|Kemajuan lambat|進みが遅い|进展缓慢', 'Nothing ships because it is never perfect.|Tidak ada yang terkirim karena tidak pernah sempurna.|完璧にならず、いつまでも出せない。|永不完美就永不上线。'),
      I('ppl', 'biz,edu', 'stress', 3, 'Stress and burnout|Stres dan kelelahan|ストレスと燃え尽き|压力与倦怠', 'Pressure to be flawless drains people.|Tekanan untuk sempurna menguras orang.|完璧を求める圧力が、人を消耗させる。|追求无瑕让人精疲力竭。'),
      I('cost', 'biz,mfg', 'expensive', 2, 'Cost beyond value|Biaya melebihi nilai|価値を超えるコスト|成本超过价值', 'The last 5% costs half the budget.|Lima persen terakhir menghabiskan separuh anggaran.|最後の5%に、予算の半分がかかる。|最后5%花掉一半预算。'),
      I('risk', 'biz,retail', 'lose', 2, 'Missed opportunities|Peluang terlewat|機会損失|错失机会', 'Rivals launch while you polish.|Pesaing meluncur saat Anda memoles.|磨いている間に、競合が先に出す。|你打磨时对手已上市。')
    ]),
    C('ab testing', 'A/B testing|Uji A/B|A/Bテスト|A/B测试', ['intuition'], [
      I('cap', 'retail,biz,edu', 'proof', 3, 'Evidence over opinion|Bukti mengalahkan opini|意見でなく根拠|证据胜过意见', 'Real behaviour settles arguments.|Perilaku nyata menyelesaikan perdebatan.|実際の行動が、議論に決着をつける。|真实行为终结争论。'),
      I('val', 'retail,biz', 'profit', 2, 'Small gains add up|Keuntungan kecil menumpuk|小さな改善の積み重ね|小幅提升累积', 'Each test improves conversion a bit.|Setiap uji menaikkan konversi sedikit.|テストのたびに、成果が少しずつ上がる。|每次测试略提转化。'),
      I('val', 'biz,retail', 'safe', 2, 'Low risk|Risiko rendah|低リスク|低风险', 'New ideas go to a small group first.|Ide baru dicoba ke kelompok kecil dulu.|新案は、まず少数に試せる。|新想法先小范围试。'),
      I('cap', 'biz,edu', 'learn', 2, 'Learning culture|Budaya belajar|学習する文化|学习文化', 'Teams get used to testing assumptions.|Tim terbiasa menguji asumsi.|仮説を検証する習慣がつく。|团队习惯验证假设。')
    ], [
      I('eff', 'biz,retail', 'slow', 3, 'Needs traffic and time|Butuh lalu lintas dan waktu|十分なアクセスと時間が必要|需要流量与时间', 'Small sites cannot get clear results.|Situs kecil tidak bisa mendapat hasil jelas.|小規模サイトでは、明確な結果が出にくい。|小站点难得明确结果。'),
      I('risk', 'biz,retail', 'narrow', 2, 'Optimises the small stuff|Mengoptimalkan hal kecil|細部の最適化に偏る|只优化细节', 'It rarely produces big breakthroughs.|Jarang menghasilkan terobosan besar.|大きな飛躍は生まれにくい。|很少带来重大突破。'),
      I('risk', 'retail,edu', 'bad', 2, 'Ethics of experiments|Etika eksperimen|実験の倫理|实验伦理', 'Users may not know they are test subjects.|Pengguna mungkin tidak tahu mereka subjek uji.|ユーザーが、実験対象と知らない場合がある。|用户可能不知自己是试验对象。'),
      I('risk', 'biz,retail', 'mistake', 2, 'Misread results|Salah baca hasil|結果の読み違い|误读结果', 'Chance and bias create false winners.|Kebetulan dan bias menciptakan pemenang palsu.|偶然や偏りで、誤った勝者が生まれる。|偶然与偏差制造假赢家。')
    ]),
    C('blockchain', 'Blockchain|Blockchain|ブロックチェーン|区块链', ['central database'], [
      I('cap', 'fin,pub,biz', 'trust', 3, 'Tamper-resistant records|Catatan sulit dipalsukan|改ざん耐性のある記録|防篡改记录', 'Past entries cannot easily be changed.|Catatan lama sulit diubah.|過去の記録を、簡単には変えられない。|历史记录难以篡改。'),
      I('cap', 'fin,biz', 'share', 2, 'Shared truth without a middleman|Kebenaran bersama tanpa perantara|仲介なしの共通認識|无需中介的共同真相', 'Parties trust the ledger, not each other.|Pihak-pihak memercayai buku besar, bukan satu sama lain.|相手でなく、台帳を信頼できる。|各方信任账本而非彼此。'),
      I('val', 'fin,biz', 'save', 2, 'Lower transaction costs|Biaya transaksi lebih rendah|取引コスト削減|降低交易成本', 'Fewer intermediaries to pay.|Lebih sedikit perantara yang dibayar.|仲介者への支払いが減る。|少付中介费。'),
      I('cap', 'food,mfg,pub', 'find', 2, 'Traceability|Keterlacakan|トレーサビリティ|可追溯', 'Follow goods from source to shelf.|Lacak barang dari sumber hingga rak.|産地から店頭まで、追跡できる。|可追踪货物从源头到货架。')
    ], [
      I('cost', 'fin,biz', 'expensive', 3, 'Energy and cost|Energi dan biaya|エネルギーとコスト|能耗与成本', 'Some systems use huge computing power.|Sebagian sistem memakai daya komputasi sangat besar.|大量の計算資源を使う仕組みもある。|部分系统耗算力巨大。'),
      I('eff', 'fin,biz', 'slow', 2, 'Slow and limited capacity|Lambat dan kapasitas terbatas|処理が遅く容量に限りがある|慢且容量有限', 'Fewer transactions per second than normal systems.|Transaksi per detik lebih sedikit daripada sistem biasa.|通常システムより、処理件数が少ない。|每秒交易少于常规系统。'),
      I('risk', 'fin,pub', 'law', 2, 'Unclear regulation|Regulasi belum jelas|規制が不明確|监管不明', 'Rules vary and may change.|Aturan bervariasi dan bisa berubah.|規制は国ごとに違い、変わりうる。|规则各异且可能变化。'),
      I('risk', 'fin,biz', 'cheat', 2, 'Hype and scams|Hype dan penipuan|過熱と詐欺|炒作与骗局', 'Many projects are speculative or fraudulent.|Banyak proyek bersifat spekulatif atau penipuan.|投機的・詐欺的な案件も多い。|许多项目投机或欺诈。')
    ]),
    C('central database', 'Central database|Basis data terpusat|中央集権型データベース|集中式数据库', ['blockchain'], [
      I('eff', 'biz,pub,fin', 'fast', 3, 'Fast and efficient|Cepat dan efisien|高速で効率的|快速高效', 'Mature technology handles large loads.|Teknologi matang menangani beban besar.|成熟した技術で、大量処理ができる。|成熟技术可应对大负载。'),
      I('cap', 'biz,pub', 'control', 2, 'Clear control|Kendali jelas|管理者が明確|控制明确', 'One owner decides and corrects.|Satu pemilik memutuskan dan memperbaiki.|1つの管理者が、決定も修正もできる。|单一所有者决定与更正。'),
      I('val', 'biz,pub', 'cheap', 2, 'Low cost|Biaya rendah|低コスト|低成本', 'Well-known tools and skills.|Alat dan keterampilan sudah umum.|ツールも人材も、手に入りやすい。|工具与技能常见。'),
      I('cap', 'biz,pub', 'easy', 2, 'Easy to fix errors|Mudah memperbaiki kesalahan|誤りを直しやすい|易纠错', 'Records can be corrected.|Catatan bisa dikoreksi.|記録を、訂正できる。|记录可被更正。')
    ], [
      I('risk', 'biz,fin,health', 'danger', 3, 'Single point of failure|Titik kegagalan tunggal|単一障害点|单点故障', 'If it is hacked or fails, everything is lost.|Jika diretas atau gagal, semuanya hilang.|ハッキングや障害で、すべてを失う。|被黑或故障则全盘受损。'),
      I('risk', 'pub,biz', 'trust', 2, 'Must trust the owner|Harus memercayai pemilik|管理者を信頼する必要|必须信任所有者', 'The owner can edit or delete records.|Pemilik dapat mengedit atau menghapus catatan.|管理者が、記録を書き換えられる。|所有者可编辑或删除记录。'),
      I('risk', 'pub,biz', 'cheat', 2, 'Insider abuse|Penyalahgunaan orang dalam|内部不正|内部滥用', 'Staff with access can misuse data.|Staf dengan akses dapat menyalahgunakan data.|権限を持つ社員が、悪用しうる。|有权限的员工可能滥用。'),
      I('cap', 'pub,biz', 'share', 2, 'Hard to share across firms|Sulit dibagi antar perusahaan|企業間共有が難しい|跨公司共享难', 'Nobody wants a rival to own the data.|Tak ada yang mau pesaing memiliki datanya.|競合にデータを預けたくない。|没人愿让对手掌握数据。')
    ]),
    C('internet of things', 'Internet of Things (IoT)|Internet of Things (IoT)|IoT（モノのインターネット）|物联网（IoT）', ['privacy'], [
      I('eff', 'mfg,farm,pub', 'data', 3, 'Real-time monitoring|Pemantauan waktu nyata|リアルタイム監視|实时监控', 'Sensors report conditions continuously.|Sensor melaporkan kondisi terus-menerus.|センサーが、状況を常に知らせる。|传感器持续报告状态。'),
      I('val', 'mfg,farm', 'save', 2, 'Predictive maintenance|Perawatan prediktif|予知保全|预测性维护', 'Faults are caught before breakdowns.|Kerusakan terdeteksi sebelum macet.|故障の前に、異常を見つけられる。|在故障前发现异常。'),
      I('val', 'farm,food,pub', 'waste', 2, 'Saves resources|Menghemat sumber daya|資源の節約|节约资源', 'Water, power and materials are used precisely.|Air, listrik, dan bahan dipakai dengan tepat.|水・電力・資材を、無駄なく使える。|精准使用水电材料。'),
      I('mkt', 'retail,health', 'new', 2, 'New services|Layanan baru|新サービス|新服务', 'Connected products enable subscriptions.|Produk terhubung memungkinkan langganan.|接続された製品が、新サービスを生む。|联网产品催生订阅服务。')
    ], [
      I('risk', 'mfg,fam,health', 'danger', 3, 'Security weaknesses|Kelemahan keamanan|セキュリティの弱さ|安全薄弱', 'Cheap devices are easy to hack.|Perangkat murah mudah diretas.|安価な機器は、ハッキングされやすい。|廉价设备易被入侵。'),
      I('risk', 'fam,retail,health', 'secret', 3, 'Surveillance and privacy|Pengawasan dan privasi|監視とプライバシー|监控与隐私', 'Devices collect data about people.|Perangkat mengumpulkan data tentang orang.|機器が、人の情報を集める。|设备收集个人数据。'),
      I('cost', 'mfg,farm', 'expensive', 2, 'Upfront cost|Biaya awal|導入費用|前期成本', 'Sensors, networks and software add up.|Sensor, jaringan, dan perangkat lunak menambah biaya.|センサー・通信・ソフトの費用がかさむ。|传感器、网络与软件累积成本。'),
      I('eff', 'mfg,farm', 'complex', 2, 'Complex to manage|Rumit dikelola|管理が複雑|管理复杂', 'Thousands of devices need updates.|Ribuan perangkat butuh pembaruan.|何千台もの機器の更新が必要になる。|数千设备需更新。')
    ]),
    C('robotics', 'Robots in production|Robot dalam produksi|生産ロボット|生产机器人', ['labour intensive'], [
      I('eff', 'mfg,food', 'fast', 3, 'Speed and precision|Kecepatan dan presisi|速度と精度|速度与精度', 'Robots repeat tasks without tiring.|Robot mengulang tugas tanpa lelah.|ロボットは、疲れずに繰り返せる。|机器人不知疲倦地重复。'),
      I('ppl', 'mfg,health', 'safe', 2, 'Removes dangerous tasks|Menghilangkan tugas berbahaya|危険作業の代替|取代危险工作', 'Humans avoid hazardous work.|Manusia terhindar dari pekerjaan berbahaya.|人が危険な作業から解放される。|人类免于危险工作。'),
      I('val', 'mfg', 'quality', 2, 'Consistent quality|Kualitas konsisten|品質の均一化|质量稳定', 'Every unit matches the spec.|Setiap unit sesuai spesifikasi.|どの製品も、仕様どおりに仕上がる。|每件都符合规格。'),
      I('val', 'mfg', 'long', 2, 'Works around the clock|Bekerja sepanjang waktu|24時間稼働|全天候工作', 'Output rises without extra shifts.|Produksi naik tanpa tambahan shift.|シフトを増やさず、生産量を増やせる。|不加班次也能增产。')
    ], [
      I('cost', 'mfg,food', 'expensive', 3, 'High capital cost|Biaya modal tinggi|設備投資が大きい|资本成本高', 'Robots and integration are costly.|Robot dan integrasinya mahal.|ロボットと導入作業は高額。|机器人与集成昂贵。'),
      I('ppl', 'mfg', 'job', 3, 'Displaces workers|Menggeser pekerja|雇用の置き換え|取代工人', 'Jobs are lost or changed.|Pekerjaan hilang atau berubah.|仕事が失われる、または変わる。|岗位消失或改变。'),
      I('risk', 'mfg,food', 'stuck', 2, 'Poor at variation|Buruk menghadapi variasi|変化に弱い|难应对变化', 'Unusual items confuse them.|Barang tidak biasa membingungkan mereka.|イレギュラーな物に対応しにくい。|异常物品让它们困惑。'),
      I('risk', 'mfg', 'stop', 2, 'Downtime risk|Risiko henti|停止リスク|停机风险', 'A fault stops a whole line.|Satu gangguan menghentikan seluruh lini.|1つの不具合で、ライン全体が止まる。|一处故障停整条线。')
    ]),
    C('data-driven decisions', 'Data-driven decision making|Pengambilan keputusan berbasis data|データ駆動の意思決定|数据驱动决策', ['intuition'], [
      I('cap', 'biz,pub,health', 'proof', 3, 'Objective evidence|Bukti objektif|客観的な根拠|客观证据', 'Debates are settled with facts.|Perdebatan diselesaikan dengan fakta.|議論を、事実で決着させる。|用事实结束争论。'),
      I('val', 'biz,retail', 'save', 2, 'Fewer costly mistakes|Lebih sedikit kesalahan mahal|高くつく失敗を減らす|减少代价高的失误', 'Bad bets are avoided early.|Taruhan buruk dihindari sejak awal.|失敗しそうな賭けを、早く避けられる。|早期避开坏押注。'),
      I('cap', 'biz,pub', 'trust', 2, 'Transparent and defensible|Transparan dan dapat dipertanggungjawabkan|透明で説明できる|透明且可辩护', 'Others can check your reasoning.|Orang lain dapat memeriksa penalaran Anda.|他の人が、判断の根拠を検証できる。|他人可核查你的推理。'),
      I('cap', 'biz,retail', 'learn', 2, 'Continuous improvement|Perbaikan berkelanjutan|継続的な改善|持续改进', 'Results feed the next decision.|Hasil mengisi keputusan berikutnya.|結果が、次の判断に活きる。|结果反哺下次决策。')
    ], [
      I('eff', 'biz,pub', 'slow', 3, 'Analysis paralysis|Kelumpuhan analisis|分析麻痺|分析瘫痪', 'Waiting for more data delays action.|Menunggu lebih banyak data menunda tindakan.|データを待つうちに、行動が遅れる。|等更多数据而拖延行动。'),
      I('risk', 'biz,retail', 'mistake', 2, 'Bad data, bad decisions|Data buruk, keputusan buruk|悪いデータは悪い判断を生む|数据差决策差', 'Poor quality data misleads.|Data berkualitas rendah menyesatkan.|質の低いデータは、判断を誤らせる。|低质数据会误导。'),
      I('risk', 'biz,retail', 'narrow', 2, 'Misses what cannot be measured|Melewatkan yang tak terukur|測れないものを見落とす|忽略不可量化因素', 'Culture and creativity do not fit a spreadsheet.|Budaya dan kreativitas tidak muat di lembar kerja.|文化や創造性は、数値に表れにくい。|文化与创意难入表格。'),
      I('cost', 'biz,pub', 'expensive', 2, 'Tools and skills cost money|Alat dan keterampilan butuh biaya|ツールと人材のコスト|工具与技能需成本', 'Analysts and systems are expensive.|Analis dan sistem itu mahal.|分析担当やシステムは、高額。|分析师与系统昂贵。')
    ]),
    C('erp system', 'ERP system|Sistem ERP|ERPシステム|ERP系统', ['spreadsheets'], [
      I('eff', 'mfg,retail,biz', 'clear', 3, 'One source of truth|Satu sumber kebenaran|情報の一元化|单一数据源', 'Every department sees the same data.|Setiap departemen melihat data yang sama.|全部署が、同じデータを見られる。|各部门看同一数据。'),
      I('val', 'mfg,retail', 'save', 2, 'Less duplicated work|Pekerjaan ganda berkurang|二重入力の削減|减少重复工作', 'Data is entered once.|Data dimasukkan sekali.|データ入力は、1回で済む。|数据只录一次。'),
      I('cap', 'mfg,retail,pub', 'control', 2, 'Better planning and control|Perencanaan dan kendali lebih baik|計画と統制の強化|计划与管控更好', 'Stock, orders and finance link up.|Stok, pesanan, dan keuangan terhubung.|在庫・受注・会計が連動する。|库存、订单与财务联动。'),
      I('cap', 'fin,pub', 'law', 2, 'Easier audits and reports|Audit dan laporan lebih mudah|監査・報告が容易|审计报告更易', 'Records are complete and traceable.|Catatan lengkap dan dapat dilacak.|記録が揃い、追跡できる。|记录完整可追溯。')
    ], [
      I('cost', 'biz,mfg', 'expensive', 3, 'Very costly|Sangat mahal|非常に高額|非常昂贵', 'Licences, customising and consultants.|Lisensi, kustomisasi, dan konsultan.|ライセンス・カスタマイズ・コンサルの費用。|授权、定制与顾问费。'),
      I('risk', 'biz,mfg', 'fail', 3, 'Implementation failures|Kegagalan implementasi|導入の失敗|实施失败', 'Many projects run late and over budget.|Banyak proyek terlambat dan melebihi anggaran.|多くが、遅延と予算超過に陥る。|很多项目延期超支。'),
      I('ppl', 'biz,mfg', 'fear', 2, 'Staff resistance|Penolakan staf|現場の抵抗|员工抵触', 'People dislike changing familiar routines.|Orang tidak suka mengubah rutinitas yang akrab.|慣れた業務を変えたくない。|人们不愿改变熟悉流程。'),
      I('eff', 'biz,mfg', 'stuck', 2, 'Rigid processes|Proses kaku|業務が硬直化|流程僵化', 'The system forces one way of working.|Sistem memaksa satu cara kerja.|システムが、1つのやり方を強いる。|系统强制一种工作方式。')
    ]),
    C('spreadsheets', 'Spreadsheets for everything|Lembar kerja untuk semua hal|表計算で何でも管理|表格管所有事', ['erp system'], [
      I('val', 'retail,fam,edu', 'cheap', 3, 'Cheap and familiar|Murah dan dikenal|安くて慣れている|便宜又熟悉', 'Nearly everyone can use them.|Hampir semua orang bisa memakainya.|ほぼ誰でも使える。|几乎人人会用。'),
      I('cap', 'retail,biz', 'flexible', 2, 'Very flexible|Sangat fleksibel|非常に柔軟|非常灵活', 'Layouts and formulas change instantly.|Tata letak dan rumus berubah seketika.|レイアウトも数式も、すぐ変えられる。|布局与公式瞬间可改。'),
      I('eff', 'retail,fam', 'fast', 2, 'Quick to start|Cepat dimulai|すぐ始められる|上手快', 'No setup or procurement.|Tanpa persiapan atau pengadaan.|導入や手配が要らない。|无需部署或采购。'),
      I('cap', 'edu,biz', 'teach', 2, 'Easy to learn from|Mudah dipelajari|学びやすい|易学', 'Staff understand the logic they build.|Staf memahami logika yang mereka bangun.|自分で作るので、仕組みが理解できる。|员工理解自己搭建的逻辑。')
    ], [
      I('risk', 'biz,fin', 'mistake', 3, 'Errors go unnoticed|Kesalahan tak terdeteksi|ミスに気づきにくい|错误难发现', 'One bad formula can cost millions.|Satu rumus salah bisa merugikan jutaan.|1つの式のミスが、大損害を生むことがある。|一个错误公式损失巨大。'),
      I('eff', 'biz,mfg', 'hard', 2, 'Does not scale|Tidak mudah diskalakan|拡大に不向き|难以扩展', 'Many files, many versions, no single truth.|Banyak berkas, banyak versi, tanpa satu kebenaran.|ファイルと版が乱立し、正しい情報が分からない。|文件版本泛滥，无统一真相。'),
      I('risk', 'biz,fin', 'secret', 2, 'Weak security and control|Keamanan dan kendali lemah|セキュリティと統制が弱い|安全与管控弱', 'Files are copied and emailed around.|Berkas disalin dan dikirim lewat email.|ファイルが、コピーされメールで出回る。|文件被复制并邮件满天飞。'),
      I('ppl', 'biz', 'depend', 2, 'Depends on one person|Bergantung pada satu orang|属人化|依赖某个人', 'Only the creator understands the file.|Hanya pembuatnya yang memahami berkas itu.|作った本人しか分からない。|只有作者看得懂。')
    ])
  );
})();
