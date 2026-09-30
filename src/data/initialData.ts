import { VocabItem, QuizItem, GrammarRuleSummary } from '../types';

export const initialVocabList: VocabItem[] = [
  // 時間・時量
  { id: 'v1', hanzi: '分钟', pinyin: 'fēnzhōng', meaning: '～分間（時量）', category: '時間', notes: '量を数える時は「两分钟」だぞ！二分钟はアウト！' },
  { id: 'v2', hanzi: '小时', pinyin: 'xiǎoshí', meaning: '～時間（時量）', category: '時間', notes: '「2時間」は「两个小时」！「两」を使うのが鉄則！' },
  { id: 'v3', hanzi: '天', pinyin: 'tiān', meaning: '～日間（時量）', category: '時間', notes: '「两天」（2日間）。日数を数える時も「两」！' },
  { id: 'v4', hanzi: '星期', pinyin: 'xīngqī', meaning: '～週間（時量）', category: '時間', notes: '「两个星期」（2週間）。個数の个を忘れるなよ！' },
  
  // 動詞
  { id: 'v5', hanzi: '睡', pinyin: 'shuì', meaning: '寝る', category: '動詞' },
  { id: 'v6', hanzi: '放假', pinyin: 'fàng jià', meaning: '休みになる / 休暇に入る', category: '動詞', notes: '離合詞！「放几天假」みたいに間に挟むスタイル！' },
  { id: 'v7', hanzi: '走', pinyin: 'zǒu', meaning: '歩く / 行く', category: '動詞' },
  { id: 'v8', hanzi: '写', pinyin: 'xiě', meaning: '書く', category: '動詞' },
  { id: 'v9', hanzi: '找', pinyin: 'zhǎo', meaning: '探す / おつりを出す', category: '動詞', notes: '「找到」で探して見つかった！結果補語！' },
  { id: 'v10', hanzi: '听', pinyin: 'tīng', meaning: '聞く', category: '動詞' },
  { id: 'v11', hanzi: '洗', pinyin: 'xǐ', meaning: '洗う', category: '動詞' },
  { id: 'v12', hanzi: '拐', pinyin: 'guǎi', meaning: '曲がる', category: '動詞' },

  // 名詞
  { id: 'v13', hanzi: '春节', pinyin: 'Chūnjié', meaning: '春節（旧正月）', category: '名詞' },
  { id: 'v14', hanzi: '课', pinyin: 'kè', meaning: '授業 / 課', category: '名詞' },
  { id: 'v15', hanzi: '飞机', pinyin: 'fēijī', meaning: '飛行機', category: '名詞' },
  { id: 'v16', hanzi: '报告', pinyin: 'bàogào', meaning: 'レポート / 報告', category: '名詞' },
  { id: 'v17', hanzi: '钱包', pinyin: 'qiánbāo', meaning: '財布', category: '名詞' },
  { id: 'v18', hanzi: '冰箱', pinyin: 'bīngxiāng', meaning: '冷蔵庫', category: '名詞' },
  { id: 'v19', hanzi: '窗户', pinyin: 'chuānghu', meaning: '窓', category: '名詞' },
  
  // 前置詞・副詞・接続詞・形容詞
  { id: 'v20', hanzi: '从', pinyin: 'cóng', meaning: '～から（起点）', category: '前置詞', notes: '从A到Bで脳死暗記！' },
  { id: 'v21', hanzi: '到', pinyin: 'dào', meaning: '～まで（到達点） / 到着する', category: '前置詞' },
  { id: 'v22', hanzi: '离', pinyin: 'lí', meaning: '～から（二点間の隔たり）', category: '前置詞', notes: 'A离B远/近！「から」だけど从じゃないぞ！' },
  { id: 'v23', hanzi: '多长', pinyin: 'duō cháng', meaning: 'どれくらいの長さ（時間・距離）', category: '形容詞', notes: '多长时间で時間の長さを聞く！' },
  { id: 'v24', hanzi: '左右', pinyin: 'zuǒyòu', meaning: '～ぐらい / 前後', category: '副詞', notes: '数詞+量詞+左右 (例: 两个半小时左右)' },
  { id: 'v25', hanzi: '远', pinyin: 'yuǎn', meaning: '遠い', category: '形容詞' },
  { id: 'v26', hanzi: '近', pinyin: 'jìn', meaning: '近い', category: '形容詞' },
  { id: 'v27', hanzi: '还', pinyin: 'hái', meaning: 'まだ / さらに', category: '副詞', notes: '还没~ (まだ～していない)' },
  
  // 会話・読トレ
  { id: 'v28', hanzi: '过路人', pinyin: 'guòlùrén', meaning: '通行人', category: '会話・読トレ' },
  { id: 'v29', hanzi: '请问', pinyin: 'qǐngwèn', meaning: 'お尋ねします / すみません', category: '会話・読トレ' },
  { id: 'v30', hanzi: '附近', pinyin: 'fùjìn', meaning: '付近 / 近く', category: '会話・読トレ' },
  { id: 'v31', hanzi: '意大利', pinyin: 'Yìdàlì', meaning: 'イタリア', category: '会話・読トレ' },
  { id: 'v32', hanzi: '餐厅', pinyin: 'cāntīng', meaning: 'レストラン / 食堂', category: '会話・読トレ' },
  { id: 'v33', hanzi: '地铁站', pinyin: 'dìtiězhàn', meaning: '地下鉄の駅', category: '会話・読トレ' },
  { id: 'v34', hanzi: '不太', pinyin: 'bú tài', meaning: 'あまり～でない', category: '会話・読トレ' },
  { id: 'v35', hanzi: '走着', pinyin: 'zǒuzhe', meaning: '歩いて / 徒歩で', category: '会話・読トレ' },
  { id: 'v36', hanzi: '怎么', pinyin: 'zěnme', meaning: 'どのように / どうやって', category: '会話・読トレ' },
  { id: 'v37', hanzi: '红绿灯', pinyin: 'hónglǜdēng', meaning: '信号機', category: '会話・読トレ' },
  { id: 'v38', hanzi: '往', pinyin: 'wǎng', meaning: '～のほうへ / ～に向かって', category: '前置詞' },
  
  // 手書き書き込み補足
  { id: 'v39', hanzi: '脚', pinyin: 'jiǎo', meaning: '足 / 脚', category: '手書き・補足', notes: '教科書p.91の手書き書き込み！テストに出るぞ！' },
];

