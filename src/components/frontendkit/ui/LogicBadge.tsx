"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const LogicBadge = ({ text }: { text: string }) => {
  return (
    <div className="z-10 flex items-center justify-center py-4">
      <div
        className={cn(
          "group relative overflow-hidden rounded-full border px-8 py-2.5 transition-all duration-500",
          "border-black/5 bg-white/40 backdrop-blur-xl shadow-sm",
          "dark:border-white/10 dark:bg-zinc-950/40 dark:shadow-2xl dark:shadow-green-500/5"
        )}
      >
        {/* Balayage lumineux chirurgical */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-[-20deg]"
            style={{
              animation: "shiny-line 4s infinite ease-in-out",
            }}
          />
        </div>

        <div className="relative flex items-center gap-4">
          {/* Point Pulsant (Status Active) */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          </span>

          {/* Texte Oswald avec un léger espacement */}
          <span
            className={cn(
              "font-oswald font-extrabold uppercase tracking-[0.2em] text-sm md:text-base",
              "text-zinc-900 dark:text-zinc-100 opacity-90"
            )}
          >
            {text}
          </span>
        </div>

        {/* Injection CSS Inline sécurisée pour le push GitHub */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes shiny-line {
            0% { transform: translateX(-150%) skewX(-20deg); }
            30% { transform: translateX(150%) skewX(-20deg); }
            100% { transform: translateX(150%) skewX(-20deg); }
          }
        `,
          }}
        />
      </div>
    </div>
  );
};

export default LogicBadge;
