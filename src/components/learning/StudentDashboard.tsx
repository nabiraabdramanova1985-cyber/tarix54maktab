import React from 'react';
import { Locale, UserProgress, Article } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { HISTORICAL_ARTICLES } from '../../data/articles';
import { 
  GraduationCap, 
  Flame, 
  Award, 
  BookOpen, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

interface StudentDashboardProps {
  currentLocale: Locale;
  progress: UserProgress;
  onSelectArticle: (article: Article) => void;
  onClearProgress: () => void;
  onUpdateGoalMinutes: (minutes: number) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentLocale,
  progress,
  onSelectArticle,
  onClearProgress,
  onUpdateGoalMinutes,
}) => {
  const t = DICTIONARIES[currentLocale];
  const totalArticles = HISTORICAL_ARTICLES.length;
  const completedCount = progress.completedArticles.length;
  const progressPercent = Math.round((completedCount / totalArticles) * 100);

  const completedArticlesList = HISTORICAL_ARTICLES.filter((a) =>
    progress.completedArticles.includes(a.id)
  );

  const bookmarkedArticlesList = HISTORICAL_ARTICLES.filter((a) =>
    progress.bookmarkedArticles.includes(a.id)
  );

  const unreadArticlesList = HISTORICAL_ARTICLES.filter(
    (a) => !progress.completedArticles.includes(a.id)
  );

  // Compute average quiz score
  const quizScores = Object.values(progress.quizScores);
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(
          (quizScores.reduce((acc, curr) => acc + curr.score / curr.total, 0) /
            quizScores.length) *
            100
        )
      : 0;

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-1">
              <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
                Shaxsiy O‘quv Kabineti
              </span>
              <span aria-hidden="true">·</span>
              <span>Talaba va Tadqiqotchi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
              {t.dashboard.title}
            </h2>
            <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-0.5">
              {t.dashboard.subtitle}
            </p>
          </div>

          <button
            onClick={onClearProgress}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#718080] hover:text-rose-600 border border-[#E1E6E1] dark:border-[#314348] rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Progressni tozalash</span>
          </button>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          {/* Completed Articles */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-xs">
            <div className="flex items-center justify-between text-[#718080] dark:text-[#859896] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">{t.dashboard.articlesCompleted}</span>
              <BookOpen className="w-4 h-4 text-[#B88954]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] tabular-nums">
                {completedCount}
              </span>
              <span className="text-xs text-[#718080]">/ {totalArticles} ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-[#203238] rounded-full h-1.5 mt-3 overflow-hidden">
              <div 
                className="bg-[#B88954] dark:bg-[#D6AB77] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Average Quiz Score */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-xs">
            <div className="flex items-center justify-between text-[#718080] dark:text-[#859896] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">{t.dashboard.averageQuizScore}</span>
              <Award className="w-4 h-4 text-[#14515A] dark:text-[#78b3bd]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] tabular-nums">
                {avgQuizScore}%
              </span>
              <span className="text-xs text-[#718080]">o‘rtacha</span>
            </div>
            <p className="text-[11px] text-[#718080] mt-2">
              {quizScores.length} ta test topshirildi
            </p>
          </div>

          {/* Daily Study Streak */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-xs">
            <div className="flex items-center justify-between text-[#718080] dark:text-[#859896] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">{t.dashboard.studyStreakDays}</span>
              <Flame className="w-4 h-4 text-orange-500 fill-current" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] tabular-nums">
                {progress.studyStreak}
              </span>
              <span className="text-xs text-[#718080]">kun uzluksiz</span>
            </div>
            <p className="text-[11px] text-[#718080] mt-2">
              Oxirgi faollik: bugun
            </p>
          </div>

          {/* Daily Study Target */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-xs">
            <div className="flex items-center justify-between text-[#718080] dark:text-[#859896] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">{t.dashboard.dailyTargetMinutes}</span>
              <Clock className="w-4 h-4 text-[#B88954]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] tabular-nums">
                {progress.dailyStudyMinutes}
              </span>
              <span className="text-xs text-[#718080]">/ {progress.dailyGoalMinutes} min</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => onUpdateGoalMinutes(Math.max(15, progress.dailyGoalMinutes - 15))}
                className="text-[11px] px-1.5 py-0.5 rounded border border-[#E1E6E1] dark:border-[#314348] cursor-pointer"
              >
                -15
              </button>
              <button
                onClick={() => onUpdateGoalMinutes(progress.dailyGoalMinutes + 15)}
                className="text-[11px] px-1.5 py-0.5 rounded border border-[#E1E6E1] dark:border-[#314348] cursor-pointer"
              >
                +15
              </button>
              <span className="text-[10px] text-[#718080]">Rejani sozlash</span>
            </div>
          </div>
        </div>

        {/* 2-Column Lists: Bookmarks & Unread Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Saved Bookmarks */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1]">
                  {t.dashboard.bookmarksList} ({bookmarkedArticlesList.length})
                </h3>
              </div>
            </div>

            {bookmarkedArticlesList.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#718080] dark:text-[#859896]">
                <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>{t.dashboard.noBookmarks}</p>
                <p className="text-[11px] mt-1">Maqolalarni o‘qiyotganda bayroqcha belgisini bosing.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {bookmarkedArticlesList.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="w-full text-left p-3 rounded-xl border border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-[#17323B] dark:text-[#F1F4F1] group-hover:text-[#B88954] transition-colors">
                        {article.title[currentLocale]}
                      </h4>
                      <span className="text-[10px] text-[#718080]">{article.period}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#718080] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Next Topics (Unread) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#14515A] dark:text-[#78b3bd]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1]">
                  O‘rganilishi tavsiya etilgan mavzular ({unreadArticlesList.length})
                </h3>
              </div>
            </div>

            {unreadArticlesList.length === 0 ? (
              <div className="py-8 text-center text-xs text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Barcha mavzular to‘liq o‘zlashtirildi!</p>
                <p className="text-[11px] mt-1">Siz platformadagi 12 ta akademik tadqiqotni yakunladingiz.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {unreadArticlesList.slice(0, 4).map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="w-full text-left p-3 rounded-xl border border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-[#17323B] dark:text-[#F1F4F1] group-hover:text-[#B88954] transition-colors">
                        {article.title[currentLocale]}
                      </h4>
                      <span className="text-[10px] text-[#718080]">
                        {article.period} · {article.readingMinutes} min
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#718080] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
