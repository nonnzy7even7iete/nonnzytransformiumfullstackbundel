"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration = 0.3,
  style,
}: {
  text: string;
  duration?: number;
  style?: React.CSSProperties;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  // Animation automatique du masque radial
  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      angle += 2;
      const cx = 50 + 35 * Math.cos((angle * Math.PI) / 180);
      const cy = 50 + 35 * Math.sin((angle * Math.PI) / 180);
      setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      ref={svgRef}
      width={style?.width || "90%"}
      height={style?.height || "70px"}
      viewBox="0 0 600 150"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      <defs>
        {/* Dégradé animé continu */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eab308">
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#3b82f6">
            <animate
              attributeName="offset"
              values="0.5;1.5;0.5"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#8b5cf6">
            <animate
              attributeName="offset"
              values="1;2;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        {/* Masque radial animé */}
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="25%"
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Texte animé */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.5"
        stroke="url(#textGradient)"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-4xl sm:text-5xl font-bold"
        initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
    </svg>
  );
};
