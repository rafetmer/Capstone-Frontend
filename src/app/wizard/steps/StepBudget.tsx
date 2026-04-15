"use client";

import { BudgetSlider } from "@/components/design/BudgetSlider";
import { StepHeading, StepHint, Body } from "@/components/design/Typography";

interface StepBudgetProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function StepBudget({ value, onChange }: StepBudgetProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <StepHeading>What&apos;s your budget?</StepHeading>
        <StepHint>Pick a preset or drag the slider to set your maximum.</StepHint>
      </div>
      <BudgetSlider value={value} onChange={onChange} />
      <div className="rounded-2xl bg-muted/60 px-4 py-3">
        <Body size="sm" muted>
          <span className="font-semibold text-foreground">Budget is a hard filter.</span>{" "}
          We&apos;ll only show gifts you can actually afford — no bait and switch.
        </Body>
      </div>
    </div>
  );
}
