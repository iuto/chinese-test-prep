import { VocabItem, QuizItem, GrammarRuleSummary } from '../types';

export const initialVocabList: VocabItem[] = [
  // 時間・時量
  { id: 'v1', hanzi: '分钟', pinyin: 'fēnzhōng', meaning: '～分間（時量）', category: '時間', notes: '量を数える時は「两分钟」' },
  { id: 'v2', hanzi: '小时', pinyin: 'xiǎoshí', meaning: '～時間（時量）', category: '時間', notes: '量を数える時は「两个小时」' },
  { id: 'v3', hanzi: '天', pinyin: 'tiān', meaning: '～日間（時量）', category: '時間', notes: '「两天」（2日間）' },
  { id: 'v4', hanzi: '星期', pinyin: 'xīngqī', meaning: '～週間（時量）', category: '時間', notes: '「两个星期」（2週間）' },
  
  // 動詞
  { id: 'v5', hanzi: '睡', pinyin: 'shuì', meaning: '寝る', category: '動詞' },
  { id: 'v6', hanzi: '放假', pinyin: 'fàng jià', meaning: '休みになる / 休暇に入る', category: '動詞', notes: '離合詞 (放几天假)' },
  { id: 'v7', hanzi: '走', pinyin: 'zǒu', meaning: '歩く / 行く', category: '動詞' },
  { id: 'v8', hanzi: '写', pinyin: 'xiě', meaning: '書く', category: '動詞' },
  { id: 'v9', hanzi: '找', pinyin: 'zhǎo', meaning: '探す / おつりを出す', category: '動詞' },
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
  { id: 'v20', hanzi: '从', pinyin: 'cóng', meaning: '～から（起点）', category: '前置詞', notes: '从A到B' },
  { id: 'v21', hanzi: '到', pinyin: 'dào', meaning: '～まで（到達点） / 到着する', category: '前置詞' },
  { id: 'v22', hanzi: '离', pinyin: 'lí', meaning: '～から（二点間の隔たり）', category: '前置詞', notes: 'A离B远/近' },
  { id: 'v23', hanzi: '多长', pinyin: 'duō cháng', meaning: 'どれくらいの長さ（時間・距離）', category: '形容詞', notes: '多长时间' },
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
  { id: 'v39', hanzi: '脚', pinyin: 'jiǎo', meaning: '足 / 脚', category: '手書き・補足', notes: '教科書p.91に手書きメモあり' },
];

export const grammarSummaries: GrammarRuleSummary[] = [
  {
    id: 'g-rule-1',
    title: '① 時点 (Time Point) と 時量 (Time Span) の語順',
    formula: '主語 + [時点] + 動詞 + [時量] + 目的語',
    description: '中国語では「いつ（時点）」は動詞の前、「どのくらい（時量）」は動詞の後に置きます。',
    examples: [
      { cn: '我每天睡七个小时。', pinyin: 'Wǒ měitiān shuì qī ge xiǎoshí.', jp: '私は毎日7時間寝ます。（毎日は時点、7時間は時量）' },
      { cn: '我星期六学中文。', pinyin: 'Wǒ xīngqīliù xué Zhōngwén.', jp: '私は土曜日に中国語を勉強します。（土曜日は時点）' },
      { cn: '今年春节放几天假？', pinyin: 'Jīnnián Chūnjié fàng jǐ tiān jià?', jp: '今年の春節は何日間休みになりますか？' }
    ],
    tips: [
      '「2」の表し方:',
      '・時点（順番・時刻・日付等）: 两点 (2時), 二分 (2分), 星期二 (火曜日), 二月 (2月)',
      '・時量（長さ・量）: 两个小时 (2時間), 两分钟 (2分間), 两天 (2日間), 两个星期 (2週間)'
    ]
  },
  {
    id: 'g-rule-2',
    title: '② 前置詞 “从・到・离”',
    formula: '“从” A “到” B + 動詞 / A “离” B + 远/近',
    description: '“从”は起点（〜から）、“到”は到達点（〜まで）、“离”は2点間の隔たり（〜から）を表します。',
    examples: [
      { cn: '从星期一到星期五都有课。', pinyin: 'Cóng xīngqīyī dào xīngqīwǔ dōu yǒu kè.', jp: '月曜日から金曜日まで授業があります。' },
      { cn: '到北京坐飞机要两个半小时左右。', pinyin: 'Dào Běijīng zuò fēijī yào liǎng ge bàn xiǎoshí zuǒyòu.', jp: '北京まで飛行機で2時間半ぐらいかかります。' },
      { cn: '我家离大学很远。', pinyin: 'Wǒ jiā lí dàxué hěn yuǎn.', jp: '私の家は大学からとても遠いです。' }
    ],
    tips: [
      '「どれくらいの長さ」と尋ねる時は “多长时间” (duō cháng shíjiān) を使います。',
      '「〜ぐらい」を表す “左右” (zuǒyòu) は数量の後ろに置きます。'
    ]
  },
  {
    id: 'g-rule-3',
    title: '③ 結果補語 (Resultative Complements)',
    formula: '動詞 + 結果補語 (完, 到, 见, 懂, 好, 累, 干净, 清楚)',
    description: '動作を行った結果（終わった、見つかった、理解できた等）を表します。否定は “没” を動詞の前に置きます。',
    examples: [
      { cn: '我写完报告了。', pinyin: 'Wǒ xiěwán bàogào le.', jp: '私はレポートを書き終わりました。' },
      { cn: '还没找到钱包。', pinyin: 'Hái méi zhǎodào qiánbāo.', jp: 'まだ財布が見つかっていません。' },
      { cn: '看懂 / 听懂', pinyin: 'kàndǒng / tīngdǒng', jp: '見て理解する / 聞いて理解する' }
    ],
    tips: [
      'よく使われる結果補語:',
      '・完 (wán): 終わる (写完, 看完, 吃完)',
      '・到 (dào): 目的達成・到達 (找到, 买到, 收到)',
      '・懂 (dǒng): 理解する (看懂, 听懂)',
      '・累 (lèi): 疲れる (走累)'
    ]
  }
];

