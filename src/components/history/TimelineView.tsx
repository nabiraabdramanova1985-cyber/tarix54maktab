import React, { useState } from 'react';
import { Locale, StateDomain } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { TIMELINE_EVENTS } from '../../data/timeline';
import { Calendar, ChevronDown, ChevronUp, BookOpen, Clock, ArrowRight } from 'lucide-react';

interface TimelineViewProps {
  currentLocale: Locale;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ currentLocale }) => {
  const [filterState, setFilterState] = useState<StateDomain | 'all'>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>('tl-552');
  const t = DICTIONARIES[currentLocale];

  const filteredEvents = TIMELINE_EVENTS.filter((evt) => {
    if (filterState === 'all') return true;
    if (filterState === 'turk') return evt.state === 'turk' || evt.state === 'both';
    if (filterState === 'tang') return evt.state === 'tang' || evt.state === 'both';
    if (filterState === 'both') return evt.state === 'both';
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#718080] dark:text-[#859896] mb-2">
            <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
              Xronologik xarita
            </span>
            <span aria-hidden="true">·</span>
            <span>552 — 907 CE (355 yil)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
            {t.timeline.title}
          </h2>
          <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-1 max-w-2xl leading-relaxed">
            {t.timeline.subtitle}
          </p>
        </div>

        {/* State Filter Pills */}
        <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-xl shadow-xs mb-10 w-fit">
          {[
            { id: 'all', label: t.timeline.filterAll },
            { id: 'turk', label: t.timeline.filterTurk },
            { id: 'tang', label: t.timeline.filterTang },
            { id: 'both', label: t.timeline.filterBoth },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterState(btn.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterState === btn.id
                  ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] font-semibold shadow-xs'
                  : 'text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Chronological Rail */}
        <div className="relative border-l-2 border-[#E1E6E1] dark:border-[#314348] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {filteredEvents.map((evt) => {
            const isExpanded = expandedEventId === evt.id;

            return (
              <div key={evt.id} className="relative group">
                
                {/* Year Marker on the Rail */}
                <div 
                  className={`absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full border-4 transition-colors ${
                    evt.state === 'turk'
                      ? 'bg-[#B88954] border-white dark:border-[#10191D]'
                      : evt.state === 'tang'
                      ? 'bg-[#14515A] border-white dark:border-[#10191D]'
                      : 'bg-[#17323B] dark:bg-[#D6AB77] border-white dark:border-[#10191D]'
                  }`}
                />

                {/* Event Card */}
                <div 
                  onClick={() => toggleExpand(evt.id)}
                  className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs sm:text-sm font-bold text-[#B88954] dark:text-[#D6AB77] font-mono tabular-nums">
                          {evt.yearDisplay}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#718080] dark:text-[#859896]">
                          {evt.state === 'turk' ? 'Turk xoqonligi' : evt.state === 'tang' ? 'Tan imperiyasi' : 'Bilateral munosabatlar'}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] leading-snug">
                        {evt.title[currentLocale]}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#526367] dark:text-[#B6C4C2] mt-1 leading-relaxed">
                        {evt.description[currentLocale]}
                      </p>
                    </div>

                    <button className="p-1.5 rounded-lg text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Expanded Historiographical Dossier */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-[#E1E6E1] dark:border-[#314348] space-y-4 animate-in fade-in duration-200">
                      
                      {/* Significance */}
                      <div className="p-3.5 rounded-xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348]">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#D6AB77] block mb-1">
                          {t.timeline.significance}:
                        </span>
                        <p className="text-xs text-[#526367] dark:text-[#B6C4C2] leading-relaxed font-serif italic">
                          «{evt.historicalSignificance[currentLocale]}»
                        </p>
                      </div>

                      {/* Cause and Consequences Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-[#203238]/60 border border-amber-200/50 dark:border-[#314348]">
                          <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1] block mb-1">
                            Kelib chiqish sabablari:
                          </span>
                          <p className="text-[#526367] dark:text-[#B6C4C2] leading-relaxed">
                            {evt.causes[currentLocale]}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-teal-50/50 dark:bg-[#203238]/60 border border-teal-200/50 dark:border-[#314348]">
                          <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1] block mb-1">
                            Tarixiy oqibatlari:
                          </span>
                          <p className="text-[#526367] dark:text-[#B6C4C2] leading-relaxed">
                            {evt.consequences[currentLocale]}
                          </p>
                        </div>
                      </div>

                      {evt.sourceId && (
                        <div className="text-[11px] text-[#718080] dark:text-[#859896] flex items-center gap-1.5 pt-2">
                          <BookOpen className="w-3.5 h-3.5 text-[#B88954]" />
                          <span>Asoslangan manba ID: {evt.sourceId}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
