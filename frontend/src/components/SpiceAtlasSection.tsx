"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spice } from "@/types/spice";
import { formatPersianPrice, toPersianDigits } from "@/lib/fallbackData";
import {
  ShoppingBag,
  Sparkles,
  Utensils,
  Eye,
  Layers,
  MapPin,
} from "lucide-react";

interface SpiceAtlasSectionProps {
  spices: Spice[];
  onAddToCart: (spice: Spice) => void;
  onFocusSpice: (spice: Spice) => void;
}

const CATEGORIES = [
  { id: "all", label: "همه گونه‌ها" },
  { id: "floral", label: "گلی و زعفرانی" },
  { id: "citrus", label: "ترش و کوهستانی" },
  { id: "aromatic", label: "معطر و شرقی" },
  { id: "earthy", label: "خاکی و ریشه‌ای" },
  { id: "fiery", label: "آتشین و دودی" },
  { id: "blend", label: "ترکیب دست‌ساز" },
];

const RADAR_AXES: { key: keyof Spice; label: string }[] = [
  { key: "warmth", label: "گرمی" },
  { key: "pungency", label: "تندی" },
  { key: "aroma_intensity", label: "شدت عطر" },
  { key: "earthiness", label: "خاکی" },
  { key: "floral_sweetness", label: "گلی" },
  { key: "smokiness", label: "دودی" },
];

