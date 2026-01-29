"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/NavbarFront";
import { CardStack } from "@/components/CardStack";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    // On utilise un placeholder qui a exactement la même couleur que ton fond
    loading: () => <div className="absolute inset-0 bg-white dark:bg-[#020408]" />,
  }
);

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = useMemo(() => [
    { label: "AMÉRIQUE DU NORD", lat: 39.82, lng: -98.57, code: "NODE-NA-CENTRAL" },
    { label: "EUROPE", lat: 50.11, lng: 14.42, code: "NODE-EU-CENTRAL" },
    { label: "ASIE", lat: 43.67, lng: 87.33, code: "NODE-AS-CENTRAL" },
  ], []);

  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % destinations.length), 6000);
    // Simule un petit délai de pre-render pour laisser Three.js respirer
    const readyTimer = setTimeout(() => setIsGlobeReady(true), 1000);
    return () => {
      clearInterval(timer);
      clearTimeout(readyTimer);
    };
  }, [destinations.length]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408]">
      <NavbarFront />

      {/* SECTION 1 : CONTENT (SCROLLABLE SANS BLOCAGE) */}
      <section className="relative z-30 w-full min-h-[80vh] pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
              Real-time Node Logs
            </h2>
            <p className="text-foreground/60 dark:text-white/40 text-sm md:text-base leading-relaxed max-w-sm">
              Monitoring global data flow and infrastructure health across the Ivory Coast backbone.
            </p>
            <div className="flex items-center gap-2 text-green-600 font-mono text-[10px] tracking-widest uppercase font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              System Live & Encrypted
            </div>
          </div>

          <div className="flex justify-center md:justify-end min-h-[350px]">
            <CardStack items={[]} offset={10} scaleFactor={0.06} />
          </div>
        </div>
      </section>

      {/* SECTION 2 : GLOBE (FIXED FOR SCROLL) */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Pointer-events-none sur le conteneur global si on ne veut pas d'interaction du tout, 
            ou laisser tel quel si OrbitControls est corrigé */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isGlobeReady ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <World
            data={[{
              order: 1,
              startLat: ABIDJAN.lat,
              startLng: ABIDJAN.lng,
              endLat: destinations[index].lat,
              endLng: destinations[index].lng,
              arcAlt: 0.4,
              color: "#22c55e",
            }]}
          />
        </motion.div>

        {/* HUD UI */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={destinations[index].label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic dark:text-white text-slate-900"
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Overlay pour forcer le scroll si besoin */}
        <div className="absolute inset-0 z-[5] pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] dark:shadow-none" />
      </section>

      <footer className="py-12 border-t border-border/5 text-center opacity-20">
        <p className="text-[9px] uppercase tracking-[0.5em]">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>
    </div>
  );
}