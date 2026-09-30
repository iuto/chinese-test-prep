export type VocabCategory = 
  | '時間'
  | '動詞'
  | '名詞'
  | '前置詞'
  | '形容詞'
  | '副詞'
  | '会話・読トレ'
  | '手書き・補足';

export interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  category: VocabCategory;
  notes?: string;
  isMastered?: boolean;
}

export type QuizType = 'multiple_choice' | 'reorder' | 'fill_in';

export interface QuizItem {
  id: string;
  title: string;
  type: QuizType;
  category: '時点vs時量' | '从・到・离' | '結果補語' | '二vs两' | '総合';
  question: string;
  promptJp?: string; // 日本語の訳・指示
  options?: string[]; // 選択肢
  correctAnswerIndex?: number;
  correctReorder?: string[]; // 並べ替えの正解配列
  tokens?: string[]; // 並べ替え用単語パーツ
  explanation: string;
  grammarNote?: string; // 関連する文法公式
}

export interface GrammarRuleSummary {
  id: string;
  title: string;
  formula: string;
  description: string;
  examples: {
    cn: string;
    pinyin: string;
    jp: string;
  }[];
  tips?: string[];
}
