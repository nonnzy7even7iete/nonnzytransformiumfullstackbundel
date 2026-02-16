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

  // Optimisation du scroll : On Ã©vite les calculs inutiles
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY <= lastScrollY || currentY <= 100);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Memoisation des liens pour Ã©viter les re-renders de DesktopMenu
  const navLinks = useMemo(
    () => [
      { href: "/ResumeExecutif", label: "RÃ©sumÃ© ExÃ©cutif" },
      { href: "/logique-metier-serveur", label: "Logique MÃ©tier & Serveur" },
      { href: "/zymantra", label: "Zymantra" },
    ],
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] h-20 flex items-center transition-transform duration-500 will-change-transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: "var(--background)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
        }}
      >
        {/* LE SCRIM : Maintenu ici pour une synchro parfaite avec le thÃ¨me et le scroll */}
        <div
          className="absolute inset-x-0 bottom-[-50px] h-[50px] pointer-events-none z-[-1]"
          style={{
            background: `linear-gradient(to bottom, var(--background) 0%, transparent 100%)`,
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

          {/* COMPOSANT DÃ‰PORTÃ‰ : Toute la Menubar est ici */}
          <DesktopMenu links={navLinks} />

          {/* ZONE ACTIONS */}
          <div className="flex items-center gap-0 z-[120]">
            <AnimatedThemeToggler />

            {/* BOUTON MOBILE : Épuré (w-5) et décollé du bord droit */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(true);
              }}
              // Utilisation d'un padding-right (pr-4 ou pr-6) pour décoller l'icône du bord
              className="md:hidden flex items-center justify-center w-12 h-12 text-[var(--foreground)] cursor-pointer focus:outline-none pr-4"
              // On retire le margin-right négatif pour laisser l'icône respirer loin du bord
              style={{ marginRight: "0px" }}
              aria-label="Menu"
            >
              {/* Taille w-5 h-5 (20px) : l'équilibre parfait entre discrétion et visibilité */}
              <HiOutlineMenuAlt4 className="w-7 h-3" />
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
