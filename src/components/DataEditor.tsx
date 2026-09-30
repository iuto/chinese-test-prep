import React, { useState } from 'react';
import { VocabItem, QuizItem, VocabCategory } from '../types';
import { Plus, Edit2, Trash2, RotateCcw, Save, AlertTriangle, Check, Sparkles } from 'lucide-react';

interface DataEditorProps {
  vocabList: VocabItem[];
  quizList: QuizItem[];
  onSaveVocab: (list: VocabItem[]) => void;
  onSaveQuiz: (list: QuizItem[]) => void;
  onResetAllData: () => void;
}

export const DataEditor: React.FC<DataEditorProps> = ({
  vocabList,
  quizList,
  onSaveVocab,
  onSaveQuiz,
  onResetAllData,
}) => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'quiz'>('vocab');
  
  // Vocab Edit Modal / Form state
  const [isEditingVocab, setIsEditingVocab] = useState<boolean>(false);
  const [editVocabItem, setEditVocabItem] = useState<Partial<VocabItem>>({});

  // Notification Banner
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(null), 3000);
  };

  // Vocab Handlers
  const handleOpenAddVocab = () => {
    setEditVocabItem({
      id: `custom-v-${Date.now()}`,
      hanzi: '',
      pinyin: '',
      meaning: '',
      category: '時間',
      notes: '',
    });
    setIsEditingVocab(true);
  };

  const handleOpenEditVocab = (item: VocabItem) => {
    setEditVocabItem({ ...item });
    setIsEditingVocab(true);
  };

  const handleDeleteVocab = (id: string) => {
    if (confirm('この単語を削除してもよろしいですか？')) {
      const newList = vocabList.filter((v) => v.id !== id);
      onSaveVocab(newList);
      showToast('単語を削除しました');
    }
  };

  const handleSaveVocabItem = () => {
    if (!editVocabItem.hanzi || !editVocabItem.meaning) {
      alert('中国語（漢字）と日本語訳は必須入力です。');
      return;
    }

    const exists = vocabList.some((v) => v.id === editVocabItem.id);
    let newList: VocabItem[];

    if (exists) {
      newList = vocabList.map((v) => (v.id === editVocabItem.id ? (editVocabItem as VocabItem) : v));
    } else {
      newList = [editVocabItem as VocabItem, ...vocabList];
    }

    onSaveVocab(newList);
    setIsEditingVocab(false);
    showToast('単語データを保存しました！');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Toast Notification */}
      {savedMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50 animate-bounce text-xs font-bold">
          <Check className="w-4 h-4 text-emerald-400" />
          {savedMessage}
        </div>
      )}

      {/* Editor Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            ⚙️ データ確認・OCR修正・追加モード
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            画像の読み取りエラーの修正や、新しく追加したい単語・クイズを自由に変更できます。
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('初期データの状態にリセットしますか？手動で追加・修正した内容は上書きされます。')) {
              onResetAllData();
              showToast('データを初期状態にリセットしました');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 初期データにリセット
        </button>
      </div>

      {/* Mode Switch Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('vocab')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'vocab'
              ? 'bg-red-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border'
          }`}
        >
          単語データ編集 ({vocabList.length} 件)
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'quiz'
              ? 'bg-red-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border'
          }`}
        >
          クイズ問題一覧 ({quizList.length} 件)
        </button>
      </div>

      {/* TAB 1: VOCAB EDITOR */}
      {activeTab === 'vocab' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500">
              タップして修正、または「+ 新規単語追加」を押してください。
            </span>
            <button
              onClick={handleOpenAddVocab}
              className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              <Plus className="w-4 h-4" /> 新規単語を追加
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b">
                  <tr>
                    <th className="p-3">中国語 (簡体字)</th>
                    <th className="p-3">ピンイン</th>
                    <th className="p-3">日本語訳</th>
                    <th className="p-3">分類</th>
                    <th className="p-3">メモ</th>
                    <th className="p-3 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vocabList.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 text-sm">{v.hanzi}</td>
                      <td className="p-3 font-mono text-red-600">{v.pinyin}</td>
                      <td className="p-3 font-medium">{v.meaning}</td>
                      <td className="p-3">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold border">
                          {v.category}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 max-w-xs truncate">{v.notes || '-'}</td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditVocab(v)}
                          className="p-1.5 hover:bg-slate-200 rounded text-slate-600"
                          title="編集"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteVocab(v.id)}
                          className="p-1.5 hover:bg-red-100 rounded text-red-600"
                          title="削除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUIZ LIST PREVIEW */}
      {activeTab === 'quiz' && (
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500">現在登録されているクイズ一覧</div>
          <div className="space-y-3">
            {quizList.map((q, idx) => (
              <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {q.category} ({q.type})
                  </span>
                  <span className="text-xs text-slate-400 font-bold">問 {idx + 1}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{q.question}</h4>
                <p className="text-xs text-slate-500">{q.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VOCAB EDIT MODAL */}
      {isEditingVocab && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-slate-800">単語の編集・追加</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">中国語 (簡体字) *</label>
                <input
                  type="text"
                  value={editVocabItem.hanzi || ''}
                  onChange={(e) => setEditVocabItem({ ...editVocabItem, hanzi: e.target.value })}
                  placeholder="例: 小时"
                  className="w-full p-2.5 border rounded-xl font-bold text-base focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ピンイン</label>
                <input
                  type="text"
                  value={editVocabItem.pinyin || ''}
                  onChange={(e) => setEditVocabItem({ ...editVocabItem, pinyin: e.target.value })}
                  placeholder="例: xiǎoshí"
                  className="w-full p-2.5 border rounded-xl font-mono focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">日本語訳 *</label>
                <input
                  type="text"
                  value={editVocabItem.meaning || ''}
                  onChange={(e) => setEditVocabItem({ ...editVocabItem, meaning: e.target.value })}
                  placeholder="例: ～時間（時量）"
                  className="w-full p-2.5 border rounded-xl font-bold focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">分類</label>
                <select
                  value={editVocabItem.category || '時間'}
                  onChange={(e) => setEditVocabItem({ ...editVocabItem, category: e.target.value as VocabCategory })}
                  className="w-full p-2.5 border rounded-xl font-bold bg-white focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="時間">時間</option>
                  <option value="動詞">動詞</option>
                  <option value="名詞">名詞</option>
                  <option value="前置詞">前置詞</option>
                  <option value="形容詞">形容詞</option>
                  <option value="会話・読トレ">会話・読トレ</option>
                  <option value="手書き・補足">手書き・補足</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">メモ・補足</label>
                <textarea
                  value={editVocabItem.notes || ''}
                  onChange={(e) => setEditVocabItem({ ...editVocabItem, notes: e.target.value })}
                  placeholder="例: 量を数えるときは「两个小时」"
                  className="w-full p-2.5 border rounded-xl font-medium focus:ring-2 focus:ring-red-500 outline-none h-20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t pt-4">
              <button
                onClick={() => setIsEditingVocab(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveVocabItem}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold shadow-md"
              >
                保存する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
