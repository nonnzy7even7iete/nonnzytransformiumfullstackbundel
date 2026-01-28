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
  gradientColors = ["#009E60", "#009E60", "#FF8200", "#FF8200"],
  duration = 10,
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
        transparent 70%, 
        ${gradientColors[0]} 80%, 
        ${gradientColors[1]} 90%, 
        ${gradientColors[2]} 100%
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
      /* SCRIM OVERLAY LOGIC */
      background: linear-gradient(
        135deg, 
        rgba(0, 30, 15, 0.95) 0%, 
        rgba(2, 4, 8, 1) 100%
      );
    }
    /* Mode Clair : On garde un aspect givré vert mais très sombre */
    .dark .content-shield { 
      background: radial-gradient(
        circle at 0% 0%, 
        rgba(0, 158, 96, 0.15) 0%, 
        rgba(2, 4, 8, 1) 80%
      ); 
    }
  `;

  return (
    <div
      className={cn(
        "relative p-[2px] overflow-hidden group rounded-2xl",
        containerClassName
      )}
    >
      <style>{dynamicStyles}</style>

      {/* L'animation de bordure "Snake" */}
      <div className="snake-trace" />

      <div className="content-shield">
        {/* TEXTURE DE BRUIT (Expert Texture) */}
        <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.05] mix-blend-soft-light">
          <div className="absolute inset-0 bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat" />
        </div>

        {/* OVERLAY DE VIGNETTAGE (Le Scrim final) */}
        <div className="absolute inset-0 z-25 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

        <div className={cn("relative z-30 h-full w-full", className)}>
          {children}
        </div>
      </div>
    </div>
  );
};
