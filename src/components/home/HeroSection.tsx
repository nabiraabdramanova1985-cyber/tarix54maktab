import React from 'react';
import { Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { HISTORICAL_IMAGES } from '../../data/images';
import { ArrowRight, BookOpen, Compass, Award, GraduationCap, Sparkles, FileText } from 'lucide-react';

interface HeroSectionProps {
  currentLocale: Locale;
  onStartLearning: () => void;
  onTestKnowledge: () => void;
  onOpenAuthorModal?: () => void;
  onOpenFeaturedArticle?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLocale,
  onStartLearning,
  onTestKnowledge,
  onOpenAuthorModal,
  onOpenFeaturedArticle,
}) => {
  const t = DICTIONARIES[currentLocale];

  const authorBadgeByLocale = {
    uz: 'Loyiha muallifi va ishlab chiquvchisi: Abdramanova Nabira Kenesovna — 54-maktab o‘qituvchisi',
    'uz-Cyrl': 'Лойиҳа муаллифи ва ишлаб чиқувчиси: Абдраманова Набира Кенесовна — 54-мактаб ўқитувчиси',
    ru: 'Автор и разработчик: Абдраманова Набира Кенесовна — учитель школы № 54',
    en: 'Platform Author & Developer: Abdramanova Nabira Kenesovna — Teacher at School No. 54',
  }[currentLocale];

  const featuredPostLabel = {
    uz: '54-maktab metodik posti',
    'uz-Cyrl': '54-мактаб методик пости',
    ru: 'Методический пост школы № 54',
    en: 'School No. 54 Curriculum Post',
  }[currentLocale];

  const readPostLabel = {
    uz: 'Mavzuni o‘qish',
    'uz-Cyrl': 'Мавзуни ўқиш',
    ru: 'Читать материал',
    en: 'Read Curriculum Post',
  }[currentLocale];

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header Marker & Author Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896]">
            <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
              Vol. I · Akademik Tarixiy Portal
            </span>
            <span aria-hidden="true">·</span>
            <span>552 — 907 CE</span>
            <span aria-hidden="true">·</span>
            <span>Markaziy va Sharqiy Osiyo</span>
          </div>

          {onOpenAuthorModal && (
            <button
              onClick={onOpenAuthorModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#18262B] border border-[#B88954]/40 dark:border-[#D6AB77]/40 shadow-xs hover:border-[#B88954] transition-all cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] flex items-center justify-center text-[10px]">
                <GraduationCap className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium text-[#17323B] dark:text-[#F1F4F1]">
                {authorBadgeByLocale}
              </span>
              <ArrowRight className="w-3 h-3 text-[#B88954] dark:text-[#D6AB77] group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold tracking-tight text-[#17323B] dark:text-[#F1F4F1] leading-[1.15] text-balance mb-6">
              {t.home.heroTitle}
            </h1>
            
            <p className="text-base sm:text-lg text-[#526367] dark:text-[#B6C4C2] leading-relaxed max-w-2xl mb-8">
              {t.home.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onStartLearning}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] font-medium text-sm hover:bg-[#14515A] dark:hover:bg-[#e0b98a] transition-colors cursor-pointer shadow-sm group"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.actions.startLearning}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onTestKnowledge}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-[#18262B] text-[#17323B] dark:text-[#F1F4F1] font-medium text-sm hover:bg-stone-50 dark:hover:bg-[#203238] transition-colors cursor-pointer border border-[#E1E6E1] dark:border-[#314348]"
              >
                <Award className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
                <span>{t.actions.testKnowledge}</span>
              </button>
            </div>

            {/* Featured Post Banner: By Abdramanova Nabira Kenesovna (54-maktab) */}
            {onOpenFeaturedArticle && (
              <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-amber-50/70 dark:bg-[#10191D] border border-[#B88954]/30 dark:border-[#D6AB77]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#B88954]/20 text-[#B88954] dark:text-[#D6AB77] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#B88954] dark:text-[#D6AB77] block">
                      {featuredPostLabel} · Abdramanova Nabira Kenesovna
                    </span>
                    <p className="text-xs font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                      Turk xoqonligi va Tan imperiyasi integratsiyasi (Darslik va interaktiv ta’lim)
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenFeaturedArticle}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap self-end sm:self-auto"
                >
                  {readPostLabel}
                </button>
              </div>
            )}

            {/* Footnote citation bar */}
            <div className="mt-6 pt-4 border-t border-[#E1E6E1] dark:border-[#314348] text-xs text-[#718080] dark:text-[#859896] flex items-center gap-3">
              <span className="font-editorial italic">«El ketishi mumkin, ammo Törü qoladi»</span>
              <span>—</span>
              <span>Qadimgi turkiy davlatchilik formulasi</span>
            </div>
          </div>

          {/* Right Visual Column (High-Fidelity Generated Orkhon Stele Museum Photo) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-full min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#E1E6E1] dark:border-[#314348] shadow-md group">
              <img
                src={HISTORICAL_IMAGES.heroOrkhonMonument}
                alt="Kul Tigin and Bilga Khagan runic stele monument in the Orkhon Valley"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#D6AB77] font-semibold block mb-0.5">
                  Arxeologik yodgorlik
                </span>
                <p className="text-xs font-serif leading-snug text-stone-200">
                  Orxon vodiysi: Toshbaqa poydevor ustidagi Kultegin bitiktoshi (732 CE)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quantitative Proof Pillars Full-Width Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-sm">
          <div className="p-3">
            <span className="block text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#D6AB77] tabular-nums">
              {t.home.stats.centuries}
            </span>
            <span className="text-xs font-medium text-[#526367] dark:text-[#B6C4C2] block mt-1">
              {t.home.stats.centuriesDesc}
            </span>
          </div>

          <div className="p-3 border-l border-[#E1E6E1] dark:border-[#314348]">
            <span className="block text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#D6AB77] tabular-nums">
              {t.home.stats.sources}
            </span>
            <span className="text-xs font-medium text-[#526367] dark:text-[#B6C4C2] block mt-1">
              {t.home.stats.sourcesDesc}
            </span>
          </div>

          <div className="p-3 border-l border-[#E1E6E1] dark:border-[#314348]">
            <span className="block text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#D6AB77] tabular-nums">
              {t.home.stats.articles}
            </span>
            <span className="text-xs font-medium text-[#526367] dark:text-[#B6C4C2] block mt-1">
              {t.home.stats.articlesDesc}
            </span>
          </div>

          <div className="p-3 border-l border-[#E1E6E1] dark:border-[#314348]">
            <span className="block text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#D6AB77] tabular-nums">
              {t.home.stats.quizzes}
            </span>
            <span className="text-xs font-medium text-[#526367] dark:text-[#B6C4C2] block mt-1">
              {t.home.stats.quizzesDesc}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
