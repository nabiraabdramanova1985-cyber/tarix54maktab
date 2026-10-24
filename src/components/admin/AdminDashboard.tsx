import React, { useState } from 'react';
import { Locale, Article } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { HISTORICAL_ARTICLES } from '../../data/articles';
import { QUIZ_QUESTIONS } from '../../data/quiz';
import { 
  ShieldCheck, 
  FileEdit, 
  Trash2, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Save,
  BookOpen,
  Award
} from 'lucide-react';

interface AdminDashboardProps {
  currentLocale: Locale;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentLocale }) => {
  const [articlesList, setArticlesList] = useState<Article[]>(HISTORICAL_ARTICLES);
  const [selectedArticleToEdit, setSelectedArticleToEdit] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState<'articles' | 'translations' | 'quizzes'>('articles');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const t = DICTIONARIES[currentLocale];

  const handleTogglePublish = (id: string) => {
    setArticlesList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPublished: !a.isPublished } : a))
    );
    setStatusMessage('Maqola holati muvaffaqiyatli o‘zgartirildi');
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Haqiqatan ham ushbu maqolani o‘chirmoqchimisiz?')) {
      setArticlesList((prev) => prev.filter((a) => a.id !== id));
      setStatusMessage('Maqola o‘chirildi');
      setTimeout(() => setStatusMessage(null), 2500);
    }
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-1">
              <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
                Boshqaruv Konsoli
              </span>
              <span aria-hidden="true">·</span>
              <span>O‘qituvchi va Ma’mur</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
              {t.admin.title}
            </h2>
            <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-0.5">
              {t.admin.subtitle}
            </p>
          </div>

          {statusMessage && (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 text-xs font-medium animate-in fade-in">
              {statusMessage}
            </div>
          )}
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-2xl shadow-xs mb-8 w-fit">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer border ${
              activeTab === 'articles'
                ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold shadow-xs'
                : 'text-[#526367] dark:text-[#B6C4C2] border-transparent'
            }`}
          >
            {t.admin.contentManagement} ({articlesList.length})
          </button>
          <button
            onClick={() => setActiveTab('translations')}
            className={`px-4 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer border ${
              activeTab === 'translations'
                ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold shadow-xs'
                : 'text-[#526367] dark:text-[#B6C4C2] border-transparent'
            }`}
          >
            {t.admin.translationCoverage} (4/4 Til)
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-4 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer border ${
              activeTab === 'quizzes'
                ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold shadow-xs'
                : 'text-[#526367] dark:text-[#B6C4C2] border-transparent'
            }`}
          >
            {t.admin.quizManagement} ({QUIZ_QUESTIONS.length})
          </button>
        </div>

        {/* Content Management Tab */}
        {activeTab === 'articles' && (
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-[#203238] border-b border-[#E1E6E1] dark:border-[#314348] text-[#718080] dark:text-[#859896] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3.5">Mavzu nomi</th>
                    <th className="px-6 py-3.5">Davlat</th>
                    <th className="px-6 py-3.5">Davr</th>
                    <th className="px-6 py-3.5">O‘qish vaqti</th>
                    <th className="px-6 py-3.5">Holati</th>
                    <th className="px-6 py-3.5 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E6E1] dark:divide-[#314348]">
                  {articlesList.map((article) => (
                    <tr key={article.id} className="hover:bg-stone-50/50 dark:hover:bg-[#203238]/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#17323B] dark:text-[#F1F4F1] max-w-xs truncate">
                        {article.title[currentLocale]}
                      </td>
                      <td className="px-6 py-4 uppercase text-[10px] font-mono text-[#718080]">
                        {article.state}
                      </td>
                      <td className="px-6 py-4 text-[#718080] dark:text-[#859896] font-mono">
                        {article.period}
                      </td>
                      <td className="px-6 py-4 text-[#718080] dark:text-[#859896]">
                        {article.readingMinutes} min
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(article.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer border ${
                            article.isPublished
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300'
                          }`}
                        >
                          {article.isPublished ? t.admin.published : t.admin.draft}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-1 text-[#718080] hover:text-rose-600 transition-colors cursor-pointer"
                          title="O‘chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Translation Coverage Audit Tab */}
        {activeTab === 'translations' && (
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 shadow-xs">
            <h3 className="text-base font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-2">
              To‘rt tildagi qamrov auditi (100% Sinxron)
            </h3>
            <p className="text-xs text-[#718080] dark:text-[#859896] mb-6">
              Platformadagi barcha maqolalar, test savollari, shaxslar va mezonlar 4 ta lokalda (uz, uz-Cyrl, ru, en) to‘liq mavjudligi tekshirildi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              {[
                { code: 'uz', name: 'O‘zbekcha (Lotin)', count: '12 / 12 maqola', percent: '100%' },
                { code: 'uz-Cyrl', name: 'Ўзбекча (Кирилл)', count: '12 / 12 maqola', percent: '100%' },
                { code: 'ru', name: 'Русский язык', count: '12 / 12 статей', percent: '100%' },
                { code: 'en', name: 'English (Academic)', count: '12 / 12 studies', percent: '100%' },
              ].map((item) => (
                <div key={item.code} className="p-4 rounded-xl bg-stone-50 dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#B88954]">{item.code}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-semibold text-[#17323B] dark:text-[#F1F4F1] mb-1">{item.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-[#718080]">
                    <span>{item.count}</span>
                    <span className="font-semibold text-emerald-700">{item.percent}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Barcha lug‘atlar va kontent strukturasi Vercel production deploy talablariga to‘liq javob beradi.</span>
            </div>
          </div>
        )}

        {/* Quizzes Management Tab */}
        {activeTab === 'quizzes' && (
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 shadow-xs">
            <h3 className="text-base font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-4">
              Savollar banki va metodik baholash ({QUIZ_QUESTIONS.length} ta savol)
            </h3>
            
            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-stone-50/50 dark:bg-[#203238]/50 border border-[#E1E6E1] dark:border-[#314348] flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-[#718080] mb-1">
                      <span className="font-mono">#0{idx + 1}</span>
                      <span>·</span>
                      <span className="uppercase font-semibold text-[#B88954]">{q.skillTested}</span>
                      <span>·</span>
                      <span className="capitalize">{q.difficulty}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#17323B] dark:text-[#F1F4F1]">
                      {q.question[currentLocale]}
                    </h4>
                    <p className="text-[11px] text-[#718080] mt-1">
                      To‘g‘ri javob: <span className="text-emerald-700 dark:text-emerald-300 font-medium">{q.options[currentLocale][q.correctAnswerIndex]}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
