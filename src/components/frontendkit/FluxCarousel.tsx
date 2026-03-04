"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

// DATA-DRIVEN : Transformation de l'article du Fraser Institute en KPIs
const MINING_DATA = [
  {
    id: 1,
    title: "ATTRACTIVITÉ_2025",
    value: 60.9,
    unit: "PTS",
    label: "GLOBAL_RANKING",
    notes: ["Top 5 Afrique", "1er UEMOA"],
    status: "active",
  },
  {
    id: 2,
    title: "PROGRESSION_SCORE",
    value: 5.2,
    unit: "+",
    label: "GROWTH_INDEX",
    notes: ["vs 55.70 en 2023", "Redressement Net"],
    status: "active",
  },
  {
    id: 3,
    title: "BENCHMARK_GHANA",
    value: 5.7,
    unit: "Δ",
    label: "REGIONAL_LEAD",
    notes: ["Leadership repris", "Cadre stable"],
    status: "active",
  },
  {
    id: 4,
    title: "POSITION_MONDIALE",
    value: 47,
    unit: "th",
    label: "GLOBAL_SCOPE",
    notes: ["68 Juridictions", "Signal Marchés"],
    status: "syncing",
  },
];

export default function FluxCarousel() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 30;
    if (info.offset.x < -threshold && index < MINING_DATA.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center font-sans transition-colors duration-500">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[300px] md:max-w-[450px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {MINING_DATA.map((item, i) => (
            <Card key={item.id} item={item} position={i - index} />
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-10 flex gap-2">
        {MINING_DATA.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[1.5px] transition-all duration-700",
              index === i
                ? "w-12 bg-[var(--foreground)]"
                : "w-3 bg-[var(--foreground)] opacity-20"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ item, position }: { item: any; position: number }) {
  const isActive = position === 0;
  const counterRef = useRef<HTMLHeadingElement>(null);
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768
      ? window.innerWidth * 0.45
      : 480;

  useEffect(() => {
    if (isActive && counterRef.current) {
      const controls = animate(0, item.value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          if (counterRef.current) counterRef.current.textContent = v.toFixed(1);
        },
      });
      return () => controls.stop();
    }
  }, [item.value, isActive]);

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * xOffset,
        rotateY: position * -30,
        z: isActive ? 0 : -400,
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.8,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 25 }}
      className={cn(
        "absolute w-[80vw] md:w-[420px] h-auto min-h-[320px] p-10 flex flex-col justify-between overflow-hidden transition-all duration-700",
        "backdrop-blur-[40px] border border-[var(--foreground)]/15", // Bordure plus marquée
        isActive
          ? "shadow-[0_40px_100px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(16,185,129,0.05)] bg-[var(--foreground)]/[0.04]"
          : "bg-transparent border-none"
      )}
      style={{ borderRadius: "var(--radius-vercel, 14px)" }}
    >
      <div
        className={cn(
          "absolute top-[12px] right-[12px] h-2 w-2 rounded-full transition-all duration-1000",
          isActive
            ? "bg-emerald-500 shadow-[0_0_15px_#10b981]"
            : "bg-[var(--foreground)] opacity-0"
        )}
      />

      {/* HEADER : Lisibilité renforcée (Opacity 0.6) */}
      <div className="relative z-10 flex justify-between items-start">
        <p className="text-[11px] font-black tracking-[0.5em] uppercase text-[var(--foreground)] opacity-60">
          {item.label}
        </p>
      </div>

      {/* CONTENT : Hiérarchie visuelle décisionnelle */}
      <div className="relative z-10 mt-6">
        <h3 className="text-[13px] font-black uppercase text-[var(--foreground)] tracking-[0.3em] mb-5 opacity-80">
          {item.title}
        </h3>
        <div className="flex flex-col gap-3">
          {item.notes.map((note: string, idx: number) => (
            <p
              key={idx}
              className="text-[12px] font-mono text-[var(--foreground)] opacity-50 italic pl-4 border-l-2 border-[var(--foreground)]/20"
            >
              {note}
            </p>
          ))}
        </div>
      </div>

      {/* COMPTEUR : Impact maximal */}
      <div className="relative z-10 flex items-baseline gap-2 mt-auto pt-10">
        <h2
          ref={counterRef}
          className="text-7xl md:text-8xl font-black italic text-[var(--foreground)] tracking-tighter leading-none"
        >
          0.0
        </h2>
        <span className="text-2xl font-bold opacity-30 italic text-[var(--foreground)] uppercase">
          {item.unit}
        </span>
      </div>

      <div className="relative z-10 flex justify-between items-end pt-6 text-[11px] font-mono opacity-30 text-[var(--foreground)] tracking-[0.4em] uppercase">
        <span>CI_EXTRACTIVE_{item.id}</span>
        <span>2026</span>
      </div>
    </motion.div>
  );
}
