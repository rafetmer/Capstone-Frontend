"use client";

import { cn } from "@/lib/utils";
import { Caption } from "@/components/design/Typography";

interface BudgetSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  className?: string;
}

const PRESETS = [
  { label: "₺500", max: 500 },
  { label: "₺1,000", max: 1000 },
  { label: "₺1,500", max: 1500 },
  { label: "₺2,000", max: 2000 },
  { label: "₺3,000+", max: 5000 },
];

export function BudgetSlider({
  value,
  onChange,
  min = 0,
  max = 5000,
  className,
}: BudgetSliderProps) {
  const budgetMax = value[1];
  const setBudgetMax = (v: number) => onChange([0, v]);
  const pct = ((budgetMax - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-5", className)}>
      {/* Preset chips */}
      <div role="group" aria-label="Budget presets" className="flex flex-wrap gap-2">
        {PRESETS.map((p) => {
          const isActive = budgetMax === p.max;
          return (
            <button
              key={p.label}
              id={`budget-preset-${p.max}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => setBudgetMax(p.max)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "active:scale-95",
                isActive
                  ? "bg-[var(--brand)] text-[var(--brand-foreground)]"
                  : "border border-border bg-card text-foreground hover:border-[var(--brand)] hover:bg-[var(--brand-muted)]"
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
          <input
            id="budget-slider"
            type="range"
            min={min}
            max={max}
            step={100}
            value={budgetMax}
            onChange={(e) => setBudgetMax(Number(e.target.value))}
            aria-label="Maximum budget"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={budgetMax}
            className="absolute inset-0 w-full cursor-pointer opacity-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-all duration-150"
            style={{ left: `calc(${pct}% - 10px)` }}
          />
        </div>

        <div className="flex justify-between">
          <Caption>₺0</Caption>
          <Caption muted={false} className="font-semibold text-foreground">
            Up to ₺{budgetMax.toLocaleString("tr-TR")}
          </Caption>
          <Caption>₺5,000+</Caption>
        </div>
      </div>
    </div>
  );
}
