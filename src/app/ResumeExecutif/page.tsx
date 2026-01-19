"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import NavbarFront from "@/components/NavbarFront";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-full bg-black flex items-center justify-center text-green-500 uppercase tracking-widest text-xs">
        Connexion Côte d'Ivoire...
      </div>
    ),
  }
);

export default function ResumeExecutifPage() {
  const [index, setIndex] = useState(0);

  // 1. Tes destinations spécifiques (Départ Côte d'Ivoire)
  const destinations = [
    { label: "USA", lat: 37.09, lng: -95.71 },
    { label: "EUROPE", lat: 48.85, lng: 2.35 },
    { label: "AMÉRIQUE LATINE", lat: -14.23, lng: -51.92 },
    { label: "ASIE", lat: 34.04, lng: 100.61 },
  ];

  // 2. Cycle toutes les 3 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeConnection = [
    {
      order: 1,
      startLat: 5.34,
      startLng: -4.03, // Abidjan
      endLat: destinations[index].lat,
      endLng: destinations[index].lng,
      arcAlt: 0.3,
      color: "#22c55e", // VERT
    },
  ];

  const globeConfig = {
    globeColor: "#060910",
    atmosphereColor: "#22c55e",
    polygonColor: "rgba(34, 197, 94, 0.1)",
    arcTime: 2000,
    arcLength: 0.9,
  };

  return (
    <>
      <NavbarFront />
      <main className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-between py-20">
        <div className="absolute inset-0 z-0">
          <World data={activeConnection} globeConfig={globeConfig} />
        </div>

        <div className="relative z-10 text-center px-6 mt-10 pointer-events-none">
          <div className="text-green-500 text-[10px] tracking-[0.4em] uppercase mb-4 animate-pulse">
            Transmission en cours...
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            CÔTE D'IVOIRE <span className="text-green-500">➔</span>{" "}
            {destinations[index].label}
          </h1>
        </div>

        <div className="relative z-10 opacity-30 text-[10px] tracking-[0.3em] uppercase pb-10">
          © Nonnzytransformium 2026 | Abidjan Hub
        </div>
      </main>
    </>
  );
}
