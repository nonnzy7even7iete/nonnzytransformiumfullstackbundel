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

interface InsightData {
  id: number;
  title: string;
  value: string;
  desc: string;
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring avec damping élevé pour éviter le jitter sur mobile
  const rotationY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -360]),
    { stiffness: 40, damping: 25, restDelta: 0.001 }
  );

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Ambiance Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03)_0%,transparent_80%)]" />

        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "2000px" }}
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
                rotationY={rotationY}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Card({
  item,
  index,
  total,
  rotationY,
}: {
  item: InsightData;
  index: number;
  total: number;
  rotationY: MotionValue<number>;
}) {
  const angle = (index / total) * 360;
  const radius = "clamp(320px, 42vw, 600px)";

  // On calcule l'écart par rapport au centre (0°)
  const distance = useTransform(rotationY, (r) => {
    const currentAngle = (Math.abs(r) + angle) % 360;
    const diff = Math.abs(
      currentAngle > 180 ? 360 - currentAngle : currentAngle
    );
    return diff;
  });

  // Effets basés sur la proximité du centre
  const opacity = useTransform(distance, [0, 45, 90], [1, 0.2, 0]);
  const scale = useTransform(distance, [0, 45], [1.1, 0.8]);
  const blur = useTransform(distance, [0, 40], ["blur(0px)", "blur(10px)"]);

  return (
    <motion.div
      style={
        {
          position: "absolute",
          width: "min(85vw, 440px)",
          height: "280px",
          // Utilisation de backfaceVisibility pour opti mobile
          backfaceVisibility: "hidden",
          // On sépare le positionnement 3D statique (angle/radius) de l'animation dynamique
          transform: `rotateY(${angle}deg) translateZ(${radius})`,
          opacity,
          scale,
          filter: blur,
          transformStyle: "preserve-3d",
        } as any
      }
      className={cn(
        "p-10 rounded-[48px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
        "bg-zinc-900/40 backdrop-blur-2xl flex flex-col justify-between"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="font-mono text-[11px] text-emerald-500 font-black tracking-[0.2em]">
            NODE_0{item.id}
          </span>
          <div className="h-px w-8 bg-emerald-500/30 mt-1" />
        </div>
        <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
      </div>

      <div>
        <h3 className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold mb-2">
          {item.title}
        </h3>
        <div className="text-6xl font-black italic text-white tracking-tighter leading-none tabular-nums">
          {item.value}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-6 text-[10px] text-white/30 uppercase tracking-[0.2em]">
        {item.desc}
      </div>
    </motion.div>
  );
}
