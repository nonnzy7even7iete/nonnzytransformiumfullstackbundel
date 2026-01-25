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

interface MobileMenuProps {
  links: { href: string; label: string }[];
  session: any;
}

// Changé en export default pour correspondre à ton import dans NavbarFront
export default function MobileMenu({ links, session }: MobileMenuProps) {
  return (
    <Sheet>
      <style>{`
        .vercel-font {
          font-family: 'Inter', -apple-system, system-ui, sans-serif !important;
        }

        .glass-nav-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .glass-nav-item {
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          border: 1px solid transparent;
          width: fit-content;
          padding: 10px 16px;
          margin-left: -8px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 8px;
        }
        
        .glass-nav-item:hover {
          background: light-dark(rgba(0, 0, 0, 0.03), rgba(255, 255, 255, 0.06)) !important;
          backdrop-filter: blur(12px) saturate(140%);
          border-color: light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.1));
          transform: translateX(4px);
        }

        @keyframes raad-shine-linear {
          0% { background-position: 250% 0; }
          50%, 100% { background-position: -250% 0; }
        }

        .raad-effect-pro {
          display: inline-block;
          color: light-dark(rgba(0, 0, 0, 0.35), rgba(255, 255, 255, 0.25));
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0) 25%,
            light-dark(rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 1)) 50%,
            rgba(255, 255, 255, 0) 75%,
            transparent 100%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: raad-shine-linear 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .absolute.right-4.top-4.rounded-sm.opacity-70 { display: none !important; }
      `}</style>

      {/* TRIGGER : BURGER */}
      <SheetTrigger className="group flex flex-col items-end gap-[6px] p-2 outline-none border-none bg-transparent cursor-pointer">
        <div className="h-[1.5px] w-6 bg-foreground transition-all duration-300 group-hover:w-4" />
        <div className="h-[1.5px] w-4 bg-foreground transition-all duration-300 group-hover:w-6" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="vercel-font flex flex-col p-0 w-[85%] sm:w-[350px] !bg-white dark:!bg-black border-l border-border outline-none shadow-2xl"
      >
        <div className="flex justify-end p-6">
          <SheetClose className="group outline-none border-none bg-transparent cursor-pointer">
            <div className="h-[1.5px] w-8 bg-foreground/20 group-hover:bg-foreground transition-colors rounded-full" />
          </SheetClose>
        </div>

        <div className="px-8 pb-8 space-y-1">
          <h2 className="text-[16px] font-bold tracking-tight text-foreground uppercase">
            {session?.user?.name || "Invited Node"}
          </h2>
          <p className="text-[13px] text-foreground/40 font-medium truncate">
            {session?.user?.email || "node.guest@ivorycoast.io"}
          </p>
        </div>

        <div className="h-[1px] w-full bg-border/40" />

        <nav className="flex-grow p-[14px] glass-nav-container gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass-nav-item text-[15px] font-semibold text-foreground/80 no-underline group/item"
            >
              {link.label}
              <span className="opacity-0 group-hover/item:opacity-40 transition-opacity text-[11px]">
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* FOOTER : UPGRADED WITH NOISE LOGIC */}
        <div className="mt-auto border-t border-border/40 bg-black/[0.01] dark:bg-white/[0.01] p-6 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="space-y-1">
              <p className="raad-effect-pro text-[11px] font-black uppercase tracking-[0.4em]">
                Ivory Coast
              </p>
              <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/20 italic font-bold block">
                Data Driven Hub
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md">
              <span className="text-[9px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest">
                Active
              </span>
            </div>
          </div>

          {/* LOGIQUE MÉTIER PRÉSERVÉE : UPGRADE TO PRO SOUS NOISEBACKGROUND */}
          <NoiseBackground
            containerClassName="rounded-xl overflow-hidden p-[1px]"
            noiseIntensity={0.2}
            speed={0.05}
          >
            <Link
              href="/upgrade"
              className="flex items-center justify-center w-full py-4 bg-white/90 dark:bg-black/90 text-black dark:text-white backdrop-blur-md rounded-[11px] text-[13px] font-bold hover:bg-transparent hover:text-white transition-all text-center uppercase tracking-tighter"
            >
              Upgrade to Pro
            </Link>
          </NoiseBackground>
        </div>
      </SheetContent>
    </Sheet>
  );
}
