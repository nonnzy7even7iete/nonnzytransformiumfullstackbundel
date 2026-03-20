"use client";

import React from "react";

interface RaadTextProps {
  text: string;
  className?: string;
}

export const RaadText = ({ text, className = "" }: RaadTextProps) => {
  return (
    <>
      <style>{`
        @keyframes raad-shine-linear {
          0% { background-position: 250% 0; }
          50%, 100% { background-position: -250% 0; }
        }

        .raad-effect-pro {
          display: inline-block;
          /* Couleur de base du texte (repos) */
          color: light-dark(rgba(0, 0, 0, 0.35), rgba(255, 255, 255, 0.25));
          
          /* Le gradient liquide (Le Tonnerre) */
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0) 25%,
            light-dark(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 1)) 50%,
            rgba(255, 255, 255, 0) 75%,
            transparent 100%
          );
          
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          
          /* Cycle de 12s : Majestueux et lent */
          animation: raad-shine-linear 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          
          /* Rendu propre des polices */
          -webkit-font-smoothing: antialiased;
          transition: color 0.3s ease;
        }

        /* Optionnel : Légère surbrillance au survol manuel */
        .raad-effect-pro:hover {
           color: light-dark(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.4));
        }
      `}</style>

      <p
        className={`raad-effect-pro font-black uppercase tracking-[0.4em] ${className}`}
      >
        {text}
      </p>
    </>
  );
};
