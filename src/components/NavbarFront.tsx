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

  const navLinks = [
    { href: "/ResumeExecutif", label: "Resume Executif" },
    ...(session
      ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
      : []),
  ];

  return (
    <>
      <style>{`
        @keyframes gradientShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .gradient-border {
          /* Dégradé avec 3 couches de noir aux extrémités, Orange et Vert au centre */
          background: linear-gradient(90deg, 
            #000000 0%, 
            #000000 4%, 
            #000000 8%, 
            #f97316 35%, 
            #22c55e 65%, 
            #000000 92%, 
            #000000 96%, 
            #000000 100%
          );
          background-size: 300% 300%;
          animation: gradientShine 8s ease-in-out infinite;
          height: 1px;
          transition: opacity 1000ms ease-in-out;
        }

        :not(.dark) .navbar-scrolled {
          background-color: rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .dark .navbar-scrolled {
          background-color: rgba(0, 0, 0, 0.6) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-logo-box svg {
          height: 100% !important;
          width: auto !important;
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "navbar-scrolled shadow-sm" : "bg-transparent"}`}
      >
        <div className="flex h-full items-center justify-between px-2 relative">
          {/* GAUCHE : LOGO (3px du bord) */}
          <div className="flex-shrink-0 z-[60] pointer-events-auto">
            <Link
              href="/"
              className="nav-logo-box block h-12 w-24 sm:w-32 ml-[3px] overflow-visible relative"
            >
              <div className="absolute inset-0 scale-[1.3] sm:scale-[1.1] md:scale-100 origin-left flex items-center">
                <TextHoverEffect text="Nonnzytr" />
              </div>
            </Link>
          </div>

          {/* CENTRE : LIENS (Z-INDEX 80 pour cliquabilité garantie) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8 z-[80]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center text-foreground transition-transform duration-200 active:scale-95 hover:scale-110"
              >
                <span className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-tight">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* DROITE : BOUTONS */}
          <div className="flex items-center gap-1 sm:gap-3 z-[60] pr-1 pointer-events-auto">
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

        {/* BORDURE AVEC DÉGRADÉ NOIR-ORANGE-VERT-NOIR */}
        <div
          className={`gradient-border ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
