"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  { id: 1, title: "ALPHA_FLUX", value: 84.2, unit: "%", label: "PRIMARY_NODE" },
  { id: 2, title: "DATA_CORE", value: 12.4, unit: "K", label: "SYNC_STATUS" },
  { id: 3, title: "LATENCY", value: 0.4, unit: "MS", label: "ZERO_POINT" },
  { id: 4, title: "LIQUIDITY", value: 450, unit: "K", label: "FLOW_RATE" },
  { id: 5, title: "STABILITY", value: 99.9, unit: "%", label: "ENCRYPTED" },
];

export default function FluxCarousel() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 30; // Swipe plus sensible pour mobile
    if (info.offset.x < -threshold && index < DATA.length - 1)
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
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[400px] h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA.map((item, i) => {
            const position = i - index;
            if (Math.abs(position) > 1) return null;
            return <Card key={item.id} item={item} position={position} />;
          })}
        </motion.div>
      </div>

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

  // Calcul MOBILE : On réduit la largeur à 70vw et le xOffset à 65vw pour "serrer" les cartes
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768
      ? window.innerWidth * 0.65
      : 440;

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * xOffset,
        rotateY: position * -40, // Rotation plus agressive pour voir les tranches
        z: isActive ? 0 : -250,
        opacity: isActive ? 1 : 0.2, // Légèrement plus d'opacité pour les cartes floues
        scale: isActive ? 1 : 0.75,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
      style={
        {
          backgroundColor: isActive
            ? "rgba(16, 185, 129, 0.04)"
            : "var(--card-bg)",
        } as any
      }
      className={cn(
        "v-card absolute w-[70vw] md:w-[400px] h-[260px] md:h-[300px] p-6 md:p-10 flex flex-col justify-between",
        isActive ? "border-[var(--foreground)]" : "border-[var(--border-color)]"
      )}
    >
      <div className="flex justify-between items-start">
        <p className="text-[9px] font-black tracking-[0.4em] opacity-30 uppercase text-[var(--foreground)]">
          {item.label}
        </p>
        <div
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-500",
            isActive
              ? "bg-emerald-500 shadow-[0_0_10px_#10b981]"
              : "bg-[var(--accents-2)]"
          )}
        />
      </div>

      <div className="flex items-baseline gap-1 overflow-hidden">
        <Counter value={item.value} isActive={isActive} />
        <span className="text-xl font-bold opacity-20 italic text-[var(--foreground)]">
          {item.unit}
        </span>
      </div>

      <div className="flex justify-between items-end border-t border-[var(--border-color)] pt-4 md:pt-6">
        <p className="text-[10px] font-bold opacity-40 tracking-[0.2em] uppercase text-[var(--foreground)]">
          {item.title}
        </p>
        <p className="text-[8px] font-mono opacity-20 text-[var(--foreground)]">
          v.2026
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
        duration: 2.2, // Ralenti pour plus de "poids" visuel
        ease: [0.16, 1, 0.3, 1], // Quintic out pour un arrêt très smooth
        onUpdate: (v) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = v.toFixed(1);
          }
        },
      });
      return () => controls.stop();
    }
  }, [value, isActive]);

  return (
    <h2
      ref={nodeRef}
      className="text-6xl md:text-8xl font-black italic text-[var(--foreground)] tracking-tighter leading-none"
    >
      0.0
    </h2>
  );
}
