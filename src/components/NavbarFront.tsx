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
        <div className="h-full flex items-center px-6 md:px-8">
          {/* Logo petit à gauche */}
          <Link href="/" className="flex-shrink-0">
            <div className="scale-75 origin-left hover:opacity-80 transition-opacity duration-300">
              <TextHoverEffect text="Nonnzytr" />
            </div>
          </Link>

          {/* Menu centré absolument au centre */}
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center gap-8 md:gap-12">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const isResumeExecutif = link.href === "/ResumeExecutif";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex flex-col items-center relative text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 whitespace-nowrap ${
                    isResumeExecutif
                      ? "hover:text-transparent bg-clip-text"
                      : ""
                  }`}
                  style={
                    isResumeExecutif
                      ? {
                          background:
                            "linear-gradient(135deg, #16a34a 0%, #22d3ee 100%)",
                        }
                      : undefined
                  }
                >
                  <IconComponent
                    className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                      isResumeExecutif
                        ? "group-hover:text-green-400"
                        : "group-hover:text-green-400"
                    }`}
                  />
                  <span
                    className={`mt-1 text-xs md:text-sm font-light transition-all duration-300 ${
                      isResumeExecutif
                        ? "group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-700 group-hover:to-blue-400 group-hover:bg-clip-text"
                        : "group-hover:text-green-400"
                    }`}
                  >
                    {link.label}
                  </span>

                  <span
                    className={`absolute inset-x-0 inset-y-1/2 -translate-y-1/2 rounded-xl opacity-0 
                    group-hover:opacity-100 transition-all duration-300 
                    ${
                      isResumeExecutif
                        ? "bg-green-400/20 backdrop-blur-md p-4 -z-10"
                        : "bg-green-400/20 backdrop-blur-md p-4 -z-10"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Espace droite vide */}
          <div className="flex-1" />
        </div>
      </nav>
    </>
  );
}
