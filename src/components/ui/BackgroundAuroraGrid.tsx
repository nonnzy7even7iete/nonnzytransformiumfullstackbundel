"use client";
import React from "react";

// --- COMPOSANT AURORA : LES SOURCES LUMINEUSES ---
const AuroraBeams = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
      {/* Faisceau 1 : Top Left (L'éclat principal du screen) */}
      <div
        className="absolute -left-[10%] -top-[10%] w-[70%] h-[70%] opacity-40 dark:opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.35) 0%, transparent 70%)",
          filter: "blur(110px)",
          animation: "pulse 8s infinite alternate ease-in-out",
        }}
      />

      {/* Faisceau 2 : Center Right (Le contre-point lumineux) */}
      <div
        className="absolute -right-[5%] top-[20%] w-[60%] h-[60%] opacity-20 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle at 70% 40%, rgba(16, 185, 129, 0.25) 0%, transparent 75%)",
          filter: "blur(130px)",
          animation: "pulse 12s infinite alternate-reverse ease-in-out",
        }}
      />

      {/* Faisceau 3 : Bottom Left (La profondeur) */}
      <div
        className="absolute left-[10%] -bottom-[10%] w-[50%] h-[50%] opacity-15 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(5, 150, 105, 0.2) 0%, transparent 80%)",
          filter: "blur(100px)",
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.1) translate(2%, 2%);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
export const BackgroundAuroraGrid = ({
  rows = 24,
  cols = 60,
  cellSize = 30,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const cells = Array.from({ length: rows * cols }, (_, i) => i);

  return (
    <div className="absolute inset-0 top-0 left-0 h-full w-full overflow-hidden bg-transparent">
      {/* Couche 1 : Les lumières Aurora */}
      <AuroraBeams />

      {/* Couche 2 : La grille de texture (Vitre Tech) */}
      <div className="relative z-10 w-full h-full backdrop-blur-[0.5px]">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            width: "100%",
            height: "100%",
          }}
        >
          {cells.map((idx) => (
            <div
              key={`grid-tile-${idx}`}
              className="border-[0.5px] border-neutral-950/[0.03] dark:border-white/[0.05] bg-transparent transition-colors duration-500 hover:bg-emerald-500/[0.05]"
              style={{ height: cellSize }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
