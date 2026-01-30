"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WarpBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gridColor?: string;
}

export const WarpBackground = ({
  children,
  className,
  gridColor = "rgba(34, 197, 94, 0.2)", // Vert émeraude par défaut pour ton projet
}: WarpBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center p-20 overflow-hidden bg-transparent",
        className
      )}
    >
      {/* La Grille en perspective */}
      <div
        className="absolute inset-0 z-0"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ rotateX: 60, y: "-50%" }}
          animate={{
            y: ["-50%", "-45%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
          className="absolute inset-0 h-[200%] w-full origin-top"
          style={{
            backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "linear-gradient(to bottom, transparent, black, transparent)",
          }}
        />
      </div>

      {/* Contenu de la carte */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
