"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import NavbarFront from "@/components/NavbarFront";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function ResumeExecutifPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Définition des trajets (Tous partent d'Abidjan)
  const allConnections = [
    {
      label: "USA",
      startLat: 5.34,
      startLng: -4.03,
      endLat: 40.71,
      endLng: -74.0,
      color: "#22c55e", // Vert
    },
    {
      label: "EUROPE",
      startLat: 5.34,
      startLng: -4.03,
      endLat: 48.85,
      endLng: 2.35,
      color: "#22c55e",
    },
    {
      label: "AMÉRIQUE LATINE",
      startLat: 5.34,
      startLng: -4.03,
      endLat: -23.55,
      endLng: -46.63, // São Paulo
      color: "#22c55e",
    },
    {
      label: "ASIE",
      startLat: 5.34,
      startLng: -4.03,
      endLat: 35.67,
      endLng: 139.65, // Tokyo
      color: "#22c55e",
    },
  ];

  // 2. Timer pour changer de destination toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allConnections.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // On ne passe que l'arc actuel au Globe
  const currentData = [
    {
      ...allConnections[activeIndex],
      order: 1,
      arcAlt: 0.3,
    },
  ];

  const globeConfig = {
    pointSize: 1,
    globeColor: "#060910",
    showAtmosphere: true,
    atmosphereColor: "#22c55e", // Lueur verte pour rappeler la Côte d'Ivoire
    polygonColor: "rgba(34, 197, 94, 0.1)", // Pays légèrement teintés en vert
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <>
      <NavbarFront />
      <main className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center">
        {/* Background Globe */}
        <div className="absolute inset-0 z-0">
          <World data={currentData} globeConfig={globeConfig} />
        </div>

        {/* HUD de contrôle (z-10) */}
        <div className="relative z-10 text-center pointer-events-none">
          <div className="mb-2 text-xs tracking-[0.3em] uppercase opacity-50">
            Connexion active
          </div>
          <h2 className="text-4xl font-black text-green-500 transition-all duration-500">
            CÔTE D'IVOIRE ➔ {allConnections[activeIndex].label}
          </h2>
          <div className="mt-4 flex gap-2 justify-center">
            {allConnections.map((_, i) => (
              <div
                key={i}
                className={`h-1 w-8 rounded-full transition-all ${
                  i === activeIndex ? "bg-green-500 w-12" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
