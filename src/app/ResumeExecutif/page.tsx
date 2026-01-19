"use client";

import dynamic from "next/dynamic";
import NavbarFront from "@/components/NavbarFront";

// 1. Import dynamique du Globe (Indispensable pour éviter les erreurs de serveur)
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-full bg-black flex items-center justify-center text-white">
        Initialisation du réseau mondial...
      </div>
    ),
  }
);

export default function ResumeExecutifPage() {
  // 2. Configuration pour un look technologique et sobre
  const globeConfig = {
    pointSize: 1,
    globeColor: "#060910", // Noir profond
    showAtmosphere: true,
    atmosphereColor: "#3b82f6", // Lueur bleue
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.07)", // Pays très discrets
    emissive: "#000000",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
  };

  // 3. Données centrées sur Abidjan
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
  ];

  return (
    <>
      <NavbarFront />

      <main className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-between py-20">
        {/* 4. Le Globe en arrière-plan */}
        <div className="absolute inset-0 z-0 w-full h-full opacity-60">
          <World data={sampleData} globeConfig={globeConfig} />
        </div>

        {/* 5. Contenu textuel par-dessus */}
        <div className="relative z-10 max-w-3xl text-center px-6">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">
            Localisation : Abidjan, Côte d'Ivoire
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Résumé Exécutif
          </h1>

          <p className="text-lg md:text-xl opacity-60 leading-relaxed max-w-xl mx-auto">
            Visualisation en temps réel de l'infrastructure numérique et de
            l'expansion technologique de Nonnzy en Afrique de l'Ouest.
          </p>
        </div>

        {/* Footer discret */}
        <div className="relative z-10 text-center opacity-40 text-xs tracking-widest uppercase">
          © Nonnzytransformium 2025 | Powered by Tech from Côte d'Ivoire
        </div>
      </main>
    </>
  );
}
