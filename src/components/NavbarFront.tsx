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
  const [isVisible, setIsVisible] = useState(true);
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
        .smoke-hover {
          position: relative;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .smoke-hover:hover {
          background: radial-gradient(circle at center, 
            rgba(255, 0, 0, 0.12) 0%, 
            rgba(40, 40, 40, 0.08) 45%, 
            rgba(120, 120, 120, 0.05) 75%, 
            transparent 100%
          ) !important;
          backdrop-filter: blur(8px);
        }
        
        .burger-line {
          height: 1.5px;
          background-color: var(--foreground);
          transition: all 0.3s ease;
        }

        /* Suppression totale des contours de focus au clic */
        button:focus, div:focus, a:focus {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 h-16 flex items-center ${
          isScrolled
            ? "bg-glass-dual backdrop-blur-xl border-b border-border-dual"
            : "bg-transparent"
        } has-[.menubar-root:hover]:scale-[1.01]`}
      >
        <div className="flex w-full items-center px-6 relative">
          {/* GAUCHE : LOGO (Priorité visuelle) */}
          <div className="w-32 flex-shrink-0 z-[60]">
            <Link href="/" className="block h-10 w-full relative outline-none">
              <TextHoverEffect text="Nonnzytr" />
            </Link>
          </div>

          {/* CENTRE : NAVIGATION (Centrage absolu) */}
          <div className="flex-1 flex justify-center items-center z-[80] hidden md:flex">
            <Menubar className="menubar-root bg-glass-dual border border-border-dual rounded-[var(--radius)] p-1 gap-1.5 shadow-2xl">
              {navLinks.map((link) => (
                <MenubarMenu key={link.href}>
                  <Link href={link.href} className="outline-none">
                    <MenubarTrigger className="smoke-hover cursor-pointer border border-border-dual rounded-[calc(var(--radius)-4px)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all focus:bg-transparent data-[state=open]:bg-transparent">
                      {link.label}
                    </MenubarTrigger>
                  </Link>
                </MenubarMenu>
              ))}
            </Menubar>
          </div>

          {/* DROITE : THEME & BURGER */}
          <div className="w-32 flex justify-end items-center gap-4 z-[60]">
            <ThemeToggle />

            <Sheet>
              <SheetTrigger className="group flex flex-col gap-[6px] p-2 outline-none border-none bg-transparent focus:ring-0">
                <div className="burger-line w-6 group-hover:w-4" />
                <div className="burger-line w-4 group-hover:w-6" />
              </SheetTrigger>

              <SheetContent className="bg-glass-dual border-l border-border-dual backdrop-blur-3xl">
                <SheetTitle className="text-foreground border-b border-border-dual pb-4 mb-6 uppercase tracking-tighter">
                  Navigation
                </SheetTitle>
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="smoke-hover p-4 rounded-xl border border-border-dual text-[11px] font-bold uppercase tracking-widest outline-none"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {session && (
                    <Link
                      href="/dashboard"
                      className="p-4 rounded-xl border border-border-dual text-green-500 text-[11px] font-bold uppercase tracking-widest outline-none"
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
