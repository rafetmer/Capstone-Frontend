"use client";

import { OptionCard } from "@/components/design/OptionCard";
import { StepHeading, StepHint } from "@/components/design/Typography";
import type { Occasion } from "@/types/recommendation";

interface StepOccasionProps {
  value?: Occasion;
  onChange: (value: Occasion) => void;
}

const OPTIONS: { id: Occasion; label: string; emoji: string }[] = [
  { id: "birthday", label: "Birthday", emoji: "🎂" },
  { id: "anniversary", label: "Anniversary", emoji: "💍" },
  { id: "graduation", label: "Graduation", emoji: "🎓" },
  { id: "just-because", label: "Just Because", emoji: "🌸" },
  { id: "holiday", label: "Holiday", emoji: "✈️" },
  { id: "wedding", label: "Wedding", emoji: "💐" },
];

export function StepOccasion({ value, onChange }: StepOccasionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <StepHeading>What&apos;s the occasion?</StepHeading>
        <StepHint>This helps us match the right vibe.</StepHint>
      </div>
      <div role="radiogroup" aria-label="Occasion" className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            id={`occasion-${opt.id}`}
            label={opt.label}
            emoji={opt.emoji}
            selected={value === opt.id}
            onClick={() => onChange(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
