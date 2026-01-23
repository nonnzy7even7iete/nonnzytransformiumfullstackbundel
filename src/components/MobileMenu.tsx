"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function MobileMenu({ links, session }: any) {
  return (
    <Sheet>
      <style>{`
        /* 1. HOVER GLASSMORPHIQUE AJUSTÉ (WIDTH AUTO) */
        .glass-hover-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Aligne les liens à gauche */
        }

        .glass-hover-item {
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          border: 1px solid transparent;
          width: fit-content; /* L'effet s'adapte à la taille du texte */
          padding: 8px 12px; /* Respiration interne */
          margin-left: -3px; /* Aligné optiquement avec le bord */
        }
        
        .glass-hover-item:hover {
          background: light-dark(rgba(0, 0, 0, 0.03), rgba(255, 255, 255, 0.06)) !important;
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          border-color: light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.1));
          border-radius: 8px;
          transform: translateX(3px); /* Petit décalage fluide */
        }

        /* 2. SHINE RA'AD SENS LECTURE (IVORY -> COAST) & LENTEUR EXTRÊME */
        @keyframes raad-shine-linear {
          0% { background-position: 200% 0; }
          /* Passage très lent et gracieux entre 0 et 50% du temps */
          50%, 100% { background-position: -200% 0; }
        }

        .raad-effect-pro {
          display: inline-block;
          color: light-dark(rgba(0, 0, 0, 0.35), rgba(255, 255, 255, 0.25));
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0) 25%,
            light-dark(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 1)) 50%,
            rgba(255, 255, 255, 0) 75%,
            transparent 100%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          /* 12 secondes pour un cycle complet : très majestueux */
          animation: raad-shine-linear 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          -webkit-font-smoothing: antialiased;
        }

        .absolute.right-4.top-4.rounded-sm.opacity-70 { display: none !important; }
      `}</style>

      <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 outline-none border-none bg-transparent">
        <div className="h-[1.5px] w-6 bg-foreground transition-all group-hover:w-4" />
        <div className="h-[1.5px] w-4 bg-foreground transition-all group-hover:w-6" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col p-0 w-[85%] sm:w-[350px] !bg-white dark:!bg-black border-l border-border outline-none font-sans"
      >
        <div className="flex justify-end p-6">
          <SheetClose className="group outline-none border-none bg-transparent">
            <div className="h-[1.5px] w-8 bg-foreground/20 group-hover:bg-foreground transition-colors rounded-full" />
          </SheetClose>
        </div>

        {/* IDENTITY SECTION */}
        <div className="px-8 pb-6">
          <h2 className="text-[15px] font-bold tracking-tight text-foreground">
            {session?.user?.name || "nonnzytransformium"}
          </h2>
          <p className="text-[12px] text-foreground/40 font-medium">
            {session?.user?.email || "nonnzytransformium@gmail.com"}
          </p>
        </div>

        <div className="h-[1px] w-full bg-border/30" />

        {/* NAVIGATION AVEC FIT-CONTENT HOVER */}
        <nav className="flex-grow p-[14px] glass-hover-container gap-2">
          {links.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass-hover-item flex items-center gap-4 text-[14px] font-semibold text-foreground/80 no-underline group/item"
            >
              {link.label}
              <span className="opacity-0 group-hover/item:opacity-40 transition-opacity text-[10px]">
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* FOOTER : RA'AD IVORY -> COAST */}
        <div className="mt-auto border-t border-border/30 bg-black/[0.01] dark:bg-white/[0.01] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="raad-effect-pro text-[11px] font-black uppercase tracking-[0.4em]">
                Ivory Coast
              </p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/20 italic font-bold block">
                Data Driven
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/15 backdrop-blur-md">
              <span className="text-[9px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest">
                Pro
              </span>
            </div>
          </div>

          <Link
            href="/upgrade"
            className="flex items-center justify-center w-full py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-[12px] font-bold hover:opacity-90 transition-all shadow-xl shadow-black/5 active:scale-[0.98]"
          >
            Upgrade to Pro
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
