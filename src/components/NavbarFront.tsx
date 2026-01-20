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
          background: linear-gradient(90deg, #ef4444, #22c55e, #3b82f6, #e4d60eff);
          background-size: 200% 200%;
          animation: gradientShine 7s ease-in-out infinite;
          height: 1px;
          transition: opacity 1000ms ease-in-out;
        }
        .navbar-glass-light {
          background: rgba(255, 255, 255, 0.6) !important;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        .navbar-glass-dark {
          background: rgba(0, 0, 0, 0.4) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
      `}</style>

      <div className="fixed right-3 top-3 z-[60] flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={handleToggleClick}
          className={`transition-all duration-500 ${
            isButtonAnimating ? "opacity-0 scale-50" : "opacity-100 scale-100"
          }`}
        >
          <IoAppsOutline className="w-6 h-6 text-foreground hover:scale-110" />
        </button>
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
        ${
          isScrolled
            ? "dark:navbar-glass-dark navbar-glass-light shadow-sm"
            : "bg-transparent"
        }
        `}
      >
        <div className="h-full flex items-center justify-between px-1 md:px-4 relative">
          {/* LOGO : Correction cliquabilité et visibilité */}
          <Link
            href="/"
            className="relative z-[70] ml-[3px] w-24 sm:w-28 md:w-36 h-full flex items-center overflow-visible"
            style={{ pointerEvents: "auto" }}
          >
            <div className="scale-[1.4] sm:scale-125 md:scale-100 origin-left transition-transform w-full h-12">
              <TextHoverEffect text="Nonnzytr" />
            </div>
          </Link>

          {/* LIENS : pointer-events-none sur le parent pour laisser cliquer le logo dessous si besoin */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-10 z-[60] pointer-events-none">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isResume = link.href === "/ResumeExecutif";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center relative text-foreground transition-all duration-300 pointer-events-auto"
                >
                  {!isResume && IconComponent && (
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 group-hover:text-green-500" />
                  )}
                  <span
                    className={`mt-0.5 text-[10px] md:text-sm whitespace-nowrap ${
                      isResume
                        ? "font-bold"
                        : "font-medium group-hover:text-green-500"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Équilibre */}
          <div className="w-10 md:w-36" />
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
