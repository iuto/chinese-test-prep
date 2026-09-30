import React, { useState } from 'react';
import { VocabItem } from '../types';
import { Volume2, CheckCircle2, RotateCcw, Info, Sparkles } from 'lucide-react';

interface VocabCardProps {
  item: VocabItem;
  onToggleMastered: (id: string) => void;
}

export const VocabCard: React.FC<VocabCardProps> = ({ item, onToggleMastered }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('お使いのブラウザは音声読み上げに対応していません。');
      return;
    }
    
    // Stop any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(item.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85; // slightly slower for language learners

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case '時間': return 'bg-amber-100 text-amber-800 border-amber-200';
      case '動詞': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '名詞': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case '前置詞': return 'bg-purple-100 text-purple-800 border-purple-200';
      case '手書き・補足': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="group relative w-full h-80 cursor-pointer perspective-1000 select-none"
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-all ease-in-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT SIDE */}
        <div className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between backface-hidden shadow-md hover:shadow-xl border-2 transition-all ${
          item.isMastered 
            ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300' 
            : 'bg-white border-slate-200 hover:border-red-300'
        }`}>
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${getCategoryBadgeColor(item.category)}`}>
              {item.category}
            </span>

            <div className="flex items-center gap-2">
              {item.isMastered && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 習得済み
                </span>
              )}
              <button
                onClick={speak}
                title="中国語で発音を聞く"
                className={`p-2.5 rounded-full transition-all ${
                  isPlayingAudio
                    ? 'bg-red-500 text-white animate-bounce'
                    : 'bg-red-50 hover:bg-red-100 text-red-600'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Hanzi */}
          <div className="text-center my-auto">
            <h2 className="text-5xl font-extrabold text-slate-800 tracking-wider mb-3 drop-shadow-sm font-serif">
              {item.hanzi}
            </h2>
            <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">
              タップして裏面を表示
            </p>
          </div>

          {/* Bottom hint */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t pt-3">
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> めくる
            </span>
            {item.notes && (
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                <Info className="w-3.5 h-3.5" /> メモあり
              </span>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-md border-2 ${
          item.isMastered 
            ? 'bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-400' 
            : 'bg-gradient-to-br from-amber-50 to-red-50 border-red-200'
        }`}>
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {item.hanzi}
            </span>
            <button
              onClick={speak}
              className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Meaning & Pinyin */}
          <div className="text-center my-auto space-y-2">
            <p className="text-2xl font-bold text-red-700 tracking-wider font-mono">
              {item.pinyin}
            </p>
            <p className="text-xl font-extrabold text-slate-800">
              {item.meaning}
            </p>

            {item.notes && (
              <div className="mt-3 p-2.5 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/80 text-left text-xs text-amber-900 shadow-inner">
                <div className="flex items-center gap-1 font-bold text-amber-700 mb-0.5">
                  <Sparkles className="w-3 h-3" /> メモ・学習のコツ
                </div>
                {item.notes}
              </div>
            )}
          </div>

          {/* Mastered Button */}
          <div className="border-t border-slate-200/60 pt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMastered(item.id);
              }}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                item.isMastered
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {item.isMastered ? '未習得に戻す' : '覚えた！(完了にする)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
