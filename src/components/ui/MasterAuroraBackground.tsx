"use client";
import React from "react";

export const MasterAuroraBackground = () => {
  return (
    <div className="absolute inset-0 top-0 left-0 h-full w-full overflow-hidden bg-transparent pointer-events-none">
      {/* 1. TEXTURE DE GRAIN (Le secret des experts)
          Crée une légère granulation pour un aspect organique et premium 
      */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] z-50 pointer-events-none brightness-100 contrast-150"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* 2. FAISCEAU TOP-LEFT (Émeraude & Menthe) */}
      <div
        className="absolute -left-[10%] -top-[10%] w-[70%] h-[80%] opacity-40 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.4) 0%, rgba(52, 211, 153, 0.1) 40%, transparent 70%)",
          filter: "blur(110px)",
          animation: "aurora-expert 20s infinite alternate ease-in-out",
        }}
      />

      {/* 3. FAISCEAU RIGHT-CENTER (Bleu Pétrole & Vert) */}
      <div
        className="absolute -right-[15%] top-[15%] w-[80%] h-[70%] opacity-20 mix-blend-overlay"
        style={{
          background:
            "radial-gradient(circle at 80% 40%, rgba(20, 184, 166, 0.3) 0%, rgba(13, 148, 136, 0) 60%)",
          filter: "blur(140px)",
          animation: "aurora-expert-reverse 25s infinite alternate ease-in-out",
        }}
      />

      {/* 4. LUEUR DE PROFONDEUR (Dark Green) */}
      <div
        className="absolute left-[5%] bottom-[-10%] w-[60%] h-[50%] opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(6, 78, 59, 0.5) 0%, transparent 80%)",
          filter: "blur(100px)",
        }}
      />

      <style jsx>{`
        @keyframes aurora-expert {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          50% {
            transform: translate(3%, 5%) scale(1.05) rotate(1deg);
          }
          100% {
            transform: translate(-2%, 2%) scale(1) rotate(-1deg);
          }
        }
        @keyframes aurora-expert-reverse {
          0% {
            transform: translate(0, 0) scale(1.1);
          }
          100% {
            transform: translate(-5%, -5%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
