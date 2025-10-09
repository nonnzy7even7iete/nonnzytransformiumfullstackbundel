"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface PotentialCardProps {
  title?: string;
  description?: string;
  redirectPath: string;
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
        relative w-full max-w-sm mx-auto
        bg-black/70 backdrop-blur-xl border border-white/10
        rounded-2xl p-8
        flex flex-col items-center text-center
        shadow-lg shadow-black/50
        hover:scale-[1.02] hover:shadow-green-400/20
        transition-all duration-300
      "
    >
      {/* --- BADGE FLOTTANT (50% intérieur / 50% extérieur) --- */}
      <div
        className="
          absolute -top-8 left-1/2 transform -translate-x-1/2
          px-8 py-2 rounded-xl
          bg-black/90 border border-white/20
          shadow-md shadow-green-400/20
        "
      >
        <h2
          className="
            text-2xl md:text-3xl font-extrabold
            text-transparent bg-clip-text
            bg-gradient-to-r from-green-500 via-blue-400 to-green-500
            bg-[length:200%_auto] animate-gradient-flow
          "
        >
          {title}
        </h2>
      </div>

      {/* --- DESCRIPTION --- */}
      <p className="mt-10 text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
        {description}
      </p>

      {/* --- BOUTON DE REDIRECTION --- */}
      <button
        onClick={() => router.push(redirectPath)}
        className="
          flex items-center justify-center gap-2
          bg-white text-black font-semibold
          px-6 py-3 rounded-lg
          shadow-md shadow-black/30
          hover:shadow-green-400/40 hover:scale-[1.03]
          transition-all duration-300
        "
      >
        Comprendre davantage <ArrowRight size={18} />
      </button>

      {/* --- ANIMATIONS INTERNES --- */}
      <style jsx>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-flow {
          animation: gradientFlow 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
