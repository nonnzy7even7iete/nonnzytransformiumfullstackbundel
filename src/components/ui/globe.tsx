"use client";

import dynamic from "next/dynamic";
import React from "react";

// On importe le client avec ssr: false pour garantir que Three.js ne s'exécute que sur le navigateur
const GlobeClient = dynamic(() => import("./globe-client"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
      <span className="text-zinc-500 font-mono text-xs tracking-widest animate-pulse">
        INITIALISATION DU GLOBE...
      </span>
    </div>
  ),
});

export function World(props: any) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505]">
      <GlobeClient {...props} />
    </div>
  );
}
