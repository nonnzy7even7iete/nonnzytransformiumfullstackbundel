"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  // Les couleurs nationales pour la ligne de lumière
  gradientColors = ["#009E60", "#FFFFFF", "#FF8200"],
}: any) => {
  // On utilise une animation CSS infinie pour la performance et la fluidité totale
  return (
    <div
      className={cn(
        "relative p-[2px] overflow-hidden rounded-[2.5rem]", // Épaisseur de la ligne (2px)
        "bg-slate-100 dark:bg-zinc-900/50", // Un fond très neutre pour la base du border
        containerClassName
      )}
    >
      <style>{`
        @keyframes rotate-light {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .light-trace {
          position: absolute;
          inset: -100%; /* Largeur immense pour couvrir tous les angles */
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            transparent 70%, 
            ${gradientColors[0]} 80%, 
            ${gradientColors[1]} 90%, 
            ${gradientColors[2]} 100%
          );
          animation: rotate-light 8s linear infinite;
          will-change: transform;
        }
        /* Correction spécifique pour le mode Light pour éviter la cassure blanche */
        .inner-content {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          border-radius: calc(2.5rem - 2px);
          background: white; /* Blanc Pur en Light */
        }
        :target .inner-content, 
        .dark .inner-content {
          background: #020408; /* Noir Pur en Dark */
        }
      `}</style>

      {/* 1. LA LIGNE QUI SE DÉPLACE (L'ACTIVITÉ) */}
      <div className="light-trace" />

      {/* 2. LE CENTRE OPAQUE (LE SENSORISME) */}
      <div className="inner-content">
        {/* 3. TEXTURE DE BRUIT (Subtile sur le centre) */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-[0.03] mix-blend-overlay border-none">
          <div className="absolute inset-0 bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat" />
        </div>

        {/* 4. CONTENU */}
        <div className={cn("relative z-30 p-1", className)}>{children}</div>
      </div>
    </div>
  );
};
