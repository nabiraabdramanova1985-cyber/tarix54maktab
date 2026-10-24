import React, { useState } from 'react';
import { Locale, MapLocation } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { HISTORICAL_MAP_LOCATIONS } from '../../data/mapLocations';
import { 
  Layers, 
  MapPin, 
  Navigation, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Info,
  CheckSquare,
  Square
} from 'lucide-react';

interface HistoricalMapProps {
  currentLocale: Locale;
}

export const HistoricalMap: React.FC<HistoricalMapProps> = ({ currentLocale }) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>(HISTORICAL_MAP_LOCATIONS[0]);
  const [selectedEra, setSelectedEra] = useState<string>('552');
  const [showTurkicSphere, setShowTurkicSphere] = useState<boolean>(true);
  const [showTangSphere, setShowTangSphere] = useState<boolean>(true);
  const [showSilkRoad, setShowSilkRoad] = useState<boolean>(true);
  const [showMonuments, setShowMonuments] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const t = DICTIONARIES[currentLocale];

  const eras = [
    { id: '552', label: '552 CE — Ilk xoqonlik' },
    { id: '630', label: '630 CE — Taizong & Tian Kehan' },
    { id: '682', label: '682 CE — Ikkinchi xoqonlik tiklanishi' },
    { id: '755', label: '755 CE — An Lushan & Talas davri' },
  ];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 1.75));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => setZoomLevel(1);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-2">
            <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
              Tarixiy Geografiya
            </span>
            <span aria-hidden="true">·</span>
            <span>Yevroosiyo karvon yo‘llari</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
            {t.map.title}
          </h2>
          <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-1 max-w-3xl leading-relaxed">
            {t.map.subtitle}
          </p>
        </div>

        {/* Map Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Map Canvas Area (col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top Toolbar: Era Selector & Controls */}
            <div className="p-3 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] shrink-0 mr-1">
                  Davr:
                </span>
                {eras.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEra(era.id)}
                    className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${
                      selectedEra === era.id
                        ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold shadow-xs'
                        : 'bg-stone-50 dark:bg-[#203238] border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
                    }`}
                  >
                    {era.label}
                  </button>
                ))}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg border border-[#E1E6E1] dark:border-[#314348] text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
                  title="Kattalashtirish"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg border border-[#E1E6E1] dark:border-[#314348] text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
                  title="Kichraytirish"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg border border-[#E1E6E1] dark:border-[#314348] text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
                  title="Asliga qaytarish"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Vector Map Container */}
            <div className="relative w-full aspect-[16/10] bg-[#EFECE6] dark:bg-[#0D1518] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Map SVG Canvas scaled with Zoom */}
              <div 
                className="relative w-full h-full transition-transform duration-300 ease-out origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Background Terrain Grids & Mountain Silhouettes */}
                <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 1000 625">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-stone-300/40 dark:text-stone-700/30" />
                    </pattern>
                  </defs>
                  
                  <rect width="1000" height="625" fill="url(#grid)" />

                  {/* Mountain ranges stylized */}
                  {/* Altai Mountains */}
                  <path d="M 540 120 Q 580 140 620 180 Q 640 220 600 240" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" className="text-[#B88954]/50 dark:text-[#D6AB77]/40" />
                  <text x="560" y="140" className="text-[11px] font-serif fill-[#718080] dark:fill-[#859896] italic">Oltoy tizmasi</text>

                  {/* Tian Shan Mountains */}
                  <path d="M 380 240 Q 440 270 520 280 Q 600 300 660 320" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" className="text-[#14515A]/40" />
                  <text x="430" y="260" className="text-[11px] font-serif fill-[#718080] dark:fill-[#859896] italic">Tangritog‘ (Tyanshan)</text>

                  {/* Yinshan Mountains */}
                  <path d="M 720 240 Q 770 260 820 280" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" className="text-[#17323B]/30 dark:text-stone-600" />
                  <text x="740" y="250" className="text-[10px] font-serif fill-[#718080] italic">Yinshan</text>

                  {/* Approximate Territorial Influence Zones */}
                  {/* Turkic Steppe Realm */}
                  {showTurkicSphere && (
                    <path
                      d="M 340 180 Q 500 130 720 160 Q 860 190 820 320 Q 660 300 480 340 Q 320 310 340 180 Z"
                      fill="#B88954"
                      fillOpacity={selectedEra === '630' ? '0.08' : '0.16'}
                      stroke="#B88954"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      className="transition-all duration-500"
                    />
                  )}

                  {/* Tang Imperial Sphere */}
                  {showTangSphere && (
                    <path
                      d="M 640 330 Q 740 310 880 320 Q 940 440 850 560 Q 700 550 660 440 Z"
                      fill="#14515A"
                      fillOpacity={selectedEra === '630' || selectedEra === '755' ? '0.22' : '0.14'}
                      stroke="#14515A"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      className="transition-all duration-500"
                    />
                  )}

                  {/* Silk Road Corridors */}
                  {showSilkRoad && (
                    <g className="transition-opacity duration-300">
                      {/* Northern Silk Route */}
                      <path
                        d="M 820 350 L 730 330 L 640 305 L 530 270 L 440 260 L 360 290 L 260 300"
                        fill="none"
                        stroke="#D6AB77"
                        strokeWidth="3"
                        strokeDasharray="5 3"
                      />
                      {/* Southern Silk Route around Taklamakan */}
                      <path
                        d="M 640 305 L 580 330 L 490 350 L 400 340 L 360 290"
                        fill="none"
                        stroke="#B88954"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        opacity="0.75"
                      />
                    </g>
                  )}
                </svg>

                {/* Interactive Clickable Location Markers */}
                {HISTORICAL_MAP_LOCATIONS.map((loc) => {
                  const isSelected = selectedLocation?.id === loc.id;
                  const isCapital = loc.category === 'capital';
                  const isBattle = loc.category === 'battle';

                  let markerColor = 'bg-[#B88954] text-white';
                  if (loc.state === 'tang') markerColor = 'bg-[#14515A] text-white';
                  if (loc.state === 'silk_road') markerColor = 'bg-amber-600 text-white';
                  if (isBattle) markerColor = 'bg-rose-600 text-white';

                  return (
                    <div
                      key={loc.id}
                      style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                      onClick={() => setSelectedLocation(loc)}
                    >
                      {/* Pulse Ring when selected */}
                      {isSelected && (
                        <div className="absolute -inset-2 rounded-full bg-[#B88954]/30 animate-ping pointer-events-none" />
                      )}

                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-md border-2 border-white dark:border-[#10191D] transition-transform group-hover:scale-125 ${markerColor} ${
                          isSelected ? 'ring-2 ring-[#B88954] dark:ring-[#D6AB77] scale-115' : ''
                        }`}
                      >
                        {isCapital ? '★' : isBattle ? '⚔' : '•'}
                      </div>

                      {/* Tooltip on marker hover */}
                      <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-stone-900/90 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                        {loc.name[currentLocale]}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-[#18262B]/90 backdrop-blur-xs p-2.5 rounded-xl border border-[#E1E6E1] dark:border-[#314348] text-[10px] space-y-1 text-[#526367] dark:text-[#B6C4C2] shadow-xs pointer-events-none">
                <div className="flex items-center gap-1.5 font-semibold text-[#17323B] dark:text-[#F1F4F1] mb-1">
                  <Compass className="w-3.5 h-3.5 text-[#B88954]" />
                  <span>Xarita shartli belgilari</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B88954]" />
                  <span>Turk xoqonligi markazi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#14515A]" />
                  <span>Tan imperiyasi poytaxti</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 border-t-2 border-dashed border-[#D6AB77]" />
                  <span>Buyuk Ipak yo‘li yo‘nalishi</span>
                </div>
              </div>
            </div>

            {/* Layer Toggles Strip */}
            <div className="p-3 bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] rounded-2xl shadow-xs flex flex-wrap items-center gap-4 text-xs text-[#526367] dark:text-[#B6C4C2]">
              <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#B88954]" />
                <span>{t.map.layers}:</span>
              </span>

              <button
                onClick={() => setShowTurkicSphere(!showTurkicSphere)}
                className="flex items-center gap-1.5 hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
              >
                {showTurkicSphere ? <CheckSquare className="w-4 h-4 text-[#B88954]" /> : <Square className="w-4 h-4 text-stone-400" />}
                <span>{t.map.layerTurkicSphere}</span>
              </button>

              <button
                onClick={() => setShowTangSphere(!showTangSphere)}
                className="flex items-center gap-1.5 hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
              >
                {showTangSphere ? <CheckSquare className="w-4 h-4 text-[#14515A] dark:text-[#78b3bd]" /> : <Square className="w-4 h-4 text-stone-400" />}
                <span>{t.map.layerTangSphere}</span>
              </button>

              <button
                onClick={() => setShowSilkRoad(!showSilkRoad)}
                className="flex items-center gap-1.5 hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
              >
                {showSilkRoad ? <CheckSquare className="w-4 h-4 text-[#D6AB77]" /> : <Square className="w-4 h-4 text-stone-400" />}
                <span>{t.map.layerSilkRoad}</span>
              </button>
            </div>
          </div>

          {/* Location Detail Dossier (col-span-4) */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-sm sticky top-24">
              <div className="flex items-center gap-2 text-xs text-[#718080] dark:text-[#859896] mb-3">
                <MapPin className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
                <span className="font-semibold uppercase tracking-wider">
                  {selectedLocation.period}
                </span>
                <span>·</span>
                <span className="capitalize">{selectedLocation.category}</span>
              </div>

              <h3 className="text-xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] leading-snug mb-3">
                {selectedLocation.name[currentLocale]}
              </h3>

              <div className="h-px w-10 bg-[#B88954] mb-4" />

              <p className="text-xs sm:text-sm text-[#526367] dark:text-[#B6C4C2] leading-relaxed mb-5">
                {selectedLocation.description[currentLocale]}
              </p>

              <div className="p-4 rounded-xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-xs">
                <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1] block mb-1">
                  Tarixiy ahamiyati:
                </span>
                <p className="text-[#526367] dark:text-[#B6C4C2] italic font-serif leading-relaxed">
                  {selectedLocation.historicalSignificance[currentLocale]}
                </p>
              </div>

              {/* Quick switch to another location */}
              <div className="mt-6 pt-4 border-t border-[#E1E6E1] dark:border-[#314348]">
                <span className="text-[11px] font-semibold text-[#718080] dark:text-[#859896] uppercase block mb-2">
                  Boshqa markazlar:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {HISTORICAL_MAP_LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`text-[11px] px-2 py-1 rounded-md transition-colors cursor-pointer border ${
                        selectedLocation.id === loc.id
                          ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold'
                          : 'bg-stone-50 dark:bg-[#203238] border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
                      }`}
                    >
                      {loc.name[currentLocale]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
