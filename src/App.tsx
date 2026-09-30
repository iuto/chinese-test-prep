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

  // Load state from localStorage or initialData
  const [vocabList, setVocabList] = useState<VocabItem[]>(() => {
    const saved = localStorage.getItem('chinese_vocab_list_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialVocabList;
  });

  const [quizList, setQuizList] = useState<QuizItem[]>(() => {
    const saved = localStorage.getItem('chinese_quiz_list_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialQuizList;
  });

  // Save to LocalStorage whenever modified
  useEffect(() => {
    localStorage.setItem('chinese_vocab_list_v1', JSON.stringify(vocabList));
  }, [vocabList]);

  useEffect(() => {
    localStorage.setItem('chinese_quiz_list_v1', JSON.stringify(quizList));
  }, [quizList]);

  // Handlers
  const handleToggleMastered = (id: string) => {
    setVocabList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isMastered: !v.isMastered } : v))
    );
  };

  const handleResetMastered = () => {
    if (confirm('すべての単語の暗記チェックをリセットしますか？')) {
      setVocabList((prev) => prev.map((v) => ({ ...v, isMastered: false })));
    }
  };

  const handleResetAllData = () => {
    localStorage.removeItem('chinese_vocab_list_v1');
    localStorage.removeItem('chinese_quiz_list_v1');
    setVocabList(initialVocabList);
    setQuizList(initialQuizList);
  };

  const masteredCount = vocabList.filter((v) => v.isMastered).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        masteredCount={masteredCount}
        totalVocab={vocabList.length}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'vocab' && (
          <VocabStudy
            vocabList={vocabList}
            onToggleMastered={handleToggleMastered}
            onResetMastered={handleResetMastered}
          />
        )}

        {activeTab === 'quiz' && <GrammarQuiz quizList={quizList} />}

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

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <p>🇨🇳 中国語テスト対策 Web App - 大学授業・第7課対応</p>
      </footer>
    </div>
  );
};

export default App;
