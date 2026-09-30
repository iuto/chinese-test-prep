import React from 'react';
import { BookOpen, HelpCircle, Settings, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'vocab' | 'quiz' | 'cheat_sheet' | 'editor';
  setActiveTab: (tab: 'vocab' | 'quiz' | 'cheat_sheet' | 'editor') => void;
  masteredCount: number;
  totalVocab: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  masteredCount,
  totalVocab,
}) => {
  return (
    <header className="bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('vocab')}>
            <span className="text-3xl filter drop-shadow">🇨🇳</span>
            <div>
              <h1 className="font-bold text-lg sm:text-xl tracking-wide leading-tight flex items-center gap-1.5">
                中国語テスト対策
                <span className="bg-yellow-400 text-red-900 text-xs px-2 py-0.5 rounded-full font-extrabold shadow-sm">
                  第7課
                </span>
              </h1>
              <p className="text-xs text-red-200 hidden sm:block">単語暗記・時点 vs 時量・前置詞・結果補語</p>
            </div>
          </div>

          {/* Mastered Badge */}
          <div className="hidden md:flex items-center bg-red-900/60 px-3 py-1.5 rounded-lg border border-red-500/30 text-xs">
            <Sparkles className="w-4 h-4 text-yellow-300 mr-1.5 animate-pulse" />
            <span>暗記達成: </span>
            <span className="font-bold text-yellow-300 ml-1">{masteredCount} / {totalVocab}</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-1 border-t border-red-600/50 pt-1 pb-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-md font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'vocab'
                ? 'bg-white text-red-800 shadow-md font-bold'
                : 'text-red-100 hover:bg-red-600/50 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>単語暗記</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-md font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-white text-red-800 shadow-md font-bold'
                : 'text-red-100 hover:bg-red-600/50 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>文法クイズ</span>
          </button>

          <button
            onClick={() => setActiveTab('cheat_sheet')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-md font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'cheat_sheet'
                ? 'bg-white text-red-800 shadow-md font-bold'
                : 'text-red-100 hover:bg-red-600/50 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>文法まとめ</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-md font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'editor'
                ? 'bg-white text-red-800 shadow-md font-bold'
                : 'text-red-100 hover:bg-red-600/50 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>データ編集・確認</span>
          </button>
        </div>
      </div>
    </header>
  );
};
