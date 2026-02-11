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

interface CardData {
  id: number;
  title: string;
  value: string;
  desc: string;
}

const DATA: CardData[] = [
  { id: 1, title: "FLUX ALPHA", value: "84.2%", desc: "Node_Active_Primary" },
  { id: 2, title: "CORE_DATA", value: "12.4k", desc: "Sync_Verified" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "Protocol_Zero" },
  { id: 4, title: "REVENUE", value: "450k", desc: "Capital_Flow" },
  { id: 5, title: "STABILITY", value: "99.9%", desc: "Safe_Protocol" },
];

export default function InsightCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // La rotation est lissée pour donner cette sensation de "poids" de la data
  const rotationY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -360]),
    { stiffness: 35, damping: 25, mass: 1.5 }
  );

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#050505]">
      {/* Scroll Snap Invisible pour forcer l'arrêt sur les cartes */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {DATA.map((_, i) => (
          <div
            key={i}
            className="h-screen w-full"
            style={{ scrollSnapAlign: "start" }}
          />
        ))}
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "2500px" }}
        >
          <motion.div
            style={{
              rotateY: rotationY,
              transformStyle: "preserve-3d",
            }}
            className="relative flex items-center justify-center w-full h-full"
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

        {/* Ligne d'horizon (Evidence visuelle) */}
        <div className="absolute w-full h-px bg-emerald-500/10 top-1/2 -translate-y-1/2 z-0" />
      </div>
    </div>
  );
}

function Card({
  item,
  index,
  total,
  globalRotation,
}: {
  item: CardData;
  index: number;
  total: number;
  globalRotation: MotionValue<number>;
}) {
  const initialAngle = (index / total) * 360;
  // Rayon profond pour l'espace entre les cartes
  const radius = 700;

  const distance = useTransform(globalRotation, (v: number) => {
    const currentAngle = (Math.abs(v) - initialAngle) % 360;
    const normalized = Math.abs(
      currentAngle > 180 ? 360 - currentAngle : currentAngle
    );
    return normalized;
  });

  // Logique d'Evidence : la carte "s'impose" brutalement au centre
  const opacity = useTransform(distance, [0, 30, 60], [1, 0.4, 0]);
  const scale = useTransform(distance, [0, 45], [1.2, 0.7]);
  const blurValue = useTransform(distance, [0, 25, 50], [0, 8, 20]);
  const blur = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "min(85vw, 480px)",
        height: "320px",
        transformStyle: "preserve-3d",
        rotateY: initialAngle,
        z: radius,
        opacity,
        scale,
        filter: blur,
      }}
      className={cn(
        "p-12 rounded-[60px] border border-white/10 flex flex-col justify-between shadow-2xl",
        "bg-zinc-900/40 backdrop-blur-[40px]"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-[12px] text-emerald-500 font-black tracking-[0.3em]">
          DATA_PNT_{item.id}
        </span>
        <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981]" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-white/20 text-[11px] uppercase tracking-[0.6em] font-bold">
          {item.title}
        </h3>
        <div className="text-7xl font-black italic text-white tracking-tighter leading-none">
          {item.value}
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 text-[12px] text-white/40 uppercase tracking-[0.3em]">
        {item.desc}
      </div>
    </motion.div>
  );
}
