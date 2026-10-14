"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Spice,
  CustomBlendOrder,
  CartItem,
} from "@/types/spice";
import {
  submitCustomAlchemyBlend,
  toPersianDigits,
  formatPersianPrice,
} from "@/lib/fallbackData";
import {
  FlaskConical,
  Sparkles,
  CheckCircle2,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";

interface AlchemyLabSectionProps {
  spices: Spice[];
  onAddCustomBlendToCart: (item: CartItem) => void;
  onTriggerBurst: () => void;
}

const GRIND_OPTIONS: {
  id: CustomBlendOrder["grind_type"];
  label: string;
  desc: string;
}[] = [
  {
    id: "stone_ground",
    label: "آسیاب سنگی سرد (Cold Stone-Ground)",
    desc: "بافت مخملی استاندارد با حفظ ۹۸٪ روغن‌های فرّار",
  },
  {
    id: "coarse",
    label: "کوبش هاون سنگی (Coarse Mortar Crush)",
    desc: "دانه‌بندی درشت برای آزادسازی تدریجی عطر روی گریل و کباب",
  },
  {
    id: "whole",
    label: "دانه و کلاله کامل (Whole Botanicals)",
    desc: "حداکثر ماندگاری برای دم‌کردن یا سایش لحظه‌ای در خانه",
  },
  {
    id: "silk_powder",
    label: "پودر ابریشمی میکرونیزه (Silk Micronized)",
    desc: "حل‌شوندگی فوری در سس‌ها، زعفران دم‌کرده و شیرینی‌پزی",
  },
];

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0"))
      .join("")
  );
}

