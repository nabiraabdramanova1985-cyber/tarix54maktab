import { LocalizedString } from '../types';

export interface DetectiveCase {
  id: string;
  title: LocalizedString;
  primaryExcerpt: LocalizedString;
  mysteryQuestion: LocalizedString;
  clues: LocalizedString[];
  options: LocalizedString[];
  correctOptionIndex: number;
  historicalResolution: LocalizedString;
  primarySourceCitation: string;
}

export interface CauseEffectItem {
  id: string;
  event: LocalizedString;
  correctCategory: 'cause' | 'process' | 'consequence';
  categoryLabel: LocalizedString;
  explanation: LocalizedString;
}

export interface ChronoMatchPair {
  id: string;
  year: number;
  event: LocalizedString;
}

export interface DailyChallenge {
  date: string;
  question: LocalizedString;
  options: LocalizedString[];
  correctIndex: number;
  insight: LocalizedString;
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'case-1-sweet-words',
    title: {
      uz: '«Shirin so‘zlar va muloyim ipak» siri',
      'uz-Cyrl': '«Ширин сўзлар ва мулойим ипак» сири',
      ru: 'Тайна «Сладких речей и мягких шелков»',
      en: 'Mystery of the «Sweet Words and Soft Silks»',
    },
    primaryExcerpt: {
      uz: '«Ular shirin so‘zi, muloyim ipak matosi bilan aldab, yiroqdagi xalqni yaqinlashtirar ekan. Yaqinlashgandan so‘ng, yovuzliklarini o‘rgatar ekan... Ey turk xalqi, sen aldanib, ko‘plab qirilib ketding!»',
      'uz-Cyrl': '«Улар ширин сўзи, мулойим ипак матоси билан алдаб, йироқдаги халқни яқинлаштирар экан. Яқинлашгандан сўнг, ёвузликларини ўргатар экан... Эй турк халқи, сен алданиб, кўплаб қирилиб кетдинг!»',
      ru: '«Слова их сладки, а шелка их мягки. Обольщая ими, они приближают к себе далекие народы, а приблизившись, сеют коварство... О тюркский народ, ты был обманут и понес великие утраты!»',
      en: '«Their words are sweet and their silk fabrics are soft. Deceiving with sweet words, they draw distant nations close, then instruct them in malice... O Turkic people, you were deceived and perished in vast numbers!»',
    },
    mysteryQuestion: {
      uz: 'Ushbu ogohlantiruvchi murojaat kimning vasiyatidan olingan va kimga qaratilgan?',
      'uz-Cyrl': 'Ушбу огоҳлантирувчи мурожаат кимнинг васиятидан олинган ва кимга қаратилган?',
      ru: 'Из какого исторического памятника взят этот манифест и к кому он обращен?',
      en: 'Which ruler authored this solemn testament, and to whom is it addressed?',
    },
    clues: [
      {
        uz: 'Muallif Ikkinchi Turk xoqonligining hukmdori bo‘lib, toshbitigini Orxon daryosi bo‘yiga o‘rnatgan.',
        'uz-Cyrl': 'Муаллиф Иккинчи Турк хоқонлигининг ҳукмдори бўлиб, тошбитигини Ўрхон бўйига ўрнатган.',
        ru: 'Автор — великий каган Второго каганата, чей памятник стоит на реке Орхон.',
        en: 'The author was a ruler of the Second Khaganate whose monument stands on the Orkhon River.',
      },
      {
        uz: 'U o‘z ukasi Kultegin va maslahatchisi To‘nyuquq bilan saltanatni boshqargan.',
        'uz-Cyrl': 'У ўз укаси Култегин ва маслаҳатчиси Тўнюқуқ билан салтанатни бошқарган.',
        ru: 'Он правил в согласии с братом Кюль-тегином и тестем Тоньюкуком.',
        en: 'He governed in harmony with his brother Kul Tigin and mentor Tonyukuk.',
      },
    ],
    options: [
      {
        uz: 'Bilga xoqon — turk xalqiga qaratilgan vasiyat',
        'uz-Cyrl': 'Билга хоқон — турк халқига қаратилган васият',
        ru: 'Бильге-каган — в обращении к тюркскому народу',
        en: 'Bilga Khagan — addressing the Turkic nation',
      },
      {
        uz: 'Taizong — Changan amaldorlariga farmoni',
        'uz-Cyrl': 'Таизонг — Чанган амалдорларига фармони',
        ru: 'Император Тай-цзун — чиновникам Чанъаня',
        en: 'Emperor Taizong — imperial decree to mandarins',
      },
      {
        uz: 'Xusrav I Anushirvon — Eron saroyi a’yonlariga',
        'uz-Cyrl': 'Хусрав I Ануширвон — Эрон саройи аъёнларига',
        ru: 'Хосров Ануширван — сасанидской знати',
        en: 'Khosrow I Anushirvan — to Sasanian grandees',
      },
      {
        uz: 'Bumin xoqon — Jujan elchilariga aytgan so‘zi',
        'uz-Cyrl': 'Бумин хоқон — Жужан элчиларига айтган сўзи',
        ru: 'Бумын-каган — жужаньским послам',
        en: 'Bumin Khagan — rebuke to Rouran emissaries',
      },
    ],
    correctOptionIndex: 0,
    historicalResolution: {
      uz: 'Bu parcha Bilga xoqon bitiktoshining Janubiy tomoni 5–7-satrlaridan olingan. Unda Tan imperiyasining hashamatli sovg‘alari va iqtisodiy qaramlik xavfi tahlil qilingan.',
      'uz-Cyrl': 'Бу парча Билга хоқон битиктошининг Жанубий томонидан олинган. Унда Тан империясининг ҳашамати ва иқтисодий қарамлик хавфи таҳлил қилинган.',
      ru: 'Цитата из южной грани стелы Бильге-кагана (735 г.). Это предостережение против культурной ассимиляции и долговой зависимости от Китая.',
      en: 'This excerpt is from lines 5–7 of the south face of the Bilga Khagan stele (735 CE), warning against geopolitical and economic dependency on Tang.',
    },
    primarySourceCitation: 'Bilga Khagan Inscription, South Facet',
  },
  {
    id: 'case-2-bian-bridge',
    title: {
      uz: 'Oq ot qurbonligi va Vey ko‘prigi siri',
      'uz-Cyrl': 'Оқ от қурбонлиги ва Вей кўприги сири',
      ru: 'Тайна белого коня на мосту через Вэй',
      en: 'The Mystery of the White Horse Oath at the Bian Bridge',
    },
    primaryExcerpt: {
      uz: '«U daryo qirg‘og‘iga kelib, raqib qo‘shinining ulug‘vorligini ko‘rdi. Sarkardalar urush qilishni so‘radilar, ammo hukmdor: "Men ularni jangga kirmasdan, aql bilan taslim qilaman", dedi va ko‘prik ustida oq otni qurbonlik qilib qasam ichdi...»',
      'uz-Cyrl': '«У дарё қирғоғига келиб, рақиб қўшинининг улуғворлигини кўрди. Саркардалар уруш қилишни сўрадилар, аммо ҳукмдор: "Мен уларни жангга кирмасдан, ақл билан таслим қиламан", деди...»',
      ru: '«Он прибыл на берег реки и узрел бескрайние ряды кочевой конницы. Полководцы просили приказа к битве, но государь ответил: "Я одолею их разумом, а не кровью", после чего на мосту заклал белого коня...»',
      en: '«He arrived at the riverbank and witnessed the immense host of steppe horsemen. His generals urged immediate battle, but the sovereign replied: "I shall subdue them with statecraft, not bloodshed", sacrificing a white horse on the bridge...»',
    },
    mysteryQuestion: {
      uz: 'Bu voqea qaysi ikki mashhur rahbar o‘rtasida va qaysi yilda yuz bergan?',
      'uz-Cyrl': 'Бу воқеа қайси икки машҳур раҳбар ўртасида ва қайси йилда юз берган?',
      ru: 'Между какими историческими лидерами и в каком году произошла эта сцена?',
      en: 'Between which two prominent historical sovereigns did this event transpire?',
    },
    clues: [
      {
        uz: 'Voqea Changan shahrining yaqinidagi Vey daryosi ko‘prigida yuz bergan.',
        'uz-Cyrl': 'Воқеа Чанган яқинидаги Вей дарёси кўпригида юз берган.',
        ru: 'Событие развернулось на реке Вэй у стен столицы Чанъань.',
        en: 'The encounter took place at the Bian Bridge on the Wei River near Chang’an.',
      },
      {
        uz: 'Xitoy hukmdori oradan 4 yil o‘tib qasos oldi va o‘sha xoqonni asirga oldi.',
        'uz-Cyrl': 'Хитой ҳукмдори 4 йил ўтиб қасос олди ва ўша хоқонни асирга олди.',
        ru: 'Через четыре года китайский монарх пленил этого же кагана в горах Иньшань.',
        en: 'Four years later, the imperial sovereign reversed the balance and captured the Khagan.',
      },
    ],
    options: [
      {
        uz: 'Imperator Taizong va Illig (Xieli) xoqon (626-yil)',
        'uz-Cyrl': 'Император Таизонг ва Иллиг хоқон (626 йил)',
        ru: 'Император Тай-цзун и Хели-каган (626 г.)',
        en: 'Emperor Taizong and Illig (Xieli) Khagan (626 CE)',
      },
      {
        uz: 'Bumin xoqon va Anaguy (552-yil)',
        'uz-Cyrl': 'Бумин хоқон ва Анагуй (552 йил)',
        ru: 'Бумын-каган и Анагуй (552 г.)',
        en: 'Bumin Khagan and Anagui (552 CE)',
      },
      {
        uz: 'Istami yabg‘u va Xusrav I Anushirvon (563-yil)',
        'uz-Cyrl': 'Истами ябғу ва Хусрав I (563 йил)',
        ru: 'Истеми-ябгу и Хосров I (563 г.)',
        en: 'Istami Yabgu and Khosrow I (563 CE)',
      },
      {
        uz: 'U Zetyan va Qopag‘on xoqon (696-yil)',
        'uz-Cyrl': 'У Зетьян ва Қопағон хоқон (696 йил)',
        ru: 'У Цзэтянь и Капаган-каган (696 г.)',
        en: 'Empress Wu and Qapaghan Khagan (696 CE)',
      },
    ],
    correctOptionIndex: 0,
    historicalResolution: {
      uz: '626-yilda Taizong taxtga endigina o‘tirgan paytda Illig xoqon Changanga hujum qilgan. Taizong vaqt yutish uchun Vey daryosida sulh tuzib, 630-yilda Sharqiy xoqonlikni uzil-kesil mag‘lub etgan.',
      'uz-Cyrl': '626 йилда Таизонг Иллиг хоқон билан Вей дарёсида сулҳ тузиб, 630 йилда ғалаба қозонган.',
      ru: 'Договор на реке Вэй (Бяньцяо) 626 г. спас Чанъань от разгрома и позволил Тай-цзуну подготовить реванш 630 года.',
      en: 'The 626 CE Bian Bridge Pact spared Chang’an from sack, enabling Taizong to counter-attack and defeat Illig Khagan in 630 CE.',
    },
    primarySourceCitation: 'Zizhi Tongjian, Tang Ji, Vol. 191',
  },
];

