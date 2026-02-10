"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Interface pour les données
interface InsightData {
  id: number;
  title: string;
  value: string;
  desc: string;
}

// Interface pour les Props (C'est ça qui fait taire VS Code)
interface CardProps {
  item: InsightData;
  index: number;
  total: number;
  globalRotation: MotionValue<number>;
}

const DATA: InsightData[] = [
  { id: 1, title: "FLUX ALPHA", value: "84.2%", desc: "Anyama_Node_Master" },
  { id: 2, title: "CORE_DATA", value: "12.4k", desc: "Global_Sync_Verified" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "Zero_Point_Protocol" },
  { id: 4, title: "REVENUE", value: "450k", desc: "Target_Hub_Capital" },
  { id: 5, title: "STABILITY", value: "99.9%", desc: "Resilience_Active" },
];

export default function InsightCarousel() {
  const dragX = useMotionValue(0);

  const rotationSpring = useSpring(dragX, {
    stiffness: 35,
    damping: 20,
    mass: 1.5,
  });

  const rotation = useTransform(rotationSpring, (v) => v / 3.5);

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden touch-none select-none">
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#10b981 0.5px, transparent 0.5px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        drag="x"
        dragConstraints={{ left: -1000000, right: 1000000 }}
        dragElastic={0}
        style={{ x: dragX }}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "2500px" }}
      >
        <motion.div
          style={{
            rotateY: rotation,
            transformStyle: "preserve-3d",
          }}
          className="relative flex items-center justify-center w-[500px]"
        >
          {DATA.map((item, i) => (
            <Card
              key={item.id}
              item={item}
              index={i}
              total={DATA.length}
              globalRotation={rotation}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Card({ item, index, total, globalRotation }: CardProps) {
  const angleStep = 360 / total;
  const initialAngle = index * angleStep;
  const radius = 600;

  const distanceToCenter = useTransform(globalRotation, (v) => {
    const currentPos = (v + initialAngle) % 360;
    const normalized = ((((currentPos + 180) % 360) + 360) % 360) - 180;
    return Math.abs(normalized);
  });

  const blur = useTransform(
    distanceToCenter,
    [0, 20, 90],
    ["blur(0px)", "blur(2px)", "blur(25px)"]
  );
  const opacity = useTransform(distanceToCenter, [0, 80, 150], [1, 0.4, 0]);
  const scale = useTransform(distanceToCenter, [0, 90], [1.15, 0.75]);
  const z = useTransform(distanceToCenter, [0, 90], [100, -200]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "400px",
        height: "280px",
        transformStyle: "preserve-3d",
        rotateY: initialAngle,
        transformOrigin: `center center -${radius}px` as any, // "as any" pour calmer VS Code sur le CSS 3D
        filter: blur,
        opacity,
        scale,
        z,
      }}
      className={cn(
        "p-10 rounded-[48px] border border-white/10 flex flex-col justify-between",
        "bg-zinc-900/40 backdrop-blur-[40px] shadow-[0_0_80px_rgba(0,0,0,0.6)]"
      )}
    >
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[12px] text-emerald-400 font-black tracking-[0.3em] uppercase">
            System_Link_0{item.id}
          </span>
          <div className="h-0.5 w-12 bg-emerald-500/40 rounded-full" />
        </div>
        <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_25px_#10b981]" />
      </div>

      <div className="z-10">
        <h3 className="text-white/20 text-[11px] uppercase tracking-[0.5em] font-bold mb-3">
          {item.title}
        </h3>
        <div className="text-7xl font-black italic text-white tracking-[-0.05em] leading-none">
          {item.value}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-8 z-10 text-white/40">
        {item.desc}
      </div>
    </motion.div>
  );
}
