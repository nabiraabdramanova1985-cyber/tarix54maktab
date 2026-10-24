import React, { useState, useMemo } from 'react';
import { Article, Locale, StateDomain, Difficulty } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  RotateCcw,
  GraduationCap
} from 'lucide-react';

interface ArticleCatalogProps {
  articles: Article[];
  currentLocale: Locale;
  initialStateFilter?: StateDomain | 'all';
  completedArticleIds: string[];
  bookmarkedArticleIds: string[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (id: string) => void;
}

export const ArticleCatalog: React.FC<ArticleCatalogProps> = ({
  articles,
  currentLocale,
  initialStateFilter = 'all',
  completedArticleIds,
  bookmarkedArticleIds,
  onSelectArticle,
  onToggleBookmark,
}) => {
  const [stateFilter, setStateFilter] = useState<StateDomain | 'all'>(initialStateFilter);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const t = DICTIONARIES[currentLocale];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // State Filter
      if (stateFilter !== 'all') {
        if (stateFilter === 'turk' && article.state !== 'turk') return false;
        if (stateFilter === 'tang' && article.state !== 'tang') return false;
        if (stateFilter === 'silk_road' && article.state !== 'silk_road' && article.state !== 'both') return false;
      }

      // Difficulty Filter
      if (difficultyFilter !== 'all' && article.difficulty !== difficultyFilter) {
        return false;
      }

      // Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = article.title[currentLocale].toLowerCase().includes(q);
        const matchesSummary = article.summary[currentLocale].toLowerCase().includes(q);
        const matchesConcept = article.keyConcepts[currentLocale].some((c) => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesConcept) return false;
      }

