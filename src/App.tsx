/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Locale, UserRole, Article, UserProgress } from './types';
import { 
  getSavedLocale, 
  saveLocale, 
  getSavedTheme, 
  saveTheme, 
  getSavedRole, 
  saveRole, 
  getSavedProgress, 
  saveProgress 
} from './lib/storage';
import { DICTIONARIES } from './lib/i18n';
import { HISTORICAL_ARTICLES } from './data/articles';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { HeroSection } from './components/home/HeroSection';
import { DailyChallengeCard } from './components/home/DailyChallengeCard';
import { ArticleCatalog } from './components/history/ArticleCatalog';
import { ArticleDetailModal } from './components/history/ArticleDetailModal';
import { StateComparison } from './components/history/StateComparison';
import { TimelineView } from './components/history/TimelineView';
import { HistoricalMap } from './components/history/HistoricalMap';
import { SourcesLibrary } from './components/history/SourcesLibrary';
import { QuizEngine } from './components/learning/QuizEngine';
import { CreativeLearningHub } from './components/learning/CreativeLearningHub';
import { StudentDashboard } from './components/learning/StudentDashboard';
import { TarixchiChatModal } from './components/ai/TarixchiChatModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthorProfileModal } from './components/author/AuthorProfileModal';
import { ArrowRight, BookOpen, Compass, Scale, Calendar, MapPin, Award } from 'lucide-react';

