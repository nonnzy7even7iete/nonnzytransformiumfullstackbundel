"use client";

import { useRouter } from "next/navigation";

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
        max-w-sm w-full mx-auto
        bg-gradient-to-br from-black/60 to-black/40
        backdrop-blur-lg border border-white/20
        rounded-xl p-8 flex flex-col items-center text-center
        shadow-md shadow-black/40
        hover:scale-105 hover:shadow-lg hover:shadow-green-400/20
        transition-all duration-300 cursor-pointer
      "
    >
      {/* Titre shiny gradient corrigé */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text animate-shine-gradient">
        {title}
      </h2>

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
          rounded-lg
          hover:bg-green-500/30
          hover:text-white
          transition-colors duration-300
        "
      >
        Comprendre d’avantage
      </button>

      {/* CSS intégré */}
      <style jsx>{`
        .animate-shine-gradient {
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
