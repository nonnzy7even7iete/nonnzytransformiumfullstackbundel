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
        /* EFFET GLASSMORPHIQUE AU HOVER */
        .glass-hover-item {
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          border: 1px solid transparent;
        }
        
        .glass-hover-item:hover {
          background: light-dark(rgba(0, 0, 0, 0.03), rgba(255, 255, 255, 0.06)) !important;
          backdrop-filter: blur(8px) saturate(150%);
          -webkit-backdrop-filter: blur(8px) saturate(150%);
          border-color: light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.1));
          transform: translateX(4px);
        }

        /* EFFET RA'AD SHINE ELITE (DOUCEUR LIQUIDE) */
        @keyframes raad-ultra-pro {
          0% { background-position: -150% 0; }
          /* Passage lent et soyeux */
          40%, 100% { background-position: 150% 0; }
        }

        .raad-effect-pro {
          position: relative;
          display: inline-block;
          /* Couleur de base profonde */
          color: light-dark(rgba(0, 0, 0, 0.4), rgba(255, 255, 255, 0.3));
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0) 30%,
            light-dark(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 1)) 50%,
            rgba(255, 255, 255, 0) 70%,
            transparent 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: raad-ultra-pro 7s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          /* Lissage de police pour le shine */
          -webkit-font-smoothing: antialiased;
        }

        /* Masquage croix par dÃ©faut */
        .absolute.right-4.top-4.rounded-sm.opacity-70 { display: none !important; }
      `}</style>

      <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 outline-none border-none bg-transparent">
        <div className="h-[1.5px] w-6 bg-foreground transition-all group-hover:w-4" />
        <div className="h-[1.5px] w-4 bg-foreground transition-all group-hover:w-6" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col p-0 w-[85%] sm:w-[350px] !bg-white dark:!bg-black border-l border-border outline-none vercel-font"
      >
        {/* CLOSE BUTTON - TRAIT MINIMALISTE */}
        <div className="flex justify-end p-6">
          <SheetClose className="group outline-none border-none bg-transparent">
            <div className="h-[1.5px] w-8 bg-foreground/20 group-hover:bg-foreground transition-colors rounded-full" />
          </SheetClose>
        </div>

        {/* IDENTITY SECTION */}
        <div className="px-7 pb-6">
          <h2 className="text-[14px] font-bold tracking-tight text-foreground">
            {session?.user?.name || "nonnzytransformium"}
          </h2>
          <p className="text-[12px] text-foreground/50 font-medium">
            {session?.user?.email || "nonnzytransformium@gmail.com"}
          </p>
        </div>

        <div className="h-[1px] w-full bg-border/40" />

        {/* NAVIGATION AVEC GLASS-HOVER */}
        <nav className="flex-grow p-[10px] flex flex-col gap-1">
          {links.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass-hover-item flex items-center justify-between px-4 py-3 rounded-lg text-[13px] font-semibold text-foreground/80 no-underline"
            >
              {link.label}
              <span className="opacity-20 text-[10px]">â†—</span>
            </Link>
          ))}
        </nav>

        {/* FOOTER AVEC SHINE DOUCEUR */}
        <div className="mt-auto border-t border-border/40 bg-black/[0.01] dark:bg-white/[0.01] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {/* SHINE PRO VERSION */}
              <p className="raad-effect-pro text-[10px] font-black uppercase tracking-[0.4em]">
                Ivory Coast
              </p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/20 italic font-semibold block">
                Data Driven
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/20 backdrop-blur-md">
              <span className="text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">
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
