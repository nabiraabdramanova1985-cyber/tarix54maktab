import React, { useState } from 'react';
import { 
  Globe, 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap
} from 'lucide-react';
import { Locale, UserRole } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';

interface HeaderProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  currentTheme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAiChat: () => void;
  onOpenAuthorModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocale,
  onLocaleChange,
  currentTheme,
  onThemeChange,
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenSearch,
  onOpenAiChat,
  onOpenAuthorModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const t = DICTIONARIES[currentLocale];

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'turk', label: t.nav.turk },
    { id: 'tang', label: t.nav.tang },
    { id: 'compare', label: t.nav.compare },
    { id: 'timeline', label: t.nav.timeline },
    { id: 'map', label: t.nav.map },
    { id: 'quiz', label: t.nav.quiz },
    { id: 'interactive', label: t.nav.interactive },
    { id: 'sources', label: t.nav.sources },
    { id: 'dashboard', label: t.nav.dashboard },
  ];

  if (currentRole === 'admin' || currentRole === 'teacher') {
    navLinks.push({ id: 'admin', label: t.nav.admin });
  }

  const localeLabels: Record<Locale, { label: string; code: string }> = {
    uz: { label: 'O‘zbekcha (Lotin)', code: 'UZ' },
    'uz-Cyrl': { label: 'Ўзбекча (Кирилл)', code: 'ЎЗ' },
    ru: { label: 'Русский', code: 'RU' },
    en: { label: 'English', code: 'EN' },
  };

  const roleLabels: Record<UserRole, { label: string; badge: string }> = {
    guest: { label: 'Mehmon (Guest)', badge: 'G' },
    student: { label: 'Talaba (Student)', badge: 'S' },
    teacher: { label: 'O‘qituvchi (Teacher)', badge: 'T' },
    admin: { label: 'Administrator', badge: 'A' },
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F6F1]/95 dark:bg-[#10191D]/95 backdrop-blur-md border-b border-[#E1E6E1] dark:border-[#314348] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Zone 1: Single text element wordmark with historical stele glyph */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onTabChange('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-[#17323B] dark:bg-[#D6AB77] flex items-center justify-center text-white dark:text-[#10191D] font-serif font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
                𐰉
              </div>
              <div>
                <span className="text-xl font-editorial font-bold tracking-tight text-[#17323B] dark:text-[#F1F4F1] whitespace-nowrap">
                  {t.brandName}
                </span>
                <span className="hidden sm:block text-[11px] font-sans tracking-widest uppercase text-[#718080] dark:text-[#859896] -mt-1">
                  552 — 907 CE
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 core navigation text links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#526367] dark:text-[#B6C4C2]">
            {navLinks.slice(0, 7).map((link) => (
              <button
                key={link.id}
                onClick={() => onTabChange(link.id)}
                className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 text-xs xl:text-sm ${
                  activeTab === link.id
                    ? 'border-[#B88954] dark:border-[#D6AB77] text-[#17323B] dark:text-[#F1F4F1] font-semibold'
                    : 'border-transparent hover:text-[#17323B] dark:hover:text-[#F1F4F1] hover:border-[#E1E6E1] dark:hover:border-[#314348]'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {/* More menu dropdown for remaining links */}
            <div className="relative group">
              <button className="text-xs xl:text-sm font-medium hover:text-[#17323B] dark:hover:text-[#F1F4F1] py-1 cursor-pointer flex items-center gap-1">
                <span>{t.actions.all}</span>
                <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute right-0 mt-1 w-48 py-2 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                {navLinks.slice(7).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onTabChange(link.id)}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                      activeTab === link.id
                        ? 'bg-[#E6F0EB] dark:bg-[#203238] text-[#17323B] dark:text-[#F1F4F1] font-semibold'
                        : 'text-[#526367] dark:text-[#B6C4C2] hover:bg-stone-50 dark:hover:bg-[#203238]/50'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Zone 3: Actions (Search, Language, Theme, Role, AI Assistant) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1] rounded-lg hover:bg-stone-200/50 dark:hover:bg-[#203238] transition-colors cursor-pointer"
              title={t.actions.searchShortcut}
              aria-label={t.actions.searchShortcut}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-[#17323B] dark:text-[#F1F4F1] hover:bg-stone-200/50 dark:hover:bg-[#203238] transition-colors cursor-pointer border border-[#E1E6E1] dark:border-[#314348]"
                aria-label="Language selector"
              >
                <Globe className="w-3.5 h-3.5 text-[#B88954] dark:text-[#D6AB77]" />
                <span className="font-semibold uppercase tracking-wider">{localeLabels[currentLocale].code}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-1.5 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {(['uz', 'uz-Cyrl', 'ru', 'en'] as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        onLocaleChange(loc);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentLocale === loc
                          ? 'bg-[#E6F0EB] dark:bg-[#203238] text-[#17323B] dark:text-[#D6AB77] font-semibold'
                          : 'text-[#526367] dark:text-[#B6C4C2] hover:bg-stone-50 dark:hover:bg-[#203238]/60'
                      }`}
                    >
                      <span>{localeLabels[loc].label}</span>
                      {currentLocale === loc && <CheckCircle2 className="w-3.5 h-3.5 text-[#B88954] dark:text-[#D6AB77]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Switcher */}
            <button
              onClick={() => {
                if (currentTheme === 'light') onThemeChange('dark');
                else if (currentTheme === 'dark') onThemeChange('system');
                else onThemeChange('light');
              }}
              className="p-2 text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1] rounded-lg hover:bg-stone-200/50 dark:hover:bg-[#203238] transition-colors cursor-pointer border border-[#E1E6E1] dark:border-[#314348]"
              title={`Rejim: ${currentTheme}`}
              aria-label="Toggle Theme"
            >
              {currentTheme === 'dark' ? (
                <Moon className="w-4 h-4 text-[#D6AB77]" />
              ) : (
                <Sun className="w-4 h-4 text-[#B88954]" />
              )}
            </button>

            {/* Role Persona Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-[#17323B] dark:text-[#F1F4F1] hover:bg-stone-200/50 dark:hover:bg-[#203238] transition-colors cursor-pointer border border-[#E1E6E1] dark:border-[#314348]"
                title={t.dashboard.roleSelector}
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#B88954] dark:text-[#D6AB77]" />
                <span className="capitalize">{currentRole}</span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 py-1.5 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-xl shadow-xl z-50">
                  <div className="px-3.5 py-1 text-[10px] uppercase tracking-wider text-[#718080] dark:text-[#859896] font-semibold border-b border-[#E1E6E1] dark:border-[#314348]">
                    {t.dashboard.roleSelector}
                  </div>
                  {(['student', 'teacher', 'admin', 'guest'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        onRoleChange(role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        currentRole === role
                          ? 'bg-[#E6F0EB] dark:bg-[#203238] text-[#17323B] dark:text-[#D6AB77] font-semibold'
                          : 'text-[#526367] dark:text-[#B6C4C2] hover:bg-stone-50 dark:hover:bg-[#203238]/60'
                      }`}
                    >
                      <span>{roleLabels[role].label}</span>
                      {currentRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-[#B88954] dark:text-[#D6AB77]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Author Attribution Button */}
            {onOpenAuthorModal && (
              <button
                onClick={onOpenAuthorModal}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17323B] dark:text-[#F1F4F1] hover:bg-stone-200/50 dark:hover:bg-[#203238] transition-colors cursor-pointer border border-[#B88954]/50 dark:border-[#D6AB77]/50"
                title="Loyiha muallifi: Abdramanova Nabira Kenesovna (54-maktab o‘qituvchisi)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#B88954] dark:text-[#D6AB77]" />
                <span className="font-serif">54-maktab · N. Abdramanova</span>
              </button>
            )}

            {/* AI Assistant CTA button */}
            <button
              onClick={onOpenAiChat}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] hover:bg-[#14515A] dark:hover:bg-[#e0b98a] transition-colors cursor-pointer shadow-sm whitespace-nowrap"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.actions.askHistorian}</span>
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F6F1] dark:bg-[#18262B] border-b border-[#E1E6E1] dark:border-[#314348] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onTabChange(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] font-medium'
                    : 'text-[#526367] dark:text-[#B6C4C2] bg-white dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          {onOpenAuthorModal && (
            <button
              onClick={() => {
                onOpenAuthorModal();
                setMobileMenuOpen(false);
              }}
              className="w-full mb-3 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white dark:bg-[#203238] border border-[#B88954]/50 dark:border-[#D6AB77]/50 text-xs font-medium text-[#17323B] dark:text-[#F1F4F1]"
            >
              <GraduationCap className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
              <span>Muallif: Abdramanova Nabira Kenesovna (54-maktab)</span>
            </button>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-[#E1E6E1] dark:border-[#314348] text-xs">
            <span className="text-[#718080] dark:text-[#859896]">{t.dashboard.currentRole}:</span>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-white dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] rounded px-2 py-1 text-xs text-[#17323B] dark:text-[#F1F4F1]"
            >
              <option value="student">Talaba (Student)</option>
              <option value="teacher">O‘qituvchi (Teacher)</option>
              <option value="admin">Administrator</option>
              <option value="guest">Mehmon (Guest)</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
