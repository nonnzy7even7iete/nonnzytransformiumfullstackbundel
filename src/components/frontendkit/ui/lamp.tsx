"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const LampContainer = ({ children, className }: LampContainerProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background w-full z-0",
        className
      )}
    >
      {/* Container de la source lumineuse */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* --- CÔNE GAUCHE --- */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "clamp(20rem, 50vw, 30rem)" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-gradient-from) at 50% 50%, transparent 210deg, var(--tw-gradient-to) 210deg)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible bg-gradient-conic from-emerald-500 via-transparent to-transparent text-white [--conic-gradient-from:invert(100%)] dark:[--tw-gradient-to:white] [--tw-gradient-to:theme(colors.emerald.500)]"
        >
          {/* Masques de fondu optimisés */}
          <div className="absolute w-full left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-20 md:w-40 h-full left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* --- CÔNE DROIT --- */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "clamp(20rem, 50vw, 30rem)" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-gradient-from) at 50% 50%, var(--tw-gradient-to) 150deg, transparent 150deg)`,
          }}
          className="absolute inset-auto left-1/2 h-56 overflow-visible bg-gradient-conic from-transparent via-transparent to-emerald-500 text-white [--conic-gradient-from:invert(100%)] dark:[--tw-gradient-to:white] [--tw-gradient-to:theme(colors.emerald.500)]"
        >
          <div className="absolute w-20 md:w-40 h-full right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* --- GLOW EFFECTS (LUEUR) --- */}
        {/* Diffusion de fond */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-3xl opacity-50 md:opacity-100"></div>

        {/* Halo central */}
        <div className="absolute inset-auto z-50 h-36 w-[12rem] md:w-[28rem] -translate-y-1/2 rounded-full bg-emerald-500 opacity-40 blur-[60px] md:blur-[80px]"></div>

        {/* Point focal animé */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "clamp(10rem, 25vw, 16rem)" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-emerald-400 blur-2xl opacity-60 md:opacity-100"
        ></motion.div>

        {/* Ligne de faisceau horizontale */}
        <motion.div
          initial={{ width: "12rem" }}
          whileInView={{ width: "clamp(18rem, 60vw, 30rem)" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
        ></motion.div>

        {/* Masque supérieur pour bloquer la lumière au-dessus de la ligne */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-background"></div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-50 flex -translate-y-32 md:-translate-y-80 flex-col items-center px-6">
        {children}
      </div>
    </div>
  );
};
