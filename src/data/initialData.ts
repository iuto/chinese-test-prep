import { Lesson, VocabItem, QuizItem, GrammarRuleSummary } from '../types';

export const lessonList: Lesson[] = [
  {
    id: 'lesson7',
    number: 7,
    title: '第7課: 時間の表現と結果補語',
    description: '時点 vs 時量の語順、前置詞 (从・到・离)、結果補語 (完・到・懂・累) をマスターします。',
    badge: 'テスト範囲',
    vocabCount: 39,
    quizCount: 13,
    isUnlocked: true,
  },
  {
    id: 'lesson8',
    number: 8,
    title: '第8課: 方位詞と存現文',
    description: '位置関係・方位詞 (上・下・前・后・左・右) や存在を表す構文をマスターします。',
    badge: 'テスト範囲',
    vocabCount: 10,
    quizCount: 5,
    isUnlocked: true,
  }
];

export const initialVocabList: VocabItem[] = [
  // --- 第7課 単語 ---
  { id: 'v1', lessonId: 'lesson7', hanzi: '分钟', pinyin: 'fēnzhōng', meaning: '～分間（時量）', category: '時間', notes: '量を数える時は「两分钟」' },
  { id: 'v2', lessonId: 'lesson7', hanzi: '小时', pinyin: 'xiǎoshí', meaning: '～時間（時量）', category: '時間', notes: '量を数える時は「两个小时」' },
  { id: 'v3', lessonId: 'lesson7', hanzi: '天', pinyin: 'tiān', meaning: '～日間（時量）', category: '時間', notes: '「两天」（2日間）' },
  { id: 'v4', lessonId: 'lesson7', hanzi: '星期', pinyin: 'xīngqī', meaning: '～週間（時量）', category: '時間', notes: '「两个星期」（2週間）' },
  { id: 'v5', lessonId: 'lesson7', hanzi: '睡', pinyin: 'shuì', meaning: '寝る', category: '動詞' },
  { id: 'v6', lessonId: 'lesson7', hanzi: '放假', pinyin: 'fàng jià', meaning: '休みになる / 休暇に入る', category: '動詞', notes: '離合詞 (例: 放几天假)' },
  { id: 'v7', lessonId: 'lesson7', hanzi: '走', pinyin: 'zǒu', meaning: '歩く / 行く', category: '動詞' },
  { id: 'v8', lessonId: 'lesson7', hanzi: '写', pinyin: 'xiě', meaning: '書く', category: '動詞' },
  { id: 'v9', lessonId: 'lesson7', hanzi: '找', pinyin: 'zhǎo', meaning: '探す / おつりを出す', category: '動詞', notes: '結果補語「找到」で見つかった' },
  { id: 'v10', lessonId: 'lesson7', hanzi: '听', pinyin: 'tīng', meaning: '聞く', category: '動詞' },
  { id: 'v11', lessonId: 'lesson7', hanzi: '洗', pinyin: 'xǐ', meaning: '洗う', category: '動詞' },
  { id: 'v12', lessonId: 'lesson7', hanzi: '拐', pinyin: 'guǎi', meaning: '曲がる', category: '動詞' },
  { id: 'v13', lessonId: 'lesson7', hanzi: '春节', pinyin: 'Chūnjié', meaning: '春節（旧正月）', category: '名詞' },
  { id: 'v14', lessonId: 'lesson7', hanzi: '课', pinyin: 'kè', meaning: '授業 / 課', category: '名詞' },
  { id: 'v15', lessonId: 'lesson7', hanzi: '飞机', pinyin: 'fēijī', meaning: '飛行機', category: '名詞' },
  { id: 'v16', lessonId: 'lesson7', hanzi: '报告', pinyin: 'bàogào', meaning: 'レポート / 報告', category: '名詞' },
  { id: 'v17', lessonId: 'lesson7', hanzi: '钱包', pinyin: 'qiánbāo', meaning: '財布', category: '名詞' },
  { id: 'v18', lessonId: 'lesson7', hanzi: '冰箱', pinyin: 'bīngxiāng', meaning: '冷蔵庫', category: '名詞' },
  { id: 'v19', lessonId: 'lesson7', hanzi: '窗户', pinyin: 'chuānghu', meaning: '窓', category: '名詞' },
  { id: 'v20', lessonId: 'lesson7', hanzi: '从', pinyin: 'cóng', meaning: '～から（起点）', category: '前置詞', notes: '从A到B（AからBまで）' },
  { id: 'v21', lessonId: 'lesson7', hanzi: '到', pinyin: 'dào', meaning: '～まで（到達点） / 到着する', category: '前置詞' },
  { id: 'v22', lessonId: 'lesson7', hanzi: '离', pinyin: 'lí', meaning: '～から（二点間の隔たり）', category: '前置詞', notes: 'A离B远/近（AはBから遠い/近い）' },
  { id: 'v23', lessonId: 'lesson7', hanzi: '多长', pinyin: 'duō cháng', meaning: 'どれくらいの長さ（時間・距離）', category: '形容詞', notes: '多长时间' },
  { id: 'v24', lessonId: 'lesson7', hanzi: '左右', pinyin: 'zuǒyòu', meaning: '～ぐらい / 前後', category: '副詞', notes: '数詞+量詞+左右 (例: 两个半小时左右)' },
  { id: 'v25', lessonId: 'lesson7', hanzi: '远', pinyin: 'yuǎn', meaning: '遠い', category: '形容詞' },
  { id: 'v26', lessonId: 'lesson7', hanzi: '近', pinyin: 'jìn', meaning: '近い', category: '形容詞' },
  { id: 'v27', lessonId: 'lesson7', hanzi: '还', pinyin: 'hái', meaning: 'まだ / さらに', category: '副詞', notes: '还没~ (まだ～していない)' },
  { id: 'v28', lessonId: 'lesson7', hanzi: '过路人', pinyin: 'guòlùrén', meaning: '通行人', category: '会話・読トレ' },
  { id: 'v29', lessonId: 'lesson7', hanzi: '请问', pinyin: 'qǐngwèn', meaning: 'お尋ねします / すみません', category: '会話・読トレ' },
  { id: 'v30', lessonId: 'lesson7', hanzi: '附近', pinyin: 'fùjìn', meaning: '付近 / 近く', category: '会話・読トレ' },
  { id: 'v31', lessonId: 'lesson7', hanzi: '意大利', pinyin: 'Yìdàlì', meaning: 'イタリア', category: '会話・読トレ' },
  { id: 'v32', lessonId: 'lesson7', hanzi: '餐厅', pinyin: 'cāntīng', meaning: 'レストラン / 食堂', category: '会話・読トレ' },
  { id: 'v33', lessonId: 'lesson7', hanzi: '地铁站', pinyin: 'dìtiězhàn', meaning: '地下鉄の駅', category: '会話・読トレ' },
  { id: 'v34', lessonId: 'lesson7', hanzi: '不太', pinyin: 'bú tài', meaning: 'あまり～でない', category: '会話・読トレ' },
  { id: 'v35', lessonId: 'lesson7', hanzi: '走着', pinyin: 'zǒuzhe', meaning: '歩いて / 徒歩で', category: '会話・読トレ' },
  { id: 'v36', lessonId: 'lesson7', hanzi: '怎么', pinyin: 'zěnme', meaning: 'どのように / どうやって', category: '会話・読トレ' },
  { id: 'v37', lessonId: 'lesson7', hanzi: '红绿灯', pinyin: 'hónglǜdēng', meaning: '信号機', category: '会話・読トレ' },
  { id: 'v38', lessonId: 'lesson7', hanzi: '往', pinyin: 'wǎng', meaning: '～のほうへ / ～に向かって', category: '前置詞' },
  { id: 'v39', lessonId: 'lesson7', hanzi: '脚', pinyin: 'jiǎo', meaning: '足 / 脚', category: '手書き・補足', notes: '教科書p.91の手書き追加単語' },

  // --- 第8課 サンプル単語 (複数選択テスト用) ---
  { id: 'v40', lessonId: 'lesson8', hanzi: '上面', pinyin: 'shàngmiàn', meaning: '上 / 上の方', category: '名詞' },
  { id: 'v41', lessonId: 'lesson8', hanzi: '下面', pinyin: 'xiàmiàn', meaning: '下 / 下の方', category: '名詞' },
  { id: 'v42', lessonId: 'lesson8', hanzi: '里面', pinyin: 'lǐmiàn', meaning: '中 / 内側', category: '名詞' },
  { id: 'v43', lessonId: 'lesson8', hanzi: '外面', pinyin: 'wàimiàn', meaning: '外 / 外側', category: '名詞' },
  { id: 'v44', lessonId: 'lesson8', hanzi: '前面', pinyin: 'qiánmiàn', meaning: '前 / 前方', category: '名詞' },
  { id: 'v45', lessonId: 'lesson8', hanzi: '后面', pinyin: 'hòumiàn', meaning: '後ろ / 後方', category: '名詞' },
  { id: 'v46', lessonId: 'lesson8', hanzi: '左边', pinyin: 'zuǒbian', meaning: '左側', category: '名詞' },
  { id: 'v47', lessonId: 'lesson8', hanzi: '右边', pinyin: 'yòubian', meaning: '右側', category: '名詞' },
  { id: 'v48', lessonId: 'lesson8', hanzi: '旁边', pinyin: 'pángbiān', meaning: 'となり / そば', category: '名詞' },
  { id: 'v49', lessonId: 'lesson8', hanzi: '对面', pinyin: 'duìmiàn', meaning: '向かい側', category: '名詞' },
];

