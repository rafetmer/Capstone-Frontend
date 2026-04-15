"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GiftCard } from "@/components/design/GiftCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PageTitle, Caption, Body } from "@/components/design/Typography";
import type { GiftItem, RecommendationResult, WizardSubmission } from "@/types/recommendation";

const RECIPIENT_Q_ID = "kime_hediye_alıyorsun";
const OCCASION_Q_ID  = "bu_hediyeyi_hangi_özel_durum_için_alıyorsun";
const BUDGET_Q_ID    = "bütçe_aralığın_nedir";
const SAVED_KEY      = "gift_recommender_saved";

function stripAlgorithm(s: string) {
  return s.replace(/\s*\(Algoritma[\s\S]*?\)/gi, "").trim();
}

function loadSaved(): Set<string> {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}

function persistSaved(ids: Set<string>) {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify([...ids])); } catch { /* noop */ }
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult]         = useState<RecommendationResult | null>(null);
  const [submission, setSubmission] = useState<WizardSubmission | null>(null);
  const [savedIds, setSavedIds]     = useState<Set<string>>(new Set());
  const [hydrated, setHydrated]     = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const raw      = sessionStorage.getItem("gift_recommender_results");
    const rawInput = sessionStorage.getItem("gift_recommender_input");
    if (!raw) { router.replace("/"); return; }
    setResult(JSON.parse(raw));
    if (rawInput) setSubmission(JSON.parse(rawInput));
    setSavedIds(loadSaved());
    setHydrated(true);
  }, [router]);

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      persistSaved(next);
      // Show toast briefly
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2000);
      return next;
    });
  }

  if (!hydrated) {
    return (
      <main className="min-h-dvh">
        <div className="mx-auto max-w-5xl px-4 pt-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const items: GiftItem[] = result?.items ?? [];
  const answers = submission?.answers ?? {};

  // Show raw answer text (e.g. "Kardeş") not parsed English values
  const recipient   = answers[RECIPIENT_Q_ID] as string | undefined;
  const occasion    = answers[OCCASION_Q_ID]  as string | undefined;
  // Budget: show the original answer label, not the parsed number
  const budgetRaw   = answers[BUDGET_Q_ID]    as string | undefined;
  const budgetLabel = budgetRaw ? stripAlgorithm(budgetRaw) : undefined;

  return (
    <main className="min-h-dvh bg-background">
      {/* ── Sticky header ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <PageTitle>Senin için en iyi hediyeler 🎁</PageTitle>
            {(recipient || budgetLabel) && (
              <Caption className="mt-0.5 block">
                {[
                  recipient    ? stripAlgorithm(recipient)  : null,
                  occasion     ? stripAlgorithm(occasion)   : null,
                  budgetLabel,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </Caption>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {savedIds.size > 0 && (
              <span className="text-xs text-muted-foreground font-medium">
                {savedIds.size} kaydedildi 🔖
              </span>
            )}
            <Link
              id="results-start-over-btn"
              href="/wizard"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted active:scale-95"
            >
              Yeniden Başla
            </Link>
          </div>
        </div>
      </div>

      {/* ── Cards grid ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="text-5xl">😕</span>
            <div>
              <Body size="sm" className="font-semibold">Hediye bulunamadı</Body>
              <Body size="sm" muted className="mt-1">
                Bütçeni veya ilgi alanlarını değiştirerek tekrar dene.
              </Body>
            </div>
            <Link
              href="/wizard"
              className="mt-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
            >
              Tekrar Dene
            </Link>
          </div>
        ) : (
          <>
            <Caption className="mb-3">{items.length} kişiselleştirilmiş öneri</Caption>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {items.map((item, i) => (
                <GiftCard
                  key={item.id}
                  item={item}
                  rank={i + 1}
                  onSave={toggleSave}
                  saved={savedIds.has(item.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Save toast */}
      {savedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card px-5 py-2.5 shadow-lg animate-fade-up"
        >
          <Caption muted={false} className="font-semibold text-foreground whitespace-nowrap">
            Tarayıcıya kaydedildi 🔖
          </Caption>
        </div>
      )}
    </main>
  );
}
