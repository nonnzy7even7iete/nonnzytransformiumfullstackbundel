"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Brain } from "lucide-react";

// Tes imports existants
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";

// --- 1. LE COMPOSANT BOUTON (Défini ici pour éviter les erreurs d'import) ---
const TechLogicButton = ({ text }: { text: string }) => (
  <div className="group relative flex items-center justify-center rounded-[2px] border-2 border-green-500/40 bg-black/60 px-10 py-5 transition-all duration-300 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] overflow-hidden cursor-pointer">
    {/* Effet Scanner Laser */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute left-0 w-full h-[2px] bg-green-500/40 shadow-[0_0_10px_#22c55e] animate-scan" />
    </div>

    <Brain className="size-7 mr-4 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
    <hr className="mx-4 h-8 w-px bg-green-500/20" />

    <span className="font-oswald font-black uppercase tracking-tighter text-2xl md:text-5xl text-green-500 leading-none">
      {text}
    </span>

    <ChevronRight className="ml-4 size-6 text-green-500/50 transition-transform group-hover:translate-x-1" />

    <style jsx>{`
      @keyframes scan-animation {
        0% {
          top: -10%;
        }
        100% {
          top: 110%;
        }
      }
      .animate-scan {
        position: absolute;
        animation: scan-animation 4s linear infinite;
      }
    `}</style>
  </div>
);

// --- 2. CONFIGURATION ---
const UI_THEME = {
  techBold: "font-oswald font-black uppercase tracking-tighter leading-none",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.4em] text-[10px] opacity-70",
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

const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "Network Engine",
    designation: "Status: Active",
    content: (
      <p className="text-sm">
        Routing packets from{" "}
        <span className="font-bold text-green-500">Abidjan Hub</span>.
      </p>
    ),
  },
  {
    id: 1,
    name: "Security Protocol",
    designation: "Shield: 100%",
    content: <p className="text-sm font-mono">End-to-end encryption active.</p>,
  },
];

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-white dark:bg-[#020408]" />
    ),
  }
);

// --- 3. PAGE PRINCIPALE ---
export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
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
    return () => clearInterval(timer);
  }, [destinations.length]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] selection:bg-green-500/30">
      <NavbarFront />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center pt-32 pb-20 overflow-hidden border-b border-black/5 dark:border-white/5">
        <WarpBackground
          className="w-full h-full"
          gridColor="rgba(34, 197, 94, 0.12)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-16"
            >
              <div className="space-y-6">
                <span className={UI_THEME.machineLabel}>
                  {HERO_CONTENT.label}
                </span>
                <h1 className={cn("text-7xl md:text-9xl", UI_THEME.techBold)}>
                  {HERO_CONTENT.title}{" "}
                  <span className="text-green-500">
                    {HERO_CONTENT.titleSuffix}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-4">
                <p
                  className={cn(
                    "text-lg md:text-xl italic",
                    UI_THEME.narrative
                  )}
                >
                  {HERO_CONTENT.intro}
                </p>
                <div className="h-24 flex items-center justify-center">
                  <WordRotate
                    className={cn(
                      "text-4xl md:text-7xl text-green-500",
                      UI_THEME.techBold
                    )}
                    words={HERO_CONTENT.rotatingWords}
                  />
                </div>
              </div>

              <div className="pt-10 flex flex-col items-center gap-6">
                <p className={cn("text-xl opacity-60", UI_THEME.techBold)}>
                  {HERO_CONTENT.footerPrefix}
                </p>
                {/* Utilisation du composant défini en haut */}
                <TechLogicButton text={HERO_CONTENT.footerHighlight} />
              </div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* LOGS SECTION */}
      <section className="relative z-30 w-full py-24 px-6 flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className={UI_THEME.machineLabel}>System Analysis</span>
              <h2 className={cn("text-4xl md:text-6xl", UI_THEME.techBold)}>
                Real-time <br /> Node Logs
              </h2>
            </div>
            <p className={cn("text-lg max-w-sm", UI_THEME.narrative)}>
              Flux de surveillance synchronisé.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[400px]">
            <CardStack items={LOG_CARDS_DATA} offset={10} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* GLOBE SECTION */}
      <section className="relative h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
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
        </div>
        <div className="relative z-10 text-center pointer-events-none px-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={destinations[index].label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("text-5xl md:text-8xl", UI_THEME.techBold)}
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 text-center opacity-40 border-t border-white/5">
        <p className={UI_THEME.machineLabel}>IVORY COAST ARCHITECTURE © 2026</p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
