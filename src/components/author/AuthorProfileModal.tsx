import React from 'react';
import { Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { 
  GraduationCap, 
  X, 
  Mail, 
  School, 
  Award, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  FileText 
} from 'lucide-react';

interface AuthorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
  onOpenFeaturedArticle: () => void;
}

export const AuthorProfileModal: React.FC<AuthorProfileModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
  onOpenFeaturedArticle,
}) => {
  if (!isOpen) return null;

  const contentByLocale = {
    uz: {
      badge: 'Loyiha muallifi va ishlab chiquvchisi',
      fullName: 'Abdramanova Nabira Kenesovna',
      role: '54-maktab tarix fani o‘qituvchisi',
      school: '54-sonli umumiy o‘rta ta’lim maktabi',
      email: 'nabiraabdramanova1985@gmail.com',
      quote: '«Tarixni shunchaki yillar va nomlar ro‘yxati emas, balki tirik sabab-oqibatlar tizimi va ajdodlar tafakkuri sifatida o‘rgatish — mening pedagogik burchimdir.»',
      bio: 'Abdramanova Nabira Kenesovna — umumta’lim maktablarida tarix fanini o‘qitishda zamonaviy raqamli texnologiyalar, interaktiv kartografiya va qiyosiy tahlil metodikasini amaliyotga tatbiq etib kelayotgan fidoyi ustoz. Mazkur platforma o‘quvchilarning VI–X asrlar Yevroosiyo geosiyosati, Turk xoqonligi va Tan imperiyasi aloqalarini birlamchi manbalar asosida o‘zlashtirishlari uchun muallif tomonidan to‘liq ishlab chiqilgan.',
      achievementsTitle: 'Pedagogik va metodik yangiliklar:',
      achievements: [
        'Turk xoqonligi va Tan imperiyasining 14 mezonli davlatlararo qiyosiy tahlil tizimi;',
        'Kultegin, Bilga xoqon va To‘nyuquq orxon bitiktoshlarini darslik mavzulariga integratsiyalash;',
        '552–907 yillardagi 17 ta burilish nuqtasini o‘z ichiga olgan xronologik interaktiv xarita;',
        'O‘quvchilarning tanqidiy fikrlashini oshiruvchi «Tarixiy detektiv» va sabab-oqibat laboratoriyasi.',
      ],
      readArticleBtn: 'Mualliflik maqolasi va dars ishlanmasini o‘qish',
      closeBtn: 'Yopish',
    },
    'uz-Cyrl': {
      badge: 'Лойиҳа муаллифи ва ишлаб чиқувчиси',
      fullName: 'Абдраманова Набира Кенесовна',
      role: '54-мактаб тарих фани ўқитувчиси',
      school: '54-сонли умумий ўрта таълим мактаби',
      email: 'nabiraabdramanova1985@gmail.com',
      quote: '«Тарихни шунчаки йиллар ва номлар рўйхати эмас, балки тирик сабаб-оқибатлар тизими ва аждодлар тафаккури сифатида ўргатиш — менинг педагогик бурчимдир.»',
      bio: 'Абдраманова Набира Кенесовна — умумтаълим мактабларида тарих фанини ўқитишда замонавий рақамли технологиялар, интерактив картография ва қиёсий таҳлил методикасини амалиётга татбиқ этиб келаётган фидойи устоз. Мазкур платформа VI–X асрлар давлатчилик тарихини бирламчи манбалар асосида ўрганиш учун муаллиф томонидан ишлаб чиқилган.',
      achievementsTitle: 'Педагогик ва методик янгиликлар:',
      achievements: [
        'Турк хоқонлиги ва Тан империясининг 14 мезонли давлатлараро қиёсий таҳлил тизими;',
        'Култегин, Билга хоқон ва Тўнюқуқ орхон битиктошларини дарслик мавзуларига интеграциялаш;',
        '552–907 йиллардаги 17 та бурилиш нуқтасини ўз ичига олган хронологик интерактив харита;',
        'Ўқувчиларнинг танқидий тафаккурини ривожлантирувчи тарихий детектив лабораторияси.',
      ],
      readArticleBtn: 'Муаллифлик мақоласи ва дарс ишланмасини ўқиш',
      closeBtn: 'Ёпиш',
    },
    ru: {
      badge: 'Автор и разработчик платформы',
      fullName: 'Абдраманова Набира Кенесовна',
      role: 'Учитель истории школы № 54',
      school: 'Общеобразовательная школа № 54',
      email: 'nabiraabdramanova1985@gmail.com',
      quote: '«Преподавание истории — это не перечисление дат, а раскрытие глубинных причинно-следственных связей и величия цивилизационного диалога.»',
      bio: 'Абдраманова Набира Кенесовна — педагог-новатор, активно внедряющий в школьное образование современные цифровые технологии, интерактивную историческую картографию и методы текстологического анализа первоисточников. Данная платформа разработана автором для углубленного сравнительного изучения Тюркского каганата и династии Тан (552–907 гг.).',
      achievementsTitle: 'Методические и педагогические инновации:',
      achievements: [
        'Компаративная матрица из 14 критериев государственного устройства;',
        'Интеграция текстов орхонских рунических стел и летописей Цзю Тан шу в школьный курс;',
        'Интерактивная карта геополитических изменений и Великого шелкового пути;',
        'Практико-ориентированные кейсы «Исторического детектива» для развития критического мышления.',
      ],
      readArticleBtn: 'Читать авторскую статью и разработку урока',
      closeBtn: 'Закрыть',
    },
    en: {
      badge: 'Platform Author & Lead Developer',
      fullName: 'Abdramanova Nabira Kenesovna',
      role: 'History Educator at School No. 54',
      school: 'Comprehensive Secondary School No. 54',
      email: 'nabiraabdramanova1985@gmail.com',
      quote: '«Teaching history is not merely reciting dates, but cultivating analytical reasoning and honoring the profound intellectual heritage of Eurasian civilizations.»',
      bio: 'Abdramanova Nabira Kenesovna is a dedicated history teacher at School No. 54, pioneering digital humanities, interactive GIS cartography, and primary source criticism in secondary education. This comprehensive platform was conceptualized and developed by her to offer students a multidimensional comparative curriculum on the Turkic Khaganates and Tang Dynasty (552–907 CE).',
      achievementsTitle: 'Pedagogical Framework & Innovations:',
      achievements: [
        '14-criteria comparative matrix analyzing nomadic and imperial statecraft;',
        'Direct pedagogy bridging Orkhon runic epigraphy and Tang dynastic records;',
        'Interactive chronological cartography featuring 17 critical geopolitical milestones;',
        'Inquiry-based learning hub featuring historical detective cases and cause-and-effect simulations.',
      ],
      readArticleBtn: 'Read Author’s Scholarly & Pedagogical Article',
      closeBtn: 'Close',
    },
  }[currentLocale];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#18262B] rounded-2xl border border-[#E1E6E1] dark:border-[#314348] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:px-6 py-4 border-b border-[#E1E6E1] dark:border-[#314348] flex items-center justify-between bg-stone-50/80 dark:bg-[#10191D]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#17323B] dark:bg-[#D6AB77] flex items-center justify-center text-white dark:text-[#10191D] shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
                {contentByLocale.badge}
              </span>
              <h3 className="text-base font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                {contentByLocale.fullName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1] hover:bg-stone-200/50 dark:hover:bg-[#203238] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Identity Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F7F6F1] dark:bg-[#10191D] border border-[#E1E6E1] dark:border-[#314348] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
                <span className="text-sm font-bold text-[#17323B] dark:text-[#F1F4F1]">
                  {contentByLocale.school}
                </span>
              </div>
              <p className="text-xs text-[#526367] dark:text-[#B6C4C2]">
                {contentByLocale.role}
              </p>
            </div>

            <a
              href={`mailto:${contentByLocale.email}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-medium px-3.5 py-2 rounded-lg bg-white dark:bg-[#18262B] text-[#17323B] dark:text-[#D6AB77] border border-[#E1E6E1] dark:border-[#314348] hover:border-[#B88954] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{contentByLocale.email}</span>
            </a>
          </div>

          {/* Inspirational Motto */}
          <div className="p-4 rounded-xl border-l-4 border-[#B88954] dark:border-[#D6AB77] bg-amber-50/50 dark:bg-amber-950/20">
            <p className="text-xs sm:text-sm font-serif italic text-[#17323B] dark:text-[#F1F4F1] leading-relaxed">
              {contentByLocale.quote}
            </p>
          </div>

          {/* Biography & Mission */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#718080] dark:text-[#859896] mb-2">
              Loyiha haqida va muallif maqsadi:
            </h4>
            <p className="text-xs sm:text-sm text-[#526367] dark:text-[#B6C4C2] leading-relaxed">
              {contentByLocale.bio}
            </p>
          </div>

          {/* Pedagogical Innovations List */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#17323B] dark:text-[#F1F4F1] mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77]" />
              <span>{contentByLocale.achievementsTitle}</span>
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {contentByLocale.achievements.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 dark:bg-[#142025] border border-[#E1E6E1]/60 dark:border-[#314348]/60 text-xs text-[#17323B] dark:text-[#F1F4F1]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B88954] dark:text-[#D6AB77] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 py-3.5 border-t border-[#E1E6E1] dark:border-[#314348] bg-stone-50/50 dark:bg-[#10191D]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenFeaturedArticle();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] font-medium text-xs hover:bg-[#14515A] dark:hover:bg-[#e0b98a] transition-colors cursor-pointer shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>{contentByLocale.readArticleBtn}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1] cursor-pointer"
          >
            {contentByLocale.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
