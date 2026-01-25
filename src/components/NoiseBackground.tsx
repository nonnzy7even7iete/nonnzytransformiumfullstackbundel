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
} from "framer-motion"; // Note: j'ai remis framer-motion pour la compatibilité standard
import { useEffect, useRef } from "react";

// --- SOUS-COMPOSANT : COUCHES DE DÉGRADÉS ---
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
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, ${gradientColor} 0%, transparent 50%)`;

  return (
    <motion.div className="absolute inset-0" style={{ opacity, background }} />
  );
}

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  // COULEURS IVOIRIENNES SUBTILES PAR DÉFAUT
  gradientColors = [
    "rgba(0, 158, 96, 0.5)", // Vert Émeraude (CI)
    "rgba(255, 255, 255, 0.3)", // Blanc Pur
    "rgba(255, 130, 0, 0.4)", // Orange Solaire (CI)
  ],
  noiseIntensity = 0.15,
  speed = 0.04, // Vitesse ralentie pour un effet "vapeur" plus classe
  backdropBlur = true,
  animating = true,
}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  const topGradientX = useTransform(springX, (val) => val * 0.1 - 50);

  const velocityRef = useRef({ x: 0, y: 0 });
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

    if (time - lastDirectionChangeRef.current > 2000) {
      const angle = Math.random() * Math.PI * 2;
      velocityRef.current = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      lastDirectionChangeRef.current = time;
    }

    const deltaTime = 16;
    let newX = x.get() + velocityRef.current.x * deltaTime;
    let newY = y.get() + velocityRef.current.y * deltaTime;

    // Bounds check
    if (newX < 0 || newX > rect.width) velocityRef.current.x *= -1;
    if (newY < 0 || newY > rect.height) velocityRef.current.y *= -1;

    x.set(newX);
    y.set(newY);
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 p-1",
        containerClassName
      )}
    >
      {/* Les 3 calques de couleurs nationales */}
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[0]}
        opacity={0.4}
        multiplier={1}
      />
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[1]}
        opacity={0.2}
        multiplier={0.7}
      />
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[2]}
        opacity={0.3}
        multiplier={1.2}
      />

      {/* Liseré supérieur (Barre de chargement subtile) */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] opacity-50 blur-[1px]"
        style={{
          background: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`,
          x: topGradientX,
        }}
      />

      {/* Texture de Bruit (Grain) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://assets.aceternity.com/noise.webp')] bg-repeat" />
      </div>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
