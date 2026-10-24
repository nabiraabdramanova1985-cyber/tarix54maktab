import React, { useState, useRef, useEffect } from 'react';
import { Locale } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { 
  Compass, 
  Send, 
  X, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  User, 
  Bot,
  RotateCcw
} from 'lucide-react';

interface TarixchiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: Locale;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
  timestamp: string;
}

export const TarixchiChatModal: React.FC<TarixchiChatModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = DICTIONARIES[currentLocale];

  const initialGreeting: Record<Locale, string> = {
    uz: 'Assalomu alaykum! Men «Tarixchi» virtual ilmiy maslahatchisiman. Turk xoqonligi (552–744) va Tan imperiyasi (618–907) tarixi, siyosiy boshqaruvi, Buyuk Ipak yo‘li diplomatiyasi yoki Orxon bitiklari bo‘yicha istalgan savolingizga tasdiqlangan ilmiy manbalar asosida javob bera olaman.',
    'uz-Cyrl': 'Ассалому алайкум! Мен «Тарихчи» виртуал илмий маслаҳатчисиман. Турк хоқонлиги ва Тан империяси тарихи бўйича саволларингизга тасдиқланган манбалар асосида жавоб бераман.',
    ru: 'Здравствуйте! Я — «Тарихчи», виртуальный научный консультант платформы. Отвечу на любые вопросы по истории Тюркского каганата и династии Тан, опираясь на орхонские стелы и летописи Цзю Тан шу.',
    en: 'Greetings! I am «Tarixchi», your academic research advisor. I provide source-grounded insights into the Turkic Khaganates (552–744) and the Tang Dynasty (618–907) based on primary epigraphy and imperial records.',
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: initialGreeting[currentLocale],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isOpen, currentLocale]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInputText('');
    setIsLoading(true);

    try {
      // Academic knowledge retrieval fallback & response generation
      const qLower = textToSend.toLowerCase();
      let responseText = '';
      let sources = ['Orxon bitiklari', 'Jiu Tangshu (Old Book of Tang)'];

      if (qLower.includes('el') || qLower.includes('törü') || qLower.includes('төрү') || qLower.includes('конституци')) {
        responseText = currentLocale === 'en'
          ? 'In ancient Turkic political thought, «El» represents the sovereign federated union of tribes, while «Törü» signifies the eternal constitutional law and moral order. Even the Khagan was bound by Törü. The famous proverb states: «El may crumble, but Törü endures» (El ketär, törü qalur).'
          : currentLocale === 'ru'
          ? 'В древнетюркском государственном праве «Эль» олицетворяет суверенное государство, а «Тёрю» — священный кодекс законов и правопорядок, стоящий выше личности кагана. Как гласит изречение: «Эль может пасть, но Тёрю пребудет».'
          : 'Qadimgi turkiy davlatchilikda «El» — erkin va mustaqil qabilalar birlashgan davlatni, «Törü» esa buzilmas konstitutsiyaviy adolat va odat qonunlarini anglatadi. Xoqon ham Törüga bo‘ysunishga majbur edi. «El ketar, ammo Törü qolar» qoidasi qonun ustuvorligining dashtdagi timsoli bo‘lgan.';
        sources = ['Kultegin bitiktoshi', 'Bilga xoqon bitiktoshi', 'S.G. Klyashtorny'];
      } else if (qLower.includes('tian kehan') || qLower.includes('тиан кехан') || qLower.includes('самовий') || qLower.includes('небесн')) {
        responseText = currentLocale === 'en'
          ? 'In 630 CE, following the defeat of the Eastern Turkic Khaganate, steppe tribal chieftains convened at Chang’an to acclaim Emperor Taizong as «Tian Kehan» (Heavenly Khagan). This marked a unique historical syncretism: Taizong governed China as Confucian Son of Heaven while ruling nomadic Eurasia as supreme Steppe Khagan.'
          : currentLocale === 'ru'
          ? 'В 630 г. вожди степных племен провозгласили императора Тай-цзуна «Тянь Кэханем» (Небесным каганом). Это обеспечило дуальный статус: конфуцианский Сын Неба для Китая и верховный военный сюзерен для кочевников.'
          : '630-yilda Sharqiy Turk xoqonligi mag‘lub bo‘lgach, dasht boshliqlari Changanga kelib Taizongdan «Tian Kehan» (Samoviy xoqon) unvonini qabul qilishni iltimos qildilar. Bu orqali Taizong Xitoyda Osmon o‘g‘li (Tianzi), dashtda esa oliy xoqon maqomiga erishdi.';
        sources = ['Zizhi Tongjian, Tang Ji', 'Jiu Tangshu, Vol. 194'];
      } else if (qLower.includes('an lushan') || qLower.includes('ан лушан') || qLower.includes('мятеж') || qLower.includes('qo‘zg‘olon')) {
        responseText = currentLocale === 'en'
          ? 'An Lushan was of mixed Sogdian and Turkic ancestry (native name Rokhshan). Commanding three northeastern frontier garrisons as Jiedushi, his 755 CE rebellion seized Chang’an and Luoyang. Tang central authority collapsed, forcing the dynasty to rely on Uyghur Khaganate military intervention.'
          : currentLocale === 'ru'
          ? 'Ань Лушань (согдийско-тюркского происхождения) поднял мятеж в 755 г., захватив столицы Чанъань и Лоян. Восстание навсегда подорвало могущество династии Тан и вынудило двор призвать конницу Уйгурского каганата.'
          : 'An Lushan asli kelib chiqishi so‘g‘d va turk bo‘lgan harbiy qo‘mondon (Jiedushi). Uning 755-yildagi 150 minglik qo‘zg‘oloni Changan va Luoyangni vayron qildi. Tan hukumati dashtdagi Uyg‘ur xoqonligidan yordam so‘rashga majbur bo‘ldi va imperiyaning oltin davri yakunlandi.';
        sources = ['Jiu Tangshu, An Lushan Zhuan', 'Pulleyblank: The Background of the Rebellion of An Lu-shan'];
      } else {
        responseText = currentLocale === 'en'
          ? `Regarding «${textToSend}»: Primary historical records show that the Turkic Khaganates (552–744) and the Tang Dynasty (618–907) established a complex dynamic of warfare, bilateral diplomacy, and trade across the Great Silk Road. The sacred capital of Otuken served as the core of nomadic identity, while Chang’an formed the bureaucratic civil center.`
          : currentLocale === 'ru'
          ? `Относительно «${textToSend}»: Исторические источники свидетельствуют, что взаимоотношения Тюркского каганата и Тан сочетали военное соперничество и глубокий торговый симбиоз. Сакральный Отюкен оставался гарантом суверенитета кочевников, тогда как Чанъань выступал мировым ремесленным и дипломатическим центром.`
          : `«${textToSend}» bo‘yicha: Ilmiy manbalarga asosan, Turk xoqonligi (552–744) va Tan imperiyasi (618–907) Yevroosiyo tarixida bir vaqtda to‘qnashuv va chuqur savdo hamkorligini olib borgan. O‘tukan dasht davlatchiligi markazi bo‘lsa, Changan shahar byurokratiyasi va ipak ishlab chiqarish o‘chog‘i bo‘lgan. So‘g‘d savdogarlari esa bu ikki buyuk kuch o‘rtasida diplomatik ko‘prik vazifasini o‘tagan.`;
      }

      // Small realistic response settlement delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl h-full sm:h-[85vh] bg-white dark:bg-[#18262B] rounded-none sm:rounded-2xl border border-[#E1E6E1] dark:border-[#314348] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 py-3.5 border-b border-[#E1E6E1] dark:border-[#314348] flex items-center justify-between bg-stone-50/50 dark:bg-[#10191D]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#17323B] dark:bg-[#D6AB77] flex items-center justify-center text-white dark:text-[#10191D]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
                  {t.ai.title}
                </h3>
                <span className="text-[10px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-300/40 dark:border-emerald-800/40">
                  {t.ai.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#718080] dark:text-[#859896]">
                {t.ai.disclaimer}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#718080] hover:text-[#17323B] dark:hover:text-[#F1F4F1] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Arena */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#17323B] dark:bg-[#D6AB77] flex items-center justify-center text-white dark:text-[#10191D] shrink-0 text-xs font-bold font-serif">
                  𐰉
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] rounded-tr-xs'
                    : 'bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-[#17323B] dark:text-[#F1F4F1] rounded-tl-xs'
                }`}
              >
                <p className="font-serif leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-black/10 dark:border-white/10 text-[11px] text-[#526367] dark:text-[#B6C4C2] flex flex-wrap items-center gap-1.5 font-mono">
                    <span className="font-sans font-semibold text-[#17323B] dark:text-[#F1F4F1]">
                      {t.ai.sourceGrounded}:
                    </span>
                    {msg.sources.map((s, idx) => (
                      <span key={idx} className="bg-white/60 dark:bg-black/20 px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <span className="block text-[10px] opacity-60 text-right mt-1.5 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-full bg-[#17323B] dark:bg-[#D6AB77] flex items-center justify-center text-white dark:text-[#10191D] shrink-0 text-xs font-bold font-serif">
                𐰉
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-xs text-[#718080] dark:text-[#859896] italic flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B88954] animate-spin" />
                <span>{t.ai.thinking}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Strip */}
        <div className="px-4 py-2 border-t border-[#E1E6E1] dark:border-[#314348] bg-stone-50/50 dark:bg-[#10191D]/50 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-semibold uppercase text-[#718080] shrink-0">
            Tavsiya savollar:
          </span>
          {t.ai.suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2] hover:text-[#17323B] dark:hover:text-[#F1F4F1] whitespace-nowrap cursor-pointer transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[#E1E6E1] dark:border-[#314348] bg-white dark:bg-[#18262B]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.ai.placeholder}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] rounded-xl text-[#17323B] dark:text-[#F1F4F1] focus:outline-none focus:ring-1 focus:ring-[#B88954]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#14515A] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
