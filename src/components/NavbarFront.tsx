"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FileText, LayoutDashboard } from "lucide-react";
import { IoAppsOutline } from "react-icons/io5";
import { motion } from "framer-motion"; // Framer Motion est conservé si d'autres parties du composant l'utilisent.

// NOUVEAUTÉ : Import du composant externe TextHoverEffect
// ATTENTION : Vérifiez et ajustez ce chemin en fonction de votre structure de dossiers réelle
import { TextHoverEffect } from "../TextHoverEffect";

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
      icon: <FileText className="w-4 h-4 md:w-5 md:h-5" />,
    },
  ];

  if (session) {
    navLinks.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />,
    });
  }

  return (
    <>
      {/* Toggle mini (à droite) */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed right-3 top-3 z-50 text-white hover:text-green-400 transition-transform duration-300"
      >
        <IoAppsOutline
          className={`w-6 h-6 transition-transform duration-500 ${
            isVisible ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-transform duration-500
        ${isVisible ? "translate-y-0" : "-translate-y-20"}
        ${
          isScrolled
            ? "bg-black/20 backdrop-blur-sm border-b border-white/10"
            : "bg-black/40 backdrop-blur-lg border-b border-white/20"
        }
        h-16 shadow-md`}
      >
        {/* GRID 3 COLONNES POUR UN ALIGNEMENT PARFAIT */}
        <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-3 items-center">
          {/* Colonne gauche : Logo (MAJ) */}
          <div className="flex items-center h-full">
            <Link href="/" className="h-full flex items-center">
              <TextHoverEffect // Le composant est maintenant importé
                text="Nonnzytr"
                // Les props de style pour le scaling sont conservées
                style={{
                  width: "200px",
                  height: "100%",
                  fontSize: "3rem",
                }}
              />
            </Link>
          </div>

          {/* Colonne centrale : MENU 100% CENTRÉ */}
          <div className="flex justify-center gap-8 md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center relative text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                {link.icon}
                <span className="mt-1 text-xs md:text-sm font-light">
                  {link.label}
                </span>

                <span
                  className="absolute inset-0 rounded-xl opacity-0 
                  hover:opacity-100 transition-all duration-300 
                  bg-green-400/20 backdrop-blur-md p-4 -z-10"
                />
              </Link>
            ))}
          </div>

          {/* Colonne droite : espace pour équilibrer */}
          <div />
        </div>
      </nav>
    </>
  );
}
