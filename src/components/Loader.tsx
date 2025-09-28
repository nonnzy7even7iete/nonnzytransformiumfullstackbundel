"use client";

import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center">
        {/* Logo animé */}
        <Image
          src="/nonnzylogo.png"
          width={120} // ou ta largeur
          height={120} // ou ta hauteur
          alt="Logo"
          priority // ⚡ rend l'image prioritaire pour le LCP
          className="animate-pulse drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]"
        />

        {/* Texte optionnel */}
        <p className="mt-4 text-gray-400 text-sm tracking-wide animate-pulse">
          Chargement en cours...
        </p>
      </div>
    </div>
  );
}
