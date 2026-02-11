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
    badge: "MANTRA",
    title: "DATA_DRIVEN_LOGICL",
    description:
      "La donnée est la seule monnaie de rechange contre l’échec stratégique. Piloter une commune sans data, c'est naviguer sans radar dans un champ de mines financier. Réveiller cet angle mort, c’est convertir le vortex de l'exécutif, de la recherche de l'attention, à l'imposition d'un crédit de souveraineté.",
    image: "/IMG-20260211-WA0000.jpg",
  },
  {
    badge: "02_STRATEGY",
    title:
      "Je suis Diane Chaka Junior Ingénieur IT, Data Analyste en Intelligence Économique",
    description:
      "Anyama sera une valeur sûre sous l'algorithme ZY, soit la première commune de Côte d'Ivoire dotée d'un radar économique. Un outil capable de synchroniser les ressources officielles avec les réalités du terrain. Ce radar ne suit pas les événements, il les précède. En réveillant cet angle mort, nous créons un bouclier contre les opportunités manquées et un aimant à investissements massifs.",
    image: "/IMG-20260116-WA0000.jpg",
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
      className="relative w-full bg-black text-white overflow-hidden"
    >
      <NavbarFront />

      {/* BEAM (Tracing Line) */}
      <div className="absolute left-4 md:left-8 top-0 h-full w-[1px] hidden sm:block">
        <div className="h-full w-full bg-white/10 absolute inset-0" />
        <motion.div
          style={{ height: beamY }}
          className="absolute w-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
        />
      </div>

      <div
        ref={contentRef}
        className="flex flex-col items-center w-full relative z-10 pt-28 pb-20 gap-20"
      >
        {ZYMANTRA_CONTENT.map((item, index) => (
          /* Card Container Simulation */
          <div
            key={index}
            className="flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]"
          >
            {/* Card Body Simulation */}
            <div className="group/card relative bg-gray-900/50 border border-white/10 w-[94vw] md:w-[920px] rounded-3xl p-6 md:p-10 transition-all duration-200 ease-linear hover:shadow-2xl hover:shadow-emerald-500/[0.1] flex flex-col md:flex-row items-center gap-10">
              {/* IMAGE SECTION (Simulated CardItem translateZ) */}
              <div className="w-full md:w-[45%] transition-transform duration-500 group-hover/card:[transform:translateZ(60px)]">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
                  <img
                    src={item.image}
                    className="h-full w-full object-cover object-top grayscale-[0.3] group-hover/card:grayscale-0 transition-all duration-700"
                    alt="Diane Chaka"
                  />
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 h-3 w-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-pulse" />
                </div>
              </div>

              {/* TEXT CONTENT (Simulated CardItem translateZ) */}
              <div className="flex-1 flex flex-col items-start text-left transition-transform duration-500 group-hover/card:[transform:translateZ(40px)]">
                <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] mb-4 uppercase">
                  {item.badge}
                </span>

                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-6 uppercase leading-tight text-white drop-shadow-md">
                  {item.title}
                </h2>

                <p className="text-base md:text-lg leading-relaxed text-neutral-400 font-medium">
                  {item.description}
                </p>

                {/* SLOT POUR LE FUTUR COMPOSANT BOUTON */}
                <div className="mt-10 transition-transform duration-500 group-hover/card:[transform:translateZ(20px)]">
                  <button className="px-6 py-3 rounded-full bg-white text-black text-xs font-bold hover:bg-emerald-500 hover:text-white transition-colors">
                    DÉCOUVRIR LA VISION
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
