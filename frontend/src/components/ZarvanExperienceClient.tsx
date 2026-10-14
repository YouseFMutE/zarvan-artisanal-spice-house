"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  CartItem,
  ExperienceBootstrapPayload,
  Spice,
} from "@/types/spice";
import {
  fetchExperienceBootstrap,
  toPersianDigits,
} from "@/lib/fallbackData";
import MagneticCursor from "./MagneticCursor";
import SpiceParticleCanvas from "./SpiceParticleCanvas";
import AmbientSoundVisualizer from "./AmbientSoundVisualizer";
import HeroPortal from "./HeroPortal";
import KineticMarquee from "./KineticMarquee";
import ScrollStorytelling from "./ScrollStorytelling";
import SpiceAtlasSection from "./SpiceAtlasSection";
import AlchemyLabSection from "./AlchemyLabSection";
import TerroirMapSection from "./TerroirMapSection";
import SlideOverCart from "./SlideOverCart";
import { ShoppingBag, Sparkles, ArrowUp } from "lucide-react";

interface ZarvanExperienceClientProps {
  initialData: ExperienceBootstrapPayload;
  initialIsLiveApi: boolean;
}

export default function ZarvanExperienceClient({
  initialData,
  initialIsLiveApi,
}: ZarvanExperienceClientProps) {
  const [data, setData] = useState<ExperienceBootstrapPayload>(initialData);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(initialIsLiveApi);
  const [activeSpice, setActiveSpice] = useState<Spice>(
    initialData.spices[0]
  );
  const [burstTrigger, setBurstTrigger] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Client-side refresh from Django API if server render happened while backend was booting
  useEffect(() => {
    if (!initialIsLiveApi) {
      fetchExperienceBootstrap().then((res) => {
        if (res.isLiveApi) {
          setData(res.data);
          setIsLiveApi(true);
          if (res.data.spices[0]) {
            setActiveSpice(res.data.spices[0]);
          }
        }
      });
    }
  }, [initialIsLiveApi]);

  const handleSelectSpice = (spice: Spice) => {
    setActiveSpice(spice);
    setBurstTrigger((prev) => prev + 1);
  };

  const handleAddSpiceToCart = (spice: Spice) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === spice.slug);
      if (existing) {
        return prev.map((i) =>
          i.id === spice.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: spice.slug,
          title: spice.name_fa,
          subtitle: `${spice.origin_region} — ${toPersianDigits(
            spice.weight_grams
          )} گرم`,
          code: spice.code,
          color: spice.primary_color,
          price_toman: spice.price_toman,
          weight_grams: spice.weight_grams,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleAddCustomBlendToCart = (customItem: CartItem) => {
    setCartItems((prev) => [...prev, customItem]);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="relative min-h-screen bg-obsidian text-parchment editorial-grid-bg selection:bg-saffron/30">
      {/* Subtle Analog Film & Spice Dust Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[60] grain-overlay"
        aria-hidden="true"
      />

      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          backgroundColor: activeSpice.primary_color,
          transformOrigin: "right",
        }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[95]"
      />

      {/* Custom Magnetic Cursor */}
      <MagneticCursor accentColor={activeSpice.primary_color} />

      {/* Interactive Spice Particle Physics Canvas */}
      <SpiceParticleCanvas
        primaryColor={activeSpice.primary_color}
        secondaryColor={activeSpice.secondary_color}
        particleColor={activeSpice.particle_color}
        burstTrigger={burstTrigger}
      />

      {/* Floating Glassmorphic Header */}
      <header className="fixed top-4 inset-x-4 sm:inset-x-8 lg:inset-x-14 z-[80]">
        <nav
          aria-label="ناوبری اصلی زَروان"
          className="max-w-7xl mx-auto rounded-full border border-white/15 bg-obsidian/80 backdrop-blur-xl px-4 sm:px-7 py-3 flex items-center justify-between gap-4 shadow-2xl"
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            data-cursor="خانه"
            className="flex items-center gap-3 group"
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center font-editorial font-bold text-obsidian text-base transition-transform group-hover:rotate-45"
              style={{ backgroundColor: activeSpice.primary_color }}
            >
              Z
            </span>
            <div className="leading-none">
              <span className="text-lg font-black tracking-tight text-parchment block">
                زَروان
              </span>
              <span className="font-mono text-[9px] tracking-[0.28em] text-sand/70 uppercase">
                ZARVAN ALCHEMY
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-medium text-sand/85">
            <a
              href="#storytelling"
              className="hover:text-parchment transition-colors"
            >
              روایت خاک تا عطر
            </a>
            <a href="#atlas" className="hover:text-parchment transition-colors">
              اطلس حسی ادویه‌ها
            </a>
            <a
              href="#alchemy-lab"
              className="hover:text-parchment transition-colors"
            >
              آزمایشگاه ترکیب
            </a>
            <a
              href="#terroir-map"
              className="hover:text-parchment transition-colors"
            >
              نقشه خاستگاه‌ها
            </a>
          </div>

          {/* Right HUD Controls: API Status, Soundscape & Cart */}
          <div className="flex items-center gap-2.5">
            <div
              className="hidden xl:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] text-sand/75"
              title={
                isLiveApi
                  ? "متصل به بک‌اند Django REST Framework"
                  : "اجرای مستقل با آرشیو داخلی"
              }
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLiveApi ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span>{isLiveApi ? "DJANGO API LIVE" : "ARCHIVE READY"}</span>
            </div>

            <AmbientSoundVisualizer
              accentColor={activeSpice.primary_color}
              warmthScore={activeSpice.warmth}
            />

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              data-cursor="سبد"
              aria-label={`باز کردن سبد خرید (${toPersianDigits(
                totalCartCount
              )} قلم)`}
              className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/10 px-4 py-1.5 text-xs font-bold text-parchment transition-all cursor-pointer"
            >
              <ShoppingBag
                className="w-3.5 h-3.5"
                style={{ color: activeSpice.primary_color }}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">صندوقچه</span>
              <span
                className="w-5 h-5 rounded-full text-[11px] font-black text-obsidian flex items-center justify-center"
                style={{ backgroundColor: activeSpice.primary_color }}
              >
                {toPersianDigits(totalCartCount)}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Sections */}
      <main>
        <HeroPortal
          spices={data.spices}
          activeSpice={activeSpice}
          onSelectSpice={handleSelectSpice}
          onTriggerBurst={() => setBurstTrigger((p) => p + 1)}
          onAddToCart={handleAddSpiceToCart}
        />

        <KineticMarquee accentColor={activeSpice.primary_color} />

        <ScrollStorytelling chapters={data.story_chapters} />

        <SpiceAtlasSection
          spices={data.spices}
          onAddToCart={handleAddSpiceToCart}
          onFocusSpice={handleSelectSpice}
        />

        <AlchemyLabSection
          spices={data.spices}
          onAddCustomBlendToCart={handleAddCustomBlendToCart}
          onTriggerBurst={() => setBurstTrigger((p) => p + 1)}
        />

        <TerroirMapSection origins={data.terroir_origins} />
      </main>

      {/* Grand Editorial Footer */}
      <footer className="relative z-10 py-20 px-4 sm:px-8 lg:px-14 bg-charcoal/90 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-saffron">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>ZARVAN ARTISANAL SPICE HOUSE // EST. 1405</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-parchment leading-tight">
                زَروان؛ کیمیاگری عطر، خاک و زمان
              </h2>
              <p className="text-sm sm:text-base text-sand/80 max-w-2xl leading-8">
                ما باور داریم ادویه تنها یک چاشنی نیست؛ بلکه فشرده‌ترین روایت
                جغرافیا، آفتاب و دست‌های کسانی است که در گرگ‌ومیش صبح به‌پیشواز
                برداشت می‌روند.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href="#hero"
                data-cursor="بالا"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/10 px-6 py-4 text-xs font-bold text-parchment transition-all"
              >
                <span>بازگشت به اسطرلاب عطر</span>
                <ArrowUp className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-sand/60 font-mono">
            <span>
              © 2026 ZARVAN BOTANICAL ARCHIVE — POWERED BY DJANGO & NEXT.JS
            </span>
            <span>AWWWARDS EXPERIMENTAL SENSORY EDITION</span>
          </div>
        </div>
      </footer>

      {/* Slide-Over Cart Drawer */}
      <SlideOverCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        accentColor={activeSpice.primary_color}
      />
    </div>
  );
}
