"use client";
import React, { useMemo, useState } from "react";

export const BackgroundRippleEffect = ({
  rows = 16, // grille plus fine
  cols = 54, // double pour affiner
  cellSize = 28, // plus petit pour des cellules fines
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
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <DivGrid
        key={`ripple-${rippleKey}`}
        rows={rows}
        cols={cols}
        cellSize={cellSize}
        fillColor="rgba(255,255,255,0.03)" // très subtile
        borderColor="rgba(255,255,255,0.08)" // léger contour
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
  fillColor: string;
  borderColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
};

const DivGrid = ({
  rows,
  cols,
  cellSize,
  fillColor,
  borderColor,
  clickedCell,
  onCellClick = () => {},
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, i) => i),
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
    <div className="relative w-full h-full" style={gridStyle}>
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
            className={`cell transition-opacity duration-150 opacity-20 hover:opacity-60 rounded-sm`}
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: fillColor,
              border: `0.5px solid ${borderColor}`,
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
