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

  return (
    <svg
      width={style?.width || "100%"}
      height={style?.height || "100%"}
      viewBox="0 0 1800 900" // Hauteur augmentée pour le padding interne
      preserveAspectRatio="xMidYMid meet"
      className="select-none overflow-visible"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FF41" />
          <stop offset="50%" stopColor="#70a1ff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="45%"
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

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
        style={{ fontSize: style?.fontSize || "350px" }}
        initial={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
    </svg>
  );
};
