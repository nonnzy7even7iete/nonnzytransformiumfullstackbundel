"use client";
import React, { useMemo, useState } from "react";

// ==========================================
// [AJOUT SCALING] NOUVEAU COMPOSANT : Les Halos Tech
// Ce composant gère uniquement les lumières d'arrière-plan.
// Il est statique pour l'instant, mais prêt à être animé plus tard.
// ==========================================
const TechHaloBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-black">
      {/* Halo Rectangulaire 1 (Haut Gauche) */}
      <div
        className="absolute top-[10%] left-[15%] w-[300px] h-[200px] opacity-40 rounded-xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 255, 136, 0.4) 0%, rgba(0, 0, 0, 0) 70%)",
          boxShadow: "0 0 80px 30px rgba(0, 255, 136, 0.2)",
          filter: "blur(40px)",
          transform: "rotate(-15deg)", // Un peu incliné pour le style "tech"
        }}
      />

      {/* Halo Rectangulaire 2 (Bas Droite) */}
      <div
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[250px] opacity-30 rounded-xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 200, 100, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
          boxShadow: "0 0 100px 40px rgba(0, 200, 100, 0.15)",
          filter: "blur(50px)",
          transform: "rotate(10deg)",
        }}
      />
      {/* Halo Rectangulaire 3 (Centre subtil) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[100px] opacity-20 rounded-full"
        style={{
          background: "rgba(0, 255, 136, 0.1)",
          boxShadow: "0 0 120px 20px rgba(0, 255, 136, 0.1)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};

// ==========================================
// COMPOSANT PRINCIPAL EXISTANT (Modifié additivement)
// ==========================================
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
    <div className="absolute inset-0 h-full w-full overflow-hidden relative">
      {/*
        [AJOUT SCALING] Insertion de la couche de fond.
        Elle est placée AVANT la grille dans le DOM, donc elle sera DERRIÈRE visuellement.
      */}
      <TechHaloBackground />

      {/*
         [AJOUT SCALING] Ajout d'un z-index-10 pour s'assurer que la grille
         est bien au-dessus des halos pour appliquer le filtre.
      */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <DivGrid
          key={`ripple-${rippleKey}`}
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          // [AJOUT SCALING] J'ai très légèrement augmenté l'opacité du fill
          // pour que l'effet de verre dépoli soit plus perceptible.
          // Anciennement: 0.03 -> Nouveau: 0.05
          fillColor="rgba(255,255,255,0.05)"
          borderColor="rgba(255,255,255,0.08)"
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
    // [AJOUT SCALING] Suppression de width/height fixes et margin:auto ici
    // pour laisser le conteneur parent gérer le centrage via flexbox.
    // C'est plus robuste pour le scaling.
    // width: cols * cellSize,
    // height: rows * cellSize,
    // margin: "auto",
  };

  return (
    // [AJOUT SCALING] Ajout de `backdrop-blur` sur le conteneur global de la grille
    // Cela crée l'effet de "flou global" derrière toute la grille.
    // On peut aussi le mettre sur les cellules individuelles pour un effet différent.
    <div className="relative backdrop-blur-[8px]" style={gridStyle}>
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
            // [AJOUT SCALING] Ajout de `backdrop-blur-[1px]` sur chaque cellule.
            // C'est très subtil, mais cela "casse" légèrement la netteté des halos derrière chaque case.
            // Combiné au flou du parent, ça donne de la profondeur.
            className={`cell transition-all duration-150 opacity-20 hover:opacity-60 rounded-sm backdrop-blur-[1px]`}
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
