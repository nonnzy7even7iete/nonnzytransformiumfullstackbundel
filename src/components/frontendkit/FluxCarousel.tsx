"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  {
    id: 1,
    title: "BUDGET_2026",
    value: 84.2,
    unit: "K",
    label: "FINANCIAL_DATA",
    notes: ["Initial allocation", "Q1 Projection"],
  },
  {
    id: 2,
    title: "MARKETING_EXP",
    value: 12.4,
    unit: "K",
    label: "GROWTH_SYNC",
    notes: ["Social Ads", "SEO Strategy"],
  },
  {
    id: 3,
    title: "R&D_COSTS",
    value: 450.0,
    unit: "€",
    label: "INNOVATION",
    notes: ["New Engine", "Security Audit", "Beta Testing"],
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
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center font-sans transition-colors duration-500">
      {/* 1. Zone de Capture (Geste) */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      {/* 2. Scène 3D */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[320px] md:max-w-[450px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA.map((item, i) => (
            <Card key={item.id} item={item} position={i - index} />
          ))}
        </motion.div>
      </div>

      {/* 3. Pagination */}
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

/**
 * COMPOSANT CARD (Centralise toutes les animations)
 */
function Card({ item, position }: { item: any; position: number }) {
  const isActive = position === 0;
  const counterRef = useRef<HTMLHeadingElement>(null);

  // Calcul de la distance mobile
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768
      ? window.innerWidth * 0.55
      : 480;

  // Animation du compteur interne
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
    <>
      {/* Injection locale de l'animation des pointillés */}
      <style>{`
        @keyframes border-dance {
          0% { background-position: 0px 0px, 100% 100%, 0px 100%, 100% 0px; }
          100% { background-position: 20px 0px, 100% -20px, -20px 100%, 100% 20px; }
        }
        .v-dashed-active {
          background-image: 
            linear-gradient(90deg, var(--foreground) 50%, transparent 50%),
            linear-gradient(90deg, var(--foreground) 50%, transparent 50%),
            linear-gradient(0deg, var(--foreground) 50%, transparent 50%),
            linear-gradient(0deg, var(--foreground) 50%, transparent 50%);
          background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
          background-size: 15px 1px, 15px 1px, 1px 15px, 1px 15px;
          animation: border-dance 0.8s infinite linear;
        }
      `}</style>

      <motion.div
        initial={false}
        animate={{
          x: position * xOffset,
          rotateY: position * -45,
          z: isActive ? 0 : -350,
          opacity: isActive ? 1 : 0.3,
          scale: isActive ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
        className={cn(
          "v-card absolute w-[65vw] md:w-[420px] h-auto min-h-[280px] p-8 md:p-10 flex flex-col justify-between overflow-hidden",
          "backdrop-blur-md transition-all duration-500",
          isActive
            ? "v-dashed-active shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            : "border-[var(--border-color)]"
        )}
        style={
          { backgroundColor: "var(--card-bg-glass, rgba(0,0,0,0.3))" } as any
        }
      >
        {/* HEADER */}
        <div className="relative z-10 flex justify-between items-start mb-6">
          <p className="text-[9px] font-black tracking-[0.4em] opacity-40 uppercase text-[var(--foreground)]">
            {item.label}
          </p>
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isActive
                ? "bg-emerald-500 shadow-[0_0_12px_#10b981]"
                : "bg-[var(--accents-2)]"
            )}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col mb-8">
          <h3 className="text-[10px] font-bold opacity-60 uppercase text-[var(--foreground)] tracking-widest mb-3">
            {item.title}
          </h3>
          <div className="flex flex-col gap-1.5">
            {item.notes.map((note: string, idx: number) => (
              <p
                key={idx}
                className="text-[9px] font-mono text-[var(--foreground)] opacity-30 border-l border-[var(--border-color)] pl-3"
              >
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* COMPTEUR INTERNE */}
        <div className="relative z-10 flex items-baseline gap-1 mt-auto">
          <h2
            ref={counterRef}
            className="text-5xl md:text-7xl font-black italic text-[var(--foreground)] tracking-tighter leading-none"
          >
            0.0
          </h2>
          <span className="text-xl font-bold opacity-20 italic text-[var(--foreground)] uppercase">
            {item.unit}
          </span>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 flex justify-between items-end border-t border-[var(--border-color)]/30 pt-4 mt-6">
          <p className="text-[8px] font-mono opacity-20 text-[var(--foreground)]">
            V.2026_PROTOCOL
          </p>
        </div>
      </motion.div>
    </>
  );
}
