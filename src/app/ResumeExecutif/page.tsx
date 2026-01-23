"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/NavbarFront";
import { CardStack } from "@/components/CardStack"; // Import du composant Aceternity

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

  // DONNÉES POUR LE CARD STACK (Logs en temps réel fictifs)
  const LOG_CARDS = [
    {
      id: 0,
      name: "Network Engine",
      designation: "Status: Active",
      content: (
        <p>
          Routing data packets from{" "}
          <span className="font-bold text-green-500 underline decoration-dotted">
            Abidjan Hub
          </span>{" "}
          to Global Nodes. Latency: <span className="text-green-500">24ms</span>
          .
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
    <>
      <NavbarFront />
      <main className="relative min-h-screen bg-white dark:bg-[#020408] transition-colors duration-500 text-slate-900 dark:text-white overflow-hidden flex flex-col items-center justify-center">
        {/* GLOBE (Background) */}
        <div className="absolute inset-0 z-0 opacity-80 dark:opacity-100">
          <World data={activeConnection} globeConfig={{}} />
        </div>

        {/* Interface HUD */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none w-full max-w-7xl px-6">
          {/* Badge Ivory Coast */}
          <div className="flex items-center gap-2 mb-8 px-4 py-1.5 bg-green-500/10 dark:bg-green-500/5 border border-green-600/20 dark:border-green-500/20 rounded-full backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] text-green-700 dark:text-green-500 font-black tracking-[0.4em] uppercase">
              Ivory Coast Data-driven Global Hub
            </span>
          </div>

          {/* Titre Dynamique */}
          <div className="flex flex-col items-center gap-2 text-center mb-12">
            <span className="text-xs font-mono opacity-40 tracking-[0.6em] uppercase mb-4">
              Syncing: Node-Source // ABIDJAN
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={destinations[index].label}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="flex flex-col items-center"
              >
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-none">
                  {destinations[index].label}
                </h1>
                <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent mt-8 opacity-50" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SECTION CARD STACK (Placée ici pour l'équilibre visuel) */}
          <div className="pointer-events-auto mt-4 mb-10">
            <CardStack items={LOG_CARDS} offset={15} scaleFactor={0.08} />
          </div>

          {/* Signal Status */}
          <div className="mt-4">
            <motion.p
              key={destinations[index].code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="font-mono text-[10px] tracking-[0.7em] text-green-700 dark:text-green-400 uppercase font-bold"
            >
              Signal Strength: 100% // {destinations[index].code}
            </motion.p>
          </div>
        </div>

        {/* Overlay de vignettage pour focus sur le centre */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,white_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#020408_95%)] opacity-40" />
      </main>
    </>
  );
}
