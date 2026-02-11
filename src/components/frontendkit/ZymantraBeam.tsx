"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import NavbarFront from "./NavbarFront";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

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
      className="relative w-full bg-black text-white" // Fallback direct pour éviter les erreurs de variables CSS
    >
      <NavbarFront />

      {/* BEAM */}
      <div className="absolute left-4 md:left-8 top-0 h-full w-[1px] hidden sm:block">
        <div className="h-full w-full opacity-10 absolute inset-0 bg-white/20" />
        <motion.div
          style={{ height: beamY }}
          className="absolute w-full bg-emerald-500 shadow-[0_0_12px_#10b981]"
        />
      </div>

      <div
        ref={contentRef}
        className="flex flex-col items-center w-full relative z-10 pt-28 pb-20 gap-4"
      >
        {ZYMANTRA_CONTENT.map((item, index) => (
          <CardContainer key={index} className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[920px] h-auto rounded-xl p-6 md:p-10 border flex flex-col md:flex-row items-center gap-8">
              {/* IMAGE */}
              <CardItem translateZ="100" className="w-full md:w-[45%]">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                  <img
                    src={item.image}
                    className="h-full w-full object-cover object-top grayscale-[0.2] group-hover/card:grayscale-0 transition-all duration-700"
                    alt="Diane Chaka"
                  />
                  <div className="absolute top-[10px] right-[10px] h-3 w-3 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] animate-pulse" />
                </div>
              </CardItem>

              {/* CONTENU */}
              <div className="flex-1 flex flex-col items-start text-left">
                <CardItem
                  translateZ="50"
                  className="text-emerald-500 text-[10px] font-black tracking-[0.4em] mb-4 uppercase"
                >
                  {item.badge}
                </CardItem>

                <CardItem
                  translateZ="60"
                  className="text-3xl md:text-5xl font-black italic tracking-tighter mb-6 uppercase leading-tight text-neutral-600 dark:text-white"
                >
                  {item.title}
                </CardItem>

                <CardItem
                  translateZ="40"
                  className="text-base md:text-lg leading-relaxed text-neutral-500 dark:text-neutral-300 font-medium"
                >
                  {item.description}
                </CardItem>

                <div className="mt-10">
                  <CardItem
                    translateZ={20}
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    Découvrir la Vision
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
