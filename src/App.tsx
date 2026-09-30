import React, { useState, useEffect } from 'react';
import { VocabItem, QuizItem } from './types';
import { initialVocabList, initialQuizList, lessonList } from './data/initialData';
import { LessonSelect } from './components/LessonSelect';
import { Navbar } from './components/Navbar';
import { VocabStudy } from './components/VocabStudy';
import { GrammarQuiz } from './components/GrammarQuiz';
import { GrammarCheatSheet } from './components/GrammarCheatSheet';
import { DataEditor } from './components/DataEditor';

export const App: React.FC = () => {
  // Selected Lesson IDs array (empty means on LessonSelect screen)
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'vocab' | 'quiz' | 'cheat_sheet' | 'editor'>('vocab');

  // Load state from localStorage or initialData
  const [vocabList, setVocabList] = useState<VocabItem[]>(() => {
    const saved = localStorage.getItem('chinese_vocab_list_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialVocabList;
  });

  const [quizList, setQuizList] = useState<QuizItem[]>(() => {
    const saved = localStorage.getItem('chinese_quiz_list_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialQuizList;
  });

  // Save LocalStorage
  useEffect(() => {
    localStorage.setItem('chinese_vocab_list_v3', JSON.stringify(vocabList));
  }, [vocabList]);

  useEffect(() => {
    localStorage.setItem('chinese_quiz_list_v3', JSON.stringify(quizList));
  }, [quizList]);

  const handleStartGame = (ids: string[], mode: 'vocab' | 'quiz' | 'cheat_sheet') => {
    setSelectedLessonIds(ids);
    setActiveTab(mode);
  };

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
    localStorage.removeItem('chinese_vocab_list_v3');
    localStorage.removeItem('chinese_quiz_list_v3');
    setVocabList(initialVocabList);
    setQuizList(initialQuizList);
  };

  // Filtered Vocab and Quiz for selected lessons
  const currentVocabList = vocabList.filter(
    (v) => selectedLessonIds.length === 0 || selectedLessonIds.includes(v.lessonId)
  );

  const currentQuizList = quizList.filter(
    (q) => selectedLessonIds.length === 0 || selectedLessonIds.includes(q.lessonId)
  );

  const masteredCount = currentVocabList.filter((v) => v.isMastered).length;

  // Selected Lesson Display Text (e.g., "第7課, 第8課")
  const selectedLessonNumbers = lessonList
    .filter((l) => selectedLessonIds.includes(l.id))
    .map((l) => l.number)
    .join(', ');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* If No Lessons Selected -> Show Home Selection Screen */}
      {selectedLessonIds.length === 0 ? (
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
          <LessonSelect
            lessons={lessonList}
            onStartGame={handleStartGame}
          />
        </main>
      ) : (
        <>
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onBackToLessonSelect={() => setSelectedLessonIds([])}
            currentLessonNumber={selectedLessonNumbers ? parseInt(selectedLessonNumbers, 10) : 7}
            masteredCount={masteredCount}
            totalVocab={currentVocabList.length}
          />

          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {activeTab === 'vocab' && (
              <VocabStudy
                vocabList={currentVocabList}
                onToggleMastered={handleToggleMastered}
                onResetMastered={handleResetMastered}
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
                onSaveVocab={setVocabList}
                onSaveQuiz={setQuizList}
                onResetAllData={handleResetAllData}
              />
            )}
          </main>
        </>
      )}

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <p>🇨🇳 中国語テスト対策 Web App</p>
      </footer>
    </div>
  );
};

export default App;
