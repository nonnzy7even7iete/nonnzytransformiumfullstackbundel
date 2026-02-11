"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
  const dragX = useMotionValue(0);

  // Physique "Hard Snap" pour un lock immédiat
  const springX = useSpring(dragX, { stiffness: 200, damping: 30 });

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Si on swipe assez fort ou assez loin
    if (offset < -50 || velocity < -500) {
      if (index < DATA.length - 1) setIndex(index + 1);
    } else if (offset > 50 || velocity > 500) {
      if (index > 0) setIndex(index - 1);
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center font-sans">
      {/* 1. Zone de Capture (Le Flux de Geste) */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      {/* 2. La Scène 3D (Espace-Temps Fixe) */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-[450px] h-[350px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA.map((item, i) => {
            // Logique de positionnement : Seule la carte actuelle est à 0,0,0
            const isVisible = Math.abs(i - index) <= 1; // On ne rend que la trinité (prev, current, next)
            if (!isVisible) return null;

            return <Card key={item.id} item={item} i={i} activeIndex={index} />;
          })}
        </motion.div>
      </div>

      {/* 3. Indicateur de Flux (Evidence Basse) */}
      <div className="absolute bottom-10 flex items-center gap-4 z-[110]">
        <span className="text-[10px] font-mono text-emerald-500/40 italic">
          01
        </span>
        <div className="flex gap-1.5">
          {DATA.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                index === i
                  ? "w-12 bg-emerald-500 shadow-[0_0_10px_#10b981]"
                  : "w-2 bg-white/10"
              )}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono text-emerald-500/40 italic">
          0{DATA.length}
        </span>
      </div>
    </div>
  );
}

function Card({ item, i, activeIndex }: any) {
  const position = i - activeIndex; // -1 (gauche), 0 (centre), 1 (droite)

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * 480, // Espace entre les cartes
        rotateY: position * -45, // Inclinaison 3D
        z: position !== 0 ? -300 : 0, // Recul pour les cartes non-actives
        opacity: position === 0 ? 1 : 0.15,
        scale: position === 0 ? 1 : 0.85,
        filter: position === 0 ? "blur(0px)" : "blur(8px)",
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 25,
        mass: 1,
      }}
      className={cn(
        "absolute w-[420px] h-[300px] p-12 rounded-[50px] border",
        "flex flex-col justify-between transition-colors duration-700",
        position === 0
          ? "bg-zinc-900/40 border-emerald-500/20 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-white/5"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-black tracking-[0.4em] text-emerald-500/60 uppercase">
            System_Link
          </p>
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
            {item.label}
          </p>
        </div>
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-500",
            position === 0
              ? "bg-emerald-500 shadow-[0_0_15px_#10b981]"
              : "bg-white/10"
          )}
        />
      </div>

      <div className="flex items-baseline gap-1">
        <h2 className="text-8xl font-black italic text-white tracking-tighter leading-none">
          {item.value}
        </h2>
        <span className="text-2xl font-bold text-emerald-500 italic">
          {item.unit}
        </span>
      </div>

      <div className="flex justify-between items-end border-t border-white/5 pt-6">
        <p className="text-[11px] font-bold text-white/20 tracking-[0.3em] uppercase">
          {item.title}
        </p>
        <p className="text-[9px] font-mono text-emerald-500/30">V.2026_ALPHA</p>
      </div>
    </motion.div>
  );
}
