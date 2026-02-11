"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  {
    id: 1,
    title: "CORE_METRICS",
    value: "84.2",
    unit: "%",
    label: "System health",
  },
  {
    id: 2,
    title: "DATA_SYNC",
    value: "12.4",
    unit: "K",
    label: "Requests/sec",
  },
  {
    id: 3,
    title: "EDGE_LATENCY",
    value: "0.4",
    unit: "MS",
    label: "Global avg",
  },
  {
    id: 4,
    title: "VOLUME",
    value: "450",
    unit: "K",
    label: "Total throughput",
  },
];

export default function FluxCarouselVercel() {
  const [index, setIndex] = useState(0);
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 200, damping: 30 });

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      if (index < DATA.length - 1) setIndex(index + 1);
    } else if (offset > 50 || velocity > 500) {
      if (index > 0) setIndex(index - 1);
    }
  };

  return (
    <div className="relative h-screen w-full bg-[var(--background)] overflow-hidden flex items-center justify-center">
      {/* Capture du Swipe */}
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
          className="relative flex items-center justify-center w-[400px] h-[300px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {DATA.map((item, i) => {
            const position = i - index;
            const isVisible = Math.abs(position) <= 1;
            if (!isVisible) return null;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: position * 440,
                  rotateY: position * -35,
                  z: position !== 0 ? -250 : 0,
                  opacity: position === 0 ? 1 : 0.1,
                  scale: position === 0 ? 1 : 0.9,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                // Utilisation des classes de ton design system
                className={cn(
                  "absolute w-[380px] h-[260px] p-8 v-card flex flex-col justify-between",
                  "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
                  position === 0
                    ? "border-[var(--foreground)]"
                    : "border-[var(--border-color)]"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-medium tracking-tight opacity-40 uppercase">
                      {item.label}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      position === 0
                        ? "bg-[var(--foreground)]"
                        : "bg-[var(--accents-2)]"
                    )}
                  />
                </div>

                <div className="flex items-baseline gap-1">
                  <h2 className="text-7xl font-bold tracking-tighter leading-none text-[var(--foreground)]">
                    {item.value}
                  </h2>
                  <span className="text-xl font-medium opacity-20">
                    {item.unit}
                  </span>
                </div>

                <div className="flex justify-between items-end border-t border-[var(--border-color)] pt-4">
                  <p className="text-[11px] font-bold tracking-tight opacity-50">
                    {item.title}
                  </p>
                  <p className="text-[9px] font-mono opacity-20">
                    REF_{item.id}00
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation épurée (Style Vercel) */}
      <div className="absolute bottom-12 flex gap-1 z-[110]">
        {DATA.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-0.5 rounded-full transition-all duration-300",
              index === i
                ? "w-6 bg-[var(--foreground)]"
                : "w-3 bg-[var(--accents-2)]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
