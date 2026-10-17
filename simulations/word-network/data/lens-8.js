/* Word Network: curated concepts, batch 8 (governance, risk and ethics). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('regulation', 'Government regulation|Regulasi pemerintah|政府の規制|政府监管', ['free market'], [
      I('val', 'pub,health,food', 'safe', 3, 'Protects the public|Melindungi masyarakat|公衆の保護|保护公众', 'Rules keep products and workplaces safe.|Aturan menjaga produk dan tempat kerja tetap aman.|規則が、製品や職場の安全を守る。|规则保障产品与职场安全。'),
      I('cap', 'pub,biz', 'fair', 2, 'Level playing field|Persaingan yang setara|公平な競争条件|公平竞争环境', 'Everyone follows the same rules.|Semua mengikuti aturan yang sama.|全員が同じルールに従う。|人人遵守同样规则。'),
      I('mkt', 'fin,health,pub', 'trust', 2, 'Builds public trust|Membangun kepercayaan publik|社会的信頼の構築|建立公信力', 'Customers trust regulated sectors more.|Pelanggan lebih percaya sektor yang diatur.|規制された分野は、信頼されやすい。|客户更信任受监管行业。'),
      I('val', 'pub,farm,food', 'stay', 2, 'Protects the environment|Melindungi lingkungan|環境保護|保护环境', 'Limits pollution and overuse.|Membatasi polusi dan eksploitasi berlebihan.|汚染や過剰利用を抑える。|限制污染与过度开发。')
    ], [
      I('cost', 'biz,mfg,fin', 'expensive', 3, 'Compliance costs|Biaya kepatuhan|対応コスト|合规成本', 'Reports, audits and changes cost money.|Laporan, audit, dan perubahan memakan biaya.|報告・監査・改修に費用がかかる。|报告、审计与改造耗资。'),
      I('eff', 'biz,mfg', 'slow', 2, 'Slows innovation|Memperlambat inovasi|革新を遅らせる|拖慢创新', 'Approvals take months.|Persetujuan memakan waktu berbulan-bulan.|承認に、何か月もかかる。|审批需数月。'),
      I('risk', 'biz,pub', 'stuck', 2, 'Rigid and outdated|Kaku dan usang|硬直的で時代遅れ|僵化过时', 'Rules lag behind technology.|Aturan tertinggal dari teknologi.|規則が、技術に追いつかない。|规则落后于技术。'),
      I('risk', 'biz,pub', 'cheat', 2, 'Favours big firms|Menguntungkan perusahaan besar|大企業に有利|偏向大公司', 'Small firms struggle with paperwork.|Perusahaan kecil kewalahan dengan dokumen.|小企業は、手続きの負担に苦しむ。|小公司难承受文书负担。')
    ]),
    C('free market', 'Free market|Pasar bebas|自由市場|自由市场', ['regulation'], [
      I('cap', 'biz,retail', 'new', 3, 'Innovation|Inovasi|革新|创新', 'Competition rewards new ideas.|Persaingan menghargai gagasan baru.|競争が、新しいアイデアに報いる。|竞争奖励新想法。'),
      I('mkt', 'retail,food', 'choice', 3, 'Choice and low prices|Pilihan dan harga rendah|選択肢と低価格|选择多价格低', 'Firms fight to serve customers.|Perusahaan berebut melayani pelanggan.|企業が、顧客を取り合う。|企业争相服务客户。'),
      I('eff', 'biz,pub', 'efficient', 2, 'Efficient use of resources|Pemanfaatan sumber daya efisien|資源の効率的配分|资源高效配置', 'Prices guide where resources go.|Harga mengarahkan ke mana sumber daya mengalir.|価格が、資源の行き先を導く。|价格引导资源流向。'),
      I('val', 'biz', 'free', 2, 'Freedom to start a business|Kebebasan memulai usaha|起業の自由|创业自由', 'Fewer barriers to enter.|Hambatan masuk lebih sedikit.|参入障壁が低い。|进入壁垒低。')
    ], [
      I('ppl', 'pub,fam', 'poor', 3, 'Inequality|Ketimpangan|格差|不平等', 'Winners take most of the gains.|Pemenang mengambil sebagian besar keuntungan.|勝者が、利益の大半を取る。|赢家拿走大部分收益。'),
      I('risk', 'pub,farm,fin', 'danger', 3, 'Market failures|Kegagalan pasar|市場の失敗|市场失灵', 'Pollution, monopolies and crises go unchecked.|Polusi, monopoli, dan krisis tidak terkendali.|汚染・独占・危機を、止められない。|污染、垄断与危机难受控。'),
      I('ppl', 'health,edu,pub', 'lose', 2, 'Essentials left out|Kebutuhan dasar terabaikan|必需サービスが届かない|基本需求被忽视', 'Unprofitable needs are not served.|Kebutuhan yang tidak menguntungkan tidak dilayani.|儲からない必要は、満たされない。|无利可图的需求无人服务。'),
      I('risk', 'biz,fin', 'short', 2, 'Short-term focus|Fokus jangka pendek|短期志向|短期导向', 'Profit now beats long-term good.|Laba sekarang mengalahkan kebaikan jangka panjang.|目先の利益が、長期の利益に勝つ。|当下利润压倒长远利益。')
    ]),
    C('compliance', 'Compliance programme|Program kepatuhan|コンプライアンス体制|合规体系', ['cost cutting'], [
      I('val', 'fin,health,pub', 'safe', 3, 'Avoids fines and scandals|Menghindari denda dan skandal|罰金や不祥事の回避|避免罚款与丑闻', 'Problems are prevented, not punished.|Masalah dicegah, bukan dihukum.|問題を、罰せられる前に防ぐ。|防患于未然。'),
      I('mkt', 'fin,biz,pub', 'trust', 2, 'Trust of partners|Kepercayaan mitra|取引先の信頼|伙伴信任', 'Big clients require proof of compliance.|Klien besar mensyaratkan bukti kepatuhan.|大口顧客は、順守の証明を求める。|大客户要求合规证明。'),
      I('cap', 'biz,pub', 'clear', 2, 'Clear rules for staff|Aturan jelas bagi staf|社員にとって明確な基準|员工规则清晰', 'People know what is allowed.|Orang tahu apa yang diizinkan.|何が許されるか、分かる。|知道什么可以做。'),
      I('cap', 'biz,fin', 'early', 2, 'Early warning|Peringatan dini|早期発見|早期预警', 'Problems surface through reporting.|Masalah muncul lewat pelaporan.|報告を通じて、問題が早く見つかる。|通过报告早发现问题。')
    ], [
      I('cost', 'biz,fin,health', 'expensive', 3, 'Costly overhead|Biaya overhead mahal|間接コストが高い|管理成本高', 'Staff, training and systems add up.|Staf, pelatihan, dan sistem menambah biaya.|人員・研修・システムがかさむ。|人员、培训与系统累积。'),
      I('eff', 'biz,health', 'rules', 2, 'Box-ticking bureaucracy|Birokrasi centang formulir|形式的な書類主義|走过场式官僚', 'Forms replace judgement.|Formulir menggantikan penilaian.|書類が、判断の代わりになる。|表格取代判断。'),
      I('ppl', 'biz,pub', 'fear', 2, 'Suspicion in the workplace|Kecurigaan di tempat kerja|職場の疑心暗鬼|职场猜疑', 'Staff feel watched.|Staf merasa diawasi.|社員が、監視されていると感じる。|员工觉得被监视。'),
      I('risk', 'biz,fin', 'false', 2, 'False sense of safety|Rasa aman semu|偽りの安心|虚假安全感', 'Policies exist but nobody follows them.|Kebijakan ada tetapi tak ada yang menaatinya.|規程はあるが、誰も守らない。|制度在但无人遵守。')
    ]),
    C('whistleblowing', 'Whistleblowing|Pelaporan pelanggaran (whistleblowing)|内部通報|举报', ['loyalty'], [
      I('val', 'pub,fin,health', 'find', 3, 'Exposes wrongdoing early|Mengungkap pelanggaran lebih awal|不正の早期発見|及早揭露违规', 'Insiders spot fraud before auditors do.|Orang dalam melihat kecurangan sebelum auditor.|内部の人が、監査より先に不正に気づく。|内部人比审计更早发现欺诈。'),
      I('cap', 'pub,biz', 'ethics', 2, 'Strong ethical culture|Budaya etika kuat|倫理的な風土|强伦理文化', 'Staff feel safe to speak up.|Staf merasa aman untuk bersuara.|社員が、安心して声を上げられる。|员工敢于发声。'),
      I('val', 'biz,fin', 'save', 2, 'Avoids bigger losses|Menghindari kerugian lebih besar|大きな損失を回避|避免更大损失', 'Small problems are fixed before they grow.|Masalah kecil diperbaiki sebelum membesar.|小さな問題を、大きくなる前に直せる。|小问题在扩大前解决。'),
      I('mkt', 'pub,fin', 'trust', 2, 'Public trust|Kepercayaan publik|社会的信頼|公众信任', 'Transparency shows integrity.|Transparansi menunjukkan integritas.|透明性が、誠実さを示す。|透明体现诚信。')
    ], [
      I('ppl', 'biz,pub', 'fear', 3, 'Retaliation against the reporter|Pembalasan terhadap pelapor|通報者への報復|举报者遭报复', 'Whistleblowers often lose careers.|Pelapor sering kehilangan karier.|通報者は、キャリアを失うことが多い。|举报者常失去职业。'),
      I('risk', 'biz,pub', 'scandal', 2, 'Reputation damage|Kerusakan reputasi|評判の毀損|声誉受损', 'Public exposure hurts the organisation.|Pengungkapan publik merugikan organisasi.|公になれば、組織の評判が傷つく。|公开曝光损害组织。'),
      I('risk', 'pub,biz', 'lie', 2, 'False or malicious reports|Laporan palsu atau jahat|虚偽・悪意の通報|虚假或恶意举报', 'Some accusations are unfounded.|Sebagian tuduhan tidak berdasar.|根拠のない告発もある。|有些指控毫无根据。'),
      I('ppl', 'biz', 'conflict', 2, 'Divides colleagues|Memecah rekan kerja|同僚間の分断|分裂同事', 'Trust inside the team suffers.|Kepercayaan di dalam tim terganggu.|チーム内の信頼が損なわれる。|团队内部信任受损。')
    ]),
    C('loyalty', 'Employee loyalty to the firm|Loyalitas karyawan pada perusahaan|会社への忠誠心|员工对公司的忠诚', ['whistleblowing'], [
      I('ppl', 'biz,mfg', 'stay', 3, 'Low turnover|Pergantian rendah|低い離職率|低离职率', 'Loyal people stay and build skills.|Orang loyal bertahan dan menumbuhkan keahlian.|忠誠心のある人は、長く働き技能を磨く。|忠诚者留下并积累技能。'),
      I('cap', 'biz', 'team', 2, 'Strong teamwork|Kerja tim kuat|強いチームワーク|团队协作强', 'People help each other.|Orang saling membantu.|互いに助け合う。|相互扶持。'),
      I('cap', 'biz', 'secret', 2, 'Protects confidential information|Menjaga informasi rahasia|機密の保持|保守机密', 'Insiders do not leak.|Orang dalam tidak membocorkan.|内部の人が、情報を漏らさない。|内部人员不泄密。'),
      I('mkt', 'retail,food', 'customer', 2, 'Better customer service|Layanan pelanggan lebih baik|顧客対応の質|客服更好', 'Committed staff care about customers.|Staf berkomitmen peduli pada pelanggan.|愛着のある社員は、顧客を大切にする。|有归属感的员工更重视客户。')
    ], [
      I('risk', 'biz,pub', 'blind', 3, 'Covering up wrongdoing|Menutupi pelanggaran|不正の隠蔽|掩盖不当行为', 'Loyalty to people beats loyalty to rules.|Loyalitas pada orang mengalahkan loyalitas pada aturan.|人への忠誠が、ルールへの忠誠に勝つ。|对人的忠诚压过对规则的忠诚。'),
      I('ppl', 'biz', 'stuck', 2, 'Resists change|Menolak perubahan|変化への抵抗|抗拒变化', 'Long-serving staff defend old ways.|Staf lama membela cara lama.|古参が、従来のやり方を守りたがる。|老员工捍卫旧做法。'),
      I('ppl', 'biz,fam', 'stress', 2, 'Burnout from over-commitment|Kelelahan karena terlalu berkomitmen|尽くしすぎによる疲弊|过度投入致倦怠', 'People sacrifice health and family.|Orang mengorbankan kesehatan dan keluarga.|健康や家庭を犠牲にしてしまう。|牺牲健康与家庭。'),
      I('risk', 'biz,pub', 'depend', 2, 'Exploited loyalty|Loyalitas dimanfaatkan|忠誠心につけ込まれる|忠诚被利用', 'Firms may underpay loyal staff.|Perusahaan mungkin membayar rendah staf yang loyal.|会社が、忠実な社員の待遇を低く抑える。|公司可能压低忠诚员工的薪酬。')
    ]),
    C('esg', 'ESG and sustainability|ESG dan keberlanjutan|ESG・サステナビリティ|ESG与可持续', ['short-termism'], [
      I('mkt', 'retail,food,biz', 'good', 3, 'Better reputation|Reputasi lebih baik|評判の向上|声誉更佳', 'Customers and staff admire responsible firms.|Pelanggan dan staf mengagumi perusahaan yang bertanggung jawab.|責任ある企業は、顧客や社員から好かれる。|负责任的公司受客户员工赞赏。'),
      I('val', 'fin,biz', 'invest', 2, 'Access to capital|Akses ke modal|資金調達に有利|获取资本', 'Many investors favour ESG leaders.|Banyak investor mengutamakan pemimpin ESG.|ESGに力を入れる企業を好む投資家が多い。|许多投资者偏好 ESG 领先者。'),
      I('val', 'mfg,farm,pub', 'save', 2, 'Efficiency savings|Hemat efisiensi|効率化によるコスト減|效率节约', 'Less energy and waste lowers bills.|Lebih sedikit energi dan limbah menurunkan tagihan.|エネルギーと廃棄が減れば、費用も減る。|少耗能少浪费降低账单。'),
      I('cap', 'biz,pub', 'safe', 2, 'Lower long-term risk|Risiko jangka panjang lebih rendah|長期リスクの低減|降低长期风险', 'Avoids scandals, lawsuits and shortages.|Menghindari skandal, gugatan, dan kelangkaan.|不祥事・訴訟・供給不足を避けられる。|避免丑闻、诉讼与短缺。')
    ], [
      I('cost', 'mfg,biz', 'expensive', 3, 'Upfront cost|Biaya awal|先行コスト|前期成本', 'Cleaner methods and reporting cost money.|Metode lebih bersih dan pelaporan butuh dana.|環境対応や報告に、費用がかかる。|清洁方法与报告需投入。'),
      I('risk', 'biz,retail', 'lie', 3, 'Greenwashing|Greenwashing|グリーンウォッシュ|漂绿', 'Claims run ahead of reality.|Klaim melampaui kenyataan.|主張が実態を上回る。|宣称超过现实。'),
      I('eff', 'biz,pub', 'hard', 2, 'Hard to measure|Sulit diukur|測定が難しい|难以衡量', 'Standards and ratings disagree.|Standar dan peringkat tidak sepakat.|基準や格付けが、バラバラ。|标准与评级不一。'),
      I('mkt', 'retail,mfg', 'lose', 2, 'Short-term competitive disadvantage|Kerugian bersaing jangka pendek|短期的な競争上の不利|短期竞争劣势', 'Rivals ignoring the rules undercut you.|Pesaing yang mengabaikan aturan menjatuhkan harga Anda.|ルールを無視する競合に、価格で負ける。|无视规则的对手以低价压你。')
    ]),
    C('short-termism', 'Short-termism|Fokus jangka pendek|短期主義|短视主义', ['esg'], [
      I('val', 'fin,biz', 'profit', 3, 'Quick profits|Laba cepat|すぐ利益が出る|快速盈利', 'Results show up this quarter.|Hasil muncul kuartal ini.|今期のうちに、成果が出る。|本季度见效。'),
      I('mkt', 'fin,biz', 'trust', 2, 'Pleases investors|Menyenangkan investor|投資家を満足させる|取悦投资者', 'Markets reward steady quarterly numbers.|Pasar menghargai angka kuartalan yang stabil.|市場は、安定した四半期業績を評価する。|市场奖励稳定的季度数据。'),
      I('eff', 'biz,retail', 'fast', 2, 'Quick decisions|Keputusan cepat|素早い決断|决策快', 'No long studies or waiting.|Tanpa studi panjang atau penantian.|長い検討や待ち時間がない。|无需长期研究或等待。'),
      I('val', 'biz,fin', 'cash', 2, 'Cash in hand|Kas di tangan|手元の現金|现金在手', 'Resources are not locked in distant projects.|Sumber daya tidak terkunci di proyek jauh.|資金が、遠い先の案件に縛られない。|资源不被远期项目锁定。')
    ], [
      I('risk', 'biz,mfg', 'lose', 3, 'Underinvests in the future|Kurang berinvestasi di masa depan|将来への投資不足|对未来投入不足', 'Research, training and upkeep are cut.|Riset, pelatihan, dan perawatan dipangkas.|研究・研修・保守が削られる。|研发、培训与维护被砍。'),
      I('risk', 'biz,pub', 'scandal', 2, 'Ethical shortcuts|Jalan pintas tidak etis|倫理を犠牲にした近道|道德捷径', 'Pressure leads to bending rules.|Tekanan mendorong pelanggaran aturan.|プレッシャーが、ルール違反を招く。|压力导致破坏规则。'),
      I('mkt', 'retail,biz', 'lose', 2, 'Loses customer loyalty|Kehilangan loyalitas pelanggan|顧客の信頼を失う|失去客户忠诚', 'Cheaper service drives buyers away.|Layanan murahan menjauhkan pembeli.|サービスの質が下がり、顧客が離れる。|廉价服务赶走买家。'),
      I('risk', 'biz,fin', 'fail', 2, 'Hidden problems grow|Masalah tersembunyi membesar|隠れた問題が膨らむ|隐患扩大', 'Debt and decay build up unseen.|Utang dan kerusakan menumpuk tanpa terlihat.|負債や劣化が、見えないまま積み上がる。|债务与衰败暗中累积。')
    ]),
    C('patents', 'Patents|Paten|特許|专利', ['trade secrets'], [
      I('cap', 'mfg,health,biz', 'protect', 3, 'Legal protection|Perlindungan hukum|法的保護|法律保护', 'Others cannot copy your invention for years.|Pihak lain tidak bisa menyalin penemuan Anda selama bertahun-tahun.|発明を、何年も真似されずに済む。|数年内他人不可复制发明。'),
      I('val', 'mfg,health,biz', 'profit', 2, 'Licensing income|Pendapatan lisensi|ライセンス収入|许可收入', 'You can sell or rent your rights.|Anda dapat menjual atau menyewakan hak Anda.|権利を、売ったり貸したりできる。|可出售或出租权利。'),
      I('mkt', 'mfg,biz', 'edge', 2, 'Competitive advantage|Keunggulan bersaing|競争優位|竞争优势', 'You can be the only seller.|Anda bisa menjadi satu-satunya penjual.|唯一の供給者になれる。|可成为唯一卖家。'),
      I('mkt', 'fin,biz', 'invest', 2, 'Attracts investors|Menarik investor|投資家を引きつける|吸引投资者', 'Patents are valuable assets.|Paten adalah aset berharga.|特許は、価値ある資産になる。|专利是有价值的资产。')
    ], [
      I('cost', 'mfg,biz', 'expensive', 3, 'Expensive to file and defend|Mahal untuk didaftarkan dan dipertahankan|出願・防衛が高額|申请与维权昂贵', 'Lawyers and fees across many countries.|Pengacara dan biaya di banyak negara.|多くの国での弁護士費用と手数料。|多国律师费与规费。'),
      I('risk', 'mfg,biz', 'secret', 2, 'Reveals your invention|Membuka penemuan Anda|発明が公開される|公开发明细节', 'Filing publishes how it works.|Pendaftaran mengumumkan cara kerjanya.|出願すると、仕組みが公開される。|申请即公开原理。'),
      I('risk', 'mfg,biz', 'copy', 2, 'Hard to enforce|Sulit ditegakkan|権利行使が難しい|难以执行', 'Copiers abroad are hard to stop.|Peniru di luar negeri sulit dihentikan.|海外の模倣を、止めるのは難しい。|难阻止海外抄袭。'),
      I('eff', 'mfg,biz', 'limit', 2, 'Expires|Kedaluwarsa|期限がある|会过期', 'After about twenty years, anyone can use it.|Setelah sekitar dua puluh tahun, siapa pun dapat memakainya.|約20年後は、誰でも使える。|约二十年后任何人皆可使用。')
    ]),
    C('trade secrets', 'Trade secrets|Rahasia dagang|営業秘密|商业秘密', ['patents'], [
      I('cap', 'food,mfg,biz', 'secret', 3, 'No disclosure|Tanpa pengungkapan|公開が不要|无需公开', 'Your recipe or method stays private.|Resep atau metode Anda tetap rahasia.|レシピやノウハウを、公開せずに済む。|配方或方法保持私密。'),
      I('val', 'food,mfg', 'save', 2, 'Cheap to keep|Murah dipertahankan|維持費が安い|维护便宜', 'No filing or renewal fees.|Tanpa biaya pendaftaran atau perpanjangan.|出願料も更新料もかからない。|无申请或续费。'),
      I('cap', 'food,mfg,biz', 'long', 2, 'Can last forever|Bisa bertahan selamanya|永続しうる|可无限持续', 'Protection lasts as long as secrecy.|Perlindungan bertahan selama kerahasiaan terjaga.|秘密が守られる限り、保護も続く。|只要保密即永久。'),
      I('eff', 'biz,mfg', 'fast', 2, 'Immediate|Langsung berlaku|すぐに保護|立即生效', 'No waiting for approval.|Tanpa menunggu persetujuan.|審査を待たなくていい。|无需等待审批。')
    ], [
      I('risk', 'food,mfg,biz', 'copy', 3, 'Independent discovery or reverse engineering|Penemuan independen atau rekayasa balik|独自開発やリバースエンジニアリング|独立研发或逆向工程', 'Rivals may legally work it out.|Pesaing bisa menemukannya secara legal.|競合が、合法的に突き止めるかもしれない。|对手可能合法破解。'),
      I('risk', 'biz,mfg', 'leave', 3, 'Leaks via staff|Bocor lewat staf|社員による流出|员工泄露', 'People move to rivals with what they know.|Orang berpindah ke pesaing membawa pengetahuannya.|知っている人が、競合に移る。|人带着知识跳槽。'),
      I('eff', 'biz,mfg', 'hard', 2, 'Constant vigilance|Kewaspadaan terus-menerus|常に管理が必要|须时刻警惕', 'Security and contracts must be maintained.|Keamanan dan kontrak harus dijaga.|管理体制と契約を維持し続ける必要がある。|须持续维护安保与合同。'),
      I('risk', 'biz,pub', 'weak', 2, 'Weaker legal rights|Hak hukum lebih lemah|法的保護が弱い|法律权利较弱', 'Enforcement is harder than with patents.|Penegakan lebih sulit daripada paten.|特許より、権利行使が難しい。|维权比专利难。')
    ]),
    C('iso certification', 'ISO certification|Sertifikasi ISO|ISO認証|ISO认证', ['bureaucracy'], [
      I('mkt', 'mfg,food,health', 'trust', 3, 'Credibility|Kredibilitas|信頼性|可信度', 'A recognised standard reassures buyers.|Standar yang diakui menenangkan pembeli.|公的な基準が、買い手を安心させる。|公认标准让买家放心。'),
      I('mkt', 'mfg,biz', 'market', 2, 'Access to big clients|Akses ke klien besar|大口顧客へのアクセス|进入大客户门槛', 'Many tenders require it.|Banyak tender mensyaratkan.|入札の条件になることが多い。|很多招标要求。'),
      I('eff', 'mfg,food', 'clear', 2, 'Consistent processes|Proses konsisten|プロセスの標準化|流程一致', 'Everyone works to documented procedures.|Semua bekerja sesuai prosedur terdokumentasi.|全員が、文書化された手順で動く。|人人按文档流程工作。'),
      I('val', 'mfg,food', 'quality', 2, 'Fewer defects|Cacat lebih sedikit|不良の減少|缺陷减少', 'Quality systems catch problems.|Sistem mutu menangkap masalah.|品質管理で、問題を拾える。|质量体系发现问题。')
    ], [
      I('cost', 'mfg,biz', 'expensive', 3, 'Fees and consultants|Biaya dan konsultan|審査費用とコンサル|费用与顾问', 'Certification and audits cost real money.|Sertifikasi dan audit butuh dana nyata.|認証と審査に、実費がかかる。|认证与审核要真金白银。'),
      I('eff', 'mfg,biz', 'rules', 3, 'Paperwork|Dokumen|書類の山|文书工作', 'Documents multiply.|Dokumen bertambah banyak.|書類が増える。|文档激增。'),
      I('risk', 'biz,mfg', 'false', 2, 'Certificate without substance|Sertifikat tanpa isi|形だけの認証|有证无实', 'Companies may pass audits but not improve.|Perusahaan bisa lolos audit tanpa membaik.|審査に通っても、改善が伴わないことがある。|公司过审但未改善。'),
      I('eff', 'mfg,biz', 'stuck', 2, 'Rigid habits|Kebiasaan kaku|硬直的な運用|习惯僵化', 'Procedures resist change.|Prosedur menolak perubahan.|手順が、変更を拒む。|流程抗拒变更。')
    ]),
    C('bureaucracy', 'Bureaucracy|Birokrasi|官僚制|官僚制度', ['iso certification'], [
      I('cap', 'pub,fin,health', 'fair', 3, 'Consistency and fairness|Konsistensi dan keadilan|一貫性と公平性|一致与公平', 'Everyone is treated by the same rules.|Semua orang diperlakukan dengan aturan yang sama.|誰もが、同じルールで扱われる。|人人适用同样规则。'),
      I('val', 'pub,fin', 'safe', 2, 'Reduces corruption|Mengurangi korupsi|不正の抑止|减少腐败', 'Procedures limit favouritism.|Prosedur membatasi pilih kasih.|手続きが、えこひいきを抑える。|程序限制偏袒。'),
      I('eff', 'pub,mfg', 'steady', 2, 'Stability|Stabilitas|安定性|稳定', 'Work continues when people change.|Pekerjaan berlanjut saat orang berganti.|人が替わっても、仕事は続く。|人员更替时工作持续。'),
      I('cap', 'pub,biz', 'proof', 2, 'Records and accountability|Catatan dan akuntabilitas|記録と説明責任|记录与问责', 'Decisions can be traced.|Keputusan dapat dilacak.|決定の経緯を追える。|决策可追溯。')
    ], [
      I('eff', 'pub,biz', 'slow', 3, 'Slow and frustrating|Lambat dan membuat frustrasi|遅くてイライラする|缓慢令人沮丧', 'Simple things take many steps.|Hal sederhana butuh banyak langkah.|簡単なことに、多くの手順がかかる。|简单事需许多步骤。'),
      I('risk', 'pub,biz', 'stuck', 2, 'Rigid, no common sense|Kaku, tanpa akal sehat|融通が利かない|僵化缺乏常识', 'Rules are applied even when absurd.|Aturan diterapkan walau tidak masuk akal.|馬鹿げていても、規則が適用される。|荒谬时仍照章办事。'),
      I('cost', 'pub,biz', 'expensive', 2, 'Overhead cost|Biaya overhead|間接費|管理开销', 'Administrators take a large share.|Administrator mengambil porsi besar.|管理部門が、予算の大きな部分を食う。|行政人员占去大笔预算。'),
      I('ppl', 'pub,biz', 'blame', 2, 'Passing the buck|Saling lempar tanggung jawab|責任のなすり合い|互相推诿', 'Nobody owns the outcome.|Tak ada yang memiliki hasilnya.|誰も結果に責任を持たない。|无人对结果负责。')
    ]),
    C('csr', 'Corporate social responsibility (CSR)|Tanggung jawab sosial perusahaan (CSR)|企業の社会的責任（CSR）|企业社会责任（CSR）', ['short-termism'], [
      I('mkt', 'retail,food,biz', 'good', 3, 'Goodwill|Niat baik masyarakat|好感|公众好感', 'Communities and customers appreciate it.|Masyarakat dan pelanggan menghargainya.|地域や顧客から評価される。|社区与客户赞赏。'),
      I('ppl', 'biz,pub', 'proud', 2, 'Staff pride|Kebanggaan staf|社員の誇り|员工自豪', 'People like working for a caring employer.|Orang suka bekerja untuk pemberi kerja yang peduli.|社会貢献する会社で働くことを、誇りに思う。|人们愿为有爱心的雇主工作。'),
      I('cap', 'pub,biz', 'help', 2, 'Social impact|Dampak sosial|社会への貢献|社会影响', 'Real problems get real help.|Masalah nyata mendapat bantuan nyata.|現実の課題に、実際の支援が届く。|真实问题获得真实帮助。'),
      I('cap', 'biz,pub', 'safe', 2, 'Social licence to operate|Izin sosial untuk beroperasi|社会的な信任|社会运营许可', 'Good relations ease conflicts with communities.|Hubungan baik mengurangi konflik dengan masyarakat.|良好な関係が、地域との摩擦を和らげる。|良好关系缓解社区冲突。')
    ], [
      I('cost', 'biz,mfg', 'expensive', 3, 'Costs money|Memakan dana|費用がかかる|花钱', 'Spending does not always raise profits.|Pengeluaran tidak selalu menaikkan laba.|支出が、必ずしも利益に結びつかない。|开支不一定提升利润。'),
      I('risk', 'biz,retail', 'lie', 3, 'Seen as PR only|Dianggap sekadar PR|宣伝目的と見られる|被视为公关', 'Critics call it a marketing tool.|Pengkritik menyebutnya alat pemasaran.|批判者は、宣伝の道具だと言う。|批评者称其为营销工具。'),
      I('eff', 'biz,pub', 'noise', 2, 'Distracts from the core|Mengalihkan dari bisnis inti|本業から気が散る|分散主业精力', 'Managers spend time away from the business.|Manajer meluangkan waktu di luar bisnis.|経営陣が、本業以外に時間を割く。|管理者精力被转移。'),
      I('ppl', 'biz,pub', 'conflict', 2, 'Shareholder objections|Keberatan pemegang saham|株主の反発|股东反对', 'Owners may feel money is wasted.|Pemilik mungkin merasa uang terbuang.|株主が、資金の無駄だと感じることがある。|股东可能觉得钱被浪费。')
    ]),
    C('risk management', 'Risk management|Manajemen risiko|リスクマネジメント|风险管理', ['risk taking'], [
      I('val', 'fin,biz,health', 'safe', 3, 'Avoids big losses|Menghindari kerugian besar|大損失の回避|避免重大损失', 'Threats are planned for.|Ancaman direncanakan terlebih dahulu.|脅威に、あらかじめ備えられる。|提前规划威胁。'),
      I('cap', 'biz,pub', 'plan', 2, 'Better decisions|Keputusan lebih baik|より良い意思決定|决策更优', 'Risks and returns are weighed.|Risiko dan imbal hasil ditimbang.|リスクとリターンを比べて決められる。|权衡风险与回报。'),
      I('mkt', 'fin,biz', 'trust', 2, 'Confidence of lenders|Keyakinan pemberi pinjaman|貸し手の信頼|贷方信心', 'Prepared firms get better terms.|Perusahaan yang siap mendapat syarat lebih baik.|備えのある企業は、有利な条件を得やすい。|有准备的公司条件更好。'),
      I('ppl', 'biz,health', 'safe', 2, 'Safer workplace|Tempat kerja lebih aman|職場の安全性|更安全的职场', 'Hazards are found and fixed.|Bahaya ditemukan dan diperbaiki.|危険が見つかり、是正される。|隐患被发现并整改。')
    ], [
      I('cost', 'biz,fin', 'expensive', 3, 'Cost of controls|Biaya pengendalian|統制のコスト|管控成本', 'Insurance, audits and staff time.|Asuransi, audit, dan waktu staf.|保険・監査・人手がかかる。|保险、审计与人力。'),
      I('eff', 'biz,mfg', 'slow', 2, 'Slows decisions|Memperlambat keputusan|意思決定が遅くなる|拖慢决策', 'Checks delay launches.|Pemeriksaan menunda peluncuran.|チェックが、開始を遅らせる。|检查延误上线。'),
      I('mkt', 'biz,retail', 'lose', 2, 'Missed opportunities|Peluang terlewat|機会損失|错失机会', 'Too much caution means no bold moves.|Terlalu hati-hati berarti tidak ada langkah berani.|慎重すぎると、大胆な一手を打てない。|过度谨慎就无大胆举措。'),
      I('risk', 'biz,fin', 'blind', 2, 'Unforeseen risks remain|Risiko tak terduga tetap ada|想定外のリスクは残る|意外风险仍存', 'No plan covers everything.|Tidak ada rencana yang mencakup segalanya.|すべてを想定した計画はない。|没有计划能涵盖一切。')
    ]),
    C('risk taking', 'Risk taking|Berani mengambil risiko|リスクテイク|冒险', ['risk management'], [
      I('val', 'biz,fin', 'profit', 3, 'High potential reward|Potensi imbalan besar|大きなリターンの可能性|潜在高回报', 'Bold bets can pay off hugely.|Taruhan berani bisa membuahkan hasil besar.|大胆な賭けが、大きく実ることがある。|大胆押注可能大获成功。'),
      I('cap', 'biz,edu', 'new', 2, 'Innovation|Inovasi|革新|创新', 'New ideas need experiments.|Gagasan baru butuh eksperimen.|新しいアイデアには、試行が必要。|新想法需要试验。'),
      I('mkt', 'biz,retail', 'first', 2, 'First-mover advantage|Keuntungan pelopor|先行者利益|先发优势', 'Early movers shape the market.|Pelopor membentuk pasar.|先に動いた者が、市場を形づくる。|先行者塑造市场。'),
      I('ppl', 'biz,edu', 'proud', 2, 'Energises people|Menyemangati orang|人を奮い立たせる|激励人心', 'Ambitious goals attract ambitious staff.|Tujuan ambisius menarik staf ambisius.|大きな目標が、意欲的な人を引きつける。|远大目标吸引有雄心者。')
    ], [
      I('risk', 'biz,fin', 'lose', 3, 'Big losses|Kerugian besar|大きな損失|重大亏损', 'A failed bet can sink the firm.|Taruhan gagal bisa menenggelamkan perusahaan.|賭けに失敗すれば、会社が傾く。|押错可能击沉公司。'),
      I('ppl', 'biz,fam', 'stress', 2, 'Stress and uncertainty|Stres dan ketidakpastian|ストレスと不確実性|压力与不确定性', 'Teams live with constant doubt.|Tim hidup dengan keraguan terus-menerus.|チームが、常に不安の中で働く。|团队长期处于不安中。'),
      I('risk', 'biz,pub', 'cheat', 2, 'Reckless behaviour|Perilaku sembrono|無謀な行動|鲁莽行为', 'Gambling with other people\'s money.|Berjudi dengan uang orang lain.|他人のお金で賭けに出る。|拿别人的钱赌博。'),
      I('risk', 'biz,fin', 'luck', 2, 'Luck mistaken for skill|Keberuntungan dikira keahlian|運を実力と取り違える|把运气当本事', 'Winners overrate their judgement.|Pemenang melebih-lebihkan penilaiannya.|勝者が、自分の判断を過信する。|赢家高估自己判断。')
    ]),
    C('contingency plan', 'Contingency planning|Rencana kontingensi|事業継続計画|应急预案', ['risk management'], [
      I('val', 'biz,health,pub', 'safe', 3, 'Faster recovery|Pemulihan lebih cepat|復旧が早い|恢复更快', 'Everyone knows what to do in a crisis.|Semua orang tahu apa yang harus dilakukan saat krisis.|危機のとき、何をすべきか皆が知っている。|危机时人人知道怎么做。'),
      I('ppl', 'biz,health', 'calm', 2, 'Calm under pressure|Tenang di bawah tekanan|冷静に動ける|沉着应对', 'Panic is replaced by procedure.|Kepanikan digantikan prosedur.|パニックでなく、手順で動ける。|以流程取代慌乱。'),
      I('mkt', 'biz,fin,retail', 'trust', 2, 'Customer confidence|Kepercayaan pelanggan|顧客の安心|客户信心', 'Service continues in trouble.|Layanan berlanjut saat masalah.|トラブルでも、サービスが続く。|出问题时服务不断。'),
      I('cap', 'biz,pub', 'know', 2, 'Reveals weak points|Mengungkap titik lemah|弱点の発見|暴露薄弱环节', 'Planning shows hidden dependencies.|Perencanaan menunjukkan ketergantungan tersembunyi.|計画の過程で、隠れた依存関係が見える。|规划揭示隐性依赖。')
    ], [
      I('cost', 'biz,mfg', 'expensive', 3, 'Cost of backups and drills|Biaya cadangan dan latihan|備えと訓練のコスト|备份与演练成本', 'Spare capacity sits idle.|Kapasitas cadangan menganggur.|予備の設備や人員が、遊んでいる。|备用产能闲置。'),
      I('risk', 'biz,pub', 'old', 2, 'Plans become outdated|Rencana menjadi usang|計画が古くなる|预案过时', 'Untested plans fail in practice.|Rencana yang belum diuji gagal di praktik.|試されていない計画は、実際には機能しない。|未经演练的预案会失效。'),
      I('eff', 'biz,pub', 'time', 2, 'Takes management time|Menyita waktu manajemen|経営の時間を取られる|占用管理时间', 'Hypothetical crises compete with real work.|Krisis hipotetis bersaing dengan pekerjaan nyata.|仮定の危機が、本来の仕事と競合する。|假想危机与真实工作争时间。'),
      I('risk', 'biz,pub', 'blind', 2, 'Unexpected crises differ|Krisis tak terduga berbeda|想定外の危機は違う形で来る|意外危机形态不同', 'Real events rarely match the plan.|Kejadian nyata jarang sesuai rencana.|現実は、計画どおりにならない。|现实很少照预案发生。')
    ]),
    C('tariffs', 'Import tariffs|Tarif impor|輸入関税|进口关税', ['free trade'], [
      I('mkt', 'mfg,farm,retail', 'protect', 3, 'Protects local producers|Melindungi produsen lokal|国内産業の保護|保护本地生产者', 'Imports cost more, giving locals room.|Impor lebih mahal, memberi ruang bagi produsen lokal.|輸入品が高くなり、国内企業に余地が生まれる。|进口变贵，本地企业有空间。'),
      I('val', 'pub', 'money', 2, 'Government revenue|Pendapatan negara|政府の収入|政府收入', 'Tariffs bring tax income.|Tarif mendatangkan penerimaan pajak.|関税が、税収になる。|关税带来税收。'),
      I('ppl', 'mfg,farm,pub', 'job', 2, 'Protects jobs|Melindungi lapangan kerja|雇用の保護|保护就业', 'Local factories keep workers.|Pabrik lokal mempertahankan pekerja.|国内工場が、雇用を維持する。|本地工厂留住工人。'),
      I('cap', 'pub,mfg', 'power', 2, 'Bargaining tool|Alat tawar|交渉カード|谈判筹码', 'Used to pressure trade partners.|Digunakan untuk menekan mitra dagang.|貿易相手への圧力に使える。|可用于施压贸易伙伴。')
    ], [
      I('mkt', 'retail,fam,food', 'expensive', 3, 'Higher prices for consumers|Harga lebih tinggi bagi konsumen|消費者価格の上昇|消费者价格上涨', 'Buyers pay more for goods and inputs.|Pembeli membayar lebih untuk barang dan bahan baku.|商品も原材料も高くなる。|商品与原料更贵。'),
      I('risk', 'pub,mfg', 'war', 3, 'Retaliation and trade wars|Pembalasan dan perang dagang|報復関税と貿易摩擦|报复与贸易战', 'Partners raise tariffs on your exports.|Mitra menaikkan tarif atas ekspor Anda.|相手国が、こちらの輸出に関税をかけ返す。|伙伴对你出口加税。'),
      I('eff', 'mfg,retail', 'lazy', 2, 'Weakens competition|Melemahkan persaingan|競争力が弱まる|削弱竞争力', 'Shielded firms improve less.|Perusahaan yang dilindungi kurang berbenah.|守られた企業は、努力しなくなる。|受保护企业改进较少。'),
      I('cost', 'mfg,biz', 'money', 2, 'Raises input costs|Menaikkan biaya bahan|部材コストの上昇|抬高投入成本', 'Local makers need imported parts too.|Produsen lokal juga butuh komponen impor.|国内メーカーも、輸入部品を使う。|本地厂商也需进口零件。')
    ]),
    C('free trade', 'Free trade|Perdagangan bebas|自由貿易|自由贸易', ['tariffs'], [
      I('mkt', 'retail,fam,food', 'cheap', 3, 'Lower prices, more choice|Harga lebih rendah, pilihan lebih banyak|低価格と多様な選択|价格低选择多', 'Consumers gain from imports.|Konsumen diuntungkan oleh impor.|消費者が、輸入の恩恵を受ける。|消费者受益于进口。'),
      I('mkt', 'mfg,farm,biz', 'market', 3, 'Bigger export markets|Pasar ekspor lebih besar|輸出市場の拡大|出口市场更大', 'Firms sell to the world.|Perusahaan menjual ke seluruh dunia.|企業が、世界に売れる。|企业面向全球销售。'),
      I('eff', 'mfg,biz', 'efficient', 2, 'Efficiency through competition|Efisiensi lewat persaingan|競争による効率化|竞争带来效率', 'Firms improve to survive.|Perusahaan berbenah untuk bertahan.|生き残るため、企業が改善する。|企业为生存而改进。'),
      I('cap', 'pub,biz', 'peace', 2, 'Stronger ties between countries|Hubungan antarnegara lebih erat|国同士のつながり|国家间联系更强', 'Trade partners rarely fight.|Mitra dagang jarang berperang.|貿易相手とは、争いにくい。|贸易伙伴不易冲突。')
    ], [
      I('ppl', 'mfg,farm,pub', 'job', 3, 'Job losses in exposed industries|Hilangnya pekerjaan di industri terdampak|打撃を受ける産業の雇用喪失|受冲击行业失业', 'Cheaper imports can close local plants.|Impor murah bisa menutup pabrik lokal.|安い輸入品が、国内工場を閉鎖に追い込む。|廉价进口可使本地工厂关闭。'),
      I('risk', 'pub,mfg,food', 'depend', 2, 'Dependence on others|Ketergantungan pada pihak lain|他国への依存|依赖他国', 'Supply shocks abroad hit at home.|Guncangan pasokan di luar negeri berdampak di dalam negeri.|海外の供給ショックが、国内に及ぶ。|海外供应冲击波及国内。'),
      I('risk', 'farm,food,pub', 'bad', 2, 'Weaker standards|Standar lebih lemah|基準の低下|标准下降', 'Environment and labour rules get undercut.|Aturan lingkungan dan tenaga kerja ditekan.|環境や労働の基準が、切り下げられる。|环境与劳工标准被压低。'),
      I('ppl', 'pub,mfg', 'poor', 2, 'Winners and losers uneven|Pemenang dan pecundang tidak merata|勝者と敗者の格差|赢家输家不均', 'Gains are spread unequally.|Keuntungan terbagi tidak merata.|利益が、均等に行き渡らない。|收益分配不均。')
    ]),
    C('price controls', 'Price controls|Pengendalian harga|価格統制|价格管制', ['subsidy'], [
      I('mkt', 'pub,fam,food', 'cheap', 3, 'Affordable essentials|Kebutuhan pokok terjangkau|必需品が手頃に|必需品可负担', 'Households can afford basics.|Rumah tangga mampu membeli kebutuhan dasar.|家計が、基本的な品を買える。|家庭买得起基本品。'),
      I('ppl', 'pub,fam', 'poor', 2, 'Protects the poor|Melindungi yang miskin|低所得者の保護|保护穷人', 'Sudden spikes do not hurt as much.|Lonjakan mendadak tidak terlalu menyakitkan.|急騰の打撃が、和らぐ。|价格飙升冲击减小。'),
      I('cap', 'pub', 'calm', 2, 'Social stability|Stabilitas sosial|社会の安定|社会稳定', 'Fewer protests over food costs.|Lebih sedikit protes soal harga pangan.|食料価格をめぐる抗議が減る。|减少因食价引发的抗议。'),
      I('val', 'pub,farm', 'stop', 2, 'Stops gouging|Menghentikan pemerasan harga|便乗値上げの防止|防止哄抬价格', 'Sellers cannot exploit shortages.|Penjual tidak dapat memanfaatkan kelangkaan.|売り手が、品不足につけ込めない。|卖家不能趁短缺牟利。')
    ], [
      I('risk', 'retail,farm,food', 'lose', 3, 'Shortages|Kelangkaan|品不足|短缺', 'Sellers stop supplying at low prices.|Penjual berhenti memasok di harga rendah.|低価格では、供給が止まる。|低价下卖家停止供货。'),
      I('risk', 'retail,pub', 'cheat', 2, 'Black markets|Pasar gelap|闇市場|黑市', 'Goods trade illegally at higher prices.|Barang diperdagangkan ilegal dengan harga lebih tinggi.|違法な高値取引が横行する。|商品在黑市高价流通。'),
      I('cost', 'pub,fin', 'expensive', 2, 'Costly to enforce|Mahal untuk ditegakkan|執行コストが高い|执法成本高', 'Inspectors and penalties are needed.|Dibutuhkan inspektur dan sanksi.|検査と罰則が必要になる。|需检查员与处罚。'),
      I('eff', 'farm,mfg', 'lazy', 2, 'Discourages investment|Menghambat investasi|投資意欲の低下|抑制投资', 'Producers see no reward in expanding.|Produsen tidak melihat imbalan untuk berekspansi.|増産しても報われず、投資が減る。|生产者看不到扩产回报。')
    ])
  );
})();
