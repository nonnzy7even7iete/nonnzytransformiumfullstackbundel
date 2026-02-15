"use client";

import React from "react";
import Zymantra from "@/components/frontendkit/ZymantraBeam";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Page() {
  return (
    <main className="min-h-screen bg-black selection:bg-emerald-500/30">
      {/* TEXTE DE PAGE : Positionné de manière chirurgicale avant le ZymantraBeam */}
      <section className="pt-24 pb-4 px-6 flex flex-col items-center">
        <TextGenerateEffect
          words="DATA DRIVEN GROWTH STRATEGY"
          className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white text-center"
        />
        <p className="mt-2 text-[10px] text-emerald-500 font-black tracking-[0.5em] uppercase opacity-50">
          Algorithme Zy v.2026
        </p>
      </section>

      {/* TON COMPOSANT ZYMANTRA BEAM */}
      <Zymantra />

      {/* FOOTER LITTÉRAL */}
      <section className="py-20 flex justify-center">
        <p className="text-[10px] font-mono opacity-20 text-white tracking-[0.5em] uppercase">
          data driven , Anyama , Abidjan , cote d ivoire , 2026
        </p>
      </section>
    </main>
  );
}
