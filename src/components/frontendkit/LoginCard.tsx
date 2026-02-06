"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import { cn } from "@/lib/utils";

export default function LoginCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[450px] lg:w-[450px] h-[450px] p-8 lg:p-10 flex flex-col items-center justify-center shadow-2xl shrink-0 transition-all duration-500",
        "bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--border-color)] rounded-[var(--radius-vercel)] group",
        className
      )}
    >
      {/* Logo Section */}
      <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
        <TextHoverEffect
          text="Nonnzytr"
          duration={0.6}
          style={{
            width: "100%",
            height: "100%",
            fontSize: "clamp(4rem, 12vw, 8rem)",
          }}
        />
      </div>

      {/* Action Section */}
      <div className="w-full flex flex-col items-center justify-center gap-6 mt-4">
        <p className="text-[var(--foreground)]/60 text-[11px] tracking-[0.4em] uppercase font-black text-center italic">
          Votre aventure commence ici
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full max-w-[320px] py-4.5 flex items-center justify-center gap-3 bg-[var(--foreground)] text-[var(--background)] font-black rounded-[var(--radius-vercel)] hover:opacity-90 active:scale-95 transition-all duration-300 shadow-xl border-none outline-none"
        >
          <FcGoogle className="text-2xl shrink-0" />
          <span className="text-[10px] tracking-[0.2em] uppercase">
            Continuer avec Google
          </span>
        </button>

        <p className="text-[var(--foreground)]/30 text-[9px] italic text-center max-w-[280px] leading-tight uppercase tracking-widest">
          Connexion sécurisée via Google <br /> Accès Workflow Terminal
        </p>
      </div>
    </div>
  );
}
