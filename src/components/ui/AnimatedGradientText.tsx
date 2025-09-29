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
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <>
      <h1
        className={`relative z-[${zIndex}] text-4xl md:text-5xl font-bold uppercase bg-gradient-to-r from-green-700 via-gray-400 to-green-700 bg-clip-text text-transparent wind-gradient ${className}`}
      >
        {words[currentIndex]}
      </h1>

      <style jsx>{`
        @keyframes gradient-x {
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

        @keyframes wind-move {
          0% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(-2px) translateY(1px);
          }
          50% {
            transform: translateX(2px) translateY(-1px);
          }
          75% {
            transform: translateX(-1px) translateY(1px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        .wind-gradient {
          background-size: 200% 200%;
          animation: gradient-x 3s linear infinite,
            wind-move 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
