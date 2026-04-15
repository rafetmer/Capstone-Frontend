"use client";

import { OptionCard } from "@/components/design/OptionCard";
import { StepHeading, StepHint } from "@/components/design/Typography";
import type { RecipientType } from "@/types/recommendation";

interface StepRecipientProps {
  value?: RecipientType;
  onChange: (value: RecipientType) => void;
}

const OPTIONS: { id: RecipientType; label: string; emoji: string; description: string }[] = [
  { id: "friend", label: "Friend", emoji: "👫", description: "BFF, colleague, or acquaintance" },
  { id: "partner", label: "Partner", emoji: "❤️", description: "Significant other or spouse" },
  { id: "family", label: "Family", emoji: "👨‍👩‍👧", description: "Parent, sibling, or child" },
];

export function StepRecipient({ value, onChange }: StepRecipientProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <StepHeading>Who are you buying for?</StepHeading>
        <StepHint>Choose the person you&apos;re gifting.</StepHint>
      </div>
      <div role="radiogroup" aria-label="Recipient type" className="grid grid-cols-1 gap-3">
        {OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            id={`recipient-${opt.id}`}
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
