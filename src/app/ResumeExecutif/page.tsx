"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";

// --- CONFIGURATION TECHNIQUE (PROPS & THEME) ---
const UI_THEME = {
  // Look technique : Oswald, Gras, Majuscules, Tracking serré
  techBold: "font-[Oswald] font-black uppercase tracking-tighter",
  // Look machine : Mono, Petites majuscules espacées
  machineLabel: "font-mono uppercase tracking-[0.4em] text-[10px] opacity-70",
  // Look narratif : Normal, élégant
  narrative: "text-slate-500 dark:text-zinc-400 font-medium tracking-tight",
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
        <span className="font-bold bg-gradient-to-r from-[#f97316] to-[#22c55e] bg-clip-text text-transparent">
          Abidjan Hub
        </span>{" "}
        to Global Nodes.
      </p>
    ),
  },
  {
    id: 1,
    name: "Security Protocol",
    designation: "Shield: 100%",
    content: (
      <p className="text-sm">
        End-to-end encryption active in the{" "}
        <span className="font-bold bg-gradient-to-r from-[#f97316] to-[#22c55e] bg-clip-text text-transparent">
          Ivory Coast
        </span>{" "}
        gateway.
      </p>
    ),
  },
  {
    id: 2,
    name: "Cloud Infra",
    designation: "Region: AF-WEST",
    content: (
      <p className="text-sm font-mono">
        Nodes synchronized via 10Gbps fiber backbone.
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
      {
        label: "AMÉRIQUE DU NORD",
        lat: 39.82,
        lng: -98.57,
        code: "NODE-NA-CENTRAL",
      },
      { label: "EUROPE", lat: 50.11, lng: 14.42, code: "NODE-EU-CENTRAL" },
      { label: "ASIE", lat: 43.67, lng: 87.33, code: "NODE-AS-CENTRAL" },
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

      {/* --- SECTION HERO : REFACTORED & STYLED --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center pt-32 pb-20 overflow-hidden border-b border-black/5 dark:border-white/5">
        <WarpBackground
          className="w-full h-full"
          gridColor="rgba(34, 197, 94, 0.15)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full space-y-16"
            >
              {/* HEADER BLOCK */}
              <div className="space-y-6">
                <span className={UI_THEME.machineLabel}>
                  {HERO_CONTENT.label}
                </span>
                <h1
                  className={cn(
                    "text-6xl md:text-9xl leading-[0.8]",
                    UI_THEME.techBold
                  )}
                >
                  {HERO_CONTENT.title}{" "}
                  <span className="text-green-500">
                    {HERO_CONTENT.titleSuffix}
                  </span>
                </h1>
              </div>

              {/* LOGIC WORD ROTATE BLOCK */}
              <div className="flex flex-col items-center gap-4">
                <p className={cn("text-lg md:text-xl", UI_THEME.narrative)}>
                  {HERO_CONTENT.intro}
                </p>
                <div className="h-24 flex items-center justify-center w-full">
                  <WordRotate
                    className={cn(
                      "text-3xl md:text-6xl bg-gradient-to-r from-[#f97316] to-[#22c55e] bg-clip-text text-transparent",
                      UI_THEME.techBold
                    )}
                    duration={3000}
                    words={HERO_CONTENT.rotatingWords}
                  />
                </div>
              </div>

              {/* FOOTER CTA BLOCK */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="pt-10 flex flex-col items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-slate-300 dark:bg-white/20" />
                <p
                  className={cn(
                    "text-2xl md:text-4xl text-slate-900 dark:text-white",
                    UI_THEME.techBold
                  )}
                >
                  {HERO_CONTENT.footerPrefix}{" "}
                  <span className="text-green-500 border-b-4 border-green-500/30">
                    {HERO_CONTENT.footerHighlight}
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* --- SECTION 1 : LOGS --- */}
      <section className="relative z-30 w-full py-24 px-6 flex items-center justify-center bg-white dark:bg-[#020408]">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className={UI_THEME.machineLabel}>
                Infrastructure Monitoring
              </span>
              <h2
                className={cn(
                  "text-4xl md:text-6xl leading-tight",
                  UI_THEME.techBold
                )}
              >
                Real-time <br /> Node Logs
              </h2>
            </div>
            <p
              className={cn(
                "text-base md:text-lg max-w-sm",
                UI_THEME.narrative
              )}
            >
              Monitoring global data flow across the Ivory Coast backbone.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[400px]">
            <CardStack items={LOG_CARDS_DATA} offset={10} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- SECTION 2 : GLOBE --- */}
      <section className="relative h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isGlobeReady ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 pointer-events-none"
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={cn(
                "text-4xl md:text-8xl text-slate-900 dark:text-white",
                UI_THEME.techBold
              )}
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 border-t border-black/5 dark:border-white/5 text-center opacity-30">
        <p className={UI_THEME.machineLabel}>
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
