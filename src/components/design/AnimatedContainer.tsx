"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Direction = "left" | "right" | "up" | "none";

interface AnimatedContainerProps {
  children: React.ReactNode;
  direction?: Direction;
  className?: string;
  /** Re-runs animation when this key changes */
  animationKey: string | number;
}

const ANIMATION_CLASS: Record<Direction, string> = {
  left: "animate-slide-left",
  right: "animate-slide-right",
  up: "animate-fade-up",
  none: "animate-fade-in",
};

export function AnimatedContainer({
  children,
  direction = "left",
  className,
  animationKey,
}: AnimatedContainerProps) {
  const [cls, setCls] = useState(ANIMATION_CLASS[direction]);
  const prevKey = useRef(animationKey);

  useEffect(() => {
    if (prevKey.current !== animationKey) {
      prevKey.current = animationKey;
      // Re-trigger by briefly clearing then re-adding
      setCls("");
      const t = setTimeout(() => setCls(ANIMATION_CLASS[direction]), 10);
      return () => clearTimeout(t);
    }
  }, [animationKey, direction]);

  return (
    <div className={cn(cls, className)}>
      {children}
    </div>
  );
}
