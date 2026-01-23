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
          <span className="text-green-500 font-bold">Abidjan Hub</span> to
          Global Nodes.
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
      name: "Cloud Infrastructure",
      designation: "Region: AF-WEST",
      content: (
        <p>
          14 virtual instances synchronized across{" "}
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020408]">
      <NavbarFront />

      {/* SECTION 1 : LE GLOBE (Full Screen Hero) */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <World data={activeConnection} globeConfig={{}} />
        </div>

        {/* HUD INTERFACE */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none px-6 text-center">
          <div className="mb-6 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
            <span className="text-[10px] text-green-600 dark:text-green-500 font-black tracking-[0.4em] uppercase">
              Global Networking Hub
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={destinations[index].label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic dark:text-white text-slate-900"
            >
              {destinations[index].label}
            </motion.h1>
          </AnimatePresence>

          <p className="mt-4 font-mono text-[10px] tracking-[0.5em] text-green-600 opacity-60 uppercase">
            {destinations[index].code}
          </p>
        </div>

        {/* Ombre de transition vers la section suivante */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#020408] to-transparent z-20" />
      </section>

      {/* SECTION 2 : CARD STACK (En bas de page) */}
      <section className="relative z-30 w-full py-24 px-6 flex flex-col items-center bg-white dark:bg-[#020408] border-t border-border/10">
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Texte de Gauche - Data Info */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight uppercase">
              Real-time Node Logs
            </h2>
            <p className="text-sm text-foreground/40 max-w-xs font-medium leading-relaxed">
              Monitoring global data flow and infrastructure health across the
              Ivory Coast backbone.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-green-500 font-mono text-[10px] tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Live
            </div>
          </div>

          {/* Le Stack de Cartes */}
          <div className="flex justify-center items-center h-80">
            <CardStack items={LOG_CARDS} />
          </div>
        </div>
      </section>

      {/* FOOTER ESPACEMENT */}
      <footer className="py-10 border-t border-border/5 border-dashed text-center">
        <p className="text-[9px] uppercase tracking-[0.5em] opacity-20">
          Ivory Coast Digital Architecture © 2026
        </p>
      </footer>
    </div>
  );
}
