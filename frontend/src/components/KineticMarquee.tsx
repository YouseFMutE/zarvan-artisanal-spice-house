"use client";

import React from "react";

interface KineticMarqueeProps {
  accentColor: string;
}

const ITEMS = [
  "ZARVAN ARTISANAL SPICE HOUSE",
  "برداشت دستی در سپیده‌دم",
  "COLD STONE-GROUND UNDER 22°C",
  "خلوص آزمایشگاهی بدون افزودنی",
  "BIOPHOTONIC VIOLET GLASS",
  "از صخره‌های هوراند تا فلات قاینات",
  "SINGLE-ORIGIN BOTANICAL ARCHIVE",
  "کیمیاگری عطر، خاک و زمان",
];

export default function KineticMarquee({ accentColor }: KineticMarqueeProps) {
  return (
    <div
      className="relative z-10 border-y border-white/10 bg-charcoal/80 py-4 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="animate-marquee-rtl flex items-center gap-10 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((text, i) => (
          <div key={i} className="flex items-center gap-10">
            <span
              className={
                i % 2 === 0
                  ? "font-mono text-xs tracking-[0.28em] text-sand/80 uppercase"
                  : "text-sm font-bold text-parchment"
              }
            >
              {text}
            </span>
            <span
              className="inline-block w-2 h-2 rotate-45"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
