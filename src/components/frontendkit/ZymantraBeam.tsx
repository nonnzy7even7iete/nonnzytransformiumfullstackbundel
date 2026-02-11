"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import NavbarFront from "./NavbarFront";

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
      "Infrastructure de monitoring sans latence pour l'hyper-réactivité.",
    image: "/IMG-20260211-WA0000.jpg",
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
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const beamY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
    {
      stiffness: 100,
      damping: 30,
    }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen transition-colors duration-200"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <NavbarFront />

      {/* BEAM CHIRURGICAL (S'adapte aux variables de bordure) */}
      <div
        className="absolute left-6 md:left-12 top-0 h-full w-[1px] hidden md:block"
        aria-hidden="true"
      >
        <div
          className="h-full w-full opacity-20 absolute inset-0"
          style={{ backgroundColor: "var(--border-color)" }}
        />
        <motion.div
          style={{ height: beamY }}
          className="absolute w-full bg-emerald-500 shadow-[0_0_8px_#10b981]"
        />
      </div>

      {/* FLUX : Gap de 3px entre les sections */}
      <div
        ref={contentRef}
        className="flex flex-col items-center w-full relative z-10 pt-24 gap-[3px]"
      >
        {ZYMANTRA_CONTENT.map((item, index) => {
          const isInactive = activeIdx !== null && activeIdx !== index;

          return (
            <motion.section
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              onTouchStart={() => setActiveIdx(index)}
              animate={{
                opacity: isInactive ? 0.3 : 1,
                filter: isInactive ? "blur(6px)" : "blur(0px)",
              }}
              className="v-card w-[98vw] md:w-[920px] relative p-4 md:p-6 overflow-hidden group cursor-default"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                borderRadius: "var(--radius-vercel)", // Utilisation de ton radius 7px
              }}
            >
              {/* INDICATEUR 7PX */}
              <div className="absolute top-[7px] right-[7px] h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] z-50" />

              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* IMAGE : Ratio 16/9 Fixé */}
                <div
                  className="relative w-full md:w-[380px] aspect-video overflow-hidden border"
                  style={{
                    borderColor: "var(--accents-2)",
                    borderRadius: "var(--radius-vercel-zy)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x337/000000/10b981?text=IMAGE_MISSING";
                    }}
                  />
                </div>

                {/* CONTENU TEXTUEL */}
                <div className="flex-1 flex flex-col items-start text-left">
                  <span className="text-emerald-500 text-[9px] font-black tracking-[0.4em] uppercase mb-2">
                    {item.badge}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter mb-3 uppercase leading-none">
                    {item.title}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed max-w-lg opacity-60">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
