"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const LogicBadge = ({ text }: { text: string }) => {
  return (
    <div className="z-10 flex items-center justify-center">
      <div
        className={cn(
          "group relative overflow-hidden rounded-full border px-6 py-2 transition-all duration-500",
          "border-black/10 bg-zinc-100/50 backdrop-blur-md",
          "dark:border-white/10 dark:bg-zinc-900/50"
        )}
      >
        {/* Balayage lumineux chirurgical (Effet Scan) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-shiny-line absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/30 dark:via-green-400/20 to-transparent" />
        </div>

        <div className="relative flex items-center gap-3">
          {/* Point Pulsant (Status Active) */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600 dark:bg-green-500"></span>
          </span>

          {/* Texte Oswald */}
          <span
            className={cn(
              "font-oswald font-black uppercase tracking-[0.12em] text-lg md:text-xl",
              "text-zinc-800 dark:text-zinc-100 transition-colors duration-300"
            )}
          >
            {text}
          </span>
        </div>

        <style jsx>{`
          @keyframes shiny-line {
            0% {
              transform: translateX(-100%) skewX(-20deg);
            }
            35%,
            100% {
              transform: translateX(180%) skewX(-20deg);
            }
          }
          .animate-shiny-line {
            animation: shiny-line 4s infinite ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LogicBadge;
