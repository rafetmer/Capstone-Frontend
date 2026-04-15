import type {
  GiftItem,
  RecommendationInput,
  RecommendationResult,
  Question,
  WizardSubmission,
} from "@/types/recommendation";

// ─── Mock data pool ───────────────────────────────────────────────────────────

const MOCK_GIFTS: GiftItem[] = [
  { id: "1", name: "Kindle Paperwhite", price: 2499, category: "Electronics", imageEmoji: "📖", tags: ["reading", "books", "tech"], rating: 4.8, reviewCount: 12430, reason: "Kitap okumayı sevenler için ideal.", score: 95, affiliateUrl: "#" },
  { id: "2", name: "Sony WH-1000XM5 Kulaklık", price: 4299, category: "Electronics", imageEmoji: "🎧", tags: ["music", "tech"], rating: 4.9, reviewCount: 8900, reason: "Müzik tutkunları için mükemmel.", score: 93, affiliateUrl: "#" },
  { id: "3", name: "Kokulu Mum Seti", price: 749, category: "Ev & Yaşam", imageEmoji: "🕯️", tags: ["wellness", "home"], rating: 4.6, reviewCount: 3200, reason: "Huzur ve ferahlık için.", score: 87, affiliateUrl: "#" },
  { id: "4", name: "Nintendo Switch OLED", price: 5999, category: "Gaming", imageEmoji: "🎮", tags: ["gaming", "tech"], rating: 4.9, reviewCount: 22100, reason: "Oyun severler için mükemmel.", score: 92, affiliateUrl: "#" },
  { id: "5", name: "Kahve Aboneliği", price: 899, category: "Gıda & İçecek", imageEmoji: "☕", tags: ["food", "cooking"], rating: 4.7, reviewCount: 1450, reason: "Kahve tutkunları için.", score: 89, affiliateUrl: "#" },
];

// ─── Category emoji helper ─────────────────────────────────────────────────────

function categoryToEmoji(category: string): string {
  const cat = (category ?? "").toLowerCase();
  if (cat.includes("elektronik") || cat.includes("teknoloji") || cat.includes("bilgisayar")) return "💻";
  if (cat.includes("telefon")) return "📱";
  if (cat.includes("kulaklık") || cat.includes("müzik")) return "🎧";
  if (cat.includes("oyun") || cat.includes("konsol")) return "🎮";
  if (cat.includes("giyim") || cat.includes("moda") || cat.includes("pantolon") || cat.includes("elbise")) return "👗";
  if (cat.includes("çanta")) return "👜";
  if (cat.includes("ayakkabı")) return "👟";
  if (cat.includes("kozmetik") || cat.includes("makyaj")) return "💄";
  if (cat.includes("parfüm")) return "🌸";
  if (cat.includes("cilt") || cat.includes("bakım")) return "🧴";
  if (cat.includes("ev") || cat.includes("dekorasyon") || cat.includes("mobilya")) return "🏠";
  if (cat.includes("mutfak") || cat.includes("gurme")) return "🍳";
  if (cat.includes("kahve") || cat.includes("çay")) return "☕";
  if (cat.includes("spor") || cat.includes("fitness")) return "⚽";
  if (cat.includes("outdoor") || cat.includes("kamp")) return "🏕️";
  if (cat.includes("kitap") || cat.includes("kırtasiye")) return "📚";
  if (cat.includes("sanat") || cat.includes("tablo")) return "🎨";
  if (cat.includes("takı") || cat.includes("kolye") || cat.includes("yüzük")) return "💍";
  if (cat.includes("saat")) return "⌚";
  return "🎁";
}

// ─── Public API ───────────────────────────────────────────────────────────────

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/** Fetch the questionnaire definition from the backend. */
export async function fetchQuestions(): Promise<Question[]> {
  if (!BACKEND_URL) return [];
  const res = await fetch(`${BACKEND_URL}/questions`);
  if (!res.ok) throw new Error(`Sorular yüklenemedi: ${res.status}`);
  return res.json();
}

/**
 * Parse the budget ceiling from a bracket string like "500 - 1.000 TL".
 * Returns numeric TL value.
 */
export function parseBudgetMax(bracketAnswer: string): number {
  if (!bracketAnswer) return 50000;
  if (bracketAnswer.includes("üzeri")) return 50000;
  const cleaned = bracketAnswer.replace(/\./g, ""); // remove thousands dots
  const nums = cleaned.match(/\d+/g);
  if (nums && nums.length >= 2) return parseInt(nums[1], 10);
  if (nums && nums.length === 1) return parseInt(nums[0], 10);
  return 50000;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBackendItem(r: any): GiftItem {
  // Deduplicate rationale parts (backend sometimes emits the same reason twice)
  const rawRationale: string = r.rationale ?? "";
  const rationaleParts = rawRationale.split(" \u00b7 ");
  const dedupedRationale = [...new Set(rationaleParts)].join(" \u00b7 ");

  return {
    id:          r.product_id,
    name:        r.title,
    price:       r.price ?? 0,
    category:    r.category ?? "",
    brand:       r._brand ?? r.brand ?? undefined,
    imageEmoji:  categoryToEmoji(r.category),
    photoUrl:    r.photo_url ?? undefined,
    tags:        [],
    rating:      0,
    reviewCount: 0,
    reason:      dedupedRationale,
    score:       Math.round((r.score ?? 0) * 100),
    affiliateUrl: r.product_url ?? "#",
    productUrl:  r.product_url ?? undefined,
  };
}

/**
 * Get gift recommendations.
 * Accepts a WizardSubmission (raw backend answers) or legacy RecommendationInput.
 */
export async function getRecommendations(
  submission: WizardSubmission | RecommendationInput
): Promise<RecommendationResult> {
  if (BACKEND_URL) {
    const body = "answers" in submission
      ? submission
      : (() => {
          const inp = submission as RecommendationInput;
          return {
            answers: {
              kime_hediye_aliyorsun: inp.recipientType,
              hangi_yas_araliginda: inp.ageGroup,
              bu_hediyeyi_hangi_ozel_durum_icin_aliyorsun: inp.occasion,
              temel_ilgi_alanlari_neler: inp.interests,
            },
            budget: inp.budgetMax,
          };
        })();

    const res = await fetch(`${BACKEND_URL}/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API hatası: ${res.status}`);

    const data = await res.json();
    const items: GiftItem[] = (data.recommendations ?? []).map(mapBackendItem);
    return { items, totalFiltered: items.length, generatedAt: new Date().toISOString() };
  }

  // Mock fallback
  await new Promise((r) => setTimeout(r, 1500));
  return { items: MOCK_GIFTS, totalFiltered: MOCK_GIFTS.length, generatedAt: new Date().toISOString() };
}
