"use client";

import { useState } from "react";
import { FiMessageSquare, FiDatabase } from "react-icons/fi";

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState<"mantra" | "data">("mantra");
  const [mantra, setMantra] = useState<string>("");

  return (
    <div className="mt-8 px-6">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("mantra")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "mantra" ? "bg-white/20 text-white" : "bg-black/20 text-gray-400"
          }`}
        >
          <FiMessageSquare /> Mantra
        </button>
        <button
          onClick={() => setActiveTab("data")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "data" ? "bg-white/20 text-white" : "bg-black/20 text-gray-400"
          }`}
        >
          <FiDatabase /> Data
        </button>
      </div>

      <div className="p-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md">
        {activeTab === "mantra" ? (
          <div className="flex flex-col">
            <textarea
              value={mantra}
              onChange={(e) => setMantra(e.target.value)}
              placeholder="Écris ton mantra ici..."
              className="w-full p-3 rounded-lg bg-black/20 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
              rows={6}
            />
            <p className="text-gray-400 mt-2 text-sm">Enregistré en temps réel.</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-300">Ici tu peux afficher d’autres données ou statistiques utilisateur.</p>
          </div>
        )}
      </div>
    </div>
  );
}
