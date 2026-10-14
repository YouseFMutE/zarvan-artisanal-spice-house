"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StoryChapter } from "@/types/spice";
import { Compass, Sparkles, Disc, ShieldCheck } from "lucide-react";

interface ScrollStorytellingProps {
  chapters: StoryChapter[];
}

export default function ScrollStorytelling({
  chapters,
}: ScrollStorytellingProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((node, idx) => {
      if (!node) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(idx);
            }
          });
        },
        {
          rootMargin: "-30% 0px -35% 0px",
          threshold: 0.25,
        }
      );
      obs.observe(node);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [chapters]);

  const currentChapter = chapters[activeIndex] || chapters[0];
  if (!currentChapter) return null;

  return (
    <section
      id="storytelling"
      className="relative z-10 py-28 px-4 sm:px-8 lg:px-14 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-saffron mb-2">
              INTERACTIVE CHRONICLE // 04 ACTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-parchment leading-tight">
              از معماری خاک تا شیشه‌های ضدِفوتون
            </h2>
          </div>
          <p className="text-sm sm:text-base text-sand/80 max-w-md leading-7">
            با اسکرول در چهار پرده زیر، سفر کیمیاگرانه هر دانه ادویه را از
            صخره‌های مه‌آلود تا هاون سنگی سرد زَروان دنبال کنید.
          </p>
        </div>

        {/* Sticky Interactive Stage + Scrollable Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Visualizer Stage (5 Columns on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              className="relative rounded-3xl border border-white/15 bg-charcoal/90 p-6 sm:p-8 overflow-hidden transition-colors duration-700"
              style={{
                boxShadow: `0 25px 90px -20px ${currentChapter.ambient_color}45`,
              }}
            >
              {/* Ambient Glow */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 transition-colors duration-700"
                style={{ backgroundColor: currentChapter.ambient_color }}
                aria-hidden="true"
              />

              {/* Top Chapter Progress Pills */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  {chapters.map((ch, idx) => (
                    <button
                      key={ch.chapter_number}
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        cardRefs.current[idx]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className={`px-3 py-1 rounded-full font-mono text-xs transition-all cursor-pointer ${
                        idx === activeIndex
                          ? "bg-white/15 text-parchment font-bold border border-white/30"
                          : "bg-white/[0.03] text-sand/60 hover:text-parchment"
                      }`}
                    >
                      {ch.roman_numeral}
                    </button>
                  ))}
                </div>

                <span
                  className="font-mono text-[11px] px-2.5 py-1 rounded-full border"
                  style={{
                    borderColor: `${currentChapter.ambient_color}50`,
                    color: currentChapter.accent_color,
                  }}
                >
                  ACT 0{currentChapter.chapter_number} / 04
                </span>
              </div>

              {/* Generative Chapter Artwork */}
              <div className="relative z-10 h-64 sm:h-72 flex items-center justify-center my-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChapter.chapter_number}
                    initial={{ opacity: 0, scale: 0.88, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.92, rotate: 6 }}
                    transition={{ duration: 0.55 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {currentChapter.chapter_number === 1 && (
                      <svg
                        viewBox="0 0 320 240"
                        className="w-full h-full"
                        aria-hidden="true"
                      >
                        {/* Topographic Mountain Contours */}
                        {[0, 1, 2, 3, 4].map((layer) => (
                          <path
                            key={layer}
                            d={`M 20 ${195 - layer * 22} Q 95 ${
                              90 - layer * 14
                            }, 165 ${140 - layer * 18} T 300 ${
                              175 - layer * 24
                            }`}
                            fill="none"
                            stroke={currentChapter.ambient_color}
                            strokeOpacity={0.3 + layer * 0.14}
                            strokeWidth="2"
                          />
                        ))}
                        <circle
                          cx="165"
                          cy="76"
                          r="26"
                          fill={currentChapter.ambient_color}
                          fillOpacity="0.22"
                          stroke={currentChapter.accent_color}
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="165"
                          cy="76"
                          r="5"
                          fill={currentChapter.accent_color}
                        />
                      </svg>
                    )}

                    {currentChapter.chapter_number === 2 && (
                      <svg
                        viewBox="0 0 320 240"
                        className="w-full h-full"
                        aria-hidden="true"
                      >
                        {/* Dawn Horizon & Three Crimson Saffron Stigmas */}
                        <circle
                          cx="160"
                          cy="170"
                          r="68"
                          fill={currentChapter.ambient_color}
                          fillOpacity="0.22"
                        />
                        <line
                          x1="30"
                          y1="170"
                          x2="290"
                          y2="170"
                          stroke="rgba(246,239,230,0.2)"
                          strokeDasharray="4 6"
                        />
                        <path
                          d="M160 170 C140 120, 115 80, 95 45"
                          fill="none"
                          stroke={currentChapter.accent_color}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M160 170 C160 110, 162 72, 160 32"
                          fill="none"
                          stroke={currentChapter.ambient_color}
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M160 170 C180 120, 205 80, 225 45"
                          fill="none"
                          stroke={currentChapter.accent_color}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}

                    {currentChapter.chapter_number === 3 && (
                      <svg
                        viewBox="0 0 320 240"
                        className="w-full h-full"
                        aria-hidden="true"
                      >
                        {/* Cold Granite Millstone */}
                        <g className="origin-center animate-slow-spin">
                          <circle
                            cx="160"
                            cy="120"
                            r="84"
                            fill="none"
                            stroke={currentChapter.ambient_color}
                            strokeWidth="2"
                            strokeDasharray="12 6"
                          />
                          {[0, 30, 60, 90, 120, 150].map((deg) => (
                            <line
                              key={deg}
                              x1="160"
                              y1="38"
                              x2="160"
                              y2="202"
                              stroke={currentChapter.accent_color}
                              strokeOpacity="0.28"
                              strokeWidth="1.5"
                              transform={`rotate(${deg} 160 120)`}
                            />
                          ))}
                        </g>
                        <circle
                          cx="160"
                          cy="120"
                          r="28"
                          fill="#090807"
                          stroke={currentChapter.accent_color}
                          strokeWidth="2"
                        />
                        <text
                          x="160"
                          y="125"
                          textAnchor="middle"
                          fill={currentChapter.accent_color}
                          className="font-mono text-xs"
                        >
                          22°C
                        </text>
                      </svg>
                    )}

                    {currentChapter.chapter_number === 4 && (
                      <svg
                        viewBox="0 0 320 240"
                        className="w-full h-full"
                        aria-hidden="true"
                      >
                        {/* Biophotonic Apothecary Jar */}
                        <rect
                          x="122"
                          y="34"
                          width="76"
                          height="22"
                          rx="6"
                          fill={currentChapter.ambient_color}
                        />
                        <rect
                          x="104"
                          y="58"
                          width="112"
                          height="146"
                          rx="22"
                          fill="rgba(20, 14, 28, 0.85)"
                          stroke={currentChapter.accent_color}
                          strokeWidth="2"
                        />
                        <rect
                          x="118"
                          y="96"
                          width="84"
                          height="70"
                          rx="8"
                          fill="rgba(246,239,230,0.06)"
                          stroke="rgba(246,239,230,0.25)"
                        />
                        <circle
                          cx="160"
                          cy="131"
                          r="14"
                          fill={currentChapter.ambient_color}
                        />
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Telemetry Footer inside Sticky Card */}
              <div className="relative z-10 border-t border-white/10 pt-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-sand/65">
                    {currentChapter.metric_label}
                  </div>
                  <div
                    className="text-lg font-black mt-0.5"
                    style={{ color: currentChapter.accent_color }}
                  >
                    {currentChapter.metric_value}
                  </div>
                </div>
                <div className="text-left font-mono text-[11px] text-sand/70">
                  {currentChapter.location_badge}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Chapters List (7 Columns on Desktop) */}
          <div className="lg:col-span-7 space-y-10">
            {chapters.map((chapter, idx) => {
              const isActive = idx === activeIndex;
              const Icons = [Compass, Sparkles, Disc, ShieldCheck];
              const IconComp = Icons[idx % Icons.length];

              return (
                <div
                  key={chapter.chapter_number}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveIndex(idx)}
                  data-cursor={`پرده ${chapter.roman_numeral}`}
                  className={`rounded-3xl border p-7 sm:p-10 transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "border-white/30 bg-white/[0.05] shadow-2xl"
                      : "border-white/10 bg-white/[0.015] opacity-65 hover:opacity-95"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-2xl flex items-center justify-center font-editorial font-bold text-lg"
                        style={{
                          backgroundColor: `${chapter.ambient_color}25`,
                          color: chapter.accent_color,
                          border: `1px solid ${chapter.ambient_color}50`,
                        }}
                      >
                        {chapter.roman_numeral}
                      </span>
                      <div>
                        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-sand/70 block">
                          {chapter.title_en}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-parchment">
                          {chapter.title_fa}
                        </h3>
                      </div>
                    </div>

                    <IconComp
                      className="w-6 h-6"
                      style={{ color: chapter.ambient_color }}
                      aria-hidden="true"
                    />
                  </div>

                  <p
                    className="text-sm sm:text-base font-semibold mb-4"
                    style={{ color: chapter.accent_color }}
                  >
                    {chapter.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-sand/85 leading-8 mb-6">
                    {chapter.narrative}
                  </p>

                  <blockquote
                    className="rounded-2xl border-r-4 bg-obsidian/60 p-4 text-xs sm:text-sm italic text-parchment/90"
                    style={{ borderColor: chapter.ambient_color }}
                  >
                    {chapter.sensory_quote}
                  </blockquote>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
