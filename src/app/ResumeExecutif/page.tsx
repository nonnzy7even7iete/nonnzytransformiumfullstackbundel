"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // Vérifie bien que ce fichier existe dans ton dossier lib
import NavbarFront from "@/components/NavbarFront";
import { CardStack } from "@/components/CardStack";

// Typage des destinations pour éviter les erreurs d'index
interface Destination {
  label: string;
  lat: number;
  lng: number;
  code: string;
}

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#020408]" />,
  }
);

const PAGE_CONTENT = {
  hero: {
    badge: "Ivory Coast Data-driven Global Networking Hub",
    source: "Source: CÔTE D'IVOIRE",
    signal: "SIGNAL STRENGTH: OPTIMAL",
  },
  logs: {
    title: "Real-time Node Logs",
    description:
      "Monitoring global data flow and infrastructure health across the Ivory Coast backbone.",
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
        <span className="font-bold text-green-500">Abidjan Hub</span>.
      </p>
    ),
  },
  {
    id: 1,
    name: "Security Protocol",
    designation: "Shield: 100%",
    content: <p>End-to-end encryption active in the gateway.</p>,
  },
];

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);
  const ABIDJAN = { lat: 5.33, lng: -4.03 };

  const destinations: Destination[] = useMemo(
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
    const timer = setInterval(
      () => setIndex((p) => (p + 1) % destinations.length),
      6000
    );
    return () => clearInterval(timer);
  }, [destinations.length]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408]">
      <NavbarFront />

      {/* SECTION CARDSTACK : PRIORITAIRE */}
      <section className="relative z-30 pt-32 pb-12 px-6 flex flex-col items-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-600/20 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] text-green-600 font-black tracking-[0.3em] uppercase">
                {PAGE_CONTENT.hero.badge}
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={destinations[index].label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-2"
              >
                <span className="text-xs font-mono opacity-40 tracking-[0.4em] uppercase">
                  ACTIVE CONNECTION TO
                </span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic dark:text-white text-slate-900">
                  {destinations[index].label}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center lg:justify-end items-center h-[400px]">
            <CardStack items={LOG_CARDS_DATA} offset={12} scaleFactor={0.07} />
          </div>
        </div>
      </section>

      {/* SECTION GLOBE : ATMOSPHÈRE */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-[#020408] to-transparent z-10" />

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

        <div className="absolute bottom-12 w-full flex justify-center z-10 pointer-events-none">
          <p className="font-mono text-[10px] tracking-[0.5em] text-green-600 uppercase font-bold opacity-60">
            {PAGE_CONTENT.hero.signal} // {destinations[index].code}
          </p>
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
