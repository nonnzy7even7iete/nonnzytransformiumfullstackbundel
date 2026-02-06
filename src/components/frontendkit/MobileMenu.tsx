"use client";

import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NoiseBackground } from "@/components/frontendkit/NoiseBackground";

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
        className="flex flex-col p-0 w-[85%] sm:w-[350px] bg-background border-l border-border-dual outline-none shadow-2xl transition-colors duration-500 rounded-none"
      >
        {/* Header */}
        <div className="flex justify-end p-6">
          <SheetClose className="group outline-none border-none bg-transparent cursor-pointer">
            <div className="h-[1.5px] w-8 bg-foreground/20 group-hover:bg-foreground transition-colors" />
          </SheetClose>
        </div>

        <div className="px-8 pb-8 space-y-1">
          <h2 className="text-[18px] font-black italic tracking-tighter text-foreground uppercase">
            {session?.user?.name || "Global Node"}
          </h2>
          <p className="text-[12px] text-foreground/40 font-mono font-medium truncate">
            {session?.user?.email || "secure.connection@ivorycoast.io"}
          </p>
        </div>

        <div className="h-[1px] w-full bg-border-dual opacity-50" />

        {/* Nav - Adapté au Design System Radius 2px */}
        <nav className="flex-grow p-[14px] flex flex-col items-start gap-1">
          {links.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass-nav-item w-full text-[14px] font-black uppercase tracking-tight text-foreground/70 hover:text-foreground group/item"
            >
              {link.label}{" "}
              <span className="opacity-0 group-hover/item:opacity-100 transition-opacity ml-1">
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer avec Respiration */}
        <div className="mt-auto border-t border-border-dual bg-foreground/[0.02] p-6 pt-8 space-y-10">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-2">
              <p className="raad-effect-pro text-[11px] font-black uppercase tracking-[0.4em]">
                Ivory Coast
              </p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/20 italic font-bold leading-none">
                Data Hub Terminal
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-green-500/5 border border-green-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest">
                Active
              </span>
            </div>
          </div>

          <NoiseBackground
            duration={12}
            containerClassName="rounded-[2px] shadow-2xl border border-border-dual"
            className="p-0"
          >
            <Link
              href="/upgrade"
              className="flex items-center justify-center w-full py-4 bg-transparent text-foreground text-[13px] font-black uppercase tracking-[0.1em] rounded-[inherit] transition-all hover:bg-foreground/5 active:scale-[0.98]"
            >
              Upgrade to Pro
            </Link>
          </NoiseBackground>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const StaticMobileStyles = `
  .glass-nav-item {
    transition: all 0.3s ease;
    border: 1px solid transparent; 
    padding: 12px 16px;
    display: flex; 
    align-items: center; 
    gap: 12px; 
    border-radius: 2px !important;
  }
  .glass-nav-item:hover {
    background: var(--glass-bg);
    border-color: var(--glass-border);
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
  [data-state="open"] > .absolute.right-4.top-4 { display: none !important; }
`;
