"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface PotentialCardProps {
  steps: { title: string; description: string }[];
  redirectPath: string;
}

export default function PotentialCard({
  steps,
  redirectPath,
}: PotentialCardProps) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);

  const handleClick = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1); // passe à l'étape suivante
    } else {
      router.push(redirectPath); // redirection finale
    }
  };

  const { title, description } = steps[stepIndex];

  return (
    <div
      className="
        relative w-full max-w-md mx-auto
        bg-black/70 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-8 pt-14
        flex flex-col items-center text-center
        shadow-lg shadow-black/40
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-green-400/20
      "
    >
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
            text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text
            animate-shine
          "
        >
          {title}
        </h2>
      </div>

      <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
        {description}
      </p>

      <button
        onClick={handleClick}
        className="
          flex items-center justify-center gap-2
          bg-white text-black font-semibold
          px-6 py-3 rounded-lg
          shadow-md shadow-black/40
          hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-500
          hover:text-white hover:shadow-green-400/40
          transition-all duration-300
        "
      >
        Comprendre davantage <ArrowRight size={18} />
      </button>

      <style jsx>{`
        .animate-shine {
          background-image: linear-gradient(90deg, #15803d, #60a5fa, #15803d);
          background-size: 200% auto;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
}
