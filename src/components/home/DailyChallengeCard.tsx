import React, { useState } from 'react';
import { Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { DAILY_CHALLENGE } from '../../data/creativeGames';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Flame } from 'lucide-react';

interface DailyChallengeCardProps {
  currentLocale: Locale;
  onExploreMore: () => void;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  currentLocale,
  onExploreMore,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const t = DICTIONARIES[currentLocale];
  const item = DAILY_CHALLENGE;

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedIdx(idx);
    setAnswered(true);
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1]">
            {t.creative.dailyQuestionTitle}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#B88954] dark:text-[#D6AB77] font-semibold">
          <Flame className="w-4 h-4 fill-current" />
          <span>Kunlik intizom</span>
        </div>
      </div>

      <p className="text-sm sm:text-base font-editorial font-medium text-[#17323B] dark:text-[#F1F4F1] mb-5 leading-snug">
        {item.question[currentLocale]}
      </p>

      {/* Options List */}
      <div className="space-y-2.5 mb-5">
        {item.options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          const isCorrect = idx === item.correctIndex;
          let btnStyle = 'border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] text-[#17323B] dark:text-[#F1F4F1]';

          if (answered) {
            if (isCorrect) {
              btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium';
            } else if (isSelected) {
              btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200';
            } else {
              btnStyle = 'opacity-50 border-[#E1E6E1] dark:border-[#314348] text-[#718080]';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
            >
              <span>{opt[currentLocale]}</span>
              {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
              {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Detailed Historical Insight upon answering */}
      {answered && (
        <div className="p-4 rounded-xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-xs text-[#526367] dark:text-[#B6C4C2] animate-in fade-in duration-200">
          <p className="font-semibold text-[#17323B] dark:text-[#F1F4F1] mb-1">
            {selectedIdx === item.correctIndex ? 'Barakalla, to‘g‘ri tahlil!' : 'Tarixiy sharh:'}
          </p>
          <p className="leading-relaxed mb-3">
            {item.insight[currentLocale]}
          </p>
          <button
            onClick={onExploreMore}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B88954] dark:text-[#D6AB77] hover:underline cursor-pointer"
          >
            <span>{t.creative.title}ga o‘tish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
