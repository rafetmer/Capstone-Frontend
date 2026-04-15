import Link from "next/link";
import type { Metadata } from "next";
import { AppTitle, Body, Caption } from "@/components/design/Typography";

export const metadata: Metadata = {
  title: "Hediye Öneri — Mükemmel Hediyeyi Bul",
  description:
    "14 kısa soruyu yanıtla, yapay zeka sevdiklerine özel hediyeler önersin.",
};

const FEATURES = [
  { icon: "⚡", label: "60 saniye sürer" },
  { icon: "🎯", label: "Kişiselleştirilmiş öneriler" },
  { icon: "🤖", label: "Yapay zeka açıklamaları" },
] as const;

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16">
      {/* Ambient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.65 0.22 280), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.65 0.22 50), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 h-[240px] w-[240px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.65 0.22 160), transparent 70%)" }}
        />
      </div>

      <div className="flex w-full max-w-sm flex-col items-center gap-10 text-center animate-fade-up">
        {/* Logo */}
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-5xl shadow-sm ring-1 ring-primary/20">
            🎁
          </div>
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            AI
          </span>
        </div>

        {/* Copy */}
        <div className="space-y-4">
          <AppTitle>Hediye Öneri</AppTitle>
          <Body size="lg" muted className="leading-relaxed">
            14 kısa soruyu yanıtla,{" "}
            <span className="font-semibold text-foreground">yapay zekâ</span>{" "}
            sevdiklerine özel hediyeleri bulsun. Trendyol'dan anında sipariş.
          </Body>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2" aria-label="Özellikler">
          {FEATURES.map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground"
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full space-y-3">
          <Link
            id="start-recommendation-btn"
            href="/wizard"
            className="block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:opacity-90 hover:shadow-xl active:scale-[0.98]"
          >
            Hediye Bul →
          </Link>
          <Caption>Hesap gerekmez · Verileriniz saklanmaz</Caption>
        </div>
      </div>
    </main>
  );
}
