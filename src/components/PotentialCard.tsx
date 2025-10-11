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
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [glowOpacity, setGlowOpacity] = useState(0.5);

  // Animation de gradient + glow
  useEffect(() => {
    setTimeout(() => setAnimationClass("opacity-100 translate-y-0"), 50);

    let pos = 0;
    const interval = setInterval(() => {
      pos = (pos + 1) % 200;
      setBackgroundPosition(pos);
      setGlowOpacity(0.4 + 0.3 * Math.sin((pos / 100) * Math.PI));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        relative w-full max-w-md mx-auto
        p-[2px] rounded-2xl
        transition-all duration-300
        ${animationClass || "opacity-0 translate-y-3"}
      `}
      style={{
        background: "linear-gradient(90deg, #9ca3af, #374151, #9ca3af)",
        backgroundSize: "200% 200%",
        backgroundPosition: `${backgroundPosition}% 50%`,
        borderRadius: "14px",
        boxShadow: `0 0 25px rgba(56, 189, 248, ${glowOpacity}), 0 0 40px rgba(34, 197, 94, ${
          glowOpacity / 2
        })`,
      }}
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
  );
}
