"use client";
import React, { useMemo, useState } from "react";

// --- TYPES ---
type DivGridProps = {
  rows: number;
  cols: number;
  cellSize: number;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
};

// --- COMPOSANT DES HALOS TECH RÉPARTIS ---
const SideTechLights = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
      {/* 1. Halo Gauche (Haut) */}
      <div 
        className="absolute left-[-5%] top-0 w-[35%] h-[40%] opacity-20 dark:opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* 2. Halo CENTRAL (Milieu de page) */}
      <div 
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[45%] h-[25%] opacity-15 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 255, 136, 0.15) 0%, transparent 80%)',
          filter: 'blur(100px)',
        }}
      />

      {/* 3. Halo Droite (Milieu/Bas) */}
      <div 
        className="absolute right-[-5%] top-[50%] w-[40%] h-[40%] opacity-20 dark:opacity-25"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.2) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* 4. Halo Bas Gauche */}
      <div 
        className="absolute left-[5%] bottom-0 w-[30%] h-[30%] opacity-10 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 200, 100, 0.15) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Lignes Tech Verticales de structure */}
      <div className="absolute right-4 top-0 h-full w-[1px] bg-gradient-to-b from-emerald-500/20 via-transparent to-emerald-500/10 opacity-30" />
      <div className="absolute left-4 top-0 h-full w-[1px] bg-gradient-to-b from-emerald-500/10 via-transparent to-emerald-500/20 opacity-30" />
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
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
    // "top-0" et "inset-0" garantissent le ZÉRO MARGIN TOP
    <div className="absolute inset-0 top-0 h-full w-full overflow-hidden bg-transparent">
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

// --- GRILLE INTERACTIVE ---
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
    // Répartition 1fr pour remplir toute la largeur (Scaling)
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: "100%",
    height: "100%",
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
              opacity-25 hover:opacity-70
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