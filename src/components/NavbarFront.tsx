"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";
import { IoAppsOutline } from "react-icons/io5";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const { data: session } = useSession();

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

  const navLinks = [
    { href: "/ResumeExecutif", label: "Resume Executif" },
    ...(session
      ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
      : []),
  ];

  return (
    <>
      <style>{`
        /* Glassmorphism LIGHT : Uniquement quand la classe .dark n'est pas là */
        :not(.dark) .navbar-scrolled {
          background-color: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        /* Glassmorphism DARK : Quand la classe .dark est active */
        .dark .navbar-scrolled {
          background-color: rgba(0, 0, 0, 0.5) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Sécurité pour le SVG du logo dans la navbar uniquement */
        .nav-logo-wrapper svg {
          height: 100% !important;
          width: auto !important;
          display: block;
        }
      `}</style>

      {/* Boutons contrôles */}
      <div className="fixed right-3 top-3 z-[100] flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={handleToggleClick}
          className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
        >
          <IoAppsOutline
            className={`w-6 h-6 text-foreground transition-all duration-300 ${
              isButtonAnimating ? "scale-50 opacity-0" : "scale-100 opacity-100"
            }`}
          />
        </button>
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "navbar-scrolled shadow-sm" : "bg-transparent"}
        `}
      >
        <div className="grid grid-cols-3 h-full items-center px-1 md:px-4 relative">
          {/* COLONNE 1 : LOGO (ISOLÉ ET SÉCURISÉ) */}
          <div className="flex justify-start items-center h-full">
            <Link
              href="/"
              className="nav-logo-wrapper relative block h-14 w-28 sm:w-36 z-[70] overflow-visible"
              style={{ marginLeft: "3px" }}
            >
              <div className="absolute inset-0 scale-[1.7] sm:scale-[1.4] md:scale-100 origin-left flex items-center">
                <TextHoverEffect text="Nonnzytr" />
              </div>
            </Link>
          </div>

          {/* COLONNE 2 : NAVIGATION (CENTRÉE) */}
          <div className="flex justify-center items-center gap-4 md:gap-10">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center text-foreground z-[70] transition-transform hover:scale-105"
                >
                  {IconComponent && (
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 group-hover:text-green-500" />
                  )}
                  <span className="text-[10px] md:text-sm font-bold whitespace-nowrap group-hover:text-green-500">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* COLONNE 3 : ESPACE DROIT (ÉQUILIBRE) */}
          <div className="flex justify-end pr-10 pointer-events-none" />
        </div>

        {/* Bordure de scroll discrète */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
        )}
      </nav>
    </>
  );
}
