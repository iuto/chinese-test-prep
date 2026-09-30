import React, { useState } from 'react';
import { Lesson, VocabItem, QuizItem } from '../types';
import { HelpCircle, FileText, Settings, CheckSquare, Square, Trophy, ChevronRight, Menu, X, Swords } from 'lucide-react';
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
    <div className="h-screen w-screen bg-slate-950 flex overflow-hidden font-sans text-slate-100 antialiased select-none">
      {/* ========================================================= */}
      {/* DESKTOP APP SIDEBAR (PC Main Layout: Left Fixed 280px)      */}
      {/* 8-bit NES Dark Theme & BIZ UDPGothic UD Font              */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 border-r-4 border-slate-800 shrink-0">
        {/* App Title & Unified Brand (中国語クエスト) */}
        <div className="p-5 border-b-2 border-slate-800 flex items-center gap-3 bg-slate-950">
          <div className="w-10 h-10 border-2 border-amber-400 bg-red-700 flex items-center justify-center text-xl shadow-md rounded">
            🇨🇳
          </div>
          <div>
            <h1 className="font-extrabold text-base text-amber-300 tracking-tight leading-tight flex items-center gap-1.5">
              中国語クエスト
              <span className="text-[9px] font-nes bg-red-600 text-white px-1 py-0.2 border border-red-400">8bit</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-bold">テスト対策 8bit RPGドリル</p>
          </div>
        </div>

        {/* Navigation & Lesson Selection */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
          {/* Section 1: Mode Select */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider px-2">
              ▶️ ゲームモード
            </span>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded border-2 transition-all font-bold text-xs ${
                activeTab === 'vocab'
                  ? 'bg-red-800 text-white border-red-500 shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Swords className="w-4 h-4 text-rose-400" /> 単語暗記バトル
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded border-2 transition-all font-bold text-xs ${
                activeTab === 'quiz'
                  ? 'bg-red-800 text-white border-red-500 shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-400" /> 文法クイズバトル
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('cheat_sheet')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded border-2 transition-all font-bold text-xs ${
                activeTab === 'cheat_sheet'
                  ? 'bg-red-800 text-white border-red-500 shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-400" /> まとめシート
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded border-2 transition-all font-bold text-xs ${
                activeTab === 'editor'
                  ? 'bg-red-800 text-white border-red-500 shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-cyan-400" /> データ追加・問題自作
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          {/* Section 2: Lesson Selector (Multi Checkbox) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                ▶️ 出題範囲の課 (複数選択)
              </span>
              <button
                onClick={selectAllLessons}
                className="text-[10px] text-amber-300 hover:underline font-bold"
              >
                全選択
              </button>
            </div>

            <div className="space-y-1.5 bg-slate-950 p-2.5 rounded border-2 border-slate-800">
              {lessons.map((lesson) => {
                const isSelected = selectedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => toggleLesson(lesson.id)}
                    className={`p-2.5 rounded cursor-pointer transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-slate-900 text-amber-300 font-bold border-amber-500/80'
                        : 'text-slate-400 border-transparent hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                      <span className="truncate max-w-[150px] font-bold">{lesson.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Progress HUD */}
        <div className="p-4 border-t-2 border-slate-800 bg-slate-950">
          <div className="bg-slate-900 p-3 rounded border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> 暗記達成率
              </span>
              <span className="text-amber-400 font-extrabold font-mono">
                {masteredCount}/{currentVocabList.length} 語
              </span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 border border-slate-700 overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-300"
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
        {/* Mobile Header */}
        <header className="lg:hidden bg-slate-900 text-white p-3.5 border-b-2 border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">🇨🇳</span>
            <h1 className="font-extrabold text-sm text-amber-300">中国語クエスト</h1>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-1.5 rounded bg-slate-800 text-slate-200 border border-slate-700"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Slide-over Drawer */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-slate-950/95 z-50 flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-extrabold text-amber-300 text-base">モード ＆ 課の選択</h2>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400">ゲームモード</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setActiveTab('vocab'); setIsMobileSidebarOpen(false); }}
                  className={`p-3 rounded font-bold text-xs border-2 ${activeTab === 'vocab' ? 'bg-red-800 text-white border-red-500' : 'bg-slate-900 text-slate-300 border-slate-800'}`}
                >
                  単語暗記
                </button>
                <button
                  onClick={() => { setActiveTab('quiz'); setIsMobileSidebarOpen(false); }}
                  className={`p-3 rounded font-bold text-xs border-2 ${activeTab === 'quiz' ? 'bg-red-800 text-white border-red-500' : 'bg-slate-900 text-slate-300 border-slate-800'}`}
                >
                  文法クイズ
                </button>
              </div>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto">
              <span className="text-xs font-bold text-amber-400">対象の課</span>
              {lessons.map((l) => (
                <div
                  key={l.id}
                  onClick={() => toggleLesson(l.id)}
                  className={`p-3 rounded border flex items-center gap-2 text-xs font-bold ${selectedLessonIds.includes(l.id) ? 'bg-slate-900 text-amber-300 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                >
                  {selectedLessonIds.includes(l.id) ? <CheckSquare className="w-4 h-4 text-amber-400" /> : <Square className="w-4 h-4" />}
                  {l.title}
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="w-full py-3 bg-amber-500 text-slate-950 rounded font-black text-xs shadow-md border border-amber-300"
            >
              決定してゲームへ戻る ▶️
            </button>
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col justify-center bg-slate-950">
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
