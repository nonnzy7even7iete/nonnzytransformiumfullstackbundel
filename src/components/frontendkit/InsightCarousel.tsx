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

// --- TYPES ---
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
  // On utilise des MotionValues brutes pour la rotation
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);

  // Physique "Zéro Gravité" : mass faible, damping élevé pour un contrôle total
  const smoothY = useSpring(rotateY, { stiffness: 60, damping: 30, mass: 0.5 });
  const smoothX = useSpring(rotateX, { stiffness: 60, damping: 30, mass: 0.5 });

  const [screenSize, setScreenSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () =>
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = useMemo(
    () => Math.min(screenSize.width * 0.45, 650),
    [screenSize]
  );
  const globalScale = useMemo(
    () => (screenSize.width < 768 ? 0.6 : 0.9),
    [screenSize]
  );

  // LA CLÉ : PanHandler personnalisé pour éviter le blocage du drag natif
  const onPan = (_: any, info: { delta: { x: number; y: number } }) => {
    rotateY.set(rotateY.get() + info.delta.x * 0.5);
    rotateX.set(rotateX.get() - info.delta.y * 0.5);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden touch-none select-none">
      {/* CAPTEUR DE GESTES INFINI (onPan au lieu de drag) */}
      <motion.div
        onPan={onPan}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "2000px" }}
      >
        <motion.div
          style={{
            rotateY: smoothY,
            rotateX: smoothX,
            scale: globalScale,
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
              globalX={smoothX}
            />
          ))}
        </motion.div>
      </div>

      {/* Ambiance Engine */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}

function Card({ item, index, total, radius, globalY, globalX }: any) {
  const angleStep = 360 / total;
  const initialAngle = index * angleStep;

  // Calcul du Focus Dynamique (Distance angulaire)
  const distanceToCenter = useTransform([globalY, globalX], ([y, x]: any) => {
    const currentPos = (y + initialAngle) % 360;
    const normalized = ((((currentPos + 180) % 360) + 360) % 360) - 180;
    return Math.sqrt(Math.pow(normalized, 2) + Math.pow(x, 2));
  });

  // Mappage des effets (Award 2026 Focus)
  const blur = useTransform(
    distanceToCenter,
    [0, 30, 120],
    ["blur(0px)", "blur(4px)", "blur(40px)"]
  );
  const opacity = useTransform(distanceToCenter, [0, 100, 160], [1, 0.3, 0]);
  const z = useTransform(distanceToCenter, [0, 100], [200, -400]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "420px",
        height: "280px",
        transformStyle: "preserve-3d",
        rotateY: initialAngle,
        transformOrigin: `center center -${radius}px` as any,
        filter: blur,
        opacity,
        z,
      }}
      className={cn(
        "p-10 rounded-[50px] border border-white/10 flex flex-col justify-between",
        "bg-zinc-900/40 backdrop-blur-[60px] shadow-[0_0_100px_rgba(0,0,0,0.9)]"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-[12px] text-emerald-400 font-bold tracking-widest uppercase">
          NODE_0{item.id}
        </span>
        <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981]" />
      </div>

      <div className="my-2">
        <h3 className="text-white/20 text-[11px] uppercase tracking-[0.6em] font-black mb-2">
          {item.title}
        </h3>
        <div className="text-7xl font-black italic text-white tracking-tighter leading-none tabular-nums">
          {item.value}
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 text-[11px] text-white/30 uppercase tracking-[0.2em]">
        {item.desc}
      </div>
    </motion.div>
  );
}
