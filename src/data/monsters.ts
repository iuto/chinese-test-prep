import { Monster, InventoryItem } from '../types';

export const initialMonsters: Monster[] = [
  { id: 'm1', name: '単語スライム', icon: '🟢', maxHp: 60, currentHp: 60, rewardXp: 40, rewardCoins: 15 },
  { id: 'm2', name: '語順の妖怪', icon: '👻', maxHp: 90, currentHp: 90, rewardXp: 60, rewardCoins: 25 },
  { id: 'm3', name: '結果補語ドラコ', icon: '🐲', maxHp: 120, currentHp: 120, rewardXp: 90, rewardCoins: 40 },
  { id: 'm4', name: '時量と時点の魔導士', icon: '🧙‍♂️', maxHp: 150, currentHp: 150, rewardXp: 120, rewardCoins: 60 },
  { id: 'm5', name: '第7課の最終大魔王', icon: '👑', maxHp: 250, currentHp: 250, rewardXp: 200, rewardCoins: 100 },
];

export const defaultInventory: Record<string, number> = {
  hint_5050: 2,       // 50-50ヒント (2つ消去) 2個
  double_damage: 1,   // 会心攻撃 (2倍ダメージ) 1個
  shield: 1,          // ミス防御シールド 1個
};

export const itemDefinitions: Record<string, InventoryItem> = {
  hint_5050: {
    type: 'hint_5050',
    name: '50/50ヒント',
    icon: '💡',
    count: 2,
    description: '不正解の選択肢を2つ消去します',
  },
  double_damage: {
    type: 'double_damage',
    name: '会心ブースト',
    icon: '⚡️',
    count: 1,
    description: '次の攻撃のダメージが2倍になります',
  },
  shield: {
    type: 'shield',
    name: '防御シールド',
    icon: '🛡️',
    count: 1,
    description: '1回だけミスダメージを防御します',
  }
};
