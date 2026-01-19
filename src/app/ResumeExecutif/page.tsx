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

  // Coordonnées exactes pour Abidjan (Plateau/Port)
  const ABIDJAN = { lat: 5.316667, lng: -4.033333 };

  const destinations = [
    { label: "USA", lat: 38.8894, lng: -77.0352, code: "DC-CORE-01" }, // Washington
    { label: "EUROPE", lat: 48.8566, lng: 2.3522, code: "PAR-HUB-04" }, // Paris
    { label: "BRÉSIL", lat: -23.5505, lng: -46.6333, code: "SP-LATAM-09" }, // São Paulo
    { label: "CHINE", lat: 31.2304, lng: 121.4737, code: "SH-ASIA-02" }, // Shanghai
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeConnection = [
    {
      order: 1,
      startLat: ABIDJAN.lat,
      startLng: ABIDJAN.lng,
      endLat: destinations[index].lat,
      endLng: destinations[index].lng,
      arcAlt: 0.25, // Un peu plus bas pour plus de tension
      color: "#22c55e",
    },
  ];

  return (
    <>
      <NavbarFront />
      <main className="relative min-h-screen bg-[#020408] text-white overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <World
            data={activeConnection}
            globeConfig={{
              globeColor: "#05070a",
              atmosphereColor: "#166534", // Vert plus sombre pour l'ambiance
              polygonColor: "rgba(34, 197, 94, 0.05)",
              arcTime: 2000,
              arcLength: 0.4, // Ligne plus courte = effet "comète" plus classe
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <span className="text-green-500 font-mono text-[10px] tracking-[0.5em] uppercase block mb-2">
                Transmission Link
              </span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight italic">
                ABIDJAN <span className="text-green-500/50">→</span>{" "}
                {destinations[index].label}
              </h1>
              <p className="text-white/20 font-mono text-[10px] mt-4 tracking-widest">
                {destinations[index].code}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
