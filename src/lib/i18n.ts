import { Locale } from '../types';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  subTagline: string;
  nav: {
    home: string;
    turk: string;
    tang: string;
    compare: string;
    timeline: string;
    map: string;
    quiz: string;
    sources: string;
    interactive: string;
    dashboard: string;
    admin: string;
  };
  actions: {
    startLearning: string;
    testKnowledge: string;
    readArticle: string;
    viewSource: string;
    filter: string;
    all: string;
    searchPlaceholder: string;
    searchShortcut: string;
    clearFilters: string;
    backToList: string;
    markAsCompleted: string;
    completed: string;
    bookmark: string;
    bookmarked: string;
    next: string;
    prev: string;
    submit: string;
    retake: string;
    exportResult: string;
    printCertificate: string;
    askHistorian: string;
    openInMap: string;
    close: string;
  };
  filters: {
    allStates: string;
    turkKhaganate: string;
    tangDynasty: string;
    diplomacySilkRoad: string;
    difficulty: string;
    allDifficulties: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    period: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    featuredThemesTitle: string;
    featuredThemesSubtitle: string;
    comparisonPreviewTitle: string;
    comparisonPreviewSubtitle: string;
    timelinePreviewTitle: string;
    mapPreviewTitle: string;
    dailyGoalTitle: string;
    academicSourcesTitle: string;
    stats: {
      centuries: string;
      centuriesDesc: string;
      sources: string;
      sourcesDesc: string;
      articles: string;
      articlesDesc: string;
      quizzes: string;
      quizzesDesc: string;
    };
  };
  comparison: {
    title: string;
    subtitle: string;
    turkHeader: string;
    tangHeader: string;
    analyticalSynthesis: string;
    selectCriterion: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterTurk: string;
    filterTang: string;
    filterBoth: string;
    causeAndEffect: string;
    significance: string;
  };
  map: {
    title: string;
    subtitle: string;
    layers: string;
    layerTurkicSphere: string;
    layerTangSphere: string;
    layerSilkRoad: string;
    layerCapitals: string;
    layerMonuments: string;
    eraSelector: string;
    locationDetails: string;
    noLocationSelected: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    startQuiz: string;
    selectTopic: string;
    allTopics: string;
    questionOf: string;
    difficulty: string;
    correct: string;
    incorrect: string;
    explanation: string;
    sourceReference: string;
    finishQuiz: string;
    scoreSummary: string;
    recommendation: string;
    weakAreasAnalysis: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    progressOverview: string;
    articlesCompleted: string;
    averageQuizScore: string;
    studyStreakDays: string;
    dailyTargetMinutes: string;
    bookmarksList: string;
    noBookmarks: string;
    recentActivity: string;
    continueStudy: string;
    roleSelector: string;
    currentRole: string;
  };
  sources: {
    title: string;
    subtitle: string;
    primaryEpigraphy: string;
    imperialAnnals: string;
    academicLiterature: string;
    verifiedAcademicRecord: string;
    citationNotice: string;
  };
  creative: {
    title: string;
    subtitle: string;
    detectiveTitle: string;
    detectiveDesc: string;
    causeEffectTitle: string;
    causeEffectDesc: string;
    chronologyTitle: string;
    chronologyDesc: string;
    glossaryTitle: string;
    glossaryDesc: string;
    personsTitle: string;
    personsDesc: string;
    dailyQuestionTitle: string;
  };
  ai: {
    title: string;
    badge: string;
    disclaimer: string;
    placeholder: string;
    suggestedQuestions: string[];
    send: string;
    thinking: string;
    sourceGrounded: string;
  };
  admin: {
    title: string;
    subtitle: string;
    contentManagement: string;
    translationCoverage: string;
    quizManagement: string;
    publishedStatus: string;
    draft: string;
    published: string;
    actions: string;
    edit: string;
    delete: string;
    save: string;
  };
  footer: {
    copyright: string;
    motto: string;
    aboutText: string;
    academicPartners: string;
  };
}

