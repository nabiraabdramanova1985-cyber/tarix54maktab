import { Locale, UserProgress, UserRole } from '../types';

const STORAGE_KEYS = {
  LOCALE: 'tarix_locale',
  THEME: 'tarix_theme',
  ROLE: 'tarix_role',
  PROGRESS: 'tarix_user_progress',
};

const DEFAULT_PROGRESS: UserProgress = {
  completedArticles: ['bumin-khagan-founding-552'],
  bookmarkedArticles: [],
  bookmarkedQuestions: [],
  quizScores: {
    'general-knowledge': { score: 4, total: 5, date: '2026-10-24' },
  },
  dailyStudyMinutes: 24,
  dailyGoalMinutes: 30,
  studyStreak: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export function getSavedLocale(): Locale {
  if (typeof window === 'undefined') return 'uz';
  const saved = localStorage.getItem(STORAGE_KEYS.LOCALE);
  if (saved === 'uz' || saved === 'uz-Cyrl' || saved === 'ru' || saved === 'en') {
    return saved;
  }
  return 'uz';
}

export function saveLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LOCALE, locale);
  }
}

export function getSavedTheme(): 'light' | 'dark' | 'system' {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'system';
}

export function saveTheme(theme: 'light' | 'dark' | 'system'): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
}

export function getSavedRole(): UserRole {
  if (typeof window === 'undefined') return 'student';
  const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
  if (saved === 'guest' || saved === 'student' || saved === 'teacher' || saved === 'admin') {
    return saved;
  }
  return 'student';
}

export function saveRole(role: UserRole): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }
}

export function getSavedProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }
}
