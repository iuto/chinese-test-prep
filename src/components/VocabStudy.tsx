import React, { useState, useEffect, useMemo } from 'react';
import { VocabItem } from '../types';
import { Volume2, CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, Layers, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentItem = vocabList[currentIndex];

  // Generate 4-choice options (1 Correct + 3 Random incorrect from list)
  const options = useMemo(() => {
    if (!currentItem || vocabList.length === 0) return [];
    
    // Get other items
    const others = vocabList.filter((v) => v.id !== currentItem.id);
    // Shuffle others and pick 3
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Combine with correct item and shuffle
    const combined = [currentItem, ...shuffledOthers].sort(() => Math.random() - 0.5);
    return combined;
  }, [currentIndex, currentItem, vocabList]);

  const correctAnswerIndex = options.findIndex((opt) => opt.id === currentItem?.id);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [currentIndex, vocabList]);

  const speak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const correct = idx === correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      sounds.playCorrect();
      if (!currentItem.isMastered) {
        onToggleMastered(currentItem.id);
      }
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    } else {
      sounds.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      sounds.playLevelUp();
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setIsAnswered(false);
    setSelectedOption(null);
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
      {/* Game Progress Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            単語一問一答 (日 ➔ 中)
          </span>
          <span className="text-xs font-bold text-slate-500">
            {currentIndex + 1} / {vocabList.length} 語
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700">
            スコア: <span className="text-red-700 font-extrabold text-sm">{score}</span>
          </span>
          <button
            onClick={handleRestart}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 最初から
          </button>
        </div>
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
            <p className="text-sm font-bold text-slate-600 mt-2">
              {vocabList.length}語中 <span className="text-red-700 font-extrabold text-xl">{score}</span> 語正解しました！
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-xs font-bold text-slate-600 border border-slate-200">
            単語マスター率: {Math.round((score / vocabList.length) * 100)}%
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> もう一度挑戦する
          </button>
        </div>
      ) : (
        /* Single Question Card */
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
          {/* Category Tag & Prompt */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full border">
              {currentItem.category}
            </span>
            <span className="text-xs font-bold text-slate-400">
              正しい中国語を選んでください
            </span>
          </div>

          {/* Question: Japanese Meaning */}
          <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-3xl font-extrabold text-slate-800">
              {currentItem.meaning}
            </h3>
          </div>

          {/* 4 Chinese Options */}
          <div className="space-y-3">
            {options.map((opt, idx) => {
              let btnStyle = 'border-slate-200 hover:border-red-400 bg-white text-slate-800';

              if (isAnswered) {
                if (idx === correctAnswerIndex) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400/50';
                } else if (idx === selectedOption) {
                  btnStyle = 'border-red-400 bg-red-50 text-red-900 font-bold';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 opacity-40';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-base ${btnStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="text-xl font-serif">{opt.hanzi}</span>
                    <span className="text-xs font-mono text-slate-500">({opt.pinyin})</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => speak(opt.hanzi, e)}
                      className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
                      title="発音"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isAnswered && idx === correctAnswerIndex && (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== correctAnswerIndex && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result & Next Button */}
          {isAnswered && (
            <div className={`p-4 sm:p-5 rounded-2xl space-y-3 transition-all ${
              isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-extrabold text-base">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-800">正解！</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800">正解は 「{currentItem.hanzi}」 です</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => speak(currentItem.hanzi)}
                  className="flex items-center gap-1 text-xs font-bold text-red-700 bg-white px-2.5 py-1 rounded-full border border-red-200"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 発音を聞く
                </button>
              </div>

              {currentItem.notes && (
                <div className="text-xs font-bold bg-white/90 p-2.5 rounded-xl text-slate-700 border border-slate-200">
                  💡 メモ: {currentItem.notes}
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 mt-2 transition-all"
              >
                {currentIndex === vocabList.length - 1 ? '結果を見る' : '次の単語へ進む →'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
