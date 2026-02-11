"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import NavbarFront from "./NavbarFront"; // Import depuis le même dossier

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
    const timer = setTimeout(update, 500);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
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
      className="relative w-full transition-colors duration-500 bg-white dark:bg-black font-sans antialiased text-black dark:text-white"
    >
      {/* NAVBAR INTÉGRÉE */}
      <NavbarFront />

      {/* LE BEAM (Adaptatif au thème) */}
      <div
        className="absolute left-6 md:left-12 top-0 h-full w-[2px] hidden md:block"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-black/5 dark:bg-white/5 absolute inset-0" />
        <motion.div
          style={{ height: beamY, top: 0 }}
          className="absolute w-full bg-gradient-to-b from-transparent via-emerald-500 to-emerald-400 shadow-[0_0_15px_#10b981]"
        />
      </div>

      <div
        ref={contentRef}
        className="flex flex-col items-center w-full relative z-10 pt-32"
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
                filter: isInactive ? "blur(8px)" : "blur(0px)",
              }}
              className="mb-32 w-[95vw] md:w-[900px] relative border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md rounded-[2rem] p-6 md:p-12 overflow-hidden transition-all duration-500 hover:border-emerald-500/30"
            >
              {/* INDICATEUR 7PX */}
              <div className="absolute top-[7px] right-[7px] h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] z-50" />

              <div className="flex flex-col items-center">
                {/* BADGE (Adaptatif) */}
                <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase px-4 py-1.5 border border-emerald-500/20 bg-emerald-500/5 mb-8 rounded-full">
                  {item.badge}
                </span>

                {/* TITRE */}
                <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-10 uppercase text-center leading-none">
                  {item.title}
                </h2>

                {/* IMAGE BOX */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/800x450/000000/10b981?text=FICHIER_MANQUANT";
                    }}
                  />
                  {/* Overlay adaptatif */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 dark:from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* DESCRIPTION */}
                <p className="max-w-xl text-black/60 dark:text-white/50 text-center text-lg md:text-xl mt-10 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
