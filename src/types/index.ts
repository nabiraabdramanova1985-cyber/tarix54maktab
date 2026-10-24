export type Locale = 'uz' | 'uz-Cyrl' | 'ru' | 'en';

export type UserRole = 'guest' | 'student' | 'teacher' | 'admin';

export type StateDomain = 'turk' | 'tang' | 'both' | 'silk_road';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LocalizedString {
  uz: string;
  'uz-Cyrl': string;
  ru: string;
  en: string;
}

export interface LocalizedStringArray {
  uz: string[];
  'uz-Cyrl': string[];
  ru: string[];
  en: string[];
}

export interface Article {
  id: string;
  slug: string;
  state: StateDomain;
  category: 'founding' | 'governance' | 'military' | 'economy' | 'diplomacy' | 'culture' | 'decline';
  difficulty: Difficulty;
  readingMinutes: number;
  period: string; // e.g., "552–603 CE"
  imageUrl: string;
  imageCaption: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
  content: LocalizedString;
  keyConcepts: LocalizedStringArray;
  keyPersons: string[]; // Person IDs
  causes: LocalizedStringArray;
  consequences: LocalizedStringArray;
  reflectionQuestions: LocalizedStringArray;
  sourceIds: string[];
  isPublished: boolean;
  author: string;
  lastUpdated: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  yearDisplay: string;
  state: StateDomain;
  title: LocalizedString;
  description: LocalizedString;
  historicalSignificance: LocalizedString;
  causes: LocalizedString;
  consequences: LocalizedString;
  personIds: string[];
  sourceId?: string;
  mapLocationId?: string;
}

export interface HistoricalPerson {
  id: string;
  name: LocalizedString;
  nativeTitle: string;
  state: 'turk' | 'tang';
  years: string;
  roleTitle: LocalizedString;
  summary: LocalizedString;
  biography: LocalizedString;
  majorAccomplishments: LocalizedStringArray;
  quote?: LocalizedString;
  quoteSource?: string;
  imageUrl?: string;
  sources: string[];
}

export interface ComparisonCriterion {
  id: string;
  category: LocalizedString;
  title: LocalizedString;
  turkicAspect: LocalizedString;
  tangAspect: LocalizedString;
  analyticalInsight: LocalizedString;
  sources: string[];
}

export interface MapLocation {
  id: string;
  name: LocalizedString;
  state: StateDomain;
  category: 'capital' | 'oasis' | 'battle' | 'monument' | 'pass';
  x: number; // Percentage on historical canvas map 0..100
  y: number; // Percentage on historical canvas map 0..100
  period: string;
  description: LocalizedString;
  historicalSignificance: LocalizedString;
}

export interface HistoricalSource {
  id: string;
  title: LocalizedString;
  originalLanguage: string;
  authorOrCreator: string;
  dateOrCentury: string;
  type: 'primary_inscription' | 'imperial_annal' | 'diplomatic_letter' | 'academic_treatise';
  summary: LocalizedString;
  keyExcerpt: LocalizedString;
  scientificContext: LocalizedString;
  citation: string;
  verified: boolean;
}

export interface GlossaryTerm {
  id: string;
  term: LocalizedString;
  transliteration?: string;
  originalScript?: string; // e.g. Runic or Chinese characters
  domain: StateDomain;
  definition: LocalizedString;
  historicalContext: LocalizedString;
  etymology: LocalizedString;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  question: LocalizedString;
  options: LocalizedStringArray;
  correctAnswerIndex: number;
  explanation: LocalizedString;
  difficulty: Difficulty;
  skillTested: 'chronology' | 'cause_effect' | 'source_analysis' | 'comparative_synthesis';
  sourceCitation?: string;
}

export interface UserProgress {
  completedArticles: string[];
  bookmarkedArticles: string[];
  bookmarkedQuestions: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  dailyStudyMinutes: number;
  dailyGoalMinutes: number;
  studyStreak: number;
  lastActiveDate: string;
}
