"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { TextHoverEffect } from "../ui/TextHoverEffect";
import { AnimatedThemeToggler } from "@/components/frontendkit/AnimatedThemeToggler";
import MobileMenu from "@/components/frontendkit/MobileMenu";
import { DesktopMenu } from "./DesktopMenu";

export default function NavbarFront() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Optimisation du scroll : On évite les calculs inutiles
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY <= lastScrollY || currentY <= 100);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Memoisation des liens pour éviter les re-renders de DesktopMenu
  const navLinks = useMemo(
    () => [
      { href: "/ResumeExecutif", label: "Résumé Exécutif" },
      { href: "/logique-metier-serveur", label: "Logique Métier & Serveur" },
      { href: "/zymantra", label: "Zymantra" },
    ],
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] h-20 flex items-center transition-all duration-500 will-change-transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          // Utilisation de HSL pour que le background s'adapte dynamiquement au thème Dark/Light
          backgroundColor: "hsl(var(--background) / 0.8)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
        }}
      >
        {/* LE SCRIM : Maintenu ici pour une synchro parfaite avec le thème et le scroll */}
        <div
          className="absolute inset-x-0 bottom-[-50px] h-[50px] pointer-events-none z-[-1]"
          style={{
            background: `linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)`,
          }}
        />

        <div className="flex w-full h-full items-center justify-between px-2 lg:px-4 relative">
          {/* ZONE LOGO */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[110]">
            <Link
              href="/"
              className="flex items-center h-full focus:outline-none"
            >
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* COMPOSANT DÉPORTÉ : Toute la Menubar est ici */}
          <DesktopMenu links={navLinks} />

          {/* ZONE ACTIONS */}
          <div className="flex items-center gap-0 z-[120]">
            <AnimatedThemeToggler />

            {/* BOUTON MOBILE : Configuration Épurée & Décollée */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(true);
              }}
              // pr-8 pour bien décoller l'icône du bord droit et donner de l'air
              className="md:hidden flex items-center justify-center w-12 h-12 text-foreground cursor-pointer focus:outline-none pr-8"
              style={{ marginRight: "0px" }}
              aria-label="Menu"
            >
              {/* Icône étirée : w-7 (28px) et h-3 (12px) pour un look "cinématique" */}
              <HiOutlineMenuAlt4 className="w-7 h-3 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        session={session}
      />
    </>
  );
}
