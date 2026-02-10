"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  { id: 1, title: "FLUX ALPHA", value: "84.2%", desc: "Anyama_Node" },
  { id: 2, title: "CORE_DATA", value: "12.4k", desc: "Sync_Active" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "Ultra_Low" },
  { id: 4, title: "REVENUE", value: "450k", desc: "Target_Hub" },
  { id: 5, title: "STABILITY", value: "99.9%", desc: "Protocol_Safe" },
];

export default function InsightCarousel() {
  const x = useMotionValue(0);
  // Un ressort plus simple : rapide et sans latence
  const rotateY = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden touch-none">
      {/* Zone de Drag intuitive : on capture le mouvement horizontal */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x }}
        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
      />

      <div className="relative" style={{ perspective: "1200px" }}>
        <motion.div
          style={{
            rotateY: useTransform(rotateY, (val) => val / 2), // Sensibilité naturelle
            transformStyle: "preserve-3d",
          }}
          className="relative flex items-center justify-center"
        >
          {DATA.map((item, i) => (
            <Card key={item.id} item={item} index={i} total={DATA.length} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Card({
  item,
  index,
  total,
}: {
  item: any;
  index: number;
  total: number;
}) {
  const angle = (index / total) * 360;
  // Un rayon qui s'adapte à l'écran sans calculs savants
  // mobile: 280px, desktop: 500px
  const radius = "clamp(280px, 40vw, 550px)";

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "min(80vw, 400px)",
        height: "250px",
        rotateY: `${angle}deg`,
        // On utilise translateZ pour sortir les cartes du centre
        transformOrigin: `center center`,
        transform: `rotateY(${angle}deg) translateZ(${radius})`,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "p-8 rounded-[32px] border border-white/10",
        "bg-zinc-900/80 backdrop-blur-xl flex flex-col justify-between shadow-2xl"
      )}
    >
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] text-emerald-500 font-bold">
          NODE_0{index + 1}
        </span>
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
      </div>

      <div className="space-y-1">
        <h3 className="text-white/20 text-[10px] uppercase tracking-widest">
          {item.title}
        </h3>
        <div className="text-5xl font-black text-white italic tabular-nums">
          {item.value}
        </div>
      </div>

      <div className="text-[10px] text-white/30 border-t border-white/5 pt-4 uppercase">
        {item.desc}
      </div>
    </motion.div>
  );
}
