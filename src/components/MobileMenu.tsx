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
        .mobile-smoke-item {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid var(--color-border-dual);
          background: transparent;
          color: var(--foreground);
        }

        .mobile-smoke-item:active, .mobile-smoke-item:hover {
          border-color: light-dark(rgba(0,0,0,0.3), rgba(255,255,255,0.4)) !important;
          background: radial-gradient(circle at center, 
            light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.1)) 0%, 
            transparent 100%
          ) !important;
          backdrop-filter: blur(10px);
        }

        .no-focus-all {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        /* Suppression de l'icÃ´ne X par dÃ©faut de Shadcn */
        [data-state] > svg { display: none !important; }
      `}</style>

      <Sheet>
        {/* BURGER INITIAL */}
        <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 bg-transparent border-none no-focus-all">
          <div className="h-[1.2px] w-6 bg-foreground transition-all duration-300 group-hover:w-4" />
          <div className="h-[1.2px] w-4 bg-foreground transition-all duration-300 group-hover:w-6" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl w-[75%] sm:w-[320px] p-0 no-focus-all flex flex-col"
        >
          {/* BOUTON FERMETURE : CERCLE, BORDURE 1PX, TRAIT CENTRAL */}
          <SheetClose className="absolute right-4 top-4 no-focus-all group flex items-center justify-center w-8 h-8 rounded-full border border-border-dual transition-all hover:border-foreground/40 active:scale-95">
            <div className="h-[1px] w-3 bg-foreground/60 group-hover:bg-foreground transition-colors" />
          </SheetClose>

          <SheetHeader className="p-[7px] border-b border-border-dual/30 mt-12">
            <SheetTitle className="text-foreground/30 text-[8px] font-bold uppercase tracking-[0.4em] text-center">
              System
            </SheetTitle>
          </SheetHeader>

          {/* CONTENU PADDING 7PX */}
          <div className="flex flex-col items-center justify-center gap-2 p-[7px] flex-grow">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-smoke-item w-full py-2 rounded-[var(--radius)] text-[9px] font-bold uppercase tracking-[0.2em] text-center no-focus-all no-underline"
              >
                {link.label}
              </Link>
            ))}

            {session && (
              <Link
                href="/dashboard"
                className="mobile-smoke-item w-full py-2 rounded-[var(--radius)] text-[9px] font-bold uppercase tracking-[0.2em] text-green-600 dark:text-green-400 border-green-500/10 text-center no-focus-all"
              >
                Data Driven
              </Link>
            )}
          </div>

          {/* SIGNATURE BASSE */}
          <div className="p-[7px] w-full text-center pb-6">
            <div className="flex flex-col gap-0.5">
              <p className="text-[7px] uppercase tracking-[0.5em] text-foreground/40 font-black">
                Ivory Coast
              </p>
              <p className="text-[6px] uppercase tracking-[0.2em] text-foreground/20 italic">
                Data Driven
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
