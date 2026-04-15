// ─── Backend question types ─────────────────────────────────────────────────

export interface Question {
  id: string;
  title: string;
  options: string[];
}

export type WizardAnswers = Record<string, string | string[]>;

export interface WizardSubmission {
  answers: WizardAnswers;
  budget?: number;
}

// ─── Enums ───────────────────────────────────────────────────────────────────

export type RecipientType = "friend" | "partner" | "family";

export type Occasion =
  | "birthday"
  | "anniversary"
  | "graduation"
  | "just-because"
  | "holiday"
  | "wedding";

export type AgeGroup = "under-18" | "18-25" | "26-40" | "40+";

export type Interest =
  | "tech"
  | "gaming"
  | "books"
  | "fashion"
  | "sports"
  | "food"
  | "art"
  | "music"
  | "outdoors"
  | "wellness"
  | "travel"
  | "cooking";

// ─── Input / Output shapes ────────────────────────────────────────────────────

export interface RecommendationInput {
  recipientType: RecipientType;
  occasion: Occasion;
  ageGroup: AgeGroup;
  interests: Interest[];
  budgetMin: number;
  budgetMax: number;
}

export interface GiftItem {
  id: string;
  name: string;
  price: number;
  category: string;
  imageEmoji: string; // placeholder visual identifier
  brand?: string;       // brand name from backend
  photoUrl?: string;  // real product image URL from backend
  tags: string[];
  rating: number; // 1-5
  reviewCount: number;
  reason: string; // "Why recommended" explanation
  score: number; // internal ranking score (0-100)
  affiliateUrl?: string;
  productUrl?: string; // direct product link from backend
}

export interface RecommendationResult {
  items: GiftItem[];
  totalFiltered: number;
  generatedAt: string;
}

// ─── Wizard state ─────────────────────────────────────────────────────────────

export interface WizardState {
  step: number;
  answers: Partial<RecommendationInput>;
}

export const TOTAL_STEPS = 5;

// ─── Display helpers ──────────────────────────────────────────────────────────

export const RECIPIENT_LABELS: Record<RecipientType, string> = {
  friend: "Friend",
  partner: "Partner",
  family: "Family",
};

export const OCCASION_LABELS: Record<Occasion, string> = {
  birthday: "Birthday",
  anniversary: "Anniversary",
  graduation: "Graduation",
  "just-because": "Just Because",
  holiday: "Holiday",
  wedding: "Wedding",
};

export const AGE_LABELS: Record<AgeGroup, string> = {
  "under-18": "Under 18",
  "18-25": "18 – 25",
  "26-40": "26 – 40",
  "40+": "40+",
};

export const INTEREST_LABELS: Record<Interest, string> = {
  tech: "Tech",
  gaming: "Gaming",
  books: "Books",
  fashion: "Fashion",
  sports: "Sports",
  food: "Food & Drink",
  art: "Art",
  music: "Music",
  outdoors: "Outdoors",
  wellness: "Wellness",
  travel: "Travel",
  cooking: "Cooking",
};
