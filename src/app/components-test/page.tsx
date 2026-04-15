import type { Metadata } from "next";
import {
  Heading,
  Body,
  AppTitle,
  StepHeading,
  StepHint,
  PageTitle,
  CardTitle,
  CardMeta,
  Price,
  WhyText,
  LabelText,
  Caption,
} from "@/components/design/Typography";
import { OptionCardDemo } from "./_demos/OptionCardDemo";
import { ChipSelectDemo } from "./_demos/ChipSelectDemo";
import { BudgetSliderDemo } from "./_demos/BudgetSliderDemo";
import { GiftCardDemo } from "./_demos/GiftCardDemo";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProgressBar } from "@/components/design/ProgressBar";

export const metadata: Metadata = {
  title: "Gift Recommender — Component Showcase",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <LabelText uppercase className="text-[10px]">{title}</LabelText>
        <Separator />
      </div>
      {children}
    </section>
  );
}

export default function ComponentsTestPage() {
  return (
    <main className="space-y-12 px-5 py-10">
      <div className="space-y-1 animate-fade-up">
        <Heading level={1}>Component Showcase</Heading>
        <Body size="sm" muted>
          Design system reference for Gift Recommender. All tokens, components, and
          composite patterns live here.
        </Body>
      </div>

      {/* Colors */}
      <Section title="Color Tokens">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Primary", cls: "bg-primary" },
            { label: "Primary FG", cls: "bg-primary-foreground border" },
            { label: "Brand (amber)", cls: "bg-[var(--brand)]" },
            { label: "Brand muted", cls: "bg-[var(--brand-muted)]" },
            { label: "Muted", cls: "bg-muted" },
            { label: "Card", cls: "bg-card border" },
            { label: "Destructive", cls: "bg-destructive" },
            { label: "Background", cls: "bg-background border" },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`h-8 w-8 flex-shrink-0 rounded-lg ${cls}`} />
              <Caption>{label}</Caption>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography — All Named Components">
        <div className="space-y-3">
          <AppTitle>AppTitle — Hero Wordmark</AppTitle>
          <Heading level={1}>Heading level={1}</Heading>
          <Heading level={2}>Heading level={2}</Heading>
          <Heading level={3}>Heading level={3}</Heading>
          <Heading level={4}>Heading level={4}</Heading>
          <PageTitle>PageTitle — Inner Page Header</PageTitle>
          <StepHeading>StepHeading — Wizard Question</StepHeading>
          <StepHint>StepHint — Wizard hint / subtitle</StepHint>
          <Body size="lg">Body large — leading-relaxed</Body>
          <Body size="md">Body medium — default</Body>
          <Body size="sm">Body small — compact info</Body>
          <Body size="md" muted>Body muted</Body>
          <CardTitle>CardTitle — Gift Item Name</CardTitle>
          <CardMeta>CardMeta — Category / subtitle</CardMeta>
          <Price>Price — ₺1,499</Price>
          <WhyText><span className="font-semibold text-primary">Why this?</span> WhyText — explanation in gift cards.</WhyText>
          <LabelText uppercase>LabelText uppercase</LabelText>
          <Caption>Caption / helper text</Caption>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Section>

      {/* Progress */}
      <Section title="Progress Bar">
        <div className="space-y-4">
          <ProgressBar currentStep={1} totalSteps={5} />
          <ProgressBar currentStep={3} totalSteps={5} />
          <ProgressBar currentStep={5} totalSteps={5} />
        </div>
      </Section>

      {/* Option Card */}
      <Section title="Option Card (Single Select)">
        <OptionCardDemo />
      </Section>

      {/* Chip Select */}
      <Section title="Chip Select (Multi Select)">
        <ChipSelectDemo />
      </Section>

      {/* Budget Slider */}
      <Section title="Budget Slider">
        <BudgetSliderDemo />
      </Section>

      {/* Gift Card */}
      <Section title="Gift Card">
        <GiftCardDemo />
      </Section>
    </main>
  );
}
