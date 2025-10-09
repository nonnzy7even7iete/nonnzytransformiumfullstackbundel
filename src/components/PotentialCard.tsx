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
        flex flex-col items-center text-center
        shadow-lg shadow-black/30
        hover:scale-[1.03] hover:shadow-green-400/20
        transition-all duration-300
      "
    >
      {/* Titre avec gradient */}
      <h2
        className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(90deg, #15803d, #60a5fa)",
        }}
      >
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-200 mb-6">{description}</p>

      {/* Bouton de redirection */}
      <button
        onClick={() => router.push(redirectPath)}
        className="
          bg-white text-black font-semibold px-6 py-3 rounded-lg
          shadow-md shadow-black/30
          hover:bg-gray-100 transition-colors
        "
      >
        Comprendre davantage
      </button>
    </div>
  );
}
