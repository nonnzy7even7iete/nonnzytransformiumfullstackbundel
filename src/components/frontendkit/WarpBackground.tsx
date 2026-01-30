"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const WarpBackground = ({
  children,
  className,
  gridColor = "rgba(34, 197, 94, 0.3)",
}: {
  children: React.ReactNode;
  className?: string;
  gridColor?: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden bg-[#020408] py-20",
        className
      )}
    >
      {/* Container SVG pour les lignes de perspective */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="h-full w-full opacity-50" preserveAspectRatio="none">
          <defs>
            <radialGradient id="warp-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#020408" />
            </radialGradient>
          </defs>

          {/* Lignes horizontales de profondeur */}
          {[...Array(10)].map((_, i) => (
            <rect
              key={`h-${i}`}
              x="0"
              y={`${10 * i}%`}
              width="100%"
              height="1"
              fill={gridColor}
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}

          {/* Lignes de perspective convergentes */}
          {[...Array(20)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={`${5 * i}%`}
              y1="0"
              x2="50%"
              y2="50%"
              stroke={gridColor}
              strokeWidth="0.5"
            />
          ))}

          <rect width="100%" height="100%" fill="url(#warp-gradient)" />
        </svg>

        {/* Faisceaux lumineux (Beams) de l'image */}
        <div className="absolute top-1/4 left-0 w-32 h-1 bg-green-500 blur-sm rotate-12 animate-pulse opacity-50" />
        <div className="absolute bottom-1/4 right-0 w-48 h-1 bg-emerald-400 blur-md -rotate-12 animate-bounce opacity-30" />
        <div className="absolute top-1/2 right-1/4 w-16 h-1 bg-blue-500 blur-sm rotate-45 animate-pulse" />
      </div>

      {/* Ton contenu (Card) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
