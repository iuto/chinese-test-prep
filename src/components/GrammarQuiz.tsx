import React, { useState, useEffect } from 'react';
import { QuizItem } from '../types';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw, Award, Sparkles, Flame, Zap, Trophy, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface GrammarQuizProps {
  quizList: QuizItem[];
  onCorrectAnswer?: () => void;
  comboCount: number;
}

export const GrammarQuiz: React.FC<GrammarQuizProps> = ({ 
  quizList, 
  onCorrectAnswer,
  comboCount 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [shakeScreen, setShakeScreen] = useState<boolean>(false);
  const [dopaText, setDopaText] = useState<string | null>(null);

  // Filtered Quiz List
  const filteredQuizList = quizList.filter(
    (q) => selectedCategory === 'ALL' || q.category === selectedCategory
  );

  const currentQuiz = filteredQuizList[currentIndex];

  // Hyper Dopamine Phrases
  const dopaPhrases = [
    '【神】脳汁ドバドバきたあああ！🧠💥',
    '天才かよww 単位回収確定！🎉',
    '語順パーフェクト！神回答乙！⚡️',
    '圧倒的成長ww 脳破壊レベル！🔥',
    '草ww 強すぎて単位が逃げていく！👑',
  ];

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setDopaText(null);
  }, [currentIndex, selectedCategory, quizList]);

  // Handle Option Select
  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQuiz.correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      if (onCorrectAnswer) onCorrectAnswer();

      // Sound & Dopamine FX
      if (comboCount >= 2) {
        sounds.playCombo();
      } else {
        sounds.playCorrect();
      }
      triggerConfettiBurst();

      const randomPhrase = dopaPhrases[Math.floor(Math.random() * dopaPhrases.length)];
      setDopaText(randomPhrase);
    } else {
      sounds.playWrong();
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 500);
    }
  };

  // Reorder Check
  const handleCheckReorder = (userAnswer: string[]) => {
    if (isAnswered || !currentQuiz || !currentQuiz.correctReorder) return;
    setIsAnswered(true);

    const correct =
      userAnswer.length === currentQuiz.correctReorder.length &&
      userAnswer.every((val, i) => val === currentQuiz.correctReorder![i]);

    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
      if (onCorrectAnswer) onCorrectAnswer();
      
      if (comboCount >= 2) {
        sounds.playCombo();
      } else {
        sounds.playCorrect();
      }
      triggerConfettiBurst();

      const randomPhrase = dopaPhrases[Math.floor(Math.random() * dopaPhrases.length)];
      setDopaText(randomPhrase);
    } else {
      sounds.playWrong();
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 500);
    }
  };

  const triggerConfettiBurst = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#8b5cf6', '#eab308', '#10b981', '#3b82f6'],
      });
    } catch (e) {}
  };

  const handleNextQuiz = () => {
    if (currentIndex < filteredQuizList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      sounds.playLevelUp();
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizFinished(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  const categories = ['ALL', '時点vs時量', '从・到・离', '結果補語', '二vs两'];

  if (filteredQuizList.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-900 border-2 border-slate-800 rounded-3xl p-8">
        <HelpCircle className="w-12 h-12 text-pink-400 mx-auto mb-2 animate-bounce" />
        <p className="text-white font-black text-lg">該当する問題が見つからん！</p>
        <button
          onClick={() => setSelectedCategory('ALL')}
          className="mt-4 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-2xl text-xs shadow-lg"
        >
          全問題解放
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto space-y-6 ${shakeScreen ? 'animate-shake' : ''}`}>
      {/* Category Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar bg-slate-900/90 p-2 rounded-2xl border border-pink-500/30">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              handleRestart();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white shadow-lg border border-pink-300 scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat === 'ALL' ? '🔥 全バトル' : cat}
          </button>
        ))}
      </div>

      {/* Quiz Finished Screen */}
      {quizFinished ? (
        <div className="bg-slate-900 border-4 border-yellow-400 rounded-3xl p-8 text-center shadow-2xl space-y-6 animate-pop">
          <div className="inline-flex p-5 rounded-full bg-yellow-400/20 border-4 border-yellow-400 text-yellow-300 animate-bounce">
            <Trophy className="w-20 h-20" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-yellow-300 neon-text-yellow">
              🎉 全問無事死亡！！単位確定！！ 🎉
            </h2>
            <p className="text-slate-300 text-base font-extrabold mt-2">
              {filteredQuizList.length}問中 <span className="text-pink-400 font-black text-2xl">{score}</span> 問正解！
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl text-sm font-black text-cyan-300 border border-cyan-500/40">
            脳汁達成率: {Math.round((score / filteredQuizList.length) * 100)}% 🔥 【神ランク認定】
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 hover:scale-105 text-white rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-5 h-5" /> もう一度脳汁を出す！
          </button>
        </div>
      ) : (
        /* Active Quiz Card */
        <div className="bg-slate-900/95 border-2 border-pink-500/40 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Header */}
          <div className="bg-slate-950 px-6 py-4 border-b border-pink-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-pink-500/20 text-pink-300 font-black text-xs px-3 py-1 rounded-full border border-pink-500/50">
                {currentQuiz.category}
              </span>
              <span className="text-xs text-slate-400 font-black">
                第 {currentIndex + 1} / {filteredQuizList.length} 問
              </span>
            </div>

            <div className="flex items-center gap-3">
              {comboCount > 0 && (
                <span className="flex items-center gap-1 font-black text-yellow-300 text-xs bg-yellow-400/20 px-2.5 py-1 rounded-full border border-yellow-400/40 animate-pulse-fast">
                  <Flame className="w-3.5 h-3.5" /> {comboCount} COMBO
                </span>
              )}
              <span className="text-xs font-black text-slate-300">
                SCORE: <strong className="text-yellow-400 text-base">{score}</strong>
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-black text-white leading-snug tracking-wide">
                {currentQuiz.question}
              </h3>
              {currentQuiz.promptJp && (
                <p className="text-xs text-amber-300 mt-2 bg-amber-950/60 p-3 rounded-xl border border-amber-500/40 font-bold">
                  💡 {currentQuiz.promptJp}
                </p>
              )}
            </div>

            {/* Multiple Choice Options */}
            {currentQuiz.type === 'multiple_choice' && currentQuiz.options && (
              <div className="space-y-3">
                {currentQuiz.options.map((opt, idx) => {
                  let btnStyle = 'border-slate-700 bg-slate-800/80 hover:border-pink-500 text-white hover:bg-slate-800';

                  if (isAnswered) {
                    if (idx === currentQuiz.correctAnswerIndex) {
                      btnStyle = 'border-emerald-400 bg-emerald-950 text-emerald-200 font-black ring-4 ring-emerald-500/50 scale-102';
                    } else if (idx === selectedOption) {
                      btnStyle = 'border-pink-500 bg-pink-950 text-pink-200 font-black';
                    } else {
                      btnStyle = 'border-slate-800 bg-slate-900 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-base ${btnStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-slate-700 flex items-center justify-center text-xs font-black text-pink-300 border border-pink-500/30">
                          {['A', 'B', 'C', 'D'][idx]}
                        </span>
                        {opt}
                      </span>

                      {isAnswered && idx === currentQuiz.correctAnswerIndex && (
                        <CheckCircle className="w-6 h-6 text-emerald-400 animate-bounce" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQuiz.correctAnswerIndex && (
                        <XCircle className="w-6 h-6 text-pink-500" />
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

            {/* Dopa Phrase Pop-up Banner */}
            {dopaText && (
              <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-yellow-400 text-white p-3.5 rounded-2xl font-black text-center text-sm shadow-xl animate-pop border-2 border-yellow-300 tracking-wider">
                {dopaText}
              </div>
            )}

            {/* Answer Result & Explanation Banner */}
            {isAnswered && (
              <div className={`p-5 rounded-2xl space-y-3 transition-all ${
                isCorrect 
                  ? 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-100' 
                  : 'bg-pink-950/80 border-2 border-pink-500 text-pink-100'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <Zap className="w-6 h-6 text-yellow-300 animate-bounce" />
                      <span className="font-black text-emerald-300 text-lg">正解！脳汁MAX！</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-pink-400" />
                      <span className="font-black text-pink-300 text-lg">ミス！次で取り返せ！</span>
                    </>
                  )}
                </div>

                {currentQuiz.grammarNote && (
                  <div className="text-xs font-black bg-slate-900/90 p-2.5 rounded-xl text-yellow-300 border border-yellow-400/40">
                    📐 脳死公式: {currentQuiz.grammarNote}
                  </div>
                )}

                <p className="text-xs text-slate-200 leading-relaxed font-bold">
                  {currentQuiz.explanation}
                </p>

                <button
                  onClick={handleNextQuiz}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2 mt-2 transition-all"
                >
                  {currentIndex === filteredQuizList.length - 1 ? '最終判定へ！' : '次のバトルへ →'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
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
      {/* Target User Sentence Drop Zone */}
      <div className="min-h-[70px] p-4 bg-slate-950 border-2 border-dashed border-pink-500/40 rounded-2xl flex flex-wrap gap-2.5 items-center">
        {userTokens.length === 0 && (
          <span className="text-xs text-slate-500 font-bold italic">
            下のカードをタップして神語順を作れ！
          </span>
        )}
        {userTokens.map((t, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => removeToken(t, idx)}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-black rounded-xl shadow-md hover:scale-105 transition-all"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Available Token Pool */}
      <div className="flex flex-wrap gap-2.5">
        {availableTokens.map((t, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => addToken(t, idx)}
            className="px-4 py-2.5 bg-slate-800 border-2 border-pink-500/30 text-white text-sm font-black rounded-xl shadow-md hover:border-pink-500 hover:bg-slate-700 hover:scale-105 transition-all"
          >
            {t}
          </button>
        ))}
      </div>

      {!isAnswered && (
        <button
          disabled={userTokens.length === 0}
          onClick={() => onCheck(userTokens)}
          className={`w-full py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all ${
            userTokens.length > 0
              ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 hover:scale-102 text-white'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          解答を叩き込む！⚡️
        </button>
      )}
    </div>
  );
};
