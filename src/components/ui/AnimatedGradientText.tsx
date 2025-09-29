"use client";

import React, { useEffect, useState } from "react";

type AnimatedGradientTextProps = {
  words: string[];
  interval?: number;
  className?: string;
  zIndex?: number;
};

export default const AnimatedGradientText = ({
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
        className={`relative z-[${zIndex}] text-4xl font-bold uppercase bg-gradient-to-r from-green-700 via-blue-400 to-green-700 bg-clip-text text-transparent animate-gradient-x ${className}`}
      >
        {words[currentIndex]}
      </h1>

      {/* Style CSS directement dans le composant */}
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

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
    </>
  );
};
