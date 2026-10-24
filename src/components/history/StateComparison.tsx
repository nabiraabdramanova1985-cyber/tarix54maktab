import React, { useState } from 'react';
import { Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { COMPARISON_CRITERIA } from '../../data/comparison';
import { HISTORICAL_IMAGES } from '../../data/images';
import { Scale, BookOpen, Check, Layers, ArrowRight } from 'lucide-react';

interface StateComparisonProps {
  currentLocale: Locale;
}

export const StateComparison: React.FC<StateComparisonProps> = ({ currentLocale }) => {
  const [selectedCriterionId, setSelectedCriterionId] = useState<string>(COMPARISON_CRITERIA[0].id);
  const t = DICTIONARIES[currentLocale];

  const currentCriterion =
    COMPARISON_CRITERIA.find((c) => c.id === selectedCriterionId) || COMPARISON_CRITERIA[0];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-2">
            <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
              Qiyosiy-tarixiy tahlil
            </span>
            <span aria-hidden="true">·</span>
            <span>14 ta ilmiy mezon</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
            {t.comparison.title}
          </h2>
          <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-1 max-w-3xl leading-relaxed">
            {t.comparison.subtitle}
          </p>
        </div>

        {/* Criteria Segmented Selection Rail */}
        <div className="p-2 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-xs mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {COMPARISON_CRITERIA.map((criterion, idx) => {
              const isSelected = criterion.id === selectedCriterionId;
              return (
                <button
                  key={criterion.id}
                  onClick={() => setSelectedCriterionId(criterion.id)}
                  className={`px-3 py-2 text-xs rounded-xl whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold shadow-xs'
                      : 'bg-stone-50 dark:bg-[#203238] border-transparent text-[#526367] dark:text-[#B6C4C2] hover:bg-stone-100 hover:text-[#17323B]'
                  }`}
                >
                  <span className="opacity-60 mr-1.5 font-mono text-[10px]">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{criterion.title[currentLocale]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Comparison Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Turkic Khaganate Column */}
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 sm:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B88954]" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77] font-bold">
                  Ko‘chmanchi saltanat
                </span>
                <span className="text-xs font-mono text-[#718080] dark:text-[#859896]">
                  552 — 744 CE
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-2">
                {t.comparison.turkHeader}
              </h3>
              
              <div className="h-px w-12 bg-[#B88954] mb-6" />

              <div className="text-sm sm:text-base text-[#17323B] dark:text-[#F1F4F1] leading-relaxed mb-6 font-serif">
                {currentCriterion.turkicAspect[currentLocale]}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E6E1] dark:border-[#314348] text-xs text-[#718080] dark:text-[#859896] flex items-center justify-between">
              <span className="font-semibold text-[#B88954]">Tayanch markaz: O‘tukan</span>
              <span className="italic font-editorial">Ko‘k Tangri & Qut</span>
            </div>
          </div>

          {/* Tang Dynasty Column */}
          <div className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 sm:p-8 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#14515A]" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#14515A] dark:text-[#78b3bd] font-bold">
                  Byurokratik imperiya
                </span>
                <span className="text-xs font-mono text-[#718080] dark:text-[#859896]">
                  618 — 907 CE
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-2">
                {t.comparison.tangHeader}
              </h3>

              <div className="h-px w-12 bg-[#14515A] mb-6" />

              <div className="text-sm sm:text-base text-[#17323B] dark:text-[#F1F4F1] leading-relaxed mb-6 font-serif">
                {currentCriterion.tangAspect[currentLocale]}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E6E1] dark:border-[#314348] text-xs text-[#718080] dark:text-[#859896] flex items-center justify-between">
              <span className="font-semibold text-[#14515A] dark:text-[#78b3bd]">Tayanch markaz: Changan</span>
              <span className="italic font-editorial">Osmon Mandati (Tianming)</span>
            </div>
          </div>

        </div>

        {/* Historiographical Analytical Synthesis */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#E6F0EB]/60 dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-[#B88954] dark:text-[#D6AB77]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1]">
              {t.comparison.analyticalSynthesis}:
            </h4>
          </div>
          <p className="text-sm sm:text-base text-[#17323B] dark:text-[#F1F4F1] leading-relaxed font-serif italic mb-4">
            «{currentCriterion.analyticalInsight[currentLocale]}»
          </p>
          <div className="text-xs text-[#718080] dark:text-[#859896] flex items-center gap-2">
            <span>Manbalar tahlili:</span>
            <span className="font-mono text-[11px] text-[#17323B] dark:text-[#D6AB77]">
              {currentCriterion.sources.join(', ')}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
