/* Word Network: curated concepts, batch 5 (operations and supply). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('lean production', 'Lean production|Produksi ramping (lean)|リーン生産|精益生产', ['safety stock'], [
      I('val', 'mfg,food,health', 'waste', 3, 'Less waste|Pemborosan berkurang|ムダの削減|减少浪费', 'Every step that adds no value is removed.|Setiap langkah yang tidak menambah nilai dihapus.|価値を生まない工程をなくす。|去除所有不增值环节。'),
      I('val', 'mfg,retail', 'save', 2, 'Lower costs|Biaya lebih rendah|コスト低減|成本更低', 'Less stock, space and rework.|Lebih sedikit stok, ruang, dan pengerjaan ulang.|在庫・スペース・手直しが減る。|库存、空间与返工减少。'),
      I('cap', 'mfg,health', 'quality', 2, 'Better quality|Kualitas lebih baik|品質の向上|质量更好', 'Problems surface early and get fixed.|Masalah terlihat lebih awal dan diperbaiki.|問題が早く見つかり、直される。|问题早暴露早解决。'),
      I('ppl', 'mfg,biz', 'team', 2, 'Engaged staff|Staf terlibat|従業員の参画|员工参与', 'Workers suggest and own improvements.|Pekerja mengusulkan dan memiliki perbaikan.|現場が改善を提案し、自分ごとにする。|员工提出并负责改进。')
    ], [
      I('risk', 'mfg,retail', 'danger', 3, 'Fragile to shocks|Rentan terhadap guncangan|ショックに弱い|抗冲击能力弱', 'No buffer when supply or demand jumps.|Tanpa penyangga saat pasokan atau permintaan melonjak.|需給が急変すると、余裕がなく対応できない。|供需突变时没有缓冲。'),
      I('ppl', 'mfg,biz', 'stress', 2, 'Pressure on workers|Tekanan pada pekerja|現場への負担|员工压力大', 'Constant improvement can feel like constant squeezing.|Perbaikan terus-menerus bisa terasa seperti terus ditekan.|絶え間ない改善が、絶え間ない締め付けに感じられる。|持续改进可能变成持续施压。'),
      I('eff', 'mfg,food', 'slow', 2, 'Slow to adopt|Lambat diterapkan|定着に時間がかかる|推行缓慢', 'Culture change takes years.|Perubahan budaya butuh bertahun-tahun.|文化の変革には、何年もかかる。|文化转变需数年。'),
      I('risk', 'mfg,biz', 'limit', 2, 'Can cut too deep|Bisa memangkas terlalu dalam|削りすぎの恐れ|可能削减过度', 'Removing slack removes room to innovate.|Menghapus kelonggaran menghapus ruang berinovasi.|余裕をなくすと、革新の余地もなくなる。|消除冗余也消除创新空间。')
    ]),
    C('safety stock', 'Safety stock|Stok pengaman|安全在庫|安全库存', ['lean production'], [
      I('val', 'retail,mfg,food', 'safe', 3, 'Avoids stockouts|Menghindari kehabisan stok|欠品を防ぐ|避免缺货', 'Customers find what they want.|Pelanggan menemukan yang mereka cari.|顧客が欲しいものを見つけられる。|客户总能买到想要的。'),
      I('cap', 'mfg,retail', 'safe', 2, 'Absorbs shocks|Menyerap guncangan|ショックの吸収|吸收冲击', 'Delays and demand spikes are covered.|Keterlambatan dan lonjakan permintaan tertutupi.|遅延や急な需要増をカバーできる。|覆盖延误和需求激增。'),
      I('mkt', 'retail,food', 'loyal', 2, 'Reliable service|Layanan andal|信頼できる供給|服务可靠', 'Dependable delivery keeps clients.|Pengiriman yang andal mempertahankan klien.|確実な納品が、顧客をつなぎ止める。|可靠交付留住客户。'),
      I('val', 'mfg,retail', 'save', 2, 'Bulk discounts|Diskon pembelian besar|まとめ買い割引|批量折扣', 'Larger orders often get lower prices.|Pesanan lebih besar sering mendapat harga lebih rendah.|大量発注で、単価が下がることが多い。|大订单常有更低单价。')
    ], [
      I('cost', 'retail,mfg,food', 'money', 3, 'Ties up cash|Menahan kas|資金の固定化|占用现金', 'Money sits on shelves instead of working.|Uang menganggur di rak, bukan bekerja.|お金が、棚に眠ったままになる。|资金躺在货架上不创造价值。'),
      I('risk', 'food,retail', 'waste', 3, 'Spoilage and obsolescence|Kerusakan dan usang|劣化・陳腐化|变质与过时', 'Stock can expire or go out of fashion.|Stok bisa kedaluwarsa atau ketinggalan zaman.|在庫が、期限切れや流行遅れになる。|库存可能过期或过时。'),
      I('cost', 'retail,mfg', 'space', 2, 'Storage costs|Biaya penyimpanan|保管コスト|仓储成本', 'Warehouses, insurance and handling add up.|Gudang, asuransi, dan penanganan menambah biaya.|倉庫・保険・取扱いの費用がかさむ。|仓库、保险与搬运费累积。'),
      I('risk', 'mfg,retail', 'theft', 2, 'Theft and damage|Pencurian dan kerusakan|盗難・破損|盗窃与损坏', 'More stock means more to lose.|Stok lebih banyak berarti lebih banyak yang bisa hilang.|在庫が多いほど、失う可能性も増える。|库存越多越容易损失。')
    ]),
    C('just in time', 'Just-in-time|Just-in-time|ジャストインタイム|准时制', ['safety stock'], [
      I('val', 'mfg,retail', 'save', 3, 'Low inventory cost|Biaya persediaan rendah|在庫コストが低い|库存成本低', 'Goods arrive only when needed.|Barang datang hanya saat dibutuhkan.|必要なときにだけ、部品が届く。|货物只在需要时到达。'),
      I('val', 'mfg,food', 'waste', 2, 'Less waste|Lebih sedikit limbah|ムダが少ない|浪费少', 'Little stock to expire or become obsolete.|Sedikit stok yang kedaluwarsa atau usang.|期限切れや陳腐化する在庫が少ない。|少有库存过期或过时。'),
      I('cap', 'mfg,retail', 'flexible', 2, 'Quick product changes|Perubahan produk cepat|製品切替が早い|产品切换快', 'Little old stock to clear before a new model.|Sedikit stok lama yang harus dihabiskan sebelum model baru.|新製品の前に、処分すべき旧在庫が少ない。|换新品前要清的旧库存少。'),
      I('cap', 'mfg,biz', 'partner', 2, 'Close supplier ties|Hubungan pemasok erat|サプライヤーとの緊密な関係|供应商关系紧密', 'Working together improves quality and speed.|Bekerja sama meningkatkan kualitas dan kecepatan.|協力して、品質とスピードが向上する。|合作提升质量与速度。')
    ], [
      I('risk', 'mfg,retail', 'danger', 3, 'Supply disruption halts everything|Gangguan pasokan menghentikan semua|供給途絶で全停止|供应中断全面停摆', 'One late truck stops the line.|Satu truk terlambat menghentikan lini produksi.|トラック1台の遅れで、ラインが止まる。|一辆车晚点整条线停工。'),
      I('risk', 'mfg,retail', 'depend', 3, 'Dependence on suppliers|Ketergantungan pada pemasok|仕入先への依存|依赖供应商', 'You must trust their reliability.|Anda harus memercayai keandalan mereka.|相手の信頼性に頼るしかない。|只能信赖其可靠性。'),
      I('eff', 'mfg,retail', 'hard', 2, 'Demands precise planning|Menuntut perencanaan presisi|精密な計画が必要|需要精确计划', 'Forecast errors have no cushion.|Kesalahan perkiraan tanpa bantalan.|予測のずれを吸収する余裕がない。|预测失误无缓冲。'),
      I('cost', 'mfg,retail', 'expensive', 2, 'Frequent small deliveries|Pengiriman kecil yang sering|少量・高頻度の配送|频繁小批量配送', 'Transport costs rise and emissions too.|Biaya angkut naik, emisi juga.|輸送コストと排出が増える。|运输成本与排放上升。')
    ]),
    C('mass production', 'Mass production|Produksi massal|大量生産|大规模生产', ['batch production'], [
      I('val', 'mfg,food,retail', 'cheap', 3, 'Low cost per unit|Biaya per unit rendah|単価が安い|单位成本低', 'Scale spreads fixed costs over many units.|Skala membagi biaya tetap ke banyak unit.|固定費を多数の製品に分散できる。|规模将固定成本摊到众多单位。'),
      I('cap', 'mfg,food', 'steady', 2, 'Consistent quality|Kualitas konsisten|品質が安定|质量稳定', 'Every unit is nearly identical.|Setiap unit hampir identik.|どの製品もほぼ同じ品質になる。|每个产品几乎一致。'),
      I('mkt', 'retail,food', 'reach', 2, 'Wide availability|Tersedia luas|広く入手可能|供应广泛', 'Lots of people can buy it.|Banyak orang dapat membelinya.|多くの人が手に入れられる。|很多人买得到。'),
      I('eff', 'mfg,food', 'fast', 2, 'High speed|Kecepatan tinggi|生産速度が高い|速度快', 'Automation produces vast volumes quickly.|Otomatisasi menghasilkan volume besar dengan cepat.|自動化で、大量を素早く作れる。|自动化快速产出大批量。')
    ], [
      I('cost', 'mfg,food', 'expensive', 3, 'Huge upfront investment|Investasi awal sangat besar|巨額の初期投資|前期投资巨大', 'Machines and plants cost a fortune.|Mesin dan pabrik sangat mahal.|設備や工場に莫大な費用がかかる。|设备与工厂花费巨大。'),
      I('risk', 'mfg,retail', 'stuck', 3, 'Inflexible|Kurang fleksibel|柔軟性に欠ける|缺乏灵活性', 'Changing the product means retooling.|Mengubah produk berarti mengganti peralatan.|製品を変えるには、設備の入れ替えが要る。|换产品需要重新调整设备。'),
      I('risk', 'mfg,retail', 'lose', 2, 'Overproduction risk|Risiko produksi berlebih|過剰生産のリスク|产能过剩风险', 'Unsold goods pile up if demand falls.|Barang tak terjual menumpuk jika permintaan turun.|需要が落ちれば、売れ残りが積み上がる。|需求下降则滞销堆积。'),
      I('ppl', 'mfg,biz', 'boring', 2, 'Repetitive work|Pekerjaan monoton|単調な作業|工作单调', 'Workers do the same task all day.|Pekerja melakukan tugas sama seharian.|同じ作業を、一日中繰り返す。|工人整天重复同一任务。')
    ]),
    C('batch production', 'Batch production|Produksi batch|バッチ生産|批量生产', ['mass production'], [
      I('cap', 'food,mfg', 'flexible', 3, 'Flexible products|Produk fleksibel|製品切替の柔軟性|产品灵活', 'You can switch between recipes or models.|Anda bisa berganti resep atau model.|レシピやモデルを切り替えられる。|可在配方或型号间切换。'),
      I('val', 'food,mfg', 'save', 2, 'Moderate investment|Investasi sedang|中程度の投資|投资适中', 'General equipment serves many products.|Peralatan umum melayani banyak produk.|汎用設備で、多くの製品を作れる。|通用设备可生产多种产品。'),
      I('mkt', 'food,retail', 'choice', 2, 'Variety for customers|Variasi bagi pelanggan|顧客への選択肢|给客户更多选择', 'Different batches suit different tastes.|Batch berbeda cocok untuk selera berbeda.|ロットごとに、違うニーズに応えられる。|不同批次满足不同口味。'),
      I('val', 'food,mfg', 'safe', 2, 'Quality checks per batch|Pemeriksaan kualitas per batch|ロットごとの検査|按批次质检', 'A faulty batch is isolated.|Batch yang cacat dapat diisolasi.|不良ロットを切り分けられる。|问题批次可被隔离。')
    ], [
      I('cost', 'food,mfg', 'expensive', 3, 'Higher unit cost|Biaya per unit lebih tinggi|単価が高い|单位成本较高', 'No full economy of scale.|Tidak ada skala ekonomi penuh.|規模のメリットを十分に得られない。|无法完全享受规模经济。'),
      I('eff', 'food,mfg', 'wait', 2, 'Idle time between batches|Waktu menganggur antar batch|ロット間の待ち時間|批次间闲置', 'Equipment waits during changeovers.|Peralatan menunggu saat pergantian.|段取り替えの間、設備が止まる。|换产期间设备等待。'),
      I('eff', 'mfg,food', 'complex', 2, 'Complex scheduling|Penjadwalan rumit|スケジュールが複雑|排程复杂', 'Which batch next? Planning is hard.|Batch mana berikutnya? Perencanaan sulit.|次にどのロットを作るか、計画が難しい。|下一批做什么？排产很难。'),
      I('risk', 'food,mfg', 'waste', 2, 'Stock between stages|Stok antar tahap|工程間の仕掛在庫|工序间积压', 'Work in progress piles up.|Barang setengah jadi menumpuk.|仕掛品が溜まる。|在制品堆积。')
    ]),
    C('quality control', 'Quality control|Pengendalian kualitas|品質管理|质量控制', ['cost cutting'], [
      I('mkt', 'mfg,food,health', 'trust', 3, 'Customer trust|Kepercayaan pelanggan|顧客の信頼|客户信任', 'Reliable goods build a reputation.|Barang andal membangun reputasi.|信頼できる商品が、評判を築く。|可靠的产品奠定声誉。'),
      I('val', 'mfg,food', 'save', 2, 'Fewer returns and repairs|Retur dan perbaikan lebih sedikit|返品・修理の減少|减少退货与维修', 'Defects are caught before they reach customers.|Cacat tertangkap sebelum sampai ke pelanggan.|不良品が、顧客に届く前に見つかる。|缺陷在到达客户前被发现。'),
      I('cap', 'mfg,food,health', 'safe', 2, 'Safety and compliance|Keselamatan dan kepatuhan|安全と法令順守|安全与合规', 'Standards and rules are met.|Standar dan aturan terpenuhi.|基準や規則を満たせる。|符合标准与法规。'),
      I('cap', 'mfg,biz', 'learn', 2, 'Learning from defects|Belajar dari cacat|不良から学ぶ|从缺陷中学习', 'Patterns point to root causes.|Pola mengarah pada akar masalah.|傾向から、根本原因が分かる。|规律指向根本原因。')
    ], [
      I('cost', 'mfg,food', 'expensive', 3, 'Inspection costs|Biaya pemeriksaan|検査コスト|检验成本', 'Testing, staff and equipment cost money.|Pengujian, staf, dan peralatan butuh dana.|検査・人員・機器に費用がかかる。|检测、人员与设备花钱。'),
      I('eff', 'mfg,food', 'slow', 2, 'Slows production|Memperlambat produksi|生産が遅くなる|拖慢生产', 'Waiting for checks delays shipments.|Menunggu pemeriksaan menunda pengiriman.|検査待ちで、出荷が遅れる。|等待检验延误出货。'),
      I('ppl', 'mfg,biz', 'blame', 2, 'Blame culture|Budaya saling menyalahkan|責任追及の風土|甩锅文化', 'Inspectors and makers become opponents.|Pemeriksa dan pembuat menjadi lawan.|検査側と製造側が対立する。|检验员与生产者变成对手。'),
      I('risk', 'mfg,food', 'mistake', 2, 'Cannot inspect quality in|Kualitas tak bisa diperiksa ke dalam produk|検査で品質は作れない|质量无法靠检验得来', 'Inspection finds defects but does not prevent them.|Pemeriksaan menemukan cacat tetapi tidak mencegahnya.|検査は不良を見つけるだけで、防ぎはしない。|检验发现缺陷但无法预防。')
    ]),
    C('six sigma', 'Six Sigma|Six Sigma|シックスシグマ|六西格玛', ['kaizen'], [
      I('cap', 'mfg,health,biz', 'data', 3, 'Data-driven decisions|Keputusan berbasis data|データに基づく判断|数据驱动决策', 'Problems are measured, not guessed.|Masalah diukur, bukan ditebak.|問題を、推測でなく測定で扱う。|问题靠测量而非猜测。'),
      I('val', 'mfg,health', 'quality', 3, 'Very few defects|Cacat sangat sedikit|不良の極小化|缺陷极少', 'Targets near-zero errors.|Menargetkan kesalahan mendekati nol.|ほぼゼロの不良を目指す。|目标是近乎零错误。'),
      I('val', 'mfg,biz', 'save', 2, 'Savings|Penghematan|コスト削減|节省成本', 'Fewer defects mean less rework and scrap.|Cacat lebih sedikit berarti lebih sedikit pengerjaan ulang dan sisa.|不良が減り、手直しや廃棄が減る。|缺陷少则返工与废料少。'),
      I('cap', 'mfg,biz', 'skill', 2, 'Trained problem solvers|Pemecah masalah terlatih|問題解決人材の育成|培养问题解决者', 'Belts build a common method.|Sabuk (belt) membangun metode bersama.|ベルト制度が、共通の手法を育てる。|黑带体系建立统一方法。')
    ], [
      I('cost', 'mfg,biz', 'expensive', 3, 'Costly programme|Program mahal|導入費用が高い|项目昂贵', 'Training, consultants and project time add up.|Pelatihan, konsultan, dan waktu proyek menambah biaya.|研修・コンサル・プロジェクト工数がかさむ。|培训、顾问与项目工时累积。'),
      I('eff', 'mfg,biz', 'rules', 2, 'Bureaucracy|Birokrasi|官僚的になる|官僚化', 'Forms and procedures can swamp the work.|Formulir dan prosedur bisa membanjiri pekerjaan.|書類と手続きが、本来の仕事を圧迫する。|表格与流程可能淹没工作。'),
      I('risk', 'biz,retail', 'new', 2, 'Can stifle innovation|Bisa menghambat inovasi|革新を妨げる恐れ|可能抑制创新', 'Reducing variation can discourage experiments.|Mengurangi variasi bisa mengecilkan hati eksperimen.|ばらつきを減らす発想が、実験を遠ざける。|减少变异可能抑制试验。'),
      I('eff', 'retail,food', 'limit', 2, 'Suits repeatable work|Cocok untuk pekerjaan berulang|反復作業向き|适合重复性工作', 'Creative or one-off tasks fit poorly.|Pekerjaan kreatif atau sekali jalan kurang cocok.|創造的・単発の仕事には合いにくい。|创意或一次性任务不太适合。')
    ]),
    C('kaizen', 'Kaizen (continuous improvement)|Kaizen (perbaikan berkelanjutan)|改善（カイゼン）|持续改善', ['six sigma'], [
      I('ppl', 'mfg,biz,health', 'team', 3, 'Everyone contributes|Semua berkontribusi|全員が参加|人人参与', 'Frontline staff suggest ideas.|Staf lapangan memberi usulan.|現場の社員がアイデアを出す。|一线员工提出想法。'),
      I('val', 'mfg,biz', 'save', 2, 'Small steps add up|Langkah kecil menumpuk|小さな積み重ね|小步积累', 'Many tiny savings become big ones.|Banyak penghematan kecil menjadi besar.|小さな改善の積み重ねが、大きな成果になる。|无数小改进汇成大成果。'),
      I('cap', 'mfg,biz', 'low', 2, 'Low risk|Risiko rendah|低リスク|风险低', 'Changes are small and easy to undo.|Perubahan kecil dan mudah dibatalkan.|変更が小さく、元に戻しやすい。|改动小且易撤回。'),
      I('ppl', 'mfg,biz', 'proud', 2, 'Ownership and pride|Rasa memiliki dan bangga|当事者意識と誇り|主人翁与自豪', 'People care about processes they improved.|Orang peduli pada proses yang mereka perbaiki.|自分が改善した工程に、愛着が生まれる。|人们珍视自己改进的流程。')
    ], [
      I('eff', 'biz,mfg', 'slow', 3, 'Slow progress|Kemajuan lambat|成果が出るのが遅い|进展缓慢', 'Small steps rarely transform a business.|Langkah kecil jarang mengubah bisnis secara total.|小さな改善だけでは、事業は一変しない。|小步很难彻底改变业务。'),
      I('risk', 'biz,mfg', 'stuck', 2, 'Misses big breakthroughs|Melewatkan terobosan besar|大きな飛躍を逃す|错过重大突破', 'Polishing the old way can hide the need to reinvent.|Memoles cara lama bisa menutupi kebutuhan untuk menciptakan ulang.|旧来のやり方を磨くほど、作り直す必要が見えなくなる。|打磨旧方法可能掩盖重构需求。'),
      I('ppl', 'biz,mfg', 'tired', 2, 'Improvement fatigue|Jenuh perbaikan|改善疲れ|改善疲劳', 'Staff tire of endless change.|Staf lelah dengan perubahan tanpa akhir.|終わりのない改善に、社員が疲れる。|员工厌倦无止境的变化。'),
      I('eff', 'biz,mfg', 'time', 2, 'Needs sustained commitment|Butuh komitmen berkelanjutan|継続的な推進が必要|需要持续投入', 'Without leaders pushing, it fades.|Tanpa dorongan pemimpin, ia memudar.|リーダーが後押ししなければ、尻すぼみになる。|没有领导推动就会消退。')
    ]),
    C('preventive maintenance', 'Preventive maintenance|Perawatan preventif|予防保全|预防性维护', ['downtime'], [
      I('val', 'mfg,health,pub', 'safe', 3, 'Fewer breakdowns|Kerusakan lebih sedikit|故障の減少|减少故障', 'Problems are fixed before they stop work.|Masalah diperbaiki sebelum menghentikan pekerjaan.|止まる前に、問題を直せる。|在停工前修好问题。'),
      I('val', 'mfg,biz', 'save', 2, 'Lower repair costs|Biaya perbaikan lebih rendah|修理費の低減|维修成本降低', 'Early fixes are cheaper than emergencies.|Perbaikan dini lebih murah daripada darurat.|早めの修理は、緊急対応より安い。|早修比抢修便宜。'),
      I('cap', 'mfg,health', 'long', 2, 'Longer equipment life|Umur peralatan lebih panjang|設備の長寿命化|设备寿命更长', 'Well-kept machines last years more.|Mesin yang terawat bertahan bertahun-tahun lebih lama.|手入れされた設備は、何年も長持ちする。|保养良好的机器多用数年。'),
      I('ppl', 'mfg,health', 'safe', 2, 'Safer workplace|Tempat kerja lebih aman|安全な職場|更安全的工作场所', 'Fewer accidents from failing equipment.|Lebih sedikit kecelakaan akibat peralatan rusak.|設備故障による事故が減る。|设备故障引发的事故减少。')
    ], [
      I('cost', 'mfg,biz', 'expensive', 3, 'Regular spending|Pengeluaran rutin|定期的な出費|定期支出', 'You pay even when nothing is wrong.|Anda membayar bahkan saat tidak ada masalah.|故障していなくても、費用がかかる。|没坏也要花钱。'),
      I('eff', 'mfg,biz', 'stop', 3, 'Planned downtime|Waktu henti terencana|計画的な停止|计划停机', 'Machines stop for servicing.|Mesin berhenti untuk diservis.|整備のために、設備を止める必要がある。|机器为保养而停机。'),
      I('risk', 'mfg,biz', 'waste', 2, 'May service too early|Mungkin diservis terlalu dini|過剰整備の恐れ|可能过度保养', 'Parts may be replaced while still good.|Suku cadang bisa diganti saat masih bagus.|まだ使える部品まで交換してしまう。|可能更换仍完好的部件。'),
      I('risk', 'mfg,health', 'mistake', 2, 'Maintenance errors|Kesalahan perawatan|整備ミス|维护失误', 'Servicing itself can introduce faults.|Perawatan itu sendiri bisa menimbulkan kerusakan.|整備そのものが、不具合を生むことがある。|保养本身也可能引入故障。')
    ]),
    C('downtime', 'Run until it breaks|Operasikan sampai rusak|壊れるまで使う|坏了再修', ['preventive maintenance'], [
      I('val', 'mfg,retail', 'save', 3, 'No maintenance spending|Tanpa biaya perawatan|保全費がかからない|不花保养费', 'Money is spent only when something fails.|Uang dikeluarkan hanya saat ada yang rusak.|壊れたときにだけ、費用を払う。|只在坏时才花钱。'),
      I('eff', 'mfg,retail', 'easy', 2, 'Simple|Sederhana|シンプル|简单', 'No schedules or checklists to manage.|Tidak ada jadwal atau daftar periksa untuk dikelola.|計画やチェックリストを管理しなくていい。|无需管理排程与清单。'),
      I('val', 'retail,fam', 'cheap', 2, 'Fine for cheap items|Cocok untuk barang murah|安価な物に向く|适合廉价物品', 'Replacing is cheaper than servicing.|Mengganti lebih murah daripada merawat.|交換のほうが、保守より安い。|更换比保养便宜。'),
      I('cap', 'mfg,biz', 'flexible', 2, 'Full use of equipment|Peralatan dipakai penuh|設備を最大限使える|设备满负荷使用', 'No time lost to servicing.|Tidak ada waktu terbuang untuk servis.|保守で止める時間がない。|无保养占用时间。')
    ], [
      I('risk', 'mfg,health', 'danger', 3, 'Unplanned breakdowns|Kerusakan tak terduga|突然の故障|意外故障', 'Failures come at the worst time.|Kerusakan datang di waktu terburuk.|故障は、最悪のタイミングで起きる。|故障偏在最糟时刻发生。'),
      I('cost', 'mfg,biz', 'expensive', 3, 'Costly emergency repairs|Perbaikan darurat mahal|緊急修理は高額|紧急维修昂贵', 'Rush fixes and lost output add up.|Perbaikan mendadak dan produksi hilang menambah biaya.|急ぎの修理と生産ロスがかさむ。|抢修与产能损失累积。'),
      I('ppl', 'mfg,health', 'danger', 2, 'Safety hazards|Bahaya keselamatan|安全上の危険|安全隐患', 'Failing machines can injure people.|Mesin rusak dapat melukai orang.|故障した機械が、人を傷つけることがある。|故障机器可能伤人。'),
      I('mkt', 'retail,mfg', 'lose', 2, 'Lost customers|Pelanggan hilang|顧客を失う|流失客户', 'Missed deliveries push buyers away.|Pengiriman yang gagal menjauhkan pembeli.|納期遅れで、顧客が離れる。|交付延误使买家离开。')
    ]),
    C('single sourcing', 'Single sourcing|Satu pemasok|単一調達|单一来源采购', ['multi sourcing'], [
      I('val', 'mfg,retail,food', 'cheap', 3, 'Volume discounts|Diskon volume|ボリュームディスカウント|批量折扣', 'More business with one supplier means a better price.|Lebih banyak bisnis dengan satu pemasok berarti harga lebih baik.|1社に集中すれば、価格交渉に有利。|集中采购可争取更优价格。'),
      I('cap', 'mfg,biz', 'partner', 3, 'Close partnership|Kemitraan erat|緊密なパートナーシップ|紧密合作', 'Shared planning and trust improve quality.|Perencanaan bersama dan kepercayaan meningkatkan kualitas.|共同の計画と信頼が、品質を高める。|共同规划与信任提升质量。'),
      I('eff', 'mfg,retail', 'easy', 2, 'Less admin|Administrasi lebih ringan|管理が簡単|行政更轻松', 'One contract, one contact.|Satu kontrak, satu kontak.|契約も窓口も1つで済む。|一份合同一个联系人。'),
      I('cap', 'mfg,food', 'steady', 2, 'Consistent specs|Spesifikasi konsisten|仕様の安定|规格一致', 'Same inputs every time.|Bahan baku sama setiap kali.|毎回、同じ品質の部材が届く。|每次投入一致。')
    ], [
      I('risk', 'mfg,retail,food', 'danger', 3, 'Supply risk|Risiko pasokan|供給リスク|供应风险', 'If the supplier fails, you stop.|Jika pemasok gagal, Anda berhenti.|供給元が止まれば、自社も止まる。|供应商出问题你就停。'),
      I('risk', 'mfg,retail', 'weak', 2, 'Weak bargaining power|Posisi tawar lemah|交渉力の低下|议价能力弱', 'The supplier knows you have no alternative.|Pemasok tahu Anda tidak punya alternatif.|代わりがないと、相手に足元を見られる。|供应商知道你别无选择。'),
      I('risk', 'mfg,biz', 'lock', 2, 'Lock-in|Terkunci|囲い込み|被锁定', 'Switching later is slow and costly.|Berpindah kemudian lambat dan mahal.|後から乗り換えるのは、時間も費用もかかる。|日后切换既慢又贵。'),
      I('cost', 'mfg,retail', 'expensive', 2, 'Price creep|Harga merayap naik|価格の上昇|价格悄然上涨', 'Without competition, prices rise.|Tanpa persaingan, harga naik.|競争がなければ、価格は上がっていく。|无竞争则价格上涨。')
    ]),
    C('multi sourcing', 'Multiple sourcing|Banyak pemasok|複数調達|多源采购', ['single sourcing'], [
      I('val', 'mfg,retail,food', 'safe', 3, 'Supply security|Keamanan pasokan|供給の安定|供应安全', 'If one fails, others cover.|Jika satu gagal, yang lain menutupi.|1社が止まっても、他社でカバーできる。|一家出问题其他补上。'),
      I('cap', 'mfg,retail', 'power', 2, 'Bargaining power|Daya tawar|交渉力|议价能力', 'Suppliers compete for your business.|Pemasok bersaing untuk bisnis Anda.|仕入先同士が、取引を競い合う。|供应商为你的订单竞争。'),
      I('val', 'mfg,food', 'choice', 2, 'Access to innovation|Akses ke inovasi|革新へのアクセス|接触创新', 'You see different ideas and technologies.|Anda melihat gagasan dan teknologi berbeda.|異なるアイデアや技術に触れられる。|可接触不同的想法与技术。'),
      I('cap', 'mfg,retail', 'flexible', 2, 'Flexibility|Fleksibilitas|柔軟性|灵活', 'You can shift orders as needed.|Anda dapat memindahkan pesanan sesuai kebutuhan.|必要に応じて、発注先を振り分けられる。|可按需调整订单。')
    ], [
      I('eff', 'mfg,retail', 'complex', 3, 'More admin|Administrasi lebih berat|管理が複雑|行政更繁琐', 'Many contracts, audits and contacts.|Banyak kontrak, audit, dan kontak.|契約・監査・窓口が増える。|合同、审核与联系人增多。'),
      I('cost', 'mfg,retail', 'expensive', 2, 'Lost volume discounts|Diskon volume hilang|数量割引の喪失|丧失批量折扣', 'Orders are split into smaller amounts.|Pesanan terpecah menjadi jumlah lebih kecil.|発注が分散し、単価が上がる。|订单被拆小，单价上升。'),
      I('risk', 'mfg,food', 'mistake', 2, 'Inconsistent quality|Kualitas tidak konsisten|品質のばらつき|质量不一致', 'Each supplier works a bit differently.|Setiap pemasok bekerja sedikit berbeda.|供給元ごとに、品質に差が出る。|每家供应商略有差异。'),
      I('ppl', 'mfg,biz', 'distance', 2, 'Weaker relationships|Hubungan lebih lemah|関係が浅くなる|关系较浅', 'Suppliers invest less in you.|Pemasok berinvestasi lebih sedikit pada Anda.|仕入先は、あなたに力を入れなくなる。|供应商对你投入更少。')
    ]),
    C('offshoring', 'Offshoring|Offshoring|オフショアリング|离岸外包', ['reshoring'], [
      I('val', 'mfg,biz,retail', 'cheap', 3, 'Lower labour costs|Biaya tenaga kerja lebih rendah|人件費の削減|人工成本低', 'Wages abroad can be far lower.|Upah di luar negeri bisa jauh lebih rendah.|海外の賃金は、はるかに低いことがある。|海外工资可能低得多。'),
      I('cap', 'mfg,biz', 'skill', 2, 'Access to talent|Akses ke talenta|人材へのアクセス|获取人才', 'Skills may be easier to find elsewhere.|Keahlian mungkin lebih mudah ditemukan di tempat lain.|他国のほうが、必要な人材を見つけやすい。|他国可能更易招到所需人才。'),
      I('mkt', 'mfg,retail', 'market', 2, 'Close to new markets|Dekat dengan pasar baru|新市場に近い|靠近新市场', 'Local presence helps sell locally.|Kehadiran lokal membantu menjual di sana.|現地に拠点があると、現地で売りやすい。|本地布局有助于本地销售。'),
      I('eff', 'mfg,biz', 'fast', 2, 'Round-the-clock work|Bekerja sepanjang waktu|24時間体制|全天候运转', 'Time zones keep work moving.|Zona waktu menjaga pekerjaan terus berjalan.|時差を活かして、仕事が止まらない。|时差让工作不间断。')
    ], [
      I('risk', 'mfg,biz', 'danger', 3, 'Geopolitical and supply risk|Risiko geopolitik dan pasokan|地政学・供給リスク|地缘与供应风险', 'Distance, politics and shipping can interrupt supply.|Jarak, politik, dan pelayaran dapat mengganggu pasokan.|距離・政治・輸送が、供給を途切れさせうる。|距离、政治与运输可能中断供应。'),
      I('eff', 'mfg,biz', 'hard', 2, 'Communication problems|Masalah komunikasi|意思疎通の難しさ|沟通困难', 'Language, culture and time gaps cause errors.|Perbedaan bahasa, budaya, dan waktu menimbulkan kesalahan.|言語・文化・時差が、ミスを生む。|语言、文化与时差引发错误。'),
      I('ppl', 'mfg,pub', 'job', 2, 'Job losses and criticism|PHK dan kritik|雇用喪失と批判|失业与批评', 'Home workers and public may object.|Pekerja dan publik di dalam negeri mungkin menentang.|国内の従業員や世論の反発を招く。|国内员工与公众可能反对。'),
      I('risk', 'mfg,biz', 'copy', 2, 'IP leakage|Kebocoran kekayaan intelektual|知財の流出|知识产权泄露', 'Know-how can be copied abroad.|Pengetahuan teknis bisa ditiru di luar negeri.|ノウハウが、海外で模倣される恐れがある。|技术诀窍可能在海外被抄。')
    ]),
    C('reshoring', 'Reshoring|Reshoring|国内回帰|制造回流', ['offshoring'], [
      I('val', 'mfg,retail', 'safe', 3, 'Stable supply|Pasokan stabil|供給の安定|供应稳定', 'Short distances reduce disruption.|Jarak dekat mengurangi gangguan.|距離が近く、途絶しにくい。|距离近，中断少。'),
      I('mkt', 'mfg,retail,food', 'quality', 2, 'Quality control|Kendali kualitas|品質管理しやすい|质量易管控', 'You can inspect and fix problems quickly.|Anda bisa memeriksa dan memperbaiki masalah dengan cepat.|問題を、すぐ確認し直せる。|可快速检查与整改。'),
      I('mkt', 'mfg,retail', 'name', 2, 'Made-at-home appeal|Daya tarik buatan lokal|国産の訴求力|本土制造的卖点', 'Some customers prefer local products.|Sebagian pelanggan menyukai produk lokal.|国産を好む顧客もいる。|部分客户偏爱本土产品。'),
      I('cap', 'mfg,pub', 'fast', 2, 'Faster response|Respons lebih cepat|素早い対応|响应更快', 'Shorter lead times mean quicker changes.|Waktu tunggu lebih singkat berarti perubahan lebih cepat.|リードタイムが短く、変更に素早く対応できる。|交期短，调整更快。')
    ], [
      I('cost', 'mfg,retail', 'expensive', 3, 'Higher labour costs|Biaya tenaga kerja lebih tinggi|人件費が高い|人工成本高', 'Wages at home are higher.|Upah di dalam negeri lebih tinggi.|国内の賃金は高い。|本国工资更高。'),
      I('cost', 'mfg', 'money', 2, 'Moving costs|Biaya pemindahan|移転コスト|搬迁成本', 'New plants and retraining are expensive.|Pabrik baru dan pelatihan ulang mahal.|新工場や再教育に費用がかかる。|新厂与再培训昂贵。'),
      I('eff', 'mfg,pub', 'skill', 2, 'Skills shortage|Kekurangan keterampilan|人材不足|技能短缺', 'Local workers may lack the needed skills.|Pekerja lokal mungkin kurang keterampilan yang dibutuhkan.|必要な技能を持つ人材が、国内にいないことがある。|本地工人可能缺乏所需技能。'),
      I('mkt', 'retail,mfg', 'expensive', 2, 'Higher prices for customers|Harga lebih tinggi bagi pelanggan|価格への転嫁|售价上升', 'Costs are passed on.|Biaya diteruskan ke pelanggan.|コストが価格に転嫁される。|成本转嫁给客户。')
    ]),
    C('dropshipping', 'Dropshipping|Dropshipping|ドロップシッピング|代发货', ['safety stock'], [
      I('val', 'retail', 'cheap', 3, 'No stock to buy|Tanpa membeli stok|在庫不要|无需囤货', 'You pay the supplier only after a customer pays.|Anda membayar pemasok hanya setelah pelanggan membayar.|顧客が払ってから仕入れるので、資金が要らない。|客户付款后你才付供应商。'),
      I('eff', 'retail', 'easy', 2, 'Easy to start|Mudah dimulai|始めやすい|易于起步', 'No warehouse or packing needed.|Tidak perlu gudang atau pengemasan.|倉庫も梱包も要らない。|无需仓库与打包。'),
      I('cap', 'retail', 'flexible', 2, 'Test products fast|Uji produk cepat|商品を素早くテスト|快速测品', 'Add or drop items without risk.|Tambah atau hapus barang tanpa risiko.|リスクなく、商品を追加・削除できる。|无风险地增减商品。'),
      I('val', 'retail', 'reach', 2, 'Wide catalogue|Katalog luas|豊富な品揃え|商品目录丰富', 'You can offer thousands of items.|Anda dapat menawarkan ribuan barang.|何千もの商品を扱える。|可提供数千种商品。')
    ], [
      I('cost', 'retail', 'poor', 3, 'Thin margins|Margin tipis|利益が薄い|利润微薄', 'Competition pushes prices down.|Persaingan menekan harga.|競争で、価格が下がる。|竞争压低价格。'),
      I('risk', 'retail', 'lose', 3, 'No control over quality or delivery|Tanpa kendali atas kualitas atau pengiriman|品質・納期を管理できない|无法管控质量与交付', 'Your brand takes the blame for supplier errors.|Merek Anda disalahkan atas kesalahan pemasok.|仕入先のミスで、自社が責められる。|供应商出错你背锅。'),
      I('mkt', 'retail', 'compete', 2, 'Easy to copy|Mudah ditiru|真似されやすい|易被模仿', 'Anyone can sell the same items.|Siapa pun dapat menjual barang yang sama.|誰でも同じ商品を売れる。|任何人都能卖同样商品。'),
      I('eff', 'retail', 'slow', 2, 'Slow shipping|Pengiriman lambat|配送が遅い|发货慢', 'Items may arrive weeks later.|Barang mungkin tiba berminggu-minggu kemudian.|商品が届くまで、数週間かかることがある。|商品可能数周后才到。')
    ]),
    C('make to order', 'Make to order|Produksi sesuai pesanan|受注生産|按订单生产', ['make to stock'], [
      I('val', 'mfg,food,retail', 'waste', 3, 'No unsold stock|Tanpa stok tak terjual|売れ残りなし|无滞销库存', 'You build only what is already sold.|Anda hanya membuat yang sudah terjual.|売れた分だけ作る。|只生产已售出的。'),
      I('mkt', 'mfg,retail', 'customer', 2, 'Customised products|Produk sesuai kebutuhan|カスタマイズ対応|可定制', 'Each item fits the buyer.|Setiap barang sesuai pembeli.|1点ごとに、顧客に合わせられる。|每件都贴合买家。'),
      I('val', 'mfg,retail', 'save', 2, 'Low inventory cost|Biaya persediaan rendah|在庫コストが低い|库存成本低', 'No warehouses full of finished goods.|Tanpa gudang penuh barang jadi.|完成品の倉庫が要らない。|无需堆满成品的仓库。'),
      I('val', 'mfg,retail', 'premium', 2, 'Premium prices|Harga premium|高い価格を設定できる|可定高价', 'Customers pay more for tailor-made goods.|Pelanggan membayar lebih untuk barang buatan khusus.|オーダーメイドには、高く払ってもらえる。|定制品客户愿多付。')
    ], [
      I('eff', 'mfg,retail', 'wait', 3, 'Customers wait|Pelanggan menunggu|顧客を待たせる|客户要等', 'Delivery takes days or weeks.|Pengiriman butuh hari atau minggu.|納品まで、数日から数週間かかる。|交付需数天至数周。'),
      I('risk', 'mfg,retail', 'lose', 2, 'Lost impulse sales|Penjualan impulsif hilang|衝動買いを逃す|错失冲动购买', 'People who want it now go elsewhere.|Orang yang menginginkannya sekarang pergi ke tempat lain.|今すぐ欲しい人は、他店に行く。|想立刻拥有的人会去别处。'),
      I('eff', 'mfg,biz', 'hard', 2, 'Uneven workload|Beban kerja tidak merata|負荷の波|工作量不均', 'Busy peaks and idle valleys.|Puncak sibuk dan lembah sepi.|忙しい時と暇な時の差が大きい。|忙闲悬殊。'),
      I('cost', 'mfg,retail', 'expensive', 2, 'Small-batch cost|Biaya batch kecil|少量生産でコスト高|小批量成本高', 'No economies of scale.|Tanpa skala ekonomi.|規模の経済が働かない。|无规模经济。')
    ]),
    C('make to stock', 'Make to stock|Produksi untuk stok|見込み生産|按库存生产', ['make to order'], [
      I('mkt', 'retail,food', 'now', 3, 'Instant availability|Tersedia langsung|すぐに手に入る|立即可得', 'Customers buy and leave with the item.|Pelanggan membeli dan langsung membawa pulang.|買ってすぐ持ち帰れる。|客户买了就带走。'),
      I('val', 'mfg,retail', 'cheap', 2, 'Scale economies|Skala ekonomi|規模の経済|规模经济', 'Large runs lower unit cost.|Produksi besar menurunkan biaya per unit.|大量生産で、単価が下がる。|大批量降低单位成本。'),
      I('cap', 'mfg,retail', 'steady', 2, 'Smooth production|Produksi lancar|生産の平準化|生产平稳', 'Factories run at a steady pace.|Pabrik berjalan dengan ritme stabil.|工場を一定のペースで動かせる。|工厂保持稳定节奏。'),
      I('mkt', 'retail,food', 'impulse', 2, 'Impulse buying|Pembelian impulsif|衝動買い|冲动购买', 'Visible stock invites purchase.|Stok yang terlihat mengundang pembelian.|並んだ商品が、購買を誘う。|陈列商品引发购买。')
    ], [
      I('risk', 'retail,food', 'waste', 3, 'Unsold stock|Stok tak terjual|売れ残り|滞销库存', 'Wrong guesses become markdowns.|Tebakan yang salah menjadi obral.|予測を外すと、値引きになる。|猜错就得打折。'),
      I('cost', 'retail,mfg', 'money', 2, 'Cash tied in inventory|Kas tertahan di persediaan|在庫に資金が拘束|现金压在库存', 'Money is spent before any sale.|Uang dikeluarkan sebelum ada penjualan.|売れる前に、お金を使う。|未卖先花钱。'),
      I('mkt', 'retail,mfg', 'old', 2, 'Obsolescence|Ketinggalan zaman|陳腐化|过时', 'Products can go out of fashion on the shelf.|Produk bisa ketinggalan mode saat di rak.|棚の上で、流行遅れになる。|商品在货架上就过时。'),
      I('eff', 'retail,mfg', 'hard', 2, 'Forecasting needed|Butuh peramalan|需要予測|需要预测', 'You must guess demand correctly.|Anda harus menebak permintaan dengan benar.|需要を正しく読む必要がある。|必须准确预测需求。')
    ]),
    C('circular economy', 'Circular economy|Ekonomi sirkular|循環型経済|循环经济', ['waste'], [
      I('val', 'mfg,food,retail', 'waste', 3, 'Less waste|Lebih sedikit limbah|廃棄の削減|减少废弃', 'Products and materials get reused.|Produk dan bahan digunakan kembali.|製品や素材が、再利用される。|产品与材料被再利用。'),
      I('val', 'mfg,retail', 'save', 2, 'Material savings|Hemat bahan|資源コストの削減|节省材料', 'Recycled inputs can cost less than new.|Bahan daur ulang bisa lebih murah daripada baru.|再生素材は、新品より安いことがある。|再生材料可能比新料便宜。'),
      I('mkt', 'retail,food,pub', 'good', 3, 'Good image|Citra baik|好印象|形象良好', 'Customers and regulators appreciate it.|Pelanggan dan regulator menghargainya.|顧客や規制当局に評価される。|客户与监管者认可。'),
      I('cap', 'mfg,pub', 'new', 2, 'New business models|Model bisnis baru|新しいビジネスモデル|新商业模式', 'Repair, rental and resale open new revenue.|Perbaikan, sewa, dan penjualan kembali membuka pendapatan baru.|修理・レンタル・再販が、新しい収益源になる。|维修、租赁与转售开辟新收入。')
    ], [
      I('cost', 'mfg,retail', 'expensive', 3, 'Costly redesign|Desain ulang mahal|再設計のコスト|重新设计昂贵', 'Products, logistics and systems must change.|Produk, logistik, dan sistem harus berubah.|製品・物流・システムを作り替える必要がある。|产品、物流与系统都要改。'),
      I('eff', 'mfg,retail', 'complex', 3, 'Complex logistics|Logistik rumit|物流が複雑|物流复杂', 'Collecting, sorting and returning goods is hard.|Mengumpulkan, memilah, dan mengembalikan barang itu sulit.|回収・選別・再投入の仕組みが難しい。|回收、分拣与返还很难。'),
      I('risk', 'mfg,retail', 'quality', 2, 'Quality worries|Kekhawatiran kualitas|品質への不安|质量担忧', 'Customers doubt reused materials.|Pelanggan ragu pada bahan bekas.|再利用素材を、顧客が不安に思う。|客户怀疑再生材料。'),
      I('mkt', 'retail,mfg', 'lose', 2, 'Lower sales of new items|Penjualan barang baru turun|新品販売の減少|新品销量下降', 'Durable, repairable goods sell less often.|Barang awet dan bisa diperbaiki terjual lebih jarang.|長持ちして修理できる製品は、買い替えが減る。|耐用可修的产品更换频率低。')
    ]),
    C('warehouse automation', 'Warehouse automation|Otomatisasi gudang|倉庫の自動化|仓库自动化', ['labour intensive'], [
      I('eff', 'retail,mfg,food', 'fast', 3, 'Speed and accuracy|Kecepatan dan akurasi|速度と正確さ|速度与准确', 'Machines pick and sort faster with fewer errors.|Mesin mengambil dan memilah lebih cepat dengan lebih sedikit kesalahan.|機械のほうが速く、ミスも少ない。|机器拣选更快更准。'),
      I('val', 'retail,mfg', 'save', 2, 'Lower long-term cost|Biaya jangka panjang lebih rendah|長期的な低コスト|长期成本低', 'Labour costs fall as volumes rise.|Biaya tenaga kerja turun saat volume naik.|取扱量が増えるほど、人件費が下がる。|量越大人工成本越低。'),
      I('ppl', 'retail,mfg', 'safe', 2, 'Safer work|Kerja lebih aman|作業の安全性|作业更安全', 'Heavy lifting is done by machines.|Pekerjaan angkat berat dilakukan mesin.|重い荷物は機械が運ぶ。|重体力活由机器完成。'),
      I('mkt', 'retail,food', 'customer', 2, 'Faster delivery|Pengiriman lebih cepat|配送の迅速化|送达更快', 'Same-day shipping becomes possible.|Pengiriman di hari yang sama menjadi mungkin.|当日配送が可能になる。|可实现当日达。')
    ], [
      I('cost', 'retail,mfg', 'expensive', 3, 'Large upfront cost|Biaya awal besar|初期費用が大きい|前期投入大', 'Robots and software are costly.|Robot dan perangkat lunak mahal.|ロボットやソフトに、巨額の費用がかかる。|机器人与软件昂贵。'),
      I('ppl', 'retail,mfg', 'job', 3, 'Job losses|Hilangnya pekerjaan|雇用の喪失|岗位流失', 'Workers fear replacement.|Pekerja takut tergantikan.|従業員が、仕事を奪われる不安を抱く。|员工担心被取代。'),
      I('risk', 'retail,mfg', 'stop', 2, 'Breakdowns stop everything|Kerusakan menghentikan semua|故障で全停止|故障全面停摆', 'One fault can freeze the warehouse.|Satu gangguan bisa membekukan gudang.|1つの不具合で、倉庫全体が止まる。|一处故障可令仓库瘫痪。'),
      I('risk', 'retail,mfg', 'stuck', 2, 'Hard to change|Sulit diubah|変更しにくい|难以调整', 'Layouts and processes get locked in.|Tata letak dan proses terkunci.|レイアウトや手順が固定化される。|布局与流程被固化。')
    ]),
    C('labour intensive', 'Labour-intensive operations|Operasi padat karya|労働集約型|劳动密集型', ['warehouse automation'], [
      I('ppl', 'mfg,food,retail', 'job', 3, 'Creates jobs|Menciptakan lapangan kerja|雇用を生む|创造就业', 'Many people earn a living.|Banyak orang memperoleh penghasilan.|多くの人が、収入を得られる。|许多人获得生计。'),
      I('cap', 'mfg,food', 'flexible', 2, 'Flexible and adaptable|Fleksibel dan adaptif|柔軟に対応|灵活应变', 'People adapt to new tasks quickly.|Orang beradaptasi dengan tugas baru dengan cepat.|人は、新しい作業にすぐ適応できる。|人能快速适应新任务。'),
      I('val', 'mfg,food,retail', 'cheap', 2, 'Low capital needed|Modal kecil|少ない設備投資|资本需求低', 'Where wages are low, it can be cheap.|Di tempat upah rendah, biayanya bisa murah.|賃金が低い地域では、安く済む。|在低工资地区成本低。'),
      I('mkt', 'food,retail', 'touch', 2, 'Human touch|Sentuhan manusia|人の手の温かみ|人情味', 'Handmade and personal service are valued.|Buatan tangan dan layanan personal dihargai.|手作りや人の対応が、価値になる。|手工与人性化服务有价值。')
    ], [
      I('cost', 'mfg,retail', 'expensive', 3, 'Rising wage bills|Biaya upah meningkat|人件費の上昇|工资负担上升', 'Labour cost grows every year.|Biaya tenaga kerja naik setiap tahun.|人件費は、年々上がる。|人工成本逐年增长。'),
      I('risk', 'mfg,food', 'mistake', 2, 'Human error|Kesalahan manusia|ヒューマンエラー|人为失误', 'Fatigue and mistakes affect quality.|Kelelahan dan kesalahan memengaruhi kualitas.|疲れやミスが、品質に影響する。|疲劳与失误影响质量。'),
      I('ppl', 'mfg,food', 'tired', 2, 'Hard on workers|Berat bagi pekerja|労働者の負担|工人辛苦', 'Long hours and strain are common.|Jam kerja panjang dan beban fisik lazim terjadi.|長時間労働や負担が生じやすい。|长时间与重体力常见。'),
      I('eff', 'mfg,food', 'hard', 2, 'Hard to scale|Sulit diskalakan|拡大しにくい|难以扩张', 'Growth needs hiring, training and managing more people.|Pertumbuhan butuh merekrut, melatih, dan mengelola lebih banyak orang.|拡大には、採用・教育・管理の負担が増える。|扩张需要更多招聘、培训与管理。')
    ])
  );
})();
