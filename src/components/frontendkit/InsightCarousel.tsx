"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
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
  { id: 1, title: "FLUX ALPHA", value: "84.2%", desc: "Anyama_Node_Master" },
  { id: 2, title: "CORE_DATA", value: "12.4k", desc: "Global_Sync_Verified" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "Zero_Point_Protocol" },
  { id: 4, title: "REVENUE", value: "450k", desc: "Target_Hub_Capital" },
  { id: 5, title: "STABILITY", value: "99.9%", desc: "Resilience_Active" },
];

export default function InsightCarousel() {
  const rotateY = useMotionValue(0);

  // Physique "Hydraulique" : très stable, absorbe les micro-mouvements du pouce
  const smoothY = useSpring(rotateY, {
    stiffness: 30,
    damping: 30,
    mass: 2, // Plus lourd = moins de tremblements sur mobile
  });

  const [mounted, setMounted] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 1200 });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setScreenSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // RAYON PROFOND : On crée de l'espace entre les cartes
  const radius = useMemo(() => {
    return screenSize.width < 768 ? 450 : 850;
  }, [screenSize.width]);

  if (!mounted) return null;

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden touch-none select-none">
      {/* ZONE DE CONTROLE : On utilise dragX pour piloter rotateY sans instabilité */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDrag={(_, info) => {
          // On injecte le mouvement dans la rotation
          rotateY.set(rotateY.get() + info.delta.x * 0.4);
        }}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "2500px" }}
      >
        <motion.div
          style={{
            rotateY: smoothY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex items-center justify-center"
        >
          {DATA.map((item, i) => (
            <Card
              key={item.id}
              item={item}
              index={i}
              total={DATA.length}
              radius={radius}
              globalY={smoothY}
            />
          ))}
        </motion.div>
      </div>

      {/* Ambiance visuelle sombre */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </div>
  );
}

function Card({
  item,
  index,
  total,
  radius,
  globalY,
}: {
  item: InsightData;
  index: number;
  total: number;
  radius: number;
  globalY: MotionValue<number>;
}) {
  const angleStep = 360 / total;
  const initialAngle = index * angleStep;

  const distanceToCenter = useTransform(globalY, (y) => {
    const currentPos = (y + initialAngle) % 360;
    const normalized = ((((currentPos + 180) % 360) + 360) % 360) - 180;
    return Math.abs(normalized);
  });

  // FOCUS CHIRURGICAL : On floute très vite dès qu'on quitte le centre
  const blur = useTransform(
    distanceToCenter,
    [0, 30, 80],
    ["blur(0px)", "blur(6px)", "blur(40px)"]
  );
  const opacity = useTransform(distanceToCenter, [0, 70, 120], [1, 0.3, 0]);
  const scale = useTransform(distanceToCenter, [0, 60], [1.2, 0.7]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "min(90vw, 500px)", // Plus large
        height: "220px", // Moins haute pour l'aération
        transformStyle: "preserve-3d",
        rotateY: initialAngle,
        transformOrigin: `center center -${radius}px` as any,
        filter: blur,
        opacity,
        scale,
      }}
      className={cn(
        "p-10 rounded-[40px] border border-white/5 flex flex-col justify-between",
        "bg-zinc-900/20 backdrop-blur-[80px] shadow-2xl"
      )}
    >
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] text-emerald-500/60 font-bold tracking-[0.4em]">
          NODE_0{item.id}
        </span>
        <div className="h-2 w-2 rounded-full bg-emerald-500/40" />
      </div>

      <div className="text-center">
        <h3 className="text-white/10 text-[9px] uppercase tracking-[0.6em] mb-1">
          {item.title}
        </h3>
        <div className="text-6xl font-black italic text-white tracking-tighter leading-none">
          {item.value}
        </div>
      </div>

      <div className="text-center text-[9px] text-white/20 uppercase tracking-[0.3em] font-light">
        {item.desc}
      </div>
    </motion.div>
  );
}
