"use client";

import { useRouter } from "next/navigation";

interface PotentialCardProps {
  title: string;
  description: string;
  redirectPath: string;
}

export default function PotentialCard({
  title,
  description,
  redirectPath,
}: PotentialCardProps) {
  const router = useRouter();

  return (
    <div
      className="
                     relative w-full max-w-md mx-auto
                     bg-white/10 backdrop-blur-md
                     border border-white/20
                     rounded-2xl p-10
                     flex flex-col items-center justify-center text-center
                     shadow-lg shadow-black/30
                     transition-all duration-300
                     hover:scale-[1.03] hover:shadow-green-400/20
              "
      style={{ minHeight: "350px" }}
    >
      {/* Titre avec gradient */}
      <h2
        className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(90deg, #15803d, #60a5fa)",
        }}
      >
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-200 mb-8 px-4">{description}</p>

      {/* Bouton glassmorphique */}
      <button
        onClick={() => router.push(redirectPath)}
        className="
              px-8 py-4 rounded-xl
              bg-white/10 backdrop-blur-md
              text-white font-semibold
              border border-white/20
              shadow-[0_8px_15px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)]
              hover:shadow-[0_12px_20px_rgba(0,0,0,0.3),inset_0_2px_6px_rgba(255,255,255,0.25)]
              hover:bg-white/20
              hover:translate-y-[-2px]
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-green-400
              "
      >
        Comprendre davantage
      </button>
    </div>
  );
}
