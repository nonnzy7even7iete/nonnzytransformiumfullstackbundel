"use client";

import { useRouter } from "next/navigation";

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
        backdrop-blur-lg border border-white/20
        rounded-xl p-8 flex flex-col items-center text-center
        shadow-md shadow-black/40
        hover:scale-105 hover:shadow-lg hover:shadow-green-400/20
        transition-all duration-300 cursor-pointer
      "
    >
      {/* Titre shiny gradient */}
      <h2 className="relative text-3xl md:text-4xl font-extrabold mb-4 tracking-wide bg-clip-text text-transparent">
        {title}
        <span className="shine-overlay"></span>

        <style jsx>{`
          h2 {
            background-image: linear-gradient(
              to right,
              #047857,
              #60a5fa
            ); /* green-700 -> blue-400 */
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

          .shine-overlay {
            position: absolute;
            inset: 0;
            background: rgba(255, 255, 255, 0.3);
            opacity: 0;
            pointer-events: none;
            animation: shine-overlay 2.5s ease-in-out infinite;
          }

          @keyframes shine-overlay {
            0% {
              opacity: 0;
              transform: translateX(-100%);
            }
            50% {
              opacity: 0.5;
              transform: translateX(50%);
            }
            100% {
              opacity: 0;
              transform: translateX(100%);
            }
          }
        `}</style>
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
    </div>
  );
}
