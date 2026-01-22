"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  session: any;
}

export function MobileMenu({ links, session }: MobileMenuProps) {
  return (
    <>
      <style>{`
        /* Force la police Inter pour un look Data/Vercel */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        .vercel-font {
          font-family: 'Inter', sans-serif !important;
        }

        /* Supprime le contour bleu dégueulasse au clic sur mobile */
        * { -webkit-tap-highlight-color: transparent !important; }
        
        /* Cache la croix par défaut de Shadcn */
        button[Component="SheetClose"] svg, 
        .absolute.right-4.top-4.rounded-sm.opacity-70 svg { 
          display: none !important; 
        }
      `}</style>

      <Sheet>
        {/* BURGER : Noir en Light, Blanc en Dark */}
        <SheetTrigger className="group flex flex-col items-end gap-[5px] p-2 bg-transparent border-none outline-none focus:ring-0">
          <div className="h-[1.2px] w-5 bg-foreground transition-all duration-300 group-hover:w-3" />
          <div className="h-[1.2px] w-3 bg-foreground transition-all duration-300 group-hover:w-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          /* FORÇAGE COULEUR : Blanc pur en light (!bg-white), Glass en dark */
          className="vercel-font !p-0 !bg-white dark:!bg-black/90 !backdrop-blur-2xl border-l border-border-dual w-[85%] sm:w-[320px] flex flex-col shadow-2xl outline-none"
        >
          {/* BOUTON FERMETURE : CERCLE 1PX AVEC TRAIT */}
          <SheetClose className="absolute right-4 top-4 flex items-center justify-center w-8 h-8 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all outline-none">
            <div className="h-[1px] w-3 bg-foreground/60" />
          </SheetClose>

          {/* IDENTITY SECTION (Comme ta capture) */}
          <div className="p-6 pt-12 border-b border-black/5 dark:border-white/10">
            <p className="text-[11px] font-bold tracking-tight text-black dark:text-white truncate">
              {session?.user?.name || "nonnzytransformium-4464"}
            </p>
            <p className="text-[10px] text-black/50 dark:text-white/40 truncate font-medium mt-0.5">
              {session?.user?.email || "nonnzytransformium@gmail.com"}
            </p>
          </div>

          {/* NAVIGATION : PADDING 7PX RÉEL */}
          <div className="flex flex-col gap-0.5 p-[7px] flex-grow mt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-[6px] text-[11px] font-medium text-black/80 dark:text-white/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors no-underline"
              >
                {link.label}
                <span className="opacity-20 text-[9px]">→</span>
              </Link>
            ))}
          </div>

          {/* FOOTER : IVORY COAST / DATA DRIVEN */}
          <div className="mt-auto border-t border-black/5 dark:border-white/10 p-[7px] bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="flex items-center justify-between px-3 py-4 mb-2">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.3em] font-black text-black/40 dark:text-white/40">
                  Ivory Coast
                </span>
                <span className="text-[7px] uppercase tracking-[0.1em] text-black/20 dark:text-white/20 italic font-medium">
                  Data Driven
                </span>
              </div>
              <div className="h-6 w-[1px] bg-black/10 dark:bg-white/10 mx-2" />
              <Link
                href="/dashboard"
                className="text-[9px] font-bold text-green-600 dark:text-green-500 uppercase tracking-tighter"
              >
                Pro Status
              </Link>
            </div>

            {/* BOUTON NOIR VERCEL */}
            <Link
              href="/upgrade"
              className="block w-full py-2.5 bg-black dark:bg-white text-white dark:text-black text-center rounded-[6px] text-[10px] font-bold hover:opacity-90 transition-all uppercase tracking-wide"
            >
              Upgrade to Pro
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
