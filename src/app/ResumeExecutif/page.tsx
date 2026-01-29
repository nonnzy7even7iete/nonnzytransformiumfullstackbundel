"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/frontendkit/NavbarFront";
import CardStack from "@/components/frontendkit/CardStack"; // Import corrigé sans {}
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";

// Import dynamique du Globe
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-white dark:bg-[#020408]" />
    ),
  }
);

// RESTAURATION DE LA VARIABLE MANQUANTE
const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "Network Engine",
    designation: "Status: Active",
    content: (
      <p>
        Routing data packets from{" "}
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

      {/* SECTION 1 : CONTENT (LOGS & CARDS) */}
      <section className="relative z-30 w-full min-h-[80vh] pt-32 pb-20 px-6 flex items-center justify-center border-b border-black/[0.03] dark:border-white/[0.03]">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
              Real-time Node Logs
            </h2>
            <p className="text-foreground/60 dark:text-white/40 text-sm md:text-base leading-relaxed max-w-sm">
              Monitoring global data flow and infrastructure health across the
              Ivory Coast backbone.
            </p>
            <div className="flex items-center gap-2 text-green-600 font-mono text-[10px] tracking-widest uppercase font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              System Live & Encrypted
            </div>
          </div>

          <div className="flex justify-center md:justify-end min-h-[350px]">
            <CardStack items={LOG_CARDS_DATA} offset={10} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* SECTION 2 : GLOBE (ATMOSPHÈRE) */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* LOGIQUE RECTIFIÉE : pointer-events-none pour libérer le scroll */}
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

        {/* HUD UI */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none px-6 text-center">
          <span className="text-xs font-mono opacity-30 tracking-[0.4em] uppercase mb-4 dark:text-white">
            Global Infrastructure Sync
          </span>
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
          <div className="mt-8 px-4 py-1 border border-green-500/20 rounded-full bg-green-500/5">
            <p className="font-mono text-[10px] tracking-[0.4em] text-green-600 uppercase font-bold">
              {destinations[index].code}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#020408] to-transparent z-[5] pointer-events-none" />
      </section>

      <footer className="py-12 border-t border-border/5 text-center opacity-20">
        <p className="text-[9px] uppercase tracking-[0.5em]">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>

      {/* AJOUT DE LA FLÈCHE DE RETOUR EN HAUT */}
      <ScrollToTop />
    </div>
  );
}
