"use client";

import React from "react";
import dynamic from "next/dynamic";

import Navbarfront from "@/components/frontendkit/NavbarFront";
import MiningDashboard from "@/components/frontendkit/FluxCarousel";

const DataChart = dynamic(() => import("@/components/frontendkit/dataChart"), {
  ssr: false,
  loading: () => (
    <SkeletonLoader height="500px" label="Initialisation du flux..." />
  ),
});

const AccordionFaqTunnel = dynamic(
  () =>
    import("@/components/frontendkit/accordionFaq").then(
      (mod) => mod.AccordionFaqTunnel
    ),
  { ssr: false }
);

export default function logiqueMetierEtServeur() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col font-sans">
      <Navbarfront />

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full pt-32 pb-12 px-4 md:px-10 space-y-32">
        {/* SECTION 1 : DATA VISUALIZATION (FULL WIDTH) */}
        <section className="max-w-7xl mx-auto w-full">
          <DataChart />
        </section>

        {/* SECTION 2 : FAQ STRATÉGIQUE (CENTERED & RESTRAINED) */}
        <section className="max-w-3xl mx-auto w-full py-20 border-t border-[var(--border-color)]">
          <AccordionFaqTunnel />
        </section>

        {/* SECTION 3 : TERMINAL FLUX */}
        <section className="w-full">
          <MiningDashboard />
        </section>
      </main>

      {/* OVERLAY DÉCORATIF */}
      <div
        className="pointer-events-none fixed inset-0 z-[120] m-4 md:m-8 opacity-20"
        style={{ border: "1px solid var(--border-color)" }}
      />

      {/* FOOTER */}
      <footer className="p-8 flex justify-center opacity-10">
        <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-[var(--foreground)]">
          Abidjan - Anyama // 2026 // Latency 0.001ms
        </p>
      </footer>
    </div>
  );
}

function SkeletonLoader({ height, label }: { height: string; label: string }) {
  return (
    <div
      className="w-full bg-card animate-pulse flex items-center justify-center border"
      style={{
        height,
        borderRadius: "var(--radius-vercel-zy)",
        borderColor: "var(--border-color)",
      }}
    >
      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20">
        {label}
      </span>
    </div>
  );
}
