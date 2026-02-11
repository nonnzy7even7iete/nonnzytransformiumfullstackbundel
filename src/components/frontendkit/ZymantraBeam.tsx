"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "framer-motion";

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
    image: "public/nonn.jpg",
  },
  {
    badge: "02_STRATEGY",
    title: "MARKET_FLOW",
    description: "Standardisation des flux financiers complexes et visuels.",
    image: "public/public/IMG-20260116-WA0000.jpg",
  },
];

export default function Zymantra() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

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
      className="relative w-full bg-black py-12 md:py-24 font-sans antialiased overflow-x-hidden"
    >
      {/* SVG BEAM - Masqué sur petit mobile pour le centrage, visible sur Desktop */}
      <div
        className="absolute left-4 md:left-12 top-0 h-full hidden sm:block"
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
            stroke="white"
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

      <div ref={contentRef} className="flex flex-col items-center w-full">
        {ZYMANTRA_CONTENT.map((item, index) => {
          const isBlurred = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              animate={{
                filter: isBlurred ? "blur(8px)" : "blur(0px)",
                opacity: isBlurred ? 0.3 : 1,
                scale: isBlurred ? 0.98 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="mb-24 md:mb-40 relative w-full flex flex-col items-center px-4 md:px-0 md:ml-32 md:items-start"
            >
              {/* INDICATEUR 7PX */}
              <div className="absolute top-[7px] right-[7px] h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] z-30" />

              <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase px-3 py-1.5 border border-emerald-500/10 bg-emerald-500/5 mb-6 inline-block">
                {item.badge}
              </span>

              <h2 className="text-3xl md:text-7xl font-black italic text-white tracking-tighter mb-8 uppercase text-center md:text-left leading-none">
                {item.title}
              </h2>

              {/* IMAGE : 90vw sur mobile, 100% du container sur Desktop */}
              <div className="relative w-[90vw] md:w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl mb-10 shadow-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[300px] md:h-[500px] object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className="max-w-2xl text-white/50 text-center md:text-left text-lg md:text-xl leading-relaxed">
                {item.description}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
