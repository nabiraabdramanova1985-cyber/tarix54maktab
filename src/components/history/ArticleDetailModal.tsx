import React, { useState } from 'react';
import { Article, Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { HISTORICAL_SOURCES } from '../../data/sources';
import { 
  X, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Share2, 
  HelpCircle, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  currentLocale: Locale;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isCompleted: boolean;
  onToggleCompleted: (id: string) => void;
  onNextArticle?: () => void;
  onPrevArticle?: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  currentLocale,
  isBookmarked,
  onToggleBookmark,
  isCompleted,
  onToggleCompleted,
  onNextArticle,
  onPrevArticle,
}) => {
  const [copied, setCopied] = useState(false);
  if (!article) return null;

  const t = DICTIONARIES[currentLocale];
  const relatedSources = HISTORICAL_SOURCES.filter((s) => article.sourceIds.includes(s.id));

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-0 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-[#18262B] rounded-none sm:rounded-2xl shadow-2xl border-x-0 sm:border border-[#E1E6E1] dark:border-[#314348] min-h-screen sm:min-h-0 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Toolbar */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-[#18262B]/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-[#E1E6E1] dark:border-[#314348] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1] rounded-lg hover:bg-stone-100 dark:hover:bg-[#203238] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.actions.backToList}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Mark as Completed */}
            <button
              onClick={() => onToggleCompleted(article.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold'
                  : 'bg-white dark:bg-[#203238] border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B]'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
              <span>{isCompleted ? t.actions.completed : t.actions.markAsCompleted}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#B88954]/10 border-[#B88954] text-[#B88954] dark:text-[#D6AB77]'
                  : 'bg-white dark:bg-[#203238] border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
              }`}
              title={isBookmarked ? t.actions.bookmarked : t.actions.bookmark}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-[#E1E6E1] dark:border-[#314348] bg-white dark:bg-[#203238] text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] transition-colors cursor-pointer"
              title="Havolani nusxalash"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1] hover:bg-stone-100 dark:hover:bg-[#203238] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Content Container */}
        <div className="p-6 sm:p-10 overflow-y-auto">
          {/* Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#718080] dark:text-[#859896] mb-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase tracking-wider text-[#B88954] dark:text-[#D6AB77]">
                {article.state === 'turk' ? t.filters.turkKhaganate : article.state === 'tang' ? t.filters.tangDynasty : t.filters.diplomacySilkRoad}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.period}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.readingMinutes} min</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#17323B] dark:text-[#D6AB77] font-medium bg-amber-50/80 dark:bg-amber-950/30 px-2.5 py-1 rounded-md border border-[#B88954]/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{article.author}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] leading-tight mb-4">
            {article.title[currentLocale]}
          </h1>

          <p className="text-base sm:text-lg text-[#526367] dark:text-[#B6C4C2] font-serif italic mb-6 pb-6 border-b border-[#E1E6E1] dark:border-[#314348] leading-relaxed">
            {article.summary[currentLocale]}
          </p>

          {/* Featured Article Image */}
          <div className="my-6 rounded-xl overflow-hidden border border-[#E1E6E1] dark:border-[#314348]">
            <img
              src={article.imageUrl}
              alt={article.imageCaption[currentLocale]}
              referrerPolicy="no-referrer"
              className="w-full max-h-[380px] object-cover"
            />
            <div className="p-3 bg-stone-50 dark:bg-[#10191D] text-xs text-[#718080] dark:text-[#859896] font-serif italic text-center">
              {article.imageCaption[currentLocale]}
            </div>
          </div>

          {/* Key Concepts Pills Bar */}
          <div className="my-6 p-4 rounded-xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] dark:text-[#859896] block mb-2">
              Asosiy tushunchalar va atamalar:
            </span>
            <div className="flex flex-wrap gap-2">
              {article.keyConcepts[currentLocale].map((concept, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-[#18262B] text-[#17323B] dark:text-[#F1F4F1] border border-[#E1E6E1] dark:border-[#314348] font-medium"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Longform Editorial Reading Body with Dropcap */}
          <div className="max-w-prose mx-auto my-8 text-base text-[#17323B] dark:text-[#F1F4F1] leading-relaxed space-y-5">
            {article.content[currentLocale].split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#B88954] dark:first-letter:text-[#D6AB77]" : ""}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Causes and Consequences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 pt-6 border-t border-[#E1E6E1] dark:border-[#314348]">
            <div className="p-5 rounded-xl bg-amber-50/50 dark:bg-[#203238]/60 border border-amber-200/60 dark:border-[#314348]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1] mb-3">
                Tarixiy sabablar va omillar:
              </h4>
              <ul className="space-y-2 text-xs text-[#526367] dark:text-[#B6C4C2]">
                {article.causes[currentLocale].map((cause, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#B88954] font-bold">·</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-teal-50/50 dark:bg-[#203238]/60 border border-teal-200/60 dark:border-[#314348]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1] mb-3">
                Oqibatlar va tarixiy ta’siri:
              </h4>
              <ul className="space-y-2 text-xs text-[#526367] dark:text-[#B6C4C2]">
                {article.consequences[currentLocale].map((cons, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#14515A] dark:text-[#D6AB77] font-bold">·</span>
                    <span>{cons}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reflection Questions for Students & Researchers */}
          <div className="my-8 p-6 rounded-xl bg-white dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348]">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1]">
                Mustaqil tahlil va mulohaza savollari:
              </h4>
            </div>
            <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-[#526367] dark:text-[#B6C4C2] leading-relaxed">
              {article.reflectionQuestions[currentLocale].map((q, i) => (
                <li key={i} className="pl-1">
                  <span className="font-medium text-[#17323B] dark:text-[#F1F4F1]">{q}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Primary and Academic Sources References */}
          {relatedSources.length > 0 && (
            <div className="my-8 pt-6 border-t border-[#E1E6E1] dark:border-[#314348]">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1]">
                  Foydalanilgan birlamchi va ilmiy manbalar:
                </h4>
              </div>
              <div className="space-y-3">
                {relatedSources.map((source) => (
                  <div
                    key={source.id}
                    className="p-4 rounded-xl bg-[#F7F6F1] dark:bg-[#10191D] border border-[#E1E6E1] dark:border-[#314348]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#17323B] dark:text-[#F1F4F1]">
                        {source.title[currentLocale]}
                      </span>
                      <span className="text-[10px] text-[#718080] dark:text-[#859896] uppercase font-mono">
                        {source.dateOrCentury}
                      </span>
                    </div>
                    <p className="text-xs font-serif italic text-[#526367] dark:text-[#B6C4C2] my-2 p-2.5 bg-white dark:bg-[#18262B] rounded border border-[#E1E6E1] dark:border-[#314348]">
                      {source.keyExcerpt[currentLocale]}
                    </p>
                    <p className="text-[10px] text-[#718080] dark:text-[#859896] font-mono">
                      Iqtibos: {source.citation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author & Pedagogical Attribution Card */}
          <div className="my-8 p-4 sm:p-5 rounded-xl bg-stone-50 dark:bg-[#10191D] border border-[#B88954]/30 dark:border-[#D6AB77]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#17323B] dark:text-[#F1F4F1]">
                    Abdramanova Nabira Kenesovna
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B88954]/20 text-[#B88954] dark:text-[#D6AB77] font-semibold">
                    54-maktab o‘qituvchisi
                  </span>
                </div>
                <p className="text-[11px] text-[#718080] dark:text-[#859896] mt-0.5">
                  Tarix fani o‘qituvchisi · Ushbu ta’limiy tadqiqot va platforma ishlab chiquvchisi
                </p>
              </div>
            </div>
            <a
              href="mailto:nabiraabdramanova1985@gmail.com"
              className="text-xs font-mono text-[#526367] dark:text-[#B6C4C2] hover:text-[#B88954] dark:hover:text-[#D6AB77] transition-colors"
            >
              nabiraabdramanova1985@gmail.com
            </a>
          </div>

          {/* Next & Previous Article Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-[#E1E6E1] dark:border-[#314348]">
            {onPrevArticle ? (
              <button
                onClick={onPrevArticle}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1] border border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.actions.prev}</span>
              </button>
            ) : <div />}

            {onNextArticle ? (
              <button
                onClick={onNextArticle}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] hover:bg-[#14515A] cursor-pointer"
              >
                <span>{t.actions.next}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : <div />}
          </div>

        </div>
      </div>
    </div>
  );
};
