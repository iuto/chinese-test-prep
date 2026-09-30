import React, { useState, useEffect } from 'react';
import { VocabItem, QuizItem } from './types';
import { initialVocabList, initialQuizList } from './data/initialData';
import { Navbar } from './components/Navbar';
import { VocabStudy } from './components/VocabStudy';
import { GrammarQuiz } from './components/GrammarQuiz';
import { GrammarCheatSheet } from './components/GrammarCheatSheet';
import { DataEditor } from './components/DataEditor';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'quiz' | 'cheat_sheet' | 'editor'>('vocab');

  // Dopamine Level & XP System
  const [level, setLevel] = useState<number>(() => {
    const saved = localStorage.getItem('dopa_level');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('dopa_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [comboCount, setComboCount] = useState<number>(0);

  // Load state from localStorage or initialData
  const [vocabList, setVocabList] = useState<VocabItem[]>(() => {
    const saved = localStorage.getItem('chinese_vocab_list_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialVocabList;
  });

  const [quizList, setQuizList] = useState<QuizItem[]>(() => {
    const saved = localStorage.getItem('chinese_quiz_list_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialQuizList;
  });

  // Save LocalStorage
  useEffect(() => {
    localStorage.setItem('chinese_vocab_list_v1', JSON.stringify(vocabList));
  }, [vocabList]);

  useEffect(() => {
    localStorage.setItem('chinese_quiz_list_v1', JSON.stringify(quizList));
  }, [quizList]);

  useEffect(() => {
    localStorage.setItem('dopa_level', level.toString());
    localStorage.setItem('dopa_xp', xp.toString());
  }, [level, xp]);

  // Gain XP & Level UP
  const addXp = (amount: number) => {
    setComboCount((prev) => prev + 1);
    setXp((prevXp) => {
      const newXp = prevXp + amount;
      const xpNeeded = level * 100;
      if (newXp >= xpNeeded) {
        setLevel((prevLevel) => prevLevel + 1);
        return newXp - xpNeeded;
      }
      return newXp;
    });
  };

  const handleToggleMastered = (id: string) => {
    setVocabList((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          if (!v.isMastered) {
            addXp(30);
          }
          return { ...v, isMastered: !v.isMastered };
        }
        return v;
      })
    );
  };

  const handleResetMastered = () => {
    if (confirm('すべての単語の暗記チェックをリセットしますか？')) {
      setVocabList((prev) => prev.map((v) => ({ ...v, isMastered: false })));
      setComboCount(0);
    }
  };

  const handleResetAllData = () => {
    localStorage.removeItem('chinese_vocab_list_v1');
    localStorage.removeItem('chinese_quiz_list_v1');
    localStorage.removeItem('dopa_level');
    localStorage.removeItem('dopa_xp');
    setVocabList(initialVocabList);
    setQuizList(initialQuizList);
    setLevel(1);
    setXp(0);
    setComboCount(0);
  };

  const masteredCount = vocabList.filter((v) => v.isMastered).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        masteredCount={masteredCount}
        totalVocab={vocabList.length}
        comboCount={comboCount}
        level={level}
        xp={xp}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'vocab' && (
          <VocabStudy
            vocabList={vocabList}
            onToggleMastered={handleToggleMastered}
            onResetMastered={handleResetMastered}
          />
        )}

        {activeTab === 'quiz' && (
          <GrammarQuiz
            quizList={quizList}
            onCorrectAnswer={() => addXp(50)}
            comboCount={comboCount}
          />
        )}

        {activeTab === 'cheat_sheet' && <GrammarCheatSheet />}

        {activeTab === 'editor' && (
          <DataEditor
            vocabList={vocabList}
            quizList={quizList}
            onSaveVocab={setVocabList}
            onSaveQuiz={setQuizList}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 font-black">
        <p>⚡️ 中国語ドパガキドリル - 脳汁大量分泌で単位確定アプリ</p>
      </footer>
    </div>
  );
};

export default App;
