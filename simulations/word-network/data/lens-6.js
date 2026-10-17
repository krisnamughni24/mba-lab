/* Word Network: curated concepts, batch 6 (people and organisation). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('remote work', 'Remote work|Kerja jarak jauh|リモートワーク|远程办公', ['office work'], [
      I('ppl', 'biz,edu,fam', 'free', 3, 'Flexibility|Fleksibilitas|柔軟な働き方|灵活', 'Staff manage their own time and place.|Staf mengatur waktu dan tempatnya sendiri.|社員が、時間と場所を自分で決められる。|员工自主安排时间与地点。'),
      I('val', 'biz', 'save', 2, 'Lower office costs|Biaya kantor lebih rendah|オフィス費用の削減|办公成本降低', 'Less rent, power and space.|Lebih sedikit sewa, listrik, dan ruang.|家賃・光熱費・スペースが減る。|房租、水电与空间减少。'),
      I('cap', 'biz', 'skill', 2, 'Wider talent pool|Talenta lebih luas|採用の選択肢が広がる|人才库更广', 'You can hire from anywhere.|Anda bisa merekrut dari mana saja.|どこからでも採用できる。|可从任何地方招人。'),
      I('eff', 'biz,edu', 'focus', 2, 'Fewer interruptions|Gangguan lebih sedikit|中断が少ない|干扰更少', 'Deep work is easier at home.|Bekerja fokus lebih mudah di rumah.|自宅のほうが、集中しやすい。|在家更易深度工作。')
    ], [
      I('ppl', 'biz,edu', 'alone', 3, 'Loneliness|Kesepian|孤独|孤独感', 'Staff miss casual contact.|Staf kehilangan interaksi santai.|何気ない会話がなくなる。|员工缺少随意交流。'),
      I('eff', 'biz', 'hard', 3, 'Harder teamwork|Kerja tim lebih sulit|連携が難しい|协作更难', 'Quick questions turn into long messages.|Pertanyaan cepat menjadi pesan panjang.|ちょっとした確認が、長いやり取りになる。|简单问题变成冗长消息。'),
      I('risk', 'biz', 'lose', 2, 'Weaker culture|Budaya melemah|文化が薄れる|文化淡化', 'Shared habits and values fade.|Kebiasaan dan nilai bersama memudar.|共通の習慣や価値観が弱まる。|共同习惯与价值观淡化。'),
      I('risk', 'biz,health', 'secret', 2, 'Security risks|Risiko keamanan|情報セキュリティ|安全风险', 'Data leaves the protected office.|Data keluar dari kantor yang terlindungi.|情報が、守られたオフィスの外に出る。|数据离开受保护的办公室。')
    ]),
    C('office work', 'Working in the office|Bekerja di kantor|オフィス勤務|办公室办公', ['remote work'], [
      I('eff', 'biz,pub', 'team', 3, 'Easy collaboration|Kolaborasi mudah|連携しやすい|协作方便', 'Questions are answered in seconds.|Pertanyaan terjawab dalam hitungan detik.|質問に、すぐ答えが返ってくる。|问题几秒即可得到答复。'),
      I('ppl', 'biz,edu', 'friend', 2, 'Social bonds|Ikatan sosial|人間関係|社交纽带', 'Colleagues become friends.|Rekan kerja menjadi teman.|同僚が、友人になる。|同事成为朋友。'),
      I('cap', 'biz', 'culture', 2, 'Strong culture|Budaya kuat|組織文化の醸成|文化稳固', 'Newcomers learn by watching.|Orang baru belajar dengan mengamati.|新人が、見て学べる。|新人通过观察学习。'),
      I('eff', 'biz,pub', 'control', 2, 'Easier supervision|Pengawasan lebih mudah|管理がしやすい|便于监督', 'Managers see work as it happens.|Manajer melihat pekerjaan saat berlangsung.|仕事の様子が、リアルタイムで見える。|管理者可实时看到工作。')
    ], [
      I('cost', 'biz', 'expensive', 3, 'Office costs|Biaya kantor|オフィスコスト|办公成本', 'Rent and utilities are big expenses.|Sewa dan utilitas adalah pengeluaran besar.|家賃と光熱費が、大きな負担になる。|房租与水电开销大。'),
      I('eff', 'biz', 'time', 3, 'Commuting|Perjalanan pergi-pulang|通勤|通勤', 'Hours are lost in traffic.|Berjam-jam hilang di jalan.|通勤で、何時間も失われる。|数小时耗在路上。'),
      I('eff', 'biz', 'noise', 2, 'Interruptions|Gangguan|中断・騒音|被打断', 'Open offices break concentration.|Kantor terbuka mengganggu konsentrasi.|オープンオフィスでは、集中が途切れる。|开放办公室打断专注。'),
      I('ppl', 'biz', 'stuck', 2, 'Less flexibility|Kurang fleksibel|柔軟性に欠ける|不够灵活', 'Fixed hours clash with family needs.|Jam tetap berbenturan dengan kebutuhan keluarga.|固定時間が、家庭の事情とぶつかる。|固定时间与家庭需求冲突。')
    ]),
    C('four day week', 'Four-day work week|Pekan kerja empat hari|週4日勤務|四天工作制', ['overtime'], [
      I('ppl', 'biz,edu,health', 'happy', 3, 'Better wellbeing|Kesejahteraan lebih baik|ウェルビーイングの向上|福祉更好', 'Longer weekends reduce stress.|Akhir pekan lebih panjang mengurangi stres.|長い週末が、ストレスを減らす。|长周末减轻压力。'),
      I('cap', 'biz', 'skill', 2, 'Attracts talent|Menarik talenta|人材の獲得|吸引人才', 'It is a strong perk.|Ini adalah keuntungan yang kuat.|強力な魅力になる。|是强有力的福利。'),
      I('eff', 'biz', 'focus', 2, 'More focus|Lebih fokus|集中力の向上|更专注', 'People waste less time at work.|Orang membuang lebih sedikit waktu di kerja.|ムダな時間が減る。|减少无谓耗时。'),
      I('val', 'biz,health', 'save', 2, 'Less absence|Absensi lebih rendah|欠勤の減少|缺勤减少', 'Staff rest better and get sick less.|Staf beristirahat lebih baik dan jarang sakit.|よく休めて、病欠が減る。|休息好，生病少。')
    ], [
      I('risk', 'retail,health,pub', 'lose', 3, 'Coverage gaps|Celah layanan|対応の空白|服务空档', 'Customers need service on the fifth day.|Pelanggan butuh layanan di hari kelima.|5日目にも、顧客はサービスを求める。|客户第五天也需要服务。'),
      I('ppl', 'biz,health', 'stress', 2, 'Intense workdays|Hari kerja padat|1日が過密に|工作日过密', 'Same work in fewer hours means more pressure.|Pekerjaan sama dalam jam lebih sedikit berarti tekanan lebih besar.|同じ仕事を短時間でこなすので、負荷が高まる。|同样工作更短时间压力更大。'),
      I('cost', 'mfg,retail', 'money', 2, 'Cost of extra staff|Biaya staf tambahan|増員コスト|增员成本', 'Some firms must hire more.|Sebagian perusahaan harus merekrut lebih banyak.|企業によっては、人員を増やす必要がある。|有些公司必须多招人。'),
      I('ppl', 'biz,pub', 'fair', 2, 'Not for every job|Tidak untuk semua pekerjaan|全職種には向かない|并非适用于所有岗位', 'Some roles cannot shrink their hours.|Sebagian peran tidak bisa mengurangi jam.|職種によっては、時間を減らせない。|有些岗位无法缩短工时。')
    ]),
    C('overtime', 'Overtime|Lembur|残業|加班', ['four day week'], [
      I('eff', 'mfg,retail,food', 'fast', 3, 'Meets deadlines|Memenuhi tenggat|納期を守れる|按期交付', 'Peaks are handled without hiring.|Puncak beban ditangani tanpa merekrut.|繁忙期を、採用なしで乗り切れる。|无需招人即可应对高峰。'),
      I('ppl', 'mfg,retail,fam', 'money', 2, 'Extra income|Pendapatan tambahan|収入が増える|额外收入', 'Staff earn more per hour.|Staf mendapat lebih banyak per jam.|時間あたりの収入が増える。|每小时收入更高。'),
      I('val', 'mfg,retail', 'save', 2, 'Cheaper than hiring|Lebih murah daripada merekrut|採用より安い|比招聘便宜', 'No recruitment or training costs.|Tanpa biaya rekrutmen atau pelatihan.|採用・研修費がかからない。|无招聘与培训成本。'),
      I('cap', 'biz,mfg', 'flexible', 2, 'Flexible capacity|Kapasitas fleksibel|柔軟な稼働力|产能弹性', 'You can expand and shrink hours quickly.|Anda dapat menambah atau mengurangi jam dengan cepat.|稼働時間を素早く増減できる。|可快速增减工时。')
    ], [
      I('ppl', 'mfg,retail,health', 'tired', 3, 'Fatigue|Kelelahan|疲労|疲劳', 'Tired people make mistakes and get sick.|Orang lelah membuat kesalahan dan jatuh sakit.|疲れた人は、ミスをし、体調を崩す。|疲惫者易出错、易生病。'),
      I('cost', 'mfg,retail', 'expensive', 2, 'Premium pay|Upah lembur lebih tinggi|割増賃金|加班费溢价', 'Overtime rates cost more per hour.|Tarif lembur lebih mahal per jam.|時間外手当は、時給より高い。|加班费率每小时更贵。'),
      I('ppl', 'biz,fam', 'conflict', 2, 'Family and life strain|Beban keluarga dan hidup|私生活への負担|家庭与生活受影响', 'Long hours cut into personal time.|Jam panjang menggerus waktu pribadi.|長時間労働が、私生活を削る。|长工时侵占个人时间。'),
      I('risk', 'mfg,pub', 'law', 2, 'Legal limits|Batas hukum|法的な上限|法定限制', 'Rules cap hours and require pay.|Aturan membatasi jam dan mewajibkan upah.|法律が、上限と支払いを定めている。|法规限制工时并要求付酬。')
    ]),
    C('flat structure', 'Flat organisation|Organisasi datar|フラット組織|扁平组织', ['hierarchy'], [
      I('eff', 'biz,edu', 'fast', 3, 'Fast decisions|Keputusan cepat|意思決定が速い|决策快', 'Fewer layers to approve.|Lebih sedikit lapisan persetujuan.|承認の階層が少ない。|审批层级少。'),
      I('ppl', 'biz,edu', 'free', 2, 'Empowered staff|Staf berdaya|従業員の裁量|员工被赋权', 'People take responsibility.|Orang mengambil tanggung jawab.|社員が、責任を持って動く。|员工主动担责。'),
      I('cap', 'biz', 'talk', 2, 'Open communication|Komunikasi terbuka|オープンな対話|沟通开放', 'Ideas flow up and down easily.|Gagasan mengalir ke atas dan ke bawah dengan mudah.|アイデアが上下に流れやすい。|想法上下流通顺畅。'),
      I('val', 'biz', 'save', 2, 'Lower management cost|Biaya manajemen lebih rendah|管理コストが低い|管理成本低', 'Fewer managers to pay.|Lebih sedikit manajer yang digaji.|管理職の人件費が少ない。|管理者少，薪资少。')
    ], [
      I('eff', 'biz,mfg', 'confuse', 3, 'Unclear roles|Peran tidak jelas|役割が曖昧|角色不清', 'Nobody knows who decides.|Tidak ada yang tahu siapa memutuskan.|誰が決めるのか、分からない。|不知谁说了算。'),
      I('ppl', 'biz,mfg', 'stress', 2, 'Overloaded managers|Manajer kewalahan|管理者の過負荷|管理者不堪重负', 'Wide spans of control stretch leaders.|Rentang kendali luas membebani pemimpin.|部下が多すぎて、リーダーが手一杯になる。|管理幅度过大使领导吃力。'),
      I('risk', 'biz,mfg', 'lose', 2, 'Hard to scale|Sulit diperbesar|規模拡大に不向き|难以扩张', 'Informal systems break as firms grow.|Sistem informal runtuh saat perusahaan tumbuh.|会社が大きくなると、非公式な仕組みは破綻する。|公司变大后非正式体系崩溃。'),
      I('ppl', 'biz,pub', 'stuck', 2, 'Few promotions|Sedikit kenaikan jabatan|昇進の機会が少ない|晋升机会少', 'There are few steps to climb.|Hanya sedikit jenjang untuk didaki.|昇れる段が少ない。|可攀升台阶少。')
    ]),
    C('hierarchy', 'Hierarchy|Hierarki|階層型組織|层级制', ['flat structure'], [
      I('eff', 'biz,pub,mfg', 'clear', 3, 'Clear authority|Wewenang jelas|権限が明確|权责清晰', 'Everyone knows who decides what.|Semua orang tahu siapa memutuskan apa.|誰が何を決めるか、はっきりしている。|人人知道谁决定什么。'),
      I('ppl', 'biz,pub', 'goal', 2, 'Career path|Jenjang karier|キャリアパス|职业路径', 'Promotion offers motivation.|Kenaikan jabatan memberi motivasi.|昇進が、やる気につながる。|晋升带来动力。'),
      I('cap', 'mfg,pub', 'control', 2, 'Control at scale|Kendali pada skala besar|大規模でも統制できる|大规模下可控', 'Works for big organisations.|Berfungsi untuk organisasi besar.|大きな組織でも機能する。|适用于大型组织。'),
      I('cap', 'pub,health', 'safe', 2, 'Accountability|Akuntabilitas|説明責任|问责明确', 'Mistakes can be traced to owners.|Kesalahan dapat dilacak ke penanggung jawab.|ミスの責任の所在が分かる。|错误可追溯到责任人。')
    ], [
      I('eff', 'biz,pub', 'slow', 3, 'Slow decisions|Keputusan lambat|意思決定が遅い|决策慢', 'Each layer adds delay.|Setiap lapisan menambah penundaan.|階層が増えるほど、遅れる。|每增一层就多一分延迟。'),
      I('ppl', 'biz,pub', 'fear', 2, 'Silence from below|Bawahan diam|下から声が上がらない|基层不敢发声', 'Staff fear telling bosses bad news.|Staf takut menyampaikan kabar buruk kepada atasan.|悪い知らせを、上司に伝えにくい。|员工怕向上司报坏消息。'),
      I('cost', 'biz,pub', 'expensive', 2, 'High management costs|Biaya manajemen tinggi|管理コストが高い|管理成本高', 'Many layers of managers to pay.|Banyak lapisan manajer untuk digaji.|管理職が多く、人件費がかさむ。|管理层多，薪资高。'),
      I('risk', 'biz,mfg', 'stuck', 2, 'Rigidity|Kekakuan|硬直化|僵化', 'Slow to adapt to change.|Lambat beradaptasi dengan perubahan.|変化への対応が遅い。|应变迟缓。')
    ]),
    C('delegation', 'Delegation|Pendelegasian|権限委譲|授权', ['micromanagement'], [
      I('eff', 'biz,pub', 'time', 3, 'Frees managers|Membebaskan manajer|管理者の時間を確保|解放管理者', 'Leaders focus on bigger issues.|Pemimpin fokus pada isu lebih besar.|リーダーが、より大きな課題に集中できる。|领导可聚焦更大问题。'),
      I('ppl', 'biz,edu', 'skill', 3, 'Develops people|Mengembangkan orang|人材育成|培养人才', 'Staff grow by taking on tasks.|Staf berkembang dengan mengambil tugas.|任されることで、人が育つ。|员工在承担中成长。'),
      I('eff', 'biz', 'fast', 2, 'Faster action|Bertindak lebih cepat|行動が速い|行动更快', 'Decisions are made where the work is.|Keputusan dibuat di tempat pekerjaan berlangsung.|現場で判断できる。|在工作现场决策。'),
      I('ppl', 'biz', 'trust', 2, 'Builds trust|Membangun kepercayaan|信頼の醸成|建立信任', 'Trusted staff feel respected.|Staf yang dipercaya merasa dihargai.|任された人は、尊重されていると感じる。|被信任的人感到被尊重。')
    ], [
      I('risk', 'biz,health', 'mistake', 3, 'Mistakes by juniors|Kesalahan oleh junior|未熟な担当者のミス|新手犯错', 'Tasks may be done wrongly.|Tugas mungkin dikerjakan dengan salah.|仕事が間違って進むことがある。|任务可能做错。'),
      I('risk', 'biz,pub', 'lose', 2, 'Loss of control|Kehilangan kendali|統制力の低下|失去掌控', 'Managers worry about what they cannot see.|Manajer cemas tentang hal yang tidak terlihat.|見えない部分が、管理者の不安になる。|管理者担心看不到的事。'),
      I('ppl', 'biz', 'conflict', 2, 'Unclear accountability|Akuntabilitas kabur|責任があいまい|问责模糊', 'Who is responsible if it fails?|Siapa bertanggung jawab jika gagal?|失敗したら、誰の責任か。|失败了谁负责？'),
      I('eff', 'biz', 'time', 2, 'Takes time to train|Butuh waktu melatih|教える時間がかかる|培训需要时间', 'Explaining can feel slower than doing.|Menjelaskan terasa lebih lambat daripada mengerjakan sendiri.|教えるより自分でやるほうが早い気がする。|讲解感觉比自己做慢。')
    ]),
    C('micromanagement', 'Micromanagement|Mikromanajemen|マイクロマネジメント|微观管理', ['delegation'], [
      I('val', 'biz,health,mfg', 'quality', 3, 'Tight quality control|Kendali kualitas ketat|品質の厳格な管理|严格质量控制', 'Details are checked closely.|Detail diperiksa dengan cermat.|細部まで厳しくチェックされる。|细节被严密检查。'),
      I('cap', 'biz', 'new', 2, 'Good for beginners|Baik untuk pemula|新人に有効|对新人有益', 'Newcomers get close guidance.|Orang baru mendapat bimbingan dekat.|新人は、細かな指導を受けられる。|新人得到细致指导。'),
      I('cap', 'health,mfg', 'safe', 2, 'Useful in a crisis|Berguna saat krisis|危機時に有効|危机时有用', 'Close control helps when errors are costly.|Kendali ketat membantu saat kesalahan mahal.|ミスの代償が大きいとき、細かな管理が役立つ。|错误代价高时严控有用。'),
      I('eff', 'biz', 'clear', 2, 'Clear expectations|Ekspektasi jelas|期待が明確|期望清晰', 'Staff know exactly what is wanted.|Staf tahu persis apa yang diinginkan.|何を求められているかが、はっきりしている。|员工清楚要求。')
    ], [
      I('ppl', 'biz,edu', 'fear', 3, 'Kills motivation|Mematikan motivasi|やる気を奪う|扼杀动力', 'People feel distrusted.|Orang merasa tidak dipercaya.|信頼されていないと感じる。|人们觉得不被信任。'),
      I('ppl', 'biz', 'leave', 3, 'Staff leave|Staf pergi|離職を招く|员工离职', 'Good people quit controlling bosses.|Orang berbakat berhenti dari atasan yang mengekang.|優秀な人は、細かすぎる上司の下を去る。|优秀者离开控制欲强的上司。'),
      I('eff', 'biz', 'time', 2, 'Wastes manager time|Membuang waktu manajer|管理者の時間の浪費|浪费管理者时间', 'Leaders cannot do strategic work.|Pemimpin tidak sempat melakukan pekerjaan strategis.|リーダーが、戦略的な仕事に手が回らない。|领导无暇做战略工作。'),
      I('risk', 'biz,edu', 'stuck', 2, 'No initiative|Tanpa inisiatif|自発性の欠如|缺乏主动', 'Staff wait for instructions.|Staf menunggu instruksi.|社員が、指示待ちになる。|员工等待指令。')
    ]),
    C('empowerment', 'Employee empowerment|Pemberdayaan karyawan|社員のエンパワーメント|员工赋权', ['hierarchy'], [
      I('ppl', 'biz,edu,health', 'proud', 3, 'Motivation and ownership|Motivasi dan rasa memiliki|やる気と当事者意識|动力与主人翁意识', 'Staff care more when they decide.|Staf lebih peduli saat mereka memutuskan.|自分で決めると、責任感が増す。|自己决定时更用心。'),
      I('mkt', 'retail,food,health', 'customer', 2, 'Better service|Layanan lebih baik|サービス向上|服务更好', 'Frontline staff solve problems on the spot.|Staf lini depan menyelesaikan masalah di tempat.|現場の社員が、その場で問題を解決できる。|一线员工当场解决问题。'),
      I('cap', 'biz', 'new', 2, 'More ideas|Lebih banyak ide|アイデアが増える|想法更多', 'People closest to the work know the fixes.|Orang terdekat dengan pekerjaan tahu solusinya.|現場に近い人が、改善策を知っている。|最贴近工作的人最懂改进。'),
      I('ppl', 'biz', 'stay', 2, 'Lower turnover|Pergantian rendah|離職率の低下|离职率降低', 'Valued staff stay.|Staf yang dihargai bertahan.|大切にされる社員は、辞めにくい。|被重视的员工更愿留下。')
    ], [
      I('risk', 'biz,health,fin', 'mistake', 3, 'Costly mistakes|Kesalahan mahal|高くつくミス|代价高昂的失误', 'Untrained decisions can go wrong.|Keputusan tanpa pelatihan bisa salah.|訓練不足の判断は、失敗しうる。|缺乏训练的决策易出错。'),
      I('eff', 'biz,mfg', 'confuse', 2, 'Inconsistency|Ketidakkonsistenan|対応のばらつき|不一致', 'Different people act differently.|Orang berbeda bertindak berbeda.|人によって、対応が違ってくる。|不同人做法各异。'),
      I('ppl', 'biz,pub', 'stress', 2, 'Pressure and blame|Tekanan dan penyalahan|プレッシャーと責任追及|压力与问责', 'Some staff dislike carrying decisions.|Sebagian staf tidak suka memikul keputusan.|決定を背負うのを、嫌がる人もいる。|有些员工不愿背负决策。'),
      I('risk', 'biz,pub', 'lose', 2, 'Managers feel threatened|Manajer merasa terancam|管理者の抵抗|管理者感到威胁', 'Middle managers may resist losing power.|Manajer menengah mungkin menolak kehilangan kuasa.|中間管理職が、権限を失うのを嫌う。|中层可能抗拒失权。')
    ]),
    C('diversity', 'Workforce diversity|Keberagaman tenaga kerja|多様性|劳动力多元化', ['homogeneous team'], [
      I('cap', 'biz,edu,health', 'new', 3, 'More ideas and creativity|Lebih banyak ide dan kreativitas|発想の多様化|更多创意', 'Different views spark new solutions.|Sudut pandang berbeda memicu solusi baru.|異なる視点が、新しい解決策を生む。|不同视角激发新方案。'),
      I('mkt', 'retail,food,health', 'customer', 2, 'Understands more customers|Memahami lebih banyak pelanggan|多様な顧客の理解|理解更多客户', 'A varied team mirrors varied markets.|Tim beragam mencerminkan pasar yang beragam.|多様なチームは、多様な市場を映す。|多元团队反映多元市场。'),
      I('cap', 'biz', 'skill', 2, 'Wider talent|Talenta lebih luas|人材の幅|人才更广', 'You recruit from the whole population.|Anda merekrut dari seluruh populasi.|全体から人材を採用できる。|从全体人群中招聘。'),
      I('mkt', 'biz,pub', 'name', 2, 'Good reputation|Reputasi baik|評判の向上|声誉好', 'Employees and clients value fairness.|Karyawan dan klien menghargai keadilan.|公平さが、社員と顧客に評価される。|员工与客户重视公平。')
    ], [
      I('ppl', 'biz', 'conflict', 3, 'Friction and misunderstanding|Gesekan dan salah paham|摩擦と誤解|摩擦与误解', 'Different norms can clash.|Norma yang berbeda bisa bertabrakan.|価値観の違いが、衝突を生む。|不同规范可能冲突。'),
      I('eff', 'biz', 'slow', 2, 'Slower consensus|Konsensus lebih lambat|合意に時間がかかる|共识更慢', 'More views take longer to reconcile.|Lebih banyak pandangan butuh waktu lebih lama untuk disatukan.|多様な意見の調整に、時間がかかる。|更多观点需更久协调。'),
      I('cost', 'biz', 'money', 2, 'Needs training and support|Butuh pelatihan dan dukungan|研修・支援が必要|需要培训与支持', 'Inclusion takes real effort and budget.|Inklusi butuh upaya dan anggaran nyata.|インクルージョンには、手間と予算が要る。|包容需要真实投入。'),
      I('risk', 'biz,pub', 'symbol', 2, 'Tokenism risk|Risiko tokenisme|形だけになる危険|流于形式', 'Numbers improve but culture does not.|Angka membaik tetapi budaya tidak.|数字だけ整い、風土は変わらない。|数字改善文化未变。')
    ]),
    C('homogeneous team', 'Homogeneous team|Tim homogen|同質的なチーム|同质化团队', ['diversity'], [
      I('eff', 'biz', 'fast', 3, 'Quick agreement|Kesepakatan cepat|合意が早い|共识快', 'Shared assumptions need less explaining.|Asumsi yang sama butuh lebih sedikit penjelasan.|共通の前提があり、説明が少なくて済む。|共同假设减少解释。'),
      I('ppl', 'biz', 'friend', 2, 'Easy cohesion|Mudah akrab|まとまりやすい|易凝聚', 'People feel comfortable together.|Orang merasa nyaman bersama.|居心地が良く、まとまりやすい。|大家相处自在。'),
      I('eff', 'biz,mfg', 'clear', 2, 'Little conflict|Sedikit konflik|衝突が少ない|冲突少', 'Few disagreements over basics.|Sedikit perselisihan soal dasar.|基本的な点で、もめにくい。|基本问题少争执。'),
      I('val', 'biz', 'save', 2, 'Low coordination cost|Biaya koordinasi rendah|調整コストが低い|协调成本低', 'Less time needed to align.|Lebih sedikit waktu untuk menyelaraskan.|すり合わせの時間が短くて済む。|对齐耗时少。')
    ], [
      I('risk', 'biz,mfg', 'blind', 3, 'Groupthink and blind spots|Groupthink dan titik buta|集団思考と盲点|群体思维与盲区', 'Nobody challenges shared assumptions.|Tak ada yang menantang asumsi bersama.|誰も共通の前提を疑わない。|无人质疑共同假设。'),
      I('mkt', 'retail,food', 'narrow', 2, 'Narrow market view|Pandangan pasar sempit|市場の見方が狭い|市场视野狭窄', 'You may miss customers unlike yourselves.|Anda mungkin melewatkan pelanggan yang berbeda dari diri sendiri.|自分たちと違う顧客を見逃す。|可能错过与自己不同的客户。'),
      I('cap', 'biz', 'new', 2, 'Less innovation|Inovasi lebih sedikit|革新が生まれにくい|创新较少', 'Similar minds produce similar ideas.|Pikiran serupa menghasilkan gagasan serupa.|似た人からは、似た発想しか出ない。|相似头脑产生相似想法。'),
      I('risk', 'biz,pub', 'law', 2, 'Discrimination risk|Risiko diskriminasi|差別のリスク|歧视风险', 'Hiring "people like us" can be unfair or unlawful.|Merekrut "orang seperti kita" bisa tidak adil atau melanggar hukum.|「自分たちに似た人」を採るのは、不公平で違法になりうる。|只招“像我们的人”可能不公或违法。')
    ]),
    C('job rotation', 'Job rotation|Rotasi pekerjaan|ジョブローテーション|岗位轮换', ['specialization'], [
      I('ppl', 'biz,mfg,health', 'skill', 3, 'Broader skills|Keterampilan lebih luas|スキルの幅が広がる|技能更广', 'Staff learn several tasks.|Staf mempelajari beberapa tugas.|複数の仕事を経験できる。|员工学会多种任务。'),
      I('ppl', 'mfg,retail', 'boring', 2, 'Less boredom|Kurang bosan|飽きにくい|不易厌倦', 'Variety keeps people fresh.|Variasi menjaga orang tetap segar.|変化が、新鮮さを保つ。|变化使人保持新鲜感。'),
      I('cap', 'mfg,biz', 'flexible', 2, 'Covers absences|Menutup ketidakhadiran|欠員をカバー|可替补缺勤', 'Anyone can fill in.|Siapa pun dapat menggantikan.|誰でも代わりに入れる。|任何人都能顶岗。'),
      I('cap', 'biz,pub', 'know', 2, 'Understanding of the whole|Pemahaman menyeluruh|全体像の理解|理解全局', 'People see how departments connect.|Orang melihat bagaimana departemen saling terkait.|部署同士のつながりが見えてくる。|看到部门如何衔接。')
    ], [
      I('eff', 'mfg,biz', 'slow', 3, 'Lower productivity|Produktivitas lebih rendah|生産性の低下|效率降低', 'Learning curves cost time.|Kurva belajar memakan waktu.|慣れるまで、時間を取られる。|学习曲线耗时。'),
      I('cost', 'biz,mfg', 'money', 2, 'Training costs|Biaya pelatihan|研修コスト|培训成本', 'Each move requires instruction.|Setiap perpindahan butuh pembekalan.|異動のたびに、教育が必要になる。|每次轮岗都需培训。'),
      I('ppl', 'biz,mfg', 'stress', 2, 'Unsettling for staff|Mengganggu staf|社員の不安|令员工不安', 'Some prefer stable roles.|Sebagian lebih suka peran yang stabil.|安定した役割を好む人もいる。|有人偏爱稳定岗位。'),
      I('risk', 'mfg,health', 'mistake', 2, 'More errors at first|Lebih banyak kesalahan di awal|最初はミスが増える|初期错误更多', 'Newcomers to a task make more mistakes.|Pendatang baru dalam tugas membuat lebih banyak kesalahan.|慣れない仕事では、ミスが増える。|新手易出错。')
    ]),
    C('specialization', 'Specialisation|Spesialisasi|専門化|专业化分工', ['job rotation'], [
      I('eff', 'mfg,food,health', 'fast', 3, 'High productivity|Produktivitas tinggi|生産性が高い|效率高', 'Repetition builds speed and skill.|Pengulangan membangun kecepatan dan keahlian.|反復で、速さと熟練が身につく。|重复积累速度与熟练。'),
      I('val', 'mfg,health', 'quality', 2, 'Expert quality|Kualitas ahli|専門的な品質|专家级质量', 'Specialists know their field deeply.|Spesialis menguasai bidangnya secara mendalam.|専門家は、その分野を深く知っている。|专家精通其领域。'),
      I('val', 'mfg,biz', 'save', 2, 'Lower training time|Waktu pelatihan lebih singkat|研修が短い|培训时间短', 'Each person learns one task.|Setiap orang mempelajari satu tugas.|1人が覚える仕事は、1つで済む。|每人只学一项任务。'),
      I('mkt', 'health,biz', 'premium', 2, 'Higher prices for expertise|Harga lebih tinggi untuk keahlian|専門性への対価|专业带来溢价', 'Clients pay more for specialists.|Klien membayar lebih untuk spesialis.|専門家には、高い報酬が支払われる。|客户为专家付更多。')
    ], [
      I('ppl', 'mfg,food', 'boring', 3, 'Monotony|Monoton|単調さ|单调', 'The same task all day is dull.|Tugas yang sama seharian membosankan.|一日中同じ作業は、退屈。|整天同一任务乏味。'),
      I('risk', 'mfg,biz', 'depend', 3, 'Dependence on individuals|Ketergantungan pada individu|属人化|依赖个人', 'If a specialist leaves, work stops.|Jika spesialis pergi, pekerjaan berhenti.|専門家が辞めると、仕事が止まる。|专家一走工作停摆。'),
      I('risk', 'biz,mfg', 'narrow', 2, 'Narrow view|Pandangan sempit|視野が狭い|视野狭窄', 'People lose sight of the whole process.|Orang kehilangan gambaran seluruh proses.|全体の工程が見えなくなる。|看不到整个流程。'),
      I('eff', 'biz,mfg', 'wait', 2, 'Handoff delays|Penundaan serah terima|引き継ぎの遅れ|交接延误', 'Work waits between specialists.|Pekerjaan menunggu antar spesialis.|専門家間で、仕事が待たされる。|工作在专家间等待。')
    ]),
    C('labor union', 'Labour union|Serikat pekerja|労働組合|工会', ['collective bargaining'], [
      I('ppl', 'mfg,pub,health', 'power', 3, 'Stronger voice for workers|Suara pekerja lebih kuat|労働者の発言力|增强员工话语权', 'Negotiating together beats alone.|Berunding bersama lebih kuat daripada sendiri.|一緒に交渉するほうが、1人より強い。|集体谈判强于单打独斗。'),
      I('ppl', 'mfg,pub', 'money', 2, 'Better pay and conditions|Upah dan kondisi lebih baik|賃金・待遇の改善|薪酬与条件更好', 'Collective deals raise standards.|Kesepakatan kolektif menaikkan standar.|集団交渉が、水準を引き上げる。|集体协议提高标准。'),
      I('cap', 'mfg,health', 'safe', 2, 'Safer workplaces|Tempat kerja lebih aman|安全な職場|更安全的职场', 'Unions push for safety rules.|Serikat mendorong aturan keselamatan.|組合が、安全対策を求める。|工会推动安全规则。'),
      I('cap', 'biz,pub', 'fair', 2, 'Fair treatment|Perlakuan adil|公正な扱い|公平对待', 'Disputes follow clear procedures.|Perselisihan mengikuti prosedur yang jelas.|紛争が、明確な手続きで扱われる。|纠纷有明确程序。')
    ], [
      I('cost', 'mfg,retail', 'expensive', 3, 'Higher labour costs|Biaya tenaga kerja lebih tinggi|人件費の上昇|人工成本上升', 'Wage deals raise the wage bill.|Kesepakatan upah menaikkan beban gaji.|賃上げ合意で、人件費が増える。|工资协议推高人工成本。'),
      I('risk', 'mfg,pub', 'stop', 3, 'Strikes|Pemogokan|ストライキ|罢工', 'Disputes can halt operations.|Perselisihan bisa menghentikan operasi.|紛争で、操業が止まることがある。|纠纷可能令运营停摆。'),
      I('eff', 'mfg,biz', 'rules', 2, 'Less flexibility|Kurang fleksibel|柔軟性の低下|灵活性降低', 'Rules limit how work is changed.|Aturan membatasi cara pekerjaan diubah.|ルールが、業務の変更を制約する。|规则限制工作调整。'),
      I('ppl', 'biz,pub', 'conflict', 2, 'Management versus workers|Manajemen lawan pekerja|労使の対立|劳资对立', 'Relations can turn adversarial.|Hubungan bisa menjadi saling berhadapan.|関係が、対立的になることがある。|关系可能变得对立。')
    ]),
    C('collective bargaining', 'Direct negotiation with employees|Negosiasi langsung dengan karyawan|従業員との個別交渉|与员工直接谈判', ['labor union'], [
      I('eff', 'biz', 'flexible', 3, 'Flexible deals|Kesepakatan fleksibel|柔軟な合意|协议灵活', 'Terms can fit each person.|Syarat bisa disesuaikan dengan tiap orang.|条件を、人ごとに合わせられる。|条款可因人而异。'),
      I('val', 'biz,mfg', 'save', 2, 'Lower cost|Biaya lebih rendah|コストが低い|成本更低', 'Pay is set by individual value.|Upah ditentukan oleh nilai individu.|報酬が、個人の価値で決まる。|薪酬按个人价值确定。'),
      I('ppl', 'biz', 'talk', 2, 'Close relationships|Hubungan dekat|近い関係|关系亲近', 'Managers and staff talk directly.|Manajer dan staf berbicara langsung.|管理者と社員が、直接話し合う。|管理者与员工直接沟通。'),
      I('eff', 'biz', 'fast', 2, 'Quick changes|Perubahan cepat|変更が早い|变更迅速', 'No need to negotiate with a third party.|Tidak perlu berunding dengan pihak ketiga.|第三者との交渉が要らない。|无需与第三方谈判。')
    ], [
      I('ppl', 'biz,mfg', 'weak', 3, 'Unequal bargaining power|Daya tawar tidak setara|交渉力の格差|议价能力不对等', 'One worker faces a whole company.|Satu pekerja berhadapan dengan seluruh perusahaan.|1人の社員が、会社全体と向き合う。|一名员工面对整家公司。'),
      I('ppl', 'biz,pub', 'fair', 2, 'Perceived unfairness|Terasa tidak adil|不公平感|觉得不公平', 'Colleagues with the same role get different pay.|Rekan dengan peran sama mendapat gaji berbeda.|同じ役割でも、報酬に差が出る。|同岗位薪酬不同。'),
      I('ppl', 'biz', 'fear', 2, 'Fear of speaking out|Takut bersuara|声を上げにくい|不敢发声', 'Staff worry about retaliation.|Staf khawatir akan pembalasan.|報復を恐れて、意見を言えない。|员工担心被报复。'),
      I('risk', 'biz,pub', 'law', 2, 'Legal exposure|Risiko hukum|法的リスク|法律风险', 'Unequal deals may breach labour rules.|Kesepakatan tidak setara dapat melanggar aturan ketenagakerjaan.|不平等な契約が、労働法に触れうる。|不平等协议可能违反劳动法。')
    ]),
    C('employee ownership', 'Employee ownership|Kepemilikan karyawan|従業員持株制度|员工持股', ['stock options'], [
      I('ppl', 'biz,mfg', 'team', 3, 'Shared success|Keberhasilan bersama|成果の共有|共享成功', 'Staff gain when the firm does.|Staf untung saat perusahaan untung.|会社が成長すれば、社員も得をする。|公司获益员工也获益。'),
      I('ppl', 'biz,mfg', 'stay', 2, 'Lower turnover|Pergantian rendah|離職の抑制|降低离职', 'Owners are less likely to leave.|Pemilik lebih kecil kemungkinan pergi.|持ち株があると、辞めにくい。|持股者更不易离开。'),
      I('cap', 'biz,mfg', 'effort', 2, 'More effort|Usaha lebih besar|努力の向上|更加努力', 'Workers act like owners.|Pekerja bertindak seperti pemilik.|社員がオーナーのように動く。|员工像老板一样做事。'),
      I('cap', 'biz,pub', 'safe', 2, 'Protects against takeover|Melindungi dari pengambilalihan|買収への備え|防范收购', 'Friendly owners keep control local.|Pemilik yang bersahabat menjaga kendali tetap lokal.|友好的な株主が、経営を守る。|友好股东守住控制权。')
    ], [
      I('risk', 'biz,mfg', 'lose', 3, 'Double risk|Risiko ganda|二重のリスク|双重风险', 'Job and savings both depend on one firm.|Pekerjaan dan tabungan sama-sama bergantung pada satu perusahaan.|仕事と資産が、同じ会社に依存する。|工作与储蓄都押在一家公司。'),
      I('eff', 'biz', 'slow', 2, 'Slower decisions|Keputusan lebih lambat|意思決定が遅い|决策较慢', 'Many owners want a say.|Banyak pemilik ingin ikut bicara.|多くの株主が、発言を求める。|众多股东都想发言。'),
      I('cost', 'biz,fin', 'expensive', 2, 'Complex to set up|Rumit disiapkan|設計が複雑|设计复杂', 'Valuation, rules and legal work are heavy.|Penilaian, aturan, dan urusan hukum itu berat.|評価・規則・法務の手間が大きい。|估值、规则与法务繁重。'),
      I('ppl', 'biz', 'fair', 2, 'Disputes over shares|Sengketa soal saham|持分をめぐる争い|股份纠纷', 'Who gets how much can cause conflict.|Siapa mendapat berapa bisa menimbulkan konflik.|誰がどれだけ持つかで、もめる。|谁分多少易引发矛盾。')
    ]),
    C('gig workers', 'Gig workers|Pekerja gig|ギグワーカー|零工工人', ['permanent staff'], [
      I('eff', 'retail,food,biz', 'flexible', 3, 'Flexible capacity|Kapasitas fleksibel|柔軟な人員|弹性用工', 'Scale labour up and down with demand.|Menaikkan dan menurunkan tenaga kerja sesuai permintaan.|需要に合わせて、人員を増減できる。|按需增减人手。'),
      I('val', 'retail,biz', 'save', 2, 'Lower fixed costs|Biaya tetap lebih rendah|固定費の削減|固定成本低', 'No benefits or idle pay.|Tanpa tunjangan atau gaji menganggur.|福利厚生や待機の人件費が要らない。|无福利与闲置工资。'),
      I('ppl', 'fam,edu', 'free', 2, 'Freedom for workers|Kebebasan bagi pekerja|働く側の自由|工人自由', 'People choose when and how much to work.|Orang memilih kapan dan berapa banyak bekerja.|働く時間と量を、自分で選べる。|自行选择工作时间与量。'),
      I('cap', 'biz,retail', 'skill', 2, 'Access to specialists|Akses ke spesialis|専門家を活用|获取专才', 'Hire expertise for a single project.|Mempekerjakan keahlian untuk satu proyek.|1つのプロジェクトだけ、専門家を雇える。|为单个项目聘请专家。')
    ], [
      I('ppl', 'retail,food,fam', 'poor', 3, 'Insecure income|Pendapatan tidak pasti|収入が不安定|收入不稳定', 'No guaranteed hours or benefits.|Tanpa jam atau tunjangan terjamin.|労働時間も福利厚生も保証されない。|工时与福利无保障。'),
      I('mkt', 'retail,food', 'loyal', 2, 'Low loyalty|Loyalitas rendah|愛着が薄い|忠诚度低', 'They have little reason to care about your brand.|Mereka punya sedikit alasan peduli pada merek Anda.|ブランドへの愛着を持ちにくい。|对你的品牌缺乏归属。'),
      I('risk', 'pub,biz', 'law', 2, 'Legal status disputes|Sengketa status hukum|雇用区分をめぐる紛争|法律身份争议', 'Are they employees or contractors?|Apakah mereka karyawan atau kontraktor?|従業員か、業務委託か。|是员工还是承包者？'),
      I('eff', 'retail,biz', 'quality', 2, 'Inconsistent quality|Kualitas tidak konsisten|品質のばらつき|质量不一致', 'Training and control are limited.|Pelatihan dan kendali terbatas.|教育や管理が行き届かない。|培训与管控有限。')
    ]),
    C('permanent staff', 'Permanent staff|Karyawan tetap|正社員|正式员工', ['gig workers'], [
      I('cap', 'biz,mfg,edu', 'loyal', 3, 'Commitment and loyalty|Komitmen dan loyalitas|責任感と忠誠心|承诺与忠诚', 'They invest in the firm\'s future.|Mereka berinvestasi pada masa depan perusahaan.|会社の将来に、投資してくれる。|他们为公司未来投入。'),
      I('cap', 'biz,mfg', 'know', 2, 'Accumulated knowledge|Pengetahuan terakumulasi|知識の蓄積|知识积累', 'Experience stays in the company.|Pengalaman tetap di perusahaan.|経験が、社内に蓄積される。|经验留在公司。'),
      I('ppl', 'fam,biz', 'safe', 2, 'Security for workers|Keamanan bagi pekerja|雇用の安定|员工有保障', 'Stable pay and benefits.|Gaji dan tunjangan stabil.|安定した給与と福利厚生。|稳定薪酬与福利。'),
      I('ppl', 'biz,mfg', 'team', 2, 'Team culture|Budaya tim|チームワーク|团队文化', 'Long-term teams trust each other.|Tim jangka panjang saling percaya.|長く一緒にいるチームは、信頼し合える。|长期团队彼此信任。')
    ], [
      I('cost', 'biz,mfg', 'expensive', 3, 'High fixed costs|Biaya tetap tinggi|固定費が高い|固定成本高', 'Pay continues in slow periods.|Gaji tetap dibayar saat sepi.|閑散期にも、給与を払い続ける。|淡季仍需发薪。'),
      I('risk', 'biz,mfg', 'stuck', 2, 'Hard to adjust numbers|Sulit menyesuaikan jumlah|人員調整が難しい|难以调整人数', 'Layoffs are costly and slow.|PHK mahal dan lambat.|人員削減には、費用も時間もかかる。|裁员昂贵且缓慢。'),
      I('ppl', 'biz,pub', 'lazy', 2, 'Complacency|Rasa puas diri|惰性・マンネリ|懈怠', 'Security can reduce effort.|Rasa aman bisa mengurangi usaha.|安定が、努力を減らすことがある。|安稳可能降低努力。'),
      I('eff', 'biz', 'slow', 2, 'Slow hiring|Perekrutan lambat|採用に時間がかかる|招聘慢', 'Finding and training takes months.|Mencari dan melatih butuh berbulan-bulan.|探して育てるのに、数か月かかる。|寻找与培训需数月。')
    ]),
    C('succession planning', 'Succession planning|Perencanaan suksesi|後継者計画|继任计划', ['family business'], [
      I('val', 'biz,fam,pub', 'safe', 3, 'Continuity|Keberlanjutan|事業の継続|持续经营', 'The firm survives leadership change.|Perusahaan bertahan melewati pergantian pimpinan.|トップが替わっても、会社は続く。|领导更替后公司仍存续。'),
      I('ppl', 'biz,fam', 'trust', 2, 'Calm transition|Transisi tenang|円滑な移行|平稳交接', 'Staff and clients know what to expect.|Staf dan klien tahu apa yang diharapkan.|社員も顧客も、先行きが見える。|员工与客户知道预期。'),
      I('cap', 'biz,pub', 'skill', 2, 'Develops leaders|Mengembangkan pemimpin|リーダー育成|培养领导者', 'Candidates are trained in advance.|Kandidat dilatih sebelumnya.|候補者を、前もって育てられる。|候选人提前培养。'),
      I('mkt', 'biz,fin', 'trust', 2, 'Investor confidence|Kepercayaan investor|投資家の安心|投资者信心', 'A plan reassures lenders and owners.|Rencana menenangkan pemberi pinjaman dan pemilik.|計画があれば、貸し手や株主が安心する。|计划让贷方和股东放心。')
    ], [
      I('ppl', 'biz,fam', 'conflict', 3, 'Rivalry and conflict|Persaingan dan konflik|後継争い|竞争与冲突', 'Candidates fight for the top job.|Kandidat berebut posisi puncak.|候補者が、トップの座を争う。|候选人争夺最高职位。'),
      I('ppl', 'biz,fam', 'fear', 2, 'Founders resist letting go|Pendiri sulit melepaskan|創業者が手放せない|创始人放不下', 'Leaders avoid naming a successor.|Pemimpin menghindari menunjuk pengganti.|トップが、後継者を決めたがらない。|领导者回避指定继任者。'),
      I('ppl', 'biz', 'leave', 2, 'Losing passed-over staff|Kehilangan staf yang terlewat|選ばれなかった人材の離職|落选者离职', 'Those not chosen may leave.|Mereka yang tidak dipilih mungkin pergi.|選ばれなかった人が、辞めるかもしれない。|落选者可能离开。'),
      I('risk', 'biz,pub', 'change', 2, 'Plans become outdated|Rencana menjadi usang|計画が時代遅れに|计划过时', 'Needs change before the handover happens.|Kebutuhan berubah sebelum serah terima.|引き継ぎ前に、状況が変わってしまう。|交接前需求已变。')
    ]),
    C('family business', 'Family business|Bisnis keluarga|同族経営|家族企业', ['professional management'], [
      I('ppl', 'fam,food,retail', 'trust', 3, 'High trust|Kepercayaan tinggi|信頼が厚い|信任度高', 'Family members look after each other.|Anggota keluarga saling menjaga.|家族は、互いを大切にする。|家人彼此照应。'),
      I('cap', 'fam,biz', 'long', 3, 'Long-term thinking|Berpikir jangka panjang|長期的視点|长期思维', 'The aim is to pass it on to the next generation.|Tujuannya mewariskan kepada generasi berikutnya.|次世代に引き継ぐことが目的。|目标是传给下一代。'),
      I('eff', 'fam,biz', 'fast', 2, 'Quick decisions|Keputusan cepat|意思決定が速い|决策快', 'Few owners, little bureaucracy.|Pemilik sedikit, birokrasi minim.|オーナーが少なく、手続きも簡素。|股东少，官僚少。'),
      I('mkt', 'fam,food,retail', 'name', 2, 'Strong reputation|Reputasi kuat|名前への信用|声誉好', 'The family name stands behind quality.|Nama keluarga menjamin kualitas.|家名が、品質の保証になる。|姓氏为品质背书。')
    ], [
      I('ppl', 'fam', 'conflict', 3, 'Family conflict|Konflik keluarga|家族間の対立|家庭冲突', 'Disputes at home spill into work.|Perselisihan di rumah merembet ke pekerjaan.|家庭の対立が、仕事に持ち込まれる。|家庭纠纷波及工作。'),
      I('risk', 'fam,biz', 'unfair', 2, 'Nepotism|Nepotisme|縁故主義|任人唯亲', 'Relatives may be promoted over better candidates.|Kerabat bisa dipromosikan di atas kandidat yang lebih baik.|親族が、有能な人より優先される。|亲属可能压过更优者晋升。'),
      I('eff', 'fam,biz', 'stuck', 2, 'Resistance to change|Menolak perubahan|変化への抵抗|抗拒变化', 'Tradition can block modernising.|Tradisi dapat menghalangi modernisasi.|伝統が、近代化の妨げになる。|传统阻碍现代化。'),
      I('cap', 'fam,biz', 'skill', 2, 'Limited talent pool|Pilihan talenta terbatas|人材が限られる|人才库有限', 'Leaders come from a small circle.|Pemimpin berasal dari lingkaran kecil.|リーダーが、狭い範囲から選ばれる。|领导来自小圈子。')
    ]),
    C('professional management', 'Professional management|Manajemen profesional|専門経営者|职业经理人', ['family business'], [
      I('cap', 'biz,pub', 'skill', 3, 'Expertise|Keahlian|専門知識|专业能力', 'Managers are chosen for ability.|Manajer dipilih berdasarkan kemampuan.|能力で選ばれた経営者。|经理人以能力选拔。'),
      I('eff', 'biz,pub', 'clear', 2, 'Clear systems|Sistem jelas|仕組みが明確|制度清晰', 'Roles, goals and reviews are formal.|Peran, tujuan, dan evaluasi bersifat formal.|役割・目標・評価が明確。|角色、目标与考核正式。'),
      I('val', 'biz,fin', 'profit', 2, 'Focus on performance|Fokus pada kinerja|業績重視|聚焦业绩', 'Results drive decisions.|Hasil mendorong keputusan.|成果が意思決定を動かす。|结果驱动决策。'),
      I('cap', 'biz', 'fresh', 2, 'Fresh ideas|Gagasan segar|新しい視点|新想法', 'Outsiders bring new methods.|Orang luar membawa metode baru.|外部の人が、新しいやり方を持ち込む。|外来者带来新方法。')
    ], [
      I('ppl', 'biz,fam', 'distance', 3, 'Less commitment|Komitmen lebih rendah|愛着が薄い|归属感较弱', 'Hired managers may leave for a better offer.|Manajer bayaran bisa pergi untuk tawaran lebih baik.|雇われ経営者は、条件次第で去る。|雇佣经理人可能为更好条件离开。'),
      I('risk', 'biz,fin', 'short', 2, 'Short-term focus|Fokus jangka pendek|短期志向|短视', 'Bonuses encourage quick results.|Bonus mendorong hasil cepat.|賞与が、短期成果を促す。|奖金鼓励短期成果。'),
      I('cost', 'biz', 'expensive', 2, 'High salaries|Gaji tinggi|高い報酬|薪资高', 'Top managers are costly.|Manajer top mahal.|優秀な経営者は、報酬が高い。|顶级经理人成本高。'),
      I('ppl', 'biz,fam', 'conflict', 2, 'Clash with owners|Bentrok dengan pemilik|オーナーとの衝突|与所有者冲突', 'Owners may reject outsiders\' decisions.|Pemilik mungkin menolak keputusan orang luar.|オーナーが、外部経営者の判断を受け入れない。|所有者可能拒绝外来者的决定。')
    ])
  );
})();
