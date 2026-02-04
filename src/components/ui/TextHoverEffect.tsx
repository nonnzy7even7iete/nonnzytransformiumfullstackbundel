"use client";
import React, { useMemo } from "react";
import { motion, useTime, useTransform } from "framer-motion";

export const TextHoverEffect = ({
  text,
  duration = 0.3,
  style,
}: {
  text: string;
  duration?: number;
  style?: React.CSSProperties;
}) => {
  // Utilisation du moteur de temps natif de Framer Motion (plus performant qu'un setInterval)
  const time = useTime();

  // On calcule les positions cx et cy de manière fluide
  // Ces valeurs ne seront JAMAIS undefined car elles sont calculées à la volée
  const cx = useTransform(time, (t) => `${50 + 35 * Math.cos(t / 500)}%`);
  const cy = useTransform(time, (t) => `${50 + 35 * Math.sin(t / 500)}%`);

  return (
    <svg
      width={style?.width || "100%"}
      height={style?.height || "100%"}
      viewBox="0 0 1800 900"
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
          // On lie directement les motion values ici
          cx={cx}
          cy={cy}
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
