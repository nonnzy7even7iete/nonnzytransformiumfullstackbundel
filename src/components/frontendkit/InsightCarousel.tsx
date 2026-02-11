"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const DATA = [
  { id: 1, title: "FLUX ALPHA", value: "84.2%", desc: "Node_Primary" },
  { id: 2, title: "CORE_DATA", value: "12.4k", desc: "Sync_Verified" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "Protocol_Zero" },
  { id: 4, title: "REVENUE", value: "450k", desc: "Capital_Flow" },
  { id: 5, title: "STABILITY", value: "99.9%", desc: "Safe_Active" },
];

export default function PerfectScrollCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. On capture le scroll progressif
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. On transforme le scroll en rotation (360°) avec un ressort ultra-précis
  const rotationY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -360]),
    { stiffness: 50, damping: 25, mass: 1 }
  );

  return (
    <div
      ref={containerRef}
      // h-[500vh] crée l'espace de scroll, snap-y force l'arrêt sur les cartes
      className="relative h-[500vh] w-full bg-black overflow-x-hidden snap-y snap-mandatory"
    >
      {/* 3. Les ancres de Snap (Indispensables pour l'effet "Evidence") */}
      {DATA.map((_, i) => (
        <div key={i} className="h-screen w-full snap-start snap-always" />
      ))}

      {/* 4. Le rendu visuel (Fixe) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1800px" }}
        >
          <motion.div
            style={{ rotateY: rotationY, transformStyle: "preserve-3d" }}
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
  item: any;
  index: number;
  total: number;
  rotationY: MotionValue<number>;
}) {
  const initialAngle = (index / total) * 360;
  const radius = 600; // Rayon massif pour l'espace

  // Calcul de la proximité du centre pour le focus
  const distance = useTransform(rotationY, (r: number) => {
    const currentAngle = (Math.abs(r) - initialAngle) % 360;
    const normalized = Math.abs(
      currentAngle > 180 ? 360 - currentAngle : currentAngle
    );
    return normalized;
  });

  // Animation d'évidence (Snap visuel)
  const opacity = useTransform(distance, [0, 40, 80], [1, 0.2, 0]);
  const scale = useTransform(distance, [0, 40], [1.1, 0.8]);
  const blur = useTransform(distance, [0, 40], ["blur(0px)", "blur(15px)"]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "min(85vw, 420px)",
        height: "280px",
        transformStyle: "preserve-3d",
        rotateY: initialAngle,
        z: radius,
        opacity,
        scale,
        filter: blur,
      }}
      className={cn(
        "p-10 rounded-[50px] border border-white/10",
        "bg-zinc-900/40 backdrop-blur-3xl flex flex-col justify-between"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-[11px] text-emerald-500 font-black tracking-widest">
          UNIT_{item.id}
        </span>
        <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981]" />
      </div>

      <div className="space-y-1">
        <h3 className="text-white/10 text-[9px] uppercase tracking-[0.5em] font-bold">
          {item.title}
        </h3>
        <div className="text-6xl font-black italic text-white tracking-tighter leading-none">
          {item.value}
        </div>
      </div>

      <div className="text-[10px] text-white/30 border-t border-white/5 pt-6 uppercase tracking-[0.2em]">
        {item.desc}
      </div>
    </motion.div>
  );
}
