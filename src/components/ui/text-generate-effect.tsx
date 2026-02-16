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

  // Logique de scroll maintenue sans altération
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY <= lastScrollY || currentY <= 50);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        className={`fixed top-0 w-full z-[100] h-20 flex items-center transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          // BRANCHEMENT DIRECT SUR TON CSS
          backgroundColor: "var(--background)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {/* LE SCRIM SYNCHRONISÉ */}
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

          <DesktopMenu links={navLinks} />

          {/* ZONE ACTIONS */}
          <div className="flex items-center gap-0 z-[120]">
            <AnimatedThemeToggler />

            {/* LE DÉCLENCHEUR : ADAPTATION RADICALE AU DESIGN SYSTEM */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(true);
              }}
              // On utilise la variable CSS pour la couleur afin d'être "Dark Mode Ready" immédiatement
              className="md:hidden flex items-center justify-center w-12 h-12 cursor-pointer focus:outline-none pr-10"
              style={{
                color: "var(--foreground)", // Force la couleur selon ton :root ou .dark
                marginRight: "0px",
              }}
              aria-label="Menu"
            >
              {/* L'icône étirée demandée : w-7 h-3 */}
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
