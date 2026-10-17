/* Corporate Society: content part 7 (story chapters, prologues, values, tags for the older events). Must load after all event files. */
(function () {
  const root = typeof MBALAB !== 'undefined' ? MBALAB : (globalThis.MBALAB = globalThis.MBALAB || {});
  const X = s => s.split('|');
  const O = (t, r, fx, rel, more) => Object.assign({ t: X(t), r: X(r), fx: fx || {}, rel: rel || {} }, more || {});
  const CC = root.corpContent, EV = CC.events, byId = id => EV.find(e => e.id === id);
  /* ---------- extra fourth alternatives for key older events ---------- */
  const add = (id, o) => { const e = byId(id); if (e && e.opts.length < 4) e.opts.push(o); };
  add('g_deadline', O('Propose a trade: finish it if something else moves|Usulkan pertukaran: selesaikan jika hal lain digeser|交換条件を出す:他を後ろ倒しにするなら引き受ける|提出交换:若别的事后移就接下', '{boss} agrees to reprioritise. Everyone sees the real cost.|{boss} setuju menata ulang prioritas. Semua melihat biaya sebenarnya.|{boss}は優先順位を見直し、実際のコストが皆に見えた。|{boss}同意重排优先级，大家看清了真实成本。', { perf: 3, skill: 2, energy: -4 }, { boss: 3 }));
  add('g_gossip', O('Warn the person being discussed|Peringatkan orang yang dibicarakan|噂されている本人に知らせる|提醒被议论的人', 'It is kind and a little risky. The person never forgets it.|Itu baik dan sedikit berisiko. Orang itu tak akan lupa.|親切だが少し危うい。本人は一生忘れない。|善意却有点冒险，对方不会忘记。', { integ: 2, net: 2, rep: -1 }, { other: 6 }));
  add('g_credit', O('Document your contribution in writing|Dokumentasikan kontribusi Anda secara tertulis|貢献を文書で残す|书面记录你的贡献', 'A neutral, factual record. It protects you without any drama.|Catatan netral dan faktual. Melindungi Anda tanpa drama.|中立で事実に基づく記録。波風を立てずに身を守れる。|中立、基于事实的记录，不起波澜地保护了你。', { rep: 3, integ: 1 }, {}));
  add('g_lunch', O('Invite someone from another division|Ajak seseorang dari divisi lain|他部門の人を誘う|邀请其他部门的人', 'New faces, new stories. The network widens.|Wajah baru, cerita baru. Jaringan melebar.|新しい顔、新しい話。人脈が広がる。|新面孔，新故事，人脉拓宽。', { net: 6, energy: 2 }, { other: 5 }));
  add('g_conflict', O('Propose a rule both sides can follow|Usulkan aturan yang bisa diikuti kedua pihak|双方が守れるルールを提案する|提出双方都能遵守的规则', 'A rule outlasts the argument.|Aturan bertahan lebih lama daripada perdebatan.|ルールは口論より長持ちする。|规则比争吵活得久。', { skill: 3, rep: 3, energy: -4 }, { other: 3, peer: 2 }));
  add('g_feedback', O('Ask for a regular check-in|Minta pertemuan rutin|定期的な面談を頼む|要求定期沟通', 'Feedback becomes a habit, not a verdict.|Umpan balik menjadi kebiasaan, bukan vonis.|フィードバックが判決ではなく習慣になる。|反馈变成习惯，而非裁决。', { skill: 4, perf: 2, energy: -3 }, { boss: 3 }));
  add('g_afterwork', O('Invite a quiet colleague to join|Ajak rekan yang pendiam ikut|物静かな同僚を誘う|邀请安静的同事一起', 'The quiet colleague opens up. A real friendship starts.|Rekan itu mulai terbuka. Persahabatan sungguhan dimulai.|その同僚が心を開き、本当の友情が始まった。|那位同事敞开心扉，真正的友谊开始了。', { net: 4, energy: -4 }, { peer: 6 }));
  add('g_junior', O('Pair up and solve it together|Berpasangan dan selesaikan bersama|一緒にペアで解く|结对一起解决', 'Slower than answering, faster than failing alone.|Lebih lambat daripada menjawab, lebih cepat daripada gagal sendirian.|答えるより遅いが、一人で失敗するより早い。|比直接给答案慢，比独自失败快。', { skill: 2, energy: -6 }, { junior: 6 }));
  add('f_budget', O('Offer a pilot with a small budget|Tawarkan uji coba dengan anggaran kecil|小さな予算でパイロットを提案する|提议小预算试点', 'A pilot answers the question with evidence.|Uji coba menjawab pertanyaan dengan bukti.|パイロットは証拠で問いに答える。|试点用证据回答问题。', { skill: 3, perf: 2 }, { other: 3 }));
  add('f_cash', O('Ask the director for a short-term facility|Minta direktur menyediakan fasilitas jangka pendek|役員に短期の資金枠を相談する|向总监申请短期额度', 'It works, and the director now watches your numbers.|Berhasil, dan direktur kini memperhatikan angka Anda.|うまくいったが、役員があなたの数字を見るようになった。|成功了，但总监从此盯着你的数字。', { rep: 3, perf: 2, energy: -4 }, { director: 4 }));
  add('i_bug', O('Release in stages to a small group|Rilis bertahap ke kelompok kecil|少人数に段階的にリリースする|分阶段小范围发布', 'The risk is contained and you learn fast.|Risikonya terkendali dan Anda belajar cepat.|リスクを抑えつつ素早く学べた。|风险可控，学得很快。', { skill: 4, perf: 3 }, { boss: 2 }));
  add('i_outage', O('Declare the incident and run a calm war room|Umumkan insiden dan jalankan ruang komando yang tenang|インシデントを宣言し、冷静な対策会議を開く|宣布事故并冷静组织作战室', 'Order beats heroics. Recovery is faster.|Keteraturan mengalahkan heroisme. Pemulihan lebih cepat.|英雄的行動より秩序が勝る。復旧も早い。|有序胜过逞英雄，恢复更快。', { skill: 4, rep: 4, energy: -8 }, { boss: 3, senior: 3 }));
  add('i_request', O('Offer a smaller version first|Tawarkan versi yang lebih kecil lebih dulu|まず小さな版を提案する|先提供较小的版本', 'The requester gets value quickly and the scope stays sane.|Peminta mendapat nilai cepat dan cakupan tetap wajar.|依頼者はすぐ価値を得て、範囲も適正に保たれる。|需求方很快得到价值，范围也保持合理。', { perf: 3, skill: 2 }, { other: 3 }));
  add('j_present', O('Ask {boss} to present with you|Minta {boss} mempresentasikan bersama|{boss}と共同で発表してもらう|请{boss}一起汇报', 'Safe, and you learn by watching.|Aman, dan Anda belajar dengan mengamati.|安全で、見て学べる。|稳妥，且你边看边学。', { skill: 4, rep: 2 }, { boss: 3 }));
  add('j_mistake', O('Ask {senior} how to tell {boss}|Tanya {senior} cara memberi tahu {boss}|{senior}に{boss}への伝え方を相談する|问{senior}该怎么告诉{boss}', 'A good script and moral support.|Naskah yang baik dan dukungan moral.|良い伝え方と、心の支えが得られた。|得到一份好说辞和精神支持。', { integ: 3, skill: 2 }, { senior: 4, boss: 2 }));
  add('m_squeeze', O('Re-plan the work and show the trade-offs|Rencanakan ulang pekerjaan dan tunjukkan pertukarannya|計画を組み直してトレードオフを示す|重新规划并展示取舍', 'Clear choices make everyone calmer.|Pilihan yang jelas membuat semua lebih tenang.|選択肢が明確で、皆が落ち着く。|选项清晰让所有人更平静。', { skill: 3, perf: 3, energy: -4 }, { boss: 2, junior: 3 }));
  add('m_clash', O('Set up a shared goal for both of them|Tetapkan tujuan bersama untuk keduanya|二人に共通の目標を設定する|为两人设定共同目标', 'A common goal turns rivals into partners.|Tujuan bersama mengubah saingan menjadi mitra.|共通の目標が競争相手を仲間に変える。|共同目标让对手变成伙伴。', { skill: 3, rep: 3 }, { peer: 4, junior: 2 }));
  add('s_layoff', O('Ask for a hiring freeze and voluntary exits first|Minta pembekuan perekrutan dan pengunduran diri sukarela dulu|採用凍結と希望退職を先に求める|先要求冻结招聘并推行自愿离职', 'It softens the blow and buys time.|Mengurangi dampak dan mengulur waktu.|衝撃を和らげ、時間を稼げる。|缓和冲击并争取时间。', { integ: 3, rep: 3, energy: -6 }, { director: -1, junior: 4 }));
  add('s_strategy', O('Pilot one piece before committing|Uji satu bagian sebelum berkomitmen|全面採用の前に一部を試す|先试点一部分再承诺', 'Evidence before the leap.|Bukti sebelum melompat.|飛ぶ前に証拠を。|先有证据再起跳。', { skill: 3, rep: 3 }, { director: 2 }));
  /* ---------- value tags and themes for the older events ---------- */
  const V = {
    quiet: [['ambition'], ['fairness'], ['balance']],
    g_deadline: [['ambition'], ['balance'], ['balance'], ['learning']],
    g_gossip: [['loyalty'], ['integrity'], ['integrity'], ['fairness']],
    g_credit: [['integrity'], ['fairness'], ['balance'], ['learning']],
    g_lunch: [['fairness'], ['ambition'], ['learning'], ['fairness']],
    g_conflict: [['fairness'], ['loyalty'], ['ambition'], ['learning']],
    g_feedback: [['learning'], ['ambition'], ['loyalty'], ['learning']],
    g_afterwork: [['loyalty'], ['balance'], ['balance'], ['fairness']],
    g_lobby: [['ambition'], ['fairness'], ['balance']],
    g_junior: [['fairness'], ['balance'], ['ambition'], ['learning']],
    g_rest: [['balance'], ['ambition'], ['balance']],
    f_numbers: [['integrity'], ['ambition'], ['integrity']],
    f_audit_bad: [['integrity'], ['ambition'], ['integrity']],
    f_audit_ok: [['fairness'], ['ambition']],
    f_budget: [['loyalty'], ['integrity'], ['learning'], ['learning']],
    f_cash: [['integrity'], ['loyalty'], ['balance'], ['learning']],
    f_vendor: [['integrity'], ['ambition'], ['ambition']],
    i_bug: [['integrity'], ['ambition'], ['learning'], ['learning']],
    i_outage: [['ambition'], ['fairness'], ['ambition'], ['learning']],
    i_request: [['loyalty'], ['learning'], ['balance'], ['learning']],
    i_security: [['integrity'], ['ambition'], ['balance']],
    i_ai: [['learning'], ['integrity'], ['balance']],
    j_present: [['learning'], ['fairness'], ['ambition'], ['loyalty']],
    j_mistake: [['integrity'], ['ambition'], ['balance'], ['learning']],
    m_squeeze: [['fairness'], ['ambition'], ['loyalty'], ['learning']],
    m_clash: [['fairness'], ['loyalty'], ['balance'], ['learning']],
    s_layoff: [['learning'], ['loyalty'], ['fairness'], ['fairness']],
    s_scandal: [['integrity'], ['fairness'], ['balance']],
    s_strategy: [['integrity'], ['ambition'], ['learning'], ['learning']],
    g_credit_again: [['integrity'], ['fairness']]
  };
  const TH = { quiet: 'growth', g_deadline: 'crisis', g_gossip: 'politics', g_credit: 'politics', g_lunch: 'growth', g_conflict: 'conflict', g_feedback: 'growth', g_afterwork: 'people', g_lobby: 'growth', g_junior: 'people', g_rest: 'people', f_numbers: 'ethics', f_audit_bad: 'ethics', f_audit_ok: 'politics', f_budget: 'conflict', f_cash: 'crisis', f_vendor: 'ethics', i_bug: 'crisis', i_outage: 'crisis', i_request: 'conflict', i_security: 'ethics', i_ai: 'growth', j_present: 'growth', j_mistake: 'ethics', m_squeeze: 'conflict', m_clash: 'people', s_layoff: 'crisis', s_scandal: 'ethics', s_strategy: 'politics', g_credit_again: 'politics' };
  Object.keys(V).forEach(id => { const e = byId(id); if (!e) return; if (!e.th) e.th = TH[id]; e.opts.forEach((o, i) => { if (!o.v && V[id][i]) o.v = V[id][i]; }); });
  /* ---------- the eight chapters ---------- */
  CC.chapters = [
    { th: ['growth', 'people'], e: '🌅', t: X('Chapter 1 · The first impression|Bab 1 · Kesan pertama|第1章 · 第一印象|第1章 · 第一印象'), s: X('Everyone is still learning your name. What you do now is what they will remember.|Semua orang masih belajar menyebut nama Anda. Apa yang Anda lakukan sekarang akan mereka ingat.|皆まだあなたの名前を覚えている途中。今の行動が記憶に残る。|大家还在记你的名字，你现在的所作所为会被记住。') },
    { th: ['growth', 'politics'], e: '🤝', t: X('Chapter 2 · The map of people|Bab 2 · Peta orang-orang|第2章 · 人の地図|第2章 · 人际地图'), s: X('You begin to see who talks to whom, and who decides what.|Anda mulai melihat siapa bicara dengan siapa, dan siapa yang memutuskan apa.|誰が誰と話し、誰が何を決めるのかが見え始める。|你开始看清谁和谁往来，谁决定什么。') },
    { th: ['conflict', 'people'], e: '⚡', t: X('Chapter 3 · Friction|Bab 3 · Gesekan|第3章 · 摩擦|第3章 · 摩擦'), s: X('Deadlines tighten and tempers fray. Small disagreements become real ones.|Tenggat mengetat dan emosi menipis. Perbedaan kecil menjadi nyata.|締め切りが迫り、苛立ちが募る。小さな意見の違いが本物の対立になる。|截止日期收紧，脾气变躁，小分歧变成真矛盾。') },
    { th: ['ethics', 'crisis'], e: '🧭', t: X('Chapter 4 · A line to cross|Bab 4 · Garis yang bisa dilanggar|第4章 · 越えるべき一線|第4章 · 一条可以越过的线'), s: X('Someone offers a shortcut. It is quiet, easy, and slightly wrong.|Seseorang menawarkan jalan pintas. Sunyi, mudah, dan sedikit salah.|誰かが近道を持ちかける。静かで、簡単で、少し間違っている。|有人递来一条捷径，悄无声息、轻而易举，却略有不妥。') },
    { th: ['politics', 'crisis'], e: '🌪️', t: X('Chapter 5 · The storm|Bab 5 · Badai|第5章 · 嵐|第5章 · 风暴'), s: X('A crisis lands from above. Everyone looks for someone to blame, or someone to lead.|Krisis datang dari atas. Semua mencari yang disalahkan, atau yang memimpin.|上から危機が降ってくる。皆が責任者か、リーダーを探す。|危机自上而下降临，人人都在找替罪羊或领路人。') },
    { th: ['people', 'ethics'], e: '🪞', t: X('Chapter 6 · The mirror|Bab 6 · Cermin|第6章 · 鏡|第6章 · 镜子'), s: X('You notice who you have become over these weeks. Others notice too.|Anda menyadari siapa diri Anda selama minggu-minggu ini. Orang lain juga.|この数週間で自分が何者になったか気づく。周囲も気づいている。|你发觉这几周自己变成了什么样的人，别人也发觉了。') },
    { th: ['politics', 'growth'], e: '🏛️', t: X('Chapter 7 · The decision room|Bab 7 · Ruang keputusan|第7章 · 意思決定の部屋|第7章 · 决策室'), s: X('Promotions and cuts are discussed behind closed doors. Your name is on the table.|Promosi dan pemangkasan dibahas di balik pintu tertutup. Nama Anda ada di meja.|昇進と人員削減が密室で議論される。あなたの名前も俎上にある。|晋升与裁员在闭门中商议，你的名字也在桌上。') },
    { th: ['growth', 'people', 'ethics'], e: '🌇', t: X('Chapter 8 · The last week|Bab 8 · Minggu terakhir|第8章 · 最後の週|第8章 · 最后一周'), s: X('The review is near. Whatever you choose now, you will have to live with it.|Evaluasi sudah dekat. Apa pun yang Anda pilih sekarang, harus Anda jalani.|評価が近い。今選ぶことは、そのまま背負うことになる。|考评临近，现在的选择你都得自己承担。') }
  ];
  CC.prologue = {
    role: {
      finance: X('You are in Finance, where every number is a promise to someone.|Anda berada di Finance, tempat setiap angka adalah janji kepada seseorang.|あなたは財務部。すべての数字は誰かへの約束だ。|你在财务部，每个数字都是对某人的承诺。'),
      it: X('You are in IT, where one small bug can stop a whole company.|Anda berada di IT, tempat satu bug kecil dapat menghentikan seluruh perusahaan.|あなたはIT部。小さなバグ1つで会社全体が止まりうる。|你在IT部，一个小漏洞就能让整家公司停摆。')
    },
    level: {
      junior: X('As a junior, you have everything to learn and little to lose, except your reputation.|Sebagai junior, Anda punya banyak hal untuk dipelajari dan sedikit yang hilang, kecuali reputasi.|新人のあなたは学ぶことだらけで、失うものは評判くらいだ。|作为新人，你要学的很多，能失去的很少，除了名声。'),
      mid: X('As a mid-level, you are squeezed from above and below, and carry both ways.|Sebagai level menengah, Anda terjepit dari atas dan bawah, dan memikul keduanya.|中堅のあなたは上下から挟まれ、両方を背負う。|作为中层，你上下受挤，两头都得扛。'),
      senior: X('As a senior, every choice sets an example. Silence is also a choice.|Sebagai senior, setiap pilihan menjadi contoh. Diam pun sebuah pilihan.|シニアのあなたの選択は、すべて手本になる。沈黙もまた選択だ。|作为资深者，每个选择都是榜样，沉默同样是选择。')
    }
  };
  CC.values = {
    integrity: { e: '⚖️', n: X('Integrity|Integritas|誠実さ|诚信'), d: X('You tell the truth and own your mistakes.|Anda jujur dan bertanggung jawab atas kesalahan.|真実を語り、ミスに責任を持つ。|说真话并为错误负责。') },
    ambition: { e: '🚀', n: X('Ambition|Ambisi|野心|进取心'), d: X('You go after results, visibility and the next step.|Anda mengejar hasil, sorotan, dan langkah berikutnya.|成果と注目、次のステップを追う。|你追求成果、曝光和下一步。') },
    loyalty: { e: '🛡️', n: X('Loyalty|Loyalitas|忠誠心|忠诚'), d: X('You protect your boss, team and the organization.|Anda melindungi atasan, tim, dan organisasi.|上司やチーム、組織を守る。|你保护上司、团队与组织。') },
    fairness: { e: '🤲', n: X('Fairness|Keadilan|公平さ|公平'), d: X('You care about people being treated well and heard.|Anda peduli agar orang diperlakukan baik dan didengar.|人が大切に扱われ、声を聞かれることを重んじる。|你在意人们被善待、被倾听。') },
    balance: { e: '🌿', n: X('Balance|Keseimbangan|バランス|平衡'), d: X('You protect your energy and a life beyond work.|Anda menjaga energi dan kehidupan di luar pekerjaan.|エネルギーと仕事以外の生活を守る。|你守护精力与工作以外的生活。') },
    learning: { e: '📚', n: X('Learning|Pembelajaran|学び|学习'), d: X('You ask, test, and improve how things are done.|Anda bertanya, menguji, dan memperbaiki cara kerja.|問い、試し、やり方を改善する。|你提问、试验并改进做事方式。') }
  };
})();
