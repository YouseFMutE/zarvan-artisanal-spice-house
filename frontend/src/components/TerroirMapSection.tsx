"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerroirOrigin } from "@/types/spice";
import { Compass, CloudSun, Layers, Sparkles } from "lucide-react";

interface TerroirMapSectionProps {
  origins: TerroirOrigin[];
}

export default function TerroirMapSection({ origins }: TerroirMapSectionProps) {
  const [activeOrigin, setActiveOrigin] = useState<TerroirOrigin>(origins[0]);

  if (!activeOrigin) return null;

  return (
    <section
      id="terroir-map"
      className="relative z-10 py-28 px-4 sm:px-8 lg:px-14 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="font-mono text-xs tracking-[0.28em] uppercase text-saffron mb-2">
              BOTANICAL CARTOGRAPHY // SINGLE-ORIGIN TERROIRS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-parchment leading-tight">
              اطلس جغرافیایی خاستگاه‌ها و اقلیم‌ها
            </h2>
          </div>
          <p className="text-sm text-sand/80 max-w-md leading-7">
            روی هر مختصات جغرافیایی کلیک کنید تا ترکیب خاک، اقلیم کوهستانی و
            گونه شاخص آن منطقه را کاوش کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive SVG Topographic Cartography Canvas (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-charcoal/90 p-5 sm:p-8 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-sand/70 mb-4">
              <span>TERROIR TELEMETRY RADAR // IRANIAN PLATEAU & SILK SEA</span>
              <span style={{ color: activeOrigin.color }}>
                ACTIVE: {activeOrigin.code} ({activeOrigin.coordinates})
              </span>
            </div>

            <div className="relative aspect-[16/10] w-full rounded-2xl border border-white/10 bg-obsidian/80 overflow-hidden">
              <svg
                viewBox="0 0 800 500"
                className="w-full h-full"
                role="img"
                aria-label="نقشه تعاملی خاستگاه‌های ادویه زَروان"
              >
                {/* Coordinate Grid Lines */}
                {[100, 200, 300, 400, 500, 600, 700].map((x) => (
                  <line
                    key={`vx-${x}`}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={500}
                    stroke="rgba(246,239,230,0.04)"
                    strokeWidth="1"
                  />
                ))}
                {[100, 200, 300, 400].map((y) => (
                  <line
                    key={`hy-${y}`}
                    x1={0}
                    y1={y}
                    x2={800}
                    y2={y}
                    stroke="rgba(246,239,230,0.04)"
                    strokeWidth="1"
                  />
                ))}

                {/* Stylized Topographic Landmass Contours */}
                <path
                  d="M 110 95 Q 240 65, 380 120 T 620 185 Q 700 245, 720 420 Q 520 440, 390 355 T 140 240 Z"
                  fill="rgba(246,239,230,0.025)"
                  stroke="rgba(246,239,230,0.14)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <path
                  d="M 190 130 Q 310 110, 450 165 T 590 280 Q 460 340, 310 265 Z"
                  fill="rgba(229,152,25,0.03)"
                  stroke="rgba(229,152,25,0.18)"
                  strokeWidth="1"
                />

                {/* Trajectory Arcs from Central Kashan Atelier to Origins */}
                {origins.map((origin) => {
                  const x = (origin.map_x / 100) * 800;
                  const y = (origin.map_y / 100) * 500;
                  const hubX = (46 / 100) * 800;
                  const hubY = (46 / 100) * 500;
                  const isCurrent = origin.code === activeOrigin.code;
                  return (
                    <path
                      key={`arc-${origin.code}`}
                      d={`M ${hubX} ${hubY} Q ${(hubX + x) / 2} ${
                        Math.min(hubY, y) - 45
                      } ${x} ${y}`}
                      fill="none"
                      stroke={origin.color}
                      strokeOpacity={isCurrent ? 0.85 : 0.22}
                      strokeWidth={isCurrent ? 2.2 : 1}
                      strokeDasharray={isCurrent ? "none" : "4 4"}
                    />
                  );
                })}

                {/* Interactive Origin Beacons */}
                {origins.map((origin) => {
                  const x = (origin.map_x / 100) * 800;
                  const y = (origin.map_y / 100) * 500;
                  const isCurrent = origin.code === activeOrigin.code;

                  return (
                    <g
                      key={origin.code}
                      onClick={() => setActiveOrigin(origin)}
                      className="cursor-pointer"
                    >
                      {isCurrent && (
                        <circle
                          cx={x}
                          cy={y}
                          r="28"
                          fill={origin.color}
                          fillOpacity="0.22"
                          stroke={origin.color}
                          strokeWidth="1.5"
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isCurrent ? 10 : 7}
                        fill={origin.color}
                        stroke="#090807"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={y - 16}
                        textAnchor="middle"
                        fill="#F6EFE6"
                        className="text-[12px] font-bold"
                      >
                        {origin.name_fa}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Origin Pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {origins.map((origin) => {
                const active = origin.code === activeOrigin.code;
                return (
                  <button
                    key={origin.code}
                    type="button"
                    onClick={() => setActiveOrigin(origin)}
                    className={`rounded-full px-3.5 py-1.5 text-xs transition-all cursor-pointer flex items-center gap-2 ${
                      active
                        ? "bg-white/15 text-parchment font-bold border border-white/30"
                        : "bg-white/[0.03] text-sand/75 border border-white/10 hover:text-parchment"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: origin.color }}
                    />
                    <span>{origin.name_fa}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Origin Dossier Card (5 Cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOrigin.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/15 bg-charcoal/95 p-7 sm:p-9 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs px-3 py-1 rounded-full border"
                    style={{
                      borderColor: `${activeOrigin.color}50`,
                      color: activeOrigin.color,
                    }}
                  >
                    {activeOrigin.code} // {activeOrigin.name_en}
                  </span>
                  <span className="font-mono text-xs text-sand/70">
                    {activeOrigin.coordinates}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-parchment">
                    {activeOrigin.name_fa}
                  </h3>
                  <p className="text-sm text-sand/85 leading-8 mt-3">
                    {activeOrigin.description}
                  </p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-5">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-obsidian/50 p-3.5">
                    <Sparkles
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: activeOrigin.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-[11px] text-sand/65">
                        گونه شاخص منطقه:
                      </div>
                      <div className="text-sm font-bold text-parchment">
                        {activeOrigin.signature_spice}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-obsidian/50 p-3.5">
                    <CloudSun
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: activeOrigin.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-[11px] text-sand/65">
                        میکروکلمای اقلیمی:
                      </div>
                      <div className="text-xs font-medium text-parchment">
                        {activeOrigin.climate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-obsidian/50 p-3.5">
                    <Layers
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: activeOrigin.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-[11px] text-sand/65">
                        ساختار کانی و خاک:
                      </div>
                      <div className="text-xs font-medium text-parchment">
                        {activeOrigin.soil_type}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
