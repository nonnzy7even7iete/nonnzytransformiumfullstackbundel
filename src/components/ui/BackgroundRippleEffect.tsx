"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

type BackgroundRippleEffectProps = {
  rows?: number;
  cols?: number;
  cellSize?: number;
  className?: string;
};

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
  className,
}: BackgroundRippleEffectProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    margin: "auto",
  };

  return (
    <div
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      style={gridStyle}
    >
      {cells.map((_, idx) => (
        <div
          key={idx}
          className="w-[56px] h-[56px] rounded-xl bg-gradient-to-tr from-purple-700/10 to-blue-500/10 
                     animate-ripple-slow opacity-20"
        />
      ))}

      <style jsx global>{`
        @keyframes ripple-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.25;
          }
        }
        .animate-ripple-slow {
          animation: ripple-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
