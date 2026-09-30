import React, { useState } from 'react';
import { Lesson, VocabItem, QuizItem } from '../types';
import { BookOpen, HelpCircle, FileText, Settings, CheckSquare, Square, Trophy, ChevronRight, Menu, X } from 'lucide-react';
import { VocabStudy } from './VocabStudy';
import { GrammarQuiz } from './GrammarQuiz';
import { GrammarCheatSheet } from './GrammarCheatSheet';
import { DataEditor } from './DataEditor';

interface AppShellProps {
  lessons: Lesson[];
  vocabList: VocabItem[];
  quizList: QuizItem[];
  onSaveVocab: (list: VocabItem[]) => void;
  onSaveQuiz: (list: QuizItem[]) => void;
  onResetAllData: () => void;
  onToggleMastered: (id: string) => void;
  onResetMastered: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  lessons,
  vocabList,
  quizList,
  onSaveVocab,
  onSaveQuiz,
  onResetAllData,
  onToggleMastered,
  onResetMastered,
}) => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'quiz' | 'cheat_sheet' | 'editor'>('vocab');
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>(['lesson7']);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

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

  const selectAllLessons = () => {
    setSelectedLessonIds(lessons.map((l) => l.id));
  };

  // Filtered Vocab and Quiz for selected lessons
  const currentVocabList = vocabList.filter(
    (v) => selectedLessonIds.length === 0 || selectedLessonIds.includes(v.lessonId)
  );

  const currentQuizList = quizList.filter(
    (q) => selectedLessonIds.length === 0 || selectedLessonIds.includes(q.lessonId)
  );

  const masteredCount = currentVocabList.filter((v) => v.isMastered).length;

  return (
    <div className="h-screen w-screen bg-slate-100 flex overflow-hidden font-sans text-slate-800 antialiased">
      {/* ========================================================= */}
      {/* DESKTOP APP SIDEBAR (PC Main Layout: Left Fixed 280px)      */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-white border-r border-slate-800 shrink-0 select-none">
        {/* App Title Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-xl shadow-md">
            🇨🇳
          </div>
          <div>
            <h1 className="font-extrabold text-base text-white tracking-tight leading-tight">
              PayLog 中国語
            </h1>
            <p className="text-[11px] text-slate-400 font-bold">テスト対策 デスクトップApp</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
          {/* Section 1: Mode Select */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2">
              ゲームモード
            </span>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'vocab'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" /> 単語暗記ゲーム
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'quiz'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4" /> 文法クイズゲーム
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('cheat_sheet')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'cheat_sheet'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" /> 文法まとめシート
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'editor'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" /> データ編集・追加
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          {/* Section 2: Lesson Selector (Multi Checkbox) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                出題対象の課 (複数選択)
              </span>
              <button
                onClick={selectAllLessons}
                className="text-[10px] text-red-400 hover:underline font-bold"
              >
                全選択
              </button>
            </div>

            <div className="space-y-1 bg-slate-950 p-2 rounded-2xl border border-slate-800">
              {lessons.map((lesson) => {
                const isSelected = selectedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => toggleLesson(lesson.id)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-800 text-white font-bold border border-slate-700'
                        : 'text-slate-400 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-red-500 fill-red-950 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                      <span className="truncate max-w-[150px]">{lesson.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Progress HUD */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> 暗記進捗
              </span>
              <span className="text-red-400 font-extrabold">
                {masteredCount} / {currentVocabList.length} 語
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${Math.round((masteredCount / (currentVocabList.length || 1)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MAIN APP CANVAS (Right Column / PC & Mobile View)          */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile App Header (Visible only on mobile/tablet) */}
        <header className="lg:hidden bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🇨🇳</span>
            <h1 className="font-extrabold text-sm text-white">PayLog 中国語 App</h1>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Slide-over Drawer */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-extrabold text-white text-base">メニュー & 課の選択</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400">ゲームモード</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setActiveTab('vocab'); setIsMobileSidebarOpen(false); }}
                  className={`p-3 rounded-xl font-bold text-xs border ${activeTab === 'vocab' ? 'bg-red-700 text-white' : 'bg-slate-900 text-slate-300'}`}
                >
                  単語ゲーム
                </button>
                <button
                  onClick={() => { setActiveTab('quiz'); setIsMobileSidebarOpen(false); }}
                  className={`p-3 rounded-xl font-bold text-xs border ${activeTab === 'quiz' ? 'bg-red-700 text-white' : 'bg-slate-900 text-slate-300'}`}
                >
                  文法クイズ
                </button>
              </div>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto">
              <span className="text-xs font-bold text-slate-400">対象の課</span>
              {lessons.map((l) => (
                <div
                  key={l.id}
                  onClick={() => toggleLesson(l.id)}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-bold ${selectedLessonIds.includes(l.id) ? 'bg-slate-800 text-white border-red-500' : 'bg-slate-900 text-slate-400'}`}
                >
                  {selectedLessonIds.includes(l.id) ? <CheckSquare className="w-4 h-4 text-red-500" /> : <Square className="w-4 h-4" />}
                  {l.title}
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="w-full py-3 bg-red-700 text-white rounded-xl font-bold text-xs shadow-md"
            >
              決定してゲームへ戻る
            </button>
          </div>
        )}

        {/* Main App Content Body (Scrollable Container) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col justify-center">
          {activeTab === 'vocab' && (
            <VocabStudy
              vocabList={currentVocabList}
              onToggleMastered={onToggleMastered}
              onResetMastered={onResetMastered}
            />
          )}

          {activeTab === 'quiz' && (
            <GrammarQuiz
              quizList={currentQuizList}
              comboCount={0}
            />
          )}

          {activeTab === 'cheat_sheet' && <GrammarCheatSheet />}

          {activeTab === 'editor' && (
            <DataEditor
              vocabList={vocabList}
              quizList={quizList}
              onSaveVocab={onSaveVocab}
              onSaveQuiz={onSaveQuiz}
              onResetAllData={onResetAllData}
            />
          )}
        </main>
      </div>
    </div>
  );
};
