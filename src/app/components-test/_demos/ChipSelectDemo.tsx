"use client";
import { useState } from "react";
import { ChipSelect } from "@/components/design/ChipSelect";

const OPTS = [
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "books", label: "Books", emoji: "📚" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "outdoors", label: "Outdoors", emoji: "🏕️" },
];

export function ChipSelectDemo() {
  const [sel, setSel] = useState<string[]>([]);
  return <ChipSelect options={OPTS} selected={sel} onChange={setSel} />;
}
