import React from 'react';
import { BookOpen, HelpCircle, FileText, Settings, ArrowLeft, Trophy } from 'lucide-react';

interface NavbarProps {
  activeTab: 'vocab' | 'quiz' | 'cheat_sheet' | 'editor';
  setActiveTab: (tab: 'vocab' | 'quiz' | 'cheat_sheet' | 'editor') => void;
  onBackToLessonSelect: () => void;
  currentLessonNumber: number;
  masteredCount: number;
  totalVocab: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onBackToLessonSelect,
  currentLessonNumber,
  masteredCount,
  totalVocab,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Back & Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToLessonSelect}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> 課の選択へ
            </button>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center space-x-2">
              <span className="text-2xl">🇨🇳</span>
              <div>
                <h1 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                  中国語テスト対策
                  <span className="bg-red-100 text-red-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    第{currentLessonNumber}課
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center bg-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600">
            <Trophy className="w-4 h-4 text-amber-500 mr-1.5" />
            暗記完了: <span className="text-red-700 ml-1 font-extrabold">{masteredCount} / {totalVocab}</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-2 border-t border-slate-100 py-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
              activeTab === 'vocab'
                ? 'bg-red-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>単語暗記カード</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-red-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>文法クイズ</span>
          </button>

          <button
            onClick={() => setActiveTab('cheat_sheet')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
              activeTab === 'cheat_sheet'
                ? 'bg-red-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>文法まとめ</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
              activeTab === 'editor'
                ? 'bg-red-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>データ編集</span>
          </button>
        </div>
      </div>
    </header>
  );
};
