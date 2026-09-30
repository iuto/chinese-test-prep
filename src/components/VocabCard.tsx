import React, { useState } from 'react';
import { VocabItem } from '../types';
import { Volume2, CheckCircle2, RotateCcw, Info, Sparkles, Zap, Flame } from 'lucide-react';
import { sounds } from '../utils/sound';

interface VocabCardProps {
  item: VocabItem;
  onToggleMastered: (id: string) => void;
}

export const VocabCard: React.FC<VocabCardProps> = ({ item, onToggleMastered }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleCardClick = () => {
    sounds.playFlip();
    setIsFlipped(!isFlipped);
  };

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('お使いのブラウザは音声読み上げに対応していません。');
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(item.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case '時間': return 'bg-amber-500/20 text-amber-300 border-amber-400/50';
      case '動詞': return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50';
      case '名詞': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50';
      case '前置詞': return 'bg-purple-500/20 text-purple-300 border-purple-400/50';
      case '手書き・補足': return 'bg-pink-500/20 text-pink-300 border-pink-400/50';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full h-80 cursor-pointer perspective-1000 select-none"
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-all ease-in-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT SIDE */}
        <div className={`absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between backface-hidden shadow-2xl border-2 transition-all ${
          item.isMastered 
            ? 'bg-slate-900 border-emerald-400/80 shadow-emerald-500/10' 
            : 'bg-slate-900/95 border-pink-500/40 hover:border-pink-400 hover:shadow-pink-500/20'
        }`}>
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className={`text-xs px-3 py-1 rounded-full font-black border ${getCategoryBadgeColor(item.category)}`}>
              {item.category}
            </span>

            <div className="flex items-center gap-2">
              {item.isMastered && (
                <span className="flex items-center gap-1 text-[11px] font-black text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-400/50">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 暗記完了！
                </span>
              )}
              <button
                onClick={speak}
                title="中国語で発音を聞く"
                className={`p-2.5 rounded-full transition-all ${
                  isPlayingAudio
                    ? 'bg-pink-500 text-white animate-bounce'
                    : 'bg-slate-800 hover:bg-pink-500/20 text-pink-400 border border-pink-500/40'
                }`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Hanzi */}
          <div className="text-center my-auto">
            <h2 className="text-5xl font-black text-white tracking-widest mb-3 font-serif drop-shadow-lg neon-text-pink">
              {item.hanzi}
            </h2>
            <p className="text-[11px] text-pink-300 font-extrabold tracking-widest uppercase animate-pulse">
              タップして裏面を表示 ⚡️
            </p>
          </div>

          {/* Bottom hint */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
            <span className="flex items-center gap-1 font-bold text-slate-400">
              <RotateCcw className="w-3.5 h-3.5" /> カードを裏返す
            </span>
            {item.notes && (
              <span className="flex items-center gap-1 text-yellow-400 font-black">
                <Sparkles className="w-3.5 h-3.5" /> メモあり
              </span>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div className={`absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl border-2 ${
          item.isMastered 
            ? 'bg-slate-950 border-emerald-400' 
            : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-pink-500'
        }`}>
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-pink-400 tracking-wider">
              {item.hanzi}
            </span>
            <button
              onClick={speak}
              className="p-2 rounded-full bg-slate-800 text-pink-300 border border-pink-500/30"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Meaning & Pinyin */}
          <div className="text-center my-auto space-y-2">
            <p className="text-2xl font-black text-yellow-300 font-mono tracking-wider neon-text-yellow">
              {item.pinyin}
            </p>
            <p className="text-2xl font-black text-white leading-tight">
              {item.meaning}
            </p>

            {item.notes && (
              <div className="mt-3 p-3 bg-slate-900/90 rounded-2xl border border-yellow-400/40 text-left text-xs text-amber-200 font-bold">
                <div className="flex items-center gap-1 text-yellow-400 font-black mb-0.5">
                  <Zap className="w-3.5 h-3.5" /> テスト直前メモ
                </div>
                {item.notes}
              </div>
            )}
          </div>

          {/* Mastered Button */}
          <div className="border-t border-slate-800 pt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!item.isMastered) sounds.playCorrect();
                onToggleMastered(item.id);
              }}
              className={`w-full py-3 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                item.isMastered
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-102 text-white shadow-pink-500/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {item.isMastered ? '未暗記に戻す' : '覚えた！(脳汁回収)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
