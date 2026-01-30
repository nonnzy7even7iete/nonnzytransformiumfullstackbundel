"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { WordRotate } from "@/components/frontendkit/word-rotate";

// --- CONFIGURATION DES TEXTES (PROPS) ---
const HERO_CONTENT = {
  title: "NONNZYTR",
  titleSuffix: "OPERATE",
  subtitle: "Decision Resilience Protocol // 2026",
  intro: "Là où la décision devient instable,",
  rotatingWords: [
    "lorsque les signaux sont contradictoires.",
    "lorsque les données sont incomplètes.",
    "lorsque l'intuition devient dangereuse.",
  ],
  conclusionPrefix: "Zy introduis une",
  conclusionHighlight: "logique mesurable.",
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
      <p>
        Routing data packets from{" "}
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
      <p>
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
    content: <p>Nodes synchronized via 10Gbps fiber backbone.</p>,
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

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center pt-32 pb-20 overflow-hidden border-b border-black/5 dark:border-white/5">
        {/* CORRECTION : WarpBackground enveloppe désormais son contenu */}
        <WarpBackground
          className="w-full h-full"
          gridColor="rgba(34, 197, 94, 0.15)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full space-y-10"
            >
              {/* Header Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-7xl font-black tracking-tight uppercase italic text-slate-900 dark:text-white leading-[0.9]">
                  {HERO_CONTENT.title}{" "}
                  <span className="text-green-500">
                    {HERO_CONTENT.titleSuffix}
                  </span>
                </h1>
                <p className="text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-[0.5em] opacity-80">
                  {HERO_CONTENT.subtitle}
                </p>
              </div>

              {/* Rotating Logic Block */}
              <div className="flex flex-col items-center py-6">
                <p className="text-base md:text-xl text-slate-600 dark:text-zinc-400 mb-2">
                  {HERO_CONTENT.intro}
                </p>
                <div className="h-16 md:h-20 flex items-center justify-center w-full">
                  <WordRotate
                    className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#f97316] to-[#22c55e] bg-clip-text text-transparent italic tracking-tight"
                    duration={3500}
                    words={HERO_CONTENT.rotatingWords}
                  />
                </div>
              </div>

              {/* Final Call to Action / Conclusion */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="inline-block"
              >
                <div className="px-8 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
                  <p className="text-lg md:text-2xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">
                    {HERO_CONTENT.conclusionPrefix}{" "}
                    <span className="text-green-500">
                      {HERO_CONTENT.conclusionHighlight}
                    </span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* --- SECTION 1 : LOGS --- */}
      <section className="relative z-30 w-full py-24 px-6 flex items-center justify-center bg-white dark:bg-[#020408]">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-tight">
              Real-time Node Logs
            </h2>
            <div className="h-1 w-12 bg-green-500" />
            <p className="text-slate-500 dark:text-white/40 text-base md:text-lg leading-relaxed max-w-sm">
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
              className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic dark:text-white text-slate-900"
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 border-t border-black/5 dark:border-white/5 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.4em]">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
