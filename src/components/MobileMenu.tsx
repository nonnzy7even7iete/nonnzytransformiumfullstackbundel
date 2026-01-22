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

export function MobileMenu({ links, session }: any) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        .vercel-ui {
          font-family: 'Inter', -apple-system, system-ui, sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }

        /* Effet de pression sur les items */
        .item-press:active {
          transform: scale(0.98);
          background-color: rgba(0, 0, 0, 0.05);
        }
        .dark .item-press:active {
          background-color: rgba(255, 255, 255, 0.05);
        }

        /* Masquage propre de la croix par défaut */
        [data-radix-collection-item] svg { display: none !important; }
      `}</style>

      <Sheet>
        {/* TRIGGER : Minimalisme pur */}
        <SheetTrigger className="group flex flex-col items-end gap-[4px] p-2 focus:outline-none">
          <div className="h-[1px] w-5 bg-foreground transition-all duration-300 group-hover:w-3" />
          <div className="h-[1px] w-3 bg-foreground transition-all duration-300 group-hover:w-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="vercel-ui !p-0 !bg-[#FFFFFF] dark:!bg-[#000000] border-l border-border-dual w-[80%] sm:w-[300px] flex flex-col no-focus-all shadow-[0_0_40px_rgba(0,0,0,0.1)]"
        >
          {/* CLOSE BUTTON : Cercle parfait 1px */}
          <SheetClose className="absolute right-3 top-3 w-8 h-8 rounded-full border border-black/[0.08] dark:border-white/[0.1] flex items-center justify-center hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all outline-none">
            <div className="h-[1px] w-3 bg-foreground/50" />
          </SheetClose>

          {/* USER SECTION : Hiérarchie visuelle forte */}
          <div className="px-5 pt-12 pb-5 border-b border-black/[0.05] dark:border-white/[0.05]">
            <h2 className="text-[12px] font-semibold tracking-tight text-black dark:text-white leading-none">
              {session?.user?.name || "nonnzytransformium-4464"}
            </h2>
            <p className="text-[10px] text-black/45 dark:text-white/45 font-medium mt-1.5">
              {session?.user?.email || "nonnzytransformium@gmail.com"}
            </p>
          </div>

          {/* NAV : Padding 7px & Micro-interactions */}
          <nav className="flex flex-col gap-[2px] p-[7px] flex-grow">
            {links.map((link: any) => (
              <Link
                key={link.href}
                href={link.href}
                className="item-press flex items-center justify-between px-3 py-2 rounded-[6px] text-[11px] font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors no-underline"
              >
                {link.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-20"
                >
                  <path
                    d="M4.5 3L7.5 6L4.5 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </nav>

          {/* FOOTER : Ivory Coast | Data Driven */}
          <div className="mt-auto bg-black/[0.01] dark:bg-white/[0.01] border-t border-black/[0.05] dark:border-white/[0.05] p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="space-y-0.5">
                <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                  Ivory Coast
                </span>
                <span className="block text-[7px] font-medium uppercase tracking-[0.1em] text-black/20 dark:text-white/20 italic">
                  Data Driven
                </span>
              </div>
              <div className="px-2 py-0.5 rounded-full border border-green-500/20 bg-green-500/5">
                <span className="text-[8px] font-bold text-green-600 dark:text-green-500 uppercase tracking-tighter">
                  Pro
                </span>
              </div>
            </div>

            <Link
              href="/upgrade"
              className="block w-full py-2.5 bg-black dark:bg-white text-white dark:text-black text-center rounded-[6px] text-[11px] font-bold hover:opacity-90 active:scale-[0.98] transition-all tracking-tight shadow-lg shadow-black/10 dark:shadow-white/5"
            >
              Upgrade to Pro
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
