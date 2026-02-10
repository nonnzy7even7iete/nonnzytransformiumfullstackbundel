"use client";

import React, { useEffect, useState } from "react";
// Assure-toi que le fichier s'appelle bien InsightCarousel.tsx dans ton dossier components
import InsightCarousel from "@/components/frontendkit/InsightCarousel";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  // Évite les erreurs d'hydratation sur les calculs 3D
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Introduction fluide */}
      <div className="h-[40vh] flex flex-col items-center justify-center space-y-4">
        <div className="h-px w-20 bg-emerald-500/30" />
        <h2 className="text-[10px] font-mono uppercase tracking-[0.6em] text-emerald-500/50">
          Data Insights Engine
        </h2>
      </div>

      {/* APPEL DU COMPOSANT SENSÉ ÊTRE DANS components/InsightCarousel.tsx */}
      <InsightCarousel />

      {/* Espace pour finir le scroll proprement */}
      <div className="h-[40vh]" />
    </main>
  );
}
