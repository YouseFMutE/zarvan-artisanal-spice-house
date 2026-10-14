"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "@/types/spice";
import { formatPersianPrice, toPersianDigits } from "@/lib/fallbackData";
import {
  X,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

interface SlideOverCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  accentColor: string;
}

export default function SlideOverCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  accentColor,
}: SlideOverCartProps) {
  const [orderCompleted, setOrderCompleted] = useState(false);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price_toman * item.quantity,
    0
  );

  const handleCheckout = () => {
    setOrderCompleted(true);
    setTimeout(() => {
      onClearCart();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label="سبد خرید و کلکسیون شیشه‌های زَروان"
            className="fixed top-0 left-0 bottom-0 z-[110] w-full max-w-md bg-charcoal border-r border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag
                    className="w-5 h-5"
                    style={{ color: accentColor }}
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="text-lg font-black text-parchment">
                      صندوقچه شیشه‌های زَروان
                    </h2>
                    <span className="font-mono text-[10px] text-sand/65">
                      BIOPHOTONIC VIOLET GLASS ARCHIVE
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOrderCompleted(false);
                    onClose();
                  }}
                  aria-label="بستن سبد خرید"
                  className="rounded-full border border-white/15 p-2 text-sand hover:text-parchment hover:border-white/30 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Cart Items or Empty / Completed State */}
              {orderCompleted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2
                    className="w-14 h-14 mx-auto text-emerald-400"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-black text-parchment">
                    سفارش شما در کارگاه زَروان ثبت شد
                  </h3>
                  <p className="text-xs sm:text-sm text-sand/80 leading-7">
                    شیشه‌های انتخابی شما در نوبت آسیاب سنگی سرد (زیر ۲۲ درجه) و
                    مهروموم موم طبیعی قرار گرفتند.
                  </p>
                  <div className="font-mono text-xs text-saffron pt-2">
                    SEAL CODE // ZRV-{Math.floor(10000 + Math.random() * 89999)}
                  </div>
                </div>
              ) : items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Sparkles
                    className="w-10 h-10 mx-auto text-sand/40"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-bold text-parchment">
                    صندوقچه شما هنوز خالی است
                  </p>
                  <p className="text-xs text-sand/70 leading-6">
                    از اطلس حسی ادویه‌ها یا آزمایشگاه کیمیاگری، شیشه مورد نظر
                    خود را انتخاب کنید.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[58vh] overflow-y-auto pl-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-obsidian/70 p-4 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <div className="text-sm font-bold text-parchment">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-sand/70">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`حذف ${item.title}`}
                          className="text-sand/50 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label="کاهش تعداد"
                            className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center text-parchment hover:bg-white/10 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" aria-hidden="true" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center">
                            {toPersianDigits(item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label="افزایش تعداد"
                            className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center text-parchment hover:bg-white/10 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="text-xs font-bold text-parchment">
                          {formatPersianPrice(item.price_toman * item.quantity)}{" "}
                          تومان
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Checkout */}
            {items.length > 0 && !orderCompleted && (
              <div className="border-t border-white/10 pt-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sand">مجموع کلکسیون:</span>
                  <span className="text-xl font-black text-parchment">
                    {formatPersianPrice(totalPrice)} تومان
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full rounded-full py-4 text-sm font-black text-obsidian transition-transform active:scale-95 cursor-pointer"
                  style={{ backgroundColor: accentColor }}
                >
                  تایید و مهروموم سفارش در کارگاه
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
