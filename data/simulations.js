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
      "en": "Multi-criteria decisions: weights, ranking, sensitivity.",
      "id": "Keputusan multikriteria: bobot, peringkat, sensitivitas.",
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
      "en": "Lead a team through six crises and reveal your DISC style.",
      "id": "Pimpin tim lewati enam krisis, temukan gaya DISC Anda.",
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
      "en": "Explore Indonesia's state-owned firms in 3D, then take a quiz.",
      "id": "Jelajahi BUMN Indonesia di dunia 3D, lalu uji lewat kuis.",
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
      "en": "1,074 practice questions across 6 courses, timed or instant.",
      "id": "1.074 soal latihan 6 mata kuliah, berwaktu atau langsung.",
      "ja": "6科目1,074問の模擬試験。時間制限つき試験と即時フィードバック練習。",
      "zh": "6门课程1,074道模拟题，限时考试或即时反馈练习。"
    }
  },
  {
    "id": "life-40",
    "status": "live",
    "icon": "⏳",
    "category": "strategy-finance",
    "name": {
      "en": "Life 40",
      "id": "Hidup 40 Tahun",
      "ja": "ライフ40：お金と時間",
      "zh": "人生40年：金钱与时间"
    },
    "description": {
      "en": "Live from 22 to 62 as rich, middle or poor. Save and invest.",
      "id": "Jalani usia 22–62 sebagai kaya, biasa, atau miskin.",
      "ja": "22歳から62歳まで生きる。貯蓄・借入・投資で時間価値を体感。",
      "zh": "从22岁活到62岁，储蓄、借贷、投资，体会货币时间价值。"
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
      "en": "NPV & budgeting",
      "id": "NPV & anggaran",
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
      "en": "Portfolio risk",
      "id": "Risiko portofolio",
      "ja": "ポートフォリオ",
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
      "id": "Harga & elastisitas",
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
      "en": "Segmentation",
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
      "en": "Run one firm in a supply chain and watch demand swings grow.",
      "id": "Jalankan satu perusahaan, lihat fluktuasi permintaan membesar.",
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
      "en": "See how hard five forces squeeze an industry. Protect profit.",
      "id": "Lihat tekanan lima kekuatan pada industri. Lindungi laba.",
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
      "en": "Van Westendorp",
      "id": "Van Westendorp",
      "ja": "価格感度測定（PSM）",
      "zh": "价格敏感度测试（PSM）"
    },
    "description": {
      "en": "Four price questions, four curves: find the accepted price range.",
      "id": "Empat pertanyaan harga: temukan rentang harga yang diterima.",
      "ja": "4つの価格質問と4本の曲線から受容価格帯を見つける。",
      "zh": "四个价格问题、四条曲线，找出可接受的价格区间。"
    }
  },
  {
    "id": "negotiation-batna",
    "status": "live",
    "icon": "🤝",
    "category": "decision-negotiation",
    "name": {
      "en": "BATNA: Patience",
      "id": "BATNA: Patience",
      "ja": "BATNA:忍耐の価格",
      "zh": "BATNA：耐心的代价"
    },
    "description": {
      "en": "12 negotiation missions: haggle, read, win or walk away.",
      "id": "12 misi negosiasi: tawar, baca lawan, menang atau pergi.",
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
      "en": "Koperasi Tycoon",
      "id": "Koperasi Tycoon",
      "ja": "協同組合：季節ごとに",
      "zh": "合作社：四季经营"
    },
    "description": {
      "en": "Run a village cooperative for 8 years and keep members' trust.",
      "id": "Kelola koperasi desa 8 tahun dan jaga kepercayaan anggota.",
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
      "en": "Situational leader",
      "id": "Pemimpin situasional",
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
      "en": "SWOT & TOWS",
      "id": "SWOT & TOWS",
      "ja": "SWOTとTOWS",
      "zh": "SWOT与TOWS"
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
      "en": "BCG matrix",
      "id": "Matriks BCG",
      "ja": "BCGマトリクス",
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
      "en": "Ansoff matrix",
      "id": "Matriks Ansoff",
      "ja": "アンゾフ・マトリクス",
      "zh": "安索夫增长矩阵"
    },
    "description": {
      "en": "Pick penetration, new markets, new products or diversification.",
      "id": "Pilih penetrasi, pasar baru, produk baru, atau diversifikasi.",
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
      "en": "Blue Ocean canvas",
      "id": "Kanvas Blue Ocean",
      "ja": "ブルー・オーシャン戦略",
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
      "en": "VRIO framework",
      "id": "Kerangka VRIO",
      "ja": "VRIO分析",
      "zh": "VRIO框架"
    },
    "description": {
      "en": "Test which resources really give a lasting edge.",
      "id": "Uji sumber daya mana yang memberi keunggulan jangka panjang.",
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
      "en": "PESTEL scan",
      "id": "Pemindaian PESTEL",
      "ja": "PESTEL環境分析",
      "zh": "PESTEL环境扫描"
    },
    "description": {
      "en": "Scan political, economic, social and legal forces first.",
      "id": "Pindai faktor politik, ekonomi, sosial, dan hukum.",
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
      "en": "Value chain",
      "id": "Rantai nilai",
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
      "en": "Link strategy to finance, customer, process and learning.",
      "id": "Hubungkan strategi ke keuangan, pelanggan, proses, belajar.",
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
      "en": "M&A synergy",
      "id": "Sinergi M&A",
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
      "en": "DCF & WACC",
      "id": "DCF & WACC",
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
      "en": "IRR vs. NPV",
      "id": "IRR vs. NPV",
      "ja": "IRRとNPVの矛盾",
      "zh": "IRR与NPV冲突"
    },
    "description": {
      "en": "See why two good rules can rank projects differently.",
      "id": "Mengapa dua kriteria bisa mengurutkan proyek berbeda.",
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
      "en": "Capital structure",
      "id": "Struktur modal",
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
      "en": "Real options",
      "id": "Opsi riil",
      "ja": "リアルオプション",
      "zh": "实物期权"
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
      "en": "Dividend vs. buyback",
      "id": "Dividen vs. buyback",
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
      "en": "Cash cycle",
      "id": "Siklus kas",
      "ja": "現金循環サイクル",
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
      "en": "Startup runway",
      "id": "Runway startup",
      "ja": "スタートアップ資金",
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
      "en": "Financial ratios",
      "id": "Rasio keuangan",
      "ja": "財務比率",
      "zh": "财务比率侦探"
    },
    "description": {
      "en": "Read liquidity, leverage and profitability from statements.",
      "id": "Baca likuiditas, leverage, dan profitabilitas laporan.",
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
      "en": "DuPont ROE",
      "id": "ROE DuPont",
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
      "en": "CVP analysis",
      "id": "Analisis CVP",
      "ja": "CVP分析",
      "zh": "CVP分析"
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
      "en": "ABC costing",
      "id": "Costing ABC",
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
      "en": "Budget variance",
      "id": "Varians anggaran",
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
      "en": "Earnings quality",
      "id": "Kualitas laba",
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
      "en": "Marketing mix 4P/7P",
      "id": "Bauran 4P / 7P",
      "ja": "マーケティングミックス",
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
      "en": "STP & positioning",
      "id": "STP & positioning",
      "ja": "STPとポジショニング",
      "zh": "STP与品牌定位"
    },
    "description": {
      "en": "Segment, target, position: win a place in the mind.",
      "id": "Segmentasi, targeting, positioning: rebut benak konsumen.",
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
      "en": "CAC & LTV",
      "id": "CAC & LTV",
      "ja": "CACとLTV",
      "zh": "CAC与LTV"
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
      "en": "Marketing funnel",
      "id": "Corong pemasaran",
      "ja": "マーケティングファネル",
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
      "en": "Price war game",
      "id": "Perang harga",
      "ja": "価格競争ゲーム",
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
      "en": "Auction bidding",
      "id": "Strategi lelang",
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
      "en": "Cognitive biases",
      "id": "Bias kognitif",
      "ja": "認知バイアス・ラボ",
      "zh": "认知偏差实验室"
    },
    "description": {
      "en": "Catch anchoring, sunk cost and overconfidence in your choices.",
      "id": "Kenali anchoring, sunk cost, dan terlalu percaya diri.",
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
      "en": "Decision matrix",
      "id": "Matriks keputusan",
      "ja": "意思決定マトリクス",
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
      "en": "Conflict styles",
      "id": "Gaya konflik",
      "ja": "対立処理スタイル",
      "zh": "冲突风格"
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
      "en": "Queueing & capacity",
      "id": "Antrean & kapasitas",
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
      "en": "Supply chain shocks",
      "id": "Gangguan pasokan",
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
      "en": "CPM & PERT",
      "id": "CPM & PERT",
      "ja": "CPMとPERT",
      "zh": "CPM与PERT"
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
      "en": "Lean Startup",
      "id": "Lean Startup",
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
      "en": "Venture term sheet",
      "id": "Term sheet ventura",
      "ja": "VCタームシート",
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
      "en": "Marginal analysis",
      "id": "Analisis marjinal",
      "ja": "需給と限界分析",
      "zh": "供需与边际分析"
    },
    "description": {
      "en": "Set output where marginal cost meets marginal revenue.",
      "id": "Tetapkan output saat biaya marjinal sama pendapatan marjinal.",
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
      "en": "FX exposure",
      "id": "Eksposur kurs",
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
      "en": "Global market entry",
      "id": "Masuk pasar global",
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
      "en": "Hofstede culture",
      "id": "Budaya Hofstede",
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
      "en": "Kotter's 8 steps",
      "id": "8 langkah Kotter",
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
      "en": "Tuckman team",
      "id": "Tahap tim Tuckman",
      "ja": "チーム発達(タックマン)",
      "zh": "团队发展(塔克曼)"
    },
    "description": {
      "en": "Guide a team through forming, storming, norming, performing.",
      "id": "Pandu tim: forming, storming, norming, performing.",
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
      "en": "OKR & performance",
      "id": "OKR & kinerja",
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
      "en": "Talent retention",
      "id": "Retensi talenta",
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
      "en": "ESG strategy",
      "id": "Strategi ESG",
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
    "status": "live",
    "icon": "🔬",
    "category": "analytics",
    "name": {
      "en": "A/B Testing Lab",
      "id": "Lab A/B Testing",
      "ja": "A/Bテスト・ラボ",
      "zh": "A/B 测试实验室"
    },
    "description": {
      "en": "8 cases from coffee to betta fish: plan, run, decide ship or keep.",
      "id": "8 kasus dari kopi sampai ikan cupang: rancang, jalankan, putuskan.",
      "ja": "コーヒーから闘魚まで8ケース：設計し、実行し、判断する。",
      "zh": "从咖啡到斗鱼 8 个案例：设计、运行、决策。"
    }
  },
  {
    "id": "pareto-root-cause",
    "status": "soon",
    "icon": "🎣",
    "category": "analytics",
    "name": {
      "en": "Pareto & root cause",
      "id": "Pareto & akar sebab",
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
      "en": "Regression basics",
      "id": "Dasar regresi",
      "ja": "回帰分析入門",
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
      "en": "Monte Carlo risk",
      "id": "Risiko Monte Carlo",
      "ja": "モンテカルロ法",
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
      "en": "Ethics dilemmas",
      "id": "Dilema etika",
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
      "en": "Emotional IQ",
      "id": "Kecerdasan emosi",
      "ja": "職場の感情知性",
      "zh": "职场情商"
    },
    "description": {
      "en": "Read the room and respond, not react.",
      "id": "Pahami situasi dan merespons, bukan bereaksi.",
      "ja": "場の空気を読み、反応でなく対応する。",
      "zh": "读懂氛围，从容回应而非冲动反应。"
    }
  },
  {
    "id": "financial-mgmt-objectives",
    "status": "soon",
    "icon": "🏦",
    "category": "strategy-finance",
    "name": {
      "en": "Finance objectives",
      "id": "Tujuan keuangan",
      "ja": "財務管理の機能と目的",
      "zh": "财务管理的职能与目标"
    },
    "description": {
      "en": "Why the goal is shareholder value, not just profit.",
      "id": "Mengapa tujuannya nilai pemegang saham, bukan sekadar laba.",
      "ja": "目標が利益だけでなく株主価値である理由。",
      "zh": "为何目标是股东价值而不只是利润。"
    }
  },
  {
    "id": "financial-statement-analysis",
    "status": "soon",
    "icon": "📒",
    "category": "strategy-finance",
    "name": {
      "en": "Financial statements",
      "id": "Laporan keuangan",
      "ja": "財務三表の読み方",
      "zh": "解读三大财务报表"
    },
    "description": {
      "en": "Connect the income statement, balance sheet and cash flow.",
      "id": "Hubungkan laba rugi, neraca, dan arus kas.",
      "ja": "損益計算書・貸借対照表・キャッシュフローを結びつける。",
      "zh": "把利润表、资产负债表与现金流量表联系起来。"
    }
  },
  {
    "id": "financial-projections",
    "status": "soon",
    "icon": "🔭",
    "category": "strategy-finance",
    "name": {
      "en": "Pro forma",
      "id": "Proyeksi pro forma",
      "ja": "予測財務諸表",
      "zh": "预测财务报表"
    },
    "description": {
      "en": "Forecast statements from sales growth and assumptions.",
      "id": "Proyeksikan laporan dari pertumbuhan penjualan dan asumsi.",
      "ja": "売上成長と前提から財務諸表を予測する。",
      "zh": "根据销售增长与假设预测报表。"
    }
  },
  {
    "id": "management-accounting",
    "status": "soon",
    "icon": "🧮",
    "category": "strategy-finance",
    "name": {
      "en": "Management accounting",
      "id": "Akuntansi manajemen",
      "ja": "管理会計の基礎",
      "zh": "管理会计基础"
    },
    "description": {
      "en": "Use cost data to run the business day to day.",
      "id": "Gunakan data biaya untuk menjalankan bisnis sehari-hari.",
      "ja": "原価データを日々の経営に活かす。",
      "zh": "用成本数据支持日常经营。"
    }
  },
  {
    "id": "time-value-of-money",
    "status": "soon",
    "icon": "⏳",
    "category": "strategy-finance",
    "name": {
      "en": "Time value of money",
      "id": "Nilai waktu uang",
      "ja": "貨幣の時間価値",
      "zh": "货币时间价值"
    },
    "description": {
      "en": "Compound, discount and compare cash across time.",
      "id": "Majemuk, diskonto, dan bandingkan kas lintas waktu.",
      "ja": "複利・割引で異なる時点の現金を比較する。",
      "zh": "通过复利与折现比较不同时点的现金。"
    }
  },
  {
    "id": "financing-environment",
    "status": "soon",
    "icon": "🏛️",
    "category": "strategy-finance",
    "name": {
      "en": "Financing decisions",
      "id": "Keputusan pendanaan",
      "ja": "資金調達の意思決定",
      "zh": "融资决策与金融环境"
    },
    "description": {
      "en": "Banks, markets and rates: where firms raise money.",
      "id": "Bank, pasar, dan suku bunga: dari mana perusahaan mendapat dana.",
      "ja": "銀行・市場・金利：企業の資金調達先。",
      "zh": "银行、市场与利率：企业从哪里融资。"
    }
  },
  {
    "id": "working-capital",
    "status": "soon",
    "icon": "🚰",
    "category": "strategy-finance",
    "name": {
      "en": "Working capital",
      "id": "Modal kerja",
      "ja": "運転資本管理",
      "zh": "营运资本管理"
    },
    "description": {
      "en": "Keep cash, receivables and payables flowing.",
      "id": "Jaga kas, piutang, dan utang usaha tetap mengalir.",
      "ja": "現金・売掛金・買掛金を円滑に回す。",
      "zh": "保持现金、应收与应付款顺畅流动。"
    }
  },
  {
    "id": "risk-return-concepts",
    "status": "soon",
    "icon": "🎢",
    "category": "strategy-finance",
    "name": {
      "en": "Risk & return",
      "id": "Risiko & imbal hasil",
      "ja": "リスクとリターン",
      "zh": "风险与风险收益关系"
    },
    "description": {
      "en": "Define risk and see why higher return needs higher risk.",
      "id": "Pahami mengapa imbal hasil tinggi butuh risiko tinggi.",
      "ja": "リスクを定義し、高リターンに高リスクが伴う理由を知る。",
      "zh": "定义风险，理解高收益为何伴随高风险。"
    }
  },
  {
    "id": "capital-budgeting-cases",
    "status": "soon",
    "icon": "🏭",
    "category": "strategy-finance",
    "name": {
      "en": "Budgeting cases",
      "id": "Kasus anggaran modal",
      "ja": "資本予算ケースラボ",
      "zh": "资本预算案例实验室"
    },
    "description": {
      "en": "Payback, NPV and IRR on real investment cases.",
      "id": "Payback, NPV, dan IRR pada kasus investasi nyata.",
      "ja": "実際の投資案件で回収期間・NPV・IRRを試す。",
      "zh": "在真实投资案例中运用回收期、NPV与IRR。"
    }
  },
  {
    "id": "creating-customer-value",
    "status": "soon",
    "icon": "💝",
    "category": "marketing",
    "name": {
      "en": "Customer value",
      "id": "Nilai pelanggan",
      "ja": "顧客価値の創造",
      "zh": "创造客户价值"
    },
    "description": {
      "en": "Turn customer needs into an offer worth paying for.",
      "id": "Ubah kebutuhan pelanggan menjadi tawaran yang layak dibayar.",
      "ja": "顧客ニーズを対価に値する提案に変える。",
      "zh": "把客户需求转化为值得付费的产品。"
    }
  },
  {
    "id": "marketing-environment",
    "status": "soon",
    "icon": "🌦️",
    "category": "marketing",
    "name": {
      "en": "Marketing environment",
      "id": "Lingkungan pemasaran",
      "ja": "マーケティング環境の分析",
      "zh": "分析营销环境"
    },
    "description": {
      "en": "Separate the micro and macro forces that shape demand.",
      "id": "Pisahkan kekuatan mikro dan makro yang membentuk permintaan.",
      "ja": "需要を左右するミクロ・マクロ要因を切り分ける。",
      "zh": "区分影响需求的微观与宏观力量。"
    }
  },
  {
    "id": "marketing-insights",
    "status": "soon",
    "icon": "💡",
    "category": "marketing",
    "name": {
      "en": "Customer insights",
      "id": "Wawasan pelanggan",
      "ja": "顧客インサイト",
      "zh": "营销信息与客户洞察"
    },
    "description": {
      "en": "Turn raw data into insight a manager can act on.",
      "id": "Ubah data mentah menjadi wawasan yang bisa ditindaklanjuti.",
      "ja": "生データを行動につながるインサイトに変える。",
      "zh": "把原始数据变成可行动的洞察。"
    }
  },
  {
    "id": "marketing-research",
    "status": "soon",
    "icon": "📋",
    "category": "marketing",
    "name": {
      "en": "Marketing research",
      "id": "Riset pemasaran",
      "ja": "マーケティングリサーチ",
      "zh": "市场调研"
    },
    "description": {
      "en": "Design a survey, sample and read the answers.",
      "id": "Rancang survei, ambil sampel, dan baca jawabannya.",
      "ja": "調査を設計し、標本を取り、回答を読む。",
      "zh": "设计问卷、抽样并解读结果。"
    }
  },
  {
    "id": "selling-race",
    "status": "soon",
    "icon": "🏁",
    "category": "marketing",
    "name": {
      "en": "Game: Selling Race",
      "id": "Game: Selling Race",
      "ja": "ゲーム:セリング・レース",
      "zh": "游戏：销售竞赛"
    },
    "description": {
      "en": "Outsell rival teams round by round.",
      "id": "Kalahkan tim pesaing ronde demi ronde.",
      "ja": "ラウンドごとにライバルチームと売上を競う。",
      "zh": "逐轮与对手团队比拼销量。"
    }
  },
  {
    "id": "product-service-mix",
    "status": "soon",
    "icon": "📦",
    "category": "marketing",
    "name": {
      "en": "Product & services",
      "id": "Produk & jasa",
      "ja": "製品とサービス",
      "zh": "营销组合：产品与服务"
    },
    "description": {
      "en": "Design the core offer, features and service layers.",
      "id": "Rancang tawaran inti, fitur, dan lapisan layanan.",
      "ja": "中核提案・機能・サービス層を設計する。",
      "zh": "设计核心产品、功能与服务层次。"
    }
  },
  {
    "id": "price-setting",
    "status": "soon",
    "icon": "🏷️",
    "category": "marketing",
    "name": {
      "en": "Price setting",
      "id": "Penetapan harga",
      "ja": "価格設定",
      "zh": "营销组合：定价"
    },
    "description": {
      "en": "Cost-plus, value-based or competitive pricing.",
      "id": "Harga berbasis biaya, nilai, atau pesaing.",
      "ja": "コストプラス・価値・競争ベースの価格設定。",
      "zh": "成本加成、价值导向或竞争导向定价。"
    }
  },
  {
    "id": "place-digital-channels",
    "status": "soon",
    "icon": "🛒",
    "category": "marketing",
    "name": {
      "en": "Channels & digital",
      "id": "Saluran & digital",
      "ja": "流通とデジタル",
      "zh": "营销组合：渠道与数字营销"
    },
    "description": {
      "en": "Pick where and how customers buy, online and offline.",
      "id": "Pilih di mana dan bagaimana pelanggan membeli, daring dan luring.",
      "ja": "オンライン・オフラインで顧客がどこでどう買うかを選ぶ。",
      "zh": "选择线上线下客户的购买地点与方式。"
    }
  },
  {
    "id": "promotion-imc",
    "status": "soon",
    "icon": "📣",
    "category": "marketing",
    "name": {
      "en": "Promotion & IMC",
      "id": "Promosi & IMC",
      "ja": "プロモーションとIMC",
      "zh": "促销与IMC"
    },
    "description": {
      "en": "Blend ads, PR, sales and social into one message.",
      "id": "Padukan iklan, PR, penjualan, dan media sosial dalam satu pesan.",
      "ja": "広告・PR・営業・SNSを一つのメッセージに統合する。",
      "zh": "将广告、公关、销售与社交融为统一信息。"
    }
  },
  {
    "id": "branding",
    "status": "soon",
    "icon": "🎨",
    "category": "marketing",
    "name": {
      "en": "Branding",
      "id": "Branding",
      "ja": "ブランディング",
      "zh": "品牌建设"
    },
    "description": {
      "en": "Build brand equity that supports a price premium.",
      "id": "Bangun ekuitas merek yang menopang harga premium.",
      "ja": "価格プレミアムを支えるブランド資産を築く。",
      "zh": "打造支撑溢价的品牌资产。"
    }
  },
  {
    "id": "operations-strategy",
    "status": "soon",
    "icon": "♟️",
    "category": "operations",
    "name": {
      "en": "Operations strategy",
      "id": "Strategi operasi",
      "ja": "オペレーション戦略",
      "zh": "运营战略"
    },
    "description": {
      "en": "Choose cost, quality, speed or flexibility as the edge.",
      "id": "Pilih biaya, kualitas, kecepatan, atau fleksibilitas.",
      "ja": "コスト・品質・速度・柔軟性のどれで勝つか選ぶ。",
      "zh": "选择成本、质量、速度或灵活性作为优势。"
    }
  },
  {
    "id": "product-service-design",
    "status": "soon",
    "icon": "📐",
    "category": "operations",
    "name": {
      "en": "Product design",
      "id": "Desain produk",
      "ja": "製品・サービス設計",
      "zh": "产品与服务设计"
    },
    "description": {
      "en": "Design for customers, cost and manufacturability.",
      "id": "Rancang untuk pelanggan, biaya, dan kemudahan produksi.",
      "ja": "顧客・コスト・作りやすさを考えて設計する。",
      "zh": "兼顾客户、成本与可制造性的设计。"
    }
  },
  {
    "id": "project-management",
    "status": "soon",
    "icon": "🗓️",
    "category": "operations",
    "name": {
      "en": "Project management",
      "id": "Manajemen proyek",
      "ja": "プロジェクト管理の基礎",
      "zh": "项目管理基础"
    },
    "description": {
      "en": "Scope, schedule, cost and risk of a project.",
      "id": "Lingkup, jadwal, biaya, dan risiko proyek.",
      "ja": "プロジェクトの範囲・日程・コスト・リスク。",
      "zh": "项目的范围、进度、成本与风险。"
    }
  },
  {
    "id": "strategic-capacity",
    "status": "soon",
    "icon": "🏗️",
    "category": "operations",
    "name": {
      "en": "Capacity strategy",
      "id": "Kapasitas strategis",
      "ja": "戦略的キャパシティ計画",
      "zh": "战略产能规划"
    },
    "description": {
      "en": "Decide how much capacity to build, and when.",
      "id": "Putuskan seberapa besar kapasitas dan kapan dibangun.",
      "ja": "どれだけの設備をいつ作るかを決める。",
      "zh": "决定建设多少产能以及何时建设。"
    }
  },
  {
    "id": "process-design",
    "status": "soon",
    "icon": "⚙️",
    "category": "operations",
    "name": {
      "en": "Process design",
      "id": "Desain proses",
      "ja": "プロセス設計と分析",
      "zh": "流程设计与分析"
    },
    "description": {
      "en": "Map a process, find waste and measure cycle time.",
      "id": "Petakan proses, temukan pemborosan, dan ukur waktu siklus.",
      "ja": "工程を可視化し、ムダとサイクルタイムを測る。",
      "zh": "绘制流程，找出浪费并测量周期时间。"
    }
  },
  {
    "id": "lean-operations",
    "status": "soon",
    "icon": "🍃",
    "category": "operations",
    "name": {
      "en": "Lean operations",
      "id": "Operasi lean",
      "ja": "リーンオペレーション",
      "zh": "精益运营"
    },
    "description": {
      "en": "Pull, flow and kaizen: remove the seven wastes.",
      "id": "Pull, flow, dan kaizen: hapus tujuh jenis pemborosan.",
      "ja": "プル・フロー・改善で7つのムダを取り除く。",
      "zh": "拉动、流动与改善：消除七大浪费。"
    }
  },
  {
    "id": "statistical-quality-control",
    "status": "soon",
    "icon": "📉",
    "category": "operations",
    "name": {
      "en": "Quality control",
      "id": "Kontrol kualitas",
      "ja": "統計的品質管理",
      "zh": "统计质量控制"
    },
    "description": {
      "en": "Control charts that tell noise from a real problem.",
      "id": "Peta kendali yang membedakan gangguan acak dari masalah nyata.",
      "ja": "ばらつきと本当の異常を見分ける管理図。",
      "zh": "区分随机波动与真实问题的控制图。"
    }
  },
  {
    "id": "sales-operations-planning",
    "status": "soon",
    "icon": "🔁",
    "category": "operations",
    "name": {
      "en": "S&OP planning",
      "id": "Perencanaan S&OP",
      "ja": "販売・生産計画(S&OP)",
      "zh": "S&OP计划"
    },
    "description": {
      "en": "Align demand, supply and finance in one monthly plan.",
      "id": "Selaraskan permintaan, pasokan, dan keuangan sebulan.",
      "ja": "需要・供給・財務を一つの月次計画に揃える。",
      "zh": "把需求、供应与财务统一到月度计划中。"
    }
  },
  {
    "id": "mrp-erp",
    "status": "soon",
    "icon": "🗃️",
    "category": "operations",
    "name": {
      "en": "MRP & ERP",
      "id": "MRP & ERP",
      "ja": "MRPとERP",
      "zh": "MRP与ERP"
    },
    "description": {
      "en": "Explode a bill of materials into an order schedule.",
      "id": "Uraikan bill of materials menjadi jadwal pemesanan.",
      "ja": "部品表から発注計画を展開する。",
      "zh": "把物料清单分解为订货计划。"
    }
  },
  {
    "id": "rational-decision-framework",
    "status": "soon",
    "icon": "🧭",
    "category": "decision-negotiation",
    "name": {
      "en": "Rational decisions",
      "id": "Keputusan rasional",
      "ja": "合理的意思決定の枠組み",
      "zh": "理性决策框架"
    },
    "description": {
      "en": "Define, generate, evaluate, choose and review.",
      "id": "Definisikan, buat opsi, evaluasi, pilih, dan tinjau.",
      "ja": "定義・案出し・評価・選択・振り返り。",
      "zh": "界定、生成方案、评估、选择与复盘。"
    }
  },
  {
    "id": "kepner-tregoe",
    "status": "soon",
    "icon": "🔦",
    "category": "decision-negotiation",
    "name": {
      "en": "Kepner-Tregoe",
      "id": "Kepner-Tregoe",
      "ja": "ケプナー・トリゴー",
      "zh": "凯普纳-特雷戈分析"
    },
    "description": {
      "en": "Separate musts and wants, then weigh the risks.",
      "id": "Pisahkan syarat wajib dan keinginan, lalu timbang risikonya.",
      "ja": "必須条件と希望条件を分けリスクを評価する。",
      "zh": "区分必要条件与期望条件并权衡风险。"
    }
  },
  {
    "id": "smart-method",
    "status": "soon",
    "icon": "🎯",
    "category": "decision-negotiation",
    "name": {
      "en": "SMART method",
      "id": "Metode SMART",
      "ja": "意思決定分析:SMART",
      "zh": "决策分析：SMART"
    },
    "description": {
      "en": "Score options on weighted criteria.",
      "id": "Beri skor opsi pada kriteria berbobot.",
      "ja": "重み付き基準で選択肢を採点する。",
      "zh": "按加权标准给方案打分。"
    }
  },
  {
    "id": "decision-tree-ev",
    "status": "live",
    "icon": "🌳",
    "category": "decision-negotiation",
    "name": {
      "en": "Decision Tree Studio",
      "id": "Studio Pohon Keputusan",
      "ja": "決定木スタジオ",
      "zh": "决策树工作室"
    },
    "description": {
      "en": "Draw choices and chances, roll back the numbers, test the odds.",
      "id": "Gambar pilihan dan peluang, hitung mundur angkanya, uji probabilitasnya.",
      "ja": "選択と偶然を描き、数字を巻き戻して確率を試す。",
      "zh": "绘制选择与机会，倒推数值，检验概率。"
    }
  },
  {
    "id": "scenario-planning",
    "status": "soon",
    "icon": "🌅",
    "category": "decision-negotiation",
    "name": {
      "en": "Scenario planning",
      "id": "Perencanaan skenario",
      "ja": "シナリオプランニング",
      "zh": "情景规划"
    },
    "description": {
      "en": "Prepare for several futures, not one forecast.",
      "id": "Bersiap untuk beberapa masa depan, bukan satu ramalan.",
      "ja": "一つの予測でなく複数の未来に備える。",
      "zh": "为多种未来做准备，而非单一预测。"
    }
  },
  {
    "id": "systems-thinking",
    "status": "soon",
    "icon": "🕸️",
    "category": "decision-negotiation",
    "name": {
      "en": "Systems thinking",
      "id": "Berpikir sistem",
      "ja": "システム思考",
      "zh": "系统思考"
    },
    "description": {
      "en": "Loops, delays and unintended consequences.",
      "id": "Loop, jeda, dan konsekuensi yang tidak disengaja.",
      "ja": "ループ・遅れ・意図せぬ結果を読み解く。",
      "zh": "反馈环、延迟与意外后果。"
    }
  },
  {
    "id": "negotiation-dilemma",
    "status": "soon",
    "icon": "🪤",
    "category": "decision-negotiation",
    "name": {
      "en": "Negotiator's dilemma",
      "id": "Dilema negosiator",
      "ja": "交渉者のジレンマ",
      "zh": "谈判者的困境"
    },
    "description": {
      "en": "Create value together or claim it alone?",
      "id": "Menciptakan nilai bersama atau mengklaimnya sendiri?",
      "ja": "価値を共に創るか、独り占めするか。",
      "zh": "共同创造价值还是独自攫取？"
    }
  },
  {
    "id": "negotiation-style",
    "status": "soon",
    "icon": "🦊",
    "category": "decision-negotiation",
    "name": {
      "en": "Negotiation style",
      "id": "Gaya negosiasi",
      "ja": "自分の交渉スタイルを知る",
      "zh": "了解你的谈判风格"
    },
    "description": {
      "en": "Find your default style and when to switch.",
      "id": "Temukan gaya bawaan Anda dan kapan harus berganti.",
      "ja": "自分の標準スタイルと切り替え時を知る。",
      "zh": "发现你的默认风格及何时切换。"
    }
  },
  {
    "id": "claiming-value",
    "status": "soon",
    "icon": "🍰",
    "category": "decision-negotiation",
    "name": {
      "en": "Slicing the pie",
      "id": "Membagi kue",
      "ja": "価値の獲得:パイの分け方",
      "zh": "价值分配：分蛋糕"
    },
    "description": {
      "en": "Anchors, reservation points and the zone of agreement.",
      "id": "Anchor, titik batas, dan zona kesepakatan.",
      "ja": "アンカー・留保価格・合意可能領域。",
      "zh": "锚点、底线与协议区间。"
    }
  },
  {
    "id": "distributive-integrative",
    "status": "soon",
    "icon": "🔀",
    "category": "decision-negotiation",
    "name": {
      "en": "Win-win negotiation",
      "id": "Negosiasi win-win",
      "ja": "分配型から統合型交渉へ",
      "zh": "从分配型到整合型谈判"
    },
    "description": {
      "en": "Trade what you value less for what you value more.",
      "id": "Tukar yang kurang berharga dengan yang lebih berharga.",
      "ja": "重要度の低いものと高いものを交換する。",
      "zh": "用次要利益交换重要利益。"
    }
  },
  {
    "id": "integrative-negotiation-technique",
    "status": "soon",
    "icon": "🧩",
    "category": "decision-negotiation",
    "name": {
      "en": "Integrative deals",
      "id": "Negosiasi integratif",
      "ja": "統合型交渉のテクニック",
      "zh": "整合型谈判技巧"
    },
    "description": {
      "en": "Logrolling, bridging and packaging for win-win deals.",
      "id": "Logrolling, bridging, dan packaging untuk menang-menang.",
      "ja": "ログローリング等でWin-Winの合意を作る。",
      "zh": "互惠让步、搭桥与打包促成双赢。"
    }
  },
  {
    "id": "multiparty-negotiation",
    "status": "soon",
    "icon": "👥",
    "category": "decision-negotiation",
    "name": {
      "en": "Multiparty deals",
      "id": "Negosiasi multipihak",
      "ja": "多者間交渉",
      "zh": "多方谈判"
    },
    "description": {
      "en": "Coalitions, agendas and consensus among many parties.",
      "id": "Koalisi, agenda, dan konsensus di antara banyak pihak.",
      "ja": "多数の当事者間の連合・議題・合意形成。",
      "zh": "多方之间的联盟、议程与共识。"
    }
  },
  {
    "id": "data-literacy",
    "status": "soon",
    "icon": "🗂️",
    "category": "analytics",
    "name": {
      "en": "Data literacy",
      "id": "Literasi data",
      "ja": "データとの付き合い方",
      "zh": "如何处理数据"
    },
    "description": {
      "en": "Clean, question and sanity-check data before using it.",
      "id": "Bersihkan, pertanyakan, dan periksa data sebelum dipakai.",
      "ja": "使う前にデータを整え、疑い、検証する。",
      "zh": "使用前清洗、质疑并检验数据。"
    }
  },
  {
    "id": "descriptive-diagnostic",
    "status": "soon",
    "icon": "🔎",
    "category": "analytics",
    "name": {
      "en": "Descriptive analytics",
      "id": "Analitik deskriptif",
      "ja": "記述・診断分析",
      "zh": "描述性与诊断性分析"
    },
    "description": {
      "en": "What happened, and why did it happen?",
      "id": "Apa yang terjadi, dan mengapa terjadi?",
      "ja": "何が起き、なぜ起きたのか。",
      "zh": "发生了什么，为什么发生？"
    }
  },
  {
    "id": "predictive-analytics",
    "status": "soon",
    "icon": "🔮",
    "category": "analytics",
    "name": {
      "en": "Predictive analytics",
      "id": "Analitik prediktif",
      "ja": "予測アナリティクス",
      "zh": "预测性分析"
    },
    "description": {
      "en": "Forecast what is likely to happen next.",
      "id": "Perkirakan apa yang mungkin terjadi berikutnya.",
      "ja": "次に起こりそうなことを予測する。",
      "zh": "预测接下来可能发生什么。"
    }
  },
  {
    "id": "prescriptive-analytics",
    "status": "soon",
    "icon": "💊",
    "category": "analytics",
    "name": {
      "en": "Prescriptive models",
      "id": "Analitik preskriptif",
      "ja": "処方的アナリティクス",
      "zh": "规范性分析"
    },
    "description": {
      "en": "Optimize: what should we do about it?",
      "id": "Optimalkan: apa yang harus kita lakukan?",
      "ja": "最適化：どう対処すべきか。",
      "zh": "优化：我们该怎么做？"
    }
  },
  {
    "id": "marketing-analytics",
    "status": "soon",
    "icon": "📱",
    "category": "analytics",
    "name": {
      "en": "Marketing analytics",
      "id": "Analitik pemasaran",
      "ja": "マーケ分析",
      "zh": "营销分析"
    },
    "description": {
      "en": "Attribution, churn and campaign ROI.",
      "id": "Atribusi, churn, dan ROI kampanye.",
      "ja": "アトリビューション・解約・施策ROI。",
      "zh": "归因、流失与营销活动ROI。"
    }
  },
  {
    "id": "finance-analytics",
    "status": "soon",
    "icon": "💹",
    "category": "analytics",
    "name": {
      "en": "Finance analytics",
      "id": "Analitik keuangan",
      "ja": "財務分析",
      "zh": "金融分析"
    },
    "description": {
      "en": "Credit scoring, fraud flags and forecasting cash.",
      "id": "Penilaian kredit, deteksi fraud, dan proyeksi kas.",
      "ja": "与信スコア・不正検知・資金予測。",
      "zh": "信用评分、欺诈预警与现金预测。"
    }
  },
  {
    "id": "operations-analytics",
    "status": "soon",
    "icon": "🏗️",
    "category": "analytics",
    "name": {
      "en": "Operations analytics",
      "id": "Analitik operasi",
      "ja": "オペレーション分析",
      "zh": "运营分析"
    },
    "description": {
      "en": "Use data to cut delays, stockouts and downtime.",
      "id": "Kurangi keterlambatan, stok habis, dan downtime dengan data.",
      "ja": "データで遅延・欠品・停止を減らす。",
      "zh": "用数据减少延误、缺货与停机。"
    }
  },
  {
    "id": "people-analytics",
    "status": "soon",
    "icon": "🧑‍💼",
    "category": "analytics",
    "name": {
      "en": "People analytics",
      "id": "Analitik SDM",
      "ja": "ピープル・アナリティクス",
      "zh": "人才分析"
    },
    "description": {
      "en": "Data on hiring, engagement and attrition.",
      "id": "Data rekrutmen, keterlibatan, dan pengunduran diri.",
      "ja": "採用・エンゲージメント・離職のデータ。",
      "zh": "招聘、敬业度与离职数据。"
    }
  },
  {
    "id": "big-data-analytics",
    "status": "soon",
    "icon": "🛰️",
    "category": "analytics",
    "name": {
      "en": "Big data analytics",
      "id": "Analitik big data",
      "ja": "ビッグデータ分析",
      "zh": "大数据分析"
    },
    "description": {
      "en": "Handle volume, velocity and variety of data.",
      "id": "Menangani volume, kecepatan, dan variasi data.",
      "ja": "データの量・速度・多様性を扱う。",
      "zh": "处理海量、高速与多样的数据。"
    }
  },
  {
    "id": "deep-learning",
    "status": "soon",
    "icon": "🧠",
    "category": "analytics",
    "name": {
      "en": "Deep learning",
      "id": "Deep learning",
      "ja": "ディープラーニング",
      "zh": "商业深度学习"
    },
    "description": {
      "en": "Neural networks: where they help and where they don't.",
      "id": "Jaringan saraf: di mana berguna dan di mana tidak.",
      "ja": "ニューラルネットが役立つ場面と限界。",
      "zh": "神经网络：何时有用、何时无用。"
    }
  },
  {
    "id": "generative-ai-business",
    "status": "soon",
    "icon": "✨",
    "category": "analytics",
    "name": {
      "en": "Generative AI",
      "id": "AI generatif",
      "ja": "生成AI活用",
      "zh": "管理者的生成式AI"
    },
    "description": {
      "en": "Use LLMs for real work and spot their limits.",
      "id": "Gunakan LLM untuk pekerjaan nyata dan kenali batasnya.",
      "ja": "LLMを実務で使い限界を見抜く。",
      "zh": "在实际工作中运用大模型并识别其局限。"
    }
  },
  {
    "id": "ai-governance",
    "status": "live",
    "icon": "🛡️",
    "category": "analytics",
    "name": {
      "en": "AI Governance Lab",
      "id": "Lab Tata Kelola AI",
      "ja": "AIガバナンス・ラボ",
      "zh": "AI 治理实验室"
    },
    "description": {
      "en": "8 AI cases: rate the risk, choose controls, run 12 months.",
      "id": "8 kasus AI: nilai risiko, pilih kontrol, jalankan 12 bulan.",
      "ja": "AI 8ケース：リスク評価、対策選択、12か月を実行。",
      "zh": "8 个 AI 案例：评估风险、选择措施、运行 12 个月。"
    }
  }
];
