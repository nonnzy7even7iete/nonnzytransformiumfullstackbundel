"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import NavbarFront from "@/components/NavbarFront";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);

  // Centre exact d'Abidjan pour le départ
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
      {/* Modification de bg-app : support Dark/Light */}
      <main className="relative min-h-screen bg-white dark:bg-[#020408] transition-colors duration-500 text-slate-900 dark:text-white overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <World
            data={activeConnection}
            // La configuration du globe est maintenant gérée en interne par le composant réactif
            globeConfig={{}}
          />
        </div>

        {/* Interface HUD - Adaptative */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none w-full max-w-5xl px-6">
          {/* Badge adaptatif */}
          <div className="flex items-center gap-2 mb-8 px-4 py-1.5 bg-green-500/10 dark:bg-green-500/5 border border-green-600/20 dark:border-green-500/20 rounded-full backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] text-green-700 dark:text-green-500 font-bold tracking-[0.4em] uppercase">
              Ivorycost Data-driven Global Networking Hub
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

                {/* Dégradé adaptatif */}
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-green-600 dark:via-green-500 to-transparent mt-6 opacity-30 dark:opacity-50" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10">
            <motion.p
              key={destinations[index].code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="font-mono text-[11px] tracking-[0.6em] text-green-700 dark:text-green-400"
            >
              SIGNAL STRENGTH: OPTIMAL // {destinations[index].code}
            </motion.p>
          </div>
        </div>
      </main>
    </>
  );
}
