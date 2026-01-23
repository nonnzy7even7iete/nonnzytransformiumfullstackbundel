"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/NavbarFront";
import { CardStack } from "@/components/CardStack";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);

  // Centre exact d'Abidjan
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations = [
    {
      label: "AMÉRIQUE DU NORD",
      lat: 39.82,
      lng: -98.57,
      code: "NODE-NA-CENTRAL",
    },
    { label: "EUROPE", lat: 50.11, lng: 14.42, code: "NODE-EU-CENTRAL" },
    { label: "ASIE", lat: 43.67, lng: 87.33, code: "NODE-AS-CENTRAL" },
    {
      label: "AMÉRIQUE DU SUD",
      lat: -14.23,
      lng: -51.92,
      code: "NODE-SA-CENTRAL",
    },
    { label: "OCÉANIE", lat: -25.27, lng: 133.77, code: "NODE-AU-CENTRAL" },
    { label: "AFRIQUE (NORD)", lat: 26.0, lng: 15.0, code: "NODE-AF-NORTH" },
  ];

  const LOG_CARDS = [
    {
      id: 0,
      name: "Network Engine",
      designation: "Status: Active",
      content: (
        <p>
          Routing data packets from{" "}
          <span className="font-bold text-green-500">Abidjan Hub</span> to
          Global Nodes. Latency: <span className="text-green-500">24ms</span>.
        </p>
      ),
    },
    {
      id: 1,
      name: "Security Protocol",
      designation: "Shield: 100%",
      content: (
        <p>
          End-to-end encryption active. No anomalies detected in the{" "}
          <span className="text-blue-500">Ivory Coast</span> gateway.
        </p>
      ),
    },
    {
      id: 2,
      name: "Cloud Infrastructure",
      designation: "Region: AF-WEST",
      content: (
        <p>
          Auto-scaling active. 14 virtual instances synchronized across{" "}
          <span className="italic">6 continents</span>.
        </p>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [destinations.length]);

  const activeConnection = [
    {
      order: 1,
      startLat: ABIDJAN.lat,
      startLng: ABIDJAN.lng,
      endLat: destinations[index].lat,
      endLng: destinations[index].lng,
      arcAlt: 0.4,
      color: "#22c55e",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] transition-colors duration-500">
      <NavbarFront />

      {/* SECTION 1 : GLOBE HERO (H-SCREEN) */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <World data={activeConnection} globeConfig={{}} />
        </div>

        {/* Interface HUD */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none w-full max-w-5xl px-6">
          {/* Badge avec le point vert clignotant restauré */}
          <div className="flex items-center gap-3 mb-8 px-4 py-2 bg-green-500/10 dark:bg-green-500/5 border border-green-600/20 dark:border-green-500/20 rounded-full backdrop-blur-md">
            <div className="relative flex h-2 w-2">
              <div className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600 dark:bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            </div>
            <span className="text-[10px] text-green-700 dark:text-green-500 font-black tracking-[0.4em] uppercase">
              Ivory Coast Data-driven Global Networking Hub
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-sm font-mono opacity-40 dark:opacity-30 tracking-[0.5em] uppercase mb-2 text-slate-600 dark:text-slate-400">
              Source: CÔTE D'IVOIRE
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={destinations[index].label}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                  {destinations[index].label}
                </h1>
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-green-600 dark:via-green-500 to-transparent mt-6 opacity-30 dark:opacity-50" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10">
            <motion.p
              key={destinations[index].code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="font-mono text-[11px] tracking-[0.6em] text-green-700 dark:text-green-400 uppercase font-bold"
            >
              SIGNAL STRENGTH: OPTIMAL // {destinations[index].code}
            </motion.p>
          </div>
        </div>

        {/* Dégradé de transition vers le bas */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#020408] to-transparent z-20" />
      </section>

      {/* SECTION 2 : LOGS & CARD STACK (SEPARÉE EN BAS) */}
      <section className="relative z-30 w-full py-24 px-6 flex flex-col items-center border-t border-border/10 bg-white dark:bg-[#020408]">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          {/* Texte explicatif */}
          <div className="flex flex-col space-y-6 text-center md:text-left max-w-md">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
              Real-time Node Logs
            </h2>
            <p className="text-sm md:text-base text-foreground/40 font-medium leading-relaxed">
              Monitoring global data flow and infrastructure health across the
              Ivory Coast backbone. High-speed fiber optic synchronization
              active across all registered nodes.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 text-green-600 dark:text-green-500 font-mono text-xs tracking-widest uppercase font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Live & Encrypted
            </div>
          </div>

          {/* Card Stack responsive */}
          <div className="flex justify-center items-center w-full md:w-auto h-[350px]">
            <CardStack items={LOG_CARDS} />
          </div>
        </div>
      </section>

      {/* Footer Minimaliste */}
      <footer className="py-12 border-t border-border/5 bg-slate-50/50 dark:bg-white/[0.01] text-center">
        <p className="text-[10px] uppercase tracking-[0.8em] opacity-30 font-bold">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>
    </div>
  );
}
