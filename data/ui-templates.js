/* The five official UI/UX templates ("patokan"). Every live simulation declares one of them in data/simulations.js (field "template"),
   and tests/structure.js enforces the contract below: the template's kit stylesheets must be loaded by sim.js and its required
   classes must appear in ui/template.js. A working starter for each lives in templates/<id>/ (copy it to simulations/<your-id>/).
   Full description: docs/UI-TEMPLATES.md. This file is data only (read by the tests and the docs), the site does not load it.

   root      class on the outermost element of the simulation's markup
   kits      stylesheets (relative to the repo) that sim.js must list in "styles", in this order
   required  classes that ui/template.js must contain (the skeleton of the template)
   starter   folder with the copy-and-edit starter */
MBALAB.data.templates = [
  {
    id: 'game',
    name: { en: 'Game', id: 'Game', ja: 'ゲーム', zh: '游戏' },
    summary: { en: 'Levels, ranks, stars and badges around a decision you can see on a stage.', id: 'Level, peringkat, bintang, dan lencana di sekitar keputusan yang terlihat di panggung.', ja: 'レベル・ランク・星・バッジで、ステージ上の意思決定を遊ぶ。', zh: '以关卡、等级、星星和徽章，围绕舞台上可见的决策展开。' },
    flow: 'menu (hero + rank, levels, badges) > level (hud, steps, stage + say, panel) > result (stars, XP, badges)',
    root: 'sk-root',
    kits: ['shared/simkit.css'],
    required: ['sg-root', 'sg-menu', 'sg-level', 'sg-hud', 'sg-steps', 'sg-cols', 'sg-left', 'sg-stage', 'sg-say', 'sg-panel'],
    starter: 'templates/game'
  },
  {
    id: 'scenario',
    name: { en: 'Scenario', id: 'Skenario', ja: 'シナリオ', zh: '情景' },
    summary: { en: 'Pick a scenario, then play it round by round on a stage with a guide pop-up.', id: 'Pilih skenario, lalu mainkan ronde demi ronde di panggung dengan panduan pop-up.', ja: 'シナリオを選び、ガイド付きのステージで1ラウンドずつ進める。', zh: '选择情景，在带指南弹窗的舞台上逐轮进行。' },
    flow: 'select (title, sub, cards, how-to) > play (hud chips, stage + info + guide, controls) > result (stars, actions)',
    root: 'sk-root',
    kits: ['shared/simkit.css', 'shared/scenario.css'],
    required: ['sc-select', 'sc-play', 'sc-hud', 'sc-stage', 'sc-how'],
    starter: 'templates/scenario'
  },
  {
    id: 'explorer',
    name: { en: 'Explorer', id: 'Penjelajah', ja: 'エクスプローラー', zh: '探索器' },
    summary: { en: 'Browse a set of things on a map or list, read a card for each, then quiz yourself.', id: 'Jelajahi sekumpulan hal di peta atau daftar, baca kartunya, lalu uji diri lewat kuis.', ja: '地図や一覧で項目を巡り、カードを読み、クイズで確認する。', zh: '在地图或列表中浏览条目，阅读卡片，再用测验自测。' },
    flow: 'header mode switch (explore / quiz) > bar (progress, filter chips) > stage + detail card > quiz box > list',
    root: 'sk-root',
    kits: ['shared/simkit.css', 'shared/explorer.css'],
    required: ['ex-modes', 'ex-wrap', 'ex-bar', 'ex-sw', 'ex-stage', 'ex-box', 'ex-list'],
    starter: 'templates/explorer'
  },
  {
    id: 'calculator',
    name: { en: 'Calculator', id: 'Kalkulator', ja: '電卓', zh: '计算器' },
    summary: { en: 'Four guided parts to compute something for your own case, ending in a downloadable report.', id: 'Empat bagian terpandu untuk menghitung kasus Anda sendiri, diakhiri laporan yang bisa diunduh.', ja: '自分のケースを計算する4つのガイド付きパート。最後にレポートをダウンロード。', zh: '四个引导式部分，计算你自己的案例，并可下载报告。' },
    flow: 'Part 1 Frame > Part 2 Build (required checklist gates the next part) > Part 3 Result > Part 4 Stress-test + download',
    root: 'sd',
    kits: ['shared/studio.css'],
    required: ['sd-top', 'sd-steps', 'sd-stage', 'sd-toasts'],
    starter: 'templates/calculator'
  },
  {
    id: 'exam',
    name: { en: 'Exam', id: 'Ujian', ja: '試験', zh: '考试' },
    summary: { en: 'A timed or practice question set with a navigator, flags, a result and a full review.', id: 'Kumpulan soal berwaktu atau latihan dengan navigator, penanda, hasil, dan tinjauan lengkap.', ja: '時間制限または練習形式の問題セット。ナビ・フラグ・結果・見直し付き。', zh: '限时或练习的题目集，含导航、标记、成绩与完整回顾。' },
    flow: 'setup (mode, options) > exam (hud, question card, navigator) > confirm modal > result (score ring, per-topic bars, review)',
    root: 'sk-root',
    kits: ['shared/simkit.css', 'shared/exam.css'],
    required: ['xm-setup', 'xm-exam', 'xm-result', 'xm-modal'],
    starter: 'templates/exam'
  }
];
