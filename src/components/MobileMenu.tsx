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
        /* Effet fumée spécifique au menu mobile */
        .mobile-smoke-item {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid var(--color-border-dual);
          position: relative;
        }

        .mobile-smoke-item:active, .mobile-smoke-item:hover {
          border-color: rgba(255, 255, 255, 0.4) !important;
          background: radial-gradient(circle at center, 
            rgba(0, 0, 0, 0.6) 0%, 
            rgba(30, 30, 30, 0.4) 50%, 
            transparent 100%
          ) !important;
          backdrop-filter: blur(10px);
          transform: scale(0.98);
        }

        /* Anti-focus bleu/gris sur mobile */
        .no-tap-highlight {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      <Sheet>
        {/* BOUTON BURGER 2 BARRES (Visible uniquement via MD:HIDDEN dans le parent) */}
        <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 bg-transparent border-none outline-none focus:ring-0 no-tap-highlight">
          <div className="h-[1.5px] w-6 bg-foreground transition-all duration-300 group-hover:w-4" />
          <div className="h-[1.5px] w-4 bg-foreground transition-all duration-300 group-hover:w-6" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl w-[85%] sm:w-[400px] p-0 overflow-hidden"
        >
          <SheetHeader className="p-6 border-b border-border-dual">
            <SheetTitle className="text-foreground text-[10px] font-bold uppercase tracking-[0.2em] text-left">
              Navigation
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-3 p-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-smoke-item p-4 rounded-[var(--radius)] text-[11px] font-bold uppercase tracking-widest text-foreground no-underline"
              >
                {link.label}
              </Link>
            ))}

            {/* Séparateur subtil si session existe */}
            {session && <div className="h-[1px] w-full bg-border-dual my-2" />}

            {session && (
              <Link
                href="/dashboard"
                className="mobile-smoke-item p-4 rounded-[var(--radius)] text-[11px] font-bold uppercase tracking-widest text-green-500/90 border-green-500/20"
              >
                Tableau de Bord
              </Link>
            )}
          </div>

          {/* Footer du menu mobile */}
          <div className="absolute bottom-8 left-6 right-6">
            <p className="text-[9px] uppercase tracking-widest text-foreground/30 font-medium">
              Nonnzytr © 2026
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
