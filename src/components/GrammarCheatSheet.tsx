import React from 'react';
import { grammarSummaries } from '../data/initialData';
import { Bookmark, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const GrammarCheatSheet: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-6 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <h2 className="text-xl font-extrabold tracking-wide">第7課 文法ポイント要点カード</h2>
        </div>
        <p className="text-xs text-red-200">
          教科書p.92〜93および配布プリント（手書きノート）の必須文法をひと目でマスター！
        </p>
      </div>

      {/* Hand-written Note Feature Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>★ プリントの手書き特記メモ（超重要語順）</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs font-bold text-slate-400">基本語順公式:</span>
            <div className="text-xl font-extrabold text-red-800 font-mono tracking-wider">
              主語 S + <span className="underline decoration-amber-500 decoration-2">[時点]</span> + 動詞 V + <span className="underline decoration-blue-500 decoration-2">[時量]</span> + 目的語 O
            </div>
          </div>
          <div className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-2 rounded-lg text-center">
            例: 我 星期六 学 中文<br/>
            (私は土曜日に中国語を学ぶ)
          </div>
        </div>
      </div>

      {/* Grammar Rules Cards */}
      <div className="space-y-6">
        {grammarSummaries.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-red-700" />
                {rule.title}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Formula */}
              <div className="bg-red-50/70 border border-red-200 px-4 py-3 rounded-xl font-mono text-sm sm:text-base font-bold text-red-900">
                公式: {rule.formula}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {rule.description}
              </p>

              {/* Examples List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">例文</h4>
                {rule.examples.map((ex, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-slate-800 font-serif tracking-wide">{ex.cn}</span>
                      <span className="text-xs font-mono text-red-600">{ex.pinyin}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{ex.jp}</p>
                  </div>
                ))}
              </div>

              {/* Tips */}
              {rule.tips && rule.tips.length > 0 && (
                <div className="bg-slate-100 p-4 rounded-xl space-y-1 text-xs text-slate-700 font-medium">
                  {rule.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
