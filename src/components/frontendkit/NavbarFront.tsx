"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { TextHoverEffect } from "../ui/TextHoverEffect";
import { AnimatedThemeToggler } from "@/components/frontendkit/AnimatedThemeToggler";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import MobileMenu from "@/components/frontendkit/MobileMenu";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/ResumeExecutif", label: "Résumé Exécutif" },
    { href: "/logique-metier-serveur", label: "Logique Métier & Serveur" },
    { href: "/zymantra", label: "Zymantra" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[90] transition-all duration-500 h-20 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: isScrolled ? "var(--background)" : "transparent",
          backdropFilter: isScrolled ? "blur(32px)" : "none",
          transition: "background-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* SCRIM OVERLAY - Intégré à la Nav pour ne pas bloquer les clics */}
        <div
          className="absolute inset-x-0 bottom-[-40px] h-[40px] pointer-events-none z-[-1]"
          style={{
            background: `linear-gradient(to bottom, var(--background) 0%, transparent 100%)`,
            opacity: isScrolled ? 0.9 : 0,
          }}
        />

        <div className="flex w-full h-full items-center justify-between px-4 lg:px-6 relative">
          {/* LOGO */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[100]">
            <Link href="/" className="flex items-center h-full">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* MENU DESKTOP - Totalement réactif aux variables CSS */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[100]">
            <Menubar className="h-11 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[var(--radius-vercel)] p-1 gap-1.5 shadow-xl">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="cursor-pointer px-4 h-full text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/60 border border-[var(--border-color)] bg-[var(--card-bg)] rounded-[var(--radius-vercel)] transition-all hover:text-emerald-500 hover:border-emerald-500/40">
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTIONS DROITE - Collées au bord droit */}
          <div className="flex items-center gap-1 z-[110]">
            <AnimatedThemeToggler />

            {/* BOUTON MOBILE - HiOutlineMenuAlt4 (Z-INDEX 110 + ONCLICK) */}
            <button
              type="button"
              onClick={() => {
                console.log("Clic détecté !");
                setIsMobileMenuOpen(true);
              }}
              className="md:hidden p-1 text-[var(--foreground)] hover:text-emerald-500 transition-all cursor-pointer relative"
              style={{ marginRight: "-4px" }}
            >
              <HiOutlineMenuAlt4 className="w-9 h-9" />
            </button>
          </div>
        </div>
      </nav>

      {/* COMPOSANT MOBILE MENU - En dehors de la Nav pour éviter les conflits de Z-index */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        session={session}
      />
    </>
  );
}
