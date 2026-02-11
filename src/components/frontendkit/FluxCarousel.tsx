"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  {
    id: 1,
    title: "BUDGET_2026",
    value: 84.2,
    unit: "K",
    label: "FINANCIAL_FLUX",
    notes: ["Initial allocation", "Q1 Projection", "Buffer added"], // Notes qui feront grandir la carte
  },
  {
    id: 2,
    title: "MARKETING_EXP",
    value: 12.4,
    unit: "K",
    label: "GROWTH_SYNC",
    notes: ["Social Ads", "SEO"],
  },
  {
    id: 3,
    title: "R&D_COSTS",
    value: 450,
    unit: "€",
    label: "INNOVATION",
    notes: [
      "New Engine",
      "Cloud Infrastructure",
      "Security Audit",
      "Beta Testing",
    ], // Carte très grande
  },
];

export default function FluxCarousel() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 30;
    if (info.offset.x < -threshold && index < DATA.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center font-sans">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[320px] md:max-w-[450px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA.map((item, i) => {
            const position = i - index;
            if (Math.abs(position) > 1) return null;
            return <Card key={item.id} item={item} position={position} />;
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-10 flex gap-2">
        {DATA.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-0.5 rounded-full transition-all duration-500",
              index === i
                ? "w-8 bg-[var(--foreground)]"
                : "w-2 bg-[var(--accents-2)]"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ item, position }: { item: any; position: number }) {
  const isActive = position === 0;
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768
      ? window.innerWidth * 0.55
      : 480;

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * xOffset,
        rotateY: position * -45,
        z: isActive ? 0 : -350,
        opacity: isActive ? 1 : 0.2,
        scale: isActive ? 1 : 0.7,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      style={
        {
          backgroundColor: isActive
            ? "rgba(16, 185, 129, 0.04)"
            : "var(--card-bg)",
        } as any
      }
      // "h-auto" permet à la carte de grandir selon les notes
      className={cn(
        "v-card absolute w-[65vw] md:w-[420px] h-auto min-h-[260px] p-6 md:p-10 flex flex-col justify-between transition-all duration-500",
        isActive ? "border-[var(--foreground)]" : "border-[var(--border-color)]"
      )}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <p className="text-[9px] font-black tracking-[0.3em] opacity-30 uppercase text-[var(--foreground)]">
          {item.label}
        </p>
        <div
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            isActive
              ? "bg-emerald-500 shadow-[0_0_8px_#10b981]"
              : "bg-[var(--accents-2)]"
          )}
        />
      </div>

      {/* TITRE ET NOTES (La zone qui pousse le contenu) */}
      <div className="flex flex-col mb-6">
        <h3 className="text-[11px] font-bold opacity-50 uppercase text-[var(--foreground)] tracking-widest mb-2">
          {item.title}
        </h3>

        <div className="flex flex-col gap-1">
          {item.notes.map((note: string, idx: number) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isActive ? 0.3 : 0, x: isActive ? 0 : -10 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="text-[9px] font-mono text-[var(--foreground)] border-l border-[var(--border-color)] pl-2 italic"
            >
              • {note}
            </motion.p>
          ))}
        </div>
      </div>

      {/* COMPTEUR (S'adapte à l'espace restant) */}
      <div className="flex items-baseline gap-1 mt-auto">
        <Counter value={item.value} isActive={isActive} />
        <span className="text-lg font-bold opacity-20 italic text-[var(--foreground)] uppercase">
          {item.unit}
        </span>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-end border-t border-[var(--border-color)] pt-4 mt-6">
        <p className="text-[8px] font-mono opacity-20 text-[var(--foreground)] tracking-[0.2em]">
          PROTOCOL_V.26
        </p>
        <p className="text-[8px] font-mono opacity-20 text-[var(--foreground)] tracking-[0.2em]">
          #{item.id}
        </p>
      </div>
    </motion.div>
  );
}

function Counter({ value, isActive }: { value: number; isActive: boolean }) {
  const nodeRef = React.useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isActive && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          if (nodeRef.current) nodeRef.current.textContent = v.toFixed(1);
        },
      });
      return () => controls.stop();
    }
  }, [value, isActive]);

  return (
    <h2
      ref={nodeRef}
      className="text-5xl md:text-7xl font-black italic text-[var(--foreground)] tracking-tighter leading-none transition-all"
    >
      0.0
    </h2>
  );
}
