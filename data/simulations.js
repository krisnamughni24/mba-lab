/* Simulation registry: one entry per simulation, shown in the catalog.
   status "live"  -> opens a microsite from simulations/<id>/ (loaded on demand: scripts + styles listed below)
   status "soon"  -> shown as "Coming soon", no files needed yet.
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
    },
    "path": "simulations/smart-decision-studio/",
    "scripts": [
      "strings.js",
      "template.js",
      "app.js"
    ],
    "styles": [
      "style.css"
    ]
  },
  {
    "id": "break-even-analysis",
    "status": "soon",
    "icon": "📈",
    "category": "strategy-finance",
    "name": {
      "en": "Break-even Analysis",
      "id": "Analisis Titik Impas",
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
      "en": "NPV & Capital Budgeting",
      "id": "NPV & Penganggaran Modal",
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
      "en": "Porter's Five Forces",
      "id": "Lima Kekuatan Porter",
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
      "en": "Portfolio Risk–Return",
      "id": "Risiko–Imbal Hasil Portofolio",
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
      "en": "Pricing & Elasticity",
      "id": "Penetapan Harga & Elastisitas",
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
      "en": "Market Segmentation",
      "id": "Segmentasi Pasar",
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
    "status": "soon",
    "icon": "🔗",
    "category": "operations",
    "name": {
      "en": "Bullwhip Effect",
      "id": "Efek Bullwhip",
      "ja": "ブルウィップ効果",
      "zh": "牛鞭效应"
    },
    "description": {
      "en": "See how demand swings amplify along a supply chain.",
      "id": "Lihat bagaimana fluktuasi permintaan membesar sepanjang rantai pasok.",
      "ja": "需要の変動がサプライチェーンで増幅する様子を確認。",
      "zh": "观察需求波动如何沿供应链逐级放大。"
    }
  },
  {
    "id": "negotiation-batna",
    "status": "soon",
    "icon": "🤝",
    "category": "decision-negotiation",
    "name": {
      "en": "Negotiation & BATNA",
      "id": "Negosiasi & BATNA",
      "ja": "交渉とBATNA",
      "zh": "谈判与 BATNA"
    },
    "description": {
      "en": "Find the zone of possible agreement.",
      "id": "Temukan zona kesepakatan yang mungkin.",
      "ja": "合意可能領域を見つける。",
      "zh": "寻找可能达成协议的区间。"
    }
  },
  {
    "id": "demand-forecasting",
    "status": "soon",
    "icon": "📊",
    "category": "analytics",
    "name": {
      "en": "Demand Forecasting",
      "id": "Peramalan Permintaan",
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
      "en": "Situational Leadership",
      "id": "Kepemimpinan Situasional",
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
