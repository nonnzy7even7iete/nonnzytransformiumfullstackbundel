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
  description = "Découvrez comment booster votre application et exploiter tout votre potentiel.",
  redirectPath,
}: PotentialCardProps) {
  const router = useRouter();

  return (
    <div
      className="
        relative
        max-w-sm w-full mx-auto
        bg-gradient-to-br from-black/70 to-black/40
        backdrop-blur-xl border border-white/10
        rounded-2xl p-8 flex flex-col items-center text-center
        shadow-lg shadow-black/40
        hover:shadow-green-400/30 hover:scale-[1.03]
        transition-all duration-300
      "
    >
      {/* Badge Titre flottant */}
      <div
        className="
          absolute -top-8 left-1/2 transform -translate-x-1/2
          px-6 py-2 rounded-xl
          border border-white/20 bg-black/90
          shadow-md shadow-green-400/10
        "
      >
        <h2
          className="
            text-2xl md:text-3xl font-extrabold
            text-transparent bg-clip-text
            bg-gradient-to-r from-green-500 via-blue-400 to-green-500
            animate-gradient-shine
          "
        >
          {title}
        </h2>
      </div>

      {/* Description */}
      <p className="mt-10 text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
        {description}
      </p>

      {/* Bouton blanc stylé */}
      <button
        onClick={() => router.push(redirectPath)}
        className="
          flex items-center justify-center gap-2
          bg-white text-black font-semibold
          px-6 py-3 rounded-lg
          shadow-md shadow-black/30
          hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-400
          hover:text-white hover:shadow-green-400/40
          transition-all duration-300
        "
      >
        Comprendre ce sous entendue <ArrowRight size={18} />
      </button>

      {/* Animations internes */}
      <style jsx>{`
        @keyframes gradientMove {
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

        .animate-gradient-shine {
          background-size: 200% auto;
          animation: gradientMove 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
