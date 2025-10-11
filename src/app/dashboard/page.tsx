"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setTimeout(() => setAnimationClass("opacity-100 translate-y-0"), 50);
  }, []);

  return (
    <>
      <div
        className={`
          relative w-full max-w-md mx-auto
          p-[2px] rounded-2xl
          bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700
          animate-gradient-flow
          transition-all duration-300
          ${animationClass || "opacity-0 translate-y-3"}
        `}
        style={{ borderRadius: "14px" }}
      >
        <div
          className="
            relative flex flex-col items-center justify-center text-center
            bg-white/10 backdrop-blur-md
            border border-white/10
            rounded-2xl
            p-10
            gap-[7px]
            shadow-lg shadow-black/30
            transition-all duration-300
            hover:scale-[1.03] hover:shadow-green-400/20
          "
          style={{ minHeight: "200px" }}
        >
          {/* Titre avec gradient */}
          <h2
            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #15803d, #60a5fa)",
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-200 px-4">{description}</p>

          {/* Bouton 3D blanc */}
          <button
            onClick={() => router.push(redirectPath)}
            className="
              relative text-gray-900 font-semibold
              rounded-[7px]
              bg-white shadow-[0_5px_0_rgba(200,200,200,1)]
              px-8 py-3
              active:translate-y-[2px] active:shadow-[0_3px_0_rgba(180,180,180,1)]
              transition-all duration-200 ease-out
              hover:scale-[1.03]
            "
          >
            Comprendre davantage
            <span className="absolute inset-0 rounded-[7px] bg-gradient-to-b from-white/40 to-transparent opacity-40 pointer-events-none"></span>
          </button>
        </div>
      </div>

      {/* Animation CSS directement intégrée */}
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
          background-size: 200% 200%;
          animation: gradientFlow 5s ease infinite;
        }
      `}</style>
    </>
  );
}
