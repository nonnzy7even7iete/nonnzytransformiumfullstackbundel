"use client";

import React from "react";
// Importation des composants (Vérifie bien tes chemins d'accès)
import Navbarfront from "@/components/frontendkit/NavbarFront";
import MiningDashboard from "@/components/frontendkit/FluxCarousel";

/**
 * PAGE PRINCIPALE : AUDIT STRATÉGIQUE 2026
 * Ce fichier orchestre la Navbar et le Dashboard de données sans surcharge de props.
 */
export default function logiqueMetierEtServeur() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col">
      {/* NAVBAR : Appel direct. 
        Positionnée en absolute ou fixed selon ton Design System pour ne pas gêner le flux 3D.
      */}
      <Navbarfront />

      {/* MINING DASHBOARD : Le terminal autonome.
        Contient déjà sa propre logique de données, de drag et de conversion.
      */}
      <main className="flex-1 w-full">
        <MiningDashboard />
      </main>

      {/* OVERLAY DÉCORATIF (Optionnel) 
        Pour renforcer le sentiment de "Terminal Sécurisé"
      */}
      <div className="pointer-events-none fixed inset-0 z-[120] border-[1px] border-white/5 m-4 md:m-8 opacity-20" />
    </div>
  );
}
