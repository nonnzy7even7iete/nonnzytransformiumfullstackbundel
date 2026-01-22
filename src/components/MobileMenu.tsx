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
import { X } from "lucide-react"; // On garde l'import pour la logique mais on va le styliser en trait

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
        }

        .mobile-smoke-item:active, .mobile-smoke-item:hover {
          border-color: light-dark(rgba(0,0,0,0.3), rgba(255,255,255,0.4)) !important;
          background: radial-gradient(circle at center, 
            rgba(0, 0, 0, 0.5) 0%, 
            rgba(30, 30, 30, 0.3) 50%, 
            transparent 100%
          ) !important;
          backdrop-filter: blur(10px);
        }

        .no-focus-all {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        /* Masquer la croix par dÃ©faut de Shadcn pour mettre notre trait */
        [data-radix-collection-item] > svg { display: none !important; }
      `}</style>

      <Sheet>
        {/* BURGER 2 TRAITS */}
        <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 bg-transparent border-none no-focus-all">
          <div className="h-[1.2px] w-6 bg-foreground/80 transition-all duration-300 group-hover:w-4" />
          <div className="h-[1.2px] w-4 bg-foreground/80 transition-all duration-300 group-hover:w-6" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl w-[75%] sm:w-[320px] p-0 no-focus-all flex flex-col"
        >
          {/* BOUTON FERMETURE : UN SEUL TRAIT HORIZONTAL */}
          <SheetClose className="absolute right-6 top-6 no-focus-all group">
            <div className="h-[1.2px] w-6 bg-foreground/40 group-hover:bg-foreground transition-colors" />
          </SheetClose>

          <SheetHeader className="p-[7px] border-b border-border-dual/30">
            <SheetTitle className="text-foreground/30 text-[8px] font-bold uppercase tracking-[0.4em] text-center">
              System
            </SheetTitle>
          </SheetHeader>

          {/* CONTENU : PADDING 7PX */}
          <div className="flex flex-col items-center justify-center gap-2 p-[7px] flex-grow">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-smoke-item w-full py-2 rounded-[var(--radius)] text-[9px] font-bold uppercase tracking-[0.2em] text-foreground text-center no-focus-all no-underline"
              >
                {link.label}
              </Link>
            ))}

            {session && (
              <Link
                href="/dashboard"
                className="mobile-smoke-item w-full py-2 rounded-[var(--radius)] text-[9px] font-bold uppercase tracking-[0.2em] text-green-500/70 border-green-500/10 text-center no-focus-all"
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
