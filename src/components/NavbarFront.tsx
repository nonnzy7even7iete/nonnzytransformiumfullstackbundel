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
    { href: "/ResumeExecutif", label: "Resume" }, // Label raccourci sur mobile
    ...(session
      ? [{ href: "/dashboard", label: "Dash", icon: LayoutDashboard }]
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
        :not(.dark) .navbar-scrolled {
          background-color: rgba(255, 255, 255, 0.75) !important;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px);
        }
        .dark .navbar-scrolled {
          background-color: rgba(0, 0, 0, 0.6) !important;
          backdrop-filter: blur(16px);
        }
        .nav-logo-wrapper svg {
          height: 100% !important;
          width: auto !important;
          display: block;
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "navbar-scrolled shadow-sm" : "bg-transparent"}`}
      >
        <div className="grid grid-cols-3 h-full items-center px-2">
          {/* COLONNE 1 : LOGO (Plus petit sur mobile très étroit) */}
          <div className="flex justify-start items-center overflow-visible">
            <Link
              href="/"
              className="nav-logo-wrapper relative block h-12 w-20 sm:w-32 z-[70]"
              style={{ marginLeft: "3px" }}
            >
              <div className="absolute inset-0 scale-[1.3] xs:scale-[1.5] md:scale-100 origin-left flex items-center">
                <TextHoverEffect text="Nonnzytr" />
              </div>
            </Link>
          </div>

          {/* COLONNE 2 : LIENS (Centrés) */}
          <div className="flex justify-center items-center gap-3 md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center text-foreground z-[70]"
              >
                <span className="text-[10px] md:text-sm font-bold whitespace-nowrap group-hover:text-green-500">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* COLONNE 3 : BOUTONS (Intégrés ici au lieu de fixed) */}
          <div className="flex justify-end items-center gap-2 pr-1">
            <ThemeToggle />
            <button
              onClick={handleToggleClick}
              className="p-1.5 hover:bg-foreground/5 rounded-full z-[70]"
            >
              <IoAppsOutline
                className={`w-5 h-5 text-foreground transition-all ${
                  isButtonAnimating
                    ? "scale-50 opacity-0"
                    : "scale-100 opacity-100"
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
