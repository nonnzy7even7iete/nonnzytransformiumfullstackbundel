"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { WordRotate } from "@/components/frontendkit/word-rotate";

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
        <span className="text-blue-500 font-bold">Ivory Coast</span> gateway.
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
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden border-b border-black/5 dark:border-white/5">
        <WarpBackground
          className="w-full h-full"
          gridColor="rgba(34, 197, 94, 0.2)"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <h1 className="text-5xl md:text-8xl font-black tracking-tight uppercase italic text-slate-900 dark:text-white leading-none">
                  NONNZYTR <span className="text-green-500">OPERATE</span>
                </h1>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em]">
                  Decision Resilience Protocol // 2026
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-xl md:text-2xl text-slate-600 dark:text-zinc-400">
                  Là où la décision devient instable,
                </p>
                <div className="h-20 flex items-center justify-center">
                  <WordRotate
                    className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white italic underline decoration-green-500/50 underline-offset-4"
                    duration={3000}
                    words={[
                      "lorsque les signaux sont contradictoires.",
                      "lorsque les données sont incomplètes.",
                      "lorsque l'intuition devient dangereuse.",
                    ]}
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="pt-6"
              >
                <p className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20">
                  Zy introduis une{" "}
                  <span className="text-green-500">logique mesurable.</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* --- SECTION 1 : LOGS --- */}
      <section className="relative z-30 w-full py-20 px-6 flex items-center justify-center border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
              Real-time Node Logs
            </h2>
            <p className="text-foreground/60 dark:text-white/40 text-sm md:text-base leading-relaxed max-w-sm">
              Monitoring global data flow across the Ivory Coast backbone.
            </p>
          </div>
          <div className="flex justify-center md:justify-end min-h-[350px]">
            <CardStack items={LOG_CARDS_DATA} offset={10} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* --- SECTION 2 : GLOBE --- */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
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
        <div className="relative z-10 text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h1
              key={destinations[index].label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic dark:text-white text-slate-900"
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 border-t border-border/5 text-center opacity-20">
        <p className="text-[9px] uppercase tracking-[0.5em]">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
