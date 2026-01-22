"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { IoAppsOutline } from "react-icons/io5";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const { data: session } = useSession();

  // Logique de bordure animée conservée
  useEffect(() => {
    const cycle = () => {
      setShowBorder(false);
      setTimeout(() => {
        setShowBorder(true);
        setTimeout(() => setShowBorder(false), 5000);
      }, 7000);
    };
    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, []);

  // Logique de scroll conservée
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleClick = () => {
    setIsVisible(!isVisible);
    setIsButtonAnimating(true);
    setTimeout(() => setIsButtonAnimating(false), 500);
  };

  return (
    <>
      <style>{`
        @keyframes pulseCenter {
          0%, 100% { background-size: 80% 100%; }
          50% { background-size: 130% 100%; }
        }
        .gradient-border {
          background-color: #000;
          background-image: radial-gradient(circle at center, #22c55e 0%, #f97316 40%, #000000 75%, #000000 100%);
          background-repeat: no-repeat;
          background-position: center;
          animation: pulseCenter 6s ease-in-out infinite;
          height: 1px; width: 100%;
          transition: opacity 1000ms ease-in-out;
        }
        
        /* Application de ta logique Light/Dark stricte */
        .navbar-container {
          transition: all 500ms ease;
        }

        .navbar-scrolled {
          background-color: var(--color-glass-dual) !important;
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--color-border-dual);
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 navbar-container ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "navbar-scrolled shadow-sm" : "bg-transparent"}`}
      >
        <div className="flex h-full items-center justify-between px-4 relative">
          {/* GAUCHE : LOGO */}
          <div className="flex-shrink-0 z-[60]">
            <Link href="/" className="block h-12 w-24 sm:w-32 relative">
              <div className="absolute inset-0 scale-[1.1] md:scale-100 origin-left flex items-center">
                <TextHoverEffect text="Nonnzytr" />
              </div>
            </Link>
          </div>

          {/* CENTRE : ITEMS DANS UN MÊME BOX AVEC BORDURES INDIVIDUELLES */}
          <div className="absolute left-1/2 -translate-x-1/2 z-[80]">
            <Menubar className="h-auto bg-glass-dual border border-border-dual rounded-[var(--radius)] p-1.5 flex gap-1.5 shadow-2xl backdrop-blur-xl">
              {/* ITEM 1 : RÉSUMÉ EXÉCUTIF */}
              <MenubarMenu>
                <Link href="/ResumeExecutif">
                  <MenubarTrigger className="cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight hover:bg-foreground/5 transition-all">
                    Résumé Exécutif
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>

              {/* ITEM 2 : LOGIQUE MÉTIER & SERVEUR */}
              <MenubarMenu>
                <Link href="/logique-metier-serveur">
                  <MenubarTrigger className="cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight hover:bg-foreground/5 transition-all">
                    Logique Métier & Serveur
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>

              {/* ITEM 3 : ZYMANTRA */}
              <MenubarMenu>
                <Link href="/zymantra">
                  <MenubarTrigger className="cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight hover:bg-foreground/5 transition-all">
                    Zymantra
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>

              {/* ITEM OPTIONNEL : DASHBOARD */}
              {session && (
                <MenubarMenu>
                  <Link href="/dashboard">
                    <MenubarTrigger className="cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight hover:bg-foreground/5 transition-all text-green-500/80">
                      Dashboard
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              )}
            </Menubar>
          </div>

          {/* DROITE : THEME & APPS */}
          <div className="flex items-center gap-2 z-[60]">
            <ThemeToggle />
            <button
              onClick={handleToggleClick}
              className="p-1.5 hover:bg-foreground/10 rounded-full transition-colors"
            >
              <IoAppsOutline
                className={`w-5 h-5 text-foreground transition-all duration-300 ${
                  isButtonAnimating ? "scale-0" : "scale-100"
                }`}
              />
            </button>
          </div>
        </div>

        {/* BORDURE ANIMÉE */}
        <div
          className={`gradient-border ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
