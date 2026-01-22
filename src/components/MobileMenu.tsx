"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  session: any;
}

export function MobileMenu({ links, session }: MobileMenuProps) {
  return (
    <>
      <style>{`
        /* Effet fumée avec Noir Pur et Gris Profond */
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
      `}</style>

      <Sheet>
        {/* BURGER : Minimaliste et propre */}
        <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 bg-transparent border-none no-focus-all">
          <div className="h-[1.2px] w-6 bg-foreground/80 transition-all duration-300 group-hover:w-4" />
          <div className="h-[1.2px] w-4 bg-foreground/80 transition-all duration-300 group-hover:w-6" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl w-[80%] sm:w-[350px] p-0 no-focus-all flex flex-col"
        >
          {/* Header avec padding drastiquement réduit */}
          <SheetHeader className="p-4 border-b border-border-dual/50">
            <SheetTitle className="text-foreground/40 text-[9px] font-medium uppercase tracking-[0.3em] text-center">
              System Menu
            </SheetTitle>
          </SheetHeader>

          {/* Conteneur Items : Padding réduit pour compacité */}
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-4 flex-grow">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-smoke-item w-full py-2.5 rounded-[var(--radius)] text-[10px] font-bold uppercase tracking-[0.2em] text-foreground text-center no-focus-all no-underline"
              >
                {link.label}
              </Link>
            ))}

            {session && (
              <Link
                href="/dashboard"
                className="mobile-smoke-item w-full py-2.5 rounded-[var(--radius)] text-[10px] font-bold uppercase tracking-[0.2em] text-green-500/80 border-green-500/10 text-center no-focus-all"
              >
                Data Dashboard
              </Link>
            )}
          </div>

          {/* Signature : Ivory Coast | Data Driven */}
          <div className="p-6 w-full text-center">
            <div className="h-[1px] w-6 bg-border-dual mx-auto mb-3" />
            <div className="flex flex-col gap-1">
              <p className="text-[8px] uppercase tracking-[0.4em] text-foreground/30 font-bold">
                Ivory Coast
              </p>
              <p className="text-[7px] uppercase tracking-[0.2em] text-foreground/20 italic">
                Data Driven
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
