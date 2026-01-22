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
        
        .navbar-scrolled {
          background-color: var(--color-glass-dual) !important;
          border-bottom: 1px solid var(--color-border-dual);
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 h-16 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "navbar-scrolled shadow-sm" : "bg-transparent"}
        /* EFFET DEMANDÉ : Flou et Scale si la Menubar centrale est survolée */
        has-[.menubar-root:hover]:backdrop-blur-3xl has-[.menubar-root:hover]:scale-[1.02]
        `}
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

          {/* CENTRE : ITEMS DANS UNE BOX (L'élément déclencheur) */}
          <div className="absolute left-1/2 -translate-x-1/2 z-[80]">
            <Menubar className="menubar-root h-auto bg-glass-dual border border-border-dual rounded-[var(--radius)] p-1.5 flex gap-1.5 shadow-2xl transition-all duration-500 hover:border-foreground/30">
              <MenubarMenu>
                <Link href="/ResumeExecutif">
                  <MenubarTrigger className="cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight hover:bg-foreground hover:text-background transition-all duration-300">
                    Résumé Exécutif
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>

              <MenubarMenu>
                <Link href="/logique-metier-serveur">
                  <MenubarTrigger className="cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight hover:bg-foreground hover:text-background transition-all duration-300">
                    Logique Métier & Serveur
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>

              <MenubarMenu>
                <Link href="/zymantra">
                  <MenubarTrigger className="cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight hover:bg-foreground hover:text-background transition-all duration-300">
                    Zymantra
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>

              {session && (
                <MenubarMenu>
                  <Link href="/dashboard">
                    <MenubarTrigger className="cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-tight hover:bg-foreground hover:text-background transition-all duration-300">
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

        <div
          className={`gradient-border ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
