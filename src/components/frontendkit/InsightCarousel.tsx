"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  { id: 1, title: "CORE_METRICS", value: "84.2", unit: "%" },
  { id: 2, title: "DATA_SYNC", value: "12.4", unit: "K" },
  { id: 3, title: "EDGE_LATENCY", value: "0.4", unit: "MS" },
  { id: 4, title: "VOLUME", value: "450", unit: "K" },
];

export default function FluxCarouselVercel() {
  const [index, setIndex] = useState(0);
  const dragX = useMotionValue(0);

  // Physique réactive pour le swipe
  const rotationY = useSpring(0, { stiffness: 200, damping: 30 });

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold && index < DATA.length - 1) {
      setIndex(index + 1);
      rotationY.set((index + 1) * -45); // Angle de migration
    } else if (info.offset.x > threshold && index > 0) {
      setIndex(index - 1);
      rotationY.set((index - 1) * -45);
    }
  };

  return (
    <div className="relative h-screen w-full bg-[var(--background)] flex items-center justify-center overflow-hidden">
      {/* Zone de swipe invisible */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div className="relative" style={{ perspective: "1200px" }}>
        <motion.div
          style={{
            rotateY: rotationY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex items-center justify-center w-[400px] h-[280px]"
        >
          {DATA.map((item, i) => (
            <Card key={item.id} item={item} i={i} activeIndex={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Card({ item, i, activeIndex }: any) {
  const isFocused = activeIndex === i;
  const angle = i * 45; // Décalage angulaire fixe

  return (
    <motion.div
      style={
        {
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          // Positionnement en flux cylindrique
          transform: `rotateY(${angle}deg) translateZ(450px)`,
        } as any
      }
      animate={{
        opacity: isFocused ? 1 : 0.1,
        // On n'anime pas les couleurs ici, le CSS (.v-card) s'en occupe via les variables
      }}
      // .v-card applique ton border-radius (14px) et ton bg (var(--card-bg))
      className={cn(
        "v-card p-10 flex flex-col justify-between",
        isFocused
          ? "border-[var(--foreground)]"
          : "border-[var(--border-color)]"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold tracking-widest opacity-30 uppercase">
          Metric_Node
        </span>
        <div
          className={cn(
            "h-1 w-1 rounded-full",
            isFocused ? "bg-[var(--foreground)]" : "bg-[var(--accents-2)]"
          )}
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-7xl font-bold tracking-tighter text-[var(--foreground)] italic leading-none">
            {item.value}
          </span>
          <span className="text-xl font-medium opacity-20 italic">
            {item.unit}
          </span>
        </div>
        <p className="text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase">
          {item.title}
        </p>
      </div>

      <div className="pt-6 border-t border-[var(--border-color)] flex justify-between items-center text-[9px] font-mono opacity-20 uppercase tracking-widest">
        <span>Stability_OK</span>
        <span>ID_{item.id}</span>
      </div>
    </motion.div>
  );
}
