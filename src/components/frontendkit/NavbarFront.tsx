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

  useEffect(() => {
    const cycle = () => {
      setShowBorder(false);
      setTimeout(() => {
        setShowBorder(true);
        setTimeout(() => setShowBorder(false), 5000);
      }, 7000);
    };
    cycle();
    const interval = setInterval(cycle, 12000);
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
        className={`fixed top-0 w-full z-50 transition-all duration-700 h-20 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-glass-dual border-b border-border-dual shadow-2xl"
            : "bg-background border-b border-transparent"
        }`}
      >
        <div className="flex w-full h-full items-center px-6 lg:px-10 relative">
          {/* LOGO */}
          <div className="flex items-center w-40 lg:w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* MENU CENTRAL - Adapté Radius 2px */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar
              className="
              h-12 
              bg-transparent
              border border-border-dual 
              rounded-[2px] 
              p-[6px] 
              gap-2 
              backdrop-blur-3xl"
            >
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="cursor-pointer px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground opacity-70 hover:opacity-100 hover:text-blue-500 transition-all rounded-[2px] border border-transparent hover:border-border-dual">
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

            <div className="md:hidden text-foreground">
              <MobileMenu links={navLinks} session={session} />
            </div>
          </div>
        </div>

        {/* SCANNER LINE */}
        <div
          className={`absolute bottom-0 h-[1px] w-full transition-opacity duration-1000 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
