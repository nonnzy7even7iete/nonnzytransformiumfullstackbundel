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
  const [showBorder, setShowBorder] = useState(false);
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
        .navbar-glass-light {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .navbar-glass-dark {
          background: rgba(0, 0, 0, 0.5) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        /* Pour s'assurer que le SVG du logo ne dépasse pas */
        .logo-container svg {
          height: 100% !important;
          width: auto !important;
        }
      `}</style>

      {/* Boutons en haut à droite */}
      <div className="fixed right-3 top-3 z-[100] flex items-center gap-3">
        <ThemeToggle />
        <button onClick={handleToggleClick} className="text-foreground">
          <IoAppsOutline
            className={`w-6 h-6 transition-all ${
              isButtonAnimating ? "scale-50" : "scale-100"
            }`}
          />
        </button>
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${
          isScrolled
            ? "dark:navbar-glass-dark navbar-glass-light shadow-md"
            : "bg-transparent"
        }
        `}
      >
        {/* Layout en 3 colonnes pour éviter les chevauchements de clics */}
        <div className="grid grid-cols-3 h-full items-center px-1 md:px-4">
          {/* COLONNE 1 : LOGO */}
          <div className="flex justify-start items-center">
            <Link
              href="/"
              className="logo-container relative block h-14 w-32 sm:w-40 ml-[3px] z-[60]"
              style={{ cursor: "pointer" }}
            >
              <div className="absolute inset-0 scale-[1.8] sm:scale-[1.5] md:scale-100 origin-left flex items-center">
                <TextHoverEffect text="Nonnzytr" />
              </div>
            </Link>
          </div>

          {/* COLONNE 2 : LIENS CENTRÉS */}
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center text-foreground z-[60]"
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

          {/* COLONNE 3 : VIDE (Équilibre) */}
          <div className="flex justify-end pr-12">
            {/* Espace réservé pour ne pas gêner les boutons fixés */}
          </div>
        </div>

        {/* Bordure animée en bas */}
        <div
          className={`h-[1px] w-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 transition-opacity duration-1000 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
