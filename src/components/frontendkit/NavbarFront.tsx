"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "../ui/TextHoverEffect";
import { AnimatedThemeToggler } from "@/components/frontendkit/AnimatedThemeToggler";
import MobileMenu from "@/components/frontendkit/MobileMenu";
import { DesktopMenu } from "./DesktopMenu";

export default function NavbarFront() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
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
      { href: "/logique-metier-serveur", label: "Logique Metier" },
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
          backgroundColor: "var(--background)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="flex w-full h-full items-center justify-between px-6 lg:px-10 relative">
          {/* LOGO */}
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

            {/* DÉCLENCHEUR DEUX TRAITS */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(true);
              }}
              // pr-10 pour le recul, w-14 pour la zone de contact
              className="md:hidden flex items-center justify-end w-14 h-12 cursor-pointer focus:outline-none pr-10"
              aria-label="Menu"
            >
              {/* SVG SUR-MESURE : 2 traits étirés */}
              <svg
                width="28"
                height="8"
                viewBox="0 0 28 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ stroke: "var(--foreground)" }}
              >
                {/* Trait du haut : Pleine largeur */}
                <path d="M0 1H28" strokeWidth="1.2" strokeLinecap="square" />
                {/* Trait du bas : Décalé et plus court pour le style */}
                <path d="M10 7H28" strokeWidth="1.2" strokeLinecap="square" />
              </svg>
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