export const CAUSE_EFFECT_ITEMS: CauseEffectItem[] = [
  {
    id: 'ce-1',
    event: {
      uz: 'Oltoy qabilalarining temir eritish va qurol-yarog‘ ishlab chiqarish salohiyati keskin oshishi',
      'uz-Cyrl': 'Олтой қабилаларининг темир эритиш ва қурол ишлаб чиқариш салоҳияти кескин ошиши',
      ru: 'Бурный рост металлургии железа и ковки латного доспеха у племен Алтая',
      en: 'Rapid surge in iron smelting and armaments production among Altai tribes',
    },
    correctCategory: 'cause',
    categoryLabel: {
      uz: 'Tarixiy Sabab (Omil)',
      'uz-Cyrl': 'Тарихий Сабаб (Омил)',
      ru: 'Историческая причина (Предпосылка)',
      en: 'Historical Cause (Precondition)',
    },
    explanation: {
      uz: 'Texnologik ustunlik Bumin xoqonga Jujan xoqonligini tormor etish va qudratli armiya tuzish imkonini berdi.',
      'uz-Cyrl': 'Технологик устунлик Бумин хоқонга Жужанни тормор этиш имконини берди.',
      ru: 'Превосходство в вооружении стало материальной базой создания Первого каганата.',
      en: 'Metallurgical superiority provided the structural foundation for Bumin’s military victory.',
    },
  },
  {
    id: 'ce-2',
    event: {
      uz: '568-yilda Konstantinopolga Maniax elchiligining yuborilishi va Zemarxning qabul qilinishi',
      'uz-Cyrl': '568 йилда Константинополга Маниах элчилигининг юборилиши',
      ru: 'Обмен посольствами Маниаха и Земарха между каганатом и Византией в 568 г.',
      en: 'Diplomatic exchange of Maniakh and Zemarchus between Khaganate and Byzantium in 568 CE',
    },
    correctCategory: 'process',
    categoryLabel: {
      uz: 'Tarixiy Jarayon (Hodisa)',
      'uz-Cyrl': 'Тарихий Жараён (Ҳодиса)',
      ru: 'Исторический процесс (Событие)',
      en: 'Historical Process (Event)',
    },
    explanation: {
      uz: 'Bu qit’alararo savdo arteriyasini forslar to‘sig‘idan olib chiqish bo‘yicha amalga oshirilgan aniq diplomatik qadamdir.',
      'uz-Cyrl': 'Бу савдо йўлини форслар тўсиғидан олиб чиқиш жараёни эди.',
      ru: 'Дипломатический процесс формирования антиперсидской оси на Шелковом пути.',
      en: 'The diplomatic execution of circumventing Sasanian silk trade blockades.',
    },
  },
  {
    id: 'ce-3',
    event: {
      uz: 'Xitoylik ustalar orqali Samarqandda qog‘oz ishlab chiqarish sanoatining paydo bo‘lishi',
      'uz-Cyrl': 'Самарқандда қоғоз ишлаб чиқариш саноатининг пайдо бўлиши',
      ru: 'Возникновение знаменитого производства самаркандской бумаги',
      en: 'Establishment of the celebrated Samarkand papermaking industry',
    },
    correctCategory: 'consequence',
    categoryLabel: {
      uz: 'Tarixiy Oqibat (Natija)',
      'uz-Cyrl': 'Тарихий Оқибат (Натижа)',
      ru: 'Историческое последствие (Результат)',
      en: 'Historical Consequence (Outcome)',
    },
    explanation: {
      uz: '751-yilgi Talas jangida asir olingan xitoylik qog‘oz ustalarining mehnati oqibatida Samarqand qog‘ozi dunyoga tarqaldi.',
      'uz-Cyrl': '751 йилги Талас жанги оқибатида қоғоз технологияси Самарқандга ўтди.',
      ru: 'Прямое цивилизационное последствие поражения армии Тан в Таласской битве.',
      en: 'Direct civilizational result of the 751 CE Battle of Talas transferring papermaking west.',
    },
  },
  {
    id: 'ce-4',
    event: {
      uz: 'Tan imperiyasida chegara viloyatlari noiblari (Jiedushi)ga cheksiz harbiy va moliyaviy erkinlik berilishi',
      'uz-Cyrl': 'Jiedushi ҳарбий ноибларига чексиз эркинлик берилиши',
      ru: 'Предоставление военным губернаторам цзедуши автономии и командования армиями',
      en: 'Granting unchecked military and fiscal autonomy to frontier Jiedushi governors',
    },
    correctCategory: 'cause',
    categoryLabel: {
      uz: 'Tarixiy Sabab (Omil)',
      'uz-Cyrl': 'Тарихий Сабаб (Омил)',
      ru: 'Историческая причина (Предпосылка)',
      en: 'Historical Cause (Precondition)',
    },
    explanation: {
      uz: 'Markaziy nazoratning zaiflashuvi 755-yilda An Lushanning imperiyaga qarshi qo‘zg‘olon ko‘tarishiga bevosita sabab bo‘ldi.',
      'uz-Cyrl': 'Бу ҳолат Ан Лушан қўзғолонига бевосита сабаб бўлди.',
      ru: 'Структурная причина, сделавшая неизбежным мятеж Ань Лушаня в 755 г.',
      en: 'The structural institutional vulnerability that enabled the An Lushan Rebellion of 755 CE.',
    },
  },
];

