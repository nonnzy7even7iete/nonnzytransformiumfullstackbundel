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
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  session: any;
}

export function MobileMenu({ links, session }: MobileMenuProps) {
  return (
    <Sheet>
      <style>{`
        /* Suppression de la croix par défaut Shadcn pour notre trait */
        .absolute.right-4.top-4.rounded-sm.opacity-70.ring-offset-background {
          display: none !important;
        }
        
        .nav-item-focus:active {
          background-color: hsl(var(--accent));
          transform: scale(0.98);
        }
      `}</style>

      {/* TRIGGER : BURGER 2 LIGNES */}
      <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 outline-none">
        <div className="h-[1.5px] w-6 bg-foreground transition-all group-hover:w-4" />
        <div className="h-[1.5px] w-4 bg-foreground transition-all group-hover:w-6" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col p-0 w-[85%] sm:w-[350px] !bg-white dark:!bg-black border-l border-border"
      >
        {/* BOUTON FERMETURE : LE TRAIT (SHADCN LOGIC) */}
        <div className="flex justify-end p-6">
          <SheetClose className="group outline-none">
            <div className="h-[1.5px] w-8 bg-foreground/20 group-hover:bg-foreground transition-colors rounded-full" />
          </SheetClose>
        </div>

        {/* IDENTITY SECTION */}
        <div className="px-7 pb-6 space-y-1">
          <h2 className="text-[14px] font-semibold tracking-tight">
            {session?.user?.name || "nonnzytransformium-4464"}
          </h2>
          <p className="text-[12px] text-muted-foreground font-medium">
            {session?.user?.email || "nonnzytransformium@gmail.com"}
          </p>
        </div>

        <Separator className="bg-border/50" />

        {/* NAVIGATION : TAILLES AJUSTÉES (SHADCN COMPONENTS) */}
        <nav className="flex-grow p-[10px] flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-item-focus flex items-center justify-between px-4 py-3 rounded-md text-[13px] font-medium transition-colors hover:bg-accent no-underline"
            >
              {link.label}
              <span className="opacity-30 text-[10px]">→</span>
            </Link>
          ))}
        </nav>

        {/* FOOTER : IVORY COAST & PRO STATUS */}
        <div className="mt-auto border-t border-border/50 bg-accent/20 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">
                Ivory Coast
              </p>
              <p className="text-[8px] uppercase tracking-[0.1em] text-muted-foreground italic">
                Data Driven
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="text-[9px] font-bold text-green-600 dark:text-green-400 uppercase">
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
