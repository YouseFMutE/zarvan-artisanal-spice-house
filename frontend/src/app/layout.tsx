import type { Metadata } from "next";
import {
  Vazirmatn,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "زَروان | ZARVAN — خانه کیمیاگری ادویه و عطرهای خاکی",
  description:
    "تجربه‌ای تعاملی و چندحسی از کمیاب‌ترین ادویه‌های تک‌خاستگاه ایران و جهان؛ چیده‌شده در گرگ‌ومیش و کوبیده‌شده در آسیاب سنگی سرد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${cormorant.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="font-sans antialiased bg-obsidian text-parchment selection:bg-saffron/30">
        {children}
      </body>
    </html>
  );
}