export const CHRONO_MATCH_PAIRS: ChronoMatchPair[] = [
  {
    id: 'ch-552',
    year: 552,
    event: {
      uz: 'Bumin xoqon Birinchi Turk xoqonligiga asos soldi',
      'uz-Cyrl': 'Бумин хоқон Биринчи Турк хоқонлигига асос солди',
      ru: 'Бумын-каган основал Первый Тюркский каганат',
      en: 'Bumin Khagan founded the First Turkic Khaganate',
    },
  },
  {
    id: 'ch-568',
    year: 568,
    event: {
      uz: 'Turk-Vizantiya harbiy va savdo ittifoqi imzolandi',
      'uz-Cyrl': 'Турк-Византия ҳарбий ва савдо иттифоқи имзоланди',
      ru: 'Заключен тюркско-византийский союз против Персии',
      en: 'Turkic-Byzantine treaty forged in Constantinople',
    },
  },
  {
    id: 'ch-618',
    year: 618,
    event: {
      uz: 'Li Yuan tomonidan Tan sulolasiga asos solindi',
      'uz-Cyrl': 'Ли Юан томонидан Тан сулоласига асос солинди',
      ru: 'Ли Юань основал китайскую династию Тан',
      en: 'Li Yuan founded the imperial Tang Dynasty',
    },
  },
  {
    id: 'ch-630',
    year: 630,
    event: {
      uz: 'Imperator Taizong «Tian Kehan» unvonini qabul qildi',
      'uz-Cyrl': 'Император Таизонг «Tian Kehan» унвонини қабул қилди',
      ru: 'Император Тай-цзун принял титул «Тянь Кэхань»',
      en: 'Emperor Taizong acclaimed «Tian Kehan» by steppe tribes',
    },
  },
  {
    id: 'ch-682',
    year: 682,
    event: {
      uz: 'Ilterish va To‘nyuquq Ikkinchi Turk xoqonligini tikladi',
      'uz-Cyrl': 'Илтериш ва Тўнюқуқ Иккинчи Турк хоқонлигини тиклади',
      ru: 'Ильтериш и Тоньюкук возродили Второй Тюркский каганат',
      en: 'Ilterish and Tonyukuk restored the Second Khaganate',
    },
  },
  {
    id: 'ch-751',
    year: 751,
    event: {
      uz: 'Talas daryosi bo‘yida arablar va Tan armiyasi to‘qnashdi',
      'uz-Cyrl': 'Талас дарёси бўйида араблар ва Тан армияси тўқнашди',
      ru: 'Историческая битва при Таласе между арабами и Тан',
      en: 'Battle of Talas River between Abbasids and Tang',
    },
  },
  {
    id: 'ch-755',
    year: 755,
    event: {
      uz: 'An Lushan Tan imperiyasiga qarshi buyuk isyon ko‘tardi',
      'uz-Cyrl': 'Ан Лушан Тан империясига қарши буюк исён кўтарди',
      ru: 'Начало разрушительного восстания Ань Лушаня',
      en: 'Outbreak of the catastrophic An Lushan Rebellion',
    },
  },
  {
    id: 'ch-907',
    year: 907,
    event: {
      uz: 'Oxirgi Tan imperatori taxtdan qulatilib sulola tugadi',
      'uz-Cyrl': 'Охирги Тан императори тахтдан қулатилиб сулола тугади',
      ru: 'Низложение последнего императора Тан и падение династии',
      en: 'Deposition of the last Tang emperor ending the dynasty',
    },
  },
];

