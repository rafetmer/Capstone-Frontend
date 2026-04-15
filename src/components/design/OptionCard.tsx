"use client";

import { cn } from "@/lib/utils";
import { Caption } from "@/components/design/Typography";

interface OptionCardProps {
  id: string;
  label: string;
  emoji?: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

export function OptionCard({
  id,
  label,
  emoji,
  description,
  selected = false,
  onClick,
  className,
}: OptionCardProps) {
  return (
    <button
      id={id}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-2",
        "w-full rounded-2xl border-2 p-5 text-center",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "active:scale-[0.97]",
        !selected && [
          "border-border bg-card text-card-foreground",
          "hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm",
        ],
        selected && [
          "border-primary bg-primary/10 text-primary",
          "shadow-sm",
        ],
        className
      )}
    >
      {emoji && (
        <span
          className={cn(
            "text-3xl transition-transform duration-200",
            "group-hover:scale-110",
            selected && "scale-110"
          )}
          aria-hidden="true"
        >
          {emoji}
        </span>
      )}

      {/* Label uses a controlled style, not raw class */}
      <span className="text-sm font-semibold leading-tight">{label}</span>

      {description && (
        <Caption className="leading-snug">{description}</Caption>
      )}

      {selected && (
        <span className="absolute top-2.5 right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">
          ✓
        </span>
      )}
    </button>
  );
}
