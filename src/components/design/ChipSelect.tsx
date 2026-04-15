"use client";

import { cn } from "@/lib/utils";

interface ChipOption {
  id: string;
  label: string;
  emoji?: string;
}

interface ChipSelectProps {
  options: ChipOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  max?: number;
  className?: string;
}

export function ChipSelect({
  options,
  selected,
  onChange,
  max,
  className,
}: ChipSelectProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      if (max !== undefined && selected.length >= max) return;
      onChange([...selected, id]);
    }
  }

  return (
    <div
      role="group"
      aria-label="Select interests"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((opt) => {
        const isSelected = selected.includes(opt.id);
        const isDisabled =
          !isSelected && max !== undefined && selected.length >= max;

        return (
          <button
            key={opt.id}
            id={`chip-${opt.id}`}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            disabled={isDisabled}
            onClick={() => toggle(opt.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5",
              "text-sm font-medium transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "active:scale-95",
              // Unselected
              !isSelected && !isDisabled && [
                "border border-border bg-card text-foreground",
                "hover:border-primary/50 hover:bg-primary/5",
              ],
              // Selected
              isSelected && [
                "border border-primary bg-primary text-primary-foreground",
                "shadow-sm",
              ],
              // Disabled
              isDisabled && "opacity-40 cursor-not-allowed",
            )}
          >
            {opt.emoji && (
              <span aria-hidden="true">{opt.emoji}</span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