export const grammarSummaries: GrammarRuleSummary[] = [
  {
    id: 'g-rule-1',
    lessonId: 'lesson7',
    title: '① 時点 (Time Point) と 時量 (Time Span) の基本公式',
    formula: '主語 S + [時点] + 動詞 V + [時量] + 目的語 O',
    description: '中国語では「いつ（時点）」は動詞の前、「どのくらい（時量）」は動詞の後に置きます。',
    examples: [
      { cn: '我每天睡七个小时。', pinyin: 'Wǒ měitiān shuì qī ge xiǎoshí.', jp: '私は毎日7時間寝ます。（毎日は時点、7時間は時量）' },
      { cn: '我星期六学中文。', pinyin: 'Wǒ xīngqīliù xué Zhōngwén.', jp: '私は土曜日に中国語を勉強します。（プリント手書き例句）' },
      { cn: '今年春节放几天假？', pinyin: 'Jīnnián Chūnjié fàng jǐ tiān jià?', jp: '今年の春節は何日間休みになりますか？' }
    ],
    tips: [
      '「2」の使い分け:',
      '・時点（時刻・日付）: 两点 (2時), 二分 (2分), 星期二 (火曜日)',
      '・時量（長さ・量）: 两个小时 (2時間), 两分钟 (2分間), 两天 (2日間)'
    ]
  },
  {
    id: 'g-rule-2',
    lessonId: 'lesson7',
    title: '② 前置詞 “从・到・离” の使い分け',
    formula: '“从” A “到” B + 動詞 / A “离” B + 远/近',
    description: '“从”は起点（〜から）、“到”は到達点（〜まで）、“离”は2点間の距離の隔たり（〜から）を表します。',
    examples: [
      { cn: '从星期一到星期五都有课。', pinyin: 'Cóng xīngqīyī dào xīngqīwǔ dōu yǒu kè.', jp: '月曜日から金曜日まで授業があります。' },
      { cn: '到北京坐飞机要两个半小时左右。', pinyin: 'Dào Běijīng zuò fēijī yào liǎng ge bàn xiǎoshí zuǒyòu.', jp: '北京まで飛行機で2時間半ぐらいかかります。' },
      { cn: '我家离大学很远。', pinyin: 'Wǒ jiā lí dàxué hěn yuǎn.', jp: '私の家は大学から遠いです。' }
    ],
    tips: [
      '「どれくらいの長さ」と尋ねる時は “多长时间” (duō cháng shíjiān)',
      '「〜ぐらい」を表す “左右” (zuǒyòu) は数量の後ろに置きます。'
    ]
  },
  {
    id: 'g-rule-3',
    lessonId: 'lesson7',
    title: '③ 結果補語（動詞 + 完 / 到 / 懂 / 累）',
    formula: '動詞 + 結果補語 (完, 到, 见, 懂, 好, 累, 干净, 清楚)',
    description: '動作を行った結果の完了・達成を表します。否定文は “没” を動詞の前に置きます。',
    examples: [
      { cn: '我写完报告了。', pinyin: 'Wǒ xiěwán bàogào le.', jp: '私はレポートを書き終えました。（完）' },
      { cn: '还没找到钱包。', pinyin: 'Hái méi zhǎodào qiánbāo.', jp: 'まだ財布が見つかっていません。（到）' },
      { cn: '看懂 / 听懂', pinyin: 'kàndǒng / tīngdǒng', jp: '見て理解する / 聞いて理解する' }
    ],
    tips: [
      'よく使われる結果補語:',
      '・完: 終わる (写完, 看完)',
      '・到: 目的達成 (找到, 买到)',
      '・懂: 理解する (看懂, 听懂)'
    ]
  }
];

