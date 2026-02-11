"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  {
    id: 1,
    title: "ALPHA_FLUX",
    value: 84.2,
    unit: "%",
    label: "PRIMARY_NODE",
    notes: ["System Core", "Active"],
  },
  {
    id: 2,
    title: "DATA_CORE",
    value: 12.4,
    unit: "K",
    label: "SYNC_STATUS",
    notes: ["Database Link"],
  },
  {
    id: 3,
    title: "LATENCY",
    value: 0.4,
    unit: "MS",
    label: "ZERO_POINT",
    notes: ["Edge optimized"],
  },
  {
    id: 4,
    title: "LIQUIDITY",
    value: 450,
    unit: "K",
    label: "FLOW_RATE",
    notes: ["Market depth"],
  },
  {
    id: 5,
    title: "STABILITY",
    value: 99.9,
    unit: "%",
    label: "ENCRYPTED",
    notes: ["SSL v3"],
  },
  {
    id: 6,
    title: "VOLUMETRY",
    value: 1.2,
    unit: "PB",
    label: "STORAGE",
    notes: ["Cold archive"],
  },
  {
    id: 7,
    title: "UPTIME",
    value: 365,
    unit: "D",
    label: "RELIABILITY",
    notes: ["No downtime"],
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
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[300px] md:max-w-[450px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA.map((item, i) => (
            <Card key={item.id} item={item} position={i - index} />
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-10 flex gap-2">
        {DATA.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[1px] transition-all duration-700",
              index === i
                ? "w-10 bg-[var(--foreground)]"
                : "w-2 bg-[var(--foreground)] opacity-10"
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
        "absolute w-[75vw] md:w-[420px] h-auto min-h-[300px] p-10 flex flex-col justify-between overflow-hidden transition-all duration-700",
        "backdrop-blur-[25px] md:backdrop-blur-[40px] border border-[var(--foreground)]/5",
        // Focus "Class" : Lueur interne diffuse et ombre portée élégante
        isActive
          ? "shadow-[0_40px_100px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(16,185,129,0.05)] bg-[var(--foreground)]/[0.02]"
          : "bg-transparent border-none"
      )}
      style={{ borderRadius: "var(--radius-vercel, 14px)" }}
    >
      {/* INDICATEUR VERT : Positionné à 7px top/right du border */}
      <div
        className={cn(
          "absolute top-[7px] right-[7px] h-1.5 w-1.5 rounded-full transition-all duration-1000 ease-in-out",
          isActive
            ? "bg-emerald-500 shadow-[0_0_10px_#10b981] opacity-100 scale-100"
            : "bg-[var(--foreground)] opacity-0 scale-50"
        )}
      />

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-start opacity-30 mt-[-5px]">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase text-[var(--foreground)]">
          {item.label}
        </p>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mt-6">
        <h3 className="text-[11px] font-bold opacity-30 uppercase text-[var(--foreground)] tracking-[0.3em] mb-4">
          {item.title}
        </h3>
        <div className="flex flex-col gap-2">
          {item.notes.map((note: string, idx: number) => (
            <p
              key={idx}
              className="text-[10px] font-mono text-[var(--foreground)] opacity-20 italic pl-4 border-l border-[var(--foreground)]/5"
            >
              {note}
            </p>
          ))}
        </div>
      </div>

      {/* COMPTEUR */}
      <div className="relative z-10 flex items-baseline gap-2 mt-auto pt-10">
        <h2
          ref={counterRef}
          className="text-6xl md:text-8xl font-black italic text-[var(--foreground)] tracking-tighter leading-none"
        >
          0.0
        </h2>
        <span className="text-2xl font-bold opacity-10 italic text-[var(--foreground)] uppercase">
          {item.unit}
        </span>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 flex justify-between items-end pt-6 text-[9px] font-mono opacity-10 text-[var(--foreground)] tracking-[0.4em] uppercase">
        <span>NODE_{item.id}</span>
        <span>V26</span>
      </div>
    </motion.div>
  );
}