export const DAILY_CHALLENGE: DailyChallenge = {
  date: '2026-10-24',
  question: {
    uz: 'Kultegin bitiktoshidagi toshbaqa poydevor qanday g‘oyaviy ma’noni anglatadi?',
    'uz-Cyrl': 'Култегин битиктошидаги тошбақа пойдевор қандай ғоявий маънони англатади?',
    ru: 'Какую идеологическую и космологическую идею выражает постамент в виде каменной черепахи у стелы Кюль-тегина?',
    en: 'What ideological and cosmological concept does the stone tortoise plinth beneath Kul Tigin’s stele signify?',
  },
  options: [
    {
      uz: 'Yer kurrasi va koinotning poydevori, abadiy xotira va mangu yashash ramzi',
      'uz-Cyrl': 'Ер курраси ва коинотнинг пойдевори, абадий хотира ва мангу яшаш рамзи',
      ru: 'Опора мироздания, космическая незыблемость и символ вечной памяти о героях',
      en: 'The foundation of the cosmos, cosmic endurance, and eternal memory of heroic deeds',
    },
    {
      uz: 'Ko‘chmanchilarning faqat daryo bo‘yida yashashi shartligini',
      'uz-Cyrl': 'Кўчманчиларнинг дарё бўйида яшаши шартлигини',
      ru: 'Указание на то, что кочевники должны селиться исключительно у рек',
      en: 'An indication that pastoralists must settle solely beside major rivers',
    },
    {
      uz: 'Xitoydan olingan barcha ipaklarni shu yerda saqlash lozimligini',
      'uz-Cyrl': 'Хитойдан олинган барча ипакларни шу ерда сақлаш лозимлигини',
      ru: 'Обозначение тайного хранилища шелковой дани',
      en: 'A designation for underground imperial silk tribute vaults',
    },
  ],
  correctIndex: 0,
  insight: {
    uz: 'Qadimgi Yevroosiyo mifologiyasida toshbaqa dunyoni o‘z orqasida ko‘tarib turuvchi mustahkam tayanch hisoblangan. Xoqon vasiyati toshbaqa ustiga o‘rnatilishi — uning abadiy ekanligini ifodalagan.',
    'uz-Cyrl': 'Қадимги мифологияда тошбақа дунёни кўтариб турувчи тайанч ҳисобланган.',
    ru: 'В евразийской космологии черепаха олицетворяет космическую твердь; водружение стелы на ее спину символизировало вечность высеченного слова.',
    en: 'In ancient Eurasian cosmology, the tortoise carries the cosmic universe upon its shell; mounting the stele upon it signaled the eternal endurance of the inscribed testament.',
  },
};
