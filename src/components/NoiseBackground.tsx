"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";

function GradientLayer({
  springX,
  springY,
  gradientColor,
  opacity,
  multiplier,
}: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  gradientColor: string;
  opacity: number;
  multiplier: number;
}) {
  const x = useTransform(springX, (val) => val * multiplier);
  const y = useTransform(springY, (val) => val * multiplier);
  // Augmentation du rayon du gradient pour qu'il touche mieux les bords
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, ${gradientColor} 0%, transparent 65%)`;

  return (
    <motion.div className="absolute inset-0" style={{ opacity, background }} />
  );
}

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  gradientColors = [
    "rgba(0, 158, 96, 0.6)", // Vert Émeraude plus saturé
    "rgba(255, 255, 255, 0.5)", // Blanc plus présent
    "rgba(255, 130, 0, 0.5)", // Orange Solaire plus chaud
  ],
  noiseIntensity = 0.2, // Un peu plus de grain pour le côté hardware
  speed = 0.06, // Légère accélération pour sentir le mouvement
  animating = true,
}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 40, damping: 25 });
  const springY = useSpring(y, { stiffness: 40, damping: 25 });

  // Logique de mouvement auto-généré
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

    if (time - lastDirectionChangeRef.current > 2500) {
      const angle = Math.random() * Math.PI * 2;
      velocityRef.current = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      lastDirectionChangeRef.current = time;
    }

    let newX = x.get() + velocityRef.current.x * 16;
    let newY = y.get() + velocityRef.current.y * 16;

    if (newX < 0 || newX > rect.width) velocityRef.current.x *= -1;
    if (newY < 0 || newY > rect.height) velocityRef.current.y *= -1;

    x.set(newX);
    y.set(newY);
  });

  // Animation spécifique pour la bordure (Glow Border)
  const borderBackground = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(0, 158, 96, 0.4), transparent 40%)`;

  return (
    <div
      ref={containerRef}
      className={cn(
        // Fond adaptatif : Blanc cassé en light mode / Noir profond en dark mode
        "relative overflow-hidden rounded-[2rem] p-[1.5px] transition-colors duration-500",
        "bg-slate-200/50 dark:bg-slate-950/80",
        containerClassName
      )}
    >
      {/* COUCHE DE BORDURE ANIMÉE (Le Glow qui tourne) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-100"
        style={{ background: borderBackground }}
      />

      {/* CONTENEUR INTERNE (Masque la bordure pour ne laisser qu'un filet) */}
      <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-white/90 dark:bg-black/90 z-0" />

      {/* CALQUES DE COULEURS */}
      <div className="absolute inset-0 z-10 opacity-60 dark:opacity-40">
        <GradientLayer
          springX={springX}
          springY={springY}
          gradientColor={gradientColors[0]}
          opacity={0.5}
          multiplier={1}
        />
        <GradientLayer
          springX={springX}
          springY={springY}
          gradientColor={gradientColors[1]}
          opacity={0.3}
          multiplier={0.7}
        />
        <GradientLayer
          springX={springX}
          springY={springY}
          gradientColor={gradientColors[2]}
          opacity={0.4}
          multiplier={1.2}
        />
      </div>

      {/* TEXTURE DE BRUIT (Adaptée au mode) */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-[0.12] dark:opacity-[0.08] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat" />
      </div>

      {/* CONTENU */}
      <div className={cn("relative z-30", className)}>{children}</div>
    </div>
  );
};
