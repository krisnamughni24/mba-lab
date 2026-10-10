/* "Share an idea" form content: texts, fields (required / minimum length) and the submission types.
   `value` of a type is what is sent to you (keep it English); `label` is what the visitor sees. */
MBALAB.data.ideaForm = {
  "title": {
    "en": "Share an idea",
    "id": "Bagikan ide",
    "ja": "アイデアを共有",
    "zh": "分享想法"
  },
  "intro": {
    "en": "Help shape the future of MBA Lab. Share your ideas for new features, simulation topics, learning experiences, or potential collaborations.",
    "id": "Bantu membentuk masa depan MBA Lab. Bagikan ide Anda untuk fitur baru, topik simulasi, pengalaman belajar, atau potensi kolaborasi.",
    "ja": "MBA Labの未来づくりにご協力ください。新機能、シミュレーションのテーマ、学習体験、コラボレーションなどのアイデアをお寄せください。",
    "zh": "帮助塑造 MBA Lab 的未来。欢迎分享新功能、模拟主题、学习体验或合作的想法。"
  },
  "privacyTitle": {
    "en": "Privacy notice",
    "id": "Pemberitahuan privasi",
    "ja": "プライバシーに関するお知らせ",
    "zh": "隐私声明"
  },
  "privacy": {
    "en": "Your information will only be used to review your submission and contact you about it when necessary.",
    "id": "Informasi Anda hanya akan digunakan untuk meninjau kiriman Anda dan menghubungi Anda terkait kiriman tersebut bila diperlukan.",
    "ja": "お預かりした情報は、投稿内容の確認および必要な場合の連絡にのみ使用します。",
    "zh": "您的信息仅用于审核您的提交内容，并在必要时就此与您联系。"
  },
  "submit": {
    "en": "Submit idea →",
    "id": "Kirim ide →",
    "ja": "アイデアを送信 →",
    "zh": "提交想法 →"
  },
  "selectPlaceholder": {
    "en": "Select a category…",
    "id": "Pilih kategori…",
    "ja": "カテゴリーを選択…",
    "zh": "选择类别…"
  },
  "fields": {
    "name": {
      "label": {
        "en": "Full name (optional)",
        "id": "Nama lengkap (opsional)",
        "ja": "氏名（任意）",
        "zh": "姓名（选填）"
      },
      "required": false
    },
    "email": {
      "label": {
        "en": "Email address",
        "id": "Alamat email",
        "ja": "メールアドレス",
        "zh": "电子邮箱"
      },
      "required": true
    },
    "type": {
      "label": {
        "en": "Submission type",
        "id": "Jenis kiriman",
        "ja": "送信の種類",
        "zh": "提交类型"
      },
      "required": true
    },
    "subject": {
      "label": {
        "en": "Subject",
        "id": "Subjek",
        "ja": "件名",
        "zh": "主题"
      },
      "required": true,
      "min": 3
    },
    "message": {
      "label": {
        "en": "Message",
        "id": "Pesan",
        "ja": "メッセージ",
        "zh": "留言"
      },
      "required": true,
      "min": 10
    }
  },
  "types": [
    {
      "value": "Feature Idea",
      "label": {
        "en": "Feature idea",
        "id": "Ide fitur",
        "ja": "機能のアイデア",
        "zh": "功能创意"
      }
    },
    {
      "value": "New Simulation Topic",
      "label": {
        "en": "New simulation topic",
        "id": "Topik simulasi baru",
        "ja": "新しいシミュレーションのテーマ",
        "zh": "新的模拟主题"
      }
    },
    {
      "value": "Content or Learning Framework",
      "label": {
        "en": "Content or learning framework",
        "id": "Konten atau kerangka belajar",
        "ja": "コンテンツまたは学習フレームワーク",
        "zh": "内容或学习框架"
      }
    },
    {
      "value": "Technical Collaboration",
      "label": {
        "en": "Technical collaboration",
        "id": "Kolaborasi teknis",
        "ja": "技術面での協力",
        "zh": "技术合作"
      }
    },
    {
      "value": "Academic Collaboration",
      "label": {
        "en": "Academic collaboration",
        "id": "Kolaborasi akademik",
        "ja": "学術面での協力",
        "zh": "学术合作"
      }
    },
    {
      "value": "Other",
      "label": {
        "en": "Other",
        "id": "Lainnya",
        "ja": "その他",
        "zh": "其他"
      }
    }
  ]
};
