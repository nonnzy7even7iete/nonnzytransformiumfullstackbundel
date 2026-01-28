"use client";
import React, { useMemo, useState } from "react";

// [AJOUT SCALING] Styles d'animation injectés pour ne pas dépendre d'un fichier CSS externe
const animationStyles = `
  @keyframes float-halo {
    0%, 100% { transform: translate(0, 0) rotate(-15deg) scale(1); }
    50% { transform: translate(5%, 10%) rotate(-10deg) scale(1.1); }
  }
  @keyframes float-halo-reverse {
    0%, 100% { transform: translate(0, 0) rotate(10deg) scale(1.1); }
    50% { transform: translate(-5%, -10%) rotate(15deg) scale(1); }
  }
`;

const TechHaloBackground = () => {
  return (
    <>
      <style>{animationStyles}</style>
      {/* [SCALING] h-full ici assure que si le parent grandit (nouvelles sections), 
        le fond suit la taille totale. 
      */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none select-none">
        {/* Halo 1 : Mouvement 7s */}
        <div
          className="absolute top-[10%] left-[10%] w-[40vw] h-[300px] opacity-30 dark:opacity-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0, 255, 136, 0.4) 0%, rgba(0, 0, 0, 0) 70%)",
            boxShadow: "0 0 80px 30px rgba(0, 255, 136, 0.15)",
            filter: "blur(60px)",
            animation: "float-halo 7s infinite ease-in-out",
          }}
        />

        {/* Halo 2 : Mouvement 7s Déphasé */}
        <div
          className="absolute bottom-[15%] right-[5%] w-[50vw] h-[400px] opacity-20 dark:opacity-30 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0, 200, 100, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
            boxShadow: "0 0 100px 40px rgba(0, 200, 100, 0.1)",
            filter: "blur(80px)",
            animation: "float-halo-reverse 7s infinite ease-in-out",
            animationDelay: "1s",
          }}
        />

        {/* Halo 3 : Expansion centrale */}
        <div
          className="absolute top-[40%] left-[20%] w-[60vw] h-[200px] opacity-10 dark:opacity-20"
          style={{
            background: "rgba(0, 255, 136, 0.15)",
            filter: "blur(100px)",
            animation: "float-halo 10s infinite linear",
          }}
        />
      </div>
    </>
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
    /* [SCALING] "min-h-full" permet au composant de s'étirer si du contenu 
       est ajouté dynamiquement dans l'app. 
    */
    <div className="absolute inset-0 min-h-full w-full overflow-hidden">
      <TechHaloBackground />

      {/* On garde le z-10 et on s'assure que la grille est centrée 
         mais laisse passer le flou.
      */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <DivGrid
          key={`ripple-${rippleKey}`}
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          fillColor="transparent" // On laisse le thème gérer via Tailwind
          borderColor="transparent"
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
  };

  return (
    /* [POLISH] Le backdrop-blur permet de voir les halos verts bouger 
       "derrière" la vitre givrée.
    */
    <div
      className="relative backdrop-blur-[100px] md:backdrop-blur-[120px]"
      style={gridStyle}
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
            key={idx}
            /* [ZÉRO RÉGRESSION] On garde tes classes de base 
               + Adaptabilité Light/Dark 
            */
            className={`cell transition-all duration-150 
              opacity-20 hover:opacity-70 rounded-sm
              bg-neutral-900/[0.03] dark:bg-white/[0.03]
              border-[0.5px] border-neutral-900/5 dark:border-white/10
            `}
            style={{
              width: cellSize,
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
