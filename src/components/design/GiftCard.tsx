"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Body, Caption } from "@/components/design/Typography";
import type { GiftItem } from "@/types/recommendation";

interface GiftCardProps {
  item: GiftItem;
  rank?: number;
  onSave?: (id: string) => void;
  saved?: boolean;
}

export function GiftCard({ item, rank, onSave, saved }: GiftCardProps) {
  const [imgError, setImgError] = useState(false);
  const hasImage = !!item.photoUrl && !imgError;

  return (
    <Link
      id={`gift-card-${item.id}`}
      href={`/results/${item.id}`}
      className="group block rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary/40 hover:shadow-md active:scale-[0.99]"
    >
      <div className="flex gap-0">
        {/* Product image / emoji */}
        <div className="relative shrink-0 bg-muted" style={{ width: 100, minHeight: 100 }}>
          {hasImage ? (
            <Image
              src={item.photoUrl!}
              alt={item.name}
              fill
              className="object-contain p-2"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              {item.imageEmoji}
            </div>
          )}

          {/* Rank badge */}
          {rank && (
            <div className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {rank}
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-1 flex-col justify-between gap-1 p-3 min-w-0">
          <div>
            {/* Name */}
            <h2 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {item.name}
            </h2>

            {/* Brand + category */}
            {(item.brand || item.category) && (
              <Caption className="mt-0.5 line-clamp-1">
                {[item.brand, item.category?.split(">").pop()?.trim()]
                  .filter(Boolean)
                  .join(" · ")}
              </Caption>
            )}
          </div>

          {/* First specific reason — skip generic 'Yüksek eşleşme' */}
          {(() => {
            const parts = (item.reason ?? "").split(" · ");
            const specific = parts.find(
              (p) => !p.toLowerCase().includes("yüksek eşleşme")
            );
            return specific ? (
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{specific}</p>
            ) : null;
          })()}

          {/* Price row */}
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-base font-bold text-foreground">
              ₺{item.price.toLocaleString("tr-TR")}
            </span>

            <div className="flex items-center gap-2">
              {/* Save button */}
              {onSave && (
                <button
                  type="button"
                  id={`save-gift-${item.id}`}
                  aria-label={saved ? "Kaydedilenlerden çıkar" : "Kaydet"}
                  onClick={(e) => {
                    e.preventDefault(); // don't navigate
                    onSave(item.id);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-sm transition-colors hover:border-primary hover:text-primary active:scale-90"
                >
                  {saved ? "🔖" : "☆"}
                </button>
              )}

              {/* Arrow — visible on hover */}
              <span className="text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary text-sm">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
