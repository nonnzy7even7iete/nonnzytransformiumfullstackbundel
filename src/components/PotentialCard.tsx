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
  description = "Découvrez comment booster votre application et ses fonctionnalités inexploitées.",
  redirectPath,
}: PotentialCardProps) {
  const router = useRouter();

  return (
    <div
      className="
        relative
        max-w-sm w-full mx-auto
        bg-gradient-to-br from-black/60 to-black/40
        backdrop-blur-lg border border-white/20
        rounded-xl p-8 flex flex-col items-center text-center
        shadow-md shadow-black/40
        hover:scale-105 hover:shadow-lg hover:shadow-green-400/20
        transition-all duration-300 cursor-pointer
      "
    >
      {/* Box flottante pour le titre */}
      <div
        className="
          absolute -top-6 left-1/2 transform -translate-x-1/2
          bg-black/80 px-6 py-2 rounded-lg
          shadow-lg shadow-black/50
        "
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text animate-shine">
          {title}
        </h2>
      </div>

      {/* Description */}
      <p className="mt-10 text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
        {description}
      </p>

      {/* Bouton blanc avec icône et shadow */}
      <button
        onClick={() => router.push(redirectPath)}
        className="
          mt-6 flex items-center gap-2
          bg-white text-black font-semibold
          px-6 py-3 rounded-lg
          shadow-md shadow-black/40
          hover:shadow-lg hover:shadow-green-400/30
          transition-all duration-300
        "
      >
        Comprendre d’avantage <ArrowRight size={20} />
      </button>

      {/* CSS intégré pour shiny gradient */}
      <style jsx>{`
        .animate-shine {
          background-image: linear-gradient(90deg, #047857, #60a5fa, #047857);
          background-size: 200% auto;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
