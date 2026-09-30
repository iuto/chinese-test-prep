import React from 'react';
import { Flame, Zap, Trophy, FlameKindling, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'vocab' | 'quiz' | 'cheat_sheet' | 'editor';
  setActiveTab: (tab: 'vocab' | 'quiz' | 'cheat_sheet' | 'editor') => void;
  masteredCount: number;
  totalVocab: number;
  comboCount: number;
  level: number;
  xp: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  masteredCount,
  totalVocab,
  comboCount,
  level,
  xp,
}) => {
  const xpNeeded = level * 100;
  const xpPercent = Math.min(100, Math.round((xp / xpNeeded) * 100));

  return (
    <header className="bg-slate-950 text-white shadow-2xl border-b-2 border-pink-500/50 sticky top-0 z-50">
      {/* Top Banner with Cyber Glow */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Level */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setActiveTab('vocab')}
          >
            <div className="relative">
              <span className="text-3xl filter drop-shadow-md animate-bounce">⚡️</span>
              <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-slate-950 font-black text-[10px] px-1.5 py-0.2 rounded-full border border-yellow-200">
                Lv.{level}
              </span>
            </div>
            <div>
              <h1 className="font-black text-lg sm:text-xl tracking-tight leading-tight flex items-center gap-1.5 neon-text-pink">
                中国語ドパガキドリル
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black tracking-widest uppercase shadow-lg animate-pulse-fast">
                  【単位回収】
                </span>
              </h1>
              <p className="text-[10px] text-pink-300 font-extrabold hidden sm:block">
                脳汁ドバドバでテスト前日に全暗記していくぞwww
              </p>
            </div>
          </div>

          {/* Combo & XP HUD */}
          <div className="flex items-center gap-3">
            {/* Combo Badge */}
            {comboCount > 0 && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-red-600 text-white font-black text-xs px-3 py-1 rounded-xl shadow-lg border border-yellow-300 animate-pop">
                <Flame className="w-4 h-4 text-yellow-300 animate-bounce" />
                <span>{comboCount} STREAK!!</span>
              </div>
            )}

            {/* Level / XP Progress Bar */}
            <div className="hidden sm:flex flex-col w-32 bg-slate-900/90 p-1.5 rounded-xl border border-pink-500/30">
              <div className="flex justify-between text-[10px] font-black text-pink-300 mb-0.5">
                <span>LV.{level} 脳汁覚醒</span>
                <span>{xp}/{xpNeeded} XP</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-pink-500/30">
                <div
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cyber Pill Navigation Buttons */}
        <div className="flex space-x-1 border-t border-slate-800 py-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-black text-xs transition-all whitespace-nowrap ${
              activeTab === 'vocab'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 border border-pink-300'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>脳死単語暗記 ({masteredCount}/{totalVocab})</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg shadow-amber-500/30 border border-yellow-300'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FlameKindling className="w-3.5 h-3.5 text-yellow-300" />
            <span>文法脳汁クイズ 🔥</span>
          </button>

          <button
            onClick={() => setActiveTab('cheat_sheet')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap ${
              activeTab === 'cheat_sheet'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg border border-emerald-300'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-yellow-300" />
            <span>神チートシート 📝</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap ${
              activeTab === 'editor'
                ? 'bg-slate-800 text-pink-400 border border-pink-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>データ改造</span>
          </button>
        </div>
      </div>
    </header>
  );
};
