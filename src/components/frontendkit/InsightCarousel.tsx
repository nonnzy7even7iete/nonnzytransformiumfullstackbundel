"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  { id: 1, title: "CORE_METRICS", value: "84.2", unit: "%" },
  { id: 2, title: "DATA_SYNC", value: "12.4", unit: "K" },
  { id: 3, title: "EDGE_LATENCY", value: "0.4", unit: "MS" },
  { id: 4, title: "VOLUME", value: "450", unit: "K" },
];

export default function VercelPulseCarousel() {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold && index < DATA.length - 1)
      setIndex(index + 1);
    else if (info.offset.x > threshold && index > 0) setIndex(index - 1);
  };

  if (!isMounted) return null;

  return (
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          className="relative w-[400px] h-[300px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <AnimatePresence mode="popLayout">
            {DATA.map((item, i) => {
              const position = i - index;
              if (Math.abs(position) > 1) return null;

              return <Card key={item.id} item={item} position={position} />;
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function Card({ item, position }: { item: any; position: number }) {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      animate={{
        x: position * 420,
        rotateY: position * -35,
        z: isActive ? 0 : -200,
        opacity: isActive ? 1 : 0.1,
        scale: isActive ? 1.05 : 0.9,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "absolute inset-0 p-10 v-card flex flex-col justify-between overflow-hidden",
        isActive ? "border-[var(--foreground)]" : "border-[var(--border-color)]"
      )}
    >
      {/* EFFET PULSE : Un balayage lumineux discret lors du Snap */}
      {isActive && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "100%", opacity: [0, 0.5, 0] }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--foreground)] to-transparent opacity-10 pointer-events-none"
          style={{ skewX: "-20deg" }}
        />
      )}

      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] font-bold tracking-[0.4em] opacity-40 uppercase">
          Vercel_Metric
        </span>
        <div
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-500",
            isActive
              ? "bg-[var(--foreground)] shadow-[0_0_10px_var(--foreground)]"
              : "bg-[var(--accents-2)]"
          )}
        />
      </div>

      <div className="z-10">
        <div className="flex items-baseline gap-1">
          <h2 className="text-8xl font-black tracking-tighter text-[var(--foreground)] leading-none italic">
            {item.value}
          </h2>
          <span className="text-xl font-bold opacity-30 italic">
            {item.unit}
          </span>
        </div>
        <p className="text-[11px] font-bold opacity-40 tracking-widest mt-2 uppercase">
          {item.title}
        </p>
      </div>

      <div className="pt-6 border-t border-[var(--border-color)] z-10">
        <div className="flex justify-between items-center text-[9px] font-mono opacity-20">
          <span>TX_STABLE</span>
          <span>NODE_ID_{item.id}</span>
        </div>
      </div>
    </motion.div>
  );
}
