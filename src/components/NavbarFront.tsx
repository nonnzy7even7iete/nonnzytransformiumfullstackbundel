"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import MobileMenu from "@/components/MobileMenu";

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
      <style>{`
        .glass-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          /* Bordure dynamique selon le thème */
          border: 1px solid light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.1)) !important;
        }

        .glass-item:hover {
          background: light-dark(rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.2)) !important;
          border-color: #22c55e !important;
        }

        .nav-surface-glint {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, light-dark(rgba(255,255,255,0.2), rgba(255,255,255,0.05)), transparent);
          pointer-events: none;
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          /* LOGIQUE DARK/LIGHT MODE CONDENSÉE :
             Mode Sombre : Noir 80% + Blur 50px
             Mode Clair : Blanc 70% + Blur 50px (Effet givré premium)
          */
          isScrolled
            ? "bg-white/70 dark:bg-black/80 backdrop-blur-[50px] border-b border-black/5 dark:border-white/10 shadow-xl"
            : "bg-white/90 dark:bg-black/95 backdrop-blur-[30px]"
        }`}
      >
        <div className="nav-surface-glint" />

        <div className="flex w-full h-full items-center px-10 relative">
          <div className="flex items-center w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="h-12 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl px-2 gap-2 backdrop-blur-3xl shadow-inner">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="glass-item cursor-pointer rounded-xl px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-all">
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          <div className="w-56 flex justify-end items-center gap-6 z-[60]">
            <ThemeToggle />
            <div className="md:hidden text-black dark:text-white">
              <MobileMenu links={navLinks} session={session} />
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-0 h-[1px] w-full transition-opacity duration-1000 bg-gradient-to-r from-transparent via-emerald-500 to-transparent ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
