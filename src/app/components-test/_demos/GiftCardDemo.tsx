"use client";
import { useState } from "react";
import { GiftCard } from "@/components/design/GiftCard";
import type { GiftItem } from "@/types/recommendation";

const MOCK: GiftItem = {
  id: "demo-1",
  name: "Sony WH-1000XM5 Headphones",
  price: 4299,
  category: "Electronics",
  imageEmoji: "🎧",
  tags: ["music", "tech", "travel"],
  rating: 4.9,
  reviewCount: 8900,
  reason: "Top-rated noise-cancelling headphones — perfect for music lovers and travelers. Matched interests: music, tech.",
  score: 93,
};

export function GiftCardDemo() {
  const [saved, setSaved] = useState(false);
  return (
    <GiftCard
      item={MOCK}
      rank={1}
      onSave={() => setSaved((s) => !s)}
      saved={saved}
    />
  );
}
