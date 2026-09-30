import React from 'react';
import { Lesson } from '../types';
import { BookOpen, CheckCircle, ArrowRight, Sparkles, Lock, Layers } from 'lucide-react';

interface LessonSelectProps {
  lessons: Lesson[];
  onSelectLesson: (lessonId: string, mode: 'vocab' | 'quiz' | 'cheat_sheet') => void;
}

export const LessonSelect: React.FC<LessonSelectProps> = ({
  lessons,
  onSelectLesson,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-700 to-rose-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            テスト対策モード
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            学習する課を選択してください
          </h1>
          <p className="text-sm text-red-100 max-w-xl">
            教科書の課ごとに「単語暗記」と「文法クイズ」をゲーム形式で復習できます。
          </p>
        </div>
        <div className="absolute right-6 -bottom-6 opacity-10 text-9xl font-black select-none pointer-events-none">
          🇨🇳
        </div>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`bg-white rounded-3xl border-2 p-6 transition-all flex flex-col justify-between ${
              lesson.isUnlocked
                ? 'border-slate-200 hover:border-red-500 hover:shadow-xl'
                : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-red-700">
                  LESSON {lesson.number}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    lesson.isUnlocked
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {lesson.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-800">
                  {lesson.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {lesson.description}
                </p>
              </div>

              {lesson.isUnlocked && (
                <div className="flex items-center gap-4 text-xs font-bold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-red-600" /> 単語 {lesson.vocabCount} 語
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-4 h-4 text-rose-600" /> クイズ {lesson.quizCount} 問
                  </span>
                </div>
              )}
            </div>

            {/* Mode Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              {lesson.isUnlocked ? (
                <>
                  <button
                    onClick={() => onSelectLesson(lesson.id, 'vocab')}
                    className="w-full py-3 bg-red-700 hover:bg-red-800 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    📖 単語暗記ゲームをはじめる <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectLesson(lesson.id, 'quiz')}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    ✏️ 文法クイズゲームをはじめる <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="w-full py-3 bg-slate-200 text-slate-500 rounded-2xl font-bold text-xs flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> 次回のテスト範囲です
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
