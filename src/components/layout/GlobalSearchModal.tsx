import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, User, Calendar, FileText, ArrowRight } from 'lucide-react';
import { Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { HISTORICAL_ARTICLES } from '../../data/articles';
import { HISTORICAL_PERSONS } from '../../data/persons';
import { TIMELINE_EVENTS } from '../../data/timeline';
import { HISTORICAL_SOURCES } from '../../data/sources';
import { HISTORICAL_GLOSSARY } from '../../data/glossary';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
  onNavigate: (tab: string, itemParam?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const t = DICTIONARIES[currentLocale];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results
  const matchedArticles = normalizedQuery
    ? HISTORICAL_ARTICLES.filter((a) =>
        a.title[currentLocale].toLowerCase().includes(normalizedQuery) ||
        a.summary[currentLocale].toLowerCase().includes(normalizedQuery) ||
        a.author.toLowerCase().includes(normalizedQuery) ||
        a.keyConcepts[currentLocale].some((c) => c.toLowerCase().includes(normalizedQuery))
      ).slice(0, 4)
    : [];

  const matchedPersons = normalizedQuery
    ? HISTORICAL_PERSONS.filter((p) =>
        p.name[currentLocale].toLowerCase().includes(normalizedQuery) ||
        p.nativeTitle.toLowerCase().includes(normalizedQuery) ||
        p.roleTitle[currentLocale].toLowerCase().includes(normalizedQuery)
      ).slice(0, 3)
    : [];

  const matchedEvents = normalizedQuery
    ? TIMELINE_EVENTS.filter((e) =>
        e.year.toString().includes(normalizedQuery) ||
        e.title[currentLocale].toLowerCase().includes(normalizedQuery) ||
        e.description[currentLocale].toLowerCase().includes(normalizedQuery)
      ).slice(0, 3)
    : [];

  const matchedGlossary = normalizedQuery
    ? HISTORICAL_GLOSSARY.filter((g) =>
        g.term[currentLocale].toLowerCase().includes(normalizedQuery) ||
        g.definition[currentLocale].toLowerCase().includes(normalizedQuery)
      ).slice(0, 3)
    : [];

  const totalResults =
    matchedArticles.length +
    matchedPersons.length +
    matchedEvents.length +
    matchedGlossary.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#18262B] rounded-2xl shadow-2xl border border-[#E1E6E1] dark:border-[#314348] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E1E6E1] dark:border-[#314348]">
          <Search className="w-5 h-5 text-[#B88954] dark:text-[#D6AB77] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.actions.searchPlaceholder}
            className="w-full bg-transparent text-sm sm:text-base text-[#17323B] dark:text-[#F1F4F1] placeholder-[#718080] dark:placeholder-[#859896] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-block text-[11px] text-[#718080] dark:text-[#859896] bg-stone-100 dark:bg-[#203238] px-2 py-0.5 rounded border border-[#E1E6E1] dark:border-[#314348]">
              ESC
            </span>
          )}
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!normalizedQuery && (
            <div className="py-8 text-center text-xs text-[#718080] dark:text-[#859896]">
              <p className="font-serif italic text-sm mb-1">{t.brandName}</p>
              <p>{t.home.heroSubtitle}</p>
            </div>
          )}

          {normalizedQuery && totalResults === 0 && (
            <div className="py-12 text-center text-sm text-[#718080] dark:text-[#859896]">
              <p className="font-medium text-[#17323B] dark:text-[#F1F4F1] mb-1">
                «{query}» bo‘yicha hech narsa topilmadi
              </p>
              <p className="text-xs">
                Boshqa tarixiy sana, shaxs ismi (Bumin, Taizong, Kultegin) yoki atama bilan izlab ko‘ring.
              </p>
            </div>
          )}

          {/* Articles Group */}
          {matchedArticles.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] dark:text-[#859896] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B88954]" />
                <span>{t.home.featuredThemesTitle}</span>
              </div>
              <div className="space-y-1.5">
                {matchedArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => {
                      onNavigate(article.state === 'turk' ? 'turk' : 'tang', article.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-[#203238] transition-colors cursor-pointer group flex items-start justify-between gap-3 border border-transparent hover:border-[#E1E6E1] dark:hover:border-[#314348]"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#17323B] dark:text-[#F1F4F1] group-hover:text-[#B88954] dark:group-hover:text-[#D6AB77] transition-colors">
                        {article.title[currentLocale]}
                      </h4>
                      <p className="text-[11px] text-[#718080] dark:text-[#859896] line-clamp-1 mt-0.5">
                        {article.summary[currentLocale]}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-[#718080] dark:text-[#859896] mt-1">
                        <span>{article.period}</span>
                        <span>·</span>
                        <span>{article.readingMinutes} min</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#718080] group-hover:text-[#17323B] dark:group-hover:text-[#F1F4F1] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Persons Group */}
          {matchedPersons.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] dark:text-[#859896] mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#B88954]" />
                <span>{t.creative.personsTitle}</span>
              </div>
              <div className="space-y-1.5">
                {matchedPersons.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => {
                      onNavigate('interactive');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-[#203238] transition-colors cursor-pointer group flex items-center justify-between border border-transparent hover:border-[#E1E6E1] dark:hover:border-[#314348]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-[#17323B] dark:text-[#F1F4F1]">
                          {person.name[currentLocale]}
                        </span>
                        <span className="text-[10px] text-[#718080] dark:text-[#859896]">
                          ({person.years})
                        </span>
                      </div>
                      <p className="text-[11px] text-[#718080] dark:text-[#859896]">
                        {person.roleTitle[currentLocale]}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#718080] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Events Group */}
          {matchedEvents.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] dark:text-[#859896] mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B88954]" />
                <span>{t.nav.timeline}</span>
              </div>
              <div className="space-y-1.5">
                {matchedEvents.map((evt) => (
                  <button
                    key={evt.id}
                    onClick={() => {
                      onNavigate('timeline');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-[#203238] transition-colors cursor-pointer group flex items-start justify-between border border-transparent hover:border-[#E1E6E1] dark:hover:border-[#314348]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#B88954] dark:text-[#D6AB77] font-mono tabular-nums">
                          {evt.yearDisplay}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[#17323B] dark:text-[#F1F4F1]">
                          {evt.title[currentLocale]}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#718080] dark:text-[#859896] line-clamp-1 mt-0.5">
                        {evt.description[currentLocale]}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#718080] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Group */}
          {matchedGlossary.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] dark:text-[#859896] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#B88954]" />
                <span>{t.creative.glossaryTitle}</span>
              </div>
              <div className="space-y-1.5">
                {matchedGlossary.map((term) => (
                  <button
                    key={term.id}
                    onClick={() => {
                      onNavigate('interactive');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-[#203238] transition-colors cursor-pointer group flex items-start justify-between border border-transparent hover:border-[#E1E6E1] dark:hover:border-[#314348]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-[#17323B] dark:text-[#F1F4F1]">
                          {term.term[currentLocale]}
                        </span>
                        {term.originalScript && (
                          <span className="text-xs font-mono text-[#B88954] dark:text-[#D6AB77]">
                            {term.originalScript}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#718080] dark:text-[#859896] line-clamp-1 mt-0.5">
                        {term.definition[currentLocale]}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#718080] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-stone-50 dark:bg-[#10191D] border-t border-[#E1E6E1] dark:border-[#314348] text-[11px] text-[#718080] dark:text-[#859896] flex items-center justify-between">
          <span>{totalResults} ta natija</span>
          <span>Yopish uchun <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] font-mono">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
};
