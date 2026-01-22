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
        .menu-item-vercel {
          transition: all 0.2s ease;
          color: var(--foreground);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Effet de survol minimaliste (gris trÃ¨s lÃ©ger) */
        .menu-item-vercel:hover {
          background: light-dark(rgba(0, 0, 0, 0.03), rgba(255, 255, 255, 0.04));
        }

        .no-focus-all {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        /* Masquage icÃ´ne Shadcn par dÃ©faut */
        [data-radix-collection-item] > svg { display: none !important; }
      `}</style>

      <Sheet>
        {/* BURGER MINIMALISTE */}
        <SheetTrigger className="group flex flex-col items-end gap-[5px] p-2 bg-transparent border-none no-focus-all">
          <div className="h-[1px] w-5 bg-foreground/80 transition-all duration-300 group-hover:w-3" />
          <div className="h-[1px] w-3 bg-foreground/80 transition-all duration-300 group-hover:w-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl w-[85%] sm:w-[320px] p-0 no-focus-all flex flex-col shadow-2xl"
        >
          {/* BOUTON FERMETURE CERCLE 1PX (InspirÃ© du design cockpit) */}
          <SheetClose className="absolute right-4 top-4 no-focus-all group flex items-center justify-center w-7 h-7 rounded-full border border-border-dual transition-all hover:bg-foreground/[0.03] active:scale-90">
            <div className="h-[1px] w-3 bg-foreground/40 group-hover:bg-foreground transition-colors" />
          </SheetClose>

          {/* SECTION IDENTITÃ‰ (Top de ta capture) */}
          <div className="p-6 pt-12 border-b border-border-dual/40">
            <p className="text-[11px] font-bold tracking-tight text-foreground truncate">
              {session?.user?.name || "nonnzytransformium-4464"}
            </p>
            <p className="text-[10px] text-foreground/50 truncate font-medium mt-0.5">
              {session?.user?.email || "nonnzytransformium@gmail.com"}
            </p>
          </div>

          {/* SECTION NAVIGATION (Padding 7px comme demandÃ©) */}
          <div className="flex flex-col gap-0.5 p-[7px] flex-grow mt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="menu-item-vercel px-3 py-2.5 rounded-[6px] text-[11px] font-medium no-focus-all no-underline"
              >
                {link.label}
                <span className="opacity-20 text-[9px]">â†—</span>
              </Link>
            ))}
          </div>

          {/* SECTION SIGNATURE & ACTION (Bas de ta capture) */}
          <div className="mt-auto border-t border-border-dual/40 p-[7px] bg-foreground/[0.01]">
            <div className="flex items-center justify-between px-3 py-4 mb-2">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.3em] font-black text-foreground/40">
                  Ivory Coast
                </span>
                <span className="text-[7px] uppercase tracking-[0.1em] text-foreground/20 italic">
                  Data Driven
                </span>
              </div>
              <div className="h-6 w-[1px] bg-border-dual/50 mx-2" />
              <Link
                href="/dashboard"
                className="text-[9px] font-bold text-green-600 dark:text-green-400 uppercase tracking-tighter"
              >
                Pro Status
              </Link>
            </div>

            <Link
              href="/upgrade"
              className="block w-full py-2.5 bg-foreground text-background text-center rounded-[6px] text-[10px] font-bold hover:opacity-90 transition-all no-focus-all active:scale-[0.98]"
            >
              Upgrade to Pro
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
