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
    <div className="max-w-md w-full mx-auto bg-gray-800 text-white rounded-xl p-6 flex flex-col items-center text-center shadow-md">
      {/* Titre */}
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {/* Description */}
      <p className="text-gray-300 mb-6">{description}</p>

      {/* Bouton de redirection */}
      <button
        onClick={() => router.push(redirectPath)}
        className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Comprendre davantage
      </button>
    </div>
  );
}
