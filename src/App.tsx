import React, { useState, useEffect } from 'react';
import { VocabItem, QuizItem } from './types';
import { initialVocabList, initialQuizList, lessonList } from './data/initialData';
import { AppShell } from './components/AppShell';

export const App: React.FC = () => {
  const [vocabList, setVocabList] = useState<VocabItem[]>(() => {
    const saved = localStorage.getItem('chinese_vocab_list_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialVocabList;
  });

  const [quizList, setQuizList] = useState<QuizItem[]>(() => {
    const saved = localStorage.getItem('chinese_quiz_list_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialQuizList;
  });

  useEffect(() => {
    localStorage.setItem('chinese_vocab_list_v4', JSON.stringify(vocabList));
  }, [vocabList]);

  useEffect(() => {
    localStorage.setItem('chinese_quiz_list_v4', JSON.stringify(quizList));
  }, [quizList]);

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
    localStorage.removeItem('chinese_vocab_list_v4');
    localStorage.removeItem('chinese_quiz_list_v4');
    setVocabList(initialVocabList);
    setQuizList(initialQuizList);
  };

  return (
    <AppShell
      lessons={lessonList}
      vocabList={vocabList}
      quizList={quizList}
      onSaveVocab={setVocabList}
      onSaveQuiz={setQuizList}
      onResetAllData={handleResetAllData}
      onToggleMastered={handleToggleMastered}
      onResetMastered={handleResetMastered}
    />
  );
};

export default App;
