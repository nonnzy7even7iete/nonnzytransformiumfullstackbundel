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

const initialInsights: InsightData[] = [
  { id: 1, title: "FLUX ALPHA", value: "84.2%", desc: "Anyama_Node" },
  { id: 2, title: "CORE_DATA", value: "12.4k", desc: "Sync_Active" },
  { id: 3, title: "LATENCY", value: "0.4ms", desc: "Ultra_Low" },
  { id: 4, title: "REVENUE", value: "450k", desc: "Target_Hub" },
  { id: 5, title: "STABILITY", value: "99.9%", desc: "Protocol_Safe" },
];

export default function InsightCarousel() {
  const [data, setData] = useState<InsightData[]>(initialInsights);
  const [radius, setRadius] = useState(-500); // Rayon dynamique
  const containerRef = useRef<HTMLDivElement>(null);

  // Gestion du responsive pour le rayon du cercle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(-280); // Rayon serré pour mobile
      } else {
        setRadius(-500); // Rayon large pour desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div
      ref={containerRef}
      className="relative h-[250vh] w-full bg-background/50"
    >
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {/* Label de flux visible */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-500/50 block mb-2">
            System_Analysis
          </span>
          <div className="h-px w-12 bg-emerald-500/20 mx-auto" />
        </div>

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
              radius={radius}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  item: InsightData;
  index: number;
  total: number;
  progress: MotionValue<number>;
  radius: number;
}

function Card({ item, index, total, progress, radius }: CardProps) {
  const angleStep = 360 / total;
  const startAngle = index * angleStep;

  const rotation = useTransform(
    progress,
    [0, 1],
    [startAngle, startAngle + 360]
  );

  // Adaptabilité des échelles selon l'angle
  const scale = useTransform(
    rotation,
    [startAngle - 60, startAngle, startAngle + 60],
    [0.8, 1.1, 0.8]
  );
  const opacity = useTransform(
    rotation,
    [startAngle - 90, startAngle, startAngle + 90],
    [0, 1, 0]
  );

  return (
    <motion.div
      style={{
        rotateY: rotation,
        transformOrigin: `center center ${radius}px`,
        opacity,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "absolute w-[260px] md:w-[300px] h-[160px] md:h-[180px] p-6 rounded-2xl",
        "bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl",
        "flex flex-col justify-between"
      )}
    >
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-mono text-emerald-500 font-bold tracking-[0.2em]">
          NODE_0{index + 1}
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
      </div>

      <div>
        <h3 className="text-white/40 text-[8px] md:text-[9px] uppercase tracking-[0.3em] mb-1">
          {item.title}
        </h3>
        <div className="text-2xl md:text-3xl font-black italic text-white tracking-tighter tabular-nums">
          {item.value}
        </div>
      </div>

      <div className="text-[8px] text-white/20 font-mono uppercase tracking-widest border-t border-white/5 pt-3">
        {item.desc}
      </div>
    </motion.div>
  );
}
