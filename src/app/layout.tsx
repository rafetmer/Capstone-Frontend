import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hediye Öneri — Mükemmel Hediyeyi Bul",
  description:
    "14 kısa soruyu yanıtla, yapay zekâ sana özel hediyeler önersin. Trendyol'dan anında sipariş.",
  keywords: ["hediye", "hediye fikirleri", "kişiselleştirilmiş hediye", "hediye öneri"],
  openGraph: {
    title: "Hediye Öneri — Mükemmel Hediyeyi Bul",
    description: "14 soruyu yanıtla, mükemmel hediyeyi bul.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="min-h-dvh bg-background antialiased">
        {/*
         * No global max-width cap — each page defines its own responsive layout.
         * This allows wizard/detail to be centered cards on desktop while
         * results can spread to a 2-column grid.
         */}
        {children}
      </body>
    </html>
  );
}
