/* Simulation registry: one entry per simulation, shown in the catalog.
   status "live"  -> opens a microsite from simulations/<id>/ (its file list is simulations/<id>/sim.js; loaded on demand)
   status "soon"  -> shown as "Coming soon", no files needed yet.
   developer (optional) -> the credit on the card, the loading screen and the Info window. Without it the main developer
                           from data/about.js is used. A new name appears in Info automatically, listed with its simulations.
   To add a simulation see docs/ADDING-A-SIMULATION.md */
MBALAB.data.simulations = [
  {
    "id": "smart-decision-studio",
    "status": "live",
    "icon": "⚖️",
    "category": "decision-negotiation",
    "name": {
      "en": "SMART Decision Studio",
      "id": "SMART Decision Studio",
      "ja": "SMART Decision Studio",
      "zh": "SMART Decision Studio"
    },
    "description": {
      "en": "Multi-criteria decision analysis: weights, ranking and sensitivity.",
      "id": "Analisis keputusan multikriteria: bobot, peringkat, dan sensitivitas.",
      "ja": "多基準意思決定分析：重み付け、ランキング、感度分析。",
      "zh": "多准则决策分析：权重、排名与敏感性分析。"
    }
  },
  {
    "id": "disc-crisis-room",
    "status": "live",
    "icon": "🎭",
    "category": "leadership",
    "name": {
      "en": "DISC Crisis Room Test",
      "id": "DISC Crisis Room Test",
      "ja": "DISC Crisis Room Test",
      "zh": "DISC Crisis Room Test"
    },
    "description": {
      "en": "Lead a team through six crises. Your choices reveal your DISC style.",
      "id": "Pimpin tim melewati enam krisis. Pilihan Anda mengungkap gaya DISC Anda.",
      "ja": "6つの危機でチームを率いる。選択からあなたのDISCスタイルが見えてくる。",
      "zh": "带领团队度过六场危机，你的选择将揭示你的 DISC 风格。"
    }
  },
  {
    "id": "bumn-explorer",
    "status": "live",
    "icon": "🏙️",
    "category": "indonesia-business",
    "name": {
      "en": "BUMN Explorer",
      "id": "Jelajah BUMN",
      "ja": "BUMNエクスプローラー",
      "zh": "印尼国企探索 BUMN"
    },
    "description": {
      "en": "Explore Indonesia's state-owned companies in 3D, then take the quiz.",
      "id": "Jelajahi BUMN Indonesia di dunia 3D lengkap dengan pelabuhan, tambang, dan pembangkit, lalu uji lewat kuis.",
      "ja": "港・鉱山・発電所のある3Dの世界でインドネシアの国有企業を探索し、クイズに挑戦。",
      "zh": "在有港口、矿山和电厂的3D世界中探索印尼国有企业，再来一场测验。"
    }
  },
  {
    "id": "tryout-mba",
    "status": "live",
    "icon": "📝",
    "category": "exam-prep",
    "developer": "293 - M. Fauzan Ikromi",
    "name": {
      "en": "Try Out MBA",
      "id": "Try Out MBA",
      "ja": "MBA 模擬試験",
      "zh": "MBA 模拟考试"
    },
    "description": {
      "en": "Practice exams from a bank of 1,074 questions across 6 courses. Pick weeks and difficulty, sit a timed exam or practise with instant feedback, then see your weak spots.",
      "id": "Latihan ujian dari bank 1.074 soal untuk 6 mata kuliah. Pilih minggu dan tingkat kesulitan, ikut ujian berwaktu atau latihan dengan umpan balik langsung, lalu lihat bagian yang lemah.",
      "ja": "6科目・1,074問の問題バンクから模擬試験。週と難易度を選び、時間制限つき試験または即時フィードバック練習で弱点を把握。",
      "zh": "来自 6 门课程 1,074 道题库的模拟考试。选择周次与难度，进行限时考试或即时反馈练习，找出薄弱环节。"
    }
  },
  {
    "id": "life-40",
    "status": "live",
    "icon": "⏳",
    "category": "strategy-finance",
    "name": {
      "en": "Life 40: Money Over Time",
      "id": "Hidup 40 Tahun: Uang dan Waktu",
      "ja": "ライフ40：お金と時間",
      "zh": "人生40年：金钱与时间"
    },
    "description": {
      "en": "Live from 22 to 62 as rich, middle or poor. Save, borrow and invest through layoffs, crashes and scams, and see how time value of money plays out.",
      "id": "Jalani usia 22 sampai 62 sebagai orang kaya, biasa, atau miskin. Menabung, berutang, dan berinvestasi melewati PHK, krisis, dan penipuan, lalu lihat nilai waktu uang bekerja.",
      "ja": "22歳から62歳まで、裕福・普通・貧しい家庭で生きる。解雇・暴落・詐欺の中で貯蓄・借入・投資をし、お金の時間価値を体感。",
      "zh": "以富裕、普通或贫寒的出身，从 22 岁活到 62 岁。在裁员、暴跌和骗局中储蓄、借贷、投资，看货币时间价值如何起作用。"
    }
  },
  {
    "id": "break-even-analysis",
    "status": "soon",
    "icon": "📈",
    "category": "strategy-finance",
    "name": {
      "en": "Break-even analysis",
      "id": "Analisis titik impas",
      "ja": "損益分岐点分析",
      "zh": "盈亏平衡分析"
    },
    "description": {
      "en": "Fixed vs. variable costs and profit thresholds.",
      "id": "Biaya tetap vs. variabel dan ambang laba.",
      "ja": "固定費と変動費、利益の分岐点。",
      "zh": "固定成本与可变成本及盈利门槛。"
    }
  },
  {
    "id": "npv-capital-budgeting",
    "status": "soon",
    "icon": "💰",
    "category": "strategy-finance",
    "name": {
      "en": "NPV & capital budgeting",
      "id": "NPV & penganggaran modal",
      "ja": "NPVと資本予算",
      "zh": "净现值与资本预算"
    },
    "description": {
      "en": "Discount cash flows and compare projects.",
      "id": "Diskontokan arus kas dan bandingkan proyek.",
      "ja": "キャッシュフローを割り引き、プロジェクトを比較。",
      "zh": "折现现金流并比较项目。"
    }
  },
  {
    "id": "porter-s-five-forces",
    "status": "soon",
    "icon": "🧭",
    "category": "strategy-finance",
    "name": {
      "en": "Porter's five forces",
      "id": "Lima kekuatan Porter",
      "ja": "ポーターの5つの力",
      "zh": "波特五力"
    },
    "description": {
      "en": "Score industry attractiveness.",
      "id": "Nilai daya tarik industri.",
      "ja": "業界の魅力度を評価。",
      "zh": "评估行业吸引力。"
    }
  },
  {
    "id": "portfolio-risk-return",
    "status": "soon",
    "icon": "🎯",
    "category": "strategy-finance",
    "name": {
      "en": "Portfolio risk–return",
      "id": "Risiko–imbal hasil portofolio",
      "ja": "ポートフォリオのリスクとリターン",
      "zh": "投资组合风险与收益"
    },
    "description": {
      "en": "Mix assets and see the trade-off.",
      "id": "Padukan aset dan lihat trade-off-nya.",
      "ja": "資産を組み合わせてトレードオフを確認。",
      "zh": "组合资产并观察风险与收益的权衡。"
    }
  },
  {
    "id": "pricing-elasticity",
    "status": "soon",
    "icon": "🏷️",
    "category": "marketing",
    "name": {
      "en": "Pricing & elasticity",
      "id": "Penetapan harga & elastisitas",
      "ja": "価格設定と弾力性",
      "zh": "定价与弹性"
    },
    "description": {
      "en": "Test price changes against demand.",
      "id": "Uji perubahan harga terhadap permintaan.",
      "ja": "価格変更が需要に与える影響を検証。",
      "zh": "测试价格变动对需求的影响。"
    }
  },
  {
    "id": "market-segmentation",
    "status": "soon",
    "icon": "👥",
    "category": "marketing",
    "name": {
      "en": "Market segmentation",
      "id": "Segmentasi pasar",
      "ja": "市場セグメンテーション",
      "zh": "市场细分"
    },
    "description": {
      "en": "Group customers and choose target segments.",
      "id": "Kelompokkan pelanggan dan pilih segmen sasaran.",
      "ja": "顧客をグループ化し、ターゲットを選定。",
      "zh": "对客户分组并选择目标细分市场。"
    }
  },
  {
    "id": "inventory-eoq",
    "status": "soon",
    "icon": "📦",
    "category": "operations",
    "name": {
      "en": "Inventory (EOQ)",
      "id": "Persediaan (EOQ)",
      "ja": "在庫管理（EOQ）",
      "zh": "库存（经济订货量）"
    },
    "description": {
      "en": "Balance ordering and holding costs.",
      "id": "Seimbangkan biaya pemesanan dan penyimpanan.",
      "ja": "発注コストと保管コストのバランスを取る。",
      "zh": "平衡订货成本与持有成本。"
    }
  },
  {
    "id": "bullwhip-effect",
    "status": "live",
    "icon": "🔗",
    "category": "operations",
    "name": {
      "en": "Bullwhip effect",
      "id": "Efek bullwhip",
      "ja": "ブルウィップ効果",
      "zh": "牛鞭效应"
    },
    "description": {
      "en": "Run one company in a state-owned supply chain and watch small demand swings grow upstream.",
      "id": "Jalankan satu perusahaan di rantai pasok BUMN dan lihat fluktuasi kecil permintaan membesar ke hulu.",
      "ja": "国有企業のサプライチェーンの1社を運営し、小さな需要変動が上流で膨らむ様子を体験。",
      "zh": "运营国企供应链中的一家公司，亲眼看小幅需求波动如何向上游放大。"
    }
  },
  {
    "id": "five-forces",
    "status": "live",
    "icon": "🛡️",
    "category": "strategy-finance",
    "name": {
      "en": "Porter's Five Forces",
      "id": "Lima Kekuatan Porter",
      "ja": "ポーターの5フォース",
      "zh": "波特五力模型"
    },
    "description": {
      "en": "Read how hard five forces squeeze an industry, then pick the moves that protect your profit.",
      "id": "Baca seberapa keras lima kekuatan menekan sebuah industri, lalu pilih langkah yang melindungi labamu.",
      "ja": "5つの力が業界をどれだけ締め付けるかを読み取り、利益を守る一手を選ぶ。",
      "zh": "读懂五种力量对行业的挤压程度，再选择保护利润的行动。"
    }
  },
  {
    "id": "van-westendorp",
    "status": "live",
    "icon": "🏷️",
    "category": "marketing",
    "name": {
      "en": "Price Sensitivity Meter",
      "id": "Price Sensitivity Meter",
      "ja": "価格感度測定（PSM）",
      "zh": "价格敏感度测试（PSM）"
    },
    "description": {
      "en": "Van Westendorp pricing: four price questions, four curves, and the range of prices people accept.",
      "id": "Penetapan harga Van Westendorp: empat pertanyaan harga, empat kurva, dan rentang harga yang diterima orang.",
      "ja": "ヴァン・ウェステンドルプ法：4つの価格質問と4本の曲線から、受け入れられる価格帯を見つける。",
      "zh": "Van Westendorp 定价法：四个价格问题、四条曲线，找出大家能接受的价格区间。"
    }
  },
  {
    "id": "negotiation-batna",
    "status": "live",
    "icon": "🤝",
    "category": "decision-negotiation",
    "name": {
      "en": "BATNA: Price of Patience",
      "id": "BATNA: Price of Patience",
      "ja": "BATNA: Price of Patience",
      "zh": "BATNA: Price of Patience"
    },
    "description": {
      "en": "12 negotiation missions: solo, with teammates, or against two sellers. Haggle, read, win or walk.",
      "id": "12 misi negosiasi: sendiri, bersama teman, atau melawan dua penjual. Tawar, baca lawan, menang atau pergi.",
      "ja": "12の交渉ミッション：単独、仲間と、売り手2人と。駆け引きし、読み、勝つか去るか。",
      "zh": "12 个谈判任务：单人、携队友或对战两位卖家。砍价、读人，赢下或离场。"
    }
  },
  {
    "id": "koperasi-tycoon",
    "status": "live",
    "icon": "🌾",
    "category": "indonesia-business",
    "name": {
      "en": "Koperasi: Season by Season",
      "id": "Koperasi: Musim ke Musim",
      "ja": "協同組合：季節ごとに",
      "zh": "合作社：四季经营"
    },
    "description": {
      "en": "Manage a village cooperative for 8 years: shop, rice, loans, rivals and the members' trust.",
      "id": "Kelola koperasi desa selama 8 tahun: toko, beras, pinjaman, pesaing, dan kepercayaan anggota.",
      "ja": "村の協同組合を8年間運営。店、米、貸付、ライバル、組合員の信頼。",
      "zh": "经营村合作社8年：商店、大米、贷款、对手与社员的信任。"
    }
  },
  {
    "id": "demand-forecasting",
    "status": "soon",
    "icon": "📊",
    "category": "analytics",
    "name": {
      "en": "Demand forecasting",
      "id": "Peramalan permintaan",
      "ja": "需要予測",
      "zh": "需求预测"
    },
    "description": {
      "en": "Compare forecasting methods on sample data.",
      "id": "Bandingkan metode peramalan pada data contoh.",
      "ja": "サンプルデータで予測手法を比較。",
      "zh": "在示例数据上比较预测方法。"
    }
  },
  {
    "id": "situational-leadership",
    "status": "soon",
    "icon": "🧭",
    "category": "leadership",
    "name": {
      "en": "Situational leadership",
      "id": "Kepemimpinan situasional",
      "ja": "状況対応型リーダーシップ",
      "zh": "情境领导力"
    },
    "description": {
      "en": "Match leadership style to team readiness.",
      "id": "Sesuaikan gaya kepemimpinan dengan kesiapan tim.",
      "ja": "チームの成熟度に合わせてリーダーシップを選ぶ。",
      "zh": "使领导风格与团队成熟度相匹配。"
    }
  },
  {
    "id": "swot-tows",
    "status": "soon",
    "icon": "🧭",
    "category": "strategy-finance",
    "name": {
      "en": "SWOT & TOWS matrix",
      "id": "Matriks SWOT & TOWS",
      "ja": "SWOT・TOWSマトリクス",
      "zh": "SWOT与TOWS矩阵"
    },
    "description": {
      "en": "Turn strengths and threats into concrete strategic moves.",
      "id": "Ubah kekuatan dan ancaman menjadi langkah strategis yang nyata.",
      "ja": "強みと脅威を具体的な戦略行動に変える。",
      "zh": "把优势与威胁转化为具体战略举措。"
    }
  },
  {
    "id": "bcg-matrix",
    "status": "soon",
    "icon": "⭐",
    "category": "strategy-finance",
    "name": {
      "en": "BCG growth-share matrix",
      "id": "Matriks BCG",
      "ja": "BCG成長・シェアマトリクス",
      "zh": "波士顿矩阵"
    },
    "description": {
      "en": "Decide which products to feed, milk or drop.",
      "id": "Putuskan produk mana yang dibina, diperah, atau dilepas.",
      "ja": "どの製品に投資し、回収し、撤退するかを決める。",
      "zh": "决定哪些产品要投入、收割或放弃。"
    }
  },
  {
    "id": "ansoff-matrix",
    "status": "soon",
    "icon": "🧩",
    "category": "strategy-finance",
    "name": {
      "en": "Ansoff growth matrix",
      "id": "Matriks pertumbuhan Ansoff",
      "ja": "アンゾフの成長マトリクス",
      "zh": "安索夫增长矩阵"
    },
    "description": {
      "en": "Choose between penetration, new markets, new products and diversification.",
      "id": "Pilih antara penetrasi, pasar baru, produk baru, dan diversifikasi.",
      "ja": "市場浸透・新市場・新製品・多角化から選ぶ。",
      "zh": "在渗透、新市场、新产品与多元化之间选择。"
    }
  },
  {
    "id": "blue-ocean",
    "status": "soon",
    "icon": "🌊",
    "category": "strategy-finance",
    "name": {
      "en": "Blue Ocean strategy canvas",
      "id": "Kanvas strategi Blue Ocean",
      "ja": "ブルー・オーシャン戦略キャンバス",
      "zh": "蓝海战略画布"
    },
    "description": {
      "en": "Eliminate, reduce, raise, create: redraw the value curve.",
      "id": "Hapus, kurangi, tingkatkan, ciptakan: gambar ulang kurva nilai.",
      "ja": "排除・削減・増加・創造で価値曲線を描き直す。",
      "zh": "剔除、减少、增加、创造：重绘价值曲线。"
    }
  },
  {
    "id": "vrio-resource-based",
    "status": "soon",
    "icon": "💎",
    "category": "strategy-finance",
    "name": {
      "en": "VRIO & resource-based view",
      "id": "VRIO & pandangan berbasis sumber daya",
      "ja": "VRIOと資源ベース理論",
      "zh": "VRIO与资源基础观"
    },
    "description": {
      "en": "Test which resources really give a lasting edge.",
      "id": "Uji sumber daya mana yang benar-benar memberi keunggulan jangka panjang.",
      "ja": "どの資源が持続的優位をもたらすかを検証する。",
      "zh": "检验哪些资源能带来持久优势。"
    }
  },
  {
    "id": "pestel-scan",
    "status": "soon",
    "icon": "🌍",
    "category": "strategy-finance",
    "name": {
      "en": "PESTEL environment scan",
      "id": "Pemindaian lingkungan PESTEL",
      "ja": "PESTEL環境分析",
      "zh": "PESTEL环境扫描"
    },
    "description": {
      "en": "Scan political, economic, social and legal forces before you enter.",
      "id": "Pindai kekuatan politik, ekonomi, sosial, dan hukum sebelum masuk pasar.",
      "ja": "参入前に政治・経済・社会・法規制の要因を分析する。",
      "zh": "进入市场前扫描政治、经济、社会与法律因素。"
    }
  },
  {
    "id": "value-chain",
    "status": "soon",
    "icon": "🔗",
    "category": "strategy-finance",
    "name": {
      "en": "Value chain analysis",
      "id": "Analisis rantai nilai",
      "ja": "バリューチェーン分析",
      "zh": "价值链分析"
    },
    "description": {
      "en": "Find where a firm really creates margin.",
      "id": "Temukan di mana perusahaan benar-benar menciptakan margin.",
      "ja": "企業が本当に利益を生む工程を見つける。",
      "zh": "找出企业真正创造利润的环节。"
    }
  },
  {
    "id": "balanced-scorecard",
    "status": "soon",
    "icon": "🎯",
    "category": "strategy-finance",
    "name": {
      "en": "Balanced Scorecard",
      "id": "Balanced Scorecard",
      "ja": "バランスト・スコアカード",
      "zh": "平衡计分卡"
    },
    "description": {
      "en": "Link strategy to finance, customer, process and learning metrics.",
      "id": "Hubungkan strategi dengan metrik keuangan, pelanggan, proses, dan pembelajaran.",
      "ja": "戦略を財務・顧客・業務・学習の指標に結びつける。",
      "zh": "把战略与财务、客户、流程、学习指标联系起来。"
    }
  },
  {
    "id": "ma-synergy",
    "status": "soon",
    "icon": "🤝",
    "category": "strategy-finance",
    "name": {
      "en": "M&A synergy valuation",
      "id": "Valuasi sinergi M&A",
      "ja": "M&Aシナジー評価",
      "zh": "并购协同估值"
    },
    "description": {
      "en": "Price a deal: how much synergy is worth paying for?",
      "id": "Tentukan harga akuisisi: berapa sinergi layak dibayar?",
      "ja": "買収価格を決める：シナジーにいくら払うべきか。",
      "zh": "为交易定价：协同效应值得付多少钱？"
    }
  },
  {
    "id": "dcf-wacc",
    "status": "soon",
    "icon": "🧮",
    "category": "strategy-finance",
    "name": {
      "en": "DCF valuation & WACC",
      "id": "Valuasi DCF & WACC",
      "ja": "DCF評価とWACC",
      "zh": "DCF估值与WACC"
    },
    "description": {
      "en": "Value a company from its future cash flows.",
      "id": "Nilai perusahaan dari arus kas masa depannya.",
      "ja": "将来キャッシュフローから企業価値を算出する。",
      "zh": "根据未来现金流评估公司价值。"
    }
  },
  {
    "id": "irr-vs-npv",
    "status": "soon",
    "icon": "⚖️",
    "category": "strategy-finance",
    "name": {
      "en": "IRR vs. NPV conflicts",
      "id": "Konflik IRR vs. NPV",
      "ja": "IRRとNPVの矛盾",
      "zh": "IRR与NPV冲突"
    },
    "description": {
      "en": "See why two good rules can rank projects differently.",
      "id": "Pahami mengapa dua kriteria bisa mengurutkan proyek secara berbeda.",
      "ja": "二つの基準でプロジェクト順位が変わる理由を知る。",
      "zh": "理解为何两种准则会给项目不同排序。"
    }
  },
  {
    "id": "capital-structure",
    "status": "soon",
    "icon": "🏗️",
    "category": "strategy-finance",
    "name": {
      "en": "Capital structure & leverage",
      "id": "Struktur modal & leverage",
      "ja": "資本構成とレバレッジ",
      "zh": "资本结构与杠杆"
    },
    "description": {
      "en": "Balance debt, equity and the tax shield.",
      "id": "Seimbangkan utang, ekuitas, dan perisai pajak.",
      "ja": "負債・株主資本・節税効果のバランスを取る。",
      "zh": "平衡债务、股权与税盾。"
    }
  },
  {
    "id": "capm-beta",
    "status": "soon",
    "icon": "📉",
    "category": "strategy-finance",
    "name": {
      "en": "CAPM & beta",
      "id": "CAPM & beta",
      "ja": "CAPMとベータ",
      "zh": "CAPM与贝塔系数"
    },
    "description": {
      "en": "Link risk to the return investors demand.",
      "id": "Kaitkan risiko dengan imbal hasil yang diminta investor.",
      "ja": "リスクと投資家の要求収益率を結びつける。",
      "zh": "把风险与投资者要求的回报联系起来。"
    }
  },
  {
    "id": "real-options",
    "status": "soon",
    "icon": "🔮",
    "category": "strategy-finance",
    "name": {
      "en": "Real options & decision trees",
      "id": "Opsi riil & pohon keputusan",
      "ja": "リアルオプションと決定木",
      "zh": "实物期权与决策树"
    },
    "description": {
      "en": "Value the flexibility to wait, expand or abandon.",
      "id": "Nilai fleksibilitas untuk menunda, memperluas, atau menghentikan.",
      "ja": "待つ・拡大する・撤退する柔軟性を評価する。",
      "zh": "评估等待、扩张或放弃的灵活性。"
    }
  },
  {
    "id": "dividend-policy",
    "status": "soon",
    "icon": "💸",
    "category": "strategy-finance",
    "name": {
      "en": "Dividend vs. buyback policy",
      "id": "Kebijakan dividen vs. buyback",
      "ja": "配当と自社株買い",
      "zh": "股息与回购政策"
    },
    "description": {
      "en": "Decide how to return cash to shareholders.",
      "id": "Putuskan cara mengembalikan kas kepada pemegang saham.",
      "ja": "株主への還元方法を決める。",
      "zh": "决定如何向股东返还现金。"
    }
  },
  {
    "id": "cash-conversion-cycle",
    "status": "soon",
    "icon": "🔄",
    "category": "strategy-finance",
    "name": {
      "en": "Cash conversion cycle",
      "id": "Siklus konversi kas",
      "ja": "キャッシュ・コンバージョン・サイクル",
      "zh": "现金转换周期"
    },
    "description": {
      "en": "Shorten the days between paying suppliers and getting paid.",
      "id": "Persingkat hari antara membayar pemasok dan menerima pembayaran.",
      "ja": "仕入代金の支払いから入金までの日数を短縮する。",
      "zh": "缩短从付款给供应商到收回货款的天数。"
    }
  },
  {
    "id": "startup-runway",
    "status": "soon",
    "icon": "🛫",
    "category": "strategy-finance",
    "name": {
      "en": "Startup runway & burn rate",
      "id": "Runway & burn rate startup",
      "ja": "スタートアップのランウェイとバーンレート",
      "zh": "初创公司跑道与烧钱率"
    },
    "description": {
      "en": "Stretch the cash until the next funding round.",
      "id": "Perpanjang kas hingga putaran pendanaan berikutnya.",
      "ja": "次の資金調達までキャッシュをもたせる。",
      "zh": "让现金撑到下一轮融资。"
    }
  },
  {
    "id": "financial-ratios",
    "status": "soon",
    "icon": "📊",
    "category": "strategy-finance",
    "name": {
      "en": "Financial ratio detective",
      "id": "Detektif rasio keuangan",
      "ja": "財務比率ディテクティブ",
      "zh": "财务比率侦探"
    },
    "description": {
      "en": "Read liquidity, leverage and profitability from the statements.",
      "id": "Baca likuiditas, leverage, dan profitabilitas dari laporan keuangan.",
      "ja": "財務諸表から流動性・レバレッジ・収益性を読む。",
      "zh": "从报表中解读流动性、杠杆与盈利能力。"
    }
  },
  {
    "id": "dupont-roe",
    "status": "soon",
    "icon": "🧬",
    "category": "strategy-finance",
    "name": {
      "en": "DuPont ROE breakdown",
      "id": "Dekomposisi ROE DuPont",
      "ja": "デュポン分解ROE",
      "zh": "杜邦分析ROE"
    },
    "description": {
      "en": "Split ROE into margin, turnover and leverage.",
      "id": "Pecah ROE menjadi margin, perputaran, dan leverage.",
      "ja": "ROEを利益率・回転率・レバレッジに分解する。",
      "zh": "把ROE拆解为利润率、周转率与杠杆。"
    }
  },
  {
    "id": "cost-volume-profit",
    "status": "soon",
    "icon": "🧾",
    "category": "strategy-finance",
    "name": {
      "en": "Cost-volume-profit (CVP)",
      "id": "Biaya-volume-laba (CVP)",
      "ja": "CVP分析",
      "zh": "本量利分析"
    },
    "description": {
      "en": "Test how volume and mix move profit.",
      "id": "Uji bagaimana volume dan bauran menggerakkan laba.",
      "ja": "販売量と構成が利益に与える影響を試す。",
      "zh": "测试销量与产品组合如何影响利润。"
    }
  },
  {
    "id": "activity-based-costing",
    "status": "soon",
    "icon": "🧱",
    "category": "strategy-finance",
    "name": {
      "en": "Activity-based costing",
      "id": "Activity-based costing",
      "ja": "活動基準原価計算",
      "zh": "作业成本法"
    },
    "description": {
      "en": "Trace overhead to the activities that cause it.",
      "id": "Telusuri overhead ke aktivitas penyebabnya.",
      "ja": "間接費を発生原因の活動に配賦する。",
      "zh": "把间接费用追溯到其成因作业。"
    }
  },
  {
    "id": "budget-variance",
    "status": "soon",
    "icon": "📑",
    "category": "strategy-finance",
    "name": {
      "en": "Budgeting & variance analysis",
      "id": "Penganggaran & analisis varians",
      "ja": "予算管理と差異分析",
      "zh": "预算与差异分析"
    },
    "description": {
      "en": "Explain why actuals missed the plan.",
      "id": "Jelaskan mengapa realisasi meleset dari rencana.",
      "ja": "実績が計画から外れた理由を説明する。",
      "zh": "解释实际为何偏离计划。"
    }
  },
  {
    "id": "transfer-pricing",
    "status": "soon",
    "icon": "🏷️",
    "category": "strategy-finance",
    "name": {
      "en": "Transfer pricing",
      "id": "Harga transfer",
      "ja": "移転価格",
      "zh": "转让定价"
    },
    "description": {
      "en": "Set internal prices that keep divisions honest.",
      "id": "Tetapkan harga internal yang menjaga divisi tetap jujur.",
      "ja": "事業部門を適切に動かす社内価格を設定する。",
      "zh": "制定让各部门行为合理的内部价格。"
    }
  },
  {
    "id": "earnings-quality",
    "status": "soon",
    "icon": "🔍",
    "category": "strategy-finance",
    "name": {
      "en": "Earnings quality & red flags",
      "id": "Kualitas laba & tanda bahaya",
      "ja": "利益の質と危険信号",
      "zh": "盈利质量与预警信号"
    },
    "description": {
      "en": "Spot creative accounting before it spots you.",
      "id": "Kenali akuntansi kreatif sebelum merugikan Anda.",
      "ja": "不正会計の兆候を早期に見抜く。",
      "zh": "在被坑之前识破财务粉饰。"
    }
  },
  {
    "id": "marketing-mix-4p",
    "status": "soon",
    "icon": "🛍️",
    "category": "marketing",
    "name": {
      "en": "Marketing mix (4P / 7P)",
      "id": "Bauran pemasaran (4P / 7P)",
      "ja": "マーケティングミックス(4P/7P)",
      "zh": "营销组合(4P/7P)"
    },
    "description": {
      "en": "Tune product, price, place and promotion together.",
      "id": "Atur produk, harga, distribusi, dan promosi secara terpadu.",
      "ja": "製品・価格・流通・販促を一体で調整する。",
      "zh": "协同调整产品、价格、渠道与促销。"
    }
  },
  {
    "id": "stp-positioning",
    "status": "soon",
    "icon": "📍",
    "category": "marketing",
    "name": {
      "en": "STP & brand positioning",
      "id": "STP & positioning merek",
      "ja": "STPとブランドポジショニング",
      "zh": "STP与品牌定位"
    },
    "description": {
      "en": "Segment, target, position: win a place in the mind.",
      "id": "Segmentasi, targeting, positioning: rebut tempat di benak konsumen.",
      "ja": "セグメント・ターゲット・ポジション：顧客の心の中に居場所を作る。",
      "zh": "细分、选择、定位：占据消费者心智。"
    }
  },
  {
    "id": "customer-ltv-cac",
    "status": "soon",
    "icon": "👥",
    "category": "marketing",
    "name": {
      "en": "Unit economics: CAC & LTV",
      "id": "Unit economics: CAC & LTV",
      "ja": "ユニットエコノミクス:CACとLTV",
      "zh": "单位经济：CAC与LTV"
    },
    "description": {
      "en": "Know what a customer costs and what they are worth.",
      "id": "Ketahui biaya memperoleh pelanggan dan nilainya.",
      "ja": "顧客獲得コストと生涯価値を把握する。",
      "zh": "了解获客成本与客户价值。"
    }
  },
  {
    "id": "marketing-funnel",
    "status": "soon",
    "icon": "🪣",
    "category": "marketing",
    "name": {
      "en": "Funnel & conversion optimization",
      "id": "Corong & optimasi konversi",
      "ja": "ファネルとコンバージョン最適化",
      "zh": "漏斗与转化优化"
    },
    "description": {
      "en": "Find the leakiest stage of the customer journey.",
      "id": "Temukan tahap paling bocor dalam perjalanan pelanggan.",
      "ja": "顧客体験の最も離脱が多い段階を見つける。",
      "zh": "找出客户旅程中流失最多的环节。"
    }
  },
  {
    "id": "kano-model",
    "status": "soon",
    "icon": "😊",
    "category": "marketing",
    "name": {
      "en": "Kano model",
      "id": "Model Kano",
      "ja": "カノモデル",
      "zh": "卡诺模型"
    },
    "description": {
      "en": "Separate must-haves from delighters.",
      "id": "Bedakan fitur wajib dari fitur yang membuat senang.",
      "ja": "必須品質と魅力品質を区別する。",
      "zh": "区分必备功能与惊喜功能。"
    }
  },
  {
    "id": "product-lifecycle",
    "status": "soon",
    "icon": "🌱",
    "category": "marketing",
    "name": {
      "en": "Product life cycle",
      "id": "Siklus hidup produk",
      "ja": "プロダクトライフサイクル",
      "zh": "产品生命周期"
    },
    "description": {
      "en": "Adapt strategy from launch to decline.",
      "id": "Sesuaikan strategi dari peluncuran hingga penurunan.",
      "ja": "導入から衰退まで戦略を適応させる。",
      "zh": "从上市到衰退持续调整战略。"
    }
  },
  {
    "id": "game-theory-price-war",
    "status": "soon",
    "icon": "♟️",
    "category": "decision-negotiation",
    "name": {
      "en": "Game theory: price war",
      "id": "Teori permainan: perang harga",
      "ja": "ゲーム理論:価格競争",
      "zh": "博弈论：价格战"
    },
    "description": {
      "en": "Prisoner's dilemma with real market payoffs.",
      "id": "Dilema tahanan dengan imbal hasil pasar nyata.",
      "ja": "囚人のジレンマを実際の市場の利得で体験する。",
      "zh": "用真实市场收益体验囚徒困境。"
    }
  },
  {
    "id": "auction-bidding",
    "status": "soon",
    "icon": "🔨",
    "category": "decision-negotiation",
    "name": {
      "en": "Auctions & bidding strategy",
      "id": "Lelang & strategi menawar",
      "ja": "オークションと入札戦略",
      "zh": "拍卖与竞标策略"
    },
    "description": {
      "en": "Avoid the winner's curse.",
      "id": "Hindari kutukan pemenang.",
      "ja": "勝者の呪いを避ける。",
      "zh": "避免赢家的诅咒。"
    }
  },
  {
    "id": "cognitive-biases",
    "status": "soon",
    "icon": "🧠",
    "category": "decision-negotiation",
    "name": {
      "en": "Cognitive bias lab",
      "id": "Laboratorium bias kognitif",
      "ja": "認知バイアス・ラボ",
      "zh": "认知偏差实验室"
    },
    "description": {
      "en": "Catch anchoring, sunk cost and overconfidence in your own choices.",
      "id": "Kenali anchoring, sunk cost, dan terlalu percaya diri dalam keputusan Anda.",
      "ja": "自分の判断にあるアンカリングやサンクコストを見抜く。",
      "zh": "识别自己决策中的锚定、沉没成本与过度自信。"
    }
  },
  {
    "id": "ahp-decision-matrix",
    "status": "soon",
    "icon": "🗂️",
    "category": "decision-negotiation",
    "name": {
      "en": "Weighted decision matrix & AHP",
      "id": "Matriks keputusan berbobot & AHP",
      "ja": "重み付け意思決定マトリクスとAHP",
      "zh": "加权决策矩阵与AHP"
    },
    "description": {
      "en": "Compare options on several criteria fairly.",
      "id": "Bandingkan opsi dengan banyak kriteria secara adil.",
      "ja": "複数の基準で選択肢を公平に比較する。",
      "zh": "按多个标准公平比较备选方案。"
    }
  },
  {
    "id": "conflict-resolution",
    "status": "soon",
    "icon": "🕊️",
    "category": "decision-negotiation",
    "name": {
      "en": "Conflict styles (Thomas-Kilmann)",
      "id": "Gaya konflik (Thomas-Kilmann)",
      "ja": "対立処理スタイル(トーマス・キルマン)",
      "zh": "冲突风格(托马斯-基尔曼)"
    },
    "description": {
      "en": "Choose when to compete, collaborate or compromise.",
      "id": "Pilih kapan bersaing, berkolaborasi, atau berkompromi.",
      "ja": "競争・協調・妥協をいつ選ぶか判断する。",
      "zh": "选择何时竞争、合作或妥协。"
    }
  },
  {
    "id": "theory-of-constraints",
    "status": "soon",
    "icon": "⛓️",
    "category": "operations",
    "name": {
      "en": "Theory of Constraints",
      "id": "Theory of Constraints",
      "ja": "制約理論(TOC)",
      "zh": "约束理论"
    },
    "description": {
      "en": "Find the bottleneck, then fix only that.",
      "id": "Temukan bottleneck, lalu perbaiki hanya itu.",
      "ja": "ボトルネックを見つけ、そこだけを改善する。",
      "zh": "找到瓶颈，只改进它。"
    }
  },
  {
    "id": "lean-six-sigma",
    "status": "soon",
    "icon": "🟢",
    "category": "operations",
    "name": {
      "en": "Lean & Six Sigma",
      "id": "Lean & Six Sigma",
      "ja": "リーンとシックスシグマ",
      "zh": "精益与六西格玛"
    },
    "description": {
      "en": "Cut waste and variation with DMAIC.",
      "id": "Kurangi pemborosan dan variasi dengan DMAIC.",
      "ja": "DMAICでムダとばらつきを減らす。",
      "zh": "用DMAIC减少浪费与波动。"
    }
  },
  {
    "id": "queueing-capacity",
    "status": "soon",
    "icon": "🚦",
    "category": "operations",
    "name": {
      "en": "Queueing & capacity planning",
      "id": "Antrean & perencanaan kapasitas",
      "ja": "待ち行列とキャパシティ計画",
      "zh": "排队与产能规划"
    },
    "description": {
      "en": "Balance service cost against waiting time.",
      "id": "Seimbangkan biaya layanan dengan waktu tunggu.",
      "ja": "サービスコストと待ち時間のバランスを取る。",
      "zh": "平衡服务成本与等待时间。"
    }
  },
  {
    "id": "supply-chain-risk",
    "status": "soon",
    "icon": "🚢",
    "category": "operations",
    "name": {
      "en": "Supply chain disruption",
      "id": "Gangguan rantai pasok",
      "ja": "サプライチェーン寸断",
      "zh": "供应链中断"
    },
    "description": {
      "en": "Build resilience before the next shock.",
      "id": "Bangun ketahanan sebelum guncangan berikutnya.",
      "ja": "次のショックに備えて強靭性を高める。",
      "zh": "在下一次冲击前提升韧性。"
    }
  },
  {
    "id": "project-crashing-pert",
    "status": "soon",
    "icon": "📆",
    "category": "operations",
    "name": {
      "en": "Project management: CPM & PERT",
      "id": "Manajemen proyek: CPM & PERT",
      "ja": "プロジェクト管理:CPMとPERT",
      "zh": "项目管理：CPM与PERT"
    },
    "description": {
      "en": "Find the critical path and decide where to crash.",
      "id": "Temukan jalur kritis dan putuskan di mana mempercepat.",
      "ja": "クリティカルパスを見つけ、短縮箇所を決める。",
      "zh": "找出关键路径并决定在哪里赶工。"
    }
  },
  {
    "id": "lean-startup",
    "status": "soon",
    "icon": "🧪",
    "category": "strategy-finance",
    "name": {
      "en": "Lean Startup: build-measure-learn",
      "id": "Lean Startup: bangun-ukur-pelajari",
      "ja": "リーンスタートアップ",
      "zh": "精益创业"
    },
    "description": {
      "en": "Test the riskiest assumption with the cheapest MVP.",
      "id": "Uji asumsi paling berisiko dengan MVP termurah.",
      "ja": "最も危険な仮説を最小のMVPで検証する。",
      "zh": "用最便宜的MVP验证风险最大的假设。"
    }
  },
  {
    "id": "business-model-canvas",
    "status": "soon",
    "icon": "🖼️",
    "category": "strategy-finance",
    "name": {
      "en": "Business Model Canvas",
      "id": "Business Model Canvas",
      "ja": "ビジネスモデルキャンバス",
      "zh": "商业模式画布"
    },
    "description": {
      "en": "Design and stress-test all nine blocks.",
      "id": "Rancang dan uji ketahanan sembilan blok.",
      "ja": "9つの要素を設計しストレステストする。",
      "zh": "设计并压力测试全部九个模块。"
    }
  },
  {
    "id": "disruptive-innovation",
    "status": "soon",
    "icon": "💥",
    "category": "strategy-finance",
    "name": {
      "en": "Disruptive innovation",
      "id": "Inovasi disruptif",
      "ja": "破壊的イノベーション",
      "zh": "颠覆性创新"
    },
    "description": {
      "en": "Why strong incumbents lose to cheaper entrants.",
      "id": "Mengapa petahana kuat kalah dari pendatang yang lebih murah.",
      "ja": "強い既存企業が安価な新規参入者に負ける理由。",
      "zh": "为何强大的在位者会输给低价新进入者。"
    }
  },
  {
    "id": "venture-term-sheet",
    "status": "soon",
    "icon": "📜",
    "category": "strategy-finance",
    "name": {
      "en": "Venture funding & term sheets",
      "id": "Pendanaan ventura & term sheet",
      "ja": "ベンチャー資金調達とタームシート",
      "zh": "风险投资与投资条款清单"
    },
    "description": {
      "en": "Negotiate dilution, valuation and control.",
      "id": "Negosiasikan dilusi, valuasi, dan kontrol.",
      "ja": "希薄化・評価額・支配権を交渉する。",
      "zh": "谈判稀释、估值与控制权。"
    }
  },
  {
    "id": "marginal-analysis",
    "status": "soon",
    "icon": "📐",
    "category": "strategy-finance",
    "name": {
      "en": "Supply, demand & marginal analysis",
      "id": "Penawaran, permintaan & analisis marjinal",
      "ja": "需給と限界分析",
      "zh": "供需与边际分析"
    },
    "description": {
      "en": "Set output where marginal cost meets marginal revenue.",
      "id": "Tetapkan output saat biaya marjinal sama dengan pendapatan marjinal.",
      "ja": "限界費用と限界収入が等しい生産量を決める。",
      "zh": "在边际成本等于边际收益处确定产量。"
    }
  },
  {
    "id": "exchange-rate-exposure",
    "status": "soon",
    "icon": "💱",
    "category": "strategy-finance",
    "name": {
      "en": "Exchange-rate exposure & hedging",
      "id": "Eksposur kurs & lindung nilai",
      "ja": "為替リスクとヘッジ",
      "zh": "汇率风险与对冲"
    },
    "description": {
      "en": "Protect margins from currency swings.",
      "id": "Lindungi margin dari gejolak kurs.",
      "ja": "為替変動から利益率を守る。",
      "zh": "保护利润率免受汇率波动影响。"
    }
  },
  {
    "id": "global-market-entry",
    "status": "soon",
    "icon": "🛬",
    "category": "strategy-finance",
    "name": {
      "en": "Global market entry modes",
      "id": "Mode masuk pasar global",
      "ja": "海外市場の参入方法",
      "zh": "全球市场进入模式"
    },
    "description": {
      "en": "Export, license, joint venture or wholly own?",
      "id": "Ekspor, lisensi, joint venture, atau milik penuh?",
      "ja": "輸出・ライセンス・合弁・完全子会社のどれか。",
      "zh": "出口、授权、合资还是独资？"
    }
  },
  {
    "id": "hofstede-culture",
    "status": "soon",
    "icon": "🗺️",
    "category": "strategy-finance",
    "name": {
      "en": "Hofstede cultural dimensions",
      "id": "Dimensi budaya Hofstede",
      "ja": "ホフステードの文化次元",
      "zh": "霍夫斯泰德文化维度"
    },
    "description": {
      "en": "Adapt management and marketing across cultures.",
      "id": "Sesuaikan manajemen dan pemasaran lintas budaya.",
      "ja": "文化に合わせて経営とマーケティングを調整する。",
      "zh": "跨文化调整管理与营销方式。"
    }
  },
  {
    "id": "kotter-change",
    "status": "soon",
    "icon": "🔥",
    "category": "leadership",
    "name": {
      "en": "Kotter's 8-step change",
      "id": "8 langkah perubahan Kotter",
      "ja": "コッターの変革8段階",
      "zh": "科特的变革八步法"
    },
    "description": {
      "en": "Lead a transformation past resistance.",
      "id": "Pimpin transformasi melewati resistensi.",
      "ja": "抵抗を乗り越えて変革を主導する。",
      "zh": "带领变革克服阻力。"
    }
  },
  {
    "id": "motivation-theories",
    "status": "soon",
    "icon": "⚡",
    "category": "leadership",
    "name": {
      "en": "Motivation theories",
      "id": "Teori motivasi",
      "ja": "動機づけ理論",
      "zh": "激励理论"
    },
    "description": {
      "en": "Maslow, Herzberg and expectancy in one team case.",
      "id": "Maslow, Herzberg, dan ekspektasi dalam satu kasus tim.",
      "ja": "マズロー・ハーズバーグ・期待理論を一つの事例で学ぶ。",
      "zh": "在同一团队案例中应用马斯洛、赫茨伯格与期望理论。"
    }
  },
  {
    "id": "tuckman-team",
    "status": "soon",
    "icon": "🏕️",
    "category": "leadership",
    "name": {
      "en": "Team development (Tuckman)",
      "id": "Perkembangan tim (Tuckman)",
      "ja": "チーム発達(タックマン)",
      "zh": "团队发展(塔克曼)"
    },
    "description": {
      "en": "Guide a team through forming, storming, norming and performing.",
      "id": "Pandu tim melewati tahap forming, storming, norming, dan performing.",
      "ja": "形成期から達成期までチームを導く。",
      "zh": "带领团队走过组建、激荡、规范与表现阶段。"
    }
  },
  {
    "id": "performance-management-okr",
    "status": "soon",
    "icon": "🏁",
    "category": "leadership",
    "name": {
      "en": "OKR & performance management",
      "id": "OKR & manajemen kinerja",
      "ja": "OKRとパフォーマンス管理",
      "zh": "OKR与绩效管理"
    },
    "description": {
      "en": "Write objectives and key results that actually steer work.",
      "id": "Susun objective dan key result yang benar-benar mengarahkan kerja.",
      "ja": "仕事を実際に導く目標と主要成果を設計する。",
      "zh": "撰写真正能指引工作的目标与关键结果。"
    }
  },
  {
    "id": "talent-retention",
    "status": "soon",
    "icon": "🧲",
    "category": "leadership",
    "name": {
      "en": "Hiring, turnover & retention",
      "id": "Rekrutmen, turnover & retensi",
      "ja": "採用・離職・定着",
      "zh": "招聘、流失与留任"
    },
    "description": {
      "en": "Count the real cost of losing people.",
      "id": "Hitung biaya nyata kehilangan karyawan.",
      "ja": "人材流出の本当のコストを計算する。",
      "zh": "核算员工流失的真实成本。"
    }
  },
  {
    "id": "csr-esg",
    "status": "soon",
    "icon": "🌿",
    "category": "indonesia-business",
    "name": {
      "en": "ESG & sustainable strategy",
      "id": "ESG & strategi berkelanjutan",
      "ja": "ESGとサステナブル戦略",
      "zh": "ESG与可持续战略"
    },
    "description": {
      "en": "Balance profit, people and planet in Indonesian firms.",
      "id": "Seimbangkan laba, manusia, dan planet pada perusahaan Indonesia.",
      "ja": "インドネシア企業で利益・人・地球のバランスを取る。",
      "zh": "在印尼企业中平衡利润、人与地球。"
    }
  },
  {
    "id": "umkm-digital",
    "status": "soon",
    "icon": "📱",
    "category": "indonesia-business",
    "name": {
      "en": "UMKM digitalization",
      "id": "Digitalisasi UMKM",
      "ja": "UMKMのデジタル化",
      "zh": "UMKM数字化"
    },
    "description": {
      "en": "Take a warung online: marketplace, QRIS and logistics.",
      "id": "Bawa warung ke dunia daring: marketplace, QRIS, dan logistik.",
      "ja": "小さな店をオンライン化：マーケットプレイス・QRIS・物流。",
      "zh": "让小店上线：电商平台、QRIS与物流。"
    }
  },
  {
    "id": "ab-testing",
    "status": "soon",
    "icon": "🔬",
    "category": "analytics",
    "name": {
      "en": "A/B testing & significance",
      "id": "Uji A/B & signifikansi",
      "ja": "A/Bテストと有意性",
      "zh": "A/B测试与显著性"
    },
    "description": {
      "en": "Know when a result is real, not luck.",
      "id": "Ketahui kapan hasil itu nyata, bukan kebetulan.",
      "ja": "結果が偶然でなく本物だと判断する。",
      "zh": "判断结果是真实的而非运气。"
    }
  },
  {
    "id": "pareto-root-cause",
    "status": "soon",
    "icon": "🎣",
    "category": "analytics",
    "name": {
      "en": "Pareto & root-cause analysis",
      "id": "Pareto & analisis akar masalah",
      "ja": "パレート分析と根本原因分析",
      "zh": "帕累托与根因分析"
    },
    "description": {
      "en": "Fix the vital few causes behind most problems.",
      "id": "Perbaiki sedikit penyebab penting di balik sebagian besar masalah.",
      "ja": "問題の大半を生む少数の原因を直す。",
      "zh": "解决造成大多数问题的少数关键原因。"
    }
  },
  {
    "id": "regression-for-managers",
    "status": "soon",
    "icon": "📈",
    "category": "analytics",
    "name": {
      "en": "Regression for managers",
      "id": "Regresi untuk manajer",
      "ja": "マネージャーのための回帰分析",
      "zh": "管理者回归分析"
    },
    "description": {
      "en": "Read a trend line and not be fooled by it.",
      "id": "Baca garis tren tanpa tertipu olehnya.",
      "ja": "傾向線を読み、だまされない。",
      "zh": "读懂趋势线而不被误导。"
    }
  },
  {
    "id": "monte-carlo-risk",
    "status": "soon",
    "icon": "🎲",
    "category": "analytics",
    "name": {
      "en": "Monte Carlo risk simulation",
      "id": "Simulasi risiko Monte Carlo",
      "ja": "モンテカルロ・リスクシミュレーション",
      "zh": "蒙特卡洛风险模拟"
    },
    "description": {
      "en": "See the full range of outcomes, not one forecast.",
      "id": "Lihat seluruh rentang hasil, bukan satu ramalan.",
      "ja": "単一の予測でなく結果の全範囲を見る。",
      "zh": "看到全部可能结果，而非单一预测。"
    }
  },
  {
    "id": "ethical-dilemmas",
    "status": "soon",
    "icon": "⚖️",
    "category": "leadership",
    "name": {
      "en": "Business ethics dilemmas",
      "id": "Dilema etika bisnis",
      "ja": "ビジネス倫理のジレンマ",
      "zh": "商业伦理困境"
    },
    "description": {
      "en": "Decide when profit and principle collide.",
      "id": "Putuskan saat laba dan prinsip bertabrakan.",
      "ja": "利益と原則が衝突する場面で決断する。",
      "zh": "在利润与原则冲突时作出决定。"
    }
  },
  {
    "id": "emotional-intelligence",
    "status": "soon",
    "icon": "💬",
    "category": "leadership",
    "name": {
      "en": "Emotional intelligence at work",
      "id": "Kecerdasan emosional di tempat kerja",
      "ja": "職場の感情知性",
      "zh": "职场情商"
    },
    "description": {
      "en": "Read the room and respond, not react.",
      "id": "Pahami situasi dan merespons, bukan bereaksi.",
      "ja": "場の空気を読み、反応でなく対応する。",
      "zh": "读懂氛围，从容回应而非冲动反应。"
    }
  }
];
