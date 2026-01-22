"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TextHoverEffect } from "./ui/TextHoverEffect";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export default function NavbarFront() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/ResumeExecutif", label: "Résumé Exécutif" },
    { href: "/logique-metier-serveur", label: "Logique Métier & Serveur" },
    { href: "/zymantra", label: "Zymantra" },
  ];

  return (
    <>
      <style>{`
        /* EFFET FUMÉE : Noir pur -> Gris foncé */
        .smoke-hover {
          position: relative;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          /* Bordure par défaut basée sur ton CSS */
          border: 1px solid var(--color-border-dual) !important;
        }

        .smoke-hover:hover {
          /* Subbrillance de la bordure au survol */
          border-color: rgba(255, 255, 255, 0.4) !important;
          background: radial-gradient(circle at center, 
            rgba(0, 0, 0, 0.5) 0%,      /* Noir pur */
            rgba(20, 20, 20, 0.3) 40%,   /* Gris très foncé */
            rgba(50, 50, 50, 0.1) 80%,   /* Transition fumée */
            transparent 100%
          ) !important;
          backdrop-filter: blur(12px) saturate(160%);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        /* Burger minimaliste 2 barres */
        .burger-line {
          height: 1.5px;
          background-color: var(--foreground);
          transition: all 0.3s ease;
        }

        *:focus { outline: none !important; ring: 0 !important; }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 h-16 flex items-center ${
          isScrolled
            ? "bg-glass-dual backdrop-blur-xl border-b border-border-dual"
            : "bg-transparent"
        } has-[.menubar-root:hover]:scale-[1.01]`}
      >
        <div className="flex w-full h-full items-center px-6 relative">
          {/* GAUCHE : LOGO BIEN ALIGNÉ */}
          <div className="flex items-center w-48 h-full z-[60]">
            <Link
              href="/"
              className="block w-full h-full relative flex items-center overflow-visible"
            >
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* CENTRE : NAVIGATION EN SUBBRILLANCE */}
          <div className="flex-1 flex justify-center items-center z-[80] hidden md:flex">
            <Menubar className="menubar-root h-auto bg-glass-dual border border-border-dual rounded-[var(--radius)] p-1 gap-2 shadow-2xl transition-all duration-500">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="no-underline">
                    <MenubarTrigger className="smoke-hover cursor-pointer rounded-[calc(var(--radius)-4px)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest data-[state=open]:bg-transparent focus:bg-transparent">
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
              {session && (
                <MenubarMenu>
                  <Link href="/dashboard" className="no-underline">
                    <MenubarTrigger className="smoke-hover cursor-pointer rounded-[calc(var(--radius)-4px)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-green-500/80 hover:text-green-400">
                      Dashboard
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              )}
            </Menubar>
          </div>

          {/* DROITE : TOOLS */}
          <div className="w-48 flex justify-end items-center gap-4 z-[60]">
            <ThemeToggle />

            <Sheet>
              <SheetTrigger className="group flex flex-col gap-[6px] p-2 bg-transparent border-none outline-none">
                <div className="burger-line w-6 group-hover:w-4" />
                <div className="burger-line w-4 group-hover:w-6" />
              </SheetTrigger>

              <SheetContent className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl">
                <SheetTitle className="text-foreground border-b border-border-dual pb-4 mb-6 uppercase tracking-widest text-xs">
                  Menu Principal
                </SheetTitle>
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="smoke-hover p-4 rounded-xl border border-border-dual text-[10px] font-bold uppercase tracking-widest"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
