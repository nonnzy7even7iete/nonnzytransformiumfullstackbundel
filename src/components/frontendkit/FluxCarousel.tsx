"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  {
    id: 1,
    title: "ALPHA_FLUX",
    value: "84.2",
    unit: "%",
    label: "PRIMARY_NODE",
  },
  { id: 2, title: "DATA_CORE", value: "12.4", unit: "K", label: "SYNC_STATUS" },
  { id: 3, title: "LATENCY", value: "0.4", unit: "MS", label: "ZERO_POINT" },
  { id: 4, title: "LIQUIDITY", value: "450", unit: "K", label: "FLOW_RATE" },
  { id: 5, title: "STABILITY", value: "99.9", unit: "%", label: "ENCRYPTED" },
];

export default function FluxCarousel() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold && index < DATA.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    // Utilisation de var(--background) pour le support dark/light
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center font-sans transition-colors duration-500">
      {/* Zone de Capture */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-[450px] h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA.map((item, i) => {
            const position = i - index;
            if (Math.abs(position) > 1) return null;

            return <Card key={item.id} item={item} position={position} />;
          })}
        </motion.div>
      </div>

      {/* Pagination basée sur var(--foreground) */}
      <div className="absolute bottom-10 flex items-center gap-4 z-[110]">
        <div className="flex gap-2">
          {DATA.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-0.5 transition-all duration-500",
                index === i
                  ? "w-10 bg-[var(--foreground)]"
                  : "w-2 bg-[var(--accents-2)]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ item, position }: { item: any; position: number }) {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * 460,
        rotateY: position * -35,
        z: isActive ? 0 : -250,
        opacity: isActive ? 1 : 0.05, // On baisse l'opacité des cartes sur les côtés
        scale: isActive ? 1 : 0.85,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 25 }}
      // Appel de la classe .v-card définie dans ton CSS
      className={cn(
        "v-card absolute w-[400px] h-[300px] p-10 flex flex-col justify-between",
        isActive ? "border-[var(--foreground)]" : "border-[var(--border-color)]"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase text-[var(--foreground)]">
            {item.label}
          </p>
        </div>
        <div
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-500",
            isActive
              ? "bg-[var(--foreground)] shadow-[0_0_10px_var(--foreground)]"
              : "bg-[var(--accents-2)]"
          )}
        />
      </div>

      <div className="flex items-baseline gap-1">
        <h2 className="text-8xl font-black italic text-[var(--foreground)] tracking-tighter leading-none">
          {item.value}
        </h2>
        <span className="text-2xl font-bold opacity-20 italic text-[var(--foreground)]">
          {item.unit}
        </span>
      </div>

      <div className="flex justify-between items-end border-t border-[var(--border-color)] pt-6">
        <p className="text-[11px] font-bold opacity-40 tracking-[0.3em] uppercase text-[var(--foreground)]">
          {item.title}
        </p>
        <p className="text-[9px] font-mono opacity-20 text-[var(--foreground)] uppercase">
          v.2026
        </p>
      </div>
    </motion.div>
  );
}