function computeRadarPoints(spice: Spice, radius = 92, cx = 130, cy = 130) {
  return RADAR_AXES.map((axis, idx) => {
    const val = Number(spice[axis.key] || 50) / 100;
    const angle = (Math.PI * 2 * idx) / RADAR_AXES.length - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius * val;
    const y = cy + Math.sin(angle) * radius * val;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

export default function SpiceAtlasSection({
  spices,
  onAddToCart,
  onFocusSpice,
}: SpiceAtlasSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [inspectedSpice, setInspectedSpice] = useState<Spice>(spices[0]);
  const [compareSpice, setCompareSpice] = useState<Spice | null>(
    spices[1] || null
  );

  const filteredSpices =
    selectedCategory === "all"
      ? spices
      : spices.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="atlas"
      className="relative z-10 py-28 px-4 sm:px-8 lg:px-14 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header & Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-saffron mb-2">
              SENSORY BOTANICAL ATLAS // 3D SPECIMENS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-parchment leading-tight">
              اطلس حسی و کالکشن ادویه‌ها
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="فیلتر دسته‌بندی ادویه‌ها"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat.id)}
                  data-cursor="فیلتر"
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-parchment text-obsidian font-bold shadow-md"
                      : "border border-white/10 bg-white/[0.03] text-sand hover:border-white/25 hover:text-parchment"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredSpices.map((spice) => {
              const isInspected = inspectedSpice?.slug === spice.slug;
              return (
                <motion.article
                  layout
                  key={spice.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    setInspectedSpice(spice);
                    onFocusSpice(spice);
                  }}
                  data-cursor="کالبدشکافی عطر"
                  className={`group relative rounded-3xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
                    isInspected
                      ? "border-white/35 bg-white/[0.06] shadow-2xl"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Top Color Aura */}
                  <div
                    className="pointer-events-none absolute -top-20 -left-20 w-52 h-52 rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity"
                    style={{ backgroundColor: spice.primary_color }}
                    aria-hidden="true"
                  />

                  <div>
                    {/* Top Row: Code + Batch Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs tracking-widest text-sand/75">
                        {spice.code} // {spice.scientific_name}
                      </span>
                      <span
                        className="rounded-full px-3 py-0.5 text-[11px] font-medium border"
                        style={{
                          borderColor: `${spice.primary_color}50`,
                          color: spice.particle_color,
                          backgroundColor: `${spice.primary_color}18`,
                        }}
                      >
                        موجودی: {toPersianDigits(spice.limited_batch)} شیشه
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl font-black text-parchment mb-1">
                      {spice.name_fa}
                    </h3>
                    <div className="font-editorial italic text-sm text-sand/70 mb-3">
                      {spice.name_en}
                    </div>

                    <p className="text-xs sm:text-sm text-sand/85 leading-7 line-clamp-3 mb-5">
                      {spice.description}
                    </p>

                    {/* Origin & Weight */}
                    <div className="flex items-center justify-between text-xs text-sand/75 border-y border-white/10 py-3 mb-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin
                          className="w-3.5 h-3.5"
                          style={{ color: spice.primary_color }}
                          aria-hidden="true"
                        />
                        {spice.origin_region}
                      </span>
                      <span>وزن خالص: {toPersianDigits(spice.weight_grams)} گرم</span>
                    </div>

                    {/* Aroma Notes */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {spice.aroma_notes.map((note) => (
                        <span
                          key={note}
                          className="rounded-lg bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] text-parchment/85"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Price & Actions */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[11px] text-sand/60">
                        شیشه بنفش ضدِفوتون
                      </span>
                      <span className="text-lg font-black text-parchment">
                        {formatPersianPrice(spice.price_toman)}{" "}
                        <span className="text-xs font-normal text-sand">
                          تومان
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedSpice(spice);
                          onFocusSpice(spice);
                          document
                            .getElementById("sensory-radar-dock")
                            ?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        aria-label={`مشاهده رادار حسی ${spice.name_fa}`}
                        className="rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 p-3 text-parchment transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(spice);
                        }}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-obsidian transition-transform active:scale-95 cursor-pointer"
                        style={{ backgroundColor: spice.primary_color }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>افزودن</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Interactive 6-Axis Sensory Radar & Ritual Inspector Dock */}
        {inspectedSpice && (
          <div
            id="sensory-radar-dock"
            className="rounded-3xl border border-white/15 bg-charcoal/95 p-6 sm:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Right Column: Ritual Note, Pairings & Comparison Selector */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-saffron">
                      OLFACTORY RADAR & RITUAL GUIDE // {inspectedSpice.code}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black text-parchment mt-1">
                      کالبدشکافی حسی: {inspectedSpice.name_fa}
                    </h3>
                  </div>

                  {/* Compare Selector */}
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sand/70" aria-hidden="true" />
                    <label
                      htmlFor="compare-spice-select"
                      className="text-xs text-sand/80"
                    >
                      مقایسه روی رادار با:
                    </label>
                    <select
                      id="compare-spice-select"
                      value={compareSpice?.slug || "none"}
                      onChange={(e) => {
                        const found =
                          spices.find((s) => s.slug === e.target.value) || null;
                        setCompareSpice(found);
                      }}
                      className="rounded-xl border border-white/15 bg-obsidian px-3 py-1.5 text-xs text-parchment focus:outline-none focus:border-saffron"
                    >
                      <option value="none">بدون مقایسه</option>
                      {spices
                        .filter((s) => s.slug !== inspectedSpice.slug)
                        .map((s) => (
                          <option key={s.slug} value={s.slug}>
                            {s.name_fa}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Ritual Guide Box */}
                <div
                  className="rounded-2xl border p-5 bg-white/[0.02]"
                  style={{ borderColor: `${inspectedSpice.primary_color}45` }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold mb-2" style={{ color: inspectedSpice.particle_color }}>
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>آیین پیشنهادی مصرف و آزادسازی اسانس (Alchemist Ritual):</span>
                  </div>
                  <p className="text-sm text-parchment/90 leading-7">
                    {inspectedSpice.ritual_note}
                  </p>
                </div>

                {/* Culinary Pairings */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-sand mb-3">
                    <Utensils className="w-4 h-4 text-saffron" aria-hidden="true" />
                    <span>بهترین هم‌نشینی‌های خوراکی (Culinary Pairings):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {inspectedSpice.pairings.map((pairing) => (
                      <div
                        key={pairing}
                        className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs text-parchment"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: inspectedSpice.primary_color }}
                        />
                        <span>{pairing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Left Column: 6-Axis SVG Hexagonal Radar Chart */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 260 260"
                  className="w-64 h-64 sm:w-72 sm:h-72 overflow-visible"
                  role="img"
                  aria-label={`نمودار راداری عطر و طعم ${inspectedSpice.name_fa}`}
                >
                  {/* Concentric Hexagon Grids */}
                  {[0.25, 0.5, 0.75, 1].map((scale) => {
                    const ringPoints = RADAR_AXES.map((_, idx) => {
                      const angle =
                        (Math.PI * 2 * idx) / RADAR_AXES.length - Math.PI / 2;
                      const x = 130 + Math.cos(angle) * 92 * scale;
                      const y = 130 + Math.sin(angle) * 92 * scale;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    }).join(" ");
                    return (
                      <polygon
                        key={scale}
                        points={ringPoints}
                        fill="none"
                        stroke="rgba(246,239,230,0.12)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Axis Spokes & Labels */}
                  {RADAR_AXES.map((axis, idx) => {
                    const angle =
                      (Math.PI * 2 * idx) / RADAR_AXES.length - Math.PI / 2;
                    const x2 = 130 + Math.cos(angle) * 92;
                    const y2 = 130 + Math.sin(angle) * 92;
                    const lx = 130 + Math.cos(angle) * 116;
                    const ly = 130 + Math.sin(angle) * 116;

                    return (
                      <g key={String(axis.key)}>
                        <line
                          x1="130"
                          y1="130"
                          x2={x2}
                          y2={y2}
                          stroke="rgba(246,239,230,0.12)"
                          strokeWidth="1"
                        />
                        <text
                          x={lx}
                          y={ly + 4}
                          textAnchor="middle"
                          fill="#F6EFE6"
                          className="text-[11px] font-bold"
                        >
                          {axis.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Secondary Comparison Spice Polygon */}
                  {compareSpice && (
                    <polygon
                      points={computeRadarPoints(compareSpice)}
                      fill={compareSpice.primary_color}
                      fillOpacity="0.18"
                      stroke={compareSpice.particle_color}
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                    />
                  )}

                  {/* Primary Inspected Spice Polygon */}
                  <polygon
                    points={computeRadarPoints(inspectedSpice)}
                    fill={inspectedSpice.primary_color}
                    fillOpacity="0.34"
                    stroke={inspectedSpice.particle_color}
                    strokeWidth="2.5"
                  />
                </svg>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-5 mt-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: inspectedSpice.primary_color }}
                    />
                    <span className="font-bold text-parchment">
                      {inspectedSpice.name_fa}
                    </span>
                  </div>
                  {compareSpice && (
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full border border-dashed"
                        style={{
                          backgroundColor: `${compareSpice.primary_color}55`,
                          borderColor: compareSpice.particle_color,
                        }}
                      />
                      <span className="text-sand">{compareSpice.name_fa}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
