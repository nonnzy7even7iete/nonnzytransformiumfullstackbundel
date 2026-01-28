"use client";

import { cn } from "@/lib/utils";

interface NoiseBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  gradientColors?: string[];
  duration?: number;
  animating?: boolean;
}

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  gradientColors = ["#009E60", "#020408", "#009E60"], // Couleurs calibrées
  duration = 8,
  animating = true,
}: NoiseBackgroundProps) => {
  const dynamicStyles = `
    @keyframes rotate-snake {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .snake-trace {
      position: absolute;
      inset: -150%; 
      background: conic-gradient(
        from 0deg,
        transparent 0%,
        transparent 65%, 
        ${gradientColors[0]} 85%, 
        ${gradientColors[1]} 95%, 
        ${gradientColors[2] || gradientColors[0]} 100%
      );
      animation: rotate-snake ${duration}s linear infinite;
      animation-play-state: ${animating ? "running" : "paused"};
      will-change: transform;
    }
    
    .content-shield {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      /* LE SCRIM : Dégradé radial pour un effet de profondeur organique */
      background: radial-gradient(
        circle at 20% 0%, 
        rgba(0, 158, 96, 0.12) 0%, 
        rgba(2, 4, 8, 1) 70%
      );
      overflow: hidden;
    }

    /* Overlay de grain pour la texture "Expert" */
    .grain-overlay {
      position: absolute;
      inset: 0;
      background-image: url('https://assets.aceternity.com/noise.webp');
      background-repeat: repeat;
      opacity: 0.04;
      mix-blend-mode: soft-light;
      pointer-events: none;
      z-index: 20;
    }
  `;

  return (
    <div
      className={cn(
        "relative p-[1.5px] overflow-hidden group rounded-2xl bg-[#020408]",
        containerClassName
      )}
    >
      <style>{dynamicStyles}</style>

      {/* 1. Animation de bordure tournante */}
      <div className="snake-trace" />

      {/* 2. Le bouclier interne (Scrim) */}
      <div className="content-shield">
        <div className="grain-overlay" />

        {/* Scrim additionnel pour assombrir le bas de la card */}
        <div className="absolute inset-0 z-25 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />

        {/* 3. Le contenu réel */}
        <div className={cn("relative z-30 h-full w-full", className)}>
          {children}
        </div>
      </div>
    </div>
  );
};
