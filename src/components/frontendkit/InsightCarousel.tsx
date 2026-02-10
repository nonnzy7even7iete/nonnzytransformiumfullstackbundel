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

// 1. Interfaces strictes pour calmer TypeScript
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
  radius: number;
  globalY: MotionValue<number>;
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

  // Physique stable et imposante
  const smoothY = useSpring(rotateY, {
    stiffness: 45,
    damping: 25,
    mass: 1.8,
  });

  const [screenSize, setScreenSize] = useState({ width: 1200 });

  useEffect(() => {
    const handleResize = () => setScreenSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = useMemo(() => {
    return screenSize.width < 768 ? 300 : 600;
  }, [screenSize]);

  // Gestion du Pan (Mouvement)
  const onPan = (_: any, info: { delta: { x: number } }) => {
    rotateY.set(rotateY.get() + info.delta.x * 0.6);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden touch-none select-none">
      {/* CAPTEUR DE GESTES */}
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,black_100%)] pointer-events-none" />
    </div>
  );
}

function Card({ item, index, total, radius, globalY }: CardProps) {
  const angleStep = 360 / total;
  const initialAngle = index * angleStep;

  // Calcul du Focus
  const distanceToCenter = useTransform(globalY, (y) => {
    const currentPos = (y + initialAngle) % 360;
    const normalized = ((((currentPos + 180) % 360) + 360) % 360) - 180;
    return Math.abs(normalized);
  });

  // Mappage des animations
  const blur = useTransform(
    distanceToCenter,
    [0, 40, 120],
    ["blur(0px)", "blur(4px)", "blur(25px)"]
  );
  const opacity = useTransform(distanceToCenter, [0, 90, 150], [1, 0.4, 0]);
  const scale = useTransform(distanceToCenter, [0, 90], [1.1, 0.8]);
  const z = useTransform(distanceToCenter, [0, 180], [100, -radius]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "min(85vw, 450px)",
        height: "300px",
        transformStyle: "preserve-3d",
        rotateY: initialAngle,
        // Correction pour VS Code : on utilise template string et on cast en 'any'
        transformOrigin: `center center -${radius}px` as any,
        filter: blur,
        opacity,
        scale,
        z: z as any,
      }}
      className={cn(
        "p-12 rounded-[56px] border border-white/10 flex flex-col justify-between",
        "bg-zinc-900/40 backdrop-blur-[60px] shadow-[0_0_120px_rgba(0,0,0,1)]"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-[13px] text-emerald-400 font-black tracking-[0.2em] uppercase">
          SYSTEM_LINK_0{item.id}
        </span>
        <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_30px_#10b981]" />
      </div>

      <div className="my-4">
        <h3 className="text-white/20 text-[12px] uppercase tracking-[0.5em] font-bold mb-2">
          {item.title}
        </h3>
        <div className="text-[clamp(3rem,10vw,6rem)] font-black italic text-white tracking-tighter leading-none">
          {item.value}
        </div>
      </div>

      <div className="border-t border-white/5 pt-8">
        <p className="text-[12px] text-white/30 uppercase tracking-[0.3em] font-medium leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}
