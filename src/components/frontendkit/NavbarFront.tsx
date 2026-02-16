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
  // On initialise à true pour être sûr que la barre est là au départ
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Sécurité : toujours visible si on est en haut de page (<= 10)
      if (currentY <= 10) {
        setIsVisible(true);
      } else {
        setIsVisible(currentY <= lastScrollY);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = useMemo(
    () => [
      { href: "/ResumeExecutif", label: "Resume Executif" },
      { href: "/logique-metier-serveur", label: "Logique Metier & Serveur" },
      { href: "/zymantra", label: "Zymantra" },
    ],
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] h-20 flex items-center transition-all duration-500 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        style={{
          // Utilisation de variables CSS standard pour éviter les conflits de thème
          backgroundColor: "var(--background)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {/* LE SCRIM */}
        <div
          className="absolute inset-x-0 bottom-[-50px] h-[50px] pointer-events-none z-[-1]"
          style={{
            background: `linear-gradient(to bottom, var(--background) 0%, transparent 100%)`,
          }}
        />

        <div className="flex w-full h-full items-center justify-between px-6 lg:px-10 relative">
          {/* ZONE LOGO */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[110]">
            <Link
              href="/"
              className="flex items-center h-full focus:outline-none"
            >
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <DesktopMenu links={navLinks} />

          {/* ZONE ACTIONS */}
          <div className="flex items-center gap-4 z-[120]">
            <AnimatedThemeToggler />

            {/* BOUTON MOBILE ÉPURÉ : w-7 h-3, décollé par pr-10 */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(true);
              }}
              className="md:hidden flex items-center justify-center w-12 h-12 text-[var(--foreground)] cursor-pointer focus:outline-none pr-10"
              aria-label="Menu"
            >
              <HiOutlineMenuAlt4 className="w-7 h-3 transition-transform active:scale-90" />
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
