"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface InsightData {
  id: number;
  title: string;
  value: string;
  desc: string;
}

const initialInsights: InsightData[] = [
  { id: 1, title: "FLUX ALPHA", value: "84.2%", desc: "Anyama_Node" },
  { id: 2, title: "CORE_DATA", value: "12.4k", desc: "Sync_Active" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "Ultra_Low" },
  { id: 4, title: "REVENUE", value: "450k", desc: "Target_Hub" },
  { id: 5, title: "STABILITY", value: "99.9%", desc: "Protocol_Safe" },
];

export default function InsightCarousel() {
  const [data] = useState<InsightData[]>(initialInsights);

  // X est la position du "drag", qu'on transforme en rotation
  const x = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 60, damping: 20 });

  // On multiplie la valeur pour que le mouvement soit sensible
  const rotation = useTransform(rotateX, (latest) => latest / 2);

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden touch-none">
      {/* Overlay d'instruction */}
      <div className="absolute top-10 pointer-events-none text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] text-emerald-500/40 uppercase">
          Drag to Rotate _ Manipulate Nodes
        </p>
      </div>

      {/* Zone de capture du Drag (Invisible mais couvre tout) */}
      <motion.div
        drag="x"
        style={{ x }}
        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
      />

      {/* Scene 3D */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1800px" }}
      >
        <motion.div
          style={{
            rotateY: rotation,
            transformStyle: "preserve-3d",
          }}
          className="relative flex items-center justify-center w-[350px] md:w-[450px]"
        >
          {data.map((item, i) => (
            <Card
              key={item.id}
              item={item}
              index={i}
              total={data.length}
              rotation={rotation}
            />
          ))}
        </motion.div>
      </div>

      {/* Effet de Halo en arrière plan */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}

function Card({ item, index, total, rotation }: any) {
  const angleStep = 360 / total;
  const cardAngle = index * angleStep;

  // Rayon de 500px pour que les cartes soient imposantes
  const radius = 500;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "320px",
        height: "220px",
        transformStyle: "preserve-3d",
        // Positionnement en cercle parfait
        rotateY: cardAngle,
        transformOrigin: `center center -${radius}px`,
      }}
      className={cn(
        "p-8 rounded-[32px] transition-colors duration-500",
        "bg-zinc-900/90 backdrop-blur-3xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)]",
        "flex flex-col justify-between group select-none"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="block font-mono text-[10px] text-emerald-500 font-black tracking-widest uppercase">
            Node_0{index + 1}
          </span>
          <div className="h-0.5 w-6 bg-emerald-500/30" />
        </div>
        <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
      </div>

      <div>
        <h3 className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">
          {item.title}
        </h3>
        <div className="text-5xl font-black italic text-white tracking-tighter leading-none">
          {item.value}
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-white/5 pt-6">
        <div className="flex-1">
          <p className="text-[9px] text-white/20 uppercase tracking-widest leading-tight">
            {item.desc}
          </p>
        </div>
        <div className="text-[10px] font-mono text-emerald-500/40">
          SECURED_V2
        </div>
      </div>
    </motion.div>
  );
}
