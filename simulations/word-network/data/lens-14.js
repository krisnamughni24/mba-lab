/* Word Network: curated concepts, batch 14 (customer service, products and people management). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('chatbot support', 'Chatbot customer service|Layanan pelanggan chatbot|チャットボット対応|聊天机器人客服', ['human support'], [
      I('eff', 'retail,biz,fin', 'fast', 3, 'Instant, 24/7 answers|Jawaban instan 24/7|24時間即答|全天候即时回复', 'No waiting for office hours.|Tanpa menunggu jam kerja.|営業時間を待たなくていい。|无需等待上班时间。'),
      I('val', 'retail,biz', 'save', 3, 'Lower cost|Biaya lebih rendah|コスト削減|成本更低', 'One bot handles thousands of chats.|Satu bot menangani ribuan percakapan.|1つのボットが数千件をさばく。|一个机器人处理数千对话。'),
      I('cap', 'biz,retail', 'steady', 2, 'Consistent answers|Jawaban konsisten|回答の均一性|回答一致', 'Same quality every time.|Mutu sama setiap kali.|いつも同じ品質。|每次质量一致。'),
      I('cap', 'biz,retail', 'data', 2, 'Learns from conversations|Belajar dari percakapan|会話から学習|从对话中学习', 'Common problems show up in data.|Masalah umum terlihat dari data.|よくある問題が、データで分かる。|常见问题在数据中显现。')
    ], [
      I('ppl', 'retail,fam', 'anger', 3, 'Frustrating for complex cases|Menjengkelkan untuk kasus rumit|複雑な問い合わせで不満|复杂问题令人恼火', 'Customers get stuck in loops.|Pelanggan terjebak dalam putaran.|堂々巡りに陥る。|客户陷入循环。'),
      I('mkt', 'retail,biz', 'distance', 2, 'No human warmth|Tanpa kehangatan manusia|人間味がない|缺乏人情味', 'Sensitive issues need empathy.|Masalah sensitif butuh empati.|繊細な問題には、共感が要る。|敏感问题需要共情。'),
      I('risk', 'biz,fin', 'mistake', 2, 'Wrong answers|Jawaban salah|誤った回答|错误回答', 'Bots can invent facts.|Bot bisa mengarang fakta.|ボットが、事実を作ってしまうことがある。|机器人可能编造事实。'),
      I('ppl', 'biz,retail', 'job', 2, 'Replaces support jobs|Menggantikan pekerjaan dukungan|サポート職の置き換え|取代客服岗位', 'Staff fear redundancy.|Staf takut diberhentikan.|担当者が、解雇を恐れる。|员工担心被裁。')
    ]),
    C('human support', 'Human customer service|Layanan pelanggan oleh manusia|人による顧客対応|人工客服', ['chatbot support'], [
      I('ppl', 'retail,health,fin', 'trust', 3, 'Empathy and judgement|Empati dan penilaian|共感と判断力|共情与判断', 'People handle emotions and exceptions.|Manusia menangani emosi dan pengecualian.|感情や例外にも対応できる。|人能处理情绪与特例。'),
      I('mkt', 'retail,biz', 'loyal', 2, 'Builds loyalty|Membangun loyalitas|ロイヤルティの向上|培养忠诚', 'Good service wins lifelong customers.|Layanan baik memenangkan pelanggan seumur hidup.|良い対応が、長期顧客を生む。|好服务赢得终身客户。'),
      I('cap', 'biz,retail', 'new', 2, 'Solves new problems|Menyelesaikan masalah baru|新しい問題を解決|解决新问题', 'Not limited to scripts.|Tidak terbatas pada skrip.|台本に縛られない。|不受脚本限制。'),
      I('cap', 'biz', 'sell', 2, 'Sales opportunities|Peluang penjualan|販売の機会|销售机会', 'Agents can recommend and upsell.|Agen dapat merekomendasikan dan menjual lebih.|担当者が、提案や追加販売もできる。|客服可推荐与追加销售。')
    ], [
      I('cost', 'retail,biz', 'expensive', 3, 'High cost|Biaya tinggi|コストが高い|成本高', 'Salaries, training and turnover.|Gaji, pelatihan, dan pergantian.|給与・研修・離職のコスト。|薪资、培训与流动。'),
      I('eff', 'retail,biz', 'wait', 3, 'Waiting times|Waktu tunggu|待ち時間|等待时间', 'Peak hours create queues.|Jam sibuk menciptakan antrean.|混雑時は、待たされる。|高峰排队。'),
      I('eff', 'biz', 'hard', 2, 'Inconsistent quality|Mutu tidak konsisten|品質のばらつき|质量不一', 'Depends on the agent.|Bergantung pada agen.|担当者次第。|取决于客服。'),
      I('ppl', 'biz,retail', 'stress', 2, 'Burnout|Kelelahan|燃え尽き|倦怠', 'Angry customers wear agents down.|Pelanggan marah menguras agen.|怒った客が、担当者を消耗させる。|愤怒客户消耗客服。')
    ]),
    C('self-service kiosks', 'Self-service checkout|Kasir swalayan mandiri|セルフレジ|自助结账', ['human support'], [
      I('val', 'retail,food', 'save', 3, 'Lower labour cost|Biaya tenaga kerja lebih rendah|人件費削減|降低人工成本', 'Fewer cashiers needed.|Lebih sedikit kasir dibutuhkan.|レジ係を減らせる。|减少收银员。'),
      I('eff', 'retail,food', 'fast', 2, 'Shorter queues|Antrean lebih pendek|行列の短縮|排队更短', 'Many terminals open at once.|Banyak terminal terbuka sekaligus.|多数の端末で同時に会計できる。|多台终端同时开放。'),
      I('mkt', 'retail', 'easy', 2, 'Customer control|Kendali pelanggan|客が自分で操作|客户自主', 'People like doing it themselves.|Orang suka melakukannya sendiri.|自分でできるほうが好きな人もいる。|有人喜欢自己来。'),
      I('cap', 'retail,food', 'steady', 2, 'Fewer order errors|Kesalahan pesanan lebih sedikit|注文ミスの減少|减少下单错误', 'Customers enter their own orders.|Pelanggan memasukkan pesanan sendiri.|客自身が注文を入力する。|客户自行下单。')
    ], [
      I('risk', 'retail', 'theft', 3, 'Theft and fraud|Pencurian dan penipuan|万引き・不正|盗窃与欺诈', 'Unscanned items and tricks.|Barang tak dipindai dan akal-akalan.|スキャン漏れや不正が起きる。|漏扫与作弊。'),
      I('ppl', 'retail,fam', 'anger', 2, 'Frustrating machines|Mesin yang menjengkelkan|機械の使いにくさ|机器难用', '"Unexpected item in bagging area."|"Barang tak terduga di area pengantongan."|「袋詰めエリアに予期しない商品」。|“包装区有意外物品”。'),
      I('ppl', 'retail', 'job', 2, 'Job losses|Hilangnya pekerjaan|雇用の減少|岗位减少', 'Cashiers are replaced.|Kasir tergantikan.|レジ担当が、置き換えられる。|收银员被取代。'),
      I('ppl', 'retail,fam', 'skill', 2, 'Excludes less confident users|Mengecualikan pengguna kurang percaya diri|苦手な人が使いにくい|排除不熟练用户', 'Older customers struggle.|Pelanggan lansia kesulitan.|高齢者には、使いにくい。|老年客户困难。')
    ]),
    C('warranty', 'Generous product warranty|Garansi produk yang luas|手厚い製品保証|慷慨产品保修', ['cost cutting'], [
      I('mkt', 'mfg,retail', 'trust', 3, 'Customer confidence|Kepercayaan pelanggan|顧客の安心|客户信心', 'Buyers feel protected.|Pembeli merasa terlindungi.|買い手が、守られていると感じる。|买家觉得受保护。'),
      I('mkt', 'mfg,retail', 'edge', 2, 'Competitive advantage|Keunggulan bersaing|競争優位|竞争优势', 'A long warranty signals quality.|Garansi panjang menandakan kualitas.|長い保証は、品質の証。|长保修表明质量。'),
      I('cap', 'mfg', 'quality', 2, 'Pushes quality|Mendorong mutu|品質向上の圧力|倒逼质量', 'You must build it well.|Anda harus membuatnya dengan baik.|品質を高めざるを得ない。|必须做好质量。'),
      I('mkt', 'retail,mfg', 'premium', 2, 'Supports higher prices|Mendukung harga lebih tinggi|高価格を支える|支撑更高价格', 'Peace of mind is worth paying for.|Ketenangan layak dibayar.|安心感に、お金を払う人がいる。|安心值得付费。')
    ], [
      I('cost', 'mfg,retail', 'expensive', 3, 'Repair and replacement costs|Biaya perbaikan dan penggantian|修理・交換費用|维修与更换成本', 'Claims eat into profit.|Klaim menggerus laba.|保証対応が、利益を削る。|索赔侵蚀利润。'),
      I('risk', 'mfg,retail', 'cheat', 2, 'Abuse of claims|Penyalahgunaan klaim|保証の悪用|滥用索赔', 'Some customers game the system.|Sebagian pelanggan memanfaatkan celah.|制度を悪用する客もいる。|有客户钻空子。'),
      I('risk', 'mfg', 'danger', 2, 'Uncertain liabilities|Kewajiban tak pasti|将来負担の不確実性|负债不确定', 'Failures may cluster in a batch.|Kegagalan bisa menumpuk dalam satu batch.|不具合が、ロットで固まって出ることがある。|故障可能集中于某批次。'),
      I('eff', 'mfg,retail', 'effort', 2, 'Administration|Administrasi|管理の手間|管理工作', 'Tracking claims takes systems and staff.|Melacak klaim butuh sistem dan staf.|請求の管理に、仕組みと人が要る。|追踪索赔需系统与人员。')
    ]),
    C('return policy', 'Easy return policy|Kebijakan retur yang mudah|返品しやすい制度|宽松退货政策', ['warranty'], [
      I('mkt', 'retail,fam', 'trust', 3, 'More purchases|Lebih banyak pembelian|購入が増える|购买增加', 'Risk-free buying reduces hesitation.|Membeli tanpa risiko mengurangi keraguan.|リスクがないので、迷わず買える。|无风险降低犹豫。'),
      I('mkt', 'retail', 'loyal', 2, 'Customer loyalty|Loyalitas pelanggan|顧客の信頼|客户忠诚', 'Fair treatment brings people back.|Perlakuan adil membuat orang kembali.|公平な対応が、再来店を促す。|公平对待促使回购。'),
      I('cap', 'retail', 'edge', 2, 'Competitive advantage|Keunggulan bersaing|競争優位|竞争优势', 'Stands out versus strict rivals.|Menonjol dibanding pesaing yang ketat.|厳しい競合との差別化になる。|胜过严格的对手。'),
      I('mkt', 'retail,fam', 'sell', 2, 'Online fashion especially|Terutama untuk fesyen online|特にオンラインの衣料品|尤其适合在线服饰', 'Try-on-at-home buying works.|Membeli dengan coba di rumah efektif.|試着前提の購入が成り立つ。|在家试穿式购买可行。')
    ], [
      I('cost', 'retail', 'expensive', 3, 'High return costs|Biaya retur tinggi|返品コストが高い|退货成本高', 'Shipping, handling and resale loss.|Ongkir, penanganan, dan kerugian jual ulang.|送料・処理・値引き再販の損失。|运费、处理与折价损失。'),
      I('risk', 'retail', 'cheat', 2, 'Abuse|Penyalahgunaan|悪用|滥用', 'Wear once and return.|Pakai sekali lalu kembalikan.|一度使って返品する人がいる。|穿一次再退。'),
      I('risk', 'retail,food', 'waste', 2, 'Waste|Limbah|廃棄ロス|浪费', 'Returned goods are often thrown away.|Barang retur sering dibuang.|返品が、廃棄されることも多い。|退货常被丢弃。'),
      I('eff', 'retail', 'hard', 2, 'Operational burden|Beban operasional|運用の負担|运营负担', 'Inspecting and restocking takes work.|Memeriksa dan menata ulang butuh tenaga.|検品や再入庫に手間がかかる。|检查与重新上架费力。')
    ]),
    C('customer surveys', 'Customer feedback surveys|Survei umpan balik pelanggan|顧客アンケート|客户反馈调查', ['market research'], [
      I('cap', 'retail,biz,health', 'learn', 3, 'Direct insight|Wawasan langsung|直接の洞察|直接洞察', 'Hear what customers actually think.|Mendengar apa yang sebenarnya dipikirkan pelanggan.|客の本音を聞ける。|听到客户真实想法。'),
      I('val', 'retail,biz', 'cheap', 2, 'Cheap to run|Murah dijalankan|低コストで実施|实施便宜', 'Online forms cost almost nothing.|Formulir online hampir tanpa biaya.|オンラインなら、ほぼ無料。|在线表单几乎免费。'),
      I('mkt', 'retail,biz', 'loyal', 2, 'Shows you care|Menunjukkan Anda peduli|気にかけている姿勢|表明你在乎', 'Customers feel heard.|Pelanggan merasa didengar.|顧客が、聞いてもらえたと感じる。|客户觉得被倾听。'),
      I('cap', 'biz,retail', 'find', 2, 'Spots problems early|Menemukan masalah lebih awal|問題の早期発見|及早发现问题', 'Complaints reveal weak points.|Keluhan mengungkap titik lemah.|不満が、弱点を教えてくれる。|投诉揭示薄弱点。')
    ], [
      I('eff', 'retail,biz', 'ignore', 3, 'Survey fatigue and low response|Jenuh survei dan respons rendah|アンケート疲れ・低回答率|调查疲劳回复率低', 'People ignore constant requests.|Orang mengabaikan permintaan terus-menerus.|頻繁な依頼は、無視される。|频繁请求被忽视。'),
      I('risk', 'biz,retail', 'bias', 2, 'Biased sample|Sampel bias|偏った回答者|样本有偏', 'Only the angry or delighted reply.|Hanya yang marah atau sangat senang yang membalas.|怒った人か大満足の人しか答えない。|只有极端者回复。'),
      I('risk', 'retail,biz', 'lie', 2, 'Polite or false answers|Jawaban sopan atau palsu|建前の回答|礼貌或不实回答', 'People say what sounds nice.|Orang mengatakan yang terdengar baik.|聞こえの良いことを答える。|人们说好听的话。'),
      I('eff', 'biz', 'stuck', 2, 'No action follows|Tidak ada tindak lanjut|何も変わらない|无后续行动', 'Data is collected but ignored.|Data dikumpulkan tetapi diabaikan.|集めても、活かされない。|数据收集后被搁置。')
    ]),
    C('price matching', 'Price matching|Pencocokan harga|価格保証（最安値保証）|价格匹配', ['discounting'], [
      I('mkt', 'retail', 'customer', 3, 'Reassures shoppers|Menenangkan pembeli|買い物客の安心|令买家放心', 'No need to shop around.|Tidak perlu membandingkan ke mana-mana.|他店を探し回らなくていい。|无需四处比价。'),
      I('mkt', 'retail', 'loyal', 2, 'Keeps customers|Mempertahankan pelanggan|客を逃さない|留住客户', 'They do not leave for a cheaper rival.|Mereka tidak pindah ke pesaing yang lebih murah.|安い競合に流れない。|不会转向更便宜对手。'),
      I('cap', 'retail', 'trust', 2, 'Value image|Citra hemat|お得なイメージ|性价比形象', 'Seen as fair on price.|Dianggap adil soal harga.|価格に公平という印象。|被视为价格公道。'),
      I('cap', 'retail', 'data', 2, 'Monitors the market|Memantau pasar|市場の監視|监控市场', 'You track rivals closely.|Anda memantau pesaing dengan ketat.|競合を、細かく追える。|紧盯对手。')
    ], [
      I('cost', 'retail', 'poor', 3, 'Lower margins|Margin lebih rendah|利益率の低下|利润下降', 'You follow rivals down.|Anda mengikuti pesaing turun.|競合に合わせて、下げることになる。|被迫跟随降价。'),
      I('risk', 'retail', 'war', 2, 'Price wars|Perang harga|価格戦争|价格战', 'Everyone matches everyone.|Semua menyamai semua.|全社が、互いに合わせ合う。|人人互相匹配。'),
      I('eff', 'retail', 'hard', 2, 'Admin burden|Beban administrasi|運用の手間|管理负担', 'Verifying competitor prices takes time.|Memverifikasi harga pesaing butuh waktu.|競合の価格確認に手間がかかる。|核实对手价格费时。'),
      I('risk', 'retail', 'cheat', 2, 'Gaming|Dimanfaatkan|悪用|被利用', 'Customers show fake or old prices.|Pelanggan menunjukkan harga palsu atau lama.|偽・古い価格を提示する客もいる。|客户出示假或旧价格。')
    ]),
    C('consignment', 'Consignment selling|Penjualan titip (konsinyasi)|委託販売|寄售', ['safety stock'], [
      I('val', 'retail,fam', 'safe', 3, 'No stock risk for the shop|Tanpa risiko stok bagi toko|店側に在庫リスクなし|店铺无库存风险', 'Pay only for what sells.|Bayar hanya untuk yang laku.|売れた分だけ、支払う。|只为卖出部分付款。'),
      I('cap', 'retail,fam', 'reach', 2, 'Reach for small producers|Jangkauan bagi produsen kecil|小規模生産者の販路|小生产者的渠道', 'Makers get shelf space.|Pembuat mendapat tempat di rak.|作り手が、売り場を得られる。|制作者获得货架。'),
      I('mkt', 'retail', 'choice', 2, 'Wider variety|Variasi lebih luas|品揃えの拡大|品类更丰富', 'Try more products.|Mencoba lebih banyak produk.|より多くの商品を試せる。|可试销更多产品。'),
      I('val', 'retail', 'cheap', 2, 'Low capital|Modal rendah|資金負担が小さい|资金需求低', 'Start a shop without buying stock.|Memulai toko tanpa membeli stok.|仕入れずに、店を始められる。|无需进货即可开店。')
    ], [
      I('cost', 'retail,fam', 'poor', 3, 'Slow, uncertain payment|Pembayaran lambat dan tidak pasti|入金が遅く不確実|回款慢且不确定', 'Producers wait for sales.|Produsen menunggu penjualan.|生産者は、売れるまで待つ。|生产者要等销售。'),
      I('risk', 'retail,fam', 'lose', 2, 'Unsold goods returned|Barang tak laku dikembalikan|売れ残りの返却|滞销品退回', 'Makers carry the risk.|Pembuat menanggung risiko.|在庫リスクは、作り手が負う。|风险由制作者承担。'),
      I('risk', 'retail', 'theft', 2, 'Disputes over damage or loss|Sengketa kerusakan atau kehilangan|破損・紛失のトラブル|损坏丢失纠纷', 'Who pays if goods vanish?|Siapa membayar jika barang hilang?|物がなくなったら、誰が払う?|货物丢失谁赔?'),
      I('eff', 'retail', 'hard', 2, 'Tracking burden|Beban pelacakan|管理の手間|跟踪负担', 'Records must be kept for each maker.|Catatan harus disimpan untuk tiap pembuat.|作り手ごとの記録が必要。|须为每位制作者记账。')
    ]),
    C('planned obsolescence', 'Planned obsolescence|Keusangan terencana|計画的陳腐化|计划性报废', ['durable products'], [
      I('val', 'mfg,retail', 'profit', 3, 'Repeat sales|Penjualan berulang|買い替え需要|重复销售', 'Customers must replace products.|Pelanggan harus mengganti produk.|顧客が、買い替える。|客户需更换产品。'),
      I('cap', 'mfg', 'new', 2, 'Funds innovation|Mendanai inovasi|革新の資金源|资助创新', 'Steady revenue pays for research.|Pendapatan stabil membiayai riset.|安定収入が、研究開発を支える。|稳定收入支持研发。'),
      I('cap', 'mfg', 'plan', 2, 'Predictable demand|Permintaan terprediksi|需要の見通し|需求可预测', 'Product cycles are planned.|Siklus produk direncanakan.|商品サイクルを計画できる。|产品周期可规划。'),
      I('mkt', 'mfg,retail', 'new', 2, 'Customers get new features|Pelanggan mendapat fitur baru|新機能を使える|客户获得新功能', 'Updates keep products modern.|Pembaruan menjaga produk tetap modern.|更新で、製品が新しく保たれる。|更新使产品保持现代。')
    ], [
      I('ppl', 'mfg,retail,fam', 'anger', 3, 'Customer resentment|Kekesalan pelanggan|顧客の反発|客户怨恨', 'People feel tricked into replacing.|Orang merasa dipaksa mengganti.|買い替えさせられたと感じる。|感觉被迫更换。'),
      I('risk', 'mfg,pub', 'waste', 3, 'Waste and pollution|Limbah dan polusi|廃棄物と汚染|垃圾与污染', 'Electronics pile up.|Elektronik menumpuk.|電子ごみが山積みになる。|电子垃圾堆积。'),
      I('risk', 'mfg,pub', 'law', 2, 'Regulation|Regulasi|規制のリスク|监管', 'Right-to-repair laws spread.|Hukum hak memperbaiki menyebar.|修理する権利の法制化が進む。|维修权立法扩散。'),
      I('mkt', 'mfg,retail', 'trust', 2, 'Brand damage if exposed|Merek rusak jika terbongkar|発覚時のブランド毀損|曝光后品牌受损', 'Trust collapses.|Kepercayaan runtuh.|信頼が崩れる。|信任崩塌。')
    ]),
    C('durable products', 'Durable, repairable products|Produk awet dan bisa diperbaiki|長持ちで修理できる製品|耐用可修产品', ['planned obsolescence'], [
      I('mkt', 'mfg,retail,fam', 'trust', 3, 'Customer trust|Kepercayaan pelanggan|顧客の信頼|客户信任', 'Known for lasting quality.|Dikenal karena kualitas yang bertahan.|長持ちする品質で知られる。|以耐用品质闻名。'),
      I('val', 'fam,mfg', 'save', 2, 'Cheaper over a lifetime|Lebih murah dalam jangka panjang|生涯コストが安い|长期更省钱', 'Buy once.|Beli sekali.|1度買えば済む。|一次购买。'),
      I('val', 'mfg,pub', 'stay', 2, 'Less waste|Lebih sedikit limbah|廃棄が少ない|垃圾更少', 'Fewer discarded products.|Lebih sedikit produk dibuang.|捨てられる製品が減る。|被丢弃产品更少。'),
      I('mkt', 'mfg,retail', 'premium', 2, 'Premium brand|Merek premium|プレミアムブランド|高端品牌', 'Buyers pay more for quality.|Pembeli membayar lebih untuk kualitas.|品質に対して、高く払う。|买家为质量多付。')
    ], [
      I('cost', 'mfg', 'expensive', 3, 'Higher production cost|Biaya produksi lebih tinggi|製造コストが高い|生产成本高', 'Better materials and design.|Bahan dan desain lebih baik.|良い素材と設計が必要。|需更好材料与设计。'),
      I('mkt', 'mfg,retail', 'slow', 3, 'Fewer repeat sales|Penjualan ulang berkurang|買い替え需要の減少|复购减少', 'Customers do not need to return.|Pelanggan tidak perlu kembali.|買い替えの必要がない。|客户无需再来。'),
      I('mkt', 'mfg', 'old', 2, 'Technology moves on|Teknologi terus maju|技術の進歩|技术进步', 'Durable but outdated.|Awet tetapi ketinggalan zaman.|長持ちしても、時代遅れになる。|耐用但过时。'),
      I('eff', 'mfg,retail', 'effort', 2, 'Repair network needed|Butuh jaringan perbaikan|修理網が必要|需要维修网络', 'Spare parts and skilled technicians.|Suku cadang dan teknisi terampil.|部品と技術者が必要。|需备件与技师。')
    ]),
    C('mass customization', 'Mass customisation|Kustomisasi massal|マスカスタマイゼーション|大规模定制', ['standardization'], [
      I('mkt', 'mfg,retail', 'customer', 3, 'Products fit each buyer|Produk sesuai tiap pembeli|一人ひとりに合う|产品贴合每位买家', 'People get what they want.|Orang mendapat yang mereka inginkan.|欲しいものが手に入る。|人人得所需。'),
      I('val', 'mfg,retail', 'premium', 2, 'Premium pricing|Harga premium|高価格を設定できる|可定高价', 'Personal touch is worth more.|Sentuhan personal lebih bernilai.|個別対応には、価値がある。|个性化更值钱。'),
      I('mkt', 'retail,mfg', 'loyal', 2, 'Loyalty|Loyalitas|ロイヤルティ|忠诚度', 'Self-designed items are cherished.|Barang rancangan sendiri disayangi.|自分で設計したものは、愛着が湧く。|自己设计的更珍惜。'),
      I('val', 'mfg,retail', 'waste', 2, 'Less unsold stock|Stok tak laku lebih sedikit|売れ残りの減少|滞销减少', 'Made after ordering.|Dibuat setelah dipesan.|注文後に作る。|下单后生产。')
    ], [
      I('cost', 'mfg', 'expensive', 3, 'Higher cost|Biaya lebih tinggi|コストが高い|成本较高', 'Flexible production is complex.|Produksi fleksibel itu rumit.|柔軟な生産は、複雑でコストがかかる。|柔性生产复杂。'),
      I('eff', 'mfg,retail', 'wait', 2, 'Longer lead times|Waktu tunggu lebih lama|納期が長い|交期较长', 'Customers wait for their order.|Pelanggan menunggu pesanannya.|注文品を待たされる。|客户需等待。'),
      I('eff', 'retail,mfg', 'complex', 2, 'Complex logistics|Logistik rumit|物流が複雑|物流复杂', 'Every order is different.|Setiap pesanan berbeda.|注文ごとに、内容が違う。|每单不同。'),
      I('risk', 'retail,mfg', 'mistake', 2, 'More errors|Lebih banyak kesalahan|ミスの増加|错误更多', 'Wrong specs ruin an order.|Spesifikasi salah merusak pesanan.|仕様のミスが、注文を台無しにする。|规格错误毁掉订单。')
    ]),
    C('standardization', 'Global standardisation|Standardisasi global|グローバル標準化|全球标准化', ['mass customization'], [
      I('val', 'mfg,retail,food', 'cheap', 3, 'Economies of scale|Skala ekonomi|規模の経済|规模经济', 'One design for the whole world.|Satu desain untuk seluruh dunia.|世界共通の設計で済む。|全球一款设计。'),
      I('mkt', 'retail,food', 'name', 2, 'Consistent brand|Merek konsisten|一貫したブランド|品牌一致', 'Same experience everywhere.|Pengalaman sama di mana-mana.|どこでも同じ体験。|各地体验一致。'),
      I('eff', 'mfg,retail', 'fast', 2, 'Fast rollout|Peluncuran cepat|展開が早い|推广快', 'Copy what works.|Menyalin yang berhasil.|うまくいった方法を横展開。|复制有效做法。'),
      I('cap', 'mfg,biz', 'clear', 2, 'Simple management|Manajemen sederhana|管理が簡単|管理简单', 'Fewer variants to track.|Lebih sedikit varian untuk dilacak.|管理するバリエーションが少ない。|变体少便于管理。')
    ], [
      I('mkt', 'retail,food', 'miss', 3, 'Ignores local tastes|Mengabaikan selera lokal|現地の好みを無視|忽视本地口味', 'What sells in one country may fail in another.|Yang laku di satu negara bisa gagal di negara lain.|ある国で売れても、別の国では売れない。|一国畅销另一国可能失败。'),
      I('risk', 'retail,pub', 'conflict', 2, 'Cultural missteps|Salah langkah budaya|文化的な失敗|文化失误', 'Names, colours and jokes offend.|Nama, warna, dan lelucon menyinggung.|名前・色・ジョークが不快感を与える。|名称、颜色与玩笑冒犯人。'),
      I('risk', 'retail,mfg', 'law', 2, 'Local rules differ|Aturan lokal berbeda|現地規制の違い|各地法规不同', 'One product cannot satisfy all laws.|Satu produk tidak bisa memenuhi semua hukum.|1つの製品で全規制を満たせない。|一款产品难满足所有法规。'),
      I('mkt', 'retail,food', 'weak', 2, 'Outflanked by locals|Dikalahkan pesaing lokal|地元企業に負ける|被本地企业超越', 'Local rivals fit better.|Pesaing lokal lebih cocok.|地元企業のほうが、合っている。|本地对手更贴合。')
    ]),
    C('performance appraisal', 'Formal performance reviews|Penilaian kinerja formal|公式な人事評価|正式绩效考核', ['feedback culture'], [
      I('ppl', 'biz,pub,edu', 'fair', 3, 'Clear, fair criteria|Kriteria jelas dan adil|明確で公平な基準|标准清晰公平', 'Pay and promotion follow results.|Gaji dan promosi mengikuti hasil.|報酬と昇進が、成果に連動する。|薪酬与晋升看成果。'),
      I('cap', 'biz', 'direction', 2, 'Aligns goals|Menyelaraskan tujuan|目標の整合|对齐目标', 'Staff know what matters.|Staf tahu apa yang penting.|何が大切か、はっきりする。|员工知道重点。'),
      I('cap', 'biz,pub', 'proof', 2, 'Documentation|Dokumentasi|記録が残る|留有记录', 'Decisions can be justified.|Keputusan dapat dipertanggungjawabkan.|判断の根拠を説明できる。|决策有据可依。'),
      I('ppl', 'biz', 'skill', 2, 'Development planning|Perencanaan pengembangan|育成計画|发展规划', 'Reviews reveal training needs.|Penilaian mengungkap kebutuhan pelatihan.|評価から、育成の必要が見える。|考核揭示培训需求。')
    ], [
      I('ppl', 'biz,pub', 'stress', 3, 'Stress and fear|Stres dan ketakutan|ストレスと不安|压力与恐惧', 'Annual judgement hangs over staff.|Penilaian tahunan membayangi staf.|年1回の評価が、重くのしかかる。|年度评判压在员工头上。'),
      I('risk', 'biz,pub', 'bias', 2, 'Bias and favouritism|Bias dan pilih kasih|偏見・えこひいき|偏见与偏袒', 'Managers rate subjectively.|Manajer menilai secara subjektif.|上司の主観で評価される。|经理主观打分。'),
      I('eff', 'biz,pub', 'time', 2, 'Time-consuming paperwork|Dokumen yang memakan waktu|書類作成に時間|文书耗时', 'Forms and meetings take weeks.|Formulir dan rapat memakan berminggu-minggu.|書類や面談に、何週間もかかる。|表格与会议耗时数周。'),
      I('ppl', 'biz', 'conflict', 2, 'Rivalry|Persaingan|社内競争|内部竞争', 'Ranking pits colleagues against each other.|Peringkat mengadu rekan kerja.|順位付けが、同僚を対立させる。|排名使同事对立。')
    ]),
    C('feedback culture', 'Continuous feedback|Umpan balik berkelanjutan|継続的なフィードバック|持续反馈', ['performance appraisal'], [
      I('cap', 'biz,edu,health', 'learn', 3, 'Faster improvement|Perbaikan lebih cepat|改善が早い|改进更快', 'Problems are corrected at once.|Masalah dikoreksi segera.|問題が、その場で直る。|问题即时纠正。'),
      I('ppl', 'biz,edu', 'trust', 2, 'Open, trusting culture|Budaya terbuka dan saling percaya|オープンで信頼ある風土|开放互信文化', 'No surprises at year end.|Tidak ada kejutan di akhir tahun.|年末に驚くことがない。|年底无意外。'),
      I('ppl', 'biz', 'proud', 2, 'Recognition|Pengakuan|承認|认可', 'Good work is praised quickly.|Kerja baik dipuji cepat.|良い仕事が、すぐ褒められる。|好成绩即时被赞。'),
      I('cap', 'biz', 'flexible', 2, 'Adaptive goals|Tujuan adaptif|目標を柔軟に調整|目标灵活调整', 'Priorities shift with feedback.|Prioritas bergeser sesuai umpan balik.|フィードバックで優先順位を変える。|优先级随反馈调整。')
    ], [
      I('ppl', 'biz', 'stress', 3, 'Constant pressure|Tekanan terus-menerus|常に評価される圧力|持续压力', 'Staff feel watched all the time.|Staf merasa diawasi sepanjang waktu.|常に見られている気分になる。|员工觉得时刻被监视。'),
      I('eff', 'biz', 'time', 2, 'Takes manager time|Menyita waktu manajer|管理者の時間を取る|占用经理时间', 'Frequent talks add up.|Percakapan sering menumpuk.|頻繁な面談が積み重なる。|频繁谈话累积。'),
      I('risk', 'biz', 'false', 2, 'Vague or harsh comments|Komentar kabur atau kasar|曖昧・辛辣なコメント|模糊或苛刻评论', 'Poorly trained managers give bad feedback.|Manajer kurang terlatih memberi umpan balik buruk.|訓練不足の上司が、的外れな指摘をする。|培训不足的经理给出糟糕反馈。'),
      I('cap', 'biz,pub', 'proof', 2, 'Weak records|Catatan lemah|記録が弱い|记录薄弱', 'Hard to support formal decisions.|Sulit mendukung keputusan formal.|正式な判断の根拠が弱い。|难支撑正式决定。')
    ]),
    C('internal promotion', 'Promoting from within|Promosi dari dalam|内部昇進|内部晋升', ['external hiring'], [
      I('ppl', 'biz,pub', 'proud', 3, 'Motivates staff|Memotivasi staf|社員の意欲向上|激励员工', 'Hard work leads to advancement.|Kerja keras membawa kenaikan jabatan.|努力が昇進につながる。|努力换来晋升。'),
      I('eff', 'biz', 'fast', 2, 'Quick to fill|Cepat terisi|早く補充できる|快速补位', 'No lengthy recruitment.|Tanpa rekrutmen panjang.|長い採用活動が不要。|无需漫长招聘。'),
      I('val', 'biz', 'save', 2, 'Lower hiring cost|Biaya rekrutmen lebih rendah|採用コストが低い|招聘成本低', 'Known quantities are less risky.|Orang yang sudah dikenal lebih rendah risikonya.|実力が分かっているので、リスクが小さい。|知根知底风险小。'),
      I('cap', 'biz', 'know', 2, 'Knows the culture|Memahami budaya|組織を理解している|了解文化', 'Insiders hit the ground running.|Orang dalam langsung bekerja efektif.|すぐに力を発揮できる。|内部人员迅速上手。')
    ], [
      I('risk', 'biz', 'stuck', 3, 'Stale thinking|Pemikiran basi|発想の停滞|思维陈旧', 'Same people, same ideas.|Orang sama, ide sama.|同じ人、同じ発想。|同样的人同样的想法。'),
      I('ppl', 'biz', 'conflict', 2, 'Rivalry and resentment|Persaingan dan kekesalan|競争と不満|竞争与怨恨', 'Passed-over colleagues sulk or leave.|Rekan yang terlewat merajuk atau pergi.|選ばれなかった人が、不満を抱く。|落选者怨恨或离职。'),
      I('risk', 'biz,pub', 'unfair', 2, 'Cronyism|Kronisme|縁故人事|任人唯亲', 'Favourites rise, not the best.|Orang kesayangan naik, bukan yang terbaik.|お気に入りが昇進する。|宠臣上位而非最优者。'),
      I('cap', 'biz', 'skill', 2, 'Skill gaps|Kesenjangan keterampilan|スキル不足|技能缺口', 'Great workers may be poor managers.|Pekerja hebat bisa menjadi manajer buruk.|優秀な担当者が、良い管理職とは限らない。|优秀员工未必是好经理。')
    ]),
    C('external hiring', 'Hiring from outside|Merekrut dari luar|外部採用|外部招聘', ['internal promotion'], [
      I('cap', 'biz,mfg', 'new', 3, 'Fresh ideas|Gagasan segar|新しい視点|新想法', 'Outsiders challenge the old ways.|Orang luar menantang cara lama.|外部の人が、従来のやり方を問い直す。|外来者挑战旧方式。'),
      I('cap', 'biz,mfg', 'skill', 2, 'Missing skills|Keterampilan yang kurang|不足スキルの補充|补足技能', 'Bring expertise you lack.|Membawa keahlian yang belum dimiliki.|社内にない専門性を補える。|引入缺乏的专长。'),
      I('cap', 'biz', 'choice', 2, 'Wider choice|Pilihan lebih luas|選択肢が広い|选择更广', 'The whole market is open.|Seluruh pasar terbuka.|市場全体から選べる。|整个市场可选。'),
      I('ppl', 'biz', 'fresh', 2, 'No baggage|Tanpa beban masa lalu|しがらみがない|无历史包袱', 'Free of old alliances.|Bebas dari persekutuan lama.|過去のしがらみがない。|不受旧关系束缚。')
    ], [
      I('cost', 'biz', 'expensive', 3, 'Costly and slow|Mahal dan lambat|高コストで時間がかかる|昂贵且缓慢', 'Recruiters, signing fees and months of search.|Perekrut, biaya masuk, dan berbulan-bulan mencari.|紹介料・入社金・数か月の採用期間。|猎头费、签约金与数月寻访。'),
      I('risk', 'biz', 'fail', 3, 'Bad fit|Tidak cocok|ミスマッチ|不匹配', 'Interviews hide true ability and attitude.|Wawancara menyembunyikan kemampuan dan sikap sebenarnya.|面接では、本当の力や姿勢が見えにくい。|面试难看出真实能力与态度。'),
      I('ppl', 'biz', 'conflict', 2, 'Demotivates insiders|Melemahkan semangat orang dalam|社内の士気低下|打击内部士气', 'Staff feel overlooked.|Staf merasa diabaikan.|社員が、軽んじられたと感じる。|员工觉得被忽视。'),
      I('eff', 'biz', 'slow', 2, 'Slow to settle in|Lambat menyesuaikan diri|馴染むまで時間|适应缓慢', 'Newcomers must learn the ropes.|Pendatang baru harus belajar dulu.|新人は、仕事の流れを覚える必要がある。|新人需先熟悉。')
    ]),
    C('salary transparency', 'Salary transparency|Transparansi gaji|給与の透明化|薪资透明', ['secrecy'], [
      I('ppl', 'biz,pub', 'fair', 3, 'Fairness|Keadilan|公平性|公平', 'Pay gaps are visible and can be fixed.|Kesenjangan gaji terlihat dan bisa diperbaiki.|格差が見え、是正できる。|薪酬差距可见可纠正。'),
      I('ppl', 'biz,pub', 'trust', 2, 'Trust|Kepercayaan|信頼|信任', 'No suspicion about hidden deals.|Tanpa kecurigaan soal kesepakatan tersembunyi.|裏の取り決めへの疑念がなくなる。|无暗箱疑虑。'),
      I('cap', 'biz', 'attract', 2, 'Attracts applicants|Menarik pelamar|応募者を引きつける|吸引应聘者', 'Candidates value openness.|Kandidat menghargai keterbukaan.|求職者は、透明性を評価する。|候选人看重透明。'),
      I('eff', 'biz', 'clear', 2, 'Less negotiation haggling|Lebih sedikit tawar-menawar|交渉の手間が減る|减少讨价还价', 'Pay bands are known.|Rentang gaji diketahui.|給与レンジが分かっている。|薪酬区间已知。')
    ], [
      I('ppl', 'biz', 'conflict', 3, 'Jealousy and conflict|Iri dan konflik|嫉妬と対立|嫉妒与冲突', 'Comparisons cause resentment.|Perbandingan menimbulkan kekesalan.|比較が、不満を生む。|比较引发怨恨。'),
      I('risk', 'biz', 'leave', 2, 'Top earners may object|Penerima gaji tinggi mungkin keberatan|高給者の反発|高薪者可能反对', 'Privacy and stars may leave.|Privasi dan bintang bisa pergi.|プライバシーの問題や、有能な人材の流出。|隐私问题与明星员工流失。'),
      I('eff', 'biz', 'hard', 2, 'Hard to justify differences|Sulit membenarkan perbedaan|差の説明が難しい|难解释差异', 'Managers must explain every gap.|Manajer harus menjelaskan setiap selisih.|管理者が、あらゆる差を説明する必要がある。|经理须解释每个差距。'),
      I('risk', 'biz', 'law', 2, 'Privacy concerns|Kekhawatiran privasi|プライバシーの懸念|隐私担忧', 'Not everyone wants pay shared.|Tidak semua orang ingin gajinya dibagikan.|給与を知られたくない人もいる。|并非人人愿公开薪资。')
    ]),
    C('secrecy', 'Salary secrecy|Kerahasiaan gaji|給与の非公開|薪资保密', ['salary transparency'], [
      I('ppl', 'biz', 'peace', 3, 'Avoids envy|Menghindari iri|嫉妬を避ける|避免嫉妒', 'Nobody compares paycheques.|Tak ada yang membandingkan gaji.|給与を比べられずに済む。|无人比较薪水。'),
      I('cap', 'biz', 'flexible', 2, 'Flexibility to reward|Fleksibel memberi penghargaan|柔軟な報酬設計|奖励灵活', 'Pay individuals as needed.|Menggaji individu sesuai kebutuhan.|個別に報酬を決められる。|按需给个人定薪。'),
      I('cap', 'biz', 'power', 2, 'Stronger negotiating position|Posisi tawar lebih kuat|交渉上の優位|谈判地位更强', 'The firm knows more than staff.|Perusahaan tahu lebih banyak daripada staf.|会社が、情報で優位に立つ。|公司比员工信息更多。'),
      I('ppl', 'biz,fam', 'secret', 2, 'Privacy|Privasi|プライバシー|隐私', 'Pay is a personal matter.|Gaji adalah urusan pribadi.|給与は、個人的なもの。|薪资属个人事务。')
    ], [
      I('ppl', 'biz,pub', 'unfair', 3, 'Hidden unfairness|Ketidakadilan tersembunyi|隠れた不公平|隐形不公', 'Gender and other gaps go unseen.|Kesenjangan gender dan lainnya tak terlihat.|性別などによる格差が、見えない。|性别等差距看不见。'),
      I('ppl', 'biz', 'fear', 2, 'Suspicion and rumours|Kecurigaan dan desas-desus|疑念と噂|猜疑与流言', 'People guess who earns what.|Orang menebak siapa menerima berapa.|誰がいくらか、憶測が飛ぶ。|人们猜测谁赚多少。'),
      I('mkt', 'biz', 'lose', 2, 'Discourages applicants|Mengecilkan minat pelamar|応募者が減る|劝退应聘者', 'Candidates cannot judge the offer.|Kandidat tidak bisa menilai tawaran.|条件が分からず、応募を控える。|候选人无法评估报价。'),
      I('risk', 'biz,pub', 'law', 2, 'Legal pressure|Tekanan hukum|法的な圧力|法律压力', 'More places require disclosure.|Semakin banyak tempat mewajibkan keterbukaan.|開示を義務づける地域が増えている。|越来越多地区要求披露。')
    ]),
    C('onboarding program', 'Structured onboarding|Orientasi karyawan terstruktur|体系的な入社研修|系统化入职培训', ['learning by doing'], [
      I('ppl', 'biz,health', 'safe', 3, 'New staff feel welcome|Karyawan baru merasa diterima|新入社員の安心|新员工有归属', 'They know who and what to ask.|Mereka tahu siapa dan apa yang harus ditanya.|誰に何を聞けばよいか、分かる。|知道向谁问什么。'),
      I('eff', 'biz,health', 'fast', 2, 'Faster productivity|Produktivitas lebih cepat|戦力化が早い|更快上手', 'Learning curve is shortened.|Kurva belajar dipersingkat.|習熟までの時間が短縮される。|缩短学习曲线。'),
      I('ppl', 'biz', 'stay', 2, 'Lower early turnover|Pergantian awal lebih rendah|早期離職の減少|降低早期离职', 'Good starts keep people.|Awal yang baik mempertahankan orang.|良いスタートが、定着を促す。|好开端留住人。'),
      I('cap', 'biz,health', 'quality', 2, 'Consistent standards|Standar konsisten|基準の統一|标准一致', 'Everyone learns the same way.|Semua belajar dengan cara sama.|全員が、同じ基準を学ぶ。|人人学同样标准。')
    ], [
      I('cost', 'biz', 'expensive', 3, 'Costs time and money|Memakan waktu dan uang|時間と費用がかかる|耗时耗钱', 'Trainers and materials are needed.|Dibutuhkan pelatih dan materi.|講師や教材が必要。|需培训师与教材。'),
      I('eff', 'biz', 'slow', 2, 'Delays real work|Menunda pekerjaan nyata|実務の開始が遅れる|推迟实际工作', 'Weeks pass before output.|Berminggu-minggu berlalu sebelum ada hasil.|成果が出るまで数週間かかる。|数周后才有产出。'),
      I('ppl', 'biz', 'boring', 2, 'Boring or generic|Membosankan atau generik|退屈で型通り|枯燥或流于模板', 'Slides do not teach the real job.|Slide tidak mengajarkan pekerjaan sebenarnya.|スライドでは、実際の仕事は学べない。|幻灯片教不会真实工作。'),
      I('risk', 'biz', 'old', 2, 'Quickly outdated|Cepat usang|すぐ古くなる|很快过时', 'Materials fall behind real practice.|Materi tertinggal dari praktik nyata.|教材が、現場の実態に遅れる。|教材落后于实践。')
    ]),
    C('flexible benefits', 'Flexible benefits|Tunjangan fleksibel|選択型福利厚生|弹性福利', ['bonus'], [
      I('ppl', 'biz,fam', 'choice', 3, 'Fits individual needs|Sesuai kebutuhan individu|個人のニーズに合う|契合个人需求', 'Parents, students and singles choose differently.|Orang tua, mahasiswa, dan lajang memilih berbeda.|親・学生・独身で、必要が違う。|父母、学生与单身选择不同。'),
      I('cap', 'biz', 'attract', 2, 'Attracts and retains|Menarik dan mempertahankan|人材の獲得・定着|吸引并留住', 'Valued perks win talent.|Fasilitas yang dihargai memenangkan talenta.|価値ある福利厚生が、人材を引きつける。|受重视的福利赢得人才。'),
      I('val', 'biz', 'save', 2, 'Cost control|Pengendalian biaya|コスト管理|成本可控', 'Fixed budgets, free allocation.|Anggaran tetap, alokasi bebas.|予算は一定で、配分は自由。|预算固定、分配自由。'),
      I('ppl', 'biz', 'proud', 2, 'Feels respectful|Terasa dihargai|尊重されている感覚|觉得被尊重', 'Staff decide what matters.|Staf menentukan apa yang penting.|何が大切かを、本人が決める。|员工自己定重点。')
    ], [
      I('eff', 'biz', 'complex', 3, 'Admin complexity|Kompleksitas administrasi|運用が複雑|管理复杂', 'Tracking choices takes systems.|Melacak pilihan butuh sistem.|選択の管理に、仕組みが要る。|跟踪选择需系统。'),
      I('ppl', 'biz', 'confuse', 2, 'Confusing choices|Pilihan membingungkan|選択が分かりにくい|选择令人困惑', 'Many options overwhelm people.|Banyak opsi membuat bingung.|選択肢が多く、迷う。|选项太多令人迷茫。'),
      I('risk', 'biz', 'mistake', 2, 'Poor choices|Pilihan keliru|不適切な選択|选错', 'Staff may skip important cover.|Staf mungkin melewatkan perlindungan penting.|大切な保障を選ばない人もいる。|员工可能漏选重要保障。'),
      I('cost', 'biz', 'tax', 2, 'Tax and legal limits|Batas pajak dan hukum|税務・法的な制約|税务与法律限制', 'Rules restrict the mix.|Aturan membatasi kombinasi.|規則が、組み合わせを制限する。|规则限制组合。')
    ]),
    C('probation period', 'Probation period|Masa percobaan|試用期間|试用期', ['permanent staff'], [
      I('val', 'biz', 'safe', 3, 'Low risk of bad hires|Risiko salah rekrut kecil|採用ミスのリスク低減|降低错聘风险', 'Check fit before committing.|Periksa kecocokan sebelum berkomitmen.|本採用の前に、適性を確かめられる。|承诺前先验证契合。'),
      I('cap', 'biz,edu', 'learn', 2, 'Mutual trial|Uji coba dua arah|お互いに見極められる|双向试用', 'The employee also tests the job.|Karyawan juga menilai pekerjaannya.|本人も、仕事を見極められる。|员工也考察工作。'),
      I('eff', 'biz', 'flexible', 2, 'Easy to end|Mudah diakhiri|終了しやすい|易终止', 'Fewer legal hurdles at the start.|Hambatan hukum lebih sedikit di awal.|初期は、手続きが軽い。|早期法律障碍少。'),
      I('ppl', 'biz', 'goal', 2, 'Clear goals|Tujuan jelas|目標が明確|目标清晰', 'Targets to pass are set.|Target untuk lulus ditetapkan.|合格の目標が示される。|设定转正目标。')
    ], [
      I('ppl', 'biz,fam', 'fear', 3, 'Insecurity|Rasa tidak aman|不安定さ|不安全感', 'Constant worry about being let go.|Kekhawatiran terus-menerus diberhentikan.|解雇への不安が続く。|总担心被辞退。'),
      I('risk', 'biz', 'cheat', 2, 'Abuse of trial periods|Penyalahgunaan masa percobaan|試用期間の悪用|滥用试用期', 'Firms hire and drop repeatedly.|Perusahaan berulang kali merekrut dan melepas.|採用と解雇を繰り返す企業もある。|公司反复招人再辞退。'),
      I('ppl', 'biz', 'leave', 2, 'Good people decline|Orang baik menolak|優秀な人が辞退|优秀者拒绝', 'Strong candidates want security.|Kandidat kuat menginginkan kepastian.|有能な人は、安定を求める。|强者想要保障。'),
      I('eff', 'biz', 'stress', 2, 'Performance anxiety|Kecemasan kinerja|成果へのプレッシャー|表现焦虑', 'People play it safe and hide mistakes.|Orang bermain aman dan menyembunyikan kesalahan.|無難に動き、失敗を隠しがち。|人们保守并隐瞒错误。')
    ])
  );
})();
