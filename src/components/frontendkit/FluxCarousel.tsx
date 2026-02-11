"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
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
    const threshold = 40;
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
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[450px] h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA.map((item, i) => {
            const position = i - index;
            // On garde une fenêtre de 3 cartes pour le flow
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

  // Calcul du décalage X dynamique pour Mobile (plus serré pour voir les bords)
  // Sur Desktop: 460px | Sur Mobile: ~85vw
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768
      ? window.innerWidth * 0.75
      : 460;

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * xOffset,
        rotateY: position * -35,
        z: isActive ? 0 : -200,
        opacity: isActive ? 1 : 0.15,
        scale: isActive ? 1 : 0.8,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 25 }}
      style={
        {
          // Injection du background vert transparent au focus
          backgroundColor: isActive
            ? "rgba(16, 185, 129, 0.03)"
            : "var(--card-bg)",
        } as any
      }
      className={cn(
        "v-card absolute w-[85vw] md:w-[400px] h-[280px] md:h-[300px] p-8 md:p-10 flex flex-col justify-between",
        isActive
          ? "border-[var(--foreground)] shadow-[0_0_40px_rgba(16,185,129,0.05)]"
          : "border-[var(--border-color)]"
      )}
    >
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase text-[var(--foreground)]">
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

      <div className="flex items-baseline gap-1">
        <Counter value={item.value} isActive={isActive} />
        <span className="text-2xl font-bold opacity-20 italic text-[var(--foreground)]">
          {item.unit}
        </span>
      </div>

      <div className="flex justify-between items-end border-t border-[var(--border-color)] pt-6">
        <p className="text-[11px] font-bold opacity-40 tracking-[0.3em] uppercase text-[var(--foreground)]">
          {item.title}
        </p>
        <p className="text-[9px] font-mono opacity-20 text-[var(--foreground)]">
          v.2026
        </p>
      </div>
    </motion.div>
  );
}

// Composant de compteur "Rolling"
function Counter({ value, isActive }: { value: number; isActive: boolean }) {
  const nodeRef = React.useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isActive && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: "easeOut",
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
      className="text-7xl md:text-8xl font-black italic text-[var(--foreground)] tracking-tighter leading-none"
    >
      0.0
    </h2>
  );
}
