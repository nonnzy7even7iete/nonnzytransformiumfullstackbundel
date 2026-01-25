"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  gradientColors = ["#009E60", "#FFFFFF", "#FF8200"],
  speed = 0.5, // Contrôle la vitesse de l'orbite
  animating = true,
}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs ultra-doux pour l'effet "aimant" Google
  const springX = useSpring(x, { stiffness: 30, damping: 30 });
  const springY = useSpring(y, { stiffness: 30, damping: 30 });

  useAnimationFrame((time) => {
    if (!animating || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Logique d'orbite elliptique (Lissajous curve) pour un mouvement organique
    // Cela crée un mouvement fluide qui ne semble jamais se répéter
    const t = time * 0.0005 * speed;
    const newX = (Math.cos(t * 0.7) * 0.5 + 0.5) * rect.width;
    const newY = (Math.sin(t * 1.1) * 0.5 + 0.5) * rect.height;

    x.set(newX);
    y.set(newY);
  });

  // Le secret du "Google Glow" : Un rayon très large (600px) qui rend la bordure vivante
  const borderMask = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, ${gradientColors[0]} 0%, ${gradientColors[1]} 30%, ${gradientColors[2]} 60%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] p-[2px] transition-all duration-1000 shadow-sm",
        "bg-transparent",
        containerClassName
      )}
    >
      {/* 1. LE HALO DYNAMIQUE (L'EFFET GOOGLE) */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform scale-[1.2]"
        style={{ background: borderMask }}
      />

      {/* 2. LE CENTRE OPAQUE SCÉLLÉ (ZÉRO CASSURE) */}
      <div
        className={cn(
          "absolute inset-[2px] rounded-[calc(2.5rem-2px)] z-10 transition-colors duration-1000",
          "bg-white dark:bg-[#020408]",
          "ring-[0.5px] ring-white/10 dark:ring-white/5"
        )}
      />

      {/* 3. TEXTURE SENSORIELLE (BRUIT TRÈS FIN) */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat" />
      </div>

      {/* 4. CONTENU */}
      <div className={cn("relative z-30 w-full h-full", className)}>
        {children}
      </div>
    </div>
  );
};
