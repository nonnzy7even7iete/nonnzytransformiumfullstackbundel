"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  MotionValue,
} from "framer-motion";

interface ZymantraSection {
  badge: string;
  title: string;
  description: string;
  image: string;
}

// --- CONFIGURATION DES IMAGES ---
// Note : Si tes images sont dans /public/images, utilise "/images/nom.jpg"
const ZYMANTRA_CONTENT: ZymantraSection[] = [
  {
    badge: "01_VISION",
    title: "ZYMANTRA_PROTOCOL",
    description:
      "Infrastructure de monitoring sans latence pour l'hyper-réactivité.",
    image: "/src/public/Nonn.jpg",
  },
  {
    badge: "02_STRATEGY",
    title: "MARKET_FLOW",
    description: "Standardisation des flux financiers complexes.",
    image: "/src/public/IMG-20260116-WA0000.jpg",
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
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
      className="relative w-full bg-black py-12 md:py-24 font-sans antialiased overflow-x-hidden text-white"
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
            strokeOpacity="0.1"
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
        {ZYMANTRA_CONTENT.map((item, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setActiveIdx(index)}
            onMouseLeave={() => setActiveIdx(null)}
            onTouchStart={() => setActiveIdx(index)}
            animate={{
              opacity: activeIdx !== null && activeIdx !== index ? 0.2 : 1,
              filter:
                activeIdx !== null && activeIdx !== index
                  ? "blur(10px)"
                  : "blur(0px)",
            }}
            className="mb-32 flex flex-col items-center w-full px-4"
          >
            {/* BADGE AVEC BORDURE ÉMERAUDE */}
            <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase px-4 py-2 border border-emerald-500/20 bg-emerald-500/5 mb-8 rounded-full">
              {item.badge}
            </span>

            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-10 uppercase text-center leading-none">
              {item.title}
            </h2>

            {/* CONTAINER IMAGE : 90vw mobile, bordures restaurées */}
            <div className="relative w-[90vw] md:w-[800px] aspect-video rounded-2xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img
                src={item.image}
                alt="Zymantra Graphic"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  e.currentTarget.src =
                    "https://placehold.co/800x450/000000/10b981?text=IMAGE_NOT_FOUND";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* INDICATEUR 7PX interne pour être sûr qu'il soit visible */}
              <div className="absolute top-[7px] right-[7px] h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
            </div>

            <p className="max-w-xl text-white/60 text-center text-lg md:text-xl mt-10 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
