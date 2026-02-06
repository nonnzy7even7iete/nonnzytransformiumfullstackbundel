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
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-20 flex items-center bg-black/90 backdrop-blur-[32px] ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex w-full h-full items-center justify-between px-2 lg:px-4 relative">
          {/* LOGO - Aligné à gauche */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[60]">
            <Link href="/" className="flex items-center h-full">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* MENU CENTRAL - Background Noir & Bordures */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[60]">
            <Menubar className="h-11 bg-black border border-zinc-800 rounded-[7px] p-1 gap-1.5">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="cursor-pointer px-4 h-full text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 border border-zinc-800 bg-black rounded-[7px] transition-all hover:text-emerald-500 hover:border-emerald-500/30">
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTIONS DROITE - Spacing minimum, collé au bord */}
          <div className="flex items-center gap-1 z-[70]">
            <AnimatedThemeToggler />

            {/* BOUTON MOBILE - HiOutlineMenuAlt4 blindé pour le clic */}
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(true);
              }}
              className="md:hidden p-1 text-white hover:text-emerald-500 transition-all cursor-pointer relative"
              style={{ marginRight: "-4px" }} // Collé au bord droit
            >
              <HiOutlineMenuAlt4 className="w-9 h-9" />
            </button>
          </div>
        </div>

        {/* SCRIM OVERLAY + BORDER DANS LA BRUME */}
        <div
          className="absolute bottom-0 left-0 w-full h-[40px] pointer-events-none translate-y-full z-[-1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            borderTop: "1px solid rgba(63, 63, 70, 0.3)", // Zinc-700 subtil noyé dans le scrim
          }}
        />
      </nav>

      {/* MOBILE MENU - Reçoit l'état et la fonction de fermeture */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          links={navLinks}
          session={session}
        />
      )}
    </>
  );
}
