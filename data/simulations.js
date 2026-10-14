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
    "developer": "FauzanIkromi (FullCycle)",
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
      "en": "Play the buyer against four sellers. Haggle, read, win or walk.",
      "id": "Jadi pembeli melawan empat penjual. Tawar, baca lawan, menang atau pergi.",
      "ja": "買い手として4人の売り手と対決。駆け引きし、読み、勝つか去るか。",
      "zh": "扮演买方对战四位卖家。砍价、读人，赢下或离场。"
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
  }
];
