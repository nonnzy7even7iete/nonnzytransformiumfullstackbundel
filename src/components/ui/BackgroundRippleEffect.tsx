"use client";
import React, { useMemo, useState } from "react";

type DivGridProps = {
  rows: number;
  cols: number;
  cellSize: number;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
};

// --- COMPOSANT TORCHE LIGHTS (ASYMÉTRIQUE) ---
const SideTechLights = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
      {/* 1. TORCHE : Left Top - Faisceau descendant vers la droite */}
      <div
        className="absolute left-[-5%] top-[-5%] w-[50%] h-[40%] opacity-20 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(0, 255, 136, 0.4) 0%, transparent 75%)",
          transform: "rotate(5deg)",
          filter: "blur(60px)",
        }}
      />

      {/* 2. TORCHE : Right Center (Un peu plus bas que le premier) */}
      <div
        className="absolute right-[-10%] top-[35%] w-[50%] h-[45%] opacity-15 dark:opacity-25"
        style={{
          background:
            "radial-gradient(circle at 100% 50%, rgba(0, 255, 136, 0.3) 0%, transparent 80%)",
          transform: "rotate(-10deg)",
          filter: "blur(90px)",
        }}
      />

      {/* 3. TORCHE : Left Bottom - Faisceau remontant */}
      <div
        className="absolute left-[-5%] bottom-[-5%] w-[45%] h-[40%] opacity-15 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle at 0% 100%, rgba(0, 200, 100, 0.25) 0%, transparent 75%)",
          transform: "rotate(-5deg)",
          filter: "blur(80px)",
        }}
      />

      {/* Lignes Tech Ultra-fines (Scaling visual) */}
      <div className="absolute right-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent opacity-20" />
      <div className="absolute left-[15%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-20" />
    </div>
  );
};

export const BackgroundRippleEffect = ({
  rows = 16,
  cols = 54,
  cellSize = 28,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);

  return (
    // Pas de margin, pas de padding. Start at 0,0.
    <div className="absolute inset-0 top-0 left-0 h-full w-full overflow-hidden bg-transparent">
      <SideTechLights />

      <div className="relative z-10 w-full h-full">
        <DivGrid
          key={`ripple-${rippleKey}`}
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
        />
      </div>
    </div>
  );
};

const DivGrid = ({
  rows,
  cols,
  cellSize,
  clickedCell,
  onCellClick = () => {},
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, i) => i),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: "100%",
  };

  return (
    <div style={gridStyle}>
      {cells.map((idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - row, clickedCell.col - col)
          : 0;
        const delay = clickedCell ? distance * 50 : 0;
        const duration = 200 + distance * 60;

        return (
          <div
            key={`cell-${idx}`}
            className={`
              cell transition-all duration-150 rounded-sm
              opacity-20 hover:opacity-60
              bg-neutral-950/[0.02] border-neutral-950/[0.04]
              dark:bg-white/[0.02] dark:border-white/[0.06]
              border-[0.5px]
            `}
            style={{
              height: cellSize,
              transitionDelay: `${delay}ms`,
              transitionDuration: `${duration}ms`,
            }}
            onClick={() => onCellClick(row, col)}
          />
        );
      })}
    </div>
  );
};
