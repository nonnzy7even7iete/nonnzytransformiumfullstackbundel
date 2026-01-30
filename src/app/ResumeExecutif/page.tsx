"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Imports synchronisés avec ton dossier frontendkit
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { LogicBadge } from "@/components/frontendkit/LogicBadge";

// Magic UI & Utils
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";

// --- THEME : Tailles réduites pour look Tech ---
const UI_THEME = {
  techBold: "font-oswald font-black uppercase tracking-tighter leading-none",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.4em] text-[9px] opacity-60",
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
        Routing packets via{" "}
        <span className="font-bold text-green-500">Abidjan Hub</span>.
      </p>
    ),
  },
  {
    id: 1,
    name: "Security Protocol",
    designation: "Shield: 100%",
    content: (
      <p className="text-[11px] font-mono opacity-80 uppercase">
        Encryption: AES-256 ACTIVE
      </p>
    ),
  },
];

// Chargement dynamique du Globe
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-white dark:bg-[#020408]" />
    ),
  }
);

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] selection:bg-green-500/30 overflow-x-hidden">
      <NavbarFront />

      {/* --- SECTION 1 : HERO (Typography Refined) --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center pt-28 pb-16 border-b border-black/5 dark:border-white/5">
        <WarpBackground
          className="w-full h-full"
          gridColor="rgba(34, 197, 94, 0.1)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full space-y-12"
            >
              <div className="space-y-4">
                <span className={UI_THEME.machineLabel}>
                  {HERO_CONTENT.label}
                </span>
                <h1 className={cn("text-5xl md:text-7xl", UI_THEME.techBold)}>
                  {HERO_CONTENT.title}{" "}
                  <span className="text-green-500 opacity-90">
                    {HERO_CONTENT.titleSuffix}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-3">
                <p
                  className={cn(
                    "text-base md:text-lg italic",
                    UI_THEME.narrative
                  )}
                >
                  {HERO_CONTENT.intro}
                </p>
                <div className="h-16 flex items-center justify-center">
                  <WordRotate
                    className={cn(
                      "text-2xl md:text-4xl text-green-600/80",
                      UI_THEME.techBold
                    )}
                    words={HERO_CONTENT.rotatingWords}
                  />
                </div>
              </div>

              <div className="pt-6 flex flex-col items-center gap-4">
                <p
                  className={cn(
                    "text-xs opacity-40 tracking-widest",
                    UI_THEME.techBold
                  )}
                >
                  {HERO_CONTENT.footerPrefix}
                </p>
                <LogicBadge text={HERO_CONTENT.footerHighlight} />
              </div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* --- SECTION 2 : LOGS --- */}
      <section className="relative z-30 w-full py-20 px-6 flex items-center justify-center bg-white dark:bg-[#020408]">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className={UI_THEME.machineLabel}>
                Infrastructure Monitoring
              </span>
              <h2 className={cn("text-3xl md:text-5xl", UI_THEME.techBold)}>
                Real-time <br /> Node Logs
              </h2>
            </div>
            <p className={cn("text-base max-w-xs", UI_THEME.narrative)}>
              Surveillance des flux de données critiques sur le backbone
              national.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[350px]">
            <CardStack items={LOG_CARDS_DATA} offset={8} scaleFactor={0.05} />
          </div>
        </div>
      </section>

      {/* --- SECTION 3 : GLOBE --- */}
      <section className="relative h-[75vh] w-full overflow-hidden flex flex-col items-center justify-center bg-transparent">
        <div className="absolute inset-0 z-0 opacity-70 grayscale-[0.5] contrast-[1.2]">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.15, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn("text-4xl md:text-7xl", UI_THEME.techBold)}
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-10 text-center opacity-30 border-t border-black/5 dark:border-white/5">
        <p className={UI_THEME.machineLabel}>IVORY COAST ARCHITECTURE © 2026</p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
