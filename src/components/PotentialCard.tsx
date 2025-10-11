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
  const [glowOpacity, setGlowOpacity] = useState(0.4);

  useEffect(() => {
    setTimeout(() => setAnimationClass("opacity-100 translate-y-0"), 50);

    let pos = 0;
    const interval = setInterval(() => {
      pos = (pos + 1) % 200;
      setBackgroundPosition(pos);
      setGlowOpacity(0.35 + 0.25 * Math.sin((pos / 100) * Math.PI));
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        relative w-full max-w-md mx-auto
        p-[2px] rounded-[21px]
        transition-all duration-500
        ${animationClass || "opacity-0 translate-y-3"}
      `}
      style={{
        background: "linear-gradient(90deg, #262626, #1a1a1a, #262626)",
        backgroundSize: "200% 200%",
        backgroundPosition: `${backgroundPosition}% 50%`,
        boxShadow: `0 0 30px rgba(34,197,94,${glowOpacity}), 0 0 50px rgba(56,189,248,${
          glowOpacity / 2
        })`,
      }}
    >
      <div
        className="
          relative flex flex-col items-center justify-center text-center
          bg-[#0d0d0d] text-gray-100
          rounded-[21px] p-10 gap-[21px]
          transition-all duration-300
          hover:scale-[1.02] hover:shadow-green-400/20
        "
      >
        {/* Capsule du titre — avec padding intérieur plus généreux */}
        <div className="bg-white text-black font-bold text-xl px-8 py-4 rounded-[21px] shadow-sm max-w-[80%]">
          {title}
        </div>

        {/* Description — avec bonne largeur + espacement */}
        <p className="text-gray-300 leading-relaxed px-6 max-w-md">
          {description}
        </p>

        {/* Bouton — avec padding cohérent et bon radius */}
        <button
          onClick={() => router.push(redirectPath)}
          className="
            relative text-black font-semibold
            rounded-[21px] bg-white
            px-10 py-3
            shadow-[0_5px_0_rgba(220,220,220,1)]
            active:translate-y-[2px] active:shadow-[0_3px_0_rgba(180,180,180,1)]
            transition-all duration-200 ease-out
            hover:scale-[1.03]
          "
        >
          Comprendre davantage
          <span className="absolute inset-0 rounded-[21px] bg-gradient-to-b from-white/50 to-transparent opacity-30 pointer-events-none"></span>
        </button>
      </div>
    </div>
  );
}
