"use client";

import { OptionCard } from "@/components/design/OptionCard";
import { StepHeading, StepHint } from "@/components/design/Typography";
import type { AgeGroup } from "@/types/recommendation";

interface StepAgeGroupProps {
  value?: AgeGroup;
  onChange: (value: AgeGroup) => void;
}

const OPTIONS: { id: AgeGroup; label: string; emoji: string; description: string }[] = [
  { id: "under-18", label: "Under 18", emoji: "🧒", description: "Kids & teens" },
  { id: "18-25", label: "18 – 25", emoji: "🧑", description: "Young adults" },
  { id: "26-40", label: "26 – 40", emoji: "👩", description: "Adults" },
  { id: "40+", label: "40+", emoji: "👴", description: "Middle-aged & beyond" },
];

export function StepAgeGroup({ value, onChange }: StepAgeGroupProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <StepHeading>How old are they?</StepHeading>
        <StepHint>Roughly is fine — helps us suggest age-appropriate gifts.</StepHint>
      </div>
      <div role="radiogroup" aria-label="Age group" className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            id={`age-${opt.id}`}
            label={opt.label}
            emoji={opt.emoji}
            description={opt.description}
            selected={value === opt.id}
            onClick={() => onChange(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
