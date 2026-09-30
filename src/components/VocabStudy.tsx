import React, { useState } from 'react';
import { VocabItem } from '../types';
import { Volume2, CheckCircle2, RotateCcw, ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentItem = vocabList[currentIndex];

  const handleCardClick = () => {
    sounds.playFlip();
    setIsFlipped(!isFlipped);
  };

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentItem.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (knows: boolean) => {
    if (knows) {
      sounds.playCorrect();
      if (!currentItem.isMastered) {
        onToggleMastered(currentItem.id);
      }
    } else {
      sounds.playWrong();
    }

    // Move to next item
    if (currentIndex < vocabList.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      sounds.playLevelUp();
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
  };

  if (vocabList.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-slate-600">単語データがありません。</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Top Game Progress Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            単語一問一答ゲーム
          </span>
          <span className="text-xs font-bold text-slate-500">
            {currentIndex + 1} / {vocabList.length} 語
          </span>
        </div>

        <button
          onClick={handleRestart}
          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 最初から
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / vocabList.length) * 100}%` }}
        />
      </div>

      {/* Game Finished Screen */}
      {isFinished ? (
        <div className="bg-white rounded-3xl p-8 text-center border-2 border-slate-200 shadow-xl space-y-6">
          <div className="inline-flex p-4 rounded-full bg-amber-50 text-amber-500 border-2 border-amber-200">
            <Trophy className="w-16 h-16 animate-bounce" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">全単語クリア！🎉</h2>
            <p className="text-xs text-slate-500 mt-1">
              第7課の単語チャレンジをすべて解き終わりました！
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-2xl shadow-md text-sm transition-all"
          >
            もう一度挑戦する
          </button>
        </div>
      ) : (
        /* Single Question Game Card */
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg p-8 flex flex-col justify-between min-h-[380px] transition-all">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full border">
              {currentItem.category}
            </span>

            <button
              onClick={speak}
              className={`p-2.5 rounded-full transition-all ${
                isPlayingAudio
                  ? 'bg-red-600 text-white animate-bounce'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
              title="発音を聞く"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Main Card Content */}
          <div
            onClick={handleCardClick}
            className="text-center my-auto cursor-pointer py-6 select-none"
          >
            <h2 className="text-5xl font-extrabold text-slate-800 font-serif tracking-widest mb-3">
              {currentItem.hanzi}
            </h2>

            {!isFlipped ? (
              <p className="text-xs font-bold text-red-600 bg-red-50 inline-block px-4 py-1.5 rounded-full border border-red-200 mt-2">
                タップして答えを表示 👆
              </p>
            ) : (
              <div className="space-y-2 mt-4 animate-pop">
                <p className="text-2xl font-bold text-red-700 font-mono">
                  {currentItem.pinyin}
                </p>
                <p className="text-xl font-extrabold text-slate-800">
                  {currentItem.meaning}
                </p>
                {currentItem.notes && (
                  <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2 max-w-sm mx-auto font-medium">
                    💡 {currentItem.notes}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons (Appears after flipped) */}
          {isFlipped ? (
            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => handleAnswer(false)}
                className="py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-all border border-slate-300"
              >
                ❌ もう一度
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" /> 覚えた！(次へ)
              </button>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 border-t border-slate-100 pt-4 font-medium">
              頭の中で意味を思い出してからタップしてください
            </div>
          )}
        </div>
      )}
    </div>
  );
};
