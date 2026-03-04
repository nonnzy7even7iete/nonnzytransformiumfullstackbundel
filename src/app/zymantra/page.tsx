"use client";

import React from "react";
// Importation de ta Navbar qui gère le switch de thèmes
import NavbarFront from "@/components/frontendkit/NavbarFront";
import Zymantra from "@/components/frontendkit/ZymantraBeam";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Page() {
  return (
    // CHANGEMENT CHIRURGICAL :
    // On remplace 'bg-black' par 'var(--background)'
    // On remplace 'text-white' par 'var(--foreground)'
    <main
      className="min-h-screen selection:bg-emerald-500/30 relative transition-colors duration-500"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* La Navbar gère son propre background via var(--background) */}
      <NavbarFront />

      <section className="pt-32 pb-4 px-6 flex flex-col items-center">
        {/* DANS LE TEXTE : 
          On retire 'text-white' pour laisser le composant TextGenerateEffect 
          utiliser 'var(--foreground)' en interne.
        */}
        <TextGenerateEffect
          words="DATA DRIVEN GROWTH STRATEGY"
          className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-center"
        />

        <p className="mt-2 text-[10px] text-emerald-500 font-black tracking-[0.5em] uppercase opacity-50">
          Algorithme Zy v.2026
        </p>
      </section>

      {/* ZYMANTRA BEAM : Il doit lui aussi utiliser les variables CSS en interne */}
      <Zymantra />

      <section className="py-20 flex justify-center">
        <p
          className="text-[10px] font-mono opacity-20 tracking-[0.5em] uppercase"
          style={{ color: "var(--foreground)" }} // Réactif au lieu de text-white
        >
          data driven , Anyama , Abidjan , cote d ivoire , 2026
        </p>
      </section>
    </main>
  );
}
