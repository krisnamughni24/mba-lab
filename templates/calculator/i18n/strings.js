/* Texts. Every key is [en, id, ja, zh]. Add keys here, then use them with data-i18n="key" in the markup or t('key', {n: 1}) in code. */
(() => {
  const L = ['en', 'id', 'ja', 'zh'];
  const K = {
    title: ['Break-even Calculator', 'Kalkulator Titik Impas', '損益分岐点電卓', '盈亏平衡计算器'],
    back: ['← Back', '← Kembali', '← 戻る', '← 返回'], close: ['Close', 'Tutup', '閉じる', '关闭'], quest: ['Required to continue', 'Wajib dilengkapi', '続行に必要な項目', '继续前必填'],
    lockHint: ['Complete the required items to continue', 'Lengkapi semua yang wajib untuk melanjutkan', '必須項目を完了すると続行できます', '完成必填项后才能继续'],
    infoTip: ['How this part works', 'Cara kerja bagian ini', 'このパートの使い方', '本部分的使用方法'], partN: ['Part {n}', 'Bagian {n}', 'パート {n}', '第 {n} 部分'], gotIt: ['Got it', 'Mengerti', 'わかった', '知道了'],
    stp1: ['Frame', 'Kerangka', '設定', '设定'], stp2: ['Build', 'Susun', '入力', '构建'], stp3: ['Result', 'Hasil', '結果', '结果'], stp4: ['Stress-test', 'Uji tekanan', 'ストレステスト', '压力测试'],
    gh1: ['Frame the question', 'Rumuskan pertanyaan', '問いを決める', '界定问题'], gh2: ['Build the model', 'Susun model', 'モデルを作る', '构建模型'], gh3: ['The answer', 'Jawabannya', '答え', '答案'], gh4: ['Stress-test it', 'Uji tekanan', 'ストレステスト', '压力测试'],
    sub1: ['How many units must you sell to cover your costs? Pick a ready case or start blank.', 'Berapa unit yang harus terjual untuk menutup biaya? Pilih kasus siap pakai atau mulai kosong.', '費用を回収するには何個売る必要がある？用意されたケースか空白から。', '需要卖出多少件才能收回成本？选择现成案例或从空白开始。'],
    case_cafe: ['Neighbourhood café', 'Kafe lingkungan', '近所のカフェ', '社区咖啡馆'], case_shop: ['Craft shop', 'Toko kerajinan', '工芸品店', '手工艺品店'], case_blank: ['Blank', 'Kosong', '空白', '空白'],
    ck1: ['A case is chosen', 'Kasus sudah dipilih', 'ケースを選択', '已选择案例'], ck2: ['Fixed cost is 0 or more', 'Biaya tetap 0 atau lebih', '固定費が0以上', '固定成本不小于 0'], ck3: ['Price is above the variable cost', 'Harga di atas biaya variabel', '価格が変動費より高い', '价格高于可变成本'],
    fixed: ['Fixed costs per month', 'Biaya tetap per bulan', '月間固定費', '每月固定成本'], price: ['Selling price per unit', 'Harga jual per unit', '販売単価', '单位售价'], variable: ['Variable cost per unit', 'Biaya variabel per unit', '単位あたり変動費', '单位可变成本'],
    pf_margin: ['The price must be higher than the variable cost.', 'Harga harus lebih tinggi dari biaya variabel.', '価格は変動費より高くする必要があります。', '价格必须高于可变成本。'], pf_fixed: ['Fixed costs must be 0 or more.', 'Biaya tetap harus 0 atau lebih.', '固定費は0以上にしてください。', '固定成本必须不小于 0。'], pf_price: ['Enter a price above 0.', 'Masukkan harga di atas 0.', '0より大きい価格を入力。', '请输入大于 0 的价格。'], pf_variable: ['Variable cost must be 0 or more.', 'Biaya variabel harus 0 atau lebih.', '変動費は0以上にしてください。', '可变成本必须不小于 0。'],
    next1: ['Build the model →', 'Susun model →', 'モデルを作る →', '构建模型 →'], next2: ['See the answer →', 'Lihat jawabannya →', '答えを見る →', '查看答案 →'], next3: ['Stress-test →', 'Uji tekanan →', 'ストレステストへ →', '压力测试 →'], newCase: ['New case', 'Kasus baru', '新しいケース', '新案例'],
    g1a: ['Choose a ready case or Blank.', 'Pilih kasus siap pakai atau Kosong.', '用意されたケースか空白を選ぶ。', '选择现成案例或空白。'], g1b: ['The checklist on the right shows what is still needed.', 'Daftar di kanan menunjukkan apa yang masih diperlukan.', '右のチェックリストで残りを確認。', '右侧清单显示还缺什么。'],
    g2a: ['Enter the three numbers.', 'Isi tiga angka.', '3つの数字を入力。', '填写三个数字。'], g2b: ['Fix the red messages before you continue.', 'Perbaiki pesan merah sebelum lanjut.', '赤いメッセージを直してから進む。', '先修正红色提示再继续。'],
    g3a: ['This is the number of units where profit is zero.', 'Ini jumlah unit saat laba nol.', '利益がゼロになる数量です。', '这是利润为零时的销量。'], g3b: ['Above it you earn money; below it you lose.', 'Di atasnya untung; di bawahnya rugi.', 'それ以上で黒字、未満で赤字。', '高于此为盈利，低于此为亏损。'],
    g4a: ['See how the answer moves when the price changes.', 'Lihat bagaimana jawaban berubah saat harga berubah.', '価格が変わると答えがどう動くか。', '看看价格变化时答案如何变动。'], g4b: ['Download the report to share.', 'Unduh laporan untuk dibagikan.', 'レポートをダウンロードして共有。', '下载报告以便分享。'],
    resUnits: ['Break-even: {n} units a month', 'Titik impas: {n} unit per bulan', '損益分岐点：月 {n} 個', '盈亏平衡：每月 {n} 件'], resUnit: ['Each unit leaves {v} after its own cost ({m}% margin).', 'Setiap unit menyisakan {v} setelah biayanya sendiri (margin {m}%).', '1個あたり {v} が残ります（利益率 {m}%）。', '每件扣除自身成本后剩 {v}（毛利率 {m}%）。'], resRev: ['Revenue needed: {v}', 'Pendapatan yang dibutuhkan: {v}', '必要売上：{v}', '所需收入：{v}'],
    thPrice: ['Price', 'Harga', '価格', '价格'], thUnits: ['Break-even units', 'Unit impas', '損益分岐数量', '盈亏平衡销量'], none: ['no profit possible', 'tidak mungkin untung', '黒字化不可', '无法盈利'],
    conc: ['Conclusion', 'Kesimpulan', '結論', '结论'], concT: ['You need to sell {n} units a month to break even. A 10% lower price would need {m}.', 'Anda perlu menjual {n} unit per bulan untuk impas. Harga 10% lebih rendah butuh {m}.', '損益分岐には月 {n} 個必要。価格が10%下がると {m} 個。', '每月需卖 {n} 件才能保本。价格降 10% 则需 {m} 件。'],
    dl: ['Download your report', 'Unduh laporan Anda', 'レポートをダウンロード', '下载你的报告'], busy: ['Preparing…', 'Menyiapkan…', '準備中…', '准备中…'], saved: ['Saved', 'Tersimpan', '保存しました', '已保存'], fail: ['Could not create the file', 'Gagal membuat berkas', 'ファイルを作成できません', '无法生成文件'], file: ['break-even', 'titik-impas', 'break-even', 'break-even'], rTitle: ['Break-even report', 'Laporan titik impas', '損益分岐レポート', '盈亏平衡报告'],
    as1: ['Start with a ready case; you can change every number later.', 'Mulai dengan kasus siap pakai; semua angka bisa diubah nanti.', 'まずはケースを選ぼう。数字は後で変えられます。', '先选个现成案例，数字之后都能改。'], as2: ['Price only has to beat the variable cost, fixed costs are paid by the margin.', 'Harga cukup melampaui biaya variabel; biaya tetap dibayar dari margin.', '価格は変動費を超えればよく、固定費は利幅で回収。', '价格只需高于可变成本，固定成本由毛利承担。']
  };
  const strings = { en: {}, id: {}, ja: {}, zh: {} };
  Object.keys(K).forEach(k => L.forEach((l, i) => { strings[l][k] = K[k][i]; }));
  MBALAB.sims.define('my-simulation', { strings });
})();
