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
        } ${isScrolled ? "bg-black/80 backdrop-blur-[24px]" : "bg-black"}`}
      >
        <div className="flex w-full h-full items-center px-4 lg:px-6 relative">
          {/* LOGO SECTION */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* MENU CENTRAL - Retour des bordures Zinc 700 */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="h-11 bg-[var(--accents-1)] border border-[var(--border-color)] rounded-[var(--radius-vercel)] p-1.5 gap-2 backdrop-blur-md">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger
                      className="cursor-pointer px-4 h-full text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--foreground)]/60 transition-all duration-300 rounded-[var(--radius-vercel)] border border-[var(--border-color)] bg-transparent
                        hover:text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                    >
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTION BUTTONS - Rapprochés du bord droit (px-4/px-6) */}
          <div className="w-40 lg:w-56 flex justify-end items-center gap-3 lg:gap-5 z-[60]">
            <AnimatedThemeToggler />

            {/* BOUTON MOBILE - Fix du clic */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(true);
              }}
              className="md:hidden p-2 text-white transition-transform active:scale-90 z-[70]"
            >
              <HiOutlineMenuAlt4 className="w-9 h-9" />
            </button>
          </div>
        </div>

        {/* SCRIM OVERLAY (Au lieu d'une bordure) */}
        <div
          className={`absolute bottom-[-20px] left-0 w-full h-[20px] pointer-events-none transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        />
      </nav>

      {/* MOBILE MENU - Vérifie que ce composant accepte isOpen et onClose */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        session={session}
      />
    </>
  );
}
