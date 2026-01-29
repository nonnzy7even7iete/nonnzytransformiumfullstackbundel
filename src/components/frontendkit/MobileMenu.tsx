"use client";

import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NoiseBackground } from "@/components/NoiseBackground";

export default function MobileMenu({ links, session }: any) {
  return (
    <Sheet>
      <style>{StaticMobileStyles}</style>

      <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 outline-none border-none bg-transparent cursor-pointer">
        <div className="h-[1.5px] w-6 bg-foreground transition-all duration-300 group-hover:w-4" />
        <div className="h-[1.5px] w-4 bg-foreground transition-all duration-300 group-hover:w-6" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="vercel-font flex flex-col p-0 w-[85%] sm:w-[350px] !bg-white dark:!bg-[#020408] border-l border-border/10 outline-none shadow-2xl transition-colors duration-500"
      >
        {/* Header */}
        <div className="flex justify-end p-6">
          <SheetClose className="group outline-none border-none bg-transparent cursor-pointer">
            <div className="h-[1.5px] w-8 bg-foreground/20 group-hover:bg-foreground transition-colors rounded-full" />
          </SheetClose>
        </div>

        <div className="px-8 pb-8 space-y-1">
          <h2 className="text-[18px] font-black italic tracking-tighter text-foreground uppercase">
            {session?.user?.name || "Global Node"}
          </h2>
          <p className="text-[12px] text-foreground/30 font-mono font-medium truncate">
            {session?.user?.email || "secure.connection@ivorycoast.io"}
          </p>
        </div>

        <div className="h-[1px] w-full bg-border/5" />

        {/* Nav */}
        <nav className="flex-grow p-[14px] glass-nav-container gap-1">
          {links.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass-nav-item text-[14px] font-bold uppercase tracking-tight text-foreground/70 group/item"
            >
              {link.label}{" "}
              <span className="opacity-0 group-hover/item:opacity-40 transition-opacity ml-1">
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer avec Respiration */}
        <div className="mt-auto border-t border-border/5 bg-black/[0.01] dark:bg-white/[0.01] p-6 pt-8 space-y-10">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-2">
              <p className="raad-effect-pro text-[11px] font-black uppercase tracking-[0.4em]">
                Ivory Coast
              </p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/20 italic font-bold leading-none">
                Data Hub Terminal
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest">
                Active
              </span>
            </div>
          </div>

          <NoiseBackground
            duration={12}
            containerClassName="rounded-2xl shadow-2xl"
            className="p-0"
          >
            <Link
              href="/upgrade"
              className="flex items-center justify-center w-full py-4 bg-transparent text-black dark:text-white text-[13px] font-black uppercase tracking-[0.1em] rounded-[inherit] transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]"
            >
              Upgrade to Pro
            </Link>
          </NoiseBackground>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// STYLES DÉPORTÉS EN BAS DE FICHIER (DISCIPLINE)
const StaticMobileStyles = `
  .vercel-font { font-family: 'Inter', -apple-system, sans-serif !important; }
  .glass-nav-container { display: flex; flex-direction: column; align-items: flex-start; }
  .glass-nav-item {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    border: 1px solid transparent; width: fit-content; padding: 10px 16px;
    margin-left: -8px; display: flex; align-items: center; gap: 12px; border-radius: 8px;
  }
  .glass-nav-item:hover {
    background: rgba(120, 120, 120, 0.05);
    backdrop-filter: blur(12px) saturate(140%);
    transform: translateX(4px);
  }
  @keyframes raad-shine-linear {
    0% { background-position: 250% 0; }
    50%, 100% { background-position: -250% 0; }
  }
  .raad-effect-pro {
    display: inline-block;
    color: rgba(120, 120, 120, 0.4);
    background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0) 25%, #888 50%, rgba(255, 255, 255, 0) 75%, transparent 100%);
    background-size: 250% 100%;
    -webkit-background-clip: text; background-clip: text;
    animation: raad-shine-linear 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .absolute.right-4.top-4.rounded-sm.opacity-70 { display: none !important; }
`;
