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
  gradientColors = ["#009E60", "#FFFFFF", "#FF8200"],
  duration = 10,
  animating = true,
}: NoiseBackgroundProps) => {
  // On génère le CSS dynamiquement en fonction des props
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
      background: white;
      transition: background 0.5s ease;
    }
    .dark .content-shield { background: #020408; }
  `;

  return (
    <div
      className={cn(
        "relative p-[2px] overflow-hidden group",
        containerClassName
      )}
    >
      <style>{dynamicStyles}</style>

      <div className="snake-trace" />

      <div className="content-shield">
        <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat" />
        </div>
        <div className={cn("relative z-30 h-full w-full", className)}>
          {children}
        </div>
      </div>
    </div>
  );
};