export const initialQuizList: QuizItem[] = [
  // 時点 vs 時量
  {
    id: 'q1',
    title: '時点と時量の位置',
    type: 'multiple_choice',
    category: '時点vs時量',
    question: '「私は毎日7時間寝ます」の正しい中国語文を選んでください。',
    promptJp: 'ポイント: 「毎日(時点)」は動詞の前、「7時間(時量)」は動詞の後！',
    options: [
      '我每天睡七个小时。',
      '我七个小时睡每天。',
      '我睡七个小时每天。',
      '每天七个小时我睡。'
    ],
    correctAnswerIndex: 0,
    explanation: '中国語の基本語順は「主語 + 時点 + 動詞 + 時量」です。每天(時点)は睡の前、七个小时(時量)は睡の後に置きます。',
    grammarNote: '主語 + [時点] + 動詞 + [時量]'
  },
  {
    id: 'q2',
    title: '「2」の言い分け (1)',
    type: 'multiple_choice',
    category: '二vs两',
    question: '「2時間」と言いたい時の正しい中国語はどれですか？',
    promptJp: '「時間の長さ（時量）」を数える場合です。',
    options: [
      '二个小时',
      '两个小时',
      '二小时',
      '两小时个'
    ],
    correctAnswerIndex: 1,
    explanation: '時量（時間の長さ）を数える時は「两」を使い、量詞「个」をつけて「两个小时」と言います。',
    grammarNote: '時量（量）は「两」を使用する'
  },
  {
    id: 'q3',
    title: '「2」の言い分け (2)',
    type: 'multiple_choice',
    category: '二vs两',
    question: '「2時」と言いたい時の正しい中国語はどれですか？',
    promptJp: '「時刻（時点）」を表す場合です。',
    options: [
      '二点',
      '两点',
      '两个点',
      '二个点'
    ],
    correctAnswerIndex: 1,
    explanation: '「2時」の時刻（時点）は例外的に「两点」と言います（※分の場合、「2分」は「二分」、「2分間」は「两分钟」となります）。',
    grammarNote: '2時は「两点」'
  },
  {
    id: 'q4',
    title: '語順並べ替え問題 (時点と時量)',
    type: 'reorder',
    category: '時点vs時量',
    question: '「毎週火曜日3時間半アルバイトをする」になるように並べ替えてください。',
    promptJp: '教科書 p.92 確認してみよう！ 1-1 より',
    tokens: ['每周二', '打工', '三个半小时', '我'],
    correctReorder: ['我', '每周二', '打工', '三个半小时'],
    explanation: '「我(主語) + 每周二(時点) + 打工(動詞) + 三个半小时(時量)」の順になります。',
    grammarNote: 'S + 時点 + V + 時量'
  },
  {
    id: 'q5',
    title: '疑問文の語順',
    type: 'reorder',
    category: '時点vs時量',
    question: '「あなたは何時間中国語を勉強しますか」になるように並べ替えてください。',
    promptJp: '教科書 p.92 確認してみよう！ 1-2 より',
    tokens: ['你', '几个小时', '学', '中文'],
    correctReorder: ['你', '学', '几个小时', '中文'],
    explanation: '「你 + 学 + 几个小时 + 中文」または「你 几个小时 学 中文」ですが、通常「学 + [時量] + [目的語]」となり、「你学几个小时中文？」が正解です。',
    grammarNote: 'S + V + 時量 + O'
  },

  // 从・到・离
  {
    id: 'q6',
    title: '前置詞 “从・到” の使い分け',
    type: 'multiple_choice',
    category: '从・到・离',
    question: '「月曜日から金曜日まで授業があります」の（ ）に入る語の組み合わせは？\n（ ）星期一（ ）星期五都有课。',
    promptJp: '起点〜到達点を表す前置詞対です。',
    options: [
      '从 ... 到',
      '离 ... 到',
      '到 ... 从',
      '从 ... 离'
    ],
    correctAnswerIndex: 0,
    explanation: '「〜から〜まで」は「从 A 到 B」を使用します。',
    grammarNote: '从 + A + 到 + B'
  },
  {
    id: 'q7',
    title: '前置詞 “离” の使い分け',
    type: 'multiple_choice',
    category: '从・到・离',
    question: '「私の家は大学からとても遠いです」の（ ）に入る適切な語は？\n我家（ ）大学很远。',
    promptJp: '二点間の距離・隔たりを表す前置詞です。',
    options: [
      '离',
      '从',
      '到',
      '往'
    ],
    correctAnswerIndex: 0,
    explanation: '2点間の距離の隔たり（〜から）を表すときは “离” を使います。「A 离 B 远/近」。',
    grammarNote: 'A 离 B 远/近'
  },
  {
    id: 'q8',
    title: '語順並べ替え問題 (从・到)',
    type: 'reorder',
    category: '从・到・离',
    question: '「家から大学まで1時間余りかかります」になるように並べ替えてください。',
    promptJp: '教科書 p.92 確認してみよう！ 2-1 より',
    tokens: ['从', '家', '到', '大学', '要', '一个多小时'],
    correctReorder: ['从', '家', '到', '大学', '要', '一个多小时'],
    explanation: '「从家到大学（家から大学まで）+ 要（〜かかる）+ 一个多小时（1時間余り）」となります。',
    grammarNote: '从 A 到 B + 動詞 + 時量'
  },
  {
    id: 'q9',
    title: '語順並べ替え問題 (离)',
    type: 'reorder',
    category: '从・到・离',
    question: '「ここは駅からとても近いです」になるように並べ替えてください。',
    promptJp: '教科書 p.92 確認してみよう！ 2-2 より',
    tokens: ['这儿', '离', '车站', '很', '近'],
    correctReorder: ['这儿', '离', '车站', '很', '近'],
    explanation: '「这儿（A）+ 离 + 车站（B）+ 很近（距離形容詞）」の語順になります。',
    grammarNote: 'A 离 B 很近'
  },

  // 結果補語
  {
    id: 'q10',
    title: '結果補語 (完)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「私はレポートを書き終えました」の（ ）に入る適切な結果補語は？\n我写（ ）报告了。',
    promptJp: '「～し終わる」を表す結果補語です。',
    options: [
      '完',
      '到',
      '懂',
      '好'
    ],
    correctAnswerIndex: 0,
    explanation: '動作が完了・終了したことを表す結果補語は「完 (wán)」です。「写完」で「書き終わる」。',
    grammarNote: '動詞 + 完'
  },
  {
    id: 'q11',
    title: '結果補語の否定文',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「まだ財布が見つかっていません」の正しい中国語文を選んでください。',
    promptJp: '結果補語の否定は「没」を使います。',
    options: [
      '还没找到钱包。',
      '不找到钱包。',
      '没找不钱包。',
      '钱包找到不。'
    ],
    correctAnswerIndex: 0,
    explanation: '結果補語の否定文は「没(有) + 動詞 + 結果補語」です。「まだ〜ない」は「还没 + 動詞 + 補語」となります。',
    grammarNote: '还没 + 動詞 + 結果補語'
  },
  {
    id: 'q12',
    title: 'フレーズ翻訳 (結果補語)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「聞いて理解する / 分かる」を表す中国語として正しいものは？',
    promptJp: '教科書 p.93 確認してみよう！ 3 より',
    options: [
      '听懂',
      '看完',
      '吃累',
      '买到'
    ],
    correctAnswerIndex: 0,
    explanation: '「聞いて理解する」は「听(聞く) + 懂(理解する)」＝「听懂 (tīngdǒng)」です。',
    grammarNote: '听懂 = 聞いてわかる'
  },
  {
    id: 'q13',
    title: 'フレーズ翻訳 (買える・手に入る)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「買って手に入れる / 買える」を表す中国語として正しいものは？',
    promptJp: '目的達成を表す結果補語「到」です。',
    options: [
      '买到',
      '买完',
      '买懂',
      '买好'
    ],
    correctAnswerIndex: 0,
    explanation: '「買えた・購入できた」のように目的達成を表す結果補語は「到」を使って「买到 (mǎidào)」と言います。',
    grammarNote: '動詞 + 到 = 目的達成'
  }
];
