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
        }}
      >
        {/* LE SCRIM : REPLACE TEL QUEL */}
        <div
          className="absolute inset-x-0 bottom-[-50px] h-[50px] pointer-events-none z-[-1]"
          style={{
            background: `linear-gradient(to bottom, var(--background) 0%, transparent 100%)`,
          }}
        />

        <div className="flex w-full h-full items-center justify-between px-6 lg:px-10 relative">
          <div className="flex items-center w-40 lg:w-56 h-full z-[110]">
            <Link
              href="/"
              className="flex items-center h-full focus:outline-none"
            >
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          <DesktopMenu links={navLinks} />

          <div className="flex items-center gap-6 z-[120]">
            <AnimatedThemeToggler />

            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(true);
              }}
              className="md:hidden flex items-center justify-center cursor-pointer focus:outline-none pr-6"
              style={{ color: "var(--foreground)" }}
              aria-label="Menu"
            >
              <svg
                width="28"
                height="10"
                viewBox="0 0 28 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1H28M10 9H28"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                />
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
