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
  // Coordonnées de rotation infinie
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Physique lourde pour une sensation Premium
  const springConfig = { stiffness: 40, damping: 25, mass: 1.2 };
  const smoothX = useSpring(rotateX, springConfig);
  const smoothY = useSpring(rotateY, springConfig);

  // On détecte la taille de l'écran pour ajuster le Rayon et le Scale
  const [screenSize, setScreenSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () =>
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calcul dynamique du rayon : on veut que le carrousel occupe 40% de la largeur
  const radius = useMemo(
    () => Math.min(screenSize.width * 0.45, 600),
    [screenSize]
  );
  const globalScale = useMemo(
    () => Math.min(screenSize.width / 1400, 1),
    [screenSize]
  );

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden touch-none select-none">
      {/* HUD : Feedback visuel du mouvement */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div
          className="w-[80%] h-[80%] border border-emerald-500/10 rounded-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        </div>
      </div>

      {/* ZONE DE CAPTURE 360° */}
      <motion.div
        drag
        dragConstraints={{
          left: -1000000,
          right: 1000000,
          top: -1000000,
          bottom: 1000000,
        }}
        onDrag={(_, info) => {
          rotateY.set(rotateY.get() + info.delta.x * 0.4);
          rotateX.set(rotateX.get() - info.delta.y * 0.4);
        }}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div className="relative" style={{ perspective: "2500px" }}>
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

      <div className="absolute bottom-10 font-mono text-[9px] tracking-[0.5em] text-emerald-500/30 uppercase">
        Omnidirectional_Interface_Activated
      </div>
    </div>
  );
}

function Card({ item, index, total, radius, globalY, globalX }: any) {
  const angleStep = 360 / total;
  const initialAngle = index * angleStep;

  // Calcul du FOCUS OPTIQUE (Distance par rapport au centre du regard)
  const distanceToCenter = useTransform([globalY, globalX], ([y, x]: any) => {
    const currentAngle = (y + initialAngle) % 360;
    const normalized = ((((currentAngle + 180) % 360) + 360) % 360) - 180;
    // On prend en compte l'inclinaison X pour le flou
    return Math.sqrt(Math.pow(normalized, 2) + Math.pow(x, 2) * 0.1);
  });

  const blur = useTransform(
    distanceToCenter,
    [0, 25, 100],
    ["blur(0px)", "blur(2px)", "blur(30px)"]
  );
  const opacity = useTransform(distanceToCenter, [0, 90, 160], [1, 0.4, 0]);
  const z = useTransform(distanceToCenter, [0, 90], [150, -300]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "min(85vw, 420px)",
        height: "280px",
        transformStyle: "preserve-3d",
        rotateY: initialAngle,
        transformOrigin: `center center -${radius}px` as any,
        filter: blur,
        opacity,
        z,
      }}
      className={cn(
        "p-10 rounded-[40px] border border-white/10 flex flex-col justify-between",
        "bg-zinc-900/40 backdrop-blur-[50px] shadow-[0_0_100px_rgba(0,0,0,0.8)]"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] text-emerald-400 font-black tracking-widest uppercase">
            S_NODE_0{item.id}
          </span>
          <div className="h-0.5 w-8 bg-emerald-500/50 rounded-full" />
        </div>
        <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981]" />
      </div>

      <div className="my-4">
        <h3 className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">
          {item.title}
        </h3>
        <div className="text-[clamp(2.5rem,8vw,4.5rem)] font-black italic text-white tracking-tighter leading-none tabular-nums">
          {item.value}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-6">
        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
          {item.desc}
        </p>
        <div className="text-[8px] font-mono text-emerald-500/40 px-2 py-0.5 border border-emerald-500/20 rounded">
          ENC_V2
        </div>
      </div>
    </motion.div>
  );
}
