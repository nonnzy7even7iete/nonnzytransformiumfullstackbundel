"use client";

import { cn } from "@/lib/utils";

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  gradientColors = ["#009E60", "#FFFFFF", "#FF8200"],
}: any) => {
  return (
    <div
      className={cn(
        "relative p-[2px] overflow-hidden group",
        // On laisse le radius être géré par l'appelant via containerClassName
        containerClassName
      )}
    >
      <style>{`
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
          animation: rotate-snake 8s linear infinite;
          will-change: transform;
        }
        .content-shield {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          border-radius: inherit; /* Fusion parfaite avec le parent */
          background: white;
          transition: background 0.5s ease;
        }
        .dark .content-shield {
          background: #020408; /* Noir profond */
        }
      `}</style>

      {/* La ligne de lumière "Snake" */}
      <div className="snake-trace" />

      {/* Le bouclier interne qui cache le centre du gradient */}
      <div className="content-shield">
        {/* Texture Noise subtile */}
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
