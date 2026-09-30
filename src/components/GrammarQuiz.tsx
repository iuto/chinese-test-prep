import React, { useState, useEffect } from 'react';
import { QuizItem } from '../types';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface GrammarQuizProps {
  quizList: QuizItem[];
  comboCount?: number;
}

export const GrammarQuiz: React.FC<GrammarQuizProps> = ({ quizList }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQuiz = quizList[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [currentIndex, quizList]);

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const correct = index === currentQuiz.correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      sounds.playCorrect();
      triggerConfetti();
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
      setScore((prev) => prev + 1);
      sounds.playCorrect();
      triggerConfetti();
    } else {
      sounds.playWrong();
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const handleNext = () => {
    if (currentIndex < quizList.length - 1) {
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

  if (quizList.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
        <p className="font-bold text-slate-600">問題データがありません。</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Game Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            文法1問1答ゲーム
          </span>
          <span className="text-xs font-bold text-slate-500">
            第 {currentIndex + 1} / {quizList.length} 問
          </span>
        </div>

        <div className="text-xs font-bold text-slate-700">
          スコア: <span className="text-red-700 font-extrabold text-sm">{score}</span>
        </div>
      </div>

      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / quizList.length) * 100}%` }}
        />
      </div>

      {/* Quiz Finished Screen */}
      {isFinished ? (
        <div className="bg-white rounded-3xl p-8 text-center border-2 border-slate-200 shadow-xl space-y-6">
          <div className="inline-flex p-4 rounded-full bg-amber-50 text-amber-500 border-2 border-amber-200">
            <Trophy className="w-16 h-16 animate-bounce" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">全問ゲームクリア！🎉</h2>
            <p className="text-sm font-bold text-slate-600 mt-2">
              {quizList.length}問中 <span className="text-red-700 font-extrabold text-xl">{score}</span> 問正解しました！
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-xs font-bold text-slate-600 border border-slate-200">
            正解率: {Math.round((score / quizList.length) * 100)}%
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-4 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> もう一度挑戦する
          </button>
        </div>
      ) : (
        /* Single Question Game Card */
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
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

          {/* Multiple Choice Options */}
          {currentQuiz.type === 'multiple_choice' && currentQuiz.options && (
            <div className="space-y-3">
              {currentQuiz.options.map((opt, idx) => {
                let btnStyle = 'border-slate-200 hover:border-red-400 bg-white text-slate-800';

                if (isAnswered) {
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
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between font-bold text-sm sm:text-base ${btnStyle}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border">
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

          {/* Result & Explanation */}
          {isAnswered && (
            <div className={`p-4 sm:p-5 rounded-2xl space-y-3 transition-all ${
              isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 font-extrabold text-base">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800">正解です！</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800">不正解です</span>
                  </>
                )}
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
                {currentIndex === quizList.length - 1 ? '結果を見る' : '次の問題へ進む →'}
              </button>
            </div>
          )}
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

      {/* Available Token Pool */}
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
          解答を送信する
        </button>
      )}
    </div>
  );
};
