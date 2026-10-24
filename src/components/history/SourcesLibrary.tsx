import React, { useState } from 'react';
import { Locale, HistoricalSource } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { HISTORICAL_SOURCES } from '../../data/sources';
import { BookOpen, Copy, Check, ShieldCheck, ExternalLink, Filter } from 'lucide-react';

interface SourcesLibraryProps {
  currentLocale: Locale;
}

export const SourcesLibrary: React.FC<SourcesLibraryProps> = ({ currentLocale }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const t = DICTIONARIES[currentLocale];

  const filteredSources = HISTORICAL_SOURCES.filter((s) => {
    if (selectedType === 'all') return true;
    return s.type === selectedType;
  });

  const handleCopyCitation = (source: HistoricalSource) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(source.citation);
      setCopiedId(source.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const typeLabels: Record<string, string> = {
    all: t.actions.all,
    primary_inscription: t.sources.primaryEpigraphy,
    imperial_annal: t.sources.imperialAnnals,
    diplomatic_letter: 'Diplomatik maktublar',
    academic_treatise: t.sources.academicLiterature,
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-2">
            <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
              Akademik manbalar
            </span>
            <span aria-hidden="true">·</span>
            <span>Birlamchi va ikkilamchi korpus</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
            {t.sources.title}
          </h2>
          <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-1 max-w-3xl leading-relaxed">
            {t.sources.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-2xl shadow-xs mb-8 w-fit">
          {Object.entries(typeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                selectedType === key
                  ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] font-semibold shadow-xs'
                  : 'text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSources.map((source) => (
            <div
              key={source.id}
              className="bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 text-[11px] text-[#718080] dark:text-[#859896]">
                  <span className="font-semibold uppercase tracking-wider text-[#B88954] dark:text-[#D6AB77]">
                    {source.dateOrCentury}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Верифицировано</span>
                  </span>
                </div>

                <h3 className="text-lg font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-1">
                  {source.title[currentLocale]}
                </h3>

                <p className="text-xs text-[#718080] dark:text-[#859896] mb-3">
                  Muallif: <span className="font-medium text-[#17323B] dark:text-[#F1F4F1]">{source.authorOrCreator}</span> · Til: {source.originalLanguage}
                </p>

                <p className="text-xs text-[#526367] dark:text-[#B6C4C2] leading-relaxed mb-4">
                  {source.summary[currentLocale]}
                </p>

                {/* Excerpt Box */}
                <div className="p-4 rounded-xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#718080] block mb-1">
                    Birlamchi manba matnidan parcha:
                  </span>
                  <p className="text-xs font-serif italic text-[#17323B] dark:text-[#F1F4F1] leading-relaxed">
                    {source.keyExcerpt[currentLocale]}
                  </p>
                </div>

                <p className="text-[11px] text-[#718080] dark:text-[#859896] leading-relaxed mb-4">
                  <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1]">Tarixiy sharh:</span> {source.scientificContext[currentLocale]}
                </p>
              </div>

              {/* Citation Copy Footer */}
              <div className="pt-4 border-t border-[#E1E6E1] dark:border-[#314348] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#718080] truncate max-w-xs" title={source.citation}>
                  {source.citation}
                </span>

                <button
                  onClick={() => handleCopyCitation(source)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E1E6E1] dark:border-[#314348] text-xs font-medium text-[#17323B] dark:text-[#F1F4F1] hover:bg-stone-50 dark:hover:bg-[#203238] transition-colors cursor-pointer shrink-0 ml-2"
                >
                  {copiedId === source.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Nusxalandi</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B88954]" />
                      <span>Iqtibos</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
