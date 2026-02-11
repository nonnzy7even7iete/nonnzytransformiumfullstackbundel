"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  { id: 1, title: "ALPHA_NODE", value: "84.2", desc: "STABLE_CONNECTION" },
  { id: 2, title: "DATA_CORE", value: "12.4k", desc: "SYNC_COMPLETE" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "ZERO_POINT" },
  { id: 4, title: "CAPITAL", value: "450k", desc: "FLOW_INDEX" },
  { id: 5, title: "RELIANCE", value: "99.9", desc: "ENCRYPTED" },
];

export default function SwipeBox3D() {
  const [index, setIndex] = useState(0);

  // x est la valeur brute du swipe
  const x = useMotionValue(0);

  // rotationY est la version fluide (spring) pour l'effet visuel
  const rotationY = useSpring(0, {
    stiffness: 150, // Très nerveux
    damping: 25,
    mass: 0.8,
  });

  const onDragEnd = (_: any, info: any) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    // Logique de swipe "App Native" (distance ou vitesse)
    if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -velocityThreshold
    ) {
      if (index < DATA.length - 1) {
        setIndex(index + 1);
        rotationY.set((index + 1) * -72); // 360 / 5 = 72 degrés par carte
      }
    } else if (
      info.offset.x > swipeThreshold ||
      info.velocity.x > velocityThreshold
    ) {
      if (index > 0) {
        setIndex(index - 1);
        rotationY.set((index - 1) * -72);
      }
    }

    // On réinitialise toujours x pour le prochain swipe
    x.set(0);
  };

  return (
    <div className="relative h-screen w-full bg-[#030303] overflow-hidden flex items-center justify-center">
      {/* Zone de Capture de Geste (Invisible mais Prioritaire) */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x }}
        onDrag={(_, info) => {
          // On fait bouger la rotation en direct pendant le drag pour le feedback visuel
          rotationY.set(index * -72 + info.offset.x / 10);
        }}
        onDragEnd={onDragEnd}
        className="absolute inset-0 z-[100] cursor-grab active:cursor-grabbing"
      />

      <div
        className="relative pointer-events-none"
        style={{ perspective: "2000px" }}
      >
        <motion.div
          style={{
            rotateY: rotationY,
            transformStyle: "preserve-3d",
          }}
          className="relative flex items-center justify-center"
        >
          {DATA.map((item, i) => (
            <Card
              key={item.id}
              item={item}
              i={i}
              total={DATA.length}
              activeIndex={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Barre de Progression (Style Mobile App) */}
      <div className="absolute bottom-16 flex gap-2">
        {DATA.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: index === i ? 32 : 8,
              opacity: index === i ? 1 : 0.2,
            }}
            className="h-1 bg-emerald-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

function Card({ item, i, total, activeIndex }: any) {
  const angle = (i / total) * 360;
  const isFocused = activeIndex === i;
  const radius = 550; // Rayon pour écarter les cartes

  return (
    <motion.div
      style={
        {
          position: "absolute",
          width: "min(85vw, 400px)",
          height: "500px",
          transformStyle: "preserve-3d",
          // Positionnement cylindrique strict
          transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        } as any
      }
      animate={{
        opacity: isFocused ? 1 : 0.05,
        scale: isFocused ? 1 : 0.8,
        filter: isFocused ? "blur(0px)" : "blur(10px)",
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "p-10 rounded-[40px] border flex flex-col justify-between",
        "bg-zinc-900/10 backdrop-blur-md border-white/5",
        isFocused && "border-emerald-500/30 bg-emerald-500/[0.02]"
      )}
    >
      <div className="flex justify-between items-start">
        <div className="text-[10px] font-black tracking-[0.4em] text-emerald-500/50 uppercase">
          Protocol_V6
        </div>
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            isFocused
              ? "bg-emerald-500 shadow-[0_0_15px_#10b981]"
              : "bg-white/10"
          )}
        />
      </div>

      <div>
        <h3 className="text-white/10 text-xs font-bold tracking-[0.5em] mb-4 uppercase">
          {item.title}
        </h3>
        <div className="text-8xl font-black italic text-white tracking-tighter leading-[0.8]">
          {item.value}
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-px w-full bg-white/5" />
        <p className="text-[10px] text-white/20 tracking-[0.2em] font-medium italic uppercase">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}
