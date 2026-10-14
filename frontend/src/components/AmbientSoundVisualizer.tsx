"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AmbientSoundVisualizerProps {
  accentColor: string;
  warmthScore: number;
}

export default function AmbientSoundVisualizer({
  accentColor,
  warmthScore,
}: AmbientSoundVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const harmonicOscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Update frequency subtly when active spice warmth changes
  useEffect(() => {
    if (!isPlaying || !audioCtxRef.current || !oscRef.current || !harmonicOscRef.current) {
      return;
    }
    const now = audioCtxRef.current.currentTime;
    const baseFreq = 98 + (warmthScore / 100) * 48; // Warm harmonic drone between 98Hz and 146Hz
    oscRef.current.frequency.setTargetAtTime(baseFreq, now, 0.4);
    harmonicOscRef.current.frequency.setTargetAtTime(baseFreq * 1.5, now, 0.4);
  }, [warmthScore, isPlaying]);

  const toggleSound = () => {
    if (isPlaying) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.25
        );
      }
      setTimeout(() => {
        oscRef.current?.stop();
        harmonicOscRef.current?.stop();
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
      }, 300);
      setIsPlaying(false);
      return;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      const baseFreq = 98 + (warmthScore / 100) * 48;
      osc1.type = "sine";
      osc1.frequency.value = baseFreq;

      osc2.type = "triangle";
      osc2.frequency.value = baseFreq * 1.5;

      filter.type = "lowpass";
      filter.frequency.value = 340;

      gain.gain.value = 0.001;
      gain.gain.setTargetAtTime(0.035, ctx.currentTime, 0.6);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      audioCtxRef.current = ctx;
      oscRef.current = osc1;
      harmonicOscRef.current = osc2;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      data-cursor={isPlaying ? "سکوت" : "آوا"}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "خاموش کردن صدای محیطی" : "پخش فرکانس صوتی کارگاه ادویه"}
      className="group relative flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-sand hover:border-white/25 hover:text-parchment transition-all cursor-pointer"
    >
      <span className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
        {[0.5, 1, 0.7, 0.9, 0.6].map((scale, idx) => (
          <span
            key={idx}
            className="w-[2px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: isPlaying ? accentColor : "rgba(200,188,169,0.45)",
              height: isPlaying ? `${Math.max(4, scale * 14)}px` : "4px",
              animation: isPlaying
                ? `pulse ${0.7 + idx * 0.18}s ease-in-out infinite alternate`
                : "none",
            }}
          />
        ))}
      </span>
      <span className="hidden sm:inline font-medium">
        {isPlaying ? "فرکانس حسی فعال" : "آوای کارگاه"}
      </span>
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5" style={{ color: accentColor }} aria-hidden="true" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
      )}
    </button>
  );
}