export const DICTIONARIES: Record<Locale, TranslationDictionary> = {
  uz: {
    brandName: 'Tarix',
    tagline: 'O‘tmishni anglash — kelajakni qurish',
    subTagline: 'Turk xoqonligi va Tan imperiyasi tarixiga bag‘ishlangan ilmiy-interaktiv ta’lim platformasi',
    nav: {
      home: 'Bosh sahifa',
      turk: 'Turk xoqonligi',
      tang: 'Tan imperiyasi',
      compare: 'Taqqoslash',
      timeline: 'Vaqt chizig‘i',
      map: 'Interaktiv xarita',
      quiz: 'Testlar',
      sources: 'Manbalar',
      interactive: 'Ijodiy xona',
      dashboard: 'Mening kabinetim',
      admin: 'Boshqaruv',
    },
    actions: {
      startLearning: 'O‘rganishni boshlash',
      testKnowledge: 'Bilimingizni sinang',
      readArticle: 'Mavzuni to‘liq o‘qish',
      viewSource: 'Asl manbani ko‘rish',
      filter: 'Filtrlash',
      all: 'Barchasi',
      searchPlaceholder: 'Mavzular, shaxslar, sanalar yoki atamalarni qidiring...',
      searchShortcut: 'Qidiruv (Ctrl+K)',
      clearFilters: 'Filtrlarni tozalash',
      backToList: 'Ro‘yxatga qaytish',
      markAsCompleted: 'O‘rganildi deb belgilash',
      completed: 'O‘zlashtirilgan',
      bookmark: 'Saqlab qo‘yish',
      bookmarked: 'Saqlangan',
      next: 'Keyingisi',
      prev: 'Oldingisi',
      submit: 'Tasdiqlash',
      retake: 'Qayta topshirish',
      exportResult: 'Natijani yuklab olish',
      printCertificate: 'Natijani chop etish',
      askHistorian: 'Tarixchidan so‘rash',
      openInMap: 'Xaritada ochish',
      close: 'Yopish',
    },
    filters: {
      allStates: 'Barcha davlatlar',
      turkKhaganate: 'Turk xoqonligi',
      tangDynasty: 'Tan imperiyasi',
      diplomacySilkRoad: 'Diplomatiya va Ipak yo‘li',
      difficulty: 'Qiyinlik darajasi',
      allDifficulties: 'Barcha darajalar',
      beginner: 'Boshlang‘ich',
      intermediate: 'O‘rta',
      advanced: 'Akademik (Yuqori)',
      period: 'Davr',
    },
    home: {
      heroTitle: 'O‘tmishni anglash — kelajakni qurish',
      heroSubtitle: 'Yevroosiyo dashtlari va Sharqiy Osiyo tamaddunining 350 yillik to‘qnashuv, diplomatiya va Buyuk Ipak yo‘li savdo integratsiyasi tarixi.',
      featuredThemesTitle: 'Asosiy o‘quv mavzulari',
      featuredThemesSubtitle: 'Turk davlatchiligi, Tan boshqaruvi va Buyuk Ipak yo‘li chorrahasidagi tarixiy voqeliklar',
      comparisonPreviewTitle: 'Ko‘chmanchi saltanat va Byurokratik imperiya',
      comparisonPreviewSubtitle: 'Ijtimoiy tuzilma, harbiy qudrat va legitimlik asoslarini 14 ta ilmiy mezon bo‘yicha taqqoslang',
      timelinePreviewTitle: 'Asosiy xronologik bosqichlar (552–907)',
      mapPreviewTitle: 'Yevroosiyo tarixiy geografiyasi',
      dailyGoalTitle: 'Bugungi kunlik o‘quv maqsadi',
      academicSourcesTitle: 'Birlamchi va akademik manbalar fondi',
      stats: {
        centuries: '355 yil',
        centuriesDesc: '552-yildan 907-yilgacha bo‘lgan davr tahlili',
        sources: '18 ta birlamchi',
        sourcesDesc: 'Orxon bitiklari va Xitoy sulolaviy xronikalari',
        articles: '12 ta maqola',
        articlesDesc: 'Akademik talablarga mos mukammal tahlil',
        quizzes: '20+ savol',
        quizzesDesc: 'Sabab-oqibat va manba tahlili testlari',
      },
    },
    comparison: {
      title: 'Turk xoqonligi va Tan imperiyasini taqqoslash',
      subtitle: 'Nomadizm va o‘troq sivilizatsiyaning o‘zaro ta’siri, siyosiy modeli hamda xalqaro diplomatiyasi',
      turkHeader: 'Turk xoqonligi (552–744)',
      tangHeader: 'Tan imperiyasi (618–907)',
      analyticalSynthesis: 'Tarixiy xulosa va sintez',
      selectCriterion: 'Taqqoslash mezonini tanlang',
    },
    timeline: {
      title: 'Xronologik vaqt chizig‘i (552–907)',
      subtitle: 'Siyosiy yuksalish, sulolaviy inqirozlar va xalqaro ittifoqlar ketma-ketligi',
      filterAll: 'Barcha voqealar',
      filterTurk: 'Turk xoqonligi',
      filterTang: 'Tan imperiyasi',
      filterBoth: 'O‘zaro munosabatlar',
      causeAndEffect: 'Sabab va oqibatlar',
      significance: 'Tarixiy ahamiyati',
    },
    map: {
      title: 'Interaktiv tarixiy geografiya',
      subtitle: 'O‘tukan, Changan, Suyob va Buyuk Ipak yo‘lining muhim savdo-madaniy markazlari',
      layers: 'Xarita qatlamlari',
      layerTurkicSphere: 'Turk xoqonligi ta’sir doirasi',
      layerTangSphere: 'Tan imperiyasi chegaralari',
      layerSilkRoad: 'Buyuk Ipak yo‘li yo‘nalishlari',
      layerCapitals: 'Poytaxtlar va qarorgohlar',
      layerMonuments: 'Bitiktoshlar va qal’alar',
      eraSelector: 'Tarixiy davrni tanlash',
      locationDetails: 'Markaz tavsifi',
      noLocationSelected: 'Xaritaning istalgan belgisini bosing',
    },
    quiz: {
      title: 'Testlar va bilimni baholash',
      subtitle: 'Faqat yodlash emas, balki sabab-oqibat va birlamchi manbalarni tahlil qilish imtihoni',
      startQuiz: 'Testni boshlash',
      selectTopic: 'Mavzu bo‘yicha saralash',
      allTopics: 'Barcha mavzular bo‘yicha (Aralash)',
      questionOf: 'Savol',
      difficulty: 'Darajasi',
      correct: 'To‘g‘ri javob!',
      incorrect: 'Noto‘g‘ri javob',
      explanation: 'Tarixiy tahlil va dalil',
      sourceReference: 'Foydalanilgan manba',
      finishQuiz: 'Testni yakunlash',
      scoreSummary: 'Sizning natijangiz',
      recommendation: 'Tavsiya etiladigan o‘qishlar',
      weakAreasAnalysis: 'Takrorlash lozim bo‘lgan jihatlar',
    },
    dashboard: {
      title: 'Talaba va tadqiqotchi kabineti',
      subtitle: 'O‘quv kursi bo‘yicha shaxsiy ko‘rsatkichlar va erishilgan natijalar',
      progressOverview: 'Umumiy o‘zlashtirish',
      articlesCompleted: 'O‘rganilgan maqolalar',
      averageQuizScore: 'O‘rtacha test balli',
      studyStreakDays: 'Kunlik o‘qish zanjiri',
      dailyTargetMinutes: 'Kunlik reja (daqiqa)',
      bookmarksList: 'Saqlangan materiallar',
      noBookmarks: 'Hozircha saqlangan maqola yo‘q',
      recentActivity: 'So‘nggi faoliyat',
      continueStudy: 'O‘qishda davom etish',
      roleSelector: 'Foydalanuvchi roli',
      currentRole: 'Joriy rol',
    },
    sources: {
      title: 'Ilmiy va tarixiy manbalar kutubxonasi',
      subtitle: 'Birlamchi runik epigrafika, sulolaviy solnomalar va zamonaviy akademik tadqiqotlar',
      primaryEpigraphy: 'Birlamchi runik yozuvlar',
      imperialAnnals: 'Sulolaviy xronikalar va arxeologiya',
      academicLiterature: 'Zamonaviy akademik adabiyotlar',
      verifiedAcademicRecord: 'Akademik tekshiruvdan o‘tgan',
      citationNotice: 'Tarixiy tahlilda manbaga iqtibos keltirish qoidalari',
    },
    creative: {
      title: 'Interaktiv tarix laboratoriyasi',
      subtitle: 'Tahliliy fikrlash va manbalar bilan ishlash bo‘yicha amaliy mashg‘ulotlar',
      detectiveTitle: 'Tarixiy detektiv',
      detectiveDesc: 'Birlamchi manba matnini o‘rganib, kim yozgani va asl maqsadini dalillar bilan toping.',
      causeEffectTitle: 'Sabab yoki oqibat?',
      causeEffectDesc: 'Voqealarni mantiqiy sabablar, jarayonlar va tarixiy oqibatlarga ajrating.',
      chronologyTitle: 'Sana va voqea mosligi',
      chronologyDesc: 'Tarixiy voqealarni yillari bilan to‘g‘ri bog‘lang.',
      glossaryTitle: 'Tarixiy atamalar lug‘ati',
      glossaryDesc: 'Xoqon, Yabg‘u, Shad, Tudun va Tszesidushi kabi unvonlar tahlili.',
      personsTitle: 'Tarixiy shaxslar portretlari',
      personsDesc: 'Bumin, Istami, Bilga xoqon, Li Shimin (Taizong), U Zetyan va To‘nyuquq biografiyalari.',
      dailyQuestionTitle: 'Kun savoli',
    },
    ai: {
      title: 'Tarixchi — Virtual ilmiy maslahatchi',
      badge: 'Akademik manbalar asosida',
      disclaimer: 'Ushbu assistent javoblari platformaning tasdiqlangan ilmiy bazasiga tayanadi.',
      placeholder: 'Turk xoqonligi va Tan imperiyasi bo‘yicha savolingizni yozing...',
      suggestedQuestions: [
        'Turk xoqonligida «El» va «Törü» tushunchasi nimani anglatgan?',
        'Tan imperatori Taizong nima sababdan o‘zini «Tian Kehan» deb e’lon qildi?',
        'Sharqiy va G‘arbiy Turk xoqonliklarining iqtisodiy asoslari qanday farqlangan?',
        'An Lushan qo‘zg‘olonida so‘g‘d savdogarlarining roli qanday bo‘lgan?',
      ],
      send: 'Yuborish',
      thinking: 'Tarixiy manbalar tekshirilmoqda...',
      sourceGrounded: 'Asoslangan manbalar',
    },
    admin: {
      title: 'Administrator va o‘qituvchi boshqaruvi',
      subtitle: 'Kontent tahriri, test savollari va to‘rtta til bo‘yicha to‘liqlik nazorati',
      contentManagement: 'Maqolalar boshqaruvi',
      translationCoverage: 'Tarjimalar holati',
      quizManagement: 'Savollar banki',
      publishedStatus: 'Holati',
      draft: 'Qoralama',
      published: 'E’lon qilingan',
      actions: 'Amallar',
      edit: 'Tahrirlash',
      delete: 'O‘chirish',
      save: 'Saqlash',
    },
    footer: {
      copyright: '© 2026 Tarix Platformasi. Barcha huquqlar himoyalangan.',
      motto: 'O‘tmishni anglash — kelajakni qurish.',
      aboutText: 'Turk xoqonligi va Tan sulolasi o‘rtasidagi siyosiy, iqtisodiy va madaniy aloqalarni o‘rganuvchi akademik loyiha.',
      academicPartners: 'O‘zbekiston, Markaziy Osiyo va Xalqaro turkologiya hamda sinologiya ilmiy tadqiqotlari asosida.',
    },
  },

  'uz-Cyrl': {
    brandName: 'Тарих',
    tagline: 'Ўтмишни англаш — келажакни қуриш',
    subTagline: 'Турк хоқонлиги ва Тан империяси тарихига бағишланган илмий-интерактив таълим платформаси',
    nav: {
      home: 'Бош саҳифа',
      turk: 'Турк хоқонлиги',
      tang: 'Тан империяси',
      compare: 'Таққослаш',
      timeline: 'Вақт чизиғи',
      map: 'Интерактив харита',
      quiz: 'Тестлар',
      sources: 'Манбалар',
      interactive: 'Ижодий хона',
      dashboard: 'Менинг кабинетим',
      admin: 'Бошқарув',
    },
    actions: {
      startLearning: 'Ўрганишни бошлаш',
      testKnowledge: 'Билимингизни синанг',
      readArticle: 'Мавзуни тўлиқ ўқиш',
      viewSource: 'Асл манбани кўриш',
      filter: 'Филтрлаш',
      all: 'Барчаси',
      searchPlaceholder: 'Мавзулар, шахслар, саналар ёки атамаларни қидиринг...',
      searchShortcut: 'Қидирув (Ctrl+K)',
      clearFilters: 'Филтрларни тозалаш',
      backToList: 'Рўйхатга қайтиш',
      markAsCompleted: 'Ўрганилди деб белгилаш',
      completed: 'Ўзлаштирилган',
      bookmark: 'Сақлаб қўйиш',
      bookmarked: 'Сақланган',
      next: 'Кейингиси',
      prev: 'Олдингиси',
      submit: 'Тасдиқлаш',
      retake: 'Қайта топшириш',
      exportResult: 'Натижани юклаб олиш',
      printCertificate: 'Натижани чоп этиш',
      askHistorian: 'Тарихчидан сўраш',
      openInMap: 'Харитада очиш',
      close: 'Ёпиш',
    },
    filters: {
      allStates: 'Барча давлатлар',
      turkKhaganate: 'Турк хоқонлиги',
      tangDynasty: 'Тан империяси',
      diplomacySilkRoad: 'Дипломатия ва Ипак йўли',
      difficulty: 'Қийинлик даражаси',
      allDifficulties: 'Барча даражалар',
      beginner: 'Бошланғич',
      intermediate: 'Ўрта',
      advanced: 'Академик (Юқори)',
      period: 'Давр',
    },
    home: {
      heroTitle: 'Ўтмишни англаш — келажакни қуриш',
      heroSubtitle: 'Евроосиё даштлари ва Шарқий Осиё тамаддунининг 350 йиллик тўқнашув, дипломатия ва Буюк Ипак йўли савдо интеграцияси тарихи.',
      featuredThemesTitle: 'Асосий ўқув мавзулари',
      featuredThemesSubtitle: 'Турк давлатчилиги, Тан бошқаруви ва Буюк Ипак йўли чорраҳасидаги тарихий воқеликлар',
      comparisonPreviewTitle: 'Кўчманчи салтанат ва Бюрократик империя',
      comparisonPreviewSubtitle: 'Ижтимоий тузилма, ҳарбий қудрат ва легитимлик асосларини 14 та илмий мезон бўйича таққосланг',
      timelinePreviewTitle: 'Асосий хронологик босқичлар (552–907)',
      mapPreviewTitle: 'Евроосиё тарихий географияси',
      dailyGoalTitle: 'Бугунги кунлик ўқув мақсади',
      academicSourcesTitle: 'Бирламчи ва академик манбалар фонди',
      stats: {
        centuries: '355 йил',
        centuriesDesc: '552 йилдан 907 йилгача бўлган давр таҳлили',
        sources: '18 та бирламчи',
        sourcesDesc: 'Ўрхон битиклари ва Хитой сулолавий хроникалари',
        articles: '12 та мақола',
        articlesDesc: 'Академик талабларга мос мукаммал таҳлил',
        quizzes: '20+ савол',
        quizzesDesc: 'Сабаб-оқибат ва манба таҳлили тестлари',
      },
    },
    comparison: {
      title: 'Турк хоқонлиги ва Тан империясини таққослаш',
      subtitle: 'Номадизм ва ўтроқ цивилизациянинг ўзаро таъсири, сиёсий модели ҳамда халқаро дипломатияси',
      turkHeader: 'Турк хоқонлиги (552–744)',
      tangHeader: 'Тан империяси (618–907)',
      analyticalSynthesis: 'Тарихий хулоса ва синтез',
      selectCriterion: 'Таққослаш мезонини танланг',
    },
    timeline: {
      title: 'Хронологик вақт чизиғи (552–907)',
      subtitle: 'Сиёсий юксалиш, сулолавий инқирозлар ва халқаро иттифоқлар кетма-кетлиги',
      filterAll: 'Барча воқеалар',
      filterTurk: 'Турк хоқонлиги',
      filterTang: 'Тан империяси',
      filterBoth: 'Ўзаро муносабатлар',
      causeAndEffect: 'Сабаб ва оқибатлар',
      significance: 'Тарихий аҳамияти',
    },
    map: {
      title: 'Интерактив тарихий география',
      subtitle: 'Ўтукан, Чанган, Суёб ва Буюк Ипак йўлининг муҳим савдо-маданий марказлари',
      layers: 'Харита қатламлари',
      layerTurkicSphere: 'Турк хоқонлиги таъсир доираси',
      layerTangSphere: 'Тан империяси чегаралари',
      layerSilkRoad: 'Буюк Ипак йўли йўналишлари',
      layerCapitals: 'Пойтахтлар ва қароргоҳлар',
      layerMonuments: 'Битиктошлар ва қалъалар',
      eraSelector: 'Тарихий даврни танлаш',
      locationDetails: 'Марказ тавсифи',
      noLocationSelected: 'Хаританинг исталган белгисини босинг',
    },
    quiz: {
      title: 'Тестлар ва билимни баҳолаш',
      subtitle: 'Фақат ёдлаш эмас, балки сабаб-оқибат ва бирламчи манбаларни таҳлил қилиш имтиҳони',
      startQuiz: 'Тестни бошлаш',
      selectTopic: 'Мавзу бўйича саралаш',
      allTopics: 'Барча мавзулар бўйича (Аралаш)',
      questionOf: 'Савол',
      difficulty: 'Даражаси',
      correct: 'Тўғри жавоб!',
      incorrect: 'Нотўғри жавоб',
      explanation: 'Тарихий таҳлил ва далил',
      sourceReference: 'Фойдаланилган манба',
      finishQuiz: 'Тестни якунлаш',
      scoreSummary: 'Сизнинг натижангиз',
      recommendation: 'Тавсия этиладиган ўқишлар',
      weakAreasAnalysis: 'Такрорлаш лозим бўлган жиҳатлар',
    },
    dashboard: {
      title: 'Талаба ва тадқиқотчи кабинети',
      subtitle: 'Ўқув курси бўйича шахсий кўрсаткичлар ва эришилган натижалар',
      progressOverview: 'Умумий ўзлаштириш',
      articlesCompleted: 'Ўрганилган мақолалар',
      averageQuizScore: 'Ўртача тест балли',
      studyStreakDays: 'Кунлик ўқиш занжири',
      dailyTargetMinutes: 'Кунлик режа (дақиқа)',
      bookmarksList: 'Сақланган материаллар',
      noBookmarks: 'Ҳозирча сақланган мақола йўқ',
      recentActivity: 'Сўнгги фаолият',
      continueStudy: 'Ўқишда давом этиш',
      roleSelector: 'Фойдаланувчи роли',
      currentRole: 'Жорий рол',
    },
    sources: {
      title: 'Илмий ва тарихий манбалар кутубхонаси',
      subtitle: 'Бирламчи руник эпиграфика, сулолавий солномалар ва замонавий академик тадқиқотлар',
      primaryEpigraphy: 'Бирламчи руник ёзувлар',
      imperialAnnals: 'Сулолавий хроникалар ва археология',
      academicLiterature: 'Замонавий академик адабиётлар',
      verifiedAcademicRecord: 'Академик текширувдан ўтган',
      citationNotice: 'Тарихий таҳлилда манбага иқтибос келтириш қоидалари',
    },
    creative: {
      title: 'Интерактив тарих лабораторияси',
      subtitle: 'Таҳлилий фикрлаш ва манбалар билан ишлаш бўйича амалий машғулотлар',
      detectiveTitle: 'Тарихий детектив',
      detectiveDesc: 'Бирламчи манба матнини ўрганиб, ким ёзгани ва асл мақсадини далиллар билан топинг.',
      causeEffectTitle: 'Сабаб ёки оқибат?',
      causeEffectDesc: 'Воқеаларни мантиқий сабаблар, жараёнлар ва тарихий оқибатларга ажратинг.',
      chronologyTitle: 'Сана ва воқеа мослиги',
      chronologyDesc: 'Тарихий воқеаларни йиллари билан тўғри боғланг.',
      glossaryTitle: 'Тарихий атамалар луғати',
      glossaryDesc: 'Хоқон, Ябғу, Шад, Тудун ва Цзесидуши каби унвонлар таҳлили.',
      personsTitle: 'Тарихий шахслар портретлари',
      personsDesc: 'Бумин, Истами, Билга хоқон, Ли Шимин (Таизонг), У Зетьян ва Тўнюқуқ биографиялари.',
      dailyQuestionTitle: 'Кун саволи',
    },
    ai: {
      title: 'Тарихчи — Виртуал илмий маслаҳатчи',
      badge: 'Академик манбалар асосида',
      disclaimer: 'Ушбу ассистент жавоблари платформанинг тасдиқланган илмий базасига таянади.',
      placeholder: 'Турк хоқонлиги ва Тан империяси бўйича саволингизни ёзинг...',
      suggestedQuestions: [
        'Турк хоқонлигида «Эл» ва «Төрү» тушунчаси нимани англатган?',
        'Тан императори Таизонг нима сабабдан ўзини «Тиан Кеҳан» деб эълон қилди?',
        'Шарқий ва Ғарбий Турк хоқонликларининг иқтисодий асослари қандай фарқланган?',
        'Ан Лушан қўзғолонида сўғд савдогарларининг роли қандай бўлган?',
      ],
      send: 'Юбориш',
      thinking: 'Тарихий манбалар текширилмоқда...',
      sourceGrounded: 'Асосланган манбалар',
    },
    admin: {
      title: 'Администратор ва ўқитувчи бошқаруви',
      subtitle: 'Контент таҳрири, тест саволлари ва тўртта тил бўйича тўлиқлик назорати',
      contentManagement: 'Мақолалар бошқаруви',
      translationCoverage: 'Таржималар ҳолати',
      quizManagement: 'Саволлар банки',
      publishedStatus: 'Ҳолати',
      draft: 'Қоралама',
      published: 'Эълон қилинган',
      actions: 'Амаллар',
      edit: 'Таҳрирлаш',
      delete: 'Ўчириш',
      save: 'Сақлаш',
    },
    footer: {
      copyright: '© 2026 Тарих Платформаси. Барча ҳуқуқлар ҳимояланган.',
      motto: 'Ўтмишни англаш — келажакни қуриш.',
      aboutText: 'Турк хоқонлиги ва Тан сулоласи ўртасидаги сиёсий, иқтисодий ва маданий алоқаларни ўрганувчи академик лойиҳа.',
      academicPartners: 'Ўзбекистон, Марказий Осиё ва Халқаро туркология ҳамда синология илмий тадқиқотлари асосида.',
    },
  },

  ru: {
    brandName: 'Тарих',
    tagline: 'Понимание прошлого — созидание будущего',
    subTagline: 'Научно-образовательная платформа, посвященная истории Тюркского каганата и империи Тан',
    nav: {
      home: 'Главная',
      turk: 'Тюркский каганат',
      tang: 'Империя Тан',
      compare: 'Сравнение',
      timeline: 'Хронология',
      map: 'Карта',
      quiz: 'Тестирование',
      sources: 'Источники',
      interactive: 'Лаборатория',
      dashboard: 'Кабинет',
      admin: 'Управление',
    },
    actions: {
      startLearning: 'Начать обучение',
      testKnowledge: 'Проверить знания',
      readArticle: 'Читать исследование',
      viewSource: 'Смотреть источник',
      filter: 'Фильтр',
      all: 'Все',
      searchPlaceholder: 'Поиск тем, исторических деятелей, дат и понятий...',
      searchShortcut: 'Поиск (Ctrl+K)',
      clearFilters: 'Сбросить фильтры',
      backToList: 'Вернуться к каталогу',
      markAsCompleted: 'Отметить как изученное',
      completed: 'Изучено',
      bookmark: 'В закладки',
      bookmarked: 'В закладках',
      next: 'Вперед',
      prev: 'Назад',
      submit: 'Подтвердить',
      retake: 'Пройти снова',
      exportResult: 'Скачать результаты',
      printCertificate: 'Распечатать отчет',
      askHistorian: 'Спросить Историка',
      openInMap: 'Показать на карте',
      close: 'Закрыть',
    },
    filters: {
      allStates: 'Все государства',
      turkKhaganate: 'Тюркский каганат',
      tangDynasty: 'Империя Тан',
      diplomacySilkRoad: 'Дипломатия и Шелковый путь',
      difficulty: 'Сложность',
      allDifficulties: 'Любая сложность',
      beginner: 'Базовый',
      intermediate: 'Углубленный',
      advanced: 'Академический',
      period: 'Эпоха',
    },
    home: {
      heroTitle: 'Понимание прошлого — созидание будущего',
      heroSubtitle: '350 лет взаимодействия, военных походов, дипломатии и великой трансконтинентальной торговли между степями Евразии и империей Тан.',
      featuredThemesTitle: 'Ключевые темы курса',
      featuredThemesSubtitle: 'Тюркская государственность, административная модель Тан и Шелковый путь',
      comparisonPreviewTitle: 'Степная держава и Бюрократическая империя',
      comparisonPreviewSubtitle: 'Сравнительный анализ политической легитимности, армии и хозяйства по 14 академическим критериям',
      timelinePreviewTitle: 'Хронологическая лента (552–907 гг.)',
      mapPreviewTitle: 'Историческая география Евразии',
      dailyGoalTitle: 'Цель на сегодня',
      academicSourcesTitle: 'База первоисточников и научных трудов',
      stats: {
        centuries: '355 лет',
        centuriesDesc: 'Период исследования с 552 по 907 год',
        sources: '18 источников',
        sourcesDesc: 'Орхонские рунические стелы и хроники Тан',
        articles: '12 статей',
        articlesDesc: 'Университетский уровень исторического анализа',
        quizzes: '20+ вопросов',
        quizzesDesc: 'Оценка причинно-следственных связей',
      },
    },
    comparison: {
      title: 'Сравнительный анализ Тюркского каганата и империи Тан',
      subtitle: 'Диалог кочевой и оседлой цивилизаций: институты власти, армия, экономика и дипломатия',
      turkHeader: 'Тюркский каганат (552–744)',
      tangHeader: 'Империя Тан (618–907)',
      analyticalSynthesis: 'Историографический синтез',
      selectCriterion: 'Выберите критерий для сопоставления',
    },
    timeline: {
      title: 'Интерактивная хронология (552–907 гг.)',
      subtitle: 'Династические смены, военные кампании и межгосударственные союзы',
      filterAll: 'Все события',
      filterTurk: 'Тюркский каганат',
      filterTang: 'Империя Тан',
      filterBoth: 'Взаимоотношения',
      causeAndEffect: 'Причины и последствия',
      significance: 'Историческое значение',
    },
    map: {
      title: 'Историко-географический атлас',
      subtitle: 'Ставки каганов в Отюкене, Чанъань, Суяб и магистрали Шелкового пути',
      layers: 'Слои карты',
      layerTurkicSphere: 'Зона влияния Тюркского каганата',
      layerTangSphere: 'Границы империи Тан',
      layerSilkRoad: 'Маршруты Великого шелкового пути',
      layerCapitals: 'Столицы и ставки',
      layerMonuments: 'Памятники и городища',
      eraSelector: 'Выбор исторической эпохи',
      locationDetails: 'Описание объекта',
      noLocationSelected: 'Нажмите на маркер на карте для просмотра сведений',
    },
    quiz: {
      title: 'Тестирование и проверка компетенций',
      subtitle: 'Оценка критического анализа, работы с источниками и понимания исторических процессов',
      startQuiz: 'Начать тестирование',
      selectTopic: 'Выбор модуля',
      allTopics: 'Все темы (Комплексный тест)',
      questionOf: 'Вопрос',
      difficulty: 'Сложность',
      correct: 'Верно!',
      incorrect: 'Неверно',
      explanation: 'Историческое обоснование',
      sourceReference: 'Первоисточник',
      finishQuiz: 'Завершить тест',
      scoreSummary: 'Ваш результат',
      recommendation: 'Рекомендации по литературе',
      weakAreasAnalysis: 'Темы для повторения',
    },
    dashboard: {
      title: 'Кабинет студента и исследователя',
      subtitle: 'Академический прогресс, статистика тестов и личные закладки',
      progressOverview: 'Общий прогресс курса',
      articlesCompleted: 'Изучено материалов',
      averageQuizScore: 'Средний балл тестов',
      studyStreakDays: 'Дней непрерывного обучения',
      dailyTargetMinutes: 'Дневной лимит (мин)',
      bookmarksList: 'Сохраненные материалы',
      noBookmarks: 'Закладок пока нет',
      recentActivity: 'Недавняя активность',
      continueStudy: 'Продолжить изучение',
      roleSelector: 'Роль пользователя',
      currentRole: 'Текущая роль',
    },
    sources: {
      title: 'Библиотека первоисточников и научных трудов',
      subtitle: 'Древнетюркская руническая эпиграфика, китайские династийные хроники и научные исследования',
      primaryEpigraphy: 'Рунические надписи',
      imperialAnnals: 'Династийные хроники и археология',
      academicLiterature: 'Академическая монографическая литература',
      verifiedAcademicRecord: 'Верифицировано научным сообществом',
      citationNotice: 'Правила цитирования в научных работах',
    },
    creative: {
      title: 'Интерактивная историческая лаборатория',
      subtitle: 'Практикум критического мышления, атрибуции и работы с историческими источниками',
      detectiveTitle: 'Исторический детектив',
      detectiveDesc: 'Проанализируйте фрагмент летописи: определите автора, адресата и скрытый политический мотив.',
      causeEffectTitle: 'Причина или следствие?',
      causeEffectDesc: 'Классифицируйте исторические явления на исходные предпосылки и долгосрочные последствия.',
      chronologyTitle: 'Синхронизация дат и событий',
      chronologyDesc: 'Соотнесите ключевые вехи каганата и династии Тан во времени.',
      glossaryTitle: 'Терминологический словарь',
      glossaryDesc: 'Институты власти: Каган, Ябгу, Шад, Тудун, Цзедуши и др.',
      personsTitle: 'Галерея исторических деятелей',
      personsDesc: 'Бумын, Истеми, Бильге-каган, Кюль-тегин, Тай-цзун, У Цзэтянь и Тоньюкук.',
      dailyQuestionTitle: 'Вопрос дня',
    },
    ai: {
      title: 'Тарихчи — Виртуальный академический консультант',
      badge: 'На основе верифицированных источников',
      disclaimer: 'Ассистент отвечает строго в рамках подтвержденных историографических данных платформы.',
      placeholder: 'Задайте вопрос по истории Тюркского каганата и империи Тан...',
      suggestedQuestions: [
        'Что означали концепции «Эль» и «Тёрю» в древнетюркском государстве?',
        'Почему император Тай-цзун провозгласил себя «Тянь Кэханем»?',
        'В чем заключались различия экономики Восточного и Западного каганатов?',
        'Какую роль сыграли согдийские купцы в восстании Ань Лушаня?',
      ],
      send: 'Отправить',
      thinking: 'Анализ исторических источников...',
      sourceGrounded: 'Использованные источники',
    },
    admin: {
      title: 'Панель преподавателя и администратора',
      subtitle: 'Редактирование статей, بانک вопросов и мониторинг полноты переводов на 4 языка',
      contentManagement: 'Управление материалами',
      translationCoverage: 'Статус переводов',
      quizManagement: 'Банк вопросов',
      publishedStatus: 'Статус',
      draft: 'Черновик',
      published: 'Опубликовано',
      actions: 'Действия',
      edit: 'Редактировать',
      delete: 'Удалить',
      save: 'Сохранить',
    },
    footer: {
      copyright: '© 2026 Платформа Тарих. Все права защищены.',
      motto: 'Понимание прошлого — созидание будущего.',
      aboutText: 'Академический проект по исследованию политических, социально-экономических и культурных связей Тюркского каганата и династии Тан.',
      academicPartners: 'Разработано с учетом трудов ведущих центров тюркологии и синологии Узбекистана, Центральной Азии и мирового сообщества.',
    },
  },

  en: {
    brandName: 'Tarix',
    tagline: 'Understanding the past — building the future',
    subTagline: 'An academic interactive learning platform dedicated to the Turkic Khaganate and the Tang Dynasty',
    nav: {
      home: 'Home',
      turk: 'Turkic Khaganate',
      tang: 'Tang Dynasty',
      compare: 'Comparison',
      timeline: 'Timeline',
      map: 'Interactive Map',
      quiz: 'Assessment',
      sources: 'Sources',
      interactive: 'Lab',
      dashboard: 'My Study',
      admin: 'Admin',
    },
    actions: {
      startLearning: 'Start Learning',
      testKnowledge: 'Test Your Knowledge',
      readArticle: 'Read Full Study',
      viewSource: 'Examine Primary Source',
      filter: 'Filter',
      all: 'All',
      searchPlaceholder: 'Search topics, historical figures, dates or terms...',
      searchShortcut: 'Search (Ctrl+K)',
      clearFilters: 'Clear Filters',
      backToList: 'Back to Catalog',
      markAsCompleted: 'Mark as Completed',
      completed: 'Completed',
      bookmark: 'Bookmark',
      bookmarked: 'Bookmarked',
      next: 'Next',
      prev: 'Previous',
      submit: 'Submit Answer',
      retake: 'Retake Quiz',
      exportResult: 'Export Results',
      printCertificate: 'Print Summary',
      askHistorian: 'Ask the Historian',
      openInMap: 'View on Map',
      close: 'Close',
    },
    filters: {
      allStates: 'All States',
      turkKhaganate: 'Turkic Khaganate',
      tangDynasty: 'Tang Dynasty',
      diplomacySilkRoad: 'Diplomacy & Silk Road',
      difficulty: 'Difficulty',
      allDifficulties: 'All Levels',
      beginner: 'Introductory',
      intermediate: 'Intermediate',
      advanced: 'Academic (Advanced)',
      period: 'Era',
    },
    home: {
      heroTitle: 'Understanding the Past — Building the Future',
      heroSubtitle: '350 years of geopolitics, nomadic steppe statehood, Tang imperial governance, and Silk Road economic integration across Central and East Asia.',
      featuredThemesTitle: 'Curated Study Themes',
      featuredThemesSubtitle: 'Turkic statehood, Tang civil bureaucracy, and cross-continental Silk Road diplomacy',
      comparisonPreviewTitle: 'Nomadic Steppe Empire vs. Bureaucratic Empire',
      comparisonPreviewSubtitle: 'Compare institutional legitimacy, military logistics, and urban vs. nomadic economies across 14 scientific criteria',
      timelinePreviewTitle: 'Chronological Milestones (552–907 CE)',
      mapPreviewTitle: 'Historical Geography of Eurasia',
      dailyGoalTitle: 'Daily Learning Target',
      academicSourcesTitle: 'Primary Epigraphy & Academic Corpus',
      stats: {
        centuries: '355 Years',
        centuriesDesc: 'Comprehensive era analysis (552–907 CE)',
        sources: '18 Primary Sources',
        sourcesDesc: 'Orkhon inscriptions and Tang dynastic records',
        articles: '12 Studies',
        articlesDesc: 'Peer-reviewed academic rigor and structure',
        quizzes: '20+ Questions',
        quizzesDesc: 'Cause-effect & source criticism exercises',
      },
    },
    comparison: {
      title: 'Comparative Analysis: Turkic Khaganate & Tang Dynasty',
      subtitle: 'Dynamic interplay between pastoral nomads and agrarian civilization: governance, legitimacy, and diplomacy',
      turkHeader: 'Turkic Khaganate (552–744)',
      tangHeader: 'Tang Dynasty (618–907)',
      analyticalSynthesis: 'Historiographical Synthesis',
      selectCriterion: 'Select comparison criterion',
    },
    timeline: {
      title: 'Interactive Timeline (552–907 CE)',
      subtitle: 'Dynastic ascensions, geopolitical crises, and trans-Eurasian alliances',
      filterAll: 'All Events',
      filterTurk: 'Turkic Khaganate',
      filterTang: 'Tang Dynasty',
      filterBoth: 'Bilateral Relations',
      causeAndEffect: 'Causes & Consequences',
      significance: 'Historical Significance',
    },
    map: {
      title: 'Interactive Historical Geography',
      subtitle: 'Otuken, Chang’an, Suyab, and major Silk Road trading oasis networks',
      layers: 'Map Layers',
      layerTurkicSphere: 'Turkic Sphere of Influence',
      layerTangSphere: 'Tang Imperial Borders',
      layerSilkRoad: 'Great Silk Road Corridors',
      layerCapitals: 'Capitals & Royal Encampments',
      layerMonuments: 'Stele Monuments & Forts',
      eraSelector: 'Historical Epoch',
      locationDetails: 'Site Overview',
      noLocationSelected: 'Click any historical marker to inspect records',
    },
    quiz: {
      title: 'Assessments & Knowledge Verification',
      subtitle: 'Evaluate cause-effect deductions, historical context, and primary source critique',
      startQuiz: 'Start Quiz',
      selectTopic: 'Filter by Module',
      allTopics: 'Comprehensive Review (All Topics)',
      questionOf: 'Question',
      difficulty: 'Difficulty',
      correct: 'Correct Answer!',
      incorrect: 'Incorrect Answer',
      explanation: 'Historiographical Evidence',
      sourceReference: 'Primary Source Citation',
      finishQuiz: 'Complete Quiz',
      scoreSummary: 'Your Performance Score',
      recommendation: 'Suggested Further Reading',
      weakAreasAnalysis: 'Areas for Systematic Review',
    },
    dashboard: {
      title: 'Student & Researcher Dashboard',
      subtitle: 'Personal learning analytics, quiz mastery tracking, and research bookmarks',
      progressOverview: 'Curriculum Mastery',
      articlesCompleted: 'Studies Completed',
      averageQuizScore: 'Average Assessment Score',
      studyStreakDays: 'Consecutive Study Days',
      dailyTargetMinutes: 'Daily Goal (Minutes)',
      bookmarksList: 'Bookmarked Research',
      noBookmarks: 'No bookmarked studies yet',
      recentActivity: 'Recent Academic Activity',
      continueStudy: 'Continue Reading',
      roleSelector: 'Active Role Persona',
      currentRole: 'Current Role',
    },
    sources: {
      title: 'Corpus of Primary Sources & Academic Literature',
      subtitle: 'Old Turkic runic epigraphy, Tang dynastic annals, and modern critical editions',
      primaryEpigraphy: 'Primary Runic Epigraphy',
      imperialAnnals: 'Imperial Chronicles & Archaeology',
      academicLiterature: 'Modern Academic Monographic Literature',
      verifiedAcademicRecord: 'Peer-Verified Academic Record',
      citationNotice: 'Historiographical citation guidelines',
    },
    creative: {
      title: 'Interactive Historical Laboratory',
      subtitle: 'Hands-on historical methodology: source criticism, causal chains, and prosopography',
      detectiveTitle: 'Historical Detective',
      detectiveDesc: 'Analyze an authentic excerpt to deduce authorial perspective and unstated geopolitical intent.',
      causeEffectTitle: 'Cause or Consequence?',
      causeEffectDesc: 'Categorize historical milestones into structural causes, pivotal processes, and outcomes.',
      chronologyTitle: 'Chronological Synchronization',
      chronologyDesc: 'Match significant events to exact historical years across steppe and imperial realms.',
      glossaryTitle: 'Historical Terminology Glossary',
      glossaryDesc: 'Structural titles: Khagan, Yabgu, Shad, Tudun, Jiedushi, and imperial court offices.',
      personsTitle: 'Historical Prosopography Gallery',
      personsDesc: 'Biographical dossiers: Bumin, Istami, Bilga Khagan, Taizong, Wu Zetian, and Tonyukuk.',
      dailyQuestionTitle: 'Question of the Day',
    },
    ai: {
      title: 'Tarixchi — Virtual Academic Advisor',
      badge: 'Source-Grounded Model',
      disclaimer: 'This research assistant responds strictly using verified historiographical data from the platform.',
      placeholder: 'Ask an academic question regarding the Turkic Khaganates or the Tang Dynasty...',
      suggestedQuestions: [
        'What did the concepts of «El» and «Törü» embody in ancient Turkic society?',
        'Why did Emperor Taizong adopt the title «Tian Kehan» (Heavenly Khagan)?',
        'How did the economic underpinnings of the Western and Eastern Khaganates diverge?',
        'What role did Sogdian merchant networks play in the An Lushan rebellion?',
      ],
      send: 'Send',
      thinking: 'Consulting primary historical corpus...',
      sourceGrounded: 'Grounded in Sources',
    },
    admin: {
      title: 'Faculty & Administrative Console',
      subtitle: 'Curriculum authoring, question bank maintenance, and 4-locale translation audit',
      contentManagement: 'Article Corpus Management',
      translationCoverage: 'Translation Completeness Audit',
      quizManagement: 'Assessment Bank',
      publishedStatus: 'Status',
      draft: 'Draft',
      published: 'Published',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save Changes',
    },
    footer: {
      copyright: '© 2026 Tarix Platform. All academic rights reserved.',
      motto: 'Understanding the past — building the future.',
      aboutText: 'An academic digital initiative exploring political, socio-economic, and cultural relations between the Turkic Khaganates and the Tang Dynasty.',
      academicPartners: 'Constructed on authoritative Central Asian, Turkological, and Sinological scholarship.',
    },
  },
};
