"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

// Tes données DATA restent inchangées (Respect absolu de tes strings)
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
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center font-sans transition-colors duration-500">
      {/* COUCHE DE DRAG : Invisible mais capte les gestes */}
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

      {/* INDICATEURS DE POSITION (PAGINATION) */}
      <div className="absolute bottom-10 flex gap-2">
        {DATA.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-[1px] transition-all duration-700",
              index === i
                ? "w-10 bg-[var(--foreground)]"
                : "w-2 bg-[var(--foreground)] opacity-20" // Augmentation légère de l'opacité
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

  // Calcul dynamique de l'offset pour la réactivité mobile
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 768
      ? window.innerWidth * 0.45
      : 480;

  useEffect(() => {
    if (isActive && counterRef.current) {
      // .animate(start, end, options) : Fonction de Framer Motion pour animer des chiffres
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
        // ÉLÉMENT CLÉ : Amélioration du flou et du contraste de bordure
        "backdrop-blur-[30px] border border-[var(--foreground)]/10",
        isActive
          ? "shadow-[0_40px_100px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(16,185,129,0.05)] bg-[var(--foreground)]/[0.03]"
          : "bg-transparent border-none"
      )}
      style={{ borderRadius: "var(--radius-vercel, 14px)" }}
    >
      {/* INDICATEUR D'ÉTAT (Node Status) */}
      <div
        className={cn(
          "absolute top-[10px] right-[10px] h-2 w-2 rounded-full transition-all duration-1000",
          isActive
            ? "bg-emerald-500 shadow-[0_0_15px_#10b981] opacity-100"
            : "bg-[var(--foreground)] opacity-0"
        )}
      />

      {/* HEADER : Opacité augmentée de 0.3 à 0.5 pour l'aide à la décision */}
      <div className="relative z-10 flex justify-between items-start mt-[-5px]">
        <p className="text-[11px] font-black tracking-[0.5em] uppercase text-[var(--foreground)] opacity-50">
          {item.label}
        </p>
      </div>

      {/* CONTENT : Titre plus marqué */}
      <div className="relative z-10 mt-6">
        <h3 className="text-[12px] font-black uppercase text-[var(--foreground)] tracking-[0.3em] mb-4 opacity-60">
          {item.title}
        </h3>
        <div className="flex flex-col gap-2">
          {item.notes.map((note: string, idx: number) => (
            <p
              key={idx}
              className="text-[11px] font-mono text-[var(--foreground)] opacity-40 italic pl-4 border-l border-[var(--foreground)]/20"
            >
              {note}
            </p>
          ))}
        </div>
      </div>

      {/* CHIFFRE CLÉ (Décisionnel) : L'élément le plus important */}
      <div className="relative z-10 flex items-baseline gap-2 mt-auto pt-10">
        <h2
          ref={counterRef}
          className="text-6xl md:text-8xl font-black italic text-[var(--foreground)] tracking-tighter leading-none"
        >
          0.0
        </h2>
        <span className="text-2xl font-bold opacity-30 italic text-[var(--foreground)] uppercase">
          {item.unit}
        </span>
      </div>

      {/* FOOTER : Discret mais lisible */}
      <div className="relative z-10 flex justify-between items-end pt-6 text-[10px] font-mono opacity-30 text-[var(--foreground)] tracking-[0.4em] uppercase">
        <span>NODE_{item.id}</span>
        <span>V26</span>
      </div>
    </motion.div>
  );
}
