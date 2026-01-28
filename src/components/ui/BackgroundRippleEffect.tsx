"use client";
import React, { useMemo, useState } from "react";

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
    // [SCALING] Suppression du flex-center pour éviter l'effet de bloc centré
    // "absolute inset-0" assure que ça couvre tout sans margin-top.
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-transparent">
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
  );
};

type DivGridProps = {
  rows: number;
  cols: number;
  cellSize: number;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
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
    // [SCALING] "1fr" au lieu de "cellSize px" pour que la grille se répartisse sur toute la largeur
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: "100%",
    height: "100%",
  };

  return (
    <div className="w-full h-full" style={gridStyle}>
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
            key={idx}
            // [POLISH] Adaptabilité Light/Dark sans régression logicielle
            // On utilise des opacités très basses pour le "distribué" subtil
            className={`
              cell transition-all duration-150 rounded-sm
              opacity-20 hover:opacity-60
              bg-neutral-900/[0.04] border-neutral-900/[0.06]
              dark:bg-white/[0.03] dark:border-white/[0.08]
              border-[0.5px]
            `}
            style={{
              // La hauteur reste fixe pour garder le ratio, la largeur est gérée par le grid 1fr
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
