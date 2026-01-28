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
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
        }

        .glass-item:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(34, 197, 94, 0.3) !important;
          transform: translateY(-1px);
        }

        .gradient-border-line {
          background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.5), rgba(249, 115, 22, 0.5), transparent);
          height: 1px; 
          width: 100%;
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          /* EFFET DEMANDÉ : 
             Noir transparent + Énormément de Blur 
          */
          isScrolled
            ? "bg-black/40 backdrop-blur-[40px] border-b border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]"
            : "bg-black/20 backdrop-blur-[20px] border-b border-transparent"
        }`}
      >
        <div className="flex w-full h-full items-center px-10 relative">
          {/* LOGO AREA */}
          <div className="flex items-center w-56 h-full z-[60]">
            <Link href="/" className="block w-full h-full flex items-center">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* NAV CENTER : L'élément flottant expert */}
          <div className="flex-1 hidden md:flex justify-center items-center z-[80]">
            <Menubar className="h-11 bg-black/20 border border-white/10 rounded-xl px-1.5 gap-1.5 backdrop-blur-2xl">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="glass-item cursor-pointer rounded-lg px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 hover:text-white transition-all">
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="w-56 flex justify-end items-center gap-6 z-[60]">
            <ThemeToggle />
            <div className="md:hidden">
              <MobileMenu links={navLinks} session={session} />
            </div>
          </div>
        </div>

        {/* BORDER DYNAMIQUE */}
        <div
          className={`absolute bottom-0 gradient-border-line transition-opacity duration-1000 ${
            showBorder ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>
    </>
  );
}
