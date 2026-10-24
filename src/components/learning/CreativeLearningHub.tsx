import React, { useState } from 'react';
import { Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { DETECTIVE_CASES, CAUSE_EFFECT_ITEMS, CHRONO_MATCH_PAIRS } from '../../data/creativeGames';
import { HISTORICAL_PERSONS } from '../../data/persons';
import { HISTORICAL_GLOSSARY } from '../../data/glossary';
import { 
  Compass, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  User, 
  FileText, 
  Calendar, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CreativeLearningHubProps {
  currentLocale: Locale;
}

export const CreativeLearningHub: React.FC<CreativeLearningHubProps> = ({ currentLocale }) => {
  const [activeModule, setActiveModule] = useState<'detective' | 'cause_effect' | 'chronology' | 'persons' | 'glossary'>('detective');

  // Detective state
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [detectiveOptionSelected, setDetectiveOptionSelected] = useState<number | null>(null);
  const [detectiveRevealed, setDetectiveRevealed] = useState(false);

  // Cause or Effect state
  const [causeSelections, setCauseSelections] = useState<Record<string, 'cause' | 'process' | 'consequence'>>({});

  // Chronology Match state
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({});
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Glossary search
  const [glossarySearch, setGlossarySearch] = useState('');

  const t = DICTIONARIES[currentLocale];
  const activeDetectiveCase = DETECTIVE_CASES[selectedCaseIdx];

  const handleSelectChronoYear = (yr: number) => {
    setSelectedYear(yr);
    if (selectedEventId) {
      checkChronoMatch(yr, selectedEventId);
    }
  };

  const handleSelectChronoEvent = (evtId: string) => {
    setSelectedEventId(evtId);
    if (selectedYear) {
      checkChronoMatch(selectedYear, evtId);
    }
  };

  const checkChronoMatch = (yr: number, evtId: string) => {
    const pair = CHRONO_MATCH_PAIRS.find((p) => p.id === evtId);
    if (pair && pair.year === yr) {
      setMatchedPairs((prev) => ({ ...prev, [evtId]: true }));
      setSelectedYear(null);
      setSelectedEventId(null);
    } else {
      setTimeout(() => {
        setSelectedYear(null);
        setSelectedEventId(null);
      }, 700);
    }
  };

  const filteredGlossary = HISTORICAL_GLOSSARY.filter((term) => {
    if (!glossarySearch.trim()) return true;
    const q = glossarySearch.toLowerCase().trim();
    return (
      term.term[currentLocale].toLowerCase().includes(q) ||
      term.definition[currentLocale].toLowerCase().includes(q) ||
      (term.originalScript && term.originalScript.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-2">
            <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
              Tarix laboratoriyasi
            </span>
            <span aria-hidden="true">·</span>
            <span>Interaktiv metodologik amaliyot</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
            {t.creative.title}
          </h2>
          <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-1 max-w-3xl leading-relaxed">
            {t.creative.subtitle}
          </p>
        </div>

        {/* Module Segmented Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-2xl shadow-xs mb-8 w-fit">
          {[
            { id: 'detective', label: t.creative.detectiveTitle },
            { id: 'cause_effect', label: t.creative.causeEffectTitle },
            { id: 'chronology', label: t.creative.chronologyTitle },
            { id: 'persons', label: t.creative.personsTitle },
            { id: 'glossary', label: t.creative.glossaryTitle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer border ${
                activeModule === tab.id
                  ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold shadow-xs'
                  : 'bg-stone-50 dark:bg-[#203238] border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Module A: Tarixiy Detektiv */}
        {activeModule === 'detective' && (
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B88954] dark:text-[#D6AB77]">
                Detektiv topshiriq #{selectedCaseIdx + 1}
              </span>
              <div className="flex items-center gap-2">
                {DETECTIVE_CASES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedCaseIdx(i);
                      setDetectiveOptionSelected(null);
                      setDetectiveRevealed(false);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      selectedCaseIdx === i
                        ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D]'
                        : 'bg-stone-100 dark:bg-[#203238] text-[#526367]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="text-xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-2">
              {activeDetectiveCase.title[currentLocale]}
            </h3>
            
            <p className="text-xs text-[#718080] dark:text-[#859896] mb-6">
              {t.creative.detectiveDesc}
            </p>

            {/* Evidence Paper Callout */}
            <div className="p-6 rounded-2xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] mb-6 font-serif italic text-sm sm:text-base text-[#17323B] dark:text-[#F1F4F1] leading-relaxed shadow-inner">
              «{activeDetectiveCase.primaryExcerpt[currentLocale]}»
            </div>

            {/* Clues */}
            <div className="mb-6 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#718080] block mb-1">
                Tarixiy dalillar va ishoralar:
              </span>
              {activeDetectiveCase.clues.map((clue, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#526367] dark:text-[#B6C4C2]">
                  <span className="text-[#B88954] font-bold">✓</span>
                  <span>{clue[currentLocale]}</span>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-semibold text-[#17323B] dark:text-[#F1F4F1] mb-3">
              {activeDetectiveCase.mysteryQuestion[currentLocale]}
            </h4>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {activeDetectiveCase.options.map((opt, idx) => {
                const isSelected = detectiveOptionSelected === idx;
                const isCorrect = idx === activeDetectiveCase.correctOptionIndex;

                let optStyle = 'border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] text-[#17323B] dark:text-[#F1F4F1]';
                if (detectiveRevealed) {
                  if (isCorrect) optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                  else if (isSelected) optStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                  else optStyle = 'opacity-50 border-[#E1E6E1] dark:border-[#314348] text-[#718080]';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!detectiveRevealed) {
                        setDetectiveOptionSelected(idx);
                        setDetectiveRevealed(true);
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${optStyle}`}
                  >
                    <span>{opt[currentLocale]}</span>
                    {detectiveRevealed && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {detectiveRevealed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Resolution Box */}
            {detectiveRevealed && (
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-[#203238] border border-amber-200/60 dark:border-[#314348] text-xs text-[#526367] dark:text-[#B6C4C2] animate-in fade-in duration-200">
                <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1] block mb-1">
                  Daliliy yechim va manba:
                </span>
                <p className="leading-relaxed mb-1">
                  {activeDetectiveCase.historicalResolution[currentLocale]}
                </p>
                <p className="text-[10px] text-[#718080] font-mono">
                  Birlamchi manba: {activeDetectiveCase.primarySourceCitation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Module B: Sabab yoki Oqibat? */}
        {activeModule === 'cause_effect' && (
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h3 className="text-xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                {t.creative.causeEffectTitle}
              </h3>
              <p className="text-xs text-[#526367] dark:text-[#B6C4C2] mt-1">
                {t.creative.causeEffectDesc}
              </p>
            </div>

            <div className="space-y-4">
              {CAUSE_EFFECT_ITEMS.map((item) => {
                const userChoice = causeSelections[item.id];
                const isSelected = !!userChoice;
                const isCorrect = userChoice === item.correctCategory;

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl border border-[#E1E6E1] dark:border-[#314348] bg-stone-50/50 dark:bg-[#203238]/50"
                  >
                    <p className="text-xs sm:text-sm font-semibold text-[#17323B] dark:text-[#F1F4F1] mb-3">
                      {item.event[currentLocale]}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-[#718080] mr-2">Tasniflang:</span>
                      
                      {(['cause', 'process', 'consequence'] as const).map((cat) => {
                        const isCatSelected = userChoice === cat;
                        let btnStyle = 'bg-white dark:bg-[#18262B] border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]';
                        
                        if (isSelected && isCatSelected) {
                          btnStyle = isCorrect
                            ? 'bg-emerald-600 text-white border-transparent font-semibold'
                            : 'bg-rose-600 text-white border-transparent font-semibold';
                        }

                        return (
                          <button
                            key={cat}
                            onClick={() => setCauseSelections((prev) => ({ ...prev, [item.id]: cat }))}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer ${btnStyle}`}
                          >
                            {cat === 'cause' ? 'Sabab (Omil)' : cat === 'process' ? 'Jarayon (Hodisa)' : 'Oqibat (Natija)'}
                          </button>
                        );
                      })}
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-[#E1E6E1] dark:border-[#314348] text-xs text-[#526367] dark:text-[#B6C4C2] flex items-center justify-between">
                        <span>
                          {isCorrect ? '✓ To‘g‘ri!' : '✗ Noto‘g‘ri tasnif.'} {item.explanation[currentLocale]}
                        </span>
                        <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1]">
                          Haqiqiy holati: {item.categoryLabel[currentLocale]}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Module C: Sana va Voqea Moslashtirish */}
        {activeModule === 'chronology' && (
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h3 className="text-xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                {t.creative.chronologyTitle}
              </h3>
              <p className="text-xs text-[#526367] dark:text-[#B6C4C2] mt-1">
                {t.creative.chronologyDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Years */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#718080] block mb-2">
                  1. Tarixiy sanani tanlang:
                </span>
                {CHRONO_MATCH_PAIRS.map((pair) => {
                  const isPairMatched = !!matchedPairs[pair.id];
                  const isSelected = selectedYear === pair.year;

                  return (
                    <button
                      key={pair.id}
                      onClick={() => !isPairMatched && handleSelectChronoYear(pair.year)}
                      disabled={isPairMatched}
                      className={`w-full p-3.5 rounded-xl border text-sm font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isPairMatched
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 opacity-70'
                          : isSelected
                          ? 'border-[#17323B] dark:border-[#D6AB77] bg-[#E6F0EB] dark:bg-[#203238] text-[#17323B] dark:text-[#F1F4F1] ring-2 ring-[#B88954]'
                          : 'border-[#E1E6E1] dark:border-[#314348] bg-white dark:bg-[#18262B] text-[#17323B] dark:text-[#F1F4F1] hover:bg-stone-50'
                      }`}
                    >
                      <span>{pair.year} CE</span>
                      {isPairMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Events (Shuffled slightly) */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#718080] block mb-2">
                  2. Tegishli voqeani bosing:
                </span>
                {[...CHRONO_MATCH_PAIRS].reverse().map((pair) => {
                  const isPairMatched = !!matchedPairs[pair.id];
                  const isSelected = selectedEventId === pair.id;

                  return (
                    <button
                      key={pair.id}
                      onClick={() => !isPairMatched && handleSelectChronoEvent(pair.id)}
                      disabled={isPairMatched}
                      className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isPairMatched
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 opacity-70'
                          : isSelected
                          ? 'border-[#17323B] dark:border-[#D6AB77] bg-[#E6F0EB] dark:bg-[#203238] text-[#17323B] dark:text-[#F1F4F1] ring-2 ring-[#B88954]'
                          : 'border-[#E1E6E1] dark:border-[#314348] bg-white dark:bg-[#18262B] text-[#17323B] dark:text-[#F1F4F1] hover:bg-stone-50'
                      }`}
                    >
                      <span>{pair.event[currentLocale]}</span>
                      {isPairMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Module D: Tarixiy Shaxslar Dossierlari */}
        {activeModule === 'persons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HISTORICAL_PERSONS.map((person) => (
              <div
                key={person.id}
                className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#718080] dark:text-[#859896] mb-3">
                    <span className="font-semibold uppercase text-[#B88954] dark:text-[#D6AB77]">
                      {person.state === 'turk' ? 'Turk xoqonligi' : 'Tan imperiyasi'}
                    </span>
                    <span className="font-mono tabular-nums">{person.years}</span>
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-1">
                    {person.name[currentLocale]}
                  </h3>

                  <p className="text-xs font-mono text-[#B88954] dark:text-[#D6AB77] mb-2">
                    {person.nativeTitle}
                  </p>

                  <p className="text-xs text-[#718080] dark:text-[#859896] mb-4">
                    {person.roleTitle[currentLocale]}
                  </p>

                  <p className="text-xs text-[#526367] dark:text-[#B6C4C2] leading-relaxed mb-4">
                    {person.biography[currentLocale]}
                  </p>

                  {person.quote && (
                    <div className="p-3 rounded-xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-xs font-serif italic text-[#17323B] dark:text-[#F1F4F1] mb-4">
                      {person.quote[currentLocale]}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#718080] block">
                      Muhim xizmatlari:
                    </span>
                    {person.majorAccomplishments[currentLocale].map((acc, i) => (
                      <div key={i} className="text-xs text-[#526367] dark:text-[#B6C4C2] flex items-start gap-1.5">
                        <span className="text-[#B88954]">·</span>
                        <span>{acc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E1E6E1] dark:border-[#314348] text-[11px] text-[#718080] flex items-center justify-between">
                  <span>Asoslangan manba:</span>
                  <span className="font-mono text-[#17323B] dark:text-[#D6AB77]">
                    {person.sources.join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Module E: Tarixiy Terminlar Lug'ati */}
        {activeModule === 'glossary' && (
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                  {t.creative.glossaryTitle}
                </h3>
                <p className="text-xs text-[#526367] dark:text-[#B6C4C2] mt-0.5">
                  {t.creative.glossaryDesc}
                </p>
              </div>

              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Atamani qidiring (masalan: Xoqon, Qut, Törü, Jiedushi)..."
                className="w-full sm:w-72 px-3.5 py-2 text-xs bg-stone-50 dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] rounded-xl text-[#17323B] dark:text-[#F1F4F1] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGlossary.map((term) => (
                <div
                  key={term.id}
                  className="p-5 rounded-xl border border-[#E1E6E1] dark:border-[#314348] bg-stone-50/50 dark:bg-[#203238]/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                      {term.term[currentLocale]}
                    </h4>
                    {term.originalScript && (
                      <span className="text-sm font-mono text-[#B88954] dark:text-[#D6AB77] font-bold">
                        {term.originalScript}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#17323B] dark:text-[#F1F4F1] leading-relaxed mb-2">
                    {term.definition[currentLocale]}
                  </p>

                  <p className="text-[11px] text-[#718080] dark:text-[#859896] leading-relaxed mb-2">
                    <span className="font-semibold text-[#526367] dark:text-[#B6C4C2]">Tarixiy kontekst:</span> {term.historicalContext[currentLocale]}
                  </p>

                  <p className="text-[10px] text-[#718080] font-mono">
                    Etimologiya: {term.etymology[currentLocale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
