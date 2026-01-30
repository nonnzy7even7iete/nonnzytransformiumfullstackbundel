"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";

// Imports des composants locaux
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { AnimatedGradientText } from "@/components/frontendkit/animated-gradient-text";
import { cn } from "@/lib/utils";

// --- CONFIGURATION TECHNIQUE (PROPS & THEME) ---
const UI_THEME = {
  // Police Oswald + Lueur pour les parties techniques
  techBold: "font-oswald font-black uppercase tracking-tighter leading-none",
  // Police Mono pour les labels système
  machineLabel:
    "font-mono-tech uppercase tracking-[0.4em] text-[10px] opacity-70",
  // Texte narratif standard
  narrative:
    "font-sans text-slate-500 dark:text-zinc-400 font-medium tracking-tight",
};

const HERO_CONTENT = {
  label: "Decision Resilience Protocol // v2.0.26",
  title: "NONNZYTR",
  titleSuffix: "OPERATE",
  intro: "Là où la décision devient instable,",
  rotatingWords: [
    "SIGNAUX CONTRADICTOIRES",
    "DONNÉES INCOMPLÈTES",
    "INTUITION DANGEREUSE",
  ],
  footerPrefix: "Zy introduis une",
  footerHighlight: "LOGIQUE MESURABLE",
};

// Chargement dynamique du Globe pour les performances
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-white dark:bg-[#020408]" />
    ),
  }
);

const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "Network Engine",
    designation: "Status: Active",
    content: (
      <p className="text-sm">
        Routing packets from{" "}
        <span className="font-bold text-green-500">Abidjan Hub</span> to Global
        Nodes.
      </p>
    ),
  },
  {
    id: 1,
    name: "Security Protocol",
    designation: "Shield: 100%",
    content: (
      <p className="text-sm font-mono uppercase tracking-tighter">
        End-to-end encryption: ACTIVE
      </p>
    ),
  },
];

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = useMemo(
    () => [
      { label: "AMÉRIQUE DU NORD", lat: 39.82, lng: -98.57 },
      { label: "EUROPE", lat: 50.11, lng: 14.42 },
      { label: "ASIE", lat: 43.67, lng: 87.33 },
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(
      () => setIndex((p) => (p + 1) % destinations.length),
      6000
    );
    const readyTimer = setTimeout(() => setIsGlobeReady(true), 1000);
    return () => {
      clearInterval(timer);
      clearTimeout(readyTimer);
    };
  }, [destinations.length]);

  if (!mounted)
    return <div className="min-h-screen bg-white dark:bg-[#020408]" />;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] selection:bg-green-500/30">
      <NavbarFront />

      {/* --- SECTION HERO : REFACTORED --- */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center pt-32 pb-20 overflow-hidden border-b border-black/5 dark:border-white/5">
        <WarpBackground
          className="w-full h-full"
          gridColor="rgba(34, 197, 94, 0.15)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full space-y-16"
            >
              {/* Titre Principal */}
              <div className="space-y-6">
                <span className={UI_THEME.machineLabel}>
                  {HERO_CONTENT.label}
                </span>
                <h1
                  className={cn(
                    "text-6xl md:text-9xl drop-shadow-sm",
                    UI_THEME.techBold
                  )}
                >
                  {HERO_CONTENT.title}{" "}
                  <span className="text-green-500">
                    {HERO_CONTENT.titleSuffix}
                  </span>
                </h1>
              </div>

              {/* WordRotate Technique */}
              <div className="flex flex-col items-center gap-4">
                <p
                  className={cn(
                    "text-lg md:text-xl italic",
                    UI_THEME.narrative
                  )}
                >
                  {HERO_CONTENT.intro}
                </p>
                <div className="h-24 flex items-center justify-center w-full">
                  <WordRotate
                    className={cn(
                      "text-3xl md:text-6xl bg-gradient-to-r from-[#f97316] to-[#22c55e] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]",
                      UI_THEME.techBold
                    )}
                    duration={3000}
                    words={HERO_CONTENT.rotatingWords}
                  />
                </div>
              </div>

              {/* Badge CTA Final */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="pt-10 flex flex-col items-center gap-6"
              >
                <p
                  className={cn(
                    "text-xl md:text-2xl opacity-60",
                    UI_THEME.techBold
                  )}
                >
                  {HERO_CONTENT.footerPrefix}
                </p>

                {/* Badge Badge Animated Gradient */}
                <div className="group relative mx-auto flex items-center justify-center rounded-full px-6 py-3 transition-all duration-500 bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl">
                  {/* Border Beam Logic */}
                  <span
                    className="absolute inset-0 block h-full w-full rounded-[inherit] p-[1.5px]"
                    style={{
                      background:
                        "linear-gradient(90deg, #f97316 0%, #22c55e 50%, #f97316 100%)",
                      backgroundSize: "200% 100%",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "destination-out",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "subtract",
                      animation: "logic-gradient 4s linear infinite",
                    }}
                  />

                  <Zap className="size-5 mr-2 text-green-500 fill-green-500/20" />
                  <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500/30" />

                  <AnimatedGradientText
                    className={cn("text-xl md:text-3xl", UI_THEME.techBold)}
                  >
                    {HERO_CONTENT.footerHighlight}
                  </AnimatedGradientText>

                  <ChevronRight className="ml-2 size-5 text-neutral-500 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </WarpBackground>

        {/* CSS Injected pour les animations spécifiques */}
        <style jsx global>{`
          @keyframes logic-gradient {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 200% 50%;
            }
          }
        `}</style>
      </section>

      {/* --- SECTION LOGS --- */}
      <section className="relative z-30 w-full py-24 px-6 flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className={UI_THEME.machineLabel}>Node Monitoring</span>
            <h2 className={cn("text-4xl md:text-6xl", UI_THEME.techBold)}>
              Real-Time <br />
              <span className="text-green-500">Infrastructure</span>
            </h2>
            <p className={cn("text-lg max-w-sm", UI_THEME.narrative)}>
              Flux de données synchronisé sur le backbone fibre de Côte
              d'Ivoire.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[400px]">
            <CardStack items={LOG_CARDS_DATA} offset={10} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- SECTION GLOBE --- */}
      <section className="relative h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isGlobeReady ? 1 : 0 }}
          className="absolute inset-0 z-0"
        >
          <World
            data={[
              {
                order: 1,
                startLat: ABIDJAN.lat,
                startLng: ABIDJAN.lng,
                endLat: destinations[index].lat,
                endLng: destinations[index].lng,
                arcAlt: 0.4,
                color: "#22c55e",
              },
            ]}
          />
        </motion.div>
        <div className="relative z-10 text-center pointer-events-none px-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={destinations[index].label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn("text-4xl md:text-8xl", UI_THEME.techBold)}
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 border-t border-black/5 dark:border-white/5 text-center opacity-40">
        <p className={UI_THEME.machineLabel}>
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
