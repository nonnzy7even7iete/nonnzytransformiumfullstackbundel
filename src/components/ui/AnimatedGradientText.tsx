"use client";

import React, { useEffect, useState } from "react";

type AnimatedGradientTextProps = {
  words: string[];
  interval?: number;
  className?: string;
  zIndex?: number;
};

export const AnimatedGradientText = ({
  words,
  interval = 2000,
  className,
  zIndex = 50,
}: AnimatedGradientTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return; // sécurité
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className="w-full flex justify-center items-center" style={{ zIndex }}>
      <h1
        className={`text-4xl md:text-5xl font-bold uppercase bg-gradient-to-r from-green-700 via-blue-400 to-green-700 bg-clip-text text-transparent ${className}`}
      >
        {words[currentIndex].split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block animate-wind-letter"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {letter}
          </span>
        ))}
      </h1>

      <style jsx>{`
        @keyframes wind-move-letter {
          0% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(-2px) translateY(1px) rotate(-1deg);
          }
          50% {
            transform: translateX(2px) translateY(-1px) rotate(1deg);
          }
          75% {
            transform: translateX(-1px) translateY(1px) rotate(-0.5deg);
          }
          100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
        }

        .animate-wind-letter {
          display: inline-block;
          animation: wind-move-letter 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
