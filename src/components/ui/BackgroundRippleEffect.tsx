"use client";
import React, { useMemo, useState } from "react";

// 1. Définition précise des types pour éviter les erreurs "Implicit Any"
type DivGridProps = {
  rows: number;
  cols: number;
  cellSize: number;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
};

const SideTechLights = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
      {/* Light Tech - Gauche */}
      <div
        className="absolute left-[-10%] top-[15%] w-[30%] h-[40%] opacity-20 dark:opacity-30"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 255, 136, 0.3), transparent)",
          // Correction syntaxe : "round" au lieu de "rounded"
          clipPath: "inset(0 0 0 0 round 0 100% 100% 0)",
          filter: "blur(80px)",
        }}
      />

      {/* Light Tech - Droite */}
      <div
        className="absolute right-[-10%] top-[50%] w-[35%] h-[45%] opacity-15 dark:opacity-25"
        style={{
          background:
            "linear-gradient(to left, rgba(0, 255, 136, 0.2), transparent)",
          filter: "blur(100px)",
        }}
      />

      {/* Lignes Tech Verticales */}
      <div className="absolute right-4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute left-4 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent" />
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
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-transparent">
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
              cell transition-all duration-150
              opacity-20 hover:opacity-60
              bg-neutral-950/[0.02] border-neutral-950/[0.04]
              dark:bg-white/[0.02] dark:border-white/[0.05]
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
