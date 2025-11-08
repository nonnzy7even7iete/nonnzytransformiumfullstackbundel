"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface DataCardProps {
  className?: string;
}

export default function DataCard({ className }: DataCardProps) {
  const [open, setOpen] = useState(false);

  const data = {
    visiteurs: 7500,
    revenuMois: "420 000 €",
    emploisDirects: 180,
  };

  return (
    <div
      className={`fixed left-4 top-1/4 z-10 flex flex-col items-center ${className}`}
    >
      {/* Bouton icône */}
      <button
        onClick={() => setOpen(!open)}
        className="p-4 rounded-full bg-gray-800/80 hover:bg-gray-700/90 shadow-neumorph transition-all duration-300 md:mb-4"
      >
        <Info className="w-6 h-6 text-white" />
      </button>

      {/* Card flottante */}
      <div
        className={`mt-4 w-72 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-4 text-white transform transition-all duration-500
          ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
      >
        <h2 className="font-semibold text-lg mb-2">Statistiques du Centre</h2>
        <p>Visiteurs hebdomadaires : {data.visiteurs}</p>
        <p>Revenu mensuel estimé : {data.revenuMois}</p>
        <p>Emplois directs : {data.emploisDirects}</p>
      </div>
    </div>
  );
}
