"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticCursorProps {
  accentColor: string;
}

export default function MagneticCursor({ accentColor }: MagneticCursorProps) {
  const [enabled, setEnabled] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 380, damping: 28, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 380, damping: 28, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReduced) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttrEl = target.closest("[data-cursor]") as HTMLElement | null;
      const interactiveEl = target.closest("button, a, input, select, [role='button']");

      if (cursorAttrEl) {
        setCursorLabel(cursorAttrEl.getAttribute("data-cursor") || "");
        setIsHovered(true);
      } else if (interactiveEl) {
        setCursorLabel("");
        setIsHovered(true);
      } else {
        setCursorLabel("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden hidden lg:block"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isHovered ? accentColor : "rgba(246, 239, 230, 0.28)",
          backgroundColor: cursorLabel
            ? "rgba(9, 8, 7, 0.82)"
            : isHovered
            ? `${accentColor}18`
            : "transparent",
        }}
        animate={{
          width: cursorLabel ? 84 : isHovered ? 48 : 30,
          height: cursorLabel ? 84 : isHovered ? 48 : 30,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="fixed top-0 left-0 rounded-full border backdrop-blur-[2px] flex items-center justify-center transition-colors duration-200"
      >
        {cursorLabel ? (
          <span
            className="text-[11px] font-medium tracking-wide px-2 text-center leading-tight"
            style={{ color: accentColor }}
          >
            {cursorLabel}
          </span>
        ) : (
          <span
            className="w-1.5 h-1.5 rounded-full transition-transform duration-200"
            style={{
              backgroundColor: accentColor,
              transform: isHovered ? "scale(1.5)" : "scale(1)",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