export const grammarSummaries: GrammarRuleSummary[] = [
  {
    id: 'g-rule-1',
    title: '🔥 【最重要】時点 (Time Point) と 時量 (Time Span) の神公式',
    formula: '主語 S + [時点] + 動詞 V + [時量] + 目的語 O',
    description: '語順バグり回避！「いつ（時点）」は動詞の前！「どれくらい（時量）」は動詞の後！これだけで単位確定！',
    examples: [
      { cn: '我每天睡七个小时。', pinyin: 'Wǒ měitiān shuì qī ge xiǎoshí.', jp: '私は毎日7時間寝ます。（毎日は時点、7時間は時量）' },
      { cn: '我星期六学中文。', pinyin: 'Wǒ xīngqīliù xué Zhōngwén.', jp: '私は土曜日に中国語を勉強します。（手書きプリント直伝！）' },
      { cn: '今年春节放几天假？', pinyin: 'Jīnnián Chūnjié fàng jǐ tiān jià?', jp: '今年の春節は何日間休み？' }
    ],
    tips: [
      '⚡️ 「2」の区別で脳汁を出せ:',
      '・時点（時刻・日付）: 两点 (2時), 二分 (2分), 星期二 (火曜日)',
      '・時量（長さ・量）: 两个小时 (2時間), 两分钟 (2分間), 两天 (2日間)'
    ]
  },
  {
    id: 'g-rule-2',
    title: '🚀 前置詞 “从・到・离” 構文',
    formula: '“从” A “到” B + 動詞 / A “离” B + 远/近',
    description: '“从”は〜から、“到”は〜まで、“离”は距離の離れ（〜から）！「家离大学很远」で即回答！',
    examples: [
      { cn: '从星期一到星期五都有课。', pinyin: 'Cóng xīngqīyī dào xīngqīwǔ dōu yǒu kè.', jp: '月曜から金曜まで授業あり！' },
      { cn: '到北京坐飞机要两个半小时左右。', pinyin: 'Dào Běijīng zuò fēijī yào liǎng ge bàn xiǎoshí zuǒyòu.', jp: '北京まで飛行機で2時間半ぐらい！' },
      { cn: '我家离大学很远。', pinyin: 'Wǒ jiā lí dàxué hěn yuǎn.', jp: '家は大学から遠い！' }
    ],
    tips: [
      '「どれくらいの長さ？」は “多长时间” !',
      '「〜ぐらい」は “左右” を数量の後ろに置くだけ！'
    ]
  },
  {
    id: 'g-rule-3',
    title: '👑 結果補語（動詞 + 完 / 到 / 懂 / 累）',
    formula: '動詞 + 結果補語 (完, 到, 见, 懂, 好, 累)',
    description: '動作の結果を表す神構文！否定は “没” を置くだけ（例: 还没找到 = まだ見つかってない）！',
    examples: [
      { cn: '我写完报告了。', pinyin: 'Wǒ xiěwán bàogào le.', jp: 'レポート書き終わった！（完）' },
      { cn: '还没找到钱包。', pinyin: 'Hái méi zhǎodào qiánbāo.', jp: 'まだ財布見つからん！（到）' },
      { cn: '听懂 / 看完', pinyin: 'tīngdǒng / kànwán', jp: '聞いて理解する / 読み終わる' }
    ],
    tips: [
      '・完: 終わる (写完, 看完)',
      '・到: ゲット・目標達成 (找到, 买到)',
      '・懂: 完全理解 (听懂, 看懂)'
    ]
  }
];

