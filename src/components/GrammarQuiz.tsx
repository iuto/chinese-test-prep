import React, { useState, useEffect, useMemo, useRef } from 'react';
import { QuizItem } from '../types';
import { initialMonsters } from '../data/monsters';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Swords, HelpCircle, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface GrammarQuizProps {
  quizList: QuizItem[];
  comboCount?: number;
}

export const GrammarQuiz: React.FC<GrammarQuizProps> = ({ quizList }) => {
  const [shuffledList, setShuffledList] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // RPG Battle State
  const [playerLevel, setPlayerLevel] = useState<number>(1);
  const [playerXp, setPlayerXp] = useState<number>(0);
  const [monsterIndex, setMonsterIndex] = useState<number>(0);
  const [monsterHp, setMonsterHp] = useState<number>(initialMonsters[0].maxHp);
  const [damagePopup, setDamagePopup] = useState<number | null>(null);
  const [monsterHit, setMonsterHit] = useState<boolean>(false);

  // Items State
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({
    hint_5050: 2,
    double_damage: 1,
  });
  const [isDoubleDamageActive, setIsDoubleDamageActive] = useState<boolean>(false);
  const [hiddenOptionIndices, setHiddenOptionIndices] = useState<number[]>([]);

  const autoNextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Always shuffle quiz list!
  useEffect(() => {
    if (quizList.length > 0) {
      const shuffled = [...quizList].sort(() => Math.random() - 0.5);
      setShuffledList(shuffled);
      setCurrentIndex(0);
    }
  }, [quizList]);

  const currentQuiz = shuffledList[currentIndex];
  const currentMonster = initialMonsters[monsterIndex % initialMonsters.length];

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setHiddenOptionIndices([]);
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
  }, [currentIndex, shuffledList]);

  const handleNext = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    if (currentIndex < shuffledList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Re-shuffle for infinite battle arcade!
      const reshuffled = [...quizList].sort(() => Math.random() - 0.5);
      setShuffledList(reshuffled);
      setCurrentIndex(0);
    }
  };

  const handleCorrectAnswer = () => {
    const baseDmg = isDoubleDamageActive ? 60 : 35;
    const finalDmg = baseDmg;

    if (isDoubleDamageActive) {
      sounds.playCriticalAttack();
      setIsDoubleDamageActive(false);
    } else {
      sounds.playAttack();
    }

    setDamagePopup(finalDmg);
    setMonsterHit(true);
    setTimeout(() => setMonsterHit(false), 400);

    const newHp = Math.max(0, monsterHp - finalDmg);
    setMonsterHp(newHp);

    if (newHp === 0) {
      sounds.playVictory();
      try {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });
      } catch (e) {}

      const xpGained = currentMonster.rewardXp;
      const nextXp = playerXp + xpGained;
      const xpNeeded = playerLevel * 100;

      if (nextXp >= xpNeeded) {
        sounds.playLevelUp();
        setPlayerLevel((l) => l + 1);
        setPlayerXp(nextXp - xpNeeded);
      } else {
        setPlayerXp(nextXp);
      }

      setTimeout(() => {
        const nextIndex = monsterIndex + 1;
        setMonsterIndex(nextIndex);
        const nextM = initialMonsters[nextIndex % initialMonsters.length];
        setMonsterHp(nextM.maxHp);
        setDamagePopup(null);
      }, 1200);
    }

    // Auto-next in 0.75s on correct
    autoNextTimerRef.current = setTimeout(() => {
      setDamagePopup(null);
      handleNext();
    }, 750);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQuiz.correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      handleCorrectAnswer();
    } else {
      sounds.playWrong();
    }
  };

  const handleCheckReorder = (userAnswer: string[]) => {
    if (isAnswered || !currentQuiz || !currentQuiz.correctReorder) return;
    setIsAnswered(true);

    const correct =
      userAnswer.length === currentQuiz.correctReorder.length &&
      userAnswer.every((val, i) => val === currentQuiz.correctReorder![i]);

    setIsCorrect(correct);
    if (correct) {
      handleCorrectAnswer();
    } else {
      sounds.playWrong();
    }
  };

  // ITEMS
  const useHint5050 = () => {
    if (itemCounts.hint_5050 <= 0 || isAnswered || !currentQuiz.options) return;
    sounds.playItemUse();
    setItemCounts((prev) => ({ ...prev, hint_5050: prev.hint_5050 - 1 }));

    const incorrectIndices = currentQuiz.options
      .map((_, i) => i)
      .filter((i) => i !== currentQuiz.correctAnswerIndex);
    const shuffledIncorrect = [...incorrectIndices].sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptionIndices(shuffledIncorrect);
  };

  const useDoubleDamage = () => {
    if (itemCounts.double_damage <= 0 || isDoubleDamageActive) return;
    sounds.playItemUse();
    setItemCounts((prev) => ({ ...prev, double_damage: prev.double_damage - 1 }));
    setIsDoubleDamageActive(true);
  };

  const handleRestart = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    const reshuffled = [...quizList].sort(() => Math.random() - 0.5);
    setShuffledList(reshuffled);
    setCurrentIndex(0);
    setMonsterHp(currentMonster.maxHp);
    setIsAnswered(false);
    setSelectedOption(null);
    setDamagePopup(null);
  };

  if (shuffledList.length === 0 || !currentQuiz) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-slate-600">問題データがありません。</p>
      </div>
    );
  }

  const xpNeeded = playerLevel * 100;
  const xpPercent = Math.min(100, Math.round((playerXp / xpNeeded) * 100));

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* 1. MONSTER & BATTLE HUD */}
      <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-lg space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b pb-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-700 text-white font-black px-2.5 py-0.5 rounded-full text-xs shadow-sm">
              Lv.{playerLevel} プレイヤー
            </span>
            <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-bold">{playerXp}/{xpNeeded} XP</span>
          </div>

          <button
            onClick={handleRestart}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 再シャッフル
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 relative">
          <div className="flex items-center gap-3">
            <div className={`text-5xl filter drop-shadow-md transition-all ${monsterHit ? 'animate-monster-hit' : ''}`}>
              {currentMonster.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-1.5">
                {currentMonster.name}
              </h3>
              <div className="w-44 bg-slate-200 h-3.5 rounded-full overflow-hidden border border-slate-300 mt-1 relative">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(monsterHp / currentMonster.maxHp) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700">
                  HP {monsterHp} / {currentMonster.maxHp}
                </span>
              </div>
            </div>
          </div>

          {damagePopup && (
            <div className="absolute right-12 top-0 font-black text-2xl animate-damage text-red-600 z-20">
              -{damagePopup} HP!
            </div>
          )}
        </div>
      </div>

      {/* 2. ITEM SLOT BAR */}
      <div className="bg-slate-900 text-white p-3 rounded-2xl flex items-center justify-between gap-2 shadow-md">
        <span className="text-xs font-extrabold text-slate-300 flex items-center gap-1">
          <Swords className="w-4 h-4 text-red-500" /> アイテム:
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={useHint5050}
            disabled={itemCounts.hint_5050 <= 0 || isAnswered || !currentQuiz.options}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all border ${
              itemCounts.hint_5050 > 0 && !isAnswered
                ? 'bg-slate-800 hover:bg-slate-700 text-yellow-300 border-amber-500/50'
                : 'bg-slate-950 text-slate-600 border-slate-800 cursor-not-allowed'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
            50/50ヒント ({itemCounts.hint_5050})
          </button>

          <button
            onClick={useDoubleDamage}
            disabled={itemCounts.double_damage <= 0 || isDoubleDamageActive || isAnswered}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all border ${
              isDoubleDamageActive
                ? 'bg-amber-500 text-slate-950 font-black border-amber-300 animate-pulse'
                : itemCounts.double_damage > 0 && !isAnswered
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-amber-500/50'
                : 'bg-slate-950 text-slate-600 border-slate-800 cursor-not-allowed'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            {isDoubleDamageActive ? '2倍攻撃中!' : `2倍攻撃 (${itemCounts.double_damage})`}
          </button>
        </div>
      </div>

      {/* 3. QUESTION CARD */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg p-6 space-y-5">
        <div>
          <span className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            {currentQuiz.category}
          </span>
          <h3 className="text-xl font-extrabold text-slate-800 mt-3 leading-snug">
            {currentQuiz.question}
          </h3>
          {currentQuiz.promptJp && (
            <p className="text-xs text-slate-500 mt-2 bg-amber-50 p-3 rounded-xl border border-amber-200/60 font-medium">
              💡 {currentQuiz.promptJp}
            </p>
          )}
        </div>

        {/* Options */}
        {currentQuiz.type === 'multiple_choice' && currentQuiz.options && (
          <div className="space-y-2.5">
            {currentQuiz.options.map((opt, idx) => {
              const isHidden = hiddenOptionIndices.includes(idx);
              let btnStyle = 'border-slate-200 hover:border-red-400 bg-white text-slate-800 active:scale-98';

              if (isHidden) {
                btnStyle = 'border-slate-100 bg-slate-50 text-slate-300 opacity-20 pointer-events-none';
              } else if (isAnswered) {
                if (idx === currentQuiz.correctAnswerIndex) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400/50';
                } else if (idx === selectedOption) {
                  btnStyle = 'border-red-400 bg-red-50 text-red-900 font-bold';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 opacity-40';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered || isHidden}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-sm sm:text-base ${btnStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    {/* Gothic Font */}
                    <span className="font-bold">{opt}</span>
                  </span>

                  {isAnswered && idx === currentQuiz.correctAnswerIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQuiz.correctAnswerIndex && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Reorder Interactive Option */}
        {currentQuiz.type === 'reorder' && currentQuiz.tokens && (
          <ReorderComponent
            quiz={currentQuiz}
            isAnswered={isAnswered}
            onCheck={handleCheckReorder}
          />
        )}

        {/* 不正解の時のみ「次へ進む」と解説 */}
        {isAnswered && !isCorrect && (
          <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 space-y-3 animate-pop">
            <div className="flex items-center gap-2 font-extrabold text-base text-red-800">
              <XCircle className="w-5 h-5 text-red-600" />
              <span>不正解です</span>
            </div>

            {currentQuiz.grammarNote && (
              <div className="text-xs font-bold bg-white/90 p-2.5 rounded-xl text-slate-700 border border-slate-200">
                📐 基本公式: {currentQuiz.grammarNote}
              </div>
            )}

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentQuiz.explanation}
            </p>

            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 mt-2 transition-all"
            >
              理解した！次へ進む →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Internal Reorder Component
const ReorderComponent: React.FC<{
  quiz: QuizItem;
  isAnswered: boolean;
  onCheck: (userAnswer: string[]) => void;
}> = ({ quiz, isAnswered, onCheck }) => {
  const [userTokens, setUserTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>(quiz.tokens || []);

  useEffect(() => {
    setUserTokens([]);
    setAvailableTokens(quiz.tokens ? [...quiz.tokens].sort(() => Math.random() - 0.5) : []);
  }, [quiz]);

  const addToken = (token: string, index: number) => {
    if (isAnswered) return;
    setUserTokens([...userTokens, token]);
    setAvailableTokens(availableTokens.filter((_, i) => i !== index));
  };

  const removeToken = (token: string, index: number) => {
    if (isAnswered) return;
    setUserTokens(userTokens.filter((_, i) => i !== index));
    setAvailableTokens([...availableTokens, token]);
  };

  return (
    <div className="space-y-4">
      <div className="min-h-[60px] p-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-wrap gap-2 items-center">
        {userTokens.length === 0 && (
          <span className="text-xs text-slate-400 font-medium italic">
            下の単語カードを順にタップして文章を作ってください
          </span>
        )}
        {userTokens.map((t, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => removeToken(t, idx)}
            className="px-3.5 py-1.5 bg-red-700 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-red-800 transition-all"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTokens.map((t, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => addToken(t, idx)}
            className="px-3.5 py-2 bg-white border-2 border-slate-300 text-slate-800 text-sm font-bold rounded-xl shadow-sm hover:border-red-500 hover:bg-red-50 transition-all"
          >
            {t}
          </button>
        ))}
      </div>

      {!isAnswered && (
        <button
          disabled={userTokens.length === 0}
          onClick={() => onCheck(userTokens)}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all ${
            userTokens.length > 0
              ? 'bg-red-700 hover:bg-red-800 text-white'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          攻撃を繰り出す！⚔️
        </button>
      )}
    </div>
  );
};
