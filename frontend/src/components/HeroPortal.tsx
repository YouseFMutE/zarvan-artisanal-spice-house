"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Compass,
  Flame,
  Wind,
  Mountain,
  ShoppingBag,
  ArrowDownLeft,
  FlaskConical,
} from "lucide-react";
import { Spice } from "@/types/spice";
import { formatPersianPrice, toPersianDigits } from "@/lib/fallbackData";

interface HeroPortalProps {
  spices: Spice[];
  activeSpice: Spice;
  onSelectSpice: (spice: Spice) => void;
  onTriggerBurst: () => void;
  onAddToCart: (spice: Spice) => void;
}

export default function HeroPortal({
  spices,
  activeSpice,
  onSelectSpice,
  onTriggerBurst,
  onAddToCart,
}: HeroPortalProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [aromaPulse, setAromaPulse] = useState(0);

  const handleVesselMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: ny * -16, y: nx * 16 });
  };

  const handleVesselMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleCrushAction = () => {
    setAromaPulse((p) => p + 1);
    onTriggerBurst();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 px-4 sm:px-8 lg:px-14 flex flex-col justify-between overflow-hidden"
    >
      {/* Dynamic Ambient Radial Spotlight tied to Active Spice */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at 30% 42%, ${activeSpice.primary_color}22 0%, transparent 52%),
            radial-gradient(circle at 75% 65%, ${activeSpice.secondary_color}26 0%, transparent 48%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Editorial Telemetry Bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs text-sand/80">
        <div className="flex items-center gap-3">
          <span
            className="inline-block w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: activeSpice.primary_color }}
          />
          <span className="font-mono tracking-widest uppercase text-[11px] text-parchment/90">
            {activeSpice.code} // {activeSpice.scientific_name}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] tracking-wider text-sand/75">
          <span>COORD: {activeSpice.origin_coordinates}</span>
          <span>ALT: {activeSpice.altitude_meters}M</span>
          <span>VOLATILITY: {activeSpice.aroma_intensity}%</span>
        </div>

        <div className="text-xs text-sand/90 flex items-center gap-2">
          <Compass
            className="w-3.5 h-3.5"
            style={{ color: activeSpice.primary_color }}
            aria-hidden="true"
          />
          <span>خاستگاه: {activeSpice.origin_region}</span>
        </div>
      </div>

      {/* Main Split Interactive Stage */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Right Column (in RTL): Editorial Typography & Narrative */}
        <div className="lg:col-span-7 space-y-6 text-right">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
            <Sparkles
              className="w-3.5 h-3.5"
              style={{ color: activeSpice.primary_color }}
              aria-hidden="true"
            />
            <span className="text-xs font-medium tracking-wide text-parchment/90">
              کلکسیون برداشت محدود ۱۴۰۵ — دست‌چین و آسیاب سنگی سرد
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpice.slug}
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className="font-editorial italic text-lg sm:text-2xl text-sand/80 tracking-wide">
                {activeSpice.name_en}
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.14] text-parchment">
                {activeSpice.name_fa}
              </h1>

              <p
                className="text-base sm:text-xl font-medium leading-relaxed max-w-2xl"
                style={{ color: activeSpice.particle_color }}
              >
                «{activeSpice.tagline}»
              </p>

              <p className="text-sm sm:text-base text-sand/85 leading-8 max-w-2xl font-normal">
                {activeSpice.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Aroma Notes Pills */}
          <div className="pt-1">
            <div className="text-xs text-sand/60 mb-2.5">
              نت‌های بویایی غالب (Olfactory Notes):
            </div>
            <div className="flex flex-wrap gap-2">
              {activeSpice.aroma_notes.map((note, idx) => (
                <span
                  key={note + idx}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs text-parchment/90 transition-colors"
                  style={{
                    borderColor: `${activeSpice.primary_color}40`,
                  }}
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Sensory Telemetry Bars */}
          <div className="grid grid-cols-3 gap-4 max-w-xl pt-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-sand/70 mb-1.5">
                <span>گرمی و طبع</span>
                <Flame
                  className="w-3.5 h-3.5"
                  style={{ color: activeSpice.primary_color }}
                  aria-hidden="true"
                />
              </div>
              <div className="text-lg font-bold text-parchment">
                {toPersianDigits(activeSpice.warmth)}٪
              </div>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: activeSpice.primary_color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${activeSpice.warmth}%` }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-sand/70 mb-1.5">
                <span>شدت عطر فرّار</span>
                <Wind
                  className="w-3.5 h-3.5"
                  style={{ color: activeSpice.particle_color }}
                  aria-hidden="true"
                />
              </div>
              <div className="text-lg font-bold text-parchment">
                {toPersianDigits(activeSpice.aroma_intensity)}٪
              </div>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: activeSpice.particle_color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${activeSpice.aroma_intensity}%` }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-sand/70 mb-1.5">
                <span>ارتفاع رویشگاه</span>
                <Mountain
                  className="w-3.5 h-3.5"
                  style={{ color: activeSpice.primary_color }}
                  aria-hidden="true"
                />
              </div>
              <div className="text-lg font-bold text-parchment">
                {toPersianDigits(activeSpice.altitude_meters)}{" "}
                <span className="text-xs font-normal text-sand">متر</span>
              </div>
              <div className="mt-2 text-[11px] text-sand/70 truncate">
                {activeSpice.harvest_season}
              </div>
            </div>
          </div>

          {/* Primary Interactive Actions */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onAddToCart(activeSpice)}
              data-cursor="افزودن"
              className="group relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-bold text-obsidian transition-transform active:scale-95 cursor-pointer shadow-lg"
              style={{
                backgroundColor: activeSpice.primary_color,
                boxShadow: `0 12px 40px -10px ${activeSpice.primary_color}80`,
              }}
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span>
                سفارش شیشه ضدِفوتون ({formatPersianPrice(activeSpice.price_toman)}{" "}
                تومان)
              </span>
            </button>

            <button
              type="button"
              onClick={handleCrushAction}
              data-cursor="سایش!"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.09] px-6 py-4 text-sm font-medium text-parchment transition-all cursor-pointer"
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: activeSpice.particle_color }}
                aria-hidden="true"
              />
              <span>آزادسازی موج عطر در فضا</span>
            </button>

            <a
              href="#alchemy-lab"
              data-cursor="کیمیاگری"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-4 text-xs font-medium text-sand hover:text-parchment hover:border-white/25 transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" aria-hidden="true" />
              <span>ورود به آزمایشگاه ترکیب</span>
              <ArrowDownLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Left Column (in RTL): 3D Interactive Botanical Astrolabe & Mortar */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div
            onMouseMove={handleVesselMouseMove}
            onMouseLeave={handleVesselMouseLeave}
            onClick={handleCrushAction}
            data-cursor="کوبش عطر"
            role="button"
            tabIndex={0}
            aria-label="ظرف کیمیاگری ادویه — برای آزادسازی ذرات عطر کلیک کنید"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCrushAction();
              }
            }}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 180ms ease-out",
            }}
            className="relative w-[310px] h-[310px] sm:w-[410px] sm:h-[410px] flex items-center justify-center cursor-pointer select-none"
          >
            {/* Expanding Aroma Shockwave Ring on Click */}
            <AnimatePresence>
              {aromaPulse > 0 && (
                <motion.div
                  key={aromaPulse}
                  initial={{ scale: 0.45, opacity: 0.85 }}
                  animate={{ scale: 2.1, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.15, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-12 rounded-full border-2"
                  style={{ borderColor: activeSpice.particle_color }}
                />
              )}
            </AnimatePresence>

            {/* Outer Rotating Astrolabe SVG */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full animate-slow-spin"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="spiceCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    stopColor={activeSpice.particle_color}
                    stopOpacity="0.55"
                  />
                  <stop
                    offset="55%"
                    stopColor={activeSpice.primary_color}
                    stopOpacity="0.22"
                  />
                  <stop
                    offset="100%"
                    stopColor={activeSpice.secondary_color}
                    stopOpacity="0"
                  />
                </radialGradient>
              </defs>

              <circle cx="200" cy="200" r="185" fill="url(#spiceCoreGlow)" />
              <circle
                cx="200"
                cy="200"
                r="182"
                fill="none"
                stroke="rgba(246,239,230,0.12)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx="200"
                cy="200"
                r="152"
                fill="none"
                stroke={activeSpice.primary_color}
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              {/* Botanical Geometric Star */}
              <polygon
                points="200,32 238,145 355,145 260,214 296,328 200,258 104,328 140,214 45,145 162,145"
                fill="none"
                stroke={activeSpice.primary_color}
                strokeOpacity="0.2"
                strokeWidth="1"
              />
            </svg>

            {/* Counter-Rotating Inner Sacred Geometry */}
            <svg
              viewBox="0 0 300 300"
              className="absolute inset-10 w-[calc(100%-5rem)] h-[calc(100%-5rem)] animate-slow-spin-reverse"
              aria-hidden="true"
            >
              <circle
                cx="150"
                cy="150"
                r="122"
                fill="none"
                stroke={activeSpice.particle_color}
                strokeOpacity="0.32"
                strokeDasharray="16 10 2 10"
                strokeWidth="1.5"
              />
              <rect
                x="65"
                y="65"
                width="170"
                height="170"
                rx="24"
                fill="none"
                stroke="rgba(246,239,230,0.1)"
                strokeWidth="1"
                transform="rotate(45 150 150)"
              />
            </svg>

            {/* Central Biophotonic Spice Core */}
            <motion.div
              key={activeSpice.slug}
              initial={{ scale: 0.84, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-white/20 bg-charcoal/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center shadow-2xl"
              style={{
                boxShadow: `0 0 90px -10px ${activeSpice.primary_color}66, inset 0 0 40px ${activeSpice.secondary_color}55`,
              }}
            >
              {/* Botanical Mandala Iconography */}
              <svg
                viewBox="0 0 120 120"
                className="w-20 h-20 mb-2"
                aria-hidden="true"
              >
                <g
                  fill="none"
                  stroke={activeSpice.particle_color}
                  strokeWidth="1.8"
                >
                  <path d="M60 12 C72 36, 72 84, 60 108 C48 84, 48 36, 60 12 Z" />
                  <path d="M12 60 C36 72, 84 72, 108 60 C84 48, 36 48, 12 60 Z" />
                  <path d="M26 26 C50 42, 78 70, 94 94 C70 78, 42 50, 26 26 Z" />
                  <path d="M94 26 C78 50, 50 78, 26 94 C42 70, 70 42, 94 26 Z" />
                  <circle
                    cx="60"
                    cy="60"
                    r="12"
                    fill={activeSpice.primary_color}
                  />
                </g>
              </svg>

              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-sand/70">
                {activeSpice.code} // SPECIMEN
              </span>
              <span className="text-sm font-bold text-parchment mt-1">
                {activeSpice.name_fa}
              </span>
              <span
                className="mt-2 text-[11px] font-medium px-3 py-0.5 rounded-full border"
                style={{
                  borderColor: `${activeSpice.primary_color}60`,
                  color: activeSpice.particle_color,
                  backgroundColor: `${activeSpice.primary_color}15`,
                }}
              >
                کلیک برای سایش در هاون
              </span>
            </motion.div>
          </div>

          <p className="mt-3 text-xs text-sand/65 text-center">
            موس را روی اسطرلاب حرکت دهید یا برای پراکنش ذرات عطر کلیک کنید
          </p>
        </div>
      </div>

      {/* Bottom Interactive Spice Selector Dock */}
      <div className="relative z-10 max-w-7xl w-full mx-auto pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-sand/80">
            انتخاب ادویه فعال (تغییر اتمسفر، رنگ و ذرات معلق):
          </span>
          <span className="font-mono text-[11px] text-sand/60">
            0{activeSpice.order} / 0{spices.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {spices.map((spice) => {
            const isSelected = spice.slug === activeSpice.slug;
            return (
              <button
                key={spice.slug}
                type="button"
                onClick={() => onSelectSpice(spice)}
                data-cursor="بوئیدن"
                aria-pressed={isSelected}
                className={`group relative text-right rounded-2xl border p-3 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.08] border-white/30 shadow-lg"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] text-sand/70">
                    {spice.code}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                    style={{
                      backgroundColor: spice.primary_color,
                      boxShadow: isSelected
                        ? `0 0 12px ${spice.primary_color}`
                        : "none",
                    }}
                  />
                </div>
                <div className="text-xs font-bold text-parchment truncate">
                  {spice.name_fa}
                </div>
                <div className="text-[10px] text-sand/65 truncate mt-0.5">
                  {spice.origin_region}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
