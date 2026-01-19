"use client";

import React from "react";
import dynamic from "next/dynamic";
import NavbarFront from "@/components/NavbarFront";

// 1. Import dynamique du Globe (Indispensable pour la 3D dans Next.js)
// On pointe vers le fichier globe.tsx que nous venons de stabiliser
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="tracking-widest uppercase text-xs opacity-50">
            Initialisation du réseau mondial...
          </p>
        </div>
      </div>
    ),
  }
);

export default function ResumeExecutifPage() {
  // 2. Configuration "Premium" : Noir profond et lueurs bleues technologiques
  const globeConfig = {
    pointSize: 1,
    globeColor: "#060910",
    showAtmosphere: true,
    atmosphereColor: "#3b82f6",
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.1)", // Pays subtils en nid d'abeille
    emissive: "#000000",
    arcTime: 2000,
    arcLength: 0.9,
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  // 3. Data : Flux sortants depuis Abidjan (Côte d'Ivoire)
  const sampleData = [
    {
      order: 1,
      startLat: 5.34,
      startLng: -4.03, // Abidjan
      endLat: 48.85,
      endLng: 2.35, // Paris
      arcAlt: 0.2,
      color: "#3b82f6",
    },
    {
      order: 2,
      startLat: 5.34,
      startLng: -4.03, // Abidjan
      endLat: 6.52,
      endLng: 3.37, // Lagos
      arcAlt: 0.1,
      color: "#9333ea",
    },
    {
      order: 3,
      startLat: 5.34,
      startLng: -4.03, // Abidjan
      endLat: 40.71,
      endLng: -74.0, // New York
      arcAlt: 0.4,
      color: "#3b82f6",
    },
    {
      order: 4,
      startLat: 5.34,
      startLng: -4.03, // Abidjan
      endLat: -26.2,
      endLng: 28.04, // Johannesburg
      arcAlt: 0.3,
      color: "#9333ea",
    },
  ];

  return (
    <>
      <NavbarFront />

      <main className="relative min-h-screen bg-[#020408] text-white overflow-hidden flex flex-col items-center justify-between py-20">
        {/* 4. Le Globe en arrière-plan (z-0) */}
        <div className="absolute inset-0 z-0 w-full h-full opacity-80">
          <World data={sampleData} globeConfig={globeConfig} />
        </div>

        {/* 5. Contenu textuel (z-10 pour être devant) */}
        <div className="relative z-10 max-w-3xl text-center px-6 mt-12">
          <div className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full backdrop-blur-sm">
            Node: Abidjan, Côte d'Ivoire
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
            RÉSUMÉ <br /> EXÉCUTIF
          </h1>

          <p className="text-lg md:text-xl opacity-50 leading-relaxed max-w-xl mx-auto font-light italic">
            "Visualisation des flux de données et de l'expansion technologique
            de Nonnzy à travers le continent et le monde."
          </p>
        </div>

        {/* Footer info technique */}
        <div className="relative z-10 flex flex-col items-center gap-2 opacity-30 text-[10px] tracking-[0.3em] uppercase">
          <div className="w-12 h-[1px] bg-white mb-2"></div>
          <span>© Nonnzytransformium 2026</span>
          <span>West African Tech Hub</span>
        </div>
      </main>
    </>
  );
}
