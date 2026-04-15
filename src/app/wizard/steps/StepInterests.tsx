"use client";

import { ChipSelect } from "@/components/design/ChipSelect";
import { StepHeading, StepHint, Caption } from "@/components/design/Typography";
import { INTEREST_LABELS, type Interest } from "@/types/recommendation";

interface StepInterestsProps {
  value: Interest[];
  onChange: (value: Interest[]) => void;
}

const EMOJI_MAP: Record<Interest, string> = {
  tech: "💻",
  gaming: "🎮",
  books: "📚",
  fashion: "👗",
  sports: "⚽",
  food: "🍕",
  art: "🎨",
  music: "🎵",
  outdoors: "🏕️",
  wellness: "🧘",
  travel: "✈️",
  cooking: "👨‍🍳",
};

const INTEREST_OPTIONS = (Object.entries(INTEREST_LABELS) as [Interest, string][]).map(
  ([id, label]) => ({ id, label, emoji: EMOJI_MAP[id] })
);

export function StepInterests({ value, onChange }: StepInterestsProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <StepHeading>What are their interests?</StepHeading>
        <StepHint>Pick as many as you like — the more context, the better.</StepHint>
      </div>
      <ChipSelect
        options={INTEREST_OPTIONS}
        selected={value}
        onChange={(v) => onChange(v as Interest[])}
      />
      {value.length > 0 && (
        <Caption>{value.length} selected · tap again to remove</Caption>
      )}
    </div>
  );
}
