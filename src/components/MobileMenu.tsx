"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/NavbarFront";
import { CardStack } from "@/components/ui/card-stack";
import { NoiseBackground } from "@/components/ui/noise-background"; // Ton nouveau composant

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

// --- CONFIGURATION DES TEXTES ---
const PAGE_CONTENT = {
  hero: {
    badge: "Ivory Coast Data-driven Global Networking Hub",
    source: "Source: CÔTE D'IVOIRE",
    signal: "SIGNAL STRENGTH: OPTIMAL",
  },
  logs: {
    title: "Real-time Node Logs",
    description:
      "Monitoring global data flow and infrastructure health across the Ivory Coast backbone. Synchronization active.",
    status: "System Live & Encrypted",
  },
};

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
  const [index, setIndex] = useState(0);
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
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % destinations.length),
      6000
    );
    return () => clearInterval(timer);
  }, [destinations.length]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408] transition-colors duration-500">
      <NavbarFront />

      {/* SECTION 1 : GLOBE HERO */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
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
            globeConfig={{}}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center pointer-events-none px-6 text-center">
          {/* Badge avec point vert clignotant */}
          <div className="flex items-center gap-3 mb-8 px-4 py-2 bg-green-500/10 border border-green-600/20 rounded-full backdrop-blur-md">
            <div className="relative flex h-2 w-2">
              <div className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <div className="relative inline-flex rounded-full h-2 w-2 bg-green-600 dark:bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            </div>
            <span className="text-[10px] text-green-700 dark:text-green-500 font-black tracking-[0.4em] uppercase">
              {PAGE_CONTENT.hero.badge}
            </span>
          </div>

          <span className="text-sm font-mono opacity-40 tracking-[0.5em] uppercase mb-2">
            {PAGE_CONTENT.hero.source}
          </span>

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

          <p className="mt-10 font-mono text-[11px] tracking-[0.6em] text-green-600 uppercase font-bold opacity-60">
            {PAGE_CONTENT.hero.signal} // {destinations[index].code}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#020408] to-transparent z-20" />
      </section>

      {/* SECTION 2 : LOGS (UPGRADED WITH NOISE BACKGROUND) */}
      <section className="relative z-30 w-full py-24 px-6 flex justify-center border-t border-border/10 bg-white dark:bg-[#020408]">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texte Descriptif */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                {PAGE_CONTENT.logs.title}
              </h2>
              <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-md">
                {PAGE_CONTENT.logs.description}
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 border border-border/10 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] w-fit">
              <div className="flex items-center gap-2 text-green-600 font-mono text-xs tracking-widest uppercase font-bold">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                {PAGE_CONTENT.logs.status}
              </div>
            </div>
          </div>

          {/* LA CONSOLE TECH (NoiseBackground + CardStack) */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <NoiseBackground
              containerClassName="w-full max-w-[450px] aspect-square flex items-center justify-center shadow-2xl border-white/5"
              noiseIntensity={0.12}
              speed={0.03}
              // Les couleurs Ivoiriennes sont gérées par défaut dans ton composant
            >
              <div className="relative z-20 scale-90 md:scale-100">
                <CardStack
                  items={LOG_CARDS_DATA}
                  offset={15}
                  scaleFactor={0.07}
                />
              </div>
            </NoiseBackground>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/5 text-center opacity-20">
        <p className="text-[9px] uppercase tracking-[0.5em]">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>
    </div>
  );
}
