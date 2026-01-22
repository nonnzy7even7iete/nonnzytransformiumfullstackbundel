"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LayoutDashboard, Info, FileText, Share2, Monitor } from "lucide-react";
import { IoAppsOutline } from "react-icons/io5";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";

// Import des composants shadcn que nous avons stylisés en "Glass"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";

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
        :not(.dark) .navbar-scrolled {
          background-color: rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .dark .navbar-scrolled {
          background-color: rgba(0, 0, 0, 0.6) !important;
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "navbar-scrolled shadow-sm" : "bg-transparent"}`}
      >
        <div className="flex h-full items-center justify-between px-2 relative">
          {/* GAUCHE : LOGO */}
          <div className="flex-shrink-0 z-[60]">
            <Link
              href="/"
              className="block h-12 w-24 sm:w-32 ml-[3px] relative"
            >
              <div className="absolute inset-0 scale-[1.3] sm:scale-[1.1] md:scale-100 origin-left flex items-center">
                <TextHoverEffect text="Nonnzytr" />
              </div>
            </Link>
          </div>

          {/* CENTRE : MENUBAR SHADCN (Logique conservée et étendue) */}
          <div className="absolute left-1/2 -translate-x-1/2 z-[80]">
            <Menubar className="bg-transparent border-none shadow-none gap-2">
              {/* Menu Résumé */}
              <MenubarMenu>
                <MenubarTrigger className="font-bold uppercase tracking-tight text-[11px] sm:text-xs cursor-pointer hover:scale-105 transition-transform">
                  Resume
                </MenubarTrigger>
                <MenubarContent>
                  <Link href="/ResumeExecutif">
                    <MenubarItem className="cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" /> Exécutif
                    </MenubarItem>
                  </Link>
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger>Partager</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <Share2 className="mr-2 h-4 w-4" /> Email Link
                      </MenubarItem>
                      <MenubarItem>Copy Link</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              {/* Menu Dashboard (Conditionnel) */}
              {session && (
                <MenubarMenu>
                  <MenubarTrigger className="font-bold uppercase tracking-tight text-[11px] sm:text-xs cursor-pointer hover:scale-105 transition-transform">
                    Workspace
                  </MenubarTrigger>
                  <MenubarContent>
                    <Link href="/dashboard">
                      <MenubarItem className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </MenubarItem>
                    </Link>
                    <MenubarItem>
                      <Monitor className="mr-2 h-4 w-4" /> Workflow
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              )}

              <MenubarMenu>
                <MenubarTrigger className="font-bold uppercase tracking-tight text-[11px] sm:text-xs cursor-pointer">
                  <Info className="h-4 w-4" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem disabled>Version 1.0.4</MenubarItem>
                  <MenubarItem>Support</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          {/* DROITE : BOUTONS */}
          <div className="flex items-center gap-1 sm:gap-3 z-[60] pr-1">
            <ThemeToggle />
            <button
              onClick={handleToggleClick}
              className="p-1.5 hover:bg-foreground/10 rounded-full transition-colors"
            >
              <IoAppsOutline
                className={`w-5 h-5 sm:w-6 sm:h-6 text-foreground transition-all duration-300 ${
                  isButtonAnimating
                    ? "scale-50 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              />
            </button>
          </div>
        </div>

        {/* TA BORDURE ANIMÉE CONSERVÉE */}
        <div
          className={`gradient-border ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
