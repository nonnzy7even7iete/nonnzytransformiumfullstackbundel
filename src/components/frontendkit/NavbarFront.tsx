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
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[var(--background)]/80 backdrop-blur-[24px] border-b border-[var(--border-color)] shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex w-full h-full items-center px-6 lg:px-10 relative">
          {/* LOGO SECTION */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* CENTRAL NAVIGATION - Desktop */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="h-11 bg-[var(--accents-1)] border border-[var(--border-color)] rounded-[var(--radius-vercel)] p-1.5 gap-2 backdrop-blur-md">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger
                      className="cursor-pointer px-4 h-full text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/60 transition-all duration-300 rounded-[var(--radius-vercel)] border border-transparent
                        hover:text-emerald-500 hover:bg-emerald-500/10"
                    >
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTION BUTTONS */}
          <div className="w-40 lg:w-56 flex justify-end items-center gap-4 lg:gap-8 z-[60]">
            <AnimatedThemeToggler />

            {/* BOUTON MENU MOBILE - Noir en Light / Blanc en Dark */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1 text-[var(--foreground)] transition-transform active:scale-90"
              aria-label="Ouvrir le menu"
            >
              <HiOutlineMenuAlt4 className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* COMPOSANT MOBILE MENU */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        session={session}
      />
    </>
  );
}
