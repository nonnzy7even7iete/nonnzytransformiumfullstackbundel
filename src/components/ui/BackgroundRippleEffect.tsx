"use client";
import React, { useMemo, useState } from "react";

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
      {/* 1. SOURCE PRINCIPALE (Comme sur ton screen à gauche) */}
      <div
        className="absolute left-[-10%] top-[-5%] w-[60%] h-[60%] opacity-30 dark:opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.4) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      {/* 2. DIFFUSION MILIEU DROITE (Équilibre du texte) */}
      <div
        className="absolute right-[-5%] top-[25%] w-[50%] h-[50%] opacity-20 dark:opacity-25"
        style={{
          background:
            "radial-gradient(circle at 80% 40%, rgba(34, 197, 94, 0.25) 0%, transparent 75%)",
          filter: "blur(140px)",
        }}
      />

      {/* 3. LUEUR BAS GAUCHE (Continuité) */}
      <div
        className="absolute left-[5%] bottom-[-10%] w-[40%] h-[40%] opacity-15 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, transparent 80%)",
          filter: "blur(100px)",
        }}
      />
    </div>
  );
};

export const BackgroundRippleEffect = ({
  rows = 20, // Un peu plus de lignes pour plus de finesse
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
    <div className="absolute inset-0 top-0 left-0 h-full w-full overflow-hidden bg-transparent">
      <SideTechLights />

      {/* Le flou de fond pour l'effet "Vitre" du screenshot */}
      <div className="relative z-10 w-full h-full backdrop-blur-[1px]">
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

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        width: "100%",
      }}
    >
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
              cell transition-all duration-300
              bg-neutral-950/[0.01] border-neutral-950/[0.03]
              dark:bg-white/[0.01] dark:border-white/[0.04]
              border-[0.5px] hover:bg-emerald-500/10
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
