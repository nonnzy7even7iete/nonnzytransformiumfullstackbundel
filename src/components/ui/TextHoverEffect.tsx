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

  const width = style?.width || "100%";
  const height = style?.height || "100%";

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 1800 600"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none overflow-visible" // overflow-visible pour laisser passer le glow
      style={{
        minWidth: style?.minWidth || "300px",
        minHeight: style?.minHeight || "300px",
        ...style,
      }}
    >
      <defs>
        {/* Filtre de brillance (Glow) */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Dégradé avec couleurs boostées (plus saturées) */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FF41">
            {" "}
            {/* Vert néon */}
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#70a1ff">
            {" "}
            {/* Bleu électrique */}
            <animate
              attributeName="offset"
              values="0.5;1.5;0.5"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#a855f7">
            {" "}
            {/* Violet vibrant */}
            <animate
              attributeName="offset"
              values="1;2;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        {/* Masque radial avec stop BLANC PUR pour la brillance maximale */}
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="45%"
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="40%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Texte avec filtre Glow et Stroke accentué */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2.5" // Un peu plus épais pour porter la lumière
        stroke="url(#textGradient)"
        mask="url(#textMask)"
        filter="url(#glow)" // Application de l'effet de brillance
        className="fill-transparent font-[helvetica] font-extrabold"
        style={{
          fontSize: style?.fontSize || "clamp(4rem, 10vw, 7rem)",
          filter: "drop-shadow(0 0 15px rgba(101, 145, 216, 0.4))", // Double sécurité brillance
        }}
        initial={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
    </svg>
  );
};
