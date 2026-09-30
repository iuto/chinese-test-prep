import React, { useState, useMemo } from 'react';
import { VocabItem, VocabCategory } from '../types';
import { VocabCard } from './VocabCard';
import { Filter, Shuffle, LayoutGrid, Layers, CheckCircle2, Trophy, RotateCcw } from 'lucide-react';

interface VocabStudyProps {
  vocabList: VocabItem[];
  onToggleMastered: (id: string) => void;
  onResetMastered: () => void;
}

export const VocabStudy: React.FC<VocabStudyProps> = ({
  vocabList,
  onToggleMastered,
  onResetMastered,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [hideMastered, setHideMastered] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // Categories list
  const categories: (VocabCategory | 'ALL')[] = [
    'ALL',
    '時間',
    '動詞',
    '名詞',
    '前置詞',
    '形容詞',
    '会話・読トレ',
    '手書き・補足',
  ];

  // Filtered List
  const filteredList = useMemo(() => {
    return vocabList.filter((item) => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchMastered = hideMastered ? !item.isMastered : true;
      return matchCat && matchMastered;
    });
  }, [vocabList, selectedCategory, hideMastered]);

  const masteredCount = vocabList.filter((v) => v.isMastered).length;
  const progressPercent = Math.round((masteredCount / (vocabList.length || 1)) * 100);

  const nextCard = () => {
    if (filteredList.length === 0) return;
    setCarouselIndex((prev) => (prev + 1) % filteredList.length);
  };

  const prevCard = () => {
    if (filteredList.length === 0) return;
    setCarouselIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Progress */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              📖 単語暗記フラッシュカード
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              教科書第7課（p.91）の単語＋手書きメモをカード形式で学習
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'carousel' : 'grid')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
            >
              {viewMode === 'grid' ? <Layers className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
              {viewMode === 'grid' ? '1枚ずつめくる' : '一覧表示'}
            </button>
            <button
              onClick={onResetMastered}
              title="暗記チェックをリセット"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-600 flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500" /> 暗記達成率
            </span>
            <span className="text-red-700">
              {masteredCount} / {vocabList.length} 語 ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border">
            <div
              className="bg-gradient-to-r from-red-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-100 p-3 rounded-xl">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-slate-400 font-bold flex items-center pl-1">
            <Filter className="w-3.5 h-3.5 mr-1" />
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCarouselIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'すべて' : cat}
            </button>
          ))}
        </div>

        {/* Checkbox: Hide Mastered */}
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700 self-end sm:self-center bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <input
            type="checkbox"
            checked={hideMastered}
            onChange={(e) => {
              setHideMastered(e.target.checked);
              setCarouselIndex(0);
            }}
            className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
          />
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 未習得のみ表示
          </span>
        </label>
      </div>

      {/* Content Area */}
      {filteredList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-800">素晴らしい！すべての単語をマスターしました 🎉</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            フィルターを変更するか、「暗記チェックをリセット」を押して復習しましょう。
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => (
            <VocabCard
              key={item.id}
              item={item}
              onToggleMastered={onToggleMastered}
            />
          ))}
        </div>
      ) : (
        /* CAROUSEL VIEW (One by One) */
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-center text-xs font-bold text-slate-500">
            {carouselIndex + 1} / {filteredList.length} 語
          </div>
          <VocabCard
            key={filteredList[carouselIndex].id}
            item={filteredList[carouselIndex]}
            onToggleMastered={onToggleMastered}
          />
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevCard}
              className="flex-1 py-3 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl font-bold text-sm text-slate-700 shadow-sm"
            >
              ← 前の単語
            </button>
            <button
              onClick={nextCard}
              className="flex-1 py-3 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold text-sm shadow-md"
            >
              次の単語 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