export const initialQuizList: QuizItem[] = [
  // --- 第7課 クイズ ---
  {
    id: 'q1',
    lessonId: 'lesson7',
    title: '時点と時量の語順',
    type: 'multiple_choice',
    category: '時点vs時量',
    question: '「私は毎日7時間寝ます」の正しい中国語を選んでください。',
    promptJp: 'ポイント: 「毎日(時点)」は動詞の前、「7時間(時量)」は動詞の後です。',
    options: ['我每天睡七个小时。', '我七个小时睡每天。', '我睡七个小时每天。', '每天七个小时我睡。'],
    correctAnswerIndex: 0,
    explanation: '中国語の語順は「主語 + 時点(毎日) + 動詞(睡) + 時量(7時間)」となります。',
    grammarNote: '主語 + [時点] + 動詞 + [時量]'
  },
  {
    id: 'q2',
    lessonId: 'lesson7',
    title: '「2」の言い分け (1)',
    type: 'multiple_choice',
    category: '二vs两',
    question: '「2時間」と言いたい時の正しい中国語はどれですか？',
    promptJp: '時間の長さ（時量）を数える場合です。',
    options: ['二个小时', '两个小时', '二小时', '两小时个'],
    correctAnswerIndex: 1,
    explanation: '時量（時間の長さ）を数える時は「两」を使い、量詞「个」をつけて「两个小时」と言います。',
    grammarNote: '時量（量）は「两」を使用'
  },
  {
    id: 'q3',
    lessonId: 'lesson7',
    title: '「2」の言い分け (2)',
    type: 'multiple_choice',
    category: '二vs两',
    question: '「2時」と言いたい時の正しい中国語はどれですか？',
    promptJp: '時刻（時点）を表す場合です。',
    options: ['二点', '两点', '两个点', '二个点'],
    correctAnswerIndex: 1,
    explanation: '時刻の「2時」は例外的に「两点」と言います（分の場合、「2分」は「二分」、「2分間」は「两分钟」）。',
    grammarNote: '2時は「两点」'
  },
  {
    id: 'q4',
    lessonId: 'lesson7',
    title: '並べ替え問題 (時点と時量)',
    type: 'reorder',
    category: '時点vs時量',
    question: '「毎週火曜日3時間半アルバイトをする」になるよう並べ替えてください。',
    promptJp: '教科書 p.92 確認してみよう！ 1-1 より',
    tokens: ['每周二', '打工', '三个半小时', '我'],
    correctReorder: ['我', '每周二', '打工', '三个半小时'],
    explanation: '「我(S) + 每周二(時点) + 打工(V) + 三个半小时(時量)」の語順になります。',
    grammarNote: 'S + 時点 + V + 時量'
  },
  {
    id: 'q5',
    lessonId: 'lesson7',
    title: '疑問文の並べ替え',
    type: 'reorder',
    category: '時点vs時量',
    question: '「あなたは何時間中国語を勉強しますか」になるよう並べ替えてください。',
    promptJp: '教科書 p.92 確認してみよう！ 1-2 より',
    tokens: ['你', '几个小时', '学', '中文'],
    correctReorder: ['你', '学', '几个小时', '中文'],
    explanation: '「你 + 学(V) + 几个小时(時量) + 中文(O)」の語順になります。',
    grammarNote: 'S + V + 時量 + O'
  },
  {
    id: 'q6',
    lessonId: 'lesson7',
    title: '前置詞 “从・到” の使い分け',
    type: 'multiple_choice',
    category: '从・到・离',
    question: '「月曜日から金曜日まで授業があります」に入る組み合せは？\n（ ）星期一（ ）星期五都有课。',
    promptJp: '起点〜到達点を表す前置詞です。',
    options: ['从 ... 到', '离 ... 到', '到 ... 从', '从 ... 离'],
    correctAnswerIndex: 0,
    explanation: '「〜から〜まで」を表すときは「从 A 到 B」を使用します。',
    grammarNote: '从 + A + 到 + B'
  },
  {
    id: 'q7',
    lessonId: 'lesson7',
    title: '前置詞 “离” の使い分け',
    type: 'multiple_choice',
    category: '从・到・离',
    question: '「私の家は大学からとても遠いです」に入る適切な単語は？\n我家（ ）大学很远。',
    promptJp: '2点間の距離の隔たりを表す前置詞です。',
    options: ['离', '从', '到', '往'],
    correctAnswerIndex: 0,
    explanation: '2点間の距離の隔たり（〜から）を表すときは “离” を使います。「A 离 B 远/近」。',
    grammarNote: 'A 离 B 远/近'
  },
  {
    id: 'q8',
    lessonId: 'lesson7',
    title: '並べ替え問題 (从・到)',
    type: 'reorder',
    category: '从・到・离',
    question: '「家から大学まで1時間余りかかります」になるよう並べ替えてください。',
    promptJp: '教科書 p.92 確認してみよう！ 2-1 より',
    tokens: ['从', '家', '到', '大学', '要', '一个多小时'],
    correctReorder: ['从', '家', '到', '大学', '要', '一个多小时'],
    explanation: '「从家到大学(家から大学まで) + 要(かかる) + 一个多小时(1時間余り)」となります。',
    grammarNote: '从 A 到 B + 動詞 + 時量'
  },
  {
    id: 'q9',
    lessonId: 'lesson7',
    title: '並べ替え問題 (离)',
    type: 'reorder',
    category: '从・到・离',
    question: '「ここは駅からとても近いです」になるよう並べ替えてください。',
    promptJp: '教科書 p.92 確認してみよう！ 2-2 より',
    tokens: ['这儿', '离', '车站', '很', '近'],
    correctReorder: ['这儿', '离', '车站', '很', '近'],
    explanation: '「这儿(A) + 离 + 车站(B) + 很近」の語順になります。',
    grammarNote: 'A 离 B 很近'
  },
  {
    id: 'q10',
    lessonId: 'lesson7',
    title: '結果補語 (完)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「私はレポートを書き終えました」の（ ）に入る結果補語は？\n我写（ ）报告了。',
    promptJp: '「～し終わる」を表す動作完了補語です。',
    options: ['完', '到', '懂', '好'],
    correctAnswerIndex: 0,
    explanation: '動作の完了・終了を表す結果補語は「完 (wán)」です。「写完」で書き終わる。',
    grammarNote: '動詞 + 完'
  },
  {
    id: 'q11',
    lessonId: 'lesson7',
    title: '結果補語の否定文',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「まだ財布が見つかっていません」の正しい中国語を選んでください。',
    promptJp: '結果補語の否定は「没」を使います。',
    options: ['还没找到钱包。', '不找到钱包。', '没找不钱包。', '钱包找到不。'],
    correctAnswerIndex: 0,
    explanation: '「まだ〜ない」は「还没 + 動詞 + 結果補語」の形をとります。',
    grammarNote: '还没 + 動詞 + 結果補語'
  },
  {
    id: 'q12',
    lessonId: 'lesson7',
    title: 'フレーズ翻訳 (听懂)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「聞いて理解する / 分かる」を表す中国語として正しいものは？',
    promptJp: '教科書 p.93 確認してみよう！ 3 より',
    options: ['听懂', '看完', '吃累', '买到'],
    correctAnswerIndex: 0,
    explanation: '「听(聞く) + 懂(理解する)」＝「听懂 (tīngdǒng)」となります。',
    grammarNote: '听懂 = 聞いて理解する'
  },
  {
    id: 'q13',
    lessonId: 'lesson7',
    title: 'フレーズ翻訳 (买到)',
    type: 'multiple_choice',
    category: '結果補語',
    question: '「買って手に入れる / 買える」を表す中国語として正しいものは？',
    promptJp: '目的達成を表す結果補語「到」です。',
    options: ['买到', '买完', '买懂', '买好'],
    correctAnswerIndex: 0,
    explanation: '目的達成を表す結果補語は「到」を使用し、「买到 (mǎidào)」となります。',
    grammarNote: '動詞 + 到 = 目的達成'
  },

  // --- 第8課 クイズ サンプル ---
  {
    id: 'q14',
    lessonId: 'lesson8',
    title: '方位詞 (上)',
    type: 'multiple_choice',
    category: '総合',
    question: '「机の上に本があります」の「〜の上」を表す方位詞はどれ？',
    options: ['上面', '下面', '里面', '外面'],
    correctAnswerIndex: 0,
    explanation: '「上 / 上の方」は「上面 (shàngmiàn)」となります。',
    grammarNote: '上面 = 上'
  }
];
