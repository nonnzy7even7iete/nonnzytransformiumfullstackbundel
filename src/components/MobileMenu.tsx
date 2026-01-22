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
        /* ANIMATION RA'AD (TONNERRE SUR L'EAU) - VERSION LENTE AVEC TIMEOUT */
        @keyframes raad-shine {
          0% { background-position: -200% center; opacity: 0.6; }
          /* L'éclair passe entre 0% et 30% du temps total de l'animation */
          10% { opacity: 1; } 
          25% { background-position: 200% center; opacity: 0.6; }
          /* Entre 30% et 100%, le texte reste "calme" (Temps mort de 7s environ) */
          30%, 100% { background-position: 200% center; opacity: 0.6; }
        }

        .raad-effect {
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0) 40%, 
            light-dark(rgba(0, 0, 0, 0.9), rgba(255, 255, 255, 1)) 50%, 
            rgba(255, 255, 255, 0) 60%, 
            transparent 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          /* Couleur de base du texte au repos */
          color: light-dark(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.15));
          /* Animation de 10s au total (3s d'effet + 7s de calme) */
          animation: raad-shine 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          display: inline-block;
          transition: color 0.5s ease;
        }

        .absolute.right-4.top-4.rounded-sm.opacity-70 { display: none !important; }
      `}</style>

      {/* TRIGGER BURGER */}
      <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 outline-none border-none bg-transparent">
        <div className="h-[1.5px] w-6 bg-foreground transition-all group-hover:w-4" />
        <div className="h-[1.5px] w-4 bg-foreground transition-all group-hover:w-6" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col p-0 w-[85%] sm:w-[350px] !bg-white dark:!bg-black border-l border-border outline-none"
      >
        <div className="flex justify-end p-6">
          <SheetClose className="group outline-none border-none bg-transparent">
            <div className="h-[1.5px] w-8 bg-foreground/20 group-hover:bg-foreground transition-colors rounded-full" />
          </SheetClose>
        </div>

        {/* IDENTITY SECTION */}
        <div className="px-7 pb-6">
          <h2 className="text-[14px] font-bold tracking-tight text-foreground">
            {session?.user?.name || "nonnzytransformium-4464"}
          </h2>
          <p className="text-[12px] text-foreground/50 font-medium">
            {session?.user?.email || "nonnzytransformium@gmail.com"}
          </p>
        </div>

        <div className="h-[1px] w-full bg-border/50" />

        {/* NAVIGATION */}
        <nav className="flex-grow p-[10px] flex flex-col gap-1">
          {links.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-4 py-3 rounded-md text-[13px] font-semibold text-foreground/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors no-underline"
            >
              {link.label}
              <span className="opacity-20 text-[10px]">→</span>
            </Link>
          ))}
        </nav>

        {/* FOOTER AVEC EFFET RA'AD TEMPORISÉ */}
        <div className="mt-auto border-t border-border/50 bg-black/[0.01] dark:bg-white/[0.01] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="raad-effect text-[10px] font-black uppercase tracking-[0.3em]">
                Ivory Coast
              </p>
              <p className="text-[8px] uppercase tracking-[0.1em] text-foreground/20 italic font-medium block">
                Data Driven
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-tighter">
                Pro
              </span>
            </div>
          </div>

          <Link
            href="/upgrade"
            className="flex items-center justify-center w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-md text-[12px] font-bold hover:opacity-90 transition-all shadow-sm"
          >
            Upgrade to Pro
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
