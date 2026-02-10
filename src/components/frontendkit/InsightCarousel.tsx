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

// 1. Définition du type pour stabiliser TS
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
  const [data, setData] = useState<InsightData[]>(initialInsights);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value:
            (
              parseFloat(item.value.replace(/[^0-9.]/g, "")) +
              (Math.random() - 0.5) * 2
            ).toFixed(1) + item.value.replace(/[0-9.]/g, ""),
        }))
      );
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothRotation = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full">
      {/* Correction perspective via style direct */}
      <div
        className="sticky top-1/2 -translate-y-1/2 h-[600px] w-full flex items-center justify-center overflow-visible"
        style={{ perspective: "1500px" }}
      >
        <div
          className="relative w-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {data.map((item, i) => (
            <Card
              key={item.id}
              item={item}
              index={i}
              total={data.length}
              progress={smoothRotation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. Typage des props de la Card
interface CardProps {
  item: InsightData;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Card({ item, index, total, progress }: CardProps) {
  const angleStep = 360 / total;
  const startAngle = index * angleStep;

  const rotation = useTransform(
    progress,
    [0, 1],
    [startAngle, startAngle + 360]
  );

  const scale = useTransform(
    rotation,
    [startAngle - 60, startAngle, startAngle + 60],
    [0.8, 1.2, 0.8]
  );
  const opacity = useTransform(
    rotation,
    [startAngle - 90, startAngle, startAngle + 90],
    [0.1, 1, 0.1]
  );
  const brightness = useTransform(
    rotation,
    [startAngle - 60, startAngle, startAngle + 60],
    [
      "grayscale(100%) blur(4px)",
      "grayscale(0%) blur(0px)",
      "grayscale(100%) blur(4px)",
    ]
  );

  return (
    <motion.div
      style={{
        rotateY: rotation,
        transformOrigin: "center center -500px", // Rayon du carrousel
        opacity,
        scale,
        filter: brightness,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "absolute w-[280px] h-[180px] p-6 rounded-2xl",
        "bg-zinc-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl",
        "flex flex-col justify-between"
      )}
    >
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono text-emerald-500 font-bold tracking-[0.2em]">
          LIVE_NODE_0{index + 1}
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
      </div>

      <div>
        <h3 className="text-white/40 text-[8px] uppercase tracking-[0.3em] mb-1">
          {item.title}
        </h3>
        <div className="text-3xl font-black italic text-white tracking-tighter">
          {item.value}
        </div>
      </div>

      <div className="text-[8px] text-white/20 font-mono uppercase tracking-widest border-t border-white/5 pt-3">
        {item.desc}
      </div>
    </motion.div>
  );
}