      return true;
    });
  }, [articles, stateFilter, difficultyFilter, searchQuery, currentLocale]);

  const clearFilters = () => {
    setStateFilter('all');
    setDifficultyFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-2">
            <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
              Mavzular katalogi
            </span>
            <span aria-hidden="true">·</span>
            <span>{filteredArticles.length} ta tadqiqot mavzusi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
            {t.home.featuredThemesTitle}
          </h2>
          <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-1">
            {t.home.featuredThemesSubtitle}
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#718080] dark:text-[#859896] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.actions.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] rounded-xl text-[#17323B] dark:text-[#F1F4F1] placeholder-[#718080] focus:outline-none focus:ring-1 focus:ring-[#B88954]"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 shrink-0 p-1 bg-stone-100 dark:bg-[#203238] rounded-xl border border-[#E1E6E1] dark:border-[#314348]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-[#18262B] text-[#17323B] dark:text-[#F1F4F1] shadow-sm font-medium'
                    : 'text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1]'
                }`}
                title="Kartalar ko‘rinishi"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-[#18262B] text-[#17323B] dark:text-[#F1F4F1] shadow-sm font-medium'
                    : 'text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1]'
                }`}
                title="Ro‘yxat ko‘rinishi"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E1E6E1] dark:border-[#314348]">
            {/* State filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] mr-1 hidden sm:inline">
                Davlat:
              </span>
              {[
                { id: 'all', label: t.filters.allStates },
                { id: 'turk', label: t.filters.turkKhaganate },
                { id: 'tang', label: t.filters.tangDynasty },
                { id: 'silk_road', label: t.filters.diplomacySilkRoad },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setStateFilter(btn.id as any)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                    stateFilter === btn.id
                      ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold shadow-xs'
                      : 'bg-white dark:bg-[#203238] border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2] hover:bg-stone-50'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] hidden sm:inline">
                {t.filters.difficulty}:
              </span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as any)}
                className="bg-stone-50 dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-xs text-[#17323B] dark:text-[#F1F4F1] rounded-lg px-2.5 py-1 focus:outline-none"
              >
                <option value="all">{t.filters.allDifficulties}</option>
                <option value="beginner">{t.filters.beginner}</option>
                <option value="intermediate">{t.filters.intermediate}</option>
                <option value="advanced">{t.filters.advanced}</option>
              </select>

              {(stateFilter !== 'all' || difficultyFilter !== 'all' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#B88954] dark:text-[#D6AB77] hover:underline cursor-pointer ml-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t.actions.clearFilters}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="py-16 text-center bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-8">
            <BookOpen className="w-10 h-10 text-[#718080] mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-semibold text-[#17323B] dark:text-[#F1F4F1] mb-1">
              Hech qanday maqola topilmadi
            </h3>
            <p className="text-xs text-[#718080] dark:text-[#859896] mb-4">
              Tanlangan filtrlar yoki qidiruv so‘ziga mos keluvchi materiallar mavjud emas.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] hover:bg-[#14515A] cursor-pointer"
            >
              {t.actions.clearFilters}
            </button>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const isCompleted = completedArticleIds.includes(article.id);
              const isBookmarked = bookmarkedArticleIds.includes(article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group"
                >
                  {/* Article Thumbnail */}
                  <div className="relative h-44 overflow-hidden bg-stone-100 dark:bg-[#203238]">
                    <img
                      src={article.imageUrl}
                      alt={article.title[currentLocale]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                        {article.period}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(article.id);
                        }}
                        className={`p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors ${
                          isBookmarked ? 'text-[#D6AB77]' : ''
                        }`}
                        title={isBookmarked ? t.actions.bookmarked : t.actions.bookmark}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {isCompleted && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-emerald-300 font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.actions.completed}</span>
                      </div>
                    )}
                  </div>

                  {/* Article Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-[#718080] dark:text-[#859896] mb-2">
                        <span className="font-semibold text-[#B88954] dark:text-[#D6AB77]">
                          {article.state === 'turk' ? 'Turk xoqonligi' : article.state === 'tang' ? 'Tan imperiyasi' : 'Ipak yo‘li'}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readingMinutes} min</span>
                        </span>
                      </div>

                      {article.id === 'abdramanova-nabira-turk-tang-pedagogik-tadqiqot' && (
                        <div className="mb-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-100/70 dark:bg-amber-950/40 text-[#B88954] dark:text-[#D6AB77] text-[10px] font-bold">
                          <GraduationCap className="w-3 h-3" />
                          <span>54-maktab mualliflik darsligi</span>
                        </div>
                      )}

                      <h3 className="text-base font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] group-hover:text-[#B88954] dark:group-hover:text-[#D6AB77] transition-colors leading-snug mb-2 line-clamp-2">
                        {article.title[currentLocale]}
                      </h3>

                      <p className="text-xs text-[#526367] dark:text-[#B6C4C2] line-clamp-3 leading-relaxed mb-4">
                        {article.summary[currentLocale]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E1E6E1] dark:border-[#314348] flex items-center justify-between text-xs font-semibold text-[#17323B] dark:text-[#F1F4F1]">
                      <span className="text-[11px] font-normal text-[#718080] dark:text-[#859896] truncate max-w-[170px]">
                        {article.author}
                      </span>
                      <div className="flex items-center gap-1 group-hover:underline text-[#B88954] dark:text-[#D6AB77]">
                        <span>{t.actions.readArticle}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredArticles.map((article) => {
              const isCompleted = completedArticleIds.includes(article.id);
              const isBookmarked = bookmarkedArticleIds.includes(article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="bg-white dark:bg-[#18262B] p-5 rounded-2xl border border-[#E1E6E1] dark:border-[#314348] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-1.5">
                      <span className="font-semibold text-[#B88954] dark:text-[#D6AB77]">
                        {article.state === 'turk' ? 'Turk xoqonligi' : article.state === 'tang' ? 'Tan imperiyasi' : 'Ipak yo‘li'}
                      </span>
                      <span>·</span>
                      <span>{article.period}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readingMinutes} min</span>
                      </span>
                      {isCompleted && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 ml-2">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.actions.completed}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] group-hover:text-[#B88954] dark:group-hover:text-[#D6AB77] transition-colors mb-1">
                      {article.title[currentLocale]}
                    </h3>

                    <p className="text-xs text-[#526367] dark:text-[#B6C4C2] line-clamp-2 max-w-3xl leading-relaxed">
                      {article.summary[currentLocale]}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      className={`p-2 rounded-lg border border-[#E1E6E1] dark:border-[#314348] transition-colors ${
                        isBookmarked ? 'bg-[#B88954]/10 text-[#B88954]' : 'text-[#718080] hover:text-[#17323B]'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    <ArrowRight className="w-5 h-5 text-[#B88954] dark:text-[#D6AB77] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
