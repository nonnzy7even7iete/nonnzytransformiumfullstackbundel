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
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ANIMATION SCANNER : Transition fluide
  useEffect(() => {
    const cycle = () => {
      setShowBorder(true);
      setTimeout(() => setShowBorder(false), 4000);
    };
    const interval = setInterval(cycle, 9000);
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

          {/* MENU CENTRAL - Hover Vert Transparent & Radius 7px */}
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
                        rounded-[7px] border-none outline-none 
                        /* HOVER VERT TRANSPARENT */
                        hover:text-emerald-500 
                        hover:bg-emerald-500/10 
                        /* ACTIVE / OPEN STATES */
                        data-[state=open]:bg-emerald-500/15 
                        data-[state=open]:text-emerald-500
                        focus:bg-emerald-500/10"
                    >
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* ACTIONS */}
          <div className="w-40 lg:w-56 flex justify-end items-center gap-4 lg:gap-6 z-[60]">
            <AnimatedThemeToggler />
            <div className="md:hidden text-foreground">
              <MobileMenu links={navLinks} session={session} />
            </div>
          </div>
        </div>

        {/* SCANNER LINE INDICATOR : Emerald / Blue Pulse */}
        <div
          className={`absolute bottom-0 h-[1px] w-full transition-all duration-[3000ms] ease-in-out ${
            showBorder
              ? "bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-100 scale-x-100"
              : "opacity-0 scale-x-0"
          }`}
        />
      </nav>
    </>
  );
}
