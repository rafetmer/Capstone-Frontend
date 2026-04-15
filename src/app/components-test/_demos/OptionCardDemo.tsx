"use client";
import { useState } from "react";
import { OptionCard } from "@/components/design/OptionCard";

const OPTS = [
  { id: "friend", label: "Friend", emoji: "👫" },
  { id: "partner", label: "Partner", emoji: "❤️" },
  { id: "family", label: "Family", emoji: "👨‍👩‍👧" },
];

export function OptionCardDemo() {
  const [selected, setSelected] = useState<string | undefined>();
  return (
    <div className="grid grid-cols-1 gap-3">
      {OPTS.map((o) => (
        <OptionCard
          key={o.id}
          id={`demo-option-${o.id}`}
          label={o.label}
          emoji={o.emoji}
          selected={selected === o.id}
          onClick={() => setSelected(o.id)}
        />
      ))}
    </div>
  );
}
