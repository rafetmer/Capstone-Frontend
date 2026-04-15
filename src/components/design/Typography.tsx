import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// RULE: No raw typography Tailwind classes in components or pages.
//       Import and use these primitives everywhere.
//       Changing one component updates every usage automatically.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Heading (h1–h4) ─────────────────────────────────────────────────────────

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level = 1, children, className }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const styles = {
    1: "text-3xl font-bold tracking-tight leading-tight",
    2: "text-2xl font-semibold tracking-tight leading-snug",
    3: "text-xl font-semibold leading-snug",
    4: "text-base font-semibold leading-normal",
  } as const;
  return (
    <Tag className={cn("text-foreground", styles[level], className)}>
      {children}
    </Tag>
  );
}

// ─── AppTitle — large hero wordmark ──────────────────────────────────────────

interface AppTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function AppTitle({ children, className }: AppTitleProps) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold tracking-tight leading-tight text-foreground",
        className
      )}
    >
      {children}
    </h1>
  );
}

// ─── PageTitle — sticky header title on inner pages ──────────────────────────

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={cn(
        "text-xl font-bold tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </h1>
  );
}

// ─── StepHeading — question heading used in every wizard step ─────────────────

interface StepHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function StepHeading({ children, className }: StepHeadingProps) {
  return (
    <h2
      className={cn(
        "text-2xl font-bold tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </h2>
  );
}

// ─── StepHint — subtitle / helper line under every step heading ───────────────

interface StepHintProps {
  children: React.ReactNode;
  className?: string;
}

export function StepHint({ children, className }: StepHintProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

// ─── Body (p) ─────────────────────────────────────────────────────────────────

interface BodyProps {
  size?: "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}

export function Body({ size = "md", children, className, muted = false }: BodyProps) {
  const styles = {
    lg: "text-lg leading-relaxed",
    md: "text-base leading-relaxed",
    sm: "text-sm leading-relaxed",
  } as const;
  return (
    <p
      className={cn(
        styles[size],
        muted ? "text-muted-foreground" : "text-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

// ─── CardTitle — gift card item name ─────────────────────────────────────────

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "truncate text-sm font-semibold leading-tight text-foreground",
        className
      )}
    >
      {children}
    </h3>
  );
}

// ─── CardMeta — category / subtitle under card title ─────────────────────────

interface CardMetaProps {
  children: React.ReactNode;
  className?: string;
}

export function CardMeta({ children, className }: CardMetaProps) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      {children}
    </p>
  );
}

// ─── Price — bold price display ───────────────────────────────────────────────

interface PriceProps {
  children: React.ReactNode;
  className?: string;
}

export function Price({ children, className }: PriceProps) {
  return (
    <p className={cn("text-base font-bold text-foreground", className)}>
      {children}
    </p>
  );
}

// ─── WhyText — "Why this?" explanation inside gift card ──────────────────────

interface WhyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function WhyText({ children, className }: WhyTextProps) {
  return (
    <p className={cn("text-xs leading-relaxed text-foreground/80", className)}>
      {children}
    </p>
  );
}

// ─── LabelText — form label ───────────────────────────────────────────────────

interface LabelTextProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
  uppercase?: boolean;
}

export function LabelText({ children, className, htmlFor, uppercase = false }: LabelTextProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-xs font-semibold text-muted-foreground tracking-wide",
        uppercase && "uppercase",
        className
      )}
    >
      {children}
    </label>
  );
}

// ─── Caption (span) ───────────────────────────────────────────────────────────

interface CaptionProps {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}

export function Caption({ children, className, muted = true }: CaptionProps) {
  return (
    <span
      className={cn(
        "text-xs leading-normal",
        muted ? "text-muted-foreground" : "text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
