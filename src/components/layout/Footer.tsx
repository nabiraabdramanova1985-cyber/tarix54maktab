import React from 'react';
import { Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { BookOpen, Compass, ShieldCheck, GraduationCap, Mail } from 'lucide-react';

interface FooterProps {
  currentLocale: Locale;
  onTabChange: (tab: string) => void;
  onLocaleChange: (locale: Locale) => void;
  onOpenAuthorModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLocale, onTabChange, onLocaleChange, onOpenAuthorModal }) => {
  const t = DICTIONARIES[currentLocale];

  const authorTextByLocale = {
    uz: {
      badge: '54-maktab o‘qituvchisi',
      desc: 'Ushbu ta’limiy mavzu va interaktiv platforma 54-maktab o‘qituvchisi Abdramanova Nabira Kenesovna tomonidan ishlab chiqilgan va dars jarayoniga tatbiq etilgan.',
      btn: 'Muallif profili',
    },
    'uz-Cyrl': {
      badge: '54-мактаб ўқитувчиси',
      desc: 'Ушбу таълимий мавзу ва интерактив платформа 54-мактаб ўқитувчиси Абдраманова Набира Кенесовна томонидан ишлаб чиқилган ва дарс жараёнига татбиқ этилган.',
      btn: 'Муаллиф профили',
    },
    ru: {
      badge: 'Учитель школы № 54',
      desc: 'Данная образовательная платформа и методический комплекс разработаны учителем школы № 54 Абдрамановой Набирой Кенесовной.',
      btn: 'Профиль автора',
    },
    en: {
      badge: 'Teacher at School No. 54',
      desc: 'This educational curriculum and interactive platform were developed by School No. 54 educator Abdramanova Nabira Kenesovna.',
      btn: 'Author Profile',
    },
  }[currentLocale];

  return (
    <footer className="bg-[#FFFFFF] dark:bg-[#18262B] border-t border-[#E1E6E1] dark:border-[#314348] transition-colors duration-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Author & School Attribution Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#F7F6F1] dark:bg-[#10191D] border border-[#B88954]/30 dark:border-[#D6AB77]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                  Abdramanova Nabira Kenesovna
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#B88954]/15 text-[#B88954] dark:text-[#D6AB77] font-semibold">
                  {authorTextByLocale.badge}
                </span>
              </div>
              <p className="text-xs text-[#526367] dark:text-[#B6C4C2] mt-0.5">
                {authorTextByLocale.desc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <a
              href="mailto:nabiraabdramanova1985@gmail.com"
              className="text-xs font-mono text-[#526367] dark:text-[#B6C4C2] hover:text-[#B88954] dark:hover:text-[#D6AB77] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>nabiraabdramanova1985@gmail.com</span>
            </a>
            {onOpenAuthorModal && (
              <button
                onClick={onOpenAuthorModal}
                className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              >
                {authorTextByLocale.btn}
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Motto */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#17323B] dark:bg-[#D6AB77] flex items-center justify-center text-white dark:text-[#10191D] font-serif font-bold text-base">
                𐰉
              </div>
              <span className="text-xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs font-serif italic text-[#526367] dark:text-[#B6C4C2]">
              «{t.tagline}»
            </p>
            <p className="text-xs text-[#718080] dark:text-[#859896] leading-relaxed">
              {t.footer.aboutText}
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1] mb-3">
              {t.home.featuredThemesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-[#526367] dark:text-[#B6C4C2]">
              <li>
                <button onClick={() => onTabChange('turk')} className="hover:text-[#17323B] dark:hover:text-[#D6AB77] cursor-pointer">
                  {t.nav.turk}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('tang')} className="hover:text-[#17323B] dark:hover:text-[#D6AB77] cursor-pointer">
                  {t.nav.tang}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('compare')} className="hover:text-[#17323B] dark:hover:text-[#D6AB77] cursor-pointer">
                  {t.nav.compare}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('timeline')} className="hover:text-[#17323B] dark:hover:text-[#D6AB77] cursor-pointer">
                  {t.nav.timeline}
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1] mb-3">
              {t.nav.interactive}
            </h4>
            <ul className="space-y-2 text-xs text-[#526367] dark:text-[#B6C4C2]">
              <li>
                <button onClick={() => onTabChange('map')} className="hover:text-[#17323B] dark:hover:text-[#D6AB77] cursor-pointer">
                  {t.nav.map}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('quiz')} className="hover:text-[#17323B] dark:hover:text-[#D6AB77] cursor-pointer">
                  {t.nav.quiz}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('sources')} className="hover:text-[#17323B] dark:hover:text-[#D6AB77] cursor-pointer">
                  {t.nav.sources}
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('dashboard')} className="hover:text-[#17323B] dark:hover:text-[#D6AB77] cursor-pointer">
                  {t.nav.dashboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Foundation & Languages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1] mb-3">
              {t.sources.title}
            </h4>
            <p className="text-xs text-[#718080] dark:text-[#859896] mb-3 leading-relaxed">
              {t.footer.academicPartners}
            </p>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => onLocaleChange('uz')} 
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  currentLocale === 'uz' ? 'border-[#B88954] text-[#B88954] font-semibold' : 'border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
                }`}
              >
                O‘zbekcha
              </button>
              <button 
                onClick={() => onLocaleChange('uz-Cyrl')} 
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  currentLocale === 'uz-Cyrl' ? 'border-[#B88954] text-[#B88954] font-semibold' : 'border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
                }`}
              >
                Ўзбекча
              </button>
              <button 
                onClick={() => onLocaleChange('ru')} 
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  currentLocale === 'ru' ? 'border-[#B88954] text-[#B88954] font-semibold' : 'border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
                }`}
              >
                Русский
              </button>
              <button 
                onClick={() => onLocaleChange('en')} 
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  currentLocale === 'en' ? 'border-[#B88954] text-[#B88954] font-semibold' : 'border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Hairline divider & Copyright */}
        <div className="pt-6 border-t border-[#E1E6E1] dark:border-[#314348] flex flex-col sm:flex-row items-center justify-between text-xs text-[#718080] dark:text-[#859896] gap-4">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B88954] dark:text-[#D6AB77]" />
              {t.sources.verifiedAcademicRecord}
            </span>
            <span>·</span>
            <span className="font-editorial italic">552 — 907 CE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