export const initialQuizList: QuizItem[] = [
  // 時点 vs 時量
  {
    id: 'q1',
    title: '時点と時量の神語順',
    type: 'multiple_choice',
    category: '時点vs時量',
    question: '「私は毎日7時間寝ます」の神中国語を選べ！',
    promptJp: '🔥 ポイント: 「毎日(時点)」は動詞の前！「7時間(時量)」は動詞の後！',
    options: [
      '我每天睡七个小时。',
      '我七个小时睡每天。',
      '我睡七个小时每天。',
      '每天七个小时我睡。'
    ],
    correctAnswerIndex: 0,
    explanation: '【脳汁正解】主語 + 時点(毎日) + 動詞(睡) + 時量(7時間)！この語順で単位回収確定！',
    grammarNote: '主語 + [時点] + 動詞 + [時量]'
  },
  {
    id: 'q2',
    title: '「2」の使い分けコンボ (1)',
    type: 'multiple_choice',
    category: '二vs两',
    question: '「2時間」と言いたい時の正しい表現はどれ？',
    promptJp: '⚡️ 時間の「長さ（量）」を数える場合だぞ！',
    options: [
      '二个小时',
      '两个小时',
      '二小时',
      '两小时个'
    ],
    correctAnswerIndex: 1,
    explanation: '【神回答】時量（長さ）を数える時は「两」を使う！「两个小时」で脳汁噴出！',
    grammarNote: '時量（量）は「两」を使用！'
  },
  {
    id: 'q3',
    title: '「2」の使い分けコンボ (2)',
    type: 'multiple_choice',
    category: '二vs两',
    question: '「2時」と言いたい時の正しい表現はどれ？',
    promptJp: '⚡️ 時刻（時点）を表す時だ！',
    options: [
      '二点',
      '两点',
      '两个点',
      '二个点'
    ],
    correctAnswerIndex: 1,
    explanation: '【正解】2時は例外的に「两点」！ちなみに「2分」は「二分」だが「2分間」は「两分钟」だぞ！',
    grammarNote: '2時は例外「两点」！'
  },
  {
    id: 'q4',
    title: '瞬殺！並べ替え問題 (時点と時量)',
    type: 'reorder',
    category: '時点vs時量',
    question: '「毎週火曜日3時間半アルバイトをする」に並べ替えろ！',
    promptJp: '🔥 教科書 p.92 確認問題 1-1 より！',
    tokens: ['每周二', '打工', '三个半小时', '我'],
    correctReorder: ['我', '每周二', '打工', '三个半小时'],
    explanation: '【天才】「我(S) + 每周二(時点) + 打工(V) + 三个半小时(時量)」の神語順！',
    grammarNote: 'S + 時点 + V + 時量'
  },
  {
    id: 'q5',
    title: '瞬殺！疑問文並べ替え',
    type: 'reorder',
    category: '時点vs時量',
    question: '「あなたは何時間中国語を勉強しますか」に並べ替えろ！',
    promptJp: '🔥 教科書 p.92 確認問題 1-2 より！',
    tokens: ['你', '几个小时', '学', '中文'],
    correctReorder: ['你', '学', '几个小时', '中文'],
    explanation: '【単位確定】「你 + 学(V) + 几个小时(時量) + 中文(O)」のパーフェクト順！',
    grammarNote: 'S + V + 時量 + O'
  },

  // 从・到・离
  {
    id: 'q6',
    title: '前置詞バトル “从・到”',
    type: 'multiple_choice',
    category: '从・到・离',
    question: '「月曜日から金曜日まで授業があります」に入るペアは？\n（ ）星期一（ ）星期五都有课。',
    promptJp: '🚀 起点〜到達点の神コンボ！',
    options: [
      '从 ... 到',
      '离 ... 到',
      '到 ... 从',
      '从 ... 离'
    ],
    correctAnswerIndex: 0,
    explanation: '【神判定】〜から〜までは「从 A 到 B」！これ以外の選択肢はあり得ん！',
    grammarNote: '从 + A + 到 + B'
  },
  {
    id: 'q7',
    title: '前置詞バトル “离”',
    type: 'multiple_choice',
    category: '从・到・离',
    question: '「私の家は大学からとても遠いです」に入る単語は？\n我家（ ）大学很远。',
    promptJp: '⚡️ 距離の離れ（〜から）を表す前置詞！',
    options: [
      '离',
      '从',
      '到',
      '往'
    ],
    correctAnswerIndex: 0,
    explanation: '【脳汁全開】2点間の距離は “离”！「A 离 B 远/近」！从を選んだ奴は出直し！',
    grammarNote: 'A 离 B 远/近'
  },
  {
    id: 'q8',
    title: '神速！並べ替え (从・到)',
    type: 'reorder',
    category: '从・到・离',
    question: '「家から大学まで1時間余りかかります」に並べ替えろ！',
    promptJp: '🔥 教科書 p.92 確認問題 2-1！',
    tokens: ['从', '家', '到', '大学', '要', '一个多小时'],
    correctReorder: ['从', '家', '到', '大学', '要', '一个多小时'],
    explanation: '【圧倒的成長】从家到大学(家から大学まで) + 要(かかる) + 一个多小时(1時間余り)！',
    grammarNote: '从 A 到 B + 動詞 + 時量'
  },
  {
    id: 'q9',
    title: '神速！並べ替え (离)',
    type: 'reorder',
    category: '从・到・离',
    question: '「ここは駅からとても近いです」に並べ替えろ！',
    promptJp: '🔥 教科書 p.92 確認問題 2-2！',
    tokens: ['这儿', '离', '车站', '很', '近'],
    correctReorder: ['这儿', '离', '车站', '很', '近'],
    explanation: '【完璧】「这儿(A) + 离 + 车站(B) + 很近」！距離文のテンプレ！',
    grammarNote: 'A 离 B 很近'
  },

  // 結果補語
  {
    id: 'q10',
    title: '結果補語フィーバー (完)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「私はレポートを書き終えました」に入る結果補語は？\n我写（ ）报告了。',
    promptJp: '🎉 「～し終わる」を表す動作完了補語！',
    options: [
      '完',
      '到',
      '懂',
      '好'
    ],
    correctAnswerIndex: 0,
    explanation: '【脳汁ドバドバ】終わる補語は「完 (wán)」！「写完」で書き終わり！',
    grammarNote: '動詞 + 完'
  },
  {
    id: 'q11',
    title: '結果補語否定コンボ',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「まだ財布が見つかっていません」の正解文を選べ！',
    promptJp: '⚡️ 結果補語の否定は「没」一択！',
    options: [
      '还没找到钱包。',
      '不找到钱包。',
      '没找不钱包。',
      '钱包找到不。'
    ],
    correctAnswerIndex: 0,
    explanation: '【神回答】「还没 + 動詞 + 補語 (到)」！まだ〜してないの黄金パターン！',
    grammarNote: '还没 + 動詞 + 結果補語'
  },
  {
    id: 'q12',
    title: '結果補語 (听懂)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「聞いて理解する / 分かる」を表す中国語はどれ？',
    promptJp: '🔥 教科書 p.93 確認問題 3 より！',
    options: [
      '听懂',
      '看完',
      '吃累',
      '买到'
    ],
    correctAnswerIndex: 0,
    explanation: '【天元突破】听(聞く) + 懂(理解する) = 「听懂」！単位回収決定！',
    grammarNote: '听懂 = 聞いて理解する'
  },
  {
    id: 'q13',
    title: '結果補語 (买到)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「買って手に入れる / 買えた！」を表す中国語は？',
    promptJp: '🎉 目的達成の神補語「到」！',
    options: [
      '买到',
      '买完',
      '买懂',
      '买好'
    ],
    correctAnswerIndex: 0,
    explanation: '【神回答】「买到 (mǎidào)」！無事GETできた時の最高の表現！',
    grammarNote: '動詞 + 到 = 目的達成'
  }
];
