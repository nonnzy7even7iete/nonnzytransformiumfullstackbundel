"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FileText, LayoutDashboard } from "lucide-react";
// 1. Import de la nouvelle icône
import { IoAppsOutline } from "react-icons/io5";
import { TextHoverEffect } from "./ui/TextHoverEffect";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      href: "/ResumeExecutif",
      label: "Résumé Exécutif",
      icon: FileText,
    },
    ...(session
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Toggle mini (à droite) */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed right-3 top-3 z-50 text-white hover:text-green-400 transition-transform duration-300"
      >
        {/* 2. Remplacement de l'icône ici */}
        <IoAppsOutline
          // J'ai mis w-6 h-6 pour qu'on voit bien les détails de l'icône Apps
          className={`w-6 h-6 transition-transform duration-500 ${
            isVisible ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-500
        ${
          isVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        ${
          isScrolled
            ? "bg-black/20 backdrop-blur-sm border-b border-white/10"
            : "bg-black/40 backdrop-blur-lg border-b border-white/20"
        }
        h-16 shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo gauche */}
          <div className="flex-shrink-0">
            <TextHoverEffect text="Nonnzytr" />
          </div>

          {/* Menu centré */}
          <div className="flex-1 flex justify-center gap-8 md:gap-10 px-4">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center relative text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 whitespace-nowrap"
                >
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 transition-colors group-hover:text-green-400" />
                  <span className="mt-1 text-xs md:text-sm font-light transition-colors group-hover:text-green-400">
                    {link.label}
                  </span>

                  <span
                    className="absolute inset-x-0 inset-y-1/2 -translate-y-1/2 rounded-xl opacity-0 
                    group-hover:opacity-100 transition-all duration-300 
                    bg-green-400/20 backdrop-blur-md p-4 -z-10"
                  />
                </Link>
              );
            })}
          </div>

          {/* Espace droite */}
          <div className="flex-shrink-0 w-16" />
        </div>
      </nav>
    </>
  );
}
