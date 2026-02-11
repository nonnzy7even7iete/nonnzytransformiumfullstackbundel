"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";

interface ZymantraSection {
  badge: string;
  title: string;
  description: string;
  image: string;
}

// --- CONFIGURATION DES IMAGES CORRIGÉE ---
const ZYMANTRA_CONTENT: ZymantraSection[] = [
  {
    badge: "01_VISION",
    title: "ZYMANTRA_PROTOCOL",
    description:
      "Infrastructure de monitoring sans latence pour l'hyper-réactivité.",
    // ON RETIRE /src/public/ : on pointe directement à la racine de public
    image: "/Nonn.jpg",
  },
  {
    badge: "02_STRATEGY",
    title: "MARKET_FLOW",
    description: "Standardisation des flux financiers complexes.",
    image: "/IMG-20260116-WA0000.jpg",
  },
];

export default function Zymantra() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState<number>(0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const update = () => {
      if (contentRef.current) setSvgHeight(contentRef.current.offsetHeight);
    };
    update();
    // Timeout pour laisser le temps au layout de se stabiliser
    const timer = setTimeout(update, 500);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 400, damping: 90 }
  ) as any;
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, svgHeight - 20]),
    { stiffness: 400, damping: 90 }
  ) as any;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black py-12 md:py-24 font-sans antialiased overflow-x-hidden text-white selection:bg-emerald-500/30"
    >
      {/* SVG BEAM (Desktop seulement) */}
      <div
        className="absolute left-12 top-0 h-full hidden md:block"
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
            stroke="#10b981"
            strokeWidth="2"
            style={{ strokeDasharray: "0 1", pathLength: scrollYProgress }}
          />
        </svg>
      </div>

      <div
        ref={contentRef}
        className="flex flex-col items-center w-full relative z-10"
      >
        {ZYMANTRA_CONTENT.map((item, index) => {
          const isInactive = activeIdx !== null && activeIdx !== index;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              onTouchStart={() => setActiveIdx(index)}
              animate={{
                opacity: isInactive ? 0.3 : 1,
                filter: isInactive ? "blur(12px)" : "blur(0px)",
                scale: isInactive ? 0.98 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mb-32 flex flex-col items-center w-full px-4"
            >
              {/* BADGE */}
              <span className="text-emerald-400 text-[10px] font-black tracking-[0.5em] uppercase px-5 py-2 border border-emerald-500/30 bg-emerald-500/10 mb-8 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                {item.badge}
              </span>

              {/* TITRE */}
              <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-10 uppercase text-center leading-[0.9] drop-shadow-2xl">
                {item.title}
              </h2>

              {/* CONTAINER IMAGE : 90vw mobile, bordures blanches fines */}
              <div className="group relative w-[90vw] md:w-[850px] aspect-video rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/800x450/000000/10b981?text=CHECK_PATH_IN_PUBLIC";
                  }}
                />

                {/* Overlay pour lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* INDICATEUR 7PX : placé en haut à droite de l'image */}
                <div className="absolute top-[14px] right-[14px] h-2.5 w-2.5 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] z-30" />
              </div>

              {/* DESCRIPTION */}
              <p className="max-w-xl text-white/50 text-center text-lg md:text-xl mt-10 leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
