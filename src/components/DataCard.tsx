"use client";

import { useState } from "react";
import { Info } from "lucide-react";

export default function DataCard() {
  const [open, setOpen] = useState(false);

  const data = {
    visiteurs: 7500,
    revenuMois: "420 000 €",
    emploisDirects: 180,
  };

  return (
    <div className="fixed left-4 top-1/4 z-50 flex flex-col items-center">
      {/* Bouton icône */}
      <button
        onClick={() => setOpen(!open)}
        className="p-4 rounded-full bg-gray-800/80 hover:bg-gray-700/90 shadow-neumorph transition"
      >
        <Info className="w-6 h-6 text-white" />
      </button>

      {/* Card flottante */}
      {open && (
        <div className="mt-4 w-72 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-4 text-white">
          <h2 className="font-semibold text-lg mb-2">Statistiques du Centre</h2>
          <p>Visiteurs hebdomadaires : {data.visiteurs}</p>
          <p>Revenu mensuel estimé : {data.revenuMois}</p>
          <p>Emplois directs : {data.emploisDirects}</p>
        </div>
      )}
    </div>
  );
}
