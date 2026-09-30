export type VocabCategory = 
  | '時間'
  | '動詞'
  | '名詞'
  | '前置詞'
  | '形容詞'
  | '副詞'
  | '会話・読トレ'
  | '手書き・補足';

export interface Lesson {
  id: string;
  number: number;
  title: string;
  description: string;
  badge: string;
  vocabCount: number;
  quizCount: number;
  isUnlocked: boolean;
}

export interface VocabItem {
  id: string;
  lessonId: string;
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
  lessonId: string;
  title: string;
  type: QuizType;
  category: '時点vs時量' | '从・到・离' | '結果補語' | '二vs两' | '総合';
  question: string;
  promptJp?: string;
  options?: string[];
  correctAnswerIndex?: number;
  correctReorder?: string[];
  tokens?: string[];
  explanation: string;
  grammarNote?: string;
}

export interface GrammarRuleSummary {
  id: string;
  lessonId: string;
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

// RPG Battle Game Types
export interface Monster {
  id: string;
  name: string;
  icon: string;
  maxHp: number;
  currentHp: number;
  rewardXp: number;
  rewardCoins: number;
}

export type ItemType = 'hint_5050' | 'double_damage' | 'shield';

export interface InventoryItem {
  type: ItemType;
  name: string;
  icon: string;
  count: number;
  description: string;
}

export interface PlayerState {
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  items: Record<ItemType, number>;
}
