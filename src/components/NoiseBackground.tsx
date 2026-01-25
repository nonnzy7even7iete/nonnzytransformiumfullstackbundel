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
  // Couleurs vives pour le halo (Vert CI, Blanc, Orange CI)
  gradientColors = ["#009E60", "#FFFFFF", "#FF8200"],
  noiseIntensity = 0.05,
  speed = 0.015, // Ultra lent pour le sensorisme
  animating = true,
}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs ultra-smooth pour supprimer toute saccade
  const springX = useSpring(x, { stiffness: 20, damping: 40 });
  const springY = useSpring(y, { stiffness: 20, damping: 40 });

  const velocityRef = useRef({ x: speed, y: speed });
  const lastDirectionChangeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(rect.width / 2);
    y.set(rect.height / 2);
  }, [x, y]);

  useAnimationFrame((time) => {
    if (!animating || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Changement de direction très rare (toutes les 5 à 8 secondes)
    if (time - lastDirectionChangeRef.current > 5000 + Math.random() * 3000) {
      const angle = Math.random() * Math.PI * 2;
      velocityRef.current = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      lastDirectionChangeRef.current = time;
    }

    let newX = x.get() + velocityRef.current.x * 16;
    let newY = y.get() + velocityRef.current.y * 16;

    // Rebond fluide sur les bords
    if (newX < 0 || newX > rect.width) velocityRef.current.x *= -1;
    if (newY < 0 || newY > rect.height) velocityRef.current.y *= -1;

    x.set(newX);
    y.set(newY);
  });

  // Logique du halo de bordure : un dégradé conique/radial qui suit le point invisible
  const borderMask = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]}, transparent 80%)`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-[2rem] p-[2px] transition-colors duration-1000",
        // La bordure réagit de la même manière dans les deux modes
        "bg-slate-200 dark:bg-slate-800",
        containerClassName
      )}
    >
      {/* 1. LE HALO DE BORDURE (LUMIÈRE VIVE) */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ background: borderMask }}
      />

      {/* 2. LE CENTRE OPAQUE (PROTECTION DU CONTENU) */}
      <div
        className={cn(
          "absolute inset-[2px] rounded-[calc(2rem-2px)] z-10 transition-colors duration-1000",
          "bg-white dark:bg-[#020408]" // Zéro transparence ici
        )}
      />

      {/* 3. TEXTURE DE BRUIT (SUBTILE MAIS PRÉSENTE) */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-[0.04] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat shadow-inner" />
      </div>

      {/* 4. CONTENU */}
      <div className={cn("relative z-30 w-full h-full", className)}>
        {children}
      </div>
    </div>
  );
};
