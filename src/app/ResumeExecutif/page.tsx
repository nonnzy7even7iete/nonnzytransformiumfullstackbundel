"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Imports des composants frontendkit
import NavbarFront from "@/components/frontendkit/NavbarFront";
import { CardStack } from "@/components/frontendkit/CardStack";
import { ScrollToTop } from "@/components/frontendkit/ScrollToTop";
import { WarpBackground } from "@/components/frontendkit/WarpBackground";
import { LogicBadge } from "@/components/frontendkit/LogicBadge";

// Magic UI & Utils
import { WordRotate } from "@/components/frontendkit/word-rotate";
import { cn } from "@/lib/utils";

// --- CONFIGURATION THÈME TECHNIQUE ---
const UI_THEME = {
  techBold: "font-oswald font-black uppercase tracking-tighter leading-[0.85]",
  machineLabel:
    "font-mono-tech uppercase tracking-[0.4em] text-[10px] text-green-500/80",
  narrative:
    "font-sans text-slate-400 dark:text-zinc-500 font-medium tracking-tight",
};

const LOG_CARDS_DATA = [
  {
    id: 0,
    name: "ENGINE_BACKBONE",
    designation: "STATUS: NOMINAL",
    content: (
      <p className="text-sm font-mono">
        Analyse des flux{" "}
        <span className="text-green-500 font-bold">Abidjan-IX</span>. Latence
        résiliente détectée.
      </p>
    ),
  },
  {
    id: 1,
    name: "CYBER_SHIELD",
    designation: "INTEGRITY: 100%",
    content: (
      <p className="text-sm font-mono">
        Chiffrement AES-256 actif. Protocoles de défense synchronisés.
      </p>
    ),
  },
  {
    id: 2,
    name: "DATA_NODE_04",
    designation: "REGION: WEST_AFRICA",
    content: (
      <p className="text-sm font-mono text-green-500/80 tracking-tighter uppercase">
        Synchronisation orbitale terminée.
      </p>
    ),
  },
];

// Chargement dynamique du Globe
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#020408]" />,
  }
);

export default function ResumeExecutifPage() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  // Configuration pour forcer le Globe à être visible et vert
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056", // Fond bleu nuit pour faire ressortir les terres
    showAtmosphere: true,
    atmosphereColor: "#22c55e", // Halo vert
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 5.33, lng: -4.03 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const destinations = useMemo(
    () => [
      { label: "NORTH AMERICA", lat: 39.82, lng: -98.57 },
      { label: "EUROPEAN NODES", lat: 50.11, lng: 14.42 },
      { label: "ABIDJAN HUB", lat: 5.33, lng: -4.03 },
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
    <div className="flex flex-col min-h-screen bg-[#020408] text-white selection:bg-green-500/30 overflow-x-hidden">
      <NavbarFront />

      {/* --- SECTION 1 : HERO HAUTE DENSITÉ --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden border-b border-white/5">
        {/* Glow de fond pour la profondeur */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />

        <WarpBackground
          className="w-full h-full opacity-30"
          gridColor="#22c55e"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              <div className="space-y-6">
                <span className={UI_THEME.machineLabel}>
                  Protocol v2.0.26 // Active Mode
                </span>
                <h1
                  className={cn(
                    "text-6xl md:text-9xl bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent drop-shadow-2xl",
                    UI_THEME.techBold
                  )}
                >
                  NONNZYTR{" "}
                  <span className="text-green-500 animate-pulse">OPERATE</span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-6">
                <p
                  className={cn(
                    "text-lg md:text-xl max-w-2xl mx-auto opacity-70 italic",
                    UI_THEME.narrative
                  )}
                >
                  Là où la décision devient instable, nous injectons une{" "}
                  <span className="text-white">architecture de résilience</span>
                  .
                </p>

                <div className="h-20 flex items-center justify-center">
                  <WordRotate
                    className={cn(
                      "text-3xl md:text-6xl text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]",
                      UI_THEME.techBold
                    )}
                    words={[
                      "SIGNAUX CONTRADICTOIRES",
                      "DONNÉES INCOMPLÈTES",
                      "INTUITION DANGEREUSE",
                    ]}
                  />
                </div>
              </div>

              <div className="pt-8 flex flex-col items-center gap-6">
                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                <LogicBadge text="LOGIQUE MESURABLE" />
              </div>
            </motion.div>
          </div>
        </WarpBackground>
      </section>

      {/* --- SECTION 2 : LOGS & CARDSTACK --- */}
      <section className="relative z-30 w-full py-32 px-6 flex items-center justify-center bg-[#020408]">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className={UI_THEME.machineLabel}>Data Infrastructure</span>
              <h2 className={cn("text-4xl md:text-6xl", UI_THEME.techBold)}>
                Analyse des <br />
                <span className="text-green-500">Flux Critiques</span>
              </h2>
            </div>
            <p
              className={cn(
                "text-lg max-w-sm border-l-2 border-green-500/30 pl-6",
                UI_THEME.narrative
              )}
            >
              Notre moteur traite les signaux en temps réel sur le backbone
              fibre de Côte d'Ivoire pour garantir une intégrité décisionnelle
              totale.
            </p>
          </div>

          <div className="flex justify-center md:justify-end min-h-[450px]">
            {/* CardStack avec effet de relief */}
            <div className="relative">
              <div className="absolute -inset-4 bg-green-500/5 blur-3xl rounded-full" />
              <CardStack
                items={LOG_CARDS_DATA}
                offset={12}
                scaleFactor={0.07}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3 : GLOBE VIBRANT --- */}
      <section className="relative h-[90vh] w-full overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <World
            data={[
              {
                order: 1,
                startLat: ABIDJAN.lat,
                startLng: ABIDJAN.lng,
                endLat: destinations[index].lat,
                endLng: destinations[index].lng,
                arcAlt: 0.3,
                color: "#22c55e",
              },
            ]}
            globeConfig={globeConfig}
          />
        </div>

        {/* Masque pour la visibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-transparent to-[#020408] pointer-events-none" />

        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={destinations[index].label}
              initial={{ opacity: 0, letterSpacing: "1.5em", y: 20 }}
              animate={{ opacity: 0.5, letterSpacing: "0.5em", y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "text-4xl md:text-8xl text-white",
                UI_THEME.techBold
              )}
            >
              {destinations[index].label}
            </motion.h2>
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5 bg-black">
        <p className={UI_THEME.machineLabel}>
          © 2026 ARCHITECTURE DIGITALE IVOIRIENNE // NODE_01
        </p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
