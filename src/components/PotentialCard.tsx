"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface PotentialCardProps {
  title?: string;
  description?: string;
  redirectPath: string; // obligatoire pour la navigation
}

export default function PotentialCard({
  title = "Potentiel inexploité",
  description = "Découvrez comment exploiter pleinement vos ressources et développer votre application.",
  redirectPath,
}: PotentialCardProps) {
  const router = useRouter();

  return (
    <div
      className="
        relative w-full max-w-md mx-auto
        bg-black/70 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-8 pt-14
        flex flex-col items-center text-center
        shadow-lg shadow-black/40
        hover:scale-[1.03] hover:shadow-green-400/20
        transition-all duration-300
      "
    >
      {/* Badge flottant du titre */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
          px-6 py-2 rounded-xl
          bg-white/10 backdrop-blur-md border border-white/20
          shadow-lg shadow-black/30
        "
      >
        <h2
          className="
            text-2xl md:text-3xl font-extrabold
            text-transparent bg-clip-text
          "
          style={{
            backgroundImage: "linear-gradient(90deg, #15803d, #60a5fa)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Description */}
      <p className="mt-10 text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
        {description}
      </p>

      {/* Bouton de redirection */}
      <button
        onClick={() => router.push(redirectPath)}
        className="
          flex items-center justify-center gap-2
          bg-white text-black font-semibold
          px-6 py-3 rounded-lg
          shadow-md shadow-black/30
          hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-500
          hover:text-white hover:shadow-green-400/40
          transition-all duration-300
        "
      >
        Comprendre davantage <ArrowRight size={18} />
      </button>
    </div>
  );
}
