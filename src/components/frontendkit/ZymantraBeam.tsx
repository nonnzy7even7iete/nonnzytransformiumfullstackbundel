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
      "Ton paragraphe de 77 mots ici. Le ratio est maintenant optimisé pour que le visage du sujet reste parfaitement cadré et visible, peu importe la taille de l'écran.",
    image: "/IMG-20260211-WA0000.jpg",
  },
  {
    badge: "02_STRATEGY",
    title: "MARKET_FLOW",
    description:
      "Deuxième section avec inversion du layout. Cette alternance visuelle permet de maintenir l'attention de l'investisseur tout au long des 7 paragraphes du Business Plan.",
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
    { stiffness: 80, damping: 25 }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-colors duration-200"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <NavbarFront />

      {/* BEAM */}
      <div
        className="absolute left-4 md:left-8 top-0 h-full w-[1px] hidden sm:block"
        aria-hidden="true"
      >
        <div
          className="h-full w-full opacity-10 absolute inset-0"
          style={{ backgroundColor: "var(--border-color)" }}
        />
        <motion.div
          style={{ height: beamY }}
          className="absolute w-full bg-emerald-500 shadow-[0_0_12px_#10b981]"
        />
      </div>

      <div
        ref={contentRef}
        className="flex flex-col items-center w-full relative z-10 pt-28 pb-20 gap-[14px]"
      >
        {ZYMANTRA_CONTENT.map((item, index) => {
          const isInactive = activeIdx !== null && activeIdx !== index;
          // Logique d'alternance : pair = normal, impair = reverse
          const isEven = index % 2 === 0;

          return (
            <motion.section
              key={index}
              onMouseEnter={() => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              animate={{
                opacity: isInactive ? 0.3 : 1,
                filter: isInactive ? "blur(8px)" : "blur(0px)",
              }}
              className={`v-card w-[96vw] md:w-[920px] flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 p-6 md:p-10 transition-all duration-300`}
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                borderRadius: "var(--radius-vercel)",
              }}
            >
              {/* IMAGE : Cadrage forcé sur le haut pour le visage */}
              <div
                className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-square overflow-hidden border shadow-xl"
                style={{
                  borderColor: "var(--border-color)",
                  borderRadius: "var(--radius-vercel-zy)",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover object-top grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-[7px] right-[7px] h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
              </div>

              {/* TEXTE */}
              <div className="flex-1 flex flex-col items-start text-left">
                <span className="text-emerald-500 text-[10px] font-black tracking-[0.4em] mb-4">
                  {item.badge}
                </span>
                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-6 uppercase leading-tight">
                  {item.title}
                </h2>
                <p className="text-base md:text-lg leading-relaxed opacity-70 font-medium">
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
