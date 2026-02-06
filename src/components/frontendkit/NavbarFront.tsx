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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // État pour le mobile
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
            ? "bg-white/80 dark:bg-black/90 backdrop-blur-[24px] border-b border-zinc-200 dark:border-zinc-800 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex w-full h-full items-center px-6 lg:px-10 relative">
          {/* LOGO */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* MENU DESKTOP - Zinc 700 & Radius 7px */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="h-11 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700 rounded-[7px] p-1.5 gap-2 backdrop-blur-md">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger
                      className="cursor-pointer px-4 h-full text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400 transition-all duration-300 rounded-[7px] border border-zinc-300/50 dark:border-zinc-700/50 bg-transparent
                        hover:text-emerald-600 dark:hover:text-emerald-400 
                        hover:bg-emerald-500/10 dark:hover:bg-emerald-500/5 
                        hover:border-emerald-500/30
                        focus:bg-transparent"
                    >
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTIONS DROITE */}
          <div className="w-40 lg:w-56 flex justify-end items-center gap-4 lg:gap-6 z-[60]">
            <AnimatedThemeToggler />

            {/* BOUTON MOBILE - HiOutlineMenuAlt4 */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              <HiOutlineMenuAlt4 className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* COMPOSANT MENU MOBILE DÉPORTÉ */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        session={session}
      />

      <style jsx global>{`
        /* Suppression du noir forcé pour laisser place à la réactivité du thème */
        .dark .bg-black {
          background-color: #000000 !important;
        }
      `}</style>
    </>
  );
}
