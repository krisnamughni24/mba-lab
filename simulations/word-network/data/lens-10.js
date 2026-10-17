/* Word Network: curated concepts, batch 10 (decisions, negotiation and teamwork). Author's teaching judgement, not measured data. */
(function () {
  const { I, C } = MBALAB.wordnet.lensKit, L = MBALAB.wordnet.lens;
  L.push(
    C('negotiation', 'Hard negotiation|Negosiasi keras|強気の交渉|强硬谈判', ['compromise'], [
      I('val', 'biz,retail,fin', 'win', 3, 'Better terms|Syarat lebih baik|有利な条件|更优条款', 'Pushing hard can win a lower price or better deal.|Menekan keras bisa memperoleh harga lebih rendah atau kesepakatan lebih baik.|強く押せば、有利な価格や条件を得られる。|强硬施压可争取更低价格或更好条件。'),
      I('cap', 'biz,pub', 'power', 2, 'Shows strength|Menunjukkan kekuatan|強さを示す|展示实力', 'The other side respects firmness.|Pihak lain menghormati ketegasan.|相手に、本気度が伝わる。|对方尊重坚定。'),
      I('cap', 'biz', 'clear', 2, 'Clear limits|Batas jelas|限界が明確|底线清晰', 'Everyone knows what you will not accept.|Semua tahu apa yang tidak Anda terima.|受け入れられない線が、はっきりする。|大家知道你的底线。'),
      I('val', 'biz,retail', 'save', 2, 'Short-term savings|Penghematan jangka pendek|短期的な節約|短期节省', 'Every concession is costly for them.|Setiap konsesi mahal bagi mereka.|相手の譲歩が、自社の利益になる。|对方每次让步都是你的收益。')
    ], [
      I('ppl', 'biz,fam', 'conflict', 3, 'Damages the relationship|Merusak hubungan|関係を傷つける|损害关系', 'The loser remembers and may retaliate.|Pihak yang kalah mengingat dan bisa membalas.|負けた側は覚えており、仕返しするかもしれない。|落败方记仇并可能报复。'),
      I('risk', 'biz,retail', 'lose', 2, 'Deal may collapse|Kesepakatan bisa gagal|交渉決裂のリスク|交易可能破裂', 'Pushing too far ends the talks.|Menekan terlalu jauh mengakhiri perundingan.|やりすぎると、交渉が終わる。|过度施压终止谈判。'),
      I('ppl', 'biz', 'stress', 2, 'Stressful and exhausting|Melelahkan dan penuh stres|ストレスと消耗|紧张耗神', 'Confrontation drains energy.|Konfrontasi menguras tenaga.|対立が、エネルギーを消耗させる。|对抗耗费精力。'),
      I('risk', 'biz,retail', 'short', 2, 'Poor long-term cooperation|Kerja sama jangka panjang buruk|長期協力に不利|不利长期合作', 'Squeezed partners cut corners.|Mitra yang tertekan menurunkan kualitas.|絞られた相手は、手を抜く。|被压榨的伙伴会偷工减料。')
    ]),
    C('compromise', 'Compromise|Kompromi|妥協|妥协', ['negotiation'], [
      I('ppl', 'biz,fam,pub', 'peace', 3, 'Keeps relationships|Menjaga hubungan|関係を保つ|维系关系', 'Both sides stay on speaking terms.|Kedua pihak tetap bisa berbicara.|双方が、対話を続けられる。|双方仍能对话。'),
      I('eff', 'biz,pub', 'fast', 2, 'Quick resolution|Penyelesaian cepat|早期解決|快速解决', 'Disputes end sooner.|Perselisihan berakhir lebih cepat.|争いが、早く終わる。|纠纷更快结束。'),
      I('val', 'biz,fam', 'fair', 2, 'Feels fair|Terasa adil|公平に感じられる|感觉公平', 'Each side gives something.|Setiap pihak memberi sesuatu.|双方が、何かを譲る。|双方各有付出。'),
      I('cap', 'biz,pub', 'safe', 2, 'Lower risk of deadlock|Risiko jalan buntu lebih rendah|行き詰まりの回避|减少僵局风险', 'Something is better than nothing.|Sesuatu lebih baik daripada tidak sama sekali.|何もないよりは、良い。|有总比没有好。')
    ], [
      I('val', 'biz,retail', 'lose', 3, 'Nobody gets what they want|Tak ada yang mendapatkan keinginannya|誰も満足しない|无人得偿所愿', 'Half solutions can satisfy no one.|Solusi setengah-setengah bisa tidak memuaskan siapa pun.|中途半端な解決は、誰も満足させない。|折中方案可能谁也不满意。'),
      I('risk', 'biz,pub', 'weak', 2, 'Seen as weak|Dianggap lemah|弱いと見られる|被视为软弱', 'Others may keep demanding more.|Pihak lain mungkin terus menuntut lebih.|相手が、さらに要求してくる。|对方可能不断加码。'),
      I('eff', 'biz,pub', 'noise', 2, 'Hides real problems|Menutupi masalah sebenarnya|本当の問題を覆い隠す|掩盖真正问题', 'The root issue returns later.|Akar masalah kembali kemudian.|根本の問題が、後でぶり返す。|根本问题日后重现。'),
      I('risk', 'biz,pub', 'bad', 2, 'Lowest-common-denominator decisions|Keputusan berstandar terendah|最低水準の決定|最低公约数式决策', 'Bold ideas are watered down.|Ide berani menjadi hambar.|大胆な案が、薄められる。|大胆想法被稀释。')
    ]),
    C('consensus decision', 'Consensus decision making|Pengambilan keputusan konsensus|合意形成型の意思決定|共识决策', ['autocratic decision'], [
      I('ppl', 'biz,pub,edu', 'team', 3, 'Buy-in and commitment|Dukungan dan komitmen|納得と当事者意識|认同与承诺', 'People support what they helped decide.|Orang mendukung hal yang mereka ikut putuskan.|自分も決めたことは、支持する。|参与决定的人会支持。'),
      I('cap', 'biz,pub', 'know', 2, 'More information|Informasi lebih banyak|多様な情報|信息更多', 'Many viewpoints reveal risks.|Banyak sudut pandang mengungkap risiko.|多様な視点が、リスクを明らかにする。|多视角揭示风险。'),
      I('ppl', 'biz,pub', 'fair', 2, 'Perceived fairness|Terasa adil|公平感|公平感', 'Everyone had a voice.|Semua punya suara.|全員が発言できた。|人人有发言权。'),
      I('cap', 'biz,pub', 'safe', 2, 'Fewer big mistakes|Lebih sedikit kesalahan besar|大きな失敗の減少|减少重大失误', 'Group review catches errors.|Tinjauan kelompok menangkap kesalahan.|集団の検討が、ミスを拾う。|集体审议发现错误。')
    ], [
      I('eff', 'biz,pub', 'slow', 3, 'Slow|Lambat|時間がかかる|缓慢', 'Reaching agreement takes long meetings.|Mencapai kesepakatan butuh rapat panjang.|合意まで、長い会議が必要。|达成一致需长会。'),
      I('risk', 'biz,pub', 'stuck', 2, 'Deadlock|Jalan buntu|行き詰まり|僵局', 'One objector can block everything.|Satu penentang bisa menghambat semuanya.|1人の反対で、全体が止まる。|一人反对即可卡住全局。'),
      I('risk', 'biz,pub', 'dilute', 2, 'Watered-down choices|Pilihan yang diencerkan|角の取れた決定|方案被稀释', 'Edges are removed to please all.|Hal tajam dihilangkan agar semua senang.|全員に配慮して、尖った案が丸くなる。|为取悦所有人而磨平棱角。'),
      I('ppl', 'biz,pub', 'blame', 2, 'Diffused responsibility|Tanggung jawab kabur|責任の分散|责任模糊', 'Nobody is accountable for the result.|Tak ada yang bertanggung jawab atas hasil.|誰も結果に責任を負わない。|无人对结果负责。')
    ]),
    C('autocratic decision', 'Autocratic decision making|Pengambilan keputusan otokratis|独断型の意思決定|独裁式决策', ['consensus decision'], [
      I('eff', 'biz,mfg,pub', 'fast', 3, 'Fast and decisive|Cepat dan tegas|迅速で決断力がある|迅速果断', 'One person decides immediately.|Satu orang memutuskan seketika.|1人が即座に決める。|一人立刻拍板。'),
      I('cap', 'mfg,health,pub', 'clear', 2, 'Clear direction|Arah jelas|方向性が明確|方向清晰', 'Everyone knows who decides.|Semua tahu siapa yang memutuskan.|誰が決めるか、明確。|谁说了算很明确。'),
      I('cap', 'health,pub,mfg', 'danger', 2, 'Good in a crisis|Baik saat krisis|危機時に有効|危机时有效', 'No time for debate in an emergency.|Tidak ada waktu berdebat saat darurat.|緊急時は、議論している暇がない。|紧急时没时间争论。'),
      I('ppl', 'biz,mfg', 'new', 2, 'Suits inexperienced teams|Cocok untuk tim kurang berpengalaman|経験の浅いチームに向く|适合缺乏经验的团队', 'Strong direction helps novices.|Arahan kuat membantu pemula.|強い指示が、未熟なチームを助ける。|强指导帮助新手。')
    ], [
      I('ppl', 'biz,pub', 'fear', 3, 'Low morale and fear|Moral rendah dan rasa takut|士気低下と恐れ|士气低与恐惧', 'Staff feel unheard.|Staf merasa tidak didengar.|声が届かないと感じる。|员工觉得没被倾听。'),
      I('risk', 'biz,pub', 'blind', 3, 'Blind spots and bad calls|Titik buta dan keputusan buruk|盲点と誤判断|盲区与误判', 'Nobody challenges the boss.|Tak ada yang menantang atasan.|誰も上司に異を唱えない。|无人挑战老板。'),
      I('ppl', 'biz', 'leave', 2, 'Talent leaves|Talenta pergi|人材の流出|人才离开', 'Capable people want a voice.|Orang berbakat ingin didengar.|有能な人は、発言権を求める。|能人希望有话语权。'),
      I('risk', 'biz,pub', 'depend', 2, 'Depends on one person|Bergantung pada satu orang|1人への依存|依赖一人', 'If the leader errs or leaves, trouble follows.|Jika pemimpin salah atau pergi, masalah muncul.|リーダーが誤る・去ると、困る。|领导出错或离开就麻烦。')
    ]),
    C('brainstorming', 'Brainstorming|Curah gagasan (brainstorming)|ブレインストーミング|头脑风暴', ['critical review'], [
      I('cap', 'biz,edu,pub', 'new', 3, 'Many ideas|Banyak ide|多くのアイデア|点子多', 'Quantity creates options.|Kuantitas menciptakan pilihan.|量が、選択肢を生む。|数量催生选项。'),
      I('ppl', 'biz,edu', 'team', 2, 'Team energy|Energi tim|チームの活気|团队活力', 'People enjoy building on each other.|Orang senang saling melengkapi.|互いに発想を重ねるのが楽しい。|大家乐于相互启发。'),
      I('eff', 'biz,edu', 'fast', 2, 'Quick to run|Cepat dilakukan|すぐにできる|快速进行', 'A whiteboard and an hour suffice.|Papan tulis dan satu jam cukup.|ホワイトボードと1時間で足りる。|白板和一小时足矣。'),
      I('cap', 'biz,edu', 'free', 2, 'No fear of judgement|Tanpa takut dihakimi|批判を恐れない|无需畏惧评判', 'Wild ideas are welcome.|Ide liar diterima.|突飛な案も歓迎される。|欢迎疯狂想法。')
    ], [
      I('risk', 'biz,edu', 'lazy', 3, 'Free riding and dominance|Pembonceng dan dominasi|ただ乗りと声の大きい人|搭便车与强势主导', 'Loud people dominate and quiet ones coast.|Yang vokal mendominasi dan yang pendiam ikut-ikutan.|声の大きい人が支配し、静かな人は流される。|声音大者主导，安静者敷衍。'),
      I('cap', 'biz', 'bias', 2, 'Groupthink|Groupthink|集団思考|群体思维', 'Early ideas anchor everyone.|Ide awal menjadi jangkar bagi semua orang.|最初の案に、皆が引っ張られる。|早期点子锚定所有人。'),
      I('eff', 'biz,edu', 'noise', 2, 'Quantity over quality|Kuantitas di atas kualitas|質より量|重量轻质', 'Many ideas, few good ones.|Banyak ide, sedikit yang bagus.|数は多いが、良い案は少ない。|点子多好的少。'),
      I('eff', 'biz,pub', 'stuck', 2, 'Ideas rarely followed up|Ide jarang ditindaklanjuti|実行につながりにくい|很少落实', 'Sticky notes get forgotten.|Catatan tempel terlupakan.|付箋が、忘れ去られる。|便签被遗忘。')
    ]),
    C('critical review', 'Devil\'s advocate|Devil\'s advocate (pemeran penentang)|悪魔の代弁者|唱反调者', ['brainstorming'], [
      I('cap', 'biz,pub,fin', 'safe', 3, 'Finds flaws early|Menemukan kelemahan sejak dini|欠陥の早期発見|及早发现缺陷', 'Weak assumptions get tested.|Asumsi lemah diuji.|弱い前提が、検証される。|薄弱假设被检验。'),
      I('cap', 'biz,pub', 'bias', 2, 'Prevents groupthink|Mencegah groupthink|集団思考を防ぐ|防止群体思维', 'Someone must disagree.|Seseorang harus berbeda pendapat.|誰かが反対意見を出す。|总有人提出异议。'),
      I('val', 'biz,fin', 'save', 2, 'Avoids costly mistakes|Menghindari kesalahan mahal|高くつく失敗を避ける|避免昂贵失误', 'Cheaper to find problems on paper.|Lebih murah menemukan masalah di atas kertas.|紙の上で見つけるほうが、安い。|纸面发现问题更便宜。'),
      I('cap', 'biz,pub', 'proof', 2, 'Stronger final plans|Rencana akhir lebih kuat|最終案が強くなる|最终计划更稳', 'Plans that survive challenge are sturdier.|Rencana yang lolos tantangan lebih kokoh.|批判に耐えた案は、強い。|经受挑战的计划更牢固。')
    ], [
      I('ppl', 'biz,pub', 'anger', 3, 'Annoys and demoralises|Menjengkelkan dan melemahkan semangat|不快感と士気低下|惹恼并打击士气', 'Constant objections wear people down.|Keberatan terus-menerus melelahkan orang.|反論が続くと、皆が疲れる。|不停反对令人疲惫。'),
      I('eff', 'biz,pub', 'slow', 2, 'Slows decisions|Memperlambat keputusan|決定が遅れる|拖慢决策', 'Every idea gets stuck in debate.|Setiap ide tersangkut dalam debat.|すべての案が、議論で止まる。|每个想法都卡在争论里。'),
      I('ppl', 'biz,pub', 'fear', 2, 'Kills creativity|Mematikan kreativitas|創造性を損なう|扼杀创意', 'People stop sharing half-formed ideas.|Orang berhenti membagikan ide yang belum matang.|未完成のアイデアを、出さなくなる。|人们不再分享不成熟想法。'),
      I('risk', 'biz,pub', 'false', 2, 'Becomes a ritual|Menjadi sekadar ritual|形骸化|沦为形式', 'Role-playing replaces real doubt.|Berpura-pura menggantikan keraguan sungguhan.|役割演技が、本物の疑いに取って代わる。|角色扮演取代真正质疑。')
    ]),
    C('emergency fund', 'Emergency fund|Dana darurat|緊急資金|应急基金', ['investing'], [
      I('val', 'fam,fin', 'safe', 3, 'Security in a crisis|Rasa aman saat krisis|緊急時の安心|危机中的安全感', 'You can cover bills if income stops.|Anda bisa membayar tagihan jika penghasilan berhenti.|収入が途絶えても、支払える。|收入中断仍能付账。'),
      I('ppl', 'fam', 'calm', 2, 'Less stress|Stres lebih sedikit|ストレスの軽減|压力更小', 'Surprise costs do not become disasters.|Biaya tak terduga tidak menjadi bencana.|想定外の出費が、災難にならない。|意外开支不成灾难。'),
      I('cap', 'fam,biz', 'choice', 2, 'Freedom to choose|Kebebasan memilih|選択の自由|选择自由', 'You need not take any job in desperation.|Anda tidak harus menerima pekerjaan apa pun karena terpaksa.|切羽詰まって、仕事を選ばなくて済む。|不必被迫接受任何工作。'),
      I('val', 'fam', 'debt', 2, 'Avoids expensive debt|Menghindari utang mahal|高い借金を避ける|避免高息债务', 'No need for loans in emergencies.|Tidak perlu pinjaman saat darurat.|緊急時に借金せずに済む。|急需时无需借贷。')
    ], [
      I('cost', 'fam,fin', 'waste', 3, 'Money earns little|Uang menghasilkan sedikit|お金が働かない|资金收益低', 'Savings lose to inflation.|Tabungan kalah oleh inflasi.|貯金はインフレに負ける。|储蓄跑不赢通胀。'),
      I('eff', 'fam', 'hard', 2, 'Hard to build|Sulit dibangun|貯めるのが大変|难以积累', 'Low earners struggle to set money aside.|Berpenghasilan rendah sulit menyisihkan uang.|低所得だと、貯める余裕がない。|低收入者难以存钱。'),
      I('ppl', 'fam', 'greed', 2, 'Temptation to spend|Godaan untuk membelanjakan|使ってしまう誘惑|忍不住花掉', 'Savings get used for non-emergencies.|Tabungan dipakai untuk hal yang bukan darurat.|緊急でない出費に、使ってしまう。|被挪作非紧急用途。'),
      I('mkt', 'fam,fin', 'lose', 2, 'Missed investment gains|Keuntungan investasi terlewat|運用益を逃す|错失投资收益', 'Cash on the side earns no returns.|Uang tunai menganggur tanpa imbal hasil.|現金のままでは、運用益が出ない。|闲置现金无回报。')
    ]),
    C('investing', 'Investing savings|Menginvestasikan tabungan|貯蓄の運用|把储蓄用于投资', ['emergency fund'], [
      I('val', 'fam,fin', 'profit', 3, 'Higher long-term returns|Imbal hasil jangka panjang lebih tinggi|長期的に高いリターン|长期回报更高', 'Money grows faster than in savings.|Uang tumbuh lebih cepat daripada tabungan.|貯金より、速く増える。|增长快于储蓄。'),
      I('cap', 'fam,fin', 'long', 2, 'Beats inflation|Mengalahkan inflasi|インフレに勝つ|跑赢通胀', 'Protects buying power.|Melindungi daya beli.|購買力を守る。|保护购买力。'),
      I('val', 'fam,fin', 'plan', 2, 'Builds wealth for goals|Membangun kekayaan untuk tujuan|目標のための資産形成|为目标积累财富', 'Retirement, education and home goals.|Tujuan pensiun, pendidikan, dan rumah.|老後・教育・住宅の資金になる。|用于养老、教育与购房。'),
      I('cap', 'fam,fin', 'learn', 2, 'Financial knowledge|Pengetahuan keuangan|金融知識|金融知识', 'You learn how markets work.|Anda belajar cara kerja pasar.|市場の仕組みが学べる。|学习市场运作。')
    ], [
      I('risk', 'fam,fin', 'lose', 3, 'Can lose money|Bisa merugi|損をすることがある|可能亏损', 'Markets fall, sometimes sharply.|Pasar turun, kadang tajam.|市場は下がり、時に急落する。|市场会跌，有时暴跌。'),
      I('risk', 'fam,fin', 'cheat', 2, 'Scams and bad advice|Penipuan dan saran buruk|詐欺と悪い助言|骗局与劣质建议', 'Many pitches promise easy profits.|Banyak tawaran menjanjikan untung mudah.|楽に儲かる話が、あふれている。|很多推销承诺轻松获利。'),
      I('ppl', 'fam,fin', 'stress', 2, 'Emotional stress|Stres emosional|精神的ストレス|情绪压力', 'Watching prices fall is hard.|Melihat harga turun itu berat.|値下がりを見るのは、つらい。|看着价格下跌很难受。'),
      I('eff', 'fam,fin', 'hard', 2, 'Needs time and knowledge|Butuh waktu dan pengetahuan|時間と知識が必要|需要时间与知识', 'Good choices require learning.|Pilihan baik butuh belajar.|良い判断には、学びが要る。|好选择需要学习。')
    ]),
    C('side hustle', 'Side hustle|Kerja sampingan|副業|副业', ['full time job'], [
      I('val', 'fam,retail,food', 'money', 3, 'Extra income|Penghasilan tambahan|副収入|额外收入', 'More money without quitting your job.|Lebih banyak uang tanpa berhenti bekerja.|仕事を辞めずに、収入が増える。|不辞职也能多赚。'),
      I('cap', 'fam,edu', 'skill', 2, 'New skills|Keterampilan baru|新しいスキル|新技能', 'You learn selling, marketing and finance.|Anda belajar menjual, memasarkan, dan keuangan.|営業・マーケ・お金の感覚が身につく。|学习销售、营销与财务。'),
      I('cap', 'fam,biz', 'safe', 2, 'Test a business idea|Menguji ide bisnis|ビジネスの試験運転|试水创业', 'Low risk to see if customers pay.|Risiko rendah untuk melihat apakah pelanggan mau membayar.|客が払うか、低リスクで確かめられる。|低风险验证客户是否买单。'),
      I('cap', 'fam', 'choice', 2, 'More security|Lebih aman|安心感|更有安全感', 'A second income eases job fear.|Penghasilan kedua meredakan ketakutan kehilangan kerja.|収入源が2つあると、失職が怖くない。|第二收入缓解失业恐惧。')
    ], [
      I('ppl', 'fam,biz', 'tired', 3, 'Exhaustion|Kelelahan|疲労|疲惫', 'Nights and weekends disappear.|Malam dan akhir pekan hilang.|夜も週末も、なくなる。|夜晚与周末消失。'),
      I('eff', 'fam,biz', 'time', 2, 'Hurts main job performance|Mengganggu kinerja pekerjaan utama|本業への悪影響|影响主业表现', 'Divided attention lowers results.|Perhatian terbagi menurunkan hasil.|注意が分散し、本業の成果が落ちる。|注意力分散降低成果。'),
      I('risk', 'biz,pub', 'conflict', 2, 'Employer conflict|Konflik dengan pemberi kerja|雇用主との摩擦|与雇主冲突', 'Contracts may forbid outside work.|Kontrak mungkin melarang kerja luar.|契約で副業が禁止されていることがある。|合同可能禁止兼职。'),
      I('cost', 'fam', 'tax', 2, 'Taxes and paperwork|Pajak dan dokumen|税金と手続き|税务与文书', 'Extra income must be reported.|Penghasilan tambahan harus dilaporkan.|副収入は、申告が必要。|额外收入需申报。')
    ]),
    C('full time job', 'Full-time employment|Pekerjaan penuh waktu|フルタイム雇用|全职工作', ['side hustle'], [
      I('val', 'fam', 'safe', 3, 'Steady salary|Gaji tetap|安定した給与|稳定薪资', 'Money arrives on a fixed date.|Uang datang pada tanggal tetap.|決まった日に、給与が入る。|固定日期发薪。'),
      I('ppl', 'fam,health', 'safe', 2, 'Benefits|Tunjangan|福利厚生|福利', 'Insurance, leave and pension.|Asuransi, cuti, dan pensiun.|保険・休暇・年金が付く。|保险、休假与养老金。'),
      I('cap', 'biz,edu', 'skill', 2, 'Career growth|Perkembangan karier|キャリアの成長|职业成长', 'Training and promotions.|Pelatihan dan promosi.|研修や昇進の機会がある。|培训与晋升机会。'),
      I('ppl', 'biz', 'friend', 2, 'Colleagues and structure|Rekan kerja dan struktur|同僚と仕組み|同事与体系', 'Teamwork and routine.|Kerja tim dan rutinitas.|チームワークと生活リズム。|团队合作与规律。')
    ], [
      I('val', 'fam,biz', 'limit', 3, 'Income ceiling|Batas penghasilan|収入の上限|收入天花板', 'Pay rises slowly.|Gaji naik perlahan.|給与は、ゆっくりしか上がらない。|薪水涨得慢。'),
      I('ppl', 'fam,biz', 'stuck', 2, 'Fixed hours|Jam tetap|時間の拘束|时间固定', 'Little control over your schedule.|Sedikit kendali atas jadwal.|スケジュールを自分で決めにくい。|难掌控日程。'),
      I('risk', 'biz,fam', 'depend', 2, 'Dependence on one employer|Bergantung pada satu pemberi kerja|1社への依存|依赖单一雇主', 'Layoffs hit hard.|PHK berdampak keras.|解雇されると、大きな打撃。|裁员冲击大。'),
      I('ppl', 'biz', 'boring', 2, 'Routine and boredom|Rutinitas dan kebosanan|単調さ|重复与乏味', 'Same tasks year after year.|Tugas sama dari tahun ke tahun.|毎年、同じ仕事の繰り返し。|年复一年同样任务。')
    ]),
    C('networking', 'Networking|Membangun jaringan|人脈づくり|人脉拓展', ['expertise'], [
      I('cap', 'biz,fam,edu', 'help', 3, 'Opportunities and referrals|Peluang dan rekomendasi|機会と紹介|机会与引荐', 'Jobs and deals often come via people.|Pekerjaan dan kesepakatan sering datang lewat orang.|仕事も取引も、人づてに来ることが多い。|工作与交易常经人脉而来。'),
      I('cap', 'biz,edu', 'know', 2, 'Information and advice|Informasi dan saran|情報と助言|信息与建议', 'Contacts share what they know.|Kontak membagikan apa yang mereka tahu.|知り合いが、情報を教えてくれる。|熟人分享所知。'),
      I('mkt', 'biz,retail', 'trust', 2, 'Trust opens doors|Kepercayaan membuka pintu|信頼が扉を開く|信任打开门路', 'People buy from those they know.|Orang membeli dari yang mereka kenal.|人は、知っている人から買う。|人们向熟人购买。'),
      I('ppl', 'biz,fam', 'friend', 2, 'Support network|Jaringan dukungan|支えとなるつながり|支持网络', 'Help in tough times.|Bantuan di masa sulit.|困ったときに助けてもらえる。|困难时有人相助。')
    ], [
      I('eff', 'biz,fam', 'time', 3, 'Takes time and energy|Butuh waktu dan tenaga|時間と労力がかかる|耗时耗力', 'Events and follow-ups add up.|Acara dan tindak lanjut menumpuk.|イベントやフォローが積み重なる。|活动与跟进累积。'),
      I('ppl', 'biz,edu', 'awkward', 2, 'Feels awkward or fake|Terasa canggung atau palsu|ぎこちない・作為的|尴尬或虚伪', 'Many dislike self-promotion.|Banyak orang tidak suka mempromosikan diri.|自己アピールが苦手な人も多い。|很多人不喜欢自我推销。'),
      I('risk', 'biz,pub', 'unfair', 2, 'Favouritism|Pilih kasih|縁故・えこひいき|任人唯亲', 'Connections can beat merit.|Koneksi bisa mengalahkan kemampuan.|コネが、実力に勝つことがある。|关系可压过能力。'),
      I('cost', 'biz', 'money', 2, 'Costs of events and travel|Biaya acara dan perjalanan|イベント・移動の費用|活动与差旅花费', 'Conferences and dinners are not cheap.|Konferensi dan makan malam tidak murah.|会議や会食には、費用がかかる。|会议与饭局不便宜。')
    ]),
    C('expertise', 'Deep expertise|Keahlian mendalam|深い専門性|深度专长', ['networking'], [
      I('mkt', 'biz,health,edu', 'premium', 3, 'High value and fees|Nilai dan tarif tinggi|高い価値と報酬|高价值与高酬劳', 'Rare skills command premium pay.|Keahlian langka dihargai tinggi.|希少な専門性は、高く評価される。|稀缺技能获高酬。'),
      I('cap', 'biz,health,edu', 'trust', 2, 'Credibility|Kredibilitas|信頼性|可信度', 'Others rely on your judgement.|Orang lain mengandalkan penilaian Anda.|周囲が、あなたの判断を頼る。|他人依赖你的判断。'),
      I('val', 'biz,health', 'quality', 2, 'Better quality of work|Mutu pekerjaan lebih baik|仕事の質が高い|工作质量更高', 'Fewer mistakes, faster solutions.|Lebih sedikit kesalahan, solusi lebih cepat.|ミスが少なく、解決が早い。|错误少，解决快。'),
      I('cap', 'biz,edu', 'edge', 2, 'Hard for rivals to copy|Sulit ditiru pesaing|競合が真似しにくい|对手难复制', 'Years of practice create a moat.|Latihan bertahun-tahun menciptakan parit pertahanan.|長年の経験が、参入障壁になる。|多年积累构成壁垒。')
    ], [
      I('risk', 'biz,health,edu', 'narrow', 3, 'Narrow view|Pandangan sempit|視野が狭い|视野狭窄', 'Specialists miss the bigger picture.|Spesialis melewatkan gambaran besar.|専門家は、全体像を見失いがち。|专家容易忽略全局。'),
      I('risk', 'biz,mfg', 'old', 2, 'Skills become obsolete|Keahlian menjadi usang|スキルの陳腐化|技能过时', 'Technology can erase a speciality.|Teknologi bisa menghapus spesialisasi.|技術の進歩で、専門が不要になる。|技术可淘汰专长。'),
      I('eff', 'biz,edu', 'time', 2, 'Takes years to build|Butuh bertahun-tahun|育てるのに何年もかかる|培养需多年', 'No shortcut to mastery.|Tidak ada jalan pintas menuju penguasaan.|習熟に近道はない。|精通无捷径。'),
      I('ppl', 'biz', 'stuck', 2, 'Hard to change careers|Sulit berganti karier|転職しにくい|难转行', 'Deep skill ties you to one field.|Keahlian mendalam mengikat Anda pada satu bidang.|深い専門性が、1つの分野に縛る。|深厚技能把你绑在一个领域。')
    ]),
    C('mentoring', 'Mentoring|Mentoring|メンタリング|导师制', ['self study'], [
      I('cap', 'biz,edu,health', 'skill', 3, 'Faster learning|Belajar lebih cepat|学びが早い|学习更快', 'Learn from others\' mistakes and experience.|Belajar dari kesalahan dan pengalaman orang lain.|他者の失敗や経験から学べる。|借鉴他人经验教训。'),
      I('ppl', 'biz,edu', 'trust', 2, 'Guidance and support|Bimbingan dan dukungan|助言と支え|指导与支持', 'Someone to ask when stuck.|Ada tempat bertanya saat buntu.|行き詰まったとき、相談できる。|卡住时有人可问。'),
      I('cap', 'biz,pub', 'know', 2, 'Passes on know-how|Mewariskan pengetahuan|ノウハウの継承|传承经验', 'Knowledge stays in the organisation.|Pengetahuan tetap di organisasi.|知見が、組織に残る。|知识留在组织。'),
      I('ppl', 'biz,edu', 'friend', 2, 'Network access|Akses jaringan|人脈へのアクセス|接触人脉', 'Mentors introduce mentees to others.|Mentor memperkenalkan mentee kepada orang lain.|メンターが、人を紹介してくれる。|导师引荐他人。')
    ], [
      I('eff', 'biz,edu', 'time', 3, 'Takes senior time|Menyita waktu senior|先輩の時間を取る|占用资深者时间', 'Experienced staff have limited hours.|Staf berpengalaman punya waktu terbatas.|経験者の時間は、限られている。|资深员工时间有限。'),
      I('risk', 'biz,edu', 'copy', 2, 'Passes on bad habits|Menurunkan kebiasaan buruk|悪い習慣も伝わる|传递坏习惯', 'Mentees copy flaws too.|Mentee juga meniru kekurangan.|欠点まで、真似される。|学员也会学到缺点。'),
      I('ppl', 'biz,edu', 'conflict', 2, 'Poor match|Kecocokan buruk|相性が合わない|不匹配', 'Personalities may clash.|Kepribadian bisa bentrok.|性格が合わないことがある。|性格可能冲突。'),
      I('ppl', 'biz,edu', 'depend', 2, 'Dependence on the mentor|Ketergantungan pada mentor|メンターへの依存|依赖导师', 'Mentees may avoid thinking alone.|Mentee mungkin enggan berpikir mandiri.|自分で考えなくなる恐れがある。|学员可能不再独立思考。')
    ]),
    C('self study', 'Self-study|Belajar mandiri|独学|自学', ['mentoring'], [
      I('val', 'edu,fam', 'cheap', 3, 'Low cost|Biaya rendah|低コスト|成本低', 'Books and online courses are cheap.|Buku dan kursus daring murah.|本やオンライン講座は安い。|书籍与网课便宜。'),
      I('eff', 'edu,fam', 'flexible', 3, 'Own pace and time|Waktu dan kecepatan sendiri|自分のペース|自主节奏', 'Study when and what you like.|Belajar kapan dan apa yang Anda mau.|好きな時に、好きな内容を学べる。|随时学想学的。'),
      I('cap', 'edu,biz', 'free', 2, 'Follow your interests|Mengikuti minat|興味に沿って学べる|追随兴趣', 'No fixed curriculum.|Tanpa kurikulum tetap.|決まったカリキュラムがない。|没有固定课程。'),
      I('ppl', 'edu,fam', 'proud', 2, 'Builds discipline|Membangun disiplin|自律心が育つ|培养自律', 'You learn how to learn.|Anda belajar cara belajar.|学び方が身につく。|学会如何学习。')
    ], [
      I('risk', 'edu', 'lost', 3, 'No feedback|Tanpa umpan balik|フィードバックがない|缺少反馈', 'Mistakes go uncorrected.|Kesalahan tidak dikoreksi.|間違いを、正してもらえない。|错误无人纠正。'),
      I('ppl', 'edu,fam', 'lazy', 2, 'Needs strong discipline|Butuh disiplin kuat|強い自制心が必要|需要强自律', 'Easy to quit or procrastinate.|Mudah berhenti atau menunda.|やめたり先延ばしにしやすい。|易放弃或拖延。'),
      I('mkt', 'biz,edu', 'proof', 2, 'Lacks recognised credentials|Tanpa kredensial diakui|資格として認められにくい|缺乏公认证书', 'Employers want certificates.|Pemberi kerja menginginkan sertifikat.|雇う側は、資格を求める。|雇主需要证书。'),
      I('ppl', 'edu', 'alone', 2, 'Isolated|Terisolasi|孤独|孤立', 'No classmates or community.|Tanpa teman sekelas atau komunitas.|仲間やコミュニティがない。|没有同学与社群。')
    ]),
    C('delaying decisions', 'Waiting before deciding|Menunda keputusan|決断を先延ばしにする|推迟决定', ['quick decision'], [
      I('cap', 'biz,fam,pub', 'know', 3, 'More information|Informasi lebih banyak|情報が増える|信息更多', 'Facts may arrive before you must choose.|Fakta mungkin datang sebelum Anda harus memilih.|選ぶ前に、事実が出そろうかもしれない。|选择前可能获得更多事实。'),
      I('val', 'biz,fin', 'safe', 2, 'Avoids hasty mistakes|Menghindari kesalahan terburu-buru|拙速な失敗を避ける|避免草率失误', 'Calm thinking beats panic.|Berpikir tenang mengalahkan panik.|冷静な判断が、焦りに勝る。|冷静思考胜过恐慌。'),
      I('cap', 'biz,fam', 'choice', 2, 'Keeps options open|Menjaga pilihan tetap terbuka|選択肢を残す|保留选项', 'You commit later.|Anda berkomitmen belakangan.|決断を後にできる。|可以晚点承诺。'),
      I('ppl', 'biz,pub', 'calm', 2, 'Cooling-off|Masa tenang|頭を冷やせる|冷静期', 'Emotions settle first.|Emosi mereda lebih dulu.|感情が、落ち着く。|情绪先平复。')
    ], [
      I('mkt', 'biz,retail', 'lose', 3, 'Missed opportunities|Peluang terlewat|機会損失|错失机会', 'Others move first.|Pihak lain bergerak lebih dulu.|他社が先に動く。|别人抢先行动。'),
      I('ppl', 'biz,fam', 'stress', 2, 'Growing anxiety|Kecemasan bertambah|不安の増大|焦虑加剧', 'Open questions weigh on people.|Pertanyaan yang menggantung membebani orang.|未決の問題が、心の負担になる。|悬而未决令人心烦。'),
      I('cost', 'biz,fin', 'expensive', 2, 'Rising cost of delay|Biaya penundaan naik|遅れのコストが増す|拖延成本上升', 'Prices and problems grow.|Harga dan masalah bertambah.|価格も問題も大きくなる。|价格与问题增加。'),
      I('ppl', 'biz,pub', 'blame', 2, 'Team frustration|Frustrasi tim|チームの苛立ち|团队沮丧', 'Staff cannot plan without a decision.|Staf tidak dapat merencanakan tanpa keputusan.|決定がなく、計画が立たない。|无决策则无法计划。')
    ]),
    C('quick decision', 'Deciding quickly|Memutuskan dengan cepat|素早い決断|快速决策', ['delaying decisions'], [
      I('mkt', 'biz,retail', 'first', 3, 'Seizes opportunities|Menangkap peluang|機会をつかむ|抓住机会', 'You move before rivals.|Anda bergerak sebelum pesaing.|競合より先に動ける。|先于对手行动。'),
      I('ppl', 'biz,pub', 'trust', 2, 'Clear direction for the team|Arah jelas bagi tim|チームに明確な方向|团队方向清晰', 'People can start working.|Orang dapat mulai bekerja.|皆が、動き出せる。|大家可以开工。'),
      I('eff', 'biz,pub', 'fast', 2, 'Momentum|Momentum|勢い|势头', 'Progress breeds progress.|Kemajuan melahirkan kemajuan.|前進が、さらなる前進を生む。|进展带来更多进展。'),
      I('cap', 'biz,health', 'learn', 2, 'Learn by doing|Belajar dengan melakukan|やりながら学ぶ|边做边学', 'Reality teaches faster than analysis.|Kenyataan mengajar lebih cepat daripada analisis.|現実は、分析より早く教えてくれる。|现实比分析教得快。')
    ], [
      I('risk', 'biz,fin,health', 'mistake', 3, 'Costly mistakes|Kesalahan mahal|高くつく失敗|代价高昂的失误', 'Missing facts lead to bad calls.|Fakta yang kurang menyebabkan keputusan buruk.|情報不足が、誤判断を招く。|缺乏事实导致误判。'),
      I('risk', 'biz,pub', 'bias', 2, 'Bias and impulse|Bias dan impuls|偏見と衝動|偏见与冲动', 'Emotion drives the choice.|Emosi mengarahkan pilihan.|感情が、判断を左右する。|情绪主导选择。'),
      I('ppl', 'biz,pub', 'conflict', 2, 'Others feel ignored|Pihak lain merasa diabaikan|無視されたと感じる人が出る|他人觉得被忽略', 'Fast decisions skip consultation.|Keputusan cepat melewatkan konsultasi.|素早い決定は、相談を飛ばす。|快决策跳过协商。'),
      I('risk', 'biz,fin', 'stuck', 2, 'Hard to reverse|Sulit dibatalkan|後戻りしにくい|难以撤回', 'Some choices lock you in.|Sebagian pilihan mengunci Anda.|取り消せない決断もある。|有些选择无法回头。')
    ]),
    C('learning by doing', 'Learning by doing|Belajar sambil mengerjakan|実践で学ぶ|边做边学', ['classroom learning'], [
      I('cap', 'edu,biz,health', 'skill', 3, 'Real skills|Keterampilan nyata|実践的なスキル|真实技能', 'Practice builds ability faster than reading.|Praktik membangun kemampuan lebih cepat daripada membaca.|練習は、読むより早く力をつける。|练习比阅读更快形成能力。'),
      I('ppl', 'edu,biz', 'proud', 2, 'Engagement|Keterlibatan|主体的な関わり|投入度高', 'Doing is more motivating than listening.|Mengerjakan lebih memotivasi daripada mendengarkan.|聞くより、やるほうがやる気が出る。|动手比听讲更有动力。'),
      I('cap', 'edu,biz', 'learn', 2, 'Learn from mistakes|Belajar dari kesalahan|失敗から学べる|从错误中学习', 'Failures teach memorable lessons.|Kegagalan memberi pelajaran yang diingat.|失敗が、記憶に残る教訓になる。|失败教训令人难忘。'),
      I('mkt', 'edu,biz', 'proof', 2, 'Portfolio of work|Portofolio karya|実績として示せる|作品集', 'You can show what you made.|Anda dapat menunjukkan apa yang dibuat.|作ったものを、見せられる。|可展示作品。')
    ], [
      I('risk', 'health,mfg,fin', 'danger', 3, 'Real consequences|Konsekuensi nyata|現実の結果が生じる|后果真实', 'Mistakes can harm customers.|Kesalahan dapat merugikan pelanggan.|ミスが、顧客に害を及ぼす。|错误可能伤害客户。'),
      I('eff', 'edu', 'slow', 2, 'Slower coverage|Cakupan lebih lambat|網羅に時間がかかる|覆盖较慢', 'Hard to cover theory systematically.|Sulit mencakup teori secara sistematis.|理論を体系的に学びにくい。|难系统覆盖理论。'),
      I('risk', 'edu,biz', 'blind', 2, 'Gaps in understanding|Celah pemahaman|理解の抜け|理解缺口', 'You may not know why things work.|Anda mungkin tidak tahu mengapa sesuatu berhasil.|なぜ動くのか、分からないまま進む。|可能不知其所以然。'),
      I('ppl', 'edu,biz', 'stress', 2, 'Needs supervision|Butuh pengawasan|指導者が必要|需要监督', 'Without guidance, bad habits form.|Tanpa bimbingan, kebiasaan buruk terbentuk.|指導なしでは、悪い癖がつく。|无指导会养成坏习惯。')
    ]),
    C('classroom learning', 'Classroom learning|Belajar di kelas|教室での学び|课堂学习', ['learning by doing'], [
      I('cap', 'edu', 'teach', 3, 'Structured knowledge|Pengetahuan terstruktur|体系的な知識|系统知识', 'A clear order from basics to advanced.|Urutan jelas dari dasar ke lanjut.|基礎から応用へ、順序立てて学べる。|从基础到高级次序清晰。'),
      I('ppl', 'edu', 'friend', 2, 'Classmates and discussion|Teman sekelas dan diskusi|仲間との議論|同学与讨论', 'Learn from each other.|Belajar dari satu sama lain.|互いに学び合える。|相互学习。'),
      I('cap', 'edu', 'help', 2, 'Expert instruction|Pengajaran ahli|専門家の指導|专家教学', 'Teachers answer questions on the spot.|Pengajar menjawab pertanyaan langsung.|先生が、その場で質問に答える。|老师当场答疑。'),
      I('mkt', 'edu,biz', 'proof', 2, 'Recognised qualification|Kualifikasi diakui|認められた資格|获认可资历', 'Diplomas open doors.|Ijazah membuka pintu.|学位や資格が、道を開く。|文凭打开门路。')
    ], [
      I('cost', 'edu,fam', 'expensive', 3, 'Costly and fixed|Mahal dan terjadwal|費用が高く時間も固定|昂贵且固定', 'Tuition and fixed hours.|Biaya kuliah dan jam tetap.|授業料と固定の時間割。|学费与固定课时。'),
      I('eff', 'edu', 'slow', 2, 'Slow pace for some|Tempo lambat bagi sebagian|ペースが合わない|节奏对部分人偏慢', 'Everyone moves at the class speed.|Semua mengikuti kecepatan kelas.|全員が、クラスの速さに合わせる。|人人按班级节奏。'),
      I('ppl', 'edu', 'boring', 2, 'Passive listening|Mendengarkan pasif|受け身の学習|被动听讲', 'Lectures lose attention.|Kuliah menghilangkan perhatian.|講義は、集中が切れやすい。|讲座易分心。'),
      I('risk', 'edu,biz', 'old', 2, 'Theory far from practice|Teori jauh dari praktik|理論と実務の乖離|理论脱离实践', 'Content may lag behind the real world.|Materi bisa tertinggal dari dunia nyata.|内容が、現実に追いついていない。|内容可能落后于现实。')
    ])
  );
})();
