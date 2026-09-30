import React, { useState, useEffect } from 'react';
import { QuizItem } from '../types';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw, Award, Lightbulb, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrammarQuizProps {
  quizList: QuizItem[];
}

export const GrammarQuiz: React.FC<GrammarQuizProps> = ({ quizList }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [reorderList, setReorderList] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filtered Quiz List
  const filteredQuizList = quizList.filter(
    (q) => selectedCategory === 'ALL' || q.category === selectedCategory
  );

  const currentQuiz = filteredQuizList[currentIndex];

  // Reset state when switching category or quiz index
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    if (currentQuiz && currentQuiz.type === 'reorder' && currentQuiz.tokens) {
      // Shuffle tokens for reorder quiz
      const shuffled = [...currentQuiz.tokens].sort(() => Math.random() - 0.5);
      setReorderList(shuffled);
    } else {
      setReorderList([]);
    }
  }, [currentIndex, selectedCategory, quizList]);

  // Handle multiple choice selection
  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQuiz.correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      triggerConfetti();
    }
  };

  // Handle Token Reorder Click
  const handleTokenClick = (token: string, sourceIndex: number) => {
    if (isAnswered) return;
    // Move from tokens pool to user answer or vice versa
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
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {
      // fallback if confetti fails
    }
  };

  const handleNextQuiz = () => {
    if (currentIndex < filteredQuizList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
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
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
        <p className="text-slate-600 font-bold">該当する問題が見つかりません。</p>
        <button
          onClick={() => setSelectedCategory('ALL')}
          className="mt-4 px-4 py-2 bg-red-700 text-white rounded-lg text-xs font-bold"
        >
          すべての問題を表示
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Category Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar bg-slate-100 p-2 rounded-xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              handleRestart();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-red-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {cat === 'ALL' ? '全カテゴリー' : cat}
          </button>
        ))}
      </div>

      {/* Quiz Finished Screen */}
      {quizFinished ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-md space-y-5">
          <div className="inline-flex p-4 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-500">
            <Award className="w-16 h-16 animate-bounce" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">全クイズ完了！</h2>
            <p className="text-slate-500 text-sm mt-1">
              {filteredQuizList.length}問中 <span className="text-red-700 font-extrabold text-lg">{score}</span> 問正解しました！
            </p>
          </div>

          <div className="w-full bg-slate-100 rounded-xl p-4 text-xs font-bold text-slate-600">
            正解率: {Math.round((score / filteredQuizList.length) * 100)}%
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> もう一度挑戦する
          </button>
        </div>
      ) : (
        /* Active Quiz Card */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-50 px-6 py-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-red-100 text-red-800 font-extrabold text-xs px-2.5 py-1 rounded-full border border-red-200">
                {currentQuiz.category}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                第 {currentIndex + 1} / {filteredQuizList.length} 問
              </span>
            </div>
            <span className="text-xs font-bold text-slate-500">
              スコア: <strong className="text-red-700 text-sm">{score}</strong>
            </span>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            <div>
              <h3 className="text-xl font-extrabold text-slate-800 leading-snug">
                {currentQuiz.question}
              </h3>
              {currentQuiz.promptJp && (
                <p className="text-xs text-slate-500 mt-2 bg-amber-50 p-2.5 rounded-lg border border-amber-200/60 font-medium">
                  💡 {currentQuiz.promptJp}
                </p>
              )}
            </div>

            {/* Multiple Choice Options */}
            {currentQuiz.type === 'multiple_choice' && currentQuiz.options && (
              <div className="space-y-2.5">
                {currentQuiz.options.map((opt, idx) => {
                  let btnStyle = 'border-slate-200 hover:border-red-400 bg-white text-slate-700';

                  if (isAnswered) {
                    if (idx === currentQuiz.correctAnswerIndex) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400/50';
                    } else if (idx === selectedOption) {
                      btnStyle = 'border-red-400 bg-red-50 text-red-900 font-bold';
                    } else {
                      btnStyle = 'border-slate-200 bg-slate-50 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between font-medium text-sm sm:text-base ${btnStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {['A', 'B', 'C', 'D'][idx]}
                        </span>
                        {opt}
                      </span>

                      {isAnswered && idx === currentQuiz.correctAnswerIndex && (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
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

            {/* Answer Result & Explanation Banner */}
            {isAnswered && (
              <div className={`p-4 rounded-xl space-y-3 transition-all ${
                isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="font-extrabold text-emerald-800 text-base">正解！太棒了！</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-extrabold text-red-800 text-base">残念！不正解です</span>
                    </>
                  )}
                </div>

                {currentQuiz.grammarNote && (
                  <div className="text-xs font-bold bg-white/80 p-2 rounded-md text-slate-700 border border-slate-200">
                    📐 公式: {currentQuiz.grammarNote}
                  </div>
                )}

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {currentQuiz.explanation}
                </p>

                <button
                  onClick={handleNextQuiz}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  {currentIndex === filteredQuizList.length - 1 ? '結果を見る' : '次の問題へ'} <ArrowRight className="w-4 h-4" />
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
      <div className="min-h-[60px] p-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-wrap gap-2 items-center">
        {userTokens.length === 0 && (
          <span className="text-xs text-slate-400 font-medium italic">
            下の単語カードをタップして並べ替えてください
          </span>
        )}
        {userTokens.map((t, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => removeToken(t, idx)}
            className="px-3 py-1.5 bg-red-700 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-red-800 transition-all"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Available Token Pool */}
      <div className="flex flex-wrap gap-2">
        {availableTokens.map((t, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => addToken(t, idx)}
            className="px-3.5 py-2 bg-white border-2 border-slate-300 text-slate-800 text-sm font-bold rounded-lg shadow-sm hover:border-red-500 hover:bg-red-50 transition-all"
          >
            {t}
          </button>
        ))}
      </div>

      {!isAnswered && (
        <button
          disabled={userTokens.length === 0}
          onClick={() => onCheck(userTokens)}
          className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
            userTokens.length > 0
              ? 'bg-red-700 hover:bg-red-800 text-white'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          解答を送信する
        </button>
      )}
    </div>
  );
};
