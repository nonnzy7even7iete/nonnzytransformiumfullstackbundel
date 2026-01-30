"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const WarpBackground = ({
  children,
  className,
  gridColor = "rgba(34, 197, 94, 0.3)",
}: {
  children: React.ReactNode;
  className?: string;
  gridColor?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[#020408]",
        className
      )}
    >
      {/* L'effet de Tunnel Warp */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            perspective: "150px", // Perspective forcée pour l'effet tunnel
            perspectiveOrigin: "50% 50%",
          }}
        >
          <motion.div
            initial={{ rotateX: 0, translateZ: 0 }}
            animate={{
              translateZ: ["0px", "40px"], // On avance vers l'utilisateur
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-100%] h-[300%] w-[300%] origin-center"
            style={{
              backgroundImage: `
                linear-gradient(to right, ${gridColor} 1px, transparent 1px),
                linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              transformStyle: "preserve-3d",
              rotateX: "75deg",
              /* Effet de lueur et de flou sur les bords pour la vitesse */
              maskImage:
                "radial-gradient(circle at center, black 30%, transparent 80%)",
            }}
          />
        </div>

        {/* Overlay de profondeur (sombre au centre, lueur sur les bords) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020408] z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020408_70%)] z-[1]" />
      </div>

      {/* Ton contenu qui "flotte" au centre du tunnel */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};
