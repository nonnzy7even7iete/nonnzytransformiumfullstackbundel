"use client";

import React from "react";
import Zymantra from "@/components/frontendkit/Zymantra"; // Vérifie bien le chemin vers ton fichier

export default function BusinessPlanPage() {
  return (
    <main className="min-h-screen bg-black selection:bg-emerald-500/30">
      {/* ZYMANTRA est le premier composant. 
          Il gère son propre padding-top (py-24) pour ne pas coller au haut de l'écran.
      */}
      <Zymantra />

      {/* Tu pourras ajouter tes autres composants (Carousel, Footer, etc.) en dessous ici */}
      <section className="py-20 flex justify-center">
        <p className="text-[10px] font-mono opacity-20 text-white tracking-[0.5em]">
          data driven , Anyama , Abidjan , cote d ivoire , 2026
        </p>
      </section>
    </main>
  );
}
