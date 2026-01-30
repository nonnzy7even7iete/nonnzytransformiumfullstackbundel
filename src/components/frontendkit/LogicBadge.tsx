"use client";

import React from "react";
import { Brain, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const LogicBadge = ({ text }: { text: string }) => (
  <div className="group relative flex items-center justify-center rounded-[2px] border border-green-500/30 bg-black/40 px-6 py-3 transition-all duration-300 hover:border-green-500/60 overflow-hidden cursor-pointer">
    {/* Scanner Laser Industriel */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-0 w-full h-[1px] bg-green-500/20 animate-scan-slow shadow-[0_0_8px_rgba(34,197,94,0.2)]" />
    </div>

    <Brain className="size-5 mr-3 text-green-500/70" />
    <hr className="mx-3 h-4 w-px bg-green-500/20" />

    <span className="font-oswald font-black uppercase tracking-tighter text-xl md:text-2xl text-green-500 leading-none">
      {text}
    </span>

    <ChevronRight className="ml-3 size-4 text-neutral-500 transition-transform group-hover:translate-x-1" />

    <style jsx>{`
      @keyframes scan-slow {
        0% {
          top: -10%;
        }
        100% {
          top: 110%;
        }
      }
      .animate-scan-slow {
        animation: scan-slow 6s linear infinite;
      }
    `}</style>
  </div>
);

export default LogicBadge;
