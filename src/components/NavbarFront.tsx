"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";
import { IoAppsOutline } from "react-icons/io5";
import { ThemeToggle } from "@/components/ui/themeToggle";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const { data: session } = useSession();

  // Logique de la bordure animée cyclique
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
    { href: "/ResumeExecutif", label: "Resume executif" },
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
          background: linear-gradient(90deg, #ef4444, #22c55e, #3b82f6, #e4d60eff);
          background-size: 200% 200%;
          animation: gradientShine 7s ease-in-out infinite;
          height: 1px;
          transition: opacity 1000ms ease-in-out;
        }
        /* Glassmorphism LIGHT */
        :not(.dark) .navbar-scrolled {
          background-color: rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        /* Glassmorphism DARK */
        .dark .navbar-scrolled {
          background-color: rgba(0, 0, 0, 0.6) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "navbar-scrolled shadow-sm" : "bg-transparent"}`}
      >
        <div className="flex h-full items-center justify-between px-4 md:px-8">
          {/* GAUCHE : Vide (pour garder les liens centrés) */}
          <div className="w-20 md:w-32 hidden sm:block" />

          {/* CENTRE : LIENS DE NAVIGATION */}
          <div className="flex items-center gap-6 md:gap-12">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center text-foreground transition-transform hover:scale-105"
                >
                  {IconComponent && (
                    <IconComponent className="w-4 h-4 mb-1 group-hover:text-green-500" />
                  )}
                  <span className="text-xs md:text-sm font-bold whitespace-nowrap group-hover:text-green-500 uppercase tracking-wider">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* DROITE : BOUTONS DE CONTRÔLE */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleToggleClick}
              className="p-2 hover:bg-foreground/10 rounded-full transition-colors"
            >
              <IoAppsOutline
                className={`w-6 h-6 text-foreground transition-all duration-300 ${
                  isButtonAnimating
                    ? "scale-50 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bordure animée cyclique */}
        <div
          className={`gradient-border ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
