"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";
import { IoAppsOutline } from "react-icons/io5";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle"; // Chemin corrigé
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
        setTimeout(() => {
          setShowBorder(false);
        }, 5000);
      }, 7000);
    };

    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleClick = () => {
    setIsVisible(!isVisible);
    setIsButtonAnimating(true);
    setTimeout(() => {
      setIsButtonAnimating(false);
    }, 500);
  };

  const navLinks = [
    { href: "/ResumeExecutif", label: "RÃ©sumÃ© ExÃ©cutif" },
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
          box-shadow: 0px 1px 12px rgba(34, 197, 94, 0.5);
          transition: opacity 1000ms ease-in-out;
        }

        .navbar-glow {
          box-shadow: 0px 10px 30px -10px rgba(34, 197, 94, 0.2);
          transition: box-shadow 1000ms ease-in-out;
        }
      `}</style>

      {/* Groupe de boutons en haut à droite */}
      <div className="fixed right-3 top-3 z-50 flex items-center gap-3">
        <ThemeToggle /> {/* Le bouton Dark/Light s'insère ici */}
        <button
          onClick={handleToggleClick}
          className={`transition-all duration-500 ${
            isButtonAnimating ? "opacity-0 scale-50" : "opacity-100 scale-100"
          }`}
        >
          <IoAppsOutline className="w-6 h-6 text-white hover:scale-110" />
        </button>
      </div>

      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-1000
        ${
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        ${
          isScrolled
            ? "bg-black/70 backdrop-blur-sm"
            : "bg-black/50 backdrop-blur-lg"
        }
        ${
          showBorder
            ? "navbar-glow border-b border-white/5"
            : "border-b border-transparent"
        }
        h-16`}
      >
        <div className="h-full flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex-shrink-0 w-20">
            <div className="scale-100 origin-left hover:opacity-80 transition-opacity duration-300">
              <TextHoverEffect text="Nonnzytr" />
            </div>
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center gap-8 md:gap-12">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isResumeExecutif = link.href === "/ResumeExecutif";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex flex-col items-center relative text-white transition-all duration-300 whitespace-nowrap ${
                    isResumeExecutif
                      ? "hover:scale-x-110 font-semibold"
                      : "hover:-translate-y-1 hover:scale-105"
                  }`}
                >
                  {!isResumeExecutif && IconComponent && (
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 transition-colors group-hover:text-green-400" />
                  )}
                  <span
                    className={`mt-1 text-xs md:text-sm transition-colors ${
                      isResumeExecutif
                        ? "font-semibold text-white"
                        : "font-light text-white group-hover:text-green-400"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute inset-x-0 inset-y-1/2 -translate-y-1/2 rounded-xl opacity-0 
                    group-hover:opacity-100 transition-all duration-300 
                    ${
                      isResumeExecutif
                        ? ""
                        : "bg-green-400/20 backdrop-blur-md p-4 -z-10"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
          <div className="flex-shrink-0 w-20" />
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
