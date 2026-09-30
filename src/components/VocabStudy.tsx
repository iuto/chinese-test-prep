import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VocabItem } from '../types';
import { initialMonsters } from '../data/monsters';
import { Volume2, CheckCircle, XCircle, RotateCcw, HelpCircle, Zap, Heart, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';
import { PixelKnight, PixelDragon, PixelSkeleton, PixelSlime, PixelTorch } from './PixelSprites';

interface VocabStudyProps {
  vocabList: VocabItem[];
  onToggleMastered: (id: string) => void;
  onResetMastered: () => void;
}

export const VocabStudy: React.FC<VocabStudyProps> = ({
  vocabList,
  onToggleMastered,
}) => {
  const [shuffledList, setShuffledList] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // RPG Player & Monster State
  const [playerHp, setPlayerHp] = useState<number>(100);
  const maxPlayerHp = 100;
  const [playerLevel, setPlayerLevel] = useState<number>(1);
  const [playerXp, setPlayerXp] = useState<number>(0);

  const [monsterIndex, setMonsterIndex] = useState<number>(0);
  const [monsterHp, setMonsterHp] = useState<number>(initialMonsters[0].maxHp);
  const [damagePopup, setDamagePopup] = useState<{ amount: number; isCritical: boolean; label?: string } | null>(null);
  const [monsterHit, setMonsterHit] = useState<boolean>(false);
  const [heroAttacking, setHeroAttacking] = useState<boolean>(false);
  const [isPlayerHit, setIsPlayerHit] = useState<boolean>(false);

  const questionStartTimeRef = useRef<number>(Date.now());

  // Items State
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({
    hint_5050: 2,
    double_damage: 1,
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

  // 4-choice options generator
  const options = useMemo(() => {
    if (!currentItem || shuffledList.length === 0) return [];
    const others = shuffledList.filter((v) => v.id !== currentItem.id);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    const combined = [currentItem, ...shuffledOthers].sort(() => Math.random() - 0.5);
    return combined;
  }, [currentIndex, currentItem, shuffledList]);

  const correctAnswerIndex = options.findIndex((opt) => opt.id === currentItem?.id);

  // Reset state on new question
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setHiddenOptionIndices([]);
    questionStartTimeRef.current = Date.now();
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
  }, [currentIndex, shuffledList]);

  // Subtle Background Passive Damage Loop (-2 HP every 4s, NO visual timer gauge)
  useEffect(() => {
    if (isAnswered || playerHp <= 0 || shuffledList.length === 0) return;

    const timer = setInterval(() => {
      setPlayerHp((hp) => Math.max(0, hp - 2));
    }, 4000);

    return () => clearInterval(timer);
  }, [isAnswered, playerHp, shuffledList]);

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
      const reshuffled = [...vocabList].sort(() => Math.random() - 0.5);
      setShuffledList(reshuffled);
      setCurrentIndex(0);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || playerHp <= 0) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const correct = idx === correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      const responseTimeSec = (Date.now() - questionStartTimeRef.current) / 1000;
      const isSpeedAttack = responseTimeSec <= 2.5;

      let baseDmg = isDoubleDamageActive ? 60 : 30;
      if (isSpeedAttack) baseDmg = Math.round(baseDmg * 1.5);
      const finalDmg = baseDmg;
      const isCrit = isDoubleDamageActive || isSpeedAttack;

      // Attack Animation & Sound
      setHeroAttacking(true);
      setTimeout(() => setHeroAttacking(false), 250);

      if (isCrit) {
        sounds.playCriticalAttack();
        setIsDoubleDamageActive(false);
      } else {
        sounds.playAttack();
      }

      setDamagePopup({
        amount: finalDmg,
        isCritical: isCrit,
        label: isSpeedAttack ? '⚡ SPEED STRIKE!' : isDoubleDamageActive ? '💥 2倍ダメージ!' : undefined,
      });
      setMonsterHit(true);
      setTimeout(() => setMonsterHit(false), 400);

      const newHp = Math.max(0, monsterHp - finalDmg);
      setMonsterHp(newHp);

      // Defeat Monster
      if (newHp === 0) {
        sounds.playVictory();
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
        } catch (e) {}

        // Defeat Bonus: Heal Player 25 HP
        setPlayerHp((hp) => Math.min(maxPlayerHp, hp + 25));

        const xpGained = isSpeedAttack ? Math.round(currentMonster.rewardXp * 1.3) : currentMonster.rewardXp;
        const nextXp = playerXp + xpGained;
        const xpNeeded = playerLevel * 100;

        if (nextXp >= xpNeeded) {
          sounds.playLevelUp();
          setPlayerLevel((lvl) => lvl + 1);
          setPlayerXp(nextXp - xpNeeded);
          setPlayerHp(maxPlayerHp); // Full heal on level up
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

      if (!currentItem.isMastered) {
        onToggleMastered(currentItem.id);
      }

      autoNextTimerRef.current = setTimeout(() => {
        setDamagePopup(null);
        handleNext();
      }, 750);
    } else {
      // Wrong Answer -> Monster Hits Player (-15 HP)
      sounds.playPlayerHurt();
      setIsPlayerHit(true);
      setTimeout(() => setIsPlayerHit(false), 350);
      setPlayerHp((hp) => Math.max(0, hp - 15));
    }
  };

  // "わからない" (Don't Know / Skip) Handler
  const handleDontKnow = () => {
    if (isAnswered || playerHp <= 0) return;
    setIsAnswered(true);
    setIsCorrect(false);
    setSelectedOption(null);
    sounds.playPlayerHurt();
  };

  const useHint5050 = () => {
    if (itemCounts.hint_5050 <= 0 || isAnswered || playerHp <= 0) return;
    sounds.playItemUse();
    setItemCounts((prev) => ({ ...prev, hint_5050: prev.hint_5050 - 1 }));

    const incorrectIndices = options
      .map((_, i) => i)
      .filter((i) => i !== correctAnswerIndex);
    const shuffledIncorrect = [...incorrectIndices].sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptionIndices(shuffledIncorrect);
  };

  const useDoubleDamage = () => {
    if (itemCounts.double_damage <= 0 || isDoubleDamageActive || playerHp <= 0) return;
    sounds.playItemUse();
    setItemCounts((prev) => ({ ...prev, double_damage: prev.double_damage - 1 }));
    setIsDoubleDamageActive(true);
  };

  const handleContinueGame = () => {
    setPlayerHp(maxPlayerHp);
  };

  const handleRestart = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    const reshuffled = [...vocabList].sort(() => Math.random() - 0.5);
    setShuffledList(reshuffled);
    setCurrentIndex(0);
    setMonsterHp(currentMonster.maxHp);
    setPlayerHp(maxPlayerHp);
    setIsAnswered(false);
    setSelectedOption(null);
    setDamagePopup(null);
  };

  if (shuffledList.length === 0 || !currentItem) {
    return (
      <div className="text-center py-16 pixel-box rounded-2xl">
        <p className="font-bold text-slate-300">単語データがありません。サイドバーで「課」を選択してください。</p>
      </div>
    );
  }

  const xpNeeded = playerLevel * 100;
  const xpPercent = Math.min(100, Math.round((playerXp / xpNeeded) * 100));

  const renderMonsterSprite = () => {
    const type = monsterIndex % 3;
    if (type === 0) return <PixelDragon isHit={monsterHit} />;
    if (type === 1) return <PixelSkeleton isHit={monsterHit} />;
    return <PixelSlime isHit={monsterHit} />;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 relative">
      {/* 💀 GAME OVER OVERLAY MODAL */}
      {playerHp <= 0 && (
        <div className="absolute inset-0 bg-slate-950/95 z-50 rounded-2xl flex flex-col items-center justify-center p-6 space-y-5 border-4 border-rose-600 shadow-2xl">
          <div className="font-nes text-3xl sm:text-4xl text-rose-500 animate-pulse">
            GAME OVER
          </div>
          <p className="text-sm font-bold text-slate-300 text-center">
            モンスターの攻撃でHPが0になりました！
          </p>
          <button
            onClick={handleContinueGame}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded border-2 border-amber-300 shadow-lg flex items-center gap-2"
          >
            <Flame className="w-5 h-5 text-red-700" /> HP100%回復してリトライ！ ▶️
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. RETRO 8-BIT TOP STATUS HUD                              */}
      {/* ========================================================= */}
      <div className="pixel-box p-3 sm:p-4 rounded-xl space-y-2 select-none">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200 border-b border-slate-700 pb-2">
          {/* Player LV & HP & EXP */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="bg-red-700 text-white font-nes text-[10px] px-2 py-0.5 border border-red-500 rounded">
              LV.{playerLevel}
            </span>

            {/* Player HP Meter */}
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <div className="w-20 sm:w-28 bg-slate-800 h-3 border border-slate-600 overflow-hidden relative">
                <div
                  className="bg-rose-500 h-full transition-all duration-200"
                  style={{ width: `${(playerHp / maxPlayerHp) * 100}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-white">
                  HP {playerHp}/{maxPlayerHp}
                </span>
              </div>
            </div>

            {/* EXP Bar */}
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-yellow-400 font-bold text-[10px]">EXP</span>
              <div className="w-16 bg-slate-800 h-2 border border-slate-600 overflow-hidden">
                <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${xpPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Restart */}
          <button
            onClick={handleRestart}
            className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 再シャッフル
          </button>
        </div>

        {/* Item Counter Bar */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={useHint5050}
              disabled={itemCounts.hint_5050 <= 0 || isAnswered || playerHp <= 0}
              className={`px-2 py-1 rounded border text-xs font-bold flex items-center gap-1 transition-all ${
                itemCounts.hint_5050 > 0 && !isAnswered
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-300 border-amber-500/60'
                  : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
              50/50 (<span className="font-mono">{itemCounts.hint_5050}</span>)
            </button>

            <button
              onClick={useDoubleDamage}
              disabled={itemCounts.double_damage <= 0 || isDoubleDamageActive || isAnswered || playerHp <= 0}
              className={`px-2 py-1 rounded border text-xs font-bold flex items-center gap-1 transition-all ${
                isDoubleDamageActive
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-300 animate-pulse'
                  : itemCounts.double_damage > 0 && !isAnswered
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-amber-500/60'
                  : 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {isDoubleDamageActive ? '2倍中!' : `2倍 (${itemCounts.double_damage})`}
            </button>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            問 {currentIndex + 1} / {shuffledList.length}
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. 8-BIT 2D RETRO SIDE-VIEW BATTLE STAGE                   */}
      {/* ========================================================= */}
      <div className={`relative h-48 sm:h-56 bg-slate-950 rounded-xl border-4 border-slate-700 overflow-hidden shadow-2xl flex flex-col justify-between ${
        isPlayerHit ? 'ring-4 ring-rose-600 animate-pulse' : ''
      }`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px]" />

        <div className="absolute top-4 left-10 z-10"><PixelTorch /></div>
        <div className="absolute top-4 right-10 z-10"><PixelTorch /></div>

        {/* Monster HP Progress Gauge */}
        <div className="absolute top-3 left-0 right-0 z-20 flex justify-center">
          <div className="bg-slate-900/90 border border-slate-600 px-4 py-1 rounded-full flex items-center gap-3">
            <span className="font-bold text-xs text-rose-400 flex items-center gap-1">
              👾 {currentMonster.name}
            </span>
            <div className="w-28 sm:w-36 bg-slate-800 h-3 border border-slate-600 rounded-none overflow-hidden relative">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(monsterHp / currentMonster.maxHp) * 100}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-white">
                {monsterHp}/{currentMonster.maxHp}
              </span>
            </div>
          </div>
        </div>

        {/* Battle Arena Characters */}
        <div className="flex-1 flex items-end justify-between px-6 sm:px-12 pb-4 relative z-10">
          {/* Hero Knight (Left Platform) */}
          <div className="flex flex-col items-center">
            <PixelKnight isAttacking={heroAttacking} isHit={isPlayerHit} />
            <div className="w-20 sm:w-28 h-3 bg-slate-800 border-t-2 border-slate-600 rounded-none shadow-md" />
          </div>

          {/* Floating Damage Popup Animation */}
          {damagePopup && (
            <div className={`absolute right-16 sm:right-24 top-12 font-black text-2xl sm:text-3xl animate-damage z-30 flex flex-col items-center ${
              damagePopup.isCritical ? 'text-amber-400 scale-125' : 'text-red-500'
            }`}>
              {damagePopup.label && <span className="text-xs bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black mb-1">{damagePopup.label}</span>}
              -{damagePopup.amount} HP!
            </div>
          )}

          {/* Monster Sprite (Right Platform) */}
          <div className="flex flex-col items-center">
            {renderMonsterSprite()}
            <div className="w-24 sm:w-32 h-3 bg-slate-800 border-t-2 border-slate-600 rounded-none shadow-md" />
          </div>
        </div>

        <div className="h-3 bg-gradient-to-r from-orange-600 via-red-600 to-amber-500 border-t border-amber-400 opacity-90 animate-pulse" />
      </div>

      {/* ========================================================= */}
      {/* 3. CLASSIC NES BORDER DIALOG & 4-CHOICE OPTIONS            */}
      {/* ========================================================= */}
      <div className="pixel-box-gold p-4 sm:p-5 rounded-xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between text-xs">
          <span className="bg-amber-500 text-slate-950 font-bold px-2.5 py-0.5 rounded">
            {currentItem.category}
          </span>
          <span className="text-amber-300 font-bold flex items-center gap-1">
            ⚡ 2.5秒以内に即答で「SPEED STRIKE!」発動
          </span>
        </div>

        {/* Question Word (Japanese Meaning) */}
        <div className="bg-slate-950 p-4 border-2 border-slate-700 text-center rounded">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300">
            {currentItem.meaning}
          </h3>
        </div>

        {/* 4 Chinese Options */}
        <div className="space-y-2">
          {options.map((opt, idx) => {
            const isHidden = hiddenOptionIndices.includes(idx);
            let btnStyle = 'pixel-btn text-slate-100 hover:text-amber-300';

            if (isHidden) {
              btnStyle = 'opacity-20 border-slate-800 bg-slate-950 text-slate-700 pointer-events-none';
            } else if (isAnswered) {
              if (idx === correctAnswerIndex) {
                btnStyle = 'border-emerald-500 bg-emerald-950 text-emerald-300 font-bold ring-2 ring-emerald-500';
              } else if (idx === selectedOption) {
                btnStyle = 'border-rose-500 bg-rose-950 text-rose-300 font-bold';
              } else {
                btnStyle = 'opacity-40 border-slate-800 bg-slate-950';
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswered || isHidden || playerHp <= 0}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded border-2 transition-all flex items-center justify-between font-bold text-base sm:text-lg ${btnStyle}`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-nes text-xs text-amber-400">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span className="font-extrabold">{opt.hanzi}</span>
                  <span className="text-xs font-mono text-slate-400">({opt.pinyin})</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => speak(opt.hanzi, e)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-400"
                    title="発音を聞く"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {isAnswered && idx === correctAnswerIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 animate-bounce" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== correctAnswerIndex && (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ❓ 「わからない」 SKIP / GIVE UP BUTTON */}
        {!isAnswered && (
          <button
            disabled={playerHp <= 0}
            onClick={handleDontKnow}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded border border-slate-700 transition-all flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            ❓ わからない (正解と解説を表示)
          </button>
        )}

        {/* ❌ 不正解 ＆ わからない の時に正解・解説と次へボタンを表示 */}
        {isAnswered && !isCorrect && (
          <div className="p-4 rounded bg-rose-950/80 border-2 border-rose-600 space-y-3 animate-pop">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-300">
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>正解: 「{currentItem.hanzi} ({currentItem.pinyin})」</span>
              </div>

              <button
                onClick={() => speak(currentItem.hanzi)}
                className="flex items-center gap-1 text-xs font-bold text-rose-300 bg-slate-900 px-2.5 py-1 rounded border border-rose-800"
              >
                <Volume2 className="w-3.5 h-3.5" /> 発音を聞く
              </button>
            </div>

            {currentItem.notes && (
              <div className="text-xs font-bold bg-slate-900 p-2.5 rounded text-amber-200 border border-slate-700">
                💡 メモ: {currentItem.notes}
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded text-sm shadow-md flex items-center justify-center gap-2 mt-2 transition-all border border-amber-300"
            >
              理解した！次へ進む ▶️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