export default function App() {
  const [currentLocale, setCurrentLocale] = useState<Locale>(getSavedLocale());
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>(getSavedTheme());
  const [currentRole, setCurrentRole] = useState<UserRole>(getSavedRole());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [progress, setProgress] = useState<UserProgress>(getSavedProgress());

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  // Sync Theme
  useEffect(() => {
    saveTheme(currentTheme);
    const root = document.documentElement;
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else if (currentTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [currentTheme]);

  // Sync Locale
  const handleLocaleChange = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    saveLocale(newLocale);
    document.documentElement.lang = newLocale;
  };

  // Sync Role
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    saveRole(newRole);
  };

  // User Progress handlers
  const handleToggleBookmark = (id: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedArticles.includes(id);
      const updated = {
        ...prev,
        bookmarkedArticles: exists
          ? prev.bookmarkedArticles.filter((item) => item !== id)
          : [...prev.bookmarkedArticles, id],
      };
      saveProgress(updated);
      return updated;
    });
  };

  const handleToggleBookmarkQuestion = (id: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedQuestions.includes(id);
      const updated = {
        ...prev,
        bookmarkedQuestions: exists
          ? prev.bookmarkedQuestions.filter((item) => item !== id)
          : [...prev.bookmarkedQuestions, id],
      };
      saveProgress(updated);
      return updated;
    });
  };

  const handleToggleCompleted = (id: string) => {
    setProgress((prev) => {
      const exists = prev.completedArticles.includes(id);
      const updated = {
        ...prev,
        completedArticles: exists
          ? prev.completedArticles.filter((item) => item !== id)
          : [...prev.completedArticles, id],
      };
      saveProgress(updated);
      return updated;
    });
  };

  const handleSaveScore = (topicId: string, score: number, total: number) => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [topicId]: { score, total, date: new Date().toISOString().split('T')[0] },
        },
        dailyStudyMinutes: prev.dailyStudyMinutes + 10,
      };
      saveProgress(updated);
      return updated;
    });
  };

  const handleClearProgress = () => {
    if (window.confirm('Barcha shaxsiy progress ma’lumotlarini tozalashni tasdiqlaysizmi?')) {
      const cleanProgress: UserProgress = {
        completedArticles: [],
        bookmarkedArticles: [],
        bookmarkedQuestions: [],
        quizScores: {},
        dailyStudyMinutes: 0,
        dailyGoalMinutes: 30,
        studyStreak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      setProgress(cleanProgress);
      saveProgress(cleanProgress);
    }
  };

  const handleUpdateGoalMinutes = (mins: number) => {
    setProgress((prev) => {
      const updated = { ...prev, dailyGoalMinutes: mins };
      saveProgress(updated);
      return updated;
    });
  };

  const t = DICTIONARIES[currentLocale];

  // Article Reader Prev/Next logic
  const currentArticleIndex = selectedArticle
    ? HISTORICAL_ARTICLES.findIndex((a) => a.id === selectedArticle.id)
    : -1;

  const handleNextArticle = () => {
    if (currentArticleIndex !== -1 && currentArticleIndex < HISTORICAL_ARTICLES.length - 1) {
      setSelectedArticle(HISTORICAL_ARTICLES[currentArticleIndex + 1]);
    }
  };

  const handlePrevArticle = () => {
    if (currentArticleIndex > 0) {
      setSelectedArticle(HISTORICAL_ARTICLES[currentArticleIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F1] dark:bg-[#10191D] text-[#17323B] dark:text-[#F1F4F1] transition-colors duration-200">
      
      {/* Top Bar Header */}
      <Header
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleChange}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onOpenAuthorModal={() => setIsAuthorModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Museum Hero Section */}
            <HeroSection
              currentLocale={currentLocale}
              onStartLearning={() => setActiveTab('turk')}
              onTestKnowledge={() => setActiveTab('quiz')}
              onOpenAuthorModal={() => setIsAuthorModalOpen(true)}
              onOpenFeaturedArticle={() => {
                const featured = HISTORICAL_ARTICLES.find((a) => a.id === 'abdramanova-nabira-turk-tang-pedagogik-tadqiqot');
                if (featured) setSelectedArticle(featured);
              }}
            />

            {/* Daily Challenge & Fast Access Hub */}
            <section className="py-8 border-t border-[#E1E6E1] dark:border-[#314348]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Daily Question Card (col-span-7) */}
                  <div className="lg:col-span-7">
                    <DailyChallengeCard
                      currentLocale={currentLocale}
                      onExploreMore={() => setActiveTab('interactive')}
                    />
                  </div>

                  {/* Fast Jump Matrix (col-span-5) */}
                  <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#B88954] dark:text-[#D6AB77] block mb-1">
                        Tezkor o‘rganish yo‘li
                      </span>
                      <h3 className="text-lg font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-4">
                        Tarixiy jarayonlar xaritasi
                      </h3>
                      
                      <div className="space-y-2">
                        <button
                          onClick={() => setActiveTab('turk')}
                          className="w-full text-left p-3 rounded-xl border border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <BookOpen className="w-4 h-4 text-[#B88954]" />
                            <span className="text-xs font-semibold">Turk xoqonligi (552–744)</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#718080]" />
                        </button>

                        <button
                          onClick={() => setActiveTab('tang')}
                          className="w-full text-left p-3 rounded-xl border border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <BookOpen className="w-4 h-4 text-[#14515A]" />
                            <span className="text-xs font-semibold">Tan imperiyasi (618–907)</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#718080]" />
                        </button>

                        <button
                          onClick={() => setActiveTab('compare')}
                          className="w-full text-left p-3 rounded-xl border border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <Scale className="w-4 h-4 text-[#B88954]" />
                            <span className="text-xs font-semibold">14 ta mezonli taqqoslash</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#718080]" />
                        </button>

                        <button
                          onClick={() => setActiveTab('map')}
                          className="w-full text-left p-3 rounded-xl border border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-[#D6AB77]" />
                            <span className="text-xs font-semibold">Interaktiv Yevroosiyo xaritasi</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#718080]" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E1E6E1] dark:border-[#314348] flex items-center justify-between text-xs text-[#718080]">
                      <span>Barcha manbalar tekshirilgan</span>
                      <span className="font-mono text-[#B88954]">100% Akademik</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Featured Articles Catalog Preview */}
            <section className="py-8 border-t border-[#E1E6E1] dark:border-[#314348]">
              <ArticleCatalog
                articles={HISTORICAL_ARTICLES}
                currentLocale={currentLocale}
                initialStateFilter="all"
                completedArticleIds={progress.completedArticles}
                bookmarkedArticleIds={progress.bookmarkedArticles}
                onSelectArticle={(article) => setSelectedArticle(article)}
                onToggleBookmark={handleToggleBookmark}
              />
            </section>
          </div>
        )}

        {/* Turk Khaganate Dedicated Deep-Dive */}
        {activeTab === 'turk' && (
          <ArticleCatalog
            articles={HISTORICAL_ARTICLES.filter((a) => a.state === 'turk' || a.state === 'both')}
            currentLocale={currentLocale}
            initialStateFilter="turk"
            completedArticleIds={progress.completedArticles}
            bookmarkedArticleIds={progress.bookmarkedArticles}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* Tang Dynasty Dedicated Deep-Dive */}
        {activeTab === 'tang' && (
          <ArticleCatalog
            articles={HISTORICAL_ARTICLES.filter((a) => a.state === 'tang' || a.state === 'both')}
            currentLocale={currentLocale}
            initialStateFilter="tang"
            completedArticleIds={progress.completedArticles}
            bookmarkedArticleIds={progress.bookmarkedArticles}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* 14 Criteria Side-by-Side Comparison Matrix */}
        {activeTab === 'compare' && (
          <StateComparison currentLocale={currentLocale} />
        )}

        {/* Chronological Timeline 552 to 907 */}
        {activeTab === 'timeline' && (
          <TimelineView currentLocale={currentLocale} />
        )}

        {/* Interactive Vector Historical Map */}
        {activeTab === 'map' && (
          <HistoricalMap currentLocale={currentLocale} />
        )}

        {/* Knowledge Assessment & Quizzes */}
        {activeTab === 'quiz' && (
          <QuizEngine
            currentLocale={currentLocale}
            onSaveScore={handleSaveScore}
            bookmarkedQuestionIds={progress.bookmarkedQuestions}
            onToggleBookmarkQuestion={handleToggleBookmarkQuestion}
          />
        )}

        {/* Creative Learning Lab */}
        {activeTab === 'interactive' && (
          <CreativeLearningHub currentLocale={currentLocale} />
        )}

        {/* Historical Primary Sources & Library */}
        {activeTab === 'sources' && (
          <SourcesLibrary currentLocale={currentLocale} />
        )}

        {/* Student & Researcher Dashboard */}
        {activeTab === 'dashboard' && (
          <StudentDashboard
            currentLocale={currentLocale}
            progress={progress}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onClearProgress={handleClearProgress}
            onUpdateGoalMinutes={handleUpdateGoalMinutes}
          />
        )}

        {/* Faculty and Admin Management Console */}
        {activeTab === 'admin' && (
          <AdminDashboard currentLocale={currentLocale} />
        )}
      </main>

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currentLocale={currentLocale}
        onNavigate={(tab, itemParam) => {
          setActiveTab(tab);
          if (itemParam) {
            const art = HISTORICAL_ARTICLES.find((a) => a.id === itemParam);
            if (art) setSelectedArticle(art);
          }
        }}
      />

      {/* AI Assistant "Tarixchi" Virtual Advisor */}
      <TarixchiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        currentLocale={currentLocale}
      />

      {/* Full-view Article Reading Drawer Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        currentLocale={currentLocale}
        isBookmarked={selectedArticle ? progress.bookmarkedArticles.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        isCompleted={selectedArticle ? progress.completedArticles.includes(selectedArticle.id) : false}
        onToggleCompleted={handleToggleCompleted}
        onNextArticle={currentArticleIndex < HISTORICAL_ARTICLES.length - 1 ? handleNextArticle : undefined}
        onPrevArticle={currentArticleIndex > 0 ? handlePrevArticle : undefined}
      />

      {/* Editorial Footer */}
      <Footer
        currentLocale={currentLocale}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLocaleChange={handleLocaleChange}
        onOpenAuthorModal={() => setIsAuthorModalOpen(true)}
      />

      {/* Author & Pedagogical Developer Modal */}
      <AuthorProfileModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
        currentLocale={currentLocale}
        onOpenFeaturedArticle={() => {
          setIsAuthorModalOpen(false);
          const featured = HISTORICAL_ARTICLES.find((a) => a.id === 'abdramanova-nabira-turk-tang-pedagogik-tadqiqot');
          if (featured) setSelectedArticle(featured);
        }}
      />
    </div>
  );
}
