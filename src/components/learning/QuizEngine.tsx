import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Locale, Difficulty } from '../../types';
import { DICTIONARIES } from '../../lib/i18n';
import { QUIZ_QUESTIONS } from '../../data/quiz';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  Bookmark, 
  ArrowRight, 
  ArrowLeft,
  BookOpen,
  Filter,
  Check
} from 'lucide-react';

interface QuizEngineProps {
  currentLocale: Locale;
  onSaveScore: (topicId: string, score: number, total: number) => void;
  bookmarkedQuestionIds: string[];
  onToggleBookmarkQuestion: (id: string) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  currentLocale,
  onSaveScore,
  bookmarkedQuestionIds,
  onToggleBookmarkQuestion,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const t = DICTIONARIES[currentLocale];

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (selectedDifficulty === 'all') return true;
    return q.difficulty === selectedDifficulty;
  });

  const currentQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];
  const isLastQuestion = currentQuestionIndex === filteredQuestions.length - 1;

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedAnswerIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate total score
      let score = 0;
      filteredQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctAnswerIndex) {
          score += 1;
        }
      });
      setIsQuizFinished(true);
      onSaveScore('comprehensive-test', score, filteredQuestions.length);

      if (score / filteredQuestions.length >= 0.75) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswerIndex(userAnswers[currentQuestionIndex + 1] ?? null);
      setIsAnswerSubmitted(userAnswers[currentQuestionIndex + 1] !== undefined);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      setSelectedAnswerIndex(userAnswers[prevIdx] ?? null);
      setIsAnswerSubmitted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsQuizFinished(false);
  };

  // Score Calculations
  const correctCount = Object.entries(userAnswers).filter(
    ([idx, ans]) => filteredQuestions[Number(idx)]?.correctAnswerIndex === ans
  ).length;

  const scorePercentage = Math.round((correctCount / filteredQuestions.length) * 100);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-[#718080] dark:text-[#859896] mb-2">
            <span className="font-semibold uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77]">
              Bilimni Baholash Tizimi
            </span>
            <span aria-hidden="true">·</span>
            <span>Universitet darajasidagi tahlil</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1]">
            {t.quiz.title}
          </h2>
          <p className="text-sm text-[#526367] dark:text-[#B6C4C2] mt-1 max-w-2xl leading-relaxed">
            {t.quiz.subtitle}
          </p>
        </div>

        {!isQuizFinished ? (
          <div>
            {/* Filter toolbar & Progress bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Difficulty selector buttons */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#718080] mr-1 shrink-0">
                  Daraja:
                </span>
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      setSelectedDifficulty(diff);
                      handleRestart();
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer border ${
                      selectedDifficulty === diff
                        ? 'bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] border-transparent font-semibold shadow-xs'
                        : 'bg-stone-50 dark:bg-[#203238] border-[#E1E6E1] dark:border-[#314348] text-[#526367] dark:text-[#B6C4C2]'
                    }`}
                  >
                    {diff === 'all' ? t.actions.all : diff === 'beginner' ? t.filters.beginner : diff === 'intermediate' ? t.filters.intermediate : t.filters.advanced}
                  </button>
                ))}
              </div>

              {/* Progress counter */}
              <div className="flex items-center gap-3 shrink-0 text-xs text-[#718080] dark:text-[#859896] font-mono tabular-nums">
                <span>
                  {t.quiz.questionOf} {currentQuestionIndex + 1} / {filteredQuestions.length}
                </span>
                <button
                  onClick={() => onToggleBookmarkQuestion(currentQ.id)}
                  className={`p-1.5 rounded-lg border border-[#E1E6E1] dark:border-[#314348] cursor-pointer ${
                    bookmarkedQuestionIds.includes(currentQ.id)
                      ? 'text-[#B88954] dark:text-[#D6AB77] bg-[#B88954]/10'
                      : 'text-[#718080] hover:text-[#17323B]'
                  }`}
                  title="Savolga belgi qo‘yish"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarkedQuestionIds.includes(currentQ.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#B88954] dark:text-[#D6AB77] font-semibold">
                  Mavzu: {currentQ.topicId.replace(/-/g, ' ')}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-[#203238] text-[#718080] dark:text-[#859896] capitalize border border-[#E1E6E1] dark:border-[#314348]">
                  {currentQ.difficulty}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] leading-snug mb-6">
                {currentQ.question[currentLocale]}
              </h3>

              {/* Options List */}
              <div className="space-y-3 mb-6">
                {currentQ.options[currentLocale].map((option, idx) => {
                  const isSelected = selectedAnswerIndex === idx;
                  const isCorrect = idx === currentQ.correctAnswerIndex;
                  let optionClass = 'border-[#E1E6E1] dark:border-[#314348] hover:bg-stone-50 dark:hover:bg-[#203238] text-[#17323B] dark:text-[#F1F4F1]';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                    } else if (isSelected) {
                      optionClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-semibold';
                    } else {
                      optionClass = 'opacity-40 border-[#E1E6E1] dark:border-[#314348] text-[#718080]';
                    }
                  } else if (isSelected) {
                    optionClass = 'border-[#17323B] dark:border-[#D6AB77] bg-[#E6F0EB] dark:bg-[#203238] font-semibold text-[#17323B] dark:text-[#F1F4F1]';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${optionClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] flex items-center justify-center font-mono text-xs shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                      {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Box */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-xs text-[#526367] dark:text-[#B6C4C2] space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-semibold">
                    {selectedAnswerIndex === currentQ.correctAnswerIndex ? (
                      <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        {t.quiz.correct}
                      </span>
                    ) : (
                      <span className="text-rose-700 dark:text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        {t.quiz.incorrect}
                      </span>
                    )}
                  </div>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1]">{t.quiz.explanation}:</span> {currentQ.explanation[currentLocale]}
                  </p>
                  {currentQ.sourceCitation && (
                    <p className="text-[10px] text-[#718080] dark:text-[#859896] font-mono pt-1">
                      {t.quiz.sourceReference}: {currentQ.sourceCitation}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Footer Toolbar */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-xl border border-[#E1E6E1] dark:border-[#314348] bg-white dark:bg-[#18262B] text-[#526367] dark:text-[#B6C4C2] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.actions.prev}</span>
              </button>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswerIndex === null}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-xl bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm hover:bg-[#14515A]"
                >
                  <span>{t.actions.submit}</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-xl bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] cursor-pointer shadow-sm hover:bg-[#14515A]"
                >
                  <span>{isLastQuestion ? t.quiz.finishQuiz : t.actions.next}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Quiz Performance Summary Card */
          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#18262B] border border-[#E1E6E1] dark:border-[#314348] shadow-md text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#E6F0EB] dark:bg-[#203238] flex items-center justify-center text-[#B88954] dark:text-[#D6AB77] mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-editorial font-bold text-[#17323B] dark:text-[#F1F4F1] mb-1">
              {t.quiz.scoreSummary}
            </h3>

            <div className="my-6">
              <span className="text-5xl font-editorial font-extrabold text-[#17323B] dark:text-[#D6AB77] tabular-nums">
                {scorePercentage}%
              </span>
              <p className="text-xs text-[#718080] dark:text-[#859896] mt-1">
                {correctCount} / {filteredQuestions.length} to‘g‘ri javob
              </p>
            </div>

            {/* Performance analysis & feedback */}
            <div className="p-5 rounded-xl bg-[#F7F6F1] dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-xs text-[#526367] dark:text-[#B6C4C2] max-w-lg mx-auto mb-8 text-left">
              <span className="font-semibold text-[#17323B] dark:text-[#F1F4F1] block mb-1">
                {t.quiz.recommendation}:
              </span>
              <p className="leading-relaxed">
                {scorePercentage >= 80
                  ? 'A’lo natija! Siz Turk xoqonligi va Tan imperiyasi tarixiy davrlari, boshqaruv tizimi va xalqaro munosabatlarini chuqur o‘zlashtirgansiz.'
                  : scorePercentage >= 50
                  ? 'Yaxshi natija. Biroq Orxon bitiklaridagi asosiy xulosalar va An Lushan qo‘zg‘oloni oqibatlarini qayta takrorlash tavsiya etiladi.'
                  : 'Asosiy tushunchalar va xronologik vaqt chizig‘ini qaytadan o‘rganib chiqish lozim.'}
              </p>
            </div>

            {/* Actions: Retake or Print */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17323B] dark:bg-[#D6AB77] text-white dark:text-[#10191D] text-xs font-semibold hover:bg-[#14515A] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.actions.retake}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#203238] border border-[#E1E6E1] dark:border-[#314348] text-[#17323B] dark:text-[#F1F4F1] text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{t.actions.printCertificate}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
