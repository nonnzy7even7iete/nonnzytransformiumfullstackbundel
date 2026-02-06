"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "../ui/TextHoverEffect";
import { AnimatedThemeToggler } from "@/components/frontendkit/AnimatedThemeToggler";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import MobileMenu from "@/components/frontendkit/MobileMenu";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBorder, setShowBorder] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBorder(true);
      setTimeout(() => setShowBorder(false), 3000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
            ? "bg-background/80 backdrop-blur-md border-b border-border-color shadow-sm"
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

          {/* MENU CENTRAL - Border Gray Fine & Radius 7px Unifié */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar
              className="
              h-11 
              bg-accents-1/30
              border border-border-color 
              rounded-[7px] 
              p-[4px] 
              gap-1 
              backdrop-blur-xl"
            >
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger
                      className="
                        cursor-pointer px-4 h-full 
                        text-[10px] font-bold uppercase tracking-[0.2em] 
                        text-foreground/50 
                        transition-all duration-300 
                        /* RADIUS 7PX PARTOUT */
                        rounded-[7px] 
                        /* BORDER GRAY FINE PAR DEFAUT */
                        border border-border-color/50
                        bg-transparent
                        /* HOVER STATE */
                        hover:text-emerald-500 
                        hover:bg-emerald-500/10 
                        hover:border-emerald-500/20
                        /* RESET RADIX DEFAULTS */
                        focus:bg-emerald-500/10 focus:text-emerald-500
                        data-[state=open]:bg-emerald-500/10"
                    >
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTIONS - TOGGLER NEUTRALISÉ */}
          <div className="w-40 lg:w-56 flex justify-end items-center gap-4 lg:gap-6 z-[60]">
            <div className="border-none bg-transparent outline-none ring-0 focus:ring-0 focus:outline-none p-0">
              <AnimatedThemeToggler />
            </div>

            <div className="md:hidden text-foreground">
              <MobileMenu links={navLinks} session={session} />
            </div>
          </div>
        </div>

        {/* SCANNER LINE - Gris Cassé / Emerald discret */}
        <div
          className={`absolute bottom-0 h-[1px] w-full transition-all duration-[3000ms] ${
            showBorder
              ? "bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-100"
              : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
