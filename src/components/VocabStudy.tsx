import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VocabItem } from '../types';
import { initialMonsters, itemDefinitions } from '../data/monsters';
import { Volume2, CheckCircle, XCircle, RotateCcw, Trophy, Zap, Shield, HelpCircle, Swords, Sparkles } from 'lucide-react';
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
}) => {
  // Always shuffle the list for battle!
  const [shuffledList, setShuffledList] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // RPG Player & Monster State
  const [playerLevel, setPlayerLevel] = useState<number>(1);
  const [playerXp, setPlayerXp] = useState<number>(0);
  const [monsterIndex, setMonsterIndex] = useState<number>(0);
  const [monsterHp, setMonsterHp] = useState<number>(initialMonsters[0].maxHp);
  const [damagePopup, setDamagePopup] = useState<{ amount: number; isCritical: boolean } | null>(null);
  const [monsterHit, setMonsterHit] = useState<boolean>(false);

  // Items State
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({
    hint_5050: 2,
    double_damage: 1,
    shield: 1,
  });
  const [isDoubleDamageActive, setIsDoubleDamageActive] = useState<boolean>(false);
  const [hiddenOptionIndices, setHiddenOptionIndices] = useState<number[]>([]);

  const autoNextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shuffle list on mount / list change
  useEffect(() => {
    if (vocabList.length > 0) {
      const shuffled = [...vocabList].sort(() => Math.random() - 0.5);
      setShuffledList(shuffled);
      setCurrentIndex(0);
    }
  }, [vocabList]);

  const currentItem = shuffledList[currentIndex];
  const currentMonster = initialMonsters[monsterIndex % initialMonsters.length];

  // Generate 4-choice options
  const options = useMemo(() => {
    if (!currentItem || shuffledList.length === 0) return [];
    const others = shuffledList.filter((v) => v.id !== currentItem.id);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    const combined = [currentItem, ...shuffledOthers].sort(() => Math.random() - 0.5);
    return combined;
  }, [currentIndex, currentItem, shuffledList]);

  const correctAnswerIndex = options.findIndex((opt) => opt.id === currentItem?.id);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setHiddenOptionIndices([]);
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
  }, [currentIndex, shuffledList]);

  const speak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    if (currentIndex < shuffledList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Re-shuffle for infinite arcade mode!
      const reshuffled = [...vocabList].sort(() => Math.random() - 0.5);
      setShuffledList(reshuffled);
      setCurrentIndex(0);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const correct = idx === correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      // Calculate Attack Damage (Base 30, Double Damage = 60)
      const baseDmg = isDoubleDamageActive ? 60 : 30;
      const finalDmg = baseDmg;
      const isCrit = isDoubleDamageActive;

      if (isCrit) {
        sounds.playCriticalAttack();
        setIsDoubleDamageActive(false); // Reset buff
      } else {
        sounds.playAttack();
      }

      // Damage Animation & Monster Shake
      setDamagePopup({ amount: finalDmg, isCritical: isCrit });
      setMonsterHit(true);
      setTimeout(() => setMonsterHit(false), 400);

      // Monster HP Reduction
      const newHp = Math.max(0, monsterHp - finalDmg);
      setMonsterHp(newHp);

      // Check Monster Defeated
      if (newHp === 0) {
        sounds.playVictory();
        try {
          confetti({ particleCount: 60, spread: 80, origin: { y: 0.5 } });
        } catch (e) {}

        // Reward XP & Level UP Check
        const xpGained = currentMonster.rewardXp;
        const nextXp = playerXp + xpGained;
        const xpNeeded = playerLevel * 100;

        if (nextXp >= xpNeeded) {
          sounds.playLevelUp();
          setPlayerLevel((lvl) => lvl + 1);
          setPlayerXp(nextXp - xpNeeded);
        } else {
          setPlayerXp(nextXp);
        }

        // Spawn Next Monster
        setTimeout(() => {
          const nextIndex = monsterIndex + 1;
          setMonsterIndex(nextIndex);
          const nextM = initialMonsters[nextIndex % initialMonsters.length];
          setMonsterHp(nextM.maxHp);
          setDamagePopup(null);
        }, 1200);
      }

      if (!currentItem.isMastered) {
        onToggleMastered(currentItem.id);
      }

      // Auto-next in 0.75s on correct
      autoNextTimerRef.current = setTimeout(() => {
        setDamagePopup(null);
        handleNext();
      }, 750);
    } else {
      sounds.playWrong();
    }
  };

  // ITEM USE HANDLERS
  const useHint5050 = () => {
    if (itemCounts.hint_5050 <= 0 || isAnswered) return;
    sounds.playItemUse();
    setItemCounts((prev) => ({ ...prev, hint_5050: prev.hint_5050 - 1 }));

    // Find 2 incorrect indices to hide
    const incorrectIndices = options
      .map((_, i) => i)
      .filter((i) => i !== correctAnswerIndex);
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
    const reshuffled = [...vocabList].sort(() => Math.random() - 0.5);
    setShuffledList(reshuffled);
    setCurrentIndex(0);
    setMonsterHp(currentMonster.maxHp);
    setIsAnswered(false);
    setSelectedOption(null);
    setDamagePopup(null);
  };

  if (shuffledList.length === 0 || !currentItem) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-slate-600">単語データがありません。</p>
      </div>
    );
  }

  const xpNeeded = playerLevel * 100;
  const xpPercent = Math.min(100, Math.round((playerXp / xpNeeded) * 100));

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* ========================================================= */}
      {/* 1. MONSTER & BATTLE HUD (RPG Header)                      */}
      {/* ========================================================= */}
      <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-lg space-y-3 relative overflow-hidden">
        {/* Top Player Status Bar (Lv.1 Start) */}
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

        {/* Monster Arena Display */}
        <div className="flex items-center justify-between pt-1 relative">
          <div className="flex items-center gap-3">
            <div className={`text-5xl filter drop-shadow-md transition-all ${monsterHit ? 'animate-monster-hit' : ''}`}>
              {currentMonster.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-1.5">
                {currentMonster.name}
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border">
                  Target
                </span>
              </h3>
              {/* Monster HP Bar */}
              <div className="w-44 bg-slate-200 h-3.5 rounded-full overflow-hidden border border-slate-300 mt-1 relative">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(monsterHp / currentMonster.maxHp) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700 shadow-sm">
                  HP {monsterHp} / {currentMonster.maxHp}
                </span>
              </div>
            </div>
          </div>

          {/* Floating Damage Popup Animation */}
          {damagePopup && (
            <div className={`absolute right-12 top-0 font-black text-2xl animate-damage z-20 ${
              damagePopup.isCritical ? 'text-amber-500 scale-125' : 'text-red-600'
            }`}>
              -{damagePopup.amount} HP! {damagePopup.isCritical && '⚡️CRITICAL!'}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. ITEM SLOT BAR (Game Item Boosters)                      */}
      {/* ========================================================= */}
      <div className="bg-slate-900 text-white p-3 rounded-2xl flex items-center justify-between gap-2 shadow-md">
        <span className="text-xs font-extrabold text-slate-300 flex items-center gap-1">
          <Swords className="w-4 h-4 text-red-500" /> アイテム:
        </span>

        <div className="flex items-center gap-2">
          {/* Hint 50/50 Item */}
          <button
            onClick={useHint5050}
            disabled={itemCounts.hint_5050 <= 0 || isAnswered}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all border ${
              itemCounts.hint_5050 > 0 && !isAnswered
                ? 'bg-slate-800 hover:bg-slate-700 text-yellow-300 border-amber-500/50'
                : 'bg-slate-950 text-slate-600 border-slate-800 cursor-not-allowed'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
            50/50ヒント ({itemCounts.hint_5050})
          </button>

          {/* Double Damage Item */}
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
            {isDoubleDamageActive ? '2倍攻撃発動中!' : `2倍攻撃 (${itemCounts.double_damage})`}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. QUESTION CARD (Shuffled 4-Choice Game)                  */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg p-6 space-y-5">
        {/* Category Tag & Prompt */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full border">
            {currentItem.category}
          </span>
          <span className="text-xs font-bold text-slate-400">
            問 {currentIndex + 1} （常時シャッフル中）
          </span>
        </div>

        {/* Question: Japanese Meaning (Gothic Font) */}
        <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="text-3xl font-extrabold text-slate-800">
            {currentItem.meaning}
          </h3>
        </div>

        {/* 4 Chinese Options (Clean Gothic Font / No Serif) */}
        <div className="space-y-2.5">
          {options.map((opt, idx) => {
            const isHidden = hiddenOptionIndices.includes(idx);
            let btnStyle = 'border-slate-200 hover:border-red-400 bg-white text-slate-800 active:scale-98';

            if (isHidden) {
              btnStyle = 'border-slate-100 bg-slate-50 text-slate-300 opacity-20 pointer-events-none';
            } else if (isAnswered) {
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
                disabled={isAnswered || isHidden}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-base ${btnStyle}`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  {/* Clean Gothic Chinese Text */}
                  <span className="text-xl font-bold">{opt.hanzi}</span>
                  <span className="text-xs font-mono text-slate-500">({opt.pinyin})</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => speak(opt.hanzi, e)}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
                    title="発音を聞く"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {isAnswered && idx === correctAnswerIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== correctAnswerIndex && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ❌ 不正解の時のみ「次へ進む →」ボタンと解説を表示する */}
        {isAnswered && !isCorrect && (
          <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 space-y-3 animate-pop">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-extrabold text-base text-red-800">
                <XCircle className="w-5 h-5 text-red-600" />
                <span>正解は 「{currentItem.hanzi} ({currentItem.pinyin})」 です</span>
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
              理解した！次へ進む →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
