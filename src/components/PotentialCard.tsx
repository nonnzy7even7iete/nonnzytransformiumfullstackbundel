"use client";

import { useRouter } from "next/navigation";

interface PotentialCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  redirectPath: string; // page cible pour la demande de financement
}

export default function PotentialCard({
  title = "Potentiel inexploité",
  description = "Découvrez comment booster votre application et ses fonctionnalités inexploitées.",
  imageUrl,
  redirectPath,
}: PotentialCardProps) {
  const router = useRouter();

  return (
    <div className="max-w-sm mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer">
      {/* Image optionnelle */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Illustration"
          className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
        />
      )}

      {/* Titre */}
      <h2 className="text-xl font-bold text-green-400 mb-2">{title}</h2>

      {/* Description */}
      <p className="text-gray-300 mb-6">{description}</p>

      {/* Bouton redirection */}
      <button
        onClick={() => router.push(redirectPath)}
        className="px-6 py-2 bg-green-500/20 text-green-300 rounded-xl hover:bg-green-500/30 transition font-semibold"
      >
        Comprendre d’avantage
      </button>
    </div>
  );
}