export default function AlchemyLabSection({
  spices,
  onAddCustomBlendToCart,
  onTriggerBurst,
}: AlchemyLabSectionProps) {
  const [weights, setWeights] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    spices.forEach((s, idx) => {
      initial[s.slug] = idx === 0 ? 35 : idx === 2 ? 35 : idx === 5 ? 30 : 0;
    });
    return initial;
  });

  const [blendName, setBlendName] = useState("اکسیر شب‌های زَروان");
  const [creatorName, setCreatorName] = useState("کیمیاگر مهمان");
  const [grindType, setGrindType] =
    useState<CustomBlendOrder["grind_type"]>("stone_ground");
  const [submitting, setSubmitting] = useState(false);
  const [savedResult, setSavedResult] = useState<{
    batch_code: string;
    message: string;
    savedOnServer: boolean;
  } | null>(null);

  const totalWeight = useMemo(() => {
    const sum = Object.values(weights).reduce((acc, v) => acc + v, 0);
    return sum > 0 ? sum : 1;
  }, [weights]);

  const normalizedComponents = useMemo(() => {
    return spices
      .map((s) => {
        const raw = weights[s.slug] || 0;
        const pct = Math.round((raw / totalWeight) * 100);
        return {
          spice: s,
          raw,
          percentage: pct,
        };
      })
      .filter((item) => item.percentage > 0);
  }, [spices, weights, totalWeight]);

  // Blended color & sensory scores
  const alchemyStats = useMemo(() => {
    let r = 0,
      g = 0,
      b = 0;
    let warmth = 0,
      pungency = 0,
      aroma_intensity = 0,
      earthiness = 0,
      floral_sweetness = 0,
      smokiness = 0;
    let price = 0;

    normalizedComponents.forEach(({ spice, percentage }) => {
      const ratio = percentage / 100;
      const rgb = hexToRgb(spice.primary_color);
      r += rgb.r * ratio;
      g += rgb.g * ratio;
      b += rgb.b * ratio;

      warmth += spice.warmth * ratio;
      pungency += spice.pungency * ratio;
      aroma_intensity += spice.aroma_intensity * ratio;
      earthiness += spice.earthiness * ratio;
      floral_sweetness += spice.floral_sweetness * ratio;
      smokiness += spice.smokiness * ratio;
      price += spice.price_toman * ratio;
    });

    const dominantColor =
      normalizedComponents.length > 0 ? rgbToHex(r, g, b) : "#E59819";

    return {
      dominantColor,
      price: Math.max(450000, Math.round(price / 10000) * 10000),
      sensory: {
        warmth: Math.round(warmth),
        pungency: Math.round(pungency),
        aroma_intensity: Math.round(aroma_intensity),
        earthiness: Math.round(earthiness),
        floral_sweetness: Math.round(floral_sweetness),
        smokiness: Math.round(smokiness),
      },
    };
  }, [normalizedComponents]);

  const applyPreset = (presetIndex: number) => {
    const next: Record<string, number> = {};
    spices.forEach((s) => (next[s.slug] = 0));
    if (presetIndex === 0) {
      // Royal Saffron & Cardamom
      if (spices[0]) next[spices[0].slug] = 45;
      if (spices[2]) next[spices[2].slug] = 35;
      if (spices[5]) next[spices[5].slug] = 20;
      setBlendName("طلوع زرین قاینات");
    } else if (presetIndex === 1) {
      // Smoky Fire & Wild Sumac
      if (spices[1]) next[spices[1].slug] = 45;
      if (spices[4]) next[spices[4].slug] = 35;
      if (spices[3]) next[spices[3].slug] = 20;
      setBlendName("آتش و یاقوت ارسباران");
    } else {
      // Desert Caraway & Silk Advieh
      if (spices[3]) next[spices[3].slug] = 40;
      if (spices[5]) next[spices[5].slug] = 40;
      if (spices[0]) next[spices[0].slug] = 20;
      setBlendName("کاروان ابریشم و کویر");
    }
    setWeights(next);
    setSavedResult(null);
    onTriggerBurst();
  };

  const handleSaveToArchive = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload: CustomBlendOrder = {
      blend_name: blendName || "اکسیر اختصاصی زَروان",
      creator_name: creatorName || "کیمیاگر مهمان",
      grind_type: grindType,
      dominant_color: alchemyStats.dominantColor,
      components: normalizedComponents.map((c) => ({
        spice_slug: c.spice.slug,
        name_fa: c.spice.name_fa,
        percentage: c.percentage,
        color: c.spice.primary_color,
      })),
      sensory_profile: alchemyStats.sensory,
      notes: `ساخته‌شده در آزمایشگاه تعاملی زَروان با آسیاب ${grindType}`,
    };

    const result = await submitCustomAlchemyBlend(payload);
    setSavedResult(result);
    setSubmitting(false);
    onTriggerBurst();
  };

  const handleAddBlendToCart = () => {
    const code =
      savedResult?.batch_code ||
      `ZRV-LAB-${Math.floor(1000 + Math.random() * 900)}`;
    onAddCustomBlendToCart({
      id: `custom-${code}`,
      title: `ترکیب اختصاصی: ${blendName}`,
      subtitle: normalizedComponents
        .map((c) => `${c.spice.name_fa} (${toPersianDigits(c.percentage)}٪)`)
        .join(" + "),
      code,
      color: alchemyStats.dominantColor,
      price_toman: alchemyStats.price,
      weight_grams: 60,
      quantity: 1,
      isCustomBlend: true,
    });
  };

  // Compute SVG vertical strata inside the jar
  let accumulatedY = 198;

  return (
    <section
      id="alchemy-lab"
      className="relative z-10 py-28 px-4 sm:px-8 lg:px-14 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-saffron mb-2">
              INTERACTIVE ALCHEMY BLENDER // BESPOKE FORMULATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-parchment leading-tight">
              آزمایشگاه کیمیاگری و ساخت ادویه اختصاصی
            </h2>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-sand/70 ml-2">فرمول‌های پیشنهادی:</span>
            {["طلوع زرین", "آتش ارسباران", "کاروان ابریشم"].map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => applyPreset(idx)}
                data-cursor="فرمول"
                className="rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/10 px-3.5 py-1.5 text-xs text-parchment transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Right Column: Sliders & Custom Engraving Form (7 Cols) */}
          <form
            onSubmit={handleSaveToArchive}
            className="lg:col-span-7 rounded-3xl border border-white/15 bg-charcoal/85 p-6 sm:p-9 space-y-8"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-parchment flex items-center gap-2">
                  <FlaskConical
                    className="w-5 h-5"
                    style={{ color: alchemyStats.dominantColor }}
                    aria-hidden="true"
                  />
                  <span>۱. تنظیم نسبت گیاهان و ادویه‌ها</span>
                </h3>
                <button
                  type="button"
                  onClick={() => applyPreset(0)}
                  className="inline-flex items-center gap-1.5 text-xs text-sand/70 hover:text-parchment cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>بازنشانی نسبت‌ها</span>
                </button>
              </div>

              <div className="space-y-4">
                {spices.map((spice) => {
                  const rawVal = weights[spice.slug] || 0;
                  const normalizedPct =
                    normalizedComponents.find(
                      (c) => c.spice.slug === spice.slug
                    )?.percentage || 0;

                  return (
                    <div
                      key={spice.slug}
                      className="rounded-2xl border border-white/10 bg-obsidian/60 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor={`slider-${spice.slug}`}
                          className="text-sm font-bold text-parchment flex items-center gap-2"
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: spice.primary_color }}
                          />
                          <span>{spice.name_fa}</span>
                        </label>
                        <span className="font-mono text-xs text-parchment">
                          سهم در ترکیب: {toPersianDigits(normalizedPct)}٪
                        </span>
                      </div>

                      <input
                        id={`slider-${spice.slug}`}
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={rawVal}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setWeights((prev) => ({
                            ...prev,
                            [spice.slug]: val,
                          }));
                          setSavedResult(null);
                        }}
                        style={{ accentColor: spice.primary_color }}
                        className="w-full h-2 rounded-lg bg-white/10 cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Grind Type & Jar Label Engraving */}
            <div className="border-t border-white/10 pt-6 space-y-5">
              <h3 className="text-lg font-bold text-parchment">
                ۲. نوع سایش و حکاکی روی شیشه ضدِفوتون
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="blend-name-input"
                    className="block text-xs text-sand/80 mb-1.5"
                  >
                    نام اختصاصی ترکیب روی شیشه:
                  </label>
                  <input
                    id="blend-name-input"
                    type="text"
                    required
                    maxLength={48}
                    value={blendName}
                    onChange={(e) => setBlendName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-obsidian px-4 py-3 text-sm text-parchment focus:outline-none focus:border-saffron"
                  />
                </div>

                <div>
                  <label
                    htmlFor="creator-name-input"
                    className="block text-xs text-sand/80 mb-1.5"
                  >
                    نام کیمیاگر (امضای سازنده):
                  </label>
                  <input
                    id="creator-name-input"
                    type="text"
                    maxLength={48}
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-obsidian px-4 py-3 text-sm text-parchment focus:outline-none focus:border-saffron"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GRIND_OPTIONS.map((option) => {
                  const selected = grindType === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setGrindType(option.id)}
                      className={`text-right rounded-2xl border p-3.5 transition-all cursor-pointer ${
                        selected
                          ? "border-white/35 bg-white/[0.08]"
                          : "border-white/10 bg-obsidian/50 hover:border-white/20"
                      }`}
                    >
                      <div className="text-xs font-bold text-parchment">
                        {option.label}
                      </div>
                      <div className="text-[11px] text-sand/70 mt-1">
                        {option.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit to Django API + Add to Cart */}
            <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting || normalizedComponents.length === 0}
                  data-cursor="مهروموم"
                  className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs sm:text-sm font-bold text-obsidian transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                  style={{ backgroundColor: alchemyStats.dominantColor }}
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {submitting
                      ? "در حال ثبت در آرشیو جنگو..."
                      : "ثبت فرمول در آرشیو آزمایشگاه"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleAddBlendToCart}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-medium text-parchment transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  <span>
                    افزودن به سبد ({formatPersianPrice(alchemyStats.price)}{" "}
                    تومان)
                  </span>
                </button>
              </div>
            </div>

            {savedResult && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-400 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="text-xs font-bold text-parchment">
                      {savedResult.message}
                    </div>
                    <div className="font-mono text-[11px] text-emerald-300 mt-0.5">
                      BATCH SEAL: {savedResult.batch_code} //{" "}
                      {savedResult.savedOnServer
                        ? "PERSISTED IN DJANGO SQLITE"
                        : "LOCAL ARCHIVE"}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </form>

          {/* Left Column: Live Stratified Jar Preview & Sensory Output (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 rounded-3xl border border-white/15 bg-charcoal/95 p-7 sm:p-9 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-sand/70">
                LIVE STRATIFIED VESSEL
              </span>
              <span
                className="font-mono text-xs px-3 py-1 rounded-full border"
                style={{
                  borderColor: `${alchemyStats.dominantColor}55`,
                  color: alchemyStats.dominantColor,
                }}
              >
                60g BIOPHOTONIC JAR
              </span>
            </div>

            {/* Stratified Jar SVG */}
            <div className="relative h-72 flex items-center justify-center">
              <div
                className="pointer-events-none absolute w-56 h-56 rounded-full blur-3xl opacity-30 transition-colors duration-500"
                style={{ backgroundColor: alchemyStats.dominantColor }}
                aria-hidden="true"
              />

              <svg
                viewBox="0 0 240 240"
                className="w-60 h-60 relative z-10"
                role="img"
                aria-label={`پیش‌نمایش زنده شیشه ترکیب ${blendName}`}
              >
                <defs>
                  <clipPath id="jarInteriorClip">
                    <rect x="64" y="64" width="112" height="134" rx="18" />
                  </clipPath>
                </defs>

                {/* Wax Seal & Cork Lid */}
                <rect
                  x="84"
                  y="24"
                  width="72"
                  height="20"
                  rx="5"
                  fill={alchemyStats.dominantColor}
                />
                <rect
                  x="76"
                  y="42"
                  width="88"
                  height="14"
                  rx="4"
                  fill="#27221E"
                  stroke="rgba(246,239,230,0.25)"
                />

                {/* Jar Body Outline */}
                <rect
                  x="60"
                  y="56"
                  width="120"
                  height="148"
                  rx="22"
                  fill="#120F16"
                  stroke="rgba(246,239,230,0.35)"
                  strokeWidth="2"
                />

                {/* Stratified Spice Powder Layers */}
                <g clipPath="url(#jarInteriorClip)">
                  {normalizedComponents.map(({ spice, percentage }) => {
                    const heightPx = (percentage / 100) * 134;
                    accumulatedY -= heightPx;
                    return (
                      <rect
                        key={spice.slug}
                        x="64"
                        y={accumulatedY}
                        width="112"
                        height={heightPx + 1}
                        fill={spice.primary_color}
                        fillOpacity="0.86"
                      />
                    );
                  })}
                </g>

                {/* Engraved Front Label */}
                <rect
                  x="72"
                  y="94"
                  width="96"
                  height="64"
                  rx="6"
                  fill="rgba(9, 8, 7, 0.88)"
                  stroke={alchemyStats.dominantColor}
                  strokeWidth="1.2"
                />
                <text
                  x="120"
                  y="112"
                  textAnchor="middle"
                  fill="#C8BCA9"
                  className="font-mono text-[7px] tracking-widest"
                >
                  ZARVAN BESPOKE LAB
                </text>
                <text
                  x="120"
                  y="130"
                  textAnchor="middle"
                  fill="#F6EFE6"
                  className="text-[10px] font-bold"
                >
                  {blendName.slice(0, 18)}
                </text>
                <text
                  x="120"
                  y="146"
                  textAnchor="middle"
                  fill={alchemyStats.dominantColor}
                  className="text-[8px]"
                >
                  BY: {creatorName.slice(0, 16)}
                </text>
              </svg>
            </div>

            {/* Real-Time Sensory Output */}
            <div className="space-y-3 border-t border-white/10 pt-5">
              <div className="text-xs font-bold text-parchment mb-2">
                پروفایل حسی ترکیب نهایی شما:
              </div>

              {[
                { label: "گرمی و طبع", val: alchemyStats.sensory.warmth },
                { label: "شدت عطر فرّار", val: alchemyStats.sensory.aroma_intensity },
                { label: "تندی و حرارت", val: alchemyStats.sensory.pungency },
                { label: "لطافت گلی", val: alchemyStats.sensory.floral_sweetness },
              ].map((row) => (
                <div key={row.label} className="space-y-1">
                  <div className="flex justify-between text-xs text-sand">
                    <span>{row.label}</span>
                    <span className="font-bold text-parchment">
                      {toPersianDigits(row.val)}٪
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${row.val}%`,
                        backgroundColor: alchemyStats.dominantColor,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
