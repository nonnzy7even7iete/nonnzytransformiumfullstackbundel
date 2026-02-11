"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Interface pour la Data
interface ZymantraSection {
  badge: string;
  title: string;
  description: string;
  image: string;
}

const ZYMANTRA_CONTENT: ZymantraSection[] = [
  {
    badge: "01_VISION",
    title: "ZYMANTRA_PROTOCOL",
    description:
      "Infrastructure de monitoring sans latence, conçue pour l'ère de l'hyper-réactivité.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
  },
  {
    badge: "02_STRATEGY",
    title: "MARKET_FLOW",
    description: "Standardisation des flux financiers complexes et visuels.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000",
  },
];

export default function Zymantra() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Types explicites pour les MotionValues pour calmer TS
  const y1: MotionValue<number> = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 400, damping: 90 }
  );
  const y2: MotionValue<number> = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, svgHeight - 20]),
    { stiffness: 400, damping: 90 }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto py-24 px-6 font-sans antialiased"
    >
      {/* SVG BEAM */}
      <div
        className="absolute left-6 md:left-12 top-0 h-full"
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="block"
        >
          <path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
          <motion.path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#zymantra-laser)"
            strokeWidth="2"
          />
          <defs>
            <motion.linearGradient
              id="zymantra-laser"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1 as any}
              y2={y2 as any}
            >
              <stop stopColor="#10b981" stopOpacity="0" />
              <stop stopColor="#10b981" />
              <stop stopColor="#34d399" />
              <stop stopColor="#6ee7b7" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      <div ref={contentRef} className="ml-16 md:ml-32">
        {ZYMANTRA_CONTENT.map((item, index) => (
          <div
            key={`section-${index}`}
            className="mb-40 relative group text-left"
          >
            {/* INDICATEUR 7PX */}
            <div className="absolute top-[7px] right-[7px] h-1.5 w-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] z-20" />

            <span className="text-emerald-500 text-[9px] font-black tracking-[0.5em] uppercase px-3 py-1.5 border border-emerald-500/10 bg-emerald-500/5 mb-8 inline-block">
              {item.badge}
            </span>

            <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter mb-10 uppercase leading-none">
              {item.title}
            </h2>

            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-3xl mb-12 shadow-2xl">
              <img
                src={item.image}
                alt=""
                className="w-full h-[450px] object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            </div>

            <div className="max-w-2xl text-white/50 text-xl leading-relaxed">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
