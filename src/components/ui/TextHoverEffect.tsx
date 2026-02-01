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
      /* On augmente la hauteur du viewBox de 600 à 800 pour donner de l'air en haut et en bas */
      viewBox="0 0 1800 800"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      /* Essentiel pour que le filtre glow ne soit pas coupé aux bords du SVG */
      className="select-none overflow-visible p-4"
      style={{
        minWidth: style?.minWidth || "300px",
        minHeight: style?.minHeight || "300px",
        ...style,
      }}
    >
      <defs>
        {/* Filtre Glow élargi pour éviter le "clipping" */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FF41">
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#70a1ff">
            <animate
              attributeName="offset"
              values="0.5;1.5;0.5"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#a855f7">
            <animate
              attributeName="offset"
              values="1;2;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

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

      {/* Ajustement Senior : 
          y="50%" combiné à un viewBox plus grand crée le padding interne automatique.
          dominantBaseline="central" assure un centrage vertical parfait.
      */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        strokeWidth="3"
        stroke="url(#textGradient)"
        mask="url(#textMask)"
        filter="url(#glow)"
        className="fill-transparent font-sans font-black uppercase tracking-tighter"
        style={{
          fontSize: style?.fontSize || "320px",
          /* On retire le drop-shadow CSS ici pour laisser le filtre SVG glow faire le travail proprement sans décalage */
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
