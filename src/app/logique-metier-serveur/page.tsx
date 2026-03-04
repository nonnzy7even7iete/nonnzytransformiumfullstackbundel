"use client";

import React from "react";
// Importation chirurgicale : La Navbar est dans le dossier frontendkit
import NavbarFront from "@/components/frontendkit/NavbarFront";
import FluxCarousel from "@/components/frontendkit/FluxCarousel";

/**
 * COMPOSANT : Home
 * Structure réactive pilotée par les variables CSS (Design System Nonnzytransformium)
 */
export default function Home() {
  return (
    // 'relative' : nécessaire pour que la Navbar (fixed) se positionne par rapport au viewport
    // 'transition-colors' : assure la fluidité lors du changement Dark/Light
    <main
      className="min-h-screen relative transition-colors duration-500"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* NAVBARFRONT : Appelée depuis frontendkit.
        Elle survolera le FluxCarousel grâce à son z-index interne.
      */}
      <NavbarFront />

      {/* FLUXCAROUSEL : 
        Ton carrousel data-driven qui occupe le reste de l'espace.
      */}
      <FluxCarousel />
    </main>
  );
}
