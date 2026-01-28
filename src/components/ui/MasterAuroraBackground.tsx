"use client";
import React from "react";

export const MasterAuroraBackground = () => {
  return (
    // "inset-0 top-0" : Occupation totale sans aucune marge
    <div className="absolute inset-0 top-0 left-0 h-full w-full overflow-hidden bg-transparent pointer-events-none">
      {/* 1. L'AURA PRIMAIRE (Top Left - La Torche) */}
      <div
        className="absolute -left-[15%] -top-[20%] w-[80%] h-[80%] opacity-50 dark:opacity-60 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.5) 0%, rgba(16, 185, 129, 0) 70%)",
          filter: "blur(120px)",
          animation: "aurora-float 15s infinite alternate ease-in-out",
        }}
      />

      {/* 2. LE FAISCEAU SECONDAIRE (Right Center - Équilibre) */}
      <div
        className="absolute -right-[10%] top-[20%] w-[70%] h-[70%] opacity-30 dark:opacity-40 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle at 70% 50%, rgba(0, 255, 136, 0.3) 0%, transparent 75%)",
          filter: "blur(140px)",
          animation: "aurora-float-reverse 18s infinite alternate ease-in-out",
        }}
      />

      {/* 3. L'ACCENT PROFOND (Left Bottom - Texture) */}
      <div
        className="absolute left-[5%] -bottom-[15%] w-[60%] h-[60%] opacity-20 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(5, 150, 105, 0.4) 0%, transparent 80%)",
          filter: "blur(110px)",
        }}
      />

      {/* 4. LE "GLOW" DE SURFACE (Optionnel : Unifie le tout) */}
      <div className="absolute inset-0 w-full h-full bg-neutral-950/[0.02] dark:bg-white/[0.01]" />

      <style jsx>{`
        @keyframes aurora-float {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(5%, 5%) rotate(2deg) scale(1.05);
          }
          100% {
            transform: translate(-2%, 8%) rotate(-1deg) scale(1);
          }
        }
        @keyframes aurora-float-reverse {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1.1);
          }
          100% {
            transform: translate(-8%, -5%) rotate(-3deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default MasterAuroraBackground;
