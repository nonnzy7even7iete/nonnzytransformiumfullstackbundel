"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed inset-x-0 
        ${isOpen ? "top-0" : "-top-20"} 
        z-50 flex items-center justify-between
        transition-all duration-500

        bg-black/20 backdrop-blur-xl
        border-b border-white/10

        ${isScrolled ? "backdrop-blur-2xl bg-black/30 border-white/20" : ""}
        
        md:top-0
        md:h-16
      `}
    >
      {/* LEFT — Brand + Toggle */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Toggle (petit) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 opacity-70 hover:opacity-100 transition-all"
        >
          <Menu className="w-4 h-4 text-white" />
        </button>

        {/* Brand */}
        <Link href="/" className="font-bold text-lg tracking-wide">
          <span
            className="
              bg-gradient-to-r from-green-400 via-green-300 to-blue-700 
              bg-clip-text text-transparent
            "
          >
            Nonntr
          </span>
        </Link>
      </div>

      {/* CENTER — Navigation links */}
      <div className="flex items-center gap-6 px-4">
        {/* Résumé Exécutif */}
        <Link
          href="/ResumeExecutif"
          className="
            text-white/80 text-sm font-light 
            transition-all
            py-2 px-4 rounded-xl
            hover:text-white
            hover:bg-gradient-to-r 
            hover:from-green-400/20 hover:to-blue-400/20
            hover:backdrop-blur-2xl
          "
        >
          Résumé Exécutif
        </Link>

        {/* Dashboard si connecté */}
        {session && (
          <Link
            href="/dashboard"
            className="
              text-white/80 text-sm font-light 
              transition-all
              py-2 px-4 rounded-xl
              hover:text-white
              hover:bg-gradient-to-r 
              hover:from-green-400/20 hover:to-blue-400/20
              hover:backdrop-blur-2xl
            "
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
