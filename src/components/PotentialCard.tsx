"use client";

import { useRouter } from "next/navigation";
import ShinyTitle from "./ShinyTitle"; // Assure-toi que ce composant existe

interface PotentialCardProps {
  title?: string;
  description?: string;
  redirectPath: string; // page cible pour la demande de financement
}

export default function PotentialCard({
  title = "Potentiel inexploité",
  description = "Découvrez comment booster votre application et ses fonctionnalités inexploitées.",
  redirectPath,
}: PotentialCardProps) {
  const router = useRouter();

  return (
    <div
      className="
        max-w-sm w-full mx-auto
        bg-gradient-to-br from-black/60 to-black/40
        backdrop-blur-lg border border-white/10
        rounded-3xl p-8
        flex flex-col items-center text-center
        shadow-lg shadow-black/50
        hover:scale-105 hover:shadow-xl hover:shadow-green-400/30
        transition-all duration-300
        cursor-pointer
      "
    >
      {/* Titre en shiny gradient */}
      <ShinyTitle
        text={title}
        gradientFrom="green-700"
        gradientTo="blue-400"
        className="mb-4 tracking-wide"
      />

      {/* Description */}
      <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
        {description}
      </p>

      {/* Bouton redirection */}
      <button
        onClick={() => router.push(redirectPath)}
        className="
          px-8 py-3
          bg-green-500/20 text-green-300 font-semibold
          rounded-xl
          hover:bg-green-500/30
          hover:text-white
          transition-colors duration-300
        "
      >
        Comprendre d’avantage
      </button>
    </div>
  );
}
