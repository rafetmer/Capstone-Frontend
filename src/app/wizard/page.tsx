"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchQuestions, getRecommendations, parseBudgetMax } from "@/lib/api";
import { StepQuestion } from "@/components/design/StepQuestion";
import { ProgressBar } from "@/components/design/ProgressBar";
import { AnimatedContainer } from "@/components/design/AnimatedContainer";
import { Body } from "@/components/design/Typography";
import type { Question, WizardAnswers, WizardSubmission } from "@/types/recommendation";

// Budget question ID from backend
const BUDGET_Q_ID = "bütçe_aralığın_nedir";
// Multi-select question ID
const MULTI_Q_ID = "temel_ilgi_alanları_neler";

/** Turkish step subtitle shown below the question title */
function stepSubtitle(question: Question): string {
  if (MULTI_Q_ID === question.id) return "Birden fazla seçebilirsin";
  if (question.id === "temel_ilgi_alanları_neler") return "Birden fazla seçebilirsin";
  return "Bir seçenek seç";
}

/** Is the current step filled in? */
function isValid(question: Question, value: string | string[] | undefined): boolean {
  if (!value) return false;
  if (Array.isArray(value)) return value.length > 0;
  return value.trim().length > 0;
}

export default function WizardPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load questions from backend on mount
  useEffect(() => {
    fetchQuestions()
      .then((qs) => {
        if (qs.length === 0) throw new Error("Sorular yüklenemedi.");
        setQuestions(qs);
      })
      .catch((e) => setQuestionsError(e.message ?? "Bir hata oluştu."))
      .finally(() => setLoadingQuestions(false));
  }, []);

  const currentQuestion = questions[step];
  const currentValue = currentQuestion ? answers[currentQuestion.id] ?? "" : "";
  const stepValid = currentQuestion ? isValid(currentQuestion, currentValue) : false;
  const isLastStep = step === questions.length - 1;

  function setAnswer(value: string | string[]) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }

  function goBack() {
    if (step === 0) { router.push("/"); return; }
    setDirection("back");
    setStep((s) => s - 1);
  }

  const submit = useCallback(async () => {
    setSubmitting(true);
    setError(null);
    try {
      // Extract numeric budget from the budget bracket answer
      const budgetAnswer = answers[BUDGET_Q_ID] as string | undefined;
      const budget = budgetAnswer ? parseBudgetMax(budgetAnswer) : undefined;

      const submission: WizardSubmission = { answers, budget };

      // Persist input for results page summary
      sessionStorage.setItem("gift_recommender_input", JSON.stringify(submission));

      const result = await getRecommendations(submission);
      sessionStorage.setItem("gift_recommender_results", JSON.stringify(result));
      router.push("/results");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Bir hata oluştu. Lütfen tekrar deneyin.");
      setSubmitting(false);
    }
  }, [answers, router]);

  function goNext() {
    if (!stepValid) return;
    if (isLastStep) { submit(); return; }
    setDirection("forward");
    setStep((s) => s + 1);
  }

  // ─── Loading state ────────────────────────────────────────────────────────

  if (loadingQuestions) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-5">
        <div className="flex flex-col items-center gap-3 text-center animate-fade-up">
          <span className="text-4xl animate-bounce">🎁</span>
          <Body size="sm" muted>Sorular yükleniyor...</Body>
        </div>
      </main>
    );
  }

  if (questionsError) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-5 text-center">
        <span className="text-4xl">😕</span>
        <Body size="sm" muted>{questionsError}</Body>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          Tekrar Dene
        </button>
      </main>
    );
  }

  // ─── Submitting overlay ───────────────────────────────────────────────────

  if (submitting) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5">
        <div className="flex flex-col items-center gap-4 text-center animate-fade-up">
          <span className="text-6xl animate-bounce">🎁</span>
          <div>
            <p className="text-lg font-bold text-foreground">En iyi hediyeler aranıyor...</p>
            <p className="mt-1 text-sm text-muted-foreground">Cevapların katalogumuzla eşleştiriliyor</p>
          </div>
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: `${i * 160}ms` }}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ─── Wizard step ──────────────────────────────────────────────────────────

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Fixed header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-2xl px-5 pt-4 pb-3">
          {/* Back + progress */}
          <div className="flex items-center gap-3 mb-2">
            <button
              id="wizard-back-btn"
              type="button"
              onClick={goBack}
              aria-label="Geri"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors active:scale-90"
            >
              ←
            </button>
            <div className="flex-1">
              <ProgressBar currentStep={step + 1} totalSteps={questions.length} />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
              {step + 1} / {questions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="mx-auto max-w-2xl px-5 pt-6">
          <AnimatedContainer key={`${step}-${direction}`} className="flex flex-col gap-5">
            {/* Title + subtitle */}
            <div>
              <h1 className="text-xl font-bold text-foreground leading-snug">
                {currentQuestion.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {stepSubtitle(currentQuestion)}
              </p>
            </div>

            {/* Options */}
            <StepQuestion
              question={currentQuestion}
              value={currentValue}
              onChange={setAnswer}
            />
          </AnimatedContainer>
        </div>
      </div>

      {/* Sticky footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="mx-auto max-w-2xl px-5 py-4 flex flex-col gap-2">
          {error && (
            <p className="text-center text-sm text-destructive">{error}</p>
          )}
          <button
            id="wizard-next-btn"
            type="button"
            onClick={goNext}
            disabled={!stepValid}
            className={[
              "w-full rounded-2xl py-4 text-sm font-bold transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]",
              stepValid
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            ].join(" ")}
          >
            {isLastStep ? "Hediyeleri Bul 🎁" : "Devam et →"}
          </button>
        </div>
      </div>
    </main>
  );
}
