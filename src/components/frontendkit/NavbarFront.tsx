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

          <div className="flex items-center gap-4 z-[120]">
            <AnimatedThemeToggler />

            {/* DÉCLENCHEUR MOBILE */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(true);
              }}
              // On utilise pr-10 pour le décalage et var(--foreground) pour le Dark Mode
              className="md:hidden flex items-center justify-center w-12 h-12 cursor-pointer focus:outline-none pr-10"
              style={{ color: "var(--foreground)" }}
              aria-label="Menu"
            >
              {/* FORÇAGE DES DIMENSIONS PAR LE STYLE INLINE 
                  w-7 = 28px | h-3 = 12px 
              */}
              <HiOutlineMenuAlt4
                style={{
                  width: "28px",
                  height: "12px",
                  display: "block",
                }}
              />
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
