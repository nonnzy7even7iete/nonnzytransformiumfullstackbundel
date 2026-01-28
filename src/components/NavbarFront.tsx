"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import MobileMenu from "@/components/MobileMenu";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBorder, setShowBorder] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Gestion de la visibilité au scroll (Hide on scroll down)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const navLinks = [
    { href: "/ResumeExecutif", label: "Résumé Exécutif" },
    { href: "/logique-metier-serveur", label: "Logique Métier & Serveur" },
    { href: "/zymantra", label: "Zymantra" },
  ];

  return (
    <>
      <style>{`
        .smoke-hover {
          position: relative;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid transparent !important;
        }

        .smoke-hover:hover {
          border-color: rgba(34, 197, 94, 0.4) !important; /* Rappel du vert Aurora */
          background: rgba(255, 255, 255, 0.03) !important;
          backdrop-filter: blur(10px);
          transform: translateY(-1px);
        }

        .gradient-border {
          background: linear-gradient(90deg, transparent, #22c55e, #f97316, transparent);
          height: 1px; 
          width: 100%;
          transition: opacity 1.5s ease-in-out;
        }

        *:focus { outline: none !important; }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 h-20 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-black border-b border-transparent"
        }`}
      >
        <div className="flex w-full h-full items-center px-8 relative">
          {/* LOGO */}
          <div className="flex items-center w-48 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* MENU CENTRAL */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="h-12 bg-black/40 border border-white/10 rounded-full px-2 gap-1 backdrop-blur-md">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="smoke-hover cursor-pointer rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-white transition-all">
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTIONS DROITE */}
          <div className="w-48 flex justify-end items-center gap-6 z-[60]">
            <ThemeToggle />
            <div className="md:hidden">
              <MobileMenu links={navLinks} session={session} />
            </div>
          </div>
        </div>

        {/* LIGNE DE SCINTILLEMENT SOUS LA NAV */}
        <div
          className={`absolute bottom-0 gradient-border ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
