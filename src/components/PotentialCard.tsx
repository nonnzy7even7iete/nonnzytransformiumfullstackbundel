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
        rounded-2xl p-8
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
      <p className="text-gray-200 mb-8">{description}</p>

      {/* Bouton glassmorphique intégré */}
      <button
        onClick={() => router.push(redirectPath)}
        className="
          px-6 py-3 rounded-lg
          bg-white/20 backdrop-blur-sm
          text-white font-semibold
          border border-white/30
          shadow-md shadow-black/40
          hover:bg-white/30 hover:text-black
          hover:shadow-lg hover:shadow-green-400/50
          transition-all duration-300
        "
      >
        Comprendre davantage
      </button>
    </div>
  );
}
