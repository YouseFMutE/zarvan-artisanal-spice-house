"use client";

import React, { useEffect, useRef } from "react";

interface SpiceParticleCanvasProps {
  primaryColor: string;
  secondaryColor: string;
  particleColor: string;
  burstTrigger: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  spin: number;
  shape: "thread" | "crystal" | "pollen";
  colorType: 0 | 1 | 2;
  alpha: number;
}

export default function SpiceParticleCanvas({
  primaryColor,
  secondaryColor,
  particleColor,
  burstTrigger,
}: SpiceParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorsRef = useRef({ primaryColor, secondaryColor, particleColor });
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, active: false });

  useEffect(() => {
    colorsRef.current = { primaryColor, secondaryColor, particleColor };
  }, [primaryColor, secondaryColor, particleColor]);

  // Burst impulse when user switches spice or triggers mortar crush
  useEffect(() => {
    if (burstTrigger === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width * 0.5;
    const cy = canvas.height * 0.48;

    particlesRef.current.forEach((p) => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const dist = Math.max(40, Math.hypot(dx, dy));
      const force = Math.min(14, 900 / dist);
      p.vx += (dx / dist) * force + (Math.random() - 0.5) * 3;
      p.vy += (dy / dist) * force + (Math.random() - 0.5) * 3;
      p.spin = (Math.random() - 0.5) * 0.14;
    });
  }, [burstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const count = prefersReducedMotion ? 28 : Math.min(95, Math.floor((width * height) / 14500));

    const createParticles = () => {
      const arr: Particle[] = [];
      const shapes: Particle["shape"][] = ["pollen", "crystal", "thread"];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.65,
          vy: (Math.random() - 0.5) * 0.55 - 0.15,
          size: Math.random() * 4.2 + 1.4,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.025,
          shape: shapes[i % shapes.length],
          colorType: (i % 3) as 0 | 1 | 2,
          alpha: Math.random() * 0.55 + 0.2,
        });
      }
      particlesRef.current = arr;
    };

    createParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let lastMouseX = 0;
    let lastMouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.vx = e.clientX - lastMouseX;
      mouseRef.current.vy = e.clientY - lastMouseY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const { primaryColor: c0, secondaryColor: c1, particleColor: c2 } =
        colorsRef.current;
      const palette = [c0, c1, c2];

      for (const p of particlesRef.current) {
        if (!prefersReducedMotion) {
          // Mouse vortex interaction
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const distSq = dx * dx + dy * dy;
            const radius = 190;
            if (distSq < radius * radius && distSq > 4) {
              const dist = Math.sqrt(distSq);
              const factor = (1 - dist / radius) * 0.35;
              // Tangential swirl + gentle push
              p.vx += (-dy / dist) * factor + mouseRef.current.vx * 0.004;
              p.vy += (dx / dist) * factor + mouseRef.current.vy * 0.004;
            }
          }

          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.spin;

          // Damping back to gentle drift
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.vy -= 0.0035; // Slight upward warm air convection

          if (Math.abs(p.vx) < 0.15) p.vx += (Math.random() - 0.5) * 0.04;

          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) p.y = height + 30;
          if (p.y > height + 30) p.y = -30;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        const color = palette[p.colorType];
        ctx.fillStyle = color;
        ctx.strokeStyle = color;

        if (p.shape === "thread") {
          // Saffron / root filament
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(-p.size * 2.3, 0);
          ctx.quadraticCurveTo(0, -p.size * 1.4, p.size * 2.3, 0.5);
          ctx.stroke();
        } else if (p.shape === "crystal") {
          // Crushed spice crystal
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.9, 0);
          ctx.lineTo(0, p.size * 1.1);
          ctx.lineTo(-p.size * 0.85, 0.2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Aromatic pollen glow
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.78, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      mouseRef.current.vx *= 0.9;
      mouseRef.current.vy *= 0.9;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-75"
      aria-hidden="true"
    />
  );
}
