"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// --- INTERFACES ---
interface InsightData {
  id: number;
  title: string;
  value: string;
  desc: string;
}

interface CardProps {
  item: InsightData;
  index: number;
  total: number;
  globalRotation: MotionValue<number>;
}

const DATA: InsightData[] = [
  { id: 1, title: "FLUX ALPHA", value: "84.2%", desc: "Anyama_Node" },
  { id: 2, title: "CORE_DATA", value: "12.4k", desc: "Sync_Active" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "Ultra_Low" },
  { id: 4, title: "REVENUE", value: "450k", desc: "Target_Hub" },
  { id: 5, title: "STABILITY", value: "99.9%", desc: "Protocol_Safe" },
];

export default function InsightCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Rotation contrôlée par le scroll
  const rotationY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -360]),
    { stiffness: 45, damping: 20, mass: 1 }
  );

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Scène 3D */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1800px" }}
        >
          <motion.div
            style={{
              rotateY: rotationY,
              transformStyle: "preserve-3d",
            }}
            className="relative flex items-center justify-center w-[400px] h-[300px]"
          >
            {DATA.map((item, i) => (
              <Card
                key={item.id}
                item={item}
                index={i}
                total={DATA.length}
                globalRotation={rotationY}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Card({ item, index, total, globalRotation }: CardProps) {
  const initialAngle = (index / total) * 360;

  // Rayon imposant pour le design cylindrique
  // On utilise un nombre pur pour translateZ (Framer Motion s'occupe de l'unité px)
  const radius = 600;

  // Détection de la carte centrale
  const distance = useTransform(globalRotation, (v: number) => {
    const currentAngle = (Math.abs(v) - initialAngle) % 360;
    const normalized = Math.abs(
      currentAngle > 180 ? 360 - currentAngle : currentAngle
    );
    return normalized;
  });

  // États visuels
  const opacity = useTransform(distance, [0, 45, 90], [1, 0.3, 0]);
  const scale = useTransform(distance, [0, 45], [1.1, 0.8]);
  const blurValue = useTransform(distance, [0, 40], [0, 12]);
  const blur = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "min(85vw, 420px)",
        height: "280px",
        transformStyle: "preserve-3d",
        // Positionnement cylindrique via props Framer (propre pour TS)
        rotateY: initialAngle,
        z: radius,
        opacity,
        scale,
        filter: blur,
      }}
      className={cn(
        "p-10 rounded-[48px] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]",
        "bg-zinc-900/40 backdrop-blur-3xl flex flex-col justify-between"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-[11px] text-emerald-500 font-black tracking-widest uppercase">
          UNIT_0{item.id}
        </span>
        <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981]" />
      </div>

      <div>
        <h3 className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold mb-2">
          {item.title}
        </h3>
        <div className="text-6xl font-black italic text-white tracking-tighter leading-none tabular-nums">
          {item.value}
        </div>
      </div>

      <div className="text-[10px] text-white/30 border-t border-white/5 pt-6 uppercase tracking-widest">
        {item.desc}
      </div>
    </motion.div>
  );
}
