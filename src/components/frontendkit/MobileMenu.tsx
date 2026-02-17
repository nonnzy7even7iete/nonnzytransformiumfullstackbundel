"use client";

import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { NoiseBackground } from "@/components/frontendkit/NoiseBackground";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavLink[];
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  links,
  session,
  isOpen,
  onClose,
}: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        // Suppression du shadow, ajout du backdrop-blur et border-l réactif
        className="flex flex-col p-0 w-[85%] sm:w-[350px] bg-[var(--background)]/80 backdrop-blur-2xl border-l border-[var(--border-color)] outline-none transition-all duration-500 rounded-none z-[150] [&>button]:hidden shadow-none"
      >
        {/* BOUTON FERMETURE : Trait dynamique Noir/Blanc */}
        <div className="flex justify-end p-6 pt-10">
          <SheetClose className="group outline-none border-none bg-transparent cursor-pointer pr-4 focus:ring-0">
            <div
              className="h-[1.5px] w-8 opacity-40 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: "var(--foreground)" }}
            />
          </SheetClose>
        </div>

        {/* PROFIL */}
        <div className="px-8 pb-8 space-y-1">
          <h2 className="text-[18px] font-black italic tracking-tighter text-[var(--foreground)] uppercase">
            {session?.user?.name || "Global Node"}
          </h2>
          <p className="text-[12px] text-[var(--foreground)]/40 font-mono font-medium truncate">
            {session?.user?.email || "secure.connection@ivorycoast.io"}
          </p>
        </div>

        <div className="h-[1px] w-full bg-[var(--border-color)] opacity-50" />

        {/* NAVIGATION */}
        <nav className="flex-grow p-[14px] flex flex-col items-start gap-1">
          {links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="w-full text-[14px] font-black uppercase tracking-tight text-[var(--foreground)]/70 hover:text-[var(--foreground)] group/item flex items-center gap-2 px-4 py-3 transition-all hover:translate-x-1"
              style={{ borderRadius: "var(--radius-vercel)" }}
            >
              {link.label}
              <span className="opacity-0 group-hover/item:opacity-100 transition-opacity ml-2">
                -&gt;
              </span>
            </Link>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto border-t border-[var(--border-color)] bg-[var(--foreground)]/[0.02] p-6 pt-8 space-y-10">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-2">
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--foreground)]/60">
                Ivory Coast
              </p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--foreground)]/20 italic font-bold leading-none">
                Data Hub Terminal
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-green-500/5 border border-green-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">
                Active
              </span>
            </div>
          </div>

          <NoiseBackground
            duration={12}
            containerClassName="rounded-[14px] shadow-2xl border border-[var(--border-color)]"
            className="p-0"
          >
            <Link
              href="/upgrade"
              className="flex items-center justify-center w-full py-4 bg-transparent text-[var(--foreground)] text-[13px] font-black uppercase tracking-[0.1em] rounded-[inherit] transition-all hover:bg-[var(--foreground)]/5 active:scale-[0.98]"
            >
              Upgrade to Pro
            </Link>
          </NoiseBackground>
        </div>
      </SheetContent>
    </Sheet>
  );
}
