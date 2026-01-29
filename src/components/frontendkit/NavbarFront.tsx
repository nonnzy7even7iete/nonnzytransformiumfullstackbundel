"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "../ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";
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
      <style>{`
        /* L'ITEM : BORDURE VISIBLE ET PROPORTIONNELLE */
        .expert-item-border {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          /* Bordure constante mais subtile */
          border: 1px solid light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.08)) !important;
          /* LA PROPORTION : Parent(16px) - Padding(6px) = 10px */
          border-radius: 7px !important;
          background: light-dark(rgba(0,0,0,0.02), rgba(255,255,255,0.02));
        }

        .expert-item-border:hover {
          border-color: light-dark(rgba(34, 197, 94, 0.4), rgba(34, 197, 94, 0.5)) !important;
          background: light-dark(rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.08)) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .nav-surface-glint {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, light-dark(rgba(255,255,255,0.15), rgba(255,255,255,0.05)), transparent);
          pointer-events: none;
        }

        *:focus { outline: none !important; }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 h-20 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-white/80 dark:bg-black/85 backdrop-blur-[50px] border-b border-black/5 dark:border-white/10 shadow-2xl"
            : "bg-white/95 dark:bg-black/95 backdrop-blur-[30px] border-b border-transparent"
        }`}
      >
        <div className="nav-surface-glint" />

        <div className="flex w-full h-full items-center px-10 relative">
          <div className="flex items-center w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* CONTENEUR PARENT : ROUNDED 16PX */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar
              className="
              h-12 
              bg-black/5 dark:bg-black/40 
              border border-black/10 dark:border-white/10 
              rounded-[7px] 
              p-[6px] 
              gap-2 
              backdrop-blur-3xl"
            >
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="expert-item-border cursor-pointer px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-black/60 dark:text-white/50 hover:text-emerald-500 transition-all">
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
          className={`absolute bottom-0 h-[1px] w-full transition-opacity duration-1000 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
