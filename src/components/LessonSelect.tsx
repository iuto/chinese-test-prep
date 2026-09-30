import React, { useState } from 'react';
import { Lesson } from '../types';
import { BookOpen, HelpCircle, FileText, CheckSquare, Square, ArrowRight, Layers, Sparkles } from 'lucide-react';

interface LessonSelectProps {
  lessons: Lesson[];
  onStartGame: (selectedLessonIds: string[], mode: 'vocab' | 'quiz' | 'cheat_sheet') => void;
}

export const LessonSelect: React.FC<LessonSelectProps> = ({
  lessons,
  onStartGame,
}) => {
  const [selectedMode, setSelectedMode] = useState<'vocab' | 'quiz' | 'cheat_sheet'>('vocab');
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>(['lesson7']);

  const toggleLesson = (id: string) => {
    if (selectedLessonIds.includes(id)) {
      if (selectedLessonIds.length === 1) {
        alert('少なくとも1つの課を選択してください。');
        return;
      }
      setSelectedLessonIds(selectedLessonIds.filter((item) => item !== id));
    } else {
      setSelectedLessonIds([...selectedLessonIds, id]);
    }
  };

  const selectAll = () => {
    setSelectedLessonIds(lessons.map((l) => l.id));
  };

  const deselectAll = () => {
    setSelectedLessonIds(['lesson7']);
  };

  // Calculate total counts for selected lessons
  const totalVocabCount = lessons
    .filter((l) => selectedLessonIds.includes(l.id))
    .reduce((acc, curr) => acc + curr.vocabCount, 0);

  const totalQuizCount = lessons
    .filter((l) => selectedLessonIds.includes(l.id))
    .reduce((acc, curr) => acc + curr.quizCount, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white p-8 rounded-3xl shadow-lg space-y-2">
        <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          テスト対策カスタムモード
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight">
          ゲームモードとテスト対象の課を選択
        </h1>
        <p className="text-xs sm:text-sm text-red-100 max-w-xl">
          やりたいゲーム形式と、テスト範囲の「課」を複数えらんで一括プレイできます！
        </p>
      </div>

      {/* STEP 1: Select Game Mode */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-red-700 text-white font-black text-xs flex items-center justify-center">
            1
          </span>
          <h2 className="text-lg font-extrabold text-slate-800">
            ゲームモードを選択してください
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedMode('vocab')}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              selectedMode === 'vocab'
                ? 'border-red-600 bg-red-50 text-red-950 font-bold ring-2 ring-red-400/50 shadow-md'
                : 'border-slate-200 bg-white hover:border-red-300 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <BookOpen className={`w-6 h-6 ${selectedMode === 'vocab' ? 'text-red-700' : 'text-slate-400'}`} />
              {selectedMode === 'vocab' && <span className="text-xs font-black text-red-700 bg-red-100 px-2 py-0.5 rounded-full">選択中</span>}
            </div>
            <h3 className="font-extrabold text-base">単語暗記ゲーム</h3>
            <p className="text-xs text-slate-500 mt-1">日本語 ➔ 中国語4択一問一答</p>
          </button>

          <button
            onClick={() => setSelectedMode('quiz')}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              selectedMode === 'quiz'
                ? 'border-red-600 bg-red-50 text-red-950 font-bold ring-2 ring-red-400/50 shadow-md'
                : 'border-slate-200 bg-white hover:border-red-300 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <HelpCircle className={`w-6 h-6 ${selectedMode === 'quiz' ? 'text-red-700' : 'text-slate-400'}`} />
              {selectedMode === 'quiz' && <span className="text-xs font-black text-red-700 bg-red-100 px-2 py-0.5 rounded-full">選択中</span>}
            </div>
            <h3 className="font-extrabold text-base">文法クイズゲーム</h3>
            <p className="text-xs text-slate-500 mt-1">4択 & 語順並べ替え問題</p>
          </button>

          <button
            onClick={() => setSelectedMode('cheat_sheet')}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              selectedMode === 'cheat_sheet'
                ? 'border-red-600 bg-red-50 text-red-950 font-bold ring-2 ring-red-400/50 shadow-md'
                : 'border-slate-200 bg-white hover:border-red-300 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className={`w-6 h-6 ${selectedMode === 'cheat_sheet' ? 'text-red-700' : 'text-slate-400'}`} />
              {selectedMode === 'cheat_sheet' && <span className="text-xs font-black text-red-700 bg-red-100 px-2 py-0.5 rounded-full">選択中</span>}
            </div>
            <h3 className="font-extrabold text-base">文法まとめシート</h3>
            <p className="text-xs text-slate-500 mt-1">重要公式・ポイント一覧</p>
          </button>
        </div>
      </div>

      {/* STEP 2: Select Lessons (Multi-select Checkboxes) */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-700 text-white font-black text-xs flex items-center justify-center">
              2
            </span>
            <h2 className="text-lg font-extrabold text-slate-800">
              対象の「課」をえらんでください（複数選択可）
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={selectAll}
              className="text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-red-200"
            >
              すべて選択
            </button>
            <button
              onClick={deselectAll}
              className="text-slate-500 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200"
            >
              リセット
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson) => {
            const isSelected = selectedLessonIds.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => toggleLesson(lesson.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-red-600 bg-red-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-red-700">
                    {isSelected ? (
                      <CheckSquare className="w-6 h-6 text-red-700 fill-red-100" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                      {lesson.title}
                      <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                        {lesson.badge}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{lesson.description}</p>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-400 hidden sm:block">
                  単語 {lesson.vocabCount}語 / クイズ {lesson.quizCount}問
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: START BUTTON */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider">選択範囲の合計</span>
          <h3 className="text-xl font-extrabold text-white">
            選択した {selectedLessonIds.length} つの課でプレイ（
            {selectedMode === 'vocab' ? `${totalVocabCount} 単語` : `${totalQuizCount} 問題`}
            ）
          </h3>
        </div>

        <button
          onClick={() => onStartGame(selectedLessonIds, selectedMode)}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-2xl font-black text-base shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-102"
        >
          🚀 一問一答ゲームスタート！ <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
